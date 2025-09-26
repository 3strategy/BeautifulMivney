---
layout: page
title: "ירושה - שימוש בבנאים (Constructors)"
subtitle: "היכרות עם העמסת בנאים, וסדר הקריאה בירושה"
tags: [ירושה, OOP,בנאים, העמסת בנאים, שרשור בנאים, CSharp]
mathjax: true
lang: he
---

{: .box-note}
**הגדרה:** כאשר עצם במחלקה (class) נוצר, הזמן ריצה (runtime) קורא לבנאי שלה. בנאים הם פעולות מיוחדות שיש להן את אותו שם כמו למחלקה, והן בדרך כלל מאתחלות את שדות הנתונים של האובייקט החדש.

---

## 1. בנאי בסיסי

בדוגמה הבאה, מחלקה בשם `Taxi` מוגדרת באמצעות בנאי פשוט. המחלקה נוצרת לאחר מכן באמצעות האופרטור `new`. הזמן ריצה מפעיל את הבנאי של `Taxi` מיד לאחר הקצאת זיכרון לאובייקט החדש.

```csharp
public class Taxi
{
    private string taxiTag;
    
    // בנאי עם פרמטר
    public Taxi(string tag) => taxiTag = tag;
    
    public override string ToString() => $"Taxi: {taxiTag}";
}

class TestTaxi
{
    static void Main()
    {
        Taxi t = new Taxi("Tag1345");
        Console.WriteLine(t);  // פלט: Taxi: Tag1345
    }
}
```

<div class="mermaid">
graph LR
    A[קריאה ל-new Taxi] --> B[הקצאת זיכרון]
    B --> C[הפעלת הבנאי]
    C --> D[אתחול שדות]
    D --> E[החזרת האובייקט]
</div>

---

## 2. בנאי ללא פרמטרים (Parameterless Constructor)

{: .box-success}
**חשוב:** בנאי שלא מקבל פרמטרים נקרא "בנאי ללא פרמטרים". הזמן ריצה מפעיל אותו כאשר אובייקט נוצר באמצעות `new` ללא ארגומנטים.

### בנאי ברירת מחדל
אם לא מגדירים בנאי במחלקה, המהדר של C# יוצר אוטומטית בנאי ציבורי ללא פרמטרים:

```csharp
public class Car
{
    private string model;
    private int year;
    
    // המהדר יוצר אוטומטית:
    // public Car() { }
    
    // Getters and Setters - Java Style
    public string GetModel() { return model; }
    public void SetModel(string model) { this.model = model; }
    
    public int GetYear() { return year; }
    public void SetYear(int year) { this.year = year; }
}

// שימוש
Car myCar = new Car();  // עובד בגלל הבנאי האוטומטי
myCar.SetModel("Toyota");
myCar.SetYear(2024);
```

---



## 3. ריבוי בנאים (Constructor Overloading)

מחלקות יכולות להגדיר מספר בנאים עם חתימות שונות:

```csharp
public class Employee
{
    private int salary;
    private string name;
    
    // בנאי ללא פרמטרים
    public Employee() 
    { 
        salary = 0;
        name = "Unknown";
    }
    
    // בנאי עם פרמטר אחד
    public Employee(int annualSalary) 
    {
        salary = annualSalary;
        name = "Unknown";
    }
    
    // בנאי עם שני פרמטרים
    public Employee(string name, int annualSalary)
    {
        this.name = name;
        this.salary = annualSalary;
    }
    
    // בנאי שמחשב משכורת שנתית
    public Employee(string name, int weeklySalary, int numberOfWeeks)
    {
        this.name = name;
        this.salary = weeklySalary * numberOfWeeks;
    }
    
    // Getters and Setters - Java Style
    public int GetSalary() { return salary; }
    public void SetSalary(int salary) { this.salary = salary; }
    
    public string GetName() { return name; }
    public void SetName(string name) { this.name = name; }
}
```

### שימוש בבנאים השונים:
```csharp
Employee e1 = new Employee();                      // ברירת מחדל
Employee e2 = new Employee(30000);                 // משכורת בלבד
Employee e3 = new Employee("John", 50000);         // שם ומשכורת
Employee e4 = new Employee("Jane", 1000, 52);      // חישוב שנתי
```

```mermaid
graph TD
    A[Employee Class] --> B[בנאי ללא פרמטרים]
    A --> C[בנאי עם משכורת]
    A --> D[בנאי עם שם ומשכורת]
    A --> E[בנאי עם חישוב שבועי]
    
    B --> F[Salary=0, Name='Unknown']
    C --> G[Salary=value, Name='Unknown']
    D --> H[Salary=value, Name=value]
    E --> I[Salary=weekly*weeks, Name=value]
```

---

## 4. שרשור בנאים עם base

בנאי יכול להשתמש במילת המפתח `base` כדי לקרוא לבנאי של מחלקת הבסיס:

