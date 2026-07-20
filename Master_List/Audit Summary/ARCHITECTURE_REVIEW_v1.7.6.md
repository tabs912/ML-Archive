# Master List Framework Architecture Review v1.7.6

**Review type:** Architecture review
**Governing production source:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`
**Manifest reviewed:** `Master_List/Current Production Script/appsscript.json`
**Date:** 2026-07-20

## Executive Summary

The v1.7.6 Master List framework remains a single-file, sectioned Google Apps Script application with a clear operational center of gravity: spreadsheet menu entry points invoke monthly formatting, Demo P, Master List, Monthly Change, Disenrollment, Dashboard Quality, Index, template, and timing workflows. The architecture is coherent for the current approved business workflow and does not show a defect that justifies rebuilding the framework.

The primary architectural strength is its explicit workflow segmentation. The production script is organized into named sections for configuration, helpers, menus, dashboard defaults, templates, sync, Demo P, Monthly Change, Master List, Disenrollment, Dashboard Quality, and timing. The major workflows share common conventions: public menu-facing functions do not use trailing underscores, internal helpers generally do, month selection is centralized, workbook surfaces are governed by constants and dashboard definitions, and timing/locking wrappers provide cross-cutting operational controls.

The primary architectural weakness is scale pressure from the single-file design. With 672 function declarations and many shared helper dependencies, logical modules are present by section but not enforced by file boundaries. Several areas mix orchestration, validation, formatting, persistence, and UI concerns in the same section or function cluster. This increases dependency-review cost and makes future growth harder, especially around Format Dashboard governance, Dashboard Quality, Framework Timing, Index restoration, and template operations.

Recommended next steps are incremental and non-disruptive: document logical module ownership, formalize public API and callback inventories for v1.7.6, split only documentation/inventory first, and consolidate duplicate wrapper or alias surfaces only after dependency review. Do not rebuild the framework.

## Scope and Method

This review evaluated the architecture of v1.7.6 against the requested criteria:

- Entry points and public interfaces
- Module organization and separation of responsibilities
- Function ownership and logical boundaries
- Data flow between processes
- Configuration architecture
- Helper organization and dependency relationships
- Public APIs and internal interfaces
- Coupling and cohesion
- Layering and architectural consistency
- Maintainability and readability
- Scalability as the framework grows
- Opportunities to simplify without changing business logic

The review used static inspection of the current production script, manifest, project README, project specification, and existing v2 framework reference materials. No production code changes were made.

## Architecture Inventory

| Layer / Section | Lines | Primary Responsibility | Architectural Assessment |
| --- | ---: | --- | --- |
| Configuration | 1-256 | Version metadata, cache globals, feature flags, property keys, sheet types, sheet names, headers, and display constants | Centralized and readable, but very broad; it acts as both configuration registry and early runtime-service owner. |
| Helper Functions | 257-2703 | Shared date, sheet, header, cache, formatting, timing, logging, and utility functions | Useful shared layer, but very large and partly cross-cutting; ownership boundaries are implicit. |
| Menu Functions | 2704-3236 | Spreadsheet UI, menu callback registry, onEdit/onOpen handlers, visibility/layout wrappers | Strong entry-point grouping; menu callback strings must remain protected public interfaces. |
| Format Dashboard and Global Defaults | 3237-3834 | Dashboard schema/default rows and loader/validator support | Correctly centralizes governance defaults; tightly coupled to template and quality layers by design. |
| Template Functions and Validation Formatters | 3835-8200 | Template creation, refresh, formatting, validation, source formatting, archive utilities | High cohesion around governed worksheets, but this section carries multiple submodules and is the largest architectural pressure point. |
| Sync Functions | 8201-8585 | Banner, Unlocked, Care Plan Due, and source-map synchronization into Master List data | Good bounded ownership over source enrichment; depends on common mapping/header helpers. |
| Demo P Functions | 8586-9875 | Raw Data to Demo P processing, PMR/contact flattening, update/build workflows | Cohesive workflow owner with critical downstream dependencies. |
| Monthly Change Functions | 9876-10882 | Current/prior dataset comparisons and Monthly Change report construction | Cohesive comparison/report layer; depends on Raw Data/Demo P/Master List contracts. |
| Master List Functions | 10883-12674 | Master List creation/update, Index, archive restore, sorting, display, web-app restore route | Mixed responsibility: production report ownership plus Index/navigation/archive web restoration. |
| Disenrollment Functions | 12675-13284 | Disenrolled Exclusion construction and cleanup of Demo P/Master List rows | Cohesive business workflow with expected downstream mutation risk. |
| Dashboard Quality and Framework Dashboard | 13285-15580 | Quality reports, validation sections, health checks, summary/signoff dashboards | Strong quality boundary, but naturally coupled to nearly every other module. |
| Framework and Timing Functions | 15581-15785 | Workflow timing wrapper, workflow busy lock, deferred Index refresh, final timing helpers | Clear cross-cutting service layer, but located at the end and called upward by most workflows. |

## Entry Points and Public Interfaces

### Public surfaces observed

- Simple edit trigger: `onEdit(e)` delegates Format Dashboard highlighting.
- Simple open trigger: `onOpen()` constructs the `Master List` menu and submenu tree.
- Menu callback strings: `ML_MENU_CALLBACKS` and the `onOpen()` `.addItem()` calls define protected callback dependencies.
- Web-app endpoint: `doGet(e)` supports archive/index restore routing.
- Configuration UI functions: `configureArchiveSpreadsheetId()` and `configureIndexRestoreWebAppUrl()` persist workbook-specific external IDs/URLs.
- Public workflow functions: monthly formatting, Demo P build/update, Master List creation, Monthly Change, Disenrollment, Dashboard Quality, Framework Timing, template, Index, and system-sheet setup functions.
- Manifest interface: V8 runtime, America/Chicago time zone, Stackdriver exception logging, and scopes for spreadsheets, container UI, ScriptApp, and script storage.

### Assessment

The public interface model is understandable and mostly consistent: public callable functions omit the trailing underscore and internal functions generally use a trailing underscore. The major exception is that a few underscore-suffixed functions are used directly as menu callbacks, specifically `hideSystemSheets_` and `showSystemSheets_`. This is not a runtime defect, but it weakens the naming convention because menu callbacks are public Apps Script entry points even when named as internal helpers.

### Recommendation

Preserve all current callback names for compatibility. If simplification is desired, add public wrapper names such as `hideSystemSheetsNow` / `showSystemSheetsNow` to menu definitions only after confirming all existing menus, triggers, and user documentation are updated. Do not remove the existing underscore functions without a dependency review.

## Module Organization and Separation of Responsibilities

The current section architecture is serviceable and maps to the production workflow. The most useful boundaries are:

1. Configuration and dashboard definitions
2. Shared helpers
3. UI/menu entry points
4. Template and worksheet formatting
5. Business workflows: Demo P, Monthly Change, Master List, Disenrollment
6. Quality/timing/system governance

### Strengths

- Named section headers make the single file navigable.
- Business workflows are grouped by output domain.
- Template governance is centralized rather than copied into each report flow.
- Dashboard Quality and Framework Timing provide cross-cutting operational evidence.
- Sync functions are isolated from Master List row mutation logic.

### Weaknesses

- The helper section is too broad to communicate ownership by itself.
- The template section is effectively multiple modules: template creation, validation, report source formatting, archive behavior, and framework smoke validation.
- Master List functions also own Index generation, archive restore, web-app restore routing, tab ordering, template visibility wrappers, and row display management.
- Dashboard Quality necessarily crosses module boundaries, but the architecture would benefit from an explicit registry documenting which checks belong to which workflow owner.

### Recommendation

Do not split production code immediately. First create or update v1.7.6 inventories that document logical owners within the single file. If future source modularization is approved, split by logical module while preserving public API names and Apps Script load order.

## Function Ownership and Logical Boundaries

| Owner | Owned Responsibilities | Boundary Risks |
| --- | --- | --- |
| Configuration | Global constants, sheet/report names, version, feature flags, property keys | Constants are broad and support many workflows; changes require full dependency review. |
| Dashboard Defaults | Format Dashboard schema and default rows | Dashboard schema changes affect templates, validation, quality, formatting, and reports. |
| Template Framework | Template lifecycle and template-driven formatting | Carries multiple responsibilities; template and source-formatting concerns can blur. |
| Demo P | Raw Data normalization and participant/contact processing | Critical upstream dependency for Master List, Monthly Change, Disenrollment. |
| Sync | External monthly source enrichment | Good logical boundary; depends on stable headers and PMR keys. |
| Master List | Master List outputs and row display | Also owns Index/archive restore concerns, creating mixed responsibilities. |
| Monthly Change | Change detection and report output | Depends on current/prior data contracts and formatting helpers. |
| Disenrollment | Exclusion list and row cleanup | Mutates downstream sheets; should remain tightly validated. |
| Dashboard Quality | Validation, health, and release evidence | Cross-module by nature; needs clear mapping to owners. |
| Timing/Locking | Workflow busy flag, locks, timing evidence, deferred Index refresh | Clear cross-cutting concern; dependency direction is upward because it is placed after workflows. |

## Data Flow Between Processes

The core production data flow is coherent:

1. Imported monthly source sheets are formatted into governed monthly report sheets.
2. Raw Data is normalized and processed into Demo P.
3. Demo P is enriched with Banner, Unlocked Care Plan, and Care Plan Due data through sync functions.
4. Master List is created from Demo P primary rows plus synchronized fields.
5. Monthly Change compares current and prior datasets and produces change sections.
6. Disenrollment identifies disenrolled PMRs, updates Disenrolled Exclusion, and removes/cleans affected Demo P and Master List rows.
7. Index and system-sheet workflows organize workbook navigation and surface status.
8. Dashboard Quality and Framework Timing consume workflow evidence and configuration state for validation and release readiness.

### Assessment

The data flow is layered around workbook surfaces rather than file modules. That is appropriate for Apps Script spreadsheet automation. The architecture correctly treats sheet names, headers, PMR normalization, template definitions, and dashboard sections as data contracts.

### Risk

Because data contracts are embedded as constants, default dashboard rows, template metadata, and live workbook sheets, a single header or sheet-name change can break multiple workflows. This is expected but should remain formally governed.

## Configuration Architecture

Configuration is centralized through:

- Script constants for version, flags, sheet names, property keys, timing limits, and templates.
- `SHEET_TYPE`, prefixes, tab order, and template constants.
- Format Dashboard sections A-G for runtime-editable layout and template governance.
- Document properties for archive spreadsheet ID, workflow busy state, deferred Index refresh, and related persisted state.
- Manifest scopes and runtime settings.

### Strengths

- Constants make important workbook surfaces easy to find.
- Format Dashboard provides a user-governed configuration layer for presentation and template definitions.
- Document-property fallback for archive ID supports workbook-specific deployment without hardcoding only one value.

### Weaknesses

- Configuration is not fully separated from executable code; some configuration functions appear in the configuration section.
- Runtime configuration is split across constants, dashboard rows, sheet notes/signatures, and document properties.
- The architecture depends on implicit knowledge of which layer controls each value.

### Recommendation

Add a v1.7.6 configuration ownership table that marks each key as `code constant`, `dashboard-governed`, `document property`, `sheet metadata`, or `manifest`. This simplifies future reviews without changing business logic.

## Helper Organization and Dependency Relationships

The helper layer is necessary and heavily reused. It provides normalization, dates, headers, sheet lookups, cache invalidation, timing report construction, formatting support, and logging. However, helper dependencies are broad enough that helper changes can affect nearly every workflow.

### Observations

- Shared helpers are cohesive at the utility level but not subdivided by concern.
- Runtime timing helpers are partly in the helper section and partly in the Framework/Timing section.
- Dashboard helpers are used by templates, quality, and menus.
- Sheet/cache/header helpers are foundational and should be treated as protected infrastructure.

### Recommendation

Within documentation, classify helpers by concern: date/month, sheet lookup, header mapping, cache, formatting, dashboard, timing/logging, validation, archive/index, and row mutation. This provides module ownership without needing a source rewrite.

## Public APIs and Internal Interfaces

The public/internal convention is mostly strong:

- Public Apps Script functions are callable by menu, trigger, web app, manual execution, or future external callers.
- Internal functions generally use trailing underscores.
- Public wrapper aliases exist for user-facing actions.

### Architectural inconsistency

Menu callbacks include underscore-suffixed internal functions for system sheet visibility. This makes the underscore convention less reliable.

### Recommendation

Keep current names intact. Future cleanup may align menu callbacks to public wrapper names, but only with compatibility wrappers retained.

## Coupling and Cohesion

### Healthy coupling

- Template workflows are intentionally coupled to Format Dashboard definitions.
- Dashboard Quality is intentionally coupled to all workflow owners.
- Framework Timing is intentionally coupled as a wrapper and evidence collector.
- Master List is intentionally coupled to Demo P and sync outputs.

### Tight coupling to monitor

- Format Dashboard schema changes cascade into templates, validation, formatting, quality, and layout capture.
- Master List section owns navigation/archive/index behavior in addition to Master List output behavior.
- Timing and workflow busy locks wrap many workflows and trigger deferred Index refresh after completion.
- Sheet/header constants are shared across source formatting, Demo P, Master List, Monthly Change, and Disenrollment.

### Circular dependencies

No file-level circular dependencies exist because v1.7.6 is a single-file Apps Script. Logical circularity exists in operational feedback loops rather than import cycles:

- Format Dashboard defines templates; template validation and Dashboard Quality then validate the Format Dashboard/template state.
- Framework Timing records workflow evidence; Dashboard Quality consumes timing evidence and can itself be timed.
- Index refresh can be deferred during busy workflows and executed from the timing/lock cleanup path.

These cycles are acceptable because they are runtime governance loops, not mutual construction dependencies. They should remain documented and tested.

## Layering and Architectural Consistency

The intended layering is:

1. Constants and dashboard configuration
2. Foundational helpers
3. UI/public entry points
4. Template and worksheet infrastructure
5. Business workflow modules
6. Quality, health, timing, and governance

The implementation mostly follows that model but with practical Apps Script deviations:

- Public menu functions appear before many implementations they call, which is safe in Apps Script function hoisting.
- Timing helpers are split between early helper utilities and the final Framework/Timing section.
- Master List includes Index/web-app/archive concerns.
- Template functions include formatting workflow utilities beyond template lifecycle alone.

These deviations are maintainability concerns, not correctness defects.

## Maintainability and Readability

### Strengths

- Section headers and naming conventions provide a readable outline.
- Public functions are easy to search.
- Workflow entry points generally perform month prompting, timing setup, validation, and delegated work.
- Constants make major sheet/header surfaces discoverable.

### Risks

- The single-file size makes local reasoning expensive.
- Large sections make it harder to find the true owner of a helper or workflow edge.
- Some public wrappers duplicate internal functions or expose similar operations under multiple names.
- Cross-cutting concerns are implemented procedurally rather than through a documented registry.

### Recommendation

Prefer documentation and inventory updates over large code movement. Add owner tables, callback registries, and data-flow maps for v1.7.6 before considering modular source changes.

## Scalability as the Framework Grows

The current architecture can continue to support incremental workflow growth if changes remain small and governed. It will become increasingly difficult to maintain if additional report types, dashboards, trigger routes, or web-app actions are added without clearer ownership metadata.

### Growth risks

- More sheet types will expand configuration constants, dashboard defaults, template validation, and Dashboard Quality checks together.
- More web-app endpoints would overload the existing `doGet` route unless routing is formalized.
- More timing/quality sections will increase dependency fan-out unless registry-driven ownership is documented.
- More source reports will increase sync coupling unless source adapters remain isolated.

### Recommendation

For future growth, introduce a documented module registry before adding new workflow families. The registry can remain documentation-only until a code migration is approved.

## Findings

| ID | Severity | Finding | Evidence / Rationale | Recommendation |
| --- | --- | --- | --- | --- |
| ARCH-01 | Medium | Single-file architecture is logically sectioned but not mechanically modular. | v1.7.6 contains 672 function declarations across 12 major sections. | Preserve current file; add v1.7.6 logical module inventories and owner maps before any modularization. |
| ARCH-02 | Medium | Template section has mixed responsibilities. | It owns template lifecycle, validation/formatting helpers, source/report formatters, archive helpers, and smoke validation. | Document sub-owners inside the template section; only split code later if load order and public APIs are protected. |
| ARCH-03 | Medium | Master List section includes non-Master-List responsibilities. | The section includes Master List output, Index generation, archive restore, web-app restore route, tab sorting, and visibility wrappers. | Consider documenting Index/archive restore as a logical submodule; do not move code until dependency review is complete. |
| ARCH-04 | Low | Internal naming convention is weakened by underscore-suffixed menu callbacks. | `onOpen()` exposes `hideSystemSheets_` and `showSystemSheets_` as menu callback strings. | Preserve callbacks now; future cleanup may use public wrappers while retaining compatibility aliases. |
| ARCH-05 | Medium | Configuration ownership is split across constants, dashboard rows, document properties, sheet metadata, and manifest. | Archive ID has constant fallback and document-property override; dashboard and template settings are runtime-governed. | Add a configuration ownership inventory for v1.7.6. |
| ARCH-06 | Low | Timing architecture is strong but split across helper and final timing sections. | Runtime timing helpers appear in shared helpers, while `runFrameworkTimed_` and busy-lock logic are in the final Framework/Timing section. | Document runtime timing vs framework timing responsibilities; avoid code movement unless necessary. |
| ARCH-07 | Low | Governance feedback loops can look circular during review. | Dashboard Quality validates Format Dashboard/templates; timing captures quality workflows; deferred Index refresh runs from workflow cleanup. | Treat these as accepted governance loops; add them to architecture diagrams and test plans. |

## Opportunities to Simplify Without Changing Business Logic

1. **Create a v1.7.6 module ownership matrix.** Map every section to owner, public entry points, core helpers, sheets, properties, and downstream consumers.
2. **Create a callback inventory.** List every `onOpen()` menu label, callback string, target function, and compatibility status.
3. **Create a configuration ownership table.** Separate code constants, dashboard-governed values, document properties, sheet metadata/signatures, and manifest settings.
4. **Document submodules inside large sections.** Especially Template, Master List, Dashboard Quality, and Helpers.
5. **Consolidate wrapper naming only after review.** Where public wrappers and internal callbacks overlap, align future menu labels to public names while preserving aliases.
6. **Formalize web-app routing.** If more `doGet` routes are added, create a small routing table rather than expanding conditional logic inline.
7. **Keep source adapters isolated.** Future monthly source integrations should follow the current sync-adapter pattern rather than writing directly into Master List logic.
8. **Prefer registry-driven quality sections.** Dashboard Quality should continue moving toward explicit check registries tied to workflow owners.

## No-Rebuild Recommendation

A rewrite or rebuild is not recommended. The architecture has complexity, but the complexity mostly reflects real workflow breadth, dashboard governance, spreadsheet state management, and quality/timing requirements. The safer path is incremental documentation, dependency-review hardening, and small compatibility-preserving simplifications.

## Test and Validation Plan for Future Architecture Changes

Before any architectural cleanup that moves, renames, or consolidates code, run or manually verify:

1. `onOpen()` menu construction and every menu callback.
2. `onEdit(e)` Format Dashboard highlighting.
3. Template build and validation workflows.
4. Monthly sheet formatting for Raw Data, Banner, CP Due Date, and Unlocked Care Plan.
5. Demo P build/update flows.
6. Master List creation/update and row hiding/sorting.
7. Monthly Change report generation.
8. Disenrolled Exclusion workflow and destructive-row safeguards.
9. Index creation, archive restore path, and web-app restore route.
10. Dashboard Quality startup, quick, template validation, full workflow, and health check.
11. Framework Timing on/off mode, timing report write, and deferred Index refresh cleanup.
12. Manifest scopes and deployment settings.

## Conclusion

The v1.7.6 framework is architecturally consistent enough for continued production maintenance. Its main risk is not incorrect business decomposition but increasing maintenance cost caused by a large single-file implementation and several broad cross-cutting sections. The recommended architecture path is to preserve business logic, protect public interfaces, improve v1.7.6 inventories, and make only incremental simplifications backed by dependency review.
