---
layout: page
title: "3 — Objects do useful work"
subtitle: "Filter and rename animals without processing JSON again"
permalink: /android/topics/petstore-json/03-use-objects/
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

[Lesson map]({{ '/android/topics/petstore-json/' | relative_url }}) · [Swagger Petstore](https://petstore3.swagger.io/) · [עברית]({{ '/android/topics/petstore-json/he/03-use-objects/' | relative_url }}?lang=he)

Start from checkpoint 2. We already have a `Pet[]`. Now use that array as ordinary Java data.

Predict before coding: if `pets[0].name` changes, should the JSON response string also change? Should the server's animal change?

## Add three actions

Add these buttons immediately before the table heading, and connect them inside `onCreate`. Add the two new methods alongside the parser and renderer.

### app > res > layout > activity_main.xml

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
                 android:text="Deserialize to Pet[]" />
+            <Button
+                android:id="@+id/showAvailable"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Show available objects" />
+            <Button
+                android:id="@+id/showAll"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Show all objects" />
+            <Button
+                android:id="@+id/renameFirst"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="Rename first object to Pixel" />
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
```

### app > kotlin+java > com.example.topic > MainActivity

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
 import com.google.gson.Gson;
 import com.google.gson.JsonParseException;
 
+import java.util.ArrayList;
 import java.util.Collections;
 import java.util.Scanner;
 import java.util.Map;
```

```diff
         binding.getPets.setOnClickListener(v -> getPets());
         binding.loadDemo.setOnClickListener(v -> loadDemo());
         binding.parsePets.setOnClickListener(v -> parsePets());
+        binding.showAvailable.setOnClickListener(v -> showAvailable());
+        binding.showAll.setOnClickListener(v -> renderPets(pets));
+        binding.renameFirst.setOnClickListener(v -> renameFirst());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         }
     }
 
+    /** Selects existing objects by their status; no JSON processing is needed. */
+    private void showAvailable() {
+        ArrayList<Pet> available = new ArrayList<>();
+        for (Pet pet : pets) {
+            if ("available".equals(pet.status)) available.add(pet);
+        }
+        renderPets(available.toArray(new Pet[0]));
+    }
+
+    /** Mutates an object in memory while leaving both JSON text areas untouched. */
+    private void renameFirst() {
+        if (pets.length == 0) {
+            binding.objectStatus.setText("Deserialize some animals first");
+            return;
+        }
+        pets[0].name = "Pixel";
+        renderPets(pets);
+    }
+
     /** Displays object fields; this method never reads or parses JSON. */
     private void renderPets(Pet[] animals) {
         binding.petTable.removeAllViews();
```

## Follow object identity

`showAvailable` reads each object's `status` and collects matching objects. It neither downloads nor deserializes anything. The new ArrayList contains references to existing animals. `toArray(new Pet[0])` gives the renderer an array; **Show all** renders the original array again.

`renameFirst` changes the first object's field, then rebuilds the table. It does not change either text area and sends no request. Rendering a filter does not change the stored `pets` array, so Rename first always means the first animal in that original array, not necessarily the first filtered row. It returns to the full table to make the result clear.

## Build and prove the difference

1. Load the demo and deserialize: three animals.
2. Show available: Milo and Nala. Show all: all three return.
3. Rename first: the table now says Pixel. The editable JSON still says Milo. The last HTTP body is also unchanged.
4. Deserialize the unchanged sample again: Milo returns, because you reconstructed new objects from the old text.
5. Change Luna's status to available in Notepad++, paste the array, deserialize, and filter. Predict the count before pressing the button.

<details markdown="1">
<summary>Why this demonstrates the power of deserialization</summary>

Once text becomes objects, the program can use familiar fields, conditions, loops, arrays and methods. You do not write a string-splitting parser each time you want to filter, rename, count or display animals. The table is a view of those objects, not the data itself. Serialization will let us make a new text representation of the changed objects.

</details>

[Download checkpoint source]({{ "/android/topics/petstore-json/downloads/03-use-objects.zip" | relative_url }})

[Next: serialize and POST](../04-post/)
