---
layout: page
title: "Hex — מלוח ריק למשחק אופליין מול מחשב"
subtitle: "תשעה שלבים ב־Java, XML ו־View Binding"
permalink: /android/hex5/
tags: [Android, Java, Hex]
lang: he
full-width: true
css: [/assets/css/hex-diagrams.css]
---

## נקודת ההתחלה

הפרויקט `hex5` מתחיל ב־Empty Views Activity בשפת Java, עם XML ו־View Binding פעיל. שם החבילה הוא `com.example.hex`. המורה מספק את המודלים המאומנים; אין במסלול הזה משימת אימון ב־Python או ב־Colab.

## לאן אנחנו הולכים? {#destination}

נבנה משחק מקומי, נוסיף בחירת גודל לוח כבר כשניצור את מחלקת המשחק, ואז נחבר יריב שמשתמש באותם חוקי משחק ובמודל ערך מסופק. האימון מתרחש מראש מחוץ לטלפון. בזמן המשחק האפליקציה משתמשת בקובצי `.tflite` ששמורים בנכסים שלה.

<div markdown="1" class="hex-diagram hex-diagram--wide">

~~~mermaid
%% dir: rtl %%
flowchart TB
    subgraph preparation["מחוץ לטלפון — המורה מספק"]
        training["אימון עצמי מראש"] --> tflite["מודל .tflite"]
    end
    subgraph app["האפליקציה — משחק אופליין"]
        catalog["model_catalog.json<br/>נתיב וגודל לוח"]
        assets["קובצי .tflite"]
        human["מהלך האדם"] --> game["מצב המשחק וחוקיו"]
        game --> candidates["עותק לכל מהלך מחשב חוקי"]
        candidates --> values["הערכת המצבים במכשיר"]
        catalog --> values
        assets --> values
        values --> move["בחירת מהלך מחשב"]
    end
    tflite -->|"העתקה לנכסי האפליקציה"| assets
~~~

</div>

בפרקים **01–04** נגיע למשחק מקומי שלם, עם לוח 7×7 כברירת מחדל. בפרק **02** מצב המשחק והתצוגה כבר יקבלו גודל לוח; בפרק **07** נוסיף את שתי אפשרויות הגודל ונציג רק מודלים תואמים. בפרקים **05–07** נחבר את המחשב. בפרק **08** נוסיף רמז שלא מניח אבן, ובפרק **09** נוסיף ערכות נושא.

{: .box-note}
**לפני שמתחילים:** מה חייב לעבוד במשחק עוד לפני שמודל מאומן יכול להועיל? חשבו על חוקיות המהלך, התור וזיהוי המנצח.

| פרק | נושא | מה עובד בסיום |
|---:|---:|---:|
| [01 — הלוח ושפות היעד]({{ '/android/hex5/01-board/' | relative_url }}) | Canvas, משושים, גאומטריה ושפות יעד | לוח 7×7 ריק עם סימון ארבע שפות היעד. |
| [02 — מהלכים ותורות]({{ '/android/hex5/02-moves-and-turns/' | relative_url }}) | גודל הלוח, מצב המשחק, callback ומגע | משחק 7×7 כברירת מחדל; `HexGame` וציור הלוח תומכים גם בגודל אחר. |
| [03 — חיבור מנצח]({{ '/android/hex5/03-win-detection/' | relative_url }}) | ששת השכנים וחיפוש רוחב | ניצחון מזוהה לפי גודל הלוח, ומהלך אחרי ניצחון נדחה. |
| [04 — משחק מקומי שלם]({{ '/android/hex5/04-local-two-player/' | relative_url }}) | Restart, משאבי מסך ו־View Binding | משחק מקומי מלא עם תור, תוצאה וכפתור Restart. |
| [05 — מכינים את המחשב]({{ '/android/hex5/05-model-preparation/' | relative_url }}) | עותקי מצב, מהלכים חוקיים וקידוד | מצב המשחק מקודד בשלושה ערכים לכל תא; מודל הפתיחה הוא 7×7. |
| [06 — מחשב שעובד ברקע]({{ '/android/hex5/06-background-ai/' | relative_url }}) | בחירת מהלך, LiteRT ו־Executor | האדם משחק אדום מול המחשב בכחול; החישוב רץ ברקע. |
| [07 — שחקנים לפי גודל לוח]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }}) | קטלוג JSON ובחירת מודל קבוע־צורה | ברירת המחדל היא 7×7 עם מודל 2,620 האיטרציות; ב־11×11 מופיעות 100 ו־7,350. |
| [08 — רמז למהלך הבא]({{ '/android/hex5/08-hint/' | relative_url }}) | שימוש חוזר ב־`HexAi` | המודל מציע מהלך לאדום ומדגיש את התא בלי להניח בו אבן. |
| [09 — ערכות נושא ואייקון]({{ '/android/hex5/09-day-night-themes/' | relative_url }}) | משאבי יום ולילה ואייקון | צבעי המסך מתאימים להגדרת התצוגה של המכשיר. |

