# Exhaustive Trigger and Dynamic Reference Map - v1.8.9.2

Source analyzed: `origin/main:Master_List/Current Production Script/v1.8.9.2_Current_Production` (copied to `/tmp/ml.gs` for static analysis).

## 1. Menu Callbacks & UI Bindings

### `ui.createMenu().addItem()` bindings
| Menu | Label | Callback String | Status |
|---|---|---|---|
| 📁 Demo P | 🔄 Update Demo P | `updateDemoPMonthlySync` | OK |
| 📁 Demo P | 🛠️ Build Demo P | `buildDemoPFromScratch` | OK |
| 📊 Data & Processing Engine | 📚 Format Monthly Sheets | `formatMonthlySheets` | OK |
| 📊 Data & Processing Engine | 🏁 Create Monthly Start | `runMonthlyStart` | OK |
| 📊 Data & Processing Engine | 🔁 Create Monthly Update | `runMonthlyUpdate` | OK |
| 📊 Data & Processing Engine | ⛔ Create / Update Disenrolled List | `createDisenrolledList` | OK |
| 📊 Data & Processing Engine | 🗓️ Monthly Change Report | `buildMonthlyChangeReport` | OK |
| 📊 Data & Processing Engine | 💡 Create Master List | `createMasterList` | OK |
| 🗄️ Monthly Sub-Reports | 🗂️ Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | OK |
| 🗄️ Monthly Sub-Reports | 🗃️ Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | OK |
| 🗄️ Monthly Active Sheets | 🗂️ Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | OK |
| 🗄️ Monthly Active Sheets | 🗃️ Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | OK |
| 🙈 Templates | Hide Templates | `hideTemplates` | OK |
| 🙈 Templates | Show Templates | `showTemplates` | OK |
| 😎 System Sheets | Hide System Sheets | `hideSystemSheets_` | Legacy wrapper |
| 😎 System Sheets | Show System Sheets | `showSystemSheets_` | Legacy wrapper |
| ⚙️ Sheet & Layout Management | 🧭 Organize Tabs | `enforceGlobalSheetSortOrder` | OK |
| ⚙️ Sheet & Layout Management | 🪄 Clear Timing Log | `clearDiagnosticsAndTimingLogs` | OK |
| ⚙️ Sheet & Layout Management | ⏱️ Framework Timing on/off | `toggleFrameworkTiming` | OK |
| 🚀 Quick Start-up | 🏗️ System Set up | `quickSystemSetup` | OK |
| 🚀 Quick Start-up | 🖼️ Build Templates + Validate Templates | `quickBuildAllTemplates` | OK |
| 🚀 Quick Start-up | ✅ Dashboard Quality Workflow | `runDashboardQualityFull` | OK |
| 👌 Quality | Dashboard Quality Start up | `runDashboardQualityStartUp` | OK |
| 👌 Quality | Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | OK |
| 👌 Quality | Dashboard Quality Workflow | `runDashboardQualityFull` | OK |
| 👌 Quality | Framework Smoke Validation | `runFrameworkSmokeValidation` | OK |
| 📝 Format Sheets | Banner | `formatBannerReport` | OK |
| 📝 Format Sheets | CP Due Date | `formatCarePlanDueReport` | OK |
| 📝 Format Sheets | Unlocked CP | `formatUnlockedCarePlanReport` | OK |
| 📝 Format Sheets | Raw Data | `formatRawData` | OK |
| 🧩 Start - up | 📜 Set up System Sheets | `setupSystemSheets` | OK |
| 🧩 Start - up | 🎨 Format Dashboard | `rebuildFormatDashboardDefaults` | OK |
| 🧩 Start - up | 💾 Save Active Layout as Rebuild Default | `saveActiveLayoutToDashboardSettings` | OK |
| 🧩 Start - up | 🖼️ Create / Refresh All Templates | `createOrRefreshAllReportTemplates` | OK |
| 🧩 Start - up | 📇 Build Index | `createIndexSheet` | OK |
| 🧩 Start - up | ↩️ Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | OK |
| 🧩 Start - up | 🌐 Configure Index Restore Web App URL | `configureIndexRestoreWebAppUrl` | OK |
| 🧩 Start - up | 🔗 Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | OK |

### `ML_MENU_CALLBACKS` router object
| Router Group | Callback String | Status |
|---|---|---|
| `dataProcessing` | `formatMonthlySheets` | OK |
| `dataProcessing` | `runMonthlyStart` | OK |
| `dataProcessing` | `runMonthlyUpdate` | OK |
| `dataProcessing` | `updateDemoPMonthlySync` | OK |
| `dataProcessing` | `buildDemoPFromScratch` | OK |
| `dataProcessing` | `createDisenrolledList` | OK |
| `dataProcessing` | `buildMonthlyChangeReport` | OK |
| `dataProcessing` | `createMasterList` | OK |
| `sheetLayout` | `enforceGlobalSheetSortOrder` | OK |
| `sheetLayout` | `hideMonthlyImportSheets` | OK |
| `sheetLayout` | `archiveMonthlyImportSheets` | OK |
| `sheetLayout` | `hideMonthlyActiveSheets` | OK |
| `sheetLayout` | `archiveMonthlyActiveSheets` | OK |
| `sheetLayout` | `hideTemplates` | OK |
| `sheetLayout` | `showTemplates` | OK |
| `sheetLayout` | `hideSystemSheets_` | Legacy wrapper |
| `sheetLayout` | `showSystemSheets_` | Legacy wrapper |
| `sheetLayout` | `clearDiagnosticsAndTimingLogs` | OK |
| `sheetLayout` | `toggleFrameworkTiming` | OK |
| `quickStart` | `quickSystemSetup` | OK |
| `quickStart` | `quickBuildAllTemplates` | OK |
| `quickStart` | `runDashboardQualityFull` | OK |
| `quickStart` | `runFrameworkSmokeValidation` | OK |
| `maintenanceRebuild` | `runDashboardQualityStartUp` | OK |
| `maintenanceRebuild` | `runDashboardQualityValidateTemplates` | OK |
| `maintenanceRebuild` | `runDashboardQualityFull` | OK |
| `maintenanceRebuild` | `formatBannerReport` | OK |
| `maintenanceRebuild` | `formatCarePlanDueReport` | OK |
| `maintenanceRebuild` | `formatUnlockedCarePlanReport` | OK |
| `maintenanceRebuild` | `formatRawData` | OK |
| `startUp` | `setupSystemSheets` | OK |
| `startUp` | `rebuildFormatDashboardDefaults` | OK |
| `startUp` | `saveActiveLayoutToDashboardSettings` | OK |
| `startUp` | `createOrRefreshAllReportTemplates` | OK |
| `startUp` | `createIndexSheet` | OK |
| `startUp` | `restoreSheetFromActiveIndexRow` | OK |
| `startUp` | `configureIndexRestoreWebAppUrl` | OK |
| `startUp` | `configureArchiveSpreadsheetId` | OK |

