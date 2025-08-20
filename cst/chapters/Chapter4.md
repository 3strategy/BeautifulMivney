---
layout: page 
title: "פרק 4 – מחלקת StackT"
subtitle: "עבודה עם מחסנית – LIFO, Push ו‑Pop"
tags: [Stack, מחסנית, Push, Pop, Top, מחסנית גנרית, C#]
mathjax: true
lang: he
---

<div class="box-note">
מחסנית (Stack) היא מבנה נתונים המתנהג לפי עיקרון **Last‑In‑First‑Out**: הפריט האחרון שנכנס הוא הראשון שיוצא. בפרק זה נלמד כיצד לעבוד עם מחסנית גנרית StackT ב‑C# ונעמוד על יתרונותיה וחסרונותיה.
</div>

<!-- Source: University of Wisconsin – Notes on Stacks -->

### מהי מחסנית?

<details markdown="1">
<summary>הגדרה ותיאור</summary>

מחסנית היא רשימה ליניארית שבה כל ההוספות והמחיקות מתבצעות בקצה אחד בלבד הנקרא **Top**. הפעולה הבסיסית של המחסנית היא `Push` (דחיפה) – הוספת פריט לראש המחסנית – ו‑`Pop` (שליפה) – הסרת הפריט האחרון שהוכנס. ניתן גם להציץ בפריט בראש המחסנית באמצעות `Top` מבלי להסיר אותו.

</details>

### מימוש מחסנית ב‑C#

בהמשך מופיע מימוש פשוט של מחסנית גנרית המבוססת על מערך פנימי ודינאמי. במחסנית זו קיימות פעולות הוספה, הסרה והצצה:

```csharp
public class Stack<T>
{
    private Node<T> head;
    public Stack() => this.head = null;
    public void Push(T x)
    {
        Node<T> temp = new Node<T>(x);
        temp.SetNext(head);
        head = temp;
    }
    public T Pop()
    {
        T x = head.GetValue();
        head = head.GetNext();
        return x;
    }
    public T Top() => head.GetValue();
    public bool IsEmpty() => head == null;
    public override string ToString()
    {
        if (this.IsEmpty())
            return "[]";
        string temp = head.ToString();
        return "TOP <== " + temp.Substring(0, temp.Length - 1) + "]";
    }
}
}
```

במימוש זה אנו משתמשים במערך להחזקה של הפריטים. כל פעם שמגיעים לקצה המערך אנו מכפילים את גודלו (הרחבה דינאמית). הפעולה `Pop` מחזירה ומוחקת את הפריט העליון ואילו `Top` מחזירה את הפריט מבלי למחוק אותו.

### דיאגרמה – פעולות המחסנית

<div class="mermaid">
graph TD
    Start[מחסנית ריקה] --> Push1[Push(5)]
    Push1 --> Push2[Push(10)]
    Push2 --> Top[Top() → 10]
    Top --> Pop[Pop() → 10]
    Pop --> State[נשאר: 5]
</div>

הדיאגרמה מציגה פעולות בסיסיות: בהתחלה המחסנית ריקה; דוחפים את 5 ואז את 10; הצצה מחזירה 10; לאחר מכן שולפים 10, וה־5 נשאר.

### פעולות זמינות במחלקת StackT;

| Method | תיאור |
| --- | --- |
| `Push(T item)` | דוחף פריט לראש המחסנית |
| `T Pop()` | מסיר ומחזיר את הפריט האחרון שנכנס |
| `T Top()` | מחזיר את הפריט האחרון מבלי להסיר |
| `bool IsEmpty()` | מחזיר אמת אם המחסנית ריקה |
| `int Count()` | מחזיר את מספר האיברים במחסנית |
{: .table-rl}

#### אזהרות וטעויות נפוצות
{: .subq}

א. ניסיונות קריאה ל‑`Pop` או `Top` על מחסנית ריקה יגרמו לחריגה. יש לוודא שהמחסנית אינה ריקה לפני קריאה לפעולות אלו.  
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