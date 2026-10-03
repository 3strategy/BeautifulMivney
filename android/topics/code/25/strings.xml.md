ב־**strings.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 <resources>
     <string name="app_name">topics</string>
+    <string name="open_paged">Open paged offline list</string>
+    <string name="paged_title">Todos from API and local cache</string>
+    <string name="paged_status">Loading local page…</string>
+    <string name="paged_prev">Previous page</string>
+    <string name="paged_next">Next page</string>
+    <string name="paged_refresh">Refresh page</string>
+    <string name="paged_offline">Offline demo: skip network</string>
     <string name="http_title">HTTP and typed JSON</string>
     <string name="http_note">Load a todo, inspect a missing resource, or cancel a pending request.</string>
     <string name="load_todo">GET todo 1</string>
 ⁞
     <string name="cancel_request">Cancel request</string>
     <string name="retry_request">Retry request</string>
     <string name="http_idle">Choose a request.</string>
-    <string name="http_loading">GET /todos/%1$d â€¦</string>
+    <string name="http_loading">GET /todos/%1$d …</string>
     <string name="http_cancelled">Request cancelled.</string>
-    <string name="http_success">HTTP %1$d Â· %2$s</string>
-    <string name="http_error">HTTP %1$d Â· %2$s</string>
+    <string name="http_success">HTTP %1$d · %2$s</string>
+    <string name="http_error">HTTP %1$d · %2$s</string>
     <string name="http_network_error">Network error: %1$s</string>
     <string name="http_decode_error">JSON conversion failed: %1$s</string>
     <string name="http_invalid_body">HTTP %1$d, but the JSON is missing required fields.</string>
```

