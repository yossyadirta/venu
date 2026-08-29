import React from 'react';
import { render } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<SearchBar />);
    expect(container).toBeInTheDocument();
  });
});
