---
layout: page
title: "Android topics — 24: Compose כמערכת ממשק מלאה"
subtitle: "state, recomposition, LazyColumn, ניווט, interop ובדיקת UI"
permalink: /android/topics/24-compose-ui-system/
lang: he
full-width: true
tags: [Android, Kotlin, Jetpack Compose, navigation, testing]
---

[מפת המעבדות]({{ '/android/topics/' | relative_url }}) · [השיעור הקודם: הוספת תמיכת Compose]({{ '/android/projectSteps/192supportJetPackCompose' | relative_url }})

{: .box-success}
בסוף המעבדה מסך Java/XML הקיים פותח קטלוג Compose. בקטלוג מחפשים כותרת, מסמנים Favorite מקומי, פותחים פריט במסלול ניווט, רואים `TextView` ישן בתוך Compose, וחוזרים לרשימה. בדיקת UI עוברת מסלול חיפוש־פריט־חזרה ומשחזרת את החיפוש אחרי יצירה מחדש של ה־Activity.

בסיס ההשוואה בפרויקט **topics** הוא `master`; ענף התוצאה הוא **`codex/compose-ui-system`**. זהו ענף Kotlin ייעודי בתוך סדרה שברובה Java/XML, משום ש־Compose נכתבת בפונקציות Kotlin `@Composable`. לא מחליפים את כל מסך הבסיס רק כדי ללמוד את המערכת החדשה: השינוי ב־Java הוא כפתור ו־Intent, ו־`ComposeActivity.kt` היא קובץ חדש.

## מפת אחריות של המסך

| מושג | איפה בקוד? | מה קורה למשתמש? |
|---:|:---|---:|
| State | `query` ו־`favorite` | חיפוש וסימון מעדכנים UI |
| Recomposition | קריאה חוזרת לפונקציות שתלויות ב־state | הרשימה והכוכב משתנים בלי `notifyDataSetChanged` |
| Layout/list | `Column`,‏ `Row`,‏ `LazyColumn` | ארבעה ספרים, סינון, שורות ממוחזרות |
| Navigation | `NavHost`,‏ `book/{id}` | לחיצה פותחת פריט; Back חוזר |
| Interop | Java Activity → Compose Activity;‏ `AndroidView` | מעבר מדורג בין Views ל־Compose |
| Testing | `ComposeCatalogTest` | מסלול משתמש ושחזור אחרי recreate |

## 1. בונים בשני מחסומים תקינים

ב־**Gradle Scripts > libs.versions.toml**, הוסיפו גרסת Kotlin `2.3.21`,‏ Compose BOM `2026.09.00`, ו־Navigation Compose `2.10.2` (הגרסאות בענף התוצאה). הוסיפו aliases ל־Compose compiler plugin, BOM,‏ Material3, foundation, UI, Activity Compose, Navigation Compose ולספריות בדיקה. ב־`build.gradle.kts` של השורש הכריזו על `compose-compiler` עם `apply false`. ב־`app/build.gradle.kts` הפעילו את plugin זה ואת `buildFeatures.compose = true`, ואז הוסיפו רק את ספריות Compose הנצרכות; הכניסו את BOM גם ל־`androidTestImplementation`.

