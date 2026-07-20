<!-- markdownlint-disable MD013 MD022 MD024 MD032 MD033 MD056 MD058 MD060 -->

# Master List Framework Specification v2.0

## Governing Authority

**Authoritative implementation:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.

**Authoritative dashboard governance source:** `Format Dashboard` as generated, loaded, validated, and applied by the current production script.

**Source-of-truth rule:** The current production script is the implementation authority. This specification documents that implementation. If this specification, older draft PDFs, older inventories, reports, or prior v1.6.x/v1.9 references conflict with v1.7.6 production behavior, v1.7.6 production behavior controls until a later approved production version supersedes it.

**Revision purpose:** This v2.0 revision replaces stale v1.6.29 / v1.6.74 / v1.9 authority language with a current-state framework specification for v1.7.6. It preserves approved business rules and governance decisions. It does not authorize architectural redesign or production-code rewrites.

---

## 1. Executive Overview

The Master List Framework is a single-file Google Apps Script production framework for dashboard-governed monthly source formatting, Demo P processing, Monthly Change reporting, Disenrollment management, Master List creation/update, Banner synchronization, Care Plan Due synchronization, Unlocked Care Plan synchronization, Dashboard Quality governance, template governance, Index / archive lifecycle management, timing instrumentation, cache optimization, system-sheet management, validation, and release verification.

The framework is implementation-bound. The current production script v1.7.6 is the executable source of truth. The Format Dashboard is the editable governance surface for report formatting, sheet definitions, header definitions, column definitions, template behavior, output visibility, and system-sheet surfaces.

### 1.1 Framework Purpose

The framework exists to:

- Preserve monthly Raw Data and Demo P processing evidence.
- Produce governed monthly report outputs from dashboard-defined templates.
- Maintain Primary PMR row ownership for participant-level operational data.
- Synchronize Banner, Care Plan Due, and Unlocked Care Plan data to the Master List Primary PMR row.
- Generate Monthly Change reporting from current/prior month source comparisons.
- Maintain Disenrolled Exclusion records and Demo P replacement retention.
- Maintain Index visibility across active workspace tabs and external cold-storage archive tabs.
- Support optional web-app restore routing for Index archive restore links.
- Consolidate quality evidence into Dashboard Quality Report sections A-Q.
- Preserve timing, validation, and health-check evidence for release readiness.

### 1.2 Current Production Baseline

| Component | v2.0 Governing Status |
|---|---|
| Current production script | `v.1.7.6_Current_Production_Script` is the implementation authority. |
| Framework specification | This markdown specification is the current governing technical reference for v1.7.6 behavior. |
| Draft PDF | `Master List Framework Specification v2.0 _ Draft.pdf` is a reviewed source artifact but must be updated/rebuilt from this specification before being treated as current. |
| Historical v1.6.x inventories | Historical reference material only unless regenerated or revalidated against v1.7.6. |

### 1.3 Protected Architecture Summary

| Protected Standard | Current v1.7.6 Meaning |
|---|---|
| Single-file Apps Script architecture | The framework remains one production script file until an approved versioned migration changes this. |
| Dashboard-driven formatting | Format Dashboard remains the editable authority for formatting, templates, sheet definitions, headers, columns, behaviors, and system surfaces. |
| Template-first output generation | Normal output workflows copy governed template structure, paste data in batch, and apply only required final formatting/validation fixes. |
| Primary PMR row architecture | Participant-level synchronized output belongs on the Primary PMR row. Master List operational output contains Primary PMR rows only. |
| Source data preservation | Raw Data and Demo P source/audit information must remain available for validation and monthly change workflows. |
| Dashboard Quality consolidation | Dashboard Quality Report is the consolidated QA artifact. Standalone QA sheets are not governing unless reintroduced by approved governance. |
| Index/archive lifecycle | Index inventories active workspace sheets and external cold-storage archive sheets and supports governed restore paths. |
| Timing and validation evidence | Framework Timing and Dashboard Quality evidence must be preserved for production readiness and troubleshooting. |

---

## 2. Production Script Manifest

The v1.7.6 production script contains 15,785 lines and 672 declared functions: 64 public Apps Script-callable functions and 608 internal underscore helpers.

Protected production surfaces include:

| Surface | Governance |
|---|---|
| Version/constants | Framework version, rebuild markers, feature flags, archive/index configuration keys, timing limits, row constants, date formats, sheet types, sheet names, prefixes, templates, and sheet order constants are protected defaults. |
| Public entry points | Menu callbacks, trigger callbacks, web-app callbacks, workflow callbacks, validation callbacks, dashboard callbacks, timing callbacks, and compatibility wrappers are protected. |
| Internal helpers | Trailing-underscore helpers are internal implementation details but may not be removed when referenced by workflows, registries, callbacks, triggers, validators, dynamic invocation, or tests. |
| Format Dashboard schema | Section names, section columns, sheet types, template names, header names, column definitions, behavior keys, and system-surface definitions are protected. |
| Dashboard Quality schema | Section keys, section titles, shell structure, section-only write behavior, timestamps, summary, signoff, and validation rows are protected evidence outputs. |
| Template schema | Template names, title/header rows, row/column sizing, signatures, hidden-template behavior, date/number formatting, hidden columns, filters, and row-height locks are protected. |
| Index/archive schema | Index headings, active workspace grid, external cold-storage archive grid, restore action, archive spreadsheet ID, restore web-app URL, and archive restore behavior are protected. |
| Data ownership | Raw Data, Demo P, Primary PMR Row, Monthly Change, Disenrolled Exclusion, Master List, Archive - Demo P, Banner, Care Plan Due, and Unlocked Care Plan ownership boundaries are protected. |

