// src/app/blog/[id]/page.jsx

// Note: For App Router, you typically don't need 'import React from 'react';'
// as the new JSX runtime handles it. If you encounter errors later, add it back.

import { getPostData, getAllPostIds } from '../../../../lib/posts'; // Your JS utility file
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link'; // Import Link component
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // For code highlighting
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

// Dynamic Metadata Generation for SEO
// Note: 'params' object is passed directly, no type annotation needed.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostData(id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title + ' - VibeIt Blog',
    description: post.excerpt && post.author,
    // Add Open Graph, Twitter cards if needed for social sharing
    // openGraph: { images: ['/some-image.jpg'] },
  };
}

// Generate static paths for all blog posts at build time (SSG)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// Main component for the blog post page
// Note: 'params' object is passed directly, no type annotation needed.
export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    notFound(); // Render 404 page if post not found
  }

  const blogPostUrl = `https://yourblog.com/blog/${post.id}`;

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {/* "Back to Blog" Link */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          {/* You can use an SVG icon for an arrow or similar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 transform rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Back to All Posts
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-blue-700">{post.title}</h1>
      {post.readTimeMinutes && (
        <p className="text-gray-500 text-sm mb-6">
          {post.readTimeMinutes} min read
        </p>
      )}
      {post.excerpt && ( // Conditionally render excerpt if it exists
        <p className="text-lg text-gray-400 mb-4 italic">{post.excerpt}</p>
      )}
      <time dateTime={post.date} className="text-gray-500 text-sm mb-8 block">
        Published on {format(new Date(post.date), 'LLLL d, yyyy')}
      </time>
      {post.author && ( // Conditionally render author if it exists
        <p className="text-gray-500 text-sm mb-6">
          By <span className="font-semibold text-blue-400">{post.author}</span>
        </p>
      )}
      <div className="prose lg:prose-xl max-w-none">
        {' '}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
      <div className="mt-10 pt-6 border-t border-gray-700">
        <h3 className="text-xl font-semibold mb-3 text-white">
          Share this post
        </h3>
        <div className="flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(
              `https://yourblog.com/blog/${post.id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
          >
            Twitter
          </a>
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              blogPostUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14 10H12V8H14C15.66 8 17 6.66 17 5V3H14V5C14 5.55 13.55 6 13 6H11V18H14V10Z"></path>
            </svg>
            Facebook
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              blogPostUrl
            )}&title=${encodeURIComponent(
              post.title
            )}&summary=${encodeURIComponent(
              post.excerpt || ''
            )}&source=${encodeURIComponent('VibeIt Blog')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-700 text-white font-medium text-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-7.859c0-1.747-0.661-2.935-2.185-2.935c-1.181 0-1.892 0.796-2.204 1.562c-0.115 0.274-0.158 0.655-0.158 1.037v7.855H9.278s0.02-9.186 0-10.157h3.554v1.503h0.048c0.468-0.785 1.294-1.611 3.414-1.611c2.316 0 4.044 1.524 4.044 4.73v7.84H20.447zM5.009 7.275c-1.442 0-2.348-0.916-2.348-2.091c0-1.176 0.906-2.092 2.348-2.092c1.443 0 2.349 0.916 2.349 2.092c0 1.175-0.906 2.091-2.349 2.091zM6.877 20.452H3.12V10.295h3.757V20.452z"></path>
            </svg>
            LinkedIn
          </a>
          {/* Add more buttons for other platforms */}
        </div>
      </div>

      {/* Author Bio Section */}
      {/* Conditionally render this entire section only if author data exists */}
      {(post.author ||
        post.authorBio ||
        post.authorImage ||
        (post.authorSocial &&
          (post.authorSocial.twitter || post.authorSocial.linkedin))) && (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {post.authorImage && (
              // Using a simple <img> tag. For Next.js Image optimization,
              // you would import { default as NextImage } from 'next/image';
              // and use <NextImage src={post.authorImage} alt={post.author || 'Author'} width={64} height={64} ... />
              <img
                src={post.authorImage}
                alt={post.author || 'Author'}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
            )}
            <div>
              {post.author && (
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.author}
                </h3>
              )}
              {post.authorBio && (
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  {post.authorBio}
                </p>
              )}
              {/* Optional: Author Social Links */}
              {post.authorSocial && (
                <div className="flex space-x-3 mt-2">
                  {post.authorSocial.website && (
                    <a
                      href={`https://${post.authorSocial.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Portfolio
                    </a>
                  )}
                  {post.authorSocial.github && (
                    <a
                      href={`https://github.com/${post.authorSocial.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {post.authorSocial.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${post.authorSocial.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                  {/* Add more social links as needed, e.g., GitHub */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
