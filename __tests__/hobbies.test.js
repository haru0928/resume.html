/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'hobbies.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('hobbies.html - Page Heading', () => {
  test('has a "My Hobbies" h1 heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('My Hobbies');
  });
});

describe('hobbies.html - Hobbies List', () => {
  test('uses an unordered list to display hobbies', () => {
    const ul = document.querySelector('ul');
    expect(ul).not.toBeNull();
  });

  test('lists at least three hobbies', () => {
    const items = document.querySelectorAll('ul li');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test('includes expected hobbies', () => {
    const items = document.querySelectorAll('ul li');
    const hobbies = Array.from(items).map(li => li.textContent.trim());
    expect(hobbies).toContain('Anime');
    expect(hobbies).toContain('Watching Movies');
    expect(hobbies).toContain('Video Games');
  });

  test('each hobby is a non-empty list item', () => {
    const items = document.querySelectorAll('ul li');
    items.forEach(item => {
      expect(item.textContent.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('hobbies.html - Content Structure', () => {
  test('heading appears before the list', () => {
    const h1 = document.querySelector('h1');
    const ul = document.querySelector('ul');
    expect(h1.compareDocumentPosition(ul) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  test('page contains only one heading', () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBe(1);
  });

  test('page contains only one list', () => {
    const lists = document.querySelectorAll('ul, ol');
    expect(lists.length).toBe(1);
  });
});
