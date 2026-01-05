---
layout: page
title: שאלון - ירושה ופולימורפיזם
tags: [פולימורפיזם,שאלון, הורשה, אינטרקטיבי,interactive, constructors, בנאי, base, this, בנאים]
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
        title: "Constructors: base() vs base(int)",
        promptHe: "מה יהיה הפלט של קטע הקוד הבא?",
        codeLang: "csharp",
        code: `class A
{
    public A() { Console.Write("1"); }
    public A(int x) { Console.Write("2"); }
}

class B : A
{
    public B(int y) { Console.Write("3"); }

    public B() : base(10)
    {
        Console.Write("4");
    }
}

// B obj = new B();`,
        choices: [
          { key: "A", text: "13" },
          { key: "B", text: "24" },
          { key: "C", text: "31" },
          { key: "D", text: "14" },
        ],
        correctKey: "B",
        explanationHe: "כאשר נוצר אוביקט new B(), מבוצע הבנאי B(). בנאי זה מבצע קריאה מפורשת ל־base(10), אשר מפעילה את הבנאי A(int x) המדפיס \"2\". לאחר סיום בנאי האב, חוזר הביצוע לבנאי B() והוא מדפיס \"4\". הפלט הכולל הוא \"24\".",
        tags: ["constructors", "inheritance"],
      },
      {
        id: 2,
        title: "Field hiding: value vs base.value",
        promptHe: "מה יהיה הפלט של קטע הקוד הבא?",
        codeLang: "csharp",
        code: `class X
{
    protected int value = 5;
    public X()
    {
        this.value++;
    }
}

class Y : X
{
    private int value = 10;
    public Y() // implicit : base()
    {
        this.value++;
        base.value++;
    }

    public void Print()
    {
        Console.Write(value + " " + base.value);
    }
}

// Y y = new Y();
// y.Print();`,
        choices: [
          { key: "A", text: "11 7" },
          { key: "B", text: "10 5" },
          { key: "C", text: "6 12" },
          { key: "D", text: "11 6" },
        ],
        correctKey: "A",
        explanationHe: "הבנאי Y() קורא לבנאי X() (קריאה מרומזת ל־base()), שמעלה את X.value ל־6. לאחר מכן בנאי Y() מעלה את השדה הפרטי Y.value ל־11, ואז base.value++ מעלה את X.value ל־7. ההדפסה מציגה קודם את Y.value ואז את base.value ⇒ \"11 7\".",
        tags: ["fields", "hiding", "base"],
      },
      {
        id: 3,
        title: "Constructor chaining rules: this() vs base()",
        promptHe: "מהי השורה החסרה בתוך הבנאי C(string s) כדי לקבל את הפלט המבוקש?",
        codeLang: "csharp",
        code: `class P
{
    public P()
    {
        Console.Write("P1");
    }
    public P(int i)
    {
        Console.Write("P2");
    }
}

class C : P
{
    public C(string s)
    {
        // בחר את הקריאה הנכונה שתגרום להדפסה P2C1P1C2
        // קוד חסר
        this("text", 1);
        Console.Write("C1");
    }

    public C(string s, int i)
        : base(i)
    {
        Console.Write("C2");
    }
}

// C c = new C("hello");`,
        choices: [
          { key: "A", text: "אין שורה חוקית – הרצף אינו אפשרי" },
          { key: "B", text: "base();" },
          { key: "C", text: "this(\"text\", 1);" },
          { key: "D", text: "P.base();" },
        ],
        correctKey: "A",
        explanationHe: "הרצף P2C1P1C2 אינו אפשרי. ב־C# (וכמו ב־Java), קריאה לבנאי אחר של אותה מחלקה (this(...)) או לבנאי של מחלקת האב (base(...)) חייבת להיות השורה הראשונה בבנאי. הרצף המבוקש מחייב קריאה ל־base() אחרי Console.Write(\"C1\"), דבר שאינו חוקי. לכן אין שורה תקינה שיכולה להפיק את הפלט המבוקש.",
        tags: ["constructors", "this", "base", "rules"],
      },
      {
        id: 4,
        title: "Constructor chaining with this() and base(int)",
        promptHe: "מהי השורה החסרה בבנאי Derived() כדי שקריאה ל־new Derived(5) תדפיס: B1D2D5",
        codeLang: "csharp",
        code: `class Base
{
    public Base(int a)
    {
        Console.Write("B" + a);
    }
}

class Derived : Base
{
    public Derived()
    {
        // קוד חסר
        Console.Write("D2");
    }

    public Derived(int b)
    {
        this();
        Console.Write("D" + b);
    }
}

// new Derived(5);`,
        choices: [
          { key: "A", text: "base(1);" },
          { key: "B", text: "this(1);" },
          { key: "C", text: "base(5);" },
          { key: "D", text: "הקוד יקרוס כי אין בנאי ברירת מחדל ב־Base" },
        ],
        correctKey: "D",
        explanationHe: "ב־C# קריאה ל־base(...) חייבת להופיע ברשימת האתחול של הבנאי (אחרי החתימה), ולא בתוך גוף הבנאי. הבנאי Derived() אינו כולל קריאה כזו, ולכן הקומפיילר מנסה להוסיף קריאה מרומזת ל־base(). אך למחלקה Base אין בנאי ברירת מחדל (ללא פרמטרים), ולכן הקוד אינו מתקמפל כלל. משום כך, התשובה הנכונה היא שהקוד יקרוס (שגיאת קומפילציה).",
        tags: ["constructors", "this", "base", "compile-error"],
      },
      {
        id: 5,
        title: "Constructor chaining: base() calls this(int)",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class Parent
{
    public Parent() : this(0)
    {
        Console.Write("P1");
    }

    public Parent(int x)
    {
        Console.Write("P2");
    }
}

class Child : Parent
{
    public Child() : base()
    {
        Console.Write("C1");
    }
}

// Child c = new Child();`,
        choices: [
          { key: "A", text: "P2P1C1" },
          { key: "B", text: "C1P1P2" },
          { key: "C", text: "P1P2C1" },
          { key: "D", text: "P2C1P1" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה מתחילה ב־Child(), שמפעיל קודם את base() (כלומר Parent()). Parent() קורא דרך אתחול הבנאי ל־this(0), כלומר Parent(int), שמדפיס \"P2\". לאחר מכן Parent() ממשיך ומדפיס \"P1\". לבסוף Child() מדפיס \"C1\". לכן הפלט הוא P2P1C1.",
        tags: ["constructors", "this", "base", "order"],
      },
      {
        id: 6,
        title: "Field hiding + constructor order: base field vs derived field",
        promptHe: "מה יהיה הפלט של קטע הקוד הבא?",
        codeLang: "csharp",
        code: `class M
{
    private int num = 1;

    public M()
    {
        Console.Write("M" + num);
    }
}

class S : M
{
    private int num = 2;

    public S() // implicit : base()
    {
        this.num = 3;
    }

    public void Show()
    {
        Console.Write("S" + num);
    }
}

// S s = new S();
// s.Show();`,
        choices: [
          { key: "A", text: "M1S3" },
          { key: "B", text: "M2S3" },
          { key: "C", text: "M3S3" },
          { key: "D", text: "M1S2" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new S() מפעילה קודם את הבנאי של M (קריאה מרומזת ל־base()), והוא מדפיס את השדה הפרטי שלו num שערכו 1 ⇒ M1. לאחר מכן בנאי S משנה את השדה הפרטי של S (שמסתיר שדה אחר בשם num) ל־3. המתודה Show() משתמשת בשדה של S ולכן מדפיסה S3. הפלט הכולל: M1S3.",
        tags: ["fields", "hiding", "constructors", "order"],
      },
      {
        id: 7,
        title: "Virtual dispatch from base constructor",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class Base
{
    public Base()
    {
        Method();
    }

    public virtual void Method()
    {
        Console.Write("B");
    }
}

class Derived : Base
{
    public Derived()
    {
        // implicit base()
        Console.Write("D");
    }

    public override void Method()
    {
        Console.Write("d");
    }
}

// Base b = new Derived();`,
        choices: [
          { key: "A", text: "dD" },
          { key: "B", text: "dB" },
          { key: "C", text: "BD" },
          { key: "D", text: "B" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new Derived() מפעילה קודם את הבנאי של Base. בתוך Base() מתבצעת קריאה למתודה וירטואלית Method(). ב־C#, קריאה למתודה וירטואלית מתבצעת לפי הטיפוס בפועל של האוביקט, גם מתוך בנאי האב, ולכן מתבצעת Method() של Derived ומודפס 'd'. לאחר סיום בנאי Base, הביצוע חוזר לבנאי Derived שמדפיס 'D'. לכן הפלט הוא dD.",
        tags: ["polymorphism", "virtual", "override", "constructors"],
      },
      {
        id: 8,
        title: "Constructor order: this() vs base() output constraints",
        promptHe: "מהי השורה החסרה בבנאי B(string s) כדי שקריאה ל־new B(10) תדפיס: acb",
        codeLang: "csharp",
        code: `class A
{
    public A()
    {
        Console.Write("a");
    }
}

class B : A
{
    public B(string s)
    {
        // קוד חסר
        Console.Write("b");
    }

    public B(int i)
    {
        this("text");
        Console.Write("c");
    }
}

// new B(10);`,
        choices: [
          { key: "A", text: "אין שורה חוקית – הרצף אינו אפשרי" },
          { key: "B", text: "this(1);" },
          { key: "C", text: "base();" },
          { key: "D", text: "A.base();" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new B(10) מפעילה את B(int), הקורא ל־this(\"text\") כלומר ל־B(string). בנאי B(string) מפעיל תמיד קודם את base() המדפיס 'a', ואז מדפיס 'b'. לאחר החזרה ל־B(int) מודפס 'c'. לכן הפלט האפשרי הוא תמיד 'abc'. לא ניתן לקבל 'acb' משום ש־'c' מודפס רק לאחר סיום B(string), כלומר אחרי 'b'.",
        tags: ["constructors", "this", "base", "order"],
      },
      {
        id: 9,
        title: "Rules for calling base constructors",
        promptHe: "איזו הגבלה נכונה לגבי שימוש בקריאה `(...)base:` כדי לקרוא לבנאי של מחלקת האב ב־C#?",
        codeLang: "csharp",
        code: `// שאלה עיונית – אין קטע קוד להרצה`,
        choicesDir: "rtl",
        choices: [
          { key: "A", text: "ניתן להשתמש ב־`(...)base:` רק אם למחלקת האב יש בנאי ברירת מחדל (ללא פרמטרים)." },
          { key: "B", text: "הקריאה ל־`(...)base:` חייבת להופיע בחתימת הבנאי (כותרת הבנאי) של מחלקת הבן, ולא בתוך גוף הבנאי." },
          { key: "C", text: "ניתן להשתמש ב־`(...)base:` בתוך כל מתודה במחלקת הבן, לא רק בבנאים." },
          { key: "D", text: "ניתן להשתמש ב־`(...)base:` רק אם לא משתמשים ב־`(...)this:` באותו בנאי." },
        ],
        correctKey: "B",
        explanationHe: "ב־C# קריאה לבנאי של מחלקת האב מתבצעת אך ורק באמצעות `(...)base:` כחלק מחתימת הבנאי (אחרי שם הבנאי והפרמטרים). לא ניתן לקרוא ל־base מתוך גוף הבנאי, ולא מתוך מתודה רגילה. בנוסף, בכל בנאי ניתן לבצע קריאת אתחול אחת בלבד – או ל־`(...)base:` או ל־`(...)this:`.",
        tags: ["constructors", "rules", "base"],
      },
      {
        id: 10,
        title: "this(b, c) then base(b*c): tracing constructor output",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class F
{
    public F(int a)
    {
        Console.Write("F" + a);
    }
}

class G : F
{
    public G(int b) : this(b, 1)
    {
        Console.Write("G" + b);
    }

    public G(int b, int c) : base(b * c)
    {
        Console.Write("g" + c);
    }
}

// G obj = new G(2);`,
        choices: [
          { key: "A", text: "F2g1G2" },
          { key: "B", text: "g1G2F2" },
          { key: "C", text: "G2g1F2" },
          { key: "D", text: "F4g1G2" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new G(2) מפעילה את G(int b), אשר קורא ל־this(2, 1) כלומר ל־G(int b, int c). הבנאי G(b,c) קורא ל־base(b*c) כלומר F(2) שמדפיס F2, ואז מדפיס g1. לאחר החזרה לבנאי G(b) מודפס G2. לכן הפלט הוא F2g1G2.",
        tags: ["constructors", "this", "base", "order"],
      },
      {
        id: 11,
        title: "this() inside base constructor chain",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class Root
{
    public Root()
    {
        Console.Write("R");
    }

    public Root(int i) : this()
    {
        Console.Write("O");
    }
}

class Branch : Root
{
    public Branch(int j) : base(j)
    {
        Console.Write("B");
    }
}

// Branch b = new Branch(5);`,
        choices: [
          { key: "A", text: "ROB" },
          { key: "B", text: "B" },
          { key: "C", text: "ORB" },
          { key: "D", text: "RBO" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new Branch(5) מפעילה את Branch(int), שקורא ל־base(5) כלומר Root(int). Root(int) קורא ל־this() כלומר Root(), שמדפיס 'R'. לאחר מכן Root(int) ממשיך ומדפיס 'O'. לבסוף Branch(int) מדפיס 'B'. לכן הפלט הכולל הוא ROB.",
        tags: ["constructors", "this", "base", "order"],
      },
      {
        id: 12,
        title: "Field hiding vs method dispatch",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class Base
{
    public int x = 10;
    public void PrintX()
    {
        Console.Write(x + " ");
    }
}

class Derived : Base
{
    public int x = 20; // הסתרת משתנה

    public Derived()
    {
        PrintX();
        base.PrintX();
    }
}

// Derived d = new Derived();`,
        choices: [
          { key: "A", text: "10 10" },
          { key: "B", text: "20 20" },
          { key: "C", text: "10 20" },
          { key: "D", text: "20 10" },
        ],
        correctKey: "A",
        explanationHe: "המתודה PrintX() אינה נדרסת ב־Derived אלא רק השדה x מוסתר. לכן שתי הקריאות (גם PrintX() וגם base.PrintX()) מפעילות את Base.PrintX(). בתוך המתודה Base.PrintX() הגישה לשדה x היא תמיד לשדה של Base שערכו 10. לכן הפלט הוא 10 10. אילו PrintX הייתה נדרסת, הפלט היה שונה.",
        tags: ["fields", "hiding", "methods", "polymorphism"],
      },
      {
        id: 13,
        title: "Getter from base vs hidden field in derived",
        promptHe: "מה יהיה הפלט של הקוד הבא?",
        codeLang: "csharp",
        code: `class M
{
    private int x = 1;
    public int GetX()
    {
        return x;
    }
}

class N : M
{
    private int x = 2;

    public N()
    {
        Console.Write(GetX() + " " + this.x);
    }
}

// N n = new N();`,
        choices: [
          { key: "A", text: "1 2" },
          { key: "B", text: "2 2" },
          { key: "C", text: "1 1" },
          { key: "D", text: "2 1" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה ל־GetX() מתבצעת בבנאי של N, אך המתודה GetX() מוגדרת במחלקת האב M ואינה נדרסת. לכן היא מחזירה את השדה x של M שערכו 1. הביטוי this.x מתייחס לשדה x של N שערכו 2. לכן הפלט הוא \"1 2\".",
        tags: ["fields", "hiding", "methods", "inheritance"],
      },
      {
        id: 14,
        title: "Setting base field via base(int) before derived assignment",
        promptHe: "מהי השורה החסרה בבנאי SubData() כדי שקריאה ל־new SubData(5) תגרום ל־Data.val להיות 4 ול־SubData.val להיות 5",
        codeLang: "csharp",
        code: `class Data
{
    private int val = 1;

    public Data(int v)
    {
        val = v;
    }

    public Data() : this(2)
    {
    }
}

class SubData : Data
{
    private int val = 3;

    public SubData() : ___ // קוד חסר
    {

    }

    public SubData(int x)
    {
        this();
        this.val = x;
    }
}

// new SubData(5);`,
        choices: [
          { key: "A", text: "base(4);" },
          { key: "B", text: "this(4);" },
          { key: "C", text: "base(5);" },
          { key: "D", text: "base();" },
        ],
        correctKey: "A",
        explanationHe: "הקריאה new SubData(5) מפעילה את SubData(int), שקורא ל־this() כלומר ל־SubData(). הבנאי SubData() חייב לקרוא ל־base(4) כדי להציב את Data.val לערך 4. לאחר החזרה ל־SubData(int), מתבצעת השמה this.val = 5, שמעדכנת את השדה של SubData בלבד. כך מתקבל Data.val = 4 ו־SubData.val = 5.",
        tags: ["constructors", "this", "base", "fields"],
      },
    ];
  window.QUIZ_LABELS = {
    title: "שאלון ירושה ב-C#",
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

