---
layout: page
title: שאלון - בגרות 2020 קיץ שאלה 15
share-description: שאלון אינטראקטיבי על בגרות 2020 קיץ שאלה 15 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, ירושה, constructors, Foo, Bar, GetType, שאלון, אינטראקטיבי, bagrut, 2020, A, B, C, D, E]
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
השאלון הזה מבוסס על בגרות 2020 קיץ שאלה 15 ועל המחלקות
`A / B / C / D / E`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בשאלות 1-2 מתמקדים בהייררכיה ובדריסות.

בשאלות 3-6 מתמקדים במימוש `GetType(Object m)` תחת המגבלות של השאלה:
בלי `is`, בלי `as`, ובלי שימוש בפעולות של `Object`.

בשאלות 7-10 מתמקדים במעקב אחרי הבנאים והפלט של `Tester.Main`.

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
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2020.6.381/q15.pdf"
  type="application/pdf"
  aria-label="בגרות 2020 קיץ שאלה 15">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2020.6.381/q15.pdf" target="_blank" rel="noopener">q15.pdf</a>.
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
    title: "שאלה 1: מפת ההייררכיה",
    promptHe: "איזו הייררכיית ירושה מתאימה למחלקות `A`, `B`, `C`, `D`, `E`?",
    codeLang: "csharp",
    code: `A, B, C, D, E`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`B` יורשת מ-`A`, `C` יורשת מ-`B`, ו-`D` וגם `E` יורשות מ-`C`" },
      { key: "B", text: "`A` יורשת מ-`B`, `C` יורשת מ-`A`, ו-`D` יורשת מ-`E`" },
      { key: "C", text: "`B`, `C`, `D`, `E` כולן יורשות ישירות מ-`A`" },
      { key: "D", text: "`D` יורשת מ-`B`, `E` יורשת מ-`A`, ו-`C` לא קשורה" },
    ],
    correctKey: "A",
    explanationHe: "מהקוד רואים `B : A`, אחר כך `C : B`, ובסוף גם `D : C` וגם `E : C`. כלומר יש שרשרת `A -> B -> C` ואז הסתעפות ל-`D` ול-`E`.",
    tags: ["hierarchy", "inheritance", "A-B-C-D-E"],
  },
  {
    id: 2,
    title: "שאלה 2: מי דורס מה?",
    promptHe: "איזו אמירה נכונה לגבי `Foo` ו-`Bar`?",
    codeLang: "csharp",
    code: `Foo(), Bar()`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Foo` נדרסת ב-`B`, `C`, `D`; `Bar` מוגדרת כ-`virtual` ב-`C` ונדרסת ב-`E`" },
      { key: "B", text: "`Foo` נדרסת רק ב-`D`; `Bar` נדרסת ב-`B` וב-`C`" },
      { key: "C", text: "`Foo` לא נדרסת בכלל; `Bar` קיימת רק ב-`D`" },
      { key: "D", text: "`Foo` נדרסת ב-`E`; `Bar` קיימת רק ב-`A`" },
    ],
    correctKey: "A",
    explanationHe: "ב-`A` מוגדרת `Foo()` כ-`virtual`. אחר כך `B`, `C` ו-`D` עושות לה `override`. `Bar()` מוגדרת לראשונה ב-`C` כ-`virtual`, ורק `E` עושה לה `override`.",
    tags: ["override", "virtual", "methods"],
  },
  {
    id: 3,
    title: "שאלה 3: פתיחה חוקית ל-`GetType`",
    promptHe: "הפעולה מקבלת `Object m`, וידוע ש-`m` שייך לאחת המחלקות `A/B/C/D/E` ואינו `null`. איזו פתיחה גם חוקית וגם מתאימה למגבלות השאלה?",
    codeLang: "csharp",
    code: `public static int GetType(Object m)
{
    ...
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`A a = (A)m;`" },
      { key: "B", text: "`B b = (B)m;`" },
      { key: "C", text: "`if (m is D) return 4;`" },
      { key: "D", text: "`if (m.GetType() == typeof(E)) return 5;`" },
    ],
    correctKey: "A",
    explanationHe: "כל האובייקטים האפשריים הם מטיפוס `A` או מחלקה שיורשת ממנה, לכן ההמרה ל-`A` בטוחה. לעומת זאת `B` לא בטוחה עבור אובייקט `A`, ו-`is`/`GetType()` אסורים לפי השאלה.",
    tags: ["GetType", "casting", "restrictions"],
  },
  {
    id: 4,
    title: "שאלה 4: איך מזהים `B`?",
    promptHe: "נניח שכבר כתבנו `A a = (A)m;`. אם מתקיים `a.Foo() == a.GetX() + 1`, איזה טיפוס זה מזהה?",
    codeLang: "csharp",
    code: `A a = (A)m;
// if (a.Foo() == a.GetX() + 1) ...`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`A`" },
      { key: "B", text: "`B`" },
      { key: "C", text: "`D`" },
      { key: "D", text: "`E`" },
    ],
    correctKey: "B",
    explanationHe: "ב-`B` הפעולה `Foo()` מחזירה בדיוק `x + 1`, כלומר `GetX() + 1`. בשאר המחלקות היחס שונה.",
    tags: ["GetType", "B", "Foo-vs-GetX"],
  },
  {
    id: 5,
    title: "שאלה 5: איך מזהים `D`?",
    promptHe: "איזו בדיקה מזהה באופן ייחודי אובייקט מטיפוס `D`, בלי `is` ובלי `as`?",
    codeLang: "csharp",
    code: `A a = (A)m;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`a.Foo() == a.GetX()`" },
      { key: "B", text: "`a.Foo() == a.GetX() + 1`" },
      { key: "C", text: "`a.Foo() == a.GetX() - 1`" },
      { key: "D", text: "`a.Foo() == a.GetX() + 2`" },
    ],
    correctKey: "C",
    explanationHe: "ב-`D` הפעולה `Foo()` נדרסת כך שהיא מחזירה `x - 1`. לכן ההשוואה ל-`GetX() - 1` מזהה בדיוק את `D`.",
    tags: ["GetType", "D", "Foo-vs-GetX"],
  },
  {
    id: 6,
    title: "שאלה 6: איך מבדילים בין `C` ל-`E`?",
    promptHe: "נניח שכבר שללנו את `A`, `B`, `D`, ועכשיו מותר לנו לעשות `C c = (C)m;`. איזו אמירה נכונה?",
    codeLang: "csharp",
    code: `C c = (C)m;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "אם `c.Bar() == c.GetX()` זה `C`, אחרת זה `E`" },
      { key: "B", text: "אם `c.Bar() == c.GetX() + 2` זה `C`, אחרת זה `E`" },
      { key: "C", text: "אי אפשר להבדיל בין `C` ל-`E` בלי `is`" },
      { key: "D", text: "אם `c.Foo() == c.Bar()` זה תמיד `E`" },
    ],
    correctKey: "A",
    explanationHe: "ב-`C` הפעולה `Bar()` מחזירה את `x`, כלומר את `GetX()`. ב-`E` הפעולה `Bar()` נדרסת ומחזירה `x + 1`. לכן זו בדיוק הבדיקה שמבדילה ביניהן.",
    tags: ["GetType", "C-vs-E", "Bar"],
  },
  {
    id: 7,
    title: "שאלה 7: יצירת `E`",
    promptHe: "מה יודפס עבור הקטע הבא?",
    codeLang: "csharp",
    code: `A a2 = new E();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `A. x = 9`" },
      { key: "B", text: "יודפסו `A. x = 9` ואז `D. x = 10`" },
      { key: "C", text: "יודפסו `A. x = 9` ואז `E. x = 10`" },
      { key: "D", text: "תתקבל שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "`E()` קוראת ל-`base()`, כלומר לשרשרת הבנאים עד `A()`. רק `A()` מדפיסה משהו, ול-`E` עצמה אין קוד הדפסה בבנאי.",
    tags: ["constructors", "E", "output"],
  },
  {
    id: 8,
    title: "שאלה 8: יצירת `D()`",
    promptHe: "מה יודפס עבור הקטע הבא?",
    codeLang: "csharp",
    code: `A a3 = new D();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `A. x = 9` ואז `D. x = 9`" },
      { key: "B", text: "יודפסו `A. x = 9` ואז `D. x = 10`" },
      { key: "C", text: "יודפסו `A. x = 10` ואז `D. x = 10`" },
      { key: "D", text: "יודפס רק `D. x = 10`" },
    ],
    correctKey: "B",
    explanationHe: "הבנאי `D()` מתחיל ב-`base()`, ובסופו של דבר `A()` קובע `x = 9` ומדפיס זאת. אחר כך גוף הבנאי של `D()` מגדיל את `x` ב-1 ומדפיס `D. x = 10`.",
    tags: ["constructors", "D", "default-ctor"],
  },
  {
    id: 9,
    title: "שאלה 9: יצירת `D(3, 7)`",
    promptHe: "מה יודפס עבור הקטע הבא?",
    codeLang: "csharp",
    code: `A a5 = new D(3, 7);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `A. x = 9` ואז `D. x = 19`" },
      { key: "B", text: "יודפסו `A. x = 10` ואז `D. x = 19`" },
      { key: "C", text: "יודפסו `A. x = 3` ואז `D. x = 10`" },
      { key: "D", text: "יודפסו `A. x = 9` ואז `D. x = 10`" },
    ],
    correctKey: "A",
    explanationHe: "הבנאי `D(int x, int y)` מתחיל ב-`base()`, ולכן `A()` קובע `x = 9`. אחר כך בגוף הבנאי מתבצע `this.x = this.x + x + y`, כלומר `9 + 3 + 7 = 19`, ולכן מודפס `D. x = 19`.",
    tags: ["constructors", "D", "two-params"],
  },
  {
    id: 10,
    title: "שאלה 10: הפלט המלא של `Tester.Main`",
    promptHe: "איזו אפשרות מתארת נכון את סדר כל שורות הפלט של `Main`?",
    codeLang: "csharp",
    code: `A a1 = new B();
A a2 = new E();
A a3 = new D();
A a4 = new D(5);
A a5 = new D(3, 7);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`A. x = 9`; `A. x = 9`; `A. x = 9`; `D. x = 10`; `A. x = 5`; `D. x = 5`; `A. x = 9`; `D. x = 19`" },
      { key: "B", text: "`A. x = 9`; `A. x = 9`; `D. x = 10`; `A. x = 9`; `A. x = 5`; `D. x = 6`; `A. x = 9`; `D. x = 19`" },
      { key: "C", text: "`A. x = 9`; `A. x = 9`; `A. x = 10`; `D. x = 10`; `A. x = 5`; `D. x = 5`; `A. x = 9`; `D. x = 20`" },
      { key: "D", text: "`A. x = 9`; `A. x = 9`; `A. x = 9`; `D. x = 10`; `A. x = 9`; `D. x = 5`; `A. x = 9`; `D. x = 19`" },
    ],
    correctKey: "A",
    explanationHe: "עבור `new B()` ו-`new E()` מודפס רק הבנאי של `A`. עבור `new D()` מודפסות שתי שורות: `A. x = 9` ואז `D. x = 10`. עבור `new D(5)` מופעלות שרשרת הבנאים עם `base(5)`, ולכן מתקבלות `A. x = 5` ואז `D. x = 5`. לבסוף `new D(3, 7)` נותנת `A. x = 9` ואז `D. x = 19`.",
    tags: ["Tester", "full-output", "constructors"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2020-6/15 - A / B / C / D / E",
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
