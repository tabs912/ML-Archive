<!-- markdownlint-disable MD013 MD022 MD024 MD032 MD033 MD056 MD058 MD060 -->

# Master List Framework Specification v2.0

**Authoritative implementation:** `Master_List/Current Production Script/v.1.6.29_Current_Production_Script`.

**Authoritative dashboard governance source:** `Format Dashboard`. The Format Dashboard governs formatting, worksheet definitions, report templates, header mappings, sheet behaviors, presentation standards, template governance, output visibility, template sizing, and system-sheet surfaces.

**Governance rule:** this v2.0 specification is current-state only. Earlier baselines, predecessor workflow names, and prior framework references are not governing. When documentation and production behavior differ, the Current Approved Production Script and Format Dashboard governance model control.

## 1. Executive Authority and Scope

The Master List Framework is a single-file Google Apps Script production framework for dashboard-governed monthly source formatting, Demo P processing, Master List creation/update, Monthly Change reporting, Disenrollment management, Dashboard Quality governance, template governance, timing instrumentation, cache optimization, system-sheet management, and release verification. The framework is governed by protected production sections, stable public APIs, menu and trigger callbacks, template signatures, dashboard quality outputs, and cache invalidation rules.

This specification incorporates the current architecture, cache, dashboard, wrapper, rules, performance, error-handling, health, and read/write inventories. It removes prior-release references as governing authority and treats the approved v1.6.29 production implementation as the source of truth for the v2.0 framework specification.

## 2. Protected Production Manifest

| Section | Start Line | End Line | Functions | Public APIs | Internal Functions |
|---|---:|---:|---:|---:|---:|
| CONFIGURATION | 29 | 232 | 0 | 0 | 0 |
| HELPER FUNCTIONS | 233 | 2676 | 147 | 6 | 141 |
| MENU FUNCTIONS | 2677 | 3166 | 22 | 5 | 17 |
| FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS | 3167 | 3777 | 12 | 0 | 12 |
| TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS | 3778 | 8147 | 199 | 19 | 180 |
| SYNC FUNCTIONS | 8148 | 8562 | 13 | 0 | 13 |
| DEMO P FUNCTIONS | 8563 | 9851 | 41 | 4 | 37 |
| MONTHLY CHANGE FUNCTIONS | 9852 | 11160 | 30 | 3 | 27 |
| MASTER LIST FUNCTIONS | 11161 | 12922 | 73 | 7 | 66 |
| DISENROLLMENT FUNCTIONS | 12923 | 13585 | 22 | 1 | 21 |
| DASHBOARD QUALITY AND FRAMEWORK DASHBOARD FUNCTIONS | 13586 | 15556 | 105 | 11 | 94 |
| FRAMEWORK AND TIMING FUNCTIONS | 15557 | 15732 | 8 | 1 | 7 |

Protected section boundaries are part of the production architecture. AI and human changes must preserve public API names, menu callback strings, trigger entry points, Format Dashboard schema, template metadata/signature behavior, cache invalidation paths, and Dashboard Quality evidence outputs unless an approved versioned migration updates all affected surfaces together.

## 3. Format Dashboard Authority

| Format Dashboard Section | Governing Scope |
|---|---|
| SECTION A - GLOBAL SETTINGS | Header row, data start row, freeze settings, row heights, default widths, date/number/text formats, wrapping, alignment, font, colors, HSL levels, border style, and template version. |
| SECTION B - TITLE ROWS | Title row purposes, value sources, target cells, row heights, font sizes, font weight, fill levels, alignment, wrapping, and notes. |
| SECTION C - SHEET DEFINITIONS | Sheet type, report title, template name, output naming pattern, base color, prompt-date usage, end-date source, row count, column count, row mode, buffers, test rows, and test-row usage. |
| SECTION D - COLUMN DEFINITIONS | Header-level width, header font size, date-column flag, hidden-column flag, data wrap, horizontal alignment, vertical alignment, and number format. |
| SECTION E - SHEET BEHAVIORS | Title-row usage, filters, alternating colors, subheaders, hidden templates, and output visibility. |
| SECTION F - SHEET HEADERS | Sheet type, column order, header name, and source-of-data lineage. |
| SECTION G - SYSTEM SHEET SURFACES | System sheet name, display name, sort order, output visibility, title colors, global defaults, and notes. |

