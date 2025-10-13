---
layout: page
title: "הוספת Activities לתפריט"
subtitle: "הוספת Activities לתפריט ה- ⋮"
tags: [אנדרואיד, Menu, dots Menu, Updating Menu, Activity, Activities]
lang: en
---

ההנחיות בעמוד זה ***בונות על גבי פרוייטק שלד Starter Project*** קיים, אותו אתם מעדכנים לצרכי הפרוייקט שלכם
{: .box-note}


## הוספת כל ה‑Activities לתפריט Overflow (⋮)
אחרי שהוספנו כמה וכמה Activities להוסיף אותן גם לתפריט ה- ⋮

כדי להוסיף את כל ה‑Activities שיצרנו לתפריט ⋮ בפינה העליונה של האפליקציה, יש לבצע את השלבים הבאים:

### 1. יצירת קובץ תפריט (menu XML) אם עדיין לא קיים

1. בתיקיית **res/menu** (אם לא קיימת, צרו אותה).
2. ודאו שבתקייה קיים קובץ בשם `main.xml`.
3. בתוך הקובץ, הוסיפו פריטים לכל Activity כך:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_activity1"
        android:title="Activity1"
        app:showAsAction="never" />

    <item
        android:id="@+id/action_activity2"
        android:title="Activity2"
        app:showAsAction="never" />

    <!-- הוסיפו כאן עוד <item> לפי כל Activity שיצרתם -->

</menu>
```

---

### 2. טיפול בבחירת פריטים

1. פתחו את קובץ MasterActivity הנמצא כאן:
    ![alt text](/assets/img/013/image-6.png)
1. עדכנו את הפונקציה(מתודה) `onOptionsItemSelected` כדי להפעיל את ה־Activity המתאים לאחר בחירה מהתפריט:
## הוספת כל ה‑Activities לתפריט Overflow (⋮)

כדי להוסיף את כל ה‑Activities שיצרתם לתפריט ⋮ בפינה העליונה של האפליקציה, בצעו את השלבים הבאים:

```java
@Override
public boolean onOptionsItemSelected(@NonNull MenuItem item) {
    ActivityManager am = (ActivityManager) this.getSystemService(ACTIVITY_SERVICE);
    List<ActivityManager.RunningTaskInfo> taskInfo = am.getRunningTasks(1);
    String Actvity_Name = taskInfo.get(0).topActivity.getClassName(); // Be cautious with getRunningTasks, it's deprecated for third-party apps.
    int itemId = item.getItemId();
        if (itemId == R.id.idMain) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.MainActivity")) {
                Log.i("MasterActivity", "Changing to MainActivity");
                Intent intent = new Intent(this.getApplicationContext(), MainActivity.class);
                startActivity(intent);
            }
        } else if (itemId == R.id.idTasksDone) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.DoneTasksActivity")) {
                Log.i("MasterActivity", "Changing to DoneTasksActivity");
                Intent intent = new Intent(this.getApplicationContext(), DoneTasksActivity.class);
                startActivity(intent);
            }
        } else if (itemId == R.id.idYears) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.YearsActivity")) {
                Log.i("MasterActivity", "Changing to YearsActivity");
                Intent intent = new Intent(this.getApplicationContext(), YearsActivity.class);
                startActivity(intent);
            }

    // הוסיפו כאן את ה-if הנוספים עבור כל Activity שיצרתם:
    // לדוגמה:
    // } else if (itemId == R.id.idNew) {
    //     if (!Actvity_Name.equals("com.example.tasks.Activities.NewActivity")) {
    //         Log.i("MasterActivity", "Changing to NewActivity");
    //         startActivity(new Intent(this, NewActivity.class));
    //     }
    // במקום המילה New יופיע שם ה-Activity שלכם. 

    } else if (itemId == R.id.idDisconnect) {
        AlertDialog.Builder adb = new AlertDialog.Builder(this);
        adb.setTitle("Disconnect Account");
        adb.setMessage("Are you sure yo want to\n Disconnect account & Exit?"); // Typo: "you"
        adb.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                refAuth.signOut(); // Ensure refAuth is initialized and accessible
                finishAffinity(); // Closes all activities in this task
            }
        });
        adb.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        adb.setCancelable(false);
        adb.create().show();
    } else if (itemId == R.id.idExit) {
        AlertDialog.Builder adb = new AlertDialog.Builder(this);
        adb.setTitle("Quit Application");
        adb.setMessage("Are you sure?");
        adb.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                finishAffinity(); // Closes all activities in this task
            }
        });
        adb.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        adb.setCancelable(false);
        adb.create().show();
    }
    return super.onOptionsItemSelected(item);
}
```

כך נראה קטע קוד להוספה של 4 Activities ית ההוספה בשלב הביניים (לפני שרשמנו את השמות הנכונים של ה-Activity).
```java
        } else if (itemId == R.id.idNew) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.NewActivity")) {
                Log.i("MasterActivity", "Changing to NewActivity");
                startActivity(new Intent(this, NewActivity.class));
            }
        } else if (itemId == R.id.idNew) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.NewActivity")) {
                Log.i("MasterActivity", "Changing to NewActivity");
                startActivity(new Intent(this, NewActivity.class));
            }
        } else if (itemId == R.id.idNew) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.NewActivity")) {
                Log.i("MasterActivity", "Changing to NewActivity");
                startActivity(new Intent(this, NewActivity.class));
            }
        } else if (itemId == R.id.idNew) {
            if (!Actvity_Name.equals("com.example.tasks.Activities.NewActivity")) {
                Log.i("MasterActivity", "Changing to NewActivity");
                startActivity(new Intent(this, NewActivity.class));
            }
        } else if (itemId == R.id.idDisconnect) {
```

בשלב זה ניתן לבחור את המילה New ללחוץ Ctrl+R ולהחליף אותה (חשוב לסמן את Cc להחלפה רק של התאמה לאותיות גדולות) בשם ה-Activity שלנו. בכל פעם לבצע רק 4 החלפות - ואז ב-if הבא להחליף כבר למשהו אחר
![alt text](/assets/img/013/image-10.png)

---

כך זה יראה לאחר השינוי. **1 עדיין באדום:**
![alt text](/assets/img/013/image-11.png)

ונותר רק לרחף מעל ההערה באדום **ולבחור import class**
![alt text](/assets/img/013/image-12.png)


### 3. התאמות נוספות (אופציונלי)

* ודאו שאתם משתמשים ב־`app:showAsAction="never"` עבור כל `<item>`.
* השתמשו ב־`android:orderInCategory` כדי לקבוע את סדר הפריטים בתפריט.

---

**זהו!** עכשיו תוכלו להוסיף בקלות עוד `if` לכל Activity שיצרתם ולהפעיל אותו מתפריט ה־Overflow.
