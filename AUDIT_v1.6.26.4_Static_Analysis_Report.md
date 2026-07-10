# AUDIT v1.6.26.4 Exhaustive Line-by-Line Static Analysis Report

Source audited: `Current_Production Script/v.1.6.26_Production_Script`. Current declared script version: `1.6.26.4`. Current source size: 15,466 lines, 670 named `function` declarations.

## Methodology and Scope

* Ran a full syntax parse of the monolithic Apps Script by copying it to `/tmp/v1626.js` and executing `node --check /tmp/v1626.js`.
* Performed targeted static scans for version metadata, Section G/Test 6 ghosts, metadata shell remnants, loop-time `getA1Notation()`, single-row hide loops, title-info Logger catches, Demo P clear/rewrite deletion flow, Monthly Change menu exposure, and residual Logger/catch risk.
* Generated a complete named-function inventory so each function has a current source line range. This inventory is the practical line-by-line review map for the monolith.
* This report is read-only; no production script edits are made by this audit artifact.

## Static Metrics

* **Total source lines:** 15,466
* **Named function declarations:** 670
* **`catch (` occurrences:** 138
* **`Logger.log(` occurrences:** 101
* **`getRange(` occurrences:** 308
* **`setValues(` occurrences:** 59
* **`getValues(` occurrences:** 50
* **`getA1Notation(` occurrences:** 0
* **`TODO` markers:** 0
* **`FIXME` markers:** 0

## Executive Summary

The v1.6.26.4 source parses successfully and the requested hardening corrections are present. The obsolete Section G repair flag is gone, serial-date constants remain anchored in configuration, title-info write failures now fail fast, old disenrolled rows are hidden through the batch hide helper, Demo P disenrollment removal physically deletes rows and trims the grid buffer, loop-time `getA1Notation()` calls are fully eliminated, the obsolete single-column section signature helper has been deleted, and the root Master List menu includes `Build Monthly Change Report`.

Residual risks are now narrower: 101 `Logger.log(` calls remain, mainly around cosmetic or best-effort dashboard/template/timing operations; the retired Master List Change Log is still represented by constants and a suppressing stub; and runtime validation remains limited to static/syntax checks because this repository does not include a Google Apps Script execution harness.

## Findings

### PASS: Version and configuration cleanup

The banner and version constant identify v1.6.26.4. The obsolete `RFF_REPAIR_DATE_FORMATS_DURING_SECTION_G` flag is absent. Serial-date constants remain in the configuration block.

**Evidence:** Lines 1-32 and 88-108; targeted `rg` scan found no repair flag.

### PASS: Title-info failures are fail-fast

`formatMonthlyDashboardSheetFromSource_` and `formatCarePlanDueOrUnlockedFromDashboard_` now throw `Fatal: Could not write title info` instead of logging and continuing.

**Evidence:** Lines 5564-5572 and 7698-7705.

### PASS: Old disenrolled row hiding uses batch dispatch

`hideOldDisenrolledRows_` collects row numbers and passes them to `hideRowNumberBatches_`; the single-row `hideRows(rowNumber)` loop is gone.

**Evidence:** Lines 783-810.

### PASS: Demo P disenrollment removal physically deletes rows and trims the grid

`moveDisenrolledPMRsFromDemoPToExclusion_` collects `rowNumbersToDelete`, calls `deleteRowNumberBatches_`, and then calls `trimExcessRows_(demoSheet, 500)`.

**Evidence:** Lines 12883-12910.

### PASS: Loop-time `getA1Notation()` calls are eliminated

Static count for `getA1Notation(` is zero. `styleDashboard_`, governed formatting, and index section styling now use `rowColToA1_` generated strings.

**Evidence:** Lines 656-666, 7264-7290, and 11395-11407.

### PASS: Obsolete signature wrapper is gone

`buildColumnSignatureForSection_` no longer exists. Monthly Change uses `buildColumnSignaturesForSection_` and then proceeds directly to `compareRawDemoPForChanges_`.

**Evidence:** Lines 10033-10060; targeted `rg` scan found no obsolete wrapper.

### PASS: Root Monthly Change menu action is restored

The root `Master List` menu adds `📅 Build Monthly Change Report` immediately after the Data & Processing submenu.

**Evidence:** Lines 2738-2743.

### MEDIUM: Residual best-effort Logger catches remain

There are still 101 `Logger.log(` calls. Many appear cosmetic, but template metadata/signature/filter, row height, Dashboard Quality, and timing-write paths should be classified as safe-to-log vs hard-fail.

**Evidence:** Representative lines include 5175-5322, 5913-6051, 14057-14467, and 14753-14935.

### LOW: Retired Master List Change Log compatibility artifacts remain

Constants and the suppressing `appendMasterListChangeLog_` stub remain. This is operationally suppressed but still visible in source names and tab-order metadata.

