# Google Apps Script Static Analysis Report — v1.6.26 Production Script

Source audited: `Current_Production Script/v.1.6.26_Production_Script`.

## Executive findings

The script parses as JavaScript under Node's syntax checker, but the audit found several runtime-risk defects and performance traps in the requested prisms. The highest-risk items are: silent formatting failures that allow workflows to continue after partial API failure, per-column/per-cell Spreadsheet API fallback loops, an off-by-one row range that targets one blank row below an empty Demo P data region, legacy framework-test artifacts that survived the purge, and Monthly Change comparison paths that repeatedly rebuild sorted signatures per PMR/field.

---

## 1. OFF-BY-ONE & BOUNDARY ERRORS

### Finding 1.1 — Empty Demo P formatting targets row 5 even when no data exists

**Function/context:** `enforceDemoPPostFlattenFormatting_`, immediately after sorting the Demo P sheet.

**Risk:** The function applies wrapping to `Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 1)` rows. If `getLastRow()` is `4` or lower, this writes formatting to row `5` even though there are no data rows. This does not crash, but it silently creates a phantom formatted data row and can inflate perceived used range behavior in later formatting/audit routines.

**Fix snippet:**

```javascript
function enforceDemoPPostFlattenFormatting_(demoSheet) {
  if (!demoSheet) return;
  const dashboard = loadDashboardConfig_();
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.DEMO_P);

  applyColumnWidths_(demoSheet, dashboard, headers);
  applyHiddenColumnSettings_(demoSheet, dashboard, headers);
  sortSheetAlphabeticallyByParticipantName_(demoSheet);

  const lastRow = demoSheet.getLastRow();
  const lastCol = Math.max(demoSheet.getLastColumn(), 1);
  if (lastRow >= DATA_START_ROW) {
    demoSheet
      .getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol)
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  }
  lockFinalOutputRowHeights_(demoSheet, "Demo P");
}
```

### Finding 1.2 — Date/number format enforcement formats row 5 when the requested row count has no data rows

**Function/context:** `enforceDateAndNumberFormatsForHeaders_`, `dataRows = Math.max(rowCount - dataStartRow + 1, 1)`.

**Risk:** The same boundary inflation appears in the global date/number formatter. If the caller passes a `rowCount` less than `DATA_START_ROW`, the function formats a synthetic row 5. This is not a negative-count crash, but it violates the row-governance model and can create formatting artifacts below an otherwise empty report.

**Fix snippet:**

```javascript
function enforceDateAndNumberFormatsForHeaders_(sheet, dashboard, headers, rowCount, logPrefix) {
  const globals = dashboard.globals || {};
  const dataStartRow = Number(globals.dataStartRow || DATA_START_ROW);
  const actualRowCount = Number(rowCount || 0);
  if (!sheet || !headers || !headers.length || actualRowCount < dataStartRow) return;

  const dataRows = actualRowCount - dataStartRow + 1;
  const dataEndRow = dataStartRow + dataRows - 1;
  const rangesByFormat = {};
  // existing batching logic continues here...
}
```

### Finding 1.3 — Section G date-format repair also formats a synthetic row when templates are shorter than row 5

**Function/context:** `repairDateFormatForSectionG_`, `dataRows = Math.max(sheet.getMaxRows() - dataStartRow + 1, 1)`.

**Risk:** For undersized sheets/templates, the repair path formats at least one row at `DATA_START_ROW` even when the sheet has no data area. Because this function is invoked from validation/repair code, it can mutate templates during an audit path and mask the real problem.

**Fix snippet:**

```javascript
function repairDateFormatForSectionG_(sheet, globals, check) {
  try {
    const dataStartRow = Number(globals.dataStartRow || DATA_START_ROW);
    const maxRows = sheet.getMaxRows();
    if (maxRows < dataStartRow) return false;

    const dataRows = maxRows - dataStartRow + 1;
    const sampleRows = Math.min(25, dataRows);
    sheet.getRange(dataStartRow, check.column, dataRows, 1)
      .setNumberFormat(check.expectedSheetsFormat);
    sheet.getRange(dataStartRow, check.column, sampleRows, 1)
      .setNumberFormat(check.expectedSheetsFormat);
    return true;
  } catch (err) {
    throw new Error("Section G date format repair failed for " + sheet.getName() + " / " + check.header + ": " + err.message);
  }
}
```

---

## 2. SILENT FAILURES & DANGEROUS TRY/CATCH BLOCKS

### Finding 2.1 — Alternating-color failure is swallowed and workflow continues with stale styling

**Function/context:** `applyDashboardSortOrderAlternatingColors_`, `dataRange.setBackgrounds(backgrounds)` catch.

