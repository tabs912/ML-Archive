<!-- markdownlint-disable MD013 MD024 MD060 -->

# Master List Framework v1.6.29 Engineering & Governance Reference

Authoritative implementation: `Master_List/Current Production Script/v.1.6.29_Current_Production_Script`.

Authoritative formatting and worksheet governance source: `Format Dashboard`, including worksheet definitions, report templates, header mappings, sheet behaviors, presentation standards, and template governance.

## Section 2 — Framework Manifest

### Complete Executive Summary

The Master List Framework v1.6.29 is a Google Apps Script production framework centered on dashboard-governed report generation. The Current Approved Production Script is the executable authority for runtime behavior, public APIs, wrapper contracts, cache invalidation, timing, validation, synchronization, and report construction. The Format Dashboard is the configuration authority for formatting, worksheet definitions, templates, header order, sheet behavior, presentation defaults, template sizing, system surfaces, and output visibility. Production workflows load dashboard configuration, build or refresh governed templates, transform monthly source data, synchronize Banner/Care Plan inputs, produce Demo P, Master List, Monthly Change, Disenrollment, Index, Dashboard Quality, Health, and Timing outputs, and preserve performance through targeted in-memory and persistent caches. Protected production sections must remain structurally stable unless a versioned migration updates all consumers, menu callbacks, triggers, dashboard rows, template signatures, validators, reports, and compatibility wrappers together.

### Protected Production Section Manifest

