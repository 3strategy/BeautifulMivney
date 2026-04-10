---
layout: page
title: שאלון אינטראקטיבי באחוזים
tags: [אחוזים, מתמטיקה, חטיבת ביניים, שאלון, אינטראקטיבי]
lang: he
full-width: true
---

<!-- interactive -->

{: .box-note}
שאלון תרגול קצר באחוזים לחטיבת ביניים.
יש כאן 15 שאלות ברמות קושי עולות: חישוב אחוז מתוך כמות, מציאת האחוז, הנחה, התייקרות ומעבר בין חלק לשלם.

<style>
#quiz-root .quiz-answers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

#quiz-root .quiz-answer-btn {
    align-items: stretch;
    justify-content: flex-start;
}

#quiz-root .quiz-answer-letter {
    align-self: center;
}

#quiz-root .quiz-answer-text {
    text-align: right;
}

@media (max-width: 560px) {
    #quiz-root .quiz-answers-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<div id="quiz-root"></div>

<script>
window.QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "שאלה 1: עשרה אחוזים ממספר",
    promptHe: "כמה הם 10% מתוך 70?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "7" },
      { key: "B", text: "10" },
      { key: "C", text: "14" },
      { key: "D", text: "17" },
    ],
    correctKey: "A",
    explanationHe: "10% הם עשירית. עשירית של 70 היא 7.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 2,
    title: "שאלה 2: חצי מתוך מאה",
    promptHe: "כמה הם 50% מתוך 36?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "12" },
      { key: "B", text: "18" },
      { key: "C", text: "20" },
      { key: "D", text: "24" },
    ],
    correctKey: "B",
    explanationHe: "50% הם חצי. חצי מ-36 הוא 18.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 3,
    title: "שאלה 3: רבע מכמות",
    promptHe: "כמה הם 25% מתוך 80?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "20" },
      { key: "B", text: "25" },
      { key: "C", text: "30" },
      { key: "D", text: "40" },
    ],
    correctKey: "A",
    explanationHe: "25% הם רבע. רבע של 80 הוא 20.",
    tags: ["אחוז מתוך מספר"],
  },
  {
    id: 4,
    title: "שאלה 4: מציאת אחוז",
    promptHe: "בכיתה יש 30 תלמידים, ומתוכם 6 מרכיבים משקפיים. איזה אחוז מהכיתה מרכיב משקפיים?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "15%" },
      { key: "B", text: "20%" },
      { key: "C", text: "25%" },
      { key: "D", text: "30%" },
    ],
    correctKey: "B",
    explanationHe: "6 מתוך 30 הם 6/30 = 1/5. חמישית היא 20%.",
    tags: ["מציאת אחוז"],
  },
  {
    id: 5,
    title: "שאלה 5: חלק מהכמות",
    promptHe: "אם 15% מהתלמידים באולם הם 12 תלמידים, כמה תלמידים יש באולם בסך הכול?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "60" },
      { key: "B", text: "72" },
      { key: "C", text: "80" },
      { key: "D", text: "90" },
    ],
    correctKey: "C",
    explanationHe: "אם 15% הם 12, אז 1% הוא 12 חלקי 15, כלומר 0.8. לכן 100% הם 80.",
    tags: ["חלק לשלם"],
  },
  {
    id: 6,
    title: "שאלה 6: הנחה בחנות",
    promptHe: "חולצה עלתה 120 שקלים ויש עליה הנחה של 25%. מה המחיר אחרי ההנחה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "30 שקלים" },
      { key: "B", text: "90 שקלים" },
      { key: "C", text: "95 שקלים" },
      { key: "D", text: "100 שקלים" },
    ],
    correctKey: "B",
    explanationHe: "25% מתוך 120 הם 30. אחרי שמחסרים 30 מהמחיר המקורי מקבלים 90.",
    tags: ["הנחה"],
  },
  {
    id: 7,
    title: "שאלה 7: התייקרות",
    promptHe: "מחיר מחברת היה 40 שקלים והתייקר ב-10%. מה המחיר החדש?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "42 שקלים" },
      { key: "B", text: "43 שקלים" },
      { key: "C", text: "44 שקלים" },
      { key: "D", text: "45 שקלים" },
    ],
    correctKey: "C",
    explanationHe: "10% מתוך 40 הם 4, ולכן המחיר החדש הוא 44.",
    tags: ["התייקרות"],
  },
  {
    id: 8,
    title: "שאלה 8: כמה נשאר?",
    promptHe: "מיכל שתה 30% מבקבוק מים. איזה אחוז מהבקבוק נשאר?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "30%" },
      { key: "B", text: "60%" },
      { key: "C", text: "70%" },
      { key: "D", text: "80%" },
    ],
    correctKey: "C",
    explanationHe: "השלם הוא 100%. אם שתו 30%, נשארו 70%.",
    tags: ["משלים ל-100"],
  },
  {
    id: 9,
    title: "שאלה 9: שני שלבים",
    promptHe: "טל פתר 18 שאלות במבחן, וזה 75% מכלל השאלות. כמה שאלות היו במבחן?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "21" },
      { key: "B", text: "24" },
      { key: "C", text: "27" },
      { key: "D", text: "30" },
    ],
    correctKey: "B",
    explanationHe: "75% הם שלושה רבעים. אם שלושה רבעים הם 18, אז רבע אחד הוא 6, ולכן השלם הוא 24.",
    tags: ["חלק לשלם"],
  },
  {
    id: 10,
    title: "שאלה 10: איזה חלק גדול יותר?",
    promptHe: "איזה מהביטויים שווה ל-20%?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "1 מתוך 2" },
      { key: "B", text: "1 מתוך 3" },
      { key: "C", text: "1 מתוך 4" },
      { key: "D", text: "1 מתוך 5" },
    ],
    correctKey: "D",
    explanationHe: "20% הם 20 מתוך 100, כלומר 1 מתוך 5.",
    tags: ["אחוז ושבר"],
  },
  {
    id: 11,
    title: "שאלה 11: תרומה לקופה",
    promptHe: "בקופת הכיתה יש 200 שקלים. הוסיפו לקופה עוד 15%. כמה כסף יש עכשיו?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "215 שקלים" },
      { key: "B", text: "225 שקלים" },
      { key: "C", text: "230 שקלים" },
      { key: "D", text: "240 שקלים" },
    ],
    correctKey: "C",
    explanationHe: "15% מתוך 200 הם 30. מוסיפים 30 ל-200 ומקבלים 230.",
    tags: ["התייקרות"],
  },
  {
    id: 12,
    title: "שאלה 12: איזה אחוז צבוע?",
    promptHe: "בציור מסוים 8 מתוך 40 ריבועים צבועים. איזה אחוז מהריבועים צבוע?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "8%" },
      { key: "B", text: "16%" },
      { key: "C", text: "20%" },
      { key: "D", text: "25%" },
    ],
    correctKey: "C",
    explanationHe: "8/40 מצטמצם ל-1/5, ו-1/5 הוא 20%.",
    tags: ["מציאת אחוז"],
  },
  {
    id: 13,
    title: "שאלה 13: חישוב הפוך עם הנחה",
    promptHe: "אחרי הנחה של 20% מחיר תיק הוא 160 שקלים. מה היה המחיר לפני ההנחה?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "180 שקלים" },
      { key: "B", text: "192 שקלים" },
      { key: "C", text: "200 שקלים" },
      { key: "D", text: "220 שקלים" },
    ],
    correctKey: "C",
    explanationHe: "אחרי הנחה של 20% נשארים 80% מהמחיר. אם 80% הם 160, אז 100% הם 200.",
    tags: ["הנחה", "חלק לשלם"],
  },
  {
    id: 14,
    title: "שאלה 14: בדיקת טענה",
    promptHe: "נועה אמרה: `אם מעלים מספר ב-50%, מקבלים פי 1.5 מהמספר המקורי`. האם היא צודקת?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "כן, תמיד" },
      { key: "B", text: "לא, צריך להכפיל ב-0.5" },
      { key: "C", text: "לא, זה נכון רק למספרים זוגיים" },
      { key: "D", text: "כן, אבל רק אם המספר גדול מ-100" },
    ],
    correctKey: "A",
    explanationHe: "אם מוסיפים 50% למספר, נשארים עם 100% ועוד 50%, כלומר 150% מהמספר המקורי. זה בדיוק פי 1.5.",
    tags: ["חשיבה באחוזים"],
  },
  {
    id: 15,
    title: "שאלה 15: שאלה מסכמת",
    promptHe: "מחיר משחק היה 250 שקלים. קודם הייתה הנחה של 20%, ואחר כך התייקרות של 10% על המחיר החדש. מה המחיר הסופי?",
    choicesDir: "rtl",
    choices: [
      { key: "A", text: "200 שקלים" },
      { key: "B", text: "210 שקלים" },
      { key: "C", text: "220 שקלים" },
      { key: "D", text: "230 שקלים" },
    ],
    correctKey: "C",
    explanationHe: "אחרי הנחה של 20% המחיר יורד ל-200. אחר כך מעלים ב-10%, כלומר מוסיפים 20, ומקבלים 220.",
    tags: ["הנחה", "התייקרות", "שאלה מסכמת"],
  },
];

window.QUIZ_LABELS = {
  title: "שאלון אחוזים לחטיבת ביניים",
  progressAnswered: "נענו",
  progressCorrect: "נכונות",
  questionLabel: "שאלה",
  ofLabel: "מתוך",
  resetLabel: "איפוס",
  prevLabel: "הקודם",
  nextLabel: "הבא",
  explanationTitle: "הסבר",
  emptyMessage: "אין שאלות להצגה.",
};
</script>

<script type="text/babel" src="{{ '/assets/js/questionnaire.js' | relative_url }}"></script>
<script type="text/babel">
  window.renderQuestionnaire({
    mountId: "quiz-root",
    questions: window.QUIZ_QUESTIONS,
    labels: window.QUIZ_LABELS,
    revealDelayMs: 250,
    dir: "rtl"
  });
</script>
