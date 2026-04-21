# Runbook — arenda-klintsy.ru

## Live URLs
- GitHub Pages (default): https://lopushokbot.github.io/arenda-klintsy/
- Custom domain (when DNS is ready): https://arenda-klintsy.ru/
- Repo: https://github.com/lopushokbot/arenda-klintsy

## Deployment

### Push workflow
```
git add -A
git commit -m "<short message>"
git push origin main
```
Pages rebuild is automatic on push to `main` (takes ~1 min).

### GitHub Pages Setup (already done)
- Source: `main` branch, `/` path
- HTTPS enforced
- CNAME file currently removed until DNS migrates

### DNS Setup (at domain registrar)
Point arenda-klintsy.ru to GitHub Pages:
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  lopushokbot.github.io
```
Wait for DNS propagation (up to 48h), then enable "Enforce HTTPS" in GitHub Pages settings.

## EmailJS Setup
1. Create account at https://www.emailjs.com/
2. Add email service (connect info@arenda-k.ru)
3. Create email template with variables: `from_name`, `phone`, `property`, `message`, `subject`
4. Add to index.html before closing `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
    window.EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    window.EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
</script>
```

## Yandex Webmaster Verification
1. Go to https://webmaster.yandex.ru/
2. Add site arenda-klintsy.ru
3. Get verification meta tag
4. Add to index.html `<head>`: `<meta name="yandex-verification" content="YOUR_CODE">`

## Updating Content
- All content is in `index.html` — edit directly
- Styles in `css/style.css`
- Push to main branch to deploy

## Adding Real Photos
1. Optimize images (WebP format, max 800px wide, ~80% quality)
2. Place in `images/` folder
3. Replace placeholder divs in property cards with `<img>` tags
4. Add descriptive `alt` text in Russian for SEO

## Updating Yandex Map / Property Links
Property coordinates and Yandex org IDs are listed in `CLAUDE.md`. When a pin is wrong:
1. Get the fresh Yandex Maps URL for the org (open it on yandex.com/maps and copy the share link)
2. Extract `ll=<lon>,<lat>` or `poi[point]=<lon>,<lat>` from the URL
3. Update two spots in `index.html`:
   - `property-card__address` href and `property-card__map-link` href on the matching card
   - The `pt=` parameter of the map iframe near `<section class="map">`
4. Also update the coord in `CLAUDE.md`

## Changelog
- **2026-04-21** — Mobile UX pass: burger tap target → 44×44 px, menu panel slides in full-viewport with `body.menu-open` scroll-lock, added tap-to-close backdrop + Escape key, moved phone + «Заказать звонок» into the mobile panel, fixed backdrop-filter containing-block bug on `.header`, responsive map iframe (aspect-ratio 4/3, max-height 70vh), modal close button ≥44 px, consent checkbox 22 px, review-card padding reduced, client logos 110 px on mobile, team avatars 56 px, `html { overflow-x: hidden }` safety net.
- **2026-04-20** — Replaced Cian/Avito/Magnit/Fix Price/Gloria Jeans/К&Б logos with official SVGs; added Yandex Maps links per property card; rebuilt bottom map iframe with corrected coordinates for all 4 centers.
