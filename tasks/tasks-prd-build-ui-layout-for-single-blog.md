## Relevant Files

- `app/blog/[slug]/page.tsx` - The dynamic page component for rendering a single blog post.
- `app/blog/[slug]/page.test.tsx` - Unit tests for the blog post page.
- `app/components/BlogPostLayout.tsx` - The main layout component for a blog post.
- `app/components/BlogPostLayout.test.tsx` - Unit tests for `BlogPostLayout.tsx`.
- `app/components/TableOfContents.tsx` - Component for the sticky table of contents.
- `app/components/TableOfContents.test.tsx` - Unit tests for `TableOfContents.tsx`.
- `app/components/SocialShareButtons.tsx` - Component for social media sharing buttons.
- `app/components/SocialShareButtons.test.tsx` - Unit tests for `SocialShareButtons.tsx`.
- `lib/markdownUtils.ts` - Utility functions for parsing and rendering Markdown content.
- `lib/markdownUtils.test.ts` - Unit tests for `markdownUtils.ts`.
- `lib/getPosts.ts` - (Existing file) To be modified to fetch single post data.

### Notes

- Unit tests should be placed alongside the code files they are testing.
- Use `npm run test` to run tests.

## Tasks

- [x] 1.0 **Setup Data Fetching and Routing for Blog Posts**
  - [x] 1.1 Create a dynamic route `app/blog/[slug]/page.tsx` to handle individual blog posts.
  - [x] 1.2 Update `lib/getPosts.ts` to read Markdown files from `/content/posts` (or a similar directory) and parse the frontmatter.
  - [x] 1.3 Implement `generateStaticParams` in the dynamic route to generate static pages for each blog post at build time.
  - [x] 1.4 In `app/blog/[slug]/page.tsx`, fetch the content for a single post based on the slug parameter.

- [ ] 2.0 **Develop the Main Blog Post Layout Component**
  - [x] 2.1 Create a new component `app/components/BlogPostLayout.tsx`.
  - [x] 2.2 Create the basic structure of the blog post page, including placeholders for header, metadata, content, and footer.
  - [x] 2.3 Add props to the component to accept post metadata (e.g., title, author, date) and the HTML content of the post.
  - [x] 2.4 Create `app/components/BlogPostLayout.test.tsx` and write a basic test to ensure the component renders without crashing.

- [x] 3.0 **Implement Markdown Rendering and Styling**
  - [x] 3.1 Create a utility file `lib/markdownUtils.ts`.
  - [x] 3.2 Add a library like `remark` and `remark-html` to convert Markdown from the fetched files into an HTML string.
  - [x] 3.3 Style the rendered HTML elements (headings, paragraphs, lists, blockquotes, code blocks) using the `@tailwindcss/typography` plugin or custom styles in `app/globals.css` to match the reference design.
  - [x] 3.4 Create `lib/markdownUtils.test.ts` to add unit tests for the Markdown processing logic.

- [x] 4.0 **Integrate Interactive and Dynamic Features**
  - [x] 4.1 Implement a `TableOfContents` component that is sticky on desktop views.
  - [x] 4.2 Create a `SocialShareButtons` component for Twitter, LinkedIn, and Facebook.
  - [x] 4.3 Add logic to calculate and display the estimated reading time.
  - [x] 4.4 (Optional) Implement a reading progress bar that updates as the user scrolls.

- [x] 5.0 **Finalize Styling, Responsiveness, and Analytics**
  - [x] 5.1 Perform thorough testing of the layout on mobile, tablet, and desktop screen sizes.
  - [x] 5.2 Implement and test the fallback behavior for posts without a cover image.
  - [x] 5.3 Test the UI with very long titles and a large number of tags to ensure the layout doesn't break.
  - [x] 5.4 Integrate analytics tracking (e.g., Google Analytics) for blog post views.
  - [x] 5.5 Write comprehensive integration and unit tests for all new components and functionality.