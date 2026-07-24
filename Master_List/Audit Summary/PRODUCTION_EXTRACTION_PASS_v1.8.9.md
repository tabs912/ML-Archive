# v1.8.9 Production Extraction Pass

Source: `Master_List/Current Production Script/v1.8.9_Current_Production`

Purpose: direct extraction of governing configuration, dashboard defaults, sheet definitions, headers, tab organization, Dashboard Quality sections, template definitions, public functions, document properties, and workflow order from production v1.8.9.

## Extraction Summary

- Production version: `1.8.9`.
- Source line count: `15871`.
- Top-level functions: `679` (`64` public/menu-compatible, `615` private helpers by trailing underscore convention).
- Dashboard sheet definitions: `8`.
- Header-governed sheet types: `8`.
- Dashboard Quality sections: `18`.

## Constants and Runtime Configuration

| Line | Constant / Flag |
|---:|---|
| 5 | `const MASTER_LIST_MERGE_ML_VERSION = "1.8.9";` |
| 7 | `const MASTER_LIST_MERGE_REBUILD_SECTION = "FULL_SCRIPT";` |
| 9 | `const MASTER_LIST_MERGE_BASELINE_VERSION = "1.6.22.3";` |
| 12 | `let ML_RUNTIME_CACHE_STORE_ = null;` |
| 33 | `let RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = false;` |
| 35 | `const RFF_VERSION = MASTER_LIST_MERGE_ML_VERSION;` |
| 37 | `const RFF_TIMING_MAX_ROWS = 5000;` |
| 39 | `const RFF_TIMING_SUMMARY_LOOKBACK_ROWS = 750;` |
| 41 | `const RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS = 1000;` |
| 43 | `const RFF_USE_TEMPLATE_SIGNATURE_CACHE = true;` |
| 45 | `const RFF_TRUE_SMART_TEMPLATE_REFRESH = true;` |
| 47 | `const RFF_SMART_TEMPLATE_REFRESH = true;` |
| 49 | `const RFF_FORCE_FULL_TEMPLATE_REBUILD = false;` |
| 51 | `const RFF_TEMPLATE_STAGED_BUILD_ENABLED = false;` |
| 53 | `const RFF_TEMPLATE_STAGED_FIRST_BUILD_FOR_HIGH_RISK_ONLY = false;` |
| 55 | `const RFF_FAST_TEMPLATE_REFRESH = true;` |
| 57 | `const RFF_TEMPLATE_RESIZE_EXEMPT_TEMPLATE_NAMES = [];` |
| 59 | `const RFF_TEMPLATE_ALWAYS_STAGED_TEMPLATE_NAMES = [];` |
| 61 | `const RFF_BASE_TEMPLATE_NAME = "RFF_BASE_TEMPLATE";` |
| 64 | `const RFF_FORMATTER_DATE_PROMPT = "Enter any date in the report month. Example: 05/01/26";` |
| 66 | `const RFF_DASHBOARD_CONFIG_MAX_READ_COLS = 13;` |
| 68 | `const RFF_ARCHIVE_SPREADSHEET_ID = "1PEEoXzPG-xRFuqDW_ZjPzyqdTUd_5AOwx0nbbzmMwBc";` |
| 95 | `const RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA = true;` |
| 97 | `const RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE = true;` |
| 99 | `const ML_WORKFLOW_BUSY_KEY = "ML_WORKFLOW_BUSY";` |
| 101 | `const ML_WORKFLOW_BUSY_STARTED_KEY = "ML_WORKFLOW_BUSY_STARTED";` |
| 103 | `const ML_INDEX_REFRESH_DEFERRED_KEY = "ML_INDEX_REFRESH_DEFERRED";` |
| 105 | `const ML_WORKFLOW_BUSY_TTL_MS = 30 * 60 * 1000;` |
| 107 | `const RFF_TEMPLATE_FIRST_BUILD_SHRINK_TO_TARGET = false;` |
| 109 | `const RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING = true;` |
| 111 | `const RFF_SKIP_DUPLICATE_TEMPLATE_FORMAT_ENFORCEMENT = false;` |
| 113 | `const RFF_TEMPLATE_SIGNATURE_MAX_CHARS = 8500;` |
| 116 | `const HEADER_ROW = 4;` |
| 118 | `const DATA_START_ROW = 5;` |
| 120 | `const RFF_MIN_SERIAL_DATE = 30000;` |
| 122 | `const RFF_EXCEL_EPOCH_YEAR = 1899;` |
| 124 | `const RFF_EXCEL_EPOCH_MONTH = 11;` |
| 126 | `const RFF_EXCEL_EPOCH_DAY = 30;` |
| 129 | `const FORMAT_ALLOWED_EMPTY_COLUMNS = 2;` |
| 131 | `const FORMAT_DELETE_BLANK_ROWS_AFTER = 400;` |
| 134 | `const SHEET_TYPE = Object.freeze({` |
| 145 | `const SHEET_BASE_COLORS = {` |
| 156 | `const MASTER_LIST_ADDED_HEADERS = [` |
| 161 | `const MASTER_LIST_PREFIX = "Master List";` |
| 163 | `const DEMO_P_PREFIX = "Demo P";` |
| 165 | `const BANNER_PREFIX = "Banners";` |
| 167 | `const BANNER_REPORT_ALT_PREFIX = "Banner Report";` |
| 169 | `const UNLOCKED_PREFIX = "Unlock CP";` |
| 171 | `const CARE_PLAN_DUE_PREFIX = "CP Due";` |
| 173 | `const CARE_PLAN_DUE_DATE_ALT_PREFIX = "Care Plan Due Date Report";` |
| 175 | `const MONTHLY_CHANGE_REPORT_PREFIX = "Monthly Change";` |
| 177 | `const DISENROLLED_EXCLUSION_SHEET = "Disenrolled Exclusion";` |
| 179 | `const DEMO_P_ARCHIVE_SHEET = "Archive - Demo P";` |
| 181 | `const DISENROLLED_EXCLUSION_ADDED_HEADER = "Added to Disenrolled Exclusion";` |
| 183 | `const INDEX_SHEET = "Index";` |
| 185 | `const SHEET_TAB_ORDER = [` |
| 197 | `const INDEX_HEADERS = [` |
| 204 | `const INDEX_HEADER_ROW_COUNT = 4;` |
| 206 | `const INDEX_DATA_START_ROW = 5;` |
| 208 | `const INDEX_BUFFER_COLUMN = 5;` |
| 210 | `const INDEX_TOTAL_COLUMNS = 9;` |
| 212 | `const INDEX_FIXED_ROW_COUNT = 100;` |
| 214 | `const MASTER_LIST_TEMPLATE_SHEET = "Template - Master List";` |
| 216 | `const DEMO_P_TEMPLATE_SHEET = "Template - Demo P";` |
| 218 | `const SYSTEM_SHEETS_TO_HIDE = Object.freeze([` |
| 224 | `const DATE_DISPLAY_FORMAT = "mm/dd/yyyy";` |
| 226 | `const DATE_SHEET_FORMAT = "MM.yy";` |
| 229 | `const GLOBAL_DATE_FORMAT_HEADERS = Object.freeze([` |
| 249 | `const TITLE_INFO_MOVE_CELLS = Object.freeze({` |
| 2776 | `const ML_MENU_CALLBACKS = Object.freeze({` |
| 3309 | `const RFF_DASHBOARD_SHEET = "Format Dashboard";` |
| 3311 | `const RFF_VALIDATION_SHEET = "Dashboard Quality Report";` |
| 3313 | `const RFF_DASHBOARD_QUALITY_SHEET = RFF_VALIDATION_SHEET;` |
| 3315 | `const RFF_TIMING_SHEET = "Framework Timing Report";` |
| 3317 | `const RFF_FRAMEWORK_TIMING_SHEET = RFF_TIMING_SHEET;` |
| 3319 | `const RFF_TIMING_SUMMARY_SHEET = RFF_TIMING_SHEET;` |
| 3321 | `const RFF_TEST_DASHBOARD_SHEET = "Dashboard Quality Report";` |
| 3323 | `const RFF_HEALTH_CHECK_SHEET = "Framework Health Check";` |
| 3325 | `const RFF_SECTION_GLOBAL = "SECTION A - GLOBAL SETTINGS";` |
| 3327 | `const RFF_SECTION_TITLE_ROWS = "SECTION B - TITLE ROWS";` |
| 3329 | `const RFF_SECTION_SHEETS = "SECTION C - SHEET DEFINITIONS";` |
| 3331 | `const RFF_SECTION_BEHAVIORS = "SECTION D - SHEET BEHAVIORS";` |
| 3333 | `const RFF_SECTION_SYSTEM_SURFACES = "SECTION E - SYSTEM SHEET SURFACES";` |
| 3335 | `const RFF_SECTION_TAB_ORGANIZATION = "SECTION F - TAB ORGANIZATION & INDEX";` |
| 3337 | `const RFF_SECTION_COLUMNS = "SECTION G - COLUMN DEFINITIONS";` |
| 3339 | `const RFF_SECTION_HEADERS = "SECTION H - SHEET HEADERS";` |
| 3341 | `let RFF_LAST_TEMPLATE_REFRESH_MODE_ = "";` |
| 3343 | `const RFF_DEFAULTS = {` |
| 3371 | `const RFF_SHEET_TYPES = {` |
| 3382 | `const RFF_MONTHLY_CHANGE_SUBSECTIONS = [` |
| 7647 | `const ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_ = {` |
| 8811 | `const DEMO_P_RAW_HEADERS = [` |
| 8861 | `const DEMO_P_OPTIONAL_SYNC_HEADERS = [` |
| 8902 | `const DEMO_P_FORMAT_HEADERS = DEMO_P_RAW_HEADERS.concat(DEMO_P_OPTIONAL_SYNC_HEADERS);` |
| 8904 | `const DEMO_P_TEMPLATE_DATE_HEADERS = GLOBAL_DATE_FORMAT_HEADERS.slice();` |
| 8906 | `const DEMO_P_BANNER_SYNC_HEADERS = [` |
| 10073 | `const BANNER_SYNC_FIELDS = [` |
| 10082 | `const UNLOCKED_SYNC_FIELDS = [` |
| 10088 | `const CARE_PLAN_DUE_SYNC_FIELDS = [` |
| 13051 | `const CHANGE_SECTION_ENROLLMENTS = "Enrollments";` |
| 13053 | `const CHANGE_SECTION_DISENROLLMENTS = "Disenrollments";` |
| 13055 | `const CHANGE_SECTION_DEMOGRAPHIC = "Demographic Changes";` |
| 13057 | `const CHANGE_SECTION_CASELOAD = "Caseload Changes";` |
| 13059 | `const CHANGE_SECTION_CONTACT = "Contact Changes";` |
| 13061 | `const MCR_OUTPUT_HEADERS = [` |
| 13075 | `const RAW_DEMO_P_DEMOGRAPHIC_FIELDS = [` |
| 13093 | `const RAW_DEMO_P_CONTACT_FIELDS = [` |
| 13112 | `const RAW_DEMO_P_CASELOAD_FIELDS = [` |
| 13124 | `const RAW_DEMO_P_BANNER_FIELDS = [` |
| 13133 | `const RAW_DEMO_P_ENROLLMENT_FIELDS = [` |
| 13138 | `const RAW_DEMO_P_DISENROLLMENT_FIELDS = [` |
| 14263 | `const RFF_MASTER_LIST_HEALTH_KEY = "Master List Validation";` |
| 14265 | `const RFF_CP_SYNC_DIAGNOSTICS_KEY = "Care Plan Sync Validation";` |
| 14267 | `const RFF_WORKFLOW_SYNC_VERIFICATION_KEY = "Workflow & Synchronization Verification";` |
| 14269 | `const RFF_PERFORMANCE_SUMMARY_KEY = "Performance Summary";` |
| 14271 | `const RFF_SYSTEM_SHEET_VERIFICATION_KEY = "System Sheet Verification";` |
| 14273 | `const RFF_DASHBOARD_VERIFY_GLOBAL_KEY = "Format Dashboard Global Inputs";` |
| 14275 | `const RFF_DASHBOARD_VERIFY_SHEETS_KEY = "Format Dashboard Sheet Definitions";` |
| 14277 | `const RFF_DASHBOARD_VERIFY_HEADERS_KEY = "Format Dashboard Sheet Headers";` |
| 14279 | `const RFF_DASHBOARD_VERIFY_COLUMNS_KEY = "Format Dashboard Column Definitions";` |
| 14281 | `const RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY = "Format Dashboard Sheet Behaviors";` |
| 14283 | `const RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY = "Format Dashboard Tab Organization";` |
| 14285 | `const RFF_DASHBOARD_CHANGELOG_KEY = "Format Dashboard Changelog";` |
| 14287 | `const RFF_DEMO_P_PROCESSING_VALIDATION_KEY = "Demo P Processing Validation";` |
| 14289 | `const RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY = "Disenrolled Exclusion Validation";` |
| 14291 | `const RFF_MONTHLY_CHANGE_VALIDATION_KEY = "Monthly Change Validation";` |
| 14293 | `const RFF_DASHBOARD_QUALITY_SECTIONS = [` |
| 14314 | `const RFF_DASHBOARD_QUALITY_COL_WIDTHS = [250, 325, 225, 200, 150, 100, null];` |
| 14316 | `const RFF_DASHBOARD_QUALITY_WRAP_COLUMNS = [2, 3, 4, 5, 6, 7];` |
| 14318 | `const RFF_SYSTEM_SHEET_TITLE_COLOR = "#79b5d2";` |
| 14320 | `const RFF_SYSTEM_SHEET_SECTION_COLOR = "#9fcadf";` |
| 14322 | `const RFF_SYSTEM_SHEET_SUBHEADER_COLOR = "#c6dfec";` |
| 14324 | `const RFF_SYSTEM_SHEET_BORDER_COLOR = "#cccccc";` |
| 14327 | `const RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS = 5;` |
| 14329 | `let RFF_DASHBOARD_QUALITY_DEFER_WRITES_ = false;` |
| 14330 | `let ML_DASHBOARD_QUALITY_STAGED_BUFFERS_ = {};` |
| 14817 | `const RFF_QA_SECTION_PROP_PREFIX = "MLF_QA_SECTION_";` |

