---
layout: page
title: "ex6a5 עצים בינאריים מתקדם"
subtitle: "עצים בינאריים: BinNode⟨T⟩ תרגול 6a5"
tags: []
courseName: "מבני נתונים"
unitTopic: "עצים בינאריים"
lang: he
---

## 6A5.1 MirrorTree {#id6a5.1}

כתבו פעולה בשם `MirrorTree`, המקבלת עץ בינארי `BinNode⟨int⟩ t`, והופכת אותו לעץ המראה שלו.

עץ מראה הוא עץ שבו בכל צומת שאינו עלה, הבן השמאלי והבן הימני מוחלפים זה בזה.

לדוגמה, עבור העץ הבא:

```mermaid
flowchart TB
  A((5)) --> B((3))
  A --> C((8))
  B --> D((1)):::leaf
  B --> E((4)):::leaf
  C --> F((7)):::leaf
  C --> G((9)):::leaf
```

לאחר הפעלת הפעולה יתקבל עץ המראה:

```mermaid
flowchart TB
  A((5)) --> C((8))
  A --> B((3))
  C --> G((9)):::leaf
  C --> F((7)):::leaf
  B --> E((4)):::leaf
  B --> D((1)):::leaf
```

## 6a5.2 IsSymmetric {#id6a5.2}

כתבו פעולה בשם `IsSymmetric`, המקבלת עץ בינארי `BinNode⟨int⟩ t`, ומחזירה `true` אם העץ סימטרי סביב הצומת `t`, אחרת הפעולה תחזיר `false`.

עץ סימטרי הוא עץ שהוא תמונת מראה של עצמו, כלומר תת העץ השמאלי ותת העץ הימני הם תמונות מראה זה של זה.

לדוגמה, העץ הבא סימטרי:

```mermaid
flowchart TB
  A((6)) --> B((4))
  A --> C((4))
  B --> D((2)):::leaf
  B --> E((5)):::leaf
  C --> F((5)):::leaf
  C --> G((2)):::leaf
```

העץ הבא אינו סימטרי:

```mermaid
flowchart TB
  A((6)) --> B((4))
  A --> C((4))
  B --> D((2)):::leaf
  B --- NB[ ]:::invisible
  C --> F((5)):::leaf
  C --> G((2)):::leaf
  
  linkStyle 3 stroke-opacity:0
```

## 6a5.3 IsBalanced {#id6a5.3}

כתבו פעולה בשם `IsBalanced`, המקבלת עץ בינארי `BinNode⟨int⟩ t`, ומחזירה `true` אם העץ מאוזן לפי גובה, אחרת הפעולה תחזיר `false`.

עץ בינארי נחשב מאוזן לפי גובה אם בכל צומת בעץ, ההפרש בערך מוחלט בין גובה תת העץ השמאלי לבין גובה תת העץ הימני הוא לכל היותר 1.

לדוגמה, העץ הבא מאוזן:

```mermaid
flowchart TB
  A((10)) --> B((6))
  A --> C((14))
  B --> D((3)):::leaf
  B --> E((8)):::leaf
  C --> F((12)):::leaf
  C --- NC[ ]:::invisible
  
  linkStyle 5 stroke-opacity:0
```

העץ הבא אינו מאוזן:

```mermaid
flowchart TB
  A((10)) --> B((6))
  A --- NA[ ]:::invisible
  B --> C((3))
  B --- NB[ ]:::invisible
  C --> D((1)):::leaf
  C --- NC[ ]:::invisible
  
  linkStyle 1,3,5 stroke-opacity:0
```

## 6a5.4 HasChildrenSumProperty {#id6a5.4}

כתבו פעולה בשם `HasChildrenSumProperty`, המקבלת עץ בינארי `BinNode⟨int⟩ t`, ומחזירה `true` אם בכל צומת בעץ ערך הצומת שווה לסכום הערכים של בניו המיידיים. אחרת הפעולה תחזיר `false`.

אם לצומת חסר בן שמאלי או בן ימני, יש להתייחס לערך של הבן החסר כאל 0. עלים נחשבים כצמתים שמקיימים את התכונה.

לדוגמה, העץ הבא מקיים את התכונה:

```mermaid
flowchart TB
  A((10)) --> B((4))
  A --> C((6))
  B --> D((4)):::leaf
  B --- NB[ ]:::invisible
  C --> E((2)):::leaf
  C --> F((4)):::leaf
  
  linkStyle 3 stroke-opacity:0
```

העץ הבא אינו מקיים את התכונה:

```mermaid
flowchart TB
  A((10)) --> B((4))
  A --> C((5))
  B --> D((4)):::leaf
  B --- NB[ ]:::invisible
  C --> E((2)):::leaf
  C --> F((4)):::leaf
  
  linkStyle 3 stroke-opacity:0
```

## 6a5.5 NodesAtDistanceK {#id6a5.5}

כתבו פעולה בשם `NodesAtDistanceK`, המקבלת עץ בינארי `BinNode⟨int⟩ tree`, צומת יעד בעץ `BinNode⟨int⟩ t`, ומספר שלם `k`, ומחזירה את כל הצמתים שנמצאים במרחק `k` מצומת היעד.

הנחיות:

- יש להחזיר את הרשימה בסדר ממוין.
- העץ אינו מכיל ערכים כפולים.

לדוגמה, בעץ הבא, אם צומת היעד הוא הצומת שערכו 3 ו־`k = 2`, הצמתים במרחק 2 הם 8 ו־1:

```mermaid
flowchart TB
  A((5)) --> B((3))
  A --> C((8)):::leaf
  B --> D((1)):::leaf
  B --> E((4)):::leaf
```

דוגמה נוספת, אם צומת היעד הוא הצומת שערכו 5 ו־`k = 1`, הצמתים במרחק 1 הם 3 ו־8:

```mermaid
flowchart TB
  A((5)) --> B((3))
  A --> C((8)):::leaf
  B --> D((1)):::leaf
  B --> E((4)):::leaf
```

## 6a5.6 IsSubtree {#id6a5.6}

כתבו פעולה בשם `IsSubtree`, המקבלת שני עצים בינאריים, `BinNode⟨int⟩ t1` ו־`BinNode⟨int⟩ t2`, ומחזירה `true` אם `t2` הוא תת עץ של `t1`, אחרת הפעולה תחזיר `false`.

עץ `t2` הוא תת עץ של `t1` אם ניתן לבחור צומת כלשהו בתוך `t1`, ולקחת ממנו את כל הצאצאים שלו. אם העץ שהתקבל זהה ל־`t2` גם במבנה וגם בערכי הצמתים, אז `t2` נחשב תת עץ של `t1`.

לדוגמה, בעץ `t1` הבא:

```mermaid
flowchart TB
  A((8)) --> B((3))
  A --> C((10)):::leaf
  B --> D((1)):::leaf
  B --> E((6))
  E --> F((4)):::leaf
  E --> G((7)):::leaf
```

העץ `t2` הבא הוא תת עץ של `t1`:

```mermaid
flowchart TB
  E((6)) --> F((4)):::leaf
  E --> G((7)):::leaf
```
