---
layout: page
title: "Requery — מסד נתונים מקומי בארבעה שלבים"
subtitle: "Entity, קשרים, JOIN ו־RecyclerView מתוך פרויקט Java/XML"
permalink: /android/sqlite/
lang: he
full-width: true
tags: [Android, Java, SQLite, Requery, roadmap]
---

ארבעה מדריכים קצרים בונים בהדרגה יישום Android עם SQLite ו־Requery. מתחילים מ־Empty Views Activity בשפת Java; כל מדריך ממשיך את הפרויקט העובד שהתקבל בסוף הקודם ומסתיים בתוצאה שאפשר להפעיל.

| שלב | מה מוסיפים | מה בודקים בסיום |
|---:|---:|---:|
| [01 — טבלת Student]({{ '/android/sqlite/01.requery-student' | relative_url }}) | Entity, יצירת מסד והצגת נתונים | שלושה תלמידים מופיעים על המסך |
| [02 — קשר עם דירוג]({{ '/android/sqlite/02.requery-rated-relationship' | relative_url }}) | קשר רבים־לרבים ושדרוג סכימה | נתוני הקשר נגישים דרך ניווט |
| [03 — JOIN והוספות]({{ '/android/sqlite/03.requery-join-and-inserts' | relative_url }}) | שאילתת INNER JOIN טיפוסית ושלושה טפסי הוספה | נתונים חדשים נכנסים ומופיעים ברשימה |
| [04 — RecyclerView ומחיקה]({{ '/android/sqlite/04.requery-recyclerview-delete' | relative_url }}) | רשימה ממוחזרת ומחיקת קשר לפי מפתח מורכב | המחיקה נשמרת גם אחרי הפעלה מחדש |

לסקירת מושגים כללית על נתונים מקומיים ראו את [מפת הנושאים]({{ '/android/topics-index' | relative_url }}). למעבדה נפרדת על Room ושדרוג מסד ראו [מעבדה 12]({{ '/android/topics/12-room-persistence/' | relative_url }}).
