# AUDIT v1.6.26.2 Static Analysis Report

Source audited: `Current_Production Script/v.1.6.26_Production_Script`. The file currently declares `MASTER_LIST_MERGE_ML_VERSION = "1.6.26.2"` and contains 15,478 lines.

## Methodology

* Ran JavaScript syntax validation by copying the Apps Script monolith to `/tmp/v1626.js` and executing `node --check /tmp/v1626.js`.
* Performed targeted static scans for `Logger.log`-only catches, phantom-row `Math.max(..., 1)` range inflation, per-row/per-column Sheets API loops, retired framework-test artifacts, positional Monthly Change contact diffing, duplicate signature builders, and version metadata.
* Generated a complete function declaration inventory from the current source so every named function has a line range for follow-up review.
* Reviewed the previously patched hot spots line-by-line: version metadata, governed formatting, hidden-column settings, output sheet creation, Demo P date formatting and flattening, Monthly Change signatures/contact diffing, date conversion, and Dashboard Quality Test 6 removal.

## Executive Summary

The v1.6.26.2 script parses successfully and the requested Super-Patch is materially present. The most important remediations are in place: version metadata is updated, key no-data formatting guards prevent phantom row 5 writes in the patched paths, hidden-column and date/number format fallbacks now fail fast, header font sizing no longer calls `getRange(...).getA1Notation()` inside the header loop, Demo P flattening releases grouped PMR references, Monthly Change no longer compares contacts by raw ordinal position, and retired Test 6 execution artifacts were removed.

Residual risk remains in broader framework areas outside the immediate Super-Patch: many best-effort `Logger.log("... skipped")` catches still exist in cosmetic and semi-governance formatting paths; several RangeList A1 builders still call `getRange(...).getA1Notation()` inside loops; legacy `buildColumnSignatureForSection_` remains defined even though the patched flow uses the bulk signature helper; and some show/clear helpers still use `Math.max(..., 1)` to avoid zero-sized ranges. These do not invalidate the patch, but they should be tracked in the next hardening pass.

## Super-Patch Verification Findings

### PASS: Version metadata is correctly bumped to v1.6.26.2

The file banner and `MASTER_LIST_MERGE_ML_VERSION` constant both identify v1.6.26.2.

**Evidence:** Lines 1-32.

### PASS: Primary-row fallback TypeError guard is present

`assignPrimaryRowForBlock_` returns before touching `block.rows[0]` when the block is missing, empty, or the primary index is undefined.

**Evidence:** Lines 1291-1293.

### PASS: Header font-size A1 generation avoids per-header range API calls

`rowColToA1_` generates A1 notation by math, and `applyHeaderRow_` uses it for the `RangeList` font-size groups.

**Evidence:** Lines 4790-4835.

### PASS: Date/number format enforcement no longer falls back to per-range writes

`enforceDateAndNumberFormatsForHeaders_` requires `getRangeList` and throws on batch failure instead of looping through individual ranges.

**Evidence:** Lines 4900-4952.

### PASS: Hidden-column fallback loop is removed

`applyHiddenColumnSettingsInRuns_` now throws when a bulk hide/show run fails; the old per-column retry loop is gone.

**Evidence:** Lines 4998-5028.

### PASS: Universal canvas formatting no-ops on sheets with no governed data rows

`applyUniversalFastCanvasFormatting_` checks `lastRow < DATA_START_ROW` before applying row-level wrap formatting.

**Evidence:** Lines 7248-7263.

### PASS: Governed text/number formatting no-ops for explicit zero/negative row counts

`applyGovernedTextAndNumberFormats_` calculates `requestedRows` and returns when fewer than one governed row is requested.

**Evidence:** Lines 7266-7288.

### PASS: Output creation now fails fast on core copy/style/environment failures

The main and Raw Data output creation paths throw on style paint and environmental configuration failures rather than logging and continuing.

**Evidence:** Lines 7305-7449.

### PASS: Demo P date formatting is guarded and fail-fast

`applyDemoPDateFormattingByHeader_` returns on no data rows and throws if date formatting or title date formatting fails.

**Evidence:** Lines 9584-9603.

### PASS: Demo P flattening releases PMR group references

`flattenDemoPContactsToPrimaryRows_` calls `grouped.set(pmr, null)` after pushing each flattened output row.

**Evidence:** Lines 8795-8835.

### PASS: Monthly Change signatures are precomputed by section

`getChangedColumnsForSectionRows_` uses `buildColumnSignaturesForSection_` for current/previous groups before looping headers.

**Evidence:** Lines 10022-10049.

### PASS: Monthly Change contact diffing is key-aligned, not ordinal-aligned

`compareRawDemoPForChanges_` builds previous/current contact maps and compares the union of keys. `buildContactCompareMap_` uses PMR, contact name, relationship, and phone information with duplicate disambiguation.

**Evidence:** Lines 10184-10220 and 10387-10404.

### PASS: Monthly Change date conversion uses precomputed indexes

Report date indexes are calculated by `getMonthlyChangeReportDateIndexes_` and passed into `convertMonthlyChangeReportDateValues_` via `buildMonthlyChangeReportRow_`.

**Evidence:** Lines 13258-13292.

### PASS: Retired Test 6 execution surface is removed from current source

Targeted scan found no `RFF_TEST6_DATE_FORMAT_SHEET`, `runFrameworkTest6DateFormatting`, `runFrameworkTest6DateFormattingCore_`, `testDateFormattingForTemplate_`, or `writeFrameworkTest6DateFormatReport_` references.

**Evidence:** Verified by `rg` static scan.

## Residual Static Findings / Next Hardening Pass

