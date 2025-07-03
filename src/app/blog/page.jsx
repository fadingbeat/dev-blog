// src/app/blog/page.jsx

import { getSortedPostsData } from '../../../lib/posts'; // Your JS utility file
import Link from 'next/link';
import { format } from 'date-fns'; // For date formatting

// Metadata export for SEO
export const metadata = {
  title: 'Our Blog - VibeIt',
  description: 'The latest news and insights from VibeIt.',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    // The <main> element's background will be set by the <body> in layout.jsx.
    <main className="container mx-auto px-4 py-8">
      {/* Page Title */}
      {/* Updated with theme-aware colors and font */}
      <h1 className="text-4xl font-bold mb-12 text-brand-primary-900 dark:text-brand-primary-300 text-center font-display">
        Latest Blog Posts
      </h1>

      {/* Grid for Blog Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPostsData.map(({ id, date, title, excerpt }) => (
          <article
            key={id}
            // Blog Card Styling
            // Light Theme: light background, subtle border, darker shadow
            // Dark Theme: darker background, subtle border, lighter shadow
            className="p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 ease-in-out
                       bg-brand-background-light-100 dark:bg-brand-background-dark-900
                       border border-brand-background-light-200 dark:border-brand-background-dark-700
                       shadow-brand-background-light-300 hover:shadow-brand-background-light-400
                       dark:shadow-brand-background-dark-950 dark:hover:shadow-brand-background-dark-800
                       transform hover:scale-105"
          >
            <Link href={`/blog/${id}`} className="block">
              {/* Card Title */}
              {/* Updated with theme-aware colors and font */}
              <h2
                className="text-2xl font-semibold mb-2 
                           text-brand-primary-800 hover:text-brand-primary-900 
                           dark:text-brand-primary-100 dark:hover:text-brand-primary-50 font-body"
              >
                {title}
              </h2>
            </Link>

            {/* Date */}
            {/* Updated with theme-aware colors */}
            <time
              dateTime={date}
              className="text-brand-primary-500 dark:text-brand-primary-200 text-sm mb-4 block"
            >
              {format(new Date(date), 'LLLL do, yyyy')}{' '}
              {/* Corrected date format */}
            </time>

            {/* Excerpt */}
            {excerpt && ( // This condition already handles the rendering
              // REMOVED THE EXTRA CURLY BRACES {} HERE
              <p className="text-brand-primary-700 dark:text-brand-primary-100 text-base mb-4">
                {excerpt}
              </p>
            )}

            {/* Read More Link */}
            {/* Updated with theme-aware colors and font */}
            <Link
              href={`/blog/${id}`}
              className="text-brand-highlight-600 hover:text-brand-highlight-800 
                         dark:text-brand-highlight-400 dark:hover:text-brand-highlight-300 
                         font-nav text-sm inline-block mt-2"
            >
              Read more →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
