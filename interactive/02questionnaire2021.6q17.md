---
layout: page
title: שאלון - בגרות 2021 קיץ שאלה 17
share-description: שאלון אינטראקטיבי על בגרות 2021 קיץ שאלה 17 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, overload, override, casting, base, שאלון, אינטראקטיבי, bagrut, 2021, A, B, Tester]
mathjax: true
lang: he
---

<!-- interactive -->

<style>
#quiz-root .quiz-answers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

#quiz-root .quiz-answer-btn {
    align-items: stretch;
    justify-content: flex-start;
}

#quiz-root .quiz-answer-letter {
    align-self: center;
}

#quiz-root .quiz-answer-text {
    text-align: right;
}

@media (max-width: 560px) {
    #quiz-root .quiz-answers-grid {
        grid-template-columns: 1fr;
    }
}
</style>

{: .box-note}
השאלון הזה מבוסס על בגרות 2021 קיץ שאלה 17 ועל המחלקות `A`, `B`, `Tester`.
בבחינה המקורית בוחרים 10 מתוך 15 קטעי קוד, אבל כאן יש תרגול על כל 15 הקטעים.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בכל השאלות מניחים שהמחלקות הנתונות הן בדיוק אלה שמופיעות ב-PDF:
`A` עם `Foo(int)`, `Foo(double)`, `Bar(int)`,
ו-`B` עם `override Foo(int)`, עם `Bar()`, ועם `Another(int)`.

<div id="quiz-header-root"></div>
<div id="quiz-root"></div>

<!-- In the site's RTL layout, the first column renders on the right and the second on the left. -->
<div class="two-columns questionnaire-source-layout">
  <div markdown="1" class="column">
<div id="quiz-main-root"></div>
  </div>

  <div markdown="1" class="column">

<object
  class="questionnaire-source-viewer"
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2021.6.381/q17.pdf"
  type="application/pdf"
  aria-label="בגרות 2021 קיץ שאלה 17">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2021.6.381/q17.pdf" target="_blank" rel="noopener">q17.pdf</a>.
  </p>
</object>

  </div>
