# AUDIT v1.6.26.3 Exhaustive Static Analysis Report

Source audited: `Current_Production Script/v.1.6.26_Production_Script`. Current declared script version: `1.6.26.3`. Current source size: 15,489 lines, 671 named `function` declarations.

## Methodology and Scope

* Parsed the full monolithic Apps Script source with Node syntax checking after copying it to `/tmp/v1626.js`.
* Ran static counts for named functions, catches, Logger calls, Spreadsheet API calls, A1-notation construction, phantom-row patterns, retired Test 6 references, Monthly Change menu exposure, and metadata shell remnants.
* Reviewed the file using a function-by-function line inventory, which is the maintainable line-by-line map for a 15k+ line monolith.
* This report is read-only and does not rewrite the production script. It records current state after the v1.6.26.3 patch set, including the recently restored Monthly Change Report menu item.

## Static Metrics

* **Total source lines:** 15,489
* **Named function declarations:** 671
* **`catch (` occurrences:** 138
* **`Logger.log(` occurrences:** 104
* **`getRange(` occurrences:** 314
* **`setValues(` occurrences:** 60
* **`getValues(` occurrences:** 50
* **`getA1Notation(` occurrences:** 4
* **`TODO` markers:** 0
* **`FIXME` markers:** 0

## Executive Summary

The script is syntactically valid and the v1.6.26.3 architectural changes are present. The highest-priority positive findings are: the script version is now 1.6.26.3; Excel serial-date conversion is centralized through named constants; compact template signatures use the MD5-backed `computeStableHash_`; `processDemoPDataWithFillBlankMask_` filters changed PMRs before cloning rows; the Monthly Change Report menu item is exposed under Data & Processing Engine; hidden-column bulk failures and output style paint failures are fail-fast; and Test 6 execution artifacts are absent.

The remaining static risks are not immediate parser failures. They are maintainability/performance risks: 104 Logger-based best-effort catches remain, four loop-time `getA1Notation()` constructions remain outside the header-font fix, the retired Master List Change Log still has constants and a suppressing stub, `RFF_REPAIR_DATE_FORMATS_DURING_SECTION_G` remains as an orphaned configuration flag after Test 6 removal, and the legacy single-column `buildColumnSignatureForSection_` helper remains defined despite the newer bulk signature path.

## Findings

### PASS: Version and menu exposure

The script declares `MASTER_LIST_MERGE_ML_VERSION = "1.6.26.3"`. The Data & Processing Engine callback registry and menu both include `buildMonthlyChangeReport`, restoring the Monthly Change Report launch path.

**Evidence:** Lines 1-32, 2633-2641, and 2685-2690.

### PASS: Serial date constants and deterministic conversion

`RFF_MIN_SERIAL_DATE` and Excel epoch constants sit near `DATA_START_ROW`. `coerceToValidDate_` uses the minimum serial constant, and `spreadsheetSerialDateToLocalDate_` uses the epoch constants and clears milliseconds after fractional-day conversion.

**Evidence:** Lines 97-107 and 854-922.

### PASS: Template signature compaction uses stable MD5 hash

`compactTemplateFormatSignature_` uses `computeStableHash_(text)` instead of the old 32-bit bitwise hash.

**Evidence:** Lines 5215-5226 and 9489-9495.

### PASS: Demo P fill-blank mask avoids whole-array clone before filtering

`processDemoPDataWithFillBlankMask_` builds `keptRows` first, clones only kept rows, temporarily processes only kept rows, restores `data.values`, and returns the kept rows.

**Evidence:** Lines 8735-8769.

### PASS: Critical bulk/menu fixes remain in place

Hidden-column runs throw on bulk failure. Output and Raw Data batch paint catches throw. Monthly Change is exposed in the Data & Processing menu.

**Evidence:** Lines 4996-5030, 7305-7360, 7379-7449, and 2685-2690.

### PASS: Retired Test 6 execution artifacts remain absent

Targeted scan found no `RFF_TEST6`, `runFrameworkTest6DateFormatting`, `collectUniqueDateFormatsForCheck_`, `repairDateFormatForSectionG_`, or `writeFrameworkTest6DateFormatReport_` references.

**Evidence:** Verified by targeted `rg` scan.

### PASS: Metadata shell functions remain absent

Targeted scan found no `applyMasterListUpdateMetadataToRow_` or `fillMasterListMetadataColumns_` declarations/invocations.

**Evidence:** Verified by targeted `rg` scan.

### MEDIUM: Best-effort Logger catches remain widespread

There are still 104 `Logger.log(` calls. Many are benign, but governance-sensitive paths such as template signatures, filter creation/removal, title info writes, Dashboard Quality writes, and row/freeze/tab styling should be explicitly classified as cosmetic vs hard-fail.

**Evidence:** Representative lines include 5175-5328, 5575, 7703, 14080-14242, and 14453-14849.

### MEDIUM: Loop-time A1 notation construction remains in four locations

The header font-size path is fixed, but `getA1Notation()` still appears in dashboard section styling, Framework Timing shell styling, governed format grouping, and sort-order display helpers. These should be converted to math-generated A1 strings where possible.

**Evidence:** Lines 663-665, 2050, 7282, and 11414.

### LOW: Master List Change Log is retired but still represented by constants and a suppressing stub

The sheet type, sheet-name constant, tab-order entry, and suppressing `appendMasterListChangeLog_` stub still exist. This is intentionally suppressing legacy writes, but naming may confuse operators.

**Evidence:** Lines 120-175 and 6069-6072.

### LOW: Orphan Section G repair flag remains after Test 6 purge

`RFF_REPAIR_DATE_FORMATS_DURING_SECTION_G` is still declared, but the Test 6 repair flow it controlled has been removed. This can be deleted if no external Apps Script code reads it.

**Evidence:** Line 92.

### LOW: Legacy single-column section signature helper remains defined

`buildColumnSignatureForSection_` remains after `getChangedColumnsForSectionRows_` switched to `buildColumnSignaturesForSection_`. If no external/manual callers rely on it, remove it in the next cleanup.

**Evidence:** Lines 10033-10073.

## Architecture Section Coverage

