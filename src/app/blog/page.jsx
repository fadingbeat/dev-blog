// src/app/blog/page.jsx

// Note: For App Router, you typically don't need 'import React from 'react';'
// as the new JSX runtime handles it. If you encounter errors later, add it back.

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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPostsData.map(({ id, date, title, excerpt }) => (
          <article
            key={id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blog/${id}`} className="block">
              <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                {title}
              </h2>
            </Link>
            {/* Using format for date (ensure date-fns is installed: npm install date-fns) */}
            <time dateTime={date} className="text-gray-500 text-sm mb-4 block">
              {format(new Date(date), 'LLLL d, yyyy')}
            </time>
            {excerpt && (
              <p className="text-gray-700 text-base mb-4">{excerpt}</p>
            )}
            <Link
              href={`/blog/${id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Read more
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
