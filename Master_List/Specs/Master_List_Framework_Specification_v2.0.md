<!-- markdownlint-disable MD013 MD022 MD024 MD032 MD033 MD056 MD058 MD060 -->

# Master List Framework Specification v2.0

**Authoritative implementation:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.

**Authoritative dashboard governance source:** `Format Dashboard`. The Format Dashboard governs worksheet definitions, report titles, output naming patterns, template names, template sizes, sheet behaviors, header order, source-of-data lineage, column formatting, presentation standards, template governance, output visibility, and system-sheet surfaces.

**Implementation-source-of-truth rule:** This specification documents the current production framework as implemented in v1.7.6. When this specification, prior specifications, inventories, reports, or draft PDFs conflict with the current production script, the current production script controls. Earlier v1.6.x and v1.9 references are historical unless explicitly restated here as current v2.0 governance.

## 1. Executive Authority and Scope

The Master List Framework is a single-file Google Apps Script production framework for dashboard-governed monthly source formatting, Demo P processing, Monthly Change reporting, Disenrollment management, Master List creation/update, Dashboard Quality governance, template governance, Index / archive lifecycle management, timing instrumentation, cache optimization, system-sheet management, and release verification.

The framework preserves the approved production business rules implemented in v1.7.6. This specification is not a redesign mandate. It is the governing technical reference for future development and must be kept aligned to the production script whenever implementation behavior changes.

## 2. Protected Production Manifest

The v1.7.6 production script contains 15,785 lines and 672 declared functions: 64 public Apps Script-callable functions and 608 internal underscore helpers. The framework remains a protected single-file Apps Script architecture until a versioned migration explicitly approves a different layout.

Protected production surfaces include:

| Surface | Governance |
|---|---|
| Version constants | `MASTER_LIST_MERGE_ML_VERSION`, `RFF_VERSION`, rebuild-section markers, template feature flags, archive/index configuration keys, timing limits, date constants, header rows, sheet constants, and global sheet naming constants. |
| Public entry points | Menu callbacks, trigger callbacks, web-app callback, workflow callbacks, validation callbacks, dashboard callbacks, timing callbacks, and compatibility wrappers. |
| Private helpers | Internal helpers use trailing underscores and are not public API surfaces unless referenced by triggers, dynamic invocation, or menu callback registries. |
| Dashboard schema | Format Dashboard section names, section columns, sheet types, header names, template definitions, column definitions, sheet behavior definitions, and system-sheet surfaces are protected. |
| Template schema | Template names, title/header rows, row/column sizing, signatures, hidden-template behavior, row-height locks, and data/date/number formats are protected. |
| Dashboard Quality schema | Dashboard Quality fixed sections A-Q, section keys, shell structure, section-only writes, timestamps, summaries, signoff, and validation rows are protected evidence outputs. |
| Sheet lifecycle | Index-first ordering, Demo P active position, operational sheet ordering, system/template tail block, archive visibility, monthly active/import archive controls, and hidden-sheet rules are protected. |
| Data ownership | Raw Data, Demo P, Primary PMR Row, Monthly Change, Disenrolled Exclusion, Master List, Archive - Demo P, Banner, Care Plan Due, and Unlocked Care Plan ownership boundaries are protected. |

AI and human changes must preserve public API names, menu callback strings, trigger entry points, web-app parameters, Format Dashboard schema, template metadata/signature behavior, cache invalidation paths, Dashboard Quality evidence outputs, archive/index restore behavior, and timing evidence unless an approved versioned migration updates all affected surfaces together.

## 3. Format Dashboard Authority

| Format Dashboard Section | Governing Scope |
|---|---|
| SECTION A - GLOBAL SETTINGS | Header row, data start row, freeze settings, row heights, default widths, date/number/text formats, wrapping, alignment, font, colors, HSL levels, border style, and template version. |
| SECTION B - TITLE ROWS | Title row purposes, value sources, target cells, row heights, font sizes, font weight, fill levels, alignment, wrapping, and notes. |
| SECTION C - SHEET DEFINITIONS | Sheet type, report title, template name, output naming pattern, base color, prompt-date usage, end-date source, row count, column count, row mode, minimum rows, buffer rows, test rows, and test-row usage. |
| SECTION D - COLUMN DEFINITIONS | Header-level width, header font size, date-column flag, hidden-column flag, data wrap, horizontal alignment, vertical alignment, and number format. |
| SECTION E - SHEET BEHAVIORS | Title-row usage, filters, alternating colors, subheaders, hidden templates, and output visibility. |
| SECTION F - SHEET HEADERS | Sheet type, column order, header name, and source-of-data lineage. |
| SECTION G - SYSTEM SHEET SURFACES | System sheet name, display name, sort order, output visibility, title colors, global defaults, and notes. |

