import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING');

  useEffect(() => {
    const texts = [
      'INITIALIZING',
      'LOADING NEURAL NETWORK',
      'CONNECTING TO UNIVERSE',
      'CALIBRATING AI SYSTEMS',
      'SYNCING DATA STREAMS',
      'RENDERING PARTICLES',
      'SYSTEM READY',
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setProgress(Math.min(currentProgress, 100));
      setText(texts[Math.floor((currentProgress / 100) * texts.length)] || texts[texts.length - 1]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-40 h-40 rounded-full border border-white/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 rounded-full border border-neon-blue/[0.08] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full border border-neon-purple/[0.12] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center relative z-10">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white font-bold text-xl"
              >
                AI
              </motion.span>
            </div>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl font-mono text-neon-cyan tracking-[0.3em]"
            >
              {text}
            </motion.div>

            <div className="mt-6 w-64 h-0.5 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <motion.div
              className="mt-3 text-xs font-mono text-white/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-xs text-white/10 font-mono tracking-[0.3em]">
              AI JOBS UNIVERSE v2.0
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}