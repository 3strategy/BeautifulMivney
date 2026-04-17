---
layout: page
title: שאלון כניסה ללימודי מדעי המחשב – סדרה א'
tags: [לוגיקה, חשיבה חישובית, שאלון, אינטראקטיבי, מדעי המחשב]
lang: he
full-width: true
tracked_quiz: true
quiz_key: "27-logic-cs-entrance-a"
quiz_window_start: "2026-04-15T08:00:00+03:00"
quiz_window_end: "2026-04-15T23:59:59+03:00"
quiz_unlock_token: "yesodot-logic-a-2026-eK3mP9x1"
quiz_debug_uids:
  - "YtfYwYQ5FxOFk50npfDWF0Ekq7i1"
---

<!-- interactive -->

<div class="box-note" markdown="1">
זהו שאלון כניסה מוגן.

הדף עצמו ציבורי, אבל פתיחת השאלון מחייבת:

- התחברות עם Google
- קישור מלא, בחלון זמן פעיל

ההתקדמות נשמרת אוטומטית, והשליחה הסופית ננעלת.
</div>


<div id="tracked-quiz-status"></div>
<div id="tracked-quiz-account"></div>
<div id="quiz-root" class="hidden"></div>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<script>
const BALANCE_RIGHT_ASSET = "{{ '/assets/img/balance.svg' | relative_url }}";
const BALANCE_LEFT_ASSET = "{{ '/assets/img/balance-mirror.svg' | relative_url }}";
const BALANCE_BALANCED_ASSET = "{{ '/assets/img/balance-balanced.svg' | relative_url }}";
const BALANCE_IMAGE_WIDTH = 473;
const BALANCE_IMAGE_HEIGHT = 255;
const BALANCE_ROW_SCALE = 0.72;
const BALANCE_ROW_GAP = 14;
const BALANCE_ROW_WIDTH = BALANCE_IMAGE_WIDTH * BALANCE_ROW_SCALE;
const BALANCE_ROW_HEIGHT = BALANCE_IMAGE_HEIGHT * BALANCE_ROW_SCALE;
const BALANCE_ITEM_SLOTS = {
  rightHeavy: {
    left: [
      { x: 108, y: 84 },
      { x: 88, y: 86 },
      { x: 128, y: 86 },
    ],
    right: [
      { x: 377, y: 117 },
      { x: 355, y: 118 },
      { x: 399, y: 118 },
    ],
  },
  leftHeavy: {
    left: [
      { x: 96, y: 117 },
      { x: 74, y: 118 },
      { x: 118, y: 118 },
    ],
    right: [
      { x: 365, y: 84 },
      { x: 343, y: 86 },
      { x: 387, y: 86 },
    ],
  },
  balanced: {
    left: [
      { x: 108, y: 99 },
      { x: 86, y: 101 },
      { x: 130, y: 101 },
    ],
    right: [
      { x: 377, y: 99 },
      { x: 355, y: 101 },
      { x: 399, y: 101 },
    ],
  },
};

function escapeSvgText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderBalanceItems(items, relation, side) {
  const slots = BALANCE_ITEM_SLOTS[relation][side];
  return (items || []).slice(0, slots.length).map((item, index) => {
    const slot = slots[index];
    return `<text x="${slot.x}" y="${slot.y}" text-anchor="middle" dominant-baseline="middle" font-size="34" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${escapeSvgText(item)}</text>`;
  }).join("");
}

function buildBalanceRow(row, yOffset) {
  const relation = ["leftHeavy", "rightHeavy", "balanced"].includes(row.relation)
    ? row.relation
    : "rightHeavy";
  const asset = relation === "leftHeavy"
    ? BALANCE_LEFT_ASSET
    : relation === "balanced"
      ? BALANCE_BALANCED_ASSET
      : BALANCE_RIGHT_ASSET;

  return `<g transform="translate(14, ${yOffset}) scale(${BALANCE_ROW_SCALE})">
    <image href="${asset}" x="0" y="0" width="${BALANCE_IMAGE_WIDTH}" height="${BALANCE_IMAGE_HEIGHT}" />
    ${renderBalanceItems(row.left, relation, "left")}
    ${renderBalanceItems(row.right, relation, "right")}
  </g>`;
}

