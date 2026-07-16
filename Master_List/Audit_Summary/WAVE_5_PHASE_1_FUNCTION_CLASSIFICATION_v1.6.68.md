# Wave 5 Phase 1 Function Classification — v1.6.68

## Purpose

This Phase 1 artifact updates the v1.6.29 function-inventory concern against `Master_List/Current Production Script/v.1.6.68_Current_Production_Script` without changing production code.

Phase 1 is documentation/classification only. It does **not** rename, privatize, remove, or wrap functions.

## Answer to Public-to-Private Question

It is **not safe to change all public-looking functions to private functions in one pass**.

Google Apps Script exposes top-level functions for menus, simple triggers, installable triggers, manual execution, `google.script.run`, and external/library consumers. A function without a trailing underscore may be an intentional public entry point, a compatibility wrapper, a diagnostic/test entry point, or a legacy external API.

Recommended approach:

1. Publish the supported public API boundary.
2. Classify every top-level function.
3. Add compatibility wrappers before any approved rename.
4. Rename/remove only after menu, trigger, string-reference, HTML, library, and external consumer checks pass.

## Generated Inventory

- Updated inventory: `Master_List/Audit_Summary/EXHAUSTIVE_v1.6.68_Function_Inventory.csv`
- Production source reviewed: `Master_List/Current Production Script/v.1.6.68_Current_Production_Script`

## Summary Counts

| Metric | Count |
|---|---:|
| Top-level functions | 729 |
| Unique top-level function names | 729 |
| Duplicate top-level declarations | 0 |
| Menu callback functions | 33 |
| Trigger/simple-trigger functions | 1 |
| Public-looking non-underscore functions | 59 |
| Approximate no-static-path functions | 127 |

## Category Counts

| Category | Count |
|---|---:|
| diagnostic_or_validation_entry_point_review | 25 |
| internal_helper | 543 |
| internal_no_static_path_review | 107 |
| public_like_review_required | 20 |
| supported_public_menu_callback | 33 |
| supported_public_simple_trigger | 1 |

## Phase 1 Recommendations

### Keep Public for Now

Keep menu callbacks, `onOpen`, and diagnostic/validation entry points public until a supported API boundary is approved.

### Do Not Rename Helpers Yet

Trailing-underscore helpers already follow private-style naming. Helpers with no static path still require dynamic/manual/library checks before removal or rename.

### Public-Looking Functions Need Decisions

Public-looking non-underscore functions that are not menu callbacks should be classified as one of:

- supported public API
- retained compatibility wrapper
- diagnostic/test-only entry point
- deprecated retained function
- internal candidate needing wrapper before rename
- removal candidate after consumer checks

### Required Checks Before Phase 2

Before changing any function name or removing any function, verify:

1. Direct static callers.
2. Dynamic string references.
3. Menu callback strings.
4. Simple and installable triggers.
5. HTML and `google.script.run` callers.
6. Dashboard Quality / Framework Health required-function checks.
7. External spreadsheet or Apps Script library consumers.
8. Wrapper inventory and project documentation references.

## Recommended Phase 2 Scope

Phase 2 should be a review/approval pass over the generated CSV, not a code-removal pass. Select a small, low-risk batch of confirmed internal candidates, add wrappers if needed, then validate menu callbacks and smoke tests before any production script change.
