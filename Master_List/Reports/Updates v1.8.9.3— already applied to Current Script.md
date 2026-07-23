# **Updates v1.8.9.3— already applied to Current Script**

1. ## **Menu Updated** 

Here is the updated `onOpen()` script that exactly matches your new menu outline.

MD

Replace your existing `onOpen()` function with this code:

JavaScript

```
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  // 1. Data & Processing Engine Menu
  const dataProcessingMenu = ui.createMenu("📊 Data & Processing Engine")
    .addItem("📚 Format Monthly Sheets", "formatMonthlySheets")
    .addItem("🔁 Create Monthly Update", "runMonthlyUpdate")
    .addItem("🏁 Create Monthly Start", "runMonthlyStart");

  // 2. Sheet & Layout Management Menu
  const monthlyImportSheetsMenu = ui.createMenu("🗄️ Monthly Sub-Reports")
    .addItem("🗂️ Hide Monthly Sub-Reports", "hideMonthlyImportSheets")
    .addItem("🗃️ Archive Monthly Sub-Reports", "archiveMonthlyImportSheets");

  const monthlyActiveSheetsMenu = ui.createMenu("🗄️ Monthly Active Sheets")
    .addItem("🗂️ Hide Monthly Active Sheets", "hideMonthlyActiveSheets")
    .addItem("🗃️ Archive Monthly Active Sheets", "archiveMonthlyActiveSheets");

  const templatesMenu = ui.createMenu("🙈 Templates")
    .addItem("Hide Templates", "hideTemplates")
    .addItem("Show Templates", "showTemplates");

  const systemSheetsMenu = ui.createMenu("😎 System Sheets")
    .addItem("Hide System Sheets", "hideSystemSheets_")
    .addItem("Show System Sheets", "showSystemSheets_");

  const sheetLayoutMenu = ui.createMenu("⚙️ Sheet & Layout Management")
    .addSubMenu(monthlyImportSheetsMenu)
    .addSubMenu(monthlyActiveSheetsMenu)
    .addSubMenu(templatesMenu)
    .addSubMenu(systemSheetsMenu);

  // 3. Quick Start-up Menu
  const quickStartMenu = ui.createMenu("🚀 Quick Start-up")
    .addItem("🏗️ System Set up", "quickSystemSetup")
    .addItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")
    .addItem("✅ Dashboard Quality Workflow", "runDashboardQualityFull");

  // 4. Maintenance/Rebuild Menu
  const qualityMenu = ui.createMenu("👌 Quality")
    .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")
    .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")
    .addItem("Dashboard Quality Workflow", "runDashboardQualityFull")
    .addItem("Framework Smoke Validation", "runFrameworkSmokeValidation");

  const formatSheetsMenu = ui.createMenu("📝 Format Sheets")
    .addItem("Banner", "formatBannerReport")
    .addItem("CP Due Date", "formatCarePlanDueReport")
    .addItem("Unlocked CP", "formatUnlockedCarePlanReport")
    .addItem("Raw Data", "formatRawData");

  const demoPMenu = ui.createMenu("📁 Demo P")
    .addItem("🔄 Update Demo P", "updateDemoPMonthlySync")
    .addItem("🛠️ Build Demo P", "buildDemoPFromScratch");

  const maintenanceDataProcessingMenu = ui.createMenu("📊 Data Processing")
    .addSubMenu(demoPMenu)
    .addItem("⛔ Create / Update Disenrolled List", "createDisenrolledList")
    .addItem("🗓️ Monthly Change Report", "buildMonthlyChangeReport")
    .addItem("💡 Create Master List", "createMasterList");

  const systemMenu = ui.createMenu("⚙️ System")
    .addItem("🪄 Clear Timing Log", "clearDiagnosticsAndTimingLogs")
    .addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming")
    .addItem("🧭 Organize Tabs", "enforceGlobalSheetSortOrder");

  const maintenanceMenu = ui.createMenu("🛠️ Maintenance/Rebuild")
    .addSubMenu(qualityMenu)
    .addSubMenu(formatSheetsMenu)
    .addSubMenu(maintenanceDataProcessingMenu)
    .addSubMenu(systemMenu);

  // 5. Start - up Menu
  const startUpMenu = ui.createMenu("🧩 Start - up")
    .addItem("📜 Set up System Sheets", "setupSystemSheets")
    .addItem("🎨 Format Dashboard", "rebuildFormatDashboardDefaults")
    .addItem("💾 Save Active Layout as Rebuild Default", "saveActiveLayoutToDashboardSettings")
    .addItem("🖼️ Create / Refresh All Templates", "createOrRefreshAllReportTemplates");

  // 6. Index Menu
  const indexMenu = ui.createMenu("📇Index")
    .addItem("📇 Build Index", "createIndexSheet")
    .addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")
    .addItem("🌐 Configure Index Restore Web App URL", "configureIndexRestoreWebAppUrl")
    .addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId");

  // Build Top-Level Master List Menu
  ui.createMenu("Master List")
    .addSubMenu(dataProcessingMenu)
    .addSubMenu(sheetLayoutMenu)
    .addSubMenu(quickStartMenu)
    .addSubMenu(maintenanceMenu)
    .addSubMenu(startUpMenu)
    .addSubMenu(indexMenu)
    .addToUi();
}
```

