---
layout: page
title: "Firebase AI Logic — 1: הכנת הפרויקט לפני הקוד"
subtitle: "Android,‏ View Binding,‏ Firebase ו־Gradle — משלימים לפני שיעור הבקשה"
permalink: /android/topics/firebase-ai-logic/he/setup/
lang: he
translation_of: /android/topics/firebase-ai-logic/setup/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, security]
---

[הבא: 2 — כפתור ובקשה](../) · [English]({{ '/android/topics/firebase-ai-logic/setup/' | relative_url }}?lang=en)

{: .box-warning}
**מתחילים כאן. זהו חלק 1, חובה לפני כתיבת קוד Firebase בחלק 2.** משלימים כאן את פרויקט Android,‏ View Binding, פרויקט Firebase/Cloud האישי, קובץ ההגדרות, תלויות Gradle והאתחול. בסיום האפליקציה חייבת להיבנות ולפתוח את המסך הקיים, **בלי imports של Firebase שאינם מזוהים**. שני המסופים מנהלים את תשתית הענן שלכם; ב־Android Studio נמצאת האפליקציה שמתחברת אליה.

השתמשו ב**חשבון Google שלכם ובפרויקט Firebase משלכם**, רצוי הפרויקט של אפליקציית הגמר השנתית. כל תלמיד מנהל את קובץ ההגדרות, המפתחות וטוקני App Check שלו. שומרים את הפרויקט הזה להמשך השנה, כשהאפליקציה מתפתחת. התמונות צולמו בפרויקט קיים של המורה ב־24 באוקטובר 2026, לפני הפעלת AI Logic ו־App Check. חתכנו את התמונות כך שפרטי חשבון, מזהי פרויקט, מידע חיוב ופרטי גישה לא יופיעו בהן. הן מדגימות היכן פועלים, ואינן מעידות שפרויקט הדוגמה כבר מוגן. לא שינינו הגדרות בפרויקט לצורך הצילום.

## 0. יוצרים או פותחים פרויקט Android ומכינים View Binding

לפרויקט Android חדש בחרו **Empty Views Activity**, בשפת **Java**, עם XML ועם שם האפליקציה והחבילה שלכם. משאירים את שם החבילה ואת הגדרות ה־SDK שלכם (API 24 ומעלה). `com.example.topic` הוא רק שם החבילה בדוגמה. אם הממשק או View Binding כבר עובדים אצלכם, משאירים אותם ומדלגים על השינויים שכבר הושלמו.

[הורדת ZIP של תבנית הבסיס עם View Binding]({{ '/android/topics/firebase-ai-logic/downloads/baseline.zip' | relative_url }}). חלצו לתיקייה חדשה, פתחו את תיקיית **Topic3** ב־Android Studio והמתינו לסנכרון Gradle. זו תבנית Empty Views עם View Binding מופעל ועם `MainActivity` שכבר הוסב, כולל השדה `binding`. אין בה הגדרות Firebase או קוד AI. חברו אותה ל**פרויקט Firebase שלכם** בסעיפים הבאים; אין לדרוס פרויקט שנתי קיים באמצעות ה־ZIP.

אם יצרתם פרויקט Empty Views משלכם, בצעו קודם את ההסבה המשותפת שלמטה. אם הורדתם את ה־ZIP המוכן או שכבר יש אצלכם View Binding, קראו את ההסבר ו**דלגו על שינויי ההסבה**. משאירים את שם החבילה ואת הגדרות ה־SDK שלכם; החבילה `com.example.topic` ו־API 37 מתארים את הדוגמה להורדה.

