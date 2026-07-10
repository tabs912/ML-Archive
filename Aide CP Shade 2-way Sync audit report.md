# Aide CP Shade /2-way Sync audit report

## Executive Summary

The reviewed Google Apps Script automation provides a useful small-team workflow for gray-shading care-plan/service rows, pushing current sheet data to a master Home Care Services log, pulling master data back into local sheets, creating sheets from the master log, organizing tabs by date, and renaming Sheets/Drive files. The implementation contains several good defensive ideas, including whitespace-aware blank detection, strict equality usage, push-side formula escaping, lock-based sync intent, and validation utilities; however, the pasted script is not production-ready as-is because it is duplicated in full and contains several correctness, trigger, and Apps Script API-cost risks.

Per the stated operating assumption, the hardcoded target file ID is not treated as a security finding because all files are in a restricted-access folder. The most important remediation themes are: remove duplicated code, fix menu entrypoint/callback wiring, release locks safely, fail closed when the service-log tab is missing, avoid ambiguous name-based matching, escape reverse-sync writes, watch full mapped ranges instead of only trigger cells, validate headers, reduce full-sheet reads, and replace silent failure paths with strict operations where data integrity matters.

## Scope and Assumptions

* **Language / Framework:** Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.
* **Purpose:** Automate Aide CP shading and two-way sync between local participant/care-plan tabs and a master Home Care Services spreadsheet.
* **Hardcoded file ID:** Not considered a security concern for this audit because the user stated all files are contained in a restricted-access folder.
* **Line references:** The submitted prompt did not provide a physical source file with stable line numbers. References below use function names and nearby snippets; if the script is saved to a `.gs` file, these findings should be mapped to exact line numbers by editor/source control.

## Risk Summary

| Severity | Count | Themes |
| --- | ---: | --- |
| Critical / High | 10 | Parser failure, broken menu wiring, unsafe lock lifecycle, wrong-tab writes, ambiguous identity matching, formula injection, missed trigger edits, missing header validation, duplicate-key handling |
| Medium | 15 | Apps Script API costs, stale cache, broad sorting side effects, silent failures, partial-sheet creation, regex/data corruption, library architecture ambiguity |
| Low / Nitpicks | 16 | Naming, DRY, comments, object shorthand, Drive filename sanitation, compatibility, modularization |

## Critical / High Severity Findings

### HIGH-01: Full script duplication causes top-level redeclaration failures

**Reference:** The entire script appears twice. The second copy begins immediately after the first `createOnEditTrigger_()` closing brace at the repeated `/** GrayShade + Two-Way Data Sync — Master Library */` header.

**Finding:** The second copy redeclares top-level constants including `RULES`, `EXCLUDED_SHEETS`, `RENAME_EXCLUDED_SHEETS`, `EXCLUSION_CUTOFF_DATE`, `TARGET_FILE_ID`, and `SYNC_MAPPING`. In Apps Script V8/JavaScript, redeclaring top-level `const` bindings in the same scope is a parse-time error.

**Impact:** The script can fail to load entirely with an error similar to `SyntaxError: Identifier 'RULES' has already been declared`; menus, triggers, and sync functions will not run.

**Recommendation:** Remove the duplicate copy and keep exactly one definition of each global constant/function.

```javascript
/**
 * GrayShade + Two-Way Data Sync — Master Library
 */
var GrayShade = (function() {
  // one library core definition only
})();

const RULES = [/* one rules definition */];
const EXCLUDED_SHEETS = [/* one excluded-sheet list */];
const RENAME_EXCLUDED_SHEETS = [/* one rename-excluded list */];
const EXCLUSION_CUTOFF_DATE = new Date('2024-01-01');
const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
const SYNC_MAPPING = {/* one mapping definition */};
```

### HIGH-02: Custom menu callbacks using `GrayShadeLibrary.functionName` are likely invalid

**Reference:** `buildMenu()` uses strings such as `GrayShadeLibrary.applyGrayShadingCurrentSheet_` as menu callbacks.

**Finding:** Apps Script custom menu callbacks are resolved as function names in the container-bound project context. Dotted library namespace callbacks are fragile and commonly fail unless wrapper functions exist in the consuming spreadsheet project.

