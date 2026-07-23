# **Completed \- Wave 3 Checklist — Master List v1.8.9.2**

**Wave:** Wave 3 — Trigger, concurrency, and public API safety  
**Planning source:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`  
**Current production source:** `Master_List/Current Production Script/v1.8.9.2_Current_Production`  
**Recommended next version:** `v1.8.9.3_Current_Production` if production code changes are implemented  
**Prerequisite:** Wave 1 is closed and no longer blocks Wave 3 planning.  
**Current Wave 3 status:** PLANNED / NOT STARTED

---

## **Simple To-Do Checklist**

Use this checklist first. Wave 3 should remain small and focused: protect destructive workflows from overlap, preserve public entry points, and validate menus/triggers without rebuilding the framework.

### **A. Scope Approval**

- [x] Confirm Wave 1 closure is accepted as the baseline for Wave 3\.  
- [x] Confirm `v1.8.9.2_Current_Production` is the governing source for Wave 3 analysis.  
- [x] Confirm next implementation version will be `v1.8.9.3_Current_Production` unless owner approves another version.  
- [x] Confirm Wave 3 scope is limited to trigger/concurrency/public API safety.  
- [x] Confirm no public menu labels or public function names will be removed.  
- [x] Confirm no framework rebuild is approved.  
- [x] Confirm no binary reports will be modified or committed.

### **B. Static Review To-Do**

- [x] Inventory all public destructive entry points.  
- [x] Identify which destructive entry points already route through `runFrameworkTimed_`.  
- [x] Identify which destructive entry points already route through `runWithWorkflowBusyFlag_`.  
- [x] Identify standalone workflows that still perform mutation outside the busy-flag path.  
- [x] Review `runMonthlyStart`, `runMonthlyUpdate`, `updateDemoPMonthlySync`, `createDisenrolledList`, `buildMonthlyChangeReport`, `createMasterList`, archive workflows, and restore workflows.  
- [x] Review installable/simple trigger functions: `onOpen`, `onEdit`, and `doGet`.  
- [x] Review menu callback registry and Dashboard Quality required-function registry.  
- [x] Confirm no `google.script.run`, trigger-name string, menu callback, or external entry point would break from any proposed wrapper/routing change.

### **C. Implementation To-Do**

- [x] Create a new versioned production source if code changes are approved.  
- [x] Preserve all public function names and menu callback names.  
- [x] Route uncovered destructive standalone workflows through the existing busy-flag/timing pattern where safe.  
- [x] Do not double-wrap functions that already run through `runFrameworkTimed_` / `runWithWorkflowBusyFlag_`.  
- [x] Ensure busy flag clears after success.  
- [x] Ensure busy flag clears after thrown errors.  
- [x] Ensure user-facing cancel paths do not leave a stuck busy state.  
- [x] Keep existing owner-approved workflow sequences unchanged.  
- [x] Add concise timing labels for newly protected paths only where helpful.  
- [x] Avoid broad logging or noisy diagnostics.

### **D. Runtime Validation To-Do**

- [x] Reload workbook and verify all menus load.  
- [x] Run Create Monthly Start from menu.  
- [x] Run Create Monthly Update from menu.  
- [x] Run Update Demo P from menu.  
- [x] Run Create / Update Disenrolled List from menu.  
- [x] Run Monthly Change Report from menu.  
- [x] Run Create Master List from menu.  
- [x] Run archive/hide monthly active sheet workflows if included in Wave 3 scope.  
- [ ] Run restore workflow if included in Wave 3 scope.  
- [x] Attempt duplicate/back-to-back destructive workflow invocation and verify the second invocation is blocked or exits safely.  
- [x] Trigger an expected workflow error and confirm busy flag clears.  
- [x] Trigger an expected user cancel and confirm busy flag clears.  
- [x] Confirm Framework Timing Report records protected workflow paths clearly.  
- [x] Confirm Dashboard Quality workflow passes or reports only expected warnings.  
- [x] Confirm no public menu callback is missing.  
- [x] Confirm no tab order, visibility, template, Dashboard, Demo P, Monthly Change, Disenrolled Exclusion, or Master List regression.

### **E. Closure To-Do**

- [ ] All intended Wave 3 code changes are complete.  
- [ ] Static dependency/callback review passes.  
- [ ] All release-blocking runtime tests pass or have approved exceptions.  
- [ ] Framework Timing evidence is reviewed.  
- [ ] Dashboard Quality evidence is reviewed.  
- [ ] Rollback path to `v1.8.9.2` is documented.  
- [ ] Repository preparation tool passes.  
- [ ] No binary artifacts are staged or committed.  
- [ ] Final diff contains only Wave 3 implementation files and text release artifacts.  
- [ ] Release notes are complete.

**Current simple checklist decision:** Wave 3 is ready for detailed planning, not implementation.