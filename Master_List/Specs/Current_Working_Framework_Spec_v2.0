# Master List Framework Specification v2.2

| Build Field | Value |
|---|---|
| Status | Current rebuilt framework specification. |
| Implementation authority | **Master_List/Current Production Script/v1.8.9.3_Current_Production**. |
| Prior governing baseline reviewed | **Master_List/Specs/v1.9_Master_List_Framework_Specifications_Final_Governing_Edition.pdf**. |
| Current draft package reviewed | **Master_List/Specs/ML _Framework_v2.0_Drafts**. |
| Supporting references reviewed | **Master_List/Specs**, **Master_List/Audit Summary**, and **Master_List/v2_Framework_Reference**. |
| Build output | **Master_List/Specs/Current_Working_Framework_Spec_v2.0**. |

## Table of Contents

- Document Formatting Standard
- 1. Framework Overview
  - 1.1 Current Production Baseline
  - 1.2 Framework Purpose
  - 1.3 Protected Design Principles
- 2. Framework Architecture
  - 2.1 Architecture Layers
  - 2.2 Module Organization
  - 2.3 Dependency Boundaries
- 3. Configuration Framework
  - 3.1 Configuration Authority Order
  - 3.2 Format Dashboard Sections
  - 3.3 Version and Feature Flags
  - 3.4 Cache Governance
- 4. Workflow Architecture
  - 4.1 Menu and Entry Model
  - 4.2 Startup Workflow
  - 4.3 Monthly Source Formatting Workflow
  - 4.4 Create Monthly Start Workflow
  - 4.5 Create Monthly Update Workflow
  - 4.6 Standalone Workflow Rule
  - 4.7 Concurrency Controls
- 5. Data Architecture
  - 5.1 Data Ownership
  - 5.2 Data Flow
  - 5.3 Transformation Rules
- 6. Sheet Architecture
  - 6.1 Sheet Categories
  - 6.2 Tab Organization and Lifecycle
  - 6.3 Protected Sheet Rules
- 7. Column Architecture
  - 7.1 Column Categories
- 8. Mapping Architecture
  - 8.1 Mapping Standards
  - 8.2 Major Mapping Paths
- 9. Template Architecture
  - 9.1 Template Inventory
  - 9.2 Template Lifecycle
  - 9.3 Template Standards
- 10. Dashboard Architecture
  - 10.1 Format Dashboard Governance
  - 10.2 Dashboard Quality Governance
  - 10.3 Framework Timing Governance
- 11. Processing Modules
  - 11.1 Startup and System Setup Module
  - 11.2 Monthly Source Formatting Module
  - 11.3 Demo P Module
  - 11.4 Monthly Change Module
  - 11.5 Disenrolled Exclusion Module
  - 11.6 Master List Module
  - 11.7 Index, Archive, and Restore Module
  - 11.8 Dashboard Quality and Health Module
- 12. Reporting Architecture
  - 12.1 Report Standards
- 13. Validation Framework
  - 13.1 Validation Layers
  - 13.2 Fail-Fast Rules
- 14. Quality Assurance Framework
  - 14.1 Acceptance Criteria
- 15. Error Handling Framework
  - 15.1 Error Categories
- 16. Performance Framework
  - 16.1 Performance Standards
  - 16.2 High-Complexity Areas
- 17. Framework Governance
  - 17.1 Protected Standards
  - 17.2 Versioning
  - 17.3 Safe-Change Requirements
- 18. Function Organization
  - 18.1 Public Entry Point Inventory
  - 18.2 Logical Function Groups
- 19. Framework Maintenance
  - 19.1 Maintenance Workflow
- Appendices
- Appendix A — Framework Terminology
- Appendix B — Sheet Inventory
- Appendix C — Dashboard Quality Reference
- Appendix D — Workflow Diagram
- Appendix E — Configuration Reference
- Appendix F — Validation Reference
- Appendix G — Source Material Status
- Appendix H — Additional Data That Would Improve Future Builds
- Appendix I — v1.9 Coverage Pass
- Appendix J — v2 Draft Consolidation Pass
  - J.1 Detailed v2 Governance Language Incorporated
  - J.2 v2 Draft Content Not Pulled Forward as Active Governance
- Appendix K — Audit Summary Integration Pass
  - K.1 Closed / Implemented Decisions Incorporated
  - K.2 Current Risk Notes Not Marked Complete
  - K.3 Function Inventory Risk Integration
  - K.4 Audit Integration Result
- Appendix L — Expanded Sheet Inventory
- Appendix M — Expanded Template Inventory
- Appendix N — Expanded Dashboard Section Tables
- Appendix O — Expanded Header and Column Dictionary
- Appendix P — Expanded Data Mapping Matrix
- Appendix Q — Expanded Function Ownership Map
- Appendix R — Expanded Validation Matrix
- Appendix S — Expanded Protected Standards Catalog
- Appendix T — Formatting Compliance and Document Build Requirements
  - T.1 Markdown-to-Document Build Processing Order
  - T.2 Markdown Heading Mapping
  - T.3 Context-Aware Identifier Classification
  - T.4 Formal Section Structure Applied
  - T.5 Build Validation Requirements
- Appendix U — v1.8.9.2 Production Update and Wave 1 Closure
  - U.1 Wave 1 Closure Status
  - U.2 Remaining Open Review Items After Wave 1
  - U.3 Current Production Governance Statement
- Appendix V — v1.8.9.3 Reference Inventory Update Plan
- Appendix W — v1.8.9.3 Live Workbook Evidence Pass

## Document Formatting Standard

This Markdown source follows **Master_List/Specs/Framework_Spec_Formatting_Requirements**. File names, file paths, sheet names, template names, dashboard section names, and menu commands are written in bold body text so the documentation builder can render them as Bold Cambria. Apps Script functions, constants, and document-property keys are written as code identifiers so the builder can render them in Consolas.

## 1. Framework Overview

The Master List Framework is a single-file Google Apps Script production framework for monthly source formatting, Demo P processing, Monthly Change reporting, Disenrolled Exclusion governance, Master List generation, Banner synchronization, Care Plan Due synchronization, Unlocked Care Plan synchronization, dashboard-governed formatting, template governance, Index/archive lifecycle management, timing instrumentation, quality validation, and release-readiness evidence.

This specification rebuilds the prior v1.9 governing framework into a current v1.8.9.3 implementation-bound specification. Historical framework documents, v2.0 drafts, audit summaries, and v2 reference inventories are supporting sources. The current production script is the source of truth when any supporting document conflicts with implementation.

### 1.1 Current Production Baseline

| Item | Current Value |
|---|---|
| Production script | **Master_List/Current Production Script/v1.8.9.3_Current_Production** |
| Framework version constant | `1.8.9.3` |
| Production script length | 15,975 lines |
| Declared functions | 681 |
| Public Apps Script-callable functions | 64 |
| Internal underscore helpers | 617 |
| Dashboard configuration sections | A-H |
| Dashboard Quality sections | A-R |

### 1.2 Framework Purpose

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

### 1.3 Protected Design Principles

| Principle | Governance Rule |
|---|---|
| Production source of truth | Production v1.8.9.3 governs behavior over prior specs, drafts, reports, and inventories. |
| Single-file Apps Script architecture | The framework remains a single production script until an approved versioned migration changes this. |
| Dashboard-governed configuration | Format Dashboard is the editable configuration surface where loaders and validators support runtime values. |
| Template-first output | Governed reports are created from templates, populated in batch, then finalized with targeted fixes. |
| Primary PMR ownership | Participant-level synchronized fields belong on the Primary PMR row. |
| Consolidated QA | Dashboard Quality Report is the single consolidated QA and signoff surface. |
| Safe lifecycle management | Sheet hide/archive/restore/delete operations must validate protected surfaces and workbook safety first. |
| Public compatibility | Public callbacks, menu strings, trigger entry points, web routes, and wrappers are protected. |

## 2. Framework Architecture

### 2.1 Architecture Layers

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

### 2.2 Module Organization

The implementation is physically one Apps Script file but logically divided into subsystems: configuration, runtime cache, dashboard setup/load/validation, template creation/validation, report formatting, monthly processing, Demo P processing, Monthly Change, Master List, Disenrolled Exclusion, Index/archive/restore, Dashboard Quality, Framework Timing, health checks, workflow sync verification, sheet organization, and general utilities.

### 2.3 Dependency Boundaries

- Production logic may read historical intent only through implemented constants, helpers, dashboard defaults, and workflow code.
- Dashboard values are authoritative only when production loaders read them and validators accept them.
- Templates are authoritative for formatting but not for business transformations.
- Reports and PDFs are evidence artifacts; they do not override production code.
- Archive workbook data is runtime data, not repository implementation source.

## 3. Configuration Framework

### 3.1 Configuration Authority Order

| Authority | Examples | Change Control |
|---|---|---|
| Production constants | Version, sheet types, names, prefixes, templates, row constants, feature flags, archive ID default. | Versioned code review required. |
| Format Dashboard | Sheet definitions, behaviors, tab organization, columns, headers, system surfaces. | Editable at runtime after validation. |
| Document properties | Archive spreadsheet ID override, restore web app URL, signatures, busy/deferred state, quality-section state. | Runtime/deployment configuration. |
| Runtime cache | Dashboard, headers, maps, dimensions, monthly sheets, timing state. | Non-authoritative optimization; must be invalidated after mutations. |

### 3.2 Format Dashboard Sections

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

### 3.3 Version and Feature Flags

Feature flags protect controlled rollout of template refresh, signature cache, staged builds, fast template refresh, full rebuild forcing, output formatting extension, duplicate-template-format enforcement, workflow busy handling, index refresh deferral, and archive behavior. These flags are protected implementation defaults and must not be changed from documentation alone.

### 3.4 Cache Governance

Cache invalidation is required after dashboard rebuilds, template refreshes, sheet creation/deletion/renaming, header changes, dimension changes, monthly archive/delete operations, Dashboard Quality writes, timing writes, and Index rebuilds. Cached values are never authoritative beyond the current execution context.

## 4. Workflow Architecture

### 4.1 Menu and Entry Model

`onOpen` creates the workbook menu and connects user-facing operations to public Apps Script-callable functions. Public functions omit trailing underscores. Internal helpers use trailing underscores. Callback names are protected because menus, triggers, web routes, compatibility wrappers, and users may rely on them.

### 4.2 Startup Workflow

Startup and setup workflows create or refresh system sheets, dashboard defaults, templates, Dashboard Quality shell, Framework Timing shell, Index, and archive/restore configuration surfaces. Startup validation must not destroy business data or rewrite non-owned operational sheets.

### 4.3 Monthly Source Formatting Workflow

`formatMonthlySheets` prompts for one locked report month and processes the expected source route codes:

| Route | Meaning | Output Ownership |
|---|---|---|
| `B` | Banner source import | Banner formatting workflow and Banner monthly output. |
| `CD` | Care Plan Due source import | Care Plan Due monthly output. |
| `UC` | Unlocked Care Plan source import | Unlocked Care Plan monthly output. |
| `RD` | Raw Data source import | Raw Data monthly output and downstream Demo P source. |

Missing optional imports are skipped and logged when safe; invalid active source sheets and missing required dependencies fail before mutation.

### 4.4 Create Monthly Start Workflow

`runMonthlyStart` is the v1.8.9.2 initial monthly creation workflow. It prompts for the locked report month, performs fail-closed Master List replacement preflight before Demo P mutation, builds Demo P from Raw Data, creates/updates Disenrolled Exclusion, creates Master List, refreshes Index, records timing, and notifies completion. The approved execution sequence is Date Prompt, Build Demo P, Create Disenrolled, Create Master List.

### 4.5 Create Monthly Update Workflow

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

### 4.6 Standalone Workflow Rule

