---
layout: page
title: "יישור העיצוב של TicTacMenu עם TicTacToeSignalR"
subtitle: "ערכת צבעים, סרגל כחול ולוח משחק ברור — בלי לשנות את מבנה האפליקציה"
tags: [Android, XML, Material3, theming, TicTacMenu, exam-prep]
lang: he
---

{: .box-note}
המדריך הוא אופציונאלי ומטרתו לשפר את העיצור.

## מה אנחנו מעבירים?

יש שלושה פרטים חזותיים שכדאי לשפר:

1. כחול כהה כצבע הראשי וכתום כצבע משלים.
2. סרגל ניווט כחול עם כותרת ואייקון לבנים.
3. משבצות לבנות, ישרות ומופרדות היטב בלוח המשחק.

בסוף השינוי אין צורך לגעת ב־Java, ב־Manifest, ב־SignalR או בלוגיקת המשחק.



## שלב 1 — מגדירים לוח צבעים במקום לפזר קודי צבע

פתחו ב־Android Studio את:

`app > res > values > colors.xml`

שמרו את הצבעים `black` ו־`white` שכבר קיימים, והוסיפו בתוכו:

```xml
<color name="primary">#1F5A83</color>
<color name="primary_dark">#173F5C</color>
<color name="accent">#E6843A</color>
<color name="toolbar_background">#1F5A83</color>

<color name="board_cell_background">#FFFFFFFF</color>
<color name="board_cell_stroke">#FF222222</color>
<color name="board_cell_text">#FF111111</color>
```

כך לכל צבע יש שם שמסביר את תפקידו. אם נרצה לשנות את המראה בעתיד, נשנה את הצבע במקום אחד בלבד.

כעת פתחו:

`app > res > values > themes.xml`

בתוך `Base.Theme.TicTacMenu`, במקום ההערות הריקות, הוסיפו:

```xml
<item name="colorPrimary">@color/primary</item>
<item name="colorOnPrimary">@color/white</item>
<item name="colorSecondary">@color/accent</item>
<item name="colorOnSecondary">@color/black</item>
<item name="android:statusBarColor">@color/primary_dark</item>
```

הסגנון השלם נשאר Material 3:

```xml
<style name="Base.Theme.TicTacMenu" parent="Theme.Material3.DayNight.NoActionBar">
    <item name="colorPrimary">@color/primary</item>
    <item name="colorOnPrimary">@color/white</item>
    <item name="colorSecondary">@color/accent</item>
    <item name="colorOnSecondary">@color/black</item>
    <item name="android:statusBarColor">@color/primary_dark</item>
</style>
```

בצעו את אותה הוספה גם בתוך `Base.Theme.TicTacMenu` שבקובץ:

`app > res > values-night > themes.xml`

<div markdown="1" class="box-success">

**נקודת בדיקה 1:** הריצו את האפליקציה. היא אמורה להיבנות כרגיל, בלי שינוי בלוגיקת המשחק. רכיבי Material יקבלו מעתה את הכחול והכתום מתוך ערכת הנושא.

</div>

## שלב 2 — צובעים את סרגל המגירה

פתחו:

`app > res > layout > activity_menu.xml`

אתרו את `MaterialToolbar`. השאירו את סוג הרכיב ואת המזהה שלו כפי שהם, ושנו רק את מאפייני העיצוב הבאים:

```diff
 <com.google.android.material.appbar.MaterialToolbar
     android:id="@+id/toolbar"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
-    android:background="?attr/colorSurface"
+    android:background="@color/toolbar_background"
     android:theme="@style/ThemeOverlay.Material3.ActionBar"
-    app:title="@string/app_name" />
+    app:navigationIconTint="@color/white"
+    app:title="@string/app_name"
+    app:titleTextColor="@color/white" />
```

`titleTextColor` צובע את שם האפליקציה, ו־`navigationIconTint` צובע את אייקון ההמבורגר שפותח את המגירה.

<div markdown="1" class="box-success">

**נקודת בדיקה 2:** פתחו את מסך התפריט. הסרגל צריך להיות כחול, ושם האפליקציה ואייקון המגירה צריכים להיות לבנים. ודאו שהמגירה עדיין נפתחת.

</div>

## שלב 3 — יוצרים רקע חוזר למשבצות המשחק

ב־Android Studio לחצו לחיצה ימנית על:

`app > res > drawable`

בחרו **New > Drawable Resource File**, קראו לקובץ `bg_square_button`, והכניסו בו:

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <solid android:color="@color/board_cell_background" />

    <stroke
        android:width="1dp"
        android:color="@color/board_cell_stroke" />

    <corners android:radius="0dp" />
</shape>
```

פתחו:

`app > res > layout > activity_main.xml`

לכל תשעת כפתורי הלוח, מ־`button00` ועד `button22`, הוסיפו:

```xml
android:background="@drawable/bg_square_button"
android:backgroundTint="@null"
android:textColor="@color/board_cell_text"
```

לדוגמה, המשבצת הראשונה תהיה:

```xml
<Button
    android:id="@+id/button00"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:background="@drawable/bg_square_button"
    android:backgroundTint="@null"
    android:onClick="onCellClick"
    android:tag="0,0"
    android:textColor="@color/board_cell_text"
    android:textSize="24sp" />
```

`backgroundTint="@null"` חשוב ב־Material 3: הוא מונע מצב שבו גוון ברירת המחדל של הכפתור מכסה את ה־drawable הלבן שלנו.

<div markdown="1" class="box-success">

**נקודת בדיקה 3:** פתחו את המשחק. צריך להופיע לוח של תשע משבצות לבנות עם קווים כהים. לחיצה על כל משבצת עדיין צריכה להציג `X` או `O`, וזיהוי ניצחון או תיקו צריך להמשיך לעבוד ללא שינוי.

</div>

## המשך

- [021a - פרסום חדרי משחק ב־Firebase RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms)
