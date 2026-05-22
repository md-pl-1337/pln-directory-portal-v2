import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import ActivityTable from '@/components/page/aligement-assets/activities/sections/activity-table';
import { activitiesData } from '@/components/page/aligement-assets/activities/data';
import { Activity } from '@/components/page/aligement-assets/activities/types';

/**
 * `ActivityTable` is the catalog renderer for the PLAA `/alignment-asset/activities` page.
 *
 * Take-home note: this story exercises the table with the **full live catalog** from
 * `activities.data.ts`, so each entry's natural grouping by frequency (Repeatable /
 * Recurring / One-Time) and the new sort-by-points behavior are visible at a glance.
 *
 * The new "Submit a High-Quality Forum Post" and "Publish a Public Security Disclosure"
 * entries that this PR adds appear inside their respective frequency sections, sorted
 * naturally by point value alongside the existing entries.
 */
const meta = {
  title: 'PLAA Take-home/ActivityTable',
  component: ActivityTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full activities catalog rendered through the table, with the PR\'s sort-by-points behavior applied per frequency section.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
  },
} satisfies Meta<typeof ActivityTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full live catalog. Highest-value items sort to the top of each section. */
export const FullCatalog: Story = {
  args: {
    activities: activitiesData.activities,
  },
};

/** Only the Knowledge Sharing category, useful for reviewing the new forum-post entry alongside its siblings. */
export const KnowledgeSharingOnly: Story = {
  args: {
    activities: activitiesData.activities.filter((a: Activity) => a.category === 'Knowledge Sharing'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Filtered to the Knowledge Sharing category. The new "Submit a High-Quality Forum Post" entry appears next to its natural sibling "Contribute a High-Quality Response to the Forum".',
      },
    },
  },
};

/** Only the Network Tooling category, focuses the security-disclosure entry. */
export const NetworkToolingOnly: Story = {
  args: {
    activities: activitiesData.activities.filter((a: Activity) => a.category === 'Network Tooling'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Filtered to the Network Tooling category. The new "Publish a Public Security Disclosure" entry sits alongside "Share a Reusable AI Resource or Tool", both modeled on the share + drive-discussion + bonus pattern.',
      },
    },
  },
};

/** Demonstrates the sort behavior with a hand-crafted catalog where points are intentionally out of order in the source array. */
const sortDemoActivities: Activity[] = [
  {
    id: 'demo-low',
    category: 'Demo',
    activity: 'Lowest-value activity (50 points)',
    networkValue: 'Should render at the bottom of the Repeatable section.',
    points: '50',
    frequency: 'Repeatable',
    isAutoTracked: false,
    popupContent: {
      title: 'Lowest-value activity',
      description: 'Sorts to the bottom.',
      pointsAwarded: { title: 'Points Awarded:', items: [{ label: 'Base', value: '50 points' }] },
    },
  },
  {
    id: 'demo-mid',
    category: 'Demo',
    activity: 'Mid-value activity (200 points)',
    networkValue: 'Should render in the middle.',
    points: '200+',
    frequency: 'Repeatable',
    isAutoTracked: false,
    popupContent: {
      title: 'Mid-value activity',
      description: 'Sorts to the middle.',
      pointsAwarded: { title: 'Points Awarded:', items: [{ label: 'Base', value: '200 points' }] },
    },
  },
  {
    id: 'demo-high',
    category: 'Demo',
    activity: 'Highest-value activity (1,000 points)',
    networkValue: 'Should render at the top of the Repeatable section.',
    points: '1,000+',
    frequency: 'Repeatable',
    isAutoTracked: false,
    popupContent: {
      title: 'Highest-value activity',
      description: 'Sorts to the top.',
      pointsAwarded: { title: 'Points Awarded:', items: [{ label: 'Base', value: '1000 points' }] },
    },
  },
];

export const SortDemo: Story = {
  args: {
    activities: sortDemoActivities,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three demo entries with intentionally out-of-order points in the source array (`50`, `200+`, `1,000+`). They render highest-first inside the Repeatable section, confirming the new sort behavior. Comma-separated numbers and trailing `+` modifiers are both handled by the `pointsBase` helper.',
      },
    },
  },
};
