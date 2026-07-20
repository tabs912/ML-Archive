<!-- markdownlint-disable MD013 MD022 MD024 MD032 MD033 MD056 MD058 MD060 -->

# Master List Framework Specification v2.0 UPDATEDv1

## Governing Authority

**Saved artifact:** `Master_List/Specs/Master_List_Framework_Specification_v2.0_UPDATEDv1.md`.

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

---

## Appendix H — Original Specification Tables Retained and Updated

This appendix preserves the table coverage from the original Master List Framework specification source document and updates stale authority/version references to v1.7.6 where they appeared in table cells. The tables remain reference tables; where a table conflicts with the governing sections above or with the current production script, Current Production Script v1.7.6 controls.

Original source parsed for table coverage: `Master_List/Specs/v1.9_Master_List_Framework_Specifications_Final_Governing_Edition.docx`. Total tables retained: 106.


### Original Table 1 (6 rows x 3 columns)

| Component | Current Role in v2.0 UPDATEDv1 | Reference |
| --- | --- | --- |
| Framework Specification v2.0 UPDATEDv1 | Primary governing authority | Primary governing authority |
| Current Production Script v1.7.6 | Current executable production baseline | Starting script for future development |
| v26.9.5 + approved v27 workflows | Historical business logic lineage | Reference only unless needed for regression review |
| Dashboard Infrastructure v3.2.2 | Historical dashboard infrastructure lineage | Reference only unless needed for dashboard regression review |
| QA Framework v3.4.2 | Historical QA lineage | Reference only unless needed for QA regression review |


### Original Table 2 (11 rows x 2 columns)

| Section | Dashboard Quality Content |
| --- | --- |
| A | Template Validation |
| B | Template Header Audit |
| C | Test 6 Date Formatting |
| D | Test 7 Validation Failure |
| E | Test 9 Monthly Change Subheaders |
| F | Test 10 Dashboard Audit, including Care Plan Sync validation |
| G | Framework Health Check, including Care Plan Sync validation |
| H | Signoff |
| I | Summary |
| J | Timing Summary |


### Original Table 3 (10 rows x 2 columns)

| Protected Standard | v2.0 UPDATEDv1 Production Meaning |
| --- | --- |
| Single File Architecture | Maintain the framework as one Apps Script file until production stabilization is complete. |
| Dashboard Driven Formatting | Dashboard configuration remains the formatting and template authority. |
| Template First Formatting | Build templates once; duplicate/copy templates and paste data during normal processing. |
| Primary PMR Row Architecture | Assign Primary PMR Row in Raw Data only; synchronize to Primary PMR Row only. |
| One Pass Processing | Read once, process once, write once whenever practical. |
| Source Data Preservation | Preserve imported source reports and avoid destructive processing unless explicitly approved. |
| Dashboard Quality Consolidation | Use Dashboard Quality Report sections A-J as the consolidated QA reporting structure. |
| Template Header Audit | Use one centralized header audit instead of repeated header verification inside individual processes. |
| Full Replacement Updates | Production releases must replace affected functions completely and remove obsolete logic. |


### Original Table 4 (19 rows x 2 columns)

| Item | Standard |
| --- | --- |
| Source of Truth | Framework Specification v2.0 UPDATEDv1 is the governing authority; Current Production Script v1.7.6 is the executable source of truth. |
| Historical References | v26.9.5, approved v27 workflows, v3.2.2, and v3.4.2 are architecture lineage references only unless a regression review requires them. |
| Date Prompt | User enters month only; system uses MM/01/YYYY. Year remains locked February-November and selectable December-January unless changed by approved production rule. |
| Standard Font | Arial 10pt black, left aligned, vertical middle. |
| Header Row | Row 4. |
| Data Start Row | Row 5. |
| Freeze | Rows 1-4 and Columns A:B. |
| Date Display Format | mm/dd/yyyy. |
| Sheet Date Format | mm.yy. |
| Delete Blank Rows After | After governed template row count or after row 400 when empty for legacy-compatible report cleanup; template row counts control where defined. |
| Dashboard Quality Report | Authoritative QA report; replaces standalone Test 6, Test 7, Test 9, Test 10, Template Validation, and Framework Health Check report sheets. |
| Dashboard Quality Section Timestamp | Every Dashboard Quality section header shall include last run timestamp, status, and duration where available. |
| Template Header Audit | Required centralized QA process validating required template headers for Raw Data, Banner, Care Plan Due, Unlocked Care Plan, Demo P, Master List, Monthly Change, Disenrolled, and Master List Change Log. |
| Care Plan Sync Validation | Required inside Dashboard Audit and Framework Health Check; not a separate Dashboard Quality section. |
| Primary PMR Assignment | Occurs only during Raw Data processing. |
| Master List Row Standard | Master List contains Primary PMR Rows only. |
| Demo P Tracking Columns | Demo P template must include Demo P Update Status, Demo P Update Month, and Demo P Source Sheet. |
| Row Height Enforcement | Raw Data, Demo P, Master List, and Disenrolled shall enforce data row height 25 at the end of processing to prevent Notes wrapping from expanding rows. |


### Original Table 5 (9 rows x 2 columns)

| Item | Standard |
| --- | --- |
| Row 1 - Title Row | Height 25, Level 3 fill. A1 = title, Arial 14pt bold, black, overflow. C1:D1 may contain framework/version notes only if it does not interfere with freeze settings. |
| Row 2 - Date Row | Height 20, Level 3 fill. A2=Date, B2=Start Date, C2=to, D2=End Date when the sheet uses date ranges. |
| Row 3 - Spacer Row | Height 10, Level 1 fill, no data. |
| Row 4 - Header Row | Height 40, Level 2 fill, wrap, horizontal left, vertical top. |
| Rows 5+ | Height 25, Arial 10pt, wrap clip, horizontal left, vertical center. |
| Merge/Frozen Cell Rule | No merged cells may partially cross frozen rows/columns. Break apart merged cells before applying freeze settings when needed. |
| Dashboard Quality Layout | Dashboard Quality Report uses governed section headers with timestamp/status/duration metadata. Section tables may vary by test but must remain within the consolidated A-J report. |
| Final Data Row Height Enforcement | Raw Data, Demo P, Master List, and Disenrolled apply standard data row height 25 at the end of their processing functions. |


### Original Table 6 (5 rows x 2 columns)

| Sheet Type | Required Final Row Height Action |
| --- | --- |
| Raw Data | Apply standard data row height 25 after formatting and framework-owned column additions. |
| Demo P | Apply standard data row height 25 after copy-first/process-once/write-once processing. |
| Master List | Apply standard data row height 25 after Master List creation and synchronization. |
| Disenrolled Exclusion | Apply standard data row height 25 after standalone Disenrolled list creation. |


### Original Table 7 (12 rows x 3 columns)

| Sheet Type | Base Color | Use |
| --- | --- | --- |
| CP Due Date | #65CC99 | Report tabs, templates, headers, dashboard references |
| Unlock CP | #65CCC3 | Report tabs, templates, headers, dashboard references |
| Banners | #65A9CC | Report tabs, templates, headers, dashboard references |
| Demo P | #657FCC | Report tabs, templates, headers, dashboard references |
| Master List | #7665CC | Master List tabs, templates, headers, dashboard references |
| Monthly Change | #A165CC | Monthly Change tabs, templates, headers, dashboard references |
| Master List Change Log | #CC65CC | Change log/system sheet |
| Disenrolled Exclusion List | #CC65A1 | Disenrollment tracking/system sheet |
| Index Sheet | #668BCC | Index tab color |
| Raw Data | Dashboard-defined | Monthly source/import sheet type; color controlled by dashboard configuration |
| Dashboard Quality Report | Dashboard-defined | Consolidated QA report; color controlled by dashboard configuration |


### Original Table 8 (5 rows x 3 columns)

| Level | Lightness | Usage |
| --- | --- | --- |
| Level 1 | 60% | Row 3, sheet tab accents |
| Level 2 | 75% | Header row |
| Level 3 | 85% | Title rows, current sheet tabs |
| Level 4 | 97% | Alternating colors |


### Original Table 9 (12 rows x 4 columns)

| Sheet Type | Report Title | Date Format | Example |
| --- | --- | --- | --- |
| Raw Data | Raw Data | MM.YY | Raw Data 05.26 |
| Demo P | Demographics - Participants | MM.YY | Demo P 05.26 |
| Banners | Banner Report | MM.YY | Banners 05.26 |
| Unlocked CP | Unlocked Care Plan Report | MM.YY | Unlocked CP 05.26 |
| CP Due | Care Plan Due Date Report | MM.YY | CP Due 05.26 |
| Monthly Change | Monthly Change Report | MM.YY | Monthly Change 05.26 |
| Master List | Master List | MM.YY | Master List 05.26 |
| Disenrolled | Disenrolled Exclusion List | MM.YY from prompt | Disenrolled 05.26 |
| ML Change Log | Master List Change Log | No month or as needed | ML Change Log |
| Dashboard Quality Report | Dashboard Quality Report | No month | Dashboard Quality Report |
| Timing Report / Current Timing Report | Timing Report | No month | Timing Report |


### Original Table 10 (8 rows x 2 columns)

| Organization Rule | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Index Sheet | The index sheet remains first. |
| Current Month Sheets | Current month operational sheets appear after Index/Raw Data in governed working order. |
| Visible Working Order | Recommended visible working order: Index, Raw Data, Master List, Demo P, CP Due, Unlocked CP, Banners, Monthly Change, |
| Framework QA Sheets | Dashboard Quality Report, Timing Summary, Timing Report are framework reporting sheets and should remain accessible for review. |
| Hidden Templates | Hidden templates and system sheets remain at the end/hidden. |
| System Sheets | Disenrolled Exclusion List and Master List Change Log may be hidden by default unless actively under review. |
| Tab Colors | Current sheet tabs use Level 3 color; older sheet tabs use Level 2 color; system sheets may be hidden. |


### Original Table 11 (10 rows x 2 columns)

| Order | Template |
| --- | --- |
| 1 | Banners |
| 2 | CP Due Date |
| 3 | Unlocked CP |
| 4 | Raw Data |
| 5 | Demo P |
| 6 | Disenrolled Exclusion |
| 7 | Master List |
| 8 | Monthly Change |
| 9 | Master List Change Log |


### Original Table 12 (9 rows x 2 columns)

| Configuration Area | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Global Settings | Date rules, font defaults, freeze settings, row heights, template row counts, and protected fallback behavior. |
| Sheet Definitions | Sheet type, title, tab color, date behavior, template behavior, processing behavior, and template order. |
| Sheet Headers | Required headers and data source mappings for every governed sheet. |
| Column Definitions | Column width, header font size, data font size, date format, hidden status, horizontal alignment, vertical alignment, and wrap behavior. |
| Sheet Behaviors | Filters, hidden columns, row/column cleanup behavior, timing, validation, and QA participation. |
| Template Definitions | Template row counts, template signature/metadata, frozen rows/columns, tab color, filter behavior, and hidden/show column settings. |
| Dashboard Quality Definitions | Section A-J ownership, section timestamp requirements, section write behavior, and consolidated QA report standards. |
| Timing Definitions | Current Timing Report logging and Dashboard Quality Section J timing summary behavior. |


### Original Table 13 (7 rows x 2 columns)

