# **The Final Unyielding Sheet Sorting Matrix** 

Replace your existing `getGlobalSheetSortRankByName_` function with this layout configuration. It forces `Demo P` into the second slot right after `Index`, packs the active workspaces tightly, positions the `Archive - Demo P` sheet right behind the disenrolled list, and sets up a rigid tail-end environment for system and template blocks.

JavaScript

```
function getGlobalSheetSortRankByName_(sheetName) {
  sheetName = String(sheetName || "").trim();
  
  // 1. Index is absolute first
  if (sheetName === INDEX_SHEET) return 5;
  
  // 2. Demo P is locked as absolute second
  if (sheetName === SHEET_TYPE.DEMO_P || sheetName === DEMO_P_PREFIX) return 10;
  
  // 3. Core Active Workspace Sequence
  if (sheetName.indexOf(MONTHLY_CHANGE_REPORT_PREFIX) === 0) return 20;
  if (sheetName.indexOf(MASTER_LIST_PREFIX) === 0) return 30;
  if (sheetName === DISENROLLED_EXCLUSION_SHEET || /^Disenrolled\b/i.test(sheetName)) return 40;
  
  // 4. Archive Slot (Always trailing directly behind active Disenrolled Exclusion)
  if (sheetName === DEMO_P_ARCHIVE_SHEET || sheetName.indexOf("Archive - Demo P") === 0) return 45;
  
  // 5. Formatted Monthly Production Imports Block
  if (sheetName.indexOf("Raw Data ") === 0 && sheetName.indexOf("Raw Data - ") === -1) return 50;
  if (sheetName.indexOf(BANNER_PREFIX) === 0 || sheetName.indexOf(BANNER_REPORT_ALT_PREFIX) === 0) return 60;
  if (sheetName.indexOf(CARE_PLAN_DUE_PREFIX) === 0 || sheetName.indexOf(CARE_PLAN_DUE_DATE_ALT_PREFIX) === 0) return 70;
  if (sheetName.indexOf(UNLOCKED_PREFIX) === 0 || sheetName.indexOf("Unlocked Care Plan") === 0) return 80;
  
  // 6. Unformatted Raw Source Imports Block (RD, B, CD, UC)
  if (sheetName.indexOf("Raw Data - Banners") === 0 || sheetName.indexOf("Raw Data - Banner Report") === 0) return 90;
  if (sheetName.indexOf("Raw Data - CP Due") === 0 || sheetName.indexOf("Raw Data - Care Plan Due") === 0) return 100;
  if (sheetName.indexOf("Raw Data - Unlock CP") === 0 || sheetName.indexOf("Raw Data - Unlocked") === 0) return 110;
  
  // Catch-all Tier for manual helper tabs (Fixed syntax closing bracket)
  var isSystemOrTemplate = (sheetName === "Framework Timing Report" || sheetName === RFF_TIMING_SHEET ||
                            sheetName === "Dashboard Quality Report" || sheetName === RFF_TEST_DASHBOARD_SHEET ||
                            sheetName === RFF_DASHBOARD_SHEET || sheetName === RFF_BASE_TEMPLATE_NAME ||
                            sheetName.indexOf("Template - ") === 0 || sheetName.indexOf("Template") !== -1);
  if (!isSystemOrTemplate) return 190;
  
  // UNYIELDING TAIL-BLOCK HOOKS
  if (sheetName === "Framework Timing Report" || sheetName === RFF_TIMING_SHEET) return 500;
  if (sheetName === "Dashboard Quality Report" || sheetName === RFF_TEST_DASHBOARD_SHEET) return 510;
  if (sheetName === RFF_DASHBOARD_SHEET) return 520;
  
  // TRAILING STORAGE ANCHORS
  if (sheetName.indexOf("Template - ") === 0 || sheetName.indexOf("Template") !== -1) return 800;
  if (sheetName === RFF_BASE_TEMPLATE_NAME) return 850;
  
  return 190;
}


```

