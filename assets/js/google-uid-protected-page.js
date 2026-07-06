(function () {
  const FIREBASE_VERSION = "11.4.0";

  const DEFAULT_LABELS = {
    loadingTitle: "Checking access",
    loadingMessage: "Connecting to Google sign-in...",
    signInTitle: "Google sign-in required",
    signInMessage: "Sign in with the authorized Google account to open this page.",
    signInButtonLabel: "Sign in with Google",
    unauthorizedTitle: "No access",
    unauthorizedMessage: "This Google account is not authorized for this page.",
    configErrorTitle: "Page access configuration error",
    configErrorMessage: "The protected page could not be initialized.",
    authErrorTitle: "Authentication error",
    authErrorMessage: "Google sign-in could not be completed.",
    signOutLabel: "Sign out",
    accountSignedInPrefix: "Signed in as",
  };

  function runWhenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  }

  function normalizeConfig(rawConfig) {
    return {
      firebaseConfig: rawConfig?.firebaseConfig || null,
      allowedUids: Array.isArray(rawConfig?.allowedUids) ? rawConfig.allowedUids : [],
      statusMountId: rawConfig?.statusMountId || "google-uid-protected-status",
      accountMountId: rawConfig?.accountMountId || "google-uid-protected-account",
      contentMountId: rawConfig?.contentMountId || "google-uid-protected-content",
      labels: {
        ...DEFAULT_LABELS,
        ...(rawConfig?.labels || {}),
      },
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
    card.appendChild(createElement("h2", "tracked-quiz-card-title", spec.title));

    if (spec.message) {
      card.appendChild(createElement("p", "tracked-quiz-card-text", spec.message));
    }

    if (Array.isArray(spec.extraLines) && spec.extraLines.length) {
      const meta = createElement("div", "tracked-quiz-card-meta");
      spec.extraLines.forEach((line) => {
        meta.appendChild(createElement("div", "tracked-quiz-card-meta-line", line));
      });
      card.appendChild(meta);
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
    ]);

    return Object.assign({}, ...modules);
  }

  function validateConfig(config) {
    if (!config.firebaseConfig) return "Missing firebaseConfig";
    if (!config.allowedUids.length) return "Missing allowedUids";
    if (!document.getElementById(config.statusMountId)) return `Missing #${config.statusMountId}`;
    if (!document.getElementById(config.accountMountId)) return `Missing #${config.accountMountId}`;
    if (!document.getElementById(config.contentMountId)) return `Missing #${config.contentMountId}`;
    return null;
  }

  async function bootProtectedPage() {
    const rawConfig = window.GOOGLE_UID_PROTECTED_PAGE_CONFIG;
    if (!rawConfig) return;

    const config = normalizeConfig(rawConfig);
    const statusMount = document.getElementById(config.statusMountId);
    const accountMount = document.getElementById(config.accountMountId);
    const contentMount = document.getElementById(config.contentMountId);

    setHidden(contentMount, true);

    const validationError = validateConfig(config);
    if (validationError) {
      renderCard(statusMount, {
        tone: "error",
        title: config.labels.configErrorTitle,
        message: config.labels.configErrorMessage,
        extraLines: [validationError],
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
      getApps,
      getAuth,
      GoogleAuthProvider,
      onAuthStateChanged,
      signInWithPopup,
      signOut,
    } = firebase;

    const app = getApps().length ? getApps()[0] : initializeApp(config.firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

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
      setHidden(contentMount, true);
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

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        renderSignedOut();
        return;
      }

      if (!config.allowedUids.includes(user.uid)) {
        clearNode(accountMount);
        setHidden(contentMount, true);
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

      clearNode(statusMount);
      setHidden(contentMount, false);
      renderAccountBar(accountMount, {
        user,
        labels: config.labels,
        onSignOut: async () => signOut(auth),
      });
    });
  }

  runWhenReady(() => {
    bootProtectedPage().catch((error) => {
      const config = normalizeConfig(window.GOOGLE_UID_PROTECTED_PAGE_CONFIG || {});
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