Changes to protected surfaces require coordinated production code, dashboard/defaults, template, validator, timing, Dashboard Quality, and documentation updates.

---

## 3. Global Standards

| Area | Standard |
|---|---|
| Implementation authority | Current production script v1.7.6 controls behavior. |
| Documentation authority | This specification is the governing technical reference after alignment to v1.7.6. |
| Business logic | Preserve approved production business rules. Do not rewrite working logic from scratch. |
| Public compatibility | Preserve menu callbacks, public function names, trigger entry points, web-app parameters, and compatibility wrappers unless an approved migration updates all consumers. |
| Data safety | Validate before destructive operations. Stop on missing required dependencies or data-integrity failures. |
| Performance | Prefer batch reads/writes, in-memory transforms, maps/sets, cached lookups, minimal flushes, and one-pass processing. |
| Template governance | Templates are the formatting authority for governed outputs. |
| Dashboard governance | Format Dashboard controls editable formatting/template/report configuration where loaders and validators support the values. |
| QA governance | Dashboard Quality Report is the consolidated validation and signoff artifact. |
| Archive governance | Binary reports and exported artifacts are review inputs, not implementation artifacts. Script-driven archive sheets and external archive workbook records are governed runtime data surfaces. |

---

## 4. Configuration Architecture

Configuration is layered. The framework is not exclusively dashboard-configured.

| Configuration Source | Examples | Governance |
|---|---|---|
| Script constants | Version, sheet names, prefixes, timing limits, template feature flags, default archive spreadsheet ID, row/header constants, date formats, dashboard read width, sheet tab order, system sheets, and template names. | Protected production defaults. Changes require versioned review. |
| Format Dashboard | Sheet definitions, report titles, output naming patterns, template names, headers, column definitions, behaviors, presentation defaults, and system-sheet surfaces. | Editable framework configuration after dashboard validation. |
| Document properties | `RFF_ARCHIVE_SPREADSHEET_ID`, `ML_INDEX_RESTORE_WEB_APP_URL`, template signatures, Index signatures, Dashboard Quality section state, workflow-busy state, and deferred-index state. | Deployment/runtime configuration and persistent operational state. |
| Runtime cache | Dashboard config cache, sheet/header/header-map caches, monthly sheet lookup cache, template signature cache, Dashboard Quality cache, and timing state cache. | Non-authoritative execution optimization. Must be invalidated after governed mutations. |

Public configuration callbacks:

| Callback | Purpose |
|---|---|
| `configureArchiveSpreadsheetId` | Sets/clears the document-property override for the external archive spreadsheet ID. |
| `configureIndexRestoreWebAppUrl` | Sets/clears the document-property URL used by Index restore hyperlinks, with auto-detection fallback where available. |
| `rebuildFormatDashboardDefaults` | Rebuilds Format Dashboard from script defaults. |
| `saveActiveLayoutToDashboardSettings` | Captures supported active layout settings into dashboard/default governance. |

---

## 5. Format Dashboard Standards

The Format Dashboard is the editable governance surface for report formatting and template behavior. Values are runtime-editable only where the production loaders and validators support them.

| Section | Governing Scope |
|---|---|
| SECTION A - GLOBAL SETTINGS | Header row, data start row, freeze settings, row heights, default widths, date/number/text formats, wrapping, alignment, font, colors, HSL levels, border style, and template version. |
| SECTION B - TITLE ROWS | Title row purposes, value sources, target cells, row heights, font sizes, font weight, fill levels, alignment, wrapping, and notes. |
| SECTION C - SHEET DEFINITIONS | Sheet type, report title, template name, output naming pattern, base color, prompt-date usage, end-date source, row count, column count, row mode, minimum rows, buffer rows, test rows, and test-row usage. |
| SECTION D - COLUMN DEFINITIONS | Header-level width, header font size, date-column flag, hidden-column flag, data wrap, horizontal alignment, vertical alignment, and number format. |
| SECTION E - SHEET BEHAVIORS | Title-row usage, filters, alternating colors, subheaders, hidden templates, and output visibility. |
| SECTION F - SHEET HEADERS | Sheet type, column order, header name, and source-of-data lineage. |
| SECTION G - SYSTEM SHEET SURFACES | System sheet name, display name, sort order, output visibility, title colors, global defaults, and notes. |

Protected dashboard standards:

- Section names and section header labels are protected.
- Sheet type keys are protected.
- Template names are protected.
- Header names and source-of-data lineage entries are protected.
- Column order is protected unless a coordinated mapping/template/validator migration is approved.
- Dashboard-generated defaults must remain compatible with production loaders.
- Dashboard Quality verification must validate Format Dashboard structure before dependent workflows are treated as release-ready.

---

## 6. Sheet Layout Standards

| Item | Standard |
|---|---|
| Title rows | Governed by Format Dashboard Section B and template definitions. |
| Header row | `HEADER_ROW` is row 4. |
| Data start row | `DATA_START_ROW` is row 5. |
| Date display format | `mm/dd/yyyy` for displayed date values where governed formatting applies. |
| Sheet date suffix | `MM.yy` / `mm.yy` style monthly suffixes are used in governed monthly sheet names. |
| Freeze behavior | Governed by dashboard/template behavior; standard output templates freeze title/header rows and expected columns where implemented. |
| Row heights | Governed by dashboard defaults and final row-height locks where implemented. |
| Blank row trimming | Governed output cleanup may trim or delete excess blank rows after governed template row counts or safe thresholds. |
| Hidden columns | Governed by Format Dashboard Section D and template behavior. |
| Alternating colors | Governed by Format Dashboard Section E and template formatting. |
| Filters | Governed by Format Dashboard Section E and template/output formatting helpers. |

