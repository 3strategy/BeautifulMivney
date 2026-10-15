(function () {
  'use strict';

  const key = 'lesson-language-preference';
  const fallbacks = { ru: ['ru', 'en', 'he'], en: ['en', 'he'], he: ['he'] };
  const data = JSON.parse(document.getElementById('lesson-language-data').textContent);
  const versions = data.versions;
  const location = new URL(window.location.href);
  const override = location.searchParams.get('lang');
  const explicit = Object.hasOwn(fallbacks, override) ? override : null;
  let preference = null;
  try { preference = window.localStorage.getItem(key); } catch (_) { /* Private browser mode. */ }
  if (!Object.hasOwn(fallbacks, preference)) preference = null;

  function resolve(language) {
    return (fallbacks[language] || []).find(candidate => versions[candidate]);
  }

  function navigate(language, manual) {
    const targetLanguage = resolve(language);
    if (!targetLanguage) return;
    const target = new URL(versions[targetLanguage], location.origin);
    target.search = location.search;
    target.hash = location.hash;
    // A selector change cancels a one-page override. In browsers that cannot
    // persist preference, keep the choice for this navigation via the URL.
    if (manual) {
      target.searchParams.delete('lang');
      try { window.localStorage.setItem(key, language); }
      catch (_) { target.searchParams.set('lang', language); }
    }
    if (target.href !== window.location.href) window.location.replace(target.href);
  }

  if (explicit || preference) navigate(explicit || preference, false);

  document.addEventListener('DOMContentLoaded', function () {
    const selector = document.getElementById('lesson-language-preference');
    if (selector) {
      selector.closest('li').hidden = false;
      selector.value = preference || data.language;
      selector.addEventListener('change', function () {
        preference = selector.value;
        // Store even on untranslated pages so later lessons can use the choice.
        try { window.localStorage.setItem(key, preference); } catch (_) { /* URL fallback below. */ }
        navigate(preference, true);
        showFallback();
      });
    }
    showFallback();
  });

  function showFallback() {
    const note = document.getElementById('lesson-language-fallback');
    const desired = explicit || preference;
    if (!note || !desired || !resolve(desired) || versions[desired]) {
      if (note) note.hidden = true;
      return;
    }
    const messages = {
      ru: 'Перевода на русский пока нет. Показана доступная версия: ' +
        (resolve(desired) === 'en' ? 'English.' : 'עברית.'),
      en: 'An English translation is not available yet. Showing עברית.'
    };
    note.textContent = messages[desired] || '';
    note.lang = desired;
    note.dir = desired === 'he' ? 'rtl' : 'ltr';
    note.hidden = !note.textContent;
  }
}());