2. ## **Archive Sheet Updated**

You have just discovered a classic, microscopic time-math edge case\! This is exactly why we run these runtime validations.

### **The Root Cause**

Your tabs are named perfectly. The issue is a 12-hour disagreement between two different date parsers in the script:

1. When the script reads your tab name (`Banners 06.26`), it converts it to a date object set to **12:00 PM (Noon)**. (It does this to prevent daylight savings time from accidentally pushing the date backward into the previous month).  
2. However, the menu prompt where you type the target month creates a cutoff date set to **12:00 AM (Midnight)**.

Because **Noon** is 12 hours *after* **Midnight**, the script mathematically calculates that the sheet belongs to the "future" (relative to the exact millisecond of your cutoff date), and it skips archiving it\!

### **The Fix**

We just need to tell the archive function to compare the **Year and Month** directly, rather than comparing the exact raw milliseconds.

Find the `findArchiveMonthlyCandidateSheetsUpToDate_` function (around line 1180 in your script) and **replace the entire function** with this updated version:

JavaScript

```
function findArchiveMonthlyCandidateSheetsUpToDate_(ss, keywords, cutoffDate) {
  const keywordList = (keywords || []).map(function(keyword) {
    return String(keyword || "").trim().toLowerCase();
  }).filter(Boolean);
  const matches = [];
  const seen = new Set();
  
  // Convert the cutoff date to a stable YYYYMM integer (e.g., 202606)
  const cutoffKey = cutoffDate ? Number(Utilities.formatDate(cutoffDate, Session.getScriptTimeZone(), "yyyyMM")) : 0;

  ss.getSheets().forEach(function(sheet) {
    const name = sheet.getName();
    const lowerName = name.toLowerCase();
    if (lowerName.indexOf("template") !== -1) return;
    
    const hasKeyword = keywordList.some(function(keyword) { return lowerName.indexOf(keyword) !== -1; });
    if (!hasKeyword) return;
    if (seen.has(name)) return;

    // Extract date from tab name and convert to the same YYYYMM integer format
    const sheetDate = extractFirstDateFromSheetName_(name);
    if (sheetDate) {
      const sheetKey = Number(Utilities.formatDate(sheetDate, Session.getScriptTimeZone(), "yyyyMM"));
      
      // Compare the YYYYMM integers instead of exact milliseconds
      if (sheetKey <= cutoffKey) {
        seen.add(name);
        matches.push(sheet);
      }
    }
  });

  matches.sort(function(a, b) { return a.getName().localeCompare(b.getName()); });
  return matches;
}
```

