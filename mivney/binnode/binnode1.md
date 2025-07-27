---
layout: page
title: "עץ בינארי"
subtitle: "מושגים שונים והבהרות "
tags: []
lang: he
---


# השוואה בין עץ בינארי (Binary Tree) לעץ חיפוש בינארי (Binary Search Tree, BST)

## מהו עץ בינארי?

- **הגדרה** – עץ שבו לכל צומת (Node) יש לכל היותר שני ילדים:
  - ילד שמאלי (Left Child)
  - ילד ימני (Right Child)\
    מבנה זה אינו מחייב שום סדר בין תת‑העצים שלו.‏([geeksforgeeks.org](https://www.geeksforgeeks.org/dsa/binary-tree-data-structure/?utm_source=chatgpt.com), [he.wikipedia.org](https://he.wikipedia.org/wiki/%D7%A2%D7%A5_%D7%91%D7%99%D7%A0%D7%90%D7%A8%D7%99?utm_source=chatgpt.com))
- לעץ בינארי ניתן לייחס תכונות נוספות (מלא, מושלם, כמעט־מושלם, מאוזן) אך הן אינן חלק מהגדרה בסיסית זו.

## מהו עץ חיפוש בינארי (BST)?

- **הגדרה** – עץ בינארי המקיים *תכונת סדר* (Binary‑Search‑Tree Property):
  - לכל צומת `v`‑―‑כל המפתחות שבתת‑העץ השמאלי קטנים ממפתחו של `v`.
  - כל המפתחות שבתת‑העץ הימני גדולים ממפתחו של `v`.\
    התכונה מאפשרת חיפוש, הכנסה ומחיקה בזמן `O(h)` כאשר `h` הוא גובה העץ.‏([geeksforgeeks.org](https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/?utm_source=chatgpt.com), [en.wikipedia.org](https://en.wikipedia.org/wiki/Binary_search_tree?utm_source=chatgpt.com), [he.wikipedia.org](https://he.wikipedia.org/wiki/%D7%A2%D7%A5_%D7%97%D7%99%D7%A4%D7%95%D7%A9?utm_source=chatgpt.com))
- מונחים מקובלים:
  - **עברית** – *עץ חיפוש בינארי*
  - **אנגלית** – *Binary Search Tree* (ראשי־תיבות BST)

## איזון (Balancing) וגובה (Height)

- **גובה (Height)** – מספר הקשתות במסלול הארוך ביותר מהשורש (Root) אל עלה (Leaf).
- **גורם איזון (Balance Factor)** – `height(left) − height(right)` של תת‑עצים.
- **עץ מאוזן** – עץ שבו גבהי תת‑העצים בכל צומת אינם שונים ביותר מקבוע `c` (לרוב `c=1`).‏([geeksforgeeks.org](https://www.geeksforgeeks.org/balanced-binary-tree/?utm_source=chatgpt.com))

## עץ AVL

- **הגדרה** – עץ AVL (על שם Adelson‑Velsky ו‑Landis) הוא *עץ חיפוש בינארי מאוזן‐עצמית* (Self‑Balancing BST) שבו │balance factor│ ≤ 1 בכל צומת.‏([geeksforgeeks.org](https://www.geeksforgeeks.org/dsa/introduction-to-avl-tree/?utm_source=chatgpt.com), [geeksforgeeks.org](https://www.geeksforgeeks.org/balanced-binary-tree/?utm_source=chatgpt.com))
- פעולות הכנסה/מחיקה מבוצעות כ‑BST רגיל, ואחריהן *סיבובים* (Rotations) לשמירת האיזון.

### האם אפשר לומר “עץ AVL הוא BST מאוזן?”

כן. עץ AVL מקיים both – תכונת הסדר של BST **וגם** תנאי איזון קפדני. לכן הוא דוגמה קלאסית ל‑*Balanced BST*.

## מילון מושגים

| מונח עברי  | Term (EN)      | הגדרה קצרה                                                                           |
| ---------- | -------------- | ------------------------------------------------------------------------------------ |
| צומת       | Node           | יחידת המידע הבסיסית בעץ, הכוללת מפתח וקישורים לילדים                                       |
| שורש       | Root           | הצומת העליון שאין לו הורה                                                                  |
| עלה        | Leaf           | צומת ללא ילדים                                                                             |
| תת‑עץ      | Subtree        | עץ הנובע מצומת כלשהו וצאצאיו                                                             |
| גובה       | Height         | אורך המסלול הארוך ביותר מן הצומת אל עלה                                                    |
| גורם איזון | Balance Factor | הפרש גבהים בין תת‑העץ השמאלי לימני                                                        |
| עץ מאוזן   | Balanced Tree  | עץ ש‑  balance factor   בכל צומת חסום בקבוע. בד"כ 1 |
| עץ AVL     | AVL Tree       | Self‑balancing BST with  balance factor  ≤ 1                  |

## סיכום קצר

> *עץ בינארי* מתאר **מבנה** בלבד; *עץ חיפוש בינארי* מוסיף **סדר**, ו‑*עץ AVL* מוסיף **איזון אוטומטי**. לכן: כל AVL הוא BST, וכל BST הוא עץ בינארי, אך לא להפך.

---

## מהו עץ צחי (Tsachi Tree)?

**הגדרה** – *עץ צחי* (ראשי תיבות: **צ**ומת **ח**ד‑**י**חידי/חד‑ילדי) הוא עץ בינארי שבו **כל צומת שאינו עלה מחזיק ילד אחד בלבד** – או שמאלי או ימני, אף פעם לא שניהם.  במילים אחרות: עץ Pathological/ Degenerate, הבנוי למעשה כ‑Linked List.

### מקבילות באנגלית

| עברית  | אנגלית מקובלת     | הערה                          |
| ------ | ----------------- | ----------------------------- |
| עץ צחי | Degenerate Tree   | מתאר עץ “פתולוגי” שבו `h≈n-1` |
|        | Pathological Tree | שם כללי למצבים קיצוניים       |

### מאפיינים מרכזיים

- **גובה** `h≈n−1`  → פעולות חיפוש/הכנסה/מחיקה על BST עלולות לרדת ל‑`O(n)`.
- נוצר למשל כאשר מוסיפים מפתחות בסדר עולה/יורד לעץ חיפוש בינארי.
- מקובל לראות בו *anti‑pattern*; עצים מאוזנים (AVL, Red‑Black, Treap, Splay) נועדו למנוע מצב כזה.

### דוגמה

הכנסת הערכים `[1,2,3,4,5]` ל‑BST ריק בתורם:

```
1
 \
  2
   \
    3
     \
      4
       \
        5
```

העץ הנ"ל הוא עץ צחי – כל צומת מחזיק בן ימני יחיד.

### השוואה מהירה

| תכונה                  | BST מאוזן טיפוסי | עץ צחי           |
| ---------------------- | ---------------- | ---------------- |
| מספר ילדים לצומת פנימי | ≤ 2 (לעיתים 2)   | **1** בלבד       |
| גובה ממוצע             | `O(log n)`       | `O(n)`           |
| ביצועי חיפוש גרועים    | נדיר             | תמיד במקרה הגרוע |

---

### מקורות

1. Wikipedia – [Degenerate Tree](https://en.wikipedia.org/wiki/Degenerate_tree?utm_source=chatgpt.com)
2. GeeksforGeeks – [Degenerate (Binary) Tree](https://www.geeksforgeeks.org/degenerate-binary-tree/?utm_source=chatgpt.com)
3. קורס "מבני נתונים", אונ' ת"א – יחידה 3, שקופיות "עצים פתולוגיים"

