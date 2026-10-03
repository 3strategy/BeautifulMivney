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

מעבדות [topics](/android/topics/) הועמקו בכל 26 הנושאים: מודל חשיבה, תרשים זרימה/אחריות, חוזי מתודות ב־Javadoc והערות על החלטות מימוש. זה מחזק את ההבנה בתוך המעבדות הקיימות; הוא אינו סוגר פערי חומרה, נגישות ידנית, שרת אמיתי או העברה עצמאית לפרויקט אחר. לכן הדרישות האלה נשארות בטבלה גם כשנוסף הסבר טוב יותר.

| סטטוס | פירוש |
|---:|---:|
| **חסר** | לא נמצא במפה שיעור ממוקד או מסלול לימוד מספק. |
| **מוזכר/משלים** | קיים קישור, מצגת, תרגיל צדדי או שימוש קצר, אך אין עדיין רצף הוראה מעשי ומעמיק. |
| **נלמד, ראוי להעמקה** | יש שיעור מעשי משמעותי, אך חסרים מקרי קצה, הסבר עקרוני, בדיקה או חיבור לפרויקט עצמאי. |

העדיפות אינה דירוג של "נושא מרשים". **P0** הוא יסוד שכל תלמיד ופרויקט צריכים; **P1** חשוב למסלול מלא או לפרויקט גמר; **P2** הוא הרחבה בחירה טובה לאחר שהיסודות יציבים.

### P0 — יסודות שכדאי להשלים תחילה

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|---:|:---:|---:|---:|
| שחזור Activity ו־Fragment אחרי שינוי תצורה או הריגת תהליך | **נוסף שיעור מעשי; נותרה העמקה** | [המעבדה החדשה](/android/topics/01-lifecycle-state/) בודקת סיבוב, Force stop,‏ `Don't keep activities`,‏ field/`Bundle`/שמירה מקומית והחלפת View של Fragment. הרחבה עתידית: הריגת תהליך בידי המערכת ושחזור אותה משימה עם ראיות Logcat | [מעבדת שחזור](/android/topics/01-lifecycle-state/), [מחזור חיים ב־CollectCircles](/android/CollectCircles/03.collect-circles-finish) |
| נגישות, מסכים אדפטיביים ולוקליזציה | **נוסף שיעור מעשי; נדרש אימות ידני** | [מעבדת מדף הקריאה](/android/topics/02-accessibility-adaptive-localization/) מלמדת `contentDescription`, קורא מסך, live region, יעד מגע, strings/plurals,‏ RTL ו־`start`/`end`. הבנייה והמעבר בין שפות נבדקו; עדיין דרושות בדיקות ידניות של TalkBack, ניגודיות ושני גדלי מסך | [מעבדת נגישות ולוקליזציה](/android/topics/02-accessibility-adaptive-localization/), [Layout Editor](/android/CollectCircles/01a.collect-circles-layout-editor) |
| מצבי UI מלאים: טעינה, ריק, שגיאה, הצלחה ו־retry | **נוסף שיעור מעשי; חסר חיבור אמיתי למקור** | [מעבדת המצבים](/android/topics/03-ui-states-retry/) מלמדת מודל מפורש, כשל ורשימה ריקה ממקור מדומה, השבתת לחיצה כפולה, Retry ושחזור אחרי סיבוב. עדיין צריך לחבר את החוזה ל־API או למסד ולבדוק כשל אמיתי | [מעבדת מצבי המסך](/android/topics/03-ui-states-retry/), [RTDB rooms](/android/projectSteps/021a.TicTacToeRTDBRooms) |
| ארכיטקטורת state: ViewModel, Repository וזרימת מידע חד־כיוונית | **נוספה מעבדת העברה; נותר חיבור למקור אמיתי** | [מעבדת ViewModel](/android/topics/04-viewmodel-repository/) מעבירה מסך קיים ל־LiveData, מציגה מקור אמת אחד וכוללת משימת העברה לפרויקט אחר. המקור עדיין מדומה; בהמשך יש להחיל את אותו חוזה על רשת/מסד ועל שחזור תהליך לפי צורך | [מעבדת ViewModel](/android/topics/04-viewmodel-repository/), [שמירה ב־Connect4](/android/Connect4/04.connect4-save-and-restore/) |
| איתור תקלות שיטתי | **נוספה מעבדת אבחון; נדרש תרגול ידני** | [מעבדת האבחון](/android/topics/06-systematic-debugging/) מציגה תקלות מכוונות של Build, לוגיקה, crash, קיפאון, חפיפת Views ורשת, עם Logcat, debugger ו־Inspectors. הבנייה, תוצאת הלוגיקה, בקשת הרשת וחפיפת ה־View נבדקו באמולטור; עדיין נדרש תרגול ידני של חלונות ה־Inspectors וה־ANR | [מעבדת אבחון](/android/topics/06-systematic-debugging/), [אבחון Firebase ו־OAuth](/android/projectSteps/018d.GoogleOAuthLoginAndSHA1) |
| בדיקות של Android והתנהגות משולבת | **נוספו בדיקות UI ו־migration; נותרו תחומים נוספים** | [מעבדת הבדיקות](/android/topics/05-android-ui-tests/) בודקת סיבוב, Fragment ושמירה; [מעבדת Room](/android/topics/12-room-persistence/) בודקת שדרוג סכימה ונתון קיים. עדיין דרושים תרגילים מעשיים להרשאות ו־offline | [מעבדת בדיקות UI](/android/topics/05-android-ui-tests/), [מעבדת Room](/android/topics/12-room-persistence/) |
| אבטחת נתונים וכללי הרשאה בצד השרת | **נוספה מעבדת כללים; נותר חיבור אפליקציה** | [מעבדת כללי RTDB](/android/topics/07-rtdb-security-rules/) בודקת באמולטור בעלים, משתמש אחר ואורח מול כללי בעלות, מבנה נתון ו־deny-by-default; בדיקת רגרסיה נכשלת כשמרחיבים קריאה בטעות. עדיין צריך לחבר לקוח Android, Auth ופרויקט Firebase אמיתי ולהעמיק ב־token/session | [מעבדת כללי RTDB](/android/topics/07-rtdb-security-rules/), [גבול האמון ב־RTDB](/android/projectSteps/021a.TicTacToeRTDBRooms) |

