(function () {
  const { useState, useMemo } = React;

  const LETTERS = ["A", "B", "C", "D"];

  function shuffleInPlace(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function makeRng(seed) {
    let t = seed >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleChoices(q, rnd) {
    const old = q.choices;
    const idx = [0, 1, 2, 3];
    shuffleInPlace(idx, rnd);

    const correctOldIdx = old.findIndex((c) => c.key === q.correctKey);
    const correctNewPos = idx.findIndex((oldIndex) => oldIndex === correctOldIdx);

    const choices = idx.map((oldIndex, newPos) => ({
      key: LETTERS[newPos],
      text: old[oldIndex].text,
    }));

    return {
      ...q,
      choices,
      correctKey: LETTERS[correctNewPos],
    };
  }

  function buildShuffledQuizQuestions(base) {
    const seed = Date.now() ^ Math.floor(Math.random() * 1_000_000_000);
    const rnd = makeRng(seed);
    return base.map((q) => shuffleChoices(q, rnd));
  }

  function Pill({ children }) {
    return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">{children}</span>;
  }

  function ChoiceButton({ choice, selectedKey, disabled, onPick, showCorrect, correctKey, dir }) {
    const isSelected = selectedKey === choice.key;
    const isCorrect = showCorrect && choice.key === correctKey;
    const isWrongSelected = showCorrect && isSelected && choice.key !== correctKey;

    const classNames = ["answer-btn"];
    if (isSelected) classNames.push("is-selected");
    if (isCorrect) classNames.push("is-correct");
    if (isWrongSelected) classNames.push("is-wrong");

    return (
      <button
        dir={dir}
        className={classNames.join(" ")}
        disabled={disabled}
        onClick={() => onPick(choice.key)}
        type="button"
      >
        <div className="answer-letter">{choice.key}</div>
        <div className="answer-text">{choice.text}</div>
      </button>
    );
  }

  function CodeBlock({ code }) {
    return (
      <pre dir="ltr" className="rounded-2xl border p-4 overflow-auto text-sm leading-6 text-left">
        <code>{code}</code>
      </pre>
    );
  }

  function Questionnaire({ questions, labels, revealDelayMs, dir }) {
    const ui = {
      title: "Quiz",
      progressAnswered: "Answered",
      progressCorrect: "Correct",
      questionLabel: "Question",
      ofLabel: "of",
      resetLabel: "Reset",
      prevLabel: "Prev",
      nextLabel: "Next",
      explanationTitle: "Explanation",
      emptyMessage: "No questions configured.",
      ...(labels || {}),
    };
    const rootDir = dir || "rtl";
    const delayMs = typeof revealDelayMs === "number" ? revealDelayMs : 250;

    const [quizQuestions, setQuizQuestions] = useState(() => buildShuffledQuizQuestions(questions || []));
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const q = quizQuestions[qIndex];
    const a = q ? answers[q.id] || { selectedKey: null, revealed: false, isCorrect: undefined } : null;

    const progress = useMemo(() => {
      const total = quizQuestions.length;
      const done = quizQuestions.filter((qq) => answers[qq.id]?.revealed).length;
      const correct = quizQuestions.filter((qq) => answers[qq.id]?.revealed && answers[qq.id]?.isCorrect).length;
      return { total, done, correct };
    }, [answers, quizQuestions]);

    const pick = (key) => {
      if (!q) return;
      const isCorrect = key === q.correctKey;
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { ...(prev[q.id] || {}), selectedKey: key, revealed: false, isCorrect: undefined },
      }));
      setTimeout(() => {
        setAnswers((prev) => {
          const current = prev[q.id];
          if (!current || current.selectedKey !== key) return prev;
          return {
            ...prev,
            [q.id]: { ...current, revealed: true, isCorrect },
          };
        });
      }, delayMs);
    };

    const next = () => {
      if (qIndex < quizQuestions.length - 1) setQIndex((i) => i + 1);
    };

    const prev = () => {
      if (qIndex > 0) setQIndex((i) => i - 1);
    };

    const reshuffle = () => {
      setQuizQuestions(buildShuffledQuizQuestions(questions || []));
    };

    const resetAll = () => {
      setAnswers({});
      setQIndex(0);
      reshuffle();
    };

    if (!q) {
      return <div className="rounded-2xl border p-4 md:p-6 shadow-sm">{ui.emptyMessage}</div>;
    }

    return (
      <div dir={rootDir} className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <header className="rounded-2xl border p-4 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{ui.title}</h1>
                <p className="mt-1 text-sm opacity-80">
                  {ui.progressAnswered}: {progress.done}/{progress.total} | {ui.progressCorrect}: {progress.correct}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="rounded-2xl border px-4 py-2 shadow-sm" onClick={resetAll}>
                  {ui.resetLabel}
                </button>
              </div>
            </div>
          </header>

          <main className="rounded-2xl border p-4 md:p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm opacity-80">
                  {ui.questionLabel} {qIndex + 1} {ui.ofLabel} {quizQuestions.length}
                </div>
                <h2 className="text-xl md:text-2xl font-semibold mt-1">{q.title}</h2>
                {q.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {q.promptHe ? <div className="whitespace-pre-wrap leading-7">{q.promptHe}</div> : null}

            {q.code ? <CodeBlock code={q.code} /> : null}

            <div className="answers-grid">
              {q.choices.map((c) => (
                <ChoiceButton
                  key={c.key}
                  choice={c}
                  selectedKey={a.selectedKey}
                  disabled={a.revealed}
                  onPick={pick}
                  showCorrect={a.revealed}
                  correctKey={q.correctKey}
                  dir={q.choicesDir || "ltr"}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                className="rounded-2xl border px-4 py-2 shadow-sm disabled:opacity-60"
                onClick={prev}
                disabled={qIndex === 0}
              >
                {ui.prevLabel}
              </button>
              <button
                type="button"
                className="rounded-2xl border px-4 py-2 shadow-sm disabled:opacity-60"
                onClick={next}
                disabled={qIndex === quizQuestions.length - 1}
              >
                {ui.nextLabel}
              </button>
              <div className="flex-1" />
            </div>

            {a.revealed && (
              <div className="rounded-2xl border p-4 mt-2">
                <div className="font-semibold">{ui.explanationTitle}</div>
                <div className="mt-2 whitespace-pre-wrap leading-7">
                  {q.explanationHe || "Explanation missing in QUESTIONS."}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  window.renderQuestionnaire = function ({ mountId, questions, labels, revealDelayMs, dir }) {
    const mount = document.getElementById(mountId || "quiz-root");
    if (!mount) return;
    ReactDOM.render(
      <Questionnaire questions={questions || []} labels={labels} revealDelayMs={revealDelayMs} dir={dir} />,
      mount
    );
  };
})();
