---
layout: page
title: שאלון - בגרות 2019 קיץ שאלה 16
share-description: שאלון אינטראקטיבי על בגרות 2019 קיץ שאלה 16 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, ירושה, הכלה, Print, SetStr, count, שאלון, אינטראקטיבי, bagrut, 2019, First, Second, Third, Driver]
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
השאלון הזה מבוסס על בגרות 2019 קיץ שאלה 16 ועל המחלקות
`First / Second / Third / Driver`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בכל השאלות מניחים שהופיעו ב-`Main` השורות:

```csharp
First f1 = new First("One");
First f2 = new First("Two");
First f3 = new First(f2);
Second s1 = new Second(f1, f3);
Third t = new Third(First.count);
t.Add(f1);
t.Add(f2);
t.Add(s1);
```

השאלות כאן מתמקדות בהיררכיה, במצב העצמים, ב-`First.count`,
ובהשפעה של `SetStr` ו-`Print`.

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
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2019.6.381/q16.pdf"
  type="application/pdf"
  aria-label="בגרות 2019 קיץ שאלה 16">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/bagruyot/2019.6.381/q16.pdf" target="_blank" rel="noopener">q16.pdf</a>.
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
    title: "שאלה 1: מפת הקשרים בין המחלקות",
    promptHe: "איזו אמירה מתארת נכון את הירושה וההכלה בין `First`, `Second`, `Third`?",
    codeLang: "csharp",
    code: `public class Second : First { private First f; ... }
public class Third { private First[] arr; ... }`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Second` יורשת מ-`First`, ו-`Third` מכילה מערך של `First`" },
      { key: "B", text: "`Third` יורשת מ-`First`, ו-`Second` מכילה `Third`" },
      { key: "C", text: "`Second` ו-`Third` שתיהן יורשות מ-`First`" },
      { key: "D", text: "`First` יורשת מ-`Second`, ו-`Third` לא קשורה אליהן" },
    ],
    correctKey: "A",
    explanationHe: "מהכותרת `Second : First` רואים ירושה. לעומת זאת ב-`Third` יש שדה `First[] arr`, ולכן הקשר שם הוא הכלה ולא ירושה.",
    tags: ["hierarchy", "inheritance", "composition"],
  },
  {
    id: 2,
    title: "שאלה 2: מצב העצמים אחרי ארבע היצירות הראשונות",
    promptHe: "אחרי יצירת `f1`, `f2`, `f3`, `s1`, איזו אמירה נכונה?",
    codeLang: "csharp",
    code: `First f1 = new First("One");
