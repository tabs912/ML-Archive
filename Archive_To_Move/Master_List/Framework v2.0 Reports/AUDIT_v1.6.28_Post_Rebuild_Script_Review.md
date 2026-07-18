# Master List Framework v1.6.28 — Post-Rebuild Script Review

Reviewed file: `Current_Production Script/v1.6.28` (12,008 lines). Static syntax check used `node --check` as a V8 JavaScript parse proxy; Apps Script services were reviewed statically.

## 1. Executive Assessment

**FAIL — RUNTIME BLOCKERS PRESENT**

The script **does parse as JavaScript/V8** and has **no duplicate top-level `function` declarations** detected. However, it is not production-ready because the custom menu registers multiple missing top-level callbacks, and major workflows call many missing private helpers. `onOpen` itself should load and create the root menu, but several menu selections will fail immediately with “Script function not found,” and several major workflows that do exist will fail as soon as they reach unresolved helper calls.

## 2. Critical Runtime Blockers

| Severity | Finding | Function / Section | Exact code reference | Failure mechanism | Affected workflow | Required correction |
|---|---|---|---|---|---|---|
| Critical | Confirmed missing menu callbacks | `onOpen` | Lines 1927-1932, 1952-1953, 1964-1966, 1974 | Menu points to top-level functions that are not declared anywhere in the script. | Monthly sheet visibility/archive, Quick Start, CP Due Date formatter, Unlocked CP formatter, Raw Data formatter, Format Dashboard. | Add top-level wrappers or change menu callback strings to existing functions. |
| Critical | Confirmed missing `rebuildFormatDashboardDefaults` | `formatDashboard`, `onOpen` Start-up menu | Lines 2021-2022 and 1974 | Wrapper and menu call an undefined function. | Dashboard formatting/start-up. | Implement `rebuildFormatDashboardDefaults()` or change callers to the correct existing dashboard build function. |
| Critical | Confirmed missing dashboard/sheet-definition helper | `formatMonthlyBannerSheet_`, `formatMonthlyDashboardSheetFromSource_`, `formatMonthlyRawDataSheetFromSource_`, `formatBannerReport`, template/monthly helpers | Lines 4292, 4314, 4348, 4377 and additional references | `getSheetDefinitionByType_` is called but not defined. | Banner, CP Due, Unlocked CP, Raw Data, Monthly Change template, template validation. | Restore or implement `getSheetDefinitionByType_(dashboard, sheetType)` returning the expected sheet definition object. |
| Critical | Confirmed missing formatter construction helpers | Monthly formatter helpers and Banner formatter | Lines 4295, 4304-4307, 4316-4329, 4354-4368, 4387-4389, 4414-4424 | Undefined helper calls during output naming, data copy, archive, template output creation, visibility policy, row mapping. | Format Monthly Sheets; Format Banner Report; Raw Data output. | Restore missing helpers or route to current equivalents. |
| Critical | Confirmed missing current/previous month lookup helpers | Demo P, Monthly Change, Master List, Disenrolled List | Lines 5556, 5580, 5683-5684, 6623-6624, 7734-7736, 7821, 9444 | Workflows call undefined `getCurrentRawDataSheet_`, `getPreviousRawDataSheet_`, and `getCurrentDemoPSheet_`. | Demo P sync/build, Monthly Change, Master List, Disenrolled List. | Restore lookup helpers or replace with existing monthly sheet resolver. |
| High | Confirmed smoke validation references missing helpers | `collectFrameworkSmokeValidationRows_` | Lines 11969-12004 | The Framework Smoke Validation path calls undefined `appendFrameworkSmokeValidationRow_`, `functionSourceContainsAll_`, and refers to other missing helper identifiers. | Quality → Framework Smoke Validation. | Restore smoke-test helper functions or remove/replace those checks. |
| High | Highly likely unreachable/stray template block after `return` | `formatMonthlyRawDataSheetFromSource_` | Lines 4369-4370 followed by continued code in same function in source | Code after `return outputSheet;` cannot execute; the following block appears to be a misplaced Monthly Change Template builder fragment. | Monthly Change template maintenance; code clarity/load safety. | Move this block into its intended function or delete after verifying it is duplicated elsewhere. |

## 3. Menu and Trigger Validation Table

