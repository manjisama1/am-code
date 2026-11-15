# Adding knowledge safely

1. Start from a single baseline export and change one setting in Alight Motion.
2. Add the export unchanged to the ignored `xmls/` inbox with a descriptive name.
3. Run `npm run validate` and `npm run compare -- baseline.xml new-probe.xml`.
4. Record only the observed structural delta in the relevant topic reference. Keep surprising or unresolved output as a hypothesis.
5. Test an authored file by importing it into Alight Motion. Once its rule is documented, delete both temporary research XML files and any generated reports.

Use Git commits by documented feature (for example `docs: add text layer schema`). The published skill should never include private probe XML files.
