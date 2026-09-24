---
layout: page
title: "Hex — 06: מחשב שעובד ברקע"
subtitle: "בחירת מהלך, TFLite ו־Executor"
permalink: /android/hex/06-background-ai/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
css: [/assets/css/hex-diagrams.css]
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/05-model-preparation/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/07-supplied-rl-models/' | relative_url }})

{: .box-success}
**בסוף הפרק:** האדם משחק אדום מול תשובת מחשב כחולה ממודל בדיקה לא מאומן. Restart או החלפת מצב פוסלים תשובת מחשב ממשחק קודם.

## הרעיון

`HexAi` בודקת עותק לכל מהלך חוקי ומקודדת את מצב היורש. המודל מעריך את המצב מנקודת מבטו של השחקן הבא, ולכן הופכים את סימן הערך כשחוזרים לנקודת מבטו של בוחר המהלך. ניצחון מיידי מקבל ערך `+1`. העבודה עם המודל רצה ב־`ExecutorService`, ו־`gameGeneration` מונע מתשובה ישנה לשנות משחק שהופעל מחדש. אין כאן מודל מאומן או דירוג של חוזק המשחק.

## איך הערכת מצב הופכת לבחירת מהלך? {#move-selection}

נניח שכחול צריך לבחור מהלך. לכל תא פנוי ניצור עותק של המשחק ונניח בו אבן כחולה. אלה **חלופות של מהלך אחד מאותו מצב**, ולא רצף מהלכים על הלוח האמיתי. בכל עותק התור כבר עבר לאדום, ולכן המודל מחזיר הערכה עבור אדום. כדי להשוות מנקודת המבט של כחול נהפוך את הסימן.

<div markdown="1" class="hex-diagram">

```mermaid
%%{init: {'flowchart': {'rankSpacing': 28, 'nodeSpacing': 30, 'padding': 12}}}%%
%% dir: rtl %%
flowchart TB
    position["המצב הנוכחי"] --> legal["כל המהלכים החוקיים"]
    legal --> copies["עותק נפרד לכל מהלך<br/>והחלת המהלך על העותק"]
    copies --> encoding["קידוד כל יורש<br/>מנקודת המבט של השחקן הבא"]
    encoding --> evaluation["ValueModel.evaluate<br/>ערך אחד לכל יורש"]
    evaluation --> terminal{"לכל מועמד:<br/>האם המהלך ניצח לפי החוקים?"}
    terminal -->|"כן"| exact["ציון מדויק לבוחר המהלך: ‎+1"]
    terminal -->|"לא"| negate["היפוך סימן ערך המודל"]
    exact --> best["בחירת המהלך בעל הציון הגבוה ביותר"]
    negate --> best
```

</div>

בקוד שלנו שולחים את **כל** היורשים להערכה יחד, ואז מחשבים ציון לכל מהלך. אם החוקים קובעים שזה ניצחון מיידי, הציון הוא `+1` גם אם המודל חזה משהו אחר. החוקים מכריעים תוצאה סופית; המודל נחוץ להערכת מצבים שטרם הסתיימו. הבדיקה מסתכלת מהלך אחד קדימה, בלי להמשיך לעץ של תגובות ותגובות־נגד.

המספרים בטבלה הם דוגמה להמחשה, ולא תוצאות שנמדדו במודל המסופק:

| מועמד של כחול | מצב היורש | ערך המודל עבור אדום | ציון עבור כחול |
|---:|---:|---:|---:|
| A | המשחק נמשך | <code dir="ltr">+0.70</code> | <code dir="ltr">-0.70</code> |
| B | המשחק נמשך | <code dir="ltr">-0.40</code> | <code dir="ltr">+0.40</code> |
| C | כחול כבר ניצח | אינו קובע את הציון | <code dir="ltr">+1.00</code> לפי החוקים |

בדוגמה נבחר C. המודל הלא מאומן של הפרק מחזיר אפס לכל מצב; כשאין ניצחון מיידי והציונים שווים, סדר המהלכים החוקיים מכריע את הבחירה. זו בדיקת חיבור, ולא אסטרטגיה שנלמדה.

