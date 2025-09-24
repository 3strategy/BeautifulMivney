---
layout: page
title: "פולימורפיזם - ניתוח מקרים
subtitle: "הקנייה באמצעות ניתוח בגרות 2025"
tags: [פולימורפיזם, אלגוריתם החלטה, עץ החלטות]
mathjax: true
lang: he
---


{: .box-note}
בתת פרק זה נחזק את הבנת פולימורפיזם באמצעות פתרון בגרות 2025

````markdown
# מדעי המחשב, קיץ תשפ"ה, מס' 899271 - תרגיל בע"מ 24

## מחלקות נתונות

```csharp
public class A {
    protected int i;
    public A(int i) { this.i = i; }
}
````

---

```csharp
public class B : A {
    public B(int i) : base(i + 1) { }

    public bool Foo(Object myObject) {
        Console.WriteLine("Foo1");
        return ((myObject is B) && (this.i == ((B)myObject).i));
    }

    public virtual bool Foo(B myB, int num) {
        Console.WriteLine("Foo2");
        return (this.i + myB.i) < num;
    }
}
```

---

```csharp
public class C : B {
    public C(int i) : base(i) { }

    public bool Foo(int num) {
        Console.WriteLine("Foo3");
        return (this.i != num);
    }
}
```

---

```csharp
public class D : B {
    public D(int i) : base(i * 2) { }

