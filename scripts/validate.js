import { listProjects, readProject } from "../src/workspace.js";
import { validateXml } from "../src/xml.js";

const files = process.argv.slice(2);
const targets = files.length ? files : listProjects();
if (!targets.length) throw new Error("No .xml or .alp projects found in xmls/.");

let failures = 0;
for (const target of targets) {
  const { file, xml } = readProject(target);
  const errors = validateXml(xml);
  if (errors.length) { failures++; console.error(`FAIL  ${file}: ${errors.join("; ")}`); }
  else console.log(`OK    ${file}`);
}
if (failures) process.exitCode = 1;
