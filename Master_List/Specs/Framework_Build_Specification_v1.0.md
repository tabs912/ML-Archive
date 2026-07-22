# Master List Framework Specification v2.2

| Build Field | Value |
|---|---|
| Status | Current rebuilt framework specification. |
| Implementation authority | **Master_List/Current Production Script/v1.8.9_Current_Production**. |
| Prior governing baseline reviewed | **Master_List/Specs/v1.9_Master_List_Framework_Specifications_Final_Governing_Edition.pdf**. |
| Current draft package reviewed | **Master_List/Specs/ML _Framework_v2.0_Drafts**. |
| Supporting references reviewed | **Master_List/Specs**, **Master_List/Audit Summary**, and **Master_List/v2_Framework_Reference**. |
| Build output | **Master_List/Specs/Framework_Build_Specification_v1.0.md**. |

## Document Formatting Standard

This Markdown source follows **Master_List/Specs/Framework_Spec_Formatting_Requirements**. File names, file paths, sheet names, template names, dashboard section names, and menu commands are written in bold body text so the documentation builder can render them as Bold Cambria. Apps Script functions, constants, and document-property keys are written as code identifiers so the builder can render them in Consolas.

## Framework Overview

The Master List Framework is a single-file Google Apps Script production framework for monthly source formatting, Demo P processing, Monthly Change reporting, Disenrolled Exclusion governance, Master List generation, Banner synchronization, Care Plan Due synchronization, Unlocked Care Plan synchronization, dashboard-governed formatting, template governance, Index/archive lifecycle management, timing instrumentation, quality validation, and release-readiness evidence.

This specification rebuilds the prior v1.9 governing framework into a current v1.8.9 implementation-bound specification. Historical framework documents, v2.0 drafts, audit summaries, and v2 reference inventories are supporting sources. The current production script is the source of truth when any supporting document conflicts with implementation.

### Current Production Baseline

| Item | Current Value |
|---|---|
| Production script | **Master_List/Current Production Script/v1.8.9_Current_Production** |
| Framework version constant | `1.8.9` |
| Production script length | 15,871 lines |
| Declared functions | 679 |
| Public Apps Script-callable functions | 64 |
| Internal underscore helpers | 615 |
| Dashboard configuration sections | A-H |
| Dashboard Quality sections | A-R |

### Framework Purpose

The framework exists to:

1. Preserve monthly source data and processing evidence.
2. Produce governed monthly report outputs from approved templates.
3. Maintain Primary PMR row ownership as the participant-level synchronization destination.
4. Convert Raw Data into Demo P participant/contact rows.
5. Compare current and prior month source data through Monthly Change reporting.
6. Maintain Disenrolled Exclusion records and Demo P replacement retention.
7. Synchronize Banner, Care Plan Due, and Unlocked Care Plan data into Master List output.
8. Maintain Index visibility across active workbook tabs and external archive tabs.
9. Validate dashboard, template, source, workflow, and output readiness.
10. Preserve Framework Timing and Dashboard Quality evidence for maintenance and release decisions.

### Protected Design Principles

| Principle | Governance Rule |
|---|---|
| Production source of truth | Production v1.8.9 governs behavior over prior specs, drafts, reports, and inventories. |
| Single-file Apps Script architecture | The framework remains a single production script until an approved versioned migration changes this. |
| Dashboard-governed configuration | Format Dashboard is the editable configuration surface where loaders and validators support runtime values. |
| Template-first output | Governed reports are created from templates, populated in batch, then finalized with targeted fixes. |
| Primary PMR ownership | Participant-level synchronized fields belong on the Primary PMR row. |
| Consolidated QA | Dashboard Quality Report is the single consolidated QA and signoff surface. |
| Safe lifecycle management | Sheet hide/archive/restore/delete operations must validate protected surfaces and workbook safety first. |
| Public compatibility | Public callbacks, menu strings, trigger entry points, web routes, and wrappers are protected. |

## Framework Architecture

### Architecture Layers

| Layer | Responsibility |
|---|---|
| Constants and feature flags | Define version, sheet types, prefixes, templates, archive defaults, row constants, timing limits, date behavior, and guarded feature switches. |
| Runtime configuration | Load Format Dashboard sections, document properties, and workbook state. |
| Runtime cache | Cache dashboard config, sheet lookups, headers, header maps, dimensions, template signatures, timing state, and dashboard quality state. |
| Formatting/template layer | Build templates, validate signatures, copy template structure, apply row/column/header formatting, and preserve hidden template state. |
| Workflow layer | Run startup, monthly source formatting, Monthly Update, Demo P, Monthly Change, Disenrolled Exclusion, Master List, Index, archive, restore, and QA workflows. |
| Data-transformation layer | Normalize headers and PMR keys, flatten Raw Data, compare current/prior data, map source rows, and synchronize participant-level fields. |
| Quality and timing layer | Write Dashboard Quality Sections A-R and Framework Timing sections; classify performance and validation evidence. |
| Governance layer | Protect approved public surfaces, naming standards, sheet schemas, dashboard sections, templates, mappings, safe-change rules, and versioning. |

### Module Organization

The implementation is physically one Apps Script file but logically divided into subsystems: configuration, runtime cache, dashboard setup/load/validation, template creation/validation, report formatting, monthly processing, Demo P processing, Monthly Change, Master List, Disenrolled Exclusion, Index/archive/restore, Dashboard Quality, Framework Timing, health checks, workflow sync verification, sheet organization, and general utilities.

### Dependency Boundaries

- Production logic may read historical intent only through implemented constants, helpers, dashboard defaults, and workflow code.
- Dashboard values are authoritative only when production loaders read them and validators accept them.
- Templates are authoritative for formatting but not for business transformations.
- Reports and PDFs are evidence artifacts; they do not override production code.
- Archive workbook data is runtime data, not repository implementation source.

## Configuration Framework

### Configuration Authority Order

| Authority | Examples | Change Control |
|---|---|---|
| Production constants | Version, sheet types, names, prefixes, templates, row constants, feature flags, archive ID default. | Versioned code review required. |
| Format Dashboard | Sheet definitions, behaviors, tab organization, columns, headers, system surfaces. | Editable at runtime after validation. |
| Document properties | Archive spreadsheet ID override, restore web app URL, signatures, busy/deferred state, quality-section state. | Runtime/deployment configuration. |
| Runtime cache | Dashboard, headers, maps, dimensions, monthly sheets, timing state. | Non-authoritative optimization; must be invalidated after mutations. |

### Format Dashboard Sections

| Section | Implemented Scope |
|---|---|
| **SECTION A - GLOBAL SETTINGS** | Header row, data start row, frozen rows/columns, row heights, default formats, font, color, HSL levels, border style, template version. |
| **SECTION B - TITLE ROWS** | Title row purposes, value source, labels, target cells, heights, font size/weight, fill level, alignment, wrap, notes. |
| **SECTION C - SHEET DEFINITIONS** | Sheet type, report title, template name, output naming pattern, base color, prompt-date usage, end-date source, template row/column counts, row mode, minimum rows, buffer rows. |
| **SECTION D - SHEET BEHAVIORS** | Title-row use, filters, alternating colors, subheaders, hidden template state, output visibility. |
| **SECTION E - SYSTEM SHEET SURFACES** | System sheet name, display name, sort order, output visibility, title colors, use-global-defaults flag, notes. |
| **SECTION F - TAB ORGANIZATION & INDEX** | Sheet/prefix category ownership, group, rank/range, and special handling for Index and tab organization. |
| **SECTION G - COLUMN DEFINITIONS** | Header-level width, header font size, date-column flag, hidden-column flag, wrap, horizontal/vertical alignment, number format. |
| **SECTION H - SHEET HEADERS** | Sheet type, column order, header name, source-of-data lineage. |

