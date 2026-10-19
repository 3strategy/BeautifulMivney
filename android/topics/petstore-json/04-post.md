---
layout: page
title: "4 — An object becomes a POST body"
subtitle: "See the exact outgoing JSON, then compare the returned JSON"
permalink: /android/topics/petstore-json/04-post/
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

Start from checkpoint 3. GET requested animals. POST now sends a new animal object to Petstore. Keep the distinction between the Java object, its serialized JSON string, and the server's response.

## First send POST in Swagger

Expand **POST /pet → Try it out**. Choose `application/json` for the request body and response format. Replace the large example with:

```json
{"id": 2610194001, "name": "Classroom cat 🐈", "status": "available", "photoUrls": []}
```

Before executing, replace that example ID with a distinct positive ID for your exercise. This is a shared sandbox: avoid modifying an existing example animal. Execute, inspect the outgoing curl/body and the actual returned response. The server's schema requires `name` and `photoUrls`; an empty photo URL array is enough for our demonstration.

`Content-Type: application/json; charset=UTF-8` describes the body **we send**. `Accept: application/json` requests the response format **we receive**. These headers have different jobs. POST is not simply GET with another URL: it sends a body and may create server state.

## Implement the visible conversion

Add the POST controls above the response heading, so the outgoing and returned JSON can be compared. Add `postPet` to the Activity. The button makes a **new** animal; it does not post the entire array or mutate the animals already in the table.

### app > res > layout > activity_main.xml

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
                 android:layout_height="wrap_content"
                 android:accessibilityLiveRegion="polite"
                 android:text="Ready — send a request" />
+            <Button
+                android:id="@+id/postPet"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="POST a new classroom cat" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="Outgoing POST body — serialized object"
+                android:textStyle="bold" />
+            <TextView
+                android:id="@+id/outgoingJson"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:fontFamily="monospace"
+                android:textIsSelectable="true" />
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
```

### app > kotlin+java > com.example.topic > MainActivity

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 
+import com.android.volley.DefaultRetryPolicy;
 import com.android.volley.NetworkResponse;
 import com.android.volley.Request;
 import com.android.volley.RequestQueue;
```

```diff
 import com.google.gson.Gson;
 import com.google.gson.JsonParseException;
 
+import java.nio.charset.StandardCharsets;
 import java.util.ArrayList;
 import java.util.Collections;
 import java.util.Scanner;
```

```diff
         binding.showAvailable.setOnClickListener(v -> showAvailable());
         binding.showAll.setOnClickListener(v -> renderPets(pets));
         binding.renameFirst.setOnClickListener(v -> renameFirst());
+        binding.postPet.setOnClickListener(v -> postPet());
     }
 
     /** Fetches JSON as text; no Java Pet objects are created here. */
```

```diff
         binding.petTable.addView(row);
     }
 
+    /** Serializes a new animal and sends exactly the text displayed above the response. */
+    private void postPet() {
+        Pet animal = new Pet();
+        animal.id = System.currentTimeMillis();
+        animal.name = "Classroom cat 🐈";
+        animal.status = "available";
+        animal.photoUrls = new String[0];
+        String outgoingJson = gson.toJson(animal);
+        binding.outgoingJson.setText(outgoingJson);
+        queue.cancelAll(this);
+        binding.status.setText("Sending POST...");
+        StringRequest request = new StringRequest(Request.Method.POST,
+                BASE_URL + "/pet", text -> {
+            binding.responseJson.setText(text);
+            binding.status.setText("POST HTTP " + httpStatus + " — returned JSON shown below");
+        }, this::showError) {
+            @Override
+            public Map<String, String> getHeaders() {
+                return Collections.singletonMap("Accept", "application/json");
+            }
+
+            @Override
+            public String getBodyContentType() {
+                return "application/json; charset=UTF-8";
+            }
+
+            @Override
+            public byte[] getBody() {
+                return outgoingJson.getBytes(StandardCharsets.UTF_8);
+            }
+
+            @Override
+            protected Response<String> parseNetworkResponse(NetworkResponse response) {
+                httpStatus = response.statusCode;
+                return Response.success(
+                        new String(response.data, java.nio.charset.StandardCharsets.UTF_8), null);
+            }
+        };
+        request.setRetryPolicy(new DefaultRetryPolicy(10000, 0, 1f));
+        request.setShouldCache(false);
+        request.setTag(this);
+        queue.add(request);
+    }
+
     /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
     private void showError(VolleyError error) {
         NetworkResponse response = error.networkResponse;
```

## Trace the outgoing bytes

```java
String outgoingJson = gson.toJson(animal);
```

This produces a new string from the object's fields. The cat emoji deliberately exercises UTF-8 on the outgoing and returned bodies. It is the same string shown in **Outgoing POST body** and encoded as UTF-8 by `getBody()`. The request has a JSON content type. The success callback displays the response as text, making no assumption that it is identical to the request.

The timestamp ID greatly reduces classroom collisions; it is not a general uniqueness guarantee. The server may normalize values or add fields, so compare parsed field values rather than whitespace or JSON member order. The response body panel always shows the **last** HTTP response. POST replaces that panel, while the editable array and existing table remain as they were.

`new DefaultRetryPolicy(10000, 0, 1f)` gives POST a ten-second timeout and zero automatic retries. A timed-out POST may still have reached the server; blindly retrying could create or update state again. Starting another request or leaving the screen cancels local callback delivery, but cannot undo a request the server already processed.

## Build and compare

1. Build and run; load and deserialize the demo if you want a table beside the experiment.
2. Tap **POST a new classroom cat**. Compare the outgoing body with the last response body; expect `POST HTTP 200` when the demo service succeeds.
3. Check `id`, `name`, `status`, and `photoUrls`. No credentials were required during validation on 19 October 2026. If you get a different status, inspect its visible body.
4. Copy the returned ID into **GET /pet/{petId}** in Swagger. A successful immediate GET demonstrates that this server stored the example. Public demo data can later change or reset; do not treat it as durable storage.
5. Change `animal.name` in Java, run again, and predict which outgoing and returned values change.

For another small experiment, serialize the existing `pets` array with `gson.toJson(pets)` after Rename first. That new string contains Pixel; the old response string still contains the old value. Do not send this array to POST /pet, which expects **one object**.

[Download checkpoint source]({{ "/android/topics/petstore-json/downloads/04-post.zip" | relative_url }})

[Optional: save JSON and reconstruct objects after restart](../05-preferences/)