| Menu | Menu Label | Assigned Function | Function Exists | No-Argument Safe | Dependencies Valid | Expected Result | Status | Notes |
|---|---|---:|---|---|---|---|---|---|
| Demo P | 🔄 Update Demo P | `updateDemoPMonthlySync` | Yes | Yes; prompts user | No | Fails when it reaches missing Raw Data / Demo P sheet lookup helpers. | Blocked | Uses month prompt and downstream missing helpers. |
| Demo P | 🛠️ Build Demo P | `buildDemoPFromScratch` | Yes | Yes; prompts user | No | Likely blocked by same missing sheet lookup/format helpers. | Blocked | Static dependency scan found missing lookup helpers in Demo P area. |
| Data & Processing Engine | 📚 Format Monthly Sheets | `formatMonthlySheets` | Yes | Yes; prompts user | No | Fails on first route that calls missing formatter helpers. | Blocked | Routes call `formatMonthlyBannerSheet_`, `formatMonthlyDashboardSheetFromSource_`, `formatMonthlyRawDataSheetFromSource_`. |
| Data & Processing Engine | ⛔ Create / Update Disenrolled List | `createDisenrolledList` | Yes | Yes; prompts user | No | Fails if no literal `Demo P` sheet because fallback `getCurrentDemoPSheet_` is missing. | Blocked | Also destructively removes rows from Demo P. |
| Data & Processing Engine | 🗓️ Monthly Change Report | `buildMonthlyChangeReport` | Yes | Yes; prompts user | No | Fails at current/previous Raw Data lookup. | Blocked | Missing monthly report header/date/row helpers also found. |
| Data & Processing Engine | 💡 Create Master List | `createMasterList` | Yes | Yes; prompts user | No | Fails at `getCurrentDemoPSheet_`. | Blocked | Requires current Demo P sheet. |
| Monthly Import Sheets | 🗂️ Hide Monthly Import Sheets | `hideMonthlyImportSheets` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper. |
| Monthly Import Sheets | 🗃️ Archive Monthly Import Sheets | `archiveMonthlyImportSheets` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper. |
| Monthly Active Sheets | 🗂️ Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper. |
| Monthly Active Sheets | 🗃️ Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper. |
| Templates | Hide Templates | `hideTemplates_` | Yes | Yes | Likely | Hides templates through wrapper. | Ready with warning | Uses underscore function as menu callback; Apps Script can call top-level underscore names, but the direct helper must exist. |
| Templates | Show Templates | `showTemplates_` | Yes | Yes | Likely | Shows templates through wrapper. | Ready with warning | Wrapper only. |
| System Sheets | Hide System Sheets | `hideSystemSheets_` | Yes | Yes | Likely | Hides system sheets through wrapper. | Ready with warning | Wrapper only. |
| System Sheets | Show System Sheets | `showSystemSheets_` | Yes | Yes | Likely | Shows system sheets through wrapper. | Ready with warning | Wrapper only. |
| Sheet & Layout Management | 🧭 Enforce Global Tab Sorting Order | `enforceGlobalSheetSortOrder_` | Yes | Yes | No | Fails when sort/dashboard color helper missing. | Blocked | `applyDashboardSortOrderAlternatingColors_` missing. |
| Sheet & Layout Management | 🪄 Clear Timing & Quality Logs | `clearDiagnosticsAndTimingLogs` | Yes | Yes | Unable to verify fully | Clears logs. | Ready with warning | Destructive clearing should validate target sheets. |
| Sheet & Layout Management | ⏱️ Framework Timing on/off | `toggleFrameworkTiming` | Yes | Yes | Yes | Toggles document property. | Ready | Simple property write. |
| Quick Start-up | 🏗️ System Set up | `quickSystemSetup` | No | No | No | Apps Script reports missing function. | Blocked | There is `setupSystemSheets`; likely intended callback. |
| Quick Start-up | 🖼️ Build All Templates | `quickBuildAllTemplates` | No | No | No | Apps Script reports missing function. | Blocked | There is `createOrRefreshAllReportTemplates`; likely intended callback. |
| Quick Start-up | ✅ Dashboard Quality Workflow | `runDashboardQualityFull` | Yes | Yes | No | Fails in smoke/validation sections using missing helpers. | Blocked | Several quality dependencies missing. |
| Quality | Dashboard Quality Start up | `runDashboardQualityStartUp` | Yes | Yes | Unable to verify fully | Runs start-up quality sections. | Ready with warning | Depends on system sheet integrity. |
| Quality | Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | Yes | Yes | No | Fails when template validation helpers missing. | Blocked | Missing `validateTemplateFromDashboard_`, `writeTemplateValidationReport_`. |
| Quality | Dashboard Quality Workflow | `runDashboardQualityFull` | Yes | Yes | No | Full quality workflow blocked by missing helper set. | Blocked | See dependency table. |
| Quality | Framework Smoke Validation | `runFrameworkSmokeValidation` | Yes | Yes | No | Fails in `collectFrameworkSmokeValidationRows_`. | Blocked | Missing smoke helpers. |
| Format Sheets | Banner | `formatBannerReport` | Yes | Yes; prompts user | No | Fails immediately at `getSheetDefinitionByType_`. | Blocked | Active-sheet sensitive. |
| Format Sheets | CP Due Date | `formatCarePlanDueReport` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper around generic dashboard formatter. |
| Format Sheets | Unlocked CP | `formatUnlockedCarePlanReport` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper around generic dashboard formatter. |
| Format Sheets | Raw Data | `formatRawData` | No | No | No | Apps Script reports missing function. | Blocked | Add wrapper around Raw Data formatter. |
| Start-up | 📜 Set up System Sheets | `setupSystemSheets` | Yes | Yes | Yes, subject to trigger duplication warning | Initializes system sheets and installs change trigger. | Ready with warning | Trigger creation should prevent duplicates. |
| Start-up | 🎨 Format Dashboard | `rebuildFormatDashboardDefaults` | No | No | No | Apps Script reports missing function. | Blocked | Add/rename dashboard formatter. |
| Start-up | 💾 Save Active Layout as Rebuild Default | `saveActiveLayoutToDashboardSettings` | Yes | Yes | Unable to verify fully | Saves active layout. | Ready with warning | Active-sheet sensitive. |
| Start-up | 🖼️ Create / Refresh All Templates | `createOrRefreshAllReportTemplates` | Yes | Yes | No | Fails on missing sheet-definition/template validation/formatting helpers. | Blocked | Missing helpers in template path. |
| Start-up | 📇 Build Index | `createIndexSheet` | Yes | Yes | Unable to verify fully | Builds Index sheet. | Ready with warning | Large-workbook performance risk. |