### MEDIUM: Best-effort `Logger.log("... skipped")` catches remain throughout non-patched formatting and dashboard-quality paths

The script still contains 104 `Logger.log(` calls and 138 `catch (` blocks. Some are intentionally cosmetic, but title/info writes, template signatures, filters, row heights, Dashboard Quality writes, and tab visibility paths should be classified as either safe best-effort or governance-critical.

### MEDIUM: Loop-time A1 construction via `getRange(...).getA1Notation()` still exists outside header font sizing

Examples remain in dashboard section styling, Framework Timing section styling, governed text/number format grouping, global sheet sort display, and Dashboard Quality shell clear/styling. These are not the specific header-font issue, but the same Range construction pattern can be optimized with pure A1 helpers.

### LOW: Legacy single-column signature helper remains defined

`buildColumnSignatureForSection_` remains as a callable helper even though the patched path now uses `buildColumnSignaturesForSection_`. If no external Apps Script/manual caller needs it, it can be removed in a later dead-code cleanup.

### LOW: `Math.max(..., 1)` still appears in range-protection/show/clear helpers

Remaining cases are mostly defensive zero-range avoidance rather than the patched phantom-format paths. They should still be reviewed if operators report unexpected used-range growth.

### LOW: No `TODO` or `FIXME` markers exist

This makes source-level intent harder to infer; future hardening should document which catches and formatting writes are intentionally best effort.

## Recommended Remediation Queue

1. Classify all remaining `Logger.log("... skipped")` catches as cosmetic, recoverable, or hard-fail governance failures.
2. Replace remaining loop-time `getRange(...).getA1Notation()` builders with pure A1 math helpers where RangeList strings are all that is needed.
3. Remove `buildColumnSignatureForSection_` if no menu/manual/external Apps Script caller requires the legacy helper.
4. Review `Math.max(..., 1)` show/clear helpers for possible used-range side effects; preserve them only where Apps Script API zero-range limitations require them.
5. Add a small Apps Script smoke-test harness that mocks no-data sheets, one-row sheets, and duplicate contact-key scenarios before the next production release.

## Line-by-Line Function Inventory

The following inventory lists every detected named function declaration and its current source line range. This is the practical line-by-line map for future remediation and review.

### Configuration, dashboard defaults, quick setup, and base utilities

* Lines 235-241: `h_`.
* Lines 242-355: `getDefaultColumnDefinitionRows_`.
* Lines 356-374: `getAllUniqueHeaders_`.
* Lines 375-474: `getColumnStandards_`.
* Lines 475-488: `c_`.
* Lines 489-502: `writeDashboardTitle_`.
* Lines 503-537: `writeDashboardSection_`.
* Lines 538-569: `styleDashboard_`.
* Lines 570-573: `setupReportFormattingDashboard`.
* Lines 574-582: `appendDashboardSectionRows_`.
* Lines 583-616: `getResolvedDefaultColumnDefinitionRows_`.
* Lines 617-691: `writeDashboardDefaultsFast_`.
* Lines 692-695: `rebuildFormatDashboardDefaults`.
* Lines 696-710: `setupReportFormattingDashboardFromScriptDefaults_`.
* Lines 711-729: `normalizeDashboardSheetTypeKey_`.
* Lines 730-736: `getSheetDefinitionByTypeOrNull_`.
* Lines 737-742: `getSheetDefinitionByType_`.
* Lines 743-756: `sortSheetDefinitionsByProductionOrder_`.
* Lines 757-764: `notify_`.
* Lines 765-776: `trimExcessRows_`.
* Lines 777-810: `hideOldDisenrolledRows_`.
* Lines 811-815: `showQuickStartToast_`.
* Lines 816-827: `quickSystemSetup`.
* Lines 828-835: `quickBuildAllTemplates`.
* Lines 836-840: `notifyErrorWithTiming_`.
* Lines 841-845: `isBlankCell_`.
* Lines 846-895: `coerceToValidDate_`.
* Lines 896-920: `spreadsheetSerialDateToLocalDate_`.
* Lines 921-925: `isReasonableReportDate_`.
* Lines 926-929: `createLocalDateOnly_`.
* Lines 930-934: `getTodayLocalDate_`.
* Lines 935-959: `getMonthDateParts_`.
* Lines 960-963: `formatDateForSheetName_`.
* Lines 964-968: `formatDateDisplay_`.
* Lines 969-973: `dateKey_`.
* Lines 974-977: `isSameDate_`.
* Lines 978-982: `isSameMonth_`.
* Lines 983-987: `buildMonthlySheetName_`.
* Lines 988-993: `buildStandardMonthlySheetName_`.
* Lines 994-1024: `getNewestFormattedMonthlySheetByPrefix_`.

### Raw helpers, timing report shell, and framework timing utilities