### Version and Feature Flags

Feature flags protect controlled rollout of template refresh, signature cache, staged builds, fast template refresh, full rebuild forcing, output formatting extension, duplicate-template-format enforcement, workflow busy handling, index refresh deferral, and archive behavior. These flags are protected implementation defaults and must not be changed from documentation alone.

### Cache Governance

Cache invalidation is required after dashboard rebuilds, template refreshes, sheet creation/deletion/renaming, header changes, dimension changes, monthly archive/delete operations, Dashboard Quality writes, timing writes, and Index rebuilds. Cached values are never authoritative beyond the current execution context.

## Workflow Architecture

### Menu and Entry Model

`onOpen` creates the workbook menu and connects user-facing operations to public Apps Script-callable functions. Public functions omit trailing underscores. Internal helpers use trailing underscores. Callback names are protected because menus, triggers, web routes, compatibility wrappers, and users may rely on them.

### Startup Workflow

Startup and setup workflows create or refresh system sheets, dashboard defaults, templates, Dashboard Quality shell, Framework Timing shell, Index, and archive/restore configuration surfaces. Startup validation must not destroy business data or rewrite non-owned operational sheets.

### Monthly Source Formatting Workflow

`formatMonthlySheets` prompts for one locked report month and processes the expected source route codes:

| Route | Meaning | Output Ownership |
|---|---|---|
| `B` | Banner source import | Banner formatting workflow and Banner monthly output. |
| `CD` | Care Plan Due source import | Care Plan Due monthly output. |
| `UC` | Unlocked Care Plan source import | Unlocked Care Plan monthly output. |
| `RD` | Raw Data source import | Raw Data monthly output and downstream Demo P source. |

Missing optional imports are skipped and logged when safe; invalid active source sheets and missing required dependencies fail before mutation.

### Create Monthly Update Workflow

The implemented all-in-one monthly workflow order is:

1. Prompt for the locked report month.
2. Run monthly preflight validation.
3. Build Monthly Change Report for the month.
4. Update Demo P monthly synchronization from Raw Data for changed PMRs.
5. Create/update Disenrolled Exclusion and remove qualifying Demo P rows.
6. Create Master List from updated Demo P and synchronized source data.
7. Refresh Index.
8. Skip full-workbook sheet sorting by design at the final monthly-update step while preserving index/timing evidence.
9. Notify completion and return workflow outputs.

### Standalone Workflow Rule

Standalone public callbacks remain supported for targeted troubleshooting, recovery, or partial monthly operation. Standalone paths must preserve the same validation, ownership, template, timing, cache, and safe-mutation rules as the all-in-one workflow.

### Concurrency Controls

Workflow busy state and deferred Index state prevent overlapping critical workflows and avoid unsafe sheet organization during active processing. Locking is also used for web-app restore routes where archive restoration could collide with active workbook mutation.

## Data Architecture

### Data Ownership

| Data Surface | Owner | Notes |
|---|---|---|
| Raw Data | Source formatting and Demo P/Monthly Change workflows | Source evidence must remain available until downstream validation is complete. |
| Demo P | Demo P processing workflow | Flattened participant/contact operational source for Master List and Disenrollment. |
| Primary PMR Row | Demo P / Raw Data processing | Participant-level output ownership marker; not reassigned downstream. |
| Monthly Change | Monthly Change workflow | Current/prior comparison evidence and Demo P monthly sync dependency. |
| Disenrolled Exclusion | Disenrollment workflow | Exclusion records and retained disenrollment evidence. |
| Master List | Master List workflow | Primary operational output; contains Primary PMR rows only. |
| Banner | Banner workflow | Synchronizes Banner indicators/summary data to Master List Primary PMR rows. |
| Care Plan Due | Care Plan Due workflow | Synchronizes due-date care plan data to Master List Primary PMR rows. |
| Unlocked Care Plan | Unlocked Care Plan workflow | Synchronizes unlocked care plan data to Master List Primary PMR rows. |
| Archive - Demo P | Demo P retention | Stores replaced Demo P rows before monthly body rewrite. |
| External archive workbook | Archive/Index workflows | Cold storage for monthly sheets and Index archive grid. |

### Data Flow

```mermaid
flowchart TD
  A[Imported B/CD/UC/RD Sources] --> B[Monthly Source Formatting]
  B --> C[Raw Data]
  B --> D[Banner]
  B --> E[Care Plan Due]
  B --> F[Unlocked Care Plan]
  C --> G[Demo P Build / Monthly Sync]
  C --> H[Monthly Change]
  H --> G
  G --> I[Disenrolled Exclusion]
  G --> J[Master List]
  D --> J
  E --> J
  F --> J
  I --> K[Dashboard Quality]
  J --> K
  B --> L[Index / Archive]
```

### Transformation Rules

- PMR identifiers must be normalized before matching.
- Header lookups should use normalized header maps rather than raw column positions.
- Demo P flattening converts Raw Data participant/contact information into governed rows and generated processing columns.
- Monthly Change compares current and prior month records across protected change categories.
- Master List receives participant-level synchronized values only on Primary PMR rows.
- Disenrollment processing appends governed exclusion records and removes qualifying Demo P rows only after validation.

## Sheet Architecture

### Sheet Categories

| Category | Sheets / Prefixes |
|---|---|
| Index | **Index** |
| Core operational | **Demo P**, **Disenrolled Exclusion** |
| Monthly active | **Master List mm.yy**, **Monthly Change mm.yy**, **Raw Data mm.yy** |
| Monthly sub-reports | **Banners mm.yy**, **CP Due mm.yy**, **Unlock CP mm.yy** |
| Source data | **Raw Data - Banners**, **Raw Data - Raw Data**, **Raw Data - CP Due**, **Raw Data - Unlocked CP** |
| Unformatted imports | **B**, **CD**, **UC**, **RD** |
| Archive | **Archive - Demo P**, external archive workbook sheets |
| System/configuration | **Framework Timing Report**, **Dashboard Quality Report**, **Format Dashboard** |
| Templates | **Template - Banner Report**, **Template - Care Plan Due**, **Template - Unlocked Care Plan**, **Template - Raw Data**, **Template - Demo P**, **Template - Disenrolled Exclusion**, **Template - Master List**, **Template - Monthly Change**, **RFF_BASE_TEMPLATE** |

### Tab Organization and Lifecycle

| Sheet / Prefix | Group | Rank / Handling | Visibility |
|---|---|---|---|
| Index | System & Configuration | Rank 1 | Never hidden. |
| Demo P | Core Operational | Rank 2 | Never hidden. |
| Disenrolled Exclusion | Core Operational | Rank 10 | Never hidden. |
| Master List mm.yy | Monthly Active | Dynamic rank beginning 21 | Visible operational output. |
| Monthly Change mm.yy | Monthly Active | Dynamic rank beginning 22 | Visible operational output. |
| Raw Data mm.yy | Monthly Active | Dynamic rank beginning 23 | Hidden after creation where configured. |
| Banners / CP Due / Unlock CP mm.yy | Monthly Sub-Reports | Dynamic ranks beginning 24-26 | Hidden after creation / monthly import menu lifecycle. |
| Raw Data - source sheets | Source Data | Dynamic ranks beginning 27-30 | Moved to archive after creation where configured. |
| B / CD / UC / RD | Unformatted | Ranks 300-303 | Source imports. |
| Archive - Demo P | Core Operational | Rank 350 | Always hidden. |
| Framework Timing Report | System & Configuration | Rank 500 | Hidden/shown by system-sheet menu. |
| Dashboard Quality Report | System & Configuration | Rank 501 | Hidden/shown by system-sheet menu. |
| Format Dashboard | System & Configuration | Rank 502 | Hidden/shown by system-sheet menu. |
| Templates | Template | Ranks 801-809 | Hidden/shown by template menu; base template always hidden. |

