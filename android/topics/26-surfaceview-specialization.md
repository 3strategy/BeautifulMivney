---
layout: page
title: "Android topics — 26: מתי באמת צריך SurfaceView או ContentProvider?"
subtitle: "לולאת ציור למשחק, בעלות על Surface וגבול שיתוף בין אפליקציות"
permalink: /android/topics/26-surfaceview-specialization/
lang: he
full-width: true
tags: [Android, Java, SurfaceView, ContentProvider, Canvas]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [Canvas ב־CollectCircles]({{ '/android/CollectCircles/01.collect-circles-drawing' | relative_url }})

{: .box-success}
בסוף המעבדה כדור נע ומתנגש בגבולות על `SurfaceView`; נגיעה ממקמת אותו מחדש. שרשור ציור יחיד פועל רק כשה־Activity וה־Surface פעילים, ובדיקת מכשיר מאשרת שמספר הפריימים מפסיק לגדול ב־Pause וחוזר לגדול ב־Resume. ה־Surface מגשימה צורך של *לולאת ציור רציפה* במשחק קטן.

בסיס ההשוואה בפרויקט **topics** הוא `master`, וענף התוצאה הוא **`codex/surfaceview-game-loop`**. השיעור מלמד התמחות אחת לעומק. `ContentProvider` מוסבר בהמשך כחלופה למטרה אחרת לחלוטין — שיתוף נתונים בין אפליקציות — ואין הצדקה להוסיף אותו למשחק הכדור רק כדי לצבור רכיב Android נוסף.

## קודם שואלים מה הבעיה

| צורך אמיתי | כלי מתאים | למה? |
|---:|:---|---:|
| ציור שמשתנה רק אחרי לחיצה | Custom View + `onDraw()`/`invalidate()` | פשוט ומשתלב במחזור הציור הרגיל |
| פריימים רציפים עם חישוב פיזיקה בשרשור ייעודי | `SurfaceView` + `SurfaceHolder` | בעלות ברורה על משטח ציור שנגיש לשרשור רקע |
| שיתוף רשומות עם אפליקציה אחרת באמצעות `content://` והרשאות | `ContentProvider` | חוזה `query`/`insert`/`delete` בין תהליכים |
| נתון שרק האפליקציה עצמה צריכה | Room/קובץ פרטי | אין צורך בחוזה שיתוף חיצוני |

