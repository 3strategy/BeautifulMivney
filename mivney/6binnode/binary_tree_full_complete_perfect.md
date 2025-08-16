---
layout: page
title: "לימוד עצמי של מושגים"
subtitle: "עצים בינאריים: מושגים"
---





# סוגי עצים בינאריים: **מלא (Full)**, **כמעט מושלם (Complete)**, **מושלם (Perfect)**

> מסמך זה עוסק בשלוש תבניות נפוצות של עצים בינאריים, מציג את ההבדלים העיקריים ביניהן ומספק מונחים מקבילים באנגלית ובעברית לצד מקורות.

## 1. עץ בינארי מלא (**Full / Proper / Strict**)

- **הגדרה** – עץ שבו **כל צומת** הוא
  - עלה (Leaf) ללא ילדים, **או**
  - צומת פנימי (Internal) בעל **שני** ילדים בדיוק.
- תכונות משלימות\
  — מספר העלים `L = I + 1` (‏`I`= #צמתים פנימיים).\
  — אין צמתים בעלי ילד יחיד (בניגוד לעץ צחי / Degenerate).
- מונחים מקבילים\
  — עברית: *עץ בינארי מלא*\
  — אנגלית: *Full Binary Tree*, *Proper Binary Tree*, *Strict Binary Tree*

## 2. עץ בינארי כמעט‑מושלם (**Complete**)

- **הגדרה** – עץ שבו **כל הרמות** חוץ מהאחרונה **מלאות**, והעלים ברמה האחרונה ממוקמים **צפופה משמאל** (left‑justified).\
  משמע: אם יש `n` צמתים, הם מאכלסים את האינדקסים `1..n` במבנה מערך‐בינארי.
- שימושים חשובים\
  — מבנה אידיאלי עבור ערימות (Heap) ומימושי *Priority Queue* במערך.
- מונחים מקבילים\
  — עברית: *עץ בינארי כמעט מושלם* או *עץ כמעט מושלם*\
  — אנגלית: *Complete Binary Tree*

## 3. עץ בינארי מושלם (**Perfect / Strictly Complete**)

- **הגדרה** – גם *מלא* וגם *מאוכלס לחלוטין*:\
  — כל הצמתים הפנימיים בעלי שני ילדים (**Full**), **וגם**\
  — כל העלים נמצאים **באותה רמה**.
- נוסחאות אופייניות\
  — מספר צמתים: `n = 2^(h+1) − 1`\
  — מספר עלים: `L = 2^h`\
  (`h` – גובה).
- מונחים מקבילים\
  — עברית: *עץ בינארי מושלם*\
  — אנגלית: *Perfect Binary Tree*

## 4. השוואה ממוקדת

| תכונה / סוג              | **Full**        | **Complete**                    | **Perfect**          |
| ------------------------ | --------------- | ------------------------------- | -------------------- |
| לכל צומת פנימי שני ילדים | ✔️              | ❌ (ייתכן ילד יחיד ברמה האחרונה) | ✔️                   |
| הרמות לפני אחרונה מלאות  | ✔️              | ✔️                              | ✔️                   |
| כל העלים באותה רמה       | ❌               | ❌                               | ✔️                   |
| ניצול זיכרון אידיאלי     | בינוני          | גבוה                            | מרבי                 |
| שימוש טיפוסי             | עצי חיפוש/ביטוי | ערימה (Heap)                    | ניתוח תאורטי, משחקים |

### מבנה‑על ביחסי הכלה

```
Perfect  ⊂  Complete  ⊂  Full (Strict)
```

*כל עץ מושלם הוא גם כמעט‑מושלם ומלא, אך ההפך אינו נכון.*

## 5. דוגמאות תכנות (Python Pseudocode)

```python
class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right

def is_full(node):
    if not node:
        return True
    if bool(node.left) ^ bool(node.right):       # XOR → בדיוק ילד אחד
        return False
    return is_full(node.left) and is_full(node.right)

def is_complete(root):
    # BFS עם דגל "נתקלנו בחסר" – טכניקה נפוצה
    queue = [root]
    seen_null = False
    while queue:
        node = queue.pop(0)
        if not node:
            seen_null = True
            continue
        if seen_null:
            return False            # נמצא צומת אחרי פער
        queue.extend([node.left, node.right])
    return True
```

## 6. מקורות מומלצים

1. GeeksforGeeks – [Types of Binary Trees](https://www.geeksforgeeks.org/types-of-binary-tree/?utm_source=chatgpt.com)
2. Wikipedia – [Binary Tree](https://en.wikipedia.org/wiki/Binary_tree?utm_source=chatgpt.com)#Types
3. Cormen et al., *Introduction to Algorithms* (CLRS), Ch. 12 Appendix B.

---

**סיכום:**

- **Full** – עץ “חסר‑פשרות” במובן של 0/2 ילדים.
- **Complete** – עץ המאוכלס כ‑array רציף, אידיאלי לערימות.
- **Perfect** – עץ חומרה־אידיאלי: מלא + כל העלים באותה רמה.

הכרת ההבדלים מסייעת בבחירת מבנה נתונים מתאים ובניתוחי סיבוכיות.