{: .box-note}
**לפני הקוד:** אילו C לא היה אפשרי, מדוע כחול היה מעדיף את B דווקא כשהמודל מחזיר עבורו מספר קטן יותר?

## עורכים את הקבצים

עבדו לפי הסדר: קודם `HexAi`, אחר כך משאב המסך, ולבסוף `MainActivity`.

### HexAi.java

**מיקום:** app > kotlin+java > com.example.hex. הוסיפו קובץ Java חדש בשם `HexAi.java`. המחשב בודק כל מהלך חוקי פעם אחת; שימו לב ל־copy ולסימן השלילי בערך היורש.

```java
package com.example.hex;

import java.util.ArrayList;
import java.util.List;

/**
 * Chooses computer moves by evaluating every legal one-move successor.
 *
 * <p>There is deliberately no heuristic fallback: callers must provide a validated value model.
 */
public final class HexAi {
    private final ValueModel model;

    /**
     * Creates a move selector backed by the supplied value model.
     *
     * @param model model that evaluates encoded positions from the player-to-move perspective
     * @throws IllegalArgumentException if {@code model} is {@code null}
     */
    public HexAi(ValueModel model) {
        if (model == null) {
            throw new IllegalArgumentException("A validated value model is required");
        }
        this.model = model;
    }

    /**
     * Selects the highest-valued legal move using one-step lookahead.
     *
     * @param position position to evaluate; it is not modified
     * @return the best legal move, or {@code null} if the game is already over
     * @throws IllegalStateException if the model returns the wrong number of values or a
     *                               non-finite value
     */
    public HexGame.Move chooseMove(HexGame position) {
        if (position.isOver()) {
            return null;
        }

        int movingPlayer = position.getCurrentPlayer();
        List<HexGame.Move> legalMoves = position.legalMoves();
        List<HexGame> successors = new ArrayList<>(legalMoves.size());
        List<float[]> modelInputs = new ArrayList<>(legalMoves.size());
        for (HexGame.Move move : legalMoves) {
            HexGame successor = position.copy();
            successor.play(move.row, move.column);
            successors.add(successor);
            modelInputs.add(successor.encodeForCurrentPlayer());
        }

        float[] nextPlayerValues = model.evaluate(modelInputs);
        if (nextPlayerValues.length != legalMoves.size()) {
            throw new IllegalStateException("Model returned the wrong number of values");
        }

        HexGame.Move bestMove = null;
        float bestValue = Float.NEGATIVE_INFINITY;
        for (int i = 0; i < legalMoves.size(); i++) {
            HexGame successor = successors.get(i);
            // A terminal win is exact. Otherwise the successor is encoded for the
            // next player, so negate its value to recover the mover's perspective.
            float moverValue = successor.getWinner() == movingPlayer
                    ? 1.0f
                    : -nextPlayerValues[i];
            if (Float.isNaN(moverValue) || Float.isInfinite(moverValue)) {
                throw new IllegalStateException("Model produced a non-finite value");
            }
            if (bestMove == null || moverValue > bestValue) {
                bestMove = legalMoves.get(i);
                bestValue = moverValue;
            }
        }
        return bestMove;
    }
}
```

### TfliteValueModel.java — קובץ מסופק

**מיקום:** app > kotlin+java > com.example.hex. הקובץ `TfliteValueModel.java` כבר הועתק מחבילת המורה בפרק 5. הקובץ חייב להישאר בשם הזה ועם `package com.example.hex;` בראשו. אינכם צריכים להקליד את מחלקת השילוב: היא מממשת את `ValueModel`, בודקת את קובצי המודל ומחזירה ערך לכל מצב. בפרק הזה התמקדו בבחירת המהלך ובהרצה ברקע.

### activity_main.xml

**מיקום:** app > res > layout. עורכים דרך app > res > layout בתצוגת Code. אין למחוק רכיבי תבנית שאינם ב־diff.

