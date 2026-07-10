# AUDIT v1.6.27 Speed and Stability Static Review

<<<<<<< HEAD
Source reviewed: `Current_Production Script/v.1.6.27_Production_Script`. Declared version: `1.6.27`. Source size: 15561 lines, 666 named `function` declarations.
=======
Source reviewed: `Current_Production Script/v.1.6.27_Production_Script`. Declared version: `1.6.27`. Source size: 15529 lines, 666 named `function` declarations.
>>>>>>> origin/main

## Methodology

* Ran `node --check` against a copied monolith to confirm V8/JavaScript parse stability.
<<<<<<< HEAD
* Performed targeted static scans for Spreadsheet API hotspots, trigger behavior, logging/catch surfaces, no-data guards, row/column batch helpers, re-enrollment handling, Monthly Change comparison helpers, and retained retired-artifact tokens.
=======
* Performed targeted static scans for Spreadsheet API hotspots, trigger behavior, logging/catch surfaces, no-data guards, row/column batch helpers, Monthly Change comparison helpers, and retained retired-artifact tokens.
>>>>>>> origin/main
* Built the named-function inventory at the end of this document so reviewers can navigate line-by-line through the monolith without rebuilding the script.

## Static Metrics

* **`getRange(` occurrences:** 308
* **`setValues(` occurrences:** 59
* **`getValues(` occurrences:** 50
* **`Logger.log(` occurrences:** 4
<<<<<<< HEAD
* **`logBestEffortWarning_(` occurrences:** 95
* **`catch (` occurrences:** 138
* **`SpreadsheetApp.flush` occurrences:** 1
* **`getDataRange()` occurrences:** 3
* **`getLastRow()` occurrences:** 66
=======
* **`logBestEffortWarning_(` occurrences:** 97
* **`catch (` occurrences:** 138
* **`SpreadsheetApp.flush` occurrences:** 1
* **`getDataRange()` occurrences:** 3
* **`getLastRow()` occurrences:** 63
>>>>>>> origin/main
* **`setColumnWidth(` occurrences:** 6
* **`setRowHeight(` occurrences:** 2
* **`insertSheet(` occurrences:** 13
* **`deleteSheet(` occurrences:** 14
* **`ScriptApp.newTrigger` occurrences:** 1
* **`LockService` occurrences:** 1
* **`PropertiesService` occurrences:** 10
* **`JSON.stringify` occurrences:** 5
<<<<<<< HEAD
* **`sort(` occurrences:** 27
* **`forEach(` occurrences:** 236
=======
* **`sort(` occurrences:** 26
* **`forEach(` occurrences:** 234
>>>>>>> origin/main
* **`map(` occurrences:** 100
* **`getA1Notation(` occurrences:** 0
* **`MASTER_LIST_CHANGE_LOG` occurrences:** 0
* **`appendMasterListChangeLog_` occurrences:** 0
<<<<<<< HEAD
* **Total source lines:** 15561
=======
* **Total source lines:** 15529
>>>>>>> origin/main
* **Named function declarations:** 666

## Executive Summary

<<<<<<< HEAD
The v1.6.27 artifact is syntactically stable and now includes the requested fast-canvas and roster-integrity patches: row-height locking skips very large ranges, output format extension is chunked, disabled archive sweeps avoid unnecessary archive reads, re-enrollment PMRs are forced into the Demo P monthly sync queue, historical exclusion rows are purged when a PMR is active again, and primary-row assignment prioritizes the newest Capitation Date.

The main remaining operational speed risk is still the on-change Index trigger: it calls the full `createIndexSheet()` path, including archive spreadsheet access. This is stable for normal sheet additions/removals, but debounce or local-only Index refresh remains the best next optimization if users create many tabs in a burst.
=======
The v1.6.27 artifact is syntactically stable and contains the major speed/stability hardening expected from the recent patch series: direct `Logger.log` usage is centralized in runtime logging helpers, retired Master List Change Log tokens are absent, loop-time `getA1Notation()` is absent, row deletions are batched, Monthly Change contact comparison uses deterministic keys, and Quick System Setup now runs the Quality Smokescreen and installs the Index auto-refresh trigger.

The remaining speed/stability risks are operational rather than syntactic. The most important is that the new on-change trigger calls the full `createIndexSheet()` path, which also opens the archive spreadsheet and redraws the full Index; this is acceptable for low-frequency sheet add/remove events but can be expensive if automated workflows create many sheets in a burst. A debounce/property guard or local-only index refresh mode would reduce trigger pressure.
>>>>>>> origin/main

## High-Value Stability Passes

### PASS: Versioned v1.6.27 artifact is parseable

The script declares `MASTER_LIST_MERGE_ML_VERSION = "1.6.27"` at line 32, and `node --check` passed on `/tmp/v1627.js`.

<<<<<<< HEAD
### PASS: Root Monthly Change duplicate menu item is removed

`onOpen()` keeps Monthly Change under the Data & Processing Engine submenu and no longer adds the duplicate root `Build Monthly Change Report` item. Evidence starts at line 2684.

### PASS: Fast canvas row-height and format brushing guards are present

`safeSetRowHeights_()` returns early for ranges above 2,500 rows and `ensureOutputSheetHasFormattedRows_()` copies formats in 1,000-row chunks. Evidence lines 4593-4625 and 7517-7549.

### PASS: Archive-disabled path avoids archive copy work

`archiveRawSourceAndDeleteLocal_()` only calls `archiveRawDataSheet_()` when `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA === true`; disabled archive state only marks timing. Evidence lines 6673-6782.

### PASS: Re-enrollment PMRs are forced into monthly sync

`getDemoPMonthlySyncChangedPMRs_()` builds an exclusion PMR set and adds raw PMRs found in that set to the active sync queue. Evidence lines 8742-9486.

### PASS: Re-enrollment cleansing purges historical exclusion rows

`moveDisenrolledPMRsFromDemoPToExclusion_()` detects active/enrolled PMRs from Demo P, deletes matching historical exclusion rows, and collapses Demo P to a 500-row baseline. Evidence lines 12909-13019.

### PASS: Capitation chronology drives primary row selection

`assignPrimaryRowForBlock_()` sorts block rows by newest `Capitation Date` before marking the first row as primary. Evidence lines 1284-1321.
=======
### PASS: Quality Smokescreen is wired into Quick System Setup

`quickSystemSetup()` now runs Dashboard Quality start-up and then calls `runFrameworkSmokeValidation()` at lines 812-823.

### PASS: Runtime smoke rows cover critical guard rails

`collectFrameworkSmokeValidationRows_()` validates zero-row guards, fatal title-write behavior, Demo P delete/trim behavior, duplicate contact keys, Monthly Change menu availability, and the Index trigger path around lines 6363-6405.

### PASS: Index auto-refresh trigger is present and lock-guarded

`setupIndexRefreshOnSheetAddedTrigger_()` installs one `onChange` trigger and `handleSpreadsheetChangeForIndex(e)` refreshes Index for `INSERT_GRID` / `REMOVE_GRID` events under a document lock at lines 11480-11510.

### PASS: Direct Logger usage remains centralized

There are four direct `Logger.log(` calls, all in runtime logging helpers near lines 1824-1843. Non-fatal warning paths route through `logBestEffortWarning_`.

### PASS: Date serial conversion avoids fractional millisecond drift

`spreadsheetSerialDateToLocalDate_()` uses whole-day/fractional-day separation and strips milliseconds after applying fractional days at lines 894-911.
>>>>>>> origin/main

## Speed and Stability Findings

### MEDIUM: Index trigger uses the full Index redraw and archive open path

<<<<<<< HEAD
`handleSpreadsheetChangeForIndex(e)` calls `createIndexSheet()` for sheet-grid changes. `createIndexSheet()` rebuilds the full matrix, opens the archive spreadsheet, sorts archive tabs, and repaints the Index. This is stable for occasional tab additions/removals but can be slow under bulk sheet creation or if archive access is delayed. Evidence: trigger lines 11508-11521; archive/open and redraw lines 11332-11486.
=======
`handleSpreadsheetChangeForIndex(e)` calls `createIndexSheet()` for sheet-grid changes. `createIndexSheet()` rebuilds the full matrix, opens the archive spreadsheet, sorts archive tabs, and repaints the Index. This is stable for occasional tab additions/removals but can be slow under bulk sheet creation or if archive access is delayed. Evidence: trigger lines 11497-11510; archive/open and redraw lines 11321-11475.
>>>>>>> origin/main

**Recommendation:** Add a 10-30 second debounce using `PropertiesService` in the trigger handler, or add a local-only `createIndexSheet_({ skipArchive: true })` mode for trigger refreshes while preserving the full archive refresh for manual Index builds.

### LOW: Quick System Setup is intentionally comprehensive and may approach runtime ceilings

<<<<<<< HEAD
`quickSystemSetup()` rebuilds dashboard defaults, sets up system sheets/triggers, builds Index, runs Dashboard Quality start-up, and runs the smoke harness. Evidence lines 812-825.

### LOW: Health-check function existence uses `eval`

`existsFunctionByName_(name)` uses `eval("typeof " + name)`. Input is controlled by internal arrays, so this is not an immediate safety issue, but `globalThis[name]` is simpler and avoids dynamic evaluation. Evidence lines 15185-15199.
=======
`quickSystemSetup()` rebuilds dashboard defaults, sets up system sheets/triggers, builds Index, runs Dashboard Quality start-up, and runs the smoke harness. This is convenient and stable after the latest patches, but it is a heavy single-click path. Evidence lines 812-823.

**Recommendation:** Keep the current all-in-one flow, but consider adding a separate lightweight `quickSystemSetupCore_()` for trigger/index bootstrap only if real users hit Apps Script execution-time limits.

### LOW: Toast helper forces a Spreadsheet flush for every setup status message

`showQuickStartToast_()` calls `SpreadsheetApp.flush()` after every toast. The call count is low, but flushes can force pending Spreadsheet operations earlier than necessary during heavy setup. Evidence lines 807-811.

**Recommendation:** If setup latency becomes visible, allow `showQuickStartToast_(message, { flush: false })` and flush only at major phase boundaries.

### LOW: Health-check function existence uses `eval`

`existsFunctionByName_(name)` uses `eval("typeof " + name)`. Input is controlled by internal arrays, so this is not an immediate safety issue, but `globalThis[name]` is simpler and avoids dynamic evaluation. Evidence lines 15153-15167.

**Recommendation:** Replace with `return typeof globalThis[name] === "function";` in a future cleanup pass if Apps Script V8 global binding behavior is confirmed in the bound project.

### LOW: Header drift in Demo P is best-effort logged, not fatal

Demo P header drift detection emits `logBestEffortWarning_` and continues. That protects runtime continuity, but if upstream header drift becomes a data-governance risk, this should become a hard failure before transformations. Evidence lines 7261-7270.

**Recommendation:** Keep warning behavior for now; escalate to throw only if smoke/validation results show recurring header mismatches.
>>>>>>> origin/main

## Suggested Remediation Queue

1. Add a debounce or local-only refresh mode for the on-change Index trigger if users add sheets in bursts.
2. Consider replacing `eval` in `existsFunctionByName_()` with a V8-safe global lookup.
3. Watch Quick System Setup runtime after the Smokescreen addition; split into core/full variants only if execution time becomes a real issue.
<<<<<<< HEAD
=======
4. Keep Demo P header drift as warning unless production data shows drift should halt processing.
>>>>>>> origin/main

## Named Function Line Inventory

Current v1.6.27 named function map for line-by-line navigation:

* Lines 236-242: `h_`.
* Lines 243-356: `getDefaultColumnDefinitionRows_`.
* Lines 357-375: `getAllUniqueHeaders_`.
* Lines 376-475: `getColumnStandards_`.
* Lines 476-489: `c_`.
* Lines 490-503: `writeDashboardTitle_`.
* Lines 504-538: `writeDashboardSection_`.
* Lines 539-570: `styleDashboard_`.
* Lines 571-574: `setupReportFormattingDashboard`.
* Lines 575-583: `appendDashboardSectionRows_`.
* Lines 584-617: `getResolvedDefaultColumnDefinitionRows_`.
* Lines 618-692: `writeDashboardDefaultsFast_`.
* Lines 693-696: `rebuildFormatDashboardDefaults`.
* Lines 697-711: `setupReportFormattingDashboardFromScriptDefaults_`.
* Lines 712-729: `normalizeDashboardSheetTypeKey_`.
* Lines 730-736: `getSheetDefinitionByTypeOrNull_`.
* Lines 737-742: `getSheetDefinitionByType_`.
* Lines 743-756: `sortSheetDefinitionsByProductionOrder_`.
* Lines 757-764: `notify_`.
* Lines 765-776: `trimExcessRows_`.
* Lines 777-806: `hideOldDisenrolledRows_`.
* Lines 807-811: `showQuickStartToast_`.
* Lines 812-825: `quickSystemSetup`.
* Lines 826-833: `quickBuildAllTemplates`.
* Lines 834-838: `notifyErrorWithTiming_`.
* Lines 839-843: `isBlankCell_`.
* Lines 844-893: `coerceToValidDate_`.
* Lines 894-913: `spreadsheetSerialDateToLocalDate_`.
* Lines 914-918: `isReasonableReportDate_`.
* Lines 919-922: `createLocalDateOnly_`.
* Lines 923-927: `getTodayLocalDate_`.
* Lines 928-952: `getMonthDateParts_`.
* Lines 953-956: `formatDateForSheetName_`.
* Lines 957-961: `formatDateDisplay_`.
* Lines 962-966: `dateKey_`.
* Lines 967-970: `isSameDate_`.
* Lines 971-975: `isSameMonth_`.
* Lines 976-980: `buildMonthlySheetName_`.
* Lines 981-986: `buildStandardMonthlySheetName_`.
* Lines 987-1017: `getNewestFormattedMonthlySheetByPrefix_`.
* Lines 1018-1051: `getMonthlySheetByPrefixAndDate_`.
* Lines 1052-1084: `setUniqueSheetName_`.
* Lines 1085-1104: `getHeaders_`.
* Lines 1105-1119: `getHeaderMap_`.
* Lines 1120-1128: `buildHeaderIndexMap_`.
* Lines 1129-1135: `findHeaderIndex_`.
* Lines 1136-1143: `normalizeHeader_`.
* Lines 1144-1150: `normalizePMR_`.
* Lines 1151-1154: `getPMRIndex_`.
* Lines 1155-1158: `getDOBIndex_`.
* Lines 1159-1177: `normalizeKeyPart_`.
* Lines 1178-1217: `getDataValues_`.
* Lines 1218-1251: `getRawDataSourceDataForOutput_`.
* Lines 1252-1266: `rawDataSourceHeaderRow_`.
* Lines 1267-1283: `ensurePrimaryPMRRowColumn_`.
<<<<<<< HEAD
* Lines 1284-1321: `assignPrimaryRowForBlock_`.
* Lines 1322-1355: `deleteRowNumberBatches_`.
* Lines 1356-1365: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1366-1392: `ensureHeaders_`.
* Lines 1393-1396: `ensureBannerSummaryOutputHeaders_`.
* Lines 1397-1410: `ensureContactOutputHeaders_`.
* Lines 1411-1420: `trimOutputSheetToDataSize_`.
* Lines 1421-1455: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1456-1461: `applyFinalRowHeightLock_`.
* Lines 1462-1491: `normalizeCompareValue_`.
* Lines 1492-1495: `valuesAreEqual_`.
* Lines 1496-1499: `normalizeText_`.
* Lines 1500-1503: `normalizeKey_`.
* Lines 1504-1508: `numberOrDefault_`.
* Lines 1509-1518: `parseBoolean_`.
* Lines 1519-1533: `clearHeaderCacheForSheet_`.
* Lines 1534-1538: `clearSheetRuntimeCachesForSheet_`.
* Lines 1539-1545: `getHeaderCacheKey_`.
* Lines 1546-1551: `clearMonthlySheetLookupCache_`.
* Lines 1552-1558: `getMonthlySheetLookupCacheKey_`.
* Lines 1559-1562: `getSheetDimensionCacheKey_`.
* Lines 1563-1568: `clearSheetDimensionCacheForSheet_`.
* Lines 1569-1588: `getSheetDimensions_`.
* Lines 1589-1594: `dateOnlyLocalClone_`.
* Lines 1595-1599: `monthKey_`.
* Lines 1600-1619: `parseStandardMonthlySheetDateFromName_`.
* Lines 1620-1654: `buildRowsByPMR_`.
* Lines 1655-1661: `safeSheetName_`.
* Lines 1662-1665: `compareValues_`.
* Lines 1666-1669: `toBool_`.
* Lines 1670-1673: `truthy_`.
* Lines 1674-1677: `toNumber_`.
* Lines 1678-1693: `resizeSheetMinimum_`.
* Lines 1694-1704: `getThemeColorsFromBase_`.
* Lines 1705-1709: `getGlobalBorderStyle_`.
* Lines 1710-1720: `normalizeHex_`.
* Lines 1721-1727: `hexWithHslLightness_`.
* Lines 1728-1736: `hexToRgb_`.
* Lines 1737-1744: `rgbToHex_`.
* Lines 1745-1766: `rgbToHsl_`.
* Lines 1767-1789: `hslToRgb_`.
* Lines 1790-1802: `startRuntimeTiming_`.
* Lines 1803-1829: `markRuntimeStep_`.
* Lines 1830-1834: `addRuntimeCounter_`.
* Lines 1835-1839: `logRuntimeInfo_`.
* Lines 1840-1844: `logRuntimeWarning_`.
* Lines 1845-1849: `logRuntimeError_`.
* Lines 1850-1853: `logBestEffortWarning_`.
* Lines 1854-1870: `logRuntimeTiming_`.
* Lines 1871-1878: `getRuntimeTimingSeverity_`.
* Lines 1879-1882: `getRuntimeTimingReportName_`.
* Lines 1883-1888: `writeRuntimeTimingReport_`.
* Lines 1889-1892: `writeConsolidatedTimingSummaryReport_`.
* Lines 1893-1910: `writeCombinedFrameworkTimingReport_`.
* Lines 1911-1914: `getFrameworkTimingRetentionLimit_`.
* Lines 1915-1918: `getFrameworkTimingReportSheetName_`.
* Lines 1919-1943: `getFrameworkTimingSectionRegistry_`.
* Lines 1944-1956: `findFrameworkTimingSectionRow_`.
* Lines 1957-1969: `findNextFrameworkTimingSectionRow_`.
* Lines 1970-1988: `collectExistingFrameworkTimingSectionBlocks_`.
* Lines 1989-2000: `buildDefaultFrameworkTimingSectionBlock_`.
* Lines 2001-2030: `normalizeFrameworkTimingSectionBlock_`.
* Lines 2031-2072: `rebuildFrameworkTimingReportShellCompact_`.
* Lines 2073-2098: `hasFrameworkTimingReportShell_`.
* Lines 2099-2117: `initializeFrameworkTimingSheet_`.
* Lines 2118-2121: `ensureFrameworkTimingReport_`.
* Lines 2122-2135: `trimSheetToColumnCount_`.
* Lines 2136-2238: `styleFrameworkTimingReport_`.
* Lines 2239-2246: `getFrameworkTimingSectionForId_`.
* Lines 2247-2291: `replaceFrameworkTimingSectionRows_`.
* Lines 2292-2309: `getFrameworkTimingBenchmarkForProcess_`.
* Lines 2310-2317: `getFrameworkTimingThresholdForSeverity_`.
* Lines 2318-2326: `ensureFrameworkTimingReportShell_`.
* Lines 2327-2333: `getFrameworkTimingDetailStartRow_`.
* Lines 2334-2357: `getFrameworkTimingDetailRows_`.
* Lines 2358-2378: `getLatestFrameworkTimingRowsByProcess_`.
* Lines 2379-2388: `getFrameworkTimingBenchmarkSeverity_`.
* Lines 2389-2397: `getFrameworkTimingModeForStep_`.
* Lines 2398-2402: `mergeFrameworkTimingModes_`.
* Lines 2403-2480: `buildFrameworkTimingProcessSummaryRows_`.
* Lines 2481-2490: `formatTimingTimestampForSummary_`.
* Lines 2491-2520: `buildFrameworkTimingIssueRows_`.
* Lines 2521-2537: `buildFrameworkTimingRecommendationRows_`.
* Lines 2538-2541: `writeFrameworkPerformanceRecommendationsSheet_`.
* Lines 2542-2581: `getPerformanceRecommendationForTimingStep_`.
* Lines 2582-2588: `worseTimingSeverity_`.
* Lines 2589-2614: `appendRuntimeTimingToFrameworkTimingReport_`.
* Lines 2615-2623: `formatSeconds_`.
* Lines 2624-2627: `refreshFrameworkTimingReport`.
* Lines 2628-2683: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2684-2760: `onOpen`.
* Lines 2761-2769: `isFrameworkTimingEnabled_`.
* Lines 2770-2777: `toggleFrameworkTiming`.
* Lines 2778-2781: `hideTemplates_`.
* Lines 2782-2785: `showTemplates_`.
* Lines 2786-2789: `hideSystemSheets_`.
* Lines 2790-2793: `showSystemSheets_`.
* Lines 2794-2797: `formatDashboard`.
* Lines 2798-2839: `saveActiveLayoutToDashboardSettings`.
* Lines 2840-2852: `saveFormatDashboardConfigChanges_`.
* Lines 2853-2871: `resolveSheetDefinitionForLayoutSnapshot_`.
* Lines 2872-2924: `captureActiveSheetLayoutSnapshot_`.
* Lines 2925-2932: `getHiddenColumnFlags_`.
* Lines 2933-2937: `isDateNumberFormat_`.
* Lines 2938-2950: `getDefaultLayoutSnapshotBorderConfig_`.
* Lines 2951-2974: `upsertDashboardSheetDefinitionBaseColor_`.
* Lines 2975-3011: `upsertDashboardColumnDefinitionRows_`.
* Lines 3012-3039: `getDashboardSectionBounds_`.
* Lines 3040-3055: `ensureDashboardSectionDataCapacity_`.
* Lines 3056-3096: `writeDashboardLayoutSnapshotSection_`.
* Lines 3097-3110: `applyLayoutSnapshotBorder_`.
* Lines 3111-3216: `clearDiagnosticsAndTimingLogs`.
* Lines 3217-3221: `clearDashboardConfigCache_`.
* Lines 3222-3238: `getDashboardConfigCacheKey_`.
* Lines 3239-3250: `getFormatDashboardSectionNames_`.
* Lines 3251-3264: `getRequiredFrameworkSheetTypes_`.
* Lines 3265-3329: `getDefaultGlobalSettingsRows_`.
* Lines 3330-3338: `getDefaultTitleRowRows_`.
* Lines 3339-3351: `getDefaultSheetDefinitionRows_`.
* Lines 3352-3366: `getDefaultSheetDefinitionRowsWithColumnCounts_`.
* Lines 3367-3379: `getDefaultBehaviorRows_`.
* Lines 3380-3389: `getDefaultSystemSurfaceRows_`.
* Lines 3390-3404: `getDefaultSheetHeaderRows_`.
* Lines 3405-3741: `getDefaultHeaderSets_`.
* Lines 3742-3781: `createOrRefreshAllReportTemplates`.
* Lines 3782-3820: `ensureGoldenMasterTemplate_`.
* Lines 3821-3831: `summarizeTemplateRefreshModes_`.
* Lines 3832-3838: `hideReportTemplates`.
* Lines 3839-3845: `showReportTemplates`.
* Lines 3846-3878: `setReportTemplateVisibility_`.
* Lines 3879-3886: `validateReportTemplates`.
* Lines 3887-3896: `validateReportTemplatesCore_`.
* Lines 3897-3941: `loadDashboardConfig_`.
* Lines 3942-3963: `buildDashboardSectionIndex_`.
* Lines 3964-4008: `loadGlobalSettings_`.
* Lines 4009-4043: `loadTitleRows_`.
* Lines 4044-4069: `parseTitleRowConfigRow_`.
* Lines 4070-4075: `normalizeTitleTargetCell_`.
* Lines 4076-4083: `getTitleRowConfigForSheet_`.
* Lines 4084-4091: `getThemeFillForTitleRow_`.
* Lines 4092-4098: `toWrapStrategy_`.
* Lines 4099-4126: `loadSheetDefinitions_`.
* Lines 4127-4160: `loadSheetHeaders_`.
* Lines 4161-4187: `loadColumnDefinitions_`.
* Lines 4188-4211: `loadSheetBehaviors_`.
* Lines 4212-4219: `normalizeDashboardSectionTitle_`.
* Lines 4220-4264: `readDashboardSectionRows_`.
* Lines 4265-4270: `getBehaviorForSheetType_`.
* Lines 4271-4342: `createOrRefreshTemplateFromDashboard_`.
* Lines 4343-4349: `shouldUseStagedTemplateBuild_`.
* Lines 4350-4360: `shouldRefreshTemplateMetadataOnly_`.
* Lines 4361-4378: `buildTemplateRefreshDecisionMessage_`.
* Lines 4379-4391: `refreshTemplateMetadataOnly_`.
* Lines 4392-4420: `buildTemplateFromDashboardSafely_`.
* Lines 4421-4424: `getTemplateBuildSheetName_`.
* Lines 4425-4436: `promoteStagedTemplateBuild_`.
* Lines 4437-4454: `validateBuiltTemplateMinimumStructure_`.
* Lines 4455-4504: `buildTemplateFromDashboard_`.
* Lines 4505-4509: `shouldSkipTemplateResize_`.
* Lines 4510-4518: `ensureSheetMinimumColumns_`.
* Lines 4519-4543: `clearTemplateForFullBuild_`.
* Lines 4544-4549: `applyTemplateRowHeights_`.
* Lines 4550-4553: `applyFinalRowHeightLockForSheetType_`.
* Lines 4554-4581: `lockFinalOutputRowHeights_`.
* Lines 4582-4592: `applyGlobalDefaultRowHeightsToSheet_`.
* Lines 4593-4625: `safeSetRowHeights_`.
* Lines 4626-4632: `applyRowHeightRuns_`.
* Lines 4633-4647: `hideTemplateIfNeeded_`.
* Lines 4648-4671: `resolveTemplateRowCount_`.
* Lines 4672-4720: `applyTemplateBaseFormatting_`.
* Lines 4721-4733: `ensureTitleRowConfig_`.
* Lines 4734-4786: `applyTitleRows_`.
* Lines 4787-4797: `rowColToA1_`.
* Lines 4798-4838: `applyHeaderRow_`.
* Lines 4839-4849: `applyColumnWidths_`.
* Lines 4850-4885: `applyColumnWidthsInRuns_`.
* Lines 4886-4889: `applyDateAndNumberFormats_`.
* Lines 4890-4894: `enforceTemplateDateAndNumberFormats_`.
* Lines 4895-4951: `enforceDateAndNumberFormatsForHeaders_`.
* Lines 4952-4958: `getExpectedNumberFormat_`.
* Lines 4959-4977: `getGoogleSheetsNumberFormat_`.
* Lines 4978-4982: `isDateFormatText_`.
* Lines 4983-4992: `applyHiddenColumnSettings_`.
* Lines 4993-5028: `applyHiddenColumnSettingsInRuns_`.
* Lines 5029-5054: `applyDataRows_`.
* Lines 5055-5081: `applyAlternatingColorRules_`.
* Lines 5082-5111: `applyMonthlyChangeSpacerRow3Format_`.
* Lines 5112-5157: `formatMonthlyChangeSubsectionBlock_`.
* Lines 5158-5175: `writeTemplateMetadata_`.
* Lines 5176-5208: `buildTemplateFormatSignature_`.
* Lines 5209-5222: `compactTemplateFormatSignature_`.
* Lines 5223-5231: `normalizeTemplateFormatSignature_`.
* Lines 5232-5237: `getTemplateFormatSignatureKey_`.
* Lines 5238-5246: `getStoredTemplateFormatSignature_`.
* Lines 5247-5266: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5267-5274: `storeTemplateFormatSignature_`.
* Lines 5275-5323: `ensureTemplateFilter_`.
* Lines 5324-5361: `applyTemplateFreezeAndTabColor_`.
* Lines 5362-5386: `resizeSheet_`.
* Lines 5387-5419: `resizeSheetGrid_`.
* Lines 5420-5424: `resizeSheetRows_`.
* Lines 5425-5428: `resizeSheetColumns_`.
* Lines 5429-5436: `getHeadersForSheetType_`.
* Lines 5437-5446: `getDefaultBehavior_`.
* Lines 5447-5458: `showSheetIfNeeded_`.
* Lines 5459-5472: `hideSheetIfNeeded_`.
* Lines 5473-5511: `formatMonthlySheets`.
* Lines 5512-5520: `buildPromptedMonthContext_`.
* Lines 5521-5542: `formatMonthlyBannerSheet_`.
* Lines 5543-5576: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5577-5604: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5605-5672: `formatBannerReport`.
* Lines 5673-5694: `validateActiveBannerFormatterOutput`.
* Lines 5695-5712: `archiveActiveRawDataSheet`.
* Lines 5713-5745: `parseReportMonthInput_`.
* Lines 5746-5789: `promptForLockedYearReportMonth_`.
* Lines 5790-5793: `boolText_`.
* Lines 5794-5798: `isPrimaryPMRRowValue_`.
* Lines 5799-5826: `assignPrimaryPMRRows_`.
* Lines 5827-5838: `getCurrentBannersSheet_`.
* Lines 5839-5847: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5848-5859: `getCurrentCarePlanDueSheet_`.
* Lines 5860-5865: `getPreviousMasterListSheet_`.
* Lines 5866-5871: `getCurrentMasterListSheet_`.
* Lines 5872-5914: `applyStandardFormatting_`.
* Lines 5915-5924: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5925-5933: `forceStandardTitleCellAlignment_`.
* Lines 5934-5942: `captureHiddenSheetNames_`.
* Lines 5943-5959: `restorePreviouslyHiddenSheets_`.
* Lines 5960-5967: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5968-5971: `hidePreviousMonthSheets_`.
* Lines 5972-5986: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5987-6007: `applyIndexSheetRowFills_`.
* Lines 6008-6030: `applyCurrentVsOlderTabColors_`.
* Lines 6031-6034: `organizeSheetTabs_`.
* Lines 6035-6053: `formatDateColumnsByHeader_`.
* Lines 6054-6063: `rowObjectFromHeaders_`.
* Lines 6064-6067: `getLiveDashboardAuditStatus_`.
* Lines 6068-6071: `getLiveTemplateValidationStatus_`.
* Lines 6072-6075: `getLiveFrameworkHealthStatus_`.
* Lines 6076-6081: `getLiveSheetStatus_`.
* Lines 6082-6087: `setMonthlySheetNameFast_`.
* Lines 6088-6243: `writePMRContactsToParticipantRows_`.
* Lines 6244-6252: `buildParticipantContactKey_`.
* Lines 6253-6259: `isExpiredContactPhoneDate_`.
* Lines 6260-6266: `capitalizeContactPart_`.
* Lines 6267-6282: `formatRankedContact_`.
* Lines 6283-6294: `getMostRecentDateFromRowsByHeader_`.
* Lines 6295-6305: `isDateInStrictLocalRangeInclusive_`.
* Lines 6306-6309: `isDateDisplayInReportWindow_`.
* Lines 6310-6319: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6320-6333: `getSheetTypeForOrganization_`.
* Lines 6334-6345: `collectFrameworkHealthCheckRows_`.
* Lines 6346-6353: `collectWorkflowSyncVerificationRows_`.
* Lines 6354-6369: `runFrameworkSmokeValidation`.
* Lines 6370-6412: `collectFrameworkSmokeValidationRows_`.
* Lines 6413-6416: `appendFrameworkSmokeValidationRow_`.
* Lines 6417-6423: `functionSourceContainsAll_`.
* Lines 6424-6432: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6433-6443: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6444-6454: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6455-6496: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6497-6514: `ensureStandardTitleRows_`.
* Lines 6515-6523: `isDateLikeHeader_`.
* Lines 6524-6527: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6528-6534: `formatReportDateLabel_`.
* Lines 6535-6539: `buildBannerReportOutputName_`.
* Lines 6540-6553: `renameSheetSafely_`.
* Lines 6554-6577: `deleteSheetIfExists_`.
* Lines 6578-6586: `writeBannerReportDates_`.
* Lines 6587-6637: `copyRawBannerDataToOutput_`.
* Lines 6638-6644: `ensureSheetHasAtLeastRows_`.
* Lines 6645-6672: `validateBannerFormatterOutput_`.
* Lines 6673-6694: `archiveRawSourceAndDeleteLocal_`.
* Lines 6695-6717: `archiveRawDataSheet_`.
* Lines 6718-6729: `hideMonthlyImportSheets`.
* Lines 6730-6740: `hideMonthlyActiveSheets`.
* Lines 6741-6765: `hideMonthlySheetsBySpecs_`.
* Lines 6766-6782: `archiveMonthlyImportSheets`.
* Lines 6783-6799: `archiveMonthlyActiveSheets`.
* Lines 6800-6838: `archiveMonthlySheetsBySpecs_`.
* Lines 6839-6862: `findArchiveMonthlyCandidateSheets_`.
* Lines 6863-6887: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6888-6896: `notifyArchiveMonthlySheetsResult_`.
* Lines 6897-6913: `deleteArchiveSheetIfExists_`.
* Lines 6914-6917: `formatMonthlyChangeSubheaderRow`.
* Lines 6918-6929: `formatMonthlyChangeSubsectionBlock`.
* Lines 6930-6934: `getMonthlyChangeSubsectionLabels`.
* Lines 6935-6954: `normalizeNumberFormatForCompare_`.
* Lines 6955-6960: `numberFormatsMatch_`.
* Lines 6961-7106: `validateTemplateFromDashboard_`.
* Lines 7107-7112: `writeTemplateValidationReport_`.
* Lines 7113-7199: `formatRawData`.
* Lines 7200-7217: `ensureRawDataHeaderRows_`.
* Lines 7218-7227: `rowLooksLikeParticipantHeader_`.
* Lines 7228-7234: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7235-7278: `enforceDemoPStrictDashboardSchema_`.
* Lines 7279-7290: `buildRawDataSourceArchiveName_`.
* Lines 7291-7302: `mapRowsToHeaders_`.
* Lines 7303-7320: `applyUniversalFastCanvasFormatting_`.
* Lines 7321-7352: `applyGovernedTextAndNumberFormats_`.
* Lines 7353-7364: `applyOutputVisibilityPolicy_`.
* Lines 7365-7438: `createOutputSheetFromDashboardTemplate_`.
* Lines 7439-7516: `createRawDataOutputSheetFromTemplateFast_`.
* Lines 7517-7549: `ensureOutputSheetHasFormattedRows_`.
* Lines 7550-7631: `syncRawDataBannerColumns_`.
* Lines 7632-7673: `buildSourceMapByCompositeKeyForDemoPBanner_`.
* Lines 7674-7682: `formatCarePlanDueReport`.
* Lines 7683-7691: `formatUnlockedCarePlanReport`.
* Lines 7692-7786: `formatCarePlanDueOrUnlockedFromDashboard_`.
* Lines 7787-7813: `buildRawArchiveNameForSheetType_`.
* Lines 7814-7840: `collectAndClearMovedTitleInfoCells_`.
* Lines 7841-7847: `prepareCarePlanSourceSheetForDashboardFormat_`.
* Lines 7848-7861: `prepareRawDataSourceSheetForDashboardFormat_`.
* Lines 7862-7872: `buildRawDataHeadersForFormatting_`.
* Lines 7873-7878: `getRawDataApprovedAddedColumns_`.
* Lines 7879-7902: `processRawDataApprovedSyncColumns_`.
* Lines 7903-7944: `writeChangedColumnsOnly_`.
* Lines 7945-8003: `getRawDataDemoPSourceHeaders_`.
* Lines 8004-8054: `getRawDataDisallowedWorkingColumns_`.
* Lines 8055-8062: `isOngoingOutputSheetType_`.
* Lines 8063-8097: `buildDashboardOutputSheetName_`.
* Lines 8098-8103: `syncMasterListMonthlySourcesIntoData_`.
* Lines 8104-8132: `syncBannerSourceIntoData_`.
* Lines 8133-8167: `syncUnlockedCarePlanSourceIntoData_`.
* Lines 8168-8201: `syncCarePlanDueSourceIntoData_`.
* Lines 8202-8241: `syncRowsFromSourceMapData_`.
* Lines 8242-8279: `buildSourceMapBySingleKeyForPart5_`.
* Lines 8280-8321: `buildSourceMapByCompositeKeyForPart5_`.
* Lines 8322-8346: `shouldProcessRowByPMR_`.
* Lines 8347-8354: `normalizeSyncFieldPairs_`.
* Lines 8355-8384: `syncMasterListFromBanners_`.
* Lines 8385-8420: `syncMasterListFromUnlockedCarePlan_`.
* Lines 8421-8454: `syncMasterListFromCarePlanDue_`.
* Lines 8455-8617: `syncRowsFromSourceMap_`.
* Lines 8618-8635: `getDefaultDemoPMetadataHeaderRows_v155_`.
* Lines 8636-8660: `buildDemoPFromScratch`.
* Lines 8661-8700: `updateDemoPMonthlySync`.
* Lines 8701-8719: `enforceDemoPPostFlattenFormatting_`.
* Lines 8720-8741: `sortSheetAlphabeticallyByParticipantName_`.
* Lines 8742-8811: `getDemoPMonthlySyncChangedPMRs_`.
* Lines 8812-8847: `processDemoPDataWithFillBlankMask_`.
* Lines 8848-8869: `buildDemoPFreshRowsForPMRs_`.
* Lines 8870-8880: `processDemoPFreshRowsInMemory_`.
* Lines 8881-8941: `flattenDemoPContactsToPrimaryRows_`.
* Lines 8942-8960: `buildDemoPContactSummaryForFlatRecord_`.
* Lines 8961-8974: `sortDemoPFlatRows_`.
* Lines 8975-9054: `processDemoP`.
* Lines 9055-9102: `processDemoPAsWorkingSource_`.
* Lines 9103-9132: `markPrimaryPMRRowsForSequentialData_`.
* Lines 9133-9153: `assignPrimaryPMRRowsInData_`.
* Lines 9154-9157: `formatDemoPStructure`.
* Lines 9158-9161: `buildRawDataSheetName_`.
* Lines 9162-9236: `getOrCreateDemoPProcessingSheet_`.
* Lines 9237-9250: `deleteSheetIfExistsForDemoPProcess_`.
* Lines 9251-9258: `getLastRawDataDisenrolledBuildResult_`.
* Lines 9259-9265: `setLastRawDataDisenrolledBuildResult_`.
* Lines 9266-9325: `updateExistingDemoPFromRawData_`.
* Lines 9326-9425: `createActiveDemoPFromRawData_`.
* Lines 9426-9443: `populateDemoPUpdateColumns_`.
* Lines 9444-9486: `populateUniversalMetadataColumns_`.
* Lines 9487-9504: `buildSourceHashByPMR_`.
* Lines 9505-9527: `buildSourceHashForRows_`.
* Lines 9528-9531: `buildSourceHashForRow_`.
* Lines 9532-9547: `buildColumnsUpdatedText_`.
* Lines 9548-9555: `normalizeHashValue_`.
* Lines 9556-9563: `computeStableHash_`.
* Lines 9564-9572: `verifyPrimaryPMRColumnFromRawData_`.
* Lines 9573-9580: `createOrRefreshDemoPTemplate_`.
* Lines 9581-9587: `getOrCreateDemoPTemplate_`.
* Lines 9588-9603: `initializeDemoPTemplateTitleRows_`.
* Lines 9604-9625: `applyDemoPTemplateFormatting_`.
* Lines 9626-9661: `applyDemoPTemplateToSheet_`.
* Lines 9662-9715: `applyDemoPDateFormattingByHeader_`.
* Lines 9716-9733: `buildMonthlyChangeReport`.
* Lines 9734-9843: `buildMonthlyChangeReportForMonth_`.
* Lines 9844-9900: `getOrBuildMonthlyChangeReport_`.
* Lines 9901-10093: `compareRawDemoPForSectionReport_`.
* Lines 10094-10099: `rowsWithDOBOnlyForSection_`.
* Lines 10100-10115: `getChangedColumnsForSectionRows_`.
* Lines 10116-10128: `buildColumnSignaturesForSection_`.
* Lines 10129-10291: `compareRawDemoPForChanges_`.
* Lines 10292-10359: `getRawDemoPDataForCompare_`.
* Lines 10360-10408: `compareSingleFieldAndAdd_`.
* Lines 10409-10451: `addMCRRow_`.
* Lines 10452-10470: `buildContactCompareMap_`.
* Lines 10471-10476: `getFieldValueFromRow_`.
* Lines 10477-10493: `buildParticipantName_`.
* Lines 10494-10501: `displayValueForReport_`.
* Lines 10502-10525: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10526-10531: `padRowToWidth_`.
* Lines 10532-10541: `stripMonthlyChangeNativeBandings_`.
* Lines 10542-10588: `getMonthlyChangeSectionSpecs_`.
* Lines 10589-10635: `buildMonthlyChangeSectionRows_`.
* Lines 10636-10643: `appendMonthlyChangeCompiledRow_`.
* Lines 10644-10673: `appendMonthlyChangeSectionBlock_`.
* Lines 10674-10726: `populateMonthlyChangeReportSections_`.
* Lines 10727-10742: `findMonthlyChangeSectionTitleRow_`.
* Lines 10743-10763: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10764-10857: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10858-10897: `writeDiagnosticReport_`.
* Lines 10898-10924: `runMonthlyUpdate`.
* Lines 10925-10930: `updateMasterList`.
* Lines 10931-11024: `updateMasterListForMonth_`.
* Lines 11025-11097: `createMasterList`.
* Lines 11098-11164: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11165-11171: `getMasterListTemplateHeaders_`.
* Lines 11172-11179: `createOrRefreshMasterListTemplate_`.
* Lines 11180-11186: `getOrCreateMasterListTemplate_`.
* Lines 11187-11243: `createMasterListSheetFromTemplate_`.
* Lines 11244-11250: `writeMasterListTitleDateBlock_`.
* Lines 11251-11259: `initializeMasterListTitleRows_`.
* Lines 11260-11277: `copyDemoPHeaderRowsToMasterList_`.
* Lines 11278-11303: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11304-11311: `formatMasterListSheet_`.
* Lines 11312-11323: `getMonthPartsFromTitleRows_`.
* Lines 11324-11331: `updateCopiedMasterListHeader_`.
* Lines 11332-11486: `createIndexSheet`.
* Lines 11487-11490: `generateArchiveFileIndex_`.
* Lines 11491-11507: `setupIndexRefreshOnSheetAddedTrigger_`.
* Lines 11508-11521: `handleSpreadsheetChangeForIndex`.
* Lines 11522-11604: `enforceGlobalSheetSortOrder_`.
* Lines 11605-11623: `extractFirstDateFromSheetName_`.
* Lines 11624-11647: `parseIndexMonthDate_`.
* Lines 11648-11694: `organizeWorkbookTabs_`.
* Lines 11695-11712: `hideSystemAndTestingSheets_`.
* Lines 11713-11728: `getSystemAndTestingSheetNames_`.
* Lines 11729-11747: `isSystemOrTestingSheet_`.
* Lines 11748-11754: `assignSortOrderAndHideExtraRows`.
* Lines 11755-11760: `applySortOrderDisplayForMasterList_`.
* Lines 11761-11787: `buildParticipantBlocksForSortOrder_`.
* Lines 11788-11795: `showAllMasterListRows`.
* Lines 11796-11800: `groupMasterListRowsByPMR_`.
* Lines 11801-11804: `hideRowsWithBlankDOB_`.
* Lines 11805-11864: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11865-11883: `getPrimaryRowScore_`.
* Lines 11884-11908: `hideNonPrimaryPMRRows_`.
* Lines 11909-11926: `hideRowNumberBatches_`.
* Lines 11927-11938: `clearAllRowGroupsIfPossible_`.
* Lines 11939-11945: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11946-11951: `applyFinalMasterListColorAndDisplay_`.
* Lines 11952-11955: `applyMasterListDisplaySettings_`.
* Lines 11956-11963: `processMasterListFull_`.
* Lines 11964-11967: `processMasterListDataOnly_`.
* Lines 11968-12002: `processMasterListSingleDataPass_`.
* Lines 12003-12021: `populateParticipantNameData_`.
* Lines 12022-12038: `populateDemoPNameData_`.
* Lines 12039-12063: `updateBannerColumnData_`.
* Lines 12064-12077: `combineAddressesData_`.
* Lines 12078-12099: `handleLanguageData_`.
* Lines 12100-12126: `splitPhoneNumbersData_`.
* Lines 12127-12131: `runMasterContactProcessData_`.
* Lines 12132-12158: `combineNotesSummaryData_`.
* Lines 12159-12168: `rebuildChangedPMRsFromDemoP_`.
* Lines 12169-12194: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12195-12221: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12222-12251: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12252-12262: `getPMRsForMonthlyChangeSections_`.
* Lines 12263-12277: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12278-12325: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12326-12397: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12398-12407: `buildMappedMasterRowFromDemoRow_`.
* Lines 12408-12417: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12418-12425: `hideSystemSheetsNow`.
* Lines 12426-12458: `showSystemSheetsNow`.
* Lines 12459-12477: `getPrimaryMergeRowItem_`.
* Lines 12478-12547: `getPrimaryRowChangedColumnDetails_`.
* Lines 12548-12557: `formatMergeAuditValueForDisplay_`.
* Lines 12558-12563: `getMergeAuditParticipantName_`.
* Lines 12564-12584: `getMergeAuditParticipantNameFromRows_`.
* Lines 12585-12608: `buildMergeAuditContactSummary_`.
* Lines 12609-12641: `getMergeAuditChangedFields_`.
* Lines 12642-12665: `buildMergeRowsByPMRFromData_`.
* Lines 12666-12695: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12696-12725: `buildMergeKeyMapForRows_`.
* Lines 12726-12749: `buildContactMergeRowKey_`.
* Lines 12750-12764: `getMergeRowValue_`.
* Lines 12765-12794: `createDisenrolledList`.
* Lines 12795-12815: `processBlankContactSummariesOnDemoP_`.
* Lines 12816-12867: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12868-12885: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12886-12903: `loadDisenrolledPMRSetForMonth_`.
* Lines 12904-12908: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12909-13019: `moveDisenrolledPMRsFromDemoPToExclusion_`.
* Lines 13020-13087: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 13088-13099: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 13100-13141: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13142-13161: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13162-13201: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13202-13314: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13315-13319: `getCurrentRawDataSheet_`.
* Lines 13320-13324: `getPreviousRawDataSheet_`.
* Lines 13325-13332: `getCurrentDemoPSheet_`.
* Lines 13333-13338: `getPreviousDemoPSheet_`.
* Lines 13339-13350: `getMonthlyChangeReportHeaders_`.
* Lines 13351-13356: `getMonthlyChangeReportDateIndexes_`.
* Lines 13357-13386: `convertMonthlyChangeReportDateValues_`.
* Lines 13387-13407: `buildMonthlyChangeReportRow_`.
* Lines 13408-13427: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13428-13434: `runDashboardQualityStartUp`.
* Lines 13435-13488: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13489-13498: `getDashboardVerificationPassRow_`.
* Lines 13499-13503: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13504-13509: `getDashboardSectionHeaderWidth_`.
* Lines 13510-13519: `collectBlankDashboardCells_`.
* Lines 13520-13551: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13552-13588: `collectFormatDashboardTitleRowsVerificationRows_`.
* Lines 13589-13617: `collectFormatDashboardSheetDefinitionVerificationRows_`.
* Lines 13618-13654: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13655-13684: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13685-13713: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13714-13723: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13724-13728: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13729-13736: `runDashboardQualitySectionIfDue_`.
* Lines 13737-13740: `runDashboardQualityQuick`.
* Lines 13741-13748: `runDashboardQualityValidateTemplates`.
* Lines 13749-13780: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13781-13792: `getDashboardQualitySectionRegistry_`.
* Lines 13793-13842: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13843-13849: `runDashboardQualityPerformanceSummary_`.
* Lines 13850-13870: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13871-13923: `runDashboardQualityFull`.
* Lines 13924-13932: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13933-14005: `repairAllTemplateDateFormats`.
* Lines 14006-14011: `normalizeSectionRowForWidth_`.
* Lines 14012-14017: `rowHasAnyValue_`.
* Lines 14018-14023: `trimTrailingBlankRows_`.
* Lines 14024-14045: `getDefaultDashboardQualityDetailHeader_`.
* Lines 14046-14063: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 14064-14071: `getDashboardQualityNotRunMessage_`.
* Lines 14072-14087: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 14088-14127: `normalizeDashboardQualitySectionBlock_`.
* Lines 14128-14170: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14171-14178: `getDashboardQualitySectionTitleForKey_`.
* Lines 14179-14186: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14187-14203: `hasDashboardQualityTemplateShell_`.
* Lines 14204-14222: `initializeDashboardQualitySheet_`.
* Lines 14223-14240: `initializeSystemSheets_`.
* Lines 14241-14244: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14245-14248: `ensureDashboardQualityReportSheet_`.
* Lines 14249-14257: `ensureDashboardQualityTemplateShell_`.
* Lines 14258-14262: `ensureDashboardQualitySectionShells_`.
* Lines 14263-14268: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14269-14316: `applyDashboardQualityReportColumnSettings_`.
* Lines 14317-14327: `styleDashboardQualityReport_`.
* Lines 14328-14331: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14332-14336: `isDashboardQualityNotesLabel_`.
* Lines 14337-14367: `normalizeDashboardQualityOutputRow_`.
* Lines 14368-14372: `getDashboardQualitySectionLetter_`.
* Lines 14373-14378: `normalizeDashboardQualityIssueValue_`.
* Lines 14379-14411: `normalizeDashboardQualityRowsForSection_`.
* Lines 14412-14419: `normalizeDashboardQualityDataRows_`.
* Lines 14420-14442: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14443-14461: `getStatusFromDashboardQualityRows_`.
* Lines 14462-14483: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14484-14503: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14504-14511: `dashboardQualityRowsEqualValues_`.
* Lines 14512-14541: `saveDashboardQualitySectionRows_`.
* Lines 14542-14553: `getDashboardQualitySectionRows_`.
* Lines 14554-14564: `deleteLegacyQualityReportSheet_`.
* Lines 14565-14571: `deleteLegacyStandaloneQualityReports_`.
* Lines 14572-14579: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14580-14592: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14593-14601: `getStoredDashboardQualityOverallStatus_`.
* Lines 14602-14613: `getStoredDashboardQualityFailureNotes_`.
* Lines 14614-14619: `buildDatedDisenrolledOutputName_`.
* Lines 14620-14630: `forceSheetRowCount_`.
* Lines 14631-14664: `buildCombinedFrameworkTestDashboard`.
* Lines 14665-14670: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14671-14682: `updateDashboardQualitySignoffSection_`.
* Lines 14683-14693: `updateDashboardQualitySummarySection_`.
* Lines 14694-14697: `updateDashboardQualityTimingSummarySection_`.
* Lines 14698-14726: `getDashboardQualitySectionBoundsMap_`.
* Lines 14727-14787: `replaceDashboardQualitySectionsRows_`.
* Lines 14788-14804: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14805-14878: `replaceDashboardQualitySectionRows_`.
* Lines 14879-14893: `findDashboardQualitySectionRow_`.
* Lines 14894-14904: `findNextDashboardQualitySectionRow_`.
* Lines 14905-14924: `dashboardQualitySectionContentMatches_`.
* Lines 14925-14942: `mergeDashboardQualityStyleRanges_`.
* Lines 14943-15032: `styleDashboardQualityUpdatedSections_`.
* Lines 15033-15052: `appendCombinedDashboardSignOffRows_`.
* Lines 15053-15083: `buildFrameworkSummaryRows_`.
* Lines 15084-15103: `getStoredSectionStatusAndNotes_`.
* Lines 15104-15119: `getReportOverallStatus_`.
* Lines 15120-15139: `getReportFailureNotes_`.
* Lines 15140-15166: `runFrameworkHealthCheck`.
* Lines 15167-15172: `getFrameworkHealthCheckIssueRows_`.
* Lines 15173-15184: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15185-15191: `appendRequiredFunctionChecks_`.
* Lines 15192-15199: `existsFunctionByName_`.
* Lines 15200-15204: `writeFrameworkHealthCheckReport_`.
* Lines 15205-15216: `normalizeFrameworkHealthCheckRows_`.
* Lines 15217-15232: `getRequiredHelperFunctionNames_`.
* Lines 15233-15274: `getRequiredMenuFunctionNames_`.
* Lines 15275-15284: `getRequiredDashboardFunctionNames_`.
* Lines 15285-15293: `getRequiredTemplateFunctionNames_`.
* Lines 15294-15301: `getRequiredValidationFunctionNames_`.
* Lines 15302-15310: `getRequiredTimingFunctionNames_`.
* Lines 15311-15323: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15324-15327: `runWorkflowSyncVerification`.
* Lines 15328-15335: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15336-15342: `setupSystemSheets`.
* Lines 15343-15398: `verifyFrameworkConfiguration`.
* Lines 15399-15418: `runFrameworkTimed_`.
* Lines 15419-15429: `startFrameworkTiming_`.
* Lines 15430-15454: `markFrameworkStep_`.
* Lines 15455-15460: `writeFrameworkTimingReport_`.
* Lines 15461-15464: `writeTimingReport_`.
* Lines 15465-15481: `trimTimingReportRows_`.
* Lines 15482-15561: `rebuildProductionMonthlyChangeTemplate`.
=======
* Lines 1284-1310: `assignPrimaryRowForBlock_`.
* Lines 1311-1344: `deleteRowNumberBatches_`.
* Lines 1345-1354: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1355-1381: `ensureHeaders_`.
* Lines 1382-1385: `ensureBannerSummaryOutputHeaders_`.
* Lines 1386-1399: `ensureContactOutputHeaders_`.
* Lines 1400-1409: `trimOutputSheetToDataSize_`.
* Lines 1410-1444: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1445-1450: `applyFinalRowHeightLock_`.
* Lines 1451-1480: `normalizeCompareValue_`.
* Lines 1481-1484: `valuesAreEqual_`.
* Lines 1485-1488: `normalizeText_`.
* Lines 1489-1492: `normalizeKey_`.
* Lines 1493-1497: `numberOrDefault_`.
* Lines 1498-1507: `parseBoolean_`.
* Lines 1508-1522: `clearHeaderCacheForSheet_`.
* Lines 1523-1527: `clearSheetRuntimeCachesForSheet_`.
* Lines 1528-1534: `getHeaderCacheKey_`.
* Lines 1535-1540: `clearMonthlySheetLookupCache_`.
* Lines 1541-1547: `getMonthlySheetLookupCacheKey_`.
* Lines 1548-1551: `getSheetDimensionCacheKey_`.
* Lines 1552-1557: `clearSheetDimensionCacheForSheet_`.
* Lines 1558-1577: `getSheetDimensions_`.
* Lines 1578-1583: `dateOnlyLocalClone_`.
* Lines 1584-1588: `monthKey_`.
* Lines 1589-1608: `parseStandardMonthlySheetDateFromName_`.
* Lines 1609-1643: `buildRowsByPMR_`.
* Lines 1644-1650: `safeSheetName_`.
* Lines 1651-1654: `compareValues_`.
* Lines 1655-1658: `toBool_`.
* Lines 1659-1662: `truthy_`.
* Lines 1663-1666: `toNumber_`.
* Lines 1667-1682: `resizeSheetMinimum_`.
* Lines 1683-1693: `getThemeColorsFromBase_`.
* Lines 1694-1698: `getGlobalBorderStyle_`.
* Lines 1699-1709: `normalizeHex_`.
* Lines 1710-1716: `hexWithHslLightness_`.
* Lines 1717-1725: `hexToRgb_`.
* Lines 1726-1733: `rgbToHex_`.
* Lines 1734-1755: `rgbToHsl_`.
* Lines 1756-1778: `hslToRgb_`.
* Lines 1779-1791: `startRuntimeTiming_`.
* Lines 1792-1818: `markRuntimeStep_`.
* Lines 1819-1823: `addRuntimeCounter_`.
* Lines 1824-1828: `logRuntimeInfo_`.
* Lines 1829-1833: `logRuntimeWarning_`.
* Lines 1834-1838: `logRuntimeError_`.
* Lines 1839-1842: `logBestEffortWarning_`.
* Lines 1843-1859: `logRuntimeTiming_`.
* Lines 1860-1867: `getRuntimeTimingSeverity_`.
* Lines 1868-1871: `getRuntimeTimingReportName_`.
* Lines 1872-1877: `writeRuntimeTimingReport_`.
* Lines 1878-1881: `writeConsolidatedTimingSummaryReport_`.
* Lines 1882-1899: `writeCombinedFrameworkTimingReport_`.
* Lines 1900-1903: `getFrameworkTimingRetentionLimit_`.
* Lines 1904-1907: `getFrameworkTimingReportSheetName_`.
* Lines 1908-1932: `getFrameworkTimingSectionRegistry_`.
* Lines 1933-1945: `findFrameworkTimingSectionRow_`.
* Lines 1946-1958: `findNextFrameworkTimingSectionRow_`.
* Lines 1959-1977: `collectExistingFrameworkTimingSectionBlocks_`.
* Lines 1978-1989: `buildDefaultFrameworkTimingSectionBlock_`.
* Lines 1990-2019: `normalizeFrameworkTimingSectionBlock_`.
* Lines 2020-2061: `rebuildFrameworkTimingReportShellCompact_`.
* Lines 2062-2087: `hasFrameworkTimingReportShell_`.
* Lines 2088-2106: `initializeFrameworkTimingSheet_`.
* Lines 2107-2110: `ensureFrameworkTimingReport_`.
* Lines 2111-2124: `trimSheetToColumnCount_`.
* Lines 2125-2227: `styleFrameworkTimingReport_`.
* Lines 2228-2235: `getFrameworkTimingSectionForId_`.
* Lines 2236-2280: `replaceFrameworkTimingSectionRows_`.
* Lines 2281-2298: `getFrameworkTimingBenchmarkForProcess_`.
* Lines 2299-2306: `getFrameworkTimingThresholdForSeverity_`.
* Lines 2307-2315: `ensureFrameworkTimingReportShell_`.
* Lines 2316-2322: `getFrameworkTimingDetailStartRow_`.
* Lines 2323-2346: `getFrameworkTimingDetailRows_`.
* Lines 2347-2367: `getLatestFrameworkTimingRowsByProcess_`.
* Lines 2368-2377: `getFrameworkTimingBenchmarkSeverity_`.
* Lines 2378-2386: `getFrameworkTimingModeForStep_`.
* Lines 2387-2391: `mergeFrameworkTimingModes_`.
* Lines 2392-2469: `buildFrameworkTimingProcessSummaryRows_`.
* Lines 2470-2479: `formatTimingTimestampForSummary_`.
* Lines 2480-2509: `buildFrameworkTimingIssueRows_`.
* Lines 2510-2526: `buildFrameworkTimingRecommendationRows_`.
* Lines 2527-2530: `writeFrameworkPerformanceRecommendationsSheet_`.
* Lines 2531-2570: `getPerformanceRecommendationForTimingStep_`.
* Lines 2571-2577: `worseTimingSeverity_`.
* Lines 2578-2603: `appendRuntimeTimingToFrameworkTimingReport_`.
* Lines 2604-2612: `formatSeconds_`.
* Lines 2613-2616: `refreshFrameworkTimingReport`.
* Lines 2617-2672: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2673-2750: `onOpen`.
* Lines 2751-2759: `isFrameworkTimingEnabled_`.
* Lines 2760-2767: `toggleFrameworkTiming`.
* Lines 2768-2771: `hideTemplates_`.
* Lines 2772-2775: `showTemplates_`.
* Lines 2776-2779: `hideSystemSheets_`.
* Lines 2780-2783: `showSystemSheets_`.
* Lines 2784-2787: `formatDashboard`.
* Lines 2788-2829: `saveActiveLayoutToDashboardSettings`.
* Lines 2830-2842: `saveFormatDashboardConfigChanges_`.
* Lines 2843-2861: `resolveSheetDefinitionForLayoutSnapshot_`.
* Lines 2862-2914: `captureActiveSheetLayoutSnapshot_`.
* Lines 2915-2922: `getHiddenColumnFlags_`.
* Lines 2923-2927: `isDateNumberFormat_`.
* Lines 2928-2940: `getDefaultLayoutSnapshotBorderConfig_`.
* Lines 2941-2964: `upsertDashboardSheetDefinitionBaseColor_`.
* Lines 2965-3001: `upsertDashboardColumnDefinitionRows_`.
* Lines 3002-3029: `getDashboardSectionBounds_`.
* Lines 3030-3045: `ensureDashboardSectionDataCapacity_`.
* Lines 3046-3086: `writeDashboardLayoutSnapshotSection_`.
* Lines 3087-3100: `applyLayoutSnapshotBorder_`.
* Lines 3101-3206: `clearDiagnosticsAndTimingLogs`.
* Lines 3207-3211: `clearDashboardConfigCache_`.
* Lines 3212-3228: `getDashboardConfigCacheKey_`.
* Lines 3229-3240: `getFormatDashboardSectionNames_`.
* Lines 3241-3254: `getRequiredFrameworkSheetTypes_`.
* Lines 3255-3319: `getDefaultGlobalSettingsRows_`.
* Lines 3320-3328: `getDefaultTitleRowRows_`.
* Lines 3329-3341: `getDefaultSheetDefinitionRows_`.
* Lines 3342-3356: `getDefaultSheetDefinitionRowsWithColumnCounts_`.
* Lines 3357-3369: `getDefaultBehaviorRows_`.
* Lines 3370-3379: `getDefaultSystemSurfaceRows_`.
* Lines 3380-3394: `getDefaultSheetHeaderRows_`.
* Lines 3395-3731: `getDefaultHeaderSets_`.
* Lines 3732-3771: `createOrRefreshAllReportTemplates`.
* Lines 3772-3810: `ensureGoldenMasterTemplate_`.
* Lines 3811-3821: `summarizeTemplateRefreshModes_`.
* Lines 3822-3828: `hideReportTemplates`.
* Lines 3829-3835: `showReportTemplates`.
* Lines 3836-3868: `setReportTemplateVisibility_`.
* Lines 3869-3876: `validateReportTemplates`.
* Lines 3877-3886: `validateReportTemplatesCore_`.
* Lines 3887-3931: `loadDashboardConfig_`.
* Lines 3932-3953: `buildDashboardSectionIndex_`.
* Lines 3954-3998: `loadGlobalSettings_`.
* Lines 3999-4033: `loadTitleRows_`.
* Lines 4034-4059: `parseTitleRowConfigRow_`.
* Lines 4060-4065: `normalizeTitleTargetCell_`.
* Lines 4066-4073: `getTitleRowConfigForSheet_`.
* Lines 4074-4081: `getThemeFillForTitleRow_`.
* Lines 4082-4088: `toWrapStrategy_`.
* Lines 4089-4116: `loadSheetDefinitions_`.
* Lines 4117-4150: `loadSheetHeaders_`.
* Lines 4151-4177: `loadColumnDefinitions_`.
* Lines 4178-4201: `loadSheetBehaviors_`.
* Lines 4202-4209: `normalizeDashboardSectionTitle_`.
* Lines 4210-4254: `readDashboardSectionRows_`.
* Lines 4255-4260: `getBehaviorForSheetType_`.
* Lines 4261-4332: `createOrRefreshTemplateFromDashboard_`.
* Lines 4333-4339: `shouldUseStagedTemplateBuild_`.
* Lines 4340-4350: `shouldRefreshTemplateMetadataOnly_`.
* Lines 4351-4368: `buildTemplateRefreshDecisionMessage_`.
* Lines 4369-4381: `refreshTemplateMetadataOnly_`.
* Lines 4382-4410: `buildTemplateFromDashboardSafely_`.
* Lines 4411-4414: `getTemplateBuildSheetName_`.
* Lines 4415-4426: `promoteStagedTemplateBuild_`.
* Lines 4427-4444: `validateBuiltTemplateMinimumStructure_`.
* Lines 4445-4494: `buildTemplateFromDashboard_`.
* Lines 4495-4499: `shouldSkipTemplateResize_`.
* Lines 4500-4508: `ensureSheetMinimumColumns_`.
* Lines 4509-4533: `clearTemplateForFullBuild_`.
* Lines 4534-4539: `applyTemplateRowHeights_`.
* Lines 4540-4543: `applyFinalRowHeightLockForSheetType_`.
* Lines 4544-4571: `lockFinalOutputRowHeights_`.
* Lines 4572-4582: `applyGlobalDefaultRowHeightsToSheet_`.
* Lines 4583-4618: `safeSetRowHeights_`.
* Lines 4619-4625: `applyRowHeightRuns_`.
* Lines 4626-4640: `hideTemplateIfNeeded_`.
* Lines 4641-4664: `resolveTemplateRowCount_`.
* Lines 4665-4713: `applyTemplateBaseFormatting_`.
* Lines 4714-4726: `ensureTitleRowConfig_`.
* Lines 4727-4779: `applyTitleRows_`.
* Lines 4780-4790: `rowColToA1_`.
* Lines 4791-4831: `applyHeaderRow_`.
* Lines 4832-4842: `applyColumnWidths_`.
* Lines 4843-4878: `applyColumnWidthsInRuns_`.
* Lines 4879-4882: `applyDateAndNumberFormats_`.
* Lines 4883-4887: `enforceTemplateDateAndNumberFormats_`.
* Lines 4888-4944: `enforceDateAndNumberFormatsForHeaders_`.
* Lines 4945-4951: `getExpectedNumberFormat_`.
* Lines 4952-4970: `getGoogleSheetsNumberFormat_`.
* Lines 4971-4975: `isDateFormatText_`.
* Lines 4976-4985: `applyHiddenColumnSettings_`.
* Lines 4986-5021: `applyHiddenColumnSettingsInRuns_`.
* Lines 5022-5047: `applyDataRows_`.
* Lines 5048-5074: `applyAlternatingColorRules_`.
* Lines 5075-5104: `applyMonthlyChangeSpacerRow3Format_`.
* Lines 5105-5150: `formatMonthlyChangeSubsectionBlock_`.
* Lines 5151-5168: `writeTemplateMetadata_`.
* Lines 5169-5201: `buildTemplateFormatSignature_`.
* Lines 5202-5215: `compactTemplateFormatSignature_`.
* Lines 5216-5224: `normalizeTemplateFormatSignature_`.
* Lines 5225-5230: `getTemplateFormatSignatureKey_`.
* Lines 5231-5239: `getStoredTemplateFormatSignature_`.
* Lines 5240-5259: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5260-5267: `storeTemplateFormatSignature_`.
* Lines 5268-5316: `ensureTemplateFilter_`.
* Lines 5317-5354: `applyTemplateFreezeAndTabColor_`.
* Lines 5355-5379: `resizeSheet_`.
* Lines 5380-5412: `resizeSheetGrid_`.
* Lines 5413-5417: `resizeSheetRows_`.
* Lines 5418-5421: `resizeSheetColumns_`.
* Lines 5422-5429: `getHeadersForSheetType_`.
* Lines 5430-5439: `getDefaultBehavior_`.
* Lines 5440-5451: `showSheetIfNeeded_`.
* Lines 5452-5465: `hideSheetIfNeeded_`.
* Lines 5466-5504: `formatMonthlySheets`.
* Lines 5505-5513: `buildPromptedMonthContext_`.
* Lines 5514-5535: `formatMonthlyBannerSheet_`.
* Lines 5536-5569: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5570-5597: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5598-5665: `formatBannerReport`.
* Lines 5666-5687: `validateActiveBannerFormatterOutput`.
* Lines 5688-5705: `archiveActiveRawDataSheet`.
* Lines 5706-5738: `parseReportMonthInput_`.
* Lines 5739-5782: `promptForLockedYearReportMonth_`.
* Lines 5783-5786: `boolText_`.
* Lines 5787-5791: `isPrimaryPMRRowValue_`.
* Lines 5792-5819: `assignPrimaryPMRRows_`.
* Lines 5820-5831: `getCurrentBannersSheet_`.
* Lines 5832-5840: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5841-5852: `getCurrentCarePlanDueSheet_`.
* Lines 5853-5858: `getPreviousMasterListSheet_`.
* Lines 5859-5864: `getCurrentMasterListSheet_`.
* Lines 5865-5907: `applyStandardFormatting_`.
* Lines 5908-5917: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5918-5926: `forceStandardTitleCellAlignment_`.
* Lines 5927-5935: `captureHiddenSheetNames_`.
* Lines 5936-5952: `restorePreviouslyHiddenSheets_`.
* Lines 5953-5960: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5961-5964: `hidePreviousMonthSheets_`.
* Lines 5965-5979: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5980-6000: `applyIndexSheetRowFills_`.
* Lines 6001-6023: `applyCurrentVsOlderTabColors_`.
* Lines 6024-6027: `organizeSheetTabs_`.
* Lines 6028-6046: `formatDateColumnsByHeader_`.
* Lines 6047-6056: `rowObjectFromHeaders_`.
* Lines 6057-6060: `getLiveDashboardAuditStatus_`.
* Lines 6061-6064: `getLiveTemplateValidationStatus_`.
* Lines 6065-6068: `getLiveFrameworkHealthStatus_`.
* Lines 6069-6074: `getLiveSheetStatus_`.
* Lines 6075-6080: `setMonthlySheetNameFast_`.
* Lines 6081-6236: `writePMRContactsToParticipantRows_`.
* Lines 6237-6245: `buildParticipantContactKey_`.
* Lines 6246-6252: `isExpiredContactPhoneDate_`.
* Lines 6253-6259: `capitalizeContactPart_`.
* Lines 6260-6275: `formatRankedContact_`.
* Lines 6276-6287: `getMostRecentDateFromRowsByHeader_`.
* Lines 6288-6298: `isDateInStrictLocalRangeInclusive_`.
* Lines 6299-6302: `isDateDisplayInReportWindow_`.
* Lines 6303-6312: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6313-6326: `getSheetTypeForOrganization_`.
* Lines 6327-6338: `collectFrameworkHealthCheckRows_`.
* Lines 6339-6346: `collectWorkflowSyncVerificationRows_`.
* Lines 6347-6362: `runFrameworkSmokeValidation`.
* Lines 6363-6405: `collectFrameworkSmokeValidationRows_`.
* Lines 6406-6409: `appendFrameworkSmokeValidationRow_`.
* Lines 6410-6416: `functionSourceContainsAll_`.
* Lines 6417-6425: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6426-6436: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6437-6447: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6448-6489: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6490-6507: `ensureStandardTitleRows_`.
* Lines 6508-6516: `isDateLikeHeader_`.
* Lines 6517-6520: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6521-6527: `formatReportDateLabel_`.
* Lines 6528-6532: `buildBannerReportOutputName_`.
* Lines 6533-6546: `renameSheetSafely_`.
* Lines 6547-6570: `deleteSheetIfExists_`.
* Lines 6571-6579: `writeBannerReportDates_`.
* Lines 6580-6630: `copyRawBannerDataToOutput_`.
* Lines 6631-6637: `ensureSheetHasAtLeastRows_`.
* Lines 6638-6665: `validateBannerFormatterOutput_`.
* Lines 6666-6689: `archiveRawSourceAndDeleteLocal_`.
* Lines 6690-6712: `archiveRawDataSheet_`.
* Lines 6713-6724: `hideMonthlyImportSheets`.
* Lines 6725-6735: `hideMonthlyActiveSheets`.
* Lines 6736-6760: `hideMonthlySheetsBySpecs_`.
* Lines 6761-6777: `archiveMonthlyImportSheets`.
* Lines 6778-6794: `archiveMonthlyActiveSheets`.
* Lines 6795-6833: `archiveMonthlySheetsBySpecs_`.
* Lines 6834-6857: `findArchiveMonthlyCandidateSheets_`.
* Lines 6858-6882: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6883-6891: `notifyArchiveMonthlySheetsResult_`.
* Lines 6892-6908: `deleteArchiveSheetIfExists_`.
* Lines 6909-6912: `formatMonthlyChangeSubheaderRow`.
* Lines 6913-6924: `formatMonthlyChangeSubsectionBlock`.
* Lines 6925-6929: `getMonthlyChangeSubsectionLabels`.
* Lines 6930-6949: `normalizeNumberFormatForCompare_`.
* Lines 6950-6955: `numberFormatsMatch_`.
* Lines 6956-7101: `validateTemplateFromDashboard_`.
* Lines 7102-7107: `writeTemplateValidationReport_`.
* Lines 7108-7194: `formatRawData`.
* Lines 7195-7212: `ensureRawDataHeaderRows_`.
* Lines 7213-7222: `rowLooksLikeParticipantHeader_`.
* Lines 7223-7229: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7230-7273: `enforceDemoPStrictDashboardSchema_`.
* Lines 7274-7285: `buildRawDataSourceArchiveName_`.
* Lines 7286-7297: `mapRowsToHeaders_`.
* Lines 7298-7315: `applyUniversalFastCanvasFormatting_`.
* Lines 7316-7347: `applyGovernedTextAndNumberFormats_`.
* Lines 7348-7359: `applyOutputVisibilityPolicy_`.
* Lines 7360-7433: `createOutputSheetFromDashboardTemplate_`.
* Lines 7434-7511: `createRawDataOutputSheetFromTemplateFast_`.
* Lines 7512-7544: `ensureOutputSheetHasFormattedRows_`.
* Lines 7545-7626: `syncRawDataBannerColumns_`.
* Lines 7627-7668: `buildSourceMapByCompositeKeyForDemoPBanner_`.
* Lines 7669-7677: `formatCarePlanDueReport`.
* Lines 7678-7686: `formatUnlockedCarePlanReport`.
* Lines 7687-7781: `formatCarePlanDueOrUnlockedFromDashboard_`.
* Lines 7782-7808: `buildRawArchiveNameForSheetType_`.
* Lines 7809-7835: `collectAndClearMovedTitleInfoCells_`.
* Lines 7836-7842: `prepareCarePlanSourceSheetForDashboardFormat_`.
* Lines 7843-7856: `prepareRawDataSourceSheetForDashboardFormat_`.
* Lines 7857-7867: `buildRawDataHeadersForFormatting_`.
* Lines 7868-7873: `getRawDataApprovedAddedColumns_`.
* Lines 7874-7897: `processRawDataApprovedSyncColumns_`.
* Lines 7898-7939: `writeChangedColumnsOnly_`.
* Lines 7940-7998: `getRawDataDemoPSourceHeaders_`.
* Lines 7999-8049: `getRawDataDisallowedWorkingColumns_`.
* Lines 8050-8057: `isOngoingOutputSheetType_`.
* Lines 8058-8092: `buildDashboardOutputSheetName_`.
* Lines 8093-8098: `syncMasterListMonthlySourcesIntoData_`.
* Lines 8099-8127: `syncBannerSourceIntoData_`.
* Lines 8128-8162: `syncUnlockedCarePlanSourceIntoData_`.
* Lines 8163-8196: `syncCarePlanDueSourceIntoData_`.
* Lines 8197-8236: `syncRowsFromSourceMapData_`.
* Lines 8237-8274: `buildSourceMapBySingleKeyForPart5_`.
* Lines 8275-8316: `buildSourceMapByCompositeKeyForPart5_`.
* Lines 8317-8341: `shouldProcessRowByPMR_`.
* Lines 8342-8349: `normalizeSyncFieldPairs_`.
* Lines 8350-8379: `syncMasterListFromBanners_`.
* Lines 8380-8415: `syncMasterListFromUnlockedCarePlan_`.
* Lines 8416-8449: `syncMasterListFromCarePlanDue_`.
* Lines 8450-8612: `syncRowsFromSourceMap_`.
* Lines 8613-8630: `getDefaultDemoPMetadataHeaderRows_v155_`.
* Lines 8631-8655: `buildDemoPFromScratch`.
* Lines 8656-8695: `updateDemoPMonthlySync`.
* Lines 8696-8714: `enforceDemoPPostFlattenFormatting_`.
* Lines 8715-8736: `sortSheetAlphabeticallyByParticipantName_`.
* Lines 8737-8792: `getDemoPMonthlySyncChangedPMRs_`.
* Lines 8793-8828: `processDemoPDataWithFillBlankMask_`.
* Lines 8829-8850: `buildDemoPFreshRowsForPMRs_`.
* Lines 8851-8861: `processDemoPFreshRowsInMemory_`.
* Lines 8862-8922: `flattenDemoPContactsToPrimaryRows_`.
* Lines 8923-8941: `buildDemoPContactSummaryForFlatRecord_`.
* Lines 8942-8955: `sortDemoPFlatRows_`.
* Lines 8956-9035: `processDemoP`.
* Lines 9036-9083: `processDemoPAsWorkingSource_`.
* Lines 9084-9113: `markPrimaryPMRRowsForSequentialData_`.
* Lines 9114-9134: `assignPrimaryPMRRowsInData_`.
* Lines 9135-9138: `formatDemoPStructure`.
* Lines 9139-9142: `buildRawDataSheetName_`.
* Lines 9143-9217: `getOrCreateDemoPProcessingSheet_`.
* Lines 9218-9231: `deleteSheetIfExistsForDemoPProcess_`.
* Lines 9232-9239: `getLastRawDataDisenrolledBuildResult_`.
* Lines 9240-9246: `setLastRawDataDisenrolledBuildResult_`.
* Lines 9247-9306: `updateExistingDemoPFromRawData_`.
* Lines 9307-9414: `createActiveDemoPFromRawData_`.
* Lines 9415-9432: `populateDemoPUpdateColumns_`.
* Lines 9433-9475: `populateUniversalMetadataColumns_`.
* Lines 9476-9493: `buildSourceHashByPMR_`.
* Lines 9494-9516: `buildSourceHashForRows_`.
* Lines 9517-9520: `buildSourceHashForRow_`.
* Lines 9521-9536: `buildColumnsUpdatedText_`.
* Lines 9537-9544: `normalizeHashValue_`.
* Lines 9545-9552: `computeStableHash_`.
* Lines 9553-9561: `verifyPrimaryPMRColumnFromRawData_`.
* Lines 9562-9569: `createOrRefreshDemoPTemplate_`.
* Lines 9570-9576: `getOrCreateDemoPTemplate_`.
* Lines 9577-9592: `initializeDemoPTemplateTitleRows_`.
* Lines 9593-9614: `applyDemoPTemplateFormatting_`.
* Lines 9615-9650: `applyDemoPTemplateToSheet_`.
* Lines 9651-9704: `applyDemoPDateFormattingByHeader_`.
* Lines 9705-9722: `buildMonthlyChangeReport`.
* Lines 9723-9832: `buildMonthlyChangeReportForMonth_`.
* Lines 9833-9889: `getOrBuildMonthlyChangeReport_`.
* Lines 9890-10082: `compareRawDemoPForSectionReport_`.
* Lines 10083-10088: `rowsWithDOBOnlyForSection_`.
* Lines 10089-10104: `getChangedColumnsForSectionRows_`.
* Lines 10105-10117: `buildColumnSignaturesForSection_`.
* Lines 10118-10280: `compareRawDemoPForChanges_`.
* Lines 10281-10348: `getRawDemoPDataForCompare_`.
* Lines 10349-10397: `compareSingleFieldAndAdd_`.
* Lines 10398-10440: `addMCRRow_`.
* Lines 10441-10459: `buildContactCompareMap_`.
* Lines 10460-10465: `getFieldValueFromRow_`.
* Lines 10466-10482: `buildParticipantName_`.
* Lines 10483-10490: `displayValueForReport_`.
* Lines 10491-10514: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10515-10520: `padRowToWidth_`.
* Lines 10521-10530: `stripMonthlyChangeNativeBandings_`.
* Lines 10531-10577: `getMonthlyChangeSectionSpecs_`.
* Lines 10578-10624: `buildMonthlyChangeSectionRows_`.
* Lines 10625-10632: `appendMonthlyChangeCompiledRow_`.
* Lines 10633-10662: `appendMonthlyChangeSectionBlock_`.
* Lines 10663-10715: `populateMonthlyChangeReportSections_`.
* Lines 10716-10731: `findMonthlyChangeSectionTitleRow_`.
* Lines 10732-10752: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10753-10846: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10847-10886: `writeDiagnosticReport_`.
* Lines 10887-10913: `runMonthlyUpdate`.
* Lines 10914-10919: `updateMasterList`.
* Lines 10920-11013: `updateMasterListForMonth_`.
* Lines 11014-11086: `createMasterList`.
* Lines 11087-11153: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11154-11160: `getMasterListTemplateHeaders_`.
* Lines 11161-11168: `createOrRefreshMasterListTemplate_`.
* Lines 11169-11175: `getOrCreateMasterListTemplate_`.
* Lines 11176-11232: `createMasterListSheetFromTemplate_`.
* Lines 11233-11239: `writeMasterListTitleDateBlock_`.
* Lines 11240-11248: `initializeMasterListTitleRows_`.
* Lines 11249-11266: `copyDemoPHeaderRowsToMasterList_`.
* Lines 11267-11292: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11293-11300: `formatMasterListSheet_`.
* Lines 11301-11312: `getMonthPartsFromTitleRows_`.
* Lines 11313-11320: `updateCopiedMasterListHeader_`.
* Lines 11321-11475: `createIndexSheet`.
* Lines 11476-11479: `generateArchiveFileIndex_`.
* Lines 11480-11496: `setupIndexRefreshOnSheetAddedTrigger_`.
* Lines 11497-11510: `handleSpreadsheetChangeForIndex`.
* Lines 11511-11593: `enforceGlobalSheetSortOrder_`.
* Lines 11594-11612: `extractFirstDateFromSheetName_`.
* Lines 11613-11636: `parseIndexMonthDate_`.
* Lines 11637-11683: `organizeWorkbookTabs_`.
* Lines 11684-11701: `hideSystemAndTestingSheets_`.
* Lines 11702-11717: `getSystemAndTestingSheetNames_`.
* Lines 11718-11736: `isSystemOrTestingSheet_`.
* Lines 11737-11743: `assignSortOrderAndHideExtraRows`.
* Lines 11744-11749: `applySortOrderDisplayForMasterList_`.
* Lines 11750-11776: `buildParticipantBlocksForSortOrder_`.
* Lines 11777-11784: `showAllMasterListRows`.
* Lines 11785-11789: `groupMasterListRowsByPMR_`.
* Lines 11790-11793: `hideRowsWithBlankDOB_`.
* Lines 11794-11853: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11854-11872: `getPrimaryRowScore_`.
* Lines 11873-11897: `hideNonPrimaryPMRRows_`.
* Lines 11898-11915: `hideRowNumberBatches_`.
* Lines 11916-11927: `clearAllRowGroupsIfPossible_`.
* Lines 11928-11934: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11935-11940: `applyFinalMasterListColorAndDisplay_`.
* Lines 11941-11944: `applyMasterListDisplaySettings_`.
* Lines 11945-11952: `processMasterListFull_`.
* Lines 11953-11956: `processMasterListDataOnly_`.
* Lines 11957-11991: `processMasterListSingleDataPass_`.
* Lines 11992-12010: `populateParticipantNameData_`.
* Lines 12011-12027: `populateDemoPNameData_`.
* Lines 12028-12052: `updateBannerColumnData_`.
* Lines 12053-12066: `combineAddressesData_`.
* Lines 12067-12088: `handleLanguageData_`.
* Lines 12089-12115: `splitPhoneNumbersData_`.
* Lines 12116-12120: `runMasterContactProcessData_`.
* Lines 12121-12147: `combineNotesSummaryData_`.
* Lines 12148-12157: `rebuildChangedPMRsFromDemoP_`.
* Lines 12158-12183: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12184-12210: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12211-12240: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12241-12251: `getPMRsForMonthlyChangeSections_`.
* Lines 12252-12266: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12267-12314: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12315-12386: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12387-12396: `buildMappedMasterRowFromDemoRow_`.
* Lines 12397-12406: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12407-12414: `hideSystemSheetsNow`.
* Lines 12415-12447: `showSystemSheetsNow`.
* Lines 12448-12466: `getPrimaryMergeRowItem_`.
* Lines 12467-12536: `getPrimaryRowChangedColumnDetails_`.
* Lines 12537-12546: `formatMergeAuditValueForDisplay_`.
* Lines 12547-12552: `getMergeAuditParticipantName_`.
* Lines 12553-12573: `getMergeAuditParticipantNameFromRows_`.
* Lines 12574-12597: `buildMergeAuditContactSummary_`.
* Lines 12598-12630: `getMergeAuditChangedFields_`.
* Lines 12631-12654: `buildMergeRowsByPMRFromData_`.
* Lines 12655-12684: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12685-12714: `buildMergeKeyMapForRows_`.
* Lines 12715-12738: `buildContactMergeRowKey_`.
* Lines 12739-12753: `getMergeRowValue_`.
* Lines 12754-12784: `createDisenrolledList`.
* Lines 12785-12805: `processBlankContactSummariesOnDemoP_`.
* Lines 12806-12857: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12858-12875: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12876-12893: `loadDisenrolledPMRSetForMonth_`.
* Lines 12894-12898: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12899-12987: `moveDisenrolledPMRsFromDemoPToExclusion_`.
* Lines 12988-13055: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 13056-13067: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 13068-13109: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13110-13129: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13130-13169: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13170-13282: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13283-13287: `getCurrentRawDataSheet_`.
* Lines 13288-13292: `getPreviousRawDataSheet_`.
* Lines 13293-13300: `getCurrentDemoPSheet_`.
* Lines 13301-13306: `getPreviousDemoPSheet_`.
* Lines 13307-13318: `getMonthlyChangeReportHeaders_`.
* Lines 13319-13324: `getMonthlyChangeReportDateIndexes_`.
* Lines 13325-13354: `convertMonthlyChangeReportDateValues_`.
* Lines 13355-13375: `buildMonthlyChangeReportRow_`.
* Lines 13376-13395: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13396-13402: `runDashboardQualityStartUp`.
* Lines 13403-13456: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13457-13466: `getDashboardVerificationPassRow_`.
* Lines 13467-13471: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13472-13477: `getDashboardSectionHeaderWidth_`.
* Lines 13478-13487: `collectBlankDashboardCells_`.
* Lines 13488-13519: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13520-13556: `collectFormatDashboardTitleRowsVerificationRows_`.
* Lines 13557-13585: `collectFormatDashboardSheetDefinitionVerificationRows_`.
* Lines 13586-13622: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13623-13652: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13653-13681: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13682-13691: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13692-13696: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13697-13704: `runDashboardQualitySectionIfDue_`.
* Lines 13705-13708: `runDashboardQualityQuick`.
* Lines 13709-13716: `runDashboardQualityValidateTemplates`.
* Lines 13717-13748: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13749-13760: `getDashboardQualitySectionRegistry_`.
* Lines 13761-13810: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13811-13817: `runDashboardQualityPerformanceSummary_`.
* Lines 13818-13838: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13839-13891: `runDashboardQualityFull`.
* Lines 13892-13900: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13901-13973: `repairAllTemplateDateFormats`.
* Lines 13974-13979: `normalizeSectionRowForWidth_`.
* Lines 13980-13985: `rowHasAnyValue_`.
* Lines 13986-13991: `trimTrailingBlankRows_`.
* Lines 13992-14013: `getDefaultDashboardQualityDetailHeader_`.
* Lines 14014-14031: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 14032-14039: `getDashboardQualityNotRunMessage_`.
* Lines 14040-14055: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 14056-14095: `normalizeDashboardQualitySectionBlock_`.
* Lines 14096-14138: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14139-14146: `getDashboardQualitySectionTitleForKey_`.
* Lines 14147-14154: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14155-14171: `hasDashboardQualityTemplateShell_`.
* Lines 14172-14190: `initializeDashboardQualitySheet_`.
* Lines 14191-14208: `initializeSystemSheets_`.
* Lines 14209-14212: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14213-14216: `ensureDashboardQualityReportSheet_`.
* Lines 14217-14225: `ensureDashboardQualityTemplateShell_`.
* Lines 14226-14230: `ensureDashboardQualitySectionShells_`.
* Lines 14231-14236: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14237-14284: `applyDashboardQualityReportColumnSettings_`.
* Lines 14285-14295: `styleDashboardQualityReport_`.
* Lines 14296-14299: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14300-14304: `isDashboardQualityNotesLabel_`.
* Lines 14305-14335: `normalizeDashboardQualityOutputRow_`.
* Lines 14336-14340: `getDashboardQualitySectionLetter_`.
* Lines 14341-14346: `normalizeDashboardQualityIssueValue_`.
* Lines 14347-14379: `normalizeDashboardQualityRowsForSection_`.
* Lines 14380-14387: `normalizeDashboardQualityDataRows_`.
* Lines 14388-14410: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14411-14429: `getStatusFromDashboardQualityRows_`.
* Lines 14430-14451: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14452-14471: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14472-14479: `dashboardQualityRowsEqualValues_`.
* Lines 14480-14509: `saveDashboardQualitySectionRows_`.
* Lines 14510-14521: `getDashboardQualitySectionRows_`.
* Lines 14522-14532: `deleteLegacyQualityReportSheet_`.
* Lines 14533-14539: `deleteLegacyStandaloneQualityReports_`.
* Lines 14540-14547: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14548-14560: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14561-14569: `getStoredDashboardQualityOverallStatus_`.
* Lines 14570-14581: `getStoredDashboardQualityFailureNotes_`.
* Lines 14582-14587: `buildDatedDisenrolledOutputName_`.
* Lines 14588-14598: `forceSheetRowCount_`.
* Lines 14599-14632: `buildCombinedFrameworkTestDashboard`.
* Lines 14633-14638: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14639-14650: `updateDashboardQualitySignoffSection_`.
* Lines 14651-14661: `updateDashboardQualitySummarySection_`.
* Lines 14662-14665: `updateDashboardQualityTimingSummarySection_`.
* Lines 14666-14694: `getDashboardQualitySectionBoundsMap_`.
* Lines 14695-14755: `replaceDashboardQualitySectionsRows_`.
* Lines 14756-14772: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14773-14846: `replaceDashboardQualitySectionRows_`.
* Lines 14847-14861: `findDashboardQualitySectionRow_`.
* Lines 14862-14872: `findNextDashboardQualitySectionRow_`.
* Lines 14873-14892: `dashboardQualitySectionContentMatches_`.
* Lines 14893-14910: `mergeDashboardQualityStyleRanges_`.
* Lines 14911-15000: `styleDashboardQualityUpdatedSections_`.
* Lines 15001-15020: `appendCombinedDashboardSignOffRows_`.
* Lines 15021-15051: `buildFrameworkSummaryRows_`.
* Lines 15052-15071: `getStoredSectionStatusAndNotes_`.
* Lines 15072-15087: `getReportOverallStatus_`.
* Lines 15088-15107: `getReportFailureNotes_`.
* Lines 15108-15134: `runFrameworkHealthCheck`.
* Lines 15135-15140: `getFrameworkHealthCheckIssueRows_`.
* Lines 15141-15152: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15153-15159: `appendRequiredFunctionChecks_`.
* Lines 15160-15167: `existsFunctionByName_`.
* Lines 15168-15172: `writeFrameworkHealthCheckReport_`.
* Lines 15173-15184: `normalizeFrameworkHealthCheckRows_`.
* Lines 15185-15200: `getRequiredHelperFunctionNames_`.
* Lines 15201-15242: `getRequiredMenuFunctionNames_`.
* Lines 15243-15252: `getRequiredDashboardFunctionNames_`.
* Lines 15253-15261: `getRequiredTemplateFunctionNames_`.
* Lines 15262-15269: `getRequiredValidationFunctionNames_`.
* Lines 15270-15278: `getRequiredTimingFunctionNames_`.
* Lines 15279-15291: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15292-15295: `runWorkflowSyncVerification`.
* Lines 15296-15303: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15304-15310: `setupSystemSheets`.
* Lines 15311-15366: `verifyFrameworkConfiguration`.
* Lines 15367-15386: `runFrameworkTimed_`.
* Lines 15387-15397: `startFrameworkTiming_`.
* Lines 15398-15422: `markFrameworkStep_`.
* Lines 15423-15428: `writeFrameworkTimingReport_`.
* Lines 15429-15432: `writeTimingReport_`.
* Lines 15433-15449: `trimTimingReportRows_`.
* Lines 15450-15529: `rebuildProductionMonthlyChangeTemplate`.
>>>>>>> origin/main
