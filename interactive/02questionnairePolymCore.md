---
layout: page
title: שאלון - פולימורפיזם לבגרות
tags: [פולימורפיזם, שאלון, אינטראקטיבי, bagrut, override, virtual, ToString, inheritance]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון הזה ממוקד ב**חומר לבגרות** בפולימורפיזם, בלי הנושאים שסומנו `לא בחומר` בשאלון המתקדם.
הוא מבוסס בעיקר על [בגרות 2025 שאלה 10]({{ '/bagruyot/2025.6.271/q10.pdf' | relative_url }}), [בגרות 2024 שאלה 15]({{ '/bagruyot/2024.6.271/q15.pdf' | relative_url }}) ו-[בגרות 2024 שאלה 17]({{ '/bagruyot/2024.6.271/q17.pdf' | relative_url }}).

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

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<div id="quiz-root"></div>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: ההיררכיה הנכונה בגן החיות",
    promptHe: "במערכת יש את המחלקות `Animal`, `Bird`, `Parrot`, `Fish`, `Snake`. איזו היררכיית ירושה הכי מתאימה לעקרונות OOP?",
    codeLang: "csharp",
    code: `Animal, Bird, Parrot, Fish, Snake`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Animal` בראש, `Bird`/`Fish`/`Snake` יורשות ממנה, ו-`Parrot` יורשת מ-`Bird`" },
      { key: "B", text: "`Parrot` בראש, וכל שאר המחלקות יורשות ממנה" },
      { key: "C", text: "`Animal` יורשת מכל שאר המחלקות" },
      { key: "D", text: "`Bird` ו-`Parrot` צריכות להיות בלי קשר ירושה בכלל" },
    ],
    correctKey: "A",
    explanationHe: "`Animal` היא המחלקה הכללית. `Bird`, `Fish` ו-`Snake` הן סוגים של `Animal`, ו-`Parrot` היא סוג מיוחד יותר של `Bird`.",
    tags: ["hierarchy", "inheritance", "zoo"],
  },
  {
    id: 2,
    title: "שאלה 2: למה מותר להכניס `Bird` למערך של `Animal`?",
    promptHe: "מה ההסבר הנכון לקטע הקוד הבא?",
    codeLang: "csharp",
    code: `Animal[] animals = new Animal[5];