</div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: קטע 1",
    promptHe: "מה יקרה אם נציב ב-`Tester.Main` את הקטע הבא?",
    codeLang: "csharp",
    code: `A a = new A();
a.Foo(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A` ואז `A Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A` ואז `B Foo int 2`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "A",
    explanationHe: "נוצר אובייקט מטיפוס `A`, ולכן הבנאי של `A` מדפיס `ctor A`. הקריאה `Foo(2)` בוחרת ב-`Foo(int)`, ולכן יודפס `A Foo int 2`.",
    tags: ["A", "Foo", "valid"],
  },
  {
    id: 2,
    title: "שאלה 2: קטע 2",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
((B)a).Foo(3);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A` ואז `B Foo int 3`" },
      { key: "B", text: "יודפסו `ctor A` ואז `A Foo int 3`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה אחרי `ctor A`, כי האובייקט אינו `B`" },
    ],
    correctKey: "D",
    explanationHe: "ההמרה המפורשת מ-`A` ל-`B` מתקמפלת, אבל בזמן ריצה `a` מפנה לאובייקט שנוצר כ-`new A()`. לכן ה-cast נכשל ומתקבלת `InvalidCastException` אחרי שהודפס `ctor A`.",
    tags: ["casting", "runtime-error", "A-to-B"],
  },
  {
    id: 3,
    title: "שאלה 3: קטע 3",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
B b = a;
b.Foo(2);`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A` ואז `B Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A` ואז `A Foo int 2`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה, כי אי אפשר להמיר `A` ל-`B` בלי cast" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "ההשמה `B b = a;` אינה חוקית, כי `a` הוא מטיפוס מוצהר `A` ואין המרה אוטומטית מ-`A` ל-`B`. לכן הקוד כלל לא מתקמפל.",
    tags: ["compile-error", "assignment", "declared-type"],
  },
  {
    id: 4,
    title: "שאלה 4: קטע 4",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A x = new B();
x.Foo(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, ואז `A Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, ואז `B Foo int 2`" },
      { key: "C", text: "יודפסו `ctor B`, `ctor A`, ואז `B Foo int 2`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "ביצירת `new B()` קודם מופעל הבנאי של `A` ואז של `B`. הקריאה `Foo(2)` היא לפעולה `virtual`, ולכן למרות שהמשתנה `x` הוא מטיפוס `A`, בזמן ריצה נבחרת הגרסה של `B`.",
    tags: ["override", "runtime-type", "constructors"],
  },
  {
    id: 5,
    title: "שאלה 5: קטע 5",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A x = new B();
x.Bar();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, ואז `B Bar`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, ואז `A Bar 0`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה, כי `A` לא מכירה `Bar()` בלי פרמטר" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "בחירת הפעולה נעשית בקומפילציה לפי הטיפוס המוצהר של המקבל. ל-`A` יש רק `Bar(int)` ואין לה `Bar()`, ולכן הקריאה `x.Bar()` אינה חוקית.",
    tags: ["compile-error", "declared-type", "Bar"],
  },
  {
    id: 6,
    title: "שאלה 6: קטע 6",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
a.Bar(3);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `A Bar 3`, `A Foo int 3`" },
      { key: "B", text: "יודפסו `ctor A`, `A Bar 3`, `B Foo int 3`" },
      { key: "C", text: "יודפסו `ctor A`, `A Foo int 3`, `A Bar 3`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "בתוך `A.Bar(int)` מודפס קודם `A Bar 3`, ואז נקראת `Foo(3)`. מכיוון שהאובייקט הוא `A`, גם הקריאה הווירטואלית נשארת ב-`A.Foo(int)`.",
    tags: ["Bar", "virtual", "A"],
  },
  {
    id: 7,
    title: "שאלה 7: קטע 7",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
a.Bar();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A` ואז `A Bar 0`" },
      { key: "B", text: "יודפסו `ctor A` ואז `B Bar`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה, כי ל-`A` אין `Bar()`" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "למחלקה `A` אין overload בשם `Bar()` בלי פרמטר. קיימת רק הפעולה `Bar(int)`, ולכן זו שגיאת קומפילציה.",
    tags: ["compile-error", "overload", "A"],
  },
  {
    id: 8,
    title: "שאלה 8: קטע 8",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B b = new B();
b.Bar();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, `B Bar`, `B Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, `B Bar`, `A Foo int 2`" },
      { key: "C", text: "יודפסו `ctor B`, `ctor A`, `B Bar`, `B Foo int 2`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "ב-`new B()` מודפסים קודם `ctor A` ואז `ctor B`. הפעולה `B.Bar()` מדפיסה `B Bar` ואז קוראת `Foo(2)`. עבור ארגומנט מסוג `int` נבחרת הגרסה `Foo(int)`, ובזמן ריצה היא זו של `B`.",
    tags: ["B", "Bar", "override"],
  },
  {
    id: 9,
    title: "שאלה 9: קטע 9",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B b = new B();
b.Bar(3);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, `A Bar 3`, `B Foo int 3`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, `B Bar`, `B Foo int 3`" },
      { key: "C", text: "יודפסו `ctor A`, `ctor B`, `A Bar 3`, `A Foo int 3`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה, כי `B` מכירה רק `Bar()`" },
    ],
    correctKey: "A",
    explanationHe: "`B` יורשת מ-`A`, ולכן היא יורשת גם את `Bar(int)`. בתוך `A.Bar(int)` מודפס `A Bar 3`, ואז הקריאה הווירטואלית `Foo(3)` מגיעה בזמן ריצה אל `B.Foo(int)`.",
    tags: ["inheritance", "Bar(int)", "override"],
  },
  {
    id: 10,
    title: "שאלה 10: קטע 10",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B b = new B();
b.Foo(2);
b.Foo(2.0);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, `B Foo int 2`, `A Foo double 2`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, `B Foo int 2`, `B Foo double 2`" },
      { key: "C", text: "יודפסו `ctor A`, `ctor B`, `A Foo int 2`, `A Foo double 2`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה בגלל עמימות בין overload-ים" },
    ],
    correctKey: "A",
    explanationHe: "הקריאה `b.Foo(2)` בוחרת ב-`Foo(int)` ומגיעה לדריסה של `B`. הקריאה `b.Foo(2.0)` בוחרת ב-`Foo(double)`, שמוגדרת ב-`A` ולא נדרסת ב-`B`, ולכן יודפס `A Foo double 2`.",
    tags: ["overload", "override", "double"],
  },
  {
    id: 11,
    title: "שאלה 11: קטע 11",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
a.Foo(2);
a.Foo(2.0);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `A Foo int 2`, `A Foo double 2`" },
      { key: "B", text: "יודפסו `ctor A`, `A Foo int 2`, `B Foo int 2`" },
      { key: "C", text: "יודפסו `ctor A`, `A Foo double 2`, `A Foo int 2`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "ל-`A` יש שתי פעולות שונות: `Foo(int)` ו-`Foo(double)`. לכן הקריאה הראשונה מפעילה את גרסת ה-`int`, והשנייה את גרסת ה-`double`.",
    tags: ["A", "overload", "valid"],
  },
  {
    id: 12,
    title: "שאלה 12: קטע 12",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B b = new A();
b.Another(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A` ואז `B Another 2`" },
      { key: "B", text: "תתקבל שגיאת קומפילציה, כי אי אפשר להמיר `A` ל-`B`" },
      { key: "C", text: "תתקבל שגיאת זמן ריצה" },
      { key: "D", text: "יודפסו `ctor A` ואז `A Foo int 2`" },
    ],
    correctKey: "B",
    explanationHe: "ההשמה `B b = new A();` אינה חוקית בקומפילציה. `A` היא מחלקת אב, ולא כל אובייקט `A` הוא גם `B`.",
    tags: ["compile-error", "assignment", "A-to-B"],
  },
  {
    id: 13,
    title: "שאלה 13: קטע 13",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A a = new A();
a.Another(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `B Another 2`, `A Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A` ואז `A Foo int 2`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה, כי `A` לא מכירה `Another`" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "למחלקה `A` אין פעולה בשם `Another`. לכן הקריאה `a.Another(2)` אינה חוקית כבר בזמן הקומפילציה.",
    tags: ["compile-error", "methods", "A"],
  },
  {
    id: 14,
    title: "שאלה 14: קטע 14",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B x = new B();
x.Another(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, `B Another 2`, `A Foo int 2`, `A Foo double 4`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, `B Another 2`, `B Foo int 2`, `B Foo int 4`" },
      { key: "C", text: "יודפסו `ctor A`, `ctor B`, `B Another 2`, `B Foo int 2`, `A Foo double 4`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "הפעולה `Another(int)` מדפיסה קודם `B Another 2`. אחר כך `base.Foo(x)` מפעילה במפורש את הגרסה של `A`, ולכן מתקבל `A Foo int 2`. לבסוף `Foo(2.0 * x)` שולחת ארגומנט `double`, ולכן נבחרת `A.Foo(double)` ומודפס `A Foo double 4`.",
    tags: ["base", "double", "Another"],
  },
  {
    id: 15,
    title: "שאלה 15: קטע 15",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A x = new B();
x.Another(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `ctor A`, `ctor B`, `B Another 2` ואז `A Foo int 2`" },
      { key: "B", text: "יודפסו `ctor A`, `ctor B`, `A Foo int 2`" },
      { key: "C", text: "תתקבל שגיאת קומפילציה, כי `A` לא מכירה `Another`" },
      { key: "D", text: "תתקבל שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "למרות שבפועל נוצר אובייקט `B`, הטיפוס המוצהר של `x` הוא `A`. בזמן קומפילציה בודקים רק את מה ש-`A` מכירה, וב-`A` אין פעולה בשם `Another`.",
    tags: ["declared-type", "compile-error", "Another"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2021-6/17 - A / B / Tester",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה.",
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script type="text/babel">
  window.renderQuestionnaire({
    mountId: "quiz-root",
    headerMountId: "quiz-header-root",
    mainMountId: "quiz-main-root",
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
