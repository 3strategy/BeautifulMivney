---
layout: page
title: "Android topics — 06: מאתרים תקלה לפי ראיות"
subtitle: "Build,‏ Logcat,‏ debugger,‏ Layout Inspector ו־Network Inspector"
permalink: /android/topics/06-systematic-debugging/
lang: he
full-width: true
tags: [Android, Java, debugging, Logcat]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }})

{: .box-warning}
ענף המעבדה **`codex/debugging-lab` מכיל תקלות מכוונות**. הוא מתחיל מ־`master` ומוסיף חמישה כפתורי אבחון. שניים מהם מפילים או מקפיאים את האפליקציה לפי דרישה. השתמשו בו רק כמעבדת תרגול, ובסיום החזירו את התיקונים בענף משלכם.

## קודם מסווגים את הסימפטום

| סימפטום | ראיה ראשונה | שאלה לבדיקה |
|---:|---:|---:|
| Build נכשל | שגיאת Gradle/Java הראשונה, קובץ ושורה | האם המחלקה, המשאב או התחביר קיימים? |
| האפליקציה נסגרת בלחיצה | Logcat:‏ `FATAL EXCEPTION` ו־`Caused by` | איזו שורה שלנו התחילה את השרשרת? |
| המסך אינו מגיב | השהיית UI, thread dump או התראת ANR | איזו עבודה רצה על ה־main thread? |
| התוצאה שגויה אך האפליקציה חיה | breakpoint, ערכי משתנים ו־watches | באיזה צעד ערך הביניים נעשה שגוי? |
| הכפתור נראה אבל לא מגיב | Layout Inspector ועץ ה־Views | איזה View נמצא מעליו ומקבל מגע? |
| בקשה נכשלת או מחזירה תשובה מפתיעה | Network Inspector ו־Logcat | האם נשלחה בקשה, לאן, ומה חזר? |

הסדר חשוב: תארו **מה קרה**, כתבו השערה שניתן להפריך, אספו ראיה אחת, ורק אז שנו שורת קוד. הודעת שגיאה מאוחרת היא לעיתים תוצאה של הסיבה המוקדמת.

## 1. בונים את מעבדת האבחון

ב־**app > manifests > AndroidManifest.xml** הוסיפו הרשאת רשת לפני `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

ב־**app > res > values > strings.xml** הוסיפו את הערכים הבאים לפני `</resources>`. הערך `price_result` כולל `10%%`, כי ב־string resource המשתמש ב־format, סימן אחוז כפול מדפיס `%` אחד.

```xml
<string name="debug_title">Diagnostic lab</string>
<string name="debug_instruction">Each button exposes a different kind of fault. The crash and freeze are intentional.</string>
<string name="logic_bug">Wrong discount</string>
<string name="crash_bug">Crash: invalid draft ID</string>
<string name="freeze_bug">Block main thread for 7 seconds</string>
<string name="network_request">Inspect HTTPS request</string>
<string name="layout_bug">Button hidden by a transparent View</string>
<string name="debug_idle">Choose a diagnostic case.</string>
<string name="price_result">10%% off 50 should be 45; app shows %1$d</string>
<string name="network_status">HTTPS status: %1$d</string>
<string name="network_error">Network request failed: %1$s</string>
<string name="layout_tapped">The covered button received a click.</string>
```

ב־**app > res > layout > activity_main.xml** השאירו את `ConstraintLayout` החיצוני עם המזהה `main` (מאזין ה־insets ב־Activity תלוי בו). החליפו רק את ה־`TextView` הפנימי ב־`ScrollView` ובתוכו `LinearLayout` אנכי: כותרת, הסבר, ארבעה כפתורים עם המזהים `logic_bug`,‏ `crash_bug`,‏ `freeze_bug`,‏ `network_request`, ואז `FrameLayout` ו־`TextView` עם המזהה `status`. ה־ScrollView נמתח לכל ארבעת צדי ההורה. המבנה החדש בתוך ה־ConstraintLayout הוא:

```xml
<ScrollView
    android:layout_width="0dp"
    android:layout_height="0dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="24dp">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/debug_title"
            android:textSize="24sp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="@string/debug_instruction" />

        <Button
            android:id="@+id/logic_bug"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:text="@string/logic_bug" />

        <Button
            android:id="@+id/crash_bug"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/crash_bug" />

        <Button
            android:id="@+id/freeze_bug"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/freeze_bug" />

        <Button
            android:id="@+id/network_request"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/network_request" />

        <FrameLayout
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:layout_marginTop="8dp">

            <Button
                android:id="@+id/layout_bug"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:text="@string/layout_bug" />

            <View
                android:id="@+id/transparent_overlay"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="#00FFFFFF"
                android:clickable="true" />
        </FrameLayout>

        <TextView
            android:id="@+id/status"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:text="@string/debug_idle"
            android:textSize="18sp" />
    </LinearLayout>
</ScrollView>
```

ה־View השקוף מצויר אחרי הכפתור, נמצא מעליו ומקבל מגע. זו תקלה מכוונת: הכפתור *נראה* תקין אך אינו נלחץ.

ב־**app > kotlin+java > com.example.topics > MainActivity** הוסיפו מאזיני לחיצה אחרי `ViewCompat.setOnApplyWindowInsetsListener(...)`. השאירו את קריאת `EdgeToEdge`, ניפוח ה־Binding וה־insets של התבנית. הוסיפו imports ל־`SystemClock`,‏ `Log`,‏ `IOException`,‏ `URL`,‏ `ExecutorService`,‏ `Executors` ו־`HttpsURLConnection`.

```java
private static final String TAG = "DiagnosticLab";
private ActivityMainBinding binding;
private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();

// Inside onCreate, after the insets listener:
binding.logicBug.setOnClickListener(v -> showWrongPrice());
binding.crashBug.setOnClickListener(v -> openInvalidDraft());
binding.freezeBug.setOnClickListener(v -> SystemClock.sleep(7000));
binding.networkRequest.setOnClickListener(v -> requestExample());
binding.layoutBug.setOnClickListener(v -> binding.status.setText(R.string.layout_tapped));
```

הוסיפו את שלוש המתודות ואת `onDestroy` כפי שמופיעים בענף. שורות המפתח בכל תרחיש הן:

```java
private void showWrongPrice() {
    int price = 50;
    int discount = price * 10 / 100;
    int total = price + discount; // Intentional logic bug for the debugger exercise.
    binding.status.setText(getString(R.string.price_result, total));
    Log.d(TAG, "price=" + price + ", discount=" + discount + ", total=" + total);
}

private void openInvalidDraft() {
    try {
        Integer.parseInt("draft-7");
    } catch (NumberFormatException error) {
        throw new IllegalStateException("Draft ID is invalid", error);
    }
}
```

`requestExample()` מבצעת GET אל `https://example.com/` באמצעות `HttpsURLConnection` בתוך `networkExecutor`, עם timeout של 3 שניות לחיבור ולקריאה. היא קוראת `getResponseCode()`, כותבת ל־Logcat את סטטוס ה־HTTP, מעדכנת `binding.status` ב־`runOnUiThread`, וסוגרת את החיבור ב־`finally`. אין לכתוב לרכיבי UI ישירות מתוך thread הרשת. הוסיפו גם אותה ואת שחרור ה־executor:

```java
private void requestExample() {
    networkExecutor.execute(() -> {
        HttpsURLConnection connection = null;
        try {
            connection = (HttpsURLConnection) new URL("https://example.com/").openConnection();
            connection.setConnectTimeout(3000);
            connection.setReadTimeout(3000);
            int status = connection.getResponseCode();
            Log.d(TAG, "HTTPS status=" + status);
            runOnUiThread(() -> {
                if (!isFinishing() && !isDestroyed()) {
                    binding.status.setText(getString(R.string.network_status, status));
                }
            });
        } catch (IOException error) {
            Log.e(TAG, "HTTPS request failed", error);
            runOnUiThread(() -> {
                if (!isFinishing() && !isDestroyed()) {
                    binding.status.setText(getString(R.string.network_error, error.getMessage()));
                }
            });
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    });
}

@Override
protected void onDestroy() {
    networkExecutor.shutdownNow();
    super.onDestroy();
}
```

