---
layout: page
title: "אינדקס לחומרי AppSchool"
subtitle: "לא ניתן לשמור קישורים ישירים למקומות באתר"
tags: [אסף]
lang: en
---

{: .box-note}
הסברים והערות שלי לעצמי כהכנה להוראה. בהמשך יתכן שאדגיש סרטונים חשובים יותר ופחות

## פרק 0 התקנה. והערה כללית
- הדגמה על מחשב תלמיד.

{: .box-error}
כיוון שאסף הוסיף פרק 1 התקנה, נוצר מצב שבתפריט שלו, פרק 1 המקורי **ממוספר 2**, וכך גם כל הפרקים ממוספרים בתפריט בספרור מוגדל ב-1. ההתייחסות שלי היא לספרור המקורי כך שמי שמוריד "ספרי קורס" יגיע למספרים הנכונים.

## [פרק 1. תכנות בסיסי](../android01.pdf)

<details markdown="1"><summary>פירוט והערות</summary>
- מתחילים ישר לתוך ה-xml
- הערה כללית - תראו דברים שימושיים שעושים גם כיום. הרבה פעמים ה- **איך עושים** לא יהיה אקטואלי
- חסרה התייחסות לכך שיש אזור JAVA ואזור xml 


### 1.1 Linear Layout - דוגמאות לפקודות עיצוב ב-xml
- orientation="vertical"
- layout_width="match_parent" VS "wrap_content"
- קצת צבעים לדבר על RGB
- והגדרת id לכל אלמנט כדי שנוכל להתחבר
- מתן שם לטקסס שהid שלו יתחיל ב- tvSomething
- והכפתור יתחיל בתחילית btnSomething

### 1.2,1.3 הדגמה בצד הJAVA של הכרזה על כפתורים
- סרטון קצרצר שמראה הכרזה. ניתן להיות עם חפיפה בין שם העצם ל-id
- `btnAdd = findViewById(R.id.theIdAutoCompletes)` // לשים לב שאנחנו **לא צריכים שום קאסטינג** כיום


### 1.4,5 תגובה ללחיצה על הכפתור
- [קישור לAppSchool יש לגשת ידנית ל-2 פרק 1(תכנות בסיסי) שיעור 5](https://appschoolfront.web.app/course/learn/wmdWWTs17sLTO8N20HtO)

<details markdown="1"><summary>example 1</summary>

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    int counter;
    TextView tvDisplay;
    Button btnPlus;
    Button btnMinus;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // XML - התחברות לכפתורים מה
        btnPlus= findViewById(R.id.btnPlus);
        btnMinus= findViewById(R.id.btnMinus);
        tvDisplay= findViewById(R.id.tvDisplay);

        btnPlus.setOnClickListener(this);
        btnMinus.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        if(v==btnPlus)        {
            counter++;
        } else if (v==btnMinus) {
            counter--;
        }
        tvDisplay.setText("Total Points " + counter);
    }
}
```

</details>


<details markdown="1"><summary>simpler way כאשר אין צורך לטפל באופן אחיד במספר כפתורים שונים</summary>

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    // XML - התחברות לכפתורים מה
    etFname = findViewById(R.id.etFname);
    etLname = findViewById(R.id.etLname);
    btnSave = findViewById(R.id.btnSave);
    tvDisplay = findViewById(R.id.tvDisplay);
    
    btnSave.setOnClickListener(v -> {
        tvDisplay.setText(etFname.getText() + " " + etLname.getText());
    });
}
```

</details>

<details markdown="1"><summary>מה מותר ואסור למחוק</summary>

**הסבר פקודות ב-`onCreate` - מה אפשר למחוק ומתי**

1. `super.onCreate(savedInstanceState)`
    ```java
    super.onCreate(savedInstanceState);
    ```
    **מה זה עושה:** קורא לבנאי של המחלקה האב (`AppCompatActivity`)

    **האם אפשר למחוק?** ❌ **לעולם לא!**
    - זו פקודה חובה בכל Activity
    - בלעדיה האפליקציה תקרוס
    - חייבת להיות הפקודה הראשונה ב-`onCreate`


2. `EdgeToEdge.enable(this)`
    ```java
    EdgeToEdge.enable(this);
    ```
    **מה זה עושה:** מפעיל תצוגה מקצה לקצה (edge-to-edge) - התוכן עולה מתחת לסטטוס בר ולניווט בר

    **האם אפשר למחוק?** ✅ **כן, בהחלט**
    - זו תכונה חדשה שנוספה ב-Android Studio החדש (2023+)
    - אם תמחק אותה, האפליקציה תעבוד רגיל עם המרווחים הסטנדרטיים
    - **מתי למחוק:** כשאתה לא רוצה עיצוב edge-to-edge, או כשזה מסבך לך את העיצוב



