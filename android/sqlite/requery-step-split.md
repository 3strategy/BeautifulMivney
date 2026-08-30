# Class Netflix tutorial-authoring skeleton

## Purpose

This file is a handoff to the Codex task that will later write the full guided tutorial. The current `sqlrequery` project is the tested destination. Rebuild toward it one concept at a time; do not present the final project as one large paste.

The student's lesson is:

```text
Java entity definitions
        ↓
Requery annotation processor
        ↓
generated entities and model
        ↓
Android SQLite tables
        ↓
typed inserts and INNER JOIN
```

Keep the final Javadocs in the destination project. In the tutorial, introduce each Javadoc with the step that introduces its concept so the code delta and explanation arrive together.

## Fixed teaching constraints

- Android app written in Java.
- Kotlin Gradle scripts are fine.
- XML Views and View Binding; never use `findViewById`.
- Requery ORM and the normal Android SQLite database.
- `Student`, `Movie`, and the rated association entity `Watching`.
- One Activity, platform `AlertDialog`s, and direct database calls.
- No architecture layer whose only purpose is production structure.
- Build after every step that introduces annotations or generated types.

## Proposed three-step tutorial

Three steps are intentional. Each step is a mini-tutorial that starts from the previous working app
and ends with new, runnable, visibly verifiable functionality. A step must include its objective,
small code delta, explanation, expected UI/Logcat evidence, and a short verification. Splitting the
same tiny app into ten or eleven setup-sized commits would make mechanics feel more important than
the relationship and join lesson.

### Step 1 — One Student table, end to end

Student-visible changes:

- Create an Empty Views Activity with Java source and Kotlin Gradle scripts.
- Set `minSdk = 31`, enable View Binding, and inflate `ActivityMainBinding`.
- Add the three Requery dependencies.
- Create `model/Student.java`, then build to generate `StudentEntity` and `Models.DEFAULT`.
- Create `Database.open(Context)`, enable SQL logging, and add `Database.addStudent`.
- Seed students only when the table is empty and temporarily select their names into the TextView.

Checkpoint: the app launches, Logcat shows `create table Student`, student names appear, generated
sources are visible, and restart does not duplicate rows. Introduce the Student and database-opening
Javadocs in this step.

### Step 2 — Model and seed the rated relationship

Student-visible changes:

- Add `Movie.java` and `Watching.java`.
- Explain why Watching is an entity: the Student–Movie relationship owns `rating`.
- Make `studentId` and `movieId` non-null `@ManyToOne` foreign keys and the composite primary key.
- Add `Database.addMovie` and `Database.addWatching`.
- Expand the seed to three students, three movies, and four Watching rows.
- Temporarily select Watching entities and display each row through relationship navigation:
  `watching.getStudent().getName()`, `watching.getMovie().getTitle()`, and `getRating()`.

Checkpoint: Logcat shows all three `CREATE TABLE` statements, Watching has two foreign keys plus
composite key `(movieId, studentId)`, a fresh run performs 3 + 3 + 4 inserts, and restart performs
zero inserts. The screen visibly shows all four “who watched what” rows through Java relationship
navigation. Introduce the Movie/Watching and insert Javadocs here.

### Step 3 — Express the typed INNER JOIN and add all three inserts

Student-visible changes:

- Replace Step 2's temporary relationship-navigation rendering with `showWatchings()` rather than
  maintaining two permanent versions.
- Select `StudentEntity.NAME`, `MovieEntity.TITLE`, and `WatchingEntity.RATING`.
- Join Watching through `STUDENT_ID`, then Movie through `MOVIE_ID`.
- Read each `Tuple` with those same typed expressions.
- Render the rows in one monospaced TextView.
- Add the three View Binding buttons to `activity_main.xml`.
- Add the small programmatic dialog helpers and Student/Movie `AlertDialog`s.
- Query Student and Movie choices for the Watching dialog's Spinners.
- Validate a 1–10 rating, insert Watching, refresh the join, and handle a duplicate composite key.
- Add the remaining final Javadocs, then run `assembleDebug` and `lintDebug`.

Show the SQL and Requery forms side by side. Checkpoint: the original four rows appear through the
two SQL `inner join` clauses; then create `Lia`, `Coco`, and `Lia → Coco → 7`. One insert reaches
each table, the fifth joined row appears immediately, survives restart, and does not trigger
reseeding.

### Optional extension — RecyclerView

Copy the completed Activity before changing the UI. Replace only the monospaced result TextView with a tiny RecyclerView and adapter. Keep `Database`, all three entities, inserts, and the join unchanged so students can see that the persistence lesson is independent of list rendering.

## Files to omit from the student-facing code walkthrough

These may exist in an Android Studio project, but they are not lesson material:

- `.idea/`, `.gradle/`, `local.properties`, and every `build/` directory.
- Requery-generated `StudentEntity`, `MovieEntity`, `WatchingEntity`, and `Models` source files. Mention and inspect them; never hand-author or commit them.
- Launcher icons and their generated vector/mipmap files.
- Theme and night-theme boilerplate unless a screenshot requires a visual adjustment.
- Default backup/data-extraction XML, keep rules, and placeholder unit/instrumented tests.
- This `BeautifulMivney/` planning directory; it guides the tutorial author, not the student app.
- Gradle wrapper internals in code snippets. Tell students to keep the files Android Studio generated.

The final student-facing file map should concentrate on:

```text
app/build.gradle.kts
MainActivity.java
Database.java
model/Student.java
model/Movie.java
model/Watching.java
activity_main.xml
strings.xml
AndroidManifest.xml       (only if the tutorial changes it)
```

## Libraries and concepts intentionally left out

Do not add these unless a later lesson explicitly changes scope:

- Changes to AppCompat, Material Components, Activity KTX, or ConstraintLayout dependencies that
  Android Studio already placed in the baseline. Preserve them; they are not lesson material.
- RecyclerView in the core database lesson.
- Room, raw `SQLiteOpenHelper`, textual application SQL, or another database.
- RxJava/Requery reactive stores.
- ViewModel, LiveData, repositories, dependency injection, fragments, or navigation.
- Coroutines or Kotlin application source.
- DiffUtil, ListAdapter, data binding expressions, or multiple row types.
- Changes to the template-generated test files, test runner, or test libraries. Preserve them and
  omit them from the walkthrough.

The only non-Android runtime/build dependencies required by the destination are:

```kotlin
implementation("io.requery:requery:1.6.0")
implementation("io.requery:requery-android:1.6.0")
annotationProcessor("io.requery:requery-processor:1.6.0")
```

## Guidance for the future tutorial-writing Codex

1. Treat the tested destination files as authoritative, but reveal them incrementally.
2. At each step, list exact files changed, explain the new annotations/API, and provide a build/run checkpoint.
3. Never reference a generated class before the step that adds the processor and performs a build.
4. Keep temporary code obviously temporary and delete it in the later join step.
5. Preserve the final SQL/Requery side-by-side comparison verbatim.
6. Prefer screenshots of observable checkpoints: generated sources, Logcat SQL, table rows, and the three dialogs.
7. Call out expected first-run versus restart behavior so students can distinguish seeding from ordinary inserts.
8. End each step with one small experiment or prediction, not a large exercise set.
9. Do not call a code-editing segment a step unless the app builds and demonstrates new observable
   behavior at its end.
