import { listProjects, readProject } from "../src/workspace.js";
import { validateXml } from "../src/xml.js";

const files = process.argv.slice(2);
const targets = files.length ? files : listProjects();
if (!targets.length) {
  console.log("No research XMLs in xmls/; nothing to validate.");
  process.exit(0);
}

let failures = 0;
for (const target of targets) {
  const { file, xml } = readProject(target);
  const errors = validateXml(xml);
  if (errors.length) { failures++; console.error(`FAIL  ${file}: ${errors.join("; ")}`); }
  else console.log(`OK    ${file}`);
}
if (failures) process.exitCode = 1;