Trigger audit: `setupSystemSheets()` calls `setupIndexRefreshOnSheetAddedTrigger_()`, and smoke validation expects `handleSpreadsheetChangeForIndex` to be wired to `INSERT_GRID`. The target function exists, but the review did not confirm duplicate-trigger prevention; this should be verified before production.

## 4. Missing or Broken Dependency Table

| Calling Function | Missing or Problematic Dependency | Dependency Type | Failure Impact | Recommended Correction |
|---|---|---|---|---|
| `onOpen` | `hideMonthlyImportSheets`, `archiveMonthlyImportSheets`, `hideMonthlyActiveSheets`, `archiveMonthlyActiveSheets`, `quickSystemSetup`, `quickBuildAllTemplates`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `formatRawData`, `rebuildFormatDashboardDefaults` | Menu callback | Menu actions fail before entering script logic. | Add no-argument top-level callbacks or update menu strings to existing functions. |
| `formatDashboard` | `rebuildFormatDashboardDefaults` | Helper/wrapper target | Dashboard format wrapper fails. | Restore function or retarget wrapper. |
| `formatMonthlySheets`, `formatBannerReport`, template builders | `getSheetDefinitionByType_` | Core config helper | Multiple workflows throw `ReferenceError`. | Implement/restore dashboard sheet-definition lookup. |
| Banner formatting | `buildBannerReportOutputName_`, `writeBannerReportDates_`, `copyRawBannerDataToOutput_`, `archiveRawSourceAndDeleteLocal_`, `applyOutputVisibilityPolicy_`, `deleteSheetIfExists_` | Formatter helpers | Banner report cannot complete. | Restore these helpers or route to existing equivalents. |
| Care Plan / Raw Data monthly formatting | `buildDashboardOutputSheetName_`, `buildRawArchiveNameForSheetType_`, `collectAndClearMovedTitleInfoCells_`, `prepareCarePlanSourceSheetForDashboardFormat_`, `mapRowsToHeaders_`, `createOutputSheetFromDashboardTemplate_`, `createRawDataOutputSheetFromTemplateFast_`, `processRawDataApprovedSyncColumns_`, `syncRawDataBannerColumns_` | Formatter/data transformation helpers | CP Due, Unlocked CP, and Raw Data workflows cannot complete. | Restore helpers with expected signatures. |
| Demo P / Monthly Change / Master List / Disenrolled | `getCurrentRawDataSheet_`, `getPreviousRawDataSheet_`, `getCurrentDemoPSheet_` | Sheet resolver helpers | Major monthly workflows fail to locate source sheets. | Restore monthly resolver helpers. |
| Template validation / Dashboard Quality | `validateTemplateFromDashboard_`, `writeTemplateValidationReport_`, `applyDashboardTemplateFormattingToActiveReportSheet_` | Quality/template helpers | Template validation and dashboard quality fail. | Restore validation and formatting helpers. |
| Framework Smoke Validation | `appendFrameworkSmokeValidationRow_`, `functionSourceContainsAll_`, `applyUniversalFastCanvasFormatting_` | Smoke-test helpers | Smoke validation fails. | Restore smoke helpers or replace with supported checks. |
| Monthly Change report | `getMonthlyChangeReportHeaders_`, `getMonthlyChangeReportDateIndexes_`, `buildMonthlyChangeReportRow_`, `formatMonthlyChangeReportSectionSheet_` | Report construction helpers | Monthly Change report blocked or malformed. | Restore report helper set. |
| Sorting / dashboard styling | `sortSheetDefinitionsByProductionOrder_`, `applyDashboardSortOrderAlternatingColors_`, `styleDashboard_`, `normalizeDashboardSheetTypeKey_` | Dashboard/sort helpers | Sort/order/dashboard operations fail. | Restore or rename to existing helpers. |

