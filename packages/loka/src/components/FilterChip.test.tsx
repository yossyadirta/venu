import React from 'react';
import { render } from '@testing-library/react';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders without crashing', () => {
    const { container } = render(<FilterChip label="Test" />);
    expect(container).toBeInTheDocument();
  });
});
