---
layout: page
title: "ex3a.0 שרשרת חרוזים"
subtitle: "שרשרת חוליות ראשונה"
tags: []
lang: he
---


## 3a0.1 CreateChain3 {#id3a0.1}
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-pKoeMVE31zVF0SW) -->

במשימה זו, עליכם לממש את הפונקציה `CreateChain3` כך שתבנה שרשרת של שלושה חרוזים (Bead) ותחזיר את החרוז הראשון בשרשרת. השרשרת צריכה להיות עם הצבעים הבאים ובסדר זה: "Red" -> "Blue" -> "Green".

### הגדרת המחלקה Bead:

**המחלקה `Bead` מסופקת לכם וכוללת את התכונות והמתודות הבאות:**

```csharp
public class Bead
{
private string color;
private Bead nextBead;

// קונסטרוקטורים
public Bead(string color) { this.color = color; this.nextBead = null; }
public Bead(string color, Bead nextBead) { this.color = color; this.nextBead = nextBead; }

// מתודות Getters
public string GetColor() { return color; }
public Bead GetNextBead() { return nextBead; }

// מתודת Setter
public void SetNextBead(Bead nextBead) { this.nextBead = nextBead; }

// מתודת ToString
public override string ToString() { return color; }

}
```

### הפונקציה למימוש:

עליכם לממש את הפונקציה `CreateChain3`:

```csharp
public static Bead CreateChain3()
{
    // TODO: implement 3-bead chain creation
    return null;
}

```
### דרישות:

1. צרו שלושה אובייקטים מסוג Bead עם הצבעים "Red", "Blue", ו-"Green".
2. קשרו את החרוזים זה לזה כך שהחרוז האדום יצביע על החרוז הכחול, והחרוז הכחול יצביע על החרוז הירוק.
3. החזירו את החרוז הראשון בשרשרת (החרוז האדום).





## 3a0.2 יצירת חרוזים ממערך {#id3a0.2}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-JUThDPqyBCaNsqM) -->

במשימה זו, עליכם לממש פונקציה סטטית בשם `CreateChainFromStart` שתקבל מערך של מחרוזות (המייצגות צבעים) ותבנה מהן שרשרת של אובייקטי `Bead` (חרוזים) בסדר הנתון. הפונקציה צריכה להחזיר את החרוז הראשון (ראש השרשרת) שנוצר.

### הפונקציה למימוש:

עליכם לממש את הפונקציה הסטטית הבאה בתוך מחלקת `Solution`:

```csharp
public static Bead CreateChainFromStart(string[] colors)
{
// TODO: implement bead chain creation from start
return null;
}
```

### דרישות:

1. הפונקציה תקבל מערך string[] colors.
2. עבור כל צבע במערך, צרו אובייקט Bead חדש.
3. קשרו את החרוזים זה לזה בסדר שבו הם מופיעים במערך, כך שהחרוז הראשון במערך יהיה ראש השרשרת (head).
4. הפונקציה צריכה להחזיר את אובייקט Bead המהווה את ראש השרשרת.
5. אם המערך colors ריק, הפונקציה צריכה להחזיר **null**.



## 3a0.3 יצירה מהסוף להתחלה {#id3a0.3}
<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-Lbm3LOFqvfsIs1k) -->

בתרגיל זה, עליכם לממש פונקציה סטטית בשם `CreateChainFromEnd` במחלקת `Solution`. פונקציה זו תקבל מערך של מחרוזות צבע (`string[] colors`) ותבנה מהן שרשרת חרוזים מקושרת (Linked List) באמצעות המחלקה `Bead`.

### דרישות:

