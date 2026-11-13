import test from "node:test";
import assert from "node:assert/strict";
import { diffMaps, flatten, parseXml, validateXml } from "../src/xml.js";

test("parses and flattens a scene", () => {
  const data = flatten(parseXml('<scene title="demo"><shape id="1" /></scene>'));
  assert.equal(data["scene.@title"], "demo");
  assert.equal(data["scene.shape.@id"], "1");
});

test("reports malformed XML", () => {
  assert.equal(validateXml("<scene>").length, 1);
});

test("ignores export timestamp during a diff", () => {
  const changes = diffMaps({ "scene.@modifiedTime": "1", a: "before" }, { "scene.@modifiedTime": "2", a: "after" });
  assert.deepEqual(changes, ["~ a: before -> after"]);
});
