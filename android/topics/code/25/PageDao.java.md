צרו **PageDao.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import java.util.List;

@Dao
public interface PageDao {
    /**
     * Reads a deterministic snapshot of one page; call off main.
     *
     * @param page one-based page number
     * @return stored rows ordered by Todo ID
     */
    @Query("SELECT * FROM CachedTodo WHERE page = :page ORDER BY id")
    List<CachedTodo> items(int page);

    /**
     * Reads the freshness marker, including for a cached empty page.
     *
     * @param page one-based page number
     * @return marker, or null if this page has never been stored
     */
    @Query("SELECT * FROM PageStamp WHERE page = :page")
    PageStamp stamp(int page);

    /**
     * Deletes only this page within the replacement transaction.
     *
     * @param page page whose rows are being replaced
     */
    @Query("DELETE FROM CachedTodo WHERE page = :page")
    void clearPage(int page);

    /**
     * Writes replacement rows inside the same page transaction.
     *
     * @param items validated rows for the fetched page
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void putItems(List<CachedTodo> items);

    /**
     * Writes the page marker in the same transaction as the rows.
     *
     * @param stamp successful fetch marker
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void putStamp(PageStamp stamp);
}
```