## Dashboard Defaults

| Setting | Value |
|---|---:|
| Header Row | `4` |
| Data Start Row | `5` |
| Freeze Rows | `4` |
| Freeze Columns | `2` |
| Row 1 Height | `25` |
| Row 2 Height | `20` |
| Row 3 Height | `10` |
| Header Row Height | `40` |
| Default Data Row Height | `25` |
| Default Column Width | `105` |
| Default Date Format | `mm/dd/yyyy` |
| Default Number Format | `General` |
| Default Text Format | `@` |
| Default Data Wrap | `OVERFLOW` |
| Default Horizontal Alignment | `left` |
| Default Vertical Alignment | `middle` |
| Standard Font | `Arial` |
| Standard Font Size | `10` |
| Standard Font Color | `#000000` |
| Title Font Size | `14` |
| Title Info Font Size | `5` |
| HSL Level 1 Lightness % | `60` |
| HSL Level 2 Lightness % | `75` |
| HSL Level 3 Lightness % | `85` |
| HSL Level 4 Lightness % | `97` |
| Global Border Color | `#CCCCCC` |
| Global Border Style | `SOLID` |
| Template Version | `1.8.9` |

## Sheet Definitions and Template Defaults

| Sheet Type | Report Title | Template | Output Naming | Tab Color | Date Source | Columns | Resize | Rows | Row Height |
|---|---|---|---|---|---|---:|---|---:|---:|
| `Banners` | `Banner Report` | `Template - Banner Report` | `Banners mm.yy` | `#65A9CC` | `True` | `Last Day of Prompt Month` | `100` | `9` | `FIXED` | `100` |
| `CP Due Date` | `Care Plan Due Date Report` | `Template - Care Plan Due` | `CP Due mm.yy` | `#65CC99` | `True` | `Pulled From Spreadsheet` | `100` | `5` | `FIXED` | `100` |
| `Unlock CP` | `Unlocked Care Plan Report` | `Template - Unlocked Care Plan` | `Unlock CP mm.yy` | `#65CCC3` | `True` | `Pulled From Spreadsheet` | `100` | `4` | `FIXED` | `100` |
| `Raw Data` | `Raw Data` | `Template - Raw Data` | `Raw Data mm.yy` | `#657FCC` | `True` | `Last Day of Prompt Month` | `100` | `54` | `FIXED` | `100` |
| `Demo P` | `Demo P` | `Template - Demo P` | `Demo P` | `#657FCC` | `True` | `Last Day of Prompt Month` | `100` | `80` | `FIXED` | `100` |
| `Disenrolled Exclusion` | `Disenrolled Exclusion` | `Template - Disenrolled Exclusion` | `Disenrolled` | `#CC65A1` | `True` | `Last Day of Prompt Month` | `100` | `66` | `FIXED` | `100` |
| `Master List` | `Master List` | `Template - Master List` | `Master List mm.yy` | `#7665CC` | `True` | `Last Day of Prompt Month` | `100` | `37` | `FIXED` | `100` |
| `Monthly Change` | `Monthly Change Report` | `Template - Monthly Change` | `Monthly Change mm.yy` | `#A165CC` | `True` | `Last Day of Prompt Month` | `100` | `54` | `FIXED` | `100` |