function buildBalancePuzzle(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const height = safeRows.length * BALANCE_ROW_HEIGHT + Math.max(0, safeRows.length - 1) * BALANCE_ROW_GAP + 8;
  const width = BALANCE_ROW_WIDTH + 28;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="תרגיל מאזניים" style="display:block;margin:0 auto;max-width:380px">
    ${safeRows.map((row, index) => buildBalanceRow(row, 4 + index * (BALANCE_ROW_HEIGHT + BALANCE_ROW_GAP))).join("")}
  </svg>`;
}

function ltrCode(text) {
  return `\`${text}\``;
}

function signedNumber(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function pointText(x, y) {
  return ltrCode(`(${x},${y})`);
}

function deltaText(x, y) {
  return ltrCode(`(${signedNumber(x)},${signedNumber(y)})`);
}

function positionChoice(x, y, directionHe) {
  return `${pointText(x, y)}, ${directionHe}`;
}

function emojiChoiceText(items) {
  const safeItems = Array.isArray(items) ? items : [items];
  return safeItems.join(" ו- ");
}

function emojiChoiceHtml(items) {
  const safeItems = Array.isArray(items) ? items : [items];
  return `<span class="quiz-choice-emoji-line">${safeItems.map((item, index) => `
    ${index ? '<span class="quiz-choice-emoji-joiner">ו-</span>' : ""}
    <span class="quiz-choice-emoji">${escapeSvgText(item)}</span>
  `).join("")}</span>`;
}

function singleEmojiChoice(key, emoji) {
  return {
    key,
    text: emoji,
    choiceHtml: emojiChoiceHtml([emoji]),
  };
}

function pairEmojiChoice(key, left, right) {
  return {
    key,
    text: emojiChoiceText([left, right]),
    choiceHtml: emojiChoiceHtml([left, right]),
  };
}

window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🦊"], right: ["🐘"], relation: "rightHeavy" },
      { left: ["🦊"], right: ["🐰"], relation: "leftHeavy" },
      { left: ["🐘"], right: ["🦉"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐘"),
      singleEmojiChoice("B", "🦊"),
      singleEmojiChoice("C", "🦉"),
      singleEmojiChoice("D", "🐰"),
    ],
    correctKey: "A",
    explanationHe: "הפיל כבד מהשועל ומהינשוף, והשועל כבד מהארנב. לכן הפיל הוא הכבד ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 2,
    title: "שאלה 2: מי קל יותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐢"], right: ["🐦"], relation: "leftHeavy" },
      { left: ["🐸"], right: ["🐦"], relation: "rightHeavy" },
      { left: ["🐸"], right: ["🐌"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐢"),
      singleEmojiChoice("B", "🐦"),
      singleEmojiChoice("C", "🐸"),
      singleEmojiChoice("D", "🐌"),
    ],
    correctKey: "D",
    explanationHe: "מהמאזניים מתקבלת השרשרת צב > ברווז > צפרדע > חילזון, ולכן החילזון הוא הקל ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 3,
    title: "שאלה 3: רובוט על קו המספרים",
    promptHe: `רובוט מתחיל ב-${ltrCode("0")}. פקודות: צעד = ${ltrCode("+1")}, קפיצה = ${ltrCode("+2")}, חזור = ${ltrCode("-1")}. הסדרה היא: צעד, קפיצה, צעד, חזור. לאיזה מספר הוא מגיע?`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" },
    ],
    correctKey: "C",
    explanationHe: `המעבר הוא ${ltrCode("0")} ל-${ltrCode("1")}, אחר כך ל-${ltrCode("3")}, אחר כך ל-${ltrCode("4")}, ואז חזרה ל-${ltrCode("3")}.`,
    tags: ["סימולציית רובוט"],
  },
  {
    id: 4,
    title: "שאלה 4: מי הגבוה ביותר?",
    promptHe: "שלושה תלמידים עומדים ליד הלוח: דנה, אמיר וליאור. דנה אינה הגבוהה ביותר, ואמיר גבוה מליאור. מי הגבוה ביותר?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "דנה" },
      { key: "B", text: "אמיר" },
      { key: "C", text: "ליאור" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "B",
    explanationHe: "אם דנה אינה הגבוהה ביותר ואמיר גבוה מליאור, רק אמיר יכול להיות הגבוה ביותר.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 5,
    title: "שאלה 5: מה בטוח נכון?",
    promptHe: "כל מי שבא באופניים חבש קסדה. שירה באה היום באופניים לבית הספר. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "שירה חבשה קסדה" },
      { key: "B", text: "שירה באה באוטובוס" },
      { key: "C", text: "לכל הכיתה היו קסדות" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "A",
    explanationHe: "מהכלל ומהמידע על שירה נובע בוודאות שגם היא חבשה קסדה.",
    tags: ["הסקה"],
  },
  {
    id: 6,
    title: "שאלה 6: מי השני בכובדו?",
    promptHtml: buildBalancePuzzle([
      { left: ["🦁"], right: ["🐺"], relation: "rightHeavy" },
      { left: ["🦁"], right: ["🦊"], relation: "leftHeavy" },
      { left: ["🦊"], right: ["🐸"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐺"),
      singleEmojiChoice("B", "🦁"),
      singleEmojiChoice("C", "🦊"),
      singleEmojiChoice("D", "🐸"),
    ],
    correctKey: "B",
    explanationHe: "הסדר שמתקבל הוא זאב > אריה > שועל > צפרדע, ולכן האריה הוא השני בכובדו.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 7,
    title: "שאלה 7: מי הקל ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🦊"], right: ["🐺"], relation: "leftHeavy" },
      { left: ["🦉"], right: ["🐺"], relation: "rightHeavy" },
      { left: ["🦉"], right: ["🐜"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🦊"),
      singleEmojiChoice("B", "🐺"),
      singleEmojiChoice("C", "🦉"),
      singleEmojiChoice("D", "🐜"),
    ],
    correctKey: "D",
    explanationHe: "הסדר הוא שועל > זאב > ינשוף > נמלה, ולכן הנמלה היא הקלה ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 8,
    title: "שאלה 8: רובוט על לוח משבצות",
    promptHe: `רובוט מתחיל בנקודה ${pointText(0, 0)}. פקודות: ימינה = ${deltaText(1, 0)}, שמאלה = ${deltaText(-1, 0)}, למעלה = ${deltaText(0, 1)}. הסדרה היא: ימינה, למעלה, ימינה, למעלה, שמאלה. היכן הוא יסיים?`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: pointText(0, 2) },
      { key: "B", text: pointText(1, 2) },
      { key: "C", text: pointText(2, 1) },
      { key: "D", text: pointText(2, 2) },
    ],
    correctKey: "B",
    explanationHe: `אחרי הצעדים מתקבל המסלול ${pointText(0, 0)}→${pointText(1, 0)}→${pointText(1, 1)}→${pointText(2, 1)}→${pointText(2, 2)}→${pointText(1, 2)}.`,
    tags: ["סימולציית רובוט"],
  },
  {
    id: 9,
    title: "שאלה 9: מי יכול להיות ראשון?",
    promptHe: "מיכל, יובל, נועם ושירה עומדים בתור להצגה. מיכל לפני יובל, נועם אינו ראשון, ושירה אחרי יובל. מי יכול להיות ראשון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מיכל" },
      { key: "B", text: "יובל" },
      { key: "C", text: "נועם" },
      { key: "D", text: "שירה" },
    ],
    correctKey: "A",
    explanationHe: "יובל לא יכול להיות ראשון כי מיכל לפניו, נועם לא ראשון לפי הנתון, ושירה אחרי יובל. לכן רק מיכל יכולה להיות ראשונה.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 10,
    title: "שאלה 10: מה אפשר להסיק?",
    promptHe: "כל מי שמשתתף בחוג רובוטיקה אוהב לפתור חידות. דנה אוהבת לפתור חידות. מה אפשר לקבוע בוודאות?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "דנה משתתפת בחוג רובוטיקה" },
      { key: "B", text: "דנה אינה משתתפת בחוג רובוטיקה" },
      { key: "C", text: "דנה בנתה רובוט בבית" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "D",
    explanationHe: "הכלל אומר שמי שבחוג אוהב חידות, אבל לא שכל מי שאוהב חידות נמצא בחוג. לכן אין מספיק מידע.",
    tags: ["הסקה"],
  },
  {
    id: 11,
    title: "שאלה 11: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐻"], right: ["🐟"], relation: "leftHeavy" },
      { left: ["🐝"], right: ["🐟"], relation: "rightHeavy" },
      { left: ["🐝"], right: ["🐻"], relation: "rightHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐻"),
      singleEmojiChoice("B", "🐟"),
      singleEmojiChoice("C", "🐝"),
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "A",
    explanationHe: "הדוב כבד גם מהדג וגם מהדבורה, והדג כבד מהדבורה. לכן הדוב הוא הכבד ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 12,
    title: "שאלה 12: מי בוודאות אחרי דנה?",
    promptHe: "דנה, אמיר, ליאור ומיכל מציגים בזה אחר זה. אמיר מציג אחרי דנה, וליאור מציג לפני מיכל. מי בוודאות מציג אחרי דנה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "אמיר" },
      { key: "B", text: "ליאור" },
      { key: "C", text: "מיכל" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "A",
    explanationHe: "רק על אמיר נאמר במפורש שהוא אחרי דנה. לגבי ליאור ומיכל אין התחייבות כזאת.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 13,
    title: "שאלה 13: לולאת פקודות",
    promptHe: `רובוט מתחיל ב-${ltrCode("1")}. פקודות: קפיצה = ${ltrCode("+2")}, חזרה = ${ltrCode("-1")}. מבצעים שלוש פעמים את הזוג קפיצה ואז חזרה, ולבסוף עוד קפיצה אחת. לאיזה מספר יגיע הרובוט?`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "4" },
      { key: "B", text: "5" },
      { key: "C", text: "6" },
      { key: "D", text: "7" },
    ],
    correctKey: "C",
    explanationHe: `כל זוג פקודות מוסיף ${ltrCode("1")}, ולכן אחרי שלוש חזרות מגיעים מ-${ltrCode("1")} ל-${ltrCode("4")}. הקפיצה האחרונה מביאה ל-${ltrCode("6")}.`,
    tags: ["סימולציית רובוט"],
  },
  {
    id: 14,
    title: "שאלה 14: מי באמצע?",
    promptHe: "שלושה תלמידים יושבים בשורה: דנה, אמיר ויובל. דנה אינה ראשונה, ואמיר יושב לפני יובל. מי יושב באמצע?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "דנה" },
      { key: "B", text: "אמיר" },
      { key: "C", text: "יובל" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "D",
    explanationHe: "יש שתי אפשרויות חוקיות: אמיר-דנה-יובל או אמיר-יובל-דנה. לכן אין תשובה יחידה.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 15,
    title: "שאלה 15: מסקנה משני כללים",
    promptHe: "כל תלמיד שסיים את שלב א' קיבל סיכה. מי שלא קיבל סיכה לא נכנס לשלב ב'. מיכל לא קיבלה סיכה. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מיכל לא נכנסה לשלב ב'" },
      { key: "B", text: "מיכל סיימה את שלב א'" },
      { key: "C", text: "מיכל קיבלה שתי סיכות" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "A",
    explanationHe: "מהכלל השני נובע ישירות שמי שלא קיבל סיכה לא נכנס לשלב ב'. לכן זה נכון לגבי מיכל.",
    tags: ["הסקה"],
  },
  {
    id: 16,
    title: "שאלה 16: מי הכבד ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐬"], right: ["🐠"], relation: "leftHeavy" },
      { left: ["🐠"], right: ["🐡"], relation: "rightHeavy" },
      { left: ["🐬"], right: ["🐙"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐬"),
      singleEmojiChoice("B", "🐡"),
      singleEmojiChoice("C", "🐙"),
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "D",
    explanationHe: "יודעים שהדולפין כבד מהדג ומהתמנון, ושהדג-נפוח כבד מהדג. אין השוואה ישירה בין הדולפין לדג-נפוח, ולכן אי אפשר לדעת מי הכבד ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 17,
    title: "שאלה 17: מי יכולה להיות אחרונה?",
    promptHe: "מיכל, דנה, אמיר וליאור מציגים. מיכל לפני דנה, דנה לפני אמיר, ואמיר לפני ליאור. מי יכולה להיות אחרונה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "מיכל" },
      { key: "B", text: "דנה" },
      { key: "C", text: "אמיר" },
      { key: "D", text: "ליאור" },
    ],
    correctKey: "D",
    explanationHe: "היחסים יוצרים סדר קבוע: מיכל לפני דנה לפני אמיר לפני ליאור. לכן ליאור חייב להיות אחרון.",
    tags: ["פאזל לוגי"],
  },
  {
    id: 18,
    title: "שאלה 18: רובוט עם כיוון",
    promptHe: `רובוט מתחיל ב-${pointText(0, 0)} ופונה מזרחה. פקודות: קדימה = צעד אחד בכיוון הנוכחי, ימינה = סיבוב ימינה, שמאלה = סיבוב שמאלה. הסדרה היא: קדימה, ימינה, קדימה, שמאלה, קדימה, קדימה. היכן הוא מסיים ולאיזה כיוון הוא פונה?`,
    choicesDir: "rtl",
    choices: [
      { key: "A", text: positionChoice(3, -1, "מזרחה") },
      { key: "B", text: positionChoice(3, 1, "מזרחה") },
      { key: "C", text: positionChoice(2, -1, "דרומה") },
      { key: "D", text: positionChoice(3, -1, "דרומה") },
    ],
    correctKey: "A",
    explanationHe: `אחרי קדימה מגיעים ל-${pointText(1, 0)}, אחרי ימינה וקדימה ל-${pointText(1, -1)}, ואז שמאלה מחזיר למזרח ושתי פקודות קדימה נוספות מביאות ל-${pointText(3, -1)}.`,
    tags: ["סימולציית רובוט"],
  },
  {
    id: 19,
    title: "שאלה 19: מה חייבים לעשות?",
    promptHe: "אם הקוד רץ בלי שגיאה, הנורה הירוקה נדלקת. כאשר הנורה הירוקה לא נדלקת, צריך לבדוק את הקלט. היום הנורה הירוקה לא נדלקה. מה בטוח נכון?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "הקוד רץ בלי שגיאה" },
      { key: "B", text: "אין צורך לבדוק את הקלט" },
      { key: "C", text: "צריך לבדוק את הקלט" },
      { key: "D", text: "אי אפשר לדעת בוודאות" },
    ],
    correctKey: "C",
    explanationHe: "לפי הכלל השני, בכל מצב שבו הנורה הירוקה לא נדלקת צריך לבדוק את הקלט.",
    tags: ["הסקה"],
  },
  {
    id: 20,
    title: "שאלה 20: מי הקל ביותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🦓"], right: ["🦒"], relation: "rightHeavy" },
      { left: ["🦓"], right: ["🐐"], relation: "leftHeavy" },
      { left: ["🐌"], right: ["🐐"], relation: "rightHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🦒"),
      singleEmojiChoice("B", "🦓"),
      singleEmojiChoice("C", "🐐"),
      singleEmojiChoice("D", "🐌"),
    ],
    correctKey: "D",
    explanationHe: "מהמאזניים מתקבלת השרשרת ג'ירפה > זברה > עז > חילזון, ולכן החילזון הוא הקל ביותר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 21,
    title: "שאלה 21: מי שוקל אותו דבר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐘"], right: ["🐰", "🐰"], relation: "balanced" },
      { left: ["🦊"], right: ["🐰", "🐰"], relation: "balanced" },
      { left: ["🦉"], right: ["🐰"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      pairEmojiChoice("A", "🐘", "🦊"),
      pairEmojiChoice("B", "🐘", "🦉"),
      pairEmojiChoice("C", "🦊", "🐰"),
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "A",
    explanationHe: "גם הפיל וגם השועל שווים לשני ארנבים, ולכן הם שוקלים אותו דבר.",
    tags: ["משקל ואיזון"],
  },
  {
    id: 22,
    title: "שאלה 22: מי כבד יותר?",
    promptHtml: buildBalancePuzzle([
      { left: ["🐻"], right: ["🐝", "🐝"], relation: "balanced" },
      { left: ["🐟"], right: ["🐝", "🐝"], relation: "balanced" },
      { left: ["🐙"], right: ["🐝"], relation: "leftHeavy" },
    ]),
    choicesDir: "rtl",
    choices: [
      singleEmojiChoice("A", "🐙"),
      singleEmojiChoice("B", "🐟"),
      { key: "C", text: "שניהם שוקלים אותו דבר" },
      { key: "D", text: "אי אפשר לדעת" },
    ],
    correctKey: "D",
    explanationHe: "הדג שווה לשתי דבורים, ואילו על התמנון יודעים רק שהוא כבד מדבורה אחת. לכן אי אפשר לדעת מי כבד יותר.",
    tags: ["משקל ואיזון"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון כניסה ללימודי מדעי המחשב – סדרה א'",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  progressCompleted: "הושלמו",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  submitLabel: "שליחה סופית",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה.",
  blankNextConfirmMessage: "השאלה הנוכחית עדיין ריקה. להמשיך בכל זאת?",
  blankSubmitConfirmMessage: "השאלה האחרונה עדיין ריקה. לשלוח בכל זאת?",
  completionTitle: "השליחה התקבלה",
  completionMessage: "השאלון נשלח וננעל.\nאם צריך לפתוח ניסיון חדש, דברו עם המורה.",
  submitErrorMessage: "לא הצלחנו לשמור את ההגשה כרגע. נסו שוב בעוד רגע.",
  loadingTitle: "בודקים גישה",
  loadingMessage: "מכינים את השאלון...",
  signInTitle: "נדרשת התחברות",
  signInMessage: "כדי לפתוח את השאלון, התחברו עם חשבון Google.",
  signInButtonLabel: "התחברות עם Google",
  invalidLinkTitle: "קישור שאלון לא תקין",
  invalidLinkMessage: "הקישור שקיבלתם לא תואם את פרטי השאלון הפעילים.",
  windowClosedTitle: "השאלון סגור",
  windowClosedMessage: "השאלון אינו זמין כרגע לפי חלון הזמן שהוגדר.",
  configErrorTitle: "שגיאת הגדרת שאלון",
  configErrorMessage: "הדף לא הוגדר נכון ולכן אי אפשר לפתוח את השאלון.",
  authErrorTitle: "שגיאת התחברות",
  authErrorMessage: "לא הצלחנו להשלים את ההתחברות עם Google.",
  loadErrorTitle: "לא הצלחנו לטעון את השאלון",
  loadErrorMessage: "לא הצלחנו לטעון את מצב השאלון מ-Firebase.",
  signOutLabel: "התנתקות",
  accountSignedInPrefix: "מחוברים בתור",
  autosaveMessage: "ההתקדמות נשמרת אוטומטית בזמן העבודה.",
  debugBadgeLabel: "דיבאג",
  debugResetLabel: "פתיחת ניסיון בדיקה חדש",
  debugResetConfirmMessage: "למחוק את הנתונים השמורים ולהתחיל מחדש?",
  debugWindowBypassMessage: "חשבון דיבאג עוקף את חלון הזמן של השאלון.",
};

window.TRACKED_QUIZ_CONFIG = {
  firebaseConfig: {
    apiKey: "AIzaSyB1PN88qSK_iLk2tquUtHEr-243P9-9C8U",
    authDomain: "guysfbfinal.firebaseapp.com",
    databaseURL: "https://guysfbfinal-default-rtdb.firebaseio.com",
    projectId: "guysfbfinal",
    storageBucket: "guysfbfinal.firebasestorage.app",
    messagingSenderId: "305446301273",
    appId: "1:305446301273:web:87f1865be1a45edad9cb48"
  },
  rootPath: "jekyll",
  quizKey: {{ page.quiz_key | jsonify }},
  slug: "logic-cs-entrance-a",
  pagePath: {{ page.url | relative_url | jsonify }},
  quizWindowStart: {{ page.quiz_window_start | jsonify }},
  quizWindowEnd: {{ page.quiz_window_end | jsonify }},
  unlockToken: {{ page.quiz_unlock_token | jsonify }},
  debugUids: {{ page.quiz_debug_uids | jsonify }},
  mountId: "quiz-root",
  statusMountId: "tracked-quiz-status",
  accountMountId: "tracked-quiz-account",
  questions: window.QUIZ_QUESTIONS,
  labels: window.QUIZ_LABELS,
  questionLabels: window.QUIZ_LABELS,
  revealDelayMs: 250,
  dir: "rtl"
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script src="{{ '/assets/js/tracked-quiz-auth.js' | relative_url }}"></script>
