# am-code — Alight Motion XML Coding Skill for AI Agents

**am-code** is an evidence-driven Alight Motion XML coding skill for AI agents, including Codex and Claude. It analyzes exported Alight Motion project XML and helps agents create importable motion graphics, custom vector shapes, animated transforms, movement effects, keyframes, fills, gradients, and image-media references from verified patterns.

Use this repository when you need Alight Motion XML code rather than general editing advice. The skill keeps confirmed XML behavior separate from untested assumptions, so agents can make reliable project edits without inventing a schema.

## Quick start

```bash
npm install
npm run validate
npm run scan
npm run compare -- 001.xml 003.xml
```

Drop new Alight Motion XML exports into `xmls/`. This local evidence folder is intentionally ignored by Git, so private project files and device-specific media URIs cannot be pushed accidentally. Keep each probe focused on one UI change; then scan, compare it with the baseline, and update the matching reference note only after confirming the behavior in Alight Motion. The committed references contain the reusable XML rules; local filenames cited as evidence are intentionally not included in Git.

The root [`SKILL.md`](SKILL.md) is the agent entrypoint. It deliberately distinguishes confirmed XML structures from hypotheses, which keeps generated projects safer to import.

Generated analysis goes to `reports/` and is not committed. Historical exploratory artifacts remain under `research/`.
