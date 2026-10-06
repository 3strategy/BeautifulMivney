---
layout: page
title: "Hex — 01: הלוח ושפות היעד"
subtitle: "Canvas, משושים, גאומטריית מרכזים ושפות יעד"
permalink: /android/hex5/01-board/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הבא]({{ '/android/hex5/02-moves-and-turns/' | relative_url }}){: data-sequence-nav="next"}


{: .box-success}
**בסוף הפרק:** לוח 7×7 ריק, עם סימון אדום מלמעלה ומלמטה וסימון כחול משמאל ומימין.

![לוח Hex ריק של 49 משושים, עם שפות אדומות למעלה ולמטה ושפות כחולות משמאל ומימין]({{ '/android/hex5/hex-board-editable.svg' | relative_url }})

כך ייראה מרכז המסך בסיום הפרק: שבע שורות של שבעה משושים ריקים.

## הרעיון

Hex הוא משחק חיבור: אדום רוצה מסלול משושים מהשפה העליונה לתחתונה וכחול משמאל לימין. `HexGame` מתחילה כאן כמקור יחיד לגודל הלוח; `HexBoardView` משתמשת ב־`getSize()` לציור המשושים, שפות היעד וחישוב ההתאמה למסך. בשלב הזה ה־View מצייר לוח ריק בלבד. `centerX` מוסיפה לכל שורה הסטה של חצי משושה; `makeHexagon` משתמשת בשש זוויות במרווחי 60°. בפרק 2 נוסיף ל־`HexGame` תאים, תורות וחוקים, בלי לשנות את ממשק הגודל או את גאומטריית הציור.

ב[מפת האחריות]({{ '/android/hex5/#architecture' | relative_url }}) זהו החלק של `HexBoardView`: היא מציירת לפי גודל שמספק `HexGame`, אך עדיין אינה קוראת או משנה תאים. חוקיות מהלך תיכנס בהמשך למחלקה הנפרדת, ולא לתוך חישובי הציור.

## נקודת ההתחלה

התחילו בפרויקט **Empty Views Activity** ב־Java, חבילה `com.example.hex` ו־API 31. השתמשו בפריסת XML וב־`MainActivity` שנוצרה בתבנית; אין ליצור Activity חדש. תחילה הפעילו View Binding והמירו את `MainActivity` לפי הסעיף הבא. לאחר מכן המשיכו לבנות את המשחק.

{% include android/view-binding.md namespace="com.example.hex" %}

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים לפני קוד שמפנה אליהם.

### colors.xml

**מיקום:** app > res > values. החליפו את שני הצבעים הקיימים בצבעי הלוח. השאירו את הצהרת ה־XML ואת תגיות `<resources>` במקומן.

```diff
 <?xml version="1.0" encoding="utf-8"?>
 <resources>
-    <color name="black">#FF000000</color>
-    <color name="white">#FFFFFFFF</color>
+    <color name="ink">#152238</color>
+    <color name="paper">#F5F0E6</color>
+    <color name="surface">#FFFDF8</color>
+    <color name="hex_empty">#E2DDD2</color>
+    <color name="hex_red">#D94B54</color>
+    <color name="hex_blue">#2374AB</color>
+    <color name="hex_line">#324154</color>
+    <color name="muted">#667085</color>
 </resources>
```

### strings.xml

**מיקום:** app > res > values. המשאב מרכז צבעים, מחרוזות או theme שהמסך משתמש בהם. שנו רק את השורות המוצגות.

```diff
 <resources>
-    <string name="app_name">hex</string>
+    <string name="app_name">Hex 7×7</string>
+    <string name="title_hex">HEX</string>
+    <string name="red_goal">RED · TOP ↕ BOTTOM</string>
+    <string name="blue_goal">BLUE · LEFT ↔ RIGHT</string>
+    <string name="board_description">Seven by seven Hex board</string>
 </resources>
```

### HexGame.java

**מיקום:** app > kotlin+java > com.example.hex. צרו קובץ `HexGame.java`. כרגע הוא מספק רק גודל ללוח; בפרק 2 נרחיב את אותו מודל ונוסיף לו את מצב המשחק והחוקים.

~~~java
package com.example.hex;

/**
 * Holds the board dimensions, position, and rules for a Hex game.
 *
 * <p>Chapter 1 uses the size; following chapters add the board position and rules.
 */
public final class HexGame {
    /** Default board size for the Hex series. */
    public static final int DEFAULT_SIZE = 7;

    private final int size;

    /** Creates the default 7×7 board. */
    public HexGame() {
        this(DEFAULT_SIZE);
    }

    /** Creates a square board with the given number of rows and columns. */
    public HexGame(int size) {
        this.size = size;
    }

    /** @return the number of rows and columns on this board */
    public int getSize() {
        return size;
    }
}
~~~

### HexBoardView.java

**מיקום:** app > kotlin+java > com.example.hex. צרו כאן קובץ Java חדש בשם `HexBoardView.java` והעתיקו את הקוד המלא שלהלן כפי שהוא מוצג. בפרק 2 נחבר אליו את המשחק הפעיל, callback ובדיקת מגע; ממשק הגודל וחישוב הגאומטריה כבר מוכנים.

<details open markdown="1"><summary>הוסיפו את הקובץ החדש HexBoardView.java</summary>