## 2. Simple & Installable Triggers

| Trigger / Candidate | Type | Entry Function | Routing / Monitored Surface | Internal Execution |
|---|---|---|---|---|
| Open spreadsheet | Simple trigger | `onOpen` | Workbook open event | Builds the `Master List` custom menu and submenu callbacks listed above. |
| Edit spreadsheet | Simple trigger | `onEdit(e)` | Delegates all edits to `handleFormatDashboardValueHighlighting_(e)`. | Highlights edited dashboard cells only when the edited sheet is `Format Dashboard`; reads start/end rows, clamps monitored columns to 1-14, and sets blank cells white / nonblank cells yellow. |
| Web app HTTP GET | Simple web app entry point | `doGet(e)` | Requires URL parameter `restoreTarget`; optional `action`. | Routes archive restoration as documented in Section 3. |
| Installable trigger declarations | Static source scan | None found | No `ScriptApp.newTrigger`, `timeBased`, `everyDays`, `everyHours`, or clock-trigger builder usage was found. | No source-defined installable trigger entry point is present. |
| Time-driven trigger candidates | Static source scan | None confirmed | No top-level function name indicates a dedicated nightly/daily scheduled job. | Workflows such as `runMonthlyStart`, `runMonthlyUpdate`, and `runDashboardQualityFull` are menu/manual workflows unless an external Apps Script trigger is configured outside this source file. |

### `onEdit(e)` monitored ranges and columns
| Condition | Exact Monitored Value | Effect |
|---|---|---|
| Sheet name gate | `RFF_DASHBOARD_SHEET` = `Format Dashboard` | All other sheets return immediately. |
| Row gate | `startRow` through `endRow` from the edited range | No fixed row section filter; any edited dashboard row can be highlighted. |
| Column gate | `startCol = max(edited column, 1)` and `endCol = min(edited last column, 14)` | Only columns 1-14 are included in the highlight operation. |
| Cell value rule | Blank vs nonblank value in edited dashboard range | Blank cells receive `#ffffff`; nonblank cells receive `#fff2cc`. |

## 3. Web App & HTML Service Routing

| URL Parameter | Expected Value / Presence | Route | Internal Function Executed |
|---|---|---|---|
| `restoreTarget` | Required sheet name / routing token | Missing value returns an HTML error and stops. | None. |
| `action` | `demo_p_archive` | Archive workbook restore path. | `restoreSheetFromArchiveWorkbook(targetSheetName)` |
| `action` | Any other value or blank | Active workbook/index restore path. | `restoreSheetFromActiveIndexRow(targetSheetName)` |

## 4. Dynamic Execution & String-Based Routing

### Dynamic execution patterns
| Pattern | Findings |
|---|---|
| `google.script.run` | Not found |
| `eval(` | Found |
| `this[` | Not found |
| `globalThis[` | Not found |
| `window[` | Not found |

