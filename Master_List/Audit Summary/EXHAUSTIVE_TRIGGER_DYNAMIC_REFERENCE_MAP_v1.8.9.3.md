# Exhaustive Trigger and Dynamic Reference Map - v1.8.9.3

Source analyzed: `origin/main:Master_List/Current Production Script/v1.8.9.3_Current_Production`.

## 1. Menu Callbacks & UI Bindings

| Source Line | Menu | Label / Router Group | Function String | Binding Type | Legacy Wrapper Flag |
|---:|---|---|---|---|---|
| 2883 | 📁 Demo P | 🔄 Update Demo P | `updateDemoPMonthlySync` | `ui.createMenu().addItem()` | No |
| 2884 | 📁 Demo P | 🛠️ Build Demo P | `buildDemoPFromScratch` | `ui.createMenu().addItem()` | No |
| 2887 | 📊 Data & Processing Engine | 📚 Format Monthly Sheets | `formatMonthlySheets` | `ui.createMenu().addItem()` | No |
| 2888 | 📊 Data & Processing Engine | 🏁 Create Monthly Start | `runMonthlyStart` | `ui.createMenu().addItem()` | No |
| 2889 | 📊 Data & Processing Engine | 🔁 Create Monthly Update | `runMonthlyUpdate` | `ui.createMenu().addItem()` | No |
| 2891 | 📊 Data & Processing Engine | ⛔ Create / Update Disenrolled List | `createDisenrolledList` | `ui.createMenu().addItem()` | No |
| 2892 | 📊 Data & Processing Engine | 🗓️ Monthly Change Report | `buildMonthlyChangeReport` | `ui.createMenu().addItem()` | No |
| 2893 | 📊 Data & Processing Engine | 💡 Create Master List | `createMasterList` | `ui.createMenu().addItem()` | No |
| 2897 | 🗄️ Monthly Sub-Reports | 🗂️ Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `ui.createMenu().addItem()` | No |
| 2898 | 🗄️ Monthly Sub-Reports | 🗃️ Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `ui.createMenu().addItem()` | No |
| 2901 | 🗄️ Monthly Active Sheets | 🗂️ Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `ui.createMenu().addItem()` | No |
| 2902 | 🗄️ Monthly Active Sheets | 🗃️ Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `ui.createMenu().addItem()` | No |
| 2905 | 🙈 Templates | Hide Templates | `hideTemplates` | `ui.createMenu().addItem()` | No |
| 2906 | 🙈 Templates | Show Templates | `showTemplates` | `ui.createMenu().addItem()` | No |
| 2909 | 😎 System Sheets | Hide System Sheets | `hideSystemSheets_` | `ui.createMenu().addItem()` | Legacy wrapper (trailing underscore) |
| 2910 | 😎 System Sheets | Show System Sheets | `showSystemSheets_` | `ui.createMenu().addItem()` | Legacy wrapper (trailing underscore) |
| 2913 | ⚙️ Sheet & Layout Management | 🧭 Organize Tabs | `enforceGlobalSheetSortOrder` | `ui.createMenu().addItem()` | No |
| 2918 | ⚙️ Sheet & Layout Management | 🪄 Clear Timing Log | `clearDiagnosticsAndTimingLogs` | `ui.createMenu().addItem()` | No |
| 2919 | ⚙️ Sheet & Layout Management | ⏱️ Framework Timing on/off | `toggleFrameworkTiming` | `ui.createMenu().addItem()` | No |
| 2922 | 🚀 Quick Start-up | 🏗️ System Set up | `quickSystemSetup` | `ui.createMenu().addItem()` | No |
| 2923 | 🚀 Quick Start-up | 🖼️ Build Templates + Validate Templates | `quickBuildAllTemplates` | `ui.createMenu().addItem()` | No |
| 2924 | 🚀 Quick Start-up | ✅ Dashboard Quality Workflow | `runDashboardQualityFull` | `ui.createMenu().addItem()` | No |
| 2927 | 👌 Quality | Dashboard Quality Start up | `runDashboardQualityStartUp` | `ui.createMenu().addItem()` | No |
| 2928 | 👌 Quality | Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | `ui.createMenu().addItem()` | No |
| 2929 | 👌 Quality | Dashboard Quality Workflow | `runDashboardQualityFull` | `ui.createMenu().addItem()` | No |
| 2930 | 👌 Quality | Framework Smoke Validation | `runFrameworkSmokeValidation` | `ui.createMenu().addItem()` | No |
| 2933 | 📝 Format Sheets | Banner | `formatBannerReport` | `ui.createMenu().addItem()` | No |
| 2934 | 📝 Format Sheets | CP Due Date | `formatCarePlanDueReport` | `ui.createMenu().addItem()` | No |
| 2935 | 📝 Format Sheets | Unlocked CP | `formatUnlockedCarePlanReport` | `ui.createMenu().addItem()` | No |
| 2936 | 📝 Format Sheets | Raw Data | `formatRawData` | `ui.createMenu().addItem()` | No |
| 2943 | 🧩 Start - up | 📜 Set up System Sheets | `setupSystemSheets` | `ui.createMenu().addItem()` | No |
| 2944 | 🧩 Start - up | 🎨 Format Dashboard | `rebuildFormatDashboardDefaults` | `ui.createMenu().addItem()` | No |
| 2945 | 🧩 Start - up | 💾 Save Active Layout as Rebuild Default | `saveActiveLayoutToDashboardSettings` | `ui.createMenu().addItem()` | No |
| 2946 | 🧩 Start - up | 🖼️ Create / Refresh All Templates | `createOrRefreshAllReportTemplates` | `ui.createMenu().addItem()` | No |
| 2947 | 🧩 Start - up | 📇 Build Index | `createIndexSheet` | `ui.createMenu().addItem()` | No |
| 2948 | 🧩 Start - up | ↩️ Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | `ui.createMenu().addItem()` | No |
| 2949 | 🧩 Start - up | 🌐 Configure Index Restore Web App URL | `configureIndexRestoreWebAppUrl` | `ui.createMenu().addItem()` | No |
| 2950 | 🧩 Start - up | 🔗 Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | `ui.createMenu().addItem()` | No |
| 2800 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `formatMonthlySheets` | Custom router object string | No |
| 2801 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `runMonthlyStart` | Custom router object string | No |
| 2802 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `runMonthlyUpdate` | Custom router object string | No |
| 2803 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `updateDemoPMonthlySync` | Custom router object string | No |
| 2804 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `buildDemoPFromScratch` | Custom router object string | No |
| 2805 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `createDisenrolledList` | Custom router object string | No |
| 2806 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `buildMonthlyChangeReport` | Custom router object string | No |
| 2807 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.dataProcessing` | `createMasterList` | Custom router object string | No |
| 2810 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `enforceGlobalSheetSortOrder` | Custom router object string | No |
| 2811 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `hideMonthlyImportSheets` | Custom router object string | No |
| 2812 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `archiveMonthlyImportSheets` | Custom router object string | No |
| 2814 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `archiveMonthlyActiveSheets` | Custom router object string | No |
| 2815 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `hideTemplates` | Custom router object string | No |
| 2816 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `showTemplates` | Custom router object string | No |
| 2817 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `hideSystemSheets_` | Custom router object string | Legacy wrapper (trailing underscore) |
| 2818 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `showSystemSheets_` | Custom router object string | Legacy wrapper (trailing underscore) |
| 2819 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `clearDiagnosticsAndTimingLogs` | Custom router object string | No |
| 2820 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.sheetLayout` | `toggleFrameworkTiming` | Custom router object string | No |
| 2823 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.quickStart` | `quickSystemSetup` | Custom router object string | No |
| 2824 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.quickStart` | `quickBuildAllTemplates` | Custom router object string | No |
| 2825 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.quickStart` | `runDashboardQualityFull` | Custom router object string | No |
| 2826 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.quickStart` | `runFrameworkSmokeValidation` | Custom router object string | No |
| 2829 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `runDashboardQualityStartUp` | Custom router object string | No |
| 2830 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `runDashboardQualityValidateTemplates` | Custom router object string | No |
| 2831 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `runDashboardQualityFull` | Custom router object string | No |
| 2832 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `formatBannerReport` | Custom router object string | No |
| 2833 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `formatCarePlanDueReport` | Custom router object string | No |
| 2834 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `formatUnlockedCarePlanReport` | Custom router object string | No |
| 2835 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.maintenanceRebuild` | `formatRawData` | Custom router object string | No |
| 2838 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `setupSystemSheets` | Custom router object string | No |
| 2839 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `rebuildFormatDashboardDefaults` | Custom router object string | No |
| 2840 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `saveActiveLayoutToDashboardSettings` | Custom router object string | No |
| 2841 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `createOrRefreshAllReportTemplates` | Custom router object string | No |
| 2842 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `createIndexSheet` | Custom router object string | No |
| 2843 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `restoreSheetFromActiveIndexRow` | Custom router object string | No |
| 2844 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `configureIndexRestoreWebAppUrl` | Custom router object string | No |
| 2845 | `ML_MENU_CALLBACKS` | `ML_MENU_CALLBACKS.startUp` | `configureArchiveSpreadsheetId` | Custom router object string | No |

## 2. Simple & Installable Triggers

| Source Line | Trigger / Candidate | Trigger Type | Monitored Sheet / Range / Columns | Routed Internal Function(s) | Notes |
|---:|---|---|---|---|---|
| 2879 | `onOpen()` | Simple open trigger | Spreadsheet open event | Menu callbacks in Section 1 | Creates the `Master List` custom menu. |
| 2875 | `onEdit(e)` | Simple edit trigger | Sheet gate: `RFF_DASHBOARD_SHEET` / `Format Dashboard`; rows: edited range `startRow..endRow`; columns: `max(edited column, 1)..min(edited last column, 14)` | `handleFormatDashboardValueHighlighting_(e)` | All non-dashboard edits return immediately; blank cells are painted `#ffffff`, nonblank cells `#fff2cc`. |
| 11771 | `doGet(e)` | Web app GET entry point | URL parameters mapped in Section 3 | `restoreSheetFromArchiveWorkbook(targetSheetName)` or `restoreSheetFromActiveIndexRow(targetSheetName)` | Protected by document lock. |
| N/A | Installable trigger declarations | Static scan result | N/A | N/A | No `ScriptApp.newTrigger()`, `timeBased()`, `everyDays()`, `everyHours()`, `atHour()`, or `nearMinute()` usage found in the source. |
| N/A | Time-driven function candidates | Static naming scan result | N/A | N/A | No dedicated nightly/daily/scheduled top-level function names found. Monthly workflows appear to be manual/menu entry points unless configured externally. |

