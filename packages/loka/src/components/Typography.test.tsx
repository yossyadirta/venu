import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders without crashing', () => {
    const { container } = render(<Typography />);
    expect(container).toBeInTheDocument();
  });
});