Standalone public callbacks remain supported for targeted troubleshooting, recovery, or partial monthly operation. Standalone paths must preserve the same validation, ownership, template, timing, cache, and safe-mutation rules as the all-in-one workflow.

### 4.7 Concurrency Controls

Workflow busy state and deferred Index state prevent overlapping critical workflows and avoid unsafe sheet organization during active processing. Locking is also used for web-app restore routes where archive restoration could collide with active workbook mutation.

## 5. Data Architecture

### 5.1 Data Ownership

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

### 5.2 Data Flow

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

### 5.3 Transformation Rules

- PMR identifiers must be normalized before matching.
- Header lookups should use normalized header maps rather than raw column positions.
- Demo P flattening converts Raw Data participant/contact information into governed rows and generated processing columns.
- Monthly Change compares current and prior month records across protected change categories.
- Master List receives participant-level synchronized values only on Primary PMR rows.
- Disenrollment processing appends governed exclusion records and removes qualifying Demo P rows only after validation.

## 6. Sheet Architecture

### 6.1 Sheet Categories

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

### 6.2 Tab Organization and Lifecycle

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

### 6.3 Protected Sheet Rules

Framework-owned system sheets, templates, **Index**, **Archive - Demo P**, and `RFF_` sheets are protected from unsafe deletion. Sheet lifecycle operations must avoid permanently exposing hidden templates/system sheets unless a menu action explicitly shows them.

## 7. Column Architecture

Column behavior is governed by Format Dashboard Section G. Header order and source lineage are governed by Section H. Column standards include width, header font size, date flag, hidden flag, wrap, horizontal alignment, vertical alignment, and number format. Header standards include sheet type, order, header name, and source-of-data lineage.

### 7.1 Column Categories

| Category | Examples / Use |
|---|---|
| Required identity columns | Participant PMR identifiers, names, DOB, enrollment status, Primary PMR Row. |
| Source columns | Imported Raw Data, Banner, Care Plan Due, Unlocked Care Plan fields. |
| Generated processing columns | Primary PMR Row, sort/order fields, update status/month/source tracking, helper fields. |
| Synchronization columns | Banner summary, care plan due/unlocked care plan fields, participant-level merged values. |
| Validation columns | Fields used by quality checks, report validation, duplicate detection, and workflow sync checks. |
| Hidden helper columns | Columns needed for processing or audit but hidden in governed outputs. |
| Presentation columns | Width, wrap, alignment, date/number/text formats, header font size. |

## 8. Mapping Architecture

Mapping is implemented by production helpers and documented by dashboard source lineage. Source mapping must preserve normalized headers, normalized PMR keys, source row lookup maps, generated row values, and Primary PMR row ownership.

### 8.1 Mapping Standards

1. Use normalized PMR keys for participant matching.
2. Use normalized headers/header maps for column lookup.
3. Treat production source-to-output helpers as the mapping authority.
4. Preserve source lineage in Format Dashboard Section H.
5. Synchronize participant-level source data to Primary PMR rows only.
6. Fail before mutation when required identity or source columns are missing.
7. Log warnings for optional source gaps that do not compromise governed output.

### 8.2 Major Mapping Paths

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

## 9. Template Architecture

Templates are created from Format Dashboard sheet definitions, behaviors, column definitions, header definitions, and global/title presentation settings. The framework supports smart refresh through expected signatures, document-property signatures, and sheet-note signatures.

### 9.1 Template Inventory

- **Template - Banner Report**.
- **Template - Care Plan Due**.
- **Template - Unlocked Care Plan**.
- **Template - Raw Data**.
- **Template - Demo P**.
- **Template - Disenrolled Exclusion**.
- **Template - Master List**.
- **Template - Monthly Change**.
- **RFF_BASE_TEMPLATE**.

### 9.2 Template Lifecycle

1. Load dashboard configuration.
2. Ensure base template exists.
3. Resolve sheet definitions, behaviors, columns, and headers.
4. Compare expected and stored signatures.
5. Use metadata-only refresh when signatures match and smart refresh is enabled.
6. Rebuild template when missing, structurally invalid, signature-mismatched, or forced.
7. Validate minimum structure and formatting.
8. Restore governed hidden-template visibility.

### 9.3 Template Standards

- Templates must have governed title/header rows.
- Header row is row 4 and data begins row 5.
- Date columns use governed date formatting.
- Hidden columns are governed through column definitions.
- Filters, alternating colors, title rows, and subheaders are governed through sheet behaviors.
- Template changes require coordinated dashboard, validator, timing, QA, and documentation updates.

## 10. Dashboard Architecture

### 10.1 Format Dashboard Governance

Format Dashboard is the editable configuration dashboard. It stores current framework defaults and allows supported formatting/configuration edits. It is rebuilt only through governed callbacks and validated through Dashboard Quality.

### 10.2 Dashboard Quality Governance

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

### 10.3 Framework Timing Governance

Framework Timing Report records process summary, performance issues, optimization recommendations, detailed timing log, and timing evidence. Timing data feeds Dashboard Quality performance and health checks.

## 11. Processing Modules

### 11.1 Startup and System Setup Module

Purpose: create/repair governed framework system surfaces without overwriting business data.

Inputs: active spreadsheet, constants, dashboard defaults, template definitions, document properties.

Outputs: Format Dashboard, Dashboard Quality Report, Framework Timing Report, templates, Index, archive configuration.

### 11.2 Monthly Source Formatting Module

Purpose: convert unformatted imported source tabs into governed formatted monthly reports.

Inputs: route-coded source sheets, prompt month, dashboard/template definitions.

Outputs: Raw Data, Banner, Care Plan Due, and Unlocked Care Plan monthly outputs.

### 11.3 Demo P Module

Purpose: build and maintain the flattened participant/contact processing sheet.

Inputs: Raw Data, existing Demo P, Monthly Change dependency, Disenrolled Exclusion state.

Outputs: Demo P body, Primary PMR ownership, update tracking, Archive - Demo P retained rows.

Business rules:

- Raw Data structure is validated before Demo P processing.
- Primary PMR row assignment occurs during Raw Data / Demo P processing.
- Demo P monthly sync requires Monthly Change availability.
- Replacement rows are validated for PMR coverage before rewrite.
- Replaced rows are archived before Demo P body mutation.

### 11.4 Monthly Change Module

Purpose: compare current and prior source data and produce governed change evidence.

Inputs: current and prior month source sheets, normalized headers, PMR keys, dashboard/template configuration.

Outputs: Monthly Change report sections for enrollment, disenrollment, demographic, caseload, contact, Banner, and Care Plan categories where implemented.

### 11.5 Disenrolled Exclusion Module

Purpose: maintain governed exclusion records and remove qualifying rows from Demo P.

Inputs: Demo P, month parts, governed disenrollment fields.

Outputs: Disenrolled Exclusion rows, retained Demo P body, old-row visibility handling, validation evidence.

### 11.6 Master List Module

Purpose: produce the primary operational participant output.

Inputs: updated Demo P, Master List template, Banner output, Care Plan Due output, Unlocked Care Plan output.

Outputs: Master List containing Primary PMR rows and synchronized participant-level fields.

### 11.7 Index, Archive, and Restore Module

Purpose: inventory local and archived sheets, support sheet restore, and manage lifecycle actions.

Inputs: active workbook sheets, external archive workbook, archive spreadsheet ID, restore web app URL.

Outputs: Index active grid, archive grid, restore links/actions, copied archive sheets, restored local sheets.

### 11.8 Dashboard Quality and Health Module

Purpose: validate dashboard, templates, workflow sync, data quality, timing, and release readiness.

Inputs: dashboard, templates, current sheets, timing data, properties, required function registry.

Outputs: Dashboard Quality Sections A-R, framework health evidence, summary, signoff.

## 12. Reporting Architecture

The framework generates workbook-native reports, not repository artifacts. Runtime reports include operational reports, source outputs, Dashboard Quality Report, Framework Timing Report, and Index. Binary PDF exports are review evidence only and should not be committed as implementation artifacts unless explicitly requested.

### 12.1 Report Standards

- Reports must use dashboard/template-governed formatting.
- Reports must use governed monthly naming patterns.
- Reports must validate required input dependencies before destructive actions.
- Reports must preserve timing and quality evidence when available.
- Reports that produce or archive sheets must refresh Index when safe.

## 13. Validation Framework

### 13.1 Validation Layers

| Layer | Purpose |
|---|---|
| Active sheet validation | Prevent invalid source/output/system/template sheets from being processed. |
| Dashboard validation | Validate global settings, sheet definitions, behaviors, tab organization, columns, headers, and changelog state. |
| Template validation | Validate template existence, dimensions, headers, formatting, signatures, filters, hidden columns, and row/column counts. |
| Workflow preflight | Validate month selection, required source sheets, required headers, PMR identity, and downstream dependencies. |
| Data-integrity validation | Validate replacement coverage, row counts, synchronization readiness, duplicate/missing keys, and report-specific constraints. |
| Runtime validation | Smoke tests, health checks, workflow synchronization verification, and Dashboard Quality sections. |

### 13.2 Fail-Fast Rules

Blocking failures must stop before mutation when missing required dependencies, invalid active sheet, unsafe monthly state, invalid PMR identity, missing required headers, archive restore conflict, destructive-operation preflight failure, or data-integrity conditions would corrupt governed output.

Best-effort warnings may be used for noncritical formatting, optional telemetry, optional Dashboard Quality section writes, Index visibility polish, system/template hiding, or timing recommendations when core data integrity is safe.

## 14. Quality Assurance Framework

QA is consolidated into Dashboard Quality. The QA framework validates startup, dashboard configuration, tab organization, templates, raw data, care plan sync, workflow synchronization, Demo P, Disenrolled Exclusion, Monthly Change, performance, framework health, summary, and signoff.

### 14.1 Acceptance Criteria

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

## 15. Error Handling Framework

The framework uses explicit errors for unsafe states and warning logs for recoverable noncritical issues. Error handling must preserve user-visible feedback through notifications/alerts and technical evidence through timing, logs, and Dashboard Quality where safe.

### 15.1 Error Categories

| Category | Handling |
|---|---|
| Missing dependency | Stop workflow and notify user. |
| Invalid active sheet | Stop before processing. |
| Missing required header | Stop before data mutation. |
| PMR identity failure | Stop because matching/sync would be unsafe. |
| Archive/restore conflict | Stop or require explicit resolution. |
| Optional visibility/timing issue | Log warning and continue if output integrity is unaffected. |
| Dashboard Quality write issue | Warn when QA section write is optional; stop only if validation result is required to proceed. |

## 16. Performance Framework

Performance governance preserves v1.9 batch-processing standards while documenting v1.8.9.2 implementation patterns.

### 16.1 Performance Standards

- Use batch reads and writes.
- Prefer in-memory arrays and maps/sets.
- Cache dashboard config, headers, header maps, sheet dimensions, monthly sheet lookup, template signatures, and timing state.
- Avoid repeated full-sheet reads where governed ranges are available.
- Avoid `getValue`, `setValue`, and `getRange` inside loops when batch APIs are available.
- Use compact Dashboard Quality section writes.
- Minimize `SpreadsheetApp.flush()`.
- Batch formatting, row hiding, deletion, and resizing where practical.

### 16.2 High-Complexity Areas

Template rebuild, Dashboard Quality full validation, Monthly Change comparisons, Demo P monthly sync, Master List synchronization, tab organization, archive/index inventory, and external restore workflows require timing evidence and careful dependency review.

## 17. Framework Governance

### 17.1 Protected Standards

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

### 17.2 Versioning

Every production script receives a new version. Earlier production versions must not be overwritten. Documentation must be updated when production behavior changes, especially when public interfaces, dashboard sections, templates, mappings, validation, report behavior, Index/archive lifecycle, or protected standards change.

