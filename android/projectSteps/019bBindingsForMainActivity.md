---
layout: page
title: "019b - View Binding ב-MainActivity"
subtitle: "המרת מסך המשחק מ-findViewById ל-View Binding"
tags: [אנדרואיד, Android, View Binding, Java, TicTacToe]
lang: he
---

בשלב הקודם הפעלנו את `View Binding` והמרנו מסך פשוט. כאן נמיר את `MainActivity` של משחק איקס-עיגול. במסך הזה יש גם עדכון רגיל של `EditText`, וגם קוד שמאתר כפתור לפי שורה ועמודה. החלק השני דורש שינוי מחשבתי קטן וחשוב.

המטרה: לא יישארו ב-`MainActivity` קריאות `findViewById`.

## לפני שמתחילים

ודאו ששלב 019a כבר בוצע:

```kotlin
buildFeatures {
    viewBinding = true
}
```

אחרי `Sync Project with Gradle Files`, הקובץ `activity_main.xml` יוצר את המחלקה `ActivityMainBinding`.

## שלב 1 - יצירת ה-binding

פתחו את:

- `app/src/main/java/com/example/tictacmenu/activities/MainActivity.java`

הוסיפו את ה-import ואת השדה:

```diff
-import com.example.tictacmenu.R;
+import com.example.tictacmenu.databinding.ActivityMainBinding;

 public class MainActivity extends AppCompatActivity {
+    private ActivityMainBinding binding;
```

בתחילת `onCreate`, החליפו את טעינת ה-layout:

```diff
-setContentView(R.layout.activity_main);
+binding = ActivityMainBinding.inflate(getLayoutInflater());
+setContentView(binding.getRoot());
```

`binding.getRoot()` הוא ה-View הראשי של `activity_main.xml`; לכן הוא הערך שמעבירים ל-`setContentView`.

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
