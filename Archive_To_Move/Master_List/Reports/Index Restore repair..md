**📇 1\. The Dynamic Index Sheet Compiler** 

function createIndexSheet() {

  const ss \= SpreadsheetApp.getActiveSpreadsheet();

  const dashboard \= loadDashboardConfig\_();

  const globals \= dashboard.globals || {};

  const theme \= getThemeColorsFromBase\_("\#668BCC", globals);

  const indexMonthParts \= getMonthDateParts\_(new Date());

  let sheet \= ss.getSheetByName(INDEX\_SHEET);

  if (\!sheet) {

    sheet \= ss.insertSheet(INDEX\_SHEET, 0);

  } else {

    try {

      sheet.getDataRange().clearContent().clearFormat().breakApart();

    } catch (err) {

      logBestEffortWarning\_("Index governed-range reset skipped: " \+ err.message);

    }

  }

  const localRows \= \[\];

  const seenLocal \= new Set(\[INDEX\_SHEET\]);

  function localSheetRow\_(sheetName) {

    const sh \= ss.getSheetByName(sheetName);

    if (\!sh || seenLocal.has(sheetName)) return null;

    seenLocal.add(sheetName);

    return \[

      "",

      sheetName,

      '=HYPERLINK("\#gid=' \+ sh.getSheetId() \+ '","Open Live Tab")',

      sh.isSheetHidden() ? "Hidden" : "Visible"

    \];

  }

  function addIndexSection\_(title, sheetNames) {

    localRows.push(\[title, "", "", ""\]);

    (sheetNames || \[\]).forEach(function(sheetName) {

      const row \= localSheetRow\_(sheetName);

      if (row) localRows.push(row);

    });

  }

  addIndexSection\_("Current Sheets", getIndexSheetNamesInSortOrder\_(ss, function(sheetName) {

    return sheetName \=== SHEET\_TYPE.DEMO\_P ||

      sheetName.indexOf(MASTER\_LIST\_PREFIX) \=== 0 ||

      sheetName.indexOf(MONTHLY\_CHANGE\_REPORT\_PREFIX) \=== 0 ||

      sheetName \=== DISENROLLED\_EXCLUSION\_SHEET;

  }));

  const rawImportedSheets \= getIndexSheetNamesInMonthSortOrder\_(ss, function(sheetName) {

    return sheetName.indexOf("Raw Data") \=== 0 ||

      sheetName.indexOf(BANNER\_PREFIX) \=== 0 ||

      sheetName.indexOf(BANNER\_REPORT\_ALT\_PREFIX) \=== 0 ||

      sheetName.indexOf(CARE\_PLAN\_DUE\_PREFIX) \=== 0 ||

      sheetName.indexOf(CARE\_PLAN\_DUE\_DATE\_ALT\_PREFIX) \=== 0 ||

      sheetName.indexOf(UNLOCKED\_PREFIX) \=== 0 ||

      sheetName.indexOf("Unlocked Care Plan") \=== 0;

  });

  const importGroups \= {};

  rawImportedSheets.forEach(function(name) {

    const sheetDate \= extractFirstDateFromSheetName\_(name);

    let groupKey \= sheetDate ? Utilities.formatDate(sheetDate, Session.getScriptTimeZone(), "MM.yy") : null;

    if (\!groupKey) {

      const tokens \= name.split(" ");

      const endToken \= tokens\[tokens.length \- 1\];

      if (/^\\d{1,2}\\.\\d{2}$/.test(endToken)) groupKey \= endToken;

    }

    if (\!groupKey) return;

    if (\!importGroups\[groupKey\]) importGroups\[groupKey\] \= \[\];

    importGroups\[groupKey\].push(name);

  });

  Object.keys(importGroups).sort(function(a, b) { return b.localeCompare(a); }).forEach(function(groupKey) {

    let sectionLabel \= "Imported Data \- " \+ groupKey;

    if (importGroups\[groupKey\].length \> 0\) {

      const sampleDate \= extractFirstDateFromSheetName\_(importGroups\[groupKey\]\[0\]);

      if (sampleDate) sectionLabel \= "Imported Data \- " \+ Utilities.formatDate(sampleDate, Session.getScriptTimeZone(), "MMMM yyyy");

    }

    importGroups\[groupKey\].sort(function(a, b) {

      return getGlobalSheetSortRankByName\_(a) \- getGlobalSheetSortRankByName\_(b);

    });

    addIndexSection\_(sectionLabel, importGroups\[groupKey\]);

  });

  addIndexSection\_("Unformatted Sheets", getIndexSheetNamesInMonthSortOrder\_(ss, function(sheetName) {

    return isUnformattedImportSheetNameForIndex\_(sheetName);

  }));

  addIndexSection\_("Archive / System Sheets", \[

    DEMO\_P\_ARCHIVE\_SHEET,

    "Framework Timing Report",

    "Dashboard Quality Report",

    RFF\_DASHBOARD\_SHEET

  \]);

  addIndexSection\_("Templates", \[

    "Template \- Banner Report",

    "Template \- Care Plan Due",

    "Template \- Unlocked Care Plan",

    "Template \- Raw Data",

    "Template \- Demo P",

    "Template \- Disenrolled Exclusion",

    "Template \- Master List",

    "Template \- Monthly Change",

    RFF\_BASE\_TEMPLATE\_NAME

  \]);

  const remainingLiveSheets \= ss.getSheets()

    .map(function(sh) { return sh.getName(); })

    .filter(function(sheetName) { return \!seenLocal.has(sheetName); })

    .sort(compareSheetNamesByGlobalOrder\_);

  addIndexSection\_("Other Live Sheets", remainingLiveSheets);

  const archiveRows \= \[\];

  const archiveId \= getArchiveSpreadsheetId\_();

  try {

    const archiveSs \= SpreadsheetApp.openById(archiveId);

    archiveSs.getSheets().forEach(function(ash) {

      const ashName \= ash.getName();

      const ashDate \= extractFirstDateFromSheetName\_(ashName);

      const archiveMonthDisplay \= ashDate ? Utilities.formatDate(ashDate, Session.getScriptTimeZone(), "MMMM yyyy") : "";

      

      // Dynamic Web App Link Compilation Hook (Direct Hyperlink Engine)

      const webAppUrl \= "https://script.google.com/macros/s/...PASTE\_YOUR\_DEPLOYED\_WEB\_APP\_ID\_HERE.../exec";

      const isArchiveRow \= ashName \=== "Archive \- Demo P" || ashName.indexOf("Archive") \=== 0;

      const compositeLinkUrl \= webAppUrl \+ "?restoreTarget=" \+ encodeURIComponent(ashName) \+

                               "\&action=" \+ (isArchiveRow ? "demo\_p\_archive" : "standard\_rollback");

      const liveCellFormula \= '=HYPERLINK("' \+ compositeLinkUrl \+ '", "🔄 Click to Restore")';

      archiveRows.push(\[

        archiveMonthDisplay,

        ashName,

        '=HYPERLINK("https://docs.google.com/spreadsheets/d/' \+ archiveId \+ '/edit\#gid=' \+ ash.getSheetId() \+ '","Open Archive Tab")',

        ash.isSheetHidden() ? "Archived (Hidden)" : "Visible in Cold Storage",

        liveCellFormula

      \]);

    });

    archiveRows.sort((a, b) \=\> a\[0\].localeCompare(b\[0\]));

  } catch (err) {

    archiveRows.push(\["", "Archive Spreadsheet Unreachable", "", "Verify permissions/ID", ""\]);

  }

  const totalRows \= Math.max(localRows.length, archiveRows.length);

  const finalIndexMatrix \= \[

    \["Active Operational Sheets Workspace", "", "", "", "", "External Drive Cold-Storage Archives", "", "", "", ""\],

    \["Generated", new Date(), "", "", "", "Archive File ID", archiveId, "", "", ""\],

    \["", "", "", "", "", "", "", "", "", ""\],

    \["Section / Month", "Sheet Tab Name", "Workspace Link", "Visibility", "", "Archive Month", "Archive Sheet Name", "Link to Sheet", "Status", "Restore Action"\]

  \];

  if (finalIndexMatrix.length \!== INDEX\_HEADER\_ROW\_COUNT || INDEX\_DATA\_START\_ROW \!== INDEX\_HEADER\_ROW\_COUNT \+ 1\) {

    throw new Error("Index Sheet header matrix must remain exactly 4 rows so records start on row 5.");

  }

  for (let i \= 0; i \< totalRows; i++) {

    const localPart \= localRows\[i\] || \["", "", "", ""\];

    const archivePart \= archiveRows\[i\] || \["", "", "", ""\];

    finalIndexMatrix.push(\[

      localPart\[0\], localPart\[1\], localPart\[2\], localPart\[3\],

      "",

      archivePart\[0\], archivePart\[1\], archivePart\[2\], archivePart\[3\], archivePart\[4\] || ""

    \]);

  }

  resizeSheetGrid\_(sheet, INDEX\_FIXED\_ROW\_COUNT, 10);

  sheet.getRange(1, 1, finalIndexMatrix.length, 10).setValues(finalIndexMatrix);

  sheet.getRange(1, 1, 1, 4).merge().setFontSize(12).setFontWeight("bold").setBackground(theme.level3).setFontColor("\#FFFFFF");

  sheet.getRange(1, 6, 1, 5).merge().setFontSize(12).setFontWeight("bold").setBackground("\#79b5d2").setFontColor("\#FFFFFF");

  sheet.getRange(4, 1, 1, 4).setFontWeight("bold").setBackground(theme.level2);

  sheet.getRange(4, 6, 1, 5).setFontWeight("bold").setBackground("\#9fcadf");

  sheet.getRange(2, 1, 1, 4).setBackground(theme.level4);

  sheet.getRange(2, 6, 1, 5).setBackground("\#f2f7f9");

  sheet.getRange(3, 1, 1, 10).setBackground("\#FFFFFF");

  const dataRowCount \= Math.max(finalIndexMatrix.length \- 4, 0);

  if (dataRowCount \> 0\) {

    const leftBackgrounds \= \[\];

    const rightBackgrounds \= \[\];

    for (let r \= 0; r \< dataRowCount; r++) {

      leftBackgrounds.push(new Array(4).fill(r % 2 \=== 0 ? theme.level4 : "\#FFFFFF"));

      rightBackgrounds.push(new Array(5).fill(r % 2 \=== 0 ? "\#f2f7f9" : "\#FFFFFF"));

    }

    sheet.getRange(5, 1, dataRowCount, 4).setBackgrounds(leftBackgrounds);

    sheet.getRange(5, 6, dataRowCount, 5).setBackgrounds(rightBackgrounds);

    const sectionRows \= \[\];

    for (let r \= 5; r \<= finalIndexMatrix.length; r++) {

      const label \= String(finalIndexMatrix\[r \- 1\]\[0\] || "");

      if (\["Current Sheets", "Unformatted Sheets", "Archive / System Sheets", "System Sheets", "Templates", "Other Live Sheets"\].indexOf(label) \!== \-1 || label.indexOf("Imported Data \- ") \=== 0\) {

        sectionRows.push(rowColToA1\_(r, 1\) \+ ":" \+ rowColToA1\_(r, 4));

      }

    }

    if (sectionRows.length) {

      sheet.getRangeList(sectionRows)

        .setFontWeight("bold")

        .setBackground(theme.level3);

    }

  }

  sheet.getRange(1, INDEX\_BUFFER\_COLUMN, finalIndexMatrix.length, 1).setBackground("\#EDEDED");

  sheet.setColumnWidth(INDEX\_BUFFER\_COLUMN, 30);

  \[1, 2, 3, 4, 6, 7, 8, 9, 10\].forEach(function(col) { sheet.setColumnWidth(col, 160); });

  sheet.setFrozenRows(INDEX\_HEADER\_ROW\_COUNT);

  applyGlobalDefaultRowHeightsToSheet\_(sheet, "Index Dashboard");

  PropertiesService.getDocumentProperties().setProperty("RFF\_INDEX\_SHEET\_SIGNATURE", ss.getSheets().map(function(sh) {

    return sh.getSheetId() \+ ":" \+ sh.getName();

  }).join("|"));

  return sheet;

}

