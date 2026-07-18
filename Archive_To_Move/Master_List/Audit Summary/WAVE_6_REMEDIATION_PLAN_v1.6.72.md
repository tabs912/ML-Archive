# Wave 6 Remediation Plan — Maintainability, Diagnostics, and Documentation

## Source Review

Reviewed input: `Master_List/Audit_Summary/Wave 6 — Maintainability, Diagnostics, and Docume….pdf`.

Wave 6 objective: improve documentation alignment and regression-report automation.

## Scope Decision

Wave 6 is documentation and diagnostics focused. It has no intended business-logic impact.

Wave 5 is closed with the validated v1.6.72 cleanup candidate. Performance optimization is explicitly deferred until after Wave 6 documentation closure.

## Findings Addressed by Wave 6

The Wave 6 input identifies these resolved/target findings:

- EXH-012 — report export companions / regression artifacts. Owner decision: persistent CSV companion sheets are not necessary because the reports are mainly build/update diagnostics and PDF sharing is sufficient;
- EXH-014 — Master List project documentation alignment;
- EXH-015 — General/Scripts documentation scope. Owner decision: files outside `Master_List/` are out of scope for Master List review and should not be modified for this wave.

## Remediation Phases

| Phase | Concern | Correction | Verification | Production Script Required? |
|---:|---|---|---|---|
| 1 | Master List project documentation was not explicit. | Add `Master_List/README.md` documenting governing production path, reports path, audit path, manifest strategy, and security boundary. | Documentation review. | No. |
| 2 | General scripts could be mistaken for production baselines. | Scope decision: do not update `General/Scripts`; Master List reviews remain limited to `Master_List/`. | Confirm no General/Scripts changes remain in the Wave 6 diff. | No. |
| 3 | Access/security expectations need to be distinct from public/private cleanup. | Add `SECURITY_ACCESS_BOUNDARY_v1.6.72.md`. | Confirm owner decisions: three sheet users, owner-only script access, no allowlist guard for now. | No. |
| 4 | Timing and quality reports are binary/human-readable but not easy to diff. | Owner decision: do not keep persistent CSV companion export sheets because they add tabs and are not useful for sharing. | Confirm v1.6.74 does not add CSV export sheets. | No. |
| 5 | Performance work is not part of Wave 6 documentation cleanup. | Carry slow/bottleneck timing items to the later performance wave. | Confirm optimization backlog remains separate. | No. |

## Recommended Report Export Strategy

Owner decision: **do not add persistent CSV/JSON/Markdown companion export sheets for now.** Existing PDF/report views are sufficient for build/update diagnostics.

### Deferred Export Options

If a future build needs machine-diffable diagnostics, prefer a single temporary export surface or a script-generated file that is removed after use. Do not add persistent extra workbook tabs unless explicitly approved.

## User Decisions

| Decision | Recommendation | Status |
|---|---|---|
| Report export format | Do not keep persistent CSV companion sheets. Use existing reports/PDFs for sharing; revisit only if automated diffing becomes necessary. | Decided. |
| Manifest strategy | Treat manifest as external/container-bound unless exported and approved. | Documented. |
| General/Scripts scope | Keep outside Master List review scope. Do not update `General/Scripts` for Wave 6. | Decided. |
| Security guard allowlist | Not needed now because sheet access is limited and owner is the only script editor. | Deferred by owner decision. |
| Performance optimization | Defer until after Wave 6 closes. | Deferred. |

## Verification Checklist

For the documentation-only Wave 6 phase:

1. Confirm `Master_List/README.md` exists and identifies the governing production path.
2. Confirm `Master_List/README.md` identifies reports and audit summary paths.
3. Confirm `Master_List/README.md` documents manifest strategy.
4. Confirm no `General/Scripts` documentation change remains in the Wave 6 diff.
5. Confirm `SECURITY_ACCESS_BOUNDARY_v1.6.72.md` records the owner access decision.
6. Confirm v1.6.74 does not add persistent CSV/JSON/Markdown companion export sheets.

For future optional report-export implementation:

1. Revisit only if automated diffing becomes necessary.
2. Prefer a single temporary export sheet or non-persistent export file.
3. Confirm no generated report-export output file is committed unless explicitly requested.

## Recommended Next Step

Wave 5 is closed with the validated v1.6.72 cleanup candidate. Build v1.6.74 without persistent CSV companion sheets, keep the scope limited to `Master_List/`, and close Wave 6 after static validation.

Do not begin performance optimization until after Wave 6 closure.


## Wave 6 Closure Decision — v1.6.74

Wave 6 may be closed when:

1. `Master_List/README.md` documents the governing production source, reports, audit path, manifest strategy, and access boundary.
2. `SECURITY_ACCESS_BOUNDARY_v1.6.72.md` documents the owner access decision.
3. `General/Scripts` changes are excluded from the Wave 6 diff.
4. `v.1.6.74_Current_Production_Script` does not create persistent CSV companion export sheets.
5. Syntax and targeted no-extra-sheet checks pass.
6. Performance optimization remains deferred to the next wave.
