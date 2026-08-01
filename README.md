# Mackay Consulting Services — website

Static marketing website for **Mackay Consulting Services (MCS)**, Freetown, Sierra Leone.

MCS helps governments, regulators and development partners turn policy intent into
working institutions — drafting the legal instrument, designing the system that
implements it, and producing the evidence that it worked.

---

## 1. How the whole thing fits together

    You edit a file on GitHub  ->  push to the "main" branch
              |
              v
    Cloudflare Pages sees the push and publishes the site (about 30-60 seconds)
              |
              v
    Your domain (registered at Squarespace) points at Cloudflare Pages
              |
              v
    Visitors see the new page. HTTPS is automatic.

| Layer   | Where it lives |
| ------- | -------------- |
| Code    | This GitHub repository |
| Hosting | Cloudflare Pages, auto-deployed from "main" |
| Domain  | Registered at Squarespace |
| DNS     | See section 8 |
| Forms   | Web3Forms (free tier) |

**Live URLs**

- Cloudflare preview URL: https://mackay-consulting-services.pages.dev
- Custom domain: _to be added — see section 8_

---

## 2. The stack (deliberately boring)

Plain, hand-written HTML, CSS and a small amount of vanilla JavaScript.
No React, no Astro, no Eleventy, no npm, no build step.

Why: the site is five pages plus occasional posts. A build step would add
tooling that has to be maintained and understood by whoever inherits this.
As written, **any file in this repo is the file that is served** — what you
see in the editor is what appears on the site. That also makes it extremely
fast on mobile data, which matters for a West African audience.

Weight budget: every page should stay under roughly 150 KB including fonts.

---