**Evidence:** Lines 122-162 and 6066-6069.

## Architecture Section Coverage

* Lines 29-237: CONFIGURATION.
* Lines 238-2623: HELPER FUNCTIONS.
* Lines 2624-3115: MENU FUNCTIONS.
* Lines 3116-3738: FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS.
* Lines 3739-8033: TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS.
* Lines 8034-8448: SYNC FUNCTIONS.
* Lines 8449-9290: DEMO P FUNCTIONS.
* Lines 9291-9645: OPTIMIZED HYPERSPEED NAKED CANVAS DUMP FOR DEMO P.
* Lines 9646-10954: MONTHLY CHANGE FUNCTIONS.
* Lines 10955-12677: MASTER LIST FUNCTIONS.
* Lines 12678-13319: DISENROLLMENT FUNCTIONS.
* Lines 13320-15300: DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS.
* Lines 15301-15466: FRAMEWORK AND TIMING FUNCTIONS.

## Recommended Remediation Queue

1. Classify the remaining 101 Logger catches into cosmetic, recoverable, and governance-critical groups.
2. Decide whether the retired Master List Change Log constants/stub should remain as compatibility markers or be fully removed.
3. Add a GAS runtime smoke harness for zero-row sheets, title-write failures, Demo P disenrollment deletion, duplicate contact keys, and Monthly Change menu availability.
4. Re-run this audit after any future script bump because function line numbers shift frequently in the monolith.

## Exhaustive Function Line Inventory

Every detected named function declaration is listed below with its current source line range. This is the line-by-line review map for surgical maintenance.

### Configuration, dashboard defaults, quick setup, and base utilities

* Lines 241-247: `h_`.
* Lines 248-361: `getDefaultColumnDefinitionRows_`.
* Lines 362-380: `getAllUniqueHeaders_`.
* Lines 381-480: `getColumnStandards_`.
* Lines 481-494: `c_`.
* Lines 495-508: `writeDashboardTitle_`.
* Lines 509-543: `writeDashboardSection_`.
* Lines 544-575: `styleDashboard_`.
* Lines 576-579: `setupReportFormattingDashboard`.
* Lines 580-588: `appendDashboardSectionRows_`.
* Lines 589-622: `getResolvedDefaultColumnDefinitionRows_`.
* Lines 623-697: `writeDashboardDefaultsFast_`.
* Lines 698-701: `rebuildFormatDashboardDefaults`.
* Lines 702-716: `setupReportFormattingDashboardFromScriptDefaults_`.
* Lines 717-735: `normalizeDashboardSheetTypeKey_`.
* Lines 736-742: `getSheetDefinitionByTypeOrNull_`.
* Lines 743-748: `getSheetDefinitionByType_`.
* Lines 749-762: `sortSheetDefinitionsByProductionOrder_`.
* Lines 763-770: `notify_`.
* Lines 771-782: `trimExcessRows_`.
* Lines 783-812: `hideOldDisenrolledRows_`.
* Lines 813-817: `showQuickStartToast_`.
* Lines 818-829: `quickSystemSetup`.
* Lines 830-837: `quickBuildAllTemplates`.
* Lines 838-842: `notifyErrorWithTiming_`.
* Lines 843-847: `isBlankCell_`.
* Lines 848-897: `coerceToValidDate_`.
* Lines 898-917: `spreadsheetSerialDateToLocalDate_`.
* Lines 918-922: `isReasonableReportDate_`.
* Lines 923-926: `createLocalDateOnly_`.
* Lines 927-931: `getTodayLocalDate_`.
* Lines 932-956: `getMonthDateParts_`.
* Lines 957-960: `formatDateForSheetName_`.
* Lines 961-965: `formatDateDisplay_`.
* Lines 966-970: `dateKey_`.
* Lines 971-974: `isSameDate_`.
* Lines 975-979: `isSameMonth_`.
* Lines 980-984: `buildMonthlySheetName_`.
* Lines 985-990: `buildStandardMonthlySheetName_`.
* Lines 991-1021: `getNewestFormattedMonthlySheetByPrefix_`.

### Core helpers, row/block utilities, framework timing shell, and menus prelude

