import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TechRanking } from '@/types';

export function TechRankingCard({ item, index }: { item: TechRanking; index: number }) {
  return <motion.article className="ranking-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .04 }}>
    <div className="ranking-number">{String(item.rank).padStart(2, '0')}</div><div className="ranking-icon">{item.icon}</div><div className="ranking-copy"><h3>{item.name}</h3><p>{item.description}</p></div><div className="ranking-score"><strong>{item.heat}</strong><span>+{item.growth}%</span></div><ArrowUpRight size={17} className="ranking-arrow" />
  </motion.article>;
}
