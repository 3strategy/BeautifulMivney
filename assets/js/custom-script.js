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
    const codeBlocks = document.querySelectorAll('pre > code.language-mermaid');
    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid';
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

// on load, restore both theme & size
window.onload = function() {
  // existing theme restore
  const theme = getCookie("theme");
  if (theme === "light") document.body.classList.add("light-theme");

  // new size restore
  const size = getCookie("size");
  if (size === "large") document.body.classList.add("large-theme");
}
