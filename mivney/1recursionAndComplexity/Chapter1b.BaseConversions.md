---
layout: page
title: "רקורסיה - המרת בסיסים"
subtitle: "המרות בסיסים: מבסיס 10 לבסיס קטן/גדול יותר"
lang: he
mathjax: true
---



## 1) מעבר **מבסיס 10 לבסיס קטן יותר** (למשל: 2, 3, 8)

### הרעיון
כאשר ממירים מספר עשרוני \(N\) לבסיס \(b\) קטן מ־10, משתמשים בשיטת "**חלוקה חוזרת**":  
בכל צעד מחלקים את \(N\) בבסיס \(b\), שומרים את ה**שארית** (שהיא הספרה התחתונה ביותר בבסיס החדש), וממשיכים עם המנה.  
את התוצאה מרכיבים **מלמעלה למטה** (כלומר מהקריאה האחרונה אחורה), ולכן רקורסיה מתאימה כאן במיוחד.

{: .box-success}
כלל אצבע:  
אם \(N < b\) — התוצאה היא ספרה יחידה: \(digit(N)\).  
אחרת — \(toBase(N,b) = toBase(\lfloor N/b \rfloor, b) \;+\; digit(N \bmod b)\).

### קוד C## (רקורסיבי, לבסיסים 2..9)
{% highlight csharp linenos %}
using System;

public static class BaseConvert
{
    // ספרות חוקיות עד בסיס 36 (נשתמש בחלק הראשון עבור בסיסים קטנים)
    private const string DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // ממיר N (עשרוני) לבסיס b ("קטן" = עד 9, לכן מספיקות ספרות 0..9)
    public static string ToBaseSmall(int n, int b)
    {
        if (n == 0) return "0";                                   // מקרה פינה שימושי
        return ToBaseSmallRec(n, b);
    }

    private static string ToBaseSmallRec(int n, int b)
    {
        if (n < b) return DIGITS[n].ToString();                   // בסיס רקורסיה
        return ToBaseSmallRec(n / b, b) + DIGITS[n % b];          // קריאה רקורסיבית + ספרת שארית
    }

    // דוגמה לשימוש
    public static void Main()
    {
        Console.WriteLine(ToBaseSmall(13, 2));  // 1101
        Console.WriteLine(ToBaseSmall(157, 3)); // 12212
        Console.WriteLine(ToBaseSmall(255, 8)); // 377
    }
}
{% endhighlight %}

<details markdown="1">
<summary>מעקב בשיטת המלבנים — ToBaseSmall(13, 2)</summary>

<div class="mermaid">
flowchart TD
A["ToBaseSmall(13,2)
(13 &lt; 2? false)
return ToBaseSmall(6,2) + D(1)"] -->|קריאה רקורסיבית| B["ToBaseSmall(6,2)
(6 &lt; 2? false)
return ToBaseSmall(3,2) + D(0)"]
B -->|קריאה רקורסיבית| C["ToBaseSmall(3,2)
(3 &lt; 2? false)
return ToBaseSmall(1,2) + D(1)"]
C -->|קריאה רקורסיבית| D["ToBaseSmall(1,2)
(1 &lt; 2? true)
return D(1) = "1""]

D -.->|"חזרה: "1""| C
C -.->|"חזרה: "11""| B
B -.->|"חזרה: "110""| A
A -.->|תוצאה: "1101"| OUT(("ToBaseSmall(13,2) = 1101"))
</div>

</details>

---

## 2) מעבר **מבסיס 10 לבסיס ספירה גבוה יותר** (למשל: 11..36 — בסיסים עם אותיות A..Z)

### הרעיון
אותו אלגוריתם בדיוק — חלוקה חוזרת — רק שכעת ספרות מעל 9 מסומנות באותיות:  
10→A, 11→B, …, 15→F (בבסיס 16), וכן הלאה עד 35→Z (בסיס 36).

{: .box-warning}
ודאו שהבסיס בטווח 2..36 ושיש לכם **מיפוי ספרות** מתאים. בקלט \(N=0\) החזירו `"0"`.

### קוד C## (כללי, 2..36)
{% highlight csharp linenos %}
using System;

public static class BaseConvertHi
{
    private const string DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static string ToBase(int n, int b)
    {
        if (n == 0) return "0";                           // כיסוי מקרה אפס
        return ToBaseRec(n, b);
    }

    private static string ToBaseRec(int n, int b)
    {
        if (n < b) return DIGITS[n].ToString();           // בסיס רקורסיה
        return ToBaseRec(n / b, b) + DIGITS[n % b];       // קריאה רקורסיבית + ספרת שארית
    }

    // דוגמה לשימוש
    public static void Main()
    {
        Console.WriteLine(ToBase(255, 16)); // FF
        Console.WriteLine(ToBase(2025, 36)); // 1HL
        Console.WriteLine(ToBase(31, 32));   // V
    }
}
{% endhighlight %}

<details markdown="1">
<summary>מעקב בשיטת המלבנים — ToBase(255, 16)</summary>

<div class="mermaid">
flowchart TD
X["ToBase(255,16)
(255 &lt; 16? false)
return ToBase(15,16) + D(15=F)"] -->|קריאה רקורסיבית| Y["ToBase(15,16)
(15 &lt; 16? true)
return D(15=F) = "F""]

Y -.->|"חזרה: "F""| X
X -.->|תוצאה: "FF"| OUT(("ToBase(255,16) = FF"))
</div>

</details>

---

### הערות הוראה קצרות
- רקורסיה "מרכיבה מלמעלה": קודם פותרים את תת-הבעיה \(N/b\) ואז מוסיפים למטה את ספרת \(N \bmod b\).  
- בגישה איטרטיבית (ערמה של שאריות) מקבלים את הספרות **מהסוף להתחלה** ולכן מפכים את המחרוזת בסוף.
- עבור תלמידים — התחילו בבסיס 2 ו־8; עברו לבסיס 16 עם טבלת מיפוי ספרות→אותיות.

<details markdown="1">
<summary>נספח: גרסה איטרטיבית קצרה (אופציונלי)</summary>

{% highlight csharp linenos %}
public static string ToBaseIter(int n, int b)
{
    if (n == 0) return "0";
    const string DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = "";
    while (n > 0) { s = DIGITS[n % b] + s; n /= b; } // צוברים משמאל
    return s;
}
{% endhighlight %}

</details>
