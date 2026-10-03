ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 import com.example.topics.databinding.ActivityMainBinding;
 
 public class MainActivity extends AppCompatActivity {
-
     private ActivityMainBinding binding;
 
+    /**
+     * Creates the current Activity View tree and connects the screen's actions.
+     *
+     * @param savedInstanceState prior small UI snapshot, or null for a fresh launch
+     */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
 ⁞
         setContentView(binding.getRoot());
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
-            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);            return insets;
+            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
+            return insets;
         });
     }
+
+    /**
+     * Allows rendering only while the Activity is active.
+     */
+    @Override
+    protected void onResume() {
+        super.onResume();
+        binding.ball.resume();
+    }
+
+    /**
+     * Stops and joins rendering before the Activity becomes inactive.
+     */
+    @Override
+    protected void onPause() {
+        binding.ball.pause();
+        super.onPause();
+    }
 }
```

