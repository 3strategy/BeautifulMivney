---
layout: page
title: "Hex — 06: מחשב שעובד ברקע"
subtitle: "בחירת מהלך עם מודל ערך"
permalink: /android/hex5/06-background-ai/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex5/05-model-preparation/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
**בסוף הפרק:** האדם משחק אדום מול מחשב שמשחק כחול. `HexAi` מעריכה כל מהלך חוקי בעותק נפרד. `ExecutorService` מריצה את המחשבה ברקע.

## כך בוחרים מהלך {#move-selection}

לכל תא פנוי יוצרים מצב יורש: עותק של הלוח אחרי מהלך כחול. המודל מחזיר ערך עבור השחקן שבתור במצב היורש, כלומר אדום. הופכים את סימן הערך כדי לדרג את המהלך מנקודת המבט של כחול. חיבור מנצח נבחר מיד.

## מפת העריכות בפרק

נקודת ההתחלה היא **סוף פרק 5**: משחק מקומי עם Restart, ומחלקות `HexGame`,‏ `ValueModel` ו־`TfliteValueModel` שכבר נבנות. המודל שבנכסי האפליקציה מתאים ללוח 7×7, ולכן השאירו בפרק הזה את `new HexGame()` עם גודל ברירת המחדל.

| קובץ | מיקום בתצוגת Android | מה עושים? |
|---:|---:|---:|
| `HexAi.java` | app > kotlin+java > com.example.hex | יוצרים מחלקה חדשה ובוחרים מהלך בעזרת המודל. |
| `strings.xml` | app > res > values | מוסיפים מחרוזות בתוך `<resources>`. |
| `activity_main.xml` | app > res > layout | מוסיפים תווית ו־`RadioGroup` בין כותרת המשנה לכרטיס הסטטוס. |
| `MainActivity.java` | app > kotlin+java > com.example.hex | מוסיפים שדות ומתודות, ועורכים את `onCreate`,‏ `onCellClicked`,‏ `restartGame` ו־`render` הקיימות. |

{: .box-note}
**איך קוראים את קטעי הקוד:** ב־diff מוסיפים את שורות `+`, מסירים את שורות `-`, ומשאירים את שורות ההקשר ואת הקוד שאינו מוצג. אין להקליד את סימני ה־diff. בלוק Java של מתודה חדשה כולל את המתודה כולה; מוסיפים אותה **בתוך המחלקה, מחוץ לכל מתודה אחרת**, במקום המצוין לפני הבלוק.

## 1. יוצרים את `HexAi.java`

**מיקום:** app > kotlin+java > com.example.hex. לחצו על החבילה ובחרו **New > Java Class**, בשם `HexAi`. זהו קובץ חדש; כתבו בו את הקוד המלא הבא:

~~~java
package com.example.hex;

/** Chooses a move by evaluating every legal one-move successor. */
public final class HexAi {
    private final ValueModel model;

    /** Creates a chooser that evaluates each candidate position with the supplied model. */
    public HexAi(ValueModel model) {
        this.model = model;
    }

    /**
     * Compares copied positions so the visible game remains unchanged.
     *
     * @param position position to evaluate without modifying it
     * @return the best legal move, or null if no legal move remains
     */
    public HexGame.Move chooseMove(HexGame position) {
        HexGame.Move bestMove = null;
        float bestValue = Float.NEGATIVE_INFINITY;

        for (HexGame.Move move : position.legalMoves()) {
            // Play this candidate on its own copy of the current position.
            HexGame successor = position.copy();
            successor.play(move.row, move.column);

            // A move that connects the sides wins immediately.
            if (successor.isOver()) return move;

            // The model sees the next player, so reverse its score for this player.
            float value = -model.evaluate(successor.encodeForCurrentPlayer());
            if (value > bestValue) {
                bestMove = move;
                bestValue = value;
            }
        }
        return bestMove;
    }
}
~~~

## 2. מוסיפים מחרוזות ב־`strings.xml`

**מיקום:** app > res > values > strings.xml. מצאו את `model_local` שנוספה בפרק 4. הוסיפו אחריה את המחרוזות הבאות, **בתוך `<resources>`**, לפני מחרוזות התור שכבר קיימות:

~~~diff
     <string name="model_local">Local two-player game</string>
