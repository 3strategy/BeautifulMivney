ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
+import android.nfc.FormatException;
+import android.nfc.NdefMessage;
+import android.nfc.NdefRecord;
+import android.nfc.NfcAdapter;
+import android.nfc.Tag;
+import android.nfc.tech.Ndef;
 import android.os.Bundle;
-
 import androidx.activity.EdgeToEdge;
 import androidx.appcompat.app.AppCompatActivity;
 import androidx.core.graphics.Insets;
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
-
 import com.example.topics.databinding.ActivityMainBinding;
+import java.io.IOException;
 
 public class MainActivity extends AppCompatActivity {
+    private ActivityMainBinding binding;
+    private NfcAdapter nfc;
+    private boolean readerEnabled;
+    private volatile int readerGeneration;
 
-    private ActivityMainBinding binding;
-
+    /**
+     * Creates the current Activity View tree and connects the screen's actions.
+     *
+     * @param savedInstanceState prior small UI snapshot, or null for a fresh launch
+     */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
 ⁞
         setContentView(binding.getRoot());
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
-            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);            return insets;
+            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
+            return insets;
+        });
+        nfc = NfcAdapter.getDefaultAdapter(this);
+        binding.sample.setOnClickListener(v -> {
+            NdefRecord record = NdefRecord.createTextRecord("en", "LAB-ROOM-3");
+            showMessage(new NdefMessage(new NdefRecord[]{record}));
         });
     }
+
+    /**
+     * Starts a new reader session only if NFC hardware is present and enabled.
+     */
+    @Override
+    protected void onResume() {
+        super.onResume();
+        readerGeneration++;
+        if (nfc == null) {
+            binding.status.setText(R.string.nfc_missing);
+        } else if (!nfc.isEnabled()) {
+            binding.status.setText(R.string.nfc_off);
+        } else {
+            binding.status.setText(R.string.nfc_ready);
+            int session = readerGeneration;
+            nfc.enableReaderMode(this, tag -> readTag(tag, session),
+                    NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_NFC_B
+                            | NfcAdapter.FLAG_READER_NFC_F | NfcAdapter.FLAG_READER_NFC_V,
+                    null);
+            readerEnabled = true;
+        }
+    }
+
+    /**
+     * Invalidates pending results and disables this screen's reader session.
+     */
+    @Override
+    protected void onPause() {
+        readerGeneration++; // Invalidate radio results before disabling new reads.
+        if (readerEnabled) {
+            nfc.disableReaderMode(this);
+            readerEnabled = false;
+        }
+        super.onPause();
+    }
+
+    /**
+     * Reads NDEF on the reader thread and posts only a current-session result to main.
+     * The connection closes after success and after failures.
+     *
+     * @param tag tag detected by Reader Mode
+     * @param expected generation captured when this reader session was registered
+     */
+    private void readTag(Tag tag, int expected) {
+        if (expected != readerGeneration) return;
+        Ndef ndef = Ndef.get(tag);
+        if (ndef == null) {
+            runOnUiThread(() -> {
+                if (expected == readerGeneration && !isDestroyed())
+                    binding.status.setText(R.string.nfc_not_ndef);
+            });
+            return;
+        }
+        try {
+            ndef.connect();
+            NdefMessage message = ndef.getNdefMessage(); // Blocking radio I/O, not the UI thread.
+            runOnUiThread(() -> {
+                if (expected == readerGeneration && !isDestroyed()) showMessage(message);
+            });
+        } catch (IOException | FormatException | SecurityException error) {
+            runOnUiThread(() -> {
+                if (expected == readerGeneration && !isDestroyed())
+                    binding.status.setText(R.string.nfc_read_failed);
+            });
+        } finally {
+            try { ndef.close(); } catch (IOException ignored) { }
+        }
+    }
+
+    /**
+     * Displays only a station accepted by the shared parser.
+     *
+     * @param message possibly null NDEF message from hardware or the sample
+     */
+    private void showMessage(NdefMessage message) {
+        String station = StationRecord.read(message);
+        if (station == null) {
+            binding.status.setText(R.string.nfc_unexpected);
+        } else {
+            binding.status.setText(getString(R.string.nfc_station, station));
+        }
+    }
 }
```

