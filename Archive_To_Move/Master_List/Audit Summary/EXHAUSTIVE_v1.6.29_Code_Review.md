# Master List Framework v1.6.29 — Exhaustive Code Review

Reviewed artifact: `Master_List/Current Production Script/v.1.6.29_Current_Production_Script`  
Supporting reports reviewed: Dashboard Quality, Framework Timing, Google Apps Scripts Executions, static audit refresh.  
Function inventory companion file: `Master_List/Reports/EXHAUSTIVE_v1.6.29_Function_Inventory.csv`.

## 1. Executive Review Summary

| Item | Result |
|---|---|
| Overall health rating | **Conditional / action required** |
| Production readiness | **Not approved until critical performance and high-risk data-safety findings are remediated or explicitly accepted** |
| Library readiness | **Not ready as a clean Apps Script library API**; too many public globals/functions and no Master_List manifest found |
| Critical findings | 2 |
| High findings | 5 |
| Medium findings | 6 |
| Low findings | 2 |
| Highest-risk workflows | Create Disenrolled List; Update Demo P Monthly Sync; Format Raw Data / monthly raw formatting; System Setup with smoke validation |
| Primary bottlenecks | `deleteRows()` against Demo P row sets; fast-canvas Raw Data creation; monthly CP/Unlocked output creation; Dashboard Quality section H-N write |
| Primary maintainability concerns | 686-function monolithic artifact, 122 functions with no static path from supported entry points, broad public namespace, legacy compatibility surfaces |
| Recommended next action | Fix destructive-row performance paths first, then add a Master_List `appsscript.json`, then reduce public API surface/orphan ambiguity |

### Conclusion

**Not approved until critical findings are corrected.** Runtime reports show completed workflows and passing Dashboard Quality sections, but the v1.6.29 runtime evidence also reports critical performance failures in destructive workflows. The code has strong batching patterns in many areas, but the two largest operational paths still exceed acceptable runtime and risk timeout/partial-completion behavior.

---

## 2. Repository and File Inventory

| File / Area | Type | Purpose | Production / Support Status | Notes |
|---|---|---|---|---|
| `Master_List/Current Production Script/v.1.6.29_Current_Production_Script` | Google Apps Script JS artifact | Master List production workflow implementation | Production source reviewed | 15,788 lines; 686 top-level functions; no duplicate top-level functions detected |
| `Master_List/Current Production Script/v.1.6.28_Current_Production_Script` | Google Apps Script JS artifact | Prior production script | Historical baseline | Retain for rollback/version history; do not treat as current |
| `Master_List/Reports/v1.6.29 - Dashboard Quality Report.pdf` | PDF report | Runtime dashboard quality | Supporting evidence | Shows framework health and template validation passing but performance summary failing |
| `Master_List/Reports/v1.6.29 - Framework Timing Report.pdf` | PDF report | Runtime timing and performance | Supporting evidence | Shows critical/bottleneck workflow timings |
| `Master_List/Reports/v1.6.29 - Google Apps Scripts Executions.pdf` | PDF report | Apps Script execution history | Supporting evidence | Shows menu/trigger executions completed; many index trigger invocations |
| `Master_List/Reports/AUDIT_v1.6.29_Static_Audit_Refresh.md` | Markdown report | Static audit summary | Supporting evidence | Supersedes v1.6.28 stale missing-callback report |
| `Master_List/Reports/EXHAUSTIVE_v1.6.29_Function_Inventory.csv` | CSV report | Generated function inventory | New audit artifact | Contains every top-level function with callers/dependencies/services/side-effect hints |
| `General/Scripts/Build_CP_Aide_Template` | Apps Script utility | General template builder | Supporting/general script | Not part of Master_List production runtime |
| `General/Scripts/Full_Format_Extractor` | Apps Script utility | Format extraction utility | Supporting/general script | Not part of Master_List production runtime |
| `Master_List/**/appsscript.json` | Manifest | Apps Script manifest | **Missing** | No Master_List manifest found locally |

Missing files for complete deployment review: **Master_List `appsscript.json` manifest**. The script may still be container-bound in Apps Script, but repository review cannot verify OAuth scopes, advanced services, timezone, runtime version, or deployment settings.

---

## 3. Function and Dependency Inventory

A complete machine-generated function inventory is provided in:

`Master_List/Reports/EXHAUSTIVE_v1.6.29_Function_Inventory.csv`

