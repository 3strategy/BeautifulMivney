---
layout: page
title: "ex0a1 חזרה על מחלקות"
subtitle: "חזרה על מחלקות"
tags: []
lang: he
---



## 0a1.1 בתרגיל זה, עליכם לממש מחלקה בשם `Car`

מחלקה זו מייצגת רכב וצריכה להיות מוגדרת בקובץ שניתן יהיה להשתמש בו על ידי מחלקות אחרות כמו `Employee`.

למחלקה צריכים להיות השדות הפרטיים הבאים:

1. string carNumber
2. bool isLocked
3. int temperature
4. double radioStation
5. int fuelLevel
6. Employee user (הניחו שמחלקת Employee קיימת וכוללת לפחות בנאי המקבל string name ו-int id, ומתודת GetId()).

עליה לכלול את החברים הציבוריים הבאים:

### בנאים:

`public Car(string carNumber, bool isLocked, int temperature, double radioStation, int fuelLevel)`:

1. בנאי המאתחל את כל התכונות עם הערכים הנתונים.
2. מגדיר את user ל-null.

`public Car(string carNumber)`:

1. בנאי המקבל רק את מספר הרכב.
2. עליו לאתחל את הרכב עם ערכי ברירת מחדל:
3. isLocked = true
4. temperature = 22
5. radioStation = 100.0
6. fuelLevel = 50
7. user = null

`public Car(Car other)`:

1. בנאי העתקה היוצר אובייקט Car חדש על ידי העתקת הערכים של carNumber, isLocked, temperature, radioStation, ו-fuelLevel מאובייקט Car אחר.
2. השדה user צריך להיות מאותחל ל-null.

### פעולות (מתודות):

1. `public void Lock(Employee user)`:

    אם ה-user של הרכב הוא null כרגע, פעולה זו צריכה להקצות את ה-user שסופק לרכב ולהגדיר את isLocked ל-true.

1. `public void Unlock(Employee user)`:

    אם ה-user שסופק זהה ל-user הנוכחי של הרכב (כלומר, user.GetId() == this.user.GetId()), פעולה זו צריכה להגדיר את ה-user של הרכב ל-null ולהגדיר את isLocked ל-false.

1. `public bool IsLocked()`:

    מחזירה את הערך של השדה isLocked.

1. `public void SetTemperature(int temp)`:

    מגדירה את טמפרטורת הרכב, אך ורק אם הערך temp שסופק הוא בין 16 ל-30 (כולל).

1. `public void SetRadioStation(double station)`:

    מגדירה את תחנת הרדיו של הרכב, אך ורק אם הערך station שסופק הוא בין 88.0 ל-108.0 (כולל).

`public void AddFuel(int fuel)`:

1. מוסיפה את כמות ה-fuel הנתונה ל-fuelLevel.
2. סך ה-fuelLevel לא יעלה על 100. אם הוספת הדלק תגרום לרמה לעלות על 100, הגדירו את fuelLevel ל-100.

`public string GetCarNumber()`:

1. מחזירה את מספר הרכב.

`public int GetTemperature()`:

1. מחזירה את טמפרטורת הרכב.

`public double GetRadioStation()`:

1. מחזירה את תחנת הרדיו של הרכב.

`public int GetFuelLevel()`:

1. מחזירה את מפלס הדלק של הרכב.

`public Employee GetUser()`:

1. מחזירה את ה-Employee הנוכחי המשתמש ברכב.

`public override string ToString()`:

1. דורסת את פעולת ToString ברירת המחדל כדי להחזיר מחרוזת מעוצבת עם פרטי הרכב, כמו:
2. "Car {carNumber} [{(isLocked ? "Locked" : "Unlocked")}, Temp: {temperature}, Radio: {radioStation}, Fuel: {fuelLevel}%]"

הערה: עליכם ליצור גם מחלקת `Employee` בסיסית בקובץ `Employee.cs` שתכלול לפחות בנאי המקבל `string name` ו-`int id`, ומתודת `GetId()` כדי לאפשר את בדיקת הפונקציונליות הקשורה ל-`Employee` במחלקת `Car`.

את המחלקה `Employee` עליכם להעתיק לתוך הפתרון