Format Dashboard values are runtime-editable only where loaders and validators support them. Format Dashboard schema, section names, column order, sheet types, template names, header names, behavior keys, and system-surface identities are protected.

## 4. Configuration Architecture

The framework uses layered configuration sources. Configuration ownership is not exclusively dashboard-based.

| Configuration Source | Examples | Governance |
|---|---|---|
| Script constants | Version, sheet names, prefixes, timing limits, template feature flags, default archive spreadsheet ID, row/header constants, date formats, dashboard read width, sheet tab order, system sheets, and template names. | Protected defaults in the production script. Changes require versioned review. |
| Format Dashboard | Sheet definitions, headers, column definitions, behaviors, presentation defaults, system-sheet surfaces, and report/template governance. | Governing editable framework configuration after dashboard validation. |
| Document properties | `RFF_ARCHIVE_SPREADSHEET_ID`, `ML_INDEX_RESTORE_WEB_APP_URL`, index signatures, template signatures, Dashboard Quality section state, and workflow-busy/deferred-index state. | Runtime/deployment configuration and persistent operational state. |
| Runtime cache | Dashboard config cache, sheet/header/header-map caches, monthly sheet lookup cache, template signature cache, Dashboard Quality cache, timing state cache. | Execution optimization only; cache must be invalidated after governed mutations. |

Configuration callbacks must remain available for deployment-specific properties, including archive spreadsheet ID and Index restore web-app URL.

## 5. Production Runtime Flow

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

## 6. Governing Workflow Order

### 6.1 Format Monthly Sheets

`formatMonthlySheets` is the bulk monthly import-formatting workflow. It prompts once for a locked report month and processes available source tabs using the following route table:

| Route Code | Import Meaning | Output / Processing Owner |
|---|---|---|
| `B` | Banner source import | Banner formatting workflow. |
| `CD` | Care Plan Due source import | Care Plan Due dashboard/template formatting workflow. |
| `UC` | Unlocked Care Plan source import | Unlocked Care Plan dashboard/template formatting workflow. |
| `RD` | Raw Data source import | Raw Data formatting and downstream Demo P source workflow. |

If a route has no matching source tab for the prompted month, the workflow logs the skip and continues with remaining routes. Missing optional imports do not automatically invalidate the whole formatting workflow.

### 6.2 Create Monthly Update

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

### 6.3 Standalone Workflow Entry Points

Standalone callbacks remain available for targeted operation and troubleshooting:

| Workflow | Public Entry Point |
|---|---|
| Format monthly imports | `formatMonthlySheets` |
| Format Banner | `formatBannerReport` |
| Format Care Plan Due | `formatCarePlanDueReport` |
| Format Unlocked Care Plan | `formatUnlockedCarePlanReport` |
| Format Raw Data | `formatRawData` |
| Build Demo P from scratch | `buildDemoPFromScratch` |
| Update Demo P monthly sync | `updateDemoPMonthlySync` |
| Build Monthly Change Report | `buildMonthlyChangeReport` |
| Create / update Disenrolled List | `createDisenrolledList` |
| Create Master List | `createMasterList` |
| Create Monthly Update | `runMonthlyUpdate` |

## 7. Public APIs, Menus, Triggers, and Web App Surfaces

The current production script exposes 64 public Apps Script-callable functions. Public functions omit trailing underscores. Internal helpers use trailing underscores. Public functions, wrapper aliases, menu callbacks, trigger entry points, and web-app routes are protected.

### 7.1 Menu Architecture

`onOpen` creates the top-level `Master List` menu with these governed submenu groups:

