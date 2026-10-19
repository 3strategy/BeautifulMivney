---
layout: page
title: "3 — עובדים עם האובייקטים"
subtitle: "מסננים ומשנים שמות בלי לעבד שוב את ה־JSON"
permalink: /android/topics/petstore-json/he/03-use-objects/
lang: he
translation_of: /android/topics/petstore-json/03-use-objects/
menu_set: android
full-width: true
tags: [HTTP, JSON, Java, Swagger, Android]
---

[מפת השיעור]({{ '/android/topics/petstore-json/he/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/) · [English version]({{ '/android/topics/petstore-json/03-use-objects/' | relative_url }}?lang=en)

מתחילים מהמצב הרץ של שלב 2. כבר יש לנו `Pet[]`. כעת נעבוד עם המערך הזה כעם נתוני Java רגילים.

נבאו לפני כתיבת הקוד: אם נשנה את `pets[0].name`, האם גם מחרוזת תשובת ה־JSON תשתנה? האם בעל החיים בשרת ישתנה?

## מוסיפים שלוש פעולות

הוסיפו את הכפתורים מיד לפני כותרת הטבלה, וחברו אותם בתוך `onCreate`. הוסיפו את שתי המתודות החדשות לצד מתודות ההמרה וההצגה.

<div markdown="1" class="english">

### app > res > layout > activity_main.xml

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
                 android:text="Deserialize to Pet[]" />
+            <Button
+                android:id="@+id/showAvailable"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Show available objects" />
+            <Button
+                android:id="@+id/showAll"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Show all objects" />
+            <Button
+                android:id="@+id/renameFirst"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Rename first object to Pixel" />
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
```

<div markdown="1" class="english">

### app > kotlin+java > com.example.topic > MainActivity

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
 import com.google.gson.Gson;
 import com.google.gson.JsonParseException;
 
+import java.util.ArrayList;
 import java.util.Collections;
 import java.util.Scanner;
 import java.util.Map;
```

```diff
         binding.getPets.setOnClickListener(v -> getPets());
         binding.loadDemo.setOnClickListener(v -> loadDemo());
         binding.parsePets.setOnClickListener(v -> parsePets());
+        binding.showAvailable.setOnClickListener(v -> showAvailable());
+        binding.showAll.setOnClickListener(v -> renderPets(pets));
+        binding.renameFirst.setOnClickListener(v -> renameFirst());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         }
     }
 
+    /** Selects existing objects by their status; no JSON processing is needed. */
+    private void showAvailable() {
+        ArrayList<Pet> available = new ArrayList<>();
+        for (Pet pet : pets) {
+            if ("available".equals(pet.status)) available.add(pet);
+        }
+        renderPets(available.toArray(new Pet[0]));
+    }
+
+    /** Mutates an object in memory while leaving both JSON text areas untouched. */
+    private void renameFirst() {
+        if (pets.length == 0) {
+            binding.objectStatus.setText("Deserialize some animals first");
+            return;
+        }
+        pets[0].name = "Pixel";
+        renderPets(pets);
+    }
+
     /** Displays object fields; this method never reads or parses JSON. */
     private void renderPets(Pet[] animals) {
         binding.petTable.removeAllViews();
```

## עוקבים אחרי ההפניות לאובייקטים

`showAvailable` קוראת את השדה `status` של כל אובייקט ואוספת את האובייקטים המתאימים. אין כאן הורדה או המרה נוספת מ־JSON. ה־ArrayList החדשה מכילה הפניות לבעלי החיים שכבר קיימים. הקריאה `toArray(new Pet[0])` מעבירה מערך למתודת ההצגה; הכפתור **Show all** מציג שוב את המערך המקורי.

`renameFirst` משנה שדה באובייקט הראשון ובונה מחדש את הטבלה. היא משאירה את שני אזורי הטקסט כפי שהם ואינה שולחת בקשה. הצגת סינון אינה משנה את המערך `pets`, ולכן Rename first מתייחס תמיד לבעל החיים הראשון במערך המקורי, גם אם אינו הראשון בתצוגה המסוננת. אחרי שינוי השם מוצגת שוב הטבלה המלאה, כדי שנראה את התוצאה.

## בונים ומוכיחים את ההבדל

1. טענו את הדוגמה והמירו לאובייקטים: שלושה בעלי חיים.
2. לחצו **Show available objects**: יוצגו Milo ו־Nala. לחצו **Show all objects**: שלושתם יחזרו.
3. לחצו **Rename first object to Pixel**: בטבלה כתוב עכשיו Pixel. בטקסט ה־JSON הניתן לעריכה עדיין כתוב Milo. גם גוף תשובת HTTP האחרונה נשאר ללא שינוי.
4. המירו שוב את טקסט הדוגמה שלא שיניתם: Milo חוזר, משום ששחזרתם אובייקטים חדשים מהטקסט הישן.
5. שנו ב־Notepad++ את המצב של Luna ל־available, הדביקו את המערך, המירו וסננו. נבאו את מספר השורות לפני הלחיצה.

<details markdown="1">
<summary>איך הניסוי מדגים את הכוח של המרה לאובייקטים?</summary>

אחרי שהטקסט הופך לאובייקטים, התוכנית יכולה להשתמש בשדות, תנאים, לולאות, מערכים ומתודות שכבר מוכרים לנו. אין צורך לכתוב בכל פעם קוד לפיצול מחרוזות כדי לסנן, לשנות שם, לספור או להציג בעלי חיים. הטבלה מציגה את האובייקטים. בהמשך נשתמש בסריאליזציה כדי ליצור ייצוג טקסטואלי חדש של האובייקטים ששינינו.

</details>

[הורדת קוד השלב]({{ "/android/topics/petstore-json/downloads/03-use-objects.zip" | relative_url }})

[לשלב הבא: סריאליזציה ושליחת POST](../04-post/)