* Lines 1025-1058: `getMonthlySheetByPrefixAndDate_`.
* Lines 1059-1091: `setUniqueSheetName_`.
* Lines 1092-1111: `getHeaders_`.
* Lines 1112-1126: `getHeaderMap_`.
* Lines 1127-1135: `buildHeaderIndexMap_`.
* Lines 1136-1142: `findHeaderIndex_`.
* Lines 1143-1150: `normalizeHeader_`.
* Lines 1151-1157: `normalizePMR_`.
* Lines 1158-1161: `getPMRIndex_`.
* Lines 1162-1165: `getDOBIndex_`.
* Lines 1166-1184: `normalizeKeyPart_`.
* Lines 1185-1224: `getDataValues_`.
* Lines 1225-1258: `getRawDataSourceDataForOutput_`.
* Lines 1259-1273: `rawDataSourceHeaderRow_`.
* Lines 1274-1290: `ensurePrimaryPMRRowColumn_`.
* Lines 1291-1317: `assignPrimaryRowForBlock_`.
* Lines 1318-1351: `deleteRowNumberBatches_`.
* Lines 1352-1361: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1362-1388: `ensureHeaders_`.
* Lines 1389-1392: `ensureBannerSummaryOutputHeaders_`.
* Lines 1393-1406: `ensureContactOutputHeaders_`.
* Lines 1407-1416: `trimOutputSheetToDataSize_`.
* Lines 1417-1451: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1452-1457: `applyFinalRowHeightLock_`.
* Lines 1458-1487: `normalizeCompareValue_`.
* Lines 1488-1491: `valuesAreEqual_`.
* Lines 1492-1495: `normalizeText_`.
* Lines 1496-1499: `normalizeKey_`.
* Lines 1500-1504: `numberOrDefault_`.
* Lines 1505-1514: `parseBoolean_`.
* Lines 1515-1529: `clearHeaderCacheForSheet_`.
* Lines 1530-1534: `clearSheetRuntimeCachesForSheet_`.
* Lines 1535-1541: `getHeaderCacheKey_`.
* Lines 1542-1547: `clearMonthlySheetLookupCache_`.
* Lines 1548-1554: `getMonthlySheetLookupCacheKey_`.
* Lines 1555-1558: `getSheetDimensionCacheKey_`.
* Lines 1559-1564: `clearSheetDimensionCacheForSheet_`.
* Lines 1565-1584: `getSheetDimensions_`.
* Lines 1585-1590: `dateOnlyLocalClone_`.
* Lines 1591-1595: `monthKey_`.
* Lines 1596-1615: `parseStandardMonthlySheetDateFromName_`.
* Lines 1616-1650: `buildRowsByPMR_`.
* Lines 1651-1657: `safeSheetName_`.
* Lines 1658-1661: `compareValues_`.
* Lines 1662-1665: `toBool_`.
* Lines 1666-1669: `truthy_`.
* Lines 1670-1673: `toNumber_`.
* Lines 1674-1689: `resizeSheetMinimum_`.
* Lines 1690-1700: `getThemeColorsFromBase_`.
* Lines 1701-1705: `getGlobalBorderStyle_`.
* Lines 1706-1716: `normalizeHex_`.
* Lines 1717-1723: `hexWithHslLightness_`.
* Lines 1724-1732: `hexToRgb_`.
* Lines 1733-1740: `rgbToHex_`.
* Lines 1741-1762: `rgbToHsl_`.
* Lines 1763-1785: `hslToRgb_`.
* Lines 1786-1798: `startRuntimeTiming_`.
* Lines 1799-1825: `markRuntimeStep_`.
* Lines 1826-1830: `addRuntimeCounter_`.
* Lines 1831-1835: `logRuntimeInfo_`.
* Lines 1836-1840: `logRuntimeWarning_`.
* Lines 1841-1845: `logRuntimeError_`.
* Lines 1846-1862: `logRuntimeTiming_`.
* Lines 1863-1870: `getRuntimeTimingSeverity_`.
* Lines 1871-1874: `getRuntimeTimingReportName_`.
* Lines 1875-1880: `writeRuntimeTimingReport_`.
* Lines 1881-1884: `writeConsolidatedTimingSummaryReport_`.
* Lines 1885-1902: `writeCombinedFrameworkTimingReport_`.
* Lines 1903-1906: `getFrameworkTimingRetentionLimit_`.
* Lines 1907-1910: `getFrameworkTimingReportSheetName_`.
* Lines 1911-1935: `getFrameworkTimingSectionRegistry_`.
* Lines 1936-1948: `findFrameworkTimingSectionRow_`.
* Lines 1949-1961: `findNextFrameworkTimingSectionRow_`.
* Lines 1962-1980: `collectExistingFrameworkTimingSectionBlocks_`.
* Lines 1981-1992: `buildDefaultFrameworkTimingSectionBlock_`.
* Lines 1993-2022: `normalizeFrameworkTimingSectionBlock_`.
* Lines 2023-2064: `rebuildFrameworkTimingReportShellCompact_`.
* Lines 2065-2090: `hasFrameworkTimingReportShell_`.
* Lines 2091-2109: `initializeFrameworkTimingSheet_`.
* Lines 2110-2113: `ensureFrameworkTimingReport_`.
* Lines 2114-2127: `trimSheetToColumnCount_`.
* Lines 2128-2230: `styleFrameworkTimingReport_`.
* Lines 2231-2238: `getFrameworkTimingSectionForId_`.
* Lines 2239-2283: `replaceFrameworkTimingSectionRows_`.
* Lines 2284-2301: `getFrameworkTimingBenchmarkForProcess_`.
* Lines 2302-2309: `getFrameworkTimingThresholdForSeverity_`.
* Lines 2310-2318: `ensureFrameworkTimingReportShell_`.
* Lines 2319-2325: `getFrameworkTimingDetailStartRow_`.
* Lines 2326-2349: `getFrameworkTimingDetailRows_`.
* Lines 2350-2370: `getLatestFrameworkTimingRowsByProcess_`.
* Lines 2371-2380: `getFrameworkTimingBenchmarkSeverity_`.
* Lines 2381-2389: `getFrameworkTimingModeForStep_`.
* Lines 2390-2394: `mergeFrameworkTimingModes_`.
* Lines 2395-2472: `buildFrameworkTimingProcessSummaryRows_`.
* Lines 2473-2482: `formatTimingTimestampForSummary_`.
* Lines 2483-2512: `buildFrameworkTimingIssueRows_`.
* Lines 2513-2529: `buildFrameworkTimingRecommendationRows_`.
* Lines 2530-2533: `writeFrameworkPerformanceRecommendationsSheet_`.
* Lines 2534-2573: `getPerformanceRecommendationForTimingStep_`.
* Lines 2574-2580: `worseTimingSeverity_`.
* Lines 2581-2606: `appendRuntimeTimingToFrameworkTimingReport_`.
* Lines 2607-2615: `formatSeconds_`.
* Lines 2616-2619: `refreshFrameworkTimingReport`.
* Lines 2620-2673: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2674-2748: `onOpen`.