## Sheet Behaviors

| Sheet Type | Create | Format | Date Format | Monthly Archive | Hide Output | Visibility |
|---|---:|---:|---:|---:|---:|---|
| Banners | True | True | True | False | True | HIDDEN |
| CP Due Date | True | True | True | False | True | HIDDEN |
| Unlock CP | True | True | True | False | True | HIDDEN |
| Raw Data | True | True | True | False | True | HIDDEN |
| Demo P | True | True | True | False | True | VISIBLE |
| Disenrolled Exclusion | True | True | True | False | True | VISIBLE |
| Master List | True | True | True | False | True | VISIBLE |
| Monthly Change | True | True | False | True | True | VISIBLE |

## Tab Organization

| Sheet/Prefix | Category | Rank | Notes |
|---|---|---:|---|
| Index | System & Configuration | 1 |  |
| Demo P | Core Operational | 2 |  |
| Disenrolled Exclusion | Core Operational | 10 |  |
| Master List | Monthly Active | 21 | Dynamic Ranking |
| Monthly Change | Monthly Active | 22 | Dynamic Ranking |
| Raw Data | Monthly Active | 23 | Dynamic Ranking |
| Banners | Monthly Sub-Reports | 24 | Dynamic Ranking |
| CP Due | Monthly Sub-Reports | 25 | Dynamic Ranking |
| Unlock CP | Monthly Sub-Reports | 26 | Dynamic Ranking |
| Source - Banners | Source Data | 27 | Dynamic Ranking |
| Source - Raw Data | Source Data | 28 | Dynamic Ranking |
| Source - CP Due | Source Data | 29 | Dynamic Ranking |
| Source - Unlocked CP | Source Data | 30 | Dynamic Ranking |
| B | Unformatted | 300 |  |
| CD | Unformatted | 301 |  |
| UC | Unformatted | 302 |  |
| RD | Unformatted | 303 |  |
| Archive - Demo P | Core Operational | 350 |  |
| Framework Timing Report | System & Configuration | 500 |  |
| Dashboard Quality Report | System & Configuration | 501 |  |
| Format Dashboard | System & Configuration | 502 |  |
| Template - Banner Report | Template | 801 |  |
| Template - Care Plan Due | Template | 802 |  |
| Template - Unlocked Care Plan | Template | 803 |  |
| Template - Raw Data | Template | 804 |  |
| Template - Demo P | Template | 805 |  |
| Template - Disenrolled Exclusion | Template | 806 |  |
| Template - Master List | Template | 807 |  |
| Template - Monthly Change | Template | 808 |  |
| RFF_BASE_TEMPLATE | System & Configuration | 809 |  |

