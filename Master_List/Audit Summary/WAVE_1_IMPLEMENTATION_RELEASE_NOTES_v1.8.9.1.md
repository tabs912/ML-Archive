# Wave 1 Implementation Release Notes — Master List v1.8.9.1

**Production source:** `Master_List/Current Production Script/v1.8.9.1_Current_Production`  
**Baseline source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Release type:** Patch implementation for owner-approved Wave 1 business rules and data-safety controls.

## Summary

This release creates a new versioned production script, `v1.8.9.1`, without overwriting the `v1.8.9` baseline. The implementation preserves the owner-confirmed monthly update sequence:

1. Build Monthly Change.
2. Update Demo P.
3. Update Disenrolled Exclusion.
4. Create Master List.

## Changes Implemented

| Area | Implementation |
|---|---|
| Versioning | Updated `MASTER_LIST_MERGE_ML_VERSION` from `1.8.9` to `1.8.9.1`. |
| Primary PMR fallback | `copyPrimaryDemoPRowsToMasterListByHeader_` now builds only Primary PMR rows and throws the required fail-closed error when no Primary PMR rows are found. The previous DOB and first-row fallbacks were removed. |
| Monthly Update preflight | `preflightMonthlyUpdateForMonth_` now checks whether the target Master List already exists, prompts once with `YES_NO`, throws `Monthly Update cancelled: Existing Master List not replaced.` if replacement is not confirmed, and returns `masterListExistsAndReplaceConfirmed` metadata. |
| Monthly Update sequence | `runMonthlyUpdate` preserves the strict order `buildMonthlyChangeReportForMonth_ -> updateDemoPMonthlySyncForMonth_ -> createDisenrolledListForMonth_ -> createMasterListForMonth_` and passes the preflight object to Master List creation. |
| Master List prompt bypass | `createMasterListForMonth_` accepts the preflight object and bypasses its internal replacement prompt only when the preflight confirmation matches the target Master List name. Standalone Create Master List behavior is preserved. |
| Disenrollment date rule | Added `isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts)` to centralize the strict first-of-month rule using `isSameDate_`. |
| Monthly Change callers | `compareRawDemoPForSectionReport_` and `buildMonthlyChangeSectionRows_` now use the centralized disenrollment effective-date helper. |
| Disenrollment sorting | `buildMonthlyChangeSectionRows_` now sorts Disenrollments using the `Disenrollment Effective Date` / `Disenrollment Date` index from `reportHeaders`, not the source Raw Data header map. |

## Business Logic Preserved

- `Disenrollment Effective Date` remains strict first-of-month.
- Create Monthly Update order remains Monthly Change, Update Demo P, Update Disenrolled Exclusion, Create Master List.
- Public menu names and entry-point function names are preserved.
- The standalone Create Master List prompt still appears when replacement was not already confirmed by Create Monthly Update preflight.

## Testing Performed in Repository

- Static syntax validation with Node against a temporary `.js` copy of the production script.
- Static search verification that the new helper, preflight replacement flag, and fail-closed Primary PMR error are present.
- Pull-request preparation verification with the repository tool before commit.

## Runtime Validation Still Required

Run in a controlled workbook before production release:

1. Monthly Change includes only applicable first-of-month disenrollments.
2. Monthly Change excludes non-first-of-month disenrollment effective dates.
3. Disenrollments section sorts by the report-header effective-date column when report headers differ from source headers.
4. Create Monthly Update with an existing Master List prompts before monthly outputs are mutated.
5. Declining the existing Master List replacement stops with `Monthly Update cancelled: Existing Master List not replaced.`
6. Confirming the existing Master List replacement runs the full approved sequence and bypasses the duplicate Master List prompt.
7. Standalone Create Master List still prompts for replacement when a target Master List exists.
8. Master List creation fails closed with the required Primary PMR error if Demo P has no Primary PMR rows.

## Known Issues / Deferred Work

- No runtime spreadsheet tests were executed in this repository-only environment.
- Broader concurrency coverage and performance-only Monthly Change range optimization remain deferred to later waves unless separately requested.
