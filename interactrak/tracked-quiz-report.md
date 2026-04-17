---
layout: page
title: דוח שאלונים
lang: he
full-width: true
---

<!-- interactive -->

<style>
.tracked-quiz-report-section {
  margin: 2rem 0;
  padding: 1.25rem;
  border: 1px solid #d7dee8;
  border-radius: 16px;
  background: #fff;
}

.tracked-quiz-report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.tracked-quiz-report-title {
  margin: 0;
}

.tracked-quiz-report-subtitle,
.tracked-quiz-report-stats,
.tracked-quiz-report-csv-label,
.tracked-quiz-report-empty {
  color: #475569;
}

.tracked-quiz-report-subtitle {
  margin-top: 0.25rem;
  direction: ltr;
  text-align: left;
}

.tracked-quiz-report-stats {
  margin: 0.75rem 0 1rem;
}

.tracked-quiz-report-actions {
  display: flex;
  gap: 0.75rem;
}

.tracked-quiz-report-csv-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tracked-quiz-report-csv {
  width: 100%;
  min-height: 10rem;
  padding: 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  font: 0.95rem/1.5 Consolas, Monaco, monospace;
  resize: vertical;
}
</style>

<div class="box-note" markdown="1">
הדף הזה מציג דוח לכל השאלונים המוגנים.

- נדרשת התחברות עם Google.
- הגישה מותרת רק לחשבונות שמופיעים כ-`quiz_debug_uids` באחד השאלונים.
- משך הזמן מחושב מ-`startedAt` עד `submittedAt`, ואם אין הגשה סופית אז עד `updatedAt`.
- רשימת השאלות השגויות מכילה מספרי שאלות מופרדים ברווחים כדי להישאר ידידותית ל-CSV.
</div>

<div id="tracked-quiz-report-status"></div>
<div id="tracked-quiz-report-account"></div>
<div id="tracked-quiz-report-root" class="hidden"></div>

<script>
window.TRACKED_QUIZ_REPORT_CONFIG = {
  firebaseConfig: {
    apiKey: "AIzaSyB1PN88qSK_iLk2tquUtHEr-243P9-9C8U",
    authDomain: "guysfbfinal.firebaseapp.com",
    databaseURL: "https://guysfbfinal-default-rtdb.firebaseio.com",
    projectId: "guysfbfinal",
    storageBucket: "guysfbfinal.firebasestorage.app",
    messagingSenderId: "305446301273",
    appId: "1:305446301273:web:87f1865be1a45edad9cb48"
  },
  rootPath: "jekyll",
  statusMountId: "tracked-quiz-report-status",
  accountMountId: "tracked-quiz-report-account",
  mountId: "tracked-quiz-report-root",
  timeZone: "Asia/Jerusalem",
  quizzes: [
    {% assign tracked_quizzes = site.pages | where: "tracked_quiz", true | sort: "quiz_key" %}
    {% for quiz in tracked_quizzes %}
    {
      quizKey: {{ quiz.quiz_key | jsonify }},
      title: {{ quiz.title | jsonify }},
      url: {{ quiz.url | relative_url | jsonify }},
      debugUids: {{ quiz.quiz_debug_uids | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  labels: {
    loadingTitle: "טוענים דוח",
    loadingMessage: "מתחברים ל-Firebase ומכינים את נתוני השאלונים...",
    signInTitle: "נדרשת התחברות",
    signInMessage: "כדי לפתוח את הדוח, התחברו עם חשבון Google.",
    signInButtonLabel: "התחברות עם Google",
    unauthorizedTitle: "אין הרשאה לצפייה בדוח",
    unauthorizedMessage: "החשבון הזה אינו מוגדר כחשבון דיבאג/ניהול של השאלונים.",
    loadErrorTitle: "לא הצלחנו לטעון את הדוח",
    loadErrorMessage: "אירעה שגיאה בזמן טעינת הדוח מ-Firebase או בזמן קריאת אחד השאלונים.",
    signOutLabel: "התנתקות",
    accountSignedInPrefix: "מחוברים בתור",
    refreshLabel: "רענון",
    noDataMessage: "אין עדיין נתונים לשאלון הזה.",
    attemptsLabel: "ניסיונות",
    submittedLabel: "הוגשו",
    inProgressLabel: "בטיוטה",
    csvTitle: "CSV",
    downloadLabel: "הורדת CSV"
  }
};
</script>

<script src="{{ '/assets/js/tracked-quiz-report.js' | relative_url }}"></script>
