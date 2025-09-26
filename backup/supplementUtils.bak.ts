// supplementUtils.ts
// Utility functions for supplement logic, filtering, and validation.

import { Supplement, supplements } from './supplementData';

export function filterSupplementsBySymptom(selectedSymptoms: string[]): Supplement[] {
  if (selectedSymptoms.length === 0) {
    return [];
  }
  return supplements.filter(supplement =>
    selectedSymptoms.some(symptom => supplement.symptoms.includes(symptom))
  );
}

export function getSupplementInteractions(selectedIds: string[]): string[] {
  const warnings: string[] = [];
  const selectedSupplements = supplements.filter(s => selectedIds.includes(s.id));

  for (const supplement of selectedSupplements) {
    if (supplement.interactions) {
      for (const interactionId of supplement.interactions) {
        if (selectedIds.includes(interactionId)) {
          const interactingSupplement = supplements.find(s => s.id === interactionId);
          if (interactingSupplement) {
            warnings.push(`${supplement.name} may interact with ${interactingSupplement.name}.`);
          }
        }
      }
    }
  }
  return warnings;
}

export function checkContraindications(selectedIds: string[], medications: string[], restrictions: string[]): string[] {
  const warnings: string[] = [];
  const selectedSupplements = supplements.filter(s => selectedIds.includes(s.id));

  for (const supplement of selectedSupplements) {
    if (supplement.contraindications) {
      for (const contraindication of supplement.contraindications) {
        if (medications.includes(contraindication) || restrictions.includes(contraindication)) {
          warnings.push(`${supplement.name} is not recommended if you are taking/have ${contraindication}.`);
        }
      }
    }
  }
  return warnings;
}
