import { readProject } from "../src/workspace.js";
import { diffMaps, flatten, parseXml } from "../src/xml.js";

const [before, after] = process.argv.slice(2);
if (!before || !after) throw new Error("Usage: npm run compare -- <before.xml> <after.xml>");
const a = readProject(before);
const b = readProject(after);
const lines = diffMaps(flatten(parseXml(a.xml)), flatten(parseXml(b.xml)));
console.log(`# ${a.file} → ${b.file}\n`);
console.log(lines.join("\n"));
console.log(`\n${lines.length} difference(s)`);
