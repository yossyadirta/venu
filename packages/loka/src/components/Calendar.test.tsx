import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Calendar />);
    expect(container).toBeInTheDocument();
  });
});
