"use client"
import React from 'react';
import { TypewriterText } from './TypewriterText';
import CallToAction from './CallToAction';
import HeroStats from './HeroStats';

const HeroContent: React.FC = () => (
  <div className="container relative px-6 pt-32 mx-auto">
    <div className="max-w-4xl">
      <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl animate-slide-up">
        Creating{' '}
        <span className="text-purple-500 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterText 
            words={['Unforgettable', 'Magical', 'Perfect']} 
            delay={150}
          />
        </span>{' '}
        Events
      </h1>
      
      <p className="mb-8 text-xl text-gray-300 animate-slide-up-delay">
        Transform your vision into extraordinary experiences. From corporate gatherings 
        to dream weddings, we create moments that last a lifetime.
      </p>

      <CallToAction />
      <HeroStats />
    </div>
  </div>
);

export default HeroContent;