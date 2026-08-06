---
layout: page
title: "Codex: פקודות, AGENTS.md וסביבת עבודה נכונה לסוכן"
lang: he
date: 2026-06-17
---

# Codex: פקודות, `AGENTS.md` וסביבת עבודה נכונה לסוכן

> המסמך מעודכן ל־17 ביוני 2026. פקודות Codex משתנות בין **Codex App**, תוסף ה־**IDE** וה־**CLI**, ולכן חשוב לא להניח שכל פקודה זמינה בכל ממשק.

{: .box-success}
ב־**Codex Desktop** ובתוסף **Codex ל־VS Code**, הקלידו `/` בתוך שדה ההודעה. מיד תיפתח רשימה של הפקודות הזמינות כרגע בממשק ובחשבון שלכם, עם משמעות כל פקודה; אפשר להמשיך להקליד כדי לסנן אותה. זו הדרך המהירה והאמינה לבדוק אילו switches זמינים בפועל, במקום להסתמך על רשימה ישנה במסמך.

## 1. שלוש שכבות שכדאי להפריד ביניהן

בעבודה מסודרת עם Codex יש שלושה סוגי מידע:

1. **הנחיות קבועות למאגר** — נשמרות ב־`AGENTS.md`.
2. **הגדרות והרשאות של Codex** — נשמרות בדרך כלל ב־`.codex/`, ב־`config.toml`, ב־hooks ובהגדרות סביבת העבודה.
3. **המשימה הנוכחית** — נכתבת בפרומפט, ב־issue, או במסמך מפרט כגון `docs/specs/...`.

הפרדה זו מונעת מצב שבו פרומפט אחד הופך למסמך ענק שמנסה ללמד את הסוכן מחדש את כל הפרויקט בכל משימה.

---

# חלק א: פקודות Slash שימושיות

## 2. Codex App 

אלה הפקודות הזמינות כיום ב־Codex App Beta נכון ל-20/6/26

{: .table-en}

| Command     | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| Code review | Review unstaged changes or compare against a branch                    |
| Compact     | Compact this thread's context (39% full)                               |
| Fast        | 1.5x speed, increased usage                                            |
| Feedback    | Send feedback about this chat                                          |
| Fork        | Fork this chat into local or a new worktree                            |
| Goal        | Set a goal that Codex will keep working towards                        |
| IDE context | Include current selection, open files, and other context from your IDE |
| Init        | Create an `AGENTS.md` file with instructions for Codex                 |
| MCP         | Show MCP server status                                                 |
| Memories    | Generate on                                                            |
| Model       | GPT-5.5                                                                |
| Personality | Choose how Codex responds                                              |
| Pet         | Wake or tuck away the desktop pet                                      |
| Plan mode   | Turn plan mode on                                                      |
| Reasoning   | High                                                                   |
| Side        | Start a side conversation in an ephemeral fork. **The only one that's not in the VSCode extension**        |
| Status      | Show chat id, context usage, and rate limits                           |

דוגמה:

```text
/plan

מטרת המשימה: להוסיף שחזור סיסמה.
לפני שינוי קוד:
1. אתר את מנגנון ההזדהות הקיים.
2. זהה אילו שירותים ונתיבים יושפעו.
3. הצע תוכנית בדיקות.
4. אל תממש עד שהתוכנית ברורה.
```

לאחר שהתוכנית טובה:

```text
/goal Implement password recovery according to the approved plan.
```

## 3. תוסף Codex לVSCode - זהה לחלוטין פרט ל-1

## 4. Codex CLI (לא ניסיתי)

ב־CLI יש יותר פקודות. אלה השימושיות ביותר לעבודה יומיומית:

| פקודה | שימוש |
|---|---|
| `/plan` | מעבר למצב תכנון. אפשר לצרף את מטרת התכנון באותה שורה. |
| `/goal` | הגדרת יעד מתמשך; תומך גם ב־`pause`, `resume`, `clear`. |
| `/permissions` | בחירת רמת הרשאות ואישורים. |
| `/status` | הצגת מודל, מדיניות, תיקיות כתיבות ושימוש בהקשר. |
| `/model` | החלפת מודל או הגדרת מאמץ חשיבה, כאשר נתמך. |
| `/fast` | מעבר למצב מהיר, כאשר נתמך. |
| `/review` | סקירת ה־working tree, עם דגש על שינויי התנהגות ובדיקות חסרות. |
| `/diff` | הצגת ה־Git diff הנוכחי. |
| `/compact` | דחיסת היסטוריית השיחה כדי לפנות מקום בהקשר. |
| `/fork` | יצירת הסתעפות מהשיחה הנוכחית. |
| `/side` או `/btw` | שיחת צד זמנית בלי לזהם את המשימה הראשית. |
| `/resume` | חזרה לסשן קודם. |
| `/new` | התחלת שיחה חדשה. |
| `/init` | יצירת שלד `AGENTS.md`. |
| `/mcp` | הצגת שרתי וכלי MCP. |
| `/agent` | בחירה או הפעלה של agent profile, כאשר הוגדר. |
| `/ps` | הצגת תהליכים או משימות פעילות. |
| `/stop` | עצירת משימה פעילה. |
| `/quit` | יציאה. |

