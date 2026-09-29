---
layout: page
title: "אמולטור Android פועל אבל החלון לא מופיע"
subtitle: "כלי PowerShell לאיתור ולעצירה של AVD תקוע"
permalink: /android/tools/recover-android-emulator/
lang: he
tags: [Android, Android Studio, Emulator, troubleshooting, PowerShell]
---

הכלי מיועד למצב שבו Android Studio מציג אמולטור כפעיל, אבל חלון האמולטור אינו מופיע או שאי אפשר לחזור אליו. הסקריפט מאתר את תהליכי האמולטור לפי שם ה־AVD, עוצר אותם, ואז אפשר להפעיל את אותו AVD מחדש דרך **Device Manager**.

[הורדת Recover-AndroidEmulator.ps1]({{ '/android/tools/Recover-AndroidEmulator.ps1' | relative_url }}){: download="Recover-AndroidEmulator.ps1" }

הסקריפט דורש Windows PowerShell 5.1 ומעלה. הוא אינו משתמש ב־ADB, משנה את ה־AVD או מפעיל את האמולטור. עצירה כפויה תסגור את האמולטור מיד, ולכן מידע שלא נשמר באפליקציה עלול ללכת לאיבוד.

## בדיקת האמולטור שאותר

פתחו PowerShell בתיקייה שאליה הורדתם את הקובץ והריצו:

```powershell
.\Recover-AndroidEmulator.ps1 -List
```

הסקריפט מציג את התהליכים התואמים בלי לעצור אותם. כברירת מחדל הוא מחפש את ה־AVD בשם `Medium_Phone_API_36`. כדי לבדוק מה היה עוצר בלי לעצור בפועל, אפשר להריץ:

```powershell
.\Recover-AndroidEmulator.ps1 -WhatIf
```

## עצירה והפעלה מחדש

לאחר שווידאתם ששם ה־AVD והתהליכים שייכים לאמולטור התקוע, הריצו את הסקריפט ללא `-List`:

```powershell
.\Recover-AndroidEmulator.ps1
```

לאחר הודעת ההצלחה, פתחו את **Device Manager** ב־Android Studio והפעילו מחדש את ה־AVD.

אם ה־AVD שלכם אינו `Medium_Phone_API_36`, העבירו את שמו במדויק. לדוגמה:

```powershell
.\Recover-AndroidEmulator.ps1 -AvdName "Pixel_6_Pro" -List
.\Recover-AndroidEmulator.ps1 -AvdName "Pixel_6_Pro" -WhatIf
.\Recover-AndroidEmulator.ps1 -AvdName "Pixel_6_Pro"
```

הפעילו את הפקודה האחרונה רק אחרי שבדקתם שהשם והתהליכים שייכים לאמולטור שברצונכם לסגור.
