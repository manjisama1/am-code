# Observed XML format notes

## Scene and basic shapes — confirmed

Evidence: `001.xml`, `002.xml`, `003.xml`, `004.xml`, `blending and opacity .xml`, `border and shadow.xml`, `move a .xml`, `move& transform.xml`, `shape-edit.xml`, `shape1.xml`, `shape2.xml`, `transparent-customdimention.xml`.

- XML is a plain document with a `scene` root; an empty scene is self-closing.
- Canvas dimensions are held in `width`/`height` and export dimensions in `exportWidth`/`exportHeight`. Both 1080×1080 and 812×722 exports exist.
- `bgcolor` uses `#AARRGGBB`; `#00000000` exports a transparent canvas.
- Shape layers are direct `scene` children. The samples use `.rect` and `.circle`, `transform.location`, `fillColor`, and a `property` named `size` with type `vec2`.
- The 2015-duration samples use `startTime="0"` and `endTime="2015"` for each shape. Duration is likely milliseconds; treat that unit as provisional until isolated duration probes exist.
- Animated values are represented by `kf` elements with normalized-looking `t` values and optional cubic-Bezier `e` strings.

## Transform animation — confirmed structure

Evidence: `move& transform.xml` (a multi-change coverage export; values below establish encoding, not an exhaustive semantic model).

- `scale`, `rotation`, `skew`, and `location` can be static siblings or keyed children of `transform`.
- Keyed scale uses a two-component value (observed `1.000000,1.000000` to `0.675000,0.675000`); keyed rotation uses a scalar (observed `0.000000` to `-135.000000`).
- Keyed skew uses two components. The sample independently changes the first (`0.301942,0.000000`) and second (`0.000000,0.349066`) component.
- Keyed location uses three components. The sample animates horizontal position and independently changes the third component from `0.000000` to `487.890625`.
- The first keyframe `t` is observed as both `0.000000` and `0.003970`; preserve the timing convention of the selected baseline rather than forcing one value.
- The second keyframe carries an optional `e="cubicBezier x1 y1 x2 y2"` string. Preserve the four-number format and do not substitute a named easing without XML evidence.

## Shape size editing — confirmed structure

Evidence: `shape-edit.xml` (a multi-change coverage export).

- Rectangular shape dimensions use `<property name="size" type="vec2">`.
- A static size is encoded as a two-component `value`, including non-uniform values such as `154.000000,151.999939`; preserve exported precision rather than rounding it.
- An animated size replaces the static `value` with `kf` children. The sample independently changes the first component (`100.000000,100.000000` to `147.000000,100.000000`) and second component (`100.000000,100.000000` to `100.000000,199.000000`).
- A size keyframe can carry the same cubic-Bezier `e` attribute used by transform keyframes.

## Parametric and custom vector shapes — confirmed structure

Evidence: `shape1.xml`, `shape2.xml`. Read `shapes-and-paths.md` for the complete, reusable schemas.

- Built-in geometry is selected by the `shape.s` code and configured through typed `property` children.
- Direct-point geometry is observed for triangle, quad, and irregular pentagon variants through `p1`, `p2`, and further `vec2` properties.
- A custom shape omits `s` and uses a `path` child. Its `d` attribute is observed with SVG-style absolute `M`, `L`, `C`, and `Z` commands.
- `.line` and `.arc` combine `fillType="none"` with a `path-stroke` child containing color and width.

## Opacity and blend mode — confirmed structure

Evidence: `blending and opacity .xml`. Read `blending-and-opacity.md` for the complete token list and authoring constraints.

- A static `transform.opacity` uses a normalized scalar `value`; a keyed opacity uses `kf` children with scalar values.
- Layer blending is serialized as an optional `shape.blending` attribute.
- The sample includes darken, lighten, contrast, difference, component, `mask`, and `exclude` tokens.

## Path stroke, border, and shadow — confirmed structure

Evidence: `border and shadow.xml`. Read `borders-and-shadows.md` for complete patterns and constraints.

- `path-stroke` supports a nested static or keyed size and observed `direction`, `end-size`, `cap`, `join`, and `enabled` attributes.
- `border` is a direct shape child with `id="1"`, a direction, and nested color/size values or keyframes.
- `shadow` is a direct shape child; an outside shadow with keyed opacity, size, and vec2 offset is observed.

## Move and transform effects — confirmed structure

Evidence: `move a .xml`. Read `effects-move-transform.md` for the full ID and property inventory.

- An effect is a direct shape child with a namespaced `id`, `locallyApplied="true"`, and typed static `property` children.
- The sample establishes shake, oscillate, jitter, move-along-path, pulsate, transform, spin, stretch, offset, random displacement, scale assist, and swing effect schemas.
- `com.alightcreative.effect.movealongpath3` is the observed move-along-path ID; its namespace segment is singular.

## Fill modes and media — confirmed structure

Evidence: `004.xml` (a multi-change coverage export; use dedicated one-change probes to establish visual semantics).

- `shape.fillType` is observed as `color`, `gradient`, `none`, and `media`.
- Radial and sweep gradients use a `gradient` child with `type="radial"` or `type="sweep"`, `startColor`, `endColor`, `start`, and `end`.
- A scene-level `media` item has `uri`, `type`, `duration`, `orientation`, `infoUpdated`, `width`, and `height` attributes in the observed image export.
- A media-filled shape uses `fillType="media"` and `fillImage` equal to that media item’s Android `content://` URI.
- The sample's static shape layers use `mediaFillMode="fill"`; no other mode is established.

## Open questions

- Exact timeline-unit semantics, coordinate origin, z-order, and defaults/omission behavior need controlled probes.
- No samples currently establish text, audio, groups, or parenting.
- `004.xml` combines several changes, so it does not prove which visual behavior belongs to each fill configuration. Its external Android media URI is not portable project packaging evidence.
- `move& transform.xml` combines transforms. It confirms their XML shape, but not coordinate origin, third-axis semantics, skew units, or the complete graph-editor/easing model.
- `shape-edit.xml` combines size changes. It confirms two-axis size encoding but not the UI meaning of every shape-edit control or the full behavior for circles and custom shapes.
- `shape1.xml` and `shape2.xml` establish broad shape coverage but are not one-change probes. Complex path grammar, compound contours, custom-path strokes, and custom path animation remain unverified.
- `blending and opacity .xml` confirms opacity and blend serialization, but not the exact render result of each blend token, mask behavior, or the graph-editor meaning of its nonchronological keyframe order.
- `border and shadow.xml` establishes only the observed directions and nested property encoding; it does not prove border IDs beyond `1`, multiple borders/shadows, shadow color, blur behavior, or custom-path stroke behavior.
- `move a .xml` establishes only static inputs on one effect per layer. Effect input animation, stacking, order, and the full visual semantics need dedicated probes.
