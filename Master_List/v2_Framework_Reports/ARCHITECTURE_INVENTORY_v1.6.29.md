<!-- markdownlint-disable MD013 MD024 MD060 -->

# Master List Framework v1.6.29 Complete Architecture Inventory

Authoritative implementation: `Master_List/Current Production Script/v.1.6.29_Current_Production_Script`.

## Protected Production Sections

### CONFIGURATION

- **Section Name:** CONFIGURATION
- **Purpose:** Defines immutable version metadata, worksheet names, header taxonomies, mapping tables, report/template names, formatting constants, change-section constants, and dashboard default datasets used by all production workflows.
- **Start Line:** 28
- **End Line:** 231
- **Function Count:** 0
- **Public Function Count:** 0
- **Internal Function Count:** 0
- **Wrapper Count:** 0 (`None`)
- **Helper Count:** 0
- **Validation Function Count:** 0
- **Timing Function Count:** 0
- **Configuration Dependencies:** `CONFIGURATION`, `DATE_SHEET_FORMAT`, `DEMO_P`, `DEMO_P_PREFIX`, `DEMO_P_TEMPLATE_SHEET`, `DISENROLLED_EXCLUSION_SHEET`, `FORMAT_ALLOWED_EMPTY_COLUMNS`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `INDEX_BUFFER_COLUMN`, `INDEX_HEADERS`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `INDEX_TOTAL_COLUMNS`, `MASTER_LIST`, `MASTER_LIST_ADDED_HEADERS`, `MASTER_LIST_MERGE_BASELINE_VERSION`, `MASTER_LIST_MERGE_ML_VERSION`, `MASTER_LIST_MERGE_REBUILD_SECTION`, `MASTER_LIST_PREFIX`, `MASTER_LIST_TEMPLATE_SHEET`, `ML_HEADER_CACHE_`, `ML_HEADER_MAP_CACHE_`, `ML_MONTHLY_SHEET_LOOKUP_CACHE_`, `ML_SHEET_DIMENSION_CACHE_`, `MONTHLY_CHANGE`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_VERSION`, `SHEET_BASE_COLORS`, `SHEET_TAB_ORDER`, `SHEET_TYPE`, `SYSTEM_SHEETS_TO_HIDE`
- **Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE`, `RFF_BASE_TEMPLATE_NAME`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_EXCEL_EPOCH_DAY`, `RFF_EXCEL_EPOCH_MONTH`, `RFF_EXCEL_EPOCH_YEAR`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FORMATTER_DATE_PROMPT`, `RFF_MIN_SERIAL_DATE`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_FIRST_BUILD_SHRINK_TO_TARGET`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`, `RFF_VERSION`
- **Format Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE`, `RFF_BASE_TEMPLATE_NAME`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_EXCEL_EPOCH_DAY`, `RFF_EXCEL_EPOCH_MONTH`, `RFF_EXCEL_EPOCH_YEAR`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FORMATTER_DATE_PROMPT`, `RFF_MIN_SERIAL_DATE`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_FIRST_BUILD_SHRINK_TO_TARGET`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`, `RFF_VERSION`
- **Template Dependencies:** `DEMO_P_TEMPLATE_SHEET`, `MASTER_LIST_TEMPLATE_SHEET`, `RFF_BASE_TEMPLATE`, `RFF_BASE_TEMPLATE_NAME`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_FIRST_BUILD_SHRINK_TO_TARGET`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `BANNER_REPORT_ALT_PREFIX`, `INDEX_BUFFER_COLUMN`, `INDEX_DATA_START_ROW`, `INDEX_FIXED_ROW_COUNT`, `INDEX_HEADERS`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `INDEX_TOTAL_COLUMNS`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** Top-level/menu/external or not statically called by another section
- **Calls To:** No cross-section calls detected
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

None.

### HELPER FUNCTIONS

