### **Codex Prompt: Wave 4 Master List Optimization & Sync Patch**

**Context:** The Wave 4 Report Formatter Framework is experiencing two primary issues during the `Create Monthly Update` and `Create Master List` workflows:

1. **Performance Bottleneck:** Creating the Master List canvas takes 80+ seconds due to API looping in `getConfiguredSheetCreationIndex_` and forced flushes triggered by `getHeaders_` evaluating sheet dimensions.  
2. **Data Sync Failure:** "Unlocked CP" and "Care Plan Due" background syncs are yielding 36% and 48% blank rates, respectively. This is caused by PMR decimal formatting discrepancies (`12345.0` vs `12345`) and middle-initial mismatches (`Doe, John M` vs `Doe, John`) failing the exact-match requirement. Furthermore, Unlocked CP is improperly overwriting cleanly formatted Master List names, causing downstream failures for the Care Plan Due sync.

**Objective:** Apply static caching to bypass the API loop, introduce a smart fuzzy-match sync normalizer to bridge syntax gaps, and remove the destructive name overwrites from the Unlocked CP sync.

**Instructions & Replacements:** Implement the following 5 code replacements within the framework.

#### **Step 1: Fix Timing & Caching Bottlenecks**

Replace the following caching functions to use a static execution key and remove the `getLastColumn` API call. Then, append `SpreadsheetApp.flush()` to the disenrollment workflow to ensure accurate timing logs.

JavaScript

```
function getDashboardConfigCacheKey_() {
  // Use a static execution key to instantly bypass the API loop bottleneck.
  return "STATIC_EXECUTION_CACHE";
}

function getHeaderCacheKey_(sheet, headerRow) {
  if (!sheet) return "";
  const row = headerRow || HEADER_ROW;
  // Removed the sheet.getLastColumn() API call to prevent forced flushes 
  return sheet.getSheetId() + ":" + row;
}

// Locate `moveDisenrolledPMRsFromDemoPToExclusion_` and insert this flush before the return:
  clearSheetRuntimeCachesForSheet_(exclusionSheet);
  step("runtime caches cleared after disenrollment move");
  
  SpreadsheetApp.flush(); // Forces pending writes before Master List canvas starts
  
  return result;
}
```

#### **Step 2: Implement the Smart Sync Normalizer**

Inject this new helper function into the `SYNC FUNCTIONS` section. This handles decimal stripping for PMRs and aggressive middle-initial removal for fuzzy name matching.

JavaScript

```
function normalizeSyncKey_(value, header) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim().toLowerCase();

  // 1. PMR Normalization: Strip spaces and trailing Excel decimals
  if (header.indexOf("PMR") !== -1) {
    return text.replace(/\s+/g, "").replace(/\.0$/, "");
  }

  // 2. Name Normalization: Handle "Last, First M" middle initials
  if (header === "Participant Name" || header === "Name") {
    if (text.indexOf(",") !== -1) {
      const parts = text.split(",");
      const last = parts[0].trim().replace(/\s+/g, "");
      // Split the first name by space and take ONLY the first word, dropping initials
      const first = parts[1].trim().split(/\s+/)[0].replace(/[^a-z0-9]/g, "");
      return last + first;
    }
    return text.replace(/\s+/g, "");
  }

  // 3. Default fallback
  return text.replace(/\s+/g, " ");
}
```

#### **Step 3: Update Sync Map Builders**

Replace the existing `buildSourceMapBySingleKeyForPart5_` and `buildSourceMapByCompositeKeyForPart5_` functions to leverage the new normalizer.

JavaScript

