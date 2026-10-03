צרו **PagedTodoApi.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface PagedTodoApi {
    /**
     * Describes a numbered page request; execute it on a worker.
     *
     * @param page one-based page number
     * @param limit maximum requested items
     * @return new single-use request for the decoded page
     */
    @GET("todos")
    Call<List<Todo>> page(@Query("_page") int page, @Query("_limit") int limit);
}
```