animals[0] = new Bird("white", 4, false);
animals[1] = new Fish("blue", 3, "sweet water");
animals[2] = new Parrot("brown", 12, true, true);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "זה חוקי כי כל אובייקט שיורש מ-`Animal` הוא גם `Animal`" },
      { key: "B", text: "זה חוקי רק אם עושים cast לפני כל השמה" },
      { key: "C", text: "זה חוקי רק ל-`Bird`, אבל לא ל-`Fish` או `Parrot`" },
      { key: "D", text: "זה לא חוקי בכלל, ומדובר בשגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "זה בדיוק הרעיון של פולימורפיזם בסיסי: משתנה או תא במערך מטיפוס אב יכול להחזיק אובייקט של מחלקת בן.",
    tags: ["polymorphism", "arrays", "base-type"],
  },
  {
    id: 3,
    title: "שאלה 3: מי צריך `override ToString()`?",
    promptHe: "בבגרות 2025 אי אפשר לשנות את `ToString()` של `Animal`, אבל רוצים פלט מיוחד עבור ציפור, תוכי ונחש. אילו מחלקות צריכות לממש `override ToString()`?",
    codeLang: "csharp",
    code: `for (int i = 0; i < animals.Length; i++)
{
    Console.WriteLine(animals[i]);
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רק `Animal`" },
      { key: "B", text: "`Fish`, `Snake` בלבד" },
      { key: "C", text: "`Bird`, `Parrot`, `Snake`" },
      { key: "D", text: "כל המחלקות חייבות תמיד לממש `ToString()` מחדש" },
    ],
    correctKey: "C",
    explanationHe: "אם `Fish` יכולה להסתפק בפלט הכללי של `Animal`, אין צורך לדרוס שם. אבל `Bird`, `Parrot` ו-`Snake` צריכות פלט מיוחד ולכן עליהן לדרוס את `ToString()`.",
    tags: ["ToString", "override", "zoo"],
  },
  {
    id: 4,
    title: "שאלה 4: איך מתקנים את `Hello(Animal[] arr)`?",
    promptHe: "בג(2) של בגרות 2025 אסור לשנות את המחלקות עצמן. איך מתקנים את הפעולה כך שהפונקציה תהיה תקינה?",
    codeLang: "csharp",
    code: `public static void Hello(Animal[] arr)
{
    for (int i = 0; i < arr.Length; i++)
    {
        arr[i].Zoo();
    }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "להשתמש בבדיקת טיפוס בתוך הלולאה, למשל `if (arr[i] is Bird b) b.Zoo();`" },
      { key: "B", text: "להוסיף `virtual Zoo()` ב-`Animal` ולבצע `override` במחלקות המתאימות" },
      { key: "C", text: "להחליף את `Animal[]` ב-`object[]`" },
      { key: "D", text: "להפוך את `Zoo()` לפעולה `static`" },
    ],
    correctKey: "A",
    explanationHe: "בנוסח של סעיף ג(2) אסור לשנות את המחלקות, ולכן הפתרון צריך להיות בתוך הפונקציה. בדיקת טיפוס (`is`, `as`, או pattern matching) היא הדרך הנכונה כאן. בדיקה מול `Bird` תתפוס גם `Parrot`, כי `Parrot` יורשת מ-`Bird`.",
    tags: ["pattern-matching", "casting", "zoo"],
  },
  {
    id: 5,
    title: "שאלה 5: מי חייבת לדרוס את `Payment()`?",
    promptHe: "בבגרות 2024 שאלה 15: `Vehicle` גובה תעריף בסיסי, `Car` לפי הבסיס, `Truck` מוסיפה 500, ו-`Motorcycle` משלמת חצי. אילו מחלקות חייבות `override Payment()`?",
    codeLang: "csharp",
    code: `public virtual double Payment() { /* base formula */ }`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "רק `Vehicle`" },
      { key: "B", text: "`Car`, `Truck`, `Motorcycle`" },
      { key: "C", text: "`Truck` ו-`Motorcycle` בלבד" },
      { key: "D", text: "`Contract` ו-`Vehicle`" },
    ],
    correctKey: "C",
    explanationHe: "`Car` משתמשת בדיוק בתעריף הבסיסי ולכן יכולה לרשת את `Payment()` כמו שהיא. `Truck` ו-`Motorcycle` משנות את החישוב, ולכן הן צריכות `override`.",
    tags: ["Payment", "override", "vehicle"],
  },
  {
    id: 6,
    title: "שאלה 6: מה יודפס עבור `Motorcycle`?",
    promptHe: "נניח שהתעריף הבסיסי הוא `days * 60 + kilo * 2`, ואופנוע משלם חצי ממנו. מה יודפס?",
    codeLang: "csharp",
    code: `Contract c = new Contract("Dana", 2, 40);
Vehicle v = new Motorcycle("M1", c, true);
Console.WriteLine(v.Payment());`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "100" },
      { key: "B", text: "200" },
      { key: "C", text: "380" },
      { key: "D", text: "500" },
    ],
    correctKey: "A",
    explanationHe: "התעריף הבסיסי הוא `2*60 + 40*2 = 200`. מכיוון שהאובייקט בפועל הוא `Motorcycle`, תופעל הגרסה הדרוסה של `Payment()` ויוחזר חצי: 100.",
    tags: ["Payment", "polymorphism", "runtime-type"],
  },
  {
    id: 7,
    title: "שאלה 7: `Bar()` של האב קוראת ל-`Goo()` של הבן",
    promptHe: "בבגרות 2024 שאלה 17, מה יהיה הפלט של הקוד הבא?",
    codeLang: "csharp",
    code: `class AA
{
    private int x;
    public AA(int x) { this.x = x; }
    public int GetX() { return this.x; }
    public virtual void Goo() { this.x = this.x + 3; }
    public void Bar() { Goo(); }
    public override string ToString() { return "x = " + this.x; }
}

class BB : AA
{
    private int y;
    public BB(int a) : base(a) { this.y = GetX() * 2; }
    public override void Goo() { this.y = GetX() - 1; }
    public override string ToString() { return base.ToString() + " y = " + this.y; }
}

// AA item = new BB(2);
// item.Bar();
// Console.WriteLine(item);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`x = 5 y = 4`" },
      { key: "B", text: "`x = 2 y = 4`" },
      { key: "C", text: "`x = 2 y = 1`" },
      { key: "D", text: "`x = 5 y = 1`" },
    ],
    correctKey: "C",
    explanationHe: "`item` מצביע על אובייקט `BB`. הפעולה `Bar()` עצמה שייכת ל-`AA`, אבל היא קוראת ל-`Goo()` שהיא `virtual`, ולכן בזמן ריצה מופעלת `BB.Goo()`. `x` נשאר 2, ו-`y` הופך ל-`GetX() - 1`, כלומר 1.",
    tags: ["virtual", "override", "tracking", "AA-BB"],
  },
  {
    id: 8,
    title: "שאלה 8: `Foo()` של הבן לא משנה את `x`",
    promptHe: "באותה רוח, מה יהיה הפלט של הקוד הבא?",
    codeLang: "csharp",
    code: `class AA
{
    private int x;
    public AA() { this.x = 4; }
    public virtual void Foo() { this.x = 3; }
    public override string ToString() { return "x = " + this.x; }
}

class BB : AA
{
    private int y;
    public BB() { this.y = 2; }
    public override void Foo() { this.y = 5; }
    public override string ToString() { return base.ToString() + " y = " + this.y; }
}

// AA item = new BB();
// item.Foo();
// Console.WriteLine(item);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`x = 3 y = 2`" },
      { key: "B", text: "`x = 4 y = 5`" },
      { key: "C", text: "`x = 3 y = 5`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "B",
    explanationHe: "מופעלת `BB.Foo()` כי `Foo()` היא `virtual`. אבל `BB.Foo()` משנה רק את `y` ל-5 ואינה נוגעת ב-`x`, ולכן `x` נשאר 4.",
    tags: ["virtual", "override", "tracking", "AA-BB"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון פולימורפיזם לבגרות",
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
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
