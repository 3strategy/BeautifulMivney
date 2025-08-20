---
layout: page 
title: "פרק 4 – מחלקת Stack&lt;T&gt;"
subtitle: "עבודה עם מחסנית – LIFO, Push ו‑Pop"
tags: [Stack, מחסנית, Push, Pop, Peek, מחסנית גנרית, C#]
mathjax: true
lang: he
---

<div class="box-note">
מחסנית (Stack) היא מבנה נתונים המתנהג לפי עיקרון **Last‑In‑First‑Out**: הפריט האחרון שנכנס הוא הראשון שיוצא. בפרק זה נלמד כיצד לעבוד עם מחסנית גנרית Stack&lt;T&gt; ב‑C# ונעמוד על יתרונותיה וחסרונותיה.
</div>

<!-- Source: University of Wisconsin – Notes on Stacks -->

### מהי מחסנית?

<details markdown="1">
<summary>הגדרה ותיאור</summary>

מחסנית היא רשימה ליניארית שבה כל ההוספות והמחיקות מתבצעות בקצה אחד בלבד הנקרא **Top**. הפעולה הבסיסית של המחסנית היא `Push` (דחיפה) – הוספת פריט לראש המחסנית – ו‑`Pop` (שליפה) – הסרת הפריט האחרון שהוכנס. ניתן גם להציץ בפריט בראש המחסנית באמצעות `Peek` מבלי להסיר אותו.

</details>

### מימוש מחסנית ב‑C#

בהמשך מופיע מימוש פשוט של מחסנית גנרית המבוססת על מערך פנימי ודינאמי. במחסנית זו קיימות פעולות הוספה, הסרה והצצה:

```csharp
public class Stack<T>
{
    private T[] data;
    private int count;

    public Stack(int capacity = 8)
    {
        data = new T[capacity];
        count = 0;
    }

    public void Push(T item)
    {
        // הרחבת המערך במידת הצורך
        if (count == data.Length)
        {
            Array.Resize(ref data, data.Length * 2);
        }
        data[count++] = item;
    }

    public T Pop()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Stack is empty");
        return data[--count];
    }

    public T Peek()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Stack is empty");
        return data[count - 1];
    }

    public bool IsEmpty()
    {
        return count == 0;
    }

    public int Count()
    {
        return count;
    }
}
```

במימוש זה אנו משתמשים במערך להחזקה של הפריטים. כל פעם שמגיעים לקצה המערך אנו מכפילים את גודלו (הרחבה דינאמית). הפעולה `Pop` מחזירה ומוחקת את הפריט העליון ואילו `Peek` מחזירה את הפריט מבלי למחוק אותו.

### דיאגרמה – פעולות המחסנית

<div class="mermaid">
graph TD
    Start[מחסנית ריקה] --> Push1[Push(5)]
    Push1 --> Push2[Push(10)]
    Push2 --> Peek[Peek() → 10]
    Peek --> Pop[Pop() → 10]
    Pop --> State[נשאר: 5]
</div>

הדיאגרמה מציגה פעולות בסיסיות: בהתחלה המחסנית ריקה; דוחפים את 5 ואז את 10; הצצה מחזירה 10; לאחר מכן שולפים 10, וה־5 נשאר.

### פעולות זמינות במחלקת Stack&lt;T&gt;

| Method | תיאור |
| --- | --- |
| `Push(T item)` | דוחף פריט לראש המחסנית |
| `T Pop()` | מסיר ומחזיר את הפריט האחרון שנכנס |
| `T Peek()` | מחזיר את הפריט האחרון מבלי להסיר |
| `bool IsEmpty()` | מחזיר אמת אם המחסנית ריקה |
| `int Count()` | מחזיר את מספר האיברים במחסנית |
{: .table-rl}

#### אזהרות וטעויות נפוצות
{: .subq}

א. ניסיונות קריאה ל‑`Pop` או `Peek` על מחסנית ריקה יגרמו לחריגה. יש לוודא שהמחסנית אינה ריקה לפני קריאה לפעולות אלו.  
ב. מחסנית מתאימה לאלגוריתמים הפועלים בסדר הפוך (כגון חישוב ביטויים בפולנית הפוכה). שימוש לא נכון עלול לגרום ללוגיקה שגויה.  

### תרגול וקישורים

לתרגול הוספה והסרה במחסנית תוכלו לגשת לקישורים הבאים:

* [⬅ עברו לתרגיל Push ו‑Pop]({% link cst/4stack/Ex4a1stack.md %}#4a1)
* [⬅ עברו לתרגיל מחסנית לביטויים]({% link cst/4stack/Ex4a2stack.md %}#4a2)
* [⬅ עברו לתרגיל שיווי משקל של סוגריים]({% link cst/4stack/Ex4a3stack.md %}#4a3)

<details markdown="1">
<summary>מקום לפתרון</summary>

נסו לממש אלגוריתם המחשב ערך של ביטוי מתמטי הרשום בפולנית הפוכה (postfix). השתמשו במחסנית כדי לאחסן אופרטורים ואופרנדים.

</details>