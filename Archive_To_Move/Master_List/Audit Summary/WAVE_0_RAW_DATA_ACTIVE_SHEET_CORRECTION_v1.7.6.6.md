# Wave 0 — Raw Data Active-Sheet Correction (`v1.7.6.6`)

## Purpose

This correction reverses the `v1.7.6.5` change that added `Raw Data` to `Hide Monthly Import Sheets`. `Raw Data` is an active monthly sheet, not an imported monthly sheet, so it belongs under active-sheet visibility behavior and configured creation placement.

## Implemented Change

- Bumped production version from `1.7.6.5` to `1.7.6.6`.
- Removed `Raw Data` from the `Hide Monthly Import Sheets` spec list.
- Left `Raw Data` in `Hide Monthly Active Sheets`, where it belongs.
- Preserved the active-sheet handoff before hiding so correctly placed hidden sheets remain hidden when hidden by their proper workflow or by the manual `Organize Tabs` visibility snapshot/restore.

## Manual Organize Tabs Visibility Answer

Manual `Organize Tabs` captures the hidden sheet IDs before moving tabs and restores those same hidden sheets after the manual sort completes. Therefore, sheets that were already hidden and in the correct place should remain hidden after the manual sort.

## Wave 1 Recommendation

Wave 1 should focus on a small set of correctness and data-safety fixes, not another architecture change:

1. Keep Monthly Change report history additive: create each monthly report without deleting the previous monthly report.
2. Verify creation-order placement in a safe workbook copy for individual triggers and monthly workflows after the `v1.7.6.6` Raw Data correction.
3. Keep automatic full-workbook sorting disabled; use creation-time placement plus manual `Organize Tabs` only.
4. Run targeted regression tests for Raw Data, Banners, CP Due, Unlocked CP, Demo P, Master List, Monthly Change, Index, and manual Organize Tabs.
