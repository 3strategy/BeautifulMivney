---
layout: page
title: מפת היעד והפערים בלימודי Android
subtitle: מה כדאי לתלמידים להבין, לתרגל ולהציג בפרויקט
lang: he
full-width: true
---

{: .box-note}
החלק הראשון בדף הוא **מפת יעד פדגוגית עצמאית**: רשימת נושאים רצויה שנבנתה לפני בדיקת הכיסוי באתר. לכן עצם הופעתו של נושא כאן אינה טענה שהוא חסר, קיים או נלמד לעומק בחומר הנוכחי. בהמשך הדף מפת היעד מושווית לשיעורים הקיימים.

## מפת יעד פדגוגית עצמאית

המטרה אינה רק שתלמידים יצליחו להעתיק יישום עובד. בסיום מסלול Android טוב הם אמורים להיות מסוגלים **להסביר** החלטות, **לנבא** התנהגות, **לאתר** תקלה, **לבחור** כלי מתאים ו**להדגים** שהפתרון שלהם עומד בדרישות.

### 1. יסודות סביבת הפיתוח והפרויקט

- להכיר את תפקידי Android Studio, ה־SDK, האמולטור והמכשיר הפיזי, ולהבין את ההבדל בין קוד המקור, משאבים ותוצר הבנייה.
- להתמצא במבנה מודול `app`, ב־Gradle, ב־Manifest, בגרסאות SDK ובתלויות; לקרוא הודעת Sync או Build ולהגיע לסיבה הראשונה לכשל.
- להבין package, namespace ו־application ID, ולדעת מדוע שמותיהם לעיתים זהים אך תפקידיהם שונים.
- להשתמש ב־Logcat, ב־breakpoints, ב־debugger וב־Layout Inspector כדי לבדוק השערה ולא רק לנחש תיקון.
- להבין את ההבדל בין שגיאת קומפילציה, קריסה בזמן ריצה, ANR, התנהגות לוגית שגויה וכשל רשת.
- לעבוד באופן בטוח עם Git: שינויים קטנים, diff קריא, היסטוריה משמעותית והימנעות מהכנסת סודות או קבצים שנוצרים מקומית.

### 2. יסודות Java ותכנון מונחה עצמים

- לשלוט בטיפוסים, תנאים, לולאות, מתודות, מערכים ואוספים, ולבחור מבנה נתונים לפי הפעולות הנדרשות.
- להבין מחלקה, מופע, בנאי, מצב והתנהגות; להבחין בין שדה מקומי, שדה מופע ושדה `static`.
- להשתמש בכימוס, הורשה, ממשק, מחלקה מופשטת ופולימורפיזם רק כאשר הם מבטאים קשר אמיתי במודל.
- להבין `null`, השוואת אובייקטים, `equals`/`hashCode`, חריגות ו־generics, ולזהות שגיאות נפוצות סביבם.
- להפריד בין מודל הנתונים, כללי היישום וקוד התצוגה, ולתת שמות שמגלים כוונה.
- לתעד API ציבורי ב־Javadoc, להסביר קוד בעל פה ולנמק בחירה תכנונית או אלגוריתמית.

### 3. מודל הרכיבים, מחזור חיים ומצב

- להבין את תפקידי `Activity`, `Fragment`, `Service`, `BroadcastReceiver`, `ContentProvider` ו־`Application`, ולא לבחור רכיב רק לפי שמו.
- להסביר את מחזור החיים של Activity ו־Fragment ואת ההבדל בין מחזור חיי ה־Fragment למחזור חיי ה־View שלו.
- לצפות מה יקרה בסיבוב מסך, במעבר לרקע, ביצירת תהליך מחדש ובחזרה דרך Back; לא להניח שאובייקט בזיכרון נשמר תמיד.
- להבדיל בין מצב UI זמני, `savedInstanceState`, שמירה מקומית ומקור אמת מתמשך.
- להבין task, back stack, Intent מפורש/מרומז, extras, deep link ותוצאות באמצעות Activity Result API.
- לזהות דליפת Context או listener, להבדיל בין Context של Activity ל־Application, ולנקות משאבים בנקודת מחזור החיים הנכונה.