| Protected Production Section | Purpose | Function Count | Helper Count | Wrapper Count | Validation Count | Timing Count | Worksheet Count | Template Count | Dashboard Dependencies | Format Dashboard Dependencies | Configuration Dependencies | Cache Dependencies | Reports Produced | Primary Consumers | Public API Count | Internal Function Count |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---:|---:|
| CONFIGURATION | Defines immutable version, worksheet, template, header, report, cache, and framework constants that govern all runtime behavior. | 0 | 0 | 0 | 0 | 0 | 41 | 3 | `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE`, `RFF_BASE_TEMPLATE_NAME`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FORMATTER_DATE_PROMPT`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SMART_TEMPLATE_REFRESH`, `RFF_TEMPLATE_SIGNATURE_MAX_CHARS`, `RFF_TIMING_MAX_ROWS`, `RFF_VERSION` | `RFF_DEFAULTS` and Format Dashboard constants declared downstream | `MASTER_LIST_MERGE_ML_VERSION`, `MASTER_LIST_MERGE_REBUILD_SECTION`, `MASTER_LIST_MERGE_BASELINE_VERSION`, `MASTER_LIST`, `MASTER_LIST_PREFIX`, `DEMO_P`, `DEMO_P_PREFIX`, `MONTHLY_CHANGE`, `HEADER_ROW`, `DATA_START_ROW`, `SHEET_TAB_ORDER`, `SYSTEM_SHEETS_TO_HIDE` | `ML_MONTHLY_SHEET_LOOKUP_CACHE_`, `ML_HEADER_CACHE_`, `ML_HEADER_MAP_CACHE_`, `ML_SHEET_DIMENSION_CACHE_` | `BANNER_REPORT_ALT_PREFIX`, `MONTHLY_CHANGE_REPORT_PREFIX`, `INDEX_SHEET`, `RFF_TIMING_MAX_ROWS` | All protected production sections | 0 | 0 |
| HELPER FUNCTIONS | Provides shared utility, date, header, cache, sheet, dashboard, timing, and formatting support for all workflows. | 147 | 141 | 64 | 21 | 45 | 37 | 0 | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_EXCEL_EPOCH_DAY`, `RFF_EXCEL_EPOCH_MONTH`, `RFF_EXCEL_EPOCH_YEAR`, `RFF_MIN_SERIAL_DATE`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SHEET`; ... | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES` | `DATE_SHEET_FORMAT`, `DEMO_P`, `HEADER_ROW`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `ML_HEADER_CACHE_`, `ML_HEADER_MAP_CACHE_`, `ML_MONTHLY_SHEET_LOOKUP_CACHE_`, `ML_SHEET_DIMENSION_CACHE_`, `MONTHLY_CHANGE`, `NO_CHANGE`, `PMR`, `RFF_DASHBOARD_SHEET`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`; ... | `ML_MONTHLY_SHEET_LOOKUP_CACHE_`, `ML_HEADER_CACHE_`, `ML_HEADER_MAP_CACHE_`, `ML_SHEET_DIMENSION_CACHE_` | `RFF_TIMING_MAX_ROWS`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_LOOKBACK_ROWS`, `TIMING` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 6 | 141 |
| MENU FUNCTIONS | Defines menu callbacks, user-facing command wrappers, system/template visibility actions, and layout capture entry points. | 22 | 17 | 12 | 4 | 6 | 42 | 0 | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_ENABLED`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_SHEETS`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET` | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_SHEETS` | `HEADER_ROW`, `MONTHLY_CHANGE`, `RFF_DASHBOARD_SHEET`, `RFF_SECTION_SHEETS`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET_BASE_COLORS`, `SHEET_TYPE` | `RFF_FRAMEWORK_TIMING_ENABLED` | `RFF_FRAMEWORK_TIMING_ENABLED`, `RFF_TIMING_SHEET` | FRAMEWORK AND TIMING FUNCTIONS | 5 | 17 |
| FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS | Defines Format Dashboard schema names, global defaults, sheet types, default sheet definitions, behaviors, headers, and system surfaces. | 12 | 12 | 2 | 1 | 1 | 43 | 8 | `DASHBOARD`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_TITLE_COLOR`; ... | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_SYSTEM_SURFACES`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES` | `DEMO_P`, `HEADERS`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `MONTHLY_CHANGE`, `PMR`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SHEET_TYPES`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET` | `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_LAST_TEMPLATE_REFRESH_MODE_` | `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_TIMING_SHEET`, `RFF_TIMING_SUMMARY_SHEET` | HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 0 | 12 |
| TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | Loads Format Dashboard configuration, creates/refreshed templates, formats reports, validates template/report structures, and governs template formatting. | 199 | 180 | 84 | 72 | 36 | 90 | 3 | `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_DASHBOARD_CONFIG_MAX_READ_COLS`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE`, `RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA`, `RFF_FAST_TEMPLATE_REFRESH`, `RFF_FORCE_FULL_TEMPLATE_REBUILD`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_MONTHLY_CHANGE_SUBSECTIONS`, `RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`; ... | `RFF_DASHBOARD_SHEET`, `RFF_DEFAULTS`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS`, `RFF_SHEET_TYPES` | `DEMO_P`, `DEMO_P_PREFIX`, `DEMO_P_TEMPLATE_DATE_HEADERS`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `INDEX_HEADERS`, `INDEX_SHEET`, `MASTER_LIST`, `MASTER_LIST_MERGE_ML_VERSION`, `MASTER_LIST_PREFIX`, `MONTHLY_CHANGE`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `PMR1`, `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_DASHBOARD_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`; ... | `RFF_DASHBOARD_CONFIG_CACHE_`, `RFF_DASHBOARD_CONFIG_CACHE_KEY_`, `RFF_LAST_TEMPLATE_REFRESH_MODE_`, `RFF_TEMPLATE_SIGNATURE`, `Format Signature` | `BANNER_REPORT_ALT_PREFIX`, `INDEX_HEADERS`, `INDEX_SHEET`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_DASHBOARD_QUALITY_SHEET`, `RFF_FRAMEWORK_TIMING_SHEET`, `RFF_TIMING_SHEET` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; SYNC FUNCTIONS | 19 | 180 |
| SYNC FUNCTIONS | Synchronizes monthly source data into Master List row data using PMR/composite maps and source-specific field pair mappings. | 13 | 13 | 2 | 0 | 0 | 0 | 0 | None detected | None detected | `HEADER_ROW`, `PMR` | None detected | None detected | MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 0 | 13 |
| DEMO P FUNCTIONS | Builds, updates, flattens, formats, and synchronizes Demo P working sheets from raw data and monthly source inputs. | 41 | 37 | 15 | 9 | 8 | 10 | 0 | None detected | None detected | `DEMO`, `DEMO_P`, `DEMO_P_BANNER_SYNC_HEADERS`, `DEMO_P_FORMAT_HEADERS`, `DEMO_P_OPTIONAL_SYNC_HEADERS`, `DEMO_P_PREFIX`, `DEMO_P_RAW_HEADERS`, `DEMO_P_TEMPLATE_DATE_HEADERS`, `DEMO_P_TEMPLATE_SHEET`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `SHEET_TYPE` | None detected | `MONTHLY_CHANGE_REPORT_PREFIX` | DISENROLLMENT FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 4 | 37 |
| MONTHLY CHANGE FUNCTIONS | Builds monthly change reports from current/prior raw Demo P comparisons and change-section layouts. | 30 | 27 | 8 | 3 | 5 | 25 | 0 | None detected | None detected | `CHANGE`, `CHANGE_SECTION_CASELOAD`, `CHANGE_SECTION_CONTACT`, `CHANGE_SECTION_DEMOGRAPHIC`, `CHANGE_SECTION_DISENROLLMENTS`, `CHANGE_SECTION_ENROLLMENTS`, `HEADER_ROW`, `MONTHLY_CHANGE`, `MONTHLY_CHANGE_REPORT_PREFIX`, `PMR`, `RAW_DEMO_P_BANNER_FIELDS`, `RAW_DEMO_P_CASELOAD_FIELDS`, `RAW_DEMO_P_CONTACT_FIELDS`, `RAW_DEMO_P_DEMOGRAPHIC_FIELDS`, `RAW_DEMO_P_DISENROLLMENT_FIELDS`, `RAW_DEMO_P_ENROLLMENT_FIELDS`, `SHEET_TYPE` | None detected | `MONTHLY_CHANGE_REPORT_PREFIX` | DISENROLLMENT FUNCTIONS; MASTER LIST FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3 | 27 |
| MASTER LIST FUNCTIONS | Creates Master List sheets, index dashboards, sheet sorting/visibility, Master List formatting, and source-to-output merge workflows. | 73 | 66 | 32 | 12 | 12 | 49 | 8 | `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_BASE_TEMPLATE_NAME`, `RFF_DASHBOARD_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_SHEET_TYPES`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET` | `RFF_DASHBOARD_SHEET`, `RFF_SHEET_TYPES` | `DEMO_P_PREFIX`, `DISENROLLED_EXCLUSION_SHEET`, `HEADER_ROW`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `MASTER_LIST`, `MASTER_LIST_ADDED_HEADERS`, `MASTER_LIST_PREFIX`, `MASTER_LIST_TEMPLATE_SHEET`, `MONTHLY_CHANGE_REPORT_PREFIX`, `ON_CHANGE`, `PMR`, `RFF_ARCHIVE_SPREADSHEET_ID`, `RFF_DASHBOARD_SHEET`, `RFF_HEALTH_CHECK_SHEET`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_SHEET_TYPES`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`; ... | `RFF_INDEX_SHEET_SIGNATURE` | `BANNER_REPORT_ALT_PREFIX`, `INDEX_BUFFER_COLUMN`, `INDEX_DATA_START_ROW`, `INDEX_FIXED_ROW_COUNT`, `INDEX_HEADER_ROW_COUNT`, `INDEX_SHEET`, `INDEX_TOTAL_COLUMNS`, `MONTHLY_CHANGE_REPORT_PREFIX`, `RFF_INDEX_SHEET_SIGNATURE`, `RFF_TIMING_SHEET` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MENU FUNCTIONS; MONTHLY CHANGE FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 7 | 66 |
| DISENROLLMENT FUNCTIONS | Creates disenrollment outputs and exclusion surfaces, detects disenrolled PMRs, moves/removes rows, and formats disenrollment sheets. | 22 | 21 | 10 | 3 | 2 | 9 | 0 | None detected | None detected | `CHANGE_SECTION_CASELOAD`, `CHANGE_SECTION_CONTACT`, `CHANGE_SECTION_DEMOGRAPHIC`, `CHANGE_SECTION_DISENROLLMENTS`, `CHANGE_SECTION_ENROLLMENTS`, `DEMO_P`, `DEMO_P_PREFIX`, `DISENROLLED_EXCLUSION_SHEET`, `GLOBAL_DATE_FORMAT_HEADERS`, `HEADER_ROW`, `MCR_OUTPUT_HEADERS`, `PMR`, `RAW_DEMO_P_BANNER_FIELDS`, `RAW_DEMO_P_CASELOAD_FIELDS`, `RAW_DEMO_P_CONTACT_FIELDS`, `RAW_DEMO_P_DEMOGRAPHIC_FIELDS`, `RAW_DEMO_P_DISENROLLMENT_FIELDS`, `RAW_DEMO_P_ENROLLMENT_FIELDS`, `SHEET_TYPE` | None detected | None detected | DEMO P FUNCTIONS; FRAMEWORK AND TIMING FUNCTIONS; MASTER LIST FUNCTIONS; MONTHLY CHANGE FUNCTIONS | 1 | 21 |
| DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | Builds and maintains operational dashboard quality, validation, health, performance, workflow, summary, and signoff reports. | 105 | 94 | 42 | 54 | 24 | 134 | 0 | `DASHBOARD`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_CP_SYNC_DIAGNOSTICS_KEY`, `RFF_DASHBOARD_QUALITY_COL_WIDTHS`, `RFF_DASHBOARD_QUALITY_DEFER_WRITES_`, `RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS`, `RFF_DASHBOARD_QUALITY_SECTIONS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_DASHBOARD_SHEET`, `RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY`, `RFF_DASHBOARD_VERIFY_COLUMNS_KEY`, `RFF_DASHBOARD_VERIFY_GLOBAL_KEY`, `RFF_DASHBOARD_VERIFY_HEADERS_KEY`, `RFF_DASHBOARD_VERIFY_SHEETS_KEY`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_PERFORMANCE_SUMMARY_KEY`, `RFF_QA_SECTION_PROP_PREFIX`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`; ... | `RFF_DASHBOARD_SHEET`, `RFF_SECTION_BEHAVIORS`, `RFF_SECTION_COLUMNS`, `RFF_SECTION_GLOBAL`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SECTION_TITLE_ROWS` | `HEADERS`, `MASTER_LIST_MERGE_ML_VERSION`, `RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS`, `RFF_DASHBOARD_SHEET`, `RFF_DASHBOARD_VERIFY_HEADERS_KEY`, `RFF_DASHBOARD_VERIFY_SHEETS_KEY`, `RFF_HEALTH_CHECK_SHEET`, `RFF_MASTER_LIST_HEALTH_KEY`, `RFF_SECTION_HEADERS`, `RFF_SECTION_SHEETS`, `RFF_SYSTEM_SHEET_BORDER_COLOR`, `RFF_SYSTEM_SHEET_SECTION_COLOR`, `RFF_SYSTEM_SHEET_SUBHEADER_COLOR`, `RFF_SYSTEM_SHEET_TITLE_COLOR`, `RFF_SYSTEM_SHEET_VERIFICATION_KEY`, `RFF_TEST_DASHBOARD_SHEET`, `RFF_TIMING_SHEET`, `RFF_VALIDATION_SHEET`, `SHEET` | `MLF_QA_SECTION` | `QUALITY`, `RFF_DASHBOARD_QUALITY_COL_WIDTHS`, `RFF_DASHBOARD_QUALITY_DEFER_WRITES_`, `RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS`, `RFF_DASHBOARD_QUALITY_SECTIONS`, `RFF_DASHBOARD_QUALITY_WRAP_COLUMNS`, `RFF_TIMING_SHEET` | DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 11 | 94 |
| FRAMEWORK AND TIMING FUNCTIONS | Provides framework timing wrappers, timing report writing, timing retention, and compatibility template rebuild entry points. | 8 | 7 | 5 | 3 | 7 | 5 | 0 | `RFF_TIMING_MAX_ROWS` | None detected | `MONTHLY_CHANGE`, `SHEET_TYPE` | None detected | `RFF_TIMING_MAX_ROWS`, `TIMING` | DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS; DEMO P FUNCTIONS; DISENROLLMENT FUNCTIONS; HELPER FUNCTIONS; MASTER LIST FUNCTIONS; MENU FUNCTIONS; TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 1 | 7 |

### Production Flow

