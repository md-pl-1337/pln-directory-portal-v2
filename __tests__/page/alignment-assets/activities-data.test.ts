import { activitiesData } from '@/components/page/aligement-assets/activities/data/activities.data';

describe('PLAA activities data', () => {
  it('keeps activity ids unique', () => {
    const ids = activitiesData.activities.map((activity) => activity.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses supported frequency groups', () => {
    const validFrequencies = new Set(['Repeatable', 'Recurring', 'One-Time']);

    for (const activity of activitiesData.activities) {
      expect(validFrequencies.has(activity.frequency ?? 'Repeatable')).toBe(true);
    }
  });

  it('uses valid URLs for activity links', () => {
    for (const activity of activitiesData.activities) {
      const links = [
        activity.popupContent.ctaLink,
        activity.popupContent.submissionLink?.url,
        ...(activity.popupContent.links ?? []).map((link) => link.url),
      ].filter(Boolean);

      for (const url of links) {
        expect(() => new URL(url as string)).not.toThrow();
      }
    }
  });
});
