---
layout: page
title: "Hex — 07: שחקנים לפי גודל לוח"
subtitle: "קטלוג קטן ב־JSON ובחירת מודל עם קלט קבוע"
permalink: /android/hex5/07-supplied-rl-models/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex5/06-background-ai/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא]({{ '/android/hex5/08-hint/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
**בסוף הפרק:** בוחרים לוח 7×7 או 11×11, ורשימת שחקני המחשב מציגה רק מודלים שמתאימים לגודל הזה. כל מודל הוא קובץ `.tflite` יחיד.

## מודל ידוע, צורת קלט ידועה

לוח 7×7 מקודד ל־147 מספרים: שבע שורות, שבע עמודות ושלושה ערכים לכל תא. מודל 11×11 מקבל 363 מספרים. כל מודל בפרויקט נבנה לאחת משתי הצורות הקבועות האלה.

הקטלוג מכיל את גודל הלוח לצד נתיב המודל. בחירת לוח מסננת את הקטלוג לפי `boardSize`, ובחירת שחקן טוענת את נתיב ה־`.tflite` שמופיע באותה רשומה.

<div markdown="1" class="hex-diagram">

~~~mermaid
%% dir: rtl %%
flowchart TB
    size["לוח 7×7 או 11×11"] --> filter["סינון רשומות לפי boardSize"]
    filter --> picker["רשימת שחקנים תואמים"]
    picker --> model["טעינת קובץ .tflite אחד"]
    model --> ai["אותו HexAi ואותו משחק"]
~~~

</div>

לוח 7×7 מציג שלושה שחקנים: איטרציות 100, 2,620 ו־5,000. לוח 11×11 מציג שניים: איטרציות 100 ו־7,350.

[הורידו את חבילת שחקני המורה]({{ '/android/hex5/downloads/06-players.zip' | relative_url }}), פרשו אותה והעתיקו את תיקיות השחקנים אל `app/src/main/assets/players`. שמרו על שמות התיקיות והקבצים. מודל 7×7 מאיטרציה 100 כבר נמצא בפרויקט מחבילת פרק 5.

## מוסיפים את Gson

ב־`gradle/libs.versions.toml` הוסיפו את הגרסה ואת הספרייה:

~~~toml
[versions]
gson = "2.14.0"

[libraries]
gson = { group = "com.google.code.gson", name = "gson", version.ref = "gson" }
~~~

ב־`app/build.gradle.kts`, תחת `dependencies`, הוסיפו:

~~~kotlin
implementation(libs.gson)
~~~

## יוצרים את קטלוג המודלים

ב־`app/src/main/assets/model_catalog.json` כתבו רשימת אובייקטים. שמות השדות תואמים לשדות של מחלקת Java שניצור מיד:

~~~json
[
  {
    "id": "trained-000100",
    "label": "Trained — iteration 100",
    "description": "A100 self-play training · 100 iterations · 7×7",
    "modelAsset": "players/trained-000100/hex_value_v1.tflite",
    "boardSize": 7
  },
  {
    "id": "trained-002620",
    "label": "Trained — iteration 2,620",
    "description": "A100 self-play training · 2,620 iterations · 7×7",
    "modelAsset": "players/trained-002620/hex_value_v1.tflite",
    "boardSize": 7
  },
  {
    "id": "trained-005000",
    "label": "Trained — iteration 5,000",
    "description": "A100 self-play training · 5,000 iterations · 7×7",
    "modelAsset": "players/trained-005000/hex_value_v1.tflite",
    "boardSize": 7
  },
  {
    "id": "trained-007350",
    "label": "Latest training — iteration 7,350 (11×11)",
    "description": "A100 self-play training · 7,350 iterations · 11×11",
    "modelAsset": "players/trained-007350/hex_value_v1.tflite",
    "boardSize": 11
  },
  {
    "id": "trained-11x11-000100",
    "label": "Early training — iteration 100 (11×11)",
    "description": "A100 self-play training · 100 iterations · 11×11",
    "modelAsset": "players/trained-11x11-000100/hex_value_v1.tflite",
    "boardSize": 11
  }
]
~~~

## ממירים את הרשימה לאובייקטים

צרו את `ModelCatalog.java` ב־`app/src/main/java/com/example/hex`. Gson קורא את המערך ישירות ל־`Level[]`:

~~~java
package com.example.hex;

import android.content.Context;

import androidx.annotation.NonNull;

import com.google.gson.Gson;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

/** Reads the bundled computer-player list into Java objects. */
public final class ModelCatalog {
    public static final String CATALOG_ASSET = "model_catalog.json";

    private ModelCatalog() {
    }

    /** Loads every level listed in the asset catalog. */
    public static List<Level> load(Context context) throws IOException {
        try (InputStreamReader reader = new InputStreamReader(
                context.getAssets().open(CATALOG_ASSET), StandardCharsets.UTF_8)) {
            Level[] levels = new Gson().fromJson(reader, Level[].class);
            return Arrays.asList(levels);
        }
    }

    /** Fields map directly from one catalog object. */
    public static final class Level {
        public String id;
        public String label;
        public String description;
        public String modelAsset;
        public int boardSize;

        @NonNull
        @Override
        public String toString() {
            return label;
        }
    }
}
~~~

## מוסיפים את שתי הרשימות למסך {#screen-pickers}

### activity_main.xml — בין בחירת מצב המשחק לכרטיס הסטטוס

**מיקום:** app > res > layout > activity_main.xml, בתצוגת **Code**. נקודת ההתחלה היא הפריסה מסוף פרק 6. מצאו את `RadioGroup` ששמו `modeGroup`, ובתוכו את כפתור `modeHuman` שמציג **Two players**. הוסיפו את כל שורות `+` הבאות **אחרי `</RadioGroup>` ולפני פתיחת `MaterialCardView`**. שורות ההקשר בתחילת ה־diff ובסופו כבר קיימות בקובץ:

~~~diff
             <com.google.android.material.radiobutton.MaterialRadioButton
                 android:id="@+id/modeHuman"
                 android:layout_width="0dp"
                 android:layout_height="wrap_content"
                 android:layout_weight="1"
                 android:text="@string/human_vs_human" />
         </RadioGroup>

+        <TextView
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/board_size_label"
+            android:textColor="@color/muted"
+            android:textSize="11sp" />
+
+        <Spinner
+            android:id="@+id/boardSizeSpinner"
+            android:layout_width="match_parent"
+            android:layout_height="48dp"
+            android:layout_marginBottom="12dp"
+            android:contentDescription="@string/board_size_label"
+            android:spinnerMode="dropdown" />
+
+        <LinearLayout
+            android:id="@+id/computerLevelContainer"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:layout_marginBottom="12dp"
+            android:orientation="vertical">
+
+            <TextView
+                android:layout_width="wrap_content"
+                android:layout_height="wrap_content"
+                android:text="@string/computer_level_label"
+                android:textColor="@color/muted"
+                android:textSize="11sp" />
+
+            <Spinner
+                android:id="@+id/computerLevelSpinner"
+                android:layout_width="match_parent"
+                android:layout_height="48dp"
+                android:contentDescription="@string/computer_level_label"
+                android:spinnerMode="dropdown" />
+        </LinearLayout>
+
         <com.google.android.material.card.MaterialCardView
             android:layout_width="match_parent"
             android:layout_height="wrap_content"
             app:cardBackgroundColor="@color/surface"
~~~

{: .box-note}
**בדיקת המיקום:** התווית לגודל, `boardSizeSpinner` ו־`computerLevelContainer` הם ילדים של ה־`LinearLayout` החיצוני שבתוך `ScrollView`. רק התווית למודל ו־`computerLevelSpinner` נמצאים בתוך `computerLevelContainer`; הסוגר `</LinearLayout>` המסומן ב־`+` סוגר את המעטפת החדשה הזו. סדר הרכיבים במסך הוא: בחירת מצב משחק, בחירת גודל, בחירת מודל, כרטיס הסטטוס, ואז הלוח. אין להקליד את סימני `+`.

### strings.xml — תוויות חדשות ועדכון מחרוזות קיימות

**מיקום:** app > res > values > strings.xml. בתוך `<resources>`, אחרי המחרוזת `human_vs_human` מפרק 6, הוסיפו את תוויות הרשימות ואת אפשרויות הגודל:

~~~diff
     <string name="human_vs_human">Two players</string>
+    <string name="board_size_label">BOARD SIZE</string>
+    <string-array name="board_sizes">
+        <item>7×7</item>
+        <item>11×11</item>
+    </string-array>
+    <string name="computer_level_label">COMPUTER LEVEL</string>
     <string name="ai_unavailable">Computer model unavailable</string>
~~~

באותו קובץ, עדכנו את `board_description` הקיימת כך שתקבל את מספר השורות והעמודות:

{% code_diff %}
     <string name="red_goal">RED · TOP ↕ BOTTOM</string>
     <string name="blue_goal">BLUE · LEFT ↔ RIGHT</string>
-    <string name="board_description">Seven by seven Hex board</string>
+    <string name="board_description">%1$d by %2$d Hex board</string>
     <string name="model_local">Local two-player game</string>
{% endcode_diff %}

עדכנו גם את `model_loading` שנוספה בפרק 6, כדי שהודעת הטעינה תקבל את שם המודל שנבחר. **מחליפים את הערך של המחרוזת הקיימת; אין להוסיף מחרוזת שנייה באותו שם:**

{% code_diff %}
     <string name="model_unavailable_help">Choose Two players to keep playing</string>
-    <string name="model_loading">Loading model…</string>
+    <string name="model_loading">Loading %1$s…</string>
     <string name="model_ready">Value model v1 · fully offline</string>
{% endcode_diff %}

## מסננים ובוחרים

ב־`MainActivity.java`, הוסיפו imports לרכיבי הרשימה ול־`ModelCatalog`:

~~~java
import android.widget.AdapterView;
import android.widget.ArrayAdapter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
~~~

המשחק מתחיל בלוח 7×7, לכן שדה הגודל צריך להתאים לאפשרות הראשונה בתפריט. בהמשך, `setupBoardSizes` תבחר גם את האפשרות הראשונה ב־Spinner בלי להפעיל את המאזין בזמן האתחול. הוסיפו את מצב הקטלוג לצד ברירת המחדל הזו:

~~~java
private List<ModelCatalog.Level> computerLevels = Collections.emptyList();
private ModelCatalog.Level selectedLevel;
private int boardSize = 7; // Matches the first (7×7) board-size option.
private int modelRequest;
~~~

ב־`onCreate`, במקום טעינת מודל יחיד, אתחלו את שתי הרשימות:

~~~java
setupBoardSizes();
setupComputerLevels();
render();
~~~

`setupBoardSizes` מחברת את תפריט הלוח למספרי הגודל:

~~~java
/** Builds a board with the size selected in the first dropdown. */
private void setupBoardSizes() {
    int[] sizes = {7, 11};
    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
            R.array.board_sizes, android.R.layout.simple_spinner_item);
    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
    binding.boardSizeSpinner.setAdapter(adapter);
    binding.boardSizeSpinner.setSelection(0, false);
    binding.boardSizeSpinner.setOnItemSelectedListener(
            new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view,
                                           int position, long id) {
                    if (boardSize != sizes[position]) {
                        boardSize = sizes[position];
                        refreshComputerLevels();
                    }
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {
                    // Keep the current board size.
                }
            });
}
~~~

טענו את הרשומות פעם אחת:

~~~java
/** Reads the Java-shaped entries from the asset catalog. */
private void setupComputerLevels() {
    try {
        computerLevels = ModelCatalog.load(getApplicationContext());
    } catch (Exception exception) {
        computerLevels = Collections.emptyList();
    }
    refreshComputerLevels();
}
~~~

`refreshComputerLevels` בונה רשימה זמנית עם מודלים שמתאימים לגודל שנבחר, ומחברת אותה ל־Spinner. אם מודל 2,620 האיטרציות נמצא ברשימה, הוא נבחר כברירת מחדל; בגודל אחר נבחר המודל הראשון המתאים:

~~~java
/** Shows only computer models whose input shape matches the selected board. */
private void refreshComputerLevels() {
    List<ModelCatalog.Level> matchingLevels = new ArrayList<>();
    for (ModelCatalog.Level level : computerLevels) {
        if (level.boardSize == boardSize) matchingLevels.add(level);
    }

    // Prefer iteration 2,620 for the default 7×7 board when it is available.
    int defaultPosition = 0;
    for (int i = 0; i < matchingLevels.size(); i++) {
        if ("trained-002620".equals(matchingLevels.get(i).id)) {
            defaultPosition = i;
            break;
        }
    }

    ArrayAdapter<ModelCatalog.Level> adapter = new ArrayAdapter<>(this,
            android.R.layout.simple_spinner_item, matchingLevels);
    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
    binding.computerLevelSpinner.setOnItemSelectedListener(null);
    binding.computerLevelSpinner.setAdapter(adapter);
    binding.computerLevelSpinner.setEnabled(!matchingLevels.isEmpty());
    binding.computerLevelSpinner.setSelection(defaultPosition, false);
    binding.computerLevelSpinner.setOnItemSelectedListener(
            new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view,
                                           int position, long id) {
                    switchComputerLevel(
                            (ModelCatalog.Level) parent.getItemAtPosition(position));
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {
                    // Keep the current selection.
                }
            });

    switchComputerLevel(matchingLevels.isEmpty() ? null : matchingLevels.get(defaultPosition));
}
~~~

