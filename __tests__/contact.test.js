/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'contact.html'), 'utf8');
  document = new DOMParser().parseFromString(html, 'text/html');
});

describe('contact.html - Page Heading', () => {
  test('has a "Contact Me" h1 heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Contact Me');
  });
});

describe('contact.html - Phone Number', () => {
  test('displays a phone number', () => {
    const body = document.body.textContent;
    expect(body).toMatch(/Tel:/);
    expect(body).toMatch(/\+?\d[\d\s-]{8,}/);
  });

  test('phone number is inside a paragraph', () => {
    const paragraphs = document.querySelectorAll('p');
    const telParagraph = Array.from(paragraphs).find(p => p.textContent.includes('Tel:'));
    expect(telParagraph).toBeDefined();
  });
});

describe('contact.html - Email', () => {
  test('displays an email address', () => {
    const body = document.body.textContent;
    expect(body).toMatch(/Email:/);
    expect(body).toMatch(/[\w.]+@[\w.]+/);
  });

  test('email is inside a paragraph', () => {
    const paragraphs = document.querySelectorAll('p');
    const emailParagraph = Array.from(paragraphs).find(p => p.textContent.includes('Email:'));
    expect(emailParagraph).toBeDefined();
  });
});

describe('contact.html - Address', () => {
  test('displays an address label', () => {
    const body = document.body.textContent;
    expect(body).toMatch(/Address:/);
  });

  test('address contains city and country', () => {
    const body = document.body.textContent;
    expect(body).toContain('Los Angeles');
    expect(body).toContain('USA');
  });

  test('address uses br tags for line breaks', () => {
    const brs = document.querySelectorAll('br');
    expect(brs.length).toBeGreaterThanOrEqual(2);
  });
});

describe('contact.html - Content Structure', () => {
  test('has multiple paragraph elements for different contact info', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  test('contact info appears in order: phone, email, address', () => {
    const paragraphs = document.querySelectorAll('p');
    const texts = Array.from(paragraphs).map(p => p.textContent.trim());
    const telIndex = texts.findIndex(t => t.includes('Tel:'));
    const emailIndex = texts.findIndex(t => t.includes('Email:'));
    const addressIndex = texts.findIndex(t => t.includes('Address:'));
    expect(telIndex).toBeLessThan(emailIndex);
    expect(emailIndex).toBeLessThan(addressIndex);
  });
});
