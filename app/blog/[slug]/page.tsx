import React from 'react';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, LocalPost } from '@/lib/getPosts';
import markdownToHtml from '@/lib/markdownUtils';
import BlogPostLayout from '@/app/components/BlogPostLayout';


interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <BlogPostLayout
      blogId={post.blogID}
      title={post.title}
      author={post.author}
      date={post.date}
      contentHtml={contentHtml}
      rawContent={post.content}
      featuredImage={post.featuredImage} // Pass featuredImage
      sources={post.sources}
      related_questions={post.related_questions}
      views={post.views}
      category={post.category}
    />
  );
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default BlogPostPage;
