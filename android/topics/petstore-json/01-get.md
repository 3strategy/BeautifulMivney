---
layout: page
title: "1 — A request and a response"
subtitle: "GET in Swagger, then receive the same kind of text in Java"
permalink: /android/topics/petstore-json/01-get/
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

## Predict, then explore in Swagger

Open [Swagger Petstore](https://petstore3.swagger.io/) and expand **pet → GET /pet/findByStatus**. Select **Try it out**, choose `available`, choose `application/json` for the response format/Accept selector, and press **Execute**.

Inspect **Request URL**, the generated **curl**, **Server response → Code**, and **Response body**. Use the executed server response, not the static “Example Value” shown in the documentation. The request is equivalent to:

```http
GET /api/v3/pet/findByStatus?status=available HTTP/1.1
Host: petstore3.swagger.io
Accept: application/json
```

`GET` requests data. The path identifies the resource; the query asks for a status. `Accept` tells the server which response format we want. `200` is a successful HTTP status; the body is the returned text. Other status codes are also responses. A connection failure may produce no HTTP response at all.

Predict: will receiving the text create any Java animal objects? **No**: our first checkpoint receives a `String` only. The text happens to be JSON; we do not interpret it yet.

Petstore is a public, shared sample server. Its animals can change, so no lesson depends on a fixed pet ID or row count. GET and POST worked without credentials when checked on 19 October 2026, even though the API definition advertises security schemes. If behavior changes, inspect the actual Swagger response; do not invent a secret key or hide the failure. The downloadable sample in checkpoint 2 keeps JSON exercises usable offline.

## Implement the first runnable checkpoint

Use Android Studio's **Android** view. Gradle changes below are additions to the existing module configuration; keep every template dependency. Sync after the dependency and View Binding changes, then continue with the XML and Java edits. Generated `ActivityMainBinding` becomes available once the layout is processed by the build.

The root ConstraintLayout remains. Its Hello World child is replaced by a scrolling lab area. The response has its own 160dp scrolling area so a long body cannot push all later controls far down the screen. Monospace and selectable text make the body easy to inspect and copy.

### Gradle Scripts > build.gradle.kts (Module :app)

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
             }
         }
     }
+    buildFeatures {
+        viewBinding = true
+    }
+
     compileOptions {
         sourceCompatibility = JavaVersion.VERSION_11
         targetCompatibility = JavaVersion.VERSION_11
```

```diff
 }
 
 dependencies {
+    implementation("com.android.volley:volley:1.2.1")
     implementation(libs.activity.ktx)
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
```

### app > manifests > AndroidManifest.xml

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
 <?xml version="1.0" encoding="utf-8"?>
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
     xmlns:tools="http://schemas.android.com/tools">
+
+    <uses-permission android:name="android.permission.INTERNET" />
 
     <application
         android:allowBackup="true"
```

### app > res > layout > activity_main.xml

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

```diff
     android:layout_height="match_parent"
     tools:context=".MainActivity">
 
-    <TextView
-        android:layout_width="wrap_content"
-        android:layout_height="wrap_content"
-        android:text="Hello World!"
+    <androidx.core.widget.NestedScrollView
+        android:layout_width="0dp"
+        android:layout_height="0dp"
+        android:fillViewport="true"
+        app:layout_constraintTop_toTopOf="parent"
         app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent">
+        <LinearLayout
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:orientation="vertical"
+            android:padding="16dp">
+            <Button
+                android:id="@+id/getPets"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="GET available pets" />
+            <TextView
+                android:id="@+id/status"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:accessibilityLiveRegion="polite"
+                android:text="Ready — send a request" />
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp"
+                android:text="Last HTTP response body — unchanged text"
+                android:textStyle="bold" />
+            <androidx.core.widget.NestedScrollView
+                android:layout_width="match_parent"
+                android:layout_height="160dp">
+                <TextView
+                    android:id="@+id/responseJson"
+                    android:layout_width="match_parent"
+                    android:layout_height="wrap_content"
+                    android:fontFamily="monospace"
+                    android:textIsSelectable="true" />
+            </androidx.core.widget.NestedScrollView>
+        </LinearLayout>
+    </androidx.core.widget.NestedScrollView>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

### app > kotlin+java > com.example.topic > MainActivity

Apply these additions and removals; keep the surrounding template code. Lines beginning with `+` are added and lines beginning with `-` are removed. Do not type the markers.

First change these two existing references. The field and initialization needed by `binding` are added in the structural diff below.

{% code_diff %}
-        setContentView(R.layout.activity_main);
+        setContentView(binding.getRoot());
-        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
+        ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
{% endcode_diff %}

```diff
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 
+import com.android.volley.NetworkResponse;
+import com.android.volley.Request;
+import com.android.volley.RequestQueue;
+import com.android.volley.Response;
+import com.android.volley.VolleyError;
+import com.android.volley.toolbox.StringRequest;
+import com.android.volley.toolbox.Volley;
+import com.example.topic.databinding.ActivityMainBinding;
+
+import java.util.Collections;
+import java.util.Map;
+
 public class MainActivity extends AppCompatActivity {
+    private static final String BASE_URL = "https://petstore3.swagger.io/api/v3";
+    private ActivityMainBinding binding;
+    private RequestQueue queue;
+    private int httpStatus;
 
+    /** Creates the screen and connects its network action. */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         EdgeToEdge.enable(this);
+        binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
             v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
             return insets;
         });
