'use client';

import { motion } from 'framer-motion';
import { Gift, Star, Heart } from 'lucide-react';
import { birthdayConfig } from '@/config/birthday';

const floatingDeco = [
  { emoji: '🎈', top: '10%', left: '5%', delay: 0, dur: 4 },
  { emoji: '⭐', top: '20%', right: '8%', delay: 0.5, dur: 3.5 },
  { emoji: '🎀', top: '75%', left: '7%', delay: 1, dur: 5 },
  { emoji: '✨', top: '80%', right: '6%', delay: 0.3, dur: 4.5 },
  { emoji: '🎊', top: '45%', left: '3%', delay: 0.7, dur: 3.8 },
  { emoji: '💖', top: '55%', right: '4%', delay: 1.2, dur: 4.2 },
  { emoji: '🌟', top: '30%', left: '92%', delay: 0.2, dur: 4.8 },
  { emoji: '🎁', top: '65%', left: '90%', delay: 0.9, dur: 3.6 },
];

const staggerChildren = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function BirthdayHero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative text-center px-4 max-w-4xl mx-auto w-full">
      {/* Floating background decorations */}
      {floatingDeco.map((d, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-3xl select-none pointer-events-none hidden md:block"
          style={{ top: d.top, left: 'left' in d ? d.left : undefined, right: 'right' in d ? (d as { right: string }).right : undefined }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {d.emoji}
        </motion.span>
      ))}

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Party hat */}
        <motion.div variants={fadeUp} className="flex justify-center mb-2">
          <motion.span
            className="text-5xl"
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎉
          </motion.span>
        </motion.div>

        {/* HAPPY */}
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl lg:text-[7rem] font-display font-black text-dark-ink leading-none tracking-tight"
        >
          HAPPY
        </motion.h1>

        {/* BIRTHDAY — with shimmer */}
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl lg:text-[7rem] font-display font-black leading-none tracking-tight relative inline-block"
        >
          <span className="text-primary relative">
            BIRTHDAY
            {/* shimmer overlay */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
              style={{ mixBlendMode: 'overlay' }}
            />
          </span>
        </motion.h1>

        {/* Name */}
        <motion.p
          variants={fadeUp}
          className="text-5xl md:text-7xl font-hand text-dark-ink"
        >
          {birthdayConfig.sisterName} 💕
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-2xl text-dark-ink/70 font-body"
        >
          Today is all about you{' '}
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block text-primary"
          >
            ♡
          </motion.span>
        </motion.p>

        {/* Date badge */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-warm-gold/20 border-2 border-warm-gold text-dark-ink px-6 py-2 rounded-full font-semibold tracking-wide shadow"
          >
            <span>🗓</span>
            {birthdayConfig.birthdayDate}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="pt-6">
          <motion.button
            onClick={() => scrollTo('cake')}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-primary text-cream px-10 py-5 rounded-full text-xl font-semibold shadow-2xl shadow-primary/30 overflow-hidden"
            aria-label="Open your surprise"
          >
            {/* Ripple on hover */}
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <Gift size={26} className="group-hover:rotate-12 transition-transform duration-300" />
            Open Your Surprise
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center pt-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-dark-ink/30 text-sm tracking-widest uppercase">scroll down ↓</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
