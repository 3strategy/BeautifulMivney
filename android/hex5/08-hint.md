---
layout: page
title: "Hex — 08: רמז למהלך הבא"
subtitle: "אותו בוחר מציע מהלך בלי לשחק אותו"
permalink: /android/hex5/08-hint/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא]({{ '/android/hex5/09-day-night-themes/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
**בסוף הפרק:** בתור האדום, לחיצה על Hint מציגה את המהלך שהמודל בחר. הלוח מדגיש את התא, והמשחק נשאר ללא שינוי עד שהשחקן מניח אבן בעצמו.

## אותה בחירה, שתי תוצאות

ה־`HexAi` שכבר כתבנו בוחרת מהלך חוקי לפי מצב הלוח. כעת נשתמש באותה בחירה בשני מצבים: במהלך מחשב התוצאה נכנסת למשחק, ובהצעה היא רק נשמרת ומוצגת.

החישוב פועל ברקע על עותק של המשחק. `positionRevision` כבר משתנה כאשר הלוח משתנה; תוצאה שחוזרת עם מספר ישן אינה מוצגת. אותה בדיקה מתאימה גם לתור מחשב וגם לרמז.

<div markdown="1" class="hex-diagram">

~~~mermaid
%% dir: rtl %%
flowchart TB
    request["בקשת תור מחשב או רמז"] --> copy["עותק של המשחק"]
    copy --> ai["HexAi ב־Executor"]
    ai --> check{"positionRevision עדיין זהה?"}
    check -->|"לא"| discard["התעלמות מהתוצאה"]
    check -->|"כן: תור מחשב"| play["החלת המהלך על המשחק"]
    check -->|"כן: רמז"| show["הדגשת התא בלבד"]
~~~

</div>

## מוסיפים כפתור וצבע לרמז

ב־`app/src/main/res/values/strings.xml` הוסיפו את תוויות הכפתור וההודעה. השורה והעמודה שמוצגות מתחילות ב־1, כמו מספרים שאנשים רגילים לקרוא:

~~~xml
<string name="hint">Hint</string>
<string name="hint_thinking">Finding a move…</string>
<string name="hint_ready">Suggested move: row %1$d, column %2$d</string>
~~~

ב־`colors.xml` הוסיפו צבע למסגרת:

~~~xml
<color name="hex_hint">#D18B00</color>
~~~

ב־`activity_main.xml`, החליפו את כפתור Restart בשורת כפתורים. ה־id של Restart נשאר זהה, ולכן הקוד הקיים שלו ממשיך לפעול:

~~~xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <com.google.android.material.button.MaterialButton
        android:id="@+id/hintButton"
        style="@style/Widget.Material3.Button.TonalButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_weight="1"
        android:text="@string/hint" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/restartButton"
        style="@style/Widget.Material3.Button.TonalButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="@string/restart"
        app:icon="@android:drawable/ic_popup_sync"
        app:iconGravity="textStart" />
</LinearLayout>
~~~

## מציירים את התא המוצע

ב־`HexBoardView.java`, שמרו את המהלך ואת צבעו:

~~~diff
     private HexGame game = new HexGame();
+    /** The suggested move is displayed without changing the game position. */
+    private HexGame.Move hintMove;
     private OnCellClickListener listener;
~~~

הוסיפו את צבע המסגרת ליד שאר צבעי הלוח:

~~~diff
     private final int lineColor;
+    private final int hintColor;
~~~

טענו את צבע הרמז בבנאי והוסיפו setter שמבקש ציור מחדש:

~~~java
hintColor = ContextCompat.getColor(context, R.color.hex_hint);

/** Highlights a suggested move, or clears the highlight when passed null. */
public void setHintMove(@Nullable HexGame.Move move) {
    hintMove = move;
    invalidate();
}
~~~

מיד אחרי ציור כל משושה, ציירו מסגרת עבה סביב התא הריק שנבחר:

~~~java
if (cell == HexGame.EMPTY && hintMove != null
        && hintMove.row == row && hintMove.column == column) {
    strokePaint.setColor(hintColor);
    strokePaint.setStrokeWidth(dp(4));
    canvas.drawPath(hexPath, strokePaint);
    strokePaint.setColor(lineColor);
    strokePaint.setStrokeWidth(dp(1.5f));
}
~~~

## מחברים את הכפתור לאותו בוחר

ב־`MainActivity.java`, שמרו את מצב הרמז וחברו את הכפתור:

~~~java
private boolean hintThinking;
private HexGame.Move hintMove;
~~~

~~~java
binding.hintButton.setOnClickListener(view -> requestMove(true));
~~~

אחרי מהלך אנושי חוקי, `positionChanged` מנקה הצעה קודמת. אם הגיע תור המחשב, אותה מתודה מבקשת את המהלך הרגיל:

~~~java
if (!game.play(row, column)) return;
positionChanged();
render();
if (vsAi && !game.isOver()) requestMove(false);
~~~

העבירו את קוד חישוב המחשב אל `requestMove(boolean hint)`. הערך של `hint` קובע אם התוצאה תוחל או תוצג כהצעה:

~~~java
/** Runs the same move chooser for a computer turn or a human hint. */
private void requestMove(boolean hint) {
    hintThinking = hint;
    aiThinking = !hint;
    render();
    int revision = positionRevision;
    HexGame position = game.copy();
    TfliteValueModel model = valueModel;

    aiExecutor.execute(() -> {
        if (revision != positionRevision) return;
        try {
            HexGame.Move move = new HexAi(model).chooseMove(position);
            runOnUiThread(() -> finishMove(revision, hint, move, false));
        } catch (RuntimeException exception) {
            runOnUiThread(() -> finishMove(revision, hint, null, true));
        }
    });
}
~~~

`finishMove` מקבלת תוצאה רק אם היא שייכת ללוח הנוכחי. רמז נשמר בתור `hintMove`; מהלך מחשב מופעל באמצעות `game.play`:

~~~java
/** Applies a move or displays a suggestion only while it belongs to this board. */
private void finishMove(int revision, boolean hint, HexGame.Move move, boolean failed) {
    if (revision != positionRevision) return;
    aiThinking = false;
    hintThinking = false;
    if (failed) {
        TfliteValueModel failedModel = valueModel;
        valueModel = null;
        aiExecutor.execute(failedModel::close);
    } else if (hint) {
        hintMove = move;
    } else {
        game.play(move.row, move.column);
        positionChanged();
    }
    render();
}
~~~

עדכנו את `positionChanged` כך שכל לוח חדש יבטל רמז קודם:

~~~java
/** Advances the board version and clears work and hints tied to the previous position. */
private void positionChanged() {
    positionRevision++;
    aiThinking = false;
    hintThinking = false;
    hintMove = null;
}
~~~

ב־`render`, הוסיפו שתי קבוצות שורות. הראשונה מעבירה את ההצעה לתצוגת הלוח, לצד עדכון מצב הלוח:

~~~diff
     binding.boardView.setGame(game);
+    binding.boardView.setHintMove(hintMove);
     binding.boardView.setContentDescription(getString(R.string.board_description,
             game.getSize(), game.getSize()));
~~~

הקבוצה השנייה קובעת אם כפתור הרמז יוצג ויהיה זמין. `canTap` כבר מציין שזה תור האדם והלוח מוכן לקלט; התנאים הנוספים מונעים בקשת רמז בזמן חישוב או כשכבר מוצגת הצעה:

~~~diff
     binding.boardView.setEnabled(canTap);
+    binding.hintButton.setVisibility(vsAi ? View.VISIBLE : View.GONE);
+    binding.hintButton.setEnabled(vsAi && canTap && valueModel != null
+            && !hintThinking && hintMove == null);

     if (game.getWinner() == HexGame.RED) {
~~~

הציגו את מצב החישוב או את הקואורדינטות:

~~~diff
 } else if (aiThinking) {
     binding.statusText.setText(R.string.status_ai_thinking);
+} else if (hintThinking) {
+    binding.statusText.setText(R.string.hint_thinking);
+} else if (hintMove != null) {
+    binding.statusText.setText(getString(R.string.hint_ready,
+            hintMove.row + 1, hintMove.column + 1));
 }
~~~

## מריצים ומשחקים

בחרו 7×7 או 11×11 והמתינו לטעינת המודל. בתור האדום לחצו Hint: התא המוצע מודגש, מספר האבנים אינו משתנה והתור נשאר אדום. שחקו תא חוקי אחר או לחצו Restart; ההצעה נעלמת. אחר כך ודאו שתור המחשב הכחול עדיין פועל כרגיל בשני גדלי הלוח.

**שאלת הבנה:** מה ההבדל בין שמירת מהלך ב־`hintMove` לבין הפעלה שלו באמצעות `game.play`?

[לשיעור הבא: ערכות נושא ליום וללילה ←]({{ '/android/hex5/09-day-night-themes/' | relative_url }})
