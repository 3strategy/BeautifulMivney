(function () {
  const FIREBASE_VERSION = "11.4.0";
  const DEFAULT_ROOT_PATH = "jekyll";

  const DEFAULT_LABELS = {
    loadingTitle: "Checking access",
    loadingMessage: "Preparing the questionnaire...",
    signInTitle: "Sign in required",
    signInMessage: "Use Google sign-in to open this questionnaire.",
    signInButtonLabel: "Sign in with Google",
    invalidLinkTitle: "Invalid questionnaire link",
    invalidLinkMessage: "This link does not match the configured questionnaire window.",
    windowClosedTitle: "Questionnaire closed",
    windowClosedMessage: "This questionnaire is not available right now.",
    configErrorTitle: "Questionnaire configuration error",
    configErrorMessage: "The questionnaire could not be initialized.",
    authErrorTitle: "Authentication error",
    authErrorMessage: "Google sign-in could not be completed.",
    loadErrorTitle: "Unable to load questionnaire",
    loadErrorMessage: "The questionnaire state could not be loaded from Firebase.",
    signOutLabel: "Sign out",
    accountSignedInPrefix: "Signed in as",
    autosaveMessage: "Progress is saved automatically.",
    debugBadgeLabel: "Debug",
    debugResetLabel: "Start new debug attempt",
    debugResetConfirmMessage: "Delete the saved quiz record and start over?",
    debugWindowBypassMessage: "Debug access bypassed the questionnaire time window.",
  };

  function runWhenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  }

  function toPath(parts) {
    return parts
      .filter(Boolean)
      .map((part) => String(part).replace(/^\/+|\/+$/g, ""))
      .join("/");
  }

  function normalizeConfig(rawConfig) {
    const labels = {
      ...DEFAULT_LABELS,
      ...(rawConfig?.labels || {}),
    };

    return {
      firebaseConfig: rawConfig?.firebaseConfig || null,
      rootPath: rawConfig?.rootPath || DEFAULT_ROOT_PATH,
      quizKey: rawConfig?.quizKey || "",
      slug: rawConfig?.slug || rawConfig?.quizKey || "",
      pagePath: rawConfig?.pagePath || window.location.pathname,
      quizWindowStart: rawConfig?.quizWindowStart || rawConfig?.windowStart || "",
      quizWindowEnd: rawConfig?.quizWindowEnd || rawConfig?.windowEnd || "",
      unlockToken: rawConfig?.unlockToken || rawConfig?.quizUnlockToken || "",
      mountId: rawConfig?.mountId || "quiz-root",
      statusMountId: rawConfig?.statusMountId || "tracked-quiz-status",
      accountMountId: rawConfig?.accountMountId || "tracked-quiz-account",
      debugUids: Array.isArray(rawConfig?.debugUids) ? rawConfig.debugUids : [],
      questions: Array.isArray(rawConfig?.questions) ? rawConfig.questions : [],
      labels,
      revealDelayMs: typeof rawConfig?.revealDelayMs === "number" ? rawConfig.revealDelayMs : 250,
      dir: rawConfig?.dir || "rtl",
      questionLabels: rawConfig?.questionLabels || labels,
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

  function renderCard(target, spec) {
    clearNode(target);
    const card = createElement("div", `tracked-quiz-card tracked-quiz-card-${spec.tone || "note"}`);
    const title = createElement("h2", "tracked-quiz-card-title", spec.title);
    const message = createElement("p", "tracked-quiz-card-text", spec.message);

    card.appendChild(title);
    if (spec.message) card.appendChild(message);

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
    const userLine = createElement(
      "div",
      "tracked-quiz-account-user",
      `${spec.labels.accountSignedInPrefix}: ${spec.user.displayName || spec.user.email || spec.user.uid}`
    );
    meta.appendChild(userLine);

    if (spec.isDebug) {
      meta.appendChild(createElement("div", "tracked-quiz-debug-badge", spec.labels.debugBadgeLabel));
    }

    if (spec.note) {
      meta.appendChild(createElement("div", "tracked-quiz-account-note", spec.note));
    }

    const actions = createElement("div", "tracked-quiz-account-actions");
    if (spec.isDebug && typeof spec.onReset === "function") {
      actions.appendChild(createButton(spec.labels.debugResetLabel, spec.onReset, "tracked-quiz-btn-secondary"));
    }
    if (typeof spec.onSignOut === "function") {
      actions.appendChild(createButton(spec.labels.signOutLabel, spec.onSignOut, "tracked-quiz-btn-secondary"));
    }

    bar.appendChild(meta);
    bar.appendChild(actions);
    target.appendChild(bar);
  }

  function serializeAnswersForDatabase(answers) {
    const serialized = {};
    Object.keys(answers || {}).forEach((questionId) => {
      serialized[questionId] = {
        selectedKey: answers[questionId]?.selectedKey || null,
        skipped: answers[questionId]?.skipped === true,
        answeredAt: answers[questionId]?.answeredAt || null,
      };
    });
    return serialized;
  }

  function normalizeLoadedRecord(record) {
    if (!record || typeof record !== "object") return null;
    return {
      status: record.status === "submitted" ? "submitted" : "in_progress",
      currentQuestionIndex: typeof record.currentQuestionIndex === "number" ? record.currentQuestionIndex : 0,
      answers: record.answers && typeof record.answers === "object" ? record.answers : {},
      startedAt: record.startedAt || null,
      submittedAt: record.submittedAt || null,
    };
  }

  function isWindowOpen(startIso, endIso) {
    const startMs = Date.parse(startIso);
    const endMs = Date.parse(endIso);
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return false;
    const nowMs = Date.now();
    return startMs <= nowMs && nowMs <= endMs;
  }

  function validateConfig(config) {
    if (!config.firebaseConfig) return "Missing firebaseConfig";
    if (!config.quizKey) return "Missing quizKey";
    if (!config.quizWindowStart || !config.quizWindowEnd) return "Missing quiz window";
    if (!config.unlockToken) return "Missing unlock token";
    if (!config.questions.length) return "Missing questions";
    if (!document.getElementById(config.statusMountId)) return `Missing #${config.statusMountId}`;
    if (!document.getElementById(config.accountMountId)) return `Missing #${config.accountMountId}`;
    if (!document.getElementById(config.mountId)) return `Missing #${config.mountId}`;
    return null;
  }

  function validateUnlockRequest(config) {
    const params = new URLSearchParams(window.location.search);
    const start = params.get("start") || "";
    const end = params.get("end") || "";
    const token = params.get("token") || "";

    if (start !== config.quizWindowStart) return false;
    if (end !== config.quizWindowEnd) return false;
    if (token !== config.unlockToken) return false;
    return true;
  }

  async function waitForQuestionnaireRenderer(timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (typeof window.renderQuestionnaire === "function") return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error("Timed out waiting for questionnaire renderer");
  }

  async function loadFirebaseModules() {
    const baseUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
    const [
      firebaseApp,
      firebaseAuth,
      firebaseDatabase,
    ] = await Promise.all([
      import(`${baseUrl}/firebase-app.js`),
      import(`${baseUrl}/firebase-auth.js`),
      import(`${baseUrl}/firebase-database.js`),
    ]);

    return {
      ...firebaseApp,
      ...firebaseAuth,
      ...firebaseDatabase,
    };
  }

  function buildUserProfilePayload(user, serverTimestamp) {
    const lastSignInTime = user?.metadata?.lastSignInTime ? Date.parse(user.metadata.lastSignInTime) : null;
    return {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      provider: "google",
      lastSeenAt: serverTimestamp(),
      lastSignInAt: Number.isFinite(lastSignInTime) ? lastSignInTime : serverTimestamp(),
    };
  }

  function buildQuizPayload(config, user, snapshot, status, serverTimestamp, includeStartedAt) {
    const payload = {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      status,
      updatedAt: serverTimestamp(),
      currentQuestionIndex: snapshot.currentQuestionIndex,
      answers: serializeAnswersForDatabase(snapshot.answers),
      page: {
        quizKey: config.quizKey,
        slug: config.slug,
        path: config.pagePath,
      },
      window: {
        start: config.quizWindowStart,
        end: config.quizWindowEnd,
      },
    };

    if (includeStartedAt) {
      payload.startedAt = serverTimestamp();
    }

    if (status === "submitted") {
      payload.submittedAt = serverTimestamp();
      payload.summary = {
        totalQuestions: snapshot.summary.totalQuestions,
        answeredCount: snapshot.summary.answeredCount,
        correctCount: snapshot.summary.correctCount,
        scorePercent: snapshot.summary.scorePercent,
      };
    }

    return payload;
  }

  async function bootTrackedQuiz() {
    const rawConfig = window.TRACKED_QUIZ_CONFIG;
    if (!rawConfig) return;

    const config = normalizeConfig(rawConfig);
    const validationError = validateConfig(config);
    const statusMount = document.getElementById(config.statusMountId);
    const accountMount = document.getElementById(config.accountMountId);
    const quizMount = document.getElementById(config.mountId);
    const quizPath = (uid) => toPath([config.rootPath, config.quizKey, uid]);
    const userPath = (uid) => toPath([config.rootPath, "users", uid]);

    setHidden(quizMount, true);

    if (validationError) {
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.configErrorTitle,
        message: config.labels.configErrorMessage,
        extraLines: [validationError],
      });
      return;
    }

    if (!validateUnlockRequest(config)) {
      renderCard(statusMount, {
        tone: "warning",
        title: config.labels.invalidLinkTitle,
        message: config.labels.invalidLinkMessage,
      });
      return;
    }

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
      update,
      remove,
      serverTimestamp,
    } = firebase;

    const app = initializeApp(config.firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    let activeGeneration = 0;
    let saveTimer = null;
    let hasStartedAt = false;
    let queuedWrite = Promise.resolve();

    function cancelPendingWork() {
      activeGeneration += 1;
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
      }
      queuedWrite = Promise.resolve();
    }

    function enqueueWrite(work) {
      queuedWrite = queuedWrite.catch(() => {}).then(work);
      return queuedWrite;
    }

    async function signInHandler() {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        renderCard(statusMount, {
          tone: "error",
          title: config.labels.authErrorTitle,
          message: error?.message || config.labels.authErrorMessage,
          actions: [
            {
              label: config.labels.signInButtonLabel,
              onClick: signInHandler,
            },
          ],
        });
      }
    }

    function renderSignedOut() {
      clearNode(accountMount);
      setHidden(quizMount, true);
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
    }

    function renderAuthError(title, message, extraLine) {
      clearNode(accountMount);
      setHidden(quizMount, true);
      renderCard(statusMount, {
        tone: "error",
        title,
        message,
        extraLines: extraLine ? [extraLine] : [],
      });
    }

    async function renderQuizSession(user, isDebugUser, loadedRecord, generation, sessionFlags) {
      hasStartedAt = !!loadedRecord?.startedAt;
      const initialState = loadedRecord || {
        status: "in_progress",
        currentQuestionIndex: 0,
        answers: {},
      };

      const noteLines = [config.labels.autosaveMessage];
      if (sessionFlags?.debugWindowBypassed) {
        noteLines.push(config.labels.debugWindowBypassMessage);
      }

      renderAccountBar(accountMount, {
        user,
        isDebug: isDebugUser,
        note: noteLines.filter(Boolean).join(" "),
        labels: config.labels,
        onSignOut: async () => {
          cancelPendingWork();
          await signOut(auth);
        },
        onReset: async () => {
          if (!window.confirm(config.labels.debugResetConfirmMessage)) return;
          cancelPendingWork();
          const nextGeneration = activeGeneration;
          renderCard(statusMount, {
            tone: "note",
            title: config.labels.loadingTitle,
            message: config.labels.loadingMessage,
          });
          await remove(ref(db, quizPath(user.uid)));
          if (nextGeneration !== activeGeneration) return;
          await renderQuizSession(user, true, null, nextGeneration);
        },
      });

      clearNode(statusMount);
      setHidden(quizMount, false);
      await waitForQuestionnaireRenderer(10000);

      const readOnly = initialState.status === "submitted" && !isDebugUser;

      function scheduleAutosave(snapshot) {
        if (readOnly || generation !== activeGeneration) return;
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          saveTimer = null;
          enqueueWrite(async () => {
            if (generation !== activeGeneration) return;
            const payload = buildQuizPayload(config, user, snapshot, "in_progress", serverTimestamp, !hasStartedAt);
            await update(ref(db, quizPath(user.uid)), payload);
            hasStartedAt = true;
          }).catch((error) => {
            renderCard(statusMount, {
              tone: "error",
              title: config.labels.loadErrorTitle,
              message: error?.message || config.labels.loadErrorMessage,
            });
          });
        }, 250);
      }

      async function submitAttempt(snapshot) {
        if (generation !== activeGeneration) {
          throw new Error("Questionnaire session changed.");
        }
        if (saveTimer) {
          clearTimeout(saveTimer);
          saveTimer = null;
        }

        await enqueueWrite(async () => {
          if (generation !== activeGeneration) {
            throw new Error("Questionnaire session changed.");
          }
          const payload = buildQuizPayload(config, user, snapshot, "submitted", serverTimestamp, !hasStartedAt);
          await update(ref(db, quizPath(user.uid)), payload);
          hasStartedAt = true;
        });
      }

      window.renderQuestionnaire({
        mountId: config.mountId,
        questions: config.questions,
        labels: config.questionLabels,
        revealDelayMs: config.revealDelayMs,
        dir: config.dir,
        mode: "assessment",
        shuffleChoices: false,
        initialState,
        onStateChange: readOnly ? null : scheduleAutosave,
        onSubmit: readOnly ? null : submitAttempt,
      });
    }

    onAuthStateChanged(auth, async (user) => {
      cancelPendingWork();
      const generation = activeGeneration;

      if (!user) {
        renderSignedOut();
        return;
      }

      renderCard(statusMount, {
        tone: "note",
        title: config.labels.loadingTitle,
        message: config.labels.loadingMessage,
      });

      try {
        await update(ref(db, userPath(user.uid)), buildUserProfilePayload(user, serverTimestamp));
        if (generation !== activeGeneration) return;

        const isDebugUser = config.debugUids.includes(user.uid);
        const windowOpen = isWindowOpen(config.quizWindowStart, config.quizWindowEnd);

        if (!isDebugUser && !windowOpen) {
          renderAccountBar(accountMount, {
            user,
            isDebug: false,
            note: "",
            labels: config.labels,
            onSignOut: async () => {
              cancelPendingWork();
              await signOut(auth);
            },
          });
          setHidden(quizMount, true);
          renderCard(statusMount, {
            tone: "warning",
            title: config.labels.windowClosedTitle,
            message: config.labels.windowClosedMessage,
          });
          return;
        }

        const snapshot = await get(ref(db, quizPath(user.uid)));
        if (generation !== activeGeneration) return;
        await renderQuizSession(user, isDebugUser, normalizeLoadedRecord(snapshot.val()), generation, {
          debugWindowBypassed: isDebugUser && !windowOpen,
        });
      } catch (error) {
        renderAuthError(
          config.labels.loadErrorTitle,
          config.labels.loadErrorMessage,
          error?.message
        );
      }
    });
  }

  runWhenReady(() => {
    bootTrackedQuiz().catch((error) => {
      const rawConfig = window.TRACKED_QUIZ_CONFIG;
      if (!rawConfig) return;
      const config = normalizeConfig(rawConfig);
      const statusMount = document.getElementById(config.statusMountId);
      if (!statusMount) return;
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.configErrorTitle,
        message: error?.message || config.labels.configErrorMessage,
      });
    });
  });
})();
