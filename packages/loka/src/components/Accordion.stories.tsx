import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, waitFor } from '@storybook/test';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Is it accessible?',
        content: 'Yes. It adheres to the WAI-ARIA design pattern.',
      },
      {
        id: '2',
        title: 'Is it styled?',
        content: 'Yes. It comes with default styles that matches the other components.',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /Is it accessible?/i });

    await userEvent.click(trigger);

    const content = await canvas.findByText(/Yes. It adheres to the WAI-ARIA design pattern./i);
    await waitFor(
      () => {
        expect(content).toBeVisible();
      },
      { timeout: 1000 }
    );
  },
};
