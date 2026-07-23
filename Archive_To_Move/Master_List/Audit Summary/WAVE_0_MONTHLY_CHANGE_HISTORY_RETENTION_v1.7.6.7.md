# Wave 0 — Monthly Change History Retention (`v1.7.6.7`)

## Purpose

This correction aligns Monthly Change behavior with the approved workflow clarification: Monthly Change reports are created monthly, and the previous report is not deleted.

## Implemented Change

- Bumped production version from `1.7.6.6` to `1.7.6.7`.
- Removed the existing-report deletion step from Monthly Change report creation.
- When a report with the target monthly name already exists, the workflow now logs that the existing report is retained and continues creating a new report with a unique name through the existing `setUniqueSheetName_()` helper.
- Reframed Wave 1 recommendation away from Monthly Change staged replacement, because the correct behavior is report-history retention rather than replacing the previous report.

## Expected Behavior

- Building a Monthly Change report does not delete a previous Monthly Change report.
- Re-running the same month creates a uniquely named report instead of replacing the existing report.
- Monthly Change reports continue to use configured creation placement and Index refresh behavior.

## Wave 1 Recommendation Update

Wave 1 should prioritize validation and stabilization of the v1.7.6.7 creation-order/visibility model:

1. Verify each individual trigger creates or places its sheet in the configured location.
2. Verify output visibility for Banners, CP Due, Unlocked CP, and Raw Data using the Format Dashboard settings.
3. Verify Manual `Organize Tabs` preserves hidden state for already-hidden tabs.
4. Verify Index and Archive Index sections include the expected live and archived sheet names.
5. Only after those pass, consider small targeted cleanup of orphaned or duplicate helper code.