## System Sheet Surfaces

| Sheet | Title | Rank | Visibility | Tab Color | Font Color | Indexed | Notes |
|---|---|---:|---|---|---|---:|---|
| Framework Timing Report | Framework Timing Report | 500 | VISIBLE | #79b5d2 | #000000 | True | Unified timing report surface |
| Dashboard Quality Report | Dashboard Quality Report | 501 | VISIBLE | #79b5d2 | #000000 | True | Unified quality report surface |
| Format Dashboard | Format Dashboard | 502 | VISIBLE | #79b5d2 | #000000 | True | Dashboard configuration surface |
| Archive - Demo P | Archive - Demo P | 350 | HIDDEN | #657FCC | #000000 | True | Hidden Demo P row archive |
| RFF_BASE_TEMPLATE | RFF_BASE_TEMPLATE | 809 | HIDDEN | #79b5d2 | #000000 | True | Hidden framework base template |

## Dashboard Quality Sections

| Order | Key | Title |
|---:|---|---|
| 1 | `Format Dashboard Global Inputs` | SECTION A - GLOBAL INPUTS VERIFICATION |
| 2 | `Format Dashboard Sheet Definitions` | SECTION B - SHEET DEFINITIONS VERIFICATION |
| 3 | `Format Dashboard Sheet Behaviors` | SECTION C - SHEET BEHAVIOR VERIFICATION |
| 4 | `Format Dashboard Column Definitions` | SECTION D - COLUMN DEFINITIONS VERIFICATION |
| 5 | `Format Dashboard Sheet Headers` | SECTION E - SHEET HEADERS VERIFICATION |
| 6 | `Format Dashboard Tab Organization` | SECTION F - TAB ORGANIZATION & INDEX VERIFICATION |
| 7 | `Dashboard Quality Report` | SECTION G - TEMPLATE STRUCTURE & VALIDATION |
| 8 | `Format Dashboard Changelog` | SECTION H - FORMAT DASHBOARD CHANGELOG |
| 9 | `Framework Health Check` | SECTION I - FRAMEWORK HEALTH CHECK |
| 10 | `Performance Summary` | SECTION J - PERFORMANCE SUMMARY |
| 11 | `Master List Validation` | SECTION K - RAW DATA VALIDATION |
| 12 | `Care Plan Sync Validation` | SECTION L - CARE PLAN SYNC VALIDATION |
| 13 | `Workflow & Synchronization Verification` | SECTION M - WORKFLOW & SYNCHRONIZATION VERIFICATION |
| 14 | `Demo P Processing Validation` | SECTION N - DEMO P QUALITY VALIDATION |
| 15 | `Disenrolled Exclusion Validation` | SECTION O - DISENROLLED EXCLUSION VALIDATION |
| 16 | `Monthly Change Validation` | SECTION P - MONTHLY CHANGE VALIDATION |
| 17 | `Summary` | SECTION Q - SUMMARY |
| 18 | `Signoff` | SECTION R - SIGNOFF |

