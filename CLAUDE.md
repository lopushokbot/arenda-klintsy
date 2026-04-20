# Arenda Klintsy — Союз

Commercial property rental landing page for company "Союз" in Klintsy, Bryansk region.

## Stack
- Static HTML + CSS + vanilla JS (no build step)
- Hosted on GitHub Pages with custom domain arenda-klintsy.ru

## Structure
```
index.html      — single-page site with all content
css/style.css   — all styles
js/main.js      — mobile nav, scroll animations, form handling
robots.txt      — search engine directives
sitemap.xml     — sitemap for crawlers
CNAME           — custom domain for GitHub Pages
```

## Key Info
- **Company**: Союз (ООО "Клинцы Аренда")
- **Phone**: +7 (930) 820-09-99
- **Email**: info@arenda-k.ru
- **Telegram**: @arendaklintsy32
- **Domain**: arenda-klintsy.ru
- **GitHub**: lopushokbot/arenda-klintsy

## Forms
Forms use EmailJS (client-side) with mailto fallback. EmailJS credentials need to be configured — see RUNBOOK.md.

## SEO
- JSON-LD structured data (RealEstateAgent, ShoppingCenter, Review schemas)
- Yandex Maps, 2GIS, CIAN, Avito cross-linked in sameAs
- robots.txt + sitemap.xml
- Semantic HTML5 markup

## Yandex Maps — Property Coordinates (used in iframe + card links)
- ТК «Центральный рынок» (Октябрьская, 5): `32.237956, 52.746198` — org 53940329825
- ТАК «Союз» (Дзержинского, 24): `32.249084, 52.756619` — org 26201175291
- ТРЦ «Европейский» (пр-т Ленина, 13): `32.232199, 52.752876` — org 111336099468
- ТРЦ «Доходный» (Октябрьская, 40а): `32.236817, 52.752724` — org 90976081696
- Map iframe center: `32.240642, 52.751409` at `z=14`
