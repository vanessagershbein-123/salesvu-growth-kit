# Scope: SalesVu Growth Kit, "Regalos" (Gifts) for Restaurants

_Owner: Vanessa Gershbein (McCombs+) · Drafted Nov 10, 2026 · Demo: final presentation Thu Nov 19, 1 PM_

## Why this exists
SalesVu's reps cold-call independent Mexican restaurants, and almost every call is cold. Most calls never reach the owner, and few conversations turn into live restaurants. SalesVu's own line is **"Useful first. Invitations second."** This kit gives every rep a **free, personalized gift** to offer on the call ("Le preparé algo gratis para su restaurante"). The gift earns the WhatsApp number, a reason to call back, and proof that SalesVu does the work for the owner.

## What's being built
One website, one link, used on a laptop or phone by the reps:

| Part | Name (rep-facing) | Gift for the owner |
|---|---|---|
| 0 | Shared shell | n/a: restaurant details entered once, used by all 3 parts |
| 1 | **Chequeo en línea** (online health check) | A 1-page report: "3 cosas para conseguir más pedidos esta semana" |
| 2 | **Kit de marketing** (free marketing kit) | Ready-to-use QR sticker, table tent, WhatsApp Status and Facebook post, with the restaurant's logo |
| 3 | **Almuerzos cerca** (lunch customers near you) | A map of offices nearby, plus a flyer and email for each office to start MealPool group lunches |

It sits next to the existing **Kit de ventas** (follow-up generator + call guide). The two are linked from each other's menus.

