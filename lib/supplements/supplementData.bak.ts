// supplementData.ts
// Data source for supplement options, interactions, and affiliate links.

export interface Supplement {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  affiliateLink: string;
  interactions?: string[];
  contraindications?: string[];
}

export const supplements: Supplement[] = [
  {
    id: 'enzyme',
    name: 'Digestive Enzyme',
    description: 'Supports digestion and reduces bloating from meals.',
    symptoms: ['gas', 'bloating', 'indigestion'],
    affiliateLink: 'https://example.com/enzyme',
    interactions: ['probiotic'],
    contraindications: ['allergy_to_pineapple_or_papaya'],
  },
  {
    id: 'probiotic',
    name: 'Probiotic',
    description: 'Promotes a healthy gut microbiome and reduces overall digestive upset.',
    symptoms: ['gas', 'bloating', 'irregularity'],
    affiliateLink: 'https://example.com/probiotic',
    interactions: [],
    contraindications: ['severe_immunodeficiency'],
  },
  {
    id: 'ginger',
    name: 'Ginger Root',
    description: 'Soothes the stomach and can help reduce nausea and gas.',
    symptoms: ['gas', 'nausea'],
    affiliateLink: 'https://example.com/ginger',
    interactions: ['blood_thinners'],
    contraindications: [],
  },
  {
    id: 'peppermint',
    name: 'Peppermint Oil',
    description: 'Relaxes stomach muscles and can help with cramping and bloating.',
    symptoms: ['bloating', 'gas', 'cramping'],
    affiliateLink: 'https://example.com/peppermint',
    interactions: [],
    contraindications: ['gerd'],
  },
  // Add more supplements as needed
];

export const allSymptoms = [
  'gas',
  'bloating',
  'indigestion',
  'irregularity',
  'nausea',
  'cramping',
];

