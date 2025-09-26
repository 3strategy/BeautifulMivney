---
layout: page
title: "ירושה - שיעור פתיחה"
subtitle: "היכרות ראשונית עם ירושה ומבני מחלקות"
tags: [ירושה, OOP, CSharp]
mathjax: true
lang: he
---

# ירושה ב-C#

> ירושה היא מנגנון המאפשר לנו להגדיר מחלקה חדשה (יורשת) על בסיס מחלקה קיימת (בסיס).  
> זהו אבן יסוד בתכנות מונחה עצמים.

{: .box-note}
**דברים חשובים לזכור:**
- אם לא מצוין `base(...)` בבנאי של מחלקה יורשת, ייקרא אוטומטית בנאי ברירת מחדל של מחלקת הבסיס (אם קיים).  
- סדר ההרצה בעת יצירת אובייקט יורש הוא תמיד מלמטה למעלה: קודם בנאי הבסיס, אחריו בנאי הנגזר.

---

## רמות גישה (Access Modifiers)

{: .box-success}
**טבלה מסכמת:**

| הגדרה       | נגישות                                                                 |
|-------------|------------------------------------------------------------------------|
| `public`    | נגיש מכל מקום בפרויקט.                                                 |
| `private`   | נגיש רק מתוך המחלקה עצמה.                                              |
| `protected` | נגיש מתוך המחלקה עצמה ומתוך מחלקות שיורשות ממנה.                       |
| `internal`  | נגיש לכל הקבצים באותו Assembly (בבחינת בגרות לרוב נרשום **public**). |

---

## תרשים UML של שרשרת ירושה

```mermaid
classDiagram
    direction TB
    class Organism {
      -string name
      +GetName() string
      +SetName(string)
    }
    class Animal {
      -int age
      +GetAge() int
      +SetAge(int)
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

    Organism <|-- Animal
    Animal <|-- Mammal
    Mammal <|-- Dog
````

---

## מימוש בקוד C# (עם Getters/Setters בסגנון Java)

```csharp
public class Organism
{
    private string name;

    public Organism(string name)
    {
        Console.WriteLine("Organism.ctor");
        this.name = name;
    }

    public string GetName() { return name; }
    public void SetName(string name) { this.name = name; }
}

public class Animal : Organism
{
    private int age;

    public Animal(string name, int age) : base(name)
    {
        Console.WriteLine("Animal.ctor");
        this.age = age;
    }

    public int GetAge() { return age; }
    public void SetAge(int age) { this.age = age; }
}

public class Mammal : Animal
{
    private bool hasFur;

    public Mammal(string name, int age, bool hasFur) : base(name, age)
    {
        Console.WriteLine("Mammal.ctor");
        this.hasFur = hasFur;
    }

    public bool GetHasFur() { return hasFur; }
    public void SetHasFur(bool hasFur) { this.hasFur = hasFur; }
}

public class Dog : Mammal
{
    private string breed;

    public Dog(string name, int age, string breed)
        : base(name, age, true)
    {
        Console.WriteLine("Dog.ctor");
        this.breed = breed;
    }

    public string GetBreed() { return breed; }
    public void SetBreed(string breed) { this.breed = breed; }
}
```

---

## הדגמה עם מערך עצמים

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
        $"{i}: {kennel[i].GetName()}, " +
        $"age {kennel[i].GetAge()}, " +
        $"breed {kennel[i].GetBreed()}"
    );
}
```

---

## סיכום

* ירושה יוצרת יחס "הוא סוג של".
* סדר בנאים תמיד מהבסיס אל הנגזר.
* שימוש ב-`private`, `protected`, `public`, `internal` חשוב כדי לשלוט בגישה.
* בבחינת הבגרות נעדיף לרשום `public` במקום `internal`.

{: .box-note}
**תרגיל:** הוסיפו מחלקה נוספת `WorkingDog` עם שדה `Task` ובנאי מתאים, והדגימו קריאות ל-Getters/Setters.



---


[inheritc](/oop/01inheritc)

[inherit consturctors](/oop/01inheritdconstructors)
