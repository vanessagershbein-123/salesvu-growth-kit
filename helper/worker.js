/**
 * SalesVu Call Prep: link helper (a Cloudflare Worker, free plan).
 *
 * Browsers don't let a web page open other websites, so this small helper does two read-only jobs for the tool:
 *   GET ?resolve=<share link>  → { url }   Opens maps.app.goo.gl / goo.gl / share.google links and returns the full link.
 *   GET ?scan=<website>        → { facebook, instagram, tiktok, whatsapp, ordering, provider, delivery, title }
 *                                Reads a restaurant's website (and its homepage) for social, ordering and delivery-app links.
 *
 * It only ever returns a small summary, never the page itself, so it can't be used as an open proxy.
 * Deploy: Cloudflare dashboard → Workers & Pages → Create → Worker → paste this file → Deploy.
 */
const ALLOWED_ORIGINS = [
  'https://vanessagershbein-123.github.io',
  'http://localhost:8000',
  'http://localhost:8765',
];
const SHORT_HOSTS = /^(maps\.app\.goo\.gl|goo\.gl|share\.google|g\.co)$/i;
const PROVIDERS = [
  ['Toast', /toasttab\.com/i], ['Square', /square\.site|squareup\.com/i], ['Clover', /clover\.com/i], ['ChowNow', /chownow\.com/i],
  ['Owner.com', /owner\.com/i], ['Slice', /slicelife\.com/i], ['Menufy', /menufy\.com/i], ['BeyondMenu', /beyondmenu\.com/i],
  ['Olo', /olo\.com/i], ['SpotOn', /spoton\.com/i], ['SalesVu', /salesvu\.com|localstores\.ai/i],
];
const ORDER_WORDS = /\/(order|online-order|ordering)(\/|$)|order\.online|^https?:\/\/order\./i;
const DELIVERY = /doordash\.com|ubereats\.com|grubhub\.com|postmates\.com/i;
const UA = 'Mozilla/5.0 (compatible; SalesVu link helper)';

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const headers = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'GET') return reply({ error: 'GET only' }, 405, headers);
    const q = new URL(request.url).searchParams;
    try {
      if (q.get('resolve')) return reply(await resolve(q.get('resolve')), 200, headers);
      if (q.get('scan')) return reply(await scan(q.get('scan')), 200, headers);
      return reply({ error: 'Use ?resolve=<share link> or ?scan=<website>' }, 400, headers);
    } catch (e) {
      return reply({ error: String((e && e.message) || e) }, 400, headers);
    }
  },
};

function reply(obj, status, headers) { return new Response(JSON.stringify(obj), { status, headers }); }
function webURL(raw) {
  const u = new URL(raw);
  if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error('Only web links');
  return u;
}

/* Follow a share link's redirects until we reach a Google Maps or Google Search link. */
async function resolve(raw) {
  let u = webURL(raw);
  if (!SHORT_HOSTS.test(u.hostname)) throw new Error('Not a share link');
  for (let i = 0; i < 6; i++) {
    const r = await fetch(u.toString(), { redirect: 'manual', headers: { 'User-Agent': UA } });
    const loc = r.headers.get('Location');
    if (!loc || r.status < 300 || r.status > 399) break;
    u = new URL(loc, u);
    if (/(^|\.)google\.[a-z.]+$/i.test(u.hostname) && (u.pathname.startsWith('/maps') || u.pathname === '/search')) break;
  }
  return { url: u.toString() };
}

/* Read one page and return the links that matter for selling online orders. */
async function readPage(u) {
  const r = await fetch(u.toString(), { redirect: 'follow', headers: { 'User-Agent': UA, 'Accept': 'text/html' } });
  if (!r.ok || !(r.headers.get('Content-Type') || '').includes('text/html')) return null;
  const html = (await r.text()).slice(0, 1500000);
  const links = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]).filter(l => /^https?:/i.test(l));
  const find = re => links.find(l => re.test(l)) || '';
  const provider = (PROVIDERS.find(([, re]) => links.some(l => re.test(l)) || re.test(html)) || [])[0] || '';
  const ordering = find(/toasttab\.com\/.*(order|online)|order\.toasttab\.com/i) || links.find(l => PROVIDERS.some(([, re]) => re.test(l)) && ORDER_WORDS.test(l)) || find(ORDER_WORDS);
  return {
    final: r.url,
    title: ((html.match(/<title[^>]*>([^<]*)/i) || [])[1] || '').replace(/&amp;/g, '&').trim().slice(0, 140),
    facebook: find(/facebook\.com\/(?!sharer|share|dialog|plugins|tr\b)/i),
    instagram: find(/instagram\.com\/(?!p\/|share)/i),
    tiktok: find(/tiktok\.com\/@/i),
    whatsapp: find(/wa\.me\/|api\.whatsapp\.com\/send/i),
    ordering, provider,
    delivery: find(DELIVERY),
  };
}

/* Scan the page; if it isn't a web page (e.g. a PDF menu) or shows no social links, also scan the homepage. */
async function scan(raw) {
  const u = webURL(raw);
  let page = await readPage(u);
  const home = new URL('/', u);
  if ((!page || (!page.facebook && !page.instagram)) && home.toString() !== u.toString()) {
    const h = await readPage(home);
    if (h) page = page ? Object.fromEntries(Object.keys(h).map(k => [k, page[k] || h[k]])) : h;
  }
  return page ? { ok: true, ...page } : { ok: false };
}
