import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlugFromWp } from '@/lib/getPosts';
import BlogPostLayout from '@/app/components/BlogPostLayout';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = await getPostBySlugFromWp(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostLayout
      blogId={post.node.slug} // Assuming slug can be used as an ID
      title={post.node.title}
      author={post.node.author.node.name}
      date={new Date(post.node.date).toLocaleDateString()}
      contentHtml={post.node.content}
      rawContent={post.node.content}
      featuredImage={post.node.featuredImage?.node?.sourceUrl}
      sources={[]}
      related_questions={[]}
      views={0}
      category="Wellness"
    />
  );
};

export default BlogPostPage;
