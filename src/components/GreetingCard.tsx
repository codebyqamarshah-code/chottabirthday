'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart } from 'lucide-react';
import { birthdayConfig } from '@/config/birthday';

export default function GreetingCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div 
        className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[3/4] perspective-[1000px] cursor-pointer group"
        onClick={() => !isOpen && setIsOpen(true)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isOpen ? -180 : 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 15 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
        >
          {/* Card Front */}
          <div 
            className="absolute inset-0 bg-cream rounded-2xl shadow-2xl border-4 border-primary p-6 flex flex-col items-center justify-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-2 border-2 border-dashed border-secondary rounded-xl pointer-events-none" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={48} className="text-primary mb-6 fill-primary" />
            </motion.div>
            
            <h2 className="text-3xl font-display text-dark-ink text-center leading-tight">
              A Special<br/>Message<br/>For You
            </h2>
            
            <div className="mt-8 text-secondary group-hover:text-primary transition-colors flex flex-col items-center">
              <MailOpen size={24} className="mb-2" />
              <span className="text-sm uppercase tracking-widest font-semibold">Tap to Open</span>
            </div>

            {/* Decorative doodles */}
            <span className="absolute top-8 left-8 text-primary text-xl">✦</span>
            <span className="absolute bottom-8 right-8 text-warm-gold text-2xl font-hand">☆</span>
          </div>

          {/* Card Inside (Revealed when open) */}
          <div 
            className="absolute inset-0 bg-[#fffdfa] rounded-2xl shadow-inner border-2 border-soft-peach p-8 overflow-y-auto custom-scrollbar"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)', 
            }}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-full flex flex-col justify-center"
                >
                  <p className="font-hand text-xl text-primary mb-2">To the most amazing sister ♡</p>
                  <h3 className="font-display text-3xl text-dark-ink mb-6">
                    Happy Birthday, {birthdayConfig.sisterName}!
                  </h3>
                  <p className="font-body text-lg leading-relaxed text-dark-ink/80 flex-grow whitespace-pre-wrap">
                    {birthdayConfig.personalMessage}
                  </p>
                  
                  {/* Floating hearts inside card */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-primary opacity-50 heart-float"
                      style={{ 
                        left: `${20 + Math.random() * 60}%`, 
                        bottom: '20px',
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    >
                      <Heart size={16} fill="currentColor" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Card Back (Inner right side of the open card) */}
        <motion.div 
          className="absolute inset-0 bg-cream rounded-2xl shadow-xl border-r-4 border-y-4 border-primary p-6 backface-hidden -z-10 origin-left"
          animate={{ rotateY: isOpen ? 0 : 0, x: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 15 }}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="absolute inset-2 border-2 border-dashed border-secondary rounded-xl pointer-events-none" />
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
             <div className="w-32 h-32 bg-soft-rose rounded-full mb-6 flex items-center justify-center animate-pulse">
               <span className="text-5xl">🎂</span>
             </div>
             <p className="font-hand text-2xl text-dark-ink">
               {birthdayConfig.surpriseMessage}
             </p>
          </div>
        </motion.div>
      </div>
      
      <p className={`mt-8 text-sm text-dark-ink/50 transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        (Tap the card to open)
      </p>
    </div>
  );
}