### 4. ממשק משתמש, אינטראקציה ונגישות

- לבנות היררכיית View/XML קריאה, להבין יחידות `dp`/`sp`, constraints, משאבים, themes ו־styles.
- להשתמש ב־View Binding באופן בטוח ולהבין מדוע חיפוש ידני של View או שמירת binding זמן רב מדי עלולים להזיק.
- לטפל באירועי לחיצה, טקסט, מגע ומחוות; להבחין בין event חד־פעמי לבין state שממנו מציירים את המסך.
- לבנות רשימות יעילות באמצעות RecyclerView, Adapter, ViewHolder ו־DiffUtil, ולהסביר recycling וזהויות יציבות.
- לתת משוב ברור למצבי טעינה, ריק, שגיאה והצלחה, ולמנוע לחיצה כפולה או פעולה לא תקפה.
- לתכנן למסכים, כיוונים וגדלי טקסט שונים בלי לקבע מידות למכשיר יחיד.
- ליישם נגישות בסיסית: `contentDescription`, סדר מיקוד, יעד מגע מספיק, ניגודיות, משמעות שאינה תלויה בצבע בלבד ותמיכה בקורא מסך.
- להבין לוקליזציה ו־RTL/LTR: מחרוזות במשאבים, plural resources, `start`/`end` וטקסט מעורב עברית־אנגלית.
- להכיר ציור מותאם ב־Canvas, מערכת הצירים, invalidation, אנימציה וקלט מגע כאשר הבעיה מצדיקה View מותאם.

### 5. ניווט, זרימת מסכים וחוויית משתמש

- לתכנן מסלול משתמש בין מסכים, כולל ביטול, חזרה, שגיאה ושחזור; לא להסתפק ב"מסך הבא נפתח".
- להעביר מזהה קטן בין מסכים ולטעון את הנתונים ממקור האמת, במקום להעביר גרף אובייקטים גדול ושביר.
- להכיר Navigation Component או חלופה עקבית, ולמנוע שכפול מסכים ו־Back Stack מפתיע.
- להשתמש ב־dialogs, menus, snackbars והתראות רק לפי תפקידם בחוויית המשתמש.

### 6. נתונים מקומיים ומידול

- לבחור בין state בזיכרון, `SharedPreferences`/DataStore, קובץ ו־SQLite/ORM לפי מבנה הנתונים, נפחם ומשך חייהם.
- למדל ישויות, מפתחות, קשרים ואילוצים; להבין נרמול בסיסי, מפתח זר ושלמות נתונים.
- לבצע CRUD ושאילתות מסוננות, ממוינות ומצורפות (`JOIN`), ולהסביר את משמעות התוצאה ולא רק להציג קוד.
- לבצע פעולות מסד נתונים מחוץ ל־main thread, לטפל בכשל ולבדוק שמידע שורד הפעלה מחדש.
- להבין migration ושינוי schema לאורך גרסאות, ולמנוע מחיקת נתוני משתמש כפתרון רגיל.
- להמיר JSON למודל טיפוסי ולהפך, כולל שדות חסרים, גרסאות פורמט ותאריכים.

### 7. רשת, API ושירותי ענן

- להבין בקשת HTTP, method, URL, headers, status code, JSON, timeout ו־retry; להבחין בין שגיאת שרת, רשת ונתונים.
- לבצע קריאות רשת אסינכרוניות בלי לחסום את ה־UI, לקשור אותן למחזור חיים ולהציג loading/error/empty states.
- להשתמש בספריית לקוח כגון Retrofit/OkHttp באופן מודולרי, ולא לערבב parsing, רשת ו־UI באותה Activity.
- להכיר pagination, caching, offline-first והסכנות של retry לא מבוקר או פעולה שאינה idempotent.
- להבין התחברות, session/token ותפקידי Firebase Authentication או ספק זהות אחר.
- למדל נתונים בענן, מאזינים בזמן אמת, ניתוק, סנכרון וכתיבות מתנגשות; להבחין בין הרשאת UI לבין כלל אבטחה בצד השרת.
- להכיר תקשורת בזמן אמת בין משתמשים ולתכנן presence, בעלות, סדר אירועים והתאוששות מחיבור שנפל.

