---
layout: page
title: "Hex — 05: מכינים את המחשב"
subtitle: "מצב מועמד, קידוד לוח ו־LiteRT"
permalink: /android/hex5/05-model-preparation/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex5/04-local-two-player/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא]({{ '/android/hex5/06-background-ai/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
**בסוף הפרק:** `HexGame` מעתיקה מצב, מחזירה מהלכים חוקיים ומקודדת לוח בגודל <span dir="ltr">7×7×3</span>. `TfliteValueModel` מריצה קובץ `.tflite` יחיד באמצעות LiteRT 2.2.0. המסך נשאר משחק לשני שחקנים; בפרק הבא נחבר את המחשב.

## מצב לוח וערך

כדי להשוות מהלכים, המחשב ייצור עותק לכל מהלך חוקי. כל עותק מכיל את הלוח אחרי המהלך ואת תור השחקן הבא. אנחנו מקודדים כל תא בשלושה ערוצים: **אבן שלי, אבן היריב, כיוון החיבור שלי**. ערוץ הכיוון הוא `1` כשאדום בתור ו־`0` כשכחול בתור.

| מה יש בתא? | כחול בתור | אדום בתור |
|---|---:|---:|
| אבן כחולה | <code dir="ltr">[1, 0, 0]</code> | <code dir="ltr">[0, 1, 1]</code> |
| אבן אדומה | <code dir="ltr">[0, 1, 0]</code> | <code dir="ltr">[1, 0, 1]</code> |
| תא ריק | <code dir="ltr">[0, 0, 0]</code> | <code dir="ltr">[0, 0, 1]</code> |

המודל מקבל 147 מספרים ומחזיר ערך אחד עבור השחקן שבתור. ערך גבוה מציין עמדה טובה יותר; המודל אינו מחזיר תא או רשימת ציונים.

{: .box-note}
**שימו לב:** אם כחול הניח אבן בעותק, עכשיו אדום בתור. הערוץ הראשון בקידוד מייצג את האבנים של אדום.

[הורידו את חבילת המודל]({{ '/android/hex5/downloads/05-teacher-bundle.zip' | relative_url }}), פרשו אותה והעתיקו את `hex_value_v1.tflite` אל `app/src/main/assets`. צרו את תיקיית `assets` אם אינה קיימת. האפליקציה משתמשת בקובץ המודל בלבד.

## מוסיפים את LiteRT

ב־`gradle/libs.versions.toml`, הוסיפו את גרסת הספרייה תחת `[versions]` ואת הספרייה תחת `[libraries]`:

```diff
 constraintlayout = "2.2.2"
+litert = "2.2.0"
```

```diff
 constraintlayout = { group = "androidx.constraintlayout", name = "constraintlayout", version.ref = "constraintlayout" }
+litert = { group = "com.google.ai.edge.litert", name = "litert", version.ref = "litert" }
```

ב־`app/build.gradle.kts`, בתוך `dependencies`, הוסיפו:

```diff
     implementation(libs.material)
+    implementation(libs.litert)
```

ב־`gradle.properties`, הוסיפו:

```properties
# LiteRT and LiteRT API publish the same package namespace.
android.uniquePackageNames=false
```

## מכינים עותק ורשימת מהלכים

ב־`HexGame.java`, הוסיפו את ה־imports ואת מונה המהלכים:

```diff
 import java.util.ArrayDeque;
+import java.util.ArrayList;
 import java.util.Arrays;
+import java.util.Collections;
+import java.util.List;
```

```diff
     private int currentPlayer = RED;
     private int winner = EMPTY;
+    /** Keeps the legal-move list sized to the number of empty cells. */
+    private int moveCount;
```

הוסיפו את `copy` אחרי השדות. העותק מקבל מערך תאים משלו:

```java
/** Copies the board and turn for a candidate move. */
public HexGame copy() {
    HexGame copy = new HexGame(size);
    System.arraycopy(cells, 0, copy.cells, 0, cells.length);
    copy.currentPlayer = currentPlayer;
    copy.winner = winner;
    copy.moveCount = moveCount;
    return copy;
}
```

בתוך `play`, אחרי הנחת האבן, ספרו את המהלך:

```diff
         cells[index] = currentPlayer;
+        moveCount++;
```

הוסיפו את `legalMoves` אחרי `play`. סריקת התאים לפי אינדקס יוצרת מהלכים לפי שורות:

```java
/** Lists every empty cell while the game is active. */
public List<Move> legalMoves() {
    if (isOver()) return Collections.emptyList();

    List<Move> moves = new ArrayList<>(cells.length - moveCount);
    for (int i = 0; i < cells.length; i++) {
        if (cells[i] == EMPTY) moves.add(new Move(i / size, i % size));
    }
    return moves;
}
```

## מקודדים עמדה

הוסיפו אחרי `getCurrentPlayer`. שלושת הערכים של כל תא נשמרים ברצף:

```java
/** Encodes each cell as [own stone, opponent stone, direction]. */
public float[] encodeForCurrentPlayer() {
    float[] encoded = new float[cells.length * 3];
    int opponent = otherPlayer(currentPlayer);
    float direction = currentPlayer == RED ? 1.0f : 0.0f;

    for (int i = 0; i < cells.length; i++) {
        int base = i * 3;
        encoded[base] = cells[i] == currentPlayer ? 1.0f : 0.0f;
        encoded[base + 1] = cells[i] == opponent ? 1.0f : 0.0f;
        encoded[base + 2] = direction;
    }
    return encoded;
}
```

בסוף `HexGame.java`, לפני הסוגר האחרון של המחלקה, הוסיפו סוג נתונים פשוט למהלך:

```java
/** A move stores only its board row and column. */
public static final class Move {
    public final int row;
    public final int column;

    public Move(int row, int column) {
        this.row = row;
        this.column = column;
    }
}
```

## מוסיפים את חוזה המודל ואת הקוד שמריץ אותו

צרו את `ValueModel.java`. כל מודל מקבל קידוד אחד ומחזיר ערך אחד:

```java
package com.example.hex;

/** Gives one position value from the point of view of the player to move. */
public interface ValueModel {
    /** Evaluates one board encoding with the fixed shape 7x7x3. */
    float evaluate(float[] encodedBoard);
}
```

צרו את `TfliteValueModel.java`. המודל וה־buffers נטענים פעם אחת, וכל מועמד משתמש באותם buffers:

```java
package com.example.hex;

import android.content.Context;

import com.google.ai.edge.litert.CompiledModel;
import com.google.ai.edge.litert.LiteRtException;
import com.google.ai.edge.litert.TensorBuffer;

import java.util.List;

/** Runs the 7x7 value model with LiteRT. */
public final class TfliteValueModel implements ValueModel, AutoCloseable {
    /** Compiled once when the computer player is selected. */
    private final CompiledModel compiledModel;
    /** Reused for every candidate position. */
    private final List<TensorBuffer> inputBuffers;
    /** Receives the predicted value. */
    private final List<TensorBuffer> outputBuffers;

    /** Load the model and create buffers for its first signature. */
    public TfliteValueModel(Context context) throws LiteRtException {
        compiledModel = CompiledModel.create(context.getAssets(),
                "hex_value_v1.tflite", CompiledModel.Options.getCPU());
        inputBuffers = compiledModel.createInputBuffers(0);
        outputBuffers = compiledModel.createOutputBuffers(0);
    }

    @Override
    public float evaluate(float[] encodedBoard) {
        try {
            // Copy the encoded board into the model's input.
            inputBuffers.get(0).writeFloat(encodedBoard);
            // Run the model using its first signature.
            compiledModel.run(inputBuffers, outputBuffers, 0);
            // Read the predicted value.
            return outputBuffers.get(0).readFloat()[0];
        } catch (LiteRtException exception) {
            throw new IllegalStateException("Could not evaluate the model", exception);
        }
    }

    @Override
    public void close() {
        // Release buffers before the compiled model that created them.
        for (TensorBuffer buffer : inputBuffers) buffer.close();
        for (TensorBuffer buffer : outputBuffers) buffer.close();
        compiledModel.close();
    }
}
```

## ממשיכים לשחק

בצעו Gradle Sync ובנו את האפליקציה. שחקו מהלך או שניים ולחצו Restart: המשחק המקומי ממשיך להתנהג כרגיל. קוד המחשב נמצא בפרויקט אך המסך עדיין לא מפעיל אותו.

**שאלת הבנה:** למה כל מהלך מועמד צריך לקבל עותק נפרד של מצב המשחק?

[לשיעור הבא: מחשב שעובד ברקע ←]({{ '/android/hex5/06-background-ai/' | relative_url }})