**Impact:** The custom menu may render, but clicking entries can fail with “function not found” behavior.

**Recommendation:** If the script is bound directly, remove the `GrayShadeLibrary.` prefix. If it is a true library, add wrapper functions in the consuming spreadsheet project.

```javascript
function onOpen(e) {
  buildMenu();
}

function buildMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Gray Shading')
    .addItem('Apply (current sheet)', 'applyGrayShadingCurrentSheet_')
    .addItem('Apply (all sheets)', 'applyGrayShadingAllSheets_')
    .addSeparator()
    .addItem('Push Sync to Service Log (Current Sheet)', 'syncCurrentSheetToHomeCareServices')
    .addItem('Pull Updates to Current Sheet', 'pullUpdatesToCurrentSheet')
    .addItem('Create New Sheet from Master', 'createNewSheetFromMaster')
    .addSeparator()
    .addItem('Organize Tabs by Date', 'triggerManualOrganization')
    .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
    .addItem('Remove "Copy of" (all sheets)', 'removeCopyOfPrefixAllSheets')
    .addSeparator()
    .addItem('Validate (current sheet)', 'validateMappingsCurrentSheet_')
    .addItem('Validate (all sheets)', 'validateMappingsAllSheets_')
    .addSeparator()
    .addItem('Create onEdit trigger', 'createOnEditTrigger_')
    .addToUi();
}
```

### HIGH-03: Missing `onOpen()` entrypoint prevents automatic menu creation

**Reference:** `buildMenu()` exists, but the submitted code does not define `onOpen(e)`.

**Finding:** Apps Script will not automatically call `buildMenu()`. Without an `onOpen()` simple trigger or external wrapper, users will not see the menu.

**Impact:** Manual sync, validation, sorting, cleanup, and trigger installation may be inaccessible to non-technical users.

**Recommendation:** Add a simple `onOpen` entrypoint.

```javascript
function onOpen(e) {
  buildMenu();
}
```

### HIGH-04: Lock release is unsafe when `tryLock()` fails

**Reference:** `syncDataToHomeCareServices_()` calls `lock.releaseLock()` unconditionally in `finally`.

**Finding:** If `lock.tryLock(15000)` returns `false`, the function returns from the `try` block and then executes `finally`, attempting to release a lock it does not hold.

**Impact:** A graceful “busy” state can become a runtime error.

**Recommendation:** Track lock acquisition explicitly.

```javascript
function syncDataToHomeCareServices_(sheet, isManual = false) {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    lockAcquired = lock.tryLock(15000);
    if (!lockAcquired) {
      if (isManual) activeSS.toast('Sync is busy. Please try again in a few seconds.', 'Busy');
      return;
    }

    // Existing sync logic here.
  } catch (err) {
    console.error('Sync Error', {
      message: err && err.message,
      stack: err && err.stack,
      sheetName: sheet && sheet.getName()
    });
    if (isManual) activeSS.toast('Error: Sync failed. Please try again.', 'Sync Failed');
  } finally {
    if (lockAcquired) lock.releaseLock();
  }
}
```

### HIGH-05: Missing service-log tab falls back to the first sheet

**Reference:** Both `syncDataToHomeCareServices_()` and `findRowInMaster_()` use `if (!targetSheet) targetSheet = targetSS.getSheets()[0];`.

**Finding:** If `Home Care Services` is renamed, deleted, or unavailable, the script silently reads/writes the first sheet in the workbook.

**Impact:** Wrong-tab reads/writes can corrupt data or import incorrect records.

**Recommendation:** Fail closed.

```javascript
function getServiceLogSheet_() {
  const targetSS = SpreadsheetApp.openById(TARGET_FILE_ID);
  const targetSheet = targetSS.getSheetByName('Home Care Services');
  if (!targetSheet) throw new Error('Required sheet "Home Care Services" was not found.');
  return targetSheet;
}
```

### HIGH-06: Name fallback can update or import the wrong participant

**Reference:** `rowIndexToUpdate = pmrMap.get(pmrKey) || nameMap.get(nameKey) || -1` and `findRowInMaster_(pmr) || findRowInMaster_(name)`.

**Finding:** PMR appears to be the unique identity key, while participant names are not guaranteed unique.

