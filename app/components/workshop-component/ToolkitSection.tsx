'use client';
import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import ReusableButton from '../ReusableButton';

interface Resource {
    name: string;
    href: string;
    downloadName?: string;
    size: string;
    description: string;
}

interface ToolkitSectionProps {
    resources: Resource[];
}

const AccordionItem: React.FC<{ resource: Resource }> = ({ resource }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-start p-4 focus:outline-none"
            >
                <span className="flex items-center justify-start w-full text-left">
                    <span className="font-semibold text-camber-text-primary flex-1 text-left">{resource.name}</span>
                    <ChevronDown
                        className={`w-5 h-5 text-camber-sage-primary transform transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40' : 'max-h-0'
                }`}
            >
                <div className="p-4 flex flex-col items-start gap-4 bg-camber-bg-secondary rounded-b-md">
                    <p className="text-sm text-camber-text-secondary">{resource.description}</p>
                    <ReusableButton
                        as="a"
                        href={resource.href}
                        download={resource.downloadName || resource.name}
                        className="!bg-perplexity-primary !text-white hover:!bg-opacity-90 transform hover:scale-105 transition-transform flex items-center"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        <span>Download ({resource.size})</span>
                    </ReusableButton>
                </div>
            </div>
        </li>
    );
};

const ToolkitSection: React.FC<ToolkitSectionProps> = ({ resources }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="lg:col-span-1 p-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between focus:outline-none"
            >
                <h3 className="text-xl font-bold text-camber-text-primary">Your Toolkit</h3>
                <ChevronDown
                    className={`w-5 h-5 text-camber-sage-primary transform transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen mt-4' : 'max-h-0'
                }`}
            >
                <ul className="space-y-0">
                    {resources.map(resource => (
                        <AccordionItem key={resource.name} resource={resource} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToolkitSection;