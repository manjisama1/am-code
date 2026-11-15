# Layer effects: move and transform

Each effect is a direct child of the layer it modifies and has a complete namespaced `id` plus `locallyApplied="true"`. Its XML placement is layer-agnostic: use the same block on any editable layer type rather than treating it as shape-only:

```xml
<effect id="com.alightcreative.effects.spin" locallyApplied="true">
  <property name="rpm" type="float" value="60.000000" />
</effect>
```

Keep the IDs, property names, types, and numeric precision exact. This skill documents one effect per layer with static property values; multi-effect stacks, property keyframes, effect ordering, and the exact visual result of every parameter remain research topics.

## Observed effect schemas

| Effect ID | Confirmed properties |
|---|---|
| `com.alightcreative.effects.shake2` | `mag: float`, `freq: float`, `evolution: float`, `seed: float`, `angle: float`, `slack: float`, `zshake: float` |
| `com.alightcreative.effects.oscillate3` | `direction: int`, `angle: float`, `freq: float`, `mag: float`, `type: int`, `phase: float` |
| `com.alightcreative.effects.jitter` | `angle: float`, `freq: float`, `mag: float`, `seed: float`, `slack: float`, `zjitter: float` |
| `com.alightcreative.effect.movealongpath3` | `progress: float`, `angle: float`, `tangent: bool`, `inset: float` |
| `com.alightcreative.effects.pulsate2` | `freq: float`, `minsize: float`, `maxsize: float`, `phase: float`, `type: int` |
| `com.alightcreative.effects.transform` | `scale: float`, `angle: float`, `maskToLayer: bool`, `alpha: float`, `fill: float`, `sample: int` |
| `com.alightcreative.effects.spin` | `rpm: float` |
| `com.alightcreative.effects.stretch2` | `scale: float`, `angle: float`, `contentOnly: bool` |
| `com.alightcreative.effects.offset` | `feather: float`, `mask: bool` |
| `com.alightcreative.effects.randomdisplace` | `mag: float`, `evolution: float`, `seed: float`, `scatter: float` |
| `com.alightcreative.effects.scaleassist` | `axis: int`, `scale: float`, `damp: float` |
| `com.alightcreative.effects.swing2` | `freq: float`, `a1: float`, `a2: float`, `phase: float`, `type: int` |

`movealongpath3` is intentionally under `com.alightcreative.effect` (singular), unlike the other observed IDs. Do not normalize it to `effects`.

## Additional verified effect schemas

These IDs and property names are also serialized in the researched projects. Keyed properties use the standard `<kf>` child form.

| Effect ID | Confirmed properties |
|---|---|
| `com.alightcreative.effects.brightcont2` | `brightness: float`, `contrast: float` |
| `com.alightcreative.gradientmap` | `color1: color`, `color2: color` |
| `com.alightcreative.effects.wipe2` | `start: float` (keyed), `end: float`, `angle: float`, `feather: float` |
| `com.alightcreative.effects.lumakey3` | `lowThreshold: float`, `highThreshold: float`, `feather: float`, `invert: bool`, `weighted: bool` |
| `com.alightcreative.effects.ridges2` | `evolution: float` (keyed), `scale: float`, `stretch: vec2`, `intensity: float`, `seed: float`, `color1: color`, `color2: color`, `octaves: float` |
| `com.alightcreative.effects.lift` | `fill: float` |
| `com.alightcreative.effects.extrude` | `orient: quat` (keyed), `widthRatio: float`, `heightRatio: float`, `depth: float`, `strength: float`, `position: vec3`, `scale: float`, `interiorColor: color`, `interiorBlend: float`, `fadeColor: color`, `fadeBlend: float`, `shadingType: int`, `lightIntensity: float`, `shine: float`, `spec: float`, `ambient: float`, `lightColor: color`, `lightDir: vec2`, `lightDepth: float`, `MAX_ITER: float` |

These files establish serialization and property types, not the visual behavior, value units, or safe ranges of the effects. No blur, RGB split/chromatic aberration, glitch, CRT, invert, bloom/glow, vignette, grain/noise, mirror, wave, mosaic, or dedicated 3D-transform effect ID appears in the current probes.

## Safe authoring workflow

1. Create the whole `<effect>` block from the selected table entry.
2. Change only confirmed property values and retain every required property unless a one-change export proves it optional.
3. Keep `locallyApplied="true"` and use `true`/`false` for boolean values, integer literals for `int`, and six-decimal values for floats.
4. Import-test the project after editing; use a new dedicated export before adding keyframes to effect inputs or combining effects.