Layout standards must be applied through dashboard/template-aware helpers rather than ad hoc cell-by-cell formatting.

---

## 7. Sheet Definitions, Lifecycle, and Ordering

### 7.1 Governing Sheet Categories

| Category | Sheets / Prefixes |
|---|---|
| Index | `Index` |
| Active operational sheets | `Demo P`, `Monthly Change`, `Master List`, `Disenrolled Exclusion` |
| Demo P archive sheet | `Archive - Demo P` |
| Formatted monthly import outputs | `Raw Data`, `Banners`, `Banner Report`, `CP Due`, `Care Plan Due Date Report`, `Unlock CP`, `Unlocked Care Plan` |
| Unformatted source imports | `B`, `CD`, `UC`, `RD` and month-labeled variants |
| System sheets | `Framework Timing Report`, `Dashboard Quality Report`, `Format Dashboard` |
| Templates | `Template - Banner Report`, `Template - Care Plan Due`, `Template - Unlocked Care Plan`, `Template - Raw Data`, `Template - Demo P`, `Template - Disenrolled Exclusion`, `Template - Master List`, `Template - Monthly Change`, `RFF_BASE_TEMPLATE` |

### 7.2 Global Sort Order

The v1.7.6 global sort model is:

1. `Index` first.
2. `Demo P` second.
3. Current/visible `Monthly Change` outputs.
4. Current/visible `Master List` outputs.
5. `Disenrolled Exclusion`.
6. `Archive - Demo P` directly behind active Disenrolled Exclusion and normally hidden.
7. Formatted monthly imports in source group order: Raw Data, Banner, Care Plan Due, Unlocked Care Plan.
8. Unformatted imports: Banner, Care Plan Due, Unlocked Care Plan, Raw Data route variants.
9. Other live sheets.
10. System/template tail block: Framework Timing Report, Dashboard Quality Report, Format Dashboard, governed templates, and `RFF_BASE_TEMPLATE`.

System and template sheets may be temporarily shown for movement, then restored to their prior hidden state. Operational sheet organization must not permanently expose hidden system/template sheets.

### 7.3 Monthly Sheet Lifecycle

| Lifecycle Area | Scope |
|---|---|
| Monthly import sheets | Raw Data, Banner, Care Plan Due, and Unlocked Care Plan source/output tabs; governed by monthly import hide/archive menu callbacks. |
| Monthly active sheets | Master List, Monthly Change, and Demo P active output categories; governed by monthly active hide/archive menu callbacks. |
| Demo P retained archive | `Archive - Demo P` stores Demo P rows replaced during monthly synchronization. |
| External cold storage | Configured archive spreadsheet stores copied/archived monthly sheets and is surfaced through the Index archive grid. |
| Restore lifecycle | Users may restore archive sheets through the selected Index archive row menu callback or optional web-app hyperlink routing. |

---

## 8. Public APIs, Menus, Triggers, and Web App Surfaces

The current production script exposes 64 public Apps Script-callable functions. Public functions omit trailing underscores. Internal helpers use trailing underscores. Public functions, wrapper aliases, menu callbacks, trigger entry points, and web-app routes are protected.

### 8.1 Menu Architecture

`onOpen` creates the top-level `Master List` menu with these governed submenu groups:

| Menu Group | Current Menu Responsibilities |
|---|---|
| Data & Processing Engine | Format monthly sheets, Create Monthly Update, Demo P update/build, Disenrolled List, Monthly Change Report, and Master List creation. |
| Sheet & Layout Management | Organize tabs, hide/archive monthly import sheets, hide/archive monthly active sheets, hide/show templates, hide/show system sheets, clear timing logs, and toggle timing. |
| Quick Start-up | System setup, build templates + validate templates, and Dashboard Quality workflow. |
| Maintenance/Rebuild | Quality workflow shortcuts and individual format-sheet shortcuts. |
| Start-up | Setup system sheets, rebuild Format Dashboard, save active layout defaults, create/refresh templates, build Index, restore selected archive row, configure Index restore web-app URL, and configure archive spreadsheet ID. |

### 8.2 Public Workflow Entry Points