* Lines 29-239: CONFIGURATION.
* Lines 240-2629: HELPER FUNCTIONS.
* Lines 2630-3120: MENU FUNCTIONS.
* Lines 3121-3743: FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS.
* Lines 3744-8033: TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS.
* Lines 8034-8448: SYNC FUNCTIONS.
* Lines 8449-9290: DEMO P FUNCTIONS.
* Lines 9291-9645: OPTIMIZED HYPERSPEED NAKED CANVAS DUMP FOR DEMO P.
* Lines 9646-10967: MONTHLY CHANGE FUNCTIONS.
* Lines 10968-12690: MASTER LIST FUNCTIONS.
* Lines 12691-13342: DISENROLLMENT FUNCTIONS.
* Lines 13343-15323: DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS.
* Lines 15324-15489: FRAMEWORK AND TIMING FUNCTIONS.

## Recommended Remediation Queue

1. Decide whether Master List Change Log constants/stub should stay as compatibility markers or be fully removed.
2. Remove `RFF_REPAIR_DATE_FORMATS_DURING_SECTION_G` if no external Apps Script deployment reads it.
3. Replace the remaining four `getA1Notation()` loop-time builders with pure A1 helper math.
4. Classify the 104 Logger catches into cosmetic, recoverable, and governance-critical buckets.
5. Remove `buildColumnSignatureForSection_` if the bulk signature helper is the only intended path.
6. Add runtime smoke tests for menu creation, zero-row sheets, serial dates with fractional day values, duplicate contacts, and Demo P monthly sync with large changed-PMR sets.

## Exhaustive Function Line Inventory

Every detected named function declaration is listed below with its current line range. This inventory is the line-by-line review map for targeted edits and future code review.

### Configuration, dashboard defaults, quick setup, and base utilities

* Lines 243-249: `h_`.
* Lines 250-363: `getDefaultColumnDefinitionRows_`.
* Lines 364-382: `getAllUniqueHeaders_`.
* Lines 383-482: `getColumnStandards_`.
* Lines 483-496: `c_`.
* Lines 497-510: `writeDashboardTitle_`.
* Lines 511-545: `writeDashboardSection_`.
* Lines 546-577: `styleDashboard_`.
* Lines 578-581: `setupReportFormattingDashboard`.
* Lines 582-590: `appendDashboardSectionRows_`.
* Lines 591-624: `getResolvedDefaultColumnDefinitionRows_`.
* Lines 625-699: `writeDashboardDefaultsFast_`.
* Lines 700-703: `rebuildFormatDashboardDefaults`.
* Lines 704-718: `setupReportFormattingDashboardFromScriptDefaults_`.
* Lines 719-737: `normalizeDashboardSheetTypeKey_`.
* Lines 738-744: `getSheetDefinitionByTypeOrNull_`.
* Lines 745-750: `getSheetDefinitionByType_`.
* Lines 751-764: `sortSheetDefinitionsByProductionOrder_`.
* Lines 765-772: `notify_`.
* Lines 773-784: `trimExcessRows_`.
* Lines 785-818: `hideOldDisenrolledRows_`.
* Lines 819-823: `showQuickStartToast_`.
* Lines 824-835: `quickSystemSetup`.
* Lines 836-843: `quickBuildAllTemplates`.
* Lines 844-848: `notifyErrorWithTiming_`.
* Lines 849-853: `isBlankCell_`.
* Lines 854-903: `coerceToValidDate_`.
* Lines 904-923: `spreadsheetSerialDateToLocalDate_`.
* Lines 924-928: `isReasonableReportDate_`.
* Lines 929-932: `createLocalDateOnly_`.
* Lines 933-937: `getTodayLocalDate_`.
* Lines 938-962: `getMonthDateParts_`.
* Lines 963-966: `formatDateForSheetName_`.
* Lines 967-971: `formatDateDisplay_`.
* Lines 972-976: `dateKey_`.
* Lines 977-980: `isSameDate_`.
* Lines 981-985: `isSameMonth_`.
* Lines 986-990: `buildMonthlySheetName_`.
* Lines 991-996: `buildStandardMonthlySheetName_`.
* Lines 997-1027: `getNewestFormattedMonthlySheetByPrefix_`.

### Core helpers, row/block utilities, framework timing shell, and menus prelude

