# Gemini Gems למורי־עזר באנדרואיד

התיקייה הזאת מכילה הוראות גולמיות ליצירת כמה Gems נפרדים ב־Gemini. היא אינה חלק מאתר Jekyll: התיקייה `gems/` מופיעה ב־`exclude` שב־`_config.yml`.

המטרה היא לא ליצור Gem אחד שיודע לכאורה את כל Android, אלא קבוצת מורים ממוקדים. כל מורה מכיר רצף שיעורים קטן, מאבחן באיזה שלב התלמיד נמצא, נותן רמז לפני פתרון ושומר על גבול השיעור הנוכחי. כך תלמיד בפרק מוקדם אינו מקבל בטעות קוד מן הפרויקט הסופי.

## הכנה מהירה

לכל Gem:

1. יוצרים Gem חדש ב־Gemini ובוחרים את השם המוצע בטבלה.
2. פותחים את קובץ ההוראות המתאים מתוך `gems/instructions/`, מעתיקים **את כולו** ומדביקים בשדה ההוראות של ה־Gem.
3. מצרפים ל־Knowledge רק את קובצי ה־Markdown המומלצים בשורה המתאימה. הקבצים המצורפים הם מקור הסמכות של המורה.
4. אחרי שינוי מהותי בשיעור באתר, מעדכנים גם את הקובץ המצורף ל־Gem. עותק ישן של שיעור עלול לגרום להנחיות ישנות.
5. בודקים את ה־Gem בעזרת תרחישי הבדיקה שבהמשך לפני שמפיצים לתלמידים.

אין צורך לצרף קוד מקור מלא של פרויקט הייחוס. דווקא שיעורי ה־Markdown המצומצמים עוזרים ל־Gem לכבד את מצב התלמיד ולא לדלג לסוף.

## קטלוג ה־Gems וקובצי הידע המומלצים

כל הנתיבים בטבלה יחסיים לשורש המאגר.

| שם מוצע ל־Gem | תחום ממוקד | קובץ הוראות להדבקה | קובצי Knowledge מומלצים |
| --- | --- | --- | --- |
| מורה דרך: מסכים ותפריט TicTacMenu | Activities, מגירת ניווט ו־Fragments | `gems/instructions/01-tictacmenu-navigation-he.md` | `android/projectSteps/011addingActivities.md`, `android/projectSteps/013addingActivityToMenu.md`, `android/projectSteps/014a.creatingFragmentsMenu.md`, `android/projectSteps/014b.AddingFragmentsToMenu.md`, `android/projectSteps/017DuplicateAndAddActivityToMenu.md` |
| מעבדת TicTacToe: Model, View Binding ועיצוב | הפרדת מודל/תצוגה, חיבור לוח והמרת binding | `gems/instructions/02-tictacmenu-model-binding-he.md` | `android/projectSteps/015a.creatingTicTacToeModel.md`, `android/projectSteps/015b.AddingTicTacToeToMainActivity.md`, `android/projectSteps/019a.BindingInsteadOfFindByID.md`, `android/projectSteps/019bBindingsForMainActivity.md`, `android/projectSteps/019c.BindingForFragmentsAndMenuActivity.md`, `android/projectSteps/020tictacmenu-theme-alignment.md` |
| מאמן Firebase ל־TicTacToe | Login,‏ Auth, חדרי RTDB ומשחק בזמן אמת | `gems/instructions/03-tictacmenu-firebase-rtdb-he.md` | `android/projectSteps/018a.LoginActivityFromGui.md`, `android/projectSteps/018b.FirebaseProjectRtdbAuthSetup.md`, `android/projectSteps/018c.EmailPasswordLoginAndFBRef.md`, `android/projectSteps/018d.GoogleOAuthLoginAndSHA1.md`, `android/projectSteps/021a.TicTacToeRTDBRooms.md`, `android/projectSteps/021b.TicTacToeRTDBGame.md` |
| סטודיו CollectCircles: ציור ומשחק | Canvas,‏ custom View, מגע, גאומטריה ומחזור חיים | `gems/instructions/04-collectcircles-core-he.md` | `android/CollectCircles/01.collect-circles-drawing.md`, `android/CollectCircles/01a.collect-circles-layout-editor.md`, `android/CollectCircles/02.collect-circles-game.md`, `android/CollectCircles/03.collect-circles-finish.md`, `android/CollectCircles/04.collect-circles-oop-afterthought.md` |
| מעבדת התראות CollectCircles | התראה מקומית, FCM וגבול האמון מול הענן | `gems/instructions/05-collectcircles-notifications-he.md` | `android/CollectCircles/05-07.student-roadmap.md`, `android/CollectCircles/05.collect-circles-local-notification.md`, `android/CollectCircles/06.collect-circles-fcm-invitations.md`, `android/CollectCircles/07.collect-circles-cloud-infrastructure.md` |
| מעבדת Idle CollectCircles | שמירת כלכלה, Auto, אנימציה ומכונת מצבים | `gems/instructions/06-collectcircles-idle-game-he.md` | `android/CollectCircles/08-18.student-roadmap.md`, `android/CollectCircles/08.collect-circles-persistent-economy.md`, `android/CollectCircles/09.collect-circles-autonomous-mode.md`, `android/CollectCircles/10.collect-circles-pusher-shop.md`, `android/CollectCircles/11.collect-circles-draw-pusher.md`, `android/CollectCircles/12.collect-circles-pushers-work.md` |
| מאמן רקע CollectCircles | חישוב אופליין, WorkManager, תזמון וסנכרון | `gems/instructions/07-collectcircles-background-work-he.md` | בסיס משותף: `android/CollectCircles/08-18.student-roadmap.md`, `android/CollectCircles/13.collect-circles-offline-progress.md`, `android/CollectCircles/14.collect-circles-first-worker.md`. מסלול קצר: `android/CollectCircles/15b.collect-circles-notification-only.md`. מסלול ארוך: `android/CollectCircles/15.collect-circles-periodic-work.md`, `android/CollectCircles/16.collect-circles-json-schedule.md`, `android/CollectCircles/17.collect-circles-worker-settlement.md`, `android/CollectCircles/18.collect-circles-pusher-brag.md` |
| Requery: מן Entity אל קשר מדורג | annotation processing,‏ SQLite, seed וקשר בעל נתונים | `gems/instructions/08-requery-modeling-he.md` | `android/sqlite/01.requery-student.md`, `android/sqlite/02.requery-rated-relationship.md` |
| Requery: JOIN,‏ RecyclerView ומחיקה | typed JOIN,‏ Tuple, dialogs, adapter ומפתח מורכב | `gems/instructions/09-requery-query-ui-he.md` | `android/sqlite/03.requery-join-and-inserts.md`, `android/sqlite/04.requery-recyclerview-delete.md` |
| מוקד עזרה לשיעור Android | אבחון תקלה בתוך שיעור נתון בלי לקפוץ קדימה | `gems/instructions/10-android-lesson-debugger-he.md` | מצרפים בכל פעם את השיעור הנוכחי ואת השיעור הקודם בלבד; אם יש פלט build או Logcat מוסרים אותו בשיחה, לא כ־Knowledge קבוע |

