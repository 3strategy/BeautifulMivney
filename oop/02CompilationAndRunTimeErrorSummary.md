---
layout: page
title: "סיכום שגיאות קומפילציה וזמן ריצה"
subtitle: "תבניות שגיאה שחוזרות בשאלוני הורשה, המרה ופולימורפיזם"
tags: [פולימורפיזם, קומפילציה, זמן ריצה, casting, exceptions, OOP]
mathjax: true
lang: he
---

{: .box-success}
זהו דף אבחון מהיר. בכל דוגמה קראו קודם את הקוד, אחר כך שאלו: האם הקומפיילר בכלל מרשה להמשיך, ואם כן, האם זמן הריצה יצליח.

## שגיאות קומפילציה

### 1. הפעולה לא קיימת על הטיפוס המוצהר

```csharp
Object a2 = new Antelope(10);
a2.IsSame(a2);
```

{: .box-error}
**שגיאת קומפילציה.** הטיפוס המוצהר הוא `Object`, ול-`Object` אין פעולה בשם `IsSame`. לכן הקוד נעצר עוד לפני זמן ריצה.

{: .box-success}
**תיקון מינימלי אם ידוע שהעצם בזכרון הוא יונק:**

```csharp
((Mammal)a2).IsSame((Mammal)a2);
```

{: .box-warning}
ה-`cast` כאן לא משנה את האובייקט בזכרון. הוא רק מאפשר לקומפיילר לראות את הפעולה דרך טיפוס מתאים יותר.

### 2. אין `overload` מתאים לארגומנט הנתון

```csharp
Antelope a1 = new Antelope(10);
Object a2 = new Antelope(10);
a1.IsSame(a2);
```

{: .box-error}
**שגיאת קומפילציה.** השם `IsSame` קיים, אבל אין חתימה מתאימה עבור ארגומנט מטיפוס מוצהר `Object`. זו לא שגיאת זמן ריצה, כי אפילו לא נבחרה פעולה חוקית.

{: .box-success}
**תיקוני `cast` אפשריים, לפי הפעולה שרוצים להפעיל:**

```csharp
a1.IsSame((Antelope)a2);
a1.IsSame((Mammal)a2);
```

{: .box-warning}
שני התיקונים אינם שקולים. ה-`cast` ל-`Antelope` יכול לבחור `overload` אחד, וה-`cast` ל-`Mammal` יכול לבחור `overload` או מימוש אחר.

### 3. גישה לחבר שאינו נגיש

```csharp
Antelope a1 = new Antelope(10);
Console.WriteLine(a1.weight);
```

{: .box-error}
**שגיאת קומפילציה.** השדה `weight` הוא `protected`, ולכן קוד חיצוני שאינו מחלקת בן אינו רשאי לגשת אליו ישירות.

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
אחרי שהוספתם `cast`, השגיאה יכולה לעבור מזמן קומפילציה לזמן ריצה. אם האובייקט בזכרון אינו `Beaver`, תתקבל `InvalidCastException`.

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

```csharp
class A
{
    public void F() { Console.Write("A"); }
}

class B : A
{
    public new void F() { Console.Write("B"); }
}

A x = new B();
x.F();
```

{: .box-warning}
**אין כאן שגיאה בכלל.** יודפס `A`, כי `F` אינה חלק משרשרת `override`. המתודה של `B` רק מסתירה את זו של `A`, והקריאה דרך הטיפוס המוצהר `A` נשארת עם `A.F()`.

{: .box-success}
**אם רוצים פולימורפיזם אמיתי, צריך `virtual` ו-`override`:**

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

## משפט סיכום

{: .box-success}
אם אין חתימה חוקית, זו **שגיאת קומפילציה**. אם יש חתימה חוקית אבל האובייקט בפועל לא מתאים, זו **שגיאת זמן ריצה**. ברוב שאלות הפולימורפיזם, ההבדל הזה הוא כל השאלה.
