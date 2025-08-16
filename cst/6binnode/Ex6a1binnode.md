---
layout: page
title: "ex6a1 עצים בינאריים BinNode"
subtitle: "עצים בינריים: BinNode<T> תרגילים ראשונים"
tags: []
lang: he
---



## 6a1.111 סכום צמתים בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-BxPk17cBVOPb2eO) -->

עליכם לממש פונקציה בשם `SumBinaryTreeNodes` אשר מקבלת פרמטר אחד:

1. tree - מצביע לשורש של עץ בינארי (מסוג BinNode)

הפונקציה צריכה לחשב ולהחזיר את סכום כל הערכים (מספרים שלמים) בצמתי העץ הבינארי.

שימו לב למקרים הבאים:

1. אם העץ ריק (כלומר, tree הוא null), הפונקציה צריכה להחזיר 0.
2. עליכם לעבור על כל הצמתים בעץ ולסכום את ערכיהם.
3. ניתן לפתור את הבעיה באמצעות רקורסיה.

### דוגמאות:

1. עבור העץ: 5
     / \ 
     3 8 
     / \
     1   4

הפונקציה תחזיר: 21 (5 + 3 + 8 + 1 + 4)

2. עבור העץ:
10
/ \
-2 7
הפונקציה תחזיר: 15 (10 + (-2) + 7)

3. עבור עץ ריק (null), הפונקציה תחזיר: 0





## 6a1.2 המספר המקסימלי בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-RJbpTdUbf7tw554) -->

עליכם לממש פונקציה חיצונית בשם `FindMaxInBinaryTree` אשר מקבלת פרמטר אחד:

1. tree - עץ בינארי (מסוג BinNode

הפונקציה צריכה להחזיר את המספר המקסימלי הקיים בעץ.

### דגשים:

1. השתמשו בגישה רקורסיבית לפתרון הבעיה.
2. עליכם לטפל במקרה שבו העץ ריק (null). במקרה זה, מומלץ להחזיר ערך שיציין שאין מקסימום (לדוגמה, int.MinValue ב-C#).
3. השתמשו במחלקה BinNode מהספרייה Unit4.CollectionsLib.
4. שימו לב לשימוש ב-using Unit4.CollectionsLib; בתחילת הקובץ.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-RJbpTdUbf7tw554) -->

### דוגמאות:

1. עבור העץ:

5
/ \
3 8
/ \
1   4

הפונקציה תחזיר: 8

2. עבור העץ:
10
/ \
2 7
הפונקציה תחזיר: 10

3. עבור העץ:
-1
/ \
-5 -2
הפונקציה תחזיר: -1








## 6a1.3
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-xZv7vuJqdKon9WX) -->

עליכם לממש פונקציה בשם `CountSingleChildren` אשר מקבלת פרמטר אחד:

1. t - עץ בינארי (מסוג BinNode) המכיל מספרים שלמים.

הפונקציה צריכה להחזיר את המספר הכולל של צמתים בעץ שיש להם בדיוק ילד אחד (בן יחיד).

### דגשים:

1. יש לממש את הפונקציה באופן רקורסיבי.
2. עץ ריק (null) אינו מכיל בנים יחידים.
3. עליכם להשתמש במחלקת BinNode מהספרייה Unit4.CollectionsLib.
4. יש להוסיף את השורה using Unit4.CollectionsLib; בראש הקובץ.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-xZv7vuJqdKon9WX) -->

### דוגמאות:

1. עבור העץ הבא:

5
/ \
2 8
/ \
1 9
הפונקציה תחזיר 2 (הבנים היחידים הם 2 ו-8).

1. עבור העץ הבא:

10
/ \
5 15
/
3
הפונקציה תחזיר 1 (הבן היחיד הוא 5).

1. עבור העץ הבא:

1
/ \
2 3
הפונקציה תחזיר 0 (אין בנים יחידים).