- **Section Name:** HELPER FUNCTIONS
- **Purpose:** Provides shared construction, normalization, parsing, lookup, formatting, sheet I/O, dashboard writing, metadata, date, color, sorting, and utility services used across every workflow.
- **Start Line:** 232
- **End Line:** 2675
- **Function Count:** 147
- **Public Function Count:** 6
- **Internal Function Count:** 141
- **Wrapper Count:** 3 (`setupReportFormattingDashboard`, `rebuildFormatDashboardDefaults`, `quickBuildAllTemplates`)
- **Helper Count:** 94
- **Validation Function Count:** 8
- **Timing Function Count:** 43
- **Configuration Dependencies:** `DATE_SHEET_FORMAT`, `DEMO_P`, `HEADER_ROW`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `ML_HEADER_CACHE_`, `ML_HEADER_MAP_CACHE_`, `ML_MONTHLY_SHEET_LOOKUP_CACHE_`, `ML_SHEET_DIMENSION_CACHE_`, `MONTHLY_CHANGE`, `NO_CHANGE`, `PMR`, `RFF_DASHBOARD_SHEET`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TIMING_SHEET`, `RFF_VERSION`, `SHEET_TYPE`
- **Dashboard Dependencies:** `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_EXCEL_EPOCH_DAY`, `RFF_EXCEL_EPOCH_MONTH`, `RFF_EXCEL_EPOCH_YEAR`, `RFF_MIN_SERIAL_DATE`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `RFF_VERSION`
- **Format Dashboard Dependencies:** `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_EXCEL_EPOCH_DAY`, `RFF_EXCEL_EPOCH_MONTH`, `RFF_EXCEL_EPOCH_YEAR`, `RFF_MIN_SERIAL_DATE`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `RFF_VERSION`
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `TIMING`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, DISENROLLMENT FUNCTIONS, FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, MASTER LIST FUNCTIONS, MENU FUNCTIONS, MONTHLY CHANGE FUNCTIONS, SYNC FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`h_` (L236); `getDefaultColumnDefinitionRows_` (L243); `getAllUniqueHeaders_` (L357); `getColumnStandards_` (L376); `c_` (L476); `writeDashboardTitle_` (L490); `writeDashboardSection_` (L504); `styleDashboard_` (L539); `setupReportFormattingDashboard` (L571); `appendDashboardSectionRows_` (L575); `getResolvedDefaultColumnDefinitionRows_` (L584); `writeDashboardDefaultsFast_` (L618); `rebuildFormatDashboardDefaults` (L693); `setupReportFormattingDashboardFromScriptDefaults_` (L697); `normalizeDashboardSheetTypeKey_` (L712); `getSheetDefinitionByTypeOrNull_` (L730); `getSheetDefinitionByType_` (L737); `sortSheetDefinitionsByProductionOrder_` (L743); `notify_` (L757); `trimExcessRows_` (L765); `hideOldDisenrolledRows_` (L777); `showQuickStartToast_` (L807); `quickSystemSetup` (L812); `quickBuildAllTemplates` (L826); `notifyErrorWithTiming_` (L834); `isBlankCell_` (L839); `coerceToValidDate_` (L844); `spreadsheetSerialDateToLocalDate_` (L894); `isReasonableReportDate_` (L914); `createLocalDateOnly_` (L919); `getTodayLocalDate_` (L923); `getMonthDateParts_` (L928); `formatDateForSheetName_` (L953); `formatDateDisplay_` (L957); `dateKey_` (L962); `isSameDate_` (L967); `isSameMonth_` (L971); `buildMonthlySheetName_` (L976); `buildStandardMonthlySheetName_` (L981); `getNewestFormattedMonthlySheetByPrefix_` (L987); `getMonthlySheetByPrefixAndDate_` (L1018); `setUniqueSheetName_` (L1052); `getHeaders_` (L1085); `getHeaderMap_` (L1105); `buildHeaderIndexMap_` (L1120); `findHeaderIndex_` (L1129); `normalizeHeader_` (L1136); `normalizePMR_` (L1144); `getPMRIndex_` (L1151); `validateRawDataPreflightForDemoP_` (L1155); `getDOBIndex_` (L1187); `normalizeKeyPart_` (L1191); `getDataValues_` (L1210); `getRawDataSourceDataForOutput_` (L1250); `rawDataSourceHeaderRow_` (L1284); `ensurePrimaryPMRRowColumn_` (L1299); `assignPrimaryRowForBlock_` (L1316); `deleteRowNumberBatches_` (L1354); `buildMasterListHeadersBeforeDataCopy_` (L1388); `ensureHeaders_` (L1398); `ensureBannerSummaryOutputHeaders_` (L1425); `ensureContactOutputHeaders_` (L1429); `trimOutputSheetToDataSize_` (L1443); `copyChangedPMRsFromDemoPToMasterList_` (L1453); `applyFinalRowHeightLock_` (L1488); `normalizeCompareValue_` (L1494); `valuesAreEqual_` (L1524); `normalizeText_` (L1528); `normalizeKey_` (L1532); `numberOrDefault_` (L1536); `parseBoolean_` (L1541); `clearHeaderCacheForSheet_` (L1551); `clearSheetRuntimeCachesForSheet_` (L1566); `getHeaderCacheKey_` (L1571); `clearMonthlySheetLookupCache_` (L1578); `getMonthlySheetLookupCacheKey_` (L1584); `getSheetDimensionCacheKey_` (L1591); `clearSheetDimensionCacheForSheet_` (L1595); `getSheetDimensions_` (L1601); `dateOnlyLocalClone_` (L1621); `monthKey_` (L1627); `parseStandardMonthlySheetDateFromName_` (L1632); `buildRowsByPMR_` (L1652); `safeSheetName_` (L1687); `compareValues_` (L1694); `toBool_` (L1698); `truthy_` (L1702); `toNumber_` (L1706); `resizeSheetMinimum_` (L1710); `getThemeColorsFromBase_` (L1726); `getGlobalBorderStyle_` (L1737); `normalizeHex_` (L1742); `hexWithHslLightness_` (L1753); `hexToRgb_` (L1760); `rgbToHex_` (L1769); `rgbToHsl_` (L1777); `hslToRgb_` (L1799); `startRuntimeTiming_` (L1822); `markRuntimeStep_` (L1835); `addRuntimeCounter_` (L1862); `logRuntimeInfo_` (L1867); `logRuntimeWarning_` (L1872); `logRuntimeError_` (L1877); `logBestEffortWarning_` (L1882); `logRuntimeTiming_` (L1886); `getRuntimeTimingSeverity_` (L1903); `getRuntimeTimingReportName_` (L1911); `writeRuntimeTimingReport_` (L1915); `writeRuntimeTimingReportBestEffort_` (L1919); `writeConsolidatedTimingSummaryReport_` (L1931); `writeCombinedFrameworkTimingReport_` (L1935); `getFrameworkTimingRetentionLimit_` (L1953); `getFrameworkTimingReportSheetName_` (L1957); `getFrameworkTimingSectionRegistry_` (L1961); `findFrameworkTimingSectionRow_` (L1986); `findNextFrameworkTimingSectionRow_` (L1999); `collectExistingFrameworkTimingSectionBlocks_` (L2012); `buildDefaultFrameworkTimingSectionBlock_` (L2031); `normalizeFrameworkTimingSectionBlock_` (L2043); `rebuildFrameworkTimingReportShellCompact_` (L2073); `hasFrameworkTimingReportShell_` (L2115); `initializeFrameworkTimingSheet_` (L2141); `ensureFrameworkTimingReport_` (L2160); `trimSheetToColumnCount_` (L2164); `styleFrameworkTimingReport_` (L2178); `getFrameworkTimingSectionForId_` (L2281); `replaceFrameworkTimingSectionRows_` (L2289); `getFrameworkTimingBenchmarkForProcess_` (L2334); `getFrameworkTimingThresholdForSeverity_` (L2352); `ensureFrameworkTimingReportShell_` (L2360); `getFrameworkTimingDetailStartRow_` (L2369); `getFrameworkTimingDetailRows_` (L2376); `getLatestFrameworkTimingRowsByProcess_` (L2400); `getFrameworkTimingBenchmarkSeverity_` (L2421); `getFrameworkTimingModeForStep_` (L2431); `mergeFrameworkTimingModes_` (L2440); `buildFrameworkTimingProcessSummaryRows_` (L2445); `formatTimingTimestampForSummary_` (L2523); `buildFrameworkTimingIssueRows_` (L2533); `buildFrameworkTimingRecommendationRows_` (L2563); `writeFrameworkPerformanceRecommendationsSheet_` (L2580); `getPerformanceRecommendationForTimingStep_` (L2584); `worseTimingSeverity_` (L2624); `appendRuntimeTimingToFrameworkTimingReport_` (L2631); `formatSeconds_` (L2657); `refreshFrameworkTimingReport` (L2666); `writeFrameworkTimingPerformanceRecommendations` (L2670)

### MENU FUNCTIONS

- **Section Name:** MENU FUNCTIONS
- **Purpose:** Builds the spreadsheet UI menu surface and exposes user-facing menu actions for timing, template/system visibility, formatting, and layout capture.
- **Start Line:** 2676
- **End Line:** 3165
- **Function Count:** 22
- **Public Function Count:** 5
- **Internal Function Count:** 17
- **Wrapper Count:** 2 (`toggleFrameworkTiming`, `formatDashboard`)
- **Helper Count:** 16
- **Validation Function Count:** 1
- **Timing Function Count:** 3
- **Configuration Dependencies:** `HEADER_ROW`, `MONTHLY_CHANGE`, `RFF_DASHBOARD_SHEET`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_SHEETS`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET_BASE_COLORS`, `SHEET_TYPE`
- **Dashboard Dependencies:** `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_ENABLED`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_SHEETS`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`
- **Format Dashboard Dependencies:** `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_ENABLED`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_SHEETS`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `RFF_FRAMEWORK_TIMING_ENABLED`, `RFF_TIMING_SHEET`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** FRAMEWORK AND TIMING FUNCTIONS
- **Calls To:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`onOpen` (L2726); `isFrameworkTimingEnabled_` (L2803); `toggleFrameworkTiming` (L2812); `hideTemplates_` (L2820); `showTemplates_` (L2824); `hideSystemSheets_` (L2828); `showSystemSheets_` (L2832); `formatDashboard` (L2836); `saveActiveLayoutToDashboardSettings` (L2840); `saveFormatDashboardConfigChanges_` (L2879); `resolveSheetDefinitionForLayoutSnapshot_` (L2892); `captureActiveSheetLayoutSnapshot_` (L2911); `getHiddenColumnFlags_` (L2964); `isDateNumberFormat_` (L2972); `getDefaultLayoutSnapshotBorderConfig_` (L2977); `upsertDashboardSheetDefinitionBaseColor_` (L2990); `upsertDashboardColumnDefinitionRows_` (L3014); `getDashboardSectionBounds_` (L3051); `ensureDashboardSectionDataCapacity_` (L3079); `writeDashboardLayoutSnapshotSection_` (L3095); `applyLayoutSnapshotBorder_` (L3136); `clearDiagnosticsAndTimingLogs` (L3150)

### FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS

