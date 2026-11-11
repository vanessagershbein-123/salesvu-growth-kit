# SalesVu Call Prep

A free web tool that SalesVu's reps use before calling an independent Mexican restaurant. One short form, one button:

1. **Nueva llamada:** restaurant name, address (or Google Maps link) and optional notes, then tick what to prepare:
   - Nearby offices and MealPool
   - Online presence
   - Nearby competitors (for the rep only)
   - MealPool kit for the owner
2. **Call brief (for the rep):** a 30-second summary with the opener, the offices map with an order estimate and positioning tips, the online-presence check with how SalesVu helps, and competitors nearby.
3. **Owner pack (for the restaurant owner):** the same pages as a **PDF** and as **WhatsApp-sized images**, plus a short WhatsApp message.

Files:
- `index.html`: the tool
- `p.html`: the **personalized page** for one owner (their name and logo, offices nearby with the order estimate, how MealPool works, their online check, what SalesVu does, and a form that opens WhatsApp to the rep). Everything it shows travels in the link after `#d=`; nothing is stored on a server.
- `guia.html`: call guide for reps
- `regalos.html`: old link, forwards to `index.html`

**Data:** Google Places (paste a key in *Ajustes*; it's saved only in that browser) or OpenStreetMap as the free backup. Icons: Noto Emoji (Open Font License).
**Optional CRM link:** `index.html?name=…&addr=…&notes=…&owner=…&store=…&rep=…` opens pre-filled and generates on its own.

Built by Vanessa Gershbein (McCombs+ x SalesVu, fall 2026). See [SCOPE.md](SCOPE.md) for the original plan.

## Optional link helper (`helper/worker.js`)
Browsers can't open other websites from a page, so a tiny free Cloudflare Worker does two read-only jobs:
- **Opens share links** (`maps.app.goo.gl`, `share.google`) so a rep can paste them directly.
- **Reads the restaurant's website** for Facebook, Instagram, WhatsApp, online ordering (and which provider: Toast, Square…) and delivery-app links.

It only returns a short summary, never whole pages. **To set up (about 10 minutes, free, no card):** Cloudflare dashboard → Workers & Pages → Create → Worker → name it `salesvu-links` → Deploy → Edit code → paste `helper/worker.js` → Deploy. Then copy its address (`https://salesvu-links.<you>.workers.dev`) into *Ajustes* → *Ayudante de enlaces*, or into `LINK_HELPER` in `index.html` so every rep gets it.
