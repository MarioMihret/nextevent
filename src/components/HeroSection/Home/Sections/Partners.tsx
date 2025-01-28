"use client";
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
    <section id="partners-section" className="relative py-20 overflow-hidden bg-black">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Trusted Partners
          </h2>
          <p className="text-gray-300 text-lg">
            Working with leading brands to deliver exceptional experiences
          </p>
        </div>

        <div className="relative">
          {/* First Row */}
          <motion.div
            className="flex space-x-12 mb-8"
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
                className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur-sm rounded-xl p-8 
                          flex items-center justify-center hover:bg-white/20 transition-colors 
                          transform hover:scale-105 duration-300"
              >
                <span className="text-white/70 hover:text-white text-lg font-semibold">
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
                className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur-sm rounded-xl p-8 
                          flex items-center justify-center hover:bg-white/20 transition-colors 
                          transform hover:scale-105 duration-300"
              >
                <span className="text-white/70 hover:text-white text-lg font-semibold">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
};

export default Partners;