### String-based function references outside normal calls
| Line | Function String | Context |
|---:|---|---|
| 2800 | `formatMonthlySheets` | `ct.freeze({   dataProcessing: Object.freeze([     "formatMonthlySheets",     "runMonthlyStart",     "runMonthlyUpdate",     "updat` |
| 2801 | `runMonthlyStart` | `g: Object.freeze([     "formatMonthlySheets",     "runMonthlyStart",     "runMonthlyUpdate",     "updateDemoPMonthlySync",     "bu` |
| 2802 | `runMonthlyUpdate` | `"formatMonthlySheets",     "runMonthlyStart",     "runMonthlyUpdate",     "updateDemoPMonthlySync",     "buildDemoPFromScratch",  ` |
| 2803 | `updateDemoPMonthlySync` | `   "runMonthlyStart",     "runMonthlyUpdate",     "updateDemoPMonthlySync",     "buildDemoPFromScratch",     "createDisenrolledLis` |
| 2804 | `buildDemoPFromScratch` | `MonthlyUpdate",     "updateDemoPMonthlySync",     "buildDemoPFromScratch",     "createDisenrolledList",     "buildMonthlyChangeRep` |
| 2805 | `createDisenrolledList` | `moPMonthlySync",     "buildDemoPFromScratch",     "createDisenrolledList",     "buildMonthlyChangeReport",     "createMasterList" ` |
| 2806 | `buildMonthlyChangeReport` | `moPFromScratch",     "createDisenrolledList",     "buildMonthlyChangeReport",     "createMasterList"   ]),   sheetLayout: Object.f` |
| 2807 | `createMasterList` | `nrolledList",     "buildMonthlyChangeReport",     "createMasterList"   ]),   sheetLayout: Object.freeze([     "enforceGlobalSheetS` |
| 2810 | `enforceGlobalSheetSortOrder` | `terList"   ]),   sheetLayout: Object.freeze([     "enforceGlobalSheetSortOrder",     "hideMonthlyImportSheets",     "archiveMonthl` |
| 2811 | `hideMonthlyImportSheets` | `t.freeze([     "enforceGlobalSheetSortOrder",     "hideMonthlyImportSheets",     "archiveMonthlyImportSheets",     "hideMonthlyAct` |
| 2812 | `archiveMonthlyImportSheets` | `eetSortOrder",     "hideMonthlyImportSheets",     "archiveMonthlyImportSheets",     "hideMonthlyActiveSheets",     "archiveMonthly` |
| 2814 | `archiveMonthlyActiveSheets` | `ImportSheets",     "hideMonthlyActiveSheets",     "archiveMonthlyActiveSheets",     "hideTemplates",     "showTemplates",     "hid` |
| 2815 | `hideTemplates` | `iveSheets",     "archiveMonthlyActiveSheets",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSh` |
| 2816 | `showTemplates` | `iveMonthlyActiveSheets",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDia` |
| 2817 | `hideSystemSheets_` | `s",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs` |
| 2818 | `showSystemSheets_` | `    "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTi` |
| 2819 | `clearDiagnosticsAndTimingLogs` | `"hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTiming"   ]),   quickStart:` |
| 2820 | `toggleFrameworkTiming` | `heets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTiming"   ]),   quickStart: Object.freeze([     "quickSystemSetu` |
| 2823 | `quickSystemSetup` | `rkTiming"   ]),   quickStart: Object.freeze([     "quickSystemSetup",     "quickBuildAllTemplates",     "runDashboardQualityFull",` |
| 2824 | `quickBuildAllTemplates` | `tart: Object.freeze([     "quickSystemSetup",     "quickBuildAllTemplates",     "runDashboardQualityFull",     "runFrameworkSmokeV` |
| 2825 | `runDashboardQualityFull` | `ckSystemSetup",     "quickBuildAllTemplates",     "runDashboardQualityFull",     "runFrameworkSmokeValidation"   ]),   maintenance` |
| 2826 | `runFrameworkSmokeValidation` | `AllTemplates",     "runDashboardQualityFull",     "runFrameworkSmokeValidation"   ]),   maintenanceRebuild: Object.freeze([     "r` |
| 2829 | `runDashboardQualityStartUp` | `"   ]),   maintenanceRebuild: Object.freeze([     "runDashboardQualityStartUp",     "runDashboardQualityValidateTemplates",     "r` |
| 2830 | `runDashboardQualityValidateTemplates` | `ct.freeze([     "runDashboardQualityStartUp",     "runDashboardQualityValidateTemplates",     "runDashboardQualityFull",     "form` |
| 2831 | `runDashboardQualityFull` | `,     "runDashboardQualityValidateTemplates",     "runDashboardQualityFull",     "formatBannerReport",     "formatCarePlanDueRepor` |
| 2832 | `formatBannerReport` | `ateTemplates",     "runDashboardQualityFull",     "formatBannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlan` |
| 2833 | `formatCarePlanDueReport` | `hboardQualityFull",     "formatBannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport",     "formatRawDat` |
| 2834 | `formatUnlockedCarePlanReport` | `BannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport",     "formatRawData"   ]),   startUp: Object.free` |
| 2835 | `formatRawData` | `eReport",     "formatUnlockedCarePlanReport",     "formatRawData"   ]),   startUp: Object.freeze([     "setupSystemSheets",     "r` |
| 2838 | `setupSystemSheets` | `rmatRawData"   ]),   startUp: Object.freeze([     "setupSystemSheets",     "rebuildFormatDashboardDefaults",     "saveActiveLayout` |
| 2839 | `rebuildFormatDashboardDefaults` | `tUp: Object.freeze([     "setupSystemSheets",     "rebuildFormatDashboardDefaults",     "saveActiveLayoutToDashboardSettings",    ` |
| 2840 | `saveActiveLayoutToDashboardSettings` | `heets",     "rebuildFormatDashboardDefaults",     "saveActiveLayoutToDashboardSettings",     "createOrRefreshAllReportTemplates", ` |
| 2841 | `createOrRefreshAllReportTemplates` | `",     "saveActiveLayoutToDashboardSettings",     "createOrRefreshAllReportTemplates",     "createIndexSheet",     "restoreSheetFr` |
| 2842 | `createIndexSheet` | `gs",     "createOrRefreshAllReportTemplates",     "createIndexSheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRes` |
| 2843 | `restoreSheetFromActiveIndexRow` | `hAllReportTemplates",     "createIndexSheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRestoreWebAppUrl",     "con` |
| 2844 | `configureIndexRestoreWebAppUrl` | `Sheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRestoreWebAppUrl",     "configureArchiveSpreadsheetId"   ]) });  ` |
| 2845 | `configureArchiveSpreadsheetId` | `exRow",     "configureIndexRestoreWebAppUrl",     "configureArchiveSpreadsheetId"   ]) });  /**  * Dynamic Configuration Value Edi` |
| 2883 | `updateDemoPMonthlySync` | `eMenu("📁 Demo P")     .addItem("🔄 Update Demo P", "updateDemoPMonthlySync")     .addItem("🛠️ Build Demo P", "buildDemoPFromScratch` |
| 2884 | `buildDemoPFromScratch` | `emoPMonthlySync")     .addItem("🛠️ Build Demo P", "buildDemoPFromScratch");    const dataProcessingMenu = ui.createMenu("📊 Data & ` |
| 2887 | `formatMonthlySheets` | ` Engine")     .addItem("📚 Format Monthly Sheets", "formatMonthlySheets")     .addItem("🏁 Create Monthly Start", "runMonthlyStart")` |
| 2888 | `runMonthlyStart` | `lySheets")     .addItem("🏁 Create Monthly Start", "runMonthlyStart")     .addItem("🔁 Create Monthly Update", "runMonthlyUpdate")  ` |
| 2889 | `runMonthlyUpdate` | `lyStart")     .addItem("🔁 Create Monthly Update", "runMonthlyUpdate")     .addSubMenu(demoPMenu)     .addItem("⛔ Create / Update D` |
| 2891 | `createDisenrolledList` | `   .addItem("⛔ Create / Update Disenrolled List", "createDisenrolledList")     .addItem("🗓️ Monthly Change Report", "buildMonthlyC` |
| 2892 | `buildMonthlyChangeReport` | `edList")     .addItem("🗓️ Monthly Change Report", "buildMonthlyChangeReport")     .addItem("💡 Create Master List", "createMasterLi` |
| 2893 | `createMasterList` | `angeReport")     .addItem("💡 Create Master List", "createMasterList");      const monthlyImportSheetsMenu = ui.createMenu("🗄️ Mont` |
| 2897 | `hideMonthlyImportSheets` | `rts")     .addItem("🗂️ Hide Monthly Sub-Reports", "hideMonthlyImportSheets")     .addItem("🗃️ Archive Monthly Sub-Reports", "archi` |
| 2898 | `archiveMonthlyImportSheets` | `")     .addItem("🗃️ Archive Monthly Sub-Reports", "archiveMonthlyImportSheets");    const monthlyActiveSheetsMenu = ui.createMenu(` |
| 2902 | `archiveMonthlyActiveSheets` | `     .addItem("🗃️ Archive Monthly Active Sheets", "archiveMonthlyActiveSheets");    const templatesMenu = ui.createMenu("🙈 Templat` |
| 2905 | `hideTemplates` | `enu("🙈 Templates")     .addItem("Hide Templates", "hideTemplates")     .addItem("Show Templates", "showTemplates");    const syste` |
| 2906 | `showTemplates` | `, "hideTemplates")     .addItem("Show Templates", "showTemplates");    const systemSheetsMenu = ui.createMenu("😎 System Sheets")  ` |
| 2909 | `hideSystemSheets_` | `ystem Sheets")     .addItem("Hide System Sheets", "hideSystemSheets_")     .addItem("Show System Sheets", "showSystemSheets_");   ` |
| 2910 | `showSystemSheets_` | `ystemSheets_")     .addItem("Show System Sheets", "showSystemSheets_");    const sheetLayoutMenu = ui.createMenu("⚙️ Sheet & Layou` |
| 2913 | `enforceGlobalSheetSortOrder` | `yout Management")     .addItem("🧭 Organize Tabs", "enforceGlobalSheetSortOrder")     .addSubMenu(monthlyImportSheetsMenu)     .add` |
| 2918 | `clearDiagnosticsAndTimingLogs` | `temSheetsMenu)     .addItem("🪄 Clear Timing Log", "clearDiagnosticsAndTimingLogs")     .addItem("⏱️ Framework Timing on/off", "tog` |
| 2919 | `toggleFrameworkTiming` | `Logs")     .addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming");    const quickStartMenu = ui.createMenu("🚀 Quick Start` |
| 2922 | `quickSystemSetup` | `Quick Start-up")     .addItem("🏗️ System Set up", "quickSystemSetup")     .addItem("🖼️ Build Templates + Validate Templates", "qui` |
| 2923 | `quickBuildAllTemplates` | `ddItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")     .addItem("✅ Dashboard Quality Workflow", "runDashb` |
| 2924 | `runDashboardQualityFull` | `es")     .addItem("✅ Dashboard Quality Workflow", "runDashboardQualityFull");    const qualityMenu = ui.createMenu("👌 Quality")   ` |
| 2927 | `runDashboardQualityStartUp` | `lity")     .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")     .addItem("Dashboard Quality Validate Templates` |
| 2928 | `runDashboardQualityValidateTemplates` | ` .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")     .addItem("Dashboard Quality Workflow` |
| 2929 | `runDashboardQualityFull` | `ates")     .addItem("Dashboard Quality Workflow", "runDashboardQualityFull")     .addItem("Framework Smoke Validation", "runFramew` |
| 2930 | `runFrameworkSmokeValidation` | `Full")     .addItem("Framework Smoke Validation", "runFrameworkSmokeValidation");    const formatSheetsMenu = ui.createMenu("📝 For` |
| 2933 | `formatBannerReport` | `ateMenu("📝 Format Sheets")     .addItem("Banner", "formatBannerReport")     .addItem("CP Due Date", "formatCarePlanDueReport")    ` |
| 2934 | `formatCarePlanDueReport` | `"formatBannerReport")     .addItem("CP Due Date", "formatCarePlanDueReport")     .addItem("Unlocked CP", "formatUnlockedCarePlanRe` |
| 2935 | `formatUnlockedCarePlanReport` | `atCarePlanDueReport")     .addItem("Unlocked CP", "formatUnlockedCarePlanReport")     .addItem("Raw Data", "formatRawData");    co` |
| 2936 | `formatRawData` | `UnlockedCarePlanReport")     .addItem("Raw Data", "formatRawData");    const maintenanceMenu = ui.createMenu("🛠️ Maintenance/Rebui` |
| 2943 | `setupSystemSheets` | `art - up")     .addItem("📜 Set up System Sheets", "setupSystemSheets")     .addItem("🎨 Format Dashboard", "rebuildFormatDashboardD` |
| 2944 | `rebuildFormatDashboardDefaults` | `SystemSheets")     .addItem("🎨 Format Dashboard", "rebuildFormatDashboardDefaults")     .addItem("💾 Save Active Layout as Rebuild ` |
| 2945 | `saveActiveLayoutToDashboardSettings` | `ddItem("💾 Save Active Layout as Rebuild Default", "saveActiveLayoutToDashboardSettings")     .addItem("🖼️ Create / Refresh All Tem` |
| 2946 | `createOrRefreshAllReportTemplates` | `    .addItem("🖼️ Create / Refresh All Templates", "createOrRefreshAllReportTemplates")     .addItem("📇 Build Index", "createIndexS` |
| 2947 | `createIndexSheet` | `llReportTemplates")     .addItem("📇 Build Index", "createIndexSheet")     .addItem("↩️ Restore Selected Archive Row", "restoreShee` |
| 2948 | `restoreSheetFromActiveIndexRow` | `)     .addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")     .addItem("🌐 Configure Index Restore Web Ap` |
| 2949 | `configureIndexRestoreWebAppUrl` | `.addItem("🌐 Configure Index Restore Web App URL", "configureIndexRestoreWebAppUrl")     .addItem("🔗 Configure Archive Spreadsheet ` |
| 2950 | `configureArchiveSpreadsheetId` | `   .addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId");    ui.createMenu("Master List")     .addSubMen` |
| 6674 | `buildMonthlyChangeReport` | `ed",     ML_MENU_CALLBACKS.dataProcessing.indexOf("buildMonthlyChangeReport") !== -1 &&     typeof buildMonthlyChangeReport === "f` |
| 6676 | `buildMonthlyChangeReport` | `ction" &&     functionSourceContainsAll_(onOpen, ["buildMonthlyChangeReport"]),     "Monthly Change remains reachable from callbac` |
| 6861 | `deleteSheetIfExists_` | ` (!sheet) return;   deleteSheetSafely_(ss, sheet, "deleteSheetIfExists_", [protectedName1, protectedName2]); }  function buildStag` |
| 14225 | `syncMasterListFromUnlockedCarePlan_` | `ality Notes"]];   const requiredFunctions = [     "syncMasterListFromUnlockedCarePlan_",     "syncMasterListFromCarePlanDue_",    ` |
| 14226 | `syncMasterListFromCarePlanDue_` | ` [     "syncMasterListFromUnlockedCarePlan_",     "syncMasterListFromCarePlanDue_",     "formatCarePlanDueReport",     "formatUnlo` |
| 14227 | `formatCarePlanDueReport` | `Plan_",     "syncMasterListFromCarePlanDue_",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport"   ];    requiredFu` |
| 14228 | `formatUnlockedCarePlanReport` | `CarePlanDue_",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport"   ];    requiredFunctions.forEach(function(name) ` |
| 15604 | `toBool_` | `etRequiredHelperFunctionNames_() {   return [     "toBool_",     "truthy_",     "toNumber_",     "normalizeHeader_",     "normaliz` |
| 15605 | `truthy_` | `rFunctionNames_() {   return [     "toBool_",     "truthy_",     "toNumber_",     "normalizeHeader_",     "normalizeText_",     "n` |
| 15606 | `toNumber_` | `() {   return [     "toBool_",     "truthy_",     "toNumber_",     "normalizeHeader_",     "normalizeText_",     "normalizeKey_", ` |
| 15607 | `normalizeHeader_` | `   "toBool_",     "truthy_",     "toNumber_",     "normalizeHeader_",     "normalizeText_",     "normalizeKey_",     "toWrapStrate` |
| 15608 | `normalizeText_` | `y_",     "toNumber_",     "normalizeHeader_",     "normalizeText_",     "normalizeKey_",     "toWrapStrategy_",     "compareValues` |
| 15609 | `normalizeKey_` | `    "normalizeHeader_",     "normalizeText_",     "normalizeKey_",     "toWrapStrategy_",     "compareValues_",     "normalizeHex_` |
| 15610 | `toWrapStrategy_` | `",     "normalizeText_",     "normalizeKey_",     "toWrapStrategy_",     "compareValues_",     "normalizeHex_",     "safeSheetName` |
| 15611 | `compareValues_` | `,     "normalizeKey_",     "toWrapStrategy_",     "compareValues_",     "normalizeHex_",     "safeSheetName_"   ]; }   function ge` |
| 15612 | `normalizeHex_` | `     "toWrapStrategy_",     "compareValues_",     "normalizeHex_",     "safeSheetName_"   ]; }   function getRequiredMenuFunctionN` |
| 15613 | `safeSheetName_` | `",     "compareValues_",     "normalizeHex_",     "safeSheetName_"   ]; }   function getRequiredMenuFunctionNames_() {   return [ ` |
| 15620 | `setupReportFormattingDashboard` | ` getRequiredMenuFunctionNames_() {   return [     "setupReportFormattingDashboard",     "createOrRefreshAllReportTemplates",     "` |
| 15621 | `createOrRefreshAllReportTemplates` | `eturn [     "setupReportFormattingDashboard",     "createOrRefreshAllReportTemplates",     "runDashboardQualityQuick",     "runDas` |
| 15622 | `runDashboardQualityQuick` | `rd",     "createOrRefreshAllReportTemplates",     "runDashboardQualityQuick",     "runDashboardQualityStartUp",     "runDashboardQ` |
| 15623 | `runDashboardQualityStartUp` | `rtTemplates",     "runDashboardQualityQuick",     "runDashboardQualityStartUp",     "runDashboardQualityValidateTemplates",     "r` |
| 15624 | `runDashboardQualityValidateTemplates` | `lityQuick",     "runDashboardQualityStartUp",     "runDashboardQualityValidateTemplates",     "runDashboardQualityFull",     "runF` |
| 15625 | `runDashboardQualityFull` | `,     "runDashboardQualityValidateTemplates",     "runDashboardQualityFull",     "runFrameworkSmokeValidation",     "createIndexSh` |
| 15626 | `runFrameworkSmokeValidation` | `ateTemplates",     "runDashboardQualityFull",     "runFrameworkSmokeValidation",     "createIndexSheet",     "restoreSheetFromActi` |
| 15627 | `createIndexSheet` | `lityFull",     "runFrameworkSmokeValidation",     "createIndexSheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRes` |
| 15628 | `restoreSheetFromActiveIndexRow` | `workSmokeValidation",     "createIndexSheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRestoreWebAppUrl",     "for` |
| 15629 | `configureIndexRestoreWebAppUrl` | `Sheet",     "restoreSheetFromActiveIndexRow",     "configureIndexRestoreWebAppUrl",     "formatMonthlySheets",     "runMonthlyStar` |
| 15630 | `formatMonthlySheets` | `exRow",     "configureIndexRestoreWebAppUrl",     "formatMonthlySheets",     "runMonthlyStart",     "buildDemoPFromScratch",     "` |
| 15631 | `runMonthlyStart` | `RestoreWebAppUrl",     "formatMonthlySheets",     "runMonthlyStart",     "buildDemoPFromScratch",     "updateDemoPMonthlySync",   ` |
| 15632 | `buildDemoPFromScratch` | `"formatMonthlySheets",     "runMonthlyStart",     "buildDemoPFromScratch",     "updateDemoPMonthlySync",     "createDisenrolledLis` |
| 15633 | `updateDemoPMonthlySync` | `unMonthlyStart",     "buildDemoPFromScratch",     "updateDemoPMonthlySync",     "createDisenrolledList",     "createMasterList",  ` |
| 15634 | `createDisenrolledList` | `oPFromScratch",     "updateDemoPMonthlySync",     "createDisenrolledList",     "createMasterList",     "buildMonthlyChangeReport",` |
| 15635 | `createMasterList` | `moPMonthlySync",     "createDisenrolledList",     "createMasterList",     "buildMonthlyChangeReport",     "hideReportTemplates",  ` |
| 15636 | `buildMonthlyChangeReport` | `eateDisenrolledList",     "createMasterList",     "buildMonthlyChangeReport",     "hideReportTemplates",     "showReportTemplates"` |
| 15637 | `hideReportTemplates` | `eMasterList",     "buildMonthlyChangeReport",     "hideReportTemplates",     "showReportTemplates",     "hideSystemSheetsNow",    ` |
| 15638 | `showReportTemplates` | `thlyChangeReport",     "hideReportTemplates",     "showReportTemplates",     "hideSystemSheetsNow",     "showSystemSheetsNow",    ` |
| 15639 | `hideSystemSheetsNow` | `eReportTemplates",     "showReportTemplates",     "hideSystemSheetsNow",     "showSystemSheetsNow",     "formatBannerReport",     ` |
| 15640 | `showSystemSheetsNow` | `wReportTemplates",     "hideSystemSheetsNow",     "showSystemSheetsNow",     "formatBannerReport",     "formatCarePlanDueReport", ` |
| 15641 | `formatBannerReport` | `eSystemSheetsNow",     "showSystemSheetsNow",     "formatBannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlan` |
| 15642 | `formatCarePlanDueReport` | `owSystemSheetsNow",     "formatBannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport",     "formatRawDat` |
| 15643 | `formatUnlockedCarePlanReport` | `BannerReport",     "formatCarePlanDueReport",     "formatUnlockedCarePlanReport",     "formatRawData",     "validateActiveBannerFo` |
| 15644 | `formatRawData` | `eReport",     "formatUnlockedCarePlanReport",     "formatRawData",     "validateActiveBannerFormatterOutput",     "archiveActiveRa` |
| 15645 | `validateActiveBannerFormatterOutput` | `UnlockedCarePlanReport",     "formatRawData",     "validateActiveBannerFormatterOutput",     "archiveActiveRawDataSheet",     "arc` |
| 15646 | `archiveActiveRawDataSheet` | `",     "validateActiveBannerFormatterOutput",     "archiveActiveRawDataSheet",     "archiveMonthlyImportSheets",     "archiveMonth` |
| 15647 | `archiveMonthlyImportSheets` | `tterOutput",     "archiveActiveRawDataSheet",     "archiveMonthlyImportSheets",     "archiveMonthlyActiveSheets",     "enforceGlob` |
| 15648 | `archiveMonthlyActiveSheets` | `DataSheet",     "archiveMonthlyImportSheets",     "archiveMonthlyActiveSheets",     "enforceGlobalSheetSortOrder",     "hideTempla` |
| 15649 | `enforceGlobalSheetSortOrder` | `ortSheets",     "archiveMonthlyActiveSheets",     "enforceGlobalSheetSortOrder",     "hideTemplates",     "showTemplates",     "hi` |
| 15650 | `hideTemplates` | `veSheets",     "enforceGlobalSheetSortOrder",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSh` |
| 15651 | `showTemplates` | `ceGlobalSheetSortOrder",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDia` |
| 15652 | `hideSystemSheets_` | `r",     "hideTemplates",     "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs` |
| 15653 | `showSystemSheets_` | `    "showTemplates",     "hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTi` |
| 15654 | `clearDiagnosticsAndTimingLogs` | `"hideSystemSheets_",     "showSystemSheets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTiming",     "formatDashboa` |
| 15655 | `toggleFrameworkTiming` | `heets_",     "clearDiagnosticsAndTimingLogs",     "toggleFrameworkTiming",     "formatDashboard",     "rebuildFormatDashboardDefau` |
| 15656 | `formatDashboard` | `sAndTimingLogs",     "toggleFrameworkTiming",     "formatDashboard",     "rebuildFormatDashboardDefaults",     "saveActiveLayoutTo` |
| 15657 | `rebuildFormatDashboardDefaults` | `oggleFrameworkTiming",     "formatDashboard",     "rebuildFormatDashboardDefaults",     "saveActiveLayoutToDashboardSettings",    ` |
| 15658 | `saveActiveLayoutToDashboardSettings` | `board",     "rebuildFormatDashboardDefaults",     "saveActiveLayoutToDashboardSettings",     "setupSystemSheets"   ]; }  function ` |
| 15659 | `setupSystemSheets` | `",     "saveActiveLayoutToDashboardSettings",     "setupSystemSheets"   ]; }  function getRequiredDashboardFunctionNames_() {   re` |
| 15665 | `setupReportFormattingDashboard` | `equiredDashboardFunctionNames_() {   return [     "setupReportFormattingDashboard",     "loadDashboardConfig_",     "writeDashboar` |
| 15666 | `loadDashboardConfig_` | `eturn [     "setupReportFormattingDashboard",     "loadDashboardConfig_",     "writeDashboardTitle_",     "writeDashboardSection_"` |
| 15667 | `writeDashboardTitle_` | `attingDashboard",     "loadDashboardConfig_",     "writeDashboardTitle_",     "writeDashboardSection_",     "styleDashboard_"   ];` |
| 15668 | `writeDashboardSection_` | `ashboardConfig_",     "writeDashboardTitle_",     "writeDashboardSection_",     "styleDashboard_"   ]; }  function getRequiredTemp` |
| 15669 | `styleDashboard_` | `shboardTitle_",     "writeDashboardSection_",     "styleDashboard_"   ]; }  function getRequiredTemplateFunctionNames_() {   retur` |
| 15675 | `createOrRefreshTemplateFromDashboard_` | `RequiredTemplateFunctionNames_() {   return [     "createOrRefreshTemplateFromDashboard_",     "createOrRefreshAllReportTemplates"` |
| 15676 | `createOrRefreshAllReportTemplates` | `     "createOrRefreshTemplateFromDashboard_",     "createOrRefreshAllReportTemplates",     "hideReportTemplates",     "showReportT` |
| 15677 | `hideReportTemplates` | `d_",     "createOrRefreshAllReportTemplates",     "hideReportTemplates",     "showReportTemplates"   ]; }  function getRequiredVal` |
| 15678 | `showReportTemplates` | `lReportTemplates",     "hideReportTemplates",     "showReportTemplates"   ]; }  function getRequiredValidationFunctionNames_() {  ` |
| 15684 | `validateTemplateFromDashboard_` | `quiredValidationFunctionNames_() {   return [     "validateTemplateFromDashboard_",     "validateReportTemplates",     "writeTempl` |
| 15685 | `validateReportTemplates` | `eturn [     "validateTemplateFromDashboard_",     "validateReportTemplates",     "writeTemplateValidationReport_"   ]; }  function` |
| 15686 | `writeTemplateValidationReport_` | `omDashboard_",     "validateReportTemplates",     "writeTemplateValidationReport_"   ]; }  function getRequiredTimingFunctionNames` |
| 15692 | `runFrameworkTimed_` | `etRequiredTimingFunctionNames_() {   return [     "runFrameworkTimed_",     "markFrameworkStep_",     "writeFrameworkTimingReport_` |
| 15693 | `markFrameworkStep_` | `mes_() {   return [     "runFrameworkTimed_",     "markFrameworkStep_",     "writeFrameworkTimingReport_",     "writeTimingReport_` |
| 15694 | `writeFrameworkTimingReport_` | `unFrameworkTimed_",     "markFrameworkStep_",     "writeFrameworkTimingReport_",     "writeTimingReport_"   ]; }   function runWor` |
| 15695 | `writeTimingReport_` | `orkStep_",     "writeFrameworkTimingReport_",     "writeTimingReport_"   ]; }   function runWorkflowSyncVerification() {   return ` |

