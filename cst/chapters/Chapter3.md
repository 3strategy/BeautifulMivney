---
layout: page 
title: "פרק 3 – מחלקת Node⟨T⟩ – רשימות מקושרות"
subtitle: "מבנה חוליות, חיבור חוליות וג'נריקס"
tags: [Node,Bea, רשימה מקושרת, ג'נריקס, חוליות,Generics, רשימת מחרוזות, מבנה נתונים]
mathjax: true
lang: he
---

{: .box-note}
רשימה מקושרת בנויה מחוליות (Node) שכל אחד מהם מחזיק ערך ומצביע לחוליה הבא. בפרק זה נעמיק ב‑NodeInt (או במקרה שלנו שרשרת חרוזים Bead) ובמחלקה הכללית `<Node<T`, ונלמד להשתמש בג'נריקס לקריאת מבני נתונים גמישים.


<!-- Source: University of Washington – Linked lists lecture; UF C# Data Structures course -->

## מבוא לרשימות מקושרות

<details markdown="1">
<summary>מהי חוליה (Node)?</summary>

בגרסה הפשוטה ביותר, חוליה ברשימה מקושרת מכיל שני דברים: נתון (value) ומצביע (next) לחוליה הבאה. כאשר החוליה היא האחרונה ברשימה, המשך הרשימה הוא **null**, הרשימה מסתיימת. כך ניתן להוסיף או להסיר חוליות מבלי להזיז את שאר האיברים כמו במערך.

</details>

### דיאגרמה – רשימה מקושרת

<div class="mermaid">
flowchart LR
    subgraph A[" "]
        A1["value: 5"]
        A2["next"]
    end
    subgraph B[" "]
        B1["value: 7"]
        B2["next"]
    end
    subgraph C[" "]
        C1["value: 12"]
        C2["next"]
    end
    subgraph D[" "]
        D1["value: 20"]
        D2["null"]
    end

    A2 --> B
    B2 --> C
    C2 --> D
    head -->A
</div>

<details open markdown="1">
<summary>מהי המחלקה Bead?</summary>
### Bead – שרשרת חוליות מטיפוס מחרוזת

במימוש הפרטי שלנו יש מחלקה בשם בשם **Bead** המקשרת בין מחרוזות. המחלקה מספקת את התכונות הבאות:

|  תיאור בעברית |Method |
| --- | --- |
| קונסטרוקטור ליצירת חוליה עם ערך מחרוזת והפניה לחוליה הבאה | `Bead(string value, Bead next)` |
| מחזירה את הערך השמור בחוליה | `()string GetColor` |
| מחזירה את החוליה הבאה | `()Bead GetNextBead` |
| מחזירה מחרוזת המייצגת את שרשרת החוליות מתחילת הרשימה | `()override string ToString` |
{: .table-rl}

בחוליה מטיפוס **Bead** ניתן לשנות את הקישור לחוליה הבא באמצעות `SetNext`, להוסיף חוליה חדשה בראש הרשימה על ידי יצירת חוליה חדשה שהמצביע שלה מצביע לראש הקודם, או להסיר חוליה על ידי דילוג עליה בהגדרת המצביע. בגלל שאין לנו גישה ישירה לאינדקסים, יש לשמור מצביע לראש הרשימה בכל זמן.


#### ניעזר בפעולות אלו וננסה להגדיר יחד שרשרת חרוזים 
- [⬅ עברו לתרגיל 3a0.2 יצירת שרשרת של 3 חרוזים]({% link cst/3nodeNbead/Ex3a0beads.md %}#id3a0.1)

#### ננסה להוסיף לסוף השרשרת צבע נוסף


##### ניצור חרוזים ממערך מחרוזות
- [⬅ עברו לתרגיל 3a0.2 יצירת חרוזים ממערך]({% link cst/3nodeNbead/Ex3a0beads.md %}#id3a0.2)

</details>

<details markdown="1">
<summary>מהי חוליה (NodeInt)?</summary>
### NodeInt – שרשרת שלמים

במימוש הפרטי שלנו יש מחלקה בשם **NodeInt** המקשרת בין שלמים. המחלקה מספקת את התכונות הבאות:

|  תיאור בעברית |Method |
| --- | --- |
| קונסטרוקטור ליצירת חוליה עם ערך מחרוזת והפניה לחוליה הבאה | `NodeInt(int value, NodeInt next)` |
| מחזירה את הערך השמור בחוליה | `()int GetValue` |
| מחזירה את החוליה הבאה | `()NodeInt GetNext` |
| משנה את החוליה הבאה לחוליה נתונה | `void SetNext(NodeInt next)` |
| מחזירה מחרוזת המייצגת את שרשרת החוליות מתחילת הרשימה | `()override string ToString` |
{: .table-rl}

בחוליה מטיפוס **NodeInt** ניתן לשנות את הקישור לחוליה הבאה באמצעות `SetNext`, להוסיף חוליה חדשה בראש הרשימה על ידי יצירת חוליה חדשה שהמצביע שלה מצביע לראש הקודם, או להסיר חוליה על ידי דילוג עליה בהגדרת המצביע. בגלל שאין לנו גישה ישירה לאינדקסים, יש לשמור מצביעה לראש הרשימה בכל זמן.

</details>


### ג'נריקס – `<Node<T`

במקום לעבוד רק עם מחרוזות, אנו עושים שימוש במחלקה **`<Node<T`** שמחזיקה משתנה מטיפוס כללי `T`. גישה זו מאפשרת לשמור כל טיפוס אובייקט ברשימה מבלי לכתוב קוד נפרד לכל טיפוס. להלן המימוש הרשמי של המחלקה ב-Unit4:

```csharp
public class Node<T>
{
    private T value;
    private Node<T> next;

    //-----------------------------------
    //constructors
    public Node(T value)
    {
        this.value = value;
        this.next = null;
    }
    public Node(T value, Node<T> next)
    {
        this.value = value;
        this.next = next;
    }
    //-----------------------------------
    //getters
    public T GetValue()
    {
        return this.value;
    }
    public Node<T> GetNext()
    {
        return this.next;
    }
    //-----------------------------------
    //setters
    public void SetValue(T value)
    {
        this.value = value;
    }
    public void SetNext(Node<T> next)
    {
        this.next = next;
    }
    //-----------------------------------
    //return true if this.next is not null, else returns false
    public bool HasNext()
    {
        return (this.next != null);
    }
    //-----------------------------------
    //ToString
    public override string ToString()
    {
        return value + "," + next;
    }
}

// שימוש במחלקה
Student first = new Student("Alice", 90);
Node<Student> head = new Node<Student>(first);
head.Next = new Node<Student>(new Student("Bob", 75));
```

המחלקה מוגדרת כך שהערך מטיפוס `T` ואנו יכולים להגדיר טיפוס אחר לכל רשימה. בעזרת ג'נריקס ניתן להשתמש במחלקה מבלי לדעת מראש מהו טיפוס הנתונים.

### דיאגרמה – רשימה מקושרת

<div class="mermaid">
graph LR
    A([ראש]) --> B[Node< T >: Value1]
    B --> C[Node< T >: Value2]
    C --> D[Node< T >: Value3]
    D --> E([null])
</div>

הדיאגרמה מתארת רשימה מקושרת שבה כל חוליה מצביעה לחוליה הבא, והחוליה האחרונה מצביעה ל‑null.


<details markdown="1">
<summary>מה אין לנו</summary>

## פעולות נפוצות (שאין לנו!) על רשימה מקושרת

הנה רשימה של פעולות שמחלקות `NodeInt` ו‑**`<Node<T`** לא תומכות בהן. כל פעולה מוצגת באנגלית ובפירוש בעברית (nice to have but we don't have😀).

| Methods we DO NOT have <br/>but could write😀 | תפקיד |
| --- | --- |
| מוסיפה חוליה עם ערך חדשה לסוף הרשימה | `Append(Node<T> head, T value)` |
|מוסיפה חוליה חדשה לראש הרשימה ומעדכן את הראש | `Prepend(ref Node<T> head, T value)` | 
| מחזירה את מספר החוליות ברשימה | `int Count(Node<T> head)` |
| בודקת אם ערך קיים ברשימה | `bool Contains(Node<T> head, T value)` |
|מסירה את החוליה הראשונה בעלת ערך נתון ומחזירה את הראש המעודכן | `Node<T> Remove(Node<T> head, T value)` | 
|מוסיפה חוליה חדשה לאחר חוליה נתון | `void InsertAfter(Node<T> node, T value)` | 
{: .table-rl}

</details>

### דגשים לג'נריקס

{: .subq}
א. המימוש שלנו משתמש בג'נריקס לקריאה וכתיבה של חוליות עם כל טיפוס נתונים מבלי להגדיר מחלקה חדשה.  

{: .subq}
ב. אתם עדיין **לא** נדרשים לכתוב מחלקות גנריות משלכם; מטרת הפרק היא ללמוד להשתמש בהן.  

{: .subq}
ג. שימו לב ששימוש במצביע שאינו מאותחל (`null`) עלול לגרום לחריגת `NullReferenceException`.  

## תרגול וקישורים

נסו לממש מספר מתודות על רשימה מקושרת ולהשתמש בג'נריקס. בנוסף, תוכלו למצוא תרגילים בעמודי התרגול הבאים:


- [⬅ עברו לתרגיל 3a1.2 מחלקת Node בסיסית. בניית שרשרת מ-1 עד n]({% link cst/3nodeT/Ex3a1node.md %}#id3a1.2)
- [⬅ עברו לתרגיל כמות הזוגיים 3a2.6]({% link cst/3nodeT/Ex3a2node.md %}#id3a2.6)
- [⬅ עברו לתרגיל שרשרת המוכלת בשרשרת אחרת]({% link cst/3nodeT/Ex3a3node.md %}#id3a3.3)

<details markdown="1">
<summary>מקום לפתרון</summary>

כתבו פונקציה שמקבלת ראש של רשימה מקושרת ומחזירהה רשימה חדשה המכילה את אותה רשימה אך בסדר הפוך (reverse). השתמשו בג'נריקס.

</details>
