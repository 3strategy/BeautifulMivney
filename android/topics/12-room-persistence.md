---
layout: page
title: "Android topics — 12: Favorite שנשמר גם אחרי סגירת האפליקציה"
subtitle: "Room,‏ DAO, פעולה ברקע, transaction ושדרוג סכימה ללא איבוד נתונים"
permalink: /android/topics/12-room-persistence/
lang: he
full-width: true
tags: [Android, Java, Room, SQLite, migration, testing]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [הרשימה שממנה מתחילים]({{ '/android/topics/11-recyclerview-diffutil/' | relative_url }})

{: .box-success}
בסוף המעבדה סימון Save של ספר נשמר במסד מקומי. הוא מופיע גם לאחר עצירת האפליקציה ופתיחתה מחדש. בהמשך משדרגים את המסד מגרסה 1 לגרסה 2, מוסיפים עמודה, ובודקים שהספר שסומן נשאר. אין צורך בשרת או בחשבון משתמש.

בסיס העבודה הוא ענף **`codex/recyclerview-diffutil`**. בענף התוצאה **`codex/room-persistence`** יש גם commit ביניים, **`fce5c9d`**, עם גרסה 1 עובדת. התחילו בגרסה 1, הפעילו אותה ושמרו ספר, ורק אז עברו לשדרוג גרסה 2. כך אפשר להבחין בין בדיקת מסד חדש לבין בדיקת migration אמיתי.

## מה שומרים, ואיפה?

במעבדה 11 ה־`ViewModel` החזיק `Set<Integer> favoriteIds` בזיכרון. סיבוב מסך השאיר את אותו ViewModel, אבל סיום התהליך יוצר אותו מחדש ולכן הסימונים נעלמו. כאן **שורת מסד אחת פירושה שספר בעל `bookId` זה הוא Favorite**. `Book` נשאר מודל התצוגה, והמסד שומר רק את המזהה. ה־`ViewModel` מחבר את המזהים שנקראו מהמסד לספרים שמקורם ב־`FakeBookRepository`.

| רכיב | אחריות |
|---:|---:|
| `FavoriteEntity` | מבנה טבלת `favorites` והמפתח הראשי |
| `FavoriteDao` | שאילתות ופעולת toggle אטומית |
| `TopicsDatabase` | גרסת הסכימה והרשאת גישה ל־DAO |
| `FavoritesRepository` | תור עבודה יחיד מחוץ ל־main thread והחזרת תוצאה ל־UI |
| `BooksViewModel` | מצב המסך; אינו מריץ SQL |

`Room` היא שכבה מעל SQLite: ה־annotations מגדירים את הטבלה והשאילתות, וה־annotation processor מייצר מימוש בזמן build. [מדריך Room הרשמי](https://developer.android.com/training/data-storage/room) מסביר את שלושת הרכיבים המרכזיים.

## 1. מכינים Room ומייצאים סכימות

ב־**Gradle Scripts > libs.versions.toml** הוסיפו ל־`[versions]` את `room = "2.8.5"`. ב־`[libraries]` הוסיפו:

```toml
room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
room-testing = { group = "androidx.room", name = "room-testing", version.ref = "room" }
```

ב־`[plugins]` הוסיפו `room = { id = "androidx.room", version.ref = "room" }`. ב־**Gradle Scripts > build.gradle.kts (Module :app)** הוסיפו את plugin Room, ספריית runtime, מעבד annotations, ספריית בדיקות ותיקייה לסכימות:

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.room)
}

room {
    schemaDirectory("$projectDir/schemas")
}

dependencies {
    // שאר התלויות הקיימות נשארות
    implementation(libs.room.runtime)
    annotationProcessor(libs.room.compiler)
    androidTestImplementation(libs.room.testing)
}
```

בצעו **Sync** לפני כתיבת קוד שתלוי במחלקות ש־Room תייצר. אין למחוק תלויות, בדיקות או קובצי template שאינם קשורים למעבדה. קובצי JSON שבתיקיית `schemas` הם חלק מן המקור: שמרו את גרסה 1 וגם את גרסה 2 ב־Git, כי בדיקת migration זקוקה לתיאור הסכימה הישנה.

## 2. יוצרים גרסה 1 שעובדת

ב־**app > kotlin+java > com.example.topics** צרו `FavoriteEntity.java`:

```java
package com.example.topics;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

/** Version 1: one row means this book ID is a favorite. */
@Entity(tableName = "favorites")
public final class FavoriteEntity {
    @PrimaryKey
    public int bookId;

