# נקודות לעבודה

## פרק 1. בניית האפליקציה הראשונה שלי
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
- `btnAdd = findViewById()` // לשים לב שאנחנו **לא צריכים שום קאסטינג** כיום


### 1.4,5 תגובה ללחיצה על הכפתור
- [קישור לסרטון שמדגים הפעלת אותה פונקציה על שני כפתורים שונים](https://appschoolfront.web.app/course/learn/wmdWWTs17sLTO8N20HtO)

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

## פרק 2.סוגי האזנות בתכנות לאנדרואיד

## פרק 3. סידורי מסך

## פרק 4.תכנות דינאמי
## פרק 5.shared preferences
## פרק 6.מחזור החיים של Activity
## פרק 7.דיאלוג באנדרואיד
## פרק 8.תפריטים באנדרואיד
## פרק 9. אינטנט מפורש
## פרק 10.עבודה מול Intent בצורה מרומזת.
## פרק 11 - קבצים
## פרק 12. זיכרון חיצוני באנדואיד
## פרק 13.סאונד ווידאו
## פרק 14.אנימציות
## פרק 15.ListView
## פדש - פרק 15 ב - RecycleView
## פרק 16.spinner ו- cardstack
## פרק 17. thread
## פרק 18.אנדרואיד Thread
## פרק 19.Service
## פרק 20.Broadcast Reciever
## פרק 20ב. טלפוניה וברודכסט מתקדם
## פרק 21.חיישנים - Sensors
## פרק 22.SQLITE
## פרק 23 .ContentProvider
## פרק 23 ב.אנדרואיד view
## פרק 23 ג.android surface view
## פרק 23 ד.פרויקט רחב היקף
## פרק 24.אנדרואיד http ו - json
## פרק 25.Fragment
## פרק 26.מפות
## פרק 27. פיירבייס firebase
## פ

