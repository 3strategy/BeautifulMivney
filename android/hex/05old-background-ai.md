---
layout: page
title: "Hex — 05old (גרסה ישנה): מחשב שעובד ברקע"
subtitle: "קידוד 7×7×3, בחירת מהלך, TFLite ו־Executor"
permalink: /android/hex/05old-background-ai/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }})

{: .box-note}
זו הגרסה המאוחדת הישנה של פרקים 5 ו־6, שנשמרה לעיון ואינה חלק ממסלול הלמידה הנוכחי. במסלול הנוכחי עברו מ[פרק 4]({{ '/android/hex/04-local-two-player/' | relative_url }}) ל[פרק 5]({{ '/android/hex/05-model-preparation/' | relative_url }}) ואז ל[פרק 6]({{ '/android/hex/06-background-ai/' | relative_url }}).


{: .box-success}
**בסוף הפרק:** האדם משחק אדום מול תשובת מחשב כחולה אופליין ממודל בדיקה לא מאומן; התשובה הישנה נפסלת אחרי Restart או שינוי מצב.

## הרעיון

מחשב Hex אינו מקבל "פעולה" ישירה מן הרשת. הוא יוצר עותק לכל מהלך חוקי, משחק בו פעם אחת, ומקודד את היורש מנקודת מבטו של השחקן הבא. לכל תא יש שלושה ערוצים: האבן שלי, אבן היריב, כיוון החיבור שלי. אם המודל מחזיר ליורש `+0.8` עבור היריב, ערך המהלך לבוחר הוא `-0.8`. ניצחון מיידי מקבל `+1` לפי החוקים. `HexAi` בוחרת את המקסימום; `TfliteValueModel` של המורה טוענת ומאמתת את נכס הבדיקה. `ExecutorService` שומר על המסך מגיב, ו־`gameGeneration` פוסל תשובות ממשחק קודם. אין fallback היוריסטי.

{: .box-note}
[הורידו את חבילת המורה]({{ '/android/hex/downloads/05-teacher-bundle.zip' | relative_url }}) ופרשו אותה. העתיקו את `hex_value_v1.tflite` ואת `model_info.json` אל `app > assets` (צרו את התיקייה אם אינה קיימת), ואת `TfliteValueModel.java` אל `app > kotlin+java > com.example.hex`. המודל אינו מאומן; הוא מאפשר לבדוק את חיבור המחשב לאפליקציה בלי לטעון שהוא שחקן חזק.

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים ותלויות לפני קוד שמפנה אליהם; מחלקת חוקים לפני ה־Activity.

### libs.versions.toml

**מיקום:** Gradle Scripts. הוסיפו שורה אחת בכל אזור.

ב־`[versions]`:

```diff
 constraintlayout = "2.2.2"
+tflite = "2.17.0"
```

ב־`[libraries]`:

```diff
 constraintlayout = { group = "androidx.constraintlayout", name = "constraintlayout", version.ref = "constraintlayout" }
+tflite = { group = "org.tensorflow", name = "tensorflow-lite", version.ref = "tflite" }
```

### build.gradle.kts

**מיקום:** Gradle Scripts > build.gradle.kts (Module :app). בתוך `dependencies` הוסיפו:

```diff
     implementation(libs.material)
+    implementation(libs.tflite)
```

### HexGame.java

**מיקום:** app > kotlin+java > com.example.hex. מחלקת החוקים העצמאית. בחנו היכן המשחק משנה מצב והיכן הוא רק קורא אותו.

<details open markdown="1"><summary>השינוי המלא ב־HexGame.java</summary>

