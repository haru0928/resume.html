/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'works.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('works.html - Document Structure', () => {
  test('has lang attribute and meta tags', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.querySelector('meta[charset]')).not.toBeNull();
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
  });

  test('has a title', () => {
    const title = document.querySelector('title');
    expect(title.textContent).toContain('Works');
  });
});

describe('works.html - Navigation', () => {
  test('has navigation with Works marked active', () => {
    const activeLink = document.querySelector('.nav-links a.active');
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent).toBe('Works');
  });
});

describe('works.html - Page Header', () => {
  test('has a page header with title', () => {
    const header = document.querySelector('.page-header');
    expect(header).not.toBeNull();
    const h1 = header.querySelector('h1');
    expect(h1.textContent).toContain('Fieldwork');
  });
});

describe('works.html - Works Grid', () => {
  test('has 6 work cards', () => {
    const cards = document.querySelectorAll('.work-card');
    expect(cards.length).toBe(6);
  });

  test('each card has a name and location', () => {
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
      expect(card.querySelector('.work-name')).not.toBeNull();
      expect(card.querySelector('.work-loc')).not.toBeNull();
    });
  });

  test('includes Poa Mecca entry', () => {
    const names = document.querySelectorAll('.work-name');
    const poa = Array.from(names).find(n => n.textContent.includes('Poa Mecca'));
    expect(poa).toBeDefined();
  });
});

describe('works.html - Approach Section', () => {
  test('has 3 approach items', () => {
    const items = document.querySelectorAll('.approach-item');
    expect(items.length).toBe(3);
  });
});

describe('works.html - Toolset Section', () => {
  test('has 4 material/tool items', () => {
    const items = document.querySelectorAll('.material');
    expect(items.length).toBe(4);
  });

  test('includes AutoCAD and SketchUp', () => {
    const body = document.body.textContent;
    expect(body).toContain('AutoCAD');
    expect(body).toContain('SketchUp');
  });
});

describe('works.html - Footer', () => {
  test('has a footer with contact info', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('chanusweta57@gmail.com');
  });
});