**🔄 2\. The Background Web Receiver URL Router** 

function doGet(e) {

  e \= e || { parameter: {} };

  const targetSheetName \= e.parameter && e.parameter.restoreTarget;

  const actionType \= e.parameter && e.parameter.action;

  if (\!targetSheetName) {

    return HtmlService.createHtmlOutput("\<p style='font-family: sans-serif;color:\#cc0000;'\>⚠️ Error: Missing recovery sheet routing token parameter.\</p\>");

  }

  const lock \= LockService.getDocumentLock();

  try {

    if (lock.tryLock(15000)) {

      if (actionType \=== "demo\_p\_archive") {

        restoreSheetFromArchiveWorkbook(targetSheetName);

      } else {

        restoreSheetFromActiveIndexRow(targetSheetName);

      }

      return HtmlService.createHtmlOutput(

        "\<script\>window.top.close();\</script\>" \+

        "\<body style='font-family: sans-serif; text-align:center; padding-top: 35px; background-color:\#f8f9fa;'\>" \+

        "  \<h3 style='color:\#2b7a78;'\>🔄 Restoration Complete\!\</h3\>" \+

        "  \<p\>Processed pipeline synchronization parameters for target workspace: \<b\>" \+ targetSheetName \+ "\</b\>\</p\>" \+

        "  \<p style='color:\#777;font-size:11px;'\>This deployment window can be safely closed.\</p\>" \+

        "\</body\>"

      );

    }

    return HtmlService.createHtmlOutput("\<p\>⚠️ Server busy processing another task execution string. Click the hyperlink tab again.\</p\>");

  } catch (err) {

    return HtmlService.createHtmlOutput("\<p style='font-family:sans-serif;color:\#cc0000;'\>❌ Recovery Routing Execution Failed: " \+ err.message \+ "\</p\>");

  } finally {

    try {

      lock.releaseLock();

    } catch (releaseErr) {

      logBestEffortWarning\_("Archive web restore lock release skipped: " \+ releaseErr.message);

    }

  }

}