* Lines 1022-1055: `getMonthlySheetByPrefixAndDate_`.
* Lines 1056-1088: `setUniqueSheetName_`.
* Lines 1089-1108: `getHeaders_`.
* Lines 1109-1123: `getHeaderMap_`.
* Lines 1124-1132: `buildHeaderIndexMap_`.
* Lines 1133-1139: `findHeaderIndex_`.
* Lines 1140-1147: `normalizeHeader_`.
* Lines 1148-1154: `normalizePMR_`.
* Lines 1155-1158: `getPMRIndex_`.
* Lines 1159-1162: `getDOBIndex_`.
* Lines 1163-1181: `normalizeKeyPart_`.
* Lines 1182-1221: `getDataValues_`.
* Lines 1222-1255: `getRawDataSourceDataForOutput_`.
* Lines 1256-1270: `rawDataSourceHeaderRow_`.
* Lines 1271-1287: `ensurePrimaryPMRRowColumn_`.
* Lines 1288-1314: `assignPrimaryRowForBlock_`.
* Lines 1315-1348: `deleteRowNumberBatches_`.
* Lines 1349-1358: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1359-1385: `ensureHeaders_`.
* Lines 1386-1389: `ensureBannerSummaryOutputHeaders_`.
* Lines 1390-1403: `ensureContactOutputHeaders_`.
* Lines 1404-1413: `trimOutputSheetToDataSize_`.
* Lines 1414-1448: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1449-1454: `applyFinalRowHeightLock_`.
* Lines 1455-1484: `normalizeCompareValue_`.
* Lines 1485-1488: `valuesAreEqual_`.
* Lines 1489-1492: `normalizeText_`.
* Lines 1493-1496: `normalizeKey_`.
* Lines 1497-1501: `numberOrDefault_`.
* Lines 1502-1511: `parseBoolean_`.
* Lines 1512-1526: `clearHeaderCacheForSheet_`.
* Lines 1527-1531: `clearSheetRuntimeCachesForSheet_`.
* Lines 1532-1538: `getHeaderCacheKey_`.
* Lines 1539-1544: `clearMonthlySheetLookupCache_`.
* Lines 1545-1551: `getMonthlySheetLookupCacheKey_`.
* Lines 1552-1555: `getSheetDimensionCacheKey_`.
* Lines 1556-1561: `clearSheetDimensionCacheForSheet_`.
* Lines 1562-1581: `getSheetDimensions_`.
* Lines 1582-1587: `dateOnlyLocalClone_`.
* Lines 1588-1592: `monthKey_`.
* Lines 1593-1612: `parseStandardMonthlySheetDateFromName_`.
* Lines 1613-1647: `buildRowsByPMR_`.
* Lines 1648-1654: `safeSheetName_`.
* Lines 1655-1658: `compareValues_`.
* Lines 1659-1662: `toBool_`.
* Lines 1663-1666: `truthy_`.
* Lines 1667-1670: `toNumber_`.
* Lines 1671-1686: `resizeSheetMinimum_`.
* Lines 1687-1697: `getThemeColorsFromBase_`.
* Lines 1698-1702: `getGlobalBorderStyle_`.
* Lines 1703-1713: `normalizeHex_`.
* Lines 1714-1720: `hexWithHslLightness_`.
* Lines 1721-1729: `hexToRgb_`.
* Lines 1730-1737: `rgbToHex_`.
* Lines 1738-1759: `rgbToHsl_`.
* Lines 1760-1782: `hslToRgb_`.
* Lines 1783-1795: `startRuntimeTiming_`.
* Lines 1796-1822: `markRuntimeStep_`.
* Lines 1823-1827: `addRuntimeCounter_`.
* Lines 1828-1832: `logRuntimeInfo_`.
* Lines 1833-1837: `logRuntimeWarning_`.
* Lines 1838-1842: `logRuntimeError_`.
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
* Lines 2617-2671: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2672-2748: `onOpen`.

### Menu callbacks, dashboard config, template generation, and formatting primitives

