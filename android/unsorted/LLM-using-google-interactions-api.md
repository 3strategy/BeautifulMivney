---

layout: page
title: "מדריך: שליחת בקשות LLM עם Interactions API ב-Android (Java)"
date: 2026-08-19 10:00:00 +0300
categories: [Android, AI]
tags: [java, viewbinding, gemini, interactions-api, llm]

---

{: .box-note}
מדריך קצר ופרקטי לשילוב מודלי שפה (LLM) באפליקציית Android ב-Java, בעזרת ה-**Interactions API** החדש של Gemini. הדוגמה מתבססת על **ViewBinding** (ללא שימוש ב-`findViewById`).

הגדרות חשבון ב-Google Developer Console, ניהול מפתחות API ומימוש Cloud Functions מסיבות אבטחה מפורטים **במדריך נפרד**.



## שלב 1: עדכון קובץ ה-Layout (`activity_main.xml`)

נעדכן את ממשק המשתמש כך שיכלול שדה קלט, כפתור שליחה ותצוגת טקסט לתשובת ה-AI.

### לפני (UI בסיסי)

```diff
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      android:padding="16dp">

      <!-- כותרת ראשית של המסך -->
      <TextView
          android:id="@+id/titleText"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="אפליקציה בסיסית"
          android:textSize="20sp" />

  </LinearLayout>

```

### אחרי (עם רכיבי AI)

```diff
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      android:padding="16dp">

      <!-- כותרת ראשית של המסך -->
      <TextView
          android:id="@+id/titleText"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
-         android:text="אפליקציה בסיסית"
+         android:text="צ'אט AI עם Interactions API"
          android:textSize="20sp" />

+     <!-- שדה טקסט להזנת שאלת המשתמש ל-LLM -->
+     <EditText
+         android:id="@+id/promptInput"
+         android:layout_width="match_parent"
+         android:layout_height="wrap_content"
+         android:hint="הקלד שאלה ל-Gemini..." />

+     <!-- כפתור לשליחת הבקשה אל ה-Interactions API -->
+     <Button
+         android:id="@+id/sendButton"
+         android:layout_width="match_parent"
+         android:layout_height="wrap_content"
+         android:text="שלח ל-AI" />

+     <!-- רכיב טקסט להצגת התשובה המוחזרת מהמודל -->
+     <TextView
+         android:id="@+id/responseTextView"
+         android:layout_width="match_parent"
+         android:layout_height="wrap_content"
+         android:paddingTop="16dp"
+         android:textSize="16sp" />

  </LinearLayout>

```

---

## שלב 2: מימוש ב-Java (`MainActivity.java`)

נשתמש ב-ViewBinding כדי לגשת לרכיבי ה-UI ונריץ את קריאת ה-REST מול נקודת הקצה `v1beta/interactions` בשרשור רקע.