**Impact:** A blank/incorrect PMR or duplicate name can overwrite or import another participant’s record.

**Recommendation:** Require PMR for automated push sync, or allow name fallback only when exactly one row matches.

```javascript
const pmr = String(dataToSync['Participant PMR#'] || '').trim();
if (!pmr) {
  if (isManual) activeSS.toast('Skipped: PMR# is required for safe sync.', 'Sync Skipped');
  return;
}
const rowIndexToUpdate = pmrMap.get(pmr.toLowerCase()) || -1;
```

### HIGH-07: Reverse sync can write formula payloads into local sheets

**Reference:** `writeToRangeText_()` writes `setValue(value)` without using `escapeForSheetCell_()`.

**Finding:** Push sync escapes values beginning with `=`, `+`, `-`, or `@`, but reverse sync does not. A formula-like master-log value can be written into a local sheet as a formula.

**Impact:** Spreadsheet formula injection during pull/reverse sync.

**Recommendation:** Escape all reverse-sync writes unless a field is explicitly trusted as a formula.

```javascript
function writeToRangeText_(sheet, a1Notation, value) {
  const targetCell = a1Notation.includes(':') ? a1Notation.split(':')[0] : a1Notation;
  sheet.getRange(targetCell).setValue(escapeForSheetCell_(value));
}
```

### HIGH-08: Edit trigger misses changes inside mapped multi-cell ranges

**Reference:** `installedOnEdit()` watches only single cells in `syncTriggerCells`.

**Finding:** The trigger checks intersection against cells like `B11`, `I5`, and `G6`, but sync data reads ranges like `B11:G12`, `I5:M5`, and `G6:M9`. Edits to `C11`, `G12`, `M5`, or `H8` will not trigger sync.

**Impact:** Master service log can become stale after edits inside mapped ranges.

**Recommendation:** Derive watch ranges from `SYNC_MAPPING` and notes ranges.

```javascript
function getSyncWatchRanges_() {
  return Array.from(new Set(Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9'])));
}

function shouldSyncEdit_(sheet, editedRange) {
  return getSyncWatchRanges_().some(a1 => GrayShade.rangesIntersect_(editedRange, sheet.getRange(a1)));
}
```

### HIGH-09: Master service-log headers are not validated

**Reference:** `const headers = values[0].map(h => String(h).trim());`.

**Finding:** The script assumes a header row exists and contains required headers such as `Participant PMR#` and `Name`.

**Impact:** Empty or malformed master sheets can cause silent appends, bad row shapes, or unclear runtime errors.

**Recommendation:** Validate headers before building maps or writing rows.

```javascript
function getRequiredHeaders_(sheet) {
  if (sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) {
    throw new Error('Service log is missing a header row.');
  }
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(h => String(h).trim());
  ['Participant PMR#', 'Name'].forEach(required => {
    if (!headers.includes(required)) throw new Error(`Service log is missing required header "${required}".`);
  });
  return headers;
}
```

### HIGH-10: Duplicate PMR/name values are silently ignored

**Reference:** `buildRowIndexByColumn_()` keeps only the first key.

**Finding:** `if (key && !map.has(key)) map.set(key, r + 1);` suppresses duplicate PMRs/names.

**Impact:** Duplicate identity data is hidden, and the first row wins silently.

**Recommendation:** Store arrays of row indexes and fail on duplicate PMRs or ambiguous name lookups.

```javascript
function buildRowIndexesByColumn_(values, headers, headerName) {
  const idx = headers.indexOf(headerName);
  const map = new Map();
  if (idx === -1) return map;
  for (let r = 1; r < values.length; r++) {
    const key = String(values[r][idx] || '').trim().toLowerCase();
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(r + 1);
  }
  return map;
}
```

## Medium Severity Findings

### MEDIUM-01: `GrayShade.onEdit()` reacts only to source edits

Target-range edits do not re-assert gray state. If target formatting can be manually changed, the visual state may drift. Consider checking source and targets for intersection, then recomputing target shading.

### MEDIUM-02: `isSheetExcluded_()` can throw while evaluating exclusion

The function reads date ranges to determine exclusion. Wrap date-based exclusion in `try/catch`, log context, and choose a safe default.

