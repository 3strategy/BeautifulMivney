---
layout: page
title: "Ctrl K D formatting"
subtitle: "קינפוג ה-IDE לפירמוט קוד"
tags: [אנדרואיד, Formatting, Ctrl K D]
lang: en
---

[חזרה ל־011: הוספת Activities](/android/projectSteps/011addingActivities)


## הסבר קצר על עדכון הקיצור לפירמוט קוד

הקיצורים ב- Android Studio, InteliJ, Pycharm לפירמוט קוד הם Ctrl Alt L, Ctrl+Shift+Alt+L. 

אלו קיצורים שמתנגשים עם קיצורי החלפת שפה מאנגלית לעברית במחשבי windows בארץ

לכן כדאי לעדכן את הקיצור כדי שיהיה כמו ב- VS2022:

<details markdown="1"><summary>מה פירמוט עושה — ומה הוא אינו עושה?</summary>

הפקודה Reformat מסדרת הזחות, רווחים ושבירת שורות לפי כללי Android Studio. היא אינה משנה
את האלגוריתם ואינה מתקנת שגיאות קומפילציה. מטרתה להפוך את מבנה הקוד לגלוי: קל יותר לראות
איזה `if` שייך לאיזו פעולה, היכן בלוק מסתיים, והאם קטע הודבק במקום הנכון.

אחרי הדבקת קוד, פרמטו לפני שמנסים לאתר סוגר חסר. אם ההזחה עדיין נראית מוזרה, זו לעיתים
אינדיקציה לכך שסוגר `{` או `}` באמת חסר — אך הודעת השגיאה של הקומפיילר היא שקובעת.

</details>

1. ראשית ניכנסת לתפריט File > Settings > Keymap
1. נרשום בשורת החיפוש Reformat ונגיע למסך הבא:
    ![alt text](/assets/img/012/image-4.png)

1. נשנה את הקיצור של Reformat File... ע"י בחירה בו והקלדת הקיצור החדש Ctrl + K וסימון Second stroke D. הבעיה שקיצור זה כבר תפוס ולכן צריך להסיר את הקונפליקט. ככה זה נראה בתחילה:
    ![alt text](/assets/img/012/image-5.png)

1. אין ברירה אלא לגשת ולחפש שוב - Commit:
    ![alt text](/assets/img/012/image-6.png)

1. ולבצע הסרה.

1. כעת ניתן להוסיף את הקיצור הרצוי:
    ![alt text](/assets/img/012/image-7.png)

## בדיקה והמשך

פתחו קובץ Java, שנו בכוונה את ההזחה של כמה שורות והפעילו `Ctrl+K, D`. ודאו שהקוד מסתדר
ושקיצור החלפת השפה במערכת ממשיך לעבוד.

- [013 - הוספת Activities לתפריט](/android/projectSteps/013addingActivityToMenu)
