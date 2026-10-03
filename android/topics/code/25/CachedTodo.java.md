צרו **CachedTodo.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class CachedTodo {
    @PrimaryKey public int id;
    public int page;
    public int userId;
    public String title;
    public boolean completed;

    /**
     * Copies a validated transport model into a row owned by one fetched page.
     *
     * @param todo decoded, nonnull Todo with a valid ID and title
     * @param page one-based page number
     * @return new database row independent of the HTTP object
     */
    public static CachedTodo from(Todo todo, int page) {
        CachedTodo cached = new CachedTodo();
        cached.id = todo.id;
        cached.page = page;
        cached.userId = todo.userId;
        cached.title = todo.title;
        cached.completed = todo.completed;
        return cached;
    }
}
```