| Workflow | Public Entry Point |
|---|---|
| Configure archive spreadsheet ID | `configureArchiveSpreadsheetId` |
| Setup Format Dashboard | `setupReportFormattingDashboard` |
| Rebuild Format Dashboard defaults | `rebuildFormatDashboardDefaults` |
| Quick system setup | `quickSystemSetup` |
| Quick template build + validation | `quickBuildAllTemplates` |
| Refresh Framework Timing report | `refreshFrameworkTimingReport` |
| Write timing performance recommendations | `writeFrameworkTimingPerformanceRecommendations` |
| Toggle timing | `toggleFrameworkTiming` |
| Save active layout defaults | `saveActiveLayoutToDashboardSettings` |
| Clear diagnostics/timing logs | `clearDiagnosticsAndTimingLogs` |
| Create/refresh templates | `createOrRefreshAllReportTemplates` |
| Hide/show report templates | `hideReportTemplates`, `showReportTemplates`, `hideTemplates`, `showTemplates` |
| Validate templates | `validateReportTemplates` |
| Format monthly imports | `formatMonthlySheets` |
| Format individual imports | `formatBannerReport`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `formatRawData` |
| Validate Banner output | `validateActiveBannerFormatterOutput` |
| Archive active Raw Data | `archiveActiveRawDataSheet` |
| Hide/archive monthly imports | `hideMonthlyImportSheets`, `archiveMonthlyImportSheets` |
| Hide/archive monthly active sheets | `hideMonthlyActiveSheets`, `archiveMonthlyActiveSheets` |
| Build/update Demo P | `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `processDemoP`, `formatDemoPStructure` |
| Build Monthly Change | `buildMonthlyChangeReport` |
| Create Monthly Update | `runMonthlyUpdate` |
| Create Master List | `createMasterList` |
| Create / update Disenrolled List | `createDisenrolledList` |
| Configure Index restore web app URL | `configureIndexRestoreWebAppUrl` |
| Build Index | `createIndexSheet` |
| Restore archived sheet | `restoreSheetFromActiveIndexRow`, `restoreSheetFromArchiveWorkbook` |
| Web-app restore route | `doGet` |
| Sheet organization | `assignSortOrderAndHideExtraRows`, `enforceGlobalSheetSortOrder`, `hideSystemSheetsNow`, `showSystemSheetsNow` |
| Dashboard Quality | `runDashboardQualityStartUp`, `runDashboardQualityQuick`, `runDashboardQualityValidateTemplates`, `runDashboardQualityFull` |
| Framework testing/health | `runFrameworkSmokeValidation`, `runAllFrameworkTestsAndBuildDashboard`, `buildCombinedFrameworkTestDashboard`, `runFrameworkHealthCheck`, `runWorkflowSyncVerification`, `verifyFrameworkConfiguration` |
| System setup | `setupSystemSheets` |
| Monthly Change template rebuild | `rebuildProductionMonthlyChangeTemplate` |

### 8.3 Trigger and Web App Surfaces

| Surface | Entry Point | Governance |
|---|---|---|
| Simple open trigger | `onOpen` | Builds the Master List menu and must remain Apps Script-callable. |
| Edit trigger surface | `onEdit` | Handles supported edit-time framework behavior and must remain stable where configured. |
| Optional web app restore route | `doGet(e)` | Routes Index restore hyperlinks using `restoreTarget` and `action` parameters, document lock protection, and archive restore helpers. |
| Index restore configuration | `configureIndexRestoreWebAppUrl` | Sets or clears the document-property URL used by restore hyperlinks. |
| Archive spreadsheet configuration | `configureArchiveSpreadsheetId` | Sets or clears the document-property archive spreadsheet ID override. |

Menu callback strings, trigger names, and web-app parameters must remain synchronized with implementation functions and validation registries.

---

## 9. Production Runtime Flow

1. `onOpen` constructs the Master List menu and exposes governed menu callbacks.
2. Startup workflows create or refresh Format Dashboard defaults, system sheets, report templates, Dashboard Quality shell, Framework Timing report shell, Index sheet, and restore/archive configuration surfaces.
3. Monthly source-formatting workflows prompt for a locked report month, resolve short-code import routes, validate source sheets, format available monthly imports, and skip/log missing optional imports.
4. Demo P workflows validate Raw Data structure, flatten participant/contact rows, assign Primary PMR rows, update changed PMRs, retain archive evidence, sort/format Demo P, and clean active PMRs from Disenrolled Exclusion where applicable.
5. Monthly Change workflows compare current and prior month source rows across protected change sections and write dashboard-formatted reports.
6. Disenrollment workflows detect disenrolled PMRs, append governed exclusion records, remove qualifying rows from Demo P, preserve archived Demo P replacement rows, and format exclusion outputs from governed templates.
7. Master List workflows create outputs from Demo P and templates, copy governed headers/data, synchronize Banner / Care Plan Due / Unlocked Care Plan data to Primary PMR rows, apply formatting, and enforce primary-row display rules.
8. Index workflows inventory local active sheets, monthly imports, unformatted imports, archive/system sheets, templates, other live sheets, and external cold-storage archive sheets.
9. Sheet lifecycle workflows hide, show, archive, restore, and sort operational, import, system, archive, and template sheets while preserving hidden system/template state.
10. Dashboard Quality workflows validate Format Dashboard, templates, performance, raw data, Care Plan sync, workflow sync, Demo P, Disenrolled Exclusion, Monthly Change, health, summary, and signoff sections.
11. Framework Timing wraps eligible workflows, records step marks/warnings, compacts timing evidence, and writes performance recommendations.

---

## 10. Processing Workflow Standards

### 10.1 Format Monthly Sheets Workflow

`formatMonthlySheets` is the bulk monthly import-formatting workflow. It prompts once for a locked report month and processes available source tabs using the following route table:

| Route Code | Import Meaning | Output / Processing Owner |
|---|---|---|
| `B` | Banner source import | Banner formatting workflow. |
| `CD` | Care Plan Due source import | Care Plan Due dashboard/template formatting workflow. |
| `UC` | Unlocked Care Plan source import | Unlocked Care Plan dashboard/template formatting workflow. |
| `RD` | Raw Data source import | Raw Data formatting and downstream Demo P source workflow. |

If a route has no matching source tab for the prompted month, the workflow logs the skip and continues with remaining routes. Missing optional imports do not automatically invalidate the whole formatting workflow.

### 10.2 Create Monthly Update Workflow

`runMonthlyUpdate` is the all-in-one monthly processing workflow. The governing order is:

1. Prompt for the locked report month.
2. Run monthly preflight validation before monthly output mutations.
3. Build the Monthly Change Report for the selected month.
4. Update Demo P monthly synchronization from Raw Data for changed PMRs.
5. Create/update Disenrolled Exclusion and remove qualifying rows from Demo P.
6. Create the Master List from the updated Demo P and synchronized source data.
7. Refresh the Index sheet.
8. Enforce active operational sheet order without exposing hidden system/template sheets.
9. Write timing evidence and completion notification.

No specification or workflow documentation may place Master List creation before Monthly Change and Demo P monthly replacement unless the production script is changed through an approved versioned migration.

### 10.3 Standalone Workflow Rule

Standalone workflow callbacks remain supported for targeted troubleshooting, recovery, or partial monthly operation. Standalone callbacks must preserve the same validation, ownership, template, timing, and cache-invalidation rules as the all-in-one workflow path.

---

## 11. Data Ownership and Lineage

Format Dashboard Section F is the governing data dictionary for sheet header order and source-of-data lineage. Format Dashboard Section D is the governing presentation dictionary for column formatting. Demo P raw/flat transformations, synchronization functions, Monthly Change comparisons, Master List copy logic, and Disenrollment exclusion flows must preserve header names, PMR normalization, DOB handling, contact lineage, source maps, and dashboard-governed template outputs.

Critical lineage anchors:

- `Participant PMR#` / `PMR #` normalization controls participant identity and joins.
- `Primary PMR Row` controls primary-row grouping and display semantics.
- Primary PMR assignment occurs during Raw Data / Demo P processing and is not reassigned by Master List, Disenrolled, or Monthly Change workflows.
- Raw Data feeds Demo P and Monthly Change comparison inputs.
- Demo P feeds Master List, Disenrolled Exclusion, and monthly replacement audit flows.
- Replaced Demo P rows are retained in `Archive - Demo P` before monthly sync rewrites the Demo P body.
- Banner, Unlocked Care Plan, and Care Plan Due sheets enrich Master List row data through synchronization functions.
- Master List contains Primary PMR rows only for participant-level operational output.
- Monthly Change sections are protected enumerations for enrollment, disenrollment, demographics, caseload, contact, Banner, and Care Plan changes where implemented.

