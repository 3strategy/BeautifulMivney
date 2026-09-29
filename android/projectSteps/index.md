---
layout: page
title: "TicTacMenu — מסכים, משחק ורשת"
subtitle: "מפת שיעורי הפרויקט, מהוספת Activities ועד משחק בזמן אמת"
permalink: /android/projectSteps/
lang: he
full-width: true
tags: [Android, Java, TicTacMenu, roadmap]
---

המסלול ממשיך **פרויקט קיים** ומלמד בהדרגה Activities, תפריט מבוסס Fragments, הפרדת מודל המשחק, התחברות ו־Firebase RTDB. כל קבוצת שיעורים נשענת על המצב שנוצר בקודמיה; התחילו בשלב שמתאים לפרויקט שלכם.

| תחנה | שיעור | מה מתקדם בפרויקט |
|---:|---:|---:|
| מסכים ותפריטים | [011 — הוספת Activities]({{ '/android/projectSteps/011addingActivities' | relative_url }}) | מוסיפים מסכים לפרויקט. |
| מסכים ותפריטים | [013 — תפריט ה־Overflow המקורי]({{ '/android/projectSteps/013addingActivityToMenu' | relative_url }}) | מוסיפים תפריט לכל Activity; זו תחנת מעבר לפתרון הבא. |
| מסכים ותפריטים | [014a — יצירת תפריט Fragments]({{ '/android/projectSteps/014a.creatingFragmentsMenu' | relative_url }}) | יוצרים Activity מארח ומגירת ניווט. |
| מסכים ותפריטים | [014b — הוספת Fragments למגירה]({{ '/android/projectSteps/014b.AddingFragmentsToMenu' | relative_url }}) | מוסיפים יעדים לאזור התוכן המתחלף. |
| מודל המשחק | [015a — יצירת מודל Tic-Tac-Toe]({{ '/android/projectSteps/015a.creatingTicTacToeModel' | relative_url }}) | מעבירים את חוקי המשחק למחלקת מודל. |
| מודל המשחק | [015b — חיבור המסך למודל]({{ '/android/projectSteps/015b.AddingTicTacToeToMainActivity' | relative_url }}) | המסך מפעיל את המודל ומציג את תוצאותיו. |
| הרחבת היישום | [016 — משחק מרובה משתתפים]({{ '/android/projectSteps/016.TicTacToeSignalR' | relative_url }}) | מוסיפים תקשורת באמצעות SignalR. |
| הרחבת היישום | [017 — Activity נוסף במגירה]({{ '/android/projectSteps/017DuplicateAndAddActivityToMenu' | relative_url }}) | מוסיפים יעד ניווט נוסף. |
| זהות משתמש | [018a — מסך Login]({{ '/android/projectSteps/018a.LoginActivityFromGui' | relative_url }}) | בונים מסך כניסה. |
| זהות משתמש | [018b — הקמת Firebase]({{ '/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup' | relative_url }}) | מחברים את הפרויקט לשירותי Firebase. |
| זהות משתמש | [018c — כניסה במייל ובסיסמה]({{ '/android/projectSteps/018c.EmailPasswordLoginAndFBRef' | relative_url }}) | מוסיפים אימות משתמש והפניה למסד. |
| זהות משתמש | [018d — כניסה באמצעות Google]({{ '/android/projectSteps/018d.GoogleOAuthLoginAndSHA1' | relative_url }}) | מוסיפים ספק כניסה נוסף. |
| View Binding | [019a — החלפת `findViewById`]({{ '/android/projectSteps/019a.BindingInsteadOfFindByID' | relative_url }}) | מתחילים להשתמש ב־binding במסך הכניסה. |
| View Binding | [019b — Binding ב־MainActivity]({{ '/android/projectSteps/019bBindingsForMainActivity' | relative_url }}) | מעבירים גם את המסך הראשי. |
| View Binding | [019c — Binding ב־Fragments ובתפריט]({{ '/android/projectSteps/019c.BindingForFragmentsAndMenuActivity' | relative_url }}) | משלימים את המעבר במסכי התפריט. |
| משחק בזמן אמת | [021a — לובי וחדרים ב־RTDB]({{ '/android/projectSteps/021a.TicTacToeRTDBRooms' | relative_url }}) | שחקנים יוצרים חדרים ומצטרפים אליהם. |
| משחק בזמן אמת | [021b — מצב משחק בזמן אמת]({{ '/android/projectSteps/021b.TicTacToeRTDBGame' | relative_url }}) | שני המסכים מאזינים לאותו מצב משחק. |

{: .box-note}
שיעור תפריט ה־Overflow מ־013 מתעד פתרון ישן שבו כל Activity יוצר תפריט משלו. הוא מופיע כאן כי שיעור 014a מתחיל מהמצב הזה ואז מחליף אותו בתפריט Fragments. אם התחלתם מפרויקט חדש או מתבנית אחרת, קראו תחילה את מצב הפתיחה של הפרק שבחרתם.

למציאת נושא בלי לעבור על רצף הפרקים, השתמשו ב[מפת הנושאים]({{ '/android/topics-index' | relative_url }}). לתרגול מבודד עם דיפ ענפים, עברו ל[מעבדות הנושא]({{ '/android/topics/' | relative_url }}).
