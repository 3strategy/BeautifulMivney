ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     tools:context=".MainActivity">
-
-    <TextView
-        android:layout_width="wrap_content"
+    <LinearLayout
+        android:layout_width="0dp"
         android:layout_height="wrap_content"
-        android:text="Hello World!"
-        app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
+        android:orientation="vertical"
+        android:padding="24dp"
+        app:layout_constraintTop_toTopOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent">
+        <TextView
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/location_intro"
+            android:textSize="20sp" />
+        <Button
+            android:id="@+id/approximate"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/approximate" />
+        <Button
+            android:id="@+id/precise"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/precise" />
+        <Button
+            android:id="@+id/open_map"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:enabled="false"
+            android:text="@string/open_map" />
+        <TextView
+            android:id="@+id/status"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:layout_marginTop="16dp"
+            android:accessibilityLiveRegion="polite"
+            android:text="@string/location_idle" />
+    </LinearLayout>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