* Lines 1028-1061: `getMonthlySheetByPrefixAndDate_`.
* Lines 1062-1094: `setUniqueSheetName_`.
* Lines 1095-1114: `getHeaders_`.
* Lines 1115-1129: `getHeaderMap_`.
* Lines 1130-1138: `buildHeaderIndexMap_`.
* Lines 1139-1145: `findHeaderIndex_`.
* Lines 1146-1153: `normalizeHeader_`.
* Lines 1154-1160: `normalizePMR_`.
* Lines 1161-1164: `getPMRIndex_`.
* Lines 1165-1168: `getDOBIndex_`.
* Lines 1169-1187: `normalizeKeyPart_`.
* Lines 1188-1227: `getDataValues_`.
* Lines 1228-1261: `getRawDataSourceDataForOutput_`.
* Lines 1262-1276: `rawDataSourceHeaderRow_`.
* Lines 1277-1293: `ensurePrimaryPMRRowColumn_`.
* Lines 1294-1320: `assignPrimaryRowForBlock_`.
* Lines 1321-1354: `deleteRowNumberBatches_`.
* Lines 1355-1364: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1365-1391: `ensureHeaders_`.
* Lines 1392-1395: `ensureBannerSummaryOutputHeaders_`.
* Lines 1396-1409: `ensureContactOutputHeaders_`.
* Lines 1410-1419: `trimOutputSheetToDataSize_`.
* Lines 1420-1454: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1455-1460: `applyFinalRowHeightLock_`.
* Lines 1461-1490: `normalizeCompareValue_`.
* Lines 1491-1494: `valuesAreEqual_`.
* Lines 1495-1498: `normalizeText_`.
* Lines 1499-1502: `normalizeKey_`.
* Lines 1503-1507: `numberOrDefault_`.
* Lines 1508-1517: `parseBoolean_`.
* Lines 1518-1532: `clearHeaderCacheForSheet_`.
* Lines 1533-1537: `clearSheetRuntimeCachesForSheet_`.
* Lines 1538-1544: `getHeaderCacheKey_`.
* Lines 1545-1550: `clearMonthlySheetLookupCache_`.
* Lines 1551-1557: `getMonthlySheetLookupCacheKey_`.
* Lines 1558-1561: `getSheetDimensionCacheKey_`.
* Lines 1562-1567: `clearSheetDimensionCacheForSheet_`.
* Lines 1568-1587: `getSheetDimensions_`.
* Lines 1588-1593: `dateOnlyLocalClone_`.
* Lines 1594-1598: `monthKey_`.
* Lines 1599-1618: `parseStandardMonthlySheetDateFromName_`.
* Lines 1619-1653: `buildRowsByPMR_`.
* Lines 1654-1660: `safeSheetName_`.
* Lines 1661-1664: `compareValues_`.
* Lines 1665-1668: `toBool_`.
* Lines 1669-1672: `truthy_`.
* Lines 1673-1676: `toNumber_`.
* Lines 1677-1692: `resizeSheetMinimum_`.
* Lines 1693-1703: `getThemeColorsFromBase_`.
* Lines 1704-1708: `getGlobalBorderStyle_`.
* Lines 1709-1719: `normalizeHex_`.
* Lines 1720-1726: `hexWithHslLightness_`.
* Lines 1727-1735: `hexToRgb_`.
* Lines 1736-1743: `rgbToHex_`.
* Lines 1744-1765: `rgbToHsl_`.
* Lines 1766-1788: `hslToRgb_`.
* Lines 1789-1801: `startRuntimeTiming_`.
* Lines 1802-1828: `markRuntimeStep_`.
* Lines 1829-1833: `addRuntimeCounter_`.
* Lines 1834-1838: `logRuntimeInfo_`.
* Lines 1839-1843: `logRuntimeWarning_`.
* Lines 1844-1848: `logRuntimeError_`.
* Lines 1849-1865: `logRuntimeTiming_`.
* Lines 1866-1873: `getRuntimeTimingSeverity_`.
* Lines 1874-1877: `getRuntimeTimingReportName_`.
* Lines 1878-1883: `writeRuntimeTimingReport_`.
* Lines 1884-1887: `writeConsolidatedTimingSummaryReport_`.
* Lines 1888-1905: `writeCombinedFrameworkTimingReport_`.
* Lines 1906-1909: `getFrameworkTimingRetentionLimit_`.
* Lines 1910-1913: `getFrameworkTimingReportSheetName_`.
* Lines 1914-1938: `getFrameworkTimingSectionRegistry_`.
* Lines 1939-1951: `findFrameworkTimingSectionRow_`.
* Lines 1952-1964: `findNextFrameworkTimingSectionRow_`.
* Lines 1965-1983: `collectExistingFrameworkTimingSectionBlocks_`.
* Lines 1984-1995: `buildDefaultFrameworkTimingSectionBlock_`.
* Lines 1996-2025: `normalizeFrameworkTimingSectionBlock_`.
* Lines 2026-2067: `rebuildFrameworkTimingReportShellCompact_`.
* Lines 2068-2093: `hasFrameworkTimingReportShell_`.
* Lines 2094-2112: `initializeFrameworkTimingSheet_`.
* Lines 2113-2116: `ensureFrameworkTimingReport_`.
* Lines 2117-2130: `trimSheetToColumnCount_`.
* Lines 2131-2233: `styleFrameworkTimingReport_`.
* Lines 2234-2241: `getFrameworkTimingSectionForId_`.
* Lines 2242-2286: `replaceFrameworkTimingSectionRows_`.
* Lines 2287-2304: `getFrameworkTimingBenchmarkForProcess_`.
* Lines 2305-2312: `getFrameworkTimingThresholdForSeverity_`.
* Lines 2313-2321: `ensureFrameworkTimingReportShell_`.
* Lines 2322-2328: `getFrameworkTimingDetailStartRow_`.
* Lines 2329-2352: `getFrameworkTimingDetailRows_`.
* Lines 2353-2373: `getLatestFrameworkTimingRowsByProcess_`.
* Lines 2374-2383: `getFrameworkTimingBenchmarkSeverity_`.
* Lines 2384-2392: `getFrameworkTimingModeForStep_`.
* Lines 2393-2397: `mergeFrameworkTimingModes_`.
* Lines 2398-2475: `buildFrameworkTimingProcessSummaryRows_`.
* Lines 2476-2485: `formatTimingTimestampForSummary_`.
* Lines 2486-2515: `buildFrameworkTimingIssueRows_`.
* Lines 2516-2532: `buildFrameworkTimingRecommendationRows_`.
* Lines 2533-2536: `writeFrameworkPerformanceRecommendationsSheet_`.
* Lines 2537-2576: `getPerformanceRecommendationForTimingStep_`.
* Lines 2577-2583: `worseTimingSeverity_`.
* Lines 2584-2609: `appendRuntimeTimingToFrameworkTimingReport_`.
* Lines 2610-2618: `formatSeconds_`.
* Lines 2619-2622: `refreshFrameworkTimingReport`.
* Lines 2623-2677: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2678-2753: `onOpen`.

### Menu callbacks, dashboard config, template generation, and formatting primitives

