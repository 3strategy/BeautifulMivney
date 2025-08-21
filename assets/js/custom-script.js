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

// on load, restore both theme & size
window.onload = function() {
  // existing theme restore
  const theme = getCookie("theme");
  if (theme === "light") document.body.classList.add("light-theme");

  // new size restore
  const size = getCookie("size");
  if (size === "large") document.body.classList.add("large-theme");
}

// Store original mermaid content
let originalMermaidContent = new Map();

// Mermaid theme management
function initMermaid() {
  const isLight = document.body.classList.contains("light-theme");
  
  mermaid.initialize({
    startOnLoad: false, // Important: set to false so we control rendering
    theme: isLight ? 'default' : 'dark',
    themeVariables: isLight ? {
      // Light theme
      primaryColor: '#ffffff',
      primaryTextColor: '#101010',
      primaryBorderColor: '#404040',
      lineColor: '#404040',
      arrowheadColor: '#404040',
      edgeLabelBackground: '#ffffff',
      clusterBkg: '#f9f9f9',
      mainBkg: '#ffffff',
      secondBkg: '#f9f9f9'
    } : {
      // Dark theme using your CSS variables colors
      primaryColor: '#424242',
      primaryTextColor: '#E0E0E0',
      primaryBorderColor: '#E0E0E0',
      lineColor: '#E0E0E0',
      arrowheadColor: '#E0E0E0',
      edgeLabelBackground: '#1F1F1F',
      clusterBkg: '#1F1F1F',
      mainBkg: '#424242',
      secondBkg: '#1F1F1F'
    }
  });
  
  // Process all mermaid diagrams
  document.querySelectorAll('.mermaid').forEach((el, index) => {
    const id = `mermaid-diagram-${index}`;
    
    // Store original content on first run
    if (!originalMermaidContent.has(id)) {
      originalMermaidContent.set(id, el.textContent.trim());
    }
    
    // Restore original content
    const originalText = originalMermaidContent.get(id);
    
    // Clear the element and restore original text
    el.innerHTML = originalText;
    el.removeAttribute('data-processed');
    
    // Render the diagram
    try {
      mermaid.render(id + '-svg', originalText).then(result => {
        el.innerHTML = result.svg;
      }).catch(error => {
        console.error('Mermaid rendering error:', error);
        el.innerHTML = `<pre>${originalText}</pre>`;
      });
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      el.innerHTML = `<pre>${originalText}</pre>`;
    }
  });
}

// Initialize mermaid when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    initMermaid();
  }
});

// Modified toggleTheme function
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    setCookie("theme", "dark", 365);
  } else {
    body.classList.add("light-theme");
    setCookie("theme", "light", 365);
  }
  
  // Re-initialize mermaid with new theme
  if (typeof mermaid !== 'undefined') {
    setTimeout(initMermaid, 100);
  }
}