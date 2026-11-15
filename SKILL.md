---
name: am-code
description: Alight Motion XML coding skill for AI agents. Analyze, validate, and author importable XML projects for motion graphics, transforms, fills, and animation keyframes; use when working with exported Alight Motion XML, not for generic video editing advice.
---

# am-code — Alight Motion XML coding skill for AI agents

Create importable Alight Motion projects from the documented schemas in this skill. Treat the XML format as reverse-engineered and version-sensitive: preserve unknown attributes, ordering, and numeric precision. A supplied export is needed only for an undocumented feature, not for ordinary authoring.

## Use the knowledge base

- Start with `references/authoring.md`, then read only the topic reference needed for the requested edit.
- For built-in geometry or custom silhouettes (heart, leaf, person, logo, spiral), read `references/shapes-and-paths.md`.
- For layer opacity, fades, and compositing, read `references/blending-and-opacity.md`.
- For strokes, borders, outlines, and drop shadows, read `references/borders-and-shadows.md`.
- For layer effects, read `references/effects-move-transform.md`; character/time effect IDs are cataloged in `references/text-layers.md`.
- For hand drawing, vector drawing, groups, masks, and timeline markers, read `references/drawings-groups-masks.md`.
- For native text layers, font references, alignment, wrapping, and text outlines, read `references/text-layers.md`.
- For cameras, nulls, parenting, pivots, and nested composition timing, read `references/camera-and-groups.md`.
- For scene timing, keyframe time values, audio, and media declarations, read `references/timing-media-and-audio.md`.
- Use `xmls/` only as a private, temporary research inbox when the request needs an undocumented feature. Analyze it, distill the rule into a reference, then remove it. XML files are never required for normal skill use and never committed.
- During research only, use `npm run compare -- before.xml after.xml` to isolate one controlled change, then add the distilled rule to its topic reference.

## Authoring rules

- Start from the documented layer schema and make the smallest change necessary. Keep XML declaration, scene metadata, child order, and numeric precision consistent within the project.
- Generate unique layer IDs within a scene. Keep layer start/end times within `scene.totalTime`; update scene duration when adding timed content.
- A property is either static (`value="…"`) or keyed (`<kf …/>` children), never both unless its documented schema says otherwise.
- Preserve keyframe order and the exact easing string format (`e="cubicBezier …"`).
- Before delivery, validate XML and import-test it when possible. State which requested behavior needs a new research probe.

## Evidence boundary

This skill documents basic scene metadata; scene media and audio layers; native text layers, including default text-box pivots and alignment behavior; cameras, nulls, parent links, and nested groups; layer effects, including move/transform, character/time, color, wipe, texture, and 3D-extrude IDs; parametric and custom vector shapes; static color/gradient/no-fill/image-media modes; opacity, blend modes, path strokes, borders, shadows; drawings; masks; bookmarks; clockwise positive rotation in the tested coordinate system; and normalized layer-relative keyframe timestamps. Effects use the same layer-level XML placement regardless of layer type. It does not yet document unlisted effects, the visual semantics of blend/mask modes, camera coordinate axes, multi-effect render order, parenting math, audio automation, animated media behavior, holes/compound paths, or every graph/easing behavior. For those, use a one-change research export rather than inventing schema.

## Repository map

- `xmls/` — ignored, temporary local research inbox; empty in the published skill.
- `scripts/` + `src/` — reusable inspection and validation tooling.
- `references/` — maintained, human/agent-readable format knowledge and research procedure.
