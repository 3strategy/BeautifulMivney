---
layout: page
title: "מפת הלוגיקה של שאלוני קוד"
subtitle: "אילו הבחנות חוזרות שוב ושוב בשאלות על הורשה ופולימורפיזם"
tags: [פולימורפיזם, שאלונים, override, overloading, hiding, casting, OOP]
mathjax: true
lang: he
---

{: .box-success}
לאחר מעבר על שאלוני הקוד שב-`interactive/` חוזרות כמעט תמיד אותן תחנות החלטה. מי שפותר לפי סדר קבוע לא נופל בקלות במלכודות של `override`, `overload`, `new`, `cast`, ו-`protected`.

## שלושת החוקים שפותחים כל שאלה

1. קודם מזהים את **הטיפוס המוצהר** של המשתנה שעליו קוראים לפעולה.
2. אחר כך מזהים את **הטיפוס בזכרון** של האובייקט בפועל.
3. רק אז מחליטים האם מדובר ב-`overload`, ב-`override`, ב-`hiding`, ב-`cast`, או בכלל בשגיאת קומפילציה עוד לפני זמן הריצה.

{: .box-warning}
הטעות הכי נפוצה היא לדלג ישר לטיפוס בזכרון. זה מותר רק אחרי שהקומפיילר כבר מצא חתימה חוקית על פי הטיפוס המוצהר.

## הקטגוריות שחוזרות בשאלונים

{: .table-he}

| קטגוריה | מה צריך לבדוק | מה בדרך כלל קובע את התשובה |
| --- | --- | --- |
| טיפוס מוצהר מול טיפוס בזכרון | מי המשתנה שעליו קוראים לפעולה, ועל איזה אובייקט הוא מצביע בפועל | קומפילציה לפי הטיפוס המוצהר, פולימורפיזם בזמן ריצה לפי הטיפוס בזכרון |
| התאמת חתימה | האם בכלל קיימת פעולה עם אותו שם ועם פרמטרים מתאימים | אם אין חתימה מתאימה, נעצרים עם שגיאת קומפילציה |
| `overload` | אותו שם פעולה, חתימות שונות | הבחירה נעשית בזמן קומפילציה לפי הטיפוסים המוצהרים של הארגומנטים |
| `override` | אותה חתימה בדיוק, בשרשרת `virtual`/`override` | אחרי שנבחרה החתימה, ההפעלה נקבעת לפי הטיפוס בזכרון |
| `hiding` עם `new` | שם זהה, אבל אין דריסה אלא הסתרה | אין כאן פולימורפיזם דינמי; מה שייקרא תלוי במה שרואים דרך הטיפוס המוצהר |
| `cast` והשמה | האם ההמרה מותרת תחבירית, והאם האובייקט בפועל מתאים לה | המרה יכולה להתקמפל אבל להיכשל בזמן ריצה עם `InvalidCastException` |
| הרשאות גישה | `private`, `protected`, `public` | לעתים השאלה נופלת כבר בקומפילציה כי החבר לא נגיש |
| בנאים וסדר אתחול | מי קורא ל-`base(...)`, מתי משתנים מאותחלים | חשוב במיוחד כשבנאי של האב קורא לפעולה וירטואלית או כששדות מקבלים ערך דרך שרשרת בנאים |
| שגיאות זמן ריצה נוספות | `null`, מערכים קו-וריאנטיים, גישה לעצם לא מתאים | הקוד מתקמפל, אבל נופל רק בזמן הרצה |


<div style="direction: ltr !important; text-align: left !important;">

