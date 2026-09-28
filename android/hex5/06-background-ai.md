---
layout: page
title: "Hex — 06: מחשב שעובד ברקע"
subtitle: "בחירת מהלך עם מודל ערך"
permalink: /android/hex5/06-background-ai/
tags: [Android, Java, Hex, ViewBinding]
lang: he
full-width: true
---

[מפת המסלול]({{ '/android/hex5/' | relative_url }}) · [הפרק הקודם]({{ '/android/hex5/05-model-preparation/' | relative_url }}){: data-sequence-nav="prev"} · [הפרק הבא]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }}){: data-sequence-nav="next"}

{: .box-success}
**בסוף הפרק:** האדם משחק אדום מול מחשב שמשחק כחול. `HexAi` מעריכה כל מהלך חוקי בעותק נפרד. `ExecutorService` מריצה את המחשבה ברקע.

## כך בוחרים מהלך

לכל תא פנוי יוצרים מצב יורש: עותק של הלוח אחרי מהלך כחול. המודל מחזיר ערך עבור השחקן שבתור במצב היורש, כלומר אדום. הופכים את סימן הערך כדי לדרג את המהלך מנקודת המבט של כחול. חיבור מנצח נבחר מיד.

צרו את `HexAi.java`:

~~~java
package com.example.hex;

/** Chooses a move by evaluating every legal one-move successor. */
public final class HexAi {
    private final ValueModel model;

    /** Creates a chooser that evaluates each candidate position with the supplied model. */
    public HexAi(ValueModel model) {
        this.model = model;
    }

    /** Compare copied positions so the visible game remains unchanged. */
    public HexGame.Move chooseMove(HexGame position) {
        HexGame.Move bestMove = null;
        float bestValue = Float.NEGATIVE_INFINITY;

        for (HexGame.Move move : position.legalMoves()) {
            // Play this candidate on its own copy of the current position.
            HexGame successor = position.copy();
            successor.play(move.row, move.column);

            // A move that connects the sides wins immediately.
            if (successor.isOver()) return move;

            // The model sees the next player, so reverse its score for this player.
            float value = -model.evaluate(successor.encodeForCurrentPlayer());
            if (value > bestValue) {
                bestMove = move;
                bestValue = value;
            }
        }
        return bestMove;
    }
}
~~~

## מוסיפים בחירת מצב משחק

ב־`activity_main.xml` הוסיפו בחירה בין אדם למחשב לבין שני שחקנים:

~~~xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/mode_label" />

<RadioGroup
    android:id="@+id/modeGroup"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <com.google.android.material.radiobutton.MaterialRadioButton
        android:id="@+id/modeAi"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:checked="true"
        android:text="@string/human_vs_ai" />

    <com.google.android.material.radiobutton.MaterialRadioButton
        android:id="@+id/modeHuman"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="@string/human_vs_human" />
</RadioGroup>
~~~

הוסיפו ל־`strings.xml`:

~~~xml
<string name="mode_label">GAME MODE</string>
<string name="human_vs_ai">Human vs Computer</string>
<string name="human_vs_human">Two players</string>
<string name="ai_unavailable">Computer model unavailable</string>
<string name="status_model_loading">Loading computer player…</string>
<string name="status_ai_thinking">Blue computer is thinking…</string>
<string name="status_your_turn">Your turn — Red</string>
<string name="model_unavailable_help">Choose Two players to keep playing</string>
<string name="model_loading">Loading model…</string>
<string name="model_ready">Value model v1 · fully offline</string>
~~~

## טוענים את המודל

ב־`MainActivity.java` הוסיפו את השדות האלה ואת ה־imports ל־`ExecutorService` ול־`Executors`:

~~~java
private TfliteValueModel valueModel;
private ExecutorService aiExecutor;
private boolean vsAi = true;
private boolean modelLoading;
private boolean aiThinking;
// A result belongs only to the board position that requested it.
private volatile int positionRevision;
~~~

בתוך `onCreate`, אתחלו את ה־worker, חברו את המצב, וטעינו את המודל:

~~~java
aiExecutor = Executors.newSingleThreadExecutor();
game = new HexGame();
binding.modeAi.setChecked(vsAi);
binding.modeHuman.setChecked(!vsAi);
binding.boardView.setGame(game);
binding.boardView.setOnCellClickListener(this::onCellClicked);
binding.restartButton.setOnClickListener(view -> restartGame());
binding.modeGroup.setOnCheckedChangeListener((group, checkedId) -> {
    boolean requestedAi = checkedId == R.id.modeAi;
    if (requestedAi != vsAi) {
        vsAi = requestedAi;
        restartGame();
    }
});
loadModel();
render();
~~~

