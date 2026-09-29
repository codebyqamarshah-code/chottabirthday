'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

// Dynamically import the 3D canvas — keeps initial bundle small
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), {
  ssr: false,
  loading: () => <BearFallback />,
});

function BearFallback() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64">
        <circle cx="100" cy="130" r="55" fill="#FFE5C4" />
        <circle cx="100" cy="130" r="45" fill="#FFD6A5" />
        <circle cx="100" cy="80" r="45" fill="#FFE5C4" />
        <circle cx="65" cy="50" r="18" fill="#FFE5C4" />
        <circle cx="65" cy="50" r="10" fill="#FFB5A7" />
        <circle cx="135" cy="50" r="18" fill="#FFE5C4" />
        <circle cx="135" cy="50" r="10" fill="#FFB5A7" />
        <ellipse cx="75" cy="85" rx="8" ry="4" fill="#FFB5A7" opacity="0.6" />
        <ellipse cx="125" cy="85" rx="8" ry="4" fill="#FFB5A7" opacity="0.6" />
        <circle cx="85" cy="75" r="4" fill="#241A22" />
        <circle cx="115" cy="75" r="4" fill="#241A22" />
        <ellipse cx="100" cy="85" rx="12" ry="10" fill="#FFF8F2" />
        <circle cx="100" cy="82" r="3" fill="#241A22" />
        <path d="M95 88 Q100 93 105 88" stroke="#241A22" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M80 40 L100 5 L120 40 Z" fill="#FF5C8A" />
        <circle cx="100" cy="5" r="6" fill="#F2C66D" />
        <rect x="70" y="110" width="60" height="50" rx="4" fill="#FFD6C9" />
        <rect x="95" y="110" width="10" height="50" fill="#FF5C8A" />
        <rect x="65" y="105" width="70" height="15" rx="2" fill="#FFD6C9" />
        <rect x="95" y="105" width="10" height="15" fill="#FF5C8A" />
        <path d="M100 105 C80 90, 80 115, 100 105" fill="#FF5C8A" />
        <path d="M100 105 C120 90, 120 115, 100 105" fill="#FF5C8A" />
      </svg>
    </motion.div>
  );
}

export default function BirthdayCharacter() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 max-w-6xl mx-auto">
      {/* Container made larger and responsive */}
      <div className="relative w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] aspect-square md:aspect-video flex items-center justify-center mb-8">
        
        {/* Blob stage background - resized to fit container */}
        <motion.div
          className="absolute inset-0 m-auto w-[90%] md:w-[70%] lg:w-[60%] aspect-square"
          animate={{
            borderRadius: [
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '60% 40% 30% 70% / 50% 60% 40% 60%',
              '40% 60% 70% 30% / 40% 50% 60% 50%',
            ],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(135deg, #FFF0F4 0%, #FFD6C9 100%)', zIndex: 0 }}
        />

        {/* 3D Canvas wrapper - Full width/height of container */}
        <div className="absolute inset-0 z-10">
          <Suspense fallback={<BearFallback />}>
            <ThreeCanvas />
          </Suspense>
        </div>

        {/* Orbiting sparkles */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute text-xl md:text-2xl z-20"
            style={{ top: '50%', left: '50%', transformOrigin: '0 0' }}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
          >
            <span
              style={{
                display: 'block',
                transform: `translate(${window?.innerWidth > 768 ? 250 : 160 * Math.cos((deg * Math.PI) / 180)}px, ${window?.innerWidth > 768 ? 250 : 160 * Math.sin((deg * Math.PI) / 180)}px)`,
              }}
            >
              {['✨', '⭐', '💖', '🌟', '✦', '🎀'][i]}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center z-20 bg-cream/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border-2 border-white/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-3xl md:text-4xl font-hand text-primary mb-2">
          "I brought you a gift! 🎁"
        </p>
        <p className="text-dark-ink/70 font-body text-sm md:text-base">
          (You can rotate the cake!)
        </p>
      </motion.div>
    </div>
  );
}