+        queue = Volley.newRequestQueue(getApplicationContext());
+        binding.getPets.setOnClickListener(v -> getPets());
+    }
+
+    /** Fetches JSON as text; no Java Pet objects are created here. */
+    private void getPets() {
+        queue.cancelAll(this);
+        binding.status.setText("Sending GET...");
+        StringRequest request = new StringRequest(Request.Method.GET,
+                BASE_URL + "/pet/findByStatus?status=available", text -> {
+            binding.responseJson.setText(text);
+            binding.status.setText("GET HTTP " + httpStatus);
+        }, this::showError) {
+            @Override
+            public Map<String, String> getHeaders() {
+                return Collections.singletonMap("Accept", "application/json");
+            }
+
+            @Override
+            protected Response<String> parseNetworkResponse(NetworkResponse response) {
+                httpStatus = response.statusCode;
+                return Response.success(
+                        new String(response.data, java.nio.charset.StandardCharsets.UTF_8), null);
+            }
+        };
+        request.setShouldCache(false);
+        request.setTag(this);
+        queue.add(request);
+    }
+
+    /** Keeps HTTP error bodies visible and distinguishes them from connection failures. */
+    private void showError(VolleyError error) {
+        NetworkResponse response = error.networkResponse;
+        binding.status.setText(response == null
+                ? "Network failure: " + error.getClass().getSimpleName()
+                : "HTTP " + response.statusCode);
+        binding.responseJson.setText(response == null ? "No HTTP response body received."
+                : new String(response.data, java.nio.charset.StandardCharsets.UTF_8));
+    }
+
+    /** Cancels delivery to this screen when it is no longer visible. */
+    @Override
+    protected void onStop() {
+        queue.cancelAll(this);
+        binding.status.setText("Ready — requests cancelled when leaving the screen");
+        super.onStop();
     }
 }
```

## Trace the Java code

`StringRequest` asks Volley to decode the response bytes into text. It does not deserialize animals. `queue.add(request)` starts asynchronous work; the method returns while the network runs. The success callback receives `text` later, on the main thread, so it can update the Views. `this::showError` is Java shorthand for `error -> showError(error)`; it passes failures to our existing error-display method. The code never blocks the UI waiting for the server.

The two overrides expose the JSON Accept header and HTTP status. `parseNetworkResponse` records the status and decodes the body bytes explicitly as UTF-8. JSON exchanged over the network uses UTF-8, including Hebrew names and emoji; a missing charset header must not make the body display as Latin-1. `Response.success(text, null)` passes that text to the success callback without a cache entry; caching is disabled for this lab. `showError` preserves HTTP error bodies; it distinguishes a received error response from a transport failure with no response body.

The cache is disabled so GET demonstrates a network request. Requests are tagged with this Activity; starting a new one or leaving the screen cancels delivery of the previous request. `httpStatus` therefore belongs to the current request. This small lab does not preserve pending work or results through rotation; press GET again after returning. State ownership and repositories belong in the later [HTTP lab]({{ '/android/topics/08-http-client/' | relative_url }}).

## Build and observe

Build and run on an emulator. Tap **GET available pets**. Expect `GET HTTP 200` and a JSON array in the response area. Scroll inside it, select text, and compare its field names with Swagger. The exact animals may differ because other users share the server.

Turn the emulator's network off and retry. Expect a visible network failure; restore networking afterwards. A `404`, `401`, or `5xx` is an HTTP response, not proof of no internet. Keep the body visible when diagnosing it.

[Download checkpoint source]({{ "/android/topics/petstore-json/downloads/01-get.zip" | relative_url }})

[Next: JSON becomes objects](../02-objects/)
