# am-code — Alight Motion XML Coding Skill for AI Agents

**am-code** is an evidence-driven Alight Motion XML coding skill for AI agents, including Codex and Claude. It analyzes exported Alight Motion project XML and helps agents create importable motion graphics, custom vector shapes, animated transforms, movement effects, keyframes, fills, gradients, and image-media references from verified patterns.

Use this repository when you need Alight Motion XML code rather than general editing advice. The skill keeps confirmed XML behavior separate from untested assumptions, so agents can make reliable project edits without inventing a schema.

## Use as a skill

Read [`SKILL.md`](SKILL.md), then open only the topic reference needed for the edit.

The published skill contains no project XML examples. Its references hold the distilled schemas needed for ordinary authoring, which keeps agent context small and prevents private projects from being sent to GitHub.

`xmls/` is an ignored, optional local research inbox. Use it only to reverse-engineer a feature that is not documented yet: add a controlled export, run the analysis tools, capture the new rule in `references/`, then delete the probe. The root [`SKILL.md`](SKILL.md) is the agent entrypoint.

The optional Node tools validate and compare research XML; normal skill use needs no XML files or local installation.
