# CodeLab

## Overview

CodeLab is a multi-project engineering repository for Google Apps Script development.

This repository is used to:

- Review code
- Improve architecture
- Optimize performance
- Clean up and refactor code
- Develop production scripts
- Prepare releases
- Maintain engineering documentation

This repository is the engineering workspace for all projects contained within it.

---

# Repository Organization

The repository may contain multiple independent projects.

Typical project structure:

<Project>/
├── Current_Production/
├── Reports/
├── Audit_Summary/
├── spec/
├── scripts/
└── Archive/

Projects remain independent unless explicitly approved.

Business logic from one project shall never be merged into another project.

---

# Repository Standards

The root **spec/** folder contains repository-wide engineering standards.

Examples include:

- Google Apps Script Standards
- Code Review Standards
- Performance Standards
- Versioning Standards
- Release Standards
- Exhaustive Code Review Protocol

Project-specific specifications may also exist inside individual project folders.

---

# Project Types

## Production Projects

Projects containing production code.

Typically include:

- Current_Production
- Reports
- Audit_Summary
- spec

These projects should follow repository standards and any project-specific documentation.

### Google Apps Script Library Projects

Library projects contain reusable code consumed by one or more Host Sheet projects.

Review order:

1. Library Current_Production
2. Library Reports
3. Host Current_Production
4. Host Reports
5. Integration
6. Public API compatibility
7. Deployment configuration
---

## General Scripts

Standalone scripts that do not require a complete project structure.

Typically stored under:

General/
    Scripts/

These scripts follow repository standards but do not require project-specific specifications.

---

## Experimental Projects

Utilities, prototypes, and proof-of-concept work.

Review only what exists.

---

# Current Production

Current_Production is the authoritative production source for a project.

Only files inside Current_Production should be considered the production baseline.

---

# Reports

Reports provide diagnostics, validation, timing, and quality information.

Reports are intended to support engineering decisions.

Reports should be compared against the current production code when reviewing production projects.

---

# Archive_To_Move

Archive_To_Move is a temporary staging location for files that will eventually be transferred to the ARCHIVE_ONLY repository.

These files are outside the active development scope.

Unless explicitly requested, do not use Archive_To_Move for:

- Code Review
- Production Comparisons
- Architecture Review
- Release Preparation
- Production Baselines
- Dependency Analysis

---

# Binary Files

Binary files are normally excluded from code review unless specifically requested.

Examples include:

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

Production Release

vX

Major Release

vX.XX

Minor Release

vX.XX.XX

Production versions shall never be overwritten.

---

# Engineering Principles

1. Preserve approved business logic.
2. Improve maintainability.
3. Improve readability.
4. Improve performance.
5. Remove obsolete code.
6. Remove duplicate code.
7. Remove orphan code when safe.
8. Minimize Spreadsheet API calls.
9. Batch reads and writes whenever practical.
10. Preserve backward compatibility unless approved.

---

# Repository Tools

The tools folder contains optional repository utilities.

Examples:

tools/startup_check.sh
tools/repo_status.sh
tools/maintenance_check.sh
tools/update_remote.sh

These tools assist with repository maintenance.

They are not required for normal code review.

---

# Git Workflow

Before ending work verify:

git status
git branch
git remote -v
git log --oneline -5

Commit frequently.

Verify repository status before pushing.

Do not assume synchronization completed successfully.
