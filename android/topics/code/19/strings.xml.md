ב־**strings.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
     <string name="selected_type">Selected image type: %1$s</string>
     <string name="document_selected">Document access kept for type: %1$s</string>
     <string name="document_temporary">Document opened, but persistent access was unavailable.</string>
-    <string name="preview_size">Camera preview size: %1$d Ã— %2$d (not saved).</string>
+    <string name="preview_size">Camera preview size: %1$d × %2$d (not saved).</string>
+    <string name="take_picture">Take full photo</string>
+    <string name="delete_photo">Delete saved photo</string>
+    <string name="photo_preview_description">Selected or captured photo</string>
+    <string name="saved_photo">Saved photo: %1$d bytes, %2$d × %3$d pixels, EXIF rotation %4$d°.</string>
+    <string name="photo_missing">Saved photo is missing or unreadable.</string>
+    <string name="photo_deleted">Saved photo deleted.</string>
+    <string name="no_camera_app">No camera app can take a photo on this device.</string>
 </resources>
```

