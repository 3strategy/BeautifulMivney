---
layout: page
title: שאלון - פולימורפיזם מתקדם
tags: [פולימורפיזם,שאלון, אינטרקטיבי,interactive, override, virtual, new, overloading, interfaces, dynamic, casting, pattern-matching]
mathjax: true
lang: he
---

<!-- interactive -->

  <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<style>
  /* === Answer buttons: scoped to quiz only === */
  #quiz-root .answers-grid{
    display:grid;
    grid-template-columns:repeat(4, minmax(110px, 1fr));
    gap:12px;
    margin-top:12px;
  }

  @media (max-width: 780px){
    #quiz-root .answers-grid{ grid-template-columns:repeat(2, minmax(140px, 1fr)); }
  }
  @media (max-width: 420px){
    #quiz-root .answers-grid{ grid-template-columns:1fr; }
  }

  #quiz-root .answer-btn{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:6px;

    padding:12px 10px;
    border:1px solid #d1d5db;
    border-radius:12px;
    background:#fff;
    cursor:pointer;

    user-select:none;
    -webkit-tap-highlight-color:transparent;

    transition:transform .06s ease, box-shadow .12s ease, background .12s ease;
    min-height:62px;
  }

  #quiz-root .answer-btn:hover{
    box-shadow:0 6px 18px rgba(0,0,0,.08);
    transform:translateY(-1px);
    background:#f9fafb;
  }

  #quiz-root .answer-btn:active{
    transform:translateY(0);
    box-shadow:none;
  }

  #quiz-root .answer-letter{
    font-weight:800;
    font-size:15px;
    line-height:1;
  }

  #quiz-root .answer-text{
    font-weight:600;
    font-size:13px;
    line-height:1.15;
    opacity:.9;
    text-align:center;
  }

  /* מצב נבחר / נכון / שגוי — אם תרצה */
  #quiz-root .answer-btn.is-selected{
    border-color:#111827;
    box-shadow:0 0 0 3px rgba(17,24,39,.10);
  }
  #quiz-root .answer-btn.is-correct{
    border-color:#16a34a;
    box-shadow:0 0 0 3px rgba(22,163,74,.12);
  }
  #quiz-root .answer-btn.is-wrong{
    border-color:#dc2626;
    box-shadow:0 0 0 3px rgba(220,38,38,.12);
  }

  /* אם יש לך disable בזמן בדיקה */
  #quiz-root .answer-btn:disabled{
    cursor:default;
    opacity:.65;
    transform:none;
    box-shadow:none;
  }
</style>


  <div id="quiz-root"></div>

  <script>
  window.QUIZ_QUESTIONS = [
      {
        id: 1,
        title: "Static vs dynamic dispatch: non-virtual vs virtual",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public void F() { Console.Write("A"); }
    public virtual void G() { Console.Write("a"); }
}

class B : A
{
    public new void F() { Console.Write("B"); }
    public override void G() { Console.Write("b"); }
}

// A x = new B();
// x.F();
// x.G();`,
        choices: [
          { key: "A", text: "Ab" },
          { key: "B", text: "Bb" },
          { key: "C", text: "Aa" },
          { key: "D", text: "Ba" },
        ],
        correctKey: "A",
        explanationHe: "F() אינה virtual ולכן נקבעת בזמן קומפילציה לפי הטיפוס המוצהר A → מודפס A. לעומת זאת G() היא virtual ולכן נקבעת בזמן ריצה לפי הטיפוס בפועל (B) → מודפס b. יחד: Ab.",
        tags: ["polymorphism", "virtual", "override", "new", "static-vs-dynamic"],
      },
      {
        id: 2,
        title: "Hiding a virtual method with new",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual void M() { Console.Write("A"); }
}

class B : A
{
    public new void M() { Console.Write("B"); }
}

