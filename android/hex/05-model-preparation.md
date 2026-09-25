---
layout: page
title: "Hex — 05: מכינים את המחשב"
subtitle: "העתקי מצב, מהלכים חוקיים וקידוד 7×7×3"
permalink: /android/hex/05-model-preparation/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/04-local-two-player/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/06-background-ai/' | relative_url }})

{: .box-success}
**בסוף הפרק:** המשחק המקומי עדיין עובד. מחלקת החוקים יכולה להעתיק מצב, להחזיר מהלכים חוקיים ולקודד לוח עבור מודל ערך. קובצי המודל המסופקים נמצאים בפרויקט והקוד נבנה.

## הרעיון

כדי להשוות מהלכים, המחשב יצטרך ליצור עותק של מצב המשחק, לשחק בו מהלך חוקי ולקודד את מצב היורש. לכל תא בקידוד יש שלושה ערוצים: האבן שלי, אבן היריב וכיוון החיבור שלי. כאן מכינים את הנתונים ואת חוזה המודל; בפרק 6 נחבר אותם למסך. עדיין לא תופיע תשובת מחשב במשחק.

## מה נכנס למודל, ומה יוצא ממנו? {#value-contract}

למודל אין מסך או צבעי ציור: הוא מקבל את **מצב הלוח ואת זהות השחקן שבתור**, מקודדים כמספרים. לכל אחד מ־49 התאים יש שלושה ערוצים, בסדר קבוע: **אבן שלי, אבן היריב, כיוון החיבור שלי**. ״שלי״ פירושו השחקן שבתור במצב שמקודדים. ערוץ הכיוון זהה בכל התאים: `1` כשאדום בתור, ו־`0` כשכחול בתור.

| מה יש בתא? | הקידוד כשכחול בתור | הקידוד כשאדום בתור |
|---:|---:|---:|
| אבן כחולה | <code dir="ltr">[1, 0, 0]</code> | <code dir="ltr">[0, 1, 1]</code> |
| אבן אדומה | <code dir="ltr">[0, 1, 0]</code> | <code dir="ltr">[1, 0, 1]</code> |
| תא ריק | <code dir="ltr">[0, 0, 0]</code> | <code dir="ltr">[0, 0, 1]</code> |

שתי העמודות מציגות את אותן אבנים מנקודות מבט שונות כדי להסביר את החוזה; אלה אינם שני מהלכים עוקבים. שימו לב שהערוצים של האבנים מתחלפים, וערוץ הכיוון משתנה אפילו בתא ריק. הצבעים אינם משויכים תמיד לאותו ערוץ.

מן הקידוד בגודל <span dir="ltr">7×7×3</span> המודל מחזיר **מספר אחד בתחום <span dir="ltr">[-1, +1]</span> לכל מצב**, מנקודת מבטו של השחקן שבתור: ערך גבוה יותר פירושו הערכה טובה יותר עבורו. זהו ערך של עמדה, ולא מספר התא שכדאי לבחור או רשימה של 49 ציוני מהלכים. בפרק 6 נשתמש בהערכות של כמה מצבי יורש כדי לבחור מהלך אחד.

{: .box-note}
**לפני הקוד:** כחול משחק מהלך בעותק של הלוח. כעת אדום בתור באותו עותק. של מי האבנים בערוץ הראשון שנשלח למודל?

{: .box-note}
[הורידו את חבילת המורה]({{ '/android/hex/downloads/05-teacher-bundle.zip' | relative_url }}) ופרשו אותה. העתיקו את `hex_value_v1.tflite` ואת `model_info.json` אל `app > assets` (צרו את התיקייה אם אינה קיימת). את קובץ ה־Java המסופק נעתיק אחרי שניצור את `ValueModel` בהמשך הפרק. המודל אינו מאומן; הוא מאפשר לבדוק את חיבור המחשב לאפליקציה בלי לטעון שהוא שחקן חזק.

## עורכים את הקבצים

עבדו לפי סדר התלות: הוסיפו את התלות והנכסים, הרחיבו את מחלקת החוקים וצרו את `ValueModel`; בסוף העתיקו את קובץ ה־Java המסופק.

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

### TfliteValueModel.java — קובץ מסופק

**מיקום:** app > kotlin+java > com.example.hex. העתיקו לכאן את `TfliteValueModel.java` מחבילת המורה. היא מממשת את `ValueModel` שיצרתם עכשיו. אין צורך להקליד או לשנות את תוכנה.

## מריצים ומוודאים

בצעו Sync ו, ואז הפעילו את האפליקציה. שחקו כמה מהלכים במצב המקומי ולחצו Restart: המשחק הקיים צריך להמשיך לעבוד. השינוי בפרק הזה הוא בקוד שמתחת למסך, ולכן עדיין לא מופיע יריב מחשב.

**שאלת הבנה:** למה צריך להעתיק מצב משחק לפני שבודקים בו מהלך אפשרי?