* Lines 2754-2762: `isFrameworkTimingEnabled_`.
* Lines 2763-2770: `toggleFrameworkTiming`.
* Lines 2771-2774: `hideTemplates_`.
* Lines 2775-2778: `showTemplates_`.
* Lines 2779-2782: `hideSystemSheets_`.
* Lines 2783-2786: `showSystemSheets_`.
* Lines 2787-2790: `formatDashboard`.
* Lines 2791-2832: `saveActiveLayoutToDashboardSettings`.
* Lines 2833-2845: `saveFormatDashboardConfigChanges_`.
* Lines 2846-2864: `resolveSheetDefinitionForLayoutSnapshot_`.
* Lines 2865-2917: `captureActiveSheetLayoutSnapshot_`.
* Lines 2918-2925: `getHiddenColumnFlags_`.
* Lines 2926-2930: `isDateNumberFormat_`.
* Lines 2931-2943: `getDefaultLayoutSnapshotBorderConfig_`.
* Lines 2944-2967: `upsertDashboardSheetDefinitionBaseColor_`.
* Lines 2968-3004: `upsertDashboardColumnDefinitionRows_`.
* Lines 3005-3032: `getDashboardSectionBounds_`.
* Lines 3033-3048: `ensureDashboardSectionDataCapacity_`.
* Lines 3049-3089: `writeDashboardLayoutSnapshotSection_`.
* Lines 3090-3103: `applyLayoutSnapshotBorder_`.
* Lines 3104-3210: `clearDiagnosticsAndTimingLogs`.
* Lines 3211-3215: `clearDashboardConfigCache_`.
* Lines 3216-3232: `getDashboardConfigCacheKey_`.
* Lines 3233-3244: `getFormatDashboardSectionNames_`.
* Lines 3245-3259: `getRequiredFrameworkSheetTypes_`.
* Lines 3260-3324: `getDefaultGlobalSettingsRows_`.
* Lines 3325-3333: `getDefaultTitleRowRows_`.
* Lines 3334-3346: `getDefaultSheetDefinitionRows_`.
* Lines 3347-3361: `getDefaultSheetDefinitionRowsWithColumnCounts_`.
* Lines 3362-3374: `getDefaultBehaviorRows_`.
* Lines 3375-3384: `getDefaultSystemSurfaceRows_`.
* Lines 3385-3399: `getDefaultSheetHeaderRows_`.
* Lines 3400-3746: `getDefaultHeaderSets_`.
* Lines 3747-3786: `createOrRefreshAllReportTemplates`.
* Lines 3787-3825: `ensureGoldenMasterTemplate_`.
* Lines 3826-3836: `summarizeTemplateRefreshModes_`.
* Lines 3837-3843: `hideReportTemplates`.
* Lines 3844-3850: `showReportTemplates`.
* Lines 3851-3883: `setReportTemplateVisibility_`.
* Lines 3884-3891: `validateReportTemplates`.
* Lines 3892-3901: `validateReportTemplatesCore_`.
* Lines 3902-3946: `loadDashboardConfig_`.
* Lines 3947-3968: `buildDashboardSectionIndex_`.
* Lines 3969-4013: `loadGlobalSettings_`.
* Lines 4014-4048: `loadTitleRows_`.
* Lines 4049-4074: `parseTitleRowConfigRow_`.
* Lines 4075-4080: `normalizeTitleTargetCell_`.
* Lines 4081-4088: `getTitleRowConfigForSheet_`.
* Lines 4089-4096: `getThemeFillForTitleRow_`.
* Lines 4097-4103: `toWrapStrategy_`.
* Lines 4104-4131: `loadSheetDefinitions_`.
* Lines 4132-4165: `loadSheetHeaders_`.
* Lines 4166-4192: `loadColumnDefinitions_`.
* Lines 4193-4216: `loadSheetBehaviors_`.
* Lines 4217-4224: `normalizeDashboardSectionTitle_`.
* Lines 4225-4269: `readDashboardSectionRows_`.
* Lines 4270-4275: `getBehaviorForSheetType_`.
* Lines 4276-4347: `createOrRefreshTemplateFromDashboard_`.
* Lines 4348-4354: `shouldUseStagedTemplateBuild_`.
* Lines 4355-4365: `shouldRefreshTemplateMetadataOnly_`.
* Lines 4366-4383: `buildTemplateRefreshDecisionMessage_`.
* Lines 4384-4396: `refreshTemplateMetadataOnly_`.
* Lines 4397-4425: `buildTemplateFromDashboardSafely_`.
* Lines 4426-4429: `getTemplateBuildSheetName_`.
* Lines 4430-4441: `promoteStagedTemplateBuild_`.
* Lines 4442-4459: `validateBuiltTemplateMinimumStructure_`.
* Lines 4460-4509: `buildTemplateFromDashboard_`.
* Lines 4510-4514: `shouldSkipTemplateResize_`.
* Lines 4515-4523: `ensureSheetMinimumColumns_`.
* Lines 4524-4548: `clearTemplateForFullBuild_`.
* Lines 4549-4554: `applyTemplateRowHeights_`.
* Lines 4555-4558: `applyFinalRowHeightLockForSheetType_`.
* Lines 4559-4586: `lockFinalOutputRowHeights_`.
* Lines 4587-4597: `applyGlobalDefaultRowHeightsToSheet_`.
* Lines 4598-4633: `safeSetRowHeights_`.
* Lines 4634-4640: `applyRowHeightRuns_`.
* Lines 4641-4655: `hideTemplateIfNeeded_`.
* Lines 4656-4679: `resolveTemplateRowCount_`.
* Lines 4680-4728: `applyTemplateBaseFormatting_`.
* Lines 4729-4741: `ensureTitleRowConfig_`.
* Lines 4742-4794: `applyTitleRows_`.
* Lines 4795-4805: `rowColToA1_`.
* Lines 4806-4846: `applyHeaderRow_`.
* Lines 4847-4857: `applyColumnWidths_`.
* Lines 4858-4893: `applyColumnWidthsInRuns_`.
* Lines 4894-4897: `applyDateAndNumberFormats_`.
* Lines 4898-4902: `enforceTemplateDateAndNumberFormats_`.
* Lines 4903-4959: `enforceDateAndNumberFormatsForHeaders_`.
* Lines 4960-4966: `getExpectedNumberFormat_`.
* Lines 4967-4985: `getGoogleSheetsNumberFormat_`.
* Lines 4986-4990: `isDateFormatText_`.
* Lines 4991-5000: `applyHiddenColumnSettings_`.
* Lines 5001-5036: `applyHiddenColumnSettingsInRuns_`.
* Lines 5037-5062: `applyDataRows_`.
* Lines 5063-5089: `applyAlternatingColorRules_`.
* Lines 5090-5119: `applyMonthlyChangeSpacerRow3Format_`.
* Lines 5120-5165: `formatMonthlyChangeSubsectionBlock_`.
* Lines 5166-5183: `writeTemplateMetadata_`.
* Lines 5184-5216: `buildTemplateFormatSignature_`.
* Lines 5217-5230: `compactTemplateFormatSignature_`.
* Lines 5231-5239: `normalizeTemplateFormatSignature_`.
* Lines 5240-5245: `getTemplateFormatSignatureKey_`.
* Lines 5246-5254: `getStoredTemplateFormatSignature_`.
* Lines 5255-5274: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5275-5282: `storeTemplateFormatSignature_`.
* Lines 5283-5331: `ensureTemplateFilter_`.
* Lines 5332-5369: `applyTemplateFreezeAndTabColor_`.
* Lines 5370-5394: `resizeSheet_`.
* Lines 5395-5427: `resizeSheetGrid_`.
* Lines 5428-5432: `resizeSheetRows_`.
* Lines 5433-5436: `resizeSheetColumns_`.
* Lines 5437-5444: `getHeadersForSheetType_`.
* Lines 5445-5454: `getDefaultBehavior_`.
* Lines 5455-5466: `showSheetIfNeeded_`.
* Lines 5467-5480: `hideSheetIfNeeded_`.
* Lines 5481-5519: `formatMonthlySheets`.

### Monthly imports, report output creation, raw-data sync, and Demo P preprocessing

* Lines 5520-5528: `buildPromptedMonthContext_`.
* Lines 5529-5550: `formatMonthlyBannerSheet_`.
* Lines 5551-5584: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5585-5612: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5613-5680: `formatBannerReport`.
* Lines 5681-5702: `validateActiveBannerFormatterOutput`.
* Lines 5703-5720: `archiveActiveRawDataSheet`.
* Lines 5721-5753: `parseReportMonthInput_`.
* Lines 5754-5797: `promptForLockedYearReportMonth_`.
* Lines 5798-5801: `boolText_`.
* Lines 5802-5806: `isPrimaryPMRRowValue_`.
* Lines 5807-5834: `assignPrimaryPMRRows_`.
* Lines 5835-5846: `getCurrentBannersSheet_`.
* Lines 5847-5855: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5856-5867: `getCurrentCarePlanDueSheet_`.
* Lines 5868-5873: `getPreviousMasterListSheet_`.
* Lines 5874-5879: `getCurrentMasterListSheet_`.
* Lines 5880-5922: `applyStandardFormatting_`.
* Lines 5923-5932: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5933-5941: `forceStandardTitleCellAlignment_`.
* Lines 5942-5950: `captureHiddenSheetNames_`.
* Lines 5951-5967: `restorePreviouslyHiddenSheets_`.
* Lines 5968-5975: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5976-5979: `hidePreviousMonthSheets_`.
* Lines 5980-5994: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5995-6015: `applyIndexSheetRowFills_`.
* Lines 6016-6038: `applyCurrentVsOlderTabColors_`.
* Lines 6039-6042: `organizeSheetTabs_`.
* Lines 6043-6061: `formatDateColumnsByHeader_`.
* Lines 6062-6070: `rowObjectFromHeaders_`.
* Lines 6071-6075: `appendMasterListChangeLog_`.
* Lines 6076-6079: `getLiveDashboardAuditStatus_`.
* Lines 6080-6083: `getLiveTemplateValidationStatus_`.
* Lines 6084-6087: `getLiveFrameworkHealthStatus_`.
* Lines 6088-6093: `getLiveSheetStatus_`.
* Lines 6094-6099: `setMonthlySheetNameFast_`.
* Lines 6100-6255: `writePMRContactsToParticipantRows_`.
* Lines 6256-6264: `buildParticipantContactKey_`.
* Lines 6265-6271: `isExpiredContactPhoneDate_`.
* Lines 6272-6278: `capitalizeContactPart_`.
* Lines 6279-6294: `formatRankedContact_`.
* Lines 6295-6306: `getMostRecentDateFromRowsByHeader_`.
* Lines 6307-6317: `isDateInStrictLocalRangeInclusive_`.
* Lines 6318-6321: `isDateDisplayInReportWindow_`.
* Lines 6322-6331: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6332-6346: `getSheetTypeForOrganization_`.
* Lines 6347-6357: `collectFrameworkHealthCheckRows_`.
* Lines 6358-6365: `collectWorkflowSyncVerificationRows_`.
* Lines 6366-6374: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6375-6385: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6386-6396: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6397-6438: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6439-6456: `ensureStandardTitleRows_`.
* Lines 6457-6465: `isDateLikeHeader_`.
* Lines 6466-6469: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6470-6476: `formatReportDateLabel_`.
* Lines 6477-6481: `buildBannerReportOutputName_`.
* Lines 6482-6495: `renameSheetSafely_`.
* Lines 6496-6519: `deleteSheetIfExists_`.
* Lines 6520-6528: `writeBannerReportDates_`.
* Lines 6529-6579: `copyRawBannerDataToOutput_`.
* Lines 6580-6586: `ensureSheetHasAtLeastRows_`.
* Lines 6587-6614: `validateBannerFormatterOutput_`.
* Lines 6615-6638: `archiveRawSourceAndDeleteLocal_`.
* Lines 6639-6661: `archiveRawDataSheet_`.
* Lines 6662-6673: `hideMonthlyImportSheets`.
* Lines 6674-6684: `hideMonthlyActiveSheets`.
* Lines 6685-6709: `hideMonthlySheetsBySpecs_`.
* Lines 6710-6726: `archiveMonthlyImportSheets`.
* Lines 6727-6743: `archiveMonthlyActiveSheets`.
* Lines 6744-6782: `archiveMonthlySheetsBySpecs_`.
* Lines 6783-6806: `findArchiveMonthlyCandidateSheets_`.
* Lines 6807-6831: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6832-6840: `notifyArchiveMonthlySheetsResult_`.
* Lines 6841-6857: `deleteArchiveSheetIfExists_`.
* Lines 6858-6861: `formatMonthlyChangeSubheaderRow`.
* Lines 6862-6873: `formatMonthlyChangeSubsectionBlock`.
* Lines 6874-6878: `getMonthlyChangeSubsectionLabels`.
* Lines 6879-6898: `normalizeNumberFormatForCompare_`.
* Lines 6899-6904: `numberFormatsMatch_`.
* Lines 6905-7050: `validateTemplateFromDashboard_`.
* Lines 7051-7056: `writeTemplateValidationReport_`.
* Lines 7057-7143: `formatRawData`.
* Lines 7144-7161: `ensureRawDataHeaderRows_`.
* Lines 7162-7171: `rowLooksLikeParticipantHeader_`.
* Lines 7172-7178: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7179-7222: `enforceDemoPStrictDashboardSchema_`.
* Lines 7223-7234: `buildRawDataSourceArchiveName_`.
* Lines 7235-7246: `mapRowsToHeaders_`.
* Lines 7247-7264: `applyUniversalFastCanvasFormatting_`.
* Lines 7265-7291: `applyGovernedTextAndNumberFormats_`.
* Lines 7292-7303: `applyOutputVisibilityPolicy_`.
* Lines 7304-7377: `createOutputSheetFromDashboardTemplate_`.
* Lines 7378-7455: `createRawDataOutputSheetFromTemplateFast_`.
* Lines 7456-7488: `ensureOutputSheetHasFormattedRows_`.
* Lines 7489-7570: `syncRawDataBannerColumns_`.
* Lines 7571-7612: `buildSourceMapByCompositeKeyForDemoPBanner_`.
* Lines 7613-7621: `formatCarePlanDueReport`.
* Lines 7622-7630: `formatUnlockedCarePlanReport`.
* Lines 7631-7725: `formatCarePlanDueOrUnlockedFromDashboard_`.
* Lines 7726-7752: `buildRawArchiveNameForSheetType_`.
* Lines 7753-7779: `collectAndClearMovedTitleInfoCells_`.
* Lines 7780-7786: `prepareCarePlanSourceSheetForDashboardFormat_`.
* Lines 7787-7800: `prepareRawDataSourceSheetForDashboardFormat_`.
* Lines 7801-7811: `buildRawDataHeadersForFormatting_`.
* Lines 7812-7817: `getRawDataApprovedAddedColumns_`.
* Lines 7818-7841: `processRawDataApprovedSyncColumns_`.
* Lines 7842-7883: `writeChangedColumnsOnly_`.
* Lines 7884-7942: `getRawDataDemoPSourceHeaders_`.
* Lines 7943-7993: `getRawDataDisallowedWorkingColumns_`.
* Lines 7994-8001: `isOngoingOutputSheetType_`.
* Lines 8002-8036: `buildDashboardOutputSheetName_`.
* Lines 8037-8042: `syncMasterListMonthlySourcesIntoData_`.
* Lines 8043-8071: `syncBannerSourceIntoData_`.
* Lines 8072-8106: `syncUnlockedCarePlanSourceIntoData_`.
* Lines 8107-8140: `syncCarePlanDueSourceIntoData_`.
* Lines 8141-8180: `syncRowsFromSourceMapData_`.
* Lines 8181-8218: `buildSourceMapBySingleKeyForPart5_`.
* Lines 8219-8260: `buildSourceMapByCompositeKeyForPart5_`.
* Lines 8261-8285: `shouldProcessRowByPMR_`.
* Lines 8286-8293: `normalizeSyncFieldPairs_`.
* Lines 8294-8323: `syncMasterListFromBanners_`.
* Lines 8324-8359: `syncMasterListFromUnlockedCarePlan_`.
* Lines 8360-8393: `syncMasterListFromCarePlanDue_`.
* Lines 8394-8556: `syncRowsFromSourceMap_`.
* Lines 8557-8574: `getDefaultDemoPMetadataHeaderRows_v155_`.
* Lines 8575-8599: `buildDemoPFromScratch`.
* Lines 8600-8639: `updateDemoPMonthlySync`.
* Lines 8640-8658: `enforceDemoPPostFlattenFormatting_`.
* Lines 8659-8680: `sortSheetAlphabeticallyByParticipantName_`.
* Lines 8681-8736: `getDemoPMonthlySyncChangedPMRs_`.
* Lines 8737-8772: `processDemoPDataWithFillBlankMask_`.
* Lines 8773-8794: `buildDemoPFreshRowsForPMRs_`.
* Lines 8795-8805: `processDemoPFreshRowsInMemory_`.

