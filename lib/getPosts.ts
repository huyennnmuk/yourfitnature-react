import { gql } from '@apollo/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Existing interface for WordPress posts
export interface Post {
  node: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    author: {
      node: {
        name: string;
      };
    };
    date: string;
  };
}

interface RelatedQuestion {
  question: string;
  answer: string;
}

export interface UnifiedPost {
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  altText: string;
  author: string;
  date: string;
  excerpt: string;
}

export function toUnifiedPost(post: Post | LocalPost): UnifiedPost {
  if ('node' in post) { // WordPress Post
    return {
      slug: post.node.slug,
      title: post.node.title,
      content: post.node.content,
      featuredImage: post.node.featuredImage?.node?.sourceUrl || '',
      altText: post.node.featuredImage?.node?.altText || post.node.title,
      author: post.node.author?.node?.name || 'YourFitNature',
      date: post.node.date,
      excerpt: post.node.excerpt,
    };
  }
  // Local Markdown Post
  return {
    slug: post.slug,
    title: post.title,
    content: post.content,
    featuredImage: post.featuredImage || '',
    altText: post.title,
    author: post.author || 'YourFitNature',
    date: post.date || new Date().toISOString(),
    excerpt: post.excerpt || post.content.substring(0, 100),
  };
}

// New interface for local markdown posts
export interface LocalPost {
  slug: string;
  blogID: string;
  title: string;
  content: string;
  featuredImage?: string; // Add featuredImage property
  related_questions?: RelatedQuestion[];
  views?: number;
  category?: string;
  [key: string]: any;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

let postsCache: LocalPost[];

function fetchAllPosts(): LocalPost[] {
  if (postsCache) {
    return postsCache;
  }

  const postsDirectory = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDirectory)) {
    throw new Error(`The posts directory was not found at ${postsDirectory}`);
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map(fileName => {
    try {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      let views = data.views;
      if (typeof views === 'string') {
        views = parseInt(views.replace(/,/g, ''), 10);
      }
      if (isNaN(views)) {
          views = undefined;
      }

      return {
        slug: data.slug || slug,
        blogID: data.blogID,
        title: data.title,
        content,
        featuredImage: data.cover_image,
        related_questions: data.related_questions,
        ...data,
        views,
        category: data.category,
      };
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      return null;
    }
  }).filter(Boolean) as LocalPost[];

  postsCache = allPostsData;
  return allPostsData;
}


export function getPostBySlug(slug: string): LocalPost | undefined {
  const allPosts = fetchAllPosts();
  return allPosts.find(post => post.slug === slug);
}

export function getPostById(id: string): LocalPost | undefined {
  const allPosts = fetchAllPosts();
  return allPosts.find(post => post.blogID === id);
}

export function getAllPosts(): UnifiedPost[] {
  const allPosts = fetchAllPosts();
  return allPosts.map(toUnifiedPost);
}

export async function getAllPostsFromWp(): Promise<UnifiedPost[]> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!apiUrl) {
    console.warn("WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in your .env.local file. Returning null.");
    return [];
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetAllPosts {
          posts {
            nodes {
              title
              excerpt
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              slug
              author {
                node {
                  name
                }
              }
              date
            }
          }
        }
      `,
    }),
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error("Failed to fetch posts:", await response.text());
    throw new Error('Failed to fetch posts');
  }

  const json = await response.json();
  if (!json.data || !json.data.posts) {
    console.error("GraphQL query returned errors:", json.errors);
    return [];
  }

  const posts: Post[] = json.data.posts.nodes.map((node: any) => ({ node }));
  return posts.map(toUnifiedPost);
}

export async function getRecentPostsFromWp(count: number = 3): Promise<UnifiedPost[]> {
  const allPosts = await getAllPostsFromWp();
  return allPosts.slice(0, count);
}


export async function getPostBySlugFromWp(slug: string): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!apiUrl) {
    console.warn("WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL in your .env.local file. Returning null.");
    return null;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetPostBySlug($slug: String!) {
          postBy(slug: $slug) {
            title
            excerpt
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            slug
            author {
              node {
                name
              }
            }
            date
          }
        }
      `,
      variables: { slug },
    }),
    cache: 'force-cache',
  });

  if (!response.ok) {
    console.error("Failed to fetch post:", await response.text());
    throw new Error('Failed to fetch post');
  }

  const json = await response.json();
  if (!json.data || !json.data.postBy) {
    console.error("GraphQL query returned errors:", json.errors);
    return null;
  }

  return { node: json.data.postBy };
}