## Header Definitions

### Banners (9 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Last Name | Primary Data |
| 2 | First Name | Primary Data |
| 3 | Participant PMR# | Primary Data |
| 4 | Safety - 2 Person | Primary Data |
| 5 | Wanderer | Primary Data |
| 6 | Interpreter Needed | Primary Data |
| 7 | Fall Risk | Primary Data |
| 8 | DPOA or Guardian Active | Primary Data |
| 9 | Palliative Care | Primary Data |

### CP Due Date (5 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Participant Name | Primary Data |
| 2 | Enrollment Date | Primary Data |
| 3 | Last Care Plan | Primary Data |
| 4 | Next Care Plan Due | Primary Data |
| 5 | CP Type | Primary Data |

### Unlock CP (4 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Participant Name | Primary Data |
| 2 | PMR # | Primary Data |
| 3 | IDT Meeting Date | Primary Data |
| 4 | Care Plan Start Date | Primary Data |

### Raw Data (54 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Last Name | Unformatted Data |
| 2 | First Name | Unformatted Data |
| 3 | Preferred Name | Unformatted Data |
| 4 | Date of Birth | Unformatted Data |
| 5 | Participant PMR# | Unformatted Data |
| 6 | Phone Number | Unformatted Data |
| 7 | Address Line 1 | Unformatted Data |
| 8 | Address Line 2 | Unformatted Data |
| 9 | City | Unformatted Data |
| 10 | State | Unformatted Data |
| 11 | Zip | Unformatted Data |
| 12 | Oxygen | Unformatted Data |
| 13 | Primary Language | Unformatted Data |
| 14 | Residence Type | Unformatted Data |
| 15 | Contact - Last Name | Unformatted Data |
| 16 | Contact - First Name | Unformatted Data |
| 17 | Type of Contact | Unformatted Data |
| 18 | Contact - Primary Language | Unformatted Data |
| 19 | Relationship | Unformatted Data |
| 20 | AD1 - Phone | Unformatted Data |
| 21 | AD1 - Phone Valid Dates From | Unformatted Data |
| 22 | AD1 - Phone Valid Dates To | Unformatted Data |
| 23 | AD2 - Phone | Unformatted Data |
| 24 | AD2 - Phone Valid Dates From | Unformatted Data |
| 25 | AD2 - Phone Valid Dates To | Unformatted Data |
| 26 | AD3 - Phone | Unformatted Data |
| 27 | AD3 - Phone Valid Dates From | Unformatted Data |
| 28 | AD3 - Phone Valid Dates To | Unformatted Data |
| 29 | Company | Unformatted Data |
| 30 | Contact - Notes | Unformatted Data |
| 31 | Capitation Date | Unformatted Data |
| 32 | Enrollment Status | Unformatted Data |
| 33 | Disenrollment Date | Unformatted Data |
| 34 | Disenrollment Effective Date | Unformatted Data |
| 35 | Disenrollment Reason | Unformatted Data |
| 36 | Date of Death | Unformatted Data |
| 37 | Caseload - Social Work | Unformatted Data |
| 38 | Caseload - RN | Unformatted Data |
| 39 | Caseload - PCP | Unformatted Data |
| 40 | Caseload - HCC | Unformatted Data |
| 41 | Caseload - Activities | Unformatted Data |
| 42 | Caseload - OT | Unformatted Data |
| 43 | Caseload - PT | Unformatted Data |
| 44 | Caseload - RD | Unformatted Data |
| 45 | Caseload - Supervising MD | Unformatted Data |
| 46 | Additional Important Information | Unformatted Data |
| 47 | Notes | Unformatted Data |
| 48 | Safety - 2 Person | Banners |
| 49 | Wanderer | Banners |
| 50 | Interpreter Needed | Banners |
| 51 | Fall Risk | Banners |
| 52 | DPOA or Guardian Active | Banners |
| 53 | Palliative Care | Banners |
| 54 | Primary PMR Row | Format Raw Data |

