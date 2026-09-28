---
layout: page
title: "Android topics — 09: כשהתשובה הישנה מגיעה אחרונה"
subtitle: "Executor,‏ main thread, ביטול וזהות בקשה ב־ViewModel"
permalink: /android/topics/09-async-races/
lang: he
full-width: true
tags: [Android, Java, concurrency, ViewModel, testing]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [הבסיס: ViewModel ו־Repository]({{ '/android/topics/04-viewmodel-repository/' | relative_url }})

{: .box-success}
בסוף המעבדה שולחים שתי בקשות חופפות: הראשונה איטית (2 שניות), השנייה מהירה (0.4 שניות). התשובה המהירה מציגה `New result`; כשהתשובה הישנה מגיעה אחריה, היא אינה רשאית להחליף את המסך. כפתור Cancel וסיבוב מסך מדגימים את מחזור החיים של העבודה.

התחילו מענף **`codex/viewmodel-repository`** אחרי [מעבדה 04]({{ '/android/topics/04-viewmodel-repository/' | relative_url }}). ענף התוצאה הוא **`codex/async-races`**. שלושת התרחישים הקודמים — ספרים, רשימה ריקה וכישלון פעם אחת עם Retry — ממשיכים לעבוד.

| זמן | בקשה איטית | בקשה מהירה | מה מותר להציג? |
|---:|---:|---:|---:|
| 0.0 שניות | התחילה | התחילה אחריה | טעינה |
| 0.4 שניות | עדיין עובדת | החזירה `New result` | התוצאה החדשה |
| 2.0 שניות | החזירה `Old result` | כבר הסתיימה | עדיין התוצאה החדשה |

`Future.cancel(true)` מבקש לבטל עבודה שעדיין רצה, אך אינו מוחק בהכרח callback שכבר הוצב בתור של ה־main thread. לכן משתמשים גם ב־`generation`: כל פעולה חדשה מקבלת מספר דור, ורק callback שמספרו שווה לדור הנוכחי רשאי לצייר למסך.

## 1. יוצרים מקור תוצאות איטי במכוון

ב־**app > kotlin+java > com.example.topics > FakeBookRepository** הוסיפו מתודה אחרי `load(...)` הקיימת:

```java
/** A controlled blocking source used only on worker threads in the race exercise. */
public String[] loadRace(String label, long delayMs) throws InterruptedException {
    Thread.sleep(delayMs);
    return new String[]{label};
}
```

ה־`sleep` מייצג כאן תשובה איטית, לא פתרון לעבודה אמיתית. אסור לקרוא למתודה זו מה־main thread: המסך יפסיק להגיב. בהמשך ה־ViewModel שולח אותה ל־`ExecutorService` עם שני threads, כדי ששתי הבקשות אכן ירוצו בחפיפה.

## 2. מוסיפים ביטול וזהות בקשה ל־ViewModel

ב־**BooksViewModel** הוסיפו imports של `ExecutorService`,‏ `Executors` ו־`Future`, ואז שדות לצד השדות הקיימים:

```java
private final ExecutorService workers = Executors.newFixedThreadPool(2);
private Future<?> slowRequest;
private Future<?> fastRequest;
private int generation;
```

הוסיפו את הפעולות הציבוריות. ה־ViewModel נשאר בעליו של מצב המסך:

```java
/** Starts two overlapping requests; only the newest may render its result. */
public void startRace() {
    if (currentKind() == BooksUiState.Kind.LOADING) {
        return;
    }
    cancelPendingWork();
    state.setValue(BooksUiState.of(BooksUiState.Kind.LOADING));
    int oldRequest = ++generation;
    slowRequest = submitRace("Old result (2 s)", 2000, oldRequest);
    int newRequest = ++generation;
    fastRequest = submitRace("New result (0.4 s)", 400, newRequest);
}

/** Invalidates callbacks already posted to main as well as canceling worker tasks. */
public void cancel() {
    if (currentKind() != BooksUiState.Kind.LOADING) {
        return;
    }
    generation++;
    cancelPendingWork();
    state.setValue(BooksUiState.of(BooksUiState.Kind.IDLE));
}

private Future<?> submitRace(String label, long delayMs, int requestId) {
    return workers.submit(() -> {
        try {
            String[] books = repository.loadRace(label, delayMs);
            handler.post(() -> {
                if (requestId == generation) {
                    state.setValue(BooksUiState.success(books));
                }
            });
        } catch (InterruptedException interrupted) {
            Thread.currentThread().interrupt();
        }
    });
}
```

`oldRequest` מקבל דור קודם; `newRequest` מקבל דור חדש יותר. התוצאה מחושבת ב־worker, אבל `LiveData.setValue` נקראת רק על ה־main thread. השורה `requestId == generation` היא ההגנה המרכזית: גם אם callback ישן מגיע, הוא אינו משנה את ה־state. ביטול בזמן `sleep` גורם ל־`InterruptedException` ולסיום בלי פרסום תוצאה.

