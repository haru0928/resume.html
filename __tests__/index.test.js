/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('index.html - Document Structure', () => {
  test('has a valid DOCTYPE and html element with lang attribute', () => {
    expect(document.documentElement).not.toBeNull();
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('has a head element with required meta tags', () => {
    const head = document.querySelector('head');
    expect(head).not.toBeNull();

    const charset = head.querySelector('meta[charset]');
    expect(charset).not.toBeNull();
    expect(charset.getAttribute('charset')).toBe('UTF-8');

    const viewport = head.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('has a title element with content', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('Sweta Irom');
  });
});

describe('index.html - Navigation', () => {
  test('has a fixed header with navigation links', () => {
    const header = document.querySelector('header.nav');
    expect(header).not.toBeNull();
  });

  test('has links to Home, Works, and About', () => {
    const navLinks = document.querySelector('.nav-links');
    expect(navLinks).not.toBeNull();
    const links = navLinks.querySelectorAll('a');
    const hrefs = Array.from(links).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('./index.html');
    expect(hrefs).toContain('./works.html');
    expect(hrefs).toContain('./about.html');
  });

  test('has a theme toggle button', () => {
    const toggle = document.getElementById('themeToggle');
    expect(toggle).not.toBeNull();
  });

  test('has a mobile menu', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    expect(mobileMenu).not.toBeNull();
  });
});

describe('index.html - Hero Section', () => {
  test('displays the name as an h1', () => {
    const h1 = document.querySelector('h1.name');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Sweta');
    expect(h1.textContent).toContain('Irom');
  });

  test('has a hero subtitle', () => {
    const sub = document.querySelector('.hero-sub');
    expect(sub).not.toBeNull();
    expect(sub.textContent).toContain('Architecture');
  });

  test('has CTA buttons', () => {
    const ctas = document.querySelectorAll('.cta-btn');
    expect(ctas.length).toBeGreaterThanOrEqual(2);
  });

  test('has a contour canvas background', () => {
    const canvas = document.getElementById('contour');
    expect(canvas).not.toBeNull();
  });
});

describe('index.html - Services Section', () => {
  test('has services strip with 3 service cells', () => {
    const cells = document.querySelectorAll('.service-cell');
    expect(cells.length).toBe(3);
  });

  test('services include drafting and visualization', () => {
    const body = document.body.textContent;
    expect(body).toContain('2D Drafting');
    expect(body).toContain('3D Visualization');
  });
});

describe('index.html - Featured Works', () => {
  test('has featured work cards', () => {
    const cards = document.querySelectorAll('.featured-card');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  test('has link to full works page', () => {
    const links = document.querySelectorAll('a');
    const worksLink = Array.from(links).find(a =>
      a.getAttribute('href') === './works.html' && a.textContent.includes('all works')
    );
    expect(worksLink).toBeDefined();
  });
});

describe('index.html - Footer', () => {
  test('has a footer element', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  });

  test('footer contains contact email', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('chanusweta57@gmail.com');
  });

  test('footer contains copyright', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Sweta Irom');
  });
});