// B b = new B();
// A a = b;
// b.M();
// a.M();`,
        choices: [
          { key: "A", text: "AA" },
          { key: "B", text: "BB" },
          { key: "C", text: "BA" },
          { key: "D", text: "AB" },
        ],
        correctKey: "C",
        explanationHe: "המתודה של B מוגדרת כ־new (הסתרה), ולכן b.M() מפעילה את B.M ומדפיסה B. אבל a.M() הוא קריאה דרך מצביע A למתודה virtual של A שלא נדרסה (אין override), ולכן מופעלת A.M ומודפס A. יחד: BA.",
        tags: ["polymorphism", "virtual", "new", "hiding"],
      },
      {
        id: 3,
        title: "Overload + override vs dynamic binding",
        promptHe: "לא בחומר: מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class Base
{
    public virtual void Foo(object x) { Console.Write("B"); }
}

class Derived : Base
{
    public override void Foo(object x) { Console.Write("D"); }
    public void Foo(string s) { Console.Write("S"); }
}

// Base b = new Derived();
// b.Foo("hi");
// dynamic d = b;
// d.Foo("hi");`,
        choices: [
          { key: "A", text: "BD" },
          { key: "B", text: "DS" },
          { key: "C", text: "DD" },
          { key: "D", text: "BS" },
        ],
        correctKey: "B",
        explanationHe: "בקריאה הראשונה הטיפוס המוצהר הוא Base ולכן נבחרת החתימה Foo(object). בזמן ריצה מופעל override של Derived ולכן מודפס D. בקריאה דרך dynamic בחירת overload נדחית לזמן ריצה ונבחרת ההתאמה המדויקת Foo(string) של Derived ולכן מודפס S. יחד: DS.",
        tags: ["polymorphism", "overloading", "override", "dynamic"],
      },
      {
        id: 4,
        title: "Overload resolution depends on declared types",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual void F(A a) { Console.Write("1"); }
    public void F(B b) { Console.Write("2"); }
}

class B : A
{
    public override void F(A a) { Console.Write("3"); }
    public void F(B b) { Console.Write("4"); }
}

// A x = new B();
// B y = new B();
// x.F(y);
// y.F(y);
// ((A)y).F(y);
// x.F((A)y);`,
        choices: [
          { key: "A", text: "2423" },
          { key: "B", text: "2431" },
          { key: "C", text: "2223" },
          { key: "D", text: "4443" },
        ],
        correctKey: "A",
        explanationHe: "1) x הוא A מוצהר ולכן overload נבחר בזמן קומפילציה: F(B) (התאמה מדויקת) → מודפס 2. 2) y הוא B מוצהר ולכן F(B) של B → מודפס 4. 3) ((A)y) חוזר לטיפוס מוצהר A ולכן שוב F(B) של A → מודפס 2. 4) x.F((A)y) בוחר את F(A) (virtual) ובזמן ריצה מופעל override של B → מודפס 3. יחד: 2423.",
        tags: ["polymorphism", "overloading", "override", "declared-type"],
      },
      {
        id: 5,
        title: "Explicit interface implementation vs override",
        promptHe: "לא בחומר: מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `interface I
{
    void P();
}

class A : I
{
    public virtual void P() { Console.Write("A"); }
}

class B : A, I
{
    void I.P() { Console.Write("i"); }
    public override void P() { Console.Write("B"); }
}

// B b = new B();
// A a = b;
// b.P();
// ((I)b).P();
// a.P();
// ((I)a).P();`,
        choices: [
          { key: "A", text: "BBBB" },
          { key: "B", text: "BiBi" },
          { key: "C", text: "BAAi" },
          { key: "D", text: "iBBi" },
        ],
        correctKey: "B",
        explanationHe: "b.P() ו־a.P() מפעילות את override של B ולכן מודפס B. לעומת זאת קריאות דרך ממשק I מפעילות את המימוש המפורש I.P שב־B ולכן מודפס i. הסדר נותן BiBi.",
        tags: ["polymorphism", "interfaces", "explicit-implementation", "override"],
      },
      {
        id: 6,
        title: "Polymorphic ToString calling virtual method",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `abstract class A
{
    public virtual int F() { return 1; }
    public override string ToString() { return "T" + F(); }
}

class B : A
{
    public override int F() { return 5; }
}

// A a = new B();
// Console.Write(a);`,
        choices: [
          { key: "A", text: "T1" },
          { key: "B", text: "T5" },
          { key: "C", text: "B5" },
          { key: "D", text: "שגיאת קומפילציה" },
        ],
        correctKey: "B",
        explanationHe: "Console.Write(a) קורא ל־a.ToString(). ToString מוגדרת ב־A אך קוראת למתודה virtual F(), ולכן בזמן ריצה תופעל B.F() שמחזירה 5. הפלט: T5.",
        tags: ["polymorphism", "virtual", "override", "ToString"],
      },
      {
        id: 7,
        title: "sealed override: can it be overridden again?",
        promptHe: "לא בחומר: מה נכון לגבי קטע הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual void M() { }
}

class B : A
{
    public sealed override void M() { }
}