### P1 — השלמות חשובות למסלול Android ולפרויקט גמר

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|---:|:---:|---:|---:|
| יסודות HTTP ולקוח API כללי | **נוספו API ו־offline/cache; נותר שחזור single-item** | [מעבדת HTTP](/android/topics/08-http-client/) מלמדת GET,‏ status,‏ Content-Type,‏ Retrofit/OkHttp, המרת JSON למודל, timeout, ביטול ב־lifecycle ו־retry ידני על כשל מתאים. נבדקו 200/404 באמולטור וארבעה מקרי תשובה ב־MockWebServer; cache ו־offline נלמדים ב[מעבדה 25](/android/topics/25-paging-offline-cache/), עם Room כמקור לתצוגה וכשל refresh ששומר נתון ישן; נותר לתרגל שחזור תוצאת HTTP חד־פריטית אחרי סיבוב | [מעבדת HTTP](/android/topics/08-http-client/), [SignalR](/android/projectSteps/016.TicTacToeSignalR) |
| אסינכרוניות ותחרות בין פעולות | **נוספה מעבדת תחרות; נותר מקרה נתונים אמיתי** | [מעבדת התשובה הישנה](/android/topics/09-async-races/) מפעילה שתי עבודות חופפות ב־Executor, מסננת callback מיושן לפי דור, מבטלת Future ושומרת תוצאה בסיבוב. שלוש בדיקות UI עברו באמולטור. עדיין כדאי לתרגל תחרות בכתיבה למסד או ברשת אמיתית | [מעבדת תחרות](/android/topics/09-async-races/), [מחשב ברקע ב־Connect4](/android/Connect4/06.connect4-background-turns/), [בדיקת דור הרמז](/android/hex/08-hint/#show-hint-guard) |
| ניווט מודרני ושחזור זרימה | **נוספה מעבדת ניווט; נותרות הרחבות** | [מעבדת הניווט](/android/topics/10-navigation-flow/) כוללת NavHost/graph,‏ Back מול Up, deep link עם ID, טעינה ממקור, Activity Result Contract ושחזור צבע אחרי סיבוב. ארבע בדיקות UI עברו באמולטור; בהמשך כדאי להרחיב לקישור HTTPS מאומת, nested graph וזרימה עם כמה משימות | [מעבדת ניווט](/android/topics/10-navigation-flow/), [Activities ו־Intents](/android/projectSteps/013addingActivityToMenu) |
| RecyclerView כרכיב רשימה כללי | **נוספה מעבדת רשימה עם מקור שמור** | [מעבדת RecyclerView](/android/topics/11-recyclerview-diffutil/) מלמדת מיחזור, ID יציב,‏ DiffUtil ושני view types; [מעבדת Room](/android/topics/12-room-persistence/) שומרת את ה־Favorite אחרי סגירת האפליקציה | [מעבדת RecyclerView](/android/topics/11-recyclerview-diffutil/), [מעבדת Room](/android/topics/12-room-persistence/) |
| מסד מקומי מודרני, threading ועסקאות | **נוספה מעבדת Room; נותרה הרחבה** | [מעבדת Room](/android/topics/12-room-persistence/) מלמדת Entity/DAO, מפתח ראשי, Executor, פעולה אטומית ו־migration בדוקה מ־v1 ל־v2. Requery מלמד מידול וקשרים; עדיין צריך לתרגל כשל I/O,‏ JOIN מורכב ומחיקה במסלול Room | [מעבדת Room](/android/topics/12-room-persistence/), [ארבעת שיעורי Requery](/android/sqlite/01.requery-student) |
| Java/OOP מעבר למחלקה וירושה | **נוספה מעבדת חוזים ואוספים; נותר refactoring עצמאי** | [מעבדת שני הקטלוגים](/android/topics/13-java-oop-contracts/) מלמדת interface, מחלקה מופשטת, generics,‏ `equals`/`hashCode`, חריגה ייעודית ו־O(n) מול O(1) בממוצע, עם בדיקות JVM ותוצאה באמולטור. עדיין כדאי להחיל את הבחירה וה־refactoring בפרויקט תלמיד קיים | [מעבדת Java/OOP](/android/topics/13-java-oop-contracts/), [מחשבה ביקורתית על OOP](/android/CollectCircles/04.collect-circles-oop-afterthought) |
| Service,‏ AlarmManager ו־BroadcastReceiver אמיתיים | **נוספה מעבדה מעשית; נותר foreground service** | [מעבדת שירות ו־alarm](/android/topics/14-services-alarms-receivers/) מפעילה bound Service לפי מחזור החיים, alarm לא מדויקת ו־Receiver פרטית, ומבחינה בינן לבין WorkManager ו־exact alarm. נבדקו מסירת האירוע, שמירת המועד וביטול באמולטור; מימוש foreground service נשאר הרחבת מוצר נפרדת | [מעבדת שירות ו־alarm](/android/topics/14-services-alarms-receivers/), [WorkManager ב־CollectCircles](/android/CollectCircles/14.collect-circles-first-worker) |
| הרשאות ו־Activity Result Contracts מקצה לקצה | **נוספה מעבדת contracts; נותר צילום מלא** | [מעבדת הרשאות ותוצאות](/android/topics/15-permission-result-contracts/) מטפלת באישור, סירוב, rationale והצעת הגדרות; מפעילה Photo Picker,‏ OpenDocument ו־TakePicturePreview ללא הרשאות מדיה רחבות. נבדקו סירוב כפול, הודעה אמיתית, ביטול בוררים וצילום preview באמולטור; צילום לקובץ עם FileProvider יופיע במעבדת המדיה | [מעבדת הרשאות ותוצאות](/android/topics/15-permission-result-contracts/), [מדריך הרשאות](/android/alon/13.android_permissions_tutorial_Version2) |
| פרטיות, אחסון סודות ואבטחת APK/תקשורת | **נוספה מעבדת פרטיות; נותר שרת/חשבון אמיתי** | [מעבדת פרטיות](/android/topics/16-privacy-secrets-transport/) מוסיפה מחיקה של Favorite שמורה, מחריגה מסד מגיבוי, מוכיחה שמחרוזת קבועה נראית ב־APK ומבדילה בין HTTPS, מפתח לקוח והרשאת שרת. המחיקה נבדקה אחרי restart; תהליך מחיקת חשבון/מידע בענן דורש מוצר מחובר | [מעבדת פרטיות](/android/topics/16-privacy-secrets-transport/), [ערכים מקומיים ל־FCM](/android/CollectCircles/06.collect-circles-fcm-invitations) |
| Release, חתימה ותחזוקת גרסה | **נוספה מעבדת release; נותר פרסום מוצר אמיתי** | [מעבדת release](/android/topics/17-release-signing-maintenance/) מעלה versionCode/name, מפעילה R8, בונה APK/AAB, מריצה lint ומתקינה APK חתום למעבדה. Favorite נבדקה אחרי restart. חתימת upload, החלפת אייקון, מדיניות פרטיות, Data safety והעלאה למסלול Play נשארים משימות של אפליקציית מוצר | [מעבדת release](/android/topics/17-release-signing-maintenance/), [הכנת שם פרויקט](/android/projectSteps/191renameProject) |
| אפיון, ארכיטקטורה, תיעוד והצגת פרויקט | **נוספה מעבדת תיעוד וראיות; נותר יישום בפרויקט תלמיד** | [מעבדת הצגת פרויקט](/android/topics/18-project-evidence/) מוסיפה לענף Room דרישות מדידות, תרשים אחריות, מודל נתונים, בדיקות מתועדות, צילום והדגמת שלוש דקות עם מגבלה אמיתית. התלמיד עדיין צריך להעביר את התבנית לפרויקט העצמאי שלו | [מעבדת הצגת פרויקט](/android/topics/18-project-evidence/), [מפת האחריות ב־Hex](/android/hex/#architecture) |

### P2 — הרחבות בחירה שכדאי להפוך ממקור משלים למסלול מעשי

| נושא יעד | סטטוס נוכחי | מה חסר כדי להגיע ליעד | נקודת פתיחה קיימת |
|---:|:---:|---:|---:|
| מצלמה, גלריה ואחסון תחום | **נוספה מעבדה מעשית; נותר MediaStore** | [מעבדת המצלמה](/android/topics/19-camera-gallery-storage/) משלבת Photo Picker, צילום מלא דרך FileProvider,‏ URI,‏ EXIF, שמירה/מחיקה ובדיקת restart. פרסום קבוע בגלריה דרך MediaStore נשאר הרחבת מוצר | [מעבדת המצלמה](/android/topics/19-camera-gallery-storage/), [אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |
| מיקום ומפות | **נוספה מעבדה מעשית; נותר יישום מפה משולבת** | [מעבדת המיקום](/android/topics/20-location-maps/) מבקשת coarse לפני fine, בודקת דיוק בפועל, מבטלת בקשה ב־onStop ומעבירה נקודה למפה רק בלחיצה. מפה בתוך האפליקציה, fused provider ו־fallback למבנים נשארים הרחבת מוצר | [מעבדת המיקום](/android/topics/20-location-maps/), [מפגשי Android](/android/zeev/meetings) |
| חיישנים | **נוספה מעבדת מד תאוצה; נותר חיישן נוסף** | [מעבדת ההטיה](/android/topics/21-sensors-tilt/) מודדת X/Y/Z ביחידות, מסננת רעש, מציגה זווית וקצב, מסירה listener ב־onPause ונבדקה בחיישן וירטואלי. בחירת חיישן אחר לפרויקט עדיין דורשת בדיקה עצמאית | [מעבדת ההטיה](/android/topics/21-sensors-tilt/), [מפגש Sensors](/android/zeev/meetings#id-meeting-2-sensors) |
| מדיה, מיקרופון ודיבור | **נוספה מעבדת TTS/STT; נותרת הקלטה עצמית** | [מעבדת הדיבור](/android/topics/22-media-speech/) מטפלת ב־audio focus, שחרור TTS ב־lifecycle, הכתבה באפליקציה חיצונית וביטול. `RECORD_AUDIO` ו־MediaRecorder נדרשים רק אם פרויקט שומר קול בעצמו | [מעבדת הדיבור](/android/topics/22-media-speech/), [אינדקס AppSchool](/android/asaf/001asafAndroidChapters) |
| Bluetooth ו־NFC | **נוסף מסלול NFC; נותרת בדיקת חומרה** | [מעבדת תג הכיתה](/android/topics/23-nfc-classroom-tag/) בודקת יכולת מכשיר, Reader Mode, קריאת NDEF, I/O וכשלי תוכן; parser נבדק באמולטור, אך קריאת רדיו דורשת טלפון ותג. Bluetooth נשאר בחירה לפרויקט שבו צריך חיבור מתמשך | [מעבדת תג NFC](/android/topics/23-nfc-classroom-tag/) |
| Jetpack Compose כמערכת UI | **נוספה מעבדה מלאה; נותר חיבור לנתונים אמיתיים** | [מעבדת Compose](/android/topics/24-compose-ui-system/) מלמדת state/recomposition,‏ layouts,‏ LazyColumn, ניווט, Java/Views interop ובדיקת UI עם recreate. ה־Favorite המקומי עדיין צריך חיבור ל־Room/ViewModel במוצר | [מעבדת Compose](/android/topics/24-compose-ui-system/), [הוספת Compose לפרויקט Java/XML](/android/projectSteps/192supportJetPackCompose) |
| Paging, cache ו־offline-first | **נוספה מעבדת פגינציה ידנית; נותר Paging 3** | [מעבדת העמודים](/android/topics/25-paging-offline-cache/) משלבת API,‏ Room כמקור תצוגה,‏ TTL, מצב offline ונתון ישן אחרי HTTP 503 שנבדק. `Pager`/`RemoteMediator` וניהול cursor ברשימות גדולות נשארים הרחבה | [מעבדת API ו־cache](/android/topics/25-paging-offline-cache/), [Interactions API](/android/unsorted/LLM-using-google-interactions-api) |
| ContentProvider ו־SurfaceView | **נוספה מעבדת SurfaceView; ContentProvider נשאר מסלול בחירה** | [מעבדת המשחק](/android/topics/26-surfaceview-specialization/) משתמשת ב־SurfaceView לציור רציף עם בדיקת Pause/Resume, ומשווה לציור View רגיל. ContentProvider מוסבר כחוזה בין אפליקציות וימומש רק בפרויקט שיש לו צרכן חיצוני אמיתי | [מעבדת SurfaceView ובחירת רכיב](/android/topics/26-surfaceview-specialization/) |

<details markdown="1">
<summary><strong>כיול מול מחוון ההערכה החיצוני</strong></summary>

[מחוון משרד החינוך לחלופת טלפונים חכמים, תשפ"ו](https://meyda.education.gov.il/files/CSIT/smartphonesProject-5.pdf) מחזק כמה מן העדיפויות: אפליקציה עובדת מקצה לקצה; ממשק אינטראקטיבי ורב־מסכי; אירועים והרשאות בזמן ריצה; מסד נתונים עם קריאה וכתיבה; בחירה בנושאים מתקדמים; תכנון מונחה עצמים, מבני נתונים, ארכיטקטורה, תיעוד ושליטה של התלמיד בקוד ובנתונים.

המחוון מונה בין אפשרויות ההרחבה WorkManager,‏ API,‏ Service משמעותי, קשרי מסד ו־JOIN,‏ RecyclerView,‏ AI,‏ AlarmManager והתראות,‏ ActivityResultContract, ציור מותאם, מיקום/מפות, רשת, חיישנים, ריבוי משתמשים בזמן אמת,‏ BroadcastReceiver,‏ SharedPreferences ומצלמה/גלריה. חלקן כבר מכוסות היטב באתר, במיוחד WorkManager,‏ Requery,‏ Canvas,‏ Firebase בזמן אמת והתראות; אחרות מופיעות בטבלאות הפערים לעיל.

עם זאת, רשימת APIs במחוון אינה מחליפה שיקול פדגוגי ועדכני. למשל `AsyncTask` מיושן, ו־ContentProvider או Service אינם יעד בפני עצמם אם אין להם תפקיד אמיתי. עדיף תלמיד שמבין state, אבטחה, lifecycle ובדיקות ומיישם שתי הרחבות רלוונטיות לעומק, מתלמיד שאוסף שמות רכיבים בלי להבין את מגבלותיהם.

</details>

### עדכון Connect4: גבולות הכיסוי

המסלול מוסיף [בדיקות מורה מתועדות](/android/Connect4/teaching-plan/#validation) למנוע, מחזור חיים ותחרות ב־Firebase emulators. זו תשתית קבלה והדגמה, ולא תחליף לשיעור שבו תלמיד מתכנן וכותב סוויטה בעצמו. [כללי החדרים והמהלכים](/android/Connect4/11.connect4-online-game/) מלמדים הרשאות UID, תור והוספה בלבד; אינם שרת סמכותי שמחשב בעצמו את כל חוקי המשחק. שילוב היריב המסופק אינו סוגר פערי הוראה באימון ML או במימוש MCTS.
