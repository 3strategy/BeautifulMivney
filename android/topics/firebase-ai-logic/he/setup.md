---
layout: page
title: "Firebase AI Logic — הכנה מאובטחת בצד Google"
subtitle: "מכינים את הפרויקט פעם אחת ומשאירים את קוד האפליקציה קטן"
permalink: /android/topics/firebase-ai-logic/he/setup/
lang: he
translation_of: /android/topics/firebase-ai-logic/setup/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, security]
---

[חזרה למדריך האפליקציה](../) · [English]({{ '/android/topics/firebase-ai-logic/setup/' | relative_url }}?lang=en)

השתמשו ב**פרויקט Firebase ייעודי לתרגול שבשליטתכם**. התמונות צולמו בפרויקט קיים של המורה ב־24 באוקטובר 2026, לפני הפעלת AI Logic ו־App Check. חתכנו את התמונות כך שפרטי חשבון, מזהי פרויקט, מידע חיוב ופרטי גישה לא יופיעו בהן. הן מדגימות היכן פועלים, ואינן מעידות שפרויקט הדוגמה כבר מוגן. לא שינינו הגדרות בפרויקט לצורך הצילום.

## 1. רושמים אפליקציית Android ובוחרים ספק

1. ב[מסוף Firebase](https://console.firebase.google.com/), בחרו את הפרויקט שלכם. פתחו את **Project settings**, עברו ל־**General**, ובאזור **Your apps** בחרו **Add app > Android**. רשמו את ה־`applicationId` המדויק מקובץ Gradle של המודול. בדוגמה שלנו: `com.example.topic`.
2. הורידו את **google-services.json** של אפליקציית Android הזאת אל **שורש מודול app**, לצד קובץ Gradle שלו. אין צורך להדביק את תוכנו במדריך או בקוד Java. הקובץ מזהה את אפליקציית Firebase; הוא אינו קובץ הרשאות של service account.
3. פתחו **AI services > AI Logic > Get started**, בחרו **Gemini Developer API** והשלימו את ההפעלה המודרכת. בדוגמה נשתמש במודל הטקסט `gemini-3.8-flash`; בדקו את [רשימת המודלים העדכנית](https://firebase.google.com/docs/ai-logic/models). קראו בעצמכם את מסכי בחירת הספק והחיוב לפני אישור.

![בחירת ספק ב־Firebase AI Logic, עם האפשרות Gemini Developer API]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

לפרויקט כיתתי ללא אמצעי תשלום, בדקו שימוש בתוכנית **Spark** ואת [זמינות המסלול ללא תשלום](https://firebase.google.com/docs/ai-logic/pricing). בפרויקט שכבר נמצא ב־**Blaze** השימוש עשוי להיות מחויב: בחירת Developer API אינה מחזירה פרויקט ל־Spark. אין לשנות את תוכנית החיוב של פרויקט משותף כדי לבצע את התרגיל.

## 2. בודקים את ה־APIs ומבחינים בין שני סוגי מפתחות

ב[מסוף Google Cloud](https://console.cloud.google.com/apis/dashboard), בחרו את **אותו פרויקט** ופתחו **APIs & Services**. תהליך ההגדרה המודרך אמור להפעיל את השירותים הדרושים. ב־**Library** בדקו את **Firebase AI Logic API**, ששמו הטכני `firebasevertexai.googleapis.com`, ואת **Gemini API** של הספק הנבחר (`generativelanguage.googleapis.com`). כפתור Enable פירושו שהשירות עדיין אינו מופעל בפרויקט הנבחר. השלימו את ההפעלה באמצעות תהליך ההגדרה של Firebase.

![פרטי Firebase AI Logic API במסוף Cloud לפני הפעלה, עם שם השירות הטכני]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

מפתח ספק Gemini שנוצר בתהליך Firebase נשאר בצד השרת: **אין לשים באפליקציה מפתח Gemini API או קובץ service-account JSON**. מפתח Firebase שב־`google-services.json` הוא מזהה פרויקט ואפליקציה, ולא הוכחה שהבקשה מורשית. ב־**APIs & Services > Credentials** הגבילו את מפתח Firebase שבו משתמשת האפליקציה ל־**Android apps**, עם שם החבילה וטביעת SHA-1 של תעודת החתימה, ובחרו רק את ה־APIs הדרושים לאפליקציה, ובהם Firebase AI Logic API. את SHA-1 של debug מקבלים במשימת Gradle בשם `signingReport`; להפצה משתמשים בתעודת החתימה הנכונה של release או Play. אל תשנו מפתח משותף שמשמש אפליקציות אחרות. [הנחיות הגבלת מפתחות ו־App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. מגינים על הבקשה באמצעות App Check

פתחו **Security > App Check > Get started** ורשמו את אפליקציית Android. לפיתוח מקומי באמולטור נשתמש בטוקן debug פרטי; לאפליקציה המופצת נשתמש ב־Play Integrity. App Check מאמת את האפליקציה והמכשיר; הוא אינו מבצע התחברות של משתמש. בתהליך ההגדרה העדכני של AI Logic, האכיפה מופעלת אוטומטית. בפרויקט ישן צריך לבדוק את **App Check > APIs > Firebase AI Logic** ולהפעיל אכיפה במפורש. אין לעקוף בדיקה שנכשלה באמצעות כיבוי האכיפה. [שלבי App Check הרשמיים](https://firebase.google.com/docs/ai-logic/app-check).

![מסך הפתיחה של Firebase App Check, לפני רישום]({{ "/android/topics/firebase-ai-logic/images/app-check-start.jpg" | relative_url }})

נכון למועד הבדיקה של המדריך, Google מציינת שאכיפת App Check תהיה חובה עבור AI Logic החל מ־**2 בנובמבר 2026**. נכין אותה כבר עכשיו. [רשימת בדיקות האבטחה](https://firebase.google.com/docs/ai-logic/security-checklist).

### מוסיפים את הספריות

ב־**Gradle Scripts**, בקובץ **build.gradle.kts (Project)**, הוסיפו את תוסף Google services לצד תוסף Android הקיים:

```diff
// Top-level build file where you can add configuration options common to all sub-projects/modules.
 plugins {
     alias(libs.plugins.android.application) apply false
+    id("com.google.gms.google-services") version "4.5.0" apply false
 }
```

בקובץ **build.gradle.kts (Module :app)** הפעילו את התוסף והוסיפו את התלויות הבאות; משאירים את כל תלויות התבנית. בצעו Sync. ספריית Guava מספקת את ממשק ה־future וה־callback ב־Java. הדוגמה אינה משתמשת בהזרמת תשובות, ולכן אין צורך להוסיף לה ספרייה ייעודית להזרמה.

```diff
plugins {
     alias(libs.plugins.android.application)
+    id("com.google.gms.google-services")
 }

 android {
 }

 dependencies {
+    implementation(platform("com.google.firebase:firebase-bom:35.1.0"))
+    implementation("com.google.firebase:firebase-ai")
+    implementation("com.google.guava:guava:31.0.1-android")
+    debugImplementation("com.google.firebase:firebase-appcheck-debug")
+    releaseImplementation("com.google.firebase:firebase-appcheck-playintegrity")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

ב־**app > manifests > AndroidManifest.xml**, הוסיפו מעל `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### מפרידים בין ספק debug לספק release

צרו **שני קבצים בשם AppCheckSetup.java**, בקבוצות מקורות שונות לפי גרסת הבנייה, עם אותה חבילה כמו MainActivity. המיקומים הפיזיים שלמטה מזהים במדויק את קבוצת המקורות. בתצוגת Android הם מופיעים תחת **app > kotlin+java > com.example.topic**, עם סימון **debug** או **release**. אם התיקיות חסרות, צרו אותן דרך ה־Terminal של Android Studio או מנהל הקבצים, ואז פתחו את הקבצים ב־Android Studio. אין להוסיף אף אחת משתי הגרסאות לקבוצת main.

**קבוצת debug:**

<div markdown="1" class="english">

`app/src/debug/java/com/example/topic/AppCheckSetup.java`

</div>

```java
package com.example.topic;

import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;

/** Installs the App Check provider for the debug build only. */
public class AppCheckSetup {
    /** Call after Firebase initialization, before creating the AI client. */
    public static void install() {
        FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
                DebugAppCheckProviderFactory.getInstance());
    }
}
```

**קבוצת release:**

<div markdown="1" class="english">

`app/src/release/java/com/example/topic/AppCheckSetup.java`

</div>

```java
package com.example.topic;

import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.playintegrity.PlayIntegrityAppCheckProviderFactory;

/** Installs the App Check provider for the release build only. */
public class AppCheckSetup {
    /** Call after Firebase initialization, before creating the AI client. */
    public static void install() {
        FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
                PlayIntegrityAppCheckProviderFactory.getInstance());
    }
}
```

Gradle בונה רק את קובץ העזר ואת ספריית הספק המתאימים. מדריך האפליקציה קורא ל־`AppCheckSetup.install()` לפני יצירת המודל. כך ספריית ספק ה־debug אינה נכללת בגרסת release. [מדריך ספק debug באנדרואיד](https://firebase.google.com/docs/app-check/android/debug-provider).

הריצו את גרסת debug ולחצו פעם אחת Ask LLM. ב־Logcat סננו לפי **DebugAppCheckProvider**. העתיקו **באופן פרטי את הסוד שנוצר אצלכם** אל **App Check > Apps**, בחרו את האפליקציה, פתחו את תפריט שלוש הנקודות ואז **Manage debug tokens**. הבקשה הראשונה עשויה להיכשל עד לרישום הטוקן; נסו שוב אחרי הרישום. אין לפרסם את הטוקן בקוד, בצילומי מסך, במאגרי קוד או בקבוצת הכיתה. בטלו אותו כשאין בו צורך. לגרסת release יש להשלים גם את הצעדים הבאים:

1. ב־**Google Play Console > your app > Release > App integrity > Play Integrity API**, בחרו **Link Cloud project** וקשרו לאותו פרויקט Firebase.
2. ב־**Firebase > Security > App Check > Apps**, רשמו את האפליקציה עם **Play Integrity** ועם טביעת **SHA-256** של תעודת החתימה שלה. זו טביעה שונה מ־**SHA-1** ששימשה להגבלת מפתח ה־API לאנדרואיד למעלה.
3. התאימו את דרישות האימות לדרך ההפצה המתוכננת (Google Play, מחוץ לחנות, או שתיהן), ובדקו שהאימות עובד לפני הפצת גרסת release. [הגדרת Play Integrity](https://firebase.google.com/docs/app-check/android/play-integrity-provider).

## 4. מגבילים שימוש ובודקים מוכנות

בחרו מגבלות קצב קטנות במכוון לתרגול ב־AI Logic, ובדקו את מכסות הספק ב־Cloud. אם החיוב מופעל, הגדירו התראות תקציב ובדקו אילו אמצעי הגבלת הוצאה זמינים: **התראת תקציב היא הודעה, ולא תקרת הוצאה קשיחה**. השבתת הכפתור באפליקציה מונעת לחיצות כפולות בטעות; היא אינה מגבלת שימוש בצד השרת. [מכסות](https://firebase.google.com/docs/ai-logic/quotas), [התראות תקציב](https://firebase.google.com/docs/projects/billing/budget-alerts).

לפני הבקשה הראשונה בדקו: פרויקט, אפליקציה וקובץ הגדרות תואמים; APIs דרושים פעילים; ספק App Check מתאים וטוקן פרטי רשום; הגבלות מפתח Firebase תואמות לאפליקציה; הגדרות חיוב ומכסות מתאימות. אפשר להוסיף Firebase Authentication ואת מצב הדרישה למשתמש מחובר כשיש צורך במשתמשים אישיים; הדוגמה הקטנה אינה מפעילה אותם. במדריך הזה משאירים את template-only mode כבוי, מפני שהוא חוסם בקשות prompt ישירות. [אפשרויות אבטחה והפצה](https://firebase.google.com/docs/ai-logic/production-checklist).

אם בקשה נכשלת, קראו את התווית ואת Logcat: דחיית App Check מצריכה בדיקת ספק האימות ורישום הטוקן; `API_KEY_SERVICE_BLOCKED` מצריכה בדיקת רשימת ה־APIs המותרים למפתח; `404` עשוי להצביע על שם מודל שגוי או מודל שיצא משימוש; `429` מציין מגבלת קצב או מכסה. אין לפתור את השגיאות באמצעות פרסום מפתחות או ניסיונות חוזרים ללא הבחנה.

[חזרה למדריך הכפתור והתשובה](../)
