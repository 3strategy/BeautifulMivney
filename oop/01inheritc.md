---
layout: page
title: "ירושה - הרחבה"
subtitle: "היכרות ראשונית עם ירושה ומבני מחלקות"
tags: [ירושה, OOP, CSharp]
mathjax: true
lang: he
---


<details markdown="1"><summary>מטרות הלמידה</summary>

## מטרות הלמידה

בסיום פרק זה תוכלו:
- להבין את המושג "ירושה" בתכנות מונחה עצמים
- ליצור היררכיות של מחלקות באמצעות ירושה
- להבין ולממש את עקרון "הוא סוג של" (IS-A)
- לקרוא ולצייר דיאגרמות UML של ירושה

</details>
---

## 1. מבוא - מה זו ירושה?

{: .box-note}
**הגדרה:** ירושה (Inheritance) היא מנגנון המאפשר למחלקה חדשה לרשת תכונות והתנהגויות ממחלקה קיימת. המחלקה היורשת נקראת "מחלקת בת" (Derived/Child Class) והמחלקה ממנה יורשים נקראת "מחלקת אב" (Base/Parent Class).

דמיינו עץ משפחה - ילדים יורשים תכונות מהוריהם. באופן דומה, בתכנות מונחה עצמים, מחלקות יכולות לרשת תכונות ופעולות ממחלקות אחרות.

### דוגמה מהעולם האמיתי
```
רכב (Vehicle)
    ├── מכונית (Car)
    │   ├── מכונית ספורט (SportsCar)
    │   └── מכונית משפחתית (FamilyCar)
    └── אופנוע (Motorcycle)
```

<div class="mermaid">
graph BT
    SportsCar[מכונית ספורט<br/>SportsCar] --> Car[מכונית<br/>Car]
    FamilyCar[מכונית משפחתית<br/>FamilyCar] --> Car
    Car --> Vehicle[רכב<br/>Vehicle]
    Motorcycle[אופנוע<br/>Motorcycle] --> Vehicle
</div>

---

## 2. עקרון IS-A - "הוא סוג של"

{: .box-success}
**כלל הזהב:** השתמשו בירושה רק כאשר המחלקה הנגזרת **היא סוג של** המחלקה הבסיסית.

### דוגמאות נכונות ל-IS-A:
- כלב **הוא סוג של** חיה ✓
- מכונית **היא סוג של** רכב ✓
- סטודנט **הוא סוג של** אדם ✓

### דוגמאות שגויות:
- מנוע **אינו סוג של** מכונית ✗ (הוא חלק ממכונית - זו **קומפוזיציה**)
- גלגל **אינו סוג של** אופניים ✗ (הוא רכיב באופניים)

---

## 3. מימוש בסיסי של ירושה ב-C#

### מחלקת הבסיס - Animal
```csharp
public class Animal
{
    private string name;
    private int age;
    
    // Constructor
    public Animal(string name, int age)
    {
        this.name = name;
        this.age = age;
        Console.WriteLine("Animal constructor called");
    }
    
    // Getters and Setters - Java Style
    public string GetName()
    {
        return name;
    }
    
    public void SetName(string name)
    {
        this.name = name;
    }
    
    public int GetAge()
    {
        return age;
    }
    
    public void SetAge(int age)
    {
        if (age >= 0)
            this.age = age;
    }
    
    // Methods
    public void Eat()
    {
        Console.WriteLine($"{name} is eating");
    }
    
    public void Sleep()
    {
        Console.WriteLine($"{name} is sleeping");
    }
}
```

### מחלקה נגזרת - Dog
```csharp
public class Dog : Animal  // הסימן : מציין ירושה
{
    private string breed;
    
    // Constructor
    public Dog(string name, int age, string breed) : base(name, age)
    {
        this.breed = breed;
        Console.WriteLine("Dog constructor called");
    }
    
    // Getter and Setter for breed
    public string GetBreed()
    {
        return breed;
    }
    
    public void SetBreed(string breed)
    {
        this.breed = breed;
    }
    
    // Dog-specific method
    public void Bark()
    {
        Console.WriteLine($"{GetName()} is barking: Woof!");
    }
}
```