### Menu callbacks, dashboard config, template building, and formatting primitives

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
* Lines 5212-5231: `compactTemplateFormatSignature_`.
* Lines 5232-5240: `normalizeTemplateFormatSignature_`.
* Lines 5241-5246: `getTemplateFormatSignatureKey_`.
* Lines 5247-5255: `getStoredTemplateFormatSignature_`.
* Lines 5256-5275: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5276-5283: `storeTemplateFormatSignature_`.
* Lines 5284-5332: `ensureTemplateFilter_`.
* Lines 5333-5370: `applyTemplateFreezeAndTabColor_`.
* Lines 5371-5395: `resizeSheet_`.
* Lines 5396-5428: `resizeSheetGrid_`.
* Lines 5429-5433: `resizeSheetRows_`.
* Lines 5434-5437: `resizeSheetColumns_`.
* Lines 5438-5445: `getHeadersForSheetType_`.
* Lines 5446-5455: `getDefaultBehavior_`.
* Lines 5456-5467: `showSheetIfNeeded_`.
* Lines 5468-5481: `hideSheetIfNeeded_`.
* Lines 5482-5520: `formatMonthlySheets`.

### Monthly import/output formatting, archives, and raw-data output creation

* Lines 5521-5529: `buildPromptedMonthContext_`.
* Lines 5530-5551: `formatMonthlyBannerSheet_`.
* Lines 5552-5585: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5586-5613: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5614-5681: `formatBannerReport`.
* Lines 5682-5703: `validateActiveBannerFormatterOutput`.
* Lines 5704-5721: `archiveActiveRawDataSheet`.
* Lines 5722-5754: `parseReportMonthInput_`.
* Lines 5755-5798: `promptForLockedYearReportMonth_`.
* Lines 5799-5802: `boolText_`.
* Lines 5803-5807: `isPrimaryPMRRowValue_`.
* Lines 5808-5835: `assignPrimaryPMRRows_`.
* Lines 5836-5847: `getCurrentBannersSheet_`.
* Lines 5848-5856: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5857-5868: `getCurrentCarePlanDueSheet_`.
* Lines 5869-5874: `getPreviousMasterListSheet_`.
* Lines 5875-5880: `getCurrentMasterListSheet_`.
* Lines 5881-5923: `applyStandardFormatting_`.
* Lines 5924-5933: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5934-5942: `forceStandardTitleCellAlignment_`.
* Lines 5943-5951: `captureHiddenSheetNames_`.
* Lines 5952-5968: `restorePreviouslyHiddenSheets_`.
* Lines 5969-5976: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5977-5980: `hidePreviousMonthSheets_`.
* Lines 5981-5995: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5996-6016: `applyIndexSheetRowFills_`.
* Lines 6017-6039: `applyCurrentVsOlderTabColors_`.
* Lines 6040-6043: `organizeSheetTabs_`.
* Lines 6044-6062: `formatDateColumnsByHeader_`.
* Lines 6063-6071: `rowObjectFromHeaders_`.
* Lines 6072-6076: `appendMasterListChangeLog_`.
* Lines 6077-6080: `getLiveDashboardAuditStatus_`.
* Lines 6081-6084: `getLiveTemplateValidationStatus_`.
* Lines 6085-6088: `getLiveFrameworkHealthStatus_`.
* Lines 6089-6094: `getLiveSheetStatus_`.
* Lines 6095-6100: `setMonthlySheetNameFast_`.
* Lines 6101-6256: `writePMRContactsToParticipantRows_`.
* Lines 6257-6265: `buildParticipantContactKey_`.
* Lines 6266-6272: `isExpiredContactPhoneDate_`.
* Lines 6273-6279: `capitalizeContactPart_`.
* Lines 6280-6295: `formatRankedContact_`.
* Lines 6296-6307: `getMostRecentDateFromRowsByHeader_`.
* Lines 6308-6318: `isDateInStrictLocalRangeInclusive_`.
* Lines 6319-6322: `isDateDisplayInReportWindow_`.
* Lines 6323-6332: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6333-6347: `getSheetTypeForOrganization_`.
* Lines 6348-6358: `collectFrameworkHealthCheckRows_`.
* Lines 6359-6366: `collectWorkflowSyncVerificationRows_`.
* Lines 6367-6375: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6376-6386: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6387-6397: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6398-6439: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6440-6457: `ensureStandardTitleRows_`.
* Lines 6458-6466: `isDateLikeHeader_`.
* Lines 6467-6470: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6471-6477: `formatReportDateLabel_`.
* Lines 6478-6482: `buildBannerReportOutputName_`.
* Lines 6483-6496: `renameSheetSafely_`.
* Lines 6497-6520: `deleteSheetIfExists_`.
* Lines 6521-6529: `writeBannerReportDates_`.
* Lines 6530-6580: `copyRawBannerDataToOutput_`.
* Lines 6581-6587: `ensureSheetHasAtLeastRows_`.
* Lines 6588-6615: `validateBannerFormatterOutput_`.
* Lines 6616-6639: `archiveRawSourceAndDeleteLocal_`.
* Lines 6640-6662: `archiveRawDataSheet_`.
* Lines 6663-6674: `hideMonthlyImportSheets`.
* Lines 6675-6685: `hideMonthlyActiveSheets`.
* Lines 6686-6710: `hideMonthlySheetsBySpecs_`.
* Lines 6711-6727: `archiveMonthlyImportSheets`.
* Lines 6728-6744: `archiveMonthlyActiveSheets`.
* Lines 6745-6783: `archiveMonthlySheetsBySpecs_`.
* Lines 6784-6807: `findArchiveMonthlyCandidateSheets_`.
* Lines 6808-6832: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6833-6841: `notifyArchiveMonthlySheetsResult_`.
* Lines 6842-6858: `deleteArchiveSheetIfExists_`.
* Lines 6859-6862: `formatMonthlyChangeSubheaderRow`.
* Lines 6863-6874: `formatMonthlyChangeSubsectionBlock`.
* Lines 6875-6879: `getMonthlyChangeSubsectionLabels`.
* Lines 6880-6899: `normalizeNumberFormatForCompare_`.
* Lines 6900-6905: `numberFormatsMatch_`.
* Lines 6906-7051: `validateTemplateFromDashboard_`.
* Lines 7052-7057: `writeTemplateValidationReport_`.
* Lines 7058-7144: `formatRawData`.
* Lines 7145-7162: `ensureRawDataHeaderRows_`.
* Lines 7163-7172: `rowLooksLikeParticipantHeader_`.
* Lines 7173-7179: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7180-7223: `enforceDemoPStrictDashboardSchema_`.
* Lines 7224-7235: `buildRawDataSourceArchiveName_`.
* Lines 7236-7247: `mapRowsToHeaders_`.
* Lines 7248-7265: `applyUniversalFastCanvasFormatting_`.
* Lines 7266-7292: `applyGovernedTextAndNumberFormats_`.
* Lines 7293-7304: `applyOutputVisibilityPolicy_`.
* Lines 7305-7378: `createOutputSheetFromDashboardTemplate_`.
* Lines 7379-7456: `createRawDataOutputSheetFromTemplateFast_`.
* Lines 7457-7489: `ensureOutputSheetHasFormattedRows_`.
* Lines 7490-7571: `syncRawDataBannerColumns_`.
* Lines 7572-7613: `buildSourceMapByCompositeKeyForDemoPBanner_`.
* Lines 7614-7622: `formatCarePlanDueReport`.
* Lines 7623-7631: `formatUnlockedCarePlanReport`.
* Lines 7632-7726: `formatCarePlanDueOrUnlockedFromDashboard_`.
* Lines 7727-7753: `buildRawArchiveNameForSheetType_`.
* Lines 7754-7780: `collectAndClearMovedTitleInfoCells_`.
* Lines 7781-7787: `prepareCarePlanSourceSheetForDashboardFormat_`.
* Lines 7788-7801: `prepareRawDataSourceSheetForDashboardFormat_`.
* Lines 7802-7812: `buildRawDataHeadersForFormatting_`.
* Lines 7813-7818: `getRawDataApprovedAddedColumns_`.
* Lines 7819-7842: `processRawDataApprovedSyncColumns_`.
* Lines 7843-7884: `writeChangedColumnsOnly_`.
* Lines 7885-7943: `getRawDataDemoPSourceHeaders_`.
* Lines 7944-7994: `getRawDataDisallowedWorkingColumns_`.
* Lines 7995-8002: `isOngoingOutputSheetType_`.
* Lines 8003-8037: `buildDashboardOutputSheetName_`.
* Lines 8038-8043: `syncMasterListMonthlySourcesIntoData_`.
* Lines 8044-8072: `syncBannerSourceIntoData_`.
* Lines 8073-8107: `syncUnlockedCarePlanSourceIntoData_`.
* Lines 8108-8141: `syncCarePlanDueSourceIntoData_`.
* Lines 8142-8181: `syncRowsFromSourceMapData_`.
* Lines 8182-8219: `buildSourceMapBySingleKeyForPart5_`.
* Lines 8220-8261: `buildSourceMapByCompositeKeyForPart5_`.
* Lines 8262-8286: `shouldProcessRowByPMR_`.
* Lines 8287-8294: `normalizeSyncFieldPairs_`.
* Lines 8295-8324: `syncMasterListFromBanners_`.
* Lines 8325-8360: `syncMasterListFromUnlockedCarePlan_`.
* Lines 8361-8394: `syncMasterListFromCarePlanDue_`.
* Lines 8395-8557: `syncRowsFromSourceMap_`.
* Lines 8558-8575: `getDefaultDemoPMetadataHeaderRows_v155_`.
* Lines 8576-8600: `buildDemoPFromScratch`.
* Lines 8601-8640: `updateDemoPMonthlySync`.
* Lines 8641-8659: `enforceDemoPPostFlattenFormatting_`.
* Lines 8660-8681: `sortSheetAlphabeticallyByParticipantName_`.
* Lines 8682-8737: `getDemoPMonthlySyncChangedPMRs_`.
* Lines 8738-8761: `processDemoPDataWithFillBlankMask_`.
* Lines 8762-8783: `buildDemoPFreshRowsForPMRs_`.
* Lines 8784-8794: `processDemoPFreshRowsInMemory_`.
* Lines 8795-8855: `flattenDemoPContactsToPrimaryRows_`.

