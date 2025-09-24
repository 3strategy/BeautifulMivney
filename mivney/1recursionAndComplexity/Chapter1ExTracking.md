---
layout: page
title: "טענות יציאה בפעולות רקורסיביות"
subtitle: "מציאת מטרת הפונקציה (מה הפעולה עושה)"
tags: [מטרת הפונקציה, טענת יציאה, מה הפעולה עושה]
mathjax: true
lang: he
---


{: .box-note}
**שימו לב:** בכל אחת מהפעולות שלפניכם, יש לזהות את *טענת היציאה*. הכוונה היא למצוא מה הפעולה עושה. מה מטרת. תשובה נכונה אינה מתארת את השלבים, אלא מתייחסת רק למהות התוצאה המתקבלת

{: .box-warning}
**עקבו בשיטת המלבנים על קלט קצר ופשוט**, כדי שהמספר הכולל של הקריאות לא יהיה גבוה מדי.

---

### פעולה 1
```csharp
public static void Mystery(char ch, int n) 
{ 
    if (n > 0) 
    { 
        Console.Write(ch); 
        Mystery(ch, n-1); 
    } 
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

---

### פעולה 2
```csharp
public static int Mystery(int a, int b) 
{ 
    if (a < b) 
        return 0;
    else 
        return 1 + Mystery(a - b, b); 
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

---

### פעולה 3
```csharp
public static int Mystery(int n) 
{ 
    if (n < 10) 
        return n;
    else 
    { 
        int x = n % 10; 
        int y = Mystery(n / 10);  
        if (x > y) 
            return x; 
        else 
            return y; 
    } 
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

---

### פעולה 4
```csharp
public static int Mystery(int num) 
{ 
    if (num == 1) 
        return 1;
    else 
        return Mystery(num - 1) + 2 * num - 1;   
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מהפעולה עושה?)*

---

### פעולה 5
```csharp
public static float Mystery(int[] a, int k) 
{  
    float x; 

    if (k == 1) 
        return a[0]; 

    x = Mystery(a, k-1) * (k-1); 
    return (a[k-1] + x) / k; 
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

---

### פעולה 6
```csharp
public static int Mystery(int num) 
{  
    if (num < 10) 
        return num;
    else 
    { 
        int i = 10; 
        while (num % i != num) 
            i *= 10; 

        return ((num % 10) * i / 10) + Mystery(num / 10); 
    }    
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

---

### פעולה 7
```csharp
public static int Mystery(int a, int b)  
{ 
    if (b == 0)           
        return 0; 

    if (b % 2 == 0)  
        return Mystery(a + a, b / 2);                

    return Mystery(a + a, b / 2) + a; 
}
```
**טענת יציאה:** ? *(מה מטרת הפונקציה / מה הפעולה עושה?)*

