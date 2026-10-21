# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues on `bholmesdev/hubble.md`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## GitHub account

One account owns a piece of work. An issue and the PR that fixes it must be
authored by the same account, so the thread reads as one person's work and a
link from one to the other resolves.

This machine has several accounts signed in. `gh` picks one on its own, and
which one it picks is not obvious. The keychain entry and
`~/.config/gh/hosts.yml` can name different accounts, and `gh` rewrites
`hosts.yml` as accounts are used, so the account a bare `gh` command runs as
can change partway through a session. Do not rely on the default.

Before the first write, resolve the account and use it for every write in
that piece of work:

```bash
gh api user --jq .login
```

If that is not the account that should own the work, or the work needs the
fork owner (for a cross-fork PR), select the account explicitly for each
command:

```bash
GH_TOKEN=$(gh auth token --user <account>) gh issue create --title "..." --body "..."
GH_TOKEN=$(gh auth token --user <account>) gh pr create --head <owner>:<branch> --base main ...
```

`GH_TOKEN` scopes the command to that account. `gh auth switch` changes the
default for every later command, which is the thing to avoid.

In this repo, `hwong103` owns the fork (`hwong103/hubble.md`) and is the
account to use for both issues and PRs against `bholmesdev/hubble.md`. A
cross-fork PR must be opened by the fork's owner, so a PR opened by any
other account will be rejected.

Git pushes go over SSH as `hwong103` regardless of which account the `gh`
commands use, so the two can disagree. Check both before writing:

```bash
gh api user --jq .login
ssh -T git@github-hwong103
```

`hwong103` can open issues in `bholmesdev/hubble.md` but cannot delete them
or apply labels to them; those need a maintainer. If a write is rejected
with a permissions error, say so rather than switching accounts to work
around it.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
