---
layout: page
title: "שואלים LLM — כפתור אחד ותשובה אחת"
subtitle: "דוגמת Java ו־View Binding קטנה עם Firebase AI Logic"
permalink: /android/topics/firebase-ai-logic/he/
lang: he
translation_of: /android/topics/firebase-ai-logic/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, callbacks]
---

[הכנה מאובטחת בצד Google](setup/) · [English]({{ '/android/topics/firebase-ai-logic/' | relative_url }}?lang=en)

לוחצים **Ask LLM**, רואים **Thinking...**, ואז תשובה שנוצרה מוצגת בתווית אחת. מתחברים ל**פרויקט Firebase שלכם עבור האפליקציה השנתית**, במסלול **Spark ללא קישור לחשבון חיוב**, לפי [עמוד ההכנה](setup/).

הקוד שלמטה מתחיל מ־**Empty Views Activity** בשפת **Java**. `com.example.topic` הוא שם החבילה בדוגמה: השתמשו בשם החבילה שלכם בניווט ב־Android Studio ובשורת ה־import של View Binding, ורשמו ב־Firebase את ה־`applicationId` האמיתי של האפליקציה. שומרים על זהות האפליקציה כשהפרויקט השנתי מתפתח. אם באפליקציה השנתית כבר יש מסך משלכם, בצעו תחילה את דוגמת הממשק הקטנה בתרגיל Empty Views, ואחר כך שלבו בה את הכפתור. אין צורך במאגר Git חדש, בטבלת נתונים, במחלקת מודל משלנו או במפענח JSON. משאירים את קוד התבנית והתלויות שאינם קשורים לשינוי. נדרשת רמת API של 24 ומעלה; אם בתבנית כבר מוגדר מינימום גבוה יותר, משאירים אותו.

## נקודת ההתחלה: View Binding כבר מוכן

[הורדת ZIP של תבנית הבסיס עם View Binding]({{ '/android/topics/firebase-ai-logic/downloads/baseline.zip' | relative_url }}). חלצו לתיקייה חדשה, פתחו את תיקיית **Topic3** ב־Android Studio והמתינו לסנכרון Gradle. זו תבנית Empty Views עם View Binding מופעל ועם `MainActivity` שכבר הוסב, כולל השדה `binding`. אין בה הגדרות Firebase או קוד AI. חברו אותה ל**פרויקט Firebase שלכם** לפי עמוד ההכנה; אין לדרוס פרויקט שנתי קיים באמצעות ה־ZIP.

אם יצרתם פרויקט Empty Views משלכם, בצעו קודם את ההסבה המשותפת שלמטה. אם הורדתם את ה־ZIP המוכן או שכבר יש אצלכם View Binding, קראו את ההסבר ו**דלגו על שינויי ההסבה**. משאירים את שם החבילה ואת הגדרות ה־SDK שלכם; החבילה `com.example.topic` ו־API 37 מתארים את הדוגמה להורדה.

{% include android/view-binding.md namespace="com.example.topic" compile_sdk=37 %}

בשני מסלולי ההתחלה צריך להיות כעת השדה `private ActivityMainBinding binding;`, והקריאה ל־`setContentView` צריכה להשתמש ב־`binding.getRoot()`. **בנו והריצו**: מסך Hello World עדיין צריך להופיע. ממשיכים מהמצב הזה.

## 1. כפתור ותווית שאפשר לגלול

ב־**app > res > layout**, פתחו את **activity_main.xml** והחליפו רק את רכיב Hello World בפקדים הבאים. משאירים את ConstraintLayout הראשי ואת המזהה `main`. ה־ScrollView מאפשר לקרוא גם תשובה ארוכה.

```diff
android:layout_height="match_parent"
     tools:context=".MainActivity">

-    <TextView
-        android:layout_width="wrap_content"
+    <Button
+        android:id="@+id/ask_llm"
+        android:layout_width="0dp"
         android:layout_height="wrap_content"
-        android:text="Hello World!"
+        android:layout_margin="16dp"
+        android:text="Ask LLM"
+        app:layout_constraintTop_toTopOf="parent"
+        app:layout_constraintStart_toStartOf="parent"
+        app:layout_constraintEnd_toEndOf="parent" />
+
+    <ScrollView
+        android:layout_width="0dp"
+        android:layout_height="0dp"
+        android:layout_margin="16dp"
+        app:layout_constraintTop_toBottomOf="@id/ask_llm"
         app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent">
+        <TextView
+            android:id="@+id/answer_label"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="The answer will appear here."
+            android:textIsSelectable="true" />
+    </ScrollView>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

View Binding ממירה את מזהי XML בשם `ask_llm` ו־`answer_label` לשדות Java בשם `askLlm` ו־`answerLabel`. מחלקת ה־binding נוצרת אוטומטית; אין לכתוב אותה בעצמנו.

## 2. מחברים את המסך ואת המודל שהוכן

ב־**app > kotlin+java > com.example.topic**, פתחו את **MainActivity** והוסיפו את פקודות ה־import האלה מתחת לקיימות:

```java
import androidx.core.content.ContextCompat;
import com.google.firebase.FirebaseApp;
import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;
import com.google.firebase.ai.FirebaseAI;
import com.google.firebase.ai.GenerativeModel;
import com.google.firebase.ai.java.GenerativeModelFutures;
import com.google.firebase.ai.type.Content;
import com.google.firebase.ai.type.GenerateContentResponse;
import com.google.firebase.ai.type.GenerativeBackend;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
```

אחרי ה־`});` שסוגר את מאזין ה־insets, אתחלו את Firebase, הפעילו את ספק App Check של התרגול וצרו את מעטפת המודל ל־Java:

```java
FirebaseApp.initializeApp(this);
// Use the classroom token registered on the setup page.
FirebaseAppCheck.getInstance().installAppCheckProviderFactory(
        DebugAppCheckProviderFactory.getInstance());
