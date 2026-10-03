ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
 import android.os.Bundle;
+import android.content.Intent;
 import android.view.View;
 
 import androidx.activity.EdgeToEdge;
 ⁞
         EdgeToEdge.enable(this);
         binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
+        binding.openPaged.setOnClickListener(v -> startActivity(new Intent(this, PagedTodosActivity.class)));
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
             v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
```