3. `setContentView(R.layout.activity_main)`
    ```java
    setContentView(R.layout.activity_main);
    ```
    **מה זה עושה:** טוען את קובץ ה-XML של הממשק (layout) למסך

    **האם אפשר למחוק?** ❌ **לא!**
    - בלעדיה לא יהיה לך ממשק משתמש
    - כל ה-`findViewById` יחזירו `null`
    - **חובה** לכל Activity עם ממשק גרפי

    

4. `(...)ViewCompat.setOnApplyWindowInsetsListener`
    ```java
    ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
        Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
        v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
        return insets;
    });
    ```
    **מה זה עושה:** מוסיף padding כדי שהתוכן לא יוסתר על ידי הסטטוס בר/ניווט בר במצב edge-to-edge

    **האם אפשר למחוק?** ✅ **כן, במקרים רבים**

    **מתי למחוק:**
    - אם מחקת את `EdgeToEdge.enable(this)` - אז אין צורך בזה
    - אם הוספת padding ידני ב-XML (בתוך ה-ConstraintLayout עם `android:padding="16dp"`)
    - אם התוכן שלך לא צריך להימנע מהסטטוס בר

    **מתי לשמור:**
    - אם את.ה רוצה edge-to-edge אבל לא רוצה שהתוכן יוסתר
    - אם העיצוב שלך דינמי ומשתנה

    ---


**סיכום מהיר**

| מותר למחוק?| מתי למחוק |
|-------|-----------|
| אף פעם ❌   | `super.onCreate()` | 
|  ❌ אף פעם (אלא אם אין UI) |`setContentView()` |
|  אופציונלי  ✅ edge-to-edge |`EdgeToEdge.enable()` | 
|  אופציונלי  ✅  EdgeToEdge או יש padding ב-XML |  `ViewCompat.setOnApplyWindowInsetsListener()` |
{: .table-rl}

</details>




### 1.6 הדגמת תכונות נוספות של פקדים (ש6 דוגמא 2 חלק 1)
- העתקה של תמונה ל- drawable
- background set to the @drawable
- hint
- layout_margin
- guideline percent
    <details markdown="1"><summary>preferred constraintlayout with guidelines</summary>
        ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            android:id="@+id/main"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            tools:context=".MainActivity">

            <TextView
                android:id="@+id/tvDisplay"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Hello World!"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <Button
                android:id="@+id/btnPlus"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="56dp"
                android:text="Button"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/tvDisplay" />

            <Button
                android:id="@+id/btnMinus"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="56dp"
                android:text="Button"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/btnPlus" />

        </androidx.constraintlayout.widget.ConstraintLayout>
    
        ```
    </details>

- preferred approach for event:
    <details markdown="1"><summary>preferred setOnClickListener</summary>
        ```java
        public class MainActivity extends AppCompatActivity //implements View.OnClickListener
        {

            TextView tvDisplay;
            EditText etFname;
            EditText etLname;
            Button btnSave;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                EdgeToEdge.enable(this);
                setContentView(R.layout.activity_main);
                ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
                    Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
                    v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
                    return insets;
                });

                etFname = findViewById(R.id.etFname);
                etLname = findViewById(R.id.etLname);
                btnSave = findViewById(R.id.btnSave);
                tvDisplay = findViewById(R.id.tvDisplay);

                //btnSave.setOnClickListener(this);
                btnSave.setOnClickListener(v -> {
                    tvDisplay.setText(etFname.getText() + " " + etLname.getText());
                });
            }

        //    @Override
        //    public void onClick(View v) {
        //        if(v==btnSave) {
        //            tvDisplay.setText(etFname.getText() + " " + etLname.getText());
        //        }
        //    }
        }
        ```
        Advantages of lambdas:
        ✅ More concise - no need to implement interface or override method
        ✅ Clearer intent - the action is right where the listener is set
        ✅ No if-statement checks needed
        ✅ Modern Java/Android standard
        ✅ Easier to read and maintain
    </details>

</details>

## [פרק 2.סוגי האזנות בתכנות לאנדרואיד](../android02.pdf)

<details markdown="1"><summary>פירוט והערות</summary>

בפרק, אסף מדגים כיצד ליצור האזנות לפקדים מסוגים שונים. בכל הדוגמאות הטכניקה שלו היא כתיבת פונקציה מלאה, והרפרנס ששולחים הוא `this` שהוא `Activity` כלומר:
1. במחלקה של ה- `Activity` מכריזים על מימוש ממשק `onClickListener` (או באופן כללי `onWhateverListener`)
1. `myObject.setOnSomethingListener(this);`
1. ממשים פונקציה מלאה ובתוכה **שואלים** אם העצם שקיבלנו הוא **כך וכך**, ופועלים בהתאם.

**ברוב המקרים לא נזדקק למימוש מהסוג הזה.**
- ה-`Activity` לא יוגדר ככזה שממש את ה-`listener`
- נשתמש בפונקציות אנונימיות, ונגדיר את התגובה לאירוע ישירות בתוך הקריאה ל-`listener` כפי שמודגם כאן:

<details markdown="1">
<summary>טיפול ישיר באירועים באמצעות פונקציות אנונימיות (Lambda Expressions)</summary>

## פונקציות Lambda בטיפול באירועים

הצורה `v -> { ... }` היא דרך מקוצרת לכתיבת **פונקציה אנונימית** (Lambda Expression) שמטפלת באירועים. (פונקציה אנונימית היא פונקציה עם תוכן אך ללא שם)

במקום לכתוב:
```java
btnSave.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        // קוד
    }
});
```

**כותבים בצורה מקוצרת:**
```java
btnSave.setOnClickListener(v -> {
    tvDisplay.setText(etFname.getText() + " " + etLname.getText());
});
```

### דוגמה עם מספר פרמטרים - ListView

כאשר הפונקציה מקבלת **יותר מפרמטר אחד**, נשתמש בסוגריים סביב כל הפרמטרים:
```java
ListView listView = findViewById(R.id.listView);
TextView tvSelected = findViewById(R.id.tvSelected);

