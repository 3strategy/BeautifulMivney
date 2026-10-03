ב־**build.gradle.kts** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 plugins {
     alias(libs.plugins.android.application)
+    alias(libs.plugins.compose.compiler)
 }
 
 android {
 ⁞
         sourceCompatibility = JavaVersion.VERSION_11
         targetCompatibility = JavaVersion.VERSION_11
     }
-
     buildFeatures {
         viewBinding = true
+        compose = true
     }
 }
 
 ⁞
     implementation(libs.appcompat)
     implementation(libs.constraintlayout)
     implementation(libs.material)
+    implementation(platform(libs.compose.bom))
+    implementation(libs.activity.compose)
+    implementation(libs.compose.material3)
+    implementation(libs.compose.foundation)
+    implementation(libs.compose.ui)
+    implementation(libs.navigation.compose)
     testImplementation(libs.junit)
     androidTestImplementation(libs.espresso.core)
     androidTestImplementation(libs.ext.junit)
+    androidTestImplementation(platform(libs.compose.bom))
+    androidTestImplementation(libs.compose.ui.test.junit4)
+    debugImplementation(libs.compose.ui.test.manifest)
 }
```

