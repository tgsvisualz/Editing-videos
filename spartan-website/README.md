# Spartan Protection Incendie — website

Bilingual (French first, English option) website for **Spartan Protection Incendie / Spartan Fire Protection**, Saint-Laurent (Montréal). It works as a portal for clients (inspection requests, quotes and contact), a careers page and a storefront.

Plain HTML, CSS and JavaScript, with no build step and no dependencies. It runs on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages or classic hosting).

## Pages

| Page | What it does |
|---|---|
| `index.html` | Home: hero, the six trades, audiences (property managers, condo boards, job sites), process, 24 h emergency band, certifications, shop preview, team, FAQ |
| `services.html` | One section per trade (fire alarm, sprinklers, electrical, extinguishers, security, access control), with a scroll-spy nav |
| `request.html` | 5-step inspection / quote wizard (under 60 s), emergency handling, file upload, review screen, Law 25 consent |
| `shop.html` | Catalogue (21 items, 5 categories), search, product modal, quote cart (saved in the browser), quote request form |
| `careers.html` | Perks, open position(s), open application by trade, CV upload form |
| `about.html` | Story, team, values, coverage area |
| `contact.html` | Contact form, 24 h line, address, map |
| `privacy.html`, `credits.html`, `404.html` | Legal (Quebec Law 25), photo credits, not-found page |

## Before going live

1. **Connect the forms.** In `assets/js/config.js`, set `formEndpoint` (for example a [Formspree](https://formspree.io) form URL). Until you do, every form runs in demo mode: it validates and shows the success screen, but it only logs the submission to the browser console. File uploads (CV, reports) need a plan that accepts attachments.
2. **Email.** Set `email` in `config.js` to show it on the contact page and in the footer. It stays hidden while empty.
3. **Confirm these facts with Spartan.** They come from public listings and the strategy document:
   - Team titles (Frank Liberatoscioli: founder and president; Nicholas Perron: VP and project manager; Dominic Perron and Justin McWilliams: senior technicians)
   - Same-business-day callback promise
   - The quoted Google review (home page)
   - Job posting details: from $23/h, 40 h/week, RRSP matching, health insurance
   - Social links: Instagram handle `@spartanfireprotection` and Facebook page
4. **Domain.** Update the `url`/`logo` fields in the JSON-LD block of `index.html`, plus `sitemap.xml`, if the final domain is not `www.spartanfire.ca`.

## Editing content

- **Text** is written in French in the HTML, with the English next to it:
  `<h2 data-en="One call for the whole building.">Un seul appel pour tout le bâtiment.</h2>`
  Placeholders and alt text work the same way: `data-en-placeholder`, `data-en-alt`, `data-en-aria-label`, `data-en-title`, `data-en-content`.
- **Products, job postings and trades** are in `assets/js/data.js`, as `{ fr, en }` pairs. Add `price: 89.99` to a product to show a fixed price instead of "price on request".
- **Phone, address and RBQ** are in `assets/js/config.js` (the footer and menus read from it).
- Language choice is remembered per visitor, and `?lang=en` gives a shareable English link.

## Images

- Job-site, team, shop and truck photos plus the logo are Spartan's own, in `assets/img/`.
- Some product and scene photos load from Wikimedia Commons and Pexels (see `credits.html`). If a remote photo ever fails, the page swaps in a local photo or a brand illustration automatically (`data-fallback` / `data-art`). To self-host them, download the files into `assets/img/` and change the URLs.

## Tracking

UTM parameters and `gclid`/`fbclid` from the landing URL are stored for the session and attached to every form submission (`attr_*` fields), so each request can be tied to the campaign that brought it in.

## Local preview

```bash
cd spartan-website
python3 -m http.server 8000   # then open http://localhost:8000
```
