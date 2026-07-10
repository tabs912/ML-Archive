# AUDIT v1.6.27 Exhaustive Line-by-Line Speed and Stability Review

Source reviewed: `Current_Production Script/v.1.6.27_Production_Script`.
Review date: 2026-07-10. Source size: 15561 lines. Named function declarations: 666. SHA-256 prefix: `b6df84e2093f5e13`.

## Review Methodology

* Parsed the monolith as plain JavaScript source and built a function-by-function inventory with start/end line ranges.
* Scanned every source line for Spreadsheet API hotspots, trigger/lock use, runtime logging, retired artifacts, dynamic evaluation, full-sheet operations, and high-volume row/format operations.
* Reviewed each 250-line window to identify concentration areas and then performed focused pass/finding review on the highest-risk windows.
* Ran syntax validation separately with `node --check` on a copied artifact; this report is static and does not execute Google Apps Script services.

## Static Token Metrics

* **`getRange(` occurrences:** 308
* **`setValues(` occurrences:** 59
* **`getValues(` occurrences:** 50
* **`Logger.log(` occurrences:** 4
* **`logBestEffortWarning_(` occurrences:** 95
* **`catch (` occurrences:** 138
* **`SpreadsheetApp.flush` occurrences:** 1
* **`getDataRange()` occurrences:** 3
* **`getLastRow()` occurrences:** 66
* **`getA1Notation(` occurrences:** 0
* **`ScriptApp.newTrigger` occurrences:** 1
* **`LockService` occurrences:** 1
* **`PropertiesService` occurrences:** 10
* **`eval(` occurrences:** 1
* **`TODO` occurrences:** 0
* **`FIXME` occurrences:** 0
* **`MASTER_LIST_CHANGE_LOG` occurrences:** 0
* **`appendMasterListChangeLog_` occurrences:** 0
* **Total source lines:** 15561
* **Named function declarations:** 666

## Executive Summary

The v1.6.27 script is syntactically stable and the latest high-volume patches are present: fast canvas formatting avoids large row-height locks, re-enrollment PMRs are routed back into Demo P sync, active/enrolled PMRs are purged from the historical exclusion registry, and Capitation Date chronology now drives primary-row selection.

The most important review concern is the archive/delete flag combination: automatic archive is disabled while local raw deletion remains enabled, and `archiveRawSourceAndDeleteLocal_()` can still delete local raw sheets without an archive copy in the same run. This may be intended workbook-speed hygiene, but it is the highest-risk behavior found in the line-by-line pass and should be explicitly confirmed or guarded.

## High-Value Passes

### PASS: Version artifact is consistent

`MASTER_LIST_MERGE_ML_VERSION` and `RFF_VERSION` resolve to `1.6.27`; script parses with Node/V8 syntax validation. Evidence: 32-49.

### PASS: No loop-time A1 notation API calls

Static scan found zero `getA1Notation(` occurrences; A1 generation is math/helper based. Evidence: Global scan.

### PASS: Fast canvas guards are present

Large row-height batches short-circuit at 2,500 rows and format extension is chunked at 1,000 rows. Evidence: 4593-4624, 7517-7546.

### PASS: Re-enrollment gateway is present

Monthly sync adds PMRs from the Disenrolled Exclusion registry back into the active queue when present in Raw Data. Evidence: 8742-8808.

### PASS: Re-enrollment cleansing is present

The disenrollment sweep deletes active/enrolled PMRs from the historical exclusion sheet and maintains a 500-row Demo P floor. Evidence: 12909-13018.

### PASS: Root Monthly Change duplicate is removed

Monthly Change remains in Data & Processing Engine and is no longer duplicated at the root menu level. Evidence: 2684-2758.

### PASS: Retired change-log tokens absent

Static scan found zero `MASTER_LIST_CHANGE_LOG` and zero `appendMasterListChangeLog_` occurrences. Evidence: Global scan.

## Findings Requiring Review

### HIGH: Archive-disabled local delete can still remove raw input

Configuration sets `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA = false` and `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE = true`; `archiveRawSourceAndDeleteLocal_()` skips archive copy when disabled but still deletes the local raw sheet when the delete flag is true. If this is intentional workspace hygiene, document it; if not, gate deletion on successful archive or explicit local-delete-without-archive policy. Evidence lines: 82-84, 6673-6693.

### MEDIUM: Index trigger performs full index rebuild including archive path

`handleSpreadsheetChangeForIndex(e)` calls `createIndexSheet()` on INSERT_GRID/REMOVE_GRID. That path rebuilds and formats the full Index and can open archive metadata. Add debounce and/or a local-only refresh mode if users bulk-create tabs. Evidence lines: 11332-11521.

### MEDIUM: Demo P creation now bypasses legacy post-write processor

`createActiveDemoPFromRawData_()` performs core transformations in memory and no longer calls `processDemoPAsWorkingSource_()`. This is faster, but runtime comparison against a known Raw Data fixture should verify no downstream field transformation was skipped. Evidence lines: 9326-9426.

### MEDIUM: Capitation primary sort mutates block order

`assignPrimaryRowForBlock_()` sorts `block.rows` by newest Capitation Date before marking primary. This satisfies chronology prioritization but can alter output order for consumers that expected source order. Evidence lines: 1284-1320.

### LOW: Dynamic eval remains in health-check helper

`existsFunctionByName_()` uses `eval("typeof " + name)`. Inputs are internal menu/function arrays, but `globalThis[name]` is safer and faster. Evidence lines: 15185-15199.

### LOW: Single explicit flush remains in Quick System Setup

`quickSystemSetup()` calls `SpreadsheetApp.flush()` before running quality/smoke paths. This is acceptable for a manual setup workflow, but avoid adding more flushes in data processing loops. Evidence lines: 800-814.

## Architecture Section Line Map

| Section | Lines | Function Count | First Functions |
|---|---:|---:|---|
| Header / Configuration / Dashboard Defaults | 1-2634 | 145 | h_, getDefaultColumnDefinitionRows_, getAllUniqueHeaders_, getColumnStandards_, c_, writeDashboardTitle_, writeDashboardSection_, styleDashboard_ … |
| MENU FUNCTIONS | 2635-3738 | 34 | onOpen, isFrameworkTimingEnabled_, toggleFrameworkTiming, hideTemplates_, showTemplates_, hideSystemSheets_, showSystemSheets_, formatDashboard … |
| TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3739-8509 | 211 | createOrRefreshAllReportTemplates, ensureGoldenMasterTemplate_, summarizeTemplateRefreshModes_, hideReportTemplates, showReportTemplates, setReportTemplateVisibility_, validateReportTemplates, validateReportTemplatesCore_ … |
| DEMO P FUNCTIONS | 8510-13424 | 164 | getDefaultDemoPMetadataHeaderRows_v155_, buildDemoPFromScratch, updateDemoPMonthlySync, enforceDemoPPostFlattenFormatting_, sortSheetAlphabeticallyByParticipantName_, getDemoPMonthlySyncChangedPMRs_, processDemoPDataWithFillBlankMask_, buildDemoPFreshRowsForPMRs_ … |
| DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 13425-15395 | 105 | runDashboardQualityStartUp, runDashboardQualityDashboardVerificationSections_, getDashboardVerificationPassRow_, appendDashboardVerificationPassIfNoIssues_, getDashboardSectionHeaderWidth_, collectBlankDashboardCells_, collectFormatDashboardGlobalInputVerificationRows_, collectFormatDashboardTitleRowsVerificationRows_ … |
| FRAMEWORK AND TIMING FUNCTIONS | 15396-15561 | 7 | runFrameworkTimed_, startFrameworkTiming_, markFrameworkStep_, writeFrameworkTimingReport_, writeTimingReport_, trimTimingReportRows_, rebuildProductionMonthlyChangeTemplate |

## 250-Line Window Scan Ledger

