// src/app/blog/[id]/page.jsx

import { getPostData, getAllPostIds } from '../../../../lib/posts';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'; // Although you're using dangerouslySetInnerHTML here, ReactMarkdown is imported.
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostData(id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title + ' - VibeIt Blog',
    description: post.excerpt && post.author,
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    notFound();
  }

  const blogPostUrl = `https://yourblog.com/blog/${post.id}`;

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {/* "Back to Blog" Link */}
      <div className="mb-6">
        <Link
          href="/blog"
          // Light: brand-primary-600, Dark: brand-primary-400
          className="text-brand-primary-600 hover:text-brand-primary-800 dark:text-brand-primary-400 dark:hover:text-brand-primary-200 font-nav flex items-center"
        >
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

      {/* Main Title */}
      <h1 className="text-4xl font-bold mb-4 text-brand-primary-950 dark:text-brand-primary-300 font-display">
        {post.title}
      </h1>

      {/* Read Time */}
      {post.readTimeMinutes && (
        <p className="text-brand-primary-500 dark:text-brand-primary-400 text-sm mb-6">
          {post.readTimeMinutes} min read
        </p>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-brand-primary-500 dark:text-brand-primary-400 mb-4 italic">
          {post.excerpt}
        </p>
      )}

      {/* Published Date */}
      <time
        dateTime={post.date}
        className="text-brand-primary-500 dark:text-brand-primary-400 text-sm mb-8 block"
      >
        Published on {format(new Date(post.date), 'LLLL do, yyyy')}
      </time>

      {/* Author */}
      {post.author && (
        <p className="text-brand-primary-500 dark:text-brand-primary-400 text-sm mb-6">
          By{' '}
          <span className="font-semibold text-brand-highlight-600 dark:text-brand-highlight-300">
            {post.author}
          </span>
        </p>
      )}

      {/* Main Content Area (Markdown) */}
      {/* THIS IS THE MOST IMPORTANT PART FOR MARKDOWN STYLING */}
      <div className="prose lg:prose-xl max-w-none prose-brand-light dark:prose-brand-dark font-body">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>

      {/* Share this post section */}
      <div className="mt-10 pt-6 border-t border-brand-background-light-200 dark:border-brand-background-dark-700">
        <h3 className="text-xl font-semibold mb-3 text-brand-primary-500 dark:text-brand-primary-400">
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
            className="bg-brand-highlight-500 text-brand-primary-200 px-4 py-2 rounded hover:bg-brand-highlight-600 transition-colors"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              blogPostUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-brand-highlight-500 text-brand-primary-200 font-medium text-sm hover:bg-brand-highlight-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Facebook
          </a>
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
            className="inline-flex items-center px-4 py-2 rounded-md bg-brand-highlight-500 text-brand-primary-200 font-medium text-sm hover:bg-brand-highlight-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Author Bio Section */}
      {(post.author ||
        post.authorBio ||
        post.authorImage ||
        (post.authorSocial &&
          (post.authorSocial.twitter || post.authorSocial.linkedin))) && (
        <div className="mt-10 pt-6 border-t border-brand-primary-200 dark:border-brand-primary-700">
          <div className="flex items-center space-x-4">
            {post.authorImage && (
              <img
                src={post.authorImage}
                alt={post.author || 'Author'}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary-500 dark:border-brand-primary-400"
              />
            )}
            <div>
              {post.author && (
                <h3 className="text-xl font-semibold text-brand-highlight-800 dark:text-brand-highlight-300">
                  {post.author}
                </h3>
              )}
              {post.authorBio && (
                <p className="text-brand-primary-600 dark:text-brand-primary-400 mt-1 text-sm">
                  {post.authorBio}
                </p>
              )}
              {post.authorSocial && (
                <div className="flex space-x-3 mt-2">
                  {post.authorSocial.website && (
                    <a
                      href={`https://${post.authorSocial.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-highlight-500 hover:text-brand-highlight-600 dark:text-brand-highlight-400 dark:hover:text-brand-highlight-300 text-sm font-nav"
                    >
                      Portfolio
                    </a>
                  )}
                  {post.authorSocial.github && (
                    <a
                      href={`https://github.com/${post.authorSocial.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-highlight-500 hover:text-brand-highlight-600 dark:text-brand-highlight-400 dark:hover:text-brand-highlight-300 text-sm font-nav"
                    >
                      GitHub
                    </a>
                  )}
                  {post.authorSocial.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${post.authorSocial.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-highlight-500 hover:text-brand-highlight-600 dark:text-brand-highlight-400 dark:hover:text-brand-highlight-300 text-sm font-nav"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
