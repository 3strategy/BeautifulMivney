---
layout: page
title: "פולימורפיזם – העמסה מול דריסה"
subtitle: "העמקה והבהרות משלימות"
tags: [פולימורפיזם, Overloading, Overriding]
lang: he
---

[הקודם – ניתוח בגרות 2025]({{ '/oop/02Polymorphism2Bag25/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – ToString והסתרה]({{ '/oop/02Polymorphism4CwToString/' | relative_url }}){: data-sequence-nav="next"}

## העמסה מול דריסה

בחרו חתימה בזמן הקומפילציה. אם הפעולה שנבחרה היא וירטואלית, טיפוס העצם בפועל קובע איזה מימוש יופעל בזמן הריצה. לניתוח קריאה לפי שלבים, השתמשו ב[עץ ההחלטה לבחירת פעולה]({{ '/oop/02FunctionChoicePath/#decision-tree' | relative_url }}).

| מאפיין | העמסה (Overloading) | דריסה (Overriding) |
|---:|---:|---:|
| **מיקום** | באותה מחלקה או בין מחלקה למחלקת בסיס | בין מחלקת בסיס למחלקה יורשת |
| **שם פעולה** | זהה | זהה |
| **חתימה** | שונה (פרמטרים שונים) | זהה |
| **מועד ההכרעה** | בחירת החתימה בזמן קומפילציה | בחירת המימוש בזמן ריצה |
| **מטרת שימוש** | אותו שם לפעולות שמקבלות פרמטרים שונים | מחלקה יורשת מספקת מימוש משלה לפעולה וירטואלית |
| **אפשרי עם `static`?** | כן | לא, בפעולות של מחלקות |

מה ההבדל בין `Console.WriteLine(obj)` לבין `Console.WriteLine(obj.ToString())`? ראו ב[שיעור על `ToString` והסתרה]({{ '/oop/02Polymorphism4CwToString/' | relative_url }}).