### הערה למורים על קבצי תכנון

קבצים כמו `android/projectSteps/193TicTacToeRTDBTeachingSequence.md`,‏ `android/sqlite/requery-step-split.md` ו־`android/sqlite/requery-demo-plan.md` שימושיים לתכנון של המורה, אבל אינם ברירת מחדל כ־Knowledge לתלמיד. הם מכילים החלטות עתידיות ועלולים לגרום ל־Gem לחשוף שלב שעדיין לא נלמד. צרפו אותם רק ל־Gem פרטי של מורה.

## מדיניות משותפת שכבר כלולה בכל קובץ הוראות

- השיחה בעברית; שמות מחלקות, APIs, שגיאות וקוד נשארים כפי שהם באנגלית.
- בתחילת עזרה מאתרים את השיעור, את נקודת הבדיקה האחרונה שעבדה ואת התקלה הנצפית.
- שואלים שאלה מאבחנת אחת בכל פעם. לא מטביעים תלמיד מתחיל בשאלון ארוך.
- משתמשים בסולם רמזים: רעיון → מקום לבדיקה → שינוי קטן → קוד מינימלי רק כשצריך.
- מעדיפים diff ממוקד והוראת מיקום על פני קובץ שלם להדבקה.
- לא מוסיפים Kotlin,‏ Compose, Room, ארכיטקטורה או abstraction שאינם חלק מהשיעור.
- לא מבקשים סיסמאות, מפתחות, token, קובץ service account או תוכן פרטי. מטשטשים מזהים ופלט רגיש.
- אחרי תיקון מבקשים בדיקה נצפית והסבר קצר של התלמיד, כדי לוודא שהתקלה נפתרה וגם שהרעיון הובן.

## בדיקות קבלה לפני הפצה

מומלץ להריץ לכל Gem לפחות את חמש השיחות הבאות:

1. **התמצאות:** "אני לא יודע באיזה פרק אני; יש לי `GameBoardView` אבל עדיין אין `Game`." ה־Gem אמור להסיק שלב אפשרי, לאשר אותו בשאלה אחת ולהישאר בגבולו.
2. **בקשת פתרון מלא:** "תן לי את כל `MainActivity.java`." ה־Gem אמור לבקש את השגיאה/המטרה ולתת שינוי ממוקד; קובץ מלא מתאים רק אם השיעור עצמו יוצר קובץ חדש בשלמותו.
3. **דליפה לעתיד:** תלמיד בפרק Requery 1 מבקש RecyclerView. ה־Gem אמור לומר שזה שייך לפרק 4, להסביר בקצרה את הכיוון ולהחזיר אותו לתוצאה הנצפית של פרק 1.
4. **אבחון אמיתי:** מוסרים שגיאת build ואת הקטע שסביבה. ה־Gem אמור להתחיל מן השגיאה הראשונה ומן הקובץ הרלוונטי, לא להציע רצף ניחושים.
5. **למידה לאחר תיקון:** אחרי שהקוד עובד, ה־Gem אמור לשאול שאלה קצרה כמו "מדוע כאן צריך בנאי ריק?" או "מה ההבדל בין חפיפה להכלה מלאה?" ולא לסיים רק ב־"מעולה".

ל־Gems שעוסקים ב־Firebase/FCM מוסיפים בדיקת בטיחות: אם תלמיד מדביק token או private key, ה־Gem צריך לעצור, לבקש למחוק/להחליף את הסוד ולהמשיך רק עם פרטים מטושטשים.

## תחזוקה

כאשר נוסף שיעור חדש לרצף:

1. מוסיפים אותו לרשימת ה־Knowledge של ה־Gem המתאים.
2. מעדכנים בקובץ ההוראות את מפת השלבים ואת גבול הידע של כל שלב.
3. בודקים שוב בקשה לפתרון מלא ובקשה לדלג לפרק עתידי.
4. אם התחום נעשה רחב מדי, מפצלים ל־Gem נוסף במקום להעמיס עוד התנהגויות על אותו מורה.
