# 2-Week Test: Do Gifts Get More Owners to Reply?

_A test SalesVu can run on its own after Nov 19. No new spending: the reps, the Growth Kit and a shared spreadsheet._

## The question
When a rep sends the owner a **gift** (the map of nearby offices that could order lunch with MealPool) along with the follow-up, do more owners **reply**, **book a call back** and **sign up** than with the follow-up alone?

## Setup (one afternoon)
1. **Pick the area:** one metro, so the two groups are alike. Houston has the most leads.
2. **Turn on Google data:** paste SalesVu's Google Maps key once in ⚙️ Ajustes on each rep's browser (or build it into the site; see the README).
3. **Make the log:** copy [`test-log-template.csv`](test-log-template.csv) into a shared Google Sheet, one row per follow-up sent.
4. **Brief the reps (15 minutes):** show the [Regalos](regalos.html) page, "Almuerzos cerca" tab, and do one example together.

## How it runs
- **Who gets the gift:** each rep **alternates**: 1st reached owner gets **A (gift)**, 2nd gets **B (standard follow-up)**, 3rd A, and so on. Alternating (rather than one rep doing A and another B) keeps rep skill from skewing the result. Reps don't choose; whoever's next gets the next letter.
- **Who counts:** owners the rep actually spoke with, plus "owner not there, staff gave a callback time." Unreached numbers don't count.
- **A, gift:** send the WhatsApp follow-up **and** the owner image + message from *Regalos → Almuerzos cerca* (about 2 extra minutes).
- **B, standard:** send the WhatsApp follow-up from the *Kit de ventas* only.
- **Same day, every time:** both within an hour of the call.

## What to measure
| Measure | How it's counted | Why it matters |
|---|---|---|
| **Reply within 48 hours** (main measure) | Rep marks Y/N in the log | The first sign the gift earns attention |
| Callback or demo booked | Rep marks Y/N | The step before a sale |
| Store visits | Visits with `?ref=regalo-almuerzo` in the store's link analytics (if available) | Shows owners looked, even without replying |
| Setup paid / went live | From the CRM, 2 weeks after the test ends | The real goal; it comes late, so read it last |
| Minutes per gift | Rep notes on 5 sends | Whether the gift is worth the time |

## Check-in (end of week 1)
- Are reps alternating A/B? (Look for long runs of the same letter.)
- Are gifts going out the same day?
- Anything broken or slow in the tool? Fix it before week 2.

## Reading the result (end of week 2)
Fill in this table from the log:

| | A (gift) | B (standard) |
|---|---|---|
| Follow-ups sent | | |
| Replies in 48 h | | |
| Reply rate | | |
| Callbacks/demos booked | | |
| Setups (2 weeks later) | | |

**Decide:**
- **Roll out to every rep** if A's reply rate is clearly higher (about 1.5× B or more) and demos are not lower.
- **Change the gift and run 2 more weeks** if results are close: try the online health check as the gift instead, or send the office flyer too.
- **Stop sending gifts** if A is no better than B after 2 rounds. The 2 extra minutes are better spent on more calls.

**About sample size:** two weeks gives a few dozen follow-ups, so treat the result as a strong hint, not proof. If it's promising, keep the A/B alternation running another month and the picture firms up.

## Next if it works
- **Add a "Regalo" button to the CRM** so the gift opens pre-filled (`regalos.html?name=…&addr=…&maps=…&store=…&rep=…`).
- **Call lunch-dense restaurants first:** run the same office count on every restaurant in the CRM and sort the call list by it. Same reps, better leads.