First f2 = new First("Two");
First f3 = new First(f2);
Second s1 = new Second(f1, f3);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`First.count = 4`, ל-`s1` כחלק ה-`First` יש `str = \"CopyOne\"`, והשדה `f` שלו מפנה ל-`f3`" },
      { key: "B", text: "`First.count = 3`, כי `Second` לא יוצרת אובייקט `First`" },
      { key: "C", text: "ל-`s1` כחלק ה-`First` יש `str = \"One\"`, כי `base(fx)` שומר הפניה ל-`f1`" },
      { key: "D", text: "`f3.str = \"Two\"`, כי פעולת ההעתקה לא משנה מחרוזות" },
    ],
    correctKey: "A",
    explanationHe: "`f1`, `f2`, `f3`, והחלק `First` של `s1` הם ארבע יצירות של `First`, ולכן `count = 4`. הבנאי `First(First g)` בונה עותק עם `\"Copy\" + g.str`, ולכן בתוך `s1` הערך הוא `CopyOne`, והשדה `f` נשמר כהפניה ל-`f3`.",
    tags: ["objects", "count", "copy-constructor"],
  },
  {
    id: 3,
    title: "שאלה 3: מצב האובייקט `t` אחרי שלוש הוספות",
    promptHe: "מה נכון לגבי `t` אחרי `new Third(First.count)` ושלוש הקריאות ל-`Add`?",
    codeLang: "csharp",
    code: `Third t = new Third(First.count);
t.Add(f1);
t.Add(f2);
t.Add(s1);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`arr.Length = 4`, `curr = 3`, ו-`arr[0..2]` מחזיקים הפניות ל-`f1`, `f2`, `s1`" },
      { key: "B", text: "`arr.Length = 3`, `curr = 3`, ו-`Add` מייצרת עותקים חדשים" },
      { key: "C", text: "`arr.Length = 4`, `curr = 4`, כי התא האחרון מתמלא אוטומטית" },
      { key: "D", text: "`arr.Length = 5`, כי `First.count` משתנה גם ב-`Third`" },
    ],
    correctKey: "A",
    explanationHe: "ברגע יצירת `t`, הערך של `First.count` הוא 4 ולכן אורך המערך הוא 4. שלוש קריאות ל-`Add` רק שומרות הפניות ומקדמות את `curr` ל-3; התא הרביעי נשאר `null`.",
    tags: ["Third", "array", "references"],
  },
  {
    id: 4,
    title: "שאלה 4: ההדפסה הראשונה של `First.count`",
    promptHe: "מה יודפס כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(First.count);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`3`" },
      { key: "B", text: "`4`" },
      { key: "C", text: "`5`" },
      { key: "D", text: "`6`" },
    ],
    correctKey: "B",
    explanationHe: "נספרו ארבע יצירות של `First`: `f1`, `f2`, `f3`, והחלק הבסיסי של `s1`. `Third` עצמה לא משנה את `First.count`.",
    tags: ["count", "output", "static"],
  },
  {
    id: 5,
    title: "שאלה 5: מה מדפיסה `s1.Print()` לפני שינוי כלשהו?",
    promptHe: "מה יודפס עבור הקריאה הבאה לפני `f1.SetStr(\"Five\")`?",
    codeLang: "csharp",
    code: `s1.Print();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Second`, אחר כך `FirstCopyOne`, אחר כך `FirstCopyTwo`" },
      { key: "B", text: "`Second`, אחר כך `FirstOne`, אחר כך `FirstTwo`" },
      { key: "C", text: "`FirstCopyOne`, אחר כך `Second`, אחר כך `FirstCopyTwo`" },
      { key: "D", text: "`Second`, אחר כך `FirstOne`, אחר כך `FirstCopyOne`" },
    ],
    correctKey: "A",
    explanationHe: "`Second.Print()` מדפיסה קודם `Second`, אחר כך `base.Print()` עבור החלק הבסיסי של `s1`, כלומר `FirstCopyOne`, ואז `this.f.Print()`. השדה `f` מפנה ל-`f3`, ולכן יודפס `FirstCopyTwo`.",
    tags: ["Print", "Second", "polymorphism"],
  },
  {
    id: 6,
    title: "שאלה 6: הפלט של `t.Print()` לפני הקו המפריד",
    promptHe: "מה יודפס בקריאה הראשונה ל-`t.Print()`?",
    codeLang: "csharp",
    code: `t.Print();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`FirstOne`, `FirstTwo`, `Second`, `FirstCopyOne`, `FirstCopyTwo`" },
      { key: "B", text: "`FirstOne`, `FirstTwo`, `FirstCopyOne`" },
      { key: "C", text: "`Second`, `FirstCopyOne`, `FirstCopyTwo`, `FirstOne`, `FirstTwo`" },
      { key: "D", text: "`FirstOne`, `FirstTwo`, `Second`, `FirstOne`, `FirstCopyTwo`" },
    ],
    correctKey: "A",
    explanationHe: "`t.arr` מחזיק את `f1`, `f2`, `s1` לפי הסדר. לכן הקריאה ל-`t.Print()` מפעילה `Print()` עליהם לפי הסדר הזה, ובמקרה של `s1` מתקבלת הדפסה פולימורפית של שלוש שורות.",
    tags: ["Third", "Print", "output"],
  },
  {
    id: 7,
    title: "שאלה 7: מה משנה `f1.SetStr(\"Five\")`?",
    promptHe: "אחרי הקריאה `f1.SetStr(\"Five\")`, איזו אמירה נכונה?",
    codeLang: "csharp",
    code: `f1.SetStr("Five");`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רק `f1` משתנה; `First.count` לא משתנה; `s1` נשאר עם `CopyOne`; `f3` נשאר `CopyTwo`" },
      { key: "B", text: "גם `s1` משתנה ל-`FirstFive`, כי היא נשענת על אותה מחרוזת כמו `f1`" },
      { key: "C", text: "גם `f3` משתנה ל-`CopyFive`, כי הוא נוצר מ-`f2`" },
      { key: "D", text: "`First.count` גדל ל-5, כי `SetStr` יוצרת אובייקט חדש בכל `First`" },
    ],
    correctKey: "A",
    explanationHe: "`f1.SetStr` מפעילה את `First.SetStr`, שמשנה רק את השדה `str` של `f1` עצמו. `s1` מחזיקה עותק `CopyOne` שנוצר בבנאי, לא הפניה ל-`f1`, ו-`f3` הוא אובייקט נפרד. גם לא נוצר אובייקט חדש ולכן `count` לא משתנה.",
    tags: ["SetStr", "references-vs-copies", "count"],
  },
  {
    id: 8,
    title: "שאלה 8: ההדפסה השנייה של `First.count`",
    promptHe: "מה יודפס כאן אחרי `f1.SetStr(\"Five\")`?",
    codeLang: "csharp",
    code: `Console.WriteLine(First.count);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`3`" },
      { key: "B", text: "`4`" },
      { key: "C", text: "`5`" },
      { key: "D", text: "`6`" },
    ],
    correctKey: "B",
    explanationHe: "הקריאה היא ל-`f1.SetStr`, כלומר לפעולה של `First`, שלא יוצרת אובייקט חדש. לכן `First.count` נשאר 4.",
    tags: ["count", "after-SetStr", "static"],
  },
  {
    id: 9,
    title: "שאלה 9: הפלט של `t.Print()` אחרי `f1.SetStr(\"Five\")`",
    promptHe: "מה יודפס בקריאה השנייה ל-`t.Print()`?",
    codeLang: "csharp",
    code: `t.Print();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`FirstFive`, `FirstTwo`, `Second`, `FirstCopyOne`, `FirstCopyTwo`" },
      { key: "B", text: "`FirstFive`, `FirstTwo`, `Second`, `FirstFive`, `FirstCopyTwo`" },
      { key: "C", text: "`FirstOne`, `FirstTwo`, `Second`, `FirstCopyOne`, `FirstCopyTwo`" },
      { key: "D", text: "`FirstFive`, `FirstTwo`, `Second`, `FirstCopyFive`, `FirstCopyTwo`" },
    ],
    correctKey: "A",
    explanationHe: "רק `f1` השתנה ל-`Five`, ולכן השורה הראשונה משתנה ל-`FirstFive`. `s1` עדיין מדפיסה את החלק הבסיסי שלה כ-`FirstCopyOne`, ואת `f3` כ-`FirstCopyTwo`.",
    tags: ["Print", "after-SetStr", "output"],
  },
  {
    id: 10,
    title: "שאלה 10: הפלט המלא של `Main`",
    promptHe: "איזו אפשרות מתארת נכון את כל הפלט של `Driver.Main`?",
    codeLang: "text",
    code: `4
FirstOne
FirstTwo
Second
FirstCopyOne
FirstCopyTwo
 ----------
4
FirstFive
FirstTwo
Second
FirstCopyOne
FirstCopyTwo`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "זהו בדיוק הפלט הנכון" },
      { key: "B", text: "שגוי: בשתי ההדפסות צריך להופיע `FirstOne` גם אחרי `SetStr`" },
      { key: "C", text: "שגוי: הערך השני של `First.count` צריך להיות `5`" },
      { key: "D", text: "שגוי: `Second` לא מודפסת בכלל, כי `arr` הוא מטיפוס `First[]`" },
    ],
    correctKey: "A",
    explanationHe: "זהו אכן הפלט המלא: קודם `count = 4`, אחר כך חמש שורות מההדפסה הראשונה של `t`, אחר כך הקו המפריד, שוב `count = 4`, ולבסוף ההדפסה השנייה שבה רק `f1` השתנה ל-`FirstFive`.",
    tags: ["full-output", "Driver", "summary"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2019-6/16 - First / Second / Third",
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