### 17.3 Safe-Change Requirements

Before removing or renaming a function, constant, configuration key, menu entry, trigger, sheet, template, header, property key, or wrapper, maintainers must verify direct callers, indirect callers, menu strings, trigger references, web routes, `google.script.run`, dynamic invocation, properties, templates, validators, health checks, Dashboard Quality sections, and external consumers.

## 18. Function Organization

The implementation contains 681 functions. Public entry points are Apps Script-callable and protected. Internal helpers are trailing-underscore functions and are protected when referenced by workflows, callbacks, validators, registries, dynamic invocation, or tests.

### 18.1 Public Entry Point Inventory

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
- `runMonthlyStart`
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

### 18.2 Logical Function Groups

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

## 19. Framework Maintenance

Future work must start from the current production script, current framework specification, current dashboard/template defaults, current audit summaries, and current validation/timing evidence. Historical specs should be used to preserve approved governance, not to reintroduce retired behavior.

### 19.1 Maintenance Workflow

1. Identify the active production script and version.
2. Review current framework spec, drafts, reports, and audits.
3. Verify affected functions, callers, menus, triggers, properties, sheets, headers, templates, validators, and QA sections.
4. Implement minimal versioned changes.
5. Regenerate or update documentation when behavior changes.
6. Run dashboard/template/workflow validation appropriate to the change.
7. Run repository preparation and verify intended text/source-only diffs.

## Appendices

## Appendix A — Framework Terminology

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

## Appendix B — Sheet Inventory

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

## Appendix C — Dashboard Quality Reference

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

## Appendix D — Workflow Diagram

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

## Appendix E — Configuration Reference

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

## Appendix F — Validation Reference

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

## Appendix G — Source Material Status

| Source | Use in Rebuild |
|---|---|
| v1.9 governing framework PDF | Prior governance baseline and coverage model. |
| Current v2.0 drafts | Drafted current-state language and section ideas, updated only where v1.8.9.2 implements them. |
| Historical specs | Supporting context for dashboard quality, timing, system sheets, and governance decisions. |
| v2 framework reference | Supporting inventories for architecture, cache, templates, wrappers, validation, worksheets, and data flow. |
| Audit summaries | Current review and validation evidence, including v1.8.9 function inventory and exhaustive review, plus v1.8.9.2 closure evidence. |
| v1.8.9.2 production script | Current implementation source of truth. |

## Appendix H — Additional Data That Would Improve Future Builds

The framework can be maintained from this specification and production source. For a future appendix-only expansion, the most useful additional data would be validated live workbook exports of the current Format Dashboard, Dashboard Quality Report, Framework Timing Report, template tabs, and Index sheet after v1.8.9.3 deployment. These are not required to document the implemented code architecture, but they would allow exact live-runtime appendix tables to be regenerated without relying only on script defaults.

## Appendix I — v1.9 Coverage Pass

This appendix records the coverage pass from **Master_List/Specs/v1.9_Master_List_Framework_Specifications_Final_Governing_Edition.pdf** into this rebuilt v2.2 specification. Status values mean:

| Status | Meaning |
|---|---|
| Preserved | The v1.9 governance remains valid and is carried forward with no substantive change other than formatting or placement. |
| Updated | The v1.9 governance remains valid but is updated to match production v1.8.9.2 behavior, names, sections, counts, or workflow order. |
| Replaced | The v1.9 concept is superseded by a newer implemented v1.8.9.2 framework surface or governance model. |
| Retired | The v1.9 concept is not documented as active because v1.8.9.2 does not implement it as a current governing surface. |

| v1.9 Section / Appendix | v2.2 Location | Status | Coverage Notes |
|---|---|---|---|
| Purpose and authority preface | Framework Overview; Source Material Status | Updated | Authority is updated from v1.9 / v1.4.23 to production v1.8.9.2 as implementation source of truth. |
| 1. Executive Overview | Framework Overview | Updated | Core framework purpose is preserved and expanded for v1.8.9.2 Dashboard Quality A-R and Format Dashboard A-H. |
| 1.1 Framework Purpose | Framework Purpose | Updated | Raw Data, Demo P, Master List, Monthly Change, Disenrollment, template, timing, and validation purposes are carried forward. |
| 1.2 Current Production Baseline | Current Production Baseline | Updated | Baseline is rebuilt to v1.8.9.2 with current line/function counts and dashboard section counts. |
| 1.3 Primary PMR Row Architecture | Data Architecture; Mapping Architecture; Master List Module | Preserved | Primary PMR row remains the participant-level synchronization owner and is not reassigned downstream. |
| 1.4 Dashboard Quality Architecture | Dashboard Quality Governance; Quality Assurance Framework; Appendix C | Replaced | v1.9 Dashboard Quality A-J is superseded by production v1.8.9.2 Dashboard Quality Sections A-R. |
| 1.5 Protected Production Architecture | Protected Design Principles; Framework Governance | Updated | Protected architecture is preserved and expanded to include Tab Organization & Index, Dashboard Quality A-R, and v1.8.9.2 public surfaces. |
| 2. Global Standards | Configuration Framework; Performance Framework; Framework Governance | Updated | Global standards are preserved and updated to v1.8.9.2 constants, dashboard sections, validation, and performance rules. |
| 3. Sheet Layout Standards | Sheet Architecture; Column Architecture; Template Architecture | Updated | Header/data rows, template-first formatting, filters, hidden columns, row heights, and governed presentation rules are retained under current dashboard section ownership. |
| 4. Color Management Standards | Configuration Framework; Template Architecture; Appendix E | Updated | Color/HSL/font governance is preserved as dashboard-global and template presentation governance. Detailed live color tables require a future dashboard export if exact runtime values are needed. |
| 5. Naming Standards | Sheet Architecture; Framework Governance; Appendix B | Updated | Naming standards are updated to v1.8.9.2 monthly sheet families, source routes, templates, system sheets, and archive/index surfaces. |
| 6. Sheet Organization Standards | Sheet Architecture; Tab Organization and Lifecycle | Replaced | The old organization model is superseded by Format Dashboard Section F - Tab Organization & Index and the v1.8.9.2 category/rank model. |
| 7. Dashboard Configuration Standards | Configuration Framework; Format Dashboard Sections | Replaced | v1.9 dashboard governance is replaced by production Format Dashboard Sections A-H. |
| 8. Dashboard Configuration Tables | Format Dashboard Sections; Appendix E | Updated | Section-level table coverage is included; exact row-level dashboard defaults should be generated from v1.8.9.2 script defaults or live dashboard export for appendix expansion. |
| 9. Data Source Mapping Standards | Data Architecture; Mapping Architecture | Updated | Mapping standards are preserved and updated to normalized PMR/header maps, Primary PMR synchronization, archive/index, and v1.8.9.2 workflow ownership. |
| 10. Monthly Change Report Rules | Monthly Change Module; Workflow Architecture; Mapping Architecture | Preserved | Monthly Change remains the current/prior comparison workflow and a dependency before Demo P monthly synchronization. |
| 11. Master List Processing Rules | Master List Module; Data Architecture; Mapping Architecture | Preserved | Master List remains the Primary PMR operational output and synchronization target. |
| 11.1 Primary PMR Ownership Standard | Data Ownership; Mapping Standards | Preserved | Primary PMR ownership is carried forward as a protected standard. |
| 11.2 One Pass Processing Standard | Performance Framework | Preserved | One-pass / batch-processing standards are preserved as performance requirements. |
| 11.3 Synchronization Ownership Standard | Mapping Architecture; Master List Module | Preserved | Participant-level synchronization ownership remains on Primary PMR rows. |
| 12. Banner Processing Rules | Monthly Source Formatting Module; Mapping Architecture | Updated | Banner route and synchronization rules are carried forward under v1.8.9.2 source formatting and Master List sync ownership. |
| 13. Care Plan Processing Rules | Monthly Source Formatting Module; Mapping Architecture; Dashboard Quality Governance | Updated | Care Plan Due and Unlocked Care Plan processing are documented as source formatting and Master List Primary PMR synchronization surfaces with Dashboard Quality Section L validation. |
| 14. Demo P Processing Rules | Demo P Module; Data Architecture | Updated | Demo P initialization, monthly sync, replacement coverage, archive retention, and reactivation sweep behavior are documented for v1.8.9.2. |
| 15. Disenrollment Processing Rules | Disenrolled Exclusion Module; Data Architecture | Updated | Disenrollment governance is preserved and updated to current exclusion append/remove/format/validation behavior. |
| 16. Framework Development Standards | Framework Governance; Framework Maintenance | Updated | Safe-change and versioned-maintenance governance is preserved and expanded for current public interfaces, dashboards, templates, and validators. |
| 16.1 Architecture Rules | Framework Architecture; Protected Design Principles | Preserved | Single-file architecture and protected architecture rules are carried forward. |
| 16.2 Code Cleanup Requirements | Safe-Change Requirements; Framework Maintenance | Updated | Cleanup remains governed by dependency review and is updated to include current dynamic references, Dashboard Quality, Index/archive, and property usage. |
| 16.3 Update Rules | Versioning; Maintenance Workflow | Updated | Production updates remain versioned and must synchronize code, dashboard defaults, templates, validators, timing, QA, and documentation. |
| 16.D Single File Architecture Standard | Protected Design Principles; Architecture Layers | Preserved | Single-file Apps Script architecture remains active. |
| 16.E Script Rebuild Standard | Framework Maintenance | Updated | Rebuild guidance is retained as maintenance governance; production v1.8.9.2 remains the executable baseline. |
| 16.F Production Update Standard | Versioning; Release Preparation guidance | Updated | Production update expectations are preserved with current repository preparation and text/source-only diff rules. |
| 17. Helper Audit Standards | Function Organization; Safe-Change Requirements | Updated | Helper audit is represented through function grouping, internal helper protection, and dependency checks before removal or rename. |
| 18. Framework Health Check Standards | Dashboard Quality Governance; Validation Framework; Appendix F | Updated | Health check governance is updated to Dashboard Quality Section I and current framework health expectations. |
| 19. Testing Workflow Standards | Quality Assurance Framework; Validation Framework; Appendix F | Updated | Testing standards are updated to Dashboard Quality A-R and v1.8.9.2 validation layers. |
| 20. Performance Standards | Performance Framework | Preserved | Batch read/write, cache, Maps/Sets, minimal flushes, and high-complexity timing review are carried forward. |
| 20.A Template First Formatting Standard | Template Architecture; Performance Framework | Preserved | Template-first output generation remains a protected standard. |
| 20.B Dashboard Processing Standard | Configuration Framework; Dashboard Architecture | Updated | Dashboard processing is updated to Format Dashboard A-H and section-scoped Dashboard Quality writes. |
| 21. Versioning Standards | Versioning | Preserved | Versioning remains required for production scripts and documentation updates. |
| 21.1 Framework Update Governance | Framework Maintenance; Source Material Status | Updated | Update governance is preserved and tied to current source materials and v1.8.9.3 implementation authority. |
| 22. Protected Standards | Framework Governance; Protected Standards | Updated | Protected standards are preserved and expanded to include v1.8.9.2 dashboard sections, Dashboard Quality A-R, tab organization, and restore/archive surfaces. |
| Appendix A - Column Configuration Tables | Column Architecture; Appendix E | Updated | Column categories and governance are covered; exact row-level column table should be regenerated from v1.8.9.2 defaults or live dashboard export for appendix expansion. |
| Appendix B - Sheet Definitions | Sheet Architecture; Appendix B | Updated | Sheet families and lifecycle are covered; full row-level Section C defaults should be regenerated from v1.8.9.2 defaults or live dashboard export. |
| Appendix C - Data Source Mapping Tables | Mapping Architecture | Updated | Mapping paths and standards are covered; exact field-level source/destination table remains an appendix expansion candidate. |
| Appendix D - Color Standards Table | Configuration Framework; Template Architecture | Updated | Color governance is covered at standards level; exact color table remains an appendix expansion candidate. |
| Appendix E - Sheet Naming Table | Sheet Architecture; Appendix B | Updated | Current v1.8.9.2 sheet families, prefixes, templates, and source routes are documented. |
| Appendix F - Framework Test & Dashboard Quality Definitions | Dashboard Quality Governance; Appendix C; Appendix F | Replaced | v1.9 test definitions are superseded by Dashboard Quality Sections A-R and current validation references. |
| Appendix G - Release Checklist | Quality Assurance Framework; Framework Maintenance | Updated | Release checklist is represented by acceptance criteria and maintenance workflow. |
| Appendix H - Required Release Package | Framework Maintenance; Source Material Status | Updated | Required release evidence is represented through source material status, validation, timing, QA, and repository preparation rules. |
| Appendix I - Framework Decision Log | Framework Governance; Source Material Status | Updated | Decision-log content is represented as current governance and source material status; a separate chronological decision log can be expanded later if needed. |
| Appendix J - Current Production Architecture | Framework Architecture; Current Production Baseline | Replaced | v1.9 current architecture is superseded by v1.8.9.3 architecture and production baseline. |
| Appendix K - Current Open Items | Additional Data That Would Improve Future Builds | Updated | Open items are narrowed to future live workbook export appendices rather than unresolved architecture blockers. |
| Appendix L - Revision History & Performance Findings | Performance Framework; Framework Maintenance | Updated | Performance findings are represented through timing governance and high-complexity areas; chronological revision history can be expanded later if needed. |

