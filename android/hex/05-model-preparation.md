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
**בסוף הפרק:** המסך מתנהג כמו בסוף פרק 4: Restart מנקה את הלוח ומתחיל משחק חדש. מחלקת החוקים יכולה להעתיק מצב, להחזיר מהלכים חוקיים ולקודד לוח עבור מודל ערך. קובצי המודל המסופקים נמצאים בפרויקט והקוד נבנה.

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

**מיקום:** app > kotlin+java > com.example.hex. בפרק הזה מוסיפים העתקת מצב, שחזור מצב, רשימת מהלכים חוקיים וקידוד למודל.

המתודות הקיימות `hasConnection`,‏ `getWinner`,‏ `isOver` ושאר מתודות הקריאה נשארות כפי שנכתבו בפרקים 2–3, כולל התיעוד וההערות שלהן. `legalMoves` היא מתודה חדשה ונכנסת בשלמותה לפני התיעוד של `hasConnection`.

הבנאי הרגיל יוצר לוח ריק, והבנאי הפרטי מאפשר ל־`copy` ול־`restore` לקבל מערך משלהן. לכן אתחול השדות עובר לבנאים. `moveCount` סופר מהלכים שהתקבלו; בתוך `play` מוסיפים רק את הגדלת המונה, מיד לאחר הנחת האבן. החלפת התור לאחר מהלך מנצח כבר קיימת מפרק 3, ולכן גם מצב סופי מקודד מנקודת המבט של השחקן הבא.

בצעו את קטעי השינוי לפי הסדר. כל קטע מציג אזור רציף בקובץ; אין צורך להחליף את המחלקה כולה.

```diff
 package com.example.hex;
 
 import java.util.ArrayDeque;
+import java.util.ArrayList;
 import java.util.Arrays;
+import java.util.Collections;
+import java.util.List;
 
 /**
  * Stores a 7x7 Hex position and its game rules.
  *
```

```diff
     private static final int[][] NEIGHBORS = {
             {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}
     };
 
-    private final int[] cells = new int[CELL_COUNT];
-    private int currentPlayer = RED;
-    private int winner = EMPTY;
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
 
     /**
      * Places the current player's stone and advances the turn when the move is legal.
      *
```

```diff
             return false;
         }
 
         cells[index] = currentPlayer;
+        moveCount++;
         if (hasConnection(currentPlayer)) {
             winner = currentPlayer;
         }
         // Advance the turn even after the winning move.
         currentPlayer = otherPlayer(currentPlayer);
         return true;
     }
 
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
     /**
      * Detects a win by searching the player's connected stones between both goal edges.
```

```diff
         // Every reachable stone was checked without finding the goal edge.
         return false;
     }
 
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
+    }
+
     /** @return the winning player, or {@link #EMPTY} while no player has won */
     public int getWinner() {
         return winner;
     }
```

```diff
 
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

לאחר הוספת תלות Gradle בצעו Sync, ואז הפעילו את האפליקציה. שחקו כמה מהלכים במצב המקומי ולחצו Restart: כל האבנים נעלמות, הסטטוס חוזר ל־Red to move, ואפשר להתחיל משחק חדש באבן אדומה. זו אותה התנהגות של פרק 4. בפרק הזה נוסף קוד הכנה בלבד; עדיין אין במסך יריב מחשב או מהלך אוטומטי.

**שאלת הבנה:** למה צריך להעתיק מצב משחק לפני שבודקים בו מהלך אפשרי?

[לשיעור הבא: מחשב שעובד ברקע ←]({{ '/android/hex/06-background-ai/' | relative_url }})