Add this visibility hook inside your post-sort processing engine loop (`enforceGlobalSheetSortOrder_`) to make sure the archive tab automatically suppresses its view during layout shuffles:

JavaScript

```
// Append this within your sorting routine execution loops
  try {
    const archiveTarget = ss.getSheetByName(DEMO_P_ARCHIVE_SHEET) || ss.getSheetByName("Archive - Demo P");
    if (archiveTarget && archiveTarget.isSheetVisible()) {
      archiveTarget.hideSheet();
    }
  } catch (err) {
    logBestEffortWarning_("Archive tab structural visibility suppression skipped: " + err.message);
  }

```

# **Targeted Caseload Field-Differential Engine** 

Replace your `buildMonthlyChangeReportRow_` function with this updated matching script. It isolates the `Column Name -- Previous Value` formatting text rule **strictly** to the Caseload updates you specified, while allowing standard data columns to parse normally by name. 

JavaScript

```
function buildMonthlyChangeReportRow_(sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap) {
  const output = sourceRow.slice(0, sourceHeaders.length);
  
  while (output.length < reportHeaders.length) {
    output.push("");
  }
  
  const changeIdx = reportHeaders.indexOf("Columns With Change");
  if (changeIdx !== -1) { // Fixed missing condition parenthesis
    if (changedColumns && changedColumns.size > 0) {
      const detailedChangeStrings = [];
      const previousValues = previousItem && previousItem.values ? previousItem.values : []; // Fixed bracket assignment
      
      const caseloadFilter = [
        "Caseload - Social Work", 
        "Caseload - RN", 
        "Caseload - PCP", 
        "Caseload - HCC", 
        "Caseload - Activities", 
        "Caseload - OT", 
        "Caseload - PT", 
        "Caseload - RD", 
        "Caseload - Supervising MD"
      ];
      
      Array.from(changedColumns).sort().forEach(function(columnName) {
        if (caseloadFilter.indexOf(columnName) !== -1) {
          const previousColIdx = previousHeaderMap ? previousHeaderMap[columnName] : undefined;
          let previousValueDisplay = "";
          
          if (previousColIdx !== undefined && previousColIdx !== -1 && previousValues.length > 0) {
            previousValueDisplay = displayValueForReport_(previousValues[previousColIdx]);
          }
          
          if (previousValueDisplay !== "") {
            detailedChangeStrings.push(columnName + " -- " + previousValueDisplay);
          } else {
            detailedChangeStrings.push(columnName + " -- (blank)");
          }
        } else {
          detailedChangeStrings.push(columnName);
        }
      });
      
      output[changeIdx] = detailedChangeStrings.join(", ");
    } else {
      output[changeIdx] = "";
    }
  }
  
  return convertMonthlyChangeReportDateValues_(output, reportHeaders, dateIndexes);
}



```

# **Interactive Hyperlinked Index Restoration Router** 

Add this dedicated `doGet(e)` web receiver to your main configuration script. It captures row-level cell clicks from the `Index` canvas, processes the targeted sheet recovery macros in the background, and outputs an auto-closing HTML window. 

JavaScript

