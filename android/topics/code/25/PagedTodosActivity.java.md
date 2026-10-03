צרו **PagedTodosActivity.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.example.topics.databinding.ActivityPagedTodosBinding;

public class PagedTodosActivity extends AppCompatActivity {
    private ActivityPagedTodosBinding binding;
    private PagedTodoRepository repository;
    private int page = 1;
    private int generation;

    /**
     * Creates the current Activity View tree and connects the screen's actions.
     *
     * @param savedInstanceState prior small UI snapshot, or null for a fresh launch
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        binding = ActivityPagedTodosBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return insets;
        });
        repository = new PagedTodoRepository(this);
        if (savedInstanceState != null) {
            page = savedInstanceState.getInt("page", 1);
            binding.offline.setChecked(savedInstanceState.getBoolean("offline"));
        }
        binding.previous.setOnClickListener(v -> { page--; load(false); });
        binding.next.setOnClickListener(v -> { page++; load(false); });
        binding.refresh.setOnClickListener(v -> load(true));
        binding.offline.setOnCheckedChangeListener((button, checked) -> load(false));
        load(false);
    }

    /**
     * Requests this page and accepts only the latest UI generation.
     *
     * @param force refresh online even when a cached page is fresh
     */
    private void load(boolean force) {
        int expected = ++generation;
        int requestedPage = page;
        binding.previous.setEnabled(false);
        binding.next.setEnabled(false);
        binding.refresh.setEnabled(false);
        binding.status.setText("Page " + page + ": reading local cache…");
        repository.load(page, binding.offline.isChecked(), force, result -> runOnUiThread(() -> {
            if (expected != generation || isDestroyed()) return;
            binding.status.setText("Page " + requestedPage + " · " + result.message);
            StringBuilder text = new StringBuilder();
            for (CachedTodo item : result.items) {
                text.append(item.id).append(" · ").append(item.completed ? "✓ " : "○ ")
                        .append(item.title).append('\n');
            }
            binding.items.setText(text.length() == 0 ? "No items in this local page." : text.toString());
            if (result.done) {
                binding.previous.setEnabled(page > 1);
                binding.next.setEnabled(result.canNext);
                binding.refresh.setEnabled(true);
            }
        }));
    }

    /**
     * Saves navigation choices, while Room owns the cached data.
     *
     * @param outState small Activity recreation snapshot
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        outState.putInt("page", page);
        outState.putBoolean("offline", binding.offline.isChecked());
        super.onSaveInstanceState(outState);
    }

    /**
     * Invalidates UI callbacks before releasing repository resources.
     */
    @Override
    protected void onDestroy() {
        generation++;
        repository.close();
        super.onDestroy();
    }
}
```

