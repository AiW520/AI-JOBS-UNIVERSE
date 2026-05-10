import { motion } from 'framer-motion';
import { TechRanking } from '@/types';
import { cn } from '@/utils';

interface TechRankingCardProps {
  item: TechRanking;
  index: number;
}

export function TechRankingCard({ item, index }: TechRankingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group"
    >
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold',
        index < 3 ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/[0.04] text-white/40'
      )}>
        {index < 3 ? (
          <span>{['🥇', '🥈', '🥉'][index]}</span>
        ) : (
          `#${item.rank}`
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{item.icon}</span>
          <h4 className="text-white font-medium truncate">{item.name}</h4>
        </div>
        <p className="text-white/30 text-xs mt-0.5 truncate">{item.description}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-neon-cyan font-mono text-sm font-semibold">{item.heat}</div>
        <div className={cn(
          'text-xs font-mono',
          item.growth > 150 ? 'text-neon-purple' : 'text-neon-cyan/60'
        )}>
          +{item.growth}%
        </div>
      </div>

      <div className="w-16 h-1 rounded-full bg-white/[0.04] overflow-hidden flex-shrink-0">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.heat}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          className={cn(
            'h-full rounded-full',
            item.heat > 90 ? 'bg-neon-purple' : item.heat > 80 ? 'bg-neon-blue' : 'bg-neon-cyan'
          )}
        />
      </div>
    </motion.div>
  );
}