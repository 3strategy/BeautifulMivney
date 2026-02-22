// Cookie helper functions
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Toggle theme function
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    setCookie("theme", "dark", 365);
  } else {
    body.classList.add("light-theme");
    setCookie("theme", "light", 365);
  }
}

// call this to toggle “big text+layout”
function toggleSize() {
  const body = document.body;
  if (body.classList.contains("large-theme")) {
    body.classList.remove("large-theme");
    setCookie("size", "normal", 365);
  } else {
    body.classList.add("large-theme");
    setCookie("size", "large", 365);
  }
}

// Convert fenced ```mermaid code blocks to <div class="mermaid"> before Mermaid runs
document.addEventListener('DOMContentLoaded', function () {
  try {
    const codeBlocks = document.querySelectorAll('pre > code[class*="language-mermaid"]');

    const getMermaidDirClass = (code, pre) => {
      const classes = new Set();
      if (code && code.classList) {
        code.classList.forEach((cls) => classes.add(cls));
      }
      if (pre && pre.classList) {
        pre.classList.forEach((cls) => classes.add(cls));
      }

      if (classes.has('mermaid-rtl') || classes.has('language-mermaid-rtl')) return 'mermaid-rtl';
      if (classes.has('mermaid-ltr') || classes.has('language-mermaid-ltr')) return 'mermaid-ltr';

      for (const cls of classes) {
        if (!cls.startsWith('language-mermaid-')) continue;
        const suffix = cls.slice('language-mermaid-'.length).toLowerCase();
        if (suffix === 'rtl' || suffix === 'ltr') return `mermaid-${suffix}`;
      }

      const dataDir = (code && code.dataset && code.dataset.mermaidDir) ||
        (pre && pre.dataset && pre.dataset.mermaidDir);
      if (dataDir === 'rtl' || dataDir === 'ltr') return `mermaid-${dataDir}`;

      const src = code && code.textContent ? code.textContent : '';
      const dirMatch = src.match(/^\s*%%\s*dir\s*:\s*(rtl|ltr)\s*%%/im);
      if (dirMatch) return `mermaid-${dirMatch[1].toLowerCase()}`;

      if (/^\s*classDiagram\b/m.test(src) && /[A-Za-z]/.test(src)) return 'mermaid-ltr';

      return '';
    };

    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      const container = document.createElement('div');
      const dirClass = getMermaidDirClass(code, pre);
      container.className = dirClass ? `mermaid ${dirClass}` : 'mermaid';
      // textContent decodes any HTML entities into raw Mermaid source
      container.textContent = code.textContent;
      // Replace the whole <pre> block with the Mermaid container
      pre.replaceWith(container);
    });
  } catch (e) {
    // no-op: fail-safe so other scripts continue to run
    console && console.warn && console.warn('Mermaid fence conversion failed:', e);
  }
});

// Clean copy for diff blocks: if the user copies only added (+) lines, strip the leading diff marker.
// This keeps tutorial `diff` blocks readable while allowing direct paste into source files.
document.addEventListener('copy', function (event) {
  try {
    const selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

    const toElement = (node) => {
      if (!node) return null;
      return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    };

    const findDiffContainer = (el) => {
      if (!el || !el.closest) return null;
      return el.closest(
        '.language-diff, .highlighter-rouge.language-diff, code.language-diff, pre code[class*="language-diff"]'
      );
    };

    const anchorContainer = findDiffContainer(toElement(selection.anchorNode));
    const focusContainer = findDiffContainer(toElement(selection.focusNode));
    if (!anchorContainer || !focusContainer || anchorContainer !== focusContainer) return;

    const selectedText = selection.toString();
    if (!selectedText || selectedText.indexOf('+') === -1) return;

    const normalized = selectedText.replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');
    const nonEmptyLines = lines.filter((line) => line.length > 0);
    if (nonEmptyLines.length === 0) return;

    // Keep full patch copies intact (headers/hunks/metadata should remain raw).
    const hasPatchMetadata = nonEmptyLines.some((line) =>
      /^(diff --git|index |@@|--- |\+\+\+ )/.test(line)
    );
    if (hasPatchMetadata) return;

    // Only rewrite clipboard when the user selected pure "added" lines.
    const allAddedLines = nonEmptyLines.every((line) => line.startsWith('+') && !line.startsWith('+++ '));
    if (!allAddedLines) return;

    const cleaned = lines.map((line) => (line.startsWith('+') ? line.slice(1) : line)).join('\n');
    if (cleaned === normalized) return;

    if (event.clipboardData && event.clipboardData.setData) {
      event.clipboardData.setData('text/plain', cleaned);
      event.preventDefault();
      return;
    }

    // Fallback for browsers that do not expose clipboardData on the copy event.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleaned).catch(() => {});
      event.preventDefault();
    }
  } catch (e) {
    // Fail-safe: never break normal copy behavior.
    console && console.warn && console.warn('Diff copy cleanup failed:', e);
  }
});

// on load, restore both theme & size
window.onload = function() {
  // existing theme restore
  const theme = getCookie("theme");
  if (theme === "light") document.body.classList.add("light-theme");

  // new size restore
  const size = getCookie("size");
  if (size === "large") document.body.classList.add("large-theme");
}
