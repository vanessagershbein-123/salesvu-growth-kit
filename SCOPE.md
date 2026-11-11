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

## Decisions (Nov 10)
- **Public repo in Vanessa's GitHub account** (portfolio piece). Pascal gets the link, and can be added as a collaborator or receive a transfer later if he wants it.
- **Treat MealPool as live.** The materials are a sales tool: they **show the owner our research and the content they'll get**, so they want to try SalesVu and MealPool. They're labeled as a preview for the restaurant ("Ejemplo para su restaurante").
- **Use Google Maps data** (Places API) for the lunch search and to auto-fill the health check. **OpenStreetMap is the free backup** when no Google key is entered.

## Rules for all parts
- **Static site:** no login, no server, no cost. Hosted on GitHub Pages.
- **Google key:** never saved in the code or the repo. Each user pastes a key once in ⚙️ Ajustes (settings) and it stays in that browser only. Vanessa uses a free **Google Maps Demo Key** (personal Gmail, no credit card, daily limit, no charges) for building and the demo. SalesVu plugs in **its own key** later; Pascal already uses Google Places for the CRM. The key is restricted to the site's address and to the Places API.
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
- **With a Google key:** search the restaurant by name + address; the tool **auto-fills** what Google knows: hours listed, website, phone, rating and review count (if the key allows), and a Maps link. The rep confirms or corrects.
- One-click look-up links that open in a new tab: Google Maps, Google search, Facebook, Instagram, delivery apps
- **5 yes / no / don't-know questions** (cut from 10 on Nov 10: this is sales collateral, so only questions that lead to SalesVu's pitch):

| Question | Weight | Fix tag |
|---|---|---|
| Customers can order online directly | 30 | SalesVu does it |
| Pays delivery-app commission (a "yes" counts against) | 15 | SalesVu does it |
| Website with menu | 20 | SalesVu does it |
| On Google Maps with hours | 20 | Free tip |
| Facebook active in the last month | 15 | Included in the kit |

- Callback time

**Outputs**
1. **Score 0–100**, counting only questions answered yes or no
2. **The top 3 fixes,** ranked by priority, each tagged:
   - "Nosotros lo hacemos": SalesVu does it (ordering link, menu page)
   - "Incluido en este kit": the free kit covers it (Facebook images, review card)
   - "Consejo gratis": the owner can do it (Google hours, photos, replies)
3. **Report image** (1080×1350, for WhatsApp): logo, score, 3 fixes, rep name, QR to the demo store
4. **WhatsApp message** in Spanish, with an English version for team review

**Out of scope:** scraping Facebook, Instagram or Yelp (those stay manual checks), reading review text, competitor comparison.

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

**How it works**
1. **Find the restaurant:** Google Places Text Search turns the name + address into a map location (backup: OpenStreetMap Nominatim).
2. **Nearby workplaces:** Google Places **Nearby Search** within 0.5, 1 or 2 miles. One search per category, up to 20 places each: offices (corporate offices, law, accounting, insurance, real estate, banks), health (hospitals, clinics, dentists), schools and universities, government (city hall, courthouse, police, fire, post office), car dealerships, industry and warehouses. Backup: OpenStreetMap Overpass.
3. **Map:** Leaflet map with markers, plus a list sorted by distance (miles and walking minutes). Each place links to Google Maps.
4. Reps can **add places by hand** for anything the search misses.
5. **Usage:** about 6 Google calls per search. Google's free monthly cap for Nearby Search (Pro) is 5,000 calls (~800 searches a month) before charges start, and the Demo Key just pauses at its daily limit.

**Inputs:** radius, order cutoff time (default 10:30 am), lunch time (default 12:00 pm), delivery or pickup, program name (default "MealPool"), language of the office materials (English default; Spanish or bilingual)

**Outputs**
1. **Owner image** (Spanish): "{N} lugares de trabajo a menos de {r} millas de {Restaurante}" (N workplaces within r miles), a radar chart of the places, and the team-tested line "Sus próximos clientes de la comida están a la vuelta de la esquina" (your next lunch customers could be right around the corner)
2. **WhatsApp to the owner** (Spanish): names the 3 closest workplaces, explains group lunch in one sentence, and offers to send the office flyers
3. **For each office the rep selects:**
   - A flyer (1080×1350): "Team lunch from {Restaurant}, {d} mi away · Order together by {cutoff}," with a QR code
   - An email to the office manager (subject and body)

**Out of scope**
- Employee counts or contact names (not in Google Places)
- Sending emails
- Consumer sign-up flows

**Risks**
- The Demo Key is for prototyping and leaves out reviews and photos. Fine for the demo; SalesVu needs its own key with billing for daily rep use.
- A browser key is visible to anyone who opens the page, so it must be restricted to the site's address and the Places API in Google Cloud.
- Test real Houston and San Antonio addresses before the demo.

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

---

## Rep workflow (added Nov 10): as few steps as possible
1. **Fastest:** a "Regalo" button in SalesVu's CRM opens `regalos.html?name=…&addr=…&maps=…&store=…` with the restaurant already filled in, and the look-up runs on its own. The CRM already has Google Places data for its restaurant list, so SalesVu's developer can add this button in an afternoon.
2. **Without the CRM button:** the rep pastes the restaurant's Google Maps link (or its website) and the look-up starts on paste. A Maps link alone fills in the name and exact location.
3. The rep confirms the yes/no answers marked "Google" and checks Facebook/Instagram with one click each.
4. Copy image → copy message → paste in WhatsApp.

Can't be done from a static page: reading the content of other websites (browsers block it, and scraping Google breaks its terms). Short links (`maps.app.goo.gl`) must be opened first and the full link copied.
