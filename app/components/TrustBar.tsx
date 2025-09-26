import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, ShieldCheck } from 'lucide-react';

const trustPoints = [
    {
        icon: Users,
        text: "Used by 22,000+ women"
    },
    {
        icon: HeartHandshake,
        text: "Ethical, ad-free affiliate model only"
    },
    {
        icon: ShieldCheck,
        text: "Community-vetted protocols"
    }
];

const TrustBar = () => {
  return (
    <div className="relative z-10 -mt-12">
        <motion.div 
            className="container mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/80">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/70">
                    {trustPoints.map((point, index) => (
                        <div key={index} className="flex items-center justify-center gap-3 p-4 text-center">
                            <point.icon className="w-6 h-6 text-camber-sage-primary flex-shrink-0" />
                            <span className="text-camber-text-secondary font-medium text-sm">{point.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default TrustBar;