Coverage result: every v1.9 table-of-contents section and appendix is mapped to a v2.2 location with a status. No v1.9 section remains intentionally unmapped. The remaining completeness work is appendix expansion for exact row-level dashboard defaults, field-level mappings, color tables, and live workbook evidence tables when those exports are available.

## Appendix J — v2 Draft Consolidation Pass

This appendix consolidates the largest current v2 draft materials into the v2.2 framework specification. The largest drafts reviewed were **Master_List/Specs/ML _Framework_v2.0_Drafts/Master List Framework Specification v2.0.1.md** and **Master_List/Specs/ML _Framework_v2.0_Drafts/v2.0 CODEX  ML SPEC.md**. Supporting current-state drafts reviewed were **v2.1 ML Spec.md**, **v2.0.5 ML Spec.md**, section-specific drafts, and the v1.8.9.3 category order summary. Draft language is incorporated only where it remains consistent with production v1.8.9.3.

| v2 Draft Area | v2.2 Location | Consolidation Status | v1.8.9.2 Treatment |
|---|---|---|---|
| Governing authority / source-of-truth language | Framework Overview; Current Production Baseline | Updated | Draft v1.7.6 authority language is replaced with production v1.8.9.2 authority. |
| Protected architecture summary | Protected Design Principles; Framework Governance | Incorporated | Single-file, dashboard-governed, template-first, Primary PMR, source preservation, QA, Index/archive, timing, and validation principles are retained. |
| Production script manifest | Current Production Baseline; Function Organization | Updated | Counts are production-derived for v1.8.9.2: 15,980 lines, 681 functions, 64 public entry points, and 617 internal helpers. |
| Global standards | Configuration Framework; Performance Framework; Framework Governance | Incorporated | Data safety, public compatibility, dashboard governance, QA governance, archive governance, and performance rules are retained. |
| Configuration architecture | Configuration Framework | Incorporated | Script constants, Format Dashboard, document properties, and runtime cache ownership are retained and updated to A-H dashboard sections. |
| Format Dashboard standards | Format Dashboard Sections | Updated | Draft A-G references are superseded by v1.8.9.2 A-H, including Section F - Tab Organization & Index, Section G - Column Definitions, and Section H - Sheet Headers. |
| Sheet layout standards | Sheet Architecture; Column Architecture; Template Architecture | Incorporated | Header/data row rules, title rows, filters, hidden columns, row heights, date formats, and template-aware formatting are retained. |
| Sheet definitions, lifecycle, and ordering | Sheet Architecture; Tab Organization and Lifecycle | Updated | Draft global sort/order language is consolidated with the v1.8.9.2 full category order summary and Section F tab organization governance. |
| Public APIs, menus, triggers, and web app surfaces | Workflow Architecture; Function Organization | Incorporated | Public entry point inventory and trigger/web governance are retained and rebuilt from v1.8.9.2 function extraction. |
| Production runtime flow | Workflow Architecture; Data Flow; Processing Modules | Incorporated | Startup, monthly formatting, Demo P, Monthly Change, Disenrolled Exclusion, Master List, Index, QA, and timing sequences are retained. |
| Format Monthly Sheets workflow | Monthly Source Formatting Workflow | Incorporated | `B`, `CD`, `UC`, and `RD` route handling is retained. |
| Create Monthly Update workflow | Create Monthly Update Workflow | Updated | Workflow order is v1.8.9.2: Monthly Change, Demo P sync, Disenrolled Exclusion, Master List, Index refresh, completion notification. |
| Standalone workflow rule | Standalone Workflow Rule | Incorporated | Standalone recovery/troubleshooting callbacks remain supported with the same validation and ownership rules. |
| Data ownership and lineage | Data Architecture | Incorporated | Raw Data, Demo P, Primary PMR Row, Monthly Change, Disenrolled Exclusion, Master List, source reports, and archive ownership are retained. |
| Mapping, column, and header governance | Column Architecture; Mapping Architecture | Updated | Column governance is Section G and header/source-lineage governance is Section H in v1.8.9.2. |
| Primary PMR row architecture | Data Architecture; Mapping Architecture | Incorporated | Draft Primary PMR language remains current and protected. |
| Demo P processing rules | Demo P Module | Incorporated | Raw Data validation, flattening, Primary PMR assignment, monthly sync dependency, replacement coverage, archive retention, and reactivation sweep are retained. |
| Master List processing rules | Master List Module | Incorporated | Master List remains Primary PMR-only operational output and synchronized destination. |
| Monthly Change report rules | Monthly Change Module | Incorporated | Current/prior comparison and downstream Demo P sync dependency are retained. |
| Banner processing rules | Monthly Source Formatting Module; Mapping Architecture | Incorporated | Banner source formatting and Primary PMR synchronization are retained. |
| Care Plan processing rules | Monthly Source Formatting Module; Mapping Architecture; Dashboard Quality | Incorporated | Care Plan Due and Unlocked Care Plan sync ownership and quality validation are retained. |
| Disenrollment processing rules | Disenrolled Exclusion Module | Incorporated | Disenrolled Exclusion creation/update, Demo P row removal, formatting, and validation are retained. |
| Template governance | Template Architecture | Incorporated | Template lifecycle, smart refresh, signatures, hidden state, validation, and template-first output are retained. |
| Dashboard Quality governance | Dashboard Quality Governance; Appendix C | Updated | Draft A-Q references are superseded by production v1.8.9.2 Dashboard Quality A-R with Signoff in Section R. |
| Index, external archive, and restore governance | Index, Archive, and Restore Module; Sheet Architecture | Incorporated | Index inventory, archive workbook, restore action, restore URL, and conflict protection are retained. |
| Cache and performance governance | Cache Governance; Performance Framework | Incorporated | Runtime cache, invalidation, batch operations, Maps/Sets, minimized flushes, and timing evidence are retained. |
| Quality, validation, error handling, and timing | Validation Framework; QA Framework; Error Handling; Performance | Incorporated | Fail-fast validation, warning behavior, Dashboard Quality, and Framework Timing integration are retained. |
| Framework health and testing standards | Validation Framework; QA Framework; Appendix F | Updated | Testing standards are aligned to Dashboard Quality A-R and v1.8.9.2 validation sections. |
| Development and AI governance | Framework Governance; Framework Maintenance | Incorporated | Safe-change verification, public compatibility, dependency review, and no-rewrite governance are retained. |
| Versioning standards | Versioning | Incorporated | Versioned production and synchronized documentation updates are retained. |
| Formatting specification | Document Formatting Standard | Incorporated | Formatting requirements are carried forward through the explicit document formatting standard. |

### J.1 Detailed v2 Governance Language Incorporated

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

### J.2 v2 Draft Content Not Pulled Forward as Active Governance

| Draft Content | Reason |
|---|---|
| v1.7.6 implementation authority statements | Replaced by v1.8.9.3 implementation authority. |
| Format Dashboard Section F as Sheet Headers / Section G as system surfaces from older drafts | Replaced by v1.8.9.2 Section F Tab Organization & Index, Section G Column Definitions, and Section H Sheet Headers. |
| Dashboard Quality A-Q as final section set | Replaced by v1.8.9.2 Dashboard Quality A-R with Section R Signoff. |
| Historical function totals from v1.7.6 inventories | Replaced by v1.8.9.2 production extraction. |
| Standalone historical QA sheets as governing surfaces | Retired unless reintroduced by production implementation. |
| Draft-only appendix placeholders requiring current dashboard exports | Deferred to future appendix expansion because exact row-level live workbook exports were not supplied. |

Consolidation result: the largest v2 drafts have been compared against the v2.2 specification. Detailed governance language that remains consistent with v1.8.9.2 has been incorporated into the main sections or mapped above. Draft content that conflicts with v1.8.9.2 is explicitly replaced, retired, or deferred to appendix expansion.

## Appendix K — Audit Summary Integration Pass

This appendix integrates current v1.8.9 audit evidence from **Master_List/Audit Summary/PRODUCTION_EXTRACTION_PASS_v1.8.9.md**, **Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.8.9.md**, **Master_List/Audit Summary/FUNCTION_INVENTORY_v1.8.9.csv**, and **Master_List/Audit Summary/EXHAUSTIVE_ENGINEERING_CODE_REVIEW_v1.8.9.md**. Audit evidence is incorporated only where it describes implemented behavior or current governance risk. Recommended remediations are not treated as completed unless the production script implements them.

| Audit Source | Incorporated Evidence | Spec Location |
|---|---|---|
| Production extraction pass | v1.8.9 version, line count, function count, public/internal split, dashboard section inventory, Dashboard Quality A-R, constants, sheet definitions, tab organization, workflow order; superseded for baseline counts by v1.8.9.2 production extraction. | Current Production Baseline; Configuration Framework; Sheet Architecture; Dashboard Architecture; Function Organization. |
| Function inventory review | v1.8.9 inventory reported 679 total functions, 64 public entry points, and 615 internal helpers; v1.8.9.3 keeps the active inventory at 681 total functions, 64 public entry points, and 617 internal helpers. | Current Production Baseline; Function Organization; Framework Governance; Maintenance Workflow. |
| Exhaustive engineering review | Production-usable conditional status, high-risk workflow areas, bottlenecks, maintainability concerns, and open findings ML189-001 through ML189-008. | Quality Assurance Framework; Error Handling Framework; Performance Framework; Framework Maintenance; Risk Notes below. |

### K.1 Closed / Implemented Decisions Incorporated

| Decision / Evidence | Integration |
|---|---|
| No duplicate top-level function declarations were found in v1.8.9.2. | Function Organization treats duplicate declarations as closed for the current baseline. |
| No confirmed missing menu callbacks were found in v1.8.9 static review. | Public entry-point governance preserves current callback surfaces rather than treating them as broken. |
| No confirmed undefined top-level dependencies were found in v1.8.9 static review. | Validation and maintenance guidance focuses on safe-change review rather than dependency emergency remediation. |
| Single-file Apps Script architecture remains production-approved. | Protected Design Principles and Framework Architecture preserve single-file architecture. |
| Dashboard-governed, template-first formatting remains implemented. | Configuration, Template, Dashboard, and Performance sections preserve dashboard/template-first governance. |
| Format Dashboard Sections A-H are implemented in v1.8.9.2. | Dashboard section ownership is updated to A-H, including Section F Tab Organization & Index. |
| Dashboard Quality Sections A-R are implemented in v1.8.9.2. | Dashboard Quality governance is updated to A-R, including Section R Signoff. |
| Current tab organization/rank model is implemented in v1.8.9.3. | Sheet Architecture includes the category/rank lifecycle model. |