| Lines | Functions beginning in window | Hotspot tokens observed |
|---:|---|---|
| 1-250 | h_, getDefaultColumnDefinitionRows_ | No hotspot token in window |
| 251-500 | getAllUniqueHeaders_, getColumnStandards_, c_, writeDashboardTitle_ | Range API:3; Writes:1 |
| 501-750 | writeDashboardSection_, styleDashboard_, setupReportFormattingDashboard, appendDashboardSectionRows_, getResolvedDefaultColumnDefinitionRows_, writeDashboardDefaultsFast_ … | Range API:9; Writes:3; Catch:4 |
| 751-1000 | notify_, trimExcessRows_, hideOldDisenrolledRows_, showQuickStartToast_, quickSystemSetup, quickBuildAllTemplates … | Catch:2 |
| 1001-1250 | getMonthlySheetByPrefixAndDate_, setUniqueSheetName_, getHeaders_, getHeaderMap_, buildHeaderIndexMap_, findHeaderIndex_ … | Range API:4; Values API:4; Catch:1 |
| 1251-1500 | rawDataSourceHeaderRow_, ensurePrimaryPMRRowColumn_, assignPrimaryRowForBlock_, deleteRowNumberBatches_, buildMasterListHeadersBeforeDataCopy_, ensureHeaders_ … | Range API:6; Values API:2; Writes:3 |
| 1501-1750 | numberOrDefault_, parseBoolean_, clearHeaderCacheForSheet_, clearSheetRuntimeCachesForSheet_, getHeaderCacheKey_, clearMonthlySheetLookupCache_ … | No hotspot token in window |
| 1751-2000 | hslToRgb_, startRuntimeTiming_, markRuntimeStep_, addRuntimeCounter_, logRuntimeInfo_, logRuntimeWarning_ … | Range API:3; Values API:3; Logger:4 |
| 2001-2250 | normalizeFrameworkTimingSectionBlock_, rebuildFrameworkTimingReportShellCompact_, hasFrameworkTimingReportShell_, initializeFrameworkTimingSheet_, ensureFrameworkTimingReport_, trimSheetToColumnCount_ … | Range API:8; Writes:1; Catch:4 |
| 2251-2500 | getFrameworkTimingBenchmarkForProcess_, getFrameworkTimingThresholdForSeverity_, ensureFrameworkTimingReportShell_, getFrameworkTimingDetailStartRow_, getFrameworkTimingDetailRows_, getLatestFrameworkTimingRowsByProcess_ … | Range API:4; Values API:1; Writes:1; Catch:1 |
| 2501-2750 | buildFrameworkTimingRecommendationRows_, writeFrameworkPerformanceRecommendationsSheet_, getPerformanceRecommendationForTimingStep_, worseTimingSeverity_, appendRuntimeTimingToFrameworkTimingReport_, formatSeconds_ … | Catch:1 |
| 2751-3000 | isFrameworkTimingEnabled_, toggleFrameworkTiming, hideTemplates_, showTemplates_, hideSystemSheets_, showSystemSheets_ … | Range API:7; Values API:4; Writes:1; Catch:1 |
| 3001-3250 | getDashboardSectionBounds_, ensureDashboardSectionDataCapacity_, writeDashboardLayoutSnapshotSection_, applyLayoutSnapshotBorder_, clearDiagnosticsAndTimingLogs, clearDashboardConfigCache_ … | Range API:9; Values API:1; Writes:2; Catch:1; Full data range:1 |
| 3251-3500 | getRequiredFrameworkSheetTypes_, getDefaultGlobalSettingsRows_, getDefaultTitleRowRows_, getDefaultSheetDefinitionRows_, getDefaultSheetDefinitionRowsWithColumnCounts_, getDefaultBehaviorRows_ … | No hotspot token in window |
| 3501-3750 | createOrRefreshAllReportTemplates | No hotspot token in window |
| 3751-4000 | ensureGoldenMasterTemplate_, summarizeTemplateRefreshModes_, hideReportTemplates, showReportTemplates, setReportTemplateVisibility_, validateReportTemplates … | Range API:2; Values API:1; Catch:3 |
| 4001-4250 | loadTitleRows_, parseTitleRowConfigRow_, normalizeTitleTargetCell_, getTitleRowConfigForSheet_, getThemeFillForTitleRow_, toWrapStrategy_ … | Catch:1 |
| 4251-4500 | getBehaviorForSheetType_, createOrRefreshTemplateFromDashboard_, shouldUseStagedTemplateBuild_, shouldRefreshTemplateMetadataOnly_, buildTemplateRefreshDecisionMessage_, refreshTemplateMetadataOnly_ … | Range API:1; Catch:2 |
| 4501-4750 | shouldSkipTemplateResize_, ensureSheetMinimumColumns_, clearTemplateForFullBuild_, applyTemplateRowHeights_, applyFinalRowHeightLockForSheetType_, lockFinalOutputRowHeights_ … | Range API:3; Catch:7 |
| 4751-5000 | rowColToA1_, applyHeaderRow_, applyColumnWidths_, applyColumnWidthsInRuns_, applyDateAndNumberFormats_, enforceTemplateDateAndNumberFormats_ … | Range API:11; Writes:1; Catch:4 |
| 5001-5250 | applyDataRows_, applyAlternatingColorRules_, applyMonthlyChangeSpacerRow3Format_, formatMonthlyChangeSubsectionBlock_, writeTemplateMetadata_, buildTemplateFormatSignature_ … | Range API:9; Writes:1; Catch:6 |
| 5251-5500 | storeTemplateFormatSignature_, ensureTemplateFilter_, applyTemplateFreezeAndTabColor_, resizeSheet_, resizeSheetGrid_, resizeSheetRows_ … | Range API:3; Catch:11 |
| 5501-5750 | buildPromptedMonthContext_, formatMonthlyBannerSheet_, formatMonthlyDashboardSheetFromSource_, formatMonthlyRawDataSheetFromSource_, formatBannerReport, validateActiveBannerFormatterOutput … | Range API:6; Catch:1 |
| 5751-6000 | boolText_, isPrimaryPMRRowValue_, assignPrimaryPMRRows_, getCurrentBannersSheet_, getCurrentUnlockedCarePlanSheet_, getCurrentCarePlanDueSheet_ … | Range API:8; Writes:1; Catch:6 |
| 6001-6250 | applyCurrentVsOlderTabColors_, organizeSheetTabs_, formatDateColumnsByHeader_, rowObjectFromHeaders_, getLiveDashboardAuditStatus_, getLiveTemplateValidationStatus_ … | Range API:5; Values API:1; Writes:2; Catch:3 |
| 6251-6500 | isExpiredContactPhoneDate_, capitalizeContactPart_, formatRankedContact_, getMostRecentDateFromRowsByHeader_, isDateInStrictLocalRangeInclusive_, isDateDisplayInReportWindow_ … | Range API:3; Values API:2; Catch:1 |
| 6501-6750 | isDateLikeHeader_, buildMonthlySheetNameNoDashAfterPrefix_, formatReportDateLabel_, buildBannerReportOutputName_, renameSheetSafely_, deleteSheetIfExists_ … | Range API:10; Values API:3; Writes:1; Catch:3 |
| 6751-7000 | archiveMonthlyImportSheets, archiveMonthlyActiveSheets, archiveMonthlySheetsBySpecs_, findArchiveMonthlyCandidateSheets_, copySheetToArchiveAndDeleteLocal_, notifyArchiveMonthlySheetsResult_ … | Catch:3 |
| 7001-7250 | writeTemplateValidationReport_, formatRawData, ensureRawDataHeaderRows_, rowLooksLikeParticipantHeader_, getRawDataCurrentHeadersOrDefaults_, enforceDemoPStrictDashboardSchema_ | Range API:4; Values API:3; Catch:7 |
| 7251-7500 | buildRawDataSourceArchiveName_, mapRowsToHeaders_, applyUniversalFastCanvasFormatting_, applyGovernedTextAndNumberFormats_, applyOutputVisibilityPolicy_, createOutputSheetFromDashboardTemplate_ … | Range API:24; Writes:4; Catch:5 |
| 7501-7750 | ensureOutputSheetHasFormattedRows_, syncRawDataBannerColumns_, buildSourceMapByCompositeKeyForDemoPBanner_, formatCarePlanDueReport, formatUnlockedCarePlanReport, formatCarePlanDueOrUnlockedFromDashboard_ | Range API:8; Values API:1; Catch:2 |
| 7751-8000 | buildRawArchiveNameForSheetType_, collectAndClearMovedTitleInfoCells_, prepareCarePlanSourceSheetForDashboardFormat_, prepareRawDataSourceSheetForDashboardFormat_, buildRawDataHeadersForFormatting_, getRawDataApprovedAddedColumns_ … | Range API:5; Writes:1; Catch:3 |
| 8001-8250 | getRawDataDisallowedWorkingColumns_, isOngoingOutputSheetType_, buildDashboardOutputSheetName_, syncMasterListMonthlySourcesIntoData_, syncBannerSourceIntoData_, syncUnlockedCarePlanSourceIntoData_ … | No hotspot token in window |
| 8251-8500 | buildSourceMapByCompositeKeyForPart5_, shouldProcessRowByPMR_, normalizeSyncFieldPairs_, syncMasterListFromBanners_, syncMasterListFromUnlockedCarePlan_, syncMasterListFromCarePlanDue_ … | No hotspot token in window |
| 8501-8750 | getDefaultDemoPMetadataHeaderRows_v155_, buildDemoPFromScratch, updateDemoPMonthlySync, enforceDemoPPostFlattenFormatting_, sortSheetAlphabeticallyByParticipantName_, getDemoPMonthlySyncChangedPMRs_ | Range API:3; Writes:2; Catch:2 |
| 8751-9000 | processDemoPDataWithFillBlankMask_, buildDemoPFreshRowsForPMRs_, processDemoPFreshRowsInMemory_, flattenDemoPContactsToPrimaryRows_, buildDemoPContactSummaryForFlatRecord_, sortDemoPFlatRows_ … | Range API:2; Writes:1 |
| 9001-9250 | processDemoPAsWorkingSource_, markPrimaryPMRRowsForSequentialData_, assignPrimaryPMRRowsInData_, formatDemoPStructure, buildRawDataSheetName_, getOrCreateDemoPProcessingSheet_ … | Writes:1; Catch:1 |
| 9251-9500 | getLastRawDataDisenrolledBuildResult_, setLastRawDataDisenrolledBuildResult_, updateExistingDemoPFromRawData_, createActiveDemoPFromRawData_, populateDemoPUpdateColumns_, populateUniversalMetadataColumns_ … | Range API:12; Writes:3; Catch:2 |
| 9501-9750 | buildSourceHashForRows_, buildSourceHashForRow_, buildColumnsUpdatedText_, normalizeHashValue_, computeStableHash_, verifyPrimaryPMRColumnFromRawData_ … | Range API:8; Catch:4 |
| 9751-10000 | getOrBuildMonthlyChangeReport_, compareRawDemoPForSectionReport_ | No hotspot token in window |
| 10001-10250 | rowsWithDOBOnlyForSection_, getChangedColumnsForSectionRows_, buildColumnSignaturesForSection_, compareRawDemoPForChanges_ | No hotspot token in window |
| 10251-10500 | getRawDemoPDataForCompare_, compareSingleFieldAndAdd_, addMCRRow_, buildContactCompareMap_, getFieldValueFromRow_, buildParticipantName_ … | No hotspot token in window |
| 10501-10750 | buildMonthlyChangeReportSectionLayout_, padRowToWidth_, stripMonthlyChangeNativeBandings_, getMonthlyChangeSectionSpecs_, buildMonthlyChangeSectionRows_, appendMonthlyChangeCompiledRow_ … | Range API:10; Values API:1; Writes:2 |
| 10751-11000 | getChangedPMRsFromMonthlyChangeReport_, writeDiagnosticReport_, runMonthlyUpdate, updateMasterList, updateMasterListForMonth_ | Range API:16; Values API:5; Writes:4; Catch:4; Full data range:1 |
| 11001-11250 | createMasterList, copyPrimaryDemoPRowsToMasterListByHeader_, getMasterListTemplateHeaders_, createOrRefreshMasterListTemplate_, getOrCreateMasterListTemplate_, createMasterListSheetFromTemplate_ … | Range API:10; Writes:5; Catch:6 |
| 11251-11500 | initializeMasterListTitleRows_, copyDemoPHeaderRowsToMasterList_, copyQualifyingDemoPRowsToMasterList_, formatMasterListSheet_, getMonthPartsFromTitleRows_, updateCopiedMasterListHeader_ … | Range API:26; Values API:1; Writes:2; Catch:3; Full data range:1 |
| 11501-11750 | handleSpreadsheetChangeForIndex, enforceGlobalSheetSortOrder_, extractFirstDateFromSheetName_, parseIndexMonthDate_, organizeWorkbookTabs_, hideSystemAndTestingSheets_ … | Catch:4; Trigger:1; Lock:1 |
| 11751-12000 | applySortOrderDisplayForMasterList_, buildParticipantBlocksForSortOrder_, showAllMasterListRows, groupMasterListRowsByPMR_, hideRowsWithBlankDOB_, sortMasterListByParticipantNameAndPMR_ … | Range API:2; Values API:2; Writes:2; Catch:1 |
| 12001-12250 | populateParticipantNameData_, populateDemoPNameData_, updateBannerColumnData_, combineAddressesData_, handleLanguageData_, splitPhoneNumbersData_ … | Range API:2; Values API:1; Writes:1 |
| 12251-12500 | getPMRsForMonthlyChangeSections_, deletePMRBlocksFromMasterListBySet_, updatePrimaryRowsFromDemoPForPMRs_, mergeSecondaryRowsFromDemoPForPMRs_, buildMappedMasterRowFromDemoRow_, mutateMasterRowColumnsFromDemoRow_ … | Range API:1; Writes:3; Catch:1 |
| 12501-12750 | formatMergeAuditValueForDisplay_, getMergeAuditParticipantName_, getMergeAuditParticipantNameFromRows_, buildMergeAuditContactSummary_, getMergeAuditChangedFields_, buildMergeRowsByPMRFromData_ … | No hotspot token in window |
| 12751-13000 | createDisenrolledList, processBlankContactSummariesOnDemoP_, splitRawDataRowsIntoActiveAndDisenrolled_, buildDisenrolledPMRSetFromDemoPValues_, loadDisenrolledPMRSetForMonth_, appendDisenrolledRowsFromRawDataToExclusion_ … | Range API:1; Values API:1; Writes:1 |
| 13001-13250 | appendDisenrolledDeltasToExclusionSheet_, appendDisenrolledPMRBlocksToExclusion_, createDisenrolledExclusionSheetFromDashboardTemplate_, loadDisenrolledExclusionPMRsForPart3_, removeDisenrolledPMRBlocksFromMasterUsingDemoP_, applyDisenrolledExclusionCreateFormattingOnly_ | Range API:22; Values API:4; Writes:3; Catch:1 |
| 13251-13500 | getCurrentRawDataSheet_, getPreviousRawDataSheet_, getCurrentDemoPSheet_, getPreviousDemoPSheet_, getMonthlyChangeReportHeaders_, getMonthlyChangeReportDateIndexes_ … | No hotspot token in window |
| 13501-13750 | getDashboardSectionHeaderWidth_, collectBlankDashboardCells_, collectFormatDashboardGlobalInputVerificationRows_, collectFormatDashboardTitleRowsVerificationRows_, collectFormatDashboardSheetDefinitionVerificationRows_, collectFormatDashboardSheetHeaderVerificationRows_ … | Catch:7 |
| 13751-14000 | getDashboardQualitySectionRegistry_, collectDashboardQualityPerformanceSummaryRows_, runDashboardQualityPerformanceSummary_, runDashboardQualityCarePlanSyncDiagnostics_, runDashboardQualityFull, runAllFrameworkTestsAndBuildDashboard … | No hotspot token in window |
| 14001-14250 | normalizeSectionRowForWidth_, rowHasAnyValue_, trimTrailingBlankRows_, getDefaultDashboardQualityDetailHeader_, collectExistingDashboardQualitySectionBlocks_, getDashboardQualityNotRunMessage_ … | Range API:5; Values API:1; Writes:1; Catch:2 |
| 14251-14500 | ensureDashboardQualitySectionShells_, getDashboardQualityFixedSectionStartRow_, applyDashboardQualityReportColumnSettings_, styleDashboardQualityReport_, normalizeDashboardQualityHeaderLabels_, isDashboardQualityNotesLabel_ … | Range API:4; Catch:4 |
| 14501-14750 | dashboardQualityRowsEqualValues_, saveDashboardQualitySectionRows_, getDashboardQualitySectionRows_, deleteLegacyQualityReportSheet_, deleteLegacyStandaloneQualityReports_, saveDashboardQualityRowsForTemplateValidation_ … | Range API:1; Values API:1; Catch:5 |
| 14751-15000 | tryDashboardQualityAnchoredColumnWrite_, replaceDashboardQualitySectionRows_, findDashboardQualitySectionRow_, findNextDashboardQualitySectionRow_, dashboardQualitySectionContentMatches_, mergeDashboardQualityStyleRanges_ … | Range API:10; Values API:5; Writes:3; Catch:4 |
| 15001-15250 | appendCombinedDashboardSignOffRows_, buildFrameworkSummaryRows_, getStoredSectionStatusAndNotes_, getReportOverallStatus_, getReportFailureNotes_, runFrameworkHealthCheck … | Range API:4; Values API:2; Catch:2; Eval:1 |
| 15251-15500 | getRequiredDashboardFunctionNames_, getRequiredTemplateFunctionNames_, getRequiredValidationFunctionNames_, getRequiredTimingFunctionNames_, getRequiredFrameworkDashboardFunctionNames_, runWorkflowSyncVerification … | Catch:2 |
| 15501-15561 | — | Range API:14; Writes:2 |