+    <string name="mode_label">GAME MODE</string>
+    <string name="human_vs_ai">Human vs Computer</string>
+    <string name="human_vs_human">Two players</string>
+    <string name="ai_unavailable">Computer model unavailable</string>
+    <string name="status_model_loading">Loading computer player…</string>
+    <string name="status_ai_thinking">Blue computer is thinking…</string>
+    <string name="status_your_turn">Your turn — Red</string>
+    <string name="model_unavailable_help">Choose Two players to keep playing</string>
+    <string name="model_loading">Loading model…</string>
+    <string name="model_ready">Value model v1 · fully offline</string>
     <string name="status_red_turn">Red to move</string>
     <string name="status_blue_turn">Blue to move</string>
~~~

## 3. מוסיפים בחירת מצב ב־`activity_main.xml`

**מיקום:** app > res > layout > activity_main.xml, בתצוגת **Code**. מצאו את ה־`TextView` שמציג `@string/subtitle`. מיד אחרי `/>` שסוגר אותו, **לפני `MaterialCardView` של הסטטוס**, הוסיפו את התווית ואת קבוצת הבחירה. שניהם ילדים של ה־`LinearLayout` החיצוני שב־`ScrollView`:

~~~diff
             android:text="@string/subtitle"
             android:textColor="@color/muted"
             android:textSize="14sp" />

+        <TextView
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/mode_label" />
+
+        <RadioGroup
+            android:id="@+id/modeGroup"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:orientation="horizontal">
+
+            <com.google.android.material.radiobutton.MaterialRadioButton
+                android:id="@+id/modeAi"
+                android:layout_width="0dp"
+                android:layout_height="wrap_content"
+                android:layout_weight="1"
+                android:checked="true"
+                android:text="@string/human_vs_ai" />
+
+            <com.google.android.material.radiobutton.MaterialRadioButton
+                android:id="@+id/modeHuman"
+                android:layout_width="0dp"
+                android:layout_height="wrap_content"
+                android:layout_weight="1"
+                android:text="@string/human_vs_human" />
+        </RadioGroup>
+
         <com.google.android.material.card.MaterialCardView
             android:layout_width="match_parent"
~~~

בנו את הפרויקט כעת כדי ש־View Binding יכיר את `modeGroup`,‏ `modeAi` ו־`modeHuman`. הבחירה עדיין אינה משנה את המשחק; נחבר את המאזין בסעיף הבא.

## 4. עורכים את `MainActivity.java` {#main-activity}

**מיקום לכל הסעיפים הבאים:** app > kotlin+java > com.example.hex > MainActivity.java. נשארים באותו קובץ עד סוף הפרק. המתודות `onCreate`,‏ `onCellClicked`,‏ `restartGame` ו־`render` כבר קיימות; ערכו אותן לפי קטעי ההקשר. לכל מתודה חדשה מצוין גם היכן להוסיף אותה.

### 4.1. ייבוא ושדות — בראש הקובץ

אחרי הייבוא הקיים של `ActivityMainBinding`, ולפני ההצהרה על המחלקה, הוסיפו את שני הייבואים:

~~~diff
 import com.example.hex.databinding.ActivityMainBinding;
+
+import java.util.concurrent.ExecutorService;
+import java.util.concurrent.Executors;
~~~

בתוך המחלקה, מיד אחרי השדות הקיימים `binding` ו־`game` ולפני התיעוד של `onCreate`, הוסיפו את שדות המחשב:

~~~diff
     private ActivityMainBinding binding;
     private HexGame game;
+    private TfliteValueModel valueModel;
+    private ExecutorService aiExecutor;
+    private boolean vsAi = true;
+    private boolean modelLoading;
+    private boolean aiThinking;
+    // A result belongs only to the board position that requested it.
+    private volatile int positionRevision;
~~~

`aiExecutor` מריצה משימות בזו אחר זו בתהליכון רקע אחד. `positionRevision` מזהה את מצב הלוח שעבורו התבקש מהלך; שינוי מצב יפסול תשובה ישנה. `volatile` מאפשר גם לתהליכון הרקע לראות את הערך המעודכן.

### 4.2. `onCreate` — חיבור הפקדים הקיימים והחדשים

