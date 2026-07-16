# CodeLab Engineering Agent Instructions

These instructions apply to all AI coding agents working within this repository.

## Purpose

CodeLab is an engineering repository for reviewing, maintaining, improving, and producing production-quality Google Apps Script and related code.

Repository-wide standards are maintained in `Framework/spec/` or, for legacy layouts, `spec/`. Project-specific documentation supplements those standards but does not replace them unless explicitly documented.

## Startup

Before beginning work:

1. Read `README.md`.
2. Determine the active project or script.
3. Determine the requested task and review depth.
4. Review applicable standards from `Framework/spec/` or `spec/`.
5. Review project documentation when it exists.
6. Identify the governing production source when applicable.
7. Review current reports when requested.
8. Ignore excluded repository areas.
9. Begin analysis.

Do not require project-specific documentation when none exists. Do not force a standalone script into a formal project structure.

## Codex Cloud Command Execution

Codex Cloud tasks may execute Git and repository commands when instructed in the task chat. Command output appears in the task Log.

When synchronization or repository verification is required:

1. Run the required commands.
2. Review the output in the task Log.
3. Confirm requested files are visible before analysis.
4. Do not continue using stale repository contents.
5. Do not state that synchronization succeeded unless the command output proves it.

## Codex Cloud Task Policy

Each Codex Cloud task executes within its own isolated workspace.

When repository state affects the requested work:

- Execute the required Git and repository synchronization commands.
- Review command output in the task log.
- Verify requested repository files are visible before analysis.
- Do not assume repository state matches GitHub until synchronization has completed.
- Do not continue using stale repository contents.

## Repository Synchronization Policy

Synchronize when repository state may have changed or when work depends on recently uploaded files.

Examples:

- Newly uploaded production scripts
- Newly uploaded reports
- Newly uploaded specifications or documentation
- Requested files cannot be located
- The workspace may be stale
- The active task branch may not include recent changes from `main`

Before synchronization, verify:

```bash
git branch --show-current
git status -sb
git remote -v
```

If `origin` is missing:

```bash
git remote add origin https://github.com/tabs912/CodeLab.git
```

If the URL is wrong:

```bash
git remote set-url origin https://github.com/tabs912/CodeLab.git
```

Refresh references:

```bash
git fetch origin --prune
```

Run:

```bash
./Framework/tools/sync_workspace.sh
```

or, for legacy layouts:

```bash
./tools/sync_workspace.sh
```

Do not report a repository file as missing until synchronization has been attempted and the expected paths have been searched again.

## Binary File Policy

Binary files are review inputs but are not implementation artifacts.

Examples include:

```text
*.pdf
*.xlsx
*.xlsm
*.docx
*.pptx
*.png
*.jpg
*.jpeg
*.gif
*.zip
```

Reports, execution logs, screenshots, exported documents, and other binary artifacts may be reviewed and referenced during analysis but should not be included in implementation commits or pull requests unless explicitly requested.

When performing implementation work:

- Review binary files when relevant.
- Reference binary files when appropriate.
- Do not modify binary files unless explicitly requested.
- Do not stage binary files.
- Do not commit binary files.
- Do not include binary files in generated diffs.
- Do not include binary files in pull requests.

Before every commit or pull request:

Run:

```bash
./Framework/tools/prepare_pr.sh
```

or

```bash
./tools/prepare_pr.sh
```

depending on repository layout.

Do not create or claim a pull request until the preparation tool confirms that only intended implementation files remain staged.

## Implementation Diff Policy

Implementation diffs must contain only source-code and text-based implementation artifacts.

Before creating a commit or pull request:

- Run `prepare_pr.sh`.
- Review the generated diff.
- Remove unrelated changes.
- Remove binary files unless explicitly requested.
- Remove documentation changes unrelated to the requested implementation.
- Remove report changes unless explicitly requested.
- Remove formatting-only changes unless requested.

If unrelated files appear in the implementation diff:

- Restore those files.
- Remove them from the commit.
- Regenerate the implementation diff.

The final implementation diff should contain only files directly related to the requested task.

## Newly Uploaded Repository Files

If the user says files were uploaded after the workspace was created, assume the workspace may be stale.

Before reporting missing files:

1. Verify the remote.
2. Fetch current remote references.
3. Run the synchronization tool.
4. Compare the active branch against `origin/main`.
5. Search the expected project paths again.
6. Report the exact paths searched.
7. Only then report that files are unavailable.