1. Spreadsheet open initializes menus and exposes public wrappers.
2. Setup workflows rebuild Format Dashboard defaults, system sheets, templates, and index surfaces.
3. Runtime workflows prompt for month context and load authoritative Format Dashboard configuration.
4. Monthly import formatters normalize source reports and write governed monthly worksheets.
5. Demo P workflows flatten raw participant/contact data and maintain monthly Demo P working sheets.
6. Sync workflows enrich Master List row data from Banner, Unlocked Care Plan, and Care Plan Due sources.
7. Master List, Monthly Change, and Disenrollment workflows create governed report sheets from templates and write title/header/data sections.
8. Dashboard Quality workflows validate dashboard/schema/template/report/runtime health and produce operational dashboard sections.
9. Framework Timing wraps eligible workflows and writes timing/performance reports.

### Formatting Flow

1. Format Dashboard Section A provides global row, font, color, border, wrap, alignment, and format defaults.
2. Section B controls title/header rows.
3. Section C defines sheet/report/template names, output naming, colors, sizing, and date behavior.
4. Section D defines column formatting overrides and date/hidden-column behavior.
5. Section E defines sheet behavior including filters, alternating colors, subheaders, template visibility, and output visibility.
6. Section F defines header order and source-of-data mappings.
7. Section G defines protected system surfaces.
8. Template/report formatters load dashboard configuration, apply template base formatting, apply governed text/date/number formats, enforce column widths/hidden columns, and write template signatures.

### Ownership Matrix

| Owner | Components Owned | Governance Responsibility |
|---|---|---|
| Current Approved Production Script | All executable functions, public APIs, wrappers, cache logic, validators, report builders, menu callbacks, triggers, and timing workflows. | Executable authority; changes require versioned production update and consumer compatibility review. |
| Format Dashboard | Formatting standards, worksheet definitions, templates, header mappings, sheet behaviors, presentation standards, and system surfaces. | Configuration authority; schema and section order are protected. |
| Operational Dashboard / Dashboard Quality Report | Quality, validation, health, performance, workflow, summary, and signoff output sections. | Governance output; generated rows are runtime evidence, not configuration authority. |
| Template Functions | Template creation, smart refresh, signature cache, metadata, and formatting enforcement. | Template compatibility and refresh correctness. |
| Cache Owners | Header, sheet lookup, dimension, dashboard config, template signature, index signature, and dashboard quality caches. | Performance and correctness through explicit invalidation. |

### Protected Components

- Protected production section boundaries and public function names.
- `ML_MENU_CALLBACKS`, `onOpen`, trigger handler names, and wrapper aliases.
- Format Dashboard sections A-G, column order, setting names, sheet types, template names, header names, and behavior fields.
- Operational Dashboard section titles A-F and H-N, summary/signoff semantics, and dashboard quality property keys.
- Template signatures, metadata notes, and smart-refresh decision logic.
- Header/cache invalidation helpers and sheet runtime cache clearing after mutations.
- Framework Timing wrappers and timing report retention/summary logic.

### Runtime Summary

At runtime, public/menu/trigger wrappers enter governed workflows, optional timing begins, month context and dashboard configuration are loaded, worksheet/template/header/cache state is resolved, source data is transformed or synchronized, outputs are written and formatted from templates, caches are cleared after mutations, dashboard quality/timing evidence is persisted, and system/index sheets are sorted or hidden according to governance rules.

## Section 3 — Read / Write Matrix

The following grouped tables list every production function and classify worksheet/data/template/dashboard/cache/timing behavior by static production-source analysis. `Yes` means the function directly performs or clearly delegates that activity; `No` means no direct evidence was detected in the function body.

### HELPER FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `h_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDefaultColumnDefinitionRows_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getAllUniqueHeaders_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getColumnStandards_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `c_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `writeDashboardTitle_` | Yes | Yes | No | No | No | Yes | No | No | Yes | Yes | No | No | No |
| `writeDashboardSection_` | Yes | Yes | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `styleDashboard_` | Yes | Yes | No | Yes | No | Yes | No | No | Yes | No | Yes | No | No |
| `setupReportFormattingDashboard` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `appendDashboardSectionRows_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getResolvedDefaultColumnDefinitionRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `writeDashboardDefaultsFast_` | Yes | Yes | No | Yes | No | Yes | No | Yes | Yes | Yes | Yes | No | No |
| `rebuildFormatDashboardDefaults` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `setupReportFormattingDashboardFromScriptDefaults_` | Yes | No | Yes | No | No | Yes | No | No | Yes | Yes | No | No | Yes |
| `normalizeDashboardSheetTypeKey_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getSheetDefinitionByTypeOrNull_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getSheetDefinitionByType_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `sortSheetDefinitionsByProductionOrder_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `notify_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `trimExcessRows_` | Yes | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `hideOldDisenrolledRows_` | No | Yes | No | No | No | No | No | No | No | No | Yes | No | No |
| `showQuickStartToast_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `quickSystemSetup` | No | No | Yes | No | No | No | No | No | Yes | Yes | Yes | No | No |
| `quickBuildAllTemplates` | No | No | Yes | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `notifyErrorWithTiming_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `isBlankCell_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `coerceToValidDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `spreadsheetSerialDateToLocalDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isReasonableReportDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `createLocalDateOnly_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getTodayLocalDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMonthDateParts_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `formatDateForSheetName_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `formatDateDisplay_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `dateKey_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `isSameDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isSameMonth_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMonthlySheetName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildStandardMonthlySheetName_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getNewestFormattedMonthlySheetByPrefix_` | Yes | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getMonthlySheetByPrefixAndDate_` | Yes | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `setUniqueSheetName_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `getHeaders_` | Yes | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `getHeaderMap_` | No | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `buildHeaderIndexMap_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `findHeaderIndex_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeHeader_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizePMR_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getPMRIndex_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `validateRawDataPreflightForDemoP_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `getDOBIndex_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeKeyPart_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDataValues_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `getRawDataSourceDataForOutput_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `rawDataSourceHeaderRow_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `ensurePrimaryPMRRowColumn_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `assignPrimaryRowForBlock_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `deleteRowNumberBatches_` | No | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `buildMasterListHeadersBeforeDataCopy_` | Yes | Yes | Yes | No | No | No | Yes | No | Yes | Yes | No | No | No |
| `ensureHeaders_` | Yes | Yes | Yes | No | No | No | No | No | No | No | No | No | No |
| `ensureBannerSummaryOutputHeaders_` | No | No | Yes | No | No | No | No | No | No | No | No | No | No |
| `ensureContactOutputHeaders_` | No | No | Yes | No | No | No | No | No | No | No | No | No | No |
| `trimOutputSheetToDataSize_` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `copyChangedPMRsFromDemoPToMasterList_` | Yes | Yes | No | No | No | No | Yes | No | No | No | No | No | No |
| `applyFinalRowHeightLock_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeCompareValue_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `valuesAreEqual_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeText_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeKey_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `numberOrDefault_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `parseBoolean_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `clearHeaderCacheForSheet_` | Yes | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `clearSheetRuntimeCachesForSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getHeaderCacheKey_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `clearMonthlySheetLookupCache_` | No | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `getMonthlySheetLookupCacheKey_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getSheetDimensionCacheKey_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `clearSheetDimensionCacheForSheet_` | No | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `getSheetDimensions_` | Yes | No | No | No | No | No | No | No | No | No | No | Yes | No |
| `dateOnlyLocalClone_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `monthKey_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `parseStandardMonthlySheetDateFromName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildRowsByPMR_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `safeSheetName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `compareValues_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `toBool_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `truthy_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `toNumber_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `resizeSheetMinimum_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `getThemeColorsFromBase_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getGlobalBorderStyle_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `normalizeHex_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hexWithHslLightness_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hexToRgb_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `rgbToHex_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `rgbToHsl_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hslToRgb_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `startRuntimeTiming_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `markRuntimeStep_` | No | No | No | No | No | Yes | No | No | No | No | Yes | No | Yes |
| `addRuntimeCounter_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `logRuntimeInfo_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `logRuntimeWarning_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `logRuntimeError_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `logBestEffortWarning_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `logRuntimeTiming_` | No | No | No | No | No | Yes | No | No | No | No | No | No | Yes |
| `getRuntimeTimingSeverity_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getRuntimeTimingReportName_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeRuntimeTimingReport_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeRuntimeTimingReportBestEffort_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `writeConsolidatedTimingSummaryReport_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeCombinedFrameworkTimingReport_` | No | No | Yes | No | No | Yes | No | No | No | No | No | No | Yes |
| `getFrameworkTimingRetentionLimit_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingReportSheetName_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingSectionRegistry_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `findFrameworkTimingSectionRow_` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `findNextFrameworkTimingSectionRow_` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `collectExistingFrameworkTimingSectionBlocks_` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `buildDefaultFrameworkTimingSectionBlock_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `normalizeFrameworkTimingSectionBlock_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `rebuildFrameworkTimingReportShellCompact_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | Yes |
| `hasFrameworkTimingReportShell_` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `initializeFrameworkTimingSheet_` | Yes | No | Yes | No | No | Yes | No | No | No | No | No | No | Yes |
| `ensureFrameworkTimingReport_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `trimSheetToColumnCount_` | Yes | No | No | Yes | No | No | No | No | No | No | Yes | No | No |
| `styleFrameworkTimingReport_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | Yes |
| `getFrameworkTimingSectionForId_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `replaceFrameworkTimingSectionRows_` | Yes | Yes | No | Yes | No | Yes | No | No | No | No | No | No | Yes |
| `getFrameworkTimingBenchmarkForProcess_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `getFrameworkTimingThresholdForSeverity_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `ensureFrameworkTimingReportShell_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingDetailStartRow_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingDetailRows_` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getLatestFrameworkTimingRowsByProcess_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingBenchmarkSeverity_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getFrameworkTimingModeForStep_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `mergeFrameworkTimingModes_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `buildFrameworkTimingProcessSummaryRows_` | No | No | No | No | No | Yes | No | No | No | No | No | No | Yes |
| `formatTimingTimestampForSummary_` | No | No | No | No | No | Yes | No | No | No | No | No | No | Yes |
| `buildFrameworkTimingIssueRows_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `buildFrameworkTimingRecommendationRows_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeFrameworkPerformanceRecommendationsSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `getPerformanceRecommendationForTimingStep_` | No | No | No | No | No | Yes | No | Yes | Yes | No | Yes | No | Yes |
| `worseTimingSeverity_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `appendRuntimeTimingToFrameworkTimingReport_` | No | No | Yes | No | No | No | No | No | No | No | Yes | No | Yes |
| `formatSeconds_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `refreshFrameworkTimingReport` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeFrameworkTimingPerformanceRecommendations` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |

### MENU FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `onOpen` | No | No | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes |
| `isFrameworkTimingEnabled_` | No | No | No | No | No | No | No | No | No | No | Yes | Yes | Yes |
| `toggleFrameworkTiming` | No | Yes | No | No | No | No | No | No | No | No | No | Yes | Yes |
| `hideTemplates_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `showTemplates_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `hideSystemSheets_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `showSystemSheets_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatDashboard` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `saveActiveLayoutToDashboardSettings` | Yes | No | No | No | No | No | No | No | Yes | Yes | Yes | No | Yes |
| `saveFormatDashboardConfigChanges_` | No | No | No | No | No | Yes | No | Yes | Yes | Yes | No | Yes | Yes |
| `resolveSheetDefinitionForLayoutSnapshot_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `captureActiveSheetLayoutSnapshot_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `getHiddenColumnFlags_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isDateNumberFormat_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getDefaultLayoutSnapshotBorderConfig_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `upsertDashboardSheetDefinitionBaseColor_` | Yes | Yes | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `upsertDashboardColumnDefinitionRows_` | Yes | Yes | Yes | No | No | No | No | No | Yes | Yes | No | No | No |
| `getDashboardSectionBounds_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `ensureDashboardSectionDataCapacity_` | Yes | Yes | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `writeDashboardLayoutSnapshotSection_` | Yes | Yes | No | No | No | Yes | No | Yes | Yes | No | No | No | No |
| `applyLayoutSnapshotBorder_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `clearDiagnosticsAndTimingLogs` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | Yes |

### FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `clearDashboardConfigCache_` | No | No | No | No | No | No | No | No | Yes | No | No | Yes | No |
| `getDashboardConfigCacheKey_` | Yes | No | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `getFormatDashboardSectionNames_` | No | No | No | No | No | Yes | No | No | Yes | Yes | No | No | No |
| `getRequiredFrameworkSheetTypes_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `getDefaultGlobalSettingsRows_` | No | No | No | No | No | Yes | No | Yes | Yes | No | No | No | No |
| `getDefaultTitleRowRows_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDefaultSheetDefinitionRows_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `getDefaultSheetDefinitionRowsWithColumnCounts_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDefaultBehaviorRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDefaultSystemSurfaceRows_` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | Yes |
| `getDefaultSheetHeaderRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDefaultHeaderSets_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |

### TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `createOrRefreshAllReportTemplates` | No | No | Yes | No | No | No | No | Yes | Yes | Yes | Yes | Yes | Yes |
| `ensureGoldenMasterTemplate_` | Yes | No | Yes | No | No | Yes | No | Yes | No | No | Yes | No | Yes |
| `summarizeTemplateRefreshModes_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `hideReportTemplates` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | Yes |
| `showReportTemplates` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | Yes |
| `setReportTemplateVisibility_` | Yes | No | No | No | No | No | No | Yes | No | No | No | No | Yes |
| `validateReportTemplates` | No | No | No | No | No | No | No | Yes | Yes | Yes | Yes | No | Yes |
| `validateReportTemplatesCore_` | No | No | No | No | No | No | No | Yes | Yes | Yes | Yes | No | Yes |
| `loadDashboardConfig_` | Yes | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No |
| `buildDashboardSectionIndex_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `loadGlobalSettings_` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `loadTitleRows_` | No | No | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `parseTitleRowConfigRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeTitleTargetCell_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getTitleRowConfigForSheet_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getThemeFillForTitleRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `toWrapStrategy_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `loadSheetDefinitions_` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `loadSheetHeaders_` | No | No | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `loadColumnDefinitions_` | No | No | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `loadSheetBehaviors_` | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `normalizeDashboardSectionTitle_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `readDashboardSectionRows_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getBehaviorForSheetType_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `createOrRefreshTemplateFromDashboard_` | Yes | Yes | Yes | No | No | No | Yes | Yes | Yes | No | Yes | Yes | Yes |
| `shouldUseStagedTemplateBuild_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `shouldRefreshTemplateMetadataOnly_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `buildTemplateRefreshDecisionMessage_` | No | No | No | No | No | No | No | Yes | No | No | No | Yes | No |
| `refreshTemplateMetadataOnly_` | No | No | No | No | No | Yes | No | Yes | No | No | No | No | Yes |
| `buildTemplateFromDashboardSafely_` | Yes | Yes | Yes | Yes | No | No | No | Yes | Yes | No | Yes | No | Yes |
| `getTemplateBuildSheetName_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `promoteStagedTemplateBuild_` | Yes | Yes | No | Yes | No | No | No | Yes | No | No | Yes | No | Yes |
| `validateBuiltTemplateMinimumStructure_` | Yes | No | No | No | No | No | No | Yes | No | No | Yes | No | No |
| `buildTemplateFromDashboard_` | No | No | No | No | No | Yes | No | Yes | Yes | No | Yes | No | Yes |
| `shouldSkipTemplateResize_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `ensureSheetMinimumColumns_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `clearTemplateForFullBuild_` | Yes | Yes | No | No | No | No | No | Yes | No | No | Yes | No | Yes |
| `applyTemplateRowHeights_` | No | No | No | No | No | No | No | Yes | No | No | No | No | Yes |
| `applyFinalRowHeightLockForSheetType_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `lockFinalOutputRowHeights_` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `shouldLockExpandedDataRowHeights_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `applyGlobalDefaultRowHeightsToSheet_` | Yes | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No |
| `safeSetRowHeights_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyRowHeightRuns_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hideTemplateIfNeeded_` | No | No | No | No | No | No | No | Yes | No | No | Yes | No | Yes |
| `resolveTemplateRowCount_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `applyTemplateBaseFormatting_` | Yes | No | Yes | No | No | Yes | No | Yes | No | No | No | No | Yes |
| `ensureTitleRowConfig_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `applyTitleRows_` | Yes | Yes | Yes | No | No | Yes | No | No | No | No | Yes | No | No |
| `rowColToA1_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `applyHeaderRow_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyColumnWidths_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `applyColumnWidthsInRuns_` | No | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyDateAndNumberFormats_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `enforceTemplateDateAndNumberFormats_` | No | No | No | No | No | Yes | No | Yes | No | No | No | No | No |
| `enforceDateAndNumberFormatsForHeaders_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `getExpectedNumberFormat_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getGoogleSheetsNumberFormat_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `isDateFormatText_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `applyHiddenColumnSettings_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `applyHiddenColumnSettingsInRuns_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `applyDataRows_` | Yes | No | No | No | No | Yes | No | No | No | No | No | No | Yes |
| `applyAlternatingColorRules_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyMonthlyChangeSpacerRow3Format_` | Yes | Yes | Yes | No | No | Yes | Yes | No | No | No | Yes | No | No |
| `formatMonthlyChangeSubsectionBlock_` | Yes | Yes | No | No | No | Yes | No | No | No | No | No | No | No |
| `writeTemplateMetadata_` | Yes | Yes | No | No | No | No | No | Yes | No | Yes | Yes | Yes | No |
| `buildTemplateFormatSignature_` | No | No | No | No | No | Yes | No | Yes | No | No | No | No | No |
| `compactTemplateFormatSignature_` | No | No | No | No | No | Yes | No | Yes | No | No | No | Yes | No |
| `normalizeTemplateFormatSignature_` | No | No | No | No | No | Yes | No | Yes | No | No | No | No | No |
| `getTemplateFormatSignatureKey_` | No | No | No | No | No | Yes | No | Yes | No | No | No | Yes | No |
| `getStoredTemplateFormatSignature_` | No | No | No | No | No | Yes | No | Yes | No | No | Yes | Yes | No |
| `getStoredTemplateFormatSignatureFromSheet_` | Yes | No | No | No | No | Yes | No | Yes | No | No | Yes | Yes | No |
| `storeTemplateFormatSignature_` | No | Yes | No | No | No | Yes | No | Yes | No | No | Yes | Yes | No |
| `ensureTemplateFilter_` | Yes | No | No | Yes | No | No | No | Yes | No | No | Yes | No | Yes |
| `applyTemplateFreezeAndTabColor_` | No | Yes | No | No | No | No | No | Yes | No | No | Yes | No | Yes |
| `resizeSheet_` | Yes | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `resizeSheetGrid_` | No | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `resizeSheetRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `resizeSheetColumns_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getHeadersForSheetType_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDefaultBehavior_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `showSheetIfNeeded_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `hideSheetIfNeeded_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `formatMonthlySheets` | Yes | No | No | No | No | Yes | No | No | Yes | No | Yes | No | Yes |
| `buildPromptedMonthContext_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `formatMonthlyBannerSheet_` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | No | No | No |
| `formatMonthlyDashboardSheetFromSource_` | Yes | Yes | No | Yes | Yes | Yes | No | Yes | Yes | Yes | No | No | Yes |
| `formatMonthlyRawDataSheetFromSource_` | Yes | No | No | Yes | No | Yes | Yes | Yes | Yes | Yes | No | No | Yes |
| `formatBannerReport` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes |
| `validateActiveBannerFormatterOutput` | Yes | No | No | No | No | Yes | No | No | No | Yes | Yes | No | Yes |
| `archiveActiveRawDataSheet` | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No | Yes |
| `parseReportMonthInput_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `promptForLockedYearReportMonth_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `boolText_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isPrimaryPMRRowValue_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `assignPrimaryPMRRows_` | No | Yes | Yes | No | No | No | No | No | No | No | No | No | No |
| `getCurrentBannersSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getCurrentUnlockedCarePlanSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getCurrentCarePlanDueSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getPreviousMasterListSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getCurrentMasterListSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `applyStandardFormatting_` | Yes | Yes | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `applyStandardFormattingAfterHeadersAndData_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `forceStandardTitleCellAlignment_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `captureHiddenSheetNames_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `restorePreviouslyHiddenSheets_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `finalizeWorkflowAfterCreateOrUpdate_` | No | No | Yes | No | No | No | No | No | No | No | Yes | No | No |
| `hidePreviousMonthSheets_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `autoHidePreviousMonthSheetsAfterWorkflow_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `applyIndexSheetRowFills_` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `applyCurrentVsOlderTabColors_` | Yes | Yes | No | No | No | No | No | No | Yes | Yes | Yes | No | No |
| `organizeSheetTabs_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatDateColumnsByHeader_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `rowObjectFromHeaders_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getLiveDashboardAuditStatus_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getLiveTemplateValidationStatus_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `getLiveFrameworkHealthStatus_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `getLiveSheetStatus_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `setMonthlySheetNameFast_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `writePMRContactsToParticipantRows_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `buildParticipantContactKey_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isExpiredContactPhoneDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `capitalizeContactPart_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatRankedContact_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getMostRecentDateFromRowsByHeader_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isDateInStrictLocalRangeInclusive_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isDateDisplayInReportWindow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isParticipantEnrollmentStatusDisenrolled_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getSheetTypeForOrganization_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `collectFrameworkHealthCheckRows_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | Yes |
| `collectWorkflowSyncVerificationRows_` | No | No | No | No | No | No | Yes | No | No | No | Yes | No | No |
| `runFrameworkSmokeValidation` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `collectFrameworkSmokeValidationRows_` | No | No | Yes | No | No | Yes | No | No | Yes | No | Yes | No | No |
| `appendFrameworkSmokeValidationRow_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `functionSourceContainsAll_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `runDashboardQualityMasterListHealthCheck_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `buildCombinedFrameworkTestDashboardRows_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `applyDashboardTemplateFormattingToActiveReportSheet_` | Yes | No | No | No | No | Yes | No | Yes | Yes | No | No | No | No |
| `applyDashboardSortOrderAlternatingColors_` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `ensureStandardTitleRows_` | Yes | Yes | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `isDateLikeHeader_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `buildMonthlySheetNameNoDashAfterPrefix_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatReportDateLabel_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `buildBannerReportOutputName_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `renameSheetSafely_` | Yes | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `deleteSheetIfExists_` | Yes | No | No | Yes | No | No | No | No | No | No | No | No | No |
| `writeBannerReportDates_` | Yes | Yes | No | No | No | Yes | No | No | No | No | No | No | No |
| `copyRawBannerDataToOutput_` | Yes | Yes | Yes | No | No | Yes | Yes | No | No | No | No | No | No |
| `ensureSheetHasAtLeastRows_` | Yes | Yes | No | No | No | No | No | No | No | No | Yes | No | No |
| `validateBannerFormatterOutput_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `archiveRawSourceAndDeleteLocal_` | No | No | No | Yes | Yes | No | Yes | No | No | No | Yes | No | Yes |
| `archiveRawDataSheet_` | Yes | Yes | Yes | No | Yes | No | Yes | No | No | No | Yes | No | No |
| `hideMonthlyImportSheets` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hideMonthlyActiveSheets` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hideMonthlySheetsBySpecs_` | Yes | No | No | No | Yes | No | No | No | No | No | No | No | Yes |
| `archiveMonthlyImportSheets` | No | No | No | No | Yes | No | No | No | No | No | No | No | Yes |
| `archiveMonthlyActiveSheets` | No | No | No | No | Yes | No | No | No | No | No | No | No | Yes |
| `archiveMonthlySheetsBySpecs_` | Yes | No | No | No | Yes | No | Yes | No | No | No | Yes | No | Yes |
| `findArchiveMonthlyCandidateSheets_` | Yes | No | No | No | Yes | No | No | No | No | No | No | No | No |
| `copySheetToArchiveAndDeleteLocal_` | Yes | Yes | Yes | Yes | Yes | No | Yes | No | No | No | Yes | No | No |
| `notifyArchiveMonthlySheetsResult_` | No | No | No | No | Yes | No | No | No | No | No | Yes | No | No |
| `deleteArchiveSheetIfExists_` | Yes | Yes | No | Yes | Yes | Yes | No | No | No | No | No | No | No |
| `formatMonthlyChangeSubheaderRow` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `formatMonthlyChangeSubsectionBlock` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | No | No | No |
| `getMonthlyChangeSubsectionLabels` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeNumberFormatForCompare_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `numberFormatsMatch_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `validateTemplateFromDashboard_` | Yes | No | No | No | No | Yes | No | Yes | Yes | No | Yes | No | No |
| `writeTemplateValidationReport_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `formatRawData` | Yes | No | No | Yes | No | Yes | Yes | Yes | Yes | Yes | No | No | Yes |
| `ensureRawDataHeaderRows_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `rowLooksLikeParticipantHeader_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `getRawDataCurrentHeadersOrDefaults_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `enforceDemoPStrictDashboardSchema_` | No | No | No | No | No | No | No | No | Yes | Yes | Yes | No | No |
| `buildRawDataSourceArchiveName_` | No | No | No | No | Yes | Yes | No | No | No | No | No | No | No |
| `mapRowsToHeaders_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `applyUniversalFastCanvasFormatting_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyGovernedTextAndNumberFormats_` | Yes | No | No | No | No | Yes | No | No | No | No | Yes | No | No |
| `applyOutputVisibilityPolicy_` | Yes | No | No | No | No | No | No | No | Yes | Yes | No | No | No |
| `createOutputSheetFromDashboardTemplate_` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| `createRawDataOutputSheetFromTemplateFast_` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| `ensureOutputSheetHasFormattedRows_` | Yes | Yes | Yes | No | No | Yes | Yes | Yes | No | No | Yes | No | No |
| `syncRawDataBannerColumns_` | No | No | No | No | No | No | Yes | No | No | No | Yes | No | No |
| `buildSourceMapByCompositeKeyForDemoPBanner_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatCarePlanDueReport` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `formatUnlockedCarePlanReport` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `formatCarePlanDueOrUnlockedFromDashboard_` | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes |
| `buildRawArchiveNameForSheetType_` | No | No | No | No | Yes | Yes | No | No | No | No | No | No | No |
| `collectAndClearMovedTitleInfoCells_` | Yes | Yes | No | No | No | No | No | No | No | No | Yes | No | No |
| `prepareCarePlanSourceSheetForDashboardFormat_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `prepareRawDataSourceSheetForDashboardFormat_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `buildRawDataHeadersForFormatting_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getRawDataApprovedAddedColumns_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `processRawDataApprovedSyncColumns_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `writeChangedColumnsOnly_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `getRawDataDemoPSourceHeaders_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getRawDataDisallowedWorkingColumns_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `isOngoingOutputSheetType_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildDashboardOutputSheetName_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |

### SYNC FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `syncMasterListMonthlySourcesIntoData_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncBannerSourceIntoData_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncUnlockedCarePlanSourceIntoData_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncCarePlanDueSourceIntoData_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncRowsFromSourceMapData_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `buildSourceMapBySingleKeyForPart5_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildSourceMapByCompositeKeyForPart5_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `shouldProcessRowByPMR_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeSyncFieldPairs_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncMasterListFromBanners_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncMasterListFromUnlockedCarePlan_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncMasterListFromCarePlanDue_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `syncRowsFromSourceMap_` | No | Yes | No | No | No | No | Yes | No | No | No | No | No | No |

### DEMO P FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `getDefaultDemoPMetadataHeaderRows_v155_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildDemoPFromScratch` | Yes | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `updateDemoPMonthlySync` | Yes | Yes | Yes | No | No | No | Yes | No | No | No | No | No | Yes |
| `enforceDemoPPostFlattenFormatting_` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | No | No | No |
| `sortSheetAlphabeticallyByParticipantName_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDemoPMonthlySyncChangedPMRs_` | No | No | No | No | No | No | Yes | No | No | No | No | No | No |
| `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `processDemoPDataWithFillBlankMask_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildDemoPFreshRowsForPMRs_` | Yes | No | No | No | No | No | Yes | No | No | No | Yes | No | Yes |
| `processDemoPFreshRowsInMemory_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `flattenDemoPContactRowsInMemory_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `flattenDemoPContactsToPrimaryRows_` | Yes | Yes | No | No | No | No | No | No | No | No | Yes | No | No |
| `buildDemoPContactSummaryForFlatRecord_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `sortDemoPFlatRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `processDemoP` | Yes | No | Yes | No | No | Yes | Yes | Yes | Yes | No | Yes | No | Yes |
| `processDemoPAsWorkingSource_` | Yes | Yes | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `markPrimaryPMRRowsForSequentialData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `assignPrimaryPMRRowsInData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatDemoPStructure` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `buildRawDataSheetName_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getOrCreateDemoPProcessingSheet_` | Yes | No | No | No | No | Yes | No | Yes | Yes | No | No | No | Yes |
| `deleteSheetIfExistsForDemoPProcess_` | Yes | No | No | Yes | No | No | No | No | No | No | No | No | No |
| `getLastRawDataDisenrolledBuildResult_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `setLastRawDataDisenrolledBuildResult_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `updateExistingDemoPFromRawData_` | Yes | Yes | Yes | No | No | No | No | Yes | Yes | Yes | Yes | No | Yes |
| `createActiveDemoPFromRawData_` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes |
| `populateDemoPUpdateColumns_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `populateUniversalMetadataColumns_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `buildSourceHashByPMR_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildSourceHashForRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildSourceHashForRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildColumnsUpdatedText_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `normalizeHashValue_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `computeStableHash_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `verifyPrimaryPMRColumnFromRawData_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `createOrRefreshDemoPTemplate_` | No | No | Yes | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `getOrCreateDemoPTemplate_` | Yes | No | Yes | No | No | No | No | Yes | No | No | No | No | No |
| `initializeDemoPTemplateTitleRows_` | Yes | Yes | No | No | No | No | No | Yes | No | No | No | No | No |
| `applyDemoPTemplateFormatting_` | No | No | No | No | No | Yes | No | Yes | No | No | No | No | No |
| `applyDemoPTemplateToSheet_` | Yes | Yes | No | No | No | Yes | No | Yes | Yes | Yes | No | No | No |
| `applyDemoPDateFormattingByHeader_` | Yes | No | No | No | No | Yes | No | Yes | No | No | No | No | No |

### MONTHLY CHANGE FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `buildMonthlyChangeReport` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `buildMonthlyChangeReportForMonth_` | Yes | No | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | No | No | Yes |
| `getOrBuildMonthlyChangeReport_` | Yes | No | Yes | No | No | Yes | Yes | Yes | Yes | Yes | No | No | Yes |
| `compareRawDemoPForSectionReport_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `rowsWithDOBOnlyForSection_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getChangedColumnsForSectionRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildColumnSignaturesForSection_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `compareRawDemoPForChanges_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getRawDemoPDataForCompare_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `compareSingleFieldAndAdd_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `addMCRRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildContactCompareMap_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getFieldValueFromRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildParticipantName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `displayValueForReport_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `buildMonthlyChangeReportSectionLayout_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `padRowToWidth_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `stripMonthlyChangeNativeBandings_` | No | No | No | Yes | No | No | No | No | No | No | No | No | No |
| `getMonthlyChangeSectionSpecs_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMonthlyChangeSectionRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `appendMonthlyChangeCompiledRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `appendMonthlyChangeSectionBlock_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `populateMonthlyChangeReportSections_` | Yes | Yes | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `findMonthlyChangeSectionTitleRow_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `findNextMonthlyChangeSectionTitleRow_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `getChangedPMRsFromMonthlyChangeReport_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `writeDiagnosticReport_` | Yes | Yes | Yes | No | No | No | No | No | No | No | No | No | No |
| `runMonthlyUpdate` | Yes | No | Yes | No | No | No | No | No | No | No | Yes | No | Yes |
| `updateMasterList` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `updateMasterListForMonth_` | Yes | No | No | No | No | Yes | Yes | No | No | No | Yes | No | Yes |

