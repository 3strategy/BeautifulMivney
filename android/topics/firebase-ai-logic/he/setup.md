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

השתמשו בחשבון Google ובפרויקט Firebase משלכם. בשיעור הזה מחברים את האפליקציה ובודקים שהיא נבנית. בחלק 2 שולחים את הבקשה הראשונה ל־Gemini.

## 1. יוצרים את הפרויקט Topic

ב־Android Studio צרו פרויקט בשם **Topic**. בחרו בתבנית **Empty Views Activity** ובשפת **Java**. הפעילו View Binding והסבו את `MainActivity` לפי המדריך שלמטה.

אם אתם מעדיפים דוגמה קצרה להעתקה, הפעילו View Binding ב־Gradle והשתמשו בדוגמת **אחרי** ב[שלב 1 של שיעור 019b ב־TicTacMenu]({{ '/android/projectSteps/019bBindingsForMainActivity/' | relative_url }}#שלב-1---האתחול-הבסיסי-של-mainactivity). התאימו את ה־import של `ActivityMainBinding` לשם החבילה שלכם והשאירו את שאר הקוד של `MainActivity`.

{% include android/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

## 2. מחברים את Firebase מתוך Android Studio

1. פתחו **Tools > Firebase**. בחלונית **Firebase Assistant** מימין הרחיבו את **AI Logic** (בחלק מהגרסאות **Firebase AI Logic**) ופתחו את מדריך ההגדרה של Gemini.
2. לחצו **Connect to Firebase**. בדפדפן בחרו בפרויקט Firebase שלכם או צרו פרויקט במסלול **Spark**. אשרו את החיבור ואת השינויים. האשף רושם את האפליקציה לפי ה־`applicationId` ומוסיף את `google-services.json` למודול `app`. [הוראות Firebase Assistant](https://firebase.google.com/docs/android/setup#assistant).
3. חזרו ל־Android Studio ובחרו **Sync Project with Gradle Files**.

## 3. מוסיפים את טביעת ה־SHA-256 של חתימת ה־debug
{: #sha-256}

ב־**Windows** פתחו **Command Prompt** בתיקיית הפרויקט **Topic** (התיקייה שבה נמצא `gradlew.bat`) והריצו את הפקודה.

```powershell
.\gradlew.bat :app:signingReport
```

<details markdown="1">
<summary>macOS — פקודה ל־Terminal</summary>

פתחו **Terminal** בתיקיית הפרויקט **Topic** (התיקייה שבה נמצא `gradlew`).

```bash
./gradlew :app:signingReport
```

</details>

העתיקו את ערך **SHA-256** עבור **Variant: debug**. אם הדוח מציין שקובץ החתימה של debug חסר, בנו APK בגרסת debug ב־Android Studio והריצו שוב את הפקודה. ב־**Firebase console > Project settings > General > Your apps**, בחרו באפליקציית Android שתואמת ל־`applicationId` שלכם, לחצו **Add fingerprint** ושמרו את הערך.

## 4. מוסיפים את ה־SDK של Firebase AI Logic
{: #firebase-sdk}

באותה חלונית מימין לחצו **Add the Firebase AI Logic SDK to your app**, אשרו את השינויים וסנכרנו את Gradle.

![הכפתור Add the Firebase AI Logic SDK to your app בחלונית Firebase Assistant מימין]({{ "/android/topics/firebase-ai-logic/images/firebase-assistant-add-ai-sdk.png" | relative_url }})

## 5. מפעילים את Gemini Developer API

במסוף Firebase פתחו **AI services > AI Logic > Get started**. בחרו **Gemini Developer API** ולחצו **Enable**. אם סמל ההמתנה ממשיך להסתובב, רעננו את דף AI Logic והמשיכו כשהמסוף מציג **APIs enabled**. בשיעור נשתמש ב־`gemini-3.5-flash-lite` במסלול Spark. [מודלים נתמכים](https://firebase.google.com/docs/ai-logic/models) · [תמחור](https://firebase.google.com/docs/ai-logic/pricing).

![אשף ההגדרה של Firebase AI Logic עם הודעת APIs enabled]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-apis-enabled.png" | relative_url }})

<details markdown="1">
<summary>הגבלות מפתח API והגדרות בפרויקט קיים</summary>

Firebase פונה ל־Gemini מהשרת שלו. במסוף Google Cloud בחרו את אותו **Project ID** ופתחו **APIs & Services > Credentials**. הגבילו את מפתח Firebase של האפליקציה ל־**Android apps** באמצעות שם החבילה וטביעת **SHA-1** מאותו דוח חתימה. אפשרו את ה־APIs שהאפליקציה צריכה, ובהם **Firebase AI Logic API** ו־**Firebase App Check API**.

אם הפרויקט השנתי כבר במסלול Blaze, או שכבר מופעל בו מצב **template-only** או **authenticated-users**, בדקו עם המורה איך להמשיך. שמרו על ההגנות הקיימות. [הנחיות האבטחה של Firebase AI Logic](https://firebase.google.com/docs/ai-logic/security-checklist).

</details>

## 6. מתקינים את Firebase CLI לפני ההרצה הראשונה
{: #firebase-cli}

בחלק 2 תשתמשו ב־CLI כדי לרשום את טוקן ה־debug של App Check. ב־**Windows** פתחו **Command Prompt**. אם Node.js ו־npm חסרים, התקינו את Node.js LTS ופתחו חלון Command Prompt חדש.

```bat
winget install --id OpenJS.NodeJS.LTS --exact
```

ב־**macOS** התקינו [Node.js LTS](https://nodejs.org/en/download) לפי הצורך ופתחו **Terminal**. בשתי המערכות הריצו את פקודות ההתקנה וההתחברות.

```bash
npm install -g firebase-tools@latest
firebase --version
firebase login
firebase appcheck:debugtokens:create --help
```

התחברו עם חשבון Google שבאמצעותו אתם מנהלים את פרויקט Firebase. הפקודה האחרונה אמורה להציג עזרה על רישום טוקן. [מדריך ההתקנה של Firebase CLI](https://firebase.google.com/docs/cli/).

**הרצה ראשונה.** אחרי ההתחברות לחצו **Run** ב־Android Studio ובדקו שהמסך הקיים נפתח. אם אתם משתמשים ב־Git בפרויקט Android, אפשר לשמור את השלב הזה ב־commit ולדחוף אותו לפי הצורך.

## 7. מגינים על הבקשה באמצעות App Check

במסוף Firebase פתחו **Security > App Check > APIs** ובדקו שליד **Firebase AI Logic** מופיע **Basic – Enforced**. לפי הצורך, [הפעילו אכיפה של App Check](https://firebase.google.com/docs/ai-logic/app-check).

![סטטוס Basic – Enforced עבור Firebase AI Logic בלשונית APIs של App Check]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-app-check-enforced.png" | relative_url }})

בגרסת ה־debug הפרטית אפשר להשאיר את ספק האימות להפצה במצב **Unregistered**. בחלק 2 תשתמשו ב־Firebase CLI כדי לרשום את טוקן ה־debug מ־Logcat כשהאכיפה נשארת פעילה.

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

### מאתחלים את Firebase ואת המודל ב־MainActivity

ב־**app > kotlin+java > החבילה שלכם > MainActivity**, הוסיפו את ה־imports הבאים מתחת לקיימים. ה־import והשדה של View Binding כבר קיימים מסעיף 1.

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

סנכרנו את Gradle והריצו את האפליקציה. בדקו שה־imports של Firebase מזוהים ושהמסך הקיים נפתח. אם אתם משתמשים ב־Git, שמרו את ההגדרות ב־commit בפרויקט Android שלכם.

בחלק 2 תשלחו את הבקשה הראשונה ותרשמו את טוקן ה־debug. כך נראית האפליקציה אחרי בקשה מוצלחת.

![תשובה מוצלחת מ־Gemini מופיעה מתחת לכפתור Ask LLM באמולטור]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-live-response.png" | relative_url }})

בגרסת הפצה מחליפים את ספק ה־debug ב[ספק Play Integrity](https://firebase.google.com/docs/app-check/android/play-integrity-provider).

[ממשיכים לחלק 2 — כפתור אחד ובקשה אחת](../){: data-sequence-nav="next"}
