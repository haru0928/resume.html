/* ==========================================================================
   Shared Utilities - Resume Site
   Renders navigation and footer on every page to avoid duplication.
   ========================================================================== */

/**
 * Navigation links shared across all pages.
 * Each entry has a label, href (relative to repo root), and an id used
 * to mark the active page.
 */
const NAV_LINKS = [
    { label: "Home", href: "/index.html", id: "home" },
    { label: "About", href: "/public/about.html", id: "about" },
    { label: "Hobbies", href: "/public/hobbies.html", id: "hobbies" },
    { label: "Contact", href: "/public/contact.html", id: "contact" },
];

/**
 * Determines the base path prefix so links work whether opened from
 * the repo root or from the /public/ subdirectory.
 */
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/public/")) {
        return "..";
    }
    return ".";
}

/**
 * Detects which page is currently active based on the URL.
 */
function getActivePageId() {
    const path = window.location.pathname;
    if (path.endsWith("about.html")) return "about";
    if (path.endsWith("hobbies.html")) return "hobbies";
    if (path.endsWith("contact.html")) return "contact";
    return "home";
}

/**
 * Renders the site-wide navigation bar.
 * Inserts it as the first child of <body>.
 */
function renderNavigation() {
    const basePath = getBasePath();
    const activeId = getActivePageId();

    const nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.setAttribute("aria-label", "Main navigation");

    const ul = document.createElement("ul");

    NAV_LINKS.forEach(function (link) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = link.label;
        a.href = basePath + link.href.replace(/^\./, "");
        if (link.id === activeId) {
            a.className = "active";
            a.setAttribute("aria-current", "page");
        }
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    document.body.insertBefore(nav, document.body.firstChild);
}

/**
 * Renders the site-wide footer.
 * Appends it as the last child of <body>.
 */
function renderFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.textContent = "\u00A9 Ricardo Escalante. All rights reserved.";
    document.body.appendChild(footer);
}

/**
 * Initializes shared components.
 * Call this at the end of every page or via DOMContentLoaded.
 */
function initCommon() {
    renderNavigation();
    renderFooter();
}

document.addEventListener("DOMContentLoaded", initCommon);
