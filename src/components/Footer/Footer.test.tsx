
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer', () => {
  it('renders the footer text', () => {
    render(<Footer />);
    const footerText = screen.getByText(/Astar \/ PolyChromaticLithic/i);
    expect(footerText).toBeInTheDocument();
  });
});
