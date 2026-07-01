/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'about.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('about.html - Page Heading', () => {
  test('has an "About Me" h1 heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('About Me');
  });
});

describe('about.html - Content Paragraphs', () => {
  test('has at least three paragraphs of content', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  test('each paragraph has substantial content (more than 50 characters)', () => {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      expect(p.textContent.trim().length).toBeGreaterThan(50);
    });
  });

  test('paragraphs contain lorem ipsum placeholder text', () => {
    const firstParagraph = document.querySelector('p');
    expect(firstParagraph.textContent).toContain('Lorem ipsum');
  });
});

describe('about.html - Content Structure', () => {
  test('heading appears before paragraphs', () => {
    const h1 = document.querySelector('h1');
    const firstP = document.querySelector('p');
    expect(h1.compareDocumentPosition(firstP) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  test('page contains exactly one heading', () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBe(1);
  });

  test('does not contain any lists', () => {
    const lists = document.querySelectorAll('ul, ol');
    expect(lists.length).toBe(0);
  });

  test('does not contain any links', () => {
    const links = document.querySelectorAll('a');
    expect(links.length).toBe(0);
  });
});

describe('about.html - Text Quality', () => {
  test('paragraphs are non-empty and unique', () => {
    const paragraphs = document.querySelectorAll('p');
    const texts = Array.from(paragraphs).map(p => p.textContent.trim());
    const uniqueTexts = new Set(texts);
    expect(uniqueTexts.size).toBe(texts.length);
  });

  test('total content length is reasonable', () => {
    const body = document.body.textContent;
    expect(body.length).toBeGreaterThan(200);
  });
});
