# Wave 1 Simple To-Do and Closure Checklist — Master List v1.8.9

Wave 1 can be considered ready for implementation, testing, release, and closure only when the applicable items below are checked off with supporting evidence.

**Current status:** PLANNED / BLOCKED FOR APPROVAL  
**Governing source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Planned release version:** `v1.8.9.1`  
**Wave 1 findings:** `ML189-001`, `ML189-002`, `ML189-003`, `ML189-005`  
**Wave 1 root causes:** `RC-001`, `RC-002`, `RC-003`

## Approval To-Do

- [ ] `UD-001` approved — Monthly Change disenrollment effective-date window is confirmed.
- [ ] `UD-002` approved — fail-closed behavior for Master List replacement timing and Primary PMR fallback is confirmed.
- [ ] Approved Wave 1 scope is limited to `ML189-001`, `ML189-002`, `ML189-003`, and `ML189-005`.
- [ ] Deferred findings remain deferred: `ML189-004` Wave 3, `ML189-006` Wave 4, `ML189-007`/`ML189-008` Wave 6.

## Version and Setup

- [ ] Current governing production source is confirmed as `v1.8.9`.
- [ ] Next production source is created as a new versioned artifact, recommended `v1.8.9.1`.
- [ ] Prior `v1.8.9` production source is not overwritten.
- [ ] Workbook menus load after the new source is installed.
- [ ] System sheets exist.
- [ ] Report templates exist or are refreshed.
- [ ] Format Dashboard is present and usable.
- [ ] Dashboard Quality Report is present.
- [ ] Framework Timing Report is present.

## Wave 1 Code To-Do

- [ ] Add one centralized helper for the approved Monthly Change disenrollment date rule.
- [ ] Update Monthly Change PMR classification to use the centralized helper.
- [ ] Update Monthly Change Disenrollments row inclusion to use the centralized helper.
- [ ] Update Monthly Change Disenrollments sort to use the report-header effective-date index.
- [ ] Add Create Monthly Update preflight checks for existing Monthly Change and Master List outputs.
- [ ] Capture Master List replacement/cancel decision before Demo P or Disenrolled Exclusion mutation.
- [ ] Preserve standalone Create Master List prompt behavior unless explicitly approved otherwise.
- [ ] Stop silent Master List fallback to DOB/first row, or add the approved compatibility warning/override.
- [ ] Preserve public function names and menu labels unless explicitly approved otherwise.
- [ ] Run a static dependency check to confirm no missing helpers, callbacks, or constants were introduced.

## Placement

- [ ] Index is first.
- [ ] Demo P is second.
- [ ] Core operational sheets remain in the approved group.
- [ ] Monthly active sheets remain in the approved group.
- [ ] Monthly sub-report sheets remain in the approved group.
- [ ] Source-data sheets remain in the approved group.
- [ ] Archive - Demo P remains in the approved archive/core operational position.
- [ ] Framework Timing Report, Dashboard Quality Report, and Format Dashboard remain in that exact relative order.
- [ ] Templates follow Format Dashboard.
- [ ] RFF_BASE_TEMPLATE remains last in the protected template/system block.
- [ ] Organize Tabs preserves approved placement.

## Visibility

- [ ] Raw Data visibility follows dashboard configuration after formatting.
- [ ] Banners / Monthly Sub-Reports visibility follows dashboard configuration.
- [ ] CP Due visibility follows dashboard configuration.
- [ ] Unlock CP visibility follows dashboard configuration.
- [ ] Manual Organize Tabs preserves hidden state.
- [ ] System sheets preserve expected visibility.
- [ ] Template sheets preserve expected visibility.
- [ ] Archive sheets preserve expected visibility.

## Monthly Change

- [ ] First Monthly Change run creates the report.
- [ ] Same-month rerun errors or stops as expected.
- [ ] Same-month rerun does not create a `(2)` duplicate report.
- [ ] Existing Monthly Change report is not deleted unexpectedly.
- [ ] Disenrollment effective dates before the approved window are excluded.
- [ ] Disenrollment effective dates inside the approved window are included.
- [ ] Disenrollment effective dates after the approved window are excluded.
- [ ] Disenrollments section sorts by effective date using the report header index.
- [ ] Monthly Change output remains template-first and dashboard-governed.

## Demo P Monthly Sync

