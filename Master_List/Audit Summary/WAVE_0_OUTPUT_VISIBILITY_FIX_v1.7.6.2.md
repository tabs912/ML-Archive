# Wave 0 Output Visibility Fix v1.7.6.2

## Summary

This follow-up correction fixes the monthly import output visibility path for Banners, CP Due Date, Unlocked CP, and Raw Data outputs. The prior implementation called `applyOutputVisibilityPolicy_()` from some creation paths without passing an already-loaded dashboard object. In that case the policy fell back to a generic behavior object that did not include sheet-type-specific `Output Visibility`, so dashboard rows set to `HIDDEN` could be ignored.

## Production Source Updated

- `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`

## Version

- Updated `MASTER_LIST_MERGE_ML_VERSION` from `1.7.6.1` to `1.7.6.2`.

## Implementation Notes

- Added `outputVisibility: "VISIBLE"` to the generic default behavior object for a complete behavior shape.
- Added `getDefaultBehaviorForSheetType_()` so fallback behavior can still honor the built-in sheet-type defaults, including default `HIDDEN` values for Banners, CP Due Date, Unlocked CP, and Raw Data.
- Updated `applyOutputVisibilityPolicy_()` to load the active Format Dashboard when a caller does not pass one, then apply the configured `Output Visibility` for the requested sheet type.
- Preserved existing `hideSheetIfNeeded_()` / `showSheetIfNeeded_()` behavior and did not alter data-processing logic.

## Focused Tests

1. Set Format Dashboard output visibility to `HIDDEN` for Banners, CP Due Date, Unlocked CP, and Raw Data.
2. Run `formatMonthlySheets()` using B, CD, UC, and RD import tabs.
3. Confirm generated/import monthly outputs are hidden after each formatter completes.
4. Change one output visibility setting to `VISIBLE`, rerun that formatter, and confirm the output remains visible.
