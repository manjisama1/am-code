# Authoring importable projects

Use the closest compatible sample in `xmls/` as the baseline. Do not build a scene from an imagined schema when a real export is available.

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
- Effects are direct `shape` children and use a full namespaced `id`, `locallyApplied="true"`, and typed `property` values. Read `effects-move-transform.md` rather than guessing effect IDs or input names.

## Motion graphics workflow

1. Translate the requested design into layers, timing, transforms, colors, and known keyframe patterns.
2. Copy a known-good scene and preserve its root metadata. Make layer IDs unique and labels readable.
3. Use static attributes for constants and child `kf` elements for animation. Add an easing string only when it is intentional.
4. Ensure each layer's time span falls inside scene duration; set `totalTime` in milliseconds based on evidence.
5. Validate, compare with the baseline, then import into Alight Motion. Save the imported/exported round-trip as a new probe if the app changes it.

## Unverified features

Text, audio, effects beyond the documented border/shadow and move/transform effects, animated effect inputs, multi-effect stacks, groups/parenting, non-basic shape geometry, animated or portable media, and blend compositing semantics beyond the observed tokens need further exports. Media URIs in the current samples use Android `content://` references and are device-specific; never promise that copying one will package the image for another device. Isolate one feature per probe before adding an authoring rule.
