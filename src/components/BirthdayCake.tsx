'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [wishMade, setWishMade] = useState(false);

  const handleWish = () => {
    setWishMade(true);
    
    // Confetti burst
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    const interval = setInterval(function() {
      const particleCount = 50;
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    setTimeout(() => clearInterval(interval), 1500);
  };

  return (
    <div className="flex flex-col items-center space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Cake – SVG for lightweight rendering */}
        <svg
          className="w-72 md:w-96 drop-shadow-xl"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cake Stand */}
          <path d="M40 120 Q100 140 160 120 L150 140 Q100 150 50 140 Z" fill="#F2C66D" />
          <rect x="90" y="140" width="20" height="20" fill="#F2C66D" />
          <path d="M60 160 Q100 170 140 160 L140 165 Q100 175 60 165 Z" fill="#F2C66D" />

          {/* Bottom Layer */}
          <rect x="40" y="90" width="120" height="30" rx="4" fill="#FFD6C9" />
          <path d="M40 95 Q100 85 160 95 L160 120 Q100 135 40 120 Z" fill="#FFC2B3" />
          
          {/* Middle Layer */}
          <rect x="55" y="65" width="90" height="25" rx="4" fill="#FF9F9F" />
          <path d="M55 70 Q100 60 145 70 L145 90 Q100 100 55 90 Z" fill="#FF8585" />
          
          {/* Top Layer */}
          <rect x="70" y="45" width="60" height="20" rx="4" fill="#FFF8F2" />
          <path d="M70 50 Q100 45 130 50 L130 65 Q100 70 70 65 Z" fill="#FFEFE0" />

          {/* Drip Frosting */}
          <path d="M40 90 Q45 105 50 90 Q55 110 60 90 Q65 100 70 90" fill="#FFF8F2" />
          <path d="M55 65 Q60 75 65 65 Q70 80 75 65" fill="#FFF8F2" />
          <path d="M70 45 Q75 55 80 45 Q85 60 90 45 Q95 50 100 45" fill="#FF5C8A" />

          {/* Sprinkles / Strawberries */}
          <circle cx="80" cy="55" r="2" fill="#FF5C8A" />
          <circle cx="110" cy="52" r="2" fill="#FF5C8A" />
          <circle cx="120" cy="58" r="2" fill="#FF5C8A" />
          
          <rect x="60" y="75" width="4" height="2" fill="#F2C66D" transform="rotate(45 60 75)" />
          <rect x="90" y="80" width="4" height="2" fill="#FFF8F2" transform="rotate(-30 90 80)" />
          <rect x="120" y="70" width="4" height="2" fill="#F2C66D" transform="rotate(15 120 70)" />
          
          <rect x="50" y="105" width="4" height="2" fill="#FF5C8A" transform="rotate(20 50 105)" />
          <rect x="90" y="110" width="4" height="2" fill="#FF5C8A" transform="rotate(-40 90 110)" />
          <rect x="130" y="100" width="4" height="2" fill="#FFF8F2" transform="rotate(60 130 100)" />

          {/* Candles */}
          {[80, 100, 120].map((cx, i) => (
            <g key={i}>
              {/* Candle Stick */}
              <rect x={cx - 3} y="20" width="6" height="25" fill={['#FFD6C9', '#FF9F9F', '#FFD6C9'][i]} rx="1" />
              {/* Candle stripes */}
              <path d={`M${cx - 3} 25 L${cx + 3} 30 M${cx - 3} 35 L${cx + 3} 40`} stroke="#FFF8F2" strokeWidth="2" />
              
              {/* Flame */}
              <AnimatePresence>
                {!wishMade && (
                  <motion.g 
                    className="flame-dance" 
                    style={{ transformOrigin: `${cx}px 18px` }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <path d={`M${cx} 5 Q${cx+5} 12 ${cx} 18 Q${cx-5} 12 ${cx} 5 Z`} fill="#F2C66D" />
                    <path d={`M${cx} 8 Q${cx+3} 13 ${cx} 17 Q${cx-3} 13 ${cx} 8 Z`} fill="#FF9F9F" />
                  </motion.g>
                )}
                {wishMade && (
                  <motion.path 
                    initial={{ opacity: 1, pathLength: 0 }}
                    animate={{ opacity: 0, pathLength: 1, y: -20, x: (i-1)*10 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={`M${cx} 15 Q${cx+10} 0 ${cx} -10`} 
                    stroke="#a0a0a0" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeLinecap="round"
                    className="smoke-puff"
                  />
                )}
              </AnimatePresence>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Make a Wish CTA */}
      <AnimatePresence mode="wait">
        {!wishMade ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-xl font-hand text-dark-ink mb-4">Make a Wish ✨</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleWish}
              className="bg-primary text-cream px-8 py-3 rounded-full shadow-lg font-medium tracking-wide"
            >
              Blow Candles
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-hand text-primary"
          >
            Wish made ✨<br/>
            <span className="text-lg text-dark-ink">May it come true soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
