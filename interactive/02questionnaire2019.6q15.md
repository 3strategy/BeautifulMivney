---
layout: page
title: שאלון - בגרות 2019 קיץ שאלה 15
share-description: שאלון אינטראקטיבי על בגרות 2019 קיץ שאלה 15 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, overload, override, Equals, שאלון, אינטראקטיבי, bagrut, 2019, A, B, Driver]
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
השאלון הזה מבוסס על בגרות 2019 קיץ שאלה 15 ועל המחלקות `A`, `B`, `Driver`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בכל השאלות מניחים שכבר הופיעו ב-`Main` ההגדרות:

```csharp
A a1 = new A();
A a2 = new A(5);
A ab = new B();
B b1 = new B("B", 1);
B b2 = new B("B", 5);
```

השאלות מתמקדות במצב העצמים שנוצרו ובבחירת הפעולה המתאימה בין
`Equals(Object)`, `Equals(A)`, `Equals(B)`.

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
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2019.6.381/q15.pdf"
  type="application/pdf"
  aria-label="בגרות 2019 קיץ שאלה 15">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2019.6.381/q15.pdf" target="_blank" rel="noopener">q15.pdf</a>.
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
    title: "שאלה 1: מצב העצמים שנוצרו",
    promptHe: "איזו אמירה נכונה לגבי ערכי התכונות של העצמים אחרי חמש ההוראות שב-`Main`?",
    codeLang: "csharp",
    code: `A a1 = new A();
A a2 = new A(5);
A ab = new B();
B b1 = new B("B", 1);
B b2 = new B("B", 5);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`a1.val = 1`, `a2.val = 5`, `ab` הוא בפועל `B` עם `val = 1` ו-`st = \"B\"`, `b1` הוא `(\"B\",1)`, `b2` הוא `(\"B\",5)`" },
      { key: "B", text: "`ab` הוא אובייקט `A` רגיל כי הוא הוגדר כ-`A`, ולכן אין לו `st`" },
      { key: "C", text: "`b1` ו-`b2` שניהם מקבלים `val = 1`, כי `B` תמיד מפעילה את הבנאי הריק של `A`" },
      { key: "D", text: "`a2.val = 1`, כי `A(5)` לא שומרת את הפרמטר" },
    ],
    correctKey: "A",
    explanationHe: "`A()` קובעת `val = 1`, `A(5)` קובעת `val = 5`. האובייקט של `ab` נוצר בפועל כ-`new B()`, ולכן יש לו גם `val = 1` וגם `st = \"B\"`, למרות שהמשתנה עצמו מוכרז כ-`A`.",
    tags: ["objects", "constructors", "A/B"],
  },
  {
    id: 2,
    title: "שאלה 2: בחירת הפעולה המתאימה",
    promptHe: "איזו אמירה נכונה לגבי בחירת פעולת `Equals`?",
    codeLang: "csharp",
    code: `b1.Equals(a1);
ab.Equals(b1);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`b1.Equals(a1)` בוחרת ב-`Equals(A)`, ואילו `ab.Equals(b1)` מתקמפלת מול `Equals(Object)` ורצה בפועל ב-`B.Equals(Object)`" },
      { key: "B", text: "בשתי הקריאות נבחרת `Equals(B)` כי יש משתנה מטיפוס `B` בקוד" },
      { key: "C", text: "בשתי הקריאות נבחרת `A.Equals(Object)` כי `Equals` מוגדרת במקור ב-`A`" },
      { key: "D", text: "`ab.Equals(b1)` אינה מתקמפלת, כי `ab` הוא `A` ולא `B`" },
    ],
    correctKey: "A",
    explanationHe: "בקריאה דרך `b1` המהדר רואה את כל ה-overload-ים של `B`, והארגומנט `a1` הוא מטיפוס מוצהר `A`, לכן נבחרת `Equals(A)`. בקריאה דרך `ab` המהדר רואה רק מה שקיים ב-`A`, כלומר `Equals(Object)`, אבל בזמן ריצה יש דריסה ולכן מופעלת `B.Equals(Object)`.",
    tags: ["overload", "override", "declared-type"],
  },
  {
    id: 3,
    title: "שאלה 3: הוראה 1",
    promptHe: "מה יהיה הפלט אם נציב ב-`//***//` את ההוראה הבאה?",
    codeLang: "csharp",
    code: `if (a1.Equals(b1)) Console.WriteLine(1);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `AObject`" },
      { key: "B", text: "יודפסו `AObject` ואז `1`" },
      { key: "C", text: "יודפסו `BObject` ואז `1`" },
      { key: "D", text: "יודפס רק `1`" },
    ],
    correctKey: "B",
    explanationHe: "המשתנה `a1` הוא מטיפוס `A`, ולכן נקראת `A.Equals(Object)`, שמדפיסה `AObject`. הארגומנט `b1` הוא אובייקט `B`, ולכן גם `A`, וערכי `val` של שניהם הם 1. לכן התנאי אמת ומודפס גם `1`.",
    tags: ["output", "AObject", "instruction-1"],
  },
  {
    id: 4,
    title: "שאלה 4: הוראה 2",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (b1.Equals(a1)) Console.WriteLine(2);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `BA`" },
      { key: "B", text: "יודפסו `BA` ואז `2`" },
      { key: "C", text: "יודפס רק `BObject`" },
      { key: "D", text: "יודפסו `BB` ואז `2`" },
    ],
    correctKey: "A",
    explanationHe: "בגלל שהמקבל הוא `b1` מטיפוס `B` והארגומנט `a1` מטיפוס מוצהר `A`, נבחר ה-overload `Equals(A)`, שמדפיס `BA`. בתוך הפעולה בודקים `other is B`, אבל `a1` הוא אובייקט `A`, ולכן מוחזר `false` ולא מודפס `2`.",
    tags: ["output", "BA", "instruction-2"],
  },
  {
    id: 5,
    title: "שאלה 5: הוראה 3",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (a1.Equals(ab)) Console.WriteLine(3);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `AObject`" },
      { key: "B", text: "יודפסו `AObject` ואז `3`" },
      { key: "C", text: "יודפסו `BObject` ואז `3`" },
      { key: "D", text: "יודפסו `BA` ואז `3`" },
    ],
    correctKey: "B",
    explanationHe: "`a1` הוא `A`, לכן נקראת `A.Equals(Object)` ומודפס `AObject`. הארגומנט `ab` מצביע בפועל ל-`B`, ולכן גם ל-`A`, וההשוואה נעשית רק על `val`: בשניהם הערך 1. לכן מודפס גם `3`.",
    tags: ["output", "AObject", "instruction-3"],
  },
  {
    id: 6,
    title: "שאלה 6: הוראה 4",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (ab.Equals(a1)) Console.WriteLine(4);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `AObject`" },
      { key: "B", text: "יודפסו `BObject` ואז `4`" },
      { key: "C", text: "יודפס רק `BObject`" },
      { key: "D", text: "יודפסו `BA` ואז `4`" },
    ],
    correctKey: "C",
    explanationHe: "בקומפילציה `ab` הוא מטיפוס `A`, ולכן הקריאה היא ל-`Equals(Object)`. אבל מכיוון שזו פעולה `virtual` והאובייקט בפועל הוא `B`, בזמן ריצה מופעלת `B.Equals(Object)`, שמדפיסה `BObject`. שם בודקים אם `other` הוא `B`, אבל `a1` הוא `A`, ולכן מוחזר `false`.",
    tags: ["output", "BObject", "instruction-4"],
  },
  {
    id: 7,
    title: "שאלה 7: הוראה 5",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (b1.Equals(ab)) Console.WriteLine(5);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `BA`" },
      { key: "B", text: "יודפסו `BA` ואז `5`" },
      { key: "C", text: "יודפסו `BObject` ואז `5`" },
      { key: "D", text: "יודפסו `BB` ואז `5`" },
    ],
    correctKey: "B",
    explanationHe: "הארגומנט `ab` הוא מטיפוס מוצהר `A`, לכן ב-`B` נבחרת `Equals(A)` ולא `Equals(B)`. הפעולה מדפיסה `BA`, ובזמן ריצה `ab` הוא אובייקט `B` עם `st = \"B\"` ו-`val = 1`, כמו `b1`, ולכן התנאי אמת ומודפס גם `5`.",
    tags: ["output", "BA", "instruction-5"],
  },
  {
    id: 8,
    title: "שאלה 8: הוראה 6",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (ab.Equals(b1)) Console.WriteLine(6);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפסו `BObject` ואז `6`" },
      { key: "B", text: "יודפס רק `BObject`" },
      { key: "C", text: "יודפסו `BA` ואז `6`" },
      { key: "D", text: "יודפסו `BB` ואז `6`" },
    ],
    correctKey: "A",
    explanationHe: "שוב הקריאה מתקמפלת מול `A.Equals(Object)`, אבל בזמן ריצה המקבל הוא `B`, ולכן מופעלת `B.Equals(Object)` שמדפיסה `BObject`. הפעם `other` הוא `b1`, כלומר אובייקט `B`, וערכי `st` ו-`val` תואמים, ולכן מוחזר `true` ומודפס גם `6`.",
    tags: ["output", "BObject", "instruction-6"],
  },
  {
    id: 9,
    title: "שאלה 9: הוראה 7",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (a1.Equals(a2)) Console.WriteLine(7);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `AObject`" },
      { key: "B", text: "יודפסו `AObject` ואז `7`" },
      { key: "C", text: "יודפס רק `7`" },
      { key: "D", text: "יודפסו `BA` ואז `7`" },
    ],
    correctKey: "A",
    explanationHe: "`a1` ו-`a2` הם שני אובייקטים מטיפוס `A`, לכן מופעלת `A.Equals(Object)` שמדפיסה `AObject`. אחר כך משווים בין `val = 1` לבין `val = 5`, ולכן מתקבל `false` ולא מודפס `7`.",
    tags: ["output", "AObject", "instruction-7"],
  },
  {
    id: 10,
    title: "שאלה 10: הוראה 8",
    promptHe: "מה יהיה הפלט כאן?",
    codeLang: "csharp",
    code: `if (b1.Equals(b2)) Console.WriteLine(8);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס רק `BObject`" },
      { key: "B", text: "יודפס רק `BB`" },
      { key: "C", text: "יודפסו `BB` ואז `8`" },
      { key: "D", text: "יודפסו `BA` ואז `8`" },
    ],
    correctKey: "B",
    explanationHe: "כאן גם המקבל וגם הארגומנט הם מטיפוס מוצהר `B`, ולכן נבחרת הפעולה המדויקת `Equals(B)`, שמדפיסה `BB`. היא משווה את `st` וגם את `val`; המחרוזות שוות אבל הערכים 1 ו-5 שונים, לכן מוחזר `false` ולא מודפס `8`.",
    tags: ["output", "BB", "instruction-8"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2019-6/15 - A / B / Driver",
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
