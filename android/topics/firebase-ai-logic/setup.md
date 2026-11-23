---
layout: page
title: "Firebase AI Logic (LLM) — 1: required project setup"
subtitle: "Android, View Binding, Firebase and Gradle — complete before the request lesson"
permalink: /android/topics/firebase-ai-logic/setup/
lang: en
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, callbacks]
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

[Next: 2 — button and request](../) · [עברית]({{ '/android/topics/firebase-ai-logic/he/setup/' | relative_url }}?lang=he)

Use your own Google account and Firebase project. In this lesson, connect the app and verify that it builds. In part 2, you’ll send the first Gemini request.

## 1. Create the Topic project

In Android Studio, create a project named **Topic** with the **Empty Views Activity** template and **Java**. Enable View Binding and convert `MainActivity` using the guide below.

For a shorter copy-and-paste route, enable View Binding in Gradle, then use the **After** example in [TicTacMenu 019b, step 1 (Hebrew)]({{ '/android/projectSteps/019bBindingsForMainActivity/' | relative_url }}#שלב-1---האתחול-הבסיסי-של-mainactivity). Use your own package in the `ActivityMainBinding` import and keep the rest of your `MainActivity`.

{% include android/en/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

## 2. Connect Firebase in Android Studio

1. Open **Tools > Firebase**. In the **Firebase Assistant** pane on the right, expand **AI Logic** (shown as **Firebase AI Logic** in some versions).
2. Click **Get started with Firebase AI Logic [Java]**.
3. Click **Connect to Firebase**. In the browser, choose your Firebase project or create one on **Spark**. Confirm the connection and accept the changes. The wizard registers the Android app with its `applicationId` and adds `google-services.json` to the `app` module. [Firebase Assistant instructions](https://firebase.google.com/docs/android/setup#assistant).
4. Back in Android Studio, choose **Sync Project with Gradle Files**.

## 3. Add the debug SHA-256 fingerprint
{: #sha-256}

On **Windows**, open **Command Prompt (cmd.exe)** and run this command. Copy the value next to **SHA256**.

```bat
"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

<details markdown="1">
<summary>macOS — Terminal command</summary>

Open **Terminal** in the **Topic** project folder (the folder containing `gradlew`).

```bash
./gradlew :app:signingReport
```

Copy the **SHA-256** value for **Variant: debug**.

</details>

If the debug keystore is missing, build the debug APK in Android Studio and repeat the command.

In the browser, open the [Firebase console](https://console.firebase.google.com/) and select the project you connected in step 2.

1. Click the gear next to **Project Overview** and choose **Project settings**.
2. On the **General** tab, scroll to **Your apps** and select the Android app whose package name matches your `applicationId`.
3. Under **SHA certificate fingerprints**, click **Add fingerprint**. Paste the copied SHA-256 value into the field and click **Save**. Check that it appears in the list as **SHA-256**.

## 4. Add the Firebase AI Logic SDK
{: #firebase-sdk}

In the same right-hand pane, click **Add the Firebase AI Logic SDK to your app**, accept the changes, and sync Gradle.

![The Add the Firebase AI Logic SDK to your app button in the right-hand Firebase Assistant pane]({{ "/android/topics/firebase-ai-logic/images/firebase-assistant-add-ai-sdk.png" | relative_url }})

## 5. Enable Gemini Developer API

In the **Firebase console**, open **AI services > AI Logic > Get started**. Choose **Gemini Developer API** and click **Enable**. If the hourglass keeps spinning, refresh the AI Logic page and continue once the console confirms **APIs enabled**. This lesson uses `gemini-3.5-flash-lite` on Spark. [Supported models](https://firebase.google.com/docs/ai-logic/models) · [Pricing](https://firebase.google.com/docs/ai-logic/pricing).

![Firebase AI Logic setup showing the APIs enabled confirmation]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-apis-enabled.png" | relative_url }})

<details markdown="1">
<summary>API key restrictions and existing projects</summary>

Firebase calls Gemini from its backend. In the Google Cloud console, select the same **Project ID** and go to **APIs & Services > Credentials**. Restrict the app's Firebase API key to **Android apps** using the package name and the **SHA-1** from the same command output. Allow the APIs the app uses, including **Firebase AI Logic API** and **Firebase App Check API**.

If your existing yearly project uses Blaze or already enforces **template-only** or **authenticated-users** mode, check with your teacher before proceeding. Keep existing protections in place. [Firebase AI Logic security checklist](https://firebase.google.com/docs/ai-logic/security-checklist).

</details>

## 6. Install Firebase CLI before the first run
{: #firebase-cli}

You'll use the CLI to register your App Check debug token in Lesson 2. On **Windows**, open **Command Prompt**. If Node.js and npm are missing, install Node.js LTS and open a new Command Prompt.

```bat
winget install --id OpenJS.NodeJS.LTS --exact
```

On **macOS**, install [Node.js LTS](https://nodejs.org/en/download) if needed and use **Terminal**. On either system, run the installation and sign-in commands.

```bash
npm install -g firebase-tools@latest
firebase --version
firebase login
firebase appcheck:debugtokens:create --help
```

Sign in with the Google account that owns or manages your Firebase project. The last command should display help for registering a token. [Firebase CLI installation guide](https://firebase.google.com/docs/cli/).

**First run.** After signing in, click **Run** in Android Studio and confirm that the app opens its existing screen. If you use Git for the Android project, you can commit and optionally push this checkpoint.

## 7. Protect the request with App Check

In the Firebase console, open **Security > App Check > APIs**. Check that **Firebase AI Logic** shows **Basic – Enforced**. If needed, [enable App Check enforcement](https://firebase.google.com/docs/ai-logic/app-check).

![Firebase AI Logic with Basic – Enforced status on the App Check APIs tab]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-app-check-enforced.png" | relative_url }})

For this private debug build, leave the production provider unregistered. In part 2, you’ll use Firebase CLI to register the debug token from Logcat while enforcement stays on.

### Add the App Check library for development

In **Gradle Scripts > libs.versions.toml**, add the first line to the existing `[versions]` section and the second to the existing `[libraries]` section.

```toml
firebaseAppcheckDebug = "20.1.0"
```

```toml
firebase-appcheck-debug = { module = "com.google.firebase:firebase-appcheck-debug", version.ref = "firebaseAppcheckDebug" }
```

In **Gradle Scripts > build.gradle.kts (Module :app)**, add this line to the existing `dependencies` block:

```kotlin
implementation(libs.firebase.appcheck.debug)
```

### Initialize Firebase and the model in MainActivity

In **app > kotlin+java > your package > MainActivity**, add these imports below the existing ones. The View Binding import and field are already present from section 1.

```java
import com.google.firebase.FirebaseApp;
import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;
import com.google.firebase.ai.FirebaseAI;
import com.google.firebase.ai.GenerativeModel;
import com.google.firebase.ai.java.GenerativeModelFutures;
import com.google.firebase.ai.type.GenerativeBackend;
```

Inside the existing `onCreate`, **after** the insets listener's closing `});` and **before** the closing brace of `onCreate`, add:

```java
FirebaseApp.initializeApp(this);
// Install before creating the AI client; register the token at the first request.
FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
        DebugAppCheckProviderFactory.getInstance());
GenerativeModel ai = FirebaseAI.getInstance(GenerativeBackend.googleAI())
        .generativeModel("gemini-3.5-flash-lite");
GenerativeModelFutures model = GenerativeModelFutures.from(ai);
```

Sync Gradle and run the app. Check that the Firebase imports resolve and the app opens its existing screen. Commit the working setup in your Android project if you’re using Git.

The first request and debug token registration happen in Lesson 2. Here’s the result you’ll see after a successful request.

![A successful Gemini response displayed below the Ask LLM button in the emulator]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-live-response.png" | relative_url }})

For a release build, use the [Play Integrity provider](https://firebase.google.com/docs/app-check/android/play-integrity-provider) in place of the debug provider.

[Continue to 2 — one button and one request](../){: data-sequence-nav="next"}
