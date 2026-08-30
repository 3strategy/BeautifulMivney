# Later incremental teaching plan

1. Build one Student table end to end: project, View Binding, Requery, SQLite, insert, and select.
2. Add Movie and Watching, seed the graph, and visibly render it through relationship navigation.
3. Replace navigation with the typed two-table INNER JOIN, then add all three insert dialogs and
   complete the final verification.
4. Replace the result TextView with RecyclerView and delete one Watching by its composite key.

The fourth tutorial remains an extension of the three-step database lesson: it changes only the
result UI and the one typed delete operation, while leaving the entities, seeding, and inserts
unchanged.

See `requery-step-split.md` for the detailed handoff: per-step file deltas, checkpoints, Javadoc timing, and the files/libraries to omit from the student-facing project.