### Demo P, Monthly Change, diagnostics, and Master List creation

* Lines 8806-8866: `flattenDemoPContactsToPrimaryRows_`.
* Lines 8867-8885: `buildDemoPContactSummaryForFlatRecord_`.
* Lines 8886-8899: `sortDemoPFlatRows_`.
* Lines 8900-8979: `processDemoP`.
* Lines 8980-9027: `processDemoPAsWorkingSource_`.
* Lines 9028-9057: `markPrimaryPMRRowsForSequentialData_`.
* Lines 9058-9078: `assignPrimaryPMRRowsInData_`.
* Lines 9079-9082: `formatDemoPStructure`.
* Lines 9083-9086: `buildRawDataSheetName_`.
* Lines 9087-9161: `getOrCreateDemoPProcessingSheet_`.
* Lines 9162-9175: `deleteSheetIfExistsForDemoPProcess_`.
* Lines 9176-9183: `getLastRawDataDisenrolledBuildResult_`.
* Lines 9184-9190: `setLastRawDataDisenrolledBuildResult_`.
* Lines 9191-9250: `updateExistingDemoPFromRawData_`.
* Lines 9251-9358: `createActiveDemoPFromRawData_`.
* Lines 9359-9376: `populateDemoPUpdateColumns_`.
* Lines 9377-9419: `populateUniversalMetadataColumns_`.
* Lines 9420-9437: `buildSourceHashByPMR_`.
* Lines 9438-9460: `buildSourceHashForRows_`.
* Lines 9461-9464: `buildSourceHashForRow_`.
* Lines 9465-9480: `buildColumnsUpdatedText_`.
* Lines 9481-9488: `normalizeHashValue_`.
* Lines 9489-9496: `computeStableHash_`.
* Lines 9497-9505: `verifyPrimaryPMRColumnFromRawData_`.
* Lines 9506-9513: `createOrRefreshDemoPTemplate_`.
* Lines 9514-9520: `getOrCreateDemoPTemplate_`.
* Lines 9521-9536: `initializeDemoPTemplateTitleRows_`.
* Lines 9537-9558: `applyDemoPTemplateFormatting_`.
* Lines 9559-9594: `applyDemoPTemplateToSheet_`.
* Lines 9595-9648: `applyDemoPDateFormattingByHeader_`.
* Lines 9649-9666: `buildMonthlyChangeReport`.
* Lines 9667-9776: `buildMonthlyChangeReportForMonth_`.
* Lines 9777-9833: `getOrBuildMonthlyChangeReport_`.
* Lines 9834-10026: `compareRawDemoPForSectionReport_`.
* Lines 10027-10032: `rowsWithDOBOnlyForSection_`.
* Lines 10033-10048: `getChangedColumnsForSectionRows_`.
* Lines 10049-10061: `buildColumnSignaturesForSection_`.
* Lines 10062-10074: `buildColumnSignatureForSection_`.
* Lines 10075-10237: `compareRawDemoPForChanges_`.
* Lines 10238-10305: `getRawDemoPDataForCompare_`.
* Lines 10306-10354: `compareSingleFieldAndAdd_`.
* Lines 10355-10397: `addMCRRow_`.
* Lines 10398-10416: `buildContactCompareMap_`.
* Lines 10417-10422: `getFieldValueFromRow_`.
* Lines 10423-10439: `buildParticipantName_`.
* Lines 10440-10447: `displayValueForReport_`.
* Lines 10448-10471: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10472-10477: `padRowToWidth_`.
* Lines 10478-10487: `stripMonthlyChangeNativeBandings_`.
* Lines 10488-10534: `getMonthlyChangeSectionSpecs_`.
* Lines 10535-10581: `buildMonthlyChangeSectionRows_`.
* Lines 10582-10589: `appendMonthlyChangeCompiledRow_`.
* Lines 10590-10619: `appendMonthlyChangeSectionBlock_`.
* Lines 10620-10672: `populateMonthlyChangeReportSections_`.
* Lines 10673-10688: `findMonthlyChangeSectionTitleRow_`.
* Lines 10689-10709: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10710-10803: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10804-10843: `writeDiagnosticReport_`.
* Lines 10844-10870: `runMonthlyUpdate`.
* Lines 10871-10876: `updateMasterList`.
* Lines 10877-10970: `updateMasterListForMonth_`.
* Lines 10971-11043: `createMasterList`.
* Lines 11044-11110: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11111-11117: `getMasterListTemplateHeaders_`.
* Lines 11118-11125: `createOrRefreshMasterListTemplate_`.
* Lines 11126-11132: `getOrCreateMasterListTemplate_`.
* Lines 11133-11189: `createMasterListSheetFromTemplate_`.
* Lines 11190-11196: `writeMasterListTitleDateBlock_`.
* Lines 11197-11205: `initializeMasterListTitleRows_`.

