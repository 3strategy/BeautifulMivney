ב־**libs.versions.toml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 material = "1.14.0"
 activityKtx = "1.13.0"
 constraintlayout = "2.2.2"
+kotlin = "2.3.21"
+composeBom = "2026.09.00"
+navigationCompose = "2.10.2"
 
 [libraries]
 junit = { group = "junit", name = "junit", version.ref = "junit" }
 ⁞
 material = { group = "com.google.android.material", name = "material", version.ref = "material" }
 activity-ktx = { group = "androidx.activity", name = "activity-ktx", version.ref = "activityKtx" }
 constraintlayout = { group = "androidx.constraintlayout", name = "constraintlayout", version.ref = "constraintlayout" }
+compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
+compose-material3 = { group = "androidx.compose.material3", name = "material3" }
+compose-foundation = { group = "androidx.compose.foundation", name = "foundation" }
+compose-ui = { group = "androidx.compose.ui", name = "ui" }
+compose-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
+compose-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
+activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityKtx" }
+navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
 
 [plugins]
 android-application = { id = "com.android.application", version.ref = "agp" }
-
+compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
```

