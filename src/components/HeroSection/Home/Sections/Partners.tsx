"use client"
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: "Spotify", icon: "spotify" },
  { name: "Microsoft", icon: "windows" },
  { name: "Google", icon: "chrome" },
  { name: "Amazon", icon: "shopping-cart" },
  { name: "Apple", icon: "apple" },
  { name: "Meta", icon: "facebook" },
  { name: "Twitter", icon: "twitter" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "GitHub", icon: "github" },
  { name: "Discord", icon: "message-circle" },
];

const Partners = () => {
  return (
    <section id="partners-section" className="relative py-20 overflow-hidden bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Trusted Partners
          </h2>
          <p className="text-lg text-gray-300">
            Working with leading brands to deliver exceptional experiences
          </p>
        </div>

        <div className="relative">
          {/* First Row */}
          <motion.div
            className="flex mb-8 space-x-12"
            animate={{
              x: [0, -1035],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-48 h-24 p-8 transition-colors duration-300 transform bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 hover:scale-105"
              >
                <span className="text-lg font-semibold text-white/70 hover:text-white">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Second Row (Reverse Direction) */}
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [-1035, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-48 h-24 p-8 transition-colors duration-300 transform bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 hover:scale-105"
              >
                <span className="text-lg font-semibold text-white/70 hover:text-white">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 z-10 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent" />
      <div className="absolute top-0 right-0 z-10 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent" />
    </section>
  );
};

export default Partners;