Never infer or fabricate unseen file contents.

## Branch Awareness

Common branches include:

```text
main
general
work
codex_Master_List
codex_AideCP_Shade_&_Sync
codex/<task-name>
```

When reviewing files uploaded to `main`:

- Fetch `origin/main`.
- Compare the active branch against `origin/main`.
- Confirm requested files are visible.
- Do not assume the task branch contains recent `main` changes.

The synchronization tool may fast-forward a branch only when it has no unique local commits.

If the active branch has unique commits and is behind `origin/main`, do not automatically merge or rebase. Report the condition and recommend the next safe action.

Never switch branches without user approval.

## Pull Request Verification

Do not report that a GitHub pull request was created unless all are verified:

- The source branch was pushed to `origin`.
- The remote source branch exists.
- A GitHub PR number or URL was returned.
- The base branch is identified.
- The compare branch is identified.

A local commit, local `work` branch, task record, proposed PR title, or generated PR summary is not proof that a GitHub PR exists.

Preferred project branches:

```text
codex_Master_List
codex_AideCP_Shade_&_Sync
general
```

Codex may use a temporary local branch, but completed implementation work must be pushed to a descriptive remote branch before a PR is claimed.

## Synchronization Safety

Never automatically run:

```text
git reset --hard
git clean
git push --force
git push --force-with-lease
git checkout --force
git switch --discard-changes
```

Do not:

- Overwrite local work
- Discard commits
- Delete files or branches
- Switch branches without approval
- Rebase automatically when unique local commits exist
- Merge automatically when unique local commits exist
- Force-push changes

If synchronization cannot complete safely, report:

- Repository root
- Current branch
- Remote URL
- Upstream branch
- Modified tracked files
- Staged files
- Untracked files
- Ahead/behind status
- Relevant remote branch
- Recommended next action



## Project Discovery

Determine whether the request concerns:

- Production Project
- Google Apps Script Library
- Host Sheet Project
- General Script
- Experimental Project

Adjust review depth and deliverables accordingly.

## Default Project Review Order

Unless a project README defines another order:

1. `Current_Production/` or `Current Production Script/`
2. `Reports/`
3. `Audit_Summary/`
4. Project `README.md`
5. Project `spec/`
6. Supporting `scripts/`
7. Remaining project files
8. `Archive/` only when explicitly requested

The current production source is the governing executable implementation. Reports provide validation, timing, execution, diagnostic, and quality evidence. Archive material is not governing unless explicitly requested.

## Google Apps Script Library Projects

Review in this order:

1. Library Current Production
2. Host Sheet Current Production
3. Library Reports
4. Host Reports
5. Library-to-Host integration
6. Public API compatibility
7. `appsscript.json`
8. Library version references
9. Trigger compatibility
10. Deployment compatibility

Treat the Library as the governing business-logic source unless project documentation states otherwise.

Review public APIs, signatures, host compatibility, versioning, manifests, OAuth scopes, triggers, global state, concurrency, deployment readiness, and breaking-change risk.

## Review Levels

### Quick Review

Use for standalone scripts, general reviews, error checks, cleanup recommendations, and targeted performance suggestions.

- Review only supplied or identified code.
- Apply repository standards.
- Do not require a formal project structure.
- Do not require project-specific specifications.
- Do not run the exhaustive protocol unless requested.
- Do not modify code unless requested.

### Standard Review

Use for production reviews, project reviews, report comparisons, and release-readiness reviews.

- Review the governing production source.
- Review current reports.
- Review available project documentation.
- Apply repository-wide standards.
- Review dependencies, helpers, execution paths, destructive operations, triggers, error handling, performance, and maintainability.
- Provide prioritized recommendations and tests.

### Exhaustive Review

Use only when explicitly requested.

Follow `Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md` or `spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md`.

Do not modify code during the audit.

Expected deliverables include an executive summary, file inventory, function inventory, call graph, dependency review, architecture review, API review, runtime review, performance review, data-integrity review, trigger/concurrency review, orphan and duplicate reports, risk assessment, prioritized recommendations, and a test plan.

## Development Rules

Always:

- Preserve approved business logic.
- Follow repository and project standards.
- Consider dependencies before changes.
- Preserve backward compatibility unless instructed otherwise.
- Recommend improvements before major rewrites.
- Remove obsolete or duplicate code only when safe.
- Update all affected callers and helpers.
- Keep public interfaces stable unless a breaking change is approved.

