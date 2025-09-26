import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedBlogPosts from './RelatedBlogPosts';
import { getPostById } from '../../lib/getPosts';

jest.mock('../../lib/getPosts', () => ({
  getPostById: jest.fn((id) => Promise.resolve({
    id,
    title: `Related Blog Post ${id}`,
    slug: `related-blog-post-${id}`,
    featuredImage: '',
    blogID: id,
    content: ''
  })),
}));

describe('RelatedBlogPosts', () => {
  it('renders related blog posts', async () => {
    const posts = [
        await getPostById('1'),
        await getPostById('2'),
    ]
    render(<RelatedBlogPosts posts={posts} />);

    expect(await screen.findByText('Related Blog Post 1')).toBeInTheDocument();
    expect(await screen.findByText('Related Blog Post 2')).toBeInTheDocument();
  });
});