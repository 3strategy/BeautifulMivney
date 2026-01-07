---
layout: page
title: "יצירת תפריט מגירה מבוסס פרגמנטים"
subtitle: "תפריט המבורגר עדכני"
tags: [אנדרואיד, Menu, dots Menu, Updating Menu, Launcher, Activity, Activities]
lang: en
---


## שלב ראשון - הפיכת Activity ל- Launcher (לא חובה)

<div class="two-columns">
  <div markdown="1" class="column">

    {% highlight xml mark_lines="3 6 7 8 9 10" %}
    <activity
        android:name=".activities.MenuActivity"
        android:exported="false" />
    <activity
        android:name=".MainActivity"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    {% endhighlight %}

</div>
<div markdown="1" class="column">

    {% highlight diff %}
    <activity
        android:name=".activities.MenuActivity"
        android:exported="true">
-       <intent-filter>
-           <action android:name="android.intent.action.MAIN" />

-           <category android:name="android.intent.category.LAUNCHER" />
-       </intent-filter>
    </activity>
    <activity
        android:name=".activities.MainActivity"
        android:exported="false" />
    {% endhighlight %}

</div>
</div>

## הפיכת MenuActivity ל-drawer

### תוספות UI ב- activity_menu.xml:


נשנה בקובץ ה-`manifest.xml` את האקטיביטי שמבצעת `export`:

1. נשנה מ- `constraintlayout` ל- `drawerlayout`
1. נוסיף בתוכו `LinearLayout` ולתוכו נוסיף`com.google.android.material.navigation.NavigationView`:
    ```
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="?attr/colorSurface"
            android:theme="@style/ThemeOverlay.Material3.ActionBar"
            app:title="@string/app_name" />

        <FrameLayout
            android:id="@+id/content_container"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1">

            <TextView
                android:id="@+id/menu_hint"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center"
                android:text="@string/menu_hint" />
        </FrameLayout>
    </LinearLayout>

    <com.google.android.material.navigation.NavigationView
        android:id="@+id/navigation_view"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:fitsSystemWindows="true"
        app:menu="@menu/menu_drawer" />
    ```


### שינוי JAVA

שינוי בקובץ `MenuActivity.java`

הוספת imports - הרוב יקרה אוטומטית
```Java
import android.content.Intent;

import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;

import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.navigation.NavigationView;
```

**עדכון `onCreate`:**

<div class="two-columns">
  <div markdown="1" class="column">

    {% highlight diff mark_lines="6 7 8 10 11 12 13 14 15 16 17 18 20 21 22 23 24 25 26 30 31 32 33 34 35 36" %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        drawerLayout = findViewById(R.id.drawer_layout);
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerToggle = new ActionBarDrawerToggle(
                this,
                drawerLayout,
                toolbar,
                R.string.drawer_open,
                R.string.drawer_close
        );
        drawerLayout.addDrawerListener(drawerToggle);
        drawerToggle.syncState();

        NavigationView navigationView = findViewById(R.id.navigation_view);
        navigationView.setNavigationItemSelectedListener(item -> {
            if (item.getItemId() == R.id.nav_main) {
                startActivity(new Intent(this, MainActivity.class));
            }
            drawerLayout.closeDrawer(GravityCompat.START);
            return true;
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (drawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    {% endhighlight %}

</div>
<div markdown="1" class="column">

    {% highlight diff %}
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
-       EdgeToEdge.enable(this);
        setContentView(R.layout.activity_menu);
-       ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
-           Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
-           v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
-           return insets;
        });
    }
    {% endhighlight %}

</div>
</div>

## הוספת מגירה `menu_drawer.xml`

יש להוסיף את הקובץ תחת `res\menu\`

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/nav_main"
        android:title="@string/menu_local_game" />

</menu>
```