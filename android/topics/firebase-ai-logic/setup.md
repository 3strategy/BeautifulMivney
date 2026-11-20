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

To practice sending an HTTP request and parsing JSON, see the [Gemini Interactions API lesson (Hebrew)]({{ '/android/unsorted/LLM-using-google-interactions-api/' | relative_url }}?lang=he).

{: .box-warning}
**Start here. This is part 1, required before writing the Firebase code in part 2.** Complete the Android project, View Binding, your Firebase/Cloud project, the configuration file, Gradle dependencies and initialization below. At the end, the app must build and open its existing screen with **no unresolved Firebase imports**. The two consoles manage your backend; Android Studio contains the app that connects to it.

Use **your own Google account and your own Firebase project**, preferably the project for your yearly Android app. Each student manages their own configuration, keys and App Check tokens. Keep this project for later lessons as the app grows. The console screenshots show the setup screens and the checkpoints to look for in your own project.

## 0. Create or open the Android project; prepare View Binding

For a new Android project, choose **Empty Views Activity**, **Java** and XML, with your own app name/package. Keep your package and SDK settings (API 24 or higher). `com.example.topic` is only our example. If you already have the UI or View Binding working, keep it and skip the completed edits below.

[Download the View Binding baseline ZIP]({{ '/android/topics/firebase-ai-logic/downloads/baseline.zip' | relative_url }}). Extract it into a new folder, open its **Topic3** folder in Android Studio, and let Gradle sync. This is the Empty Views template with View Binding enabled and `MainActivity` already converted, including the `binding` field. It contains no Firebase configuration or AI code. Connect it to **your own Firebase project** in the following sections; do not overwrite an existing yearly project with the ZIP.

If you created your own Empty Views project, perform the shared conversion below first. If you downloaded the prepared ZIP or already use View Binding, read the explanation and **skip the conversion edits**. Keep your own package and SDK settings; `com.example.topic` and API 37 describe the downloadable example.