```
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const targetSheetName = e.parameter.restoreTarget;
  const actionType = e.parameter.action;
  
  if (!targetSheetName) {
    return HtmlService.createHtmlOutput("<p style='font-family: sans-serif;color:#cc0000;'>⚠️ Error: Missing recovery sheet routing token parameter.</p>");
  }
  
  try {
    const lock = LockService.getDocumentLock();
    if (lock.tryLock(15000)) { // Fixed assignment operator "="
      if (actionType === "demo_p_archive") {
        restoreSheetFromArchiveWorkbook(targetSheetName);
      } else {
        restoreSheetFromActiveIndexRow(targetSheetName);
      }
      LockService.releaseLock();
      
      return HtmlService.createHtmlOutput(
        "<script>window.top.close();</script>" +
        "<body style='font-family: sans-serif; text-align:center; padding-top: 35px; background-color:#f8f9fa;'>" +
        "  <h3 style='color:#2b7a78;'>🔄 Restoration Complete!</h3>" +
        "  <p>Processed pipeline synchronization parameters for target workspace: <b>" + targetSheetName + "</b></p>" +
        "  <p style='color:#777;font-size:11px;'>This deployment window can be safely closed.</p>" +
        "</body>"
      );
    } else {
      return HtmlService.createHtmlOutput("<p>⚠️ Server busy processing another task execution string. Click the hyperlink tab again.</p>");
    }
  } catch (err) {
    return HtmlService.createHtmlOutput("<p style='font-family:sans-serif;color:#cc0000;'>❌ Recovery Routing Execution Failed: " + err.message + "</p>");
  }
}



```

When you deploy your project as a Web App to get your base deployment execution string, update your Index grid compilation loop to generate active `=HYPERLINK()` formula statements like this: 

JavaScript

```
const webAppUrl = "https://script.google.com/macros/s/...PASTE_YOUR_DEPLOYED_WEB_APP_ID_HERE.../exec";
  
  // Inside your loop building the Index data cell row:
  const isArchiveRow = (targetSheetName === "Archive - Demo P" || targetSheetName.indexOf("Archive") === 0);
  const compositeLinkUrl = webAppUrl + "?restoreTarget=" + encodeURIComponent(targetSheetName) + 
                           "&action=" + (isArchiveRow ? "demo_p_archive" : "standard_rollback");
  
  const liveCellFormula = '=HYPERLINK("' + compositeLinkUrl + '", "🔄 Click to Restore")';
  indexOutputRow.push(liveCellFormula);

```

# **Dynamic Value Edit Highlighting Loop** 

Add this validation checking routine to track active input data variations on your configuration sheet layout. It intercepts edits made to structural text settings and applies a `#fff2cc` hex unsaved marker style immediately.

JavaScript

```
/**
 * Dynamic Configuration Value Edit Interceptor
 * Paints row configuration parameters on value modification updates.
 */
function handleFormatDashboardValueHighlighting_(e) {
  if (!e || !e.range) return;
  
  const range = e.range;
  const sheet = range.getSheet();
  
  // 1. BOUNDARY FILTER: Lock down process strictly to your Format Dashboard page
  if (sheet.getName() !== RFF_DASHBOARD_SHEET) return;
  
  const row = range.getRow();
  const col = range.getColumn();
  
  // 2. CONTEXT FILTERS: Bypass upper structural title rows and track active setting ranges (Cols A-D)
  if (row < DATA_START_ROW) return;
  if (col > 4) return;
  
  // Reset cell background profile to clean white grid state if data value was blanked out
  if (e.value === undefined || e.value === "") {
    range.setBackground("#ffffff");
    return;
  }
  
  // 3. APPLY HIGHLIGHT PAINT: Stamps custom unsaved warning hex configuration cell marker
  range.setBackground("#fff2cc");
}

```

To run this value-change highlight loop seamlessly alongside your existing routines, link it directly inside your master **`onEdit(e)`** script entry point like this:

JavaScript

```
function onEdit(e) {
  // Run value highlighting calculations on config edits
  handleFormatDashboardValueHighlighting_(e);
  
  // Maintain any other pre-existing onEdit handling loops safely below...
}

```

### **Script Clip: The Corrected `restoreSheetFromActiveIndexRow`**

Replace your current `restoreSheetFromActiveIndexRow` function with this clean, block-enclosed version to remove the dangling exits:

JavaScript

