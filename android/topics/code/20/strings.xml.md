ב־**strings.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 <resources>
     <string name="app_name">topics</string>
+    <string name="location_intro">Find your position once. Start with approximate location; request precise only if you need it.</string>
+    <string name="approximate">Find approximate position</string>
+    <string name="precise">Upgrade to precise position</string>
+    <string name="open_map">Open position in map app</string>
+    <string name="location_idle">No location requested.</string>
+    <string name="location_denied">Location denied. The app still opens without it.</string>
+    <string name="location_off">Location provider is off. Turn on device location and retry.</string>
+    <string name="locating">Finding a current location…</string>
+    <string name="no_fix">No current fix. Retry outdoors or set an emulator location.</string>
+    <string name="location_result">%1$s fix: %2$.5f, %3$.5f (accuracy radius %4$.0f m). Open map only if you want to share this point with a map app.</string>
+    <string name="no_map_app">No map app is installed.</string>
 </resources>
```