    public FavoriteEntity(int bookId) {
        this.bookId = bookId;
    }
}
```

`bookId` הוא המפתח הראשי: אותו ספר לא יכול להופיע פעמיים בטבלה. צרו באותה חבילה `FavoriteDao.java`:

```java
package com.example.topics;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Transaction;

import java.util.List;

/** Queries and one atomic read-then-write action. */
@Dao
public abstract class FavoriteDao {
    @Query("SELECT bookId FROM favorites")
    public abstract List<Integer> loadIds();

    @Query("SELECT EXISTS(SELECT 1 FROM favorites WHERE bookId = :id)")
    protected abstract boolean contains(int id);

    @Insert
    protected abstract void insert(FavoriteEntity favorite);

    @Query("DELETE FROM favorites WHERE bookId = :id")
    protected abstract void delete(int id);

    /** Returns the new state inside one transaction. */
    @Transaction
    public boolean toggle(int id) {
        if (contains(id)) {
            delete(id);
            return false;
        }
        insert(new FavoriteEntity(id));
        return true;
    }
}
```

`toggle` קוראת ואז כותבת. `@Transaction` עוטפת את שתי הפעולות כיחידה אחת; תור יחיד ב־Repository שומר גם על סדר הלחיצות של המסך. צרו `TopicsDatabase.java`:

```java
package com.example.topics;

import androidx.room.Database;
import androidx.room.RoomDatabase;

/** First schema checkpoint. */
@Database(entities = {FavoriteEntity.class}, version = 1, exportSchema = true)
public abstract class TopicsDatabase extends RoomDatabase {
    public abstract FavoriteDao favoriteDao();
}
```

בנו את האפליקציה עכשיו. ודאו שנוצר `1.json` תחת `app > schemas > com.example.topics.TopicsDatabase`. אם ה־build נכשל, תקנו אותו לפני המעבר לגרסה 2. אל תשתמשו ב־`fallbackToDestructiveMigration`: הוא מוחק נתוני משתמש כשחסרה דרך שדרוג.

## 3. מריצים גישה למסד מחוץ ל־main thread

צרו `FavoritesRepository.java` באותה חבילה:

```java
package com.example.topics;

import android.app.Application;
import android.os.Handler;
import android.os.Looper;
import androidx.room.Room;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Runs Room work off main and delivers snapshots on main. */
public final class FavoritesRepository {
    public interface Listener {
        void onFavorites(Set<Integer> ids);
    }

    private final TopicsDatabase database;
    private final ExecutorService io = Executors.newSingleThreadExecutor();
    private final Handler main = new Handler(Looper.getMainLooper());
    private volatile boolean closed;

    public FavoritesRepository(Application application) {
        database = Room.databaseBuilder(application, TopicsDatabase.class,
                "favorites.db").build();
    }

    public void load(Listener listener) {
        io.execute(() -> deliver(listener));
    }

    public void toggle(int id, Listener listener) {
        io.execute(() -> {
            database.favoriteDao().toggle(id);
            deliver(listener);
        });
    }

    private void deliver(Listener listener) {
        Set<Integer> snapshot = new HashSet<>(database.favoriteDao().loadIds());
        main.post(() -> {
            if (!closed) listener.onFavorites(snapshot);
        });
    }