```
function buildSourceMapBySingleKeyForPart5_(sheet, headerRow, dataStartRow, keyHeader) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;

  const data = getDataValues_(sheet, headerRow, dataStartRow);
  const map = new Map();

  if (!data.values.length) return map;

  const headers = data.headers;
  const headerMap = data.headerMap;
  const keyIdx = headerMap[keyHeader];

  if (keyIdx === undefined) return map;

  data.values.forEach(row => {
    // UPDATED: Use the smart sync normalizer
    const key = normalizeSyncKey_(row[keyIdx], keyHeader);
    if (!key) return;

    const record = {};
    headers.forEach((header, idx) => {
      if (header) record[header] = row[idx];
    });

    map.set(key, record);
  });

  return map;
}

function buildSourceMapByCompositeKeyForPart5_(sheet, headerRow, dataStartRow, keyHeaders) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;

  const data = getDataValues_(sheet, headerRow, dataStartRow);
  const map = new Map();

  if (!data.values.length) return map;

  const headers = data.headers;
  const headerMap = data.headerMap;

  if (keyHeaders.some(header => headerMap[header] === undefined)) return map;

  data.values.forEach(row => {
    // UPDATED: Use the smart sync normalizer
    const key = keyHeaders
      .map(header => normalizeSyncKey_(row[headerMap[header]], header))
      .join("|||");

    if (key.replace(/\|/g, "") === "") return;

    const record = {};
    headers.forEach((header, idx) => {
      if (header) record[header] = row[idx];
    });

    map.set(key, record);
  });

  return map;
}
```

#### **Step 4: Update Sync Executors**

Replace `syncRowsFromSourceMapData_` and `syncRowsFromSourceMap_` to complete the normalizer integration on the write side.

JavaScript

```
function syncRowsFromSourceMapData_(data, sourceMap, config, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;

  const headerMap = data.headerMap;
  const fields = normalizeSyncFieldPairs_(config.fields);
  const targetKeyHeaders = config.sourceKeyHeaders || config.masterKeyHeaders;

  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;

    // UPDATED: Use the smart sync normalizer
    const key = config.masterKeyHeaders
      .map((header, i) => normalizeSyncKey_(row[headerMap[header]], targetKeyHeaders[i]))
      .join("|||");

    if (key.replace(/\|/g, "") === "") return;
    if (!sourceMap.has(key)) return;

    const source = sourceMap.get(key);

    fields.forEach(pair => {
      const destHeader = pair[0];
      const sourceHeader = pair[1];
      const destIdx = headerMap[destHeader];

      if (destIdx === undefined) return;
      if (!Object.prototype.hasOwnProperty.call(source, sourceHeader)) return;

      row[destIdx] = source[sourceHeader];
    });
  });
}

function syncRowsFromSourceMap_(masterSheet, sourceMap, config, pmrFilter) {
  const data = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);

  if (!data.values.length) return;

  const headers = data.headers;
  const headerMap = data.headerMap;
  const values = data.values;
  const fields = normalizeSyncFieldPairs_(config.fields);
  const targetKeyHeaders = config.sourceKeyHeaders || config.masterKeyHeaders;

  values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;

    // UPDATED: Use the smart sync normalizer
    const key = config.masterKeyHeaders
      .map((header, i) => normalizeSyncKey_(row[headerMap[header]], targetKeyHeaders[i]))
      .join("|||");

    if (key.replace(/\|/g, "") === "") return;
    if (!sourceMap.has(key)) return;

    const source = sourceMap.get(key);

    fields.forEach(pair => {
      const destHeader = pair[0];
      const sourceHeader = pair[1];

      const destIdx = headerMap[destHeader];
      if (destIdx === undefined) return;

      if (!Object.prototype.hasOwnProperty.call(source, sourceHeader)) return;

      row[destIdx] = source[sourceHeader];
    });
  });

  if (data.range) data.range.setValues(values);
}
```

#### **Step 5: Prevent Unlocked CP Name Overwrite**

Replace these functions and the constant to prevent Unlocked CP from overwriting cleanly formatted Master List names with its own middle-initial-free names, which previously broke the Care Plan Due sync.

JavaScript

