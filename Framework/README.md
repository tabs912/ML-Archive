# CodeLab Framework

CodeLab Framework is the shared engineering framework for all projects in the CodeLab repository.

It provides:

- Repository-wide engineering standards
- Codex operating procedures
- Reusable review and implementation prompts
- Project and release templates
- Repository and project utilities
- Review, implementation, performance, deployment, and release checklists
- Example project structures

## Relationship to Projects

CodeLab projects inherit the standards and tools in this folder.

Typical repository structure:

```text
CodeLab/
├── Framework/
├── Master_List/
├── AideCP_Shade_&_Sync/
├── General/
└── Archive_To_Move/
```

Project-specific rules belong in the project folder. Shared rules belong here.

## Framework Version

Current version:

```text
v1.0.0
```

## Review Levels

- Quick Review
- Standard Review
- Exhaustive Review

## Framework Use

1. Read `README.md`.
2. Read repository `AGENTS.md`.
3. Read applicable framework standards.
4. Read project-specific documentation when it exists.
5. Use the appropriate prompt from `prompts/`.
6. Use `tools/sync_workspace.sh` when recently added repository files are not visible.


## Pull Request Preparation

Implementation pull requests should contain source and text-based changes only unless binary changes are explicitly requested.

Binary reports may be used as review evidence, but they should not normally be included in implementation commits or pull requests.

Before committing or creating a pull request, run:

```bash
./Framework/tools/prepare_pr.sh