מצאו בסוף `onCreate` את השורה `game = new HexGame();`. מיד לפניה מסתיים מאזין ה־insets ב־`});`. הוסיפו את השורות המסומנות בתוך `onCreate`; שורות חיבור הלוח ו־Restart כבר קיימות מפרקים 2 ו־4:

~~~diff
             return insets;
         });

+        aiExecutor = Executors.newSingleThreadExecutor();
         game = new HexGame();
+        binding.modeAi.setChecked(vsAi);
+        binding.modeHuman.setChecked(!vsAi);
         binding.boardView.setGame(game);
         binding.boardView.setOnCellClickListener(this::onCellClicked);
         binding.restartButton.setOnClickListener(view -> restartGame());
+        binding.modeGroup.setOnCheckedChangeListener((group, checkedId) -> {
+            boolean requestedAi = checkedId == R.id.modeAi;
+            if (requestedAi != vsAi) {
+                vsAi = requestedAi;
+                restartGame();
+            }
+        });
+        loadModel();
         render();
     }
~~~

המאתחל יוצר את ה־worker לפני שמגישים אליו משימה. בחירת מצב מעדכנת את `vsAi` ואז מתחילה משחק חדש. הקריאה האחרונה ל־`render()` נשארת בתוך `onCreate`, אחרי `loadModel()`.

### 4.3. `loadModel` — מתודה חדשה אחרי `onCreate`

הוסיפו את המתודה הבאה **אחרי הסוגר שסוגר את `onCreate` ולפני התיעוד של `onCellClicked`**. קובץ המודל הנטען בפרק זה מקודד ללוח 7×7:

~~~java
/** Loads the single 7x7 model while the screen remains responsive. */
private void loadModel() {
    modelLoading = true;
    aiExecutor.execute(() -> {
        TfliteValueModel loaded = null;
        try {
            loaded = new TfliteValueModel(getApplicationContext());
        } catch (Exception ignored) {
            // render() displays that the computer is unavailable.
        }
        TfliteValueModel result = loaded;
        runOnUiThread(() -> {
            if (isFinishing() || isDestroyed()) {
                if (result != null) result.close();
                return;
            }
            valueModel = result;
            modelLoading = false;
            render();
        });
    });
}
~~~

טעינת המודל מתבצעת ברקע. את שינוי השדות ואת רענון המסך עושים בתוך `runOnUiThread`. אם המסך כבר נסגר, סוגרים את המודל שזה עתה נטען במקום למסור אותו למסך שנסגר.

### 4.4. `onCellClicked` — אחרי מהלך חוקי של האדם

מצאו את `onCellClicked` הקיימת. הוסיפו את `positionChanged()` **בתוך `if (game.play(...))`, לפני `render()`**, ואת בקשת מהלך המחשב מיד אחרי `render()`, באותו `if`:

~~~diff
     private void onCellClicked(int row, int column) {
         if (game.play(row, column)) {
+            positionChanged();
             render();
+            if (vsAi && !game.isOver()) requestComputerMove();
         }
     }
~~~

כך נגיעה בתא תפוס אינה מפעילה את המחשב. אחרי מהלך חוקי, מבקשים תשובה רק במצב אדם מול מחשב וכשהמשחק עדיין לא הסתיים.

### 4.5. שלוש מתודות חדשות — בין `onCellClicked` ל־`restartGame`

אחרי הסוגר שסוגר את `onCellClicked`, **לפני התיעוד של `restartGame`**, הוסיפו את `requestComputerMove`, אחריה את `finishComputerMove`, ואחריה את `positionChanged`. שלושתן מתודות של `MainActivity`, באותה רמת הזחה כמו `onCellClicked`.

ב־`requestComputerMove` שומרים עותק משחק ומספר גרסה לפני תחילת העבודה:

~~~java
/** Evaluates a copied position on the background worker. */
private void requestComputerMove() {
    aiThinking = true;
    render();
    int revision = positionRevision;
    HexGame position = game.copy();
    TfliteValueModel model = valueModel;

    aiExecutor.execute(() -> {
        try {
            HexGame.Move move = new HexAi(model).chooseMove(position);
            runOnUiThread(() -> finishComputerMove(revision, model, move, false));
        } catch (RuntimeException exception) {
            runOnUiThread(() -> finishComputerMove(revision, model, null, true));
        }
    });
}
~~~

