# Dependency Review Standard

## Purpose

This standard defines the minimum dependency review required before changing, removing, renaming, or relocating any production Google Apps Script dependency in this repository. It is intended to prevent regressions caused by hidden callers, dynamic dispatch, trigger entry points, menu callbacks, sheet/range references, configuration keys, and deployment dependencies.

For the Master List project, this standard was completed against the governing production source `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.

## Dependency Categories to Verify

Verify every referenced:

- Function
- Constant
- Runtime global
- Configuration key
- Sheet name
- Sheet type
- Header name
- Column definition
- Named range
- Library and library version reference
- Manifest setting
- Installable trigger
- Simple trigger
- Menu item
- Menu callback string
- HTML file
- `google.script.run` call
- Script property
- Document property
- User property
- Cache key
- Lock key
- Advanced service
- External service
- Spreadsheet ID
- External workbook, folder, or file reference
- Deployment URL or web-app endpoint

Do not remove suspected orphan code until direct, indirect, dynamic, menu, trigger, HTML, library, property, and external references have been checked.

## Required Review Order

1. Identify the governing production source for the project.
2. Identify project documentation and project-specific specs when they exist.
3. Inventory all public entry points, including simple triggers, installable-trigger handlers, menu callbacks, web-app endpoints, and library exports.
4. Inventory configuration and constants before changing implementation logic.
5. Inventory worksheet, header, column, named-range, and property dependencies before changing data flow.
6. Trace direct function calls.
7. Trace indirect and dynamic calls.
8. Trace UI, menu, HTML, trigger, property, and manifest references.
9. Trace external services and external workbook/file references.
10. Classify each dependency as active, compatibility-only, generated/configured at runtime, suspected orphan, or confirmed orphan.
11. Only remove or rename confirmed orphan dependencies after compatibility impact is documented.
12. Update affected callers, wrappers, tests, documentation, and release notes when implementation changes are approved.

## Function Dependency Review

For every function under review, record:

- Function name
- Whether it is public or private by convention
- Direct callers
- Direct callees
- Menu callback references
- Trigger references
- HTML or `google.script.run` references
- String-based references such as callback maps or dispatch tables
- Library export or host-script references
- Whether it is retained for backward compatibility
- Whether it mutates sheets, properties, cache, locks, or external files

A function is not removable merely because no direct textual caller is found. Before removal, also check:

- `onOpen` and all custom menu construction
- Callback registries and arrays of callback names
- Web-app routing and request parameters
- Time-driven or event-driven trigger creation
- Function names stored in properties, sheets, or configuration objects
- HTML files and client-side scripts
- External host sheets or consuming library projects
- Archived compatibility wrappers when explicitly in scope

## Constant and Configuration Review

For every constant, configuration object, or runtime global under review, record:

- Name
- Declared value or value source
- Mutability
- Read sites
- Write sites
- Configuration section or owner
- Whether the value appears in sheet data, document properties, script properties, cache, or trigger state
- Whether changing the value is backward-compatible with existing workbooks

Do not collapse or rename constants that act as semantic labels for sheet names, headers, property keys, cache keys, lock keys, menu callbacks, or externally visible configuration.

## Sheet, Header, and Range Dependency Review

For every sheet, sheet type, header, column, range, or named range under review, verify:

- Sheet creation paths
- Sheet lookup paths
- Tab-order logic
- Template-generation logic
- Header-generation logic
- Header-read and header-map helpers
- Data-read ranges
- Data-write ranges
- Formatting ranges
- Protection, hide/show, resize, and cleanup logic
- Dashboard, validation, health-check, and timing/report references
- Archive or external-spreadsheet references

Changing a sheet name, header name, or column order requires tracing both implementation logic and any user-maintained workbook data that may already contain the old value.

## Menu, Trigger, and UI Dependency Review

For every menu item, trigger, prompt, alert, sidebar, dialog, and web-app endpoint under review, verify:

- User-visible label
- Callback function name
- Required authorization scopes
- Required active sheet or selection
- Mutated sheets and properties
- Error handling and user notifications
- Compatibility with existing simple and installable triggers
- Compatibility with deployments and web-app URLs

Menu callback strings and trigger handler names are dependency edges even when no direct function call exists.

## Property, Cache, Lock, and Runtime State Review

For every persisted or runtime key under review, verify:

- Property service used: document, script, or user
- Cache service used, if applicable
- Lock service used, if applicable
- Key name and key owner
- Read and write paths
- Expiration or reset behavior
- Recovery behavior when the key is missing, stale, or malformed
- Whether the key controls a workflow gate, deferred work, archive routing, template refresh, diagnostics, or compatibility mode

Do not rename persisted keys without a migration or compatibility fallback.

## Manifest, Library, and Advanced Service Review

Before changing `appsscript.json`, library configuration, or advanced-service usage, verify:

- OAuth scopes required by all active code paths
- Enabled advanced services
- External API dependencies
- Library identifiers and versions
- Web-app execution settings
- Time zone
- Runtime version
- Add-on or Sheets integration settings
- Trigger and deployment compatibility

Manifest changes must be reviewed against production code, not only against the local file.

## Orphan Classification

Use these classifications during dependency review:

| Classification | Meaning | Required Action |
| --- | --- | --- |
| Active | Directly or indirectly used by production flow | Preserve or update all callers |
| Dynamic | Referenced by string, menu, trigger, HTML, registry, property, or runtime dispatch | Preserve unless replacement is fully traced |
| Compatibility-only | Retained for old callers, old menus, old deployments, or external consumers | Preserve unless breaking change is approved |
| Generated/runtime | Created or discovered from workbook state, config rows, properties, or templates | Validate runtime creation and fallback behavior |
| Suspected orphan | No reference found in initial search | Continue indirect, dynamic, external, and workbook review |
| Confirmed orphan | No direct, indirect, dynamic, external, trigger, menu, HTML, manifest, or workbook dependency remains | May remove only after documenting evidence |

## Master List v1.7.6 Dependency Notes

The Master List v1.7.6 production script contains several dependency patterns that must be considered during review:

- Version and release constants anchor the production script identity and compatibility baseline.
- Runtime cache globals support monthly sheet, header, dimension, and dashboard configuration caching.
- Document properties store the archive spreadsheet ID and workflow state keys.
- Sheet constants define monthly output sheets, raw-data sheets, index sheets, template sheets, dashboard sheets, validation sheets, timing sheets, and health-check sheets.
- Header arrays and field maps define business-data contracts for Demo P, Banner, Unlocked, Care Plan Due, and Monthly Change Report workflows.
- `onOpen` builds custom menus whose callback strings are dependency edges.
- Menu callback registries such as callback arrays or maps are dependency edges even when they only contain function names as strings.
- Web-app and recovery flows use Apps Script services and routing parameters that must be traced as external entry points.
- Timing, validation, health-check, dashboard-quality, and framework-report sheets are implementation dependencies, not disposable reports, when referenced by production code.
- Archive workbook references and local raw-data cleanup flags must be reviewed together to avoid data-loss regressions.

## Master List v1.7.6 Minimum Inventory Checklist

When reviewing the Master List current production script, include at least the following inventories:

- Public entry points: simple triggers, menu callbacks, manually invoked functions, web-app handlers, and compatibility wrappers.
- Core workflow functions: Demo P sync, Master List build/update, Banner output, Unlocked output, Care Plan Due output, Monthly Change Report, archive, dashboard, validation, timing, and health-check flows.
- Helper functions: date parsing, sheet lookup, header mapping, sorting, normalization, template refresh, formatting, locking, cache clearing, diagnostics, and notification helpers.
- Constants: version constants, feature flags, sheet names, sheet types, prefixes, headers, field lists, dashboard sections, property keys, cache keys, lock keys, archive IDs, timing limits, and formatting limits.
- Workbook dependencies: generated monthly sheets, templates, raw source tabs, exclusion/archive tabs, index tab, framework tabs, dashboard tabs, and validation/timing tabs.
- External dependencies: Apps Script services, spreadsheet IDs, web-app URLs, deployment state, manifest scopes, advanced services, and library references.

## Required Evidence Before Removal or Rename

Before removing or renaming any dependency, the reviewer must document:

1. Exact search terms used.
2. Files and project paths searched.
3. Direct callers found or absence of direct callers.
4. Dynamic references found or absence of dynamic references.
5. Menu and trigger references found or absence of menu and trigger references.
6. HTML and client-side references found or absence of HTML references.
7. Manifest and library references found or absence of manifest/library references.
8. Workbook, property, cache, and external references found or absence of those references.
9. Compatibility risk and rollback plan.

## Recommended Search Commands

Use targeted searches rather than broad recursive grep. Examples:

```bash
rg "function functionName|functionName\\(" Master_List spec Framework/spec
rg '"functionName"|\x27functionName\x27' Master_List spec Framework/spec
rg "CONSTANT_NAME" Master_List spec Framework/spec
rg "Sheet Name|Header Name|PROPERTY_KEY" Master_List spec Framework/spec
rg "addItem|createMenu|onOpen|newTrigger|doGet|doPost|google.script.run" Master_List spec Framework/spec
```

Exclude `Archive_To_Move/` unless the task explicitly includes it.

## Review Deliverable

A dependency review deliverable must include:

- Scope and governing source reviewed
- Dependency inventory summary
- Entry-point inventory
- Sheet/header/property inventory summary
- Direct and dynamic call-risk findings
- Confirmed compatibility dependencies
- Suspected orphan list with evidence status
- Confirmed orphan list, if any
- Required implementation changes, if any
- Test plan and rollback notes
