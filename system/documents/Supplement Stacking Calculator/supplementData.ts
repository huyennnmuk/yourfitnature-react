/**
 * Supplement Stacking Data – enriched dataset for FitNature’s Supplement Stacking Calculator.
 * Each supplement entry includes category, gut issue alignment, benefits, dosage, usage, contraindications,
 * and recommended affiliate products. The categories align with FitNature’s product taxonomy (e.g., Probiotics, Prebiotics, Digestive Enzymes, Vitamins):contentReference[oaicite:0]{index=0},
 * and benefits align with defined gut supplement benefits (e.g., Improve Digestion, Reduce Bloating):contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}.
 * Scientific references are provided in comment blocks to support claims.
 */

interface Supplement {
  id: string;
  name: string;
  category: string;              // e.g. "Probiotics", "Prebiotics", "Enzymes", "Vitamins"
  gutIssues: string[];           // Gut issues/conditions this supplement helps (e.g. ["IBS", "Constipation"]):contentReference[oaicite:3]{index=3}:contentReference[oaicite:4]{index=4}
  benefits: string[];            // Key gut health benefits (e.g. ["Improve Digestion", "Promote Regularity"]):contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}
  dosage: string;                // Recommended dosage & frequency (textual guidance)
  usage: string;                 // Usage details (how/when to take, with meals, etc.)
  contraindications: string;     // Contraindications or cautions (e.g. medical conditions, interactions)
  recommendedProducts: string[]; // Affiliate recommended products (by name or identifier)
}

