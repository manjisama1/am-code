# Borders, strokes, and shadows

These are direct child elements of a `shape`, alongside `fillColor` and `property`. Preserve the documented child order.

## Path stroke

`path-stroke` can outline a filled shape or render a no-fill line/arc. The observed schema supports a static or keyed `size` child.

```xml
<path-stroke direction="centered" end-size="1.500000">
  <size value="14.500000" />
</path-stroke>

<path-stroke direction="centered" end-size="1.500000">
  <size>
    <kf t="0.003970" v="3.500000" />
    <kf t="0.359802" v="94.500000" e="cubicBezier 0.055325985 1.0 0.8124426 0.49740484" />
  </size>
</path-stroke>
```

Observed attributes and values:

- `direction="centered"`
- `end-size="1.500000"`
- `cap="butt"` or `cap="square"`
- `join="round"` or `join="miter"`
- `enabled="false"` to retain a disabled stroke configuration

`color` is supported for line/arc strokes and may be absent for outlined shapes. The skill does not document other cap/join/direction values or dash behavior.

## Border

`border` is a separate shape child with `id="1"` and a placement direction:

```xml
<border direction="inside" id="1">
  <color value="#ff5eb7d9" />
  <size value="21.000000" />
</border>
```

Observed direction values are `inside`, `centered`, and `outside`. The `color` child is optional in the exports; `size` is present. Both support the standard static-or-keyed property pattern:

```xml
<border direction="inside" id="1">
  <color><kf t="0.003970" v="#ffffffff" /></color>
  <size>
    <kf t="0.000000" v="40.000000" />
    <kf t="0.558313" v="0.000000" e="cubicBezier 0.55486685 0.0 0.6398071 1.0" />
  </size>
</border>
```

Keep `id="1"` until a multi-border export establishes ID behavior. Do not infer whether omitted color has a default, or whether multiple borders are supported.

## Shadow

The observed shadow uses `direction="outside"` and nested, independently animated scalar/vector properties:

```xml
<shadow direction="outside">
  <opacity><kf t="0.376179" v="1.000000" /></opacity>
  <size><kf t="0.003970" v="15.000000" /></size>
  <offset><kf t="0.715136" v="3.000000,3.000000" /></offset>
</shadow>
```

- `opacity` is a normalized scalar.
- `size` is a scalar.
- `offset` is a two-component vector and can animate independently.

No shadow color, inside direction, static-value form, blur model, or multiple-shadow behavior is established yet. Use only the observed outside-shadow structure unless a new export proves more.