- **Section Name:** FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS
- **Purpose:** Owns Format Dashboard section names and default rows for global settings, sheet definitions, column definitions, behaviors, headers, and system sheet surfaces.
- **Start Line:** 3166
- **End Line:** 3776
- **Function Count:** 12
- **Public Function Count:** 0
- **Internal Function Count:** 12
- **Wrapper Count:** 0 (`None`)
- **Helper Count:** 12
- **Validation Function Count:** 1
- **Timing Function Count:** 0
- **Configuration Dependencies:** `COLUMN`, `DEMO_P`, `HEADERS`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `MONTHLY_CHANGE`, `PMR`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET`
- **Dashboard Dependencies:** `DASHBOARD`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET`, `RFF_VALIDATION_SHEET`
- **Format Dashboard Dependencies:** `DASHBOARD`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET`, `RFF_VALIDATION_SHEET`
- **Template Dependencies:** `RFF_BASE_TEMPLATE_NAME`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** HELPER FUNCTIONS, MASTER LIST FUNCTIONS, MENU FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** HELPER FUNCTIONS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`clearDashboardConfigCache_` (L3256); `getDashboardConfigCacheKey_` (L3261); `getFormatDashboardSectionNames_` (L3278); `getRequiredFrameworkSheetTypes_` (L3290); `getDefaultGlobalSettingsRows_` (L3304); `getDefaultTitleRowRows_` (L3369); `getDefaultSheetDefinitionRows_` (L3378); `getDefaultSheetDefinitionRowsWithColumnCounts_` (L3391); `getDefaultBehaviorRows_` (L3406); `getDefaultSystemSurfaceRows_` (L3419); `getDefaultSheetHeaderRows_` (L3429); `getDefaultHeaderSets_` (L3444)

### TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS

- **Section Name:** TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Purpose:** Creates, refreshes, loads, validates, and formats dashboard-driven report templates; parses dashboard configuration into runtime objects; applies template and section formatting.
- **Start Line:** 3777
- **End Line:** 8146
- **Function Count:** 199
- **Public Function Count:** 19
- **Internal Function Count:** 180
- **Wrapper Count:** 13 (`createOrRefreshAllReportTemplates`, `hideReportTemplates`, `showReportTemplates`, `formatMonthlySheets`, `formatBannerReport`, `validateActiveBannerFormatterOutput`, `hideMonthlyImportSheets`, `hideMonthlyActiveSheets`, `formatMonthlyChangeSubheaderRow`, `formatMonthlyChangeSubsectionBlock`, `formatRawData`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`)
- **Helper Count:** 175
- **Validation Function Count:** 24
- **Timing Function Count:** 0
- **Configuration Dependencies:** `BANNER_SYNC_FIELDS`, `DEMO_P`, `DEMO_P_PREFIX`, `DEMO_P_TEMPLATE_DATE_HEADERS`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `INDEX_HEADERS`, `INDEX_SHEET`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `MASTER_LIST_PREFIX`, `MONTHLY_CHANGE`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `PMR1`, `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SHEET_TYPES`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `RFF_VERSION`, `SHEET_TYPE`
- **Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TIMING_SHEET`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`, `RFF_VALIDATION_SHEET`, `RFF_VERSION`
- **Format Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TIMING_SHEET`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`, `RFF_VALIDATION_SHEET`, `RFF_VERSION`
- **Template Dependencies:** `DEMO_P_TEMPLATE_DATE_HEADERS`, `RFF_BASE_TEMPLATE_NAME`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES`, `RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES`, `RFF_TEMPLATE_SIGNATURE_`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TEMPLATE_STAGED_BUILD_ENABLED`, `RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY`, `RFF_TRUE_SMART_TEMPLATE_REFRESH`, `RFF_USE_TEMPLATE_SIGNATURE_CACHE`, `TEMPLATE`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `BANNER_REPORT_ALT_PREFIX`, `INDEX_HEADERS`, `INDEX_SHEET`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_TIMING_SHEET`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, DISENROLLMENT FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, MENU FUNCTIONS, MONTHLY CHANGE FUNCTIONS, SYNC FUNCTIONS
- **Calls To:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, MONTHLY CHANGE FUNCTIONS, SYNC FUNCTIONS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`createOrRefreshAllReportTemplates` (L3781); `ensureGoldenMasterTemplate_` (L3821); `summarizeTemplateRefreshModes_` (L3860); `hideReportTemplates` (L3871); `showReportTemplates` (L3878); `setReportTemplateVisibility_` (L3885); `validateReportTemplates` (L3918); `validateReportTemplatesCore_` (L3926); `loadDashboardConfig_` (L3936); `buildDashboardSectionIndex_` (L3981); `loadGlobalSettings_` (L4003); `loadTitleRows_` (L4048); `parseTitleRowConfigRow_` (L4083); `normalizeTitleTargetCell_` (L4109); `getTitleRowConfigForSheet_` (L4115); `getThemeFillForTitleRow_` (L4123); `toWrapStrategy_` (L4131); `loadSheetDefinitions_` (L4138); `loadSheetHeaders_` (L4166); `loadColumnDefinitions_` (L4200); `loadSheetBehaviors_` (L4227); `normalizeDashboardSectionTitle_` (L4251); `readDashboardSectionRows_` (L4259); `getBehaviorForSheetType_` (L4304); `createOrRefreshTemplateFromDashboard_` (L4310); `shouldUseStagedTemplateBuild_` (L4382); `shouldRefreshTemplateMetadataOnly_` (L4389); `buildTemplateRefreshDecisionMessage_` (L4400); `refreshTemplateMetadataOnly_` (L4418); `buildTemplateFromDashboardSafely_` (L4431); `getTemplateBuildSheetName_` (L4460); `promoteStagedTemplateBuild_` (L4464); `validateBuiltTemplateMinimumStructure_` (L4476); `buildTemplateFromDashboard_` (L4494); `shouldSkipTemplateResize_` (L4544); `ensureSheetMinimumColumns_` (L4549); `clearTemplateForFullBuild_` (L4558); `applyTemplateRowHeights_` (L4583); `applyFinalRowHeightLockForSheetType_` (L4589); `lockFinalOutputRowHeights_` (L4593); `shouldLockExpandedDataRowHeights_` (L4621); `applyGlobalDefaultRowHeightsToSheet_` (L4630); `safeSetRowHeights_` (L4641); `applyRowHeightRuns_` (L4674); `hideTemplateIfNeeded_` (L4681); `resolveTemplateRowCount_` (L4696); `applyTemplateBaseFormatting_` (L4720); `ensureTitleRowConfig_` (L4769); `applyTitleRows_` (L4782); `rowColToA1_` (L4835); `applyHeaderRow_` (L4846); `applyColumnWidths_` (L4887); `applyColumnWidthsInRuns_` (L4898); `applyDateAndNumberFormats_` (L4934); `enforceTemplateDateAndNumberFormats_` (L4938); `enforceDateAndNumberFormatsForHeaders_` (L4943); `getExpectedNumberFormat_` (L5000); `getGoogleSheetsNumberFormat_` (L5007); `isDateFormatText_` (L5026); `applyHiddenColumnSettings_` (L5031); `applyHiddenColumnSettingsInRuns_` (L5041); `applyDataRows_` (L5077); `applyAlternatingColorRules_` (L5103); `applyMonthlyChangeSpacerRow3Format_` (L5130); `formatMonthlyChangeSubsectionBlock_` (L5160); `writeTemplateMetadata_` (L5206); `buildTemplateFormatSignature_` (L5224); `compactTemplateFormatSignature_` (L5257); `normalizeTemplateFormatSignature_` (L5271); `getTemplateFormatSignatureKey_` (L5280); `getStoredTemplateFormatSignature_` (L5286); `getStoredTemplateFormatSignatureFromSheet_` (L5295); `storeTemplateFormatSignature_` (L5315); `ensureTemplateFilter_` (L5323); `applyTemplateFreezeAndTabColor_` (L5372); `resizeSheet_` (L5410); `resizeSheetGrid_` (L5435); `resizeSheetRows_` (L5468); `resizeSheetColumns_` (L5473); `getHeadersForSheetType_` (L5477); `getDefaultBehavior_` (L5485); `showSheetIfNeeded_` (L5495); `hideSheetIfNeeded_` (L5507); `formatMonthlySheets` (L5521); `buildPromptedMonthContext_` (L5560); `formatMonthlyBannerSheet_` (L5569); `formatMonthlyDashboardSheetFromSource_` (L5591); `formatMonthlyRawDataSheetFromSource_` (L5625); `formatBannerReport` (L5653); `validateActiveBannerFormatterOutput` (L5721); `archiveActiveRawDataSheet` (L5743); `parseReportMonthInput_` (L5761); `promptForLockedYearReportMonth_` (L5794); `boolText_` (L5838); `isPrimaryPMRRowValue_` (L5842); `assignPrimaryPMRRows_` (L5847); `getCurrentBannersSheet_` (L5875); `getCurrentUnlockedCarePlanSheet_` (L5887); `getCurrentCarePlanDueSheet_` (L5896); `getPreviousMasterListSheet_` (L5908); `getCurrentMasterListSheet_` (L5914); `applyStandardFormatting_` (L5920); `applyStandardFormattingAfterHeadersAndData_` (L5963); `forceStandardTitleCellAlignment_` (L5973); `captureHiddenSheetNames_` (L5982); `restorePreviouslyHiddenSheets_` (L5991); `finalizeWorkflowAfterCreateOrUpdate_` (L6008); `hidePreviousMonthSheets_` (L6016); `autoHidePreviousMonthSheetsAfterWorkflow_` (L6020); `applyIndexSheetRowFills_` (L6035); `applyCurrentVsOlderTabColors_` (L6056); `organizeSheetTabs_` (L6079); `formatDateColumnsByHeader_` (L6083); `rowObjectFromHeaders_` (L6102); `getLiveDashboardAuditStatus_` (L6112); `getLiveTemplateValidationStatus_` (L6116); `getLiveFrameworkHealthStatus_` (L6120); `getLiveSheetStatus_` (L6124); `setMonthlySheetNameFast_` (L6130); `writePMRContactsToParticipantRows_` (L6136); `buildParticipantContactKey_` (L6292); `isExpiredContactPhoneDate_` (L6301); `capitalizeContactPart_` (L6308); `formatRankedContact_` (L6315); `getMostRecentDateFromRowsByHeader_` (L6331); `isDateInStrictLocalRangeInclusive_` (L6343); `isDateDisplayInReportWindow_` (L6354); `isParticipantEnrollmentStatusDisenrolled_` (L6358); `getSheetTypeForOrganization_` (L6368); `collectFrameworkHealthCheckRows_` (L6382); `collectWorkflowSyncVerificationRows_` (L6394); `runFrameworkSmokeValidation` (L6402); `collectFrameworkSmokeValidationRows_` (L6418); `appendFrameworkSmokeValidationRow_` (L6462); `functionSourceContainsAll_` (L6466); `runDashboardQualityMasterListHealthCheck_` (L6473); `buildCombinedFrameworkTestDashboardRows_` (L6482); `applyDashboardTemplateFormattingToActiveReportSheet_` (L6493); `applyDashboardSortOrderAlternatingColors_` (L6504); `ensureStandardTitleRows_` (L6546); `isDateLikeHeader_` (L6564); `buildMonthlySheetNameNoDashAfterPrefix_` (L6573); `formatReportDateLabel_` (L6577); `buildBannerReportOutputName_` (L6584); `renameSheetSafely_` (L6589); `deleteSheetIfExists_` (L6603); `writeBannerReportDates_` (L6627); `copyRawBannerDataToOutput_` (L6636); `ensureSheetHasAtLeastRows_` (L6687); `validateBannerFormatterOutput_` (L6694); `archiveRawSourceAndDeleteLocal_` (L6722); `archiveRawDataSheet_` (L6744); `hideMonthlyImportSheets` (L6767); `hideMonthlyActiveSheets` (L6779); `hideMonthlySheetsBySpecs_` (L6790); `archiveMonthlyImportSheets` (L6815); `archiveMonthlyActiveSheets` (L6832); `archiveMonthlySheetsBySpecs_` (L6849); `findArchiveMonthlyCandidateSheets_` (L6888); `copySheetToArchiveAndDeleteLocal_` (L6912); `notifyArchiveMonthlySheetsResult_` (L6937); `deleteArchiveSheetIfExists_` (L6946); `formatMonthlyChangeSubheaderRow` (L6963); `formatMonthlyChangeSubsectionBlock` (L6967); `getMonthlyChangeSubsectionLabels` (L6979); `normalizeNumberFormatForCompare_` (L6984); `numberFormatsMatch_` (L7004); `validateTemplateFromDashboard_` (L7010); `writeTemplateValidationReport_` (L7156); `formatRawData` (L7162); `ensureRawDataHeaderRows_` (L7249); `rowLooksLikeParticipantHeader_` (L7267); `getRawDataCurrentHeadersOrDefaults_` (L7277); `enforceDemoPStrictDashboardSchema_` (L7284); `buildRawDataSourceArchiveName_` (L7328); `mapRowsToHeaders_` (L7340); `applyUniversalFastCanvasFormatting_` (L7352); `applyGovernedTextAndNumberFormats_` (L7370); `applyOutputVisibilityPolicy_` (L7402); `createOutputSheetFromDashboardTemplate_` (L7414); `createRawDataOutputSheetFromTemplateFast_` (L7488); `ensureOutputSheetHasFormattedRows_` (L7569); `syncRawDataBannerColumns_` (L7602); `buildSourceMapByCompositeKeyForDemoPBanner_` (L7684); `formatCarePlanDueReport` (L7726); `formatUnlockedCarePlanReport` (L7735); `formatCarePlanDueOrUnlockedFromDashboard_` (L7744); `buildRawArchiveNameForSheetType_` (L7839); `collectAndClearMovedTitleInfoCells_` (L7866); `prepareCarePlanSourceSheetForDashboardFormat_` (L7893); `prepareRawDataSourceSheetForDashboardFormat_` (L7900); `buildRawDataHeadersForFormatting_` (L7914); `getRawDataApprovedAddedColumns_` (L7925); `processRawDataApprovedSyncColumns_` (L7931); `writeChangedColumnsOnly_` (L7955); `getRawDataDemoPSourceHeaders_` (L7998); `getRawDataDisallowedWorkingColumns_` (L8057); `isOngoingOutputSheetType_` (L8108); `buildDashboardOutputSheetName_` (L8116)

### SYNC FUNCTIONS

- **Section Name:** SYNC FUNCTIONS
- **Purpose:** Synchronizes monthly source worksheet data into Master List row objects using PMR and composite-key maps for Banner, Unlocked Care Plan, and Care Plan Due sources.
- **Start Line:** 8147
- **End Line:** 8561
- **Function Count:** 13
- **Public Function Count:** 0
- **Internal Function Count:** 13
- **Wrapper Count:** 0 (`None`)
- **Helper Count:** 13
- **Validation Function Count:** 0
- **Timing Function Count:** 0
- **Configuration Dependencies:** `BANNER_SYNC_FIELDS`, `HEADER_ROW`, `PMR`
- **Dashboard Dependencies:** None detected
- **Format Dashboard Dependencies:** None detected
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** None directly detected
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** HELPER FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`syncMasterListMonthlySourcesIntoData_` (L8151); `syncBannerSourceIntoData_` (L8157); `syncUnlockedCarePlanSourceIntoData_` (L8186); `syncCarePlanDueSourceIntoData_` (L8221); `syncRowsFromSourceMapData_` (L8255); `buildSourceMapBySingleKeyForPart5_` (L8295); `buildSourceMapByCompositeKeyForPart5_` (L8333); `shouldProcessRowByPMR_` (L8375); `normalizeSyncFieldPairs_` (L8400); `syncMasterListFromBanners_` (L8408); `syncMasterListFromUnlockedCarePlan_` (L8438); `syncMasterListFromCarePlanDue_` (L8474); `syncRowsFromSourceMap_` (L8508)

### DEMO P FUNCTIONS

- **Section Name:** DEMO P FUNCTIONS
- **Purpose:** Builds and updates Demo P monthly working sheets from raw data, including flattening contacts, PMR assignment, sorting, metadata headers, formatting, and monthly sync deltas.
- **Start Line:** 8562
- **End Line:** 9850
- **Function Count:** 41
- **Public Function Count:** 4
- **Internal Function Count:** 37
- **Wrapper Count:** 3 (`buildDemoPFromScratch`, `updateDemoPMonthlySync`, `formatDemoPStructure`)
- **Helper Count:** 36
- **Validation Function Count:** 2
- **Timing Function Count:** 0
- **Configuration Dependencies:** `BANNER_SYNC_FIELDS`, `CARE_PLAN_DUE_SYNC_FIELDS`, `DEMO`, `DEMO_P`, `DEMO_P_BANNER_SYNC_HEADERS`, `DEMO_P_FORMAT_HEADERS`, `DEMO_P_OPTIONAL_SYNC_HEADERS`, `DEMO_P_PREFIX`, `DEMO_P_RAW_HEADERS`, `DEMO_P_TEMPLATE_DATE_HEADERS`, `DEMO_P_TEMPLATE_SHEET`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `SHEET_TYPE`, `UNLOCKED_SYNC_FIELDS`
- **Dashboard Dependencies:** None detected
- **Format Dashboard Dependencies:** None detected
- **Template Dependencies:** `DEMO_P_TEMPLATE_DATE_HEADERS`, `DEMO_P_TEMPLATE_SHEET`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `MONTHLY_CHANGE_REPORT_PREFIX`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DISENROLLMENT FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** DISENROLLMENT FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`getDefaultDemoPMetadataHeaderRows_v155_` (L8671); `buildDemoPFromScratch` (L8689); `updateDemoPMonthlySync` (L8715); `enforceDemoPPostFlattenFormatting_` (L8785); `sortSheetAlphabeticallyByParticipantName_` (L8804); `getDemoPMonthlySyncChangedPMRs_` (L8826); `removeActiveDemoPPMRsFromDisenrolledExclusion_` (L8848); `processDemoPDataWithFillBlankMask_` (L8908); `buildDemoPFreshRowsForPMRs_` (L8944); `processDemoPFreshRowsInMemory_` (L8967); `flattenDemoPContactRowsInMemory_` (L8978); `flattenDemoPContactsToPrimaryRows_` (L9032); `buildDemoPContactSummaryForFlatRecord_` (L9093); `sortDemoPFlatRows_` (L9112); `processDemoP` (L9126); `processDemoPAsWorkingSource_` (L9206); `markPrimaryPMRRowsForSequentialData_` (L9254); `assignPrimaryPMRRowsInData_` (L9284); `formatDemoPStructure` (L9305); `buildRawDataSheetName_` (L9309); `getOrCreateDemoPProcessingSheet_` (L9313); `deleteSheetIfExistsForDemoPProcess_` (L9388); `getLastRawDataDisenrolledBuildResult_` (L9402); `setLastRawDataDisenrolledBuildResult_` (L9410); `updateExistingDemoPFromRawData_` (L9417); `createActiveDemoPFromRawData_` (L9471); `populateDemoPUpdateColumns_` (L9565); `populateUniversalMetadataColumns_` (L9583); `buildSourceHashByPMR_` (L9626); `buildSourceHashForRows_` (L9644); `buildSourceHashForRow_` (L9667); `buildColumnsUpdatedText_` (L9671); `normalizeHashValue_` (L9687); `computeStableHash_` (L9695); `verifyPrimaryPMRColumnFromRawData_` (L9703); `createOrRefreshDemoPTemplate_` (L9712); `getOrCreateDemoPTemplate_` (L9720); `initializeDemoPTemplateTitleRows_` (L9727); `applyDemoPTemplateFormatting_` (L9743); `applyDemoPTemplateToSheet_` (L9765); `applyDemoPDateFormattingByHeader_` (L9801)

### MONTHLY CHANGE FUNCTIONS

- **Section Name:** MONTHLY CHANGE FUNCTIONS
- **Purpose:** Builds monthly change reports by comparing current and prior raw Demo P data across enrollment, disenrollment, demographics, caseload, and contact change sections.
- **Start Line:** 9851
- **End Line:** 11159
- **Function Count:** 30
- **Public Function Count:** 3
- **Internal Function Count:** 27
- **Wrapper Count:** 3 (`buildMonthlyChangeReport`, `runMonthlyUpdate`, `updateMasterList`)
- **Helper Count:** 27
- **Validation Function Count:** 0
- **Timing Function Count:** 0
- **Configuration Dependencies:** `CHANGE`, `CHANGE_SECTION_CASELOAD`, `CHANGE_SECTION_CONTACT`, `CHANGE_SECTION_DEMOGRAPHIC`, `CHANGE_SECTION_DISENROLLMENTS`, `CHANGE_SECTION_ENROLLMENTS`, `HEADER_ROW`, `MONTHLY_CHANGE`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `RAW_DEMO_P_BANNER_FIELDS`, `RAW_DEMO_P_CASELOAD_FIELDS`, `RAW_DEMO_P_CONTACT_FIELDS`, `RAW_DEMO_P_DEMOGRAPHIC_FIELDS`, `RAW_DEMO_P_DISENROLLMENT_FIELDS`, `RAW_DEMO_P_ENROLLMENT_FIELDS`, `SHEET_TYPE`
- **Dashboard Dependencies:** None detected
- **Format Dashboard Dependencies:** None detected
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `MONTHLY_CHANGE_REPORT_PREFIX`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DISENROLLMENT FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** DISENROLLMENT FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`buildMonthlyChangeReport` (L9855); `buildMonthlyChangeReportForMonth_` (L9873); `getOrBuildMonthlyChangeReport_` (L9983); `compareRawDemoPForSectionReport_` (L10040); `rowsWithDOBOnlyForSection_` (L10233); `getChangedColumnsForSectionRows_` (L10239); `buildColumnSignaturesForSection_` (L10255); `compareRawDemoPForChanges_` (L10268); `getRawDemoPDataForCompare_` (L10431); `compareSingleFieldAndAdd_` (L10499); `addMCRRow_` (L10548); `buildContactCompareMap_` (L10591); `getFieldValueFromRow_` (L10610); `buildParticipantName_` (L10616); `displayValueForReport_` (L10633); `buildMonthlyChangeReportSectionLayout_` (L10641); `padRowToWidth_` (L10665); `stripMonthlyChangeNativeBandings_` (L10671); `getMonthlyChangeSectionSpecs_` (L10681); `buildMonthlyChangeSectionRows_` (L10728); `appendMonthlyChangeCompiledRow_` (L10775); `appendMonthlyChangeSectionBlock_` (L10783); `populateMonthlyChangeReportSections_` (L10813); `findMonthlyChangeSectionTitleRow_` (L10866); `findNextMonthlyChangeSectionTitleRow_` (L10882); `getChangedPMRsFromMonthlyChangeReport_` (L10903); `writeDiagnosticReport_` (L10997); `runMonthlyUpdate` (L11037); `updateMasterList` (L11064); `updateMasterListForMonth_` (L11070)

### MASTER LIST FUNCTIONS

- **Section Name:** MASTER LIST FUNCTIONS
- **Purpose:** Creates Master List outputs from Demo P and templates, formats title/header/data regions, manages archive index generation, sheet sorting, protected surface visibility, and source-template refresh.
- **Start Line:** 11160
- **End Line:** 12921
- **Function Count:** 73
- **Public Function Count:** 7
- **Internal Function Count:** 66
- **Wrapper Count:** 6 (`createMasterList`, `createIndexSheet`, `assignSortOrderAndHideExtraRows`, `showAllMasterListRows`, `hideSystemSheetsNow`, `showSystemSheetsNow`)
- **Helper Count:** 66
- **Validation Function Count:** 7
- **Timing Function Count:** 0
- **Configuration Dependencies:** `DEMO_P_PREFIX`, `DISENROLLED_EXCLUSION_SHEET`, `HEADER_ROW`, `INDEX_BUFFER_COLUMN`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `INDEX_TOTAL_COLUMNS`, `MASTER_LIST`, `MASTER_LIST_ADDED_HEADERS`, `MASTER_LIST_PREFIX`, `MASTER_LIST_TEMPLATE_SHEET`, `MONTHLY_CHANGE_REPORT_PREFIX`, `ON_CHANGE`, `PMR`, `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_DASHBOARD_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_SHEET_TYPES`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET_TYPE`, `SYSTEM_SHEETS_TO_HIDE`
- **Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_SHEET_TYPES`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`
- **Format Dashboard Dependencies:** `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_SHEET_TYPES`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`
- **Template Dependencies:** `MASTER_LIST_TEMPLATE_SHEET`, `RFF_BASE_TEMPLATE_NAME`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `BANNER_REPORT_ALT_PREFIX`, `INDEX_BUFFER_COLUMN`, `INDEX_DATA_START_ROW`, `INDEX_FIXED_ROW_COUNT`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `INDEX_TOTAL_COLUMNS`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_TIMING_SHEET`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, DISENROLLMENT FUNCTIONS, HELPER FUNCTIONS, MENU FUNCTIONS, MONTHLY CHANGE FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** DEMO P FUNCTIONS, DISENROLLMENT FUNCTIONS, FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MONTHLY CHANGE FUNCTIONS, SYNC FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`createMasterList` (L11164); `copyPrimaryDemoPRowsToMasterListByHeader_` (L11237); `getMasterListTemplateHeaders_` (L11304); `createOrRefreshMasterListTemplate_` (L11311); `getOrCreateMasterListTemplate_` (L11319); `createMasterListSheetFromTemplate_` (L11326); `writeMasterListTitleDateBlock_` (L11383); `initializeMasterListTitleRows_` (L11390); `copyDemoPHeaderRowsToMasterList_` (L11399); `copyQualifyingDemoPRowsToMasterList_` (L11417); `formatMasterListSheet_` (L11443); `getMonthPartsFromTitleRows_` (L11451); `updateCopiedMasterListHeader_` (L11463); `createIndexSheet` (L11471); `generateArchiveFileIndex_` (L11635); `setupIndexRefreshOnSheetAddedTrigger_` (L11639); `handleSpreadsheetChangeForIndex` (L11656); `enforceGlobalSheetSortOrder_` (L11677); `extractFirstDateFromSheetName_` (L11766); `parseIndexMonthDate_` (L11785); `organizeWorkbookTabs_` (L11809); `hideSystemAndTestingSheets_` (L11856); `getSystemAndTestingSheetNames_` (L11874); `isSystemOrTestingSheet_` (L11890); `assignSortOrderAndHideExtraRows` (L11909); `applySortOrderDisplayForMasterList_` (L11916); `buildParticipantBlocksForSortOrder_` (L11922); `showAllMasterListRows` (L11949); `groupMasterListRowsByPMR_` (L11957); `hideRowsWithBlankDOB_` (L11962); `sortMasterListByParticipantNameAndPMR_` (L11966); `getPrimaryRowScore_` (L12026); `hideNonPrimaryPMRRows_` (L12045); `hideRowNumberBatches_` (L12070); `clearAllRowGroupsIfPossible_` (L12088); `prepareMasterListSortOrderBeforeFormatting_` (L12100); `applyFinalMasterListColorAndDisplay_` (L12107); `applyMasterListDisplaySettings_` (L12113); `processMasterListFull_` (L12117); `processMasterListDataOnly_` (L12125); `processMasterListSingleDataPass_` (L12129); `populateParticipantNameData_` (L12164); `populateDemoPNameData_` (L12183); `updateBannerColumnData_` (L12200); `combineAddressesData_` (L12225); `handleLanguageData_` (L12239); `splitPhoneNumbersData_` (L12261); `runMasterContactProcessData_` (L12288); `combineNotesSummaryData_` (L12293); `rebuildChangedPMRsFromDemoP_` (L12320); `copyPreviousMasterListToCurrentMonth_` (L12330); `rebuildChangedPMRsOnExistingMaster_` (L12356); `updateMasterListFromMonthlyChangeActions_` (L12383); `getPMRsForMonthlyChangeSections_` (L12413); `deletePMRBlocksFromMasterListBySet_` (L12424); `updatePrimaryRowsFromDemoPForPMRs_` (L12439); `mergeSecondaryRowsFromDemoPForPMRs_` (L12487); `buildMappedMasterRowFromDemoRow_` (L12559); `mutateMasterRowColumnsFromDemoRow_` (L12569); `hideSystemSheetsNow` (L12579); `showSystemSheetsNow` (L12587); `getPrimaryMergeRowItem_` (L12620); `getPrimaryRowChangedColumnDetails_` (L12639); `formatMergeAuditValueForDisplay_` (L12709); `getMergeAuditParticipantName_` (L12719); `getMergeAuditParticipantNameFromRows_` (L12725); `buildMergeAuditContactSummary_` (L12746); `getMergeAuditChangedFields_` (L12770); `buildMergeRowsByPMRFromData_` (L12803); `buildSecondaryMergeKeyMapForRows_` (L12827); `buildMergeKeyMapForRows_` (L12857); `buildContactMergeRowKey_` (L12887); `getMergeRowValue_` (L12911)

