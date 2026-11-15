# Cameras, nulls, parenting, and nested groups

## Camera and null layers

Camera and null objects are direct `scene` children. Both use perspective type and a normal transform; cameras add field of view, focus blur, and fog:

```xml
<camera id="UNIQUE_ID" label="Camera 1" startTime="0" endTime="16149"
        mediaFillMode="fill" type="perspective">
  <transform><location value="720.000000,720.000000,-1247.076660" /></transform>
  <fov value="60.000000" />
  <focus-blur enabled="false">
    <strength value="0.500000" />
    <depth-of-field value="124.707664" />
    <distance value="1247.076660" />
  </focus-blur>
  <fog enabled="false"><near-z value="1247.076660" /><far-z value="2494.153320" /></fog>
</camera>

<nullobj id="UNIQUE_ID" label="Null 1" startTime="0" endTime="16149"
         mediaFillMode="fill" type="perspective">
  <transform><location value="720.000000,720.000000,0.000000" /></transform>
</nullobj>
```

Camera `location`, `rotation`, and `fov` are observed in both static and keyed form. `focus-blur` and `fog` use the nested values above; `enabled="false"` is observed, and focus blur is also observed without that attribute.

## Parent links, pivot, and 3D coordinates

Layers including text, shapes, cameras, nulls, and groups can have `parent="LAYER_ID"`. This is an ID reference, not a nested XML child. A transform can also contain a two-component pivot:

```xml
<transform>
  <location value="458.924805,1012.103271,-342.554688" />
  <pivot value="128.471069,4.269043" />
  <scale value="0.565382,0.565382" />
</transform>
```

Three-component `location` values are used extensively with perspective cameras, including large positive and negative third values. `lockAspectRatio="false"` is also observed on transforms.

On a controlled 1080×1080 screenshot, a 100×100 rectangle with `location="540.000000,540.000000,0.000000"` is visually centered on the canvas. This confirms the canvas center coordinate for that case; no current probe places an object at `0,0`, so the exact origin remains unconfirmed.

### Hypotheses — not confirmed

- The third location component is likely the perspective depth axis, but sign/orientation and scale are not established.
- `pivot` controls the transform pivot, but its coordinate origin and exact interaction with parenting are not established.
- The files prove the parent reference syntax, not the transform-composition order or inheritance math.
- Transform `scale` is serialized as decimal factors, with values around `1.000000` in the exports; whether the UI's 100% setting maps universally to `1.0` is not independently established.
- A controlled text test identifies `rotation="90.000000"` as the clockwise 90° orientation in the app coordinate system. Other rotation conventions remain untested.
- The canvas origin and whether `location` refers to a layer anchor, bounds center, or text box position are not established.

## Nested groups

An `embedScene` is a group layer with a nested scene. Group transforms can be static or keyed, including location, scale, rotation, opacity, and pivot:

```xml
<embedScene id="UNIQUE_ID" label="Group 1" startTime="1800" endTime="4249"
            fillType="intrinsic" inTime="450" outTime="2899" mediaFillMode="fill">
  <transform><location value="458.924805,1012.103271,-342.554688" /></transform>
  <fillColor value="#ff000000" />
  <scene title="" width="1440" height="1440" exportWidth="1440" exportHeight="1440"
         precompose="dynamicResolution" bgcolor="#00000000" totalTime="2449" fps="20"
         modifiedTime="0" amver="1028383" ffver="106"
         am="com.alightcreative.motion/5.0.272.1028383" amplatform="android"
         retime="off" retimeAdaptFPS="false">
    <!-- children use this nested scene's local timeline -->
  </scene>
</embedScene>
```

Child layers inside the nested scene are observed with local `startTime="0"` and `endTime` equal to the nested scene `totalTime`; their times are therefore group-local in the serialized structure. `inTime`/`outTime` are observed on group layers and their difference can equal the nested duration. Optional group attributes observed are `parent`, `link` (UUID-like string), `hidden="true"`, and `speed`.

### Hypotheses — not confirmed

- The exact playback mapping of `inTime`, `outTime`, `speed`, and `retime` is not established.
- Nested scenes can have different dimensions/fps from their parent, but automatic scaling and frame-rate conversion behavior are not established.
