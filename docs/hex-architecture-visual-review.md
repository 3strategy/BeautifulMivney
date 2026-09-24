# Hex: architecture visuals for review

Approved on 24 September 2026: **A, B, C, D, F, G, H as Mermaid; E as a textual/table example.** These are now implemented in the current eight-chapter sequence, with Hebrew explanations and understanding questions. The optional I and J sections remain outside the lessons. Chapters 01 and 04 link back to the relevant maps.

The textual proposals below retain the source rationale for the additions. They recover the explanations in the Android project's planning documents. Except for the explicitly quoted pipeline in F, the diagrams are adaptations of the source prose, not quotations or previously existing diagrams.

The review is in English; approved student-facing explanations and diagram labels should follow the lessons' Hebrew, retaining Java identifiers. Each visual should have a short explanation of **why this separation or flow exists**, followed by a question students can answer before typing code.

## Choices at a glance

| ID | What the student should understand | Proposed placement | Recommendation |
|:---|:---|:---|:---|
| A | Where the whole project is going; training versus playing | Index, between the introduction and chapter table | Mermaid |
| B | Who owns each responsibility inside the app | Index, after the chapter table and before “מי עושה מה?” | Mermaid |
| C | How a tap becomes a legal move and a redraw | Chapter 02, after “הרעיון”, before file edits | Mermaid |
| D | Why a winning connection is a graph problem | Chapter 03, after “הרעיון”, before file edits | Mermaid |
| E | What the model receives and what its answer means | Chapter 05, before the teacher-bundle download | Keep as a compact textual/table example |
| F | How a value model becomes a move chooser | Chapter 06, before `HexAi.java` | Mermaid plus a tiny numerical example |
| G | How background work returns safely to the current game | Chapter 06, immediately before the `MainActivity.java` edits | Mermaid sequence diagram |
| H | What changes when we select a different computer player | Chapter 07, before the player-bundle download | Mermaid |
| I | Where the supplied models learned their estimates | Chapter 07, a short background explanation after its opening idea | Optional Mermaid |
| J | Why Java rules and training rules must agree | Chapter 05, beside the first `TWIN-ID` explanation | Keep as a short note; optional diagram |

The table records the original recommendations; the approved selection is recorded at the top of this document.

## A — The destination and the two environments

**Source:** [ARCHITECTURE.md, opening](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:3), [TUTORIAL_PROGRESSION.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/TUTORIAL_PROGRESSION.md:1), [PLAYER_TO_ANDROID.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/PLAYER_TO_ANDROID.md:20).

```text
PREPARED OUTSIDE THE PHONE                 THE APP WE BUILD
Python/JAX self-play training
  -> saved network weights
  -> export to TFLite + matching metadata
  -> supplied model files ----------------> packaged Android assets
                                             |
                                             v
Human -> Android game -> evaluate candidate positions locally -> computer move

Our route:
01 draw -> 02 play turns -> 03 detect wins -> 04 complete local game
        -> 05 prepare model inputs -> 06 computer reply
        -> 07 select supplied players -> 08 day/night appearance
```

**Explanation to restore:** We are building a playable game first, then giving that game an offline opponent. Training produces files beforehand; a move during play does not contact Colab or train a network. Chapters 05–07 extend the same rules and screen built in 01–04.

**Question:** What must already work before a trained model can be useful?

**Rendering proposal:** Separate the two environments visually. Keep the chapter route as a compact second strip or text line so the diagram does not become one large dependency map.

## B — Responsibilities inside the finished app

**Source:** [ARCHITECTURE.md, responsibility table](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:18). Class names and connections are aligned with the current lesson listings.

```text
XML controls <--- View Binding ---> MainActivity
                                      |
         +----------------------------+---------------------------+
         |                            |                           |
         v                            v                           v
HexBoardView                      HexGame                       HexAi
draw cells; translate taps        state and rules               choose a move
into row/column                   legal moves; winner           using game copies
         |                            ^                           |
         +-- reports taps ----------> MainActivity                v
         +-- reads board state ----> HexGame                  ValueModel
                                                             (interface)
                                                                 ^
                                                       implemented by
                                                                 |
                                                         TfliteValueModel
                                                                 |
                                                         supplied .tflite
```

**Explanation to restore:** A view understands pixels; the rules understand cells and connections. `MainActivity` coordinates the screen and work. `HexAi` chooses among legal moves; `ValueModel` estimates positions. This separation lets local play and computer play share the same rules.

**Question:** Which part must reject an occupied cell, even if the move did not come from a screen tap?

**Rendering proposal:** Label arrows by meaning: reports, reads, requests, implements. The textual layout repeats `MainActivity` and `HexGame` to stay readable; Mermaid should use one node for each. Label this as the destination architecture: chapter 01 does not yet contain all these parts. The existing “מי עושה מה?” table answers a different question—student versus teacher work—and should remain.

## C — One human move, end to end

