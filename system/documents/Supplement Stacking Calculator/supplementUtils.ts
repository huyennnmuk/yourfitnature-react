/**
 * Supplement Stacking Utilities – functions to filter supplements by user inputs and validate conflicts.
 * Provides filtering by symptoms (gut issues) and benefits, and checks for any contraindication conflicts or redundancies in a supplement stack.
 * The goal is to return recommendations and warnings that the React UI (SupplementStackingCalculator.tsx) can use to inform the user.
 */
import { supplements, Supplement } from './supplementData';

/**
 * Filter supplements by one or more gut issues (symptoms/conditions).
 * Returns all supplements that align with at least one of the specified issues.
 */
export function filterByIssues(issues: string[]): Supplement[] {
  if (!issues || issues.length === 0) return [];
  const issueSet = new Set(issues.map(i => i.toLowerCase()));
  return supplements.filter(supp =>
    supp.gutIssues.some(issue => issueSet.has(issue.toLowerCase()))
  );
}

/**
 * Filter supplements by one or more desired benefits.
 * Returns all supplements that offer at least one of the specified benefits.
 */
export function filterByBenefits(benefits: string[]): Supplement[] {
  if (!benefits || benefits.length === 0) return [];
  const benefitSet = new Set(benefits.map(b => b.toLowerCase()));
  return supplements.filter(supp =>
    supp.benefits.some(benefit => benefitSet.has(benefit.toLowerCase()))
  );
}

/**
 * Generate a recommended supplement stack based on selected gut issues and desired benefits.
 * This combines filters: any supplement relevant to at least one selected issue OR benefit will be included.
 * It also performs basic conflict checks and appends any warnings.
 * @param issues - array of gut issues the user wants to address
 * @param benefits - array of supplement benefits the user desires
 * @returns Object with recommended supplements array and conflict warnings array
 */
interface StackResult {
  recommended: Supplement[];
  warnings: string[];   // any conflict or caution messages for the selected stack
}
export function getRecommendedStack(issues: string[], benefits: string[]): StackResult {
  // Get unique set of relevant supplements by union of filters
  const byIssue = filterByIssues(issues);
  const byBenefit = filterByBenefits(benefits);
  const combined = [...byIssue, ...byBenefit];
  const uniqueRecs: Supplement[] = [];
  const seen = new Set<string>();
  for (const supp of combined) {
    if (!seen.has(supp.id)) {
      uniqueRecs.push(supp);
      seen.add(supp.id);
    }
  }

  const warnings: string[] = [];
  // Conflict validation rules:
  // 1. If user has SIBO (Small Intestine Bacterial Overgrowth) but a prebiotic is recommended, warn that prebiotics (fibers) might worsen SIBO symptoms:contentReference[oaicite:59]{index=59}.
  if (issues.map(i => i.toLowerCase()).includes("sibo")) {
    uniqueRecs.forEach(supp => {
      if (supp.category.toLowerCase() === "prebiotics") {
        warnings.push(`Prebiotics like ${supp.name} may cause bloating or discomfort if you have SIBO. Consider introducing slowly or postponing prebiotics until SIBO is managed:contentReference[oaicite:60]{index=60}.`);
      }
    });
  }
  // 2. If any recommended supplement explicitly lists a contraindication that matches one of the user's issues or a common restriction, flag it.
  // For example, if user has IBS and supplement contraindications mention IBS or sensitive gut, warn.
  issues.forEach(userIssue => {
    uniqueRecs.forEach(supp => {
      const issueKey = userIssue.toLowerCase();
      if (supp.contraindications.toLowerCase().includes(issueKey)) {
        warnings.push(`Caution: ${supp.name} might not be suitable for ${userIssue} (per its contraindications). Please consult guidance before use.`);
      }
    });
  });
  // 3. Redundancy check: if multiple supplements of the same category are in the stack, it might be unnecessary duplication or require caution.
  // (E.g., two different fiber supplements could collectively cause excessive fiber intake.)
  const categoriesCount: Record<string, number> = {};
  uniqueRecs.forEach(supp => {
    categoriesCount[supp.category] = (categoriesCount[supp.category] || 0) + 1;
  });
  for (const [cat, count] of Object.entries(categoriesCount)) {
    if (count > 1) {
      warnings.push(`Note: You have ${count} supplements in the ${cat} category in your stack. Taking multiple ${cat.toLowerCase()}s simultaneously may be redundant or require careful dosing.`);
    }
  }

  return { recommended: uniqueRecs, warnings };
}

/**
 * Example validation: check for any hard safety conflicts among selected supplements.
 * For instance, avoid combining too many supplements that have similar effects (e.g., multiple laxatives) or any known direct contraindications between them.
 * Currently, this is a placeholder that could be expanded with specific interaction logic.
 */
export function validateStackSelections(selectedIds: string[]): string[] {
  const conflictMessages: string[] = [];
  const selectedSupps = supplements.filter(s => selectedIds.includes(s.id));
  // Example rule: if both a probiotic and an antibiotic were selected (if antibiotics were in our data), that could be a conflict in timing.
  // (This project dataset does not include medications, so this is just illustrative.)
  // Another example: if more than one high-dose vitamin is selected, ensure not exceeding safe upper limits collectively.
  // For simplicity, we just demonstrate a check on Vitamin D dose if multiple sources of D (from multivitamin + standalone).
  const hasVitD = selectedSupps.filter(s => s.name.toLowerCase().includes("vitamin d"));
  if (hasVitD.length > 1) {
    conflictMessages.push("You have multiple Vitamin D sources selected. Ensure combined Vitamin D intake does not exceed safe levels (generally 4,000 IU/day) to avoid toxicity.");
  }
  return conflictMessages;
}
