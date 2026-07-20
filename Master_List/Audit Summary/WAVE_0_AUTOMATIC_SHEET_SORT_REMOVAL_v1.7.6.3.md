# Wave 0 — Automatic Sheet-Sort Removal (`v1.7.6.3`)

## Purpose

This follow-up verifies and completes the sheet-sorting rebuild by removing automatic tab-sorting hooks from production workflows. The only remaining tab-reorder entry point is the manual `Organize Tabs` menu callback (`enforceGlobalSheetSortOrder`).

## User-Reported Issue

`Create Monthly Update` and other sheet-creation paths could still invoke automatic full-workbook or single-sheet positioning after sheets were created. Those sort paths could temporarily show hidden sheets while moving them and, if interrupted or paired with earlier behavior, could leave generated monthly sheets visible despite Format Dashboard `Output Visibility = HIDDEN`.

## Implemented Change

- Bumped production version from `1.7.6.2` to `1.7.6.3`.
- Removed workflow-triggered tab-sorting calls from monthly update, template creation/refresh, dashboard setup, raw/import/monthly-output creation, Monthly Change rebuild, Disenrolled Exclusion creation, archive restore, and system setup paths.
- Removed obsolete automatic positioning helpers used by workflow sheet creation, including governed insertion-index helpers, template-before-base positioning helpers, operational sort helpers, and single-sheet global positioning helpers.
- Simplified governed sheet insertion so new generated sheets are inserted normally and then rely on output-visibility policy, not automatic tab reordering.
- Preserved the manual `Organize Tabs` menu callback and its internal sort engine for user-initiated tab organization only.

## Verification Scope

Static searches confirmed there are no remaining calls or definitions for the removed automatic hooks:

- `positionSheetInGlobalSortOrder_`
- `enforceOperationalSheetSortOrder_`
- `organizeTemplateTabsBeforeBaseTemplate_`
- `moveTemplateBeforeBaseTemplate_`
- `lockSystemTemplateTailBlockOrder_`
- `lockFrameworkTimingReportAsFinalSheet_`
- `getGovernedSheetInsertIndex_`
- `getGovernedNewSheetInsertIndex_`
- `getOperationalNewSheetInsertIndex_`

The remaining `moveActiveSheet` usage is inside the manual tab-sort implementation invoked by the `Organize Tabs` menu callback.

## Expected Behavior

- Creating monthly/import/output sheets no longer performs a full workbook sort automatically.
- `Create Monthly Update` refreshes the Index at the end but intentionally skips automatic sheet sorting.
- Format Dashboard output visibility remains responsible for hiding generated monthly outputs.
- Users can still manually organize tabs by selecting `Organize Tabs` from the custom menu.

## Focused Regression Checks

1. Run `Create Monthly Update` in a safe workbook copy and confirm it completes without invoking automatic tab sorting.
2. Confirm newly created Banners, CP Due Date, Unlocked CP, and Raw Data sheets respect Format Dashboard `Output Visibility`.
3. Confirm `Organize Tabs` still reorders tabs only when manually selected.
4. Confirm hidden sheets remain hidden after manual `Organize Tabs` completes.
