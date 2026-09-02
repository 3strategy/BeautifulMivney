---
layout: page
title: "מפת נושאים באנדרואיד"
subtitle: "איפה לומדים כל נושא ובאיזה עומק"
tags: [Android, Java, index, roadmap]
lang: he
full-width: true
---

{: .box-note}
המפה עוזרת למצוא שיעור לפי **הרעיון שרוצים ללמוד**, ולא רק לפי שם הפרויקט. אם זו הפעם הראשונה שלכם באתר, התחילו באחד משלושת מסלולי הלמידה; אם כבר יש לכם פרויקט, עברו ישירות לטבלת הנושא הדרוש.

## איך קוראים את המפה?

{: .table-he}

| סימון עומק | מה תמצאו בקישור |
|---|---|
| **שיעור מעשי** | בנייה מודרכת של תוצר עובד, עם קוד ושלבי בדיקה. |
| **העמקה** | הסבר של הרעיון, השוואה או ניתוח שעוזרים להבין *למה* הקוד בנוי כך. |
| **משלים** | אזכור קצר, תרגול, שאלות חזרה או שער למצגת/קובץ נוסף. זה אינו תחליף לשיעור מלא. |

לעיתים אותו נושא מופיע בכמה פרויקטים. כדאי לבחור תחילה את הקישור ששייך לפרויקט שלכם, ואחר כך לקרוא קישור נוסף כדי לראות שימוש אחר באותו רעיון.

## שלושה מסלולי למידה מרכזיים

### TicTacMenu — ממסכים ותפריטים למשחק רשת

המסלול מתאים למי שרוצה להכיר בהדרגה ניווט, הפרדת מודל, תקשורת, התחברות ו־Firebase:

1. [Activities ותפריט Overflow](/android/projectSteps/013addingActivityToMenu)
2. [יצירת תפריט מגירה מבוסס Fragments](/android/projectSteps/014a.creatingFragmentsMenu)
3. [הוספת Fragments לתפריט](/android/projectSteps/014b.AddingFragmentsToMenu)
4. [יצירת מודל Tic-Tac-Toe](/android/projectSteps/015a.creatingTicTacToeModel)
5. [חיבור המסך למודל](/android/projectSteps/015b.AddingTicTacToeToMainActivity)
6. [משחק מרובה משתתפים עם SignalR](/android/projectSteps/016.TicTacToeSignalR)
7. [שכפול Activity והוספתו למגירה](/android/projectSteps/017DuplicateAndAddActivityToMenu)
8. [יצירת מסך Login והגדרתו כ־Launcher](/android/projectSteps/018a.LoginActivityFromGui)
9. [הקמת Firebase,‏ RTDB ו־Authentication](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup)
10. [התחברות במייל ובסיסמה](/android/projectSteps/018c.EmailPasswordLoginAndFBRef)
11. [התחברות Google ו־SHA-1](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1)
12. [מעבר ל־View Binding](/android/projectSteps/019a.BindingInsteadOfFindByID), [Binding ב־MainActivity](/android/projectSteps/019bBindingsForMainActivity) ו־[Binding ב־Fragments ובתפריט](/android/projectSteps/019c.BindingForFragmentsAndMenuActivity)
13. [לובי וחדרי משחק ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms)
14. [מצב משחק והאזנה בזמן אמת ב־RTDB](/android/projectSteps/021b.TicTacToeRTDBGame)

### CollectCircles — ציור, משחק, שמירה ועבודה ברקע

התחילו ב־[ציור ומחלקות](/android/CollectCircles/01.collect-circles-drawing), המשיכו ל־[מצב משחק ומגע](/android/CollectCircles/02.collect-circles-game), ל־[זמן, שיא ומחזור חיים](/android/CollectCircles/03.collect-circles-finish), ולבסוף קראו את [המחשבה הביקורתית על OOP ו־Views](/android/CollectCircles/04.collect-circles-oop-afterthought).

ההמשך מחולק לשתי מפות קצרות:

- [פרקים 5–7: מהתראה מקומית ל־FCM ולתשתית ענן](/android/CollectCircles/05-07.student-roadmap)
- [פרקים 8–18: ממשחק קצר לכלכלה מתמשכת, אנימציה ו־WorkManager](/android/CollectCircles/08-18.student-roadmap)

