# Shapes and custom paths

Use a built-in shape when its parameters express the design cleanly. Use a custom `<path>` for silhouettes such as hearts, leaves, people, logos, and spirals.

## Custom vector path

```xml
<shape id="UNIQUE_ID" label="Custom shape" startTime="0" endTime="2015"
       fillType="color" mediaFillMode="fill">
  <transform><location value="540.000000,540.000000,0.000000" /></transform>
  <fillColor value="#ffffffff" />
  <path d="M -100 0 C -100 -80 0 -120 0 -40 C 0 -120 100 -80 100 0 C 100 60 0 120 0 160 C 0 120 -100 60 -100 0 Z" />
</shape>
```

The observed `d` grammar uses SVG path commands:

- `M x y` — move the drawing cursor.
- `L x y` — straight line to a point.
- `C x1 y1, x2 y2, x y` — cubic Bézier curve to an endpoint, with two control points.
- `Z` — close the current contour.

Path coordinates are local to the shape's transform location. Keep generated numeric precision consistent. A closed path is appropriate for a filled silhouette. This skill does **not** document holes, multiple independent contours, quadratic commands, arcs, relative commands, or path-keyframe animation—research them before relying on them.

## Built-in parametric shapes

Each built-in shape follows the ordinary shape attributes, an `s` type code, a `transform`, `fillColor`, and the listed `property` children.

| Shape code | Confirmed properties | Typical use |
|---|---|---|
| `.circle` | `size: vec2` | Ellipse/circle |
| `.rect` | `size: vec2` | Rectangle |
| `.roundrect` | `size: vec2`, `cornerRadius: float` | Rounded card/button |
| `.pie` | `startAngle: float`, `endAngle: float`, `radius: float` | Pie sector |
| `.poly` | `sideCount: float`, `radius: float`, `offsetAngle: float` | Regular polygon |
| `.star` | `pointCount: float`, `outerRadius: float`, `innerRadius: float`, `offsetAngle: float` | Star |
| `.multifoil` | `pointCount: float`, `outerRadius: float`, `innerRadius: float`, `offsetAngle: float` | Flower/foil |
| `.plus` | `size: vec2`, `stemSize: float` | Plus/cross |
| `.line` | `p1: vec2`, `p2: vec2` | Stroked line |
| `.arc` | `startAngle: float`, `endAngle: float`, `radius: float`, `closed: bool` | Stroked arc |
| `.arrow` | `end: vec2`, `lineWidth: float`, `headWidth: float`, `headLength: float` | Arrow |
| `.wideline` | `end: vec2`, `lineWidth: float` | Thick line |
| `.triangle` | `p1`, `p2`, `p3`: `vec2`; `closed: bool` | Three-point polygon |
| `.quad` | `p1`–`p4`: `vec2`; `closed: bool` | Four-point polygon |
| `.penta` | observed `p1`, `p2`, `p4`, `p5`: `vec2`; `closed: bool` | Editable five-point polygon |
| `.callout.roundrect` | `size: vec2`, `tail: vec2`, `cornerRadius: float`, `tailWidth: float` | Speech bubble |
| `.moon` | `radius: float`, `offset: float` | Crescent |
| `.stamp` | `size: vec2`, `cornerRadius: float`, `perforationSize: float`, `perforationSpacing: float` | Stamp edge |
| `.teardrop` | `radius: float`, `tail: float`, `squeeze: float`, `tailWidth: float` | Drop/leaf base |

Use float values with six decimals and `vec2` values as `x,y`. The `.penta` schema documents `p1`, `p2`, `p4`, and `p5`; research the behavior of omitted or additional points before using them.

## Stroke geometry

The observed `.line` and `.arc` use `fillType="none"` plus:

```xml
<path-stroke direction="centered" end-size="1.500000">
  <color value="#ffffffff" />
  <size value="20.000000" />
</path-stroke>
```

For the expanded path-stroke, border, and shadow schema—including observed caps, joins, disabled state, and animation—read `borders-and-shadows.md`.
