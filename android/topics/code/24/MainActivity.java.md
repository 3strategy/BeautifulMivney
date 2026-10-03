ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
 import android.os.Bundle;
+import android.content.Intent;
 
 import androidx.activity.EdgeToEdge;
 import androidx.appcompat.app.AppCompatActivity;
 ⁞
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
         EdgeToEdge.enable(this);
         binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
+        binding.openCompose.setOnClickListener(v -> startActivity(new Intent(this, ComposeActivity.class)));
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
             v.setPadding(bars.left, bars.top, bars.right, bars.bottom);            return insets;
```

