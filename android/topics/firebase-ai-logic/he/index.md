---
layout: page
title: "Firebase AI Logic (LLM) — 2: כפתור אחד ותשובה אחת"
subtitle: "דוגמת Java ו־View Binding קטנה עם Firebase AI Logic"
permalink: /android/topics/firebase-ai-logic/he/
lang: he
translation_of: /android/topics/firebase-ai-logic/
menu_set: android
full-width: true
tags: [Android, Java, Firebase, AI, callbacks]
---

[חובה קודם: 1 — הכנת הפרויקט](setup/) · [English]({{ '/android/topics/firebase-ai-logic/' | relative_url }}?lang=en)

לתרגול שליחת בקשת HTTP וקריאת JSON, ראו את [מדריך Gemini Interactions API]({{ '/android/unsorted/LLM-using-google-interactions-api/' | relative_url }}?lang=he).

{: .box-warning}
**אין להתחיל את העמוד הזה לפני השלמת [חלק 1 — הכנת הפרויקט](setup/).** שם יוצרים או פותחים את פרויקט Android, מחברים את פרויקט Firebase האישי, מגדירים View Binding, מורידים `google-services.json`, מוסיפים תוסף וספריות ל־Gradle ומאתחלים את Firebase ואת `model`. חוזרים לכאן רק אחרי בדיקת הבנייה שבסיום ההכנה.

