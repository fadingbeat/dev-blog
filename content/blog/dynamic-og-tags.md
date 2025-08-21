---
title: Dynamic OG Tags for React SPA on Vercel with Serverless and Vite
date: 2025-06-03 # Based on Medium article's publish date
excerpt: A guide to implementing dynamic Open Graph (OG) tags for a React Single Page Application (SPA) hosted on Vercel, leveraging Serverless rendering with Vite.
author: Nikolina Požega
authorBio: 'Nikolina is a passionate front-end developer and a technical writer with a focus on problem-solving and debugging. She loves sharing her knowledge with the community.'
authorImage: '/images/nikolina.png' # Optional: Path to author's avatar image
authorSocial:
  linkedin: 'nikolina-pozega'
  github: 'fadingbeat'
  website: 'nikolina.dev'
---

## The Problem

When you build a React SPA, the HTML document is usually empty except for a root `div` where your React app gets mounted. This means that social media crawlers (like Facebook, Twitter, LinkedIn) that look for Open Graph (OG) tags in the `head` of your HTML document will find nothing.

The OG tags are crucial for how your content appears when shared on social media — including the title, description, and an image thumbnail. Without them, your shared links will look bland, hurting click-through rates and engagement.

### Why is this hard?

React SPAs are built using client-side rendering (CSR). This means the browser fetches a minimal HTML file, then downloads and executes JavaScript to build the rest of the page. Social media crawlers, however, typically only read the initial HTML served by the server and do not execute JavaScript. Therefore, any dynamic meta tags added by your JavaScript after the initial load are invisible to them.

## The Solution

The most robust way to address this is by implementing Server-Side Rendering (SSR) for your OG tags. This involves a server preprocessing each page request, injecting the correct OG tags into the HTML `head` before sending it to the client.

For a React SPA hosted on Vercel, we can achieve this using a serverless function that acts as a proxy.

## Setting up the Project

Stack: React + Vite (CSR) for the app, Vercel Serverless/Edge Function for prerendering OG tags, and vercel.json custom routes to wire it all together.

#### Step 1: Create the Vite App

```bash
npm create vite@latest my-spa -- --template react
cd my-spa
npm i
```

#### Step 2: Add Placeholder Meta Tags in index.html

We’ll inject real values at request time, so the HTML ships with placeholders:

```html
<!-- index.html -->
<head>
  <meta property="og:title" content="__OG_TITLE__" />
  <meta property="og:description" content="__OG_DESCRIPTION__" />
  <meta property="og:image" content="__OG_IMAGE__" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="__OG_TITLE__" />
  <meta name="twitter:description" content="__OG_DESCRIPTION__" />
  <meta name="twitter:image" content="__OG_IMAGE__" />
  <title>__TITLE__</title>
</head>
```

Keywords: _placeholders, SSR injection, non-JS crawlers_.

#### Step 3: The SSR Function (Edge-Friendly)

Create `api/ssrOG.ts` (or .js).

```javascript
// api/ssrOG.ts
export const config = { runtime: 'edge' };

type OGEntry = {
  title: string,
  description: string,
  image: string, // absolute URL (required for crawlers)
  ogTitle?: string, // optional override
};

const OG_MAP: Record<string, OGEntry> = {
  '/': {
    title: 'Home | My SPA',
    description: 'Welcome to my React + Vite SPA.',
    image: 'https://example.com/og/home.png',
    ogTitle: 'My SPA — home',
  },
  '/work': {
    title: 'Work | My SPA',
    description: 'Selected work and projects.',
    image: 'https://example.com/og/work.png',
  },
  '/blog': {
    title: 'Blog | My SPA',
    description: 'Articles on React, Vite, and debugging.',
    image: 'https://example.com/og/blog.png',
  },
};

const DEFAULTS: OGEntry = {
  title: 'My SPA',
  description: 'React + Vite app',
  image: 'https://example.com/og/default.png',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname; // e.g. "/blog/my-post"
  const route = normalize(path); // e.g. "/blog"
  const data = OG_MAP[route] ?? DEFAULTS;

  // Fetch the built index.html that Vercel serves statically.
  const base = url.origin; // current deployment origin
  const htmlRes = await fetch(`${base}/index.html`);
  let html = await htmlRes.text();

  // Fill placeholders safely (global replace).
  html = html
    .replace(/__TITLE__/g, data.title)
    .replace(/__OG_TITLE__/g, data.ogTitle ?? data.title)
    .replace(/__OG_DESCRIPTION__/g, data.description)
    .replace(/__OG_IMAGE__/g, data.image);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function normalize(pathname: string) {
  // Map nested routes to their section root for OG purposes
  // e.g. "/blog/my-post" -> "/blog"
  const parts = pathname.split('/').filter(Boolean);
  return parts.length ? `/${parts[0]}` : '/';
}
```