## 5. Major Workflow Status

| Workflow | Status | Reason |
|---|---|---|
| Saving in Apps Script / V8 parse | Ready with warning | `node --check` passed; Apps Script service runtime still untested. |
| Opening spreadsheet / `onOpen` | Ready with warning | Menu construction is syntactically valid, but many callbacks are missing. |
| Dashboard initialization | Blocked | `rebuildFormatDashboardDefaults` is missing; `styleDashboard_` also appears unresolved. |
| Dashboard verification / Dashboard Quality | Blocked | Quality paths reference missing template/smoke helpers. |
| Template validation | Blocked | `validateTemplateFromDashboard_` and `writeTemplateValidationReport_` are missing. |
| Template creation or refresh | Blocked | Missing sheet-definition and governed formatting helpers. |
| Banner Report formatting | Blocked | Missing `getSheetDefinitionByType_` and Banner output helpers. |
| Care Plan Due Date formatting | Blocked | Public menu callback is missing. |
| Unlocked Care Plan formatting | Blocked | Public menu callback is missing. |
| Raw Data formatting | Blocked | Public menu callback is missing. |
| Disenrolled List creation | Blocked | Missing current Demo P resolver unless a literal `Demo P` sheet exists. Also destructive. |
| Demo P processing | Blocked | Missing current Raw Data/Demo P resolver helpers. |
| Primary PMR Row assignment | Unable to verify | Functions exist in the script, but upstream Demo P workflow is blocked. |
| Contact processing | Ready with warning | Contact compare helper is referenced by smoke checks; full runtime data validation not executed. |
| Banner synchronization | Blocked | `syncRawDataBannerColumns_` missing. |
| Care Plan synchronization | Unable to verify | Sync diagnostics exist, but missing lookup helpers block monthly workflows. |
| Master List creation | Blocked | Missing `getCurrentDemoPSheet_`. |
| Monthly Change Report creation | Blocked | Missing current/previous Raw Data lookup and Monthly Change helpers. |
| Master List Change Log creation | Unable to verify | Not fully traced; dependent on monthly report/master list outputs. |
| Timing reports | Ready with warning | Basic timing functions exist, but workflows feeding them fail. |
| Validation reports | Blocked | Missing validation report helpers. |
| Error logging | Ready with warning | Error pathways exist, but some catch blocks continue after warnings; runtime tests needed. |
| Index maintenance | Ready with warning | `setupSystemSheets` installs index refresh trigger; duplicate trigger prevention needs verification. |

