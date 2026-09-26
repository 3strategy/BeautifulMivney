---
layout: page
title: "Hex — 09: ערכות נושא ואייקון האפליקציה"
subtitle: "צבעי יום ולילה ואייקון Hex למסך הבית"
permalink: /android/hex/09-day-night-themes/
tags: [Android, Java, Hex, Material3]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/08-hint/' | relative_url }}){: data-sequence-nav="prev"}

{: .box-success}
**בסוף הפרק:** צבעי המשחק מתחלפים אוטומטית לפי מצב התצוגה של המכשיר, ואייקון Hex מופיע במסך הבית.

## הרעיון

המסך כבר משתמש בשמות צבעים כמו `paper`,‏ `ink` ו־`hex_red`. Android יכולה לבחור ערכים אחרים לאותם שמות כשהמכשיר במצב לילה.

ערכת הנושא הקיימת כבר תומכת ביום ובלילה. נשאיר את קובצי `themes.xml` ללא שינוי, ונוסיף רק `values-night/colors.xml`.

## בודקים ומוסיפים צבעים

לפני השינוי, הריצו את האפליקציה במצב לילה ושימו לב לצבעים. באמולטור לחצו על **Device UI Shortcuts** בסרגל העליון, ואז הפעילו או כבו **Dark Theme** בחלונית **Device Settings**:

![הכפתור Device UI Shortcuts בסרגל האמולטור ומתג Dark Theme בחלונית Device Settings]({{ '/android/hex/emulator-dark-theme-toggle.png' | relative_url }})

ב־`app > res > values-night` צרו קובץ `colors.xml` עם הערכים הבאים:

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
    <color name="hex_hint">#D18B00</color>
    <color name="muted">#AAB8C8</color>
</resources>
```

השמות זהים לאלה שב־`values/colors.xml`. בלילה Android בוחרת את הערכים מהקובץ החדש; ביום היא משתמשת בערכים הרגילים. לא צריך לשנות את ה־layout או את Java.

## מחליפים את אייקון האפליקציה

עד עכשיו נשאר אייקון ברירת המחדל של תבנית Android Studio. הורידו את [קובצי אייקון Hex]({{ '/android/hex/downloads/09-hex-launcher-icon.zip' | relative_url }}) וחלצו את ה־ZIP. בתוך התיקייה `drawable` שבארכיון נמצאים שני קבצים:

- `ic_launcher_background.xml` — הרקע הכהה של האייקון.
- `ic_launcher_foreground.xml` — לוח המשושים והאבנים.

בתצוגת **Android** של Android Studio פתחו `app > res > drawable`. העתיקו לשם את שני קובצי ה־XML שחילצתם ואשרו החלפה של הקבצים בעלי אותם השמות. שני הקבצים נלקחו מגרסת Hex המקורית; אין צורך לצייר אותם מחדש.

הקבצים `ic_launcher.xml` ו־`ic_launcher_round.xml` שב־`app > res > mipmap` כבר מפנים אל שכבות ה־`drawable` האלה. גם `app > manifests > AndroidManifest.xml` כבר מפנה אל `@mipmap/ic_launcher` ואל `@mipmap/ic_launcher_round`, ולכן לא משנים את ה־manifest.

## מריצים ובודקים

1. הפעילו **Dark Theme** והשוו לבדיקה שלפני השינוי. בדקו שהרקע, הכרטיס, הטקסט והלוח משתמשים בצבעי הלילה.
2. כבו **Dark Theme** וודאו שצבעי היום חוזרים. השאירו את `values-night/themes.xml` כמו שהוא; אין צורך להוסיף בו `Theme.Hex`.
3. חזרו למסך הבית או למגירת האפליקציות ובדקו של־Hex מופיע אייקון עם לוח משושים ואבנים אדומות וכחולות במקום סמל Android של התבנית. אם הסמל הישן עדיין מוצג, הסירו את האפליקציה והתקינו אותה מחדש מ־Android Studio.

{: .box-warning}
מעבר בין יום ללילה עשוי לאפס משחק פתוח, כי Android יוצרת את המסך מחדש.

## לקריאה נוספת

- [The Surprising Effectiveness of Approximate Value Iteration in Self-Play — מאמר המחקר (PDF)]({{ '/android/hex/2609.09094v1.pdf' | relative_url }})
- [מחברת Hex 7x7 AVI Training ב־Colab](https://colab.research.google.com/drive/1MgLRzg4JK6teGKU_csT1eDonkJSSt1dc?authuser=2)
- [Solving 7×7 Hex with domination, fill-in, and virtual connections (PDF)]({{ '/android/hex/s7x7hex1.pdf' | relative_url }})
- [A New Solution for 7×7 Hex Game (PDF)]({{ '/android/hex/A_New_Solution_for_7x7_Hex_Game.pdf' | relative_url }})
