# thinkabundant.com

A static single-page site for the Think Abundant coaching practice and podcast —
plain HTML, CSS and vanilla JavaScript, with no build step and no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page: hero, about, coaching, methodology, podcast, contact, footer. |
| `style.css` | All styling. CSS custom properties, Flexbox and Grid; mobile-first. |
| `script.js` | Mobile nav toggle, smooth anchor scrolling, contact-form validation, footer year. |

Total payload is well under 50 KB. The only external request is the Google Fonts
stylesheet; if it is blocked or the page is opened offline, the design falls back to
system fonts and still looks right.

## Running locally

Open `index.html` in a browser — `file://` works, no server required. If you prefer
a local server:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push these files to the repository root of the branch you want to publish.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the branch and the **`/ (root)`** folder, then **Save**.
5. The site goes live at `https://<user>.github.io/<repo>/` in a minute or two.

### Custom domain (thinkabundant.com)

1. In **Settings → Pages → Custom domain**, enter `thinkabundant.com` and save.
   GitHub commits a `CNAME` file to the repository for you.
2. At your DNS provider, point the apex domain at GitHub's IPv4 addresses with four
   `A` records — `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153` — and add a `CNAME` record for `www` pointing at
   `<user>.github.io`. (Verify these values against GitHub's current documentation
   before relying on them.)
3. Once DNS resolves, tick **Enforce HTTPS**.

## Placeholders to replace before launch

Every placeholder is marked in the source with a `TODO:` HTML comment or `[square
bracket]` text. Nothing on the page invents a testimonial, a metric, a client name or
a podcast episode.

- **About** — bio paragraphs, mission statement, and the professional photograph
  (an inline SVG stands in for it today).
- **Coaching** — session count, duration and format.
- **Podcast** — real episode titles, guests, descriptions and dates; audio file URLs
  for the `<audio>` players; the Apple Podcasts, Spotify and RSS subscribe links.
- **Contact** — the email address, and a real form backend (see below).
- **Footer** — social profile URLs.
- **`<head>`** — the Open Graph image (`og-image.png`, 1200×630) is referenced but
  not yet committed.

## Wiring up the contact form

The form is validated client-side only; `script.js` calls `preventDefault()` and shows
a cosmetic success message. GitHub Pages serves static files and cannot process a POST,
so pick a form service (Formspree, Netlify Forms, Basin, or your own endpoint), set the
form's `action` and `method`, and remove the `preventDefault()` branch in the submit
handler — or replace it with a `fetch()` call.

## Accessibility and SEO notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link, and
  a visible focus ring on every interactive element.
- Text colours meet WCAG AA contrast against their backgrounds.
- Form errors use `role="alert"` and `aria-invalid`; the status message is a live region.
- `prefers-reduced-motion` disables smooth scrolling and transitions.
- Meta description, canonical link and Open Graph/Twitter tags are set in the `<head>`;
  update the URLs if the site is published somewhere other than `https://thinkabundant.com/`.
