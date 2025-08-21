---
title: Overcoming Real-World Coding Challenges in Web Development
date: 2025-08-11
excerpt: A behind-the-scenes look at the biggest technical hurdles I’ve faced in building and optimizing my website, and how I solved them.
author: Nikolina Požega
authorBio: 'Nikolina is a passionate front-end developer and a technical writer with a focus on problem-solving and debugging. She loves sharing her knowledge with the community.'
authorImage: '/images/nikolina.png'
authorSocial:
  linkedin: 'nikolina-pozega'
  github: 'fadingbeat'
  website: 'nikolina.dev'
---

### 1. Introduction: Why Real-World Dev Problems Matter

Web development isn’t just about code that runs. It’s about creating sites that are fast, discoverable, and enjoyable to use. Over the past months, I’ve solved a range of technical challenges, from SEO headaches to serverless metadata generation. Here’s what I learned.

---

### 2. Serving Responsive Images with Cloudinary

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Make images crisp on all devices without slowing load times.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> I integrated `Cloudinary` to deliver responsive images based on screen size, cutting bandwidth use and improving mobile performance without losing quality.

---

### 3. Configuring Direct Link Access on Vercel

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Getting direct links to work for SPA sections without SEO issues.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Tweaked Vercel routing, redirection, and `index.html` handling until both users and search engines could reach every page without errors.

---

### 4. SEO Optimization Beyond PageSpeed Scores

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Maxing out PageSpeed and Google Search Console scores but not seeing ranking jumps.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Expanded SEO efforts to include backlinks, internal linking, and fresh content by adding a blog and linking to my portfolio.

---

### 5. Fixing the Canonical Tag Issue

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> SPA sections each had their own canonical URLs — flagged as an issue in PageSpeed Insights.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Kept canonical URLs only for important sections (_Services_, _Contact_), removed the rest, and paused deeper optimization until needed.

---

### 6. Reducing Load Times with Critical CSS

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Hero title font loaded slowly, creating a visible delay.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Added `critical CSS` and other tweaks to shave off load time. Even small gains improved perceived speed.

---

### 7. Generating Dynamic OG Tags with Serverless Functions

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Each SPA section needed unique metadata for better social sharing.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Built `Vercel serverless function` to dynamically generate Open Graph tags per section. Took a few days of trial and error, but now works seamlessly.

---

### 8. Debugging 404 Errors Efficiently

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Occasional 404s and misconfigurations.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Developed a clear process to identify causes quickly and fix them without guesswork.

---

### 9. Enhancing UX with Animations

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> The site felt too static.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Added smooth `Framer` animations and a `Lottie` graphic to the Hero section for a more engaging first impression.

---

### 10. Hosting Fonts Locally for Better Performance

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Third-party fonts slowed LCP and could impact privacy.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Switched to `self-hosted fonts`, reducing layout shift and improving Largest Contentful Paint scores.

---

### 11. Adding English Translation with a Language Switch

<span style="background-color:#9f7fff; color:#fff; padding:2px 6px; border-radius:4px;">**Challenge:**</span> Make the site accessible to English-speaking users without a full domain setup.  
<span style="background-color:#4cafef; color:#fff; padding:2px 6px; border-radius:4px;">**Solution:**</span> Implemented a simple language switch to toggle between Croatian and English. Used `i18next` for translation. In the future, I plan to launch a dedicated `.tech` domain for the English version.

---

### 12. Key Takeaways for Web Developers

- Technical SEO is more than green scores — content and connections matter.
- Small performance tweaks stack up to big improvements.
- Serverless functions are powerful for dynamic, SEO-friendly content.
- Knowing when “good enough” is better than perfect keeps projects moving.

Every challenge was a chance to improve my skills and processes. The more problems I solved, the faster and more confident I became in tackling the next one.

🚀 Looking for someone who solves tough problems fast? Check out [VibeIT](https://www.vibeit.hr/en), or [contact me](https://www.vibeit.hr/en/contact) directly.