### Protected Sheet Rules

Framework-owned system sheets, templates, **Index**, **Archive - Demo P**, and `RFF_` sheets are protected from unsafe deletion. Sheet lifecycle operations must avoid permanently exposing hidden templates/system sheets unless a menu action explicitly shows them.

## Column Architecture

Column behavior is governed by Format Dashboard Section G. Header order and source lineage are governed by Section H. Column standards include width, header font size, date flag, hidden flag, wrap, horizontal alignment, vertical alignment, and number format. Header standards include sheet type, order, header name, and source-of-data lineage.

### Column Categories

| Category | Examples / Use |
|---|---|
| Required identity columns | Participant PMR identifiers, names, DOB, enrollment status, Primary PMR Row. |
| Source columns | Imported Raw Data, Banner, Care Plan Due, Unlocked Care Plan fields. |
| Generated processing columns | Primary PMR Row, sort/order fields, update status/month/source tracking, helper fields. |
| Synchronization columns | Banner summary, care plan due/unlocked care plan fields, participant-level merged values. |
| Validation columns | Fields used by quality checks, report validation, duplicate detection, and workflow sync checks. |
| Hidden helper columns | Columns needed for processing or audit but hidden in governed outputs. |
| Presentation columns | Width, wrap, alignment, date/number/text formats, header font size. |

## Mapping Architecture

Mapping is implemented by production helpers and documented by dashboard source lineage. Source mapping must preserve normalized headers, normalized PMR keys, source row lookup maps, generated row values, and Primary PMR row ownership.

### Mapping Standards

1. Use normalized PMR keys for participant matching.
2. Use normalized headers/header maps for column lookup.
3. Treat production source-to-output helpers as the mapping authority.
4. Preserve source lineage in Format Dashboard Section H.
5. Synchronize participant-level source data to Primary PMR rows only.
6. Fail before mutation when required identity or source columns are missing.
7. Log warnings for optional source gaps that do not compromise governed output.

### Major Mapping Paths

| Source | Destination | Governance |
|---|---|---|
| Raw Data | Demo P | Flatten participant/contact rows and generate Primary PMR ownership. |
| Raw Data current/prior | Monthly Change | Compare protected categories and write monthly change sections. |
| Demo P | Master List | Copy Primary PMR operational participant rows. |
| Demo P | Disenrolled Exclusion | Append qualifying disenrolled Primary PMR rows and remove retained rows. |
| Banner | Master List | Synchronize Banner data to Primary PMR rows. |
| Care Plan Due | Master List | Synchronize care-plan due fields to Primary PMR rows. |
| Unlocked Care Plan | Master List | Synchronize unlocked care-plan fields to Primary PMR rows. |
| Local workbook / external archive | Index | Inventory active and archived tabs and expose restore paths. |

## Template Architecture

Templates are created from Format Dashboard sheet definitions, behaviors, column definitions, header definitions, and global/title presentation settings. The framework supports smart refresh through expected signatures, document-property signatures, and sheet-note signatures.

### Template Inventory

- **Template - Banner Report**.
- **Template - Care Plan Due**.
- **Template - Unlocked Care Plan**.
- **Template - Raw Data**.
- **Template - Demo P**.
- **Template - Disenrolled Exclusion**.
- **Template - Master List**.
- **Template - Monthly Change**.
- **RFF_BASE_TEMPLATE**.

### Template Lifecycle

1. Load dashboard configuration.
2. Ensure base template exists.
3. Resolve sheet definitions, behaviors, columns, and headers.
4. Compare expected and stored signatures.
5. Use metadata-only refresh when signatures match and smart refresh is enabled.
6. Rebuild template when missing, structurally invalid, signature-mismatched, or forced.
7. Validate minimum structure and formatting.
8. Restore governed hidden-template visibility.

### Template Standards

- Templates must have governed title/header rows.
- Header row is row 4 and data begins row 5.
- Date columns use governed date formatting.
- Hidden columns are governed through column definitions.
- Filters, alternating colors, title rows, and subheaders are governed through sheet behaviors.
- Template changes require coordinated dashboard, validator, timing, QA, and documentation updates.

## Dashboard Architecture

### Format Dashboard Governance

Format Dashboard is the editable configuration dashboard. It stores current framework defaults and allows supported formatting/configuration edits. It is rebuilt only through governed callbacks and validated through Dashboard Quality.

### Dashboard Quality Governance

Dashboard Quality Report is the consolidated QA artifact. It contains Sections A-R:

| Section | Title | Ownership |
|---|---|---|
| A | Global Inputs Verification | Dashboard global/title inputs. |
| B | Sheet Definitions Verification | Sheet definitions. |
| C | Sheet Behavior Verification | Sheet behaviors. |
| D | Column Definitions Verification | Column definitions. |
| E | Sheet Headers Verification | Header definitions and lineage. |
| F | Tab Organization & Index Verification | Tab organization/index configuration. |
| G | Template Structure & Validation | Template existence, structure, formatting, and signatures. |
| H | Format Dashboard Changelog | Dashboard configuration changes. |
| I | Framework Health Check | Required functions, menus, dashboards, templates, timing, workflow, archive, and web surfaces. |
| J | Performance Summary | Framework Timing performance summary. |
| K | Raw Data Validation | Raw Data readiness and quality. |
| L | Care Plan Sync Validation | Care Plan Due / Unlocked Care Plan synchronization readiness. |
| M | Workflow & Synchronization Verification | Workflow/sync expectations, contact processing, Banner, Care Plan, and Primary PMR verification. |
| N | Demo P Quality Validation | Demo P processing quality. |
| O | Disenrolled Exclusion Validation | Disenrollment output quality. |
| P | Monthly Change Validation | Monthly Change report quality. |
| Q | Summary | Consolidated status. |
| R | Signoff | Governance signoff. |

Dashboard Quality writes are section-scoped and must preserve shell structure. Tests should update only assigned sections where possible.

### Framework Timing Governance

Framework Timing Report records process summary, performance issues, optimization recommendations, detailed timing log, and timing evidence. Timing data feeds Dashboard Quality performance and health checks.

## Processing Modules

### Startup and System Setup Module

Purpose: create/repair governed framework system surfaces without overwriting business data.

Inputs: active spreadsheet, constants, dashboard defaults, template definitions, document properties.

Outputs: Format Dashboard, Dashboard Quality Report, Framework Timing Report, templates, Index, archive configuration.

### Monthly Source Formatting Module

Purpose: convert unformatted imported source tabs into governed formatted monthly reports.

Inputs: route-coded source sheets, prompt month, dashboard/template definitions.

Outputs: Raw Data, Banner, Care Plan Due, and Unlocked Care Plan monthly outputs.

### Demo P Module

Purpose: build and maintain the flattened participant/contact processing sheet.

Inputs: Raw Data, existing Demo P, Monthly Change dependency, Disenrolled Exclusion state.

Outputs: Demo P body, Primary PMR ownership, update tracking, Archive - Demo P retained rows.

Business rules:

- Raw Data structure is validated before Demo P processing.
- Primary PMR row assignment occurs during Raw Data / Demo P processing.
- Demo P monthly sync requires Monthly Change availability.
- Replacement rows are validated for PMR coverage before rewrite.
- Replaced rows are archived before Demo P body mutation.

