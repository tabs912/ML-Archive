# Wave 4 Release Plan and To-Do Checklist — Master List v1.8.9.3

**Wave:** Wave 4 — Performance and timing optimization
**Planning source:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`
**Baseline source:** `Master_List/Current Production Script/v1.8.9.3_Current_Production`
**Recommended next version:** `v1.8.9.4_Current_Production` if production code changes are implemented
**Prerequisite:** Wave 3 is closed.
**Current Wave 4 status:** PLANNED / NOT STARTED

---

## Simple To-Do Checklist

### A. Scope Approval

- [ ] Confirm Wave 3 closure is accepted as the baseline for Wave 4.
- [ ] Confirm `v1.8.9.3_Current_Production` is the governing source for Wave 4 analysis.
- [ ] Confirm next implementation version will be `v1.8.9.4_Current_Production` unless owner approves another version.
- [ ] Confirm Wave 4 scope is limited to performance, timing clarity, and safe optimization.
- [ ] Confirm no business-rule changes are approved for Wave 4 unless separately documented.
- [ ] Confirm no public menu labels or public function names will be removed.
- [ ] Confirm no framework rebuild is approved.
- [ ] Confirm binary reports will be reviewed as evidence only and will not be committed.

### B. Performance Review To-Do

- [ ] Review `Master_List/Reports/v1.8.9.3 - Framework Timing Report.pdf` for slow, bottleneck, and critical timing entries.
- [ ] Review `Master_List/Reports/v1.8.9.3 - Dashboard Quality Report.pdf` for quality warnings that affect performance interpretation.
- [ ] Identify workflows with repeated slow steps across months.
- [ ] Separate true optimization candidates from acceptable long-running workflows.
- [ ] Identify any performance issue caused by unnecessary sheet writes, repeated formatting, repeated sorting, repeated sheet lookup, or unnecessary `flush()`.
- [ ] Confirm whether Dashboard Quality `NOT RUN` sections require validation before performance work.
- [ ] Create a prioritized Wave 4 performance finding register.

### C. Implementation To-Do

- [ ] Create `v1.8.9.4_Current_Production` only if code changes are approved.
- [ ] Preserve all Wave 1 data-safety rules.
- [ ] Preserve all Wave 3 lock/busy-flag protections.
- [ ] Keep public APIs and menu callback names stable.
- [ ] Optimize only confirmed hotspots with low business-logic risk.
- [ ] Prefer batch reads/writes and in-memory processing.
- [ ] Avoid broad formatting rewrites unless evidence shows a bottleneck.
- [ ] Do not delete functions as part of Wave 4; leave orphan/dead-code cleanup for Wave 5.
- [ ] Update timing labels only where they improve performance diagnosis.
- [ ] Document performance impact and rollback path.

### D. Runtime Validation To-Do

- [ ] Run baseline timing scenario before changes, if a controlled workbook is available.
- [ ] Run affected workflow after each optimization.
- [ ] Confirm output data matches the v1.8.9.3 baseline for the same workbook/month.
- [ ] Confirm Dashboard Quality passes or shows expected warnings only.
- [ ] Confirm Framework Timing improves or remains acceptable without new critical paths.
- [ ] Confirm no Wave 1 correctness regression.
- [ ] Confirm no Wave 3 concurrency/busy-flag regression.
- [ ] Confirm menu callbacks still invoke.
- [ ] Confirm rollback source remains available.

### E. Closure To-Do

- [ ] All approved Wave 4 optimizations are complete.
- [ ] Static syntax check passes.
- [ ] Diff is limited to approved Wave 4 source/text artifacts.
- [ ] Dashboard Quality evidence reviewed.
- [ ] Framework Timing evidence reviewed.
- [ ] Performance impact summarized.
- [ ] Rollback path documented.
- [ ] Repository preparation tool passes.
- [ ] No binary artifacts staged or committed.
- [ ] Final release decision recorded.

**Current simple checklist decision:** Wave 4 is ready for detailed performance review, not implementation.

---

# Full Wave 4 Release Plan and Checklist

## 1. Objective

Wave 4 focuses on performance and timing optimization after Wave 3 concurrency protection has closed. The objective is to reduce avoidable runtime cost, improve timing diagnostics, and address confirmed slow/bottleneck/critical steps without changing approved business logic.

## 2. Inputs

| Input | Use |
|---|---|
| `Master_List/Current Production Script/v1.8.9.3_Current_Production` | Governing production source for Wave 4. |
| `Master_List/Reports/v1.8.9.3 - Framework Timing Report.pdf` | Primary performance evidence. |
| `Master_List/Reports/v1.8.9.3 - Dashboard Quality Report.pdf` | Quality evidence and dashboard health context. |
| `Master_List/Audit Summary/WAVE_3_CLOSURE_SUMMARY_v1.8.9.3.md` | Confirms Wave 3 closure and concurrency baseline. |
| `Master_List/Audit Summary/EXHAUSTIVE_TRIGGER_DYNAMIC_REFERENCE_MAP_v1.8.9.3.md` | Public/menu/trigger/dynamic reference safety input. |

## 3. Candidate Performance Areas

| Area | Reason for review | Initial disposition |
|---|---|---|
| Format Monthly Sheets | Timing report shows repeated slow runs across months. | Review first. |
| Create Monthly Start | Timing report shows slow runtime and index refresh cost. | Review after Format Monthly Sheets. |
| Create Monthly Update | Timing report shows slow runtime with multiple slow/bottleneck steps. | Review with caution; business logic preserved. |
| Build Monthly Change Report | Timing report shows slow runtime but may be acceptable for report generation. | Review targeted writes/formatting only. |
| Create Disenrolled List | Timing report shows bottleneck behavior. | Review row movement/write strategy. |
| Archive Monthly Active/Sub-Reports | Timing report shows repeated slow/bottleneck entries. | Review date filtering and sheet operations. |
| Dashboard Quality Workflow | Timing report shows critical runtime; may include expected full-framework validation overhead. | Classify before optimizing. |
| Format Banner Report | Timing report shows critical status in evidence; verify whether this is a true defect, expected validation path, or benchmark issue. | Investigate early. |

## 4. Excluded Scope

| Excluded item | Reason |
|---|---|
| Business-rule changes | Wave 4 is performance-focused only. |
| Public API/menu callback renames | Compatibility risk; not required for performance. |
| Framework rebuild | Not approved. |
| Orphan/dead-code deletion | Reserved for Wave 5 after full dynamic reference review. |
| Binary report modifications | Reports are evidence inputs only. |
| Broad formatting-only rewrites | Avoid noisy diffs unless directly tied to performance. |

## 5. Release-Blocking Test Matrix

| Test ID | Area | Expected result | Release blocking |
|---|---|---|---:|
| W4-T001 | Static syntax | New versioned source parses successfully. | Yes |
| W4-T002 | Diff scope | Diff limited to approved Wave 4 changes. | Yes |
| W4-T003 | Output equivalence | Affected outputs match v1.8.9.3 baseline for same workbook/month except approved performance/timing changes. | Yes |
| W4-T004 | Dashboard Quality | Dashboard Quality passes or shows expected warnings only. | Yes |
| W4-T005 | Framework Timing | Timing report shows no new critical/bottleneck regression. | Yes |
| W4-T006 | Wave 1 regression | Monthly Change, Demo P, Disenrolled, and Master List business rules preserved. | Yes |
| W4-T007 | Wave 3 regression | Protected public workflows still route through lock/busy-flag wrapper. | Yes |
| W4-T008 | Menu smoke | Affected menu callbacks still invoke. | Yes |
| W4-T009 | Rollback | Rollback to v1.8.9.3 documented. | Yes |

## 6. Closure Checklist

| Check ID | Category | Closure criterion | Status | Release blocking |
|---|---|---|---|---:|
| W4-C01 | Scope | Owner-approved Wave 4 scope recorded. | NOT STARTED | Yes |
| W4-C02 | Source | New versioned source created if code changes are made. | NOT STARTED | Yes |
| W4-C03 | Static | Syntax and callback/static wrapper checks pass. | NOT TESTED | Yes |
| W4-C04 | Performance | Targeted performance impact documented. | NOT STARTED | Yes |
| W4-C05 | Runtime | Affected workflows tested in controlled workbook. | NOT TESTED | Yes |
| W4-C06 | Dashboard Quality | Evidence reviewed. | NOT TESTED | Yes |
| W4-C07 | Framework Timing | Evidence reviewed and compared to baseline. | NOT TESTED | Yes |
| W4-C08 | Regression | Wave 1 and Wave 3 protections preserved. | NOT TESTED | Yes |
| W4-C09 | Rollback | Rollback path to v1.8.9.3 documented. | NOT STARTED | Yes |
| W4-C10 | PR hygiene | Repository preparation tool passes and binary artifacts excluded. | NOT STARTED | Yes |
| W4-C11 | Closure | All release blockers pass or have approved exceptions. | BLOCKED | Yes |

## 7. Current Recommendation

Proceed with Wave 4 detailed performance review using v1.8.9.3 as the baseline. Do not implement optimization code until the exact hotspots and acceptable risk level are approved.
