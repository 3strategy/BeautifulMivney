---
layout: page
title: "Android topics — 08: מבקשת HTTP למודל Java"
subtitle: "Retrofit,‏ JSON,‏ status,‏ timeout,‏ cancel ו־retry אחראי"
permalink: /android/topics/08-http-client/
lang: he
full-width: true
tags: [Android, Java, HTTP, Retrofit, JSON]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [מעבדת מצבי UI]({{ '/android/topics/03-ui-states-retry/' | relative_url }})

{: .box-success}
בסוף המעבדה מסך Java/XML קטן שולח `GET`, מציג `Todo` שהומר מ־JSON למחלקת Java, מבדיל בין `200`,‏ `404`, כשל רשת ותשובה פגומה, ומאפשר לבטל בקשה. בדיקות JVM משתמשות בשרת מקומי מדומה כדי לא להיות תלויות בשרת הציבורי.

התחילו מ־`master` בפרויקט **topics** (Empty Views Activity עם View Binding). ענף התוצאה הוא `codex/http-client`. השרת הציבורי הוא [JSONPlaceholder](https://jsonplaceholder.typicode.com/), שירות נתוני דמה; דרוש חיבור רשת כדי להפעיל את מסך Android. הבדיקות המקומיות משתמשות ב־`MockWebServer` ופועלות בלי חיבור לשרת זה.

## מתכננים את גבולות האחריות

| חלק | אחריות |
|---:|---:|
| `MainActivity` | לחיצות, טעינה, הצגת תוצאה, ביטול במחזור החיים |
| `TodoRepository` | לקוח HTTP, timeout, המרת תשובות לסוגי תוצאה |
| `TodoApi` | נתיב HTTP,‏ method ופרמטר מזהה |
| `Todo` | השדות הטיפוסיים שמסך זה צריך מתוך ה־JSON |
| `TodoRepositoryTest` | תשובות שרת נשלטות: JSON תקין, 404, שדות חסרים, JSON שבור |

`GET` מבקש נתון ואינו משנה אותו. תשובת `404` היא **תשובת HTTP** מן השרת, לא כשל ברשת. תשובת `200` עם גוף שאינו מתאים למודל היא בעיית נתונים. `timeout` או חוסר חיבור הם כשל העברה. המסך צריך להציג את ההבדלים כדי שאפשר יהיה לאבחן ולבחור אם להציע ניסיון חוזר.

## 1. מוסיפים הרשאה וספריות

ב־**app > manifests > AndroidManifest.xml** הוסיפו לפני `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

ב־**Gradle Scripts > libs.versions.toml** הוסיפו את Retrofit ואת `MockWebServer`. ה־Gson converter ממיר גוף JSON למודל Java; Retrofit משתמש ב־OkHttp לשליחת הבקשה. אחרי העריכה בצעו Gradle Sync.

```toml
[versions]
retrofit = "3.0.0"
mockwebserver = "4.12.0"

[libraries]
retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }
mockwebserver = { group = "com.squareup.okhttp3", name = "mockwebserver", version.ref = "mockwebserver" }
```

אלה שורות להוספה במקטעים הקיימים, לא תחליף לקובץ התבנית. ב־**Gradle Scripts > build.gradle.kts (Module :app)** הוסיפו לשאר התלויות:

```kotlin
implementation(libs.retrofit)
implementation(libs.retrofit.gson)
testImplementation(libs.mockwebserver)
```

`testImplementation` מגביל את השרת המדומה לבדיקות במחשב; הוא אינו נכלל בתור שרת באפליקציה.

## 2. יוצרים מודל Java ונתיב API

ב־**app > kotlin+java > com.example.topics** צרו `Todo.java`. השרת מחזיר עוד פרטים בחלק מהנתיבים, אך כאן צריך רק ארבעה שדות. Gson ממלא אותם מתוך שמות ה־JSON.

```java
package com.example.topics;

