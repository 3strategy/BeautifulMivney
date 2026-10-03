ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 import android.app.Notification;
 import android.app.NotificationChannel;
 import android.app.NotificationManager;
+import android.content.ActivityNotFoundException;
 import android.content.Intent;
 import android.content.pm.PackageManager;
 import android.graphics.Bitmap;
+import android.graphics.BitmapFactory;
+import android.graphics.Matrix;
+import android.media.ExifInterface;
 import android.net.Uri;
 import android.os.Build;
 import android.os.Bundle;
 ⁞
 import androidx.annotation.RequiresApi;
 import androidx.core.app.ActivityCompat;
 import androidx.core.content.ContextCompat;
+import androidx.core.content.FileProvider;
 import androidx.core.graphics.Insets;
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
 
 import com.example.topics.databinding.ActivityMainBinding;
 
+import java.io.File;
+import java.io.IOException;
+import java.util.UUID;
+import java.util.concurrent.ExecutorService;
+import java.util.concurrent.Executors;
+
 public class MainActivity extends AppCompatActivity {
     private static final String CHANNEL = "contract_lab";
     private ActivityMainBinding binding;
+    private String pendingPhotoName;
+    private int imageGeneration;
+    private final ExecutorService imageWorker = Executors.newSingleThreadExecutor();
     private final ActivityResultLauncher<String> requestNotification = registerForActivityResult(
             new ActivityResultContracts.RequestPermission(), granted -> {
                 if (granted) postNotification();
                 else binding.result.setText(R.string.notification_denied);
             });
     private final ActivityResultLauncher<PickVisualMediaRequest> pickPhoto =
-            registerForActivityResult(new ActivityResultContracts.PickVisualMedia(), uri ->
-                    binding.result.setText(uri == null ? getString(R.string.selection_cancelled)
-                            : getString(R.string.selected_type,
-                                    getContentResolver().getType(uri))));
+            registerForActivityResult(new ActivityResultContracts.PickVisualMedia(), uri -> {
+                if (uri == null) {
+                    binding.result.setText(R.string.selection_cancelled);
+                } else {
+                    binding.result.setText(getString(R.string.selected_type,
+                            getContentResolver().getType(uri)));
+                    imageGeneration++; // A pending saved-photo decode must not replace this selection.
+                    binding.image.setImageURI(uri); // Temporary grant: no filesystem path is needed.
+                }
+            });
     private final ActivityResultLauncher<String[]> openDocument = registerForActivityResult(
             new ActivityResultContracts.OpenDocument(), uri -> {
                 if (uri == null) {
 ⁞
                 }
                 try {
                     // Persist the read grant, not a copy of the document or its URI string.
                     getContentResolver().takePersistableUriPermission(uri,
                             Intent.FLAG_GRANT_READ_URI_PERMISSION);
                     binding.result.setText(getString(R.string.document_selected,
                             getContentResolver().getType(uri)));
 ⁞
             });
     private final ActivityResultLauncher<Void> cameraPreview = registerForActivityResult(
             new ActivityResultContracts.TakePicturePreview(), this::showPreview);
+    private final ActivityResultLauncher<Uri> takePicture = registerForActivityResult(
+            new ActivityResultContracts.TakePicture(), saved -> {
+                if (pendingPhotoName == null) return;
+                File photo = new File(photoDirectory(), pendingPhotoName);
+                if (saved && photo.length() > 0) {
+                    // The preference names a completed photo only after the camera reports success.
+                    String previous = getPreferences(MODE_PRIVATE).getString("photo", null);
+                    getPreferences(MODE_PRIVATE).edit().putString("photo", pendingPhotoName).apply();
+                    if (previous != null && !previous.equals(pendingPhotoName)) {
+                        new File(photoDirectory(), previous).delete();
+                    }
+                    showSavedPhoto(photo);
+                } else {
+                    photo.delete();
+                    binding.result.setText(R.string.selection_cancelled);
+                }
+                pendingPhotoName = null;
+            });
 
     /**
      * Creates the current Activity View tree and connects the screen's actions.
 ⁞
         EdgeToEdge.enable(this);
         binding = ActivityMainBinding.inflate(getLayoutInflater());
         setContentView(binding.getRoot());
+        if (savedInstanceState != null) pendingPhotoName = savedInstanceState.getString("pending_photo");
         ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
             Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
             v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
 ⁞
         binding.openDocument.setOnClickListener(view -> openDocument.launch(
                 new String[]{"application/pdf", "text/plain"}));
         binding.cameraPreview.setOnClickListener(view -> cameraPreview.launch(null));
+        binding.takePicture.setOnClickListener(view -> captureFullPhoto());
+        binding.deletePhoto.setOnClickListener(view -> deleteSavedPhoto());
+        String savedPhoto = getPreferences(MODE_PRIVATE).getString("photo", null);
+        if (savedPhoto != null) showSavedPhoto(new File(photoDirectory(), savedPhoto));
+    }
+
+    /**
+     * Preserves the outstanding camera destination across Activity recreation.
+     * The completed photo name lives separately in preferences.
+     *
+     * @param outState small Activity recreation snapshot
+     */
+    @Override
+    protected void onSaveInstanceState(Bundle outState) {
+        outState.putString("pending_photo", pendingPhotoName);
+        super.onSaveInstanceState(outState);
+    }
+
+    /**
+     * Returns this app's private photo directory, creating it when necessary.
+     *
+     * @return directory covered by the narrow FileProvider rule
+     * @throws IllegalStateException if the directory cannot be created
+     */
+    private File photoDirectory() {
+        File directory = new File(getFilesDir(), "photos");
+        if (!directory.exists() && !directory.mkdirs()) throw new IllegalStateException("Cannot create photos directory");
+        return directory;
+    }
+
+    /**
+     * Allocates a unique pending destination and launches an external camera with its URI.
+     * The last completed photo stays selected until the new attempt succeeds.
+     */
+    private void captureFullPhoto() {
+        pendingPhotoName = UUID.randomUUID() + ".jpg";
+        File photo = new File(photoDirectory(), pendingPhotoName);
+        Uri uri = FileProvider.getUriForFile(this, getPackageName() + ".files", photo);
+        try {
+            takePicture.launch(uri);
+        } catch (ActivityNotFoundException noCameraApp) {
+            pendingPhotoName = null;
+            binding.result.setText(R.string.no_camera_app);
+        }
+    }
+
+    /**
+     * Decodes a sampled and EXIF-oriented Bitmap off main.
+     * Only the current image request may update the current View tree.
+     *
+     * @param photo completed app-private photo file
+     */
+    private void showSavedPhoto(File photo) {
+        int expected = ++imageGeneration;
+        if (!photo.isFile() || photo.length() == 0) {
+            binding.result.setText(R.string.photo_missing);
+            return;
+        }
+        imageWorker.execute(() -> {
+            try {
+                BitmapFactory.Options bounds = new BitmapFactory.Options();
+                // Discover dimensions without allocating the full pixel buffer.
+                bounds.inJustDecodeBounds = true;
+                BitmapFactory.decodeFile(photo.getAbsolutePath(), bounds);
+                BitmapFactory.Options sample = new BitmapFactory.Options();
+                sample.inSampleSize = 1;
+                while (Math.max(bounds.outWidth, bounds.outHeight) / sample.inSampleSize > 800) {
+                    // Powers of two reduce decoded pixels before creating the display Bitmap.
+                    sample.inSampleSize *= 2;
+                }
+                Bitmap bitmap = BitmapFactory.decodeFile(photo.getAbsolutePath(), sample);
+                if (bitmap == null) throw new IOException("Unsupported image");
+                int orientation = new ExifInterface(photo.getAbsolutePath()).getAttributeInt(
+                        ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
+                Matrix matrix = new Matrix();
+                int degrees = 0;
+                switch (orientation) {
+                    case ExifInterface.ORIENTATION_FLIP_HORIZONTAL:
+                        matrix.postScale(-1, 1);
+                        break;
+                    case ExifInterface.ORIENTATION_ROTATE_180:
+                        degrees = 180;
+                        break;
+                    case ExifInterface.ORIENTATION_FLIP_VERTICAL:
+                        matrix.postScale(1, -1);
+                        break;
+                    case ExifInterface.ORIENTATION_TRANSPOSE:
+                        matrix.postScale(1, -1);
+                        degrees = 90;
+                        break;
+                    case ExifInterface.ORIENTATION_ROTATE_90:
+                        degrees = 90;
+                        break;
+                    case ExifInterface.ORIENTATION_TRANSVERSE:
+                        matrix.postScale(-1, 1);
+                        degrees = 90;
+                        break;
+                    case ExifInterface.ORIENTATION_ROTATE_270:
+                        degrees = 270;
+                        break;
+                    default:
+                        break;
+                }
+                matrix.postRotate(degrees);
+                Bitmap oriented = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
+                final int exifDegrees = degrees;
+                runOnUiThread(() -> {
+                    if (isDestroyed() || expected != imageGeneration || !photo.getName().equals(
+                            getPreferences(MODE_PRIVATE).getString("photo", null))) return;
+                    binding.image.setImageBitmap(oriented);
+                    binding.result.setText(getString(R.string.saved_photo, photo.length(), bounds.outWidth, bounds.outHeight, exifDegrees));
+                });
+            } catch (IOException error) {
+                runOnUiThread(() -> {
+                    if (!isDestroyed() && expected == imageGeneration && photo.getName().equals(
+                            getPreferences(MODE_PRIVATE).getString("photo", null)))
+                        binding.result.setText(R.string.photo_missing);
+                });
+            }
+        });
+    }
+
+    /**
+     * Removes a completed photo and its preference only after file deletion succeeds.
+     */
+    private void deleteSavedPhoto() {
+        String name = getPreferences(MODE_PRIVATE).getString("photo", null);
+        if (name == null) return;
+        if (new File(photoDirectory(), name).delete()) {
+            imageGeneration++; // Deletion invalidates both success and error callbacks.
+            getPreferences(MODE_PRIVATE).edit().remove("photo").apply();
+            binding.image.setImageDrawable(null);
+            binding.result.setText(R.string.photo_deleted);
+        }
+    }
+
+    /**
+     * Invalidates image results and shuts down this Activity's worker.
+     */
+    @Override
+    protected void onDestroy() {
+        imageGeneration++;
+        imageWorker.shutdown();
+        super.onDestroy();
     }
 
     /**
```