class C : B
{
    public override void M() { }
}`,
        choices: [
          { key: "A", text: "הקוד תקין, כי override תמיד מותר" },
          { key: "B", text: "שגיאת קומפילציה: אי אפשר לדרוס מתודה שסומנה sealed" },
          { key: "C", text: "שגיאת זמן ריצה: StackOverflowException" },
          { key: "D", text: "הקוד תקין, אבל תמיד תיקרא B.M" },
        ],
        correctKey: "B",
        explanationHe: "sealed override נועל את המתודה ומונע override נוסף במחלקות יורשות. לכן C לא יכולה להגדיר override ל־M והקומפילציה נכשלת.",
        tags: ["polymorphism", "override", "sealed", "compile-error"],
      },
      {
        id: 8,
        title: "Array covariance: compile-time OK, runtime boom",
        promptHe: "מה יקרה בעת הרצת הקוד הבא?",
        codeLang: "csharp",
        code: `object[] arr = new string[1];
arr[0] = new object();
Console.Write("OK");`,
        choices: [
          { key: "A", text: "יודפס OK" },
          { key: "B", text: "שגיאת קומפילציה" },
          { key: "C", text: "שגיאת זמן ריצה: ArrayTypeMismatchException" },
          { key: "D", text: "שגיאת זמן ריצה: InvalidCastException" },
        ],
        correctKey: "C",
        explanationHe: "מערכים ב־C# הם קו-וריאנטיים, לכן ההשמה string[] → object[] חוקית בקומפילציה. אבל בעת השמה לתוך המערך מתבצעת בדיקה בזמן ריצה, והכנסה של object למערך שמאחסן בפועל string גורמת ל־ArrayTypeMismatchException, לפני שמודפס OK.",
        tags: ["polymorphism", "variance", "arrays", "runtime-error"],
      },
      {
        id: 9,
        title: "Pattern matching with when (type tests + order)",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A { }
class B : A { }
class C : B { }

object o = new C();

switch (o)
{
    case B b when b is C:
        Console.Write("1");
        break;

    case C:
        Console.Write("2");
        break;

    case B:
        Console.Write("3");
        break;

    default:
        Console.Write("4");
        break;
}`,
        choices: [
          { key: "A", text: "1" },
          { key: "B", text: "2" },
          { key: "C", text: "3" },
          { key: "D", text: "4" },
        ],
        correctKey: "A",
        explanationHe: "האובייקט הוא C ולכן הוא גם B. התנאי b is C מתקיים, ולכן ה־case הראשון תופס ומודפס 1. לאחר break לא נבדקים מקרים נוספים.",
        tags: ["polymorphism", "pattern-matching", "is", "switch"],
      },
      {
        id: 10,
        title: "Extension method vs instance method (resolved by static type)",
        promptHe: "לא בחומר: מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `static class Ext
{
    public static void M(this A a) { Console.Write("X"); }
}

class A { }

class B : A
{
    public void M() { Console.Write("B"); }
}

// A a = new B();
// a.M();
// ((B)a).M();`,
        choices: [
          { key: "A", text: "XX" },
          { key: "B", text: "XB" },
          { key: "C", text: "BX" },
          { key: "D", text: "BB" },
        ],
        correctKey: "B",
        explanationHe: "a הוא A מוצהר ולכן אין מתודה מופע M במחלקה A, והקומפיילר יבחר את מתודת ההרחבה Ext.M → מודפס X. לאחר cast ל־B, קיימת מתודת מופע B.M והיא עדיפה על extension method → מודפס B. יחד: XB.",
        tags: ["polymorphism", "extension-methods", "static-binding"],
      },
      {
        id: 11,
        title: "new hides an override: what does a base reference call?",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual void F() { Console.Write("A"); }
}

class B : A
{
    public override void F() { Console.Write("B"); }
}

class C : B
{
    public new void F() { Console.Write("C"); }
}

// B b = new C();
// b.F();`,
        choices: [
          { key: "A", text: "A" },
          { key: "B", text: "B" },
          { key: "C", text: "C" },
          { key: "D", text: "שגיאת קומפילציה" },
        ],
        correctKey: "B",
        explanationHe: "F היא virtual ב־A ונדרסת ב־B. ב־C מוגדרת מתודה חדשה (new) שלא מחליפה את ה־override של הוירטואלית. לכן קריאה דרך מצביע B מפעילה את ה־override של B ומדפיסה B.",
        tags: ["polymorphism", "override", "new", "hiding"],
      },
      {
        id: 12,
        title: "dynamic can reach hidden members",
        promptHe: "לא בחומר: מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual void F() { Console.Write("A"); }
}

class B : A
{
    public override void F() { Console.Write("B"); }
}

class C : B
{
    public new void F() { Console.Write("C"); }
}