    public void close() {
        closed = true;
        io.execute(database::close);
        io.shutdown();
    }
}
```

Room אינה מאפשרת כאן גישת מסד ב־main thread. ה־Executor מבצע את הקריאה והכתיבה לפי הסדר; ה־Handler מחזיר snapshot ל־main thread, שבו `LiveData.setValue` מעדכנת את המסך. כש־ViewModel מסתיים, `closed` מונע callback מאוחר, וסגירת המסד נכנסת אחרי העבודה שכבר בתור.

ב־`BooksViewModel.java` החליפו את `ViewModel` ב־`AndroidViewModel` והוסיפו constructor שמקבל `Application`. ה־`Application` נותן למסד Context שחי מעבר ל־Activity. השדות והמתודות האחרים של שיעור 11 נשארים:

{% code_diff %}
 import android.os.Handler;
 import android.os.Looper;
+import android.app.Application;
+import androidx.annotation.NonNull;
-import androidx.lifecycle.ViewModel;
+import androidx.lifecycle.AndroidViewModel;
 ⁞
-public final class BooksViewModel extends ViewModel {
+public final class BooksViewModel extends AndroidViewModel {
     ⁞
     private final Set<Integer> favoriteIds = new HashSet<>();
+    private final FavoritesRepository favorites;
+
+    public BooksViewModel(@NonNull Application application) {
+        super(application);
+        favorites = new FavoritesRepository(application);
+        favorites.load(this::showFavorites);
+    }
{% endcode_diff %}

החליפו את **כל** `toggleFavorite` הישנה, לרבות הלולאה שמעדכנת ספר אחד, במתודה הקצרה הבאה:

```java
/** Changes the database, not a ViewHolder or an in-memory Set alone. */
public void toggleFavorite(int id) {
    BooksUiState current = state.getValue();
    if (current == null || current.kind != BooksUiState.Kind.SUCCESS) return;
    favorites.toggle(id, this::showFavorites);
}
```

הוסיפו `showFavorites` חדשה. כל snapshot — גם בקריאה הראשונית וגם אחרי לחיצה — מצייר את אותה אמת:

```java
private void showFavorites(Set<Integer> ids) {
    favoriteIds.clear();
    favoriteIds.addAll(ids);
    BooksUiState current = state.getValue();
    if (current == null || current.kind != BooksUiState.Kind.SUCCESS) return;
    Book[] books = current.getBooks();
    for (int index = 0; index < books.length; index++) {
        books[index] = books[index].withFavorite(
                favoriteIds.contains(books[index].id));
    }
    state.setValue(BooksUiState.success(books));
}
```

הלולאה ב־`scheduleLoad` שכבר קוראת את `favoriteIds` נשארת: אם תוצאת הספרים מגיעה *אחרי* קריאת המסד, היא עדיין מסומנת נכון. בסוף `onCleared()` הוסיפו `favorites.close();` ואז `super.onCleared();`. בנו, הפעילו, לחצו Save על Ada, עצרו את האפליקציה והפעילו מחדש. לאחר Load Books, Ada צריכה להציג `Saved ★`. השוו גם ל־`fce5c9d` כדי לוודא שכל השינויים עד כאן נמצאים בפרויקט.

## 4. משדרגים לגרסה 2 בלי למחוק את הסימון

נוסיף ל־Favorite שדה `note` לא ריק, גם אם כרגע הממשק אינו מציג אותו. מטרתו כאן להדגים שינוי סכימה על נתון שכבר שמור. ב־`FavoriteEntity` הוסיפו:

{% code_diff %}
 import androidx.room.Entity;
 import androidx.room.PrimaryKey;
+import androidx.annotation.NonNull;
+import androidx.room.ColumnInfo;
 ⁞
     public int bookId;
+    @NonNull
+    @ColumnInfo(defaultValue = "''")
+    public String note;
 
-    public FavoriteEntity(int bookId) {
+    public FavoriteEntity(int bookId, @NonNull String note) {
         this.bookId = bookId;
+        this.note = note;
     }
{% endcode_diff %}

ב־`FavoriteDao.toggle` החליפו `new FavoriteEntity(id)` ב־`new FavoriteEntity(id, "")`. ב־`TopicsDatabase` העלו את `version` ל־2 והוסיפו את ה־Migration. `DEFAULT ''` נותן ערך לשורות הישנות; `@ColumnInfo(defaultValue = "''")` אומר ל־Room שזה גם חלק מהסכימה החדשה:

```java
public static final Migration MIGRATION_1_2 = new Migration(1, 2) {
    @Override
    public void migrate(@NonNull SupportSQLiteDatabase db) {
        db.execSQL("ALTER TABLE favorites ADD COLUMN note TEXT NOT NULL DEFAULT ''");
    }
};
```

הוסיפו imports של `androidx.annotation.NonNull`,‏ `androidx.room.migration.Migration` ו־`androidx.sqlite.db.SupportSQLiteDatabase`. ב־`FavoritesRepository` שנו את בניית המסד כך שה־Migration נרשמת לפני `build()`:

{% code_diff %}
         database = Room.databaseBuilder(application, TopicsDatabase.class,
-                "favorites.db").build();
+                "favorites.db")
+                .addMigrations(TopicsDatabase.MIGRATION_1_2)
+                .build();
{% endcode_diff %}

בנו שוב ושמרו גם את `2.json`. התקינו את גרסה 2 **מעל** גרסה 1, ללא Clear Storage או הסרה של האפליקציה. טענו את הספרים: Ada עדיין צריכה להציג `Saved ★`. זו ראיה ידנית לכך שהתהליך שדרג מסד קיים; התקנה נקייה בודקת מסלול אחר.

## 5. בודקים migration ועסקה באופן אוטומטי

ב־**app > kotlin+java > com.example.topics (androidTest)** צרו `RoomMigrationTest.java`. `MigrationTestHelper` יוצרת מסד לפי `1.json`, מכניסה רשומה בסכימה הישנה, מריצה את ה־migration, ובודקת גם את הערך החדש וגם את הסכימה החדשה. בדיקה שנייה בודקת את פעולת toggle דרך DAO אמיתי:

```java
package com.example.topics;

