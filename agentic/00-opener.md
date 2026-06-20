---
layout: page
title: "Agentic Engineering - פתיחה"
subtitle: "חשיפה 13.5 לקראת סדנה"
tags: [agentic, codex, teaching, ai, harness-engineering]
lang: he
---

{: .box-success}
**We are in a world where developers spend their days *==conversing with different agents, checking in on them, and seeing the work that they did.==***<br/>מעבר מ"שימוש בצ'אט" אל **ניהול עבודה הנדסית עם סוכנים**. הארכיטקט לא רק כותב פרומפט. הארכיטקט מגדיר סביבת עבודה, כללי בטיחות, בדיקות, תיעוד, משימות, ואופן בדיקה של התוצר.

{% include youtube.html id="LD0rePKLCyc" %}

---
**הערות לסרטון:**

- [האתר שנולד בפרומפט הזה נמצא כאן](https://vibe180326.vercel.app/)
- ה-deployment בוצע בפקודה לאייג'נט שיעשה deploy ל-vercel בתוספת הבהרה שאני לא מכיר את התהליך אבל יש לי חשבון. האייג'נט ביצע ואני רק התבקשתי לאשר login - לתת כמה ספרות.



<details markdown="1"><summary>מטרה ומבנה ההצגה</summary>

## מטרת השיעור

בסוף 30 דקות המורים אמורים להבין:

1. מה ההבדל בין שיחה עם מודל לבין עבודה עם agent על קוד.
2. למה Git, בדיקות, Markdown ו־AGENTS.md הם חלק מהמקצוע החדש.
3. איך הופכים "תעשה לי" ל־workflow שאפשר לבדוק, לשחזר וללמד.

{: .box-note}
המטרה אינה לשכנע שכל תלמיד חייב לעבוד כך מחר. המטרה היא לתת למורה מילון מושגים, תחושת כיוון, ודוגמת עבודה מספיק מוחשית כדי לזהות מה חסר בסביבת ההוראה הנוכחית.

## 30 דקות - מבנה מוצע


| זמן | פעילות | מה הארכיטקט אמור לראות |
| ---: | --- | --- |
| 0-5 | פתיח: עולם של agents | לא עוד autocomplete, אלא משימות ארוכות עם בדיקה |
| 5-10 | Online מול CLI / Extension / App | ההבדל בין תשובה לבין עבודה בתוך repo |
| 10-18 | Demo קצר | agent קורא קבצים, משנה קובץ, מריץ בדיקה, מסכם |
| 18-24 | Harness Engineering | AGENTS, tests, docs, Git, notifications |
| 24-30 | דיון כיתתי | מה אפשר לתת לתלמידים, ומה אסור עדיין לפתוח |

</details>

## המפה הגדולה

```mermaid
flowchart LR
    A["מורה / מפתח"] --> B["Prompt"]
    B --> C["Agent"]
    C --> D["Codebase"]
    C --> E["Terminal"]
    C --> F["Browser / E2E"]
    D --> G["Git diff"]
    E --> H["Tests"]
    F --> I["Visual evidence"]
    G --> J["Review"]
    H --> J
    I --> J
    J --> K["Accept / Fix / Reject"]
```

## המונח: Harness Engineering כפי שהגדיר GPT5.5

Harness הוא הרתמה שמחזיקה את ה־agent בתוך מסלול עבודה מועיל:

- הוראות קבועות: `AGENTS.md`, `CLAUDE.md`, skills, docs.
- גבולות פעולה: הרשאות, תיקיות מותרות, מה לא למחוק, מתי לשאול.
- בדיקות: unit tests, build, lint, Playwright, בדיקה ידנית בדפדפן.
- תיעוד: Markdown, תרשימי Mermaid, דפי משימה, רשימת "done when".
- ניהול שינוי: Git, Pull Requests, checkpoints, review.

{: .box-success}
אם ה־agent הוא "עובד", ה־harness הוא מערכת העבודה. בהוראה, אנחנו מלמדים לא רק את העובד אלא את מערכת העבודה סביבו.

### דוגמת Prompt: תוצר מיידי וגם שיפור של ה־harness

לא כל פרומפט צריך לבקש רק שינוי בעמוד או בקוד. אפשר לבקש גם שהתוצאה תלמד את הסוכן ואת המאגר כיצד לבצע את אותה עבודה טוב יותר בפעם הבאה.

<div markdown="1" class="box-success">

**דוגמת פרומפט בגישת Harness Engineering:**
<div markdown="1" class="english">

1. Write line 188 in English.
2. In some places in your edit you used `text` code fences when a correct approach would be to use one of the design classes `box-note`, `box-success`, `box-warning`, or `box-error`. For a section rather than a one-liner, use a `div` wrapper instead of the short `{: .box-note}` syntax.
3. Update `AGENTS.md` with this preference regarding important content highlighting and keeping it interesting and visually appealing.
</div>

הבקשה הראשונה משפרת תוצר קיים. השנייה משפרת את דרך ההצגה. השלישית הופכת את הלקח לכלל קבוע ב־harness, כך שהסוכן הבא יתחיל מנקודת פתיחה טובה יותר.

</div>

## Harness - הגדרה סובייקטיבית שלי - דוגמא מפרוייקט

עבורי: זה כל מה שיש בפרוייקט שהוא מחוץ לקוד הפרוייקט עצמו, ומשמש את ה-Agent (ולעיתים אותנו) כדי לעבוד נכון וביעילות
אצלנו זה כולל:
- פרוייקט UnitTest שנכתב ומתוחזק על ידי האייג'נט.
- בפרוייקט ה- UnitTests יושבים גם סקריפטים ps1 שיודעים לבצע כל מיני משימות ב-UnitTests אבל גם בפרוייקט בדיקות E2E לעיתים. 
- פרוייקט בדיקות E2E מבוסס PlayWright. 
- פרוייקט מסמכולוגיה. כולל כ-30-50 מסמכים, קובץ rules, לעיתים demo artifacts
- קובץ AGENTS עם הפנייה ל-3-5 קובצי AGENTS משימתיים, ובהם הפניות למסמכים השונים בפרוייקט המסמכולוגיה.

**זו הסביבה שבה קודקס:**

1. יודע להבין **גבולות גזרה**.
2. יודע מהר אין עובד, **ואיך אמור לעבוד** פיצ'ר מסויים. 
3. איך נראית הסכימה.
4. וכו'. 
התוצרים שלנו מהאייג'נט יהיה **תמיד** גם קוד במערכת, וגם תוספות / הרחבות של ה-Harness. האייגנט לא רק כותב קוד. הוא כותב הכל. אנחנו שם כדי לקרוא, לערוך לבקר ולהנחות.

שימו לב שלא הזכרתי בכלל את המילה Skils. אין לנו. וזה יכול להיות אוזלת יד, או אמונה שגויה שלי (גם בעקבות קריאה מזמן), שאנחנו מקבלים אותם כיום יותר בתוך הקודקס בצורה יותר יעילה, ==ושתפקידנו מתמצה ליצור לו סביבת עבודה נוחה וברורה,== ולהגדיר לו הכי טוב בעולם מה צריך לעשות / ==ומה צריך להיות.==


## דמו - הסרטון שראינו

נסו בעצמכם לקחת פרוייקט עובד שלכם, ולבקש מ-Codex, Claude or חס וחלילה Copilot, לבצע שינוי מסויים.

### דוגמא ממש שגויה

> קרא את מבנה הפרויקט. הוסף עמוד Markdown קצר עם טבלה ותרשים Mermaid.
עדכן את התפריט. הרץ build. בסוף תן לי רשימת קבצים ששונו והאם הבדיקה עברה.

אין טעם לבקש את הדברים האלו בסביבה אייגנטית תקינה. הוא תמיד יודיע אלו קבצים שונו, וגם הגיט יעקוב אחרי זה. עדכון התפריט בד"כ יקרה אם הוא רגיל לזה וזה שולי. 

הדמו טוב אם רואים ארבעה דברים:

1. ה־agent קורא לפני שהוא משנה. מובן מאליו
2. הוא משנה מעט קבצים ולא "משכתב את העולם". לא מדוייק - תלוי פרוייקט
3. הוא מריץ build או בדיקה. כיום, build מובן מאליו. בדיקה - רשות, תלויית הגדרות, ודרישה. עלולה לעלות ביוקר, ומצד שני הכרחית במקרים מסויימים של לולאות.
4. הוא נותן evidence: מה עבר, מה לא עבר, ומה נשאר לבדיקה.


## דוגמא נוספת - עבודה ב-repo הנוכחי

<div class="two-columns">

<div class="col-md-10 box-note" markdown="1">
כתוב 5-12 עמודי markdown kramdown תחת תיקיה agentic, שמטרתם ללמד מורים את הנושא Agentic Engineering / Harness Engineering. 
ראשית עמוד - ברמה תחילית לחשיפה ראשונה במשך 30 דקות. 
ושאר העמודים תוך מיקוד על תתי נושאים. 

ניתן ליצור תת תפריט תחת א מתקדם

לפני שאתה מתחיל סקור את אתר, ושמור לך קישורים לעמודים שכבר כרגע עושים בנושא - למשל אם יש משהו לגבי google sheets / clasp. אם לא, אז ספציפית לגבי הנושא הזה אני ארצה לשלוח לך חומר מתומצת.

הוסף עמוד לגבי playwright, ובתוכו גם התייחסות ליכולות חדשות של דפדפן בתוך codex

להלן רשימת הנושאים שעבורם יש ליצור הרחבות / עמודים.

**opener - in English:** We are in a world where developers spend their days “conversing with different agents, checking in on them, and seeing the work that they did. 

Sub-topics (so many things I need to teach):


- The difference between Online and Agentic (CLI/Extension/App) 
- Viable alternatives (April 26): openai, antropic.  
- Demo, (link to a youtube of my that I still need to edit).  
- Git and Github. 
- Agentic Engineering on **App scripts? clasp**  
- **AGENTS, Skills, Docs, and markdown**. It’s all about specifications. markdown - the language. 
- Hosting: Netlify, Pages, **Vercel, Railway**
- **TDD How to make the agent work longer:**  
  - Unit-tests 
  - TDD 
    - Green green 
    - Red green 
  - E2E testing:  
    - playwright  
      - Attach vs. CDP,  
      - Headed vs. Headless 
    - playwright-cli 
   - codex browser plugin
   - codex in-app browser

- How to Firebase from the first prompt? 
- Notify me when the agent is done? using PushBullet to know when Agent is done working. 


שמור על יכולות העיצוב המדהימות באמצעות {: .box-success}, {: .box-note}, {: .tabl-rl} לטבלאות דו לשוניות  
mermaid,  ושאר יכולות שכבר יש באתר כגון שאלונים אינטרקטיביים.

</div>
<div class="col-md-2" markdown="1">
![צילום מסך של פרומפט לדוגמה]({{ '/assets/img/agentic00/image.png' | relative_url }})
</div>

</div>

## שאלת יציאה


איזה חלק בעבודה עם agent הוא הכי מסוכן בכיתה?

{: .alefbet}

1. כתיבת קוד
1. מחיקת קבצים
1. קבלת תשובה בלי בדיקה
1. שימוש ב-Markdown


התשובה הרצויה היא **ג**. הבעיה אינה שה־agent כותב קוד. הבעיה היא שמקבלים תוצר בלי מסלול בדיקה, בלי Git, ובלי הגדרת אחריות.
## על מה נדבר בסדנה

- Online מול Agentic - מה ההבדל בין שיחה עם מודל לבין עבודה עם agent בתוך פרויקט אמיתי.
- Git ו-GitHub - איך שומרים נקודות חזרה, בודקים שינויים, ומלמדים עבודה אחראית עם קוד.
- AGENTS ו-Markdown - איך כותבים הוראות עבודה, מסמכי משימה ותיעוד שה-agent מסוגל לבצע לפיהם.
- Google Sheets ו-clasp - איך מחברים עבודה agentic לכלי בית ספר מוכרים כמו Sheets ו-Apps Script.
- Hosting - איך מעלים תוצר לרשת ומבינים את ההבדל בין קוד מקומי לשירות חי.
- TDD ובדיקות - איך נותנים ל-agent לרוץ יותר זמן בלי לאבד שליטה: בדיקות, build וקריטריוני סיום.
- Playwright ודפדפן Codex - איך בודקים ממשק בדפדפן ומקבלים ראיות ויזואליות שהתוצר עובד.
- Firebase מפרומפט ראשון - איך ניגשים לשירותי backend בלי להפוך את הפרומפט לקסם לא מבוקר.
- התראות PushBullet - איך מקבלים סימן כשה-agent סיים, במיוחד במשימות ארוכות.
