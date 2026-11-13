# Adding knowledge safely

1. Start from a single baseline export and change one setting in Alight Motion.
2. Name the exported XML descriptively and add it unchanged to `xmls/`.
3. Run `npm run validate` and `npm run compare -- baseline.xml new-probe.xml`.
4. Record only the observed structural delta in `references/format-notes.md`, including source files and confidence. Keep surprising or unresolved output as a hypothesis.
5. Test an authored file by importing it into Alight Motion. If the app accepts and re-exports it, retain that round-trip XML as evidence.

Use Git commits by feature (for example `research: document text layer export`) so each claim can be traced to samples.
