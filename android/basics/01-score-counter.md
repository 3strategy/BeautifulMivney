---
layout: page
title: "מונה נקודות — אפליקציית Android ראשונה"
subtitle: "מסך ב־XML, לחיצות וניקוד ב־Java"
permalink: /android/basics/01-score-counter/
menu_set: android
lang: he
full-width: true
tags: [Android, Java, XML, View Binding, מתחילים]
---

{: .box-success}
בסוף השיעור תוכלו להריץ באמולטור מונה נקודות משלכם. לחיצה אחת תוסיף נקודה ולחיצה אחרת תפחית נקודה. תוכלו גם להראות איפה המספר נשמר בקוד ואיזו שורה מעדכנת אותו על המסך.

| זמן בכיתה | מה בונים | איך יודעים שהצלחנו |
|---:|---:|---:|
| 45 דקות ראשונות | פותחים פרויקט במעבדה ובונים תצוגת ניקוד | המסך הראשון מציג 0, ו־Next עדיין פותח את המסך השני |
| 45 דקות נוספות | מחברים את כפתור ההוספה ומוסיפים כפתור הפחתה | שלוש לחיצות על הוספה וארבע על הפחתה מביאות ל־‎−1 |
| אם יש עוד 45 דקות | מוסיפים כפתור איפוס ובודקים איך המסך מתעדכן | אפשר לחזור ל־0 ולהמשיך לספור בלחיצה הבאה |

