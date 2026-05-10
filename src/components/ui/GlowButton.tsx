import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn, scrollToSection } from '@/utils';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon-blue hover:shadow-neon-purple',
    secondary: 'bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.1] hover:border-white/[0.2]',
    outline: 'bg-transparent text-white border border-neon-blue/40 hover:border-neon-blue hover:shadow-neon-blue',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
    }
  };

  const content = (
    <motion.span
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide overflow-hidden transition-all duration-500',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-neon-cyan/20 via-white/5 to-neon-purple/20"
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block group" onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className="inline-block group">
      {content}
    </button>
  );
}