---

## 12. Mapping, Column, and Header Governance

Mapping definitions are governed by the production script and the Format Dashboard together.

| Definition Type | Governance Source | Notes |
|---|---|---|
| Sheet definitions | Format Dashboard Section C plus script defaults | Sheet type, report title, template name, output naming pattern, color, prompt-date behavior, end-date source, row/column sizing, and test rows. |
| Column definitions | Format Dashboard Section D plus script defaults | Width, font size, date flag, hidden flag, wrap, alignment, and number format. |
| Header definitions | Format Dashboard Section F plus script defaults | Sheet type, column order, header, and source-of-data lineage. |
| Runtime header maps | Production helpers built from sheet headers | Header lookups must use normalized header maps rather than hard-coded column positions where practical. |
| Source-to-output transformations | Production workflow helpers | Business transformations are implementation-owned and may not be rewritten from documentation alone. |

Specification updates must not rename public headers, sheet types, templates, or mapping keys unless the production script and all affected callers/templates/validators are updated together.

---

## 13. Primary PMR Row Architecture

The Primary PMR row is the authoritative participant row for operational output. It serves as the destination for participant-level synchronized data and the representative Master List row.

Rules:

1. Primary PMR ownership is assigned during Raw Data / Demo P processing.
2. Primary PMR ownership is not reassigned by Master List, Disenrolled, or Monthly Change workflows.
3. Banner, Care Plan Due, Unlocked Care Plan, HHA, O2, PAP, PERS, contact processing, notes, update tracking, and applicable summary data must write to the Primary PMR row where participant-level synchronization applies.
4. Master List operational output contains Primary PMR rows only.
5. Secondary/source rows remain available in Raw Data and Demo P where needed for processing and auditability.
6. Demo P monthly replacement rows must be archived to `Archive - Demo P` before the Demo P body is rewritten.

---

## 14. Demo P Processing Rules

Demo P remains the primary monthly participant processing sheet.

Current v1.7.6 Demo P responsibilities:

- Validate Raw Data source structure before processing.
- Flatten participant/contact rows into governed Demo P headers.
- Assign and preserve Primary PMR row ownership.
- Build current-month Demo P from Raw Data during initialization.
- Update changed PMRs during monthly synchronization.
- Require Monthly Change availability before monthly sync replacement.
- Build fresh replacement rows from current Raw Data for changed PMRs.
- Validate replacement PMR coverage before rewriting Demo P.
- Retain replaced Demo P rows in `Archive - Demo P` before body rewrite.
- Rewrite Demo P body in batch.
- Clear caches after governed Demo P mutations.
- Preserve Demo P update status, update month, and source-sheet tracking where implemented.

Removed/prohibited behavior:

- Do not reassign Primary PMR ownership downstream.
- Do not delete or rewrite Demo P history without governed archive/retention behavior.
- Do not perform row-by-row or cell-by-cell processing where batch paths exist.
- Do not bypass monthly dependency checks for Demo P monthly sync.

---

## 15. Master List Processing Rules

Master List is the primary operational participant output. In v1.7.6, Master List contains Primary PMR rows only.

Master List responsibilities:

- Create output from governed Master List template and updated Demo P data.
- Copy governed headers and data in batch.
- Synchronize Banner data to participant rows.
- Synchronize Care Plan Due data to participant rows.
- Synchronize Unlocked Care Plan data to participant rows.
- Preserve participant identity through normalized PMR keys.
- Apply governed template formatting and final display rules.
- Hide non-primary PMR rows where applicable in supporting contexts; Master List operational rows remain Primary PMR rows.
- Participate in global sheet sort/lifecycle governance.

Inside Create Monthly Update, Master List creation occurs after Monthly Change, Demo P monthly synchronization, and Disenrolled Exclusion processing.

---

## 16. Monthly Change Report Rules

Monthly Change reporting compares current and prior month source data across protected change categories. It is a required dependency for Demo P monthly synchronization in the all-in-one monthly update workflow.