1. עיבוד מהסוף להתחלה: הפונקציה צריכה לעבור על המערך colors מהאיבר האחרון (אינדקס colors.Length - 1) ועד האיבר הראשון (אינדקס 0).
2. בניית השרשרת:
3. בכל איטרציה, צרו מופע חדש של Bead עם הצבע הנוכחי מהמערך.
4. חברו את החרוז החדש שיצרתם לחזית השרשרת שכבר נבנתה (או ל-null אם זהו החרוז הראשון שאתם יוצרים).
5. עדכנו את ראש השרשרת כך שיצביע על החרוז החדש שיצרתם.
6. החזרת ראש השרשרת: הפונקציה צריכה להחזיר את החרוז הראשון (ראש השרשרת) של השרשרת המקושרת שנוצרה.


### הפונקציה למימוש:

עליכם לממש את הפונקציה הבאה במחלקת `Solution`:
```csharp
public static class Solution
{
    public static Bead CreateChainFromEnd(string[] colors)
    {
        // TODO: implement bead chain creation from end
        return null;
    }
}
```



## 3a0.4 הדפסת שרשרת {#id3a0.4}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-IehsbvFDySAAhgi) -->

במשימה זו, עליכם לממש את הפונקציה `PrintChain` אשר מקבלת כפרמטר את ראש השרשרת (אובייקט מסוג `Bead`) ומדפיסה את צבעי החרוזים לקונסולה.

### הפונקציה למימוש:

עליכם למלא את גוף הפונקציה `PrintChain` כך שתדפיס את צבעי החרוזים בפורמט הנדרש.

```csharp
public static void PrintChain(Bead head)
{
// TODO: implement chain printing
}
```

### דרישות:

1. הפונקציה תקבל את ראש השרשרת (head).
2. היא תדפיס את צבעי החרוזים, מופרדים באמצעות ' -> '.
3. אם השרשרת ריקה (כלומר, head הוא null), הפונקציה לא תדפיס דבר.
4. הדפסת ' -> ' לא תופיע בסוף השרשרת (לאחר החרוז האחרון).




## 3a0.5 ספירת חרוזים {#id3a0.5}


<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-v1lTlX75HoxF1nT) -->

בתרגיל זה, עליכם לכתוב פונקציה שתספור את מספר החרוזים בשרשרת נתונה של אובייקטי `Bead`. הפונקציה תקבל את ראש השרשרת ותחזיר את הספירה הכוללת.

### הפונקציה למימוש:

עליכם לממש את הפונקציה הסטטית `CountBeads` בתוך המחלקה `Solution` (או מחלקה אחרת שתבחרו, אך ודאו שהיא נגישה לבדיקות). הפונקציה צריכה לקבל אובייקט `Bead` כראש השרשרת (`head`) ולהחזיר את מספר החרוזים בשרשרת.

1. אם ראש השרשרת (head) הוא null, הפונקציה צריכה להחזיר 0.

```csharp
public static int CountBeads(Bead head)
{
    // TODO: implement bead counting logic
    return 0;
}
```



## 3a0.6  חיפוש חרוז {#id3a0.6}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-eLMtuaM29EDwik0) -->

בתרגיל זה, עליכם לממש פונקציה סטטית בשם `FindBead` שתקבל ראש של שרשרת חרוזים (מסוג `Bead`) וצבע יעד (מחרוזת). מטרת הפונקציה היא למצוא את החרוז הראשון בשרשרת שצבעו תואם לצבע היעד.

### הפונקציה למימוש:

עליכם להשלים את המימוש של הפונקציה הסטטית `FindBead`:

קלט:

1. head: אובייקט Bead המייצג את ראש השרשרת. אם השרשרת ריקה, head יהיה null.
2. targetColor: מחרוזת המייצגת את הצבע שאותו יש לחפש.

פלט:

1. הפונקציה צריכה להחזיר את אובייקט ה-Bead הראשון בשרשרת שצבעו תואם ל-targetColor.
2. אם לא נמצא חרוז עם הצבע המבוקש בכל השרשרת, הפונקציה צריכה להחזיר null.

```csharp
public static Bead FindBead(Bead head, string targetColor)
{
    // TODO: implement bead search
    return null;
}
```


