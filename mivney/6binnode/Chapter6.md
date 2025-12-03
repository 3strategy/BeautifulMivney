---
layout: page 
title: "פרק 6 – מחלקת BinNode⟨T⟩ ועצים בינאריים"
subtitle: "מבנה עץ בינארי, מסלולים וטרוורסות"
tags: [BinNode, עץ בינארי, עצים, חיפוש, טרוורסה, ג'נריקס]
mathjax: true
lang: he
---

{: .box-note}
עץ בינארי הוא מבנה נתונים היררכי שבו לכל צומת יש לכל היותר שני ילדים: ילד שמאלי וילד ימני. בפרק זה נכיר את המחלקה `<BinNode<T`, נבין כיצד מייצגים עץ בינארי ונלמד פעולות בסיסיות כמו טרוורסות, הוספה וחיפוש.


<!-- Source: Boston University – Binary Tree notes -->
<!-- https://www.cs.bu.edu/courses/cs112/old/22spring/labs/lab11.html -->

## הגדרת עץ בינארי



עץ בינארי הוא מבנה נתונים שבו כל צומת מחזיק:

{: .leafify}
- ערך
- מצביע **Left**
- מצביע **Right**

אם לצומת אין ילד שמאלי או ימני אז המצביע המתאים הוא `null`. בראש העץ נמצא צומת השורש (root), וכל צומת יכול להוות שורש של תת‑עץ.


### מימוש מחלקת `<BinNode<T`


<details markdown="1">
<summary>מימוש אפשרי עם תכונת C# אמיתיות. (אסור לשימוש)</summary>

ב‑#C ניתן היה לממש מחלקה גנרית עבור עץ בינארי באופן הבא:

```csharp
public class BinNode<T>
{
    public T Value { get; set; }
    public BinNode<T> Left { get; set; }
    public BinNode<T> Right { get; set; }

    public BinNode(T value, BinNode<T> left = null, BinNode<T> right = null)
    {
        Value = value;
        Left = left;
        Right = right;
    }
}
```
</details>

**המימוש הרשמי שבו נשתמש** הוא זה:
<details markdown="1">
<summary>מימוש רשמי</summary>
אבל 

```csharp
public class BinNode<T>
{
    private T value;
    private BinNode<T> left;
    private BinNode<T> right;

    //-----------------------------------
    //constructors
    public BinNode(T value)
    {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    public BinNode(BinNode<T> left, T value, BinNode<T> right)
    {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    //-----------------------------------
    //getters
    public T GetValue()
    {
        return value;
    }
    public BinNode<T> GetLeft()
    {
        return this.left;
    }
    public BinNode<T> GetRight()
    {
        return this.right;
    }
    //-----------------------------------
    //setters
    public void SetValue(T value)
    {
        this.value = value;
    }
    public void SetLeft(BinNode<T> left)
    {
        this.left = left;
    }

    public void SetRight(BinNode<T> right)
    {
        this.right = right;
    }
    //-----------------------------------
    //returns true if this.left is not null, else returns false
    public bool HasLeft()
    {
        return (this.left != null);
    }
    //returns true if this.right is not null, else returns false
    public bool HasRight()
    {
        return (this.right != null);
    }
    //-----------------------------------
    //ToString
    public override string ToString()
    {
        return "(" + left + " " + value + " " + right + ")";
    }
}
```
</details>

ניתן לייצר עץ בינארי על ידי יצירת צמתים וחיבורם לילדי שמאל וימין. היעדר ילד מסומן בערך `null`, ונקרא **עלה**

### טרוורסות בסיסיות

קיימות שלוש דרכי מעבר עיקריות על עץ בינארי:

| אלגוריתם|  שם הטרוורסה  | Order |
| --- | --- | --- |
| בקר בצומת ⟵ עבור לעץ השמאלי ⟵ עבור לעץ הימני | **Preorder** | root, left, right |
| בקר בעץ השמאלי ⟵ בקר בצומת ⟵ בקר בעץ הימני | **Inorder** | left, root, right |
|בקר בעץ השמאלי ⟵ בקר בעץ הימני ⟵ בקר בצומת | **Postorder** |  left, right, root |
{: .table-rl}

```csharp
// טרוורסה Inorder ב‑#C
public static void Inorder<T>(BinNode<T> root)
{
    if (root == null)
        return;
    Inorder(root.GetLeft());
    Console.WriteLine(root.GetValue());
    Inorder(root.GetRight());
}
```

הקוד מדגים טרוורסה inorder: הוא עובר קודם לתת‑עץ שמאלי, מדפיס את הערך של הצומת ואז עובר לתת‑עץ ימני.

### דיאגרמה – עץ בינארי

<div class="mermaid">
graph TD
    A[8] --> B[3]
    A --> C[10]
    C ~~~ K[" "]
    C --> H[14]
    H ~~~ P[" "]
    H --> I[13]:::leaf
    B --> D[1]:::leaf
    B --> E[6]
    E --> F[4]:::leaf
    E --> G[7]:::leaf
    style K fill:none,stroke:none
    style P fill:none,stroke:none

</div>

בדוגמה זו כל צומת מחזיק ערך מספרי. צמתים משמאל קטנים מהשורש, וצמתים מימין גדולים – תכונה אופיינית לעצים בינאריים של חיפוש.

## פעולות שלא קיימות אך נחמד לכתוב עבור BinNode

| תפקיד | Method |
| --- | --- |
| מוסיף ערך חדש לעץ תוך שמירה על סדר (בעץ חיפוש בינארי) | `Insert(BinNode<T> root, T value)` |
|  מחפש ערך בעץ ומחזיר אמת אם נמצא |`bool Contains(BinNode<T> root, T value)` |
|  טרוורסה preorder – הדפסת הערכים בסדר root,left,right |`void Preorder(BinNode<T> root)` |
| טרוורסה inorder – הדפסת הערכים בסדר left,root,right | `void Inorder(BinNode<T> root)` |
| טרוורסה postorder – הדפסת הערכים בסדר left,right,root | `void Postorder(BinNode<T> root)` |
| מחזיר את גובה העץ (מספר הקצוות הארוך ביותר מהשורש לעלים) |  `int Height(BinNode<T> root)` |
{: .table-rl}

### דגשים לעבודה עם עצים

{: .subq}
א. עצים בינאריים של חיפוש דורשים שסדר ההכנסה ישמור על כך שכל ערך בצד השמאלי קטן מהשורש וכל ערך בצד הימני גדול ממנו.  

{: .subq}
ב. גובה עץ מאוזן הוא בערך $$log_2n$$, ולכן פעולות חיפוש והכנסה בעץ מאוזן הן $$O(log n)$$. אם העץ אינו מאוזן, פעולות אלו עלולות להתדרדר ל‑$$O(n)$$.  

{: .subq}
ג. ניתן להשתמש במחסנית או תור כדי לבצע טרוורסות בצורה איטרטיבית.  לא בטוח למה שמישהו יעשה כזה דבר

<details markdown="1">
<summary>טרוורסה איטרטיבית (בלי רקורסיה)</summary>

נראה כמה סוגים של טרוורסה איטרטיבית (בלי רקורסיה). למרות כל הדוגמאות - עדיף ברקורסיה.

1. טרוורסה ברוחב (Level-Order / BFS) בעזרת Queue
    הרעיון:
    שמים את השורש בתור, ואז כל פעם מוציאים חוליה מהתור, מדפיסים את הערך שלה, ומכניסים את ילדיה (שמאל, ימין) לסוף התור.

    ```csharp
    public static void BfsTraverse<T>(BinNode<T> root)
    {
        if (root == null)
            return;

        Queue<BinNode<T>> q = new Queue<BinNode<T>>();
        q.Insert(root); // מכניסים את השורש לתור

        while (!q.IsEmpty())
        {
            BinNode<T> node = q.Remove();   // מוציאים חוליה מהתור
            Console.WriteLine(node.GetValue());

            if (node.HasLeft())
                q.Insert(node.GetLeft());   // מכניסים בן שמאל
            if (node.HasRight())
                q.Insert(node.GetRight());  // מכניסים בן ימין
        }
    }
    ```

    זה עובר על העץ לפי שכבות: קודם שורש, אחר כך כל הילדים שלו, אחר כך הנכדים, וכו’.

    ---

2. טרוורסה בעומק (DFS Pre-Order) בעזרת Stack

    כאן נעשה Pre-Order (שורש → שמאל → ימין), אבל **איטרטיבי**.

    הרעיון:
    שמים את השורש במחסנית; כל פעם מוציאים חוליה מהמחסנית, מדפיסים אותה, ואז דוחפים קודם את הימני ואחר כך את השמאלי – כדי שהשמאלי ייצא ראשון.

    ```csharp
    public static void PreOrderIterative<T>(BinNode<T> root)
    {
        if (root == null)
            return;

        Stack<BinNode<T>> s = new Stack<BinNode<T>>();
        s.Push(root);

        while (!s.IsEmpty())
        {
            BinNode<T> node = s.Pop();
            Console.WriteLine(node.GetValue()); // "שורש"

            if (node.HasRight())
                s.Push(node.GetRight()); // דוחפים קודם ימין
            if (node.HasLeft())
                s.Push(node.GetLeft());  // ואז שמאל – ייצא ראשון
        }
    }
    ```

3. טרוורסה In-Order איטרטיבית בעזרת Stack

    In-Order קלאסי (שמאל → שורש → ימין):

    ```csharp
    public static void InOrderIterative<T>(BinNode<T> root)
    {
        Stack<BinNode<T>> s = new Stack<BinNode<T>>();
        BinNode<T> curr = root;

        while (curr != null || !s.IsEmpty())
        {
            while (curr != null)
            {
                s.Push(curr);
                curr = curr.GetLeft();  // יורדים שמאלה עד הסוף
            }

            curr = s.Pop();
            Console.WriteLine(curr.GetValue()); // שורש

            curr = curr.GetRight(); // עוברים לתת־עץ ימני
        }
    }
    ```

</details>



## תרגול וקישורים

**ממש אל תנסו** לממש פונקציות המחדירות ערך לעץ בינארי ושמירתו כעץ חיפוש. נסו לכתוב פונקציה שמחזירה את מספר העלים בעץ. תרגילים נוספים תוכלו למצוא במערכת ההגשות