### DISENROLLMENT FUNCTIONS

- **Section Name:** DISENROLLMENT FUNCTIONS
- **Purpose:** Creates disenrolled-list outputs and exclusion data by detecting disenrolled PMRs, moving/removing blocks, and applying dashboard-template formatting.
- **Start Line:** 12922
- **End Line:** 13584
- **Function Count:** 22
- **Public Function Count:** 1
- **Internal Function Count:** 21
- **Wrapper Count:** 1 (`createDisenrolledList`)
- **Helper Count:** 21
- **Validation Function Count:** 1
- **Timing Function Count:** 0
- **Configuration Dependencies:** `CHANGE_SECTION_CASELOAD`, `CHANGE_SECTION_CONTACT`, `CHANGE_SECTION_DEMOGRAPHIC`, `CHANGE_SECTION_DISENROLLMENTS`, `CHANGE_SECTION_ENROLLMENTS`, `DEMO_P`, `DEMO_P_PREFIX`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `MCR_OUTPUT_HEADERS`, `PMR`, `RAW_DEMO_P_BANNER_FIELDS`, `RAW_DEMO_P_CASELOAD_FIELDS`, `RAW_DEMO_P_CONTACT_FIELDS`, `RAW_DEMO_P_DEMOGRAPHIC_FIELDS`, `RAW_DEMO_P_DISENROLLMENT_FIELDS`, `RAW_DEMO_P_ENROLLMENT_FIELDS`, `SHEET_TYPE`
- **Dashboard Dependencies:** None detected
- **Format Dashboard Dependencies:** None detected
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** None directly detected
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DEMO P FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, MASTER LIST FUNCTIONS, MONTHLY CHANGE FUNCTIONS
- **Calls To:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, MONTHLY CHANGE FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`createDisenrolledList` (L12926); `processBlankContactSummariesOnDemoP_` (L12956); `splitRawDataRowsIntoActiveAndDisenrolled_` (L12977); `buildDisenrolledPMRSetFromDemoPValues_` (L13029); `loadDisenrolledPMRSetForMonth_` (L13047); `appendDisenrolledRowsFromRawDataToExclusion_` (L13065); `moveDisenrolledPMRsFromDemoPToExclusion_` (L13070); `appendDisenrolledDeltasToExclusionSheet_` (L13181); `appendDisenrolledPMRBlocksToExclusion_` (L13249); `createDisenrolledExclusionSheetFromDashboardTemplate_` (L13261); `loadDisenrolledExclusionPMRsForPart3_` (L13303); `removeDisenrolledPMRBlocksFromMasterUsingDemoP_` (L13323); `applyDisenrolledExclusionCreateFormattingOnly_` (L13363); `getCurrentRawDataSheet_` (L13476); `getPreviousRawDataSheet_` (L13481); `getCurrentDemoPSheet_` (L13486); `getPreviousDemoPSheet_` (L13494); `getMonthlyChangeReportHeaders_` (L13500); `getMonthlyChangeReportDateIndexes_` (L13512); `convertMonthlyChangeReportDateValues_` (L13518); `buildMonthlyChangeReportRow_` (L13548); `formatMonthlyChangeReportSectionSheet_` (L13569)

### DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS

- **Section Name:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS
- **Purpose:** Produces dashboard quality, startup, validation, health, performance, workflow, signoff, and framework dashboard reports based on dashboard/template/runtime checks.
- **Start Line:** 13585
- **End Line:** 15555
- **Function Count:** 105
- **Public Function Count:** 11
- **Internal Function Count:** 94
- **Wrapper Count:** 3 (`runAllFrameworkTestsAndBuildDashboard`, `repairAllTemplateDateFormats`, `buildCombinedFrameworkTestDashboard`)
- **Helper Count:** 77
- **Validation Function Count:** 88
- **Timing Function Count:** 8
- **Configuration Dependencies:** `COLUMN`, `HEADERS`, `MASTER_LIST_MERGE_ML_VERSION`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_DASHBOARD_SHEET`, `RFF_DASHBOARD_VERIFY_COLUMNS_KEY`, `RFF_DASHBOARD_VERIFY_HEADERS_KEY`, `RFF_DASHBOARD_VERIFY_SHEETS_KEY`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_SYSTEM_SHEET_VERIFICATION_KEY`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET`
- **Dashboard Dependencies:** `DASHBOARD`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_CP_SYNC_DIAGNOSTICS_KEY`, `RFF_DASHBOARD_QUALITY_COL_WIDTHS`, `RFF_DASHBOARD_QUALITY_DEFER_WRITES_`, `RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS`, `RFF_DASHBOARD_QUALITY_SECTIONS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_DASHBOARD_SHEET`, `RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY`, `RFF_DASHBOARD_VERIFY_COLUMNS_KEY`, `RFF_DASHBOARD_VERIFY_GLOBAL_KEY`, `RFF_DASHBOARD_VERIFY_HEADERS_KEY`, `RFF_DASHBOARD_VERIFY_SHEETS_KEY`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_PERFORMANCE_SUMMARY_KEY`, `RFF_QA_SECTION_PROP_PREFIX`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_SYSTEM_SHEET_VERIFICATION_KEY`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `RFF_WORKFLOW_SYNC_VERIFICATION_KEY`
- **Format Dashboard Dependencies:** `DASHBOARD`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_CP_SYNC_DIAGNOSTICS_KEY`, `RFF_DASHBOARD_QUALITY_COL_WIDTHS`, `RFF_DASHBOARD_QUALITY_DEFER_WRITES_`, `RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS`, `RFF_DASHBOARD_QUALITY_SECTIONS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_DASHBOARD_SHEET`, `RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY`, `RFF_DASHBOARD_VERIFY_COLUMNS_KEY`, `RFF_DASHBOARD_VERIFY_GLOBAL_KEY`, `RFF_DASHBOARD_VERIFY_HEADERS_KEY`, `RFF_DASHBOARD_VERIFY_SHEETS_KEY`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_PERFORMANCE_SUMMARY_KEY`, `RFF_QA_SECTION_PROP_PREFIX`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_SYSTEM_SHEET_VERIFICATION_KEY`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `RFF_WORKFLOW_SYNC_VERIFICATION_KEY`
- **Template Dependencies:** `TEMPLATE`
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `QUALITY`, `RFF_DASHBOARD_QUALITY_COL_WIDTHS`, `RFF_DASHBOARD_QUALITY_DEFER_WRITES_`, `RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS`, `RFF_DASHBOARD_QUALITY_SECTIONS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_TIMING_SHEET`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DISENROLLMENT FUNCTIONS, HELPER FUNCTIONS, MENU FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** FRAMEWORK AND TIMING FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`runDashboardQualityStartUp` (L13589); `runDashboardQualityDashboardVerificationSections_` (L13596); `getDashboardVerificationPassRow_` (L13650); `appendDashboardVerificationPassIfNoIssues_` (L13660); `getDashboardSectionHeaderWidth_` (L13665); `collectBlankDashboardCells_` (L13671); `collectFormatDashboardGlobalInputVerificationRows_` (L13681); `collectFormatDashboardTitleRowsVerificationRows_` (L13713); `collectFormatDashboardSheetDefinitionVerificationRows_` (L13750); `collectFormatDashboardSheetHeaderVerificationRows_` (L13779); `collectFormatDashboardColumnDefinitionVerificationRows_` (L13816); `collectFormatDashboardSheetBehaviorVerificationRows_` (L13846); `getDashboardQualitySectionLastRunMillis_` (L13875); `dashboardQualitySectionRanWithinLastHour_` (L13885); `runDashboardQualitySectionIfDue_` (L13890); `runDashboardQualityQuick` (L13898); `runDashboardQualityValidateTemplates` (L13902); `runDashboardQualityTemplateAndFormatSections_` (L13910); `getDashboardQualitySectionRegistry_` (L13942); `collectDashboardQualityPerformanceSummaryRows_` (L13954); `runDashboardQualityPerformanceSummary_` (L14004); `runDashboardQualityCarePlanSyncDiagnostics_` (L14011); `runDashboardQualityFull` (L14032); `runAllFrameworkTestsAndBuildDashboard` (L14085); `repairAllTemplateDateFormats` (L14094); `normalizeSectionRowForWidth_` (L14167); `rowHasAnyValue_` (L14173); `trimTrailingBlankRows_` (L14179); `getDefaultDashboardQualityDetailHeader_` (L14185); `collectExistingDashboardQualitySectionBlocks_` (L14207); `getDashboardQualityNotRunMessage_` (L14225); `buildDefaultDashboardQualitySectionBlock_` (L14233); `normalizeDashboardQualitySectionBlock_` (L14249); `rebuildDashboardQualityReportShellCompact_` (L14289); `getDashboardQualitySectionTitleForKey_` (L14332); `getDashboardQualitySectionKeyForTitle_` (L14340); `hasDashboardQualityTemplateShell_` (L14348); `initializeDashboardQualitySheet_` (L14365); `initializeSystemSheets_` (L14384); `deleteLegacyOperationalAndDiagnosticSheets_` (L14402); `ensureDashboardQualityReportSheet_` (L14406); `ensureDashboardQualityTemplateShell_` (L14410); `ensureDashboardQualitySectionShells_` (L14419); `getDashboardQualityFixedSectionStartRow_` (L14424); `applyDashboardQualityReportColumnSettings_` (L14430); `styleDashboardQualityReport_` (L14478); `normalizeDashboardQualityHeaderLabels_` (L14489); `isDashboardQualityNotesLabel_` (L14493); `normalizeDashboardQualityOutputRow_` (L14498); `getDashboardQualitySectionLetter_` (L14529); `normalizeDashboardQualityIssueValue_` (L14534); `normalizeDashboardQualityRowsForSection_` (L14540); `normalizeDashboardQualityDataRows_` (L14573); `buildTimestampedDashboardQualitySectionRows_` (L14581); `getStatusFromDashboardQualityRows_` (L14604); `getMostRecentTimingDurationForSectionKey_` (L14623); `getTimingProcessNameForDashboardQualitySection_` (L14645); `dashboardQualityRowsEqualValues_` (L14665); `saveDashboardQualitySectionRows_` (L14673); `getDashboardQualitySectionRows_` (L14703); `deleteLegacyQualityReportSheet_` (L14715); `deleteLegacyStandaloneQualityReports_` (L14726); `saveDashboardQualityRowsForTemplateValidation_` (L14733); `saveDashboardQualityRowsForHealthCheck_` (L14741); `getStoredDashboardQualityOverallStatus_` (L14754); `getStoredDashboardQualityFailureNotes_` (L14763); `buildDatedDisenrolledOutputName_` (L14775); `forceSheetRowCount_` (L14781); `buildCombinedFrameworkTestDashboard` (L14792); `updateDashboardQualitySummaryTimingAndSignoffSections_` (L14826); `updateDashboardQualitySignoffSection_` (L14832); `updateDashboardQualitySummarySection_` (L14844); `updateDashboardQualityTimingSummarySection_` (L14855); `getDashboardQualitySectionBoundsMap_` (L14859); `replaceDashboardQualitySectionsRows_` (L14888); `tryDashboardQualityAnchoredColumnWrite_` (L14949); `replaceDashboardQualitySectionRows_` (L14966); `findDashboardQualitySectionRow_` (L15040); `findNextDashboardQualitySectionRow_` (L15055); `dashboardQualitySectionContentMatches_` (L15066); `mergeDashboardQualityStyleRanges_` (L15086); `styleDashboardQualityUpdatedSections_` (L15104); `appendCombinedDashboardSignOffRows_` (L15194); `buildFrameworkSummaryRows_` (L15214); `getStoredSectionStatusAndNotes_` (L15245); `getReportOverallStatus_` (L15265); `getReportFailureNotes_` (L15281); `runFrameworkHealthCheck` (L15301); `getFrameworkHealthCheckIssueRows_` (L15328); `formatFrameworkHealthCheckIssuesForTiming_` (L15334); `appendRequiredFunctionChecks_` (L15346); `existsFunctionByName_` (L15353); `writeFrameworkHealthCheckReport_` (L15361); `normalizeFrameworkHealthCheckRows_` (L15366); `getRequiredHelperFunctionNames_` (L15378); `getRequiredMenuFunctionNames_` (L15394); `getRequiredDashboardFunctionNames_` (L15436); `getRequiredTemplateFunctionNames_` (L15446); `getRequiredValidationFunctionNames_` (L15455); `getRequiredTimingFunctionNames_` (L15463); `getRequiredFrameworkDashboardFunctionNames_` (L15472); `runWorkflowSyncVerification` (L15485); `runDashboardQualityWorkflowSyncVerification_` (L15489); `setupSystemSheets` (L15497); `verifyFrameworkConfiguration` (L15504)

### FRAMEWORK AND TIMING FUNCTIONS

- **Section Name:** FRAMEWORK AND TIMING FUNCTIONS
- **Purpose:** Wraps workflows in optional timing capture, records step durations, writes framework timing reports, and exposes rebuild compatibility entry points.
- **Start Line:** 15556
- **End Line:** 15732
- **Function Count:** 8
- **Public Function Count:** 1
- **Internal Function Count:** 7
- **Wrapper Count:** 1 (`rebuildProductionMonthlyChangeTemplate`)
- **Helper Count:** 1
- **Validation Function Count:** 0
- **Timing Function Count:** 7
- **Configuration Dependencies:** `MONTHLY_CHANGE`, `SHEET_TYPE`
- **Dashboard Dependencies:** `RFF_TIMING_MAX_ROWS`
- **Format Dashboard Dependencies:** `RFF_TIMING_MAX_ROWS`
- **Template Dependencies:** None detected
- **Worksheet Ownership:** Derived from constants and function names in this section; owns/uses worksheet surfaces named by its sheet/template/report constants and by dashboard sheet definitions loaded at runtime.
- **Reports Produced:** `RFF_TIMING_MAX_ROWS`, `TIMING`
- **Data Produced:** Runtime objects, sheet rows, template surfaces, reports, or configuration records created by the functions listed below.
- **Data Consumed:** Active spreadsheet, dashboard/default constants, source worksheets, template worksheets, and outputs from upstream called sections as listed below.
- **Called By:** DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS, DEMO P FUNCTIONS, DISENROLLMENT FUNCTIONS, HELPER FUNCTIONS, MASTER LIST FUNCTIONS, MENU FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Calls To:** DISENROLLMENT FUNCTIONS, HELPER FUNCTIONS, MENU FUNCTIONS, TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
- **Protected Rules:** Preserve section boundaries, public entry-point names, underscore-internal convention, dashboard-driven configuration, batch SpreadsheetApp operations, template/header compatibility, and versioned production behavior.
- **AI Development Guidance:** Treat this section as production-protected. Do not rename public functions or dashboard constants, do not remove apparent-unused functions without trigger/menu/string-reference analysis, update dependent templates/reports/tests together, and preserve backward compatibility.

#### Functions

`runFrameworkTimed_` (L15560); `startFrameworkTiming_` (L15580); `markFrameworkStep_` (L15591); `writeFrameworkTimingReport_` (L15616); `writeFrameworkTimingReportBestEffort_` (L15620); `writeTimingReport_` (L15632); `trimTimingReportRows_` (L15636); `rebuildProductionMonthlyChangeTemplate` (L15653)

## Production Processing Flow

1. Spreadsheet open invokes `onOpen`, which builds Master List Framework menus and exposes public workflows.
2. Setup/default workflows build or refresh the Format Dashboard defaults, report templates, system surfaces, and visibility states.
3. Runtime workflows prompt for the locked-year report month, load dashboard config, resolve templates/headers/columns/behaviors, and read current/prior source sheets.
4. Demo P processing transforms raw source rows into flattened participant rows and month-specific working data.
5. Sync processing enriches row objects from Banner, Unlocked Care Plan, and Care Plan Due sources.
6. Master List, Monthly Change, and Disenrollment workflows create report sheets from templates, write title/header/data sections, format surfaces, and sort/protect system sheets.
7. Dashboard Quality workflows validate dashboard sections, templates, output structures, timing, health, sync, and workflow signoff.
8. Framework Timing optionally wraps workflows, records step marks, and writes timing reports.

## Section Dependency Matrix

| Section | Calls Sections | Called By Sections |
|---|---|---|

| CONFIGURATION | None | External/top-level |

| HELPER FUNCTIONS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| MENU FUNCTIONS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | FRAMEWORK AND TIMING FUNCTIONS |

| FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS |

| SYNC FUNCTIONS | HELPER FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| DEMO P FUNCTIONS | DISENROLLMENT FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DISENROLLMENT FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| MONTHLY CHANGE FUNCTIONS | DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DISENROLLMENT FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| MASTER LIST FUNCTIONS | DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| DISENROLLMENT FUNCTIONS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MONTHLY CHANGE FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DEMO P FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; MASTER LIST FUNCTIONS; MONTHLY CHANGE FUNCTIONS |

| DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

| FRAMEWORK AND TIMING FUNCTIONS | DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS |

## Ownership Matrix

| Owner Section | Primary Owned Surfaces / Responsibilities |
|---|---|

| CONFIGURATION | Defines immutable version metadata, worksheet names, header taxonomies, mapping tables, report/template names, formatting constants, change-section constants, and dashboard default datasets used by all production workflows. |

| HELPER FUNCTIONS | Provides shared construction, normalization, parsing, lookup, formatting, sheet I/O, dashboard writing, metadata, date, color, sorting, and utility services used across every workflow. |

| MENU FUNCTIONS | Builds the spreadsheet UI menu surface and exposes user-facing menu actions for timing, template/system visibility, formatting, and layout capture. |

| FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS | Owns Format Dashboard section names and default rows for global settings, sheet definitions, column definitions, behaviors, headers, and system sheet surfaces. |

| TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | Creates, refreshes, loads, validates, and formats dashboard-driven report templates; parses dashboard configuration into runtime objects; applies template and section formatting. |

| SYNC FUNCTIONS | Synchronizes monthly source worksheet data into Master List row objects using PMR and composite-key maps for Banner, Unlocked Care Plan, and Care Plan Due sources. |

| DEMO P FUNCTIONS | Builds and updates Demo P monthly working sheets from raw data, including flattening contacts, PMR assignment, sorting, metadata headers, formatting, and monthly sync deltas. |

| MONTHLY CHANGE FUNCTIONS | Builds monthly change reports by comparing current and prior raw Demo P data across enrollment, disenrollment, demographics, caseload, and contact change sections. |

| MASTER LIST FUNCTIONS | Creates Master List outputs from Demo P and templates, formats title/header/data regions, manages archive index generation, sheet sorting, protected surface visibility, and source-template refresh. |

| DISENROLLMENT FUNCTIONS | Creates disenrolled-list outputs and exclusion data by detecting disenrolled PMRs, moving/removing blocks, and applying dashboard-template formatting. |

| DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | Produces dashboard quality, startup, validation, health, performance, workflow, signoff, and framework dashboard reports based on dashboard/template/runtime checks. |

| FRAMEWORK AND TIMING FUNCTIONS | Wraps workflows in optional timing capture, records step durations, writes framework timing reports, and exposes rebuild compatibility entry points. |

## Public API Matrix

| Public Function | Section | Line | API Role |
|---|---|---:|---|

| `setupReportFormattingDashboard` | HELPER FUNCTIONS | 571 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `rebuildFormatDashboardDefaults` | HELPER FUNCTIONS | 693 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `quickSystemSetup` | HELPER FUNCTIONS | 812 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `quickBuildAllTemplates` | HELPER FUNCTIONS | 826 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `refreshFrameworkTimingReport` | HELPER FUNCTIONS | 2666 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `writeFrameworkTimingPerformanceRecommendations` | HELPER FUNCTIONS | 2670 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `onOpen` | MENU FUNCTIONS | 2726 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `toggleFrameworkTiming` | MENU FUNCTIONS | 2812 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatDashboard` | MENU FUNCTIONS | 2836 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `saveActiveLayoutToDashboardSettings` | MENU FUNCTIONS | 2840 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `clearDiagnosticsAndTimingLogs` | MENU FUNCTIONS | 3150 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `createOrRefreshAllReportTemplates` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3781 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `hideReportTemplates` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3871 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `showReportTemplates` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3878 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `validateReportTemplates` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3918 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatMonthlySheets` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 5521 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatBannerReport` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 5653 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `validateActiveBannerFormatterOutput` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 5721 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `archiveActiveRawDataSheet` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 5743 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runFrameworkSmokeValidation` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6402 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `hideMonthlyImportSheets` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6767 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `hideMonthlyActiveSheets` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6779 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `archiveMonthlyImportSheets` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6815 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `archiveMonthlyActiveSheets` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6832 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatMonthlyChangeSubheaderRow` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6963 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatMonthlyChangeSubsectionBlock` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6967 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `getMonthlyChangeSubsectionLabels` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6979 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatRawData` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 7162 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatCarePlanDueReport` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 7726 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatUnlockedCarePlanReport` | TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 7735 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `buildDemoPFromScratch` | DEMO P FUNCTIONS | 8689 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `updateDemoPMonthlySync` | DEMO P FUNCTIONS | 8715 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `processDemoP` | DEMO P FUNCTIONS | 9126 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `formatDemoPStructure` | DEMO P FUNCTIONS | 9305 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `buildMonthlyChangeReport` | MONTHLY CHANGE FUNCTIONS | 9855 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runMonthlyUpdate` | MONTHLY CHANGE FUNCTIONS | 11037 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `updateMasterList` | MONTHLY CHANGE FUNCTIONS | 11064 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `createMasterList` | MASTER LIST FUNCTIONS | 11164 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `createIndexSheet` | MASTER LIST FUNCTIONS | 11471 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `handleSpreadsheetChangeForIndex` | MASTER LIST FUNCTIONS | 11656 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `assignSortOrderAndHideExtraRows` | MASTER LIST FUNCTIONS | 11909 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `showAllMasterListRows` | MASTER LIST FUNCTIONS | 11949 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `hideSystemSheetsNow` | MASTER LIST FUNCTIONS | 12579 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `showSystemSheetsNow` | MASTER LIST FUNCTIONS | 12587 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `createDisenrolledList` | DISENROLLMENT FUNCTIONS | 12926 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runDashboardQualityStartUp` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 13589 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runDashboardQualityQuick` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 13898 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runDashboardQualityValidateTemplates` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 13902 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runDashboardQualityFull` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 14032 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runAllFrameworkTestsAndBuildDashboard` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 14085 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `repairAllTemplateDateFormats` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 14094 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `buildCombinedFrameworkTestDashboard` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 14792 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runFrameworkHealthCheck` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 15301 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `runWorkflowSyncVerification` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 15485 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `setupSystemSheets` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 15497 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `verifyFrameworkConfiguration` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 15504 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

| `rebuildProductionMonthlyChangeTemplate` | FRAMEWORK AND TIMING FUNCTIONS | 15653 | Public Apps Script/menu/trigger-compatible entry point; preserve name and signature. |

## Runtime Workflow

| Workflow Layer | Responsible Sections | Runtime Contract |
|---|---|---|

| Menu and entry points | MENU FUNCTIONS; public functions in workflow sections | Expose stable callable functions to Apps Script UI, triggers, and external execution. |

| Configuration loading | CONFIGURATION; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | Resolve constants, dashboard sections, defaults, sheet definitions, headers, columns, behaviors, and template metadata. |

| Source transformation | DEMO P FUNCTIONS; SYNC FUNCTIONS | Read monthly source sheets, flatten participant/contact rows, assign PMRs, filter rows, and enrich data from source maps. |

| Report production | MASTER LIST FUNCTIONS; MONTHLY CHANGE FUNCTIONS; DISENROLLMENT FUNCTIONS | Create report sheets from templates, write titles/headers/data, apply formatting, produce final operational outputs. |

| Quality and governance | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | Verify dashboard/template/report health, populate quality sections, summary, signoff, workflow and sync diagnostics. |

| Timing instrumentation | FRAMEWORK AND TIMING FUNCTIONS | Optionally collect timing steps and write Framework Timing Report records. |
