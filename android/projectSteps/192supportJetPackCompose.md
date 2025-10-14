---
layout: page
title: "תמיכה ב‑Jetpack Compose"
subtitle: "תמיכה ב‑Jetpack Compose בפרויקט"
tags: [אנדרואיד, Kotlin, Jetpack Compose]
lang: en
---



{: box-note}
מדריך זה מסביר את השינויים שבוצעו [בקומיט `f83a6b8e96146e645d128ea402be9e44aa06b77f`](https://github.com/3strategy/TestKtGradle/commit/f83a6b8e96146e645d128ea402be9e44aa06b77f), שמטרתם לאפשר תמיכה מלאה ב‑Jetpack Compose בפרויקט שנוצר במקור עם **MainActivity בג'אווה** (kotlin gradle). השינויים מתמקדים בעדכון `app/build.gradle.kts` ו‑`gradle/libs.versions.toml`, והם מדגימים שימוש בפועל ב‑Compose דרך `Main2Activity.kt`.

## שלב מקדים

{: .box-warning}
כדי לעבוד עם JetPack Compose הפרוייקט שלכם אמור **להתחיל עם Kotlin Gradle**. למרות שאנחנו בפרוייקט **על בסיס Java**, אין בעיה ליצור את הפרוייקט עם Kotlin gradle, ועדיין להתחיל אותו עם MainActivity.java. זה יאפשר בהמשך לישם את השלבים המתוארים כאן כדי לתמוך באקטיביטי מסוג Kotlin שעושה שימוש ב- Jetpack Compose. אין בעיה להוסיף סתם אקטיביטי מסוג Kotlin. הייחוד כאן הוא **הוספת התמיכה ב-Jetpack Compose.** 

## קיצור דרך
ניתן [להוריד את הגיט](https://github.com/3strategy/TestKtGradle) ולראות בעצמכם את השינויים שבוצעו בקומיט [f83a6b8e96146e645d128ea402be9e44aa06b77f](https://github.com/3strategy/TestKtGradle/commit/f83a6b8e96146e645d128ea402be9e44aa06b77f)

## מה השתנה בקצרה
- הוספת תוסף Compose ל‑Kotlin (`kotlin-compose`) בקובץ `app/build.gradle.kts`.
- הפעלת `buildFeatures.compose = true` בקונפיגורציית האנדרואיד.
- הוספת תלויות Compose ברמת המודול: `activity-compose`, `ui`, `material3`, `ui-tooling-preview`, `foundation`.
- הרחבת `gradle/libs.versions.toml` עם גרסאות וספריות Compose, וכן רישום התוסף `kotlin-compose`.
- הדגמת ממשק Compose ב‑`app/src/main/java/com/example/testktgradle/Main2Activity.kt` כחלופה קצרה ל‑RecyclerView.

להלן קטעי הקוד הרלוונטיים, כשהשורות שנוספו מסומנות בהדגשה באמצעות.

## שינויים ב‑`app/build.gradle.kts`

### תוספי Gradle (Plugins)
{% highlight kotlin mark_lines="4" %}
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}
{% endhighlight %}

### הפעלת Compose ב‑buildFeatures
{% highlight kotlin mark_lines="5 6 7" %}
    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true  // ← ADD THIS
    }
}

dependencies {
{% endhighlight %}

### תלויות Compose
{% highlight kotlin mark_lines="7 8 9 10 11" %}
dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    implementation(libs.activity.compose)
    implementation(libs.ui)
    implementation(libs.material3)
    implementation(libs.ui.tooling.preview)
    implementation(libs.foundation)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}
{% endhighlight %}

הערה: התלויות הקיימות בפרויקט (כגון `appcompat`, `material`, `activity`, `constraintlayout`) נשארו — פשוט הוספנו את תלויות Compose.

## שינויים ב‑`gradle/libs.versions.toml`

### גרסאות (versions)
{% highlight toml mark_lines="2 3 4 5" %}
[versions]
foundation = "1.6.0"
activityCompose = "1.9.0"
compose = "1.6.0"
material3 = "1.2.0"
{% endhighlight %}

### ספריות (libraries)
{% highlight toml mark_lines="2 3 4 5 6" %}
[libraries]
activity-compose = { module = "androidx.activity:activity-compose", version.ref = "activityCompose" }
foundation = { module = "androidx.compose.foundation:foundation", version.ref = "foundation" }
ui = { module = "androidx.compose.ui:ui", version.ref = "compose" }
material3 = { module = "androidx.compose.material3:material3", version.ref = "material3" }
ui-tooling-preview = { module = "androidx.compose.ui:ui-tooling-preview", version.ref = "compose" }
{% endhighlight %}

### תוספים (plugins)
{% highlight toml mark_lines="2" %}
[plugins]
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
{% endhighlight %}

## עדכון `Main2Activity.kt` והרצה
- `Main2Activity.kt` מדגים ממשק Compose קצר כאלטרנטיבה ל‑RecyclerView. ניתן להריץ את האקטיביטי ישירות מה‑IDE או להגדירו כ‑LAUNCHER במניפסט לצורך בדיקה מהירה.
- האקטיביטי נוצר כקוטלין ריק `()class Main2Activity : AppCompatActivity` ועובר לרשת מטיפוס אחר: `()class Main2Activity : ComponentActivity`
- התוספת ל- `onCreate` של `Main2Activity.kt`:
    ```java
        val items = listOf(
        "iPhone 10 - $2000",
        "iPhone 11 - $3000",
        "iPhone 12 - $4000",
        "iPhone 13 - $5000",
        "One Note - $1900",
        "Xiomi Phone - $1900"
    )

    setContent {
        MaterialTheme {
            Surface(modifier = Modifier.fillMaxSize()) {
                ItemList(items)
            }
        }
    }
    ```
- התוספת `Composable@` למחלקה `Main2Activity.kt`:
    ```java
    @Composable
    fun ItemList(items: List<String>) {
        LazyColumn {
            items(items) { item ->
                Text(
                    text = item,
                    fontSize = 18.sp,
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    ```
- ניתן להפעיל את האקטיביטי למשל על ידי כפתור ב-MainActivity.java. להלן הקוד בתוך `onCreate` של `MainActivity.java`:
    ```java 
    Button btnOpenMain2 = findViewById(R.id.btnOpenMain2);
    btnOpenMain2.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(MainActivity.this, Main2Activity.class);
            startActivity(intent);
        }
    });
    ```
- ודאו שה‑SDK/Kotlin בסביבה תואמים להגדרות שב‑Gradle: `compileSdk = 36`, `targetSdk = 36`, `minSdk = 36`, ו‑`jvmTarget = "17"`.

## הערות
- אם מתקבלת אזהרה או שגיאה לגבי גרסאות Compose/AGP, ניתן לעדכן את גרסאות ה‑Compose או AGP ב‑`libs.versions.toml` בהתאם ל‑SDK המותקן.
- את ה-Main2Activity.kt תוכלו להוסיף מתוך אנדרואיד סטודיו (זה יגרור שינויים נוספים שהסטודיו מבצע), ובהמשך לדרוס את תוכנו עם הגרסה שבגיט שכוללת הדגמה קצרה של Jetpack Compose. ניתן כמובן להוריד את הגיט ולהריץ אבל אז לומדים פחות.

