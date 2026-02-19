---
layout: page
title: "שכפול Activity והוספה לתפריט"
subtitle: "הכנת Main2Activity נקי לקראת Firebase RTDB"
tags: [אנדרואיד, Activity, Drawer, Menu, Manifest, Git, Firebase, RTDB]
lang: he
---

{: .box-note}
מדריך זה הוא **שלב הכנה** בלבד. המטרה: ליצור עותק של משחק ה-TicTacToe, להשאיר את הגרסה עם SignalR כמו שהיא, ולהכין מסך חדש ונקי לקראת עבודה עם Firebase RTDB.

במילים פשוטות:
- `MainActivity` נשאר המסך של SignalR.
- `Main2Activity` יהיה המסך החדש שעליו נבנה RTDB בהמשך.

---

## שלב 1 - שכפול `MainActivity` ל-`Main2Activity`

השכפול נעשה דרך ה-UI של Android Studio (לא ידנית דרך Explorer):

1. בתצוגת `Project`, עמדו על `MainActivity.java`.
2. בצעו `Copy` ואז `Paste` באותה תיקיה (`activities`).
3. תנו שם חדש: `Main2Activity`.
4. ודאו שגם שם הקלאס בקובץ השתנה ל-`Main2Activity`.

{: .box-warning}
אם Android Studio לא שינה אוטומטית את שם הקלאס בתוך הקובץ, תקנו ידנית כדי ששם הקובץ ושם המחלקה יתאימו בדיוק.

### בדיקת הרגל עבודה

הריצו `Build + Run` כבר עכשיו.

---

## שלב 2 - הוספה ל-Manifest

כעת נוסיף גם את ה-Activity החדש ל-`AndroidManifest.xml`.

`app/src/main/AndroidManifest.xml`

{% highlight diff xml %}
<application
    ...>

    <activity
+        android:name=".activities.Main2Activity"
+        android:exported="false" />
+
    <activity
        android:name=".activities.MainActivity"
        android:exported="false" />

</application>
{% endhighlight %}

{: .box-note}
אם אצלכם ה-package שונה או שהמחלקות לא יושבות בתיקיית `activities`, התאימו את הנתיב.

### בדיקה + Git

1. `Build + Run`
2. ודאו שאין שגיאות Manifest.
3. בצעו `Commit, Push` (גם אם יש warnings לא קריטיים).

---

## שלב 3 - הוספת `Main2Activity` לתפריט המגירה (Drawer)

המטרה עכשיו: מהתפריט נוכל להפעיל גם `MainActivity` וגם `Main2Activity`.

### 3.1 עדכון `menu_drawer.xml`

`app/src/main/res/menu/menu_drawer.xml`

{% highlight diff xml %}
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/nav_home"
        android:title="@string/menu_home" />

    <item
        android:id="@+id/nav_local_game"
        android:title="@string/menu_local_game" />

+    <item
+        android:id="@+id/nav_rtdb_prep"
+        android:title="@string/menu_rtdb_prep" />
+
    <item
        android:id="@+id/nav_profile"
        android:title="@string/menu_profile" />

</menu>
{% endhighlight %}

### 3.2 עדכון `strings.xml`

`app/src/main/res/values/strings.xml`

{% highlight diff xml %}
<resources>
    ...
    <string name="menu_local_game">Local Game</string>
+    <string name="menu_rtdb_prep">RTDB Game (Prep)</string>
    <string name="menu_profile">Profile</string>
</resources>
{% endhighlight %}

### 3.3 ניתוב הפריט החדש ב-`MenuActivity`

`app/src/main/java/com/example/tictacmenu/shell/MenuActivity.java`

{% highlight diff %}
 import android.content.Intent;
 ...
+import com.example.tictacmenu.activities.Main2Activity;

 navigationView.setNavigationItemSelectedListener(item -> {
     if (item.getItemId() == R.id.nav_home) {
         showFragment(new HomeFragment());
     } else if (item.getItemId() == R.id.nav_local_game) {
         startActivity(new Intent(this, MainActivity.class));
+    } else if (item.getItemId() == R.id.nav_rtdb_prep) {
+        startActivity(new Intent(this, Main2Activity.class));
     } else if (item.getItemId() == R.id.nav_profile) {
         showFragment(new ProfileFragment());
     }
     drawerLayout.closeDrawer(GravityCompat.START);
     return true;
 });
{% endhighlight %}

### בדיקה + Git

1. `Build + Run`
2. ודאו שבתפריט יש 2 מסכי משחק וששניהם נפתחים.
3. בצעו `Commit, Push`.

{: .box-success}
בנקודה הזו יש לכם דוגמה מתועדת ב-Git של "איך מוסיפים Activity חדש למערכת התפריט".

---

## שלב 4 - בדיקה האם שני המסכים משתמשים באותו XML

זו בדיקת ידע חשובה:

1. פתחו מהתפריט את שני המסכים.
2. אם שניהם נראים אותו דבר, זה הגיוני: בדרך כלל שניהם עושים `setContentView(R.layout.activity_main)`.
3. אם הם נראים אחרת, גם מצוין, פשוט תדעו למה (למשל layout אחר או שינוי שכבר נעשה).

{: .box-note}
אין צורך "לתקן בכוח" אם שניהם משתמשים באותו XML. זה תקין לגמרי לשלב הכנה.

---

## שלב 5 - ניקוי SignalR מתוך `Main2Activity` (ידני, לפי היסטוריה)

כאן מתחילים להחזיר את `Main2Activity` למצב מוקדם יותר, לפני SignalR.

### מה עושים

1. פתחו את היסטוריית הגרסאות של `MainActivity`.
2. מצאו גרסה מלפני מדריך 016 (SignalR), למשל סביב 015.
3. העתיקו משם את הקוד של `MainActivity`.
4. הדביקו אל `Main2Activity`.
5. ודאו ששם המחלקה נשאר `Main2Activity`.

### מה אמור להיעלם מהעותק החדש

`Main2Activity` לא אמור לכלול יותר קוד SignalR.

{% highlight diff %}
-import com.example.tictacmenu.services.SignalRService;
-import android.util.Log;
-import android.widget.EditText;
...
-private final SignalRService signalRService = new SignalRService();
...
-public void onConnectClick(View view) {
-    // התחברות ל-hub
-}
...
-@Override
-public void onReceiveKey(String key) {
-    // טיפול במהלך שהגיע מרשת
-}
{% endhighlight %}

במקום זאת, `Main2Activity` צריך להיות מסך משחק לוקאלי ונקי שעליו נבנה RTDB בהמשך.

### בדיקה בסיום

1. `Build + Run`
2. פתחו מהתפריט את `MainActivity` (SignalR) וגם את `Main2Activity` (הכנה ל-RTDB).
3. ודאו ששניהם נפתחים ושאין קריסה.

---

## סיכום

יצרנו הפרדה טובה בין שני מסלולים:
- מסלול קיים: TicTacToe עם SignalR (`MainActivity`)
- מסלול חדש: TicTacToe נקי לקראת Firebase RTDB (`Main2Activity`)

בשיעורים הבאים נבנה על `Main2Activity` תמיכה ב-Firebase RTDB, כולל:
- סנכרון מהלכים בזמן אמת
- יצירה/הצטרפות למשחק (multi games / join game)
- שימוש ביכולות push של RTDB לעדכון לקוחות
