/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'about.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('about.html - Document Structure', () => {
  test('has lang attribute and meta tags', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.querySelector('meta[charset]')).not.toBeNull();
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
  });

  test('has a title', () => {
    const title = document.querySelector('title');
    expect(title.textContent).toContain('About');
  });
});

describe('about.html - Navigation', () => {
  test('has navigation with About marked active', () => {
    const activeLink = document.querySelector('.nav-links a.active');
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent).toBe('About');
  });
});

describe('about.html - Page Header', () => {
  test('has a page header', () => {
    const header = document.querySelector('.page-header');
    expect(header).not.toBeNull();
    const h1 = header.querySelector('h1');
    expect(h1.textContent).toContain('Imphal');
  });
});

describe('about.html - Bio Section', () => {
  test('has biography paragraphs', () => {
    const bioPs = document.querySelectorAll('.about-bio p');
    expect(bioPs.length).toBeGreaterThanOrEqual(2);
  });

  test('has a quote', () => {
    const quote = document.querySelector('.quote');
    expect(quote).not.toBeNull();
    expect(quote.textContent).toContain('good drawing');
  });
});

describe('about.html - Credentials', () => {
  test('has credentials section', () => {
    const creds = document.querySelector('.credentials');
    expect(creds).not.toBeNull();
  });

  test('lists education', () => {
    const body = document.body.textContent;
    expect(body).toContain('Royal School of Architecture');
    expect(body).toContain('Gauhati University');
  });

  test('lists skills', () => {
    const body = document.body.textContent;
    expect(body).toContain('Photoshop');
    expect(body).toContain('AutoCAD');
    expect(body).toContain('SketchUp');
    expect(body).toContain('Lumion');
  });
});

describe('about.html - Footer', () => {
  test('has a footer with contact info', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('chanusweta57@gmail.com');
  });

  test('has social links', () => {
    const links = document.querySelectorAll('footer a');
    const fb = Array.from(links).find(a => a.getAttribute('href').includes('facebook'));
    const ig = Array.from(links).find(a => a.getAttribute('href').includes('instagram'));
    expect(fb).toBeDefined();
    expect(ig).toBeDefined();
  });
});