### Master List update/merge/display, index, and tab organization

* Lines 11206-11223: `copyDemoPHeaderRowsToMasterList_`.
* Lines 11224-11249: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11250-11257: `formatMasterListSheet_`.
* Lines 11258-11269: `getMonthPartsFromTitleRows_`.
* Lines 11270-11277: `updateCopiedMasterListHeader_`.
* Lines 11278-11432: `createIndexSheet`.
* Lines 11433-11436: `generateArchiveFileIndex_`.
* Lines 11437-11519: `enforceGlobalSheetSortOrder_`.
* Lines 11520-11538: `extractFirstDateFromSheetName_`.
* Lines 11539-11562: `parseIndexMonthDate_`.
* Lines 11563-11609: `organizeWorkbookTabs_`.
* Lines 11610-11627: `hideSystemAndTestingSheets_`.
* Lines 11628-11643: `getSystemAndTestingSheetNames_`.
* Lines 11644-11662: `isSystemOrTestingSheet_`.
* Lines 11663-11669: `assignSortOrderAndHideExtraRows`.
* Lines 11670-11675: `applySortOrderDisplayForMasterList_`.
* Lines 11676-11702: `buildParticipantBlocksForSortOrder_`.
* Lines 11703-11710: `showAllMasterListRows`.
* Lines 11711-11715: `groupMasterListRowsByPMR_`.
* Lines 11716-11719: `hideRowsWithBlankDOB_`.
* Lines 11720-11779: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11780-11798: `getPrimaryRowScore_`.
* Lines 11799-11823: `hideNonPrimaryPMRRows_`.
* Lines 11824-11841: `hideRowNumberBatches_`.
* Lines 11842-11853: `clearAllRowGroupsIfPossible_`.
* Lines 11854-11860: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11861-11866: `applyFinalMasterListColorAndDisplay_`.
* Lines 11867-11870: `applyMasterListDisplaySettings_`.
* Lines 11871-11878: `processMasterListFull_`.
* Lines 11879-11882: `processMasterListDataOnly_`.
* Lines 11883-11917: `processMasterListSingleDataPass_`.
* Lines 11918-11936: `populateParticipantNameData_`.
* Lines 11937-11953: `populateDemoPNameData_`.
* Lines 11954-11978: `updateBannerColumnData_`.
* Lines 11979-11992: `combineAddressesData_`.
* Lines 11993-12014: `handleLanguageData_`.
* Lines 12015-12041: `splitPhoneNumbersData_`.
* Lines 12042-12046: `runMasterContactProcessData_`.
* Lines 12047-12073: `combineNotesSummaryData_`.
* Lines 12074-12083: `rebuildChangedPMRsFromDemoP_`.
* Lines 12084-12109: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12110-12136: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12137-12166: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12167-12177: `getPMRsForMonthlyChangeSections_`.
* Lines 12178-12206: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12207-12254: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12255-12326: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12327-12336: `buildMappedMasterRowFromDemoRow_`.
* Lines 12337-12346: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12347-12354: `hideSystemSheetsNow`.
* Lines 12355-12387: `showSystemSheetsNow`.
* Lines 12388-12406: `getPrimaryMergeRowItem_`.
* Lines 12407-12476: `getPrimaryRowChangedColumnDetails_`.
* Lines 12477-12486: `formatMergeAuditValueForDisplay_`.
* Lines 12487-12492: `getMergeAuditParticipantName_`.
* Lines 12493-12513: `getMergeAuditParticipantNameFromRows_`.
* Lines 12514-12537: `buildMergeAuditContactSummary_`.
* Lines 12538-12570: `getMergeAuditChangedFields_`.
* Lines 12571-12594: `buildMergeRowsByPMRFromData_`.
* Lines 12595-12624: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12625-12654: `buildMergeKeyMapForRows_`.
* Lines 12655-12678: `buildContactMergeRowKey_`.
* Lines 12679-12693: `getMergeRowValue_`.
* Lines 12694-12724: `createDisenrolledList`.
* Lines 12725-12745: `processBlankContactSummariesOnDemoP_`.
* Lines 12746-12797: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12798-12815: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12816-12833: `loadDisenrolledPMRSetForMonth_`.
* Lines 12834-12838: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12839-12937: `moveDisenrolledPMRsFromDemoPToExclusion_`.

### Disenrollment/exclusion and Monthly Change output row helpers

* Lines 12938-13005: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 13006-13017: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 13018-13059: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13060-13079: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13080-13119: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13120-13232: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13233-13237: `getCurrentRawDataSheet_`.
* Lines 13238-13242: `getPreviousRawDataSheet_`.
* Lines 13243-13250: `getCurrentDemoPSheet_`.
* Lines 13251-13256: `getPreviousDemoPSheet_`.
* Lines 13257-13268: `getMonthlyChangeReportHeaders_`.
* Lines 13269-13274: `getMonthlyChangeReportDateIndexes_`.
* Lines 13275-13304: `convertMonthlyChangeReportDateValues_`.
* Lines 13305-13325: `buildMonthlyChangeReportRow_`.
* Lines 13326-13345: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13346-13352: `runDashboardQualityStartUp`.
* Lines 13353-13406: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13407-13416: `getDashboardVerificationPassRow_`.
* Lines 13417-13421: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13422-13427: `getDashboardSectionHeaderWidth_`.
* Lines 13428-13437: `collectBlankDashboardCells_`.
* Lines 13438-13469: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13470-13506: `collectFormatDashboardTitleRowsVerificationRows_`.

### Dashboard Quality, framework health, system verification, and timing wrappers

