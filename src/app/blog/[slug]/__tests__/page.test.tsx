import { render, screen } from '@testing-library/react';
import BlogPostPage from '../page';
import { NotFoundProvider } from '../../../../context/NotFoundContext';

// Mock the Contentful client
jest.mock('../../../../lib/contentful', () => ({
  getEntries: jest.fn(() => Promise.resolve({ items: [] })), // Always return empty for not found scenario
}));

// Mock the SetNotFound component
jest.mock('../../../../components/SetNotFound', () => () => null);

describe('BlogPostPage - Not Found', () => {
  it('renders "Post Not Found" when the blog post is not found', async () => {
    const Page = await BlogPostPage({ params: { slug: 'non-existent-post' } });
    render(<NotFoundProvider>{Page}</NotFoundProvider>);

    const heading = await screen.findByRole('heading', { name: /Post Not Found/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/The requested blog post could not be found./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all posts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all posts/i })).toHaveAttribute('href', '/blog');
  });
});