| Rule | Requirement |
| --- | --- |
| Section-only updates | Each test writes only its assigned Dashboard Quality section. |
| Timestamped section headers | Each section header includes Last Run timestamp, status, and duration when available. |
| No hidden-template creation | Dashboard Quality Report shall not be generated from a hidden template as a normal test step. |
| No full rebuild | Run All Framework Tests + Dashboard shall not end by rebuilding the full Dashboard Quality report. |
| No standalone QA report sheets | Standalone Test 6, Test 7, Test 9, Test 10, Template Validation, and Framework Health Check report sheets are retired. |
| Summary and timing | Section I Summary and Section J Timing Summary are updated after the underlying sections have been written. |


### Original Table 14 (15 rows x 3 columns)

| Control | Required | Description |
| --- | --- | --- |
| Column Width | Yes | Pixel width for each header. |
| Header Font Size | Yes | Font size for row 4 header display. |
| Data Font Size | Yes | Font size for rows 5+. |
| Date Format | Yes for dates | Applies mm/dd/yyyy display to configured date columns. |
| Hidden Column | Yes | Whether columns should be hidden after formatting. |
| Wrap Mode | Yes | Row 4 wrap; data rows clip unless overridden. |
| Horizontal Alignment | Yes | Default left. |
| Vertical Alignment | Yes | Headers top, data middle. |
| Row Height | Yes | Rows 1-4 and data rows. |
| Freeze Settings | Yes | Rows 1-4 and Columns A:B. |
| Template Row Count | Yes for templates | Defines the governed template row capacity. |
| Template Header Audit | Yes | Identifies whether the sheet participates in centralized template header audit. |
| Dashboard Quality Section | Yes for QA tests | Defines section ownership for consolidated Dashboard Quality Report. |
| Timing Participation | Yes for timed workflows | Defines whether a process logs to Current Timing Report and Dashboard Quality Section J. |


### Original Table 15 (11 rows x 4 columns)

| Section | Owner / Test | Purpose | Write Rule |
| --- | --- | --- | --- |
| A | Template Validation | Validate template presence and template-level configuration. | Section A only. |
| B | Template Header Audit | Validate required headers across governed templates. | Section B only. |
| C | Test 6 Date Formatting | Validate date columns and mm/dd/yyyy display formatting. | Section C only. |
| D | Test 7 Validation Failure | Report validation failures and issue details. | Section D only. |
| E | Test 9 Monthly Change Subheaders | Validate Monthly Change subheaders and section structure. | Section E only. |
| F | Test 10 Dashboard Audit | Validate dashboard integrity and include Care Plan Sync audit results. | Section F only. |
| G | Framework Health Check | Validate framework readiness and include Care Plan Sync health result. | Section G only. |
| H | Signoff | Provide release signoff / readiness status. | Section H only. |
| I | Summary | Summarize consolidated QA results. | Section I only. |
| J | Timing Summary | Summarize timing log and recent bottlenecks. | Section J only. |


### Original Table 16 (10 rows x 3 columns)

| Order | Sheet / Template Definition | Header Audit Required |
| --- | --- | --- |
| 1 | Raw Data | Yes |
| 2 | Banners | Yes |
| 3 | CP Due Date | Yes |
| 4 | Unlock CP | Yes |
| 5 | Demo P | Yes |
| 6 | Master List | Yes |
| 7 | Monthly Change | Yes |
| 8 | Disenrolled Exclusion List | Yes |
| 9 | Master List Change Log | Yes |


### Original Table 17 (10 rows x 2 columns)

| Template | Approved Row Count |
| --- | --- |
| Raw Data | 6500 |
| Banners | 400 |
| CP Due Date | 400 |
| Unlock CP | 400 |
| Demo P | 2500 |
| Master List | 400 |
| Monthly Change | 1000 |
| Disenrolled Exclusion List | 800 |
| Master List Change Log | 1000 |


### Original Table 18 (10 rows x 2 columns)

| Mapping Term | Definition |
| --- | --- |
| Raw Data | Pulled directly from the monthly report import. Raw Data is the source of Primary PMR Row assignment. |
| Demo P | Copied or derived from formatted active Raw Data rows. Demo P uses copy-first/process-once/write-once architecture. |
| Sync from Banners | Updated from the Banners after Banner processing. |
| Sync Unlock CP | Updated from the Unlock CP using PMR-based matching. |
| Sync Care Plan Due | Updated from the CP Due Date using Participant Name + Enrollment Date matched to Participant Name + Capitation Date. |
| Process | Generated by script logic such as address combining, notes, contact summaries, Banner Summary, phone labeling, Primary PMR Row designation, or update tracking. |
| <blank> | Intentionally present but not populated by current workflow. |
| Dashboard Quality | Generated by QA tests and framework health checks into the consolidated Dashboard Quality Report. |
| Timing | Generated by timing logger into Current Timing Report and summarized in Dashboard Quality Section J. |


### Original Table 19 (3 rows x 4 columns)

| Sync | Match Rule | Fields Synchronized | Target |
| --- | --- | --- | --- |
| Unlocked CP Sync | Unlocked CP PMR # matches Master List Participant PMR#. | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date. | Master List Primary PMR Row only. |
| Care Plan Due Sync | Care Plan Due Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date. | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type. | Master List Primary PMR Row only. |


### Original Table 20 (4 rows x 3 columns)

| Header | Source | Required Value Standard |
| --- | --- | --- |
| Demo P Update Status | Process | Created / Updated / Processed status as produced by Demo P processing. |
| Demo P Update Month | Process | Current processing month in mm.yy format. |
| Demo P Source Sheet | Process | Raw Data mm.yy source sheet name. |


### Original Table 21 (4 rows x 3 columns)

| Header | Source | Required Value Standard |
| --- | --- | --- |
| Master List Update Status | Process | Created / Updated / Unchanged / Synced status as produced by Master List processing. |
| Master List Update Month | Process | Current processing month in mm.yy format. |
| Master List Source Sheet | Process | Demo P mm.yy source sheet name or approved source sheet reference. |


### Original Table 22 (12 rows x 2 columns)

| Rule Area | v2.0 UPDATEDv1 Rule |
| --- | --- |
| Required Sections | Enrollments, Disenrollments, Demographic Changes, Caseload Changes, Contact Changes, Banner Changes, Care Plan Changes. |
| Duplicates | No duplicates are allowed except approved Contact Changes logic. |
| Enrollments | Included when Capitation Date is the current report month. |
| Disenrollments | Included when Disenrollment Date, Disenrollment Effective Date, or Date of Death meets the previous-month/current workflow rule. |
| Contact Fields | Route to Contact Changes according to approved current production logic. |
| Banner Fields | Route to Banner Changes. |
| Caseload Fields | Route to Caseload Changes. |
| Oxygen | Routes to Service Changes unless superseded by final business rule. |
| Primary PMR Row-only Changes | Handled as Primary Row Update without replacing all participant source/detail rows. |
| Raw Data/Demo P Primary Rows Only | Monthly Change processing compares against the current Raw Data/Demo P Primary PMR row architecture and shall not recreate secondary Master List rows. |
| Standalone Disenrolled | Disenrolled Exclusion List is created through its standalone workflow and may be used to exclude disenrolled participants from inappropriate non-disenrollment change reporting. |


### Original Table 23 (11 rows x 2 columns)

| Processing Rule | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Primary Operational Repository | Master List is the primary operational participant repository. |
| Row Architecture | Master List contains Primary PMR Rows only. |
| Synchronization Target | Only the Primary PMR Row is the downstream synchronization target. |
| Sync-Derived Values | All sync-derived values must be consolidated onto the Primary PMR Row. |
| Source/Detail Rows | Source/detail rows are retained in Raw Data and Demo P where needed for processing and auditability, but shall not be written as secondary operational Master List rows. |
| Processing Includes | Banner Summary, address processing, language processing, split and label phones, contact summary, notes combination, update tracking, synchronization, sorting if retained by production script, and validation. |
| One Pass Update Architecture | Compare current Demo P to prior Master List, identify changed participants/Primary PMR rows, and update only necessary rows. |
| Primary PMR-Only Changes | If changes are limited to Primary PMR Row fields, replace/update only the Primary PMR Row. |
| Care Plan Sync | Unlocked CP sync and Care Plan Due sync must populate Master List Primary PMR Rows only. |
| Update Tracking | Master List Update Status, Master List Update Month, and Master List Source Sheet are governed process fields. |


### Original Table 24 (15 rows x 2 columns)

| Data Category | Ownership Target |
| --- | --- |
| Banner fields | Primary PMR Row |
| Care Plan fields | Primary PMR Row |
| Unlocked CP fields | Primary PMR Row |
| HHA fields | Primary PMR Row |
| O2 fields | Primary PMR Row |
| PAP fields | Primary PMR Row |
| PERS fields | Primary PMR Row |
| Processing summaries | Primary PMR Row |
| Contact summaries | Primary PMR Row |
| Notes summaries | Primary PMR Row |
| Banner Summary | Primary PMR Row |
| Contact Summary | Primary PMR Row |
| Participant Summary fields | Primary PMR Row |
| Update tracking fields | Primary PMR Row |


### Original Table 25 (4 rows x 2 columns)

| Processing Step | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Read | Read required sheet values once or in the fewest practical bulk reads. |
| Process | Construct Banner Summary flags, execute address processing, generate contact summaries, aggregate notes, apply phone labels, apply update tracking, and use existing Primary PMR Row ownership. |
| Write | Commit processed values to the sheet in a final consolidated write stage whenever practical. |


### Original Table 26 (12 rows x 4 columns)

| Source | Match Rule | Target | Notes |
| --- | --- | --- | --- |
| Banner | Participant PMR# / approved Banner matching logic | Primary PMR Row | Banner flags and Banner Summary synchronize to Primary PMR Row. |
| Care Plan Due | Participant Name + Enrollment Date to Participant Name + Capitation Date | Primary PMR Row | Sync Enrollment Date, Last Care Plan, Next Care Plan Due, CP Type. |
| Unlocked Care Plan | PMR # to Participant PMR# | Primary PMR Row | Sync Participant Name, PMR #, IDT Meeting Date, Care Plan Start Date. |
| HHA CP | Approved HHA CP matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| HHA ISR | Approved HHA ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| O2 ISR | Approved O2 ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| PAP ISR | Approved PAP ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| PERS ISR | Approved PERS ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| Secondary Contact Rows | Not a synchronization target | Contact Processing Only | Contact/source rows are used for processing, not sync target output. |
| Demo P Update Tracking | Process generated | Primary PMR Row | Demo P Update Status, Month, Source Sheet. |
| Master List Update Tracking | Process generated | Primary PMR Row | Master List Update Status, Month, Source Sheet. |


### Original Table 27 (3 rows x 3 columns)

| Validation | Dashboard Quality Location | Purpose |
| --- | --- | --- |
| Unlocked CP Sync Validation | Section F Dashboard Audit and Section G Framework Health Check | Verify PMR-based sync and missing/unmatched CP fields. |
| Care Plan Due Sync Validation | Section F Dashboard Audit and Section G Framework Health Check | Verify Participant Name + Enrollment Date to Participant Name + Capitation Date sync. |


### Original Table 28 (10 rows x 3 columns)