    public override bool Foo(B myB, int num) {
        Console.WriteLine("Foo4");
        return base.Foo(myB, 20);
    }
}
```

---

**א.** סרטטו את תרשים ההיררכיה של המחלקות A, B, C, D (חץ מייצג ירושה).

## ב. נתונה המחלקה Tester

```csharp
public class Tester {
    public static void Main(string[] args) {
        A a = new A(1);
        B b = new B(2);
        C c = new C(3);
        D d = new D(4);
        B bd = new D(5);
        A ac = new C(6);

        //***
    }
}
```

---

**ב1.** סרטטו את העצמים שנוצרו בפעולה Main.


## ב2. קטע הקוד שנוסף ל-Main

```csharp
Console.WriteLine(c.Foo(5));      //(1)
Console.WriteLine(d.Foo(a));      //(2)
Console.WriteLine(bd.Foo(b));     //(3)
Console.WriteLine(bd.Foo(b, 1));  //(4)
Console.WriteLine(((C)ac).Foo(c));//(5)
```

---

ב2. כתבו את הפלט של הפעולות (ציינו ליד כל פלט את מספר השורה).



## ניתוח השאלה האחרונה – פולימורפיזם וקריאות לפעולות

### רקע קצר

ב-C#, כאשר יש לנו ירושה בין מחלקות ושמות מתודות זהים, חשוב להבחין בין:

1. **Overloading (העמסת מתודות)** – פעולות עם אותו שם אך חתימות שונות.
2. **Overriding (הסתרה/דריסה)** – פעולה במחלקת הבת שמחליפה התנהגות של פעולה וירטואלית מהאב.

בנוסף, ישנו שלב **בחירה בזמן קומפילציה** (איזו גרסה מתאימה לפי סוג המשתנים המוצהרים) ושלב **הרצה בזמן אמת** (כאשר קיימת פעולה `virtual` או `override`, נקבעת לפי סוג האובייקט בפועל).

---

### העצמים שנוצרים

```csharp
A a = new A(1);     // אובייקט מטיפוס A
B b = new B(2);     // אובייקט מטיפוס B
C c = new C(3);     // אובייקט מטיפוס C
D d = new D(4);     // אובייקט מטיפוס D
B bd = new D(5);    // מצביע B אל אובייקט מטיפוס D
A ac = new C(6);    // מצביע A אל אובייקט מטיפוס C
```

---

### ניתוח הקריאות

#### (1) `c.Foo(5)`

* סוג **מוצהר**: `C`
* יש פעולה מתאימה: `Foo(int)` ב-C.
* מודפסת ההודעה **"Foo3"**.
* הערך: `(this.i != num)` = `(3+1 != 5)` → כיון ש־C יורשת מ-B עם `i+1`. נבדוק:

  * `new C(3)` קורא ל-`base(3)` = B(3) → ואז B מוסיף `+1` → i=4.
  * בדיקה: `4 != 5` → **true**.

פלט: `Foo3` ואז `True`.

---

#### (2) `d.Foo(a)`

* סוג **מוצהר**: `D`.
* פעולה עם חתימה `(Object)` קיימת רק ב-B (ירושה).
* נבחרת `Foo(Object)` (לא וירטואלית).
* מודפסת ההודעה **"Foo1"**.
* בדיקה: `a` איננו `B`, לכן תנאי `myObject is B` נכשל.
* מחזיר **false**.

פלט: `Foo1` ואז `False`.

---

#### (3) `bd.Foo(b)`

* סוג **מוצהר**: `B`.
* חיפוש מתודות:

  * יש `Foo(Object)` ו-`Foo(B, int)`.
* החתימה `(B)` אינה קיימת ישירות.
* הקומפיילר יבחר ב-`Foo(Object)` (כי `b` הוא `B` ויכול להיחשב כ-Object).
* מודפסת **"Foo1"**.
* בדיקה: `this.i == ((B)b).i`?  עבור bd = new D(5).

  * `new D(5)` → base(5\*2=10) = B(10+1) → i=11.
  * `b = new B(2)` → i=3.
  * 11==3? → **false**.

פלט: `Foo1` ואז `False`.

---

#### (4) `bd.Foo(b, 1)`

* סוג **מוצהר**: `B`.
* החתימה `(B, int)` קיימת והיא **virtual**.
* בזמן ריצה: bd מצביע על אובייקט מטיפוס D, לכן תופעל הפעולה **Foo(B,int)** של D.
* הדפסה: **"Foo4"**.
* הפונקציה קוראת ל-`base.Foo(myB, 20)`.
* זה בעצם B.Foo עם num=20.
* `this.i=11`, `myB.i=3`.
* 11+3 < 20? כן → 14 < 20 → **true**.

פלט: `Foo4`, `Foo2`, ואז `True`.

---

#### (5) `((C)ac).Foo(c)`

* `ac` מצביע A על אובייקט מטיפוס C.
* נעשית המרה ל-C.
* ניסיון קריאה: `Foo(C)` לא קיים.
* קיימות מתודות:

  * Foo(int)
  * Foo(Object)
  * Foo(B,int)
* המתאימה היא **Foo(Object)**.
* לכן יופעל `Foo(Object)` של B.
* הדפסה: **"Foo1"**.
* השוואה: `this.i == ((B)c).i`.
* `ac` נבנה כ-`new C(6)` → i = (6+1)=7.
* `c = new C(3)` → i=4.
* 7==4? → **false**.

פלט: `Foo1` ואז `False`.

---

### סיכום הפלטים

1. `Foo3`, `True`
2. `Foo1`, `False`
3. `Foo1`, `False`
4. `Foo4`, `Foo2`, `True`
5. `Foo1`, `False`

---

## תרשים זרימה (Mermaid)

<div class="mermaid">
graph TD
    A[האם שם הפעולה קיים במחלקה המוצהרת?] -->|כן| B[האם יש התאמה מלאה לחתימה?]
    A -->|לא| Z[חפש במעלה ההיררכיה]
    B -->|כן ויש virtual/override| C[בזמן ריצה - נקבע לפי סוג האובייקט בפועל]
    B -->|כן ולא virtual| D[בזמן קומפילציה - נקבע לפי סוג המוצהר]
    B -->|לא| E[נבדוק המרות אפשריות Overloading Resolution]
    E -->|נמצא| F[הפעל הפעולה המתאימה]
    E -->|לא נמצא| G[שגיאת קומפילציה]
</div>

---

### שימוש לתלמידים

כדי לפתור שאלות כאלה:

1. בדקו **איזה סוג מוצהר** למצביע.
2. חפשו מתודות מתאימות לפי **חתימה**.
3. אם יש `virtual/override` → נקבע לפי **סוג האובייקט בפועל**.
4. אם אין → נקבע לפי **הסוג המוצהר**.
5. תמיד חשבו על ערכי `i` שנקבעו בבנאים!
