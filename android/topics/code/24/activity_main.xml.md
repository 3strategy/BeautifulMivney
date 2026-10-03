ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
     tools:context=".MainActivity">
 
     <TextView
+        android:id="@+id/hello"
         android:layout_width="wrap_content"
         android:layout_height="wrap_content"
-        android:text="Hello World!"
+        android:text="@string/compose_intro"
         app:layout_constraintBottom_toBottomOf="parent"
         app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
         app:layout_constraintTop_toTopOf="parent" />
 
+    <Button
+        android:id="@+id/open_compose"
+        android:layout_width="wrap_content"
+        android:layout_height="wrap_content"
+        android:layout_marginTop="16dp"
+        android:text="@string/open_compose"
+        app:layout_constraintTop_toBottomOf="@id/hello"
+        app:layout_constraintStart_toStartOf="parent"
+        app:layout_constraintEnd_toEndOf="parent" />
+
 </androidx.constraintlayout.widget.ConstraintLayout>
```

