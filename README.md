# Alida Horsley — Portfolio

Plain HTML/CSS/JS. No build step, no dependencies, no server required.

## Local development

Just open `index.html` directly in a browser. To preview with a local server instead (optional):

```
npx serve .
```

## Structure

- `index.html` — home page (each additional page will be its own `.html` file at the root, e.g. `about.html`)
- `css/styles.css` — all styles: design tokens (CSS custom properties), base styles, layout, and one section per reusable component (nav, button, card, contact item, footer)
- `js/nav.js` — mobile nav toggle
- `assets/images/`, `assets/fonts/` — images and the self-hosted Inter font

## Deploying

Push this folder as-is to a GitHub repo, then in the repo go to **Settings → Pages → Build and deployment → Source** and choose **"Deploy from a branch"** (main, `/` root). No Actions workflow needed — GitHub serves the static files directly.