### Demo P, Monthly Change, and Master List creation entry points

* Lines 8856-8874: `buildDemoPContactSummaryForFlatRecord_`.
* Lines 8875-8888: `sortDemoPFlatRows_`.
* Lines 8889-8968: `processDemoP`.
* Lines 8969-9016: `processDemoPAsWorkingSource_`.
* Lines 9017-9046: `markPrimaryPMRRowsForSequentialData_`.
* Lines 9047-9067: `assignPrimaryPMRRowsInData_`.
* Lines 9068-9071: `formatDemoPStructure`.
* Lines 9072-9075: `buildRawDataSheetName_`.
* Lines 9076-9150: `getOrCreateDemoPProcessingSheet_`.
* Lines 9151-9164: `deleteSheetIfExistsForDemoPProcess_`.
* Lines 9165-9172: `getLastRawDataDisenrolledBuildResult_`.
* Lines 9173-9179: `setLastRawDataDisenrolledBuildResult_`.
* Lines 9180-9239: `updateExistingDemoPFromRawData_`.
* Lines 9240-9347: `createActiveDemoPFromRawData_`.
* Lines 9348-9365: `populateDemoPUpdateColumns_`.
* Lines 9366-9408: `populateUniversalMetadataColumns_`.
* Lines 9409-9426: `buildSourceHashByPMR_`.
* Lines 9427-9449: `buildSourceHashForRows_`.
* Lines 9450-9453: `buildSourceHashForRow_`.
* Lines 9454-9469: `buildColumnsUpdatedText_`.
* Lines 9470-9477: `normalizeHashValue_`.
* Lines 9478-9485: `computeStableHash_`.
* Lines 9486-9494: `verifyPrimaryPMRColumnFromRawData_`.
* Lines 9495-9502: `createOrRefreshDemoPTemplate_`.
* Lines 9503-9509: `getOrCreateDemoPTemplate_`.
* Lines 9510-9525: `initializeDemoPTemplateTitleRows_`.
* Lines 9526-9547: `applyDemoPTemplateFormatting_`.
* Lines 9548-9583: `applyDemoPTemplateToSheet_`.
* Lines 9584-9637: `applyDemoPDateFormattingByHeader_`.
* Lines 9638-9655: `buildMonthlyChangeReport`.
* Lines 9656-9765: `buildMonthlyChangeReportForMonth_`.
* Lines 9766-9822: `getOrBuildMonthlyChangeReport_`.
* Lines 9823-10015: `compareRawDemoPForSectionReport_`.
* Lines 10016-10021: `rowsWithDOBOnlyForSection_`.
* Lines 10022-10037: `getChangedColumnsForSectionRows_`.
* Lines 10038-10050: `buildColumnSignaturesForSection_`.
* Lines 10051-10063: `buildColumnSignatureForSection_`.
* Lines 10064-10226: `compareRawDemoPForChanges_`.
* Lines 10227-10294: `getRawDemoPDataForCompare_`.
* Lines 10295-10343: `compareSingleFieldAndAdd_`.
* Lines 10344-10386: `addMCRRow_`.
* Lines 10387-10405: `buildContactCompareMap_`.
* Lines 10406-10411: `getFieldValueFromRow_`.
* Lines 10412-10428: `buildParticipantName_`.
* Lines 10429-10436: `displayValueForReport_`.
* Lines 10437-10460: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10461-10466: `padRowToWidth_`.
* Lines 10467-10476: `stripMonthlyChangeNativeBandings_`.
* Lines 10477-10523: `getMonthlyChangeSectionSpecs_`.
* Lines 10524-10570: `buildMonthlyChangeSectionRows_`.
* Lines 10571-10578: `appendMonthlyChangeCompiledRow_`.
* Lines 10579-10608: `appendMonthlyChangeSectionBlock_`.
* Lines 10609-10661: `populateMonthlyChangeReportSections_`.
* Lines 10662-10677: `findMonthlyChangeSectionTitleRow_`.
* Lines 10678-10698: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10699-10792: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10793-10832: `writeDiagnosticReport_`.
* Lines 10833-10859: `runMonthlyUpdate`.
* Lines 10860-10865: `updateMasterList`.
* Lines 10866-10959: `updateMasterListForMonth_`.
* Lines 10960-11032: `createMasterList`.
* Lines 11033-11099: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11100-11106: `getMasterListTemplateHeaders_`.
* Lines 11107-11114: `createOrRefreshMasterListTemplate_`.
* Lines 11115-11121: `getOrCreateMasterListTemplate_`.
* Lines 11122-11178: `createMasterListSheetFromTemplate_`.
* Lines 11179-11185: `writeMasterListTitleDateBlock_`.
* Lines 11186-11194: `initializeMasterListTitleRows_`.
* Lines 11195-11212: `copyDemoPHeaderRowsToMasterList_`.

