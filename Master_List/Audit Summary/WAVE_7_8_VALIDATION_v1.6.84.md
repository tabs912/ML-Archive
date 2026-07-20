# Wave 7 / Wave 8 Validation — v1.6.84

Date: 2026-07-18  
Production artifact reviewed: `Master_List/Current Production Script/v.1.6.84_Current_Production_Script`

## Scope

This validation clears the locally testable Wave 7 and Wave 8 gates against the v1.6.84 production script. Binary PDFs were reviewed as inputs only:

- `Master_List/Audit_Summary/Wave 7 Test Plan.pdf`
- `Master_List/Audit_Summary/Wave 8 - Implementation Recommendation.pdf`

Workbook-execution tests that require a live copied Google Sheet, Google Apps Script runtime, user prompts, Drive permissions, installable triggers, or two simultaneous users remain deployment-environment tests and are listed separately below.

## Wave 7 Static / Repository Checks

| Gate | Result | Evidence |
| --- | --- | --- |
| JavaScript syntax check | PASS | `node --check /tmp/v1684.js` completed successfully after copying the production script to `/tmp/v1684.js`. |
| Duplicate top-level function scan | PASS | Static brace-depth scan found 154 top-level functions and no duplicate top-level function names. |
| Menu callback existence scan | PASS | 35 menu callbacks were found; all callbacks resolve to functions in the production script. |
| Trigger handler existence scan | PASS | No active `ScriptApp.newTrigger(...)` registrations were found in v1.6.84, so no missing trigger handlers are registered. |
| Legacy trigger cleanup scan | PASS | No references were found for `handleSpreadsheetChangeForIndex`, `setupIndexRefreshOnSheetAddedTrigger_`, `deleteLegacyOperationalAndDiagnosticSheets_`, or `isIndexTriggerRelevantSheetName_`. |
| Manifest validation | PASS | `Master_List/appsscript.json` parsed successfully with `python -m json.tool`. |
| No `Archive_To_Move/` dependency | PASS | No `Archive_To_Move` references were found in the v1.6.84 production script. |
| PR preparation | PASS | `./Framework/tools/prepare_pr.sh` reported the repository ready with only the intended text implementation artifact staged. |

## Wave 7 Unit-Like / Static Harness Coverage

| Area | Result | Evidence |
| --- | --- | --- |
| `deleteRowNumberBatches_()` availability | PASS | Function exists in v1.6.84 and is available for copied-workbook destructive row deletion tests. |
| Retained-row rewrite helper availability | PASS | `buildDemoPMonthlySyncRetainedRows_()` exists and is used by monthly Demo P sync before body rewrite. |
| Raw Data preflight validation availability | PASS | `validateRawDataPreflightForDemoP_()` exists and is called before creating active Demo P from Raw Data. |
| Monthly replacement coverage validation | PASS | `validateDemoPMonthlySyncReplacementCoverage_()` exists and is called before Demo P replacement writes. |

## Wave 7 Integration / Deployment Test Status

These Wave 7 tests require a copied workbook and Apps Script runtime. They are not valid to claim from this local container alone:

- System Setup execution in a copied workbook.
- Framework Smoke Validation execution in Apps Script.
- Template rebuild and template validation against a live spreadsheet.
- Raw Data, Demo P, Disenrolled Exclusion, Monthly Change, Banner, Care Plan, and Unlocked workflows against live sheet data.
- Destructive row deletion and retained-row rewrite tests with controlled spreadsheet fixtures.
- Installable trigger behavior, deferred Index rebuild behavior, and two-user duplicate execution simulation.
- Performance timing captures for 1k/5k/10k row datasets.

## Wave 8 Implementation Readiness Gates