```
function syncUnlockedCarePlanSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentUnlockedCarePlanSheet_(monthParts);

  if (!sourceSheet) {
    notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped.");
    return;
  }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(
    sourceSheet,
    HEADER_ROW,
    DATA_START_ROW,
    "PMR #"
  );

  syncRowsFromSourceMapData_(
    data,
    sourceMap,
    {
      masterKeyHeaders: ["Participant PMR#"],
      sourceKeyHeaders: ["PMR #"],
      fields: [
        // Removed Participant Name and PMR # overwrites
        ["IDT Meeting Date", "IDT Meeting Date"],
        ["Care Plan Start Date", "Care Plan Start Date"]
      ]
    },
    pmrFilter || null
  );
}

function syncMasterListFromUnlockedCarePlan_(masterSheet, monthParts, pmrFilter) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = getCurrentUnlockedCarePlanSheet_(monthParts);

  if (!sourceSheet) {
    notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped.");
    return;
  }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(
    sourceSheet,
    HEADER_ROW,
    DATA_START_ROW,
    "PMR #"
  );

  syncRowsFromSourceMap_(
    masterSheet,
    sourceMap,
    {
      masterKeyHeaders: ["Participant PMR#"],
      sourceKeyHeaders: ["PMR #"],
      fields: [
        // Removed Participant Name and PMR # overwrites
        ["IDT Meeting Date", "IDT Meeting Date"],
        ["Care Plan Start Date", "Care Plan Start Date"]
      ]
    },
    pmrFilter
  );
}

// Locate and update this constant:
const UNLOCKED_SYNC_FIELDS = [
  "IDT Meeting Date",
  "Care Plan Start Date"
];
```

Would you like to move on and review the `Dashboard Quality Workflow` timings next to address its 52-second variance from the benchmark?

**Context:** The Wave 4 Report Formatter Framework is experiencing severe performance degradation during the Dashboard Quality Workflow. The workflow is currently executing in 82.637 seconds, exceeding its governed 30-second benchmark by 52.637 seconds.

Analysis of the timing telemetry reveals two primary architectural flaws driving this variance:

1. **The Changelog API Loop:** The Dashboard Quality Section H cell-differential changelog unchanged step takes 10.713 seconds. The changelog evaluates 8 distinct dashboard sections. By passing the live SpreadsheetApp sheet object into the evaluation loops instead of a pre-built memory index, it triggers 8 consecutive getDataRange().getValues() API reads.  
2. **Rogue Direct Writes:** The Section R Signoff complete step takes 11.029 seconds. The framework is designed to stage all dashboard quality updates into memory (ML\_DASHBOARD\_QUALITY\_STAGED\_BUFFERS\_) and execute a single batch canvas flush at the end of the workflow. However, four section runners (Changelog, Template Validation, Summary, and Signoff) are bypassing this buffer and executing direct replaceDashboardQualitySectionRows\_ writes. This forces the script to recalculate sheet boundaries, write data, and trigger full repaints 4 separate times.

**Objective:**

Eliminate redundant API calls by passing the memory index into the changelog loop, and enforce the staged buffer pattern across all Dashboard Quality sections to guarantee a single, unified batch write.

**Instructions & Replacements:**

Implement the following 3 code replacements within the framework.

#### **Step 6: Fix the Changelog API Loop**

Replace the updateFormatDashboardChangelog\_ function. This updated version builds the dashboardIndex once in memory and passes it to the readers, instantly bypassing the consecutive API loops.

JavaScript

