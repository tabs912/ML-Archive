# Google Apps Script Engineering Repository

## Purpose

This repository is the primary engineering workspace for Google Apps Script projects.

Its primary purposes are:

- Architecture Review
- Code Review
- Production Script Development
- Code Cleanup
- Performance Optimization
- Dependency Analysis
- Bug Fixes
- Documentation
- Release Preparation
- Production Version Management

This repository is **not** the production deployment environment.

Production scripts are reviewed, optimized, versioned, validated, and documented here before deployment.

---

# Repository Organization

This repository contains multiple independent Google Apps Script projects.

Each project maintains its own:

- Current Production
- Specifications
- Audit Summaries
- Reports
- Documentation
- Git Branch

Typical structure:

```
<Project>/

Current_Production/
Audit_Summary/
spec/
scripts/
Reports/
Archive/
```

Projects are independent.

Business logic from one project shall never be merged into another project unless explicitly approved.

---

# Current Production

The **Current_Production** folder is the authoritative production source.

Only scripts located within **Current_Production** shall be considered the current production baseline.

Archived scripts are reference material only.

---

# Archive_To_Move

Archive_To_Move is a temporary staging location for files that will be transferred to the ARCHIVE_ONLY repository.

These files are **not** considered part of any active project.

The contents of Archive_To_Move shall **not** be used for:

- Code Review
- Architecture Review
- Production Comparisons
- Dependency Analysis
- Performance Analysis
- Regression Review
- Production Script Generation
- Release Packaging
- Version Comparisons
- Production Baselines

Treat Archive_To_Move as outside the active repository unless explicitly instructed otherwise.

---

# Repository Root Requirements

Required files

```
README.md
AGENTS.md
```

---

# Repository Startup Procedure

Before beginning any work:

1. Read README.md.
2. Read AGENTS.md.
3. Identify the active project.
4. Identify the active Git branch.
5. Read the active project's documentation.
6. Read the active project's spec folder.
7. Identify the Current_Production script.
8. Review previous Audit Summaries if available.
9. Ignore excluded folders.
10. Begin analysis.

No recommendations shall be made without completing the startup review.

---

# Excluded Repository Areas

The following locations are excluded from normal analysis:

```
Archive_To_Move/
```

Unless explicitly requested, do not:

- Read files
- Search files
- Compare files
- Build from files
- Include files in audits
- Include files in dependency analysis
- Include files in release notes
- Generate diffs from files
- Use files as production references

---

# Binary File Policy

Unless explicitly requested, do not modify or include binary files in generated diffs.

```
*.pdf
*.xlsx
*.docx
*.pptx
*.png
*.jpg
*.jpeg
*.gif
*.zip
```

---

# Diff Cleanup Policy

Before generating a diff:

Review only source code.

Primary review folders:

```
<Project>/Current_Production
<Project>/Audit_Summary
<Project>/spec
```

Exclude:

```
Archive_To_Move/
```

Ignore binary files unless specifically requested.

---

# Branch Policy

Persistent branches:

```
main
codex_Master_List
codex_AideCP_Shade_&_Sync
```

Temporary branches may be created for short-term development.

Temporary branches should be deleted after merge.

---

# Standard Code Review Workflow

Every review shall include:

## Architecture Review

Review:

- Project architecture
- Execution flow
- Module organization
- Interfaces
- Naming consistency
- Overall design

---

## Dependency Review

Identify:

- Missing helpers
- Duplicate helpers
- Orphan functions
- Dead code
- Circular dependencies
- Broken references
- Missing configuration
- Missing libraries

---

## Runtime Review

Evaluate:

- Execution flow
- Spreadsheet API usage
- Memory usage
- Cache opportunities
- Batch processing
- Runtime bottlenecks
- Spreadsheet reads
- Spreadsheet writes

---

## Performance Review

Identify:

- Slow loops
- Repeated Spreadsheet calls
- Repeated formatting
- Repeated sorting
- Repeated calculations
- Unnecessary API calls

Recommend:

- Batch operations
- Cached references
- Cached headers
- One-pass processing
- Array processing

---

## Google Apps Script Review

Review:

- Menus
- Triggers
- Libraries
- Services
- CacheService
- LockService
- PropertiesService
- HtmlService
- SpreadsheetApp
- DriveApp
- UrlFetchApp

---

## Framework Health Check

Every review shall include:

- Architecture Health
- Dependency Health
- Runtime Health
- Performance Health
- Maintainability
- Duplicate Logic
- Dead Code
- Complexity Assessment
- Largest Functions
- High Risk Functions
- Spreadsheet I/O Assessment

---

# Production Script Review

Before generating production code:

Review:

- Current Production Script
- Project Specifications
- Documentation
- Architecture
- Dependencies
- Helper Functions
- Validation Logic
- Configuration References
- Menu Integration
- Trigger Integration
- Regression Risks

---

# Reference Verification

Verify:

- Helper references
- Menu references
- Trigger references
- Dashboard references
- Configuration references
- Validation references
- Timing references
- Library references
- External service references

Production releases shall contain no broken references.

---

# Production Update Rules

Production updates shall:

- Preserve approved business logic.
- Replace complete affected functions whenever practical.
- Remove obsolete implementations.
- Remove duplicate code.
- Remove orphan functions when safe.
- Maintain backward compatibility unless approved.
- Update version numbers.
- Include release notes.
- Include testing recommendations.

Avoid partial patches whenever practical.

---

# Versioning Standard

Every generated production script receives a new version.

```
vX
```

Production Release

```
vX.XX
```

Major Feature Release

```
vX.XX.XX
```

Minor Enhancement

Examples

```
v1
v1.01
v1.01.01
v1.01.02
v1.02
```

Production versions shall never be overwritten.

---

# Deliverables

Unless instructed otherwise, every production review should include:

- Executive Summary
- Functional Summary
- Architecture Review
- Dependency Audit
- Helper Audit
- Orphan Function Audit
- Performance Review
- Health Check
- Risk Assessment
- Recommended Improvements
- Version Recommendation
- Release Notes
- Testing Recommendations

---

# Git Synchronization

This repository is the authoritative development repository.

Temporary development environments may not synchronize correctly.

Before ending any work session verify:

```
git status
git branch
git remote -v
git log --oneline -5
```

Do not assume synchronization completed successfully.

Commit frequently.

Verify before pushing.

---

# Engineering Principles

1. Preserve working business logic.
2. Follow project specifications.
3. Improve maintainability.
4. Improve performance.
5. Remove obsolete code.
6. Remove duplicate code.
7. Remove orphan code when safe.
8. Minimize Spreadsheet API calls.
9. Batch reads and writes whenever practical.
10. Keep public interfaces stable unless approved.
11. Generate complete production-ready code.
12. Every production script receives a new version.