| Source FieldSource Field | SourceSource | Processing RuleProcessing Rule |
| --- | --- | --- |
| Last Name | Banners / Raw Data | Used for identity support and report context. |
| First Name | Banners / Raw Data | Used for identity support and report context. |
| Participant PMR# | Banners / Raw Data | Primary participant match key for Banner synchronization. |
| Safety - 2 Person | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Wanderer | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Interpreter Needed | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Fall Risk | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| DPOA or Guardian Active | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Palliative Care | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |


### Original Table 29 (7 rows x 2 columns)

| RuleRule | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Raw Data Banner Fields | Raw Data receives Banner values by Sync from Banners after Banner processing. |
| Master List Banner Fields | Copies from Demo P |
| Banner Summary | Banner Summary is script-built in Demo P Process and must summarize relevant Banner flags on the Primary PMR Row. |
| Primary PMR Target | No Banner value shall be written to a non-primary Master List row. |
| Header Dependency | Banner synchronization depends on governed headers and is validated by Template Header Audit rather than repeated full header verification inside Banner processing. |
| Monthly Formatting | Monthly Banner processing shall use the faster v1.4.21-compatible formatting logic where approved. |


### Original Table 30 (3 rows x 3 columns)

| Report | Source Fields | Purpose |
| --- | --- | --- |
| CP Due Date | Participant Name; Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type | Provides Care Plan Due synchronization fields. |
| Unlock CP | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date | Provides Unlocked CP synchronization fields. |


### Original Table 31 (3 rows x 5 columns)

| StepStep | SynchronizationSynchronization | Match RuleMatch Rule | Fields SyncedFields Synced | TargetTarget |
| --- | --- | --- | --- | --- |
| 1 | Unlocked CP Sync | Unlocked CP PMR # matches Master List Participant PMR#. | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date. | Master List Primary PMR Row only. |
| 2 | Care Plan Due Sync | Care Plan Due Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date. | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type. | Master List Primary PMR Row only. |


### Original Table 32 (10 rows x 3 columns)

| Source FieldSource Field | SourceSource | Processing RuleProcessing Rule |
| --- | --- | --- |
| PMR #/ Participant PMR#. / | Unlocked CP / Master List | Used for identity support and report context. |
| Participant Name | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| IDT Meeting Date | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| Care Plan Start Date | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| Participant Name | CP Due Date / Master List | Used for identity support and report context. |
| Enrollment Date / Capitation Date. | CP Due Date / Master List | Used for identity support and report context. |
| Last Care Plan | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |
| Next Care Plan Due | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |
| CP Type | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |


### Original Table 33 (6 rows x 3 columns)

| Validation AreaValidation Area | Dashboard Quality LocationDashboard Quality Location | Required ResultRequired Result |
| --- | --- | --- |
| Unlocked CP Matches | Section F - Test 10 Dashboard Audit | Report matched, unmatched, and missing key counts. |
| Care Plan Due Matches | Section F - Test 10 Dashboard Audit | Report matched, unmatched, and missing key counts. |
| Unlocked CP Health | Section G - Framework Health Check | Pass/fail summary for Unlocked CP synchronization readiness. |
| Care Plan Due Health | Section G - Framework Health Check | Pass/fail summary for Care Plan Due synchronization readiness. |
| Rows Missing CP Data | Sections F and G | Identify rows missing IDT Meeting Date, Care Plan Start Date, Next Care Plan Due, or CP Type where applicable. |


### Original Table 34 (3 rows x 2 columns)

| SheetSheet | Template / Formatting StandardTemplate / Formatting Standard |
| --- | --- |
| CP Due Date | Monthly formatting uses the faster v1.4.21-compatible production process where approved. Template creation uses corrected template steps. |
| Unlock CP | Monthly formatting uses the faster v1.4.21-compatible production process where approved. Apply Full Template Formatting remains allowed for the Unlocked Care Plan template path. |


### Original Table 35 (9 rows x 2 columns)

| RuleRule | v2.0 UPDATEDv1 Standardv2.0 UPDATEDv1 Standard |
| --- | --- |
| Primary Source | Raw Data is the authoritative monthly import source. |
| Copy First | Demo P must copy active Raw Data rows before performing Demo P processing. |
| Process Once | Demo P applies required process fields in a single consolidated pass whenever practical. |
| Write Once | Demo P should use consolidated writes instead of repeated row-by-row writes. |
| Primary PMR Ownership | Demo P shall not assign, verify, or rescan Primary PMR Row ownership. |
| Banner Memory Sync | Not apart of Demo P processing |
| Disenrolled PMR Exclusion Set | Demo P may use the Disenrolled PMR set to exclude disenrolled PMRs from active Demo P output where approved by workflow. |
| Final Row Height | Demo P shall enforce row height 25 after processing. |


### Original Table 36 (5 rows x 3 columns)

| Required ColumnRequired Column | SourceSource | RuleRule |
| --- | --- | --- |
| Primary PMR Row | Copied from Raw Data | Authoritative ownership marker. Not reassigned in Demo P. |
| Demo P Update Status | Process | Required template/header column populated by Demo P processing. |
| Demo P Update Month | Process | Required template/header column populated with current processing month. |
| Demo P Source Sheet | Process | Required template/header column populated with Raw Data source sheet name. |


### Original Table 37 (4 rows x 2 columns)

| AreaArea | v2.0 UPDATEDv1 Standardv2.0 UPDATEDv1 Standard |
| --- | --- |
| Banner Fields | Not a part of Demo P processing - copies from Raw Data |
| Banner Memory Sync Removal | Not a part of Demo P processing - copies from Raw Data |
| Banner Summary | Banner Summary is generated by script logic and belongs on the Primary PMR Row downstream. |


### Original Table 38 (5 rows x 2 columns)

| Removed / Prohibited StepRemoved / Prohibited Step | Replacement StandardReplacement Standard |
| --- | --- |
| Demo P Working Source - assign Primary PMR Row by sequential block scan | Primary PMR Row is assigned in Raw Data and copied to Demo P. |
| Demo P Working Source - verify Primary PMR Row from Raw Data | No verification step required in Demo P; Template Header Audit validates the column exists. |
| Demo P Working Source - sync newest Banners mm.yy source into memory | Not a part of Demo P processing - copies from Raw Data |
| Repeated Demo P participant scans | Use copy-first/process-once/write-once architecture. |


### Original Table 39 (4 rows x 3 columns)

| HeaderHeader | Required MeaningRequired Meaning | ValidationValidation |
| --- | --- | --- |
| Demo P Update Status | Indicates processing/update status for the Demo P row. | Template Header Audit; optional Dashboard Audit summary. |
| Demo P Update Month | Stores current report month in mm.yy format. | Template Header Audit; optional Dashboard Audit summary. |
| Demo P Source Sheet | Stores the Raw Data source sheet name. | Template Header Audit; optional Dashboard Audit summary. |


### Original Table 40 (9 rows x 2 columns)

| RuleRule | v2.0 UPDATEDv1 Standardv2.0 UPDATEDv1 Standard |
| --- | --- |
| Workflow Name | Create Disenrolled List. |
| Prompt | Create Disenrolled List prompts for the reporting month/date and uses that prompted value for the output sheet name. |
| Output Naming | Disenrolled MM.YY. |
| Source | Raw Data for the prompted month unless otherwise approved by production workflow. |
| PMR Use | Disenrolled PMR sets may be used by Demo P processing to exclude disenrolled PMRs from active output where approved. |
| Template | Disenrolled Exclusion List uses its governed template and approved reduced column set. |
| Final Row Count | Disenrolled template row count standard is 800. |
| Final Row Height | Disenrolled output enforces row height 25 after processing. |


### Original Table 41 (5 rows x 2 columns)

| ValidationValidation | Required BehaviorRequired Behavior |
| --- | --- |
| Template Header Audit | Validates only the approved Disenrolled column set, not removed columns. |
| Dashboard Count | Disenrolled output row count must align with dashboard template row count standard unless source data requires fewer used rows. |
| Date Prompt Naming | Output sheet name must use the month/date from the prompt. |
| No Repair Menu | Repair Disenrolled List shall not appear in menus or framework dispatchers. |


### Original Table 42 (12 rows x 2 columns)

| Development Rule | v2.0 UPDATEDv1 Standard |
| --- | --- |
| Production source | Use Current Production Script v1.7.6 as the current executable baseline. |
| Governing specification | Use Framework Specification v2.0 UPDATEDv1 as the governing authority after final assembly. |
| Historical references | Use v26.9.5, approved v27 workflows, v3.2.2, and v3.4.2 as lineage/reference only unless regression review requires them. |
| Review requirement | Always inspect the full script before modifying. |
| Full replacement requirement | Full replacement scripts only unless explicitly requested. |
| Patch prohibition | No patch snippets for production releases. |
| Code cleanup | Remove obsolete, deprecated, duplicate, orphaned, unused, and dead code. |
| Working logic preservation | Keep working business logic unchanged unless specifically requested or required by approved architecture. |
| Single-file architecture | Maintain clean single-file section architecture until production stabilization is complete. |
| Menu cleanup | Remove retired menu items such as Repair Disenrolled List when retired by specification. |
| Dashboard Quality | Use consolidated Dashboard Quality sections A-J rather than standalone QA report sheets. |


### Original Table 43 (11 rows x 2 columns)

| Rule | Requirement |
| --- | --- |
| Review full script before changes | Required before every production script update. |
| No patch updates | Production releases must be full replacement versions. |
| Full replacement updates | Replace affected functions completely. |
| Remove obsolete logic | Required during every production release. |
| Remove duplicate logic | Required during every production release. |
| Remove orphan code | Required during every production release. |
| Remove dead code | Required during every production release. |
| Remove deprecated helpers | Required during every production release. |
| Build for long-term maintenance | No layered temporary fixes or hidden legacy logic. |
| Preserve approved business logic | Do not rebuild Monthly Change, Master List, Contact, Banner, Care Plan, or Demo P logic unless correcting approved bottlenecks or architecture defects. |


### Original Table 44 (8 rows x 2 columns)

| Review Area | Required Action |
| --- | --- |
| Duplicate function review | Identify and remove duplicate implementations. |
| Duplicate constant review | Remove duplicate or obsolete global constants. |
| Duplicate menu review | Remove duplicate and retired menu items. |
| Unused helper review | Remove helpers that are not referenced by active workflow, audit, QA, menu, or framework functions. |
| Orphan function review | Remove functions not called by menu, workflow, validation, QA test, framework dashboard, or active helper chain. |
| Dead code review | Remove unreachable code paths. |
| Legacy code review | Remove legacy commented-out code and backup functions. |


### Original Table 45 (9 rows x 2 columns)

| Update Step | Requirement |
| --- | --- |
| Review entire script | Required before change. |
| Determine impacted functions | Identify all upstream/downstream dependencies. |
| Replace affected functions completely | Do not layer patches. |
| Verify references | Verify helper, menu, trigger, dashboard, validation, QA, and timing references. |
| Verify menus | Confirm no retired menu item remains. |
| Verify triggers | Confirm no broken trigger references. |
| Verify helpers | Confirm helpers exist exactly once. |
| Update version | Increment version, release notes, and change log. |


### Original Table 46 (16 rows x 2 columns)

