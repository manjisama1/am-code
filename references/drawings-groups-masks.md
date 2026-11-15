# Drawings, groups, masks, and bookmarks

## Frame markers

Place timeline markers as direct `scene` children before layers:

```xml
<bookmark t="525" />
<bookmark t="1291" />
```

`t` is an integer timeline position in the observed export. Keep bookmarks in scene-child order. The sample does not establish labels, colors, or marker animation. See `timing-media-and-audio.md` for the timeline-unit hypothesis.

## Hand and vector drawing layers

A drawing is a layer type of its own, using `fillType="intrinsic"`, a transform, and one or more `stroke` children:

```xml
<drawing id="UNIQUE_ID" label="Drawing 1" startTime="0" endTime="2015"
         fillType="intrinsic" mediaFillMode="fill">
  <transform><location value="540.000000,540.000000,0.000000" /></transform>
  <stroke color="#ffc80d13" width="26.000000" type="pen"
          points="-205.00,-245.50,1.00;-206.00,-245.50,1.00" />
</drawing>
```

The `points` string is a semicolon-separated stream of comma-separated three-number records. Preserve all three components and their order. Observed stroke types are `pen`, `brush`, `fill`, and `eraser`; each can coexist in one drawing layer. The samples do not establish the meaning of the third point component, drawing-stroke animation, or other stroke types.

For clean geometric artwork, prefer `shape` plus `path d="…"` from `shapes-and-paths.md`. Use `drawing` when the result must preserve hand-drawn stroke data or erase operations.

## Normal group

A group is an `embedScene` layer whose nested `scene` owns the grouped children:

```xml
<embedScene id="UNIQUE_ID" label="Group 1" startTime="0" endTime="2015"
            fillType="intrinsic" mediaFillMode="fill">
  <transform><location value="540.000000,540.000000,0.000000" /></transform>
  <fillColor value="#ff000000" />
  <scene title="" width="1080" height="1080" exportWidth="1080" exportHeight="1080"
         precompose="dynamicResolution" bgcolor="#00000000" totalTime="2015" fps="60"
         modifiedTime="0" amver="1002172" ffver="106"
         am="com.alightcreative.motion/5.0.249.1002172" amplatform="android"
         retime="off" retimeAdaptFPS="false">
    <!-- grouped layers -->
  </scene>
</embedScene>
```

Use unique IDs across the full project. The nested scene is transparent and uses `retime="off"` in the observed group export. Keep its dimensions, duration, and version attributes aligned with the parent unless a research export proves another configuration.

## Mask and inverted-mask groups

Make the content and its mask siblings inside one `embedScene` nested scene. The observed order is content first, mask layer second:

```xml
<!-- regular mask -->
<shape ... fillType="color" s=".rect">...</shape>
<shape ... fillType="color" blending="mask" s=".circle">...</shape>

<!-- inverted mask -->
<shape ... fillType="color" s=".rect">...</shape>
<shape ... fillType="color" blending="exclude" s=".circle">...</shape>
```

Layer order is essential. Keep the `blending` token on the masking child and retain its position after the content. This establishes the exported group pattern; complex multi-layer masks, nested masks, and the detailed alpha/compositing behavior still need dedicated probes.