<svg width="100%" viewBox="0 0 680 522.83" role="img" xmlns="http://www.w3.org/2000/svg">
  <title style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">המרה שמתקמפלת אך נכשלת בזמן ריצה</title>
  <desc style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">הדגמה של InvalidCastException כאשר B יורש מ-A</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- CASE 1: OK -->
  <text x="170" y="28" text-anchor="middle" font-weight="500" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:500;text-anchor:middle;dominant-baseline:auto">✓ עובד</text>

  <!-- Stack box -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="30" y="38" width="130" height="44" rx="8" stroke-width="0.5" style="fill:rgb(241, 239, 232);stroke:rgb(95, 94, 90);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="95" y="54" text-anchor="middle" dominant-baseline="central" style="fill:rgb(68, 68, 65);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A obj</text>
    <text x="95" y="70" text-anchor="middle" dominant-baseline="central" style="fill:rgb(95, 94, 90);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">= new B()</text>
  </g>

  <!-- Arrow -->
  <line x1="162" y1="60" x2="194" y2="60" marker-end="url(#arrow)" stroke="#1D9E75" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Heap object -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="196" y="38" width="100" height="44" rx="8" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(15, 110, 86);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="246" y="54" text-anchor="middle" dominant-baseline="central" style="fill:rgb(8, 80, 65);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">אובייקט B</text>
    <text x="246" y="70" text-anchor="middle" dominant-baseline="central" style="fill:rgb(15, 110, 86);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">בזמן ריצה</text>
  </g>

  <!-- Cast code -->
  <rect x="30" y="96" width="266" height="36" rx="6" fill="none" stroke="var(--color-border-tertiary)" stroke-width="0.5" style="fill:none;stroke:rgba(31, 30, 29, 0.15);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="46" y="118" font-family="var(--font-mono)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">B b = (B)obj;</text>
  <text x="200" y="118" fill="#1D9E75" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">// ✓ מצליח</text>

  <!-- Result -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="30" y="144" width="266" height="34" rx="6" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(15, 110, 86);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="163" y="161" text-anchor="middle" dominant-baseline="central" style="fill:rgb(8, 80, 65);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">obj הוא B — המרה תקינה</text>
  </g>

  <!-- Divider -->
  <line x1="340" y1="20" x2="340" y2="200" stroke="var(--color-border-tertiary)" stroke-width="0.5" stroke-dasharray="4 4" style="fill:rgb(0, 0, 0);stroke:rgba(31, 30, 29, 0.15);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- CASE 2: Fails -->
  <text x="510" y="28" text-anchor="middle" font-weight="500" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:500;text-anchor:middle;dominant-baseline:auto">✗ נכשל בזמן ריצה</text>

  <!-- Stack box -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="360" y="38" width="130" height="44" rx="8" stroke-width="0.5" style="fill:rgb(241, 239, 232);stroke:rgb(95, 94, 90);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="425" y="54" text-anchor="middle" dominant-baseline="central" style="fill:rgb(68, 68, 65);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A obj</text>
    <text x="425" y="70" text-anchor="middle" dominant-baseline="central" style="fill:rgb(95, 94, 90);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">= new A()</text>
  </g>

  <!-- Arrow -->
  <line x1="492" y1="60" x2="524" y2="60" marker-end="url(#arrow)" stroke="#E24B4A" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Heap object — NOT B -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="526" y="38" width="110" height="44" rx="8" stroke-width="0.5" style="fill:rgb(250, 236, 231);stroke:rgb(153, 60, 29);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="581" y="54" text-anchor="middle" dominant-baseline="central" style="fill:rgb(113, 43, 19);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">אובייקט A</text>
    <text x="581" y="70" text-anchor="middle" dominant-baseline="central" style="fill:rgb(153, 60, 29);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">בזמן ריצה</text>
  </g>

  <!-- Cast code -->
  <rect x="360" y="96" width="276" height="36" rx="6" fill="none" stroke="var(--color-border-tertiary)" stroke-width="0.5" style="fill:none;stroke:rgba(31, 30, 29, 0.15);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="376" y="118" font-family="var(--font-mono)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">B b = (B)obj;</text>
  <text x="500" y="118" fill="#E24B4A" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">// מתקמפל ✓</text>

  <!-- Result -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="360" y="144" width="276" height="34" rx="6" stroke-width="0.5" style="fill:rgb(252, 235, 235);stroke:rgb(163, 45, 45);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="498" y="161" text-anchor="middle" dominant-baseline="central" style="fill:rgb(121, 31, 31);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">InvalidCastException ✗</text>
  </g>

  <!-- ===== WHY section ===== -->
  <rect x="30" y="210" width="620" height="1" fill="var(--color-border-tertiary)" style="fill:rgba(31, 30, 29, 0.15);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="340" y="236" text-anchor="middle" style="fill:rgb(20, 20, 19);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:auto">למה המהדר מאשר?</text>

  <!-- Inheritance tree -->
  <!-- A box -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="278" y="254" width="124" height="40" rx="8" stroke-width="0.5" style="fill:rgb(238, 237, 254);stroke:rgb(83, 74, 183);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="340" y="274" text-anchor="middle" dominant-baseline="central" style="fill:rgb(60, 52, 137);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A (הורה)</text>
  </g>

  <!-- Arrow down to B -->
  <line x1="310" y1="294" x2="270" y2="334" marker-end="url(#arrow)" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <!-- Arrow down to C -->
  <line x1="370" y1="294" x2="420" y2="334" marker-end="url(#arrow)" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- B box -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="210" y="336" width="100" height="40" rx="8" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(15, 110, 86);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="260" y="356" text-anchor="middle" dominant-baseline="central" style="fill:rgb(8, 80, 65);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">B (ילד)</text>
  </g>

  <!-- C box — another child -->
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="370" y="336" width="100" height="40" rx="8" stroke-width="0.5" style="fill:rgb(250, 238, 218);stroke:rgb(133, 79, 11);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="420" y="356" text-anchor="middle" dominant-baseline="central" style="fill:rgb(99, 56, 6);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">C (ילד)</text>
  </g>

  <!-- Explanation -->
  <text x="340" y="408" text-anchor="middle" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">משתנה מטיפוס A יכול להצביע על A, B, או C —</text>
  <text x="340" y="426" text-anchor="middle" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">המהדר לא יודע מה האובייקט האמיתי, אז הוא מאשר את ההמרה ל-B.</text>
  <text x="340" y="446" text-anchor="middle" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">רק CLR בזמן ריצה בודק: האם האובייקט הוא באמת B?</text>

  <!-- Safe alternatives -->
  <rect x="30" y="468" width="620" height="1" fill="var(--color-border-tertiary)" style="fill:rgba(31, 30, 29, 0.15);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="340" y="490" text-anchor="middle" style="fill:rgb(20, 20, 19);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:auto">פתרונות בטוחים</text>
  <text x="130" y="510" text-anchor="middle" font-family="var(--font-mono)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">b is B</text>
  <text x="280" y="510" text-anchor="middle" font-family="var(--font-mono)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">obj as B</text>
  <text x="470" y="510" text-anchor="middle" font-family="var(--font-mono)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">if (obj is B b) { ... }</text>