### רצף עבודה שימושי ב־CLI

```text
/status
/plan Refactor the payment validation without changing public behavior.
```

לאחר אישור התוכנית:

```text
/permissions
```

בחר הרשאות מתאימות, בצע את העבודה, ואז:

```text
/diff
/review
```

### מתי להשתמש ב־`/compact`

אני מציע KIS. קודקס יעשה compact כשצריך. ההחלטה החשובה שלכם היא מתי להתחיל פרומפט אחר.

השתמש ב־`/compact` כאשר:

- הסשן ארוך;
- הסוכן מתחיל לשכוח החלטות ישנות;
- נוצר רעש רב מקריאת קבצים ולוגים;
- אתה רוצה להמשיך את אותה משימה בלי לפתוח סשן חדש.

לפני הדחיסה כדאי לוודא שהחלטות חשובות נשמרו בקובץ אמיתי, למשל `docs/specs/feature-x.md` או `TASKS.md`. אל תסתמך על היסטוריית הצ'אט כמאגר הידע היחיד.

---

# חלק ב: בניית סביבת Agent טובה

## 5. `AGENTS.md`: ההנחיות הקבועות של המאגר

Codex קורא קובצי `AGENTS.md` לפני תחילת העבודה.

### המיקום המומלץ

```text
my-project/
├── AGENTS.md
├── src/
├── tests/
└── ...
```

קובץ זה מתאים לכללים כגון:

- פקודות build ו־test;
- סגנון קוד;
- מבנה שכבות;
- קבצים שאסור לשנות;
- Definition of Done;
- כללי אבטחה;
- צורת דיווח בסוף משימה.

### היררכיית הנחיות

Codex מחפש הנחיות מהשורש כלפי התיקייה שבה הוא עובד. קובץ קרוב יותר לעבודה גובר על קובץ כללי יותר.

דוגמה:

```text
my-project/
├── AGENTS.md
├── backend/
│   ├── AGENTS.md
│   └── src/
└── frontend/
    ├── AGENTS.override.md
    └── src/
```

אפשר להשתמש כך:

- `AGENTS.md` בשורש — כללי הפרויקט כולו.
- `backend/AGENTS.md` — כללים ייחודיים לשרת.
- `frontend/AGENTS.override.md` — החלפה מכוונת של כללים עבור ה־frontend.

אל תיצור עשרות קובצי הנחיות ללא צורך. היררכיה עמוקה מדי מקשה להבין איזה כלל פעיל.

## 6. ומה לגבי `.codex/AGENTS.md`?

ברירת המחדל הגלובלית היא:

```text
~/.codex/AGENTS.md
```

או, אם קיים:

```text
~/.codex/AGENTS.override.md
```

זהו קובץ אישי, החוצה פרויקטים, המתאים להעדפות קבועות כגון:

```markdown
# Personal Codex defaults

- Inspect existing conventions before introducing a new pattern.
- Keep changes scoped to the requested task.
- Do not add production dependencies without explaining why.
- At the end, report:
  - files changed;
  - tests run;
  - tests not run;
  - remaining risks.
```

חשוב: בתוך מאגר רגיל, `project/.codex/AGENTS.md` **אינו** תחליף אוטומטי ל־`project/AGENTS.md`.

אפשר לגרום לו לשמש כ־Codex home באופן מכוון:

```bash
CODEX_HOME="$(pwd)/.codex" codex exec "..."
```

אך זהו שימוש מתקדם. ברוב הפרויקטים עדיף:

- הנחיות מאגר ב־`AGENTS.md`;
- הגדרות Codex ו־hooks ב־`.codex/`;
- skills משותפים ב־`.agents/skills/`.

## 7. מה כן לשמור ב־`.codex/`

מבנה אפשרי:

```text
.codex/
├── config.toml
└── hooks.json
```

לפי יכולות Codex והצורך בפרויקט, תיקייה זו יכולה להכיל:

