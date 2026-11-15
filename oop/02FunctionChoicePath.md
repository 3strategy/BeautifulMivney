---
layout: page
title: "עץ החלטה: איזו פעולה תרוץ או איזו שגיאה תתקבל"
subtitle: "אלגוריתם עברי לפתרון שאלות על override, overload, hiding ו-casting"
tags: [פולימורפיזם, mermaid, override, overloading, hiding, casting, OOP]
mathjax: true
lang: he
---

[הקודם – מפת שאלוני הקוד]({{ '/oop/02QuestionnaireLogicMap/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – סיכום שגיאות]({{ '/oop/02CompilationAndRunTimeErrorSummary/' | relative_url }}){: data-sequence-nav="next"}

{: .box-note}
העץ מתאר קריאה לפעולת מופע במחלקה, כשהמקבל מפנה לעצם, וכולל המרות מפורשות בין טיפוסי הפניה. תחילה בודקים את **כל הקריאה בקומפילציה**. רק אם היא מתקמפלת, בודקים מה יקרה בזמן הריצה.

## עץ ההחלטה {#decision-tree}

<div class="mermaid">
%%{init: {"flowchart": {"nodeSpacing": 20, "rankSpacing": 30}}}%%
flowchart TD
    Compile["קומפילציה"] --> CastAllowed{"כל ההמרות המפורשות<br/>מותרות לפי הטיפוסים?"}
    CastAllowed -->|לא| BadCast["שגיאת קומפילציה<br/>המרה אסורה"]
    CastAllowed -->|כן או אין המרות| Signature{"נבחרה חתימה<br/>מתאימה אחת?"}
    Signature -->|כן| Runtime["זמן ריצה"]
    Signature -->|לא| BadCall["שגיאת קומפילציה<br/>בחירת הפעולה נכשלה"]
    Runtime --> CastFails{"המרה מפורשת<br/>נכשלה?"}
    CastFails -->|כן| CastError["InvalidCastException"]
    CastFails -->|לא| Virtual{"פעולה וירטואלית?"}
    Virtual -->|לא| Call["הפעולה שנבחרה<br/>בקומפילציה"]
    Virtual -->|כן| Dispatch["המימוש לפי<br/>טיפוס העצם"]

    classDef phase fill:#194970,stroke:#194970,color:#fff,font-weight:bold;
    class Compile,Runtime phase;
</div>

**בקומפילציה**, בודקים אילו פעולות נגישות דרך טיפוס המקבל. משתמשים בטיפוסי הביטויים של הארגומנטים, כולל טיפוס היעד של כל `cast`, ומביאים בחשבון המרות משתמעות מותרות. אם אין מועמד מתאים או שהבחירה דו־משמעית, הקריאה לא מתקמפלת.

**בזמן הריצה**, המרה מפורשת על המקבל או על ארגומנט עלולה להיכשל עוד לפני הקריאה לפעולה. אם הקריאה מגיעה לפעולה וירטואלית, מחפשים בשרשרת הדריסות של הפעולה שנבחרה את המימוש הקרוב ביותר לטיפוס העצם.

## דוגמה עם `new` ו-`override`

```csharp
class A
{
    public void F() { Console.Write("A"); }
    public virtual void G() { Console.Write("a"); }
}

class B : A
{
    public new void F() { Console.Write("B"); }
    public override void G() { Console.Write("b"); }
}
```

בתוך `Main` קוראים לשתי פעולות על אותו עצם:

```csharp
A x = new B();
x.F();
x.G();
```

{: .box-warning}
בקריאה `x.F()` נשתמש בטיפוס המוצהר `A`, ולכן יודפס `A`. בקריאה `x.G()` כבר קיימת שרשרת `virtual`/`override`, ולכן הטיפוס בזכרון `B` מכריע ויודפס `b`.

## דוגמה שבה סדר הבדיקות קובע את השגיאה

בהינתן `A other = new A();`, בדקו כל קריאה בנפרד:

- `((B)other).Missing();` גורמת לשגיאת קומפילציה כי אין פעולה נגישה בשם `Missing`. מבחינת הטיפוסים, ההמרה ל-`B` מותרת. רק קוד שעבר קומפילציה יגיע לבדיקת ההמרה בזמן ריצה.
- `((B)other).G();` מתקמפלת כי `G` זמינה דרך `B`. בזמן הריצה ההמרה זורקת `InvalidCastException`, כי העצם שב-`other` הוא מטיפוס `A`. הקריאה ל-`G` לא מתבצעת.