## Named Function Inventory

| # | Function | Lines | Size |
|---:|---|---:|---:|
| 1 | `h_` | 236-242 | 7 |
| 2 | `getDefaultColumnDefinitionRows_` | 243-356 | 114 |
| 3 | `getAllUniqueHeaders_` | 357-375 | 19 |
| 4 | `getColumnStandards_` | 376-475 | 100 |
| 5 | `c_` | 476-489 | 14 |
| 6 | `writeDashboardTitle_` | 490-503 | 14 |
| 7 | `writeDashboardSection_` | 504-538 | 35 |
| 8 | `styleDashboard_` | 539-570 | 32 |
| 9 | `setupReportFormattingDashboard` | 571-574 | 4 |
| 10 | `appendDashboardSectionRows_` | 575-583 | 9 |
| 11 | `getResolvedDefaultColumnDefinitionRows_` | 584-617 | 34 |
| 12 | `writeDashboardDefaultsFast_` | 618-692 | 75 |
| 13 | `rebuildFormatDashboardDefaults` | 693-696 | 4 |
| 14 | `setupReportFormattingDashboardFromScriptDefaults_` | 697-711 | 15 |
| 15 | `normalizeDashboardSheetTypeKey_` | 712-729 | 18 |
| 16 | `getSheetDefinitionByTypeOrNull_` | 730-736 | 7 |
| 17 | `getSheetDefinitionByType_` | 737-742 | 6 |
| 18 | `sortSheetDefinitionsByProductionOrder_` | 743-756 | 14 |
| 19 | `notify_` | 757-764 | 8 |
| 20 | `trimExcessRows_` | 765-776 | 12 |
| 21 | `hideOldDisenrolledRows_` | 777-806 | 30 |
| 22 | `showQuickStartToast_` | 807-811 | 5 |
| 23 | `quickSystemSetup` | 812-825 | 14 |
| 24 | `quickBuildAllTemplates` | 826-833 | 8 |
| 25 | `notifyErrorWithTiming_` | 834-838 | 5 |
| 26 | `isBlankCell_` | 839-843 | 5 |
| 27 | `coerceToValidDate_` | 844-893 | 50 |
| 28 | `spreadsheetSerialDateToLocalDate_` | 894-913 | 20 |
| 29 | `isReasonableReportDate_` | 914-918 | 5 |
| 30 | `createLocalDateOnly_` | 919-922 | 4 |
| 31 | `getTodayLocalDate_` | 923-927 | 5 |
| 32 | `getMonthDateParts_` | 928-952 | 25 |
| 33 | `formatDateForSheetName_` | 953-956 | 4 |
| 34 | `formatDateDisplay_` | 957-961 | 5 |
| 35 | `dateKey_` | 962-966 | 5 |
| 36 | `isSameDate_` | 967-970 | 4 |
| 37 | `isSameMonth_` | 971-975 | 5 |
| 38 | `buildMonthlySheetName_` | 976-980 | 5 |
| 39 | `buildStandardMonthlySheetName_` | 981-986 | 6 |
| 40 | `getNewestFormattedMonthlySheetByPrefix_` | 987-1017 | 31 |
| 41 | `getMonthlySheetByPrefixAndDate_` | 1018-1051 | 34 |
| 42 | `setUniqueSheetName_` | 1052-1084 | 33 |
| 43 | `getHeaders_` | 1085-1104 | 20 |
| 44 | `getHeaderMap_` | 1105-1119 | 15 |
| 45 | `buildHeaderIndexMap_` | 1120-1128 | 9 |
| 46 | `findHeaderIndex_` | 1129-1135 | 7 |
| 47 | `normalizeHeader_` | 1136-1143 | 8 |
| 48 | `normalizePMR_` | 1144-1150 | 7 |
| 49 | `getPMRIndex_` | 1151-1154 | 4 |
| 50 | `getDOBIndex_` | 1155-1158 | 4 |
| 51 | `normalizeKeyPart_` | 1159-1177 | 19 |
| 52 | `getDataValues_` | 1178-1217 | 40 |
| 53 | `getRawDataSourceDataForOutput_` | 1218-1251 | 34 |
| 54 | `rawDataSourceHeaderRow_` | 1252-1266 | 15 |
| 55 | `ensurePrimaryPMRRowColumn_` | 1267-1283 | 17 |
| 56 | `assignPrimaryRowForBlock_` | 1284-1321 | 38 |
| 57 | `deleteRowNumberBatches_` | 1322-1355 | 34 |
| 58 | `buildMasterListHeadersBeforeDataCopy_` | 1356-1365 | 10 |
| 59 | `ensureHeaders_` | 1366-1392 | 27 |
| 60 | `ensureBannerSummaryOutputHeaders_` | 1393-1396 | 4 |
| 61 | `ensureContactOutputHeaders_` | 1397-1410 | 14 |
| 62 | `trimOutputSheetToDataSize_` | 1411-1420 | 10 |
| 63 | `copyChangedPMRsFromDemoPToMasterList_` | 1421-1455 | 35 |
| 64 | `applyFinalRowHeightLock_` | 1456-1461 | 6 |
| 65 | `normalizeCompareValue_` | 1462-1491 | 30 |
| 66 | `valuesAreEqual_` | 1492-1495 | 4 |
| 67 | `normalizeText_` | 1496-1499 | 4 |
| 68 | `normalizeKey_` | 1500-1503 | 4 |
| 69 | `numberOrDefault_` | 1504-1508 | 5 |
| 70 | `parseBoolean_` | 1509-1518 | 10 |
| 71 | `clearHeaderCacheForSheet_` | 1519-1533 | 15 |
| 72 | `clearSheetRuntimeCachesForSheet_` | 1534-1538 | 5 |
| 73 | `getHeaderCacheKey_` | 1539-1545 | 7 |
| 74 | `clearMonthlySheetLookupCache_` | 1546-1551 | 6 |
| 75 | `getMonthlySheetLookupCacheKey_` | 1552-1558 | 7 |
| 76 | `getSheetDimensionCacheKey_` | 1559-1562 | 4 |
| 77 | `clearSheetDimensionCacheForSheet_` | 1563-1568 | 6 |
| 78 | `getSheetDimensions_` | 1569-1588 | 20 |
| 79 | `dateOnlyLocalClone_` | 1589-1594 | 6 |
| 80 | `monthKey_` | 1595-1599 | 5 |
| 81 | `parseStandardMonthlySheetDateFromName_` | 1600-1619 | 20 |
| 82 | `buildRowsByPMR_` | 1620-1654 | 35 |
| 83 | `safeSheetName_` | 1655-1661 | 7 |
| 84 | `compareValues_` | 1662-1665 | 4 |
| 85 | `toBool_` | 1666-1669 | 4 |
| 86 | `truthy_` | 1670-1673 | 4 |
| 87 | `toNumber_` | 1674-1677 | 4 |
| 88 | `resizeSheetMinimum_` | 1678-1693 | 16 |
| 89 | `getThemeColorsFromBase_` | 1694-1704 | 11 |
| 90 | `getGlobalBorderStyle_` | 1705-1709 | 5 |
| 91 | `normalizeHex_` | 1710-1720 | 11 |
| 92 | `hexWithHslLightness_` | 1721-1727 | 7 |
| 93 | `hexToRgb_` | 1728-1736 | 9 |
| 94 | `rgbToHex_` | 1737-1744 | 8 |
| 95 | `rgbToHsl_` | 1745-1766 | 22 |
| 96 | `hslToRgb_` | 1767-1789 | 23 |
| 97 | `startRuntimeTiming_` | 1790-1802 | 13 |
| 98 | `markRuntimeStep_` | 1803-1829 | 27 |
| 99 | `addRuntimeCounter_` | 1830-1834 | 5 |
| 100 | `logRuntimeInfo_` | 1835-1839 | 5 |
| 101 | `logRuntimeWarning_` | 1840-1844 | 5 |
| 102 | `logRuntimeError_` | 1845-1849 | 5 |
| 103 | `logBestEffortWarning_` | 1850-1853 | 4 |
| 104 | `logRuntimeTiming_` | 1854-1870 | 17 |
| 105 | `getRuntimeTimingSeverity_` | 1871-1878 | 8 |
| 106 | `getRuntimeTimingReportName_` | 1879-1882 | 4 |
| 107 | `writeRuntimeTimingReport_` | 1883-1888 | 6 |
| 108 | `writeConsolidatedTimingSummaryReport_` | 1889-1892 | 4 |
| 109 | `writeCombinedFrameworkTimingReport_` | 1893-1910 | 18 |
| 110 | `getFrameworkTimingRetentionLimit_` | 1911-1914 | 4 |
| 111 | `getFrameworkTimingReportSheetName_` | 1915-1918 | 4 |
| 112 | `getFrameworkTimingSectionRegistry_` | 1919-1943 | 25 |
| 113 | `findFrameworkTimingSectionRow_` | 1944-1956 | 13 |
| 114 | `findNextFrameworkTimingSectionRow_` | 1957-1969 | 13 |
| 115 | `collectExistingFrameworkTimingSectionBlocks_` | 1970-1988 | 19 |
| 116 | `buildDefaultFrameworkTimingSectionBlock_` | 1989-2000 | 12 |
| 117 | `normalizeFrameworkTimingSectionBlock_` | 2001-2030 | 30 |
| 118 | `rebuildFrameworkTimingReportShellCompact_` | 2031-2072 | 42 |
| 119 | `hasFrameworkTimingReportShell_` | 2073-2098 | 26 |
| 120 | `initializeFrameworkTimingSheet_` | 2099-2117 | 19 |
| 121 | `ensureFrameworkTimingReport_` | 2118-2121 | 4 |
| 122 | `trimSheetToColumnCount_` | 2122-2135 | 14 |
| 123 | `styleFrameworkTimingReport_` | 2136-2238 | 103 |
| 124 | `getFrameworkTimingSectionForId_` | 2239-2246 | 8 |
| 125 | `replaceFrameworkTimingSectionRows_` | 2247-2291 | 45 |
| 126 | `getFrameworkTimingBenchmarkForProcess_` | 2292-2309 | 18 |
| 127 | `getFrameworkTimingThresholdForSeverity_` | 2310-2317 | 8 |
| 128 | `ensureFrameworkTimingReportShell_` | 2318-2326 | 9 |
| 129 | `getFrameworkTimingDetailStartRow_` | 2327-2333 | 7 |
| 130 | `getFrameworkTimingDetailRows_` | 2334-2357 | 24 |
| 131 | `getLatestFrameworkTimingRowsByProcess_` | 2358-2378 | 21 |
| 132 | `getFrameworkTimingBenchmarkSeverity_` | 2379-2388 | 10 |
| 133 | `getFrameworkTimingModeForStep_` | 2389-2397 | 9 |
| 134 | `mergeFrameworkTimingModes_` | 2398-2402 | 5 |
| 135 | `buildFrameworkTimingProcessSummaryRows_` | 2403-2480 | 78 |
| 136 | `formatTimingTimestampForSummary_` | 2481-2490 | 10 |
| 137 | `buildFrameworkTimingIssueRows_` | 2491-2520 | 30 |
| 138 | `buildFrameworkTimingRecommendationRows_` | 2521-2537 | 17 |
| 139 | `writeFrameworkPerformanceRecommendationsSheet_` | 2538-2541 | 4 |
| 140 | `getPerformanceRecommendationForTimingStep_` | 2542-2581 | 40 |
| 141 | `worseTimingSeverity_` | 2582-2588 | 7 |
| 142 | `appendRuntimeTimingToFrameworkTimingReport_` | 2589-2614 | 26 |
| 143 | `formatSeconds_` | 2615-2623 | 9 |
| 144 | `refreshFrameworkTimingReport` | 2624-2627 | 4 |
| 145 | `writeFrameworkTimingPerformanceRecommendations` | 2628-2683 | 56 |
| 146 | `onOpen` | 2684-2760 | 77 |
| 147 | `isFrameworkTimingEnabled_` | 2761-2769 | 9 |
| 148 | `toggleFrameworkTiming` | 2770-2777 | 8 |
| 149 | `hideTemplates_` | 2778-2781 | 4 |
| 150 | `showTemplates_` | 2782-2785 | 4 |
| 151 | `hideSystemSheets_` | 2786-2789 | 4 |
| 152 | `showSystemSheets_` | 2790-2793 | 4 |
| 153 | `formatDashboard` | 2794-2797 | 4 |
| 154 | `saveActiveLayoutToDashboardSettings` | 2798-2839 | 42 |
| 155 | `saveFormatDashboardConfigChanges_` | 2840-2852 | 13 |
| 156 | `resolveSheetDefinitionForLayoutSnapshot_` | 2853-2871 | 19 |
| 157 | `captureActiveSheetLayoutSnapshot_` | 2872-2924 | 53 |
| 158 | `getHiddenColumnFlags_` | 2925-2932 | 8 |
| 159 | `isDateNumberFormat_` | 2933-2937 | 5 |
| 160 | `getDefaultLayoutSnapshotBorderConfig_` | 2938-2950 | 13 |
| 161 | `upsertDashboardSheetDefinitionBaseColor_` | 2951-2974 | 24 |
| 162 | `upsertDashboardColumnDefinitionRows_` | 2975-3011 | 37 |
| 163 | `getDashboardSectionBounds_` | 3012-3039 | 28 |
| 164 | `ensureDashboardSectionDataCapacity_` | 3040-3055 | 16 |
| 165 | `writeDashboardLayoutSnapshotSection_` | 3056-3096 | 41 |
| 166 | `applyLayoutSnapshotBorder_` | 3097-3110 | 14 |
| 167 | `clearDiagnosticsAndTimingLogs` | 3111-3216 | 106 |
| 168 | `clearDashboardConfigCache_` | 3217-3221 | 5 |
| 169 | `getDashboardConfigCacheKey_` | 3222-3238 | 17 |
| 170 | `getFormatDashboardSectionNames_` | 3239-3250 | 12 |
| 171 | `getRequiredFrameworkSheetTypes_` | 3251-3264 | 14 |
| 172 | `getDefaultGlobalSettingsRows_` | 3265-3329 | 65 |
| 173 | `getDefaultTitleRowRows_` | 3330-3338 | 9 |
| 174 | `getDefaultSheetDefinitionRows_` | 3339-3351 | 13 |
| 175 | `getDefaultSheetDefinitionRowsWithColumnCounts_` | 3352-3366 | 15 |
| 176 | `getDefaultBehaviorRows_` | 3367-3379 | 13 |
| 177 | `getDefaultSystemSurfaceRows_` | 3380-3389 | 10 |
| 178 | `getDefaultSheetHeaderRows_` | 3390-3404 | 15 |
| 179 | `getDefaultHeaderSets_` | 3405-3741 | 337 |
| 180 | `createOrRefreshAllReportTemplates` | 3742-3781 | 40 |
| 181 | `ensureGoldenMasterTemplate_` | 3782-3820 | 39 |
| 182 | `summarizeTemplateRefreshModes_` | 3821-3831 | 11 |
| 183 | `hideReportTemplates` | 3832-3838 | 7 |
| 184 | `showReportTemplates` | 3839-3845 | 7 |
| 185 | `setReportTemplateVisibility_` | 3846-3878 | 33 |
| 186 | `validateReportTemplates` | 3879-3886 | 8 |
| 187 | `validateReportTemplatesCore_` | 3887-3896 | 10 |
| 188 | `loadDashboardConfig_` | 3897-3941 | 45 |
| 189 | `buildDashboardSectionIndex_` | 3942-3963 | 22 |
| 190 | `loadGlobalSettings_` | 3964-4008 | 45 |
| 191 | `loadTitleRows_` | 4009-4043 | 35 |
| 192 | `parseTitleRowConfigRow_` | 4044-4069 | 26 |
| 193 | `normalizeTitleTargetCell_` | 4070-4075 | 6 |
| 194 | `getTitleRowConfigForSheet_` | 4076-4083 | 8 |
| 195 | `getThemeFillForTitleRow_` | 4084-4091 | 8 |
| 196 | `toWrapStrategy_` | 4092-4098 | 7 |
| 197 | `loadSheetDefinitions_` | 4099-4126 | 28 |
| 198 | `loadSheetHeaders_` | 4127-4160 | 34 |
| 199 | `loadColumnDefinitions_` | 4161-4187 | 27 |
| 200 | `loadSheetBehaviors_` | 4188-4211 | 24 |
| 201 | `normalizeDashboardSectionTitle_` | 4212-4219 | 8 |
| 202 | `readDashboardSectionRows_` | 4220-4264 | 45 |
| 203 | `getBehaviorForSheetType_` | 4265-4270 | 6 |
| 204 | `createOrRefreshTemplateFromDashboard_` | 4271-4342 | 72 |
| 205 | `shouldUseStagedTemplateBuild_` | 4343-4349 | 7 |
| 206 | `shouldRefreshTemplateMetadataOnly_` | 4350-4360 | 11 |
| 207 | `buildTemplateRefreshDecisionMessage_` | 4361-4378 | 18 |
| 208 | `refreshTemplateMetadataOnly_` | 4379-4391 | 13 |
| 209 | `buildTemplateFromDashboardSafely_` | 4392-4420 | 29 |
| 210 | `getTemplateBuildSheetName_` | 4421-4424 | 4 |
| 211 | `promoteStagedTemplateBuild_` | 4425-4436 | 12 |
| 212 | `validateBuiltTemplateMinimumStructure_` | 4437-4454 | 18 |
| 213 | `buildTemplateFromDashboard_` | 4455-4504 | 50 |
| 214 | `shouldSkipTemplateResize_` | 4505-4509 | 5 |
| 215 | `ensureSheetMinimumColumns_` | 4510-4518 | 9 |
| 216 | `clearTemplateForFullBuild_` | 4519-4543 | 25 |
| 217 | `applyTemplateRowHeights_` | 4544-4549 | 6 |
| 218 | `applyFinalRowHeightLockForSheetType_` | 4550-4553 | 4 |
| 219 | `lockFinalOutputRowHeights_` | 4554-4581 | 28 |
| 220 | `applyGlobalDefaultRowHeightsToSheet_` | 4582-4592 | 11 |
| 221 | `safeSetRowHeights_` | 4593-4625 | 33 |
| 222 | `applyRowHeightRuns_` | 4626-4632 | 7 |
| 223 | `hideTemplateIfNeeded_` | 4633-4647 | 15 |
| 224 | `resolveTemplateRowCount_` | 4648-4671 | 24 |
| 225 | `applyTemplateBaseFormatting_` | 4672-4720 | 49 |
| 226 | `ensureTitleRowConfig_` | 4721-4733 | 13 |
| 227 | `applyTitleRows_` | 4734-4786 | 53 |
| 228 | `rowColToA1_` | 4787-4797 | 11 |
| 229 | `applyHeaderRow_` | 4798-4838 | 41 |
| 230 | `applyColumnWidths_` | 4839-4849 | 11 |
| 231 | `applyColumnWidthsInRuns_` | 4850-4885 | 36 |
| 232 | `applyDateAndNumberFormats_` | 4886-4889 | 4 |
| 233 | `enforceTemplateDateAndNumberFormats_` | 4890-4894 | 5 |
| 234 | `enforceDateAndNumberFormatsForHeaders_` | 4895-4951 | 57 |
| 235 | `getExpectedNumberFormat_` | 4952-4958 | 7 |
| 236 | `getGoogleSheetsNumberFormat_` | 4959-4977 | 19 |
| 237 | `isDateFormatText_` | 4978-4982 | 5 |
| 238 | `applyHiddenColumnSettings_` | 4983-4992 | 10 |
| 239 | `applyHiddenColumnSettingsInRuns_` | 4993-5028 | 36 |
| 240 | `applyDataRows_` | 5029-5054 | 26 |
| 241 | `applyAlternatingColorRules_` | 5055-5081 | 27 |
| 242 | `applyMonthlyChangeSpacerRow3Format_` | 5082-5111 | 30 |
| 243 | `formatMonthlyChangeSubsectionBlock_` | 5112-5157 | 46 |
| 244 | `writeTemplateMetadata_` | 5158-5175 | 18 |
| 245 | `buildTemplateFormatSignature_` | 5176-5208 | 33 |
| 246 | `compactTemplateFormatSignature_` | 5209-5222 | 14 |
| 247 | `normalizeTemplateFormatSignature_` | 5223-5231 | 9 |
| 248 | `getTemplateFormatSignatureKey_` | 5232-5237 | 6 |
| 249 | `getStoredTemplateFormatSignature_` | 5238-5246 | 9 |
| 250 | `getStoredTemplateFormatSignatureFromSheet_` | 5247-5266 | 20 |
| 251 | `storeTemplateFormatSignature_` | 5267-5274 | 8 |
| 252 | `ensureTemplateFilter_` | 5275-5323 | 49 |
| 253 | `applyTemplateFreezeAndTabColor_` | 5324-5361 | 38 |
| 254 | `resizeSheet_` | 5362-5386 | 25 |
| 255 | `resizeSheetGrid_` | 5387-5419 | 33 |
| 256 | `resizeSheetRows_` | 5420-5424 | 5 |
| 257 | `resizeSheetColumns_` | 5425-5428 | 4 |
| 258 | `getHeadersForSheetType_` | 5429-5436 | 8 |
| 259 | `getDefaultBehavior_` | 5437-5446 | 10 |
| 260 | `showSheetIfNeeded_` | 5447-5458 | 12 |
| 261 | `hideSheetIfNeeded_` | 5459-5472 | 14 |
| 262 | `formatMonthlySheets` | 5473-5511 | 39 |
| 263 | `buildPromptedMonthContext_` | 5512-5520 | 9 |
| 264 | `formatMonthlyBannerSheet_` | 5521-5542 | 22 |
| 265 | `formatMonthlyDashboardSheetFromSource_` | 5543-5576 | 34 |
| 266 | `formatMonthlyRawDataSheetFromSource_` | 5577-5604 | 28 |
| 267 | `formatBannerReport` | 5605-5672 | 68 |
| 268 | `validateActiveBannerFormatterOutput` | 5673-5694 | 22 |
| 269 | `archiveActiveRawDataSheet` | 5695-5712 | 18 |
| 270 | `parseReportMonthInput_` | 5713-5745 | 33 |
| 271 | `promptForLockedYearReportMonth_` | 5746-5789 | 44 |
| 272 | `boolText_` | 5790-5793 | 4 |
| 273 | `isPrimaryPMRRowValue_` | 5794-5798 | 5 |
| 274 | `assignPrimaryPMRRows_` | 5799-5826 | 28 |
| 275 | `getCurrentBannersSheet_` | 5827-5838 | 12 |
| 276 | `getCurrentUnlockedCarePlanSheet_` | 5839-5847 | 9 |
| 277 | `getCurrentCarePlanDueSheet_` | 5848-5859 | 12 |
| 278 | `getPreviousMasterListSheet_` | 5860-5865 | 6 |
| 279 | `getCurrentMasterListSheet_` | 5866-5871 | 6 |
| 280 | `applyStandardFormatting_` | 5872-5914 | 43 |
| 281 | `applyStandardFormattingAfterHeadersAndData_` | 5915-5924 | 10 |
| 282 | `forceStandardTitleCellAlignment_` | 5925-5933 | 9 |
| 283 | `captureHiddenSheetNames_` | 5934-5942 | 9 |
| 284 | `restorePreviouslyHiddenSheets_` | 5943-5959 | 17 |
| 285 | `finalizeWorkflowAfterCreateOrUpdate_` | 5960-5967 | 8 |
| 286 | `hidePreviousMonthSheets_` | 5968-5971 | 4 |
| 287 | `autoHidePreviousMonthSheetsAfterWorkflow_` | 5972-5986 | 15 |
| 288 | `applyIndexSheetRowFills_` | 5987-6007 | 21 |
| 289 | `applyCurrentVsOlderTabColors_` | 6008-6030 | 23 |
| 290 | `organizeSheetTabs_` | 6031-6034 | 4 |
| 291 | `formatDateColumnsByHeader_` | 6035-6053 | 19 |
| 292 | `rowObjectFromHeaders_` | 6054-6063 | 10 |
| 293 | `getLiveDashboardAuditStatus_` | 6064-6067 | 4 |
| 294 | `getLiveTemplateValidationStatus_` | 6068-6071 | 4 |
| 295 | `getLiveFrameworkHealthStatus_` | 6072-6075 | 4 |
| 296 | `getLiveSheetStatus_` | 6076-6081 | 6 |
| 297 | `setMonthlySheetNameFast_` | 6082-6087 | 6 |
| 298 | `writePMRContactsToParticipantRows_` | 6088-6243 | 156 |
| 299 | `buildParticipantContactKey_` | 6244-6252 | 9 |
| 300 | `isExpiredContactPhoneDate_` | 6253-6259 | 7 |
| 301 | `capitalizeContactPart_` | 6260-6266 | 7 |
| 302 | `formatRankedContact_` | 6267-6282 | 16 |
| 303 | `getMostRecentDateFromRowsByHeader_` | 6283-6294 | 12 |
| 304 | `isDateInStrictLocalRangeInclusive_` | 6295-6305 | 11 |
| 305 | `isDateDisplayInReportWindow_` | 6306-6309 | 4 |
| 306 | `isParticipantEnrollmentStatusDisenrolled_` | 6310-6319 | 10 |
| 307 | `getSheetTypeForOrganization_` | 6320-6333 | 14 |
| 308 | `collectFrameworkHealthCheckRows_` | 6334-6345 | 12 |
| 309 | `collectWorkflowSyncVerificationRows_` | 6346-6353 | 8 |
| 310 | `runFrameworkSmokeValidation` | 6354-6369 | 16 |
| 311 | `collectFrameworkSmokeValidationRows_` | 6370-6412 | 43 |
| 312 | `appendFrameworkSmokeValidationRow_` | 6413-6416 | 4 |
| 313 | `functionSourceContainsAll_` | 6417-6423 | 7 |
| 314 | `runDashboardQualityMasterListHealthCheck_` | 6424-6432 | 9 |
| 315 | `buildCombinedFrameworkTestDashboardRows_` | 6433-6443 | 11 |
| 316 | `applyDashboardTemplateFormattingToActiveReportSheet_` | 6444-6454 | 11 |
| 317 | `applyDashboardSortOrderAlternatingColors_` | 6455-6496 | 42 |
| 318 | `ensureStandardTitleRows_` | 6497-6514 | 18 |
| 319 | `isDateLikeHeader_` | 6515-6523 | 9 |
| 320 | `buildMonthlySheetNameNoDashAfterPrefix_` | 6524-6527 | 4 |
| 321 | `formatReportDateLabel_` | 6528-6534 | 7 |
| 322 | `buildBannerReportOutputName_` | 6535-6539 | 5 |
| 323 | `renameSheetSafely_` | 6540-6553 | 14 |
| 324 | `deleteSheetIfExists_` | 6554-6577 | 24 |
| 325 | `writeBannerReportDates_` | 6578-6586 | 9 |
| 326 | `copyRawBannerDataToOutput_` | 6587-6637 | 51 |
| 327 | `ensureSheetHasAtLeastRows_` | 6638-6644 | 7 |
| 328 | `validateBannerFormatterOutput_` | 6645-6672 | 28 |
| 329 | `archiveRawSourceAndDeleteLocal_` | 6673-6694 | 22 |
| 330 | `archiveRawDataSheet_` | 6695-6717 | 23 |
| 331 | `hideMonthlyImportSheets` | 6718-6729 | 12 |
| 332 | `hideMonthlyActiveSheets` | 6730-6740 | 11 |
| 333 | `hideMonthlySheetsBySpecs_` | 6741-6765 | 25 |
| 334 | `archiveMonthlyImportSheets` | 6766-6782 | 17 |
| 335 | `archiveMonthlyActiveSheets` | 6783-6799 | 17 |
| 336 | `archiveMonthlySheetsBySpecs_` | 6800-6838 | 39 |
| 337 | `findArchiveMonthlyCandidateSheets_` | 6839-6862 | 24 |
| 338 | `copySheetToArchiveAndDeleteLocal_` | 6863-6887 | 25 |
| 339 | `notifyArchiveMonthlySheetsResult_` | 6888-6896 | 9 |
| 340 | `deleteArchiveSheetIfExists_` | 6897-6913 | 17 |
| 341 | `formatMonthlyChangeSubheaderRow` | 6914-6917 | 4 |
| 342 | `formatMonthlyChangeSubsectionBlock` | 6918-6929 | 12 |
| 343 | `getMonthlyChangeSubsectionLabels` | 6930-6934 | 5 |
| 344 | `normalizeNumberFormatForCompare_` | 6935-6954 | 20 |
| 345 | `numberFormatsMatch_` | 6955-6960 | 6 |
| 346 | `validateTemplateFromDashboard_` | 6961-7106 | 146 |
| 347 | `writeTemplateValidationReport_` | 7107-7112 | 6 |
| 348 | `formatRawData` | 7113-7199 | 87 |
| 349 | `ensureRawDataHeaderRows_` | 7200-7217 | 18 |
| 350 | `rowLooksLikeParticipantHeader_` | 7218-7227 | 10 |
| 351 | `getRawDataCurrentHeadersOrDefaults_` | 7228-7234 | 7 |
| 352 | `enforceDemoPStrictDashboardSchema_` | 7235-7278 | 44 |
| 353 | `buildRawDataSourceArchiveName_` | 7279-7290 | 12 |
| 354 | `mapRowsToHeaders_` | 7291-7302 | 12 |
| 355 | `applyUniversalFastCanvasFormatting_` | 7303-7320 | 18 |
| 356 | `applyGovernedTextAndNumberFormats_` | 7321-7352 | 32 |
| 357 | `applyOutputVisibilityPolicy_` | 7353-7364 | 12 |
| 358 | `createOutputSheetFromDashboardTemplate_` | 7365-7438 | 74 |
| 359 | `createRawDataOutputSheetFromTemplateFast_` | 7439-7516 | 78 |
| 360 | `ensureOutputSheetHasFormattedRows_` | 7517-7549 | 33 |
| 361 | `syncRawDataBannerColumns_` | 7550-7631 | 82 |
| 362 | `buildSourceMapByCompositeKeyForDemoPBanner_` | 7632-7673 | 42 |
| 363 | `formatCarePlanDueReport` | 7674-7682 | 9 |
| 364 | `formatUnlockedCarePlanReport` | 7683-7691 | 9 |
| 365 | `formatCarePlanDueOrUnlockedFromDashboard_` | 7692-7786 | 95 |
| 366 | `buildRawArchiveNameForSheetType_` | 7787-7813 | 27 |
| 367 | `collectAndClearMovedTitleInfoCells_` | 7814-7840 | 27 |
| 368 | `prepareCarePlanSourceSheetForDashboardFormat_` | 7841-7847 | 7 |
| 369 | `prepareRawDataSourceSheetForDashboardFormat_` | 7848-7861 | 14 |
| 370 | `buildRawDataHeadersForFormatting_` | 7862-7872 | 11 |
| 371 | `getRawDataApprovedAddedColumns_` | 7873-7878 | 6 |
| 372 | `processRawDataApprovedSyncColumns_` | 7879-7902 | 24 |
| 373 | `writeChangedColumnsOnly_` | 7903-7944 | 42 |
| 374 | `getRawDataDemoPSourceHeaders_` | 7945-8003 | 59 |
| 375 | `getRawDataDisallowedWorkingColumns_` | 8004-8054 | 51 |
| 376 | `isOngoingOutputSheetType_` | 8055-8062 | 8 |
| 377 | `buildDashboardOutputSheetName_` | 8063-8097 | 35 |
| 378 | `syncMasterListMonthlySourcesIntoData_` | 8098-8103 | 6 |
| 379 | `syncBannerSourceIntoData_` | 8104-8132 | 29 |
| 380 | `syncUnlockedCarePlanSourceIntoData_` | 8133-8167 | 35 |
| 381 | `syncCarePlanDueSourceIntoData_` | 8168-8201 | 34 |
| 382 | `syncRowsFromSourceMapData_` | 8202-8241 | 40 |
| 383 | `buildSourceMapBySingleKeyForPart5_` | 8242-8279 | 38 |
| 384 | `buildSourceMapByCompositeKeyForPart5_` | 8280-8321 | 42 |
| 385 | `shouldProcessRowByPMR_` | 8322-8346 | 25 |
| 386 | `normalizeSyncFieldPairs_` | 8347-8354 | 8 |
| 387 | `syncMasterListFromBanners_` | 8355-8384 | 30 |
| 388 | `syncMasterListFromUnlockedCarePlan_` | 8385-8420 | 36 |
| 389 | `syncMasterListFromCarePlanDue_` | 8421-8454 | 34 |
| 390 | `syncRowsFromSourceMap_` | 8455-8617 | 163 |
| 391 | `getDefaultDemoPMetadataHeaderRows_v155_` | 8618-8635 | 18 |
| 392 | `buildDemoPFromScratch` | 8636-8660 | 25 |
| 393 | `updateDemoPMonthlySync` | 8661-8700 | 40 |
| 394 | `enforceDemoPPostFlattenFormatting_` | 8701-8719 | 19 |
| 395 | `sortSheetAlphabeticallyByParticipantName_` | 8720-8741 | 22 |
| 396 | `getDemoPMonthlySyncChangedPMRs_` | 8742-8811 | 70 |
| 397 | `processDemoPDataWithFillBlankMask_` | 8812-8847 | 36 |
| 398 | `buildDemoPFreshRowsForPMRs_` | 8848-8869 | 22 |
| 399 | `processDemoPFreshRowsInMemory_` | 8870-8880 | 11 |
| 400 | `flattenDemoPContactsToPrimaryRows_` | 8881-8941 | 61 |
| 401 | `buildDemoPContactSummaryForFlatRecord_` | 8942-8960 | 19 |
| 402 | `sortDemoPFlatRows_` | 8961-8974 | 14 |
| 403 | `processDemoP` | 8975-9054 | 80 |
| 404 | `processDemoPAsWorkingSource_` | 9055-9102 | 48 |
| 405 | `markPrimaryPMRRowsForSequentialData_` | 9103-9132 | 30 |
| 406 | `assignPrimaryPMRRowsInData_` | 9133-9153 | 21 |
| 407 | `formatDemoPStructure` | 9154-9157 | 4 |
| 408 | `buildRawDataSheetName_` | 9158-9161 | 4 |
| 409 | `getOrCreateDemoPProcessingSheet_` | 9162-9236 | 75 |
| 410 | `deleteSheetIfExistsForDemoPProcess_` | 9237-9250 | 14 |
| 411 | `getLastRawDataDisenrolledBuildResult_` | 9251-9258 | 8 |
| 412 | `setLastRawDataDisenrolledBuildResult_` | 9259-9265 | 7 |
| 413 | `updateExistingDemoPFromRawData_` | 9266-9325 | 60 |
| 414 | `createActiveDemoPFromRawData_` | 9326-9425 | 100 |
| 415 | `populateDemoPUpdateColumns_` | 9426-9443 | 18 |
| 416 | `populateUniversalMetadataColumns_` | 9444-9486 | 43 |
| 417 | `buildSourceHashByPMR_` | 9487-9504 | 18 |
| 418 | `buildSourceHashForRows_` | 9505-9527 | 23 |
| 419 | `buildSourceHashForRow_` | 9528-9531 | 4 |
| 420 | `buildColumnsUpdatedText_` | 9532-9547 | 16 |
| 421 | `normalizeHashValue_` | 9548-9555 | 8 |
| 422 | `computeStableHash_` | 9556-9563 | 8 |
| 423 | `verifyPrimaryPMRColumnFromRawData_` | 9564-9572 | 9 |
| 424 | `createOrRefreshDemoPTemplate_` | 9573-9580 | 8 |
| 425 | `getOrCreateDemoPTemplate_` | 9581-9587 | 7 |
| 426 | `initializeDemoPTemplateTitleRows_` | 9588-9603 | 16 |
| 427 | `applyDemoPTemplateFormatting_` | 9604-9625 | 22 |
| 428 | `applyDemoPTemplateToSheet_` | 9626-9661 | 36 |
| 429 | `applyDemoPDateFormattingByHeader_` | 9662-9715 | 54 |
| 430 | `buildMonthlyChangeReport` | 9716-9733 | 18 |
| 431 | `buildMonthlyChangeReportForMonth_` | 9734-9843 | 110 |
| 432 | `getOrBuildMonthlyChangeReport_` | 9844-9900 | 57 |
| 433 | `compareRawDemoPForSectionReport_` | 9901-10093 | 193 |
| 434 | `rowsWithDOBOnlyForSection_` | 10094-10099 | 6 |
| 435 | `getChangedColumnsForSectionRows_` | 10100-10115 | 16 |
| 436 | `buildColumnSignaturesForSection_` | 10116-10128 | 13 |
| 437 | `compareRawDemoPForChanges_` | 10129-10291 | 163 |
| 438 | `getRawDemoPDataForCompare_` | 10292-10359 | 68 |
| 439 | `compareSingleFieldAndAdd_` | 10360-10408 | 49 |
| 440 | `addMCRRow_` | 10409-10451 | 43 |
| 441 | `buildContactCompareMap_` | 10452-10470 | 19 |
| 442 | `getFieldValueFromRow_` | 10471-10476 | 6 |
| 443 | `buildParticipantName_` | 10477-10493 | 17 |
| 444 | `displayValueForReport_` | 10494-10501 | 8 |
| 445 | `buildMonthlyChangeReportSectionLayout_` | 10502-10525 | 24 |
| 446 | `padRowToWidth_` | 10526-10531 | 6 |
| 447 | `stripMonthlyChangeNativeBandings_` | 10532-10541 | 10 |
| 448 | `getMonthlyChangeSectionSpecs_` | 10542-10588 | 47 |
| 449 | `buildMonthlyChangeSectionRows_` | 10589-10635 | 47 |
| 450 | `appendMonthlyChangeCompiledRow_` | 10636-10643 | 8 |
| 451 | `appendMonthlyChangeSectionBlock_` | 10644-10673 | 30 |
| 452 | `populateMonthlyChangeReportSections_` | 10674-10726 | 53 |
| 453 | `findMonthlyChangeSectionTitleRow_` | 10727-10742 | 16 |
| 454 | `findNextMonthlyChangeSectionTitleRow_` | 10743-10763 | 21 |
| 455 | `getChangedPMRsFromMonthlyChangeReport_` | 10764-10857 | 94 |
| 456 | `writeDiagnosticReport_` | 10858-10897 | 40 |
| 457 | `runMonthlyUpdate` | 10898-10924 | 27 |
| 458 | `updateMasterList` | 10925-10930 | 6 |
| 459 | `updateMasterListForMonth_` | 10931-11024 | 94 |
| 460 | `createMasterList` | 11025-11097 | 73 |
| 461 | `copyPrimaryDemoPRowsToMasterListByHeader_` | 11098-11164 | 67 |
| 462 | `getMasterListTemplateHeaders_` | 11165-11171 | 7 |
| 463 | `createOrRefreshMasterListTemplate_` | 11172-11179 | 8 |
| 464 | `getOrCreateMasterListTemplate_` | 11180-11186 | 7 |
| 465 | `createMasterListSheetFromTemplate_` | 11187-11243 | 57 |
| 466 | `writeMasterListTitleDateBlock_` | 11244-11250 | 7 |
| 467 | `initializeMasterListTitleRows_` | 11251-11259 | 9 |
| 468 | `copyDemoPHeaderRowsToMasterList_` | 11260-11277 | 18 |
| 469 | `copyQualifyingDemoPRowsToMasterList_` | 11278-11303 | 26 |
| 470 | `formatMasterListSheet_` | 11304-11311 | 8 |
| 471 | `getMonthPartsFromTitleRows_` | 11312-11323 | 12 |
| 472 | `updateCopiedMasterListHeader_` | 11324-11331 | 8 |
| 473 | `createIndexSheet` | 11332-11486 | 155 |
| 474 | `generateArchiveFileIndex_` | 11487-11490 | 4 |
| 475 | `setupIndexRefreshOnSheetAddedTrigger_` | 11491-11507 | 17 |
| 476 | `handleSpreadsheetChangeForIndex` | 11508-11521 | 14 |
| 477 | `enforceGlobalSheetSortOrder_` | 11522-11604 | 83 |
| 478 | `extractFirstDateFromSheetName_` | 11605-11623 | 19 |
| 479 | `parseIndexMonthDate_` | 11624-11647 | 24 |
| 480 | `organizeWorkbookTabs_` | 11648-11694 | 47 |
| 481 | `hideSystemAndTestingSheets_` | 11695-11712 | 18 |
| 482 | `getSystemAndTestingSheetNames_` | 11713-11728 | 16 |
| 483 | `isSystemOrTestingSheet_` | 11729-11747 | 19 |
| 484 | `assignSortOrderAndHideExtraRows` | 11748-11754 | 7 |
| 485 | `applySortOrderDisplayForMasterList_` | 11755-11760 | 6 |
| 486 | `buildParticipantBlocksForSortOrder_` | 11761-11787 | 27 |
| 487 | `showAllMasterListRows` | 11788-11795 | 8 |
| 488 | `groupMasterListRowsByPMR_` | 11796-11800 | 5 |
| 489 | `hideRowsWithBlankDOB_` | 11801-11804 | 4 |
| 490 | `sortMasterListByParticipantNameAndPMR_` | 11805-11864 | 60 |
| 491 | `getPrimaryRowScore_` | 11865-11883 | 19 |
| 492 | `hideNonPrimaryPMRRows_` | 11884-11908 | 25 |
| 493 | `hideRowNumberBatches_` | 11909-11926 | 18 |
| 494 | `clearAllRowGroupsIfPossible_` | 11927-11938 | 12 |
| 495 | `prepareMasterListSortOrderBeforeFormatting_` | 11939-11945 | 7 |
| 496 | `applyFinalMasterListColorAndDisplay_` | 11946-11951 | 6 |
| 497 | `applyMasterListDisplaySettings_` | 11952-11955 | 4 |
| 498 | `processMasterListFull_` | 11956-11963 | 8 |
| 499 | `processMasterListDataOnly_` | 11964-11967 | 4 |
| 500 | `processMasterListSingleDataPass_` | 11968-12002 | 35 |
| 501 | `populateParticipantNameData_` | 12003-12021 | 19 |
| 502 | `populateDemoPNameData_` | 12022-12038 | 17 |
| 503 | `updateBannerColumnData_` | 12039-12063 | 25 |
| 504 | `combineAddressesData_` | 12064-12077 | 14 |
| 505 | `handleLanguageData_` | 12078-12099 | 22 |
| 506 | `splitPhoneNumbersData_` | 12100-12126 | 27 |
| 507 | `runMasterContactProcessData_` | 12127-12131 | 5 |
| 508 | `combineNotesSummaryData_` | 12132-12158 | 27 |
| 509 | `rebuildChangedPMRsFromDemoP_` | 12159-12168 | 10 |
| 510 | `copyPreviousMasterListToCurrentMonth_` | 12169-12194 | 26 |
| 511 | `rebuildChangedPMRsOnExistingMaster_` | 12195-12221 | 27 |
| 512 | `updateMasterListFromMonthlyChangeActions_` | 12222-12251 | 30 |
| 513 | `getPMRsForMonthlyChangeSections_` | 12252-12262 | 11 |
| 514 | `deletePMRBlocksFromMasterListBySet_` | 12263-12277 | 15 |
| 515 | `updatePrimaryRowsFromDemoPForPMRs_` | 12278-12325 | 48 |
| 516 | `mergeSecondaryRowsFromDemoPForPMRs_` | 12326-12397 | 72 |
| 517 | `buildMappedMasterRowFromDemoRow_` | 12398-12407 | 10 |
| 518 | `mutateMasterRowColumnsFromDemoRow_` | 12408-12417 | 10 |
| 519 | `hideSystemSheetsNow` | 12418-12425 | 8 |
| 520 | `showSystemSheetsNow` | 12426-12458 | 33 |
| 521 | `getPrimaryMergeRowItem_` | 12459-12477 | 19 |
| 522 | `getPrimaryRowChangedColumnDetails_` | 12478-12547 | 70 |
| 523 | `formatMergeAuditValueForDisplay_` | 12548-12557 | 10 |
| 524 | `getMergeAuditParticipantName_` | 12558-12563 | 6 |
| 525 | `getMergeAuditParticipantNameFromRows_` | 12564-12584 | 21 |
| 526 | `buildMergeAuditContactSummary_` | 12585-12608 | 24 |
| 527 | `getMergeAuditChangedFields_` | 12609-12641 | 33 |
| 528 | `buildMergeRowsByPMRFromData_` | 12642-12665 | 24 |
| 529 | `buildSecondaryMergeKeyMapForRows_` | 12666-12695 | 30 |
| 530 | `buildMergeKeyMapForRows_` | 12696-12725 | 30 |
| 531 | `buildContactMergeRowKey_` | 12726-12749 | 24 |
| 532 | `getMergeRowValue_` | 12750-12764 | 15 |
| 533 | `createDisenrolledList` | 12765-12794 | 30 |
| 534 | `processBlankContactSummariesOnDemoP_` | 12795-12815 | 21 |
| 535 | `splitRawDataRowsIntoActiveAndDisenrolled_` | 12816-12867 | 52 |
| 536 | `buildDisenrolledPMRSetFromDemoPValues_` | 12868-12885 | 18 |
| 537 | `loadDisenrolledPMRSetForMonth_` | 12886-12903 | 18 |
| 538 | `appendDisenrolledRowsFromRawDataToExclusion_` | 12904-12908 | 5 |
| 539 | `moveDisenrolledPMRsFromDemoPToExclusion_` | 12909-13019 | 111 |
| 540 | `appendDisenrolledDeltasToExclusionSheet_` | 13020-13087 | 68 |
| 541 | `appendDisenrolledPMRBlocksToExclusion_` | 13088-13099 | 12 |
| 542 | `createDisenrolledExclusionSheetFromDashboardTemplate_` | 13100-13141 | 42 |
| 543 | `loadDisenrolledExclusionPMRsForPart3_` | 13142-13161 | 20 |
| 544 | `removeDisenrolledPMRBlocksFromMasterUsingDemoP_` | 13162-13201 | 40 |
| 545 | `applyDisenrolledExclusionCreateFormattingOnly_` | 13202-13314 | 113 |
| 546 | `getCurrentRawDataSheet_` | 13315-13319 | 5 |
| 547 | `getPreviousRawDataSheet_` | 13320-13324 | 5 |
| 548 | `getCurrentDemoPSheet_` | 13325-13332 | 8 |
| 549 | `getPreviousDemoPSheet_` | 13333-13338 | 6 |
| 550 | `getMonthlyChangeReportHeaders_` | 13339-13350 | 12 |
| 551 | `getMonthlyChangeReportDateIndexes_` | 13351-13356 | 6 |
| 552 | `convertMonthlyChangeReportDateValues_` | 13357-13386 | 30 |
| 553 | `buildMonthlyChangeReportRow_` | 13387-13407 | 21 |
| 554 | `formatMonthlyChangeReportSectionSheet_` | 13408-13427 | 20 |
| 555 | `runDashboardQualityStartUp` | 13428-13434 | 7 |
| 556 | `runDashboardQualityDashboardVerificationSections_` | 13435-13488 | 54 |
| 557 | `getDashboardVerificationPassRow_` | 13489-13498 | 10 |
| 558 | `appendDashboardVerificationPassIfNoIssues_` | 13499-13503 | 5 |
| 559 | `getDashboardSectionHeaderWidth_` | 13504-13509 | 6 |
| 560 | `collectBlankDashboardCells_` | 13510-13519 | 10 |
| 561 | `collectFormatDashboardGlobalInputVerificationRows_` | 13520-13551 | 32 |
| 562 | `collectFormatDashboardTitleRowsVerificationRows_` | 13552-13588 | 37 |
| 563 | `collectFormatDashboardSheetDefinitionVerificationRows_` | 13589-13617 | 29 |
| 564 | `collectFormatDashboardSheetHeaderVerificationRows_` | 13618-13654 | 37 |
| 565 | `collectFormatDashboardColumnDefinitionVerificationRows_` | 13655-13684 | 30 |
| 566 | `collectFormatDashboardSheetBehaviorVerificationRows_` | 13685-13713 | 29 |
| 567 | `getDashboardQualitySectionLastRunMillis_` | 13714-13723 | 10 |
| 568 | `dashboardQualitySectionRanWithinLastHour_` | 13724-13728 | 5 |
| 569 | `runDashboardQualitySectionIfDue_` | 13729-13736 | 8 |
| 570 | `runDashboardQualityQuick` | 13737-13740 | 4 |
| 571 | `runDashboardQualityValidateTemplates` | 13741-13748 | 8 |
| 572 | `runDashboardQualityTemplateAndFormatSections_` | 13749-13780 | 32 |
| 573 | `getDashboardQualitySectionRegistry_` | 13781-13792 | 12 |
| 574 | `collectDashboardQualityPerformanceSummaryRows_` | 13793-13842 | 50 |
| 575 | `runDashboardQualityPerformanceSummary_` | 13843-13849 | 7 |
| 576 | `runDashboardQualityCarePlanSyncDiagnostics_` | 13850-13870 | 21 |
| 577 | `runDashboardQualityFull` | 13871-13923 | 53 |
| 578 | `runAllFrameworkTestsAndBuildDashboard` | 13924-13932 | 9 |
| 579 | `repairAllTemplateDateFormats` | 13933-14005 | 73 |
| 580 | `normalizeSectionRowForWidth_` | 14006-14011 | 6 |
| 581 | `rowHasAnyValue_` | 14012-14017 | 6 |
| 582 | `trimTrailingBlankRows_` | 14018-14023 | 6 |
| 583 | `getDefaultDashboardQualityDetailHeader_` | 14024-14045 | 22 |
| 584 | `collectExistingDashboardQualitySectionBlocks_` | 14046-14063 | 18 |
| 585 | `getDashboardQualityNotRunMessage_` | 14064-14071 | 8 |
| 586 | `buildDefaultDashboardQualitySectionBlock_` | 14072-14087 | 16 |
| 587 | `normalizeDashboardQualitySectionBlock_` | 14088-14127 | 40 |
| 588 | `rebuildDashboardQualityReportShellCompact_` | 14128-14170 | 43 |
| 589 | `getDashboardQualitySectionTitleForKey_` | 14171-14178 | 8 |
| 590 | `getDashboardQualitySectionKeyForTitle_` | 14179-14186 | 8 |
| 591 | `hasDashboardQualityTemplateShell_` | 14187-14203 | 17 |
| 592 | `initializeDashboardQualitySheet_` | 14204-14222 | 19 |
| 593 | `initializeSystemSheets_` | 14223-14240 | 18 |
| 594 | `deleteLegacyOperationalAndDiagnosticSheets_` | 14241-14244 | 4 |
| 595 | `ensureDashboardQualityReportSheet_` | 14245-14248 | 4 |
| 596 | `ensureDashboardQualityTemplateShell_` | 14249-14257 | 9 |
| 597 | `ensureDashboardQualitySectionShells_` | 14258-14262 | 5 |
| 598 | `getDashboardQualityFixedSectionStartRow_` | 14263-14268 | 6 |
| 599 | `applyDashboardQualityReportColumnSettings_` | 14269-14316 | 48 |
| 600 | `styleDashboardQualityReport_` | 14317-14327 | 11 |
| 601 | `normalizeDashboardQualityHeaderLabels_` | 14328-14331 | 4 |
| 602 | `isDashboardQualityNotesLabel_` | 14332-14336 | 5 |
| 603 | `normalizeDashboardQualityOutputRow_` | 14337-14367 | 31 |
| 604 | `getDashboardQualitySectionLetter_` | 14368-14372 | 5 |
| 605 | `normalizeDashboardQualityIssueValue_` | 14373-14378 | 6 |
| 606 | `normalizeDashboardQualityRowsForSection_` | 14379-14411 | 33 |
| 607 | `normalizeDashboardQualityDataRows_` | 14412-14419 | 8 |
| 608 | `buildTimestampedDashboardQualitySectionRows_` | 14420-14442 | 23 |
| 609 | `getStatusFromDashboardQualityRows_` | 14443-14461 | 19 |
| 610 | `getMostRecentTimingDurationForSectionKey_` | 14462-14483 | 22 |
| 611 | `getTimingProcessNameForDashboardQualitySection_` | 14484-14503 | 20 |
| 612 | `dashboardQualityRowsEqualValues_` | 14504-14511 | 8 |
| 613 | `saveDashboardQualitySectionRows_` | 14512-14541 | 30 |
| 614 | `getDashboardQualitySectionRows_` | 14542-14553 | 12 |
| 615 | `deleteLegacyQualityReportSheet_` | 14554-14564 | 11 |
| 616 | `deleteLegacyStandaloneQualityReports_` | 14565-14571 | 7 |
| 617 | `saveDashboardQualityRowsForTemplateValidation_` | 14572-14579 | 8 |
| 618 | `saveDashboardQualityRowsForHealthCheck_` | 14580-14592 | 13 |
| 619 | `getStoredDashboardQualityOverallStatus_` | 14593-14601 | 9 |
| 620 | `getStoredDashboardQualityFailureNotes_` | 14602-14613 | 12 |
| 621 | `buildDatedDisenrolledOutputName_` | 14614-14619 | 6 |
| 622 | `forceSheetRowCount_` | 14620-14630 | 11 |
| 623 | `buildCombinedFrameworkTestDashboard` | 14631-14664 | 34 |
| 624 | `updateDashboardQualitySummaryTimingAndSignoffSections_` | 14665-14670 | 6 |
| 625 | `updateDashboardQualitySignoffSection_` | 14671-14682 | 12 |
| 626 | `updateDashboardQualitySummarySection_` | 14683-14693 | 11 |
| 627 | `updateDashboardQualityTimingSummarySection_` | 14694-14697 | 4 |
| 628 | `getDashboardQualitySectionBoundsMap_` | 14698-14726 | 29 |
| 629 | `replaceDashboardQualitySectionsRows_` | 14727-14787 | 61 |
| 630 | `tryDashboardQualityAnchoredColumnWrite_` | 14788-14804 | 17 |
| 631 | `replaceDashboardQualitySectionRows_` | 14805-14878 | 74 |
| 632 | `findDashboardQualitySectionRow_` | 14879-14893 | 15 |
| 633 | `findNextDashboardQualitySectionRow_` | 14894-14904 | 11 |
| 634 | `dashboardQualitySectionContentMatches_` | 14905-14924 | 20 |
| 635 | `mergeDashboardQualityStyleRanges_` | 14925-14942 | 18 |
| 636 | `styleDashboardQualityUpdatedSections_` | 14943-15032 | 90 |
| 637 | `appendCombinedDashboardSignOffRows_` | 15033-15052 | 20 |
| 638 | `buildFrameworkSummaryRows_` | 15053-15083 | 31 |
| 639 | `getStoredSectionStatusAndNotes_` | 15084-15103 | 20 |
| 640 | `getReportOverallStatus_` | 15104-15119 | 16 |
| 641 | `getReportFailureNotes_` | 15120-15139 | 20 |
| 642 | `runFrameworkHealthCheck` | 15140-15166 | 27 |
| 643 | `getFrameworkHealthCheckIssueRows_` | 15167-15172 | 6 |
| 644 | `formatFrameworkHealthCheckIssuesForTiming_` | 15173-15184 | 12 |
| 645 | `appendRequiredFunctionChecks_` | 15185-15191 | 7 |
| 646 | `existsFunctionByName_` | 15192-15199 | 8 |
| 647 | `writeFrameworkHealthCheckReport_` | 15200-15204 | 5 |
| 648 | `normalizeFrameworkHealthCheckRows_` | 15205-15216 | 12 |
| 649 | `getRequiredHelperFunctionNames_` | 15217-15232 | 16 |
| 650 | `getRequiredMenuFunctionNames_` | 15233-15274 | 42 |
| 651 | `getRequiredDashboardFunctionNames_` | 15275-15284 | 10 |
| 652 | `getRequiredTemplateFunctionNames_` | 15285-15293 | 9 |
| 653 | `getRequiredValidationFunctionNames_` | 15294-15301 | 8 |
| 654 | `getRequiredTimingFunctionNames_` | 15302-15310 | 9 |
| 655 | `getRequiredFrameworkDashboardFunctionNames_` | 15311-15323 | 13 |
| 656 | `runWorkflowSyncVerification` | 15324-15327 | 4 |
| 657 | `runDashboardQualityWorkflowSyncVerification_` | 15328-15335 | 8 |
| 658 | `setupSystemSheets` | 15336-15342 | 7 |
| 659 | `verifyFrameworkConfiguration` | 15343-15398 | 56 |
| 660 | `runFrameworkTimed_` | 15399-15418 | 20 |
| 661 | `startFrameworkTiming_` | 15419-15429 | 11 |
| 662 | `markFrameworkStep_` | 15430-15454 | 25 |
| 663 | `writeFrameworkTimingReport_` | 15455-15460 | 6 |
| 664 | `writeTimingReport_` | 15461-15464 | 4 |
| 665 | `trimTimingReportRows_` | 15465-15481 | 17 |
| 666 | `rebuildProductionMonthlyChangeTemplate` | 15482-15561 | 80 |

## Review Conclusion

The monolith is deployable from a syntax and static-structure standpoint. The strongest stability wins are the absence of `getA1Notation(` calls, centralized best-effort warning handling, chunked format extension, and re-enrollment registry reconciliation. Before declaring the workbook operationally hardened, confirm the raw-sheet delete-without-archive behavior and consider debouncing the Index trigger for bulk tab creation workflows.
