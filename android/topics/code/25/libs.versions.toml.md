ב־**libs.versions.toml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 constraintlayout = "2.2.2"
 retrofit = "3.0.0"
 mockwebserver = "4.12.0"
+room = "2.8.5"
+serialization = "1.8.1"
 
 [libraries]
 junit = { group = "junit", name = "junit", version.ref = "junit" }
 ⁞
 retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
 retrofit-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }
 mockwebserver = { group = "com.squareup.okhttp3", name = "mockwebserver", version.ref = "mockwebserver" }
+room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
+room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
+serialization-core = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-core", version.ref = "serialization" }
 
 [plugins]
 android-application = { id = "com.android.application", version.ref = "agp" }
-
+room = { id = "androidx.room", version.ref = "room" }
```