**🗃️ 3\. The Structural Recovery Macros** 

function restoreSheetFromActiveIndexRow(optionalTargetSheetName) {

  var ui \= SpreadsheetApp.getUi();

  var mainSs \= SpreadsheetApp.getActiveSpreadsheet();

  var indexSheet \= mainSs.getSheetByName(INDEX\_SHEET);

  var activeRange \= mainSs.getActiveRange();

  var targetSheetName \= String(optionalTargetSheetName || "").trim();

  if (\!targetSheetName) {

    if (\!indexSheet || \!activeRange || activeRange.getSheet().getSheetId() \!== indexSheet.getSheetId()) {

      ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);

      return;

    }

    var row \= activeRange.getRow();

    var col \= activeRange.getColumn();

    if (row \< INDEX\_DATA\_START\_ROW || col \< 6\) {

      ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);

      return;

    }

    targetSheetName \= String(indexSheet.getRange(row, 7).getValue() || "").trim();

  }

  if (\!targetSheetName || targetSheetName.indexOf("Open Archive") \=== 0 || targetSheetName.indexOf("Archive Sheet") \=== 0\) {

    ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);

    return;

  }

  if (mainSs.getSheetByName(targetSheetName)) {

    ui.alert("Conflict Detected", "The sheet '" \+ targetSheetName \+ "' already exists locally in this workbook. Please rename or delete the local copy first.", ui.ButtonSet.OK);

    return;

  }

  if (\!optionalTargetSheetName) {

    var confirmation \= ui.alert(

      "Confirm Sheet Retrieval",

      "Are you sure you want to retrieve '" \+ targetSheetName \+ "' from cold storage and restore it as an active workspace tab?",

      ui.ButtonSet.YES\_NO

    );

    if (confirmation \!== ui.Button.YES) return;

  }

  restoreSheetFromArchiveWorkbook(targetSheetName);

  if (\!optionalTargetSheetName) {

    ui.alert("Success", "The sheet '" \+ targetSheetName \+ "' has been successfully restored from cold storage.", ui.ButtonSet.OK);

  }

}