```diff
             android:textColor="@color/muted"
             android:textSize="14sp" />
 
+        <TextView
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:fontFamily="sans-serif-medium"
+            android:letterSpacing="0.1"
+            android:text="@string/mode_label"
+            android:textColor="@color/muted"
+            android:textSize="11sp" />
+
+        <RadioGroup
+            android:id="@+id/modeGroup"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:layout_marginTop="6dp"
+            android:layout_marginBottom="12dp"
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
             android:layout_height="wrap_content"
```

### model_info.json — קובץ מסופק

**מיקום:** app > assets. הקובץ כבר הועתק מחבילת המורה בפרק 5, לצד `hex_value_v1.tflite`. אין להקליד או לשנות אותו. `untrained_mock: true` מציין שזה מודל בדיקה לחיבור, ו־`sha256` מזהה את קובץ המודל שאליו הוא שייך.

### לאיזה משחק שייכת תשובת המחשב? {#background-flow}

המסך צריך להמשיך להגיב גם בזמן שהמודל מחשב. לכן נשלח ל־worker עותק של המשחק ונחזיר את התוצאה ל־UI thread. אבל בינתיים המשתמש יכול ללחוץ Restart: תשובה שהייתה נכונה למשחק הקודם כבר אינה שייכת למשחק שמוצג עכשיו.

<div markdown="1" class="hex-diagram">

```mermaid
%% dir: rtl %%
sequenceDiagram
    participant UI as UI thread — המסך
    participant Worker as Worker — חישוב המהלך
    UI->>UI: העתקת מצב ושמירת מספר משחק 7<br/>הצגת חישוב ונעילת נגיעות בלוח
    UI->>Worker: בקשת מהלך עבור העותק
    alt המשחק נשאר בתוקף
        Worker-->>UI: המהלך שחושב עבור משחק 7
        UI->>UI: בדיקת מספר המשחק ותוקף ה־Activity<br/>החלת המהלך ועדכון התצוגה
    else בוצע Restart
        UI->>UI: מעבר למספר משחק 8 ויצירת משחק חדש<br/>בקשת ביטול החישוב הקודם
        opt תשובה ישנה בכל זאת מגיעה
            Worker-->>UI: המהלך שחושב עבור משחק 7
            UI->>UI: מספר המשחק שונה — התעלמות מהתשובה
        end
    end
```

</div>

`gameGeneration` הוא מספר הדור של המשחק. שומרים אותו כשמתחילים חישוב ומשווים שוב כשמגיעה תשובה. `cancel(true)` מבקשת לעצור את העבודה, אבל בדיקת הדור מגינה גם כאשר תשובה כבר בדרך. ה־worker בוחן עותקים; **רק ה־UI thread מחילה תשובה שאושרה על המשחק החי** ומעדכנת את המסך. בודקים גם שה־Activity עדיין קיימת. החלפת מצב משחק משתמשת באותו עיקרון של התחלה מחדש.

{: .box-note}
**לפני חיבור המסך:** גם אם התא שהמחשב בחר עדיין פנוי לאחר Restart, מדוע אסור להחיל את התשובה הישנה?

### MainActivity.java

**מיקום:** app > kotlin+java > com.example.hex. ה־Activity מחברת בין View Binding, המשחק, הפקדים ועבודת המחשב. השאירו את הקוד שאינו מוצג ב־diff.

<details open markdown="1"><summary>השינוי המלא ב־MainActivity.java</summary>

