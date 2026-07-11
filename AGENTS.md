# CodeLab Engineering Agent Instructions

These instructions apply to all AI coding agents working within this repository.

---

# Startup

Before beginning work:

1. Read README.md.
2. Determine the active project.
3. Determine the requested review level.
4. Review applicable repository standards from the root spec folder.
5. Review project documentation if it exists.
6. Begin analysis.

Do not require project-specific documentation when none exists.

---

# Project Discovery

Determine whether the request is for:

- Production Project
- General Script
- Experimental Project

Adjust the review depth accordingly.

---

# Review Levels

## Quick Review

Use for:

- Standalone scripts
- General code reviews
- Error checks
- Cleanup recommendations
- Performance suggestions

Review only the supplied code.

Apply repository engineering standards.

Do not perform a complete project audit unless requested.

---

## Standard Review

Use for:

- Production script reviews
- Project reviews
- Release readiness reviews

Review available materials such as:

- Current_Production
- Reports
- Documentation
- Repository standards

Provide prioritized recommendations.

---

## Exhaustive Review

Use only when explicitly requested.

Follow the repository protocol located in:

spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md

---

# Development Rules

Always:

- Preserve approved business logic.
- Follow repository engineering standards.
- Remove obsolete code when safe.
- Remove duplicate code when safe.
- Consider dependencies before making recommendations.
- Preserve backward compatibility unless instructed otherwise.
- Recommend improvements before major rewrites.

Never:

- Rewrite a working project from scratch.
- Leave placeholder code.
- Leave TODOs in production code.
- Rename public interfaces without approval.
- Remove code without considering dependencies.

---

# Google Apps Script Standards

Prefer:

- Batch reads
- Batch writes
- Cached references
- Cached headers
- Array processing
- One-pass processing

Avoid:

- getValue() inside loops
- setValue() inside loops
- getRange() inside loops
- Cell-by-cell updates
- Row-by-row deletion
- Repeated SpreadsheetApp.flush()
- Unnecessary Spreadsheet service calls

---

# Production Code Generation

When generating production code:

- Preserve approved business logic.
- Replace complete affected functions whenever practical.
- Update dependent helpers when required.
- Remove obsolete implementations.
- Update version numbers.
- Include release notes.
- Include testing recommendations.

---

# Deliverables

When appropriate, provide:

- Executive Summary
- Functional Summary
- Architecture Review
- Dependency Review
- Performance Review
- Risk Assessment
- Recommended Improvements
- Version Recommendation
- Release Notes
- Testing Recommendations

The depth of the deliverables should match the scope of the request.

---

# Excluded Areas

Unless explicitly requested, ignore:

Archive_To_Move/

Do not use these files for:

- Code Review
- Architecture Decisions
- Production Comparisons
- Release Preparation

---

# Repository Tools

The repository includes optional maintenance utilities located in:

tools/

These tools may be used when requested but should not be executed automatically.

---

# Completion Checklist

Before completing work verify:

✓ Repository standards applied

✓ Business logic preserved

✓ Dependencies considered

✓ Recommendations prioritized

✓ Version updated (if code was generated)

✓ Release notes included (if applicable)

✓ Testing recommendations provided (if applicable)
