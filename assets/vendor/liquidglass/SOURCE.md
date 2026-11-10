# liquidglass (vendored)

Unmodified copies of `lib/liquid-glass.js` and `lib/components.js` from
<https://github.com/gentpan/liquidglass>, commit `068ad22` (2026-09-19).
MIT licensed; see `LICENSE` in this folder.

To update: copy both files from a newer commit, update the commit above, and re-check the
navigation bar and buttons in Chrome, Safari and Firefox.

`assets/js/site.js` also uses three internals of `<lg-navbar>` from this version (`moveTo()`,
`current`, `links`) to slide the highlight between pages. If an update renames them, the slide is
skipped (the code checks first) and the highlight simply starts on the current page.
