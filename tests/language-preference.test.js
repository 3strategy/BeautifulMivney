const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, '../assets/js/language-preference.js'), 'utf8');
const all = { he: '/lesson/', en: '/en/lesson/', ru: '/ru/lesson/' };

function load({ preference = null, url = 'https://example.test/lesson/',
  versions = all, language = 'he', blocked = false } = {}) {
  const events = {};
  const redirects = [];
  const storage = new Map(preference ? [['lesson-language-preference', preference]] : []);
  const item = { hidden: true };
  const selector = { closest: () => item, addEventListener: (event, handler) => { selector[event] = handler; } };
  const note = { hidden: true };
  const elements = {
    'lesson-language-data': { textContent: JSON.stringify({ language, versions }) },
    'lesson-language-preference': selector,
    'lesson-language-fallback': note
  };
  vm.runInNewContext(script, {
    URL,
    window: {
      location: { href: url, replace: next => redirects.push(next) },
      localStorage: {
        getItem: key => { if (blocked) throw new Error('blocked'); return storage.get(key); },
        setItem: (key, value) => { if (blocked) throw new Error('blocked'); storage.set(key, value); }
      }
    },
    document: {
      getElementById: id => elements[id],
      addEventListener: (event, handler) => { events[event] = handler; }
    }
  });
  events.DOMContentLoaded();
  return { redirects, storage, selector, item, note };
}

test('Russian selects Russian, then English, then Hebrew', () => {
  for (const [versions, expected] of [[all, '/ru/lesson/'],
    [{ en: all.en, he: all.he }, all.en], [{ he: all.he }, all.he]]) {
    const result = load({ preference: 'ru', versions, url: 'https://example.test/entry/' });
    assert.deepEqual(result.redirects, [`https://example.test${expected}`]);
  }
});

test('English selects English then Hebrew, never Russian', () => {
  assert.deepEqual(load({ preference: 'en' }).redirects, ['https://example.test/en/lesson/']);
  assert.deepEqual(load({ preference: 'en', versions: { he: all.he } }).redirects, []);
  assert.deepEqual(load({ preference: 'en', versions: { ru: all.ru } }).redirects, []);
});

test('no saved preference, invalid preference, and unavailable versions preserve requested page', () => {
  assert.deepEqual(load().redirects, []);
  assert.deepEqual(load({ preference: 'unknown' }).redirects, []);
  assert.deepEqual(load({ preference: 'ru', versions: {} }).redirects, []);
});

test('one-page override preserves direct access without overwriting preference', () => {
  const result = load({ preference: 'ru', url: 'https://example.test/lesson/?lang=he' });
  assert.deepEqual(result.redirects, []);
  assert.equal(result.storage.get('lesson-language-preference'), 'ru');
});

test('redirect preserves query and fragment and becomes stable at its destination', () => {
  const options = { preference: 'ru', versions: { en: all.en, he: all.he },
    url: 'https://example.test/lesson/?exercise=3#question' };
  const result = load(options);
  assert.equal(result.redirects[0], 'https://example.test/en/lesson/?exercise=3#question');
  assert.deepEqual(load({ ...options, url: result.redirects[0] }).redirects, []);
  assert.equal(result.note.hidden, false);
  assert.match(result.note.textContent, /English/);
});

test('selector stores preference on untranslated pages', () => {
  const result = load({ versions: {} });
  result.selector.value = 'ru';
  result.selector.change();
  assert.equal(result.storage.get('lesson-language-preference'), 'ru');
  assert.equal(result.item.hidden, false);
  assert.deepEqual(result.redirects, []);
});

test('selector clears explicit override when changing preference', () => {
  const result = load({ url: 'https://example.test/lesson/?lang=he&exercise=2#start' });
  result.selector.value = 'ru';
  result.selector.change();
  assert.equal(result.storage.get('lesson-language-preference'), 'ru');
  assert.equal(result.redirects[0], 'https://example.test/ru/lesson/?exercise=2#start');
});

test('blocked storage still permits explicit links and a selector URL override', () => {
  const result = load({ blocked: true });
  result.selector.value = 'ru';
  result.selector.change();
  assert.equal(result.redirects[0], 'https://example.test/ru/lesson/?lang=ru');
  assert.deepEqual(load({ blocked: true, language: 'ru',
    url: result.redirects[0] }).redirects, []);
});

test('baseurl in generated version paths survives routing', () => {
  assert.deepEqual(load({ preference: 'ru', versions: { he: '/school/lesson/', ru: '/school/ru/lesson/' },
    url: 'https://example.test/school/lesson/' }).redirects, ['https://example.test/school/ru/lesson/']);
});
