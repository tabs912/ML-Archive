#!/usr/bin/env bash
set -euo pipefail

BASE_BRANCH="${CODELAB_PR_BASE_BRANCH:-main}"
REMOTE_BASE="origin/$BASE_BRANCH"

BINARY_REGEX='\.(pdf|xlsx|xlsm|docx|pptx|png|jpg|jpeg|gif|zip)$'

echo
echo "CodeLab pull request preparation"
echo "================================"
echo

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: Not inside a Git repository." >&2
  exit 1
fi

root="$(git rev-parse --show-toplevel)"
cd "$root"

echo "Repository: $root"
echo "Branch:     $(git branch --show-current)"
echo "PR base:    $REMOTE_BASE"
echo

echo "Removing binary files from staged changes..."

binary_pathspecs=(
  ':(glob,icase)**/*.pdf'
  ':(glob,icase)**/*.xlsx'
  ':(glob,icase)**/*.xlsm'
  ':(glob,icase)**/*.docx'
  ':(glob,icase)**/*.pptx'
  ':(glob,icase)**/*.png'
  ':(glob,icase)**/*.jpg'
  ':(glob,icase)**/*.jpeg'
  ':(glob,icase)**/*.gif'
  ':(glob,icase)**/*.zip'
)

git restore --staged -- "${binary_pathspecs[@]}" 2>/dev/null || true

echo
echo "Remaining staged files:"
staged_files="$(git diff --cached --name-only)"

if [[ -n "$staged_files" ]]; then
  printf '%s\n' "$staged_files"
else
  echo "None"
fi

if printf '%s\n' "$staged_files" | grep -Ei "$BINARY_REGEX" >/dev/null; then
  echo
  echo "ERROR: Binary files remain staged:"
  printf '%s\n' "$staged_files" | grep -Ei "$BINARY_REGEX"
  exit 1
fi

echo
echo "Checking committed branch changes..."

if git show-ref --verify --quiet "refs/remotes/$REMOTE_BASE"; then
  committed_binaries="$(
    git diff --name-only "$REMOTE_BASE"...HEAD |
      grep -Ei "$BINARY_REGEX" || true
  )"

  if [[ -n "$committed_binaries" ]]; then
    echo
    echo "ERROR: The branch contains committed binary changes that would"
    echo "appear in a pull request against $REMOTE_BASE:"
    printf '%s\n' "$committed_binaries"
    echo
    echo "Unstaging cannot remove files that are already committed."
    echo "Correct the branch history before creating the pull request."
    exit 2
  fi
else
  echo "WARNING: $REMOTE_BASE is unavailable."
  echo "Committed PR changes could not be checked."
  echo "Run: git fetch origin --prune"
  exit 3
fi

echo
echo "Checking excluded repository areas..."

excluded_changes="$(
  {
    git diff --cached --name-only
    git diff --name-only "$REMOTE_BASE"...HEAD
  } |
    sort -u |
    grep -E '(^|/)Archive_To_Move/' || true
)"

if [[ -n "$excluded_changes" ]]; then
  echo
  echo "ERROR: Excluded Archive_To_Move files are present:"
  printf '%s\n' "$excluded_changes"
  exit 4
fi

echo
echo "Repository is ready for pull-request review."
echo "No staged or committed binary changes were detected."
