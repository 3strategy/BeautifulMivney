צרו **PageStamp.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class PageStamp {
    @PrimaryKey public int page;
    public long fetchedAt;
    public int count;

    /**
     * Records a successful page fetch, including a valid empty page.
     *
     * @param page one-based page number
     * @param fetchedAt successful fetch time in epoch milliseconds
     * @param count number of items in that response
     */
    public PageStamp(int page, long fetchedAt, int count) {
        this.page = page;
        this.fetchedAt = fetchedAt;
        this.count = count;
    }
}
```

