---
layout: page
title: "ירושה - שיעור פתיחה"
subtitle: "היכרות ראשונית עם ירושה ומבני מחלקות"
tags: [ירושה, OOP, CSharp]
mathjax: true
lang: he
---

{: .box-note}
**ירושה** היא מנגנון המאפשר לנו להגדיר מחלקה חדשה (יורשת) על בסיס מחלקה קיימת (בסיס). זוהי **אבן יסוד** בתכנות מונחה עצמים. במחלקה היורשת יהיו באופן אוטומטי כל התכונות והפעולות של מחלקת הבסיס. המחלקה היורשת יכולה להוסיף תכונות ופעולות, ואף להחליף פעולות מסויימות ממחלקת הבסיס. מומלץ לצפות ,תחילה ב- [youtube playlist](https://www.youtube.com/playlist?list=PLnVUJu2KuoA0CpYg4ga45Q0C5dGaSEYPH)



<details markdown="1"><summary>מטרות הלמידה</summary>

## מטרות הלמידה

בסיום פרק זה תוכלו:
- להבין את המושג "ירושה" בתכנות מונחה עצמים
- לסרטט היררכיות של ירושה והכלה בין מחלקות
- להבין ולממש את עקרון "הוא סוג של" (IS-A)
- לקרוא, לממש, ולצייר דיאגרמות UML

</details>
---


## כתיבה של ירושה ב-C#

```csharp
public class Animal { }
public class Dog : Animal   // Dog inherits Animal
{

}
```





## תרשים UML של שרשרת ירושה

לעיתים נציג מחלקות בתרשים UML. החץ כלפי מעלה - מהיורשת אל מחלקת הבסיס. על צורת הכתיבה של UML יוסבר בהמשך

<div class="mermaid" style="direction:ltr">
classDiagram
    direction TB
    class Organism {
      -string name
      -int age
      +ToString() string
    }
    class Mammal {
      -bool hasFur
      +GetHasFur() bool
      +SetHasFur(bool)
    }
    class Dog {
      -string breed
      +GetBreed() string
      +SetBreed(string)
    }

    Organism <|-- Mammal : חץ מנגזרת לבסיס
    Mammal <|-- Dog : ראש חץ חלול לציון ירושה


</div>



---

## מימוש בקוד

<details markdown=1><summary>למימוש פשוט</summary>

```csharp
public class Organism
{
    private string name;
    private int age;

    public Organism(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    public override string ToString() => $"{name}, age {age}";
}

public class Mammal : Organism
{
    private bool hasFur;

    public Mammal(string name, int age, bool hasFur) : base(name, age)
    {
        this.hasFur = hasFur;
    }

    public bool GetHasFur() => hasFur; 
    public void SetHasFur(bool hasFur) => this.hasFur = hasFur; 
}

public class Dog : Mammal
{
    private string breed;

    public Dog(string name, int age, string breed)
        : base(name, age, true)
    {
        this.breed = breed;
    }

    public string GetBreed() => breed; 
    public void SetBreed(string breed) => this.breed = breed; 
}
```


<div class="box-success" markdown=1>

**סדר פעולות ביצירת עצם ממחלקה יורשת:**
- אם לא מצוין `(...)base` בבנאי של מחלקה יורשת, ייקרא אוטומטית **בנאי ברירת מחדל** של מחלקת הבסיס (**אם קיים**).  
- סדר היצירה של אובייקט יורש הוא: קודם בנאי הבסיס, אחריו בנאי המחלקה הנגזרת.
</div>

---

## שימוש: הדגמה עם מערך עצמים

```csharp
Dog[] kennel = new Dog[]
{
    new Dog("Rex", 5, "Labrador"),
    new Dog("Luna", 2, "Husky"),
    new Dog("Milo", 3, "Beagle")
};

for (int i = 0; i < kennel.Length; i++)
{
    Console.WriteLine(
        $"{i}: {kennel[i]}, breed {kennel[i].GetBreed()}");
}
```

</details>




---


<details markdown=1><summary>למימוש מעט יותר משוכלל</summary>

<div class="mermaid" style="direction:ltr;">
classDiagram
    direction TB
    class Organism {
      -static int counter
      -readonly int id
      -string name
      -int age
      +GetId() int
      +ToString() string
    }
    class Mammal {
      -bool hasFur
      +GetHasFur() bool
      +SetHasFur(bool)
      +ToString() string
    }
    class Dog {
      -string breed
      +GetBreed() string
      +SetBreed(string)
      +ToString() string
    }

    Organism <|-- Mammal
    Mammal <|-- Dog
</div>

בגרסה זו השינויים הבאים:
1. שימוש במשתנה סטטי ליצירת מונה של מופעים והקצאת id לכל עצם
1. למחלקות השונות הוגדר `()override string ToString` שמחזיר יצוג של העצם
1. בכל `ToString` נוספה קריאה לאותה הפעולה במחלקת הבסיס. כך שכל מחלקה מטפלת ומוסיפה רק את **המידע שלה**


```cs
public class Organism
{
    private static int counter = 0;   // counts instances
    private readonly int id;          // assigned unique id
    private string name;
    private int age;

    public Organism(string name, int age)
    {
        this.id = counter++;
        this.name = name;
        this.age = age;
    }

    public string GetName() { return name; }
    public void SetName(string name) { this.name = name; }
    public int GetAge() { return age; }
    public void SetAge(int age) { this.age = age; }
    public int GetId() => id;
    public override string ToString() => $"{id}: {name}, age {age}";
}

public class Mammal : Organism
{
    private bool hasFur;

    public Mammal(string name, int age, bool hasFur) : base(name, age)
    {
        this.hasFur = hasFur;
    }

    public bool GetHasFur() => hasFur;
    public void SetHasFur(bool hasFur) => this.hasFur = hasFur;
}

public class Dog : Mammal
{
    private string breed;

    public Dog(string name, int age, string breed)
        : base(name, age, true)
    {
        this.breed = breed;
    }

    public string GetBreed() => breed;
    public void SetBreed(string value) => breed = value;
    public override string ToString() =>
        base.ToString() + $", breed {breed}";
}

// Example usage
class Program
{
    static void Main()
    {
        Dog[] kennel = new Dog[]
        {
            new Dog("Rex", 5, "Labrador"),
            new Dog("Luna", 2, "Husky"),
            new Dog("Milo", 3, "Beagle")
        };

        foreach (var dog in kennel)
            Console.WriteLine(dog);

    }
}
```

פלט
```
0: Rex, age 5, breed Labrador
1: Luna, age 2, breed Husky
2: Milo, age 3, breed Beagle
```
</details>




## רמות גישה (Access Modifiers)
ניתן לקבוע רמות גישה שונות לשדות, תכונות, פעולות ובנאים

**טבלה מסכמת:**

| נגישות       | access modifier                                                      |
|-------------|------------------------------------------------------------------------|
|נגיש מכל מקום בפרויקט.                                                 | `public`    | 
| נגיש רק מתוך המחלקה עצמה.                                              |`private`   | 
|  נגיש מתוך המחלקה עצמה ומתוך **מחלקות שיורשות** ממנה.                       |**`protected`** |
|  נגיש לכל הקבצים באותו Assembly (בבחינת בגרות נרשום **public**). |`internal`  |
{: .table-rl}

---




## "הוא סוג של" – עקרון ה־IS A  

{: .box-note}  
ב-OOP אנו משתמשים בירושה ליצירת יחס של **"הוא סוג של" (IS A)**.  
מחלקת בן יורשת ממחלקת אב ולכן **היא סוג של** המחלקה שמעליה.  
**ניתן לבדוק זאת בזמן ריצה** בעזרת המילה השמורה `is`.

---

<details markdown=1><summary>דוגמת קוד</summary>

```csharp
public class Animal { }
public class Dog : Animal 
{
    public void Bark() => Console.WriteLine("Woof!");
}

class Program
{
    static void Main()
    {
        Animal a1 = new Dog();
        Animal a2 = new Animal();

        if (a1 is Dog d)  // pattern matching
            d.Bark();   // a1 הוא סוג של Dog → Woof!
        if (a2 is Dog) 
            Console.WriteLine("a2 הוא כלב"); 
        else 
            Console.WriteLine("a2 אינו כלב");
    }
}
```
</details>

---

### סיכום is:

* **IS A** מייצג ירושה – כלב **הוא סוג של** בעל־חיים.
* `is` בודק אם אובייקט שייך לטיפוס מסוים.
* עם **pattern matching** (`obj is Dog d`) אפשר גם לבצע המרה בטוחה לאותו טיפוס.






---

## סיכום

* ירושה יוצרת יחס "הוא סוג של".
* סדר בנאים: מהבסיס אל הנגזר.
* שימוש ב-`private`, `protected`, `public`, `internal` חשוב כדי לשלוט בגישה.
* בבגרות נרשום `public` ולא `internal`.

{: .box-note}
**תרגיל:** הוסיפו מחלקה נוספת `WorkingDog` עם שדה `Task` ובנאי מתאים, והדגימו קריאות ל-Getters/Setters.



---

[Campus playlist - ירושה בלבד](https://www.youtube.com/playlist?list=PLnVUJu2KuoA0CpYg4ga45Q0C5dGaSEYPH)

[המשך - הרחבת נושא ירושה](/oop/01inheritc)

[המשך - הרחבה בנושא בנאים](/oop/01inheritdconstructors)

[קמפוס - מצגת ירושה](https://lomdot.education.gov.il/Qualitest/CSA11B-inherit/index.html)

[קמפוס - מצגת מחלקות אבסטרקטיות](https://lomdot.education.gov.il/Qualitest/CSA11C-abstract/index.html)