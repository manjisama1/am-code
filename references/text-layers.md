# Native text layers

Use a direct `<text>` layer for plain text. It is not a `shape`, `drawing`, or `embedScene` layer.

```xml
<text id="UNIQUE_ID" startTime="0" endTime="2015"
      fillType="color" mediaFillMode="fill"
      size="32.000000"
      font="googlefonts?name=Roboto&amp;weight=900"
      wrapWidth="512" align="center">
  <transform>
    <location value="540.000000,540.000000,0.000000" />
  </transform>
  <fillColor value="#ffdd44dd" />
  <content>Hello</content>
</text>
```

## Required authoring pattern

- Use a unique `id`, `startTime`, `endTime`, `fillType="color"`, and `mediaFillMode="fill"`.
- Set `size` as a six-decimal scalar.
- Use `wrapWidth` as an integer and `align` as exactly `left`, `center`, or `right`.
- Put user-visible text inside `<content>`. Escape XML-sensitive characters (`&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;`).
- Add `label` only when a visible layer name is useful.
- Use the normal `transform` child for position and documented transform animation.

## Fonts

Google Fonts use a query-like font value. In XML attributes, escape the ampersand:

```xml
font="googlefonts?name=Roboto&amp;weight=400"
font="googlefonts?name=Roboto&amp;weight=900"
```

Imported fonts use the installed font filename:

```xml
font="imported?name=Kindheart.otf"
```

An imported-font reference is device-dependent: do not promise it will render on another device unless that font is installed there. Prefer a Google Fonts value when portability matters.

No standalone `<font>` element is observed; every font reference is an attribute on its `text` layer. Google Fonts weights are serialized inside the font query (for example `weight=600`, `weight=700`, and `weight=900`).

## Alignment and default pivot

When a text layer omits `<pivot>`, its default pivot is the transform `<location>`. In the editor, that location is the center of the text layer's selection frame; this stays true for `align="left"`, `align="center"`, and `align="right"`.

`align` positions the glyphs within that frame without moving the default pivot. With a clockwise `rotation="90.000000"`, the tested `F` glyph appeared above the pivot for `left`, centered on it for `center`, and below it for `right`.

For predictable authoring, put `<location>` where the center of the text layer's box/rotation anchor belongs, choose `wrapWidth` and `align` for glyph layout, and omit `<pivot>` unless a different rotation anchor is intentional.

### Hypotheses — not confirmed

- A controlled left-aligned, `wrapWidth="512"` test uses an explicit `pivot="-242.500000,0.000000"` to move rotation around the glyph area; this confirms text supports a two-component transform pivot. It does not establish a general formula linking pivot to glyph bounds or wrap width.
- Exact glyph padding/bounds inside the frame are font- and glyph-dependent; no general glyph-offset formula is established.
- `textspacing.linespacing` is a serialized control, but its physical line-height formula is not established.

## Color and outline

Text can use `fillColor` as a direct child. An optional text `path-stroke` uses the documented stroke schema:

```xml
<path-stroke direction="centered" enabled="false" end-size="1.500000">
  <size value="0.000000" />
</path-stroke>
```

Keep the stroke disabled if the design does not need an outline.

## Character and time effects

These effects are cataloged here because they were researched with text, but their `<effect>` block is not text-only. Attach it directly to the layer it modifies, after its transform and before its content or other layer children:

```xml
<effect id="com.alightcreative.effects.textspacing" locallyApplied="true">
  <property name="letterspacing" type="float" value="0.110000" />
  <property name="linespacing" type="float" value="1.019000" />
</effect>
```

Use the exact ID, `locallyApplied="true"`, property name, type, and static-or-keyed form below. A keyed property uses the normal `<kf t="…" v="…" e="…"/>` children. Preserve the XML keyframe order; text-effect exports may place timestamps out of chronological order.

| Effect ID | Confirmed properties |
|---|---|
| `com.alightcreative.effects.counter` | `offset: float` (keyed), `scale: float` (keyed) |
| `com.alightcreative.effects.textprogress` | `start: float` (keyed), `end: float` (keyed), `cursor: int`, `blink: bool` |
| `com.alightcreative.effects.textrand` | `amount: float` (keyed), `evo: float` (keyed), `seed: float`, `start: float`, `end: float`, `charset: int`, `preserveSpace: bool` |
| `com.alightcreative.effects.textspacing` | `letterspacing: float`, `linespacing: float` |
| `com.alightcreative.effects.timecode` | `rel: bool`, `frames: bool` |
| `com.alightcreative.effects.texttransform` | `start: float`, `end: float`, `phase: float`, `component: int`, `anchor: int`, `offset: vec2`, `angle: float`, `scale: float`, `stretch: float`, `alpha: float`, `useFillColor: bool`, `fillColor: color`, `easeIn: float`, `easeOut: float`, `overlap: float`, `shape: int`, `randomOrder: bool`, `seed: float` |

`texttransform` is observed with keyed `start`, keyed `end`, and keyed `offset`; its other listed properties are static in the researched projects. `textprogress` is observed with `start="0.000000"`, keyed `end` values in the 0–1 range, `cursor="0"`, and `blink="false"`; the files do not prove the cursor's display semantics or whether that range is universally enforced.

Effect inputs should be changed only through these documented properties. Multiple effects are observed as consecutive `<effect>` children (for example `textprogress` followed by `textspacing`); preserve that child order. The XML proves stack serialization, not render order or combined visual behavior. This skill does not yet document rich text, font-family fallbacks, path text, other character/time effects, or the full visual semantics of each effect.