Governed Monthly Change rules:

- Build Monthly Change for the prompted report month before Demo P monthly sync during Create Monthly Update.
- Use current and previous month source sheets resolved by governed monthly naming rules.
- Preserve protected section categories for enrollments, disenrollments, demographic changes, caseload changes, contact changes, Banner changes, and Care Plan changes where implemented.
- Convert and format date values consistently with framework date rules.
- Apply governed Monthly Change template structure and subheader formatting.
- Validate Monthly Change output through Dashboard Quality Section O.

---

## 17. Banner Processing Rules

Banner processing formats Banner source imports and synchronizes Banner summary/participant indicators to governed downstream outputs.

Rules:

- The bulk monthly formatter uses route code `B` for Banner source imports.
- Banner source/output validation must prevent formatting or validation against invalid active sheets.
- Banner outputs use dashboard/template-governed formatting.
- Banner summary data synchronizes to Primary PMR rows where participant-level output applies.
- Banner-related changes in Monthly Change remain governed by the current production implementation.

---

## 18. Care Plan Processing Rules

Care Plan Due and Unlocked Care Plan processing synchronizes care-plan fields to the Master List Primary PMR row.

Rules:

- Bulk monthly formatter uses route code `CD` for Care Plan Due and `UC` for Unlocked Care Plan.
- Care Plan Due and Unlocked Care Plan outputs use dashboard/template-governed formatting.
- Care Plan Due matching is governed by production matching logic, including participant name / enrollment-date style matching where implemented.
- Unlocked Care Plan matching is governed by production matching logic, including PMR-based matching where implemented.
- Care Plan synchronization must write to Primary PMR rows only in Master List output.
- Dashboard Quality Section K validates Care Plan Sync readiness/quality.
- Dashboard Quality Section L validates workflow and synchronization expectations where applicable.

---

## 19. Disenrollment Processing Rules

Disenrollment processing is a standalone governed workflow and part of Create Monthly Update.

Rules:

- Detect disenrolled PMRs using governed source fields and current production logic.
- Append governed records to Disenrolled Exclusion.
- Remove qualifying disenrolled rows from Demo P where required by workflow rules.
- Preserve Demo P replacement/retention evidence in `Archive - Demo P` where monthly sync replaces rows.
- Format Disenrolled Exclusion from its governed template.
- Validate Disenrolled Exclusion through Dashboard Quality Section N.
- Do not reintroduce retired Repair Disenrolled workflows unless explicitly approved and implemented in production.

---

## 20. Template Governance

Templates are resolved from Format Dashboard Section C sheet definitions, Section E behaviors, Section F headers, Section D column definitions, and Section A global presentation standards.

Governed templates are:

- `Template - Banner Report`
- `Template - Care Plan Due`
- `Template - Unlocked Care Plan`
- `Template - Raw Data`
- `Template - Demo P`
- `Template - Disenrolled Exclusion`
- `Template - Master List`
- `Template - Monthly Change`
- `RFF_BASE_TEMPLATE`

Template refresh decisions use expected format signatures, document-property signatures, and sheet-note signatures. Metadata-only refresh is allowed only when the existing normalized signature matches expected dashboard/template structure. Full rebuild is required when signatures differ, template structure is missing, or governance settings force rebuild. Missing templates may be created from script defaults during active build paths when supported by the production script.

Template-first processing remains protected: normal output creation should copy governed template structure, paste data in batch, and apply only necessary final formatting/validation fixes.

---

## 21. Dashboard Quality Governance

Dashboard Quality Report is the consolidated QA artifact. Standalone QA sheets are not governing unless explicitly reintroduced by approved governance.

The v1.7.6 Dashboard Quality section inventory is:

| Section | Key / Title | Governance |
|---|---|---|
| A | Global Inputs Verification | Verifies dashboard global input structure and required values. |
| B | Sheet Definitions Verification | Verifies dashboard sheet-definition rows and required settings. |
| C | Sheet Behavior Verification | Verifies dashboard sheet behavior configuration. |
| D | Column Definitions Verification | Verifies dashboard column-definition structure and values. |
| E | Sheet Headers Verification | Verifies dashboard sheet header definitions and lineage. |
| F | Template Structure & Validation | Verifies template existence, structure, formatting, and signature expectations. |
| G | Format Dashboard Changelog | Tracks and reports Format Dashboard configuration changes. |
| H | Framework Health Check | Reports required function, menu, dashboard, template, validation, and timing health. |
| I | Performance Summary | Summarizes Framework Timing performance evidence. |
| J | Raw Data Validation | Validates Raw Data quality and readiness. |
| K | Care Plan Sync Validation | Validates Care Plan Due / Unlocked Care Plan synchronization readiness. |
| L | Workflow & Synchronization Verification | Validates workflow synchronization expectations. |
| M | Demo P Quality Validation | Validates Demo P processing quality. |
| N | Disenrolled Exclusion Validation | Validates disenrollment exclusion output quality. |
| O | Monthly Change Validation | Validates Monthly Change report quality. |
| P | Summary | Consolidates section status. |
| Q | Signoff | Records governance signoff status. |

Dashboard Quality writes are section-governed. Workflows should update only relevant sections where possible, preserve shell structure, use timestamped section content, and avoid unnecessary full-report rebuilds.

---

## 22. Index, External Archive, and Restore Governance

The Index sheet is a governed system dashboard. It is always sorted first and inventories both active workspace tabs and the external cold-storage archive.

Index output includes:

