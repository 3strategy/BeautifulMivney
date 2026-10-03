ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
+import android.Manifest;
+import android.content.ActivityNotFoundException;
+import android.content.Intent;
+import android.content.pm.PackageManager;
+import android.location.Location;
+import android.location.LocationManager;
+import android.net.Uri;
 import android.os.Bundle;
-
+import android.os.CancellationSignal;
 import androidx.activity.EdgeToEdge;
+import androidx.activity.result.ActivityResultLauncher;
+import androidx.activity.result.contract.ActivityResultContracts;
 import androidx.appcompat.app.AppCompatActivity;
+import androidx.core.content.ContextCompat;
 import androidx.core.graphics.Insets;
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
-
 import com.example.topics.databinding.ActivityMainBinding;
+import java.util.Locale;
 
 public class MainActivity extends AppCompatActivity {
+    private ActivityMainBinding binding;
+    private CancellationSignal pending;
+    private Location shownLocation;
+    private boolean preciseRequested;
+    private int requestGeneration;
+    private final ActivityResultLauncher<String> askCoarse = registerForActivityResult(
+            new ActivityResultContracts.RequestPermission(), granted -> {
+                if (granted) locate();
+                else binding.status.setText(R.string.location_denied);
+            });
+    private final ActivityResultLauncher<String[]> askPrecise = registerForActivityResult(
+            new ActivityResultContracts.RequestMultiplePermissions(), grants -> {
+                if (Boolean.TRUE.equals(grants.get(Manifest.permission.ACCESS_COARSE_LOCATION))) locate();
+                else binding.status.setText(R.string.location_denied);
+            });
 
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
         EdgeToEdge.enable(this);
         binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
+        if (savedInstanceState != null) preciseRequested = savedInstanceState.getBoolean("precise_requested");
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
-            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);            return insets;
+            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
+            return insets;
         });
+        binding.approximate.setOnClickListener(v -> {
+            preciseRequested = false;
+            if (has(Manifest.permission.ACCESS_COARSE_LOCATION)) locate();
+            else askCoarse.launch(Manifest.permission.ACCESS_COARSE_LOCATION);
+        });
+        binding.precise.setOnClickListener(v -> {
+            preciseRequested = true;
+            if (has(Manifest.permission.ACCESS_FINE_LOCATION)) locate();
+            else askPrecise.launch(new String[]{Manifest.permission.ACCESS_FINE_LOCATION,
+                    Manifest.permission.ACCESS_COARSE_LOCATION});
+        });
+        binding.openMap.setOnClickListener(v -> openMap());
+    }
+
+    /**
+     * Checks the current grant; a previous permission result is not a permanent promise.
+     *
+     * @param permission manifest permission to check
+     * @return true when Android currently grants it
+     */
+    private boolean has(String permission) {
+        return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
+    }
+
+    /**
+     * Requests one fix for the current user choice and rejects obsolete results.
+     * A null fix, disabled provider, or changed permission becomes visible UI state.
+     */
+    private void locate() {
+        if (pending != null) pending.cancel();
+        // Cancellation saves work; generation also rejects an already queued callback.
+        int expected = ++requestGeneration;
+        shownLocation = null;
+        binding.openMap.setEnabled(false);
+        LocationManager manager = getSystemService(LocationManager.class);
+        boolean precise = preciseRequested && has(Manifest.permission.ACCESS_FINE_LOCATION);
+        String provider = LocationManager.GPS_PROVIDER;
+        if (!manager.isProviderEnabled(provider)) {
+            binding.status.setText(R.string.location_off);
+            return;
+        }
+        pending = new CancellationSignal();
+        binding.status.setText(R.string.locating);
+        try {
+            manager.getCurrentLocation(provider, pending, getMainExecutor(), location -> {
+                if (expected != requestGeneration || isDestroyed()) return;
+                pending = null;
+                if (location == null) {
+                    binding.status.setText(R.string.no_fix);
+                    return;
+                }
+                shownLocation = location;
+                binding.status.setText(getString(R.string.location_result,
+                        precise ? "precise" : "approximate", location.getLatitude(),
+                        location.getLongitude(), location.getAccuracy()));
+                binding.openMap.setEnabled(true);
+            });
+        } catch (SecurityException permissionChanged) {
+            pending = null;
+            binding.status.setText(R.string.location_denied);
+        }
+    }
+
+    /**
+     * Offers the displayed fix to a map app without storing or uploading coordinates.
+     */
+    private void openMap() {
+        if (shownLocation == null) return;
+        // URI coordinates require decimal points regardless of the phone language.
+        String target = String.format(Locale.US, "geo:%.6f,%.6f?z=14",
+                shownLocation.getLatitude(), shownLocation.getLongitude());
+        try {
+            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(target)));
+        } catch (ActivityNotFoundException noMapApp) {
+            binding.status.setText(R.string.no_map_app);
+        }
+    }
+
+    /**
+     * Invalidates results and cancels outstanding location work when the screen leaves view.
+     */
+    @Override
+    protected void onStop() {
+        requestGeneration++;
+        if (pending != null) {
+            pending.cancel();
+            pending = null;
+        }
+        super.onStop();
+    }
+
+    /**
+     * Saves the precision choice, not a potentially stale location fix.
+     *
+     * @param outState bundle used to recreate this screen
+     */
+    @Override
+    protected void onSaveInstanceState(Bundle outState) {
+        outState.putBoolean("precise_requested", preciseRequested);
+        super.onSaveInstanceState(outState);
     }
 }
```

