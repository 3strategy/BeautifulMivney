---
layout: page
title: "019b - View Binding ב-MainActivity"
subtitle: "אתחול בסיסי לשימוש חוזר, ואז המרת מסך המשחק ל-View Binding"
tags: [אנדרואיד, Android, View Binding, Java, TicTacToe]
lang: he
full-width: true
---

<style>
.binding-start-comparison pre,
.binding-start-comparison code {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>

[חזרה ל־019a: הפעלת View Binding והמרת המסך הראשון](/android/projectSteps/019a.BindingInsteadOfFindByID){: data-sequence-nav="prev"}

בשלב הקודם הפעלנו את `View Binding` והמרנו מסך פשוט. כאן מתחילים בשינוי קטן ב־`MainActivity` שאפשר לחזור עליו בפרויקטים חדשים: טוענים את המסך דרך שדה `binding`, מחליפים את `findViewById(R.id.main)` ב־`binding.main`, ומעדכנים את הריווח בקצוות המסך. אחר כך נשתמש ב־binding כדי להמיר את מסך משחק האיקס־עיגול.

המטרה: לא יישארו ב-`MainActivity` קריאות `findViewById`.

## לפני שמתחילים

ודאו ששלב 019a כבר בוצע:

```kotlin
buildFeatures {
    viewBinding = true
}
```

אחרי `Sync Project with Gradle Files`, הקובץ `activity_main.xml` יוצר את המחלקה `ActivityMainBinding`.

## שלב 1 - האתחול הבסיסי של MainActivity

פתחו את `MainActivity` בתצוגת **Android**, תחת `app > kotlin+java > com.example.tictacmenu > activities`.

נקודת המוצא בהשוואה היא הקוד הרגיל של התבנית: `setContentView(R.layout.activity_main)` טוען את המסך, ו־`findViewById(R.id.main)` מאתר את ה־View שעליו מחילים את הריווח. נוסיף שדה `binding` בגוף המחלקה `MainActivity`, **מעל `@Override` ומחוץ ל־`onCreate`**, ונאתחל אותו בתוך המתודה.

הוסיפו את ה־import של הפרויקט:

```java
import com.example.tictacmenu.databinding.ActivityMainBinding;
```

השאירו את ה־import של `R` כל עוד קוד אחר בקובץ משתמש בו.

מוצגת תחילת המתודה בלבד; שאר הקוד ב־`onCreate` ממשיך אחרי `});` ונשאר במקומו. שורות אדומות מוחלפות, שורות ירוקות נוספות, והדגשות הרקע מסמנות את אותן נקודות בקוד בשתי העמודות.

<div class="two-columns before-after binding-start-comparison">
<div markdown="1" class="column">

### לפני

    {% highlight diff mark_lines="2 4" %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
-        setContentView(R.layout.activity_main);
-        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
-            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
-            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    {% endhighlight %}

</div>
<div markdown="1" class="column">

### אחרי

    {% highlight diff mark_lines="4 6" %}
+    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);

+        binding = ActivityMainBinding.inflate(getLayoutInflater());
+        setContentView(binding.getRoot());
+        ViewCompat.setOnApplyWindowInsetsListener(binding.main, (v, insets) -> {
+            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
+            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return insets;
        });
    {% endhighlight %}

</div>
</div>

**מה השתנה?**

1. **מוסיפים שדה ומאתחלים דרכו את המסך.** `private ActivityMainBinding binding;` נמצא מחוץ למתודה, כדי שגם מתודות אחרות באותה Activity יוכלו להשתמש בו אחרי האתחול. בתוך `onCreate`, השורה `binding = ActivityMainBinding.inflate(getLayoutInflater());` יוצרת את רכיבי המסך, ו־`setContentView(binding.getRoot());` מציג את ה־View הראשי שלהם. כך שתי השורות מחליפות את `setContentView(R.layout.activity_main);`. בהשמה בתוך המתודה כותבים `binding =` בלי להכריז שוב על הטיפוס, כדי לא ליצור משתנה מקומי שמסתיר את השדה.
2. **ניגשים ל־View ישירות.** `binding.main` מחליף את `findViewById(R.id.main)` בשורת ה־listener: זהו כבר אובייקט ה־View בעל המזהה `@+id/main`, ולכן אין צורך לחפש אותו.
3. **הריווח מתחשב גם במגרעת המסך.** `systemBars()` מתייחס לפסי המערכת, ו־`displayCutout()` מוסיף התחשבות במגרעת או בחור המצלמה. הסימן `|` משלב את שני סוגי ה־insets, ו־`setPadding` משתמש בתוצאה כדי להרחיק את התוכן מהאזורים האלה. השם `bars` מחליף את `systemBars` גם בהכרזה וגם בשימוש. [הסבר בתיעוד Android](https://developer.android.com/develop/ui/views/layout/edge-to-edge#display-cutout-insets).

{: .box-success}
**לשימוש חוזר בפרויקט חדש:** זהו אותו אתחול בסיסי ל־Activity עם View Binding. התאימו את שם מחלקת ה־binding לקובץ ה־layout ואת `binding.main` למזהה של ה־View שעליו מחילים את הריווח; בדוגמה זו הוא `@+id/main`.

**בדיקה לפני שממשיכים:** הריצו `Build > Make Project`, פתחו את המסך ובדקו שהתוכן אינו מוסתר על ידי פסי המערכת או מגרעת המסך, גם בסיבוב לרוחב. מכאן ממשיכים לשינויים של מסך המשחק.

## שלב 2 - החלפה פשוטה של View יחיד

במתודה `onConnectClick`, אין צורך לחפש את שדה כתובת השרת לפי מזהה:

```diff
-EditText ipEdit = findViewById(R.id.editServerIP);
+EditText ipEdit = binding.editServerIP;
```

אפשר גם להשתמש ישירות ב-`binding.editServerIP`, אבל משתנה מקומי בשם `ipEdit` נשאר קריא ונוח אם משתמשים בו כמה פעמים.

### חיבור כפתור Connect דרך binding

אם ב-`activity_main.xml` הכפתור מכיל listener ישן:

```xml
android:onClick="onConnectClick"
```

הסירו את השורה הזאת מה-XML. לאחר יצירת ה-binding ב-`onCreate`, חברו listener מפורש:

```java
binding.buttonConnect.setOnClickListener(view -> onConnectClick());
```

מאחר שהמתודה כבר אינה נקראת אוטומטית מתוך XML, היא אינה צריכה לקבל `View` ואפשר להפוך אותה לפרטית:

```diff
-public void onConnectClick(View view) {
+private void onConnectClick() {
```

<div markdown="1" class="box-warning">

`android:onClick` מחפש את המתודה לפי שמה בזמן ריצה בתוך ה-`Context` של ה-View. בפרויקט הזה `activity_main.xml` נטען גם על ידי `MainActivity` וגם על ידי `Main2Activity`, אך רק ב-`MainActivity` קיימת המתודה `onConnectClick`. אם ה-layout נטען ב-`Main2Activity`, הלחיצה מסתיימת ב-`IllegalStateException`, אף שאפשר לראות את המתודה בקובץ `MainActivity.java`. listener שמחובר דרך `binding.buttonConnect` קשור במפורש ל-Activity הנכון ונבדק בזמן קומפילציה.

זהו יתרון נוסף של binding: לא רק שניגשים לאובייקט הכפתור בלי `findViewById`, אלא גם מחברים אליו התנהגות מפורשת בלי מנגנון reflection שמבוסס על מחרוזת.

**כלל אצבע:** כאשר `R.id` משמש רק כדי למצוא View באמצעות `findViewById`, בדרך כלל מחליפים את כל פעולת החיפוש בשדה המתאים של `binding`. לעומת זאת, כאשר API דורש במפורש מזהה משאב מסוג `int` — למשל בזיהוי `MenuItem` או בקריאה ל-`FragmentTransaction.replace` — ממשיכים להשתמש ב-`R.id`.
</div>

## העיקרון החשוב: `R.id` הוא מספר, binding הוא אובייקט

לפני ההמרה, `R.id.button00` הוא **מזהה משאב** מסוג `int`. המזהה מתאים לפעולות כמו:

```java
Button button = findViewById(R.id.button00);
```

לעומת זאת, `binding.button00` הוא כבר **האובייקט עצמו**, מסוג `Button`:

```java
Button button = binding.button00;
button.setText("X");
```

לכן אין להחליף את `R.id.button00` ב-`binding.button00` בתוך מקום שמצפה ל-`int`. למשל, המתודה הבאה לא יכולה להמשיך להחזיר `int`:

```java
private int idFor(int row, int col) {
    return binding.button00; // שגיאת קומפילציה: Button אינו int
}
```

זה בדיוק מקור הסימון האדום: binding לא מחזיר את ה-ID של הכפתור, אלא מחזיר את הכפתור. זו בדרך כלל תועלת — אין חיפוש נוסף, אין casting, והטיפוס נבדק בזמן קומפילציה — אך בקוד שבנוי סביב IDs צריך להתאים את סוגי המשתנים והמתודות.

{: .box-note}
**כלל אצבע:** אם הקוד צריך *לבצע פעולה על View*, השתמשו ב-`binding.someView`. אם API חיצוני דורש במפורש מזהה משאב, כגון `int @IdRes`, העבירו לו `R.id.some_view` ולא את שדה ה-binding.

## שלב 3 - כפתור לפי שורה ועמודה

ב-`MainActivity`, הודעה שמגיעה מהשרת כוללת שורה ועמודה. בקוד הישן המתודה `idFor` החזירה מזהה `int`, ואחר כך הקוד חיפש באמצעותו את הכפתור. לאחר מעבר ל-binding, המתודה צריכה להחזיר `Button` ישירות; אין צורך, ואסור, לקרוא שוב ל-`findViewById`.

בצעו את שינויי החלק הזה לפי תמונת הדיפ:

![Diff של מעבר MainActivity ל-View Binding](/assets/img/019/DiffForBindingActivityMain.png)

שימו לב לשלוש ההחלפות המרכזיות בתמונה:

1. `idFor` הופכת ל-`buttonFor` וסוג ההחזרה משתנה מ-`int` ל-`Button`.
2. במקום `int id` ואז `findViewById(id)`, מקבלים מיד `Button target = buttonFor(r, c)`.
3. ב-`resetBoard` המערך הוא `Button[]`, ולכן הלולאה מקבלת `Button` ישירות ולא מזהה.

הערך `null` בסוף `buttonFor` מציין ששילוב שורה/עמודה אינו תא חוקי. זו החלופה המתאימה ל-`return 0` של מתודה שהחזירה `int`.

## בדיקה

1. הריצו `Build > Make Project`.
2. הריצו את האפליקציה ופתחו את מסך המשחק.
3. נסו להתחבר לשרת ולבצע מהלך מקומי.
4. אם מתקבל מהלך מהשרת, ודאו שהכפתור המתאים מתעדכן.
5. ודאו שניצחון או תיקו עדיין מאפסים את כל תשעת הכפתורים.

אם `ActivityMainBinding` מסומן באדום, בצעו Gradle Sync ובדקו שקיים `app/src/main/res/layout/activity_main.xml`.

---

## השיעור הבא

- [019c - View Binding ב-Fragments וב-MenuActivity]({{ '/android/projectSteps/019c.BindingForFragmentsAndMenuActivity' | relative_url }}){: data-sequence-nav="next"}

<!-- gemini-tutor-links:start -->
<div markdown="1" class="hebrew">

## מורה־עזר ב־Gemini

{: .box-note}
[פתחו את Gem: מעבדת TicTacToe: Model, View Binding ועיצוב](https://gemini.google.com/gem/1qSk94HvFDYbgXmtbkEl6GK_FoTZnwjmU?usp=sharing) כדי לקבל רמזים, שאלות אבחון והסברים המתאימים לשלב שבו אתם נמצאים.

</div>
<!-- gemini-tutor-links:end -->