## 6. Runtime Risk Findings

### Sheets and ranges
- **Confirmed:** Several workflows call missing output creation and deletion helpers. That makes range and sheet validation impossible to trust until helpers are restored.
- **Highly likely:** Active-sheet-sensitive functions (`formatBannerReport`, `archiveActiveRawDataSheet`, save layout) rely on the current active sheet and can process the wrong sheet if the user runs the menu from an unintended tab.

### Headers and columns
- **Confirmed:** Header mapping depends on missing `mapRowsToHeaders_`, `getMonthlyChangeReportHeaders_`, and related helpers. Header compatibility cannot be validated until those are restored.
- **Possible:** Missing duplicate-header handling in rebuilt helper set may cause wrong column indexes if restored incompletely.

### Arrays and data dimensions
- **Confirmed:** Several formatting helpers call range-formatting functions with row counts derived from data length. The smoke validation explicitly expects zero-row guards, but the referenced guard-check helpers are missing.
- **Highly likely:** Any restored helper must guard `lastRow < DATA_START_ROW` and `requestedRows < 1` before calling `getRange(row, col, 0, n)`.

### Dates and reporting periods
- **Ready with warning:** Month prompting appears centralized through `promptForLockedYearReportMonth_`, but the major workflows that consume month parts are blocked by missing sheet resolvers.

### Configuration and properties
- **Confirmed:** `ML_MENU_CALLBACKS` includes the same missing callback names as the menu registry. This is a registry integrity issue, not just a UI issue.
- **Ready:** `toggleFrameworkTiming` reads/writes document properties safely with fallback warning.

### Destructive operations
- **High risk:** `formatMonthlyRawDataSheetFromSource_` deletes the source sheet after creating output if the IDs differ and the workbook has more than one sheet. This is intended archival behavior, but currently depends on missing output/archive helpers and should validate source sheet name/type before deletion.
- **High risk:** `createDisenrolledList` calls a helper that copies disenrolled rows and removes rows from Demo P. This must be tested with primary/non-primary records and must validate target sheet before deleting.
- **Medium risk:** `deleteSheetIfExists_` is missing but is called before output creation; when restored, it must protect source/template/system sheets and avoid deleting the active raw import.

### Error handling
- **Ready with warning:** Several public workflows wrap timing in try/catch and rethrow. This preserves failures, but missing helpers will stop execution before useful workflow-specific recovery.
- **Possible:** Warning-only paths may allow workflows to continue with missing optional config; test after blockers are fixed.

### External services
- **Ready with warning:** Uses Apps Script services (`SpreadsheetApp`, `Utilities`, `Session`, `PropertiesService`, `ScriptApp`, possibly `DriveApp`). No Node-only syntax was detected. Runtime authorization requirements remain.

## 7. Performance Findings

| Rank | Function / Area | Problematic pattern | Why slow | Recommendation | Behavior change |
|---|---|---|---|---|---|
| High | Formatters and template builders | Full-template copy and large grid formatting | Copying full sheets and formatting unused rows/columns is slow on large workbooks. | Resize to actual required rows/columns, apply formats in rectangular batches only. | No, if target dimensions are preserved. |
| High | Demo P / Disenrollment | Row deletion from processed sheets | Row-by-row deletion causes sheet recalculation and UI churn. | Continue using batched deletion helpers; verify they delete descending contiguous ranges. | No. |
| High | Index maintenance trigger | Rebuild Index on every `INSERT_GRID` | Sheet additions during automated workflows may trigger repeated index rebuilds. | Debounce via document property timestamp/lock and skip while framework workflow property is active. | No functional change; fewer duplicate rebuilds. |
| Medium | Header scans / sheet definition lookups | Repeated config/header reads | Re-reading dashboard/header rows across workflows can add seconds. | Use existing caches consistently and invalidate on dashboard/template changes only. | No. |
| Medium | Formatting functions | `getMaxRows`/large fixed row counts | Formats blank rows and unused columns. | Use `getLastRow`, required buffer, and guard zero rows. | No visible change except less blank formatting. |
| Medium | Timing/quality logging | Frequent writes during long workflows | Many small writes are slow. | Buffer timing rows and write once per workflow/section. | No. |
| Low | Spreadsheet service acquisition | Repeated `getActiveSpreadsheet()` | Minor overhead. | Pass `ss` through helper chains where practical. | No. |