בתחילת `scheduleLoad()` הקיימת הוסיפו `cancelPendingWork();` ו־`generation++;` לפני `state.setValue(LOADING)`. כך לחיצה רגילה על Load אחרי תחרות מבטלת עבודה ישנה ומפסילה callbacks שלה. החליפו את `onCleared()` והוסיפו ניקוי משותף:

```java
@Override
protected void onCleared() {
    generation++;
    cancelPendingWork();
    workers.shutdownNow();
}

private void cancelPendingWork() {
    if (pendingLoad != null) {
        handler.removeCallbacks(pendingLoad);
        pendingLoad = null;
    }
    if (slowRequest != null) {
        slowRequest.cancel(true);
        slowRequest = null;
    }
    if (fastRequest != null) {
        fastRequest.cancel(true);
        fastRequest = null;
    }
}
```

`onCleared()` נקראת כשה־ViewModel באמת מוסר, לא בכל סיבוב מסך. לכן סיבוב בזמן המתנה אינו מבטל את התוצאה; ה־Activity החדשה נרשמת ל־LiveData הקיים. כשה־ViewModel נעלם סופית, משחררים את ה־workers.

## 3. מחברים שני כפתורים למסך הקיים

ב־**app > res > values > strings.xml** שנו את ההסבר והוסיפו שני ערכים:

{% code_diff %}
-    <string name="ui_states_instruction">Choose a response. The fake repository answers after a short delay.</string>
+    <string name="ui_states_instruction">Choose a response or race two requests. The fake repository answers after a delay.</string>
+    <string name="start_race">Start slow, then fast request</string>
+    <string name="cancel_pending">Cancel pending request</string>
{% endcode_diff %}

ב־**app > res > layout > activity_main.xml** הוסיפו אחרי `load_fail_once` שני Buttons: הראשון `id="@+id/start_race"` עם `text="@string/start_race"`, והשני `id="@+id/cancel_pending"` עם `text="@string/cancel_pending"` ו־`visibility="gone"`. לשניהם `layout_width="match_parent"` ו־`layout_height="wrap_content"`. המבנה הקיים של רשימה, מצב ו־Retry נשאר.

ב־**MainActivity** הוסיפו ב־`onCreate` מאזינים, ואחרי `loadFailOnce.setEnabled` ב־`render` הוסיפו את שינויי המצב:

```java
binding.startRace.setOnClickListener(v -> viewModel.startRace());
binding.cancelPending.setOnClickListener(v -> viewModel.cancel());

// In render(BooksUiState state):
binding.startRace.setEnabled(!loading);
binding.cancelPending.setVisibility(loading ? View.VISIBLE : View.GONE);
```

בזמן Loading כפתור Cancel גלוי וכפתורי התחלת הבקשות מושבתים. כשה־state חוזר ל־IDLE או SUCCESS, `render` מסתיר את Cancel אוטומטית.

## 4. מאמתים שלושה מסלולים

ב־**Gradle Scripts > libs.versions.toml** הוסיפו `testCore = "1.7.0"` למקטע `[versions]`, ו־`androidx-test-core = { group = "androidx.test", name = "core", version.ref = "testCore" }` למקטע `[libraries]`. ב־**Gradle Scripts > build.gradle.kts (Module :app)** הוסיפו `androidTestImplementation(libs.androidx.test.core)` לצד Espresso ו־JUnit הקיימים. אל תסירו את בדיקות התבנית.

צרו `AsyncRaceUiTest` ב־**app > kotlin+java > com.example.topics (androidTest)**. בענף התוצאה יש שלוש בדיקות `ActivityScenario` ו־Espresso:

1. לחיצה על Race, המתנה 0.8 שניות ואימות `New result (0.4 s)`; המתנה עד אחרי 2 שניות ואימות שהתוצאה **עדיין** חדשה.
2. לחיצה על Race ומיד Cancel; אחרי 2.4 שניות עדיין מוצג מצב IDLE.
3. לחיצה על Race, `scenario.recreate()` ואז אימות שהתוצאה החדשה מוצגת ב־Activity החדשה.

הריצו `:app:connectedDebugAndroidTest` על אמולטור. אם מסירים זמנית את תנאי `requestId == generation` ומפרסמים תמיד, הניסוי הראשון אמור להציג בסוף `Old result`; החזירו את התנאי והריצו שוב. כך הבדיקה מאמתת את הסיבה שבגללה נוסף מזהה הבקשה.

לקריאה נוספת: [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel), [תהליכים ו־threads ב־Android](https://developer.android.com/guide/components/processes-and-threads).