מיד אחרי `requestComputerMove`, הוסיפו את שתי המתודות הבאות. `finishComputerMove` מקבלת את התוצאה בתהליכון המסך. מספר גרסה שונה פירושו שהלוח השתנה בינתיים; במקרה כזה התוצאה אינה מוחלת:

~~~java
/** Applies a result only while it still belongs to the displayed board. */
private void finishComputerMove(int revision, TfliteValueModel model,
                                HexGame.Move move, boolean failed) {
    if (revision != positionRevision) return;
    aiThinking = false;
    if (failed) {
        valueModel = null;
        // Queue cleanup after inference has finished on the same worker.
        aiExecutor.execute(model::close);
    } else {
        game.play(move.row, move.column);
        positionChanged();
    }
    render();
}

/** A changed board makes earlier background results obsolete. */
private void positionChanged() {
    positionRevision++;
    aiThinking = false;
}
~~~

### 4.6. `restartGame` — פוסלים תשובה מהמשחק הקודם

מצאו את `restartGame` הקיימת והוסיפו קריאה אחת **אחרי `game = new HexGame();` ולפני `render();`**:

~~~diff
     private void restartGame() {
         game = new HexGame();
+        positionChanged();
         render();
     }
~~~

אותו Restart מופעל גם בלחיצה על הכפתור וגם בהחלפת מצב המשחק. בשני המקרים תשובה שנחשבה עבור הלוח הקודם נפסלת.

### 4.7. `render` — זמינות מגע ושתי שורות הטקסט

בצעו את שלוש העריכות הבאות **בתוך `render` הקיימת**. כל קטע מציג את השורות שעוזרות לאתר את מקום העריכה.

**א. בתחילת `render`, מיד אחרי `setGame(game)`:** חשבו אם מותר לאדם לגעת בלוח והחליפו את התנאי שהיה בתוך `setEnabled`. במצב שני שחקנים כל תור פתוח למגע; במצב מחשב ממתינים לטעינה ולתורו של אדום:

{% code_diff %}
     private void render() {
         binding.boardView.setGame(game);
-        binding.boardView.setEnabled(!game.isOver());
+        boolean canTap = !aiThinking && !game.isOver()
+                && (!vsAi || (!modelLoading && valueModel != null
+                && game.getCurrentPlayer() == HexGame.RED));
+        binding.boardView.setEnabled(canTap);
         binding.modelText.setText(R.string.model_local);
{% endcode_diff %}

**ב. מיד אחרי `setEnabled(canTap)`:** החליפו את השורה היחידה שמציגה תמיד `model_local` בשרשרת הבאה. זהו עדכון של `modelText`, שורת פרטי המודל, והוא מסתיים לפני תנאי הניצחון הקיים:

~~~diff
         binding.boardView.setEnabled(canTap);
-        binding.modelText.setText(R.string.model_local);
+        if (!vsAi) {
+            binding.modelText.setText(R.string.model_local);
+        } else if (modelLoading) {
+            binding.modelText.setText(R.string.model_loading);
+        } else if (valueModel == null) {
+            binding.modelText.setText(R.string.model_unavailable_help);
+        } else {
+            binding.modelText.setText(R.string.model_ready);
+        }
         if (game.getWinner() == HexGame.RED) {
             binding.statusText.setText(R.string.status_red_wins);
~~~

**ג. בהמשך `render`, בתוך שרשרת תנאי הסטטוס:** אחרי ענף הניצחון של כחול ולפני ה־`else` שמציג את התור המקומי, הוסיפו את מצבי המחשב. תנאי הניצחון נשארים ראשונים, כדי שהודעת ניצחון תופיע גם כשזה היה תור מחשב:

~~~diff
         if (game.getWinner() == HexGame.RED) {
             binding.statusText.setText(R.string.status_red_wins);
         } else if (game.getWinner() == HexGame.BLUE) {
             binding.statusText.setText(R.string.status_blue_wins);
+        } else if (vsAi && modelLoading) {
+            binding.statusText.setText(R.string.status_model_loading);
+        } else if (vsAi && valueModel == null) {
+            binding.statusText.setText(R.string.ai_unavailable);
+        } else if (aiThinking) {
+            binding.statusText.setText(R.string.status_ai_thinking);
+        } else if (vsAi) {
+            binding.statusText.setText(R.string.status_your_turn);
         } else {
             binding.statusText.setText(game.getCurrentPlayer() == HexGame.RED
                     ? R.string.status_red_turn : R.string.status_blue_turn);
         }
     }
~~~

### 4.8. `onDestroy` — מתודה חדשה בסוף המחלקה

בסוף `MainActivity.java`, **אחרי הסוגר שסוגר את `render` ולפני הסוגר האחרון של המחלקה**, הוסיפו את המתודה המלאה הבאה, כולל `@Override`. אם התבנית שלכם כבר כוללת `onDestroy`, ערכו את גוף המתודה הקיימת לפי הקוד הזה, כך שתהיה רק מתודה אחת בשם זה:

~~~java
/** Invalidates pending results and releases the model after background work. */
@Override
protected void onDestroy() {
    positionChanged();
    TfliteValueModel model = valueModel;
    if (model != null) aiExecutor.execute(model::close);
    aiExecutor.shutdown();
    super.onDestroy();
}
~~~

גם חישוב מהלך וגם סגירת המודל משתמשים באותו worker. לכן הסגירה מחכה לחישוב שכבר התחיל, ו־`shutdown()` מאפשר למשימות שהוגשו להסתיים. `positionChanged()` פוסלת את תשובת החישוב לפני שהיא תנסה לעדכן את המסך.

## מריצים ומוודאים {#verify-background-ai}

בנו את הפרויקט והפעילו את האפליקציה. בפרק הזה אין שינוי נוסף ב־Gradle; הספרייה וקובץ המודל נוספו בפרק 5.

1. בפתיחת המסך נבחר **Human vs Computer**. אחרי הטעינה מופיעים `Your turn — Red` ו־`Value model v1 · fully offline`.
2. שחקו באדום. בזמן החישוב הלוח חסום למגע ומופיע `Blue computer is thinking…`. לאחר התשובה יש אבן כחולה והתור חוזר לאדום.
3. לחצו **Restart game** בזמן משחק, וגם בזמן חישוב אם הספקתם. הלוח החדש ריק; תשובה שנחשבה עבור הלוח הקודם אינה מניחה בו אבן.
4. עברו ל־**Two players**. המשחק מתחיל מחדש, `modelText` מציגה `Local two-player game`, ושני האנשים משחקים בתורות. חזרו למצב מחשב ובדקו שאדום שוב מתחיל.
5. השלימו משחק. הודעת הניצחון נשארת מוצגת ונגיעה נוספת אינה מניחה אבן.

### אם הקוד או התוצאה נראים שונים

| מה רואים? | מה בודקים? |
|---:|---:|
| `binding.modeGroup`,‏ `modeAi` או `modeHuman` אינם מוכרים | שלושת המזהים חייבים להופיע ב־`activity_main.xml` שב־app > res > layout. בנו שוב את הפרויקט אחרי סעיף 3. |
| שגיאת תחביר ליד `private void loadModel` או מתודה חדשה אחרת | המתודה צריכה להופיע אחרי הסוגר של המתודה הקודמת, בתוך `MainActivity`. אין להכניס הצהרת מתודה לתוך `onCreate` או לתוך מאזין. |
| המחשב משחק גם אחרי נגיעה בתא תפוס | הקריאה ל־`requestComputerMove()` צריכה להיות בתוך `if (game.play(...))`, כפי שמוצג בסעיף 4.4. |
| `modelText` מציגה תמיד משחק מקומי | החליפו את הקריאה היחידה ל־`setText(model_local)` בתוך `render` בשרשרת שבסעיף 4.7ב. |
| תשובה ישנה מופיעה אחרי Restart | ודאו ש־`restartGame` קוראת ל־`positionChanged()` וש־`finishComputerMove` בודקת את `revision` לפני שינוי הלוח. |
| מופיע `Computer model unavailable` | בדקו את מיקום `hex_value_v1.tflite` ואת הגדרת LiteRT מפרק 5. אפשר לבחור **Two players** כדי להמשיך במשחק המקומי. |

**שאלת הבנה:** מדוע `positionChanged()` חייבת להיקרא גם אחרי מהלך חוקי וגם אחרי יצירת משחק חדש?

[לשיעור הבא: בחירת מודל לפי גודל הלוח ←]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }})
