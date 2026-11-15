---
menu_set: oop
layout: page
title: "פולימורפיזם - ההתחלה"
subtitle: "שיעור פתיחה בנושא"
tags: [פולימורפיזם,UML,אגרגציה, composition, הכלה, קומפוזיציה]
mathjax: true
lang: he
---

[הקודם – שאלון הורשה ובנאים]({{ '/oop/01questionnaire/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – דף עזר להמרות ופולימורפיזם]({{ '/oop/02CastingAndPolymorphismCheatSheet/' | relative_url }}){: data-sequence-nav="next"}

{: .box-note}
**פולימורפיזם** (“ריבוי צורות”) הוא עיקרון מרכזי ב-OOP. המשמעות היא היכולת של פעולה אחת לקבל מימושים שונים במחלקות שונות. כך ניתן לכתוב קוד כללי יותר, המשתמש במחלקת בסיס, **והמערכת מפעילה בזמן ריצה את המימוש המתאים** של הפעולה לפי סוג האובייקט בפועל.

מומלץ תחילה לעבור על [המצגת שכאן](/oop/02-polymorphism-cs.pptx)

## משתנה מטיפוס אב שמפנה לעצם מטיפוס בן {#declared-and-runtime-types}

בשורה `Animal pet = new Dog();` הטיפוס המוצהר של המשתנה `pet` הוא `Animal`. הטיפוס של העצם שנוצר הוא `Dog`. ההשמה מותרת כי כל `Dog` הוא גם `Animal`. זוהי **המרה משתמעת מבן לאב** (upcast).

{% include oop/02Polymorphism-animal-example.md %}

- **`pet.Speak()`** מתקמפלת כי הפעולה זמינה דרך `Animal`. בזמן הריצה, מאחר ש-`Speak` היא `virtual` והעצם הוא `Dog`, רץ המימוש שהוגדר עם `override` ב-`Dog`.
- **`pet.Bark()`** גורמת לשגיאת קומפילציה כי `Bark` מוגדרת רק ב-`Dog`. כדי לקרוא לה צריך ביטוי שהטיפוס שלו הוא `Dog`, למשל `((Dog)pet).Bark()`.
- **`pet is Dog dog`** בודק אם העצם מתאים ל-`Dog`. כשהבדיקה מצליחה, `dog` הוא משתנה מטיפוס `Dog` שמפנה לאותו עצם.

{: .box-note}
`pet`, `sameDog` ו-`dog` מפנים לאותו כלב כאשר התנאי מתקיים. הטיפוס המוצהר של `pet` נשאר `Animal`. אפשר לקרוא ל-`Bark` דרך `sameDog` או דרך `dog` בתוך ה-`if`.

### מה קורה כשהעצם הוא רק `Animal`?

אם נחליף את שורת ההשמה ב-`Animal pet = new Animal();`, הקריאה `pet.Speak()` תחזיר `Animal sound`. ההמרה `(Dog)pet` תתקמפל ותזרוק `InvalidCastException` בזמן הריצה. אם נריץ את ה-`if` בלי ההמרה המפורשת שלפניו, התנאי יהיה `false` וגוף התנאי לא יתבצע.

## סוגי פולימורפיזם

- **העמסה (overload)** היא בחירת חתימה מתאימה בזמן קומפילציה. עבור משתנים, הבחירה נשענת על הטיפוסים המוצהרים של המקבל ושל הארגומנטים.
- **דריסה (override)** קובעת בזמן ריצה איזה מימוש של הפעולה הווירטואלית שנבחרה יופעל, לפי טיפוס העצם בפועל.

---

## דוגמה: צורות גאומטריות

נבנה היררכיית מחלקות:  

- `Shape` - מחלקת בסיס עם פעולה `()Area`.  
- `Rectangle` - יורשת מ-`Shape` ומחשבת שטח מלבן.  
- `Square` - יורשת מ-`Rectangle` (ריבוע הוא מלבן מיוחד).  
- `Circle` - יורשת מ-`Shape` ומחשבת שטח מעגל.  

כל תא במערך `Shape[]` יכול להכיל הפניה למלבן, לריבוע או למעגל. בלולאה, המשתנה `s` הוא מטיפוס `Shape`, ולכן אפשר לקרוא ל-`s.Area()` בכל איטרציה. כל עצם מפעיל את מימוש חישוב השטח שמתאים לו דרך `virtual` ו-`override`.

---

## תרשים UML

<div class="mermaid" style="direction:ltr;">

classDiagram
    class Shape {
        +Area() double
        +ToString() string
    }

    class Rectangle {
        -width : double
        -height : double
        +Area() double
        +ToString() string
    }

    class Square {
        +Area() double
        +ToString() string
    }

    class Circle {
        -radius : double
        +Area() double
        +ToString() string
    }

    Shape <|-- Rectangle
    Shape <|-- Circle
    Rectangle <|-- Square
</div>

---

## חזרה על כללי כתיבת UML (Unified Modeling Language) {#idUML}

`-` private יסומנו בתחילית `-`

`+` public יסומנו בתחילית `+`.

`🠈` הורשה מסומנת בחץ `🠈` מהיורש למוריש. ראש החץ חלול, ולא מלא.

`─♦` הכלה מסומנת ב `─♦` (לאדם יש יד. למכונית יש גלגלים).

`─◇` אגרגציה מסומנת ב `─◇` (מכונית מכילה נוסעים, אבל יש להם קיום משל עצמם).

- מומלץ ליצור תרשימים כאלו [במרמייד](https://mermaid.live). אפשר להעזר ב-AI.

## קוד C #

<details markdown="1">
<summary>📄 לחצו להצגת הקוד</summary>

{% include oop/02Polymorphism-example-1.md %}

---

### פלט אפשרי

```
Rectangle(3x4) area = 12
Circle(5) area = 78.53981633974483
Square(2) area = 4
```

</details>

---

## יתרונות הפולימורפיזם

- **קוד כללי וגמיש יותר:** אותה פעולה פועלת על אובייקטים מסוגים שונים.
- **הרחבה קלה:** אפשר להוסיף מחלקות חדשות בלי לשנות קוד קיים.
- **תחזוקה ברורה:** קוד קצר, קריא וקל יותר לתחזוקה.

---

[דף עזר להמרות ופולימורפיזם]({{ '/oop/02CastingAndPolymorphismCheatSheet/' | relative_url }})
