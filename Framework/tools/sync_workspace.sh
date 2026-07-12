#!/usr/bin/env bash
set -euo pipefail
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not inside a Git repository." >&2; exit 1; }
root="$(git rev-parse --show-toplevel)"; cd "$root"
branch="$(git branch --show-current)"
[[ -n "$branch" ]] || { echo "Detached HEAD." >&2; exit 1; }
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Tracked changes must be committed or stashed before sync." >&2
  git status -sb
  exit 2
fi
git fetch origin --prune
remote="origin/$branch"
git show-ref --verify --quiet "refs/remotes/$remote" || { echo "Remote branch missing: $remote" >&2; exit 3; }
counts="$(git rev-list --left-right --count HEAD..."$remote")"
ahead="$(awk '{print $1}' <<<"$counts")"
behind="$(awk '{print $2}' <<<"$counts")"
[[ "$ahead" -gt 0 && "$behind" -gt 0 ]] && { echo "Branches diverged." >&2; exit 4; }
[[ "$behind" -eq 0 ]] && { echo "Workspace current."; exit 0; }
git merge --ff-only "$remote"
git status -sb
Workspace synchronized.

Current branch: work
Remote main: 3 commits newer

New files detected:
✓ Master_List/Reports/v1.6.29 - Dashboard Quality Report.pdf
✓ Master_List/Reports/v1.6.29 - Framework Timing Report.pdf

Workspace is ready for review.