ב־`switchComputerLevel`, שמרו את הבחירה, התחילו משחק חדש וטענו את קובץ המודל ברקע:

~~~java
/** Loads the selected model and starts a new game for its board size. */
private void switchComputerLevel(ModelCatalog.Level level) {
    if (level == selectedLevel && (modelLoading || valueModel != null)) return;

    selectedLevel = level;
    int request = ++modelRequest;
    TfliteValueModel previousModel = valueModel;
    valueModel = null;
    modelLoading = level != null;
    restartGame();

    aiExecutor.execute(() -> {
        if (previousModel != null) previousModel.close();
        if (level == null) return;

        TfliteValueModel loaded;
        try {
            loaded = new TfliteValueModel(getApplicationContext(), level.modelAsset);
        } catch (Exception exception) {
            loaded = null;
        }
        TfliteValueModel result = loaded;
        runOnUiThread(() -> {
            if (request != modelRequest) {
                if (result != null) result.close();
                return;
            }
            valueModel = result;
            modelLoading = false;
            render();
        });
    });
}
~~~

עדכנו גם את `restartGame` כך שישתמש בגודל שנבחר:

~~~diff
 private void restartGame() {
-    game = new HexGame();
+    game = new HexGame(boardSize);
     positionChanged();
     render();
 }
