---
name: am-code
description: Alight Motion XML coding skill for AI agents. Analyze, validate, and author importable XML projects for motion graphics, transforms, fills, and animation keyframes; use when working with exported Alight Motion XML, not for generic video editing advice.
---

# am-code — Alight Motion XML coding skill for AI agents

Create importable Alight Motion projects from XML only when the requested elements and attributes are supported by repository evidence or by a supplied exported reference. Treat the XML format as reverse-engineered and version-sensitive: preserve unknown attributes, ordering, and project stamps from the closest compatible sample.

## Start here

- Place new exports in `xmls/`; do not overwrite or hand-normalize the originals.
- Run `npm run validate` and `npm run scan` after adding samples. The generated report is ignored by Git.
- For a feature request, read `references/authoring.md`. For a new feature discovery, follow `references/research-workflow.md`.
- For built-in geometry or custom silhouettes (heart, leaf, person, logo, spiral), read `references/shapes-and-paths.md` before authoring.
- For layer opacity, fades, and compositing, read `references/blending-and-opacity.md` before authoring.
- For strokes, borders, outlines, and drop shadows, read `references/borders-and-shadows.md` before authoring.
- For movement and transform effects, read `references/effects-move-transform.md` before authoring.
- Use `npm run compare -- before.xml after.xml` to isolate one controlled change. Convert confirmed findings into `references/format-notes.md` with source filenames and confidence.

## Authoring rules

- Start from the nearest known-good export and make the smallest change necessary. Keep the XML declaration, comment header, scene metadata, child order, and numeric precision unless evidence shows otherwise.
- Generate unique layer IDs within a scene. Keep layer start/end times within `scene.totalTime`; update scene duration when adding timed content.
- A property is either static (`value="…"`) or keyed (`<kf …/>` children), never both unless an exported sample proves that encoding.
- Normalize keyframe `t` values to the project timeline convention found in the chosen baseline. Preserve the exact easing string format (`e="cubicBezier …"`).
- Before delivery, validate XML and inspect a diff against the baseline. State which behaviors are confirmed by samples and which need an import/export probe.

## Evidence boundary

The included samples confirm basic scene metadata, parametric shape layers, custom SVG-style vector paths, static color/gradient/no-fill/image-media modes, layer opacity and blend tokens, path strokes, borders, drop shadows, and a set of movement/transform effects with static parameters. They also confirm keyed location, scale, rotation, skew, and two-axis shape-size animation with cubic-Bezier easing. They do not prove text, unlisted effects, animation of effect inputs, multi-effect stacking, parenting, audio, animated media behavior, holes/compound paths, blend compositing semantics in every context, or every graph/easing behavior. For those, ask for or create a one-change export probe instead of inventing schema.

## Repository map

- `xmls/` — immutable incoming exports and controlled probes.
- `scripts/` + `src/` — reusable inspection and validation tooling.
- `references/` — maintained, human/agent-readable format knowledge and research procedure.
- `research/` — historical observations and diffs; evidence, not an authoring template.
