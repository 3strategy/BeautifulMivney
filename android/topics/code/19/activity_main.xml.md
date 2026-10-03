ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
             android:layout_height="wrap_content"
             android:text="@string/camera_preview" />
 
+        <Button
+            android:id="@+id/take_picture"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/take_picture" />
+
+        <Button
+            android:id="@+id/delete_photo"
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:text="@string/delete_photo" />
+
+        <ImageView
+            android:id="@+id/image"
+            android:layout_width="match_parent"
+            android:layout_height="220dp"
+            android:contentDescription="@string/photo_preview_description"
+            android:scaleType="fitCenter" />
+
         <TextView
             android:id="@+id/result"
             android:layout_width="match_parent"
```

