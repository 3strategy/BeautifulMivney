(function () {
    const SUCCESS = 'is-good';
    const ERROR = 'is-bad';
    const NOTE = 'is-note';

    const gameData = {
        strings: [
            {
                kind: 'pick-char',
                title: 'שלב 1: התא הראשון הוא אינדקס 0',
                story: 'המחרוזת מוצגת כתאים בזיכרון. המספר מעל כל תא הוא האינדקס שלו.',
                task: 'לחצו על התא ש־s[0] קורא.',
                code: 'string s = "CODE";\nConsole.WriteLine(s[0]);',
                value: 'CODE',
                targetIndex: 0,
                good: 'נכון. התא הראשון נמצא באינדקס 0.',
                bad: 'כמעט. ב־C# האינדקס הראשון הוא 0.'
            },
            {
                kind: 'pick-char',
                title: 'שלב 2: סופרים מ־0, לא מ־1',
                story: 'האינדקס הוא מיקום, אבל הספירה מתחילה מאפס.',
                task: 'לחצו על התא ש־word[3] קורא.',
                code: 'string word = "array";\nConsole.WriteLine(word[3]);',
                value: 'array',
                targetIndex: 3,
                good: 'נכון. word[3] הוא התו הרביעי.',
                bad: 'בדקו את המספר שמעל התא. אינדקס 3 הוא התו הרביעי.'
            },
            {
                kind: 'pick-char',
                title: 'שלב 3: האינדקס האחרון',
                story: 'Length הוא מספר התווים. האינדקס האחרון קטן ממנו באחד.',
                task: 'לחצו על התא ש־name[name.Length - 1] קורא.',
                code: 'string name = "Tamar";\nConsole.WriteLine(name[name.Length - 1]);',
                value: 'Tamar',
                targetIndex: 4,
                good: 'בדיוק. Length הוא 5, ולכן האינדקס האחרון הוא 4.',
                bad: 'האינדקס האחרון הוא Length - 1.'
            },
            {
                kind: 'choice',
                title: 'שלב 4: הגבול הימני',
                story: 'אפשר לגשת רק לאינדקסים הקיימים.',
                task: 'מה יקרה בשורה שמנסה לקרוא s[s.Length]?',
                code: 'string s = "debug";\nConsole.WriteLine(s[s.Length]);',
                value: 'debug',
                choices: [
                    { label: 'יודפס g', correct: false },
                    { label: 'יודפס רווח', correct: false },
                    { label: 'שגיאת זמן ריצה: IndexOutOfRangeException', correct: true }
                ],
                good: 'נכון. s.Length הוא 5, אבל האינדקסים החוקיים הם 0 עד 4.',
                bad: 'לא. s.Length הוא כבר מחוץ למחרוזת.'
            },
            {
                kind: 'choice',
                title: 'שלב 5: מחרוזת היא לקריאה לפי אינדקס',
                story: 'מחרוזת דומה למערך כאשר קוראים ממנה, אבל לא כאשר כותבים לתוכה.',
                task: 'מה הבעיה בקוד?',
                code: 'string s = "cat";\ns[1] = \'u\';',
                value: 'cat',
                choices: [
                    { label: 'הקוד משנה את cat ל־cut', correct: false },
                    { label: 'שגיאת קומפילציה: אי אפשר להשמות לתו במחרוזת', correct: true },
                    { label: 'השורה מדפיסה u', correct: false }
                ],
                good: 'נכון. string מאפשר s[i] לקריאה, לא לכתיבה.',
                bad: 'במחרוזת לא ניתן לבצע s[1] = ...'
            },
            {
                kind: 'sequence',
                title: 'שלב 6: בונים פלט מכמה גישות ישירות',
                story: 'כל Write קורא תו אחד לפי אינדקס. יחד הם יוצרים פלט.',
                task: 'לחצו על התאים לפי סדר ההדפסה וצרו את הפלט.',
                code: 'string s = "LOOPS";\nConsole.Write(s[4]);\nConsole.Write(s[1]);\nConsole.Write(s[4]);',
                value: 'LOOPS',
                sequence: [4, 1, 4],
                targetWord: 'SOS',
                good: 'נכון. שלוש קריאות ישירות יצרו SOS.',
                bad: 'הסדר חשוב. קראו את שורות ה־Write מלמעלה למטה.'
            },
            {
                kind: 'mark-all',
                title: 'שלב 7: התחלה של IndexOf ידני',
                story: 'לפני שמשתמשים בפעולות מוכנות, אפשר לסרוק אינדקסים ולבדוק s[i].',
                task: 'סמנו את כל התאים שבהם s[i] == \'a\'.',
                code: 'string s = "banana";\nfor (int i = 0; i < s.Length; i++)\n{\n    if (s[i] == \'a\')\n        Console.WriteLine(i);\n}',
                value: 'banana',
                targetIndexes: [1, 3, 5],
                good: 'נכון. זה בדיוק הרעיון שמאחורי חיפוש ידני.',
                bad: 'צריך לסמן את כל המקומות שבהם התו הוא a, ורק אותם.'
            }
        ],
        arrays: [
            {
                kind: 'pick-array',
                title: 'שלב 1: מערך הוא שורת תאים',
                story: 'כל איבר במערך נמצא בתא עם אינדקס משלו.',
                task: 'לחצו על התא ש־cars[1] קורא.',
                code: 'string[] cars = { "BMW", "Ford", "Kia" };\nConsole.WriteLine(cars[1]);',
                values: ['BMW', 'Ford', 'Kia'],
                targetIndex: 1,
                good: 'נכון. cars[1] הוא Ford.',
                bad: 'בדקו את המספר מעל התא במערך.'
            },
            {
                kind: 'nested-char',
                title: 'שלב 2: מערך של מחרוזות',
                story: 'ביטוי כמו cars[0][1] נקרא בשני צעדים.',
                task: 'קודם בחרו את cars[0], ואז את התו [1] בתוך המחרוזת שנבחרה.',
                code: 'string[] cars = { "BMW", "Ford", "Kia" };\nConsole.WriteLine(cars[0][1]);',
                values: ['BMW', 'Ford', 'Kia'],
                arrayIndex: 0,
                charIndex: 1,
                good: 'נכון. cars[0] הוא BMW, והתו באינדקס 1 הוא M.',
                bad: 'קראו משמאל לימין בתוך הביטוי: קודם cars[0], אחר כך [1].'
            },
            {
                kind: 'assignment',
                title: 'שלב 3: במערך אפשר לכתוב לתא',
                story: 'בניגוד למחרוזת, תא במערך ניתן לשינוי.',
                task: 'לחצו על התא שישתנה בעקבות ההשמה.',
                code: 'int[] scores = { 70, 80, 60, 90 };\nscores[2] = 100;',
                values: [70, 80, 60, 90],
                targetIndex: 2,
                newValue: 100,
                good: 'נכון. רק scores[2] השתנה ל־100.',
                bad: 'בצד שמאל של ההשמה נמצא האינדקס של התא המשתנה.'
            },
            {
                kind: 'choice',
                title: 'שלב 4: גם במערך יש גבול',
                story: 'Length הוא מספר האיברים, לא אינדקס חוקי.',
                task: 'מה יקרה בקריאה nums[nums.Length]?',
                code: 'int[] nums = { 4, 8, 15 };\nConsole.WriteLine(nums[nums.Length]);',
                values: [4, 8, 15],
                choices: [
                    { label: 'יודפס 15', correct: false },
                    { label: 'שגיאת זמן ריצה: IndexOutOfRangeException', correct: true },
                    { label: 'יודפס 0 כי אין תא כזה', correct: false }
                ],
                good: 'נכון. nums.Length הוא 3, והאינדקסים החוקיים הם 0, 1, 2.',
                bad: 'האינדקס האחרון הוא nums.Length - 1.'
            },
            {
                kind: 'mark-all-array',
                title: 'שלב 5: for עובר על אינדקסים',
                story: 'לולאת for נותנת לנו את i, ולכן אפשר לדעת באיזה תא אנחנו.',
                task: 'סמנו את התאים שיודפסו.',
                code: 'int[] nums = { 5, 12, 7, 20, 3 };\nfor (int i = 0; i < nums.Length; i++)\n{\n    if (nums[i] > 10)\n        Console.WriteLine(nums[i]);\n}',
                values: [5, 12, 7, 20, 3],
                targetIndexes: [1, 3],
                good: 'נכון. רק הערכים הגדולים מ־10 הודפסו.',
                bad: 'עברו תא תא ובדקו את התנאי nums[i] > 10.'
            },
            {
                kind: 'mode-choice',
                title: 'שלב 6: for או foreach',
                story: 'שני הכלים עוברים על מערך, אבל הם לא נותנים לנו אותו מידע.',
                task: 'בחרו את הכלי המתאים למשימה: להחליף כל ערך שלילי ב־0.',
                code: 'int[] nums = { 4, -2, 7, -5 };\n// צריך לשנות את המערך עצמו',
                values: [4, -2, 7, -5],
                correctMode: 'for',
                good: 'נכון. כדי לכתוב לתאים צריך אינדקס, ולכן for מתאים.',
                bad: 'foreach נוח לקריאה של ערכים, אבל כאן צריך להשמות לתוך nums[i].'
            },
            {
                kind: 'mode-choice',
                title: 'שלב 7: כשצריך רק ערכים',
                story: 'כאשר לא צריך אינדקס ולא משנים תאים, foreach מקצר את הרעש.',
                task: 'בחרו את הכלי המתאים למשימה: להדפיס את כל המכוניות.',
                code: 'string[] cars = { "BMW", "Ford", "Kia" };\n// צריך רק לעבור על הערכים ולהדפיס',
                values: ['BMW', 'Ford', 'Kia'],
                correctMode: 'foreach',
                good: 'נכון. foreach מתאים כאשר צריך כל ערך, בלי מיקום ובלי השמה לתא.',
                bad: 'for יעבוד, אבל כאן אין צורך באינדקס. foreach הוא הכלי הנקי יותר.'
            }
        ]
    };

    function initAllGames() {
        document.querySelectorAll('.index-game[data-game]').forEach((root) => {
            const type = root.getAttribute('data-game');
            if (!gameData[type]) {
                return;
            }
            initGame(root, type, gameData[type]);
        });
    }

    function initGame(root, type, levels) {
        const storeKey = `index-intuition-game:${type}:${window.location.pathname}`;
        const state = loadState(storeKey, levels.length);
        const ctx = {
            root,
            levels,
            storeKey,
            current: state.current,
            solved: state.solved,
            selected: [],
            selectedArrayIndex: null,
            completedCurrent: false
        };

        root.querySelector('[data-action="prev"]').addEventListener('click', () => setLevel(ctx, ctx.current - 1));
        root.querySelector('[data-action="next"]').addEventListener('click', () => setLevel(ctx, ctx.current + 1));
        root.querySelector('[data-action="reset"]').addEventListener('click', () => {
            ctx.solved = {};
            ctx.current = 0;
            saveState(ctx);
            render(ctx);
        });
        root.querySelector('[data-action="check"]').addEventListener('click', () => checkCurrent(ctx));

        render(ctx);
    }

    function render(ctx) {
        const level = ctx.levels[ctx.current];
        ctx.selected = [];
        ctx.selectedArrayIndex = null;
        ctx.completedCurrent = Boolean(ctx.solved[String(ctx.current)]);

        text(ctx, 'score', `שלב ${ctx.current + 1} מתוך ${ctx.levels.length}`);
        text(ctx, 'story', level.story || '');
        text(ctx, 'task', level.task || level.title);
        text(ctx, 'code', level.code || '');
        setMessage(ctx, ctx.completedCurrent ? 'השלב הזה כבר נפתר. אפשר להמשיך או לנסות שוב.' : '', NOTE);

        const choices = role(ctx, 'choices');
        choices.innerHTML = '';

        const visual = role(ctx, 'visual');
        visual.innerHTML = '';

        if (level.kind === 'pick-char' || level.kind === 'sequence' || level.kind === 'mark-all') {
            renderStringVisual(ctx, visual, level);
        } else if (level.kind === 'choice') {
            renderChoiceVisual(ctx, visual, choices, level);
        } else if (level.kind === 'pick-array' || level.kind === 'assignment' || level.kind === 'mark-all-array') {
            renderArrayVisual(ctx, visual, level);
        } else if (level.kind === 'nested-char') {
            renderNestedVisual(ctx, visual, level);
        } else if (level.kind === 'mode-choice') {
            renderModeChoice(ctx, visual, choices, level);
        }

        updateButtons(ctx);
    }

    function renderStringVisual(ctx, visual, level) {
        const strip = make('div', 'index-game__strip');
        Array.from(level.value).forEach((char, index) => {
            strip.appendChild(makeCell({
                index,
                value: char,
                onClick: (cell) => handleStringCell(ctx, level, index, cell)
            }));
        });
        visual.appendChild(strip);
        visual.appendChild(lengthLine(`${variableName(level.code)}.Length == ${level.value.length}`));

        if (level.kind === 'sequence') {
            visual.appendChild(make('div', 'index-game__sequence', '', { role: 'sequence' }));
            visual.appendChild(make('div', 'index-game__subline', `יעד: ${level.targetWord}`));
        }

        if (level.kind === 'mark-all') {
            visual.appendChild(legend());
        }
    }

    function renderChoiceVisual(ctx, visual, choices, level) {
        if (level.value) {
            const strip = make('div', 'index-game__strip');
            Array.from(level.value).forEach((char, index) => {
                strip.appendChild(makeCell({ index, value: char, disabled: true }));
            });
            visual.appendChild(strip);
            visual.appendChild(lengthLine(`Length == ${level.value.length}`));
        } else if (level.values) {
            const strip = make('div', 'index-game__strip');
            level.values.forEach((value, index) => {
                strip.appendChild(makeCell({ index, value, arrayCell: true, disabled: true }));
            });
            visual.appendChild(strip);
            visual.appendChild(lengthLine(`Length == ${level.values.length}`));
        }

        level.choices.forEach((choice) => {
            const button = makeButton(choice.label, '');
            button.addEventListener('click', () => {
                if (choice.correct) {
                    finishLevel(ctx, level.good);
                } else {
                    setMessage(ctx, level.bad, ERROR);
                }
            });
            choices.appendChild(button);
        });
    }

    function renderArrayVisual(ctx, visual, level) {
        const strip = make('div', 'index-game__strip');
        level.values.forEach((value, index) => {
            strip.appendChild(makeCell({
                index,
                value,
                arrayCell: true,
                onClick: (cell) => handleArrayCell(ctx, level, index, cell)
            }));
        });
        visual.appendChild(strip);
        visual.appendChild(lengthLine(`arr.Length == ${level.values.length}`));

        if (level.kind === 'mark-all-array') {
            visual.appendChild(legend());
        }
    }

    function renderNestedVisual(ctx, visual, level) {
        const arrayStrip = make('div', 'index-game__strip');
        level.values.forEach((value, index) => {
            arrayStrip.appendChild(makeCell({
                index,
                value,
                arrayCell: true,
                onClick: (cell) => {
                    ctx.selectedArrayIndex = index;
                    arrayStrip.querySelectorAll('.index-game__cell').forEach((item) => item.classList.remove('is-selected', 'is-wrong'));
                    cell.classList.add(index === level.arrayIndex ? 'is-selected' : 'is-wrong');
                    renderNestedString(ctx, visual, level);
                    if (index !== level.arrayIndex) {
                        setMessage(ctx, level.bad, ERROR);
                    } else {
                        setMessage(ctx, 'נכון. עכשיו בחרו תו בתוך המחרוזת.', NOTE);
                    }
                }
            }));
        });
        visual.appendChild(arrayStrip);
        visual.appendChild(lengthLine(`cars.Length == ${level.values.length}`));
        visual.appendChild(make('div', 'index-game__subline', 'בחרו קודם תא במערך.'));
        visual.appendChild(make('div', '', '', { role: 'nested-string-host' }));
    }

    function renderNestedString(ctx, visual, level) {
        const host = visual.querySelector('[role="nested-string-host"]');
        host.innerHTML = '';
        const picked = ctx.selectedArrayIndex;
        if (picked === null || picked === undefined) {
            return;
        }

        const word = level.values[picked];
        const strip = make('div', 'index-game__strip');
        Array.from(word).forEach((char, index) => {
            strip.appendChild(makeCell({
                index,
                value: char,
                onClick: (cell) => {
                    if (picked === level.arrayIndex && index === level.charIndex) {
                        cell.classList.add('is-correct');
                        finishLevel(ctx, level.good);
                    } else {
                        cell.classList.add('is-wrong');
                        setMessage(ctx, level.bad, ERROR);
                    }
                }
            }));
        });
        host.appendChild(make('div', 'index-game__subline', `המחרוזת שנבחרה: "${word}"`));
        host.appendChild(strip);
        host.appendChild(lengthLine(`cars[${picked}].Length == ${word.length}`));
    }

    function renderModeChoice(ctx, visual, choices, level) {
        const strip = make('div', 'index-game__strip');
        level.values.forEach((value, index) => {
            strip.appendChild(makeCell({ index, value, arrayCell: true, disabled: true }));
        });
        visual.appendChild(strip);
        visual.appendChild(make('div', 'index-game__loop-panel', [
            '<div class="index-game__loop-mode"><h4>for</h4><p>יש i.</p><p>אפשר לקרוא arr[i] וגם לכתוב arr[i] = ...</p></div>',
            '<div class="index-game__loop-mode"><h4>foreach</h4><p>יש ערך נוכחי.</p><p>נוח להדפסה או חישוב, בלי מיקום.</p></div>'
        ].join('')));

        [
            { mode: 'for', label: 'להשתמש ב־for' },
            { mode: 'foreach', label: 'להשתמש ב־foreach' }
        ].forEach((item) => {
            const button = makeButton(item.label, '');
            button.addEventListener('click', () => {
                if (item.mode === level.correctMode) {
                    finishLevel(ctx, level.good);
                } else {
                    setMessage(ctx, level.bad, ERROR);
                }
            });
            choices.appendChild(button);
        });
    }

    function handleStringCell(ctx, level, index, cell) {
        if (level.kind === 'pick-char') {
            if (index === level.targetIndex) {
                cell.classList.add('is-correct');
                finishLevel(ctx, level.good);
            } else {
                cell.classList.add('is-wrong');
                setMessage(ctx, level.bad, ERROR);
            }
            return;
        }

        if (level.kind === 'sequence') {
            ctx.selected.push(index);
            cell.classList.add(index === level.sequence[ctx.selected.length - 1] ? 'is-correct' : 'is-wrong');
            updateSequence(ctx, level);
            if (ctx.selected.length === level.sequence.length) {
                checkSequence(ctx, level);
            }
            return;
        }

        if (level.kind === 'mark-all') {
            toggleMark(cell, index, ctx);
        }
    }

    function handleArrayCell(ctx, level, index, cell) {
        if (level.kind === 'pick-array') {
            if (index === level.targetIndex) {
                cell.classList.add('is-correct');
                finishLevel(ctx, level.good);
            } else {
                cell.classList.add('is-wrong');
                setMessage(ctx, level.bad, ERROR);
            }
            return;
        }

        if (level.kind === 'assignment') {
            if (index === level.targetIndex) {
                const valueNode = cell.querySelector('.index-game__value');
                valueNode.textContent = String(level.newValue);
                cell.classList.add('is-correct');
                finishLevel(ctx, level.good);
            } else {
                cell.classList.add('is-wrong');
                setMessage(ctx, level.bad, ERROR);
            }
            return;
        }

        if (level.kind === 'mark-all-array') {
            toggleMark(cell, index, ctx);
        }
    }

    function toggleMark(cell, index, ctx) {
        const exists = ctx.selected.indexOf(index);
        if (exists === -1) {
            ctx.selected.push(index);
            cell.classList.add('is-selected');
        } else {
            ctx.selected.splice(exists, 1);
            cell.classList.remove('is-selected');
        }
    }

    function checkCurrent(ctx) {
        const level = ctx.levels[ctx.current];
        if (level.kind === 'mark-all' || level.kind === 'mark-all-array') {
            const selected = ctx.selected.slice().sort((a, b) => a - b).join(',');
            const target = level.targetIndexes.slice().sort((a, b) => a - b).join(',');
            markCellsAfterCheck(ctx, level.targetIndexes);
            if (selected === target) {
                finishLevel(ctx, level.good);
            } else {
                setMessage(ctx, level.bad, ERROR);
            }
            return;
        }

        if (level.kind === 'sequence') {
            checkSequence(ctx, level);
            return;
        }

        setMessage(ctx, 'בשלב הזה בודקים באמצעות לחיצה על הלוח או על אפשרות.', NOTE);
    }

    function checkSequence(ctx, level) {
        const ok = level.sequence.length === ctx.selected.length &&
            level.sequence.every((expected, index) => expected === ctx.selected[index]);
        if (ok) {
            finishLevel(ctx, level.good);
        } else {
            setMessage(ctx, level.bad, ERROR);
        }
    }

    function updateSequence(ctx, level) {
        const host = ctx.root.querySelector('[role="sequence"]');
        if (!host) {
            return;
        }
        host.innerHTML = '';
        ctx.selected.forEach((index) => {
            host.appendChild(make('span', 'index-game__token', `${level.value[index]} [${index}]`));
        });
    }

    function markCellsAfterCheck(ctx, targetIndexes) {
        ctx.root.querySelectorAll('.index-game__cell').forEach((cell) => {
            const index = Number(cell.getAttribute('data-index'));
            if (targetIndexes.indexOf(index) !== -1) {
                cell.classList.add('is-correct');
            } else if (cell.classList.contains('is-selected')) {
                cell.classList.add('is-wrong');
            }
        });
    }

    function finishLevel(ctx, message) {
        ctx.solved[String(ctx.current)] = true;
        ctx.completedCurrent = true;
        saveState(ctx);
        setMessage(ctx, message, SUCCESS);
        updateButtons(ctx);
    }

    function setLevel(ctx, nextIndex) {
        ctx.current = Math.min(Math.max(nextIndex, 0), ctx.levels.length - 1);
        saveState(ctx);
        render(ctx);
        ctx.root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateButtons(ctx) {
        const prev = ctx.root.querySelector('[data-action="prev"]');
        const next = ctx.root.querySelector('[data-action="next"]');
        prev.disabled = ctx.current === 0;
        next.disabled = ctx.current === ctx.levels.length - 1;
    }

    function makeCell(options) {
        const button = make('button', `index-game__cell${options.arrayCell ? ' index-game__cell--array' : ''}${String(options.value).length > 4 ? ' index-game__cell--wide' : ''}`);
        button.type = 'button';
        button.setAttribute('data-index', String(options.index));
        button.innerHTML = `<span class="index-game__index">${escapeHtml(String(options.index))}</span><span class="index-game__value">${escapeHtml(String(options.value))}</span>`;
        if (options.disabled) {
            button.disabled = true;
        }
        if (options.onClick) {
            button.addEventListener('click', () => options.onClick(button));
        }
        return button;
    }

    function makeButton(label, variant) {
        const button = make('button', `index-game__btn${variant ? ` index-game__btn--${variant}` : ''}`, label);
        button.type = 'button';
        return button;
    }

    function lengthLine(textValue) {
        return make('div', 'index-game__length-line', textValue);
    }

    function legend() {
        const node = make('div', 'index-game__legend');
        node.innerHTML = [
            '<span><span class="index-game__swatch index-game__swatch--selected"></span> מסומן</span>',
            '<span><span class="index-game__swatch index-game__swatch--correct"></span> נכון אחרי בדיקה</span>'
        ].join('');
        return node;
    }

    function variableName(code) {
        const match = String(code || '').match(/\bstring\s+([A-Za-z_]\w*)\s*=/);
        return match ? match[1] : 's';
    }

    function role(ctx, name) {
        return ctx.root.querySelector(`[data-role="${name}"]`);
    }

    function text(ctx, name, value) {
        const node = role(ctx, name);
        if (node) {
            node.textContent = value;
        }
    }

    function setMessage(ctx, message, className) {
        const node = role(ctx, 'message');
        node.classList.remove(SUCCESS, ERROR, NOTE);
        if (className) {
            node.classList.add(className);
        }
        node.textContent = message || '';
    }

    function make(tag, className, content, attrs) {
        const node = document.createElement(tag);
        if (className) {
            node.className = className;
        }
        if (content !== undefined) {
            node.innerHTML = content;
        }
        if (attrs) {
            Object.keys(attrs).forEach((key) => node.setAttribute(key, attrs[key]));
        }
        return node;
    }

    function loadState(key, length) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) {
                return { current: 0, solved: {} };
            }
            const parsed = JSON.parse(raw);
            const current = Number.isInteger(parsed.current) ? parsed.current : 0;
            return {
                current: Math.min(Math.max(current, 0), length - 1),
                solved: parsed.solved && typeof parsed.solved === 'object' ? parsed.solved : {}
            };
        } catch (error) {
            return { current: 0, solved: {} };
        }
    }

    function saveState(ctx) {
        try {
            localStorage.setItem(ctx.storeKey, JSON.stringify({
                current: ctx.current,
                solved: ctx.solved
            }));
        } catch (error) {
            return;
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllGames);
    } else {
        initAllGames();
    }
})();