## מי אחראי על מה באפליקציה? {#architecture}

<div markdown="1" class="hex-diagram hex-diagram--wide">

~~~mermaid
%% dir: rtl %%
flowchart TB
    xml["XML ופקדי המסך"] <-->|"View Binding"| activity["MainActivity<br/>תיאום המסך והעבודה"]
    activity -->|"עדכון תצוגה"| board["HexBoardView<br/>ציור ותרגום מגע לתא"]
    board -->|"קריאת מצב הלוח"| game["HexGame<br/>גודל, מצב וחוקים"]
    activity -->|"החלת מהלך"| game
    activity -->|"בקשת מהלך או רמז"| ai["HexAi<br/>בחירה בין מהלכים חוקיים"]
    ai -->|"עותק לכל מועמד"| game
    ai --> contract["ValueModel<br/>הערכת מצב"]
    loader["TfliteValueModel<br/>LiteRT CompiledModel"] -.->|"מממשת"| contract
    catalog["ModelCatalog<br/>קריאת הקטלוג"] --> loader
    catalog --> assets["מודלים בנכסי האפליקציה"]
~~~

</div>

`HexBoardView` עובדת עם פיקסלים ומרכזי משושים; `HexGame` עובדת עם גודל הלוח, התאים והחוקים. `MainActivity` מחברת את המסך למשחק, ו־`HexAi` משתמשת בעותקי משחק וב־`ValueModel` כדי לבחור מהלך. המודל מעריך עמדה; הוא אינו מחזיר תא מוכן.

{: .box-note}
**שאלת הבנה:** איזו מחלקה צריכה לדחות מהלך לתא תפוס, גם כשהמהלך מגיע מהמחשב ולא מנגיעה במסך?

## מי עושה מה?

| חלק | אחריות |
|---:|---:|
| לוח, מגע, חוקים, תורות, ניצחון וחיבור המסך | התלמיד כותב ומסביר |
| `TfliteValueModel` וקובצי המודלים | המורה מספק; התלמיד לומד את החוזה ומשלב |
| `model_catalog.json` | התלמיד כותב רשומות שמציינות גודל ונתיב מודל |
| אימון JAX, ‏Colab וייצוא checkpoints | מחוץ למסלול |

בסוף [פרק 4]({{ '/android/hex5/04-local-two-player/' | relative_url }}) אפשר לשחק משחק מקומי שלם. בפרק [05]({{ '/android/hex5/05-model-preparation/' | relative_url }}) נכין את הקידוד ואת הרצת המודל. בפרק [06]({{ '/android/hex5/06-background-ai/' | relative_url }}) נחבר את בחירת המהלך לעבודה ברקע, ובפרק [07]({{ '/android/hex5/07-supplied-rl-models/' | relative_url }}) נבחר מודל שמתאים לגודל הלוח. מספר איטרציות גדול יותר אינו מבטיח מודל חזק יותר.

בפרק [08]({{ '/android/hex5/08-hint/' | relative_url }}) נוסיף רמז למהלך בלי להניח אבן, ובפרק [09]({{ '/android/hex5/09-day-night-themes/' | relative_url }}) נוסיף צבעי יום ולילה לאותו מסך.

חבילת המודל היחיד לפרק 5 וחבילת המודלים הנוספים לפרק 7 זמינות בקישורים שבפרקים.