| Script Section | Required |
| --- | --- |
| CONFIGURATION | Yes |
| MENU FUNCTIONS | Yes |
| DASHBOARD FUNCTIONS | Yes |
| TEMPLATE FUNCTIONS | Yes |
| FORMATTERS | Yes |
| SYNC FUNCTIONS | Yes |
| MONTHLY CHANGE FUNCTIONS | Yes |
| MASTER LIST FUNCTIONS | Yes |
| DISENROLLMENT FUNCTIONS | Yes |
| VALIDATION FUNCTIONS | Yes |
| FRAMEWORK TEST FUNCTIONS | Yes |
| DASHBOARD QUALITY FUNCTIONS | Yes |
| FRAMEWORK DASHBOARD FUNCTIONS | Yes where retained by production script |
| TIMING FUNCTIONS | Yes |
| HELPER FUNCTIONS | Yes |


### Original Table 47 (9 rows x 2 columns)

| Release Package Item | Required |
| --- | --- |
| Version Number | Yes |
| Change Summary | Yes |
| Removed Code Summary | Yes |
| Helper Audit Summary | Yes |
| Framework Health Check Summary | Yes |
| Testing Checklist | Yes |
| Performance Impact Review | Yes |
| Full Replacement Script | Yes |


### Original Table 48 (12 rows x 2 columns)

| Rule | Requirement |
| --- | --- |
| Patch-style fixes | Not permitted for production releases. |
| Partial production replacements | Not permitted unless explicitly requested. |
| Obsolete logic | Remove. |
| Duplicate logic | Remove. |
| Deprecated logic | Remove. |
| Unused helpers | Remove. |
| Dead code | Remove. |
| Orphan functions | Remove. |
| Commented-out legacy code | Remove. |
| Backup functions | Remove. |
| Unused variables/constants | Remove. |


### Original Table 49 (11 rows x 2 columns)

| Verification Area | Required |
| --- | --- |
| Entire script reviewed | Yes |
| Impacted functions identified | Yes |
| Affected functions completely replaced | Yes |
| Helper references verified | Yes |
| Menu references verified | Yes |
| Trigger references verified | Yes |
| Dashboard references verified | Yes |
| Validation references verified | Yes |
| Dashboard Quality references verified | Yes |
| Timing references verified | Yes |


### Original Table 50 (11 rows x 2 columns)

| Audit / Review | Required |
| --- | --- |
| Full production script inspection | Yes |
| Validation against Framework Specification v2.0 UPDATEDv1 | Yes |
| Operational workflow assessment | Yes |
| Shared helper dependency verification | Yes |
| Custom menu integration verification | Yes |
| Dashboard configuration/reference evaluation | Yes |
| Dashboard Quality section/reference evaluation | Yes |
| Performance timing and execution dependency review | Yes |
| Internal validation rules and logic tree audit | Yes |
| Framework testing regression analysis | Yes |


### Original Table 51 (11 rows x 2 columns)

| Deliverable | Required |
| --- | --- |
| Architecture Audit | Yes |
| Helper Audit | Yes |
| Dependency Audit | Yes |
| Performance Audit | Yes |
| Removed Code Summary | Yes |
| Change Summary | Yes |
| Testing Recommendations | Yes |
| Framework Health Check Summary | Yes |
| Recommended Next Version | Yes |
| Full Replacement Script | Yes |


### Original Table 52 (11 rows x 2 columns)

| Architecture Standard | Must Preserve |
| --- | --- |
| Single File Code Architecture | Yes |
| Primary PMR Row Data Architecture | Yes |
| One Pass Processing Methodology | Yes |
| Dashboard-Driven Formatting Logic | Yes |
| Standardized Template Architecture | Yes |
| Dashboard Quality Consolidated Reporting | Yes |
| Centralized Validation Framework | Yes |
| Template Header Audit | Yes |
| Standardized QA Testing Architecture | Yes |
| Timing Framework | Yes |


### Original Table 53 (7 rows x 2 columns)

| Audit Item | Pass Requirement |
| --- | --- |
| All referenced helper functions exist | Pass required |
| No duplicate helper functions exist | Pass required |
| No orphan helper functions exist | Pass required |
| No unused helper functions exist | Pass required |
| No deprecated helper functions remain | Pass required |
| No helper references are broken | Pass required |


### Original Table 54 (14 rows x 2 columns)

| Reference Area | May Reference Helpers |
| --- | --- |
| Menu Functions | Yes |
| Dashboard Functions | Yes |
| Template Functions | Yes |
| Formatters | Yes |
| Sync Functions | Yes |
| Monthly Change Functions | Yes |
| Master List Functions | Yes |
| Disenrollment Functions | Yes |
| Validation Functions | Yes |
| Framework Test Functions | Yes |
| Dashboard Quality Functions | Yes |
| Timing Functions | Yes |
| Other approved helper functions | Yes |


### Original Table 55 (12 rows x 2 columns)

| Helper | Purpose / Standard |
| --- | --- |
| toBool_ | Boolean normalization. |
| truthy_ | Truthy value normalization. |
| toNumber_ | Numeric normalization. |
| normalizeHeader_ | Header normalization. |
| normalizeAlignment_ | Alignment normalization. |
| normalizeText_ | Text normalization. |
| normalizeKey_ | Key normalization. |
| compareValues_ | Value comparison. |
| getWrapStrategy_ | Wrap strategy normalization. |
| safeColor_ | Color fallback/validation. |
| safeSheetName_ | Safe sheet name generation. |


### Original Table 56 (14 rows x 2 columns)

| Component Category | Required Verification |
| --- | --- |
| MENU FUNCTIONS | Exist and referenced correctly. |
| DASHBOARD FUNCTIONS | Exist and referenced correctly. |
| TEMPLATE FUNCTIONS | Exist and referenced correctly. |
| FORMATTER FUNCTIONS | Exist and referenced correctly. |
| SYNC FUNCTIONS | Exist and referenced correctly. |
| MONTHLY CHANGE FUNCTIONS | Exist and referenced correctly. |
| MASTER LIST FUNCTIONS | Exist and referenced correctly. |
| DISENROLLMENT FUNCTIONS | Create Disenrolled exists; Repair Disenrolled retired/absent. |
| VALIDATION FUNCTIONS | Exist and referenced correctly. |
| FRAMEWORK TEST FUNCTIONS | Exist and referenced correctly. |
| DASHBOARD QUALITY FUNCTIONS | Exist and section assignments A-J are valid. |
| TIMING FUNCTIONS | Exist and write to the current timing log. |
| HELPER FUNCTIONS | Exist and no broken references. |


### Original Table 57 (9 rows x 2 columns)

| Reference Type | Requirement |
| --- | --- |
| Menu references | All menu references exist; retired triggers removed. |
| Helper references | All helper references exist. |
| Dashboard references | All dashboard references exist. |
| Dashboard Quality references | All section references exist and map to A-J. |
| Validation references | All validation references exist. |
| Framework references | All framework references exist. |
| Timing references | All timing references exist. |
| Trigger references | All trigger references exist or retired triggers are removed. |


### Original Table 58 (12 rows x 2 columns)

| Protected Component | Required |
| --- | --- |
| Framework Dashboard / Dashboard Quality | Yes |
| Dashboard Validation | Yes |
| Template Validation | Yes |
| Template Header Audit | Yes |
| Helper Audit | Yes |
| Dependency Audit | Yes |
| Orphan Function Audit | Yes |
| Duplicate Function Audit | Yes |
| Framework Health Check | Yes |
| Timing Logs | Yes |
| Care Plan Sync Validation | Yes, inside Dashboard Audit and Framework Health Check. |


### Original Table 59 (11 rows x 2 columns)

| Criterion | Pass Requirement |
| --- | --- |
| No missing functions | Pass required |
| No missing helpers | Pass required |
| No missing references | Pass required |
| No ReferenceErrors | Pass required |
| No missing framework components | Pass required |
| No missing validation components | Pass required |
| No missing dashboard components | Pass required |
| No missing Dashboard Quality components | Pass required |
| No missing timing components | Pass required |
| Care Plan Sync validation result | Must be present in Sections F and G. |


### Original Table 60 (11 rows x 4 columns)

| Section | Test / Output | Purpose | Standalone Report Sheet |
| --- | --- | --- | --- |
| A | Template Validation | Validate templates and template configuration. | Retired; writes to Section A. |
| B | Template Header Audit | Validate governed headers across templates. | New consolidated section. |
| C | Test 6 Date Formatting | Validate date formatting. | Retired; writes to Section C. |
| D | Test 7 Validation Failure | Validate/report framework validation failures. | Retired; writes to Section D. |
| E | Test 9 Monthly Change Subheaders | Validate Monthly Change sections/subheaders. | Retired; writes to Section E. |
| F | Test 10 Dashboard Audit | Validate dashboard and include CP Sync audit. | Retired; writes to Section F. |
| G | Framework Health Check | Validate release readiness and include CP Sync health. | Retired as standalone report; writes to Section G. |
| H | Signoff | Release readiness/signoff output. | Consolidated. |
| I | Summary | Consolidated QA summary. | Consolidated. |
| J | Timing Summary | Timing summary from current timing log. | Consolidated. |


### Original Table 61 (13 rows x 2 columns)

| Category | Required in v2.0 UPDATEDv1 |
| --- | --- |
| Dashboard Integrity Test | Yes; output in Dashboard Audit section. |
| Template Validation | Yes; output in Section A. |
| Template Header Audit | Yes; output in Section B. |
| Fast Structure Validation | Yes where retained; may be included in Template Validation or Dashboard Audit. |
| Format Preview | Optional/QA as needed; not part of monthly processing. |
| Framework Dashboard / Dashboard Quality | Yes; consolidated output required. |
| Helper Audit | Yes. |
| Dependency Audit | Yes. |
| Orphan Function Audit | Yes. |
| Duplicate Function Audit | Yes. |
| Framework Health Check | Yes; output in Section G. |
| Care Plan Sync Validation | Yes; output in Sections F and G. |


### Original Table 62 (9 rows x 2 columns)

| Retired Output / Behavior | Replacement |
| --- | --- |
| Standalone Template Validation Report | Dashboard Quality Section A. |
| Standalone Test 6 Date Format Report | Dashboard Quality Section C. |
| Standalone Test 7 Validation Failure Report | Dashboard Quality Section D. |
| Standalone Test 9 Monthly Change Subheader Report | Dashboard Quality Section E. |
| Standalone Test 10 Dashboard Audit Report | Dashboard Quality Section F. |
| Standalone Framework Health Check Report | Dashboard Quality Section G. |
| Dashboard Quality hidden-template creation | Direct section updates on existing Dashboard Quality Report. |
| Dashboard Quality full rebuild after all tests | Section I Summary and Section J Timing Summary update only. |


### Original Table 63 (12 rows x 2 columns)

| Category | Review Requirement |
| --- | --- |
| Spreadsheet Reads | Review getValues(), getDisplayValues(), getFormulas(), getBackgrounds(), getFontColors(), getNumberFormats(). |
| Spreadsheet Writes | Review setValues(), setBackgrounds(), setFontColors(), setNumberFormats(), setColumnWidths(), setWrapStrategies(). |
| Formatting Operations | Review backgrounds, font colors, font sizes, alignments, wrap settings, borders, merged cells, hidden columns. |
| Sheet Copy Operations | Review template duplication, monthly sheet creation, archive sheet creation. |
| Data Processing Loops | Review Demo P, Master List, Banner, Monthly Change, validation, Dashboard Quality, and dashboard loops. |
| Template Operations | Review template build/refresh and whether monthly processing rebuilds formatting. |
| Dashboard Operations | Review dashboard reads and caching. |
| Dashboard Quality Operations | Review section-only writes and eliminate full report rebuilds. |
| Validation Operations | Review duplicate validation work and centralize header validation. |
| Monthly Change Operations | Review loop count and repeated reads/writes. |
| Master List Processing Operations | Review sync, update tracking, CP sync, and Primary PMR writes. |