// B b = new C();
// dynamic d = b;
// b.F();
// d.F();`,
        choices: [
          { key: "A", text: "BB" },
          { key: "B", text: "BC" },
          { key: "C", text: "CB" },
          { key: "D", text: "CC" },
        ],
        correctKey: "B",
        explanationHe: "b.F() נקבעת כקריאה וירטואלית של B ולכן מודפס B. לעומת זאת d הוא dynamic, ולכן בחירת המתודה מתבצעת בזמן ריצה לפי הטיפוס בפועל C, ונבחרת C.F (ה־new) → מודפס C. יחד: BC.",
        tags: ["polymorphism", "dynamic", "new", "override"],
      },
      {
        id: 13,
        title: "Virtual call from base constructor + field initialization order",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public A() { Print(); }
    protected virtual void Print() { Console.Write("A"); }
}

class B : A
{
    private int x = 7;
    protected override void Print() { Console.Write(x); }
    public B() { }
}

// new B();`,
        choices: [
          { key: "A", text: "0" },
          { key: "B", text: "7" },
          { key: "C", text: "A7" },
          { key: "D", text: "שגיאת קומפילציה" },
        ],
        correctKey: "A",
        explanationHe: "A() קורא למתודה virtual Print(), ולכן בזמן ריצה תופעל B.Print(). אבל בזמן ריצת בנאי A, אתחולי השדות של B עדיין לא בוצעו, ולכן x עדיין בערך ברירת המחדל 0. לכן מודפס 0.",
        tags: ["polymorphism", "virtual", "constructors", "initialization-order"],
      },
      {
        id: 14,
        title: "Virtual property vs new property (three declared types)",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public virtual int X => 1;
}

class B : A
{
    public override int X => 2;
}

class C : B
{
    public new int X => 3;
}

// A a = new C();
// B b = new C();
// C c = new C();
// Console.Write(a.X);
// Console.Write(b.X);
// Console.Write(c.X);`,
        choices: [
          { key: "A", text: "123" },
          { key: "B", text: "223" },
          { key: "C", text: "233" },
          { key: "D", text: "222" },
        ],
        correctKey: "B",
        explanationHe: "ה־virtual של A נדרס ב־B לערך 2. ב־C יש new (הסתרה) ולא override, ולכן דרך מצביעים מסוג A או B נקראת עדיין הגרסה הווירטואלית (של B) ומתקבל 2. דרך מצביע C נקראת הגרסה החדשה ומתקבל 3. יחד: 223.",
        tags: ["polymorphism", "properties", "override", "new"],
      },
      {
        id: 15,
        title: "Downcast: compile-time OK, runtime InvalidCastException",
        promptHe: "מה יקרה בעת הרצת הקוד הבא?",
        codeLang: "csharp",
        code: `class A { }
class B : A
{
    public void M() { Console.Write("B"); }
}

object o = new A();
((B)o).M();`,
        choices: [
          { key: "A", text: "יודפס B" },
          { key: "B", text: "יודפס כלום וההרצה תסתיים בשקט" },
          { key: "C", text: "שגיאת זמן ריצה: InvalidCastException" },
          { key: "D", text: "שגיאת קומפילציה" },
        ],
        correctKey: "C",
        explanationHe: "הקוד מתקמפל כי המרה מ־object ל־B חוקית תחבירית. אבל בפועל o מצביע על אובייקט מטיפוס A שאינו B, ולכן ההמרה תיכשל בזמן ריצה ותיזרק InvalidCastException לפני קריאה ל־M().",
        tags: ["polymorphism", "casting", "runtime-error"],
      },
      {
        id: 16,
        title: "Overload resolution with null: ambiguous call",
        promptHe: "לא בחומר: מה נכון לגבי הקוד הבא?",
        codeLang: "csharp",
        code: `static void F(string s) { Console.Write("S"); }
static void F(System.Text.StringBuilder sb) { Console.Write("B"); }

// F(null);`,
        choices: [
          { key: "A", text: "יודפס S" },
          { key: "B", text: "יודפס B" },
          { key: "C", text: "שגיאת קומפילציה: הקריאה אמביגואית" },
          { key: "D", text: "שגיאת זמן ריצה: NullReferenceException" },
        ],
        correctKey: "C",
        explanationHe: "null מתאים לשתי החתימות (string וגם StringBuilder). מאחר שהטיפוסים אינם ביחסי ירושה זה לזה, אין \"בחירה טובה יותר\" ולכן הקומפיילר מדווח על קריאה אמביגואית.",
        tags: ["polymorphism", "overloading", "null", "compile-error"],
      },
    ];
  window.QUIZ_LABELS = {
    title: "שאלון פולימורפיזם מתקדם ב־C#",
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
  window.renderQuestionnaire({ mountId: "quiz-root", questions: window.QUIZ_QUESTIONS, labels: window.QUIZ_LABELS, revealDelayMs: 250, dir: "rtl" });
</script>