* Lines 13507-13535: `collectFormatDashboardSheetDefinitionVerificationRows_`.
* Lines 13536-13572: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13573-13602: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13603-13631: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13632-13641: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13642-13646: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13647-13654: `runDashboardQualitySectionIfDue_`.
* Lines 13655-13658: `runDashboardQualityQuick`.
* Lines 13659-13666: `runDashboardQualityValidateTemplates`.
* Lines 13667-13698: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13699-13710: `getDashboardQualitySectionRegistry_`.
* Lines 13711-13760: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13761-13767: `runDashboardQualityPerformanceSummary_`.
* Lines 13768-13788: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13789-13841: `runDashboardQualityFull`.
* Lines 13842-13850: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13851-13923: `repairAllTemplateDateFormats`.
* Lines 13924-13929: `normalizeSectionRowForWidth_`.
* Lines 13930-13935: `rowHasAnyValue_`.
* Lines 13936-13941: `trimTrailingBlankRows_`.
* Lines 13942-13963: `getDefaultDashboardQualityDetailHeader_`.
* Lines 13964-13981: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 13982-13989: `getDashboardQualityNotRunMessage_`.
* Lines 13990-14005: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 14006-14045: `normalizeDashboardQualitySectionBlock_`.
* Lines 14046-14088: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14089-14096: `getDashboardQualitySectionTitleForKey_`.
* Lines 14097-14104: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14105-14121: `hasDashboardQualityTemplateShell_`.
* Lines 14122-14140: `initializeDashboardQualitySheet_`.
* Lines 14141-14158: `initializeSystemSheets_`.
* Lines 14159-14173: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14174-14177: `ensureDashboardQualityReportSheet_`.
* Lines 14178-14186: `ensureDashboardQualityTemplateShell_`.
* Lines 14187-14191: `ensureDashboardQualitySectionShells_`.
* Lines 14192-14197: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14198-14245: `applyDashboardQualityReportColumnSettings_`.
* Lines 14246-14256: `styleDashboardQualityReport_`.
* Lines 14257-14260: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14261-14265: `isDashboardQualityNotesLabel_`.
* Lines 14266-14296: `normalizeDashboardQualityOutputRow_`.
* Lines 14297-14301: `getDashboardQualitySectionLetter_`.
* Lines 14302-14307: `normalizeDashboardQualityIssueValue_`.
* Lines 14308-14340: `normalizeDashboardQualityRowsForSection_`.
* Lines 14341-14348: `normalizeDashboardQualityDataRows_`.
* Lines 14349-14371: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14372-14390: `getStatusFromDashboardQualityRows_`.
* Lines 14391-14412: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14413-14432: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14433-14440: `dashboardQualityRowsEqualValues_`.
* Lines 14441-14470: `saveDashboardQualitySectionRows_`.
* Lines 14471-14482: `getDashboardQualitySectionRows_`.
* Lines 14483-14493: `deleteLegacyQualityReportSheet_`.
* Lines 14494-14500: `deleteLegacyStandaloneQualityReports_`.
* Lines 14501-14508: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14509-14521: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14522-14530: `getStoredDashboardQualityOverallStatus_`.
* Lines 14531-14542: `getStoredDashboardQualityFailureNotes_`.
* Lines 14543-14548: `buildDatedDisenrolledOutputName_`.
* Lines 14549-14559: `forceSheetRowCount_`.
* Lines 14560-14593: `buildCombinedFrameworkTestDashboard`.
* Lines 14594-14599: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14600-14611: `updateDashboardQualitySignoffSection_`.
* Lines 14612-14622: `updateDashboardQualitySummarySection_`.
* Lines 14623-14626: `updateDashboardQualityTimingSummarySection_`.
* Lines 14627-14655: `getDashboardQualitySectionBoundsMap_`.
* Lines 14656-14716: `replaceDashboardQualitySectionsRows_`.
* Lines 14717-14733: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14734-14807: `replaceDashboardQualitySectionRows_`.
* Lines 14808-14822: `findDashboardQualitySectionRow_`.
* Lines 14823-14833: `findNextDashboardQualitySectionRow_`.
* Lines 14834-14853: `dashboardQualitySectionContentMatches_`.
* Lines 14854-14871: `mergeDashboardQualityStyleRanges_`.
* Lines 14872-14961: `styleDashboardQualityUpdatedSections_`.
* Lines 14962-14981: `appendCombinedDashboardSignOffRows_`.
* Lines 14982-15012: `buildFrameworkSummaryRows_`.
* Lines 15013-15032: `getStoredSectionStatusAndNotes_`.
* Lines 15033-15048: `getReportOverallStatus_`.
* Lines 15049-15068: `getReportFailureNotes_`.
* Lines 15069-15095: `runFrameworkHealthCheck`.
* Lines 15096-15101: `getFrameworkHealthCheckIssueRows_`.
* Lines 15102-15113: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15114-15120: `appendRequiredFunctionChecks_`.
* Lines 15121-15128: `existsFunctionByName_`.
* Lines 15129-15133: `writeFrameworkHealthCheckReport_`.
* Lines 15134-15145: `normalizeFrameworkHealthCheckRows_`.
* Lines 15146-15161: `getRequiredHelperFunctionNames_`.
* Lines 15162-15203: `getRequiredMenuFunctionNames_`.
* Lines 15204-15213: `getRequiredDashboardFunctionNames_`.
* Lines 15214-15222: `getRequiredTemplateFunctionNames_`.
* Lines 15223-15230: `getRequiredValidationFunctionNames_`.
* Lines 15231-15239: `getRequiredTimingFunctionNames_`.
* Lines 15240-15252: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15253-15256: `runWorkflowSyncVerification`.
* Lines 15257-15264: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15265-15270: `setupSystemSheets`.
* Lines 15271-15326: `verifyFrameworkConfiguration`.
* Lines 15327-15346: `runFrameworkTimed_`.
* Lines 15347-15357: `startFrameworkTiming_`.
* Lines 15358-15382: `markFrameworkStep_`.
* Lines 15383-15388: `writeFrameworkTimingReport_`.
* Lines 15389-15392: `writeTimingReport_`.
* Lines 15393-15409: `trimTimingReportRows_`.
* Lines 15410-15489: `rebuildProductionMonthlyChangeTemplate`.

## Verification Commands

* `cp 'Current_Production Script/v.1.6.26_Production_Script' /tmp/v1626.js && node --check /tmp/v1626.js`
* `python3` static scanner for version, metrics, architecture section coverage, and function line inventory.
* `rg` targeted scans for Test 6 artifacts, metadata shells, menu exposure, A1 notation builders, Logger catch paths, and phantom-boundary patterns.
