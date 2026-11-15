# Timing, media, and audio

## Scene timeline and media declarations

The root `scene` attributes observed across supported exports are:

```xml
<scene title="Project" width="1440" height="1440"
       exportWidth="1440" exportHeight="1440"
       precompose="dynamicResolution" bgcolor="#ff000000"
       totalTime="16149" fps="20" modifiedTime="EPOCH_MS"
       amver="1028383" ffver="106"
       am="com.alightcreative.motion/5.0.272.1028383"
       amplatform="android" retime="freeze" retimeAdaptFPS="false">
```

Observed media declarations are direct `scene` children. Audio has a duration but no image dimensions; image media includes `orientation`, `width`, and `height`:

```xml
<media uri="content://media/external/audio/media/ID"
       filename="track.mp3" title="track.mp3" type="audio/mpeg"
       duration="67320000" size="1373109" infoUpdated="EPOCH_MS" />
<media uri="content://media/external/images/media/ID"
       filename="image.jpg" title="image.jpg" type="image/jpeg"
       size="60643" orientation="0" infoUpdated="EPOCH_MS"
       width="876" height="853" />
```

The URI is a device-local Android content URI. A media-filled shape references the image URI exactly through `fillImage`; this XML does not package the underlying file.

## Audio layer

An audio layer is a direct child of `scene` and points to a scene media URI:

```xml
<audio id="UNIQUE_ID" label="track.mp3" startTime="0" endTime="16149"
       src="content://media/external/audio/media/ID"
       inTime="26400" outTime="42549" mediaFillMode="fill" />
```

`startTime`, `endTime`, `inTime`, and `outTime` are integer timeline fields. No volume, fade, waveform, speed, or audio-effect schema is established.

## Keyframe time values

Keyframe `t` is serialized as a decimal scalar and can be negative, greater than `1`, and non-chronological in element order. Preserve both the exact values and XML order.

### Confirmed: keyframes are layer-relative

A controlled rectangle probe moved the layer interval from `startTime="0" endTime="4000"` to `startTime="1000" endTime="5000"`. Its two location keyframes stayed exactly `t="0.002000"` and `t="1.000000"`; only the layer/scene time fields changed. Therefore, `kf.t` is relative to the layer timeline, not an absolute scene timestamp.

### Confirmed: `kf.t` is normalized to the layer interval

For a layer with `startTime="0"` and `endTime="4983"`, location keys at `t="0.402970"` and `t="0.603652"` correspond, after six-decimal rounding, to layer-relative times `2008` and `3008`. Together with the shifted-layer probe above, the mapping is:

```text
scene keyframe time = layer startTime + kf.t × (layer endTime − layer startTime)
kf.t = (scene keyframe time − layer startTime) / (layer endTime − layer startTime)
```

Values below `0` or above `1` represent keyframes before or after the visible layer interval. Preserve them rather than clamping or normalizing them.

### Hypotheses — not confirmed

- Scene/layer time fields appear to be millisecond-like integers: at 20 fps, many marker/layer boundaries differ by 50. This is strong evidence, not a proven unit contract.
