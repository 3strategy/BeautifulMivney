---
layout: page
title: "Android topics — 17: האם גרסת Release באמת עובדת?"
subtitle: "versionCode, חתימה, R8, בדיקת APK מותקן והכנה להפצה"
permalink: /android/topics/17-release-signing-maintenance/
lang: he
full-width: true
tags: [Android, Java, release, signing, R8, Play Console]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [Favorite שנשמר ב־Room]({{ '/android/topics/12-room-persistence/' | relative_url }}) · [פרטיות ו־APK]({{ '/android/topics/16-privacy-secrets-transport/' | relative_url }})

{: .box-success}
בסוף המעבדה נוצרות גרסאות APK ו־AAB של `release` עם `versionCode=2`,‏ `versionName=1.1` ואופטימיזציית R8. בודקים APK חתום במכשיר: מסך הספרים נפתח, אפשר לשמור Favorite, והוא נשאר אחרי סיום התהליך. הקוד בענף אינו מכיל מפתח חתימה או סיסמה.

בסיס ההשוואה הוא **`codex/room-persistence`**, שבו מסד Room בגרסה 2 ורשימת הספרים כבר עובדים. ענף התוצאה הוא **`codex/release-build`**. כך בדיקת ה־release כוללת רכיב שעשוי להישבר בגלל אופטימיזציה או חתימה, ולא רק מסך `Hello World!`. זו מעבדת הכנה; היא אינה מפרסמת אפליקציה לחנות.

## 1. מה ההבדל בין debug ל־release?

| שאלה | `debug` | `release` במעבדה |
|---:|---:|---:|
| מי חותם אוטומטית? | מפתח debug מקומי | `assembleRelease` מוציא APK לא חתום; לחתימה אמיתית נדרש מפתח מתאים |
| אופטימיזציה | כבויה בבסיס | R8 מקטין ומייעל קוד ומשאבים |
| בדיקה לפני מסירה | נוח להרצה מה־IDE | בונים, חותמים, **מתקינים** ובודקים את הארטיפקט שיימסר |
| תפקיד מספר הגרסה | מזהה חבילה מותקנת | עדכון דורש `versionCode` גבוה מהגרסה הקודמת |