## 2. חמישה ניסויים, חמש ראיות

1. **שגיאת Build:** כתבו זמנית `binding.logicBugg` במקום `binding.logicBug`, הריצו Build וקראו את השגיאה הראשונה (`cannot find symbol`). החזירו את האיות לפני המשך המעבדה. אין טעם לחפש Stack trace ב־Logcat כשה־APK כלל לא נבנה.
2. **באג לוגי:** לחצו **Wrong discount**. במקום 45 מופיע 55. קבעו breakpoint בשורת `int total`, הפעילו **Debug**, ולחצו שוב. בחלון Variables או Watches בדקו `price`,‏ `discount` ו־`price + discount`. החליפו את `+` ב־`-`, והריצו שוב: התוצאה 45. ה־Logcat עם הסינון `tag:DiagnosticLab` הוא ראיה משלימה, לא תחליף לבדיקה של ערכי הביניים.
3. **קריסה:** לחצו **Crash: invalid draft ID**, וסננו ב־Logcat לפי `package:mine` או `FATAL EXCEPTION`. מצאו `IllegalStateException: Draft ID is invalid`, ואז את ה־`Caused by: NumberFormatException` ואת השורה ב־`openInvalidDraft`. השורה הראשונה בראש ה־stack trace לא בהכרח מקור התקלה. כאן הקלט `draft-7` אינו מספר; תיקון אפשרי הוא לבדוק קלט לפני `parseInt` ולהציג הודעה במקום לזרוק חריגה. הפעילו מחדש את האפליקציה אחרי הקריסה.
4. **קיפאון/ANR:** לחצו **Block main thread for 7 seconds**. נסו לגלול בזמן ההשהיה. ב־debugger עצרו את התהליך ובדקו שה־main thread נמצא ב־`SystemClock.sleep`. מכשירים שונים עשויים להציג או לא להציג דיאלוג ANR בשבע השניות האלה; עצם חוסר התגובה הוא הראיה הקבועה. העבירו עבודה ממושכת ל־thread רקע והחזירו ל־main thread רק עדכון UI.
5. **View מעל הכפתור:** לחצו **Button hidden by a transparent View**. `status` לא משתנה. פתחו **Tools > Layout Inspector** בזמן שהאפליקציה רצה, בחרו את האפליקציה ומצאו ב־Component Tree את `layout_bug` ואת `transparent_overlay` באותו `FrameLayout`. לשניהם אותו שטח, ול־overlay יש `clickable=true`. מחקו את ה־overlay או בטלו את קליטת המגע שלו, ואז ודאו שהטקסט משתנה.
6. **רשת:** פתחו **View > Tool Windows > App Inspection > Network Inspector** לפני לחיצה על **Inspect HTTPS request**. בדקו בקשה ל־`example.com`, סטטוס וזמן. באמולטור המחובר לרשת מתקבל בדרך כלל 200; אם הרשת כבויה, בדקו את שורת השגיאה ב־Logcat ובמסך. ה־Inspector מציג כאן `HttpsURLConnection`, סוג חיבור שהוא יודע למדוד; בקשה תקינה אינה מבטיחה שהתגובה היא מה שהאפליקציה מצפה לו.

## 3. מסכמים אבחון בר־בדיקה

לכל תקלה כתבו ארבע שורות: **סימפטום**, **השערה**, **ראיה** (ערך, צילום Inspector או שורת stack trace), **תיקון ובדיקה חוזרת**. אל תשאירו בענף תרגול שמיועד למסירה את כפתורי הקריסה והקיפאון. בנו והריצו אחרי כל תיקון, כדי שהראיה אכן קשורה לשינוי האחרון.

מקורות להרחבה: [Logcat](https://developer.android.com/studio/debug/logcat), [Layout Inspector](https://developer.android.com/studio/debug/layout-inspector), [Network Inspector](https://developer.android.com/studio/debug/network-profiler).