### MASTER LIST FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `createMasterList` | Yes | Yes | No | Yes | No | Yes | Yes | Yes | No | No | Yes | No | Yes |
| `copyPrimaryDemoPRowsToMasterListByHeader_` | Yes | Yes | No | No | No | No | Yes | No | No | No | No | No | No |
| `getMasterListTemplateHeaders_` | No | No | No | No | No | No | No | Yes | No | No | No | No | No |
| `createOrRefreshMasterListTemplate_` | No | No | Yes | No | No | No | No | Yes | Yes | Yes | No | No | No |
| `getOrCreateMasterListTemplate_` | Yes | No | Yes | No | No | No | No | Yes | No | No | No | No | No |
| `createMasterListSheetFromTemplate_` | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| `writeMasterListTitleDateBlock_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `initializeMasterListTitleRows_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `copyDemoPHeaderRowsToMasterList_` | Yes | Yes | Yes | No | No | No | Yes | No | No | No | Yes | No | No |
| `copyQualifyingDemoPRowsToMasterList_` | Yes | Yes | No | No | No | No | Yes | No | No | No | No | No | No |
| `formatMasterListSheet_` | Yes | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getMonthPartsFromTitleRows_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `updateCopiedMasterListHeader_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `createIndexSheet` | Yes | Yes | Yes | No | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes | Yes |
| `generateArchiveFileIndex_` | No | No | Yes | No | Yes | No | No | No | No | No | No | No | No |
| `setupIndexRefreshOnSheetAddedTrigger_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `handleSpreadsheetChangeForIndex` | Yes | Yes | Yes | No | No | No | No | No | No | No | Yes | Yes | No |
| `enforceGlobalSheetSortOrder_` | Yes | No | No | No | No | No | No | Yes | Yes | Yes | Yes | No | Yes |
| `extractFirstDateFromSheetName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `parseIndexMonthDate_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `organizeWorkbookTabs_` | Yes | No | No | No | No | Yes | No | Yes | Yes | Yes | Yes | No | Yes |
| `hideSystemAndTestingSheets_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `getSystemAndTestingSheetNames_` | No | No | No | No | No | No | No | No | No | Yes | Yes | No | Yes |
| `isSystemOrTestingSheet_` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `assignSortOrderAndHideExtraRows` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `applySortOrderDisplayForMasterList_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `buildParticipantBlocksForSortOrder_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `showAllMasterListRows` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `groupMasterListRowsByPMR_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hideRowsWithBlankDOB_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `sortMasterListByParticipantNameAndPMR_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `getPrimaryRowScore_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `hideNonPrimaryPMRRows_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `hideRowNumberBatches_` | No | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `clearAllRowGroupsIfPossible_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `prepareMasterListSortOrderBeforeFormatting_` | Yes | Yes | No | No | No | Yes | No | No | No | No | No | No | No |
| `applyFinalMasterListColorAndDisplay_` | Yes | Yes | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `applyMasterListDisplaySettings_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `processMasterListFull_` | No | No | Yes | No | No | No | No | No | No | No | No | No | Yes |
| `processMasterListDataOnly_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `processMasterListSingleDataPass_` | No | Yes | Yes | No | No | No | Yes | No | No | No | No | No | Yes |
| `populateParticipantNameData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `populateDemoPNameData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `updateBannerColumnData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `combineAddressesData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `handleLanguageData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `splitPhoneNumbersData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `runMasterContactProcessData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `combineNotesSummaryData_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `rebuildChangedPMRsFromDemoP_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `copyPreviousMasterListToCurrentMonth_` | Yes | Yes | Yes | Yes | No | No | Yes | Yes | No | No | No | No | No |
| `rebuildChangedPMRsOnExistingMaster_` | No | Yes | No | No | No | Yes | No | No | No | No | No | No | Yes |
| `updateMasterListFromMonthlyChangeActions_` | No | No | No | No | No | No | Yes | No | No | No | No | No | Yes |
| `getPMRsForMonthlyChangeSections_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `deletePMRBlocksFromMasterListBySet_` | No | No | No | Yes | No | No | No | No | No | No | No | No | No |
| `updatePrimaryRowsFromDemoPForPMRs_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `mergeSecondaryRowsFromDemoPForPMRs_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `buildMappedMasterRowFromDemoRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `mutateMasterRowColumnsFromDemoRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `hideSystemSheetsNow` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `showSystemSheetsNow` | Yes | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `getPrimaryMergeRowItem_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getPrimaryRowChangedColumnDetails_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `formatMergeAuditValueForDisplay_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `getMergeAuditParticipantName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMergeAuditParticipantNameFromRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMergeAuditContactSummary_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMergeAuditChangedFields_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMergeRowsByPMRFromData_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildSecondaryMergeKeyMapForRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMergeKeyMapForRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildContactMergeRowKey_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMergeRowValue_` | No | No | No | No | No | No | No | No | No | No | No | No | No |

