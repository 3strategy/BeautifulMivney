---
layout: page 
title: "פרק 5 – מחלקת Queue⟨T⟩"
subtitle: "תור, FIFO ותור מעגלי"
tags: [Queue, תור, Insert , Remove, מחלקה גנרית, תור מעגלי]
mathjax: true
lang: he
---

{: .box-note}
תור (Queue) הוא מבנה נתונים שבו הפריט הראשון שנכנס הוא הראשון שיוצא – **First‑In‑First‑Out**. בפרק זה נלמד לממש תור גנרי ב‑#C, להבין מתי כדאי להשתמש בתור מעגלי וכיצד לשמור על יעילות הפעולות.


<!-- Source: University of Wisconsin – Queues notes -->

### מהו תור?

<details markdown="1">
<summary>הגדרה ותיאור</summary>

תור הוא סדרה ליניארית שבה שני קצוות: קצה הכניסה (**Rear**) וקצה היציאה (**Front**). פעולת `Insert` מוסיפה פריט לסוף התור, ו‑`Remove` מסירה את הפריט מההתחלה. אם ננסה להסיר פריט מתור ריק נקבל חריגה.

</details>

### מימוש של תור ב- Unit4 הוא באמצעות שרשרת חוליות ולא במערך

```csharp
// Unit4 המימוש הרשמי של 
public class Queue<T>
{
    private Node<T> first;
    private Node<T> last;

    //-----------------------------------
    //constructor
    public Queue()
    {
        this.first = null;
        this.last = null;
    }
    //-----------------------------------
    //adds element x to the end of the queue
    public void Insert(T x)
    {
        Node<T> temp = new Node<T>(x);
        if (first == null)
            first = temp;
        else
            last.SetNext(temp);
        last = temp;
    }
    //-----------------------------------
    //removes & returns the element from the head of the queue
    public T Remove()
    {
        if (IsEmpty())
            return default(T);
        T x = first.GetValue();
        first = first.GetNext();
        if (first == null)
            last = null;
        return x;
    }
    //-----------------------------------
    //returns the element from the head of the queue
    public T Head()
    {
        return first.GetValue();
    }
    //-----------------------------------
    //returns true if there are no elements in queue
    public bool IsEmpty()
    {
        return first == null;
    }
    //-------------------------------------
    //ToString
    public override string ToString()
    {
        if (this.IsEmpty())
            return "[]";
        string temp = first.ToString();
        return "QueueHead[" + temp.Substring(0, temp.Length - 1) + "]";
    }
}
```

<details markdown="1">
<summary>מימוש באמצעות מערך מעגלי</summary>

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

    public void Insert(T item)
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

    public T Remove()
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

במימוש זה אנחנו מנהלים את המצביעים `front` ו‑`rear` במערך מעגלי כך שכל פעולה של `Insert` ו‑`Remove` מתבצעת בזמן קבוע. כאשר המערך מתמלא, אנו מכפילים את גודלו ומעתיקים את הערכים הקיימים לפי הסדר.

#### דיאגרמה – תור מעגלי

<div class="mermaid">
graph LR
    Start[front=0, rear=0, count=0] --> Ins1[Insert(5)]
    Ins1 --> Ins2[Insert(7)]
    Ins2 --> Rem1[Remove() → 5]
    Rem1 --> Ins3[Insert(9)]
    Ins3 --> State[front=1, rear=0 (מעגלי), count=2]
</div>

בדוגמה זו אנו מוסיפים 5 ו‑7, מסירים את 5 ואז מוסיפים 9. האינדקסים של `front` ו‑`rear` מחושבים מודולו אורך המערך.

</details>



### פעולות זמינות במחלקת Queue&lt;T&gt;

| Method | תיאור |
| --- | --- |
|מוסיף פריט לסוף התור | `Insert (T item)` | 
| מסיר ומחזיר את הפריט בתחילת התור | `T Remove()` |
|מחזיר את הפריט בתחילת התור מבלי להסיר | `T Peek()` | 
| בודק אם התור ריק | `bool IsEmpty()` |
| מחזיר את מספר הפריטים בתור |`int Count()` | 
{: .table-rl}

#### דגשים לשימוש נכון בתור

{: .subq}
א. אל תשתמשו בהזזה של כל האיברים ב־`Remove`; השתמשו במערך מעגלי או רשימה מקושרת כדי להשיג סיבוכיות O(1).  
{: .subq}
ב. ודאו שאתם בודקים אם התור ריק לפני קריאה ל‑`Remove` או `Peek`.  
{: .subq}
ג. תורים שימושיים באלגוריתמים של חיפוש ברוחב (BFS) ובמודלים של שירות (למשל תור לקוחות).  

### תרגול וקישורים

נסו לממש תור משלכם ולהשתמש בו בסימולציה של שירות לקוחות. לשם תרגול נוסף:

- [⬅ עברו לתרגיל עבודה עם תור מעגלי]({% link cst/5queue/Ex5a2queue.md %}#5a2.3)

<details markdown="1">
<summary>מקום לפתרון</summary>

כתבו תוכנית המדמה תור במזנון שבו לקוחות מגיעים בזמנים אקראיים ומוגשים לפי סדר ההגעה. השתמשו בתור כדי לנהל את הלקוחות והעריכו את זמן ההמתנה הממוצע.

</details>
