(function () {
    const levels = [
        {
            text: 'if (row == 2)',
            check: (r, c) => r === 2
        },
        {
            text: 'if (col == 1 || col == 3)',
            check: (r, c) => c === 1 || c === 3
        },
        {
            text: 'if (row == col)',
            check: (r, c) => r === c
        },
        {
            text: 'if (row == 0 || col == 4)',
            check: (r, c) => r === 0 || c === 4
        },
        {
            text: 'if (row >= 1 && row <= 3 && col >= 1 && col <= 3)',
            check: (r, c) => r >= 1 && r <= 3 && c >= 1 && c <= 3
        },
        {
            text: 'if ((row + col) % 2 == 0)',
            check: (r, c) => (r + c) % 2 === 0
        }
    ];

    let currentLevel = 0;
    let pollingInterval;
    let toastTimeout;

    function initGame() {
        let grid = document.getElementById('logic-painter-grid');
        let codeDisplay = document.getElementById('logic-painter-code');
        let message = document.getElementById('logic-painter-message');

        // If elements missing, we wait.
        if (!grid || !codeDisplay || !message) {
            return false;
        }

        // If already initialized (has content), stop polling.
        if (grid.innerHTML.trim() !== '') {
            return true;
        }

        console.log('Logic Painter: Elements found, initializing...');

        // -- Internal Helper: Update the display --
        function initLevel() {
            grid.innerHTML = '';
            message.innerText = '';

            let logicText = levels[currentLevel].text;

            // Use simple string replacement to avoid potential Liquid conflict or markdown issues
            logicText = logicText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            logicText = logicText.replace(/(\|\||&&|==|!=|&gt;=|&lt;=|&gt;|&lt;|%)/g, '<span class="operator">$1</span>');
            logicText = logicText
                .replace(/row/g, '<span class="variable">row</span>')
                .replace(/col/g, '<span class="variable">col</span>')
                .replace(/(\d+)/g, '<span class="number">$1</span>');

            codeDisplay.innerHTML = logicText;

            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 5; c++) {
                    let cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = r;
                    cell.dataset.col = c;

                    let hint = document.createElement('span');
                    hint.className = 'coords-hint';
                    hint.innerText = `${r},${c}`;
                    cell.appendChild(hint);

                    cell.onclick = function () {
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                        } else {
                            this.classList.add('selected');
                            this.classList.remove('wrong');
                        }
                    };
                    grid.appendChild(cell);
                }
            }
        }
        function showToast(messageText) {
            const toast = document.getElementById('logic-painter-toast');
            if (!toast) {
                return;
            }
            toast.textContent = messageText;
            toast.classList.add('show');
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 1600);
        }

        function scrollToTop() {
            const anchor = document.getElementById('logic-painter-container');
            const container = document.querySelector('.interactive-container');
            const target = anchor || container;
            if (!target) {
                return;
            }
            const rect = target.getBoundingClientRect();
            const top = window.pageYOffset + rect.top - 12;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }

        // -- Expose checkSolution to Global Scope --
        window.checkSolution = function () {
            let cells = document.querySelectorAll('.interactive-container .cell');
            let allCorrect = true;
            let logic = levels[currentLevel].check;
            let anySelected = false;

            cells.forEach(cell => {
                let r = parseInt(cell.dataset.row);
                let c = parseInt(cell.dataset.col);
                let shouldBeSelected = logic(r, c);
                let isSelected = cell.classList.contains('selected');

                if (isSelected) anySelected = true;

                if (shouldBeSelected !== isSelected) {
                    allCorrect = false;
                    if (isSelected && !shouldBeSelected) {
                        cell.classList.add('wrong');
                    }
                }
            });

            if (allCorrect) {
                message.style.color = '#98c379';
                message.innerText = 'מעולה! כל הכבוד!';
                showToast('Great job!');
                setTimeout(() => {
                    currentLevel++;
                    if (currentLevel < levels.length) {
                        initLevel();
                        scrollToTop();
                    } else {
                        codeDisplay.innerHTML = "סיימת את כל השלבים!";
                        grid.innerHTML = '<h2 style="grid-column: span 5; color: #61dafb; text-align:center; align-self:center; font-size:2em;">ניצחון!</h2>';
                        document.querySelector('.interactive-container .btn').style.display = 'none';
                    }
                }, 1500);
            } else {
                message.style.color = '#e06c75';
                if (!anySelected) {
                    message.innerText = 'לא סימנת כלום...';
                } else {
                    message.innerText = 'טעות! בדקי את המשבצות האדומות.';
                }
            }
        };

        // Initialize the first level
        initLevel();
        return true;
    }

    // Start polling: check every 100ms
    pollingInterval = setInterval(function () {
        if (initGame()) {
            clearInterval(pollingInterval);
            console.log('Logic Painter: Started successfully.');
        }
    }, 100);

    // Safety timeout: stop polling after 10 seconds
    setTimeout(function () {
        clearInterval(pollingInterval);
    }, 10000);

})();