```
function restoreSheetFromActiveIndexRow() {
  var ui = SpreadsheetApp.getUi();
  var mainSs = SpreadsheetApp.getActiveSpreadsheet();
  var indexSheet = mainSs.getSheetByName("Index");
  var activeRange = mainSs.getActiveRange();
  
  // Enforce Index sheet isolation boundary
  if (!indexSheet || !activeRange || activeRange.getSheet().getSheetId() !== indexSheet.getSheetId()) {
    ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);
    return;
  }
  
  var row = activeRange.getRow();
  var col = activeRange.getColumn();
  
  // Hard stop if they are clicking headers or the local data side
  if (row < 5 || col < 6) {
    ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);
    return;
  }
  
  var targetSheetName = String(indexSheet.getRange(row, 7).getValue() || "").trim();
  if (!targetSheetName || targetSheetName.indexOf("Open Archive") === 0 || targetSheetName.indexOf("Archive Sheet") === 0) {
    ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);
    return;
  }
  
  if (mainSs.getSheetByName(targetSheetName)) {
    ui.alert("Conflict Detected", "The sheet '" + targetSheetName + "' already exists locally in this workbook. Please rename or delete the local copy first.", ui.ButtonSet.OK);
    return;
  }
  
  var confirmation = ui.alert(
    "Confirm Sheet Retrieval",
    "Are you sure you want to retrieve '" + targetSheetName + "' from cold storage and restore it as an active workspace tab?",
    ui.ButtonSet.YES_NO
  );
  if (confirmation !== ui.Button.YES) return;
  
  var archiveId = getArchiveSpreadsheetId_();
  var archiveSs;
  try {
    archiveSs = SpreadsheetApp.openById(archiveId);
  } catch (err) {
    ui.alert("Connection Failure", "Could not connect to the Archive workbook destination link.", ui.ButtonSet.OK);
    return;
  } // Cleaned loose exit break statement that sat here
  
  var archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);
  if (!archiveSourceSheet) {
    ui.alert("Not Found", "The sheet '" + targetSheetName + "' was not found inside the external archive spreadsheet database file.", ui.ButtonSet.OK);
    return;
  }
  
  try {
    mainSs.toast("Retrieving " + targetSheetName + " from archive drive...", "Data Transfer Running", 5);
    var restoredSheet = archiveSourceSheet.copyTo(mainSs);
    restoredSheet.setName(targetSheetName);
    
    if (typeof restoredSheet.showSheet === "function") {
      restoredSheet.showSheet();
    }
    if (typeof positionSheetInGlobalSortOrder_ === "function") {
      positionSheetInGlobalSortOrder_(restoredSheet);
    }
    
    createIndexSheet();
    mainSs.setActiveSheet(restoredSheet);
    ui.alert("Success", "The sheet '" + targetSheetName + "' has been successfully restored from cold storage.", ui.ButtonSet.OK);
  } catch (err) {
    ui.alert("Transfer Error", "Failed to fully restore the archived sheet: " + err.message, ui.ButtonSet.OK);
  }
}


```

### **Fix 1: Enclosed restoreSheetFromActiveIndexRow**

Replace your entire restoreSheetFromActiveIndexRow function with this version. The accidental dangling return; statements have been safely locked inside their conditional blocks, preventing the function from prematurely exiting on launch.

JavaScript

