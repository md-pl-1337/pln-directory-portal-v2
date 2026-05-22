import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import ActivityDetailModal from '@/components/page/aligement-assets/activities/sections/activity-detail-modal';
import { activitiesData } from '@/components/page/aligement-assets/activities/data';

/**
 * The detail modal opened when a user clicks an activity card. This story renders
 * each of the two new activities introduced by the take-home PR so reviewers can
 * eyeball the popupContent shape (description, points-awarded items, subItems, CTA)
 * without spinning up the full Next dev server.
 */
const meta = {
  title: 'PLAA Take-home/ActivityDetailModal',
  component: ActivityDetailModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Detail modal rendered against each of the take-home\'s new activities. The modal\'s structure (base reward, severity bonus, adoption bonus, additional note) mirrors existing sibling activities.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: fn(),
  },
} satisfies Meta<typeof ActivityDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const findActivity = (id: string) => {
  const a = activitiesData.activities.find((x) => x.id === id);
  if (!a) throw new Error(`Story setup: missing activity id ${id}`);
  return a;
};

export const SubmitHighQualityForumPost: Story = {
  args: {
    activity: findActivity('submit-high-quality-forum-post'),
  },
};

export const PublishPublicSecurityDisclosure: Story = {
  args: {
    activity: findActivity('publish-public-security-disclosure'),
  },
};

/** Reference: existing sibling activity for comparison. */
export const ContributeForumResponseReference: Story = {
  args: {
    activity: findActivity('contribute-forum-response'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shown for visual comparison so reviewers can confirm the new entries mirror the existing modal layout exactly.',
      },
    },
  },
};

/** Reference: existing sibling activity for the security disclosure pattern. */
export const ShareAIResourceReference: Story = {
  args: {
    activity: findActivity('share-ai-resource'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Share a Reusable AI Resource or Tool" modal, the structural template the new security-disclosure entry is modeled on.',
      },
    },
  },
};