</svg>
</div>

## סדר פתרון מומלץ בבחינה

1. סמנו ליד כל משתנה את **הטיפוס המוצהר** ואת **הטיפוס בזכרון**.
2. אם יש `cast`, בדקו קודם אם הוא חוקי תחבירית, ואז האם הוא באמת יכול להצליח בזמן ריצה.
3. חפשו רק פעולות שהטיפוס המוצהר מכיר: המחלקה של המשתנה והאבות שלה.
4. בחרו חתימה מתאימה. זהו שלב של `overload`, ולכן הוא עדיין שלב קומפילציה.
5. אם הפעולה שנבחרה היא `virtual`/`override`, עברו לטיפוס בזכרון כדי להחליט איזו גרסה תרוץ.
6. אם הפעולה שנבחרה אינה וירטואלית, או שמדובר ב-`new`, הישארו עם הטיפוס המוצהר.
7. רק בסוף חשבו על הפלט, על ערכי השדות, ועל שגיאות זמן ריצה אפשריות.

### צורת רישום

<svg width="100%" viewBox="0 0 680 180" role="img" xmlns="http://www.w3.org/2000/svg">
  <title style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">Variable to heap object memory diagram</title>
  <desc style="fill:rgb(0, 0, 0);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">Declared type variable with circle label pointing to runtime object with type circle and property values</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  

  <!-- ── EXAMPLE 1: A a1 = new A() ── -->
  <text x="185" y="26" text-anchor="middle" font-family="var(--font-mono,monospace)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">A  a1  =  new A() { x = -1 }</text>

  <!-- VAR box: a1 — circle drawn first, rect covers its bottom half -->
  <circle cx="66" cy="86" r="20" stroke-width="0.5" style="fill:rgb(250, 238, 218);stroke:rgb(186, 117, 23);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="30" y="96" width="72" height="36" rx="6" stroke-width="0.5" style="fill:rgb(245, 244, 237);stroke:rgba(31, 30, 29, 0.4);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="66" y="86" text-anchor="middle" dominant-baseline="central" style="fill:rgb(99, 56, 6);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A</text>
  <text x="66" y="114" text-anchor="middle" dominant-baseline="central" style="fill:rgb(20, 20, 19);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:400;text-anchor:middle;dominant-baseline:central">a1</text>

  <!-- Arrow -->
  <line x1="103" y1="114" x2="162" y2="114" marker-end="url(#arrow)" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- HEAP OBJECT: actual type A -->
  <circle cx="230" cy="86" r="20" stroke-width="0.5" style="fill:rgb(250, 238, 218);stroke:rgb(186, 117, 23);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="164" y="96" width="132" height="64" rx="6" stroke-width="0.5" style="fill:rgb(245, 244, 237);stroke:rgba(31, 30, 29, 0.4);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="230" y="86" text-anchor="middle" dominant-baseline="central" style="fill:rgb(99, 56, 6);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A</text>
  <text x="178" y="132" dominant-baseline="central" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:central">x</text>
  <rect x="196" y="120" width="84" height="24" rx="3" stroke-width="0.5" style="fill:rgb(255, 255, 255);stroke:rgba(31, 30, 29, 0.3);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="238" y="132" text-anchor="middle" dominant-baseline="central" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">1-</text>

  <!-- Divider -->
  <line x1="340" y1="14" x2="340" y2="168" stroke="var(--color-border-tertiary)" stroke-width="0.5" stroke-dasharray="4 3" style="fill:rgb(0, 0, 0);stroke:rgba(31, 30, 29, 0.15);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-dasharray:4px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── EXAMPLE 2: A a2 = new B() ── -->
  <text x="510" y="26" text-anchor="middle" font-family="var(--font-mono,monospace)" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:ui-monospace, monospace;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:auto">A  a2  =  new B() { x = 99 }</text>

  <!-- VAR box: a2, declared type A -->
  <circle cx="386" cy="86" r="20" stroke-width="0.5" style="fill:rgb(250, 238, 218);stroke:rgb(186, 117, 23);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="350" y="96" width="72" height="36" rx="6" stroke-width="0.5" style="fill:rgb(245, 244, 237);stroke:rgba(31, 30, 29, 0.4);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="386" y="86" text-anchor="middle" dominant-baseline="central" style="fill:rgb(99, 56, 6);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">A</text>
  <text x="386" y="114" text-anchor="middle" dominant-baseline="central" style="fill:rgb(20, 20, 19);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:400;text-anchor:middle;dominant-baseline:central">a2</text>

  <!-- Arrow -->
  <line x1="423" y1="114" x2="482" y2="114" marker-end="url(#arrow)" style="fill:none;stroke:rgb(115, 114, 108);color:rgb(0, 0, 0);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- HEAP OBJECT: actual type B (teal = different type) -->
  <circle cx="549" cy="86" r="20" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(29, 158, 117);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="484" y="96" width="150" height="64" rx="6" stroke-width="0.5" style="fill:rgb(245, 244, 237);stroke:rgba(31, 30, 29, 0.4);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="549" y="86" text-anchor="middle" dominant-baseline="central" style="fill:rgb(15, 110, 86);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">B</text>
  <text x="498" y="132" dominant-baseline="central" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:central">x</text>
  <rect x="516" y="120" width="100" height="24" rx="3" stroke-width="0.5" style="fill:rgb(255, 255, 255);stroke:rgba(31, 30, 29, 0.3);color:rgb(0, 0, 0);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="566" y="132" text-anchor="middle" dominant-baseline="central" style="fill:rgb(61, 61, 58);stroke:none;color:rgb(0, 0, 0);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">99</text>