### 8. הרשאות, פרטיות ואבטחה

- להבחין בין הרשאה ב־Manifest לבין runtime permission, לבקש בזמן המתאים ולטפל באישור, סירוב ו־"אל תשאל שוב".
- להשתמש ב־Activity Result Contracts עבור הרשאות, מצלמה, גלריה ובחירת קובץ.
- לאחסן סודות מחוץ למאגר, להבין שאין "סוד" אמיתי בתוך APK, ולהגביל API keys בצד הספק.
- לאמת קלט, להימנע מבניית SQL או URL לא בטוחה, ולהשתמש ב־HTTPS ובהגדרות Network Security לפי הצורך.
- לצמצם איסוף ושמירת מידע אישי, להסביר למשתמש מדוע הוא נדרש ולאפשר מחיקה/התנתקות.
- להגדיר כללי Firebase/שרת לפי בעלות ותפקידים ולבדוק אותם נגד גישה לא מורשית, לא רק נגד המסלול התקין באפליקציה.

### 9. עבודה ברקע, זמן והתראות

- להבין את מגבלות הרקע והסוללה של Android ואת ההבדל בין thread, עבודה אסינכרונית, WorkManager, foreground service ו־AlarmManager.
- לבחור WorkManager לעבודה מובטחת ודחויה, להגדיר constraints ו־unique work, ולתכנן retry ותוצאה.
- להשתמש ב־Service רק כאשר משמעות הרכיב מתאימה; להכיר foreground notification וחובת עצירה.
- לתזמן זמן מדויק רק כשיש הצדקה, ולהסביר את מגבלות exact alarms ו־Doze.
- ליצור notification channel, לבקש הרשאת התראות בגרסאות המתאימות, לבנות PendingIntent בטוח ולטפל בלחיצה.
- להבין push/FCM: token, הודעת data לעומת notification, foreground/background וחוסר הבטחה למסירה מיידית.
- להשתמש ב־BroadcastReceiver לאירוע מערכת מתאים ובהיקף מינימלי, בלי להפוך אותו למנגנון רקע כללי.

### 10. יכולות מכשיר ומדיה

- לקבל מיקום באופן מודע להרשאות, דיוק, צריכת סוללה ופרטיות; להציג מפה בלי לחשוף מפתח או לעקוב ללא צורך.
- לעבוד עם מצלמה/גלריה באמצעות contracts ו־content URI, ולא להניח גישה לנתיב קובץ גלובלי.
- להבין אחסון תחום (scoped storage), `FileProvider`, metadata וסיבוב תמונה.
- לקרוא חיישנים בקצב מתאים למחזור החיים, לסנן רעש ולהסביר מערכת צירים ויחידות.
- לטפל באודיו/וידאו, focus והרשאות בהתאם לתרחיש, ולשחרר משאבים.

### 11. ארכיטקטורה, אסינכרוניות ואיכות קוד

- להגדיר מקור אמת וזרימת מידע חד־כיוונית; להפריד UI, domain וגישה לנתונים.
- להכיר MVVM, ViewModel, Repository ו־observable state, אך לבחור אותם כדי לפתור בעיית state/testability ולא כטקס שמות.
- להבין main thread, race condition, callback, executor ו־future; למנוע עדכון View אחרי שמחזור חייו הסתיים.
- לטפל בשגיאות באופן עקבי, להציג הודעה מועילה למשתמש ולשמור פרטים טכניים ב־log ללא מידע רגיש.
- להקטין duplication, מתודות ענק ותלויות גלובליות; להשתמש בהזרקת תלויות כאשר היא מוסיפה יכולת בדיקה והחלפה.
- לקרוא ולכבד API contracts, annotations ו־lint warnings, ולהבחין בין warning שיש לתקן לבין suppression מנומק.

### 12. בדיקות, איתור תקלות והוכחת התנהגות