### דרישות נוספות:

1. הפונקציה צריכה להיות סטטית (static).
2. יש להשתמש במתודות ה-Get של המחלקה Bead כדי לגשת לנתונים (צבע, חרוז הבא).
3. אין לשנות את המחלקה Bead עצמה.




## 3a0.7 הוספת חרוז לסוף: {#id3a0.7}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-GNLcEJp6gJaUFdf) -->

במשימה זו, עליכם לממש פונקציה בשם `AddBeadToEnd` שתקבל ראש של שרשרת חרוזים (רשימה מקושרת) וצבע של חרוז חדש, ותוסיף את החרוז החדש לסוף השרשרת.

### הפונקציה למימוש:

עליכם לממש את הפונקציה הסטטית `AddBeadToEnd` בתוך מחלקה בשם `BeadOperations`. הפונקציה צריכה לפעול לפי ההנחיות הבאות:

### קלט: הפונקציה מקבלת שני פרמטרים:

`head`: עצם מסוג `Bead` המייצג את ראש השרשרת הקיימת. אם השרשרת ריקה, `head` יהיה `null`.

`colorToAdd`: מחרוזת המייצגת את צבע החרוז החדש שיש להוסיף.

### פעולה: הפונקציה צריכה:

- ליצור חרוז חדש עם `colorToAdd`.
- אם השרשרת המקורית ריקה (`head` הוא `null`), החרוז החדש יהפוך לראש השרשרת.
- אם השרשרת אינה ריקה, יש לעבור על השרשרת עד לחרוז האחרון (החרוז ששדה ה-`nextBead` שלו הוא `null`).
- לקשר את החרוז החדש לחרוז האחרון בשרשרת.
- פלט: הפונקציה צריכה להחזיר את ראש השרשרת המעודכנת (זה יכול להיות אותו `head` אם השרשרת לא הייתה ריקה, או החרוז החדש אם השרשרת הייתה ריקה).

**הקוד שצריך לממש:**

```csharp
public static class BeadOperations
{
public static Bead AddBeadToEnd(Bead head, string colorToAdd)
{
// TODO: implement adding bead to the end
return head;
}
}
```



## 3a0.8 שרשור שרשראות {#id3a0.8}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-nsRkVrTjDBwdz0Y) -->

בתרגיל זה, עליכם לממש פונקציה לשרשור שרשראות חרוזים. שרשרת חרוזים מיוצגת על ידי רשימה מקושרת פשוטה, כאשר כל חרוז (Bead) מכיל צבע (string) והפניה לחרוז הבא בשרשרת.

### המשימה:

עליכם לממש את הפונקציה הסטטית `ConcatenateChains` בתוך המחלקה `Program` (או מחלקה אחרת שתבחרו, אך יש לוודא שהיא נגישה לבדיקות). הפונקציה תקבל שני פרמטרים מסוג `Bead` המייצגים את ראשי שתי השרשראות:

1. first: ראש השרשרת הראשונה.
2. second: ראש השרשרת השנייה.

הפונקציה צריכה לבצע את הפעולות הבאות:

1. חיבור: לשרשר את השרשרת second לסופה של השרשרת first.
2. החזרה: להחזיר את ראש השרשרת המשולבת.

### דגשים:

1. אם השרשרת first ריקה (null), הפונקציה צריכה להחזיר את השרשרת second.
2. אם השרשרת second ריקה (null), הפונקציה צריכה להחזיר את השרשרת first (לאחר שחיברתם את null לסופה, אם first לא הייתה ריקה).
3. יש להשתמש במתודות GetNextBead() ו-SetNextBead() של המחלקה Bead כדי לנווט ולשנות את מבנה השרשרת.

### חתימת הפונקציה למימוש:

```csharp
public static Bead ConcatenateChains(Bead first, Bead second)
{
// TODO: implement chain concatenation
return first;
}
```