- [ ] Demo P sync uses the corrected Monthly Change PMR set.
- [ ] Demo P sync does not run after a canceled Create Monthly Update preflight.
- [ ] Archive - Demo P rows are not appended after a canceled Create Monthly Update preflight.
- [ ] Demo P replacement coverage validation still runs before Demo P body replacement.
- [ ] Demo P output row count matches expected changed-PMR handling.

## Master List

- [ ] Existing Master List replacement/cancel decision happens before Demo P or Disenrolled mutation in Create Monthly Update.
- [ ] Canceling Master List replacement leaves Demo P unchanged.
- [ ] Canceling Master List replacement leaves Disenrolled Exclusion unchanged.
- [ ] Confirming Master List replacement completes the monthly update path.
- [ ] Master List copies only approved Primary PMR rows when valid Primary PMR data exists.
- [ ] Missing or empty Primary PMR Row state fails or warns according to the approved `UD-002` decision.
- [ ] No silent DOB/first-row fallback occurs unless explicitly approved.

## Disenrolled Exclusion

- [ ] Disenrolled Exclusion is not mutated after a canceled Create Monthly Update preflight.
- [ ] Disenrolled Exclusion updates only after required preflight decisions are complete.
- [ ] Disenrolled rows moved from Demo P match the corrected Monthly Change / Demo P state.
- [ ] Old disenrolled rows hide as expected.

## Dashboard Quality

- [ ] Full Dashboard Quality Workflow runs.
- [ ] Monthly Change-related sections populate.
- [ ] Demo P-related sections populate.
- [ ] Master List-related sections populate.
- [ ] Disenrolled-related sections populate.
- [ ] No unexpected `NOT RUN` sections remain after the full workflow.
- [ ] No false-pass or false-failure result is introduced by Wave 1.

## Framework Timing

- [ ] Framework Timing Report records the Wave 1 workflows.
- [ ] Create Monthly Update preflight timing is visible.
- [ ] Expected cancel/stop conditions are distinguishable from unexpected errors.
- [ ] Monthly Change timing remains within practical limits.
- [ ] Demo P sync timing remains within practical limits.
- [ ] Master List timing remains within practical limits.

## Recommended Test Order

Run the tests in this order:

1. Confirm installed script version.
2. Reload workbook and confirm menus.
3. Run Setup System Sheets if needed.
4. Run Create / Refresh All Templates if needed.
5. Confirm Format Dashboard is present.
6. Format Raw Data for controlled current/prior months.
7. Build Monthly Change once with date-window test data.
8. Build Monthly Change again for the same month and confirm expected duplicate-run stop.
9. Run Update Demo P Monthly Sync against the corrected Monthly Change report.
10. Run Create Master List with valid Primary PMR Row data.
11. Run Create Master List with missing/empty Primary PMR Row data and confirm approved stop/warning behavior.
12. Run Create Monthly Update with existing Monthly Change output.
13. Run Create Monthly Update with existing Master List output and cancel replacement.
14. Run Create Monthly Update with existing Master List output and confirm replacement.
15. Refresh Index.
16. Run Organize Tabs.
17. Run full Dashboard Quality Workflow.
18. Review Framework Timing Report.
19. Confirm final tab order and hidden state.
20. Confirm no unexpected duplicate sheets, reports, properties, or binary artifacts were created.

## Release Closure

- [ ] All Wave 1 implementation tasks are complete.
- [ ] All Wave 1 release-blocking checklist items are `PASS` or have an approved exception.
- [ ] All required user decisions are recorded.
- [ ] All affected workflows were tested with controlled data.
- [ ] Dashboard Quality evidence is reviewed.
- [ ] Framework Timing evidence is reviewed.
- [ ] Audit Summary release notes are complete if implementation occurred.
- [ ] Rollback source and rollback steps are documented.
- [ ] Repository preparation tool passes.
- [ ] No binary artifacts are staged or committed.
- [ ] Final implementation diff contains only intended Wave 1 files.
- [ ] Final repository status is clean.

## Closure Decision

- [ ] Wave ready for implementation approval.
- [ ] Wave implementation blocked.
- [ ] Wave ready for testing.
- [ ] Wave testing failed.
- [ ] Wave ready for release.
- [ ] Wave released pending post-release validation.
- [ ] Wave closed.

**Current closure decision:** Wave implementation blocked until `UD-001` and `UD-002` are approved. Runtime validation has not been performed.