{% include android/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

{: .box-success}
**בדיקת ביניים א — Android:** בשני מסלולי ההתחלה צריך להיות כעת השדה `private ActivityMainBinding binding;`, והקריאה ל־`setContentView` צריכה להשתמש ב־`binding.getRoot()`. **בנו והריצו**: מסך Hello World (או הממשק הקיים שלכם) עדיין צריך להופיע. ממשיכים מהמצב הזה.

## 1. מכינים תשתית משלכם לפרויקט השנתי במסלול Spark

1. התחברו ל[מסוף Firebase](https://console.firebase.google.com/) עם **החשבון שלכם**. אם כבר יש לכם פרויקט Firebase לאפליקציה השנתית, השתמשו בו; אחרת בחרו **Create a project** ותנו לו שם שילווה אתכם במהלך השנה. Google Analytics אינו נדרש לשיעור הזה.
2. ודאו שהפרויקט במסלול **Spark (ללא עלות)**. משאירים אותו **ללא קישור ל־Cloud Billing**: אין להוסיף אמצעי תשלום, להפעיל תקופת ניסיון של חיוב בענן או לשדרג ל־Blaze לצורך התרגיל.
3. פתחו את [מסוף Google Cloud](https://console.cloud.google.com/) עם אותו חשבון ובחרו את **אותו Project ID**. Firebase יוצר אוטומטית את פרויקט Cloud שמתחתיו; אלה שני מסופים של אותו פרויקט, ולא שני פרויקטים שצריך ליצור. [הקשר בין הפרויקטים](https://firebase.google.com/docs/projects/learn-more), [הגדרה ראשונית](https://firebase.google.com/docs/ai-logic/get-started?platform=android).

{: .box-warning}
אם התשתית הקיימת של הפרויקט השנתי כבר במסלול Blaze, עצרו ובררו עם המורה איך להמשיך; אין לשנות את מסלול החיוב שלה במסגרת השיעור. יכולות נוספות של הפרויקט השנתי עשויות לדרוש בהמשך החלטת עלות נפרדת. בשיעור הזה אין צורך ביכולת בתשלום.

## 2. רושמים אפליקציית Android ובוחרים ספק

1. ב[מסוף Firebase](https://console.firebase.google.com/), בחרו את הפרויקט שלכם. פתחו את **Project settings**, עברו ל־**General**, ובאזור **Your apps** בדקו אם אפליקציית Android כבר רשומה עם שם החבילה של האפליקציה שלכם. אם כן, השתמשו ברישום הקיים; אחרת בחרו **Add app > Android** ורשמו את ה־`applicationId` המדויק מקובץ Gradle של המודול. `com.example.topic` הוא רק שם החבילה בדוגמת הקוד; משאירים את שם החבילה של האפליקציה השנתית שלכם.
2. הורידו את **google-services.json** של אפליקציית Android הזאת אל **שורש מודול app**, לצד קובץ Gradle שלו. אין צורך להדביק את תוכנו במדריך או בקוד Java. הקובץ מזהה את אפליקציית Firebase; הוא אינו קובץ הרשאות של service account.
3. פתחו **AI services > AI Logic > Get started**, בחרו **Gemini Developer API** והשלימו את ההפעלה המודרכת. בדוגמה נשתמש במודל הטקסט `gemini-3.8-flash`; בדקו את [רשימת המודלים העדכנית](https://firebase.google.com/docs/ai-logic/models). בחרו במסלול Developer API ללא תשלום. אין לבחור ספק או מודל שדורשים חיוב; אם התהליך מבקש תשלום, עצרו ובדקו את הספק והמודל שנבחרו.

![בחירת ספק ב־Firebase AI Logic, עם האפשרות Gemini Developer API]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

{: .box-success}
**בדיקת המסלול ללא תשלום:** Spark, ללא קישור ל־Cloud Billing, עם Gemini Developer API ומודל טקסט נתמך שאינו דורש חיוב. נבדק ב־**25 באוקטובר 2026**: המודל `gemini-3.8-flash` תומך במסלול הזה. השימוש ללא תשלום מוגבל במודלים ובמכסות ועשוי להשתנות; בדקו את [רשימת המודלים](https://firebase.google.com/docs/ai-logic/models) ואת [התמחור](https://firebase.google.com/docs/ai-logic/pricing) לפני ההוראה. מסלול שדורש חיוב, כגון Vertex AI / Agent Platform, אינו חלק מהשיעור.


{: .box-warning}
הדוגמה הקטנה שולחת prompt ישיר ואינה כוללת התחברות באמצעות Firebase Authentication. אין להפעיל עבורה **template-only mode** או **authenticated-users mode**. אם הפרויקט השנתי הקיים כבר אוכף אחד מהם, בקשו מהמורה להתאים את הדוגמה; אין לכבות הגנות קיימות. המצבים האלה דוחים את הדוגמה עם `403` או `401`, בהתאמה. [דרישות המצבים](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. בודקים את ה־APIs ומבחינים בין שני סוגי מפתחות

ב[מסוף Google Cloud](https://console.cloud.google.com/apis/dashboard), בחרו את **אותו פרויקט** ופתחו **APIs & Services**. תהליך ההגדרה המודרך אמור להפעיל את השירותים הדרושים. ב־**Library** בדקו את **Firebase AI Logic API**, ששמו הטכני `firebasevertexai.googleapis.com`, ואת **Gemini API** של הספק הנבחר (`generativelanguage.googleapis.com`). כפתור Enable פירושו שהשירות עדיין אינו מופעל בפרויקט הנבחר. השלימו את ההפעלה באמצעות תהליך ההגדרה של Firebase.

![פרטי Firebase AI Logic API במסוף Cloud לפני הפעלה, עם שם השירות הטכני]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

מפתח ספק Gemini שנוצר בתהליך Firebase נשאר בצד השרת: **אין לשים באפליקציה מפתח Gemini API או קובץ service-account JSON**. מפתח Firebase שב־`google-services.json` הוא מזהה פרויקט ואפליקציה, ולא הוכחה שהבקשה מורשית. ב־**APIs & Services > Credentials** הגבילו את מפתח Firebase שבו משתמשת האפליקציה ל־**Android apps**, עם שם החבילה וטביעת SHA-1 של תעודת החתימה, ובחרו רק את ה־APIs הדרושים לאפליקציה, ובהם Firebase AI Logic API. את SHA-1 של ההתקנה הכיתתית מקבלים במשימת Gradle בשם `signingReport`. אם אתם בונים את האפליקציה שלכם במחשב נוסף, הוסיפו גם את SHA-1 של תעודת ה־debug שלו. שמרו על ההגבלות שנדרשות לאפליקציות נוספות שרשמתם בעצמכם. [הנחיות הגבלת מפתחות ו־App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 4. מוסיפים תוסף וספריות ומסנכרנים Gradle
{: #firebase-sdk}

{: .box-warning}
**יצירת פרויקט Firebase אינה מוסיפה ספריות Java ל־Android Studio.** משלימים את שלוש העריכות הבאות לפני הדבקת imports של Firebase. במדריך משתמשים בשמות התלויות ישירות, ולכן **אין צורך לשנות את `libs.versions.toml`**. משאירים את ה־aliases הקיימים של התבנית. אין ליצור מקטע `plugins`,‏ `android` או `dependencies` נוסף; עורכים את המקטעים הקיימים. הקטעים מציגים רק את האזור הרלוונטי.

### א. הכרזת התוסף ברמת הפרויקט

פתחו **Gradle Scripts > build.gradle.kts (Project)** והוסיפו שורה אחת:

```diff
 plugins {
     alias(libs.plugins.android.application) apply false
+    id("com.google.gms.google-services") version "4.5.0" apply false
 }
```

### ב. הפעלת התוסף במודול האפליקציה

פתחו **Gradle Scripts > build.gradle.kts (Module :app)**. בתוך מקטע `plugins` הקיים:

```diff
 plugins {
     alias(libs.plugins.android.application)
+    id("com.google.gms.google-services")
 }
```

### ג. תלויות במודול האפליקציה

ב**אותו קובץ של המודול**, הוסיפו את השורות הבאות בתחילת מקטע `dependencies` הקיים. משאירים את שאר תלויות התבנית ואת כל מקטע `android`:

```diff
 dependencies {
+    implementation(platform("com.google.firebase:firebase-bom:35.1.0"))
+    implementation("com.google.firebase:firebase-ai")
+    implementation("com.google.firebase:firebase-appcheck-debug")
+    implementation("com.google.guava:guava:31.0.1-android")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

ה־Firebase BoM בוחר גרסאות תואמות לספריות Firebase. הספרייה `firebase-ai` מספקת את מחלקות המודל, `firebase-appcheck-debug` מספקת את ספק האימות לתרגול, ו־Guava מספקת futures ו־callbacks ב־Java. תוסף Google Services קורא את **קובץ ההגדרות שלכם**, `app/google-services.json`; הוא אינו מחליף את תלויות הספריות.

ב־**app > manifests > AndroidManifest.xml**, הוסיפו מיד מעל `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

כעת בצעו **Sync Project with Gradle Files** והמתינו לסיום מוצלח. אחר כך בנו את האפליקציה, לפני שממשיכים.

{: .box-error}
**עוצרים כאן אם Gradle נכשל.** שגיאת קובץ `google-services.json` חסר פירושה שסעיף 2 לא הושלם; אי־התאמה בשם החבילה פירושה שרישום Android אינו תואם ל־`applicationId`. אם תוסף או ספרייה אינם נפתרים, בדקו את שני קובצי Gradle, את החיבור לרשת ואת השגיאה הראשונה של Gradle. אין לנסות לתקן ספריות חסרות באמצעות שינוי imports ב־Java.

## 5. מגינים על הבקשה באמצעות App Check

פתחו **Security > App Check > Get started** ובחרו את אפליקציית Android שרשמתם. במדריך הזה יש **הגדרה אחת לאפליקציה שלכם**, עם **ספק App Check debug** באמולטור או במכשיר התרגול. כל התקנה רושמת טוקן פרטי; Firebase מקבל אותו במקום לדרוש אימות של המכשיר. זה אינו תהליך התחברות של משתמש. בתהליך ההגדרה העדכני של AI Logic, האכיפה מופעלת אוטומטית. בפרויקט ישן צריך לבדוק את **App Check > APIs > Firebase AI Logic** ולהפעיל אכיפה במפורש. אין לעקוף בדיקה שנכשלה באמצעות כיבוי האכיפה. [שלבי App Check הרשמיים](https://firebase.google.com/docs/ai-logic/app-check).

![מסך הפתיחה של Firebase App Check, לפני רישום]({{ "/android/topics/firebase-ai-logic/images/app-check-start.jpg" | relative_url }})

נכון למועד הבדיקה של המדריך, Google מציינת שאכיפת App Check תהיה חובה עבור AI Logic החל מ־**2 בנובמבר 2026**. נכין אותה כבר עכשיו. [רשימת בדיקות האבטחה](https://firebase.google.com/docs/ai-logic/security-checklist).

### מאתחלים את Firebase ואת המודל ב־MainActivity

ב־**app > kotlin+java > החבילה שלכם > MainActivity**, הוסיפו את ה־imports הבאים מתחת לקיימים. ה־import והשדה של View Binding כבר קיימים מסעיף 0.

```java
import com.google.firebase.FirebaseApp;
import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;
import com.google.firebase.ai.FirebaseAI;
import com.google.firebase.ai.GenerativeModel;
import com.google.firebase.ai.java.GenerativeModelFutures;
import com.google.firebase.ai.type.GenerativeBackend;
```

בתוך `onCreate` הקיים, **אחרי** ה־`});` שסוגר את מאזין ה־insets ו**לפני** הסוגר המסולסל שסוגר את `onCreate`, הוסיפו:

```java
FirebaseApp.initializeApp(this);
// Install before creating the AI client; register the token at the first request.
FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
        DebugAppCheckProviderFactory.getInstance());
GenerativeModel ai = FirebaseAI.getInstance(GenerativeBackend.googleAI())
        .generativeModel("gemini-3.8-flash");
GenerativeModelFutures model = GenerativeModelFutures.from(ai);
```

הקוד מכין את המשתנה `model` שבו נשתמש בשיעור הבא. הוא **עדיין אינו שולח בקשה ל־LLM**. משאירים אותו בתוך `onCreate`; מאזין הכפתור יתווסף אחריו.

{: .box-error}
**שמות Firebase עדיין אדומים?** חזרו ל[סעיף 4 — תוסף, תלויות ו־Sync](#firebase-sdk). הקוד דורש את `firebase-ai` ואת `firebase-appcheck-debug`; כתיבת import אינה מורידה את הספרייה. אם דווקא `ActivityMainBinding` אדום, בדקו את סעיף 0, שגיאות XML ויצירת מחלקת View Binding.

{: .box-warning}
**ייתכן שעדיין אין טוקן debug, וזה תקין.** הבקשה המוגנת הראשונה בחלק 2 תיצור אותו. הוראות הרישום נמצאות שם, ליד הלחיצה הראשונה; רישום הטוקן אינו תנאי לסיום העמוד הזה.

שם המודל נלקח מ[רשימת המודלים הנתמכים](https://firebase.google.com/docs/ai-logic/models), שנבדקה ב־25 באוקטובר 2026. אם ייצא משימוש בהמשך, בחרו מודל טקסט נתמך שאינו דורש חיוב.

## 6. נשארים במסלול ללא תשלום ובודקים מוכנות

בדקו את המכסה בפועל של המודל שנבחר ב**פרויקט שלכם**; אין מכסה מספרית קבועה שמובטחת לכל תלמיד. שלחו בקשות קצרות, אחת בכל פעם. אם מתקבלת שגיאת `429`, בדקו את המכסה ואת מועד האיפוס והמתינו; אין להפעיל חיוב או להוסיף ניסיונות חוזרים אוטומטיים כדי לעבור את המגבלה. [מגבלות שימוש](https://firebase.google.com/docs/ai-logic/quotas).

מסלול ללא תשלום מאפשר שימוש מוגבל, ולא בקשות ללא הגבלה. השארת הפרויקט ללא קישור ל־Cloud Billing שומרת על ההגדרה ללא אמצעי תשלום. התראת תקציב אינה תחליף להישארות ב־Spark. [דרישות החיוב](https://firebase.google.com/docs/ai-logic/pricing).

{: .box-success}
**ההכנה הושלמה — ממשיכים רק אחרי שהבדיקות האלה עברו:** סנכרון Gradle והבנייה מצליחים; ה־imports של Firebase מזוהים; האפליקציה פותחת את מסך Hello World (או את הממשק שכבר השלמתם). מזהה פרויקט Firebase/Cloud ושם חבילת Android תואמים לקובץ ההגדרות, והתשתית נשארת במסלול Spark ללא קישור לחיוב. זאת בדיקת הכנת האפליקציה; את התשובה החיה הראשונה בודקים בחלק 2.

[ממשיכים לחלק 2 — כפתור אחד ובקשה אחת](../){: data-sequence-nav="next"}