| Menu Group | Current Menu Responsibilities |
|---|---|
| Data & Processing Engine | Format monthly sheets, Create Monthly Update, Demo P update/build, Disenrolled List, Monthly Change Report, and Master List creation. |
| Sheet & Layout Management | Organize tabs, hide/archive monthly import sheets, hide/archive monthly active sheets, hide/show templates, hide/show system sheets, clear timing logs, and toggle timing. |
| Quick Start-up | System setup, build templates + validate templates, and Dashboard Quality workflow. |
| Maintenance/Rebuild | Quality workflow shortcuts and individual format-sheet shortcuts. |
| Start-up | Setup system sheets, rebuild Format Dashboard, save active layout defaults, create/refresh templates, build Index, restore selected archive row, configure Index restore web-app URL, and configure archive spreadsheet ID. |

Menu callback strings must stay synchronized with their public functions and any callback registries used for framework validation.

### 7.2 Trigger and Web App Surfaces

| Surface | Entry Point | Governance |
|---|---|---|
| Simple open trigger | `onOpen` | Builds the Master List menu and must remain Apps Script-callable. |
| Edit trigger surface | `onEdit` | Handles supported edit-time framework behavior and must remain stable where configured. |
| Optional web app restore route | `doGet(e)` | Routes Index restore hyperlinks using `restoreTarget` and `action` parameters, document lock protection, and archive restore helpers. |
| Index restore configuration | `configureIndexRestoreWebAppUrl` | Sets or clears the document-property URL used by restore hyperlinks. |
| Archive spreadsheet configuration | `configureArchiveSpreadsheetId` | Sets or clears the document-property archive spreadsheet ID override. |

## 8. Sheet Definitions, Lifecycle, and Ordering

### 8.1 Governing Sheet Categories

| Category | Sheets / Prefixes |
|---|---|
| Index | `Index` |
| Active operational sheets | `Demo P`, `Monthly Change`, `Master List`, `Disenrolled Exclusion` |
| Demo P archive sheet | `Archive - Demo P` |
| Formatted monthly import outputs | `Raw Data`, `Banners`, `Banner Report`, `CP Due`, `Care Plan Due Date Report`, `Unlock CP`, `Unlocked Care Plan` |
| Unformatted source imports | `B`, `CD`, `UC`, `RD` and month-labeled variants |
| System sheets | `Framework Timing Report`, `Dashboard Quality Report`, `Format Dashboard` |
| Templates | `Template - Banner Report`, `Template - Care Plan Due`, `Template - Unlocked Care Plan`, `Template - Raw Data`, `Template - Demo P`, `Template - Disenrolled Exclusion`, `Template - Master List`, `Template - Monthly Change`, `RFF_BASE_TEMPLATE` |

### 8.2 Global Sort Order

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

### 8.3 Monthly Sheet Lifecycle

Monthly import and monthly active sheet lifecycle controls are distinct:

| Lifecycle Area | Scope |
|---|---|
| Monthly import sheets | Raw Data, Banner, Care Plan Due, and Unlocked Care Plan source/output tabs; governed by monthly import hide/archive menu callbacks. |
| Monthly active sheets | Master List, Monthly Change, and Demo P active output categories; governed by monthly active hide/archive menu callbacks. |
| Demo P retained archive | `Archive - Demo P` stores Demo P rows replaced during monthly synchronization. |
| External cold storage | Configured archive spreadsheet stores copied/archived monthly sheets and is surfaced through the Index archive grid. |
| Restore lifecycle | Users may restore archive sheets through the selected Index archive row menu callback or optional web-app hyperlink routing. |

## 9. Data Governance and Lineage

Format Dashboard Section F is the governing data dictionary for sheet header order and source-of-data lineage. Format Dashboard Section D is the governing presentation dictionary for column formatting. Demo P raw/flat transformations, Sync Functions, Monthly Change comparisons, Master List copy logic, and Disenrollment exclusion flows must preserve header names, PMR normalization, DOB handling, contact lineage, source maps, and dashboard-governed template outputs.

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

## 10. Mapping, Column, and Header Governance

Mapping definitions are governed by the production script and the Format Dashboard together:

| Definition Type | Governance Source | Notes |
|---|---|---|
| Sheet definitions | Format Dashboard Section C plus script defaults | Sheet type, report title, template name, output naming pattern, color, prompt-date behavior, end-date source, row/column sizing, and test rows. |
| Column definitions | Format Dashboard Section D plus script defaults | Width, font size, date flag, hidden flag, wrap, alignment, and number format. |
| Header definitions | Format Dashboard Section F plus script defaults | Sheet type, column order, header, and source-of-data lineage. |
| Runtime header maps | Production helpers built from sheet headers | Header lookups must use normalized header maps rather than hard-coded column positions where practical. |
| Source-to-output transformations | Production workflow helpers | Business transformations are implementation-owned and may not be rewritten from documentation alone. |

Specification updates must not rename public headers, sheet types, templates, or mapping keys unless the production script and all affected callers/templates/validators are updated together.

## 11. Template Governance

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

## 12. Dashboard Quality Governance

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

## 13. Index, External Archive, and Restore Governance

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

## 14. Cache and Performance Governance

The framework uses in-memory and persistent caches to reduce SpreadsheetApp calls and preserve workflow evidence. Header, header-map, sheet-dimension, monthly sheet lookup, dashboard config, template signature, index signature, Dashboard Quality section, Dashboard Quality last-run, workflow-busy/deferred-index state, and framework timing state caches are protected.

Cache invalidation is required after sheet mutations, header changes, row/column dimension changes, dashboard rebuilds, monthly archive/delete/rename operations, template refreshes, quality-section writes, and index rebuilds.

Performance rules: batch reads, bulk writes, in-memory transforms, maps/sets, cached lookups, range lists, timing reports, and recommendation rows are preferred. Changes must not introduce repeated cell-by-cell reads/writes or repeated full-sheet scans when existing batch patterns are available.

## 15. Quality, Validation, Error Handling, and Timing

Quality gates are implemented through Dashboard Quality startup, template validation, full quality workflow, framework smoke validation, framework health check, Raw Data validation, Care Plan sync diagnostics, Demo P validation, Disenrolled Exclusion validation, Monthly Change validation, workflow synchronization verification, summary, and signoff sections.

Error handling uses two primary patterns:

| Pattern | Use |
|---|---|
| Blocking hard stop | Missing required source/output dependency, invalid active source sheet, unsafe monthly update state, missing required headers, invalid PMR identity, restore conflicts, destructive operation preflight failure, or any data-integrity condition that would corrupt governed output. |
| Best-effort warning | Non-critical formatting, sorting, hiding, telemetry, optional dashboard-quality section update, optional archive/index visibility operation, or UI polish failure where the core data operation can safely proceed. |

Timing wrappers preserve performance evidence through `runFrameworkTimed_`, runtime timing helpers, framework timing report sections, thresholds, recommendations, compact section updates, and retention limits. Timing evidence feeds Dashboard Quality Performance Summary and Framework Health reporting.

## 16. AI Development Governance

AI agents must preserve approved business logic, public API names, menu callback strings, trigger entry points, web-app parameters, Format Dashboard schema, template names, sheet types, header names, system surface definitions, cache invalidation, timing instrumentation, dashboard quality evidence, Index/archive restore behavior, and wrapper compatibility.

Before removing any function, constant, configuration key, menu entry, trigger, sheet definition, template definition, header, or compatibility wrapper, verify direct callers, indirect callers, menu callback strings, trigger references, web-app routes, `google.script.run`, dynamic invocation, document-property usage, templates, dashboard validators, and external consumers.

AI may propose changes, but protected production rules may only be modified through explicit approval and coordinated updates to production code, Format Dashboard defaults, templates, validators, tests, timing expectations, Dashboard Quality expectations, and inventories.

## 17. Reference Package Status

The historical v1.6.29 reference package remains useful background, but it is not current implementation authority for v1.7.6. Any incorporated inventory should be regenerated or revalidated before being treated as governing for future implementation work.

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

## 18. Release Statement

This v2.0 specification is the current-state governing specification for the Master List Framework as implemented by Current Production Script v1.7.6. It is production-facing, implementation-bound, dashboard-governed, archive/index-aware, and intended to supersede earlier framing as a specification artifact while preserving approved business logic embodied in the current production script.
