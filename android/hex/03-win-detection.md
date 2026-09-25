---
layout: page
title: "Hex — 03: חיבור מנצח"
subtitle: "ששת השכנים, חיפוש רוחב וסיום משחק"
permalink: /android/hex/03-win-detection/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
css: [/assets/css/hex-diagrams.css]
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/02-moves-and-turns/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/04-local-two-player/' | relative_url }}) · 


{: .box-success}
**בסוף הפרק:** חיבור אדום מלמעלה למטה או כחול משמאל לימין מוכרז כניצחון, ומשחק נוסף נחסם.

## הרעיון

שכני תא הם ההיסטים `(-1,0)`, `(-1,+1)`, `(0,-1)`, `(0,+1)`, `(+1,-1)`, `(+1,0)`. נתחיל בתאי שפת הפתיחה של השחקן ונעבור בעזרת `ArrayDeque` רק על אבנים מחוברות בצבעו. `visited` מונע ביקור חוזר. אם אדום הגיע לשורה 6 או כחול לעמודה 6, יש מנצח. `play` שומרת את המנצח ואז מחליפה שחקן גם במהלך סופי, כדי שקידוד היורש בפרק 5 יהיה עקבי.

## מהציור לגרף של קשרים {#connection-graph}

מסלול מנצח יכול להתפתל. לכן נחשוב על כל תא כצומת בגרף, ועל שכנות בין תאים כקשר. בזמן חיפוש עבור אדום נעבור רק בין אבנים אדומות; מיקום הפיקסלים של המשושים אינו משתתף בהחלטה.

לפניכם שתי דרכים להציג **את אותן אבנים אדומות**: במקומן על לוח המשושים, וכצמתים בגרף. כל זוג מספרים הוא שורה ועמודה, החל מ־0. בלוח מוצגות רק האבנים האדומות כדי להתמקד בחיבור; הגרף מציג חלק מקשרי השכנות ביניהן. הקשרים העבים בגרף מסמנים מסלול שמגיע משורה 0 לשורה 6.

<div class="two-columns hex-connection-comparison">
<div markdown="1" class="column">

### האבנים על הלוח

![לוח Hex שבו שמונה תאים אדומים תואמים לצומתי הגרף: מסלול משורה 0 לשורה 6 והסתעפות בתא 2, 2]({{ '/android/hex/board-winning-path.svg' | relative_url }})

[פתיחת הלוח כ־SVG ניתן לעריכה]({{ '/android/hex/board-winning-path.svg' | relative_url }})

</div>
<div markdown="1" class="column">

### הקשרים בגרף

<div markdown="1" class="hex-diagram hex-diagram--graph">

```mermaid
%%{init: {'flowchart': {'rankSpacing': 28, 'nodeSpacing': 30, 'padding': 12}}}%%
flowchart TB
    r0["0, 2"] === r1["1, 2"]
    r1 === r2["2, 1"]
    r2 === r3["3, 1"]
    r3 === r4["4, 0"]
    r4 === r5["5, 0"]
    r5 === r6["6, 0"]
    r1 --- branch["2, 2"]
    branch --- r2
    classDef stone fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d,stroke-width:2px;
    class r0,r1,r2,r3,r4,r5,r6,branch stone;
```

</div>

</div>
</div>

עקבו אחר אותם מספרי תאים בשני התרשימים. התא <span dir="ltr">(2, 2)</span> יוצר עם התאים <span dir="ltr">(1, 2)</span> ו־<span dir="ltr">(2, 1)</span> משולש של שכנויות: על הלוח אלה משושים שנוגעים זה בזה, ובגרף אלה שלושה צמתים מחוברים.

מתחילים מכל האבנים האדומות בשורה 0 ומכניסים אותן לתור. בכל צעד מוציאים תא, בודקים אם הגיע לשפת היעד, ומוסיפים שכנים אדומים שטרם ביקרנו בהם. `visited` מונע סיבוב חוזר במעגל, כמו המשולש שמופיע בתרשימים. אם התור התרוקן לפני שהגענו ליעד, אין עדיין חיבור מנצח.

