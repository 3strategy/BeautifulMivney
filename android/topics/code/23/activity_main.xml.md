ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     tools:context=".MainActivity">
-
-    <TextView
-        android:layout_width="wrap_content"
-        android:layout_height="wrap_content"
-        android:text="Hello World!"
-        app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
+    <LinearLayout android:layout_width="0dp" android:layout_height="wrap_content"
+        android:orientation="vertical" android:padding="24dp"
+        app:layout_constraintTop_toTopOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent">
+        <TextView android:layout_width="match_parent" android:layout_height="wrap_content"
+            android:text="@string/nfc_intro" android:textSize="20sp" />
+        <Button android:id="@+id/sample" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:text="@string/nfc_sample" />
+        <TextView android:id="@+id/status" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:layout_marginTop="16dp"
+            android:accessibilityLiveRegion="polite" android:text="@string/nfc_wait" />
+    </LinearLayout>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

