---
layout: page
title: "Hex — 04: משחק מקומי שלם"
subtitle: "Restart, משאבי מסך ו־View Binding"
permalink: /android/hex/04-local-two-player/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex/03-win-detection/' | relative_url }}) · [הפרק הבא]({{ '/android/hex/05-model-preparation/' | relative_url }})


{: .box-success}
**בסוף הפרק:** משחק מקומי מלא עם תור, תוצאה, כפתור Restart ומסך בסגנון יישום הייחוס.

## הרעיון

מסך המשחק יכול עכשיו להציג משחק שלם מקצה לקצה. `restartGame` יוצר `HexGame` חדש; `render` מעדכן את הלוח, שורת המצב וזמינות המגע. XML ומשאבי `strings`, `colors` ו־`themes` אחראים להצגה. משאירים את קוד EdgeToEdge,‏ View Binding, ה־Manifest וקובצי התבנית האחרים. אין עדיין כפתור מחשב לא פעיל.

חזרו ל[זרימת המהלך מפרק 2]({{ '/android/hex/02-moves-and-turns/#move-flow' | relative_url }}): `render` מציגה את מצב המשחק לאחר שינוי. גם Restart משתמשת באותה דרך — היא מחליפה את `HexGame` במצב התחלתי חדש ואז קוראת ל־`render`. כך הלוח, התור והמנצח מתאפסים יחד, וה־View ממשיכה להיות אחראית להצגה.

## עורכים את הקבצים

עבדו לפי סדר התלות: משאבים ותלויות לפני קוד שמפנה אליהם; מחלקת חוקים לפני ה־Activity.

### strings.xml

**מיקום:** app > res > values. המשאב מרכז צבעים, מחרוזות או theme שהמסך משתמש בהם. שנו רק את השורות המוצגות.

העבירו את שתי מחרוזות התור למקום המוצג. בקובץ צריכה להישאר הגדרה אחת לכל שם.

```diff
 <resources>
     <string name="app_name">Hex 7×7</string>
     <string name="title_hex">HEX</string>
+    <string name="subtitle">Connect your two sides</string>
+    <string name="mode_label">GAME MODE</string>
+    <string name="human_vs_ai">Human vs Computer</string>
+    <string name="human_vs_human">Two players</string>
+    <string name="computer_level_label">COMPUTER LEVEL</string>
+    <string name="computer_levels_pending">Changing the computer player starts a new game.</string>
+    <string name="restart">Restart game</string>
     <string name="red_goal">RED · TOP ↕ BOTTOM</string>
     <string name="blue_goal">BLUE · LEFT ↔ RIGHT</string>
     <string name="board_description">Seven by seven Hex board</string>
-    <string name="status_red_turn">Red to move</string>
-    <string name="status_blue_turn">Blue to move</string>
+    <string name="ai_unavailable">Computer model unavailable</string>
     <string name="status_red_wins">Red wins — top connected to bottom</string>
     <string name="status_blue_wins">Blue wins — left connected to right</string>
+    <string name="status_model_loading">Loading computer player…</string>
+    <string name="status_ai_thinking">Blue computer is thinking…</string>
+    <string name="status_your_turn">Your turn — Red</string>
+    <string name="status_red_turn">Red to move</string>
+    <string name="status_blue_turn">Blue to move</string>
+    <string name="model_local">Local two-player game</string>
+    <string name="model_unavailable_help">Choose Two players to keep playing</string>
+    <string name="model_loading">Loading %1$s…</string>
+    <string name="model_untrained">Untrained mock model · integration testing only</string>
+    <string name="model_ready">Value model v1 · fully offline</string>
 </resources>
```

### themes.xml ב־values-night

