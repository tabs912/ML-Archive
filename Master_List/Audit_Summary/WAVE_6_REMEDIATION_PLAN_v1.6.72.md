# Wave 6 Remediation Plan — Maintainability, Diagnostics, and Documentation

## Source Review

Reviewed input: `Master_List/Audit_Summary/Wave 6 — Maintainability, Diagnostics, and Docume….pdf`.

Wave 6 objective: improve documentation alignment and regression-report automation.

## Scope Decision

Wave 6 is documentation and diagnostics focused. It has no intended business-logic impact.

Performance optimization is explicitly deferred until after Wave 5 is complete.

## Findings Addressed by Wave 6

The Wave 6 input identifies these resolved/target findings:

- EXH-012 — report export companions / regression artifacts;
- EXH-014 — Master List project documentation alignment;
- EXH-015 — General/Scripts documentation scope.

## Remediation Phases

| Phase | Concern | Correction | Verification | Production Script Required? |
|---:|---|---|---|---|
| 1 | Master List project documentation was not explicit. | Add `Master_List/README.md` documenting governing production path, reports path, audit path, manifest strategy, and security boundary. | Documentation review. | No. |
| 2 | General scripts could be mistaken for production baselines. | Add `General/Scripts/README.md` explaining non-production/support status. | Documentation review. | No. |
| 3 | Access/security expectations need to be distinct from public/private cleanup. | Add `SECURITY_ACCESS_BOUNDARY_v1.6.72.md`. | Confirm owner decisions: three sheet users, owner-only script access, no allowlist guard for now. | No. |
| 4 | Timing and quality reports are binary/human-readable but not easy to diff. | Add companion report exports in a later implementation: CSV first, then JSON if needed. | Generate exports from two runs and diff stable fields. | Yes, only if report writer code changes. |
| 5 | Performance work is not part of Wave 6 documentation cleanup. | Carry slow/bottleneck timing items to the later performance wave. | Confirm optimization backlog remains separate. | No. |

## Recommended Report Export Strategy

Recommended default: **CSV first, JSON second, Markdown only if human-readable summaries are needed.**

### CSV Companion Exports

Use for spreadsheet-friendly review and simple diffs:

- Framework Timing Report process summary;
- Framework Timing Report performance issues;
- Framework Timing Report detailed timing log;
- Dashboard Quality Report summary/signoff;
- Dashboard Quality Report section rows.

### JSON Companion Exports

Use for structured regression comparison:

- process name;
- step name;
- severity;
- runtime seconds;
- report version;
- run timestamp;
- status;
- issue text;
- recommendation text.

### Markdown Companion Exports

Use only for lightweight release notes or closure summaries.

## User Decisions

| Decision | Recommendation | Status |
|---|---|---|
| Report export format | Start with CSV; add JSON if automated diffing is needed. | Pending owner approval before code changes. |
| Manifest strategy | Treat manifest as external/container-bound unless exported and approved. | Documented. |
| General/Scripts scope | Treat as non-production support utilities. | Documented. |
| Security guard allowlist | Not needed now because sheet access is limited and owner is the only script editor. | Deferred by owner decision. |
| Performance optimization | Defer until after Wave 5 closes. | Deferred. |

## Verification Checklist

For the documentation-only Wave 6 phase:

1. Confirm `Master_List/README.md` exists and identifies the governing production path.
2. Confirm `Master_List/README.md` identifies reports and audit summary paths.
3. Confirm `Master_List/README.md` documents manifest strategy.
4. Confirm `General/Scripts/README.md` identifies scripts as non-production support utilities unless explicitly stated otherwise.
5. Confirm `SECURITY_ACCESS_BOUNDARY_v1.6.72.md` records the owner access decision.
6. Confirm no production script code changes were required for documentation-only Wave 6 work.

For the later report-export implementation:

1. Add export writer functions behind existing timing/quality report flows.
2. Generate CSV exports for two runs.
3. Diff process names, step names, severities, and status fields.
4. Exclude timestamps or normalize them before diffing.
5. Confirm no report-export file is committed unless explicitly requested.

## Recommended Next Step

Close Wave 5 using the validated v1.6.72 cleanup candidate, then complete Wave 6 documentation alignment with these text artifacts.

Do not begin report-writer code changes until the owner approves the preferred companion export format.
