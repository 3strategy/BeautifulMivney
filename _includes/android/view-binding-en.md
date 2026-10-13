<details open markdown="1"><summary>Convert the project to View Binding</summary>

View Binding generates a class containing direct references to the Views in an XML layout. You no longer need to find each component with `findViewById`. This makes the code shorter and catches ID or type errors earlier.

### Step 1 — Enable View Binding in Gradle

Open `build.gradle.kts (Module :app)` under **Gradle Scripts** and add `buildFeatures` inside the existing `android` block. Keep your project's current compile SDK configuration:

```diff
 android {
     namespace = "{{ include.namespace }}"
     ⁞
+    buildFeatures {
+        viewBinding = true
+    }
+
     defaultConfig {
         ...
     }
 }
```

The `⁞` and `...` lines represent existing configuration omitted from this excerpt; do not type them into Gradle.

{: .box-success}
After editing, sync Gradle using the ![Gradle Sync icon]({{ '/assets/img/gradle_sync_elephant_gray.svg' | relative_url }}) button.

### Step 2 — Convert MainActivity to use Binding

Edit `MainActivity.java`:

{% capture binding_comparison %}
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
{% endcapture %}
{{ binding_comparison | replace: 'לפני', 'Before' | replace: 'אחרי', 'After' | replace: 'קוד ', 'Code ' | replace: '<h4 dir="rtl">', '<h4 dir="ltr">' }}

The `binding` field is unresolved. Right-click it, choose **Show Context Actions**, and select **Create field 'binding' in 'MainActivity'**:

![Android Studio context actions showing Create field 'binding' in 'MainActivity']({{ '/assets/img/hex5/make-binding-a-field-context-menu.png' | relative_url }})

This creates the field and adds the required import. Verify that the class contains:

```java
import com.example.topics.databinding.ActivityMainBinding;
```

```java
private ActivityMainBinding binding;
```

For another package, use that package's generated `databinding` import.

**Why this works:** `binding.getRoot()` returns the layout's root View. `binding.main` accesses the View with `android:id="@+id/main"`, so `findViewById` is no longer necessary. The window-inset and padding logic stays unchanged.

</details>