Summary:

| Metric | Count |
|---|---:|
| Top-level functions | 686 |
| Unique top-level function names | 686 |
| Duplicate top-level function declarations | 0 |
| Menu callback strings missing matching functions | 0 |
| Functions with destructive/write operation hints | 112 |
| Functions without a static path from supported entry points/string refs | 122 |

Public/API classification summary:

| Classification | Examples / Notes |
|---|---|
| Supported menu/admin functions | `onOpen`, `setupSystemSheets`, `createIndexSheet`, `formatMonthlySheets`, `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `createDisenrolledList`, `createMasterList`, `buildMonthlyChangeReport`, quality/report functions |
| Trigger handlers | `handleSpreadsheetChangeForIndex` |
| Diagnostic functions | Dashboard Quality, Framework Smoke Validation, Timing report writers |
| Internal helpers | Most underscore-suffixed functions |
| Accidental public surface | Any non-underscore helper is public in Apps Script; many such functions appear internal by behavior |
| Removal candidates | See Section 8; do not remove without consumer verification |

---

## 4. Complete Findings Register

| ID | Severity | Confidence | Category | File / Function | Description | Evidence | Impact | Recommended correction | Breaking-change risk | Testing required |
|---|---|---|---|---|---|---|---|---|---|---|
| EXH-001 | Critical | Confirmed defect | Performance / destructive workflow | `createDisenrolledList` → `moveDisenrolledPMRsFromDemoPToExclusion_` → `deleteRowNumberBatches_` | First large disenrollment run took 424.532s / 421.715s in the copy/delete step. | Framework Timing report lines show `Create Disenrolled List` CRITICAL and 719 copied/removed rows. Code deletes Demo P rows through `deleteRowNumberBatches_`. | Timeout/partial completion risk in a destructive workflow; slow enough to exceed Apps Script practical limits. | Replace large delete path with one bulk retained-row rewrite or fewer contiguous deletion operations; add pre/post row-count validation and rollback-safe markers. | Medium; business logic preserved if output rows and exclusion append are identical. | Copied workbook with 0, 8, 719+, and >1,000 disenrolled rows. |
| EXH-002 | Critical | Confirmed defect | Performance / destructive workflow | `updateDemoPMonthlySync` | Monthly sync deleted 74 rows from Demo P and took 242.346s for the delete step, 262.766s total. | Timing report identifies `Cleared Monthly Change PMRs from Demo P only` as CRITICAL. | Timeout/partial completion risk after rows are removed but before fresh rows are appended. | Avoid row deletion for PMR replacement; rebuild retained rows + fresh rows in memory and write Demo P body once. | Medium; careful ordering needed to preserve Demo P row order/contact flattening. | Monthly Change sync with small/medium/large PMR sets; interruption simulation after clear/delete. |
| EXH-003 | High | Confirmed defect | Deployment dependency | Master_List project | No `appsscript.json` found under `Master_List`. | Repository search found no Master_List manifest. | Cannot verify scopes, timezone, V8 runtime, advanced services, library settings, or deployment compatibility. | Add/export Master_List `appsscript.json` or document that production is container-bound and manifest is intentionally external. | Low if additive. | Manifest validation and Apps Script save/deploy test. |
| EXH-004 | High | Conditional risk | Data integrity | `formatRawData`, `formatMonthlyRawDataSheetFromSource_` | Raw Data source/import sheet is deleted after output creation when output is separate and workbook has more than one sheet. | Code calls `ss.deleteSheet(sourceSheet)` after creating output. | If active/source sheet is wrong, imported source can be removed. User policy says Raw Data is protected as valid source for some workflows; this must be clearly scoped. | Require explicit raw-import sheet validation by sheet type/name/header signature before delete; optionally archive instead of delete. | Medium; behavior may be intentional. | Run in copied workbook with wrong active sheet, template active, existing output, and source/output same sheet. |
| EXH-005 | High | Probable defect | Runtime stability / side effects | `setupSystemSheets` | Setup now initializes sheets/triggers and then runs smoke validation. If smoke fails, setup has already made side effects but reports failure. | `setupSystemSheets()` calls `initializeSystemSheets_()`, `setupIndexRefreshOnSheetAddedTrigger_()`, then `runFrameworkSmokeValidation()`. | System setup can partially complete and throw after trigger creation/system sheet mutation. | Wrap smoke validation as a reported setup sub-result or separate strict mode; do not fail the setup after irreversible setup actions unless intended. | Low/medium; menu behavior changes possible. | Smoke-pass and smoke-fail simulations. |
| EXH-006 | High | Confirmed defect | Dependency / dead path | `organizeWorkbookTabs_` | Function calls undefined `inferSheetTypeFromName_`. | Static scan found the call and no function definition. | If this function is called directly or by future wiring, it throws. | Replace with existing `getSheetTypeForOrganization_()` / normalize helper or define the missing helper. | Low if not public; medium because non-underscore function could be externally invoked. | Direct function execution test. |
| EXH-007 | High | Confirmed defect | Performance | `formatMonthlySheets`, Raw Data fast canvas | Monthly Raw Data fast canvas takes 35.779s and 42.125s; monthly formatting overall is BOTTLENECK. | Timing report shows Raw Data output creation bottlenecks for 04.26 and 05.26. | Repeated long formatting increases timeout risk in monthly workflow. | Profile filter creation, alternating colors, row heights, hidden-column operations; defer nonessential formatting or use metadata-only refresh where possible. | Low/medium. | Large Raw Data 5k/10k rows performance test. |
| EXH-008 | Medium | Conditional risk | Active-sheet dependency | `buildDemoPFromScratch`, formatters | Build Demo P falls back to `ss.getActiveSheet()` if current Raw Data lookup fails. | Code uses `getCurrentRawDataSheet_(monthParts) || ss.getActiveSheet()`. | User can run from wrong active tab and attempt Demo P build from non-Raw Data data. Preflight catches PMR headers but may still accept a similarly shaped wrong sheet. | Remove fallback or require positive Raw Data name/type/header signature. | Medium if users rely on fallback. | Active sheet negative tests. |
| EXH-009 | Medium | Confirmed risk | Trigger / concurrency | `handleSpreadsheetChangeForIndex` | Executions show many repeated index trigger runs in short intervals. | Apps Script executions report many `handleSpreadsheetChangeForIndex` completions. | Trigger churn adds noise and can overlap with long workflows. | Add workflow busy flag/debounce timestamp around bulk sheet creation/archive operations. | Low. | Bulk template/monthly formatting trigger test. |
| EXH-010 | Medium | Confirmed issue | Maintainability / API boundary | Whole script | 686 top-level functions in one artifact; broad public namespace. | Static inventory count. | Hard to reason about public API, orphan status, and consumer compatibility. | Define supported public API list; rename only with wrappers after approval. | High if public names are changed. | Consumer compatibility review. |
| EXH-011 | Medium | Confirmed issue | Orphan/dead code | Whole script | 122 functions have no static reachability path or string reference. Some may be public/legacy. | Generated inventory. | Dead code increases review surface and can hide stale behavior. | Mark as retained-public, deprecated, or removal-candidate after dynamic/library verification. | High for public functions. | Dynamic invocation and consumer search. |
| EXH-012 | Medium | Probable defect | Diagnostics / logging | Timing/quality reports | PDF-only runtime reports make automated regression comparison difficult. | Reports are PDFs; extraction required external Python library. | Hard to diff performance regressions and quality failures in CI. | Export CSV/JSON companion report sheets or commit text/CSV extracts. | Low. | Report export verification. |
| EXH-013 | Medium | Conditional risk | Formula injection | Index/report builders | Index formulas are constructed with sheet names and archive IDs. | `createIndexSheet` creates HYPERLINK formulas. | Formula injection risk is low because sheet names are internal, but imported/user-created sheet names can include special characters. | Sanitize formula labels/targets or use rich text links where available. | Low. | Sheet names beginning with `=`, `+`, `-`, `@`. |
| EXH-014 | Low | Documentation issue | Project structure | Master_List | Project has `Current Production Script` not README-documented `Current_Production`. | Repository README describes `Current_Production`; project uses a space-containing folder. | Tooling/user confusion. | Add project README documenting actual active path. | None. | Documentation review. |
| EXH-015 | Low | Maintainability issue | General scripts | `General/Scripts/*` | Utility scripts added without clear relation to Master_List production release. | Files exist under General. | Scope ambiguity in release review. | Add short README or header explaining non-production status. | None. | Documentation review. |

---

## 5. Public Library API Report

The script is not library-ready as a clean public API boundary. Apps Script exposes all top-level functions, and this artifact contains hundreds of top-level functions. Menu functions are stable and present, but many non-underscore functions appear operationally internal.

Recommended supported API boundary:

- **Menu/admin:** `onOpen`, `setupSystemSheets`, `quickSystemSetup`, `quickBuildAllTemplates`, `createIndexSheet`, `clearDiagnosticsAndTimingLogs`, `toggleFrameworkTiming`.
- **Quality/diagnostics:** `runDashboardQualityStartUp`, `runDashboardQualityValidateTemplates`, `runDashboardQualityFull`, `runFrameworkSmokeValidation`.
- **Format/process workflows:** `formatMonthlySheets`, `formatBannerReport`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `formatRawData`, `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `createDisenrolledList`, `createMasterList`, `buildMonthlyChangeReport`.
- **Trigger handlers:** `handleSpreadsheetChangeForIndex`.

All other public-looking functions should be classified as retained compatibility wrappers, deprecated functions, or internal helpers with approved wrappers.

---

## 6. Orphan and Duplicate Code Report

Confirmed:

- No duplicate top-level function declarations.
- No missing menu callbacks detected.
- One undefined helper call was detected in an apparently orphaned public function: `inferSheetTypeFromName_` inside `organizeWorkbookTabs_`.

Potential orphan/deprecated areas:

- Legacy template-specific helpers such as direct Demo P/Master List template builders appear superseded by dashboard-driven template creation.
- Several diagnostic/timing aliases may be compatibility wrappers.
- A full list of suspected no-static-path functions is in `EXHAUSTIVE_v1.6.29_Function_Inventory.csv` and must not be deleted without dynamic/public consumer verification.

---

## 7. Performance Report

### Runtime evidence

| Workflow | Runtime / finding | Priority |
|---|---:|---|
| Create Disenrolled List | 424.532s first large run; copy/delete step 421.715s | Critical |
| Update Demo P Monthly Sync | 262.766s; delete step 242.346s | Critical |
| Format Monthly Sheets 04.26 | 105.621s; Raw Data canvas 35.779s | Bottleneck |
| Format Monthly Sheets 05.26 | 122.713s; Raw Data canvas 42.125s | Bottleneck |
| Build Monthly Change Report | 46.392s | Slow |
| Dashboard Quality Workflow | 23.693s with slow H-N write | Slow |

### Primary optimization recommendations

1. Replace row deletion in Demo P destructive flows with retained-row array rewrite for large removal sets.
2. Add threshold behavior: if rows-to-delete > N or delete runs > M, rewrite the body instead of calling `deleteRows()` repeatedly.
3. Batch all post-delete formatting/row-height operations after data writes.
4. Add trigger debounce/busy flag during workflows that create/delete many tabs.
5. Export timing details in CSV/JSON for stable regression tracking.

---

## 8. Data Integrity Risk Report

High-risk operations reviewed:

| Operation | Risk | Current protection | Recommendation |
|---|---|---|---|
| Demo P disenrollment row deletion | Deletes rows from operational Demo P | Header checks and row batching | Add pre/post PMR counts and rewrite strategy for large deletes |
| Monthly sync PMR row deletion | Deletes changed PMR rows before appending replacements | Raw Data read happens after delete | Validate Raw Data and fresh rows before deleting old Demo P rows |
| Raw Data import deletion | Deletes source import sheet after output creation | Guards source/output IDs and workbook sheet count | Add stronger source-type validation or archive option |
| Sheet replacement helpers | Delete/copy sheets | Some protected-name parameters | Centralize protected-sheet policy |
| Report/index clearContent/clearFormat | Clears system reports | Targeted system sheet names | Acceptable if sheet resolution remains strict |

---

## 9. Trigger and Concurrency Report

Triggers/menu entry points reviewed:

- `onOpen` menu wiring: callbacks present.
- `setupIndexRefreshOnSheetAddedTrigger_`: prevents duplicate handler creation by handler/event type.
- `handleSpreadsheetChangeForIndex`: uses document lock and sheet signature.

Risks:

- Executions show repeated index trigger runs during workbook operations.
- Long-running workflows that delete/create sheets can interleave with index rebuilds.
- Most major menu workflows do not appear globally locked, so users can start overlapping destructive workflows.

Recommendations:

1. Add a document-property workflow busy flag during `formatMonthlySheets`, `updateDemoPMonthlySync`, `createDisenrolledList`, and template rebuilds.
2. Make index trigger skip while busy flag is set.
3. Add menu-entry lock wrappers for destructive workflows.

---

## 10. Error Handling and Logging Review

Strengths:

- Major workflows write timing on error and rethrow.
- Dashboard quality and smoke validation provide visible status.
- Missing PMR headers now produce clearer accepted-header messages.

Weaknesses:

- Some best-effort warnings continue after skipped formatting/validation; acceptable for formatting but not for schema-critical destructive paths.
- Setup can throw after creating sheets/triggers if smoke validation fails.
- PDF reports are difficult to diff programmatically.

---

## 11. Security and Authorization Review

- No API keys or tokens were identified in the reviewed Master_List production script.
- Archive spreadsheet ID is a hard-coded identifier and should be documented as configuration, not secret.
- No Master_List manifest was present, so OAuth scopes and runtime settings cannot be verified.
- Index formulas should be hardened against formula-injection-style sheet names.

---

## 12. Remediation Plan

### Phase A — Critical correctness and data safety

- Reorder monthly sync to validate Raw Data/fresh rows before deleting old Demo P rows.
- Add lock/busy flag for destructive workflows.
- Add pre/post row and PMR count assertions.

### Phase B — Missing dependencies and runtime stability

- Add or replace `inferSheetTypeFromName_` in `organizeWorkbookTabs_`.
- Add/export `Master_List/appsscript.json`.
- Make setup smoke validation report status without leaving ambiguous partial failure.

### Phase C — Performance improvements

- Rewrite Demo P deletion paths using retained-row bulk writes for large deletion sets.
- Profile Raw Data fast-canvas formatting operations.
- Add trigger debounce during bulk sheet operations.

### Phase D — Duplicate and orphan cleanup

- Review the 122 no-static-path functions from the CSV.
- Tag functions as supported public API, compatibility, deprecated, or removal candidates.

### Phase E — Public library API cleanup

- Publish an explicit API boundary.
- Preserve wrappers for public menu/library consumers.

### Phase F — Maintainability and documentation

- Add Master_List README with active production path and deployment expectations.
- Add machine-readable timing/quality exports.
- Document General script utilities as non-production support scripts.

---

## 13. Test Plan

### Static checks

- `node --check` on a `.js` copy of the production script.
- Duplicate top-level function scan.
- Menu callback existence scan.
- Undefined helper scan.

### Spreadsheet integration tests

1. Run System Setup in a copied workbook.
2. Run Framework Smoke Validation separately.
3. Rebuild templates.
4. Validate templates.
5. Build Index and confirm Demo P, Monthly Change, Master List, Imported Data, and templates appear in correct sections.
6. Format Raw Data and verify alternate colors, headers, dates, and source-sheet deletion/archive policy.

### Destructive workflow tests

1. Create Disenrolled List with 0, 1, 8, 719, and >1,000 disenrolled rows.
2. Confirm Raw Data remains unchanged for disenrollment.
3. Confirm Demo P row removal matches PMR set exactly.
4. Confirm Disenrolled Exclusion receives expected primary rows.
5. Run Monthly Sync with Raw Data missing, wrong headers, zero changed PMRs, and 92+ changed PMRs.

### Performance tests

- Capture timing for all workflows against 1k, 5k, and 10k Raw Data rows.
- Record delete-run counts and compare deleteRows vs retained-row rewrite.

### Concurrency tests

- Attempt duplicate menu execution from two users.
- Trigger index rebuild during monthly formatting.
- Interrupt after delete-before-append simulation.

---

## 14. Second-pass Verification Checklist

| Requirement | Result |
|---|---|
| Source file reviewed | Complete for v1.6.29 production artifact |
| Supporting reports reviewed | Complete for available v1.6.29 reports |
| Every top-level function inventoried | Complete in CSV |
| Menu callbacks checked | Complete; no missing callbacks |
| Destructive operations reviewed | High-risk operations identified |
| Trigger review completed | Completed for available trigger functions/reports |
| Manifest reviewed | Not possible; Master_List manifest missing |
| Critical/high findings have evidence | Yes |
| Recommendations preserve business logic | Yes; optimization recommendations preserve intended data flow |
| Library compatibility considered | Yes; public API sprawl flagged |

Final conclusion: **Not approved until critical findings are corrected.**