**Risk:** A failed bulk background write is caught and only logged. If this happens after data has changed, row grouping cues can be stale/misleading while the workflow reports success.

**Fix snippet:**

```javascript
try {
  dataRange.setBackgrounds(backgrounds);
} catch (err) {
  throw new Error("Alternating color application failed for " + sheet.getName() + ": " + err.message);
}
```

### Finding 2.2 — Title-row standardization failure is swallowed despite mutating report date metadata

**Function/context:** `ensureStandardTitleRows_`, catch only logs `Title row check skipped...`.

**Risk:** The title rows carry report dates. If writing `A2:D2` fails, downstream functions can read stale month boundaries and compare or name sheets against the wrong reporting period.

**Fix snippet:**

```javascript
} catch (err) {
  throw new Error("Title row standardization failed for " + sheet.getName() + ": " + err.message);
}
```

### Finding 2.3 — Demo P final title/date-format refresh failures are swallowed

**Function/context:** Demo P template refresh/finalization catches around title/date-format operations.

**Risk:** Several Demo P post-processing steps log and continue after failure to apply title/date formats. Since the same sheet is later used by Monthly Change and Master List workflows, continuing after a partial template application can corrupt date comparisons or user interpretation without stopping the workflow.

**Fix snippet:**

```javascript
try {
  targetSheet.getRange("A1").setValue(sheetDef.reportTitle || "Demo P");
} catch (err) {
  throw new Error("Could not refresh Demo P title after dashboard template apply: " + err.message);
}

try {
  // existing Demo P date-format application
} catch (err) {
  throw new Error("Could not apply Demo P date format for " + headerName + ": " + err.message);
}
```

### Finding 2.4 — Repair validation catches return `false` and let callers keep running after failed repair

**Function/context:** `repairDateFormatForSectionG_`, catch logs and returns `false`.

**Risk:** Validation/repair code is expected to detect and correct template date formats. Returning `false` after an Apps Script API exception hides whether the repair failed because the sheet/range was invalid, protected, or had another structural issue.

**Fix snippet:** Use the throwing catch shown in Finding 1.3, or return a structured failure object and force the caller to mark the dashboard-quality section as hard failure.

---

## 3. HIDDEN GOOGLE SHEETS API ABUSE

### Finding 3.1 — Header font-size batching still calls `getRange()` once per header

**Function/context:** Template/header formatting builds `rangesByFontSize` by calling `sheet.getRange(headerRow, index + 1).getA1Notation()` inside `headers.forEach`.

**Risk:** Although the final write uses `RangeList`, every non-default header font size still incurs an API range construction call in an iteration. On wide dashboards/templates, this is avoidable overhead.

**Fix snippet:**

```javascript
headers.forEach(function(header, index) {
  const def = dashboard.columnDefinitions[header] || {};
  const fontSize = Number(def.headerFontSize || defaultHeaderFontSize);
  if (fontSize === Number(defaultHeaderFontSize)) return;
  if (!rangesByFontSize[fontSize]) rangesByFontSize[fontSize] = [];
  rangesByFontSize[fontSize].push(rowColToA1_(headerRow, index + 1));
});

function rowColToA1_(row, col) {
  let n = col;
  let letters = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    letters = String.fromCharCode(65 + r) + letters;
    n = Math.floor((n - 1) / 26);
  }
  return letters + row;
}
```

### Finding 3.2 — Number-format fallback performs per-range `getRange().setNumberFormat()` loops

**Function/context:** `enforceDateAndNumberFormatsForHeaders_`, fallback inside `Object.keys(rangesByFormat).forEach`.

**Risk:** The preferred path is batched with `RangeList`, but the fallback loops every A1 range and performs an Apps Script API call per range. If `RangeList` fails due to one malformed/oversized range, the fallback can hammer the API quota and still silently skip failures.

**Fix snippet:**

```javascript
try {
  sheet.getRangeList(ranges).setNumberFormat(googleSheetsFormat);
} catch (err) {
  throw new Error(
    (logPrefix || "Date/number format") +
    " failed for format " + googleSheetsFormat +
    " on " + sheet.getName() + ": " + err.message
  );
}
```

### Finding 3.3 — Hidden-column fallback loops one column at a time after swallowing the batch failure

**Function/context:** `applyHiddenColumnSettingsInRuns_`, fallback `for (let col = startCol; col < startCol + runLength; col++)` calls `hideColumns`/`showColumns` per column.

