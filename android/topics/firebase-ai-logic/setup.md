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

## 0. Open an Android project with View Binding

Use your yearly project, or start with an **Empty Views Activity** in **Java** (API 24 or higher). If you need a starter, [download the View Binding ZIP]({{ '/android/topics/firebase-ai-logic/downloads/baseline.zip' | relative_url }}), extract it and open **Topic3** in Android Studio. The ZIP already has View Binding.

<details markdown="1">
<summary>Enable View Binding in an existing project</summary>

{% include android/en/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

</details>

Run the app and check that your existing screen opens with `binding.getRoot()` as its content view.

## 1. Install and sign in to Firebase CLI
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

## 2. Connect with the Gemini setup wizard and add the SDK
{: #firebase-sdk}

1. In Android Studio, open **Tools > Firebase**. In the **Firebase Assistant** pane on the right, expand **Firebase AI Logic** and open the Gemini setup guide.
2. Click **Connect to Firebase**. Finish the browser flow with your Google account and select your yearly Firebase project or create one on **Spark** (no linked Cloud Billing). The wizard registers the Android app using its `applicationId` and places `google-services.json` in the `app` module automatically. Verify the project and app in the **Firebase console > Project settings > General > Your apps**. [Firebase Assistant instructions](https://firebase.google.com/docs/android/setup#assistant).
3. Back in the same pane, click **Add the Firebase AI Logic SDK to your app** and accept the Gradle changes. Sync Gradle and run the app. Your existing screen should still open.

![The Add the Firebase AI Logic SDK to your app button in the right-hand Firebase Assistant pane]({{ "/android/topics/firebase-ai-logic/images/firebase-assistant-add-ai-sdk.png" | relative_url }})

## 3. Add the debug SHA-256 fingerprint
{: #sha-256}

In Android Studio's terminal, run this from the project root on the computer that builds your app. On **Windows** (PowerShell or Command Prompt):

```powershell
.\gradlew.bat :app:signingReport
```

<details markdown="1">
<summary>macOS — Terminal command</summary>

```bash
./gradlew :app:signingReport
```

</details>

Copy the **SHA-256** value for **Variant: debug**. If the report says the debug keystore is missing, run the debug app and repeat the command. In the **Firebase console > Project settings > General > Your apps**, select the Android app matching your `applicationId`, click **Add fingerprint**, and save the value.

## 4. Enable Gemini Developer API

In the **Firebase console**, open **AI services > AI Logic > Get started**. Choose **Gemini Developer API** and follow the wizard to **APIs enabled**. This lesson uses `gemini-3.5-flash-lite` on Spark. [Supported models](https://firebase.google.com/docs/ai-logic/models) · [Pricing](https://firebase.google.com/docs/ai-logic/pricing).

![Firebase AI Logic setup showing the APIs enabled confirmation]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-apis-enabled.png" | relative_url }})

<details markdown="1">
<summary>API key restrictions and existing projects</summary>

Firebase calls Gemini from its backend. In the Google Cloud console, select the same **Project ID** and go to **APIs & Services > Credentials**. Restrict the app's Firebase API key to **Android apps** using the package name and the **SHA-1** from the same signing report. Allow the APIs the app uses, including **Firebase AI Logic API** and **Firebase App Check API**.

If your existing yearly project uses Blaze or already enforces **template-only** or **authenticated-users** mode, check with your teacher before proceeding. Keep existing protections in place. [Firebase AI Logic security checklist](https://firebase.google.com/docs/ai-logic/security-checklist).

</details>

## 5. Protect the request with App Check

In the Firebase console, open **Security > App Check > APIs**. Check that **Firebase AI Logic** shows **Basic – Enforced**. If needed, [enable App Check enforcement](https://firebase.google.com/docs/ai-logic/app-check).

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

In **app > kotlin+java > your package > MainActivity**, add these imports below the existing ones. The View Binding import and field are already present from section 0.

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

Sync Gradle and run the app. Check that the Firebase imports resolve and the app opens its existing screen. If `google-services.json` is missing or the package does not match, return to [the Firebase Assistant](#firebase-sdk) and check which app and project are connected.

The first request and debug token registration happen in Lesson 2. Here’s the result you’ll see after a successful request.

![A successful Gemini response displayed below the Ask LLM button in the emulator]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-live-response.png" | relative_url }})

For a release build, use the [Play Integrity provider](https://firebase.google.com/docs/app-check/android/play-integrity-provider) in place of the debug provider.

[Continue to 2 — one button and one request](../){: data-sequence-nav="next"}