### K.2 Current Risk Notes Not Marked Complete

| Finding | Status in this Specification | Documentation Treatment |
|---|---|---|
| ML189-001 Monthly Change disenrollment detection date rule | CLOSED / PASSED in Wave 1. | v1.8.9.2 closure accepts the strict first-of-month rule and centralized helper as passed review evidence. |
| ML189-002 Create Monthly Update can mutate Demo P / Disenrolled Exclusion before Master List replacement confirmation | CLOSED / PASSED in Wave 1. | v1.8.9.2 moves replacement confirmation into preflight and bypasses duplicate prompts after preflight confirmation. |
| ML189-003 Master List fallback from Primary PMR Row to DOB/first row | CLOSED / PASSED in Wave 1. | v1.8.9.2 closure records Primary PMR fail-closed Master List behavior as passed. |
| ML189-004 Long-running mutating workflows need workflow-level lock/busy guard audit | CLOSED / PASSED in Wave 3. | v1.8.9.3 closure confirms `runFrameworkTimed_` lock/busy protection for five standalone mutating workflows, prompt-before-lock behavior, public/menu compatibility, and trigger/dynamic/web surface review. |
| ML189-005 Disenrollment sort uses source-column index against report rows | CLOSED / PASSED in Wave 1. | v1.8.9.2 closure records Monthly Change Disenrollments report-header sort index as passed. |
| ML189-006 Monthly Change full-range clear/format performance target | Open cleanup/performance item. | Performance Framework lists Monthly Change as a high-complexity timing-review area. |
| ML189-007 System sheet menu callbacks use underscore callback names | Open maintainability item. | Function Organization and Safe-Change Requirements preserve callback compatibility until approved cleanup. |
| ML189-008 Project documentation authority text stale relative to v1.8.9.3 | Partially addressed by this spec only. | This spec updates authority to v1.8.9.3, but other project README/spec authority text may still need separate cleanup. |

### K.3 Function Inventory Risk Integration

| Inventory Signal | Governance Response |
|---|---|
| 107 no-static-caller candidates | Not treated as deletion-safe. They may be public, dynamic, menu, trigger, macro, web-app, or compatibility surfaces. |
| Two oversized/high-complexity functions | `getDefaultHeaderSets_` and `compareRawDemoPForSectionReport_` remain focused-review targets before related changes. |
| One circular dependency group | `loadDashboardConfig_` and `loadGlobalSettings_` are documented as a maintainability signal, not a current runtime blocker. |
| Public/internal boundaries blurred for some wrappers | Public compatibility is preserved until menu callbacks and wrappers are deliberately migrated. |

### K.4 Audit Integration Result

The audit summary integration pass is complete for documentation purposes. Closed/implemented audit evidence has been incorporated as current framework governance. Open findings from the exhaustive v1.8.9 review are documented as current risk notes except where v1.8.9.2 Wave 1 evidence closes them rather than marked complete. Future production remediation must update this specification only after the production script implements the change and validation evidence confirms closure.

## Appendix L — Expanded Sheet Inventory

| Sheet / Sheet Family | Category | Creation / Maintenance Owner | Template Dependency | Visibility / Lifecycle | Data Ownership |
|---|---|---|---|---|---|
| **Index** | System/index | Index, archive, restore, and setup workflows | None | Rank 1; never hidden; refreshed after sheet-producing/archive workflows when safe. | Active workbook inventory and external archive inventory. |
| **Format Dashboard** | Configuration dashboard | Dashboard setup/rebuild, layout capture, dashboard validation | None | System surface; shown/hidden by system-sheet workflow; not participant data. | Editable framework configuration. |
| **Dashboard Quality Report** | Quality dashboard | Dashboard Quality startup/quick/full/template validation workflows | None | System surface; section-scoped writes; shell preserved. | QA evidence, validation status, summary, and signoff. |
| **Framework Timing Report** | Timing dashboard | Timing wrappers, timing refresh, recommendation writers | None | System surface; timing evidence retained and compacted. | Runtime performance evidence. |
| **Demo P** | Core operational | Demo P build, Demo P monthly sync, Disenrolled Exclusion workflow | **Template - Demo P** | Rank 2; visible; source for Master List and disenrollment. | Flattened participant/contact processing data and Primary PMR ownership. |
| **Disenrolled Exclusion** | Core operational | Disenrollment workflow | **Template - Disenrolled Exclusion** | Rank 10; visible; old rows may be hidden by workflow. | Governed disenrollment/exclusion evidence. |
| **Archive - Demo P** | Archive/retention | Demo P monthly sync and disenrollment retention helpers | None | Rank 350; always hidden; protected from unsafe deletion. | Replaced Demo P rows and replacement audit evidence. |
| **Master List mm.yy** | Monthly active | Master List workflow and Monthly Update | **Template - Master List** | Dynamic monthly active rank beginning 21; visible operational output. | Primary PMR operational participant rows and synchronized fields. |
| **Monthly Change mm.yy** | Monthly active | Monthly Change workflow and Monthly Update | **Template - Monthly Change** | Dynamic monthly active rank beginning 22; visible report output. | Current/prior comparison evidence. |
| **Raw Data mm.yy** | Monthly active/source output | Raw Data formatting workflow | **Template - Raw Data** | Dynamic monthly active rank beginning 23; hidden after creation where configured. | Formatted Raw Data source evidence. |
| **Banners mm.yy** | Monthly sub-report | Banner formatting workflow | **Template - Banner Report** | Dynamic monthly sub-report rank beginning 24; hidden after creation / monthly import lifecycle. | Banner source output for synchronization. |
| **CP Due mm.yy** | Monthly sub-report | Care Plan Due formatting workflow | **Template - Care Plan Due** | Dynamic monthly sub-report rank beginning 25; hidden after creation / monthly import lifecycle. | Care Plan Due source output for synchronization. |
| **Unlock CP mm.yy** | Monthly sub-report | Unlocked Care Plan formatting workflow | **Template - Unlocked Care Plan** | Dynamic monthly sub-report rank beginning 26; hidden after creation / monthly import lifecycle. | Unlocked Care Plan source output for synchronization. |
| **Raw Data - Banners** | Source data | Banner source import/archive workflow | None | Dynamic source rank beginning 27; moves to archive after creation where configured. | Raw imported Banner evidence. |
| **Raw Data - Raw Data** | Source data | Raw Data source import/archive workflow | None | Dynamic source rank beginning 28; moves to archive after creation where configured. | Raw imported Raw Data evidence. |
| **Raw Data - CP Due** | Source data | Care Plan Due source import/archive workflow | None | Dynamic source rank beginning 29; moves to archive after creation where configured. | Raw imported Care Plan Due evidence. |
| **Raw Data - Unlocked CP** | Source data | Unlocked Care Plan source import/archive workflow | None | Dynamic source rank beginning 30; moves to archive after creation where configured. | Raw imported Unlocked Care Plan evidence. |
| **B** | Unformatted import | Monthly source formatting workflow | None | Rank 300 source route. | Unformatted Banner import. |
| **CD** | Unformatted import | Monthly source formatting workflow | None | Rank 301 source route. | Unformatted Care Plan Due import. |
| **UC** | Unformatted import | Monthly source formatting workflow | None | Rank 302 source route. | Unformatted Unlocked Care Plan import. |
| **RD** | Unformatted import | Monthly source formatting workflow | None | Rank 303 source route. | Unformatted Raw Data import. |

## Appendix M — Expanded Template Inventory

| Template | Sheet Type | Output Pattern | Default Rows | Default Columns | Visibility | Validation / Refresh Governance |
|---|---|---|---:|---:|---|---|
| **Template - Banner Report** | Banners | **Banners mm.yy** | 100 | 9 | Hidden by template lifecycle. | Built from dashboard sections; signature-governed smart refresh; validates headers, filters, dimensions, date/number formats, hidden columns, and row heights. |
| **Template - Care Plan Due** | CP Due Date | **CP Due mm.yy** | 100 | 5 | Hidden by template lifecycle. | Built from dashboard sections; validates care-plan due columns and pulled spreadsheet date/source formatting. |
| **Template - Unlocked Care Plan** | Unlock CP | **Unlock CP mm.yy** | 100 | 4 | Hidden by template lifecycle. | Built from dashboard sections; validates unlocked care-plan output structure and sync-source formatting. |
| **Template - Raw Data** | Raw Data | **Raw Data mm.yy** | 100 | 54 | Hidden by template lifecycle. | Preserves Raw Data source evidence and date/header formatting. |
| **Template - Demo P** | Demo P | **Demo P** | 100 | 80 | Hidden by template lifecycle. | Governs Demo P formatting, generated processing columns, update tracking, and date formatting. |
| **Template - Disenrolled Exclusion** | Disenrolled Exclusion | **Disenrolled** | 100 | 66 | Hidden by template lifecycle. | Governs exclusion output structure and retained disenrollment evidence. |
| **Template - Master List** | Master List | **Master List mm.yy** | 100 | 37 | Hidden by template lifecycle. | Governs Primary PMR operational output formatting. |
| **Template - Monthly Change** | Monthly Change | **Monthly Change mm.yy** | 100 | 54 | Hidden by template lifecycle. | Governs change report section output and subheader formatting. |
| **RFF_BASE_TEMPLATE** | Base/system template | N/A | Governed by script defaults | Governed by script defaults | Always hidden. | Base formatting source; protected from unsafe deletion and normal user edits. |

## Appendix N — Expanded Dashboard Section Tables

| Format Dashboard Section | Required Columns | Source / Default Owner | Validation Owner | Notes |
|---|---|---|---|---|
| **SECTION A - GLOBAL SETTINGS** | Setting; Value; Options | Script defaults and dashboard rebuild. | Dashboard Quality Section A. | Controls row numbers, freeze settings, row heights, default formats, font, colors, HSL levels, border style, and template version. |
| **SECTION B - TITLE ROWS** | Sheet Type; Row; Purpose; Value Source; Label; Target Cell; Height; Font Size; Font Weight; Fill Level; Alignment; Wrap; Notes | Script defaults and dashboard rebuild. | Dashboard Quality Section A and template validation. | Governs title/date/spacer/header rows used by templates and outputs. |
| **SECTION C - SHEET DEFINITIONS** | Sheet Type; Report Title; Template Name; Output Naming Pattern; Base Color; Use Prompt Date; End Date Source; Template Row Count; Template Column Count; Template Row Mode; Minimum Rows; Buffer Rows | Script defaults and dashboard rebuild. | Dashboard Quality Section B. | Governs report/template relationship, output names, colors, sizing, and row-count behavior. |
| **SECTION D - SHEET BEHAVIORS** | Sheet Type; Uses Title Rows; Uses Filter; Uses Alternating Colors; Uses Subheaders; Hidden Template; Output Visibility | Script defaults and dashboard rebuild. | Dashboard Quality Section C. | Governs behavior flags used by template/output formatting. |
| **SECTION E - SYSTEM SHEET SURFACES** | System Sheet Name; Display Name; Sort Order; Output Visibility; Title Fill Color; Title Font Color; Use Global Defaults; Notes | Script defaults and dashboard rebuild. | Dashboard/system-surface validation. | Governs Format Dashboard, Dashboard Quality, Framework Timing, Archive - Demo P, base template, and other framework surfaces. |
| **SECTION F - TAB ORGANIZATION & INDEX** | Sheet Name / Prefix; Group; Rank / Range; Special | Script defaults, v1.8.9.3 category order summary, and dashboard rebuild. | Dashboard Quality Section F. | Governs sheet categories, ranks, dynamic monthly grouping, Index ordering, and lifecycle visibility. |
| **SECTION G - COLUMN DEFINITIONS** | Header; Width; Header Font Size; Date Column; Hide Column; Data Wrap; Horizontal Alignment; Vertical Alignment; Number Format | Script defaults and dashboard rebuild. | Dashboard Quality Section D. | Governs column presentation and hidden/date-format behavior. |
| **SECTION H - SHEET HEADERS** | Sheet Type; Column Order; Header; Source of Data | Script defaults and dashboard rebuild. | Dashboard Quality Section E. | Governs header order and source lineage by sheet type. |