## 3. Web App & HTML Service Routing

| Source Line | URL Parameter | Expected Value | Branch Condition | Internal Function Executed | Output / Failure Mode |
|---:|---|---|---|---|---|
| 11771 | `restoreTarget` | Required target sheet name/token | Missing/blank target | None | Returns HTML error: missing recovery sheet routing token. |
| 11771 | `action` | `demo_p_archive` | `actionType === "demo_p_archive"` | `restoreSheetFromArchiveWorkbook(targetSheetName)` | Returns restoration-complete HTML on success. |
| 11771 | `action` | Blank or any non-`demo_p_archive` value | `else` branch | `restoreSheetFromActiveIndexRow(targetSheetName)` | Returns restoration-complete HTML on success. |
| 11771 | Document lock | N/A | `lock.tryLock(15000)` fails | None | Returns server-busy HTML. |

## 4. Dynamic Execution & String-Based Routing

| Source Line(s) | Dynamic Pattern / Registry | Function / Key String | Routing Meaning |
|---|---|---|---|
| Not found | `google.script.run` | N/A | Not found in source. |
| 15563 | `eval()` | N/A | Found; inspect listed line(s). |
| Not found | `this[functionName]()` | N/A | Not found in source. |
| Not found | `globalThis[functionName]()` | N/A | Not found in source. |
| Not found | `window[functionName]()` | N/A | Not found in source. |
| Not found | `bracket call on functionName` | N/A | Not found in source. |
| 2800 | Function-name string | `formatMonthlySheets` | Router/registry/string reference |
| 2801 | Function-name string | `runMonthlyStart` | Router/registry/string reference |
| 2802 | Function-name string | `runMonthlyUpdate` | Router/registry/string reference |
| 2803 | Function-name string | `updateDemoPMonthlySync` | Router/registry/string reference |
| 2804 | Function-name string | `buildDemoPFromScratch` | Router/registry/string reference |
| 2805 | Function-name string | `createDisenrolledList` | Router/registry/string reference |
| 2806 | Function-name string | `buildMonthlyChangeReport` | Router/registry/string reference |
| 2807 | Function-name string | `createMasterList` | Router/registry/string reference |
| 2810 | Function-name string | `enforceGlobalSheetSortOrder` | Router/registry/string reference |
| 2811 | Function-name string | `hideMonthlyImportSheets` | Router/registry/string reference |
| 2812 | Function-name string | `archiveMonthlyImportSheets` | Router/registry/string reference |
| 2814 | Function-name string | `archiveMonthlyActiveSheets` | Router/registry/string reference |
| 2815 | Function-name string | `hideTemplates` | Router/registry/string reference |
| 2816 | Function-name string | `showTemplates` | Router/registry/string reference |
| 2817 | Function-name string | `hideSystemSheets_` | Router/registry/string reference |
| 2818 | Function-name string | `showSystemSheets_` | Router/registry/string reference |
| 2819 | Function-name string | `clearDiagnosticsAndTimingLogs` | Router/registry/string reference |
| 2820 | Function-name string | `toggleFrameworkTiming` | Router/registry/string reference |
| 2823 | Function-name string | `quickSystemSetup` | Router/registry/string reference |
| 2824 | Function-name string | `quickBuildAllTemplates` | Router/registry/string reference |
| 2825 | Function-name string | `runDashboardQualityFull` | Router/registry/string reference |
| 2826 | Function-name string | `runFrameworkSmokeValidation` | Router/registry/string reference |
| 2829 | Function-name string | `runDashboardQualityStartUp` | Router/registry/string reference |
| 2830 | Function-name string | `runDashboardQualityValidateTemplates` | Router/registry/string reference |
| 2831 | Function-name string | `runDashboardQualityFull` | Router/registry/string reference |
| 2832 | Function-name string | `formatBannerReport` | Router/registry/string reference |
| 2833 | Function-name string | `formatCarePlanDueReport` | Router/registry/string reference |
| 2834 | Function-name string | `formatUnlockedCarePlanReport` | Router/registry/string reference |
| 2835 | Function-name string | `formatRawData` | Router/registry/string reference |
| 2838 | Function-name string | `setupSystemSheets` | Router/registry/string reference |
| 2839 | Function-name string | `rebuildFormatDashboardDefaults` | Router/registry/string reference |
| 2840 | Function-name string | `saveActiveLayoutToDashboardSettings` | Router/registry/string reference |
| 2841 | Function-name string | `createOrRefreshAllReportTemplates` | Router/registry/string reference |
| 2842 | Function-name string | `createIndexSheet` | Router/registry/string reference |
| 2843 | Function-name string | `restoreSheetFromActiveIndexRow` | Router/registry/string reference |
| 2844 | Function-name string | `configureIndexRestoreWebAppUrl` | Router/registry/string reference |
| 2845 | Function-name string | `configureArchiveSpreadsheetId` | Router/registry/string reference |
| 2883 | Function-name string | `updateDemoPMonthlySync` | Menu callback |
| 2884 | Function-name string | `buildDemoPFromScratch` | Menu callback |
| 2887 | Function-name string | `formatMonthlySheets` | Menu callback |
| 2888 | Function-name string | `runMonthlyStart` | Menu callback |
| 2889 | Function-name string | `runMonthlyUpdate` | Menu callback |
| 2891 | Function-name string | `createDisenrolledList` | Menu callback |
| 2892 | Function-name string | `buildMonthlyChangeReport` | Menu callback |
| 2893 | Function-name string | `createMasterList` | Menu callback |
| 2897 | Function-name string | `hideMonthlyImportSheets` | Menu callback |
| 2898 | Function-name string | `archiveMonthlyImportSheets` | Menu callback |
| 2902 | Function-name string | `archiveMonthlyActiveSheets` | Menu callback |
| 2905 | Function-name string | `hideTemplates` | Menu callback |
| 2906 | Function-name string | `showTemplates` | Menu callback |
| 2909 | Function-name string | `hideSystemSheets_` | Menu callback |
| 2910 | Function-name string | `showSystemSheets_` | Menu callback |
| 2913 | Function-name string | `enforceGlobalSheetSortOrder` | Menu callback |
| 2918 | Function-name string | `clearDiagnosticsAndTimingLogs` | Menu callback |
| 2919 | Function-name string | `toggleFrameworkTiming` | Menu callback |
| 2922 | Function-name string | `quickSystemSetup` | Menu callback |
| 2923 | Function-name string | `quickBuildAllTemplates` | Menu callback |
| 2924 | Function-name string | `runDashboardQualityFull` | Menu callback |
| 2927 | Function-name string | `runDashboardQualityStartUp` | Menu callback |
| 2928 | Function-name string | `runDashboardQualityValidateTemplates` | Menu callback |
| 2929 | Function-name string | `runDashboardQualityFull` | Menu callback |
| 2930 | Function-name string | `runFrameworkSmokeValidation` | Menu callback |
| 2933 | Function-name string | `formatBannerReport` | Menu callback |
| 2934 | Function-name string | `formatCarePlanDueReport` | Menu callback |
| 2935 | Function-name string | `formatUnlockedCarePlanReport` | Menu callback |
| 2936 | Function-name string | `formatRawData` | Menu callback |
| 2943 | Function-name string | `setupSystemSheets` | Menu callback |
| 2944 | Function-name string | `rebuildFormatDashboardDefaults` | Menu callback |
| 2945 | Function-name string | `saveActiveLayoutToDashboardSettings` | Menu callback |
| 2946 | Function-name string | `createOrRefreshAllReportTemplates` | Menu callback |
| 2947 | Function-name string | `createIndexSheet` | Menu callback |
| 2948 | Function-name string | `restoreSheetFromActiveIndexRow` | Menu callback |
| 2949 | Function-name string | `configureIndexRestoreWebAppUrl` | Menu callback |
| 2950 | Function-name string | `configureArchiveSpreadsheetId` | Menu callback |
| 6674 | Function-name string | `buildMonthlyChangeReport` | Router/registry/string reference |
| 6676 | Function-name string | `buildMonthlyChangeReport` | Router/registry/string reference |
| 6861 | Function-name string | `deleteSheetIfExists_` | Router/registry/string reference |
| 14197 | Function-name string | `syncMasterListFromUnlockedCarePlan_` | Router/registry/string reference |
| 14198 | Function-name string | `syncMasterListFromCarePlanDue_` | Router/registry/string reference |
| 14199 | Function-name string | `formatCarePlanDueReport` | Router/registry/string reference |
| 14200 | Function-name string | `formatUnlockedCarePlanReport` | Router/registry/string reference |
| 15576 | Function-name string | `toBool_` | Router/registry/string reference |
| 15577 | Function-name string | `truthy_` | Router/registry/string reference |
| 15578 | Function-name string | `toNumber_` | Router/registry/string reference |
| 15579 | Function-name string | `normalizeHeader_` | Router/registry/string reference |
| 15580 | Function-name string | `normalizeText_` | Router/registry/string reference |
| 15581 | Function-name string | `normalizeKey_` | Router/registry/string reference |
| 15582 | Function-name string | `toWrapStrategy_` | Router/registry/string reference |
| 15583 | Function-name string | `compareValues_` | Router/registry/string reference |
| 15584 | Function-name string | `normalizeHex_` | Router/registry/string reference |
| 15585 | Function-name string | `safeSheetName_` | Router/registry/string reference |
| 15592 | Function-name string | `setupReportFormattingDashboard` | Router/registry/string reference |
| 15593 | Function-name string | `createOrRefreshAllReportTemplates` | Router/registry/string reference |
| 15594 | Function-name string | `runDashboardQualityQuick` | Router/registry/string reference |
| 15595 | Function-name string | `runDashboardQualityStartUp` | Router/registry/string reference |
| 15596 | Function-name string | `runDashboardQualityValidateTemplates` | Router/registry/string reference |
| 15597 | Function-name string | `runDashboardQualityFull` | Router/registry/string reference |
| 15598 | Function-name string | `runFrameworkSmokeValidation` | Router/registry/string reference |
| 15599 | Function-name string | `createIndexSheet` | Router/registry/string reference |
| 15600 | Function-name string | `restoreSheetFromActiveIndexRow` | Router/registry/string reference |
| 15601 | Function-name string | `configureIndexRestoreWebAppUrl` | Router/registry/string reference |
| 15602 | Function-name string | `formatMonthlySheets` | Router/registry/string reference |
| 15603 | Function-name string | `runMonthlyStart` | Router/registry/string reference |
| 15604 | Function-name string | `buildDemoPFromScratch` | Router/registry/string reference |
| 15605 | Function-name string | `updateDemoPMonthlySync` | Router/registry/string reference |
| 15606 | Function-name string | `createDisenrolledList` | Router/registry/string reference |
| 15607 | Function-name string | `createMasterList` | Router/registry/string reference |
| 15608 | Function-name string | `buildMonthlyChangeReport` | Router/registry/string reference |
| 15609 | Function-name string | `hideReportTemplates` | Router/registry/string reference |
| 15610 | Function-name string | `showReportTemplates` | Router/registry/string reference |
| 15611 | Function-name string | `hideSystemSheetsNow` | Router/registry/string reference |
| 15612 | Function-name string | `showSystemSheetsNow` | Router/registry/string reference |
| 15613 | Function-name string | `formatBannerReport` | Router/registry/string reference |
| 15614 | Function-name string | `formatCarePlanDueReport` | Router/registry/string reference |
| 15615 | Function-name string | `formatUnlockedCarePlanReport` | Router/registry/string reference |
| 15616 | Function-name string | `formatRawData` | Router/registry/string reference |
| 15617 | Function-name string | `validateActiveBannerFormatterOutput` | Router/registry/string reference |
| 15618 | Function-name string | `archiveActiveRawDataSheet` | Router/registry/string reference |
| 15619 | Function-name string | `archiveMonthlyImportSheets` | Router/registry/string reference |
| 15620 | Function-name string | `archiveMonthlyActiveSheets` | Router/registry/string reference |
| 15621 | Function-name string | `enforceGlobalSheetSortOrder` | Router/registry/string reference |
| 15622 | Function-name string | `hideTemplates` | Router/registry/string reference |
| 15623 | Function-name string | `showTemplates` | Router/registry/string reference |
| 15624 | Function-name string | `hideSystemSheets_` | Router/registry/string reference |
| 15625 | Function-name string | `showSystemSheets_` | Router/registry/string reference |
| 15626 | Function-name string | `clearDiagnosticsAndTimingLogs` | Router/registry/string reference |
| 15627 | Function-name string | `toggleFrameworkTiming` | Router/registry/string reference |
| 15628 | Function-name string | `formatDashboard` | Router/registry/string reference |
| 15629 | Function-name string | `rebuildFormatDashboardDefaults` | Router/registry/string reference |
| 15630 | Function-name string | `saveActiveLayoutToDashboardSettings` | Router/registry/string reference |
| 15631 | Function-name string | `setupSystemSheets` | Router/registry/string reference |
| 15637 | Function-name string | `setupReportFormattingDashboard` | Router/registry/string reference |
| 15638 | Function-name string | `loadDashboardConfig_` | Router/registry/string reference |
| 15639 | Function-name string | `writeDashboardTitle_` | Router/registry/string reference |
| 15640 | Function-name string | `writeDashboardSection_` | Router/registry/string reference |
| 15641 | Function-name string | `styleDashboard_` | Router/registry/string reference |
| 15647 | Function-name string | `createOrRefreshTemplateFromDashboard_` | Router/registry/string reference |
| 15648 | Function-name string | `createOrRefreshAllReportTemplates` | Router/registry/string reference |
| 15649 | Function-name string | `hideReportTemplates` | Router/registry/string reference |
| 15650 | Function-name string | `showReportTemplates` | Router/registry/string reference |
| 15656 | Function-name string | `validateTemplateFromDashboard_` | Router/registry/string reference |
| 15657 | Function-name string | `validateReportTemplates` | Router/registry/string reference |
| 15658 | Function-name string | `writeTemplateValidationReport_` | Router/registry/string reference |
| 15664 | Function-name string | `runFrameworkTimed_` | Router/registry/string reference |
| 15665 | Function-name string | `markFrameworkStep_` | Router/registry/string reference |
| 15666 | Function-name string | `writeFrameworkTimingReport_` | Router/registry/string reference |
| 15667 | Function-name string | `writeTimingReport_` | Router/registry/string reference |
| 71 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 72 | PropertiesService `getProperty` | `"RFF_ARCHIVE_SPREADSHEET_ID");` | Document property / dynamic state key. |
| 91 | PropertiesService `setProperty` | `"RFF_ARCHIVE_SPREADSHEET_ID", newId);` | Document property / dynamic state key. |
| 99 | PropertiesService `dynamic key expression` | `const ML_WORKFLOW_BUSY_KEY = "ML_WORKFLOW_BUSY";` | Document property / dynamic state key. |
| 101 | PropertiesService `dynamic key expression` | `const ML_WORKFLOW_BUSY_STARTED_KEY = "ML_WORKFLOW_BUSY_STARTED";` | Document property / dynamic state key. |
| 103 | PropertiesService `dynamic key expression` | `const ML_INDEX_REFRESH_DEFERRED_KEY = "ML_INDEX_REFRESH_DEFERRED";` | Document property / dynamic state key. |
| 2964 | PropertiesService `getProperty` | `"RFF_FRAMEWORK_TIMING_ENABLED") !== "false";` | Document property / dynamic state key. |
| 2974 | PropertiesService `setProperty` | `"RFF_FRAMEWORK_TIMING_ENABLED", nextValue);` | Document property / dynamic state key. |
| 5519 | PropertiesService `dynamic key expression` | `function getTemplateFormatSignatureKey_(sheetDef) {` | Document property / dynamic state key. |
| 5527 | PropertiesService `getProperty` | `getTemplateFormatSignatureKey_(sheetDef)) \|\| "";` | Document property / dynamic state key. |
| 5556 | PropertiesService `setProperty` | `getTemplateFormatSignatureKey_(sheetDef), signature \|\| "");` | Document property / dynamic state key. |
| 11487 | PropertiesService `getProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL") \|\| "").trim();` | Document property / dynamic state key. |
| 11505 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 11514 | PropertiesService `setProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL", value);` | Document property / dynamic state key. |
| 11515 | PropertiesService `deleteProperty` | `"ML_INDEX_RESTORE_WEB_APP_URL");` | Document property / dynamic state key. |
| 11671 | PropertiesService `setProperty` | `"RFF_INDEX_SHEET_SIGNATURE", ss.getSheets().map(function(sh) {` | Document property / dynamic state key. |
| 13398 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 13422 | PropertiesService `dynamic key expression` | `const propKey = RFF_QA_SECTION_PROP_PREFIX + "TRACKER_DATA_" + computeStableHash_(sectionTitle);` | Document property / dynamic state key. |
| 13423 | PropertiesService `getProperty` | `propKey);` | Document property / dynamic state key. |
| 13424 | PropertiesService `setProperty` | `propKey, JSON.stringify(currentRows));` | Document property / dynamic state key. |
| 14897 | PropertiesService `dynamic key expression` | `const RFF_QA_SECTION_PROP_PREFIX = "MLF_QA_SECTION_";` | Document property / dynamic state key. |
| 14909 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 14910 | PropertiesService `setProperty` | `` | Document property / dynamic state key. |
| 14911 | PropertiesService `dynamic key expression` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey,` | Document property / dynamic state key. |
| 14914 | PropertiesService `setProperty` | `` | Document property / dynamic state key. |
| 14915 | PropertiesService `dynamic key expression` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey + "_LAST_RUN",` | Document property / dynamic state key. |
| 14963 | PropertiesService `getProperty` | `RFF_QA_SECTION_PROP_PREFIX + sectionKey);` | Document property / dynamic state key. |
| 15087 | PropertiesService `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + "Signoff" + "_LAST_RUN", String(new Date().getTime()));` | Document property / dynamic state key. |
| 15098 | PropertiesService `setProperty` | `RFF_QA_SECTION_PROP_PREFIX + "Summary" + "_LAST_RUN", String(new Date().getTime()));` | Document property / dynamic state key. |
| 15776 | PropertiesService `getProperty` | `ML_WORKFLOW_BUSY_KEY) \|\| "Another process";` | Document property / dynamic state key. |
| 15798 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 15799 | PropertiesService `setProperty` | `ML_WORKFLOW_BUSY_KEY, processName \|\| "Framework Workflow");` | Document property / dynamic state key. |
| 15800 | PropertiesService `setProperty` | `ML_WORKFLOW_BUSY_STARTED_KEY, String(new Date().getTime()));` | Document property / dynamic state key. |
| 15804 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 15805 | PropertiesService `deleteProperty` | `ML_WORKFLOW_BUSY_KEY);` | Document property / dynamic state key. |
| 15806 | PropertiesService `deleteProperty` | `ML_WORKFLOW_BUSY_STARTED_KEY);` | Document property / dynamic state key. |
| 15810 | PropertiesService `getDocumentProperties` | `const props = PropertiesService.getDocumentProperties();` | Document property / dynamic state key. |
| 15811 | PropertiesService `getProperty` | `ML_INDEX_REFRESH_DEFERRED_KEY) !== "true") return false;` | Document property / dynamic state key. |
| 15812 | PropertiesService `deleteProperty` | `ML_INDEX_REFRESH_DEFERRED_KEY);` | Document property / dynamic state key. |