{% include android/en/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

{: .box-success}
**Checkpoint A — Android:** Both starting routes should now have `private ActivityMainBinding binding;` and use `binding.getRoot()` in `setContentView`. **Build and run**: the Hello World screen (or your existing UI) should still appear. Continue from this state.

## 1. Prepare your own yearly-project backend on Spark

1. Sign in to the [Firebase console](https://console.firebase.google.com/) with **your own account**. Reuse your yearly-project Firebase project if you already have one; otherwise choose **Create a project** and give it a name you can keep for the year. Google Analytics is optional for this lesson.
2. Check that the project is on the **Spark (no-cost)** plan. Keep it **unlinked from Cloud Billing**: do not add a payment method, activate a Cloud billing trial, or upgrade to Blaze for this exercise.
3. Open the [Google Cloud console](https://console.cloud.google.com/) with the same account and select the **same project ID**. Firebase automatically creates the underlying Cloud project; these are two consoles for one project, not two projects to create. [Project relationship](https://firebase.google.com/docs/projects/learn-more), [initial setup](https://firebase.google.com/docs/ai-logic/get-started?platform=android).

{: .box-warning}
If your existing yearly-project backend is already on Blaze, pause and ask the teacher how to handle it; do not change its billing plan as part of this lesson. Later yearly-project features may require a separate cost decision. This lesson does not require a paid feature.

## 2. Register the Android app and select the provider

1. In the [Firebase console](https://console.firebase.google.com/), select your own project. Open **Project settings > General > Your apps**. Reuse the Android registration if its package already matches your app; otherwise choose **Add app > Android** and register the exact `applicationId` from your module Gradle file. `com.example.topic` is only the code example: keep your own yearly app's package.
2. **Check the debug signing SHA-256.** In Windows **Command Prompt (cmd.exe)**, run this command on the computer that builds your app.

   ```bat
   "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
   ```

   Copy the value next to **SHA256** in the output. In **Project settings > General > Your apps**, select the Android app with your `applicationId` and find **SHA certificate fingerprints**. If that exact SHA-256 is missing, choose **Add fingerprint**, paste it, and save. If the project uses a different signing key or the default debug keystore is missing, build the debug app and use the Gradle `signingReport` task to find the SHA-256 of the variant you run. The classroom App Check debug provider uses a separate token registered in part 2.
3. Download that Android app's **google-services.json** into the **app module root**, next to its Gradle file. Do not paste its contents into the tutorial or Java code. It identifies the Firebase app; it is not a service-account credential.
4. Open **AI services > AI Logic > Get started**. Select **Gemini Developer API** and follow the guided activation. For this example choose the supported text model `gemini-3.5-flash-lite` (check the current [model list](https://firebase.google.com/docs/ai-logic/models)). Choose the no-cost Developer API path. Do not choose a provider or model that requires billing; if the flow asks for payment, stop and check the selected provider/model.

![Firebase AI Logic provider selection, with the Gemini Developer API option]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

**API checkpoint.** Look for the **APIs enabled** confirmation during the guided setup, then finish the wizard.

![Firebase AI Logic setup showing the APIs enabled confirmation]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-apis-enabled.png" | relative_url }})

{: .box-success}
**Free-tier checkpoint:** Spark + no linked Cloud Billing + Gemini Developer API + a supported no-billing text model. Checked on **20 November 2026**: `gemini-3.5-flash-lite` supports this path. Free access has model/usage limits and can change; verify the [model list](https://firebase.google.com/docs/ai-logic/models) and [pricing](https://firebase.google.com/docs/ai-logic/pricing) before teaching. A billing-required path such as Vertex AI / Agent Platform is outside this lesson.


{: .box-warning}
This small example sends a direct prompt and has no Firebase Authentication sign-in. Do not enable **template-only mode** or **authenticated-users mode** for this exercise. If your existing yearly project already enforces either, ask the teacher how to adapt the example; do not turn off existing protections. Those modes reject this example with `403` or `401`, respectively. [Mode requirements](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. Verify the APIs and understand how requests are authorized

In the [Google Cloud console](https://console.cloud.google.com/apis/dashboard), select the **same project**, then open **APIs & Services**. Guided setup should enable the required services; use **Library** to verify **Firebase AI Logic API**, service name `firebasevertexai.googleapis.com`, and the chosen provider's **Gemini API** (`generativelanguage.googleapis.com`). Seeing Enable means that service is not yet enabled in the selected project. Use the Firebase setup flow to complete activation.

![Google Cloud details for Firebase AI Logic API before activation; service name visible]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

When you use the Gemini Developer API through Firebase AI Logic, Firebase automatically provisions a Google-managed service account in your Firebase project and uses it to authorize requests to Gemini. **You don’t need to create a Gemini API key or put one in the app. Do not add a service-account JSON file to the app either.** [How Firebase authorizes Gemini requests](https://firebase.google.com/docs/ai-logic/faq-and-troubleshooting#api-key)

The Firebase API key in `google-services.json` is a project/app identifier, not proof that a request is authorized. In **APIs & Services > Credentials**, restrict the Firebase key used by this app to **Android apps** (its package name and SHA-1 signing fingerprint) and allow only the Firebase APIs the app needs, including **Firebase AI Logic API** and **Firebase App Check API**. Use the **SHA1** line from the `keytool` output in section 2 (or the matching variant in Gradle `signingReport`). If you build your app on another computer, add that computer's debug-signing SHA-1 too. Keep any restrictions needed by your own other registered apps. [Key restrictions and App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 4. Add Firebase AI Logic with Firebase Assistant
{: #firebase-sdk}

1. In Android Studio, open **Tools > Firebase**. In **Firebase Assistant**, expand **Firebase AI Logic** and open its setup guide.
2. Verify that the `app` module is connected to the Firebase project you selected in section 2. If the Assistant asks you to choose a project, select your existing project.
3. Click **Add the Firebase AI Logic SDK to your app** and accept the Gradle changes shown by the Assistant.

![The Add the Firebase AI Logic SDK to your app button in Firebase Assistant]({{ "/android/topics/firebase-ai-logic/images/firebase-assistant-add-ai-sdk.png" | relative_url }})

In a project that uses a version catalog, the Assistant adds entries for the Google Services plugin and the Firebase AI Logic library to `libs.versions.toml`. It declares the plugin in the project Gradle file and applies it in the `app` module, where it also adds `implementation(libs.firebase.ai)`. The plugin reads the module's `google-services.json`. If the plugin and library are already configured, go straight to Gradle sync. [Firebase Assistant instructions](https://firebase.google.com/docs/android/setup#assistant).

{: .box-success}
**Checkpoint — run after adding the SDK.** Wait for Gradle sync to finish, or choose **Sync Project with Gradle Files** if it has not started. Click **Run** in Android Studio. On the emulator or device, confirm that the app opens to Hello World or your existing screen. This is a good point to run because the existing app should still start with the new Gradle setup, before you add the Firebase Java code. Once the screen opens, continue to App Check.

{: .box-error}
**If the build fails, check the first Gradle error.** If `google-services.json` is missing or the package does not match, return to section 2 and verify that the file is in the `app` module and that you registered the correct `applicationId`.

## 5. Protect the request with App Check

In the Firebase console, open **Security > App Check > APIs** and find **Firebase AI Logic**. Verify that its status is **Basic – Enforced**. Firebase automatically enforced App Check for AI Logic in November 2026. If your row shows **Unenforced**, follow Firebase’s instructions to enable baseline enforcement. [Official App Check steps](https://firebase.google.com/docs/ai-logic/app-check).

![App Check APIs tab showing Firebase AI Logic with Basic – Enforced status]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-logic-app-check-enforced.png" | relative_url }})

**Use the debug provider for this exercise.** Keep the Android app registration from section 2. Under **App Check > Apps**, you can leave the production provider status **Unregistered** and skip both **Play Integrity** and **Fraud Defense**. In part 2 you’ll register the private debug token for your installation through **Manage debug tokens** or the Firebase CLI. Enforcement stays enabled while you test.

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

{: .box-success}
**Checkpoint — run after adding App Check.** Sync Gradle and click **Run**. Confirm that the same screen opens. If sync or startup fails, fix the error before adding the Firebase imports and initialization below.

Use the debug provider for private development builds.

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

This prepares the Java `model` used in the next lesson. It does **not** send an LLM request yet. Keep this code in `onCreate`; the button listener will be added after it.

{: .box-error}
**Firebase names still red?** Return to [section 4 — Firebase Assistant](#firebase-sdk) and check that you added the App Check debug dependency in section 5. The code above requires `firebase-ai` and `firebase-appcheck-debug`; importing a class does not download its library. If `ActivityMainBinding` is red instead, check section 0, XML errors and View Binding generation.

{: .box-warning}
**There may be no debug token yet. That is expected.** The first protected request in part 2 generates it. Token registration is explained there, beside the first click; it is not a prerequisite for finishing this page.

The model name comes from the [supported-model list](https://firebase.google.com/docs/ai-logic/models), checked on 20 November 2026. Choose a supported no-billing text model if it is retired later.

## 6. Stay within the free tier and check readiness

Before moving to part 2, check the selected model's quota in **your project**. Quotas can vary by project and model. You'll send the first request in [part 2](../). [Rate limits](https://firebase.google.com/docs/ai-logic/quotas).

Free tier means limited use, not unlimited requests. Keeping Cloud Billing unlinked preserves the no-payment setup. A budget alert is not a substitute for staying on Spark. [Billing requirements](https://firebase.google.com/docs/ai-logic/pricing).

{: .box-success}
**Setup complete — proceed only after these checks pass:** Gradle sync and build succeed; the Firebase imports above resolve; the app opens its Hello World screen (or the UI you already completed). The Firebase/Cloud project ID and Android package match your configuration, and the backend remains on Spark without linked billing. This checks the app setup; the first live response is tested in part 2.

{: .box-success}
**Why this protects your Gemini quota.** Our APK contains no Gemini API key. The app sends requests to Firebase AI Logic, and Firebase calls Gemini from its backend using a Google-managed service account. App Check adds a separate check for requests from the app. In part 2, you register a private **debug token** for your test installation. Firebase exchanges it for a short-lived **App Check token** that the app sends with its requests. Keep the debug token and debug build private.

{: .box-success}
**Before releasing on Google Play**, remove the debug provider and any debug token from the release build. Register the app for [Play Integrity in Firebase App Check](https://firebase.google.com/docs/app-check/android/play-integrity-provider) using the SHA-256 of the certificate that signs the APK delivered by Google Play, then configure the release build to use that provider. Firebase uses the Play Integrity attestation to issue the App Check token for the release app. Revoke the debug token when you finish using it.

[Continue to 2 — one button and one request](../){: data-sequence-nav="next"}