```
/**
 * Restores a historic sheet tab from the external Cold-Storage Archive
 * back into the active Master List workbook based on row selections.
 *
 * Assign this function to ONE permanent floating icon badge at the top of the Index sheet.
 */
function restoreSheetFromActiveIndexRow() {
  var ui = SpreadsheetApp.getUi();
  var mainSs = SpreadsheetApp.getActiveSpreadsheet();
  var indexSheet = mainSs.getSheetByName("Index");
  var activeRange = mainSs.getActiveRange();

  // Enforce Index sheet isolation boundary
  if (!indexSheet || !activeRange || activeRange.getSheet().getSheetId() !== indexSheet.getSheetId()) {
    ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);
    return;
  }

  var row = activeRange.getRow();
  var col = activeRange.getColumn();

  // Hard stop if they are clicking headers or the local data side
  if (row < 5 || col < 6) {
    ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);
    return;
  }

  // FORCE PATH RE-DIRECTION: Irrespective of whether they highlight the sheet name or the
  // [Restore] action column, look up Column 7 (G) to capture the true sheet identity string.
  var targetSheetName = String(indexSheet.getRange(row, 7).getValue() || "").trim();
  if (!targetSheetName || targetSheetName.indexOf("Open Archive") === 0 || targetSheetName.indexOf("Archive Sheet") === 0) {
    ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);
    return;
  }

  // Prevent breaking an active local tab profile
  if (mainSs.getSheetByName(targetSheetName)) {
    ui.alert("Conflict Detected", "The sheet '" + targetSheetName + "' already exists locally in this workbook. Please rename or delete the local copy first.", ui.ButtonSet.OK);
    return;
  }

  var confirmation = ui.alert(
    "Confirm Sheet Retrieval",
    "Are you sure you want to retrieve '" + targetSheetName + "' from cold storage and restore it as an active workspace tab?",
    ui.ButtonSet.YES_NO
  );
  if (confirmation !== ui.Button.YES) return;

  var archiveId = getArchiveSpreadsheetId_();
  var archiveSs;
  try {
    archiveSs = SpreadsheetApp.openById(archiveId);
  } catch (err) {
    ui.alert("Connection Failure", "Could not connect to the Archive workbook destination link.", ui.ButtonSet.OK);
    return;
  }

  var archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);
  if (!archiveSourceSheet) {
    ui.alert("Not Found", "The sheet '" + targetSheetName + "' was not found inside the external archive spreadsheet database file.", ui.ButtonSet.OK);
    return;
  }

  try {
    mainSs.toast("Retrieving '" + targetSheetName + "' from archive drive...", "Data Transfer Running", 5);
    var restoredSheet = archiveSourceSheet.copyTo(mainSs);
    restoredSheet.setName(targetSheetName);
    
    if (typeof restoredSheet.showSheet === "function") {
      restoredSheet.showSheet();
    }
    if (typeof positionSheetInGlobalSortOrder_ === "function") {
      positionSheetInGlobalSortOrder_(restoredSheet);
    }

    // Re-run the local index layout framework pass to clear out the line item
    createIndexSheet();
    mainSs.setActiveSheet(restoredSheet);
    ui.alert("Success", "The sheet '" + targetSheetName + "' has been successfully restored from cold storage.", ui.ButtonSet.OK);
  } catch (err) {
    ui.alert("Transfer Error", "Failed to fully restore the archived sheet: " + err.message, ui.ButtonSet.OK);
  }
}

```

###  

### **📊 Fix 2: Overwrite runDashboardQualityRawDataValidation\_ (Update 9 Logic)**

Replace your legacy, outdated Section J baseline logic entirely with this fully realized, data-looping engine. This properly performs the deep primary assignment verification and handles the cross-tab bannerMap validation sweeps.

JavaScript