| Wave 8 recommendation | Result | v1.6.84 evidence |
| --- | --- | --- |
| Validate Raw Data and replacement rows before Demo P row removal | PASS | `updateDemoPMonthlySyncForMonth_()` loads changed PMRs, validates Raw Data, builds fresh replacement rows, validates replacement coverage, then builds retained rows and writes the body. |
| Replace high-volume destructive deletion with retained-row rewrite / thresholded logic | PASS | Monthly Demo P sync uses retained-row rewrite through `buildDemoPMonthlySyncRetainedRows_()` and `writeDemoPMonthlySyncBody_()` instead of deleting matched rows one-by-one. |
| Add pre/post PMR and row-count validation | PASS | Replacement coverage validation is performed before Demo P body rewrite; retained/fresh row counts are logged through timing steps. |
| Strengthen Raw Data source validation | PASS | Demo P creation starts with `validateRawDataPreflightForDemoP_()` and monthly sync fails if the required Raw Data sheet is missing. |
| Resolve active-sheet fallback behavior | PASS | Demo P creation takes an explicit Raw Data sheet through preflight validation; monthly sync uses month-scoped sheet resolution and errors on missing required dependencies. |
| Missing Monthly Change hard stop | PASS | v1.6.84 aborts Update Demo P if the month-specific Monthly Change Report is missing. |

## Local Commands Run

```bash
python - <<'PY'
import re, pathlib, collections, json
p = pathlib.Path('Master_List/Current Production Script/v.1.6.84_Current_Production_Script')
source = p.read_text()
lines = source.splitlines()
level = 0
functions = []
for i, line in enumerate(lines, 1):
    match = re.match(r'function\s+([A-Za-z_$][\w$]*)\s*\(', line)
    if level == 0 and match:
        functions.append((match.group(1), i))
    level += line.count('{') - line.count('}')
counts = collections.defaultdict(list)
for name, line_no in functions:
    counts[name].append(line_no)
print(json.dumps({
    'top_level_function_count': len(functions),
    'duplicate_top_level_functions': {name: lines for name, lines in counts.items() if len(lines) > 1}
}, indent=2))
PY
```

```bash
python - <<'PY'
import re, pathlib, json
source = pathlib.Path('Master_List/Current Production Script/v.1.6.84_Current_Production_Script').read_text()
funcs = set(re.findall(r'^function\s+([A-Za-z_$][\w$]*)\s*\(', source, re.M))
callbacks = re.findall(r'\.addItem\([^,]+,\s*["\']([^"\']+)["\']\)', source)
triggers = re.findall(r'\.newTrigger\(["\']([^"\']+)["\']\)', source)
print(json.dumps({
    'menu_callback_count': len(callbacks),
    'missing_menu_callbacks': [callback for callback in callbacks if callback not in funcs],
    'trigger_handler_count': len(triggers),
    'missing_trigger_handlers': [trigger for trigger in triggers if trigger not in funcs],
    'legacy_trigger_refs': re.findall(r'handleSpreadsheetChangeForIndex|setupIndexRefreshOnSheetAddedTrigger_|deleteLegacyOperationalAndDiagnosticSheets_|isIndexTriggerRelevantSheetName_', source),
    'archive_to_move_refs': source.count('Archive_To_Move')
}, indent=2))
PY
```

```bash
python -m json.tool Master_List/appsscript.json >/tmp/appsscript.json.valid
```

```bash
cp 'Master_List/Current Production Script/v.1.6.84_Current_Production_Script' /tmp/v1684.js && node --check /tmp/v1684.js
```

```bash
rg -n "handleSpreadsheetChangeForIndex|setupIndexRefreshOnSheetAddedTrigger_|deleteLegacyOperationalAndDiagnosticSheets_|isIndexTriggerRelevantSheetName_|ScriptApp\.newTrigger\([^\n]*handleSpreadsheetChangeForIndex" 'Master_List/Current Production Script/v.1.6.84_Current_Production_Script' || true
```

```bash
./Framework/tools/prepare_pr.sh
```

## Follow-up UI Formatting Clearance

The 2026-07-18 follow-up wrapping/defaults punch list was rechecked and patched in the v1.6.84 production script:

| Item | Result | Evidence |
| --- | --- | --- |
| Dashboard Quality rows 1-3 overflow and row 4+ grid wrap policy | PASS | `applyDashboardQualityReportColumnSettings_()` sets rows 1-3 to `OVERFLOW`, column A from row 4 down to `OVERFLOW`, and columns B onward from row 4 down to `WRAP`. |
| Framework Timing report rows 1-3 overflow and data-field wrap policy | PASS | `styleFrameworkTimingReport_()` applies row-block overflow for title/header blocks and wraps data fields in columns B onward for later blocks. |
| Framework Timing report column widths | PASS | Column A width is set to 220 and column C width is set to 475. |
| Format Dashboard title/subheader overflow | PASS | `writeDashboardDefaultsFast_()` sets the title rows and section subheader rows to `OVERFLOW`. |
| Format Dashboard Section B GLOBAL row 2 wrap setting | PASS | The default `GLOBAL` row 2 Date Range row now uses `Overflow`. |
| Format Dashboard Section D Demo P behavior | PASS | Demo P now defaults `Uses Alternating Colors` to `TRUE`. |
| Format Dashboard Section C template row counts | PASS | All default sheet definitions now use `Template Row Count = 100`. |

## v1.6.84.2 Runtime Report Review

Reviewed report inputs from `origin/main` without staging the binary PDFs:

- `Master_List/Reports/v1.6.84.2 - Dashboard Quality Report.pdf`
- `Master_List/Reports/v1.6.84.2 - Framework Timing Report.pdf`

| Runtime report gate | Result | Evidence / resolution |
| --- | --- | --- |
| Dashboard Quality PASS/FAIL scan | PASS | Extracted report text contains 111 `PASS` entries and 0 `FAIL`, `WARNING`, `CRITICAL`, `ERROR`, `SLOW`, or `BOTTLENECK` entries. |
| Dashboard Quality overall status | PASS | Section M reports `OVERALL FRAMEWORK STATUS READY` and all automated framework checks pass. |
| Template validation | PASS | Section F shows all eight templates as `PASS OK OK`. |
| Framework health/menu callbacks | PASS | Section H reports helper, menu, dashboard, template, validation, timing, and runtime smoke harness checks as `PASS`. |
| Performance summary | PASS | Section I reports all listed processes `OK` / within target. |
| Workflow synchronization | PASS | Section L reports primary PMR assignment and source-map integrity as `PASS`. |
| Framework Timing process summary | PASS | Extracted timing text contains 15 `PASS` process rows and 0 `FAIL`, `WARNING`, `CRITICAL`, `ERROR`, `SLOW`, or `BOTTLENECK` entries. |
| Framework Timing detailed log | PASS | Detailed log steps are marked `OK`; no performance issues or optimization recommendation rows were reported beyond placeholders. |
| Section G Format Dashboard changelog | CLEARED IN SOURCE | The runtime report showed `MODIFIED` rows requiring `getDefaultBehaviorRows_()`, `getDefaultSheetDefinitionRows_()`, and `getDefaultTitleRowRows_()` to be made permanent. The v1.6.84 source now contains those permanent defaults: Demo P alternating colors is `TRUE`, all default template row counts are `100`, and GLOBAL row 2 Date Range uses `Overflow`. A copied-workbook rerun should update the changelog hashes. |

### v1.6.84.2 Clearance Decision

Wave 7 and Wave 8 are cleared against the v1.6.84.2 Dashboard Quality and Framework Timing runtime reports for repository/local review purposes. The only runtime changelog action items identified by Section G have been applied to the production source. A final copied-workbook rerun is still required to prove the refreshed Section G hashes are unchanged after deployment.

## Clearance Decision

Wave 7 and Wave 8 are cleared for local/static repository validation in v1.6.84. Live workbook integration, destructive-operation, trigger-concurrency, and performance tests must still be executed in a copied Google Sheet before production deployment because those tests depend on Apps Script services and spreadsheet state that are not available in this container.
