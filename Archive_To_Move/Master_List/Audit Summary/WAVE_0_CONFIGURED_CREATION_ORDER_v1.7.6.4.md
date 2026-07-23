# Wave 0 — Configured Sheet Creation Order (`v1.7.6.4`)

## Purpose

This follow-up keeps `getSheetSortProfileByName_()` as the centralized source for sheet rank, operational status, tail-block status, and forced-hidden behavior, but changes workflow behavior from repeated sorting to placement at creation time.

## Implemented Change

- Bumped production version from `1.7.6.3` to `1.7.6.4`.
- Added `getConfiguredSheetCreationIndex_()` to calculate the insertion point for a newly created sheet using the centralized sheet-sort profile.
- Added `placeCreatedSheetInConfiguredOrder_()` for template-copy paths where Google Apps Script creates the copy at the end of the workbook first.
- Updated governed blank-sheet creation to use `insertSheet(sheetName, insertIndex)` so new sheets are created before the system/template tail block.
- Updated template-copy creation paths to move only the newly created/copied sheet into its configured location instead of sorting the workbook.
- Preserved the manual `Organize Tabs` menu callback for user-initiated full tab organization.

## Required Creation Order

The configured profile now targets this order for newly created sheets:

1. `Index -`
2. `Demo P`
3. `Master List mm.yy`
4. `Monthly Change mm.yy`
5. `Disenrolled Exclusion`
6. `Raw Data mm.yy` — hidden by output-visibility policy when configured
7. `Banners mm.yy` — hidden by output-visibility policy when configured
8. `CP Due mm.yy` — hidden by output-visibility policy when configured
9. `Unlock CP mm.yy` — hidden by output-visibility policy when configured
10. `B`
11. `CD`
12. `UC`
13. `RD`
14. `Archive - Demo P` — forced hidden
15. `Framework Timing Report`
16. `Dashboard Quality Report`
17. `Format Dashboard`
18. `Template - Banner Report`
19. `Template - Care Plan Due`
20. `Template - Unlocked Care Plan`
21. `Template - Raw Data`
22. `Template - Demo P`
23. `Template - Disenrolled Exclusion`
24. `Template - Master List`
25. `Template - Monthly Change`
26. `RFF_BASE_TEMPLATE`

No newly created operational sheet should be inserted after `Framework Timing Report`; only dashboard/system/template tail-block sheets belong at or after that boundary.

## Verification Scope

Static review confirmed:

- The central profile function remains the ranking source.
- Blank sheet creation uses configured insertion indexes.
- Copied sheets are placed once at creation/promote time.
- `Create Monthly Update` still skips full-workbook sorting.
- The manual `Organize Tabs` menu callback remains available for deliberate user-triggered full sorting.