```csharp
public class Employee
{
    private string name;
    private int id;

    public Employee(string name, int id)
    {
        this.name = name;
        this.id = id;
    }

    public string GetName() => name;
    public int GetId() => id;
}
```

## 0a1.2 תרגיל – מימוש מחלקת Employee

בתרגיל זה עליכם לממש מחלקה בשם `Employee` בשפת C#, אשר מייצגת עובד המשתמש ברכב חברה משותף. המחלקה תאפשר לעובד לבצע פעולות שונות על הרכב שהוקצה לו.

יש להניח שקיימת מחלקה בשם Car, הכוללת את הפעולות הבאות:

1. getUser()
2. lock(this)
3. unlock(this)
4. isLocked()
5. setTemperature(temp)
6. setRadioStation(station)
7. addFuel(fuel)
8. getCarNumber()
9. ToString()

🧱 שדות (Fields)

יש להגדיר את השדות הבאים במחלקה:

1. מזהה סטטי nextEmployeeId – מספר שלם סטטי שמתחיל ב־1000, וישמש להקצאת מזהים ייחודיים לעובדים.
2. שם העובד – מחרוזת המייצגת את שם העובד.
3. מזהה עובד – מספר שלם ייחודי לכל עובד.
4. רכב משותף – אובייקט מסוג Car שמייצג את הרכב שהוקצה לעובד.

🏗️ בנאי (Constructor)

יש לממש בנאי אחד שמקבל את שם העובד ואת הרכב שהוקצה לו. הבנאי יבצע את הפעולות הבאות:

1. יאחסן את שם העובד.
2. יאחסן את הרכב שהוקצה.
3. יקצה לעובד מזהה ייחודי על ידי שימוש בערך הנוכחי של nextEmployeeId.
4. יגדיל את nextEmployeeId ב־1 עבור העובד הבא.

⚙️ פעולות (Methods)

יש לממש את הפעולות הבאות:

1. נעילת רכב:
2. הפעולה מנסה לנעול את הרכב שהוקצה לעובד.
3. אם הרכב כבר בשימוש על ידי עובד אחר (כלומר getUser() מחזיר ערך שאינו null), יש להדפיס: Car is already locked by other ולהחזיר false.
4. אחרת, יש לקרוא לפעולה lock(this), להדפיס: Car locked ולהחזיר true.
5. שחרור רכב:
6. הפעולה מנסה לשחרר את נעילת הרכב.
7. אם העובד הנוכחי אינו המשתמש ברכב (כלומר getUser() שונה מ־this), יש להדפיס: Car is not locked ולהחזיר false.
8. אחרת, יש לקרוא לפעולה unlock(this), להדפיס: Car unlocked ולהחזיר true.
9. שינוי טמפרטורה:
10. אם העובד הנוכחי אינו המשתמש ברכב, אין לבצע פעולה.
11. אם הרכב נעול (isLocked() מחזיר true), יש להדפיס: Car is locked!
12. אחרת, יש לקרוא לפעולה setTemperature(temp) ולהדפיס: Temperature set to כאשר
13. שינוי תחנת רדיו:
14. אם העובד הנוכחי אינו המשתמש ברכב, אין לבצע פעולה.
15. אם הרכב אינו נעול, יש לקרוא לפעולה setRadioStation(station) ולהדפיס: Radio station set to כאשר
16. הוספת דלק:
17. אם העובד הנוכחי הוא המשתמש ברכב, יש לקרוא לפעולה addFuel(fuel) ולהדפיס: car fuel: כאשר
18. בדיקת מצב הרכב:
19. יש להדפיס את שם העובד ואת מצב הרכב.
20. הפורמט יהיה: Employee ולאחר מכן הפלט של הפעולה ToString() של הרכב.

📥 פעולות גישה (Getters)

יש לממש את הפעולות הבאות:

1. פעולה שמחזירה את שם העובד.
2. פעולה שמחזירה את מזהה העובד.
3. פעולה שמחזירה את הרכב שהוקצה לעובד.

🖨️ תצוגת מצב (ToString)

יש לדרוס את הפעולה ToString כך שתחזיר מחרוזת בפורמט הבא:



Employee 
לדוגמה:



Employee 1001: Alice (Car: 123-45-678)
📌 הנחיות נוספות:

1. אין לממש את מחלקת Car – הניחו שהיא קיימת עם כל הפעולות הנדרשות.
2. יש להשתמש בשמות משתנים ומתודות באנגלית בלבד.
3. יש להקפיד על הדפסת הודעות בדיוק כפי שמופיע במפרט.
4. אין צורך לטפל במקרים שבהם sharedCar הוא null.
5.


## 0a1.3 ניהול חברה עם עובדים ורכבים
בתרגיל זה, עליכם לממש מחלקת **C#** בשם `Company`. המחלקה תלויה במחלקות `Car` ו-`Employee` (שיתקבלו מוכנות).

---

### שדות המחלקה

1. `private string name;`
2. `private Employee[] employees;`
3. `private int numEmployees;`
4. `private Car[] cars;`
5. `private static Random random = new Random();`

---

### בנאי

```csharp
public Company(string name, Car[] cars)
```

* מאתחל את החברה עם שם ומערך של רכבים זמינים.
* מאתחל את מערך העובדים (`employees`) עם קיבולת של 100.
* מגדיר את `numEmployees` ל-0.

---

### פעולות (מתודות)

#### `public void AddEmployee(string name)`

1. מוסיפה עובד חדש לחברה.
2. אם החברה לא מלאה (פחות מ-100 עובדים), נוצרת ישות `Employee` חדשה.
3. אם יש רכבים זמינים, אחד מהם מוקצה לעובד החדש (באופן אקראי).
4. העובד מתווסף למערך `employees`.
5. `numEmployees` גדל ב-1.
6. הודעת הצלחה מודפסת: `Employee added successfully: {employee_name}`.
7. אם החברה מלאה: הודעה מודפסת – `Cannot add employee - company is full.`.

---

#### `public void RemoveEmployee(int employeeId)`

1. מחפשת עובד לפי מזהה (`employeeId`).
2. אם נמצא, העובד מוסר מהמערך.
3. כל העובדים שאחריו מוזזים מקום אחד שמאלה.
4. `numEmployees` קטן ב-1.
5. הודעת הצלחה מודפסת: `Employee with ID {employeeId} removed successfully.`.
6. אם העובד לא נמצא – הודעה מתאימה מודפסת.

---

#### `public void PrintAllEmployeesSortedByName()`

1. מדפיסה את כל העובדים לפי סדר אלפביתי עולה של השם.
2. יש להניח שלמחלקת `Employee` קיימת מתודה `ToString()` להדפסה.

---

### משימה

דמיינו שאתם מפתחי תוכנה בחברת הייטק גדולה, האחראית לייעל את ניהול צי הרכבים והעובדים שלה. עליכם לכתוב מערכת שתאפשר:

* הוספת עובדים לחברה.
* הקצאת רכבים לעובדים בצורה חכמה.
* הסרה וניהול יעיל של רשימת העובדים.
* הדפסת מצב העובדים ממוינת.

מערכת כזו מאפשרת לחסוך בעלויות, לייעל תהליכים ולשפר שביעות רצון עובדים. **כל רכב יכול לשמש כמה עובדים**.

---

### מחלקה ראשית (Main)

במחלקה הראשית:

1. צרו מערך רכבים התחלתי, לדוגמה:

   ```csharp
   Car[] cars = { new Car("1112233", "Toyota"), new Car("4445566", "Honda") };
   ```
2. צרו אובייקט `Company` חדש עם שם ומערך רכבים.
3. הוסיפו עובדים באמצעות מתודה סטטית (למשל `addRandomEmployeesToCompany`).
4. הפעילו בדיקות:

   * הוספת עובדים עד למילוי המערך.
   * הסרת עובדים קיימים ולא קיימים.
   * הדפסת רשימת עובדים לפני ואחרי הסרה.

---

### קלט

* הקלט מגיע מקוד המקור בלבד (מערכי רכבים ושמות מוגדרים מראש).

### פלט

* הפלט מודפס ל-console וכולל:

  * הודעות הוספה/הסרה.
  * רשימת עובדים ממוינת לפי שם.

**דוגמאות לפלט:**

* `Employee added successfully: Sarah Cohen`
* `Employee with ID 3 removed successfully.`
* רשימת עובדים ממוינת לפי שם.
