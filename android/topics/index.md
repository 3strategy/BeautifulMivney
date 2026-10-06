---
layout: page
title: "נושאי Android — מעבדות קצרות לפי פערי הלימוד"
subtitle: "מעבדות קצרות עם בסיס קוד ודיפ ברור לכל נושא"
permalink: /android/topics/
lang: he
full-width: true
tags: [Android, Java, topics]
---

{: .box-note}
אלה שיעורי העמקה לפרויקט `com.example.topics`. ענפי המעבדות מבוססים על Empty Views Activity עם Java,‏ XML ו־View Binding. מי שמתחילים מתבנית חדשה ילמדו להפעיל View Binding בתחילת [מעבדת הפתיחה על שמירת מצב]({{ '/android/topics/01-lifecycle-state/' | relative_url }}). רוב המעבדות מתחילות מבסיס `master`; כשהנושא הוא refactoring של מעבדה קודמת, בסיס ההשוואה מופיע בטבלה. קראו את בסיס ההשוואה לפני שמעתיקים שינויי קוד.

## איך לומדים מהקוד, לא רק מעתיקים אותו?

בכל מעבדה עברו על אותו רצף: נבאו תוצאה, קראו את זרימת הנתונים, כתבו את השינוי, ובדקו את התחזית. `/** ... */` לפני מתודה היא Javadoc: היא מתארת את החוזה למי שקורא למתודה. `@param` אומר מה מותר למסור, `@return` מה נקבל, ו־`@throws` איזה כשל צפוי. הערת `//` בתוך גוף מתארת החלטת מימוש חשובה, למשל למה תוצאה ישנה נפסלת. אל תכתבו הערה שרק מתרגמת `count++` למילים.

מעל `@Override` של `onCreate` בתבנית שלכם הוסיפו את התיעוד הבא כבר במעבדה הראשונה שתבצעו. השאירו אותו במעבדות המשך; אין צורך לשנות אותו רק משום שמצב המסך עבר ל־ViewModel. `savedInstanceState` הוא פרמטר של callback המערכת, גם כאשר המעבדה המסוימת אינה שומרת בו נתון משלה.

```java
    /**
     * Creates the current Activity View tree and connects the screen's actions.
     *
     * @param savedInstanceState prior small UI snapshot, or null for a fresh launch
     */
```

במעבדות ארוכות יש "קוד משלים במלואו" בתוך `<details>`. זהו חלק מן השיעור, עם כל התיעוד וההערות. בקריאה ישירה של Markdown, פתחו גם את קובצי `code/NN/*.md` המקושרים בה; אין צורך להמתין לפרסום האתר או להעתיק מפרויקט דוגמה אחר. קובץ קיים מוצג כשינוי ממוקד, וקובץ חדש במלואו. השאירו תשתית תבנית שלא נדרשת לשינוי.

## בוחרים מכשיר לפני התקנה ובדיקה

לכל ענפי המעבדות יש אותו `applicationId`:‏ `com.example.topics`. התקנת ענף אחר על אותו מכשיר מעדכנת את אותה אפליקציה; זו אינה אפליקציה נפרדת לכל מעבדה. לכן בוחרים אמולטור למעבדה ומוודאים את שמו לפני התקנה. בדיקת instrumentation מתקינה גם APK נוסף של הבדיקות, ויכולה לשנות את נתוני האפליקציה כחלק מן התרחיש.

ב־Android Studio בחרו את האמולטור ברשימת המכשירים של תצורת ההרצה. בשורת הפקודה, `:app:connectedDebugAndroidTest` אינו בחירה בשם של אמולטור יחיד. כשמחוברים כמה מכשירים, השתמשו במסלול המפורש הבא מתוך שורש הפרויקט. `adb` זמין בתיקיית `platform-tools` של Android SDK; פתחו טרמינל שבו התיקייה נמצאת ב־PATH. החליפו **בכל** פקודה את `emulator-5562` במספר הסידורי שמופיע אצלכם ב־`adb devices -l`:

```powershell
adb devices -l
.\gradlew.bat :app:assembleDebug :app:assembleDebugAndroidTest
adb -s emulator-5562 install -r app/build/outputs/apk/debug/app-debug.apk
adb -s emulator-5562 install -r app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk
adb -s emulator-5562 shell am instrument -w com.example.topics.test/androidx.test.runner.AndroidJUnitRunner
```