**Source:** [ARCHITECTURE.md, responsibilities](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:18); [chapter 02](../android/hex/02-moves-and-turns.md), especially `onCellClicked` and `render`.

```text
Tap (screen x,y)
  -> HexBoardView: find a cell using the board geometry
       outside any cell -> no move callback
       inside a cell    -> callback(row, column)
  -> MainActivity.onCellClicked
  -> HexGame.play(row, column)
       illegal -> false; board and turn unchanged
       legal   -> place stone; change turn; true
  -> MainActivity.render
  -> update status + give board view the state + request redraw
```

**Explanation to restore:** A tap is a request, not a rule decision. Drawing and hit testing share the same geometry, while legality belongs to `HexGame`. This is the concrete flow behind the abstract separation in B.

**Question:** Why must tapping an occupied cell leave the turn unchanged?

**Boundary:** At chapter 02, do not include win detection or AI in this flow; those enter later. At the end of chapter 04, refer back to it and explain that Restart creates a new `HexGame` and uses the same `render` path.

## D — The board as a graph

**Source:** [ARCHITECTURE.md, game and connectivity](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:9); [chapter 03](../android/hex/03-win-detection.md).

```text
Screen representation: hexagons at pixel positions
Rules representation:  cells linked to up to six neighboring cells

Red:  red stones on row 0    -> connected red neighbors  -> reach row 6?
Blue: blue stones on column 0 -> connected blue neighbors -> reach column 6?

Search:
seed queue with own stones on starting edge
  -> take a cell
  -> reached destination edge? yes -> connection found
  -> otherwise add unvisited neighbors of the same color
  -> repeat until connection found or queue empty
```

**Explanation to restore:** A winning path may bend. We search connectivity, not a straight row, a count of stones, or pixels. `visited` prevents revisiting cells around a loop.

**Question:** Would changing the size of the drawn hexagons change who has won?

**Rendering proposal:** Prefer a small cell-connection graph with one highlighted bent path. Keep the queue explanation beside it rather than turning every line of BFS into another flowchart. Mark any small graph as an illustration, not the full 7×7 board.

## E — A position enters; one value leaves

**Source:** [MODEL_CONTRACT.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/MODEL_CONTRACT.md:9).

```text
HexGame board + player to move
  -> 7 x 7 x 3 encoding
       channel 0: this player's stones
       channel 1: opponent's stones
       channel 2: orientation, everywhere 1 for Red / 0 for Blue
  -> ValueModel
  -> one number in [-1, +1], from that player's perspective

Example: Blue to move
  blue cell  -> [1, 0, 0]
  red cell   -> [0, 1, 0]
  empty cell -> [0, 0, 0]

Same stones, but Red to move:
  blue cell  -> [0, 1, 1]
  red cell   -> [1, 0, 1]
  empty cell -> [0, 0, 1]
```

**Explanation to restore:** “Mine” means the player whose turn it is in the encoded position. Colors do not have permanently assigned stone channels. The network supplies a position estimate, not a row/column or 49 move scores. The orientation plane distinguishes the two connection goals. These two encodings illustrate the contract; they are not consecutive moves.

**Question:** After Blue plays a candidate move, whose stones belong in channel 0 of its successor?

**Recommendation:** Keep the small example/table even if the input/output pipeline becomes Mermaid. It explains the representation more precisely than three boxes labelled “channels.”

## F — From position values to a move

**Source:** [CODEX_IMPLEMENTATION_BRIEF.md, original textual pipeline](C:/Users/3stra/AndroidStudioProjects/hex/docs/CODEX_IMPLEMENTATION_BRIEF.md:52), [ARCHITECTURE.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:29), [MODEL_CONTRACT.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/MODEL_CONTRACT.md:22).

Original pipeline:

```text
current state
→ enumerate legal moves
→ create each one-move successor
→ evaluate successors with the value model
→ choose the best legal move
```

Proposed expansion:

```text
Current position, Blue choosing
  +-> copy + legal move A -> Red-to-move successor -> model: +0.70 -> Blue: -0.70
  +-> copy + legal move B -> Red-to-move successor -> model: -0.40 -> Blue: +0.40
  +-> copy + legal move C -> Blue has won          -> exact Blue score: +1.00
                                                                  |
                                                     choose highest score: C
```

**Explanation to restore:** These are alternative copies, not a sequence of three moves on the live board. A successor is evaluated for the opponent, so its value must be negated. The rules determine terminal outcomes exactly; a network estimate cannot overrule a win. The example numbers are illustrative, not measured model outputs.

**Question:** Without candidate C, why would Blue prefer B even though its model output is smaller?

**Accuracy note for conversion:** The current chapter batches all successor inputs, including winning ones, and then overrides a winning move's score with `+1`. The diagram must not imply that the implementation skips model evaluation for terminal successors. It can show the model batch followed by the scoring decision, or use the conceptual branches above with that detail stated. There is one-ply enumeration, not recursive tree search.