// פונקציה אנונימית עם 4 פרמטרים
listView.setOnItemClickListener((parent, view, position, id) -> {
    // parent - the AdapterView (הרשימה עצמה)
    // view - the View של הפריט שנלחץ
    // position - מיקום הפריט ברשימה (0, 1, 2...)
    // id - מזהה ייחודי של הפריט
    
    String item = (String) parent.getItemAtPosition(position);
    tvSelected.setText("בחרת: " + item + " במיקום " + position);
});
```
### דוגמה עם מספר פונקציה ומספר פרמטרים - SeekBar

כאשר רוצים לקבל **יותר מפרמטר אחד**, נשתמש בסוגריים:

```java
SeekBar seekBar = findViewById(R.id.seekBar);
TextView tvProgress = findViewById(R.id.tvProgress);

seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        // פרמטר 1: seekBar - הפקד עצמו
        // פרמטר 2: progress - הערך הנוכחי
        // פרמטר 3: fromUser - האם השינוי בוצע על ידי המשתמש
        
        tvProgress.setText("ערך: " + progress);
        
        if (fromUser) {
            // פעולה רק אם המשתמש שינה את הערך
            seekBar.setBackgroundColor(Color.BLUE);
        }
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        tvProgress.setText("מתחיל לגעת...");
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        tvProgress.setText("סיים לגעת");
    }
});
```

### הסבר על הפרמטרים:
- **seekBar** - הפקד SeekBar עצמו
- **progress** - מספר שלם המייצג את המיקום הנוכחי (0-100 או לפי הגדרת max)
- **fromUser** - ערך boolean שמציין אם המשתמש הזיז את הסרגל או שהשינוי בוצע בקוד

</details>

    

</details>

## [פרק 3. סידורי מסך](../android03.pdf)

## [פרק 4.תכנות דינאמי](../android04.pdf)

## [פרק 5.shared preferences](../android05.pdf)

## פרק 6.מחזור החיים של Activity

## [פרק 7.דיאלוג באנדרואיד](../android07.pdf)

## [פרק 8.תפריטים באנדרואיד](../android08.pdf)

## [פרק 9. אינטנט מפורש](../android09.pdf)

## [פרק 10.עבודה מול Intent בצורה מרומזת.](../android10.pdf)

## [פרק 11 - קבצים](../android11.pdf)

## [פרק 12. זיכרון חיצוני באנדואיד](../android12.pdf)
## [פרק 13.סאונד ווידאו](../android13.pdf)
## [פרק 14.אנימציות](../android14.pdf)
## [פרק 15.ListView](../android15.pdf)
## פדש - פרק 15 ב - RecycleView
## [פרק 16.spinner ו- cardstack](../android16.pdf)
## [פרק 17. thread](../android17.pdf)
## [פרק 18.אנדרואיד Thread](../android18.pdf)
## [פרק 19.Service](../android19.pdf)
## [פרק 20.Broadcast Reciever](../android20.pdf)
## [פרק 20ב. טלפוניה וברודקסט מתקדם](../android20b.pdf)
## [פרק 21.חיישנים - Sensors](../android21.pdf)
## [פרק 22.SQLITE](../android22.pdf)
## [פרק 23 .ContentProvider](../android23.pdf)
## [פרק 23 ב.אנדרואיד view](../android23b.pdf)
## פרק 23 ג.android surface view
## פרק 23 ד.פרויקט רחב היקף
## פרק 24.אנדרואיד http ו - json
## פרק 25.Fragment
## פרק 26.מפות
## פרק 27. פיירבייס firebase