</svg>

## מלכודות קלאסיות מן השאלונים

{: .box-error}
משפטים שגויים שתלמידים אומרים לעצמם:

- "אם האובייקט בזכרון הוא `Beaver`, תמיד תרוץ פעולה של `Beaver`". לא נכון. קודם צריך שהחתימה תיבחר בכלל דרך הטיפוס המוצהר.
- "`new` זה כמו `override`". לא נכון. `new` מסתיר; הוא לא ממשיך את שרשרת הדריסה.
- "`cast` משנה את האובייקט בזכרון". לא נכון. `cast` משנה את מה שהקומפיילר והרץ מתייחסים אליו, אבל לא יוצר אובייקט חדש ולא מחליף טיפוס אמיתי.
- "אם יש `override`, כבר לא צריך לבדוק חתימה". לא נכון. בחירת החתימה קודמת לדריסה.

## משפט מפתח אחד שכדאי לזכור

{: .box-success}
`overload` נבחר לפי **טיפוס מוצהר**. `override` נבחר לפי **טיפוס בזכרון**. `new` נשאר לפי **טיפוס מוצהר**. `cast` נבדק גם בקומפילציה וגם בזמן ריצה.

## דפי המשך

- [סיכום שגיאות קומפילציה וזמן ריצה]({{ '/oop/02CompilationAndRunTimeErrorSummary' | relative_url }})
- [עץ החלטה: איזו פעולה תרוץ או איזו שגיאה תתקבל]({{ '/oop/02FunctionChoicePath' | relative_url }})
