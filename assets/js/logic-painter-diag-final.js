(function () {
    const GRID_ROWS = 5;
    const GRID_COLS = 5;
    const MAX_TOTAL_ITERATIONS = 2000;
    const MAX_LOOP_ITERATIONS = 500;
    const STORAGE_KEY = `logic-painter-diag-final:${window.location.pathname || 'default'}`;

    const levels = [
        {
            title: 'Level 1: main diagonal',
            prompt: 'Write C# for-loops that set mat[row, col] = true for the main diagonal.',
            target: (r, c) => r === c,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
{
  for (int j = 0; j < mat.GetLength(1); j++)
  {
    // if(__your answer here___)
    {
      mat[i, j] = true;
    }
  }
}`
        },
        {
            title: 'Level 1b: main diagonal (single loop)',
            prompt: 'Same target, but use a single loop (no nested loops).',
            target: (r, c) => r === c,
            requireSingleLoop: true,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
{
  //your answer here
}`
        },
        {
            title: 'Level 2: secondary diagonal',
            prompt: 'Write C# for-loops that set mat[row, col] = true for the secondary diagonal.',
            target: (r, c) => r + c === GRID_COLS - 1,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
  for (int j = 0; j < mat.GetLength(1); j++)
    // if(__your answer here___)
      mat[i, j] = true;`
        },
        {
            title: 'Level 2b: secondary diagonal (single loop)',
            prompt: 'Same target, but use a single loop (no nested loops).',
            target: (r, c) => r + c === GRID_COLS - 1,
            requireSingleLoop: true,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
{
  mat[_, _] = true; // your answer here
}`
        },
        {
            title: 'Level 3: contour',
            prompt: 'Write C# for-loops that set mat[row, col] = true for the contour (outer border).',
            target: (r, c) => r === 0 || c === 0 || r === GRID_ROWS - 1 || c === GRID_COLS - 1,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
{
  for (int j = 0; j < mat.GetLength(1); j++)
  {
    // if(__your answer here___)
    {
      mat[i, j] = true;
    }
  }
}`
        },
        {
            title: 'Level 4: below main diagonal',
            prompt: 'סימון כל התאים מתחת לאלכסון הראשי.',
            target: (r, c) => r > c,
            starterCode: `for (int i = 0; i < mat.GetLength(0); i++)
  for (int j = 0; j < mat.GetLength(1); j++)
    // if(__your answer here___)
      mat[i, j] = true;`
        },
        {
            title: 'Level 5: above secondary diagonal',
            prompt: 'סימון כל התאים מעל לאלכסון המשני.',
            target: (r, c) => r + c < GRID_COLS - 1,
            starterCode: `for (int i = 0; i < mat.GetLength(0); i++)
{
  for (int j = 0; j < mat.GetLength(1); j++)
  {
    // if(__your answer here___)
    {
      mat[i, j] = true;
    }
  }
}`
        },
        {
            title: 'Level 6: checkerboard',
            prompt: 'Checkerboard marking (one yes one no).',
            target: (r, c) => (r + c) % 2 === 0,
            starterCode: `for (int i = 0; i < mat.GetLength(0); i++)
  for (int j = 0; j < mat.GetLength(1); j++)
    // if(__your answer here___)
      mat[i, j] = true;`
        },
        {
            title: 'Level 7: The Diamond Chalenge (single loop)',
            prompt: 'Mark the diamond outline using a single loop.',
            target: (r, c) => Math.abs(r - 2) + Math.abs(c - 2) === 2,
            requireSingleLoop: true,
            starterCode: `bool[,] mat = new bool[5, 5];
for (int i = 0; i < mat.GetLength(0); i++)
{
  // hint: mat[_, _] = mat[_, _] = true;
}`
        }
    ];

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return { currentLevel: 0, answers: {} };
            }
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return { currentLevel: 0, answers: {} };
            }
            const answers = parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {};
            const storedLevel = Number.isInteger(parsed.currentLevel) ? parsed.currentLevel : 0;
            return { currentLevel: storedLevel, answers };
        } catch (error) {
            return { currentLevel: 0, answers: {} };
        }
    }

    function clampLevel(index) {
        const safeIndex = Number.isInteger(index) ? index : 0;
        return Math.min(Math.max(safeIndex, 0), levels.length - 1);
    }

    const storedState = loadState();
    let currentLevel = clampLevel(storedState.currentLevel);
    let savedAnswers = storedState.answers;
    let pollingInterval;
    let cellGrid = [];
    let targetGrid = [];
    let toastTimeout;

    function persistState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                currentLevel,
                answers: savedAnswers
            }));
        } catch (error) {
            return;
        }
    }

    function saveAnswer(levelIndex, code) {
        savedAnswers[String(levelIndex)] = code;
        persistState();
    }

    function getSavedAnswer(levelIndex) {
        return savedAnswers[String(levelIndex)];
    }

    function updateNavButtons(prevButton, nextButton) {
        if (prevButton) {
            prevButton.disabled = currentLevel <= 0;
        }
        if (nextButton) {
            nextButton.disabled = currentLevel >= levels.length - 1;
        }
    }

    function setLevel(nextIndex, codeDisplay, input, message, prevButton, nextButton) {
        const targetIndex = clampLevel(nextIndex);
        if (targetIndex === currentLevel) {
            updateNavButtons(prevButton, nextButton);
            return;
        }

        saveAnswer(currentLevel, input.value || '');
        currentLevel = targetIndex;
        persistState();
        initLevel(codeDisplay, input, message, prevButton, nextButton);
        scrollToInstruction();
    }

    function initGame() {
        const grid = document.getElementById('logic-painter-grid');
        const codeDisplay = document.getElementById('logic-painter-code');
        const message = document.getElementById('logic-painter-message');
        const input = document.getElementById('logic-painter-input');
        const prevButton = document.getElementById('logic-painter-prev');
        const nextButton = document.getElementById('logic-painter-next');
        const resetButton = document.getElementById('logic-painter-reset');

        if (!grid || !codeDisplay || !message || !input) {
            return false;
        }

        if (grid.innerHTML.trim() !== '') {
            return true;
        }

        buildGrid(grid);
        initLevel(codeDisplay, input, message, prevButton, nextButton);
        persistState();

        window.checkSolution = function () {
            runCheck(codeDisplay, input, message, prevButton, nextButton);
        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                setLevel(currentLevel - 1, codeDisplay, input, message, prevButton, nextButton);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                setLevel(currentLevel + 1, codeDisplay, input, message, prevButton, nextButton);
            });
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                const level = levels[currentLevel];
                input.value = level.starterCode;
                message.innerText = '';
                clearUserClasses();
                saveAnswer(currentLevel, input.value);
                showToast('Reset to starter code.');
            });
        }

        input.addEventListener('input', () => {
            saveAnswer(currentLevel, input.value);
        });

        return true;
    }

    function buildGrid(grid) {
        grid.innerHTML = '';
        cellGrid = [];

        for (let r = 0; r < GRID_ROWS; r++) {
            const rowCells = [];
            for (let c = 0; c < GRID_COLS; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;

                const hint = document.createElement('span');
                hint.className = 'coords-hint';
                hint.innerText = `${r},${c}`;
                cell.appendChild(hint);

                grid.appendChild(cell);
                rowCells.push(cell);
            }
            cellGrid.push(rowCells);
        }
    }

    function initLevel(codeDisplay, input, message, prevButton, nextButton) {
        const level = levels[currentLevel];
        message.innerText = '';
        const savedCode = getSavedAnswer(currentLevel);
        input.value = savedCode !== undefined ? savedCode : level.starterCode;

        codeDisplay.innerHTML = [
            `<div class="level-title">${escapeHtml(level.title)}</div>`,
            `<div class="level-hint">${escapeHtml(level.prompt)}</div>`
        ].join('');

        targetGrid = buildTargetGrid(level);
        applyTargetClasses();
        clearUserClasses();
        updateNavButtons(prevButton, nextButton);
    }

    function showToast(messageText, options) {
        const toast = document.getElementById('logic-painter-toast');
        if (!toast) {
            return Promise.resolve();
        }
        const opts = options || {};
        const variant = typeof opts.variant === 'string' ? opts.variant.trim() : '';
        const duration = Number.isFinite(opts.duration) ? opts.duration : 900;
        const transitionMs = 300;
        const visibleDuration = Math.max(duration - transitionMs, 0);

        toast.textContent = messageText;
        toast.classList.remove('show', 'level-up');
        if (variant) {
            toast.classList.add(variant);
        }

        void toast.offsetWidth;
        toast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        return new Promise((resolve) => {
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
                if (variant) {
                    toast.classList.remove(variant);
                }
                setTimeout(resolve, transitionMs);
            }, visibleDuration);
        });
    }

    function scrollToInstruction() {
        const anchor = document.getElementById('logic-painter-container') ||
            document.getElementById('logic-painter-instruction');
        const container = document.querySelector('.interactive-container');
        const target = anchor || container;
        if (!target) {
            return;
        }
        const rect = target.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function buildTargetGrid(level) {
        const grid = buildEmptyGrid();
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (level.target(r, c, GRID_ROWS, GRID_COLS)) {
                    grid[r][c] = true;
                }
            }
        }
        return grid;
    }

    function applyTargetClasses() {
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const cell = cellGrid[r][c];
                cell.classList.toggle('target', targetGrid[r][c]);
            }
        }
    }

    function clearUserClasses() {
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const cell = cellGrid[r][c];
                cell.classList.remove('user', 'extra', 'miss');
            }
        }
    }

    function runCheck(codeDisplay, input, message, prevButton, nextButton) {
        const code = input.value || '';
        saveAnswer(currentLevel, code);
        clearUserClasses();

        const result = runUserCode(code);
        applyUserMarks(result);

        if (result.errors.length) {
            message.style.color = '#e06c75';
            message.innerText = result.errors[0];
            return;
        }

        const level = levels[currentLevel];
        if (level.requireSingleLoop && (result.forCount !== 1 || result.hasNestedFor)) {
            message.style.color = '#e06c75';
            message.innerText = 'This level requires exactly one loop (no nested loops).';
            return;
        }

        const mismatch = highlightDifferences(result);
        const hasOutOfBounds = result.outOfBounds > 0;
        if (!mismatch && !hasOutOfBounds) {
            message.style.color = '#98c379';
            message.innerText = 'Nice! Your loops match the target.';
            if (currentLevel < levels.length - 1) {
                showToast('Great job!', { duration: 800 }).then(() => {
                    return showToast('Level up!', { duration: 1000, variant: 'level-up' });
                }).then(() => {
                    setLevel(currentLevel + 1, codeDisplay, input, message, prevButton, nextButton);
                });
            } else {
                showToast('Great job!', { duration: 800 });
            }
        } else {
            const parts = [];
            const extra = mismatch ? mismatch.extra : 0;
            const missing = mismatch ? mismatch.missing : 0;
            if (extra > 0) {
                parts.push(`extra: ${extra}`);
            }
            if (missing > 0) {
                parts.push(`missing: ${missing}`);
            }
            if (result.outOfBounds > 0) {
                parts.push(`out of bounds: ${result.outOfBounds}`);
            }
            message.style.color = '#e06c75';
            message.innerText = parts.length ? `Not yet (${parts.join(', ')}).` : 'Not yet.';
        }
    }

    function applyUserMarks(result) {
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (result.marks[r][c]) {
                    cellGrid[r][c].classList.add('user');
                }
            }
        }
    }

    function highlightDifferences(result) {
        let extra = 0;
        let missing = 0;

        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const user = result.marks[r][c];
                const target = targetGrid[r][c];
                const cell = cellGrid[r][c];

                if (user && !target) {
                    cell.classList.add('extra');
                    extra++;
                } else if (!user && target) {
                    cell.classList.add('miss');
                    missing++;
                }
            }
        }

        if (extra === 0 && missing === 0) {
            return null;
        }
        return { extra, missing };
    }

    function runUserCode(code) {
        const result = {
            marks: buildEmptyGrid(),
            errors: [],
            assigned: 0,
            outOfBounds: 0,
            forCount: 0,
            hasNestedFor: false
        };

        let ast;
        try {
            ast = parseCode(code);
        } catch (error) {
            result.errors.push(error.message);
            return result;
        }

        const analysis = analyzeStatements(ast, 0);
        result.forCount = analysis.forCount;
        result.hasNestedFor = analysis.hasNestedFor;

        try {
            const env = {};
            const limits = { totalIterations: 0 };
            executeStatements(ast, env, result, limits);
        } catch (error) {
            result.errors.push(error.message);
        }

        if (!result.errors.length && result.assigned === 0) {
            result.errors.push('No array assignments found. Try mat[i, j] = true;');
        }

        return result;
    }

    function analyzeStatements(statements, loopDepth) {
        let forCount = 0;
        let hasNestedFor = false;

        for (const stmt of statements) {
            if (stmt.type === 'for') {
                forCount++;
                if (loopDepth > 0) {
                    hasNestedFor = true;
                }
                const inner = analyzeStatements(stmt.body, loopDepth + 1);
                forCount += inner.forCount;
                hasNestedFor = hasNestedFor || inner.hasNestedFor;
            } else if (stmt.type === 'if') {
                const inner = analyzeStatements(stmt.body, loopDepth);
                forCount += inner.forCount;
                hasNestedFor = hasNestedFor || inner.hasNestedFor;
            }
        }

        return { forCount, hasNestedFor };
    }

    function buildEmptyGrid() {
        const grid = [];
        for (let r = 0; r < GRID_ROWS; r++) {
            grid.push(new Array(GRID_COLS).fill(false));
        }
        return grid;
    }

    function parseCode(code) {
        const cleaned = stripComments(code);
        const parsed = parseStatements(cleaned, 0, null);
        return parsed.statements;
    }

    function stripComments(code) {
        return code
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '');
    }

    function parseStatements(src, index, stopChar) {
        const statements = [];

        while (index < src.length) {
            index = skipWhitespaceAndSemicolons(src, index);
            if (index >= src.length) {
                break;
            }
            if (stopChar && src[index] === stopChar) {
                return { statements, index: index + 1 };
            }
            if (src[index] === '}') {
                if (stopChar === '}') {
                    return { statements, index: index + 1 };
                }
                index++;
                continue;
            }
            if (startsWithWord(src, index, 'for')) {
                const parsed = parseFor(src, index);
                statements.push(parsed.node);
                index = parsed.index;
                continue;
            }
            if (startsWithWord(src, index, 'if')) {
                const parsed = parseIf(src, index);
                statements.push(parsed.node);
                index = parsed.index;
                continue;
            }
            if (src[index] === '{') {
                const block = parseBlock(src, index);
                statements.push(...block.statements);
                index = block.index;
                continue;
            }

            const statementEnd = findStatementEnd(src, index);
            const statementText = src.slice(index, statementEnd).trim();
            const assignment = parseAssignment(statementText);
            if (assignment) {
                if (Array.isArray(assignment)) {
                    statements.push(...assignment);
                } else {
                    statements.push(assignment);
                }
            }
            index = statementEnd;
        }

        return { statements, index };
    }

    function parseFor(src, index) {
        index += 3;
        index = skipWhitespaceAndSemicolons(src, index);

        if (src[index] !== '(') {
            throw new Error('Expected "(" after for.');
        }

        const headerEnd = findMatching(src, index, '(', ')');
        const header = src.slice(index + 1, headerEnd);
        const parts = header.split(';');

        if (parts.length < 3) {
            throw new Error('Invalid for-loop header.');
        }

        const init = parseInit(parts[0]);
        const condition = parts[1].trim();
        const increment = parseIncrement(parts.slice(2).join(';'), init.varName);

        if (!condition) {
            throw new Error('Missing for-loop condition.');
        }

        const body = parseBlockOrSingle(src, headerEnd + 1);
        return {
            node: {
                type: 'for',
                varName: init.varName,
                initExpr: init.expr,
                condition,
                increment,
                body: body.statements
            },
            index: body.index
        };
    }

    function parseIf(src, index) {
        index += 2;
        index = skipWhitespaceAndSemicolons(src, index);

        if (src[index] !== '(') {
            throw new Error('Expected "(" after if.');
        }

        const condEnd = findMatching(src, index, '(', ')');
        const condition = src.slice(index + 1, condEnd).trim();
        const body = parseBlockOrSingle(src, condEnd + 1);

        if (!condition) {
            throw new Error('Missing if condition.');
        }

        return {
            node: { type: 'if', condition, body: body.statements },
            index: body.index
        };
    }

    function parseInit(text) {
        const trimmed = text.trim();
        const match = trimmed.match(/^(?:int|var)?\s*([A-Za-z_]\w*)\s*=\s*(.+)$/);
        if (!match) {
            throw new Error('Unsupported for-loop initializer.');
        }
        return { varName: match[1], expr: match[2].trim() };
    }

    function parseIncrement(text, varName) {
        const trimmed = text.trim();
        if (!trimmed) {
            throw new Error('Missing for-loop increment.');
        }
        if (trimmed === `${varName}++`) {
            return { varName, nextExpr: `${varName} + 1` };
        }
        if (trimmed === `${varName}--`) {
            return { varName, nextExpr: `${varName} - 1` };
        }

        let match = trimmed.match(new RegExp(`^${varName}\\s*\\+=\\s*(.+)$`));
        if (match) {
            return { varName, nextExpr: `${varName} + (${match[1].trim()})` };
        }

        match = trimmed.match(new RegExp(`^${varName}\\s*-=\\s*(.+)$`));
        if (match) {
            return { varName, nextExpr: `${varName} - (${match[1].trim()})` };
        }

        match = trimmed.match(new RegExp(`^${varName}\\s*=\\s*(.+)$`));
        if (match) {
            return { varName, nextExpr: match[1].trim() };
        }

        throw new Error('Unsupported for-loop increment.');
    }

    function parseBlockOrSingle(src, index) {
        index = skipWhitespaceAndSemicolons(src, index);
        if (src[index] === '{') {
            return parseBlock(src, index);
        }
        const single = parseSingleStatement(src, index);
        return {
            statements: single.nodes,
            index: single.index
        };
    }

    function parseBlock(src, index) {
        const endIndex = findMatching(src, index, '{', '}');
        const content = src.slice(index + 1, endIndex);
        const inner = parseStatements(content, 0, null);
        return { statements: inner.statements, index: endIndex + 1 };
    }

    function parseSingleStatement(src, index) {
        index = skipWhitespaceAndSemicolons(src, index);
        if (startsWithWord(src, index, 'for')) {
            const parsed = parseFor(src, index);
            return { nodes: [parsed.node], index: parsed.index };
        }
        if (startsWithWord(src, index, 'if')) {
            const parsed = parseIf(src, index);
            return { nodes: [parsed.node], index: parsed.index };
        }

        const statementEnd = findStatementEnd(src, index);
        const statementText = src.slice(index, statementEnd).trim();
        const assignment = parseAssignment(statementText);
        return {
            nodes: assignment ? (Array.isArray(assignment) ? assignment : [assignment]) : [],
            index: statementEnd
        };
    }

    function parseAssignment(text) {
        const chainMatch = text.match(/mat\s*\[\s*([^\],]+)\s*,\s*([^\]]+)\s*\]\s*=\s*mat\s*\[\s*([^\],]+)\s*,\s*([^\]]+)\s*\]\s*=\s*true\b/i);
        if (chainMatch) {
            return [
                { type: 'assign', rowExpr: chainMatch[1].trim(), colExpr: chainMatch[2].trim() },
                { type: 'assign', rowExpr: chainMatch[3].trim(), colExpr: chainMatch[4].trim() }
            ];
        }

        const match = text.match(/mat\s*\[\s*([^\],]+)\s*,\s*([^\]]+)\s*\]\s*=\s*true\b/i);
        if (!match) {
            return null;
        }
        return {
            type: 'assign',
            rowExpr: match[1].trim(),
            colExpr: match[2].trim()
        };
    }

    function executeStatements(statements, env, result, limits) {
        for (const stmt of statements) {
            if (stmt.type === 'assign') {
                executeAssign(stmt, env, result);
            } else if (stmt.type === 'if') {
                if (evaluateCondition(stmt.condition, env)) {
                    executeStatements(stmt.body, env, result, limits);
                }
            } else if (stmt.type === 'for') {
                executeFor(stmt, env, result, limits);
            }
        }
    }

    function executeAssign(stmt, env, result) {
        const row = evaluateExpression(stmt.rowExpr, env);
        const col = evaluateExpression(stmt.colExpr, env);

        if (!Number.isFinite(row) || !Number.isFinite(col)) {
            throw new Error('Array index could not be evaluated.');
        }
        if (!Number.isInteger(row) || !Number.isInteger(col)) {
            throw new Error('Array index must be an integer.');
        }
        if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) {
            result.outOfBounds++;
            return;
        }

        result.marks[row][col] = true;
        result.assigned++;
    }

    function executeFor(stmt, env, result, limits) {
        const varName = stmt.varName;
        const hadPrev = Object.prototype.hasOwnProperty.call(env, varName);
        const prevValue = env[varName];

        env[varName] = evaluateExpression(stmt.initExpr, env);
        let loopIterations = 0;

        while (evaluateCondition(stmt.condition, env)) {
            executeStatements(stmt.body, env, result, limits);
            env[varName] = evaluateExpression(stmt.increment.nextExpr, env);

            loopIterations++;
            limits.totalIterations++;
            if (loopIterations > MAX_LOOP_ITERATIONS || limits.totalIterations > MAX_TOTAL_ITERATIONS) {
                throw new Error('Loop limit exceeded. Check your for-loop bounds.');
            }
        }

        if (hadPrev) {
            env[varName] = prevValue;
        } else {
            delete env[varName];
        }
    }

    function evaluateCondition(expr, env) {
        return Boolean(evaluateExpression(expr, env));
    }

    function evaluateExpression(expr, env) {
        const normalized = normalizeExpression(expr);
        const substituted = substituteVariables(normalized, env);
        const safe = substituted.replace(/\s+/g, ' ').trim();

        if (safe === '') {
            throw new Error('Empty expression.');
        }
        if (/[^0-9+\-*/%()<>!=&|?:\s]/.test(safe)) {
            throw new Error(`Unsupported expression: ${expr.trim()}`);
        }

        try {
            return Function(`"use strict"; return (${safe});`)();
        } catch (error) {
            throw new Error(`Invalid expression: ${expr.trim()}`);
        }
    }

    function normalizeExpression(expr) {
        const normalized = expr
            .replace(/mat\s*\.\s*GetLength\s*\(\s*0\s*\)/gi, String(GRID_ROWS))
            .replace(/mat\s*\.\s*GetLength\s*\(\s*1\s*\)/gi, String(GRID_COLS))
            .replace(/mat\s*\.\s*Length\b/gi, String(GRID_ROWS * GRID_COLS));

        return expandAbsCalls(normalized);
    }

    function expandAbsCalls(expr) {
        const absRegex = /Math\s*\.\s*Abs\s*\(/gi;
        let output = '';
        let cursor = 0;
        while (cursor < expr.length) {
            absRegex.lastIndex = cursor;
            const match = absRegex.exec(expr);
            if (!match) {
                output += expr.slice(cursor);
                break;
            }
            output += expr.slice(cursor, match.index);
            const openIndex = match.index + match[0].length - 1;
            const closeIndex = findMatching(expr, openIndex, '(', ')');
            const inner = expandAbsCalls(expr.slice(openIndex + 1, closeIndex));
            output += `(((${inner}) < 0 ? -(${inner}) : (${inner})))`;
            cursor = closeIndex + 1;
        }
        return output;
    }

    function substituteVariables(expr, env) {
        return expr.replace(/\b([A-Za-z_]\w*)\b/g, (match) => {
            if (match === 'true') {
                return '1';
            }
            if (match === 'false') {
                return '0';
            }
            if (Object.prototype.hasOwnProperty.call(env, match)) {
                return String(env[match]);
            }
            return match;
        });
    }

    function skipWhitespaceAndSemicolons(src, index) {
        while (index < src.length && /[\s;]/.test(src[index])) {
            index++;
        }
        return index;
    }

    function startsWithWord(src, index, word) {
        if (src.slice(index, index + word.length) !== word) {
            return false;
        }
        const before = index > 0 ? src[index - 1] : '';
        const after = index + word.length < src.length ? src[index + word.length] : '';
        if (/[A-Za-z0-9_]/.test(before) || /[A-Za-z0-9_]/.test(after)) {
            return false;
        }
        return true;
    }

    function findStatementEnd(src, index) {
        for (let i = index; i < src.length; i++) {
            if (src[i] === ';') {
                return i + 1;
            }
            if (src[i] === '}') {
                return i;
            }
        }
        return src.length;
    }

    function findMatching(src, startIndex, openChar, closeChar) {
        let depth = 0;
        for (let i = startIndex; i < src.length; i++) {
            if (src[i] === openChar) {
                depth++;
            } else if (src[i] === closeChar) {
                depth--;
                if (depth === 0) {
                    return i;
                }
            }
        }
        throw new Error(`Missing "${closeChar}".`);
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    pollingInterval = setInterval(function () {
        if (initGame()) {
            clearInterval(pollingInterval);
        }
    }, 100);

    setTimeout(function () {
        clearInterval(pollingInterval);
    }, 10000);
})();