{: .box-error}
**כבר בניתם את הממשק, אבל ה־imports של Firebase אדומים?** שמרו את הממשק שלכם. השלימו את [עמוד ההכנה, ובמיוחד את סעיף Gradle](setup/#firebase-sdk), ואז חזרו לכאן. אין צורך להתחיל מחדש או לחזור על הסבת View Binding. מוסיפים כל מקטע אתחול פעם אחת בלבד.

לוחצים **Ask LLM**, רואים **Thinking...**, ואז תשובה שנוצרה מוצגת בתווית אחת. ממשיכים ב**אותה אפליקציה ובפרויקט Firebase האישי שלכם במסלול Spark**, שהוכנו בחלק 1. `com.example.topic` הוא שם החבילה בדוגמה; בניווט השתמשו בחבילה שלכם. אין צורך במאגר נוסף, בטבלת נתונים או במפענח JSON.

{: .box-success}
**נקודת ההתחלה:** ב־Activity כבר יש שדה `binding` ומשתנה מקומי `model` בתוך `onCreate`, אחרי מאזין ה־insets. שניהם עוברים קומפילציה. בעמוד הזה נוסיף את הממשק ואת ה־callback של הבקשה.

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

## 2. מוסיפים את Guava ואת פעולת הלחיצה

ה־callback שנוסיף משתמש במחלקות `Futures` ו־`FutureCallback` מספריית Guava. ב־**Gradle Scripts > libs.versions.toml**, הוסיפו את השורה הראשונה למקטע `[versions]` הקיים ואת השורה השנייה למקטע `[libraries]` הקיים.

```toml
guava = "31.0.1-android"
```

```toml
guava = { module = "com.google.guava:guava", version.ref = "guava" }
```

ב־**Gradle Scripts > build.gradle.kts (Module :app)**, הוסיפו למקטע `dependencies` הקיים:

```kotlin
implementation(libs.guava)
```

{: .box-success}
**בדיקת ביניים — הרצה אחרי הוספת Guava.** סנכרנו את Gradle ולחצו **Run**. ודאו שהכפתור **Ask LLM** והטקסט ההתחלתי **The answer will appear here.** מופיעים. את פעולת הלחיצה תוסיפו בהמשך. אם הסנכרון או פתיחת האפליקציה נכשלים, תקנו את השגיאה לפני שתוסיפו את ה־imports ואת המאזין.

ב־**app > kotlin+java > החבילה שלכם > MainActivity**, הוסיפו רק את ה־imports האלה. משאירים את ה־imports של אתחול Firebase מחלק 1:

```java
import androidx.core.content.ContextCompat;
import com.google.firebase.ai.type.Content;
import com.google.firebase.ai.type.GenerateContentResponse;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
```

מיד אחרי השורה הקיימת `GenerativeModelFutures model = GenerativeModelFutures.from(ai);`, עדיין בתוך `onCreate`, הוסיפו:

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

{: .box-success}
**בנו והריצו עכשיו.** התווית והכפתור צריכים להופיע. לחצו Ask LLM: התווית אמורה להשתנות מיד ל־Thinking, והכפתור יחזור להיות זמין אחרי הצלחה או כישלון.

### הבקשה הראשונה: רושמים את טוקן App Check של ההתקנה
{: #first-request}

{: .box-warning}
**הבקשה הראשונה עשויה להיכשל עד לרישום טוקן ה־debug שלה.** זהו שלב הרשאה בזמן ריצה; הוא אינו גורם ל־imports אדומים ב־Java או לשגיאת קומפילציה ב־Gradle.

1. אחרי הלחיצה הראשונה פתחו **Logcat** וסננו לפי **DebugAppCheckProvider**. העתיקו באופן פרטי את טוקן ה־debug שנוצר.
2. ב**פרויקט Firebase שלכם > Security > App Check > Apps**, פתחו את תפריט שלוש הנקודות של האפליקציה ובחרו **Manage debug tokens**. רשמו שם את הטוקן, או השתמשו בהוראות של Firebase CLI שבהמשך.
3. לחצו שוב **Ask LLM**. התשובה אמורה להחליף את Thinking, בתנאי שה־API זמין ויש מכסה.

<details markdown="1">
<summary>אפשרות נוספת — מתקינים Firebase CLI ורושמים את הטוקן דרך שורת הפקודה</summary>

Firebase CLI מאפשר לעבוד עם פרויקט Firebase משורת הפקודה. בהמשך תוכלו להשתמש בו גם בעבודה עם סוכן תכנות על הפרויקט.

**מתקינים את ה־CLI ב־Windows.** אם Node.js ו־npm כבר מותקנים, דלגו על פקודת WinGet. אחרת התקינו Node.js LTS ב־**Command Prompt** ופתחו חלון Command Prompt חדש בסיום ההתקנה.

```bat
winget install --id OpenJS.NodeJS.LTS --exact
```

התקינו או עדכנו את Firebase CLI ובדקו שהוא מזהה את הפקודה של App Check.

```bat
npm install -g firebase-tools@latest
firebase --version
firebase appcheck:debugtokens:create --help
```

הפקודה נוספה בגרסה **15.25.0** של Firebase CLI. אם גם אחרי העדכון הפקודה אינה מזוהה, הריצו `where firebase` ב־Command Prompt כדי לראות באיזו התקנה Windows משתמש. [מדריך ההתקנה הרשמי](https://firebase.google.com/docs/cli/) · [הערות הגרסה של ה־CLI](https://firebase.google.com/support/release-notes/cli)

**מתחברים עם החשבון של פרויקט Firebase.** בהתחברות הראשונה הריצו `firebase login`. אם ה־CLI כבר מחובר לחשבון Google אחר, הריצו `firebase login:add` והוסיפו את החשבון שאיתו אתם פותחים את הפרויקט במסוף Firebase. אפשר לבדוק אילו חשבונות מחוברים בעזרת `firebase login:list`.

**רושמים את הטוקן מ־Logcat.** בסינון לפי **DebugAppCheckProvider**, חפשו את השורה שמתחילה ב־`firebase appcheck:debugtokens:create`. העתיקו את כל הפקודה בלי התחילית של Logcat והדביקו אותה ישירות ב־**Command Prompt**. הפקודה הבאה מציגה ערכים לדוגמה. הריצו את הפקודה שהאפליקציה שלכם הדפיסה.

```bat
firebase appcheck:debugtokens:create 805-02c4-46f1-b77-8267de --project yearlygs --app 1:31032263:android:c792213f393939922
```

אם מחוברים כמה חשבונות, הוסיפו בסוף הפקודה `--account student@example.com` והחליפו את כתובת הדוגמה בכתובת החשבון של הפרויקט. אם מתקבלת שגיאת HTTP `403`, בדקו שהחשבון שבחרתם יכול לפתוח את הפרויקט המדויק שמופיע ב־`--project` ושיש לו הרשאה לנהל בו טוקני debug של App Check.

חפשו ב־Command Prompt את ההודעה **Successfully registered App Check debug token**. בצילום מופיעים ערכים לדוגמה.

![פלט לדוגמה של Firebase CLI שמאשר רישום מוצלח של טוקן debug ל־App Check]({{ "/android/topics/firebase-ai-logic/images/firebase-cli-debug-token-success-example.png" | relative_url }})

אחרי שהרישום מצליח, חזרו לאפליקציה ולחצו שוב **Ask LLM**. שמרו על פרטיות הטוקן האמיתי והפקודה שמכילה אותו, גם כשאתם נעזרים בסוכן תכנות.

</details>

שמרו את הטוקן באופן פרטי עבור התקנת התרגול שלכם. בטלו אותו כשאינו בשימוש או אם נחשף. [הוראות ספק debug](https://firebase.google.com/docs/app-check/android/debug-provider).

כשהבקשה מצליחה, האפליקציה מציגה את התשובה והכפתור **Ask LLM** חוזר להיות זמין.

![הרצה באמולטור עם תשובה אמיתית וכפתור Ask LLM זמין]({{ "/android/topics/firebase-ai-logic/images/firebase-ai-live-response.png" | relative_url }})

{: .box-error}
**עדיין נכשל בזמן ריצה?** קראו את השגיאה בתווית וב־Logcat: אם Logcat מציג `Failed to exchange debug token` אחרי הרישום, בדקו תחילה שהאמולטור או המכשיר מחובר לאינטרנט. אם כיביתם Wi-Fi לצורך בדיקה, הפעילו אותו מחדש, פתחו מחדש את האפליקציה ולחצו שוב **Ask LLM**. אם השגיאה חוזרת, ודאו שרשמתם את הטוקן ואת מזהה האפליקציה שמופיעים בפקודה הנוכחית ב־Logcat.

{: .box-error}
שגיאות נוספות: `API_KEY_SERVICE_BLOCKED` מצביע על רשימת ה־APIs המותרים למפתח; `404` עשוי להצביע על מודל שאינו זמין; `429` מציין מגבלות מכסה או קיבולת. במקרה של `429` בודקים מכסה וממתינים, ומשאירים את ההגדרה ללא חיוב. השגיאות האלה נפרדות ממחלקות Java שאינן מזוהות.

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
