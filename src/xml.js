import { XMLParser, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  parseAttributeValue: false,
  allowBooleanAttributes: true,
});

export function validateXml(xml) {
  const result = XMLValidator.validate(xml);
  return result === true ? [] : [result.err.msg];
}

export function parseXml(xml) {
  const errors = validateXml(xml);
  if (errors.length) throw new Error(`Invalid XML: ${errors.join("; ")}`);
  return parser.parse(xml);
}

export function flatten(value, path = "", output = {}) {
  if (value === null || typeof value !== "object") {
    output[path] = String(value);
    return output;
  }
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("?")) continue;
    const next = path ? `${path}.${key}` : key;
    if (Array.isArray(child)) child.forEach((item, index) => flatten(item, `${next}[${item?.["@id"] ?? index}]`, output));
    else flatten(child, next, output);
  }
  return output;
}

export function diffMaps(before, after) {
  const lines = [];
  for (const path of new Set([...Object.keys(before), ...Object.keys(after)])) {
    if (path.endsWith("@modifiedTime") || before[path] === after[path]) continue;
    if (!(path in before)) lines.push(`+ ${path} = ${after[path]}`);
    else if (!(path in after)) lines.push(`- ${path} = ${before[path]}`);
    else lines.push(`~ ${path}: ${before[path]} -> ${after[path]}`);
  }
  return lines.sort();
}