## 3. Repository structure

    /
    |-- index.html                     Home
    |-- what-we-do/index.html          What We Do (carries the search keywords)
    |-- our-people/index.html          Our People (the credibility page)
    |-- insights/
    |     |-- index.html               Insights index - list of posts
    |     |-- _TEMPLATE-post.html      Copy this to create a new post
    |     `-- regulatory-impact-assessment-is-a-discipline/index.html
    |-- contact/index.html             Contact form
    |-- thank-you/index.html           Shown after the form is submitted
    |-- 404.html                       Not-found page
    |-- assets/
    |     |-- css/site.css             ALL the styling, one file
    |     |-- js/site.js               Mobile nav, form submit, subtle fade-in
    |     |-- fonts/                   Self-hosted fonts - see assets/fonts/README.md
    |     `-- img/                     Logo, favicon, portraits - see assets/img/README.md
    |-- _headers                       Cloudflare caching and security headers
    |-- robots.txt
    |-- sitemap.xml                    Update when you add a page or post
    `-- README.md                      This file

Each page lives in its own folder as "index.html" so the URL is clean:
"/what-we-do/" rather than "/what-we-do.html".

---

## 4. How to edit page copy (no developer needed)

You do not need to install anything. Everything can be done in a browser.

1. Go to the file you want to change, e.g. click **what-we-do** then **index.html**.
2. Click the **pencil icon** at the top right of the file.
3. Find the words you want to change and type over them.
4. Scroll up, click the green **Commit changes...** button.
5. Leave "Commit directly to the main branch" selected and click **Commit changes**.
6. Wait about a minute. Refresh the live site. Done.

### The one rule

HTML text sits **between angle-bracket tags**. Change the words, never the tags.

    <p>We advise ministries on regulatory design.</p>
    ^^^                                           ^^^^
    leave this        change this                 leave this

If you delete a tag by accident the page layout will break. If that happens,
open the file's **History** tab, find the previous version, and use
**Revert** - nothing is ever lost.

### Two things that are duplicated on purpose

Because there is no build step, the **header** and the **footer** are copied
into every page. They are marked with comments:

    <!-- ==== HEADER (identical on every page - keep them in step) ==== -->

If you change a navigation link, the address in the footer, or the telephone
number, **you must make the same change in every HTML file.** There are nine
of them. To find them all, press the "/" key on the repository home page and
search for the old text.

---

## 5. How to add an Insights post

1. Open "insights/_TEMPLATE-post.html" and copy all of it (use the **Raw**
   button, then select all, then copy).
2. Click **Add file -> Create new file**.
3. In the filename box type, exactly:

        insights/your-post-slug/index.html

   Typing the "/" characters automatically creates the folder. The slug becomes
   the URL, so use lowercase words separated by hyphens, no spaces, no accents.
4. Paste the template in and replace every placeholder:

   | Placeholder      | Replace with |
   | ---------------- | ------------ |
   | POST_TITLE       | The headline of the post |
   | POST_SLUG        | The same slug you used in the filename |
   | POST_DESCRIPTION | One or two sentences for Google and social previews, under 160 characters |
   | POST_CATEGORY    | e.g. Regulatory reform / Digital government / Inclusive development |
   | POST_DATE_ISO    | 2026-08-14 format |
   | POST_DATE_HUMAN  | 14 August 2026 format |

5. Write the body between the marked comments, using only these tags:
   "h2" for a subheading, "p" for a paragraph, "ul" and "li" for a bullet list,
   "blockquote" for a pull quote.
6. Commit.
7. Open "insights/index.html" and add a new entry at the **top** of the list,
   copying the shape of the entry already there and changing the link, date,
   category, title and standfirst.
8. Open "sitemap.xml" and add the new URL, copying the shape of the entries
   already there.

Steps 7 and 8 are what actually make the post visible and findable. A post
that is committed but not listed is invisible.

---

## 6. Contact form setup - ten minutes, once

Cloudflare Pages serves static files and cannot process a form submission by
itself. We use **Web3Forms**, which is free, requires no account, and needs no
server-side code.

1. Go to https://web3forms.com
2. Enter the address you want enquiries delivered to (e.g. info@yourdomain.com)
   and click **Create Access Key**.
3. Web3Forms emails you an access key - a long string of letters, numbers and
   hyphens.
4. In this repo open "contact/index.html" and find this line:

        <input type="hidden" name="access_key" value="REPLACE-WITH-YOUR-WEB3FORMS-ACCESS-KEY">

5. Replace only the text inside the quotes with your key. Commit.
6. Send yourself a test message from the live site.

**Is it safe for the key to be visible in the page source?** Yes. A Web3Forms
access key is write-only - it can be used to send a message to your inbox and
nothing else. It cannot read anything.

The form already includes a hidden honeypot field to absorb most spam bots,
and it submits without reloading the page, falling back to an ordinary form
POST (which lands on "/thank-you/") if JavaScript is unavailable.

_Alternative:_ Formspree works the same way if you prefer it. A Cloudflare
Pages Function would also work, but it introduces server code, secrets
management and build configuration to maintain - not worth it for one form.

---

## 7. Fonts and images

Two short README files carry the exact specifications:

- **assets/fonts/README.md** - the four font files that must be added, with
  their exact required filenames. Fonts are self-hosted rather than loaded
  from Google Fonts: it is faster, it is more private, and it does not break
  if a third party changes something.
- **assets/img/README.md** - logo, favicon, Open Graph image and director
  portrait specifications, sizes and weight budgets.

Until the real files are added, the site uses simple placeholder SVGs so that
nothing appears broken.

---

## 8. Connecting the Squarespace domain

Two ways to do this. **Option A is recommended.** Do one or the other, not both.

Throughout, replace "yourdomain.com" with the real domain, and
"mackay-consulting-services.pages.dev" with the actual Pages URL if it differs.

### OPTION A - point the domain nameservers at Cloudflare (RECOMMENDED)

Cloudflare then manages DNS for the domain. This is the only way to make the
**apex** domain (yourdomain.com, with no "www") resolve to Cloudflare Pages
directly, because Cloudflare supports CNAME flattening. It also puts every DNS
record in one place, and gives you Cloudflare analytics and caching.

The trade-off: Squarespace's DNS panel stops being used. If email or any other
service currently depends on a Squarespace DNS record, that record must be
carried across - Cloudflare's scan at step 5 normally does this automatically,
but check it before you continue.

**In Cloudflare:**

1. Log in at https://dash.cloudflare.com
2. In the left sidebar click **Account Home**, then the **+ Add** button and
   choose **Connect a domain** (older accounts: **Add a site**).
3. Type "yourdomain.com" - the apex, with no "www" and no "https://".
4. Choose the **Free** plan and continue.
5. Cloudflare scans your existing DNS records and shows a list. Check that
   anything you rely on - especially MX records, if email runs on this domain -
   is present. Add anything missing before continuing.
6. Cloudflare now shows **two nameservers** that look like:

        anna.ns.cloudflare.com
        rick.ns.cloudflare.com

   They are randomly assigned, so yours will have different first names.
   Copy them both. Leave this browser tab open.

**In Squarespace:**

7. Log in at https://account.squarespace.com/domains
8. Click the domain.
9. In the left menu click **DNS**, then **DNS Settings**.
10. Find the **Nameservers** section and click **Use custom nameservers**
    (on some accounts this reads **Change nameservers**).
11. Delete the Squarespace nameservers listed there.
12. Paste in the two Cloudflare nameservers, one per row.
13. Click **Save**. Squarespace warns you that this moves DNS away from them -
    that is exactly what you are doing, so confirm.

**Back in Cloudflare:**

14. Click **Check nameservers now**. This usually completes within an hour and
    can take up to 24. Cloudflare emails you when the domain is active.
15. Once active, go to **Workers & Pages**, click the
    **mackay-consulting-services** project, then the **Custom domains** tab.
16. Click **Set up a custom domain**, enter "yourdomain.com", confirm.
    Cloudflare creates the record for you.
17. Repeat step 16 for "www.yourdomain.com".
18. TLS certificates are issued automatically, usually within a few minutes.

**Optional but recommended - pick one canonical address.** To send www to the
apex, go to the domain in Cloudflare, then **Rules -> Redirect Rules ->
Create rule**. If **Hostname equals** "www.yourdomain.com", then
**Dynamic redirect**, expression:

    concat("https://yourdomain.com", http.request.uri.path)

status **301**, with **Preserve query string** enabled.

### OPTION B - keep Squarespace DNS

Use this only if something else must stay on Squarespace's DNS.

**Important limitation:** most registrars, Squarespace included, cannot put a
CNAME record on an apex domain. The DNS specification does not allow a CNAME to
coexist with the SOA and NS records that must exist at the apex. That is why
the apex cannot point at Pages here, and why "www" has to be the real address
with the apex forwarded to it.

**In Cloudflare:**

1. **Workers & Pages -> mackay-consulting-services -> Custom domains ->
   Set up a custom domain**.
2. Enter "www.yourdomain.com". Cloudflare shows the CNAME target to create.

**In Squarespace:**

3. https://account.squarespace.com/domains -> click the domain -> **DNS** ->
   **DNS Settings**.
4. Under **Custom Records** click **Add Record**:

   | Field | Value |
   | ----- | ----- |
   | Host  | www |
   | Type  | CNAME |
   | Data  | mackay-consulting-services.pages.dev |
   | TTL   | leave default, or 3600 |

   "Data" must have **no** "https://" and **no** trailing slash.
5. Save.
6. Still in Squarespace, open the domain's **Domain Forwarding** (sometimes
   under **Advanced Settings**) and forward the apex "yourdomain.com" to
   "https://www.yourdomain.com" as a **Permanent (301)** redirect, with path
   forwarding enabled if it is offered.
7. Back in Cloudflare the custom domain moves from "Pending" to "Active" once
   it sees the CNAME, and the certificate is issued automatically.

### Verifying it worked

DNS changes are not instant. Nameserver changes (Option A) typically take
1-4 hours and are guaranteed within 48. A single CNAME change (Option B)
typically takes 5 minutes to 2 hours.

Easiest check: https://dnschecker.org - enter the domain, choose record type
**NS** for Option A or **CNAME** (with the www) for Option B, and watch the
map turn green as servers around the world pick up the change.

From a Mac or Linux terminal:

    dig NS yourdomain.com +short
    dig www.yourdomain.com +short
    curl -sI https://yourdomain.com | head -n 1

The first should list the Cloudflare nameservers (Option A). The second should
resolve towards pages.dev. The third should return "HTTP/2 200".

If your own browser still shows the old site after everything else has updated,
that is local DNS cache. On a Mac:

    sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

**Do not delete the domain from Squarespace.** It stays registered there and
must still be renewed there. You are only changing where DNS is answered.

---

## 9. Cloudflare Pages settings

Set once, when the project is created:

| Setting                | Value |
| ---------------------- | ----- |
| Production branch      | main |
| Framework preset       | None |
| Build command          | leave empty |
| Build output directory | / |
| Root directory         | leave empty |

Because there is no build step, "deploying" is simply copying the repository to
Cloudflare's edge network.

Every push to "main" publishes to production. Every push to any **other** branch
produces a private preview URL, which is a safe way to review a large change
before it goes live.

To roll back: **Workers & Pages -> the project -> Deployments**, find a previous
good deployment, and choose **Rollback to this deployment**.

---

## 10. Placeholders that must be replaced before launch

Search the repository for each of these.

| Placeholder | Where | Replace with |
| ----------- | ----- | ------------ |
| www.mackayconsulting.com | every page (canonical, Open Graph, JSON-LD), sitemap.xml, robots.txt | the real domain |
| info@mackayconsulting.com | contact page, footer, JSON-LD | the real enquiries address |
| REPLACE-WITH-YOUR-WEB3FORMS-ACCESS-KEY | contact/index.html | your Web3Forms key |
| [Director one/two/three full name] | our-people/index.html and its JSON-LD | real names |
| bracketed blanks inside the bios | our-people/index.html | real detail |
| +232 [telephone number] | contact page, footer | real number |
| [Street address] | contact page, footer, JSON-LD | real Freetown address |
| Registration number [number] | footer | the Sierra Leone registration number |
| placeholder SVGs | assets/img/ | real logo, favicon, portraits |
| missing woff2 files | assets/fonts/ | the four font files |

---

## 11. House rules for the copy

The company was incorporated in July 2026 and therefore has **no corporate
track record**. Donor procurement scores corporate experience separately from
key personnel experience, so the distinction is not cosmetic - overstating it
is a real disqualification risk.

**Never write:** "MCS has delivered", "our past projects", "we have completed",
"our clients include". **Never add** a Case Studies, Our Work, Projects or
Clients page.

**Write instead:** "Our directors have led...", "Our team brings experience
from...", "Collectively, our founders have delivered...".

Credibility lives in the bios on Our People, under each individual's own name.
That is the structural reason the site is shaped the way it is.

Tone: credible, established, institutional. The readers are procurement officers
and international firms scouting local partners.

---

## 12. Design system

| Role         | Hex     | Notes |
| ------------ | ------- | ----- |
| White ground | #FFFFFF | |
| Ivory ground | #F8F5EF | alternating bands |
| Gold         | #B08D3F | headings, rules, accents - 3.12:1 on white, **never** for body text |
| Deep gold    | #8A6D2C | 4.88:1 on white - the only gold permitted at small sizes |
| Sand         | #D9C7AE | blocks and dividers |
| Charcoal     | #16181D | all body text, 18.3:1 on white |

Type: **Playfair Display** (600/700) for headings, **Inter** (400/600) for body.

Rules baked into the CSS that should not be undone: text is left-aligned, never
centred; buttons are charcoal with white text, because gold buttons would fail
contrast; dividers are 1px gold rules; there are no gradients, no drop shadows
and no animation beyond a short fade; the logo lockup is wide and the header is
built around that.

Accessibility: semantic landmarks, visible focus rings, full keyboard
navigation, alt text on every image, and "prefers-reduced-motion" respected.

---

## 13. Licence

Copyright Mackay Consulting Services. All rights reserved.
