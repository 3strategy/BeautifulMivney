---
layout: page
title: "Firebase AI Logic (LLM) — 1: הכנת הפרויקט לפני הקוד"
subtitle: "Android,‏ View Binding,‏ Firebase ו־Gradle — משלימים לפני שיעור הבקשה"
permalink: /android/topics/firebase-ai-logic/he/setup/
lang: he
translation_of: /android/topics/firebase-ai-logic/setup/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, security]
---

[הבא: 2 — כפתור ובקשה](../) · [English]({{ '/android/topics/firebase-ai-logic/setup/' | relative_url }}?lang=en)

לתרגול שליחת בקשת HTTP וקריאת JSON, ראו את [מדריך Gemini Interactions API]({{ '/android/unsorted/LLM-using-google-interactions-api/' | relative_url }}?lang=he).

{: .box-warning}
**מתחילים כאן. זהו חלק 1, חובה לפני כתיבת קוד Firebase בחלק 2.** משלימים כאן את פרויקט Android,‏ View Binding, פרויקט Firebase/Cloud האישי, קובץ ההגדרות, תלויות Gradle והאתחול. בסיום האפליקציה חייבת להיבנות ולפתוח את המסך הקיים, **בלי imports של Firebase שאינם מזוהים**. שני המסופים מנהלים את תשתית הענן שלכם; ב־Android Studio נמצאת האפליקציה שמתחברת אליה.

השתמשו ב**חשבון Google שלכם ובפרויקט Firebase משלכם**, רצוי הפרויקט של אפליקציית הגמר השנתית. כל תלמיד מנהל את קובץ ההגדרות, המפתחות וטוקני App Check שלו. שומרים את הפרויקט הזה להמשך השנה, כשהאפליקציה מתפתחת. צילומי המסך של המסופים מציגים את מסכי ההגדרה ואת נקודות הבדיקה שתחפשו בפרויקט שלכם.

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
2. **בודקים את טביעת SHA-256 של חתימת ה־debug.** פתחו ב־Windows את **Command Prompt (cmd.exe)** במחשב שבו אתם בונים את האפליקציה והריצו את הפקודה:

   ```bat
   "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
   ```

   העתיקו את הערך שמופיע ליד **SHA256**. ב־**Project settings > General > Your apps**, בחרו את אפליקציית Android שתואמת ל־`applicationId` שלכם וחפשו את **SHA certificate fingerprints**. אם הטביעה המדויקת חסרה, לחצו **Add fingerprint**, הדביקו אותה ושמרו. אם הפרויקט משתמש במפתח חתימה אחר או שקובץ ה־debug keystore חסר, בנו את גרסת ה־debug והריצו את משימת Gradle בשם `signingReport` כדי למצוא את ה־SHA-256 של הגרסה שאתם מריצים. ספק App Check לתרגול משתמש בטוקן נפרד שאותו רושמים בחלק 2.
