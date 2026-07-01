/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function readPage(relativePath) {
  const html = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
  return new DOMParser().parseFromString(html, 'text/html');
}

describe('Cross-page navigation and file integrity', () => {
  test('all linked HTML files from index.html exist on disk', () => {
    const doc = readPage('index.html');
    const links = doc.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
      const resolved = path.resolve(ROOT, href);
      expect(fs.existsSync(resolved)).toBe(true);
    });
  });

  test('all HTML files in public/ directory are parseable', () => {
    const publicDir = path.join(ROOT, 'public');
    const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
    expect(files.length).toBeGreaterThanOrEqual(1);
    files.forEach(file => {
      const html = fs.readFileSync(path.join(publicDir, file), 'utf8');
      const doc = new DOMParser().parseFromString(html, 'text/html');
      expect(doc.body).not.toBeNull();
    });
  });

  test('every page has at least one heading', () => {
    const pages = [
      'index.html',
      'public/contact.html',
      'public/hobbies.html',
      'public/about.html',
    ];
    pages.forEach(page => {
      const doc = readPage(page);
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThanOrEqual(1);
    });
  });

  test('every page has non-empty body content', () => {
    const pages = [
      'index.html',
      'public/contact.html',
      'public/hobbies.html',
      'public/about.html',
    ];
    pages.forEach(page => {
      const doc = readPage(page);
      expect(doc.body.textContent.trim().length).toBeGreaterThan(0);
    });
  });
});
