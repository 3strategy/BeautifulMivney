---
layout: page
title: "מפת נושאים באנדרואיד"
subtitle: "איפה לומדים כל נושא ובאיזה עומק"
tags: [Android, Java, index, roadmap]
lang: he
full-width: true
---

{: .box-note}
המפה עוזרת למצוא שיעור לפי **הרעיון שרוצים ללמוד**, ולא רק לפי שם הפרויקט. אם זו הפעם הראשונה שלכם באתר, התחילו באחד מחמשת מסלולי הלמידה; אם כבר יש לכם פרויקט, עברו ישירות לטבלת הנושא הדרוש.

## איך קוראים את המפה?

{: .table-he}

| סימון עומק | מה תמצאו בקישור |
|---|---|
| **שיעור מעשי** | בנייה מודרכת של תוצר עובד, עם קוד ושלבי בדיקה. |
| **העמקה** | הסבר של הרעיון, השוואה או ניתוח שעוזרים להבין *למה* הקוד בנוי כך. |
| **משלים** | אזכור קצר, תרגול, שאלות חזרה או שער למצגת/קובץ נוסף. זה אינו תחליף לשיעור מלא. |

לעיתים אותו נושא מופיע בכמה פרויקטים. כדאי לבחור תחילה את הקישור ששייך לפרויקט שלכם, ואחר כך לקרוא קישור נוסף כדי לראות שימוש אחר באותו רעיון.

{: .box-note}
[מעבדות נושאי Android](/android/topics/) מתחילות מפרויקט Java/XML קטן עם View Binding, וכל מעבדה מבודדת נושא בענף קוד משלה. אפשר להשתמש בהן גם כהשלמה למסלולי הפרויקטים שלמטה.

## חמישה מסלולי למידה מרכזיים

### TicTacMenu — ממסכים ותפריטים למשחק רשת

[מפת מסלול TicTacMenu]({{ '/android/projectSteps/' | relative_url }}) מרכזת את שלבי הפרויקט ואת נקודות הכניסה.

המסלול מתאים למי שרוצה להכיר בהדרגה ניווט, הפרדת מודל, תקשורת, התחברות ו־Firebase:

- [013 — Activities ותפריט Overflow](/android/projectSteps/013addingActivityToMenu)
- [014a — יצירת תפריט מגירה מבוסס Fragments](/android/projectSteps/014a.creatingFragmentsMenu)
- [014b — הוספת Fragments לתפריט](/android/projectSteps/014b.AddingFragmentsToMenu)
- [015a — יצירת מודל Tic-Tac-Toe](/android/projectSteps/015a.creatingTicTacToeModel)
- [015b — חיבור המסך למודל](/android/projectSteps/015b.AddingTicTacToeToMainActivity)
- [016 — משחק מרובה משתתפים עם SignalR](/android/projectSteps/016.TicTacToeSignalR)
- [017 — שכפול Activity והוספתו למגירה](/android/projectSteps/017DuplicateAndAddActivityToMenu)
- [018a — יצירת מסך Login והגדרתו כ־Launcher](/android/projectSteps/018a.LoginActivityFromGui)
- [018b — הקמת Firebase,‏ RTDB ו־Authentication](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup)
- [018c — התחברות במייל ובסיסמה](/android/projectSteps/018c.EmailPasswordLoginAndFBRef)
- [018d — התחברות Google ו־SHA-1](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1)
- [019a — מעבר ל־View Binding](/android/projectSteps/019a.BindingInsteadOfFindByID)
- [019b — Binding ב־MainActivity](/android/projectSteps/019bBindingsForMainActivity)
- [019c — Binding ב־Fragments ובתפריט](/android/projectSteps/019c.BindingForFragmentsAndMenuActivity)
- [021a — לובי וחדרי משחק ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms)
- [021b — מצב משחק והאזנה בזמן אמת ב־RTDB](/android/projectSteps/021b.TicTacToeRTDBGame)

### CollectCircles — ציור, משחק, שמירה ועבודה ברקע

[מפת מסלול CollectCircles]({{ '/android/CollectCircles/' | relative_url }}) מציגה את התחנות ואת מפות ההמשך.

ארבעת הפרקים הראשונים בונים משחק קצר ובוחנים את התכנון שלו:

- [01 — ציור ומחלקות](/android/CollectCircles/01.collect-circles-drawing)
- [02 — מצב משחק ומגע](/android/CollectCircles/02.collect-circles-game)
- [03 — זמן, שיא ומחזור חיים](/android/CollectCircles/03.collect-circles-finish)
- [04 — המחשבה הביקורתית על OOP ו־Views](/android/CollectCircles/04.collect-circles-oop-afterthought)

ההמשך מחולק לשתי מפות קצרות:

- [05–07 — מהתראה מקומית ל־FCM ולתשתית ענן](/android/CollectCircles/05-07.student-roadmap)
- [08–18 — ממשחק קצר לכלכלה מתמשכת, אנימציה ו־WorkManager](/android/CollectCircles/08-18.student-roadmap)

### Requery — מסד SQLite מקומי בארבעה תוצרים עובדים