| Dashboard Quality Section | Required Output Columns | Governance Purpose |
|---|---|---|
| **SECTION A - GLOBAL INPUTS VERIFICATION** | Setting; Status; Issue; Quality Notes | Verifies global inputs and title rows. |
| **SECTION B - SHEET DEFINITIONS VERIFICATION** | Sheet; Status; Issue; Quality Notes | Verifies dashboard sheet definitions. |
| **SECTION C - SHEET BEHAVIOR VERIFICATION** | Behavior; Status; Issue; Quality Notes | Verifies sheet behavior settings. |
| **SECTION D - COLUMN DEFINITIONS VERIFICATION** | Column; Status; Issue; Quality Notes | Verifies column definition settings. |
| **SECTION E - SHEET HEADERS VERIFICATION** | Header; Status; Issue; Quality Notes | Verifies sheet header definitions and lineage. |
| **SECTION F - TAB ORGANIZATION & INDEX VERIFICATION** | Tab Organization; Status; Issue; Quality Notes | Verifies tab organization and Index configuration. |
| **SECTION G - TEMPLATE STRUCTURE & VALIDATION** | Template; Status; Issue; Quality Notes | Verifies template existence, structure, formatting, and signatures. |
| **SECTION H - FORMAT DASHBOARD CHANGELOG** | Timestamp; Section Changed; Column Changed; Previous Value; New Value | Tracks dashboard governance changes. |
| **SECTION I - FRAMEWORK HEALTH CHECK** | Area; Item; Status; Quality Notes | Verifies required framework surfaces. |
| **SECTION J - PERFORMANCE SUMMARY** | Process; Runtime / Status fields; Quality Notes | Summarizes timing evidence and performance status. |
| **SECTION K - RAW DATA VALIDATION** | Validation Item; Status; Issue; Quality Notes | Validates Raw Data readiness. |
| **SECTION L - CARE PLAN SYNC VALIDATION** | Validation Item; Status; Issue; Quality Notes | Validates Care Plan Due and Unlocked Care Plan sync readiness. |
| **SECTION M - WORKFLOW & SYNCHRONIZATION VERIFICATION** | Sync Check Area; Verification Item; Status; Quality Notes | Verifies workflow and synchronization expectations. |
| **SECTION N - DEMO P QUALITY VALIDATION** | Validation Item; Status; Issue; Quality Notes | Validates Demo P processing. |
| **SECTION O - DISENROLLED EXCLUSION VALIDATION** | Validation Item; Status; Issue; Quality Notes | Validates Disenrolled Exclusion output. |
| **SECTION P - MONTHLY CHANGE VALIDATION** | Validation Item; Status; Issue; Quality Notes | Validates Monthly Change output. |
| **SECTION Q - SUMMARY** | Area; Status; Quality Notes; Evidence | Consolidates quality status. |
| **SECTION R - SIGNOFF** | Signoff Item; Status; Issue; Quality Notes | Records release/governance signoff. |

## Appendix O — Expanded Header and Column Dictionary

| Dictionary Area | Governing Section | Required Coverage | Current Governance |
|---|---|---|---|
| Sheet header order | **SECTION H - SHEET HEADERS** | Sheet type, column order, header, source of data. | Header names and order are protected; updates require template, mapping, validation, and documentation synchronization. |
| Column presentation | **SECTION G - COLUMN DEFINITIONS** | Header, width, font size, date flag, hide flag, wrap, horizontal/vertical alignment, number format. | Presentation changes are dashboard-governed only where loaders and validators support them. |
| Identity headers | **SECTION H - SHEET HEADERS** | PMR identifiers, participant names, DOB, enrollment/disenrollment dates, Primary PMR Row. | Protected because they control matching, grouping, and sync ownership. |
| Generated Demo P headers | **SECTION H - SHEET HEADERS** | Primary PMR Row, update status/month/source, generated sort/helper fields. | Produced by Demo P processing and protected from ad hoc rename/removal. |
| Synchronization headers | **SECTION H - SHEET HEADERS** | Banner fields, Care Plan Due fields, Unlocked Care Plan fields, participant-level merged fields. | Synchronize to Master List Primary PMR rows only. |
| Date headers | **SECTION G - COLUMN DEFINITIONS** and global date header constants | DOB, enrollment/disenrollment dates, care plan dates, phone-valid dates, report dates. | Must receive governed date formatting and serial/date conversion handling. |
| Hidden helper headers | **SECTION G - COLUMN DEFINITIONS** | Processing/audit helper columns where implemented. | May be hidden in outputs but remain part of protected schema when used by workflows. |
| Validation headers | Dashboard Quality sections and report validators | Status, issue, quality notes, evidence, signoff fields. | Governed by Dashboard Quality shell and section-specific writers. |

## Appendix P — Expanded Data Mapping Matrix

| Mapping Path | Source Key | Destination Key | Transformation / Merge Rule | Validation / Failure Behavior |
|---|---|---|---|---|
| Imported B source to Banner output | Prompt month and source route | Banners monthly sheet | Copy/format from source into governed Banner output. | Invalid source fails; missing optional route can skip/log in bulk formatter. |
| Imported CD source to Care Plan Due output | Prompt month and source route | CP Due monthly sheet | Copy/format from source into governed Care Plan Due output. | Invalid source fails; missing optional route can skip/log in bulk formatter. |
| Imported UC source to Unlocked Care Plan output | Prompt month and source route | Unlock CP monthly sheet | Copy/format from source into governed Unlocked Care Plan output. | Invalid source fails; missing optional route can skip/log in bulk formatter. |
| Imported RD source to Raw Data output | Prompt month and source route | Raw Data monthly sheet | Copy/format from source into governed Raw Data output. | Raw Data validation blocks downstream Demo P if required structure is missing. |
| Raw Data to Demo P | Participant PMR / normalized participant identity | Demo P PMR rows | Flatten participant/contact rows, assign Primary PMR Row, generate update/source tracking. | Missing PMR/header identity fails before unsafe mutation. |
| Current/prior Raw Data to Monthly Change | PMR and section-specific comparison keys | Monthly Change report rows | Compare enrollment, disenrollment, demographic, caseload, contact, Banner, and Care Plan categories where implemented. | Missing current/prior dependencies or required headers fail. |
| Monthly Change to Demo P sync scope | Changed PMR collection | Demo P replacement set | Determines PMRs requiring fresh Raw Data rows during monthly sync. | Monthly Change dependency is required before monthly Demo P sync. |
| Demo P retained rows to Archive - Demo P | Existing Demo P PMR rows | Archive - Demo P append rows | Archive replacement rows before Demo P body rewrite. | Archive step must complete before replacement body mutation where required. |
| Demo P to Disenrolled Exclusion | Disenrolled PMR / status/date fields | Disenrolled Exclusion rows | Append qualifying records and remove qualifying Demo P rows. | Validation prevents unsafe removal and formats output after mutation. |
| Demo P to Master List | Primary PMR Row / PMR identity | Master List Primary PMR rows | Copy governed headers/data for Primary PMR operational output. | Missing/invalid Primary PMR architecture remains an open risk note and must be reviewed before future changes. |
| Banner to Master List | PMR / Banner matching fields | Master List Primary PMR row | Synchronize Banner summary/indicator fields to participant row. | Required sync headers/maps must exist or warn/fail according to workflow risk. |
| Care Plan Due to Master List | Participant/care-plan matching fields | Master List Primary PMR row | Synchronize care-plan due fields to participant row. | Dashboard Quality Section L validates sync readiness. |
| Unlocked Care Plan to Master List | PMR/care-plan matching fields | Master List Primary PMR row | Synchronize unlocked care-plan fields to participant row. | Dashboard Quality Section L validates sync readiness. |
| Workbook/archive sheets to Index | Sheet name, month, category, archive status | Index active and archive grids | Inventory active sheets and external archive sheets; generate links/actions. | Restore conflict blocks copy when target already exists. |

## Appendix Q — Expanded Function Ownership Map

| Function Group | Count / Scope | Owners | Safe-Change Notes |
|---|---:|---|---|
| Public entry points | 64 | Menu, trigger, web, workflow, validation, dashboard, archive, restore, and compatibility surfaces. | Must remain callable unless menus/triggers/routes/wrappers and documentation are migrated together. |
| Internal helpers | 617 | All implementation subsystems. | Not deletion-safe solely because trailing underscore is present; verify callers and dynamic paths. |
| Menu functions | 36 | User-facing workbook operations. | Callback strings are protected. |
| Workflow functions | 18 | Monthly source formatting, Demo P, Monthly Change, Master List, Disenrollment, archive, restore, setup, QA. | Validate dependencies before destructive mutation. |
| Process functions | 89 | Orchestration, report construction, comparison, archive/index, timing. | High coupling is expected in single-file architecture; review before behavior changes. |
| Formatters | 156 | Templates, outputs, dashboard, timing, Monthly Change, Demo P, report surfaces. | Preserve template-first and batch-formatting standards. |
| Validators | 30 | Dashboard, template, source, workflow, sync, quality, health. | Fail-fast behavior must not be weakened. |
| Dashboard functions | 125 | Format Dashboard, Dashboard Quality, changelog, system surfaces. | Preserve section schemas and section-scoped writes. |
| Utilities | 300 | Headers, dates, colors, ranges, maps, caches, properties, safe deletion, sorting. | Small utility changes can affect many workflows; run dependency review. |
| Configuration functions | 52 | Defaults, constants, dashboard sections, document properties, runtime cache. | Configuration changes require documentation and validator updates. |
| Trigger functions | 3 | `onOpen`, `onEdit`, `doGet`. | Apps Script callable names are protected. |

## Appendix R — Expanded Validation Matrix

