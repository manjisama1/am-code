# Move and transform effects

Evidence: local `move a .xml`.

Each observed effect is a direct child of `shape`, following `fillColor`, and has a complete namespaced `id` plus `locallyApplied="true"`:

```xml
<effect id="com.alightcreative.effects.spin" locallyApplied="true">
  <property name="rpm" type="float" value="60.000000" />
</effect>
```

Keep the IDs, property names, types, and numeric precision exact. The sample proves one effect per layer with static property values; it does not establish multiple effects on a layer, property keyframes, effect ordering, or the exact visual result of every parameter.

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

## Safe authoring workflow

1. Copy the whole `<effect>` block for the selected effect from a compatible local export.
2. Change only confirmed property values and retain every required property unless a one-change export proves it optional.
3. Keep `locallyApplied="true"` and use `true`/`false` for boolean values, integer literals for `int`, and six-decimal values for floats.
4. Import-test the project after editing; use a new dedicated export before adding keyframes to effect inputs or combining effects.
