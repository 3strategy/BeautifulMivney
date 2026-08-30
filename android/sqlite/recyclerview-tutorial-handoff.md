# Tutorial 4 handoff: RecyclerView + deleting Watching

This is a planning handoff for the agent that will write the next Hebrew tutorial. Do not merge it
into the three existing tutorials. The tutorial should start from the completed result of
`03.requery-join-and-inserts.md` and end at the tested source in
`C:\Users\3stra\AndroidStudioProjects\sqlrequery`.

Suggested final page name: `04.requery-recyclerview-delete.md`.

## One tutorial, one visible outcome

Replace the monospaced joined-results `TextView` with a plain RecyclerView laid out as a small
four-column table. Each row displays:

```text
Maya | Dune | 8                         DELETE
```

The Delete button removes the corresponding `Watching` association, refreshes the join, and stays
deleted after an app restart. Student and Movie rows are not deleted.

## Minimal file delta

Add:

- `WatchAdapter.java`
- `item_watching.xml`

Change:

- `app/build.gradle.kts`
- `activity_main.xml`
- `strings.xml`
- `MainActivity.java`
- `Database.java`

The tutorial does not need to discuss or reproduce README, themes, icons, backup XML, ProGuard,
template tests, repositories, ViewModels, fragments, DiffUtil, ListAdapter, or a separate row-model
class.

## Teaching order

### 1. Turn the result area into a RecyclerView

Add only:

```kotlin
implementation("androidx.recyclerview:recyclerview:1.4.0")
```

Replace the outer `ScrollView` with the existing vertical `LinearLayout`: RecyclerView is already
the scrolling container. Replace the result `TextView` with a RecyclerView whose height is `0dp`
and weight is `1`.

Build a header with `Student`, `Movie`, `Rating`, and `Action` columns. Add
`item_watching.xml` with three separate TextViews and one Delete button. Give header and row the
same widths: weights `3`, `4`, and `2`, followed by a fixed `88dp` action column. This makes it an
actual aligned table rather than another formatted text line.

Add a standard vertical `DividerItemDecoration` so RecyclerView draws the horizontal line between
each row; no custom drawable or decoration class is needed.

Explain that View Binding generates both `ActivityMainBinding` and `ItemWatchingBinding`.

### 2. Bind the existing typed join directly

Add the deliberately tiny `WatchAdapter`. It stores `List<Tuple>` directly, inflates
`ItemWatchingBinding`, and fills the three column views from the same generated expressions used
by the query:

```java
row.get(StudentEntity.NAME)
row.get(MovieEntity.TITLE)
row.get(WatchingEntity.RATING)
```

Do not introduce a DTO just to copy three values. For this tiny teaching data set,
`notifyDataSetChanged()` is clearer than DiffUtil/ListAdapter; retain its explanatory Javadoc and
the narrow `@SuppressLint("NotifyDataSetChanged")`.

In `MainActivity.onCreate`, the complete RecyclerView setup is three ideas:

```java
adapter = new WatchAdapter(this::deleteWatching);
binding.recyclerView.setLayoutManager(new LinearLayoutManager(this));
binding.recyclerView.setAdapter(adapter);
```

Change the end of `showWatchings()` from StringBuilder formatting to:

```java
adapter.setRows(rows.toList());
```

This materializes the result before the try-with-resources block closes Requery's cursor.

### 3. Delete the association identified by the row

Names and titles are not safe keys. Extend the existing select with the two hidden key values:

```java
.select(StudentEntity.NAME, MovieEntity.TITLE, WatchingEntity.RATING,
        WatchingEntity.STUDENT_ID, WatchingEntity.MOVIE_ID)
```

The first three values are displayed. The last two are the composite primary key of the
`Watching` row and stay inside its Tuple.

The adapter should not know about SQLite. It forwards the clicked tuple through one
`Consumer<Tuple>` callback. The Activity extracts the two IDs, asks `Database` to delete, then
reruns `showWatchings()`.

Use the exact typed delete from the working project:

```java
data.delete(Watching.class)
    .where(WatchingEntity.STUDENT_ID.eq(studentId)
        .and(WatchingEntity.MOVIE_ID.eq(movieId)))
    .get().value();
```

Call out the final `value()`: Requery operations are lazy, so `.get()` creates the scalar result
and `.value()` executes the DELETE. This was verified during implementation and is an important
small ORM lesson.

## Verification for the tutorial

1. Build and run: the four seed tuples appear as four RecyclerView rows.
2. Tap Delete next to `Maya | Barbie | 9`: that row disappears and the other three remain.
3. Restart the app: the deleted row does not return, proving `seedIfEmpty()` did not duplicate or
   recreate data.
4. Add a Watching: the join is rerun and the new row appears without restarting.
5. In Logcat, compare the generated SELECT/DELETE SQL with the typed Requery calls.

Both `sqlrequery` and the manual twin use `com.example.sqlrequery`; installing either APK replaces
the other. Confirm the APK source before interpreting database state. The authoritative manual twin
is the one named by the current BeautifulMivney `AGENTS.md`.

## Simplification decisions to preserve

- One Activity and one adapter; no new screen or fragment.
- Direct `Tuple` binding; no row DTO.
- One callback; no listener interface file.
- Full tiny-list refresh; no DiffUtil/ListAdapter.
- Programmatic add dialogs remain unchanged.
- Delete has no confirmation modal because the lesson is the association key and typed delete.
- Keep the purposeful Javadocs from `MainActivity`, `Database`, and `WatchAdapter`; do not comment
  obvious setters or XML attributes.

Official dependency reference: <https://developer.android.com/jetpack/androidx/releases/recyclerview>