### Requery — מסד SQLite מקומי בארבעה תוצרים עובדים

1. [Entity ראשון: Student מקצה לקצה](/android/sqlite/01.requery-student)
2. [קשר רבים־לרבים עם דירוג ושדרוג סכימה](/android/sqlite/02.requery-rated-relationship)
3. [INNER JOIN typed ושלושה טפסי הוספה](/android/sqlite/03.requery-join-and-inserts)
4. [RecyclerView ומחיקה לפי מפתח מורכב](/android/sqlite/04.requery-recyclerview-delete)

---

## Android Studio, מבנה הפרויקט ותהליך העבודה


{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| יצירת `Activity` דרך Android Studio | שיעור מעשי | [הוספת Activities](/android/projectSteps/011addingActivities), [יצירת LoginActivity מן ה־GUI](/android/projectSteps/018a.LoginActivityFromGui) |
| `AndroidManifest`,‏ Launcher ורישום מסכים | שיעור מעשי | [תפריט Fragments והגדרת Launcher](/android/projectSteps/014a.creatingFragmentsMenu), [שכפול ורישום Activity](/android/projectSteps/017DuplicateAndAddActivityToMenu), [LoginActivity כ־Launcher יחיד](/android/projectSteps/018a.LoginActivityFromGui) |
| ניווט בתצוגת **Android** ומיקום קבצים | שיעור מעשי | [Layout Editor](/android/CollectCircles/01a.collect-circles-layout-editor), [Requery — הכנת Gradle וה־Entity הראשון](/android/sqlite/01.requery-student) |
| Gradle,‏ `build.gradle.kts` ו־Version Catalog | שיעור מעשי | [Requery — הוספת ספרייה ומעבד annotations](/android/sqlite/01.requery-student), [FCM — תלויות וערכים מקומיים](/android/CollectCircles/06.collect-circles-fcm-invitations), [תמיכה ב־Jetpack Compose](/android/projectSteps/192supportJetPackCompose) |
| טיפול בהתנגשות גרסאות, AGP ו־SDK | שיעור מעשי | [תיקון בעיית גרסאות](/android/projectSteps/027versionUpdates) |
| פירמוט קוד וקיצור מקשים ב־IDE | משלים | [הגדרת Ctrl+K,D לפירמוט](/android/projectSteps/012androidCodeFormatting) |
| שינוי שם פרויקט, package,‏ namespace ו־application ID | שיעור מעשי | [שינוי שם לפרויקט קיים](/android/projectSteps/191renameProject) |
| Git, ענפים, Pull Request וסקירת קוד | שיעור מעשי | [Pull Requests ב־Android Studio ובכלים נוספים](/android/projectSteps/202GitPullRequests) |
| תכנון ותיעוד פרויקט לקראת הצגה | משלים | [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask), [האקתון פיתוח מונחה־AI](/android/unsorted/habagrut) |

## Activities,‏ Intents וניווט

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| מעבר בין Activities בעזרת `Intent` מפורש | שיעור מעשי | [Activities בתפריט Overflow](/android/projectSteps/013addingActivityToMenu), [שכפול Activity וניתוב מן המגירה](/android/projectSteps/017DuplicateAndAddActivityToMenu) |
| תפריט Overflow וקובץ menu XML | שיעור מעשי | [הוספת Activities לתפריט](/android/projectSteps/013addingActivityToMenu) |
| Navigation Drawer,‏ `DrawerLayout` ו־`NavigationView` | שיעור מעשי | [יצירת תפריט מגירה](/android/projectSteps/014a.creatingFragmentsMenu), [הוספת יעדים למגירה](/android/projectSteps/014b.AddingFragmentsToMenu) |
| Fragments וניווט בתוך Activity יחיד | שיעור מעשי | [Fragments בתוך תפריט מגירה](/android/projectSteps/014b.AddingFragmentsToMenu), [שלושה Fragments ו־Bottom Navigation](/android/alon/15b.FragmentsTutorial) |
| `onCreateView` לעומת `onViewCreated` | העמקה | [מדריך Fragments](/android/alon/15b.FragmentsTutorial) |
| קבלת תוצאה מפעולה חיצונית עם `ActivityResultLauncher` | משלים | [מפגשי אנדרואיד — ActivityResultLauncher](/android/zeev/meetings#id-meeting-13-activity-result-launcher-course) |
| מעבר מושהה עם `Handler` ו־`Looper` | שיעור מעשי | [LoginActivity לפני חיבור Authentication](/android/projectSteps/018a.LoginActivityFromGui) |

## מחזור חיים, מצב ושמירה קלה

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| מחזור החיים של `Activity` | שיעור מעשי | [עצירת עדכוני זמן ב־`onStop`](/android/CollectCircles/03.collect-circles-finish), [חישוב התקדמות ב־`onStart` וב־`onStop`](/android/CollectCircles/13.collect-circles-offline-progress); **משלים:** [מצגת מחזור החיים](/android/zeev/meetings#id-meeting-6-activity-lifecycle) |
| `SharedPreferences` לקריאה וכתיבה | שיעור מעשי | [שמירת שיא](/android/CollectCircles/03.collect-circles-finish), [מצב משחק מתמשך](/android/CollectCircles/08.collect-circles-persistent-economy), [שמירת בחירת "הישאר מחובר"](/android/projectSteps/018a.LoginActivityFromGui) |
| מצב בזיכרון לעומת מצב שנשמר במכשיר | העמקה | [כלכלה מתמשכת ב־CollectCircles](/android/CollectCircles/08.collect-circles-persistent-economy) |
| שמירת מצב מסך ב־`Bundle` | משלים | [מצגת מחזור החיים](/android/zeev/meetings#id-meeting-6-activity-lifecycle) |
| זמן מונוטוני לעומת שעון קיר | העמקה | [SystemClock למדידת משחק](/android/CollectCircles/03.collect-circles-finish), [בחירת שעון להתקדמות אופליין](/android/CollectCircles/13.collect-circles-offline-progress) |
| Callback פשוט באמצעות `Runnable` | שיעור מעשי | [הודעה מן ה־View ל־Activity על סיום משחק](/android/CollectCircles/03.collect-circles-finish), [אירוע איסוף עיגול](/android/CollectCircles/08.collect-circles-persistent-economy) |

## XML, רכיבי UI ו־View Binding

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| בניית מסך ב־Layout Editor | שיעור מעשי | [CollectCircles — בניית המסך דרך ה־GUI](/android/CollectCircles/01a.collect-circles-layout-editor), [LoginActivity דרך ה־GUI](/android/projectSteps/018a.LoginActivityFromGui) |
| XML layouts, אילוצים, משקלים ומשאבי `strings.xml` | שיעור מעשי | [מסך המשחק CollectCircles](/android/CollectCircles/01.collect-circles-drawing), [מסך Login](/android/projectSteps/018a.LoginActivityFromGui), [טבלת Requery](/android/sqlite/04.requery-recyclerview-delete) |
| `View Binding` במקום `findViewById` | שיעור מעשי | [עקרונות ומעבר הדרגתי](/android/projectSteps/019a.BindingInsteadOfFindByID), [MainActivity](/android/projectSteps/019bBindingsForMainActivity), [Fragments ו־MenuActivity](/android/projectSteps/019c.BindingForFragmentsAndMenuActivity), [Requery בפרויקט חדש](/android/sqlite/01.requery-student) |
| אירועי לחיצה ו־listeners | שיעור מעשי | [חיבור לוח המשחק למודל](/android/projectSteps/015b.AddingTicTacToeToMainActivity), [הוספות למסד דרך דיאלוגים](/android/sqlite/03.requery-join-and-inserts) |
| `AlertDialog` ו־Material Dialog | שיעור מעשי | [הודעת סיום משחק](/android/CollectCircles/03.collect-circles-finish), [חנות Pushers](/android/CollectCircles/10.collect-circles-pusher-shop), [טפסי הוספה למסד](/android/sqlite/03.requery-join-and-inserts) |
| `Spinner` ו־`ArrayAdapter` | שיעור מעשי | [בחירת חדר משחק ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| `ListView` והעברת רשימה בין מסכים | תרגול משלים | [תרגיל ToDo List](/android/amjad/Ex3.ToDoList) |
| `RecyclerView`,‏ Adapter ו־ViewHolder | שיעור מעשי | [Requery — טבלה ומחיקה](/android/sqlite/04.requery-recyclerview-delete) |
| Jetpack Compose בתוך פרויקט שהתחיל ב־Java/XML | שיעור מעשי | [הוספת תמיכת Compose ו־Activity ב־Kotlin](/android/projectSteps/192supportJetPackCompose) |

## Canvas, מגע, גאומטריה ואנימציה


| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| יצירת `View` מותאם אישית ו־`onDraw` | שיעור מעשי | [ציור עיגולים ב־Canvas](/android/CollectCircles/01.collect-circles-drawing) |
| `Canvas`,‏ `Paint` ומערכת הצירים | שיעור מעשי | [הלוח הראשון](/android/CollectCircles/01.collect-circles-drawing), [ציור דמות Pusher](/android/CollectCircles/11.collect-circles-draw-pusher) |
| אירועי מגע, תפיסה, גרירה ושחרור עם `MotionEvent` | שיעור מעשי | [מצב משחק וגרירת עיגולים](/android/CollectCircles/02.collect-circles-game) |
| מרחק בין מרכזים, חפיפה והכלה של עיגולים | העמקה | [שלוש בדיקות גאומטריות](/android/CollectCircles/01.collect-circles-drawing), [יצירת עיגולים חוקיים וגרירה למטרה](/android/CollectCircles/02.collect-circles-game) |
| לולאת ציור ו־`postInvalidateOnAnimation` | שיעור מעשי | [מצב משחק אוטונומי](/android/CollectCircles/09.collect-circles-autonomous-mode), [אנימציית Pusher](/android/CollectCircles/11.collect-circles-draw-pusher) |
| הפרדת `update` מ־`draw` ותנועה לפי זמן | העמקה | [Pusher הולך — זמן, פריימים ותנועה מחזורית](/android/CollectCircles/11.collect-circles-draw-pusher) |
| חיישנים | משלים | [מפגשי אנדרואיד — Sensors](/android/zeev/meetings#id-meeting-2-sensors) |
| קול, וידאו ואנימציות משאבים | משלים | [אינדקס חומרי AppSchool](/android/asaf/001asafAndroidChapters) |

## OOP,‏ Java וארכיטקטורה

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| הפרדת מצב המשחק מן המסך | שיעור מעשי | [יצירת TicTacToeModel](/android/projectSteps/015a.creatingTicTacToeModel), [חיבור המודל ל־Activity](/android/projectSteps/015b.AddingTicTacToeToMainActivity), [מחלקת Game ב־CollectCircles](/android/CollectCircles/02.collect-circles-game) |
| מחלקות, בנאים, שדות, getters ומתודות | שיעור מעשי | [Circle ו־Target](/android/CollectCircles/01.collect-circles-drawing), [Entity ראשון ב־Requery](/android/sqlite/01.requery-student) |
| ירושה (`extends`) ו־`super` | שיעור מעשי | [Target יורש מ־Circle](/android/CollectCircles/01.collect-circles-drawing) |
| Composition לעומת ירושה, ו־View לעומת אובייקט מודל | העמקה | [מחשבה ביקורתית על עצמים, Views וירושה](/android/CollectCircles/04.collect-circles-oop-afterthought) |
| MVC לעומת MVP | העמקה | [השוואה ודוגמאות Java](/android/alon/05.LayoutExMVC.MVP) |
| פונקציות טהורות והפרדת חישוב מ־Android | שיעור מעשי | [מחשבון התקדמות אופליין](/android/CollectCircles/13.collect-circles-offline-progress), [חישוב מחיר ובדיקת יחידה](/android/CollectCircles/10.collect-circles-pusher-shop) |
| Lambda ו־listeners ב־Java | שיעור מעשי | [אירועי לוח Tic-Tac-Toe](/android/projectSteps/015b.AddingTicTacToeToMainActivity); **משלים:** [אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |

## נתונים מקומיים: SQLite ו־Requery

{: .table-he}

| נושא | עומק | איפה לומדים |
|---|---|---|
| Entity,‏ annotations וקוד שנוצר | שיעור מעשי | [Student מקצה לקצה](/android/sqlite/01.requery-student) |
| פתיחת מסד, insert ו־select typed | שיעור מעשי | [Student מקצה לקצה](/android/sqlite/01.requery-student) |
| קשר רבים־לרבים עם נתון נוסף | שיעור מעשי | [Student–Watching–Movie עם rating](/android/sqlite/02.requery-rated-relationship) |
| שדרוג סכימה בלי למחוק נתונים | שיעור מעשי | [Migration מגרסה 1 לגרסה 2](/android/sqlite/02.requery-rated-relationship) |
| `INNER JOIN` typed ו־`Tuple` | שיעור מעשי | [JOIN והוספות](/android/sqlite/03.requery-join-and-inserts) |
| מחיקה לפי מפתח מורכב ורענון UI | שיעור מעשי | [RecyclerView ומחיקת Watching](/android/sqlite/04.requery-recyclerview-delete) |
| SQLite ישיר עם `SQLiteOpenHelper` ו־`Cursor` | שיעור מעשי חלופי | [מדריך SQLite בסיסי](/android/amjad/5.DbWorkSqlite) |

## Firebase, התחברות ונתונים בזמן אמת

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| יצירת פרויקט Firebase וחיבור אפליקציית Android | שיעור מעשי | [Firebase Project + RTDB + Authentication](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup) |
| `google-services.json`,‏ package name ותקלות התאמה | שיעור מעשי | [בדיקות ותיקון No matching client](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup), [שינוי שם פרויקט מחובר לשירות](/android/projectSteps/191renameProject) |
| Firebase Authentication במייל ובסיסמה | שיעור מעשי | [Login ו־FBRef](/android/projectSteps/018c.EmailPasswordLoginAndFBRef) |
| Google Sign-In,‏ OAuth,‏ SHA-1 ו־Firebase credential | שיעור מעשי | [Google OAuth Login](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1) |
| `DatabaseReference`, כתיבה וקריאה מ־RTDB | שיעור מעשי | [פרסום חדרי משחק](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| `ValueEventListener` ועדכונים בזמן אמת | שיעור מעשי | [רשימת חדרים חיה](/android/projectSteps/021a.TicTacToeRTDBRooms), [משחק וצפייה בזמן אמת](/android/projectSteps/021b.TicTacToeRTDBGame) |
| הסרת listener והתאמה למחזור החיים | שיעור מעשי | [ניקוי מאזין החדרים](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| מבנה נתונים ב־RTDB והמרת אובייקט Java לעץ JSON | העמקה | [מודל חדר והזרימה בין מכשירים](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| כללי RTDB וגבול האמון | העמקה ראשונית | [כללי כיתה והסיכון שבכללים פתוחים](/android/projectSteps/021a.TicTacToeRTDBRooms), [תשתית הענן של CollectCircles](/android/CollectCircles/07.collect-circles-cloud-infrastructure) |

## רשת, API וענן

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| לקוח SignalR, חיבור לשרת ושליחת אירועים | שיעור מעשי | [Tic-Tac-Toe מרובה משתתפים](/android/projectSteps/016.TicTacToeSignalR) |
| זרימת הודעה בין UI,‏ Service, שרת ולקוח אחר | העמקה | [תרשים הרצף של SignalR](/android/projectSteps/016.TicTacToeSignalR) |
| קריאת API ושליחת JSON מ־Android | שיעור מעשי | [Interactions API ו־LLM ב־Java](/android/unsorted/LLM-using-google-interactions-api) |
| Firebase Cloud Functions ופריסה | שיעור מעשי מתקדם | [תשתית ענן ל־FCM](/android/CollectCircles/07.collect-circles-cloud-infrastructure) |
| הפרדת סודות וערכי סביבה מן הקוד | שיעור מעשי | [הגדרות מקומיות ל־FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| JSON כמבנה נתונים מקומי | שיעור מעשי | [מערכת שעות ב־JSON](/android/CollectCircles/16.collect-circles-json-schedule) |

## הרשאות, התראות ועבודה ברקע

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| הרשאות רגילות, מסוכנות ומיוחדות | שיעור מעשי | [מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2) |
| בקשת הרשאה בזמן ריצה | שיעור מעשי | [מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2), [הרשאת התראות ב־Android 13+](/android/CollectCircles/05.collect-circles-local-notification) |
| Notification Channel ובניית התראה מקומית | שיעור מעשי | [CollectCircles 5 — התראה מקומית](/android/CollectCircles/05.collect-circles-local-notification) |
| FCM,‏ topics,‏ data message ו־notification message | שיעור מעשי | [CollectCircles 6 — התראות דרך FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| `FirebaseMessagingService` ורישום Service ב־Manifest | שיעור מעשי | [CollectCircles 6 — שירות ההודעות](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| WorkManager ו־`OneTimeWorkRequest` | שיעור מעשי | [Worker ראשון ובדיקת זכאות](/android/CollectCircles/14.collect-circles-first-worker) |
| `PeriodicWorkRequest`, אילוצי סוללה ועבודה ייחודית | שיעור מעשי | [עבודה מחזורית](/android/CollectCircles/15.collect-circles-periodic-work) |
| תזמון מתוך JSON והעברת input ל־Worker | שיעור מעשי | [מערכת שעות ב־JSON](/android/CollectCircles/16.collect-circles-json-schedule) |
| תיאום כתיבה בין UI ל־Worker | שיעור מעשי מתקדם | [כתיבה בטוחה מן ה־Worker](/android/CollectCircles/17.collect-circles-worker-settlement) |
| מסלול WorkManager קצר המתמקד בהתראה | שיעור מעשי חלופי | [התראה מחזורית ו־Brag](/android/CollectCircles/15b.collect-circles-notification-only) |
| Thread,‏ UI thread ו־`runOnUiThread` | משלים | [מפגשי אנדרואיד — Thread](/android/zeev/meetings#id-meeting-8-thread) |
| Service,‏ AlarmManager ו־BroadcastReceiver | משלים | [מפגשי אנדרואיד עם זאב](/android/zeev/meetings) |

## בדיקות, תקלות ואיכות

| נושא | עומק | איפה לומדים |
|---:|:---:|---:|
| בדיקת יחידה לפונקציית Java טהורה | שיעור מעשי | [בדיקת מחיר Pusher](/android/CollectCircles/10.collect-circles-pusher-shop), [בדיקת מחשבון אופליין](/android/CollectCircles/13.collect-circles-offline-progress) |
| ההבדל בין `test` ל־`androidTest` | העמקה קצרה | [בדיקת מחיר Pusher](/android/CollectCircles/10.collect-circles-pusher-shop) |
| בדיקות ידניות ותוצאה נצפית | שיעור מעשי | [רשימת הבדיקה של Requery 1](/android/sqlite/01.requery-student), [בדיקת RTDB בשני מכשירים](/android/projectSteps/021a.TicTacToeRTDBRooms), [בדיקות FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| אבחון Firebase,‏ SHA-1 ו־Google Sign-In | שיעור מעשי | [פתרון תקלות OAuth](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1) |
| אבחון Gradle,‏ AGP ו־AAR Metadata | שיעור מעשי | [תיקון בעיית גרסאות](/android/projectSteps/027versionUpdates) |
| שאלות שמוודאות הבנה לקראת בחינת פרויקט | תרגול משלים | [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask) |

<details markdown="1">
<summary><strong>מקורות רוחביים ומשלימים</strong></summary>

- [אינדקס חומרי AppSchool](/android/asaf/001asafAndroidChapters) מפנה לפרקי עזר בנושאים כמו layouts,‏ listeners,‏ Intents, קבצים, מדיה, אנימציה, Threads, Services, חיישנים ו־SQLite. חלק מן החומר נמצא בקובצי PDF, ולכן הוא מסומן במפה כמקור משלים ולא כשיעור Markdown מלא.
- [מפגשי אנדרואיד עם זאב](/android/zeev/meetings) מרכז מצגות והקלטות על WorkManager, חיישנים, Services, התראות, Fragments, מחזור חיים, Threads,‏ BroadcastReceiver,‏ JSON API, תפריטים ו־ActivityResultLauncher.
- [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask) מתאימות לחזרה אחרי שהיישום כבר עובד: תפריטים, קלט, קבצים, מסדי נתונים, תקשורת, Intents, תכנות וחוויית משתמש.

</details>

{: .box-note}
למורים ולמתכנני מסלול: [מפת היעד והפערים בלימודי Android](/android/not-yet-covered)
מפרידה בין נושאים חסרים, מקורות משלימים ונושאים שכבר נלמדים אך ראויים להעמקה.