### Master List merge/update, tab/index organization, and display routines

* Lines 11213-11238: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11239-11246: `formatMasterListSheet_`.
* Lines 11247-11258: `getMonthPartsFromTitleRows_`.
* Lines 11259-11266: `updateCopiedMasterListHeader_`.
* Lines 11267-11421: `createIndexSheet`.
* Lines 11422-11425: `generateArchiveFileIndex_`.
* Lines 11426-11508: `enforceGlobalSheetSortOrder_`.
* Lines 11509-11527: `extractFirstDateFromSheetName_`.
* Lines 11528-11551: `parseIndexMonthDate_`.
* Lines 11552-11598: `organizeWorkbookTabs_`.
* Lines 11599-11616: `hideSystemAndTestingSheets_`.
* Lines 11617-11632: `getSystemAndTestingSheetNames_`.
* Lines 11633-11651: `isSystemOrTestingSheet_`.
* Lines 11652-11658: `assignSortOrderAndHideExtraRows`.
* Lines 11659-11664: `applySortOrderDisplayForMasterList_`.
* Lines 11665-11691: `buildParticipantBlocksForSortOrder_`.
* Lines 11692-11699: `showAllMasterListRows`.
* Lines 11700-11704: `groupMasterListRowsByPMR_`.
* Lines 11705-11708: `hideRowsWithBlankDOB_`.
* Lines 11709-11768: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11769-11787: `getPrimaryRowScore_`.
* Lines 11788-11812: `hideNonPrimaryPMRRows_`.
* Lines 11813-11830: `hideRowNumberBatches_`.
* Lines 11831-11842: `clearAllRowGroupsIfPossible_`.
* Lines 11843-11849: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11850-11855: `applyFinalMasterListColorAndDisplay_`.
* Lines 11856-11859: `applyMasterListDisplaySettings_`.
* Lines 11860-11867: `processMasterListFull_`.
* Lines 11868-11871: `processMasterListDataOnly_`.
* Lines 11872-11906: `processMasterListSingleDataPass_`.
* Lines 11907-11925: `populateParticipantNameData_`.
* Lines 11926-11942: `populateDemoPNameData_`.
* Lines 11943-11967: `updateBannerColumnData_`.
* Lines 11968-11981: `combineAddressesData_`.
* Lines 11982-12003: `handleLanguageData_`.
* Lines 12004-12030: `splitPhoneNumbersData_`.
* Lines 12031-12035: `runMasterContactProcessData_`.
* Lines 12036-12062: `combineNotesSummaryData_`.
* Lines 12063-12072: `rebuildChangedPMRsFromDemoP_`.
* Lines 12073-12098: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12099-12125: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12126-12155: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12156-12166: `getPMRsForMonthlyChangeSections_`.
* Lines 12167-12195: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12196-12243: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12244-12315: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12316-12325: `buildMappedMasterRowFromDemoRow_`.
* Lines 12326-12335: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12336-12343: `hideSystemSheetsNow`.
* Lines 12344-12376: `showSystemSheetsNow`.
* Lines 12377-12395: `getPrimaryMergeRowItem_`.
* Lines 12396-12465: `getPrimaryRowChangedColumnDetails_`.
* Lines 12466-12475: `formatMergeAuditValueForDisplay_`.
* Lines 12476-12481: `getMergeAuditParticipantName_`.
* Lines 12482-12502: `getMergeAuditParticipantNameFromRows_`.
* Lines 12503-12526: `buildMergeAuditContactSummary_`.
* Lines 12527-12559: `getMergeAuditChangedFields_`.
* Lines 12560-12583: `buildMergeRowsByPMRFromData_`.
* Lines 12584-12613: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12614-12643: `buildMergeKeyMapForRows_`.
* Lines 12644-12667: `buildContactMergeRowKey_`.
* Lines 12668-12682: `getMergeRowValue_`.
* Lines 12683-12713: `createDisenrolledList`.
* Lines 12714-12734: `processBlankContactSummariesOnDemoP_`.
* Lines 12735-12786: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12787-12804: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12805-12822: `loadDisenrolledPMRSetForMonth_`.
* Lines 12823-12827: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12828-12926: `moveDisenrolledPMRsFromDemoPToExclusion_`.