Keywords: _edge runtime, route parsing, placeholder replacement, absolute og:image URL_.

### Routing with vercel.json rules

The most fragile bit is routing order. You must:

- Let API routes work (/api/...)

- Serve static assets normally (JS/CSS/images/fonts)

- Send SPA routes (no file extension) to the SSR OG function

Example vercel.json

```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },

    {
      "src": "/(.*\\.(?:js|css|png|jpg|jpeg|gif|svg|webp|mp4|webm|woff|woff2|ttf|otf|eot|ico|xml|txt|pdf|zip|rar|json|webmanifest))$",
      "continue": true
    },

    { "src": "/[^.]+", "dest": "/api/ssrOG" },
    { "src": "/", "dest": "/api/ssrOG" }
  ]
}
```

## Why This Order Matters (Gotchas)

- /api/(.\*) first → prevents the “catch-all” from swallowing your existing API (e.g., contact forms, webhooks).

- Static asset pass-through with "continue": true → avoids rewriting JS/CSS/image requests to the SSR function (which would break the app).

- Catch-all for “no dot” paths (/[^.]+) → targets SPA routes (URLs without a file extension) so deep links like /blog/my-post hit api/ssrOG.

- Root / rule → ensures the homepage is also SSR-injected.

Biggest issue I hit: a previous “rewrite everything to /index.html” rule (common for SPAs) broke API endpoints and/or hijacked static files. The fix was rearranging rules and adding the asset continue rule above the SPA catch-all. Order is everything.

Keywords: _route precedence, catch-all, asset passthrough, API passthrough, extensionless routes, continue_.

#### Optional: Dev/Preview Tips

Use LinkedIn Post Inspector, Facebook Sharing Debugger, and Twitter Card Validator to force recrawls and verify OG fields.

Ensure `og:image` is absolute and publicly accessible (no auth).

If you generate per-post images, consider a separate image service (serverless or edge) and point og:image at it.

Keywords: _recrawl, cache invalidation, absolute URL, image CDN_.

#### Recap

- Put placeholder OG tags in index.html.

- Build an Edge/Serverless function that reads index.html, injects meta based on route, and returns HTML.

- Configure vercel.json so API routes and static files are untouched, while SPA routes hit your SSR function.

## Final Thoughts

One of the most valuable lessons I learned in this process is that every configuration rule has a purpose. It’s tempting to copy-paste snippets from StackOverflow or GitHub discussions when something doesn’t work, but blindly applying rules can lead to more problems down the road.

When you add a rewrite, redirect, or header in your configuration, you should always ask:

- _Why is this rule here?_
- _What problem does it solve?_
- _What will break if I remove or change it later?_

By understanding the _why_ behind each piece of config, you make future debugging much easier. When something needs to change—like adding translations, new routes, or improving SEO—you’ll know which part of your setup to adjust without fear of breaking unrelated functionality.

In short: treat your config like code. Document it, understand it, and evolve it as your project grows. That way, you stay in control instead of fighting mysterious behavior caused by rules you no longer remember adding.

---

👉 Need help in setting up OG Meta Tags for each route? Visit [VibeIT](https://www.vibeit.hr/en), or [Contact Me](https://www.vibeit.hr/en/contact) directly.
