import { render, screen } from '@testing-library/react';
import TagPage from '../page';
import { NotFoundProvider } from '../../../../../context/NotFoundContext';

// Mock the Contentful client
jest.mock('../../../../../lib/contentful', () => ({
  getEntries: jest.fn(() => Promise.resolve({ items: [] })), // Always return empty for not found scenario
}));

// Mock the SetNotFound component
jest.mock('../../../../../components/SetNotFound', () => () => null);

describe('TagPage - Not Found', () => {
  it('renders "Tag Not Found" when the tag is not found', async () => {
    const Page = await TagPage({ params: { slug: 'non-existent-tag' } });
    render(<NotFoundProvider>{Page}</NotFoundProvider>);

    const heading = await screen.findByRole('heading', { name: /Tag Not Found/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/The requested tag could not be found./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all posts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all posts/i })).toHaveAttribute('href', '/blog');
  });
});