### Disenrollment/exclusion and Monthly Change report helpers

* Lines 12927-12994: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 12995-13006: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 13007-13048: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13049-13068: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13069-13108: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13109-13221: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13222-13226: `getCurrentRawDataSheet_`.
* Lines 13227-13231: `getPreviousRawDataSheet_`.
* Lines 13232-13239: `getCurrentDemoPSheet_`.
* Lines 13240-13245: `getPreviousDemoPSheet_`.
* Lines 13246-13257: `getMonthlyChangeReportHeaders_`.
* Lines 13258-13263: `getMonthlyChangeReportDateIndexes_`.
* Lines 13264-13293: `convertMonthlyChangeReportDateValues_`.
* Lines 13294-13314: `buildMonthlyChangeReportRow_`.
* Lines 13315-13334: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13335-13341: `runDashboardQualityStartUp`.
* Lines 13342-13395: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13396-13405: `getDashboardVerificationPassRow_`.
* Lines 13406-13410: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13411-13416: `getDashboardSectionHeaderWidth_`.
* Lines 13417-13426: `collectBlankDashboardCells_`.
* Lines 13427-13458: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13459-13495: `collectFormatDashboardTitleRowsVerificationRows_`.
* Lines 13496-13524: `collectFormatDashboardSheetDefinitionVerificationRows_`.

### Dashboard Quality, framework health, system verification, and timing wrappers

