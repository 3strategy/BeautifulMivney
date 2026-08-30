# Later incremental teaching plan

1. Build one Student table end to end: project, View Binding, Requery, SQLite, insert, and select.
2. Add Movie and Watching, seed the graph, and visibly render it through relationship navigation.
3. Replace navigation with the typed two-table INNER JOIN, then add all three insert dialogs and
   complete the final verification.

Optional extension: replace only the result TextView with RecyclerView after the three-step database lesson works.

Possible step split: preserve this compact final app as the destination, then rebuild it in small commits or branches. A useful exercise is to copy the simple text output and replace only the UI layer with RecyclerView, leaving the entities, seeding, and query unchanged.

See `requery-step-split.md` for the detailed handoff: per-step file deltas, checkpoints, Javadoc timing, and the files/libraries to omit from the student-facing project.
