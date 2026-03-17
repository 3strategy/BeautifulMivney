---
layout: page
title: שאלון - בגרות 2022 שאלה 16
share-description: שאלון אינטראקטיבי על בגרות 2022 שאלה 16 עם השאלה המקורית והתרגול זה לצד זה.
full-width: true
tags: [OOP, ירושה, פולימורפיזם, שאלון, אינטראקטיבי, bagrut, 2022, Product, Clothing, Book, Cart]
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
השאלון הזה מבוסס על בגרות 2022 שאלה 16 ועל המחלקות
`Clothing / Shirt / Pants / Book / Product / Cart`.
מומלץ לקרוא משמאל את השאלה המקורית ואז לענות כאן.

בשאלות 1-2 מתייחסים רק לשלב הראשון, שבו החנות מוכרת אונליין רק חולצות ומכנסיים.

בשאלות 3-6 מניחים שכבר נוספה המחלקה `Product`, נוספה גם `Book`, והסל `Cart` עודכן בהתאם.

בשאלות 7-10 מתייחסים גם למבצע ההנחות ולפעולה:

```csharp
public virtual double GetDiscountPrice()
```

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
  data="https://יסודות.שלי.com/bagruyot/2022.6.381/q16.pdf"
  type="application/pdf"
  aria-label="בגרות 2022 שאלה 16">
  <p>
    אם ה-PDF לא נטען בתוך הדף, פתחו את
    <a href="https://יסודות.שלי.com/bagruyot/2022.6.381/q16.pdf" target="_blank" rel="noopener">q16.pdf</a>.
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
    title: "שאלה 1: סעיף א - הטיפוס של `arr`",
    promptHe: "בשלב הראשון הסל צריך להכיל גם חולצות וגם מכנסיים. מה הטיפוס המתאים ביותר ל-`arr` במחלקה `Cart`?",
    codeLang: "csharp",
    code: `public class Cart
{
    private string name;
    private ??? arr;
    private int current;
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Shirt[]`" },
      { key: "B", text: "`Pants[]`" },
      { key: "C", text: "`Clothing[]`" },
      { key: "D", text: "`Book[]`" },
    ],
    correctKey: "C",
    explanationHe: "גם `Shirt` וגם `Pants` יורשות מ-`Clothing`, ולכן הסל יכול להחזיק את שתיהן דרך מערך מטיפוס `Clothing[]`.",
    tags: ["Cart", "array", "inheritance"],
  },
  {
    id: 2,
    title: "שאלה 2: סעיף א - מפת ההיררכיה",
    promptHe: "איזו אמירה מתארת נכון את הקשרים בין `Cart`, `Clothing`, `Shirt`, `Pants` בשלב הראשון?",
    codeLang: "csharp",
    code: `Clothing, Shirt, Pants, Cart`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Shirt` ו-`Pants` יורשות מ-`Clothing`, ו-`Cart` מכילה אוסף של `Clothing`" },
      { key: "B", text: "`Clothing` יורשת מ-`Shirt` ומ-`Pants`" },
      { key: "C", text: "`Cart` יורשת מ-`Clothing` כי היא מחזיקה בגדים" },
      { key: "D", text: "`Shirt` מכילה `Pants`, ו-`Cart` לא קשורה ל-`Clothing`" },
    ],
    correctKey: "A",
    explanationHe: "`Shirt : Clothing` ו-`Pants : Clothing` הן ירושות. `Cart` אינה בגד, ולכן היא לא יורשת מ-`Clothing`; היא רק מכילה מערך של בגדים.",
    tags: ["hierarchy", "composition", "Clothing"],
  },
  {
    id: 3,
    title: "שאלה 3: סעיף ב - מה עובר ל-`Product`?",
    promptHe: "אחרי שמוסיפים גם ספרים ורוצים לפעול לפי עקרונות OOP, אילו תכונות טבעי להעביר מהמחלקות המתאימות אל `Product`?",
    codeLang: "csharp",
    code: `Clothing: id, fabric, color, price
Book: id, bookName, author, price`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`id` ו-`price`" },
      { key: "B", text: "`fabric` ו-`color`" },
      { key: "C", text: "`bookName` ו-`author`" },
      { key: "D", text: "`id` ו-`fabric`" },
    ],
    correctKey: "A",
    explanationHe: "`id` ו-`price` משותפות גם ל-`Clothing` וגם ל-`Book`, ולכן הן בדיוק מה שצריך לעלות אל מחלקת האב `Product`.",
    tags: ["Product", "common-fields", "refactor"],
  },
  {
    id: 4,
    title: "שאלה 4: סעיף ב - מי יורש ישירות מ-`Product`?",
    promptHe: "אחרי העדכון של ההיררכיה, אילו מחלקות אמורות לרשת ישירות מ-`Product`?",
    codeLang: "csharp",
    code: `Product, Clothing, Shirt, Pants, Book, Cart`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Clothing` ו-`Book`" },
      { key: "B", text: "`Shirt`, `Pants`, `Book`" },
      { key: "C", text: "`Cart` ו-`Clothing`" },
      { key: "D", text: "רק `Book`" },
    ],
    correctKey: "A",
    explanationHe: "`Book` הוא מוצר ישירות, וגם `Clothing` היא מוצר כללי שממנו ימשיכו לרשת `Shirt` ו-`Pants`. `Cart` אינה מוצר אלא מחלקה שמכילה מוצרים.",
    tags: ["hierarchy", "Product", "inheritance"],
  },
  {
    id: 5,
    title: "שאלה 5: סעיף ב - אילו מחלקות קיימות באמת משתנות?",
    promptHe: "מלבד יצירת `Product`, אילו מחלקות קיימות צריך לכתוב מחדש או לשנות בעקבות ההוספה שלה?",
    codeLang: "csharp",
    code: `Cart, Clothing, Shirt, Pants, Book`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`Cart`, `Clothing`, `Book`" },
      { key: "B", text: "`Cart`, `Shirt`, `Pants`" },
      { key: "C", text: "`Shirt`, `Pants`, `Book`" },
      { key: "D", text: "רק `Cart`" },
    ],
    correctKey: "A",
    explanationHe: "`Cart` משתנה כי `arr` נהיה `Product[]`. `Clothing` משתנה כי היא יורשת עכשיו מ-`Product` ומאבדת את `id` ו-`price`. `Book` משתנה מאותה סיבה. `Shirt` ו-`Pants` יכולות להישאר יורשות של `Clothing` בלי שינוי נוסף.",
    tags: ["refactor", "Product", "changed-classes"],
  },
  {
    id: 6,
    title: "שאלה 6: סעיף ב - כותרת המחלקה `Product`",
    promptHe: "איזו גרסה מתאימה ביותר למחלקה `Product` לפני שמממשים את ההנחות של סעיף ג?",
    codeLang: "csharp",
    code: `public class Product
{
    ...
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`private int id; private string fabric; private double price;`" },
      { key: "B", text: "`private int id; private double price;`" },
      { key: "C", text: "`private string bookName; private string author; private double price;`" },
      { key: "D", text: "`private int width; private int length; private double price;`" },
    ],
    correctKey: "B",
    explanationHe: "`Product` צריכה להכיל רק את המשותף לכל המוצרים. כאן זה `id` ו-`price`, ולא תכונות ייחודיות לבגדים או לספרים.",
    tags: ["Product", "fields", "design"],
  },
  {
    id: 7,
    title: "שאלה 7: סעיף ג - המחיר המוזל הבסיסי",
    promptHe: "איך נכון לממש ב-`Product` את ההנחה של 10% לכל מוצר?",
    codeLang: "csharp",
    code: `public virtual double GetDiscountPrice()
{
    ???
}`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`return GetPrice() * 0.9;`" },
      { key: "B", text: "`return GetPrice() - 10;`" },
      { key: "C", text: "`return GetPrice() * 0.8;`" },
      { key: "D", text: "`return GetPrice();`" },
    ],
    correctKey: "A",
    explanationHe: "בסיס המבצע הוא 10% הנחה לכל מוצר, בלי קשר לסוג שלו. לכן ב-`Product` נכון להחזיר את המחיר כפול `0.9`.",
    tags: ["discount", "Product", "virtual"],
  },
  {
    id: 8,
    title: "שאלה 8: סעיף ג - איפה מוסיפים את ה-10 ש\"ח הנוספים?",
    promptHe: "אסור להשתמש ב-`is` או ב-`as`. איפה נכון להוסיף את ההנחה הנוספת של 10 ש\"ח לבגדים?",
    codeLang: "csharp",
    code: `public virtual double GetDiscountPrice()`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "ב-`Product`, עם בדיקת `if (this is Clothing)`" },
      { key: "B", text: "ב-`Clothing`, בעזרת `override` שמחזיר `base.GetDiscountPrice() - 10`" },
      { key: "C", text: "ב-`Book`, כי גם ספר הוא מוצר" },
      { key: "D", text: "ב-`Cart`, כי היא מחזיקה את כל המוצרים" },
    ],
    correctKey: "B",
    explanationHe: "ההנחה הנוספת שייכת לכל הבגדים, ולכן המקום הטבעי הוא `Clothing`. כך `Shirt` ו-`Pants` יורשות את ההתנהגות בלי כפילות, ובלי צורך ב-`is` או `as`.",
    tags: ["override", "Clothing", "no-is-as"],
  },
  {
    id: 9,
    title: "שאלה 9: ספר מול חולצה באותו מחיר",
    promptHe: "נניח שמימשנו נכון את סעיף ג. מה יודפס כאן?",
    codeLang: "csharp",
    code: `Product p1 = new Book();
p1.SetPrice(80);

Product p2 = new Shirt();
p2.SetPrice(80);

Console.WriteLine(p1.GetDiscountPrice());
Console.WriteLine(p2.GetDiscountPrice());`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`80` ואז `70`" },
      { key: "B", text: "`72` ואז `72`" },
      { key: "C", text: "`72` ואז `62`" },
      { key: "D", text: "`62` ואז `72`" },
    ],
    correctKey: "C",
    explanationHe: "ספר מקבל רק 10% הנחה, ולכן `80` נהיה `72`. חולצה היא בגד, ולכן קודם יש 10% הנחה (`72`) ואז עוד `10` ש\"ח, ולכן התוצאה היא `62`.",
    tags: ["discount", "Book", "Shirt"],
  },
  {
    id: 10,
    title: "שאלה 10: פולימורפיזם דרך `Product`",
    promptHe: "נניח שמימשנו נכון את סעיף ג. מה יודפס כאן?",
    codeLang: "csharp",
    code: `Product p1 = new Book();
p1.SetPrice(100);

Product p2 = new Pants();
p2.SetPrice(100);

Console.WriteLine(p1.GetDiscountPrice());
Console.WriteLine(p2.GetDiscountPrice());`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "`90` ואז `90`" },
      { key: "B", text: "`90` ואז `80`" },
      { key: "C", text: "`80` ואז `90`" },
      { key: "D", text: "`100` ואז `80`" },
    ],
    correctKey: "B",
    explanationHe: "הטיפוס המוצהר של שני המשתנים הוא `Product`, אבל בזמן ריצה הקריאה היא פולימורפית. `Book` נשארת עם 10% הנחה בלבד ולכן `90`, ואילו `Pants` יורשת מ-`Clothing` ולכן מקבלת גם את 10 השקלים הנוספים ומחזירה `80`.",
    tags: ["polymorphism", "Product", "Pants"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון בגרות 2022/16 - Clothing / Product / Cart",
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
