ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
+import android.hardware.Sensor;
+import android.hardware.SensorEvent;
+import android.hardware.SensorEventListener;
+import android.hardware.SensorManager;
 import android.os.Bundle;
-
 import androidx.activity.EdgeToEdge;
 import androidx.appcompat.app.AppCompatActivity;
 import androidx.core.graphics.Insets;
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
-
 import com.example.topics.databinding.ActivityMainBinding;
 
-public class MainActivity extends AppCompatActivity {
+public class MainActivity extends AppCompatActivity implements SensorEventListener {
+    private ActivityMainBinding binding;
+    private SensorManager sensors;
+    private Sensor accelerometer;
+    private final float[] gravity = new float[3];
+    private boolean initialized;
+    private long previousEventNs;
+    private long previousDisplayNs;
 
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
         });
+        sensors = getSystemService(SensorManager.class);
+        accelerometer = sensors.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
+        if (accelerometer == null) binding.reading.setText(R.string.no_sensor);
+    }
+
+    /**
+     * Starts a fresh estimate and registers only while this screen is active.
+     */
+    @Override
+    protected void onResume() {
+        super.onResume();
+        initialized = false;
+        previousEventNs = 0;
+        previousDisplayNs = 0;
+        if (accelerometer != null && !sensors.registerListener(this, accelerometer,
+                SensorManager.SENSOR_DELAY_UI)) binding.reading.setText(R.string.no_sensor);
+    }
+
+    /**
+     * Stops receiving samples before the screen becomes inactive.
+     */
+    @Override
+    protected void onPause() {
+        sensors.unregisterListener(this);
+        super.onPause();
+    }
+
+    /**
+     * Filters acceleration into a rough gravity estimate and displays a tilt at most 10 times/s.
+     * Linear movement can distort this estimate; it is not a precision orientation sensor.
+     *
+     * @param event acceleration in m/s squared with a monotonic nanosecond timestamp
+     */
+    @Override
+    public void onSensorChanged(SensorEvent event) {
+        if (event.sensor.getType() != Sensor.TYPE_ACCELEROMETER) return;
+        if (!initialized) {
+            // SensorEvent data can be reused; keep our own three-value estimate.
+            System.arraycopy(event.values, 0, gravity, 0, 3);
+            initialized = true;
+        } else {
+            for (int axis = 0; axis < 3; axis++) {
+                // Smooth every sample; the separate display throttle does not skip filtering.
+                gravity[axis] = 0.8f * gravity[axis] + 0.2f * event.values[axis];
+            }
+        }
+        long intervalMs = previousEventNs == 0 ? 0 : (event.timestamp - previousEventNs) / 1_000_000;
+        previousEventNs = event.timestamp;
+        // Nanoseconds measure sensor time, not wall-clock time.
+        if (event.timestamp - previousDisplayNs < 100_000_000L) return;
+        previousDisplayNs = event.timestamp;
+        double angle = Math.toDegrees(Math.atan2(gravity[0],
+                Math.hypot(gravity[1], gravity[2])));
+        binding.tilt.setProgress((int) Math.round(angle + 90));
+        binding.reading.setText(getString(R.string.sensor_reading, gravity[0], gravity[1],
+                gravity[2], angle, intervalMs));
+    }
+
+    /**
+     * Receives sensor accuracy changes; this demonstration has no calibration workflow.
+     *
+     * @param sensor sensor whose accuracy changed
+     * @param accuracy Android accuracy classification
+     */
+    @Override
+    public void onAccuracyChanged(Sensor sensor, int accuracy) {
+        // The demo uses the current reading; no calibration UI is needed here.
     }
 }
```