```diff
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 import com.example.hex.databinding.ActivityMainBinding;
+import java.util.concurrent.ExecutorService;
+import java.util.concurrent.Executors;
+import java.util.concurrent.Future;
 
-/** Connects board taps to the independent game state. */
+/** Coordinates human moves and an offline computer reply. */
 public final class MainActivity extends AppCompatActivity {
     private ActivityMainBinding binding;
     private HexGame game;
+    private TfliteValueModel valueModel;
+    private ExecutorService aiExecutor;
+    private Future<?> aiTask;
+    private boolean vsAi = true;
+    private boolean aiThinking;
+    private boolean modelLoading;
+    private int gameGeneration;
 
     @Override
     protected void onCreate(Bundle savedInstanceState) {
             v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
             return insets;
         });
+        aiExecutor = Executors.newSingleThreadExecutor();
         game = new HexGame();
-        binding.boardView.setGame(game);
         binding.boardView.setOnCellClickListener(this::onCellClicked);
         binding.restartButton.setOnClickListener(view -> restartGame());
+        binding.modeAi.setChecked(true);
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
 
+    private void loadModel() {
+        modelLoading = true;
+        aiExecutor.submit(() -> {
+            TfliteValueModel loaded = null;
+            try {
+                loaded = new TfliteValueModel(getApplicationContext());
+            } catch (Exception ignored) {
+                // The screen will say that the computer is unavailable.
+            }
+            TfliteValueModel result = loaded;
+            runOnUiThread(() -> {
+                if (isFinishing() || isDestroyed()) {
+                    if (result != null) result.close();
+                    return;
+                }
+                valueModel = result;
+                modelLoading = false;
+                render();
+            });
+        });
+    }
+
     private void onCellClicked(int row, int column) {
-        if (game.play(row, column)) {
-            render();
-        }
+        if (aiThinking || game.isOver()
+                || (vsAi && (modelLoading || valueModel == null
+                || game.getCurrentPlayer() != HexGame.RED))) return;
+        if (!game.play(row, column)) return;
+        render();
+        if (vsAi && !game.isOver()) startAiMove();
+    }
+
+    private void startAiMove() {
+        TfliteValueModel model = valueModel;
+        if (!vsAi || model == null || game.isOver()
+                || game.getCurrentPlayer() != HexGame.BLUE || aiThinking) return;
+        aiThinking = true;
+        render();
+        int generation = gameGeneration;
+        HexGame position = game.copy();
+        aiTask = aiExecutor.submit(() -> {
+            try {
+                HexGame.Move move = new HexAi(model).chooseMove(position);
+                runOnUiThread(() -> {
+                    if (isFinishing() || isDestroyed()
+                            || generation != gameGeneration || !aiThinking) return;
+                    aiThinking = false;
+                    if (move != null && game.getCurrentPlayer() == HexGame.BLUE) {
+                        game.play(move.row, move.column);
+                    }
+                    render();
+                });
+            } catch (RuntimeException exception) {
+                runOnUiThread(() -> {
+                    if (isFinishing() || isDestroyed()
+                            || generation != gameGeneration) return;
+                    aiThinking = false;
+                    valueModel = null;
+                    aiExecutor.submit(model::close);
+                    render();
+                });
+            }
+        });
     }
 
     private void restartGame() {
+        gameGeneration++;
+        aiThinking = false;
+        if (aiTask != null) {
+            aiTask.cancel(true);
+            aiTask = null;
+        }
         game = new HexGame();
         render();
     }
 
     private void render() {
         binding.boardView.setGame(game);
-        binding.boardView.setEnabled(!game.isOver());
-        binding.modelText.setText(R.string.model_local);
+        binding.boardView.setEnabled(!aiThinking && !game.isOver()
+                && (!vsAi || (!modelLoading && valueModel != null
+                && game.getCurrentPlayer() == HexGame.RED)));
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
+        binding.modelText.setText(vsAi
+                ? (valueModel == null ? R.string.model_unavailable_help
+                : R.string.model_untrained)
+                : R.string.model_local);
+    }
+
+    @Override
+    protected void onDestroy() {
+        gameGeneration++;
+        if (aiTask != null) aiTask.cancel(true);
+        TfliteValueModel model = valueModel;
+        valueModel = null;
+        if (model != null) aiExecutor.submit(model::close);
+        aiExecutor.shutdown();
+        binding = null;
+        super.onDestroy();
     }
 }
```

</details>

## מריצים ומוודאים

בצעו Sync אם שיניתם Gradle, בנו את הפרויקט (`assembleDebug`) ואז הפעילו את האפליקציה. שחקו מהלך אדום וחכו לכחול. בזמן שהמחשב מחשב, לחצו Restart או עברו ל־Two players; מהלך ישן לא יופיע במשחק החדש.

**שאלת הבנה:** אם המודל מעריך את מצב היורש כטוב ליריב, איזה סימן יקבל מהלך השחקן הנוכחי?
