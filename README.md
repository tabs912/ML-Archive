# CodeLab

## Purpose

CodeLab is a multi-project engineering repository for Google Apps Script development.

This repository is used for:

- Architecture Review
- Code Review
- Production Script Development
- Code Cleanup
- Performance Optimization
- Dependency Analysis
- Bug Fixes
- Documentation
- Testing
- Release Preparation
- Version Management

This repository is the engineering workspace.

Production code is reviewed, optimized, versioned, validated, and documented here before deployment.

---

# Repository Organization

This repository may contain multiple independent Google Apps Script projects.

Typical project structure:

<Project>/

Current_Production/
Audit_Summary/
spec/
scripts/
Reports/
Archive/

Projects remain independent.

Business logic from one project shall not be merged into another unless explicitly approved.

---

# Repository Standards

The root `spec/` folder contains engineering standards that apply across the repository.

Examples include:

- Google Apps Script Standards
- Code Review Standards
- Performance Standards
- Versioning Standards
- Release Standards
- Exhaustive Code Review Protocol

Project-specific specifications belong inside each project's `spec` folder.

---

# Project Types

The repository supports three project types.

## Production Projects

Projects containing production code.

Typically include:

- Current_Production
- Reports
- Audit_Summary
- spec

These projects should follow both the repository standards and any project-specific specifications.

---

## General Scripts

Standalone scripts that do not require a full project structure.

Typically stored under:

General/
    Scripts/

These scripts follow repository engineering standards but do not require project specifications.

---

## Experimental Projects

Utilities, prototypes, or proof-of-concept work.

Review only what exists.

Do not require production documentation.

---

# Current Production

Current_Production is the authoritative production source for a project.

Only files within Current_Production should be treated as the production baseline.

Archived scripts are reference material only.

---

# Archive_To_Move

Archive_To_Move is a temporary staging location for files that will be transferred to the ARCHIVE_ONLY repository.

These files are outside the active development scope.

Do not use Archive_To_Move for:

- Code review
- Production comparisons
- Architecture review
- Release preparation
- Production baselines
- Dependency analysis

---

# Binary Files

Unless specifically requested, binary files are not part of code review.

Examples:

*.pdf
*.xlsx
*.docx
*.pptx
*.png
*.jpg
*.gif
*.zip

---

# Branches

Recommended branches:

main
general
master-list
aidecp

Project branches should remain independent.

---

# Versioning

Every production script receives a new version.

Production milestone

vX

Major release

vX.XX

Minor release

vX.XX.XX

Previous production versions should never be overwritten.

---

# Engineering Principles

1. Preserve approved business logic.
2. Improve maintainability.
3. Improve performance.
4. Remove obsolete code.
5. Remove duplicate code.
6. Remove orphan code when safe.
7. Minimize Spreadsheet API calls.
8. Batch reads and writes whenever practical.
9. Preserve backward compatibility unless approved.
10. Produce production-ready code.

---

# Git Workflow

Before ending work verify:

git status
git branch
git remote -v
git log --oneline -5

Do not assume synchronization completed successfully.

Commit frequently.

Verify before pushing.
