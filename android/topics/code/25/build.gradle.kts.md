ב־**build.gradle.kts** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 plugins {
     alias(libs.plugins.android.application)
+    alias(libs.plugins.room)
+}
+
+room {
+    schemaDirectory("$projectDir/schemas")
 }
 
 android {
 ⁞
         sourceCompatibility = JavaVersion.VERSION_11
         targetCompatibility = JavaVersion.VERSION_11
     }
-
     buildFeatures {
         viewBinding = true
     }
 ⁞
     implementation(libs.material)
     implementation(libs.retrofit)
     implementation(libs.retrofit.gson)
+    implementation(libs.room.runtime)
+    implementation(libs.serialization.core)
+    annotationProcessor(libs.room.compiler)
     testImplementation(libs.junit)
     testImplementation(libs.mockwebserver)
     androidTestImplementation(libs.espresso.core)
     androidTestImplementation(libs.ext.junit)
+    androidTestImplementation(libs.mockwebserver)
 }
```

