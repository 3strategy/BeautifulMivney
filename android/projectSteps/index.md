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

| שלב | שיעורים | מה מתקדם בפרויקט |
|---:|---:|---:|
| מסכים ותפריטים | [הוספת Activities]({{ '/android/projectSteps/011addingActivities' | relative_url }}), [תפריט ה־Overflow המקורי]({{ '/android/projectSteps/013addingActivityToMenu' | relative_url }}), [יצירת תפריט Fragments]({{ '/android/projectSteps/014a.creatingFragmentsMenu' | relative_url }}), [הוספת Fragments למגירה]({{ '/android/projectSteps/014b.AddingFragmentsToMenu' | relative_url }}) | עוברים ממסכים נפרדים למעטפת ניווט עם תוכן מתחלף |
| מודל המשחק | [יצירת מודל Tic-Tac-Toe]({{ '/android/projectSteps/015a.creatingTicTacToeModel' | relative_url }}), [חיבור המסך למודל]({{ '/android/projectSteps/015b.AddingTicTacToeToMainActivity' | relative_url }}) | חוקי המשחק יוצאים מקוד המסך |
| הרחבת היישום | [משחק מרובה משתתפים עם SignalR]({{ '/android/projectSteps/016.TicTacToeSignalR' | relative_url }}), [הוספת Activity נוסף למגירה]({{ '/android/projectSteps/017DuplicateAndAddActivityToMenu' | relative_url }}) | מוסיפים תקשורת ויעד ניווט נוסף |
| זהות משתמש | [מסך Login]({{ '/android/projectSteps/018a.LoginActivityFromGui' | relative_url }}), [הקמת Firebase]({{ '/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup' | relative_url }}), [כניסה במייל ובסיסמה]({{ '/android/projectSteps/018c.EmailPasswordLoginAndFBRef' | relative_url }}), [כניסה באמצעות Google]({{ '/android/projectSteps/018d.GoogleOAuthLoginAndSHA1' | relative_url }}) | מגדירים חשבון, מסך כניסה וזהות Firebase |
| View Binding | [החלפת `findViewById`]({{ '/android/projectSteps/019a.BindingInsteadOfFindByID' | relative_url }}), [Binding ב־MainActivity]({{ '/android/projectSteps/019bBindingsForMainActivity' | relative_url }}), [Binding ב־Fragments ובתפריט]({{ '/android/projectSteps/019c.BindingForFragmentsAndMenuActivity' | relative_url }}) | נותנים לקוד המסכים גישה טיפוסית ל־Views |
| משחק בזמן אמת | [לובי וחדרים ב־RTDB]({{ '/android/projectSteps/021a.TicTacToeRTDBRooms' | relative_url }}), [מצב משחק והאזנה בזמן אמת]({{ '/android/projectSteps/021b.TicTacToeRTDBGame' | relative_url }}) | שני שחקנים רואים את אותו חדר ואת אותו מצב משחק |

{: .box-note}
שיעור תפריט ה־Overflow מ־013 מתעד פתרון ישן שבו כל Activity יוצר תפריט משלו. הוא מופיע כאן כי שיעור 014a מתחיל מהמצב הזה ואז מחליף אותו בתפריט Fragments. אם התחלתם מפרויקט חדש או מתבנית אחרת, קראו תחילה את מצב הפתיחה של הפרק שבחרתם.

למציאת נושא בלי לעבור על רצף הפרקים, השתמשו ב[מפת הנושאים]({{ '/android/topics-index' | relative_url }}). לתרגול מבודד עם דיפ ענפים, עברו ל[מעבדות הנושא]({{ '/android/topics/' | relative_url }}).