### Monthly Change Module

Purpose: compare current and prior source data and produce governed change evidence.

Inputs: current and prior month source sheets, normalized headers, PMR keys, dashboard/template configuration.

Outputs: Monthly Change report sections for enrollment, disenrollment, demographic, caseload, contact, Banner, and Care Plan categories where implemented.

### Disenrolled Exclusion Module

Purpose: maintain governed exclusion records and remove qualifying rows from Demo P.

Inputs: Demo P, month parts, governed disenrollment fields.

Outputs: Disenrolled Exclusion rows, retained Demo P body, old-row visibility handling, validation evidence.

### Master List Module

Purpose: produce the primary operational participant output.

Inputs: updated Demo P, Master List template, Banner output, Care Plan Due output, Unlocked Care Plan output.

Outputs: Master List containing Primary PMR rows and synchronized participant-level fields.

### Index, Archive, and Restore Module

Purpose: inventory local and archived sheets, support sheet restore, and manage lifecycle actions.

Inputs: active workbook sheets, external archive workbook, archive spreadsheet ID, restore web app URL.

Outputs: Index active grid, archive grid, restore links/actions, copied archive sheets, restored local sheets.

### Dashboard Quality and Health Module

Purpose: validate dashboard, templates, workflow sync, data quality, timing, and release readiness.

Inputs: dashboard, templates, current sheets, timing data, properties, required function registry.

Outputs: Dashboard Quality Sections A-R, framework health evidence, summary, signoff.

## Reporting Architecture

The framework generates workbook-native reports, not repository artifacts. Runtime reports include operational reports, source outputs, Dashboard Quality Report, Framework Timing Report, and Index. Binary PDF exports are review evidence only and should not be committed as implementation artifacts unless explicitly requested.

### Report Standards

- Reports must use dashboard/template-governed formatting.
- Reports must use governed monthly naming patterns.
- Reports must validate required input dependencies before destructive actions.
- Reports must preserve timing and quality evidence when available.
- Reports that produce or archive sheets must refresh Index when safe.

## Validation Framework

### Validation Layers

| Layer | Purpose |
|---|---|
| Active sheet validation | Prevent invalid source/output/system/template sheets from being processed. |
| Dashboard validation | Validate global settings, sheet definitions, behaviors, tab organization, columns, headers, and changelog state. |
| Template validation | Validate template existence, dimensions, headers, formatting, signatures, filters, hidden columns, and row/column counts. |
| Workflow preflight | Validate month selection, required source sheets, required headers, PMR identity, and downstream dependencies. |
| Data-integrity validation | Validate replacement coverage, row counts, synchronization readiness, duplicate/missing keys, and report-specific constraints. |
| Runtime validation | Smoke tests, health checks, workflow synchronization verification, and Dashboard Quality sections. |

### Fail-Fast Rules

Blocking failures must stop before mutation when missing required dependencies, invalid active sheet, unsafe monthly state, invalid PMR identity, missing required headers, archive restore conflict, destructive-operation preflight failure, or data-integrity conditions would corrupt governed output.

Best-effort warnings may be used for noncritical formatting, optional telemetry, optional Dashboard Quality section writes, Index visibility polish, system/template hiding, or timing recommendations when core data integrity is safe.

## Quality Assurance Framework

QA is consolidated into Dashboard Quality. The QA framework validates startup, dashboard configuration, tab organization, templates, raw data, care plan sync, workflow synchronization, Demo P, Disenrolled Exclusion, Monthly Change, performance, framework health, summary, and signoff.

### Acceptance Criteria

A framework build or release is not ready unless:

1. Production script version is identified.
2. Public entry points remain callable.
3. Format Dashboard Sections A-H validate.
4. Templates validate or have documented rebuild requirements.
5. Dashboard Quality Sections A-R are current for the relevant workflow scope.
6. Framework Timing has no unresolved critical runtime findings for release-blocking workflows.
7. Source data and output reports pass required workflow validations.
8. Archive/Index/restore behavior is validated when lifecycle behavior changes.
9. Documentation is synchronized to the production implementation.

## Error Handling Framework

The framework uses explicit errors for unsafe states and warning logs for recoverable noncritical issues. Error handling must preserve user-visible feedback through notifications/alerts and technical evidence through timing, logs, and Dashboard Quality where safe.

### Error Categories

| Category | Handling |
|---|---|
| Missing dependency | Stop workflow and notify user. |
| Invalid active sheet | Stop before processing. |
| Missing required header | Stop before data mutation. |
| PMR identity failure | Stop because matching/sync would be unsafe. |
| Archive/restore conflict | Stop or require explicit resolution. |
| Optional visibility/timing issue | Log warning and continue if output integrity is unaffected. |
| Dashboard Quality write issue | Warn when QA section write is optional; stop only if validation result is required to proceed. |

## Performance Framework

Performance governance preserves v1.9 batch-processing standards while documenting v1.8.9 implementation patterns.

### Performance Standards

- Use batch reads and writes.
- Prefer in-memory arrays and maps/sets.
- Cache dashboard config, headers, header maps, sheet dimensions, monthly sheet lookup, template signatures, and timing state.
- Avoid repeated full-sheet reads where governed ranges are available.
- Avoid `getValue`, `setValue`, and `getRange` inside loops when batch APIs are available.
- Use compact Dashboard Quality section writes.
- Minimize `SpreadsheetApp.flush()`.
- Batch formatting, row hiding, deletion, and resizing where practical.

### High-Complexity Areas

Template rebuild, Dashboard Quality full validation, Monthly Change comparisons, Demo P monthly sync, Master List synchronization, tab organization, archive/index inventory, and external restore workflows require timing evidence and careful dependency review.

## Framework Governance

### Protected Standards

Protected surfaces include:

- Public function names.
- Menu callback strings.
- Trigger entry points.
- Web-app parameters.
- Sheet names and prefixes.
- Template names.
- Format Dashboard section names and columns.
- Dashboard Quality section names and columns.
- Framework Timing schema.
- Tab organization rules.
- Header names and source lineage.
- Primary PMR row ownership.
- Source-to-output mapping behavior.
- Archive/Index/restore behavior.
- Runtime cache invalidation.
- Safe deletion and protected sheet rules.

### Versioning

Every production script receives a new version. Earlier production versions must not be overwritten. Documentation must be updated when production behavior changes, especially when public interfaces, dashboard sections, templates, mappings, validation, report behavior, Index/archive lifecycle, or protected standards change.

### Safe-Change Requirements

Before removing or renaming a function, constant, configuration key, menu entry, trigger, sheet, template, header, property key, or wrapper, maintainers must verify direct callers, indirect callers, menu strings, trigger references, web routes, `google.script.run`, dynamic invocation, properties, templates, validators, health checks, Dashboard Quality sections, and external consumers.

## Function Organization

The implementation contains 679 functions. Public entry points are Apps Script-callable and protected. Internal helpers are trailing-underscore functions and are protected when referenced by workflows, callbacks, validators, registries, dynamic invocation, or tests.

### Public Entry Point Inventory