* Lines 2749-2757: `isFrameworkTimingEnabled_`.
* Lines 2758-2765: `toggleFrameworkTiming`.
* Lines 2766-2769: `hideTemplates_`.
* Lines 2770-2773: `showTemplates_`.
* Lines 2774-2777: `hideSystemSheets_`.
* Lines 2778-2781: `showSystemSheets_`.
* Lines 2782-2785: `formatDashboard`.
* Lines 2786-2827: `saveActiveLayoutToDashboardSettings`.
* Lines 2828-2840: `saveFormatDashboardConfigChanges_`.
* Lines 2841-2859: `resolveSheetDefinitionForLayoutSnapshot_`.
* Lines 2860-2912: `captureActiveSheetLayoutSnapshot_`.
* Lines 2913-2920: `getHiddenColumnFlags_`.
* Lines 2921-2925: `isDateNumberFormat_`.
* Lines 2926-2938: `getDefaultLayoutSnapshotBorderConfig_`.
* Lines 2939-2962: `upsertDashboardSheetDefinitionBaseColor_`.
* Lines 2963-2999: `upsertDashboardColumnDefinitionRows_`.
* Lines 3000-3027: `getDashboardSectionBounds_`.
* Lines 3028-3043: `ensureDashboardSectionDataCapacity_`.
* Lines 3044-3084: `writeDashboardLayoutSnapshotSection_`.
* Lines 3085-3098: `applyLayoutSnapshotBorder_`.
* Lines 3099-3205: `clearDiagnosticsAndTimingLogs`.
* Lines 3206-3210: `clearDashboardConfigCache_`.
* Lines 3211-3227: `getDashboardConfigCacheKey_`.
* Lines 3228-3239: `getFormatDashboardSectionNames_`.
* Lines 3240-3254: `getRequiredFrameworkSheetTypes_`.
* Lines 3255-3319: `getDefaultGlobalSettingsRows_`.
* Lines 3320-3328: `getDefaultTitleRowRows_`.
* Lines 3329-3341: `getDefaultSheetDefinitionRows_`.
* Lines 3342-3356: `getDefaultSheetDefinitionRowsWithColumnCounts_`.
* Lines 3357-3369: `getDefaultBehaviorRows_`.
* Lines 3370-3379: `getDefaultSystemSurfaceRows_`.
* Lines 3380-3394: `getDefaultSheetHeaderRows_`.
* Lines 3395-3741: `getDefaultHeaderSets_`.
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
* Lines 4593-4628: `safeSetRowHeights_`.
* Lines 4629-4635: `applyRowHeightRuns_`.
* Lines 4636-4650: `hideTemplateIfNeeded_`.
* Lines 4651-4674: `resolveTemplateRowCount_`.
* Lines 4675-4723: `applyTemplateBaseFormatting_`.
* Lines 4724-4736: `ensureTitleRowConfig_`.
* Lines 4737-4789: `applyTitleRows_`.
* Lines 4790-4800: `rowColToA1_`.
* Lines 4801-4841: `applyHeaderRow_`.
* Lines 4842-4852: `applyColumnWidths_`.
* Lines 4853-4888: `applyColumnWidthsInRuns_`.
* Lines 4889-4892: `applyDateAndNumberFormats_`.
* Lines 4893-4897: `enforceTemplateDateAndNumberFormats_`.
* Lines 4898-4954: `enforceDateAndNumberFormatsForHeaders_`.
* Lines 4955-4961: `getExpectedNumberFormat_`.
* Lines 4962-4980: `getGoogleSheetsNumberFormat_`.
* Lines 4981-4985: `isDateFormatText_`.
* Lines 4986-4995: `applyHiddenColumnSettings_`.
* Lines 4996-5031: `applyHiddenColumnSettingsInRuns_`.
* Lines 5032-5057: `applyDataRows_`.
* Lines 5058-5084: `applyAlternatingColorRules_`.
* Lines 5085-5114: `applyMonthlyChangeSpacerRow3Format_`.
* Lines 5115-5160: `formatMonthlyChangeSubsectionBlock_`.
* Lines 5161-5178: `writeTemplateMetadata_`.
* Lines 5179-5211: `buildTemplateFormatSignature_`.
* Lines 5212-5225: `compactTemplateFormatSignature_`.
* Lines 5226-5234: `normalizeTemplateFormatSignature_`.
* Lines 5235-5240: `getTemplateFormatSignatureKey_`.
* Lines 5241-5249: `getStoredTemplateFormatSignature_`.
* Lines 5250-5269: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5270-5277: `storeTemplateFormatSignature_`.
* Lines 5278-5326: `ensureTemplateFilter_`.
* Lines 5327-5364: `applyTemplateFreezeAndTabColor_`.
* Lines 5365-5389: `resizeSheet_`.
* Lines 5390-5422: `resizeSheetGrid_`.
* Lines 5423-5427: `resizeSheetRows_`.
* Lines 5428-5431: `resizeSheetColumns_`.
* Lines 5432-5439: `getHeadersForSheetType_`.
* Lines 5440-5449: `getDefaultBehavior_`.
* Lines 5450-5461: `showSheetIfNeeded_`.
* Lines 5462-5475: `hideSheetIfNeeded_`.
* Lines 5476-5514: `formatMonthlySheets`.

### Monthly imports, report output creation, raw-data sync, and Demo P preprocessing

