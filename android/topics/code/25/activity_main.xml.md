ב־**activity_main.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
-                android:text="@string/http_title" />
+                android:text="@string/http_title"
+                android:textSize="24sp" />
 
             <TextView
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
+                android:layout_marginTop="8dp"
                 android:text="@string/http_note" />
 
             <Button
                 android:id="@+id/load_todo"
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
+                android:layout_marginTop="24dp"
                 android:text="@string/load_todo" />
+
+            <Button
+                android:id="@+id/open_paged"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="@string/open_paged" />
 
             <Button
                 android:id="@+id/load_missing"
 ⁞
                 android:id="@+id/loading"
                 android:layout_width="wrap_content"
                 android:layout_height="wrap_content"
+                android:layout_marginTop="16dp"
                 android:visibility="gone" />
 
             <TextView
                 android:id="@+id/status"
                 android:layout_width="match_parent"
                 android:layout_height="wrap_content"
+                android:layout_marginTop="16dp"
                 android:accessibilityLiveRegion="polite"
-                android:text="@string/http_idle" />
+                android:text="@string/http_idle"
+                android:textSize="18sp" />
 
             <TextView
                 android:id="@+id/todo_detail"
                 android:layout_width="match_parent"
-                android:layout_height="wrap_content" />
+                android:layout_height="wrap_content"
+                android:layout_marginTop="12dp" />
         </LinearLayout>
     </ScrollView>
+
 </androidx.constraintlayout.widget.ConstraintLayout>
```

