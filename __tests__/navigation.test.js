/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

describe('Cross-page link integrity', () => {
  const pages = ['index.html', 'works.html', 'about.html'];

  pages.forEach(page => {
    test(`all internal links in ${page} point to existing files`, () => {
      const html = fs.readFileSync(path.resolve(ROOT, page), 'utf8');
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a[href]');

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        const resolved = href.replace(/^\.\//, '');
        const filePath = path.resolve(ROOT, resolved);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  test('navigation links are consistent across all pages', () => {
    const navHrefs = pages.map(page => {
      const html = fs.readFileSync(path.resolve(ROOT, page), 'utf8');
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const navLinks = doc.querySelector('.nav-links');
      return Array.from(navLinks.querySelectorAll('a')).map(a => a.getAttribute('href'));
    });

    expect(navHrefs[0]).toEqual(navHrefs[1]);
    expect(navHrefs[1]).toEqual(navHrefs[2]);
  });
});