**מיקום:** app > res > values-night > themes.xml. Android בוחרת את המשאבים האלה כשהמכשיר במצב כהה. כדי לשמור גם במצב הזה על צבעי המסך הבהירים, הגדירו כאן את `Base.Theme.Hex` עם ההורה `Theme.Material3.Light.NoActionBar`. השאירו את ההורה `Theme.Material3.DayNight.NoActionBar` ואת `android:colorAccent` בקובץ הרגיל שבתיקיית `values`.

```diff
-<resources xmlns:tools="http://schemas.android.com/tools">
-    <!-- Base application theme. -->
-    <style name="Base.Theme.Hex" parent="Theme.Material3.DayNight.NoActionBar">
-        <!-- Customize your dark theme here. -->
-        <!-- <item name="colorPrimary">@color/my_dark_primary</item> -->
+<resources>
+    <style name="Base.Theme.Hex" parent="Theme.Material3.Light.NoActionBar">
+        <item name="colorPrimary">@color/hex_blue</item>
+        <item name="colorSecondary">@color/hex_red</item>
+        <item name="android:fontFamily">sans</item>
+        <item name="android:windowLightStatusBar">true</item>
+        <item name="android:navigationBarColor">@color/paper</item>
+        <item name="android:statusBarColor">@color/paper</item>
+        <item name="android:windowBackground">@color/paper</item>
     </style>
-</resources>
+</resources>
```

### themes.xml

**מיקום:** app > res > values > themes.xml. השאירו כאן את `Theme.Material3.DayNight.NoActionBar` ואת `android:colorAccent`; בתיקיית `values-night` הוגדר להם עיצוב בהיר נפרד למצב כהה.

```diff
-<resources xmlns:tools="http://schemas.android.com/tools">
-    <!-- Base application theme. -->
+<resources>
     <style name="Base.Theme.Hex" parent="Theme.Material3.DayNight.NoActionBar">
-        <!-- Customize your light theme here. -->
-        <!-- <item name="colorPrimary">@color/my_light_primary</item> -->
+        <item name="colorPrimary">@color/hex_blue</item>
+        <item name="colorSecondary">@color/hex_red</item>
+        <item name="android:colorAccent">@color/hex_blue</item>
+        <item name="android:fontFamily">sans</item>
+        <item name="android:windowLightStatusBar">true</item>
+        <item name="android:navigationBarColor">@color/paper</item>
+        <item name="android:statusBarColor">@color/paper</item>
+        <item name="android:windowBackground">@color/paper</item>
    </style>

    <style name="Theme.Hex" parent="Base.Theme.Hex" />
 </resources>
```

### activity_main.xml

**מיקום:** app > res > layout. עורכים דרך app > res > layout בתצוגת Code. אין למחוק רכיבי תבנית שאינם ב־diff.

<details open markdown="1"><summary>השינוי המלא ב־activity_main.xml</summary>

