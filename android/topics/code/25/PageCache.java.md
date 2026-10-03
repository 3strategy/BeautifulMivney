צרו **PageCache.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {CachedTodo.class, PageStamp.class}, version = 1, exportSchema = true)
public abstract class PageCache extends RoomDatabase {
    /**
     * Returns Room's generated implementation of the page data contract.
     *
     * @return DAO whose blocking methods belong on a worker
     */
    public abstract PageDao pages();
}
```

