import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { GlowButton } from '@/components/ui/GlowButton';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const floatingWords = ['AI AGENT', 'LLM', 'WEB3', 'RAG', 'DEFI', 'MULTI-AGENT', 'SOLIDITY', 'THREE.JS'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster=""
      >
        <source src={`${import.meta.env.BASE_URL}项目主页动态背景.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 dot-bg" />

      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${(normalizedX - 0.5) * 20}px, ${(normalizedY - 0.5) * 20}px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="hud-text text-sm md:text-base">
            {'>'} SYSTEM ONLINE // AI JOBS UNIVERSE v2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none mb-6"
        >
          <span className="gradient-text">AI JOBS</span>
          <br />
          <span className="gradient-text-purple">UNIVERSE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-3 text-balance"
        >
          "未来岗位，不再属于普通人。"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-white/40 font-light max-w-xl mx-auto mb-10"
        >
          Explore the Most Demanded AI Careers in The World
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton variant="primary" size="lg" href="#careers">
            Explore Careers
          </GlowButton>
          <GlowButton variant="outline" size="lg" href="#rankings">
            Tech Rankings
          </GlowButton>
          <GlowButton variant="secondary" size="lg" href="#skills">
            Future Skills
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto"
        >
          {floatingWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.08 }}
              className="px-4 py-2 text-xs font-mono text-white/40 bg-white/[0.03] border border-white/[0.05] rounded-full hover:text-neon-cyan hover:border-neon-cyan/30 hover:bg-neon-cyan/[0.03] transition-all duration-300 cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-neon-cyan"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}