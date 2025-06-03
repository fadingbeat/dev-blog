// src/app/blog/[id]/page.jsx

// Note: For App Router, you typically don't need 'import React from 'react';'
// as the new JSX runtime handles it. If you encounter errors later, add it back.

import { getPostData, getAllPostIds } from '../../../../lib/posts'; // Your JS utility file
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
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
    description: post.excerpt || post.title,
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

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">{post.title}</h1>
      <time dateTime={post.date} className="text-gray-500 text-sm mb-8 block">
        Published on {format(new Date(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="prose lg:prose-xl max-w-none">
        {' '}
        {/* Apply Tailwind Prose for default styles */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom components for Markdown rendering (e.g., code blocks, images)
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={solarizedlight} // Apply your chosen style
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // You can add more custom components for images, links, etc.
            // For example, to use Next.js Image component for optimization:
            // img: ({node, ...props}) => <Image src={props.src} alt={props.alt || ''} width={700} height={400} className="rounded-lg my-4" />
          }}
        >
          {post.contentHtml}
        </ReactMarkdown>
      </div>
    </article>
  );
}
