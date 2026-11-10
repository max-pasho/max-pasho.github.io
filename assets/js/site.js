// Progressive enhancement: the site works without this file.
// It loads the vendored liquid-glass components, which upgrade:
//   - <lg-navbar> in the floating navigation (its links are ordinary <a> elements either way)
//   - every <a class="glass-btn" data-glass="…"> into an <lg-button> with the same link and label
// If the import fails (old browser, blocked script), the plain links stay as they are.

const ENGINE = "../vendor/liquidglass/components.js";
const root = document.documentElement;

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

// Page transitions, part 1: when leaving for another page on this site, remember which nav item
// was current here, so the next page can slide its glass highlight from it.
function currentNavIndex() {
  const links = [...document.querySelectorAll(".site-nav lg-navbar > a")];
  return links.findIndex((a) => a.getAttribute("aria-current") === "page");
}

document.addEventListener("click", (e) => {
  const a = e.target.closest?.("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (a.target && a.target !== "_self") return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname === location.pathname) return;
  const i = currentNavIndex();
  try {
    if (i >= 0) sessionStorage.setItem("navFrom", String(i));
    else sessionStorage.removeItem("navFrom");
  } catch {
    /* Storage unavailable: the highlight simply starts on the current page. */
  }
}, true); // capture phase: runs before the nav bar marks the clicked link as current

// Page transitions, part 2: start the highlight on the previous page's item, then let it spring
// to this page's item. Runs in the same task as the upgrade, so no frame shows it in between.
function slideFromPreviousPage() {
  const from = Number(root.dataset.navFrom);
  delete root.dataset.navFrom;
  const nav = document.querySelector(".site-nav lg-navbar");
  if (!nav || Number.isNaN(from) || typeof nav.moveTo !== "function") return;
  if (from === nav.current || !nav.links?.[from]) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  nav.moveTo(from, true);
  // Wait two frames: on its first frame the nav bar's resize observer re-places the highlight
  // instantly at its target; start the spring after that.
  requestAnimationFrame(() => requestAnimationFrame(() => nav.moveTo(nav.current)));
}

if ("customElements" in window) {
  import(ENGINE)
    .then(() => {
      upgradeButtons();
      slideFromPreviousPage();
      root.classList.add("lg-ready");
    })
    .catch(() => {
      delete root.dataset.navFrom; // keep the plain nav on the current page
    });
} else {
  delete root.dataset.navFrom;
}
