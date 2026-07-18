# Master List v1.7.4 Exhaustive Review Validation and Remediation Plan

- Validation date: 2026-07-18
- Repository root: `/workspace/CodeLab`
- Current branch at startup: `work`
- Governing production source: `Master_List/Current Production Script/v.1.7.4_Current_Production_Script`
- Exhaustive review results validated: `Master_List/Audit_Summary/EXHAUSTIVE_CODE_REVIEW_v1.7.4.md`
- Supporting report requested but not present on the working branch: `Master_List/Previous Audits/EXHAUSTIVE_REMEDIATION_VALIDATION_WAVES_2_8_v1.6.84.1.md`
- Supporting report availability: the requested Previous Audits report is visible in `origin/main`, but the repository sync tool did not merge/rebase because `work` has a local commit and is behind `origin/main`.
- Supporting reference directory reviewed: `Master_List/v2_Framework_Reference/`
- Scope: validation, consolidation, prioritization, and remediation planning only. No production code was modified.

## Startup and Artifact Verification

| Check | Result | Evidence / note |
|---|---|---|
| Repository root | Confirmed | `/workspace/CodeLab` |
| Current branch/status/remote | Confirmed | Startup command reported branch `work`, remote `https://github.com/tabs912/CodeLab.git`, and a clean tracked tree except the existing audit commit history. |
| Synchronization | Partially complete | `./Framework/tools/sync_workspace.sh` fetched remote refs but did not merge/rebase because `work` is ahead by 1 local commit and behind `origin/main` by 4 commits. |
| Exhaustive review results | Confirmed visible | `Master_List/Audit_Summary/EXHAUSTIVE_CODE_REVIEW_v1.7.4.md` |
| Governing production source | Confirmed visible | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` |
| Requested previous audit report | Missing locally; visible remotely | Missing on current branch at `Master_List/Previous Audits/...`; visible in `origin/main` and read through `git show`. |
| Framework reference reports | Confirmed visible | `Master_List/v2_Framework_Reference/` |
| Excluded areas | Honored | `Archive_To_Move/` was not used. |

## 1. Executive Remediation Summary

| Metric | Count |
|---|---:|
| Findings reviewed from completed exhaustive review | 25 |
| Confirmed | 8 |
| Partially confirmed | 4 |
| Already corrected | 0 |
| Outdated | 0 |
| Not confirmed | 1 |
| Requires runtime evidence | 4 |
| Requires user decision | 2 |
| Optimization only | 3 |
| Documentation only | 3 |

Highest-priority risks are: (1) existing Master List deletion before validated replacement, (2) unescaped `doGet` HTML output from request/error data, (3) archive/raw/template destructive operations that should be staged or centrally guarded, and (4) manifest/governance drift that can cause deployment mistakes.

Recommended first remediation wave: **Wave 1 — Critical correctness and data safety**.

Recommended next production version: **v1.7.5** for the first implementation wave, because the planned changes are corrective/data-safety changes on top of v1.7.4 and should not overwrite the existing production snapshot.

Implementation recommendation: **Ready to implement Wave 1 after user approval of destructive-workflow behavior changes.**

## 2. Validated Findings Register

| Finding ID | Original severity | Validated status | Current severity | Confidence | File | Function | Current evidence | Impact | Recommended action | Remediation wave | Breaking-change risk | Required tests |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ML-CR-001 | Critical | CONFIRMED | Critical | High | Current Production Script | `createMasterListForMonth_` | The function locates an existing Master List, prompts the user, deletes it with `ss.deleteSheet(masterSheet)`, and only then creates/populates the replacement sheet. | Failed template creation, header copy, data copy, sync, formatting, or write after deletion can leave no prior Master List. | Replace delete-first flow with staged replacement: create temporary sheet, validate headers/data/dimensions, then archive/rename/delete old sheet after successful build. | Wave 1 | Low to medium; preserves public function but changes replacement timing. | Existing sheet cancel/replace; template missing; write failure; zero rows; successful replacement. |
| ML-CR-002 | Critical | CONFIRMED | Critical | High | Current Production Script | `doGet` | `targetSheetName` is read from request parameters and concatenated into `HtmlService.createHtmlOutput`; `err.message` is also concatenated into error HTML. | Crafted query parameters or error text can inject HTML/script in web-app output. | Add a small HTML-escape helper and escape request-derived and error-derived values before composing HTML. | Wave 1 | None expected. | Web app restore with `<`, `>`, quotes, ampersands; failure path error escaping. |
| ML-CR-003 | Critical | PARTIALLY CONFIRMED | High | High | Current Production Script | `deleteSheetIfExists_`, `archiveRawSourceAndDeleteLocal_`, `archiveRawDataSheet_`, `deleteArchiveSheetIfExists_`, template/report builders | Current code has some guards, such as protected names and single-sheet checks, but still deletes local/archive sheets and clears/replaces archive sheets in multiple places without one centralized staged/rollback guard. | Wrong target or mid-workflow failure can remove local or archive data. | Centralize destructive operation validation and staging for sheet replace/archive/delete helpers. | Wave 1 | Medium; destructive timing changes require approval. | Protected sheet, only-sheet workbook, duplicate archive name, archive copy failure, local delete flag on/off. |
| ML-CR-004 | Critical | PARTIALLY CONFIRMED | Medium | Medium | Manifests/docs | `appsscript.json` | Current-production manifest has empty dependencies; project-level manifest declares Advanced Sheets. Static scan of the production script did not confirm `Sheets.` advanced-service usage in executable code, so this is manifest/governance drift unless runtime/deployment evidence requires Sheets API. | Wrong manifest can confuse deployment and authorization review. | Choose one governing manifest; remove/align the other or document which manifest deploys v1.7.4/v1.7.5. | Wave 6 unless runtime requires Sheets | Potential deployment compatibility risk. | Manifest deploy smoke test; search for live Advanced Sheets usage; authorization review. |
| ML-HI-002 | High | PARTIALLY CONFIRMED | Medium | Medium | Current Production Script | `runFrameworkTimed_`, menu/admin workflows | `runFrameworkTimed_` routes callbacks through `runWithWorkflowBusyFlag_`, but `onOpen` exposes some public functions that may not all be destructive or may not all visibly require locking. | Remaining direct/admin/diagnostic workflows can overlap if they perform writes outside the wrapper. | Build entry-point matrix; require the lock wrapper for destructive/create/delete/copy/clear workflows only. | Wave 3 | Low if wrapper behavior and messages stay stable. | Concurrent monthly update, template build, archive, index restore; diagnostic-only functions should remain non-blocking if safe. |
| ML-HI-003 | High | REQUIRES USER DECISION | Medium | High | Current Production Script | Top-level function surface | The script declares 661 functions and Apps Script library consumers can call top-level declarations; no explicit public API boundary is enforced in code. | Consumers can depend on accidental internals; renaming/removing helpers can break external users. | Approve/document supported public API before renaming/removing or hiding internals. | Wave 5 / Wave 6 | High if consumers already call internals. | Library/host compatibility scan; menu callback verification; dynamic function-name string scan. |
| ML-HI-004 | High | CONFIRMED | Medium | High | Current Production Script | `doGet` | `lock.tryLock(15000)` is conditional, but `lock.releaseLock()` is called unconditionally in `finally`. | Busy/no-lock path may produce spurious lock-release errors and obscure diagnostics. | Track `lockAcquired` and release only after successful acquisition. | Wave 1 | None expected. | Busy request; successful restore; thrown restore error. |
| ML-HI-005 | High | CONFIRMED | High | High | Current Production Script | `validateActiveBannerFormatterOutput`, `formatRawData`, row tools | `validateActiveBannerFormatterOutput` and `formatRawData` use `SpreadsheetApp.getActiveSheet()`, and row/sort tools also operate on active context. | Wrong active sheet can validate/format/archive/update unintended data. | Add sheet-type/header/month validation before active-sheet writes; keep UI-bound entry points but fail closed. | Wave 2 | Low; public entry points remain. | Active system sheet, template sheet, wrong month sheet, valid raw sheet. |
| ML-HI-006 | High | CONFIRMED | High | High | Current Production Script | `runMonthlyUpdate` | Workflow sequentially builds Monthly Change Report, updates Demo P, updates Disenrolled, creates Master List, then index/sort. | A failure after one phase can leave partial monthly output state. | Add preflight validation for all prerequisites before phase mutations and produce failure checkpoint diagnostics. | Wave 2 | Medium; orchestration behavior changes. | Failure injection after each phase; rerun after partial execution. |
| ML-HI-007 | High | DOCUMENTATION ONLY | Low | High | README/manifests | Project governance | Project README manifest note is stale relative to committed manifests. | Reviewers may follow stale deployment governance. | Update README manifest strategy after user decides governing manifest. | Wave 6 | None unless manifest files change. | Documentation review. |
| ML-MD-001 | Medium | OPTIMIZATION ONLY | Medium | Medium | Current Production Script | Dashboard Quality writers | Dashboard Quality section saving writes properties and sheet sections; flushing staged sections batches some writes, but full workflow runtime still requires spreadsheet-scale testing. | Large reports may run slowly. | Profile before changing; batch section writes where safe. | Wave 4 | Low. | Large Dashboard Quality full run; compare section output. |
| ML-MD-002 | Medium | OPTIMIZATION ONLY | Medium | High | Current Production Script | Template/output builders | Template workflows use `copyTo`, formatting, row/column sizing, and value writes. | Quota/time risk on large templates. | Optimize only after correctness fixes; preserve template visual behavior. | Wave 4 | Medium if formatting changes alter outputs. | Template visual regression; large row-count timing. |
| ML-MD-003 | Medium | CONFIRMED | Medium | High | Current Production Script | Best-effort diagnostics | Multiple catches log warnings and continue for diagnostics/index/sort/report writes. | Failures may be hard to troubleshoot or may hide secondary output issues. | Standardize critical vs best-effort errors; include row counts, workflow, and recovery status. | Wave 6 | Low. | Failure injection for timing/report/index writes. |
| ML-MD-004 | Medium | CONFIRMED | Medium | Medium | Current Production Script | Cache/property helpers | Runtime caches and document properties are used for archive ID, timing flag, signatures, deferred index, QA section rows, and busy flags. | Hidden state can affect later execution or consumers. | Document property contract and clear/cache invalidation rules; validate property values before use. | Wave 3 / Wave 6 | Low. | Property missing/corrupt/stale; cache invalidation after sheet rename/delete. |
| ML-MD-005 | Medium | CONFIRMED | Medium | High | Current Production Script | Naming/public surface | Menu names, underscore helpers, public wrappers, and diagnostic functions are mixed in one top-level namespace. | Maintainers can confuse internal vs supported API; library cleanup is risky. | Publish API registry and group cleanup by compatibility. | Wave 5 / Wave 6 | High for removals/renames. | API registry review; consumer smoke test. |
| ML-MD-006 | Medium | REQUIRES RUNTIME EVIDENCE | Medium | Medium | Reports/tests | Test evidence | No current non-production destructive integration report was visible on the working branch for v1.7.4. | Release safety cannot be proven from static analysis alone. | Run and attach non-production spreadsheet integration tests before release. | Wave 1 readiness / Wave 6 reporting | None. | Full non-production integration suite. |
| ML-MD-007 | Medium | DOCUMENTATION ONLY | Low | High | Current Production Script | Properties/configuration | Archive spreadsheet ID and index restore URL are stored in document properties. | Deployment operators need property setup instructions. | Document required document properties and safe configuration steps. | Wave 6 | None. | Missing/invalid property setup tests. |
| ML-MD-008 | Medium | REQUIRES RUNTIME EVIDENCE | Medium | Medium | Current Production Script | Index restore | Restore URL behavior depends on deployed web-app URL and configured document property. | Bad deployment/configuration can create nonfunctional restore links. | Validate web deployment and property fallback in a test deployment. | Wave 3 / Wave 6 | Deployment behavior only. | Deployed URL, configured URL, no URL, restore link click. |
| ML-MD-009 | Medium | REQUIRES RUNTIME EVIDENCE | Medium | Medium | Current Production Script | Sheet output writers | Static review did not prove systematic formula injection escaping for all user-provided text. | If user text beginning with `=`/`+`/`-`/`@` is written as values, Sheets may interpret formulas in some contexts. | Test representative raw inputs; add formula-safe text handling only where values are user-controlled and intended as literal text. | Wave 2 / Wave 4 | Medium if transformations alter output text. | Formula-like names/notes/addresses; expected display preservation. |
| ML-LO-001 | Low | NOT CONFIRMED | No action | High | Current Production Script | Local sort helpers | The repeated `name_` and `dateRank_` declarations are nested inside separate functions, not duplicate top-level production declarations. | No runtime defect confirmed. | Close as no action; optionally leave as style note. | None | None. | Sort-order regression only if changed later. |
| ML-LO-002 | Low | REQUIRES USER DECISION | Low | High | Current Production Script | Whole script | The single-file structure is real, but splitting Apps Script files is an architecture/release-management decision. | Review/merge friction, not a correctness defect. | Defer unless user approves architecture/file-organization work. | Wave 6 or later | Medium; Apps Script load/global behavior must be preserved. | Full regression after any file split. |
| ML-LO-003 | Low | DOCUMENTATION ONLY | Low | High | README | Current version references | README references older current candidates rather than v1.7.4. | Documentation drift. | Update after version/governing manifest decisions. | Wave 6 | None. | Documentation review. |
| ML-LO-004 | Low | CONFIRMED | Low | High | Current Production Script | Diagnostic/test functions | Diagnostic and production workflow functions coexist in the same top-level file/menu surface. | Maintainability and public-surface ambiguity. | Tag/registry public, diagnostic, admin, and internal functions before any cleanup. | Wave 5 / Wave 6 | High if functions are removed/renamed. | Menu/API regression. |
| ML-LO-005 | Low | PARTIALLY CONFIRMED | Low | Medium | Current Production Script | Menu labels/comments | Some menu labels are broad but mostly understandable. | Minor user/maintenance ambiguity around destructive scope. | Clarify destructive labels/docs only after workflow behavior is approved. | Wave 6 | None. | UI/menu review. |
| ML-LO-006 | Low | NOT CONFIRMED | No action | High | Current Production Script | `enforceOperationalSheetSortOrder_`, `enforceGlobalSheetSortOrder_` | Nested helper names repeat in separate local scopes and do not create a top-level collision. | No functional impact. | Close as no action; do not rename solely for style. | None | None. | None unless future cleanup. |

## 3. Findings Rejected or Closed

| Finding ID | Closure category | Rationale |
|---|---|---|
| ML-LO-001 | Not confirmed / no action | The local helper-name repetition is scoped inside separate functions and does not create a duplicate top-level Apps Script function. |
| ML-LO-006 | Not confirmed / no action | Same root issue as ML-LO-001; no runtime or public API defect is supported by current code evidence. |
| ML-HI-007 | Documentation only | The issue is real but should be closed as code-remediation once manifest governance is decided; it does not require production code changes by itself. |
| ML-MD-007 | Documentation only | Property setup documentation is needed, but code behavior is not necessarily defective. |
| ML-LO-003 | Documentation only | README current-version notes are stale but do not affect runtime. |
| ML-MD-001 | Optimization only | Requires profiling before implementation; not a correctness defect. |
| ML-MD-002 | Optimization only | Requires timing/visual regression evidence before changing template operations. |

No finding was classified as already corrected or outdated against the current v1.7.4 production source.

## 4. Consolidated Root-Cause Register

| Root-cause ID | Related findings | Root cause | Affected workflows | Proposed correction | Risk | Test requirements |
|---|---|---|---|---|---|---|
| RC-01 | ML-CR-001, ML-CR-003 | Delete/clear/replace operations are distributed across workflow-specific helpers without a single staging and validation contract. | Master List replacement, archive raw data, archive monthly sheets, template rebuilds, report replacements. | Add shared destructive-operation preflight and staged replacement pattern where practical; update highest-risk workflows first. | Medium; sheet lifecycle changes must preserve user expectations. | Existing outputs, missing templates, archive copy failure, wrong target, rollback/rerun tests. |
| RC-02 | ML-CR-002, ML-HI-004, ML-MD-008 | Web restore endpoint mixes request handling, lock management, restoration, and direct HTML composition. | Index restore web app and archive restore links. | Escape HTML, track lock acquisition, validate deployment URL/property behavior. | Low to medium; no API signature change needed. | Malicious target strings, busy lock, restore success/failure, configured/auto URL. |
| RC-03 | ML-HI-002, ML-HI-006, ML-MD-004 | Workflow state and locking are centralized for timed workflows but not fully documented/mapped for all public/destructive entry points. | Monthly update, direct menu workflows, diagnostics, index refresh, property-based busy/deferred flags. | Build entry-point lock matrix; wrap destructive public functions; document property lifecycle. | Medium; avoid over-locking harmless diagnostics. | Concurrent runs, stale busy flags, deferred index refresh, property corruption. |
| RC-04 | ML-HI-005, ML-MD-009 | Several UI-bound workflows use active sheet/user-provided sheet data and need stronger validation before writes. | Raw Data formatting, active banner validation, row tools, literal text outputs. | Add fail-closed active-sheet/header/month checks; formula-like text tests before changing value handling. | Medium; must not alter approved output text. | Wrong active sheet, valid sheet, formula-like raw text, missing headers. |
| RC-05 | ML-HI-003, ML-MD-005, ML-LO-002, ML-LO-004 | Public API boundary is implicit because all functions live in one Apps Script top-level namespace. | Library consumers, menu callbacks, diagnostics, admin helpers. | Create public API registry and consumer verification checklist before renames/removals/file splits. | High for breaking changes. | Library host smoke test, dynamic/function-name string scan, menu callback scan. |
| RC-06 | ML-CR-004, ML-HI-007, ML-MD-007, ML-LO-003 | Governance/deployment documentation drift around manifests, version notes, and document properties. | Deployment, authorization, configuration, support handoff. | Decide governing manifest; update README/property docs; record required scopes/dependencies. | Low to medium depending on manifest decision. | Manifest deploy/authorization test and documentation review. |
| RC-07 | ML-MD-001, ML-MD-002, ML-MD-003, ML-MD-006 | Performance and diagnostics need runtime evidence and standardized reporting before optimization. | Dashboard Quality, template builds, timing reports, validation reports. | Profile non-production large data runs, then batch only proven bottlenecks; improve critical-vs-best-effort logging. | Low to medium. | Timing report comparison, large dataset, visual regression, failure injection. |

## 5. Prioritized Remediation Plan

### Wave 1 — Critical correctness and data safety

- Objective: prevent data loss and fix web output/lock defects that are confirmed in current code.
- Finding IDs resolved: ML-CR-001, ML-CR-002, ML-CR-003 (highest-risk subset), ML-HI-004.
- Files affected: `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` for a new v1.7.5 production copy.
- Functions affected: `createMasterListForMonth_`, `deleteSheetIfExists_`, `archiveRawSourceAndDeleteLocal_`, `archiveRawDataSheet_`, `deleteArchiveSheetIfExists_`, `doGet`, and any small new internal helpers needed for staging/HTML escaping.
- Dependencies affected: Spreadsheet sheets, archive workbook ID document property, web-app request parameters, `LockService`, `HtmlService`.
- Exact proposed changes: stage replacement sheets before deleting old outputs; add exact-target/protected-sheet/destructive-operation validation; HTML-escape `doGet` output values; release web lock only when acquired.
- Business-logic impact: intended outputs remain the same; failure behavior changes from delete-first/partial to fail-closed/staged.
- Breaking-change risk: low for APIs; medium for users expecting immediate delete/replace side effects.
- Data-integrity risk: remediation reduces risk, but must be tested in a copy of the workbook.
- Required tests: existing sheet replacement, template missing, archive duplicate, archive copy failure, busy web lock, malicious restoreTarget.
- Recommended version increment: v1.7.5.
- Independently implementable: Yes.
- Required user decisions: approve staged replacement/rollback semantics for destructive workflows.

### Wave 2 — Runtime stability and validation hardening

- Objective: prevent wrong-sheet and partial monthly workflow failures.
- Finding IDs resolved: ML-HI-005, ML-HI-006, ML-MD-009 (after runtime evidence if confirmed).
- Files affected: new v1.7.5 or v1.7.6 production script depending on Wave 1 scope.
- Functions affected: `runMonthlyUpdate`, `formatRawData`, `validateActiveBannerFormatterOutput`, active-row tools, monthly workflow preflight helpers.
- Dependencies affected: active sheet, expected sheet names/types, required headers, monthly date context, raw text fields.
- Exact proposed changes: add full preflight before mutations, validate active sheet type/header/month, and add literal-text handling only where tests prove formula risk.
- Business-logic impact: fail earlier with clearer messages; no intended calculation changes.
- Breaking-change risk: low to medium for users who currently run workflows from loosely selected sheets.
- Data-integrity risk: reduced.
- Required tests: wrong active sheet, missing headers, renamed headers, partial prior execution, formula-like input values.
- Recommended version increment: v1.7.6 if separate from Wave 1.
- Independently implementable: Mostly, but safest after Wave 1.
- Required user decisions: approve stricter validation/fail-closed behavior.

### Wave 3 — Trigger, concurrency, and public workflow safety

- Objective: ensure every destructive public/menu/web workflow has the minimum safe lock/property behavior.
- Finding IDs resolved: ML-HI-002, ML-MD-004, ML-MD-008.
- Files affected: production script and deployment notes.
- Functions affected: `onOpen` menu entries, `runFrameworkTimed_`, `runWithWorkflowBusyFlag_`, direct public destructive functions, `doGet`, property helpers.
- Dependencies affected: `LockService`, document properties, web deployment URL, index restore links.
- Exact proposed changes: create an entry-point matrix; route destructive public workflows through lock wrapper; document property lifecycle and stale-state recovery.
- Business-logic impact: overlapping destructive runs become blocked rather than interleaved.
- Breaking-change risk: low for function signatures; medium for workflow timing/user prompts.
- Data-integrity risk: reduced.
- Required tests: concurrent menu clicks, web restore while monthly update runs, stale busy property, URL configuration variants.
- Recommended version increment: v1.7.6 or v1.7.7.
- Independently implementable: Yes after Wave 1 web-lock fix.
- Required user decisions: approve which diagnostics should remain non-locking.

### Wave 4 — Performance improvements

- Objective: optimize only measured bottlenecks without changing business logic or visual formatting.
- Finding IDs resolved: ML-MD-001, ML-MD-002, possible ML-MD-003 logging overhead subset.
- Files affected: production script and timing reports.
- Functions affected: Dashboard Quality section writers, template builders, output formatting helpers, timing/report writers.
- Dependencies affected: Dashboard Quality sheet, Framework Timing sheet, template sheets, formatting configuration.
- Exact proposed changes: profile large runs; batch section replacements and formatting runs; cache dashboard/header/sheet lookups; reduce redundant copy/format calls only where signatures prove no change.
- Business-logic impact: none intended.
- Breaking-change risk: medium because visual formatting must remain exact.
- Data-integrity risk: low if output comparison is used.
- Required tests: large workbook timing before/after, visual formatting regression, row/column dimensions, conditional formatting.
- Recommended version increment: v1.7.7 or later.
- Independently implementable: Yes after safety fixes.
- Required user decisions: approve performance work only after correctness waves.

### Wave 5 — Duplicate, dead, orphan, and API cleanup

- Objective: reduce public-surface and cleanup risk without breaking library/host consumers.
- Finding IDs resolved: ML-HI-003, ML-MD-005, ML-LO-002, ML-LO-004.
- Files affected: production script and API registry/governance docs.
- Functions affected: all public/menu/admin/diagnostic/internal functions after inventory review.
- Dependencies affected: menu strings, function-name strings, trigger handlers, web handlers, possible library consumers.
- Exact proposed changes: publish API registry; identify external consumers; defer removals until approved; avoid renaming public functions without compatibility wrappers.
- Business-logic impact: none if registry-only; possible breaking changes if cleanup proceeds.
- Breaking-change risk: high for removals/renames/file splits.
- Data-integrity risk: low if no runtime changes.
- Required tests: menu callback scan, dynamic invocation scan, library host smoke tests, trigger list validation.
- Recommended version increment: documentation-only if registry; code cleanup should be separate minor version.
- Independently implementable: Registry yes; removals no without approval.
- Required user decisions: approve public API boundary and any removal/rename/file split.

### Wave 6 — Maintainability, diagnostics, and documentation

- Objective: close governance drift and improve operational support.
- Finding IDs resolved: ML-CR-004, ML-HI-007, ML-MD-003, ML-MD-006, ML-MD-007, ML-LO-003, ML-LO-005.
- Files affected: `Master_List/README.md`, manifest(s), production script diagnostic helpers if approved, validation reports.
- Functions affected: diagnostic/logging helpers, configuration functions, manifest-dependent deployment docs.
- Dependencies affected: `appsscript.json`, document properties, reports, release notes.
- Exact proposed changes: decide and document governing manifest; document archive/web URL/timing properties; standardize diagnostic severity; attach non-production validation reports.
- Business-logic impact: none intended.
- Breaking-change risk: low unless manifest dependencies/scopes change.
- Data-integrity risk: low.
- Required tests: documentation review, manifest deploy smoke test, property setup, timing/failure report review.
- Recommended version increment: docs-only if no code; code diagnostics changes should get a minor production version.
- Independently implementable: Yes, but manifest decision should precede deployment.
- Required user decisions: governing manifest and whether Advanced Sheets service is required.

## 6. User Decision Register

| Decision ID | Decision required | Why approval is required | Related findings | Recommended default |
|---|---|---|---|---|
| UD-01 | Approve staged replacement semantics for existing Master List and archive/template replacements. | Changes failure behavior and sheet lifecycle timing for destructive workflows. | ML-CR-001, ML-CR-003 | Approve for Wave 1. |
| UD-02 | Decide governing manifest and Advanced Sheets service requirement. | Current-production and project-level manifests differ. | ML-CR-004, ML-HI-007 | Use the manifest that matches the live Apps Script deployment; document it. |
| UD-03 | Approve stricter active-sheet validation. | Users may be accustomed to flexible active-sheet workflows. | ML-HI-005 | Approve fail-closed validation for destructive/write workflows. |
| UD-04 | Decide which public/admin/diagnostic workflows require locking. | Over-locking diagnostics can reduce usability; under-locking destructive workflows risks overlap. | ML-HI-002, ML-MD-004 | Lock destructive/create/delete/copy/clear workflows only. |
| UD-05 | Approve public API boundary before cleanup. | Apps Script library consumers may depend on accidental top-level functions. | ML-HI-003, ML-MD-005, ML-LO-004 | Registry first; no removals until consumers are verified. |
| UD-06 | Decide whether single-file structure should remain. | Splitting files is architecture work and can affect Apps Script load/global behavior. | ML-LO-002 | Defer. |
| UD-07 | Approve performance optimization after profiling. | Formatting/copy changes can alter visual output. | ML-MD-001, ML-MD-002 | Defer until Waves 1-3 complete and timing evidence exists. |

## 7. Test Plan

### Unit-like / pure-function tests

- HTML escaping helper: null, empty string, normal text, `<script>`, quotes, ampersands, apostrophes.
- Sheet-name validation helper: protected names, empty names, duplicate names, monthly naming variants.
- Date/month parsing helpers: invalid dates, serial dates, mixed date formats, month boundary cases.
- Header normalization/header-map helpers: missing, duplicate, renamed, and blank headers.
- Property parsing helpers: missing, malformed, stale, and expected values.

### Spreadsheet integration tests

- Run Wave 1 workflows in a copied non-production workbook with current templates, dashboard, raw imports, Demo P, Disenrolled, Master List, Index, Framework Timing, and Dashboard Quality sheets.
- Validate zero data rows, one data row, large row count, duplicate identifiers, blank identifiers, and duplicate PMRs.
- Validate missing required sheets and missing required headers fail before destructive writes.
- Validate existing destination sheet replacement produces a correct final sheet and preserves/recoverably handles prior sheet on failure.

### Regression tests

- Compare Master List row counts, headers, title rows, hidden rows, and key synced columns before/after Wave 1/Wave 2.
- Compare Monthly Change Report, Demo P update, Disenrolled Exclusion, and Index outputs for a known month.
- Verify menu entries still point to existing functions.
- Verify Dashboard Quality and Framework Timing reports still update.

### Destructive-operation tests

- Existing Master List replace: cancel, approve/success, approve/template missing, approve/write failure.
- Archive raw data: archive disabled, archive enabled/copy success, archive enabled/copy failure, delete-local flag on/off.
- Archive sheet duplicate: multi-sheet archive workbook, one-sheet archive workbook, protected/system sheet names.
- Template/report replacement: existing target, staged build failure, promoted staged build success.

### Trigger/concurrency tests

- Simulate concurrent monthly update and template build.
- Simulate concurrent web restore and menu workflow.
- Simulate stale busy flag/property and verify recovery messaging.
- Validate `onOpen`, `onEdit`, and `doGet` event objects/fallbacks.

### Library/host compatibility tests

- Confirm supported public API list with user/owner.
- Search menu strings, function-name strings, triggers, HTML callbacks, and external host calls before any cleanup.
- Run host spreadsheet smoke calls for documented public functions.

### Performance tests

- Large workbook Dashboard Quality full run timing before/after changes.
- Template rebuild timing for all templates with large row counts.
- Monthly update end-to-end timing with Framework Timing enabled and disabled.
- Capture Spreadsheet service call hot spots through timing steps and output counts.

### Report-validation tests

- Confirm Framework Timing records start, complete, failure, step counts, and row counts.
- Confirm Dashboard Quality records section timestamps and failure notes.
- Attach non-production validation report for Wave 1 before release.

## 8. Implementation Readiness Confirmation

| Readiness item | Status | Note |
|---|---|---|
| Current production source complete | Confirmed | Governing v1.7.4 script is visible and parseable by copied `.js` syntax check. |
| Required reports visible | Partially confirmed | Exhaustive review and v2 framework references are visible locally; requested Previous Audits report is visible in `origin/main` but not merged into `work`. |
| Project documentation visible | Confirmed | README, AGENTS, Framework specs, Master_List README/spec, and v2 references were reviewed. |
| Every critical/high finding has current evidence | Confirmed except runtime-only items | Critical/high items have current static evidence or are explicitly marked as user decision/runtime evidence. |
| Outdated findings removed | Confirmed | None were classified as outdated. |
| Duplicate findings consolidated | Confirmed | Root-cause register preserves original finding IDs. |
| Dependencies/callers traced | Confirmed at planning level | Full external consumer verification remains required before cleanup. |
| Public API compatibility evaluated | Confirmed at planning level | User approval required before API cleanup. |
| Destructive operations reviewed | Confirmed | Highest-risk destructive operations were validated against current code. |
| Required tests identified | Confirmed | See Test Plan. |
| No business logic changed | Confirmed | This artifact is report-only. |

## 9. Implementation Recommendation

**Ready to implement Wave 1 after user approval of destructive-workflow behavior changes.**

Do not implement Waves 2-6 until Wave 1 scope is approved and the governing manifest decision is recorded or explicitly deferred.

## 10. Current-Code Evidence Appendix

| Evidence ID | Finding(s) | Current source location | Code evidence validated |
|---|---|---|---|
| EV-01 | ML-CR-001 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 10663-10680 | Existing Master List lookup/prompt/delete happens before replacement sheet creation. |
| EV-02 | ML-CR-001 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 10680-10699 | Replacement sheet is created, headers/data are copied, rows are trimmed, data is synced/written, and templates are hidden after old-sheet deletion. |
| EV-03 | ML-CR-002 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 11291-11320 | `doGet` reads request parameters and returns HTML containing `targetSheetName` and `err.message` without escaping. |
| EV-04 | ML-HI-004 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 11300-11325 | Document lock is attempted conditionally but released unconditionally in `finally`. |
| EV-05 | ML-CR-003 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 6426-6448 | `deleteSheetIfExists_` has protected-name and only-sheet guards but still directly deletes the target sheet. |
| EV-06 | ML-CR-003 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 6545-6564 | Raw source archiving can delete the local raw sheet after archive handling. |
| EV-07 | ML-CR-003 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 6574-6588 and 6771-6784 | Archive replacement deletes or clears/renames an existing archive sheet before copying the new archive. |
| EV-08 | ML-HI-005 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 5687-5705 and 6987-6998 | Active-sheet workflows use `SpreadsheetApp.getActiveSheet()` before validation/formatting. |
| EV-09 | ML-HI-006 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 10488-10520 | Monthly update executes sequential mutating phases and only wraps final index/sort in a best-effort catch. |
| EV-10 | ML-HI-002 / ML-MD-004 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 15311-15330 and 15333-15355 | Timed workflows call `runWithWorkflowBusyFlag_`, which uses document lock and document-property busy state. |
| EV-11 | ML-MD-004 / ML-MD-007 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 15357-15374 | Busy and deferred index properties are written/deleted as hidden workflow state. |
| EV-12 | ML-HI-002 / ML-MD-005 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 2632-2701 | `onOpen` exposes many menu callbacks, requiring public entry-point compatibility and locking classification. |
| EV-13 | ML-LO-001 / ML-LO-006 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 11454-11525 | `name_` and `dateRank_` are nested local helpers in separate sort functions, so top-level duplicate risk is not confirmed. |
| EV-14 | ML-CR-004 | `Master_List/Current Production Script/appsscript.json` lines 1-12 and `Master_List/appsscript.json` lines 1-20 | Current-production manifest declares no dependencies, while project-level manifest declares Advanced Sheets service. |
| EV-15 | ML-MD-003 / ML-MD-006 | `Master_List/Current Production Script/v.1.7.4_Current_Production_Script` lines 14471-14501 | Dashboard Quality saves properties and catches/logs sheet-write errors rather than failing the caller. |