## חלק א — מהתבנית למסך הניקוד
{: #part-a}

### 1. פותחים ומריצים פרויקט

1. ב־Android Studio בחרו **New Project**. אם כבר פתוח פרויקט, השתמשו ב־**File > New > New Project**.
2. בקטגוריה **Phone and Tablet**, בחרו **Basic Views Activity** ולחצו **Next**.

   ![אריח התבנית Basic Views Activity באשף יצירת הפרויקט]({{ '/assets/img/android-basics/basic-views-activity.png' | relative_url }})

3. תנו לפרויקט שם, למשל `ScoreCounter`. בשדה **Language** בחרו **Java** ולחצו **Finish**.

   ![חלון יצירת פרויקט Basic Views Activity כאשר Java מסומנת בשדה Language]({{ '/assets/img/android-basics/basic-views-java.png' | relative_url }})

4. בחרו בסרגל העליון את האמולטור שהוכן במעבדה, ולחצו **Run ▶**. כשהאפליקציה עולה, לחצו **Next** ואז חזרו בעזרת **Back**. זה נותן לנו בדיקה שנוכל לחזור עליה אחרי השינויים.

{: .box-error}
**האפליקציה המקורית לא עולה?** בדקו שבחרתם את האמולטור של המעבדה ושפתחתם את הפרויקט הנכון. אם מופיעה הודעה אדומה בחלון **Build**, קראו את השגיאה הראשונה עם המורה. ממשיכים לעריכת הקוד אחרי שהתבנית עולה.

### 2. מסדרים את המסך הראשון

בתצוגת **Android** פתחו **app > res > layout > fragment_first.xml**. בחרו **Split** כדי לראות את ה־XML ואת התצוגה המקדימה יחד. הקובץ מתאר את תוכן המסך הראשון. את ההתנהגות של המסך נערוך בהמשך ב־`FirstFragment.java`.

המכל החיצוני, `NestedScrollView`, מאפשר למסך לגלול. בתוכו נשתמש ב־`LinearLayout` אנכי. הרכיבים יופיעו מלמעלה למטה לפי סדר הכתיבה שלהם. בתוך המכל יופיעו המספר ואז כפתור **Next** של התבנית. משאירים לכפתור את המזהה `button_first`, שהקוד הקיים משתמש בו כדי לעבור למסך השני.

ערכו רק את המכל הפנימי לפי ההשוואה. שורות עם `+` הן שורות להוספה, ושורות עם `-` הן שורות להסרה. הסימנים עצמם שייכים להשוואה.

```diff
     tools:context=".FirstFragment">

-    <androidx.constraintlayout.widget.ConstraintLayout
+    <LinearLayout
         android:layout_width="match_parent"
-        android:layout_height="match_parent"
+        android:layout_height="wrap_content"
+        android:gravity="center_horizontal"
+        android:orientation="vertical"
         android:padding="16dp">
+
+        <TextView
+            android:id="@+id/textview_score"
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:textSize="32sp"
+            tools:text="0" />

         <Button
             android:id="@+id/button_first"
             android:layout_width="wrap_content"
             android:layout_height="wrap_content"
-            android:text="@string/next"
-            app:layout_constraintBottom_toTopOf="@id/textview_first"
-            app:layout_constraintEnd_toEndOf="parent"
-            app:layout_constraintStart_toStartOf="parent"
-            app:layout_constraintTop_toTopOf="parent" />
-
-        <TextView
-            android:id="@+id/textview_first"
-            android:layout_width="wrap_content"
-            android:layout_height="wrap_content"
             android:layout_marginTop="16dp"
-            android:text="@string/lorem_ipsum"
-            app:layout_constraintBottom_toBottomOf="parent"
-            app:layout_constraintEnd_toEndOf="parent"
-            app:layout_constraintStart_toStartOf="parent"
-            app:layout_constraintTop_toBottomOf="@id/button_first" />
-    </androidx.constraintlayout.widget.ConstraintLayout>
+            android:text="@string/next" />
+    </LinearLayout>
 </androidx.core.widget.NestedScrollView>
```

מצאו ב־Split את `textview_score` ואת `button_first`. `wrap_content` נותן לפקד רוחב לפי התוכן שלו. `match_parent` נותן לו את הרוחב שהמכל מעמיד לרשותו. נבאו מה יקרה לרוחב הכפתור **Next** בשינוי הבא, ואז בדקו ב־Split.

{% code_diff %}
         <Button
             android:id="@+id/button_first"
-            android:layout_width="wrap_content"
+            android:layout_width="match_parent"
             android:layout_height="wrap_content"
{% endcode_diff %}

החזירו את הרוחב ל־`wrap_content` לפני שממשיכים.

{: .box-warning}
`tools:text="0"` מיועד לתצוגה המקדימה בעורך. כדי שה־0 יופיע גם באמולטור, נציג את ערכו של המשתנה מתוך Java.

ב־**app > res > values > strings.xml** שנו את הערך של `first_fragment_label`. זו הכותרת שמופיעה בסרגל העליון של המסך הראשון.

{% code_diff %}
     <!-- Strings used for fragments for navigation -->
-    <string name="first_fragment_label">First Fragment</string>
+    <string name="first_fragment_label">מונה נקודות</string>
     <string name="second_fragment_label">Second Fragment</string>
{% endcode_diff %}

### 3. מציגים את ערך הפתיחה מתוך Java
{: #initial-score}

פתחו **app > kotlin+java > החבילה של הפרויקט > FirstFragment**. בתבנית כבר יש משתנה בשם `binding`. הוא נותן לקוד גישה לפקדים מהפריסה. המזהה `textview_score` ב־XML מופיע בקוד בתור `binding.textviewScore`. את יצירת ה־binding ואת קוד ההכנה של התבנית נלמד בהמשך.

הוסיפו שדה בשם `score` מתחת לשדה `binding`. השדה מחזיק את הניקוד גם בין לחיצות.

```diff
 public class FirstFragment extends Fragment {

     private FragmentFirstBinding binding;
+    private int score = 0;

     @Override
```

הוסיפו את `showScore()` כמתודה נפרדת, מעל `onDestroyView`.

```diff
         );
     }

+    /** Displays the current score in the fragment's text view. */
+    private void showScore() {
+        binding.textviewScore.setText(String.valueOf(score));
+    }
+
     @Override
     public void onDestroyView() {
```

`String.valueOf(score)` ממירה את המספר לטקסט. `setText` מציגה אותו בתוך ה־`TextView`. הקריאה `setText(score)` עם מספר שלם הייתה גורמת ל־Android לחפש משאב טקסט לפי המספר הזה.

בתוך `onViewCreated`, מיד אחרי השורה שמתחילה ב־`super`, קראו ל־`showScore()`. בשלב הזה הפקדים כבר קיימים, ואפשר להציג את ערך הפתיחה.

```diff
     public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
         super.onViewCreated(view, savedInstanceState);
+        showScore();

         binding.buttonFirst.setOnClickListener(v ->
```

{: .box-error}
**`textviewScore` מסומן באדום?** בדקו שב־`fragment_first.xml` כתבתם בדיוק `android:id="@+id/textview_score"`. שמרו את ה־XML ובדקו אם חלון **Build** מצביע על שגיאה בפריסה. לאחר התיקון הריצו שוב.

{: .box-success}
**נקודת בדיקה.** לחצו **Run**. בסרגל העליון אמורה להופיע הכותרת **מונה נקודות**, ובגוף המסך יופיעו 0 ו־**Next**. עברו למסך השני וחזרו. זו נקודת עצירה טובה בין שני חלקי השיעור.

## חלק ב — כפתורים שמשנים את הניקוד
{: #part-b}

### 4. מחברים כפתור הוספה

ב־`strings.xml` הוסיפו את מחרוזת הכפתור לפני `</resources>`.

```diff
+    <string name="score_add">הוספת נקודה</string>
 </resources>
```

ב־`fragment_first.xml` הוסיפו כפתור **בתוך** ה־`LinearLayout`, בין הטקסט של הניקוד לכפתור **Next**.

```diff
+        <Button
+            android:id="@+id/button_plus"
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/score_add" />
+
         <Button
             android:id="@+id/button_first"
```

ב־`FirstFragment.java` הוסיפו את מאזין הלחיצה בתוך `onViewCreated`, לפני המאזין הקיים של **Next**.

```diff
         showScore();

+        binding.buttonPlus.setOnClickListener(v -> {
+            score++;
+            showScore();
+        });
+
         binding.buttonFirst.setOnClickListener(v ->
```

`setOnClickListener` רושמת את הפעולה שתופעל כשלוחצים על הכפתור. Android מעבירה ל־`v` את הפקד שנלחץ. כאן הקוד כבר משויך לכפתור ההוספה, ואפשר לבצע את שתי הפעולות ישירות. קודם `score++` מגדילה את הניקוד, ואז `showScore()` מציגה את הערך החדש.

{: .box-success}
**נקודת בדיקה.** בהרצה חדשה ראו 0. לחצו שלוש פעמים על **הוספת נקודה** ובדקו שהערך מתקדם דרך 1 ו־2 עד 3. לפני שאתם ממשיכים, הצביעו על שורת הקוד שמטפלת בכל אחד משני הדברים שקרו בלחיצה.

### 5. מוסיפים כפתור הפחתה בעצמכם

הוסיפו מחרוזת בשם `score_subtract` עם הטקסט **הפחתת נקודה**. הוסיפו כפתור עם המזהה `button_minus` אחרי כפתור ההוספה ולפני **Next**. ב־Java חברו את `binding.buttonMinus` למאזין שיוריד נקודה אחת ויעדכן את התצוגה. חזרו לדוגמה של כפתור ההוספה אם נתקעתם.

לפני ההרצה, רשמו תחזית. מה יוצג אחרי שלוש לחיצות על הוספה וארבע על הפחתה, מפתיחה חדשה? מה יוצג אחרי לחיצה נוספת על הוספה?

<details markdown="1">
<summary>בדיקה ופתרון להפחתת נקודה</summary>

```diff
     <string name="score_add">הוספת נקודה</string>
+    <string name="score_subtract">הפחתת נקודה</string>
 </resources>
```

```diff
+        <Button
+            android:id="@+id/button_minus"
+            android:layout_width="wrap_content"
+            android:layout_height="wrap_content"
+            android:text="@string/score_subtract" />
+
         <Button
             android:id="@+id/button_first"
```

```diff
+        binding.buttonMinus.setOnClickListener(v -> {
+            score--;
+            showScore();
+        });
         binding.buttonFirst.setOnClickListener(v ->
```

אחרי רצף הלחיצות הראשון יופיע ‎−1. ההוספה הבאה תחזיר את התצוגה ל־0. שני המאזינים משנים את אותו השדה וקוראים לאותה מתודת תצוגה.

</details>

## חלק ג — מפגש נוסף כשיש זמן

**הוסיפו איפוס.** תכננו כפתור שמחזיר את `score` ל־0 ומציג את התוצאה. בנו אותו באותו סדר: מחרוזת, כפתור ב־XML, מאזין ב־Java. בדקו את האיפוס מניקוד חיובי ומניקוד שלילי. אחרי האיפוס לחצו שוב על הוספה ובדקו שמופיע 1.

<details markdown="1">
<summary>פתרון לכפתור האיפוס</summary>

ב־`strings.xml` הוסיפו לפני `</resources>`:

```xml
<string name="score_reset">איפוס</string>
```

ב־`fragment_first.xml` הוסיפו את הכפתור אחרי כפתור ההפחתה ולפני **Next**:

```xml
<Button
    android:id="@+id/button_reset"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/score_reset" />
```

ב־`onViewCreated` הוסיפו את המאזין לפני המאזין של **Next**:

```java
binding.buttonReset.setOnClickListener(v -> {
    score = 0;
    showScore();
});
```

</details>

**ניסוי קצר.** מה יקרה אם לחיצה על הפחתה תשנה את `score`, אבל תדלג על `showScore()`? הפכו זמנית את הקריאה בתוך המאזין של ההפחתה להערה. התחילו מ־0, לחצו פעמיים על הפחתה ואז פעם אחת על הוספה. רשמו מה הוצג בכל צעד והסבירו איך קיבלתם את המספר האחרון. החזירו את הקריאה והריצו שוב.

{% code_diff %}
         binding.buttonMinus.setOnClickListener(v -> {
             score--;
-            showScore();
+            // showScore();
         });
{% endcode_diff %}

<details markdown="1">
<summary>מה צפוי בניסוי?</summary>

אחרי שתי לחיצות על הפחתה עדיין מוצג 0, אבל `score` כבר שווה ‎−2. ההוספה הבאה משנה אותו ל־‎−1 וקוראת ל־`showScore()`, ולכן עכשיו המסך מציג ‎−1.

</details>

תרגיל המונה מבוסס על פרק התכנות הבסיסי של אסף אמיר, כפי שהוא מופיע ב[תקצירי AppSchool]({{ '/android/asaf/001asafAndroidChapters' | relative_url }}).
