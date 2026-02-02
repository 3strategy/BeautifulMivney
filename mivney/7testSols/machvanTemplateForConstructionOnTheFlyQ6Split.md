# ניקוד שאלה 6

Below is C# Unit 4 question number 3.

* You will be grading student solutions, and rank them as we go along, **in Hebrew**.

* we agreed on these categories for sections 1, 2:

    6.1.1 זיהוי עלה שגוי

    6.1.3 טיפול שגוי במקרה בסיס

    6.1.4 פעולה משנה תור לא נכון

    6.1.5 שגיאות תחביר/חתימה

    6.2.1 לא משתמש/ת ב־Leaves כנדרש

    6.2.2 לולאת השוואה לא מתקדמת / אינסופית

    6.2.3 תנאי לולאה שגוי

    6.2.4 בדיקת סיום שגויה

    6.2.5 השוואה שגויה

* This process is **the same** as we just did in **chats for questions 1,3**.

## The question

**6.1:**
You are given the following method header:
`public static void Leaves(BinNode<int> t, Queue<int> q)`

The method receives:

* A non-empty binary tree `t` of integers.
* An empty queue `q` of integers.

The method inserts into queue q the values of all the leaves of tree t,  according to a right-to-left traversal order.
Implement the method.

**6.2:**
Write a method named SameLeaves that receives two non-empty binary trees of integers
 and returns true if both of the following conditions are met:

* The two trees have the same number of leaves.
* According to a right-to-left traversal, the leaf values are identical and in the same order.

Otherwise, the method should return false.
You must use the method you implemented in part 1.

**Here is my validated teacher solution to the question** (this can be considered score 105+). Anything close, gets a 100. Awful solutions should get a 30-40 (for the effort).

### סעיף א׳ — Leaves

```csharp
public static void Leaves(BinNode<int> t, Queue<int> q)
{
    if (t == null)
        return;

    if (!t.HasLeft() && !t.HasRight())
        q.Insert(t.GetValue());

    Leaves(t.GetRight(), q);
    Leaves(t.GetLeft(), q);
}
```

### סעיף ב׳ — SameLeaves

```csharp
public static bool SameLeaves(BinNode<int> t1, BinNode<int> t2)
{
    Queue<int> q1 = new Queue<int>();
    Queue<int> q2 = new Queue<int>();

    Leaves(t1, q1);
    Leaves(t2, q2);

    while (!q1.IsEmpty() && !q2.IsEmpty())
    {
        if (q1.Remove() != q2.Remove())
            return false;
    }

    return q1.IsEmpty() && q2.IsEmpty();
}
```

* Deductions should be per mistake.
* No specific requirement regarding your response format, as I will manually grade, with 0 automation:
  * Just make it brief, almost laconic - as the students are at K11 grade, before Bagrut (bac 899271).
  * Students have my solutions and we review them in class. Therefore, both categories and specific comments should be very concise.

* Specific comments:
  * 30–90 characters, concise, almost telegram-style
  * Assume students already know your solution and class discussion
  * No pedagogy, no explanations, just the fault

If you have questions tell me, before I start pouring solutions (in handwriting) that you'll need to transcribe. **But we can begin and improve along the way.**
