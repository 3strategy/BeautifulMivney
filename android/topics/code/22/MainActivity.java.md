ב־**MainActivity.java** החילו את שינויי האזורים הבאים. שורות `+` נוספות, שורות `-` מוסרות, שורות ההקשר נשארות; `⁞` מסמן אזור קיים שלא הוצג. שימרו את שאר קוד התבנית.

```diff
 package com.example.topics;
 
+import android.app.Activity;
+import android.content.ActivityNotFoundException;
+import android.content.Intent;
+import android.media.AudioAttributes;
+import android.media.AudioFocusRequest;
+import android.media.AudioManager;
 import android.os.Bundle;
-
+import android.speech.RecognizerIntent;
+import android.speech.tts.TextToSpeech;
+import android.speech.tts.UtteranceProgressListener;
 import androidx.activity.EdgeToEdge;
+import androidx.activity.result.ActivityResultLauncher;
+import androidx.activity.result.contract.ActivityResultContracts;
 import androidx.appcompat.app.AppCompatActivity;
 import androidx.core.graphics.Insets;
 import androidx.core.view.ViewCompat;
 import androidx.core.view.WindowInsetsCompat;
-
 import com.example.topics.databinding.ActivityMainBinding;
+import java.util.ArrayList;
+import java.util.Locale;
 
 public class MainActivity extends AppCompatActivity {
-
     private ActivityMainBinding binding;
-
+    private TextToSpeech speaker;
+    private boolean speakerReady;
+    private AudioManager audio;
+    private AudioFocusRequest focus;
+    private boolean hasFocus;
+    private String activeUtterance;
+    private int utteranceGeneration;
+    private final ActivityResultLauncher<Intent> recognize = registerForActivityResult(
+            new ActivityResultContracts.StartActivityForResult(), result -> {
+                if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
+                    binding.status.setText(R.string.speech_cancelled);
+                    return;
+                }
+                ArrayList<String> words = result.getData().getStringArrayListExtra(
+                        RecognizerIntent.EXTRA_RESULTS);
+                if (words == null || words.isEmpty()) {
+                    binding.status.setText(R.string.speech_empty);
+                    return;
+                }
+                binding.words.setText(words.get(0));
+                binding.status.setText(R.string.speech_received);
+            });
+
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
+        audio = getSystemService(AudioManager.class);
+        AudioAttributes attributes = new AudioAttributes.Builder()
+                .setUsage(AudioAttributes.USAGE_MEDIA)
+                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build();
+        focus = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
+                .setAudioAttributes(attributes)
+                .setWillPauseWhenDucked(true)
+                .setOnAudioFocusChangeListener(change -> {
+                    if (change < 0) runOnUiThread(() -> {
+                        if (!hasFocus || isDestroyed()) return;
+                        activeUtterance = null;
+                        if (speaker != null) speaker.stop();
+                        releaseFocus();
+                        binding.status.setText(R.string.focus_lost);
+                    });
+                }).build();
+        speaker = new TextToSpeech(this, state -> runOnUiThread(() -> {
+            // Both readiness and Views belong to main; a destroyed screen owns neither.
+            if (isDestroyed()) return;
+            speakerReady = state == TextToSpeech.SUCCESS && speaker != null
+                    && speaker.setLanguage(Locale.getDefault()) >= TextToSpeech.LANG_AVAILABLE;
+            binding.status.setText(speakerReady ? R.string.speech_ready : R.string.speech_unavailable);
+        }));
+        speaker.setOnUtteranceProgressListener(new UtteranceProgressListener() {
+            /**
+             * Receives engine start notification; the launch already set the speaking state.
+             *
+             * @param utteranceId identity assigned by speak
+             */
+            @Override
+            public void onStart(String utteranceId) { }
+            /**
+             * Posts completion to main and accepts it only for the current utterance.
+             *
+             * @param utteranceId identity of the completed utterance
+             */
+            @Override
+            public void onDone(String utteranceId) { runOnUiThread(() -> {
+                if (!isDestroyed() && utteranceId.equals(activeUtterance)) finishSpeaking();
+            }); }
+            /**
+             * Posts failure to main and accepts it only for the current utterance.
+             *
+             * @param utteranceId identity of the failed utterance
+             */
+            @Override
+            public void onError(String utteranceId) { runOnUiThread(() -> {
+                if (!isDestroyed() && utteranceId.equals(activeUtterance)) finishSpeaking();
+            }); }
+        });
+        binding.speak.setOnClickListener(v -> speak());
+        binding.listen.setOnClickListener(v -> listen());
+        binding.stop.setOnClickListener(v -> stopSpeaking());
+    }
+
+    /**
+     * Starts the current nonblank text only after the engine and audio focus are ready.
+     */
+    private void speak() {
+        String words = binding.words.getText().toString().trim();
+        if (!speakerReady || words.isEmpty()) {
+            binding.status.setText(R.string.speech_unavailable);
+            return;
+        }
+        if (audio.requestAudioFocus(focus) != AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
+            binding.status.setText(R.string.focus_denied);
+            return;
+        }
+        hasFocus = true;
+        // QUEUE_FLUSH can finish an older utterance after this one has started.
+        activeUtterance = "lesson-" + (++utteranceGeneration);
+        int result = speaker.speak(words, TextToSpeech.QUEUE_FLUSH, null, activeUtterance);
+        if (result != TextToSpeech.SUCCESS) finishSpeaking();
+        else binding.status.setText(R.string.speaking);
+    }
+
+    /**
+     * Stops our output and delegates recognition to an external app; cancellation preserves text.
+     */
+    private void listen() {
+        stopSpeaking();
+        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
+                .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
+                        RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
+                .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag());
+        try {
+            recognize.launch(intent);
+        } catch (ActivityNotFoundException noRecognizer) {
+            binding.status.setText(R.string.recognizer_unavailable);
+        }
+    }
+
+    /**
+     * Finishes the accepted current utterance and releases its audio focus once.
+     */
+    private void finishSpeaking() {
+        activeUtterance = null;
+        if (!hasFocus) return;
+        releaseFocus();
+        binding.status.setText(R.string.speech_stopped);
+    }
+
+    /**
+     * Abandons the same request object only if this screen currently owns focus.
+     */
+    private void releaseFocus() {
+        if (!hasFocus) return;
+        hasFocus = false;
+        audio.abandonAudioFocusRequest(focus);
+    }
+
+    /**
+     * Invalidates the utterance before stopping the engine and releasing focus.
+     */
+    private void stopSpeaking() {
+        activeUtterance = null; // Later callbacks from this utterance are now obsolete.
+        if (speaker != null) speaker.stop();
+        releaseFocus();
+        binding.status.setText(R.string.speech_stopped);
+    }
+
+    /**
+     * Stops Activity-owned playback when the screen is no longer visible.
+     */
+    @Override
+    protected void onStop() {
+        stopSpeaking();
+        super.onStop();
+    }
+
+    /**
+     * Releases the TTS engine and prevents late initialization from reviving readiness.
+     */
+    @Override
+    protected void onDestroy() {
+        speakerReady = false;
+        activeUtterance = null;
+        if (speaker != null) speaker.shutdown();
+        super.onDestroy();
     }
 }
```