Before removing any function, constant, configuration key, menu entry, or trigger, verify direct callers, indirect callers, trigger references, menu references, HTML references, `google.script.run`, library exports, function-name strings, dynamic invocation, external consumers, and compatibility wrappers.

Never rewrite a working project from scratch without approval, leave placeholders or TODOs in production code, rename public APIs without approval, remove code merely because it appears unused, modify archived production versions, or use `Archive_To_Move/` as a source unless explicitly requested.

## Google Apps Script Standards

Prefer batch reads and writes, cached spreadsheet/sheet/header/configuration references, in-memory array processing, one-pass processing, Maps and Sets, batch formatting, batch deletion, minimal `SpreadsheetApp.flush()`, and validation before destructive operations.

Avoid `getValue()`, `setValue()`, or `getRange()` inside loops; cell-by-cell updates; row-by-row deletion; repeated sheet lookups; repeated full-sheet reads; repeated formatting; repeated parsing; unnecessary sorting; excessive logging; and silent error suppression.

## Versioning

- `vX` — production release or milestone
- `vX.XX` — major change
- `vX.XX.XX` — minor change, correction, cleanup, or optimization

Every generated production script receives a new version. Never overwrite an earlier production release.

## Production Code Generation

When implementation is requested:

- Preserve approved business logic.
- Increment the version.
- Replace complete affected functions whenever practical.
- Update all affected callers and helpers.
- Remove obsolete implementations only when proven safe.
- Preserve public compatibility unless a breaking change is approved.
- Avoid unrelated changes.
- Return complete production-ready files.
- Include a functional summary, complete change log, release notes, dependency and performance impacts, test plan, and known issues intentionally left unchanged.
- Leave no placeholders, TODOs, stubs, or incomplete code.

Do not generate implementation code when the user requests recommendations only.

Before creating any commit or pull request:

- Run the repository preparation tool.
- Verify only intended implementation files remain staged.
- Verify binary files are excluded unless explicitly requested.
- Verify generated diffs contain only intended implementation changes.
- Only then create the commit and pull request.

## Excluded Areas

Unless explicitly requested, ignore:

```text
Archive_To_Move/
```

Do not read, search, compare, build from, audit, include in dependency analysis, include in release preparation, or use those files as production references.

## Repository Tools

Repository utilities may be located in:

```text
Framework/tools/
```

or

```text
tools/
```

depending on repository layout.

Standard workflow:

```text
startup_check.sh
        ↓
sync_workspace.sh
        ↓
(work)
        ↓
prepare_pr.sh
        ↓
commit
        ↓
push
        ↓
pull request
```

Standard tools:

- startup_check.sh
- maintenance_check.sh
- repo_status.sh
- sync_workspace.sh
- prepare_pr.sh
- verify_repository.sh
- update_remote.sh

Use repository tools when:

- Synchronization is required.
- Repository verification is requested.
- The user explicitly requests a tool.
- A task depends on recently uploaded files.

Do not execute destructive maintenance commands automatically.

## Completion Checklist

Before completing work verify:

✓ Repository standards applied

✓ Correct project reviewed

✓ Governing production source used

✓ Current reports reviewed (when requested)

✓ Repository synchronized (when required)

✓ Requested files confirmed visible

✓ Business logic preserved

✓ Dependencies considered

✓ Recommendations prioritized

✓ Version updated (if production code generated)

✓ Release notes included (if applicable)

✓ Testing recommendations included

✓ Repository prepared using `prepare_pr.sh`

✓ No binary files staged unless explicitly requested

✓ Generated diff reviewed

✓ Pull request limited to intended implementation files

✓ Pull request not claimed without a verified GitHub PR number and URL

## Pull Request Preparation

Before creating any commit or pull request:

1. Run the repository preparation tool.
2. Verify only intended implementation files remain staged.
3. Verify no binary files are staged.
4. Verify generated diffs contain only intended implementation changes.
5. Verify unrelated repository files are excluded.
6. Verify archived material is excluded.
7. Verify generated reports are excluded unless explicitly requested.

If the preparation tool reports problems:

- Stop.
- Report the issues.
- Do not create the commit.
- Do not create the pull request.

A pull request must represent only the intended implementation work.