```diff
 package com.example.hex;
 
 import java.util.ArrayDeque;
+import java.util.ArrayList;
 import java.util.Arrays;
+import java.util.Collections;
+import java.util.List;
 
-/** The board state and rules, independent of pixels and Android widgets. */
+/**
+ * Stores a 7x7 Hex position and enforces legal play and win detection.
+ *
+ * <p>This class is pure Java and has no Android or rendering dependencies. Red connects the
+ * top and bottom edges; Blue connects the left and right edges.
+ */
 public final class HexGame {
+    /** Number of rows and columns on the square board. */
     public static final int SIZE = 7;
+    /** Total number of cells on the board. */
     public static final int CELL_COUNT = SIZE * SIZE;
+    /** Cell value used for an unoccupied cell and for no winner. */
     public static final int EMPTY = 0;
+    /** Player value for Red, whose goal is to connect top to bottom. */
     public static final int RED = 1;
+    /** Player value for Blue, whose goal is to connect left to right. */
     public static final int BLUE = 2;
 
     private static final int[][] NEIGHBORS = {
             {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}
     };
-    private int winner = EMPTY;
-    private final int[] cells = new int[CELL_COUNT];
-    private int currentPlayer = RED;
 
-    /** Places a stone only when the coordinate is empty and on the board. */
+    private final int[] cells;
+    private int currentPlayer;
+    private int winner;
+    private int moveCount;
+
+    /** Creates an empty position with Red to move first. */
+    public HexGame() {
+        cells = new int[CELL_COUNT];
+        currentPlayer = RED;
+    }
+
+    private HexGame(int[] cells, int currentPlayer, int winner, int moveCount) {
+        this.cells = cells;
+        this.currentPlayer = currentPlayer;
+        this.winner = winner;
+        this.moveCount = moveCount;
+    }
+
+    /**
+     * Recreates a position from row-major cell values.
+     *
+     * @param savedCells exactly 49 values, each {@link #EMPTY}, {@link #RED}, or {@link #BLUE}
+     * @param currentPlayer player that should make the next move
+     * @return an independent game containing a copy of {@code savedCells}
+     * @throws IllegalArgumentException if the board, player, or resulting winners are invalid
+     */
+    public static HexGame restore(int[] savedCells, int currentPlayer) {
+        if (savedCells == null || savedCells.length != CELL_COUNT) {
+            throw new IllegalArgumentException("A Hex board must contain exactly 49 cells");
+        }
+        if (currentPlayer != RED && currentPlayer != BLUE) {
+            throw new IllegalArgumentException("Current player must be RED or BLUE");
+        }
+
+        int[] copy = Arrays.copyOf(savedCells, CELL_COUNT);
+        int moves = 0;
+        for (int cell : copy) {
+            if (cell < EMPTY || cell > BLUE) {
+                throw new IllegalArgumentException("Unknown cell value: " + cell);
+            }
+            if (cell != EMPTY) {
+                moves++;
+            }
+        }
+
+        HexGame game = new HexGame(copy, currentPlayer, EMPTY, moves);
+        boolean redWon = game.hasConnection(RED);
+        boolean blueWon = game.hasConnection(BLUE);
+        if (redWon && blueWon) {
+            throw new IllegalArgumentException("Both players cannot win a legal Hex position");
+        }
+        game.winner = redWon ? RED : blueWon ? BLUE : EMPTY;
+        return game;
+    }
+
+    /**
+     * Creates an independent copy of this position.
+     *
+     * @return a game with the same board, turn, winner, and move count
+     */
+    public HexGame copy() {
+        return new HexGame(Arrays.copyOf(cells, CELL_COUNT), currentPlayer, winner, moveCount);
+    }
+
+    /**
+     * Places the current player's stone and advances the turn.
+     *
+     * <p>TWIN-ID: HEX.APPLY_MOVE
+     *
+     * @param row zero-based board row
+     * @param column zero-based board column
+     * @return {@code true} if the move was played, or {@code false} if the cell is unavailable,
+     *         outside the board, or the game is already over
+     */
     public boolean play(int row, int column) {
-        if (winner != EMPTY || isOutside(row, column)
-                || cells[index(row, column)] != EMPTY) {
+        if (isOutside(row, column) || winner != EMPTY) {
+            return false;
+        }
+        int index = index(row, column);
+        if (cells[index] != EMPTY) {
             return false;
         }
-        cells[index(row, column)] = currentPlayer;
-        if (hasConnection(currentPlayer)) winner = currentPlayer;
+
+        cells[index] = currentPlayer;
+        moveCount++;
+        if (hasConnection(currentPlayer)) {
+            winner = currentPlayer;
+        }
+        // The contract always describes the successor from the next player's
+        // perspective, including terminal successors.
         currentPlayer = otherPlayer(currentPlayer);
         return true;
     }
 
-    /** Searches adjacent stones from the player's first goal edge to the opposite edge. */
+    /**
+     * Lists every legal move in row-major order.
+     *
+     * <p>TWIN-ID: HEX.LEGAL_MOVES
+     *
+     * @return legal moves, or an empty list when the game is over
+     */
+    public List<Move> legalMoves() {
+        if (winner != EMPTY) {
+            return Collections.emptyList();
+        }
+        List<Move> moves = new ArrayList<>(CELL_COUNT - moveCount);
+        for (int i = 0; i < CELL_COUNT; i++) {
+            if (cells[i] == EMPTY) {
+                moves.add(new Move(i / SIZE, i % SIZE));
+            }
+        }
+        return moves;
+    }
+
+    /**
+     * Tests whether a player has connected their two goal edges.
+     *
+     * <p>TWIN-ID: HEX.WIN_CHECK
+     *
+     * @param player {@link #RED} or {@link #BLUE}
+     * @return {@code true} when the player's stones form a complete connection
+     * @throws IllegalArgumentException if {@code player} is not a player value
+     */
     public boolean hasConnection(int player) {
         if (player != RED && player != BLUE) {
             throw new IllegalArgumentException("Player must be RED or BLUE");
         }
+
         boolean[] visited = new boolean[CELL_COUNT];
         ArrayDeque<Integer> frontier = new ArrayDeque<>();
         for (int i = 0; i < SIZE; i++) {
                 frontier.add(start);
             }
         }
+
         while (!frontier.isEmpty()) {
             int position = frontier.removeFirst();
             int row = position / SIZE;
             int column = position % SIZE;
             if ((player == RED && row == SIZE - 1)
-                    || (player == BLUE && column == SIZE - 1)) return true;
+                    || (player == BLUE && column == SIZE - 1)) {
+                return true;
+            }
             for (int[] offset : NEIGHBORS) {
                 int nextRow = row + offset[0];
                 int nextColumn = column + offset[1];
-                if (isOutside(nextRow, nextColumn)) continue;
+                if (isOutside(nextRow, nextColumn)) {
+                    continue;
+                }
                 int next = index(nextRow, nextColumn);
                 if (!visited[next] && cells[next] == player) {
                     visited[next] = true;
         return false;
     }
 
-    /** Returns the winner, or EMPTY before a connection is complete. */
-    public int getWinner() {
-        return winner;
-    }
-
-    /** Returns true when no further moves may be played. */
-    public boolean isOver() {
-        return winner != EMPTY;
+    /**
+     * TWIN-ID: HEX.STATE_ENCODING
+     * Encodes the board for the value model using channels
+     * {@code [own stone, opponent stone, orientation]}. Orientation is 1 for Red to move
+     * (top-to-bottom) and 0 for Blue to move (left-to-right).
+     *
+     * @return a new row-major array containing 49 cells by 3 channels
+     */
+    public float[] encodeForCurrentPlayer() {
+        float[] encoded = new float[CELL_COUNT * 3];
+        int opponent = otherPlayer(currentPlayer);
+        float orientation = currentPlayer == RED ? 1.0f : 0.0f;
+        for (int i = 0; i < CELL_COUNT; i++) {
+            int base = i * 3;
+            encoded[base] = cells[i] == currentPlayer ? 1.0f : 0.0f;
+            encoded[base + 1] = cells[i] == opponent ? 1.0f : 0.0f;
+            encoded[base + 2] = orientation;
+        }
+        return encoded;
     }
 
-    /** Returns the stone at one legal board coordinate. */
+    /**
+     * Returns the value stored at one board coordinate.
+     *
+     * @param row zero-based board row
+     * @param column zero-based board column
+     * @return {@link #EMPTY}, {@link #RED}, or {@link #BLUE}
+     * @throws IndexOutOfBoundsException if the coordinate is outside the board
+     */
     public int getCell(int row, int column) {
         if (isOutside(row, column)) {
             throw new IndexOutOfBoundsException("Cell is outside the 7x7 board");
         return cells[index(row, column)];
     }
 
-    /** Returns a copy rather than exposing the mutable board array. */
+    /**
+     * Copies all board cells in row-major order.
+     *
+     * @return an independent 49-element array
+     */
     public int[] getCells() {
         return Arrays.copyOf(cells, CELL_COUNT);
     }
 
-    /** Returns the player whose turn is next. */
+    /** @return the player that will make the next move */
     public int getCurrentPlayer() {
         return currentPlayer;
     }
 
-    /** Returns the other player. */
+    /** @return the winning player, or {@link #EMPTY} while no player has won */
+    public int getWinner() {
+        return winner;
+    }
+
+    /** @return {@code true} after either player has completed a connection */
+    public boolean isOver() {
+        return winner != EMPTY;
+    }
+
+    /**
+     * Returns the opponent of a player.
+     *
+     * @param player {@link #RED} or {@link #BLUE}
+     * @return the other player
+     * @throws IllegalArgumentException if {@code player} is not a player value
+     */
     public static int otherPlayer(int player) {
-        if (player == RED) return BLUE;
-        if (player == BLUE) return RED;
+        if (player == RED) {
+            return BLUE;
+        }
+        if (player == BLUE) {
+            return RED;
+        }
         throw new IllegalArgumentException("Player must be RED or BLUE");
     }
 
     private static boolean isOutside(int row, int column) {
         return row < 0 || row >= SIZE || column < 0 || column >= SIZE;
     }
+
+    /** Immutable zero-based board coordinate. */
+    public static final class Move {
+        /** Zero-based board row. */
+        public final int row;
+        /** Zero-based board column. */
+        public final int column;
+
+        /**
+         * Creates a move at a board coordinate.
+         *
+         * @param row zero-based board row
+         * @param column zero-based board column
+         * @throws IllegalArgumentException if the coordinate is outside the board
+         */
+        public Move(int row, int column) {
+            if (isOutside(row, column)) {
+                throw new IllegalArgumentException("Move is outside the 7x7 board");
+            }
+            this.row = row;
+            this.column = column;
+        }
+
+        /** @return the coordinate's row-major index */
+        public int index() {
+            return row * SIZE + column;
+        }
+
+        @Override
+        public boolean equals(Object other) {
+            if (!(other instanceof Move)) {
+                return false;
+            }
+            Move move = (Move) other;
+            return row == move.row && column == move.column;
+        }
+
+        @Override
+        public int hashCode() {
+            return index();
+        }
+
+        @Override
+        @SuppressWarnings("NullableProblems")
+        public String toString() {
+            return "(" + row + ", " + column + ")";
+        }
+    }
 }
```

