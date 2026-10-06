<details open markdown="1"><summary>הסבת הפרויקט ל־View Binding</summary>

View Binding יוצר מחלקה עם הפניות ישירות ל־Views שבקובץ ה־XML, כך שלא צריך לחפש כל רכיב שוב באמצעות `findViewById`. כך הקוד קצר יותר, ושגיאות של מזהה או המרה בין טיפוסים מתגלות מוקדם יותר.

### שלב 1 — הפעלת View Binding ב־Gradle

פתחו את `build.gradle.kts (Module :app)` והוסיפו את `buildFeatures`:

```diff
 android {
     namespace = "{{ include.namespace }}"
     compileSdk {
         version = release(36)
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

עִרְכוּ את `MainActivity.java`:

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

השדה `binding` מופיע באדום. בצעו right-click > ShowContextActions ובחרו Create Field:
![תפריט הפעולות של Android Studio עם האפשרות Create field 'binding' in 'MainActivity']({{ '/assets/img/hex5/make-binding-a-field-context-menu.png' | relative_url }})
זה יוסיף את השדה וגם יוסיף את ה-import שחסר לנו.

**הסבר קצר:** `binding.getRoot()` הוא ה־View הראשי של הפריסה. ב־`binding.main` ניגשים ל־View עם `android:id="@+id/main"`; לכן אין עוד צורך ב־`findViewById`. קוד ה־insets והריווח נשאר ללא שינוי.


</details>
