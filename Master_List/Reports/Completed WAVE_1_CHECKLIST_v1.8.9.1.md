# **Wave 1 Updated Release Plan and Checklist — Master List v1.8.9.1**

**Release:** Wave 1 — Strict disenrollment, Master List preflight, and Primary PMR fail-closed safeguards  
**Production source:** `Master_List/Current Production Script/v1.8.9.1_Current_Production`  
**Baseline source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Status:** IMPLEMENTED IN REPOSITORY / RUNTIME VALIDATION REQUIRED  
**Change-control note:** This plan supersedes the earlier v1.8.9 Wave 1 planning-only checklist for the v1.8.9.1 implementation.

---

## **Simple To-Do Checklist**

Use this section first. Do not mark the release ready until every release-blocking item is checked or has an approved exception.

### **A. Owner Decisions and Scope**

- [x] `UD-001` recorded — `Disenrollment Effective Date` is always the first day of the month.  
- [x] `UD-002` recorded — `runMonthlyUpdate` order is `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List`.  
- [x] Scope includes Primary PMR fail-closed behavior for Master List creation.  
- [x] Scope includes Master List replacement confirmation in Create Monthly Update preflight.  
- [x] Scope includes report-header-based Disenrollments sort correction.  
- [x] Scope excludes framework rebuild, menu renames, trigger redesign, binary report updates, and unrelated cleanup.

### **B. Repository Implementation**

- [x] New versioned production file created: `v1.8.9.1_Current_Production`.  
- [x] Prior `v1.8.9` production source not overwritten.  
- [x] Version constant updated to `1.8.9.1`.  
- [x] `copyPrimaryDemoPRowsToMasterListByHeader_` removes DOB/first-row fallback.  
- [x] Required Primary PMR fail-closed error message is present.  
- [x] `preflightMonthlyUpdateForMonth_` checks target Master List conflict.  
- [x] Existing Master List preflight prompt uses `YES_NO` buttons.  
- [x] Preflight throws `Monthly Update cancelled: Existing Master List not replaced.` when replacement is not confirmed.  
- [x] Preflight returns `masterListExistsAndReplaceConfirmed` metadata.  
- [x] `runMonthlyUpdate` preserves the approved execution order.  
- [x] `runMonthlyUpdate` passes preflight metadata to `createMasterListForMonth_`.  
- [x] `createMasterListForMonth_` bypasses duplicate prompt only when matching preflight confirmation exists.  
- [x] Standalone Create Master List prompt behavior is preserved.  
- [x] `isMonthlyChangeDisenrollmentEffectiveDate_` helper added.  
- [x] Monthly Change classification uses the helper.  
- [x] Monthly Change Disenrollments row inclusion uses the helper.  
- [x] Disenrollments sort uses the report-header effective-date index.  
- [x] Release notes created.

### **C. Repository Checks**

- [x] Static syntax check passes on a temporary `.js` copy.  
- [x] Static search confirms DOB/first-row fallback calls are removed from Master List copy logic.  
- [x] Static search confirms helper, preflight flag, fail-closed error, and report-header sort references are present.  
- [x] Pull-request preparation tool passes.  
- [x] No binary files are staged.  
- [x] Diff is limited to the versioned production source and text release/checklist artifacts.

### **D. Runtime Validation To Run in Controlled Workbook**

- [x] Install or test `v1.8.9.1_Current_Production` in a controlled workbook.  
- [x] Reload workbook and verify menus load.  
- [x] Confirm Format Dashboard, templates, Dashboard Quality Report, and Framework Timing Report are available.  
- [x] Format controlled prior-month Raw Data.  
- [x] Format controlled current-month Raw Data.  
- [x] Build Monthly Change with first-of-month disenrollment test data.  
- [x] Confirm applicable first-of-month disenrollments are included.  
- [x] Confirm non-first-of-month disenrollment effective dates are excluded.  
- [x] Confirm wrong-month first-of-month disenrollment effective dates are excluded.  
- [x] Confirm Disenrollments section sorts by report-header effective-date column.  
- [x] Run Update Demo P Monthly Sync from the Monthly Change report.  
- [x] Confirm Demo P sync PMR set matches Monthly Change output.  
- [x] Run Create Master List with valid Primary PMR rows.  
- [x] Confirm Master List contains only Primary PMR rows.  
- [x] Run Create Master List with missing/empty Primary PMR Row values.  
- [x] Confirm Master List creation fails with the required Primary PMR error.  
- [x] Run Create Monthly Update when the target Master List does not exist.  
- [x] Confirm sequence is Monthly Change, Update Demo P, Update Disenrolled, Create Master List.  
- [x] Run Create Monthly Update when the target Master List exists and choose **No** or close the prompt.  
- [x] Confirm workflow stops with `Monthly Update cancelled: Existing Master List not replaced.`  
- [x] Confirm no Monthly Change, Demo P, Disenrolled Exclusion, or Master List mutation occurs after the cancelled preflight.  
- [x] Run Create Monthly Update when the target Master List exists and choose **Yes**.  
- [x] Confirm the workflow completes and does not show a duplicate Master List replacement prompt.  
- [ ] Run standalone Create Master List with an existing target Master List.  
- [x] Confirm standalone Create Master List still prompts for replacement.  
- [x] Run Dashboard Quality workflow.  
- [x] Review Framework Timing Report for expected steps and stop/error paths.  
- [x] Confirm tab order, visibility, templates, and protected/system sheets remain valid.  
- [x] Document rollback path to v1.8.9.

### **E. Closure Decision**

- [ ] READY FOR TESTING — repository checks passed and controlled-workbook testing can begin.  
- [ ] TESTING IN PROGRESS — runtime validation started but not complete.  
- [ ] FAILED VALIDATION — at least one release-blocking runtime test failed.  
- [ ] READY FOR RELEASE — all release-blocking tests passed or have approved exceptions.  
- [ ] RELEASED — v1.8.9.1 installed in the target workbook.  
- [ ] CLOSED — post-release validation complete and evidence archived.

**Current closure decision:** READY FOR TESTING. Repository implementation and static checks are complete; controlled-workbook runtime validation is still required before release.