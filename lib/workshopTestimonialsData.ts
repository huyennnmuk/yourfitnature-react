import { SuccessStory } from './testimonialsData';

export const workshopTestimonials: SuccessStory[] = [
  {
    caseStudySlug: 'pms-bloating-relief-workshop',
    problem: 'Painful PMS bloating that made me miss work and social events every month.',
    timeline: 'Felt a difference after the first cycle post-workshop',
    protocol: {
      steps: [
        { step: 'Cycle Syncing Nutrition', description: 'Learned which foods to eat during my luteal phase to combat water retention.' },
        { step: 'Targeted Supplements', description: 'Started using magnesium and B6 as recommended in the workshop, which was a game-changer.' },
        { step: 'Mindful Movement', description: 'Switched from high-intensity workouts to yoga and walking before my period.' },
      ]
    },
    featuredProductIds: ['p4', 'p5', 'p6'],
    issueTags: ['PMS', 'Hormonal Bloating', 'Cycle Syncing'],
    lifeStage: 'Working Professional (30s)',
    mediaGallery: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'perimenopause-belly-workshop',
    problem: 'Felt like my midsection was constantly puffy and swollen since turning 45.',
    timeline: 'Noticeably less bloating within 3 weeks of applying the workshop principles.',
    protocol: {
      steps: [
        { step: 'Understanding Estrogen', description: 'The workshop explained how estrogen fluctuations cause bloating, which was eye-opening.' },
        { step: 'Phytoestrogen Foods', description: 'Incorporated flax seeds and soy as suggested to help balance hormones naturally.' },
        { step: 'Stress Reduction Techniques', description: 'The connection between cortisol and belly fat was clear. I started the recommended breathing exercises.' },
      ]
    },
    featuredProductIds: ['p7', 'p8'],
    issueTags: ['Perimenopause', 'Hormonal Bloating', 'Belly Fat'],
    lifeStage: 'Perimenopausal (40s)',
    mediaGallery: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'endometriosis-bloat-management',
    problem: 'Severe "endo belly" that would make me look 6 months pregnant.',
    timeline: 'Learned strategies that provided immediate, though not complete, relief.',
    protocol: {
      steps: [
        { step: 'Anti-inflammatory Eating', description: 'The workshop provided a clear list of inflammatory foods to avoid, which helped reduce the swelling.' },
        { step: 'Gentle Core Exercises', description: "Learned specific movements that didn't aggravate my condition but helped with lymphatic drainage." },
        { step: 'Herbal Teas', description: 'Started drinking the recommended ginger and turmeric tea blend for its anti-inflammatory properties.' },
      ]
    },
    featuredProductIds: ['p9', 'p10'],
    issueTags: ['Endometriosis', 'Inflammation', 'Severe Bloating'],
    lifeStage: 'Navigating Endo (20s)',
    mediaGallery: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'post-pill-pcos-bloating',
    problem: 'Coming off birth control gave me terrible bloating and irregular cycles.',
    timeline: 'Felt more in control and less bloated after 6 weeks.',
    protocol: {
      steps: [
        { step: 'Blood Sugar Balance', description: 'The workshop’s focus on protein, fat, and fiber at each meal was key to managing my PCOS symptoms.' },
        { step: 'Liver Support', description: 'Learned about supporting my liver to process excess hormones, which I had never considered.' },
        { step: 'Seed Cycling', description: 'Started seed cycling as explained in the session to help regulate my periods naturally.' },
      ]
    },
    featuredProductIds: ['p11', 'p12', 'p13'],
    issueTags: ['PCOS', 'Post-Pill', 'Hormonal Acne & Bloat'],
    lifeStage: 'Post-Birth Control (20s)',
    mediaGallery: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'thyroid-related-water-retention',
    problem: 'My hypothyroidism left me feeling constantly puffy and sluggish.',
    timeline: 'The workshop gave me practical tools that worked alongside my medication.',
    protocol: {
      steps: [
        { step: 'Understanding the Gut-Thyroid Axis', description: 'Finally understood how my gut health was impacting my thyroid function.' },
        { step: 'Nutrient-Dense Foods', description: 'Focused on selenium and iodine-rich foods as suggested in the workshop materials.' },
        { step: 'Lymphatic Support', description: 'The dry brushing technique taught in the workshop became a daily ritual and really helped with puffiness.' },
      ]
    },
    featuredProductIds: ['p14', 'p15'],
    issueTags: ['Hypothyroidism', 'Water Retention', 'Fatigue'],
    lifeStage: 'Managing Thyroid Condition (40s)',
    mediaGallery: ['https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  },
  {
    caseStudySlug: 'stress-induced-cycle-bloat',
    problem: 'My stressful job was wrecking my cycle and causing horrible bloating.',
    timeline: 'Two months of consistent practice led to calmer digestion and predictable cycles.',
    protocol: {
      steps: [
        { step: 'Cortisol & Progesterone Link', description: 'The science behind how stress lowers progesterone was a lightbulb moment.' },
        { step: 'Adaptogens 101', description: 'Was introduced to adaptogens like Ashwagandha through the workshop and it helped me feel more resilient.' },
        { step: 'Setting Boundaries', description: "The workshop wasn\'t just about food; it was about lifestyle. Learning to say \"no\" helped my hormones." },
      ]
    },
    featuredProductIds: ['p16', 'p17'],
    issueTags: ['Stress', 'Irregular Cycles', 'Hormonal Bloating'],
    lifeStage: 'High-Pressure Career (30s)',
    mediaGallery: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60'],
    credibility: { verified: true, consent: true }
  }
];

export const getWorkshopTestimonialBySlug = (slug: string): SuccessStory | undefined => {
  return workshopTestimonials.find(story => story.caseStudySlug === slug);
};



