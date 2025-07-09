---
layout: page
title: "ex3a.2 שרשרת חוליות"
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

Node
Node
// node2 -> node1 (20 -> 10)

// שינוי הערך של חוליה
node1.setValue(15);

// קבלת הערך של חוליה
int value = node2.getValue(); // value יהיה 20

// קבלת החוליה הבאה
Node

// הגדרת החוליה הבאה
node1.SetNext(new Node
// node1 -> (30)
```




## 3a1.2 בניית רקוסיבית של שרשרת מ-1 עד n
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-pFCm2HGk8yuU/csharp-8KFSM1V4tSgtEAc) -->

עליכם לממש פונקציה בשם `Build1ToNList` אשר מקבלת פרמטר אחד:

1. n (int) - מספר שלם חיובי.

הפונקציה צריכה לבנות באופן רקורסיבי, ולהחזיר רשימה מקושרת המכילה את המספרים מ-1 ועד `n` בסדר עולה.

### דגשים:

1. השתמשו במחלקת Node מהספרייה Unit4.CollectionsLib.
2. הפונקציה צריכה להחזיר את ראש הרשימה המקושרת.
3. להיות רקורסיבית (ללא לולאות)


