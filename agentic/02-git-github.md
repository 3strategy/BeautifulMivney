---
layout: page
title: "Git ו-GitHub עם Agents"
subtitle: "הבסיס שמאפשר לתת לסוכן לעבוד בלי לאבד שליטה"
tags: [agentic, git, github, pull-request, review]
lang: he
---

## למה Git הוא תנאי בסיסי

Agentic Engineering בלי Git הוא כמו מעבדה בלי מחברת ניסוי. אפשר לעבוד, אבל קשה לדעת מה השתנה, למה השתנה, ואיך חוזרים אחורה.

{: .box-success}
בכיתה, Git אינו רק כלי של מפתחים. הוא כלי פדגוגי: הוא מאפשר לראות תהליך, לא רק תוצר.

## שלושת מצבי העבודה

| מצב | שימוש | מתאים למורה? |
|---|---|---|
| Local checkpoint | לפני/אחרי משימה, diff מקומי | כן, חובה כמעט בכל דמו |
| Branch | ניסוי מבודד או עבודת תלמיד | כן, כשיש כמה משימות |
| Pull Request | review, דיון, תיעוד החלטות | כן, כשמלמדים צוות או פרויקט |
{: .tabl-rl}

## זרימת עבודה בסיסית

```mermaid
gitGraph
    commit id: "main clean"
    branch agent-task
    checkout agent-task
    commit id: "agent change"
    commit id: "tests/docs"
    checkout main
    merge agent-task
```

## מה לבקש מה־agent

```text
לפני שינוי:
1. בדוק git status.
2. אל תיגע בקבצים שיש בהם שינויים לא קשורים.
3. אחרי השינוי הצג רשימת קבצים ששונו.
4. הרץ בדיקה רלוונטית.
5. סכם מה בדיוק השתנה ומה לא נבדק.
```

## תבנית ל־Pull Request

```md
## What changed
- 

## Why
- 

## Evidence
- [ ] Build passed
- [ ] Unit tests passed
- [ ] Playwright/manual browser check passed

## Risks
- 

## Teacher review notes
- 
```

## נקודת חיבור לאתר הקיים

יש כבר עמוד מפורט על [Pull Requests](/android/projectSteps/202GitPullRequests). בסדרה הזו לא נחליף אותו. נשתמש בו כעמוד עומק ונוסיף את ההקשר החדש: PR כ־review surface לעבודה של agent.

## בדיקות לפני שמקבלים שינוי

1. `git diff` - מה באמת השתנה?
2. build - האם האתר / האפליקציה עדיין נבנים?
3. test - האם ההתנהגות נשמרה?
4. browser - האם המסך נראה נכון?
5. review - האם ההסבר תואם לקוד?

{: .box-note}
כדאי להרגיל תלמידים לסיים כל משימה במשפט: "הראיה שהשינוי עובד היא...". בלי ראיה, זו רק טענה.

## דוגמת פרומפט למורה

```text
עבוד על branch נפרד או worktree אם זמין.
הוסף תרגול קטן, הרץ בדיקות, ואז כתוב לי PR summary.
אל תבצע merge ואל תמחק branches.
```

## מקורות

- [GitHub Pages and Jekyll](https://docs.github.com/github/working-with-github-pages/about-github-pages-and-jekyll)
- [OpenAI Codex app review and Git workflows](https://developers.openai.com/codex/app)
- [Pull Requests באתר זה](/android/projectSteps/202GitPullRequests)
