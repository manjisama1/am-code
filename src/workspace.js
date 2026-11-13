import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import AdmZip from "adm-zip";

export const root = resolve(import.meta.dirname, "..");
export const xmlDir = resolve(process.env.AMXML_DIR ?? join(root, "xmls"));
export const reportDir = resolve(process.env.AM_REPORT_DIR ?? join(root, "reports"));

export function listProjects(directory = xmlDir) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((name) => [".xml", ".alp"].includes(extname(name).toLowerCase()))
    .sort();
}

export function resolveProject(input) {
  if (existsSync(input)) return resolve(input);
  const candidates = listProjects();
  const name = candidates.find((candidate) => candidate === input || candidate === `${input}.xml`);
  if (!name) throw new Error(`Project not found: ${input}. Add it to ${xmlDir} or provide a path.`);
  return join(xmlDir, name);
}

export function readProject(input) {
  const file = resolveProject(input);
  if (extname(file).toLowerCase() === ".xml") return { file, xml: readFileSync(file, "utf8").replace(/^\uFEFF/, "") };

  const archive = new AdmZip(file);
  const entry = archive.getEntries()
    .filter((item) => !item.isDirectory && /\.(xml|json)$/i.test(item.entryName))
    .sort((a, b) => b.header.size - a.header.size)[0];
  if (!entry) throw new Error(`${basename(file)} contains no XML or JSON project payload.`);
  return { file: `${file}:${entry.entryName}`, xml: entry.getData().toString("utf8") };
}