Format Dashboard values are runtime-editable only where loaders and validators support them. Format Dashboard schema, section names, column order, sheet types, template names, header names, and system-surface identities are protected.

## 4. Production Runtime Flow
1. `onOpen` constructs the Master List menu and exposes menu callbacks.
2. Startup workflows create/refresh Format Dashboard defaults, system sheets, templates, Dashboard Quality shells, Timing report shells, and Index Dashboard surfaces.
3. Monthly source-formatting workflows prompt for a locked month, resolve source/output names, and apply Format Dashboard governed formatting.
4. Demo P workflows validate raw source structure, flatten participant/contact rows, assign Primary PMR rows, update changed PMRs, sort and format Demo P outputs, and clean active PMRs from disenrolled exclusion.
5. Sync functions enrich Master List row data from Banner, Unlocked Care Plan, and Care Plan Due source maps.
6. Master List workflows create outputs from Demo P and templates, copy governed headers/data, apply formatting, handle PMR row display, and maintain system/index sheet order.
7. Monthly Change workflows compare current/prior raw Demo P rows across protected change sections and write dashboard-formatted reports.
8. Disenrollment workflows detect disenrolled PMRs, move/remove rows, append exclusion records, and format exclusion outputs from governed templates.
9. Dashboard Quality workflows validate Format Dashboard, templates, performance, health, Master List, Care Plan sync, workflow sync, summary, and signoff sections.
10. Framework Timing wraps eligible workflows, records step marks and recommendations, and writes timing evidence.

## 5. Governing Rules

The Framework Rules Catalog defines 80 stable governing rules. The following rule groups are mandatory for v2.0 maintenance:

- Current production script authority and Format Dashboard formatting authority.
- Format Dashboard sections A-G schema and loader/validator contracts.
- Public API, helper, wrapper, menu callback, and trigger naming contracts.
- Monthly naming, prompt-month, date normalization, and sheet uniqueness rules.
- Header, header-map, monthly sheet, dashboard config, dimension, template signature, quality-section, index-signature, and timing-state cache rules.
- Batch read, bulk write, in-memory/one-pass processing, lookup, and performance recommendation rules.
- Primary PMR, PMR normalization, Demo P preflight, flattening, and monthly sync data-integrity rules.
- Sync ownership for Banner, Unlocked Care Plan, and Care Plan Due sources.
- Master List, Monthly Change, and Disenrollment template/output lifecycle rules.
- Template resolution, smart refresh, staged build, metadata, filters, hidden-template behavior, date/number formatting, hidden columns, and row-height lock rules.
- Archive, system-sheet visibility, global sort order, dashboard quality, framework health, workflow sync, timing, error handling, destructive operation, and AI no-removal rules.

See `FRAMEWORK_RULES_CATALOG_v1.6.29.md` for the complete 80-rule table with owners, implementing functions, validation functions, dashboard/configuration control flags, protected status, and AI modification guidance.

## 6. Public API, Wrappers, Menus, and Triggers

The current production script exposes 57 public Apps Script-callable functions. Public functions omit trailing underscores. Internal helpers use trailing underscores. Public functions, wrapper aliases, menu callbacks, and trigger entry points are protected.

Core trigger surfaces:

| Trigger | Entry Point | Governance |
|---|---|---|
| Simple open trigger | `onOpen` | Builds the Master List menu; must remain callable by Apps Script. |
| Installable spreadsheet on-change trigger | `handleSpreadsheetChangeForIndex` installed by `setupIndexRefreshOnSheetAddedTrigger_` | Refreshes Index only on grid insert/remove and uses `RFF_INDEX_SHEET_SIGNATURE` to avoid redundant rebuilds. |

