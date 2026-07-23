# Framework Specification Review — Current Script v1.7.6 vs Master List Framework Specification v2.0 Draft

## Scope

- Specification reviewed: `Master_List/Specs/Master List Framework Specification v2.0 _ Draft.pdf`.
- Implementation source of truth: `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.
- Review objective: identify only documentation updates needed for the framework specification to accurately represent the implemented framework.
- Result type: documentation conformance review only; no production script changes are recommended by this report.

## Executive Summary

The specification remains directionally accurate for the protected high-level framework: single-file Apps Script architecture, dashboard-driven configuration, template-first formatting, Primary PMR row ownership, batch-oriented processing, Dashboard Quality as the consolidated QA artifact, and preservation of Raw Data / Demo P auditability.

However, the PDF draft is no longer current as the governing technical reference for the active implementation. Its biggest defect is baseline drift: it identifies v1.6.74 as the implementation authority, while the current production script is v1.7.6. Several v1.7.6 capabilities are absent or under-described, especially the Index / external cold-storage archive architecture, web-app restore routing, active-vs-import monthly archive menus, current tab sort order, Create Monthly Update workflow order, and the expanded Dashboard Quality section model.

The recommended updates are documentation corrections only. No architectural redesign is warranted based on this review.

## Key Implementation Anchors Found in v1.7.6

- Version anchor: `MASTER_LIST_MERGE_ML_VERSION` is `1.7.6`.
- Main menu architecture includes Data & Processing Engine, Sheet & Layout Management, Quick Start-up, Maintenance/Rebuild, and Start-up submenus.
- The all-in-one Create Monthly Update workflow executes Monthly Change Report, Demo P sync, Disenrolled update, Master List creation, then Index refresh / active tab organization.
- Dashboard Quality now has fixed governed sections A through Q, including Format Dashboard Changelog and operational data validation sections.
- Index architecture now includes active workspace sections, external cold-storage archive sections, restore hyperlinks, archive spreadsheet ID configuration, and optional web-app restore routing.
- Sheet lifecycle now distinguishes visible operational sorting from system/template tail-block locking and separate monthly import versus monthly active archive menus.

## Findings and Required Specification Updates

### 1. Baseline authority is outdated

**Status:** Outdated specification.

The PDF repeatedly identifies the specification as documenting the current approved production script v1.6.74 and uses v1.9/v2.0 reference language. The implementation source of truth for this review is v1.7.6.

**Recommended specification update:** Replace v1.6.74 implementation-authority language with current production script v1.7.6, and add a short compatibility note that older v1.6.74/v1.9 references are historical unless specifically retained as governance history.

### 2. Menu entry points and public interfaces are incomplete

**Status:** Missing documentation.

The implemented public menu surface is broader than the draft describes. The active menu exposes grouped entry points for formatting imports, monthly update processing, Demo P update/build, disenrolled processing, Monthly Change, Master List creation, monthly import and active sheet archive/hide operations, template visibility, system sheet visibility, quick startup, Dashboard Quality workflows, smoke validation, format-sheet shortcuts, system setup, dashboard rebuild, active layout capture, template refresh, Index build, archive restore, web-app URL configuration, and archive spreadsheet ID configuration.

**Recommended specification update:** Add a public-entry-point table reflecting the current menu structure and callback names. The table should distinguish public menu callbacks from private underscore helpers.

### 3. Create Monthly Update workflow order is materially under-specified

**Status:** Incorrect / incomplete workflow description.

The active implementation runs Create Monthly Update in this order:

1. Prompt for the locked report month.
2. Run preflight validation before monthly output mutations.
3. Build the Monthly Change Report.
4. Update Demo P from Raw Data for changed PMRs.
5. Create/update Disenrolled Exclusion and remove qualifying rows from Demo P.
6. Create Master List.
7. Refresh the Index and organize active tabs without exposing hidden system/template sheets.

**Recommended specification update:** Document this as the governing monthly workflow sequence. Any older description that places Master List before Monthly Change / Demo P replacement, or omits the final Index/sort step, should be corrected.

### 4. Format Monthly Sheets routing is missing current B/CD/UC/RD import behavior

**Status:** Missing processing detail.

The current bulk formatting workflow routes monthly import sheets by short-code candidates: `B` for Banners, `CD` for Care Plan Due, `UC` for Unlocked CP, and `RD` for Raw Data. It prompts once for the target month, selects month-matching source tabs when possible, validates active/source suitability, formats each available route, and logs skipped missing imports rather than requiring all routes to exist.

**Recommended specification update:** Add the current import-routing table and explicitly document skipped-missing-import behavior.

### 5. Dashboard Quality architecture is outdated

**Status:** Outdated section model.

The PDF draft describes a shorter Dashboard Quality structure. The current implementation governs fixed sections A through Q:

- A Global Inputs Verification
- B Sheet Definitions Verification
- C Sheet Behavior Verification
- D Column Definitions Verification
- E Sheet Headers Verification
- F Template Structure & Validation
- G Format Dashboard Changelog
- H Framework Health Check
- I Performance Summary
- J Raw Data Validation
- K Care Plan Sync Validation
- L Workflow & Synchronization Verification
- M Demo P Quality Validation
- N Disenrolled Exclusion Validation
- O Monthly Change Validation
- P Summary
- Q Signoff

**Recommended specification update:** Replace the Dashboard Quality section inventory with the A-Q model and document section-only governed writes, timestamp handling, and Dashboard Quality as the consolidated QA artifact.

### 6. Format Dashboard Changelog governance is not documented

**Status:** New feature not documented.

The implementation stores and verifies a Format Dashboard Changelog section inside Dashboard Quality. This section is part of Dashboard Quality verification and should be documented as a governance mechanism for configuration drift tracking.

**Recommended specification update:** Add Format Dashboard Changelog to dashboard governance and QA workflow sections, including its role in detecting dashboard changes.

### 7. Index and external cold-storage archive architecture are missing

**Status:** New architecture not documented.

The current implementation has an Index sheet that inventories active operational sheets, monthly imports, unformatted sheets, archive/system sheets, templates, other live sheets, and an external archive spreadsheet. It supports archive links and restore actions. The draft only references the Index at a high level and does not document the external archive database behavior.

**Recommended specification update:** Add an Index architecture section covering:

- Active workspace inventory grid.
- External Drive Cold-Storage Archives grid.
- `RFF_ARCHIVE_SPREADSHEET_ID` default and document-property override.
- Archive spreadsheet ID configuration callback.
- Restore action column and restore behavior.
- Index placement as the first sheet.

### 8. Web-app restore routing is missing

**Status:** New public integration surface not documented.

The current script implements `doGet(e)` to route restore requests from Index hyperlinks through a deployed Apps Script web app. It supports a configured or auto-detected web-app URL and uses a document lock during restore execution.

**Recommended specification update:** Add deployment / integration documentation for optional Index restore web-app routing, including required URL configuration, restore target parameter behavior, and the menu fallback when no web-app URL is available.

### 9. Sheet lifecycle and tab ordering are outdated

**Status:** Incorrect sheet lifecycle description.

The current active global sort order is:

1. Index.
2. Demo P.
3. Monthly Change.
4. Master List.
5. Disenrolled Exclusion.
6. Archive - Demo P.
7. Formatted monthly imports: Raw Data, Banners, Care Plan Due, Unlocked CP.
8. Unformatted source imports.
9. Other live sheets.
10. System/template tail block: Framework Timing Report, Dashboard Quality Report, Format Dashboard, templates, base template.

Older visible working-order statements in the draft should be updated where they conflict with this implementation.

**Recommended specification update:** Replace the visible working order and system/template tail-block rules with the v1.7.6 sort-rank model.

### 10. Monthly import versus monthly active archive operations are not distinguished

**Status:** Missing lifecycle rule.

The current menu and implementation distinguish monthly import sheet lifecycle operations from monthly active sheet lifecycle operations. Import archive/hide operations apply to Raw Data, Banner, Care Plan Due, and Unlocked monthly imports. Active archive/hide operations apply to Master List, Monthly Change, and Demo P active output categories.

**Recommended specification update:** Add separate lifecycle rules for monthly import sheets and monthly active sheets, including menu entry points and intended ownership boundaries.

### 11. Archive - Demo P ownership is under-documented

**Status:** Missing data-ownership detail.

During Demo P monthly synchronization, rows being replaced are archived to `Archive - Demo P` before the Demo P body is rewritten. This makes the archive sheet part of the governed data-retention workflow, not just a generic system tab.

**Recommended specification update:** Document `Archive - Demo P` as a governed retention sheet for Demo P monthly replacement history, and define when the workflow writes to it.

### 12. Configuration architecture is missing document-property overrides

**Status:** Incomplete configuration standard.

The current implementation contains script constants plus document-property configuration for archive spreadsheet ID and Index restore web-app URL. The specification should not describe configuration as exclusively dashboard-based or constant-based.

**Recommended specification update:** Add a configuration-source hierarchy:

1. Script constants for protected defaults.
2. Format Dashboard sections for governed report/template behavior.
3. Document properties for deployment/runtime identifiers such as archive spreadsheet ID and Index restore web-app URL.
4. Runtime cache as non-authoritative execution optimization.

### 13. Sheet definitions should include current system sheets and templates

**Status:** Missing / outdated sheet inventory.

The current implementation governs these notable sheets and sheet categories:

- Index.
- Demo P.
- Monthly Change reports.
- Master List outputs.
- Disenrolled Exclusion.
- Archive - Demo P.
- Raw Data, Banners, CP Due, and Unlock CP monthly outputs.
- Framework Timing Report.
- Dashboard Quality Report.
- Format Dashboard.
- Template - Banner Report.
- Template - Care Plan Due.
- Template - Unlocked Care Plan.
- Template - Raw Data.
- Template - Demo P.
- Template - Disenrolled Exclusion.
- Template - Master List.
- Template - Monthly Change.
- RFF_BASE_TEMPLATE.

**Recommended specification update:** Update sheet definitions, sheet lifecycle, template inventory, and hidden/system sheet descriptions to match this inventory.

### 14. Timing and logging strategy should include compact Framework Timing governance

**Status:** Incomplete logging strategy.

The implementation logs workflow timing, severity, timing warnings, benchmarks, compact section updates, and Dashboard Quality performance summaries. The draft should explicitly connect timing logs to Dashboard Quality performance summary and framework health reporting.

**Recommended specification update:** Add that workflow entry points should run through framework timing wrappers where applicable, timing rows are compacted / summarized, and performance issues flow into Dashboard Quality and health reporting.

### 15. Error handling should document preflight hard stops and best-effort warnings

**Status:** Incomplete error-handling strategy.

The implementation uses preflight hard stops for unsafe workflow states, UI alerts for missing dependencies or invalid selections, document locks for web restore, and best-effort warning logs for non-critical formatting, sorting, hiding, and telemetry operations.

**Recommended specification update:** Document the current distinction between blocking validation errors and best-effort warnings.

## Areas Where the Specification Remains Aligned

The following specification themes still align with v1.7.6 and should be preserved rather than redesigned:

- Current production script remains the implementation source of truth.
- Single-file Apps Script architecture remains protected.
- Dashboard-driven formatting and template-first output generation remain governing principles.
- Primary PMR row remains authoritative for participant-level synchronization.
- Raw Data preservation and Demo P auditability remain central governance rules.
- Master List contains Primary PMR rows only.
- Dashboard Quality remains the consolidated QA artifact rather than relying on standalone QA sheets.
- Batch-oriented processing and minimized Spreadsheet API usage remain the correct performance standards.

## Recommended Specification Update Priority

1. **Critical:** Update implementation baseline from v1.6.74 to v1.7.6.
2. **Critical:** Replace workflow-order documentation for Create Monthly Update.
3. **High:** Replace Dashboard Quality section inventory with A-Q current model.
4. **High:** Add Index / external archive / restore architecture.
5. **High:** Update sheet lifecycle and global tab ordering.
6. **Medium:** Add public menu entry-point table.
7. **Medium:** Add configuration-source hierarchy, including document properties.
8. **Medium:** Add monthly import versus active archive lifecycle distinction.
9. **Medium:** Add Archive - Demo P ownership and retention rules.
10. **Low:** Clarify timing/logging and best-effort warning strategy.

## Conclusion

The current Master List Framework Specification v2.0 Draft should be updated before it is treated as the governing technical reference for future v1.7.6 development. The required work is documentation alignment, not production architecture redesign. The production script already implements the authoritative behavior; the specification should be revised to reflect that behavior accurately.
