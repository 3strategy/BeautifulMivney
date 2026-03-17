---
layout: page
title: שאלון - בגרות 2021 שאלה 16
share-description: שאלון אינטראקטיבי על בגרות 2021 שאלה 16 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [פולימורפיזם, שאלון, אינטראקטיבי, bagrut, 2021, A, B, C, D, IsEqual, Func]
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
השאלון הזה מבוסס על המחלקות `A / B / C / D` ועל `Tester.Main` מבגרות 2021 נבצרים שאלה 16.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

השאלות כאן מתמקדות גם במפת ההיררכיה וגם במעקב אחרי הקריאות ל-`Foo`, `IsEqual`, `Func` ו-`count`.

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
  data="https://יסודות.שלי.com/bagruyot/2021.5.381/q16.pdf"
  type="application/pdf"
  aria-label="בגרות 2021 נבצרים שאלה 16">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://יסודות.שלי.com/bagruyot/2021.5.381/q16.pdf" target="_blank" rel="noopener">q16.pdf</a>.
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
    title: "שאלה 1: מפת היחסים בין המחלקות",
    promptHe: "איזו אמירה מתארת נכון את ההיררכיה וההכלה בין `A`, `B`, `C`, `D`?",
    codeLang: "csharp",
    code: `public class B : A { ... }
public class C : A { ... }

public class D
{
    private A a;
    public D(A a) { this.a = a; }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`B` ו-`C` יורשות מ-`A`, ו-`D` מכילה אובייקט מטיפוס `A`" },
      { key: "B", text: "`D` יורשת גם מ-`A` וגם מ-`B`" },
      { key: "C", text: "`A` יורשת מ-`B` ומ-`C`, ו-`D` לא קשורה אליהן" },
      { key: "D", text: "`D` יורשת מ-`A` כי היא מפעילה את `a.Func()`" },
    ],
    correctKey: "A",
    explanationHe: "`B : A` ו-`C : A` הן ירושות רגילות. לעומת זאת ב-`D` יש שדה `private A a`, ולכן הקשר שלה אל `A` הוא הכלה ולא ירושה.",
    tags: ["hierarchy", "inheritance", "composition"],
  },
  {
    id: 2,
    title: "שאלה 2: מה `Foo` באמת משנה?",
    promptHe: "אחרי הקריאה הבאה, מה המצב של `y1` ושל `y2`?",
    codeLang: "csharp",
    code: `A y1 = new A();
A y2 = new A();
y1.Foo(y1.GetNum());`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "לשניהם `num = 3`" },
      { key: "B", text: "ל-`y1` יש `num = 4`, ול-`y2` יש `num = 3`" },
      { key: "C", text: "לשניהם `num = 4`" },
      { key: "D", text: "יש שגיאת קומפילציה כי `GetNum()` הוא `protected`" },
    ],
    correctKey: "A",
    explanationHe: "`GetNum()` מחזירה 3. הפעולה `Foo(int num)` משבצת את 3 לתוך `this.num`, ואז מגדילה רק את הפרמטר המקומי `num`. ב-#C הפרמטר הועבר by value, ולכן `y1.num` נשאר 3 וגם `y2.num` נשאר 3.",
    tags: ["Foo", "pass-by-value", "tracking"],
  },
  {
    id: 3,
    title: "שאלה 3: ההדפסה הראשונה",
    promptHe: "מה יודפס כאן?",
    codeLang: "csharp",
    code: `A y1 = new A();
