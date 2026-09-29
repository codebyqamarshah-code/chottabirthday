'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MEMORIES = [
  { id: 1, text: "For being the best sister ever! 💖", rotation: -5, emoji: "👯‍♀️" },
  { id: 2, text: "For all the late night talks 🌙", rotation: 3, emoji: "🗣️" },
  { id: 3, text: "For always having my back 🛡️", rotation: -2, emoji: "💪" },
  { id: 4, text: "For your amazing smile 😊", rotation: 4, emoji: "✨" },
  { id: 5, text: "For being YOU! 🌟", rotation: -4, emoji: "👑" },
];

export default function PolaroidMemories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(MEMORIES);

  const nextCard = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const movedCard = newCards.shift();
      if (movedCard) newCards.push(movedCard);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 px-4">
      <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-[3/4] cursor-pointer" onClick={nextCard}>
        <AnimatePresence mode="popLayout">
          {cards.map((card, i) => {
            const isTop = i === 0;
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 100 }}
                animate={{
                  scale: 1 - i * 0.05,
                  y: i * 15,
                  zIndex: cards.length - i,
                  rotate: isTop ? card.rotation : (i % 2 === 0 ? 2 : -2),
                  opacity: 1 - i * 0.15,
                }}
                exit={{ x: -200, opacity: 0, rotate: -20, transition: { duration: 0.3 } }}
                whileHover={isTop ? { scale: 1.05, rotate: 0, y: -10 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`absolute inset-0 bg-white rounded-xl shadow-2xl p-4 flex flex-col ${isTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
                style={{
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {/* Polaroid "Photo" Area */}
                <div className="flex-1 bg-soft-rose rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20 mb-4 overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" 
                      animate={isTop ? { opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-7xl md:text-8xl drop-shadow-md z-10">{card.emoji}</span>
                </div>
                
                {/* Polaroid Text Area */}
                <div className="h-20 flex flex-col items-center justify-center">
                  <p className="font-hand text-2xl md:text-3xl text-dark-ink text-center">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.p
        className="mt-12 text-sm text-dark-ink/50 font-body uppercase tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap card to reveal next
      </motion.p>
    </div>
  );
}
