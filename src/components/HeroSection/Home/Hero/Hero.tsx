"use client"
import React from 'react';
import Background from './Background';
import HeroContent from './HeroContent';

const Hero: React.FC = () => (
  <div className="relative min-h-screen">
    <Background />
    <HeroContent />
  </div>
);

export default Hero;