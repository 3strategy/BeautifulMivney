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
