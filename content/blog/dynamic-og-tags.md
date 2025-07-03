---
title: Dynamic OG Tags for React SPA on Vercel with SSR and Vite
date: 2025-06-03 # Based on Medium article's publish date
excerpt: A guide to implementing dynamic Open Graph (OG) tags for a React Single Page Application (SPA) hosted on Vercel, leveraging Server-Side Rendering (SSR) with Vite.
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

### Setting up the Project

To illustrate, we’ll use a simple React project bootstrapped with Vite.