עבור כחול מפעילים אותו רעיון: מתחילים בעמודה 0, עוברים רק בין אבנים כחולות ומחפשים הגעה לעמודה 6.

{: .box-note}
**לפני הקוד:** אם נגדיל את המשושים המצוירים בלי לשנות את האבנים, האם המנצח יכול להשתנות? מה בשני התרשימים מסביר זאת?

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים ותלויות לפני קוד שמפנה אליהם; מחלקת חוקים לפני ה־Activity.

### strings.xml

**מיקום:** app > res > values. המשאב מרכז צבעים, מחרוזות או theme שהמסך משתמש בהם. שנו רק את השורות המוצגות.

```diff
     <string name="board_description">Seven by seven Hex board</string>
     <string name="status_red_turn">Red to move</string>
     <string name="status_blue_turn">Blue to move</string>
+    <string name="status_red_wins">Red wins — top connected to bottom</string>
+    <string name="status_blue_wins">Blue wins — left connected to right</string>
 </resources>
```

### HexGame.java

**מיקום:** app > kotlin+java > com.example.hex. מחלקת החוקים העצמאית. בחנו היכן המשחק משנה מצב והיכן הוא רק קורא אותו.

`play` אינה רק בדיקת רשות: היא דוחה מהלך לא חוקי, אבל אם הוא חוקי היא **מניחה את האבן בלוח**, בודקת אם נוצר ניצחון ומקדמת את התור. `hasConnection` רק קוראת את מצב הלוח כדי לבדוק חיבור; היא אינה מניחה אבן. תנאי `play` מתרחב כדי לדחות גם משחק שכבר הוכרע; השינוי המלא מופיע ב־diff שלהלן.

הוסיפו את השכנויות, את שמירת המנצח ואת חיפוש החיבור. התיעוד הכללי של `play` כבר קיים מפרק 2; כאן מרחיבים את החוקים שהיא מפעילה.

```diff
 package com.example.hex;
 
+import java.util.ArrayDeque;
 import java.util.Arrays;
 
 /**
  * Stores a 7x7 Hex position and its game rules.
```

```diff
     public static final int RED = 1;
     /** Player value for Blue, whose goal is to connect left to right. */
     public static final int BLUE = 2;
 
+    private static final int[][] NEIGHBORS = {
+            {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}
+    };
+
     private final int[] cells = new int[CELL_COUNT];
     private int currentPlayer = RED;
+    private int winner = EMPTY;
 
     /**
      * Places the current player's stone and advances the turn when the move is legal.
      *
```

תחילה הרחיבו את תנאי הדחייה בתחילת `play`:

{% code_diff %}
     public boolean play(int row, int column) {
-        if (isOutside(row, column)) {
+        if (isOutside(row, column) || winner != EMPTY) {
             return false;
         }
         int index = index(row, column);
{% endcode_diff %}

בהמשך `play`, מיד אחרי הנחת האבן, בדקו אם השחקן ניצח. לאחר סיום המתודה הוסיפו את חיפוש החיבור ואת שתי מתודות הקריאה של תוצאת המשחק:

```diff
         if (cells[index] != EMPTY) {
             return false;
         }
 
         cells[index] = currentPlayer;
+        if (hasConnection(currentPlayer)) {
+            winner = currentPlayer;
+        }
+        // Advance the turn even after the winning move.
         currentPlayer = otherPlayer(currentPlayer);
         return true;
     }
 
+    /**
+     * Detects a win by searching the player's connected stones between both goal edges.
+     * <p>TWIN-ID: HEX.WIN_CHECK
+     *
+     * This check reads the board without placing a stone or changing the game state.
+     *
+     * @param player {@link #RED} (top to bottom) or {@link #BLUE} (left to right)
+     * @return {@code true} if the player's stones connect their two goal edges
+     * @throws IllegalArgumentException if {@code player} is neither RED nor BLUE
+     */
+    public boolean hasConnection(int player) {
+        // A win check requires one of the two actual players.
+        if (player != RED && player != BLUE) {
+            throw new IllegalArgumentException("Player must be RED or BLUE");
+        }
+
+        // Mark cells when queued so each stone is examined at most once.
+        boolean[] visited = new boolean[CELL_COUNT];
+        // Breadth-first search: cells waiting to be examined.
+        ArrayDeque<Integer> frontier = new ArrayDeque<>();
+        // Seed every stone on the player's starting edge.
+        for (int i = 0; i < SIZE; i++) {
+            // Red starts on row 0; Blue starts on column 0.
+            int row = player == RED ? 0 : i;
+            int column = player == RED ? i : 0;
+            int start = index(row, column);
+            // Empty and opposing cells cannot begin this player's path.
+            if (cells[start] == player) {
+                visited[start] = true;
+                frontier.add(start);
+            }
+        }
+
+        // Expand the connected region until it reaches the goal or runs out.
+        while (!frontier.isEmpty()) {
+            int position = frontier.removeFirst();
+            // Convert the one-dimensional cell index back to board coordinates.
+            int row = position / SIZE;
+            int column = position % SIZE;
+            // The opposite edge completes Red's vertical or Blue's horizontal path.
+            if ((player == RED && row == SIZE - 1)
+                    || (player == BLUE && column == SIZE - 1)) {
+                return true;
+            }
+            // Follow only the six neighboring cells on the Hex grid.
+            for (int[] offset : NEIGHBORS) {
+                int nextRow = row + offset[0];
+                int nextColumn = column + offset[1];
+                // Ignore coordinates outside the board before computing an index.
+                if (isOutside(nextRow, nextColumn)) {
+                    continue;
+                }
+                int next = index(nextRow, nextColumn);
+                // An unvisited stone of this color extends the connected path.
+                if (!visited[next] && cells[next] == player) {
+                    visited[next] = true;
+                    frontier.addLast(next);
+                }
+            }
+        }
+        // Every reachable stone was checked without finding the goal edge.
+        return false;
+    }
+
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
     /**
      * Returns the value stored at one board coordinate.
```

### MainActivity.java

**מיקום:** app > kotlin+java > com.example.hex. ה־Activity מחברת בין View Binding, המשחק, הפקדים ועבודת המחשב. השאירו את הקוד שאינו מוצג ב־diff.

```diff
 
     private void render() {
         binding.boardView.setGame(game);
-        binding.statusText.setText(game.getCurrentPlayer() == HexGame.RED
-                ? R.string.status_red_turn : R.string.status_blue_turn);
+        binding.boardView.setEnabled(!game.isOver());
+        if (game.getWinner() == HexGame.RED) {
+            binding.statusText.setText(R.string.status_red_wins);
+        } else if (game.getWinner() == HexGame.BLUE) {
+            binding.statusText.setText(R.string.status_blue_wins);
+        } else {
+            binding.statusText.setText(game.getCurrentPlayer() == HexGame.RED
+                    ? R.string.status_red_turn : R.string.status_blue_turn);
+        }
     }
 }
```

## מריצים ומוודאים

בצעו Sync אם שיניתם Gradle,  ואז הפעילו את האפליקציה. שחקו מסלול אדום ומסלול כחול בשני משחקים. אחרי הודעת הניצחון, נגיעה נוספת לא מניחה אבן.

**שאלת הבנה:** למה אבנים שנראות סמוכות על המסך חייבות להיבדק לפי ששת ההיסטים?

[לשיעור הבא: משחק מקומי שלם ←]({{ '/android/hex/04-local-two-player/' | relative_url }})