- `configureArchiveSpreadsheetId`
- `setupReportFormattingDashboard`
- `rebuildFormatDashboardDefaults`
- `quickSystemSetup`
- `quickBuildAllTemplates`
- `refreshFrameworkTimingReport`
- `writeFrameworkTimingPerformanceRecommendations`
- `onEdit`
- `onOpen`
- `toggleFrameworkTiming`
- `formatDashboard`
- `saveActiveLayoutToDashboardSettings`
- `clearDiagnosticsAndTimingLogs`
- `createOrRefreshAllReportTemplates`
- `hideReportTemplates`
- `showReportTemplates`
- `validateReportTemplates`
- `formatMonthlySheets`
- `formatBannerReport`
- `validateActiveBannerFormatterOutput`
- `archiveActiveRawDataSheet`
- `runFrameworkSmokeValidation`
- `hideMonthlyImportSheets`
- `hideMonthlyActiveSheets`
- `archiveMonthlyImportSheets`
- `archiveMonthlyActiveSheets`
- `formatMonthlyChangeSubheaderRow`
- `formatMonthlyChangeSubsectionBlock`
- `getMonthlyChangeSubsectionLabels`
- `formatRawData`
- `formatCarePlanDueReport`
- `formatUnlockedCarePlanReport`
- `buildDemoPFromScratch`
- `updateDemoPMonthlySync`
- `processDemoP`
- `formatDemoPStructure`
- `buildMonthlyChangeReport`
- `runMonthlyUpdate`
- `createMasterList`
- `configureIndexRestoreWebAppUrl`
- `createIndexSheet`
- `restoreSheetFromActiveIndexRow`
- `restoreSheetFromArchiveWorkbook`
- `doGet`
- `assignSortOrderAndHideExtraRows`
- `showAllMasterListRows`
- `hideTemplates`
- `showTemplates`
- `enforceGlobalSheetSortOrder`
- `hideSystemSheetsNow`
- `showSystemSheetsNow`
- `createDisenrolledList`
- `runDashboardQualityStartUp`
- `runDashboardQualityQuick`
- `runDashboardQualityValidateTemplates`
- `runDashboardQualityFull`
- `runAllFrameworkTestsAndBuildDashboard`
- `repairAllTemplateDateFormats`
- `buildCombinedFrameworkTestDashboard`
- `runFrameworkHealthCheck`
- `runWorkflowSyncVerification`
- `setupSystemSheets`
- `verifyFrameworkConfiguration`
- `rebuildProductionMonthlyChangeTemplate`

### Logical Function Groups

| Group | Responsibilities |
|---|---|
| Configuration | Constants, dashboard defaults, archive/restore properties, runtime cache. |
| Menu/trigger/web | `onOpen`, `onEdit`, `doGet`, menu callbacks, web restore routes. |
| Dashboard | Format Dashboard setup/load/repair/validation, changelog, layout snapshot. |
| Template | Template creation, smart refresh, signatures, validation, hiding/showing. |
| Formatting | Monthly source formatting, universal canvas formatting, row/column/date formatting. |
| Demo P | Raw Data flattening, Primary PMR assignment, monthly sync, archive retention. |
| Monthly Change | Prior/current comparison, subsections, subheaders, report formatting. |
| Disenrollment | Disenrolled Exclusion append/remove/format/validation. |
| Master List | Primary-row copy, Banner/Care Plan sync, final output formatting. |
| Index/archive/restore | Active/archive inventories, archive copy/delete, restore actions, web restore. |
| Quality/timing | Dashboard Quality Sections A-R, timing logs, performance summary, health checks. |
| Utilities | Headers, dates, colors, range operations, safe deletion, sorting, normalization. |

## Framework Maintenance

Future work must start from the current production script, current framework specification, current dashboard/template defaults, current audit summaries, and current validation/timing evidence. Historical specs should be used to preserve approved governance, not to reintroduce retired behavior.

### Maintenance Workflow

1. Identify the active production script and version.
2. Review current framework spec, drafts, reports, and audits.
3. Verify affected functions, callers, menus, triggers, properties, sheets, headers, templates, validators, and QA sections.
4. Implement minimal versioned changes.
5. Regenerate or update documentation when behavior changes.
6. Run dashboard/template/workflow validation appropriate to the change.
7. Run repository preparation and verify intended text/source-only diffs.

## Appendices

### Appendix A — Framework Terminology

| Term | Definition |
|---|---|
| Primary PMR Row | Participant representative row that owns participant-level synchronized output. |
| Format Dashboard | Editable dashboard configuration surface. |
| Dashboard Quality Report | Consolidated QA, validation, summary, and signoff surface. |
| Framework Timing Report | Runtime timing and performance evidence surface. |
| Template-first output | Pattern that creates reports from governed templates before writing data. |
| Tab Organization & Index | Format Dashboard Section F governance for sheet/prefix ordering and Index lifecycle. |
| External archive workbook | Cold-storage workbook for archived monthly tabs. |
| Safe deletion | Protected deletion path that rejects framework-owned sheets and validates workbook state. |

### Appendix B — Sheet Inventory

| Sheet / Family | Type |
|---|---|
| Index | System/index. |
| Format Dashboard | Configuration dashboard. |
| Dashboard Quality Report | Quality dashboard. |
| Framework Timing Report | Timing dashboard. |
| RFF_BASE_TEMPLATE | Base template. |
| Template - Banner Report | Output template. |
| Template - Care Plan Due | Output template. |
| Template - Unlocked Care Plan | Output template. |
| Template - Raw Data | Output template. |
| Template - Demo P | Output template. |
| Template - Disenrolled Exclusion | Output template. |
| Template - Master List | Output template. |
| Template - Monthly Change | Output template. |
| Demo P | Core operational. |
| Disenrolled Exclusion | Core operational. |
| Master List mm.yy | Monthly active. |
| Monthly Change mm.yy | Monthly active. |
| Raw Data mm.yy | Monthly active/source output. |
| Banners mm.yy | Monthly sub-report. |
| CP Due mm.yy | Monthly sub-report. |
| Unlock CP mm.yy | Monthly sub-report. |
| Raw Data - Banners | Source data. |
| Raw Data - Raw Data | Source data. |
| Raw Data - CP Due | Source data. |
| Raw Data - Unlocked CP | Source data. |
| B / CD / UC / RD | Unformatted imports. |
| Archive - Demo P | Hidden Demo P retention. |

### Appendix C — Dashboard Quality Reference

- **SECTION A - GLOBAL INPUTS VERIFICATION**
- **SECTION B - SHEET DEFINITIONS VERIFICATION**
- **SECTION C - SHEET BEHAVIOR VERIFICATION**
- **SECTION D - COLUMN DEFINITIONS VERIFICATION**
- **SECTION E - SHEET HEADERS VERIFICATION**
- **SECTION F - TAB ORGANIZATION & INDEX VERIFICATION**
- **SECTION G - TEMPLATE STRUCTURE & VALIDATION**
- **SECTION H - FORMAT DASHBOARD CHANGELOG**
- **SECTION I - FRAMEWORK HEALTH CHECK**
- **SECTION J - PERFORMANCE SUMMARY**
- **SECTION K - RAW DATA VALIDATION**
- **SECTION L - CARE PLAN SYNC VALIDATION**
- **SECTION M - WORKFLOW & SYNCHRONIZATION VERIFICATION**
- **SECTION N - DEMO P QUALITY VALIDATION**
- **SECTION O - DISENROLLED EXCLUSION VALIDATION**
- **SECTION P - MONTHLY CHANGE VALIDATION**
- **SECTION Q - SUMMARY**
- **SECTION R - SIGNOFF**

### Appendix D — Workflow Diagram

```mermaid
flowchart TD
  A[Open Workbook] --> B[onOpen Menu]
  B --> C[Startup / Setup]
  C --> D[Format Dashboard]
  C --> E[Templates]
  C --> F[Dashboard Quality]
  C --> G[Index / Timing]
  B --> H[Format Monthly Sources]
  H --> I[Raw Data / Banner / CP Due / Unlock CP]
  B --> J[Create Monthly Update]
  J --> K[Build Monthly Change]
  K --> L[Update Demo P]
  L --> M[Update Disenrolled Exclusion]
  M --> N[Create Master List]
  N --> O[Refresh Index]
  O --> P[Timing and QA Evidence]
```