### Demo P (80 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Last Name | Raw Data |
| 2 | First Name | Raw Data |
| 3 | Preferred Name | Raw Data |
| 4 | Date of Birth | Raw Data |
| 5 | Participant PMR# | Raw Data |
| 6 | Phone Number | Raw Data |
| 7 | Address Line 1 | Raw Data |
| 8 | Address Line 2 | Raw Data |
| 9 | City | Raw Data |
| 10 | State | Raw Data |
| 11 | Zip | Raw Data |
| 12 | Oxygen | Raw Data |
| 13 | Primary Language | Raw Data |
| 14 | Residence Type | Raw Data |
| 15 | Contact - Last Name | Raw Data |
| 16 | Contact - First Name | Raw Data |
| 17 | Type of Contact | Raw Data |
| 18 | Contact - Primary Language | Raw Data |
| 19 | Relationship | Raw Data |
| 20 | AD1 - Phone | Raw Data |
| 21 | AD1 - Phone Valid Dates From | Raw Data |
| 22 | AD1 - Phone Valid Dates To | Raw Data |
| 23 | AD2 - Phone | Raw Data |
| 24 | AD2 - Phone Valid Dates From | Raw Data |
| 25 | AD2 - Phone Valid Dates To | Raw Data |
| 26 | AD3 - Phone | Raw Data |
| 27 | AD3 - Phone Valid Dates From | Raw Data |
| 28 | AD3 - Phone Valid Dates To | Raw Data |
| 29 | Company | Raw Data |
| 30 | Contact - Notes | Raw Data |
| 31 | Capitation Date | Raw Data |
| 32 | Enrollment Status | Raw Data |
| 33 | Disenrollment Date | Raw Data |
| 34 | Disenrollment Effective Date | Raw Data |
| 35 | Disenrollment Reason | Raw Data |
| 36 | Date of Death | Raw Data |
| 37 | Caseload - Social Work | Raw Data |
| 38 | Caseload - RN | Raw Data |
| 39 | Caseload - PCP | Raw Data |
| 40 | Caseload - HCC | Raw Data |
| 41 | Caseload - Activities | Raw Data |
| 42 | Caseload - OT | Raw Data |
| 43 | Caseload - PT | Raw Data |
| 44 | Caseload - RD | Raw Data |
| 45 | Caseload - Supervising MD | Raw Data |
| 46 | Additional Important Information | Raw Data |
| 47 | Safety - 2 Person | Raw Data |
| 48 | Wanderer | Raw Data |
| 49 | Interpreter Needed | Raw Data |
| 50 | Fall Risk | Raw Data |
| 51 | DPOA or Guardian Active | Raw Data |
| 52 | Palliative Care | Raw Data |
| 53 | Primary PMR Row | Demo P process |
| 54 | Banner Summary | Demo P process |
| 55 | Phone 1 - Label | Demo P process |
| 56 | Phone 1 - Value | Demo P process |
| 57 | Phone 2 - Label | Demo P process |
| 58 | Phone 2 - Value | Demo P process |
| 59 | Phone 3 - Label | Demo P process |
| 60 | Phone 3 - Value | Demo P process |
| 61 | Phone 4 - Label | Demo P process |
| 62 | Phone 4 - Value | Demo P process |
| 63 | Address 1 - Street | Demo P process |
| 64 | Custom Field 1 - Label | Demo P process |
| 65 | Custom Field 1 - Value | Demo P process |
| 66 | Notes | Demo P process |
| 67 | Contact - 1 | Demo P process |
| 68 | Contact - 2 | Demo P process |
| 69 | Contact - 3 | Demo P process |
| 70 | Contact - 4 | Demo P process |
| 71 | Contact - 5 | Demo P process |
| 72 | Contact - 6 | Demo P process |
| 73 | Contact - 7 | Demo P process |
| 74 | Contact - 8 | Demo P process |
| 75 | Contact - Summary | Demo P process |
| 76 | Participant Name | Demo P process |
| 77 | Name | Demo P process |
| 78 | Demo P Update Status | Demo P process |
| 79 | Demo P Update Month | Demo P process |
| 80 | Demo P Source Sheet | Demo P process |

### Disenrolled Exclusion (66 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Participant Name | Demo P |
| 2 | Name | Demo P |
| 3 | Preferred Name | Demo P |
| 4 | Date of Birth | Demo P |
| 5 | Address 1 - Street | Demo P |
| 6 | City | Demo P |
| 7 | State | Demo P |
| 8 | Zip | Demo P |
| 9 | Phone 1 - Value | Demo P |
| 10 | Phone 2 - Value | Demo P |
| 11 | Participant PMR# | Demo P |
| 12 | Primary Language | Demo P |
| 13 | Residence Type | Demo P |
| 14 | Notes | Demo P |
| 15 | IDT Meeting Date | Demo P |
| 16 | Care Plan Start Date | Demo P |
| 17 | Enrollment Date | Demo P |
| 18 | Last Care Plan | Demo P |
| 19 | Next Care Plan Due | Demo P |
| 20 | CP Type | Demo P |
| 21 | Oxygen | Demo P |
| 22 | Caseload - Social Work | Demo P |
| 23 | Caseload - RN | Demo P |
| 24 | Caseload - PCP | Demo P |
| 25 | Caseload - HCC | Demo P |
| 26 | Caseload - Activities | Demo P |
| 27 | Caseload - OT | Demo P |
| 28 | Caseload - PT | Demo P |
| 29 | Caseload - RD | Demo P |
| 30 | Caseload - Supervising MD | Demo P |
| 31 | Capitation Date | Demo P |
| 32 | Enrollment Status | Demo P |
| 33 | Disenrollment Date | Demo P |
| 34 | Disenrollment Effective Date | Demo P |
| 35 | Disenrollment Reason | Demo P |
| 36 | Date of Death | Demo P |
| 37 | Contact - Last Name | Demo P |
| 38 | Contact - First Name | Demo P |
| 39 | Type of Contact | Demo P |
| 40 | Contact - Primary Language | Demo P |
| 41 | Relationship | Demo P |
| 42 | AD1 - Phone | Demo P |
| 43 | AD1 - Phone Valid Dates From | Demo P |
| 44 | AD1 - Phone Valid Dates To | Demo P |
| 45 | AD2 - Phone | Demo P |
| 46 | AD2 - Phone Valid Dates From | Demo P |
| 47 | AD2 - Phone Valid Dates To | Demo P |
| 48 | AD3 - Phone | Demo P |
| 49 | AD3 - Phone Valid Dates From | Demo P |
| 50 | AD3 - Phone Valid Dates To | Demo P |
| 51 | Company | Demo P |
| 52 | Contact - Notes | Demo P |
| 53 | Safety - 2 Person | Demo P |
| 54 | Wanderer | Demo P |
| 55 | Interpreter Needed | Demo P |
| 56 | Fall Risk | Demo P |
| 57 | DPOA or Guardian Active | Demo P |
| 58 | Palliative Care | Demo P |
| 59 | Last Name | Demo P |
| 60 | First Name | Demo P |
| 61 | Phone Number | Demo P |
| 62 | Address Line 1 | Demo P |
| 63 | Address Line 2 | Demo P |
| 64 | Additional Important Information | Demo P |
| 65 | Added to Disenrolled Exclusion | Framework audit |
| 66 | PMR # | Demo P |

