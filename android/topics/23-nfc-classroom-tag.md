---
layout: page
title: "Android topics — 23: תג NFC של תחנת כיתה"
subtitle: "NDEF, יכולת מכשיר, Reader Mode וכשל תקשורת"
permalink: /android/topics/23-nfc-classroom-tag/
lang: he
full-width: true
tags: [Android, Java, NFC, NDEF]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }})

{: .box-success}
בסוף המעבדה תלמיד נוגע עם טלפון בתג NDEF שנושא מזהה תחנה כמו `LAB-ROOM-3`. האפליקציה מציגה רק מזהה תקין, מדווחת על תג שאינו NDEF או על קריאה שנקטעה, ומפסיקה Reader Mode כשעוזבים את המסך. כפתור **Try a sample record** מפעיל בדיוק את פענוח ה־NDEF גם באמולטור שאין בו רדיו NFC.

בסיס ההשוואה בפרויקט **topics** הוא `master`; ענף התוצאה הוא **`codex/nfc-classroom-tag`**. זהו מסלול התמחות אחד מתוך Bluetooth/NFC, עם תרחיש שימוש מפורש. כדי להוכיח את הרדיו עצמו דרושים טלפון NFC ותג NDEF פיזי; הבנייה והפענוח הסינתטי אינם ראיה לקריאת תג אמיתי.

## מודל התקשורת

| שלב | הצלחה | כשל שצריך להציג |
|---:|---:|---:|
| יכולת מכשיר | `NfcAdapter` קיים ופעיל | אין שבב / NFC כבוי |
| זיהוי תג | `ReaderCallback` מחזירה `Tag` | אין תג בשדה |
| פתיחת NDEF | `Ndef.get(tag)` אינו `null` | תג בטכנולוגיה שאינה NDEF |
| קריאה | `connect()` ו־`getNdefMessage()` | תג התרחק, I/O, מבנה פגום |
| הבנת תוכן | רשומת Text עם `LAB-...` | URI, טקסט לא צפוי או כמה רשומות |

תג NFC הוא **קלט לא מהימן**. האפליקציה לא פותחת URI ולא מריצה פעולה על סמך טקסט שרירותי. אם מזהה התחנה ישמש בעתיד לקבלת ציוד או נוכחות, שרת עדיין חייב לאמת משתמש והרשאה; קריאת תג לבדה אינה אימות זהות.

## 1. מתקינים גם על מכשיר ללא NFC

ב־**app > manifests > AndroidManifest.xml**, לפני `<application>`, הוסיפו:

```xml
<uses-permission android:name="android.permission.NFC" />
<uses-feature android:name="android.hardware.nfc" android:required="false" />
```

`NFC` היא הרשאת Manifest, לא חלון runtime כמו מיקום. `required="false"` מאפשר להתקין את המעבדה גם על אמולטור ולתרגל פענוח; בזמן ריצה חובה לבדוק אם באמת יש קורא.

ב־**app > res > layout > activity_main.xml** השאירו את `ConstraintLayout id=main` וה־window insets. החליפו `Hello World!` ב־`LinearLayout` אנכי constrained ל־`top/start/end`, עם הסבר, כפתור `id=sample` ו־`TextView id=status` עם live region. ב־**app > res > values > strings.xml** הוסיפו הודעות עבור no reader, NFC off, ready, not NDEF, read failed, unexpected content ו־station. בדיפ הענף תראו את כל ה־strings וה־XML.

## 2. Reader Mode שייך למסך הפעיל

ב־`MainActivity`, ב־`onCreate`, קבלו `NfcAdapter.getDefaultAdapter(this)`. ב־`onResume`, אם הוא חסר או כבוי הציגו מצב; אחרת הפעילו Reader Mode לארבע משפחות תג נפוצות:

```java
nfc.enableReaderMode(this, this::readTag,
        NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_NFC_B
                | NfcAdapter.FLAG_READER_NFC_F | NfcAdapter.FLAG_READER_NFC_V,
        null);
readerEnabled = true;
```