## 3a0.9 היפוך שרשרת {#id3a0.9}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-DnstvfE7FiiNZRp) -->

במשימה זו, עליכם לממש פונקציה סטטית בשם `ReverseChain` במחלקת `Bead` שתהפוך את הסדר של שרשרת חרוזים (רשימה מקושרת).


### הפונקציה למימוש:

```csharp
public static Bead ReverseChain(Bead head)
{
// TODO: implement chain reversal
return null;
}
```

### דרישות:

1. הפונקציה ReverseChain תקבל כפרמטר את ראש השרשרת (head) מסוג Bead.
2. הפונקציה צריכה להפוך את סדר החרוזים בשרשרת על ידי שינוי מצביעי ה-nextBead של כל חרוז.
3. היפוך השרשרת צריך להתבצע 'במקום' (in-place), כלומר, אין ליצור חרוזים חדשים, אלא רק לשנות את הקישורים בין החרוזים הקיימים.
4. הפונקציה תחזיר את הראש החדש של השרשרת ההפוכה.
5. יש לטפל במקרה שבו השרשרת ריקה (head הוא null) או מכילה חרוז אחד בלבד.




## 3a0.10 הסרת חרוזים משרשרת {#id3a0.10}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-F9XxLUo2VUxg5OV) -->

במשימה זו, עליכם לממש פונקציה שתסיר חרוז ספציפי משרשרת חרוזים מקושרת. השרשרת מיוצגת על ידי אובייקטים מסוג `Bead` המקושרים ביניהם.

### המשימה:

עליכם לממש את הפונקציה הסטטית `RemoveBead` בתוך מחלקה בשם `Solution` (או כל מחלקה אחרת שתבחרו, אך יש לוודא שהיא נגישה לבדיקות). הפונקציה תקבל את ראש השרשרת (`head`) ואת הצבע של החרוז שיש להסיר (`colorToRemove`).

```csharp
public static Bead RemoveBead(Bead head, string colorToRemove)
{
// TODO: implement bead removal by color
return head;
}
```

### דרישות:

1. הפונקציה צריכה להסיר את המופע הראשון של חרוז עם הצבע הנתון שהיא מוצאת בשרשרת.
2. אם החרוז שצריך להסיר הוא ראש השרשרת, ראש השרשרת החדש צריך להיות החרוז הבא אחריו.
3. הפונקציה צריכה להחזיר את ראש השרשרת המעודכנת.
4. אם החרוז בצבע הנתון אינו נמצא בשרשרת, השרשרת צריכה להישאר ללא שינוי, והפונקציה תחזיר את ראש השרשרת המקורי.
5. אם השרשרת ריקה (head הוא null), הפונקציה צריכה להחזיר null.
6. אם החרוז היחיד בשרשרת הוא זה שצריך להסיר, הפונקציה צריכה להחזיר null.



## 3a0.11 הסרת חרוזים לפי מיקום זוגי/אי-זוגי {#id3a0.11}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-65Ycf01GtRIn9uF) -->

בתרגיל זה, עליכם לממש פונקציה שמסירה חרוזים משרשרת חרוזים (רשימה מקושרת) על בסיס מיקומם.

### הפונקציה למימוש:

עליכם לממש את הפונקציה הסטטית `RemoveBeadsByPosition`.

```csharp
public static Bead RemoveBeadsByPosition(Bead head, bool removeEven)
{
// TODO: implement position-based removal
return head;
}
```
### תיאור הפונקציה:

1. שם הפונקציה: RemoveBeadsByPosition
1. פרמטרים:
    1. head: ראש השרשרת (אובייקט מסוג Bead).
    1. removeEven: ערך בוליאני.
1. אם true, הפונקציה תסיר את כל החרוזים במיקומים זוגיים (2, 4, 6, ...).
1. אם false, הפונקציה תסיר את כל החרוזים במיקומים אי-זוגיים (1, 3, 5, ...).
1. ערך מוחזר: ראש השרשרת המעודכנת לאחר ההסרה.