### Original Table 64 (9 rows x 2 columns)

| Priority | Rule |
| --- | --- |
| 1 | Reduce spreadsheet reads. |
| 2 | Reduce spreadsheet writes. |
| 3 | Eliminate repeated formatting. |
| 4 | Eliminate repeated format verification. |
| 5 | Cache dashboard configuration. |
| 6 | Reduce participant processing loops. |
| 7 | Eliminate Dashboard Quality full rebuilds. |
| 8 | Use Template Header Audit instead of repeated process-level header verification. |


### Original Table 65 (5 rows x 2 columns)

| Rating | Use |
| --- | --- |
| None | No expected runtime impact. |
| Low | Minor localized impact. |
| Medium | Moderate impact or workflow-level change. |
| High | Significant impact requiring timing validation. |


### Original Table 66 (4 rows x 2 columns)

| Classification | Use |
| --- | --- |
| Faster | Expected runtime improvement. |
| Same | No material runtime change expected. |
| Slower | Expected runtime increase; must include justification and acceptance rationale. |


### Original Table 67 (10 rows x 2 columns)

| Bottleneck / Slow Pattern | Required Correction |
| --- | --- |
| Dashboard Quality full rebuild | Remove full rebuild; update only assigned sections. |
| Dashboard Quality hidden-template creation | Remove as normal QA step. |
| Framework Health Check erasing report | Write Section G only. |
| Template validation erasing report | Write Section A only. |
| Test 9 separate report creation | Write Section E only; do not create/delete standalone sheets. |
| Demo P Primary PMR verification | Remove; Primary PMR is assigned in Raw Data. |
| Demo P Banner memory sync | Remove separate memory sync passes. |
| Disenrolled repeated template rebuild | Clean duplicate template creation and use governed template once. |
| Repeated formatting in monthly processing | Use template-first formatting and faster v1.4.21-compatible monthly formatting where approved. |


### Original Table 68 (18 rows x 2 columns)

| Order | Template Creation Step |
| --- | --- |
| 1 | Resize sheet |
| 2 | Apply title rows |
| 3 | Apply header row |
| 4 | Apply alternating color rules |
| 5 | Apply data row base style |
| 6 | Apply column widths |
| 7 | Apply date/number formats |
| 8 | Apply hidden/show column settings |
| 9 | Create filter |
| 10 | Apply row heights |
| 11 | Write metadata/signature |
| 12 | Ensure frozen rows |
| 13 | Ensure frozen columns |
| 14 | Ensure tab color |
| 15 | Final date/number format enforcement |
| 16 | Hide template |
| 17 | Complete full template build |


### Original Table 69 (10 rows x 2 columns)

| Template Group | Required Path |
| --- | --- |
| Raw Data | Corrected template creation path; do not use Apply Full Template Formatting as an extra wrapper. |
| Banner | Corrected template creation path; do not use Apply Full Template Formatting as an extra wrapper. |
| Care Plan Due | Corrected template creation path; do not use Apply Full Template Formatting as an extra wrapper. |
| Demo P | Corrected template creation path; do not use Apply Full Template Formatting as an extra wrapper. |
| Monthly Change | Corrected template creation path; do not use Apply Full Template Formatting as an extra wrapper. |
| Unlocked Care Plan | Apply Full Template Formatting path permitted. |
| Master List | Apply Full Template Formatting path permitted. |
| Disenrolled Exclusion | Apply Full Template Formatting path permitted. |
| Master List Change Log | Apply Full Template Formatting path permitted. |


### Original Table 70 (4 rows x 2 columns)

| Removed Step | Reason |
| --- | --- |
| Clear sheet/formats for full build | Unnecessary for newly created full template builds. |
| No existing filter to remove | Not required as a logged template step for new full builds. |
| Apply full template formatting wrapper for corrected-path templates | Duplicates individually logged formatting steps and creates timing confusion. |


### Original Table 71 (9 rows x 2 columns)

| Operation | Permitted During Normal Monthly Processing |
| --- | --- |
| Rename sheet | Yes |
| Apply filter if missing | Yes |
| Apply date values if required | Yes |
| Apply formulas if required | Yes |
| Apply data values | Yes |
| Reapply full column widths | No unless explicitly requested |
| Reapply colors/fonts/alignment/wrap | No unless explicitly requested |
| Repeated format verification | No during normal monthly processing |


### Original Table 72 (9 rows x 2 columns)

| Dashboard Authority Area | Standard |
| --- | --- |
| Sheet definitions | Dashboard controlled. |
| Header definitions | Dashboard controlled. |
| Column definitions | Dashboard controlled. |
| Formatting standards | Dashboard controlled. |
| Sheet behaviors | Dashboard controlled. |
| Template configuration | Dashboard controlled. |
| Processing configuration | Dashboard controlled where applicable. |
| Dashboard Quality section configuration | Dashboard controlled where applicable. |


### Original Table 73 (10 rows x 2 columns)

| Operation | Dashboard Reads/Writes Allowed |
| --- | --- |
| Refresh Dashboard | Yes |
| Build Template | Yes |
| Rebuild Template | Yes |
| Dashboard Validation | Yes |
| Framework QA Testing | Yes |
| Monthly Master List processing | Use cached config; avoid repeated dashboard queries. |
| Demo P processing | Use cached config; avoid repeated dashboard queries. |
| Care Plan synchronization | Use cached config; avoid repeated dashboard queries. |
| Dashboard Quality section update | Write assigned sections only. |


### Original Table 74 (5 rows x 3 columns)

| Release Type | Format | Use |
| --- | --- | --- |
| Major | X.0.0 | Major architecture or workflow redesign. |
| Feature | X.X.0 | New functionality, reports, dashboard capabilities. |
| Bug Fix | X.X.X | Bug fixes, validation fixes, minor improvements. |
| Population Pass | X.X.X Label | Documentation migration or specification completion pass. |


### Original Table 75 (6 rows x 2 columns)

| Item | Standard |
| --- | --- |
| Current production script baseline | v1.7.6 |
| Framework specification target | v2.0 UPDATEDv1 |
| Historical business logic lineage | v26.9.5 + approved v27 workflows |
| Historical dashboard infrastructure lineage | v3.2.2 |
| Historical QA lineage | v3.4.2 |


### Original Table 76 (6 rows x 2 columns)

| Requirement | Required |
| --- | --- |
| Increment version number | Yes |
| Update version header | Yes |
| Update release documentation | Yes |
| Update changelog | Yes |
| Update known issues / open items | Yes when applicable |


### Original Table 77 (11 rows x 2 columns)

| Release Document Item | Required |
| --- | --- |
| Version Number | Yes |
| Release Date | Yes |
| Change Summary | Yes |
| Removed Code Summary | Yes |
| Helper Audit Summary | Yes |
| Framework Health Check Summary | Yes |
| Testing Checklist | Yes |
| Performance Review Summary | Yes |
| Known Issues | Yes |
| Recommended Next Version | Yes |


### Original Table 78 (14 rows x 2 columns)

| Protected Component | v2.0 UPDATEDv1 Status |
| --- | --- |
| Framework Dashboard / Dashboard Quality | Protected; Dashboard Quality sections A-J are the consolidated QA output. |
| Framework QA Tests | Protected. |
| Template Validation | Protected; writes Section A. |
| Template Header Audit | Protected; writes Section B. |
| Dashboard Validation | Protected. |
| Helper Audit | Protected. |
| Dependency Audit | Protected. |
| Orphan Function Audit | Protected. |
| Duplicate Function Audit | Protected. |
| Framework Health Check | Protected; writes Section G. |
| Timing Logs | Protected; summarized in Section J. |
| Dashboard Configuration | Protected. |
| Care Plan Sync Validation | Protected; included in Sections F and G. |


### Original Table 79 (12 rows x 2 columns)

| Protected Behavior | Standard |
| --- | --- |
| Freeze Rows 1-4 | Protected. |
| Freeze Columns A:B | Protected. |
| Header Row 4 | Protected. |
| Data Start Row 5 | Protected. |
| Dashboard-Controlled Formatting | Protected. |
| Dashboard-Controlled Validation | Protected. |
| Dashboard-Controlled Column Widths | Protected. |
| Dashboard-Controlled Date Formats | Protected. |
| Dashboard-Controlled Hidden Columns | Protected. |
| Dashboard Quality section-only updates | Protected. |
| Timestamped Dashboard Quality section headers | Protected. |


### Original Table 80 (13 rows x 2 columns)

| Architecture | Protected Standard |
| --- | --- |
| Single File Architecture | Protected during production stabilization. |
| Primary PMR Row Architecture | Protected. |
| Master List Primary PMR Rows Only | Protected. |
| One Pass Processing Architecture | Protected. |
| Template First Formatting | Protected. |
| Dashboard Configuration Cache | Protected. |
| Framework Dashboard / Dashboard Quality Architecture | Protected. |
| Framework Validation Architecture | Protected. |
| Framework Testing Architecture | Protected. |
| Care Plan Sync Architecture | Protected. |
| Demo P Copy-First / Process-Once Architecture | Protected. |
| Standalone Disenrolled Architecture | Protected. |


### Original Table 81 (11 rows x 2 columns)

| Processing Standard | Protected / Retired Status |
| --- | --- |
| Master List Processing Workflow | Protected. |
| Monthly Change Processing Workflow | Protected. |
| Banner Processing Workflow | Protected. |
| Care Plan Processing Workflow | Protected. |
| Demo P Processing Workflow | Protected with v2.0 UPDATEDv1 copy-first/process-once corrections. |
| Disenrollment Processing Workflow | Protected as standalone Create Disenrolled List. |
| Repair Disenrolled List | Retired; shall not be reintroduced without approval. |
| Demo P Primary PMR reassignment/verification | Retired; Primary PMR assignment occurs in Raw Data. |
| Dashboard Quality full rebuild | Retired; section-only updates required. |
| Standalone QA report sheets | Retired; Dashboard Quality sections A-J required. |


### Original Table 82 (10 rows x 2 columns)

| Data Standard | Protected |
| --- | --- |
| Column Configuration Tables | Yes |
| Sheet Definitions | Yes |
| Data Source Mapping Tables | Yes |
| Color Standards | Yes |
| Naming Standards | Yes |
| Template Row Counts | Yes |
| Demo P Update Tracking Columns | Yes |
| Master List Update Tracking Columns | Yes |
| Disenrolled Reduced Column Set | Yes |


### Original Table 83 (6 rows x 2 columns)

| Required Documentation | Required for Protected Standard Change |
| --- | --- |
| Reason for Change | Yes |
| Impact Analysis | Yes |
| Testing Requirements | Yes |
| Rollback Strategy | Yes |
| Release Blocking Review | Yes |


### Original Table 84 (7 rows x 2 columns)

| Goal | Protected Outcome |
| --- | --- |
| Framework Consistency | Yes |
| Framework Stability | Yes |
| Framework Maintainability | Yes |
| Framework Testability | Yes |
| Framework Reliability | Yes |
| Long-Term Development Integrity | Yes |