import android.database.Cursor;
import androidx.room.Room;
import androidx.room.testing.MigrationTestHelper;
import androidx.sqlite.db.SupportSQLiteDatabase;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.io.IOException;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public final class RoomMigrationTest {
    private static final String TEST_DB = "migration-test.db";

    @Rule public MigrationTestHelper helper = new MigrationTestHelper(
            InstrumentationRegistry.getInstrumentation(), TopicsDatabase.class);

    @Test
    public void migrationKeepsFavoriteAndAddsDefaultNote() throws IOException {
        SupportSQLiteDatabase old = helper.createDatabase(TEST_DB, 1);
        old.execSQL("INSERT INTO favorites (bookId) VALUES (7)");
        old.close();

        SupportSQLiteDatabase upgraded = helper.runMigrationsAndValidate(
                TEST_DB, 2, true, TopicsDatabase.MIGRATION_1_2);
        try (Cursor rows = upgraded.query("SELECT bookId, note FROM favorites")) {
            assertTrue(rows.moveToFirst());
            assertEquals(7, rows.getInt(0));
            assertEquals("", rows.getString(1));
            assertFalse(rows.moveToNext());
        }
        upgraded.close();
    }

    @Test
    public void toggleTransactionChangesExactlyOneRow() {
        TopicsDatabase database = Room.inMemoryDatabaseBuilder(
                InstrumentationRegistry.getInstrumentation().getTargetContext(),
                TopicsDatabase.class).build();
        try {
            FavoriteDao dao = database.favoriteDao();
            assertTrue(dao.toggle(7));
            assertEquals(1, dao.loadIds().size());
            assertFalse(dao.toggle(7));
            assertTrue(dao.loadIds().isEmpty());
        } finally {
            database.close();
        }
    }
}
```

בבדיקת ה־UI של שיעור 11, מחקו את `favorites.db` **לפני** `ActivityScenario.launch`, כדי שסימון שנשאר מהפעלה ידנית לא יהפוך את תוצאת הבדיקה. השתמשו ב־`InstrumentationRegistry.getInstrumentation().getTargetContext().deleteDatabase("favorites.db")`; הוסיפו את ה־import המתאים. בריצת הבדיקות שלנו נדרש גם יישור תלות ה־serialization ש־Room Testing משתמשת בה: ב־`[versions]` הוספנו `serialization = "1.8.1"`, ב־`[libraries]` את `serialization-core = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-core", version.ref = "serialization" }`, וב־dependencies את `implementation(libs.serialization.core)`. בלי זה Gradle בחר core 1.7.3 לצד JSON 1.8.1 וה־migration test נכשל ב־`AbstractMethodError`, אף שהאפליקציה עצמה פעלה.

הריצו `:app:connectedDebugAndroidTest`. ניסוי מכוון: החליפו זמנית את `DEFAULT ''` ב־migration בערך אחר. הבדיקה אמורה להיכשל בבדיקת הסכימה/הערך. החזירו את הקוד התקין והריצו שוב. [תיעוד בדיקות migration](https://developer.android.com/training/data-storage/room/migrating-db-versions) מסביר מדוע יש לשמור schemas היסטוריות.

{: .box-note}
גבול המעבדה: `FavoritesRepository` מדגימה threading, סדר פעולות, persistence ו־migration, אך אינה מציגה למשתמש שגיאות I/O או מסד פגום. אם הופכים אותה לרכיב מוצר, הגדירו תוצאת success/error ל־Repository, הציגו כשל ב־UI, והחליטו מתי Retry בטוח. אל תפרשו את `Saved ★` כהוכחה שהנתון נשמר עד שקריאת המסד אישרה אותו.

## שאלות בדיקה

{: .alefbet}
1. מדוע סיבוב מסך לבדו לא הוכיח שה־Favorite נשמר בדיסק?
2. מה מונע שתי שורות Favorite עבור אותו ספר, ומה מבטיחה `@Transaction`?
3. מה יקרה לשורה קיימת אם נוסיף `note TEXT NOT NULL` בלי `DEFAULT`?
4. איזו בדיקה תיכשל אם נשכח לרשום את `MIGRATION_1_2` בבניית המסד?
5. איזו תוספת דרושה כדי ששגיאת כתיבה למסד תופיע למשתמש במקום להישאר רק ב־log?
