import React from 'react';
import { render } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders without crashing', () => {
    const { container } = render(<Separator />);
    expect(container).toBeInTheDocument();
  });
});