`-s` בוחר מכשיר, `-r` מבקש התקנה מעל גרסה קיימת ו־`-w` מחכה לסיום הבדיקות כדי להציג את התוצאה. ההתקנה אינה הבטחה לשמירת נתונים: הבדיקות עצמן עשויות לנקות אותם. כאן Gradle **בונה** את שני הקבצים, ו־ADB **מתקין ומריץ** רק על המכשיר שנבחר בכל פקודה. בחירת serial בתהליך PowerShell אחד אינה עוברת אוטומטית לתהליך חדש. לתיק הראיות שמרו גם את ה־serial, גרסת Android והפלט; שם ענף לבדו אינו אומר היכן נבדק הקוד. ראו [בחירת מכשיר ב־ADB](https://developer.android.com/tools/adb#directingcommands) ו־[הרצת instrumentation משורת הפקודה](https://developer.android.com/studio/test/command-line#RunTestsDevice).

## פתיחת הפרויקט ומעבר לענף של מעבדה

אחרי שכפול מלא (clone) של הפרויקט, פתחו את חלון **Git** ואת לשונית **Log** ב־Android Studio. תצוגת היומן מציגה את היסטוריית הפרויקט ואת הענפים השונים; ליד כל commit מופיעים הסימונים של הענפים שמצביעים עליו. לכן ייתכן שתראו הרבה שורות וחיבורים בין ענפים — זה צפוי.

![יומן Git אחרי שכפול מלא, עם היסטוריית הענפים וה־commits]({{ '/assets/img/android/topics/git-log-full-clone.png' | relative_url }})

כדי לעבור לענף התוצאה של מעבדה, מצאו ביומן commit שמסומן בשם הענף המבוקש, למשל `codex/location-maps`. לחצו עליו עם הכפתור הימני, פתחו **Checkout**, ובתפריט המשנה בחרו את שם הענף. בתמונה הענף נבחר דרך **Checkout > codex/location-maps**.

![בחירת Checkout לענף מתוך תפריט ה־commit]({{ '/assets/img/android/topics/checkout-branch-menu.png' | relative_url }})

אחרי המעבר, Android Studio מסמן את ה־commit הנוכחי של הענף. בדוגמה, הסימון הירוק מופיע לצד `Guard location callbacks across lifecycle changes`.

![ה־commit הנוכחי אחרי המעבר לענף]({{ '/assets/img/android/topics/after-checkout.png' | relative_url }})

כדי לצמצם את היומן לענף אחד, פתחו את מסנן **Branch** בסרגל העליון ובחרו `codex/location-maps`. הכותרת `Branch: codex/location-maps` מציינת שהיומן מסונן, וברשימה נשארת ההיסטוריה שמגיעה דרך הענף הזה.

![יומן Git לאחר סינון לענף codex/location-maps]({{ '/assets/img/android/topics/filter-branch.png' | relative_url }})

כדי לחזור לתצוגת היומן המלאה, לחצו על **×** שליד `Branch: codex/location-maps`. הפעולה מבטלת את המסנן ומחזירה את כל היסטוריית הענפים לתצוגה; היא לא מעבירה אתכם לענף אחר.

![ביטול מסנן הענף באמצעות ×]({{ '/assets/img/android/topics/clear-branch-filter.png' | relative_url }})

| נושא | בסיס להשוואה | ענף תוצאה | מה בודקים |
|---:|:---|:---|---:|
| [01 — מה נשמר אחרי סיבוב, הריגת תהליך והחלפת View?]({{ '/android/topics/01-lifecycle-state/' | relative_url }}) | `master` | `codex/lifecycle-state` | שדה, `Bundle`,‏ `SharedPreferences` ומחזור חיי View של Fragment |
| [02 — מסך שאפשר לקרוא, לגעת ולתרגם]({{ '/android/topics/02-accessibility-adaptive-localization/' | relative_url }}) | `master` | `codex/accessibility-adaptive` | קורא מסך, יעד מגע, גופן/מסך, רבים ועברית RTL |
| [03 — כל מצבי המסך ורגע ה־Retry]({{ '/android/topics/03-ui-states-retry/' | relative_url }}) | `master` | `codex/ui-states-retry` | טעינה, ריק, שגיאה, הצלחה, לחיצה כפולה ושחזור |
| [04 — מי מחזיק את מצב המסך?]({{ '/android/topics/04-viewmodel-repository/' | relative_url }}) | `codex/ui-states-retry` | `codex/viewmodel-repository` | ViewModel,‏ Repository,‏ LiveData וסיבוב בזמן טעינה |
| [05 — בדיקה שמגלה נסיגה אמיתית]({{ '/android/topics/05-android-ui-tests/' | relative_url }}) | `codex/lifecycle-state` | `codex/android-ui-tests` | Espresso,‏ ActivityScenario, סיבוב וניסוי אדום־ירוק |
| [06 — מאתרים תקלה לפי ראיות]({{ '/android/topics/06-systematic-debugging/' | relative_url }}) | `master` | `codex/debugging-lab` | Build,‏ Logcat,‏ debugger,‏ Layout Inspector ו־Network Inspector |
| [07 — מי באמת רשאי לקרוא ולכתוב?]({{ '/android/topics/07-rtdb-security-rules/' | relative_url }}) | `master` | `codex/rtdb-security-rules` | כללי RTDB מול בעלים, משתמש אחר ואורח באמולטור |
| [08 — מבקשת HTTP למודל Java]({{ '/android/topics/08-http-client/' | relative_url }}) | `master` | `codex/http-client` | Retrofit,‏ JSON טיפוסי,‏ 200/404, ביטול ו־MockWebServer |
| [09 — כשהתשובה הישנה מגיעה אחרונה]({{ '/android/topics/09-async-races/' | relative_url }}) | `codex/viewmodel-repository` | `codex/async-races` | Executor, ביטול, דור בקשה וסיבוב בזמן עבודה |
| [10 — כניסה, חזרה ותוצאה בין מסכים]({{ '/android/topics/10-navigation-flow/' | relative_url }}) | `master` | `codex/navigation-flow` | Navigation Component,‏ Back/Up, קישור ישיר ו־Activity Result Contract |
| [11 — רשימה שממחזרת Views בלי לאבד מצב]({{ '/android/topics/11-recyclerview-diffutil/' | relative_url }}) | `codex/viewmodel-repository` | `codex/recyclerview-diffutil` | שני סוגי שורות, זהות,‏ DiffUtil ו־Favorite אחרי גלילה ושחזור |
| [12 — Favorite שנשמר גם אחרי סגירת האפליקציה]({{ '/android/topics/12-room-persistence/' | relative_url }}) | `codex/recyclerview-diffutil` | `codex/room-persistence` | Room,‏ DAO, עבודה ברקע, transaction ו־migration של נתון קיים |
| [13 — אותו חוזה, שני מבני נתונים]({{ '/android/topics/13-java-oop-contracts/' | relative_url }}) | `master` | `codex/java-oop-contracts` | interface,‏ abstract,‏ generics,‏ equals/hashCode, חריגות ועלות חיפוש |
| [14 — מי עובד כשהמסך איננו?]({{ '/android/topics/14-services-alarms-receivers/' | relative_url }}) | `master` | `codex/services-alarms-receivers` | bound Service, alarm לא מדויק, Receiver וגבולות WorkManager |
| [15 — רשות לבחור, רשות לסרב]({{ '/android/topics/15-permission-result-contracts/' | relative_url }}) | `master` | `codex/permission-contracts` | הרשאת התראות, סירוב/הסבר/הגדרות ו־contracts לתמונה, מסמך ומצלמה |
| [16 — מה נשמר, מה עובר, ומה גלוי ב־APK?]({{ '/android/topics/16-privacy-secrets-transport/' | relative_url }}) | `codex/room-persistence` | `codex/privacy-data-control` | מחיקת נתון שמור, backup, סודות ב־APK,‏ HTTPS ו־logs |
| [17 — האם גרסת Release באמת עובדת?]({{ '/android/topics/17-release-signing-maintenance/' | relative_url }}) | `codex/room-persistence` | `codex/release-build` | versionCode,‏ R8, חתימה מקומית, בדיקת APK והכנה ל־Play |
| [18 — מציגים פרויקט באמצעות ראיות]({{ '/android/topics/18-project-evidence/' | relative_url }}) | `codex/room-persistence` | `codex/project-evidence` | דרישות, תרשים רכיבים, בדיקות, צילום והדגמה קצרה |
| [19 — צילום מלא, בחירת תמונה ואחסון תחום]({{ '/android/topics/19-camera-gallery-storage/' | relative_url }}) | `codex/permission-contracts` | `codex/camera-gallery-storage` | FileProvider,‏ TakePicture,‏ EXIF, שמירה ומחיקה |
| [20 — מיקום מדורג ומעבר למפה]({{ '/android/topics/20-location-maps/' | relative_url }}) | `master` | `codex/location-maps` | coarse/fine,‏ getCurrentLocation, ביטול ב־lifecycle ו־geo intent |
| [21 — חיישן תאוצה שהופך להטיה]({{ '/android/topics/21-sensors-tilt/' | relative_url }}) | `master` | `codex/sensors-tilt` | צירים, יחידות, low-pass, קצב דגימה ורישום ב־onResume/onPause |
| [22 — טקסט שנאמר וקול שמוכתב]({{ '/android/topics/22-media-speech/' | relative_url }}) | `master` | `codex/media-speech` | TTS,‏ audio focus,‏ RecognizerIntent ומשאבים ב־lifecycle |
| [23 — תג NFC של תחנת כיתה]({{ '/android/topics/23-nfc-classroom-tag/' | relative_url }}) | `master` | `codex/nfc-classroom-tag` | Reader Mode,‏ NDEF, תיקוף תוכן וכשל תקשורת |
| [24 — Compose כמערכת ממשק מלאה]({{ '/android/topics/24-compose-ui-system/' | relative_url }}) | `master` | `codex/compose-ui-system` | state,‏ LazyColumn, ניווט, Views interop ובדיקת UI |
| [25 — עמודים שנשארים גם בלי רשת]({{ '/android/topics/25-paging-offline-cache/' | relative_url }}) | `codex/http-client` | `codex/paging-offline-cache` | API מדורג, Room cache,‏ TTL,‏ offline וכשל עם נתון ישן |
| [26 — מתי צריך SurfaceView או ContentProvider?]({{ '/android/topics/26-surfaceview-specialization/' | relative_url }}) | `master` | `codex/surfaceview-game-loop` | לולאת ציור, שרשור ומחזור חיי Surface; גבול ContentProvider |

למפת הכיסוי הרחבה: [איפה לומדים כל נושא ב־Android]({{ '/android/topics-index' | relative_url }}). לתעדוף ההשלמות: [מפת היעד והפערים]({{ '/android/not-yet-covered' | relative_url }}).