```
function updateFormatDashboardChangelog_(dashboardSheet, timing) {
  const props = PropertiesService.getDocumentProperties();
  let logRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
  if (!logRows || logRows.length === 0) {
    logRows = [["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value", "", ""]];
  } else {
    logRows[0] = ["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value", "", ""];
  }

  const sectionsToTrack = [
    RFF_SECTION_GLOBAL,
    RFF_SECTION_TITLE_ROWS,
    RFF_SECTION_SHEETS,
    RFF_SECTION_BEHAVIORS,
    RFF_SECTION_SYSTEM_SURFACES,
    RFF_SECTION_TAB_ORGANIZATION,
    RFF_SECTION_COLUMNS,
    RFF_SECTION_HEADERS
  ];

  let changed = false;
  const now = new Date();
  
  // OPTIMIZATION: Build memory index once to instantly bypass 8 API loops
  const dashboardIndex = buildDashboardSectionIndex_(dashboardSheet);

  sectionsToTrack.forEach(function(sectionTitle) {
    try {
      // Pass the memory index instead of the Sheet object
      const currentRows = readDashboardSectionRows_(dashboardIndex, sectionTitle);
      const propKey = RFF_QA_SECTION_PROP_PREFIX + "TRACKER_DATA_" + computeStableHash_(sectionTitle);
      const rawPrevious = props.getProperty(propKey);
      props.setProperty(propKey, JSON.stringify(currentRows));
      if (!rawPrevious) return;
      const previousRows = JSON.parse(rawPrevious);
      const sectionHeader = getFormatDashboardSectionHeaderForChangelog_(dashboardIndex, sectionTitle);

      for (let r = 0; r < currentRows.length; r++) {
        const currRow = currentRows[r] || [];
        const prevRow = previousRows[r] || [];
        const maxCols = Math.max(currRow.length, prevRow.length);
        for (let c = 0; c < maxCols; c++) {
          const currVal = currRow[c] !== undefined ? String(currRow[c]).trim() : "";
          const prevVal = prevRow[c] !== undefined ? String(prevRow[c]).trim() : "";
          if (currVal !== prevVal) {
            const columnName = sectionHeader[c] || "Column " + (c + 1);
            logRows.splice(1, 0, [
              now,
              sectionTitle,
              columnName,
              prevVal || "(blank)",
              currVal || "(blank)",
              "",
              ""
            ]);
            changed = true;
          }
        }
      }
    } catch (err) {
      logBestEffortWarning_("Cell differential changelog failed for " + sectionTitle + ": " + err.message);
    }
  });

  if (changed) {
    const trimmedLog = [logRows[0]].concat(logRows.slice(1, 100));
    saveDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY, trimmedLog, { deferSheetWrite: true });
    if (timing) markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog updated");
  } else {
    saveDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY, logRows, { deferSheetWrite: true });
    if (timing) markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog unchanged");
  }
  return changed;
}
```

#### 

#### **Step 7: Remove Direct Writes from Changelog & Templates**

Replace these two runner functions. The direct replaceDashboardQualitySectionsRows\_ sheet-write calls have been removed since the data is already safely staged in memory.

JavaScript

```
function runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet) {
  if (!dashboardSheet) return false;
  const previousChangelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
  const changelogUpdated = updateFormatDashboardChangelog_(dashboardSheet, timing);
  const changelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);

  if (!dashboardQualityRowsEqualValues_(previousChangelogRows, changelogRows) || changelogUpdated) {
    // OPTIMIZATION: Removed direct write. Row data is already staged for final flush.
    markFrameworkStep_(timing, "Dashboard Quality Section H staged");
  } else {
    markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog unchanged");
  }

  highlightFormatDashboardChangesFromChangelog_(dashboardSheet, timing);
  return changelogRows;
}

function runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard) {
  const previousValidationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);
  validateReportTemplatesCore_(dashboard, timing, { deferDashboardWrite: true });
  const validationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);

  if (!dashboardQualityRowsEqualValues_(previousValidationRows, validationRows)) {
    // OPTIMIZATION: Removed direct write. Data is staged by deferDashboardWrite flag.
    markFrameworkStep_(timing, "Dashboard Quality Section G staged");
  } else {
    markFrameworkStep_(timing, "Dashboard Quality Section G sheet write skipped - unchanged");
  }

  return validationRows;
}
```

####  

#### **Step 8: Stage the Summary and Signoff Sections**

Replace the Summary and Signoff writers. Instead of fetching the sheet and repainting it directly, they must now strictly use saveDashboardQualitySectionRows\_ with the { deferSheetWrite: true } flag to leverage the buffer.

JavaScript

