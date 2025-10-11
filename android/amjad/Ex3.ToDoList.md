---
layout: page
title: "עבודה עם SQLite"
subtitle: "הוספת בסיס נתונים לפרוייקט"
tags: [אנדרואיד, דאטאבייס, בסיס נתונים, SQLite, Database]
lang: en
---

{: .box-note}
📝 מטלה – אפליקציית "רשימת משימות" (To-Do List). באדיבות אמג'ד טרודי.  


<!-- https://docs.google.com/document/d/1hicgaB-C_kxWXRY9wLBG9p6G9liolw2ORKkq44tnC98/edit?tab=t.0 -->


## 🎯 מטרות
- לתרגל עבודה עם **ArrayList** לשמירת נתונים.  
- להשתמש ב־**Intent** כדי לעבור בין דפים (Activities).  
- לתרגל הוספה והצגה של נתונים דינאמיים.  
- להכיר את **ListView** להצגת רשימות במסך אחד. *(למידה עצמאית)*  

---

## 📱 תיאור האפליקציה
בנו אפליקציה שתאפשר למשתמש:
- להוסיף משימות לרשימה.  
- לעבור למסך אחר כדי לראות את כל המשימות שהוזנו.

---

## 📂 חלק 1 – `MainActivity`

### רכיבי המסך:
- `EditText` להזנת משימה.  
- כפתור **"הוסף משימה"**.  
- כפתור **"הצג משימות"**.  

### מהלך הפעולה:
1. בכל לחיצה על **"הוסף משימה"** – המשימה תתווסף ל־`ArrayList<String>`.  
2. יוצג **Toast** עם הודעה שהמשימה נוספה.  
3. בלחיצה על **"הצג משימות"**:
   - ניצור `Intent` חדש ל־`TaskListActivity`.  
   - נעביר את כל הרשימה (`ArrayList`) ל־Activity החדש.  

```java
Intent intent = new Intent(MainActivity.this, TaskListActivity.class);
intent.putStringArrayListExtra("tasks", tasksArrayList);
startActivity(intent);
````

---

## 📂 חלק 2 – `TaskListActivity`

### קבלת הרשימה:

```java
ArrayList<String> tasks = getIntent().getStringArrayListExtra("tasks");
```

---

## ⚡ הסבר על ListView

* **ListView** הוא רכיב שמאפשר להציג רשימה של פריטים (כמו משימות) במסך אחד.
* כל פריט ברשימה הוא שורה אחת במסך.
* כדי להציג נתונים ב־ListView נשתמש ב־**Adapter**, שמקשר בין הנתונים (`ArrayList`) לבין הרכיב במסך.

לדוגמה, נשתמש ב־`ArrayAdapter` שמציג כל פריט כשורה ב־ListView:

```java
ArrayAdapter<String> adapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_list_item_1,
    tasks
);
listView.setAdapter(adapter);
```

* כפתור **"חזור"** יחזיר אותנו למסך הראשי באמצעות:

```java
finish();
```

---

## ⭐ תוספות (למתקדמים)

* מחיקה של משימה בלחיצה עליה ברשימה.
* הצגת מספר המשימות (`tasks.size()`) בתוך `TextView`.
* שמירת המשימות ב־**SharedPreferences** כך שהן לא ייעלמו אחרי סגירת האפליקציה.

  > (נלמד את זה בפעם הבאה – לא לבצע כעת.)

---

## 📤 תוצר סופי

* קישור ל- **git** של פרויקט Android Studio.
* צילום מסך של המסך הראשי אחרי שהוזנו מספר משימות.
* צילום מסך של המסך השני שבו מוצגת רשימת המשימות.
* להציג את המטלה בשיעור הבא למורה.

---


> 💪 בהצלחה אלופות ואלופים!

