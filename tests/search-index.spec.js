const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const corpusPath = path.join(__dirname, '..', '_site', 'assets', 'data', 'searchcorpus.json');

function loadSearchCorpus() {
  const raw = fs.readFileSync(corpusPath, 'utf8');
  return JSON.parse(raw);
}

test.describe('search corpus menu links', () => {
  test('indexes non-markdown menu links by menu title', () => {
    const corpus = loadSearchCorpus();
    const byTitle = new Map(corpus.map((item) => [item.title, item]));

    const arielTracking = byTitle.get('מעקב אריאל על דיתה');
    expect(arielTracking).toBeTruthy();
    expect(arielTracking.url).toContain('https://www.youtube.com/watch?v=gqc_WCIRO5I');
    expect(arielTracking.url).toContain('index=15');

    expect(corpus).toContainEqual(expect.objectContaining({
      title: 'משחק לימוד OOP',
      url: '/oop/GeminiArtifacts/oop_learning_game.html',
    }));

    expect(corpus).toContainEqual(expect.objectContaining({
      title: 'מעקב עצמים דיתה',
      url: '/oop/ExByOthers/DitaOOPTrackingObjects.pdf',
    }));
  });

  test('excludes protected and noindex pages', () => {
    const corpus = loadSearchCorpus();

    expect(corpus).not.toContainEqual(expect.objectContaining({
      url: '/cs3e/tests/Test1.7.26/',
    }));

    expect(corpus).not.toContainEqual(expect.objectContaining({
      url: '/teacher-only/cs3e/tests/Test1.7.26/',
    }));
  });
});

test('the Android topic map search result selects the Android menu', () => {
  const corpus = loadSearchCorpus();
  const results = corpus.filter(item => item.title === 'מפת נושאים באנדרואיד');
  expect(results).toHaveLength(1);
  expect(results[0].url).toBe('/android/topics-index/?menu=android');
  expect(corpus).toContainEqual(expect.objectContaining({
    url: '/agentic/02-git-github/',
  }));
});