### Appendix E — Configuration Reference

| Area | Representative Identifiers |
|---|---|
| Version | `MASTER_LIST_MERGE_ML_VERSION`, `RFF_VERSION`. |
| Archive | `RFF_ARCHIVE_SPREADSHEET_ID`, archive document property. |
| Restore | `ML_INDEX_RESTORE_WEB_APP_URL`. |
| Workflow state | `ML_WORKFLOW_BUSY`, `ML_WORKFLOW_BUSY_STARTED`, `ML_INDEX_REFRESH_DEFERRED`. |
| Dashboard | `RFF_DASHBOARD_SHEET`, section constants A-H, dashboard read width. |
| Templates | `RFF_BASE_TEMPLATE_NAME`, template names, template signature properties. |
| Rows | `HEADER_ROW`, `DATA_START_ROW`, Index row constants. |
| Timing | Timing sheet, runtime logs, performance thresholds, lookback limits. |

### Appendix F — Validation Reference

- Dashboard global/title verification.
- Sheet definition verification.
- Sheet behavior verification.
- Column definition verification.
- Header definition verification.
- Tab organization and Index verification.
- Template structure and validation.
- Framework health check.
- Raw Data validation.
- Care Plan sync validation.
- Workflow and synchronization verification.
- Demo P quality validation.
- Disenrolled Exclusion validation.
- Monthly Change validation.
- Summary and signoff.

### Appendix G — Source Material Status

| Source | Use in Rebuild |
|---|---|
| v1.9 governing framework PDF | Prior governance baseline and coverage model. |
| Current v2.0 drafts | Drafted current-state language and section ideas, updated only where v1.8.9 implements them. |
| Historical specs | Supporting context for dashboard quality, timing, system sheets, and governance decisions. |
| v2 framework reference | Supporting inventories for architecture, cache, templates, wrappers, validation, worksheets, and data flow. |
| Audit summaries | Current review and validation evidence, including v1.8.9 function inventory and exhaustive review. |
| v1.8.9 production script | Implementation source of truth. |

### Appendix H — Additional Data That Would Improve Future Builds

The framework can be maintained from this specification and production source. For a future appendix-only expansion, the most useful additional data would be validated live workbook exports of the current Format Dashboard, Dashboard Quality Report, Framework Timing Report, template tabs, and Index sheet after v1.8.9 deployment. These are not required to document the implemented code architecture, but they would allow exact live-runtime appendix tables to be regenerated without relying only on script defaults.

### Appendix I — v1.9 Coverage Pass

This appendix records the coverage pass from **Master_List/Specs/v1.9_Master_List_Framework_Specifications_Final_Governing_Edition.pdf** into this rebuilt v2.2 specification. Status values mean:

| Status | Meaning |
|---|---|
| Preserved | The v1.9 governance remains valid and is carried forward with no substantive change other than formatting or placement. |
| Updated | The v1.9 governance remains valid but is updated to match production v1.8.9 behavior, names, sections, counts, or workflow order. |
| Replaced | The v1.9 concept is superseded by a newer implemented v1.8.9 framework surface or governance model. |
| Retired | The v1.9 concept is not documented as active because v1.8.9 does not implement it as a current governing surface. |

