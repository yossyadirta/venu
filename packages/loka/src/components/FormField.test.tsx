import React from 'react';
import { render } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders without crashing', () => {
    const { container } = render(<FormField><input /></FormField>);
    expect(container).toBeInTheDocument();
  });
});
