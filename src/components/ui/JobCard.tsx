import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/types';
import { cn } from '@/utils';

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${(y - 50) * 0.1}deg) rotateY(${(x - 50) * -0.1}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'from-neon-blue to-neon-cyan';
      case 'web3': return 'from-neon-purple to-neon-pink';
      case 'frontend': return 'from-neon-cyan to-neon-green';
      case 'backend': return 'from-neon-blue to-neon-purple';
      default: return 'from-neon-blue to-neon-cyan';
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'explosive': return 'text-neon-purple';
      case 'up': return 'text-neon-cyan';
      case 'stable': return 'text-white/50';
      default: return 'text-white/50';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/job/${job.id}`)}
      className="glass-card p-6 cursor-pointer group"
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r bg-opacity-10 text-white',
            getCategoryColor(job.category)
          )}>
            {job.category.toUpperCase()}
          </div>
          <span className={cn('text-xs font-mono', getTrendColor(job.trendDirection))}>
            {job.trend}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
          {job.title}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-neon-cyan font-semibold text-lg">
            {job.salary}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Heat', value: job.heat, color: 'text-neon-pink' },
            { label: 'Future', value: job.future, color: 'text-neon-purple' },
            { label: 'Demand', value: job.demand, color: 'text-neon-cyan' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={cn('text-lg font-bold font-mono', stat.color)}>{stat.value}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] font-mono text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-neon-cyan">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[10px] text-white/30 font-mono uppercase">
              {job.marketData.jobCount.toLocaleString()} jobs
            </span>
          </div>
          <span className="text-[10px] text-neon-cyan/50 font-mono">
            +{job.marketData.growthRate}% growth
          </span>
        </div>
      </div>
    </motion.div>
  );
}