### Document property and dynamic state keys
| Line | Operation | Key / Expression |
|---:|---|---|
| 72 | `getProperty` | `"RFF_ARCHIVE_SPREADSHEET_ID"` |
| 91 | `setProperty` | `"RFF_ARCHIVE_SPREADSHEET_ID", newId` |
| 2964 | `getProperty` | `"RFF_FRAMEWORK_TIMING_ENABLED"` |
| 2974 | `setProperty` | `"RFF_FRAMEWORK_TIMING_ENABLED", nextValue` |
| 5527 | `getProperty` | `getTemplateFormatSignatureKey_(sheetDef` |
| 5556 | `setProperty` | `getTemplateFormatSignatureKey_(sheetDef` |
| 11515 | `getProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL"` |
| 11542 | `setProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL", value` |
| 11543 | `deleteProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL"` |
| 11699 | `setProperty` | `"RFF_INDEX_SHEET_SIGNATURE", ss.getSheets(` |
| 13451 | `getProperty` | `propKey` |
| 13452 | `setProperty` | `propKey, JSON.stringify(currentRows` |
| 14938 | `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey,
      JSON.stringify(rows || []` |
| 14942 | `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey + "_LAST_RUN",
      String(new Date(` |
| 14991 | `getProperty` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey` |
| 15115 | `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + "Signoff" + "_LAST_RUN", String(new Date(` |
| 15126 | `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + "Summary" + "_LAST_RUN", String(new Date(` |
| 15804 | `getProperty` | `ML_WORKFLOW_BUSY_KEY` |
| 15827 | `setProperty` | `ML_WORKFLOW_BUSY_KEY, processName || "Framework Workflow"` |
| 15828 | `setProperty` | `ML_WORKFLOW_BUSY_STARTED_KEY, String(new Date(` |
| 15833 | `deleteProperty` | `ML_WORKFLOW_BUSY_KEY` |
| 15834 | `deleteProperty` | `ML_WORKFLOW_BUSY_STARTED_KEY` |
| 15839 | `getProperty` | `ML_INDEX_REFRESH_DEFERRED_KEY` |
| 15840 | `deleteProperty` | `ML_INDEX_REFRESH_DEFERRED_KEY` |

## 5. Hardcoded Sheet Names Used for Routing

| Line | Routing Expression / Condition |
|---:|---|
| 6897 | `deleteSheetSafely_(ss, existingSheet, "Master List staged swap", [stagedSheet.getName()]);` |
| 7496 | `"Raw Data formatted in place as " + outputSheet.getName() + ".\n" +` |
| 9401 | `populateUniversalMetadataColumns_(workingData, monthParts, rawSheet.getName(), "Demo P", "Monthly Sync");` |
| 9624 | `populateUniversalMetadataColumns_(data, monthParts, sourceSheetName || sheet.getName(), "Demo P", status || "Updated");` |
| 9772 | `populateUniversalMetadataColumns_(workingData, monthParts, rawSheet.getName(), "Demo P", "Updated");` |
| 9839 | `populateUniversalMetadataColumns_(workingData, monthParts, rawSheet.getName(), "Demo P", "Created");` |
| 10199 | `markRuntimeStep_(timing, "Monthly Change detail - source sheets located | Current: " + currentDemo.getName() + "; Previous: " + previousDemo.getName());` |
| 11086 | `messages.push("Monthly Change Report: " + (reportSheet ? reportSheet.getName() : "No report created"));` |
| 14267 | `rows.push(["Demo P sheet present", demoSheet ? "PASS" : "FAIL", demoSheet ? "None" : "Missing Demo P", demoSheet ? demoSheet.getName() + " has " + countSheetRowsBelowHeader_(demoSheet) + " data rows." : "Build Demo P from Raw Data."]);` |
| 14282 | `rows.push(["Disenrolled Exclusion sheet present", sheet ? "PASS" : "WARNING", sheet ? "None" : "Sheet not found", sheet ? sheet.getName() + " is available for exclusion audit." : "Run Monthly Change/Disenrolled Exclusion workflow when applicable."]);` |
| 14295 | `rows.push(["Monthly Change report present", sheet ? "PASS" : "WARNING", sheet ? "None" : "Monthly Change report not found", sheet ? sheet.getName() + " has " + countSheetRowsBelowHeader_(sheet) + " detail rows." : "Build Monthly Change Report before final monthly sync validation."]);` |

## 6. Suspected Orphan/Dead Code (With Caveats)

Static caveat: these are top-level functions with zero same-file direct callers and no direct static menu/router/web trigger mapping. Apps Script functions may still be externally invoked, used by installable triggers not stored in source, called manually from the editor, or referenced by stale deployments. Treat every row as a **Candidate for Wave 5 Deletion Review**, not as approved deletion.

| Function | Line | Visibility Guess | Caller Count | Trigger/Menu/Web Mapping | Review Flag |
|---|---:|---|---:|---|---|
| `appendDisenrolledPMRBlocksToExclusion_` | 13109 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `applyDemoPDateFormattingByHeader_` | 10092 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `applyFinalMasterListColorAndDisplay_` | 12258 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `applyStandardFormattingAfterHeadersAndData_` | 6303 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `applyUniversalFastCanvasFormatting_` | 7710 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `archiveActiveRawDataSheet` | 6096 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `assignSortOrderAndHideExtraRows` | 12082 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `autoHidePreviousMonthSheetsAfterWorkflow_` | 6330 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildCombinedFrameworkTestDashboard` | 15072 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildDisenrolledPMRSetFromDemoPValues_` | 12793 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildMappedMasterRowFromDemoRow_` | 12455 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildMergeRowsByPMRFromData_` | 12685 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildRowsByPMR_` | 1811 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `buildSecondaryMergeKeyMapForRows_` | 12709 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `c_` | 370 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `compareSingleFieldAndAdd_` | 10599 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `compareValues_` | 1853 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `createOrRefreshDemoPTemplate_` | 10048 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `createOrRefreshMasterListTemplate_` | 11384 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `createRawDataOutputSheetFromTemplateFast_` | 7872 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `ensureDashboardQualityTemplateShell_` | 14732 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `findMonthlyChangeSectionTitleRow_` | 10970 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `findNextMonthlyChangeSectionTitleRow_` | 10986 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `formatDashboard` | 2995 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `formatDemoPStructure` | 9655 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `formatMonthlyChangeSubheaderRow` | 7281 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getDashboardQualityFixedSectionStartRow_` | 14741 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getDashboardSectionHeaderWidth_` | 13607 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getMergeAuditChangedFields_` | 12652 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getMergeAuditParticipantNameFromRows_` | 12631 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getMonthlyChangeSubsectionLabels` | 7297 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getPrimaryMergeRowItem_` | 12532 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getPrimaryRowChangedColumnDetails_` | 12551 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getRawDataDemoPSourceHeaders_` | 8368 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getScriptFunctionForDashboardSection_` | 13395 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getStoredDashboardQualityFailureNotes_` | 15049 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getStoredDashboardQualityOverallStatus_` | 15040 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `getTimingProcessNameForDashboardQualitySection_` | 14903 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `hideNonPrimaryPMRRows_` | 12203 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `isDateInStrictLocalRangeInclusive_` | 6571 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `isSameMonth_` | 1091 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `isUnformattedImportSheetNameForIndex_` | 11499 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `loadDisenrolledExclusionPMRsForPart3_` | 13138 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `mutateMasterRowColumnsFromDemoRow_` | 12465 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `processMasterListSingleDataPass_` | 12264 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `rebuildProductionMonthlyChangeTemplate` | 15901 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `refreshFrameworkTimingReport` | 2784 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `repairAllTemplateDateFormats` | 14351 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runAllFrameworkTestsAndBuildDashboard` | 14342 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityCarePlanSyncDiagnostics_` | 14222 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityDemoPValidation_` | 14264 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityDisenrolledExclusionValidation_` | 14279 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityMasterListHealthCheck_` | 6697 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityMonthlyChangeValidation_` | 14292 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityPerformanceSummary_` | 14078 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runDashboardQualityRawDataValidation_` | 14126 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runFrameworkHealthCheck` | 15537 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `runWorkflowSyncVerification` | 15700 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `setupReportFormattingDashboard` | 465 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `showAllMasterListRows` | 12116 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `sortMasterListByParticipantNameAndPMR_` | 12124 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `syncMasterListFromCarePlanDue_` | 8763 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `syncMasterListFromUnlockedCarePlan_` | 8727 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `toBool_` | 1857 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `toNumber_` | 1865 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `truthy_` | 1861 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `updateDashboardQualitySignoffSection_` | 15106 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `updateDashboardQualitySummarySection_` | 15118 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `updateDashboardQualityTimestampsOnly_` | 14327 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `validateActiveBannerFormatterOutput` | 6079 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `validateReportTemplates` | 4126 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `verifyFrameworkConfiguration` | 15720 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `verifyPrimaryPMRColumnFromRawData_` | 10039 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `writeDashboardSection_` | 398 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `writeDashboardTitle_` | 384 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `writeFrameworkTimingPerformanceRecommendations` | 2788 | Public/top-level | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `writeMasterListTitleDateBlock_` | 11478 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
| `writeTimingReport_` | 15897 | Private/helper | 0 | Not found in static trigger/menu/web map | Candidate for Wave 5 Deletion Review |
