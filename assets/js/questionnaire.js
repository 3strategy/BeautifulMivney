(function () {
  const { useEffect, useMemo, useRef, useState } = React;
  const { createPortal } = ReactDOM;

  const LETTERS = ["A", "B", "C", "D"];
  const PRACTICE_MODE = "practice";
  const ASSESSMENT_MODE = "assessment";

  function toQuestionKey(id) {
    return String(id);
  }

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

  function cloneQuestions(base) {
    return (base || []).map((q) => ({
      ...q,
      choices: (q.choices || []).map((choice) => ({ ...choice })),
      tags: Array.isArray(q.tags) ? [...q.tags] : q.tags,
    }));
  }

  function shuffleChoices(q, rnd) {
    const old = q.choices;
    const idx = [0, 1, 2, 3];
    shuffleInPlace(idx, rnd);

    const correctOldIdx = old.findIndex((c) => c.key === q.correctKey);
    const correctNewPos = idx.findIndex((oldIndex) => oldIndex === correctOldIdx);

    const choices = idx.map((oldIndex, newPos) => ({
      ...old[oldIndex],
      key: LETTERS[newPos],
    }));

    return {
      ...q,
      choices,
      correctKey: LETTERS[correctNewPos],
    };
  }

  function buildQuizQuestions(base, shouldShuffle) {
    const cloned = cloneQuestions(base);
    if (!shouldShuffle) return cloned;

    const seed = Date.now() ^ Math.floor(Math.random() * 1_000_000_000);
    const rnd = makeRng(seed);
    return cloned.map((q) => shuffleChoices(q, rnd));
  }

  function getAnswerColumns(q) {
    return q?.answerColumns === 1 ? 1 : 2;
  }

  function normalizeInitialAnswer(raw, correctKey, mode) {
    const selectedKey = typeof raw?.selectedKey === "string" ? raw.selectedKey : null;
    const skipped = raw?.skipped === true;
    const answeredAt = raw?.answeredAt || null;
    const base = {
      selectedKey,
      skipped,
      answeredAt,
      revealed: false,
      isCorrect: undefined,
    };

    if (mode === ASSESSMENT_MODE) {
      return base;
    }

    const revealed = raw?.revealed === true;
    const isCorrect = typeof raw?.isCorrect === "boolean"
      ? raw.isCorrect
      : (selectedKey ? selectedKey === correctKey : undefined);

    return {
      ...base,
      revealed,
      isCorrect,
    };
  }

  function buildInitialAnswers(quizQuestions, rawAnswers, mode) {
    const initial = {};
    const source = rawAnswers || {};

    quizQuestions.forEach((q) => {
      const key = toQuestionKey(q.id);
      if (source[key] || source[q.id]) {
        initial[key] = normalizeInitialAnswer(source[key] || source[q.id], q.correctKey, mode);
      }
    });

    return initial;
  }

  function isAnswered(answer) {
    return !!answer?.selectedKey;
  }

  function isCompleted(answer) {
    return !!(answer && (answer.selectedKey || answer.skipped));
  }

  function cloneAnswers(answers) {
    const result = {};
    Object.keys(answers || {}).forEach((key) => {
      result[key] = {
        selectedKey: answers[key]?.selectedKey || null,
        skipped: answers[key]?.skipped === true,
        answeredAt: answers[key]?.answeredAt || null,
        revealed: answers[key]?.revealed === true,
        isCorrect: typeof answers[key]?.isCorrect === "boolean" ? answers[key].isCorrect : undefined,
      };
    });
    return result;
  }

  function buildSummary(quizQuestions, answers) {
    const totalQuestions = quizQuestions.length;
    const answeredCount = quizQuestions.filter((q) => isAnswered(answers[toQuestionKey(q.id)])).length;
    const completedCount = quizQuestions.filter((q) => isCompleted(answers[toQuestionKey(q.id)])).length;
    const revealedCount = quizQuestions.filter((q) => answers[toQuestionKey(q.id)]?.revealed).length;
    const correctCount = quizQuestions.filter((q) => answers[toQuestionKey(q.id)]?.selectedKey === q.correctKey).length;
    const revealedCorrectCount = quizQuestions.filter((q) => (
      answers[toQuestionKey(q.id)]?.revealed && answers[toQuestionKey(q.id)]?.selectedKey === q.correctKey
    )).length;
    const scorePercent = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      answeredCount,
      completedCount,
      revealedCount,
      correctCount,
      revealedCorrectCount,
      scorePercent,
    };
  }

  function clampQuestionIndex(index, totalQuestions) {
    if (!totalQuestions) return 0;
    if (typeof index !== "number" || Number.isNaN(index)) return 0;
    return Math.min(Math.max(index, 0), totalQuestions - 1);
  }

  function buildSnapshot(quizQuestions, answers, qIndex, status) {
    return {
      status,
      currentQuestionIndex: clampQuestionIndex(qIndex, quizQuestions.length),
      answers: cloneAnswers(answers),
      summary: buildSummary(quizQuestions, answers),
    };
  }

  function Pill({ children }) {
    return <span className="quiz-tag">{children}</span>;
  }

  function FormattedText({ text }) {
    if (typeof text !== "string") return text;
    const parts = text.split(/`([^`]+)`/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <code key={i} dir="ltr">{part}</code>;
      }
      const codeRegex = /((?:(?:new\s+)?[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*(?:<[^>]+>)?(?:\([^)]*\))?(?:\+\+|--)?|"[^"]*"|'[^']*');?)/g;
      const subParts = part.split(codeRegex);
      return subParts.map((sub, j) => {
        if (j % 2 === 1) {
          return <code key={i + "-" + j} dir="ltr">{sub}</code>;
        }
        return sub;
      });
    });
  }

  function ChoiceButton({ choice, selectedKey, disabled, onPick, showCorrect, correctKey, dir }) {
    const isSelected = selectedKey === choice.key;
    const isCorrect = showCorrect && choice.key === correctKey;
    const isWrongSelected = showCorrect && isSelected && choice.key !== correctKey;
    const choiceHtml = typeof choice?.choiceHtml === "string" ? choice.choiceHtml : null;

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
        {choiceHtml ? (
          <div
            className="quiz-answer-text"
            dangerouslySetInnerHTML={{ __html: choiceHtml }}
          />
        ) : (
          <div className="quiz-answer-text"><FormattedText text={choice.text} /></div>
        )}
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

  function Questionnaire({
    questions,
    labels,
    revealDelayMs,
    dir,
    headerMountId,
    mainMountId,
    mode,
    shuffleChoices,
    initialState,
    onStateChange,
    onSubmit,
  }) {
    const isAssessment = mode === ASSESSMENT_MODE;
    const shouldShuffle = isAssessment ? false : shuffleChoices !== false;
    const ui = {
      title: "Quiz",
      progressAnswered: "Answered",
      progressCorrect: "Correct",
      progressCompleted: "Completed",
      questionLabel: "Question",
      ofLabel: "of",
      resetLabel: "Reset",
      prevLabel: "Prev",
      nextLabel: "Next",
      submitLabel: "Submit",
      explanationTitle: "Explanation",
      emptyMessage: "No questions configured.",
      blankNextConfirmMessage: "This question is still blank. Continue anyway?",
      blankSubmitConfirmMessage: "The current question is still blank. Submit anyway?",
      completionTitle: "Submission received",
      completionMessage: "Your answers were submitted.",
      submitErrorMessage: "Unable to submit the quiz right now. Please try again.",
      ...(labels || {}),
    };
    const rootDir = dir || "rtl";
    const delayMs = typeof revealDelayMs === "number" ? revealDelayMs : 250;

    const initialBundleRef = useRef(null);
    if (!initialBundleRef.current) {
      const initialQuizQuestions = buildQuizQuestions(questions || [], shouldShuffle);
      initialBundleRef.current = {
        quizQuestions: initialQuizQuestions,
        answers: buildInitialAnswers(initialQuizQuestions, initialState?.answers, isAssessment ? ASSESSMENT_MODE : PRACTICE_MODE),
        qIndex: clampQuestionIndex(initialState?.currentQuestionIndex, initialQuizQuestions.length),
        submitted: initialState?.status === "submitted",
      };
    }

    const [quizQuestions, setQuizQuestions] = useState(initialBundleRef.current.quizQuestions);
    const [qIndex, setQIndex] = useState(initialBundleRef.current.qIndex);
    const [answers, setAnswers] = useState(initialBundleRef.current.answers);
    const [submitted, setSubmitted] = useState(initialBundleRef.current.submitted);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const q = quizQuestions[qIndex];
    const answerKey = q ? toQuestionKey(q.id) : null;
    const a = answerKey ? answers[answerKey] || normalizeInitialAnswer({}, q.correctKey, isAssessment ? ASSESSMENT_MODE : PRACTICE_MODE) : null;
    const answerGridClassNames = q
      ? ["quiz-answers-grid", `quiz-answers-grid-cols-${getAnswerColumns(q)}`]
      : ["quiz-answers-grid", "quiz-answers-grid-cols-2"];

    const progress = useMemo(() => buildSummary(quizQuestions, answers), [answers, quizQuestions]);

    useEffect(() => {
      if (typeof onStateChange !== "function" || submitted) return;
      onStateChange(buildSnapshot(quizQuestions, answers, qIndex, "in_progress"));
    }, [answers, onStateChange, qIndex, quizQuestions, submitted]);

    const reshuffle = () => {
      const refreshed = buildQuizQuestions(questions || [], shouldShuffle);
      setQuizQuestions(refreshed);
      setAnswers(buildInitialAnswers(refreshed, {}, PRACTICE_MODE));
    };

    const resetAll = () => {
      if (isAssessment) return;
      setSubmitted(false);
      setSubmitError("");
      setQIndex(0);
      reshuffle();
    };

    const markQuestionSkipped = (currentAnswers, question) => {
      if (!question) return currentAnswers;
      const key = toQuestionKey(question.id);
      const existing = currentAnswers[key];
      if (existing && (existing.selectedKey || existing.skipped)) {
        return currentAnswers;
      }

      return {
        ...currentAnswers,
        [key]: {
          selectedKey: null,
          skipped: true,
          answeredAt: new Date().toISOString(),
          revealed: false,
          isCorrect: false,
        },
      };
    };

    const maybeWarnAndMarkSkipped = (isSubmitAction) => {
      if (!isAssessment || !q) return answers;
      if (isCompleted(a)) return answers;

      const message = isSubmitAction ? ui.blankSubmitConfirmMessage : ui.blankNextConfirmMessage;
      if (typeof window !== "undefined" && typeof window.confirm === "function") {
        const shouldContinue = window.confirm(message);
        if (!shouldContinue) return null;
      }

      return markQuestionSkipped(answers, q);
    };

    const pick = (key) => {
      if (!q || submitted || isSubmitting) return;

      if (isAssessment) {
        if (isCompleted(a)) return;
        setSubmitError("");
        setAnswers((prev) => ({
          ...prev,
          [toQuestionKey(q.id)]: {
            selectedKey: key,
            skipped: false,
            answeredAt: new Date().toISOString(),
            revealed: false,
            isCorrect: key === q.correctKey,
          },
        }));
        return;
      }

      const isCorrect = key === q.correctKey;
      setAnswers((prev) => ({
        ...prev,
        [toQuestionKey(q.id)]: {
          ...(prev[toQuestionKey(q.id)] || {}),
          selectedKey: key,
          skipped: false,
          answeredAt: new Date().toISOString(),
          revealed: false,
          isCorrect: undefined,
        },
      }));
      setTimeout(() => {
        setAnswers((prev) => {
          const current = prev[toQuestionKey(q.id)];
          if (!current || current.selectedKey !== key) return prev;
          return {
            ...prev,
            [toQuestionKey(q.id)]: {
              ...current,
              revealed: true,
              isCorrect,
            },
          };
        });
      }, delayMs);
    };

    const next = () => {
      if (!q || submitted || isSubmitting || qIndex >= quizQuestions.length - 1) return;
      const nextAnswers = maybeWarnAndMarkSkipped(false);
      if (nextAnswers === null) return;
      if (nextAnswers !== answers) setAnswers(nextAnswers);
      setSubmitError("");
      setQIndex((index) => Math.min(index + 1, quizQuestions.length - 1));
    };

    const prev = () => {
      if (isAssessment || isSubmitting) return;
      if (qIndex > 0) setQIndex((index) => index - 1);
    };

    const submit = async () => {
      if (!q || submitted || isSubmitting) return;
      const nextAnswers = maybeWarnAndMarkSkipped(true);
      if (nextAnswers === null) return;

      const snapshot = buildSnapshot(quizQuestions, nextAnswers, qIndex, "submitted");
      setIsSubmitting(true);
      setSubmitError("");

      try {
        if (typeof onSubmit === "function") {
          await onSubmit(snapshot);
        }
        if (nextAnswers !== answers) setAnswers(nextAnswers);
        setSubmitted(true);
      } catch (error) {
        const fallbackMessage = ui.submitErrorMessage;
        setSubmitError(error?.message || fallbackMessage);
      } finally {
        setIsSubmitting(false);
      }
    };

    const headerStats = isAssessment
      ? `${ui.progressCompleted}: ${progress.completedCount}/${progress.totalQuestions}`
      : `${ui.progressAnswered}: ${progress.revealedCount}/${progress.totalQuestions} | ${ui.progressCorrect}: ${progress.revealedCorrectCount}`;

    const headerNode = (
      <header className="quiz-header">
        <div>
          <h1 className="quiz-header-title">{ui.title}</h1>
          <p className="quiz-header-stats">{headerStats}</p>
        </div>
        {!isAssessment && (
          <div>
            <button type="button" className="quiz-btn" onClick={resetAll}>
              {ui.resetLabel}
            </button>
          </div>
        )}
      </header>
    );

    const completionNode = (
      <main className="quiz-main">
        <div className="quiz-completion">
          <h2 className="quiz-completion-title">{ui.completionTitle}</h2>
          <p className="quiz-completion-text">
            <FormattedText text={ui.completionMessage} />
          </p>
        </div>
      </main>
    );

    const mainNode = !q ? (
      <main className="quiz-main">{ui.emptyMessage}</main>
    ) : submitted ? (
      completionNode
    ) : (
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

        {q.promptHe ? <div className="quiz-prompt"><FormattedText text={q.promptHe} /></div> : null}
        {q.promptHtml
          ? <div
              className="quiz-prompt quiz-prompt-html"
              dangerouslySetInnerHTML={{ __html: q.promptHtml }}
            />
          : null}

        {q.code ? <CodeBlock code={q.code} /> : null}

        <div className={answerGridClassNames.join(" ")}>
          {q.choices.map((c) => (
            <ChoiceButton
              key={c.key}
              choice={c}
              selectedKey={a?.selectedKey}
              disabled={submitted || isSubmitting || (isAssessment ? isCompleted(a) : a?.revealed)}
              onPick={pick}
              showCorrect={!isAssessment && a?.revealed}
              correctKey={q.correctKey}
              dir={q.choicesDir || "ltr"}
            />
          ))}
        </div>

        {submitError ? <div className="quiz-inline-note quiz-inline-note-error">{submitError}</div> : null}

        <div className="quiz-controls">
          {!isAssessment && (
            <button
              type="button"
              className="quiz-btn"
              onClick={prev}
              disabled={qIndex === 0 || isSubmitting}
            >
              {ui.prevLabel}
            </button>
          )}

          {isAssessment ? (
            qIndex === quizQuestions.length - 1 ? (
              <button
                type="button"
                className="quiz-btn"
                onClick={submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? `${ui.submitLabel}...` : ui.submitLabel}
              </button>
            ) : (
              <button
                type="button"
                className="quiz-btn"
                onClick={next}
                disabled={isSubmitting}
              >
                {ui.nextLabel}
              </button>
            )
          ) : (
            <button
              type="button"
              className="quiz-btn"
              onClick={next}
              disabled={qIndex === quizQuestions.length - 1 || isSubmitting}
            >
              {ui.nextLabel}
            </button>
          )}

          <div className="quiz-controls-spacer" />
        </div>

        {!isAssessment && a?.revealed && (
          <div className="quiz-explanation">
            <div className="quiz-explanation-title">{ui.explanationTitle}</div>
            <div className="quiz-explanation-text">
              <FormattedText text={q.explanationHe || "Explanation missing in QUESTIONS."} />
            </div>
          </div>
        )}
      </main>
    );

    const headerMount = headerMountId ? document.getElementById(headerMountId) : null;
    const mainMount = mainMountId ? document.getElementById(mainMountId) : null;
    const useSplitMounts = !!(createPortal && headerMount && mainMount);

    if (!useSplitMounts) {
      return (
        <div dir={rootDir} className="quiz-container">
          {headerNode}
          {mainNode}
        </div>
      );
    }

    return (
      <>
        {createPortal(
          <div dir={rootDir} className="quiz-container quiz-container-fragment">
            {headerNode}
          </div>,
          headerMount
        )}
        {createPortal(
          <div dir={rootDir} className="quiz-container quiz-container-fragment">
            {mainNode}
          </div>,
          mainMount
        )}
      </>
    );
  }

  window.renderQuestionnaire = function ({
    mountId,
    questions,
    labels,
    revealDelayMs,
    dir,
    headerMountId,
    mainMountId,
    mode,
    shuffleChoices,
    initialState,
    onStateChange,
    onSubmit,
  }) {
    const mount = document.getElementById(mountId || "quiz-root");
    if (!mount) return;
    ReactDOM.render(
      <Questionnaire
        questions={questions || []}
        labels={labels}
        revealDelayMs={revealDelayMs}
        dir={dir}
        headerMountId={headerMountId}
        mainMountId={mainMountId}
        mode={mode || PRACTICE_MODE}
        shuffleChoices={shuffleChoices}
        initialState={initialState || {}}
        onStateChange={onStateChange}
        onSubmit={onSubmit}
      />,
      mount
    );
  };
})();