GenerativeModel ai = FirebaseAI.getInstance(GenerativeBackend.googleAI())
        .generativeModel("gemini-3.8-flash");
GenerativeModelFutures model = GenerativeModelFutures.from(ai);
```

שם המודל נלקח מ[רשימת המודלים הנתמכים](https://firebase.google.com/docs/ai-logic/models), שנבדקה ב־25 באוקטובר 2026. בתאריך הזה הוא תומך במסלול Developer API ללא חיוב. אם ייצא משימוש בהמשך, בחרו מודל טקסט נתמך שעדיין מציע גישה במסלול ללא תשלום; אין להפעיל חיוב כדי לבצע את השיעור. אין להעביר מפתח Gemini API לבנאי הזה.

## 3. מוסיפים את פעולת הלחיצה

מיד אחרי אתחול המודל, עדיין בתוך `onCreate`, הוסיפו:

```java
// Android calls this lambda when the user clicks ask_llm.
binding.askLlm.setOnClickListener(v -> {
    binding.answerLabel.setText("Thinking...");
    binding.askLlm.setEnabled(false); // One request at a time.
    Content prompt = new Content.Builder()
            .addText("Explain a callback in two simple sentences.")
            .build();

    // Start asynchronously: future is a handle, not the answer.
    ListenableFuture<GenerateContentResponse> future = model.generateContent(prompt);
    // Attach ONE callback object with TWO possible outcome methods.
    Futures.addCallback(future, new FutureCallback<GenerateContentResponse>() {
        /** Called on success; result is supplied by the callback mechanism. */
        @Override
        public void onSuccess(GenerateContentResponse result) {
            if (isFinishing() || isDestroyed()) return;
            String text = result.getText(); // SDK already decoded the response.
            binding.answerLabel.setText(text != null ? text : "No text returned.");
            binding.askLlm.setEnabled(true);
        }

        /** Called on failure; error describes what went wrong. */
        @Override
        public void onFailure(Throwable error) {
            if (isFinishing() || isDestroyed()) return;
            binding.answerLabel.setText("Request failed: " + error.getMessage());
            binding.askLlm.setEnabled(true);
        }
    }, ContextCompat.getMainExecutor(this)); // Run BOTH callbacks on the UI thread.
    // This click callback ends now; the screen does not wait for the answer.
});
```

**בצעו Build והריצו עכשיו.** אם זאת ההרצה הראשונה עם ספק ה־debug של App Check, רשמו את הטוקן הפרטי שלו כפי שמוסבר בעמוד ההכנה, ואז נסו שוב. לחצו Ask LLM: התווית אמורה להשתנות מיד, והכפתור יחזור להיות זמין אחרי הצלחה או כישלון.

```mermaid
flowchart LR
    A["Click Ask LLM"] --> B["Start request: receive a future"]
    B --> C["Screen stays responsive"]
    B --> D{"Future completes"}
    D -->|success| E["onSuccess: display text"]
    D -->|failure| F["onFailure: display error"]
```

הקריאה `Futures.addCallback` מקבלת שלושה ארגומנטים: **איזה future**, **איזה אובייקט callback**, ו**איזה executor**. מתודות התגובה ירוצו מאוחר יותר ב־main thread, כי בחרנו במפורש `ContextCompat.getMainExecutor(this)`. הבחירה הזאת קובעת היכן יפעלו ה־callbacks; עבודת הרשת נשארת אסינכרונית. הבדיקות `isFinishing` ו־`isDestroyed` מדלגות על עדכון Activity שנסגרה. הדוגמה הכיתתית אינה משמרת בקשה ממתינה בזמן סיבוב המסך; יציאה מהמסך אינה מבטלת פעולה שכבר הגיעה לשרת.

## מנבאים ובודקים

- שנו את ה־prompt כך שיבקש תשובה בעברית. איזו שורה מספקת את טקסט הבקשה ואיזו מציגה את התוצאה?
- כבו את הרשת ונסו פעם אחת. צפו לשגיאה גלויה ולכפתור שחוזר להיות זמין; הפעילו שוב את הרשת בסיום. ניסוח התשובות המוצלחות עשוי להשתנות בין בקשות.
- התשובה ניתנת לבחירה: העתיקו אותה ל־Notepad++ וקראו אותה כטקסט.

1. **האם ה־future הוא התשובה?** לא. הוא מייצג פעולה אסינכרונית; ה־callback מקבל את התוצאה בהמשך.
2. **למה יש שתי מתודות עם Override?** האובייקט האנונימי מסוג `FutureCallback` מממש תגובה להצלחה ותגובה לכישלון. לכל future תימסר אחת משתי התוצאות.
3. **איפה ה־JSON?** ה־SDK מטפל ב־HTTP ומפענח את התשובה ל־`GenerateContentResponse`. המתודה `getText()` מחלצת טקסט מהאובייקט. ב[מעבדת Petstore]({{ '/android/topics/petstore-json/he/' | relative_url }}) אפשר לבדוק בעצמנו את ה־JSON הגולמי.

מקורות: [דוגמת הבקשה ב־Java של Firebase](https://firebase.google.com/docs/ai-logic/get-started?platform=android), [executor ל־main thread באנדרואיד](https://developer.android.com/reference/androidx/core/content/ContextCompat#getMainExecutor(android.content.Context)).
