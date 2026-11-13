import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { listProjects, readProject, reportDir } from "../src/workspace.js";
import { flatten, parseXml } from "../src/xml.js";

const rows = new Map();
const files = listProjects();
for (const filename of files) {
  const { xml } = readProject(filename);
  for (const [path, value] of Object.entries(flatten(parseXml(xml)))) {
    const normalized = path.replace(/\[[^\]]*\]/g, "[]");
    const row = rows.get(normalized) ?? { count: new Set(), values: new Set() };
    row.count.add(filename);
    if (row.values.size < 8) row.values.add(value.slice(0, 64));
    rows.set(normalized, row);
  }
}
const lines = ["# XML inventory", "", `${files.length} project(s), ${rows.size} observed paths`, "", "| Path | Projects | Example values |", "|---|---:|---|"];
for (const [path, row] of [...rows].sort(([a], [b]) => a.localeCompare(b))) {
  lines.push(`| \`${path}\` | ${row.count.size} | ${[...row.values].map((value) => `\`${value}\``).join(" ")} |`);
}
mkdirSync(reportDir, { recursive: true });
const output = join(reportDir, "inventory.md");
writeFileSync(output, `${lines.join("\n")}\n`);
console.log(`Wrote ${output}`);
