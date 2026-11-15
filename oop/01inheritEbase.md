---
layout: page
title: "חוקי קריאה ל-base"
subtitle: "הבהרות base"
tags: [הורשה, OOP,בנאים, העמסת בנאים,base, שרשור בנאים, CSharp]
mathjax: true
lang: he
---

[הקודם – שרשור בנאים]({{ '/oop/01inheritdconstructors/' | relative_url }}){: data-sequence-nav="prev"} · [הבא – שאלון הורשה ובנאים]({{ '/oop/01questionnaire/' | relative_url }}){: data-sequence-nav="next"}

- `: base(...)` בוחר בנאי נגיש של מחלקת האב, בשורת ההכרזה של הבנאי היורש.
- `: this(...)` בוחר בנאי אחר באותה מחלקה, בשורת ההכרזה של הבנאי.
- `base.MethodName(...)` קורא למימוש הנגיש שמגיע ממחלקת הבסיס, מתוך גוף של בנאי או של פעולת מופע במחלקה היורשת.

[הכללים ודוגמאות ההרצה של `base` ו-`this` בשיעור הבנאים]({{ '/oop/01inheritdconstructors/#constructor-order-example' | relative_url }})

## הבדל חשוב: קריאה למתודות של האב

בתוך `C` אפשר להשתמש ב-`base.DoSomething()` מתוך הדריסה, וגם מתוך פעולת מופע אחרת. שתי הקריאות בדוגמה מגיעות למימוש של `P`.

```csharp
class P
{
    public virtual string DoSomething() => "P";
}

class C : P
{
    public override string DoSomething()
    {
        return base.DoSomething() + " → C";
    }

    public string CallParent()
    {
        return base.DoSomething();
    }
}
```

כאשר `c` מפנה לעצם חדש מסוג `C`, הקריאה `c.DoSomething()` מחזירה `"P → C"` והקריאה `c.CallParent()` מחזירה `"P"`.
