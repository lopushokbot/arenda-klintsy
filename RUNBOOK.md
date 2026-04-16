# Runbook — arenda-klintsy.ru

## Deployment

### GitHub Pages Setup
1. Push to `lopushokbot/arenda-klintsy` on GitHub
2. Go to Settings → Pages → Source: Deploy from branch (main)
3. CNAME file is already in repo for custom domain

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