ב־CollectCircles כבר לומדים [ציור מותאם ב־Canvas]({{ '/android/CollectCircles/01.collect-circles-drawing' | relative_url }}). עבור מסך קטן שמתעדכן על אירוע, התחילו משם. [תיעוד ציור מותאם](https://developer.android.com/develop/ui/views/layout/custom-views/custom-drawing) מציג `onDraw`. המעבדה הנוכחית מתחילה כשיש צורך ייחודי: משחק שמצייר שוב ושוב, בערך אחת ל־16ms, ובעל מחזור חיים של Surface. [תיעוד SurfaceView](https://developer.android.com/reference/android/view/SurfaceView) מתאר את השימוש בשרשור משני.

## 1. מציבים משטח ואזור הסבר

ב־**app > res > layout > activity_main.xml** החליפו את TextView היחיד בשני ילדים של `ConstraintLayout id=main`: `TextView id=instruction` בראש עם `@string/ball_instruction`, ומתחתיו `com.example.topics.BouncingBallView id=ball` ש־`layout_width`/`layout_height` שלו `0dp` והוא constrained ל־`top` של התחתית של ההסבר, ל־`bottom` של ההורה ולשני הצדדים. השאירו את טיפול ה־window insets ב־Activity. ב־**app > res > values > strings.xml** הוסיפו `ball_instruction` ו־`ball_description`; תיאור נגישות מסביר שיש אנימציה ופעולת נגיעה, אף שבמשחק אמיתי צריך גם חלופת שליטה נגישה.

ב־`MainActivity.java` הוסיפו רק קריאות מחזור חיים:

```java
@Override protected void onResume() {
    super.onResume();
    binding.ball.resume();
}

@Override protected void onPause() {
    binding.ball.pause();
    super.onPause();
}
```

ה־Activity אינה מציירת בעצמה. היא אומרת ל־View מתי המסך פעיל; ה־View אחראית למשטח ולשרשור. שימרו את שני התנאים: `Activity` יכולה להיות resumed בזמן שה־Surface עוד לא נוצרה, ולהפך.

## 2. Surface תקפה רק בין שני callbacks

צרו `BouncingBallView.java` ב־**app > kotlin+java > com.example.topics**, שיורשת `SurfaceView` ומממשת `SurfaceHolder.Callback`. בבנאי שימרו `holder = getHolder()`, הוסיפו `holder.addCallback(this)`, הכינו `Paint` פעם אחת וחשבו רדיוס ב־dp. השתמשו בשדות `resumed`,‏ `surfaceReady`,‏ `running` ו־`Thread renderer`:

```java
public void resume() { resumed = true; startIfReady(); }
public void pause() { resumed = false; stopRenderer(); }

@Override public void surfaceCreated(SurfaceHolder holder) {
    surfaceReady = true;
    startIfReady();
}
@Override public void surfaceDestroyed(SurfaceHolder holder) {
    surfaceReady = false;
    stopRenderer();
}

private void startIfReady() {
    if (!resumed || !surfaceReady || renderer != null) return;
    running = true;
    renderer = new Thread(this::renderLoop, "ball-renderer");
    renderer.start();
}
```

`SurfaceHolder.Callback` אומרת שהמשטח נגיש רק אחרי `surfaceCreated` ולפני `surfaceDestroyed`. בתיעוד [surfaceDestroyed](https://developer.android.com/reference/android/view/SurfaceHolder.Callback#surfaceDestroyed(android.view.SurfaceHolder)) מודגש ששרשור ציור חייב לסיים להשתמש במשטח **לפני שה־callback חוזר**. לכן `stopRenderer()` מציבה `running=false`, מפריעה ל־sleep וקוראת `join()` לשרשור לפני איפוס ההפניה. אין לפתוח שני render threads אחרי חזרה מהירה לאפליקציה.

## 3. פריים: זמן, תנועה, ציור ופרסום

בלולאה בענף התוצאה זמן הפריים הוא `dt` בשניות מתוך `System.nanoTime()`, עם תקרה של `0.05f`. אם תהליך הושהה, כדור לא יקפוץ בבת אחת מרחק של דקות. המהירויות `vx=360`,‏ `vy=280` הן **פיקסלים לשנייה**. בכל סיבוב מוסיפים `vx*dt`,‏ `vy*dt`, הופכים את סימן המהירות כשמגיעים לקיר ומחזירים את המיקום לגבול החוקי.

```java
Canvas canvas = null;
try {
    canvas = holder.lockCanvas();
    if (canvas != null) {
        canvas.drawColor(Color.rgb(15, 25, 45));
        synchronized (positionLock) {
            x += vx * dt;
            y += vy * dt;
            // Clamp to the visible bounds and reverse velocity at a wall.
            paint.setColor(Color.rgb(64, 210, 244));
            canvas.drawCircle(x, y, radius, paint);
        }
        frames.incrementAndGet();
    }
} finally {
    if (canvas != null) holder.unlockCanvasAndPost(canvas);
}
```

ה־`drawColor` מנקה את כל הבאפר בכל פריים; אין להניח שהוא שומר אוטומטית את הציור הישן. `unlockCanvasAndPost` חייבת להיקרא עבור Canvas שננעלה גם אם החישוב נכשל. `Thread.sleep(Math.max(1, 16-elapsedMs))` נותנת מגבלת קצב פשוטה כדי שהלולאה לא תשרוף CPU. זו קירוב חינוכי, לא סנכרון מקצועי עם קצב המסך או מנוע משחק. [תיעוד SurfaceHolder](https://developer.android.com/reference/android/view/SurfaceHolder) מפרט lock/post.

`onTouchEvent(ACTION_DOWN)` מעדכנת `x/y` של הכדור בתוך אותו `positionLock` שבו משתמש שרשור הציור. זהו הגבול בין UI thread ל־render thread. בלי נעילה, חצי עדכון או ערך ישן יכולים ליצור קפיצה. אין לגעת ב־TextView מתוך שרשור הציור; אם צריך משוב נגיש או ניקוד, שלחו state ל־UI thread.

## 4. בדיקה שמוכיחה שהלולאה נעצרת

בענף התוצאה `getFrameCount()` קוראת `AtomicInteger`. `SurfaceLoopTest` מפעילה את `MainActivity` באמצעות `ActivityScenario`, ממתינה לפריימים, עוברת ל־`Lifecycle.State.STARTED`, ממתינה שוב ומאשרת שהמספר **לא גדל**, ואז חוזרת ל־`RESUMED` ומאשרת שהוא גדל. `:app:connectedDebugAndroidTest` עבר באמולטור. צילום מסך של האמולטור הראה כדור תכלת על רקע כהה; נגיעה מזיזה את נקודת ההתחלה שלו. נסו גם מעבר מהיר Home→אפליקציה, סיבוב מסך וכיבוי/הדלקת מסך. במוצר אמיתי שמרו גם מיקום/מהירות כאשר סיבוב מסך לא אמור לאפס משחק.

## ומה לגבי ContentProvider?

`ContentProvider` מתאים כאשר אפליקציה **אחרת** צריכה לקרוא נתון דרך `ContentResolver` ו־URI מסוג `content://authority/path`, ואנחנו צריכים חוזה, MIME type, הרשאות ו־`Cursor` או API תואם. למשל: אפליקציית מערכת קבצים פותחת מסמך שהאפליקציה שלנו משתפת, או אפליקציית לוח לימודים מפרסמת רשימת שיעורים לאפליקציית בית־ספר אחרת. [תיעוד ContentProvider](https://developer.android.com/guide/topics/providers/content-provider-basics) ו־[FileProvider](https://developer.android.com/reference/androidx/core/content/FileProvider) מציגים שני מסלולים: הראשון לחוזה נתונים כללי, השני לשיתוף קבצים זמני כמו במעבדת [המצלמה]({{ '/android/topics/19-camera-gallery-storage/' | relative_url }}).

**משימת בחירה:** תכננו אפליקציית לוח ציונים ואפליקציית הורה נפרדת. איזו שאילתת `content://` תרצו לאפשר, איזו הרשאה תגן עליה, ואיך תמנעו חשיפת ציוני תלמידים אחרים? רק אם יש צרכן חיצוני אמיתי ובדיקת הרשאות בין שתי אפליקציות, מימוש `ContentProvider` מוצדק. למשחק הכדור כאן אין צרכן כזה.
