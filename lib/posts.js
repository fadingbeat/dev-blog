// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html'; // Renamed to avoid conflict if 'html' was used elsewhere
import remarkGfm from 'remark-gfm'; // Renamed to avoid conflict if 'gfm' was used elsewhere
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Define the path to your blog content directory
const postsDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Gets the data for all blog posts.
 * @returns {Array} An array of post metadata, sorted by date.
 */
function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id (slug)
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Gets the full content and data for a single blog post by its ID (slug).
 * @param {string} id The ID (slug) of the post.
 * @returns {Promise<object>} The full post data including HTML content.
 */
async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm) // Use the imported 'remarkGfm'
    .use(remarkHtml, { sanitize: false }) // Use the imported 'remarkHtml'
    .use(rehypeSlug) // Use the imported 'rehypeSlug'
    .use(rehypeAutolinkHeadings) // Use the imported 'rehypeAutolinkHeadings'
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

/**
 * Gets all possible post IDs (slugs) for dynamic routing.
 * @returns {Array} An array of objects with 'params.id'.
 */
function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Use ES Module exports
export { getSortedPostsData, getPostData, getAllPostIds };
