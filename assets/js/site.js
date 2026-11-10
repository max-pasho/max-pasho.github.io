// Progressive enhancement: the site works without this file.
// It loads the vendored liquid-glass components, which upgrade:
//   - <lg-navbar> in the floating navigation (its links are ordinary <a> elements either way)
//   - every <a class="glass-btn" data-glass="…"> into an <lg-button> with the same link and label
// If the import fails (old browser, blocked script), the plain links stay as they are.

const ENGINE = "../vendor/liquidglass/components.js";

function upgradeButtons() {
  for (const a of document.querySelectorAll("a.glass-btn[data-glass]")) {
    const b = document.createElement("lg-button");
    b.setAttribute("href", a.getAttribute("href"));
    if (a.dataset.glass && a.dataset.glass !== "plain") b.setAttribute("tone", a.dataset.glass);
    const label = a.getAttribute("aria-label");
    if (label) b.setAttribute("aria-label", label);
    b.append(...a.childNodes);
    a.replaceWith(b);
  }
}

if ("customElements" in window) {
  import(ENGINE)
    .then(() => {
      upgradeButtons();
      document.documentElement.classList.add("lg-ready");
    })
    .catch(() => {
      /* Keep the plain links. */
    });
}