### Master List (37 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Participant Name | Demo P |
| 2 | Name | Demo P |
| 3 | Preferred Name | Demo P |
| 4 | Date of Birth | Demo P |
| 5 | Address 1 - Street | Demo P |
| 6 | City | Demo P |
| 7 | State | Demo P |
| 8 | Zip | Demo P |
| 9 | Phone 1 - Value | Demo P |
| 10 | Phone 2 - Value | Demo P |
| 11 | Participant PMR# | Demo P |
| 12 | Primary Language | Demo P |
| 13 | Residence Type | Demo P |
| 14 | Notes | Demo P |
| 15 | IDT Meeting Date | Demo P |
| 16 | Care Plan Start Date | Demo P |
| 17 | Enrollment Date | Demo P |
| 18 | Last Care Plan | Demo P |
| 19 | Next Care Plan Due | Demo P |
| 20 | CP Type | Demo P |
| 21 | Completed | Demo P |
| 22 | Face Sheet | Demo P |
| 23 | HHA | Demo P |
| 24 | Oxygen | Demo P |
| 25 | Equipment | Demo P |
| 26 | Caseload - Social Work | Demo P |
| 27 | Caseload - RN | Demo P |
| 28 | Caseload - PCP | Demo P |
| 29 | Caseload - HCC | Demo P |
| 30 | Caseload - Activities | Demo P |
| 31 | Caseload - OT | Demo P |
| 32 | Caseload - PT | Demo P |
| 33 | Caseload - RD | Demo P |
| 34 | Caseload - Supervising MD | Demo P |
| 35 | Capitation Date | Demo P |
| 36 | Enrollment Status | Demo P |
| 37 | Primary PMR Row | Demo P |

### Monthly Change (54 columns)
| # | Header | Source |
|---:|---|---|
| 1 | Last Name | Populates via process Compare Raw Data to Raw Data |
| 2 | First Name | Populates via process Compare Raw Data to Raw Data |
| 3 | Preferred Name | Populates via process Compare Raw Data to Raw Data |
| 4 | Date of Birth | Populates via process Compare Raw Data to Raw Data |
| 5 | Participant PMR# | Populates via process Compare Raw Data to Raw Data |
| 6 | Phone Number | Populates via process Compare Raw Data to Raw Data |
| 7 | Address Line 1 | Populates via process Compare Raw Data to Raw Data |
| 8 | Address Line 2 | Populates via process Compare Raw Data to Raw Data |
| 9 | City | Populates via process Compare Raw Data to Raw Data |
| 10 | State | Populates via process Compare Raw Data to Raw Data |
| 11 | Zip | Populates via process Compare Raw Data to Raw Data |
| 12 | Oxygen | Populates via process Compare Raw Data to Raw Data |
| 13 | Primary Language | Populates via process Compare Raw Data to Raw Data |
| 14 | Residence Type | Populates via process Compare Raw Data to Raw Data |
| 15 | Contact - Last Name | Populates via process Compare Raw Data to Raw Data |
| 16 | Contact - First Name | Populates via process Compare Raw Data to Raw Data |
| 17 | Type of Contact | Populates via process Compare Raw Data to Raw Data |
| 18 | Contact - Primary Language | Populates via process Compare Raw Data to Raw Data |
| 19 | Relationship | Populates via process Compare Raw Data to Raw Data |
| 20 | AD1 - Phone | Populates via process Compare Raw Data to Raw Data |
| 21 | AD1 - Phone Valid Dates From | Populates via process Compare Raw Data to Raw Data |
| 22 | AD1 - Phone Valid Dates To | Populates via process Compare Raw Data to Raw Data |
| 23 | AD2 - Phone | Populates via process Compare Raw Data to Raw Data |
| 24 | AD2 - Phone Valid Dates From | Populates via process Compare Raw Data to Raw Data |
| 25 | AD2 - Phone Valid Dates To | Populates via process Compare Raw Data to Raw Data |
| 26 | AD3 - Phone | Populates via process Compare Raw Data to Raw Data |
| 27 | AD3 - Phone Valid Dates From | Populates via process Compare Raw Data to Raw Data |
| 28 | AD3 - Phone Valid Dates To | Populates via process Compare Raw Data to Raw Data |
| 29 | Company | Populates via process Compare Raw Data to Raw Data |
| 30 | Contact - Notes | Populates via process Compare Raw Data to Raw Data |
| 31 | Capitation Date | Populates via process Compare Raw Data to Raw Data |
| 32 | Enrollment Status | Populates via process Compare Raw Data to Raw Data |
| 33 | Disenrollment Date | Populates via process Compare Raw Data to Raw Data |
| 34 | Disenrollment Effective Date | Populates via process Compare Raw Data to Raw Data |
| 35 | Disenrollment Reason | Populates via process Compare Raw Data to Raw Data |
| 36 | Date of Death | Populates via process Compare Raw Data to Raw Data |
| 37 | Caseload - Social Work | Populates via process Compare Raw Data to Raw Data |
| 38 | Caseload - RN | Populates via process Compare Raw Data to Raw Data |
| 39 | Caseload - PCP | Populates via process Compare Raw Data to Raw Data |
| 40 | Caseload - HCC | Populates via process Compare Raw Data to Raw Data |
| 41 | Caseload - Activities | Populates via process Compare Raw Data to Raw Data |
| 42 | Caseload - OT | Populates via process Compare Raw Data to Raw Data |
| 43 | Caseload - PT | Populates via process Compare Raw Data to Raw Data |
| 44 | Caseload - RD | Populates via process Compare Raw Data to Raw Data |
| 45 | Caseload - Supervising MD | Populates via process Compare Raw Data to Raw Data |
| 46 | Additional Important Information | Populates via process Compare Raw Data to Raw Data |
| 47 | Notes | Populates via process Compare Raw Data to Raw Data |
| 48 | Safety - 2 Person | Populates via process Compare Raw Data to Raw Data |
| 49 | Wanderer | Populates via process Compare Raw Data to Raw Data |
| 50 | Interpreter Needed | Populates via process Compare Raw Data to Raw Data |
| 51 | Fall Risk | Populates via process Compare Raw Data to Raw Data |
| 52 | DPOA or Guardian Active | Populates via process Compare Raw Data to Raw Data |
| 53 | Palliative Care | Populates via process Compare Raw Data to Raw Data |
| 54 | Primary PMR Row | Populates via process Compare Raw Data to Raw Data |

