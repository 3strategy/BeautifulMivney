<details open markdown="1"><summary>הסבת הפרויקט ל־View Binding</summary>

View Binding יוצר מחלקה עם הפניות ישירות ל־Views שבקובץ ה־XML, כך שלא צריך לחפש כל רכיב שוב באמצעות `findViewById`. כך הקוד קצר יותר, ושגיאות של מזהה או המרה בין טיפוסים מתגלות מוקדם יותר.

### שלב 1 — הפעלת View Binding ב־Gradle

פתחו את `build.gradle.kts (Module :app)` והוסיפו את `buildFeatures`:

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
לאחר העריכה סנכרנו את ה-Gradle ![alt]({{ '/assets/img/gradle_sync_elephant_gray.svg' | relative_url }}).

### שלב 2 — המרת `MainActivity` לשימוש ב־Binding

פתחו את `MainActivity.java`. הוסיפו את ה־import הבא ליד שאר ה־imports:

```java
import {{ include.namespace }}.databinding.ActivityMainBinding;
```

הוסיפו את השדה `binding` בגוף המחלקה, **מעל `@Override` ומחוץ ל־`onCreate`**. השוו את תחילת `onCreate` בעמודות: החליפו את השורות האדומות בשורות הירוקות שבאותו מקום. אם יש קוד אחרי `});`, השאירו אותו במקומו.

<div class="two-columns before-after binding-start-comparison" dir="rtl">
<div markdown="1" class="column">

#### לפני

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
<div markdown="1" class="column">

#### אחרי

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

השורה עם `inflate` טוענת את ה־Views מתוך `activity_main.xml`, ו־`setContentView(binding.getRoot())` מציגה את המסך. `binding.main` נותן גישה ישירה ל־View שמזההו `@+id/main`, שעליו מחילים את הריווח.

<details markdown="1">
<summary>השוואה מפורטת של אותם שינויים ב־onCreate</summary>

בהשוואה הזאת מודגשים השינויים בתוך השורות של `onCreate`.

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

אם ערכתם קודם את `onCreate`, אפשר ליצור את השדה דרך Android Studio. לחצו לחיצה ימנית על `binding`, בחרו **Show Context Actions** ואז **Create field**. בדקו שהשדה וה־import תואמים לדוגמאות למעלה.

![תפריט הפעולות של Android Studio עם האפשרות Create field]({{ '/assets/img/hex5/make-binding-a-field-context-menu.png' | relative_url }})

</details>

</details>
