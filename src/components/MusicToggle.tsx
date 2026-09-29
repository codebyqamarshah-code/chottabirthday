'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio('/music/birthday.mp3');
    a.loop = true;

    a.addEventListener('canplaythrough', () => setAvailable(true), { once: true });
    a.addEventListener('error', () => setAvailable(false), { once: true });

    audioRef.current = a;
    return () => {
      a.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current || !available) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  };

  if (!available) return null;

  return (
    <motion.button
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cream shadow-xl border-2 border-primary flex items-center justify-center"
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div
            key="pause"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Music size={22} className="text-primary" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Music size={22} className="text-dark-ink/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
