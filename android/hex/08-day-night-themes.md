---
layout: page
title: "Hex — 08: ערכות נושא ליום וללילה"
subtitle: "צבעי משחק לפי מצב המכשיר, בלי לשנות את ערכת הנושא הקיימת"
permalink: /android/hex/08-day-night-themes/
tags: [Android, Java, Hex, Material3]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/07-supplied-rl-models/' | relative_url }})

{: .box-success}
**בסוף הפרק:** Hex מציגה צבעי משחק בהירים במצב יום וכהים במצב לילה, לפי הגדרת המכשיר. בודקים את שני המצבים באמולטור ומבינים כיצד Android בוחרת משאב צבע מתאים.

## הרעיון

למסך של פרק 7 כבר יש שמות צבעים כגון `paper`,‏ `ink` ו־`hex_red`. ה־XML משתמש בשמות האלה, ו־`HexBoardView` קוראת את צבעי הלוח דרך `R.color`. לכן אין צורך בשני מסכים או בתנאי Java שבודק אם חשוך: Android יכולה לבחור ערך אחר לאותו שם משאב מתוך `values-night`.

ערכת הנושא הקיימת כבר יורשת מ־`Theme.Material3.DayNight.NoActionBar`. בקובץ `values-night/themes.xml` נשאר סגנון `Base.Theme.Hex` שנוצר עם הפרויקט; אין שם הגדרה נוספת של `Theme.Hex`, ואין צורך להוסיף אותה כדי ש־Android תבחר צבעי לילה. לפני הוספת הצבעים נבדוק איך המסך נראה בחושך; אחר כך נוסיף ערכי לילה לאותם שמות צבעים ונבדוק שוב.

השינוי בקוד של הפרק מוגבל ל**קובץ משאבים אחד**, `values-night/colors.xml`. קובצי `themes.xml`,‏ `values/colors.xml`,‏ `activity_main.xml`,‏ `HexBoardView.java` וה־Manifest נשארים כפי שהם.

## לפני שמתחילים: בודקים מצב לילה

הריצו את האפליקציה והפעילו מצב לילה באמולטור. שימו לב לצבעי הרקע, הלוח, הכרטיס, הטקסט והפקדים לפני שיש קובץ `values-night/colors.xml`. אין צורך לשנות את `values-night/themes.xml`: בשלב הזה `Theme.Hex` עדיין מוגדר רק בתיקיית `values`.

**שינוי מצב התצוגה באמולטור של Android Studio:** בסרגל העליון של חלון האמולטור לחצו על **Device UI Shortcuts** (הכפתור המסומן בצהוב בתמונה). בחלונית **Device Settings** הפעילו או כבו את **Dark Theme** (המתג המסומן באדום). חזרו לאפליקציה לאחר כל שינוי.

![הכפתור Device UI Shortcuts בסרגל האמולטור ומתג Dark Theme בחלונית Device Settings]({{ '/android/hex/emulator-dark-theme-toggle.png' | relative_url }})

## מוסיפים צבעי לילה

**מיקום:** app > res > values-night. לחצו לחיצה ימנית על התיקייה, בחרו **New > Values Resource File**, קראו לקובץ `colors.xml` והכניסו את כולו:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ink">#EAF1F8</color>
    <color name="paper">#101A25</color>
    <color name="surface">#1D2B3B</color>
    <color name="hex_empty">#344252</color>
    <color name="hex_red">#800030</color>
    <color name="hex_blue">#30589A</color>
    <color name="hex_line">#9CADBE</color>
    <color name="muted">#AAB8C8</color>
</resources>
```

שמונה השמות זהים לאלה שב־`app > res > values > colors.xml`. `paper` הוא רקע החלון, `surface` הוא רקע הכרטיס, `ink` הוא טקסט עיקרי ו־`muted` הוא טקסט משני. ארבעת צבעי `hex_*` משמשים את התאים, האבנים וקווי הלוח. כשמצב הלילה פעיל, בקשה ל־`@color/ink` או ל־`R.color.hex_red` מקבלת את הערך מהתיקייה החדשה; ביום היא מקבלת את הערך מהתיקייה הרגילה.

{: .box-note}
השאירו את שמות המשאבים זהים בשתי התיקיות. אין צורך לשכפל את קובץ ה־layout: ההפניות הקיימות לצבעים ייבחרו מחדש בהתאם למצב המכשיר.

## מריצים ובודקים

1. השאירו את `values-night/themes.xml` ללא שינוי. הריצו שוב את האפליקציה כש־**Dark Theme** פעיל והשוו למסך שראיתם לפני יצירת `colors.xml`. בדקו שרקע המסך והכרטיס כהים, הטקסט בהיר, צבעי הלוח השתנו והפקדים קריאים. `Theme.Hex` עדיין אינו מוגדר בקובץ הלילה, ובכל זאת צבעי הלילה נבחרים.
2. אם תרצו לאמת איזה קובץ צבעים נבחר, שנו זמנית את `hex_red` בקובץ החדש ל־`#00FF80`, הריצו שוב וראו שהאבנים והכיתוב האדומים נעשים ירוקים בלילה. החזירו את הערך ל־`#FF7780` לאחר הבדיקה.
3. כבו את **Dark Theme** באותה חלונית **Device Settings** ובדקו שצבעי היום חוזרים ושהמשחק עדיין מקבל מהלכים. אין בפרק הזה מתג ערכת נושא בתוך האפליקציה; הבחירה מגיעה מהמכשיר.

{: .box-warning}
החלפת מצב התצוגה עשויה ליצור מחדש את ה־Activity. במימוש הנוכחי המשחק נוצר מחדש ב־`onCreate`, לכן מעבר בין יום ללילה באמצע משחק עשוי לאפס את הלוח. השינוי בפרק הזה מטפל בצבעים; שמירת משחק לאורך שינוי תצורה היא נושא נפרד.

**שאלת הבנה:** אם `activity_main.xml` מבקש `@color/ink` בשני המצבים, כיצד אותו `TextView` מקבל צבע אחר בלילה בלי שינוי ב־Java?
