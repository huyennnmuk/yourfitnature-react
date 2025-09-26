import { checkContraindications, getSupplementInteractions } from './supplementUtils';

describe('supplementUtils', () => {
  it('filters supplements by restrictions', () => {
    const warnings = checkContraindications(['enzyme'], [], ['allergy_to_pineapple_or_papaya']);
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('detects supplement interactions', () => {
    const result = getSupplementInteractions(['enzyme', 'probiotic']);
    expect(result.length).toBeGreaterThan(0);
  });
});