/** The small typed subset of a JSONPlaceholder todo that this screen needs. */
public final class Todo {
    public int userId;
    public int id;
    public String title;
    public boolean completed;
}
```

צרו גם `TodoApi.java` באותה חבילה:

```java
package com.example.topics;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

/** Maps one HTTP GET route to a typed response. */
public interface TodoApi {
    @GET("todos/{id}")
    Call<Todo> getTodo(@Path("id") int id);
}
```

למשל `getTodo(1)` יחד עם כתובת הבסיס שולח `GET https://jsonplaceholder.typicode.com/todos/1`. ה־`Call<Todo>` הוא **תיאור של בקשה אחת**; `enqueue` מפעיל אותה ללא חסימת ה־main thread, ו־`cancel()` מבקש לעצור אותה. אין להריץ אותו `Call` פעמיים; Retry יוצר `Call` חדש.

## 3. מפרידים בין כשלי HTTP, רשת ונתונים

צרו `TodoRepository.java` באותה חבילה. ה־Activity מקבלת `Result` מסווג במקום להכיר קוד JSON או להחליט בעצמה מה פירוש סטטוס HTTP. ה־constructor עם `baseUrl` מיועד לבדיקה עם שרת מקומי; ברירת המחדל מיועדת לאפליקציה.

```java
package com.example.topics;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import com.google.gson.JsonParseException;
import com.google.gson.stream.MalformedJsonException;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/** Owns HTTP, JSON conversion, and response classification outside the Activity. */
public final class TodoRepository {
    public enum Kind { SUCCESS, HTTP_ERROR, NETWORK_ERROR, DECODE_ERROR, INVALID_BODY }

    public static final class Result {
        public final Kind kind;
        public final Todo todo;
        public final int status;
        public final String contentType;
        public final String detail;

        private Result(Kind kind, Todo todo, int status, String contentType, String detail) {
            this.kind = kind;
            this.todo = todo;
            this.status = status;
            this.contentType = contentType;
            this.detail = detail;
        }
    }

    public interface Listener {
        void onResult(Result result);
    }

    private final TodoApi api;

    public TodoRepository() {
        this("https://jsonplaceholder.typicode.com/");
    }

    /** Package-visible endpoint override lets a local HTTP server exercise the same code. */
    TodoRepository(String baseUrl) {
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(5, TimeUnit.SECONDS)
                .readTimeout(5, TimeUnit.SECONDS)
                .retryOnConnectionFailure(false)
                .build();
        api = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(TodoApi.class);
    }

    /** Enqueues a GET and returns its cancellable call to the screen owner. */
    public Call<Todo> load(int id, Listener listener) {
        Call<Todo> call = api.getTodo(id);
        call.enqueue(new Callback<>() {
            @Override
            public void onResponse(Call<Todo> ignored, Response<Todo> response) {
                String type = response.headers().get("Content-Type");
                if (!response.isSuccessful()) {
                    listener.onResult(new Result(Kind.HTTP_ERROR, null, response.code(), type, ""));
                } else if (response.body() == null || response.body().id <= 0
                        || response.body().title == null || response.body().title.isBlank()) {
                    listener.onResult(new Result(Kind.INVALID_BODY, null, response.code(), type, ""));
                } else {
                    listener.onResult(new Result(Kind.SUCCESS, response.body(), response.code(), type, ""));
                }
            }

            @Override
            public void onFailure(Call<Todo> failedCall, Throwable error) {
                if (!failedCall.isCanceled()) {
                    boolean badJson = error instanceof MalformedJsonException
                            || error instanceof JsonParseException;
                    listener.onResult(new Result(badJson || !(error instanceof IOException)
                            ? Kind.DECODE_ERROR : Kind.NETWORK_ERROR, null, 0, null,
                            error.getClass().getSimpleName()));
                }
            }
        });
        return call;
    }
}
```

