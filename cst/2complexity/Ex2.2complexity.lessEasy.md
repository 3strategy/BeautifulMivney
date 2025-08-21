---
layout: page
title: "ex2.2 סיבוכיות"
subtitle: "יעילות: קצת פחות קל 😀"
tags: []
mathjax: true
lang: he
---

{: .box-note}
בתרגילי סיבוכיות תידרשו לקבוע את הסיבוכיות ברישום bigO. להגדיר מיהו הקלט n, ולהסביר מדוע זו הסיבוכיות.



## 2a2.1 הדפסת איברים כפולים במערך {#id2a2.1}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-gf43iOt4Orku/csharp-rlPsZVJFbmjoTWd) -->

עליכם לממש פונקציה בשם `PrintDuplicates` אשר מקבלת פרמטר אחד:

1. arr - מערך של מספרים שלמים.

הפונקציה צריכה לעבור על המערך ולמצוא את כל המספרים שמופיעים בו לפחות פעמיים. כל מספר כזה צריך להיות מודפס לשורה נפרדת.



הפעולה שתכתבו צריכה להיות יעילה ככל הניתן, גם מבחינת סיבוכיות הזמן וגם מבחינת סיבוכיות המקום. תשובה שאינה יעילה מספיק, כלומר שתהיה בסיבוכיות גדולה יותר מזו הנדרשת לפתרון הבעיה תקבל מעט נקודות בלבד.

דגשים חשובים:

1. אין להשתמש במבני נתונים מתקדמים כגון HashSets, Dictionaries, Lists (מלבד המערך הקלט עצמו), או כל מבנה נתונים מובנה אחר שמקל על ספירת מופעים.
2. הפונקציה צריכה להדפיס כל מספר כפול פעם אחת בלבד, גם אם הוא מופיע יותר מפעמיים (לדוגמה, אם 1 מופיע 4 פעמים, יש להדפיס 1 פעם אחת בלבד).
3. סדר ההדפסה של המספרים הכפולים אינו משנה.
4. הפונקציה אינה מחזירה ערך (void).
5. 

### דוגמה לשימוש:

```csharp
int[] numbers = {1, 2, 3, 2, 1, 4, 5};
Solution.PrintDuplicates(numbers);
// פלט צפוי:
1
2
```


## 2a2.2 מציאת איבר הרוב במערך {#id2a2.2}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-gf43iOt4Orku/csharp-Kugio0y1OR9d9J2) -->


עליכם לממש פונקציה בשם `FindMajorityElement` אשר מקבלת פרמטר אחד:

1. nums - מערך של מספרים שלמים.

הפונקציה צריכה למצוא את איבר הרוב במערך ולהחזיר אותו. איבר הרוב מוגדר כאיבר שמופיע יותר מ-n/2 פעמים, כאשר n הוא גודל המערך.



הפעולה שתכתבו צריכה להיות יעילה ככל הניתן, גם מבחינת סיבוכיות הזמן וגם מבחינת סיבוכיות המקום. תשובה שאינה יעילה מספיק, כלומר שתהיה בסיבוכיות גדולה יותר מזו הנדרשת לפתרון הבעיה תקבל מעט נקודות בלבד.

### הנחיות:

1. אם קיים איבר רוב, הפונקציה תחזיר את ערכו.
2. אם לא קיים איבר רוב, הפונקציה תחזיר $$-1$$.
3. אין צורך לטפל במקרה של מערך ריק או מערך עם איבר יחיד, המערכים בקלט יכילו לפחות 2 איברים.
4. אין להשתמש במבנה נתונים נוסף משום סוג. לרמז ראו [Boyer–Moore majority vote algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)

![אלגוריתם בוייר מור למציאת איבר הרוב אם קיים](image.png)



## 2a2.3 מציאת סכום תת-מערך רציף מקסימלי {#id2a2.3}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-gf43iOt4Orku/csharp-7faKgxthRqLKFrC) -->

עליכם לממש פונקציה בשם `MaxSubArraySum` אשר מקבלת פרמטר אחד:

1. arr - מערך של מספרים שלמים (int[])

הפונקציה צריכה לחשב ולהחזיר את הסכום המקסימלי של תת-מערך רציף בתוך המערך הנתון.

לדוגמה, עבור המערך `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`, תת-המערך הרציף עם הסכום הגדול ביותר הוא `[4, -1, 2, 1]`, שסכומו 6. לכן, הפונקציה תחזיר 6.



הפעולה שתכתבו צריכה להיות יעילה ככל הניתן, גם מבחינת סיבוכיות הזמן וגם מבחינת סיבוכיות המקום. תשובה שאינה יעילה מספיק, כלומר שתהיה בסיבוכיות גדולה יותר מזו הנדרשת לפתרון הבעיה תקבל מעט נקודות בלבד.



## 2a2.4 סכום שני האיברים החיוביים והשונים הקטן ביותר {#id2a24}
[link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-gf43iOt4Orku/csharp-rrGy2ya7SpkGaLP)

עליכם לממש פונקציה בשם `FindSmallestSumOfTwoDistinctPositives` אשר מקבלת פרמטר אחד:

1. arr - מערך של מספרים שלמים (int[]).

הפונקציה צריכה למצוא את שני האיברים החיוביים והשונים הקטנים ביותר במערך, ולחשב את סכומם.



הפעולה שתכתבו צריכה להיות יעילה ככל הניתן, גם מבחינת סיבוכיות הזמן וגם מבחינת סיבוכיות המקום. תשובה שאינה יעילה מספיק, כלומר שתהיה בסיבוכיות גדולה יותר מזו הנדרשת לפתרון הבעיה תקבל מעט נקודות בלבד.

### דרישות:

1. הפונקציה צריכה להחזיר את הסכום הקטן ביותר של שני איברים חיוביים ושונים.
2. אם לא קיימים שני איברים חיוביים ושונים במערך, הפונקציה צריכה להחזיר -1.

### דגשים:

1. 'חיוביים' משמעו גדולים מ-0.
2. 'שונים' משמעו שהערכים של שני המספרים חייבים להיות שונים זה מזה (לדוגמה, אם יש 5, 5, אי אפשר לבחור את שניהם).
3. קחו בחשבון מערכים ריקים, מערכים עם מספרים שליליים בלבד, או מערכים עם פחות משני מספרים חיוביים ושונים.


