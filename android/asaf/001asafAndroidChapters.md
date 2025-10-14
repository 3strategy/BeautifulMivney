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

- **להכין דוגמאות של פניה טיפוסית ל-setOnClickListener**

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

<!-- <details markdown="1"><summary>פירוט והערות</summary>
</details> -->

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