## Public Functions

Public functions are top-level function names without a trailing underscore; these include menu callbacks and Apps Script entry points.

### Menu-required
`setupReportFormattingDashboard`, `createOrRefreshAllReportTemplates`, `runDashboardQualityQuick`, `runDashboardQualityStartUp`, `runDashboardQualityValidateTemplates`, `runDashboardQualityFull`, `runFrameworkSmokeValidation`, `createIndexSheet`, `restoreSheetFromActiveIndexRow`, `configureIndexRestoreWebAppUrl`, `formatMonthlySheets`, `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `createDisenrolledList`, `createMasterList`, `buildMonthlyChangeReport`, `hideReportTemplates`, `showReportTemplates`, `hideSystemSheetsNow`, `showSystemSheetsNow`, `formatBannerReport`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `formatRawData`, `validateActiveBannerFormatterOutput`, `archiveActiveRawDataSheet`, `archiveMonthlyImportSheets`, `archiveMonthlyActiveSheets`, `enforceGlobalSheetSortOrder`, `hideTemplates`, `showTemplates`, `hideSystemSheets_`, `showSystemSheets_`, `clearDiagnosticsAndTimingLogs`, `toggleFrameworkTiming`, `formatDashboard`, `rebuildFormatDashboardDefaults`, `saveActiveLayoutToDashboardSettings`, `setupSystemSheets`

### Dashboard-required
`setupReportFormattingDashboard`, `loadDashboardConfig_`, `writeDashboardTitle_`, `writeDashboardSection_`, `styleDashboard_`

### Template-required
`createOrRefreshTemplateFromDashboard_`, `createOrRefreshAllReportTemplates`, `hideReportTemplates`, `showReportTemplates`

### Validation-required
`validateTemplateFromDashboard_`, `validateReportTemplates`, `writeTemplateValidationReport_`

### Timing-required
`runFrameworkTimed_`, `markFrameworkStep_`, `writeFrameworkTimingReport_`, `writeTimingReport_`

### Additional public top-level functions
`assignSortOrderAndHideExtraRows`, `buildCombinedFrameworkTestDashboard`, `configureArchiveSpreadsheetId`, `doGet`, `formatDemoPStructure`, `formatMonthlyChangeSubheaderRow`, `formatMonthlyChangeSubsectionBlock`, `getMonthlyChangeSubsectionLabels`, `hideMonthlyActiveSheets`, `hideMonthlyImportSheets`, `onEdit`, `onOpen`, `processDemoP`, `quickBuildAllTemplates`, `quickSystemSetup`, `rebuildProductionMonthlyChangeTemplate`, `refreshFrameworkTimingReport`, `repairAllTemplateDateFormats`, `restoreSheetFromArchiveWorkbook`, `runAllFrameworkTestsAndBuildDashboard`, `runFrameworkHealthCheck`, `runMonthlyUpdate`, `runWorkflowSyncVerification`, `showAllMasterListRows`, `verifyFrameworkConfiguration`, `writeFrameworkTimingPerformanceRecommendations`

## Document Properties

- `ML_INDEX_RESTORE_WEB_APP_URL`
- `RFF_ARCHIVE_SPREADSHEET_ID`
- `RFF_FRAMEWORK_TIMING_ENABLED`

## Workflow Order

- **Quick System Setup:** `rebuildFormatDashboardDefaults` → `setupSystemSheets` → `runDashboardQualityStartUp` → `runFrameworkSmokeValidation` → `createIndexSheet`.
- **Quick Build All Templates:** `createOrRefreshAllReportTemplates` → `runDashboardQualityValidateTemplates`.
- **Create Monthly Update:** prompt for month → `preflightMonthlyUpdateForMonth_` → `buildMonthlyChangeReportForMonth_` → `updateDemoPMonthlySyncForMonth_` → `createDisenrolledListForMonth_` → `createMasterListForMonth_` → `createIndexSheet`.
- **Dashboard Quality Workflow:** `clearDashboardConfigCache_` → `runDashboardQualityTemplateAndFormatSections_` → `runOperationalDataPipelineValidations_` → `flushStagedDashboardQualitySectionsRows_` → `writeCombinedFrameworkTimingReport_`.
- **Run All Framework Tests + Dashboard:** `runDashboardQualityQuick` → `runDashboardQualityFull`.

## Source Traceability

- Version and global constants: lines 1-252.
- Dashboard defaults, sections, sheet definitions, tab organization, system surfaces, and header sets: lines 3305-3938.
- Dashboard Quality section registry and formatting constants: lines 14263-14330.
- Workflow order functions: `quickSystemSetup`/`quickBuildAllTemplates` lines 905-930, `runMonthlyUpdate` lines 10960-10994, `runDashboardQualityFull` lines 14206-14217, and `runAllFrameworkTestsAndBuildDashboard` lines 14234-14240.