## Rules for all parts
- **Static site:** no login, no server, no API keys, no cost. Hosted on GitHub Pages.
- **Spanish first** with an English toggle. Owner-facing text uses "usted" and Spanish natural to Mexican-American owners (the reps are Colombian).
- **The rep reviews and sends.** The tool never sends anything itself.
- **Only confirmed claims.** No prices, fees or setup costs until Sebastian confirms the offer. MealPool wording is marked "to confirm."
- **Nothing private in the repo:** no CRM data, call transcripts, or real owner names and phone numbers. Sample data is invented.
- **Brand:** salesvu.com style (Inter, #0066FF blue, navy #0A1A2E). Works on a 375px phone screen, light and dark mode.

---

## Part 0: Shared shell
**User story:** As a rep, I enter the restaurant once and every gift uses it.

**In scope**
- Fields: restaurant name, address (street + city), owner name (optional), rep name, demo store link (from the CRM), logo upload (optional), brand color
- Tabs: Chequeo · Marketing · Almuerzos, plus a link back to the Kit de ventas
- Example data loaded; "Borrar ejemplo" (clear example) button
- Language toggle remembered on this device

**Out of scope:** saving restaurants, accounts, CRM sync.

**Done when:** changing the name in one place updates all three parts.

---

## Part 1: Chequeo en línea (online health check)
**User story:** As a rep, in about 2 minutes I check how a restaurant shows up online and send the owner a personal report with 3 fixes, so I have a useful reason for a second conversation.

**Inputs**
- One-click look-up links that open in a new tab: Google Maps, Google search, Facebook, Instagram, delivery apps
- 10 yes / no / don't-know questions:

| Question | Weight |
|---|---|
| On Google Maps with correct hours | 20 |
| Customers can order online directly | 20 |
| Website with menu | 10 |
| 10+ food photos | 10 |
| Rating 4.3+ | 10 |
| Facebook active in the last 30 days | 10 |
| Replies to reviews | 5 |
| Instagram active | 5 |
| WhatsApp orders | 5 |
| Pays delivery-app commission (a "yes" counts against) | 5 |

- Callback time

**Outputs**
1. **Score 0–100**, counting only questions answered yes or no
2. **The top 3 fixes,** ranked by priority, each tagged:
   - "Nosotros lo hacemos": SalesVu does it (ordering link, menu page)
   - "Incluido en este kit": the free kit covers it (Facebook images, review card)
   - "Consejo gratis": the owner can do it (Google hours, photos, replies)
3. **Report image** (1080×1350, for WhatsApp): logo, score, 3 fixes, rep name, QR to the demo store
4. **WhatsApp message** in Spanish, with an English version for team review

**Out of scope:** automatic scraping of Google, Yelp or Facebook (needs paid APIs and raises terms-of-service issues), star-rating lookups, competitor comparison.

**Success metric:** share of owners who reply after receiving the report (logged by reps).

**Done when:**
- A rep completes the example in under 2 minutes on a phone
- The report reads correctly for an all-yes, an all-no and a mixed restaurant
- Alicia approves the Spanish

---

## Part 2: Kit de marketing (free marketing kit)
**User story:** As a rep, I give the owner ready-made marketing with their logo and ordering QR code, so customers start ordering through the restaurant's own link.

**Inputs**
- Headline (3 options):
  - "Pida en línea, sin filas" (Order online, skip the line)
  - "Su comida favorita, ahora en línea" (Your favorite food, now online)
  - "¿Almuerzo para la oficina? Pidan juntos" (Lunch for the office? Order together)
- Language for the restaurant's customers: Spanish, English or bilingual
- Optional offer line written by the owner (e.g., "10% en su primer pedido")

**Outputs** (PNG downloads, each with the restaurant's logo, color and QR code)
1. Window sticker, square: "Pida en línea / Order online"
2. Table tent, 5×7 portrait
3. WhatsApp Status / Instagram Story, 1080×1920
4. Facebook / Instagram post, 1080×1080, with a ready-to-paste caption and local hashtags

**Out of scope:** printing or shipping, posting to social media, editing images freely, AI image generation.

**Success metric:** number of kits sent; whether restaurants post them (reps ask on the callback).

**Done when:**
- All 4 images download on a phone and a laptop
- The QR code scans to the demo link
- Text never overflows with long names (tested with a 40-character name)

---

## Part 3: Almuerzos cerca (lunch customers near you) + MealPool content
**User story:** As a rep, I type the restaurant's address and see the workplaces around it. The owner gets proof that lunch customers are nearby, plus ready-made outreach to each office for MealPool group lunches.

**How it works (free, no API key)**
1. **Address to map location:** OpenStreetMap Nominatim (free; maximum 1 search per second)
2. **Nearby workplaces:** OpenStreetMap Overpass, within 0.5, 1 or 2 miles. Categories: offices, hospitals and clinics, schools and universities, government, car dealerships, industry and warehouses. Named places only.
3. **Map:** Leaflet with OpenStreetMap tiles, plus a list sorted by distance (miles and walking minutes)
4. Reps can **add places by hand** (OpenStreetMap misses some offices)

**Inputs:** radius, order cutoff time (default 10:30 am), lunch time (default 12:00 pm), delivery or pickup, program name (default "MealPool"), language of the office materials (English default; Spanish or bilingual)

**Outputs**
1. **Owner image** (Spanish): "{N} lugares de trabajo a menos de {r} millas de {Restaurante}" (N workplaces within r miles), a radar chart of the places, and the team-tested line "Sus próximos clientes de la comida están a la vuelta de la esquina" (your next lunch customers could be right around the corner)
2. **WhatsApp to the owner** (Spanish): names the 3 closest workplaces, explains group lunch in one sentence, and offers to send the office flyers
3. **For each office the rep selects:**
   - A flyer (1080×1350): "Team lunch from {Restaurant}, {d} mi away · Order together by {cutoff}," with a QR code
   - An email to the office manager (subject and body)

**Out of scope**
- Employee counts or contact names (needs paid data)
- Sending emails
- Google Places data, possible later with Pascal's API key
- Consumer sign-up flows

**Risks / to confirm**
- OpenStreetMap office coverage varies by area. Test real Houston and San Antonio addresses, and keep manual add as the backup.
- Confirm with Sebastian that MealPool can be mentioned, whether it offers delivery or pickup, and the cutoff times.
- Public OpenStreetMap services are for light use. If reps use this heavily, switch to a paid provider.

**Success metric:** offices contacted per restaurant; restaurants that agree to a MealPool trial.

**Done when:**
- 3 real addresses (downtown Houston, a Houston suburb, San Antonio) return useful places
- Flyers render for the 5 closest places
- Clear error messages appear when the address isn't found or there are no results

---

## Timeline
| Date | Milestone | Git lesson |
|---|---|---|
| Tue Nov 10 | Scope agreed; repo created; existing Sales Kit committed | `init`, `add`, `commit`, `log` |
| Wed Nov 11 | Part 0 + Part 1 | Commit after each working piece |
| Thu Nov 12 | Part 2 | `diff`, undoing a mistake |
| Fri–Sat Nov 13–14 | Part 3 | A branch for the map experiment, then merge |
| Sun Nov 15 | README + screenshots; push to GitHub; turn on Pages | `remote`, `push`, GitHub Pages |
| Mon Nov 16 | Alicia reviews the Spanish, using an Issue for each fix | Issues, small commits |
| Tue Nov 17 | Dry run | Tag `v1.0` |
| Thu Nov 19 | Demo; offer to transfer the repo to Pascal | Repo transfer |

## Open decisions
- [ ] Sophia: does this fit as Vanessa's demo inside the customer-journey section?
- [ ] Pascal: OK for a **public** repo (needed for free GitHub Pages)? If not, keep it private and share by screen-sharing in the demo.
- [ ] Sebastian: MealPool wording, delivery vs. pickup, cutoff time; can reps spend 2 minutes per lead on the health check?