## 5. Hardcoded Sheet Names Used for Routing

| Source Line | Hardcoded Sheet / Prefix Reference | Routing Condition | Control-Flow Impact |
|---:|---|---|---|
| 642 | `RFF_DASHBOARD_SHEET` | `if (!sheet) sheet = insertGovernedOutputSheet_(ss, RFF_DASHBOARD_SHEET);` | Branches or returns based on sheet name/type/prefix. |
| 804 | `BANNER_PREFIX, BANNER_REPORT_ALT_PREFIX` | `if (name.indexOf(BANNER_PREFIX) !== 0 && name.indexOf(BANNER_REPORT_ALT_PREFIX) !== 0) {` | Branches or returns based on sheet name/type/prefix. |
| 2481 | `master list` | `if (text.indexOf("master list") !== -1) return 60;` | Branches or returns based on sheet name/type/prefix. |
| 2482 | `demo p` | `if (text.indexOf("demo p") !== -1) return 60;` | Branches or returns based on sheet name/type/prefix. |
| 2857 | `RFF_DASHBOARD_SHEET` | `if (sheet.getName() !== RFF_DASHBOARD_SHEET) return;` | Branches or returns based on sheet name/type/prefix. |
| 3008 | `RFF_DASHBOARD_SHEET` | `if (activeName === RFF_DASHBOARD_SHEET) {` | Branches or returns based on sheet name/type/prefix. |
| 3013 | `RFF_VALIDATION_SHEET` | `if (isSystemOrTestingSheet_(activeSheet) \|\| activeName === RFF_VALIDATION_SHEET) {` | Branches or returns based on sheet name/type/prefix. |
| 6336 | `INDEX_SHEET` | `if (currentFirst && sheetDate && sheetDate.getTime() < currentFirst.getTime() && sheet.getName() !== INDEX_SHEET) {` | Branches or returns based on sheet name/type/prefix. |
| 6594 | `Index, index` | `if (name === "index") return "Index";` | Branches or returns based on sheet name/type/prefix. |
| 6595 | `SHEET_TYPE, master list` | `if (name.indexOf("master list") !== -1) return SHEET_TYPE.MASTER_LIST;` | Branches or returns based on sheet name/type/prefix. |
| 6596 | `SHEET_TYPE, monthly change` | `if (name.indexOf("monthly change") !== -1) return SHEET_TYPE.MONTHLY_CHANGE;` | Branches or returns based on sheet name/type/prefix. |
| 6597 | `SHEET_TYPE, demo p` | `if (name.indexOf("demo p") !== -1) return SHEET_TYPE.DEMO_P;` | Branches or returns based on sheet name/type/prefix. |
| 6598 | `SHEET_TYPE, cp due, care plan due` | `if (name.indexOf("cp due") !== -1 \|\| name.indexOf("care plan due") !== -1) return SHEET_TYPE.CARE_PLAN_DUE;` | Branches or returns based on sheet name/type/prefix. |
| 6599 | `SHEET_TYPE, unlock` | `if (name.indexOf("unlock") !== -1) return SHEET_TYPE.UNLOCKED;` | Branches or returns based on sheet name/type/prefix. |
| 6600 | `SHEET_TYPE, banner` | `if (name.indexOf("banner") !== -1) return SHEET_TYPE.BANNER;` | Branches or returns based on sheet name/type/prefix. |
| 6601 | `SHEET_TYPE, disenrolled` | `if (name.indexOf("disenrolled") !== -1) return SHEET_TYPE.DISENROLLED_EXCLUSION;` | Branches or returns based on sheet name/type/prefix. |
| 6602 | `SHEET_TYPE, raw data` | `if (name.indexOf("raw data") !== -1) return SHEET_TYPE.RAW_DATA;` | Branches or returns based on sheet name/type/prefix. |
| 8231 | `SHEET_TYPE, RFF_SHEET_TYPES` | `if (sheetType === SHEET_TYPE.CARE_PLAN_DUE \|\| sheetType === RFF_SHEET_TYPES.CARE_PLAN_DUE) {` | Branches or returns based on sheet name/type/prefix. |
| 8236 | `SHEET_TYPE, RFF_SHEET_TYPES` | `if (sheetType === SHEET_TYPE.UNLOCKED \|\| sheetType === RFF_SHEET_TYPES.UNLOCKED) {` | Branches or returns based on sheet name/type/prefix. |
| 8241 | `SHEET_TYPE, RFF_SHEET_TYPES` | `if (sheetType === SHEET_TYPE.DEMO_P \|\| sheetType === RFF_SHEET_TYPES.DEMO_P) {` | Branches or returns based on sheet name/type/prefix. |
| 8246 | `SHEET_TYPE, RFF_SHEET_TYPES` | `if (sheetType === SHEET_TYPE.DISENROLLED_EXCLUSION \|\| sheetType === RFF_SHEET_TYPES.DISENROLLED_EXCLUSION) {` | Branches or returns based on sheet name/type/prefix. |
| 8999 | `Template - Raw Data` | `if (sheetName === "Template - Raw Data") return false;` | Branches or returns based on sheet name/type/prefix. |
| 9655 | `demo p` | `if (activeName === targetName \|\| activeLower.indexOf("demo p") === 0) {` | Branches or returns based on sheet name/type/prefix. |
| 9673 | `raw data` | `if (activeName === rawName \|\| activeLower.indexOf("raw data") === 0) {` | Branches or returns based on sheet name/type/prefix. |
| 14210 | `MASTER_LIST_PREFIX` | `if (!masterList \|\| String(masterList.getName()).indexOf(MASTER_LIST_PREFIX) !== 0) {` | Branches or returns based on sheet name/type/prefix. |
| 14882 | `RFF_VALIDATION_SHEET` | `if (sectionKey === RFF_VALIDATION_SHEET) return "Validate Templates";` | Branches or returns based on sheet name/type/prefix. |
| 14975 | `RFF_TEST_DASHBOARD_SHEET` | `if (!sheetName \|\| sheetName === RFF_TEST_DASHBOARD_SHEET) return;` | Branches or returns based on sheet name/type/prefix. |