**Risk:** This creates a worst-case per-column API loop and masks protected/invalid column failures. In Apps Script, `hideColumns(startCol, runLength)` is the correct bulk API; if that fails, single-column retries are likely to fail for the same structural reason and should not continue silently.

**Fix snippet:**

```javascript
try {
  if (currentHidden) {
    sheet.hideColumns(startCol, runLength);
  } else {
    sheet.showColumns(startCol, runLength);
  }
} catch (err) {
  throw new Error(
    "Hidden column run failed for " + sheet.getName() +
    " columns " + startCol + "-" + (startCol + runLength - 1) +
    ": " + err.message
  );
}
```

### Finding 3.4 — Framework Test 9 summary sets column widths inside a loop

**Function/context:** `writeFrameworkTest9Summary_`, loop calls `getColumnWidth()` and `setColumnWidth()` for each column.

**Risk:** This is a surviving framework-test function and it performs column-level API calls in a loop. Even if retained, it should use `setColumnWidths` runs or be removed with the retired test suite.

**Fix snippet:**

```javascript
// Preferred: delete writeFrameworkTest9Summary_ with the retired Test 9 system.
// If retained:
const widths = [190, 90, 420, 120, 120, 120];
for (let i = 0; i < Math.min(colCount, widths.length); i++) {
  sheet.setColumnWidths(i + 1, 1, widths[i]);
}
```

---

## 4. V8 MEMORY LEAKS & O(N^2) TRAPS

### Finding 4.1 — Monthly Change section diff rebuilds sorted signatures once per field, per PMR

**Function/context:** `compareRawDemoPForSectionReport_` calls `getChangedColumnsForSectionRows_` for each section; that function loops fields and calls `buildColumnSignatureForSection_` separately for current and previous rows.

**Risk:** For every PMR and every field, the code maps and sorts the row group twice. With 6,500+ rows and many fields, this becomes a high-constant O(PMR × fields × rows-per-PMR × log(rows-per-PMR)) path and duplicates temporary arrays/strings. It is not strictly quadratic across all rows, but it behaves like an avoidable nested-signature trap.

**Fix snippet:**

```javascript
function getChangedColumnsForSectionRows_(currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap) {
  const changed = new Set();
  if (!currentItems || !currentItems.length || !previousItems || !previousItems.length) return changed;

  const currentSignatures = buildSignaturesByHeader_(currentItems, currentHeaderMap, columnsToCompare);
  const previousSignatures = buildSignaturesByHeader_(previousItems, previousHeaderMap, columnsToCompare);

  columnsToCompare.forEach(function(header) {
    if (currentHeaderMap[header] === undefined || previousHeaderMap[header] === undefined) return;
    if ((currentSignatures.get(header) || "") !== (previousSignatures.get(header) || "")) changed.add(header);
  });
  return changed;
}

function buildSignaturesByHeader_(items, headerMap, headers) {
  const out = new Map();
  headers.forEach(function(header) {
    const idx = headerMap[header];
    if (idx === undefined || idx === -1) return;
    out.set(header, items.map(function(item) {
      return normalizeCompareValue_(item.values[idx]);
    }).sort().join("||"));
  });
  return out;
}
```

### Finding 4.2 — Demo P contact flattening duplicates primary rows with `slice()` and collects all flat rows before writing

**Function/context:** `flattenDemoPContactsToPrimaryRows_`, `const output = primary.slice();`, `flatRows.push(output)`, then bulk clear/write.

**Risk:** This is safe for small sheets, but at 6,500+ rows × wide Demo P headers it duplicates the data array in memory: original `data.values`, grouped arrays, `output` row copies, contact summary strings, and final `flatRows` all coexist until write completion. V8 heap pressure is likely on wide reports.

**Fix snippet:**

```javascript
// Drop grouped row references as soon as each PMR is flattened and avoid retaining
// unused contact arrays longer than necessary.
const flatRows = [];
grouped.forEach(function(rows, pmr) {
  const primary = rows.find(function(row) { return isPrimaryPMRRowValue_(row[primaryIdx]); }) || rows[0];
  const output = primary.slice(0, data.headers.length);
  let targetCursor = 0;
  const summaries = [];

  rows.forEach(function(row) {
    if (row === primary) return;
    const summary = buildDemoPContactSummaryForFlatRecord_(row, headerMap);
    if (!summary) return;
    summaries.push(summary);
    if (targetCursor < contactTargetIndexes.length) {
      const targetIdx = contactTargetIndexes[targetCursor++];
      if (normalizeCompareValue_(output[targetIdx]) === "") output[targetIdx] = summary;
    }
  });

  if (summaryIdx !== undefined && summaries.length && normalizeCompareValue_(output[summaryIdx]) === "") {
    output[summaryIdx] = summaries.join("\n");
  }
  flatRows.push(output);
  grouped.set(pmr, null); // release row group reference earlier
});
```

