export interface StoryProtocol {
  steps: { step: string; description: string }[];
}

export interface SuccessStory {
  caseStudySlug: string;
  problem: string;
  timeline: string;
  protocol: StoryProtocol;
  featuredProductIds?: string[];
  beforeAfterStats?: {
    metric: string;
    before: string | number;
    after: string | number;
    unit?: string;
  }[];
  issueTags?: string[];
  lifeStage?: string;
  mediaGallery?: string[];
  credibility?: {
    verified: boolean;
    consent: boolean;
  };
}

// Seed success stories data (3–6 stories) with realistic structure
export const successStories: SuccessStory[] = [
  {
    caseStudySlug: 'postpartum-bloating-relief',
    problem: 'Severe postpartum bloating and discomfort for months after childbirth',
    timeline: '10-week journey to significant relief',
    protocol: {
      steps: [
        {
          step: 'Diet Reset',
          description: 'Eliminated processed foods and dairy for 3 weeks to remove common bloat triggers.'
        },
        {
          step: 'Introduce Probiotics',
          description: 'Started a high-potency probiotic daily to restore gut flora balance.'
        },
        {
          step: 'Adjust Fiber Intake',
          description: 'Initially tried a generic fiber supplement which worsened gas; switched to a gentler prebiotic fiber and increased dose slowly.'
        },
        {
          step: 'Gentle Exercise & Stress Relief',
          description: 'Added daily walks and postpartum yoga to stimulate digestion and reduce stress-related bloating.'
        }
      ]
    },
    featuredProductIds: ['probiotic-50b', 'prebiotic-fiber', 'bloat-relief-tea'],
    beforeAfterStats: [
      { metric: 'Bloating Frequency', before: 'Daily', after: 'Rare (1x/week)' },
      { metric: 'Abdominal Circumference', before: 36, after: 33, unit: 'inches' }
    ],
    issueTags: ['Bloating', 'Gut Imbalance'],
    lifeStage: 'Postpartum Mom (age 32)',
    mediaGallery: [
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=60'
    ],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'ibs-stress-management-success',
    problem: 'Daily bloating from IBS aggravated by a high-stress job',
    timeline: '12 weeks to gain control over IBS symptoms',
    protocol: {
      steps: [
        {
          step: 'Low-FODMAP Diet Trial',
          description: 'Removed high-FODMAP foods (garlic, onion, wheat, dairy) for 4 weeks to identify trigger foods. Discovered lactose and wheat were major culprits.'
        },
        {
          step: 'Targeted Probiotic',
          description: 'Introduced a Bifidobacterium-rich probiotic known to help IBS, taken every morning.'
        },
        {
          step: 'Stress Management Routine',
          description: 'Implemented nightly breathing exercises and short lunchtime walks to lower stress-related gut reactions.'
        },
        {
          step: 'Peppermint Oil for Flares',
          description: 'Tried OTC antacids with no improvement; switched to enteric-coated peppermint oil capsules to soothe occasional IBS flare-ups effectively.'
        }
      ]
    },
    featuredProductIds: ['ibs-probiotic', 'peppermint-caps', 'digestive-enzymes'],
    beforeAfterStats: [
      { metric: 'Weekly Bloating Episodes', before: 7, after: 1 },
      { metric: 'Abdominal Pain (1–10)', before: 8, after: 2 }
    ],
    issueTags: ['Bloating', 'IBS', 'Stress'],
    lifeStage: 'Midlife Professional (Male, 45)',
    mediaGallery: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'college-bloating-makeover',
    problem: 'Constant bloating and fatigue as a college student with a fast-food diet',
    timeline: '8 weeks to break the bloat cycle and boost energy',
    protocol: {
      steps: [
        {
          step: 'Diet Overhaul',
          description: 'Cut out soda and fried foods; added vegetables and lean protein over first 2 weeks to improve diet quality.'
        },
        {
          step: 'Regular Meal Schedule',
          description: 'Shifted to smaller, regular meals (3 meals + 2 snacks) instead of one large late-night meal, easing the digestive burden.'
        },
        {
          step: 'Digestive Enzymes for Big Meals',
          description: 'Took a chewable enzyme supplement before occasional heavy campus meals to aid digestion of fats and carbs.'
        },
        {
          step: 'Daily Probiotics (Food-Based)',
          description: 'Started consuming probiotic yogurt or kefir each day to introduce beneficial microbes naturally.'
        },
        {
          step: 'Manage Stress & Sleep',
          description: 'Initially ignored stress, but after a bloating flare during exams, prioritized 7-8 hours of sleep and added short evening walks to calm stress.'
        }
      ]
    },
    featuredProductIds: ['enzyme-chewable', 'probiotic-gummies', 'digestive-tea'],
    beforeAfterStats: [
      { metric: 'Bloating Frequency', before: 'Every evening', after: 'Rare (≤1x/week)' }
    ],
    issueTags: ['Bloating', 'Poor Diet'],
    lifeStage: 'College Student (Female, 20)',
    mediaGallery: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'menopause-bloat-regularity',
    problem: 'Chronic bloating and irregularity in late 40s due to menopause-related changes',
    timeline: '3 months to restore regular digestion and reduce bloating',
    protocol: {
      steps: [
        {
          step: 'Gradual Fiber Increase',
          description: 'Increased fiber intake with fruits, veggies, and oats. Initially added too much too fast, causing gas, so adjusted to add fiber slowly over weeks.'
        },
        {
          step: 'Hydration & Routine',
          description: 'Started drinking 2L of water daily and set regular meal times to help regulate digestive rhythm.'
        },
        {
          step: 'Symbiotic Supplement',
          description: 'Took a daily women-focused symbiotic (probiotic + prebiotic) to support gut bacteria and improve regularity.'
        },
        {
          step: 'Enzymes for Large Meals',
          description: 'Used a plant-based digestive enzyme before heavy or high-fat meals (especially during holidays) to prevent post-meal bloating.'
        },
        {
          step: 'Mindful Eating & Relaxation',
          description: 'Practiced chewing slowly and nightly meditation. Noticed stress and rushed meals were causing bloating spikes, so mindfulness became key.'
        }
      ]
    },
    featuredProductIds: ['women-symbiotic', 'plant-enzymes', 'ginger-turmeric-tea'],
    beforeAfterStats: [
      { metric: 'Bowel Movements', before: 'Once every 3 days', after: 'Daily' },
      { metric: 'Bloating Severity (1–10)', before: 9, after: 3 }
    ],
    issueTags: ['Bloating', 'Constipation'],
    lifeStage: 'Perimenopausal (Female, 48)',
    mediaGallery: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'fitness-high-protein-bloat',
    problem: 'Fit 28-year-old dealing with bloating from a high-protein diet and supplements',
    timeline: '6 weeks to fix diet and eliminate post-workout bloating',
    protocol: {
      steps: [
        {
          step: 'Identify Trigger Foods',
          description: 'Noticed daily whey protein shakes and sugar alcohol sweeteners caused bloating. Switched to a plant-based protein powder with natural sweeteners.'
        },
        {
          step: 'Portion & Meal Timing',
          description: 'Reduced very large post-workout meals and spread protein intake across 4 smaller meals to avoid overloading digestion at once.'
        },
        {
          step: 'Add Probiotic & Enzyme',
          description: 'Started a high-potency probiotic daily, and took a protease enzyme whenever consuming protein shakes to aid protein digestion.'
        },
        {
          step: 'Stay Hydrated',
          description: 'Increased water intake throughout the day. Found that dehydration was contributing to feelings of bloating after intense workouts.'
        }
      ]
    },
    featuredProductIds: ['plant-protein', 'protein-enzyme', 'fitness-probiotic'],
    beforeAfterStats: [
      { metric: 'Post-Shake Bloating Occurrence', before: 'Every time', after: 'None (0%)' }
    ],
    issueTags: ['Bloating', 'Food Intolerance'],
    lifeStage: 'Active Young Adult (Male, 28)',
    mediaGallery: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  }
];

export const getSuccessStoryBySlug = (slug: string): SuccessStory | undefined => {
  return successStories.find(story => story.caseStudySlug === slug);
};