ב־`onPause`, אם `readerEnabled`, קראו `nfc.disableReaderMode(this)` ואפסו את הדגל. כך אין קריאה כשהמסך איננו פעיל. אין להשתמש ב־`FLAG_READER_SKIP_NDEF_CHECK` כאן: לפי [תיעוד NfcAdapter](https://developer.android.com/reference/android/nfc/NfcAdapter), הדגל מדלג על זיהוי NDEF ולכן `Ndef.get(tag)` עשוי לא לעבוד. Reader Mode הוא בחירה מתאימה למסך שקורא תג בזמן שהוא גלוי.

## 3. קוראים את התג בשרשור הקורא

`readTag(Tag)` מתקבלת מ־ReaderCallback. אם `Ndef.get(tag) == null`, מציגים `nfc_not_ndef`. אחרת:

```java
try {
    ndef.connect();
    NdefMessage message = ndef.getNdefMessage();
    runOnUiThread(() -> showMessage(message));
} catch (IOException | FormatException | SecurityException error) {
    runOnUiThread(() -> binding.status.setText(R.string.nfc_read_failed));
} finally {
    try { ndef.close(); } catch (IOException ignored) { }
}
```

`getNdefMessage()` מבצעת I/O רדיו **חוסם**, ולכן אינה נקראת מן ה־UI thread. [תיעוד Ndef](https://developer.android.com/reference/android/nfc/tech/Ndef) מציין שגם `null` אפשרי; תג שיוצא מן השדה יכול לגרום ל־`TagLostException` (תת־סוג של `IOException`). `close()` חייב להתבצע גם אחרי כשל. עדכון Views נעשה ב־`runOnUiThread`.

## 4. מאשרים רק פורמט של תחנת כיתה

צרו קובץ חדש `StationRecord.java` ב־**app > kotlin+java > com.example.topics**. השיטה `read(NdefMessage)` בענף התוצאה דורשת רשומה אחת בלבד, `TNF_WELL_KNOWN` וסוג `RTD_TEXT`, בודקת שה־payload הוא UTF-8, מדלגת על קוד השפה על פי בית הסטטוס, ואז מאשרת רק תבנית `LAB-[A-Z0-9-]{1,24}`. בשאר המצבים היא מחזירה `null`. כך URI על תג או טקסט כמו `OPEN-DOOR` אינו הופך לפקודה.

לפי [NdefRecord](https://developer.android.com/reference/android/nfc/NdefRecord), רשומת Text שונה מרשומת URI, ו־`createTextRecord("en", "LAB-ROOM-3")` יוצרת הודעת דוגמה. כפתור `sample` בונה `NdefMessage` עם אותה רשומה וקורא `showMessage` כמו מסלול הרדיו; הוא בודק את הפענוח וה־UI, לא את האנטנה.

## בדיקות וגבול הראיה

1. `:app:assembleDebug` ו־`:app:connectedDebugAndroidTest` עברו באמולטור. `StationRecordTest` מאשרת מזהה תקין ודוחה URI וטקסט שאינו לפי התבנית.
2. באמולטור התקבלה ההודעה **This device has no NFC reader**. כפתור הדוגמה הציג **Classroom station: LAB-ROOM-3**. זה מוכיח שמסך הכשל עובד ושה־parser מקבל דוגמה תקינה.
3. על טלפון עם NFC כתבו תג NDEF Text עם `LAB-ROOM-3`, פתחו את האפליקציה וקרבו את התג. בדקו גם NFC כבוי, תג לא־NDEF, הוצאה מהירה מן השדה ורשומה לא צפויה. **בדיקת חומרה זו עדיין לא בוצעה בענף הדוגמה.**
4. אם הפרויקט דורש שידור דו־כיווני או חיבור מתמשך לחיישן, NFC Text עשוי להיות כלי לא נכון; בדקו מסלול Bluetooth עם הרשאות, pairing, states ו־timeouts מתאימים. אל תוסיפו את שתי הטכנולוגיות רק בשביל רשימת נושאים.
