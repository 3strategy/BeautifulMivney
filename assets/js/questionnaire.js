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
    return <span className="quiz-tag">{children}</span>;
  }

  function ChoiceButton({ choice, selectedKey, disabled, onPick, showCorrect, correctKey, dir }) {
    const isSelected = selectedKey === choice.key;
    const isCorrect = showCorrect && choice.key === correctKey;
    const isWrongSelected = showCorrect && isSelected && choice.key !== correctKey;

    const classNames = ["quiz-answer-btn"];
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
        <div className="quiz-answer-letter">{choice.key}</div>
        <div className="quiz-answer-text">{choice.text}</div>
      </button>
    );
  }

  function CodeBlock({ code }) {
    return (
      <div className="quiz-code-block" dir="ltr">
        <pre><code>{code}</code></pre>
      </div>
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
      return <div className="quiz-main">{ui.emptyMessage}</div>;
    }

    return (
      <div dir={rootDir} className="quiz-container">
        <header className="quiz-header">
          <div>
            <h1 className="quiz-header-title">{ui.title}</h1>
            <p className="quiz-header-stats">
              {ui.progressAnswered}: {progress.done}/{progress.total} | {ui.progressCorrect}: {progress.correct}
            </p>
          </div>
          <div>
            <button type="button" className="quiz-btn" onClick={resetAll}>
              {ui.resetLabel}
            </button>
          </div>
        </header>

        <main className="quiz-main">
          <div className="quiz-question-meta">
            {ui.questionLabel} {qIndex + 1} {ui.ofLabel} {quizQuestions.length}
          </div>
          <h2 className="quiz-question-title">{q.title}</h2>
          
          {q.tags?.length ? (
            <div className="quiz-tags">
              {q.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          ) : null}

          {q.promptHe ? <div className="quiz-prompt">{q.promptHe}</div> : null}

          {q.code ? <CodeBlock code={q.code} /> : null}

          <div className="quiz-answers-grid">
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

          <div className="quiz-controls">
            <button
              type="button"
              className="quiz-btn"
              onClick={prev}
              disabled={qIndex === 0}
            >
              {ui.prevLabel}
            </button>
            <button
              type="button"
              className="quiz-btn"
              onClick={next}
              disabled={qIndex === quizQuestions.length - 1}
            >
              {ui.nextLabel}
            </button>
            <div className="quiz-controls-spacer" />
          </div>

          {a.revealed && (
            <div className="quiz-explanation">
              <div className="quiz-explanation-title">{ui.explanationTitle}</div>
              <div className="quiz-explanation-text">
                {q.explanationHe || "Explanation missing in QUESTIONS."}
              </div>
            </div>
          )}
        </main>
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
