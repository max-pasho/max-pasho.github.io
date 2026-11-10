// GRID page: Legacy / Ares / ENCOM theme switch, like the app's.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-theme]");

  function current() {
    return root.dataset.theme || "legacy";
  }

  function sync() {
    var t = current();
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setTheme === t));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg0").trim());
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.dataset.setTheme;
      if (t === "legacy") delete root.dataset.theme;
      else root.dataset.theme = t;
      try { localStorage.setItem("grid-theme", t); } catch (e) {}
      sync();
    });
  });

  sync();
})();
