# Format coverage and research boundaries

The topic references are the source of truth for documented XML. This compact index avoids duplicating examples or retaining private exports.

## Documented

- Scenes, dimensions, transparent backgrounds, layer timing, keyframes, native text layers, and documented layer effects
- Rect, circle, parametric shapes, direct-point geometry, custom SVG-style paths, and hand drawings
- Fills, gradients, image-media references, opacity, blend tokens, strokes, borders, and shadows
- Transform values and animation: location, scale, rotation, skew, and size
- Movement/transform effect IDs with static typed inputs
- Groups, mask groups, inverted-mask groups, and scene bookmarks

## Research before using

- Audio, parenting, advanced text styling/animation, and unlisted effects
- Animation of undocumented effect inputs, multiple effect stacks, and effect order
- Animated/portable media, blend compositing details, and complex mask behavior
- Compound paths, holes, relative path commands, arcs, and path-keyframe animation
- Multiple borders/shadows, shadow color/blur, stroke dashes, and undocumented caps/joins
- Exact coordinate origin, third-axis semantics, skew units, and complete graph-editor behavior

Use `research-workflow.md` for an undocumented feature. Add only the distilled result to the relevant topic reference, then remove the private XML probe.
