---
menu_set: android
layout: page
title: "לומדים Android"
subtitle: "שיעור ראשון, מסלולי פרויקט ומעבדות נושא"
permalink: /android/
lang: he
full-width: true
tags: [Android, Java, roadmap]
---

כאן מתחילים לפי **מה שרוצים לבנות**. במסלול פרויקט מתקדמים מפרק לפרק באותו יישום; במעבדת נושא מתרגלים רעיון אחד בפרויקט קטן ומשווים את ענף התוצאה לענף הבסיס שלו.

## שיעור ראשון בכיתה י״א

[מונה נקודות — אפליקציית Android ראשונה]({{ '/android/basics/01-score-counter/' | relative_url }}). מתחילים במחשבי המעבדה עם Basic Views Activity ב־Java, בונים מסך ומחברים כפתורים שמשנים את הניקוד.

## בוחרים מסלול פרויקט

| מסלול | מה בונים | נקודת כניסה |
|---:|---:|---:|
| [TicTacMenu]({{ '/android/projectSteps/' | relative_url }}) | מסכים, תפריט Fragments, מודל משחק, התחברות ומשחק בזמן אמת | הוספת Activities לפרויקט קיים |
| [CollectCircles]({{ '/android/CollectCircles/' | relative_url }}) | משחק ציור ומגע, שמירה, התראות ועבודה ברקע | Empty Views Activity עם Java ו־View Binding |
| [Requery]({{ '/android/sqlite/' | relative_url }}) | מסד SQLite מקומי עם קשרים, JOIN ורשימה שאפשר לערוך | Empty Views Activity ב־Java |
| [Hex]({{ '/android/hex5/' | relative_url }}) | משחק משושים אופליין, עם יריב המבוסס על מודל מסופק | Empty Views Activity עם Java ו־View Binding |
| [Connect4]({{ '/android/Connect4/' | relative_url }}) | ארבע בשורה, שמירה, יריב מחשב וחדרי משחק ברשת | Empty Views Activity עם Java ו־View Binding |

## לומדים נושא מסוים

- [26 מעבדות נושא]({{ '/android/topics/' | relative_url }}) — לכל נושא יש תוצר עובד, ענף בסיס וענף תוצאה להשוואת הקוד. המעבדות אינן סדרת פרקים אחת; בדקו את בסיס ההשוואה בטבלה לפני תחילת כל מעבדה.
- [מפת הנושאים]({{ '/android/topics-index' | relative_url }}) — מוצאים היכן נושא נלמד במסלולי הפרויקטים ובאיזה עומק.

## כלי עזר

[אמולטור Android פועל אבל החלון לא מופיע]({{ '/android/tools/recover-android-emulator/' | relative_url }}) — הורדת סקריפט PowerShell שמאתר ועוצר את תהליכי ה־AVD התקוע כדי שאפשר יהיה להפעילו מחדש.

חומרי עזר: [היכרות עם Android]({{ '/android/alon/02.Intro.pdf' | relative_url }}), [פריסות XML]({{ '/android/alon/03.Layouts.pdf' | relative_url }}) ו[הוספת Activity]({{ '/android/projectSteps/011addingActivities' | relative_url }}).
