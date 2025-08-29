---
layout: page 
title: "פרק 0 – חזרה על מחלקות ב‑#C"
subtitle: "סקירה קצרה של מחלקות, שדות, פעולות ותכונות"
tags: [מחלקה, שדות, C#,ctor,prop,propfull, ירושה, קונסטרוקטור]
mathjax: true
lang: he
---

{: .box-note}
הפרק הזה מציג חזרה קצרה על מושגי יסוד במחלקות בשפת #C לקראת המשך הקורס. הבנה של מושגים אלו תעזור לתלמידים לעבוד עם מבני נתונים מורכבים בהמשך.


<!-- Source: https://careerhub.ufl.edu/classes/c-hands-on-practice-with-data-structures/ -->

## סקירה כללית

תזכורת חשובה: מחלקה היא תבנית ליצירת אובייקטים. היא מתארת את השדות (data) והפעולות (methods) שהאובייקטים יודעים לבצע. ב‑#C מחלקות הן יישות מונחית‑עצמים מלאה, המאפשרת להגדיר קונסטרוקטורים, תכונות (Properties), מימושי ממשקים וירושה.

<details markdown="1">
<summary>קריאה והגדרה של מחלקות</summary>

```csharp
public class Student
{
    private string _firstName; // 1. שדה לשם פרטי
    private string _lastName; // 1. שדה לשם משפחה
    private double grade; // 1. שדה לציון (בדרך כלל נקרא לזה תכונה)

    public Student() { }

    // 2. קונסטרקטור מלא
    public Student(string firstName, string lastName, double grade)
    {
        _firstName = firstName;
        _lastName = lastName;
        this.grade = grade; // 2. כדי להבדיל בין הפרמטר לשדה this- שימוש ב
    }

    // ======================   מה שאנחנו נכתוב    ===========================
    // 3a. Java-style getter - לשים לב: ג'אווה סטייל הוא התחביר היחיד שמותר בבחינות!
    // !!!וזה משנה מפני שאלו פעולות והקריאה היא עם סוגריים בסוף!!!
    public double GetGrade()
    {
        return grade;
    }

    // 3b. Java-style getter - לשים לב: זהו התחביר היחיד שמותר בבחינות!
    public string GetFirstName() => _firstName;

    // 3c. Java-style setter - לשים לב: זהו התחביר היחיד שמותר בבחינות!
    public void SetFirstName(string firstName) => _firstName = firstName;

    // 3d. Java-style setter - לשים לב: זהו התחביר היחיד שמותר בבחינות!
    public void SetGrade(double grade)
    {
        this.grade = grade;
    }

    // 4. Get-סתם פעולה ולכן השם לא מתחיל ב
    public bool IsPassed() => grade >= 60.0;

    // ====================== כל מה שלא נכתוב ===========================
    // 5. Native C# Properties - אבל ככה כותבים את זה
    
    private int classNum;

    // 5a. Property מלא בסגנון C#
    public int ClassNum
    {
        get { return classNum; }
        set { classNum = value; }
    }

    // 5b. Property לשם פרטי :מקוצר field תחביר מקוצר לפרופרטי. לא צריך שדה
    public string FirstName { get; set; }

    // 5c. Property מקוצר עבור שם משפחה prop 
    public string LastName { get; set; }

    // 5d. Property תחביר גטר סטר סי-שארפ מלא עם תחביר פונקציה מקוצר (=>) עבור הציון
    public double Grade
    {
        get => grade;
        set => grade = value;
    }
}
```

בקוד זה מוגדרת מחלקה `Student` עם שדות, קונסטרוקטורים, מאפיינים ומתודה. ההגדרות הללו מתארות כיצד ניצור אובייקט מסוג Student ונעבוד איתו.
</details>

### טבלה – מבנה מחלקה טיפוסי


| תפקיד | English term |
| --- | --- |
|  שדה – משתנה פרטי של המחלקה שמחזיק מידע אודות האובייקט |field |
|  מאפיין – עטיפה לשדה המאפשרת גישה מבוקרת ומנגנוני get/set |property |
|  קונסטרוקטור – מתודה מיוחדת שמאותחלת בעת יצירת האובייקט |constructor |
|  מתודה – פעולה שהאובייקט יודע לבצע |method |
|  ירושה – מחלקה יכולה לרשת מחלקה אחרת ולקבל את שדותיה ומתודותיה |inheritance |
{: .table-rl}

### דגשים חשובים

{: .subq}
א. רצוי להגדיר שדות כ‑`private` ולהשתמש במאפיינים לגישה בטוחה.  
{: .subq}
ב. שם מחלקה ב‑#C מתחיל באות גדולה ונכתב בפסקל‑קייס.  
{: .subq}
ג. ניתן להגדיר כמה קונסטרוקטורים עם חתימות שונות (overloading).
{: .subq}
ד. ירושה מתבצעת באמצעות הסימן `:` ושימוש במילה `base` בקונסטרוקטור של המחלקה היורשת.  

## תרגול
להטמעת החומר מומלץ ליצור מחלקה פשוטה משלכם שמייצגת אובייקט בעולם אמיתי ולכתוב קונסטרוקטור, מאפיינים ומתודות. למשל: מחלקת `Book` עם שדות שם הספר, מחבר ומחיר.

<details markdown="1">
<summary>מקום לפתרון</summary>

כאן תוכלו להוסיף קוד שלכם ותרגל את הנושא.
</details>



[עבודה בקמפוס](ChapterCampus.md)