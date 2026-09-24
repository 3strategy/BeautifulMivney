---
layout: page
title: "Hex — 08: ערכות נושא ליום וללילה"
subtitle: "צבעים לפי מצב המכשיר, רכיבי Material 3 ואייקוני שורת המצב"
permalink: /android/hex/08-day-night-themes/
tags: [Android, Java, Hex, Material3]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/07-supplied-rl-models/' | relative_url }})

{: .box-success}
**בסוף הפרק:** Hex מציגה צבעים בהירים במצב יום וצבעים כהים במצב לילה, לפי הגדרת המכשיר. הלוח, הכרטיס, הפקדים ושורת המצב נשארים קריאים בשני המצבים.

## הרעיון

למסך של פרק 7 כבר יש שמות צבעים כגון `paper`,‏ `ink` ו־`hex_red`. ה־XML משתמש בשמות האלה, ו־`HexBoardView` קוראת את צבעי הלוח דרך `R.color`. לכן אין צורך בשני מסכים או בתנאי Java שבודק אם חשוך: Android יכולה לבחור ערך אחר לאותו שם משאב מתוך `values-night`.

עד עכשיו `values-night/themes.xml` כפה ערכת נושא בהירה גם כשהמכשיר היה במצב לילה. בפרק הזה נותנים ל־`Theme.Hex` של הלילה לרשת את `Base.Theme.Hex` המשותפת, שההורה שלה הוא `Theme.Material3.DayNight.NoActionBar`. נוסיף צבעי לילה לאותם שמות שכבר קיימים ביום, ונחבר גם את רכיבי Material לצבעי המשחק.

## מתחילים מהמצב שעבד

המשיכו מהפרויקט של פרק 7. משנים **שלושה קובצי משאבים בלבד**; `values/colors.xml`,‏ `activity_main.xml`,‏ `HexBoardView.java` וה־Manifest נשארים כפי שהם. בקטעי ה־diff שורות `-` נמחקות ושורות `+` נוספות; אין להקליד את הסימנים עצמם.

## 1. מוסיפים צבעי לילה

**מיקום:** app > res > values-night. לחצו לחיצה ימנית על התיקייה, בחרו **New > Values Resource File**, קראו לקובץ `colors.xml` והכניסו את כולו:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ink">#EAF1F8</color>
    <color name="paper">#101A25</color>
    <color name="surface">#1D2B3B</color>
    <color name="hex_empty">#344252</color>
    <color name="hex_red">#FF7780</color>
    <color name="hex_blue">#70B8EA</color>
    <color name="hex_line">#9CADBE</color>
    <color name="muted">#AAB8C8</color>
</resources>
```

שמונה השמות זהים לאלה שב־`app > res > values > colors.xml`. `paper` הוא רקע החלון, `surface` הוא רקע הכרטיס, `ink` הוא טקסט עיקרי ו־`muted` הוא טקסט משני. ארבעת צבעי `hex_*` משמשים את התאים, האבנים וקווי הלוח. כשמצב הלילה פעיל, בקשה ל־`@color/ink` או ל־`R.color.hex_red` מקבלת את הערך מהתיקייה החדשה; ביום היא מקבלת את הערך מהתיקייה הרגילה.

{: .box-note}
השאירו את שמות המשאבים זהים בשתי התיקיות. אין צורך לשכפל את קובץ ה־layout: ההפניות הקיימות לצבעים ייבחרו מחדש בהתאם למצב המכשיר.

## 2. מחברים את צבעי המשחק לרכיבי Material

**מיקום:** app > res > values > themes.xml. בתוך `Base.Theme.Hex`, אחרי `colorSecondary`, הוסיפו חמש שורות. ההורה `Theme.Material3.DayNight.NoActionBar` כבר נמצא בקובץ; משאירים אותו כפי שהוא.

```diff
 <style name="Base.Theme.Hex" parent="Theme.Material3.DayNight.NoActionBar">
     <item name="colorPrimary">@color/hex_blue</item>
     <item name="colorSecondary">@color/hex_red</item>
