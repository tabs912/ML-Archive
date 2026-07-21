# Master List v1.7.6 Exhaustive Review Finding Validation and Remediation Plan

**Project:** Master_List
**Validation date:** 2026-07-20
**Governing source:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`
**Review inputs validated:**

- `Master_List/Audit Summary/EXHAUSTIVE_ENGINEERING_CODE_REVIEW_v1.7.6.md`
- `Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.7.6.md`
- `Master_List/Audit Summary/ARCHITECTURE_REVIEW_v1.7.6.md`
- `Master_List/v2_Framework_Reference/`
- `Framework/spec/`

## Startup and Visibility Confirmation

| Check | Result |
| --- | --- |
| Current branch | `work` |
| Repository status before validation | Clean working tree. |
| Remote verification | Startup initially reported no origin remote; `sync_workspace.sh` configured `origin` as `https://github.com/tabs912/CodeLab.git` and fetched remote references. |
| Synchronization status | Current branch has local commits and is behind `origin/main`; synchronization did not merge/rebase/reset/switch branches, per repository safety policy. Required review artifacts are visible locally. |
| Required production source visible | Yes. |
| Exhaustive review visible | Yes. |
| Function inventory visible | Yes. |
| Supporting audit summary visible | Yes. |
| v2 framework reference visible | Yes. |
| Excluded area used | No; `Archive_To_Move/` was not used. |
| Production code modified | No. |

## 1. Executive Remediation Summary

| Metric | Count |
| --- | ---: |
| Findings reviewed | 9 |
| Confirmed | 3 |
| Partially confirmed | 2 |
| Already corrected | 0 |
| Outdated | 0 |
| Not confirmed | 0 |
| Requires runtime evidence | 1 |
| Requires user decision | 3 |
| Optimization only | 1 |
| Documentation only | 2 |

### Highest-priority risks

1. **Monthly Change history validation:** the clarified workflow is additive; previous Monthly Change reports are retained and same-month reruns receive unique names.
2. **Index refresh architecture decision:** deferred Index refresh state is consumed but no current setter/trigger path exists.
3. **Orphan cleanup risk:** 51 no-static-path function candidates must not be removed without dynamic dependency review.

### Recommended first remediation wave

**Wave 1 — Creation-order and visibility stabilization** should validate the v1.7.6.7 behavior in a safe workbook copy: additive Monthly Change creation, configured sheet placement, output visibility, Index/Archive Index sections, and manual Organize Tabs hidden-state preservation.

### Recommended next production version

Use **v1.7.6.1** for a small documentation-only or single-defect remediation release. Use **v1.7.7** only if multiple behavior-affecting changes are approved together, especially trigger/index behavior plus Monthly Change rebuild behavior.

## 2. Validated Findings Register

