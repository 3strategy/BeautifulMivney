if (window.self !== window.top) {
  document.documentElement.classList.add('embedded-animation');
}

document.querySelectorAll('[data-collection-animation]').forEach(frame => {
  let observer;

  function fitFrame() {
    observer?.disconnect();
    const child = frame.contentDocument;
    if (!child?.body || !child.documentElement.classList.contains('embedded-animation')) return;

    // Measure the content, since the root of an iframe is at least as tall as its viewport.
    function resize() {
      frame.height = Math.ceil(child.body.getBoundingClientRect().height);
    }

    observer = new ResizeObserver(resize);
    observer.observe(child.body);
    resize();
  }

  frame.addEventListener('load', fitFrame);
  fitFrame();
});

function createCollectionAnimation() {
  const operationButtons = [...document.querySelectorAll(
    '#btn2, #btn3, #btn4, #btn5, #btn6'
  )];
  let timer;

  function cancel() {
    clearTimeout(timer);
    timer = undefined;
    operationButtons.forEach(button => { button.disabled = false; });
  }

  function after(delay, step) {
    operationButtons.forEach(button => { button.disabled = true; });
    timer = setTimeout(step, delay);
  }

  return { after, cancel };
}

function enablePresentationControls() {
  if (window.self !== window.top) return;

  const buttons = Array.from({ length: 7 }, (_, index) =>
    document.getElementById('btn' + (index + 1))
  );
  let index = 0;
  let selected;

  function clearHighlight() {
    selected?.classList.remove('hover-effect');
  }

  document.addEventListener('wheel', event => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? -1 : 1;
    do {
      index = Math.max(0, (index + direction) % buttons.length);
    } while (buttons[index].disabled);

    clearHighlight();
    selected = buttons[index];
    selected.focus({ preventScroll: true });
  }, { passive: false });

  document.addEventListener('contextmenu', event => {
    event.preventDefault();
    if (!selected || selected.disabled) return;

    selected.click();
    selected.focus({ preventScroll: true });
    if (selected !== buttons[0] && !selected.disabled) {
      selected.classList.add('hover-effect');
    }
  });

  buttons.forEach(button => button.addEventListener('mouseover', clearHighlight));
}
