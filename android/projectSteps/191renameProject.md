---
layout: page
title: "שינוי שם - למי שמתבסס על פרוייקט קיים"
subtitle: "שינוי שם הפרויקט, package ו-applicationId בלי להשאיר הפניות ישנות"
tags: [אנדרואיד, rename project, שינוי שם]
lang: en
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

## Rename an Android project and its package

This example renames an existing project from `Tasks` to `Presence` and changes the old identifier
`com.example.tasks` to `com.example.presence`.

{: .box-warning}
Changing the project name alone does **not** change the package. `rootProject.name` is only Android Studio's project name. A complete rename must update the source package, Gradle `namespace`, and Gradle `applicationId`. Changing the `applicationId` makes Android, Firebase, and Google Play treat the result as a different application. Do not do this to an already-published app when you intend to release it as an update.

For a simple school project, keep these three values identical:

```text
Java/Kotlin base package = com.example.presence
Gradle namespace         = com.example.presence
Gradle applicationId     = com.example.presence
```

{: .box-note}
Firebase Console calls its registration field **Android package name**, but it means the installed app identity from Gradle `applicationId`. It does not read the `package ...;` line from a Java file. Therefore changing only the Java source package does not change which Android app Firebase sees. Conversely, FCM can technically work with a different source package if `applicationId` matches the registered Firebase app, but keeping the source package, `namespace`, and `applicationId` equal is much clearer for this tutorial series.

## 1. Rename the source package with Android Studio

1. Open the **Project** window and select the **Android** view.
2. Expand **app > java** or **app > kotlin+java**.
3. If Android Studio displays `com.example.tasks` as one compact row, open the Project window's options menu and
   disable **Compact Middle Packages**.
4. Right-click the `tasks` package under `com > example` and choose **Refactor > Rename**.
5. Choose **Rename package**, not **Rename directory**.
6. Enter `presence`, choose **Refactor**, inspect the preview, and apply it.
7. Repeat the package rename under `test` and `androidTest` if the refactor preview did not include them.

Android Studio should move the source files and update declarations and imports such as:

```diff
-package com.example.tasks;
+package com.example.presence;
```

If more than the final segment must change, rename one package segment at a time. For example, changing
`com.oldschool.tasks` to `com.example.presence` requires separate refactors for `oldschool` and `tasks`.

## 2. Update `namespace` and `applicationId`

Open the app module file:

- Kotlin DSL: `app/build.gradle.kts`
- Groovy DSL: `app/build.gradle`

For `build.gradle.kts`, update both values:

```diff
 android {
-    namespace = "com.example.tasks"
+    namespace = "com.example.presence"

     defaultConfig {
-        applicationId = "com.example.tasks"
+        applicationId = "com.example.presence"
```

For a Groovy build file, the equivalent change is:

```diff
 android {
-    namespace "com.example.tasks"
+    namespace "com.example.presence"

     defaultConfig {
-        applicationId "com.example.tasks"
+        applicationId "com.example.presence"
```

The values have different jobs:

- `namespace` determines the package of generated classes such as `R` and `BuildConfig`.
- `applicationId` is the installed application's unique identity—the value Android APIs and Firebase commonly call
  the "package name."

## 3. Check references outside ordinary source files

Run **Edit > Find > Find in Files** and search the entire project for:

```text
com.example.tasks
```

There should be no unintended old references. Inspect any matches carefully, especially in:

- XML custom views, for example `<com.example.tasks.GameBoardView ...>`;
- fully qualified activity, service, receiver, or provider names in `AndroidManifest.xml`;
- Java/Kotlin files under `src/test` and `src/androidTest`;
- ProGuard/R8 rules, Navigation graphs, Room schemas, scripts, and documentation;
- code that constructs authority names, deep links, or intent action strings from the old identifier.

Relative Manifest names such as `.MainActivity` normally follow the new `namespace` automatically. Fully qualified
names must be changed explicitly.

## 4. Change the project and launcher names if desired

Open `settings.gradle.kts` or `settings.gradle` and change the project name:

```diff
-rootProject.name = "Tasks"
+rootProject.name = "Presence"
```

This changes the name shown by Android Studio; it does not affect the installed package.

To change the label shown below the launcher icon, update `app/src/main/res/values/strings.xml`:

```diff
-<string name="app_name">Tasks</string>
+<string name="app_name">Presence</string>
```

Changing the outer directory name is optional. If you do it, close the project first, rename the folder in the file
system, and reopen the renamed folder from Android Studio.

## 5. Replace package-bound service configuration

If the project uses Firebase, register a new Android app with the **new exact application ID**
`com.example.presence`. Then replace `app/google-services.json` with the configuration downloaded for that app.
Do not reuse a file whose Android client is registered as `com.example.tasks`.

If the project initializes Firebase using manually supplied client values instead of `google-services.json`, replace
those values with the configuration belonging to `com.example.presence`.

Also review every service tied to the former application ID, including OAuth clients, App Check, API-key Android
restrictions, deep links, Maps credentials, and server-side allowlists. A successful local build does not prove these
external registrations are correct.

## 6. Sync, rebuild, and verify the result

1. Choose **File > Sync Project with Gradle Files**.
2. Choose **Build > Clean Project**, then **Build > Make Project**.
3. Run the app.
4. Search the project one more time for `com.example.tasks`.
5. Open the generated merged manifest for the debug variant and verify that its final `package` is
   `com.example.presence`.

You can also verify an installed debug build with ADB:

```powershell
adb shell pm list packages | Select-String "com.example.presence"
```

The old and new application IDs can be installed side by side because Android considers them different apps. Uninstall
the old one manually if keeping both would confuse testing.

{: .box-success}
The rename is complete only when the source files use the new package, `namespace` and `applicationId` both contain the
new value, no unintended old references remain, and the built app is installed under the new application ID.

## Official reference

- [Configure the app module: application ID and namespace](https://developer.android.com/build/configure-app-module)
- [Add Firebase to Android: locate the package name in the app-level Gradle file](https://firebase.google.com/docs/android/setup)
