# CodeLab Engineering Agent Instructions

These instructions apply to all AI coding agents working within this repository.

---

# Purpose

CodeLab is an engineering repository for reviewing, maintaining, improving, and producing production-quality software.

Repository-wide engineering standards are maintained in the Framework (or root spec folder for legacy repositories).

Project-specific documentation supplements these standards but does not replace them unless explicitly documented.

---

# Startup

Before beginning work:

1. Read `README.md`.
2. Determine the active project.
3. Determine the requested task.
4. Determine the requested review depth.
5. Review applicable engineering standards from:

```
Framework/spec/
```

or

```
spec/
```

depending on repository structure.

6. Review project documentation if it exists.
7. Begin analysis.

Do not require project-specific documentation when none exists.

---

# Repository Synchronization Policy

Repository synchronization should be performed only when repository state may have changed or when the requested work depends on recently uploaded repository files.

Examples include:

- Newly uploaded production scripts
- Newly uploaded reports
- Newly uploaded specifications
- Newly uploaded documentation
- User explicitly requests synchronization
- Repository files cannot be located
- Current workspace may be stale

Before beginning a synchronization-dependent review:

Verify repository status:

```bash
git branch --show-current
git status -sb
git remote -v
```

If `origin` is not configured:

```bash
git remote add origin https://github.com/tabs912/CodeLab.git
```

If necessary:

```bash
git remote set-url origin https://github.com/tabs912/CodeLab.git
```

Refresh repository references:

```bash
git fetch origin --prune
```

Run the synchronization tool:

```bash
./Framework/tools/sync_workspace.sh
```

or

```bash
./tools/sync_workspace.sh
```

depending on repository structure.

If requested files still cannot be located:

- Report searched paths.
- Report active branch.
- Report repository status.
- Do not assume files are missing until synchronization has been attempted.

---

# Workspace Refresh

If the user indicates repository files were uploaded after the current workspace was created:

Assume the workspace may be stale.

Before reporting missing files:

1. Verify Git remote.
2. Fetch repository updates.
3. Synchronize workspace.
4. Search again.
5. Report searched locations.

---

# Branch Awareness

Many CodeLab reviews occur on project branches such as:

- main
- general
- work
- codex_Master_List
- codex_AideCP_Shade_&_Sync

When reviewing repository artifacts uploaded to `main`:

- Fetch `origin/main`
- Compare active branch against `origin/main`
- Confirm requested files are visible before beginning analysis.

Never change branches without user approval.

---

# Safety

Never automatically execute:

- git reset --hard
- git clean
- git push --force
- git push --force-with-lease
- branch deletion
- branch switching

Never overwrite local work.

If synchronization cannot complete safely:

Stop and report why.

---

# Project Discovery

Determine whether the request is for:

- Production Project
- Google Apps Script Library
- General Script
- Experimental Project

Adjust review depth accordingly.

---

# Project Review Order

Unless instructed otherwise:

Review in the following order:

1. Current_Production
2. Reports
3. Audit_Summary
4. README
5. Project specifications
6. Supporting scripts
7. Remaining project files

Current_Production is the governing implementation source.

Reports validate production behavior.

Audit summaries provide supplemental review information.

Archived material is not governing unless explicitly requested.

---

# Library Projects

For Google Apps Script Library projects:

Review order:

1. Library Current_Production
2. Host_Sheet Current_Production
3. Reports
4. Integration
5. Public API compatibility
6. appsscript.json
7. Deployment compatibility

Treat the Library as the governing business logic source.

Review:

- Public API
- Library version
- Host compatibility
- OAuth scopes
- Manifest
- Trigger compatibility
- Deployment readiness

---

# Review Levels

## Quick Review

Use for:

- Standalone scripts
- General scripts
- Error checking
- Cleanup
- Performance suggestions

Review only supplied code.

Apply repository engineering standards.

Do not perform full project audits.

---

## Standard Review

Use for:

- Production reviews
- Project reviews
- Release readiness
- Report comparisons

Review:

- Current_Production
- Reports
- Documentation
- Repository standards

Provide prioritized recommendations.

---

## Exhaustive Review

Use only when explicitly requested.

Follow:

```
Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md
```

or

```
spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md
```

Deliver:

- Executive Summary
- Functional Summary
- Function Inventory
- Dependency Review
- Architecture Review
- Public API Review
- Performance Review
- Runtime Review
- Orphan Code Report
- Duplicate Code Report
- Risk Assessment
- Prioritized Recommendations
- Testing Recommendations

Do not modify code during an exhaustive review.

---

# Development Rules

Always:

- Preserve approved business logic.
- Follow repository engineering standards.
- Remove obsolete code when safe.
- Remove duplicate code when safe.
- Preserve backward compatibility unless instructed otherwise.
- Consider dependencies before recommendations.
- Recommend improvements before major rewrites.

Before recommending removal of any function verify:

- Direct callers
- Indirect callers
- Trigger references
- Menu references
- HTML references
- Library exports
- Dynamic invocation

Never:

- Rewrite working projects from scratch.
- Leave placeholder code.
- Leave TODOs in production.
- Rename public APIs without approval.
- Remove code without dependency analysis.

---

# Google Apps Script Standards

Prefer:

- Batch reads
- Batch writes
- Cached sheet references
- Cached headers
- Cached configuration
- Array processing
- One-pass processing
- Maps and Sets
- In-memory transforms

Avoid:

- getValue() in loops
- setValue() in loops
- getRange() in loops
- Cell-by-cell updates
- Row-by-row deletion
- Repeated SpreadsheetApp.flush()
- Repeated Spreadsheet service calls

---

# Versioning

Production versions follow:

```
vX
```

Production release

```
vX.XX
```

Major enhancement

```
vX.XX.XX
```

Minor enhancement

Correction

Cleanup

Optimization

Every production code generation receives a new version.

Never overwrite an earlier production release.

---

# Production Code Generation

When generating production code:

- Preserve approved business logic.
- Replace complete affected functions whenever practical.
- Update dependent helpers.
- Remove obsolete implementations.
- Increment version.
- Include release notes.
- Include testing recommendations.
- Return complete production-ready files.

---

# Deliverables

When appropriate provide:

- Executive Summary
- Functional Summary
- Architecture Review
- Dependency Review
- Performance Review
- Runtime Review
- Risk Assessment
- Recommended Improvements
- Version Recommendation
- Release Notes
- Testing Recommendations

Depth should match request scope.

---

# Excluded Areas

Unless explicitly requested ignore:

```
Archive_To_Move/
```

Do not use archived material for:

- Code Review
- Architecture Decisions
- Production Comparisons
- Release Preparation

---

# Repository Tools

Repository utilities are located in:

```
Framework/tools/
```

or

```
tools/
```

depending on repository layout.

Tools are optional.

Do not execute maintenance tools automatically unless:

- User requests it.
- Repository synchronization is required.
- A startup verification has been requested.

---

# General Principles

Never assume:

- Missing files
- Missing reports
- Missing branches
- Missing documentation
- Missing project structure

Verify before reporting.

When uncertain:

State assumptions clearly.

---

# Completion Checklist

Before completing work verify:

✓ Repository standards applied

✓ Business logic preserved

✓ Dependencies considered

✓ Recommendations prioritized

✓ Version updated (if code generated)

✓ Release notes included (if applicable)

✓ Testing recommendations included (if applicable)