### Finding 4.3 — Monthly Change legacy comparer aligns contact rows by array position rather than stable key

**Function/context:** `compareRawDemoPForChanges_`, contact diff uses `previousRows[i]` vs `currentRows[i]`.

**Risk:** This is both a correctness edge case and a diff-amplification trap. If one contact row is inserted or sorted differently, every subsequent contact row for that PMR appears changed. That can produce inflated Monthly Change reports and unnecessary Master List updates.

**Fix snippet:**

```javascript
function buildContactCompareMap_(rows, headerMap, pmr) {
  const map = new Map();
  (rows || []).forEach(function(item, ordinal) {
    const key = [
      pmr,
      getFieldValueFromRow_(item.values, headerMap, "Contact - First Name"),
      getFieldValueFromRow_(item.values, headerMap, "Contact - Last Name"),
      getFieldValueFromRow_(item.values, headerMap, "Relationship"),
      getFieldValueFromRow_(item.values, headerMap, "Type of Contact")
    ].map(normalizeCompareValue_).join("|") || ("row#" + ordinal);
    map.set(key, item);
  });
  return map;
}

// In compareRawDemoPForChanges_ contact section:
const previousMap = buildContactCompareMap_(previousRows, previousData.headerMap, pmr);
const currentMap = buildContactCompareMap_(currentRows, currentData.headerMap, pmr);
const allKeys = new Set([].concat(Array.from(previousMap.keys()), Array.from(currentMap.keys())));
allKeys.forEach(function(key) {
  const previousItem = previousMap.get(key) || null;
  const currentItem = currentMap.get(key) || null;
  // existing field comparison loop
});
```

---

## 5. GHOST ARTIFACTS & DEAD CODE

### Finding 5.1 — Retired Framework Test 6, 7, 9, and 10 artifacts remain

**Function/context:** Constants and function-name mappings for retired tests still exist, including `RFF_TEST7_VALIDATION_FAILURE_SHEET`, `RFF_TEST9_SUBHEADER_SHEET`, `runFrameworkTest6DateFormatting`, `runFrameworkTest7IntentionalValidationFailure`, `runFrameworkTest9MonthlyChangeSubheaders`, and `friendlyFrameworkSectionName_` mappings for Tests 6/7/9/10.

**Risk:** The user stated Tests 6, 7, 9, and 10 were purged. Surviving constants/functions can keep old menu/report paths alive, confuse Dashboard Quality output, and allow accidental execution of retired destructive/validation workflows.

**Fix snippet:**

```javascript
// Delete retired test constants and functions, then remove these mappings:
// if (sectionKey === RFF_TEST6_DATE_FORMAT_SHEET) return "Framework Test 6 - Date Formatting";
// if (sectionKey === RFF_TEST7_VALIDATION_FAILURE_SHEET) return "Framework Test 7 - Intentional Validation Failure";
// if (sectionKey === RFF_TEST9_SUBHEADER_SHEET) return "Framework Test 9 - Monthly Change Subheaders";
// if (sectionKey === RFF_TEST10_DASHBOARD_AUDIT_SHEET) return "Framework Test 10 - Dashboard Audit";
```

### Finding 5.2 — Standalone Monthly Change validation is retired but retained as a callable stub

**Function/context:** `validateMonthlyChangeStandalone()` only notifies that the workflow is retired.

**Risk:** A retired function still visible to Apps Script/manual invocation can confuse operators and may still be referenced by menus/triggers. Dead stubs should be removed or kept only as private compatibility wrappers outside UI menus.

**Fix snippet:**

```javascript
// Remove validateMonthlyChangeStandalone entirely, or make it private and ensure
// ML_MENU_CALLBACKS contains no references to it.
function validateMonthlyChangeStandalone_() {
  throw new Error("Standalone Monthly Change validation has been retired. Use Dashboard Quality Report.");
}
```

### Finding 5.3 — Legacy audit names appear to be purged successfully

**Function/context:** Whole-file search for `Update Master List Merge Audit` and `Primary Row Audit`.

**Risk:** No surviving textual references were found for those two named audit systems in v1.6.26. This portion of the purge appears complete.

**Fix snippet:** No change required.

---

## Verification performed

- `node --check /tmp/script.js` passed after copying the monolithic script to a temporary `.js` file for syntax checking.
- Repository search was performed with `rg`/targeted scripts for `try/catch`, Spreadsheet API calls, Monthly Change, Demo P, and retired-test artifacts.