### שימוש במחלקות
```csharp
class Program
{
    static void Main()
    {
        Dog myDog = new Dog("Max", 3, "Golden Retriever");
        
        // שימוש בפעולות שנורשו מ-Animal
        myDog.Eat();      // "Max is eating"
        myDog.Sleep();    // "Max is sleeping"
        
        // שימוש בפעולה ייחודית ל-Dog
        myDog.Bark();     // "Max is barking: Woof!"
        
        // שימוש ב-Getters
        Console.WriteLine($"Name: {myDog.GetName()}");
        Console.WriteLine($"Age: {myDog.GetAge()}");
        Console.WriteLine($"Breed: {myDog.GetBreed()}");
    }
}
```

---

## 4. היררכיית מחלקות - תרשים פשוט

<div class=mermaid>
graph BT
    D[GoldenRetriever] --> B[Dog]
    E[PersianCat] --> C[Cat]
    B --> A[Animal]
    C --> A
</div>

### דוגמת קוד להיררכיה מורחבת
```csharp
public class Cat : Animal
{
    private bool isIndoor;
    
    public Cat(string name, int age, bool isIndoor) : base(name, age)
    {
        this.isIndoor = isIndoor;
    }
    
    public bool GetIsIndoor()
    {
        return isIndoor;
    }
    
    public void SetIsIndoor(bool isIndoor)
    {
        this.isIndoor = isIndoor;
    }
    
    public void Meow()
    {
        Console.WriteLine($"{GetName()} says: Meow!");
    }
}

public class GoldenRetriever : Dog
{
    private double furLength;
    
    public GoldenRetriever(string name, int age, double furLength) 
        : base(name, age, "Golden Retriever")
    {
        this.furLength = furLength;
    }
    
    public double GetFurLength()
    {
        return furLength;
    }
    
    public void SetFurLength(double furLength)
    {
        this.furLength = furLength;
    }
    
    public void Fetch()
    {
        Console.WriteLine($"{GetName()} is fetching the ball!");
    }
}
```

---

## 5. דיאגרמת UML לירושה


<div class="mermaid" style="direction:ltr;">
classDiagram
    class Animal {
        -string name
        -int age
        +Animal(string name, int age)
        +GetName() string
        +SetName(string name) void
        +GetAge() int
        +SetAge(int age) void
        +Eat() void
        +Sleep() void
    }
    
    class Dog {
        -string breed
        +Dog(string name, int age, string breed)
        +GetBreed() string
        +SetBreed(string breed) void
        +Bark() void
    }
    
    class Cat {
        -bool isIndoor
        +Cat(string name, int age, bool isIndoor)
        +GetIsIndoor() bool
        +SetIsIndoor(bool isIndoor) void
        +Meow() void
    }
    
    class GoldenRetriever {
        +GoldenRetriever(string name, int age)
    }
    
    class PersianCat {
        +PersianCat(string name, int age)
    }
    
    Animal <|-- Dog
    Animal <|-- Cat
    Dog <|-- GoldenRetriever
    Cat <|-- PersianCat
</div>

{: .box-note}
**סימנים ב-UML:**
- **△** (משולש ריק) - מציין ירושה
- **◆** (מעוין מלא) - מציין קומפוזיציה/הכלה (Composition) - "has-a" חזק
- **-** מציין private
- **+** מציין public
- **#** מציין protected

---

## 6. שרשור בנאים (Constructor Chaining)

<div markdown=1 class="box-success" >

**חשוב לזכור:**
* כל בנאי בשרשרת מחויב להריץ קודם את הבנאי של מחלקת הבסיס שלו.
* הסדר תמיד **מלמעלה למטה** (Base → Derived), ורק לאחר סיום כל הבנאים יש לנו אובייקט מוכן לעבודה. בחירת הבנאים היא **מלמטה למעלה**
* פירוט נוסף [בתת פרק בנאים](/oop/01inheritdconstructors)

</div>

### סדר הפעלת בנאים

<div class="mermaid">
graph TD
    A[יצירת אובייקט GoldenRetriever] --> B[קריאה לבנאי GoldenRetriever]
    B --> C[קריאה ל-base - בנאי Dog]
    C --> D[קריאה ל-base - בנאי Animal]
    D --> E[ביצוע בנאי Animal]
    E --> F[חזרה וביצוע בנאי Dog]
    F --> G[חזרה וביצוע בנאי GoldenRetriever]
    G --> H[האובייקט נוצר במלואו]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style H fill:#9f9,stroke:#333,stroke-width:2px
