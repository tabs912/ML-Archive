# Wave 0 — Visibility and Creation-Order Corrections (`v1.7.6.5`)

## Purpose

This correction addresses workbook issues found after `v1.7.6.4` testing: generated/imported sheets could still remain visible when the active sheet was the sheet being hidden, manual tab sorting could leave previously hidden monthly imports visible, and some creation paths still needed explicit placement using the configured creation-order model.

## User-Reported Symptoms Addressed

- `Raw Data` did not hide after creation even when Format Dashboard `Output Visibility` was `HIDDEN`.
- `Banner 04.26` appeared before `Index` and reappeared after running the individual Banner formatter.
- `Dashboard Quality Report` and active raw sheets could appear in the wrong workbook region.
- `Demo P` was not consistently kept directly behind `Index`.
- A `Master List` created from the individual trigger could appear after `Framework Timing Report`.
- The CP Due and Unlocked individual menu triggers failed with `ReferenceError: dashboard is not defined`.
- Manual `Sort Tabs` could leave hidden monthly import sheets visible.
- The Index did not list all unformatted raw imports such as `Raw Data - Banners ...`.

## Implemented Change

- Bumped production version from `1.7.6.4` to `1.7.6.5`.
- Added an active-sheet handoff before hiding a sheet so Apps Script is not asked to hide the currently active tab.
- Updated output visibility enforcement to use the existing dashboard fallback path for CP Due and Unlocked individual formatters instead of referencing an undefined `dashboard` variable.
- Included `Raw Data` in the `Hide Monthly Import Sheets` menu workflow.
- Expanded Index unformatted-import detection to include `Raw Data - Banners`, `Raw Data - CP Due`, and `Raw Data - Unlocked` naming patterns.
- Added hidden-sheet snapshot/restore around the manual global sort so previously hidden monthly imports are re-hidden after tab moves.
- Kept the centralized creation-order model and added placement after key rename/promote paths for Demo P, Raw Data, Master List, archive restore, and system sheets.

## Expected Behavior

- Output visibility policy can hide newly created Raw Data/Banner/CP Due/Unlocked sheets even when that sheet is active.
- Manual `Organize Tabs` should not leave previously hidden monthly import sheets visible.
- `Dashboard Quality Report` is kept in the tail block between `Framework Timing Report` and `Format Dashboard` when created or initialized.
- `Demo P` is placed behind `Index` during Demo P maintenance.
- Individual Master List creation/promote paths place the Master List before the Framework Timing boundary.
- CP Due and Unlocked individual formatters no longer fail from an undefined `dashboard` variable.
- The Index includes unformatted raw-import tabs using the `Raw Data - ...` naming convention.
