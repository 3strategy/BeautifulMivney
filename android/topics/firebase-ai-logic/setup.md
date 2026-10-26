---
layout: page
title: "Firebase AI Logic — 1: required project setup"
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

{: .box-warning}
**Start here. This is part 1, required before writing the Firebase code in part 2.** Complete the Android project, View Binding, your Firebase/Cloud project, the configuration file, Gradle dependencies and initialization below. At the end, the app must build and open its existing screen with **no unresolved Firebase imports**. The two consoles manage your backend; Android Studio contains the app that connects to it.

Use **your own Google account and your own Firebase project**, preferably the project for your yearly Android app. Each student manages their own configuration, keys and App Check tokens. Keep this project for later lessons as the app grows. The screenshots were taken from an existing instructor project on 24 October 2026, before AI Logic/App Check activation. They are cropped to exclude account identity, project identifiers, billing data and credentials. They illustrate where to go, not a claim that the example project is protected. No project settings were changed to make these pictures.

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
2. Download that Android app's **google-services.json** into the **app module root**, next to its Gradle file. Do not paste its contents into the tutorial or Java code. It identifies the Firebase app; it is not a service-account credential.
3. Open **AI services > AI Logic > Get started**. Select **Gemini Developer API** and follow the guided activation. For this example choose the supported text model `gemini-3.8-flash` (check the current [model list](https://firebase.google.com/docs/ai-logic/models)). Choose the no-cost Developer API path. Do not choose a provider or model that requires billing; if the flow asks for payment, stop and check the selected provider/model.

![Firebase AI Logic provider selection, with the Gemini Developer API option]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

{: .box-success}
**Free-tier checkpoint:** Spark + no linked Cloud Billing + Gemini Developer API + a supported no-billing text model. Checked on **25 October 2026**: `gemini-3.8-flash` supports this path. Free access has model/usage limits and can change; verify the [model list](https://firebase.google.com/docs/ai-logic/models) and [pricing](https://firebase.google.com/docs/ai-logic/pricing) before teaching. A billing-required path such as Vertex AI / Agent Platform is outside this lesson.


{: .box-warning}
This small example sends a direct prompt and has no Firebase Authentication sign-in. Do not enable **template-only mode** or **authenticated-users mode** for this exercise. If your existing yearly project already enforces either, ask the teacher how to adapt the example; do not turn off existing protections. Those modes reject this example with `403` or `401`, respectively. [Mode requirements](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. Verify the APIs; keep the two key types distinct

In the [Google Cloud console](https://console.cloud.google.com/apis/dashboard), select the **same project**, then open **APIs & Services**. Guided setup should enable the required services; use **Library** to verify **Firebase AI Logic API**, service name `firebasevertexai.googleapis.com`, and the chosen provider's **Gemini API** (`generativelanguage.googleapis.com`). Seeing Enable means that service is not yet enabled in the selected project. Use the Firebase setup flow to complete activation.

![Google Cloud details for Firebase AI Logic API before activation; service name visible]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

The Gemini provider key created by the Firebase workflow stays on the backend: **never put a Gemini API key or service-account JSON in your app**. The Firebase API key in `google-services.json` is a project/app identifier, not proof that a request is authorized. In **APIs & Services > Credentials**, restrict the Firebase key used by this app to **Android apps** (its package name and SHA-1 signing fingerprint) and allow only the Firebase APIs the app needs, including Firebase AI Logic API. Obtain the SHA-1 for the classroom installation with the Gradle `signingReport` task. If you build your app on another computer, add that computer's debug-signing SHA-1 too. Keep any restrictions needed by your own other registered apps. [Key restrictions and App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 4. Add the plugin and libraries, then sync Gradle
{: #firebase-sdk}

{: .box-warning}
**Creating a Firebase project does not add Java libraries to Android Studio.** Complete all three edits below before pasting Firebase imports. We use direct dependency coordinates here, so **no changes to `libs.versions.toml` are required**. Keep its existing template aliases. Do not add a second `plugins`, `android` or `dependencies` block; edit the existing blocks. The excerpts show only the relevant region.

### A. Project-level plugin declaration

Open **Gradle Scripts > build.gradle.kts (Project)** and add one line:

```diff
 plugins {
     alias(libs.plugins.android.application) apply false
+    id("com.google.gms.google-services") version "4.5.0" apply false
 }
```

### B. App-module plugin application

Open **Gradle Scripts > build.gradle.kts (Module :app)**. In its existing `plugins` block:

```diff
 plugins {
     alias(libs.plugins.android.application)
+    id("com.google.gms.google-services")
 }
```

### C. App-module dependencies

In the **same module file**, add the following lines at the start of its existing `dependencies` block. Keep the remaining template dependencies and the whole `android` block:

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

The Firebase BoM chooses compatible Firebase library versions. `firebase-ai` supplies the model classes, `firebase-appcheck-debug` supplies the classroom provider, and Guava supplies Java futures/callbacks. The Google Services plugin reads **your** `app/google-services.json`; it does not replace the library dependencies.

In **app > manifests > AndroidManifest.xml**, add this immediately above `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Now choose **Sync Project with Gradle Files** and wait for successful completion. Then build the app before continuing.

{: .box-error}
**Stop here if Gradle fails.** A missing `google-services.json` means section 2 is incomplete; a package mismatch means its Android registration does not match your `applicationId`. If a plugin/library cannot be resolved, check these two Gradle files, internet access and the first Gradle error. Do not try to fix missing libraries by changing Java imports.

## 5. Protect the request with App Check

Open **Security > App Check > Get started**. Select your registered Android app. This tutorial uses **one setup for your own app**, with the **App Check debug provider** on the emulator or test device. Each installation registers a private token; Firebase accepts that token instead of asking for device attestation. It does not sign a user in. Current guided AI Logic setup automatically enforces App Check; older projects must check **App Check > APIs > Firebase AI Logic** and enforce it explicitly. Do not bypass a failed test by disabling enforcement. [Official App Check steps](https://firebase.google.com/docs/ai-logic/app-check).

![Firebase App Check starting screen, before registration]({{ "/android/topics/firebase-ai-logic/images/app-check-start.jpg" | relative_url }})

As of this page's check date, Google states that App Check enforcement becomes required for AI Logic on **2 November 2026**. Prepare it now rather than making an unprotected first version. [Security checklist](https://firebase.google.com/docs/ai-logic/security-checklist).

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
        .generativeModel("gemini-3.8-flash");
GenerativeModelFutures model = GenerativeModelFutures.from(ai);
```

This prepares the Java `model` used in the next lesson. It does **not** send an LLM request yet. Keep this code in `onCreate`; the button listener will be added after it.

{: .box-error}
**Firebase names still red?** Return to [section 4 — plugin, dependencies and Sync](#firebase-sdk). The code above requires `firebase-ai` and `firebase-appcheck-debug`; importing a class does not download its library. If `ActivityMainBinding` is red instead, check section 0, XML errors and View Binding generation.

{: .box-warning}
**There may be no debug token yet. That is expected.** The first protected request in part 2 generates it. Token registration is explained there, beside the first click; it is not a prerequisite for finishing this page.

The model name comes from the [supported-model list](https://firebase.google.com/docs/ai-logic/models), checked on 25 October 2026. Choose a supported no-billing text model if it is retired later.

## 6. Stay within the free tier and check readiness

Check the selected model's actual quota in **your project**; there is no guaranteed fixed allowance for every student. Send short prompts and make one request at a time. If you receive `429`, inspect the quota/reset information and wait; do not enable billing or add automatic retries to get past the limit. [Rate limits](https://firebase.google.com/docs/ai-logic/quotas).

Free tier means limited use, not unlimited requests. Keeping Cloud Billing unlinked preserves the no-payment setup. A budget alert is not a substitute for staying on Spark. [Billing requirements](https://firebase.google.com/docs/ai-logic/pricing).

{: .box-success}
**Setup complete — proceed only after these checks pass:** Gradle sync and build succeed; the Firebase imports above resolve; the app opens its Hello World screen (or the UI you already completed). The Firebase/Cloud project ID and Android package match your configuration, and the backend remains on Spark without linked billing. This checks the app setup; the first live response is tested in part 2.

[Continue to 2 — one button and one request](../){: data-sequence-nav="next"}
