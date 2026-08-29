import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, expect, userEvent } from '@storybook/test';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn() as any,
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    message: 'An error occurred',
    isVisible: true,
    type: 'error',
    duration: 999999, // Prevent auto-close during interaction test
  },
  play: async ({ canvasElement, args }) => {
    // Toast renders in a fixed position, but within the iframe canvas
    const canvas = within(canvasElement.parentElement!);
    
    // Find the close button (it's the only button in the toast)
    const closeBtn = canvas.getByRole('button');
    
    await userEvent.click(closeBtn);
    
    await expect(args.onClose).toHaveBeenCalled();
  }
};
