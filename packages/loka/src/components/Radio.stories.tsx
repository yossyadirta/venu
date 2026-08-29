import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, expect, userEvent } from '@storybook/test';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn() as any,
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'test-radio',
    value: 'a'
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radioB = canvas.getByLabelText('Option A');
    
    await userEvent.click(radioB);
    
    // @ts-ignore
    await expect(args.onChange).toHaveBeenCalled();
    await expect(radioB).toBeChecked();
  }
};
