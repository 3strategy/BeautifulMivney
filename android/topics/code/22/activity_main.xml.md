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
+            android:text="@string/speech_intro"
+            android:textSize="20sp" />
+        <EditText
+            android:id="@+id/words"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:hint="@string/speech_hint"
+            android:inputType="textCapSentences|textMultiLine"
+            android:minLines="2"
+            android:text="@string/speech_sample" />
+        <Button android:id="@+id/speak" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:text="@string/speak" />
+        <Button android:id="@+id/stop" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:text="@string/stop" />
+        <Button android:id="@+id/listen" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:text="@string/listen" />
+        <TextView android:id="@+id/status" android:layout_width="match_parent"
+            android:layout_height="wrap_content" android:layout_marginTop="16dp"
+            android:accessibilityLiveRegion="polite" android:text="@string/speech_loading" />
+    </LinearLayout>
 </androidx.constraintlayout.widget.ConstraintLayout>
```