| Validation Area | Owning Surface | Inputs | Pass Condition | Failure / Warning Handling |
|---|---|---|---|---|
| Dashboard global/title inputs | Dashboard Quality Section A | Format Dashboard Sections A-B | Required settings/rows exist and values are usable. | Missing/invalid settings fail readiness. |
| Sheet definitions | Dashboard Quality Section B | Format Dashboard Section C | Required sheet types, templates, names, colors, sizing fields exist. | Missing definition fails dependent build/validation. |
| Sheet behaviors | Dashboard Quality Section C | Format Dashboard Section D | Behavior rows exist and supported boolean/visibility fields are valid. | Invalid behavior fails dashboard readiness. |
| Column definitions | Dashboard Quality Section D | Format Dashboard Section G | Required columns have supported width/format/wrap/alignment settings. | Missing/duplicate/invalid definitions fail or warn by usage risk. |
| Sheet headers | Dashboard Quality Section E | Format Dashboard Section H | Header rows exist, are ordered, and contain required lineage. | Missing required identity/sync headers fail. |
| Tab organization and Index | Dashboard Quality Section F | Format Dashboard Section F and workbook sheets | Categories/ranks/special handling are present and Index rules can be applied. | Invalid organization blocks release readiness. |
| Template structure | Dashboard Quality Section G | Templates and signatures | Templates exist and match expected structure/formatting/signatures. | Missing/mismatched templates require rebuild or fail validation. |
| Framework health | Dashboard Quality Section I | Required function and surface registry | Required functions/sheets/timing/dashboard/template/archive surfaces exist. | Missing required surface fails health. |
| Performance summary | Dashboard Quality Section J | Framework Timing Report | Runtime evidence is current and no critical unresolved timing finding blocks release. | Slow/bottleneck/critical statuses guide remediation priority. |
| Raw Data validation | Dashboard Quality Section K | Raw Data sheet and headers | Required source structure is present. | Blocks Demo P and monthly processing when required source is invalid. |
| Care Plan sync validation | Dashboard Quality Section L | Care Plan Due / Unlocked Care Plan outputs and Master List sync fields | Sync keys/fields are available and consistent. | Blocks or warns according to data-integrity risk. |
| Workflow synchronization | Dashboard Quality Section M | Workflow outputs and sync expectations | Primary PMR, contact, Banner, Care Plan, and workflow expectations pass. | Fails readiness when synchronization expectations are unmet. |
| Demo P quality | Dashboard Quality Section N | Demo P rows/headers | Demo P structure and generated rows are usable. | Blocks downstream Master List/disenrollment if required fields fail. |
| Disenrolled Exclusion quality | Dashboard Quality Section O | Disenrolled Exclusion rows/headers | Exclusion records are governed and formatted. | Fails readiness if exclusion output is structurally invalid. |
| Monthly Change validation | Dashboard Quality Section P | Monthly Change output | Report sections and required outputs are valid. | Fails or warns; ML189-001 and ML189-005 are closed for Wave 1, while future Monthly Change validation changes still require evidence. |
| Summary and signoff | Dashboard Quality Sections Q-R | Stored section statuses | Summary and signoff reflect current evidence. | Release is not ready without acceptable summary/signoff. |

## Appendix S — Expanded Protected Standards Catalog

| Protected Surface | Examples | Why Protected | Change Requirement |
|---|---|---|---|
| Production version identity | `MASTER_LIST_MERGE_ML_VERSION`, `RFF_VERSION` | Controls release identity and dashboard/template versioning. | Versioned production update and documentation sync. |
| Public entry points | `runMonthlyUpdate`, `createMasterList`, `doGet`, `onOpen` | Menus, triggers, web routes, and users may call them directly. | Update all callbacks/routes/wrappers before rename/removal. |
| Menu callback strings | Master List menu items and submenus | Apps Script menus use string callback binding. | Verify workbook open and all menu actions after change. |
| Trigger/web surfaces | `onOpen`, `onEdit`, `doGet` | Apps Script runtime invokes by name. | Preserve names unless deployment migration is approved. |
| Sheet names/prefixes | **Index**, **Demo P**, **Master List**, **Monthly Change**, **Archive - Demo P** | Workflows resolve sheets by protected names/prefixes. | Update constants, dashboard defaults, templates, validators, Index, and archive logic. |
| Template names | **Template - Master List**, **Template - Demo P**, **RFF_BASE_TEMPLATE** | Template-first output depends on exact names. | Update sheet definitions, validators, template refresh, and docs. |
| Format Dashboard sections | Sections A-H | Dashboard loaders/validators depend on exact section titles and columns. | Update loaders, defaults, validators, Dashboard Quality, and documentation together. |
| Dashboard Quality sections | Sections A-R | Quality report shell and section writers depend on exact titles. | Update section registry, headers, writers, style routines, summary/signoff, and docs. |
| Header names and source lineage | PMR, Primary PMR Row, date, sync, update-tracking headers | Matching, mapping, validation, and synchronization depend on them. | Update dashboard headers, templates, source maps, validators, and tests. |
| Primary PMR ownership | Primary PMR Row | Core business rule for participant-level synchronization. | Business approval and complete workflow/test update required. |
| Archive and restore schema | Archive spreadsheet ID, Index archive grid, restore actions | Prevents data loss and restore conflicts. | Validate archive copy, local conflict protection, Index, web restore, and properties. |
| Runtime caches | Dashboard/header/monthly sheet/template/timing caches | Prevents stale reads and reduces SpreadsheetApp calls. | Add cache invalidation for any mutation affecting cached data. |
| Safe deletion protections | Protected sheet set and `RFF_` guard | Prevents accidental loss of framework-owned sheets. | Never weaken without explicit governance approval and tests. |
| Formatting standards | Template-first, dashboard-governed, batch formatting | Maintains consistency and performance. | Update templates/dashboard/defaults/validators together. |
| Validation fail-fast rules | Required dependency/header/source checks | Prevents corrupt governed output. | Do not downgrade blocking validation to warning without approval. |

## Appendix T — Formatting Compliance and Document Build Requirements

This appendix consolidates the formatting requirements from **Master_List/Specs/Appendix M – Personal Formatting Guidelines.md**, **Master_List/Specs/Formatting.md**, **Master_List/Specs/Formal_Section_Prompt**, and **Master_List/Specs/Framework_Spec_Formatting_Requirements**. The Markdown source remains the editable source for the framework specification; Google Docs, DOCX, and PDF outputs are generated artifacts.

| Requirement Area | Required Standard |
|---|---|
| Authoring platform | Google Docs is the primary authoring/review platform after Markdown build conversion. |
| Page size and margins | Letter 8.5 x 11 inches with 1 inch margins on all sides. |
| Paragraph alignment | Left aligned; no first-line indent. |
| Body text | Cambria 11 pt, black, regular, 1.15 line spacing, 5 pt before and 5 pt after. |
| Title | Calibri Bold 26 pt, color #366091, Title style, not section-numbered. |
| Subtitle | Calibri Italic 12 pt, color #4F81BD. |
| Heading 1 | Calibri Bold 20 pt, color #4F81BD; used for major numbered sections and appendices. |
| Heading 2 | Calibri Bold 16 pt, color #4F81BD; used for section subsections. |
| Heading 3 | Calibri Bold 14 pt, color #4F81BD; used for lower-level subsections. |
| Heading 4 | Calibri Bold 12 pt, color #4F81BD; used only where required. |
| Main section numbering | Major framework sections use sequential numbering: 1., 2., 3. |
| Subsection numbering | Heading 2 subsections use 1.1, 1.2; Heading 3 uses 1.1.1; Heading 4 uses 1.1.1.1. |
| Appendix numbering | Appendices use Appendix A, Appendix B, and so forth; appendix subsections use A.1, A.2, B.1, and so forth. |
| Page breaks | Heading 1 and every appendix begin on a new page in generated Google Docs/DOCX output. |
| Table of Contents | Generated output must include an automatic Table of Contents based on Heading 1-4. |
| Tables | Convert Markdown tables to native Google Docs/DOCX tables; never leave Markdown pipes in generated output. |
| Table header | Repeat header row; fill #C7D8EA or approved #A2BDDC where legacy styling requires it; Calibri Bold 12 pt; font color #366091. |
| Table body | Cambria 11 pt, top vertical alignment, left aligned, grid borders, 0.5 pt black borders, AutoFit Window where supported. |
| Lists | Standard round bullets; numbered lists preserve authored numbering; 0.25 inch left indent with matching hanging indent. |
| File names and file paths | Bold Cambria 11 pt body text, not code font. |
| Sheet names | Bold Cambria 11 pt body text. |
| Template names | Bold Cambria 11 pt body text. |
| Dashboard names and section names | Bold Cambria 11 pt body text. |
| Menu commands | Bold Cambria 11 pt body text. |
| Apps Script functions | Consolas 10.5-11 pt code identifier formatting. |
| Constants | Consolas code identifier formatting. |
| Document-property keys | Consolas code identifier formatting. |
| Code blocks | Courier New or equivalent monospace only for actual code blocks, examples, diagrams, or build-pipeline examples. |
| Diagrams | Center diagrams in generated document output and include descriptive titles when applicable. |
| Validation | Generated output must validate heading order, sequential numbering, appendix lettering, TOC coverage, table conversion, fonts, spacing, repeated table headers, and page numbers. |

### T.1 Markdown-to-Document Build Processing Order

1. Read Markdown source.
2. Parse document hierarchy.
3. Classify content by context.
4. Apply typography and heading styles.
5. Build native tables.
6. Build list styles.
7. Insert or update the automatic Table of Contents.
8. Insert page numbers.
9. Apply page breaks for Heading 1 and appendices.
10. Validate fonts, spacing, table conversion, numbering, TOC entries, and identifier classification.
11. Write DOCX and/or Google Docs output.

### T.2 Markdown Heading Mapping

| Markdown Source | Generated Document Style |
|---|---|
| `#` | Title style; no section number. |
| `##` | Heading 1; major sections and appendices. |
| `###` | Heading 2; numbered subsections. |
| `####` | Heading 3; lower-level numbered subsections. |
| `#####` | Heading 4; fourth-level numbered subsections. |

### T.3 Context-Aware Identifier Classification

The builder should classify identifiers by context instead of relying only on Markdown syntax. Examples:

| Source Text | Classification | Generated Formatting |
|---|---|---|
| **Master_List/Specs/Current_Working_Framework_Spec_v2.0** | File path | Bold Cambria 11 pt. |
| **Template - Master List** | Template/sheet name | Bold Cambria 11 pt. |
| **Master List** | Sheet name when used as workbook surface | Bold Cambria 11 pt. |
| `createMasterList()` | Apps Script function | Consolas 10.5-11 pt. |
| `runMonthlyUpdate()` | Apps Script function | Consolas 10.5-11 pt. |
| `HEADER_ROW` | Constant | Consolas. |
| `RFF_ARCHIVE_SPREADSHEET_ID` | Document-property key | Consolas. |

### T.4 Formal Section Structure Applied

This working specification applies the formal section structure requested for the framework build:

1. Main framework sections are numbered sequentially.
2. Main subsections are numbered hierarchically.
3. Appendices are promoted to major Heading 1 appendices.
4. Appendix subsections use appendix-letter numbering where applicable.
5. The generated document builder must link multilevel numbering to Heading 1-4 styles instead of manually formatted text.

### T.5 Build Validation Requirements

Before saving generated Google Docs, DOCX, or PDF output, validate that:

- No headings were skipped.
- No body paragraphs were incorrectly converted to headings.
- Main section numbering is sequential.
- Appendix lettering is sequential.
- Every numbered heading appears in the Table of Contents.
- Table layouts and page formatting remain intact.
- Markdown tables are converted to native tables.
- Required fonts, colors, spacing, and list indents are applied.
- Page numbers are present where required.
- File/sheet/template/dashboard/menu labels are bold Cambria body text.
- Functions, constants, and document-property keys remain code identifiers.
## Appendix U — v1.8.9.2 Production Update and Wave 1 Closure

This appendix updates the framework specification after review of **Master_List/Current Production Script/v1.8.9.2_Current_Production**, **Master_List/Audit Summary/WAVE_1_CLOSURE_SUMMARY_v1.8.9.3.md**, **Master_List/Reports/v1.8.9.2 Updates.md**, **Master_List/Reports/v1.8.9.1 - Framework Timing Report.pdf**, and **Master_List/Reports/v1.8.9.1 - Dashboard Quality Report.pdf**. At Wave 1 closure, the production source was v1.8.9.2; current authority is updated in the baseline and v1.8.9.3 evidence appendix.

