'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  vx: number;
  vy: number;
}

const EMOJIS = ['🎉', '🎊', '🎈', '⭐', '✨', '💫', '🌟', '🎀', '💖', '🎁', '🎂', '🥳'];

export default function PartyBomb() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [exploded, setExploded] = useState(false);
  const [bombShake, setBombShake] = useState(false);

  const explode = useCallback(() => {
    setBombShake(true);
    setTimeout(() => setBombShake(false), 600);
    setExploded(true);

    // Massive confetti burst - multiple volleys
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6, x: 0.5 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#FF5C8A', '#FF9F9F', '#F2C66D', '#FFD6C9', '#FFF0F4', '#241A22', '#ffffff'],
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Side cannons
    setTimeout(() => {
      confetti({ angle: 60, spread: 80, particleCount: 120, origin: { x: 0, y: 0.6 }, colors: ['#FF5C8A', '#F2C66D', '#FFD6C9'] });
      confetti({ angle: 120, spread: 80, particleCount: 120, origin: { x: 1, y: 0.6 }, colors: ['#FF9F9F', '#FFF0F4', '#FF5C8A'] });
    }, 200);

    setTimeout(() => {
      confetti({ angle: 70, spread: 60, particleCount: 80, origin: { x: 0, y: 0.5 }, colors: ['#F2C66D', '#FF5C8A'] });
      confetti({ angle: 110, spread: 60, particleCount: 80, origin: { x: 1, y: 0.5 }, colors: ['#FF9F9F', '#FFD6C9'] });
    }, 500);

    // Emoji particles
    const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: 20 + Math.random() * 20,
      duration: 1.5 + Math.random() * 1.5,
      delay: Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 300,
      vy: -(100 + Math.random() * 200),
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
    setTimeout(() => setExploded(false), 2000);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      {/* Floating emoji particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute select-none"
              style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [1, 1, 0],
                x: p.vx,
                y: p.vy,
                scale: [0, 1.5, 0.8],
                rotate: (Math.random() - 0.5) * 720,
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              exit={{ opacity: 0 }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Label */}
      <motion.p
        className="font-hand text-2xl text-dark-ink mb-6"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Ready for a surprise? 🎊
      </motion.p>

      {/* The Bomb Button */}
      <motion.button
        onClick={explode}
        animate={bombShake ? {
          x: [-8, 8, -8, 8, -4, 4, 0],
          rotate: [-5, 5, -5, 5, -2, 2, 0],
        } : {
          scale: [1, 1.04, 1],
          y: [0, -4, 0],
        }}
        transition={bombShake ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
        aria-label="Party bomb - click to explode!"
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-warm-gold/20"
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />

        {/* Bomb itself */}
        <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-dark-ink to-[#3d2f3a] shadow-2xl border-4 border-warm-gold">
          <span className="text-5xl select-none">💣</span>
          {/* Fuse spark */}
          <motion.div
            className="absolute -top-2 -right-1 text-2xl"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1], rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </div>
      </motion.button>

      {/* Hint text */}
      <motion.p
        className="mt-4 text-sm text-dark-ink/50 font-body tracking-wider uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to Explode! 💥
      </motion.p>

      {/* Explosion overlay text */}
      <AnimatePresence>
        {exploded && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: [0, 1.3, 1], rotate: [0, 5, -2, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="bg-cream/95 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-4 border-primary text-center"
            >
              <p className="text-6xl mb-3">🥳</p>
              <p className="font-display text-4xl text-primary font-bold">BOOM!</p>
              <p className="font-hand text-2xl text-dark-ink mt-2">Happy Birthday Maha! 🎉</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
