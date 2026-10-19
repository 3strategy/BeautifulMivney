---
layout: page
title: "2 — JSON text becomes Java objects"
subtitle: "One conversion, several animals, and a table built from fields"
permalink: /android/topics/petstore-json/02-objects/
lang: en
menu_set: android
full-width: true
tags: [HTTP, JSON, Java, Swagger, Android]
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

[Lesson map]({{ '/android/topics/petstore-json/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/)

Start from checkpoint 1. Our next result is an editable JSON array and a table populated from the reconstructed objects. The original HTTP response remains visible and unchanged.

## Inspect and edit text in Notepad++

[Download pets.json]({{ '/android/topics/petstore-json/downloads/pets.json' | relative_url }}) and open it in Notepad++. Select **Language → J → JSON** if the file is not already highlighted. No formatting plugin is required; indentation and newlines help people read the text but do not create its structure.

```json
[
  {"id": 101, "name": "Milo", "status": "available", "photoUrls": []},
  {"id": 102, "name": "Luna", "status": "pending", "photoUrls": []},
  {"id": 103, "name": "Nala", "status": "available", "photoUrls": []}
]
```

`[...]` is an array; each `{...}` is one JSON object. Names and string values use double quotes. `101` is a number, while `"101"` is a string. A colon connects a name and value; commas separate members or array items. `photoUrls` is an array, empty in this example. JSON does not allow comments or a trailing comma.

JSON also supports booleans (`true`, `false`), `null`, and nested objects. Petstore responses may include nested `category` and `tags`. Our first model deliberately uses only four fields. Gson ignores the other incoming fields; they do not become secretly accessible through our `Pet` class. Ignored data is not retained when that model is serialized later.

Change Milo's name in Notepad++, save as UTF-8, then copy the array into the app's editable JSON area. This exercise uses copy/paste; no Android file-picker or Notepad++ plugin is needed. **Load demo JSON** loads the packaged sample into that same editable area. It does not pretend that a server sent it.

## Add the model, sample, and table

Add Gson and sync Gradle. Create `Pet` as a new Java class in **app > kotlin+java > com.example.topic**. To create the sample resource, right-click **app > res → New → Android Resource Directory**, choose resource type **raw**, then create `pets.json` there. The sample's three objects are intentional, not public-server data.

The new controls go after the response area, inside the existing vertical LinearLayout. The diff shows their insertion point. The horizontal scroll container keeps long IDs/names readable without turning this into a RecyclerView lesson.

### Gradle Scripts > build.gradle.kts (Module :app)

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
 }
 
 dependencies {
+    implementation("com.google.code.gson:gson:2.14.0")
     implementation("com.android.volley:volley:1.2.1")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
```

### app > res > layout > activity_main.xml

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
                     android:fontFamily="monospace"
                     android:textIsSelectable="true" />
             </androidx.core.widget.NestedScrollView>
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="JSON to deserialize — edit or paste from Notepad++"
+                android:textStyle="bold" />
+            <Button
+                android:id="@+id/loadDemo"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Load demo JSON" />
+            <EditText
+                android:id="@+id/jsonInput"
+                android:layout_width="match_parent"
+                android:layout_height="180dp"
+                android:gravity="top|start"
+                android:fontFamily="monospace"
+                android:inputType="textMultiLine|textNoSuggestions"
+                android:hint="Paste a JSON array here"
+                android:importantForAutofill="no" />
+            <Button
+                android:id="@+id/parsePets"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Deserialize to Pet[]" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Java objects — table built from Pet fields"
+                android:textStyle="bold" />
+            <TextView
+                android:id="@+id/objectStatus"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:accessibilityLiveRegion="polite"
+                android:text="No objects yet" />
+            <HorizontalScrollView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:fillViewport="true">
+                <TableLayout
+                    android:id="@+id/petTable"
+                    android:layout_width="wrap_content"
+                    android:layout_height="wrap_content"
+                    android:stretchColumns="1" />
+            </HorizontalScrollView>
         </LinearLayout>
     </androidx.core.widget.NestedScrollView>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

### app > kotlin+java > com.example.topic > MainActivity

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
 package com.example.topic;
 
 import android.os.Bundle;
+import android.widget.TableRow;
+import android.widget.TextView;
 
 import androidx.activity.EdgeToEdge;
 import androidx.appcompat.app.AppCompatActivity;
```

```diff
 import com.android.volley.toolbox.Volley;
 import com.example.topic.databinding.ActivityMainBinding;
 
+import com.google.gson.Gson;
+import com.google.gson.JsonParseException;
+
 import java.util.Collections;
+import java.util.Scanner;
 import java.util.Map;
 
 public class MainActivity extends AppCompatActivity {
```

```diff
     private ActivityMainBinding binding;
     private RequestQueue queue;
     private int httpStatus;
+    private final Gson gson = new Gson();
+    private Pet[] pets = new Pet[0];
 
     /** Creates the screen and connects its network action. */
     @Override
```

```diff
         });
         queue = Volley.newRequestQueue(getApplicationContext());
         binding.getPets.setOnClickListener(v -> getPets());
+        binding.loadDemo.setOnClickListener(v -> loadDemo());
+        binding.parsePets.setOnClickListener(v -> parsePets());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         StringRequest request = new StringRequest(Request.Method.GET,
                 BASE_URL + "/pet/findByStatus?status=available", text -> {
             binding.responseJson.setText(text);
+            binding.jsonInput.setText(text);
             binding.status.setText("GET HTTP " + httpStatus);
         }, this::showError) {
             @Override
```

```diff
         request.setShouldCache(false);
         request.setTag(this);
         queue.add(request);
+    }
+
+    /** Loads editable, predictable JSON without changing the last HTTP response. */
+    private void loadDemo() {
+        try (Scanner scanner = new Scanner(getResources().openRawResource(R.raw.pets), "UTF-8")) {
+            binding.jsonInput.setText(scanner.useDelimiter("\\A").next());
+        }
+    }
+
+    /** Reconstructs objects from text, then builds a table from their fields. */
+    private void parsePets() {
+        try {
+            String jsonText = binding.jsonInput.getText().toString();
+            Pet[] parsed = gson.fromJson(jsonText, Pet[].class);
+            if (parsed == null) throw new JsonParseException("Expected an array, not null");
+            for (Pet pet : parsed) {
+                if (pet == null) throw new JsonParseException("A pet cannot be null");
+            }
+            pets = parsed;
+            renderPets(pets);
+        } catch (JsonParseException error) {
+            pets = new Pet[0];
+            renderPets(pets);
+            binding.objectStatus.setText("Cannot deserialize: " + error.getMessage());
+        }
+    }
+
+    /** Displays object fields; this method never reads or parses JSON. */
+    private void renderPets(Pet[] animals) {
+        binding.petTable.removeAllViews();
+        addRow("ID", "Name", "Status");
+        for (Pet pet : animals) {
+            addRow(String.valueOf(pet.id), pet.name, pet.status);
+        }
+        binding.objectStatus.setText(animals.length + " animal objects shown");
+    }
+
+    /** Adds one table row with three ordinary text cells. */
+    private void addRow(String id, String name, String status) {
+        TableRow row = new TableRow(this);
+        for (String value : new String[]{id, name, status}) {
+            TextView cell = new TextView(this);
+            cell.setText(String.valueOf(value));
+            cell.setPadding(12, 8, 12, 8);
+            row.addView(cell);
+        }
+        binding.petTable.addView(row);
     }
 
     /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
```

### app > kotlin+java > com.example.topic > Pet

Create this new file.

```java
package com.example.topic;

/** The Petstore fields used in this lesson; Gson ignores other incoming fields. */
public class Pet {
    public long id;
    public String name;
    public String status;
    public String[] photoUrls;
}
```

### app > res > raw > pets.json

Create this new file.

```json
[
  {"id": 101, "name": "Milo", "status": "available", "photoUrls": []},
  {"id": 102, "name": "Luna", "status": "pending", "photoUrls": []},
  {"id": 103, "name": "Nala", "status": "available", "photoUrls": []}
]
```

## Point to the boundary

This is the line that creates the animals:

```java
Pet[] parsed = gson.fromJson(jsonText, Pet[].class);
```

Before it, `jsonText` is one string. After it, `parsed` is a Java array containing three `Pet` instances. `Pet[].class` says which Java type Gson should reconstruct. It is a type description, not an existing animal array. Matching JSON names populate matching fields; `long` holds IDs, `String` holds names/statuses, and `String[]` holds photo URLs. Gson uses the class's implicit no-argument constructor.

`renderPets` receives objects and reads their fields. It never searches the JSON text for a name. `addRow` merely makes the three TextViews for one row. These are UI scaffolding; the loop over `Pet` objects is the important part.

The sample loader uses a Scanner to read our small UTF-8 resource as one string; closing it closes the resource. Nothing is deserialized until you press **Deserialize to Pet[]**. GET also copies the received text into the editable area, so exactly the same parser works for a server response or a local example.

This is a small debug teaching project with release optimization already disabled in the template. Gson's reflective field mapping needs additional care with shrinking/obfuscation in production Android builds; keep that separate from this first text-to-object demonstration. See the [Gson project guidance](https://github.com/google/gson).

## Build, predict, and verify

1. Build and run. Tap **Load demo JSON**, then **Deserialize to Pet[]**. Expect Milo, Luna, and Nala in three rows plus a header.
2. Change `"Milo"` to `"Pepper"` in the editable text. Predict whether the table changes immediately. It does not: press Deserialize to reconstruct objects from the new text.
3. Paste `[]` and deserialize. Expect a header and `0 animal objects shown`.
4. Remove a quote or closing bracket. Expect **Cannot deserialize**, with no stale rows left over. Try `{}`, `null`, and `[null]` too: the screen expects an array of non-null pet objects.
5. Try GET, then Deserialize. The original server body and the table are two representations of the same data at the moment of conversion.

Missing fields are a separate issue from broken JSON syntax. With this simple model, a missing numeric ID becomes `0`, and missing reference fields become `null`; the table shows `null` explicitly. This lab does not enforce the complete API schema. POST will construct its required fields deliberately.

[Download checkpoint source]({{ "/android/topics/petstore-json/downloads/02-objects.zip" | relative_url }})

[Next: use the objects](../03-use-objects/)