הוסיפו טעינת מודל ברקע. קובץ המודל הנטען בפרק זה מקודד ללוח 7×7:

~~~java
/** Loads the single 7x7 model while the screen remains responsive. */
private void loadModel() {
    modelLoading = true;
    aiExecutor.execute(() -> {
        TfliteValueModel loaded = null;
        try {
            loaded = new TfliteValueModel(getApplicationContext());
        } catch (Exception ignored) {
            // render() displays that the computer is unavailable.
        }
        TfliteValueModel result = loaded;
        runOnUiThread(() -> {
            valueModel = result;
            modelLoading = false;
            render();
        });
    });
}
~~~

## מחשבים ומחזירים מהלך

אחרי שהאדם שיחק ורענן את המסך, בקשו תשובת מחשב אם המשחק פתוח:

~~~java
if (vsAi && !game.isOver()) requestComputerMove();
~~~

הוסיפו את החישוב. עותק המשחק ומספר הגרסה נשמרים לפני תחילת העבודה:

~~~java
/** Evaluates a copied position on the background worker. */
private void requestComputerMove() {
    aiThinking = true;
    render();
    int revision = positionRevision;
    HexGame position = game.copy();
    TfliteValueModel model = valueModel;

    aiExecutor.execute(() -> {
        try {
            HexGame.Move move = new HexAi(model).chooseMove(position);
            runOnUiThread(() -> finishComputerMove(revision, model, move, false));
        } catch (RuntimeException exception) {
            runOnUiThread(() -> finishComputerMove(revision, model, null, true));
        }
    });
}
~~~

הוסיפו את המתודה שמקבלת את התוצאה ב־UI thread. תוצאה ישנה אינה משנה את הלוח:

~~~java
/** Applies a result only while it still belongs to the displayed board. */
private void finishComputerMove(int revision, TfliteValueModel model,
                                HexGame.Move move, boolean failed) {
    if (revision != positionRevision) return;
    aiThinking = false;
    if (failed) {
        valueModel = null;
        // Queue cleanup after inference has finished on the same worker.
        aiExecutor.execute(model::close);
    } else {
        game.play(move.row, move.column);
        positionChanged();
    }
    render();
}

/** A changed board makes earlier background results obsolete. */
private void positionChanged() {
    positionRevision++;
    aiThinking = false;
}
~~~

בתחילת `restartGame`, קראו ל־`positionChanged` אחרי יצירת משחק חדש. בתוך `render`, אפשרו נגיעה רק לאדם והציגו את מצבי המחשב:

~~~java
boolean canTap = !aiThinking && !game.isOver()
        && (!vsAi || (!modelLoading && valueModel != null
        && game.getCurrentPlayer() == HexGame.RED));
binding.boardView.setEnabled(canTap);
~~~

השאירו קודם את תנאי הניצחון והוסיפו אחריהם:

~~~java
} else if (vsAi && modelLoading) {
    binding.statusText.setText(R.string.status_model_loading);
} else if (vsAi && valueModel == null) {
    binding.statusText.setText(R.string.ai_unavailable);
} else if (aiThinking) {
    binding.statusText.setText(R.string.status_ai_thinking);
} else if (vsAi) {
    binding.statusText.setText(R.string.status_your_turn);
~~~

הציגו ב־`modelText` את `model_local` למשחק מקומי, את `model_loading` בזמן הטעינה, את הודעת העזרה במקרה של תקלה ואת `model_ready` לאחר טעינה.

ב־`onDestroy`, בטלו תוצאות קודמות וסגרו את המודל אחרי עבודת ה־worker:

~~~java
positionChanged();
TfliteValueModel model = valueModel;
if (model != null) aiExecutor.execute(model::close);
aiExecutor.shutdown();
super.onDestroy();
~~~

## מריצים ומשחקים

בצעו Gradle Sync ובנו. בחרו **Human vs Computer**, שחקו באדום והמתינו לתשובת המחשב בכחול. עברו ל־**Two players** ובדקו ששני השחקנים מחליפים תורות. Restart מתחיל משחק חדש.

[לשיעור הבא: בחירת מודל לפי גודל הלוח ←]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }})
