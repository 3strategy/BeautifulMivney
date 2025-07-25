---
layout: page
title: "ex3a.1 שרשרת חוליות"
subtitle: "Node<T> תרגילים ראשונים"
tags: []
lang: he
---





## 3a1.1 בנייה רקורסיבית של שרשרת מ-n עד 1 

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-neOnRcUKk8JTV60) -->

עליכם לממש פונקציה בשם `Build1ToNListReverse` אשר מקבלת פרמטר אחד:

1. n (int) - מספר שלם חיובי.

הפונקציה צריכה לבנות רשימה מקושרת שאיבריה הם המספרים מ-1 עד `n`, אך בסדר יורד (כלומר, `n` יהיה ראש הרשימה, אחריו `n-1`, וכן הלאה, עד 1).הפונקציה תחזיר את ראש הרשימה המקושרת.

### דגשים:

1. יש להשתמש במחלקת `Node<T>` מהספרייה `Unit4.CollectionsLib`.
2. מקרה בסיס: אם n קטן או שווה ל-0, יש להחזיר null (רשימה ריקה).

### דוגמה לשימוש במחלקת Node:

```csharp
using Unit4.CollectionsLib;

Node node1= new Node<int>(20);
Node node2= new Node<int>(10, node1);
// node2 -> node1 (20 -> 10)

// שינוי הערך של חוליה
node1.setValue(15);

// קבלת הערך של חוליה
int value = node2.getValue(); // value יהיה 20

// קבלת החוליה הבאה
node2.GetNext();

// הגדרת החוליה הבאה
node1.SetNext(new Node<int>(30));
// node1 -> (30)
```




## 3a1.2 בניית ללא רקורסיה של שרשרת מ-1 עד n
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-8KFSM1V4tSgtEAc) -->

עליכם לממש פונקציה בשם `Build1ToNList` אשר מקבלת פרמטר אחד:

1. n (int) - מספר שלם חיובי.

הפונקציה צריכה לבנות ללא רקורסיה, ולהחזיר רשימה מקושרת המכילה את המספרים מ-1 ועד `n` בסדר עולה.

### דגשים:

1. השתמשו במחלקת Node מהספרייה Unit4.CollectionsLib.
2. הפונקציה צריכה להחזיר את ראש הרשימה המקושרת.




## 3a1.3 בניית שרשרת מרשימת מספרים מופרדים בפסיק

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-L8F4783Y1jnw5ps) -->

עליכם לממש פונקציה בשם `BuildIntListFromString` אשר מקבלת פרמטר אחד:

1. numbersString - מחרוזת המכילה מספרים שלמים המופרדים בפסיקים (לדוגמה: "1,2,3").

הפונקציה צריכה לבנות רשימה מקושרת של מספרים שלמים (`Node`) ולהחזיר את ראש הרשימה.

### דגשים:

1. יש להשתמש במחלקת Node מהספרייה Unit4.CollectionsLib.
2. אם המחרוזת ריקה או מכילה רק רווחים, הפונקציה צריכה להחזיר null.
3. אין צורך לטפל במקרים של פורמט קלט שגוי (לדוגמה, מחרוזת שאינה מכילה מספרים או פסיקים בלבד).

###



## 3a1.4 הדפסת הגדולים מהעוקב

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-bSzpuEMKCLvk1xo) -->

עליכם לממש פונקציה בשם `printBiggerPrec` אשר מקבלת פרמטר אחד:

1. head - מצביע לראש רשימה מקושרת של מספרים שלמים (מסוג Node).

הפונקציה צריכה לעבור על הרשימה המקושרת ולהדפיס את כל האיברים שגדולים מהאיבר העוקב שלהם.

### דגשים:

1. יש להשתמש במחלקת Node מהספרייה Unit4.CollectionsLib.
2. הדפיסו כל איבר מתאים בשורה נפרדת.



## 3a1.5 חישוב ממוצע

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-DuCHAoilz7s4Bb0) -->

עליכם לממש פונקציה בשם `ListAvg` אשר מקבלת פרמטר אחד:

1. head - מצביע לראש רשימה מקושרת של מספרים שלמים (מסוג Node).

הפונקציה צריכה לחשב ולהחזיר את ממוצע כל האיברים ברשימה המקושרת.

1. דגשים:
2. אם הרשימה ריקה, הפונקציה צריכה להחזיר 0.0.
3. הקפידו להחזיר ערך מסוג double עבור הממוצע.
4. יש להשתמש במחלקת Node מהספרייה Unit4.CollectionsLib.

###


## 3a1.6 חישוב מרחק

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-REfj5hOJJ8P6Y9C) -->

עליכם לממש פונקציה בשם `MaxAndSecDistance` אשר מקבלת פרמטר אחד:

1. head - מצביע לראש רשימה מקושרת של מספרים שלמים (מסוג Node).

הפונקציה צריכה להחזיר את המרחק (הפרש המיקומים) בין האיבר המקסימלי והאיבר השני בגודלו ברשימה.

### דגשים:

1. יש להניח שהרשימה מכילה לפחות שני איברים.
2. יש לכתוב תיעוד מתאים לפונקציה.
3. יש להעריך את סיבוכיות זמן הריצה של הפונקציה.
4. נסו לפתור את הבעיה בצורה היעילה ביותר (לדוגמה, במעבר יחיד על הרשימה).

### הערה:

עבור C#, יש להשתמש ב-`using Unit4.CollectionsLib;` כדי לגשת למחלקת `Node`.