Menus are governed by `ML_MENU_CALLBACKS` and `onOpen`; callbacks must stay synchronized with UI labels, wrappers, and implementation functions. See `WRAPPER_INVENTORY_v1.6.29.md` and `ENGINEERING_GOVERNANCE_REFERENCE_PART_VI_v1.6.29.md` for complete catalogs.

## 7. Data Governance and Lineage

Format Dashboard Section F is the governing data dictionary for sheet header order and source-of-data lineage. Format Dashboard Section D is the governing presentation dictionary for column formatting. Demo P raw/flat transformations, Sync Functions, Monthly Change comparisons, Master List copy logic, and Disenrollment exclusion flows must preserve header names, PMR normalization, DOB handling, contact lineage, source maps, and dashboard-governed template outputs.

Critical lineage anchors:

- `Participant PMR#` / `PMR #` normalization controls participant identity and joins.
- `Primary PMR Row` controls primary-row grouping and display semantics.
- Raw Data feeds Demo P; Demo P feeds Master List, Disenrolled Exclusion, and Monthly Change comparisons.
- Banner, Unlocked Care Plan, and Care Plan Due sheets enrich Master List row data through Sync Functions.
- Monthly Change sections are protected enumerations for enrollment, disenrollment, demographics, caseload, and contact changes.

## 8. Template Governance

Templates are resolved from Format Dashboard Section C sheet definitions, Section E behaviors, Section F headers, Section D column definitions, and Section A global presentation standards. Template refresh decisions use expected format signatures, document-property signatures, and sheet-note signatures. Metadata-only refresh is allowed only when the existing normalized signature matches expected dashboard/template structure. Full rebuild is required when signatures differ, template structure is missing, or governance settings force rebuild. Staged build behavior protects existing templates when enabled.

## 9. Cache and Performance Governance

The framework uses in-memory and persistent caches to reduce SpreadsheetApp calls and preserve workflow evidence. Header, header-map, sheet-dimension, monthly sheet lookup, dashboard config, template signature, index signature, Dashboard Quality section, Dashboard Quality last-run, and framework timing state caches are protected. Cache invalidation is required after sheet mutations, header changes, row/column dimension changes, dashboard rebuilds, monthly archive/delete/rename operations, template refreshes, quality-section writes, and index rebuilds.

Performance rules: batch reads, bulk writes, in-memory transforms, maps/sets, cached lookups, range lists, timing reports, and recommendation rows are preferred. AI must not introduce repeated cell-by-cell reads/writes or repeated full-sheet scans when existing batch patterns are available.

## 10. Quality, Validation, Error Handling, and Timing

Quality gates are implemented through Dashboard Quality startup, template validation, full quality workflow, framework smoke validation, framework health check, Master List validation, Care Plan sync diagnostics, workflow synchronization verification, summary, and signoff sections. Error handling uses blocking throws for integrity failures and best-effort catch/log/skip behavior for non-critical UI/formatting/report operations. Timing wrappers preserve performance evidence through `runFrameworkTimed_`, runtime timing helpers, framework timing report sections, thresholds, recommendations, and retention limits.

## 11. AI Development Governance

AI agents must preserve approved business logic, public API names, menu callback strings, trigger entry points, Format Dashboard schema, template names, sheet types, header names, system surface definitions, cache invalidation, timing instrumentation, dashboard quality evidence, and wrapper compatibility. AI may propose changes, but protected production rules may only be modified through explicit approval and coordinated updates to production code, Format Dashboard defaults, templates, validators, tests, timing expectations, and inventories.

Required inventories to review before changes: architecture, dashboard, cache, wrapper, framework rules, engineering governance, error/performance catalogs, function call graph, helper catalog, template inventory, worksheet inventory, validation catalog, production data flow, and configuration inventory.

## 12. Reference Package Incorporated

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

## 13. Release Statement

This v2.0 specification is a current-state governing specification for the Master List Framework. It is production-facing, implementation-bound, dashboard-governed, and intended to supersede earlier framing as a specification artifact while preserving approved business logic embodied in the Current Approved Production Script.