```
function runDashboardQualityRawDataValidation_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const monthParts = getMonthDateParts_(new Date());
  const rawSheet = getCurrentRawDataSheet_(monthParts);
  const bannerSheet = getCurrentBannersSheet_(monthParts);
  const rows = [["Validation Item", "Status", "Issue", "Quality Notes"]];
  
  if (!rawSheet) {
    rows.push(["Raw Data Target", "FAIL", "Sheet Missing", "Active formatted Raw Data sheet not found for current month context."]);
    saveDashboardQualitySectionRows_("Raw Data Validation", rows);
    return rows; // Encapsulated correctly within the failure check block boundaries
  }
  
  const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
  const rawPmrIdx = getPMRIndex_(rawData.headerMap);
  const primaryIdx = rawData.headerMap["Primary PMR Row"];
  
  // 1. Validate Primary PMR Assignments
  if (primaryIdx === undefined || rawPmrIdx === -1) {
    rows.push(["Primary PMR Assignment", "FAIL", "Schema Missing", "Primary PMR Row column or PMR header is missing from Raw Data layout."]);
  } else {
    let primaryCount = 0;
    const seenPmr = new Set();
    let multiPrimaryCount = 0;
    
    rawData.values.forEach(function(row) {
      const pmr = normalizePMR_(row[rawPmrIdx]);
      if (!pmr) return;
      if (isPrimaryPMRRowValue_(row[primaryIdx])) {
        primaryCount++;
        if (seenPmr.has(pmr)) multiPrimaryCount++;
        seenPmr.add(pmr);
      }
    });
    
    if (multiPrimaryCount > 0) {
      rows.push(["Primary PMR Assignment", "FAIL", "Duplicate Primaries", "Detected " + multiPrimaryCount + " instances where a single PMR has multiple 'Yes' rows."]);
    } else if (primaryCount === 0 && rawData.values.length > 0) {
      rows.push(["Primary PMR Assignment", "WARNING", "No Primaries Flags", "Raw Data rows exist but zero records are flagged as Primary PMR Row = Yes."]);
    } else {
      rows.push(["Primary PMR Assignment", "PASS", "OK", "Primary row assignment logic is fully active; mapped " + seenPmr.size + " unique primary participant flags."]);
    }
  }
  
  // 2. Validate Banner Sync Integrity on Raw Data
  if (!bannerSheet) {
    rows.push(["Banner Sync Check", "WARNING", "Missing Monthly Banner Sheet", "Cannot cross-verify Banner columns because the formatted monthly Banners tab is missing."]);
  } else {
    const bannerHeaders = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
    let mappedCheckCount = 0;
    let syncDiscrepancyCount = 0;
    
    const bannerMap = buildSourceMapByCompositeKeyForDemoPBanner_(bannerSheet, HEADER_ROW, DATA_START_ROW, ["Participant PMR#", "Last Name", "First Name"]);
    
    if (bannerMap.size > 0 && rawPmrIdx !== -1) {
      const rawLastNameIdx = rawData.headerMap["Last Name"];
      const rawFirstNameIdx = rawData.headerMap["First Name"];
      
      rawData.values.forEach(function(row) {
        if (rawLastNameIdx === undefined || rawFirstNameIdx === undefined) return;
        if (primaryIdx !== undefined && !isPrimaryPMRRowValue_(row[primaryIdx])) return;
        
        const key = [
          normalizeKeyPart_(row[rawPmrIdx]),
          normalizeKeyPart_(row[rawLastNameIdx]),
          normalizeKeyPart_(row[rawFirstNameIdx])
        ].join("|||");
        
        const sourceMatch = bannerMap.get(key);
        if (!sourceMatch) return;
        mappedCheckCount++;
        
        bannerHeaders.forEach(function(field) {
          const rawIdx = rawData.headerMap[field];
          if (rawIdx === undefined) return;
          
          const rawCell = String(row[rawIdx] || "").trim().toUpperCase();
          const sourceCell = String(sourceMatch[field] || "").trim().toUpperCase();
          
          if (rawCell !== sourceCell) syncDiscrepancyCount++;
        });
      });
      
      if (syncDiscrepancyCount > 0) {
        rows.push(["Banner Sync Verification", "FAIL", "Sync Discrepancies", "Detected " + syncDiscrepancyCount + " cell mismatches between active Raw Data and the Banners import sheet."]);
      } else if (mappedCheckCount === 0) {
        rows.push(["Banner Sync Verification", "WARNING", "Zero Matching Profile Keys", "No participants could be cross-matched by PMR + Name keys between Banners and Raw Data."]);
      } else {
        rows.push(["Banner Sync Verification", "PASS", "OK", "Banner synchronization verified clean across " + mappedCheckCount + " active participant profiles."]);
      }
    }
  }
  
  saveDashboardQualitySectionRows_("Raw Data Validation", rows);
  return rows;
}




```

