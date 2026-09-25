---
layout: page
title: "Hex — 01: הלוח ושפות היעד"
subtitle: "Canvas, משושים, גאומטריית מרכזים ושפות יעד"
permalink: /android/hex/01-board/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/02-moves-and-turns/' | relative_url }}) ·


{: .box-success}
**בסוף הפרק:** לוח 7×7 ריק, עם סימון אדום מלמעלה ומלמטה וסימון כחול משמאל ומימין.

![לוח Hex ריק של 49 משושים, עם שפות אדומות למעלה ולמטה ושפות כחולות משמאל ומימין]({{ '/android/hex/hex-board-editable.svg' | relative_url }})

כך ייראה מרכז המסך בסיום הפרק: שבע שורות של שבעה משושים ריקים.

## הרעיון

Hex הוא משחק חיבור: אדום רוצה מסלול משושים מהשפה העליונה לתחתונה וכחול משמאל לימין. בשלב הזה ה־View מצייר בלבד. `calculateGeometry()` גוזרת את הרדיוס מנפח התצוגה. `centerX` מוסיפה לכל שורה הסטה של חצי משושה; `makeHexagon` משתמשת בשש זוויות במרווחי 60°. הגדרת צבעים ב־resources שומרת על קוד ציור קריא. אין עדיין מחלקת חוקים או מגע.

ב[מפת האחריות]({{ '/android/hex/#architecture' | relative_url }}) זהו החלק של `HexBoardView`: כרגע אנחנו בונים את הדרך להציג את הלוח. חוקיות מהלך תיכנס בהמשך למחלקה נפרדת, ולא לתוך חישובי הציור.

## נקודת ההתחלה

התחילו בפרויקט Empty Views Activity ב־Java, חבילה `com.example.hex`, ‏API 31,‏ XML ו־View Binding פעיל. `MainActivity` כבר מנפחת `ActivityMainBinding`. אין ליצור Activity חדש.

