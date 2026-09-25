# EV Empire — Electric Scooter Website

> **"DRIVE A CLEANER TOMORROW"**
>
> A premium, production-ready electric scooter brand website built with Next.js, TypeScript, and Tailwind CSS.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OWNER_EMAIL=your-email@domain.com
RESEND_API_KEY=re_your_resend_api_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📧 Email Setup (Resend)

This website uses [Resend](https://resend.com) to send customer enquiries directly to the owner's email.

**Steps:**

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Create an API key in the Resend dashboard
3. Add the API key to `.env.local` as `RESEND_API_KEY`
4. Set your email address as `OWNER_EMAIL`

> **Note:** On the free Resend plan, the `from` address is `onboarding@resend.dev`. To use a custom `from` address (e.g. `enquiries@evempire.in`), verify your domain in the Resend dashboard and update `src/lib/email.ts`.

---

## 🖼️ Replacing Scooter Images

Place your actual product images in:

```
public/images/
```

Expected filenames:

| Model | Filename |
|-------|----------|
| EP40  | `ep40.png` (or `.jpg`, `.webp`) |
| EP50  | `ep50.png` |
| EP60  | `ep60.png` |
| ED40  | `ed40.png` |
| ED50  | `ed50.png` |
| ED60  | `ed60.png` |
| EF60  | `ef60.png` |
| EC60  | `ec60.png` |

After replacing, update the image extension in `src/data/products.ts` if needed (currently `.webp` is configured but the app falls back to `.png`).

---

## 📦 Updating Products & Prices

All product data is stored in one place:

```
src/data/products.ts
```

To update a price, find the relevant product and change the `price` field:

```ts
{
  slug: 'ep40',
  model: 'EP40',
  price: 44990,  // ← Change this
  ...
}
```

To add a new model, add a new entry to the `products` array following the same structure.

---

## 📁 Project Structure

```
src/
  app/
    layout.tsx          — Root layout (font, metadata, Navbar, Footer)
    page.tsx            — Homepage
    globals.css         — Global styles & design tokens
    products/
      page.tsx          — Products listing page
      [slug]/
        page.tsx        — Individual product detail page
    about/
      page.tsx          — About EV Empire page
    contact/
      page.tsx          — Contact & enquiry page
    api/
      enquiry/
        route.ts        — Server-side email API (POST)
    sitemap.ts          — Auto-generated sitemap
    robots.ts           — robots.txt

  components/
    Navbar.tsx          — Sticky responsive navigation
    Hero.tsx            — Cinematic homepage hero
    ProductCard.tsx     — Individual product card
    ProductGrid.tsx     — Products organized by family
    ProductSpecs.tsx    — Full product detail with specs grid
    ProductComparison.tsx — Interactive model comparison
    FeatureSection.tsx  — Why EV Empire feature cards
    EnvironmentSection.tsx — Sustainability/eco section
    ContactSection.tsx  — Contact info + enquiry form wrapper
    EnquiryForm.tsx     — Validated enquiry form
    Footer.tsx          — Site footer

  data/
    products.ts         — All product data (source of truth)

  lib/
    email.ts            — Server-side Resend email utility
    validation.ts       — Zod enquiry schema

  types/
    product.ts          — Product TypeScript types
    enquiry.ts          — Enquiry TypeScript types

public/
  images/               — Product and hero images
```

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, products, features, comparison, contact |
| `/products` | Full product listing with family sections |
| `/products/ep40` | EP40 detail page |
| `/products/ep50` | EP50 detail page |
| `/products/ep60` | EP60 detail page |
| `/products/ed40` | ED40 detail page |
| `/products/ed50` | ED50 detail page |
| `/products/ed60` | ED60 detail page |
| `/products/ef60` | EF60 detail page |
| `/products/ec60` | EC60 detail page |
| `/about` | About EV Empire |
| `/contact` | Contact & enquiry form |
| `/contact?model=EP60` | Pre-selects EP60 in enquiry form |
| `/api/enquiry` | POST — enquiry submission API |

---

## 🔒 Security

- API keys and email credentials are **server-side only** via environment variables
- The enquiry API route uses Zod schema validation
- Honeypot field provides basic bot protection
- API routes are blocked from web crawlers via `robots.ts`
- Ready to add CAPTCHA (e.g. Cloudflare Turnstile) in `EnquiryForm.tsx`

---

## ✏️ Content Placeholders

The following content needs to be replaced with real business information:

1. **Contact details** in `Footer.tsx` and `ContactSection.tsx`:
   - Phone number
   - WhatsApp number
   - Email address
   - Business address
   - Business hours

2. **About page** (`src/app/about/page.tsx`):
   - Company story/background (look for `[PLACEHOLDER]` comments)

3. **Domain** (`src/app/layout.tsx`):
   - Update `metadataBase` from `https://evempire.in` to your actual domain

4. **OG image** (`public/images/og-image.png`):
   - Add a 1200×630 Open Graph image for social sharing

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## 📋 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| React Hook Form | Form management |
| Zod | Validation |
| Resend | Email delivery |
| Lucide React | Icons |

---

© 2025 EV Empire. All rights reserved.
