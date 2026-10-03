צרו **PagedTodoRepositoryTest.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.content.Context;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class PagedTodoRepositoryTest {
    /**
     * Checks that HTTP failure preserves a previously stored page and request parameters.
     *
     * @throws Exception if test server or synchronization setup fails
     */
    @Test
    public void failedRefreshKeepsCachedPage() throws Exception {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        try (MockWebServer server = new MockWebServer()) {
            server.enqueue(new MockResponse().setBody("[{\"id\":701,\"userId\":1,\"title\":\"Cached lesson\",\"completed\":false}]"));
            server.enqueue(new MockResponse().setResponseCode(503));
            server.start();
            PagedTodoRepository repository = new PagedTodoRepository(context, server.url("/").toString());
            try {
                AtomicReference<PagedTodoRepository.Result> first = new AtomicReference<>();
                CountDownLatch loaded = new CountDownLatch(1);
                repository.load(77, false, true, result -> {
                    if (result.done) { first.set(result); loaded.countDown(); }
                });
                assertTrue(loaded.await(10, TimeUnit.SECONDS));
                assertEquals("Cached lesson", first.get().items.get(0).title);

                AtomicReference<PagedTodoRepository.Result> second = new AtomicReference<>();
                CountDownLatch failed = new CountDownLatch(1);
                repository.load(77, false, true, result -> {
                    if (result.done) { second.set(result); failed.countDown(); }
                });
                assertTrue(failed.await(10, TimeUnit.SECONDS));
                assertEquals("Cached lesson", second.get().items.get(0).title);
                assertTrue(second.get().message.contains("HTTP 503"));
                assertEquals("/todos?_page=77&_limit=5", server.takeRequest().getPath());
            } finally {
                repository.close();
            }
        }
    }
}
```