הריצו **`./gradlew :app:assembleDebug` כעת**, לפני יצירת קובץ Kotlin. זהו checkpoint שמפריד שגיאת Gradle/גרסה משגיאת קוד UI. בסיס הפרויקט משתמש ב־AGP 9.4 עם תמיכת Kotlin מובנית; אין להוסיף כאן `org.jetbrains.kotlin.android` ישן רק כי מדריך משנים קודמות השתמש בו. [מדריך Android ל־built-in Kotlin](https://developer.android.com/build/migrate-to-built-in-kotlin) ו־[תוסף Compose Compiler](https://developer.android.com/develop/ui/compose/setup-compose-dependencies-and-compiler) מסבירים את החלוקה. [Compose BOM](https://developer.android.com/develop/ui/compose/bom) מתאמת את גרסאות ספריות Compose, אך לא את Navigation או Activity.

## 2. מעבר קטן מתוך מסך Java

ב־**app > res > layout > activity_main.xml**, השאירו את `ConstraintLayout` ואת `TextView` של התבנית. תנו ל־TextView מזהה `hello` וטקסט `@string/compose_intro`, והוסיפו מתחתיו `Button id=open_compose` עם constraint ל־`@id/hello`. ב־**app > res > values > strings.xml** הוסיפו את שני הטקסטים. ב־`MainActivity.java` הוסיפו import ל־`Intent` ואחרי `setContentView`:

```java
binding.openCompose.setOnClickListener(
        v -> startActivity(new Intent(this, ComposeActivity.class)));
```

ב־**app > manifests > AndroidManifest.xml**, בתוך `<application>`, רשמו `<activity android:name=".ComposeActivity" android:exported="false" />`. המסך הפנימי אינו נקודת כניסה חיצונית. זהו interop ברמת Activity: View Binding ממשיכה לעבוד במסך הראשון, Compose מנהלת את השני.

## 3. State גורם למסך להתעדכן

צרו `ComposeActivity.kt` ב־**app > kotlin+java > com.example.topics**. המחלקה יורשת `ComponentActivity` וקוראת `setContent { CatalogApp() }`. בתוך מסלול `books`, חיפוש נראה כך:

```kotlin
var query by rememberSaveable { mutableStateOf("") }
OutlinedTextField(
    value = query,
    onValueChange = { query = it },
    label = { Text("Search titles") },
    modifier = Modifier.fillMaxWidth().testTag("search")
)
LazyColumn {
    items(books.filter { it.title.contains(query, ignoreCase = true) },
        key = { it.id }) { book ->
        // Row with title and Favorite action
    }
}
```

`onValueChange` משנה את `query`; Compose מריצה מחדש את החלקים שקוראים את הערך והרשימה המסוננת מתעדכנת. אין צורך לפנות ידנית ל־TextView. `rememberSaveable` שומרת טקסט פשוט דרך state של ה־Activity ולכן החיפוש נשאר אחרי סיבוב/יצירה מחדש. `key = { it.id }` נותן זהות יציבה לשורה גם כשהרשימה מסוננת. לכל שורה בענף התוצאה `favorite` מקומי באמצעות `rememberSaveable(book.id)` ולחצן `☆/★`. זהו state **של הדגמת UI**; הוא אינו מסד או מקור אמת בין מכשירים. [מדריך state](https://developer.android.com/develop/ui/compose/state) מסביר state hoisting כשכמה מסכים צריכים לחלוק נתון.

`Column` מסדר רכיבים מלמעלה למטה, `Row` את הכותרת והכפתור זה לצד זה, ו־`Modifier.padding`/`fillMaxWidth` מתארים גודל ומרווח. `LazyColumn` מרכיבה שורות לפי הצורך, בדומה למטרת RecyclerView, אבל API העדכון שונה. השוו את [מדריך הרשימות ב־Compose](https://developer.android.com/develop/ui/compose/lists) למעבדת [RecyclerView]({{ '/android/topics/11-recyclerview-diffutil/' | relative_url }}).

## 4. ניווט עם מזהה, לא עם אובייקט שלם

`CatalogApp` משתמשת ב־`rememberNavController()` וב־`NavHost(startDestination = "books")`. לחיצה על כותרת שורה מבצעת `nav.navigate("book/${book.id}")`. ביעד `book/{id}` קוראים את `id` מ־arguments, מוצאים את הספר ברשימה ומציגים **Book not found** אם אינו קיים. כפתור **Back to books** קורא `popBackStack()`. העברת ID מאפשרת למסך הפרטים לטעון/לאמת מחדש; אל תעבירו אובייקט גדול או View עצמו כארגומנט ניווט. [מדריך Navigation Compose](https://developer.android.com/develop/ui/compose/navigation) מרחיב על routes ו־back stack.

במסך הפרטים נמצאת דוגמת interop הפוכה:

```kotlin
AndroidView(
    factory = { context -> TextView(context) },
    update = { view -> view.text = "Classic TextView for ID: ${book?.id ?: "?"}" },
    modifier = Modifier.padding(vertical = 16.dp)
)
```

`factory` יוצרת View, ו־`update` מסנכרנת אותה עם state כשה־Composable מתעדכנת. כך אפשר להעביר רכיב קיים בהדרגה. אין כאן סיבה מוצרית להעדיף TextView על Text; הוא מכוון להראות את הגבול בין שתי מערכות ה־UI. [מדריך Views בתוך Compose](https://developer.android.com/develop/ui/compose/migrate/interoperability-apis/views-in-compose) מפרט את הכלי.

## 5. בדיקה שמפרידה בין מסך למנגנון

ב־**app > kotlin+java > com.example.topics** תחת source set `androidTest`, צרו `ComposeCatalogTest.kt`. `createAndroidComposeRule<ComposeActivity>()` מפעילה את Activity שכבר קוראת `setContent`. הבדיקה מכניסה `Android` לשדה `testTag("search")`, פותחת `book-b2`, מאשרת את כותרת הפריט, חוזרת, מוודאת ש־`book-b1` אינו ברשימה, ומבצעת `scenario.recreate()` כדי לבדוק שהחיפוש נשמר. ב־[מדריך בדיקות Compose](https://developer.android.com/develop/ui/compose/testing) יש פעולות סמנטיות כמו `onNodeWithTag`,‏ `performTextInput` ו־`assertIsDisplayed`.

`./gradlew :app:connectedDebugAndroidTest` עבר באמולטור. בדיקת ה־UI הראשונה נכשלה כשניסתה למצוא את תוכן ה־`TextView` הישן כצומת סמנטי של Compose; תוקנה לבדוק את כותרת Compose במסך הפרטים, ואת ה־View הישן בודקים ידנית. בדיקה לא צריכה להניח שכל View מוטמע מופיע כמו `Text` בעץ הסמנטי של Compose.

## משימת העברה

הפכו את ה־Favorite לנתון שנשמר ב־Room: מי מחזיק את source of truth, איזה state יגיע ל־Composable, ומה יקרה בסיבוב ובחזרה מהמסך השני? השוו את החוזה למעבדת [Room]({{ '/android/topics/12-room-persistence/' | relative_url }}), וכתבו בדיקה שמתחילה מחדש את התהליך כדי להוכיח שמירה אמיתית.