```diff
  package com.example.myaiapp;

  import android.os.Bundle;
+ import android.os.Handler;
+ import android.os.Looper;
  import androidx.appcompat.app.AppCompatActivity;
  import com.example.myaiapp.databinding.ActivityMainBinding;
+ import org.json.JSONObject;
+ import java.io.BufferedReader;
+ import java.io.InputStreamReader;
+ import java.io.OutputStream;
+ import java.net.HttpURLConnection;
+ import java.net.URL;
+ import java.nio.charset.StandardCharsets;
+ import java.util.concurrent.ExecutorService;
+ import java.util.concurrent.Executors;

  public class MainActivity extends AppCompatActivity {

      private ActivityMainBinding binding;
+     private final ExecutorService executor = Executors.newSingleThreadExecutor();
+     private final Handler mainHandler = new Handler(Looper.getMainLooper());
+     private static final String API_KEY = "YOUR_GEMINI_API_KEY";

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          // אתחול ViewBinding וביטול הצורך ב-findViewById
          binding = ActivityMainBinding.inflate(getLayoutInflater());
          setContentView(binding.getRoot());

+         // הגדרת מאזין לכפתור השליחה
+         binding.sendButton.setOnClickListener(v -> {
+             String userPrompt = binding.promptInput.getText().toString().trim();
+             if (!userPrompt.isEmpty()) {
+                 sendInteractionRequest(userPrompt);
+             }
+         });
      }

+     /**
+      * שולחת בקשת Interactions API ל-Gemini באופן אסינכרוני ומעדכנת את התצוגה.
+      *
+      * @param prompt הטקסט שנרשם על ידי המשתמש ונשלח אל המודל
+      */
+     private void sendInteractionRequest(String prompt) {
+         // עדכון ה-UI למצב טעינה ונעילת הכפתור למניעת לחיצות כפולות
+         binding.sendButton.setEnabled(false);
+         binding.responseTextView.setText("שולח בקשה ל-Gemini...");
+
+         // הרצת תהליך התקשורת ברקע (Background Thread) למניעת תקיעת ה-UI
+         executor.execute(() -> {
+             String resultText;
+             try {
+                 // יצירת חיבור HTTP לנקודת הקצה של ה-Interactions API
+                 URL url = new URL("https://generativelanguage.googleapis.com/v1beta/interactions?key=" + API_KEY);
+                 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
+                 conn.setRequestMethod("POST");
+                 conn.setRequestProperty("Content-Type", "application/json; utf-8");
+                 conn.setDoOutput(true);
+
+                 // בניית אובייקט ה-JSON בהתאם לתקן ה-Interactions API
+                 JSONObject jsonParam = new JSONObject();
+                 jsonParam.put("model", "gemini-3.7-flash");
+                 jsonParam.put("input", prompt);
+
+                 // כתיבת נתוני הבקשה בקידוד UTF-8 לזרם הנתונים
+                 try (OutputStream os = conn.getOutputStream()) {
+                     byte[] inputBytes = jsonParam.toString().getBytes(StandardCharsets.UTF_8);
+                     os.write(inputBytes, 0, inputBytes.length);
+                 }
+
+                 // בדיקת קוד התגובה משרתי Google
+                 int responseCode = conn.getResponseCode();
+                 if (responseCode == HttpURLConnection.HTTP_OK) {
+                     try (BufferedReader br = new BufferedReader(
+                             new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
+                         StringBuilder response = new StringBuilder();
+                         String responseLine;
+                         while ((responseLine = br.readLine()) != null) {
+                             response.append(responseLine.trim());
+                         }
+                         // חילוץ תשובת המודל מתוך השדה output_text
+                         JSONObject jsonResponse = new JSONObject(response.toString());
+                         resultText = jsonResponse.optString("output_text", "לא התקבלה תשובה.");
+                     }
+                 } else {
+                     resultText = "שגיאת שרת: " + responseCode;
+                 }
+             } catch (Exception e) {
+                 resultText = "שגיאה בתקשורת: " + e.getMessage();
+             }
+
+             // החזרת התוצאה לשרשור ה-UI הראשי (Main Thread) לעדכון הרכיבים
+             final String finalResult = resultText;
+             mainHandler.post(() -> {
+                 binding.responseTextView.setText(finalResult);
+                 binding.sendButton.setEnabled(true);
+             });
+         });
+     }
  }

```

---

השרת שומר את ה-ID של השיחה. כדי להמשיך דיאלוג, מקבלים מהתגובה הראשונה את השדה `id` ומעבירים אותו בבקשה הבאה תחת הפרמטר `previous_interaction_id`:

```diff
  JSONObject jsonParam = new JSONObject();
  jsonParam.put("model", "gemini-3.7-flash");
  jsonParam.put("input", prompt);
+ // המשך שיחה קיימת לפי מזהה האינטראקציה הקודמת
+ jsonParam.put("previous_interaction_id", lastInteractionId);

```