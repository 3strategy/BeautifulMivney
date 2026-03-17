---
layout: page
title: שאלון - בגרות 2021 שאלה 17
share-description: שאלון אינטראקטיבי על בגרות 2021 שאלה 17 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, פעולות בונות, שאלון, אינטראקטיבי, bagrut, 2021, overload, override, constructors]
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
השאלון הזה מבוסס על בגרות 2021 שאלה 17, שיש בה שני סעיפים בלי קשר ביניהם:
`C / D` וגם `AA / BB`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בשאלות 1-3 מניחים שכבר הופיעו השורות:

```csharp
C cd = new D();
D dd = (D) cd;
```

בשאלות 4-7 מניחים שבנוסף נוספה למחלקה `C` גם הפעולה:

```csharp
public void Dolt(Object o) { Console.WriteLine("o"); }
```

בשאלות 8-10 מחליפים את `****` שב-`Run.Main` בשורת קוד אחת.

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
  data="https://יסודות.שלי.com/bagruyot/2021.5.381/q17.pdf"
  type="application/pdf"
  aria-label="בגרות 2021 שאלה 17">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://יסודות.שלי.com/bagruyot/2021.5.381/q17.pdf" target="_blank" rel="noopener">q17.pdf</a>.
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
    title: "שאלה 1: סעיף א(1), שורה 1",
    promptHe: "מה יקרה אם נציב במקום `****` את השורה הבאה?",
    codeLang: "csharp",
    code: `dd.Dolt(cd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "שגיאת קומפילציה, כי `cd` הוא `C` ולא `D`" },
      { key: "B", text: "יודפס `a`" },
      { key: "C", text: "יודפס `b`" },
      { key: "D", text: "יודפס `x`" },
    ],
    correctKey: "D",
    explanationHe: "המשתנה `dd` הוא מטיפוס מוצהר `D`, ולכן בודקים את ההעמסות של `D`. הארגומנט `cd` הוא מטיפוס `C`, ולכן ההתאמה המדויקת היא `Dolt(C)`, שמדפיסה `x`.",
    tags: ["overload", "compile-time", "C/D"],
  },
  {
    id: 2,
    title: "שאלה 2: סעיף א(1), שורה 2",
    promptHe: "מה יקרה אם נציב במקום `****` את השורה הבאה?",
    codeLang: "csharp",
    code: `cd.Dolt(dd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `a`" },
      { key: "B", text: "יודפס `b`" },
      { key: "C", text: "יודפס `x`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "דרך המשתנה `cd` רואים את `C.Dolt(D)`. זו פעולה `virtual`, ובזמן ריצה האובייקט הוא בעצם `D`, לכן מופעלת הגרסה הדרוסה `D.Dolt(D)` שמדפיסה `b`.",
    tags: ["override", "runtime-type", "C/D"],
  },
  {
    id: 3,
    title: "שאלה 3: סעיף א(1), שורה 3",
    promptHe: "מה יקרה אם נציב במקום `****` את השורה הבאה?",
    codeLang: "csharp",
    code: `cd.Dolt(cd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `a`" },
      { key: "B", text: "יודפס `x`" },
      { key: "C", text: "יודפס `b`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "D",
    explanationHe: "לפני הוספת `Dolt(Object)`, למחלקה `C` יש רק `Dolt(D)`. המשתנה `cd` מוכרז כ-`C`, ואין המרה אוטומטית מ-`C` ל-`D`, לכן הקריאה אינה מתקמפלת.",
    tags: ["compile-error", "declared-type", "C/D"],
  },
  {
    id: 4,
    title: "שאלה 4: סעיף א(2), שורה 1",
    promptHe: "עכשיו מניחים שגם נוספה למחלקה `C` הפעולה `Dolt(Object)`. מה יקרה כאן?",
    codeLang: "csharp",
    code: `dd.Dolt(cd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `o`" },
      { key: "B", text: "יודפס `a`" },
      { key: "C", text: "יודפס `x`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "C",
    explanationHe: "גם אחרי ההוספה, עבור `dd.Dolt(cd)` ההתאמה הטובה ביותר היא עדיין `Dolt(C)`, כי היא מדויקת יותר מ-`Dolt(Object)`. לכן הפלט נשאר `x`.",
    tags: ["overload", "best-match", "C/D"],
  },
  {
    id: 5,
    title: "שאלה 5: סעיף א(2), שורה 2",
    promptHe: "עכשיו מניחים שגם נוספה למחלקה `C` הפעולה `Dolt(Object)`. מה יקרה כאן?",
    codeLang: "csharp",
    code: `cd.Dolt(dd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `o`" },
      { key: "B", text: "יודפס `b`" },
      { key: "C", text: "יודפס `x`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "למשתנה `cd` יש עכשיו שתי פעולות נגישות: `Dolt(D)` ו-`Dolt(Object)`. עבור הארגומנט `dd` מטיפוס `D`, ההתאמה הטובה יותר היא `Dolt(D)`, ובזמן ריצה היא נדרסת על ידי `D`, לכן יודפס `b`.",
    tags: ["override", "overload", "C/D"],
  },
  {
    id: 6,
    title: "שאלה 6: סעיף א(2), שורה 3",
    promptHe: "עכשיו מניחים שגם נוספה למחלקה `C` הפעולה `Dolt(Object)`. מה יקרה כאן?",
    codeLang: "csharp",
    code: `cd.Dolt(cd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `o`" },
      { key: "B", text: "יודפס `a`" },
      { key: "C", text: "יודפס `x`" },
      { key: "D", text: "יודפס `b`" },
    ],
    correctKey: "A",
    explanationHe: "הקריאה הזו נהיית תקינה רק בזכות `Dolt(Object)`, כי `cd` מטיפוס `C` כן ניתן להמרה ל-`Object`. הפעולה הזו אינה `virtual`, ולכן יודפס בדיוק `o`.",
    tags: ["Object", "compile-time", "C/D"],
  },
  {
    id: 7,
    title: "שאלה 7: מה באמת השתנה אחרי `Dolt(Object)`?",
    promptHe: "איזו אמירה נכונה לגבי שלוש הקריאות של סעיף א אחרי שמוסיפים למחלקה `C` גם `Dolt(Object)`?",
    codeLang: "csharp",
    code: `dd.Dolt(cd);
cd.Dolt(dd);
cd.Dolt(cd);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רק `dd.Dolt(cd)` השתנתה, ועכשיו היא מדפיסה `o`" },
      { key: "B", text: "רק `cd.Dolt(dd)` השתנתה, ועכשיו היא מדפיסה `a`" },
      { key: "C", text: "רק `cd.Dolt(cd)` השתנתה: היא נהייתה תקינה ומדפיסה `o`" },
      { key: "D", text: "כל שלוש הקריאות עכשיו מגיעות ל-`Dolt(Object)`" },
    ],
    correctKey: "C",
    explanationHe: "שתי הקריאות הראשונות כבר היו תקינות קודם, וההתאמות המדויקות שלהן עדיין טובות יותר מ-`Object`. רק `cd.Dolt(cd)` הייתה קודם שגיאת קומפילציה, וכעת היא נהיית תקינה ומדפיסה `o`.",
    tags: ["summary", "overload", "C/D"],
  },
  {
    id: 8,
    title: "שאלה 8: סעיף ב, פלט 1",
    promptHe: "איזו שורת קוד יכולה להחליף את `****` כדי לקבל בדיוק את הפלט הבא?",
    codeLang: "text",
    code: `In AA
In BB`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`new AA();`" },
      { key: "B", text: "`new BB();`" },
      { key: "C", text: "`new BB(2.0);`" },
      { key: "D", text: "`new BB(2);`" },
    ],
    correctKey: "B",
    explanationHe: "בקריאה ל-`new BB()` אין `base(...)` מפורש, ולכן נקראת קודם הפעולה הבונה `AA()`, שמדפיסה `In AA`, ורק אחר כך `BB()` מדפיסה `In BB`.",
    tags: ["constructors", "AA/BB", "base()"],
  },
  {
    id: 9,
    title: "שאלה 9: סעיף ב, פלט 2",
    promptHe: "איזו שורת קוד יכולה להחליף את `****` כדי לקבל בדיוק את הפלט הבא?",
    codeLang: "text",
    code: `In AA
In BB7`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`new BB();`" },
      { key: "B", text: "`new BB(7);`" },
      { key: "C", text: "`new BB(7.9);`" },
      { key: "D", text: "`new AA(7);`" },
    ],
    correctKey: "C",
    explanationHe: "`BB(double)` לא מציינת `base(...)`, ולכן קודם נקראת `AA()`, ואז בתוך `BB(double)` מודפס `\"In BB\" + (int)k`. עבור `7.9` נקבל `In BB7`.",
    tags: ["constructors", "double", "AA/BB"],
  },
  {
    id: 10,
    title: "שאלה 10: סעיף ב, פלט 3",
    promptHe: "איזו שורת קוד יכולה להחליף את `****` כדי לקבל בדיוק את הפלט הבא?",
    codeLang: "text",
    code: `In AA
In AA
12
In BB
In BB`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`new BB(3);`" },
      { key: "B", text: "`new BB(6);`" },
      { key: "C", text: "`new BB(3.0);`" },
      { key: "D", text: "`new AA(6);`" },
    ],
    correctKey: "A",
    explanationHe: "ב-`new BB(3)` נקראת הפעולה הבונה `BB(int)`, ששולחת `base(k * 2)`, כלומר `base(6)`. לכן `AA()` מדפיסה `In AA`, אחריה `AA(int)` מדפיסה שוב `In AA` ואז `12`, ולבסוף הלולאה ב-`BB(int)` מדפיסה `In BB` פעמיים.",
    tags: ["constructors", "int", "AA/BB"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2021/17 - C / D + AA / BB",
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
