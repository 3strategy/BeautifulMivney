---
layout: page
title: "Hex — 08: ערכות נושא ליום וללילה"
subtitle: "הצגת צבעים שונים במצב יום ובלילה"
permalink: /android/hex/08-day-night-themes/
tags: [Android, Java, Hex, Material3]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/07-supplied-rl-models/' | relative_url }})

{: .box-success}
**בסוף הפרק:** צבעי המשחק מתחלפים אוטומטית לפי מצב התצוגה של המכשיר.

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
    <color name="muted">#AAB8C8</color>
</resources>
```

השמות זהים לאלה שב־`values/colors.xml`. בלילה Android בוחרת את הערכים מהקובץ החדש; ביום היא משתמשת בערכים הרגילים. לא צריך לשנות את ה־layout או את Java.

## מריצים ובודקים

1. הפעילו **Dark Theme** והשוו לבדיקה שלפני השינוי. בדקו שהרקע, הכרטיס, הטקסט והלוח משתמשים בצבעי הלילה.
2. כבו **Dark Theme** וודאו שצבעי היום חוזרים. השאירו את `values-night/themes.xml` כמו שהוא; אין צורך להוסיף בו `Theme.Hex`.

{: .box-warning}
מעבר בין יום ללילה עשוי לאפס משחק פתוח, כי Android יוצרת את המסך מחדש.

## לקריאה נוספת

- [The Surprising Effectiveness of Approximate Value Iteration in Self-Play — מאמר המחקר (PDF)]({{ '/android/hex/2609.09094v1.pdf' | relative_url }})
- [מחברת Hex 7x7 AVI Training ב־Colab](https://colab.research.google.com/drive/1MgLRzg4JK6teGKU_csT1eDonkJSSt1dc?authuser=2)
- [Solving 7×7 Hex with domination, fill-in, and virtual connections (PDF)]({{ '/android/hex/s7x7hex1.pdf' | relative_url }})
- [A New Solution for 7×7 Hex Game (PDF)]({{ '/android/hex/A_New_Solution_for_7x7_Hex_Game.pdf' | relative_url }})