1. עבור עץ ריק, הפונקציה תחזיר 0.







## 6a1.4
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-9V82E37LZtLCkLU) -->

עליכם לממש פונקציה בשם `CountEvenNodes` אשר מקבלת פרמטר אחד:

1. t - עץ בינארי (מסוג BinNode) שהצמתים שלו הם מטיפוס שלם.

הפונקציה צריכה להחזיר את כמות הצמתים בעץ המכילים ערכים זוגיים.

שימו לב למקרים הבאים:

1. אם העץ ריק (כלומר, t הוא null), הפונקציה צריכה להחזיר 0.
2. עליכם לעבור על כל הצמתים בעץ ולבדוק את זוגיות ערכם.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-9V82E37LZtLCkLU) -->

### דוגמאות:

1. עבור העץ הבא:

2
/ \
4 5
/ \
1 6
הפונקציה תחזיר 3 (הצמתים 2, 4, 6 זוגיים).

1. עבור העץ הבא:

1
/ \
3 5
הפונקציה תחזיר 0 (אין צמתים זוגיים).

1. עבור עץ ריק (null), הפונקציה תחזיר 0.






## 6a1.6 סכום בנים ימניים בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-Pc8EwaYDAV1SHR6) -->

עליכם לממש פונקציה בשם `SumOfRightChildren` אשר מקבלת פרמטר אחד:

1. tree - עץ בינארי של מספרים שלמים (מסוג BinNode).

הפונקציה צריכה לחשב ולהחזיר את סכום כל הערכים של הבנים הימניים בעץ.

### דגשים:

1. אם העץ ריק (כלומר, tree הוא null), הפונקציה צריכה להחזיר 0.
2. עליכם לעבור על כל הצמתים בעץ ולבדוק אם קיים להם בן ימני. אם כן, יש להוסיף את ערכו לסכום.
3. השתמשו במחלקת BinNode מהספרייה Unit4.CollectionsLib.
4. אין לשנות את מבנה העץ המקורי במהלך החישוב.









## 6a1.7 ספירת צמתים בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-PfzCbpw6xERpiRQ) -->

עליכם לממש פונקציה חיצונית בשם `CountOccurrences` אשר מקבלת שני פרמטרים:

1. tree - עץ בינארי של מספרים שלמים (מסוג BinNode
2. x - מספר שלם (int) לחיפוש וספירה.

הפונקציה צריכה להחזיר את כמות הצמתים בעץ `tree` שערכם שווה ל-`x`.

### דגשים:

1. השתמשו בגישה רקורסיבית לפתרון הבעיה.
2. טפלו במקרה שבו העץ ריק (null).
3. עליכם להשתמש במחלקת BinNode מהספרייה Unit4.CollectionsLib.
4. אין לשנות את מבנה העץ המקורי.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-PfzCbpw6xERpiRQ) -->

### דוגמאות:

עבור העץ:
1. 4 / \ 2 5 / \ 1 2

והמספר X = 2, הפונקציה תחזיר 2.
עבור העץ:
1. 10 / \ 20 30 / \ 40 50

והמספר X = 10, הפונקציה תחזיר 1.
עבור העץ:
1. 7 / \ 7 7

והמספר X = 7, הפונקציה תחזיר 3.









## 6a1.8 ספירת עלים בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-HHVed2UwzSG73nG) -->

עליכם לממש פונקציה סטטית בשם `CountLeaves` אשר מקבלת פרמטר אחד:

1. tree - עץ בינארי (מסוג BinNode) המכיל מספרים שלמים.

הפונקציה צריכה להחזיר את מספר העלים בעץ הבינארי הנתון.

### דגשים:

1. עלה הוא צומת שאין לו ילד שמאלי ואין לו ילד ימני.
2. אם העץ ריק (null), יש להחזיר 0 עלים.
3. אם העץ מכיל רק צומת אחד, צומת זה נחשב לעלה.
4. עליכם להשתמש במחלקה BinNode.
5. יש לכלול את השורה using Unit4.CollectionsLib; בקוד שלכם כדי להשתמש במחלקת BinNode.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-HHVed2UwzSG73nG) -->

