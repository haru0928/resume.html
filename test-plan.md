# Test Plan: Shared Utilities Refactoring

## What Changed
- Created `public/css/styles.css` (shared styling)
- Created `public/js/common.js` (renders navigation + footer on all pages)
- All 4 HTML pages now include these shared resources
- Sub-pages got proper HTML document structure

## Primary Flow: Verify Shared Navigation and Footer Render on All Pages

### Test 1: Index page loads with shared nav and footer
1. Open http://localhost:8080/index.html
2. **Assert**: A navigation bar is visible at the top with links: "Home", "About", "Hobbies", "Contact"
3. **Assert**: "Home" link has the `active` class (bold/dark text, not blue)
4. **Assert**: A footer reading "© Ricardo Escalante. All rights reserved." is visible at the bottom
5. **Assert**: CSS is applied — body has constrained max-width, sans-serif font, proper spacing

### Test 2: Sub-page (About) loads with shared nav and correct active state
1. Click the "About" link in the navigation bar
2. **Assert**: Page navigates to about.html
3. **Assert**: Navigation bar is present with the same 4 links
4. **Assert**: "About" link now has the `active` class (bold/dark text)
5. **Assert**: "Home" link is no longer active (shows as blue link)
6. **Assert**: Footer is present with same copyright text

### Test 3: Navigation works bidirectionally (sub-page back to home)
1. From the About page, click the "Home" link in the nav
2. **Assert**: Page navigates back to index.html
3. **Assert**: "Home" is active again, resume content is visible

### Test 4: Hobbies and Contact pages also have shared components
1. Navigate to Hobbies page via nav link
2. **Assert**: Nav bar present, "Hobbies" is the active link
3. **Assert**: Footer present
4. **Assert**: Page content shows "My Hobbies" heading with list items
5. Navigate to Contact page via nav link
6. **Assert**: Nav bar present, "Contact" is the active link
7. **Assert**: Footer present
8. **Assert**: Page content shows contact information (phone, email, address)

## Edge Case: Direct URL access (not via nav click)
1. Directly navigate to http://localhost:8080/public/contact.html
2. **Assert**: Nav and footer still render (common.js loads correctly via relative path)
3. **Assert**: CSS styling is applied (not unstyled raw HTML)
