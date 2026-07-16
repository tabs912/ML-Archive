# Wave 4 Performance Instrumentation — v1.6.42 Baseline Notes

## Purpose

This audit note preserves Wave 4 timing evidence and optimization observations that should remain visible while current production script work continues from the approved v1.6.60 baseline.

## Current Baseline Decision

- Current Master List production work should remain on `v1.6.60` for the main Master List script.
- Archive workbook indexing is separated into `Master_List/Current Production Script/Archive_File` instead of being embedded in a new Master List production script version.

## Latest Timing Evidence — Create Disenrolled List

| Workflow | Step | Delta Seconds | Cumulative Seconds | Status |
|---|---:|---:|---:|---|
| Create Disenrolled List | Start | 0.270 | 0.270 | OK |
| Create Disenrolled List | Locate ongoing Demo P sheet: Demo P | 2.079 | 2.349 | OK |
| Create Disenrolled List | Disenrolled move - exclusion sheet ready: Disenrolled Exclusion | 16.011 | 18.360 | SLOW |
| Create Disenrolled List | Disenrolled move - existing exclusion data read \| Rows: 0 | 2.220 | 20.580 | OK |
| Create Disenrolled List | Disenrolled move - Demo P body bulk read \| Rows: 1060 | 1.602 | 22.182 | OK |
| Create Disenrolled List | Disenrolled move - Demo P disenrollment scan complete \| Disenrolled PMRs: 719; active re-enrolled PMRs: 0 | 0.002 | 22.184 | OK |
| Create Disenrolled List | Disenrolled move - Demo P retained/remove partition complete \| Retained rows: 341; rows selected: 719 | 0.001 | 22.185 | OK |
| Create Disenrolled List | Disenrolled move - exclusion append - append payload built \| Rows: 719 | 0.231 | 22.416 | OK |
| Create Disenrolled List | Disenrolled move - exclusion append - append payload sorted newest to oldest | 0.005 | 22.421 | OK |
| Create Disenrolled List | Disenrolled move - exclusion append - rows inserted at top of Disenrolled Exclusion \| Rows: 719 | 0.428 | 22.849 | OK |
| Create Disenrolled List | Disenrolled move - exclusion append - append payload values written \| Rows: 719; Columns: 66 | 91.574 | 114.423 | CRITICAL |
| Create Disenrolled List | Disenrolled move - exclusion append - append payload formatting copied | 0.007 | 114.430 | OK |
| Create Disenrolled List | Disenrolled move - exclusion append - Disenrolled Exclusion row heights locked | 9.585 | 124.015 | OK |
| Create Disenrolled List | Disenrolled move - Demo P retained rewrite - rows normalized \| Rows: 341 | 0.002 | 124.017 | OK |
| Create Disenrolled List | Disenrolled move - Demo P retained rewrite - formatted row capacity ensured | 1.636 | 125.653 | OK |
| Create Disenrolled List | Disenrolled move - Demo P retained rewrite - old Demo P body content cleared \| Rows cleared: 1060 | 0.002 | 125.655 | OK |
| Create Disenrolled List | Disenrolled move - Demo P retained rewrite - retained Demo P body written \| Rows: 341 | 1.703 | 127.358 | OK |
| Create Disenrolled List | Disenrolled move - Demo P row count normalized after retained rewrite | 1.724 | 129.082 | OK |
| Create Disenrolled List | Disenrolled move - runtime caches cleared after disenrollment move | 0.002 | 129.084 | OK |
| Create Disenrolled List | Copy disenrolled primary records and remove rows: 719 copied, 719 removed | 0.000 | 129.084 | OK |
| Create Disenrolled List | Hide old Disenrolled Exclusion rows | 2.492 | 131.576 | OK |
| Create Disenrolled List | Complete | 78.634 | 210.210 | CRITICAL |

### Disenrolled List Assessment

- The critical path is the Disenrolled Exclusion append value write: 719 rows × 66 columns required 91.574 seconds.
- Overall completion is also marked critical at 210.210 seconds, indicating additional uninstrumented or post-step cost remains after the row-level move work.
- The exclusion sheet preparation step remains slow at 16.011 seconds and should remain on the optimization watch list.

### Disenrolled List Candidate Follow-ups

1. Test whether append-to-bottom plus view/filter/sort governance is materially faster than inserting at the top before writing values.
2. Compare one large `setValues()` write against chunked writes for 719 × 66 payloads in the Apps Script runtime.
3. Defer row-height locking for the Disenrolled Exclusion sheet or restrict it to newly inserted rows only.
4. Expand timing around the final `Complete` interval to identify the unassigned 78.634-second critical segment.

## Latest Timing Evidence — Create Master List

| Workflow | Step | Delta Seconds | Cumulative Seconds | Status |
|---|---:|---:|---:|---|
| Create Master List | Start | 0.000 | 0.000 | OK |
| Create Master List | Locate current processed Demo P sheet | 2.246 | 2.246 | OK |
| Create Master List | Create naked canvas - Master List output sheet | 10.070 | 12.316 | SLOW |
| Create Master List | Build Master List headers | 2.237 | 14.553 | OK |
| Create Master List | Copy Primary PMR rows from processed Demo P to Master List | 3.080 | 17.633 | OK |
| Create Master List | Right-size Master List output rows | 2.403 | 20.036 | OK |
| Create Master List | Sync Unlocked CP to Master List primary rows (in-memory) | 2.691 | 22.727 | OK |
| Create Master List | Sync Care Plan Due to Master List primary rows (in-memory) | 0.756 | 23.483 | OK |
| Create Master List | Batch write Care Plan sync data to Master List | 0.097 | 23.580 | OK |
| Create Master List | Set final Master List sheet name | 0.021 | 23.601 | OK |
| Create Master List | Lock Master List final row heights | 2.315 | 25.916 | OK |
| Create Master List | All template sheets successfully hidden | 1.442 | 27.358 | OK |
| Create Master List | Hide report templates before Master List completion | 0.003 | 27.361 | OK |

### Master List Assessment

- Create Master List is currently much healthier than Create Disenrolled List.
- The only slow step is creating the naked output canvas at 10.070 seconds.
- Primary PMR copying and Care Plan sync writes are within acceptable ranges in this timing capture.

### Master List Candidate Follow-ups

1. Keep `Create naked canvas - Master List output sheet` on the watch list for sheet insertion overhead.
2. Preserve current in-memory sync behavior because the Unlocked CP and Care Plan Due sync steps are not bottlenecks in this run.
3. Continue measuring row-height lock cost, but no immediate change is indicated by this capture.

## Current Priority Queue

1. **Critical:** Disenrolled Exclusion append payload value write.
2. **Critical:** Unassigned final completion interval in Create Disenrolled List.
3. **Slow:** Disenrolled Exclusion sheet readiness.
4. **Slow:** Master List naked output canvas creation.

## Validation Notes

- Retest Create Disenrolled List after any change to append positioning, payload write strategy, or row-height locking.
- Retest Create Master List after any sheet insertion or naked canvas optimization.
- Keep this note updated with new timing captures so Wave 4 optimization decisions remain evidence-based.

## Runtime Correction — Create Monthly Update

- Observed runtime error: `ReferenceError: step is not defined` in `writeDemoPMonthlySyncBody_` during `runMonthlyUpdate`.
- Correction captured in `v1.6.61`: the Demo P monthly-sync body writer now accepts an optional timing step callback and defaults to a no-op when called by workflows that do not provide a timing callback.
- Validation focus: rerun `Create Monthly Update` and confirm the Demo P update phase reaches the post-write reactivation sweep and final Index/sort refresh without throwing the missing `step` reference.