* Lines 13525-13561: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13562-13591: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13592-13620: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13621-13630: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13631-13635: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13636-13643: `runDashboardQualitySectionIfDue_`.
* Lines 13644-13647: `runDashboardQualityQuick`.
* Lines 13648-13655: `runDashboardQualityValidateTemplates`.
* Lines 13656-13687: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13688-13699: `getDashboardQualitySectionRegistry_`.
* Lines 13700-13749: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13750-13756: `runDashboardQualityPerformanceSummary_`.
* Lines 13757-13777: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13778-13830: `runDashboardQualityFull`.
* Lines 13831-13839: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13840-13912: `repairAllTemplateDateFormats`.
* Lines 13913-13918: `normalizeSectionRowForWidth_`.
* Lines 13919-13924: `rowHasAnyValue_`.
* Lines 13925-13930: `trimTrailingBlankRows_`.
* Lines 13931-13952: `getDefaultDashboardQualityDetailHeader_`.
* Lines 13953-13970: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 13971-13978: `getDashboardQualityNotRunMessage_`.
* Lines 13979-13994: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 13995-14034: `normalizeDashboardQualitySectionBlock_`.
* Lines 14035-14077: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14078-14085: `getDashboardQualitySectionTitleForKey_`.
* Lines 14086-14093: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14094-14110: `hasDashboardQualityTemplateShell_`.
* Lines 14111-14129: `initializeDashboardQualitySheet_`.
* Lines 14130-14147: `initializeSystemSheets_`.
* Lines 14148-14162: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14163-14166: `ensureDashboardQualityReportSheet_`.
* Lines 14167-14175: `ensureDashboardQualityTemplateShell_`.
* Lines 14176-14180: `ensureDashboardQualitySectionShells_`.
* Lines 14181-14186: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14187-14234: `applyDashboardQualityReportColumnSettings_`.
* Lines 14235-14245: `styleDashboardQualityReport_`.
* Lines 14246-14249: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14250-14254: `isDashboardQualityNotesLabel_`.
* Lines 14255-14285: `normalizeDashboardQualityOutputRow_`.
* Lines 14286-14290: `getDashboardQualitySectionLetter_`.
* Lines 14291-14296: `normalizeDashboardQualityIssueValue_`.
* Lines 14297-14329: `normalizeDashboardQualityRowsForSection_`.
* Lines 14330-14337: `normalizeDashboardQualityDataRows_`.
* Lines 14338-14360: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14361-14379: `getStatusFromDashboardQualityRows_`.
* Lines 14380-14401: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14402-14421: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14422-14429: `dashboardQualityRowsEqualValues_`.
* Lines 14430-14459: `saveDashboardQualitySectionRows_`.
* Lines 14460-14471: `getDashboardQualitySectionRows_`.
* Lines 14472-14482: `deleteLegacyQualityReportSheet_`.
* Lines 14483-14489: `deleteLegacyStandaloneQualityReports_`.
* Lines 14490-14497: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14498-14510: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14511-14519: `getStoredDashboardQualityOverallStatus_`.
* Lines 14520-14531: `getStoredDashboardQualityFailureNotes_`.
* Lines 14532-14537: `buildDatedDisenrolledOutputName_`.
* Lines 14538-14548: `forceSheetRowCount_`.
* Lines 14549-14582: `buildCombinedFrameworkTestDashboard`.
* Lines 14583-14588: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14589-14600: `updateDashboardQualitySignoffSection_`.
* Lines 14601-14611: `updateDashboardQualitySummarySection_`.
* Lines 14612-14615: `updateDashboardQualityTimingSummarySection_`.
* Lines 14616-14644: `getDashboardQualitySectionBoundsMap_`.
* Lines 14645-14705: `replaceDashboardQualitySectionsRows_`.
* Lines 14706-14722: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14723-14796: `replaceDashboardQualitySectionRows_`.
* Lines 14797-14811: `findDashboardQualitySectionRow_`.
* Lines 14812-14822: `findNextDashboardQualitySectionRow_`.
* Lines 14823-14842: `dashboardQualitySectionContentMatches_`.
* Lines 14843-14860: `mergeDashboardQualityStyleRanges_`.
* Lines 14861-14950: `styleDashboardQualityUpdatedSections_`.
* Lines 14951-14970: `appendCombinedDashboardSignOffRows_`.
* Lines 14971-15001: `buildFrameworkSummaryRows_`.
* Lines 15002-15021: `getStoredSectionStatusAndNotes_`.
* Lines 15022-15037: `getReportOverallStatus_`.
* Lines 15038-15057: `getReportFailureNotes_`.
* Lines 15058-15084: `runFrameworkHealthCheck`.
* Lines 15085-15090: `getFrameworkHealthCheckIssueRows_`.
* Lines 15091-15102: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15103-15109: `appendRequiredFunctionChecks_`.
* Lines 15110-15117: `existsFunctionByName_`.
* Lines 15118-15122: `writeFrameworkHealthCheckReport_`.
* Lines 15123-15134: `normalizeFrameworkHealthCheckRows_`.
* Lines 15135-15150: `getRequiredHelperFunctionNames_`.
* Lines 15151-15192: `getRequiredMenuFunctionNames_`.
* Lines 15193-15202: `getRequiredDashboardFunctionNames_`.
* Lines 15203-15211: `getRequiredTemplateFunctionNames_`.
* Lines 15212-15219: `getRequiredValidationFunctionNames_`.
* Lines 15220-15228: `getRequiredTimingFunctionNames_`.
* Lines 15229-15241: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15242-15245: `runWorkflowSyncVerification`.
* Lines 15246-15253: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15254-15259: `setupSystemSheets`.
* Lines 15260-15315: `verifyFrameworkConfiguration`.
* Lines 15316-15335: `runFrameworkTimed_`.
* Lines 15336-15346: `startFrameworkTiming_`.
* Lines 15347-15371: `markFrameworkStep_`.
* Lines 15372-15377: `writeFrameworkTimingReport_`.
* Lines 15378-15381: `writeTimingReport_`.
* Lines 15382-15398: `trimTimingReportRows_`.
* Lines 15399-15478: `rebuildProductionMonthlyChangeTemplate`.

## Verification Commands Run

* `cp 'Current_Production Script/v.1.6.26_Production_Script' /tmp/v1626.js && node --check /tmp/v1626.js`
* `python3` static scanner for line count, function count, version metadata, and function inventory generation.
* `rg` targeted scans for retired Test 6 artifacts, per-column hidden fallback loops, header-font `getRange(...).getA1Notation()`, positional Monthly Change contact comparisons, and phantom-row `Math.max(..., 1)` patterns.
