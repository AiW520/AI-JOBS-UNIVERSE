import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, children, align = 'center' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hud-text mb-4 block">{'>'} SYSTEM_INIT</span>
        <h2 className="section-heading gradient-text mb-4">{title}</h2>
        {subtitle && (
          <p className={`section-subheading ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </div>
  );
}