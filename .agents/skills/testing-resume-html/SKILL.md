---
name: testing-resume-html
description: Test the resume.html static site end-to-end. Use when verifying HTML content changes, navigation, or PII/security fixes.
---

# Testing resume.html

## Overview
This is a purely static HTML resume site with no backend, no JS, no dependencies. Testing involves serving the files locally and verifying content in a browser.

## Local Dev Setup
```bash
cd /home/ubuntu/repos/resume.html
python3 -m http.server 8080 &
```
Then open `http://localhost:8080/index.html` in Chrome.

## Site Structure
- `index.html` — Main resume page with links to sub-pages
- `public/contact.html` — Contact info page
- `public/about.html` — About me page
- `public/hobbies.html` — Hobbies list
- Navigation: index.html links to `./public/contact.html` and `./public/hobbies.html`; sub-pages link back via `../index.html`

## Testing Approach
1. Serve files with `python3 -m http.server` from the repo root
2. Open pages in Chrome and visually verify content
3. Check navigation links between pages
4. For security/PII changes: verify sensitive data is NOT visible on the page and check the DOM for hidden elements

## Common Pitfalls
- Sub-pages might lack proper HTML document structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` tags) — this can vary depending on which PRs have been merged
- No CI is configured on this repo, so all verification is manual
- No package manager or build step — just static HTML files

## Devin Secrets Needed
None — this is a public static site with no authentication or API keys required.