```java
package com.example.hex;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

/**
 * Draws a Hex board on a {@link Canvas}.
 *
 * <p>The view's intended role also includes cell input; game rules stay in a separate class.
 */
public final class HexBoardView extends View {
    private static final float SQRT_THREE = (float) Math.sqrt(3.0);

    private final HexGame game = new HexGame();

    private final Paint fillPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint strokePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint sidePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Path hexPath = new Path();

    private float radius;
    private float startX;
    private float startY;

    private final int emptyColor;
    private final int redColor;
    private final int blueColor;
    private final int lineColor;

    /**
     * Creates a board view inflated from XML.
     *
     * @param context Android context used to resolve resources
     * @param attributes XML attributes supplied by the layout inflater
     */
    public HexBoardView(Context context, @Nullable AttributeSet attributes) {
        super(context, attributes);
        emptyColor = ContextCompat.getColor(context, R.color.hex_empty);
        redColor = ContextCompat.getColor(context, R.color.hex_red);
        blueColor = ContextCompat.getColor(context, R.color.hex_blue);
        lineColor = ContextCompat.getColor(context, R.color.hex_line);
        strokePaint.setStyle(Paint.Style.STROKE);
        strokePaint.setStrokeJoin(Paint.Join.ROUND);
        sidePaint.setStyle(Paint.Style.STROKE);
        sidePaint.setStrokeCap(Paint.Cap.ROUND);
    }

    @Override
    protected void onDraw(@NonNull Canvas canvas) {
        super.onDraw(canvas);
        calculateGeometry();
        drawGoalSides(canvas);

        strokePaint.setColor(lineColor);
        strokePaint.setStrokeWidth(dp(1.5f));
        for (int row = 0; row < game.getSize(); row++) {
            for (int column = 0; column < game.getSize(); column++) {
                float centerX = centerX(row, column);
                float centerY = centerY(row);
                makeHexagon(centerX, centerY);
                fillPaint.setColor(emptyColor);
                fillPaint.setStyle(Paint.Style.FILL);
                canvas.drawPath(hexPath, fillPaint);
                canvas.drawPath(hexPath, strokePaint);
            }
        }
    }

    private void drawGoalSides(Canvas canvas) {
        int last = game.getSize() - 1;
        sidePaint.setStrokeWidth(Math.max(dp(4), radius * 0.18f));

        sidePaint.setColor(redColor);
        canvas.drawLine(centerX(0, 0), centerY(0) - radius * 1.18f,
                centerX(0, last), centerY(0) - radius * 1.18f, sidePaint);
        canvas.drawLine(centerX(last, 0), centerY(last) + radius * 1.18f,
                centerX(last, last),
                centerY(last) + radius * 1.18f, sidePaint);

        sidePaint.setColor(blueColor);
        canvas.drawLine(centerX(0, 0) - radius, centerY(0),
                centerX(last, 0) - radius, centerY(last), sidePaint);
        canvas.drawLine(centerX(0, last) + radius, centerY(0),
                centerX(last, last) + radius,
                centerY(last), sidePaint);
    }

    /** Fits and centers the board geometry inside the current view size. */
    private void calculateGeometry() {
        float inset = dp(14);
        float availableWidth = Math.max(1, getWidth() - 2 * inset);
        float availableHeight = Math.max(1, getHeight() - 2 * inset);
        float widthInHexagons = 1.5f * (game.getSize() - 1) + 1;
        float heightInRadii = 1.5f * (game.getSize() - 1) + 2;
        radius = Math.min(availableWidth / (SQRT_THREE * widthInHexagons),
                availableHeight / (heightInRadii + 0.5f));

        float boardWidth = SQRT_THREE * radius * widthInHexagons;
        float boardHeight = radius * heightInRadii;
        float left = (getWidth() - boardWidth) / 2.0f;
        float top = (getHeight() - boardHeight) / 2.0f;
        startX = left + SQRT_THREE * radius / 2.0f;
        startY = top + radius;
    }

    private void makeHexagon(float centerX, float centerY) {
        hexPath.reset();
        for (int corner = 0; corner < 6; corner++) {
            double angle = Math.toRadians(-90 + 60 * corner);
            float x = centerX + radius * (float) Math.cos(angle);
            float y = centerY + radius * (float) Math.sin(angle);
            if (corner == 0) {
                hexPath.moveTo(x, y);
            } else {
                hexPath.lineTo(x, y);
            }
        }
        hexPath.close();
    }

    private float centerX(int row, int column) {
        return startX + SQRT_THREE * radius * (column + row * 0.5f);
    }

    private float centerY(int row) {
        return startY + radius * 1.5f * row;
    }

    private float dp(float value) {
        return value * getResources().getDisplayMetrics().density;
    }
}
```

</details>

### activity_main.xml

**מיקום:** app > res > layout. פתחו את `activity_main.xml` בתצוגת Code, בחרו את כל תוכן הקובץ והחליפו אותו בקובץ המלא הבא:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_horizontal"
        android:orientation="vertical"
        android:padding="20dp">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/title_hex"
            android:textSize="34sp" />

        <TextView
            android:id="@+id/statusText"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginBottom="16dp"
            android:textSize="18sp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/red_goal"
            android:textColor="@color/hex_red" />
        <com.example.hex.HexBoardView
            android:id="@+id/boardView"
            android:layout_width="match_parent"
            android:layout_height="360dp"
            android:contentDescription="@string/board_description" />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/blue_goal"
            android:textColor="@color/hex_blue" />
    </LinearLayout>
</ScrollView>
~~~

## מריצים ומוודאים

הפעילו את האפליקציה ובדקו שמופיעים לוח משושים ריק, כותרת ושתי שפות היעד הצבועות.

**שאלת הבנה:** למה חוק הניצחון אינו שייך ל־HexBoardView?

[לשיעור הבא: מהלכים ותורות ←]({{ '/android/hex5/02-moves-and-turns/' | relative_url }})
