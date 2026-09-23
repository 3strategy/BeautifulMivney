---
layout: page
title: "Hex — 07: אימות והצגה מסכמת"
subtitle: "בדיקות, השוואה לייחוס והדגמה"
permalink: /android/hex/07-final-presentation/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/06-supplied-rl-models/' | relative_url }}) ·

<!-- [patch הפרק]({{ '/android/hex/downloads/07.patch' | relative_url }}) -->

{: .box-success}
**בסוף הפרק:** היישום הסופי עובד, בדיקות המודלים עוברות על Android והתלמיד מסוגל להסביר ולהדגים אותו.

![המסך הסופי של Hex על אמולטור Android]({{ '/android/hex/final.png' | relative_url }})

## הרעיון

הצגה טובה מראה גם תוצאה וגם הסבר: מסך → חוקי Java → מהלכים חוקיים → עותקי יורש → קידוד 7×7×3 → TFLite → מהלך כחול. יש הבדל בין בדיקת חוקי משחק ב־JVM, טעינת מודל על מכשיר, ומשחק ידני. משחק אחד נגד מחשב אינו מודד את חוזקו. היישום אינו מתחבר לרשת ואינו שומר משחק אחרי יצירה מחדש של Activity.

## מתחילים מהמצב שעבד

פתחו את `hexT` במצב סוף הפרק הקודם. שמרו את קובצי התבנית שאינם מוזכרים כאן, כולל test ו־androidTest המקוריים. שורות `-` ב־diff מוחלפות ב־`+`; שורות הקשר נשארות. קובץ חדש מוצג במלואו.

הקוד של פרק 6 הוא המצב הסופי. `README.md` שנוסף כאן מסכם את הבדיקות ואת תסריט ההדגמה; הוא אינו משנה את המשחק.

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים ותלויות לפני קוד שמפנה אליהם; מחלקת חוקים לפני ה־Activity. ה־patch להורדה מכיל את שינויי הטקסט המדויקים של הפרק. במעבר על diff אל תקלידו את סמלי `+` ו־`-` עצמם.

### AndroidManifest.xml

**מיקום:** `app > manifests > AndroidManifest.xml`. במסך הסופי הייחוס
מכבה גיבוי Android. המשחק הזה אינו כולל מערכת שחזור משחק, ולכן התאימו
את הגדרת התבנית בלי לשנות את ה־Activity או את כתובת החבילה.

Todo: **why on earth are we shutting down manifest features.** Student coding work should be minimised. nothing wrote with keeping stuff there.

{% code_diff %}
     <application

-        android:allowBackup="true"

-        android:allowBackup="false"
         android:dataExtractionRules="@xml/data_extraction_rules"

{% endcode_diff %}

### colors.xml

**מיקום:** `app > res > values > colors.xml`. הוסיפו את הצהרת XML שחסרה
בקובץ של שלב 1, כדי להתאים גם את מבנה המשאב למקור. ערכי הצבע אינם משתנים.

```diff
+<?xml version="1.0" encoding="utf-8"?>
 <resources>
     <color name="ink">#152238</color>
```

### README.md

**מיקום:** שורש הפרויקט. משאב או הגדרת בנייה של השלב. שנו רק את השורות המוצגות.

```markdown
# Hex 7×7 — student checkpoint

This is the runnable end state for the seven Hebrew lessons in BeautifulMivney's
`android/hex/` teaching folder. The source starts from the Empty Views Activity
baseline and keeps Java, XML, View Binding, and Kotlin DSL.

Red connects top to bottom. Blue connects left to right. The app works offline
in local two-player and human-vs-computer modes. There is no swap rule or saved
game restoration.

## Run and check

Open this project in Android Studio and run `app` on API 31 or newer. The
package is `com.example.hex`, identical to the finished reference project:
installing either APK replaces the other. To identify the build being tested,
install this project's `app/build/outputs/apk/debug/app-debug.apk` after any
connected tests.

Run `testDebugUnitTest assembleDebug` after source changes. Run
`connectedDebugAndroidTest` on an emulator after changing model assets or the
catalog. The catalog begins with the early three-iteration test player, matching
the current reference app. Iteration numbers identify training snapshots; they
do not establish a difficulty ranking.

## Supplied model files

Each catalog row names a matching `.tflite` and `model_info.json` pair under
`app/src/main/assets/players/`. The teacher supplies the trained pair. Add its
entry to `model_catalog.json` to make it selectable. The reference project's
`ml/player_to_android.py` can prepare a pair from a supplied retained NPZ,
for example `iteration_001000.npz`; this project does not train a model.

## Presentation walkthrough

1. Complete and restart a two-player game. Explain the six neighboring cells
   and the two goal directions.
2. Play Red against the computer and show its Blue response. Explain that
   `HexAi` scores legal one-move successors using a value model.
3. Switch the computer player. Explain the player-relative input channels and
   why a successor estimate is negated for the player choosing a move.
4. Explain why model work runs off the main thread and why changing games
   invalidates an outstanding reply.
5. State limits accurately: offline 7×7 play, one-step lookahead, supplied
   checkpoints, and no established ranking of playing strength.
```

## מריצים ומוודאים

בצעו Sync אם שיניתם Gradle, הריצו `testDebugUnitTest assembleDebug` ואז הפעילו את האפליקציה. הריצו בדיקות JVM, בנייה ו־lint, וגם connectedDebugAndroidTest באמולטור. התקינו שוב את APK של hexT לאחר בדיקות המכשיר והדגימו משחק מקומי, משחק מחשב והחלפת שחקן.

**שאלת הבנה:** מה מוכיחה בדיקת טעינת מודל ומה דורש עדיין משחק ידני?

שתי האפליקציות משתמשות ב־`com.example.hex`, ולכן התקנת APK אחד מחליפה את השני. אחרי `connectedDebugAndroidTest` התקינו שוב את APK של `hexT` לפני הצגה. אל תייחסו למודל דירוג חוזק שלא נמדד.