`response.code()` הוא סטטוס, ואילו `Content-Type` הוא header המתאר את סוג הגוף. שניהם שונים מגוף ה־JSON. גם אם השרת החזיר `200`, אנחנו בודקים ש־`id` ו־`title` שהמסך חייב להשתמש בהם אכן התקבלו. `onFailure` יכול להגיע מכשל העברה או מכשל המרה; החריגות הידועות של Gson מסווגות כאן כשגיאת המרה. ביישום גדול יש להגדיר חוזה שגיאות מפורט יותר במקום להציג רק שם חריגה. ביטול יזום אינו מוצג כשגיאת רשת.

## 4. מחברים למסך ובודקים את מחזור החיים

ב־**app > res > values > strings.xml** הוסיפו את הערכים האלה לפני `</resources>`:

```xml
<string name="http_title">HTTP and typed JSON</string>
<string name="http_note">Load a todo, inspect a missing resource, or cancel a pending request.</string>
<string name="load_todo">GET todo 1</string>
<string name="load_missing">GET missing todo</string>
<string name="cancel_request">Cancel request</string>
<string name="retry_request">Retry request</string>
<string name="http_idle">Choose a request.</string>
<string name="http_loading">GET /todos/%1$d …</string>
<string name="http_cancelled">Request cancelled.</string>
<string name="http_success">HTTP %1$d · %2$s</string>
<string name="http_error">HTTP %1$d · %2$s</string>
<string name="http_network_error">Network error: %1$s</string>
<string name="http_decode_error">JSON conversion failed: %1$s</string>
<string name="http_invalid_body">HTTP %1$d, but the JSON is missing required fields.</string>
<string name="todo_detail">Todo #%1$d (user %2$d)\n%3$s\nCompleted: %4$b</string>
```

ב־**app > res > layout > activity_main.xml** השאירו את `ConstraintLayout` החיצוני ואת המזהה `main`. החליפו את `Hello World` ב־`ScrollView` הנמתח לארבע צלעות ההורה, ובתוכו `LinearLayout` אנכי עם: כותרת והסבר; ארבעת הכפתורים לפי סדרם; `ProgressBar` עם `id=loading`;‏ `TextView` עם `id=status` ו־`accessibilityLiveRegion="polite"`; ו־`TextView` עם `id=todo_detail`. הכפתורים Cancel/Retry וה־ProgressBar מתחילים עם `visibility="gone"`. ראו את ה־XML המלא בענף התוצאה; שאר מבנה התבנית נשאר.

ב־`MainActivity` שמרו את שלד View Binding וה־insets הקיים, והוסיפו את השדות והמאזינים הבאים:

```java
private final TodoRepository repository = new TodoRepository();
private Call<Todo> activeCall;
private int generation;
private int lastRequestedId = 1;

// Inside onCreate, after the insets listener:
binding.loadTodo.setOnClickListener(v -> load(1));
binding.loadMissing.setOnClickListener(v -> load(999999));
binding.cancelRequest.setOnClickListener(v -> cancel());
binding.retryRequest.setOnClickListener(v -> load(lastRequestedId));
```

הוסיפו את המתודות הבאות ל־`MainActivity` (ואת imports של `View` ושל `retrofit2.Call`). `load(id)` שומר את המזהה, מגדיל `generation`, מבטל Call קודם אם נותר, מציג טעינה ומשבית לחיצה כפולה. ה־callback חוזר ל־UI ב־`runOnUiThread`; לפני שינוי המסך הוא בודק שהדור עדיין נכון ושה־Activity לא נהרסה.

