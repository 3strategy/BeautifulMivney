---
layout: page
title: "פולימורפיזם - ניתוח מקרים"
subtitle: "אז למה אם אין override מגיעים רק לפעמים לפעולה במחלקה האם?"
tags: [פולימורפיזם, ToString]
mathjax: true
lang: he
---


העניין קשור ישירות לאופן שבו `Console.WriteLine` עובד ב־C# ומהו מנגנון ההדפסה הפנימי שלו.

---

### 1. מה קורה בלי `override`

כאשר אתה יוצר מחלקה עם מתודה `ToString()` *בלי* מילת המפתח `override`, בעצם יצרת **מתודה חדשה** שמסתירה (`hides`) את המתודה הווירטואלית שהוגדרה במחלקת הבסיס (`object.ToString()`).

במקרה זה:

```csharp
class MyClass {
    public string ToString() { return "My version"; } // לא override
}
```

* כאשר אתה כותב:

  ```csharp
  Console.WriteLine(myInstance.ToString());
  ```

  אתה קורא ישירות לגרסה שלך, כי אתה *מכריח* את הקומפיילר לבחור במתודה הזו.

* אבל כשאתה כותב:

  ```csharp
  Console.WriteLine(myInstance);
  ```

  כאן מה שקורה בפועל הוא שהקומפיילר בוחר באוברלואד `Console.WriteLine(object value)`, שבתוכו יש קריאה ל־`value.ToString()`.
  המתודה שהוא מפעיל היא ה־`virtual ToString` שהוגדרה ב־`object`. מאחר שלא ביצעת `override`, המימוש של `object.ToString()` רץ — ולא שלך.

---

### 2. מה קורה עם `override`

כאשר אתה מוסיף:

```csharp
public override string ToString() { return "My version"; }
```

אתה *באמת* מחליף את המימוש הווירטואלי של `object.ToString()`.
עכשיו גם אם הקוד מגיע מ־`Console.WriteLine(object value)` → הקריאה ל־`value.ToString()` מתבצעת פולימורפית לפי סוג האובייקט בפועל.
לכן ההדפסה תשתמש במימוש שלך גם אם לא קראת לו במפורש.

---

### 3. אפשר להסביר זאת כך:

* **בלי override** → כתבנו פעולה חדשה, אבל `Console.WriteLine` לא מכיר אותה אלא אם כן קראת לה במפורש.
* **עם override** → שינינו את החוק הבסיסי של `.ToString()` בכל אובייקט מהמחלקה שלך → ולכן גם `Console.WriteLine(myInstance)` *באופן אוטומטי* יקרא לגרסה שלך.

---

<div class="mermaid">
graph TD
A["Console.WriteLine(obj)"] --> B{איזה אוברלואד נבחר?}
B -->|object value| C["בתוך המימוש מתבצעת קריאה ל-obj.ToString()"]


C --> D{"האם במחלקה יש override ל-ToString()?"}
D -->|כן| E[ריצה פולימורפית → ToString של המחלקה שלך]
D -->|לא| F["ריצה של Object.ToString() → שם הטיפוס"]


B -->|string value| G["נבחר האוברלואד Console.WriteLine(string)"]
G --> H[מדפיס ישירות את המחרוזת שלך]
</div>