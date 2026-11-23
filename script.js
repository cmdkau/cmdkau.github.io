document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.documentElement.dataset.theme = "light";

function updateThemeToggle() {
    const isLight = document.documentElement.dataset.theme === "light";
    const label = isLight ? "Switch to dark mode" : "Switch to light mode";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
    themeToggle.querySelector("i").className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

updateThemeToggle();
themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme === "light";
    document.documentElement.dataset.theme = isLight ? "dark" : "light";
    localStorage.setItem("theme", isLight ? "dark" : "light");
    updateThemeToggle();
});

const heroTitle = document.querySelector(".hero-title");
const cypherCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    const parts = [];
    const walker = document.createTreeWalker(heroTitle, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
        if (!node.textContent.trim()) return;
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        [...text].forEach(character => {
            const span = document.createElement("span");
            span.className = "cypher-character";
            span.textContent = character;
            fragment.appendChild(span);
            if (character.trim()) parts.push({ span, character });
        });
        node.replaceWith(fragment);
    });

    const duration = 1200;
    const start = performance.now();
    function resolveFrame(now) {
        if (now < start) {
            requestAnimationFrame(resolveFrame);
            return;
        }
        const progress = Math.min(1, (now - start) / duration);
        const revealCount = Math.floor(progress * parts.length);
        parts.forEach((part, index) => {
            part.span.textContent = index < revealCount
                ? part.character
                : cypherCharacters[Math.floor(Math.random() * cypherCharacters.length)];
        });
        if (progress < 1) requestAnimationFrame(resolveFrame);
        else parts.forEach(part => { part.span.textContent = part.character; });
    }
    requestAnimationFrame(resolveFrame);
}

const focusSections = document.querySelectorAll("#skills, #projects");
const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelector(".section-title").classList.add("lens-focus-active");
        headingObserver.unobserve(entry.target);
    });
}, { threshold: 0.15 });
focusSections.forEach(section => headingObserver.observe(section));

if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll(
        ".availability, .hero-content > p, .hero-buttons, .section-label, " +
        ".section-description, .skill-card, .project-card, .contact-box, footer .footer-content"
    );
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("scroll-reveal-visible");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => {
        element.classList.add("scroll-reveal");
        revealObserver.observe(element);
    });
}
