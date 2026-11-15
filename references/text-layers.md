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

Effect inputs should be changed only through these documented properties. This skill does not yet document rich text, font-family fallbacks, path text, other character/time effects, multiple effect stacks, or the full visual semantics of each effect.
