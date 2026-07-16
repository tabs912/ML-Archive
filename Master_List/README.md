# Master List Project

## Purpose

The Master List project contains the production Google Apps Script source, runtime reports, audit findings, remediation plans, and release-review artifacts for the Master List / Report Formatter Framework.

## Governing Production Source

The governing production script path is:

```text
Master_List/Current Production Script/
```

Current reviewed cleanup candidate:

```text
Master_List/Current Production Script/v.1.6.72_Current_Production_Script
```

Current Wave 6 documentation-closure candidate:

```text
Master_List/Current Production Script/v.1.6.74_Current_Production_Script
```

Earlier production snapshots are retained for comparison and rollback. Do not overwrite prior production versions; create a new versioned script for each production or testing release.

## Reports

Runtime and validation reports are stored under:

```text
Master_List/Reports/
```

Reports are review inputs. Binary report exports such as PDFs should not be modified or committed as implementation artifacts unless explicitly requested.

## Audit Summary

Audit findings, remediation plans, public API boundaries, inventories, and closure notes are stored under:

```text
Master_List/Audit_Summary/
```

These files are text-based engineering artifacts and may be updated when documenting release readiness, remediation plans, validation results, or decisions.

## Manifest Strategy

No committed `appsscript.json` manifest is currently present for this project. Treat the Apps Script manifest as external/container-bound unless an exported manifest is explicitly added and approved in a future change.

Before adding a committed manifest, confirm that it matches the live Apps Script project scopes, time zone, exception logging, dependencies, add-ons, web app settings, and deployment expectations.

## Access and Security Boundary

Primary data security is controlled by Google Drive/Sheets permissions, script deployment settings, trigger ownership, and archive/output destination permissions. Public/private function naming is a compatibility and maintainability concern; it is not a data-access boundary.

Current owner decision for the active workbook:

- Sheet access is limited to three total people.
- Script access is limited to the owner.
- Script-level allowlist guards are not required at this time.
- Web app/API deployments and owner-running triggers should remain reviewed before use.

## Development Notes

- Preserve approved business logic.
- Keep menu callbacks and public workflow entry points stable unless a compatibility plan is approved.
- Use the public API boundary and governance registry before renaming or removing functions.
- Wave 5 cleanup is closed with v1.6.72.
- Wave 6 is closed without persistent CSV companion export sheets unless future automated diffing is explicitly approved.
- Defer performance optimization work until Wave 6 documentation closure is complete.
