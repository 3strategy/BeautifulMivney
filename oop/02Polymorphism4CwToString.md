---
layout: page
title: "פולימורפיזם - ניתוח מקרים"
subtitle: "אז למה אם אין override מגיעים רק לפעמים לפעולה במחלקה האם?"
tags: [פולימורפיזם, ToString]
mathjax: true
lang: he
---

ניקח את הדוגמא הבאה: `Console.WriteLine(myInstance.ToString());` מדוע תופעל הפעולה מהמחלקה הספציפית גם אם אין override?


העניין קשור ישירות לאופן שבו `Console.WriteLine` עובד ב־C# ומהו מנגנון ההדפסה הפנימי שלו.

---

### 1. מה קורה בלי `override`

כאשר אתם יוצרים מחלקה עם פעולה `ToString()` *בלי* מילת המפתח `override`, בעצם יצרתם **פעולה חדשה** שמסתירה (`hides`) את הפעולה הווירטואלית שהוגדרה במחלקת הבסיס (`object.ToString()`).

במקרה זה:

```csharp
class MyClass {
    public string ToString() { return "My version"; } // לא override
}
```

* כאשר אתם כותבים:

  ```csharp
  Console.WriteLine(myInstance.ToString());
  ```

  אתם קוראים ישירות לגרסה שלכם, כי אתם **מכריחים** את הקומפיילר לבחור בפעולה הזו.

* אבל כשאתם כותבים:

  ```csharp
  Console.WriteLine(myInstance);
  ```

  כאן מה שקורה בפועל הוא שהקומפיילר בוחר באוברלואד `Console.WriteLine(object value)`, שבתוכו יש קריאה ל־`value.ToString()`.
  המתודה שהוא מפעיל היא ה־`virtual ToString` שהוגדרה ב־`object`. מאחר שלא ביצעתם `override`, המימוש של `object.ToString()` רץ — ולא שלכם.

---

### 2. מה קורה עם `override`

כאשר אתם מוסיפים:

```csharp
public override string ToString() { return "My version"; }
```

אתם *באמת* מחליפים את המימוש הווירטואלי של `object.ToString()`.
עכשיו גם אם הקוד מגיע מ־`Console.WriteLine(object value)` → הקריאה ל־`value.ToString()` מתבצעת **פולימורפית** לפי סוג האובייקט בפועל.
לכן ההדפסה תשתמש במימוש שלכם גם אם לא קראתם לו במפורש.

---

### 3. אפשר להסביר זאת כך:

* **בלי override** → כתבנו פעולה חדשה, אבל `Console.WriteLine` לא מכיר אותה אלא אם כן קראתם לה במפורש.
* **עם override** → שינינו את החוק הבסיסי של `.()ToString` בכל אובייקט מהמחלקה שלכם → ולכן גם `Console.WriteLine(myInstance)` *באופן אוטומטי* יקרא לגרסה שלכם.

---

<div class="mermaid">
graph TD
A["Console.WriteLine(obj)"] --> B{איזה אוברלואד נבחר?}
B -->|object value| C["בתוך המימוש מתבצעת קריאה ל-()obj.ToString"]


C --> D{"האם במחלקה יש override ל-ToString()?"}
D -->|כן| E[ריצה פולימורפית → ToString של המחלקה שלכם]
D -->|לא| F["ריצה של Object.ToString() → שם הטיפוס"]


B -->|string value| G["נבחר האוברלואד Console.WriteLine(string)"]
G --> H[מדפיס ישירות את המחרוזת שלכם]
</div>