- לכתוב unit tests ללוגיקה טהורה, כולל מקרי קצה וכשל, ולבנות קוד שאפשר לבדוק בלי Android runtime.
- לכתוב instrumented/UI tests למסלול משתמש קריטי, ולשלוט בתלויות רשת/זמן כדי למנוע בדיקות מקריות.
- לבדוק migration, persistence, הרשאות, offline, סיבוב מסך ושחזור תהליך — לא רק happy path.
- להשתמש ב־profiler, StrictMode, Network Inspector וכלי ניתוח זיכרון/CPU כאשר תסמין מצדיק זאת.
- לשחזר באג, לנסח צעדי שחזור, לבודד את השינוי שפתר אותו ולהוסיף בדיקת regression כאשר אפשר.
- להציג ראיות: test output, צילום/וידאו קצר, logs ממוקדים והסבר מדוע הראיה מאמתת את הדרישה.

### 13. בנייה, הפצה ותחזוקה

- להבין debug לעומת release, חתימה, version code/name ו־build variants.
- להכין icon, שם אפליקציה, הרשאות ו־Manifest מצומצמים, ולבדוק התנהגות בגרסת release.
- להריץ lint ובדיקות לפני הפצה, לטפל ב־minification/resource shrinking במידת הצורך ולקרוא stack trace ממופה.
- להכיר עקרונות Play Console, מדיניות פרטיות, Data safety, בדיקות מוקדמות ועדכון גרסה בלי לאבד נתונים.
- לנהל תלויות וגרסאות באופן מודע, לעקוב אחר API מיושן ולהעדיף מעבר מדורג שממשיך לבנות.

### 14. פרויקט מסכם ויכולת הסבר

- לנסח בעיה, קהל יעד ותרחישי שימוש; לתרגם אותם לדרישות שאפשר לבדוק.
- לבחור כמה נושאים מתקדמים שמשרתים את המוצר ולשלבם לעומק, במקום לצבור APIs לא קשורים.
- להציג תרשים רכיבים ומודל נתונים, ולהסביר בעלות על מידע, זרימתו ונקודות כשל.
- להדגים תרחיש מלא הכולל קלט, עיבוד, שמירה/תקשורת, משוב ושחזור מכשל.
- להסביר כל קטע מרכזי במילים של התלמיד, להשוות חלופות ולציין מגבלה או שיפור עתידי אמיתי.
- למסור קוד קריא, הוראות הפעלה, תיעוד החלטות וראיות בדיקה כך שאדם אחר יוכל להפעיל ולהעריך את הפרויקט.

---

## ממצאי ההשוואה לחומר הקיים

ההשוואה נעשתה מול [מפת הנושאים באנדרואיד](/android/topics-index), שמבחינה בין שיעור מעשי, העמקה ומקור משלים. זו תמונת מצב של **עומק ההוראה המתועד**, לא חיפוש מילים בלבד: נושא עשוי להופיע בקוד או במצגת ועדיין להזדקק למסלול שבו התלמיד מתרגל, בודק ומסביר אותו.

| סטטוס | פירוש |
|:---|:---|
| **חסר** | לא נמצא במפה שיעור ממוקד או מסלול לימוד מספק. |
| **מוזכר/משלים** | קיים קישור, מצגת, תרגיל צדדי או שימוש קצר, אך אין עדיין רצף הוראה מעשי ומעמיק. |
| **נלמד, ראוי להעמקה** | יש שיעור מעשי משמעותי, אך חסרים מקרי קצה, הסבר עקרוני, בדיקה או חיבור לפרויקט עצמאי. |

העדיפות אינה דירוג של "נושא מרשים". **P0** הוא יסוד שכל תלמיד ופרויקט צריכים; **P1** חשוב למסלול מלא או לפרויקט גמר; **P2** הוא הרחבה בחירה טובה לאחר שהיסודות יציבים.