```javascript
function isSheetExcluded_(sheet) {
  if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
  try {
    const ts = getSheetB4DateTimestamp_(sheet);
    return ts > 0 && ts < EXCLUSION_CUTOFF_DATE.getTime();
  } catch (err) {
    console.warn('Unable to evaluate sheet exclusion by date', { sheetName: sheet.getName(), message: err && err.message });
    return true;
  }
}
```

### MEDIUM-03: Newest-sheet cache can become stale

`getNewestSheetNamesCached_()` caches for 60 seconds and invalidates only exact `B4` edits. Sheet copy/delete/rename, edits inside merged date ranges, and script-driven date changes can make it stale. Prefer no cache for correctness or reduce TTL to 10 seconds.

### MEDIUM-04: `stripFieldPrefix_()` removes all digits

The `.replace(/[0-9]/g, '')` operation can corrupt provider/staff values containing valid digits. Remove only label prefixes.

```javascript
function escapeRegExp_(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripFieldPrefix_(value, label) {
  const cleanLabel = String(label || '').replace(':', '');
  return String(value || '')
    .replace(new RegExp('^' + escapeRegExp_(cleanLabel) + '\\s*:\\s*', 'i'), '')
    .trim();
}
```

### MEDIUM-05: Regex labels are not escaped

The dynamic regex in `stripFieldPrefix_()` should escape label text before building a `RegExp`, even if current labels are safe.

### MEDIUM-06: `parseStrictDate_()` should explicitly validate month/day bounds

The rollover validation works, but explicit bounds make failures clear.

```javascript
if (month < 1 || month > 12 || day < 1 || day > 31) return null;
```

### MEDIUM-07: `sortSheetsByB4DateDescending_()` includes excluded and hidden sheets

The function uses `ss.getSheets()` directly and can move `Instructions`, `Settings`, `Dashboard`, `Archive`, `Home Care Services`, and hidden sheets. Filter them before sorting.

### MEDIUM-08: Sheet sorting is Apps Script API expensive

`setActiveSheet()` and `moveActiveSheet()` are repeated inside a loop. For many tabs this will be slow and quota-heavy. Consider making sorting manual-only above a sheet-count threshold.

### MEDIUM-09: `createOnEditTrigger_()` leaves legacy `onEdit` triggers

The deletion filter only removes `installedOnEdit`. Include both handler names to avoid duplicate trigger behavior.

```javascript
.filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
```

### MEDIUM-10: `createNewSheetFromMaster()` can leave partial copied sheets

If an exception occurs after `copyTo()`, the workbook may contain a partially initialized sheet. Wrap the flow in `try/catch` and tell the user if a partial sheet remains.

### MEDIUM-11: Full-service-log reads are expensive

Both push and reverse sync use full `getDataRange().getValues()` reads. For large logs, read the header row and identity columns first, then fetch only the matched row.

### MEDIUM-12: Repeated source range reads are expensive

`syncDataToHomeCareServices_()` performs one Apps Script read per mapping. Because ranges are non-contiguous, full batching is hard, but isolate collection logic and consider broader block reads if the layout is stable.

### MEDIUM-13: `safeGetRange_()` silently swallows errors

This is fine for validation but risky for required sync fields. Add a strict `getRequiredRange_()` for data-critical paths.

### MEDIUM-14: Large arrays are held longer than needed

`const values = targetSheet.getDataRange().getValues();` can load and retain the entire master sheet. Scope large arrays tightly and avoid full-sheet reads where possible.

### MEDIUM-15: Missing required headers silently changes behavior

`buildRowIndexByColumn_()` returns an empty map if a header is missing, but callers may then append rows instead of failing. Required headers should be fatal.

## Low Severity / Nitpicks

