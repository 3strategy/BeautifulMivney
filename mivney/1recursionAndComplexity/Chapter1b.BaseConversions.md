---
layout: page
title: "רקורסיה - המרת בסיסים"
subtitle: "המרות בסיסים: מבסיס 10 לבסיס קטן/גדול יותר"
lang: he
mathjax: true
---



# 1) מעבר **מבסיס 10 לבסיס קטן יותר** (למשל: 2, 3, 8, 9)

## הרעיון
מיישמים **חלוקה חוזרת**: בכל צעד לוקחים את השארית $$(num \bmod b)$$ כספרה התחתונה, וממשיכים רקורסיבית עם $$( \lfloor num / b \rfloor )$$.  
בגרסה זו (שהחזרת) נבנה תוצאה **מספרית**: `num % b + 10 * recurse(...)`, ולכן מתאימה לבסיסים **≤10** בלבד.

{: .box-warning}
שימו לב: כאן מוחזר **int**. אם התוצאה בבסיס החדש היא, למשל, `"1101"` — הערך המוחזר יהיה המספר העשרוני `1101` (שמייצג את הרצף הספרתי).

## קוד C# — (בסיסים ≤ 10)
{% highlight csharp linenos %}
public static int ConvertFromBase10toLower(int num, int b)
{
    if (num == 0)
        return 0;

    return
        num % b + 10 * ConvertFromBase10toLower(num / b, b);
}
{% endhighlight %}

### דוגמאות שימוש (הדפסה בלבד)
{% highlight csharp linenos %}
// דוגמאות (תוצאה היא int עם ספרות הבסיס החדש)
Console.WriteLine(ConvertFromBase10toLower(13, 2)); // 1101
Console.WriteLine(ConvertFromBase10toLower(157, 3)); // 12212
Console.WriteLine(ConvertFromBase10toLower(86, 8)); // 126
{% endhighlight %}


<details markdown="1">
<summary>מעקב בשיטת המלבנים — ConvertFromBase10toLower(86, 8)</summary>

<div class="mermaid">
flowchart TD
X["ConvertFromBase10toLower(86, 8)
(86 == 0? false)
return 86 % 8 + 10 * Convert(86/8, 8)
= 6 + 10 * Convert(10, 8)"] --> Y["Y ConvertFromBase10toLower(10, 8)
(10 == 0? false)
return 10 % 8 + 10 * Convert(10/8, 8)
= 2 + 10 * Convert(1, 8)"]

Y --> Z["Z ConvertFromBase10toLower(1, 8)
(1 == 0? false)
return 1 % 8 + 10 * Convert(1/8, 8)
= 1 + 10 * Convert(0, 8)"]

Z --> W["W ConvertFromBase10toLower(0, 8)
(0 == 0? true)
return 0"]

W -.->|return: 0| Z
Z -.->|return: 1 + 10 * 0 = 1| Y
Y -.->|return: 2 + 10 * 1 = 12| X
X -.->|final result: 6 + 10 * 12 = 126| OUT(("126₈"))

</div>

</details>


<details markdown="1">
<summary>מעקב בשיטת המלבנים — ConvertFromBase10toLower(13, 2)</summary>

<div class="mermaid">
flowchart TD
A["ConvertFromBase10toLower(13,2)
(13 == 0? false)
return (13%2=1) + 10*Convert(6,2)"] -->|קריאה רקורסיבית| B["ConvertFromBase10toLower(6,2)
(6 == 0? false)
return (6%2=0) + 10*Convert(3,2)"]
B -->|קריאה רקורסיבית| C["ConvertFromBase10toLower(3,2)
(3 == 0? false)
return (3%2=1) + 10*Convert(1,2)"]
C -->|קריאה רקורסיבית| D["ConvertFromBase10toLower(1,2)
(1 == 0? false)
return (1%2=1) + 10*Convert(0,2)"]
D -->|קריאה רקורסיבית| E["ConvertFromBase10toLower(0,2)
(0 == 0? true)
return 0"]

E -.->|"חזרה: 0"| D
D -.->|"חזרה: 1 + 10*0 = 1"| C
C -.->|"חזרה: 1 + 10*1 = 11"| B
B -.->|"חזרה: 0 + 10*11 = 110"| A
A -.->|תוצאה: 1 + 10*110 = 1101| OUT(("ConvertFromBase10toLower(13,2) = 1101"))
</div>

</details>

---

# 2) מעבר **מבסיס 10 לבסיס ספירה גבוה יותר** (למשל: 11..36 — שימוש באותיות A..Z)

## הרעיון
אותו עיקרון חלוקה חוזרת, אבל הפלט הוא **מחרוזת**. הספרות מעל 9 מיוצגות באותיות:  
10→A, 11→B, …, 15→F (בבסיס 16), וכן הלאה עד 35→Z (בבסיס 36).

{: .box-success}
הפונקציה הבאה מתאימה גם לבסיסים נמוכים וגם לגבוהים: היא מחזירה `string` עם הספרות הנכונות, ומרכיבה את התוצאה משמאל באמצעות רקורסיה.


## קוד C# — לפי הבקשה (בסיסים גבוהים/כלליים)
{% highlight csharp linenos %}
public static string ConvertFromBase10(int num, int b)
{
    if (num == 0) 
        return "";

    int mod = num % b;
    char ch = (char)(mod + (mod < 10 ? '0' : 'A' - 10));
    return ConvertFromBase10(num / b, b) + ch;
}
{% endhighlight %}

### דוגמאות שימוש
{% highlight csharp linenos %}
// דוגמאות (תוצאה היא string; שימו לב למקרה 0)
string s1 = ConvertFromBase10(255, 16); // "FF"
string s2 = ConvertFromBase10(2025, 36); // "1HL"
string s3 = ConvertFromBase10(31, 32);   // "V"
string s0 = ConvertFromBase10(0, 16);    // ""  --> לשיקולכם להחזיר "0" חיצונית
{% endhighlight %}

<details markdown="1">
<summary>מעקב בשיטת המלבנים — ConvertFromBase10(255, 16)</summary>

<div class="mermaid">
flowchart TD
X["ConvertFromBase10(255,16)
(255 == 0? false)
mod=255%16=15 → ch='F'
return Convert(15,16) + 'F'"] --> Y["ConvertFromBase10(15,16)
(15 == 0? false)
mod=15%16=15 → ch='F'
return Convert(0,16) + 'F'"]

Y -->|קריאה רקורסיבית| Z["ConvertFromBase10(0,16)
(0 == 0? true)
return ''"]

Z -.->|"חזרה מחרוזת ריקה: ''"| Y

Y -.->|"חזרה: '' + 'F' = 'F'"| X

X -.->|"תוצאה: 'F' + 'F' = 'FF'"| OUT((""FF""))
</div>

</details>

---

## טיפים קצרים
- בשתי הפונקציות — הסדר הוא: **קודם** פותרים את תת-הבעיה על ידי חלקי-שלם (`num / b`), **אחר-כך** מוסיפים את ספרת השארית. וכך מתקבל הסדר הנכון.
- כשבסיס ≤ 10 ואינכם צריכים מחרוזת — `ConvertFromBase10toLower` היא קומפקטית ונוחה. כאשר רוצים תמיכה גם בבסיסים גבוהים — השתמשו ב־`ConvertFromBase10`.
- מומלץ להדגים בבסיס 2, 8, ו־16, ולהראות כיצד האותיות נוצרות אוטומטית מקוד ה־ASCII בשורה של יצירת `ch`.
