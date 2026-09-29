'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const FLAG_COLORS = [
  '#FF5C8A', '#F2C66D', '#FF9F9F', '#FFD6C9',
  '#FF5C8A', '#F2C66D', '#FF9F9F',
];

export default function Bunting() {
  const flags = useMemo(() =>
    FLAG_COLORS.map((color, i) => ({
      id: i,
      color,
      letter: 'HAPPY BDY🎂'[i] || '',
    })),
    []
  );

  return (
    <div className="w-full pointer-events-none" aria-hidden="true">
      {/* SVG rope */}
      <svg
        className="w-full"
        viewBox="0 0 900 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rope */}
        <path
          d="M 0 30 Q 112 70 225 30 Q 337 0 450 30 Q 562 70 675 30 Q 787 0 900 30"
          stroke="#241A22"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        {/* Flags */}
        {flags.map((flag, i) => {
          const x = (i / (flags.length - 1)) * 880 + 10;
          const yOffset = i % 2 === 0 ? 28 : 42;
          return (
            <motion.g
              key={flag.id}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              style={{ transformOrigin: `${x}px ${yOffset}px` }}
            >
              {/* Triangle flag */}
              <polygon
                points={`${x - 14},${yOffset} ${x + 14},${yOffset} ${x},${yOffset + 28}`}
                fill={flag.color}
                stroke="#241A22"
                strokeWidth="1.2"
                opacity="0.9"
              />
              {/* Letter */}
              <text
                x={x}
                y={yOffset + 16}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#FFF8F2"
                fontFamily="sans-serif"
              >
                {flag.letter}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
