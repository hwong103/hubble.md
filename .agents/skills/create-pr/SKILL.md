---
name: create-pr
description: Open a pull request for the current branch. Use whenever asked to make/create/open a PR.
---

# Create a PR

Run the `changelog` skill before or right after opening the PR.

Use `.github/pull_request_template.md` for the PR body.

## GitHub account

The PR and the issue it fixes must be authored by the same account. Check
which account `gh` will use before writing, and name it explicitly if it is
not the right one:

```bash
gh api user --jq .login
GH_TOKEN=$(gh auth token --user <account>) gh pr create --head <owner>:<branch> --base main ...
```

`GH_TOKEN` scopes the command to one account. `gh auth switch` changes the
default for every later command, so avoid it.

A cross-fork PR must be opened by the fork's owner, so a PR opened by any
other account is rejected. See `docs/agents/issue-tracker.md` for the
account to use in this repo and the permissions it has.