[מפת מסלול Requery]({{ '/android/sqlite/' | relative_url }}) מסבירה את רצף ארבעת התוצרים ואת מצב ההתחלה.

- [01 — Entity ראשון: Student מקצה לקצה](/android/sqlite/01.requery-student)
- [02 — קשר רבים־לרבים עם דירוג ושדרוג סכימה](/android/sqlite/02.requery-rated-relationship)
- [03 — INNER JOIN typed ושלושה טפסי הוספה](/android/sqlite/03.requery-join-and-inserts)
- [04 — RecyclerView ומחיקה לפי מפתח מורכב](/android/sqlite/04.requery-recyclerview-delete)

### Hex — מלוח משושים למשחק אופליין מול מחשב

[תשעת פרקי Hex](/android/hex5/) מתחילים ב־Empty Views Activity עם View Binding.
התלמיד בונה Canvas, מגע, חוקיות, חיפוש חיבור, משחק מקומי וחיבור מודל ערך
מסופק שעובד ברקע. אימון ה־RL והמודלים המאומנים נמסרים על ידי המורה.

| נושא | עומק | שיעור |
|---:|---:|---:|
| הפרדת אחריות וזרימת מהלך: מסך, חוקים, בוחר מהלך ומודל ערך | העמקה עם תרשימים ושאלות הבנה | [מפת אחריות](/android/hex5/#architecture)<br>[02 — מנגיעה למהלך](/android/hex5/02-moves-and-turns/#move-flow)<br>[06 — בחירת מהלך לפי ערך](/android/hex5/06-background-ai/#move-selection) |
| ציור משושים, גודל לוח ממודל וגאומטריית מגע | שיעור מעשי | [01 — לוח](/android/hex5/01-board/)<br>[02 — מהלכים](/android/hex5/02-moves-and-turns/) |
| מודל מצב וחיפוש גרפי לזיהוי ניצחון | שיעור מעשי | [02 — תורות](/android/hex5/02-moves-and-turns/)<br>[03 — ניצחון](/android/hex5/03-win-detection/) |
| העתקי מצב, מהלכים חוקיים וקידוד למודל ערך | שיעור מעשי ודוגמת קידוד משתי נקודות מבט | [05 — הכנת המחשב](/android/hex5/05-model-preparation/#value-contract) |
| Executor, פסילת תשובה ישנה ומודל ערך מסופק | שיעור מעשי באינטגרציה | [06 — מחשב ברקע](/android/hex5/06-background-ai/)<br>[07 — בחירת מודל](/android/hex5/07-supplied-rl-models/)<br>[08 — רמז למהלך](/android/hex5/08-hint/) |
| ערכות נושא ליום וללילה, משאבי צבע ו־Material 3 | שיעור מעשי | [09 — ערכות נושא ב־Hex](/android/hex5/09-day-night-themes/) |

---

### Connect4 — ממנוע משחק מקומי למשחק רשת

[מפת 13 הפרקים](/android/Connect4/) מתחילה ב־Empty Views Activity עם View Binding, ומתקדמת לפי תלויות למידה:

| נושא | עומק | שיעור |
|---:|---:|---:|
| Canvas, מגע וגאומטריית לוח | שיעור מעשי | [01 — לוח](/android/Connect4/01.connect4-board/) |
| מנוע, snapshots, כוח כבידה, ניצחון ותיקו | שיעור מעשי | [02 — תורות](/android/Connect4/02.connect4-drop-and-turns/)<br>[03 — תוצאות](/android/Connect4/03.connect4-win-and-draw/) |
| ViewModel, SharedPreferences ושחזור באמצעות replay | שיעור מעשי | [04 — שמירה ושחזור](/android/Connect4/04.connect4-save-and-restore/) |
| ממשק שחקן, heuristic, Executor וביטול תוצאה ישנה | שיעור מעשי | [05 — יוריסטיקה](/android/Connect4/05.connect4-heuristic-player/)<br>[06 — חישוב ברקע](/android/Connect4/06.connect4-background-turns/) |
| שילוב מודל מסופק ו־fallback | שיעור מעשי באינטגרציה בלבד | [07 — חבילת המורה](/android/Connect4/07.connect4-supplied-model-player/) — MCTS, קידוד ומודלים מסופקים; אין לימוד מימושם או אימון |
| Firebase Authentication ו־Credential Manager | שיעור מעשי | [08 — דוא״ל](/android/Connect4/08.connect4-email-authentication/)<br>[09 — Google](/android/Connect4/09.connect4-google-authentication/) |
| transactions, UID, צופים וכללים תחומים | שיעור מעשי | [10 — חדרים](/android/Connect4/10.connect4-online-rooms/)<br>[11 — משחק רשת](/android/Connect4/11.connect4-online-game/) |
| Repository, זהות פעולה, ניתוק ושחזור listeners | שיעור מעשי | [12 — התאוששות](/android/Connect4/12.connect4-online-recovery/) |
| משאבי כיוון/לילה, insets ואנימציה | שיעור מעשי | [13 — הצגה סופית](/android/Connect4/13.connect4-final-presentation/) |

בדיקות JVM, Android ו־Firebase emulator מסופקות למורה ב־[תיעוד האימות](/android/Connect4/teaching-plan/#validation). נוכחותן אינה טענה שהתלמיד כותב את כל סוויטת הבדיקות; כניסת Google אינטראקטיבית ובדיקת שרת חי עדיין דורשות סביבת חשבון מתאימה.

## Android Studio, מבנה הפרויקט ותהליך העבודה


{: .table-he}

| נושא | עומק | איפה לומדים |
|---:|---:|---:|
| יצירת `Activity` דרך Android Studio | שיעור מעשי | [011 — הוספת Activities](/android/projectSteps/011addingActivities)<br>[018a — יצירת LoginActivity מן ה־GUI](/android/projectSteps/018a.LoginActivityFromGui) |
| `AndroidManifest`,‏ Launcher ורישום מסכים | שיעור מעשי | [014a — תפריט Fragments והגדרת Launcher](/android/projectSteps/014a.creatingFragmentsMenu)<br>[017 — שכפול ורישום Activity](/android/projectSteps/017DuplicateAndAddActivityToMenu)<br>[018a — LoginActivity כ־Launcher יחיד](/android/projectSteps/018a.LoginActivityFromGui) |
| ניווט בתצוגת **Android** ומיקום קבצים | שיעור מעשי | [01a — Layout Editor](/android/CollectCircles/01a.collect-circles-layout-editor)<br>[01 — Requery — הכנת Gradle וה־Entity הראשון](/android/sqlite/01.requery-student) |
| Gradle,‏ `build.gradle.kts` ו־Version Catalog | שיעור מעשי | [01 — Requery — הוספת ספרייה ומעבד annotations](/android/sqlite/01.requery-student)<br>[06 — FCM — תלויות וערכים מקומיים](/android/CollectCircles/06.collect-circles-fcm-invitations)<br>[192 — תמיכה ב־Jetpack Compose](/android/projectSteps/192supportJetPackCompose) |
| טיפול בהתנגשות גרסאות, AGP ו־SDK | שיעור מעשי | [027 — תיקון בעיית גרסאות](/android/projectSteps/027versionUpdates) |
| פירמוט קוד וקיצור מקשים ב־IDE | משלים | [012 — הגדרת Ctrl+K,D לפירמוט](/android/projectSteps/012androidCodeFormatting) |
| שינוי שם פרויקט, package,‏ namespace ו־application ID | שיעור מעשי | [191 — שינוי שם לפרויקט קיים](/android/projectSteps/191renameProject) |
| Git, ענפים, Pull Request וסקירת קוד | שיעור מעשי | [202 — Pull Requests ב־Android Studio ובכלים נוספים](/android/projectSteps/202GitPullRequests) |
| תכנון ותיעוד פרויקט לקראת הצגה | משלים | [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask)<br>[האקתון פיתוח מונחה־AI](/android/unsorted/habagrut) |

## Activities,‏ Intents וניווט

{: .table-he}

| נושא | עומק | איפה לומדים |
|---:|---:|---:|
| מעבר בין Activities בעזרת `Intent` מפורש | שיעור מעשי | [013 — Activities בתפריט Overflow](/android/projectSteps/013addingActivityToMenu)<br>[017 — שכפול Activity וניתוב מן המגירה](/android/projectSteps/017DuplicateAndAddActivityToMenu) |
| תפריט Overflow וקובץ menu XML | שיעור מעשי | [013 — הוספת Activities לתפריט](/android/projectSteps/013addingActivityToMenu) |
| Navigation Drawer,‏ `DrawerLayout` ו־`NavigationView` | שיעור מעשי | [014a — יצירת תפריט מגירה](/android/projectSteps/014a.creatingFragmentsMenu)<br>[014b — הוספת יעדים למגירה](/android/projectSteps/014b.AddingFragmentsToMenu) |
| Fragments וניווט בתוך Activity יחיד | שיעור מעשי | [014b — Fragments בתוך תפריט מגירה](/android/projectSteps/014b.AddingFragmentsToMenu)<br>[15b — שלושה Fragments ו־Bottom Navigation](/android/alon/15b.FragmentsTutorial) |
| `onCreateView` לעומת `onViewCreated` | העמקה | [15b — מדריך Fragments](/android/alon/15b.FragmentsTutorial) |
| קבלת תוצאה מפעולה חיצונית עם `ActivityResultLauncher` | שיעור מעשי | [15 — הרשאה, Photo Picker, מסמך ותמונת מצלמה](/android/topics/15-permission-result-contracts/)<br>**משלים:** [מפגשי אנדרואיד](/android/zeev/meetings#id-meeting-13-activity-result-launcher-course) |
| מעבר מושהה עם `Handler` ו־`Looper` | שיעור מעשי | [018a — LoginActivity לפני חיבור Authentication](/android/projectSteps/018a.LoginActivityFromGui) |

## מחזור חיים, מצב ושמירה קלה

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| מחזור החיים של `Activity` | שיעור מעשי | [01 — מעבדת שחזור: סיבוב, Bundle ושמירה מתמשכת](/android/topics/01-lifecycle-state/)<br>[03 — עצירת עדכוני זמן ב־`onStop`](/android/CollectCircles/03.collect-circles-finish)<br>[13 — חישוב התקדמות ב־`onStart` וב־`onStop`](/android/CollectCircles/13.collect-circles-offline-progress)<br>**משלים:** [מצגת מחזור החיים](/android/zeev/meetings#id-meeting-6-activity-lifecycle) |
| `SharedPreferences` לקריאה וכתיבה | שיעור מעשי | [03 — שמירת שיא](/android/CollectCircles/03.collect-circles-finish)<br>[08 — מצב משחק מתמשך](/android/CollectCircles/08.collect-circles-persistent-economy)<br>[018a — שמירת בחירת "הישאר מחובר"](/android/projectSteps/018a.LoginActivityFromGui) |
| מצב בזיכרון לעומת מצב שנשמר במכשיר | העמקה | [08 — כלכלה מתמשכת ב־CollectCircles](/android/CollectCircles/08.collect-circles-persistent-economy) |
| שמירת מצב מסך ב־`Bundle` | שיעור מעשי | [01 — שלושה מונים: שדה, Bundle ו־SharedPreferences](/android/topics/01-lifecycle-state/)<br>**משלים:** [מצגת מחזור החיים](/android/zeev/meetings#id-meeting-6-activity-lifecycle) |
| מחזור חיי View של `Fragment` וניקוי binding | שיעור מעשי | [01 — ניתוק ה־View וחזרה לאותו Fragment](/android/topics/01-lifecycle-state/) |
| זמן מונוטוני לעומת שעון קיר | העמקה | [03 — SystemClock למדידת משחק](/android/CollectCircles/03.collect-circles-finish)<br>[13 — בחירת שעון להתקדמות אופליין](/android/CollectCircles/13.collect-circles-offline-progress) |
| Callback פשוט באמצעות `Runnable` | שיעור מעשי | [03 — הודעה מן ה־View ל־Activity על סיום משחק](/android/CollectCircles/03.collect-circles-finish)<br>[08 — אירוע איסוף עיגול](/android/CollectCircles/08.collect-circles-persistent-economy) |

## XML, רכיבי UI ו־View Binding

{: .table-he}

| נושא | עומק | איפה לומדים |
|---:|---:|---:|
| בניית מסך ב־Layout Editor | שיעור מעשי | [01a — CollectCircles — בניית המסך דרך ה־GUI](/android/CollectCircles/01a.collect-circles-layout-editor)<br>[018a — LoginActivity דרך ה־GUI](/android/projectSteps/018a.LoginActivityFromGui) |
| XML layouts, אילוצים, משקלים ומשאבי `strings.xml` | שיעור מעשי | [01 — מסך המשחק CollectCircles](/android/CollectCircles/01.collect-circles-drawing)<br>[018a — מסך Login](/android/projectSteps/018a.LoginActivityFromGui)<br>[04 — טבלת Requery](/android/sqlite/04.requery-recyclerview-delete) |
| נגישות, מסך גמיש, לוקליזציה ו־RTL | שיעור מעשי | [02 — מדף קריאה בשתי שפות עם קורא מסך ורבים](/android/topics/02-accessibility-adaptive-localization/) |
| מצבי UI: טעינה, ריק, שגיאה, הצלחה ו־Retry | שיעור מעשי עם מקור מדומה | [03 — מעבדת מצבי המסך](/android/topics/03-ui-states-retry/) |
| `View Binding` במקום `findViewById` | שיעור מעשי | [019a — מעבר הדרגתי והמרת כל הפניות ל־UI במסך Login](/android/projectSteps/019a.BindingInsteadOfFindByID#login-ui-references)<br>[019b — MainActivity: מקוד התבנית לאתחול binding עם insets](/android/projectSteps/019bBindingsForMainActivity)<br>[019c — Fragments ו־MenuActivity](/android/projectSteps/019c.BindingForFragmentsAndMenuActivity)<br>[01 — Requery בפרויקט חדש](/android/sqlite/01.requery-student) |
| אירועי לחיצה ו־listeners | שיעור מעשי | [015b — חיבור לוח המשחק למודל](/android/projectSteps/015b.AddingTicTacToeToMainActivity)<br>[03 — הוספות למסד דרך דיאלוגים](/android/sqlite/03.requery-join-and-inserts) |
| `AlertDialog` ו־Material Dialog | שיעור מעשי | [03 — הודעת סיום משחק](/android/CollectCircles/03.collect-circles-finish)<br>[10 — חנות Pushers](/android/CollectCircles/10.collect-circles-pusher-shop)<br>[03 — טפסי הוספה למסד](/android/sqlite/03.requery-join-and-inserts) |
| `Spinner` ו־`ArrayAdapter` | שיעור מעשי | [021a — בחירת חדר משחק ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| `ListView` והעברת רשימה בין מסכים | תרגול משלים | [תרגיל ToDo List](/android/amjad/Ex3.ToDoList) |
| `RecyclerView`,‏ Adapter ו־ViewHolder | שיעור מעשי | [04 — Requery — טבלה ומחיקה](/android/sqlite/04.requery-recyclerview-delete) |
| Jetpack Compose בתוך פרויקט שהתחיל ב־Java/XML | שיעור מעשי | [192 — הוספת תמיכת Compose ו־Activity ב־Kotlin](/android/projectSteps/192supportJetPackCompose) |

## Canvas, מגע, גאומטריה ואנימציה


| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| יצירת `View` מותאם אישית ו־`onDraw` | שיעור מעשי | [01 — ציור עיגולים ב־Canvas](/android/CollectCircles/01.collect-circles-drawing) |
| `Canvas`,‏ `Paint` ומערכת הצירים | שיעור מעשי | [01 — הלוח הראשון](/android/CollectCircles/01.collect-circles-drawing)<br>[11 — ציור דמות Pusher](/android/CollectCircles/11.collect-circles-draw-pusher) |
| אירועי מגע, תפיסה, גרירה ושחרור עם `MotionEvent` | שיעור מעשי | [02 — מצב משחק וגרירת עיגולים](/android/CollectCircles/02.collect-circles-game) |
| מרחק בין מרכזים, חפיפה והכלה של עיגולים | העמקה | [01 — שלוש בדיקות גאומטריות](/android/CollectCircles/01.collect-circles-drawing)<br>[02 — יצירת עיגולים חוקיים וגרירה למטרה](/android/CollectCircles/02.collect-circles-game) |
| לולאת ציור ו־`postInvalidateOnAnimation` | שיעור מעשי | [09 — מצב משחק אוטונומי](/android/CollectCircles/09.collect-circles-autonomous-mode)<br>[11 — אנימציית Pusher](/android/CollectCircles/11.collect-circles-draw-pusher) |
| הפרדת `update` מ־`draw` ותנועה לפי זמן | העמקה | [11 — Pusher הולך — זמן, פריימים ותנועה מחזורית](/android/CollectCircles/11.collect-circles-draw-pusher) |
| חיישנים | משלים | [מפגשי אנדרואיד — Sensors](/android/zeev/meetings#id-meeting-2-sensors) |
| קול, וידאו ואנימציות משאבים | משלים | [001 — אינדקס חומרי AppSchool](/android/asaf/001asafAndroidChapters) |

## OOP,‏ Java וארכיטקטורה

{: .table-he}

| נושא | עומק | איפה לומדים |
|---:|---:|---:|
| הפרדת מצב המשחק מן המסך | שיעור מעשי | [015a — יצירת TicTacToeModel](/android/projectSteps/015a.creatingTicTacToeModel)<br>[015b — חיבור המודל ל־Activity](/android/projectSteps/015b.AddingTicTacToeToMainActivity)<br>[02 — מחלקת Game ב־CollectCircles](/android/CollectCircles/02.collect-circles-game) |
| ViewModel,‏ Repository ו־LiveData ב־Java | שיעור מעשי של refactoring | [04 — מעבדת מקור אמת וזרימת מידע חד־כיוונית](/android/topics/04-viewmodel-repository/) |
| מחלקות, בנאים, שדות, getters ומתודות | שיעור מעשי | [01 — Circle ו־Target](/android/CollectCircles/01.collect-circles-drawing)<br>[01 — Entity ראשון ב־Requery](/android/sqlite/01.requery-student) |
| ירושה (`extends`) ו־`super` | שיעור מעשי | [01 — Target יורש מ־Circle](/android/CollectCircles/01.collect-circles-drawing) |
| Composition לעומת ירושה, ו־View לעומת אובייקט מודל | העמקה | [04 — מחשבה ביקורתית על עצמים, Views וירושה](/android/CollectCircles/04.collect-circles-oop-afterthought) |
| MVC לעומת MVP | העמקה | [05 — השוואה ודוגמאות Java](/android/alon/05.LayoutExMVC.MVP) |
| פונקציות טהורות והפרדת חישוב מ־Android | שיעור מעשי | [13 — מחשבון התקדמות אופליין](/android/CollectCircles/13.collect-circles-offline-progress)<br>[10 — חישוב מחיר ובדיקת יחידה](/android/CollectCircles/10.collect-circles-pusher-shop) |
| Lambda ו־listeners ב־Java | שיעור מעשי | [015b — אירועי לוח Tic-Tac-Toe](/android/projectSteps/015b.AddingTicTacToeToMainActivity)<br>**משלים:** [001 — אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |
| חוזה interface, מחלקה מופשטת ו־generics | שיעור מעשי עם בדיקות JVM | [13 — שני קטלוגים, אותו חוזה](/android/topics/13-java-oop-contracts/) |
| `equals`/`hashCode`, חריגות ומחיר חיפוש ב־List/Set | שיעור מעשי עם תוצאה נצפית | [13 — השוואת ArrayList ו־HashSet](/android/topics/13-java-oop-contracts/) |

## נתונים מקומיים: SQLite ו־Requery

{: .table-he}

| נושא | עומק | איפה לומדים |
|---:|---:|---:|
| Entity,‏ annotations וקוד שנוצר | שיעור מעשי | [01 — Student מקצה לקצה](/android/sqlite/01.requery-student) |
| פתיחת מסד, insert ו־select typed | שיעור מעשי | [01 — Student מקצה לקצה](/android/sqlite/01.requery-student) |
| קשר רבים־לרבים עם נתון נוסף | שיעור מעשי | [02 — Student–Watching–Movie עם rating](/android/sqlite/02.requery-rated-relationship) |
| שדרוג סכימה בלי למחוק נתונים | שיעור מעשי | [02 — Migration מגרסה 1 לגרסה 2](/android/sqlite/02.requery-rated-relationship) |
| `INNER JOIN` typed ו־`Tuple` | שיעור מעשי | [03 — JOIN והוספות](/android/sqlite/03.requery-join-and-inserts) |
| מחיקה לפי מפתח מורכב ורענון UI | שיעור מעשי | [04 — RecyclerView ומחיקת Watching](/android/sqlite/04.requery-recyclerview-delete) |
| SQLite ישיר עם `SQLiteOpenHelper` ו־`Cursor` | שיעור מעשי חלופי | [5 — מדריך SQLite בסיסי](/android/amjad/5.DbWorkSqlite) |
| Room,‏ DAO, עבודה ברקע, transaction ובדיקת migration | שיעור מעשי עם שתי גרסאות מסד | [12 — Favorite שנשמר ושדרוג מ־v1 ל־v2](/android/topics/12-room-persistence/) |

## Firebase, התחברות ונתונים בזמן אמת

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| יצירת פרויקט Firebase וחיבור אפליקציית Android | שיעור מעשי | [018b — Firebase Project + RTDB + Authentication](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup) |
| `google-services.json`,‏ package name ותקלות התאמה | שיעור מעשי | [018b — בדיקות ותיקון No matching client](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup)<br>[191 — שינוי שם פרויקט מחובר לשירות](/android/projectSteps/191renameProject) |
| Firebase Authentication במייל ובסיסמה | שיעור מעשי | [018c — Login ו־FBRef](/android/projectSteps/018c.EmailPasswordLoginAndFBRef) |
| Google Sign-In,‏ OAuth,‏ SHA-1 ו־Firebase credential | שיעור מעשי | [018d — Google OAuth Login](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1) |
| זהות ב־Authentication לעומת פרופיל משתמש ב־RTDB | העמקה השוואתית עם קוד מקור | [021a — למה Presence משתמשת ב־User וב־TicTacMenu מספיק UID?](/android/projectSteps/021a.TicTacToeRTDBRooms#user-profile-vs-auth) |
| `DatabaseReference`, כתיבה וקריאה מ־RTDB | שיעור מעשי | [021a — פרסום חדרי משחק](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| `ValueEventListener` ועדכונים בזמן אמת | שיעור מעשי והעמקה | [021a — רשימת חדרים חיה](/android/projectSteps/021a.TicTacToeRTDBRooms)<br>[021b — תרשימי זרימה בין שני מכשירים: הצטרפות, מהלך ואישור כתיבה](/android/projectSteps/021b.TicTacToeRTDBGame#rtdb-two-device-flow) |
| הסרת listener והתאמה למחזור החיים | שיעור מעשי | [021a — ניקוי מאזין החדרים](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| מבנה נתונים ב־RTDB והמרת אובייקט Java לעץ JSON | העמקה עם קוד השוואתי ושאלות בדיקה | [021a — GameRoom מול Presence:‏ POJO/DTO,‏ Map ו־JSONObject](/android/projectSteps/021a.TicTacToeRTDBRooms#presence-rtdb-comparison)<br>[021a — serialization ו־deserialization ותפקיד הבנאי הריק](/android/projectSteps/021a.TicTacToeRTDBRooms#rtdb-serialization) |
| בחירת היקף כתיבה, שדות חסרים ותחרות בין לקוחות | העמקה עיונית; ללא מעבדת transactions | [021a — setValue לעומת updateChildren, מחיקה, שינוי סכימה וגבולות המיפוי](/android/projectSteps/021a.TicTacToeRTDBRooms#presence-rtdb-comparison) |
| כללי RTDB וגבול האמון | העמקה ראשונית | [021a — כללי כיתה והסיכון שבכללים פתוחים](/android/projectSteps/021a.TicTacToeRTDBRooms)<br>[07 — תשתית הענן של CollectCircles](/android/CollectCircles/07.collect-circles-cloud-infrastructure) |

## רשת, API וענן

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| לקוח SignalR, חיבור לשרת ושליחת אירועים | שיעור מעשי | [016 — Tic-Tac-Toe מרובה משתתפים](/android/projectSteps/016.TicTacToeSignalR) |
| זרימת הודעה בין UI,‏ Service, שרת ולקוח אחר | העמקה | [016 — תרשים הרצף של SignalR](/android/projectSteps/016.TicTacToeSignalR) |
| קריאת API ושליחת JSON מ־Android | שיעור מעשי | [Interactions API ו־LLM ב־Java](/android/unsorted/LLM-using-google-interactions-api) |
| Firebase Cloud Functions ופריסה | שיעור מעשי מתקדם | [07 — תשתית ענן ל־FCM](/android/CollectCircles/07.collect-circles-cloud-infrastructure) |
| הפרדת סודות וערכי סביבה מן הקוד | שיעור מעשי | [06 — הגדרות מקומיות ל־FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| JSON כמבנה נתונים מקומי | שיעור מעשי | [16 — מערכת שעות ב־JSON](/android/CollectCircles/16.collect-circles-json-schedule) |

## הרשאות, התראות ועבודה ברקע

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| הרשאות רגילות, מסוכנות ומיוחדות | שיעור מעשי | [13 — מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2) |
| בקשת הרשאה בזמן ריצה | שיעור מעשי | [13 — מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2)<br>[05 — הרשאת התראות ב־Android 13+](/android/CollectCircles/05.collect-circles-local-notification) |
| מחיקת נתון מקומי, מדיניות backup וגבול סודות ב־APK | שיעור מעשי עם בדיקת מחיקה ושחזור | [16 — מעבדת פרטיות: Favorite, גיבוי ו־HTTPS](/android/topics/16-privacy-secrets-transport/) |
| סירוב, rationale, הגדרות והמשך שימוש בלי הרשאה | שיעור מעשי עם בדיקת אמולטור | [15 — הרשאת התראות וארבעה contracts](/android/topics/15-permission-result-contracts/) |
| צילום מלא, Photo Picker,‏ FileProvider ו־EXIF | שיעור מעשי עם בדיקת restart | [19 — מעבדת צילום ואחסון תחום](/android/topics/19-camera-gallery-storage/) |
| מיקום מקורב/מדויק ומעבר למפה | שיעור מעשי עם בדיקת אמולטור | [20 — מעבדת מיקום והרשאות מדורגות](/android/topics/20-location-maps/) |
| חיישן תאוצה: צירים, יחידות, סינון וקצב | שיעור מעשי עם חיישן וירטואלי | [21 — מעבדת הטיה ו־lifecycle](/android/topics/21-sensors-tilt/) |
| Text-to-Speech, הכתבה, audio focus ומחזור חיים | שיעור מעשי עם TTS ו־RecognizerIntent | [22 — מעבדת דיבור ומדיה](/android/topics/22-media-speech/) |
| NFC: קריאת תג NDEF ותיקוף קלט | שיעור מעשי עם בדיקות parser; חומרה טרם אומתה | [23 — מעבדת תג תחנת כיתה](/android/topics/23-nfc-classroom-tag/) |
| Compose: state, ניווט, interop ובדיקת UI | שיעור מעשי עם בדיקת אמולטור | [24 — מעבדת קטלוג Compose](/android/topics/24-compose-ui-system/) |
| פגינציה ידנית, cache מקומי ו־offline-first | שיעור מעשי עם בדיקת HTTP 503 | [25 — מעבדת API ו־Room כ־cache](/android/topics/25-paging-offline-cache/) |
| SurfaceView מול ContentProvider לפי צורך | שיעור מעשי ל־SurfaceView, בחירת תכנון ל־ContentProvider | [26 — לולאת משחק ומחזור חיי Surface](/android/topics/26-surfaceview-specialization/) |
| Notification Channel ובניית התראה מקומית | שיעור מעשי | [05 — CollectCircles 5 — התראה מקומית](/android/CollectCircles/05.collect-circles-local-notification) |
| FCM,‏ topics,‏ data message ו־notification message | שיעור מעשי | [06 — CollectCircles 6 — התראות דרך FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| `FirebaseMessagingService` ורישום Service ב־Manifest | שיעור מעשי | [06 — CollectCircles 6 — שירות ההודעות](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| WorkManager ו־`OneTimeWorkRequest` | שיעור מעשי | [14 — Worker ראשון ובדיקת זכאות](/android/CollectCircles/14.collect-circles-first-worker) |
| `PeriodicWorkRequest`, אילוצי סוללה ועבודה ייחודית | שיעור מעשי | [15 — עבודה מחזורית](/android/CollectCircles/15.collect-circles-periodic-work) |
| תזמון מתוך JSON והעברת input ל־Worker | שיעור מעשי | [16 — מערכת שעות ב־JSON](/android/CollectCircles/16.collect-circles-json-schedule) |
| תיאום כתיבה בין UI ל־Worker | שיעור מעשי מתקדם | [17 — כתיבה בטוחה מן ה־Worker](/android/CollectCircles/17.collect-circles-worker-settlement) |
| מסלול WorkManager קצר המתמקד בהתראה | שיעור מעשי חלופי | [15b — התראה מחזורית ו־Brag](/android/CollectCircles/15b.collect-circles-notification-only) |
| Thread,‏ UI thread ו־`runOnUiThread` | משלים | [מפגשי אנדרואיד — Thread](/android/zeev/meetings#id-meeting-8-thread) |
| Service,‏ AlarmManager ו־BroadcastReceiver | משלים | [מפגשי אנדרואיד עם זאב](/android/zeev/meetings) |

## בדיקות, תקלות ואיכות

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| בדיקת יחידה לפונקציית Java טהורה | שיעור מעשי | [10 — בדיקת מחיר Pusher](/android/CollectCircles/10.collect-circles-pusher-shop)<br>[13 — בדיקת מחשבון אופליין](/android/CollectCircles/13.collect-circles-offline-progress) |
| בדיקת UI על אמולטור ורגרסיה למחזור חיים | שיעור מעשי | [05 — בדיקה שמגלה נסיגה ב־Bundle וב־Fragment](/android/topics/05-android-ui-tests/) |
| אבחון שיטתי ב־Logcat,‏ debugger ו־Inspectors | שיעור מעשי עם תקלות מכוונות | [06 — מעבדת אבחון Build, קריסה, קיפאון, Layout ורשת](/android/topics/06-systematic-debugging/) |
| כללי הרשאה בצד השרת ובדיקת משתמש מורשה מול תוקף | שיעור מעשי עם Firebase Emulator | [07 — כללי RTDB לפי בעלות ובדיקות שלושה משתמשים](/android/topics/07-rtdb-security-rules/) |
| HTTP, לקוח API ו־JSON למודל טיפוסי | שיעור מעשי ובדיקות שרת מקומי | [08 — מבקשת GET ל־Todo עם Retrofit](/android/topics/08-http-client/) |
| עבודה אסינכרונית, תוצאה ישנה וביטול | שיעור מעשי עם בדיקות UI | [09 — תחרות בין שתי בקשות ב־ViewModel](/android/topics/09-async-races/) |
| bound Service,‏ AlarmManager ו־BroadcastReceiver | שיעור מעשי עם בדיקה במערכת | [14 — שעון שירות ואירוע alarm שנמסר ל־Receiver](/android/topics/14-services-alarms-receivers/) |
| Navigation Component,‏ Back/Up ו־deep link | שיעור מעשי עם בדיקות UI | [10 — מעבר בין קטלוג לפריט ותוצאת Activity](/android/topics/10-navigation-flow/) |
| RecyclerView,‏ DiffUtil, זהות ושני סוגי שורות | שיעור מעשי עם בדיקת UI | [11 — רשימת ספרים ממוחזרת עם Favorite](/android/topics/11-recyclerview-diffutil/) |
| ההבדל בין `test` ל־`androidTest` | שיעור מעשי והשוואה | [05 — בדיקות JVM מול בדיקות UI על אמולטור](/android/topics/05-android-ui-tests/)<br>[10 — בדיקת מחיר Pusher](/android/CollectCircles/10.collect-circles-pusher-shop) |
| בדיקות ידניות ותוצאה נצפית | שיעור מעשי | [01 — רשימת הבדיקה של Requery 1](/android/sqlite/01.requery-student)<br>[021a — בדיקת RTDB בשני מכשירים](/android/projectSteps/021a.TicTacToeRTDBRooms)<br>[06 — בדיקות FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| אבחון Firebase,‏ SHA-1 ו־Google Sign-In | שיעור מעשי | [018d — פתרון תקלות OAuth](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1) |
| אבחון Gradle,‏ AGP ו־AAR Metadata | שיעור מעשי | [027 — תיקון בעיית גרסאות](/android/projectSteps/027versionUpdates) |
| גרסת release,‏ R8, חתימה, versionCode ובדיקת APK | שיעור מעשי עם release מותקן | [17 — בדיקת גרסת release ושמירת Favorite](/android/topics/17-release-signing-maintenance/) |
| שאלות שמוודאות הבנה לקראת בחינת פרויקט | תרגול משלים | [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask) |
| אפיון, תרשים אחריות, ראיות בדיקה והדגמת פרויקט | שיעור מעשי עם תיק דוגמה | [18 — הצגת פרויקט לפי דרישה, קוד וראיה](/android/topics/18-project-evidence/) |

<details markdown="1">
<summary><strong>מקורות רוחביים ומשלימים</strong></summary>

- [001 — אינדקס חומרי AppSchool](/android/asaf/001asafAndroidChapters) מפנה לפרקי עזר בנושאים כמו layouts,‏ listeners,‏ Intents, קבצים, מדיה, אנימציה, Threads, Services, חיישנים ו־SQLite. חלק מן החומר נמצא בקובצי PDF, ולכן הוא מסומן במפה כמקור משלים ולא כשיעור Markdown מלא.
- [מפגשי אנדרואיד עם זאב](/android/zeev/meetings) מרכז מצגות והקלטות על WorkManager, חיישנים, Services, התראות, Fragments, מחזור חיים, Threads,‏ BroadcastReceiver,‏ JSON API, תפריטים ו־ActivityResultLauncher.
- [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask) מתאימות לחזרה אחרי שהיישום כבר עובד: תפריטים, קלט, קבצים, מסדי נתונים, תקשורת, Intents, תכנות וחוויית משתמש.

</details>

{: .box-note}
למורים ולמתכנני מסלול: [מפת היעד והפערים בלימודי Android](/android/not-yet-covered)
מפרידה בין נושאים חסרים, מקורות משלימים ונושאים שכבר נלמדים אך ראויים להעמקה.