3. הורידו את **google-services.json** של אפליקציית Android הזאת אל **שורש מודול app**, לצד קובץ Gradle שלו. אין צורך להדביק את תוכנו במדריך או בקוד Java. הקובץ מזהה את אפליקציית Firebase; הוא אינו קובץ הרשאות של service account.
4. פתחו **AI services > AI Logic > Get started**, בחרו **Gemini Developer API** והשלימו את ההפעלה המודרכת. בדוגמה נשתמש במודל הטקסט `gemini-3.5-flash-lite`; בדקו את [רשימת המודלים העדכנית](https://firebase.google.com/docs/ai-logic/models). בחרו במסלול Developer API ללא תשלום. אין לבחור ספק או מודל שדורשים חיוב; אם התהליך מבקש תשלום, עצרו ובדקו את הספק והמודל שנבחרו.

![בחירת ספק ב־Firebase AI Logic, עם האפשרות Gemini Developer API]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

**בדיקת הפעלת ה־APIs.** חפשו את הודעת **APIs enabled** במהלך ההגדרה המודרכת, ואז השלימו את האשף.

![אשף ההגדרה של Firebase AI Logic עם הודעת APIs enabled]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-apis-enabled.png" | relative_url }})

{: .box-success}
**בדיקת המסלול ללא תשלום:** Spark, ללא קישור ל־Cloud Billing, עם Gemini Developer API ומודל טקסט נתמך שאינו דורש חיוב. נבדק ב־**20 בנובמבר 2026**: המודל `gemini-3.5-flash-lite` תומך במסלול הזה. השימוש ללא תשלום מוגבל במודלים ובמכסות ועשוי להשתנות; בדקו את [רשימת המודלים](https://firebase.google.com/docs/ai-logic/models) ואת [התמחור](https://firebase.google.com/docs/ai-logic/pricing) לפני ההוראה. מסלול שדורש חיוב, כגון Vertex AI / Agent Platform, אינו חלק מהשיעור.


{: .box-warning}
הדוגמה הקטנה שולחת prompt ישיר ואינה כוללת התחברות באמצעות Firebase Authentication. אין להפעיל עבורה **template-only mode** או **authenticated-users mode**. אם הפרויקט השנתי הקיים כבר אוכף אחד מהם, בקשו מהמורה להתאים את הדוגמה; אין לכבות הגנות קיימות. המצבים האלה דוחים את הדוגמה עם `403` או `401`, בהתאמה. [דרישות המצבים](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. בודקים את ה־APIs ומבינים איך הבקשות מקבלות הרשאה

ב[מסוף Google Cloud](https://console.cloud.google.com/apis/dashboard), בחרו את **אותו פרויקט** ופתחו **APIs & Services**. תהליך ההגדרה המודרך אמור להפעיל את השירותים הדרושים. ב־**Library** בדקו את **Firebase AI Logic API**, ששמו הטכני `firebasevertexai.googleapis.com`, ואת **Gemini API** של הספק הנבחר (`generativelanguage.googleapis.com`). כפתור Enable פירושו שהשירות עדיין אינו מופעל בפרויקט הנבחר. השלימו את ההפעלה באמצעות תהליך ההגדרה של Firebase.

![פרטי Firebase AI Logic API במסוף Cloud לפני הפעלה, עם שם השירות הטכני]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

כשמשתמשים ב־Gemini Developer API דרך Firebase AI Logic, ‏Firebase יוצר אוטומטית בפרויקט חשבון שירות שמנוהל על ידי Google, ומשתמש בו כדי לאשר בקשות ל־Gemini. **אין צורך ליצור מפתח Gemini API או להוסיף אותו לאפליקציה. גם קובץ service-account JSON לא מוסיפים לאפליקציה.** [איך Firebase מאשר בקשות ל־Gemini](https://firebase.google.com/docs/ai-logic/faq-and-troubleshooting#api-key)

מפתח Firebase שב־`google-services.json` הוא מזהה פרויקט ואפליקציה, ולא הוכחה שהבקשה מורשית. ב־**APIs & Services > Credentials** הגבילו את מפתח Firebase שבו משתמשת האפליקציה ל־**Android apps**, עם שם החבילה וטביעת SHA-1 של תעודת החתימה, ובחרו רק את ה־APIs הדרושים לאפליקציה, ובהם **Firebase AI Logic API** ו־**Firebase App Check API**. השתמשו בשורת **SHA1** בפלט של `keytool` מסעיף 2, או בחתימה של הגרסה המתאימה בפלט של משימת Gradle בשם `signingReport`. אם אתם בונים את האפליקציה שלכם במחשב נוסף, הוסיפו גם את SHA-1 של תעודת ה־debug שלו. שמרו על ההגבלות שנדרשות לאפליקציות נוספות שרשמתם בעצמכם. [הנחיות הגבלת מפתחות ו־App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 4. מוסיפים את Firebase AI Logic בעזרת Firebase Assistant
{: #firebase-sdk}

1. ב־Android Studio פתחו **Tools > Firebase**. בחלונית **Firebase Assistant** הרחיבו את **Firebase AI Logic** ופתחו את מדריך ההגדרה שלו.
2. ודאו שהמודול `app` מחובר לפרויקט Firebase שבחרתם בסעיף 2. אם העוזר מבקש לבחור פרויקט, בחרו את הפרויקט הקיים שלכם.
3. לחצו **Add the Firebase AI Logic SDK to your app** ואשרו את שינויי Gradle שהעוזר מציג.

![הכפתור Add the Firebase AI Logic SDK to your app בחלונית Firebase Assistant]({{ "/android/topics/firebase-ai-logic/images/firebase-assistant-add-ai-sdk.png" | relative_url }})

בפרויקט המשתמש בקטלוג גרסאות, העוזר מוסיף ל־`libs.versions.toml` רשומות עבור התוסף Google Services והספרייה Firebase AI Logic. הוא מצהיר על התוסף בקובץ Gradle של הפרויקט ומפעיל אותו במודול `app`, שבו הוא מוסיף גם את `implementation(libs.firebase.ai)`. התוסף קורא את `google-services.json` של המודול. אם התוסף והספרייה כבר מוגדרים אצלכם, עוברים ישר לסנכרון. [הוראות Firebase Assistant](https://firebase.google.com/docs/android/setup#assistant).

{: .box-success}
**בדיקת ביניים — הרצה אחרי הוספת ה־SDK.** המתינו לסיום סנכרון Gradle, או בחרו **Sync Project with Gradle Files** אם הסנכרון לא התחיל. לחצו **Run** ב־Android Studio. ודאו שבאמולטור או במכשיר נפתח מסך Hello World או המסך הקיים שלכם. זו נקודת בדיקה נוחה כי האפליקציה הקיימת אמורה לעלות עם הגדרות Gradle החדשות, עוד לפני שתוסיפו את קוד ה־Java של Firebase. כשהמסך נפתח, המשיכו להגדרת App Check.

{: .box-error}
**אם הבנייה נכשלת, בדקו את השגיאה הראשונה של Gradle.** אם `google-services.json` חסר או שהחבילה אינה תואמת, חזרו לסעיף 2 ובדקו שהקובץ נמצא במודול `app` ושנרשם ה־`applicationId` הנכון.

## 5. מגינים על הבקשה באמצעות App Check

במסוף Firebase פתחו **Security > App Check > APIs** וחפשו את השורה **Firebase AI Logic**. ודאו שהסטטוס הוא **Basic – Enforced**. בנובמבר 2026 הפעילה Firebase אכיפת App Check באופן אוטומטי עבור AI Logic. אם אצלכם מופיע **Unenforced**, פעלו לפי ההוראות הרשמיות להפעלת האכיפה הבסיסית. [שלבי App Check הרשמיים](https://firebase.google.com/docs/ai-logic/app-check).

![לשונית APIs ב־App Check עם הסטטוס Basic – Enforced בשורה של Firebase AI Logic]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-app-check-enforced.png" | relative_url }})

**לתרגול משתמשים בספק ה־debug.** משאירים את אפליקציית Android רשומה ב־Firebase כפי שעשיתם בסעיף 2. בלשונית **App Check > Apps** אפשר להשאיר את סטטוס ספק האימות על **Unregistered** ולדלג על **Play Integrity** ועל **Fraud Defense**. בחלק 2 תרשמו את טוקן ה־debug הפרטי של ההתקנה דרך **Manage debug tokens** או בעזרת Firebase CLI. האכיפה נשארת פעילה בזמן התרגול.

### מוסיפים את ספריית App Check לתרגול

ב־**Gradle Scripts > libs.versions.toml**, הוסיפו את השורה הראשונה למקטע `[versions]` הקיים ואת השורה השנייה למקטע `[libraries]` הקיים.

```toml
firebaseAppcheckDebug = "20.1.0"
```

```toml
firebase-appcheck-debug = { module = "com.google.firebase:firebase-appcheck-debug", version.ref = "firebaseAppcheckDebug" }
```

ב־**Gradle Scripts > build.gradle.kts (Module :app)**, הוסיפו למקטע `dependencies` הקיים:

```kotlin
implementation(libs.firebase.appcheck.debug)
```

{: .box-success}
**בדיקת ביניים — הרצה אחרי הוספת App Check.** סנכרנו את Gradle ולחצו **Run**. ודאו שאותו מסך נפתח. אם הסנכרון או פתיחת האפליקציה נכשלים, תקנו את השגיאה לפני שתוסיפו את ה־imports ואת קוד האתחול של Firebase שמופיעים בהמשך.

ספק ה־debug מיועד להרצת תרגול פרטית.

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
        .generativeModel("gemini-3.5-flash-lite");
GenerativeModelFutures model = GenerativeModelFutures.from(ai);
```

הקוד מכין את המשתנה `model` שבו נשתמש בשיעור הבא. הוא **עדיין אינו שולח בקשה ל־LLM**. משאירים אותו בתוך `onCreate`; מאזין הכפתור יתווסף אחריו.

{: .box-error}
**שמות Firebase עדיין אדומים?** חזרו ל[סעיף 4 — Firebase Assistant](#firebase-sdk) ובדקו גם שתלות App Check debug מסעיף 5 נוספה. הקוד דורש את `firebase-ai` ואת `firebase-appcheck-debug`; כתיבת import אינה מורידה את הספרייה. אם דווקא `ActivityMainBinding` אדום, בדקו את סעיף 0, שגיאות XML ויצירת מחלקת View Binding.

{: .box-warning}
**ייתכן שעדיין אין טוקן debug, וזה תקין.** הבקשה המוגנת הראשונה בחלק 2 תיצור אותו. הוראות הרישום נמצאות שם, ליד הלחיצה הראשונה; רישום הטוקן אינו תנאי לסיום העמוד הזה.

שם המודל נלקח מ[רשימת המודלים הנתמכים](https://firebase.google.com/docs/ai-logic/models), שנבדקה ב־20 בנובמבר 2026. אם ייצא משימוש בהמשך, בחרו מודל טקסט נתמך שאינו דורש חיוב.

## 6. נשארים במסלול ללא תשלום ובודקים מוכנות

לפני המעבר לחלק 2, בדקו את המכסה של המודל שבחרתם ב**פרויקט שלכם**. המכסה יכולה להשתנות לפי הפרויקט והמודל. את הבקשה הראשונה תשלחו ב[חלק 2](../). [מגבלות שימוש](https://firebase.google.com/docs/ai-logic/quotas).

מסלול ללא תשלום מאפשר שימוש מוגבל, ולא בקשות ללא הגבלה. השארת הפרויקט ללא קישור ל־Cloud Billing שומרת על ההגדרה ללא אמצעי תשלום. התראת תקציב אינה תחליף להישארות ב־Spark. [דרישות החיוב](https://firebase.google.com/docs/ai-logic/pricing).

{: .box-success}
**ההכנה הושלמה — ממשיכים רק אחרי שהבדיקות האלה עברו:** סנכרון Gradle והבנייה מצליחים; ה־imports של Firebase מזוהים; האפליקציה פותחת את מסך Hello World (או את הממשק שכבר השלמתם). מזהה פרויקט Firebase/Cloud ושם חבילת Android תואמים לקובץ ההגדרות, והתשתית נשארת במסלול Spark ללא קישור לחיוב. זאת בדיקת הכנת האפליקציה; את התשובה החיה הראשונה בודקים בחלק 2.

{: .box-success}
**איך ההגדרה מגינה על מכסת Gemini שלכם.** בקובץ ה־APK שלנו אין מפתח Gemini API. האפליקציה שולחת בקשות ל־Firebase AI Logic, ו־Firebase פונה ל־Gemini מהשרת שלו באמצעות חשבון שירות שמנוהל על ידי Google. ‏App Check מוסיף בדיקה נפרדת לבקשות מהאפליקציה. בחלק 2 תרשמו **טוקן debug** פרטי להתקנת התרגול שלכם. Firebase מחליף אותו ב**טוקן App Check** קצר־תוקף שהאפליקציה שולחת עם הבקשות. שמרו על פרטיות טוקן ה־debug וגרסת התרגול.

{: .box-success}
**לפני הפצה ב־Google Play**, מסירים מגרסת ההפצה את ספק ה־debug ואת טוקן ה־debug. ב־Firebase App Check רושמים את האפליקציה עם [Play Integrity](https://firebase.google.com/docs/app-check/android/play-integrity-provider) ומוסיפים את טביעת ה־SHA-256 של התעודה שחותמת את ה־APK שמופץ דרך Google Play. מגדירים את גרסת ההפצה להשתמש בספק הזה. Firebase משתמש באימות של Play Integrity כדי להנפיק לגרסת ההפצה טוקן App Check. מבטלים את טוקן ה־debug כשמסיימים להשתמש בו.

[ממשיכים לחלק 2 — כפתור אחד ובקשה אחת](../){: data-sequence-nav="next"}