```java
private void load(int id) {
    lastRequestedId = id;
    generation++;
    if (activeCall != null) {
        activeCall.cancel();
    }
    int expectedGeneration = generation;
    binding.loadTodo.setEnabled(false);
    binding.loadMissing.setEnabled(false);
    binding.cancelRequest.setVisibility(View.VISIBLE);
    binding.retryRequest.setVisibility(View.GONE);
    binding.loading.setVisibility(View.VISIBLE);
    binding.status.setText(getString(R.string.http_loading, id));
    binding.todoDetail.setText("");

    activeCall = repository.load(id, result -> runOnUiThread(() -> {
        if (expectedGeneration != generation || isDestroyed()) {
            return;
        }
        activeCall = null;
        binding.loadTodo.setEnabled(true);
        binding.loadMissing.setEnabled(true);
        binding.cancelRequest.setVisibility(View.GONE);
        binding.loading.setVisibility(View.GONE);
        binding.retryRequest.setVisibility(result.kind == TodoRepository.Kind.NETWORK_ERROR
                || (result.kind == TodoRepository.Kind.HTTP_ERROR && result.status >= 500)
                ? View.VISIBLE : View.GONE);
        switch (result.kind) {
            case SUCCESS:
                binding.status.setText(getString(R.string.http_success, result.status, result.contentType));
                Todo todo = result.todo;
                binding.todoDetail.setText(getString(R.string.todo_detail,
                        todo.id, todo.userId, todo.title, todo.completed));
                break;
            case HTTP_ERROR:
                binding.status.setText(getString(R.string.http_error, result.status, result.contentType));
                break;
            case NETWORK_ERROR:
                binding.status.setText(getString(R.string.http_network_error, result.detail));
                break;
            case DECODE_ERROR:
                binding.status.setText(getString(R.string.http_decode_error, result.detail));
                break;
            case INVALID_BODY:
                binding.status.setText(getString(R.string.http_invalid_body, result.status));
                break;
        }
    }));
}

private void cancel() {
    generation++;
    if (activeCall != null) {
        activeCall.cancel();
        activeCall = null;
    }
    binding.loadTodo.setEnabled(true);
    binding.loadMissing.setEnabled(true);
    binding.cancelRequest.setVisibility(View.GONE);
    binding.loading.setVisibility(View.GONE);
    binding.status.setText(R.string.http_cancelled);
}

@Override
protected void onDestroy() {
    generation++;
    if (activeCall != null) {
        activeCall.cancel();
    }
    super.onDestroy();
}
```

בתשובה מוצלחת מוצגים סטטוס, Content-Type ושדות ה־Todo. ב־404 מוצג הקוד. Retry מוצג רק על כשל רשת או HTTP 5xx; ל־404 או JSON פגום אין הצדקה ל־retry אוטומטי. `cancel()` מגדיל דור, מבטל את ה־Call ומנקה מצב טעינה; `onDestroy()` מבטל כדי שתשובת רשת מאוחרת לא תעדכן Activity ישנה.

## 5. בודקים בלי תלות בשרת הציבורי

ב־**app > kotlin+java > com.example.topics (test)** צרו `TodoRepositoryTest`. הקובץ בענף התוצאה מפעיל `MockWebServer` לפני כל בדיקה ומכבה אותו אחריה. הוא מעביר את `server.url("/")` ל־constructor של ה־Repository, מכניס תשובת `MockResponse`, ממתין ל־callback עם `CountDownLatch`, ובודק את סוג התוצאה:

| תשובת השרת המקומי | תוצאה צפויה |
|---:|---:|
| `200` עם `id`,‏ `title`,‏ `userId`,‏ `completed` | `SUCCESS` ו־`Todo` טיפוסי |
| `404` עם `{}` | `HTTP_ERROR`, קוד 404 |
| `200` עם `{}` | `INVALID_BODY` |
| `200` עם JSON שבור | `DECODE_ERROR` |

הריצו `:app:testDebugUnitTest`. בבדיקה הראשונה בודקים גם שהנתיב שנשלח הוא `/todos/7`; זו בדיקה אמיתית של הרכבת כתובת ה־API, לא רק של המרת ה־JSON. אחרי הבדיקות הריצו את האפליקציה: **GET todo 1** צריך להציג HTTP 200 ו־Todo; **GET missing todo** צריך להציג HTTP 404. כבו זמנית רשת במכשיר כדי לראות כשל העברה, ואז החזירו אותה ונסו Retry. לחצו Cancel לפני תשובה איטית וודאו שתשובה מאוחרת אינה משנה את המסך.

להעמקה: [Android: Connect to the network](https://developer.android.com/develop/connectivity/network-ops/connecting), [Retrofit](https://github.com/square/retrofit), [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
