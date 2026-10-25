---
layout: page
title: "Firebase AI Logic — הכנה מאובטחת בצד Google"
subtitle: "תשתית משלכם לפרויקט השנתי, החל מהמסלול ללא תשלום"
permalink: /android/topics/firebase-ai-logic/he/setup/
lang: he
translation_of: /android/topics/firebase-ai-logic/setup/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, security]
---

[חזרה למדריך האפליקציה](../) · [English]({{ '/android/topics/firebase-ai-logic/setup/' | relative_url }}?lang=en)

השתמשו ב**חשבון Google שלכם ובפרויקט Firebase משלכם**, רצוי הפרויקט של אפליקציית הגמר השנתית. כל תלמיד מנהל את קובץ ההגדרות, המפתחות וטוקני App Check שלו. שומרים את הפרויקט הזה להמשך השנה, כשהאפליקציה מתפתחת. התמונות צולמו בפרויקט קיים של המורה ב־24 באוקטובר 2026, לפני הפעלת AI Logic ו־App Check. חתכנו את התמונות כך שפרטי חשבון, מזהי פרויקט, מידע חיוב ופרטי גישה לא יופיעו בהן. הן מדגימות היכן פועלים, ואינן מעידות שפרויקט הדוגמה כבר מוגן. לא שינינו הגדרות בפרויקט לצורך הצילום.

## 0. מכינים תשתית משלכם לפרויקט השנתי במסלול Spark