### Original Table 85 (103 rows x 8 columns)

| Header | Width | Header Font Size | Date Column | Hide Column | Data Wrap | Horizontal Alignment | Owner/Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AD1 - Phone | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| AD1 - Phone Valid Dates From | 80 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| AD2 - Phone | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| AD2 - Phone Valid Dates From | 110 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| AD2 - Phone Valid Dates To | 110 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| AD3 - Phone | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| AD3 - Phone Valid Dates From | 110 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| AD3 - Phone Valid Dates To | 110 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| Additional Important Information | 105 | 7 |  | Yes | CLIP | left | Dashboard Controlled |
| Address 1 - Street | 250 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Address Line 1 | 240 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Address Line 2 | 90 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Banner Summary | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Capitation Date | 100 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Care Plan Start Date | 100 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Caseload - Activities | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - HCC | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - OT | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - PCP | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - PT | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - RD | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - RN | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - Social Work | 105 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Caseload - Supervising MD | 105 | 7 |  | Yes | CLIP | left | Dashboard Controlled |
| Change Section | 150 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Change Timestamp | 140 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Change Type | 120 | 10 |  | No | CLIP | left | Dashboard Controlled |
| City | 90 | 10 |  | No | CLIP | left | Dashboard Controlled |
| AD1 - Phone Valid Dates To | 110 | 7 | Date | Yes | CLIP | left | Dashboard Controlled |
| Column Header | 180 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Columns With Change | 220 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Company | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 1 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 2 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 3 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 4 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 5 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 6 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 7 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - 8 | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - First Name | 90 | 9 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - Last Name | 90 | 9 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - Notes | 100 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - Primary Language | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Contact - Summary | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| CP Type | 100 | 10 |  | No | CLIP | left | Dashboard Controlled |
| CP Updated | 140 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Custom Field 1 - Label | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Custom Field 1 - Value | 140 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Date of Birth | 90 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Date of Death | 80 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Demo P Source Sheet | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Demo P Update Month | 140 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Demo P Update Status | 140 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Disenrollment Date | 115 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Disenrollment Effective Date | 115 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Disenrollment Reason | 115 | 10 |  | No | CLIP | left | Dashboard Controlled |
| DPOA or Guardian Active | 90 | 7 |  | No | CLIP | left | Dashboard Controlled |
| Enrollment Date | 100 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Enrollment Status | 100 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Equipment | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Face Sheet | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Fall Risk | 60 | 10 |  | No | CLIP | left | Dashboard Controlled |
| First Name | 100 | 10 |  | No | CLIP | left | Dashboard Controlled |
| IDT Meeting Date | 100 | 9 | Date | No | CLIP | left | Dashboard Controlled |
| Interpreter Needed | 95 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Last Care Plan | 100 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Last Name | 165 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Master List Source Sheet | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Master List Update Month | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Master List Update Status | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| New Value | 180 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Next Care Plan Due | 100 | 10 | Date | No | CLIP | left | Dashboard Controlled |
| Notes | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Old Value | 180 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Oxygen | 74 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Palliative Care | 95 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Participant Name | 250 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Participant PMR# | 100 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Phone 1 - Label | 85 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Phone 1 - Value | 85 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Phone 2 - Label | 85 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Phone 2 - Value | 85 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Phone 3 - Label | 85 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Phone 3 - Value | 85 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Phone 4 - Label | 85 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Phone 4 - Value | 85 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Phone Number | 90 | 10 |  | No | CLIP | left | Dashboard Controlled |
| PMR # | 100 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Preferred Name | 120 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Primary Language | 90 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Primary PMR Row | 110 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Relationship | 110 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Report Month | 110 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Residence Type | 95 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Safety - 2 Person | 84 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Source Sheet | 150 | 10 |  | No | CLIP | left | Dashboard Controlled |
| State | 69 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Type of Contact | 90 | 10 |  | Yes | CLIP | left | Dashboard Controlled |
| Updated By | 140 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Wanderer | 90 | 10 |  | No | CLIP | left | Dashboard Controlled |
| Zip | 80 | 10 |  | No | CLIP | left | Dashboard Controlled |


### Original Table 86 (5 rows x 3 columns)

| Sheet | Required Added Headers | Governance |
| --- | --- | --- |
| Demo P | Demo P Update Status; Demo P Update Month; Demo P Source Sheet | Required on Template - Demo P and validated by Template Header Audit. |
| Master List | Master List Update Status; Master List Update Month; Master List Source Sheet | Required on Master List Primary PMR Rows only. |
| Dashboard Quality Report | Dashboard Quality Section; Last Run; Status; Duration / Timing where applicable | Required for timestamped Dashboard Quality sections A-J. |
| Raw Data | Primary PMR Row | Primary PMR ownership is assigned in Raw Data only. |


### Original Table 87 (13 rows x 4 columns)

| Sheet | Purpose | Primary Sources | Processing/Rules |
| --- | --- | --- | --- |
| Raw Data | Authoritative monthly import source and Primary PMR ownership source. | Monthly report import. | Preserve source data. Assign Primary PMR Row here only. Add approved framework-owned columns only. |
| Master List | Primary operational participant repository. | Demo P, Banner, Care Plan Due, Unlocked CP, processing functions. | Contains Primary PMR Rows only. All synced and script-generated participant-level data belongs on the Primary PMR Row. |
| Demo P | Monthly participant processing and comparison sheet. | Raw Data plus Banner sync fields and process-generated Demo P tracking fields. | Copy active Raw Data first, process once, write once. Must include Primary PMR Row and Demo P Update Status/Month/Source Sheet. Does not verify or reassign Primary PMR ownership. |
| Banners | Banner flags source. | Raw Data. | Sync Banner values into Demo P and Master List Primary PMR Row. Monthly formatting follows a faster approved production process. |
| CP Due Date | Care plan due dates source. | Raw Data. | Sync Enrollment Date, Last Care Plan, Next Care Plan Due, CP Type by Participant Name + Enrollment Date to Master List Participant Name + Capitation Date. |
| Unlock CP | Unlocked care plan source. | Raw Data. | Sync Participant Name, PMR #, IDT Meeting Date, and Care Plan Start Date by PMR # to Master List Participant PMR#. |
| Monthly Change | Monthly audit/report output. | Generated by process. | Sections by change type. Primary PMR Row-only changes shall not trigger participant-wide replacement. |
| Disenrolled Exclusion List | Standalone disenrollment tracker/exclusion source. | Raw Data / approved process. | Create Disenrolled List only. Repair Disenrolled removed. Uses prompted month naming and reduced column set. |
| Master List Change Log | Audit/change log. | Generated by process. | Hidden system sheet. |
| Format Dashboard | Formatting and framework control center. | Manual configuration and generated defaults. | Controls templates, reports, validation, timing, Template Header Audit, and Dashboard Quality configuration. |
| Dashboard Quality Report | Authoritative consolidated QA report. | Generated by framework tests, dashboard audit, and health check. | Sections A-J. Section-only updates with timestamps. No hidden-template creation or final full rebuild. |
| Timing Report | Performance log. | Generated by process. | Records step and total seconds. Dashboard Quality Section J summarizes timing. |


### Original Table 88 (79 rows x 2 columns)

| Header | Source |
| --- | --- |
| Last Name | Raw Data |
| First Name | Raw Data |
| Preferred Name | Raw Data |
| Date of Birth | Raw Data |
| Participant PMR# | Raw Data |
| Phone Number | Raw Data |
| Address Line 1 | Raw Data |
| Address Line 2 | Raw Data |
| City | Raw Data |
| State | Raw Data |
| Zip | Raw Data |
| Oxygen | Raw Data |
| Primary Language | Raw Data |
| Residence Type | Raw Data |
| Contact - Last Name | Raw Data |
| Contact - First Name | Raw Data |
| Type of Contact | Raw Data |
| Contact - Primary Language | Raw Data |
| Relationship | Raw Data |
| AD1 - Phone | Raw Data |
| AD1 - Phone Valid Dates From | Raw Data |
| AD1 - Phone Valid Dates To | Raw Data |
| AD2 - Phone | Raw Data |
| AD2 - Phone Valid Dates From | Raw Data |
| AD2 - Phone Valid Dates To | Raw Data |
| AD3 - Phone | Raw Data |
| AD3 - Phone Valid Dates From | Raw Data |
| AD3 - Phone Valid Dates To | Raw Data |
| Company | Raw Data |
| Contact - Notes | Raw Data |
| Capitation Date | Raw Data |
| Enrollment Status | Raw Data |
| Disenrollment Date | Raw Data |
| Disenrollment Effective Date | Raw Data |
| Disenrollment Reason | Raw Data |
| Date of Death | Raw Data |
| Caseload - Social Work | Raw Data |
| Caseload - RN | Raw Data |
| Caseload - PCP | Raw Data |
| Caseload - HCC | Raw Data |
| Caseload - Activities | Raw Data |
| Caseload - OT | Raw Data |
| Caseload - PT | Raw Data |
| Caseload - RD | Raw Data |
| Caseload - Supervising MD | Raw Data |
| Additional Important Information | Raw Data |
| Safety - 2 Person | Banner Sync |
| Wanderer | Banner Sync |
| Interpreter Needed | Banner Sync |
| Fall Risk | Banner Sync |
| DPOA or Guardian Active | Banner Sync |
| Palliative Care | Banner Sync |
| Primary PMR Row | Demo P process |
| Banner Summary | Demo P process |
| Phone 1 - Label | Demo P process |
| Phone 1 - Value | Demo P process |
| Phone 2 - Label | Demo P process |
| Phone 2 - Value | Demo P process |
| Phone 3 - Label | Demo P process |
| Phone 3 - Value | Demo P process |
| Phone 4 - Label | Demo P process |
| Phone 4 - Value | Demo P process |
| Address 1 - Street | Demo P process |
| Custom Field 1 - Label | Demo P process |
| Custom Field 1 - Value | Demo P process |
| Notes | Demo P process |
| Contact - 1 | Demo P process |
| Contact - 2 | Demo P process |
| Contact - 3 | Demo P process |
| Contact - 4 | Demo P process |
| Contact - 5 | Demo P process |
| Contact - 6 | Demo P process |
| Contact - 7 | Demo P process |
| Contact - 8 | Demo P process |
| Contact - Summary | Demo P process |
| Demo P Update Status | Demo P process |
| Demo P Update Month | Demo P process |
| Demo P Source Sheet | Demo P process |


### Original Table 89 (10 rows x 2 columns)

| Header | Source |
| --- | --- |
| Last Name | Unformatted Data |
| First Name | Unformatted Data |
| Participant PMR# | Unformatted Data |
| Safety - 2 Person | Unformatted Data |
| Wanderer | Unformatted Data |
| Interpreter Needed | Unformatted Data |
| Fall Risk | Unformatted Data |
| DPOA or Guardian Active | Unformatted Data |
| Palliative Care | Unformatted Data |


### Original Table 90 (6 rows x 2 columns)

| Header | Source |
| --- | --- |
| Participant Name | Unformatted Data |
| Enrollment Date | Unformatted Data |
| Last Care Plan | Unformatted Data |
| Next Care Plan Due | Unformatted Data |
| CP Type | Unformatted Data |