| v1.9 Section / Appendix | v2.2 Location | Status | Coverage Notes |
|---|---|---|---|
| Purpose and authority preface | Framework Overview; Source Material Status | Updated | Authority is updated from v1.9 / v1.4.23 to production v1.8.9 as implementation source of truth. |
| 1. Executive Overview | Framework Overview | Updated | Core framework purpose is preserved and expanded for v1.8.9 Dashboard Quality A-R and Format Dashboard A-H. |
| 1.1 Framework Purpose | Framework Purpose | Updated | Raw Data, Demo P, Master List, Monthly Change, Disenrollment, template, timing, and validation purposes are carried forward. |
| 1.2 Current Production Baseline | Current Production Baseline | Updated | Baseline is rebuilt to v1.8.9 with current line/function counts and dashboard section counts. |
| 1.3 Primary PMR Row Architecture | Data Architecture; Mapping Architecture; Master List Module | Preserved | Primary PMR row remains the participant-level synchronization owner and is not reassigned downstream. |
| 1.4 Dashboard Quality Architecture | Dashboard Quality Governance; Quality Assurance Framework; Appendix C | Replaced | v1.9 Dashboard Quality A-J is superseded by production v1.8.9 Dashboard Quality Sections A-R. |
| 1.5 Protected Production Architecture | Protected Design Principles; Framework Governance | Updated | Protected architecture is preserved and expanded to include Tab Organization & Index, Dashboard Quality A-R, and v1.8.9 public surfaces. |
| 2. Global Standards | Configuration Framework; Performance Framework; Framework Governance | Updated | Global standards are preserved and updated to v1.8.9 constants, dashboard sections, validation, and performance rules. |
| 3. Sheet Layout Standards | Sheet Architecture; Column Architecture; Template Architecture | Updated | Header/data rows, template-first formatting, filters, hidden columns, row heights, and governed presentation rules are retained under current dashboard section ownership. |
| 4. Color Management Standards | Configuration Framework; Template Architecture; Appendix E | Updated | Color/HSL/font governance is preserved as dashboard-global and template presentation governance. Detailed live color tables require a future dashboard export if exact runtime values are needed. |
| 5. Naming Standards | Sheet Architecture; Framework Governance; Appendix B | Updated | Naming standards are updated to v1.8.9 monthly sheet families, source routes, templates, system sheets, and archive/index surfaces. |
| 6. Sheet Organization Standards | Sheet Architecture; Tab Organization and Lifecycle | Replaced | The old organization model is superseded by Format Dashboard Section F - Tab Organization & Index and the v1.8.9 category/rank model. |
| 7. Dashboard Configuration Standards | Configuration Framework; Format Dashboard Sections | Replaced | v1.9 dashboard governance is replaced by production Format Dashboard Sections A-H. |
| 8. Dashboard Configuration Tables | Format Dashboard Sections; Appendix E | Updated | Section-level table coverage is included; exact row-level dashboard defaults should be generated from v1.8.9 script defaults or live dashboard export for appendix expansion. |
| 9. Data Source Mapping Standards | Data Architecture; Mapping Architecture | Updated | Mapping standards are preserved and updated to normalized PMR/header maps, Primary PMR synchronization, archive/index, and v1.8.9 workflow ownership. |
| 10. Monthly Change Report Rules | Monthly Change Module; Workflow Architecture; Mapping Architecture | Preserved | Monthly Change remains the current/prior comparison workflow and a dependency before Demo P monthly synchronization. |
| 11. Master List Processing Rules | Master List Module; Data Architecture; Mapping Architecture | Preserved | Master List remains the Primary PMR operational output and synchronization target. |
| 11.1 Primary PMR Ownership Standard | Data Ownership; Mapping Standards | Preserved | Primary PMR ownership is carried forward as a protected standard. |
| 11.2 One Pass Processing Standard | Performance Framework | Preserved | One-pass / batch-processing standards are preserved as performance requirements. |
| 11.3 Synchronization Ownership Standard | Mapping Architecture; Master List Module | Preserved | Participant-level synchronization ownership remains on Primary PMR rows. |
| 12. Banner Processing Rules | Monthly Source Formatting Module; Mapping Architecture | Updated | Banner route and synchronization rules are carried forward under v1.8.9 source formatting and Master List sync ownership. |
| 13. Care Plan Processing Rules | Monthly Source Formatting Module; Mapping Architecture; Dashboard Quality Governance | Updated | Care Plan Due and Unlocked Care Plan processing are documented as source formatting and Master List Primary PMR synchronization surfaces with Dashboard Quality Section L validation. |
| 14. Demo P Processing Rules | Demo P Module; Data Architecture | Updated | Demo P initialization, monthly sync, replacement coverage, archive retention, and reactivation sweep behavior are documented for v1.8.9. |
| 15. Disenrollment Processing Rules | Disenrolled Exclusion Module; Data Architecture | Updated | Disenrollment governance is preserved and updated to current exclusion append/remove/format/validation behavior. |
| 16. Framework Development Standards | Framework Governance; Framework Maintenance | Updated | Safe-change and versioned-maintenance governance is preserved and expanded for current public interfaces, dashboards, templates, and validators. |
| 16.1 Architecture Rules | Framework Architecture; Protected Design Principles | Preserved | Single-file architecture and protected architecture rules are carried forward. |
| 16.2 Code Cleanup Requirements | Safe-Change Requirements; Framework Maintenance | Updated | Cleanup remains governed by dependency review and is updated to include current dynamic references, Dashboard Quality, Index/archive, and property usage. |
| 16.3 Update Rules | Versioning; Maintenance Workflow | Updated | Production updates remain versioned and must synchronize code, dashboard defaults, templates, validators, timing, QA, and documentation. |
| 16.D Single File Architecture Standard | Protected Design Principles; Architecture Layers | Preserved | Single-file Apps Script architecture remains active. |
| 16.E Script Rebuild Standard | Framework Maintenance | Updated | Rebuild guidance is retained as maintenance governance; production v1.8.9 remains the executable baseline. |
| 16.F Production Update Standard | Versioning; Release Preparation guidance | Updated | Production update expectations are preserved with current repository preparation and text/source-only diff rules. |
| 17. Helper Audit Standards | Function Organization; Safe-Change Requirements | Updated | Helper audit is represented through function grouping, internal helper protection, and dependency checks before removal or rename. |
| 18. Framework Health Check Standards | Dashboard Quality Governance; Validation Framework; Appendix F | Updated | Health check governance is updated to Dashboard Quality Section I and current framework health expectations. |
| 19. Testing Workflow Standards | Quality Assurance Framework; Validation Framework; Appendix F | Updated | Testing standards are updated to Dashboard Quality A-R and v1.8.9 validation layers. |
| 20. Performance Standards | Performance Framework | Preserved | Batch read/write, cache, Maps/Sets, minimal flushes, and high-complexity timing review are carried forward. |
| 20.A Template First Formatting Standard | Template Architecture; Performance Framework | Preserved | Template-first output generation remains a protected standard. |
| 20.B Dashboard Processing Standard | Configuration Framework; Dashboard Architecture | Updated | Dashboard processing is updated to Format Dashboard A-H and section-scoped Dashboard Quality writes. |
| 21. Versioning Standards | Versioning | Preserved | Versioning remains required for production scripts and documentation updates. |
| 21.1 Framework Update Governance | Framework Maintenance; Source Material Status | Updated | Update governance is preserved and tied to current source materials and v1.8.9 implementation authority. |
| 22. Protected Standards | Framework Governance; Protected Standards | Updated | Protected standards are preserved and expanded to include v1.8.9 dashboard sections, Dashboard Quality A-R, tab organization, and restore/archive surfaces. |
| Appendix A - Column Configuration Tables | Column Architecture; Appendix E | Updated | Column categories and governance are covered; exact row-level column table should be regenerated from v1.8.9 defaults or live dashboard export for appendix expansion. |
| Appendix B - Sheet Definitions | Sheet Architecture; Appendix B | Updated | Sheet families and lifecycle are covered; full row-level Section C defaults should be regenerated from v1.8.9 defaults or live dashboard export. |
| Appendix C - Data Source Mapping Tables | Mapping Architecture | Updated | Mapping paths and standards are covered; exact field-level source/destination table remains an appendix expansion candidate. |
| Appendix D - Color Standards Table | Configuration Framework; Template Architecture | Updated | Color governance is covered at standards level; exact color table remains an appendix expansion candidate. |
| Appendix E - Sheet Naming Table | Sheet Architecture; Appendix B | Updated | Current v1.8.9 sheet families, prefixes, templates, and source routes are documented. |
| Appendix F - Framework Test & Dashboard Quality Definitions | Dashboard Quality Governance; Appendix C; Appendix F | Replaced | v1.9 test definitions are superseded by Dashboard Quality Sections A-R and current validation references. |
| Appendix G - Release Checklist | Quality Assurance Framework; Framework Maintenance | Updated | Release checklist is represented by acceptance criteria and maintenance workflow. |
| Appendix H - Required Release Package | Framework Maintenance; Source Material Status | Updated | Required release evidence is represented through source material status, validation, timing, QA, and repository preparation rules. |
| Appendix I - Framework Decision Log | Framework Governance; Source Material Status | Updated | Decision-log content is represented as current governance and source material status; a separate chronological decision log can be expanded later if needed. |
| Appendix J - Current Production Architecture | Framework Architecture; Current Production Baseline | Replaced | v1.9 current architecture is superseded by v1.8.9 architecture and production baseline. |
| Appendix K - Current Open Items | Additional Data That Would Improve Future Builds | Updated | Open items are narrowed to future live workbook export appendices rather than unresolved architecture blockers. |
| Appendix L - Revision History & Performance Findings | Performance Framework; Framework Maintenance | Updated | Performance findings are represented through timing governance and high-complexity areas; chronological revision history can be expanded later if needed. |

Coverage result: every v1.9 table-of-contents section and appendix is mapped to a v2.2 location with a status. No v1.9 section remains intentionally unmapped. The remaining completeness work is appendix expansion for exact row-level dashboard defaults, field-level mappings, color tables, and live workbook evidence tables when those exports are available.

### Appendix J — v2 Draft Consolidation Pass

This appendix consolidates the largest current v2 draft materials into the v2.2 framework specification. The largest drafts reviewed were **Master_List/Specs/ML _Framework_v2.0_Drafts/Master List Framework Specification v2.0.1.md** and **Master_List/Specs/ML _Framework_v2.0_Drafts/v2.0 CODEX  ML SPEC.md**. Supporting current-state drafts reviewed were **v2.1 ML Spec.md**, **v2.0.5 ML Spec.md**, section-specific drafts, and the v1.8.9 category order summary. Draft language is incorporated only where it remains consistent with production v1.8.9.

