# Authoring importable projects

Use the documented schema in this repository for supported features. Preserve values and element order where a reference calls for it. Use a private research export only when the requested feature is not documented.

## Confirmed patterns

- `<scene>` carries canvas size, export size, background color, duration, fps, app/version stamps, and timing options.
- A basic `<shape>` layer uses unique `id`, `label`, `startTime`, `endTime`, `fillType`, `mediaFillMode`, and `s` attributes. Confirmed shape codes are `.rect` and `.circle`.
- For parametric shapes and custom vector artwork, use the exact schemas in `shapes-and-paths.md`. A custom path shape has no `s` attribute and carries a `path d="…"` child; do not mix it with an assumed built-in shape schema.
- Static transform values use `<location value="x,y,z"/>`, `<scale value="x,y"/>`, `<rotation value="degrees"/>`, or `<skew value="x,y"/>` inside `<transform>`.
- A static property uses `value`; an animated one nests `<kf t="…" v="…" e="cubicBezier …"/>`. Confirmed animated properties include `location`, `scale`, `rotation`, `skew`, `fillColor`, and `property name="size" type="vec2"`. Shape size keyframes use two components and can animate either component independently. `location` accepts three components and the samples animate both horizontal position and the third component; do not label that component or its visual result without a dedicated probe.
- Color encoding is `#AARRGGBB`. A scene background of `#00000000` is a transparent canvas.
- Confirmed fills are `color`, `gradient`, `none`, and `media`. A radial or sweep gradient is represented by a `gradient` child with `type`, `startColor`, `endColor`, `start`, and `end` attributes. `fillType="media"` references a scene-level `media` element through `fillImage`.
- Layer opacity is a child of `transform`; blend mode is the optional `blending` attribute on `shape`. Read `blending-and-opacity.md` for confirmed values and keyframe rules.
- Outlines may use `path-stroke` or `border`; a shadow is a sibling child of the shape. Read `borders-and-shadows.md` for observed directions, nesting, and animation patterns.
- Effects are direct children of the layer they modify—not shape-only or text-only—and use a full namespaced `id`, `locallyApplied="true"`, and typed `property` values. Read `effects-move-transform.md` and the character/time catalog in `text-layers.md` rather than guessing IDs or input names.
- Drawings and groups are `drawing` and `embedScene` layers rather than ordinary `shape` layers. Read `drawings-groups-masks.md` for their nested structures, mask ordering, and frame markers.
- Native text uses a direct `text` layer with attributes for font, size, alignment, and wrapping. Read `text-layers.md` for the exact schema and portable-font constraints.
- Cameras, null objects, parent links, audio, and media declarations use their own direct scene-child layer schemas. Read `camera-and-groups.md` and `timing-media-and-audio.md` before authoring them.

## Motion graphics workflow

1. Translate the requested design into layers, timing, transforms, colors, and known keyframe patterns.
2. Copy a known-good scene and preserve its root metadata. Make layer IDs unique and labels readable.
3. Use static attributes for constants and child `kf` elements for animation. Add an easing string only when it is intentional.
4. Ensure each layer's time span falls inside scene duration; set `totalTime` in milliseconds based on evidence.
5. Validate, compare with the baseline, then import into Alight Motion. Save the imported/exported round-trip as a new probe if the app changes it.

## Unverified features

Effects beyond the documented catalogs, animation of undocumented effect inputs, multi-effect render order, parenting math, advanced text styling/animation, non-basic shape geometry, audio automation, animated or portable media, and blend compositing semantics beyond serialized tokens need further exports. Media URIs in the observed schema are device-specific; never promise that copying one will package an image or audio file for another device. Isolate one feature per probe before adding an authoring rule.