```diff
 <?xml version="1.0" encoding="utf-8"?>
 <ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
+    xmlns:app="http://schemas.android.com/apk/res-auto"
     android:id="@+id/main"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:fillViewport="true">
+
     <LinearLayout
         android:layout_width="match_parent"
         android:layout_height="wrap_content"
         android:gravity="center_horizontal"
         android:orientation="vertical"
-        android:padding="20dp">
+        android:paddingStart="20dp"
+        android:paddingTop="20dp"
+        android:paddingEnd="20dp"
+        android:paddingBottom="28dp">
+
         <TextView
             android:layout_width="wrap_content"
             android:layout_height="wrap_content"
+            android:fontFamily="sans-serif-black"
+            android:letterSpacing="0.16"
             android:text="@string/title_hex"
+            android:textColor="@color/ink"
             android:textSize="34sp" />
+
         <TextView
-            android:id="@+id/statusText"
             android:layout_width="wrap_content"
             android:layout_height="wrap_content"
-            android:layout_marginTop="16dp"
-            android:layout_marginBottom="16dp"
-            android:textSize="18sp" />
+            android:layout_marginBottom="18dp"
+            android:text="@string/subtitle"
+            android:textColor="@color/muted"
+            android:textSize="14sp" />
+
+        <com.google.android.material.card.MaterialCardView
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            app:cardBackgroundColor="@color/surface"
+            app:cardCornerRadius="16dp"
+            app:cardElevation="0dp"
+            app:strokeColor="@color/hex_empty"
+            app:strokeWidth="1dp">
+
+            <LinearLayout
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:gravity="center"
+                android:orientation="vertical"
+                android:padding="14dp">
+
+                <TextView
+                    android:id="@+id/statusText"
+                    android:layout_width="wrap_content"
+                    android:layout_height="wrap_content"
+                    android:fontFamily="sans-serif-medium"
+                    android:gravity="center"
+                    android:textColor="@color/ink"
+                    android:textSize="18sp" />
+
+                <TextView
+                    android:id="@+id/modelText"
+                    android:layout_width="wrap_content"
+                    android:layout_height="wrap_content"
+                    android:layout_marginTop="3dp"
+                    android:gravity="center"
+                    android:textColor="@color/muted"
+                    android:textSize="12sp" />
+            </LinearLayout>
+        </com.google.android.material.card.MaterialCardView>
+
         <TextView
             android:layout_width="wrap_content"
             android:layout_height="wrap_content"
+            android:layout_marginTop="14dp"
+            android:fontFamily="sans-serif-medium"
             android:text="@string/red_goal"
-            android:textColor="@color/hex_red" />
+            android:textColor="@color/hex_red"
+            android:textSize="12sp" />
+
         <com.example.hex.HexBoardView
             android:id="@+id/boardView"
             android:layout_width="match_parent"
             android:layout_height="360dp"
-            android:contentDescription="@string/board_description" />
+            android:contentDescription="@string/board_description"
+            android:importantForAccessibility="yes" />
+
         <TextView
             android:layout_width="wrap_content"
             android:layout_height="wrap_content"
+            android:layout_marginBottom="14dp"
+            android:fontFamily="sans-serif-medium"
             android:text="@string/blue_goal"
-            android:textColor="@color/hex_blue" />
+            android:textColor="@color/hex_blue"
+            android:textSize="12sp" />
+
+        <com.google.android.material.button.MaterialButton
+            android:id="@+id/restartButton"
+            style="@style/Widget.Material3.Button.TonalButton"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/restart"
+            app:icon="@android:drawable/ic_popup_sync"
+            app:iconGravity="textStart" />
     </LinearLayout>
 </ScrollView>
```

</details>

### MainActivity.java

**מיקום:** app > kotlin+java > com.example.hex. ה־Activity מחברת בין View Binding, המשחק, הפקדים ועבודת המחשב. השאירו את הקוד שאינו מוצג ב־diff.

```diff
 
         game = new HexGame();
         binding.boardView.setGame(game);
         binding.boardView.setOnCellClickListener(this::onCellClicked);
+        binding.restartButton.setOnClickListener(view -> restartGame());
         render();
     }
 
     private void onCellClicked(int row, int column) {
```

```diff
             render();
         }
     }
 
+    private void restartGame() {
+        game = new HexGame();
+        render();
+    }
+
     private void render() {
         binding.boardView.setGame(game);
         binding.boardView.setEnabled(!game.isOver());
+        binding.modelText.setText(R.string.model_local);
         if (game.getWinner() == HexGame.RED) {
             binding.statusText.setText(R.string.status_red_wins);
         } else if (game.getWinner() == HexGame.BLUE) {
             binding.statusText.setText(R.string.status_blue_wins);
```

## מריצים ומוודאים

בצעו Sync אם שיניתם Gradle,  ואז הפעילו את האפליקציה. לחצו Restart באמצע משחק ואחרי ניצחון: הלוח ריק, הסטטוס הוא Red to move ואפשר לשחק שוב.

**שאלת הבנה:** מה ההבדל בין HexGame חדש לבין צביעה של כל התאים כלא תפוסים ב־View?
