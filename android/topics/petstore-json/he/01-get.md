---
layout: page
title: "1 — בקשה ותשובה"
subtitle: "GET ב־Swagger, ואז קבלת טקסט התשובה ב־Java"
permalink: /android/topics/petstore-json/he/01-get/
lang: he
translation_of: /android/topics/petstore-json/01-get/
menu_set: android
full-width: true
tags: [HTTP, JSON, Java, Swagger, Android]
---

[מפת השיעור]({{ '/android/topics/petstore-json/he/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/) · [English version]({{ '/android/topics/petstore-json/01-get/' | relative_url }}?lang=en)

## קודם מנבאים, ואז מנסים ב־Swagger

פתחו את [Swagger Petstore](https://petstore3.swagger.io/) והרחיבו את הפעולה **GET /pet/findByStatus** בקבוצת **pet**. לחצו **Try it out**, בחרו `available`, בחרו `application/json` בפורמט התשובה או בבורר Accept, ולחצו **Execute**.

בדקו את **Request URL**, את פקודת **curl** שנוצרה, את **Code** תחת **Server response**, ואת **Response body**. קראו את תשובת השרת לאחר ההרצה. האזור “Example Value” הוא דוגמה קבועה בתיעוד. הבקשה ששלחנו שקולה לזו:

```http
GET /api/v3/pet/findByStatus?status=available HTTP/1.1
Host: petstore3.swagger.io
Accept: application/json
```

`GET` מבקשת נתונים. הנתיב מזהה את המשאב, ופרמטר השאילתה מבקש מצב מסוים. הכותרת `Accept` מציינת באיזה פורמט נרצה לקבל תשובה. `200` הוא קוד הצלחה של HTTP; גוף התשובה מכיל את הטקסט שהוחזר. גם קודי מצב אחרים הם תשובות. בכשל חיבור ייתכן שלא תתקבל תשובת HTTP כלל.

נבאו: האם קבלת הטקסט תיצור אובייקטים של בעלי חיים ב־Java? **לא**: בשלב הראשון נקבל רק `String`. הטקסט כתוב בפורמט JSON, ועדיין לא נפרש אותו.

Petstore הוא שרת דוגמה ציבורי ומשותף. בעלי החיים בו עשויים להשתנות, ולכן התרגיל אינו תלוי במזהה קבוע או במספר שורות קבוע. בבדיקה ב־19 באוקטובר 2026, GET ו־POST פעלו בלי פרטי הזדהות, אף שהגדרת ה־API מציגה מנגנוני הרשאה. אם ההתנהגות משתנה, בדקו את התשובה בפועל ב־Swagger. דוגמת ה־JSON להורדה בשלב 2 מאפשרת להמשיך לתרגל גם בלי רשת.

## מממשים את נקודת הבדיקה הראשונה

עבדו בתצוגת **Android** של Android Studio. השינויים ב־Gradle מתווספים להגדרות המודול הקיימות; משאירים את כל תלויות התבנית. אחרי הוספת הספרייה והפעלת View Binding בצעו Sync, ואז המשיכו לעריכות XML ו־Java. המחלקה `ActivityMainBinding` נוצרת כאשר תהליך הבנייה מעבד את קובץ הפריסה.

משאירים את ConstraintLayout הראשי. מחליפים את רכיב Hello World שבתוכו באזור ניסוי שאפשר לגלול. לתשובה יש אזור גלילה משלה בגובה 160dp, כך שתשובה ארוכה לא תדחוף את כל הפקדים שבהמשך הרחק למטה. גופן ברוחב קבוע וטקסט שניתן לבחור מקלים על הקריאה וההעתקה.

<div markdown="1" class="english">

### Gradle Scripts > build.gradle.kts (Module :app)

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
             }
         }
     }
+    buildFeatures {
+        viewBinding = true
+    }
+
     compileOptions {
         sourceCompatibility = JavaVersion.VERSION_11
         targetCompatibility = JavaVersion.VERSION_11
```

```diff
 }
 
 dependencies {
+    implementation("com.android.volley:volley:1.2.1")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

<div markdown="1" class="english">

### app > manifests > AndroidManifest.xml

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
 <?xml version="1.0" encoding="utf-8"?>
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
     xmlns:tools="http://schemas.android.com/tools">
+
+    <uses-permission android:name="android.permission.INTERNET" />
 
     <application
         android:allowBackup="true"
```

<div markdown="1" class="english">

### app > res > layout > activity_main.xml

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

```diff
     android:layout_height="match_parent"
     tools:context=".MainActivity">
 
-    <TextView
-        android:layout_width="wrap_content"
-        android:layout_height="wrap_content"
-        android:text="Hello World!"
+    <androidx.core.widget.NestedScrollView
+        android:layout_width="0dp"
+        android:layout_height="0dp"
+        android:fillViewport="true"
+        app:layout_constraintTop_toTopOf="parent"
         app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent">
+        <LinearLayout
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:orientation="vertical"
+            android:padding="16dp">
+            <Button
+                android:id="@+id/getPets"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="GET available pets" />
+            <TextView
+                android:id="@+id/status"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:accessibilityLiveRegion="polite"
+                android:text="Ready — send a request" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="Last HTTP response body — unchanged text"
+                android:textStyle="bold" />
+            <androidx.core.widget.NestedScrollView
+                android:layout_width="match_parent"
+                android:layout_height="160dp">
+                <TextView
+                    android:id="@+id/responseJson"
+                    android:layout_width="match_parent"
+                    android:layout_height="wrap_content"
+                    android:fontFamily="monospace"
+                    android:textIsSelectable="true" />
+            </androidx.core.widget.NestedScrollView>
+        </LinearLayout>
+    </androidx.core.widget.NestedScrollView>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

<div markdown="1" class="english">

### app > kotlin+java > com.example.topic > MainActivity

</div>

בצעו את ההוספות וההסרות האלה והשאירו את קוד התבנית שסביבן. שורות שמתחילות ב־`+` מתווספות ושורות שמתחילות ב־`-` מוסרות. את סימני השינוי עצמם אין להקליד.

תחילה שנו את שתי ההפניות הקיימות האלה. השדה `binding` והאתחול שלו מתווספים בקטע השינויים המבניים שמתחת להשוואה.

{% code_diff %}
-        setContentView(R.layout.activity_main);
+        setContentView(binding.getRoot());
-        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
+        ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
{% endcode_diff %}

```diff
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 
+import com.android.volley.NetworkResponse;
+import com.android.volley.Request;
+import com.android.volley.RequestQueue;
+import com.android.volley.Response;
+import com.android.volley.VolleyError;
+import com.android.volley.toolbox.StringRequest;
+import com.android.volley.toolbox.Volley;
+import com.example.topic.databinding.ActivityMainBinding;
+
+import java.util.Collections;
+import java.util.Map;
+
 public class MainActivity extends AppCompatActivity {
+    private static final String BASE_URL = "https://petstore3.swagger.io/api/v3";
+    private ActivityMainBinding binding;
+    private RequestQueue queue;
+    private int httpStatus;
 
+    /** Creates the screen and connects its network action. */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         EdgeToEdge.enable(this);
+        binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
             v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
             return insets;
         });
+        queue = Volley.newRequestQueue(getApplicationContext());
+        binding.getPets.setOnClickListener(v -> getPets());
+    }
+
+    /** Fetches JSON as text; no Java Pet objects are created here. */
+    private void getPets() {
+        queue.cancelAll(this);
+        binding.status.setText("Sending GET...");
+        StringRequest request = new StringRequest(Request.Method.GET,
+                BASE_URL + "/pet/findByStatus?status=available", text -> {
+            binding.responseJson.setText(text);
+            binding.status.setText("GET HTTP " + httpStatus);
+        }, this::showError) {
+            @Override
+            public Map<String, String> getHeaders() {
+                return Collections.singletonMap("Accept", "application/json");
+            }
+
+            @Override
+            protected Response<String> parseNetworkResponse(NetworkResponse response) {
+                httpStatus = response.statusCode;
+                return Response.success(
+                        new String(response.data, java.nio.charset.StandardCharsets.UTF_8), null);
+            }
+        };
+        request.setShouldCache(false);
+        request.setTag(this);
+        queue.add(request);
+    }
+
+    /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
+    private void showError(VolleyError error) {
+        NetworkResponse response = error.networkResponse;
+        binding.status.setText(response == null
+                ? "Network failure: " + error.getClass().getSimpleName()
+                : "HTTP " + response.statusCode);
+        binding.responseJson.setText(response == null ? "No HTTP response body received."
+                : new String(response.data, java.nio.charset.StandardCharsets.UTF_8));
+    }
+
+    /** Cancels delivery to this screen when it is no longer visible. */
+    @Override
+    protected void onStop() {
+        queue.cancelAll(this);
+        binding.status.setText("Ready — requests cancelled when leaving the screen");
+        super.onStop();
     }
 }
```

## עוקבים אחרי קוד Java

`StringRequest` מבקשת מ־Volley לפענח את הבתים של התשובה לטקסט. עדיין לא נוצרים אובייקטי בעלי חיים. `queue.add(request)` מתחילה עבודה אסינכרונית: המתודה מסתיימת בזמן שהתקשורת ממשיכה ברקע. פונקציית התגובה להצלחה מקבלת את `text` מאוחר יותר, ב־main thread, ולכן יכולה לעדכן את רכיבי המסך. הביטוי `this::showError` הוא קיצור ב־Java ל־`error -> showError(error)`; הוא מעביר כישלון למתודת הצגת השגיאה. המסך ממשיך לפעול בזמן ההמתנה לשרת.

שתי המתודות שאנו דורסים חושפות את כותרת Accept ואת קוד המצב. `parseNetworkResponse` שומרת את קוד המצב ומפענחת במפורש את הבתים לפי UTF-8. זהו הקידוד של JSON המועבר ברשת, גם כשיש שמות בעברית או אימוג׳י. הפענוח המפורש חשוב גם כשהשרת אינו מציין charset. הקריאה `Response.success(text, null)` מעבירה את הטקסט לפונקציית ההצלחה בלי רשומת מטמון; במעבדה המטמון כבוי. `showError` משאירה את גופי תשובות השגיאה גלויים ומבדילה בין תשובת HTTP שהתקבלה לבין כשל העברה ללא גוף תשובה.

המטמון כבוי כדי שהניסוי ב־GET ידגים בקשת רשת. הבקשות מתויגות באמצעות ה־Activity: התחלת בקשה חדשה או יציאה מהמסך מבטלות את מסירת התשובה של הבקשה הקודמת. המשתנה `httpStatus` משמש להצגת קוד המצב של הבקשה בניסוי. המעבדה הקטנה אינה משמרת עבודה ממתינה או תוצאות בזמן סיבוב המסך; לחצו GET שוב אחרי החזרה. ניהול בעלות על מצב ו־Repository נלמדים ב[מעבדת HTTP המתקדמת]({{ '/android/topics/08-http-client/' | relative_url }}).

## בונים ומסתכלים על התוצאה

בצעו Build והריצו באמולטור. לחצו **GET available pets**. בתשובה מוצלחת תראו `GET HTTP 200` ומערך JSON באזור התשובה. גללו בתוכו, בחרו טקסט והשוו את שמות השדות ל־Swagger. בעלי החיים עצמם עשויים להיות שונים, כי משתמשים נוספים עובדים עם אותו שרת.

כבו את חיבור הרשת באמולטור ונסו שוב. אמורה להופיע הודעת כשל רשת; הפעילו שוב את הרשת בסיום הניסוי. קוד `404`,‏ `401` או `5xx` מציין תשובת HTTP שהתקבלה. היעזרו בגוף התשובה הגלוי כדי לאבחן אותה.

[הורדת קוד השלב]({{ "/android/topics/petstore-json/downloads/01-get.zip" | relative_url }})

[לשלב הבא: מ־JSON לאובייקטים](../02-objects/)