## G — A computer answer belongs to a particular game

**Source:** [ARCHITECTURE.md, background work](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:40); [chapter 06](../android/hex/06-background-ai.md), `startAiMove`, `restartGame`, and `onDestroy`.

```text
UI thread                           Worker
copy position; remember generation 7
show thinking; disable board taps --> chooseMove(copy)
                                        |
Restart:                                | still calculating
  generation becomes 8                  |
  create fresh game                     |
                                        |
receive answer for generation 7 <------- return move
  7 != 8 -> ignore it

Normal case: same generation + Activity still valid
  -> apply returned move to live game -> render
```

**Explanation to restore:** Running work in the background keeps the screen responsive. It also creates a new problem: the answer may arrive after the game has changed. Cancellation is requested, but the generation check is what prevents a late answer from altering a newer game. The worker searches a copy; the UI thread applies an accepted result.

**Question:** Why is a legal move from the previous game still an invalid answer for the new game?

**Rendering proposal:** A sequence diagram with normal completion and Restart alternatives. Introduce player-selection changes only in chapter 07, where that control exists.

## H — Same move chooser, different learned evaluator

**Source:** [COMPUTER_LEVELS.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/COMPUTER_LEVELS.md:15), [ARCHITECTURE.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:46), [MODEL_CONTRACT.md](C:/Users/3stra/AndroidStudioProjects/hex/docs/MODEL_CONTRACT.md:3).

```text
Player selection
  -> catalog entry: label + model path + metadata path
  -> matching pair: hex_value_v1.tflite + model_info.json
  -> TfliteValueModel validates and loads the pair
       success -> same HexAi algorithm, selected model's position estimates
       failure -> computer unavailable; local two-player mode remains usable

Changing selection -> new game + invalidate old loading/move results
```

**Explanation to restore:** The player options change the learned estimates, not the game rules or search depth. The metadata and model belong together. A training iteration is an identity, not a demonstrated difficulty rating. The chapter-06 zero-value mock tests integration; equal estimates lead to tie-breaking, not learned strategy.

**Question:** If the selected model fails to load, why would silently using another player make the selector misleading?

**Source drift:** The older Android documentation describes three players. The current tutorial supplies six. Use the current chapter's catalog if names are shown; do not copy the old list or claim that later iterations are stronger.

## I — Optional background: what “learned through self-play” means

**Source:** [ARCHITECTURE.md, learning from self-play](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:60).

```text
Current value network (held fixed during collection)
  -> self-play: evaluate legal one-step successors
  -> store visited states + best one-step targets in replay buffer
  -> sample state/target pairs
  -> fit network to targets using mean squared error
  -> updated network -> next collection round

During play collection: epsilon-greedy exploration varies selected moves.
Selected saved weights -> export -> supplied Android player (diagram A).
```

**Explanation to restore:** The supplied model's estimates came from repeated self-play and fitting. The training loop updates weights; Android uses exported weights to evaluate positions. A lower training loss alone does not establish that one player is stronger.

**Question:** Which process changes the model's weights, and which only uses them?

**Recommendation:** Include only if a short RL background belongs in this sequence. Keep it explanatory: no notebook setup or training assignment. The old nine-stage progression includes Colab work; the current eight-stage sequence deliberately does not.

## J — Optional bridge: the two rule implementations

**Source:** [ARCHITECTURE.md, why rules exist twice](C:/Users/3stra/AndroidStudioProjects/hex/docs/ARCHITECTURE.md:74), [CODEX_IMPLEMENTATION_BRIEF.md, twins](C:/Users/3stra/AndroidStudioProjects/hex/docs/CODEX_IMPLEMENTATION_BRIEF.md:95).

```text
                  shared golden positions and expected results
                           /                    \
                          v                      v
                Java rules in Android     JAX rules for training
                          \                      /
                           must agree on:
              legal moves, move application, winner, encoding
```

**Explanation to restore:** Java serves the app; JAX serves fast training. Their representations and rules must agree. A model can load successfully yet give inappropriate estimates if it was trained with a different encoding. `TWIN-ID` comments identify these corresponding responsibilities; they are not calls from Android into Python.

**Question:** Why does successfully loading a model not prove it understands our board representation?

**Recommendation:** A short note is probably sufficient in the core sequence. Keep the full diagram if the learning objective includes understanding the training/app boundary.

## Scope of the proposed edit

Restore explanations before the relevant code, keep the existing runnable transitions, and avoid adding one diagram mechanically to every chapter. Chapters 01 and 04 can refer back to the responsibility map; chapter 08 already explains resource selection and does not need an unrelated RL diagram. The archived `05old` page is not a placement target.

Implemented set: **A, B, C, D, F, G, H as Mermaid; E as text/table.** The topic index now links to the explanations, and the gaps document distinguishes these guided examples from independent architecture-design practice. Android source and the tutorials' code edits remain unchanged.