* Lines 5515-5523: `buildPromptedMonthContext_`.
* Lines 5524-5545: `formatMonthlyBannerSheet_`.
* Lines 5546-5579: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5580-5607: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5608-5675: `formatBannerReport`.
* Lines 5676-5697: `validateActiveBannerFormatterOutput`.
* Lines 5698-5715: `archiveActiveRawDataSheet`.
* Lines 5716-5748: `parseReportMonthInput_`.
* Lines 5749-5792: `promptForLockedYearReportMonth_`.
* Lines 5793-5796: `boolText_`.
* Lines 5797-5801: `isPrimaryPMRRowValue_`.
* Lines 5802-5829: `assignPrimaryPMRRows_`.
* Lines 5830-5841: `getCurrentBannersSheet_`.
* Lines 5842-5850: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5851-5862: `getCurrentCarePlanDueSheet_`.
* Lines 5863-5868: `getPreviousMasterListSheet_`.
* Lines 5869-5874: `getCurrentMasterListSheet_`.
* Lines 5875-5917: `applyStandardFormatting_`.
* Lines 5918-5927: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5928-5936: `forceStandardTitleCellAlignment_`.
* Lines 5937-5945: `captureHiddenSheetNames_`.
* Lines 5946-5962: `restorePreviouslyHiddenSheets_`.
* Lines 5963-5970: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5971-5974: `hidePreviousMonthSheets_`.
* Lines 5975-5989: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5990-6010: `applyIndexSheetRowFills_`.
* Lines 6011-6033: `applyCurrentVsOlderTabColors_`.
* Lines 6034-6037: `organizeSheetTabs_`.
* Lines 6038-6056: `formatDateColumnsByHeader_`.
* Lines 6057-6065: `rowObjectFromHeaders_`.
* Lines 6066-6070: `appendMasterListChangeLog_`.
* Lines 6071-6074: `getLiveDashboardAuditStatus_`.
* Lines 6075-6078: `getLiveTemplateValidationStatus_`.
* Lines 6079-6082: `getLiveFrameworkHealthStatus_`.
* Lines 6083-6088: `getLiveSheetStatus_`.
* Lines 6089-6094: `setMonthlySheetNameFast_`.
* Lines 6095-6250: `writePMRContactsToParticipantRows_`.
* Lines 6251-6259: `buildParticipantContactKey_`.
* Lines 6260-6266: `isExpiredContactPhoneDate_`.
* Lines 6267-6273: `capitalizeContactPart_`.
* Lines 6274-6289: `formatRankedContact_`.
* Lines 6290-6301: `getMostRecentDateFromRowsByHeader_`.
* Lines 6302-6312: `isDateInStrictLocalRangeInclusive_`.
* Lines 6313-6316: `isDateDisplayInReportWindow_`.
* Lines 6317-6326: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6327-6341: `getSheetTypeForOrganization_`.
* Lines 6342-6352: `collectFrameworkHealthCheckRows_`.
* Lines 6353-6360: `collectWorkflowSyncVerificationRows_`.
* Lines 6361-6369: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6370-6380: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6381-6391: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6392-6433: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6434-6451: `ensureStandardTitleRows_`.
* Lines 6452-6460: `isDateLikeHeader_`.
* Lines 6461-6464: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6465-6471: `formatReportDateLabel_`.
* Lines 6472-6476: `buildBannerReportOutputName_`.
* Lines 6477-6490: `renameSheetSafely_`.
* Lines 6491-6514: `deleteSheetIfExists_`.
* Lines 6515-6523: `writeBannerReportDates_`.
* Lines 6524-6574: `copyRawBannerDataToOutput_`.
* Lines 6575-6581: `ensureSheetHasAtLeastRows_`.
* Lines 6582-6609: `validateBannerFormatterOutput_`.
* Lines 6610-6633: `archiveRawSourceAndDeleteLocal_`.
* Lines 6634-6656: `archiveRawDataSheet_`.
* Lines 6657-6668: `hideMonthlyImportSheets`.
* Lines 6669-6679: `hideMonthlyActiveSheets`.
* Lines 6680-6704: `hideMonthlySheetsBySpecs_`.
* Lines 6705-6721: `archiveMonthlyImportSheets`.
* Lines 6722-6738: `archiveMonthlyActiveSheets`.
* Lines 6739-6777: `archiveMonthlySheetsBySpecs_`.
* Lines 6778-6801: `findArchiveMonthlyCandidateSheets_`.
* Lines 6802-6826: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6827-6835: `notifyArchiveMonthlySheetsResult_`.
* Lines 6836-6852: `deleteArchiveSheetIfExists_`.
* Lines 6853-6856: `formatMonthlyChangeSubheaderRow`.
* Lines 6857-6868: `formatMonthlyChangeSubsectionBlock`.
* Lines 6869-6873: `getMonthlyChangeSubsectionLabels`.
* Lines 6874-6893: `normalizeNumberFormatForCompare_`.
* Lines 6894-6899: `numberFormatsMatch_`.
* Lines 6900-7045: `validateTemplateFromDashboard_`.
* Lines 7046-7051: `writeTemplateValidationReport_`.
* Lines 7052-7138: `formatRawData`.
* Lines 7139-7156: `ensureRawDataHeaderRows_`.
* Lines 7157-7166: `rowLooksLikeParticipantHeader_`.
* Lines 7167-7173: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7174-7217: `enforceDemoPStrictDashboardSchema_`.
* Lines 7218-7229: `buildRawDataSourceArchiveName_`.
* Lines 7230-7241: `mapRowsToHeaders_`.
* Lines 7242-7259: `applyUniversalFastCanvasFormatting_`.
* Lines 7260-7291: `applyGovernedTextAndNumberFormats_`.
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
* Lines 10062-10224: `compareRawDemoPForChanges_`.
* Lines 10225-10292: `getRawDemoPDataForCompare_`.
* Lines 10293-10341: `compareSingleFieldAndAdd_`.
* Lines 10342-10384: `addMCRRow_`.
* Lines 10385-10403: `buildContactCompareMap_`.
* Lines 10404-10409: `getFieldValueFromRow_`.
* Lines 10410-10426: `buildParticipantName_`.
* Lines 10427-10434: `displayValueForReport_`.
* Lines 10435-10458: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10459-10464: `padRowToWidth_`.
* Lines 10465-10474: `stripMonthlyChangeNativeBandings_`.
* Lines 10475-10521: `getMonthlyChangeSectionSpecs_`.
* Lines 10522-10568: `buildMonthlyChangeSectionRows_`.
* Lines 10569-10576: `appendMonthlyChangeCompiledRow_`.
* Lines 10577-10606: `appendMonthlyChangeSectionBlock_`.
* Lines 10607-10659: `populateMonthlyChangeReportSections_`.
* Lines 10660-10675: `findMonthlyChangeSectionTitleRow_`.
* Lines 10676-10696: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10697-10790: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10791-10830: `writeDiagnosticReport_`.
* Lines 10831-10857: `runMonthlyUpdate`.
* Lines 10858-10863: `updateMasterList`.
* Lines 10864-10957: `updateMasterListForMonth_`.
* Lines 10958-11030: `createMasterList`.
* Lines 11031-11097: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11098-11104: `getMasterListTemplateHeaders_`.
* Lines 11105-11112: `createOrRefreshMasterListTemplate_`.
* Lines 11113-11119: `getOrCreateMasterListTemplate_`.
* Lines 11120-11176: `createMasterListSheetFromTemplate_`.
* Lines 11177-11183: `writeMasterListTitleDateBlock_`.
* Lines 11184-11192: `initializeMasterListTitleRows_`.
* Lines 11193-11210: `copyDemoPHeaderRowsToMasterList_`.