| v2 Draft Area | v2.2 Location | Consolidation Status | v1.8.9 Treatment |
|---|---|---|---|
| Governing authority / source-of-truth language | Framework Overview; Current Production Baseline | Updated | Draft v1.7.6 authority language is replaced with production v1.8.9 authority. |
| Protected architecture summary | Protected Design Principles; Framework Governance | Incorporated | Single-file, dashboard-governed, template-first, Primary PMR, source preservation, QA, Index/archive, timing, and validation principles are retained. |
| Production script manifest | Current Production Baseline; Function Organization | Updated | Counts are production-derived for v1.8.9: 15,871 lines, 679 functions, 64 public entry points, and 615 internal helpers. |
| Global standards | Configuration Framework; Performance Framework; Framework Governance | Incorporated | Data safety, public compatibility, dashboard governance, QA governance, archive governance, and performance rules are retained. |
| Configuration architecture | Configuration Framework | Incorporated | Script constants, Format Dashboard, document properties, and runtime cache ownership are retained and updated to A-H dashboard sections. |
| Format Dashboard standards | Format Dashboard Sections | Updated | Draft A-G references are superseded by v1.8.9 A-H, including Section F - Tab Organization & Index, Section G - Column Definitions, and Section H - Sheet Headers. |
| Sheet layout standards | Sheet Architecture; Column Architecture; Template Architecture | Incorporated | Header/data row rules, title rows, filters, hidden columns, row heights, date formats, and template-aware formatting are retained. |
| Sheet definitions, lifecycle, and ordering | Sheet Architecture; Tab Organization and Lifecycle | Updated | Draft global sort/order language is consolidated with the v1.8.9 full category order summary and Section F tab organization governance. |
| Public APIs, menus, triggers, and web app surfaces | Workflow Architecture; Function Organization | Incorporated | Public entry point inventory and trigger/web governance are retained and rebuilt from v1.8.9 function extraction. |
| Production runtime flow | Workflow Architecture; Data Flow; Processing Modules | Incorporated | Startup, monthly formatting, Demo P, Monthly Change, Disenrolled Exclusion, Master List, Index, QA, and timing sequences are retained. |
| Format Monthly Sheets workflow | Monthly Source Formatting Workflow | Incorporated | `B`, `CD`, `UC`, and `RD` route handling is retained. |
| Create Monthly Update workflow | Create Monthly Update Workflow | Updated | Workflow order is v1.8.9: Monthly Change, Demo P sync, Disenrolled Exclusion, Master List, Index refresh, completion notification. |
| Standalone workflow rule | Standalone Workflow Rule | Incorporated | Standalone recovery/troubleshooting callbacks remain supported with the same validation and ownership rules. |
| Data ownership and lineage | Data Architecture | Incorporated | Raw Data, Demo P, Primary PMR Row, Monthly Change, Disenrolled Exclusion, Master List, source reports, and archive ownership are retained. |
| Mapping, column, and header governance | Column Architecture; Mapping Architecture | Updated | Column governance is Section G and header/source-lineage governance is Section H in v1.8.9. |
| Primary PMR row architecture | Data Architecture; Mapping Architecture | Incorporated | Draft Primary PMR language remains current and protected. |
| Demo P processing rules | Demo P Module | Incorporated | Raw Data validation, flattening, Primary PMR assignment, monthly sync dependency, replacement coverage, archive retention, and reactivation sweep are retained. |
| Master List processing rules | Master List Module | Incorporated | Master List remains Primary PMR-only operational output and synchronized destination. |
| Monthly Change report rules | Monthly Change Module | Incorporated | Current/prior comparison and downstream Demo P sync dependency are retained. |
| Banner processing rules | Monthly Source Formatting Module; Mapping Architecture | Incorporated | Banner source formatting and Primary PMR synchronization are retained. |
| Care Plan processing rules | Monthly Source Formatting Module; Mapping Architecture; Dashboard Quality | Incorporated | Care Plan Due and Unlocked Care Plan sync ownership and quality validation are retained. |
| Disenrollment processing rules | Disenrolled Exclusion Module | Incorporated | Disenrolled Exclusion creation/update, Demo P row removal, formatting, and validation are retained. |
| Template governance | Template Architecture | Incorporated | Template lifecycle, smart refresh, signatures, hidden state, validation, and template-first output are retained. |
| Dashboard Quality governance | Dashboard Quality Governance; Appendix C | Updated | Draft A-Q references are superseded by production v1.8.9 Dashboard Quality A-R with Signoff in Section R. |
| Index, external archive, and restore governance | Index, Archive, and Restore Module; Sheet Architecture | Incorporated | Index inventory, archive workbook, restore action, restore URL, and conflict protection are retained. |
| Cache and performance governance | Cache Governance; Performance Framework | Incorporated | Runtime cache, invalidation, batch operations, Maps/Sets, minimized flushes, and timing evidence are retained. |
| Quality, validation, error handling, and timing | Validation Framework; QA Framework; Error Handling; Performance | Incorporated | Fail-fast validation, warning behavior, Dashboard Quality, and Framework Timing integration are retained. |
| Framework health and testing standards | Validation Framework; QA Framework; Appendix F | Updated | Testing standards are aligned to Dashboard Quality A-R and v1.8.9 validation sections. |
| Development and AI governance | Framework Governance; Framework Maintenance | Incorporated | Safe-change verification, public compatibility, dependency review, and no-rewrite governance are retained. |
| Versioning standards | Versioning | Incorporated | Versioned production and synchronized documentation updates are retained. |
| Formatting specification | Document Formatting Standard | Incorporated | Formatting requirements are carried forward through the explicit document formatting standard. |

#### Detailed v2 Governance Language Incorporated

| Draft Detail | Current v2.2 Handling |
|---|---|
| Dashboard reads must be cached and treated as non-authoritative execution optimization. | Preserved in Configuration Framework and Cache Governance. |
| Dashboard-generated defaults must remain compatible with production loaders. | Preserved in Configuration Framework, Format Dashboard Sections, and Framework Governance. |
| Dashboard Quality must write section-scoped updates and preserve report shell structure. | Preserved in Dashboard Quality Governance. |
| Template signatures control metadata-only refresh versus full rebuild. | Preserved in Template Architecture. |
| Template-first output generation is a protected standard. | Preserved in Protected Design Principles and Template Architecture. |
| Header validation should be centralized through dashboard/template validation rather than duplicated ad hoc checks. | Preserved in Validation Framework and Dashboard Quality sections. |
| Primary PMR assignment is protected and downstream synchronization writes participant-level values to Primary PMR rows. | Preserved in Data Architecture and Mapping Architecture. |
| Monthly Change must be produced before Demo P monthly synchronization in the all-in-one workflow. | Preserved in Create Monthly Update Workflow. |
| Raw Data, Demo P, and replacement/retention evidence must remain available for auditability. | Preserved in Data Ownership and Demo P Module. |
| Archive/Index restore paths must protect existing local sheet conflicts. | Preserved in Index, Archive, and Restore Module and Error Handling. |
| Safe changes require dependency review across callers, menus, triggers, properties, templates, validators, Dashboard Quality, and health checks. | Preserved in Safe-Change Requirements. |
| Build output must follow context-aware formatting for files, sheets, templates, functions, constants, and document properties. | Preserved in Document Formatting Standard. |

#### v2 Draft Content Not Pulled Forward as Active Governance

| Draft Content | Reason |
|---|---|
| v1.7.6 implementation authority statements | Replaced by v1.8.9 implementation authority. |
| Format Dashboard Section F as Sheet Headers / Section G as system surfaces from older drafts | Replaced by v1.8.9 Section F Tab Organization & Index, Section G Column Definitions, and Section H Sheet Headers. |
| Dashboard Quality A-Q as final section set | Replaced by v1.8.9 Dashboard Quality A-R with Section R Signoff. |
| Historical function totals from v1.7.6 inventories | Replaced by v1.8.9 production extraction. |
| Standalone historical QA sheets as governing surfaces | Retired unless reintroduced by production implementation. |
| Draft-only appendix placeholders requiring current dashboard exports | Deferred to future appendix expansion because exact row-level live workbook exports were not supplied. |

Consolidation result: the largest v2 drafts have been compared against the v2.2 specification. Detailed governance language that remains consistent with v1.8.9 has been incorporated into the main sections or mapped above. Draft content that conflicts with v1.8.9 is explicitly replaced, retired, or deferred to appendix expansion.
