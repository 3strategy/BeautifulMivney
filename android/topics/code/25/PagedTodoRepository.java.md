צרו **PagedTodoRepository.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.content.Context;
import androidx.room.Room;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/** A small page-by-page cache lab. Room is the only source rendered by the UI. */
public final class PagedTodoRepository {
    public static final int PAGE_SIZE = 5;
    private static final long FRESH_MS = 60_000;
    private final ExecutorService worker = Executors.newSingleThreadExecutor();
    private final PageCache database;
    private final PagedTodoApi api;
    private volatile Call<List<Todo>> activeCall;
    private final AtomicInteger generation = new AtomicInteger();

    public static final class Result {
        public final List<CachedTodo> items;
        public final String message;
        public final boolean done;
        public final boolean canNext;

        /**
         * Packages a database snapshot and request status for the UI.
         *
         * @param items database rows, treated as read-only by the receiver
         * @param message source or failure explanation
         * @param done whether this load has finished
         * @param canNext whether this page was full; does not prove another page exists
         */
        Result(List<CachedTodo> items, String message, boolean done, boolean canNext) {
            this.items = items;
            this.message = message;
            this.done = done;
            this.canNext = canNext;
        }
    }

    /**
     * Creates a database cache and HTTP client using the application Context.
     * The overload accepts a test server URL without changing production configuration.
     *
     * @param context Context used to obtain the application Context
     */
    public PagedTodoRepository(Context context) {
        this(context, "https://jsonplaceholder.typicode.com/");
    }

    /**
     * Creates a database cache and HTTP client using the application Context.
     * The overload accepts a test server URL without changing production configuration.
     *
     * @param context Context used to obtain the application Context
     * @param baseUrl HTTP base URL ending in a slash, supplied by a local test
     */
    PagedTodoRepository(Context context, String baseUrl) {
        database = Room.databaseBuilder(context.getApplicationContext(), PageCache.class, "todo-pages.db").build();
        api = new Retrofit.Builder().baseUrl(baseUrl)
                .client(new OkHttpClient.Builder().build())
                .addConverterFactory(GsonConverterFactory.create()).build()
                .create(PagedTodoApi.class);
    }

    /**
     * Reads Room first and refreshes only when policy requires it.
     * Callbacks run on the worker; UI consumers must post to main and check relevance.
     *
     * @param page positive one-based page number
     * @param offline skip HTTP even when force is true
     * @param force bypass freshness when online
     * @param listener receiver of local and final database snapshots
     */
    public void load(int page, boolean offline, boolean force, Consumer<Result> listener) {
        cancel();
        int expected = generation.incrementAndGet();
        worker.execute(() -> {
            if (expected != generation.get()) return;
            PageDao dao = database.pages();
            PageStamp stamp = dao.stamp(page);
            List<CachedTodo> cached = dao.items(page);
            boolean fresh = stamp != null && System.currentTimeMillis() - stamp.fetchedAt < FRESH_MS;
            // Offline wins over forced refresh: it is a deliberate no-network mode.
            boolean complete = offline || (fresh && !force);
            String source = stamp == null ? "No cached page" : fresh ? "Fresh local page" : "Stale local page";
            listener.accept(new Result(cached, offline ? "Offline: " + source : source,
                    complete, stamp != null && stamp.count == PAGE_SIZE));
            if (complete || expected != generation.get()) return;
            Call<List<Todo>> call = api.page(page, PAGE_SIZE);
            activeCall = call;
            try {
                Response<List<Todo>> response = call.execute();
                if (expected != generation.get()) return;
                if (!response.isSuccessful() || response.body() == null) {
                    listener.accept(new Result(cached, "HTTP " + response.code() + "; showing local page",
                            true, stamp != null && stamp.count == PAGE_SIZE));
                    return;
                }
                List<CachedTodo> incoming = new ArrayList<>();
                for (Todo todo : response.body()) {
                    if (todo == null || todo.id <= 0 || todo.title == null) throw new IllegalArgumentException("Bad todo JSON");
                    incoming.add(CachedTodo.from(todo, page));
                }
                database.runInTransaction(() -> {
                    // Rows and their successful-fetch marker change together.
                    dao.clearPage(page);
                    dao.putItems(incoming);
                    dao.putStamp(new PageStamp(page, System.currentTimeMillis(), incoming.size()));
                });
                List<CachedTodo> stored = dao.items(page);
                listener.accept(new Result(stored, "Network page saved to Room", true,
                        stored.size() == PAGE_SIZE));
            } catch (IOException | IllegalArgumentException error) {
                if (!call.isCanceled()) listener.accept(new Result(cached,
                        error.getClass().getSimpleName() + "; showing local page",
                        true, stamp != null && stamp.count == PAGE_SIZE));
            } finally {
                if (activeCall == call) activeCall = null;
            }
        });
    }

    /**
     * Invalidates queued work and asks an active HTTP request to stop.
     */
    public void cancel() {
        generation.incrementAndGet(); // Queued work may not yet own an HTTP Call.
        Call<List<Todo>> call = activeCall;
        if (call != null) call.cancel();
    }

    /**
     * Invalidates pending work and queues database close after work already submitted.
     * This repository must not be used after close.
     */
    public void close() {
        cancel();
        worker.execute(database::close);
        worker.shutdown();
    }
}
```

