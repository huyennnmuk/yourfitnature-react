
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const journeyItems = [
    {
        year: "2015 – A GUT AWAKENING",
        text: "The founder began exploring gut healing after battling fatigue, bloating, and brain fog."
    },
    {
        year: "2018 – SHARING THE JOURNEY",
        text: "Started writing about digestive wellness."
    },
    {
        year: "2021 – FITNATURE IS BORN",
        text: "Created a platform to guide busy people through gut restoration."
    },
    {
        year: "NOW – COMMUNITY & CONNECTION",
        text: "Supporting a growing tribe with trusted content, expert reviews, and heart-driven guidance."
    }
];

const OurJourney = () => {
  return (
    <section className="py-16 sm:py-20">
      <h2 className="typography-h1 mb-4 text-center text-grey mb-16">
        Our Journey
      </h2>
      <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-camber-background-muted"></div>
          {journeyItems.map((item, index) => (
              <motion.div
                  key={index}
                  className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-[#f5f5f580] p-6 rounded-lg shadow-lg border border-camber-background-light">
                          <p className="font-bold text-camber-text-primary">{item.year}</p>
                          <p className="text-camber-text-secondary mt-2">{item.text}</p>
                      </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-camber-sage-primary rounded-full border-4 border-white"></div>
              </motion.div>
          ))}
      </div>
    </section>
  );
};

export default OurJourney;