חתימה היא חלק ממנגנון העדכון של Android: APK חדש עם אותו `applicationId` אך מפתח חתימה אחר לא יוכל להחליף התקנה קיימת בלי הסרה, והסרה מוחקת את נתוני האפליקציה המקומיים. [תיעוד חתימת Android](https://developer.android.com/studio/publish/app-signing) מבדיל בין מפתח חתימת האפליקציה ומפתח ההעלאה כשמשתמשים ב־Play App Signing. `versionName` הוא תווית קריאה לאדם; `versionCode` הוא המספר העולה ש־Android/Play משתמשים בו להשוואת גרסאות. [תיעוד versioning](https://developer.android.com/studio/publish/versioning) מפרט זאת.

## 2. מעדכנים גרסה ומפעילים אופטימיזציה

ב־**Gradle Scripts > build.gradle.kts (Module :app)** שנו רק את שורות הגרסה בתוך `defaultConfig`:

{% code_diff %}
     defaultConfig {
         applicationId = "com.example.topics"
         minSdk = 31
         targetSdk = 37
-        versionCode = 1
-        versionName = "1.0"
+        versionCode = 2
+        versionName = "1.1"
         ⁞
     }
{% endcode_diff %}

זהו מספר דוגמה לענף הלימודי. בפרויקט שכבר פורסם בחרו מספר גבוה מכל `versionCode` קיים בחנות; אל תעתיקו 2 בלי לבדוק את היסטוריית הגרסאות. עכשיו הפעילו R8 ב־build type של release:

{% code_diff %}
     buildTypes {
         release {
             optimization {
-                enable = false
+                enable = true
             }
         }
     }
{% endcode_diff %}

ב־AGP 9.4 של הפרויקט, `optimization.enable` מפעיל אופטימיזציית קוד ומשאבים. זהו DSL עדכני יותר מן הצמד הישן `isMinifyEnabled`/`isShrinkResources`; אל תערבבו כמה דרכי הגדרה בלי להבין את התוצאה. אם בדיקת release מגלה ש־reflection או serialization נשברו, קראו את הכשל והוסיפו keep rule *ממוקד* לקוד שצריך אותה, במקום לכבות אופטימיזציה לכל האפליקציה. [תיעוד R8 והגדרות AGP](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) מסביר את ההבדלים.

ב־**app > res > values > strings.xml** שנו `app_name` מ־`topics` ל־`Topics Lab`, כדי ששם האפליקציה המותקנת יהיה קריא. זה אינו תחליף לאייקון מוצר: ענף המעבדה עדיין משתמש באייקון התבנית.

## 3. שומרים מפתחות מקומית, לא בענף

בקובץ `.gitignore` של שורש הפרויקט הוסיפו:

```gitignore
*.jks
*.keystore
signing.properties
```

אלו רשתות ביטחון בלבד: קובץ שכבר נכנס ל־Git אינו נעלם משום שהוספנו pattern, וסיסמה יכולה להופיע גם בשם קובץ אחר או בלוג. שמרו מפתח העלאה וסיסמאות במיקום פרטי/מנהל סודות מחוץ ל־repository, עם גיבוי בטוח למפתח. `local.properties` כבר מוחרג בבסיס הפרויקט, אבל ערך שמוזרק משם לתוך APK עדיין אינו סוד עבור מקבל ה־APK; ראו [מעבדת פרטיות]({{ '/android/topics/16-privacy-secrets-transport/' | relative_url }}).

לצורך פרסום, ב־Android Studio בחרו **Build > Generate Signed Bundle / APK**. צרו או בחרו keystore מקומי, בחרו `release`, והפיקו **Android App Bundle** להעלאה ל־Google Play לפי [מדריך החתימה הרשמי](https://developer.android.com/studio/publish/app-signing). מפתח ההעלאה אינו מפתח debug. אסור למסור מפתח פרטי, סיסמה או קובץ keystore כחלק מקוד התלמידים.

לבדיקת אמולטור בלבד אפשר לחתום על APK ה־release עם **אותו מפתח debug** שכבר חתם על גרסה 1 המותקנת. כך עדכון מ־`versionCode=1` ל־2 יכול לשמר את `favorites.db` ולחשוף בעיית migration/אופטימיזציה. ארטיפקט כזה הוא **lab-signed**, לא חבילת הפצה. לחלופין, חתמו על שתי הגרסאות עם אותו מפתח בדיקה נפרד והתקינו אותן בסדר; התקנה עם מפתח אחר דורשת הסרה ולכן אינה בודקת שדרוג נתונים.

## 4. בונים ומזהים את הארטיפקטים

הריצו מתוך חלון Gradle של Android Studio או מן Terminal של הפרויקט:

```text
:app:assembleRelease
:app:bundleRelease
:app:lintRelease
```

בענף הזה `assembleRelease` יוצר `app-release-unsigned.apk` תחת **app > build > outputs > apk > release**; `bundleRelease` יוצר `app-release.aab` תחת **app > build > outputs > bundle > release**. תיקיות `build` הן תוצרי בנייה, לא קוד מקור ל־Git; אם אינן מופיעות בתצוגת **Android**, פתחו אותן בעזרת **Search Everywhere** או קישור ה־Build Output. בדקו גם את `app > build > outputs > mapping > release > mapping.txt` — מפת השמות של R8 שצריך לשמור בצורה מוגנת כדי לפענח stack traces של אותה גרסה.

Build מוצלח אינו הוכחה שה־APK מותקן או שהמסד פועל אחרי R8. ודאו שה־APK החתום מאומת בכלי **apksigner verify**, והתקינו אותו במכשיר בדיקה. באמולטור שלנו `assembleRelease`,‏ `bundleRelease` ו־`lintRelease` עברו; `apksigner verify` אישר חתימת v3 ב־APK שנחתם **רק למעבדה** עם מפתח debug. לא העלינו AAB ל־Play Console.

## 5. בודקים מסלול משתמש על גרסת release

1. התקינו את ה־APK החתום. בדקו במידע האפליקציה או `adb shell dumpsys package com.example.topics` שמופיעים `versionCode=2` ו־`versionName=1.1`.
2. פתחו את **Topics Lab**, לחצו Load books ושמרו את Ada. בדקו שהכפתור מציג `Saved ★`.
3. עצרו את התהליך, פתחו שוב, לחצו **Load books** מחדש ובדקו ש־Ada עדיין מסומנת. הטעינה מחדש חשובה: בפתיחה הראשונה המסך מתחיל ב־Idle, ולכן אין להסיק ממנה שהנתון נמחק.
4. אם R8 גרמה לקריסה או לקריאה שגויה, קראו את stack trace של **ארטיפקט ה־release** ואת `mapping.txt` התואם. תקנו keep rule רק לנתיב הדרוש, בנו שוב, והוכיחו את התיקון באותו מסלול.

## 6. מה נשאר לפני אפליקציה ציבורית?

בפרויקט מוצר החליפו את אייקון ושם התבנית, בדקו הרשאות ו־Manifest מצומצמים, בדקו טלפון וטאבלט וגרסאות Android נתמכות, הכינו תמונות מסך ותיאור מדויק, ובדקו שהשרתים/מפתחות/כללי גישה של release אינם הגדרות פיתוח. [מדריך הכנת release](https://developer.android.com/studio/publish/preparing) ממליץ לבדוק את הארטיפקט המיועד למסירה על מכשירים שונים.

אם מפרסמים ב־Google Play, ממלאים הצהרת **Data safety** ומספקים מדיניות פרטיות התואמת להתנהגות האפליקציה, לרבות SDKs חיצוניים. אפליקציה עם יצירת חשבון צריכה גם מסלול מחיקת חשבון ונתונים לפי המדיניות הרלוונטית. אל תסיקו שהצהרת הנתונים מוכנה רק מפני שהדוגמה הזאת שומרת Favorite מקומית: בדקו את **האפליקציה שנשלחת בפועל** ואת מדיניות Play העדכנית. [מדיניות User Data של Play](https://support.google.com/googleplay/android-developer/answer/10144311), [מדריך Data safety](https://support.google.com/googleplay/android-developer/answer/10787469) ו[מסלול בדיקות פנימי](https://support.google.com/googleplay/android-developer/answer/9845334) הם נקודות הפתיחה.

{: .box-note}
הענף הזה אינו מוכן ל־production: האייקון עדיין של התבנית, לא נוצר מפתח העלאה, ולא הוגשו מדיניות פרטיות או טפסים ל־Play. התוצר המלמד הוא **גרסת release מותקנת ונבדקת** לצד diff קטן וברור של versioning ואופטימיזציה.

## שאלות בדיקה

{: .alefbet}
1. מדוע `versionName="1.1"` לבדה אינה מבטיחה ש־Android יקבל עדכון?
2. מה קורה אם APK חדש נחתם במפתח שונה מן האפליקציה המותקנת?
3. מדוע בדיקת debug שעברה אינה מוכיחה שגרסת R8 עובדת?
4. מה עוזר `mapping.txt` לפענח, ולמה חייבים לשמור דווקא את הקובץ של אותה גרסה?
5. אילו פרטים על איסוף מידע צריך לבדוק לפני מילוי Data safety באפליקציה שמשתמשת גם ב־SDK חיצוני?
