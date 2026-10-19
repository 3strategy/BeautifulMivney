---
layout: page
title: "4 — מאובייקט לגוף בקשת POST"
subtitle: "רואים את ה־JSON שנשלח ומשווים לתשובת השרת"
permalink: /android/topics/petstore-json/he/04-post/
lang: he
translation_of: /android/topics/petstore-json/04-post/
menu_set: android
full-width: true
tags: [HTTP, JSON, Java, Swagger, Android]
---

[מפת השיעור]({{ '/android/topics/petstore-json/he/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/) · [English version]({{ '/android/topics/petstore-json/04-post/' | relative_url }}?lang=en)

מתחילים מהמצב הרץ של שלב 3. GET ביקשה בעלי חיים. כעת POST תשלח אובייקט חדש של בעל חיים ל־Petstore. נשמור על ההבחנה בין אובייקט Java, מחרוזת ה־JSON שנוצרה ממנו ותשובת השרת.

## קודם שולחים POST ב־Swagger

הרחיבו את **POST /pet** ולחצו **Try it out**. בחרו `application/json` לגוף הבקשה ולפורמט התשובה. החליפו את הדוגמה הגדולה בזו:

```json
{"id": 2610194001, "name": "Classroom cat 🐈", "status": "available", "photoUrls": []}
```

לפני ההרצה, החליפו את המזהה שבדוגמה במספר חיובי ייחודי לתרגיל שלכם. זהו שרת ניסוי משותף, ולכן כדאי להימנע משינוי בעל חיים קיים. הריצו, בדקו את פקודת curl ואת גוף הבקשה, ואז את התשובה בפועל. סכמת השרת מחייבת `name` ו־`photoUrls`; מערך ריק של כתובות תמונה מספיק לניסוי שלנו.

הכותרת `Content-Type: application/json; charset=UTF-8` מתארת את הגוף **שאנו שולחים**. הכותרת `Accept: application/json` מבקשת את פורמט התשובה **שנקבל**. לכותרות יש תפקידים שונים. POST שולחת גוף בקשה ועשויה ליצור מידע בשרת.

## מממשים את ההמרה הגלויה

הוסיפו את פקדי POST מעל כותרת התשובה, כדי שאפשר יהיה להשוות בין ה־JSON היוצא לתשובה. הוסיפו את `postPet` ל־Activity. הכפתור יוצר בעל חיים **חדש**; הוא אינו שולח את כל המערך ואינו משנה את בעלי החיים שכבר מוצגים בטבלה.

<div markdown="1" class="english">

### app > res > layout > activity_main.xml

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
                 android:layout_height="wrap_content"
                 android:accessibilityLiveRegion="polite"
                 android:text="Ready — send a request" />
+            <Button
+                android:id="@+id/postPet"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="POST a new classroom cat" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="Outgoing POST body — serialized object"
+                android:textStyle="bold" />
+            <TextView
+                android:id="@+id/outgoingJson"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:fontFamily="monospace"
+                android:textIsSelectable="true" />
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
```

<div markdown="1" class="english">

### app > kotlin+java > com.example.topic > MainActivity

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 
+import com.android.volley.DefaultRetryPolicy;
 import com.android.volley.NetworkResponse;
 import com.android.volley.Request;
 import com.android.volley.RequestQueue;
```

```diff
 import com.google.gson.Gson;
 import com.google.gson.JsonParseException;
 
+import java.nio.charset.StandardCharsets;
 import java.util.ArrayList;
 import java.util.Collections;
 import java.util.Scanner;
```

```diff
         binding.showAvailable.setOnClickListener(v -> showAvailable());
         binding.showAll.setOnClickListener(v -> renderPets(pets));
         binding.renameFirst.setOnClickListener(v -> renameFirst());
+        binding.postPet.setOnClickListener(v -> postPet());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         binding.petTable.addView(row);
     }
 
+    /** Serializes a new animal and sends exactly the text displayed above the response. */
+    private void postPet() {
+        Pet animal = new Pet();
+        animal.id = System.currentTimeMillis();
+        animal.name = "Classroom cat 🐈";
+        animal.status = "available";
+        animal.photoUrls = new String[0];
+        String outgoingJson = gson.toJson(animal);
+        binding.outgoingJson.setText(outgoingJson);
+        queue.cancelAll(this);
+        binding.status.setText("Sending POST...");
+        StringRequest request = new StringRequest(Request.Method.POST,
+                BASE_URL + "/pet", text -> {
+            binding.responseJson.setText(text);
+            binding.status.setText("POST HTTP " + httpStatus + " — returned JSON shown below");
+        }, this::showError) {
+            @Override
+            public Map<String, String> getHeaders() {
+                return Collections.singletonMap("Accept", "application/json");
+            }
+
+            @Override
+            public String getBodyContentType() {
+                return "application/json; charset=UTF-8";
+            }
+
+            @Override
+            public byte[] getBody() {
+                return outgoingJson.getBytes(StandardCharsets.UTF_8);
+            }
+
+            @Override
+            protected Response<String> parseNetworkResponse(NetworkResponse response) {
+                httpStatus = response.statusCode;
+                return Response.success(
+                        new String(response.data, java.nio.charset.StandardCharsets.UTF_8), null);
+            }
+        };
+        request.setRetryPolicy(new DefaultRetryPolicy(10000, 0, 1f));
+        request.setShouldCache(false);
+        request.setTag(this);
+        queue.add(request);
+    }
+
     /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
     private void showError(VolleyError error) {
         NetworkResponse response = error.networkResponse;
```

## עוקבים אחרי הבתים שנשלחים

```java
String outgoingJson = gson.toJson(animal);
```

השורה הזאת יוצרת מחרוזת חדשה מהשדות של האובייקט. אימוג׳י החתול בודק במכוון את UTF-8 בגוף היוצא ובתשובה. זאת אותה מחרוזת שמוצגת תחת **Outgoing POST body** ומקודדת ל־UTF-8 ב־`getBody()`. לבקשה מוגדר Content-Type של JSON. פונקציית ההצלחה מציגה את התשובה כטקסט, כך שנוכל לבדוק מה השרת החזיר בפועל.

מזהה המבוסס על הזמן מצמצם מאוד התנגשויות בכיתה, אבל אינו הבטחה כללית לייחודיות. השרת עשוי לשנות ערכים או להוסיף שדות, ולכן משווים ערכי שדות אחרי הפענוח ולא רווחים או סדר שדות בטקסט. אזור גוף התשובה מציג תמיד את תשובת HTTP **האחרונה**. POST מחליפה את התוכן באזור הזה, ואילו המערך הניתן לעריכה והטבלה נשארים כפי שהיו.

הביטוי `new DefaultRetryPolicy(10000, 0, 1f)` מגדיר ל־POST זמן המתנה של עשר שניות ואפס ניסיונות חוזרים אוטומטיים. ייתכן ש־POST הגיעה לשרת גם אם זמן ההמתנה הסתיים; שליחה חוזרת בלי בדיקה עלולה ליצור או לשנות מידע שוב. התחלת בקשה אחרת או יציאה מהמסך מבטלות את מסירת התשובה המקומית, אך אינן מבטלות פעולה שהשרת כבר ביצע.

## בונים ומשווים

1. בצעו Build והריצו; טענו והמירו את הדוגמה אם תרצו להשאיר טבלה לצד הניסוי.
2. לחצו **POST a new classroom cat**. השוו את הגוף היוצא לגוף התשובה האחרונה; כשהשירות מצליח, צפו ל־`POST HTTP 200`.
3. בדקו את `id`,‏ `name`,‏ `status` ו־`photoUrls`. בבדיקה ב־19 באוקטובר 2026 לא נדרשו פרטי הזדהות. אם קיבלתם קוד מצב אחר, קראו את הגוף הגלוי שלו.
4. העתיקו את המזהה שהוחזר ל־**GET /pet/{petId}** ב־Swagger. GET מוצלחת מיד אחרי השליחה מדגימה שהשרת שמר את הדוגמה. מידע בשרת הדגמה ציבורי יכול להשתנות או להתאפס בהמשך.
5. שנו בקוד Java את `animal.name`, הריצו שוב ונבאו אילו ערכים בגוף היוצא ובתשובה ישתנו.

לניסוי קטן נוסף, המירו את המערך הקיים `pets` ל־JSON באמצעות `gson.toJson(pets)` אחרי Rename first. המחרוזת החדשה תכיל Pixel; מחרוזת התשובה הישנה עדיין תכיל את הערך הקודם. את המערך הזה אין לשלוח ל־POST /pet, שמצפה ל**אובייקט אחד**.

[הורדת קוד השלב]({{ "/android/topics/petstore-json/downloads/04-post.zip" | relative_url }})

[תרגיל רשות: שומרים JSON ומשחזרים אובייקטים אחרי הפעלה מחדש](../05-preferences/)
