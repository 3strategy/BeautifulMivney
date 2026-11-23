---
layout: page
title: "היכרות עם Android Studio דרך המונה"
subtitle: "מוצאים את הפריסה, את המשאבים ואת הקוד בפרויקט שכבר עובד"
permalink: /android/basics/android-studio-intro/
menu_set: android
lang: he
tags: [Android Studio, Java, XML, View Binding, מתחילים]
---

[לשיעור השני — בונים את המסכים של Basic Views Activity]({{ '/android/basics/02-from-empty-to-basic-views/' | relative_url }}){: data-sequence-nav="prev"}

פתחו את פרויקט המונה משיעור 2 והריצו אותו. מספיק שהמונה עובד בסוף חלק א. אם כבר הוספתם את ה־Fragments, בצעו את אותם צעדים בקבצים של המסך הראשון.

## מוצאים את הקבצים בתצוגת Android

| מה מחפשים | איפה מחפשים |
|---:|---:|
| הרכיבים שמופיעים במסך וסדר ההצגה שלהם | **app > res > layout**. פתחו `activity_main.xml`. אם העברתם את המונה ל־Fragment, פתחו `fragment_first.xml`. |
| הטקסט שמופיע על כפתור ההוספה | **app > res > values > strings.xml**. חפשו את `score_add`. |
| מה קורה בלחיצה | **app > kotlin+java > החבילה של הפרויקט**. חפשו את המאזין של `binding.buttonPlus` ב־`MainActivity.java` או ב־`FirstFragment.java`, לפי הגרסה שלכם. |
| איפה הפעלתם View Binding | **Gradle Scripts > build.gradle.kts (Module :app)**. מצאו את `viewBinding = true`. |

## עוקבים אחרי כפתור אחד

1. פתחו את הפריסה ב־**Split**. מצאו את כפתור ההוספה בתצוגה ואת `button_plus` ב־XML. בדקו מה כתוב במאפיין `android:text`.
2. ב־`strings.xml` שנו זמנית את הערך של `score_add` ל־**פלוס אחת** והשאירו את שם המשאב. לחצו **Run**. נבאו מה ישתנה בכפתור ומה תעשה לחיצה עליו, ואז בדקו באמולטור.
3. מצאו ב־Java את `score++` ואת `showScore()`. הסבירו איזו שורה משנה את המשתנה ואיזו גורמת לתצוגה להתעדכן. החזירו את הכיתוב המקורי.

{: .box-success}
אם הכיתוב השתנה והלחיצה עדיין הוסיפה 1, מצאתם את ההבדל בין הגדרת הכיתוב במשאב לבין הטיפול בלחיצה בקוד. המזהה בפריסה הוא שמאפשר ל־View Binding להציע בקוד את `binding.buttonPlus`.

## ממשיכים לפריסות ול־Activity

ב־**03 Layouts בסיסי** התחילו בעמודים 2–6. מצאו במונה את ה־`LinearLayout` ואת `orientation="vertical"`. נסו לשנות ל־`horizontal` בתצוגה המקדימה ולראות מה קורה לסדר הרכיבים. בסיום החזירו ל־`vertical`.

[לשלב הבא — 03 Layouts בסיסי]({{ '/android/alon/03.Layouts.pdf' | relative_url }}#page=2){: data-sequence-nav="next"}

ב־**04 Activity**, עמודים 2–5 מדגימים איך מציגים פריסה ואיך מחברים אירוע לחיצה. כשהמצגת מחפשת רכיב עם `findViewById`, מצאו את ההפניה המקבילה דרך `binding` בקוד שלכם. בתרגיל המונה בעמודים 6–7 אפשר להמשיך לעבוד עם View Binding. [04 Activity]({{ '/android/alon/04.Activity.pdf' | relative_url }})

## מצגת לעיון

במצגת של אלון חימוביץ׳, עמודים 4–9 מציגים את מבנה הפרויקט, חלון הפריסה וכפתורי ההרצה. עמוד 11 מציג את **Logcat**, חלון ההודעות של המכשיר והאפליקציה בזמן ריצה. [מצגת ההיכרות המקורית]({{ '/android/alon/02.Intro.pdf' | relative_url }}#page=4)
