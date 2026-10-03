ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     tools:context=".MainActivity">
-
     <TextView
-        android:layout_width="wrap_content"
+        android:id="@+id/instruction"
+        android:layout_width="0dp"
         android:layout_height="wrap_content"
-        android:text="Hello World!"
+        android:padding="16dp"
+        android:text="@string/ball_instruction"
+        android:textSize="18sp"
+        app:layout_constraintTop_toTopOf="parent"
+        app:layout_constraintStart_toStartOf="parent"
+        app:layout_constraintEnd_toEndOf="parent" />
+    <com.example.topics.BouncingBallView
+        android:id="@+id/ball"
+        android:layout_width="0dp"
+        android:layout_height="0dp"
+        app:layout_constraintTop_toBottomOf="@id/instruction"
         app:layout_constraintBottom_toBottomOf="parent"
-        app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
-
+        app:layout_constraintEnd_toEndOf="parent" />
 </androidx.constraintlayout.widget.ConstraintLayout>
```

