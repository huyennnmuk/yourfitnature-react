// lib/communityChallengeSliderData.ts

interface ChallengeFeature {
  text: string;
  icon: string; // Suggest using a simple icon library or custom SVGs
}

export interface CommunityChallenge {
  title: string;
  description: string;
  imageUrl: string;
  features: ChallengeFeature[];
  ctaLink: string;
  ctaText: string;
}

export const communityChallengeSliderData: CommunityChallenge[] = [
  {
    title: 'The 7-Day Bloating Reset',
    description: 'A guided weekly challenge to pinpoint bloating triggers, calm your digestive system, and restore gut comfort. Perfect for busy professionals seeking immediate relief.',
    imageUrl: 'https://images.unsplash.com/photo-1589953605483-a2964c38d415?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      { text: 'Daily Science-Backed Tips', icon: '🔬' },
      { text: 'Personalized Symptom Tracker', icon: '📓' },
      { text: 'Supportive Community & Expert Q&A', icon: '💬' },
    ],
    ctaLink: '/community-challenge/register',
    ctaText: 'Join the Challenge',
  },
  {
    title: 'Microbiome Mastery Challenge',
    description: 'Join this 14-day challenge to strategically nourish your gut bacteria, boost your energy, and enhance mental clarity by understanding the power of synbiotics.',
    imageUrl: 'https://images.unsplash.com/photo-1577563612200-a95560e2edec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      { text: 'Prebiotic & Probiotic Food Guides', icon: '🍎' },
      { text: 'Energy & Mood Tracking', icon: '⚡' },
      { text: 'Live Workshops with Gut Experts', icon: '👩‍🏫' },
    ],
    ctaLink: '/community-challenge/register',
    ctaText: 'Master Your Gut',
  },
  {
    title: 'The Gut-Brain Connection',
    description: 'Unlock a sharper mind and calmer mood in 21 days. This challenge focuses on the powerful link between your gut and brain, designed for optimal cognitive function.',
    imageUrl: 'https://images.unsplash.com/photo-1711409645921-ef3db0501f96?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      { text: 'Mindfulness & Gut-Focused Exercises', icon: '🧘' },
      { text: 'Stress-Reduction Techniques', icon: '🌿' },
      { text: 'Track Mood & Digestion Improvements', icon: '📊' },
    ],
    ctaLink: '/community-challenge/register',
    ctaText: 'Explore the Connection',
  },
];