```csharp
public class Manager : Employee
{
    private string department;
    
    public Manager(string name, int annualSalary, string department)
        : base(name, annualSalary)  // קריאה לבנאי של Employee
    {
        this.department = department;
        // הוראות נוספות כאן
    }
    
    // Getter and Setter for department
    public string GetDepartment() { return department; }
    public void SetDepartment(string department) { this.department = department; }
}
```

{: .box-success}
**כלל חשוב:** הבנאי של מחלקת הבסיס נקרא **לפני** שהבלוק של הבנאי הנגזר מתבצע!

### קריאה משתמעת לבנאי הבסיס
אם לא מציינים קריאה מפורשת עם `base`, הבנאי ללא פרמטרים של מחלקת הבסיס נקרא אוטומטית:

```csharp
// שתי ההגדרות הבאות זהות:
public Manager(int initialData)
{
    // קריאה אוטומטית ל-base()
}

public Manager(int initialData)
    : base()  // קריאה מפורשת
{
}
```


---

## 5. העדר בנאי ברירת מחדל 

{: .box-note}
**אזהרה:** אם למחלקת הבסיס אין בנאי ללא פרמטרים, חובה לקרוא לבנאי עם `base` באופן מפורש!


מרגע שהוגדר בנאי כלשהו במחלקה, בנאי ברירת המחדל מתבטל. ברגע שבמחלקת בסיס הוגדר בנאי, חייב להתקיים אחד משני מצבים לפחות:
1. במחלקת הבסיס הוגדר בנאי ללא פרמטרים
2. במחלקה הנגזרת יש קריאה מפורשת `: base (חתימה קיימת של פרמטרים)`

**להמחשה:** להלן דוגמא מינימלית **שלא תתקמפל**:
```csharp
public class A 
{
    protected int i;
    public A(int i)  // מבטל את בנאי ברירת המחדל
    {
        this.i = i;
    }
}

public class B : A
{
    public B()  // יוצג באדום: לא נמצא בנאי ברירת מחדל, ואין פניה לבנאי שכן קיים
    {
        Console.WriteLine("will not compile");
    }
    public B(int i) // יוצג באדום: לא נמצא בנאי ברירת מחדל, ואין פניה לבנאי שכן קיים
    {
        Console.WriteLine("will not compile");
    }
}
```


## 6. שרשור בנאים עם this

בנאי יכול לקרוא לבנאי אחר באותה מחלקה באמצעות `this`:

```csharp
public class Rectangle
{
    private int width;
    private int height;
    
    // בנאי ראשי
    public Rectangle(int width, int height)
    {
        this.width = width;
        this.height = height;
        Console.WriteLine($"Rectangle created: {width}x{height}");
    }
    
    // בנאי לריבוע - קורא לבנאי הראשי
    public Rectangle(int size)
        : this(size, size)
    {
        Console.WriteLine("Square created");
    }
    
    // בנאי ברירת מחדל
    public Rectangle()
        : this(1, 1)
    {
        Console.WriteLine("Default rectangle created");
    }
    
    // Getters and Setters - Java Style
    public int GetWidth() { return width; }
    public void SetWidth(int width) { this.width = width; }
    
    public int GetHeight() { return height; }
    public void SetHeight(int height) { this.height = height; }
}
```

### דוגמה לשימוש:
```csharp
Rectangle r1 = new Rectangle(5, 10);  // Rectangle created: 5x10
Rectangle r2 = new Rectangle(7);      // Rectangle created: 7x7, Square created
Rectangle r3 = new Rectangle();       // Rectangle created: 1x1, Default rectangle created
```

