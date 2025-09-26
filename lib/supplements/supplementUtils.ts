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
export function filterSupplementsBySymptom(issues: string[]): Supplement[] {
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

export function getSupplementInteractions(selectedIds: string[]): string[] {
  const warnings: string[] = [];
  const selectedSupplements = supplements.filter(s => selectedIds.includes(s.id));

  const probioticCount = selectedSupplements.filter(s => s.category === 'Probiotics').length;
  if (probioticCount > 1) {
    warnings.push('You have selected multiple probiotics. While generally safe, it\'s often best to start with one to see how your body responds.');
  }

  const prebioticCount = selectedSupplements.filter(s => s.category === 'Prebiotics').length;
  if (prebioticCount > 1) {
    warnings.push('Taking multiple fiber supplements like Inulin and Psyllium Husk together may increase the risk of gas and bloating. It\'s often best to use one at a time.');
  }

  return warnings;
}

export function checkContraindications(selectedIds: string[], medications: string[], restrictions: string[]): string[] {
  const warnings: string[] = [];
  const selectedSupplements = supplements.filter(s => selectedIds.includes(s.id));
  const allContraindications = medications.concat(restrictions).filter(c => c.trim() !== '').map(c => c.toLowerCase());

  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'in', 'on', 'for', 'with', 'to', 'if', 'not']);

  const tokenize = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(token => !stopWords.has(token) && token.length > 2);
  };

  const userInputTokens = new Set(allContraindications.flatMap(tokenize));

  for (const supplement of selectedSupplements) {
    if (supplement.contraindications) {
      const supplementContraTokens = tokenize(supplement.contraindications);
      for (const userToken of userInputTokens) {
        if (supplementContraTokens.some(contraToken => contraToken.includes(userToken) || userToken.includes(contraToken))) {
          warnings.push(`${supplement.name} may have a contraindication with '${userToken}'. Please review its contraindications and consult a healthcare provider.`);
          break; 
        }
      }
    }
  }
  return warnings;
}