---
layout: page
title: "Hex — 03: חיבור מנצח"
subtitle: "ששת השכנים, חיפוש רוחב וסיום משחק"
permalink: /android/hex/03-win-detection/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/02-moves-and-turns/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/04-local-two-player/' | relative_url }}) · 


{: .box-success}
**בסוף הפרק:** חיבור אדום מלמעלה למטה או כחול משמאל לימין מוכרז כניצחון, ומשחק נוסף נחסם.

## הרעיון

שכני תא הם ההיסטים `(-1,0)`, `(-1,+1)`, `(0,-1)`, `(0,+1)`, `(+1,-1)`, `(+1,0)`. נתחיל בתאי שפת הפתיחה של השחקן ונעבור בעזרת `ArrayDeque` רק על אבנים מחוברות בצבעו. `visited` מונע ביקור חוזר. אם אדום הגיע לשורה 6 או כחול לעמודה 6, יש מנצח. `play` שומרת את המנצח ואז מחליפה שחקן גם במהלך סופי, כדי שקידוד היורש בפרק 5 יהיה עקבי.

## מתחילים מהמצב שעבד

המשיכו בפרויקט שבו השלמתם את פרק 2. השאירו ללא שינוי קובצי תבנית שאינם מוזכרים כאן. שורות `-` ב־diff מוחלפות ב־`+`; שורות הקשר נשארות. קובץ חדש מוצג במלואו.

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים ותלויות לפני קוד שמפנה אליהם; מחלקת חוקים לפני ה־Activity. במעבר על diff אל תקלידו את סמלי `+` ו־`-` עצמם.

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

תנאי `play` מתרחב כדי לדחות גם משחק שכבר הוכרע; השינוי המלא מופיע ב־diff שלהלן.

```diff
 package com.example.hex;
 
+import java.util.ArrayDeque;
 import java.util.Arrays;
 
 /** The board state and rules, independent of pixels and Android widgets. */
     public static final int RED = 1;
     public static final int BLUE = 2;
 
+    private static final int[][] NEIGHBORS = {
+            {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}
+    };
+    private int winner = EMPTY;
     private final int[] cells = new int[CELL_COUNT];
     private int currentPlayer = RED;
 
     /** Places a stone only when the coordinate is empty and on the board. */
     public boolean play(int row, int column) {
-        if (isOutside(row, column) || cells[index(row, column)] != EMPTY) {
+        if (winner != EMPTY || isOutside(row, column)
+                || cells[index(row, column)] != EMPTY) {
             return false;
         }
         cells[index(row, column)] = currentPlayer;
+        if (hasConnection(currentPlayer)) winner = currentPlayer;
         currentPlayer = otherPlayer(currentPlayer);
         return true;
     }
 
+    /** Searches adjacent stones from the player's first goal edge to the opposite edge. */
+    public boolean hasConnection(int player) {
+        if (player != RED && player != BLUE) {
+            throw new IllegalArgumentException("Player must be RED or BLUE");
+        }
+        boolean[] visited = new boolean[CELL_COUNT];
+        ArrayDeque<Integer> frontier = new ArrayDeque<>();
+        for (int i = 0; i < SIZE; i++) {
+            int row = player == RED ? 0 : i;
+            int column = player == RED ? i : 0;
+            int start = index(row, column);
+            if (cells[start] == player) {
+                visited[start] = true;
+                frontier.add(start);
+            }
+        }
+        while (!frontier.isEmpty()) {
+            int position = frontier.removeFirst();
+            int row = position / SIZE;
+            int column = position % SIZE;
+            if ((player == RED && row == SIZE - 1)
+                    || (player == BLUE && column == SIZE - 1)) return true;
+            for (int[] offset : NEIGHBORS) {
+                int nextRow = row + offset[0];
+                int nextColumn = column + offset[1];
+                if (isOutside(nextRow, nextColumn)) continue;
+                int next = index(nextRow, nextColumn);
+                if (!visited[next] && cells[next] == player) {
+                    visited[next] = true;
+                    frontier.addLast(next);
+                }
+            }
+        }
+        return false;
+    }
+
+    /** Returns the winner, or EMPTY before a connection is complete. */
+    public int getWinner() {
+        return winner;
+    }
+
+    /** Returns true when no further moves may be played. */
+    public boolean isOver() {
+        return winner != EMPTY;
+    }
+
     /** Returns the stone at one legal board coordinate. */
     public int getCell(int row, int column) {
         if (isOutside(row, column)) {
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

בצעו Sync אם שיניתם Gradle, בנו את הפרויקט (`assembleDebug`) ואז הפעילו את האפליקציה. שחקו מסלול אדום ומסלול כחול בשני משחקים. אחרי הודעת הניצחון, נגיעה נוספת לא מניחה אבן.

**שאלת הבנה:** למה אבנים שנראות סמוכות על המסך חייבות להיבדק לפי ששת ההיסטים?
