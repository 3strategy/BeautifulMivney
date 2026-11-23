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

Open `MainActivity.java`. Add this import alongside the other imports:

```java
import {{ include.namespace }}.databinding.ActivityMainBinding;
```

Add the `binding` field inside the class, **above `@Override` and outside `onCreate`**. Compare the start of `onCreate` in the two columns. Replace the red lines with the green lines at the same location. Keep any code after `});` in place.

<div class="two-columns before-after binding-start-comparison" dir="rtl">
<div markdown="1" class="column" dir="ltr">

#### Before

    {% highlight diff mark_lines="2 4" %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
-        setContentView(R.layout.activity_main);
-        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    {% endhighlight %}

</div>
<div markdown="1" class="column" dir="ltr">

#### After

    {% highlight diff mark_lines="4 6" %}
+    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);

+        binding = ActivityMainBinding.inflate(getLayoutInflater());
+        setContentView(binding.getRoot());
+        ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    {% endhighlight %}

</div>
</div>

The `inflate` call loads the Views from `activity_main.xml`, and `setContentView(binding.getRoot())` displays the screen. `binding.main` gives direct access to the View with ID `@+id/main`, where the listener applies padding.

<details markdown="1">
<summary>Detailed comparison of the same onCreate changes</summary>

This comparison highlights the individual edits inside `onCreate`.

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

If you add the lines in `onCreate` first, Android Studio can create the missing field. Right-click `binding`, choose **Show Context Actions**, and select **Create field**. Check the field and import against the examples above.

![Android Studio context actions showing Create field]({{ '/assets/img/hex5/make-binding-a-field-context-menu.png' | relative_url }})

</details>

</details>