[להסבת פרוייקט חדש ל-View Bindings ראו חלק 1 כאן](/android/projectSteps/019bBindingsForMainActivity)

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
-</resources>
+    <string name="app_name">Hex 7×7</string>
+    <string name="title_hex">HEX</string>
+    <string name="red_goal">RED · TOP ↕ BOTTOM</string>
+    <string name="blue_goal">BLUE · LEFT ↔ RIGHT</string>
+    <string name="board_description">Seven by seven Hex board</string>
+</resources>
```

### HexBoardView.java

**מיקום:** app > kotlin+java > com.example.hex. צרו כאן קובץ Java חדש בשם `HexBoardView.java` והעתיקו את הקוד המלא שלהלן בדיוק, כולל ירידות השורה והסוגריים. בפרק 2 המחלקה תקבל game, callback ובדיקת מגע; בפרק 1 היא סטטית.

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

/** Draws the fixed 7×7 board; game rules will live in a separate class. */
public final class HexBoardView extends View {
    private static final int SIZE = 7;
    private static final float SQRT_THREE = (float) Math.sqrt(3.0);
    private final Paint fillPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint strokePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Paint sidePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Path hexPath = new Path();
    private final int emptyColor;
    private final int redColor;
    private final int blueColor;
    private final int lineColor;
    private float radius;
    private float startX;
    private float startY;

    /** Creates a board view inflated from the activity's XML layout. */
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
        for (int row = 0; row < SIZE; row++) {
            for (int column = 0; column < SIZE; column++) {
                makeHexagon(centerX(row, column), centerY(row));
                fillPaint.setColor(emptyColor);
                fillPaint.setStyle(Paint.Style.FILL);
                canvas.drawPath(hexPath, fillPaint);
                canvas.drawPath(hexPath, strokePaint);
            }
        }
    }

    private void calculateGeometry() {
        float inset = dp(14);
        float availableWidth = Math.max(1, getWidth() - 2 * inset);
        float availableHeight = Math.max(1, getHeight() - 2 * inset);
        radius = Math.min(availableWidth / (SQRT_THREE * 10.0f),
                availableHeight / 11.5f);
        float boardWidth = SQRT_THREE * radius * 10.0f;
        float boardHeight = radius * 11.0f;
        startX = (getWidth() - boardWidth) / 2.0f + SQRT_THREE * radius / 2.0f;
        startY = (getHeight() - boardHeight) / 2.0f + radius;
    }

    private void drawGoalSides(Canvas canvas) {
        sidePaint.setStrokeWidth(Math.max(dp(4), radius * 0.18f));
        sidePaint.setColor(redColor);
        canvas.drawLine(centerX(0, 0), centerY(0) - radius * 1.18f,
                centerX(0, SIZE - 1), centerY(0) - radius * 1.18f, sidePaint);
        canvas.drawLine(centerX(SIZE - 1, 0), centerY(SIZE - 1) + radius * 1.18f,
                centerX(SIZE - 1, SIZE - 1),
                centerY(SIZE - 1) + radius * 1.18f, sidePaint);
        sidePaint.setColor(blueColor);
        canvas.drawLine(centerX(0, 0) - radius, centerY(0),
                centerX(SIZE - 1, 0) - radius, centerY(SIZE - 1), sidePaint);
        canvas.drawLine(centerX(0, SIZE - 1) + radius, centerY(0),
                centerX(SIZE - 1, SIZE - 1) + radius,
                centerY(SIZE - 1), sidePaint);
    }

    private void makeHexagon(float centerX, float centerY) {
        hexPath.reset();
        for (int corner = 0; corner < 6; corner++) {
            double angle = Math.toRadians(-90 + 60 * corner);
            float x = centerX + radius * (float) Math.cos(angle);
            float y = centerY + radius * (float) Math.sin(angle);
            if (corner == 0) hexPath.moveTo(x, y);
            else hexPath.lineTo(x, y);
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

**מיקום:** app > res > layout. עורכים דרך app > res > layout בתצוגת Code. אין למחוק רכיבי תבנית שאינם ב־diff.

```diff
 <?xml version="1.0" encoding="utf-8"?>
-<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
-    xmlns:app="http://schemas.android.com/apk/res-auto"
-    xmlns:tools="http://schemas.android.com/tools"
+<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
     android:id="@+id/main"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
-    tools:context=".MainActivity">
-
-    <TextView
-        android:layout_width="wrap_content"
+    android:fillViewport="true">
+    <LinearLayout
+        android:layout_width="match_parent"
         android:layout_height="wrap_content"
-        android:text="Hello World!"
-        app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
-        app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
-</androidx.constraintlayout.widget.ConstraintLayout>
+        android:gravity="center_horizontal"
+        android:orientation="vertical"
+        android:padding="20dp">
+        <TextView
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/title_hex"
+            android:textSize="34sp" />
+        <TextView
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/red_goal"
+            android:textColor="@color/hex_red" />
+        <com.example.hex.HexBoardView
+            android:id="@+id/boardView"
+            android:layout_width="match_parent"
+            android:layout_height="360dp"
+            android:contentDescription="@string/board_description" />
+        <TextView
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/blue_goal"
+            android:textColor="@color/hex_blue" />
+    </LinearLayout>
+</ScrollView>
```

## מריצים ומוודאים

בצעו Sync אם שיניתם Gradle,  ואז הפעילו את האפליקציה. פתחו את האפליקציה וספרו 49 משושים. בדקו את שתי השפות האדומות ואת שתי השפות הכחולות.

אם האמולטור פתוח בחלון שאפשר לגרור את שוליו, הקטינו והגדילו את החלון. בכל גודל בדקו שכל 49 המשושים ושפות היעד נשארים גלויים. אם האמולטור מוטמע ב־Android Studio או פועל ללא חלון, דלגו על בדיקת שינוי הגודל; בדיקת הלוח בגודל המקורי מספיקה לפרק הזה.

**שאלת הבנה:** למה חוק הניצחון אינו שייך ל־HexBoardView?
