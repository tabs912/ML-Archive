#!/usr/bin/env bash
set -euo pipefail

CODELAB_REMOTE_URL="${CODELAB_REMOTE_URL:-https://github.com/tabs912/CodeLab.git}"
BASE_BRANCH="${CODELAB_BASE_BRANCH:-main}"

ok()   { printf 'OK   %s\n' "$1"; }
warn() { printf 'WARN %s\n' "$1"; }
fail() { printf 'FAIL %s\n' "$1" >&2; }

section() {
  printf '\n%s\n' "$1"
  printf '%*s\n' "${#1}" '' | tr ' ' '-'
}

printf '\nCodeLab workspace synchronization\n'
printf '=================================\n'

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  fail "Current directory is not inside a Git repository."
  exit 1
}

root="$(git rev-parse --show-toplevel)"
cd "$root"

branch="$(git branch --show-current 2>/dev/null || true)"
[[ -n "$branch" ]] || {
  fail "Workspace is in detached HEAD state."
  exit 1
}

ok "Repository root: $root"
ok "Current branch: $branch"

if ! git remote get-url origin >/dev/null 2>&1; then
  warn "No origin remote is configured."
  git remote add origin "$CODELAB_REMOTE_URL"
  ok "Configured origin: $CODELAB_REMOTE_URL"
fi

origin_url="$(git remote get-url origin)"
ok "Origin: $origin_url"

section "Local workspace status"

tracked_modified=0
staged_changes=0

git diff --quiet || tracked_modified=1
git diff --cached --quiet || staged_changes=1

untracked_count="$(git ls-files --others --exclude-standard | wc -l | tr -d ' ')"

if [[ "$tracked_modified" -eq 1 || "$staged_changes" -eq 1 ]]; then
  fail "Tracked or staged changes are present."
  git status -sb
  printf '\nCommit or stash tracked changes before synchronizing.\n'
  exit 2
fi

ok "No modified or staged tracked files."

if [[ "$untracked_count" -gt 0 ]]; then
  warn "$untracked_count untracked file(s) found. They will be preserved."
else
  ok "No untracked files."
fi

section "Fetching remote updates"

git fetch origin --prune
ok "Remote references updated."

remote_base="origin/$BASE_BRANCH"

if ! git show-ref --verify --quiet "refs/remotes/$remote_base"; then
  fail "Remote base branch does not exist: $remote_base"
  printf '\nAvailable remote branches:\n'
  git branch -r
  exit 3
fi

upstream="$(git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null || true)"
[[ -n "$upstream" ]] && ok "Current upstream: $upstream" || warn "Current branch has no upstream tracking branch."

counts="$(git rev-list --left-right --count HEAD..."$remote_base")"
ahead="$(awk '{print $1}' <<<"$counts")"
behind="$(awk '{print $2}' <<<"$counts")"

section "Branch comparison"
printf '%-24s %s\n' "Current branch:" "$branch"
printf '%-24s %s\n' "Remote base:" "$remote_base"
printf '%-24s %s\n' "Local commits ahead:" "$ahead"
printf '%-24s %s\n' "Remote commits newer:" "$behind"

changed_files="$(git diff --name-only --diff-filter=ACMR HEAD.."$remote_base" -- \
  'Master_List/Reports/**' \
  'Master_List/Current_Production/**' \
  'Master_List/Current Production Script/**' \
  'AideCP_Shade_&_Sync/**' \
  'General/Scripts/**' \
  'Framework/**' \
  'README.md' \
  'AGENTS.md' 2>/dev/null || true)"

if [[ -n "$changed_files" ]]; then
  section "New or updated repository files detected"
  while IFS= read -r file; do
    [[ -n "$file" ]] && printf '✓ %s\n' "$file"
  done <<<"$changed_files"
else
  section "Repository file changes"
  printf 'No new tracked project files were detected on %s.\n' "$remote_base"
fi

if [[ "$behind" -eq 0 ]]; then
  section "Workspace result"
  printf 'Workspace synchronized.\n\n'
  printf 'Current branch: %s\n' "$branch"
  printf 'Remote base: current\n'
  printf 'Workspace is ready for review.\n'
  exit 0
fi

if [[ "$ahead" -gt 0 ]]; then
  section "Workspace result"
  warn "Current branch contains unique local commits and is behind $remote_base."
  printf '\nNo merge, rebase, reset, branch switch, or force operation was performed.\n'
  printf 'Remote files were fetched and can be inspected through %s,\n' "$remote_base"
  printf 'but they are not incorporated into the current branch.\n'
  printf '\nRecommended next action after user approval:\n'
  printf '  git rebase %s\n' "$remote_base"
  printf '\nAlternative merge-based action after user approval:\n'
  printf '  git merge %s\n' "$remote_base"
  exit 4
fi

section "Applying safe fast-forward"
git merge --ff-only "$remote_base"
ok "Workspace updated successfully."

section "Workspace result"
printf 'Workspace synchronized.\n\n'
printf 'Current branch: %s\n' "$branch"
printf 'Remote base: %s commit(s) applied\n' "$behind"
[[ -n "$changed_files" ]] && printf '\nNew or updated files are now available in the workspace.\n'
printf '\nWorkspace is ready for review.\n\n'
git status -sb