// Data entries for each supplement.
export const supplements: Supplement[] = [
  {
    id: "probiotic_lgg",
    name: "Lactobacillus rhamnosus GG (Probiotic)",
    category: "Probiotics",
    gutIssues: ["IBS", "Diarrhea", "Antibiotic-Associated Diarrhea"],  // LGG is well-studied for IBS and diarrhea:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}
    benefits: ["Balance Gut Flora", "Boost Immunity", "Improve Digestion"],  // Promotes healthy microbiome balance and gut function:contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}
    dosage: "~10 billion CFU daily (typically 1–2 capsules per day).",
    usage: "Take daily, ideally before or with a meal, to help the probiotic survive stomach acid. Consistency is key for colonization.",
    contraindications: "If immunocompromised or on immune-suppressing drugs, consult a physician before use:contentReference[oaicite:11]{index=11}:contentReference[oaicite:12]{index=12}. In such cases, probiotics may pose infection risk.",
    recommendedProducts: [
      "Culturelle Digestive Health Probiotic",
      "FitNature Balanced Gut Synbiotic"
    ]
  },
  {
    id: "probiotic_saccharomyces",
    name: "Saccharomyces boulardii (Probiotic Yeast)",
    category: "Probiotics",
    gutIssues: ["IBS-D", "Traveler’s Diarrhea", "C. diff Infection"],  // S. boulardii helps diarrhea and antibiotic-associated issues:contentReference[oaicite:13]{index=13}:contentReference[oaicite:14]{index=14}
    benefits: ["Promote Regularity", "Reduce Bloating", "Boost Immunity"],  // Aids in controlling diarrhea and fortifying gut defenses:contentReference[oaicite:15]{index=15}:contentReference[oaicite:16]{index=16}
    dosage: "250–500 mg (5–10 billion CFU) one to two times daily, during and after gut stress (e.g., travel or antibiotic use).",
    usage: "Often used alongside antibiotics (take S. boulardii a few hours after antibiotic dose). Continue for at least 1 week after antibiotic course or during bouts of diarrhea.",
    contraindications: "Generally well-tolerated; however, immunocompromised individuals should use with medical supervision (rare yeast bloodstream infections reported in those cases):contentReference[oaicite:17]{index=17}.",
    recommendedProducts: [
      "Florastor Daily Probiotic (S. boulardii)",
      "Jarrow Formulas Saccharomyces Boulardii + MOS"
    ]
  },
  {
    id: "prebiotic_inulin",
    name: "Inulin (Prebiotic Fiber)",
    category: "Prebiotics",
    gutIssues: ["Constipation", "IBS-C", "General Gut Health"],  // Inulin improves bowel regularity:contentReference[oaicite:18]{index=18} and feeds gut bacteria
    benefits: ["Promote Regularity", "Enhance Nutrient Absorption", "Balance Gut Flora"],  // Helps maintain regular bowel movements and nourishes beneficial microbes:contentReference[oaicite:19]{index=19}:contentReference[oaicite:20]{index=20}
    dosage: "2–5 grams per day to start; can gradually increase up to 10–15 grams daily as tolerated.",
    usage: "Mix in water, smoothie, or sprinkle on food. Increase dose slowly (over several weeks) to minimize gas. Take with plenty of water.",
    contraindications: "High doses may cause gas and bloating:contentReference[oaicite:21]{index=21}:contentReference[oaicite:22]{index=22}. Those with sensitive IBS or SIBO should use caution, as inulin (especially from chicory) can aggravate symptoms:contentReference[oaicite:23]{index=23}:contentReference[oaicite:24]{index=24}. If new to fiber supplements, introduce gradually.",
    recommendedProducts: [
      "NOW Foods Organic Inulin Powder",
      "FiberChoice Inulin Prebiotic Chewable"
    ]
  },
  {
    id: "prebiotic_psyllium",
    name: "Psyllium Husk Fiber",
    category: "Prebiotics",
    gutIssues: ["Constipation", "Diarrhea", "IBS"],  // Psyllium helps regulate both constipation and diarrhea:contentReference[oaicite:25]{index=25}:contentReference[oaicite:26]{index=26}
    benefits: ["Promote Regularity", "Support Healthy Weight", "Strengthen Gut Lining"],  // Promotes regular bowel movements, aids weight management via satiety, may support gut barrier via SCFA production:contentReference[oaicite:27]{index=27}:contentReference[oaicite:28]{index=28}
    dosage: "5–10 grams one to two times daily with at least 8 oz of water (e.g., 1 teaspoon to 1 tablespoon per dose).",
    usage: "Best taken with a full glass of water, ideally before a meal or at bedtime. For IBS, start with 5g and titrate up. Ensure adequate hydration throughout the day:contentReference[oaicite:29]{index=29}:contentReference[oaicite:30]{index=30}.",
    contraindications: "Take other medications 1–2 hours apart from psyllium to avoid absorption interference:contentReference[oaicite:31]{index=31}:contentReference[oaicite:32]{index=32}. If you have swallowing difficulties or esophageal narrowing, do not take psyllium undissolved (risk of choking). Introduce slowly to avoid gas. Rarely, may cause allergic reaction in sensitive individuals.",
    recommendedProducts: [
      "Metamucil Psyllium Husk Powder, Sugar-Free",
      "Yerba Prima Organic Psyllium Whole Husk"
    ]
  },
  {
    id: "enzyme_broad",
    name: "Digestive Enzyme Complex (Amylase, Protease, Lipase blend)",
    category: "Enzymes",
    gutIssues: ["Bloating", "Indigestion", "Gas"],  // Enzyme insufficiency can cause bloating, gas, maldigestion:contentReference[oaicite:33]{index=33}:contentReference[oaicite:34]{index=34}
    benefits: ["Improve Digestion", "Reduce Bloating", "Enhance Nutrient Absorption"],  // Helps break down food to reduce bloating and improve nutrient uptake:contentReference[oaicite:35]{index=35}:contentReference[oaicite:36]{index=36}
    dosage: "1–2 capsules with each major meal (dosage varies by product; follow label, e.g., one capsule providing ~20,000 USP units of protease).",
    usage: "Take at the start of a meal. Useful for high-protein or high-fat meals that cause discomfort. If targeting specific foods (e.g., dairy or beans), use an enzyme tailored for that (lactase or alpha-galactosidase):contentReference[oaicite:37]{index=37}.",
    contraindications: "Generally safe when used as directed. **Allergies:** Check source – e.g., avoid pancreatin if pork allergy. **Ulcers:** High-strength proteases might irritate active peptic ulcers. If you have chronic pancreatitis or cystic fibrosis (which require prescription enzymes), OTC enzymes are not a substitute for prescribed therapy.",
    recommendedProducts: [
      "NOW Super Enzymes (with Ox Bile, Bromelain)",
      "Enzymedica Digest Gold Full Spectrum Enzyme"
    ]
  },
  {
    id: "enzyme_lactase",
    name: "Lactase Enzyme",
    category: "Enzymes",
    gutIssues: ["Lactose Intolerance"],  // Specifically targets lactose digestion to prevent gas and diarrhea from dairy:contentReference[oaicite:38]{index=38}:contentReference[oaicite:39]{index=39}
    benefits: ["Reduce Bloating", "Improve Digestion"],  // Reduces dairy-related bloating and digestive upset by breaking down lactose
    dosage: "3,000–9,000 FCC units per serving of dairy (e.g., 1-2 caplets or drops with dairy meal, per product instructions).",
    usage: "Take lactase right before consuming lactose-containing foods (milk, ice cream, etc). It supplies the enzyme needed to digest lactose, preventing symptoms. Dosage can be adjusted to meal size – larger dairy portions may require a higher dose.",
    contraindications: "Safe for most individuals. If you have galactosemia (a rare condition), lactase supplements won’t make dairy safe. Not needed if you avoid dairy or use lactose-free products.",
    recommendedProducts: [
      "Lactaid Fast Act Caplets",
      "Enzymedica Lacto (High Potency Lactase Blend)"
    ]
  },
  {
    id: "vitamin_d3",
    name: "Vitamin D3 (Cholecalciferol)",
    category: "Vitamins",
    gutIssues: ["IBD", "Leaky Gut", "Frequent Illness"],  // Low vitamin D is linked to IBD and increased intestinal permeability:contentReference[oaicite:40]{index=40}:contentReference[oaicite:41]{index=41}
    benefits: ["Boost Immunity", "Strengthen Gut Lining", "Improve Mood & Cognition"],  // Vitamin D supports immune modulation and gut barrier integrity:contentReference[oaicite:42]{index=42}:contentReference[oaicite:43]{index=43}
    dosage: "1,000–2,000 IU (25–50 mcg) daily for maintenance. Higher doses (4,000 IU) may be used short-term if deficient, under medical guidance.",
    usage: "Take with a meal containing fat (improves absorption, since vitamin D is fat-soluble). Consistency is important, especially in winter or if sunlight exposure is low. Monitor blood levels if taking >2,000 IU long-term.",
    contraindications: "Generally safe at recommended doses. **Do not exceed 4,000 IU/day chronically without medical supervision** – excessive vitamin D can cause high calcium levels. Individuals with granulomatous disease or high blood calcium should avoid extra vitamin D. If you have kidney disease or hyperparathyroidism, consult a doctor first.",
    recommendedProducts: [
      "NatureWise Vitamin D3 2,000 IU (Non-GMO, Gluten-Free)",
      "Nordic Naturals Vitamin D3 1,000 IU"
    ]
  },
  {
    id: "vitamin_b_complex",
    name: "Vitamin B-Complex (with B12 & B6)",
    category: "Vitamins",
    gutIssues: ["Fatigue", "Poor Nutrient Absorption"],  // B-vitamin deficiencies can result from malabsorption in celiac, IBD, etc., leading to fatigue
    benefits: ["Increase Energy Levels", "Enhance Nutrient Absorption"],  // Helps convert food to energy; B12 especially supports energy and nerve health
    dosage: "One B-Complex capsule or tablet daily (providing e.g. B1 50 mg, B6 50 mg, B12 500 mcg, etc.).",
    usage: "Take in the morning with food (B vitamins on empty stomach can cause nausea in some). Beneficial for those with restrictive diets or malabsorption issues to ensure adequate B12, B6, folate, etc. Improves energy metabolism.",
    contraindications: "B-complex is water-soluble; excess is excreted. High doses of B6 (>100 mg/day) over long periods can cause neuropathy – stick to reputable dosages. If you have Leber’s disease (hereditary optic nerve atrophy), avoid high-dose B12 (cyanocobalamin form) as it may worsen it. Otherwise generally very safe.",
    recommendedProducts: [
      "Garden of Life Vitamin Code Raw B-Complex",
      "NOW B-50 Complex"
    ]
  }
];
