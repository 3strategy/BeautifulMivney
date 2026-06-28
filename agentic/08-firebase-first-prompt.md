---
layout: page
title: "פרוייקט one-shot prompt + Firebase מהפרומפט הראשון או שני"
subtitle: "איך לבקש backend אם כבר יש לכם RTDB קיים"
tags: [agentic, firebase, android, rtdb, prompt, vercel, one-shot]
lang: he
---

{: .box-note}
תיאור של תהליך יצירת פרוייקט מלא. יחסית גנרי מפני שלא ידעתי מה הדרישות. בניית תשתיות לפני תכולה פונקציונאלית - טיפה בעייתי כמובן, אבל זה מה שבוצע כאן, וניתן להיעזר בזה בדיוק בסדנה - כאשר התוכן פתוח לגמרי.

## סרטון התהליך

{% include youtube.html id="LD0rePKLCyc" %}

---

**הערות לסרטון:**

- [האתר שנולד בפרומפט הזה נמצא כאן](https://vibe180326.vercel.app/){:target="_blank"}
- [הגיט כאן](https://github.com/myUsertegy/vibe180326){:target="_blank"} קומיטס של 18/3 בשעות:
  - 18:21 empty.
  - 18:49 before spec (harness and infa only - to reach running site)
  - 18:53 firebase RTDB
  - 19:06 implement spec
  - 19:40 (hebrew + OAuth)
  - 19:57 (font)
- ה-deployment בוצע בפקודה לאייג'נט שיעשה deploy ל-vercel בתוספת הבהרה שאני לא מכיר את התהליך אבל יש לי חשבון. האייג'נט ביצע ואני רק התבקשתי לאשר login - לתת כמה ספרות.

## הפרומפטים בהם השתשמתי

### כאשר האתר ריק, אחרי commit and share to github.

<div markdown="1" class="box-note english">

In this project we will perform a peer competition among some teachers, and between models. The project is empty, we have a private git for tracking. Ask me question though I don't know the topic of the competition yet. I propose you spin up either react or node or any local server you prefer to get a nice UI demo running. If you like to have firebase connectivity, let me know and we can try to prepare in advance connectivity to some existing RTDB I have. we can patch this prep in advance to get ourselves going. Just let me know what you need for the rtdb config.json and / or any questions you may have. 
Pleae update AGENTS with the urgency of the way we will work here - trying to get max output in a very short time. preferably you should be able to look at your UI with playwright and or playwrigth-cli so probably should test these are working for you. 
I suggest you choose whichever platform you are most comfortable with for quick and dirty UI work.

</div>

#### התשובה

<div class="english">

I’m treating this as bootstrap work: set up a fast local UI stack, make sure the repo has working-agent instructions in AGENTS, and verify a browser path so we can iterate quickly. ...
...

Bootstrapped the repo with Vite + React + TypeScript and replaced the starter with a competition control-room demo in [src/App.tsx](C:/Users/3stra/source/repos/vibe180326/src/App.tsx) and [src/App.css](C:/Users/3stra/source/repos/vibe180326/src/App.css). I rewrote [AGENTS.md](C:/Users/3stra/source/repos/vibe180326/AGENTS.md) around high-speed, reversible execution, added RTDB-ready env prep in [.env.example](C:/Users/3stra/source/repos/vibe180326/.env.example), and wired Playwright in [playwright.config.ts](C:/Users/3stra/source/repos/vibe180326/playwright.config.ts) plus [tests/smoke.spec.ts](C:/Users/3stra/source/repos/vibe180326/tests/smoke.spec.ts).
Verified locally with npm run build, npm run lint, and npm run test:e2e. npm run dev starts the UI, and npm run dev:host is the fixed host/port path Playwright uses.
For Firebase: the existing [google-services.json](C:/Users/3stra/source/repos/vibe180326/google-services.json) looks like Android config, not a complete web config for this Vite app. To wire RTDB next, send the Firebase web app config or fill [.env.example](C:/Users/3stra/source/repos/vibe180326/.env.example) with apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, and appId.
Three non-topic questions that matter now:
Which lane should I optimize first: Teacher vs Teacher, Model vs Model, or Teacher + Model Tag Team?
Who should score round one: peers, organizer panel, audience, or a weighted mix?
If I wire RTDB next, do you want anonymous live entries or identified users/accounts?

</div>

### פרומפט המשך - התייחסות לליקויי הגדרה הקשורים לפיירבייס


<div markdown="1" class="box-note english">


Here is a web config for you.

```json
const firebaseConfig = {
  apiKey: "AIzaBSK_iLk2tquUEr-243P9-9C8U",
  authDomain: "guys.firebaseapp.com",
  databaseURL: "https://guys-default-rtdb.firebaseio.com",
  projectId: "guys",
  storageBucket: "guys.firebasestorage.app",
  messagingSenderId: "305422111273",
  appId: "1:305422111273:web:87f1865bqwgaaad9cb48"
};
```

**I don't know yet what the app should do,** but as a start I want you to tell me how to lauch UI / local server so I can commit first version, and then wait till we really start.

In firebase - update agents that you have free read write rules and just avoid writing the root branches that are in the attached image.
There won't be a firebase auth right now (to make this quick). users may provide any alias as user name and work in the app.

no answer to q2 : it assumes knowledge of what are are coding. I have no clue yet.

**just show me a working headed playwright smoke test - working server**

</div>

#### agent's answer

Added [USERS.md](C:/Users/YouName/source/repos/vibe180326/USERS.md) with the runbook for:
`npm install`
`npm run dev`
`npm run dev:host`
`npm run test:e2e`
`npm run test:e2e:headed`

### פרומפט המשך

<div class="box-note english">

as part of firebase readyness see you can write read a key to / from branch /vibe18
</div>

#### תשובה

Firebase readiness is confirmed. I successfully wrote to and read back from https://guys-rtdb.firebaseio.com/vibe18/readinessProbe.json; the returned object included value: "ok" and writtenAt: "2026-03-18T16:51:19.197Z".
I added a reusable smoke command in [scripts/firebase-smoke.mjs](C:/Users/YourUse/source/repos/vibe180326/scripts/firebase-smoke.mjs), exposed it in [package.json](C:/Users/YourUse/source/repos/vibe180326/package.json), documented it in [USERS.md](C:/Users/YourUse/source/repos/vibe180326/USERS.md), and tightened the RTDB working rules in [AGENTS.md](C:/Users/YourUse/source/repos/vibe180326/AGENTS.md) so project writes stay under vibe18 and avoid Students, Tasks, Users, and Years.


### פרומפט שלישי - שוב אחרי commit

<div class="box-note english">

read write is ok. project is commited.
Now read rules_for_competition.docx in the project folder. ask me some questions if you need or go directly to coding if you feel this is clear. 
I propose you stop when you need me to clarify or test becaue I don't know if this spec is well written.

you may spawn agents.

</div>
