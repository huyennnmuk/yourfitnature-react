import React from 'react';
import ReusableButton from '@/app/components/ReusableButton';
import AffiliateDisclosureBadge from '@/app/components/AffiliateDisclosureBadge';

interface AffiliateProduct {
    id: string;
    name: string;
    rationale: string;
    url: string;
}

interface SupportStackSectionProps {
    affiliateProducts: (AffiliateProduct | undefined)[];
}

const SupportStackSection: React.FC<SupportStackSectionProps> = ({ affiliateProducts }) => {
    return (
        <section className="mb-16 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-camber-text-primary text-center mb-8">
                <AffiliateDisclosureBadge tooltipText="These are affiliate links that help fund our free educational content. We only recommend products we trust.">
                    Phase-Specific Support Stack
                </AffiliateDisclosureBadge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {affiliateProducts.map(product => (
                    product ? (
                        <div key={product.id} className="border border-camber-background-muted rounded-lg p-4 flex flex-col text-center">
                            <h4 className="font-bold text-camber-text-primary mb-2">{product.name}</h4>
                            <p className="text-sm text-camber-text-secondary mb-4 flex-grow">{product.rationale}</p>
                            <ReusableButton as="a" href={product.url} target="_blank" className="!text-sm !py-2 !px-4 mt-auto">
                                View Details
                            </ReusableButton>
                        </div>
                    ) : null
                ))}
            </div>
        </section>
    );
};

export default SupportStackSection;