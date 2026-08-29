import React from 'react';
import { render } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders without crashing', () => {
    const { container } = render(<Accordion items={[{id: '1', title: 'A', content: 'B'}]} />);
    expect(container).toBeInTheDocument();
  });
});
