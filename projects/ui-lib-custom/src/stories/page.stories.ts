import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { PageComponent } from './page.component';

const meta: Meta<PageComponent> = {
  title: 'Example/Page',
  component: PageComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<PageComponent>;

export const LoggedOut: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }): Promise<void> => {
    type CanvasQueries = {
      getByRole: (role: string, options?: { name?: RegExp }) => HTMLElement;
    };

    const canvas: CanvasQueries = within(canvasElement) as unknown as CanvasQueries;
    const loginButton: HTMLElement = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton: HTMLElement = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