- הגדרות פרויקט;
- hooks;
- הרשאות וכללי סביבת עבודה;
- תצורת local environment של Codex App.

### Hooks שימושיים

Hook טוב הופך כלל כתוב לבקרה אוטומטית. שימושים אפשריים:

- להריץ בדיקה לפני שהסוכן מסיים;
- לחסום סיום כאשר יש lint errors;
- לבצע secret scanning;
- לשמור audit log;
- לוודא שה־working tree אינו כולל קבצים אסורים.

אל תכניס ל־hook בדיקה מלאה ואיטית לכל פעולה קטנה. עדיף להפריד:

- gate מהיר בכל איטרציה;
- suite מלא לפני סיום או ב־CI.

## 8. Skills משותפים

לזרימות חוזרות אפשר ליצור skill תחת:

```text
.agents/skills/<skill-name>/SKILL.md
```

Skill מתאים לתהליך שחוזר בכמה משימות, למשל:

- יצירת migration לפי כללי החברה;
- בדיקת נגישות;
- הכנת release notes;
- הרצת תהליך triage;
- בניית רכיב UI לפי design system.

ב־skill אפשר לצרף גם scripts, references ו־assets. אל תעתיק ל־`AGENTS.md` מדריך ארוך של מאות שורות כאשר הוא רלוונטי רק לסוג משימה מסוים.

---

# חלק ג: כיצד לכתוב `AGENTS.md` טוב

## 9. דוגמה שימושית

```markdown
# Project instructions

## Repository map

- `src/api`: HTTP endpoints and request validation.
- `src/domain`: business rules; must not depend on infrastructure.
- `src/infrastructure`: database and external providers.
- `tests/unit`: fast isolated tests.
- `tests/integration`: tests that use disposable infrastructure.
- `e2e`: Playwright tests for critical user journeys.

## Commands

- Install: `pnpm install --frozen-lockfile`
- Fast check: `pnpm lint && pnpm typecheck && pnpm test:unit`
- Integration: `pnpm test:integration`
- E2E smoke: `pnpm test:e2e --grep @smoke`
- Full validation: `pnpm validate`

## Working rules

- Follow existing patterns before adding an abstraction.
- Keep public APIs backward compatible unless the task explicitly changes them.
- Do not edit an already-released migration.
- Do not use production services or production credentials in tests.
- For a bug fix, add a regression test when practical.
- For UI behavior changes, update or add a Playwright test for the affected journey.

## Definition of done

- The requested behavior is implemented.
- Relevant tests pass.
- New warnings are not introduced.
- Documentation is updated when public behavior or setup changes.
- The final response lists tests run, tests not run, and residual risks.
```

### כללים לכתיבה

`AGENTS.md` טוב הוא:

- קצר מספיק כדי להיקרא בכל משימה;
- מפורש לגבי פקודות;
- מבוסס על כללים שניתנים לבדיקה;
- לא סותר את ה־README או את ה־CI;
- מעודכן יחד עם שינויי התשתית.

כלל חלש:

```text
Write clean code and test everything.
```

כלל טוב יותר:

```text
Before finishing a backend change, run:
dotnet test tests/UnitTests &&
dotnet test tests/IntegrationTests --filter Category!=Slow

If either command cannot run, explain the blocker and do not claim validation.
```

## 10. בדיקת ההנחיות הפעילות

אפשר לבקש מ־Codex לסכם את ההנחיות שקרא:

```bash
codex --ask-for-approval never "Summarize the current instructions."
```

כדאי לבצע זאת לאחר:

- הוספת `AGENTS.md`;
- יצירת override בתת־פרויקט;
- שינוי `CODEX_HOME`;
- מעבר לתיקיית עבודה אחרת;
- חשד שהסוכן מתעלם מכלל חשוב.

---

# חלק ד: מסמכי מפרט — כן או לא?

## 11. לא כל משימה צריכה Specification

מסמך מפרט מוסיף ערך כאשר מחיר אי־ההבנה גבוה. הוא מזיק כאשר הוא הופך לטקס ארוך למשימה של חמש דקות.

### בלי מסמך נפרד

מתאים כאשר:

- השינוי מקומי;
- ההתנהגות ברורה;
- יש בדיקות קיימות;
- אין שינוי API, נתונים או אבטחה;
- אפשר להגדיר Done בכמה שורות בפרומפט.

דוגמה: תיקון typo, שינוי label, הוספת validation פשוטה.

### מפרט קל

למשימה בינונית אפשר להשתמש ב־issue או ב־`TASK.md`:

```markdown
# Task: prevent duplicate invitations

## Goal

A user must not receive two active invitations for the same organization.

## Non-goals

- Redesigning invitation emails.
- Changing expired-invitation behavior.

## Acceptance criteria

- A second active invitation is rejected.
- The API returns the documented conflict response.
- Existing expired invitations remain valid history.
- A regression test covers the race-prone path.

## Validation

- Unit tests for the domain rule.
- Integration test for the database constraint.
```

### מפרט מלא

השתמש ב־`docs/specs/<feature>.md` כאשר יש:

- שינוי שחוצה כמה רכיבים;
- migration או שינוי מודל נתונים;
- API ציבורי;
- הרשאות, אבטחה או פרטיות;
- כמה בעלי עניין;
- עבודה של כמה ימים או כמה agents;
- rollout הדרגתי או backward compatibility;
- עמימות עסקית משמעותית.

מבנה מומלץ:

```markdown
# Feature name

- Status:
- Owner:
- Last updated:

## Problem
## Goal
## Non-goals
## User-visible behavior
## Current system
## Proposed design
## Data and API changes
## Security and privacy
## Acceptance criteria
## Test plan
## Rollout and rollback
## Open questions
## Decisions
```

להחלטה ארכיטקטונית שקשה לבטל, השתמש גם ב־ADR:

```text
docs/adr/0007-use-outbox-for-event-delivery.md
```

## 12. Spec-Driven Development

ב־Spec-Driven Development עובדים בדרך כלל בסדר:

```text
Spec → Plan → Tasks → Implement
```

הגישה מתאימה במיוחד כאשר הסוכן צריך להמשיך לאורך זמן או כאשר כמה אנשים ו־agents עובדים על אותה מטרה. המפרט הוא מקור האמת; הצ'אט הוא רק ממשק עבודה.

עם זאת, אין להפוך כל משימה ל־SDD. כלל אצבע:

> אם עלות המימוש הלא נכון גבוהה מעלות כתיבת מפרט קצר — כתוב מפרט.

---

# חלק ה: פרויקט בדיקות ו־Harness

## 13. האם ליצור פרויקט בדיקות נפרד?

אין תשובה אחת לכל טכנולוגיה.

### Unit tests

בדרך כלל כדאי לשמור אותם קרוב למבנה הקוד או בפרויקט בדיקות סטנדרטי של הטכנולוגיה:

```text
src/
tests/unit/
```

או ב־.NET:

```text
src/MyApp/
tests/MyApp.UnitTests/
```

### Integration tests

פרויקט נפרד מועיל כאשר הבדיקות זקוקות ל:

- מסד נתונים;
- containers;
- message broker;
- filesystem;
- שירותים חיצוניים מדומים;
- setup ו־teardown ייחודיים.

```text
tests/MyApp.IntegrationTests/
```

### E2E עם Playwright

לרוב נוח להחזיק harness נפרד:

```text
e2e/
├── playwright.config.ts
├── fixtures/
├── pages/
└── tests/
```

ההפרדה מועילה מפני של־E2E יש:

- browsers ותלויות משלו;
- סודות ו־base URLs;
- fixtures;
- traces, screenshots ו־videos;
- זמני ריצה ארוכים יותר;
- pipeline שונה מ־unit tests.

Playwright ממליץ לבדוק התנהגות שהמשתמש רואה, להשתמש ב־locators יציבים ולשמור על בידוד בין בדיקות. הימנע מבדיקות הקשורות למבנה DOM מקרי או ל־class names פנימיים.

## 14. פירמידת אימות לסוכן

כדי שהסוכן יוכל לעבוד בלולאה יעילה, תן לו כמה רמות אימות:

```text
Level 0 — static inspection only
Level 1 — one targeted check
Level 2 — relevant unit/integration suite
Level 3 — full regression and E2E/CI-equivalent validation
```

דוגמה לפקודות:

```text
pnpm test:changed
pnpm test:unit
pnpm test:integration
pnpm test:e2e --grep @smoke
pnpm validate
```

לולאה טובה:

1. לאחר שינוי קטן — בדיקה ממוקדת ומהירה.
2. לאחר השלמת רכיב — suite רלוונטי.
3. לפני סיום — בדיקות מלאות לפי רמת הסיכון.
4. ב־CI — gate בלתי תלוי בסוכן.

## 15. מאפיינים של Harness טוב

Harness טוב לסוכן צריך להיות:

- **דטרמיניסטי** ככל האפשר;
- **מהיר** בלולאה המקומית;
- בעל **פקודת כניסה אחת וברורה**;
- מסוגל לאפס state;
- מבודד מפרודקשן;
- מפיק שגיאה קריאה;
- שומר artifacts בכישלון;
- בעל timeout;
- עם retries מוגבלים ומוסברים;
- מסוגל להבדיל בין כשל מוצר לכשל תשתית.