| Update Area | v1.8.9.2 Result | Spec Treatment |
|---|---|---|
| Production baseline | Version is `1.8.9.2`, with 15,980 lines, 681 declared functions, 64 public entry points, and 617 internal helpers. | Current Production Baseline and Function Organization updated. |
| Create Monthly Start workflow | New public workflow `runMonthlyStart` implements Date Prompt, Build Demo P, Create Disenrolled, Create Master List. | Workflow Architecture and Public Entry Point Inventory updated. |
| Master List replacement preflight | Existing Master List replacement confirmation occurs before Demo P mutation in Monthly Start and is represented in v1.8.9.2 closure evidence for Monthly Update protection. | Error Handling, Workflow Architecture, and risk notes treat Wave 1 replacement-preflight risk as closed for documented scope. |
| Dashboard Quality health registry | `runMonthlyStart` is included in required menu/function health expectations. | Function Organization and Validation Matrix preserve it as a public callable surface. |
| Menu structure | Data & Processing Engine includes Format Monthly Sheets, Create Monthly Start, and Create Monthly Update; maintenance menus retain targeted rebuild workflows. | Workflow Architecture treats menu callback strings as protected. |
| Strict first-of-month disenrollment rule | Closure summary marks strict first-of-month rule and centralized Monthly Change disenrollment helper CLOSED / PASSED. | ML189-001 risk note updated to closed for Wave 1. |
| Monthly Change Disenrollments sort index | Closure summary marks report-header sort index CLOSED / PASSED. | ML189-005 risk note updated to closed for Wave 1. |
| Primary PMR fail-closed Master List behavior | Closure summary marks Primary PMR fail-closed behavior CLOSED / PASSED. | ML189-003 risk note updated to closed for Wave 1. |
| Timing and quality evidence | v1.8.9.1 Framework Timing and Dashboard Quality PDF reports were supplied as closure evidence. | Reports are treated as binary evidence inputs only; they are not implementation artifacts and are not committed. |
| Next remediation wave | Wave 3 is now CLOSED / PASSED by **Master_List/Audit Summary/WAVE_3_CLOSURE_SUMMARY_v1.8.9.3.md**. | ML189-004 is closed; next wave is Wave 4 performance and timing optimization planning. |

### U.1 Wave 1 Closure Status

Wave 1 is CLOSED / PASSED for the documented scope: strict first-of-month disenrollment rule, centralized Monthly Change disenrollment helper, Monthly Change Disenrollments report-header sort index, Create Monthly Update preflight Master List replacement confirmation, approved Create Monthly Update sequence, duplicate prompt bypass after preflight confirmation, Primary PMR fail-closed Master List behavior, Dashboard Quality review, Framework Timing review, and rollback evidence.

### U.2 Remaining Open Review Items After Wave 1

| Item | Status | Required Future Handling |
|---|---|---|
| ML189-004 workflow-level lock/busy guard audit | CLOSED / PASSED in Wave 3. | Retain Wave 3 closure evidence; future concurrency/public API changes must preserve `runFrameworkTimed_`, prompt-before-lock behavior, menu compatibility, and dynamic/web route safety. |
| ML189-006 Monthly Change full-range clear/format performance target | Open cleanup/performance candidate. | Use timing evidence before changing range bounds. |
| ML189-007 system-sheet underscore menu callbacks | Open maintainability candidate. | Preserve compatibility or migrate callbacks through approved public wrapper change. |
| ML189-008 stale authority text outside this spec | Partially addressed. | Update remaining project README/spec authority text in a separate documentation cleanup if still stale. |

### U.3 Current Production Governance Statement

At v1.8.9.2 Wave 1 closure, the framework specification treats Wave 1 as closed for documentation purposes. The current implementation source of truth is updated in the Current Production Baseline and v1.8.9.3 evidence appendix. Future code changes must create a new versioned production source and must not overwrite prior production versions.

## Appendix V — v1.8.9.3 Reference Inventory Update Plan

The legacy files in **Master_List/v2_Framework_Reference** remain supporting reference material. They should not be edited in place to appear current when their names identify older baselines such as v1.6.29. If detailed current inventories are needed, create new v1.8.9.3 inventory files and keep the older files as historical traceability inputs.

| Priority | New v1.8.9.3 Inventory | Replaces / Supersedes Historical Reference | Why Update |
|---|---|---|---|
| Required | **ARCHITECTURE_INVENTORY_v1.8.9.3.md** | **ARCHITECTURE_INVENTORY_v1.6.29.md** and current production architecture notes | Captures the active single-file module architecture, workflow layers, dashboard/template ownership, Index/archive/restore surfaces, and Wave 1 production closure state. |
| Required | **CONFIGURATION_INVENTORY_v1.8.9.3.md** | **CONFIGURATION_INVENTORY_v1.6.29.md** | Captures current constants, document properties, feature flags, dashboard-loaded settings, cache invalidation surfaces, and v1.8.9.3 authority values. |
| Required | **DASHBOARD_INVENTORY_v1.8.9.3.md** | **DASHBOARD_INVENTORY_v1.6.29.md** and **DASHBOARD_INVENTORY_v1.6.29-2.md** | Captures Format Dashboard Sections A-H, including Section F Tab Organization & Index, Section G Column Definitions, and Section H Sheet Headers. |
| Required | **WORKSHEET_INVENTORY_v1.8.9.3.md** | **WORKSHEET_INVENTORY_v1.6.29.md** | Captures current system, template, operational, monthly, source, archive, and hidden-sheet lifecycle definitions. |
| Required | **TEMPLATE_INVENTORY_v1.8.9.3.md** | **TEMPLATE_INVENTORY_v1.6.29.md** | Captures current template names, output patterns, dimensions, signatures, hidden state, validation rules, and template-first generation governance. |
| Required | **VALIDATION_CATALOG_v1.8.9.3.md** | **VALIDATION_CATALOG_v1.6.29.md** and **VALIDATION_CATALOG_v1.6.29-2.md** | Captures current fail-fast rules, Dashboard Quality Sections A-R, workflow preflights, template validation, health checks, and Wave 1 closed/open validation findings. |
| Required | **FUNCTION_INVENTORY_v1.8.9.3.md** | **HELPER_CATALOG_v1.6.29.md**, **WRAPPER_INVENTORY_v1.6.29.md**, **WRAPPER_INVENTORY_v1.6.29-2.md**, and function portions of v2.0 governance references | Captures 681 declared functions, 64 public entry points, 617 internal helpers, menu/trigger/web surfaces, dynamic callback risks, and open ML189-007 wrapper/callback governance. |
| Required | **FUNCTION_CALL_GRAPH_v1.8.9.3.md** | **FUNCTION_CALL_GRAPH_v1.6.29.md** | Supports safe-change review for callers, indirect callers, workflow sequencing, menu callbacks, triggers, web routes, dynamic invocation, and high-complexity functions. |
| Required | **PRODUCTION_DATA_FLOW_v1.8.9.3.md** | **PRODUCTION_DATA_FLOW_v1.6.29.md** | Captures current source-to-output flow for monthly formatting, Demo P, Monthly Change, Disenrolled Exclusion, Master List, Dashboard Quality, Index, archive, and restore. |
| Recommended | **CACHE_INVENTORY_v1.8.9.3.md** | **CACHE_INVENTORY_v1.6.29.md** | Useful because cache invalidation is a protected performance/safety surface, especially after dashboard, template, sheet, header, Index, timing, and quality mutations. |
| Recommended | **ENGINEERING_GOVERNANCE_REFERENCE_v1.8.9.3.md** | **ENGINEERING_GOVERNANCE_REFERENCE_v1.6.29.md**, **ENGINEERING_GOVERNANCE_REFERENCE_PART_VI_v1.6.29.md**, and v2.0 governance reference files | Useful only if a separate governance reference is still desired; otherwise the framework specification remains the active governing document. |
| Optional | **FRAMEWORK_RULES_CATALOG_v1.8.9.3.md** | **FRAMEWORK_RULES_CATALOG_v1.6.29.md** | Useful if maintainers need a standalone rules checklist extracted from the framework spec. |
| Optional | **TRACEABILITY_MATRIX_v1.8.9.3.md** | **ENGINEERING_GOVERNANCE_REFERENCE_v2.0_TIER_4_IMPLEMENTATION_TRACEABILITY_MATRIX.md** | Useful if future reviews require a separate source-to-spec-to-test traceability artifact. |

Minimum current-inventory package for v1.8.9.3: architecture, configuration, dashboard, worksheet, template, validation, function inventory, function call graph, and production data flow. Cache and governance inventories are recommended when future work touches performance, triggers, concurrency, wrappers, public interfaces, dashboard loading, or template refresh behavior. Older v1.6.29 and v2.0 files should remain historical unless an archive index explicitly moves them.

## Appendix W — v1.8.9.3 Live Workbook Evidence Pass

This appendix records review of the live workbook export **Master_List/Reports/Copy of v1.8.9.3.xlsx**. The workbook was reviewed as runtime evidence only; it is a binary review input and is not committed as an implementation artifact. The **Index** tab is intentionally absent from the workbook export for data-privacy reasons and is therefore not treated as missing framework functionality.

| Evidence Area | Live Workbook Result | Specification Treatment |
|---|---|---|
| Workbook version marker | **Framework Timing Report**, **Dashboard Quality Report**, and **Format Dashboard** identify `v1.8.9.3`. | Current evidence baseline updated to v1.8.9.3 while Wave 1 closure history remains documented under v1.8.9.2. |
| Production script extraction | **Master_List/Current Production Script/v1.8.9.3_Current_Production** reports version `1.8.9.3`, 15,975 lines, 681 declared functions, 64 public entry points, and 617 internal helpers. | Current Production Baseline updated without changing public inventory counts. |
| Format Dashboard | Workbook contains Sections A-H and confirms current dashboard section ordering. | Dashboard architecture remains A-H, including Section F Tab Organization & Index, Section G Column Definitions, and Section H Sheet Headers. |
| Dashboard Quality Report | Workbook contains Sections A-R with 96 PASS statuses and no FAIL/WARN statuses detected in the exported values. | Dashboard Quality evidence supports current quality-shell completeness and section-scoped validation behavior. |
| Framework Timing Report | Workbook contains Sections A-D and process summary entries for template creation, Dashboard Quality validation/workflow, Format Monthly Sheets, Create Monthly Start, Create Monthly Update, Monthly Change, Demo P sync, Disenrolled List, Master List, archiving, and Banner formatting. | Timing evidence is current but not treated as performance closure; slow, bottleneck, and critical entries remain performance-review inputs. |
| Wave 3 closure summary | **Master_List/Audit Summary/WAVE_3_CLOSURE_SUMMARY_v1.8.9.3.md** marks Wave 3 CLOSED — COMPLETED AND PASSED REVIEW. | ML189-004 is closed for trigger, concurrency, and public API safety scope. |
| Wave 3 implementation notes | **Master_List/Audit Summary/WAVE_3_IMPLEMENTATION_RELEASE_NOTES_v1.8.9.3.md** states the five standalone mutating public workflows now run through `runFrameworkTimed_` after prompts. | Preserved as implementation evidence supporting Wave 3 closure. |
| Dynamic reference map | **Master_List/Audit Summary/EXHAUSTIVE_TRIGGER_DYNAMIC_REFERENCE_MAP_v1.8.9.3.md** documents menus, callback strings, trigger routes, web routes, and dynamic references. | Public-interface and callback governance remain protected surfaces for future safe-change review. |
| Next wave | Wave 3 closure summary identifies **Wave 4 — Performance and timing optimization planning** as the next wave. | Performance/timing work must not change business logic unless a specific correctness defect is discovered and separately approved. |
| Privacy handling | Index was intentionally removed from the workbook export. | Appendix expansion may use dashboard/timing/quality/template evidence from this workbook, but Index row-level evidence still requires a privacy-safe export if exact Index validation is needed. |

Current v1.8.9.3 evidence updates the framework baseline, confirms live Dashboard Quality / Framework Timing availability, and closes Wave 3 trigger/concurrency/public API safety scope. It does not authorize deletion of historical evidence, removal of protected callback strings, or closure of remaining performance findings. Performance and timing optimization planning moves to Wave 4 and must use the v1.8.9.3 Dashboard Quality and Framework Timing reports as inputs.