<div class="mermaid">
graph TD
    A[new Rectangle#40;#41;] --> B[קריאה ל-this#40;1,1#41;]
    B --> C[Rectangle#40;1,1#41; Constructor]
    C --> D[אתחול Width=1, Height=1]
    D --> E[הדפסת Default rectangle created]
    
    F[new Rectangle#40;7#41;] --> G[קריאה ל-this#40;7,7#41;]
    G --> H[Rectangle#40;7,7#41; Constructor]
    H --> I[אתחול Width=7, Height=7]
    I --> J[הדפסת Square created]
</div>

---

## 8. מתאמי גישה לבנאים

בנאים יכולים להיות מוגדרים עם מתאמי גישה שונים:

```csharp
public class DatabaseConnection
{
    // בנאי ציבורי - נגיש מכל מקום
    public DatabaseConnection(string connectionString)
    {
        // אתחול חיבור
    }
    
    // בנאי מוגן - נגיש רק למחלקות יורשות
    protected DatabaseConnection()
    {
        // בנאי למחלקות נגזרות
    }
    
    // בנאי פנימי - נגיש רק באותו Assembly
    internal DatabaseConnection(int timeout)
    {
        // בנאי לשימוש פנימי
    }
    
    // בנאי פרטי - לשימוש פנימי במחלקה בלבד
    private DatabaseConnection(bool isTest)
    {
        // בנאי לבדיקות
    }
}
```

{: .box-note}
**מתאמי גישה נפוצים:**
- `public` - נגיש מכל מקום
- `private` - נגיש רק בתוך המחלקה
- `protected` - נגיש למחלקה ולמחלקות יורשות
- `internal` - נגיש באותו Assembly

---


<details markdown="1"><summary>7. דוגמה מקיפה - מערכת בנקאית</summary>


```csharp
public abstract class Account
{
    private static int nextAccountNumber = 1000;

    private int accountNumber;
    private string owner;
    protected double balance;  // protected כדי שמחלקות נגזרות יוכלו לגשת
    private DateTime createdDate;

    // בנאי סטטי - אתחול מונה חשבונות
    static Account()
    {
        Console.WriteLine("Banking system initialized");
        // ניתן לטעון את המספר האחרון מבסיס נתונים
    }

    // בנאי מוגן למחלקות נגזרות
    protected Account(string owner, double initialBalance)
    {
        if (string.IsNullOrEmpty(owner))
            throw new ArgumentException("Owner name is required");

        if (initialBalance < 0)
            throw new ArgumentException("Initial balance cannot be negative");

        accountNumber = nextAccountNumber++;
        this.owner = owner;
        this.balance = initialBalance;
        this.createdDate = DateTime.Now;

        Console.WriteLine($"Account #{accountNumber} created for {owner}");
    }

    // Getters
    public int GetAccountNumber() => accountNumber;
    public string GetOwner() { return owner; }
    public double GetBalance() { return balance; }
    public DateTime GetCreatedDate() { return createdDate; }

    // Protected setter for balance - למחלקות נגזרות
    protected void SetBalance(double balance) { this.balance = balance; }
}

public class SavingsAccount : Account
{
    private double interestRate;

    // שרשור לבנאי הבסיס
    public SavingsAccount(string owner, double initialBalance, double interestRate)
        : base(owner, initialBalance)
    {
        if (interestRate < 0 || interestRate > 0.1)
            throw new ArgumentException("Invalid interest rate");

        this.interestRate = interestRate;
        Console.WriteLine($"Savings account with {interestRate:P} interest");
    }

    // בנאי נוחות עם ריבית ברירת מחדל
    public SavingsAccount(string owner, double initialBalance)
        : this(owner, initialBalance, 0.02)  // 2% ברירת מחדל
    {
    }

    // Getters and Setters
    public double GetInterestRate() { return interestRate; }
    public void SetInterestRate(double rate)
    {
        if (rate >= 0 && rate <= 0.1)
            this.interestRate = rate;
    }
}

public class CheckingAccount : Account
{
    private double overdraftLimit;

    public CheckingAccount(string owner, double initialBalance, double overdraftLimit)
        : base(owner, initialBalance)
    {
        if (overdraftLimit < 0)
            throw new ArgumentException("Overdraft limit cannot be negative");

        this.overdraftLimit = overdraftLimit;
        Console.WriteLine($"Checking account with ${overdraftLimit} overdraft");
    }

    // בנאי ללא אוברדרפט
    public CheckingAccount(string owner, double initialBalance)
        : this(owner, initialBalance, 0)
    {
    }

    // Getters and Setters
    public double GetOverdraftLimit() { return overdraftLimit; }
    public void SetOverdraftLimit(double limit)
    {
        if (limit >= 0)
            this.overdraftLimit = limit;
    }
}

// שימוש
public class BankingApp
{
    public static void Main()
    {
        var savings = new SavingsAccount("Alice", 1000);
        var checking = new CheckingAccount("Bob", 500, 200);
        var vipSavings = new SavingsAccount("Charlie", 10000, 0.05);

        // שימוש ב-Getters
        Console.WriteLine($"Alice's balance: ${savings.GetBalance()}");
        Console.WriteLine($"Bob's overdraft: ${checking.GetOverdraftLimit()}");
        Console.WriteLine($"Charlie's interest rate: {vipSavings.GetInterestRate():P}");

        /* פלט:
        Banking system initialized
        Account #1000 created for Alice
        Savings account with 2.00% interest
        Account #1001 created for Bob
        Checking account with $200 overdraft
        Account #1002 created for Charlie
        Savings account with 5.00% interest
        Alice's balance: $1000
        Bob's overdraft: $200
        Charlie's interest rate: 5.00%
        */
    }
}
```

---

## סיכום

{: .box-success}
**נקודות מפתח לזכור:**
1. בנאים נקראים אוטומטית בעת יצירת אובייקט עם `new`
2. אם לא מגדירים בנאי, המהדר יוצר בנאי ללא פרמטרים
3. ניתן להגדיר מספר בנאים עם חתימות שונות (Overloading)
4. השתמשו ב-`base` לקריאה לבנאי מחלקת הבסיס
5. השתמשו ב-`this` לקריאה לבנאי אחר באותה מחלקה


{: .box-note}
**טיפ:** תמיד אתחלו את כל השדות בבנאי כדי למנוע מצבים לא מוגדרים!