### Original Table 91 (5 rows x 2 columns)

| Header | Source |
| --- | --- |
| Participant Name | Unformatted Data |
| PMR # | Unformatted Data |
| IDT Meeting Date | Unformatted Data |
| Care Plan Start Date | Unformatted Data |


### Original Table 92 (3 rows x 4 columns)

| Synchronization | Match Rule | Sync Columns | Target |
| --- | --- | --- | --- |
| Unlocked CP Sync | Unlocked CP PMR # matches Master List Participant PMR#. | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date | Master List Primary PMR Row only. |
| Care Plan Due Sync | Care Plan Due Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date. | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type | Master List Primary PMR Row only. |


### Original Table 93 (40 rows x 2 columns)

| Header | Source |
| --- | --- |
| Participant Name | Demo P |
| Preferred Name | Demo P |
| Date of Birth | Demo P |
| Address 1 - Street | Demo P |
| City | Demo P |
| State | Demo P |
| Zip | Demo P |
| Phone 1 - Value | Demo P |
| Phone 2 - Value | Demo P |
| Participant PMR# | Demo P |
| Primary Language | Demo P |
| Residence Type | Demo P |
| Notes | Demo P |
| IDT Meeting Date | Demo P |
| Care Plan Start Date | Demo P |
| Enrollment Date | Demo P |
| Last Care Plan | Demo P |
| Next Care Plan Due | Demo P |
| CP Type | Demo P |
| Completed | Demo P |
| Face Sheet | Demo P |
| HHA | Demo P |
| Oxygen | Demo P |
| Equipment | Demo P |
| Caseload - Social Work | Demo P |
| Caseload - RN | Demo P |
| Caseload - PCP | Demo P |
| Caseload - HCC | Demo P |
| Caseload - Activities | Demo P |
| Caseload - OT | Demo P |
| Caseload - PT | Demo P |
| Caseload - RD | Demo P |
| Caseload - Supervising MD | Demo P |
| Capitation Date | Demo P |
| Master List Update Status |  |
| Master List Update Month |  |
| Master List Source Sheet |  |
| Primary PMR Row | Demo P |
| Enrollment Status | Demo P |


### Original Table 94 (33 rows x 2 columns)

| Header | Source |
| --- | --- |
| Last Name | Raw Data or Demo P |
| First Name | Raw Data or Demo P |
| Preferred Name | Raw Data or Demo P |
| Date of Birth | Raw Data or Demo P |
| Participant PMR# | Raw Data or Demo P |
| Phone Number | Raw Data or Demo P |
| Address Line 1 | Raw Data or Demo P |
| Address Line 2 | Raw Data or Demo P |
| City | Raw Data or Demo P |
| State | Raw Data or Demo P |
| Zip | Raw Data or Demo P |
| Oxygen | Raw Data or Demo P |
| Primary Language | Raw Data or Demo P |
| Residence Type | Raw Data or Demo P |
| Capitation Date | Raw Data or Demo P |
| Enrollment Status | Raw Data or Demo P |
| Disenrollment Date | Raw Data or Demo P |
| Disenrollment Effective Date | Raw Data or Demo P |
| Disenrollment Reason | Raw Data or Demo P |
| Date of Death | Raw Data or Demo P |
| Caseload - Social Work | Raw Data or Demo P |
| Caseload - RN | Raw Data or Demo P |
| Caseload - PCP | Raw Data or Demo P |
| Caseload - HCC | Raw Data or Demo P |
| Caseload - Activities | Raw Data or Demo P |
| Caseload - OT | Raw Data or Demo P |
| Caseload - PT | Raw Data or Demo P |
| Caseload - RD | Raw Data or Demo P |
| Caseload - Supervising MD | Raw Data or Demo P |
| Additional Important Information | Raw Data or Demo P |
| Primary PMR Row | Raw Data or Demo P |
| Notes | Raw Data or Demo P |


### Original Table 95 (69 rows x 3 columns)

| Header | Source | Section/Rule |
| --- | --- | --- |
| Participant Name | Copy from Demo P | Demographic Changes |
| Preferred Name | Demo P | Demographic Changes |
| Date of Birth | Demo P | Demographic Changes |
| Address 1 - Street | Process | Demographic Changes |
| City | Demo P | Demographic Changes |
| State | Demo P | Demographic Changes |
| Zip | Demo P | Demographic Changes |
| Phone 1 - Value | Demo P | Demographic Changes |
| Phone 2 - Value | Demo P | Demographic Changes |
| Participant PMR# | Demo P | Demographic Changes |
| Primary Language | Demo P | Demographic Changes |
| Residence Type | Demo P | Demographic Changes |
| Notes | Process | Demographic Changes |
| IDT Meeting Date | Demo P |  |
| Care Plan Start Date | Demo P |  |
| Enrollment Date | Demo P |  |
| Last Care Plan | Demo P |  |
| Next Care Plan Due | Demo P |  |
| CP Type | Demo P |  |
| Oxygen | Demo P | Service Changes |
| Caseload - Social Work | Demo P | Caseload Changes |
| Caseload - RN | Demo P | Caseload Changes |
| Caseload - PCP | Demo P | Caseload Changes |
| Caseload - HCC | Demo P | Caseload Changes |
| Caseload - Activities | Demo P | Caseload Changes |
| Caseload - OT | Demo P | Caseload Changes |
| Caseload - PT | Demo P | Caseload Changes |
| Caseload - RD | Demo P | Caseload Changes |
| Caseload - Supervising MD | Demo P | Caseload Changes |
| Capitation Date | Demo P | Enrollments if Date = current month |
| Enrollment Status | Demo P |  |
| Disenrollment Date | Demo P | Disenrollment if Date = previous month |
| Disenrollment Effective Date | Demo P | Disenrollment if Date = previous month |
| Disenrollment Reason | Demo P |  |
| Date of Death | Demo P | Disenrollment if Date = previous month |
| Contact - Last Name | Demo P | Contact Changes |
| Contact - First Name | Demo P | Contact Changes |
| Type of Contact | Demo P | Contact Changes |
| Contact - Primary Language | Demo P | Contact Changes |
| Relationship | Demo P | Contact Changes |
| AD1 - Phone | Demo P | Contact Changes |
| AD1 - Phone Valid Dates From | Demo P | Contact Changes |
| AD1 - Phone Valid Dates To | Demo P | Contact Changes |
| AD2 - Phone | Demo P | Contact Changes |
| AD2 - Phone Valid Dates From | Demo P | Contact Changes |
| AD2 - Phone Valid Dates To | Demo P | Contact Changes |
| AD3 - Phone | Demo P | Contact Changes |
| AD3 - Phone Valid Dates From | Demo P | Contact Changes |
| AD3 - Phone Valid Dates To | Demo P | Contact Changes |
| Company | Demo P | Contact Changes |
| Contact - Notes | Demo P | Contact Changes |
| Safety - 2 Person | Demo P | Banner Changes |
| Wanderer | Demo P | Banner Changes |
| Interpreter Needed | Demo P | Banner Changes |
| Fall Risk | Demo P | Banner Changes |
| DPOA or Guardian Active | Demo P | Banner Changes |
| Palliative Care | Demo P | Banner Changes |
| Last Name | Demo P | Demographic Changes |
| First Name | Demo P | Demographic Changes |
| Phone Number | Demo P | Demographic Changes |
| Address Line 1 | Demo P | Demographic Changes |
| Address Line 2 | Demo P | Demographic Changes |
| Additional Important Information | Demo P | Demographic Changes |
| PMR # | Demo P | Demographic Changes |
| Primary PMR Row | Raw Data / Demo P | Primary Row Update |
| Demo P Update Status | Process | Internal tracking; not a change section unless approved |
| Demo P Update Month | Process | Internal tracking; not a change section unless approved |
| Demo P Source Sheet | Process | Internal tracking; not a change section unless approved |


### Original Table 96 (48 rows x 2 columns)

| Header | Source |
| --- | --- |
| Last Name | Primary Data |
| First Name | Primary Data |
| Preferred Name | Primary Data |
| Date of Birth | Primary Data |
| Participant PMR# | Primary Data |
| Phone Number | Primary Data |
| Address Line 1 | Primary Data |
| Address Line 2 | Primary Data |
| City | Primary Data |
| State | Primary Data |
| Zip | Primary Data |
| Oxygen | Primary Data |
| Primary Language | Primary Data |
| Residence Type | Primary Data |
| Contact - Last Name | Primary Data |
| Contact - First Name | Primary Data |
| Type of Contact | Primary Data |
| Contact - Primary Language | Primary Data |
| Relationship | Primary Data |
| AD1 - Phone | Primary Data |
| AD1 - Phone Valid Dates From | Primary Data |
| AD1 - Phone Valid Dates To | Primary Data |
| AD2 - Phone | Primary Data |
| AD2 - Phone Valid Dates From | Primary Data |
| AD2 - Phone Valid Dates To | Primary Data |
| AD3 - Phone | Primary Data |
| AD3 - Phone Valid Dates From | Primary Data |
| AD3 - Phone Valid Dates To | Primary Data |
| Company | Primary Data |
| Contact - Notes | Primary Data |
| Capitation Date | Primary Data |
| Enrollment Status | Primary Data |
| Disenrollment Date | Primary Data |
| Disenrollment Effective Date | Primary Data |
| Disenrollment Reason | Primary Data |
| Date of Death | Primary Data |
| Caseload - Social Work | Primary Data |
| Caseload - RN | Primary Data |
| Caseload - PCP | Primary Data |
| Caseload - HCC | Primary Data |
| Caseload - Activities | Primary Data |
| Caseload - OT | Primary Data |
| Caseload - PT | Primary Data |
| Caseload - RD | Primary Data |
| Caseload - Supervising MD | Primary Data |
| Additional Important Information | Primary Data |
| Notes | Primary Data |


### Original Table 97 (13 rows x 2 columns)

| Sheet Type | Color |
| --- | --- |
| CP Due Date | #65CC99 |
| Unlock CP | #65CCC3 |
| Banners | #65A9CC |
| Demo P | #657FCC |
| Master List | #7665CC |
| Monthly Change | #A165CC |
| Master List Change Log | #CC65CC |
| Disenrolled Exclusion List | #CC65A1 |
| Index | #668BCC |
| Raw Data | Dashboard-defined |
| Dashboard Quality Report | Dashboard-defined |
| Timing Report | Dashboard-defined |


### Original Table 98 (12 rows x 3 columns)

| Sheet Name | Report Title | Example |
| --- | --- | --- |
| Raw Data | Raw Data | Raw Data 05.26 |
| Demo P | Demographics - Participants | Demo P 05.26 |
| Banners | Banner Report | Banners 05.26 |
| Unlocked CP | Unlocked Care Plan Report | Unlocked CP 05.26 |
| CP Due | CP Due Date | CP Due 05.26 |
| Monthly Change | Monthly Change Report | Monthly Change 05.26 |
| Master List | Master List | Master List 05.26 |
| ML Change Log | Master List Change Log | ML Change Log |
| Disenrolled | Disenrolled Exclusion List | Disenrolled 05.26 |
| Dashboard Quality Report | Dashboard Quality Report | Dashboard Quality Report |
| Timing Report | Timing Report | Timing Report |


### Original Table 99 (11 rows x 3 columns)