### Master List update/merge/display, index, and tab organization

* Lines 11211-11236: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11237-11244: `formatMasterListSheet_`.
* Lines 11245-11256: `getMonthPartsFromTitleRows_`.
* Lines 11257-11264: `updateCopiedMasterListHeader_`.
* Lines 11265-11419: `createIndexSheet`.
* Lines 11420-11423: `generateArchiveFileIndex_`.
* Lines 11424-11506: `enforceGlobalSheetSortOrder_`.
* Lines 11507-11525: `extractFirstDateFromSheetName_`.
* Lines 11526-11549: `parseIndexMonthDate_`.
* Lines 11550-11596: `organizeWorkbookTabs_`.
* Lines 11597-11614: `hideSystemAndTestingSheets_`.
* Lines 11615-11630: `getSystemAndTestingSheetNames_`.
* Lines 11631-11649: `isSystemOrTestingSheet_`.
* Lines 11650-11656: `assignSortOrderAndHideExtraRows`.
* Lines 11657-11662: `applySortOrderDisplayForMasterList_`.
* Lines 11663-11689: `buildParticipantBlocksForSortOrder_`.
* Lines 11690-11697: `showAllMasterListRows`.
* Lines 11698-11702: `groupMasterListRowsByPMR_`.
* Lines 11703-11706: `hideRowsWithBlankDOB_`.
* Lines 11707-11766: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11767-11785: `getPrimaryRowScore_`.
* Lines 11786-11810: `hideNonPrimaryPMRRows_`.
* Lines 11811-11828: `hideRowNumberBatches_`.
* Lines 11829-11840: `clearAllRowGroupsIfPossible_`.
* Lines 11841-11847: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11848-11853: `applyFinalMasterListColorAndDisplay_`.
* Lines 11854-11857: `applyMasterListDisplaySettings_`.
* Lines 11858-11865: `processMasterListFull_`.
* Lines 11866-11869: `processMasterListDataOnly_`.
* Lines 11870-11904: `processMasterListSingleDataPass_`.
* Lines 11905-11923: `populateParticipantNameData_`.
* Lines 11924-11940: `populateDemoPNameData_`.
* Lines 11941-11965: `updateBannerColumnData_`.
* Lines 11966-11979: `combineAddressesData_`.
* Lines 11980-12001: `handleLanguageData_`.
* Lines 12002-12028: `splitPhoneNumbersData_`.
* Lines 12029-12033: `runMasterContactProcessData_`.
* Lines 12034-12060: `combineNotesSummaryData_`.
* Lines 12061-12070: `rebuildChangedPMRsFromDemoP_`.
* Lines 12071-12096: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12097-12123: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12124-12153: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12154-12164: `getPMRsForMonthlyChangeSections_`.
* Lines 12165-12193: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12194-12241: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12242-12313: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12314-12323: `buildMappedMasterRowFromDemoRow_`.
* Lines 12324-12333: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12334-12341: `hideSystemSheetsNow`.
* Lines 12342-12374: `showSystemSheetsNow`.
* Lines 12375-12393: `getPrimaryMergeRowItem_`.
* Lines 12394-12463: `getPrimaryRowChangedColumnDetails_`.
* Lines 12464-12473: `formatMergeAuditValueForDisplay_`.
* Lines 12474-12479: `getMergeAuditParticipantName_`.
* Lines 12480-12500: `getMergeAuditParticipantNameFromRows_`.
* Lines 12501-12524: `buildMergeAuditContactSummary_`.
* Lines 12525-12557: `getMergeAuditChangedFields_`.
* Lines 12558-12581: `buildMergeRowsByPMRFromData_`.
* Lines 12582-12611: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12612-12641: `buildMergeKeyMapForRows_`.
* Lines 12642-12665: `buildContactMergeRowKey_`.
* Lines 12666-12680: `getMergeRowValue_`.
* Lines 12681-12711: `createDisenrolledList`.
* Lines 12712-12732: `processBlankContactSummariesOnDemoP_`.
* Lines 12733-12784: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12785-12802: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12803-12820: `loadDisenrolledPMRSetForMonth_`.
* Lines 12821-12825: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12826-12914: `moveDisenrolledPMRsFromDemoPToExclusion_`.

