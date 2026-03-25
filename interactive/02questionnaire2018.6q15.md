---
layout: page
title: שאלון - בגרות 2018 קיץ שאלה 15
share-description: שאלון אינטראקטיבי על בגרות 2018 קיץ שאלה 15 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, ירושה, casting, compile-error, runtime-error, שאלון, אינטראקטיבי, bagrut, 2018, A, B, C, D, E, Z, Y]
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
השאלון הזה מבוסס על בגרות 2018 קיץ שאלה 15 ועל המחלקות
`A / B / C / D / E / Z / Y`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בשאלה 1 מתייחסים רק לנתונים של סעיף א.

בשאלות 2-6 מניחים שבסעיף ב הוספנו את `Z` כך שההוראה
`Z x = new A();`
תהיה תקינה.

בשאלות 7-11 מניחים שבסעיף ג, בלי קשר ל-`Z`, הוספנו את `Y` כך שההוראה
`C f = new Y();`
תהיה תקינה.

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
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2F2018.6.381%2Fq15.pdf"
  type="text/html"
  aria-label="בגרות 2018 קיץ שאלה 15">
  <p>
    אם התצוגה לא נטענת בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2F2018.6.381%2Fq15.pdf" target="_blank" rel="noopener">viewer2</a>
    או את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2018.6.381/q15.pdf" target="_blank" rel="noopener">q15.pdf</a>.
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
    title: "שאלה 1: עץ הירושה והמיקום של `F()`",
    promptHe: "איזה עץ ירושה ואילו שתי מחלקות מממשות את `F()` מתאימים לכל העובדות שבסעיף א?",
    codeLang: "csharp",
    code: `A a1 = new A();
A e1 = new E();
E c1 = new C();
C b1 = new B();
C d1 = new D();`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`A <- E <- C`, ומתחת ל-`C` נמצאות `B` ו-`D`; `F()` ממומשת ב-`E` וב-`B`" },
      { key: "B", text: "`A <- C <- E`, ומתחת ל-`E` נמצאות `B` ו-`D`; `F()` ממומשת ב-`A` וב-`D`" },
      { key: "C", text: "`A <- B <- C <- D <- E`; `F()` ממומשת ב-`C` וב-`D`" },
      { key: "D", text: "`A` בראש, וכל המחלקות האחרות יורשות ישירות ממנה; `F()` ממומשת ב-`B` וב-`D`" },
    ],
    correctKey: "A",
    explanationHe: "כדי ש-`E c1 = new C()` יהיה חוקי צריך ש-`C` תירש מ-`E`. כדי ש-`C b1 = new B()` וגם `C d1 = new D()` יהיו חוקיים, `B` ו-`D` צריכות לרשת מ-`C`. ההוראה `B d2 = new D()` אינה חוקית, לכן `D` אינה יורשת מ-`B`. בנוסף `a1.F()` אינה מתקמפלת, ולכן `A` לא מכירה `F()`. מצד שני `((E)e1).F()` חוקית ומדפיסה `bye-bye`, ו-`((B)b1).F()` חוקית ומדפיסה `hello`, לכן שתי המחלקות שמממשות את `F()` הן `E` ו-`B`.",
    tags: ["hierarchy", "F", "casting"],
  },
  {
    id: 2,
    title: "שאלה 2: איפה צריך להוסיף את `Z`?",
    promptHe: "כדי שההוראה `Z x = new A();` תהיה תקינה, היכן צריך למקם את `Z` בעץ הירושה של סעיף ב?",
    codeLang: "csharp",
    code: `Z x = new A();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Z` צריכה להיות מחלקת-על של `A`" },
      { key: "B", text: "`Z` צריכה להיות מחלקת-בן של `A`" },
      { key: "C", text: "`Z` צריכה להיות אחות של `A`" },
      { key: "D", text: "אי אפשר לגרום להוראה להיות תקינה בלי cast" },
    ],
    correctKey: "A",
    explanationHe: "ההשמה היא מהאובייקט `new A()` אל משתנה מטיפוס `Z`. כדי שהמרה כזו תהיה חוקית בלי cast, `A` חייבת לרשת מ-`Z`.",
    tags: ["Z", "inheritance", "assignment"],
  },
  {
    id: 3,
    title: "שאלה 3: סעיף ב, הוראות i-ii",
    promptHe: "בהנחה ש-`Z` היא מחלקת-על של `A`, איזו אמירה נכונה לגבי שתי ההוראות הבאות?",
    codeLang: "csharp",
    code: `A a2 = new A();
Z z1 = new Z();
Z a3 = new A();

i   a2 = z1;
ii  a3 = z1;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "שתיהן תקינות" },
      { key: "B", text: "רק i תקינה" },
      { key: "C", text: "רק ii תקינה" },
      { key: "D", text: "שתיהן אינן תקינות" },
    ],
    correctKey: "C",
    explanationHe: "הוראה i אינה תקינה, כי אי אפשר להשוות משתנה מטיפוס-על (`Z`) אל משתנה מטיפוס-בן (`A`) בלי cast. הוראה ii תקינה, כי `a3` ו-`z1` שניהם מטיפוס `Z`.",
    tags: ["section-b", "assignment", "compile-time"],
  },
  {
    id: 4,
    title: "שאלה 4: סעיף ב, הוראה iii",
    promptHe: "מה נכון לגבי ההוראה הבאה?",
    codeLang: "csharp",
    code: `((A)z1).G();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "היא אינה תקינה בקומפילציה, כי ל-`A` אין `G()`" },
      { key: "B", text: "היא תקינה ורצה בלי פלט" },
      { key: "C", text: "היא תקינה בקומפילציה, אבל גורמת לשגיאת זמן ריצה" },
      { key: "D", text: "היא מדפיסה `hello`" },
    ],
    correctKey: "C",
    explanationHe: "אם `Z` היא מחלקת-על של `A`, אז גם `A` יורשת את `G()`, ולכן הקריאה מתקמפלת. אבל `z1` נוצר כ-`new Z()`, לא כ-`A`, ולכן ה-cast ל-`A` נכשל בזמן ריצה.",
    tags: ["section-b", "cast", "runtime-error"],
  },
  {
    id: 5,
    title: "שאלה 5: סעיף ב, הוראות iv-v",
    promptHe: "איזו אמירה נכונה לגבי שתי ההוראות הבאות?",
    codeLang: "csharp",
    code: `iv  a2.G();
v   ((A)a3).G();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "שתיהן תקינות, ושתיהן לא מדפיסות דבר" },
      { key: "B", text: "רק iv תקינה" },
      { key: "C", text: "רק v תקינה" },
      { key: "D", text: "שתיהן גורמות לשגיאת זמן ריצה" },
    ],
    correctKey: "A",
    explanationHe: "`a2` הוא אובייקט `A`, ו-`A` יורשת את `G()` מ-`Z`, לכן iv תקינה. גם `a3` מצביע בפועל ל-`new A()`, ולכן ה-cast ב-v תקין בזמן ריצה והקריאה ל-`G()` גם שם חוקית. `G()` ריקה, ולכן אין פלט.",
    tags: ["section-b", "G", "no-output"],
  },
  {
    id: 6,
    title: "שאלה 6: למה `((A)z1).G()` שונה מ-`((A)a3).G()`?",
    promptHe: "מה ההסבר המדויק להבדל בין שתי ההוראות הבאות?",
    codeLang: "csharp",
    code: `((A)z1).G();
((A)a3).G();`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "בשתיהן ה-cast נכשל, אבל רק באחת אין פלט" },
      { key: "B", text: "בשתיהן ה-cast תקין, אבל `G()` קיימת רק פעם אחת" },
      { key: "C", text: "`z1` מצביע בפועל ל-`Z`, ולכן ה-cast נכשל; `a3` מצביע בפועל ל-`A`, ולכן ה-cast מצליח" },
      { key: "D", text: "`a3` הוא מטיפוס `Z`, ולכן אי אפשר בכלל לעשות לו cast" },
    ],
    correctKey: "C",
    explanationHe: "בשתי ההוראות המהדר מתיר את ה-cast, אבל תוצאתו תלויה בטיפוס האמיתי של האובייקט. `z1` נוצר כ-`new Z()`, ולכן אינו `A`. לעומת זאת `a3` נוצר כ-`new A()`, ולכן כן אפשר להמיר אותו חזרה ל-`A`.",
    tags: ["section-b", "runtime-type", "cast"],
  },
  {
    id: 7,
    title: "שאלה 7: איפה צריך להוסיף את `Y`?",
    promptHe: "בסעיף ג, בלי קשר ל-`Z`, היכן צריך למקם את `Y` כדי שההוראה `C f = new Y();` תהיה תקינה?",
    codeLang: "csharp",
    code: `C f = new Y();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Y` צריכה להיות מחלקת-על של `C`" },
      { key: "B", text: "`Y` צריכה להיות מחלקת-בן של `C`" },
      { key: "C", text: "`Y` צריכה להיות מחלקת-אחות של `C`" },
      { key: "D", text: "`Y` חייבת להיות מחלקת-על של `A`" },
    ],
    correctKey: "B",
    explanationHe: "כדי להציב `new Y()` במשתנה מטיפוס `C` בלי cast, `Y` חייבת לרשת מ-`C`.",
    tags: ["Y", "inheritance", "assignment"],
  },
  {
    id: 8,
    title: "שאלה 8: סעיף ג, הוראות i-ii",
    promptHe: "בהנחה ש-`Y` יורשת מ-`C`, איזו אמירה נכונה לגבי שתי ההוראות הבאות?",
    codeLang: "csharp",
    code: `A a2 = new A();
Y y1 = new Y();
C y2 = new Y();

i   a2 = y1;
ii  y2 = y1;`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "שתיהן תקינות" },
      { key: "B", text: "רק i תקינה" },
      { key: "C", text: "רק ii תקינה" },
      { key: "D", text: "שתיהן אינן תקינות" },
    ],
    correctKey: "A",
    explanationHe: "אם `Y` יורשת מ-`C`, ו-`C` יורשת מ-`E`, ו-`E` יורשת מ-`A`, אז `Y` היא גם `C` וגם `A`. לכן שתי ההשמות תקינות.",
    tags: ["section-c", "assignment", "upcast"],
  },
  {
    id: 9,
    title: "שאלה 9: סעיף ג, הוראה iii",
    promptHe: "מה נכון לגבי ההוראה הבאה?",
    codeLang: "csharp",
    code: `((A)y1).M();`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "היא תקינה ורצה בלי פלט" },
      { key: "B", text: "היא אינה תקינה בקומפילציה, כי אחרי ה-cast הביטוי הוא מטיפוס `A`, ול-`A` אין `M()`" },
      { key: "C", text: "היא גורמת לשגיאת זמן ריצה, כי אי אפשר להמיר `Y` ל-`A`" },
      { key: "D", text: "היא מדפיסה `bye-bye`" },
    ],
    correctKey: "B",
    explanationHe: "ה-cast ל-`A` חוקי, אבל אחריו הטיפוס של הביטוי הוא `A`. בחירת פעולות נעשית לפי הטיפוס המוצהר של הביטוי, ול-`A` אין `M()`, ולכן זו שגיאת קומפילציה.",
    tags: ["section-c", "methods", "compile-error"],
  },
  {
    id: 10,
    title: "שאלה 10: סעיף ג, הוראה iv",
    promptHe: "מה נכון לגבי ההוראה הבאה?",
    codeLang: "csharp",
    code: `y2.M();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "היא תקינה, כי בזמן ריצה `y2` מצביע ל-`Y`" },
      { key: "B", text: "היא אינה תקינה, כי `y2` הוא מטיפוס מוצהר `C`, ול-`C` אין `M()`" },
      { key: "C", text: "היא תקינה רק אם עושים cast ל-`Y` בזמן ריצה" },
      { key: "D", text: "היא גורמת לשגיאת זמן ריצה" },
    ],
    correctKey: "B",
    explanationHe: "גם כאן הקומפילציה מסתכלת על הטיפוס המוצהר של המקבל, שהוא `C`. העובדה שבפועל `y2` מצביע ל-`Y` לא מספיקה כדי לקרוא ל-`M()` בלי cast מתאים.",
    tags: ["section-c", "declared-type", "compile-error"],
  },
  {
    id: 11,
    title: "שאלה 11: סעיף ג, הוראה v",
    promptHe: "מה נכון לגבי ההוראה הבאה?",
    codeLang: "csharp",
    code: `((A)y2).M();`,
    answerColumns: 1,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "היא תקינה, כי `y2` מצביע ל-`Y`" },
      { key: "B", text: "היא גורמת לשגיאת זמן ריצה" },
      { key: "C", text: "היא אינה תקינה בקומפילציה, כי אחרי ה-cast הביטוי הוא מטיפוס `A`, ול-`A` אין `M()`" },
      { key: "D", text: "היא מדפיסה `hello`" },
    ],
    correctKey: "C",
    explanationHe: "גם אם האובייקט בפועל הוא `Y`, אחרי ה-cast הביטוי נחשב מטיפוס `A`. מאחר של-`A` אין `M()`, הקריאה אינה מתקמפלת.",
    tags: ["section-c", "cast", "compile-error"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2018-6/15 - A / B / C / D / E / Z / Y",
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
