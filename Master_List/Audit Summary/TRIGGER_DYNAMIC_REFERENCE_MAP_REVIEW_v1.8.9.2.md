# Trigger and Dynamic Reference Map Review - v1.8.9.2

Reviewed artifact: `Master_List/Audit Summary/EXHAUSTIVE_TRIGGER_DYNAMIC_REFERENCE_MAP_v1.8.9.2.md`

Governing production source reviewed: `origin/main:Master_List/Current Production Script/v1.8.9.2_Current_Production`

Review date: 2026-07-23

## Executive Summary

The trigger and dynamic reference map is suitable as a Wave 3 planning input. It correctly identifies the major externally reachable surfaces in v1.8.9.2: the custom menu callbacks, simple `onOpen`, simple `onEdit(e)`, `doGet(e)` web-app route, callback-router arrays, document-property keys, and the dynamic `eval("typeof " + name)` function-existence probe.

No evidence was found that the map approves deletion of any function. Its orphan/dead-code section is correctly framed as a static candidate list requiring later Wave 5 review before removal.

The map should be used with the limitations below, especially for Wave 3 concurrency work: it inventories reachability, but it does not by itself prove that every public mutating workflow is protected by `runFrameworkTimed_` / document locking.

## Review Method

1. Synchronized repository references and confirmed the requested artifact and v1.8.9.2 production source are visible on `origin/main`.
2. Extracted the requested map to the working branch for review traceability.
3. Extracted `v1.8.9.2_Current_Production` to `/tmp/v1892.js`.
4. Ran static searches for trigger entry points, menu callback registries, web-app routing, dynamic execution patterns, `ScriptApp` usage, and Wave 3 lock/timing wrappers.
5. Compared the map findings against the static source evidence.

## Validation Results

| Area | Review Result | Notes |
|---|---|---|
| Menu callbacks | PASS | Menu strings and `ML_MENU_CALLBACKS` entries are represented, including legacy system-sheet wrappers. |
| Simple triggers | PASS | `onOpen` and `onEdit(e)` are represented. |
| Web app routing | PASS | `doGet(e)` route behavior through `restoreTarget` and optional `action` is represented. |
| Installable triggers | PASS with caveat | No `ScriptApp.newTrigger` / time-driven trigger builder usage was found in source; external Apps Script UI-configured triggers remain outside static source visibility. |
| Dynamic execution | PASS with caveat | The map correctly flags `eval(`. Its use is a function-existence probe, not arbitrary user-input execution, but it is still a dynamic reference that should be retained in dependency reviews. |
| Required-function registries | PASS | The map captures callback/router and dashboard quality string references, which are important hidden dependencies. |
| Orphan/dead-code candidates | PASS with caveat | The list is appropriate only as deletion-review input; it must not be used as deletion approval because Apps Script/manual/deployed entry points can be external to source. |
| Wave 3 concurrency readiness | PARTIAL | The map identifies public surfaces, but additional per-entry lock-safety review is still needed before closing Wave 3. |

## Findings

### TDR-001 — Map is accurate enough for Wave 3 planning

**Severity:** Low
**Status:** Accepted as planning input

The map correctly identifies the principal public/menu/trigger/web surfaces that can start workflows in v1.8.9.2. This is the correct foundation for Wave 3 because lock-safety work must begin from every route that can launch a mutating workflow, not just direct same-file callers.

**Recommendation:** Use the map as the Wave 3 entry-point inventory and pair it with wrapper verification for each public mutating callback.

### TDR-002 — Static orphan/dead-code candidates need stronger warning before any deletion

**Severity:** Medium
**Status:** Documentation caution

The map already includes an important caveat, but the orphan/dead-code candidate table is long and could be misread as a cleanup directive. Several entries are public top-level functions or quality/diagnostic helpers that may be manually run from Apps Script, referenced by external deployments, or intentionally retained for Dashboard Quality and framework diagnostics.

**Recommendation:** Treat every listed orphan as `candidate only`. Before removal, verify same-file direct callers, menu/router strings, dashboard registries, web-app routes, HTML/google.script.run references, Apps Script installable triggers, manual owner workflows, deployments, and compatibility wrappers. Do not include any deletion in Wave 3.

### TDR-003 — Wave 3 must verify wrappers independently of reachability mapping

**Severity:** Medium
**Status:** Action required for Wave 3

The map inventories entry points and dynamic references, but it does not answer whether each mutating public callback is guarded by document lock and busy-flag management. This is especially important for standalone menu functions that can be launched while another workflow is running.

**Recommendation:** For each menu/public workflow in the map, classify it as mutating vs read/diagnostic/configuration, then verify whether it uses `runFrameworkTimed_`, `runWithWorkflowBusyFlag_`, or another acceptable safety wrapper. Prioritize the owner-specified Wave 3 functions: `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `buildMonthlyChangeReport`, `createMasterList`, and `formatRawData`.

### TDR-004 — External trigger/deployment state remains unknown from source alone

**Severity:** Low
**Status:** Runtime validation required

The production source does not create installable triggers, but Apps Script can have installable triggers and deployments configured outside the checked-in code. The map accurately reports no source-defined trigger builder calls, but it cannot prove the live project has no external triggers or old web-app deployments.

**Recommendation:** During Wave 3 validation, inspect the Apps Script trigger/deployment UI and confirm no stale installable trigger or deployment route invokes a renamed, removed, or unwrapped function.

## Wave 3 Release Implications

- The requested map supports the Wave 3 scope and should be preserved as release evidence.
- Wave 3 should not remove functions based on this map.
- Wave 3 implementation should focus on lock/busy-flag wrapper coverage for mutating public entry points.
- Runtime closure should include a live Apps Script trigger/deployment check because source-only static review cannot see UI-configured installable triggers.

## Final Review Conclusion

`EXHAUSTIVE_TRIGGER_DYNAMIC_REFERENCE_MAP_v1.8.9.2.md` passes review as an authoritative static trigger/dynamic-reference planning artifact for v1.8.9.2, with caveats. It should be used to guide Wave 3 concurrency and lock-safety implementation, not deletion cleanup. The next safe action is to continue Wave 3 wrapper verification and runtime trigger/deployment validation before closing Wave 3.
