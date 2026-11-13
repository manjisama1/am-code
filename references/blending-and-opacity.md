# Blending and opacity

Evidence: local `blending and opacity .xml`.

## Opacity

Opacity is a child of a layer's `transform`, not a shape attribute or color-alpha replacement.

```xml
<!-- static -->
<transform>
  <location value="540.000000,540.000000,0.000000" />
  <opacity value="0.662109" />
</transform>

<!-- animated -->
<transform>
  <location value="540.000000,540.000000,0.000000" />
  <opacity>
    <kf t="0.003970" v="1.000000" />
    <kf t="0.318114" v="0.000000" />
  </opacity>
</transform>
```

Observed values establish a normalized scalar range: `1.000000` is fully opaque and `0.000000` is fully transparent. Use the same static-or-keyed rule as other transform properties: do not combine `value` with `kf` children.

Preserve keyframe order exactly as exported. One valid sample contains `t="0.003968"`, `t="0.318452"`, then `t="0.086806"`; do not sort, deduplicate, or normalize keyframes unless an import/export probe proves it safe.

## Blend mode

Blend mode is an optional attribute on `<shape>`:

```xml
<shape ... fillType="color" blending="screen" mediaFillMode="fill" s=".rect">
```

The following XML tokens are observed and may be used exactly as written:

| Group | Tokens |
|---|---|
| Darken | `multiply`, `darken`, `darker-color`, `color-burn`, `linear-burn` |
| Lighten | `screen`, `lighten`, `lighter-color`, `color-dodge`, `linear-dodge` |
| Contrast | `overlay`, `soft-light`, `hard-light`, `soft-overlay`, `vivid-light`, `linear-light`, `pin-light` |
| Difference | `diff`, `exclusion`, `subtract`, `divide` |
| Component | `hue`, `saturation`, `color`, `luminance` |
| Other observed | `mask`, `exclude` |

Omit `blending` for the ordinary unannotated layer pattern used by the samples. Do not substitute display names, spaces, title case, or a different token such as `difference` for `diff`.

Blend results depend on the layers beneath the current layer, their colors/alpha, and layer order. The sample confirms token serialization, not the full visual or mask semantics of each mode. Keep the existing child order and test the final stack in Alight Motion.
