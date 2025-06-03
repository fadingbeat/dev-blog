# Developer Blog (Next.js & Markdown)

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)

---

## 🚀 Overview

This repository hosts the Developer Blog, a modern, blazing-fast, and SEO-friendly static blog application. It's built with **Next.js 14+ (App Router)** for robust routing and server-side capabilities, **Tailwind CSS** for rapid and consistent styling, and uses **Markdown** for easy content management.

This project is configured purely with **JavaScript/JSX** to provide a straightforward development experience without the complexities of TypeScript.

## ✨ Features

- **Static Site Generation (SSG):** Blog posts are pre-rendered at build time for lightning-fast load times and excellent SEO.
- **Markdown-Driven Content:** Easily create and manage blog posts using simple Markdown files.
- **Dynamic Routing:** Each blog post has its own unique, SEO-friendly URL.
- **Tailwind CSS:** Fully integrated for utility-first styling, ensuring a clean and customizable design.
- **Code Highlighting:** Beautiful syntax highlighting for code blocks within your Markdown posts using `react-syntax-highlighter`.
- **Flexible Content Structure:** Utilizes YAML front matter for post metadata (title, date, excerpt, etc.).
- **Pure JavaScript/JSX:** Developed entirely in JavaScript for simplicity and broader accessibility.

## 📦 Technologies Used

- **Next.js 14+ (App Router):** React framework for production.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework.
- **`remark` & ecosystem:** For parsing Markdown and converting it to HTML.
  - `remark-gfm`: GitHub Flavored Markdown support.
  - `remark-html`: Converts Markdown to HTML.
  - `rehype-slug`, `rehype-autolink-headings`: For creating anchor links on headings.
- **`gray-matter`:** For parsing YAML front matter from Markdown files.
- **`date-fns`:** For easy and robust date formatting.
- **`react-syntax-highlighter`:** For syntax highlighting of code blocks.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/fadingbeat/dev-blog.git](https://github.com/fadingbeat/dev-blog.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    # yarn dev
    ```

4.  **Open in your browser:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will hot-reload as you make changes.

## ✍️ How to Add a New Blog Post

Adding a new post is straightforward:

1.  **Navigate to the `content/blog/` directory:**
    `dev-blog/content/blog/`

2.  **Create a new Markdown file (`.md`):**

    - Name your file using hyphens and lowercase letters (e.g., `my-new-awesome-article.md`). This filename will become the URL slug for your post.

3.  **Add YAML Front Matter and Markdown content:**
    Each post must start with YAML front matter (metadata) enclosed by `---` lines, followed by your Markdown content.

    ````markdown
    ---
    title: Your New Blog Post Title Here
    date: 2025-07-20 # Use YYYY-MM-DD format
    excerpt: A concise summary of your post for display on the blog list.
    author: Your Name # Optional custom field
    tags: [nextjs, blog, new-features] # Optional array of tags
    ---

    ## Introduction to Your New Post

    This is where the main content of your blog post begins. You can use standard Markdown syntax here.

    ### Subheadings

    - Lists are easy.
    - Code blocks with syntax highlighting:

    ```javascript
    // Example JavaScript code
    console.log('Hello, World!');
    ```
    ````

    You can also embed images:
    ![Image Alt Text](https://example.com/your-image.jpg)

    And links:
    [Visit Google](https://www.google.com)

    ```

    ```

4.  **Save the file.** The development server will automatically detect the new post and rebuild.

## 🌐 Deployment

This application is designed to be easily deployable to platforms like Vercel (recommended for Next.js applications).

1.  **Commit your changes** and push them to your Git repository (e.g., GitHub).
2.  **Connect your repository** to Vercel (or your preferred hosting provider).
3.  Vercel will automatically detect the Next.js project and deploy it.
4.  For a blog, consider setting up a subdomain (e.g., `blog.nikolina.dev`) for the deployed application.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