A y2 = new A();
y1.Foo(y1.GetNum());
Console.WriteLine(y1.IsEqual(y2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`True`" },
      { key: "B", text: "`False`" },
      { key: "C", text: "שגיאת קומפילציה" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "A",
    explanationHe: "אחרי `Foo`, גם `y1.num` וגם `y2.num` שווים ל-3. הפעולה `A.IsEqual(A other)` משווה בין ערכי `num`, ולכן התוצאה היא `True`.",
    tags: ["IsEqual", "A", "True"],
  },
  {
    id: 4,
    title: "שאלה 4: `y3.IsEqual(y4)`",
    promptHe: "איזו גרסה של `IsEqual` תופעל ומה יקרה?",
    codeLang: "csharp",
    code: `B y3 = new B();
A y4 = new B();
Console.WriteLine(y3.IsEqual(y4));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תופעל `B.IsEqual(B)` ויודפס `True`" },
      { key: "B", text: "תופעל `A.IsEqual(A)` ויודפס `True`" },
      { key: "C", text: "תופעל `A.IsEqual(A)` ויודפס `False`" },
      { key: "D", text: "יש שגיאת קומפילציה כי `y4` הוא `A`" },
    ],
    correctKey: "B",
    explanationHe: "ב-`B` יש overload בשם `IsEqual(B)`, אבל הארגומנט הוא מטיפוס מוצהר `A`, ולכן אין התאמה לגרסה הזאת. לכן נבחרת הפעולה המורשת `A.IsEqual(A)`, שמשווה את ערכי `num`. לשני האובייקטים ערך 3, ולכן מודפס `True`.",
    tags: ["overload", "declared-type", "IsEqual"],
  },
  {
    id: 5,
    title: "שאלה 5: `y4.IsEqual(y3)`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `B y3 = new B();
A y4 = new B();
Console.WriteLine(y4.IsEqual(y3));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תופעל `B.IsEqual(B)` ויודפס `True`" },
      { key: "B", text: "תופעל `A.IsEqual(A)` ויודפס `True`" },
      { key: "C", text: "יש שגיאת קומפילציה כי `A` לא מכירה `IsEqual`" },
      { key: "D", text: "יודפס `False`" },
    ],
    correctKey: "B",
    explanationHe: "הטיפוס המוצהר של `y4` הוא `A`, ולכן בזמן הקומפילציה בכלל לא בודקים את `B.IsEqual(B)`. הפעולה הזמינה היא `A.IsEqual(A)`, וההשוואה בין `num` לבין `num` מחזירה שוב `True`.",
    tags: ["declared-type", "A", "IsEqual"],
  },
  {
    id: 6,
    title: "שאלה 6: ההשוואה של `y3` מול `y5`",
    promptHe: "אחרי ההשמה `B y5 = y3;` והקריאה `y5.SetNum(0);`, מה יודפס ולמה?",
    codeLang: "csharp",
    code: `B y3 = new B();
B y5 = y3;
y5.SetNum(0);
Console.WriteLine(y3.IsEqual(y5));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תופעל `B.IsEqual(B)` ויודפס `True`, כי שני המשתנים מצביעים לאותו אובייקט" },
      { key: "B", text: "תופעל `A.IsEqual(A)` ויודפס `True`, כי לשניהם `num = 0`" },
      { key: "C", text: "תופעל `B.IsEqual(B)` ויודפס `False`, כי `SetNum` שינה רק את `y5`" },
      { key: "D", text: "יש שגיאת קומפילציה, כי `SetNum` לא קיימת ב-`B`" },
    ],
    correctKey: "A",
    explanationHe: "כאן גם המקבל (`y3`) וגם הארגומנט (`y5`) הם מטיפוס מוצהר `B`, ולכן נבחר ה-overload `B.IsEqual(B)`. הפעולה הזאת משווה כתובות (`this == other`), ו-`y3` ו-`y5` הם ממש אותו אובייקט, לכן התוצאה `True`.",
    tags: ["aliasing", "overload", "reference"],
  },
  {
    id: 7,
    title: "שאלה 7: cast ל-`B` לא מבטיח `B.IsEqual(B)`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `A y4 = new B();
C y6 = new C();
Console.WriteLine(((B)y4).IsEqual(y6));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "תופעל `B.IsEqual(B)` ויודפס `False`" },
      { key: "B", text: "תופעל `A.IsEqual(A)` ויודפס `True`" },
      { key: "C", text: "יש שגיאת קומפילציה כי `y6` הוא `C`" },
      { key: "D", text: "יש שגיאת זמן ריצה כי אי אפשר להמיר את `y4` ל-`B`" },
    ],
    correctKey: "B",
    explanationHe: "ה-cast של `y4` ל-`B` תקין, כי בפועל `y4` מפנה ל-`new B()`. אבל הארגומנט `y6` הוא מטיפוס `C`, ולכן `B.IsEqual(B)` לא מתאימה. הפעולה החוקית היא `A.IsEqual(A)`, ושם משווים את `num`: לשניהם הערך 3, לכן יודפס `True`.",
    tags: ["casting", "overload", "A-vs-B"],
  },
  {
    id: 8,
    title: "שאלה 8: כמה אובייקטים השפיעו על `count`?",
    promptHe: "מה יודפס כאן?",
    codeLang: "csharp",
    code: `A y1 = new A();
A y2 = new A();
B y3 = new B();
A y4 = new B();
B y5 = y3;
C y6 = new C();
D d1 = new D(y4);
D d2 = new D(y6);

Console.WriteLine(B.count);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`3`" },
      { key: "B", text: "`4`" },
      { key: "C", text: "`5`" },
      { key: "D", text: "`7`" },
    ],
    correctKey: "C",
    explanationHe: "`count` גדל בכל פעם שנקרא הבנאי של `A`. זה קורה עבור `y1`, `y2`, `y3`, `y4`, `y6`. ההשמה `y5 = y3` לא יוצרת אובייקט חדש, ו-`D` בכלל לא יורשת מ-`A`, לכן אינה משנה את `count`. בסך הכול מתקבל 5.",
    tags: ["static", "constructor", "count"],
  },
  {
    id: 9,
    title: "שאלה 9: `d1.Func()` ו-`d2.Func()`",
    promptHe: "מה יודפס בשתי השורות האלה?",
    codeLang: "csharp",
    code: `A y4 = new B();
C y6 = new C();
D d1 = new D(y4);
D d2 = new D(y6);

d1.Func();
d2.Func();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "בשתי השורות יודפס `I am A`" },
      { key: "B", text: "בשתי השורות יודפס `I am B`" },
      { key: "C", text: "קודם `I am B` ואז `I am A`" },
      { key: "D", text: "יש שגיאת קומפילציה כי `D` לא יורשת מ-`A`" },
    ],
    correctKey: "C",
    explanationHe: "ב-`D.Func()` קוראים ל-`(this.a).Func()`. בתוך `d1`, השדה `a` מפנה בפועל ל-`B`, ולכן בגלל `virtual/override` תופעל `B.Func()` ויודפס `I am B`. בתוך `d2`, השדה `a` מפנה ל-`C`, אבל `C` לא דורסה את `Func()`, לכן מופעלת `A.Func()` ויודפס `I am A`.",
    tags: ["virtual", "override", "composition"],
  },
  {
    id: 10,
    title: "שאלה 10: `is B` דרך ההכלה",
    promptHe: "מה יודפס בשתי הקריאות הבאות?",
    codeLang: "csharp",
    code: `A y4 = new B();
C y6 = new C();
D d1 = new D(y4);
D d2 = new D(y6);

d1.IsB();
d2.IsB();`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "קודם `True` ואז `False`" },
      { key: "B", text: "קודם `False` ואז `True`" },
      { key: "C", text: "בשתי השורות יודפס `True`" },
      { key: "D", text: "בשתי השורות יודפס `False`" },
    ],
    correctKey: "A",
    explanationHe: "ב-`d1` השדה `a` מחזיק אובייקט `B`, ולכן הביטוי `(this.a) is B` מחזיר `True`. ב-`d2` השדה `a` מחזיק אובייקט `C`, ולכן אותה בדיקה מחזירה `False`.",
    tags: ["is", "runtime-type", "D"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2021/16 - A / B / C / D",
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
