צרו **StationRecord.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/** Parses only a short classroom station ID, never an arbitrary URI or command. */
public final class StationRecord {
    /**
     * Prevents instances of this stateless parser utility.
     */
    private StationRecord() { }

    /**
     * Accepts exactly one UTF-8 Text record with the classroom station format.
     * An accepted ID is data, not proof of identity or permission.
     *
     * @param message possibly null message to validate
     * @return station ID, or null for an unsupported or malformed record
     */
    public static String read(NdefMessage message) {
        if (message == null || message.getRecords().length != 1) return null;
        NdefRecord record = message.getRecords()[0];
        if (record.getTnf() != NdefRecord.TNF_WELL_KNOWN
                || !Arrays.equals(record.getType(), NdefRecord.RTD_TEXT)) return null;
        byte[] payload = record.getPayload();
        if (payload.length < 2 || (payload[0] & 0x80) != 0) return null; // UTF-8 text only.
        // The lower six status bits specify language bytes, not station characters.
        int languageLength = payload[0] & 0x3f;
        if (payload.length <= 1 + languageLength) return null;
        String station = new String(payload, 1 + languageLength,
                payload.length - 1 - languageLength, StandardCharsets.UTF_8);
        return station.matches("LAB-[A-Z0-9-]{1,24}") ? station : null;
    }
}
```

