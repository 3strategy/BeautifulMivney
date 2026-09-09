/* Opt in by tagging ordinary content links data-sequence-nav="next" / "prev". */
(() => {
  'use strict';
  const main = document.querySelector('main');
  if (!main || !main.querySelector('a[data-sequence-nav]')) return;

  const excluded = 'a, button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="slider"], iframe, object, video, audio, canvas, [data-swipe-ignore]';
  let gesture = null;
  const reset = () => { gesture = null; };
  const selected = () => Boolean(window.getSelection()?.toString());
  const zoomed = () => window.visualViewport && window.visualViewport.scale > 1.05;

  function destination(direction) {
    const link = main.querySelector(`a[data-sequence-nav="${direction}"][href]`);
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return null;
    const url = new URL(link.href, location.href);
    return url.origin === location.origin && /^https?:$/.test(url.protocol) &&
      (url.pathname !== location.pathname || url.search !== location.search) ? url.href : null;
  }

  function ownsGesture(target) {
    if (!(target instanceof Element) || target.closest(excluded)) return true;
    for (let node = target; node && node !== main; node = node.parentElement) {
      if (node.scrollWidth > node.clientWidth + 1 &&
          /auto|scroll/.test(getComputedStyle(node).overflowX)) return true;
    }
    return false;
  }

  main.addEventListener('touchstart', event => {
    reset();
    if (event.touches.length !== 1 || selected() || zoomed() || ownsGesture(event.target)) return;
    const touch = event.touches[0];
    // Leave the screen edges to the browser/OS history gestures.
    if (touch.clientX < 28 || touch.clientX > window.innerWidth - 28) return;
    gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY,
      started: performance.now(), direction: null };
  }, { passive: true });

  main.addEventListener('touchmove', event => {
    if (!gesture) return;
    if (event.touches.length !== 1 || selected() || zoomed()) return reset();
    const touch = event.touches[0];
    if (touch.identifier !== gesture.id) return reset();
    const dx = touch.clientX - gesture.x;
    const dy = touch.clientY - gesture.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
    // Once a gesture looks vertical/diagonal, never turn that scroll into navigation.
    if (Math.abs(dx) < Math.abs(dy) * 1.8) return reset();
    const direction = dx > 0 ? 'next' : 'prev';
    if ((gesture.direction && gesture.direction !== direction) || !destination(direction)) return reset();
    if (!event.cancelable) return reset();
    gesture.direction = direction;
    event.preventDefault();
  }, { passive: false });

  main.addEventListener('touchend', event => {
    const swipe = gesture;
    reset();
    if (!swipe || !swipe.direction || event.touches.length || selected() || zoomed()) return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === swipe.id);
    if (!touch || performance.now() - swipe.started > 900) return;
    const dx = touch.clientX - swipe.x;
    const dy = touch.clientY - swipe.y;
    const threshold = Math.max(70, Math.min(120, window.innerWidth * 0.18));
    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.8 ||
        (dx > 0 ? 'next' : 'prev') !== swipe.direction) return;
    const url = destination(swipe.direction);
    if (url) {
      if (event.cancelable) event.preventDefault();
      location.assign(url);
    }
  }, { passive: false });

  main.addEventListener('touchcancel', reset, { passive: true });
  window.addEventListener('pagehide', reset);
  window.addEventListener('pageshow', reset);
})();
