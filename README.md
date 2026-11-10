# max-pasho.github.io

Personal site and project pages, served by GitHub Pages at <https://max-pasho.github.io>.

Plain HTML and CSS: no build step, no dependencies.

## Layout

```text
index.html              Home page: intro + project tiles
404.html                Not-found page
projects/grid/          GRID project page (styled to match the app)
assets/css/site.css     Main site style (clean, light/dark following the system)
assets/css/grid.css     GRID page style (GRID's own design tokens and themes)
assets/js/grid.js       GRID page theme switch (Legacy / Ares / ENCOM)
assets/img/             Favicon and images (GRID screenshots in assets/img/grid/)
.nojekyll               Serve files as-is (skip Jekyll)
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Adding a project

1. Create `projects/<name>/index.html`. Start from `404.html` for the clean site style, or give the page its own stylesheet like GRID.
2. Put its images in `assets/img/<name>/` (WebP at 1600 px and 960 px wide keeps pages fast).
3. Add a tile for it in the `.tiles` grid in `index.html`. Remove the `static` class from a tile once it links to a page.

Use `projects/<name>/` rather than `/<name>/`: a repository with GitHub Pages turned on is served at `max-pasho.github.io/<repo>/`, which would clash with a page at the same path.

## Publishing

GitHub Pages publishes from the branch set in **Settings › Pages** (normally `main`, folder `/`).
