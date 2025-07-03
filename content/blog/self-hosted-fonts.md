---
title: How Self Hosted Fonts Can Fix Your LCP Score
date: 2025-07-03
excerpt: In this guide, we dive into how fonts contribute to layout instability, and walk you through optimizing performance with self-hosted fonts. Fewer shifts. Faster loads. Better UX.
author: Nikolina Požega
authorBio: 'Nikolina is a passionate front-end developer and a technical writer with a focus on problem-solving and debugging. She loves sharing her knowledge with the community.'
authorImage: '/images/nikolina.png' # Optional: Path to author's avatar image
authorSocial:
  linkedin: 'nikolina-pozega'
  github: 'fadingbeat'
  website: 'nikolina.dev'
---

### 1. Introduction: Understanding Layout Shift and LCP

When measuring website performance, especially on mobile, Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) are key Core Web Vitals. A high LCP (e.g., 5 seconds) can hurt SEO and frustrate users. Layout shifts can delay the appearance of the main content, making the page feel sluggish or unstable.

In many cases, the culprit is surprisingly simple: web fonts.

### 2. Common Causes of Layout Shift

- Delayed font rendering (FOIT – Flash of Invisible Text)

- Fallback-to-custom font swap (FOUT – Flash of Unstyled Text)

- Late-loading animations or images

- No height reserved for content (e.g. Lottie animations, hero banners)

If your hero section shows up first, but fonts swap in after a second or two — you're likely causing layout shift.

### 3. How Fonts Cause Layout Shift

When using services like Google Fonts, the browser initially renders content with a fallback font, then swaps in the actual web font once downloaded. This swap changes spacing and pushes elements around — leading to layout shift.

Even using `font-display: swap` helps perceived performance, but doesn’t fully prevent layout shift.

### 4. Ways to Load Fonts — And Their Impact

#### Option A: Google Fonts (default)

`<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">`

Easy to use, but introduces third-party requests, layout shift, and delays.

#### Option B: fontsource package (via npm)

`import '@fontsource/poppins/400.css';`

`import '@fontsource/poppins/500.css';`

Better than Google Fonts in terms of control, but adds CSS to bundle and still not ideal if full subset isn’t used.

#### Option C: Self-hosted fonts (recommended)

This gives full control, reduces layout shift, and improves LCP.

### 5. The Optimal Approach: Self-Hosted Fonts

#### Step 1: Get Your Fonts

Use [Transfonter](https://transfonter.org/):

- Upload your .ttf files or generate them via Google Fonts download

- Select only needed weights (e.g., 400, 500, 700)

- Choose subsets: Latin + Latin-ext (important for non-English characters like Č, Ć, Ž)

- Choose formats: .woff2 (modern) and .woff (fallback)

- Enable font-display: swap

- Download the ZIP

#### Step 2: Place Fonts in Your Public Folder

Example structure:

/public/fonts/Poppins-Regular.woff2

/public/fonts/Poppins-Medium.woff2

#### Step 3: Create a CSS file (fonts.css)

```css
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

```@font-face {
  font-family: 'Poppins';
  src: url('/fonts/Poppins-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

Then import in your app:

`import '../styles/fonts.css';`

### 6. Testing the Results

Use these tools:

- Chrome DevTools → Performance tab → Record page load

- Lighthouse / PageSpeed Insights → See updated LCP & CLS scores

- WebPageTest → Analyze layout shifts frame by frame

Watch for:

- No font fallback flashing

- No layout shift when fonts load

- LCP under 2.5s (for good mobile experience)

#### Final Thoughts

Fonts aren't just about aesthetics — they cary performance power move if implemented correctly. With minimal effort, you eliminate layout shifts, speed up your LCP, and provide a visually stable experience from the first render.

This one optimization could shave over a second from your LCP. Try it today and say goodbye to flash, flicker, and frustration.
