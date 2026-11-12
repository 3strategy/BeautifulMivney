---
layout: page
title: "מונה נקודות — אפליקציית Android ראשונה"
subtitle: "עיצוב המסך בגרירה או ב־XML, לחיצות וניקוד ב־Java"
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
2. בקטגוריה **Phone and large screens** (או **Phone and Tablet**, לפי הגרסה), בחרו **Basic Views Activity** ולחצו **Next**.

   ![אריח התבנית Basic Views Activity באשף יצירת הפרויקט]({{ '/assets/img/android-basics/basic-views-activity.png' | relative_url }})

3. תנו לפרויקט שם, למשל `ScoreCounter`. בשדה **Language** בחרו **Java** ולחצו **Finish**.

   ![חלון יצירת פרויקט Basic Views Activity כאשר Java מסומנת בשדה Language]({{ '/assets/img/android-basics/basic-views-java.png' | relative_url }})

4. בחרו בסרגל העליון את האמולטור שהוכן במעבדה, ולחצו **Run ▶**. כשהאפליקציה עולה, לחצו **Next** ואז חזרו בעזרת **Back**. זה נותן לנו בדיקה שנוכל לחזור עליה אחרי השינויים.

{: .box-error}
**האפליקציה המקורית לא עולה?** בדקו שבחרתם את האמולטור של המעבדה ושפתחתם את הפרויקט הנכון. אם מופיעה הודעה אדומה בחלון **Build**, קראו את השגיאה הראשונה עם המורה. ממשיכים לעריכת הקוד אחרי שהתבנית עולה.