```
function updateDashboardQualitySummarySection_() {
  const summaryRows = [["Metric", "Value", "Status", "Quality Notes"]];
  buildFrameworkSummaryRows_().forEach(function(row) {
    summaryRows.push(row);
  });
  
  // OPTIMIZATION: Stage rows instead of executing a direct sheet write/repaint
  saveDashboardQualitySectionRows_("Summary", summaryRows, { deferSheetWrite: true });
  PropertiesService.getDocumentProperties().setProperty(RFF_QA_SECTION_PROP_PREFIX + "Summary" + "_LAST_RUN", String(new Date().getTime()));
  
  return summaryRows;
}

function updateDashboardQualitySignoffSection_() {
  const signoffRows = [];
  appendCombinedDashboardSignOffRows_(signoffRows);
  while (signoffRows.length && signoffRows[0].length === 1 && String(signoffRows[0][0] || "") === "") {
    signoffRows.shift();
  }
  
  // OPTIMIZATION: Stage rows instead of executing a direct sheet write/repaint
  saveDashboardQualitySectionRows_("Signoff", signoffRows.slice(1), { deferSheetWrite: true });
  PropertiesService.getDocumentProperties().setProperty(RFF_QA_SECTION_PROP_PREFIX + "Signoff" + "_LAST_RUN", String(new Date().getTime()));
  
  return signoffRows.slice(1);
}
```

**Context:** The Wave 4 Report Formatter Framework has implemented caching and array batching, but timing telemetry reveals three remaining structural bottlenecks that must be resolved to align with the framework's optimization recommendations.

1. **CPU Burn on Date Coercion:** During the Monthly Change report compilation, `normalizeCompareValue_` attempts to execute expensive date coercion (`coerceToValidDate_`) on standard text strings, names, and phone numbers. This burns 23.9 seconds of CPU time during the in-memory array mapping.  
2. **Flawed Diagnostic Engine:** The `getPerformanceRecommendationForTimingStep_` function is hardcoded to output template-specific advice ("Separate first-build/full-rebuild timing...") for *any* process that exceeds its benchmark, causing misleading diagnostic reporting for data workflows like Demo P or Master List.  
3. **Outdated Formatting Loops:** The `ensureOutputSheetHasFormattedRows_` function iterates through a `while` loop to copy formatting in chunks, creating an 18-second bottleneck during row capacity expansion.

**Objective:** Apply a fast-path regex bypass to the string normalizer, update the performance recommendation engine to provide context-aware diagnostics based on the process name, and replace iterative format copying with a single batch execution.

**Instructions & Replacements:** Implement the following 3 code replacements within the framework.

#### **Step 9: Add Fast-Path Bypass to String Normalization**

Replace the existing `normalizeCompareValue_` function. This updated version adds a regex check to ensure expensive date processing is only attempted on strings containing numbers and valid date separators.

JavaScript

```
function normalizeCompareValue_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return String(year) + "-" + month + "-" + day;
  }

  if (value === null || value === undefined) return "";

  const text = String(value).trim();
  if (text === "") return "";

  // OPTIMIZATION: Fast-path bypass. Only attempt expensive date coercion 
  // if the string actually contains numbers and date separators.
  if (/\d/.test(text) && /[\/.\-]/.test(text)) {
    const parsed = coerceToValidDate_(text);
    if (parsed && /\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}/.test(text)) {
      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, "0");
      const day = String(parsed.getDate()).padStart(2, "0");
      return String(year) + "-" + month + "-" + day;
    }
  }

  return text.toLowerCase().replace(/\s+/g, " ");
}
```

#### **Step 10: Context-Aware Performance Recommendations**

Replace `getPerformanceRecommendationForTimingStep_` so it provides accurate, workflow-specific advice when a benchmark is exceeded, rather than defaulting to template logic.

JavaScript

