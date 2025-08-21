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

### הגדרת עץ בינארי

<details markdown="1">
<summary>מהו עץ בינארי?</summary>

עץ בינארי הוא מבנה נתונים שבו כל צומת מחזיק ערך ושני מצביעים: **Left** ו‑**Right**. אם לצומת אין ילד שמאלי או ימני אז המצביע המתאים הוא `null`. בראש העץ נמצא צומת השורש (root), וכל צומת יכול להוות שורש של תת‑עץ.

</details>

#### מימוש מחלקת `<BinNode<T`

ב‑#C ניתן לממש מחלקה גנרית עבור עץ בינארי באופן הבא:

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

אבל **המימוש הרשמי שבו נשתמש** הוא זה:

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


ניתן לייצר עץ בינארי על ידי יצירת צמתים וחיבורם לילדי שמאל וימין. היעדר ילד מסומן בערך `null`.

#### טרוורסות בסיסיות

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
    Inorder(root.Left);
    Console.WriteLine(root.Value);
    Inorder(root.Right);
}
```

הקוד מדגים טרוורסה inorder: הוא עובר קודם לתת‑עץ שמאלי, מדפיס את הערך של הצומת ואז עובר לתת‑עץ ימני.

#### דיאגרמה – עץ בינארי

<div class="mermaid">
graph TD
    A[8] --> B[3]
    A --> C[10]
    C ~~~ K[" "]
    C --> H[14]
    H ~~~ P[" "]
    H --> I[13]
    B --> D[1]
    B --> E[6]
    E --> F[4]
    E --> G[7]
    style K fill:none,stroke:none
    style P fill:none,stroke:none

</div>

בדוגמה זו כל צומת מחזיק ערך מספרי. צמתים משמאל קטנים מהשורש, וצמתים מימין גדולים – תכונה אופיינית לעצים בינאריים של חיפוש.

### פעולות שלא קיימות אך נחמד לכתוב עבור BinNode

| תפקיד | Method |
| --- | --- |
| מוסיף ערך חדש לעץ תוך שמירה על סדר (בעץ חיפוש בינארי) | `Insert(BinNode<T> root, T value)` |
|  מחפש ערך בעץ ומחזיר אמת אם נמצא |`bool Contains(BinNode<T> root, T value)` |
|  טרוורסה preorder – הדפסת הערכים בסדר root,left,right |`void Preorder(BinNode<T> root)` |
| טרוורסה inorder – הדפסת הערכים בסדר left,root,right | `void Inorder(BinNode<T> root)` |
| טרוורסה postorder – הדפסת הערכים בסדר left,right,root | `void Postorder(BinNode<T> root)` |
| מחזיר את גובה העץ (מספר הקצוות הארוך ביותר מהשורש לעלים) |  `int Height(BinNode<T> root)` |
{: .table-rl}

#### דגשים לעבודה עם עצים

{: .subq}
א. עצים בינאריים של חיפוש דורשים שסדר ההכנסה ישמור על כך שכל ערך בצד השמאלי קטן מהשורש וכל ערך בצד הימני גדול ממנו.  
{: .subq}
ב. גובה עץ מאוזן הוא בערך \(\log_2 n\), ולכן פעולות חיפוש והכנסה בעץ מאוזן הן O(log n). אם העץ אינו מאוזן, פעולות אלו עלולות לרדת ל‑O(n).  
{: .subq}
ג. ניתן להשתמש במחסנית או תור כדי לבצע טרוורסות בצורה איטרטיבית.  

### תרגול וקישורים

נסו לממש פונקציות המחדירות ערך לעץ בינארי ושמירתו כעץ חיפוש. נסו גם לכתוב פונקציה שמחזירה את מספר העלים בעץ. תרגילים נוספים תוכלו למצוא בקישורים הבאים:

- [⬅ עברו לתרגיל עץ בינארי בסיסי]({% link cst/6binnode/Ex6a1binnode.md %}#id6a1.3)
- [⬅ עברו לתרגיל הוספה בעץ]({% link cst/6binnode/Ex6a2binnode.md %}#id6a2.2)
- [⬅ עברו לתרגיל חיפוש בעץ]({% link cst/6binnode/Ex6a3binnode.md %}#id6a3.5)

<details markdown="1">
<summary>מקום לפתרון</summary>

כתבו פונקציה שמחזירה את סכום הערכים בכל הצמתים בעץ בינארי. השתמשו ברקורסיה לביקור בכל צומת.

</details>
