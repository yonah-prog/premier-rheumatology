# WO-012 — Infra: unblock git on the agent's repo mount (un-removable index.lock + missing push auth)

**Type:** Infrastructure / DevOps (not SEO content)
**Status:** ✅ **RESOLVED 2026-09-02.** Pushes to `origin/main` work — four commits pushed on 2026-09-02 (`a42f2ca`, `3c17cea`, `534754e` plus a concurrent session's `00f1963`), each auto-deploying via Vercel. The index.lock / mount symptoms are not recurring. Reopen with fresh evidence if push or commit starts failing again.
**Opened:** 2026-06-02 (midday pass)
**Owner:** Human / repo admin (push auth + permanent mount fix cannot be resolved from the agent session)

> **2026-06-04 BREAKTHROUGH — the lock blocker is workaroundable.** Root cause #1 was misdiagnosed as "unfixable." The mount denies `unlink` (`rm`) but **allows `rename` (`mv`)**. So the stale `.git/index.lock` can be cleared by *renaming* it aside (`mv .git/index.lock .git/index.lock.bak`) instead of `rm`-ing it. After doing that, `git add`/`git commit` succeed (loose-object and ref updates finalize via rename, which works — only the post-write cleanup `unlink` of the lock/tmp files fails, emitting harmless warnings). This morning's pass cleared the lock this way and **committed the recovered backlog + WO-011** locally. Practical recipe for future passes: before each git write, run `find .git -name '*.lock' -exec mv {} {}.old \;` to clear any stale lock left by the previous op's failed unlink. **Root cause #2 (no push auth) is unchanged:** still no `~/.ssh` key in-session and SSH → `Permission denied (publickey)`; HTTPS read works but no push token. So committed work still cannot be pushed/deployed from the agent session.

## Problem
The autonomous SEO agent can read the repo and edit files, but **cannot complete any git write or push**, so all on-site work it produces (commits + the unpushed local commit + uncommitted candidate fixes) never deploys. This has recurred on every pass since ~2026-05-31.

### Two independent, confirmed root causes
1. **Stale `.git/index.lock` that cannot be removed.** A 0-byte `.git/index.lock` is present. On the repo mount (virtiofs), `rm`/`mv`/unlink return **"Operation not permitted"** — confirmed reproducible: a freshly `touch`ed temp file in a dir the agent owns also cannot be deleted, while `touch`/create succeeds. Result: every index-writing op (`git add`, `git commit`, `git stash`, `git checkout`) fails with *"Unable to create '…/.git/index.lock': File exists."*
2. **No push credentials in the agent session.** There is **no `~/.ssh` directory and no key**. `git ls-remote origin` (SSH) → **"Host key verification failed."** HTTPS read works (public repo) but there is no token/credential for push. Even a fresh clone could not be pushed from this session.

### Current tree state (for reference)
- Local `main = 0a3705a` is **1 commit ahead of `origin/main = ed6f046`** (unpushed 2026-06-01 evening commit).
- Uncommitted in working tree (pre-existing, **not** created by the agent): `vercel.json` (WO-008 cleanUrls candidate — preserve/test, don't auto-ship), an append to `seo-daily-notes/2026-05-31.md`.
- Untracked: today's daily notes + new WO files, and a stray `_gittest.tmp` (also un-removable).

## Requested actions (human, from a normally-permissioned environment)
1. **Clear the lock + clean the tree:** `rm -f .git/index.lock _gittest.tmp`, then `git status` to confirm a clean, sane state.
2. **Decide the pending `vercel.json` change** (it is the WO-008 clean-URL/404 fix candidate): test on a Vercel preview deploy that `/about`, `/conditions`, `/florida`, `/new-york`, `/team`, `/contact`, and `/conditions/<slug>` return **200** (not 404) before merging. Back it up first.
3. **Restore push auth for the agent:** either (a) add a deploy SSH key + `known_hosts` entry for github.com, or (b) switch `origin` to authenticated HTTPS with a scoped token. Then **push the unpushed commit + today's new daily-note and WO files** so the work actually deploys.
4. **Fix the mount permission** so the agent can unlink/rename inside its working copy (or give it a writable clone on a normal filesystem), so this stops recurring every pass.

## Acceptance
- Agent session can run `git add/commit` and `git push origin main` end-to-end without manual intervention.
- `origin/main` is current with local work; Vercel deploys reflect the latest committed state.
