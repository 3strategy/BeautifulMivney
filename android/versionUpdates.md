---
layout: page
title: "תיקון בעיית גרסאות כמתבססים על פרוייקט ישן"
subtitle: "עדכון גרסאות אנדרואיד"
tags: [אנדרואיד, SDK, build errors, verions mismatch]
lang: en
---



<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
</style>



# Resolving AAR Metadata Errors When Adding a New Activity

When adding a new `Empty Activity` (e.g., `ReportsActivity`) to a project configured with older Android SDKs and AGP, you may encounter:

> **Dependency** `androidx.activity:activity:1.10.1` requires compileSdkVersion 35 or later, but this project is currently compiled against android-34.

Follow these steps in order:

---

## 1. Run the AGP Upgrade Assistant (Recommended)

1. In Android Studio, click the popup **Android Gradle plugin version 8.2.2 has an upgrade available** → **Start the AGP Upgrade Assistant**.
2. In the assistant:

   * Select a stable AGP version that supports API 35 (e.g., **8.3.0**).
   * Let it update your `build.gradle` files and suggest the Gradle wrapper changes.
3. Click **Apply Changes** and then **Sync Now**.

*This automates updating the Android Gradle Plugin and wrapper. If you prefer manual control or encounter issues, proceed to Step 3.*

---

## 2. Ensure API 35 Is Installed

1. Go to **Tools > SDK Manager** → **SDK Platforms**.
2. Verify **Android 14.1 (API Level 35)** is checked. If not, check it and click **Apply**.
3. Wait for installation to finish.

> *Note: If you already have API 35 installed, you can skip this entirely.*

---

## 3. Update `compileSdkVersion` and `targetSdkVersion` (If Errors Persist)

1. Open `app/build.gradle`.
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
3. Save and click **Sync Now**.

---

## 4. Update the Gradle Wrapper (If Not Already Updated)

AGP 8.3.0 requires Gradle 8.1 or later:

1. Open `gradle/wrapper/gradle-wrapper.properties`.
2. Set:

   ```properties
   distributionUrl=https\://services.gradle.org/distributions/gradle-8.1.1-bin.zip
   ```
3. Save and **Sync**.

---

## 5. Clean & Rebuild

1. **Build > Clean Project**
2. **Build > Rebuild Project**
3. Confirm the AAR metadata error is resolved.

---

## 6. Register the New Activity (If Needed)

If you manually created `ReportsActivity`, ensure your `AndroidManifest.xml` contains:

```xml
<application>
  <activity android:name=".ReportsActivity" />
</application>
```

(Android Studio’s wizard usually does this automatically.)

---

## 7. Address Remaining Warnings

Typical fixes for nine warnings include:

* **Unused imports/resources**: remove them.
* **Hardcoded strings**: move to `strings.xml`.
* **Missing translations**: provide translations or suppress intentionally.

Review each warning in the **Build** window and apply or suppress as appropriate.

---

## 8. Commit Your Changes

```bash
git add app/build.gradle build.gradle gradle/wrapper/gradle-wrapper.properties AndroidManifest.xml
git commit -m "Upgrade AGP, ensure API 35, bump compileSdk to 35"
```

> {: .box-success}
> **Tip:** If you must remain on compileSdk 34, use an older `androidx.activity:activity:1.6.1`:
>
> ```groovy
> implementation 'androidx.activity:activity:1.6.1'
> ```
