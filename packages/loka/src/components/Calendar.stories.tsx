import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, expect, userEvent } from '@storybook/test';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSelect: fn() as any,
  }
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
    selected: new Date(2026, 0, 1),
    defaultMonth: new Date(2026, 0, 1),
  } as any,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Day Picker renders buttons for each day. We can click on "15".
    const day15 = canvas.getByRole('button', { name: /15/i });
    
    await userEvent.click(day15);
    
    // @ts-ignore
    await expect(args.onSelect).toHaveBeenCalled();
  }
};