- Active Operational Sheets Workspace heading.
- Local current sheets.
- Month-grouped imported data sheets.
- Unformatted sheets.
- Archive / system sheets.
- Templates.
- Other live sheets.
- External Drive Cold-Storage Archives heading.
- Archive spreadsheet ID.
- Archive month, archive sheet name, archive hyperlink, status, and restore action.

The external archive spreadsheet is controlled by a script default archive ID with a document-property override. `configureArchiveSpreadsheetId` is the public configuration callback. The Index restore web-app URL is controlled by document property and/or Apps Script deployment URL auto-detection. `configureIndexRestoreWebAppUrl` is the public configuration callback.

Restore behavior is governed by:

- `restoreSheetFromActiveIndexRow` for menu-based restore from a selected Index archive row.
- `restoreSheetFromArchiveWorkbook` for the archive copy operation.
- `doGet(e)` for optional web-app restore hyperlink routing.
- Document lock handling during web restore.
- Conflict protection when a target sheet already exists locally.

---

## 23. Cache and Performance Governance

The framework uses in-memory and persistent caches to reduce SpreadsheetApp calls and preserve workflow evidence. Header, header-map, sheet-dimension, monthly sheet lookup, dashboard config, template signature, index signature, Dashboard Quality section, Dashboard Quality last-run, workflow-busy/deferred-index state, and framework timing state caches are protected.

Cache invalidation is required after sheet mutations, header changes, row/column dimension changes, dashboard rebuilds, monthly archive/delete/rename operations, template refreshes, quality-section writes, and index rebuilds.

Performance rules:

- Prefer batch reads and writes.
- Prefer in-memory transforms.
- Prefer Maps/Sets for repeated lookups.
- Prefer cached sheet/header/header-map/config lookups.
- Prefer range-list formatting where practical.
- Minimize `SpreadsheetApp.flush()` calls.
- Avoid repeated cell-by-cell reads/writes.
- Avoid repeated full-sheet scans where a narrower governed range is available.
- Preserve timing evidence for performance review.

---

## 24. Quality, Validation, Error Handling, and Timing

Quality gates are implemented through Dashboard Quality startup, template validation, full quality workflow, framework smoke validation, framework health check, Raw Data validation, Care Plan sync diagnostics, Demo P validation, Disenrolled Exclusion validation, Monthly Change validation, workflow synchronization verification, summary, and signoff sections.

| Error / Warning Pattern | Use |
|---|---|
| Blocking hard stop | Missing required source/output dependency, invalid active source sheet, unsafe monthly update state, missing required headers, invalid PMR identity, restore conflicts, destructive operation preflight failure, or any data-integrity condition that would corrupt governed output. |
| Best-effort warning | Non-critical formatting, sorting, hiding, telemetry, optional Dashboard Quality section update, optional archive/index visibility operation, or UI polish failure where the core data operation can safely proceed. |

Timing wrappers preserve performance evidence through `runFrameworkTimed_`, runtime timing helpers, framework timing report sections, thresholds, recommendations, compact section updates, and retention limits. Timing evidence feeds Dashboard Quality Performance Summary and Framework Health reporting.

---

## 25. Framework Health Check and Testing Standards

Framework Health Check verifies required framework surfaces exist and remain callable. Required function groups include menu functions, dashboard functions, template functions, validation functions, timing functions, workflow functions, and archive/index/web-app functions.

Testing workflow standards:

1. Run startup/dashboard setup validation.
2. Validate templates and template signatures.
3. Validate Format Dashboard global, sheet, behavior, column, and header sections.
4. Validate Raw Data readiness.
5. Validate Care Plan synchronization readiness.
6. Validate workflow synchronization.
7. Validate Demo P quality.
8. Validate Disenrolled Exclusion quality.
9. Validate Monthly Change quality.
10. Review Framework Timing performance summary.
11. Review Framework Health Check.
12. Review Dashboard Quality Summary and Signoff.
13. Verify Index and archive restore behavior when deployment/configuration changes affect archive workflows.

---

## 26. Framework Development and AI Governance

AI agents and human maintainers must preserve approved business logic, public API names, menu callback strings, trigger entry points, web-app parameters, Format Dashboard schema, template names, sheet types, header names, system surface definitions, cache invalidation, timing instrumentation, Dashboard Quality evidence, Index/archive restore behavior, and wrapper compatibility.

Before removing any function, constant, configuration key, menu entry, trigger, sheet definition, template definition, header, or compatibility wrapper, verify:

- Direct callers.
- Indirect callers.
- Menu callback strings.
- Trigger references.
- Web-app routes and parameters.
- `google.script.run` references.
- Dynamic invocation.
- Document-property usage.
- Template usage.
- Dashboard validator usage.
- Dashboard Quality section references.
- Framework Health Check required-function references.
- External consumers.

Protected production rules may only be modified through explicit approval and coordinated updates to production code, Format Dashboard defaults, templates, validators, tests, timing expectations, Dashboard Quality expectations, and inventories.

---

## 27. Versioning Standards

| Version Form | Meaning |
|---|---|
| `vX` | Production release or milestone. |
| `vX.XX` | Major change. |
| `vX.XX.XX` | Minor change, correction, cleanup, or optimization. |

Production script text file names should preserve the repository convention of beginning with `v.` where existing Master List production files use that convention. Every generated production script receives a new version. Earlier production versions must not be overwritten.

This specification documents Current Production Script v1.7.6. Future production releases must update this specification or a superseding specification when behavior changes.

---

## Appendix A — Dashboard Configuration Summary

The Format Dashboard must contain the governed sections listed in Section 5. Dashboard-generated defaults should be rebuilt from v1.7.6 production defaults when producing a final PDF or export.

Minimum dashboard configuration categories:

- Global settings.
- Title rows.
- Sheet definitions.
- Column definitions.
- Sheet behaviors.
- Sheet headers.
- System sheet surfaces.

Any detailed dashboard table exported into a PDF must be generated from current v1.7.6 script defaults or a validated live Format Dashboard. Historical v1.6.x appendix values are not governing unless revalidated.

---

## Appendix B — Sheet Definition Summary

Current governed sheet and template definitions are summarized in Section 7. A complete exported sheet-definition appendix should be rebuilt from v1.7.6 script defaults / Format Dashboard Section C.

Required coverage:

- Index.
- Demo P.
- Monthly Change.
- Master List.
- Disenrolled Exclusion.
- Archive - Demo P.
- Raw Data.
- Banner / Banners / Banner Report.
- Care Plan Due / CP Due / Care Plan Due Date Report.
- Unlocked Care Plan / Unlock CP.
- Framework Timing Report.
- Dashboard Quality Report.
- Format Dashboard.
- All governed templates.
- External cold-storage archive behavior.

---

## Appendix C — Data Source Mapping Summary

A complete data-source mapping appendix must be rebuilt from current v1.7.6 headers and Format Dashboard Section F source-of-data lineage.

Required mapping coverage:

- Raw Data source columns.
- Demo P copied columns.
- Demo P generated processing columns.
- Primary PMR Row ownership.
- Banner summary/synchronization fields.
- Care Plan Due synchronization fields.
- Unlocked Care Plan synchronization fields.
- Master List output fields.
- Monthly Change comparison/report fields.
- Disenrolled Exclusion fields.
- Archive - Demo P retention fields.

Mapping tables must not rename headers, reorder columns, or change source ownership unless the production script, dashboard defaults, templates, validators, and dependent workflows are updated together.

---

## Appendix D — Color and Presentation Standards

Color and presentation standards are governed by script defaults and Format Dashboard values.

Current presentation governance includes:

- Base colors by sheet type where script constants define them.
- Dashboard-controlled colors where no fixed production constant exists.
- HSL shade levels for title/header/accent/fill usage.
- Column widths and font sizes by header.
- Date, number, and text formats.
- Hidden-column flags.
- Wrap and alignment settings.
- Row heights and final row locks where implemented.

A full color table exported to PDF must be regenerated from v1.7.6 defaults / validated Format Dashboard values.

---

## Appendix E — Sheet Naming Standards

Monthly operational sheets use governed monthly naming patterns. System sheets do not use monthly suffixes.

Current naming coverage must include:

- `Index`.
- `Demo P`.
- `Monthly Change` monthly outputs.
- `Master List` monthly outputs.
- `Disenrolled Exclusion`.
- `Archive - Demo P`.
- Raw Data monthly outputs.
- Banner/Banners monthly outputs.
- CP Due / Care Plan Due monthly outputs.
- Unlock CP / Unlocked Care Plan monthly outputs.
- Unformatted `B`, `CD`, `UC`, and `RD` import variants.
- `Framework Timing Report`.
- `Dashboard Quality Report`.
- `Format Dashboard`.
- Governed templates.
- `RFF_BASE_TEMPLATE`.
- External archive sheet names shown in the Index archive grid.

Retired names must not be documented as active unless a current production function still creates, reads, validates, or restores them.

---

## Appendix F — Dashboard Quality and Framework Test Definitions

Dashboard Quality Report is the consolidated framework-quality artifact. Current production uses Sections A-Q as defined in Section 21.

Framework test and quality definitions must include:

- Dashboard startup verification.
- Global input verification.
- Sheet definition verification.
- Sheet behavior verification.
- Column definition verification.
- Sheet header verification.
- Template structure and validation.
- Format Dashboard changelog.
- Framework Health Check.
- Performance Summary.
- Raw Data Validation.
- Care Plan Sync Validation.
- Workflow & Synchronization Verification.
- Demo P Quality Validation.
- Disenrolled Exclusion Validation.
- Monthly Change Validation.
- Summary.
- Signoff.

Retired standalone quality sheets are not governing. Any future standalone report must be explicitly approved and integrated with Dashboard Quality governance.

---

## Appendix G — Historical Reference Package Status

The historical v1.6.29 reference package remains useful background, but it is not current implementation authority for v1.7.6. Any inventory incorporated into future development must be regenerated or revalidated before being treated as governing.

Historical references retained for context:

- `ARCHITECTURE_INVENTORY_v1.6.29.md`
- `CACHE_INVENTORY_v1.6.29.md`
- `DASHBOARD_INVENTORY_v1.6.29.md`
- `ENGINEERING_GOVERNANCE_REFERENCE_v1.6.29.md`
- `ENGINEERING_GOVERNANCE_REFERENCE_PART_VI_v1.6.29.md`
- `FRAMEWORK_RULES_CATALOG_v1.6.29.md`
- `WRAPPER_INVENTORY_v1.6.29.md`
- `CONFIGURATION_INVENTORY_v1.6.29.md`
- `FUNCTION_CALL_GRAPH_v1.6.29.md`
- `HELPER_CATALOG_v1.6.29.md`
- `PRODUCTION_DATA_FLOW_v1.6.29.md`
- `TEMPLATE_INVENTORY_v1.6.29.md`
- `VALIDATION_CATALOG_v1.6.29.md`
- `WORKSHEET_INVENTORY_v1.6.29.md`

---

## Release Statement

This v2.0 specification is the current-state governing specification for the Master List Framework as implemented by Current Production Script v1.7.6. It is production-facing, implementation-bound, dashboard-governed, archive/index-aware, and intended to supersede earlier framing as a specification artifact while preserving approved business logic embodied in the current production script.
