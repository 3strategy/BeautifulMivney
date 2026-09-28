---
layout: page
title: "Android topics — 25: עמודים שנשארים גם בלי רשת"
subtitle: "API מדורג, Room כמקור לתצוגה, freshness ושגיאה עם נתונים ישנים"
permalink: /android/topics/25-paging-offline-cache/
lang: he
full-width: true
tags: [Android, Java, HTTP, Room, pagination, offline]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [מעבדת HTTP]({{ '/android/topics/08-http-client/' | relative_url }}) · [מעבדת Room]({{ '/android/topics/12-room-persistence/' | relative_url }})

{: .box-success}
בסוף המעבדה מסך חדש טוען חמישה Todos בכל עמוד מ־API. כל תגובה מוצלחת נשמרת ב־Room, והמסך מציג **רק את הרשומות שנקראו מ־Room**. לחיצה על Offline מדלגת על הרשת ועדיין מציגה עמודים שנשמרו; Refresh שנכשל משאיר את הרשומות הישנות ומציג את הכשל. בדיקה עם MockWebServer מוכיחה את מקרה `HTTP 503` לאחר טעינה מוצלחת.

בסיס ההשוואה בפרויקט **topics** הוא **`codex/http-client`**, וענף התוצאה הוא **`codex/paging-offline-cache`**. ה־HTTP החד־פריטי נשאר עובד; מוסיפים לו מסך ייעודי דרך כפתור. זו פגינציה *ידנית ומפורשת* כדי לראות את ההחלטות. למוצר עם רשימה גדולה, פילטרים ומקורות מורכבים כדאי לעבור אחר כך ל־Paging 3 עם `PagingSource`/`RemoteMediator` על אותו עיקרון של מקור מקומי. [סקירת Paging](https://developer.android.com/topic/libraries/architecture/paging/v3-overview) ו־[רשת עם Room](https://developer.android.com/topic/libraries/architecture/paging/v3-network-db) מתארות את המיפוי.

## חוזה הנתונים

| מצב | מה רואים? | האם קוראים לרשת? | האם מוחקים את העמוד? |
|---:|---:|:---:|:---:|
| אין cache, online | מסך ריק בזמן בקשה | כן | אין מה למחוק |
| cache טרי, גיל פחות מדקה | נתונים מקומיים מיד | לא, אלא ב־Refresh | לא |
| cache ישן | נתונים ישנים עם סימון Stale | כן | רק אחרי תשובה תקינה |
| Offline | נתון מקומי, אם קיים | לא | לא |
| HTTP/רשת נכשלים | נתון מקומי והסבר על הכשל | הבקשה נכשלה | לא |
| HTTP הצליח | עמוד חדש שנשמר אטומית | הבקשה הסתיימה | מחליפים רק את אותו עמוד |

הבחירה המרכזית היא **Room כמקור לתצוגה**, לא מערך Retrofit שמוצג במקביל. כך ה־UI אינו צריך ליישב שתי רשימות סותרות. מדיניות freshness של דקה היא ערך *הדגמה*, לא אמת אוניברסלית: באפליקציית תחבורה דקה עשויה להיות ישנה מדי, ובספריית ספרים קצרה מדי. גם `Offline` כאן הוא מצב הדגמה שמכבה קריאות רשת באפליקציה; הוא אינו משנה את מצב המכשיר.

## 1. תשתית מסד אחרי מחסום Gradle

ב־**Gradle Scripts > libs.versions.toml** הוסיפו Room `2.8.5`,‏ `room-runtime`,‏ `room-compiler` ותוסף Room. הוסיפו `kotlinx-serialization-core` `1.8.1` כדרישת תאימות של גרסת Room הזו בפרויקט AGP הנוכחי. ב־`app/build.gradle.kts` הפעילו `alias(libs.plugins.room)`, הגדירו `schemaDirectory("$projectDir/schemas")`, הוסיפו runtime ו־`annotationProcessor(libs.room.compiler)`. השאירו את Retrofit,‏ Gson,‏ MockWebServer ותלויות התבנית הקיימות. הריצו Sync ובנייה לפני כל הפניה למחלקות Room שנוצרות; שמרו את קובץ schema v1 שנוצר בענף התוצאה.

ב־**app > kotlin+java > com.example.topics** צרו את קובצי המסד החדשים:

- `CachedTodo.java`: `@Entity`, מפתח ראשי `id`, שדות `page`,‏ `userId`,‏ `title`,‏ `completed`, ומתודת `from(Todo,page)` שמפרידה JSON ממבנה האחסון.
- `PageStamp.java`: `@Entity`, מפתח `page`,‏ `fetchedAt` ב־milliseconds ו־`count`. השורה קיימת גם לעמוד תקין וריק — אחרת לא נדע אם הוא לא נטען או נטען ללא תוצאות.
- `PageDao.java`: `items(page)` עם `ORDER BY id`,‏ `stamp(page)`,‏ `clearPage(page)`,‏ `putItems(...)`,‏ `putStamp(...)`.
- `PageCache.java`: `@Database(entities={CachedTodo.class,PageStamp.class}, version=1, exportSchema=true)` ומחזירה `PageDao`.

לא מוחקים את כל הטבלה ברענון: רק את הרשומות של העמוד המבוקש. `id` הוא זהות ה־Todo מהשרת, ו־`page` שומר את גבול העמוד שנשלף. ב־API עם פריטים שנכנסים לראש הרשימה בכל רגע, מספרי עמוד עלולים לזוז ונדרש cursor או מדיניות invalidation; זהו גבול הדוגמה.

## 2. API של עמוד וחוזה סוף

צרו `PagedTodoApi.java`:

```java
public interface PagedTodoApi {
    @GET("todos")
    Call<List<Todo>> page(@Query("_page") int page, @Query("_limit") int limit);
}
```

בדקנו שהשירות מחזיר `/todos?_page=2&_limit=5` עם חמישה פריטים וכותרות `Link` ו־`X-Total-Count`. בענף הדוגמה `PAGE_SIZE=5`; כאשר מתקבלים פחות מחמישה פריטים, כפתור Next מושבת. אם אורך העמוד הוא בדיוק חמישה, עדיין **לא מוכח** שיש עמוד הבא; ייתכן שהרשימה הסתיימה בדיוק בגבול. במוצר השתמשו ב־`Link`/total או ב־cursor של ה־API כדי לדעת בוודאות. שרת הדוגמה משמש רק למעבדה ואינו מקור נתונים של מוצר.

## 3. ה־Repository מתווכת בין local ל־remote

`PagedTodoRepository` היא קובץ חדש בענף התוצאה. היא יוצרת Room,‏ Retrofit ו־`ExecutorService` יחיד. `load(page, offline, force, listener)` פועלת בסדר הבא:

1. מבטלת `Call` קודם ומגדילה `generation`; עבודה ישנה בתור אינה מפרסמת תוצאה חדשה.
2. קוראת `PageStamp` ואת רשומות העמוד בשרשור הרקע, ומחזירה אותן מיד עם `done=false` אם יש רענון צפוי.
3. אם offline או שהעמוד טרי והמשתמש לא ביקש Refresh, מסיימת בלי HTTP.
4. אחרת מפעילה `Call<List<Todo>>.execute()` ברקע, בודקת status וגוף, וממירה כל `Todo` ל־`CachedTodo` אחרי בדיקת `id/title`.
5. `database.runInTransaction` מוחקת את *אותו עמוד*, מוסיפה את הרשומות וכותבת `PageStamp` עם הזמן ומספר הרשומות. אחרי העסקה קוראת שוב מ־DAO ומחזירה את הנתון המקומי.
6. במקרה HTTP/IOException/JSON לא תקין, מחזירה את רשומות ה־cache והודעת כשל. אין מחיקה ואין סימון כטרי.

קטע ההכרעה המרכזי:

```java
PageStamp stamp = dao.stamp(page);
List<CachedTodo> cached = dao.items(page);
boolean fresh = stamp != null && System.currentTimeMillis() - stamp.fetchedAt < 60_000;
boolean complete = offline || (fresh && !force);
listener.accept(new Result(cached, source, complete,
        stamp != null && stamp.count == PAGE_SIZE));
if (complete) return;
```

והחלפה האטומית:

```java
database.runInTransaction(() -> {
    dao.clearPage(page);
    dao.putItems(incoming);
    dao.putStamp(new PageStamp(page, System.currentTimeMillis(), incoming.size()));
});
List<CachedTodo> stored = dao.items(page);
```

אל תבצעו Room או HTTP ב־UI thread. `runInTransaction` מונעת מצב שבו עמוד ישן נמחק וחדש נכתב רק בחלקו; אם הכתיבה נכשלת, הנתון הקודם נשאר. ב־`close()` ה־Repository מבטלת בקשה פעילה, מסדרת סגירת DB אחרי העבודה בתור ומכבה executor. [מדריך Room](https://developer.android.com/training/data-storage/room) מתאר את שכבות Entity/DAO/Database.

## 4. מסך עמודים שמציג מקור ומצב

ב־`MainActivity.java` הקיים הוסיפו **כפתור אחד** `open_paged` ל־`activity_main.xml` וחברו `Intent` ל־`PagedTodosActivity`; ב־Manifest רשמו Activity פנימית `exported=false`. צרו `activity_paged_todos.xml` חדש עם `ScrollView`, כותרת, `Switch id=offline`, כפתורי `previous`,‏ `next`,‏ `refresh`,‏ `TextView id=status` ו־`TextView id=items`. `PagedTodosActivity` מחזיקה `page=1` ו־`generation`, קוראת ל־Repository, ומציגה כל `CachedTodo` כ־ID, מצב וכותרת. היא משביתה ניווט בזמן בקשה, משחזרת `page/offline` ב־`onSaveInstanceState`, ומתעלמת מ־callback של בקשה ישנה או Activity שנהרסה.

הטקסט במסך מכיל גם מקור התוצאה: **Fresh local page**,‏ **Stale local page**,‏ **Network page saved to Room** או **Offline**. בלי הסימון הזה, משתמש ומפתח אינם יכולים להבחין בין מידע מעודכן לנתון ישן. כפתור Refresh עוקף TTL, אבל Offline ממשיך לדלג על רשת — סדר החלטות מכוון.

## ראיות ובדיקות

1. באמולטור, Page 1 נטען מן הרשת ונשמר עם Todos ‏1–5. Next טען את 6–10. סימון Offline בעמוד 2 הציג **Offline: Fresh local page** עם אותן רשומות.
2. בדיקת `PagedTodoRepositoryTest` מפעילה MockWebServer: עמוד 77 מצליח ונשמר, ואז Refresh מחזיר `HTTP 503`. היא מאשרת שה־Todo השמור עדיין מוצג ושהבקשה השתמשה ב־`_page=77&_limit=5`. `:app:connectedDebugAndroidTest` עבר.
3. כבו רשת במכשיר או השתמשו במצב Offline של המעבדה, עברו לעמוד שלא נשמר, וודאו שמתקבל **No cached page** ללא נתונים. חזרו לעמוד שמור ואז הפעילו מחדש את התהליך: הנתון נשאר ב־Room.
4. נסחו מדיניות למוצר שלכם: אחרי כמה זמן עמוד נחשב ישן? האם רענון כושל משאיר נתונים? כיצד יודעים שהגענו לסוף כאשר כמות הפריטים שווה בדיוק לגודל עמוד?

**המשך ל־Paging 3:** החליפו את כפתורי Previous/Next ב־`Pager`,‏ `PagingSource` שקורא מ־Room ו־`RemoteMediator` שמביא עמודים ומנהל מפתחות. השאירו את האינווריאנט: ה־UI מקבלת נתונים מן המסד, והשלמת בקשת רשת משנה את המסד בעסקה. כך ספריית Paging פותרת עומס, גלילה ו־retry בלי לשנות את חוזה ה־offline של המוצר.