### Disenrollment/exclusion and Monthly Change output row helpers

* Lines 12915-12982: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 12983-12994: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 12995-13036: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13037-13056: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13057-13096: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13097-13209: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13210-13214: `getCurrentRawDataSheet_`.
* Lines 13215-13219: `getPreviousRawDataSheet_`.
* Lines 13220-13227: `getCurrentDemoPSheet_`.
* Lines 13228-13233: `getPreviousDemoPSheet_`.
* Lines 13234-13245: `getMonthlyChangeReportHeaders_`.
* Lines 13246-13251: `getMonthlyChangeReportDateIndexes_`.
* Lines 13252-13281: `convertMonthlyChangeReportDateValues_`.
* Lines 13282-13302: `buildMonthlyChangeReportRow_`.
* Lines 13303-13322: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13323-13329: `runDashboardQualityStartUp`.
* Lines 13330-13383: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13384-13393: `getDashboardVerificationPassRow_`.
* Lines 13394-13398: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13399-13404: `getDashboardSectionHeaderWidth_`.
* Lines 13405-13414: `collectBlankDashboardCells_`.
* Lines 13415-13446: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13447-13483: `collectFormatDashboardTitleRowsVerificationRows_`.
* Lines 13484-13512: `collectFormatDashboardSheetDefinitionVerificationRows_`.

### Dashboard Quality, framework health, system verification, and timing wrappers

