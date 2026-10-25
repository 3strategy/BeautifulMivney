---
layout: page
title: "Firebase AI Logic — secure Google-side setup"
subtitle: "Your own yearly-project backend, starting on the free tier"
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

[Back to the app tutorial](../) · [עברית]({{ '/android/topics/firebase-ai-logic/he/setup/' | relative_url }}?lang=he)

Use **your own Google account and your own Firebase project**, preferably the project for your yearly Android app. Each student manages their own configuration, keys and App Check tokens. Keep this project for later lessons as the app grows. The screenshots were taken from an existing instructor project on 24 October 2026, before AI Logic/App Check activation. They are cropped to exclude account identity, project identifiers, billing data and credentials. They illustrate where to go, not a claim that the example project is protected. No project settings were changed to make these pictures.

## 0. Prepare your own yearly-project backend on Spark

1. Sign in to the [Firebase console](https://console.firebase.google.com/) with **your own account**. Reuse your yearly-project Firebase project if you already have one; otherwise choose **Create a project** and give it a name you can keep for the year. Google Analytics is optional for this lesson.
2. Check that the project is on the **Spark (no-cost)** plan. Keep it **unlinked from Cloud Billing**: do not add a payment method, activate a Cloud billing trial, or upgrade to Blaze for this exercise.
3. Open the [Google Cloud console](https://console.cloud.google.com/) with the same account and select the **same project ID**. Firebase automatically creates the underlying Cloud project; these are two consoles for one project, not two projects to create. [Project relationship](https://firebase.google.com/docs/projects/learn-more), [initial setup](https://firebase.google.com/docs/ai-logic/get-started?platform=android).

If your existing yearly-project backend is already on Blaze, pause and ask the teacher how to handle it; do not change its billing plan as part of this lesson. Later yearly-project features may require a separate cost decision. This lesson does not require a paid feature.

## 1. Register the Android app and select the provider

1. In the [Firebase console](https://console.firebase.google.com/), select your own project. Open **Project settings > General > Your apps**. Reuse the Android registration if its package already matches your app; otherwise choose **Add app > Android** and register the exact `applicationId` from your module Gradle file. `com.example.topic` is only the code example: keep your own yearly app's package.
2. Download that Android app's **google-services.json** into the **app module root**, next to its Gradle file. Do not paste its contents into the tutorial or Java code. It identifies the Firebase app; it is not a service-account credential.
3. Open **AI services > AI Logic > Get started**. Select **Gemini Developer API** and follow the guided activation. For this example choose the supported text model `gemini-3.8-flash` (check the current [model list](https://firebase.google.com/docs/ai-logic/models)). Choose the no-cost Developer API path. Do not choose a provider or model that requires billing; if the flow asks for payment, stop and check the selected provider/model.

![Firebase AI Logic provider selection, with the Gemini Developer API option]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

**Free-tier checkpoint:** Spark + no linked Cloud Billing + Gemini Developer API + a supported no-billing text model. Checked on **25 October 2026**: `gemini-3.8-flash` supports this path. Free access has model/usage limits and can change; verify the [model list](https://firebase.google.com/docs/ai-logic/models) and [pricing](https://firebase.google.com/docs/ai-logic/pricing) before teaching. A billing-required path such as Vertex AI / Agent Platform is outside this lesson.

## 2. Verify the APIs; keep the two key types distinct

In the [Google Cloud console](https://console.cloud.google.com/apis/dashboard), select the **same project**, then open **APIs & Services**. Guided setup should enable the required services; use **Library** to verify **Firebase AI Logic API**, service name `firebasevertexai.googleapis.com`, and the chosen provider's **Gemini API** (`generativelanguage.googleapis.com`). Seeing Enable means that service is not yet enabled in the selected project. Use the Firebase setup flow to complete activation.

![Google Cloud details for Firebase AI Logic API before activation; service name visible]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

The Gemini provider key created by the Firebase workflow stays on the backend: **never put a Gemini API key or service-account JSON in your app**. The Firebase API key in `google-services.json` is a project/app identifier, not proof that a request is authorized. In **APIs & Services > Credentials**, restrict the Firebase key used by this app to **Android apps** (its package name and SHA-1 signing fingerprint) and allow only the Firebase APIs the app needs, including Firebase AI Logic API. Obtain the SHA-1 for the classroom installation with the Gradle `signingReport` task. If you build your app on another computer, add that computer's debug-signing SHA-1 too. Keep any restrictions needed by your own other registered apps. [Key restrictions and App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. Protect the request with App Check

Open **Security > App Check > Get started**. Select your registered Android app. This tutorial uses **one setup for your own app**, with the **App Check debug provider** on the emulator or test device. Each installation registers a private token; Firebase accepts that token instead of asking for device attestation. It does not sign a user in. Current guided AI Logic setup automatically enforces App Check; older projects must check **App Check > APIs > Firebase AI Logic** and enforce it explicitly. Do not bypass a failed test by disabling enforcement. [Official App Check steps](https://firebase.google.com/docs/ai-logic/app-check).

![Firebase App Check starting screen, before registration]({{ "/android/topics/firebase-ai-logic/images/app-check-start.jpg" | relative_url }})

As of this page's check date, Google states that App Check enforcement becomes required for AI Logic on **2 November 2026**. Prepare it now rather than making an unprotected first version. [Security checklist](https://firebase.google.com/docs/ai-logic/security-checklist).

### Add the SDKs

In **Gradle Scripts > build.gradle.kts (Project)**, add the Google services plugin alongside the existing Android plugin:

```diff
// Top-level build file where you can add configuration options common to all sub-projects/modules.
 plugins {
     alias(libs.plugins.android.application) apply false
+    id("com.google.gms.google-services") version "4.5.0" apply false
 }
```

In **Gradle Scripts > build.gradle.kts (Module :app)**, apply the plugin and add the dependencies below; keep all template dependencies. Then Sync. Guava supplies the Java future/callback API. This example does not stream responses, so it does not add a streaming-specific library.

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

In **app > manifests > AndroidManifest.xml**, add this above `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Register the classroom installation

The app tutorial installs the debug provider directly in `MainActivity`, before creating the AI model. There are no extra helper classes, build-variant folders, or Play Console steps.

1. Continue with the [app tutorial](../), run the app and press **Ask LLM** once.
2. In Logcat, filter for **DebugAppCheckProvider** and copy the generated debug token privately.
3. In **Firebase > Security > App Check > Apps**, open your app's overflow menu, choose **Manage debug tokens**, and register that token.
4. Press **Ask LLM** again. The first request may fail until the token is registered.

Register the token in **your own Firebase project**. Your emulator or test-device installation gets its own token. Keep it private while developing your yearly app, and revoke it when no longer used or if exposed. Anyone holding an allowed token can use it from an unverified device. This setup is for classroom testing. [Android debug-provider guide](https://firebase.google.com/docs/app-check/android/debug-provider).

## 4. Stay within the free tier and check readiness

Check the selected model's actual quota in **your project**; there is no guaranteed fixed allowance for every student. Send short prompts and make one request at a time. If you receive `429`, inspect the quota/reset information and wait; do not enable billing or add automatic retries to get past the limit. [Rate limits](https://firebase.google.com/docs/ai-logic/quotas).

Free tier means limited use, not unlimited requests. Keeping Cloud Billing unlinked preserves the no-payment setup. A budget alert is not a substitute for staying on Spark. [Billing requirements](https://firebase.google.com/docs/ai-logic/pricing).

Before the first request, check: matching project/app/config; required APIs enabled; correct App Check provider and private token registered; Firebase key restrictions match the app; Spark with no linked billing; a no-billing model and available quota. Firebase Authentication and its authenticated-users mode can be added when the app needs individual users; they are not enabled by this tiny example. Leave template-only mode off for this direct-prompt lesson, since that mode rejects direct prompts. [Production/security options](https://firebase.google.com/docs/ai-logic/production-checklist).

If a request fails, read the label and Logcat: an App Check rejection calls for checking attestation/token registration, `API_KEY_SERVICE_BLOCKED` calls for checking the key's API allowlist, `404` may mean a retired/misspelled model, and `429` means a quota/rate limit. Do not solve these by publishing keys or repeatedly retrying.

[Return to the one-button tutorial](../)