</div>

{: .box-note}
**כלל חשוב:** הבנאים נקראים מהאב לבן, אך מבוצעים מהבן לאב!

### דוגמת קוד מפורטת
```csharp
public class Vehicle
{
    private string manufacturer;
    private int year;
    
    public Vehicle(string manufacturer, int year)
    {
        this.manufacturer = manufacturer;
        this.year = year;
        Console.WriteLine($"1. Vehicle constructor: {manufacturer}, {year}");
    }
    
    public string GetManufacturer() { return manufacturer; }
    public void SetManufacturer(string manufacturer) 
    { 
        this.manufacturer = manufacturer; 
    }
    
    public int GetYear() { return year; }
    public void SetYear(int year) 
    { 
        if (year > 1900 && year <= DateTime.Now.Year)
            this.year = year; 
    }
}

public class Car : Vehicle
{
    private int numberOfDoors;
    private string model;
    
    // בנאי עם קריאה לבנאי האב
    public Car(string manufacturer, string model, int year, int doors) 
        : base(manufacturer, year)
    {
        this.model = model;
        this.numberOfDoors = doors;
        Console.WriteLine($"2. Car constructor: {model}, {doors} doors");
    }
    
    // בנאי נוסף עם קריאה לבנאי אחר באותה מחלקה
    public Car(string manufacturer, string model) 
        : this(manufacturer, model, DateTime.Now.Year, 4)
    {
        Console.WriteLine("3. Car convenience constructor");
    }
    
    public string GetModel() { return model; }
    public void SetModel(string model) { this.model = model; }
    
    public int GetNumberOfDoors() { return numberOfDoors; }
    public void SetNumberOfDoors(int doors) 
    { 
        if (doors > 0 && doors <= 6)
            this.numberOfDoors = doors; 
    }
}

public class SportsCar : Car
{
    private int topSpeed;
    
    public SportsCar(string manufacturer, string model, int year, int topSpeed)
        : base(manufacturer, model, year, 2)  // מכונית ספורט - תמיד 2 דלתות
    {
        this.topSpeed = topSpeed;
        Console.WriteLine($"3. SportsCar constructor: Top speed {topSpeed} km/h");
    }
    
    public int GetTopSpeed() { return topSpeed; }
    public void SetTopSpeed(int speed) 
    { 
        if (speed > 0 && speed < 400)
            this.topSpeed = speed; 
    }
}
```

### הרצת הקוד והפלט
```csharp
class Program
{
    static void Main()
    {
        Console.WriteLine("Creating a SportsCar:");
        SportsCar ferrari = new SportsCar("Ferrari", "F40", 1987, 324);
        
        /* פלט:
        Creating a SportsCar:
        1. Vehicle constructor: Ferrari, 1987
        2. Car constructor: F40, 2 doors
        3. SportsCar constructor: Top speed 324 km/h
        */
    }
}
```

---

## 7. הרחבה מעשית - מערכת ניהול עובדים

