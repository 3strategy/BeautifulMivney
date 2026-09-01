---
layout: page
title: "הוספת Activities"
subtitle: "הוספת מסכים (Activities) לפרוייקט"
tags: [אנדרואיד, Activity, Adding Activities]
lang: en
---


ההנחיות כאן מתאימות גם לפרוייקט חדש
{: .box-note}

<details markdown="1"><summary>לפני שמתחילים: מהו Activity?</summary>

`Activity` היא מסך בעל מחזור חיים שמנוהל בידי Android. היא אינה רק קובץ Java:

- מחלקת ה־Java מגיבה לאירועים ומנהלת את התנהגות המסך.
- קובץ ה־layout מתאר את ה־Views שיופיעו בו.
- רישום ב־`AndroidManifest.xml` מודיע למערכת שהמסך קיים ושמותר לפתוח אותו.

כאשר ה־wizard יוצר `Empty Views Activity`, הוא מחבר עבורנו את שלושת החלקים האלה. לכן כדאי
להשתמש בו בשלב הראשון ולא ליצור רק קובץ Java ידני. מסך שנכתב בקוד אך אינו רשום ב־Manifest
אינו חלק מלא מן היישום, ו־`Intent` שינסה לפתוח אותו ייכשל.

</details>



## הוסף את ה-Activities שתכננת כ- Empty Views Activities.
1. משתמשים בתפריט הבא:
    ![adding Empty Views Activity](/assets/img/011/image.png)
    -  **אם הנכם בוחרים מהגלריה, זה נראה כך:**
        ![Empty Views Activity, in Gallery screens](/assets/img/011/image-1.png)
1. אמור להופיע מסך יצירה כמו בתמונה 
    ![alt text](/assets/img/011/image-2.png)

    - חשוב לרשום את המילה Activity כמו בתמונה (naming conventions),
    - **וחשוב לבחור Java** כשפה. אם האפשרות לבחירת שפה אינה זמינה - כנראה שבחרתי Empty Activity וא משהו אחר שמחייב Kotlin

1. אם הכל תקין, במסך ההוספה ל-Git, יופיע שנוספו רק 2 קבצים ולא 7 או 13.
    ![alt text](/assets/img/011/image-3.png)

1. הריצו את הפרוייקט. אם יש בעיות הקשורות לגרסאות פיתרו אותן [בעזרת המדריך הבא](/android/projectSteps/027versionUpdates)

1. **Commit, Push**: בכל פעם שיש עדכון - אפילו קטן - נרצה לשמור תמונת מצב. אפשר להתעקש על ה-Commit למרות שיש Warnings.
    - נבחר את הcheckbox העליון כדי לסמן את כולם
    - נרשום הודעת commit
    - ונעשה commit and push

{: .box-success}
בסיום, פתחו כל Activity לפחות פעם אחת. עצם העובדה שהפרויקט נבנה אינה מוכיחה שהמסך נרשם
נכון או שה־layout שלו נטען בלי שגיאה.

## המשך

- [012 - הגדרת קיצור לפירמוט קוד](/android/projectSteps/012androidCodeFormatting)

<!-- gemini-tutor-links:start -->
<div markdown="1" dir="rtl">

## מורה־עזר ב־Gemini

{: .box-note}
[פתחו את Gem: מורה דרך: מסכים ותפריט TicTacMenu](https://gemini.google.com/gem/1_OcLkkcviNOaC_l65AYtNnlbYY9mj_cz?usp=sharing) כדי לקבל רמזים, שאלות אבחון והסברים המתאימים לשלב שבו אתם נמצאים.

</div>
<!-- gemini-tutor-links:end -->
