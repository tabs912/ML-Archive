# Master List Framework v1.7.6 Exhaustive Engineering Code Review

**Role:** Lead Framework Engineer
**Review date:** 2026-07-20
**Source of truth:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`
**Use case calibration:** privately operated container-bound Google Apps Script workbook for one primary user and up to two other trusted users.
**Review stance:** practical engineering review only; no enterprise assurance, security certification, screenshot evidence, or release-validation expansion.

## 1. Executive Review Summary

| Item | Assessment |
| --- | --- |
| Overall health rating | **Approved with minor remediation** |
| Production readiness assessment | The current production script is broadly production-ready for the stated one-to-three-user workbook model. No critical code defect was confirmed during static review. |
| Critical findings | 0 |
| High findings | 0 |
| Medium findings | 5 |
| Low findings | 4 |
| Highest-risk workflows | Monthly Change report rebuild, Index/web-app restore, Dashboard Quality/Format Dashboard governance, template refresh, destructive archive/local-cleanup paths. |
| Primary bottlenecks | Template refresh/validation fan-out, Dashboard Quality full workflow, Index rebuild during/after report creation, repeated sheet formatting and sizing operations. |
| Primary maintainability concerns | Large single-file function surface, broad helper/template/Master List sections, suspected no-static-path functions, split configuration ownership, inert deferred Index-refresh path. |
| Recommended next action | Fix the small confirmed dependency/runtime-stability issues first, then perform dependency-reviewed cleanup of probable orphan paths and broad mixed-responsibility areas. |

The v1.7.6 framework continues to follow the approved single-file, dashboard-driven, template-first architecture. The code uses centralized constants, header helpers, month helpers, dashboard loaders, runtime timing, and document locks. The review found no confirmed duplicate top-level function declarations, no missing menu callbacks, and no confirmed undefined top-level internal helper calls after accounting for nested local helper functions and Apps Script built-ins.

The most important remediation is modest: align Index-refresh trigger/deferred-refresh architecture with actual code behavior, validate additive Monthly Change report-history behavior, and review probable orphan/internal functions before future removals. A rebuild is not recommended.

## 2. Repository and File Inventory

| Artifact | Status | Review Use |
| --- | --- | --- |
| `Master_List/Current Production Script/v.1.7.6_Current_Production_Script` | Governing production script | Primary code-review source. |
| `Master_List/Current Production Script/appsscript.json` | Current committed manifest for the production-script folder | Reviewed for runtime, scopes, and Apps Script service expectations. |
| `Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.7.6.md` | Current generated inventory | Used as current function/dependency inventory generated from v1.7.6. |
| `Master_List/Audit Summary/ARCHITECTURE_REVIEW_v1.7.6.md` | Current architecture review | Used as current architecture summary and logical ownership reference. |
| `Master_List/Specs/Master_List_Framework_Specification_v2.0.md` | Framework specification | Used as governing architecture intent where it does not conflict with v1.7.6 source. |
| `Master_List/v2_Framework_Reference/*.md` | Reference package | Historical/current reference context only; not used to override v1.7.6 behavior. |
| `Master_List/Reports/*.pdf` | Report exports available, mostly older than v1.7.6 | Reviewed only as available context. Absence of current v1.7.6 execution evidence is not a code defect. |
| `Master_List/ESLint/v1.7.5_*` | Older ESLint artifacts | Historical reference only. Per instruction, this review did not repeat ESLint or node checks. |

No optional report, screenshot, manifest proof, or execution-log gap is classified as a defect.

## 3. Function and Dependency Inventory

| Metric | Count / Result |
| --- | ---: |
| Top-level function declarations | 672 |
| Unique function names | 672 |
| Duplicate declarations | 0 |
| Public entry points | 64 |
| Trigger/web-app handlers | 3 (`onEdit`, `onOpen`, `doGet`) |
| Menu callback strings found in `onOpen()` | 37 |
| Missing menu callbacks | 0 |
| Destructive/write-operation functions identified by inventory | 132 write-operation functions; 32 destructive-operation functions |
| Suspected no-static-path internal functions | 51 candidates |
| Confirmed undefined top-level internal helper calls | 0 after accounting for nested local helpers and Apps Script/built-in functions |
| Confirmed duplicate helper implementations | 0 top-level duplicates detected |

Dependency review notes:

- The public menu surface is internally consistent: all `.addItem()` callback names resolve to functions in the current production script.
- Apparent undefined identifiers from raw regex extraction are local nested functions, callback parameters, spreadsheet formula names, built-ins, or Apps Script/browser globals rather than confirmed missing top-level helpers.
- Suspected no-static-path functions must remain classified as probable/dynamic/uncertain unless workbook, menu, trigger, web-app, property, and external-call references are checked.
- The manifest includes `spreadsheets`, `script.container.ui`, `script.scriptapp`, and `script.storage` scopes, which match the code's SpreadsheetApp, UI, ScriptApp service URL, and document-property usage.

## 4. Complete Findings Register

| Finding ID | Severity | Confidence | Category | Function or workflow | Description | Code evidence or execution path | Operational impact | Recommended correction | Breaking-change risk | Focused testing needed after correction |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MLF-001 | Medium | High | Trigger/dependency architecture | Index refresh / deferred refresh | Deferred Index-refresh infrastructure exists, but no current code path sets `ML_INDEX_REFRESH_DEFERRED_KEY`, and no `newTrigger`/trigger setup function exists in v1.7.6. | `ML_INDEX_REFRESH_DEFERRED_KEY` is declared and consumed by `runDeferredIndexRefreshIfNeeded_()`, but static search found no setter for that key and no trigger-creation call. | Users may expect automatic/deferred Index refresh after sheet changes, but current behavior depends on explicit `createIndexSheet()` calls in workflows. This can leave Index stale after manual sheet additions/removals. | Either remove the inert deferred-refresh concept from current architecture documentation or add the smallest safe setter/trigger path for realistic sheet insert/remove cases. | Low if documentation-only; Medium if adding trigger behavior because trigger churn must be tested. | Create/delete a non-critical sheet, run the intended trigger/menu path, confirm Index refreshes once and no duplicate trigger is created. |
| MLF-002 | Low | High | Data-flow integrity | `buildMonthlyChangeReportForMonth_` | Superseded by clarified workflow: Monthly Change reports are additive monthly outputs and previous reports should not be deleted. | Current implementation logs that an existing report is retained and uses `setUniqueSheetName_()` after template copy so same-month reruns receive unique names. | Prior report history is preserved; same-month reruns create additional report tabs. | No staged replacement is required. Validate same-month rerun behavior and Index listing. | Low; report names may receive an existing unique suffix on rerun. | Run Monthly Change twice for the same month; confirm the first report remains, a unique second report appears, and Index refresh includes both. |
| MLF-003 | Medium | Medium | Maintainability / orphan risk | Suspected no-static-path internal functions | Static inventory identifies 51 internal functions with no deterministic static caller. Some may be dynamic, diagnostic, compatibility, or obsolete. | Current function inventory lists candidates such as `c_`, raw-data fast canvas helpers, several Dashboard Quality section functions, and merge-audit helpers. | Increases dependency-review cost and raises risk that future edits accidentally preserve obsolete code or remove dynamically used code. | Classify each candidate as retained compatibility, dynamic/uncertain, probable orphan, or confirmed orphan before removal. Do not delete solely from static analysis. | Low if classification-only; Medium if removals occur. | For each candidate, run targeted `rg` string/callback/property/menu searches and execute affected workflow smoke paths after any cleanup. |
| MLF-004 | Medium | High | Maintainability / architecture | Template and validation formatter section | The template section owns template lifecycle, validation, source/report formatting, archive behavior, and smoke-validation helpers. | Section spans lines 3835-8200 and carries multiple logical submodules. | Maintainers must reason across a very broad section when making template or formatter changes, increasing regression risk. | Add submodule ownership comments or a v1.7.6 module map; avoid source splitting unless explicitly requested. | Low; documentation/comment-only cleanup. | Review template build, validate templates, Raw Data formatting, Banner formatting, and archive-local-cleanup paths after any future internal extraction. |
| MLF-005 | Medium | High | Maintainability / architecture | Master List section | Master List section also owns Index generation, archive restore, web-app restore route, global tab sorting, and visibility wrappers. | Section spans lines 10883-12674 with both production report and navigation/archive responsibilities. | Future Master List edits may unintentionally affect Index/archive/web-app restore behavior. | Document Index/archive restore as a logical submodule and keep dependency review mandatory before moving or renaming functions. | Low for documentation; Medium for code movement. | Test Master List creation, Index build, archive restore from menu, web-app `doGet` restore route, and tab ordering. |
| MLF-006 | Low | High | Public interface consistency | `onOpen()` system sheet callbacks | Menu exposes underscore-suffixed internal functions `hideSystemSheets_` and `showSystemSheets_` directly. | `onOpen()` uses `.addItem("Hide System Sheets", "hideSystemSheets_")` and `.addItem("Show System Sheets", "showSystemSheets_")`. | This does not break runtime behavior, but weakens the public/internal naming convention. | Preserve callbacks now. Optionally switch menu labels to public wrappers while retaining underscore aliases as compatibility functions. | Low. | Open menu and run Hide/Show System Sheets after callback adjustment. |
| MLF-007 | Low | Medium | Performance | `createIndexSheet()` and workflows that call it | Several workflows rebuild the Index immediately after creating/restoring sheets. For the current user base this is acceptable, but it can add overhead during template/report batches. | Static call paths include template refresh, Monthly Change, Master List, restore, and setup flows calling `createIndexSheet()`. | Moderate extra Spreadsheet service work; not a primary timeout risk unless many sheets are present. | Keep explicit rebuilds for reliability. If timing evidence shows overhead, coalesce repeated calls during batch workflows with the existing busy/deferred mechanism after MLF-001 is resolved. | Medium if behavior changes; stale Index risk. | Run workflows that create multiple sheets and confirm exactly one final Index refresh. |
| MLF-008 | Low | High | Error handling/logging | Best-effort formatting catches | Many formatting/styling catches correctly downgrade non-critical formatting failures, but a few empty nested cleanup catches reduce diagnostic detail. | Example cleanup paths catch secondary hide/release/style failures and intentionally suppress or log best-effort warnings. | Minor maintainability impact only; critical workflow errors still throw in core validation/destructive paths. | Leave harmless catches alone unless touching the function; when editing, log concise warnings where they help diagnose cleanup failure. | Low. | Force a benign formatting/protection failure and confirm primary workflow result remains correct. |
| MLF-009 | Low | Medium | Configuration ownership | Constants, Dashboard, document properties, sheet metadata | Runtime configuration is split across constants, Format Dashboard rows, document properties, sheet notes/signatures, and manifest settings. | Archive ID, timing flags, template signatures, dashboard sections, and manifest scopes are in different storage/control layers. | Correct behavior today, but onboarding and future dependency review are harder. | Add/maintain a configuration ownership inventory for v1.7.6; do not collapse runtime/user-editable settings into constants. | Low. | Documentation review only unless keys move; if keys move, verify fallback/migration. |

## 5. Supported Entry-Point Report

### Trigger handlers and web-app handlers

| Function | Classification | Status |
| --- | --- | --- |
| `onOpen` | Simple trigger / menu builder | Supported public entry point. |
| `onEdit` | Simple edit trigger | Supported trigger entry point for Format Dashboard highlighting. |
| `doGet` | Web-app restore route | Supported administrative route when deployed/configured. |

### Menu/admin functions

Supported menu/admin callbacks include formatting, monthly update, Demo P build/update, Disenrolled List, Monthly Change, Master List creation, template visibility, system visibility, timing toggle/clear, quick setup, dashboard quality, individual report formatting, Format Dashboard rebuild/layout capture, template refresh, Index build/restore, and archive/web-app configuration functions.

### Workflow functions

Primary workflow entry points include:

- `formatMonthlySheets`
- `formatRawData`
- `formatBannerReport`
- `formatCarePlanDueReport`
- `formatUnlockedCarePlanReport`
- `buildDemoPFromScratch`
- `updateDemoPMonthlySync`
- `processDemoP`
- `createMasterList`
- `runMonthlyUpdate`
- `buildMonthlyChangeReport`
- `createDisenrolledList`
- `createOrRefreshAllReportTemplates`
- `validateReportTemplates`
- `createIndexSheet`
- Dashboard Quality and Framework Timing public workflows

### Diagnostics

Diagnostic and quality entry points include Dashboard Quality startup/quick/template/full workflows, framework smoke validation, framework health check, workflow sync verification, configuration verification, and timing report refresh/recommendation functions.

### Compatibility wrappers and uncertain functions

Several public and internal wrapper-like functions exist for menu compatibility and older workflow aliases. None should be removed without dependency review. The function inventory's 51 no-static-path candidates are not confirmed orphans.

## 6. Orphan and Duplicate Code Report

| Classification | Result |
| --- | --- |
| Confirmed duplicates | None detected among 672 top-level function declarations. |
| Confirmed orphans | None confirmed by this static review. |
| Probable orphans | 51 no-static-path candidates require targeted dynamic/string/property review. |
| Retained compatibility functions | Public menu callbacks, workflow aliases, wrappers, and diagnostic entry points should be retained unless a compatibility plan is approved. |
| Dynamic or uncertain functions | Dashboard Quality callbacks, menu callbacks, web-app restore route, configuration helpers, and functions referenced by strings/properties remain dynamic/uncertain until manually traced. |

No deletion is recommended solely from static analysis.

## 7. Performance Report

| Rank | Workflow / Function | Cause | Approximate impact | Recommended correction | Risk of changing | Business logic preserved? |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Template refresh / validation | Large fan-out across dashboard config, template copying, formatting, row/column sizing, signature checks, and validation. | Highest expected runtime in setup/maintenance flows; acceptable for occasional use. | Keep smart/template signature refresh. Only optimize specific slow sections shown by Framework Timing evidence. | Medium; template defects affect many reports. | Yes. |
| 2 | Dashboard Quality full workflow | Cross-checks dashboard, templates, timing, health, Master List, sync, workflow, summary, and signoff surfaces. | Moderate to high for full quality run; acceptable as diagnostic workflow. | Keep full run explicit; avoid running as implicit dependency of routine workflows. | Low. | Yes. |
| 3 | Index rebuild | Full sheet inventory, archive index generation, formatting, link formula generation. | Moderate overhead when called after multiple workflows. | Resolve MLF-001 before coalescing Index refreshes; avoid duplicate refreshes during batches. | Medium; stale Index possible. | Yes. |
| 4 | Formatting helpers | Repeated range style operations, row heights, column widths, borders, hides/shows. | Moderate but mostly bounded by sheet count/width. | Keep current batch/range-list patterns; optimize only measured hotspots. | Low to Medium. | Yes. |
| 5 | Row deletion/cleanup paths | Batches are generally used, but destructive workflows still require careful ordering. | Low to moderate; data correctness matters more than speed. | Preserve validation-before-delete patterns; validate additive Monthly Change report history. | Low. | Yes. |

No performance issue was found that justifies increasing architectural complexity for the current one-to-three-user workbook model.

## 8. Data-Flow and Data-Integrity Report

### Strengths

- Header row 4 and data row 5 are centralized and consistently referenced through `HEADER_ROW` and `DATA_START_ROW`.
- Raw Data preflight and PMR/header helpers are used before Demo P processing.
- Master List replacement uses a staged-sheet promotion pattern, which protects the existing Master List from failed rebuilds.
- Disenrollment move paths copy selected rows to Disenrolled Exclusion before changing Demo P retained rows.
- Archive/local-delete path avoids deleting raw source when archive copy fails.

### Realistic risks

- Monthly Change report history is additive under the clarified workflow; same-month reruns should retain the old generated report and create a unique new report.
- Header/schema changes remain high-impact because Raw Data, Demo P, sync, Master List, Monthly Change, and Disenrollment all depend on shared header names and PMR normalization.
- Index can become stale after manual sheet changes if no explicit workflow rebuilds it and the inert deferred-refresh path remains unresolved.

Recreatable generated outputs are not treated as irreplaceable data.

## 9. Trigger and Concurrency Report

The script uses a document lock and workflow busy property in `runWithWorkflowBusyFlag_()`, which is proportionate for a workbook used by one primary user and two trusted occasional users. The `doGet()` restore route also uses a document lock. This is appropriate; no enterprise orchestration is needed.

Findings are limited to Index refresh behavior: the code contains deferred Index-refresh consumption but no current setter or installable trigger creation path. If automatic Index refresh is still an approved feature, implement it narrowly and ensure duplicate prevention. If it is no longer approved, document it as intentionally manual/explicit.

## 10. Error Handling and Logging Review

### Strengths

- Core validation failures throw and stop processing.
- Timing wrappers preserve error details in runtime/framework timing reports.
- Archive-source deletion is blocked when archive copy fails.
- Non-critical formatting/styling failures are usually downgraded to best-effort warnings rather than breaking workflows.
- Locks are released in `finally` blocks.

### Weaknesses

- Some cleanup catch blocks intentionally suppress secondary failures. This is acceptable for harmless cleanup, but diagnostic quality is uneven.
- Monthly Change same-month reruns should be validated to confirm previous reports are retained and unique names are assigned.
- Inert deferred Index-refresh state makes concurrency/timing cleanup harder to reason about than necessary.

No broad logging expansion is recommended.

## 11. Maintainability and Architecture Review

The current implementation remains consistent with the approved single-file architecture. It uses dashboard-driven formatting, dashboard-controlled templates, template-first sheet creation, centralized row/header constants, batch and in-memory processing patterns, and public-vs-internal naming conventions.

Maintainability issues are real but not blockers:

- Helper, template, Dashboard Quality, and Master List sections are broad.
- Template functions mix template lifecycle and source/report formatting concerns.
- Master List functions mix production report generation with Index/archive/web restore concerns.
- Some menu callbacks point directly at underscore-suffixed functions.
- Configuration ownership spans constants, dashboard rows, document properties, sheet metadata, and manifest.

Do not split the production script into multiple files. Use inventories, ownership maps, and small dependency-reviewed corrections.

## 12. Prioritized Remediation Plan

### Phase A — Confirmed correctness defects

No Critical or High correctness defect was confirmed. MLF-002 is superseded by the clarified additive Monthly Change report-history rule.

### Phase B — Broken dependencies and runtime stability

1. Resolve MLF-001: either implement the missing Index deferred/trigger path or document/remove the inert deferred-refresh pathway.
2. Confirm web-app restore remains an intended supported route and document deployment/configuration expectations proportionately.

### Phase C — Material performance improvements

1. Use Framework Timing evidence to confirm whether Index rebuild or template refresh is a practical bottleneck.
2. If needed, coalesce repeated Index refreshes during batch workflows only after resolving MLF-001.

### Phase D — Orphan and duplicate cleanup

1. Classify the 51 no-static-path candidates as retained compatibility, dynamic/uncertain, probable orphan, or confirmed orphan.
2. Remove only confirmed orphans and only after menu/string/property/workbook dependency review.

### Phase E — Maintainability cleanup

1. Add a v1.7.6 configuration ownership inventory.
2. Add submodule ownership notes for Template, Master List, Dashboard Quality, and Helper sections.
3. Optionally align underscore-suffixed menu callbacks to public wrappers while retaining compatibility aliases.

## 13. Focused Regression Test Plan

Run only when the related remediation is implemented:

| Remediation | Focused tests |
| --- | --- |
| MLF-001 Index refresh path | Create/delete a non-critical sheet, run the intended trigger or deferred path, confirm one Index rebuild, verify no duplicate trigger behavior. |
| MLF-002 Monthly Change additive history | Run Monthly Change twice for the same month; confirm the first report remains, a unique second report appears, and Index refresh includes both. |
| Orphan cleanup | For each removed function, run targeted menu/workflow/dashboard search plus the workflow that previously owned the candidate. |
| Menu callback wrapper alignment | Open workbook, verify menu construction, run Hide/Show System Sheets, confirm no callback missing error. |
| Configuration ownership changes | Verify archive ID prompt, Index restore URL prompt, template signatures, timing toggle, and dashboard defaults still read/write expected storage. |

## 14. Final Conclusion

**Approved with minor remediation.**

The review found no Critical or High defect in v1.7.6 for the stated private, low-user-count operating model. The framework remains production-ready with minor remediation recommended for Index refresh/deferred-trigger consistency, additive Monthly Change history validation, and dependency-reviewed orphan/maintainability cleanup. No rebuild, enterprise assurance expansion, broad security hardening, or production-script modularization is recommended.
