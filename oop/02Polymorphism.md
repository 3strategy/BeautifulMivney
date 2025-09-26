---
layout: page
title: "פולימורפיזם - ההתחלה"
subtitle: "שיעור פתיחה בנושא"
tags: [פולימורפיזם]
mathjax: true
lang: he
---


{: .box-note}
**פולימורפיזם** (“ריבוי צורות”) הוא עיקרון מרכזי ב-OOP. המשמעות היא היכולת של פעולה אחת לקבל מימושים שונים במחלקות שונות. כך ניתן לכתוב קוד כללי יותר, המשתמש במחלקת בסיס, **והמערכת מפעילה בזמן ריצה את המימוש המתאים** של הפעולה לפי סוג האובייקט בפועל.

---

## סוגי פולימורפיזם 
- **פולימורפיזם בזמן קומפילציה (סטטי):** מתבצע ע"י *העמסת פעולות* (Overloading). הקומפיילר מחליט איזו פעולה להפעיל לפי סוגי וחתימות הפרמטרים.  
- **פולימורפיזם בזמן ריצה (דינמי):** מתבצע ע"י *דריסת פעולות* (Overriding). מחלקת בסיס מגדירה פעולה (לרוב כ-`virtual` או `abstract`), ותתי־מחלקות דורסות אותה. בזמן ריצה נקבע המימוש בפועל לפי סוג האובייקט.

---

## דוגמה: צורות גאומטריות
נבנה היררכיית מחלקות:  

- `Shape` - מחלקת בסיס עם פעולה `()Area`.  
- `Rectangle` - יורשת מ-`Shape` ומחשבת שטח מלבן.  
- `Square` - יורשת מ-`Rectangle` (ריבוע הוא מלבן מיוחד).  
- `Circle` - יורשת מ-`Shape` ומחשבת שטח מעגל.  

---

## תרשים UML
<div class="mermaid" style="direction:ltr;">

classDiagram
    class Shape {
        +Area() double
        +ToString() string
    }

    class Rectangle {
        -width : double
        -height : double
        +Area() double
        +ToString() string
    }

    class Square {
        +Area() double
        +ToString() string
    }

    class Circle {
        -radius : double
        +Area() double
        +ToString() string
    }

    Shape <|-- Rectangle
    Shape <|-- Circle
    Rectangle <|-- Square
</div>

---
**כללי כתיבת UML:** 
- תכונות מסומנות בתחילית `-` 
- פעולות מסומנות בתחילית `+`. 
- הורשה מסומנת בחץ `🠈` מהיורש למוריש
- הכלה מסומנת ב `─♦`
- אני ממליץ ליצור תרשימים כאלו [במרמייד]("https://mermaid.live/"). אפשר להעזר ב-AI.
- Unified Modeling Language :UML


## קוד C#

<details markdown="1">
<summary>📄 לחצו להצגת הקוד</summary>

```csharp
using System;

class Shape
{
    public virtual double Area() => 0.0;

    public override string ToString() => "Shape";
}

class Rectangle : Shape
{
    protected double width;
    protected double height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public override double Area() => width * height;

    public override string ToString() => $"Rectangle({width}x{height})";
}

class Square : Rectangle
{
    public Square(double side) : base(side, side) { }

    public override string ToString() => $"Square({width})";
}

class Circle : Shape
{
    private double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }

    public override double Area() => Math.PI * radius * radius;

    public override string ToString() => $"Circle({radius})";
}

class ShapesDemo
{
    static void Main()
    {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Rectangle(3, 4);
        shapes[1] = new Circle(5);
        shapes[2] = new Square(2);

        foreach (Shape s in shapes)
        {
            Console.WriteLine($"{s} area = {s.Area()}");
        }
    }
}
```


---

### פלט אפשרי

```
Rectangle(3x4) area = 12
Circle(5) area = 78.53981633974483
Square(2) area = 4
```
</details>

---

## יתרונות הפולימורפיזם

* **קוד כללי וגמיש יותר:** אותה פעולה פועלת על אובייקטים מסוגים שונים.
* **הרחבה קלה:** אפשר להוסיף מחלקות חדשות בלי לשנות קוד קיים.
* **תחזוקה ברורה:** קוד קצר, קריא וקל יותר לתחזוקה.

---

לסיכום, פולימורפיזם מאפשר לנו לכתוב קוד מופשט, מודולרי וניתן להרחבה. [בשיעור הבא](/oop/02Polymorphism2Bag25) נעמיק בהעמסת פעולות (סטטי) מול דריסת פעולות (דינמי).

[2. שיעור 2](/oop/02Polymorphism2Bag25)

[3. בזמן ריצה או בזמן קומפילציה](/oop/02Polymorphism3)

[4. מה קורה עם ובלי override](/oop/02Polymorphism4CwToString)

