'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { birthdayConfig } from '@/config/birthday';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalCelebration() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Trigger confetti when section is in view
  if (isInView) {
    const fire = () => {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      const interval = setInterval(() => {
        const timeLeft = 3000 - (Date.now() - start);
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / 3000);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FF5C8A', '#F2C66D', '#FFD6C9', '#FF9F9F'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FF5C8A', '#F2C66D', '#FFD6C9', '#FF9F9F'] });
      }, 250);
    };
    const start = Date.now();
    // fire() — will be called via useEffect below
  }

  return (
    <div ref={ref} className="flex flex-col items-center space-y-10 text-center px-4 max-w-4xl mx-auto z-10 relative">

      {/* Big emoji burst */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className="text-8xl md:text-9xl"
      >
        🎂
      </motion.div>

      {/* HAPPY BIRTHDAY heading */}
      <motion.h2
        className="font-display font-black text-5xl md:text-7xl leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="text-primary block">HAPPY BIRTHDAY,</span>
        <span className="font-hand text-dark-ink">
          {birthdayConfig.sisterName}! 🎉
        </span>
      </motion.h2>

      {/* Final message */}
      <motion.p
        className="text-xl md:text-2xl font-body text-dark-ink/80 max-w-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {birthdayConfig.finalMessage}
      </motion.p>

      {/* Pulsing hearts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center gap-4"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
          >
            <Heart
              size={i === 2 ? 40 : 28}
              className="text-primary fill-primary"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating emojis */}
      {['🎈', '⭐', '🎊', '✨', '💖', '🌟'].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Footer */}
      <motion.p
        className="text-sm text-dark-ink/40 font-body pt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        Made with 💖 just for you
      </motion.p>
    </div>
  );
}