1. התחברו ל[מסוף Firebase](https://console.firebase.google.com/) עם **החשבון שלכם**. אם כבר יש לכם פרויקט Firebase לאפליקציה השנתית, השתמשו בו; אחרת בחרו **Create a project** ותנו לו שם שילווה אתכם במהלך השנה. Google Analytics אינו נדרש לשיעור הזה.
2. ודאו שהפרויקט במסלול **Spark (ללא עלות)**. משאירים אותו **ללא קישור ל־Cloud Billing**: אין להוסיף אמצעי תשלום, להפעיל תקופת ניסיון של חיוב בענן או לשדרג ל־Blaze לצורך התרגיל.
3. פתחו את [מסוף Google Cloud](https://console.cloud.google.com/) עם אותו חשבון ובחרו את **אותו Project ID**. Firebase יוצר אוטומטית את פרויקט Cloud שמתחתיו; אלה שני מסופים של אותו פרויקט, ולא שני פרויקטים שצריך ליצור. [הקשר בין הפרויקטים](https://firebase.google.com/docs/projects/learn-more), [הגדרה ראשונית](https://firebase.google.com/docs/ai-logic/get-started?platform=android).

אם התשתית הקיימת של הפרויקט השנתי כבר במסלול Blaze, עצרו ובררו עם המורה איך להמשיך; אין לשנות את מסלול החיוב שלה במסגרת השיעור. יכולות נוספות של הפרויקט השנתי עשויות לדרוש בהמשך החלטת עלות נפרדת. בשיעור הזה אין צורך ביכולת בתשלום.

## 1. רושמים אפליקציית Android ובוחרים ספק

1. ב[מסוף Firebase](https://console.firebase.google.com/), בחרו את הפרויקט שלכם. פתחו את **Project settings**, עברו ל־**General**, ובאזור **Your apps** בדקו אם אפליקציית Android כבר רשומה עם שם החבילה של האפליקציה שלכם. אם כן, השתמשו ברישום הקיים; אחרת בחרו **Add app > Android** ורשמו את ה־`applicationId` המדויק מקובץ Gradle של המודול. `com.example.topic` הוא רק שם החבילה בדוגמת הקוד; משאירים את שם החבילה של האפליקציה השנתית שלכם.
2. הורידו את **google-services.json** של אפליקציית Android הזאת אל **שורש מודול app**, לצד קובץ Gradle שלו. אין צורך להדביק את תוכנו במדריך או בקוד Java. הקובץ מזהה את אפליקציית Firebase; הוא אינו קובץ הרשאות של service account.
3. פתחו **AI services > AI Logic > Get started**, בחרו **Gemini Developer API** והשלימו את ההפעלה המודרכת. בדוגמה נשתמש במודל הטקסט `gemini-3.8-flash`; בדקו את [רשימת המודלים העדכנית](https://firebase.google.com/docs/ai-logic/models). בחרו במסלול Developer API ללא תשלום. אין לבחור ספק או מודל שדורשים חיוב; אם התהליך מבקש תשלום, עצרו ובדקו את הספק והמודל שנבחרו.

![בחירת ספק ב־Firebase AI Logic, עם האפשרות Gemini Developer API]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

**בדיקת המסלול ללא תשלום:** Spark, ללא קישור ל־Cloud Billing, עם Gemini Developer API ומודל טקסט נתמך שאינו דורש חיוב. נבדק ב־**25 באוקטובר 2026**: המודל `gemini-3.8-flash` תומך במסלול הזה. השימוש ללא תשלום מוגבל במודלים ובמכסות ועשוי להשתנות; בדקו את [רשימת המודלים](https://firebase.google.com/docs/ai-logic/models) ואת [התמחור](https://firebase.google.com/docs/ai-logic/pricing) לפני ההוראה. מסלול שדורש חיוב, כגון Vertex AI / Agent Platform, אינו חלק מהשיעור.

## 2. בודקים את ה־APIs ומבחינים בין שני סוגי מפתחות

ב[מסוף Google Cloud](https://console.cloud.google.com/apis/dashboard), בחרו את **אותו פרויקט** ופתחו **APIs & Services**. תהליך ההגדרה המודרך אמור להפעיל את השירותים הדרושים. ב־**Library** בדקו את **Firebase AI Logic API**, ששמו הטכני `firebasevertexai.googleapis.com`, ואת **Gemini API** של הספק הנבחר (`generativelanguage.googleapis.com`). כפתור Enable פירושו שהשירות עדיין אינו מופעל בפרויקט הנבחר. השלימו את ההפעלה באמצעות תהליך ההגדרה של Firebase.

![פרטי Firebase AI Logic API במסוף Cloud לפני הפעלה, עם שם השירות הטכני]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

מפתח ספק Gemini שנוצר בתהליך Firebase נשאר בצד השרת: **אין לשים באפליקציה מפתח Gemini API או קובץ service-account JSON**. מפתח Firebase שב־`google-services.json` הוא מזהה פרויקט ואפליקציה, ולא הוכחה שהבקשה מורשית. ב־**APIs & Services > Credentials** הגבילו את מפתח Firebase שבו משתמשת האפליקציה ל־**Android apps**, עם שם החבילה וטביעת SHA-1 של תעודת החתימה, ובחרו רק את ה־APIs הדרושים לאפליקציה, ובהם Firebase AI Logic API. את SHA-1 של ההתקנה הכיתתית מקבלים במשימת Gradle בשם `signingReport`. אם אתם בונים את האפליקציה שלכם במחשב נוסף, הוסיפו גם את SHA-1 של תעודת ה־debug שלו. שמרו על ההגבלות שנדרשות לאפליקציות נוספות שרשמתם בעצמכם. [הנחיות הגבלת מפתחות ו־App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. מגינים על הבקשה באמצעות App Check

פתחו **Security > App Check > Get started** ובחרו את אפליקציית Android שרשמתם. במדריך הזה יש **הגדרה אחת לאפליקציה שלכם**, עם **ספק App Check debug** באמולטור או במכשיר התרגול. כל התקנה רושמת טוקן פרטי; Firebase מקבל אותו במקום לדרוש אימות של המכשיר. זה אינו תהליך התחברות של משתמש. בתהליך ההגדרה העדכני של AI Logic, האכיפה מופעלת אוטומטית. בפרויקט ישן צריך לבדוק את **App Check > APIs > Firebase AI Logic** ולהפעיל אכיפה במפורש. אין לעקוף בדיקה שנכשלה באמצעות כיבוי האכיפה. [שלבי App Check הרשמיים](https://firebase.google.com/docs/ai-logic/app-check).

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
+    implementation("com.google.firebase:firebase-appcheck-debug")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

ב־**app > manifests > AndroidManifest.xml**, הוסיפו מעל `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### רושמים את ההתקנה הכיתתית

מדריך האפליקציה מפעיל את ספק ה־debug ישירות ב־`MainActivity`, לפני יצירת מודל ה־AI. אין מחלקות עזר נוספות, תיקיות לפי גרסאות בנייה או שלבים ב־Play Console.

1. המשיכו ל[מדריך האפליקציה](../), הריצו את האפליקציה ולחצו פעם אחת **Ask LLM**.
2. ב־Logcat סננו לפי **DebugAppCheckProvider**, והעתיקו באופן פרטי את טוקן ה־debug שנוצר.
3. ב־**Firebase > Security > App Check > Apps**, פתחו את תפריט שלוש הנקודות של האפליקציה, בחרו **Manage debug tokens** ורשמו את הטוקן.
4. לחצו שוב **Ask LLM**. הבקשה הראשונה עשויה להיכשל עד לרישום הטוקן.

רשמו את הטוקן ב**פרויקט Firebase שלכם**. כל התקנה באמולטור או במכשיר התרגול שלכם מקבלת טוקן משלה. שמרו עליו באופן פרטי במהלך פיתוח האפליקציה השנתית, ובטלו אותו כשאינו בשימוש או אם נחשף. מי שמחזיק בטוקן מורשה יכול להשתמש בו ממכשיר שלא עבר אימות. ההגדרה הזאת מיועדת לתרגול כיתתי. [מדריך ספק debug באנדרואיד](https://firebase.google.com/docs/app-check/android/debug-provider).

## 4. נשארים במסלול ללא תשלום ובודקים מוכנות

בדקו את המכסה בפועל של המודל שנבחר ב**פרויקט שלכם**; אין מכסה מספרית קבועה שמובטחת לכל תלמיד. שלחו בקשות קצרות, אחת בכל פעם. אם מתקבלת שגיאת `429`, בדקו את המכסה ואת מועד האיפוס והמתינו; אין להפעיל חיוב או להוסיף ניסיונות חוזרים אוטומטיים כדי לעבור את המגבלה. [מגבלות שימוש](https://firebase.google.com/docs/ai-logic/quotas).

מסלול ללא תשלום מאפשר שימוש מוגבל, ולא בקשות ללא הגבלה. השארת הפרויקט ללא קישור ל־Cloud Billing שומרת על ההגדרה ללא אמצעי תשלום. התראת תקציב אינה תחליף להישארות ב־Spark. [דרישות החיוב](https://firebase.google.com/docs/ai-logic/pricing).

לפני הבקשה הראשונה בדקו: פרויקט, אפליקציה וקובץ הגדרות תואמים; APIs דרושים פעילים; ספק App Check מתאים וטוקן פרטי רשום; הגבלות מפתח Firebase תואמות לאפליקציה; מסלול Spark ללא קישור לחיוב; מודל שאינו דורש חיוב ומכסה זמינה. אפשר להוסיף Firebase Authentication ואת מצב הדרישה למשתמש מחובר כשיש צורך במשתמשים אישיים; הדוגמה הקטנה אינה מפעילה אותם. במדריך הזה משאירים את template-only mode כבוי, מפני שהוא חוסם בקשות prompt ישירות. [אפשרויות אבטחה והפצה](https://firebase.google.com/docs/ai-logic/production-checklist).

אם בקשה נכשלת, קראו את התווית ואת Logcat: דחיית App Check מצריכה בדיקת ספק האימות ורישום הטוקן; `API_KEY_SERVICE_BLOCKED` מצריכה בדיקת רשימת ה־APIs המותרים למפתח; `404` עשוי להצביע על שם מודל שגוי או מודל שיצא משימוש; `429` מציין מגבלת קצב או מכסה. אין לפתור את השגיאות באמצעות פרסום מפתחות או ניסיונות חוזרים ללא הבחנה.

[חזרה למדריך הכפתור והתשובה](../)
