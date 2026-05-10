---
layout: page
title: "Hosting: Pages, Netlify, Vercel, Railway"
subtitle: "איפה שמים תוצר כדי שאפשר יהיה לבדוק אותו באמת"
tags: [agentic, hosting, github-pages, netlify, vercel, railway]
lang: he
---

## למה hosting קשור ל־agentic?

Agent יכול לבנות עמוד או אפליקציה. אבל אם אף אחד לא רואה אותה בסביבה אמיתית, קשה לבדוק. Hosting הופך תוצר מקומי לכתובת, preview, או deployment שאפשר לשתף.

{: .box-success}
בהוראה, preview URL הוא ראיה. תלמיד יכול להגיד "זה עובד", אבל קישור עובד אומר יותר.

## ארבע אפשרויות שכדאי להכיר

| שירות | מתאים במיוחד ל | חוזקה | מגבלה חינוכית |
|---|---|---|---|
| GitHub Pages | אתרי Markdown/Jekyll, static HTML | פשוט, קרוב ל־Git | פחות מתאים ל־backend דינמי |
| Netlify | אתרים סטטיים ו־frontend מודרני | deploy previews ושיתופיות | צריך להבין build settings |
| Vercel | Next.js, frontend, AI/web apps | previews, CLI, אינטגרציה עם Git | עלול להסתיר מורכבות תשתית |
| Railway | backend, static hosting, services | מתאים גם לשרתים ו־databases | דורש זהירות בעלויות וסודות |
{: .tabl-rl}

## GitHub Pages באתר הזה

האתר הנוכחי הוא דוגמה מצוינת:

- Markdown נבנה ל־HTML.
- `_config.yml` מחזיק תפריטים.
- GitHub Actions יכול לבנות ולפרסם.
- קבצי תוכן הם חלק מה־repo ולכן agent יכול לערוך אותם.

ראו: [הסיפור מאחורי GitHub Pages](/2025-04-27-github-pages-story/).

## Preview workflow

```mermaid
flowchart LR
    A["Agent changes code"] --> B["Build locally"]
    B --> C["Commit / PR"]
    C --> D["Preview deployment"]
    D --> E["Teacher review"]
    E --> F["Fix or merge"]
```

## מה לבקש מה־agent

```text
לפני deployment:
1. ודא שאין secrets בקבצים.
2. הרץ build.
3. הסבר מה command ה-deploy.
4. אם יש preview URL, רשום אותו.
5. אל תעביר production בלי אישור מפורש.
```

## Vercel בקצרה

Vercel מאפשר deploy דרך Git או CLI. בתיעוד הרשמי, `vercel` מה־CLI יוצר deployment ומחזיר URL ב־stdout. זה שימושי ל־agents כי אפשר להפוך deployment לראיה אוטומטית.

```bash
vercel
vercel --prod
```

## Netlify בקצרה

Netlify מתאים מאוד ל־frontend ול־static sites. Deploy previews ו־branch deploys מאפשרים למורה לבדוק שינוי לפני production.

## Railway בקצרה

Railway שימושי כשיש גם backend, service, או database. נכון ל־2026 יש גם static hosting ו־PR previews, אבל צריך ללמד מראש ניהול env vars ועלויות.

## GitHub Pages בקצרה

GitHub Pages הוא static hosting מתוך repo. עבור מורים, זה כלי מצוין לתוכן לימודי, דפי Markdown, הדגמות HTML ו־Jekyll.

## שאלת בחירה למורים

```text
אם אני בונה אתר תוכן Markdown למורים, מה כנראה מספיק?
א. Railway
ב. GitHub Pages
ג. שרת VPS
ד. Firebase RTDB
```

התשובה הסבירה היא **ב**. אם מוסיפים backend או authentication, צריך לשקול פתרון אחר.

## מקורות

- [GitHub Pages overview](https://docs.github.com/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Pages and Jekyll](https://docs.github.com/github/working-with-github-pages/about-github-pages-and-jekyll)
- [Netlify deploy overview](https://docs.netlify.com/deploy/deploy-overview/)
- [Vercel deployment methods](https://vercel.com/docs/deployments/deployment-methods)
- [Railway static hosting](https://docs.railway.com/guides/static-hosting)
