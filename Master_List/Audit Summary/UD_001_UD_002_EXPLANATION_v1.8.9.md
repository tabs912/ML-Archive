# UD-001 and UD-002 Explanation — Master List v1.8.9 Wave 1

**Status:** Owner clarification recorded. `UD-001` confirms strict first-of-month disenrollment effective dates, and `UD-002` confirms the existing Create Monthly Update sequence is the correct workflow order.  
**Related plan:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`  
**Related Wave 1 checklist:** `Master_List/Audit Summary/WAVE_1_SIMPLE_TODO_CHECKLIST_v1.8.9.md`  
**Governing production source:** `Master_List/Current Production Script/v1.8.9_Current_Production`

## Owner clarification recorded

The prior planning artifacts treated two items as unresolved business-rule decisions. The owner clarified both points:

1. `Disenrollment Effective Date` is always the first day of the month.
2. The correct `runMonthlyUpdate` sequence is `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List`.

These clarifications change the Wave 1 recommendation. The review should not recommend a broader disenrollment effective-date window, and it should not recommend moving Create Master List or its replacement decision ahead of Update Demo P or Update Disenrolled.

---

## UD-001 — Monthly Change disenrollment effective-date window

### Decision recorded

`UD-001` is recorded as **strict first-of-month**. A PMR should be classified as a Monthly Change disenrollment only when `Disenrollment Effective Date` equals the applicable month/report first day.

### Problem with the prior recommendation

The prior recommendation assumed that disenrollments might need a broader reporting window, such as previous-month first day through report date inclusive. That assumption is not valid for this workflow because the owner clarified that `Disenrollment Effective Date` is always the first of the month.

### Correct recommendation

Do **not** broaden the Monthly Change disenrollment effective-date window.

The production code path that uses a same-day first-of-month comparison should be treated as aligned with the clarified business rule. Any remediation for this area should be limited to maintainability and test clarity:

- Keep the strict first-of-month rule.
- Add or update tests proving non-first-day dates are excluded.
- Remove or reword audit language that suggests a broader date window is required.
- If there is unused range-check code or confusing prompt/report text, clean it up only if it improves maintainability without changing output behavior.

### Approval status

`UD-001` is **answered** for planning purposes: strict first-of-month behavior is the approved rule.

---

## UD-002 — Create Monthly Update workflow sequence

### Decision recorded

`UD-002` is recorded as **current sequence approved** for the monthly update workflow. The correct path is:

1. Monthly Change.
2. Update Demo P.
3. Update Disenrolled.
4. Create Master List.

### Problem with the prior recommendation

The prior recommendation treated the late Master List replacement prompt as a workflow-safety defect and recommended moving target-output replacement/cancel decisions before Demo P and Disenrolled updates. That recommendation conflicts with the owner-confirmed workflow order.

### Correct recommendation

Do **not** reorder `runMonthlyUpdate` and do **not** move Create Master List ahead of Update Demo P or Update Disenrolled.

The confirmed sequence should remain intact. Any Wave 1 implementation should preserve the exact workflow order and focus only on issues that remain valid under that order, such as whether Master List Primary PMR fallback should be made explicit or better reported.

### Remaining implementation question

The owner clarification resolves the workflow-order portion of `UD-002`. If a future code change targets Master List Primary PMR fallback behavior, it should be treated as a separate, explicit implementation decision and should not be bundled with a workflow reordering recommendation.

### Approval status

`UD-002` is **answered** for workflow sequencing: the existing `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List` path is the approved order.

---

## Updated recommendation summary

| Decision | Recorded answer | Updated recommendation |
|---|---|---|
| UD-001 | `Disenrollment Effective Date` is always the first of the month. | Preserve strict first-of-month Monthly Change disenrollment selection; do not broaden the date window. |
| UD-002 | `runMonthlyUpdate` correct path is `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List`. | Preserve the existing workflow order; do not move Create Master List replacement/cancel handling before Demo P or Disenrolled updates. |

## Implementation status

Wave 1 planning should be revised before any production code implementation. The prior Wave 1 scope included recommendations that conflict with the owner clarification and should be narrowed to only still-valid corrections.
