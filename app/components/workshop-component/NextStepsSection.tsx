import React from 'react';
import ReusableButton from '@/app/components/ReusableButton';
import { LucideIcon } from 'lucide-react';

interface NextStep {
    title: string;
    description: string;
    cta: string;
    href: string;
    icon: LucideIcon;
}

interface NextStepsSectionProps {
    nextSteps: NextStep[];
}

const NextStepsSection: React.FC<NextStepsSectionProps> = ({ nextSteps }) => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-camber-text-primary text-center mb-8">Continue Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {nextSteps.map(step => (
                    <div key={step.title} className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-camber-background-medium flex items-center justify-center mb-5">
                            <step.icon className="w-8 h-8 text-camber-sage-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-camber-text-primary mb-2">{step.title}</h3>
                        <p className="text-camber-text-secondary mb-4 flex-grow">{step.description}</p>
                        <ReusableButton as="a" href={step.href} className="!bg-camber-sage-primary !text-white mt-auto">
                            {step.cta}
                        </ReusableButton>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NextStepsSection;