### 2. מסדרים את המסך הראשון
{: #layout-editor}

בתצוגת **Android** פתחו **app > res > layout > fragment_first.xml**. הקובץ מתאר את תוכן המסך הראשון. את ההתנהגות שלו נערוך בהמשך ב־`FirstFragment.java`.

המכל החיצוני, `NestedScrollView`, מאפשר למסך לגלול. בתוכו נשתמש ב־`LinearLayout` אנכי. הרכיבים יופיעו מלמעלה למטה לפי הסדר בעץ הרכיבים. בשלב הזה יופיעו תווית המונה ואחריה כפתור **Next**. משאירים לכפתור את המזהה `button_first`, שהקוד הקיים משתמש בו כדי לעבור למסך השני.

**בחרו דרך אחת לבניית המסך.** אפשר לגרור רכיבים ולשנות מאפיינים בעורך הגרפי, או לערוך את ה־XML ישירות. אחרי שסיימתם, המשיכו לשלב 3 המשותף.

<details markdown="1">
<summary>דרך א — גרירה ב־Layout Editor</summary>

**פותחים את העורך.** בחרו **Design** בפינה הימנית העליונה של העורך. ב־**Palette** נמצאים הרכיבים שאפשר לגרור. **Component Tree** מציג מה נמצא בתוך כל מכל ובאיזה סדר. ב־**Attributes** משנים את המאפיינים של הרכיב המסומן. אם אחת החלוניות מקופלת, לחצו על הלשונית שלה.

**מחליפים את המכל הפנימי.** ב־**Component Tree** לחצו לחיצה ימנית על `ConstraintLayout`, בחרו **Convert view…**, סמנו **LinearLayout** ולחצו **Apply**. ההמרה משאירה את הרכיבים הקיימים, כולל **Next**, בתוך המכל. ל־`NestedScrollView` יש מקום למכל אחד ישיר, וההמרה משתמשת במכל שכבר נמצא שם.

![לחיצה ימנית על ConstraintLayout בעץ הרכיבים ובחירה ב־Convert view]({{ '/assets/img/android-basics/score-editor-convert-view.png' | relative_url }})

![בחירת LinearLayout בחלון ההמרה ולחיצה על Apply]({{ '/assets/img/android-basics/score-editor-choose-linear-layout.png' | relative_url }})

סמנו את ה־`LinearLayout`. חפשו ב־**Attributes** את `orientation` ובחרו `vertical`. השאירו את `layout_width` על `match_parent` ושנו את `layout_height` ל־`wrap_content`. חפשו `gravity`, פתחו את קבוצת האפשרויות בשם הזה וסמנו `center_horizontal` כדי למרכז את הרכיבים לרוחב.

![הגדרת המאפיין orientation לערך vertical בחלונית Attributes]({{ '/assets/img/android-basics/score-editor-vertical-orientation.png' | relative_url }})

**גוררים תווית לניקוד.** סמנו בעץ את `textview_first` שמציג את הטקסט לדוגמה, ומחקו אותו עם **Delete**. מתוך **Palette > Common** גררו **TextView** אל שורת ה־`LinearLayout` בעץ. אם התווית מופיעה אחרי `button_first`, גררו את שורת התווית בעץ אל קו ההכנסה שמעל הכפתור.

סמנו את התווית החדשה וקבעו לה את המאפיינים הבאים. בשדה `id` הקלידו את השם בדיוק כפי שמופיע בטבלה, הקישו Enter ואשרו **Refactor** אם מופיע.

| מאפיין ב־Attributes | ערך |
|---:|---:|
| `id` | `textview_score` |
| `layout_width` | `wrap_content` |
| `layout_height` | `wrap_content` |
| `textSize` | `32sp` |
| `text` | רוקנו את הטקסט לדוגמה והקישו Enter |

{: .box-warning}
התווית ריקה בשלב הזה. בשלב 3 קוד ה־Java יציג בה את ה־0.

אפשר להוסיף מעט רווח לפני **Next**. סמנו את `button_first`, חפשו `layout_marginTop` וקבעו `16dp`. עם `wrap_content` רוחב הכפתור נקבע לפי התוכן שלו. חזו מה יקרה אם תשנו את `layout_width` ל־`match_parent`, בדקו בתצוגה והחזירו ל־`wrap_content`.

**משנים את כותרת המסך.** פתחו **app > res > values > strings.xml** ולחצו **Open editor** כדי לפתוח את **Translations Editor**. בשורת `first_fragment_label` לחצו פעמיים על התא בעמודת **Default Value**, הקלידו **מונה נקודות** והקישו Enter.

![הערך מונה נקודות בשורה first_fragment_label בעמודת Default Value]({{ '/assets/img/android-basics/score-editor-translations-editor.png' | relative_url }})

</details>

<details markdown="1">
<summary>דרך ב — עריכה ב־XML</summary>

בחרו **Split** כדי לראות את ה־XML ואת התצוגה המקדימה יחד.

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

</details>

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
**`textviewScore` מסומן באדום?** בדקו שב־`fragment_first.xml` המזהה של התווית הוא בדיוק `textview_score`. בעורך הגרפי בדקו את שדה `id` ב־**Attributes**. שמרו את הפריסה ובדקו אם חלון **Build** מצביע על שגיאה בפריסה. לאחר התיקון הריצו שוב.

{: .box-success}
**נקודת בדיקה.** לחצו **Run**. בסרגל העליון אמורה להופיע הכותרת **מונה נקודות**, ובגוף המסך יופיעו 0 ו־**Next**. עברו למסך השני וחזרו. זו נקודת עצירה טובה בין שני חלקי השיעור.

## חלק ב — כפתורים שמשנים את הניקוד
{: #part-b}

### 4. מחברים כפתור הוספה

<details markdown="1">
<summary>דרך א — גוררים כפתור הוספה</summary>

1. ב־**Design** גררו **Button** מ־**Palette > Common** אל **קו ההכנסה** שבין `textview_score` ל־`button_first` ב־**Component Tree**. בדקו שהכפתור החדש מופיע בתוך ה־`LinearLayout`, לפני **Next**.
2. סמנו את הכפתור החדש. ב־**Attributes** הגדירו `id` לערך `button_plus` ואת `layout_width` ו־`layout_height` ל־`wrap_content`.
3. ליד המאפיין `text` לחצו על סמל בחירת המשאב. בחלון **Pick a Resource** לחצו **+ > String Value**.

   ![בתיבת Pick a Resource פותחים את תפריט הפלוס ובוחרים String Value]({{ '/assets/img/android-basics/score-editor-add-string-value.png' | relative_url }})

4. בשדה **Resource name** הקלידו `score_add`, ובשדה **Resource value** הקלידו **הוספת נקודה**. השאירו את `strings.xml` ואת `values` כפי שהם. לחצו **OK** כדי ליצור את המחרוזת, ואז **OK** בחלון הבחירה כדי לשייך אותה לכפתור.

   ![יצירת משאב score_add עם הטקסט הוספת נקודה]({{ '/assets/img/android-basics/score-editor-score-add-resource.png' | relative_url }})

המחרוזת נשמרת ב־`strings.xml` בשם `score_add`. הכפתור מפנה אליה, כך שאפשר לשנות את הכיתוב במקום אחד.

</details>

<details markdown="1">
<summary>דרך ב — מוסיפים כפתור הוספה ב־XML</summary>

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

</details>

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

הוסיפו כפתור עם המזהה `button_minus` אחרי כפתור ההוספה ולפני **Next**. בחרו דרך והיעזרו בדוגמה של כפתור ההוספה.

<details markdown="1">
<summary>דרך א — גוררים כפתור הפחתה</summary>

גררו **Button** אל קו ההכנסה שבין `button_plus` ל־`button_first`. הגדירו `id` לערך `button_minus` ורוחב וגובה של `wrap_content`. דרך בורר המשאבים של `text` צרו ובחרו מחרוזת בשם `score_subtract` עם הטקסט **הפחתת נקודה**, כמו בשלב 4.

בדקו את סדר הרכיבים בעץ. התווית, שני כפתורי הניקוד ו־**Next** נמצאים כולם באותה רמת הזחה בתוך ה־`LinearLayout`.

![עץ הרכיבים לאחר הגרירה ובו textview_score, כפתורי ההוספה וההפחתה וכפתור Next]({{ '/assets/img/android-basics/score-editor-component-tree.png' | relative_url }})

</details>

<details markdown="1">
<summary>דרך ב — מוסיפים כפתור הפחתה ב־XML</summary>

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

</details>

ב־Java חברו את `binding.buttonMinus` למאזין שיוריד נקודה אחת ויעדכן את התצוגה.

לפני ההרצה, רשמו תחזית. מה יוצג אחרי שלוש לחיצות על הוספה וארבע על הפחתה, מפתיחה חדשה? מה יוצג אחרי לחיצה נוספת על הוספה?

<details markdown="1">
<summary>בדיקה ופתרון להפחתת נקודה ב־Java</summary>

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

**הוסיפו איפוס.** תכננו כפתור שמחזיר את `score` ל־0 ומציג את התוצאה. צרו את הכפתור ואת המחרוזת בעורך הגרפי או ב־XML, ואז חברו מאזין ב־Java. בדקו את האיפוס מניקוד חיובי ומניקוד שלילי. אחרי האיפוס לחצו שוב על הוספה ובדקו שמופיע 1.

<details markdown="1">
<summary>דרך א — גוררים כפתור איפוס</summary>

גררו **Button** בין `button_minus` ל־`button_first`, קבעו `id` לערך `button_reset` ורוחב וגובה של `wrap_content`. צרו ובחרו משאב טקסט בשם `score_reset` עם הערך **איפוס**.

</details>

<details markdown="1">
<summary>דרך ב — מוסיפים כפתור איפוס ב־XML</summary>

ב־`strings.xml` הוסיפו לפני `</resources>`.

```xml
<string name="score_reset">איפוס</string>
```

ב־`fragment_first.xml` הוסיפו את הכפתור אחרי כפתור ההפחתה ולפני **Next**.

```xml
<Button
    android:id="@+id/button_reset"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/score_reset" />
```

</details>

<details markdown="1">
<summary>פתרון למאזין האיפוס ב־Java</summary>

ב־`onViewCreated` הוסיפו את המאזין לפני המאזין של **Next**.

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

[השיעור הבא — בונים את המסכים של Basic Views Activity]({{ '/android/basics/02-from-empty-to-basic-views/' | relative_url }}){: data-sequence-nav="next"}

תרגיל המונה מבוסס על פרק התכנות הבסיסי של אסף אמיר, כפי שהוא מופיע ב[תקצירי AppSchool]({{ '/android/asaf/001asafAndroidChapters' | relative_url }}).
