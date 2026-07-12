#!/usr/bin/env bash
set -euo pipefail

CODELAB_REMOTE_URL="https://github.com/tabs912/CodeLab.git"
BASE_BRANCH="${CODELAB_BASE_BRANCH:-main}"

ok() {
  printf 'OK   %s\n' "$1"
}

warn() {
  printf 'WARN %s\n' "$1"
}

fail() {
  printf 'FAIL %s\n' "$1" >&2
}

printf '\nCodeLab workspace synchronization\n'
printf '=================================\n\n'

# Confirm Git repository.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  fail "Current directory is not inside a Git repository."
  exit 1
fi

root="$(git rev-parse --show-toplevel)"
cd "$root"

branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  fail "Workspace is in detached HEAD state."
  exit 1
fi

ok "Repository root: $root"
ok "Current branch: $branch"

# Ensure origin exists.
if ! git remote get-url origin >/dev/null 2>&1; then
  warn "No origin remote was configured."
  git remote add origin "$CODELAB_REMOTE_URL"
  ok "Configured origin: $CODELAB_REMOTE_URL"
fi

origin_url="$(git remote get-url origin)"
ok "Origin: $origin_url"

# Preserve tracked local work.
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Tracked files contain uncommitted changes."
  git status -sb
  printf '\nCommit or stash tracked changes before synchronizing.\n'
  exit 2
fi

# Untracked files are reported but preserved.
untracked_count="$(
  git ls-files --others --exclude-standard |
    wc -l |
    tr -d ' '
)"

if [[ "$untracked_count" -gt 0 ]]; then
  warn "$untracked_count untracked file(s) found; they will be preserved."
fi

# Fetch all current remote references.
printf '\nFetching repository updates...\n'
git fetch origin --prune
ok "Remote references updated."

remote_base="origin/$BASE_BRANCH"

if ! git show-ref --verify --quiet "refs/remotes/$remote_base"; then
  fail "Remote base branch does not exist: $remote_base"
  printf '\nAvailable remote branches:\n'
  git branch -r
  exit 3
fi

# Compare current branch against origin/main.
counts="$(git rev-list --left-right --count HEAD..."$remote_base")"
ahead="$(awk '{print $1}' <<<"$counts")"
behind="$(awk '{print $2}' <<<"$counts")"

printf '\nBranch comparison\n'
printf '%-20s %s\n' "Current branch:" "$branch"
printf '%-20s %s\n' "Remote base:" "$remote_base"
printf '%-20s %s\n' "Local commits ahead:" "$ahead"
printf '%-20s %s\n' "Remote commits newer:" "$behind"

# Show repository files added or changed on remote main.
changed_files="$(
  git diff --name-only --diff-filter=ACMR HEAD.."$remote_base" -- \
    'Master_List/Reports/**' \
    'Master_List/Current Production Script/**' \
    'AideCP_Shade_&_Sync/**' \
    'General/Scripts/**' \
    2>/dev/null || true
)"

if [[ -n "$changed_files" ]]; then
  printf '\nNew or updated repository files detected:\n'

  while IFS= read -r file; do
    [[ -n "$file" ]] && printf '✓ %s\n' "$file"
  done <<<"$changed_files"
else
  printf '\nNo new tracked project files were detected on %s.\n' "$remote_base"
fi

# Current branch already includes remote main.
if [[ "$behind" -eq 0 ]]; then
  printf '\nWorkspace synchronized.\n\n'
  printf 'Current branch: %s\n' "$branch"
  printf 'Remote main: current\n'
  printf 'Workspace is ready for review.\n'
  exit 0
fi

# A branch that has unique work and is also behind main cannot fast-forward.
if [[ "$ahead" -gt 0 ]]; then
  warn "Current branch contains local commits and is behind $remote_base."
  printf '\nNo merge, rebase, reset, branch switch, or force operation was performed.\n'
  printf 'The newly uploaded files are visible through %s, but they are not yet incorporated into %s.\n' \
    "$remote_base" "$branch"
  printf '\nRecommended next action:\n'
  printf '  git rebase %s\n' "$remote_base"
  exit 4
fi

# No unique local commits: safe fast-forward.
printf '\nApplying safe fast-forward update...\n'
git merge --ff-only "$remote_base"
ok "Workspace updated successfully."

printf '\nWorkspace synchronized.\n\n'
printf 'Current branch: %s\n' "$branch"
printf 'Remote main: %s commit(s) applied\n' "$behind"

if [[ -n "$changed_files" ]]; then
  printf '\nNew files are now available in the workspace.\n'
fi

printf '\nWorkspace is ready for review.\n\n'
git status -sb
