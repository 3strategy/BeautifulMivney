---
layout: page
title: שאלון - בגרות 2022 שאלה 17
tags: [פולימורפיזם, שאלון, אינטראקטיבי, bagrut, 2022, IsSame, Mammal, Antelope, Beaver]
mathjax: true
lang: he
---

<!-- interactive -->

{: .box-note}
השאלון הזה מבוסס על [בגרות 2022 שאלה 17 - `Mammal / Antelope / Beaver`](https://יסודות.שלי.com/bagruyot/2022.6.381/full.pdf#page=30).

בכל השאלות מניחים שכבר הופיעו השורות הבאות:

```csharp
Antelope a1 = new Antelope(10);
Object a2 = new Antelope(10);
Beaver b1 = new Beaver(10);
Mammal b2 = new Beaver(10);
```

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
    title: "שאלה 1: מה בדיוק קורה ל-`IsSame`?",
    promptHe: "איזו אמירה נכונה לגבי המחלקות `Antelope` ו-`Beaver`?",
    codeLang: "csharp",
    code: `public class Mammal
{
    public virtual bool IsSame(Mammal other) { ... }
}

public class Antelope : Mammal
{
    public bool IsSame(Antelope other) { ... }
}

public class Beaver : Mammal
{
    public override bool IsSame(Mammal other) { ... }
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Antelope` וגם `Beaver` עושות `override` ל-`IsSame(Mammal)`" },
      { key: "B", text: "`Antelope` עושה overload עם `IsSame(Antelope)`, ו-`Beaver` עושה override ל-`IsSame(Mammal)`" },
      { key: "C", text: "`Antelope` עושה override, ו-`Beaver` עושה overload" },
      { key: "D", text: "אף אחת מהן לא משנה את `IsSame`" },
    ],
    correctKey: "B",
    explanationHe: "ב-`Antelope` החתימה השתנתה ל-`IsSame(Antelope)`, ולכן זו העמסה (`overload`) ולא דריסה. ב-`Beaver` החתימה נשארה `IsSame(Mammal)`, ולכן זו דריסה (`override`).",
    tags: ["overload", "override", "IsSame"],
  },
  {
    id: 2,
    title: "שאלה 2: `weight`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(a1.weight);`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `10`" },
      { key: "B", text: "שגיאת קומפילציה, כי `weight` הוא `protected`" },
      { key: "C", text: "שגיאת זמן ריצה" },
      { key: "D", text: "יודפס שם הטיפוס" },
    ],
    correctKey: "B",
    explanationHe: "`weight` הוא שדה `protected`, ולכן נגיש רק בתוך `Mammal` ובמחלקות היורשות ממנה. המחלקה `Program` אינה יורשת מ-`Mammal`, ולכן זו שגיאת קומפילציה.",
    tags: ["protected", "compile-error", "access"],
  },
  {
    id: 3,
    title: "שאלה 3: cast מ-`Object` ל-`Beaver`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(((Beaver)a2).GetWeight());`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `10`" },
      { key: "B", text: "שגיאת קומפילציה" },
      { key: "C", text: "שגיאת זמן ריצה, כי `a2` מצביע בפועל על `Antelope`" },
      { key: "D", text: "יודפס `False`" },
    ],
    correctKey: "C",
    explanationHe: "ה-cast מ-`Object` ל-`Beaver` מתקמפל, אבל בזמן ריצה `a2` מפנה ל-`Antelope`, ולכן מתקבלת שגיאת `InvalidCastException`.",
    tags: ["casting", "runtime-error", "Object"],
  },
  {
    id: 4,
    title: "שאלה 4: `a1.IsSame(a2)`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(a1.IsSame(a2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Antelope` ואז `True`" },
      { key: "B", text: "יודפס `In Mammal` ואז `False`" },
      { key: "C", text: "שגיאת קומפילציה, כי `a2` הוא `Object` ואין overload מתאים" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "ל-`a1` יש שתי אפשרויות: `IsSame(Antelope)` ו-`IsSame(Mammal)`. אבל `a2` מוכרז כ-`Object`, ואין המרה אוטומטית מ-`Object` ל-`Antelope` או ל-`Mammal`, ולכן זו שגיאת קומפילציה.",
    tags: ["overload", "compile-error", "declared-type"],
  },
  {
    id: 5,
    title: "שאלה 5: `a2.IsSame(a1)`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(a2.IsSame(a1));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Mammal` ואז `False`" },
      { key: "B", text: "יודפס `In Antelope` ואז `True`" },
      { key: "C", text: "שגיאת קומפילציה, כי `Object` לא מכיר `IsSame`" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "C",
    explanationHe: "הטיפוס המוצהר של `a2` הוא `Object`, ולמחלקה `Object` אין פעולה בשם `IsSame`, ולכן הקוד כלל לא מתקמפל.",
    tags: ["Object", "compile-error", "methods"],
  },
  {
    id: 6,
    title: "שאלה 6: מה מדפיסות שורות 5 ו-6?",
    promptHe: "מה יודפס בשתי השורות הבאות?",
    codeLang: "csharp",
    code: `Console.WriteLine(b1.IsSame(b2));
Console.WriteLine(b2.IsSame(b1));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "בשורה הראשונה `In Beaver` ואז `True`, ובשורה השנייה `In Mammal` ואז `True`" },
      { key: "B", text: "בשתי השורות יודפס `In Beaver` ואז `True`" },
      { key: "C", text: "בשתי השורות יודפס `In Mammal` ואז `False`" },
      { key: "D", text: "שורה אחת תקינה ושורה אחת לא תקינה" },
    ],
    correctKey: "B",
    explanationHe: "בשתי השורות מופעלת הפעולה הדרוסה של `Beaver`, כי גם `b1` וגם `b2` מפנים בפועל ל-`Beaver`. בשני המקרים המשקל 10 ולכן התוצאה היא `True`.",
    tags: ["override", "runtime-type", "Beaver"],
  },
  {
    id: 7,
    title: "שאלה 7: cast ל-`Beaver` משנה את בחירת הפעולה?",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(a1.IsSame((Beaver)b2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Mammal` ואז `False`" },
      { key: "B", text: "יודפס `In Beaver` ואז `False`" },
      { key: "C", text: "יודפס `In Antelope` ואז `True`" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "A",
    explanationHe: "אחרי ה-cast, הארגומנט הוא מטיפוס `Beaver`. ב-`Antelope` אין `IsSame(Beaver)`, אבל יש `IsSame(Mammal)`, ולכן נבחרת הפעולה של `Mammal`. היא בודקת `this == other`, וזה `False`.",
    tags: ["overload", "Mammal", "False"],
  },
  {
    id: 8,
    title: "שאלה 8: cast ל-`Antelope` איזו פעולה/ות?",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(a1.IsSame((Antelope)a2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Mammal` ואז `False`" },
      { key: "B", text: "יודפס `In Antelope` ואז `True`" },
      { key: "C", text: "יודפס `In Beaver` ואז `False`" },
      { key: "D", text: "שגיאת זמן ריצה" },
    ],
    correctKey: "B",
    explanationHe: "ה-cast ל-`Antelope` תקין, ולכן נבחר ה-overload המדויק `IsSame(Antelope)`. שם מודפס `In Antelope`, ושני המשקלים הם 10 ולכן מוחזר `True`.",
    tags: ["Antelope", "overload", "True"],
  },
  {
    id: 9,
    title: "שאלה 9: השוואת `Beaver`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(b1.IsSame((Antelope)a2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Beaver` ואז `False`" },
      { key: "B", text: "יודפס `In Mammal` ואז `False`" },
      { key: "C", text: "יודפס `In Antelope` ואז `True`" },
      { key: "D", text: "שגיאת קומפילציה" },
    ],
    correctKey: "A",
    explanationHe: "`b1` הוא `Beaver`, ולכן מופעלת הפעולה הדרוסה `Beaver.IsSame(Mammal)`. הארגומנט הוא `Antelope`, ולכן התנאי `other is Beaver` נכשל ומוחזר `False`.",
    tags: ["Beaver", "override", "False"],
  },
  {
    id: 10,
    title: "שאלה 10: cast ל-`Beaver`",
    promptHe: "מה יקרה כאן?",
    codeLang: "csharp",
    code: `Console.WriteLine(b1.IsSame((Beaver)a2));`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "יודפס `In Beaver` ואז `True`" },
      { key: "B", text: "שגיאת קומפילציה" },
      { key: "C", text: "שגיאת זמן ריצה, כי `a2` אינו `Beaver` בפועל" },
      { key: "D", text: "יודפס `In Mammal` ואז `False`" },
    ],
    correctKey: "C",
    explanationHe: "גם כאן ה-cast מתקמפל, אבל בזמן ריצה `a2` מפנה ל-`Antelope` ולא ל-`Beaver`, ולכן מתקבלת שגיאת `InvalidCastException` עוד לפני הקריאה ל-`IsSame`.",
    tags: ["casting", "runtime-error", "InvalidCastException"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2022/17 - Mammal / Antelope / Beaver",
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