* Lines 13513-13549: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13550-13579: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13580-13608: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13609-13618: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13619-13623: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13624-13631: `runDashboardQualitySectionIfDue_`.
* Lines 13632-13635: `runDashboardQualityQuick`.
* Lines 13636-13643: `runDashboardQualityValidateTemplates`.
* Lines 13644-13675: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13676-13687: `getDashboardQualitySectionRegistry_`.
* Lines 13688-13737: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13738-13744: `runDashboardQualityPerformanceSummary_`.
* Lines 13745-13765: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13766-13818: `runDashboardQualityFull`.
* Lines 13819-13827: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13828-13900: `repairAllTemplateDateFormats`.
* Lines 13901-13906: `normalizeSectionRowForWidth_`.
* Lines 13907-13912: `rowHasAnyValue_`.
* Lines 13913-13918: `trimTrailingBlankRows_`.
* Lines 13919-13940: `getDefaultDashboardQualityDetailHeader_`.
* Lines 13941-13958: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 13959-13966: `getDashboardQualityNotRunMessage_`.
* Lines 13967-13982: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 13983-14022: `normalizeDashboardQualitySectionBlock_`.
* Lines 14023-14065: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14066-14073: `getDashboardQualitySectionTitleForKey_`.
* Lines 14074-14081: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14082-14098: `hasDashboardQualityTemplateShell_`.
* Lines 14099-14117: `initializeDashboardQualitySheet_`.
* Lines 14118-14135: `initializeSystemSheets_`.
* Lines 14136-14150: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14151-14154: `ensureDashboardQualityReportSheet_`.
* Lines 14155-14163: `ensureDashboardQualityTemplateShell_`.
* Lines 14164-14168: `ensureDashboardQualitySectionShells_`.
* Lines 14169-14174: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14175-14222: `applyDashboardQualityReportColumnSettings_`.
* Lines 14223-14233: `styleDashboardQualityReport_`.
* Lines 14234-14237: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14238-14242: `isDashboardQualityNotesLabel_`.
* Lines 14243-14273: `normalizeDashboardQualityOutputRow_`.
* Lines 14274-14278: `getDashboardQualitySectionLetter_`.
* Lines 14279-14284: `normalizeDashboardQualityIssueValue_`.
* Lines 14285-14317: `normalizeDashboardQualityRowsForSection_`.
* Lines 14318-14325: `normalizeDashboardQualityDataRows_`.
* Lines 14326-14348: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14349-14367: `getStatusFromDashboardQualityRows_`.
* Lines 14368-14389: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14390-14409: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14410-14417: `dashboardQualityRowsEqualValues_`.
* Lines 14418-14447: `saveDashboardQualitySectionRows_`.
* Lines 14448-14459: `getDashboardQualitySectionRows_`.
* Lines 14460-14470: `deleteLegacyQualityReportSheet_`.
* Lines 14471-14477: `deleteLegacyStandaloneQualityReports_`.
* Lines 14478-14485: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14486-14498: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14499-14507: `getStoredDashboardQualityOverallStatus_`.
* Lines 14508-14519: `getStoredDashboardQualityFailureNotes_`.
* Lines 14520-14525: `buildDatedDisenrolledOutputName_`.
* Lines 14526-14536: `forceSheetRowCount_`.
* Lines 14537-14570: `buildCombinedFrameworkTestDashboard`.
* Lines 14571-14576: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14577-14588: `updateDashboardQualitySignoffSection_`.
* Lines 14589-14599: `updateDashboardQualitySummarySection_`.
* Lines 14600-14603: `updateDashboardQualityTimingSummarySection_`.
* Lines 14604-14632: `getDashboardQualitySectionBoundsMap_`.
* Lines 14633-14693: `replaceDashboardQualitySectionsRows_`.
* Lines 14694-14710: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14711-14784: `replaceDashboardQualitySectionRows_`.
* Lines 14785-14799: `findDashboardQualitySectionRow_`.
* Lines 14800-14810: `findNextDashboardQualitySectionRow_`.
* Lines 14811-14830: `dashboardQualitySectionContentMatches_`.
* Lines 14831-14848: `mergeDashboardQualityStyleRanges_`.
* Lines 14849-14938: `styleDashboardQualityUpdatedSections_`.
* Lines 14939-14958: `appendCombinedDashboardSignOffRows_`.
* Lines 14959-14989: `buildFrameworkSummaryRows_`.
* Lines 14990-15009: `getStoredSectionStatusAndNotes_`.
* Lines 15010-15025: `getReportOverallStatus_`.
* Lines 15026-15045: `getReportFailureNotes_`.
* Lines 15046-15072: `runFrameworkHealthCheck`.
* Lines 15073-15078: `getFrameworkHealthCheckIssueRows_`.
* Lines 15079-15090: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15091-15097: `appendRequiredFunctionChecks_`.
* Lines 15098-15105: `existsFunctionByName_`.
* Lines 15106-15110: `writeFrameworkHealthCheckReport_`.
* Lines 15111-15122: `normalizeFrameworkHealthCheckRows_`.
* Lines 15123-15138: `getRequiredHelperFunctionNames_`.
* Lines 15139-15180: `getRequiredMenuFunctionNames_`.
* Lines 15181-15190: `getRequiredDashboardFunctionNames_`.
* Lines 15191-15199: `getRequiredTemplateFunctionNames_`.
* Lines 15200-15207: `getRequiredValidationFunctionNames_`.
* Lines 15208-15216: `getRequiredTimingFunctionNames_`.
* Lines 15217-15229: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15230-15233: `runWorkflowSyncVerification`.
* Lines 15234-15241: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15242-15247: `setupSystemSheets`.
* Lines 15248-15303: `verifyFrameworkConfiguration`.
* Lines 15304-15323: `runFrameworkTimed_`.
* Lines 15324-15334: `startFrameworkTiming_`.
* Lines 15335-15359: `markFrameworkStep_`.
* Lines 15360-15365: `writeFrameworkTimingReport_`.
* Lines 15366-15369: `writeTimingReport_`.
* Lines 15370-15386: `trimTimingReportRows_`.
* Lines 15387-15466: `rebuildProductionMonthlyChangeTemplate`.

## Verification Commands

* `cp 'Current_Production Script/v.1.6.26_Production_Script' /tmp/v1626.js && node --check /tmp/v1626.js`
* `python3` static scanner for version, metrics, architecture section coverage, and function inventory generation.
* `rg` targeted scans for removed Section G flag, Test 6 artifacts, metadata shells, loop-time A1 notation, single-row hide loops, title-info Logger catches, Demo P clear/rewrite deletion flow, and obsolete signature wrapper.
