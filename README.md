# Alida Horsley — Portfolio

Jekyll site, built for GitHub Pages.

## Local development

Requires Ruby + Bundler.

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Structure

- `_layouts/default.html` — shared page shell
- `_includes/header.html`, `_includes/footer.html` — nav and footer, reused on every page
- `_sass/` — design tokens (`_tokens.scss`), base styles, layout primitives, and one file per reusable component (`_sass/components/`)
- `assets/css/main.scss` — imports the partials above; Jekyll compiles it to `assets/css/main.css`
- `assets/images/`, `assets/fonts/` — self-hosted assets (Inter font, photos, icons)
