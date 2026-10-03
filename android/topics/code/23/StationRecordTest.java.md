צרו **StationRecordTest.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(AndroidJUnit4.class)
public class StationRecordTest {
    /**
     * Checks that an NDEF Text record reaches the station parser successfully.
     */
    @Test
    public void acceptsStationText() {
        assertEquals("LAB-ROOM-3", StationRecord.read(new NdefMessage(new NdefRecord[]{
                NdefRecord.createTextRecord("en", "LAB-ROOM-3")})));
    }

    /**
     * Checks rejection of different record types and text outside the station format.
     */
    @Test
    public void refusesArbitraryUriAndText() {
        assertNull(StationRecord.read(new NdefMessage(new NdefRecord[]{
                NdefRecord.createUri("https://example.com")})));
        assertNull(StationRecord.read(new NdefMessage(new NdefRecord[]{
                NdefRecord.createTextRecord("en", "OPEN-DOOR")})));
    }
}
```

