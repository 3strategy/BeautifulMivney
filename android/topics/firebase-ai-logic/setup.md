---
layout: page
title: "Firebase AI Logic — secure Google-side setup"
subtitle: "Prepare the project once; keep the app lesson small"
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

Use a **dedicated classroom Firebase project** that you control. The screenshots were taken from an existing instructor project on 24 October 2026, before AI Logic/App Check activation. They are cropped to exclude account identity, project identifiers, billing data and credentials. They illustrate where to go, not a claim that the example project is protected. No project settings were changed to make these pictures.

## 1. Register the Android app and select the provider

1. In the [Firebase console](https://console.firebase.google.com/), select your own project. Open **Project settings > General > Your apps > Add app > Android** and register the exact `applicationId` from your module Gradle file. Our example is `com.example.topic`.
2. Download that Android app's **google-services.json** into the **app module root**, next to its Gradle file. Do not paste its contents into the tutorial or Java code. It identifies the Firebase app; it is not a service-account credential.
3. Open **AI services > AI Logic > Get started**. Select **Gemini Developer API** and follow the guided activation. For this example choose the supported text model `gemini-3.8-flash` (check the current [model list](https://firebase.google.com/docs/ai-logic/models)). Review the console's provider and billing prompts yourself before confirming.

![Firebase AI Logic provider selection, with the Gemini Developer API option]({{ "/android/topics/firebase-ai-logic/images/provider-choice.jpg" | relative_url }})

For a no-payment classroom project, check the **Spark** plan and the provider's [free-tier availability](https://firebase.google.com/docs/ai-logic/pricing). An existing **Blaze** project can incur usage charges: choosing the Developer API does not turn Blaze back into Spark. Do not change the plan of a shared project to follow this exercise.

## 2. Verify the APIs; keep the two key types distinct

In the [Google Cloud console](https://console.cloud.google.com/apis/dashboard), select the **same project**, then open **APIs & Services**. Guided setup should enable the required services; use **Library** to verify **Firebase AI Logic API**, service name `firebasevertexai.googleapis.com`, and the chosen provider's **Gemini API** (`generativelanguage.googleapis.com`). Seeing Enable means that service is not yet enabled in the selected project. Use the Firebase setup flow to complete activation.

![Google Cloud details for Firebase AI Logic API before activation; service name visible]({{ "/android/topics/firebase-ai-logic/images/cloud-api-details.jpg" | relative_url }})

The Gemini provider key created by the Firebase workflow stays on the backend: **never put a Gemini API key or service-account JSON in your app**. The Firebase API key in `google-services.json` is a project/app identifier, not proof that a request is authorized. In **APIs & Services > Credentials**, restrict the Firebase key used by this app to **Android apps** (its package name and SHA-1 signing fingerprint) and allow only the Firebase APIs the app needs, including Firebase AI Logic API. Obtain debug SHA-1 with the Gradle `signingReport` task; use the correct release/Play signing certificate for distributed builds. Avoid changing a shared key used by other apps. [Key restrictions and App Check](https://firebase.google.com/docs/ai-logic/security-checklist).

## 3. Protect the request with App Check

Open **Security > App Check > Get started**. Register the Android app. Use a private debug token for local emulator development and Play Integrity for the distributed app. App Check verifies app/device legitimacy; it does not sign a user in. Current guided AI Logic setup automatically enforces App Check; older projects must check **App Check > APIs > Firebase AI Logic** and enforce it explicitly. Do not bypass a failed test by disabling enforcement. [Official App Check steps](https://firebase.google.com/docs/ai-logic/app-check).

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
+    debugImplementation("com.google.firebase:firebase-appcheck-debug")
+    releaseImplementation("com.google.firebase:firebase-appcheck-playintegrity")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

In **app > manifests > AndroidManifest.xml**, add this above `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Separate debug and release providers

Create **AppCheckSetup.java twice**, in different build-variant source sets, using the same package as MainActivity. The physical locations below identify the source sets precisely; in Android view they appear under **app > kotlin+java > com.example.topic**, marked **debug** or **release**. Create missing folders using Android Studio's Terminal or your file manager, then open the files in Android Studio. Do not put either version in the main source set.

**Debug source set:** `app/src/debug/java/com/example/topic/AppCheckSetup.java`

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

**Release source set:** `app/src/release/java/com/example/topic/AppCheckSetup.java`

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

Gradle compiles only the matching helper and its provider dependency. The app tutorial calls `AppCheckSetup.install()` before creating the model. The release build therefore does not contain the debug provider library. [Android debug-provider guide](https://firebase.google.com/docs/app-check/android/debug-provider).

Run the debug app and press Ask LLM once. In Logcat, filter for **DebugAppCheckProvider**. Copy **your generated debug secret privately** into **App Check > Apps > your app > overflow menu > Manage debug tokens**. The first request may fail until that token is registered; retry afterwards. Never publish the token in code, screenshots, repositories or class chat. Revoke it when no longer needed. For release, complete these extra steps:

1. In **Google Play Console > your app > Release > App integrity > Play Integrity API**, choose **Link Cloud project** and select the same Firebase project.
2. In **Firebase > Security > App Check > Apps**, register the app with **Play Integrity** and its signing certificate's **SHA-256** fingerprint. This differs from the **SHA-1** used for the Android API-key restriction above.
3. Match the integrity-verdict settings to your intended distribution (Google Play, outside Play, or both), then test attestation before sharing the release build. [Play Integrity setup](https://firebase.google.com/docs/app-check/android/play-integrity-provider).

## 4. Set limits and check readiness

Choose deliberately small classroom rate limits in AI Logic and review provider quotas in Cloud. If billing is enabled, set budget alerts and review available spend controls: **a budget alert is a notification, not a hard spending cap**. The disabled button in our app prevents accidental repeat clicks; it is not a server-side usage limit. [Quotas](https://firebase.google.com/docs/ai-logic/quotas), [budget alerts](https://firebase.google.com/docs/projects/billing/budget-alerts).

Before the first request, check: matching project/app/config; required APIs enabled; correct App Check provider and private token registered; Firebase key restrictions match the app; appropriate quota/billing settings. Firebase Authentication and its authenticated-users mode can be added when the app needs individual users; they are not enabled by this tiny example. Leave template-only mode off for this direct-prompt lesson, since that mode rejects direct prompts. [Production/security options](https://firebase.google.com/docs/ai-logic/production-checklist).

If a request fails, read the label and Logcat: an App Check rejection calls for checking attestation/token registration, `API_KEY_SERVICE_BLOCKED` calls for checking the key's API allowlist, `404` may mean a retired/misspelled model, and `429` means a quota/rate limit. Do not solve these by publishing keys or repeatedly retrying.

[Return to the one-button tutorial](../)
