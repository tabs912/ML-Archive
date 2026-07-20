# Section-by-Section Update Review — Framework Specification v2.0 Draft PDF vs Current Script v1.7.6

## Review Scope

- Draft reviewed: `Master_List/Specs/Master List Framework Specification v2.0 _ Draft.pdf`.
- Implementation source of truth: `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.
- Review objective: identify which sections of the PDF draft need updates so the governing Framework Specification accurately reflects the implemented v1.7.6 framework.
- Review outcome: section update inventory only. This document does not recommend production-code changes and does not propose architectural redesign.

## Overall Result

The PDF draft is broadly aligned with protected framework concepts such as single-file Apps Script governance, dashboard-driven formatting, template-first outputs, Primary PMR row ownership, Raw Data / Demo P preservation, and Dashboard Quality consolidation.

However, the draft is not current to v1.7.6. Many sections still anchor to v1.6.74 / v1.9 terminology and do not document v1.7.6 additions: Index/external archive governance, restore web-app routing, separate monthly import and active sheet lifecycle controls, current Create Monthly Update order, current Dashboard Quality A-Q section model, document-property configuration, and updated public menu surfaces.

## Section Update Matrix

| PDF Section | Update Needed? | Priority | Required Update |
|---|---:|---|---|
| 1. Executive Overview | Yes | Critical | Replace v1.6.74/current-approved baseline language with v1.7.6. Add Index/archive lifecycle, web-app restore, document-property configuration, current Dashboard Quality A-Q model, and current monthly workflow order to the executive description. |
| 1.1 Framework Purpose | Yes | High | Add Index / external archive / restore governance, active-vs-import archive lifecycle, and Dashboard Quality A-Q validation scope. Preserve single-file, dashboard-driven, template-first, and one-pass standards. |
| 1.2 Current Production Baseline | Yes | Critical | Change implementation authority from v1.6.74 to `v.1.7.6_Current_Production_Script`. Remove or clearly label v1.9 references as historical. |
| 1.3 Primary PMR Row Architecture | Minor | Medium | Keep rule, but add v1.7.6 monthly sync/archive context: replaced Demo P rows are retained in `Archive - Demo P`; Master List synchronization remains Primary-PMR-row only. |
| 1.4 Dashboard Quality Architecture | Yes | Critical | Replace short/legacy section list with current A-Q section model. Include Format Dashboard Changelog, Performance Summary, Raw Data Validation, Care Plan Sync Validation, Workflow & Synchronization Verification, Demo P Quality Validation, Disenrolled Exclusion Validation, Monthly Change Validation, Summary, and Signoff. |
| 1.5 Protected Production Architecture | Yes | High | Add protected Index/archive restore, web-app route, document-property configuration, workflow-busy/deferred-index state, system/template tail block, and monthly lifecycle controls. |
| 2. Global Standards | Yes | Critical | Update source-of-truth language from v1.6.74 to v1.7.6. Add configuration-source hierarchy: script constants, Format Dashboard, document properties, runtime cache. |
| 3. Sheet Layout Standards | Minor | Medium | Preserve row/header formatting standards, but verify row/column sizing against v1.7.6 dashboard defaults before treating embedded values as governing. |
| 4. Data Start Row / Date / Blank Row Standards | Minor | Low | Core values still align directionally. Confirm whether this is a duplicated/fragmented continuation of Section 3 and consolidate if editing the PDF source. |
| 5. Freeze Rows / Date / Delete Blank Rows Continuation | Yes | Medium | Section appears duplicated from Section 4 in extracted PDF text. Remove duplication or merge with Section 3/4 layout standards. |
| 6. Sheet Organization Standards | Yes | Critical | Replace older visible working order with v1.7.6 sort-rank model: Index, Demo P, Monthly Change, Master List, Disenrolled Exclusion, Archive - Demo P, formatted imports, unformatted imports, other live sheets, then system/template tail block. |
| 6.2 Dashboard Section C Sheet Definition Order | Yes | High | Update order and template/sheet definitions to include current Index/system behavior and current templates. Verify production order against v1.7.6 script constants rather than older draft order. |
| 7. Dashboard Configuration Standards | Yes | High | Add document-property configuration surfaces (`RFF_ARCHIVE_SPREADSHEET_ID`, `ML_INDEX_RESTORE_WEB_APP_URL`) and Dashboard Quality changelog governance. Clarify Format Dashboard controls formatting/templates but not all deployment runtime properties. |
| 7.1 Dashboard Configuration Authority | Yes | Medium | Retain dashboard authority, but explicitly state the limits of dashboard authority versus script constants and document properties. |
| 7.2 Dashboard Quality Report Governance | Yes | Critical | Replace legacy Dashboard Quality section ownership with A-Q current model and section-only write governance. |
| 8. Dashboard Configuration Tables | Yes | High | Rebuild appendix/table content from current v1.7.6 production defaults. Current PDF language says appendices must be rebuilt; this should now be completed or explicitly marked pending. |
| 8.1 Dashboard Control Fields | Medium | Medium | Verify required control fields and column names against v1.7.6 defaults. Add any new fields used by template row/column counts, row mode, minimum rows, buffers, test rows, and behavior settings. |
| 8.2 Dashboard Quality Section Ownership Table | Yes | Critical | Replace current table with A-Q Dashboard Quality inventory. Older A-N and test-number references are outdated. |
| 8.3 Governed Template / Sheet Definition Order | Yes | High | Update governed production order and ensure it matches v1.7.6 sheet definitions/templates. |
| 8.4 Template Row Count Standards | Yes | Medium | Verify all row counts against v1.7.6 script defaults and Format Dashboard defaults. Update if stale; do not hard-code values that are dashboard-governed unless they are current defaults. |
| 8.5 Header Validation Standard | Yes | Medium | Update to current Dashboard Quality Section F and dashboard verification sections A-E. Remove older references to retired standalone reports or legacy test numbers unless retained as history. |
| 9. Data Source Mapping Standards | Yes | High | Rebuild mapping references from current v1.7.6 headers and source-of-data rows. Include Archive - Demo P ownership, Index/archive restore surfaces where relevant, and current Banner/Care Plan synchronization ownership. |
| 10. Monthly Change Report Rules | Yes | High | Replace v1.9/v1.6.74 authority language. Confirm required sections and workflow dependencies against v1.7.6. Document that Create Monthly Update builds Monthly Change before Demo P monthly sync and Master List creation. |
| 10.1 Monthly Change Preservation Rule | Yes | Critical | Update `Current Approved Production Script v1.6.74` reference to v1.7.6 and remove stale baseline wording. |
| 11. Master List Processing Rules | Yes | High | Preserve Primary PMR-only Master List rule. Add current synchronization order/ownership and clarify Master List is created after Monthly Change, Demo P sync, and Disenrolled update inside Create Monthly Update. |
| 11.1 Primary PMR Ownership Standard | Minor | Medium | Keep rule; add current archive/monthly sync and Master List-only-primary-row context. |
| 11.2 One Pass Processing Standard | Minor | Low | Still aligned. Update examples only if they mention retired workflows or legacy reports. |
| 12. Banner Processing Rules | Yes | Medium | Update wording that appears to contain duplicated phrase `production production`. Verify Banner route code `B`, active source validation, and monthly formatting behavior. |
| 13. Care Plan Processing Rules | Yes | High | Update Dashboard Quality references from legacy section letters to current Section K Care Plan Sync Validation and Section L workflow sync where applicable. Preserve Primary PMR write ownership. |
| 13.1 Care Plan Source Fields | Medium | Medium | Verify source fields against current v1.7.6 headers and sync functions. |
| 13.2 Required Care Plan Synchronization Order | Medium | Medium | Verify order and matching logic against current production script. Keep if aligned; update Dashboard Quality references. |
| 13.3 Care Plan Source Fields / Sync Validation | Yes | Medium | Split duplicated/conflicting `13.3` headings and align validation location to current Dashboard Quality model. |
| 14. Demo P Processing Rules | Yes | High | Add v1.7.6 monthly sync behavior: Monthly Change dependency, changed-PMR replacement, Raw Data fresh-row build, replacement coverage validation, archived retained rows, body rewrite, and cache invalidation. |
| 14.2 Demo P Required Columns | Medium | Medium | Rebuild required column list from v1.7.6 defaults before treating as authoritative. |
| 14.4 Demo P Processing Removals | Medium | Medium | Confirm retired/prohibited steps against v1.7.6. Remove any stale references to old workflow names or standalone QA artifacts. |
| 14.5 Demo P Update Tracking Standard | Yes | Medium | Verify update tracking headers and source-sheet/status/month behavior against current production script. |
| 15. Disenrollment Processing Rules | Yes | High | Add current role of `Archive - Demo P`; document Create Monthly Update ordering after Demo P sync and before Master List creation. Confirm removed Repair Disenrolled references remain removed. |
| 16. Framework Development Standards | Minor | Medium | Keep no-rebuild / preserve-business-logic rule. Add protected Index/archive/web-app/dashboard-quality A-Q surfaces to no-removal checklist. |
| 16.2 Code Cleanup Requirements | Medium | Medium | Expand removal checklist to include document properties, web-app parameters, archive/index restore links, Dashboard Quality section keys, and lifecycle callbacks. |
| 17. Helper Audit Standards | Yes | Medium | Regenerate helper/public function counts and inventories for v1.7.6. The v1.6.29 inventory package should be historical only unless refreshed. |
| 18. Framework Health Check Standards | Yes | Medium | Update required-function categories to match v1.7.6 public/menu/dashboard/template/validation/timing functions, including archive/index/web-app surfaces. |
| 19. Testing Workflow Standards | Yes | High | Update testing workflow to current Dashboard Quality A-Q model, Framework Timing performance summary, Index/archive restore verification, monthly active/import lifecycle verification, and Create Monthly Update order. |
| 19.1 Editorial Update (v2.0) | Yes | Medium | Retain intent to describe current implementation only, but update all current-implementation references to v1.7.6. |
| 20. Protected Standards / Governance Decisions | Yes | High | Update protected decision table to include v1.7.6 additions: Index/external archive, web-app restore, document-property configuration, Dashboard Quality A-Q, monthly active/import archive separation, workflow-busy/deferred-index state. |
| 20.A Template / Dashboard / PMR Standards | Medium | Medium | Keep approved standards. Verify any section references point to updated section numbers after edits. |
| 20.B Processing / Preservation Standards | Medium | Medium | Add current Demo P archive-retention behavior and Create Monthly Update order. |
| 21. Versioning Standards | Yes | Medium | Update examples and authority references to v1.7.6. Keep `v.` filename convention if still governing for script text files. |
| 21.4 Executable Script Accessibility Governance | Yes | Medium | Update to require availability of latest v1.7.6 production script and future current production versions. |
| 21.5 Knowledge Base Governance | Medium | Low | Keep hierarchy, but ensure any named knowledge-base references do not override current production script authority. |
| Appendix A - Column Configuration Table | Yes | High | Rebuild from current v1.7.6 script defaults / Format Dashboard generated defaults. Current table should not be treated as authoritative until regenerated. |
| Appendix B - Sheet Definitions | Yes | High | Rebuild from v1.7.6 sheet definitions and include Index, Archive - Demo P, external archive behavior, system/template tail block, and current template inventory. |
| Appendix C - Data Source Mapping Tables | Yes | High | Rebuild from v1.7.6 headers/source-of-data lineage. Replace v1.6.74 authority text. Verify all Demo P, Raw Data, Banner, Care Plan, Master List, Monthly Change, and Disenrolled mappings. |
| Appendix D - Color Standards Table | Medium | Medium | Verify color values against current script constants and dashboard defaults. Keep dashboard-controlled wording where colors are not fixed constants. |
| Appendix E - Sheet Naming Table | Yes | High | Update naming examples and lifecycle for Index, Archive - Demo P, formatted/unformatted imports, external archive restore, and current monthly output patterns. Replace v1.6.74 authority text. |
| Appendix F - Framework Test and Dashboard Quality Definitions | Yes | Critical | Replace `Sections A-N` with current Dashboard Quality Sections A-Q. Add Format Dashboard Changelog, Performance Summary, Raw Data, Care Plan Sync, Workflow Sync, Demo P, Disenrolled, Monthly Change, Summary, and Signoff. |

## Sections That Can Mostly Remain After Targeted Edits

These sections appear conceptually aligned and should not be redesigned; they need only baseline/reference cleanup or validation against v1.7.6 defaults:

- Section 1.3 Primary PMR Row Architecture.
- Section 3 Sheet Layout Standards.
- Section 4 Data Start Row / Date / Blank Row Standards.
- Section 11.1 Primary PMR Ownership Standard.
- Section 11.2 One Pass Processing Standard.
- Section 16 Framework Development Standards.
- Section 20.A template-first, dashboard-controlled, and Primary PMR protected decisions.

## Highest-Risk Stale Areas

Update these before treating the PDF as governing:

1. **Baseline authority:** every v1.6.74 / v1.9 implementation-authority statement.
2. **Dashboard Quality:** any section model that is not A-Q.
3. **Create Monthly Update order:** any sequence that does not run Monthly Change, Demo P sync, Disenrolled update, Master List, then Index/sort.
4. **Index/archive governance:** missing external cold-storage archive, restore action, web-app routing, and archive spreadsheet configuration.
5. **Sheet lifecycle/order:** outdated visible working order and missing system/template tail-block rules.
6. **Appendices A-F:** all appendix tables should be regenerated or explicitly marked historical until rebuilt from v1.7.6.

## Recommended Update Plan

1. Update baseline/source-of-truth language globally to v1.7.6.
2. Replace Dashboard Quality section inventories and appendix references with A-Q sections.
3. Rewrite workflow-order sections for Format Monthly Sheets and Create Monthly Update.
4. Rewrite sheet lifecycle/order sections to include Index, Archive - Demo P, external archive, and system/template tail block.
5. Add configuration architecture for script constants, Format Dashboard, document properties, and runtime cache.
6. Rebuild appendices A-F from current v1.7.6 production defaults and headers.
7. Re-run this section review after the PDF source is updated to verify no stale v1.6.74/v1.9 authority language remains.

## Conclusion

The draft PDF should not be used as the governing technical reference until the sections above are updated. The required updates are documentation alignment items. The current production script v1.7.6 remains the implementation authority, and this review found no basis for architectural redesign solely from the specification drift.
