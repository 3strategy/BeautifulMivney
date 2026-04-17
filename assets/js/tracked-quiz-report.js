(function () {
  const FIREBASE_VERSION = "11.4.0";
  const DEFAULT_ROOT_PATH = "jekyll";
  const DEFAULT_TIME_ZONE = "Asia/Jerusalem";

  const DEFAULT_LABELS = {
    loadingTitle: "טוענים דוח",
    loadingMessage: "מכינים את נתוני השאלונים...",
    signInTitle: "נדרשת התחברות",
    signInMessage: "כדי לצפות בדוח, התחברו עם חשבון Google.",
    signInButtonLabel: "התחברות עם Google",
    unauthorizedTitle: "אין הרשאה לצפייה בדוח",
    unauthorizedMessage: "החשבון הזה אינו מוגדר כחשבון ניהול של שאלונים.",
    loadErrorTitle: "לא הצלחנו לטעון את הדוח",
    loadErrorMessage: "אירעה שגיאה בזמן טעינת הנתונים.",
    signOutLabel: "התנתקות",
    accountSignedInPrefix: "מחוברים בתור",
    refreshLabel: "רענון",
    noDataMessage: "אין עדיין נתונים לשאלון הזה.",
    attemptsLabel: "ניסיונות",
    submittedLabel: "הוגשו",
    inProgressLabel: "בטיוטה",
    csvTitle: "CSV",
    downloadLabel: "הורדת CSV",
  };

  function runWhenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  }

  function normalizeConfig(rawConfig) {
    const labels = {
      ...DEFAULT_LABELS,
      ...(rawConfig?.labels || {}),
    };

    const quizzes = Array.isArray(rawConfig?.quizzes) ? rawConfig.quizzes : [];
    const adminUids = Array.from(new Set(
      quizzes.flatMap((quiz) => Array.isArray(quiz?.debugUids) ? quiz.debugUids : [])
    ));

    return {
      firebaseConfig: rawConfig?.firebaseConfig || null,
      rootPath: rawConfig?.rootPath || DEFAULT_ROOT_PATH,
      mountId: rawConfig?.mountId || "tracked-quiz-report-root",
      statusMountId: rawConfig?.statusMountId || "tracked-quiz-report-status",
      accountMountId: rawConfig?.accountMountId || "tracked-quiz-report-account",
      quizzes,
      adminUids,
      timeZone: rawConfig?.timeZone || DEFAULT_TIME_ZONE,
      labels,
    };
  }

  function clearNode(node) {
    if (!node) return;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function setHidden(node, hidden) {
    if (!node) return;
    node.classList.toggle("hidden", hidden);
  }

  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function createButton(label, onClick, extraClassName) {
    const button = createElement("button", `quiz-btn ${extraClassName || ""}`.trim(), label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  function toPath(parts) {
    return parts
      .filter(Boolean)
      .map((part) => String(part).replace(/^\/+|\/+$/g, ""))
      .join("/");
  }

  function renderCard(target, spec) {
    clearNode(target);
    const card = createElement("div", `tracked-quiz-card tracked-quiz-card-${spec.tone || "note"}`);
    const title = createElement("h2", "tracked-quiz-card-title", spec.title);
    card.appendChild(title);

    if (spec.message) {
      card.appendChild(createElement("p", "tracked-quiz-card-text", spec.message));
    }

    if (Array.isArray(spec.extraLines) && spec.extraLines.length) {
      const list = createElement("div", "tracked-quiz-card-meta");
      spec.extraLines.forEach((line) => {
        list.appendChild(createElement("div", "tracked-quiz-card-meta-line", line));
      });
      card.appendChild(list);
    }

    if (Array.isArray(spec.actions) && spec.actions.length) {
      const actions = createElement("div", "tracked-quiz-card-actions");
      spec.actions.forEach((action) => {
        actions.appendChild(createButton(action.label, action.onClick, action.className));
      });
      card.appendChild(actions);
    }

    target.appendChild(card);
  }

  function renderAccountBar(target, spec) {
    clearNode(target);
    if (!spec?.user) return;

    const bar = createElement("div", "tracked-quiz-account-bar");
    const meta = createElement("div", "tracked-quiz-account-meta");
    meta.appendChild(createElement(
      "div",
      "tracked-quiz-account-user",
      `${spec.labels.accountSignedInPrefix}: ${spec.user.displayName || spec.user.email || spec.user.uid}`
    ));

    const actions = createElement("div", "tracked-quiz-account-actions");
    if (typeof spec.onRefresh === "function") {
      actions.appendChild(createButton(spec.labels.refreshLabel, spec.onRefresh, "tracked-quiz-btn-secondary"));
    }
    if (typeof spec.onSignOut === "function") {
      actions.appendChild(createButton(spec.labels.signOutLabel, spec.onSignOut, "tracked-quiz-btn-secondary"));
    }

    bar.appendChild(meta);
    bar.appendChild(actions);
    target.appendChild(bar);
  }

  async function loadFirebaseModules() {
    const baseUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
    const modules = await Promise.all([
      import(`${baseUrl}/firebase-app.js`),
      import(`${baseUrl}/firebase-auth.js`),
      import(`${baseUrl}/firebase-database.js`),
    ]);

    return Object.assign({}, ...modules);
  }

  function parseTimestamp(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value !== "string" || !value.trim()) return null;

    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) {
      const asNumber = Number(trimmed);
      return Number.isFinite(asNumber) ? asNumber : null;
    }

    const parsed = Date.parse(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function normalizeAnswerEntries(rawAnswers) {
    if (Array.isArray(rawAnswers)) {
      return rawAnswers
        .map((answer, index) => [String(index), answer])
        .filter(([questionId, answer]) => questionId !== "0" && answer && typeof answer === "object");
    }

    if (rawAnswers && typeof rawAnswers === "object") {
      return Object.entries(rawAnswers)
        .filter(([, answer]) => answer && typeof answer === "object");
    }

    return [];
  }

  function getAnswerTiming(entries) {
    const timestamps = entries
      .map(([, answer]) => parseTimestamp(answer?.answeredAt))
      .filter((value) => Number.isFinite(value));

    if (!timestamps.length) {
      return {
        earliest: null,
        latest: null,
      };
    }

    return {
      earliest: Math.min(...timestamps),
      latest: Math.max(...timestamps),
    };
  }

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function formatLocalDateTime(ms, timeZone) {
    if (!Number.isFinite(ms)) return "";
    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });

    return formatter.format(new Date(ms)).replace(",", "");
  }

  function formatDuration(ms) {
    if (!Number.isFinite(ms) || ms < 0) return "";
    const totalSeconds = Math.round(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  }

  function escapeCsvValue(value) {
    const str = value == null ? "" : String(value);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, "\"\"")}"`;
    }
    return str;
  }

  async function loadQuizQuestions(quiz) {
    const response = await fetch(quiz.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${quiz.url}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const script = Array.from(doc.querySelectorAll("script"))
      .find((node) => node.textContent.includes("window.QUIZ_QUESTIONS ="));

    if (!script) {
      throw new Error(`Could not find question script in ${quiz.url}`);
    }

    const end = script.textContent.indexOf("window.QUIZ_LABELS =");
    if (end === -1) {
      throw new Error(`Could not parse questions from ${quiz.url}`);
    }

    const evaluator = new Function(`
      const window = {};
      ${script.textContent.slice(0, end)}
      return window.QUIZ_QUESTIONS;
    `);

    const questions = evaluator();
    if (!Array.isArray(questions)) {
      throw new Error(`Questions are not an array in ${quiz.url}`);
    }

    const correctByQuestionId = new Map(
      questions.map((question) => [String(question.id), question.correctKey])
    );

    return {
      ...quiz,
      questions,
      correctByQuestionId,
    };
  }

  function buildRow(record, quiz, userProfile, timeZone) {
    const answerEntries = normalizeAnswerEntries(record?.answers);
    const timing = getAnswerTiming(answerEntries);

    const startMs = parseTimestamp(record?.startedAt) ?? timing.earliest ?? parseTimestamp(record?.updatedAt);
    const endMs = parseTimestamp(record?.submittedAt) ?? parseTimestamp(record?.updatedAt) ?? timing.latest;

    const incorrectQuestionIds = answerEntries
      .filter(([questionId, answer]) => {
        const correctKey = quiz.correctByQuestionId.get(String(questionId));
        return typeof answer?.selectedKey === "string"
          && typeof correctKey === "string"
          && answer.selectedKey !== correctKey;
      })
      .map(([questionId]) => Number(questionId))
      .filter((questionId) => Number.isFinite(questionId))
      .sort((a, b) => a - b);

    const correctCount = answerEntries.filter(([questionId, answer]) => {
      const correctKey = quiz.correctByQuestionId.get(String(questionId));
      return typeof answer?.selectedKey === "string"
        && typeof correctKey === "string"
        && answer.selectedKey === correctKey;
    }).length;

    const totalQuestions = quiz.questions.length;
    const scorePercent = totalQuestions
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

    return {
      uid: record?.uid || "",
      name: record?.displayName || userProfile?.displayName || "",
      email: record?.email || userProfile?.email || "",
      startMs,
      startDateTime: formatLocalDateTime(startMs, timeZone),
      scorePercent: Number.isFinite(scorePercent) ? scorePercent : "",
      totalDuration: formatDuration(
        Number.isFinite(startMs) && Number.isFinite(endMs) ? endMs - startMs : NaN
      ),
      incorrectQuestions: incorrectQuestionIds.join(" "),
      status: record?.status || "in_progress",
    };
  }

  function buildCsv(rows) {
    const lines = [
      [
        "name",
        "email",
        "start_datetime",
        "scorePercent",
        "total_duration",
        "incorrect_questions",
      ].join(","),
    ];

    rows.forEach((row) => {
      lines.push([
        escapeCsvValue(row.name),
        escapeCsvValue(row.email),
        escapeCsvValue(row.startDateTime),
        escapeCsvValue(row.scorePercent),
        escapeCsvValue(row.totalDuration),
        escapeCsvValue(row.incorrectQuestions),
      ].join(","));
    });

    return lines.join("\n");
  }

  function buildQuizReport(quiz, quizRecords, usersByUid, timeZone) {
    const records = quizRecords && typeof quizRecords === "object"
      ? Object.entries(quizRecords).map(([uid, record]) => ({
          uid,
          ...(record && typeof record === "object" ? record : {}),
        }))
      : [];

    const rows = records
      .map((record) => buildRow(record, quiz, usersByUid?.[record?.uid] || null, timeZone))
      .sort((a, b) => {
        const aStart = Number.isFinite(a.startMs) ? a.startMs : Number.MAX_SAFE_INTEGER;
        const bStart = Number.isFinite(b.startMs) ? b.startMs : Number.MAX_SAFE_INTEGER;
        if (aStart !== bStart) return aStart - bStart;
        return `${a.name}|${a.email}`.localeCompare(`${b.name}|${b.email}`, "he");
      });

    const submittedCount = rows.filter((row) => row.status === "submitted").length;

    return {
      quizKey: quiz.quizKey,
      title: quiz.title,
      rows,
      csv: buildCsv(rows),
      attemptsCount: rows.length,
      submittedCount,
      inProgressCount: rows.length - submittedCount,
    };
  }

  function downloadCsv(filename, content) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function renderReports(target, sections, labels) {
    clearNode(target);

    sections.forEach((section) => {
      const block = createElement("section", "tracked-quiz-report-section");
      const header = createElement("div", "tracked-quiz-report-header");
      const titleWrap = createElement("div", "tracked-quiz-report-heading");
      titleWrap.appendChild(createElement("h2", "tracked-quiz-report-title", section.title));
      titleWrap.appendChild(createElement("div", "tracked-quiz-report-subtitle", section.quizKey));

      const stats = createElement(
        "div",
        "tracked-quiz-report-stats",
        `${labels.attemptsLabel}: ${section.attemptsCount} | ${labels.submittedLabel}: ${section.submittedCount} | ${labels.inProgressLabel}: ${section.inProgressCount}`
      );

      const actions = createElement("div", "tracked-quiz-report-actions");
      actions.appendChild(createButton(
        labels.downloadLabel,
        () => downloadCsv(`${section.quizKey}-report.csv`, section.csv),
        "tracked-quiz-btn-secondary"
      ));

      header.appendChild(titleWrap);
      header.appendChild(actions);
      block.appendChild(header);
      block.appendChild(stats);

      if (!section.rows.length) {
        block.appendChild(createElement("p", "tracked-quiz-report-empty", labels.noDataMessage));
      }

      block.appendChild(createElement("div", "tracked-quiz-report-csv-label", labels.csvTitle));

      const textarea = createElement("textarea", "tracked-quiz-report-csv");
      textarea.readOnly = true;
      textarea.dir = "ltr";
      textarea.value = section.csv;
      textarea.rows = Math.max(6, Math.min(section.rows.length + 2, 18));
      block.appendChild(textarea);

      target.appendChild(block);
    });
  }

  async function bootTrackedQuizReport() {
    const rawConfig = window.TRACKED_QUIZ_REPORT_CONFIG;
    if (!rawConfig) return;

    const config = normalizeConfig(rawConfig);
    const statusMount = document.getElementById(config.statusMountId);
    const accountMount = document.getElementById(config.accountMountId);
    const reportMount = document.getElementById(config.mountId);

    if (!statusMount || !accountMount || !reportMount) {
      return;
    }

    if (!config.firebaseConfig || !config.quizzes.length) {
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.loadErrorTitle,
        message: config.labels.loadErrorMessage,
        extraLines: ["Missing report configuration."],
      });
      return;
    }

    setHidden(reportMount, true);
    renderCard(statusMount, {
      tone: "note",
      title: config.labels.loadingTitle,
      message: config.labels.loadingMessage,
    });

    const firebase = await loadFirebaseModules();
    const {
      initializeApp,
      getAuth,
      GoogleAuthProvider,
      onAuthStateChanged,
      signInWithPopup,
      signOut,
      getDatabase,
      ref,
      get,
    } = firebase;

    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    async function signInHandler() {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        renderCard(statusMount, {
          tone: "error",
          title: config.labels.loadErrorTitle,
          message: error?.message || config.labels.loadErrorMessage,
          actions: [
            {
              label: config.labels.signInButtonLabel,
              onClick: signInHandler,
            },
          ],
        });
      }
    }

    async function loadAndRenderReport(user) {
      renderAccountBar(accountMount, {
        user,
        labels: config.labels,
        onRefresh: () => loadAndRenderReport(user),
        onSignOut: async () => {
          await signOut(auth);
        },
      });

      renderCard(statusMount, {
        tone: "note",
        title: config.labels.loadingTitle,
        message: config.labels.loadingMessage,
      });
      setHidden(reportMount, true);

      const [usersSnapshot, quizzes] = await Promise.all([
        get(ref(db, toPath([config.rootPath, "users"]))),
        Promise.all(config.quizzes.map((quiz) => loadQuizQuestions(quiz))),
      ]);

      const usersByUid = usersSnapshot.val() && typeof usersSnapshot.val() === "object"
        ? usersSnapshot.val()
        : {};

      const quizSnapshots = await Promise.all(
        quizzes.map((quiz) => get(ref(db, toPath([config.rootPath, quiz.quizKey]))))
      );

      const sections = quizzes.map((quiz, index) => buildQuizReport(
        quiz,
        quizSnapshots[index].val(),
        usersByUid,
        config.timeZone
      ));

      clearNode(statusMount);
      renderReports(reportMount, sections, config.labels);
      setHidden(reportMount, false);
    }

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        clearNode(accountMount);
        setHidden(reportMount, true);
        renderCard(statusMount, {
          tone: "note",
          title: config.labels.signInTitle,
          message: config.labels.signInMessage,
          actions: [
            {
              label: config.labels.signInButtonLabel,
              onClick: signInHandler,
            },
          ],
        });
        return;
      }

      if (config.adminUids.length && !config.adminUids.includes(user.uid)) {
        clearNode(accountMount);
        setHidden(reportMount, true);
        renderCard(statusMount, {
          tone: "warning",
          title: config.labels.unauthorizedTitle,
          message: config.labels.unauthorizedMessage,
          extraLines: [user.email || user.uid],
          actions: [
            {
              label: config.labels.signOutLabel,
              onClick: async () => signOut(auth),
            },
          ],
        });
        return;
      }

      try {
        await loadAndRenderReport(user);
      } catch (error) {
        setHidden(reportMount, true);
        renderCard(statusMount, {
          tone: "error",
          title: config.labels.loadErrorTitle,
          message: config.labels.loadErrorMessage,
          extraLines: [error?.message || String(error)],
        });
      }
    });
  }

  runWhenReady(() => {
    bootTrackedQuizReport().catch((error) => {
      const rawConfig = window.TRACKED_QUIZ_REPORT_CONFIG;
      if (!rawConfig) return;
      const config = normalizeConfig(rawConfig);
      const statusMount = document.getElementById(config.statusMountId);
      if (!statusMount) return;
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.loadErrorTitle,
        message: error?.message || config.labels.loadErrorMessage,
      });
    });
  });
})();