```csharp
public class Person
{
    private string id;
    private string firstName;
    private string lastName;
    private DateTime birthDate;
    
    public Person(string id, string firstName, string lastName, DateTime birthDate)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }
    
    // Getters and Setters
    public string GetId() { return id; }
    public string GetFirstName() { return firstName; }
    public void SetFirstName(string firstName) { this.firstName = firstName; }
    public string GetLastName() { return lastName; }
    public void SetLastName(string lastName) { this.lastName = lastName; }
    public DateTime GetBirthDate() { return birthDate; }
    
    public int GetAge()
    {
        return DateTime.Now.Year - birthDate.Year;
    }
    
    public string GetFullName()
    {
        return $"{firstName} {lastName}";
    }
}

public class Employee : Person
{
    private string employeeId;
    private decimal salary;
    private DateTime hireDate;
    
    public Employee(string id, string firstName, string lastName, 
                   DateTime birthDate, string employeeId, decimal salary)
        : base(id, firstName, lastName, birthDate)
    {
        this.employeeId = employeeId;
        this.salary = salary;
        this.hireDate = DateTime.Now;
    }
    
    public string GetEmployeeId() { return employeeId; }
    public decimal GetSalary() { return salary; }
    public void SetSalary(decimal salary) 
    { 
        if (salary > 0)
            this.salary = salary; 
    }
    
    public int GetYearsOfService()
    {
        return DateTime.Now.Year - hireDate.Year;
    }
    
    public void GiveRaise(decimal percentage)
    {
        if (percentage > 0 && percentage <= 50)
        {
            salary *= (1 + percentage / 100);
            Console.WriteLine($"{GetFullName()} received a {percentage}% raise!");
        }
    }
}

public class Manager : Employee
{
    private List<Employee> teamMembers;
    private string department;
    
    public Manager(string id, string firstName, string lastName,
                  DateTime birthDate, string employeeId, 
                  decimal salary, string department)
        : base(id, firstName, lastName, birthDate, employeeId, salary)
    {
        this.department = department;
        this.teamMembers = new List<Employee>();
    }
    
    public string GetDepartment() { return department; }
    public void SetDepartment(string department) { this.department = department; }
    
    public void AddTeamMember(Employee employee)
    {
        if (employee != null && !teamMembers.Contains(employee))
        {
            teamMembers.Add(employee);
            Console.WriteLine($"{employee.GetFullName()} added to {GetFullName()}'s team");
        }
    }
    
    public void RemoveTeamMember(Employee employee)
    {
        if (teamMembers.Remove(employee))
        {
            Console.WriteLine($"{employee.GetFullName()} removed from team");
        }
    }
    
    public int GetTeamSize()
    {
        return teamMembers.Count;
    }
    
    public void PrintTeamInfo()
    {
        Console.WriteLine($"\nManager: {GetFullName()}");
        Console.WriteLine($"Department: {department}");
        Console.WriteLine($"Team Size: {GetTeamSize()}");
        Console.WriteLine("Team Members:");
        foreach (var member in teamMembers)
        {
            Console.WriteLine($"  - {member.GetFullName()} (ID: {member.GetEmployeeId()})");
        }
    }
}
```

---

## 8. תרגול מעשי

### תרגיל 1: היררכיית כלי תחבורה
יצרו היררכיית מחלקות עבור:
- `Vehicle` (מחלקת בסיס)
- `LandVehicle`, `WaterVehicle`, `AirVehicle` (יורשות מ-Vehicle)
- `Car`, `Bicycle` (יורשות מ-LandVehicle)
- `Boat`, `Submarine` (יורשות מ-WaterVehicle)
- `Airplane`, `Helicopter` (יורשות מ-AirVehicle)

### תרגיל 2: מערכת בנקאית
מימשו:
- `Account` (מחלקת בסיס עם מספר חשבון ויתרה)
- `SavingsAccount` (עם ריבית)
- `CheckingAccount` (עם אפשרות למשיכת יתר)

{: .box-note}
**טיפ:** זכרו להשתמש ב-Getters ו-Setters בסגנון Java לכל השדות הפרטיים!

---

## 9. סיכום ונקודות מפתח

{: .box-success}
**נקודות חשובות לזכור:**
1. ירושה מאפשרת שימוש חוזר בקוד ויצירת היררכיות לוגיות
2. השתמשו בירושה רק כאשר מתקיים יחס IS-A
3. בנאים נקראים מהבסיס לנגזר (Base → Derived)
4. השתמשו ב-`base` לקריאה לבנאי או לפעולות של מחלקת האב
5. כל מחלקה ב-C# יכולה לרשת רק ממחלקה אחת (Single Inheritance)

### מה הלאה?
בשיעור הבא נלמד על:
- **פולימורפיזם** - איך אובייקטים שונים יכולים להתנהג בצורות שונות
- **Virtual ו-Override** - דריסת פעולות
- **Abstract Classes** - מחלקות מופשטות
- **Interfaces** - ממשקים

---

## 10. שאלות לתרגול עצמי

1. מהו ההבדל בין ירושה לקומפוזיציה (הכלה)?
2. מתי נשתמש בירושה ומתי לא?
3. מה סדר הפעלת הבנאים בהיררכיית ירושה?
4. האם מחלקה נגזרת יכולה לגשת ל-private fields של מחלקת האב?
5. מה ההבדל בין `base()` ל-`this()` בבנאים?

{: .box-note}
**להצלחה!** תרגול הוא המפתח להבנת ירושה. נסו ליצור היררכיות משלכם ולהתנסות בקוד!