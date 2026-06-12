(function () {
  const pages = [
    { id: "home", title: "Home", href: "index.html" },
    { id: "local", title: "Local Hives", href: "local-hives.html" },
    { id: "lab", title: "Island Lab", href: "island-lab.html" },
    { id: "biosecurity", title: "Biosecurity", href: "biosecurity.html" },
    { id: "research", title: "Research", href: "research.html" },
    { id: "partners", title: "Partners", href: "partners.html" },
    { id: "institute", title: "Institute", href: "institute.html" },
    { id: "sources", title: "Sources", href: "sources.html" }
  ];

  const pageId = document.body.dataset.page || "home";
  const currentIndex = Math.max(0, pages.findIndex((page) => page.id === pageId));
  const currentPage = pages[currentIndex] || pages[0];

  renderHeader();
  renderFooter();
  renderSequenceNav();
  enhanceBackToTop();

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    const links = pages
      .map((page) => {
        const active = page.id === pageId ? ' aria-current="page"' : "";
        return `<a href="${page.href}"${active}>${page.title}</a>`;
      })
      .join("");

    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <nav class="site-nav" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="Bees and Allies home">
          <span>Bees & Allies</span>
          <strong>Community Bee Resilience</strong>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
        <div class="nav-links" id="primary-nav">${links}</div>
      </nav>
    `;

    const button = header.querySelector(".nav-toggle");
    const navLinks = header.querySelector(".nav-links");
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("is-open", !open);
    });
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <p class="footer-title">Bees & Allies</p>
          <p>A question-led public site for beekeepers, neighbours, researchers and civic allies exploring community bee resilience without pretending the hard parts are already solved.</p>
        </div>
        <nav aria-label="Footer links">
          <a href="sources.html">Sources</a>
          <a href="biosecurity.html">Careful biosecurity</a>
          <a href="partners.html">Partner questions</a>
          <a href="https://auraofintelligence.github.io/bees-and-allies/" target="_blank" rel="noopener noreferrer">Live site</a>
          <a href="https://github.com/auraofintelligence/bees-and-allies" target="_blank" rel="noopener noreferrer">Public source</a>
        </nav>
      </div>
    `;
  }

  function renderSequenceNav() {
    const mount = document.querySelector("[data-sequence-nav]");
    if (!mount) return;

    const previous = pages[currentIndex - 1];
    const next = pages[currentIndex + 1];
    const previousLink = previous
      ? `<a class="sequence-link" href="${previous.href}"><span>Previous</span><strong>${previous.title}</strong></a>`
      : `<span class="sequence-link disabled"><span>Previous</span><strong>Start</strong></span>`;
    const nextLink = next
      ? `<a class="sequence-link next" href="${next.href}"><span>Next</span><strong>${next.title}</strong></a>`
      : `<span class="sequence-link disabled next"><span>Next</span><strong>End</strong></span>`;

    mount.innerHTML = `
      <nav class="sequence-nav" aria-label="Page sequence">
        ${previousLink}
        <a class="sequence-home" href="index.html">Home</a>
        ${nextLink}
      </nav>
    `;
  }

  function enhanceBackToTop() {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.textContent = "Top";
    button.setAttribute("aria-label", "Back to top");
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(button);

    const update = () => button.classList.toggle("is-visible", window.scrollY > 420);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.title = currentPage.id === "home"
    ? "Bees & Allies"
    : `${currentPage.title} | Bees & Allies`;
})();
