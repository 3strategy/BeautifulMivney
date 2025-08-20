---
layout: page 
title: "פרק 5 – מחלקת Queue<T>"
subtitle: "תור, FIFO ותור מעגלי"
tags: [Queue, תור, Enqueue, Dequeue, מחלקה גנרית, תור מעגלי]
mathjax: true
lang: he
---

<div class="box-note">
תור (Queue) הוא מבנה נתונים שבו הפריט הראשון שנכנס הוא הראשון שיוצא – **First‑In‑First‑Out**. בפרק זה נלמד לממש תור גנרי ב‑#C, להבין מתי כדאי להשתמש בתור מעגלי וכיצד לשמור על יעילות הפעולות.
</div>

<!-- Source: University of Wisconsin – Queues notes -->

### מהו תור?

<details markdown="1">
<summary>הגדרה ותיאור</summary>

תור הוא סדרה ליניארית שבה שני קצוות: קצה הכניסה (**Rear**) וקצה היציאה (**Front**). פעולת `Enqueue` מוסיפה פריט לסוף התור, ו‑`Dequeue` מסירה את הפריט מההתחלה. אם ננסה להסיר פריט מתור ריק נקבל חריגה.

</details>

### מימוש בסיסי של תור במערך

הדרך הפשוטה לממש תור היא באמצעות מערך ולנהל שני אינדקסים: אחד לראש ואחד לזנב. אך פעולה `Dequeue` על מערך רגיל דורשת הזזה של כל האיברים שמאחורי הראש ומכאן נעשית ב‑\(O(n)\). כדי לשפר זאת נשתמש במערך מעגלי.

```csharp
public class Queue<T>
{
    private T[] data;
    private int front;
    private int rear;
    private int count;

    public Queue(int capacity = 8)
    {
        data = new T[capacity];
        front = 0;
        rear = 0;
        count = 0;
    }

    public void Enqueue(T item)
    {
        if (count == data.Length)
        {
            // הרחבת המערך בעת הצורך ושימור הסדר
            T[] newData = new T[data.Length * 2];
            for (int i = 0; i < count; i++)
            {
                newData[i] = data[(front + i) % data.Length];
            }
            data = newData;
            front = 0;
            rear = count;
        }
        data[rear] = item;
        rear = (rear + 1) % data.Length;
        count++;
    }

    public T Dequeue()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Queue is empty");
        T item = data[front];
        front = (front + 1) % data.Length;
        count--;
        return item;
    }

    public T Peek()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Queue is empty");
        return data[front];
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

במימוש זה אנחנו מנהלים את המצביעים `front` ו‑`rear` במערך מעגלי כך שכל פעולה של `Enqueue` ו‑`Dequeue` מתבצעת בזמן קבוע. כאשר המערך מתמלא, אנו מכפילים את גודלו ומעתיקים את הערכים הקיימים לפי הסדר.

#### דיאגרמה – תור מעגלי

<div class="mermaid">
graph LR
    Start[front=0, rear=0, count=0] --> Enq1[Enqueue(5)]
    Enq1 --> Enq2[Enqueue(7)]
    Enq2 --> Deq1[Dequeue() → 5]
    Deq1 --> Enq3[Enqueue(9)]
    Enq3 --> State[front=1, rear=0 (מעגלי), count=2]
</div>

בדוגמה זו אנו מוסיפים 5 ו‑7, מסירים את 5 ואז מוסיפים 9. האינדקסים של `front` ו‑`rear` מחושבים מודולו אורך המערך.

### פעולות זמינות במחלקת Queue&lt;T&gt;

| Method | תיאור |
| --- | --- |
| `Enqueue(T item)` | מוסיף פריט לסוף התור |
| `T Dequeue()` | מסיר ומחזיר את הפריט בתחילת התור |
| `T Peek()` | מחזיר את הפריט בתחילת התור מבלי להסיר |
| `bool IsEmpty()` | בודק אם התור ריק |
| `int Count()` | מחזיר את מספר הפריטים בתור |
{: .table-rl}

#### דגשים לשימוש נכון בתור
{: .subq}

א. אל תשתמשו בהזזה של כל האיברים ב־`Dequeue`; השתמשו במערך מעגלי או רשימה מקושרת כדי להשיג סיבוכיות O(1).  
ב. ודאו שאתם בודקים אם התור ריק לפני קריאה ל‑`Dequeue` או `Peek`.  
ג. תורים שימושיים באלגוריתמים של חיפוש ברוחב (BFS) ובמודלים של שירות (למשל תור לקוחות).  

### תרגול וקישורים

נסו לממש תור משלכם ולהשתמש בו בסימולציה של שירות לקוחות. לשם תרגול נוסף:

* [⬅ עברו לתרגיל עבודה עם תור מעגלי]({% link cst/5queue/Ex5a2queue.md %}#5a2)

<details markdown="1">
<summary>מקום לפתרון</summary>

כתבו תוכנית המדמה תור במזנון שבו לקוחות מגיעים בזמנים אקראיים ומוגשים לפי סדר ההגעה. השתמשו בתור כדי לנהל את הלקוחות והעריכו את זמן ההמתנה הממוצע.

</details>
