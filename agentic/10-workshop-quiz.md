---
layout: page
title: "סדנה ושאלון סיכום"
subtitle: "תרגול מורים: מפרומפט לראיה"
full-width: true
tags: [agentic, workshop, questionnaire, teaching]
lang: he
---

<!-- interactive -->

{: .box-note}
העמוד הזה מיועד לסיום יחידת המבוא. הוא משלב תרגיל סדנה קצר ושאלון אינטראקטיבי כדי לבדוק שמורים מבינים את ההבדל בין "AI ענה לי" לבין "agent עבד בתוך harness".

## תרגיל סדנה

בחרו repo קטן. אפשר להשתמש באתר Jekyll, דף HTML, או פרויקט Android פשוט. המשימה:

```text
הוסף עמוד/מסך קטן.
עדכן ניווט.
הרץ build או בדיקה.
פתח בדפדפן או תעד למה אי אפשר.
בסוף סכם evidence.
```

## Rubric קצר

| קריטריון | 0 | 1 | 2 |
|---|---|---|---|
| Scope | אין גבולות | גבולות חלקיים | גבולות ברורים |
| Tests | לא נבדק | build בלבד | build + בדיקה ממוקדת |
| Git | אין diff | יש diff | יש diff + review notes |
| Documentation | אין | סיכום קצר | Markdown ברור + links |
| Safety | secrets / מידע פרטי | זהירות חלקית | אין secrets, אין מידע תלמידים |
{: .tabl-rl}

<div id="quiz-root"></div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: מהו Harness Engineering?",
    promptHe: "איזו תשובה מתארת בצורה המדויקת ביותר Harness Engineering?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כתיבת פרומפטים ארוכים יותר" },
      { key: "B", text: "בניית מערכת הוראות, בדיקות, Git ותיעוד שמחזיקה את ה-agent במסלול" },
      { key: "C", text: "שימוש רק בצ'אט online" },
      { key: "D", text: "החלפת כל עבודת המורה באוטומציה" }
    ],
    correctKey: "B",
    explanationHe: "Harness Engineering הוא התשתית סביב ה-agent: מפרטים, הרשאות, בדיקות, Git, תיעוד ו-review.",
    tags: ["harness"]
  },
  {
    id: 2,
    title: "שאלה 2: Online מול agent",
    promptHe: "מה ההבדל החשוב ביותר בין שיחה online לבין agent מקומי?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "agent מקומי תמיד חכם יותר" },
      { key: "B", text: "online chat לא יכול להסביר קוד" },
      { key: "C", text: "agent מקומי יכול לקרוא repo, לערוך קבצים ולהריץ פקודות לפי הרשאות" },
      { key: "D", text: "אין הבדל משמעותי" }
    ],
    correctKey: "C",
    explanationHe: "ההבדל הוא סביבת הפעולה. agent עובד בתוך פרויקט וכלים, ולכן צריך גם גבולות ובדיקות.",
    tags: ["online", "agent"]
  },
  {
    id: 3,
    title: "שאלה 3: ראיה",
    promptHe: "איזו ראיה היא החלשה ביותר לכך ששינוי עובד?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`bundle exec jekyll build` עבר" },
      { key: "B", text: "Playwright עבר" },
      { key: "C", text: "ה-agent כתב בסיכום שהכל עובד, בלי להריץ כלום" },
      { key: "D", text: "צילום מסך של המסך המתוקן" }
    ],
    correctKey: "C",
    explanationHe: "סיכום בלי הרצה אינו evidence. הוא לכל היותר טענה.",
    tags: ["evidence"]
  },
  {
    id: 4,
    title: "שאלה 4: clasp",
    promptHe: "למה clasp חשוב בהקשר של Google Sheets ו-Apps Script?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הוא מחליף את Google Sheets" },
      { key: "B", text: "הוא מאפשר לעבוד מקומית, להשתמש ב-Git, ולנהל Apps Script מה-CLI" },
      { key: "C", text: "הוא כלי לבדיקות Playwright בלבד" },
      { key: "D", text: "הוא נדרש רק לאנדרואיד" }
    ],
    correctKey: "B",
    explanationHe: "clasp מחבר Apps Script לעבודה הנדסית מקומית: קבצים, Git, CLI ו-deploy.",
    tags: ["clasp"]
  },
  {
    id: 5,
    title: "שאלה 5: Playwright",
    promptHe: "מתי כדאי להריץ Playwright ב-headed mode?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כאשר רוצים לראות את הדפדפן בדמו או debugging" },
      { key: "B", text: "רק ב-CI" },
      { key: "C", text: "כאשר אין בכלל UI" },
      { key: "D", text: "כדי למחוק tests ישנים" }
    ],
    correctKey: "A",
    explanationHe: "headed mode פותח חלון דפדפן ולכן מתאים לדמו, debugging והוראה. CI בדרך כלל ירוץ headless.",
    tags: ["playwright"]
  }
];

window.QUIZ_LABELS = {
  title: "שאלון Agentic Engineering למורים",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה."
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script type="text/babel">
  window.renderQuestionnaire({
    mountId: "quiz-root",
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