| Test / Section | Purpose | Pass Criteria |
| --- | --- | --- |
| Section A - Template Validation | Verify template presence, row counts, formatting controls, and template configuration. | No template validation failures. |
| Section B - Template Header Audit | Verify required headers exist on governed templates. | No missing required template headers. |
| Section C - Test 6 Date Formatting | Verify all date columns apply display format. | Date columns formatted mm/dd/yyyy. |
| Section D - Test 7 Validation Failure | Report validation failures and issue details. | Validation failures reported without breaking report structure. |
| Section E - Test 9 Monthly Change Subheaders | Verify Monthly Change section/subheader structure. | No missing Monthly Change subheaders. |
| Section F - Test 10 Dashboard Audit | Verify dashboard sections/configuration and include CP Sync audit. | No missing dashboard sections/config values; CP Sync audit present. |
| Section G - Framework Health Check | Verify framework readiness, components, references, dependencies, and CP Sync health. | Framework healthy; no ReferenceErrors. |
| Section H - Signoff | Provide release signoff/readiness status. | Signoff section populated. |
| Section I - Summary | Summarize consolidated QA results. | Summary reflects Sections A-H. |
| Section J - Timing Summary | Summarize current timing report and bottleneck findings. | Timing summary present and current. |


### Original Table 100 (9 rows x 2 columns)

| Retired Standalone Report | Replacement |
| --- | --- |
| Template Validation Report | Dashboard Quality Section A. |
| Test 6 Date Format Report | Dashboard Quality Section C. |
| Test 7 Validation Failure Report | Dashboard Quality Section D. |
| Test 9 Monthly Change Subheader Report | Dashboard Quality Section E. |
| Test 10 Dashboard Audit Report | Dashboard Quality Section F. |
| Framework Health Check Report | Dashboard Quality Section G. |
| Dashboard Quality hidden-template creation | Removed. |
| Dashboard Quality full rebuild after testing | Removed. Only Sections I and J update after test sections. |


### Original Table 101 (8 rows x 2 columns)

| Release Review Area | Required Checklist |
| --- | --- |
| Pre-Release Review | Version Number Updated; Changelog Updated; Release Notes Updated; Framework Specification Alignment Checked. |
| Code Review | Syntax Review; Brace Balance Review; Parenthesis Balance Review; Bracket Balance Review; Full Script Review. |
| Reference Review | Menu References Verified; Helper References Verified; Trigger References Verified; Dashboard References Verified; Dashboard Quality References Verified; Validation References Verified; Timing References Verified. |
| Audit Review | Architecture Audit; Helper Audit; Dependency Audit; Orphan Function Audit; Duplicate Function Audit; Framework Health Check. |
| Testing Review | Dashboard Quality Sections A-J generated/updated; Template Validation; Template Header Audit; Date Formatting; Validation Failure; Monthly Change Subheaders; Dashboard Audit; Framework Health Check. |
| Performance Review | Spreadsheet Reads Reviewed; Spreadsheet Writes Reviewed; Formatting Operations Reviewed; Sheet Copy Operations Reviewed; Dashboard Quality Rebuilds Removed; Data Loop Review Completed. |
| Release Approval Criteria | No ReferenceErrors; No Missing Helpers; No Missing Functions; No Failed Framework Tests; No Failed Health Checks; No Critical Performance Issues. |


### Original Table 102 (9 rows x 2 columns)

| Package Area | Required Items |
| --- | --- |
| Required Release Information | Version Number; Release Date; Release Type; Author. |
| Change Documentation | Change Summary; Functions Added; Functions Modified; Functions Removed; Framework Components Updated; Dashboard Components Updated; Dashboard Quality Components Updated; Validation Components Updated; Testing Components Updated. |
| Code Removal Documentation | Removed Functions; Removed Helpers; Removed Constants; Removed Menus; Removed Legacy Code; Removed Deprecated Components; Removed Retired QA Reports/Repair Disenrolled where applicable. |
| Audit Documentation | Architecture Audit; Helper Audit Summary; Dependency Audit Summary; Orphan Function Audit Summary; Duplicate Function Audit Summary; Framework Health Check Summary. |
| Testing Documentation | Tests Executed; Dashboard Quality Section Results; Test Results; Pass Count; Fail Count; Known Issues. |
| Performance Documentation | Performance Impact; Expected Runtime Change; Performance Review Summary; Optimization Notes; Timing Summary. |
| Required Deliverables | Full Replacement Script; TXT Download; Release Notes; Testing Summary; Recommended Next Version. |
| Release Completion Standard | A release is complete only when all required release package components have been provided. |


### Original Table 103 (24 rows x 4 columns)

| Decision | Status | Reason / Standard | Reference |
| --- | --- | --- | --- |
| Single File Architecture | Approved | Simplifies deployment during active development and remains required through production stabilization. | Section 16.D |
| Dashboard Driven Formatting | Approved | Centralizes formatting configuration through dashboard tables. | Section 7 |
| Dashboard Controlled Templates | Approved | Templates are generated from dashboard configuration and are formatting authority. | Sections 7, 8, 20.A |
| Template First Formatting | Approved | Formatting is applied during template creation; monthly processing uses verified templates. | Section 20.A |
| Dashboard Controlled Column Standards | Approved | Column widths, hidden columns, date formats, fonts, and alignments originate from dashboard configuration. | Section 8 and Appendix A |
| Dashboard Configuration Loaded Once Per Process | Approved | Reduces dashboard reads and participant-loop overhead. | Section 20.B |
| Verified Templates Are Formatting Authority | Approved | Output sheets inherit formatting from templates; monthly processing does not rebuild formatting. | Section 20.A |
| Primary PMR Row Architecture | Approved | All participant-level sync data belongs on the Primary PMR Row. | Section 11.1 |
| Master List Primary PMR Rows Only | Approved v1.7.6 | Master List now contains Primary PMR Rows only; secondary operational Master List rows are retired. | Sections 11 and Appendix B |
| Primary PMR Assignment in Raw Data Only | Approved v1.7.6 | Primary PMR ownership is assigned in Raw Data and copied downstream; Demo P does not verify/reassign. | Sections 11.1, 14 |
| One Pass Processing Architecture | Approved | Read once, process once, write once whenever practical. | Sections 11.2, 20 |
| Demo P Copy-First / Process-Once Architecture | Approved v1.7.6 | Demo P copies Raw Data first, processes once, and writes once; repeated PMR scans removed. | Section 14 |
| Demo P Update Tracking Columns | Approved v1.7.6 | Demo P Update Status, Demo P Update Month, Demo P Source Sheet are required. | Appendix A/C |
| Care Plan Two-Stage Sync | Approved v1.7.6 | Unlocked CP sync runs by PMR#; Care Plan Due sync runs by Participant Name + Enrollment Date to Capitation Date. | Sections 13, Appendix C |
| Dashboard Quality Consolidation | Approved v1.7.6 | QA reports are consolidated into Dashboard Quality Sections A-J. | Sections 7, 19, Appendix F |
| Template Header Audit | Approved v1.7.6 | Centralized header audit replaces duplicate header verification inside individual processes. | Sections 8, 19, Appendix F |
| Remove Dashboard Quality Hidden Template/Rebuild | Approved v1.7.6 | Dashboard Quality uses section-only updates and no full rebuild after testing. | Sections 7, 19, Appendix F |
| Standalone Create Disenrolled List | Approved v1.7.6 | Create Disenrolled List is standalone; Repair Disenrolled is retired. | Sections 15, Appendix B/C |
| Disenrolled Reduced Column Set | Approved v1.7.6 | Contact-detail, banner, phone-label, and Demo P tracking columns removed from Disenrolled requirements. | Appendix C |
| Full Replacement Production Updates | Approved | Production releases must be complete replacement versions. | Section 16 |
| Testing Recommended After Every Update | Approved | Testing reduces deployment risk during active development. | Section 19 |
| Performance Review Required Before Release | Approved | Performance regressions must be identified before deployment. | Section 20 |
| Protected Standards Enforcement | Approved | Protected standards may not be removed, bypassed, or redesigned without approval. | Section 22 |


### Original Table 104 (11 rows x 2 columns)

| Status Area | Current v2.0 UPDATEDv1 / v1.7.6 Standard |
| --- | --- |
| Framework Status | Production Stabilization. |
| Current Production Baseline | v1.7.6 |
| Governing Specification | v2.0 UPDATEDv1 after final assembly. |
| Historical References | v26.9.5 + approved v27 workflows; Dashboard Infrastructure v3.2.2; QA Framework v3.4.2. |
| Architecture Status | Single File Architecture; Dashboard Driven Formatting; Template First Formatting; Primary PMR Row Architecture; Master List Primary PMR Rows Only; One Pass Processing; Dashboard Quality Consolidation. |
| Development Focus | Stabilize v1.7.6; complete v2.0 UPDATEDv1 specification; continue timing optimization for Demo P, Disenrolled, and Dashboard Quality section writes. |
| Current Priority 1 | Validate v1.7.6 against Dashboard Quality A-J. |
| Current Priority 2 | Confirm Template Header Audit against current production headers. |
| Current Priority 3 | Confirm Care Plan Sync validation in Dashboard Audit and Health Check. |
| Current Priority 4 | Continue performance review of Disenrolled and Demo P processing. |


### Original Table 105 (8 rows x 2 columns)

| Open Item | Status / Direction |
| --- | --- |
| Timing optimization of Demo P processing | Continue monitoring; copy-first/process-once/write-once is the governed architecture. |
| Timing optimization of Disenrolled write performance | Continue monitoring; use standalone Create Disenrolled List and governed template once. |
| Dashboard Quality section write timing | Monitor; no hidden-template creation or full rebuild allowed. |
| Template Header Audit validation | Confirm current headers for Raw Data, Demo P, Master List, Disenrolled, and all templates. |
| Care Plan Sync validation | Confirm Sections F and G include Unlocked CP and Care Plan Due validation. |
| Appendix A current production headers | Maintain as production headers evolve. |
| Future modularization review | Deferred until production stabilization is complete. |


### Original Table 106 (14 rows x 2 columns)

| Confirmed Slow Operation / Finding | Approved Optimization / Correction |
| --- | --- |
| Repeated setColumnWidths() | Template First Formatting; verified templates are formatting authority. |
| Repeated setBackgrounds() | Template First Formatting; avoid monthly formatting rebuilds. |
| Repeated setFontSizes() | Template First Formatting; avoid repeated formatting passes. |
| Repeated format verification | Only run during Build/Refresh/Rebuild/Verify Template, Framework QA Tests, or Dashboard Validation. |
| Repeated dashboard reads | Dashboard Configuration Cache; load once per process whenever practical. |
| Repeated getValues()/setValues() cycles | Read once, process once, write once. |
| Dashboard Quality hidden-template creation | Removed as normal QA step. |
| Dashboard Quality full rebuild after testing | Removed; section-only updates plus Summary/Timing updates. |
| Framework Test 9 separate sheet creation/deletion | Removed; Test 9 writes Dashboard Quality Section E only. |
| Demo P Primary PMR verification scan | Removed; Primary PMR assigned in Raw Data and copied to Demo P. |
| Demo P Banner memory synchronization pass | Removed; Banner synchronization remains Banner workflow. |
| Disenrolled repeated template rebuild | Clean duplicate template creation; create from governed template once. |
| Monthly formatting rebuilds | Use verified templates and faster approved production formatting paths. |