```
function getPerformanceRecommendationForTimingStep_(process, step, seconds, severity) {
  const text = String(step || "").toLowerCase();
  const processName = String(process || "").toLowerCase();

  if (text.indexOf("process exceeded benchmark") !== -1) {
    // OPTIMIZATION: Context-aware benchmark recommendations
    if (processName.indexOf("template") !== -1) {
      return "Separate first-build/full-rebuild timing from metadata-only refresh, apply the governed benchmark for that mode, and optimize the largest full-build steps before treating this as a steady-state failure.";
    }
    if (processName.indexOf("dashboard quality") !== -1) {
      return "Convert iterative section writes to a staged memory buffer to reduce Apps Script range repaints.";
    }
    if (processName.indexOf("monthly") !== -1 || processName.indexOf("demo p") !== -1 || processName.indexOf("master list") !== -1) {
      return "Optimize 2D-array memory processing. Apply fast-path bypasses to heavy normalizers like date coercion.";
    }
    return "Review workflow for API loops or missing fast-path execution exits.";
  }
  
  if (text.indexOf("dashboard loaded for sections f-g") !== -1) {
    return "Dashboard config reads are capped to governed dashboard columns and Section F is batch-written; rerun Validate Templates and compare this step against the v1.5.38 baseline.";
  }
  if (text.indexOf("dashboard quality sections a-e updated") !== -1) {
    return "A-E section writes now skip redundant unmerge work in batch mode and merge adjacent style ranges to reduce Apps Script range calls.";
  }
  if (text.indexOf("error -") !== -1) {
    return "Resolve the runtime exception before performance tuning this workflow; timed errors are forced to CRITICAL even when the failure is fast.";
  }
  if (text.indexOf("resize rows") !== -1) {
    return "Review dashboard Template Row Count and row mode. Row resizing is the likely source of this resize cost.";
  }
  if (text.indexOf("resize columns") !== -1) {
    return "Review Dashboard Section C header count and remove obsolete columns only through Sheet Headers.";
  }
  if (text.indexOf("resize sheet") !== -1) {
    return "Split resize timing into rows and columns; v1.4.30 logs those separately for future runs.";
  }
  if (text.indexOf("dashboard quality") !== -1 && text.indexOf("saved") !== -1) {
    return "Use the contiguous A-O Dashboard Quality shell and repair stale shells before section writes. Keep section writes scoped between adjacent section titles.";
  }
  if (text.indexOf("apply row heights") !== -1) {
    return "Keep row-height work out of CP Due/Unlocked CP/Banner outputs. Use final forced 25px row lock only after Raw Data, Demo P, Master List, and Disenrolled processing because processing/data writes can expand rows.";
  }
  if (text.indexOf("create filter") !== -1) {
    return "Skip filter recreation when the existing filter already matches the governed template range.";
  }
  if (text.indexOf("clear sheet") !== -1 || text.indexOf("clear formats") !== -1) {
    return "Use create-template fast path for blank sheets and reserve clear/rebuild only for existing template updates with signature mismatch.";
  }

  return "Review this slow step and confirm it is necessary for the governed dashboard/template path.";
}
```

#### 

#### **Step 11: Eliminate Iterative Formatting Loops**

Replace the `ensureOutputSheetHasFormattedRows_` function to copy formatting structures natively in a single API call instead of breaking them into smaller chunks via a while loop.

JavaScript

```
function ensureOutputSheetHasFormattedRows_(sheet, requiredRows, width) {
  if (!sheet) return;

  requiredRows = Math.max(Number(requiredRows || 1), DATA_START_ROW);
  width = Math.max(Number(width || 1), 1);
  const currentRows = sheet.getMaxRows();

  if (currentRows >= requiredRows) {
    return;
  }

  const rowsToAdd = requiredRows - currentRows;
  sheet.insertRowsAfter(currentRows, rowsToAdd);

  if (RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING) {
    try {
      // OPTIMIZATION: Single batch copy instead of while loop chunking
      sheet.getRange(DATA_START_ROW, 1, 1, width)
         .copyTo(sheet.getRange(currentRows + 1, 1, rowsToAdd, width), { formatOnly: true });
    } catch (err) {
      logBestEffortWarning_("Output template formatting extension skipped for " + sheet.getName() + ": " + err.message);
    }
  }
}
```