</details>

### ValueModel.java

**מיקום:** app > kotlin+java > com.example.hex. הוסיפו קובץ Java חדש בשם `ValueModel.java`. זהו חוזה קטן: רשימת מצבים מקודדים נכנסת וערך אחד לכל מצב יוצא.

```java
package com.example.hex;

import java.io.Closeable;
import java.util.List;

/** Evaluates encoded Hex states from the encoded current player's perspective. */
public interface ValueModel extends Closeable {
    /**
     * Evaluates a batch of encoded positions.
     *
     * @param encodedStates states encoded by {@link HexGame#encodeForCurrentPlayer()}
     * @return one value per input state, in the same order, where -1 is a loss and 1 is a win
     */
    float[] evaluate(List<float[]> encodedStates);

    /** @return {@code true} for a deliberately untrained integration model */
    boolean isUntrainedMock();
}
```

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

**מיקום:** app > kotlin+java > com.example.hex. העתיקו לכאן את `TfliteValueModel.java` מחבילת המורה שהורדתם. הקובץ חייב להישאר בשם הזה ועם `package com.example.hex;` בראשו. אינכם צריכים להקליד את מחלקת השילוב: היא מממשת את `ValueModel`, בודקת את קובצי המודל ומחזירה ערך לכל מצב. בפרק הזה התמקדו בקידוד, בבחירת המהלך ובהרצה ברקע.

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

**מיקום:** app > assets. זהו קובץ המטא־דאטה מחבילת המורה, לצד `hex_value_v1.tflite`. אין להקליד או לשנות אותו. `untrained_mock: true` מציין שזה מודל בדיקה לחיבור, ו־`sha256` מזהה את קובץ המודל שאליו הוא שייך.

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

בצעו Sync אם שיניתם Gradle,  ואז הפעילו את האפליקציה. שחקו מהלך אדום וחכו לכחול. בזמן שהמחשב מחשב, לחצו Restart או עברו ל־Two players; מהלך ישן לא יופיע במשחק החדש.

**שאלת הבנה:** אם המודל מעריך את מצב היורש כטוב ליריב, איזה סימן יקבל מהלך השחקן הנוכחי?
