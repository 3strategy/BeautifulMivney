---
layout: page
title: "2 — מטקסט JSON לאובייקטי Java"
subtitle: "המרה אחת, כמה בעלי חיים וטבלה שנבנית משדות"
permalink: /android/topics/petstore-json/he/02-objects/
lang: he
translation_of: /android/topics/petstore-json/02-objects/
menu_set: android
full-width: true
tags: [HTTP, JSON, Java, Swagger, Android]
---

[מפת השיעור]({{ '/android/topics/petstore-json/he/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/) · [English version]({{ '/android/topics/petstore-json/02-objects/' | relative_url }}?lang=en)

מתחילים מהמצב הרץ של שלב 1. כעת נוסיף מערך JSON שאפשר לערוך וטבלה שנבנית מהאובייקטים שנשחזר. גוף תשובת HTTP המקורי יישאר גלוי וללא שינוי.

## קוראים ועורכים טקסט ב־Notepad++

[הורידו את pets.json]({{ '/android/topics/petstore-json/downloads/pets.json' | relative_url }}) ופתחו אותו ב־Notepad++. אם הצביעה אינה פעילה, בחרו **Language → J → JSON**. אין צורך בתוסף עיצוב; הזחות וירידות שורה עוזרות לנו לקרוא, אבל המבנה נקבע על ידי סימני התחביר.

```json
[
  {"id": 101, "name": "Milo", "status": "available", "photoUrls": []},
  {"id": 102, "name": "Luna", "status": "pending", "photoUrls": []},
  {"id": 103, "name": "Nala", "status": "available", "photoUrls": []}
]
```

`[...]` הוא מערך; כל `{...}` הוא אובייקט JSON אחד. שמות השדות וערכי המחרוזות נכתבים במירכאות כפולות. `101` הוא מספר, ואילו `"101"` הוא מחרוזת. נקודתיים מחברות שם לערך, ופסיקים מפרידים בין שדות או בין איברי מערך. `photoUrls` הוא מערך, שבדוגמה הזאת ריק. JSON אינו מאפשר הערות או פסיק אחרי האיבר האחרון.

JSON תומך גם בערכים בוליאניים (`true`,‏ `false`), ב־`null` ובאובייקטים מקוננים. בתשובות Petstore עשויים להופיע `category` ו־`tags` מקוננים. המודל הראשון שלנו משתמש בארבעה שדות בלבד. Gson מתעלמת מהשדות הנוספים שמגיעים; הם אינם נשמרים במחלקת `Pet` שלנו, ולכן גם לא יופיעו כשנמיר אותה שוב ל־JSON.

שנו את השם Milo ב־Notepad++, שמרו בקידוד UTF-8 והעתיקו את המערך לאזור ה־JSON הניתן לעריכה באפליקציה. משתמשים בהעתקה והדבקה; אין צורך בבורר קבצים באנדרואיד או בתוסף ל־Notepad++. הכפתור **Load demo JSON** טוען את הדוגמה המצורפת לאותו אזור עריכה. מקור הטקסט הזה הוא הקובץ המקומי, ולא תשובת שרת.

## מוסיפים מודל, דוגמה וטבלה

הוסיפו Gson ובצעו Sync של Gradle. צרו מחלקת Java חדשה בשם `Pet` בחבילה `com.example.topic`, תחת **app > kotlin+java**. ליצירת קובץ הדוגמה, לחצו לחיצה ימנית על **res** תחת **app**, בחרו **New → Android Resource Directory**, בחרו בסוג המשאב **raw**, ואז צרו שם את `pets.json`. שלושת האובייקטים שבדוגמה הם נתונים קבועים לתרגול.

מוסיפים את הפקדים אחרי אזור התשובה, בתוך ה־LinearLayout האנכי הקיים. קטע השינויים מציג את נקודת ההוספה. אזור הגלילה האופקית שומר על קריאות מזהים ושמות ארוכים; הטבלה נשארת פשוטה, בלי להכניס בשלב הזה RecyclerView.

<div markdown="1" class="english">

### Gradle Scripts > build.gradle.kts (Module :app)

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
 }
 
 dependencies {
+    implementation("com.google.code.gson:gson:2.14.0")
     implementation("com.android.volley:volley:1.2.1")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
```

<div markdown="1" class="english">

### app > res > layout > activity_main.xml

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
                     android:fontFamily="monospace"
                     android:textIsSelectable="true" />
             </androidx.core.widget.NestedScrollView>
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="JSON to deserialize — edit or paste from Notepad++"
+                android:textStyle="bold" />
+            <Button
+                android:id="@+id/loadDemo"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Load demo JSON" />
+            <EditText
+                android:id="@+id/jsonInput"
+                android:layout_width="match_parent"
+                android:layout_height="180dp"
+                android:gravity="top|start"
+                android:fontFamily="monospace"
+                android:inputType="textMultiLine|textNoSuggestions"
+                android:hint="Paste a JSON array here"
+                android:importantForAutofill="no" />
+            <Button
+                android:id="@+id/parsePets"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Deserialize to Pet[]" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Java objects — table built from Pet fields"
+                android:textStyle="bold" />
+            <TextView
+                android:id="@+id/objectStatus"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:accessibilityLiveRegion="polite"
+                android:text="No objects yet" />
+            <HorizontalScrollView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:fillViewport="true">
+                <TableLayout
+                    android:id="@+id/petTable"
+                    android:layout_width="wrap_content"
+                    android:layout_height="wrap_content"
+                    android:stretchColumns="1" />
+            </HorizontalScrollView>
         </LinearLayout>
     </androidx.core.widget.NestedScrollView>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

<div markdown="1" class="english">

### app > kotlin+java > com.example.topic > MainActivity

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
 package com.example.topic;
 
 import android.os.Bundle;
+import android.widget.TableRow;
+import android.widget.TextView;
 
 import androidx.activity.EdgeToEdge;
 import androidx.appcompat.app.AppCompatActivity;
```

```diff
 import com.android.volley.toolbox.Volley;
 import com.example.topic.databinding.ActivityMainBinding;
 
+import com.google.gson.Gson;
+import com.google.gson.JsonParseException;
+
 import java.util.Collections;
+import java.util.Scanner;
 import java.util.Map;
 
 public class MainActivity extends AppCompatActivity {
```

```diff
     private ActivityMainBinding binding;
     private RequestQueue queue;
     private int httpStatus;
+    private final Gson gson = new Gson();
+    private Pet[] pets = new Pet[0];
 
     /** Creates the screen and connects its network action. */
     @Override
```

```diff
         });
         queue = Volley.newRequestQueue(getApplicationContext());
         binding.getPets.setOnClickListener(v -> getPets());
+        binding.loadDemo.setOnClickListener(v -> loadDemo());
+        binding.parsePets.setOnClickListener(v -> parsePets());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         StringRequest request = new StringRequest(Request.Method.GET,
                 BASE_URL + "/pet/findByStatus?status=available", text -> {
             binding.responseJson.setText(text);
+            binding.jsonInput.setText(text);
             binding.status.setText("GET HTTP " + httpStatus);
         }, this::showError) {
             @Override
```

```diff
         request.setShouldCache(false);
         request.setTag(this);
         queue.add(request);
+    }
+
+    /** Loads editable, predictable JSON without changing the last HTTP response. */
+    private void loadDemo() {
+        try (Scanner scanner = new Scanner(getResources().openRawResource(R.raw.pets), "UTF-8")) {
+            binding.jsonInput.setText(scanner.useDelimiter("\\A").next());
+        }
+    }
+
+    /** Reconstructs objects from text, then builds a table from their fields. */
+    private void parsePets() {
+        try {
+            String jsonText = binding.jsonInput.getText().toString();
+            Pet[] parsed = gson.fromJson(jsonText, Pet[].class);
+            if (parsed == null) throw new JsonParseException("Expected an array, not null");
+            for (Pet pet : parsed) {
+                if (pet == null) throw new JsonParseException("A pet cannot be null");
+            }
+            pets = parsed;
+            renderPets(pets);
+        } catch (JsonParseException error) {
+            pets = new Pet[0];
+            renderPets(pets);
+            binding.objectStatus.setText("Cannot deserialize: " + error.getMessage());
+        }
+    }
+
+    /** Displays object fields; this method never reads or parses JSON. */
+    private void renderPets(Pet[] animals) {
+        binding.petTable.removeAllViews();
+        addRow("ID", "Name", "Status");
+        for (Pet pet : animals) {
+            addRow(String.valueOf(pet.id), pet.name, pet.status);
+        }
+        binding.objectStatus.setText(animals.length + " animal objects shown");
+    }
+
+    /** Adds one table row with three ordinary text cells. */
+    private void addRow(String id, String name, String status) {
+        TableRow row = new TableRow(this);
+        for (String value : new String[]{id, name, status}) {
+            TextView cell = new TextView(this);
+            cell.setText(String.valueOf(value));
+            cell.setPadding(12, 8, 12, 8);
+            row.addView(cell);
+        }
+        binding.petTable.addView(row);
     }
 
     /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
```

<div markdown="1" class="english">

### app > kotlin+java > com.example.topic > Pet

</div>

צרו את הקובץ החדש הבא.

```java
package com.example.topic;

/** The Petstore fields used in this lesson; Gson ignores other incoming fields. */
public class Pet {
    public long id;
    public String name;
    public String status;
    public String[] photoUrls;
}
```

<div markdown="1" class="english">

### app > res > raw > pets.json

</div>

צרו את הקובץ החדש הבא.

```json
[
  {"id": 101, "name": "Milo", "status": "available", "photoUrls": []},
  {"id": 102, "name": "Luna", "status": "pending", "photoUrls": []},
  {"id": 103, "name": "Nala", "status": "available", "photoUrls": []}
]
```

## מזהים את נקודת המעבר מטקסט לאובייקטים

זאת השורה שיוצרת את אובייקטי בעלי החיים:

```java
Pet[] parsed = gson.fromJson(jsonText, Pet[].class);
```

לפניה, `jsonText` הוא מחרוזת אחת. אחריה, `parsed` הוא מערך Java, ובדוגמה שלנו הוא מכיל שלושה מופעי `Pet`. הביטוי `Pet[].class` מציין ל־Gson לאיזה טיפוס Java להמיר את הנתונים. זהו תיאור הטיפוס המבוקש. שמות תואמים ב־JSON ממלאים שדות תואמים במחלקה: `long` למזהים, `String` לשם ולמצב, ו־`String[]` לכתובות תמונות. Gson משתמשת בבנאי חסר הפרמטרים שהמחלקה מקבלת במשתמע.

`renderPets` מקבלת אובייקטים וקוראת את השדות שלהם. היא אינה מחפשת שם בתוך טקסט JSON. המתודה `addRow` יוצרת את שלושת רכיבי TextView של שורה אחת. זהו קוד להצגה במסך; החלק המרכזי הוא הלולאה שעוברת על אובייקטי `Pet`.

טעינת הדוגמה משתמשת ב־Scanner כדי לקרוא את משאב ה־UTF-8 הקטן כמחרוזת אחת; סגירת ה־Scanner סוגרת גם את המשאב. ההמרה לאובייקטים מתבצעת רק בלחיצה על **Deserialize to Pet[]**. גם GET מעתיקה את התשובה לאזור העריכה, ולכן אותו קוד המרה עובד גם על תשובת שרת וגם על דוגמה מקומית.

זהו פרויקט לימודי קטן במצב debug, ובתבנית שלו כבר כבויה האופטימיזציה ל־release. מיפוי השדות של Gson באמצעות reflection דורש תשומת לב נוספת כאשר מפעילים צמצום ושינוי שמות בבניית Android להפצה. כאן מתמקדים בהמרה הראשונה מטקסט לאובייקטים. ראו את [הנחיות פרויקט Gson](https://github.com/google/gson).

## בונים, מנבאים ובודקים

1. בצעו Build והריצו. לחצו **Load demo JSON** ואז **Deserialize to Pet[]**. צפו לשלוש שורות — Milo, Luna ו־Nala — ולשורת כותרת.
2. שנו את `"Milo"` ל־`"Pepper"` בטקסט הניתן לעריכה. נבאו אם הטבלה משתנה מיד. היא תתעדכן רק אחרי לחיצה על Deserialize, שתשחזר אובייקטים מהטקסט החדש.
3. הדביקו `[]` והמירו. צפו לכותרת ולכיתוב `0 animal objects shown`.
4. מחקו מירכאות או סוגר מסיים. צפו להודעת **Cannot deserialize**, בלי שורות ישנות בטבלה. נסו גם `{}`,‏ `null` ו־`[null]`: המסך מצפה למערך אובייקטי בעלי חיים שאינם null.
5. נסו GET ואז Deserialize. גוף התשובה המקורי והטבלה הם שני ייצוגים של אותם נתונים ברגע ההמרה.

שדות חסרים הם עניין נפרד משגיאת תחביר ב־JSON. במודל הפשוט הזה, מזהה מספרי חסר יקבל `0`, ושדות הפניה חסרים יקבלו `null`; הטבלה מציגה את המילה `null` במפורש. המעבדה אינה אוכפת את כל סכמת ה־API. בשלב POST נבנה במכוון את השדות הדרושים.

[הורדת קוד השלב]({{ "/android/topics/petstore-json/downloads/02-objects.zip" | relative_url }})

[לשלב הבא: עובדים עם האובייקטים](../03-use-objects/)