~~~

ב־`render`, עדכנו את התיאור הנגיש של הלוח ואת טקסט פרטי המודל:

לאחר הגדרת הלוח, הציגו את הגודל שנבחר לקוראי מסך:

~~~java
binding.boardView.setContentDescription(getString(R.string.board_description,
        game.getSize(), game.getSize()));
~~~

בקטע הצגת פרטי המודל, הוסיפו את שם השחקן בזמן טעינה ואת התיאור שלו אחרי הטעינה:

~~~java
if (!vsAi) {
    binding.modelText.setText(R.string.model_local);
} else if (selectedLevel == null || valueModel == null && !modelLoading) {
    binding.modelText.setText(R.string.model_unavailable_help);
} else if (modelLoading) {
    binding.modelText.setText(getString(R.string.model_loading, selectedLevel.label));
} else {
    binding.modelText.setText(selectedLevel.description);
}
~~~

ב־`TfliteValueModel.java`, קבלו את נתיב הנכס שנבחר מהקטלוג:

~~~diff
-public TfliteValueModel(Context context) throws LiteRtException {
+public TfliteValueModel(Context context, String modelAsset) throws LiteRtException {
     compiledModel = CompiledModel.create(context.getAssets(),
-            "hex_value_v1.tflite", CompiledModel.Options.getCPU());
+            modelAsset, CompiledModel.Options.getCPU());
~~~

## מריצים ומשחקים

בחרו 7×7 ובדקו שתפריט השחקנים מציג את איטרציות 100, 2,620 ו־5,000 בלבד. עברו ל־11×11 ובדקו שמופיעות איטרציות 100 ו־7,350. החליפו שחקן, התחילו משחק חדש ושחקו מול המחשב בכל אחד משני הגדלים.

**שאלת הבנה:** איזה שדה בקטלוג מקשר בין בחירת גודל הלוח לרשומות שמופיעות בתפריט השחקנים?

[לשיעור הבא: רמז למהלך הבא ←]({{ '/android/hex5/08-hint/' | relative_url }})
