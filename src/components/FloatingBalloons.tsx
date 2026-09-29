'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Balloon {
  id: number;
  color: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
}

const BALLOON_COLORS = [
  '#FF5C8A', '#FF9F9F', '#F2C66D', '#FFD6C9',
  '#FFF0F4', '#ff7eb3', '#ffb347', '#ffd1dc',
];

export default function FloatingBalloons() {
  const balloons: Balloon[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        x: 5 + (i / 11) * 90,
        size: 28 + Math.random() * 24,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 5,
        swayAmount: 15 + Math.random() * 30,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-0"
          style={{ left: `${b.x}%` }}
          initial={{ y: '110vh', rotate: 0 }}
          animate={{
            y: '-20vh',
            x: [0, b.swayAmount, -b.swayAmount, b.swayAmount / 2, 0],
            rotate: [0, 8, -8, 4, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 4,
              ease: 'easeInOut',
            },
            x: {
              duration: b.duration * 0.6,
              delay: b.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: b.duration * 0.4,
              delay: b.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Balloon SVG */}
          <svg
            width={b.size}
            height={b.size * 1.4}
            viewBox="0 0 60 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow/shine */}
            <ellipse cx="30" cy="30" rx="28" ry="30" fill={b.color} />
            <ellipse cx="22" cy="18" rx="8" ry="6" fill="white" opacity="0.3" />
            {/* Bottom tip */}
            <path d="M27 60 L30 70 L33 60 Z" fill={b.color} />
            {/* String */}
            <path
              d="M30 70 Q34 76 28 80 Q32 82 30 84"
              stroke="#241A22"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
