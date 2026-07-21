# Wave 0 Sheet Sorting / Organization Rebuild v1.7.6.1

## Summary

This pre-Wave-1 implementation rebuilds the sheet sorting and organizing layer before Monthly Change remediation begins. The change preserves approved business logic, public menu callbacks, sheet naming contracts, and existing tab-order intent while replacing the prior split sorting implementations with one centralized sort-profile engine.

## Production Source Updated

- `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`

## Version

- Updated `MASTER_LIST_MERGE_ML_VERSION` from `1.7.6` to `1.7.6.1`.

## Implementation Notes

- Added `getSheetSortProfileByName_()` as the single source for sort rank, operational status, tail-block status, and forced-hidden behavior.
- Rebuilt global and operational sort paths around generated sort records instead of separate local rank/date helper implementations.
- Rebuilt system/template tail-block enforcement using the same sort-record movement helper.
- Preserved public and compatibility entry points including `enforceGlobalSheetSortOrder`, `enforceGlobalSheetSortOrder_`, `positionSheetInGlobalSortOrder_`, `lockSystemTemplateTailBlockOrder_`, and `lockFrameworkTimingReportAsFinalSheet_`.
- Preserved hidden-sheet movement behavior by showing hidden sheets only when required for movement and restoring hidden status afterward.
- Preserved `RFF_BASE_TEMPLATE` and Demo P archive forced-hidden behavior.

## Business-Logic Impact

No approved data-processing business logic was changed. This change is limited to sheet tab ordering, sheet positioning, system/template tail-block organization, and version metadata.

## Required Focused Tests

1. Run `enforceGlobalSheetSortOrder()` from the menu and verify active, import, system, and template sheets are in governed order.
2. Create or refresh all templates and confirm templates remain in governed tail-block order before `RFF_BASE_TEMPLATE` behavior is enforced.
3. Build or rebuild Index and confirm the Index remains first.
4. Create Monthly Change and Master List outputs and confirm generated tabs are positioned using the central sort profile.
5. Confirm hidden system/template sheets return to their intended hidden state after sorting.
