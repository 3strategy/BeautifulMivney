ב־**strings.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 <resources>
     <string name="app_name">topics</string>
+    <string name="sensor_intro">Tilt the phone sideways. The bar shows the filtered X-axis gravity angle.</string>
+    <string name="waiting_sensor">Waiting for accelerometer readings…</string>
+    <string name="no_sensor">This device has no accelerometer.</string>
+    <string name="sensor_reading">Gravity estimate X=%1$.2f, Y=%2$.2f, Z=%3$.2f m/s²; sideways tilt=%4$.0f°; sample interval=%5$d ms.</string>
 </resources>
```

