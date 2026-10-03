ב־**strings.xml** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 <resources>
     <string name="app_name">topics</string>
+    <string name="nfc_intro">Tap a classroom NDEF text tag containing a station ID such as LAB-ROOM-3.</string>
+    <string name="nfc_sample">Try a sample record</string>
+    <string name="nfc_wait">Checking NFC…</string>
+    <string name="nfc_missing">This device has no NFC reader. The sample still works.</string>
+    <string name="nfc_off">NFC is turned off. Enable it in device settings.</string>
+    <string name="nfc_ready">NFC ready. Hold a classroom tag near the phone.</string>
+    <string name="nfc_not_ndef">Tag found, but it is not an NDEF tag.</string>
+    <string name="nfc_read_failed">Tag left the field or could not be read. Tap again.</string>
+    <string name="nfc_unexpected">NDEF read, but it is not a valid classroom station ID.</string>
+    <string name="nfc_station">Classroom station: %1$s</string>
 </resources>
```