## 8. Duplicate, Obsolete, and Orphaned Code

### Confirmed duplicate
- No duplicate top-level `function` declarations were detected by static scan.

### Confirmed obsolete
- None confirmed. Because this script uses menu strings, trigger function names, and quality/smoke introspection, deletion should wait until dependency blockers are fixed.

### Likely orphaned
- The code fragment after `return outputSheet;` in `formatMonthlyRawDataSheetFromSource_` appears unreachable and likely misplaced. Verify whether this is a failed paste of a Monthly Change Template builder before deleting.

### Retain pending verification
- Private underscore functions that appear menu-reachable (`hideTemplates_`, `showTemplates_`, `hideSystemSheets_`, `showSystemSheets_`, `enforceGlobalSheetSortOrder_`) should be retained because they are explicitly referenced by menu strings.
- Smoke-validation-only helpers should be retained or restored if Framework Smoke Validation remains a supported quality menu item.

## 9. Recommended Correction Order

1. Fix load/runtime blockers by restoring missing core helpers: `getSheetDefinitionByType_`, sheet-name builders, row-mapping, output creation, archive/visibility helpers.
2. Fix menu callbacks by adding top-level no-argument wrappers or correcting callback strings.
3. Restore missing monthly sheet resolvers for current/previous Raw Data and current Demo P.
4. Restore template validation, smoke validation, and Dashboard Quality helper functions.
5. Audit destructive operations (`deleteSheetIfExists_`, raw source deletion, Demo P disenrollment deletion) with strict sheet-name/type validation.
6. Runtime-test each menu item in a copy workbook with empty, small, and representative large datasets.
7. Optimize high-cost formatting/deletion/index trigger patterns after correctness is established.
8. Remove or relocate unreachable code only after dynamic references are verified.

## 10. Final Readiness Checklist

| Readiness item | Result |
|---|---|
| Saving in Apps Script | Yes, with warning; syntax parses, Apps Script save not executed. |
| Opening the spreadsheet | Yes, with warning; `onOpen` should build menus. |
| Running `onOpen` | Yes, with warning; menu callback existence is not validated during menu creation. |
| Using every custom menu | No; multiple callbacks are missing. |
| Running template validation | No; missing validation helpers. |
| Running Dashboard Quality | No; missing quality/smoke helpers. |
| Formatting each report | No; Banner has missing helpers and CP/Unlocked/Raw callbacks are missing. |
| Processing Demo P | No; missing sheet resolver helpers. |
| Creating the Master List | No; missing current Demo P resolver. |
| Creating monthly reports | No; missing Raw Data resolvers and Monthly Change helpers. |
| Production use | No; production testing should wait until runtime blockers and destructive-operation validations are corrected. |

## Direct answers

1. **Will the script load?** Yes as JavaScript/V8 syntax, but Apps Script runtime workflows are blocked.
2. **Will every menu item run?** No. Ten menu callbacks are missing outright, and several existing callbacks call missing helpers.
3. **Are all required helpers present?** No. Core helpers for sheet definitions, output building, monthly lookup, template validation, and smoke validation are missing.
4. **Are there errors that will stop major workflows?** Yes. `ReferenceError` failures will stop Banner formatting, monthly formatting, Dashboard Quality, template validation, Monthly Change, Demo P/Master List paths, and more.
5. **Is any operation likely to damage or delete the wrong data?** Possible/high risk until deletion/archive helpers are restored and validated; Demo P disenrollment and raw sheet deletion are the primary destructive paths.
6. **Most important performance problems?** Full-sheet/template formatting, large sheet copies, repeated index rebuild triggers, row deletion patterns, repeated dashboard/header scans, and frequent timing writes.
7. **What must be corrected before production testing?** Restore missing helpers/callbacks first, then validate destructive operations in a copy workbook before testing with production-like data.
