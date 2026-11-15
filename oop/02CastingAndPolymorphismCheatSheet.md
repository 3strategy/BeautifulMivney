---
title: "המרות ופולימורפיזם — דף עזר"
share-description: "דף חזרה ב־C# לטיפוס מוצהר, המרות, התאמת תבנית, העמסה ודריסה."
tags: [OOP, הורשה, פולימורפיזם, casting, override, overload]
lang: he
---

[הקודם – מבוא לפולימורפיזם]({{ '/oop/02Polymorphism/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – ניתוח בגרות 2025]({{ '/oop/02Polymorphism2Bag25/' | relative_url }}){: data-sequence-nav="next"}

## הטיפוס המוצהר וטיפוס העצם

{: .box-note}
ב-`Animal pet = new Dog();` הטיפוס **המוצהר** של `pet` הוא `Animal`, והטיפוס של **העצם בפועל** הוא `Dog`. המרה בין טיפוסי הפניה נותנת ביטוי בטיפוס אחר שמפנה לאותו עצם.

נניח ש-`Animal` מגדירה פעולה וירטואלית `Speak()`, ו-`Dog` דורסת אותה ומוסיפה פעולה משלה `Bark()`.

- `Animal pet = new Dog();` — **המרה מבן לאב** (upcast) נעשית אוטומטית.
- `pet.Speak();` — מתקמפל דרך `Animal`. בזמן הריצה מופעלת `Dog.Speak()`.
- `pet.Bark();` — **שגיאת קומפילציה.** הפעולה קיימת רק ב-`Dog`.
- `Dog d = pet;` — **שגיאת קומפילציה.** נדרשת כאן המרה מפורשת מאב לבן (downcast).
- `Dog d = (Dog)pet;` — ההמרה מצליחה כי העצם הוא `Dog`. כעת אפשר לקרוא ל-`d.Bark()`.
- `Dog d = (Dog)new Animal();` — מתקמפל וזורק `InvalidCastException` בזמן הריצה כי העצם הוא `Animal`.
- `if (pet is Dog dog)` — **התאמת תבנית** (pattern matching). אם העצם מתאים ל-`Dog`, אפשר לקרוא ל-`dog.Bark()` בגוף התנאי.

{: .box-success}
כשהטיפוס בפועל עשוי להשתנות, `is Dog dog` בודק התאמה ונותן משתנה מטיפוס `Dog` כשיש התאמה. התנאי מחזיר `false` גם כשההפניה היא `null`.

## איך יודעים איזו פעולה תרוץ?

1. **בדקו אם השורה מתקמפלת.** סמנו את טיפוס הביטוי שמשמאל לנקודה ואת טיפוסי הארגומנטים. אם מופיע `cast`, בדקו שהוא מותר בין הטיפוסים והשתמשו בטיפוס היעד של ההמרה. מתוך הפעולות הנגישות הקומפיילר בוחר חתימה מתאימה (**overload**). אם אין חתימה מתאימה, זו שגיאת קומפילציה.
2. **בדקו מה קורה בהרצה.** המרה מפורשת להפניה לא מתאימה עלולה לזרוק `InvalidCastException` לפני הקריאה. אם הפעולה שנבחרה וירטואלית, הטיפוס של העצם בפועל קובע איזה מימוש בשרשרת הדריסות יופעל (**override**). פעולה רגילה מופעלת לפי הבחירה בקומפילציה.

**הסתרה עם `new`.** אם `Dog` מגדירה פעולה רגילה שמסתירה פעולה של `Animal`, קריאה דרך משתנה `Animal` תבחר בפעולה של `Animal`. קריאה דרך משתנה `Dog` תבחר בפעולה המסתירה של `Dog`.

## בדיקה עצמית

הריצו בדמיון כל שורה בנפרד, כש-`pet` הוגדר כך:

```csharp
Animal pet = new Animal();
```

1. `pet.Speak();`
2. `pet.Bark();`
3. `((Dog)pet).Bark();`
4. `if (pet is Dog dog) { dog.Bark(); }`

<details markdown="1">
<summary>תשובות</summary>

1. מופעלת `Animal.Speak()`.
2. שגיאת קומפילציה.
3. `InvalidCastException` בזמן הריצה.
4. התנאי `false` והקריאה ל-`Bark()` אינה מתבצעת.

</details>

[הדוגמה המלאה להרצה]({{ '/oop/02Polymorphism/#declared-and-runtime-types' | relative_url }}) · [סיכום שגיאות עם דוגמאות]({{ '/oop/02CompilationAndRunTimeErrorSummary/' | relative_url }})
