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
    expect(title.textContent).toBe('My Resume');
  });

  test('has a body element', () => {
    expect(document.body).not.toBeNull();
  });
});

describe('index.html - Header and Name', () => {
  test('displays the name as an h1 heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Ricardo Escalante');
  });
});

describe('index.html - Summary Section', () => {
  test('has a Summary heading', () => {
    const headings = document.querySelectorAll('h2');
    const summaryHeading = Array.from(headings).find(h => h.textContent === 'Summary');
    expect(summaryHeading).toBeDefined();
  });

  test('has a summary paragraph', () => {
    const headings = document.querySelectorAll('h2');
    const summaryHeading = Array.from(headings).find(h => h.textContent === 'Summary');
    const nextSibling = summaryHeading.nextElementSibling;
    expect(nextSibling.tagName).toBe('P');
    expect(nextSibling.textContent).toContain('Software Engineer');
  });
});

describe('index.html - Education Section', () => {
  test('has an Education heading', () => {
    const headings = document.querySelectorAll('h2');
    const educationHeading = Array.from(headings).find(h => h.textContent === 'Education');
    expect(educationHeading).toBeDefined();
  });

  test('lists education entries in a ul', () => {
    const headings = document.querySelectorAll('h2');
    const educationHeading = Array.from(headings).find(h => h.textContent === 'Education');
    const list = educationHeading.nextElementSibling;
    expect(list.tagName).toBe('UL');
    const items = list.querySelectorAll('li');
    expect(items.length).toBeGreaterThanOrEqual(1);
  });

  test('includes Los Angeles Film School entry', () => {
    const items = document.querySelectorAll('ul li');
    const filmSchool = Array.from(items).find(li =>
      li.textContent.includes('Los Angeles Film School')
    );
    expect(filmSchool).toBeDefined();
    expect(filmSchool.textContent).toContain('Audio Production');
  });
});

describe('index.html - Work Experience Section', () => {
  test('has a Work Experience heading', () => {
    const headings = document.querySelectorAll('h2');
    const workHeading = Array.from(headings).find(h => h.textContent === 'Work Experience');
    expect(workHeading).toBeDefined();
  });

  test('lists at least two job entries', () => {
    const h3s = document.querySelectorAll('h3');
    const jobH3s = Array.from(h3s).filter(h =>
      h.textContent.includes('Panda Express') || h.textContent.includes('Audio Engineer')
    );
    expect(jobH3s.length).toBeGreaterThanOrEqual(2);
  });

  test('includes Panda Express role', () => {
    const h3s = document.querySelectorAll('h3');
    const panda = Array.from(h3s).find(h => h.textContent.includes('Panda Express'));
    expect(panda).toBeDefined();
    expect(panda.textContent).toContain('Shift Leader');
  });

  test('includes Audio Engineer role', () => {
    const h3s = document.querySelectorAll('h3');
    const audio = Array.from(h3s).find(h => h.textContent.includes('Audio Engineer'));
    expect(audio).toBeDefined();
  });

  test('each job has a list of responsibilities', () => {
    const h3s = document.querySelectorAll('h3');
    const jobH3s = Array.from(h3s).filter(h =>
      h.textContent.includes('Panda Express') || h.textContent.includes('Audio Engineer')
    );
    jobH3s.forEach(h3 => {
      const parentLi = h3.closest('li');
      expect(parentLi).not.toBeNull();
      const nestedUl = parentLi.querySelector('ul');
      expect(nestedUl).not.toBeNull();
      expect(nestedUl.querySelectorAll('li').length).toBeGreaterThanOrEqual(2);
    });
  });

  test('each job has a date range', () => {
    const h3s = document.querySelectorAll('h3');
    const jobH3s = Array.from(h3s).filter(h =>
      h.textContent.includes('Panda Express') || h.textContent.includes('Audio Engineer')
    );
    jobH3s.forEach(h3 => {
      const parentLi = h3.closest('li');
      const dateParagraph = parentLi.querySelector('p');
      expect(dateParagraph).not.toBeNull();
      expect(dateParagraph.textContent).toMatch(/\d{4}/);
    });
  });
});

describe('index.html - Skills Section', () => {
  test('has a Skills heading', () => {
    const headings = document.querySelectorAll('h2');
    const skillsHeading = Array.from(headings).find(h => h.textContent === 'Skills');
    expect(skillsHeading).toBeDefined();
  });

  test('lists at least three skills', () => {
    const headings = document.querySelectorAll('h2');
    const skillsHeading = Array.from(headings).find(h => h.textContent === 'Skills');
    let sibling = skillsHeading.nextElementSibling;
    while (sibling && sibling.tagName !== 'UL') {
      sibling = sibling.nextElementSibling;
    }
    expect(sibling).not.toBeNull();
    const items = sibling.querySelectorAll('li');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test('includes expected skills', () => {
    const body = document.body.textContent;
    expect(body).toContain('Customer Service');
    expect(body).toContain('Microsoft Office');
    expect(body).toContain('Detail Oriented');
  });
});

describe('index.html - Navigation Links', () => {
  test('has a link to the contact page', () => {
    const links = document.querySelectorAll('a');
    const contactLink = Array.from(links).find(a => a.getAttribute('href').includes('contact'));
    expect(contactLink).toBeDefined();
    expect(contactLink.getAttribute('href')).toBe('./public/contact.html');
    expect(contactLink.textContent).toContain('Contact');
  });

  test('has a link to the hobbies page', () => {
    const links = document.querySelectorAll('a');
    const hobbiesLink = Array.from(links).find(a => a.getAttribute('href').includes('hobbies'));
    expect(hobbiesLink).toBeDefined();
    expect(hobbiesLink.getAttribute('href')).toBe('./public/hobbies.html');
    expect(hobbiesLink.textContent).toContain('Hobbies');
  });

  test('navigation links are inside list items', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      expect(link.closest('li')).not.toBeNull();
    });
  });
});

describe('index.html - Section Separators', () => {
  test('uses horizontal rules between sections', () => {
    const hrs = document.querySelectorAll('hr');
    expect(hrs.length).toBeGreaterThanOrEqual(3);
  });
});

describe('index.html - Footer', () => {
  test('has a footer element', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  });

  test('footer contains copyright text', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Ricardo Escalante');
    expect(footer.textContent).toContain('All rights reserved');
  });
});

describe('index.html - Section Ordering', () => {
  test('sections appear in expected order: Summary, Education, Work Experience, Skills', () => {
    const h2s = document.querySelectorAll('h2');
    const sectionNames = Array.from(h2s).map(h => h.textContent.trim());
    expect(sectionNames).toEqual(['Summary', 'Education', 'Work Experience', 'Skills']);
  });
});