+    <item name="colorSurface">@color/surface</item>
+    <item name="colorOnSurface">@color/ink</item>
+    <item name="colorOnSurfaceVariant">@color/muted</item>
+    <item name="colorSecondaryContainer">@color/hex_empty</item>
+    <item name="colorOnSecondaryContainer">@color/ink</item>
     <item name="android:colorAccent">@color/hex_blue</item>
```

`colorSurface`/`colorOnSurface` הם זוג של רקע וטקסט עליו; `colorOnSurfaceVariant` משמש טקסט משני. `colorSecondaryContainer`/`colorOnSecondaryContainer` הם זוג נוסף שרכיבי Material יכולים להשתמש בו, למשל הכפתור הטונאלי. הגדרת הזוגות עוזרת לפקדים שאינם צבועים במפורש ב־layout להשתלב בלוח הצבעים שלנו. הערכים עצמם משתנים עם מצב המכשיר כי הם מצביעים אל שמות הצבעים של שלב 1.

## 3. מפשטים את ערכת הלילה

**מיקום:** app > res > values-night > themes.xml. החליפו את הסגנון הישן בקטע הבא:

```diff
 <resources>
-    <style name="Base.Theme.Hex" parent="Theme.Material3.Light.NoActionBar">
-        <item name="colorPrimary">@color/hex_blue</item>
-        <item name="colorSecondary">@color/hex_red</item>
-        <item name="android:fontFamily">sans</item>
-        <item name="android:windowLightStatusBar">true</item>
-        <item name="android:navigationBarColor">@color/paper</item>
-        <item name="android:statusBarColor">@color/paper</item>
-        <item name="android:windowBackground">@color/paper</item>
+    <style name="Theme.Hex" parent="Base.Theme.Hex">
+        <item name="android:windowLightStatusBar">false</item>
     </style>
 </resources>
```

ב־`values/themes.xml`, הסגנון `Theme.Hex` כבר יורש את `Base.Theme.Hex`; זו גם הערכה שה־Manifest מפנה אליה. בלילה Android בוחרת את ההגדרה של `Theme.Hex` מתוך `values-night`, ולכן היא יורשת את כל ההגדרות המשותפות בלי להעתיק אותן. `android:windowLightStatusBar` שווה `true` ביום כדי לקבל אייקונים כהים על רקע בהיר, ו־`false` בלילה כדי לקבל אייקונים בהירים על רקע כהה. צבע הרקע של שורת המצב נשאר `@color/paper`, שמשנה ערך בין יום ללילה.

## מריצים ובודקים

1. בנו והפעילו את האפליקציה במצב **Light** של המכשיר או האמולטור. בדקו שרקע המסך בהיר, הטקסט כהה, והמשחק עדיין מקבל מהלכים.
2. שנו בהגדרות המכשיר או ב־Quick Settings את **Dark theme** למצב פעיל וחזרו לאפליקציה. בדקו שרקע המסך כהה, הטקסט בהיר, תאי הלוח והאבנים ברורים, הכרטיס והכפתור קריאים, והאייקונים בשורת המצב בהירים.
3. כבו את **Dark theme** ובדקו שצבעי היום חוזרים. אין בפרק הזה מתג ערכת נושא בתוך האפליקציה; הבחירה מגיעה מהמכשיר.

{: .box-warning}
החלפת מצב התצוגה עשויה ליצור מחדש את ה־Activity. במימוש הנוכחי המשחק נוצר מחדש ב־`onCreate`, לכן מעבר בין יום ללילה באמצע משחק עשוי לאפס את הלוח. השינוי בפרק הזה מטפל בצבעים; שמירת משחק לאורך שינוי תצורה היא נושא נפרד.

**שאלת הבנה:** אם `activity_main.xml` מבקש `@color/ink` בשני המצבים, כיצד אותו `TextView` מקבל צבע אחר בלילה בלי שינוי ב־Java?
