# Always ENOUGH™ — Web Platform

Start here: **`CLAUDE.md`**. It is the root context file and is read automatically by Claude Code
when this repository is opened in VS Code or the Claude Code CLI. It links to everything else.

## Order of reading, for a human or an AI opening this project for the first time

1. `CLAUDE.md` — what this is, non-negotiables, how the repo is organised
2. `PROMISE.md` — what the system must always/never do, what "finished" means
3. `docs/USER_EXPERIENCE_FIRST.md` — who this is for and why
4. `docs/BRAND_CONTEXT.md` — voice, tokens, non-negotiables
5. `docs/ARCHITECTURE.md` and `docs/ENGINEERING_RULES.md`
6. `docs/ATTACK_ANALYSIS.md` and `docs/INSPECTION_CHECKLIST.md`
7. `docs/PRODUCT_HARDENING_AND_SCALING.md`
8. `stages/01-discovery/STAGE.md` onward, in order

## Getting the environment running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. This is currently a placeholder homepage — real pages are
built stage by stage, starting at `stages/01-discovery/`.

## The method this project follows

This repository is structured so that the folders themselves are the plan: promise the rules
before writing code, attack the plan before building, inspect against a named checklist before
shipping, and keep every stage small enough to understand in one page. See each `STAGE.md` for
what that means at each step.
