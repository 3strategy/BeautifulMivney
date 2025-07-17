---
layout: page
title: "תיקון בעיית גרסאות כמתבססים על פרוייקט ישן"
subtitle: "עדכון גרסאות אנדרואיד"
tags: [אנדרואיד, SDK, build errors, verions mismatch]
lang: he
---


# Resolving AAR Metadata Errors When Adding a New Activity

When you add a new `Activity` to a project originally configured with an older Android SDK, you may encounter the following error during build:

> **Dependency** `androidx.activity:activity:1.10.1` requires compileSdkVersion 35 or later,
> but this project is currently compiled against android-34.

This document walks you through the steps to update your project so that you can add new Activities without build failures.

---

## 1. Install API Level 35 in the SDK Manager

1. In Android Studio, go to **Tools > SDK Manager**.
2. Under the **SDK Platforms** tab, check **Android 14.1 (API Level 35)** and click **Apply**.
3. Wait for the download and installation to complete.

---

## 2. Update `compileSdkVersion` and `targetSdkVersion`

1. Open your module-level `build.gradle` (usually `app/build.gradle`).

2. In the `android` block, change:

   ```groovy
   compileSdkVersion 34
   targetSdkVersion 34
   ```

   to:

   ```groovy
   compileSdkVersion 35
   targetSdkVersion 35
   ```

3. If you have a `minSdkVersion` lower than 21, you can leave it unchanged (unless you have specific constraints).

---

## 3. Update the Android Gradle Plugin (AGP)

1. Open your project-level `build.gradle` (in the root folder).

2. Find the `classpath 'com.android.tools.build:gradle:8.2.2'` line and update it to the latest version that supports compileSdk 35. For example:

   ```groovy
   buildscript {
     dependencies {
       classpath 'com.android.tools.build:gradle:8.3.0'
     }
   }
   ```

3. Click **Sync Now** when prompted.

---

## 4. Update Gradle Wrapper to Match AGP Requirements

AGP 8.3.0 requires Gradle 8.1 or later.

1. Open `gradle/wrapper/gradle-wrapper.properties`.

2. Update the `distributionUrl` to use Gradle 8.1.1 (or newer):

   ```properties
   distributionUrl=https\://services.gradle.org/distributions/gradle-8.1.1-bin.zip
   ```

3. Save and sync.

---

## 5. Sync, Clean & Rebuild

1. In Android Studio, select **Build > Clean Project**.
2. Then **Build > Rebuild Project**.
3. Verify that the previous AAR metadata error is gone and the build completes successfully.

---

## 6. Register the New Activity (if needed)

If you manually created `ReportsActivity.java`/`ReportsActivity.kt`, add it to your manifest:

```xml
<application>
  <!-- … other activity declarations … -->
  <activity android:name=".ReportsActivity" />
</application>
```

Android Studio’s **New > Activity > Empty Activity** wizard normally does this for you.

---

## 7. Address Remaining Warnings

After the build succeeds, nine warnings may still appear. Common fixes include:

* **Unused imports**: remove or collapse imports in each file.
* **Unused resources**: delete layout or string resources you no longer reference.
* **Hardcoded strings**: move literals into `strings.xml`.
* **Missing translations**: add translations for any new strings.

Review each warning in the **Build** window and apply the suggested fixes or suppress only if you understand the impact.

---

## 8. Commit Your Changes

1. Stage and commit your updated Gradle files and manifest:

   ```bash
   git add app/build.gradle build.gradle gradle/wrapper/gradle-wrapper.properties app/src/main/AndroidManifest.xml
   git commit -m "Update compileSdk to 35, AGP to 8.3.0 and install API 35"
   ```

2. Push to your repository so students can pull the working configuration.

---

> {: .box-success}
> **Tip:** For existing projects that must remain on compileSdk 34, you can instead downgrade the `androidx.activity:activity` dependency to `1.6.1`, which is compatible with API 34:
>
> ```groovy
> dependencies {
>   implementation 'androidx.activity:activity:1.6.1'
> }
> ```

This completes the configuration update. Students can now add new Activities without encountering the AAR metadata error.
