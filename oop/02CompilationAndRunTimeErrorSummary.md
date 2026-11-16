---
layout: page
title: "סיכום שגיאות קומפילציה וזמן ריצה"
subtitle: "תבניות שגיאה שחוזרות בשאלוני הורשה, המרה ופולימורפיזם"
tags: [פולימורפיזם, קומפילציה, זמן ריצה, casting, exceptions, OOP]
mathjax: true
lang: he
---

[הקודם – עץ החלטה]({{ '/oop/02FunctionChoicePath/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – שאלון פולימורפיזם לבגרות]({{ '/interactive/02questionnairePolymCore/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
בכל דוגמה בדקו תחילה מה הקומפיילר יודע לפי הטיפוסים בקוד. אם הקוד מתקמפל, עקבו אחרי האובייקטים שנוצרו בפועל ובדקו מה קורה בהפעלה.

## קוד הבסיס לדוגמאות 1–6

`Mammal` (יונק) היא מחלקת הבסיס. `Antelope` (אנטילופה) ו-`Beaver` (בונה) יורשות ממנה. כל בנאי מקבל משקל ומעביר אותו לבנאי של `Mammal`, ששומר אותו בשדה `weight`. הפעולה הציבורית `GetWeight()` זמינה בשתי המחלקות היורשות.

ההיררכיה מעובדת מתוך [שאלה 17 בבגרות קיץ 2022]({{ '/interactive/02questionnaire2022q17/' | relative_url }}). כדי לבדוק דוגמה בפרויקט Console, העתיקו את הקוד הבא ל-`Program.cs` והכניסו בכל פעם דוגמה אחת לתוך `Main`. בבדיקת תיקון השאירו את הכרזות המשתנים והחליפו את השורה הבעייתית בקטע המתוקן. לדוגמאות 7–8 יש קוד משלהן.

```csharp
using System;

public class Mammal
{
    protected int weight;

    public Mammal(int weight)
    {
        this.weight = weight;
    }

    public int GetWeight()
    {
        return weight;
    }

    public virtual bool IsSame(Mammal other)
    {
        Console.WriteLine("In Mammal");
        return ReferenceEquals(this, other);
    }
}

public class Antelope : Mammal
{
    public Antelope(int weight) : base(weight) { }

    public bool IsSame(Antelope other)
    {
        Console.WriteLine("In Antelope");
        return other != null && weight == other.weight;
    }
}

public class Beaver : Mammal
{
    public Beaver(int weight) : base(weight) { }

    public override bool IsSame(Mammal other)
    {
        Console.WriteLine("In Beaver");
        return other is Beaver beaver && weight == beaver.weight;
    }
}

public class Program
{
    public static void Main()
    {
        // Paste one example here.
    }
}
```

- `Mammal.IsSame(Mammal)` בודקת אם שתי ההפניות מצביעות על אותו אובייקט.
- `Antelope.IsSame(Antelope)` מוסיפה חתימה (`overload`) ומשווה משקלים. `Antelope` יורשת גם את `IsSame(Mammal)`.
- `Beaver.IsSame(Mammal)` דורסת (`override`) את המימוש של `Mammal` ובודקת אם הארגומנט הוא `Beaver` בעל אותו משקל.

{: .box-note}
בשורה `Object a2 = new Antelope(10);` הטיפוס המוצהר של `a2` הוא `Object`, והאובייקט שנוצר הוא `Antelope`. הקומפיילר בוחר חתימה לפי הטיפוסים של הביטויים בקוד. בזמן ריצה, המרה מפורשת נבדקת מול האובייקט בפועל, ואם החתימה שנבחרה היא וירטואלית, טיפוס האובייקט שמקבל את הקריאה קובע איזה מימוש יופעל.

## שגיאות קומפילציה

### 1. הפעולה לא קיימת על הטיפוס המוצהר

```csharp
Object a2 = new Antelope(10);
a2.IsSame(a2);
```

{: .box-error}
**שגיאת קומפילציה.** הטיפוס המוצהר הוא `Object`, ול-`Object` אין פעולה בשם `IsSame`. לכן הקוד נעצר עוד לפני זמן ריצה.

{: .box-success}
**תיקון כשהאובייקט הוא `Mammal` או שייך למחלקה יורשת**

```csharp
Console.WriteLine(((Mammal)a2).IsSame((Mammal)a2));
```

{: .box-warning}
שתי ההמרות נותנות לביטויים את הטיפוס `Mammal` ומחזירות הפניה לאותו אובייקט. לכן מופעלת `Mammal.IsSame(Mammal)` ומודפס `In Mammal` ואחריו `True`.

### 2. אין `overload` מתאים לארגומנט הנתון

```csharp
Antelope a1 = new Antelope(10);
Object a2 = new Antelope(10);
a1.IsSame(a2);
```

{: .box-error}
**שגיאת קומפילציה.** עבור `a1` יש שתי חתימות זמינות, `IsSame(Antelope)` ו-`IsSame(Mammal)`. הטיפוס המוצהר של `a2` הוא `Object`, ואין המרה אוטומטית ממנו לטיפוס פרמטר של אף אחת מהחתימות.

{: .box-success}
**שתי המרות אפשריות של הארגומנט**

```csharp
Console.WriteLine(a1.IsSame((Antelope)a2));
Console.WriteLine(a1.IsSame((Mammal)a2));
```

- ההמרה ל-`Antelope` בוחרת `IsSame(Antelope)`. יודפס `In Antelope` ואחריו `True` כי לשני האובייקטים משקל 10.
- ההמרה ל-`Mammal` בוחרת `IsSame(Mammal)`. `Antelope` יורשת את המימוש של `Mammal`, ולכן יודפס `In Mammal` ואחריו `False`. כל קריאה ל-`new Antelope(10)` יצרה אובייקט נפרד.

### 3. גישה לחבר שאינו נגיש

```csharp
Antelope a1 = new Antelope(10);
Console.WriteLine(a1.weight);
```

{: .box-error}
**שגיאת קומפילציה.** השדה `weight` מוגדר כ-`protected` בתוך `Mammal`. המחלקה `Program`, שבה נמצאת הדוגמה, נמצאת מחוץ להיררכיית הירושה ולכן אין לה גישה ישירה לשדה.

{: .box-success}
**תיקון טיפוסי:** להשתמש בפעולה ציבורית מתאימה, למשל:

```csharp
Console.WriteLine(a1.GetWeight());
```

{: .box-warning}
כאן `cast` לא יפתור דבר. הבעיה היא הרשאת גישה, לא טיפוס.

### 4. נדרשת המרה מפורשת

```csharp
Object obj = new Beaver(10);
Beaver b = obj;
```

{: .box-error}
**שגיאת קומפילציה.** המשתנה `obj` מוכרז כ-`Object`, ולכן נדרשת המרה מפורשת ל-`Beaver`. בלי `cast` הקומפיילר לא מאשר את ההשמה.

{: .box-success}
**תיקון מינימלי:**

```csharp
Beaver b = (Beaver)obj;
```

{: .box-warning}
כאן ההמרה תצליח כי `obj` מפנה ל-`Beaver`. אם `obj` יפנה ל-`Antelope`, אותה המרה תתקמפל ותיזרק `InvalidCastException` בזמן ריצה.

## שגיאות זמן ריצה

### 5. `cast` מפורש חוקי תחבירית, אבל שגוי בפועל

```csharp
Object a2 = new Antelope(10);
Console.WriteLine(((Beaver)a2).GetWeight());
```

{: .box-error}
**שגיאת זמן ריצה: `InvalidCastException`.** ההמרה מ-`Object` ל-`Beaver` מותרת תחבירית, אבל האובייקט בזכרון הוא `Antelope`, ולכן ההמרה נכשלת בזמן הרצה.

{: .box-success}
**תיקון פשוט אם רוצים לעבוד עם הטיפוס האמיתי שבזכרון:**

```csharp
Console.WriteLine(((Antelope)a2).GetWeight());
```

{: .box-warning}
כשאין ודאות לגבי הטיפוס בזכרון, עדיף לבדוק לפני ההמרה:

```csharp
if (a2 is Beaver beaver)
    Console.WriteLine(beaver.GetWeight());
```

### 6. הפניה ל-`null`

```csharp
Beaver b = null;
Console.WriteLine(b.GetWeight());
```

{: .box-error}
**שגיאת זמן ריצה: `NullReferenceException`.** המשתנה קיים, אבל הוא לא מצביע על אובייקט. ניסיון לקרוא פעולה דרך `null` יפיל את התוכנית בזמן הרצה.

{: .box-success}
**תיקון בסיסי:**

```csharp
if (b != null)
    Console.WriteLine(b.GetWeight());
```

### 7. מערך נראה חוקי, אבל סוג האיברים האמיתי לא מתאים

את הקטע הזה אפשר לבדוק בתוך `Main` גם בפרויקט שאין בו את מחלקות היונקים.

```csharp
object[] arr = new string[1];
arr[0] = new object();
```

{: .box-error}
**שגיאת זמן ריצה: `ArrayTypeMismatchException`.** המשתנה מוכרז כ-`object[]`, אבל המערך שבזכרון הוא למעשה `string[]`. לכן הכנסת `object` שאינו `string` נכשלת בזמן הרצה.

{: .box-success}
**תיקון אפשרי 1:** ליישר בין הטיפוס המוצהר לבין הטיפוס האמיתי של המערך.

```csharp
object[] arr = new object[1];
arr[0] = new object();
```

{: .box-success}
**תיקון אפשרי 2:** אם רוצים מערך מחרוזות, גם האיבר חייב להיות מחרוזת.

```csharp
string[] arr = new string[1];
arr[0] = "hello";
```

## מקרה מבלבל שאינו שגיאה

### 8. `new` גורם להפעלה מפתיעה, אבל לא לשגיאה

לדוגמה הזו אפשר להעתיק את הקוד הבא כקובץ `Program.cs` שלם.

```csharp
using System;

class A
{
    public void F() { Console.Write("A"); }
}

class B : A
{
    public new void F() { Console.Write("B"); }
}

class Program
{
    static void Main()
    {
        A x = new B();
        x.F();
    }
}
```

{: .box-warning}
**אין כאן שגיאה בכלל.** יודפס `A`, כי `F` אינה חלק משרשרת `override`. המתודה של `B` רק מסתירה את זו של `A`, והקריאה דרך הטיפוס המוצהר `A` נשארת עם `A.F()`.

{: .box-success}
**כדי שאותה קריאה ב-`Main` תדפיס `B`, החליפו את המחלקות `A` ו-`B` בגרסאות הבאות.**

```csharp
class A
{
    public virtual void F() { Console.Write("A"); }
}

class B : A
{
    public override void F() { Console.Write("B"); }
}
```

## איך לאבחן דוגמה חדשה

1. **בקומפילציה** בודקים אם ההשמה או ההמרה מותרת, אם הפעולה או השדה נגישים, ואם יש חתימה שמתאימה לטיפוסי הארגומנטים.
2. **בהרצה** בודקים אם ההמרה מצליחה מול טיפוס האובייקט בפועל ואם יש אובייקט שאפשר לקרוא דרכו לפעולה. בקריאה לפעולה וירטואלית, עוקבים אחרי ה-`override` לפי הטיפוס בפועל של מקבל הקריאה.
