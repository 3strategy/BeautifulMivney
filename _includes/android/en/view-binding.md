<details open markdown="1"><summary>Converting the project to View Binding</summary>

View Binding generates a class with direct references to the Views in the XML file, so you no longer need to look up each component using `findViewById`. This makes the code shorter and catches incorrect IDs and type conversions earlier.

### Step 1 — Enabling View Binding in Gradle

Open `build.gradle.kts (Module :app)` and add `buildFeatures`:

```diff
 android {
     namespace = "{{ include.namespace }}"
     compileSdk {
         version = release({{ include.compile_sdk | default: 36 }})
     }

+    buildFeatures {
+        viewBinding = true
+    }
+
     defaultConfig {
         ...
     }
 }
```

{: .box-success}
After editing, sync Gradle ![Gradle sync]({{ '/assets/img/gradle_sync_elephant_gray.svg' | relative_url }}).

### Step 2 — Convert `MainActivity` to use Binding

Edit `MainActivity.java`:

{% code_diff %}
 @Override
 protected void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     EdgeToEdge.enable(this);
-    setContentView(R.layout.activity_main);
-    ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
+    binding = ActivityMainBinding.inflate(getLayoutInflater());
+    setContentView(binding.getRoot());
+    ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
         Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
         v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
         return insets;
     });
 }
{% endcode_diff %}

The `binding` field appears in red. Choose right-click > ShowContextActions, then Create Field:
![Android Studio's context actions menu showing Create field 'binding' in 'MainActivity']({{ '/assets/img/hex5/make-binding-a-field-context-menu.png' | relative_url }})
This adds both the field and the missing import.

**Brief explanation:** `binding.getRoot()` is the root View of the layout. `binding.main` accesses the View with `android:id="@+id/main"`, so `findViewById` is no longer needed. The insets and padding code stays unchanged.


</details>