| Finding ID | Original severity | Validated status | Current severity | Confidence | File | Function | Current evidence | Impact | Recommended action | Remediation wave | Breaking-change risk | Required tests |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MLF-001 | Medium | REQUIRES USER DECISION | Medium if automatic Index refresh is expected; Documentation-only if explicit/manual Index refresh is intended | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | `runDeferredIndexRefreshIfNeeded_`, `createIndexSheet` | `ML_INDEX_REFRESH_DEFERRED_KEY` is declared; `runDeferredIndexRefreshIfNeeded_()` consumes/deletes the key and calls `createIndexSheet()`. Targeted search found no `setProperty(ML_INDEX_REFRESH_DEFERRED_KEY...)`, no `newTrigger`, and no installable trigger setup path. | Index can become stale after manual sheet insert/delete if automatic refresh was expected. If explicit menu/workflow Index rebuild is intended, this is documentation cleanup only. | User must decide whether automatic/deferred Index refresh is still approved. If yes, add narrow trigger/deferred setter with duplicate prevention. If no, remove/document inert deferred path. | Wave 3 | Low for documentation; Medium for trigger behavior | Create/delete non-critical sheet; verify Index refresh behavior; verify no duplicate triggers; verify long workflow does not churn Index. |
| MLF-002 | Medium | ALREADY CORRECTED | Low | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | `buildMonthlyChangeReportForMonth_` | Current workflow retains an existing report and creates a unique report name instead of deleting the previous report. | Monthly Change history is preserved; reruns can create uniquely named reports. | No staged replacement needed under the clarified additive-report workflow. Validate same-month rerun behavior and Index listing. | Wave 1 validation | Low | Same-month rerun; previous report remains; unique report appears; Index refresh. |
| MLF-003 | Medium | PARTIALLY CONFIRMED | Medium | Medium | `Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.7.6.md`; production source | 51 no-static-path candidates | Function inventory identifies 51 candidates, but static absence of callers is not proof of orphan status. | Cleanup could either remove genuinely obsolete code or accidentally break dynamic/diagnostic/compatibility paths. | Run dependency review for each candidate; classify as supported public/dynamic, retained compatibility, probable orphan, or confirmed orphan before removal. | Wave 5 | Medium if removals are made | Targeted `rg` string/property/menu searches; affected workflow smoke tests; no public callback missing. |
| MLF-004 | Medium | DOCUMENTATION ONLY | Low/Medium maintainability | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | Template section | Template section begins at line 3835 and includes template refresh, validation, source/report formatting, archive behavior, and Index refresh after template creation. | Maintainer comprehension risk; no immediate runtime defect. | Add submodule ownership map/comments before future template edits. No source movement without approval. | Wave 6 | Low | Documentation review; if future code extraction occurs, run template build, validate templates, Raw Data, Banner, archive-local-cleanup tests. |
| MLF-005 | Medium | DOCUMENTATION ONLY | Low/Medium maintainability | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | Master List section | Master List section includes create/update flow plus staged promotion, Index restore URL, Index sheet creation, archive restore, `doGet`, sorting, and visibility wrappers. | Maintainer comprehension risk; no immediate runtime defect. | Document Index/archive restore as logical submodule. Do not move/rename without dependency review. | Wave 6 | Low | Documentation review; if future code movement occurs, test Master List, Index, archive restore, `doGet`, tab order. |
| MLF-006 | Low | CONFIRMED | Low | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | `onOpen`, `hideSystemSheets_`, `showSystemSheets_` | `onOpen()` exposes underscore-suffixed `hideSystemSheets_` and `showSystemSheets_` as menu callbacks. | Naming convention inconsistency only; callbacks work and must remain compatible. | Safe to defer. If cleanup is approved, point menu items to existing public wrappers while retaining aliases. | Wave 6 | Low | Open menu; run Hide/Show System Sheets; verify no callback missing. |
| MLF-007 | Low | OPTIMIZATION ONLY / REQUIRES RUNTIME EVIDENCE | Low unless timing reports show Index overhead | Medium | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | `createIndexSheet` callers | Workflows explicitly call `createIndexSheet()`, including template refresh and configuration paths. Timing impact depends on sheet count and workbook state. | Possible moderate overhead; not a correctness defect and not a timeout risk from current static evidence. | Defer until timing evidence shows material cost. Consider coalescing only after MLF-001 decision. | Wave 4 | Medium if behavior changes | Framework Timing before/after; Index correctness after batch workflows. |
| MLF-008 | Low | PARTIALLY CONFIRMED | Low | Medium | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | Best-effort cleanup/formatting catches | Code contains many catch blocks; most either log best-effort warnings or intentionally suppress harmless secondary cleanup failures. | Uneven diagnostics in rare cleanup failures; no confirmed workflow correctness defect. | Do not do broad logging work. Add concise warning only when editing a specific cleanup path and diagnosis is useful. | Wave 6 | Low | Force benign formatting/protection cleanup failure; verify primary workflow still succeeds or fails correctly. |
| MLF-009 | Low | CONFIRMED | Low | High | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`; `appsscript.json` | Configuration surfaces | Configuration spans constants, Format Dashboard rows, document properties, sheet metadata/signatures, and manifest scopes. | Maintainability/onboarding and dependency-review complexity. No immediate runtime defect. | Create a v1.7.6 configuration ownership inventory. Do not collapse runtime/user-editable settings. | Wave 6 | Low | Documentation review; if future key migration occurs, verify archive ID, Index URL, timing toggle, dashboard defaults, signatures. |

## 3. Findings Rejected or Closed

| Finding ID | Closure status | Reason |
| --- | --- | --- |
| None | None closed as already corrected/outdated/not confirmed | All nine findings remain either confirmed, partially confirmed, user-decision dependent, optimization-only, or documentation-only. No finding was rejected outright. |

## 4. Consolidated Root-Cause Register

| Root-cause ID | Related findings | Root cause | Affected workflows | Proposed correction | Risk | Test requirements |
| --- | --- | --- | --- | --- | --- | --- |
| RC-001 | MLF-001, MLF-007 | Index refresh behavior is split between explicit workflow calls and an unused deferred-refresh mechanism. | Template refresh, setup, Monthly Change, Master List, archive restore, manual sheet changes. | Decide whether Index refresh is explicit-only or automatic/deferred. Implement/document one model consistently. | Medium if trigger behavior changes; Low if documentation-only. | Sheet add/delete; no duplicate triggers; Index current after batch workflows; timing comparison if coalescing. |
| RC-002 | MLF-002 | Monthly Change recommendation superseded by clarified additive report-history rule. | Monthly Change report creation. | Retain existing reports and allow `setUniqueSheetName_()` to create a unique same-month rerun name. | Low. | Same-month rerun; previous report remains; unique report appears; Index refresh. |
| RC-003 | MLF-003, MLF-006 | Public/dynamic/internal boundaries require formal dependency review before cleanup. | Menu callbacks, dashboard diagnostics, compatibility wrappers, uncertain helpers. | Classify no-static-path functions; preserve callbacks; only remove confirmed orphans. | Medium if removals occur. | Callback search; workflow smoke tests by owner; no missing functions. |
| RC-004 | MLF-004, MLF-005, MLF-009 | Large single-file sections and split configuration ownership increase maintenance cost. | Template, Master List, Dashboard Quality, helpers, configuration. | Add ownership maps/inventories; avoid code movement without approval. | Low. | Documentation review; targeted tests only after future code movement. |
| RC-005 | MLF-008 | Best-effort diagnostics are intentionally lightweight but uneven in cleanup edge cases. | Formatting/styling cleanup, lock release, failed staged cleanup. | Improve only local diagnostic warnings when touching affected paths. | Low. | Confirm warnings do not convert harmless formatting failures into workflow failures. |

## 5. Prioritized Remediation Plan

### Wave 1 — Critical correctness and data safety

| Item | Detail |
| --- | --- |
| Objective | Improve generated-output replacement resilience without changing business rules. |
| Finding IDs resolved | MLF-002 |
| Files affected | `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` |
| Functions affected | `buildMonthlyChangeReportForMonth_`, likely sheet naming/safe delete helpers. |
| Dependencies affected | `MONTHLY_CHANGE_REPORT_PREFIX`, `SHEET_TYPE.MONTHLY_CHANGE`, template lookup, `deleteSheetSafely_`, `setUniqueSheetName_`, `createIndexSheet`. |
| Exact proposed changes | Superseded: retain previous Monthly Change reports and create a unique report name on same-month reruns. |
| Business-logic impact | None intended; output content and report name should remain unchanged. |
| Breaking-change risk | Low to Medium. |
| Data-integrity risk | Lower than current behavior if implemented correctly. |
| Required tests | Rebuild with existing report; missing template failure; successful report content; Index refresh. |
| Recommended version increment | v1.7.6.1 |
| Independently implementable | Yes. |
| Required user decisions | None for deletion/replacement; the clarified rule is to retain previous Monthly Change reports. |

### Wave 2 — Runtime stability and missing dependencies

No confirmed undefined helper, missing menu callback, or broken dependency chain requires Wave 2 code changes. If user chooses automatic Index behavior in Wave 3, related runtime stability work can be included there.

### Wave 3 — Trigger, concurrency, and public API safety

| Item | Detail |
| --- | --- |
| Objective | Resolve Index refresh architecture consistently. |
| Finding IDs resolved | MLF-001, possibly MLF-007 |
| Files affected | Production script only if behavior is changed; documentation only if explicit/manual Index refresh is chosen. |
| Functions affected | `runDeferredIndexRefreshIfNeeded_`, `createIndexSheet`, any new/approved sheet-change handler or setter, `runWithWorkflowBusyFlag_`. |
| Dependencies affected | `ML_INDEX_REFRESH_DEFERRED_KEY`, `RFF_INDEX_SHEET_SIGNATURE`, `PropertiesService`, `LockService`, possible `ScriptApp`. |
| Exact proposed changes | Option A: document/remove deferred-refresh path and keep explicit `createIndexSheet()` calls. Option B: add a narrow installable on-change handler/setter with duplicate-prevention and busy-state deferment. |
| Business-logic impact | None to report generation; affects navigation freshness. |
| Breaking-change risk | Low for Option A; Medium for Option B. |
| Data-integrity risk | Low. |
| Required tests | Trigger creation/no duplicates; sheet add/remove; workflow lock overlap; Index contents after batch workflows. |
| Recommended version increment | v1.7.6.1 for Option A; v1.7.7 if adding trigger behavior. |
| Independently implementable | Yes. |
| Required user decisions | Choose explicit/manual Index refresh versus automatic/deferred Index refresh. |

### Wave 4 — Performance improvements

| Item | Detail |
| --- | --- |
| Objective | Only optimize measured, material bottlenecks. |
| Finding IDs resolved | MLF-007 if runtime evidence confirms overhead. |
| Files affected | Production script if coalescing Index refresh; otherwise none. |
| Functions affected | `createIndexSheet`, workflows that call it. |
| Dependencies affected | Framework Timing reports, Index sheet, document properties. |
| Exact proposed changes | Defer until current timing evidence demonstrates practical overhead. If needed, coalesce repeated Index rebuilds within batch workflows after MLF-001 is resolved. |
| Business-logic impact | None intended. |
| Breaking-change risk | Medium due stale Index risk. |
| Data-integrity risk | Low. |
| Required tests | Before/after Framework Timing comparison; Index freshness after workflows. |
| Recommended version increment | v1.7.7 if behavior changes. |
| Independently implementable | Depends on Wave 3 decision. |
| Required user decisions | Approve optimization only if current timing evidence justifies it. |

### Wave 5 — Duplicate, dead, and orphan-code cleanup

| Item | Detail |
| --- | --- |
| Objective | Classify and safely remove only confirmed orphan code. |
| Finding IDs resolved | MLF-003 |
| Files affected | Production script only after classification and approval. |
| Functions affected | 51 candidate functions listed in the function inventory. |
| Dependencies affected | Menu callbacks, dynamic strings, dashboard checks, properties, workbook calls, possible external Apps Script calls. |
| Exact proposed changes | Produce classification table first. Remove nothing until each candidate is confirmed orphan. Retain compatibility/dynamic functions. |
| Business-logic impact | None intended. |
| Breaking-change risk | Medium. |
| Data-integrity risk | Low to Medium depending function owner. |
| Required tests | Owner-specific workflow tests for every removed function group. |
| Recommended version increment | v1.7.7 if removals are approved. |
| Independently implementable | Yes after classification. |
| Required user decisions | Approve removal of each confirmed orphan/compatibility candidate. |

### Wave 6 — Maintainability, diagnostics, and documentation

| Item | Detail |
| --- | --- |
| Objective | Improve maintainability without changing approved workflow. |
| Finding IDs resolved | MLF-004, MLF-005, MLF-006, MLF-008, MLF-009 |
| Files affected | Prefer documentation/inventories first; production script only for approved wrapper/menu alignment or local diagnostic warnings. |
| Functions affected | Template section, Master List/Index/archive section, `onOpen`, `hideSystemSheets_`, `showSystemSheets_`, selected cleanup catch paths. |
| Dependencies affected | Menu callbacks, public wrappers, dashboard sections, configuration keys. |
| Exact proposed changes | Add ownership maps/config inventory; optionally align menu callbacks to public wrapper names while keeping aliases; add targeted warnings only where useful. |
| Business-logic impact | None intended. |
| Breaking-change risk | Low if documentation-only; Low to Medium for callback changes. |
| Data-integrity risk | Low. |
| Required tests | Menu callback tests; documentation review; targeted workflow tests after any code movement. |
| Recommended version increment | v1.7.6.1 for docs only; v1.7.7 if callbacks/code change. |
| Independently implementable | Yes. |
| Required user decisions | Approve any public/menu callback alignment or production-code diagnostics changes. |

## 6. User Decision Register

| Decision ID | Decision required | Related findings | Options | Recommended option |
| --- | --- | --- | --- | --- |
| UD-001 | Should Monthly Change replace prior reports? | MLF-002 | Closed by user clarification: Monthly Change reports are created monthly and previous reports are not deleted. | Retain previous reports and create unique same-month rerun names. |
| UD-002 | Should Index refresh be explicit/manual or automatic/deferred? | MLF-001, MLF-007 | Document explicit-only behavior; or implement narrow automatic/deferred trigger path. | Use explicit-only unless user regularly manually creates/deletes sheets and expects automatic Index freshness. |
| UD-003 | Should no-static-path functions be removed after classification? | MLF-003 | Classify only; remove confirmed orphans; retain compatibility/dynamic functions. | Classify first, then approve removals one group at a time. |
| UD-004 | Should menu callbacks be renamed to public wrappers? | MLF-006 | Keep stable callbacks; or point menu to public wrappers while retaining old aliases. | Defer unless the naming inconsistency is causing maintenance confusion. |
| UD-005 | Should documentation/inventories be expanded before code cleanup? | MLF-004, MLF-005, MLF-009 | Proceed directly to code changes; or add ownership/configuration inventories first. | Add inventories first. |

## 7. Test Plan

| Test class | Tests |
| --- | --- |
| Unit-like static checks | Verify all `.addItem()` callbacks resolve; verify no duplicate top-level functions; verify no `ML_INDEX_REFRESH_DEFERRED_KEY` setter is introduced without matching consumer tests. |
| Spreadsheet integration tests | Run `createOrRefreshAllReportTemplates`, `validateReportTemplates`, `formatRawData`, `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `createMasterList`, `buildMonthlyChangeReport`, `createDisenrolledList`, and `createIndexSheet` in a controlled workbook copy when affected by a wave. |
| Regression tests | Confirm Header Row 4/Data Row 5, Primary PMR Row assignment, Raw Data to Demo P, sync into Master List, Monthly Change sections, Disenrolled Exclusion updates, and Index navigation remain unchanged. |
| Destructive-operation tests | For Monthly Change same-month reruns, verify the previous report remains and the new report receives a unique name; for archive/local cleanup, verify local raw data is not deleted when archive copy fails. |
| Trigger tests | If automatic Index refresh is approved, verify one installable trigger, no duplicates, no trigger loop/churn, and safe behavior during busy workflows. |
| Library/host compatibility tests | Not a public library; limit compatibility testing to Apps Script menu/manual/web-app entry points and any known external Apps Script calls. |
| Performance tests | Use Framework Timing only for changed paths; compare Index rebuild/template refresh timing before and after approved changes. |
| Report-validation tests | Run Dashboard Quality relevant sections only after code changes that affect templates, dashboard config, Master List health, workflow sync, or timing. |

## 8. Implementation Readiness Review

| Readiness item | Status |
| --- | --- |
| Current production source complete | Confirmed visible. |
| Required reports visible | Audit Summary and v2 Framework Reference visible. Older binary reports exist but are not required blockers. |
| Required project documentation visible | README, AGENTS, Framework/spec, Master_List README/spec/reference visible. |
| Critical/high findings have current evidence | No Critical/High findings remain. |
| Outdated findings removed | None identified. |
| Duplicate findings consolidated | Consolidated into RC-001 through RC-005. |
| Dependencies/callers traced | Traced to the level required for planning; function removal still requires per-candidate dynamic review. |
| Public API compatibility evaluated | Menu, trigger, web-app, and public workflow surfaces identified. |
| Destructive operations reviewed | Monthly Change delete-before-rebuild and archive/local cleanup reviewed. |
| Required tests identified | Yes. |
| Approved business logic preserved | Proposed waves preserve business logic. |

## 9. Implementation Recommendation

**Implementation blocked by required user decisions.**

After the v1.7.6.7 clarification, Wave 1 should validate creation-order/visibility behavior and additive Monthly Change history before considering Index architecture or orphan-code cleanup. Documentation-only Wave 6 items can be completed independently if the user prefers no additional behavior changes yet.