* `var GrayShade` can be `const GrayShade` unless `var` is intentionally needed for Apps Script library exposure.
* `rangesIntersect_` is exported publicly but named like a private helper. Prefer `rangesIntersect` in the public API.
* Use object shorthand in the returned API: `return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_ };`.
* Replace `new Date().getTime()` with `Date.now()`.
* Replace `rawName.split(' ')` with `rawName.split(/\s+/)`.
* Sanitize Drive filenames independently from sheet names.
* `removeCopyOfPrefixAllSheets()` should use `makeUniqueSheetName_()` to avoid duplicate-name failures.
* `removeCopyOfPrefixAllSheets()` should report partial failures to users, not only log warnings.
* `SYNC_MAPPING` duplicates personnel aliases such as `Provider` and `Provider:`; consider an alias structure.
* `getRangeText_()` uses `flat()`, which is fine in Apps Script V8 but should be noted if legacy runtime compatibility matters.
* Validation message construction is duplicated between current-sheet and all-sheets validation.
* The all-in-one file should be split into `GrayShadeCore.gs`, `Config.gs`, `DateHelpers.gs`, `ServiceLogPushSync.gs`, `ServiceLogReverseSync.gs`, `SheetOrganization.gs`, `RenameHelpers.gs`, `Menu.gs`, `Triggers.gs`, and `Validation.gs`.
* Comments mostly describe sections; add comments explaining business rules, e.g., why only newest sheets should auto-sync.
* No loose equality (`==`) issues were observed; strict equality is used consistently.
* `let cleanText` in `parseStrictDate_()` can be `const cleanText`.
* Consider documenting the restricted-folder operational assumption beside `TARGET_FILE_ID` even though it is not considered a security concern for this audit.

## Apps Script API Cost Review

| Area | Current Cost | Risk | Recommendation |
| --- | --- | --- | --- |
| `syncDataToHomeCareServices_()` source collection | One `getRange()` read per mapped field | Slow under frequent edits | Isolate `collectSyncData_()` and consider block reads for stable layout |
| `targetSheet.getDataRange().getValues()` | Reads entire service log | Memory/time grows with log | Read headers and identity columns first; fetch matched row only |
| `findRowInMaster_()` | Full-sheet read per lookup | Slow reverse sync | Column-only lookup followed by single-row fetch |
| `sortSheetsByB4DateDescending_()` | Repeated `setActiveSheet()` + `moveActiveSheet()` | Slow/quota-heavy with many tabs | Manual-only above threshold; filter excluded/hidden sheets |
| `getNewestSheetNamesCached_()` | Cache read/write plus full sheet date scan on miss | Stale state and repeated range reads | Reduce TTL or recompute for correctness-critical sync |
| `removeCopyOfPrefixAllSheets()` | One `setName()` per changed sheet | Acceptable but partial failure hidden | Use unique-name helper and report failures |

## JavaScript Inefficiency Review

* Avoid building maps that hide duplicates; build key-to-array maps once and validate uniqueness.
* Avoid `.map(...).filter(...).join(...)` in hot paths if range sizes grow, though current sizes are small.
* Avoid dynamic regex without escaping labels.
* Use `Date.now()` instead of `new Date().getTime()`.
* Use `const` where variables are not reassigned.
* Avoid full `getDataRange()` reads when only selected columns are needed.

## Silent Failure and Edge Case Review

* `safeGetRange_()` returns `null` for all failures, hiding configuration errors.
* `resolveRef_()` exceptions are swallowed in several loops with `catch (_) { return; }`.
* Missing service-log sheet silently falls back to the first tab.
* Missing service-log headers silently produce empty maps.
* Duplicate PMR/name values are silently ignored.
* Reverse sync does not escape formulas.
* `isSheetExcluded_()` can fail while evaluating old-date exclusion.
* `CacheService` value parsing assumes valid JSON without a defensive `try/catch`.
* `rowData['Date:']` may contain invalid date text; the sheet name is sanitized but not semantically validated.
* Partial sheets can remain after `createNewSheetFromMaster()` errors.

## Recommended Remediation Order

1. Remove the duplicate script copy.
2. Fix menu architecture and add `onOpen()`.
3. Fix lock acquisition/release handling.
4. Replace service-log first-sheet fallback with fail-closed `getServiceLogSheet_()`.
5. Validate required headers before sync.
6. Remove or strictly constrain name-based fallback.
7. Escape reverse-sync writes.
8. Watch full sync ranges in `installedOnEdit()`.
9. Detect duplicate PMRs/names explicitly.
10. Reduce full-sheet reads and repeated Apps Script API calls.
11. Split the script into smaller Apps Script files.
12. Add targeted operational tests for lock-busy, missing header, duplicate PMR, missing service-log tab, multi-cell edits, and reverse formula escaping.