### DISENROLLMENT FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `createDisenrolledList` | Yes | No | No | No | No | No | Yes | No | No | No | No | No | Yes |
| `processBlankContactSummariesOnDemoP_` | No | Yes | No | No | No | No | No | No | No | No | No | No | Yes |
| `splitRawDataRowsIntoActiveAndDisenrolled_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildDisenrolledPMRSetFromDemoPValues_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `loadDisenrolledPMRSetForMonth_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `appendDisenrolledRowsFromRawDataToExclusion_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `moveDisenrolledPMRsFromDemoPToExclusion_` | Yes | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `appendDisenrolledDeltasToExclusionSheet_` | Yes | Yes | Yes | No | No | Yes | Yes | No | Yes | Yes | Yes | No | No |
| `appendDisenrolledPMRBlocksToExclusion_` | Yes | No | No | No | No | No | No | Yes | Yes | No | No | No | No |
| `createDisenrolledExclusionSheetFromDashboardTemplate_` | Yes | Yes | Yes | No | No | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| `loadDisenrolledExclusionPMRsForPart3_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `removeDisenrolledPMRBlocksFromMasterUsingDemoP_` | Yes | Yes | No | No | No | No | No | No | No | No | No | No | No |
| `applyDisenrolledExclusionCreateFormattingOnly_` | Yes | Yes | No | No | No | Yes | No | No | No | No | No | No | No |
| `getCurrentRawDataSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getPreviousRawDataSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getCurrentDemoPSheet_` | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| `getPreviousDemoPSheet_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMonthlyChangeReportHeaders_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getMonthlyChangeReportDateIndexes_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `convertMonthlyChangeReportDateValues_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `buildMonthlyChangeReportRow_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `formatMonthlyChangeReportSectionSheet_` | No | Yes | No | No | No | Yes | No | No | Yes | Yes | No | No | No |

### DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `runDashboardQualityStartUp` | No | No | Yes | No | No | No | No | No | Yes | No | Yes | No | Yes |
| `runDashboardQualityDashboardVerificationSections_` | Yes | No | Yes | No | No | No | No | No | Yes | Yes | Yes | No | Yes |
| `getDashboardVerificationPassRow_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `appendDashboardVerificationPassIfNoIssues_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getDashboardSectionHeaderWidth_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `collectBlankDashboardCells_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `collectFormatDashboardGlobalInputVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `collectFormatDashboardTitleRowsVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `collectFormatDashboardSheetDefinitionVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `collectFormatDashboardSheetHeaderVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `collectFormatDashboardColumnDefinitionVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `collectFormatDashboardSheetBehaviorVerificationRows_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `getDashboardQualitySectionLastRunMillis_` | No | No | No | No | No | No | No | No | Yes | No | No | Yes | No |
| `dashboardQualitySectionRanWithinLastHour_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `runDashboardQualitySectionIfDue_` | No | No | No | No | No | No | No | No | Yes | No | No | No | Yes |
| `runDashboardQualityQuick` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `runDashboardQualityValidateTemplates` | No | No | Yes | No | No | No | No | Yes | Yes | No | Yes | No | Yes |
| `runDashboardQualityTemplateAndFormatSections_` | No | No | Yes | No | No | Yes | No | Yes | Yes | Yes | Yes | No | Yes |
| `getDashboardQualitySectionRegistry_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `collectDashboardQualityPerformanceSummaryRows_` | No | No | Yes | No | No | No | No | No | Yes | No | No | No | Yes |
| `runDashboardQualityPerformanceSummary_` | No | No | No | No | No | No | No | No | Yes | No | No | No | Yes |
| `runDashboardQualityCarePlanSyncDiagnostics_` | No | No | No | No | No | Yes | Yes | No | Yes | No | Yes | No | Yes |
| `runDashboardQualityFull` | No | Yes | Yes | No | No | No | Yes | No | Yes | No | Yes | Yes | Yes |
| `runAllFrameworkTestsAndBuildDashboard` | No | No | No | No | No | No | No | No | Yes | No | No | No | Yes |
| `repairAllTemplateDateFormats` | Yes | No | No | No | No | Yes | No | Yes | Yes | Yes | No | No | Yes |
| `normalizeSectionRowForWidth_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `rowHasAnyValue_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `trimTrailingBlankRows_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `getDefaultDashboardQualityDetailHeader_` | No | No | No | No | No | No | Yes | Yes | Yes | No | Yes | No | No |
| `collectExistingDashboardQualitySectionBlocks_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDashboardQualityNotRunMessage_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `buildDefaultDashboardQualitySectionBlock_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualitySectionBlock_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `rebuildDashboardQualityReportShellCompact_` | Yes | Yes | No | No | No | Yes | No | No | Yes | No | Yes | No | No |
| `getDashboardQualitySectionTitleForKey_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDashboardQualitySectionKeyForTitle_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `hasDashboardQualityTemplateShell_` | Yes | No | No | No | No | No | No | Yes | Yes | No | No | No | No |
| `initializeDashboardQualitySheet_` | Yes | No | Yes | No | No | Yes | No | Yes | Yes | No | No | No | No |
| `initializeSystemSheets_` | No | No | Yes | No | No | No | No | Yes | Yes | Yes | Yes | No | Yes |
| `deleteLegacyOperationalAndDiagnosticSheets_` | No | No | No | Yes | No | No | No | No | No | No | No | No | No |
| `ensureDashboardQualityReportSheet_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `ensureDashboardQualityTemplateShell_` | No | No | No | No | No | No | No | Yes | Yes | No | No | No | No |
| `ensureDashboardQualitySectionShells_` | No | No | Yes | No | No | No | No | Yes | Yes | No | No | No | No |
| `getDashboardQualityFixedSectionStartRow_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `applyDashboardQualityReportColumnSettings_` | Yes | Yes | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `styleDashboardQualityReport_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualityHeaderLabels_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `isDashboardQualityNotesLabel_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualityOutputRow_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getDashboardQualitySectionLetter_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualityIssueValue_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualityRowsForSection_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `normalizeDashboardQualityDataRows_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `buildTimestampedDashboardQualitySectionRows_` | No | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `getStatusFromDashboardQualityRows_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getMostRecentTimingDurationForSectionKey_` | Yes | No | No | No | No | No | No | No | Yes | No | Yes | No | Yes |
| `getTimingProcessNameForDashboardQualitySection_` | No | No | No | No | No | No | Yes | Yes | Yes | No | Yes | No | Yes |
| `dashboardQualityRowsEqualValues_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `saveDashboardQualitySectionRows_` | Yes | Yes | Yes | No | No | No | No | Yes | Yes | No | Yes | Yes | No |
| `getDashboardQualitySectionRows_` | No | No | No | No | No | No | No | No | Yes | No | Yes | Yes | No |
| `deleteLegacyQualityReportSheet_` | Yes | No | No | Yes | No | No | No | No | No | No | Yes | No | No |
| `deleteLegacyStandaloneQualityReports_` | No | No | No | Yes | No | No | No | No | No | No | Yes | No | No |
| `saveDashboardQualityRowsForTemplateValidation_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `saveDashboardQualityRowsForHealthCheck_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getStoredDashboardQualityOverallStatus_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getStoredDashboardQualityFailureNotes_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `buildDatedDisenrolledOutputName_` | No | No | No | No | No | Yes | No | No | No | No | No | No | No |
| `forceSheetRowCount_` | Yes | Yes | No | Yes | No | No | No | No | No | No | No | No | No |
| `buildCombinedFrameworkTestDashboard` | No | No | Yes | No | No | No | No | No | Yes | No | No | No | Yes |
| `updateDashboardQualitySummaryTimingAndSignoffSections_` | No | No | No | No | No | No | No | No | Yes | No | No | No | Yes |
| `updateDashboardQualitySignoffSection_` | No | Yes | Yes | No | No | Yes | No | No | Yes | No | No | Yes | No |
| `updateDashboardQualitySummarySection_` | No | Yes | Yes | No | No | Yes | No | No | Yes | No | No | Yes | No |
| `updateDashboardQualityTimingSummarySection_` | No | No | No | No | No | No | No | No | Yes | No | No | No | Yes |
| `getDashboardQualitySectionBoundsMap_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `replaceDashboardQualitySectionsRows_` | Yes | Yes | No | Yes | No | Yes | No | Yes | Yes | No | No | No | No |
| `tryDashboardQualityAnchoredColumnWrite_` | Yes | Yes | No | No | No | No | No | No | Yes | No | No | No | No |
| `replaceDashboardQualitySectionRows_` | Yes | Yes | No | Yes | No | Yes | No | Yes | Yes | No | Yes | No | No |
| `findDashboardQualitySectionRow_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `findNextDashboardQualitySectionRow_` | Yes | No | No | No | No | No | No | No | Yes | No | No | No | No |
| `dashboardQualitySectionContentMatches_` | Yes | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `mergeDashboardQualityStyleRanges_` | No | No | No | No | No | Yes | No | No | Yes | No | No | No | No |
| `styleDashboardQualityUpdatedSections_` | Yes | No | No | No | No | Yes | No | No | Yes | No | Yes | No | No |
| `appendCombinedDashboardSignOffRows_` | No | No | No | No | No | No | Yes | Yes | Yes | No | Yes | No | No |
| `buildFrameworkSummaryRows_` | No | No | No | No | No | No | Yes | Yes | Yes | No | Yes | No | No |
| `getStoredSectionStatusAndNotes_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getReportOverallStatus_` | Yes | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `getReportFailureNotes_` | Yes | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `runFrameworkHealthCheck` | No | No | No | No | No | Yes | No | No | Yes | No | Yes | No | Yes |
| `getFrameworkHealthCheckIssueRows_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `formatFrameworkHealthCheckIssuesForTiming_` | No | No | No | No | No | Yes | No | No | No | No | Yes | No | Yes |
| `appendRequiredFunctionChecks_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `existsFunctionByName_` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `writeFrameworkHealthCheckReport_` | No | No | No | No | No | No | No | No | Yes | No | Yes | No | No |
| `normalizeFrameworkHealthCheckRows_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `getRequiredHelperFunctionNames_` | No | No | No | No | No | No | No | No | No | No | Yes | No | No |
| `getRequiredMenuFunctionNames_` | No | No | Yes | No | No | Yes | Yes | Yes | Yes | No | Yes | No | Yes |
| `getRequiredDashboardFunctionNames_` | No | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | No |
| `getRequiredTemplateFunctionNames_` | No | No | Yes | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `getRequiredValidationFunctionNames_` | No | No | No | No | No | No | No | Yes | Yes | No | Yes | No | No |
| `getRequiredTimingFunctionNames_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `getRequiredFrameworkDashboardFunctionNames_` | No | No | No | No | No | Yes | No | No | Yes | No | Yes | No | Yes |
| `runWorkflowSyncVerification` | No | No | No | No | No | No | Yes | No | Yes | No | Yes | No | No |
| `runDashboardQualityWorkflowSyncVerification_` | No | No | No | No | No | No | Yes | No | Yes | No | Yes | No | Yes |
| `setupSystemSheets` | No | No | No | No | No | No | No | No | No | No | No | No | No |
| `verifyFrameworkConfiguration` | Yes | No | No | No | No | Yes | No | No | Yes | Yes | Yes | No | Yes |

### FRAMEWORK AND TIMING FUNCTIONS

| Function | Reads Worksheets | Writes Worksheets | Creates Worksheets | Deletes Worksheets | Archives Worksheets | Formats Worksheets | Synchronizes Data | Uses Templates | Uses Dashboard | Uses Format Dashboard | Uses Validation | Uses Cache | Uses Timing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `runFrameworkTimed_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `startFrameworkTiming_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `markFrameworkStep_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `writeFrameworkTimingReport_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `writeFrameworkTimingReportBestEffort_` | No | No | No | No | No | No | No | No | No | No | Yes | No | Yes |
| `writeTimingReport_` | No | No | No | No | No | No | No | No | No | No | No | No | Yes |
| `trimTimingReportRows_` | Yes | Yes | No | Yes | No | No | No | No | No | No | Yes | No | Yes |
| `rebuildProductionMonthlyChangeTemplate` | Yes | Yes | Yes | Yes | No | Yes | No | Yes | Yes | Yes | No | No | No |
