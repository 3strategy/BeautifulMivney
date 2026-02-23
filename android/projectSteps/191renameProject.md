---
layout: page
title: "שינוי שם - למי שמתבסס על פרוייקט קיים"
subtitle: "עדכון שם פרוייקט הדברים שצריך לשנות כדי שזה יעבוד"
tags: [אנדרואיד, rename project, שינוי שם]
lang: en
---

[קישור פרטי לצ'אט](https://chatgpt.com/c/687b787c-603c-800e-9549-e85606b8768e)

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

# Rename project from `Tasks` to `Presence` and update related configurations

* **Renamed project package** via Android Studio:

  * Used **Refactor ▶ Rename** to update the code package from `com.example.tasks` to `com.example.presence`.

* **Updated Gradle settings**:

  * In **`app/build.gradle`** (Module: `app`):

    * Changed `namespace` from `"com.example.tasks"` to `"com.example.presence"`.
    * Changed `applicationId` from `"com.example.tasks"` to `"com.example.presence"`.
  * In **`settings.gradle`**: set `rootProject.name = "Presence"` (if not already).

* **Swapped Firebase config**:

  * Overwrote **`app/google-services.json`** with the one registered for `com.example.presence`.

* **Replaced launcher icon**:

  * Ran **New ▶ Image Asset** wizard to generate new adaptive **and** legacy `ic_launcher` icons.

* **Final sync and rebuild**:

  * Clicked **Sync Project with Gradle Files** (elephant icon).
  * Used **Refactor ▶ Clean and Assemble Project with Tests** to regenerate the `R` class under the new package.
  
* You may need to restart the Android Studio and you should get a run button working