### P0 — יסודות שכדאי להשלים תחילה

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|:---|:---:|:---|:---|
| שחזור Activity ו־Fragment אחרי שינוי תצורה או הריגת תהליך | **נלמד, ראוי להעמקה** | תרגיל שמסובב מסך, מפעיל `Don't keep activities` או יוצר תהליך מחדש; הבחנה בין field,‏ `Bundle` ומקור אמת; מחזור חיי ה־View של Fragment | [מחזור חיים ב־CollectCircles](/android/CollectCircles/03.collect-circles-finish), [מצגת מחזור החיים](/android/zeev/meetings#id-meeting-6-activity-lifecycle) |
| נגישות, מסכים אדפטיביים ולוקליזציה | **חסר** | `contentDescription`, קורא מסך, גודל טקסט, contrast, יעד מגע, strings/plurals,‏ RTL ו־`start`/`end`, ובדיקה מעשית על שני גדלים | [Layout Editor](/android/CollectCircles/01a.collect-circles-layout-editor) יכול לשמש בסיס למסלול חדש |
| מצבי UI מלאים: טעינה, ריק, שגיאה, הצלחה ו־retry | **חסר** | מודל מצב מפורש ותרגיל שבו ה־API או המסד מחזירים גם כשל ורשימה ריקה; מניעת לחיצה כפולה ושימור state | [RTDB rooms](/android/projectSteps/021a.TicTacToeRTDBRooms), [RecyclerView של Requery](/android/sqlite/04.requery-recyclerview-delete) |
| ארכיטקטורת state:‏ ViewModel, Repository וזרימת מידע חד־כיוונית | **חסר** | מסלול Java/XML שמוציא state ופעולות מן ה־Activity, שורד recreation וניתן לבדיקה; להציג את הכלים כפתרון לבעיה ולא כתבנית שמעתיקים | [הפרדת מודל Tic-Tac-Toe](/android/projectSteps/015a.creatingTicTacToeModel), [MVC לעומת MVP](/android/alon/05.LayoutExMVC.MVP) |
| איתור תקלות שיטתי | **מוזכר/משלים** | שיעור מעשי ב־Logcat וקריאת stack trace מן ה־`Caused by` הראשון, breakpoints, watches, debugger ו־Layout/Network Inspector; הבחנה בין compile, crash, ANR ובאג לוגי | [אבחון Firebase ו־OAuth](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1), [תיקון גרסאות](/android/projectSteps/027versionUpdates) |
| בדיקות של Android והתנהגות משולבת | **נלמד, ראוי להעמקה** | מעבר מ־unit tests לפונקציות טהורות ל־instrumented/UI tests; תרגילי regression למחזור חיים, persistence, הרשאות, offline ו־migration | [בדיקת מחיר](/android/CollectCircles/10.collect-circles-pusher-shop), [בדיקת מחשבון אופליין](/android/CollectCircles/13.collect-circles-offline-progress) |
| אבטחת נתונים וכללי הרשאה בצד השרת | **נלמד, ראוי להעמקה** | מעבדה עם משתמש מורשה ותוקף, כללים לפי בעלות, בדיקות Emulator וכללי deny-by-default; אימות קלט, token/session וגבול האמון בין UI לשרת | [גבול האמון ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms), [הפרדת סודות](/android/CollectCircles/06.collect-circles-fcm-invitations) |

### P1 — השלמות חשובות למסלול Android ולפרויקט גמר

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|:---|:---:|:---|:---|
| יסודות HTTP ולקוח API כללי | **נלמד, ראוי להעמקה** | method/status/headers/timeout,‏ Retrofit/OkHttp, המרת JSON למודל טיפוסי, ביטול לפי lifecycle, offline/cache ו־retry אחראי; הידע כיום קשור בעיקר ל־SignalR או ל־API של LLM | [SignalR](/android/projectSteps/016.TicTacToeSignalR), [Interactions API](/android/unsorted/LLM-using-google-interactions-api) |
| אסינכרוניות ותחרות בין פעולות | **מוזכר/משלים** | main thread, executor/callback, race condition, ביטול, תוצאה שמגיעה אחרי סגירת מסך, ותיאום בין מקור מקומי לרשת | [מפגש Thread](/android/zeev/meetings#id-meeting-8-thread), [תיאום UI ו־Worker](/android/CollectCircles/17.collect-circles-worker-settlement) |
| ניווט מודרני ושחזור זרימה | **נלמד, ראוי להעמקה** | back stack,‏ Up לעומת Back, deep links,‏ Navigation Component, העברת מזהה במקום אובייקט, ותוצאה טיפוסית באמצעות contracts | [Activities ו־Intents](/android/projectSteps/013addingActivityToMenu), [Fragments בתפריט](/android/projectSteps/014b.AddingFragmentsToMenu), [ActivityResultLauncher](/android/zeev/meetings#id-meeting-13-activity-result-launcher-course) |
| RecyclerView כרכיב רשימה כללי | **נלמד, ראוי להעמקה** | recycling לעומק, זהות פריט, DiffUtil, כמה view types, מצבי empty/loading ושמירת פעולת משתמש; כיום הוא נלמד היטב בתוך תרחיש Requery אחד | [RecyclerView ומחיקה](/android/sqlite/04.requery-recyclerview-delete) |
| מסד מקומי מודרני, threading ועסקאות | **נלמד, ראוי להעמקה** | Room/DAO כמסלול עדכני לצד Requery, פעולות מחוץ ל־main thread, transactions, אילוצים ובדיקות migration; הכיסוי הקיים למידול, JOIN ו־migration הוא בסיס חזק | [ארבעת שיעורי Requery](/android/sqlite/01.requery-student) |
| Java/OOP מעבר למחלקה וירושה | **נלמד, ראוי להעמקה** | interfaces ומחלקות מופשטות, generics,‏ `equals`/`hashCode`, חריגות ומבני נתונים לפי סיבוכיות; תרגילי refactoring והסבר בחירה | [מחשבה ביקורתית על OOP](/android/CollectCircles/04.collect-circles-oop-afterthought), [מודל Tic-Tac-Toe](/android/projectSteps/015a.creatingTicTacToeModel) |
| Service,‏ AlarmManager ו־BroadcastReceiver אמיתיים | **מוזכר/משלים** | שיעור שמבדיל בין הרכיבים לבין WorkManager, כולל lifecycle, מגבלות רקע, foreground service, exact alarm ומתי *לא* להשתמש; `FirebaseMessagingService` הוא דוגמה טובה אך מיוחדת | [FCM Service](/android/CollectCircles/06.collect-circles-fcm-invitations), [מפגשי Android](/android/zeev/meetings) |
| הרשאות ו־Activity Result Contracts מקצה לקצה | **נלמד, ראוי להעמקה** | מעבר מן הבקשה הבסיסית לטיפול ב־denied, rationale ו־don't ask again; contracts להרשאה, מצלמה, גלריה וקבצים ללא נתיבי קובץ שבירים | [מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2), [ActivityResultLauncher](/android/zeev/meetings#id-meeting-13-activity-result-launcher-course) |
| פרטיות, אחסון סודות ואבטחת APK/תקשורת | **מוזכר/משלים** | מדוע secret בתוך APK אינו סוד, הגבלת API key,‏ HTTPS/network security, צמצום נתונים אישיים, מחיקת חשבון ו־logs ללא מידע רגיש | [ערכים מקומיים ל־FCM](/android/CollectCircles/06.collect-circles-fcm-invitations), [Firebase setup](/android/projectSteps/018b.FirebaseProjectRtdbAuthSetup) |
| Release, חתימה ותחזוקת גרסה | **חסר** | debug/release, signing,‏ versionCode/versionName, APK/AAB,‏ lint, minification, בדיקת release, Play Console, מדיניות פרטיות ו־Data safety | [שינוי שם פרויקט](/android/projectSteps/191renameProject) ו־[Git/PR](/android/projectSteps/202GitPullRequests) הם הכנה לתהליך עבודה, לא להפצה |
| אפיון, ארכיטקטורה, תיעוד והצגת פרויקט | **מוזכר/משלים** | דרישות בדיקות, תרשים מסכים/מחלקות/נתונים, תיעוד החלטות, מדריך משתמש, ראיות בדיקה ורפלקציה; ובעיקר תרגול שבו התלמיד מסביר קוד שלא כתב באותו רגע | [שאלות שבוחן עשוי לשאול](/android/exam-prep/questions_tester_may_ask), [האקתון AI](/android/unsorted/habagrut) |

### P2 — הרחבות בחירה שכדאי להפוך ממקור משלים למסלול מעשי

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|:---|:---:|:---|:---|
| מצלמה, גלריה ואחסון תחום | **מוזכר/משלים** | contracts,‏ content URI,‏ FileProvider, הרשאות לפי גרסה, metadata וסיבוב תמונה | [אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |
| מיקום ומפות | **מוזכר/משלים** | הרשאה מדורגת, דיוק מול סוללה, lifecycle, מפה, פרטיות והדגמת תרחיש שימוש אמיתי | [מפגשי Android](/android/zeev/meetings) |
| חיישנים | **מוזכר/משלים** | מערכת צירים ויחידות, קצב דגימה, סינון רעש, הרשמה/הסרה לפי lifecycle ותוצר עובד | [מפגש Sensors](/android/zeev/meetings#id-meeting-2-sensors) |
| מדיה, מיקרופון ודיבור | **מוזכר/משלים** | audio focus, שחרור משאבים, הרשאות ומחזור חיים; מסלול בחירה ל־Speech-to-Text/Text-to-Speech | [אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |
| Bluetooth ו־NFC | **חסר** | מסלול בחירה אחד עם use case, הרשאות/יכולות מכשיר, state וכשלי תקשורת | אין עדיין נקודת פתיחה במפת הנושאים |
| Jetpack Compose כמערכת UI | **מוזכר/משלים** | state, recomposition, layouts, lists, interop, navigation ובדיקות; השיעור הקיים מוסיף תמיכה ו־Activity ראשונה בלבד | [הוספת Compose לפרויקט Java/XML](/android/projectSteps/192supportJetPackCompose) |
| Paging, cache ו־offline-first | **חסר** | תרגיל API עם מקור מקומי, מדיניות freshness, pagination ומיזוג שגיאות/נתונים ישנים | [Interactions API](/android/unsorted/LLM-using-google-interactions-api) יכול לשמש מעבדת רשת התחלתית |
| ContentProvider ו־SurfaceView | **חסר** | ללמד רק בפרויקט שבו הם פותרים צורך אמיתי; אלה אפשרויות התמחות, לא יסודות שחייבים לכפות על כל אפליקציה | אין עדיין נקודת פתיחה במפת הנושאים |

<details markdown="1">
<summary><strong>כיול מול מחוון ההערכה החיצוני</strong></summary>

[מחוון משרד החינוך לחלופת טלפונים חכמים, תשפ"ו](https://meyda.education.gov.il/files/CSIT/smartphonesProject-5.pdf) מחזק כמה מן העדיפויות: אפליקציה עובדת מקצה לקצה; ממשק אינטראקטיבי ורב־מסכי; אירועים והרשאות בזמן ריצה; מסד נתונים עם קריאה וכתיבה; בחירה בנושאים מתקדמים; תכנון מונחה עצמים, מבני נתונים, ארכיטקטורה, תיעוד ושליטה של התלמיד בקוד ובנתונים.

המחוון מונה בין אפשרויות ההרחבה WorkManager,‏ API,‏ Service משמעותי, קשרי מסד ו־JOIN,‏ RecyclerView,‏ AI,‏ AlarmManager והתראות,‏ ActivityResultContract, ציור מותאם, מיקום/מפות, רשת, חיישנים, ריבוי משתמשים בזמן אמת,‏ BroadcastReceiver,‏ SharedPreferences ומצלמה/גלריה. חלקן כבר מכוסות היטב באתר, במיוחד WorkManager,‏ Requery,‏ Canvas,‏ Firebase בזמן אמת והתראות; אחרות מופיעות בטבלאות הפערים לעיל.

עם זאת, רשימת APIs במחוון אינה מחליפה שיקול פדגוגי ועדכני. למשל `AsyncTask` מיושן, ו־ContentProvider או Service אינם יעד בפני עצמם אם אין להם תפקיד אמיתי. עדיף תלמיד שמבין state, אבטחה, lifecycle ובדיקות ומיישם שתי הרחבות רלוונטיות לעומק, מתלמיד שאוסף שמות רכיבים בלי להבין את מגבלותיהם.

</details>