### דוגמאות:

1. 

עבור העץ הבא:

1. 

5
1. 

/ \
1. 

2 8
1. 

/ /
1. 

1 7
1. 

העלים הם 1, 7, 8. הפונקציה תחזיר: 3

1. 
2. 

עבור העץ הבא:

10
/ \
5 15
/ \ / \
2 7 12 18

העלים הם 2, 7, 12, 18. הפונקציה תחזיר: 4

1. 
2. 

עבור עץ המכיל צומת בודד (לדוגמה: 42), הפונקציה תחזיר: 1

1.







## 6a1.9
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-nZTXCjDFBxrQQo9) -->

עליכם לממש פונקציה בשם `CountNodesSmallerThanChild` אשר מקבלת פרמטר אחד:

1. t - עץ בינארי (מסוג BinNode

הפונקציה צריכה להחזיר את כמות הצמתים בעץ שערכו קטן לפחות מאחד מילדיהם (השמאלי או הימני).

### דגשים:

1. יש לממש את הפונקציה באמצעות רקורסיה.
2. צומת נספר אם ערכו קטן מערך הילד השמאלי שלו, או שערכו קטן מערך הילד הימני שלו.
3. אם לצומת אין ילדים, הוא אינו נספר.
4. אם לצומת יש רק ילד אחד (שמאלי או ימני), יש לבדוק רק מולו.
5. השתמשו ב-using Unit4.CollectionsLib; עבור המחלקה BinNode.


<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-nZTXCjDFBxrQQo9) -->

### דוגמאות:

1. עבור העץ הבא:

5
/ \
3 8
/ \
6 9
הפלט יהיה: 2

1. הצומת 5 קטן מ-8 (5 < 8).
2. הצומת 6 קטן מ-9 (6 < 9).
3. הצומת 3 אינו קטן מאף אחד מילדיו (אין לו ילדים).
4. הצומת 8 אינו קטן מאף אחד מילדיו (8 > 6, 8 < 9 - אבל הוא לא קטן מלפחות אחד מילדיו).
5. עבור העץ הבא:

10
/ \\
4 15
/ \
2 6
הפלט יהיה: 1

1. הצומת 4 קטן מ-6 (4 < 6).
2. הצומת 10 אינו קטן מאף אחד מילדיו (10 > 4, 10 < 15 - אבל הוא לא קטן מלפחות אחד מילדיו).
3. עבור העץ הבא:

1
/ \
2 3
הפלט יהיה: 0

1. הצומת 1 אינו קטן מאף אחד מילדיו (1 < 2, 1 < 3 - אבל הוא לא קטן מלפחות אחד מילדיו).
2. עבור עץ עם צומת בודד (לדוגמה, 7):

7
הפלט יהיה: 0 (אין לו ילדים).

1. עבור עץ ריק:הפלט יהיה: 0






## 6a1.10  ספירת צמתים גדולים מהאב בעץ בינארי
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-yhEzaoqHjDR4P5F) -->

עליכם לממש פונקציה בשם `CountNodesGreaterThanParent` אשר מקבלת פרמטר אחד:

1. tree - מצביע לשורש של עץ בינארי (מסוג BinNode).

הפונקציה צריכה להחזיר את מספר הצמתים בעץ שערכם גדול מערך האב שלהם.

דגשים:

1. אין צורך להתייחס לשורש העץ, מכיוון שלשורש אין אב.
2. יש להשתמש במחלקת BinNode עבור צמתי העץ.
3. הפתרון צריך להיות רקורסיבי.
4. ודאו שאתם מטפלים כראוי במקרה של עץ ריק או עץ עם צומת שורש בלבד.

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-yhEzaoqHjDR4P5F) -->

### דוגמאות:

עבור העץ הבא:

10
/ \
5 15
/ \ / \
3 4 12 18
1. הצומת 15 (אב 10) גדול מאביו. (ספירה: 1)
2. הצומת 18 (אב 15) גדול מאביו. (ספירה: 2)הפונקציה תחזיר: 2

עבור העץ הבא:

20
/ \
10 30
/ \ / \
5 15 25 35
1. הצומת 30 (אב 20) גדול מאביו. (ספירה: 1)
2. הצומת 35 (אב 30) גדול מאביו. (ספירה: 2)הפונקציה תחזיר: 2






## 6a1.11
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-Pagtda3BI15q3zW) -->

עליכם לממש פונקציה חיצונית בשם `SumOddSingleNodes` אשר מקבלת פרמטר אחד:

1. t - עץ בינארי (מסוג BinNode) שהצמתים שלו הם מטיפוס שלם.

הפונקציה צריכה לחזור את סכום כל הצמתים היחידים (צמתים שאין להם אח (למעט השורש) שערכם אי זוגי.

### דגשים:

1. יש להשתמש במחלקה BinNode.
2. שימו לב שערך הצומת חייב להיות אי-זוגי כדי להיכלל בסכום.

### קוד עזר

לצורך פתרון התרגיל, עליכם להשתמש ב-`using Unit4.CollectionsLib;`


<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-Pagtda3BI15q3zW) -->

### דוגמאות:

1. עבור העץ הבא: 10 / \ 5 20

/     /3     15

הצמתים היחידים הם 3 (בן יחיד של 5) ו-15 (בן יחיד של 20). שניהם אי-זוגיים. הפלט יהיה: 18 (3 + 15)

2. עבור העץ הבא:
1
/
2   3/   /4   5

הצמתים היחידים הם 4 (בן יחיד של 2) ו-5 (בן יחיד של 3). שניהם אי-זוגיים. הפלט יהיה: 9 (4 + 5)

3. עבור העץ הבא:
10
/
2    4

אין צמתים יחידים. הפלט יהיה: 0









## 6a1.12 כמות סבים בעץ בינארי

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-cHWOVsK7DXFICMx) -->

עליכם לממש פונקציה חיצונית בשם `CountGrandparents` אשר מקבלת פרמטר אחד:

1. t - עץ בינארי (BinNode

הפונקציה צריכה לחשב ולהחזיר את כמות הסבים בעץ.

### הגדרת סב:

1. צומת נחשב ל'סב' אם יש לו לפחות נכד אחד. כלומר, אם יש לו ילד (שמאלי או ימני) שלילד זה יש ילד משלו (שמאלי או ימני).

### דגשים:

1. אין לשנות את מבנה העץ המקורי.
2. השתמשו במחלקת BinNode מתוך Unit4.CollectionsLib.
3. שימו לב למקרים בהם צמתים מסוימים או כל העץ ריקים.


<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-vXSGGjwefq8p/csharp-cHWOVsK7DXFICMx) -->

### דוגמאות:

1. עבור העץ הבא:

10
/ \
5 15
/ \ / \
2 7 12 17
הצומת 10 הוא סב (יש לו נכדים: 2, 7, 12, 17). הפונקציה תחזיר 1.

1. עבור העץ הבא:

20
/ \
10 30
אין סבים בעץ זה. הפונקציה תחזיר 0.

1. עבור העץ הבא:

1
/ \
2 3
/ /
4 5
הצומת 1 הוא סב (יש לו נכדים: 4, 5). הפונקציה תחזיר 1.



- [בואו נצייר עלה. עבודה על SVG (ונכון זה לא לגמרי קשור)](/cst/6binnode/svg_leaf_mini_guide_kramdown)
- [בואו נצייר עלה - אינטגרציה באתר מבוסס markdown (ונכון גם זה לא לגמרי קשור)](/cst/6binnode/svg_leaf_mini_guide_kramdown2)