מומלץ לכלול:

```text
scripts/
├── test-fast.sh
├── test-changed.sh
├── validate.sh
├── seed-test-data.sh
└── reset-test-env.sh
```

ב־Windows אפשר לספק מקבילות PowerShell.

## 16. בדיקות UI חכמות יותר

ב־E2E כדאי להוסיף:

- תרחישי smoke למסלולים הקריטיים;
- fixtures או factories לנתוני בדיקה;
- משתמשים ייעודיים לבדיקות;
- API helpers להכנת state במקום הקלקות ארוכות;
- trace ו־screenshot בכישלון;
- tags כגון `@smoke`, `@critical`, `@slow`;
- בדיקות נגישות למסכים חשובים;
- visual regression רק במקומות שבהם יציבות חזותית חשובה.

אל תדרוש מהסוכן להריץ את כל ה־E2E לאחר כל שינוי CSS קטן. תן פקודת smoke מהירה ופקודה מלאה לסיום.

---

# חלק ו: מבנה מאגר מומלץ

```text
.
├── AGENTS.md
├── README.md
├── docs/
│   ├── architecture.md
│   ├── specs/
│   └── adr/
├── src/
├── tests/
│   ├── unit/
│   └── integration/
├── e2e/
│   ├── playwright.config.ts
│   ├── fixtures/
│   └── tests/
├── scripts/
│   ├── test-fast.sh
│   └── validate.sh
├── .agents/
│   └── skills/
└── .codex/
    ├── config.toml
    └── hooks.json
```

לא כל פרויקט זקוק לכל התיקיות. המבנה צריך לשרת את העבודה, לא להפוך למטרה בפני עצמה.

---

# חלק ז: תבנית פרומפט מומלצת

Codex עובד טוב יותר כאשר הפרומפט כולל ארבעה דברים:

```text
Goal
Context
Constraints
Done when
```

דוגמה:

```text
Goal:
Prevent duplicate active invitations to the same organization.

Context:
The invitation flow starts in src/api/invitations and uses the repository
under src/infrastructure. Existing behavior for expired invitations must remain.

Constraints:
- Do not change the public success response.
- Do not add a production dependency.
- Preserve existing database migrations.
- Keep the patch scoped to invitation creation.

Done when:
- A regression test fails before the fix and passes after it.
- The database path is protected against concurrent requests.
- Relevant unit and integration tests pass.
- The final response lists commands run and remaining risks.

Testing level:
Level 2 now; Level 3 before final completion.
```

למשימה מורכבת, הפעל קודם `/plan`.

---

# Checklist קצר

לפני שמתחילים לעבוד עם agent על מאגר:

- [ ] יש `AGENTS.md` קצר ומעודכן בשורש.
- [ ] פקודות build/test אמיתיות ומועתקות מה־CI.
- [ ] יש בדיקה מהירה ללולאה ובדיקה מלאה לסיום.
- [ ] משימות גדולות מקבלות spec או issue עם acceptance criteria.
- [ ] `.codex/` משמש להגדרות ו־hooks, לא כתחליף שגרתי ל־`AGENTS.md`.
- [ ] E2E מבודד, ניתן לאיפוס ושומר artifacts בכישלון.
- [ ] הסוכן מדווח מה נבדק ומה לא נבדק.
- [ ] אין גישה לסודות או לפרודקשן ללא צורך מפורש.
- [ ] יש stop condition ברור.

---

# מקורות להמשך

- OpenAI — Codex App commands:  
  https://developers.openai.com/codex/app/commands
- OpenAI — Codex IDE slash commands:  
  https://developers.openai.com/codex/ide/slash-commands
- OpenAI — Codex CLI slash commands:  
  https://developers.openai.com/codex/cli/slash-commands
- OpenAI — `AGENTS.md` guide:  
  https://developers.openai.com/codex/guides/agents-md
- OpenAI — Codex best practices:  
  https://developers.openai.com/codex/learn/best-practices
- OpenAI — Prompting Codex:  
  https://developers.openai.com/codex/prompting
- OpenAI — Codex hooks:  
  https://developers.openai.com/codex/hooks
- OpenAI — Codex skills:  
  https://developers.openai.com/codex/skills
- OpenAI — Local environments:  
  https://developers.openai.com/codex/app/local-environments
- Playwright — Best practices:  
  https://playwright.dev/docs/best-practices
- GitHub Spec Kit:  
  https://github.github.com/spec-kit/