function restoreSheetFromArchiveWorkbook(targetSheetName) {

  var mainSs \= SpreadsheetApp.getActiveSpreadsheet();

  targetSheetName \= String(targetSheetName || "").trim();

  if (\!targetSheetName) throw new Error("Missing archive sheet name to restore.");

  if (mainSs.getSheetByName(targetSheetName)) {

    throw new Error("The sheet '" \+ targetSheetName \+ "' already exists locally in this workbook.");

  }

  var archiveId \= getArchiveSpreadsheetId\_();

  var archiveSs \= SpreadsheetApp.openById(archiveId);

  var archiveSourceSheet \= archiveSs.getSheetByName(targetSheetName);

  if (\!archiveSourceSheet) {

    throw new Error("The sheet '" \+ targetSheetName \+ "' was not found inside the external archive spreadsheet database file.");

  }

  mainSs.toast("Retrieving '" \+ targetSheetName \+ "' from archive drive...", "Data Transfer Running", 5);

  var restoredSheet \= archiveSourceSheet.copyTo(mainSs);

  restoredSheet.setName(targetSheetName);

  if (typeof restoredSheet.showSheet \=== "function") {

    restoredSheet.showSheet();

  }

  if (typeof positionSheetInGlobalSortOrder\_ \=== "function") {

    positionSheetInGlobalSortOrder\_(restoredSheet);

  }

  createIndexSheet();

  mainSs.setActiveSheet(restoredSheet);

  return restoredSheet;

}

