import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toast message="Test" isVisible={true} onClose={() => {}} />);
    expect(container).toBeInTheDocument();
  });
});