## 6. Suspected Orphan/Dead Code (With Caveats)

| Source Line | Top-Level Function | Visibility Guess | Direct Same-File Caller Count | Trigger/Menu/Web Mapping | Required Caveat / Review Flag |
|---:|---|---|---:|---|---|
| 13081 | `appendDisenrolledPMRBlocksToExclusion_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10068 | `applyDemoPDateFormattingByHeader_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12230 | `applyFinalMasterListColorAndDisplay_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6303 | `applyStandardFormattingAfterHeadersAndData_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 7698 | `applyUniversalFastCanvasFormatting_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6096 | `archiveActiveRawDataSheet` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12054 | `assignSortOrderAndHideExtraRows` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6330 | `autoHidePreviousMonthSheetsAfterWorkflow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15044 | `buildCombinedFrameworkTestDashboard` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12765 | `buildDisenrolledPMRSetFromDemoPValues_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12427 | `buildMappedMasterRowFromDemoRow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12657 | `buildMergeRowsByPMRFromData_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1811 | `buildRowsByPMR_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12681 | `buildSecondaryMergeKeyMapForRows_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 370 | `c_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10568 | `compareSingleFieldAndAdd_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1853 | `compareValues_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10024 | `createOrRefreshDemoPTemplate_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 11356 | `createOrRefreshMasterListTemplate_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 7860 | `createRawDataOutputSheetFromTemplateFast_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14704 | `ensureDashboardQualityTemplateShell_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10939 | `findMonthlyChangeSectionTitleRow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10955 | `findNextMonthlyChangeSectionTitleRow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 2995 | `formatDashboard` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 9631 | `formatDemoPStructure` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 7281 | `formatMonthlyChangeSubheaderRow` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14713 | `getDashboardQualityFixedSectionStartRow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 13579 | `getDashboardSectionHeaderWidth_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12624 | `getMergeAuditChangedFields_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12603 | `getMergeAuditParticipantNameFromRows_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 7297 | `getMonthlyChangeSubsectionLabels` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12504 | `getPrimaryMergeRowItem_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12523 | `getPrimaryRowChangedColumnDetails_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 8356 | `getRawDataDemoPSourceHeaders_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 13367 | `getScriptFunctionForDashboardSection_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15021 | `getStoredDashboardQualityFailureNotes_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15012 | `getStoredDashboardQualityOverallStatus_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14875 | `getTimingProcessNameForDashboardQualitySection_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12175 | `hideNonPrimaryPMRRows_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6571 | `isDateInStrictLocalRangeInclusive_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1091 | `isSameMonth_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 11471 | `isUnformattedImportSheetNameForIndex_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 13110 | `loadDisenrolledExclusionPMRsForPart3_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12437 | `mutateMasterRowColumnsFromDemoRow_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12236 | `processMasterListSingleDataPass_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15873 | `rebuildProductionMonthlyChangeTemplate` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 2784 | `refreshFrameworkTimingReport` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14323 | `repairAllTemplateDateFormats` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14314 | `runAllFrameworkTestsAndBuildDashboard` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14194 | `runDashboardQualityCarePlanSyncDiagnostics_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14236 | `runDashboardQualityDemoPValidation_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14251 | `runDashboardQualityDisenrolledExclusionValidation_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6697 | `runDashboardQualityMasterListHealthCheck_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14264 | `runDashboardQualityMonthlyChangeValidation_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14050 | `runDashboardQualityPerformanceSummary_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14098 | `runDashboardQualityRawDataValidation_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15509 | `runFrameworkHealthCheck` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15672 | `runWorkflowSyncVerification` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 465 | `setupReportFormattingDashboard` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12088 | `showAllMasterListRows` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 12096 | `sortMasterListByParticipantNameAndPMR_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 8751 | `syncMasterListFromCarePlanDue_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 8715 | `syncMasterListFromUnlockedCarePlan_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1857 | `toBool_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1865 | `toNumber_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 1861 | `truthy_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15078 | `updateDashboardQualitySignoffSection_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15090 | `updateDashboardQualitySummarySection_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 14299 | `updateDashboardQualityTimestampsOnly_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 6079 | `validateActiveBannerFormatterOutput` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 4126 | `validateReportTemplates` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15692 | `verifyFrameworkConfiguration` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 10015 | `verifyPrimaryPMRColumnFromRawData_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 398 | `writeDashboardSection_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 384 | `writeDashboardTitle_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 2788 | `writeFrameworkTimingPerformanceRecommendations` | Public/top-level | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 11450 | `writeMasterListTitleDateBlock_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
| 15869 | `writeTimingReport_` | Private/helper | 0 | Not mapped as simple trigger, menu callback, router callback, or web route | **Candidate for Wave 5 Deletion Review** — verify external triggers, manual editor use, deployed web apps, string-based invocations, and downstream consumers before deletion. |