### הנחיות:

1. המיקום של החרוזים מתחיל מ-1 (כלומר, החרוז הראשון הוא במיקום 1, השני במיקום 2, וכן הלאה).
2. יש לטפל במקרה שבו ראש השרשרת עצמו צריך להימחק.
3. הפונקציה צריכה לשנות את השרשרת הקיימת (לא ליצור שרשרת חדשה).
4. אין להשתמש במבני נתונים נוספים (כגון מערכים או רשימות) מעבר למבנה הרשימה המקושרת הנתון.



## 3a0.12 הסרת כל החרוזים העונים על תנאי {#id3a0.12}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-nZSdv8jbzyyVHKj) -->

### תיאור המשימה

במשימה זו, עליכם לממש פונקציה בשם `RemoveAll` שתסיר את כל המופעים של חרוזים בעלי צבע מסוים משרשרת חרוזים מקושרת (Linked List).


### הפונקציה למימוש

עליכם לממש את הפונקציה הסטטית `RemoveAll` בתוך מחלקה בשם `Solution` (או כל מחלקה אחרת שתבחרו, אך וודאו שהיא נגישה לבדיקות). הפונקציה תקבל את ראש השרשרת (`head`) ואת הצבע שיש להסיר (`colorToRemove`). היא צריכה להחזיר את ראש השרשרת המעודכנת לאחר ההסרה.

```csharp
public static Bead RemoveAll(Bead head, string colorToRemove)
{
    // TODO: implement removal of all matching beads
    return head;
}
```

### דרישות:

1. הפונקציה צריכה להסיר את כל המופעים של חרוזים עם הצבע הנתון.
2. הפונקציה צריכה לטפל במקרה שבו ראש השרשרת עצמו צריך להיות מוסר.
3. הפונקציה צריכה לטפל במקרה שבו השרשרת ריקה או שהצבע להסרה אינו קיים בשרשרת.
4. הפונקציה צריכה להחזיר את ראש השרשרת החדש (או null אם כל החרוזים הוסרו).



## 3a0.13 מציאת תבנית {#id3a0.13}

<!-- [link](https://stacks.co.il/console/classroom/cE8hnVaSTt/assignment/cE8hnVaSTt-csharp-aF1oQLlO0syV/csharp-syokFfWjqFABP40) -->

בתרגיל זה, עליכם לממש פונקציה שתבדוק האם שרשרת חרוזים מכילה רצף מסוים של צבעים (תבנית).

הפונקציה `HasPattern` מקבלת שני פרמטרים:

1. head: אובייקט Bead המייצג את ראש שרשרת החרוזים.
2. pattern: מערך של מחרוזות המייצג את תבנית הצבעים שאותה יש לחפש.

הפונקציה צריכה להחזיר:

1. true אם התבנית נמצאה כתת-רצף רציף בשרשרת החרוזים.
2. false אחרת.


### הפונקציה למימוש:

עליכם לממש את הפונקציה הסטטית `HasPattern` בתוך מחלקה בשם `Solution`:

```csharp
public class Solution
{
    public static bool HasPattern(Bead head, string[] pattern)
    {
        // TODO: implement pattern checking
        return false;
    }
}
```

### דרישות נוספות:

1. התבנית חייבת להימצא כרצף רציף בשרשרת. לדוגמה, אם השרשרת היא אדום -> ירוק -> כחול והתבנית היא אדום, כחול, הפונקציה צריכה להחזיר false מכיוון שכחול אינו מופיע מיד אחרי אדום.
2. אם התבנית ריקה, הפונקציה צריכה להחזיר true (תבנית ריקה תמיד נמצאת).
3. אם שרשרת החרוזים ריקה (head הוא null) והתבנית אינה ריקה, הפונקציה צריכה להחזיר false.
