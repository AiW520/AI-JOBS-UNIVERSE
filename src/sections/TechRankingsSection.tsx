import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechRankingCard } from '@/components/ui/TechRankingCard';
import techRankings from '@/data/techRankings.json';
import { TechRanking } from '@/types';

const categoryTabs = [
  { key: 'ai', label: 'AI TECH' },
  { key: 'web3', label: 'WEB3 TECH' },
  { key: 'frontend', label: 'FRONTEND TECH' },
  { key: 'backend', label: 'BACKEND TECH' },
];

export function TechRankingsSection() {
  const [activeTab, setActiveTab] = useState('ai');
  const ref = useRef<HTMLDivElement>(null);

  const filteredRankings = (techRankings as TechRanking[])
    .filter((item) => item.category === activeTab)
    .sort((a, b) => a.rank - b.rank);

  return (
    <section id="rankings" ref={ref} className="relative py-24 md:py-32 bg-[#060918]">
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="TECH RANKINGS"
          subtitle="Real-time technology heat map and growth trends"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryTabs.map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 text-xs font-mono tracking-wider rounded-full transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70 hover:border-white/[0.12]'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {filteredRankings.map((item, index) => (
              <TechRankingCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <div className="glass p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
              <span className="hud-text">LIVE HEAT MAP</span>
            </div>

            <div className="space-y-4">
              {filteredRankings.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/30 w-6">{item.rank}</span>
                  <span className="text-sm text-white flex-1">{item.name}</span>
                  <div className="w-32 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.heat}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.08 }}
                      className={`h-full rounded-full ${
                        item.heat > 90 ? 'bg-neon-purple' :
                        item.heat > 80 ? 'bg-neon-blue' :
                        'bg-neon-cyan'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <span className="hud-text block mb-4">TREND DIRECTION</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 10 }}
                    whileInView={{
                      height: [10, Math.random() * 40 + 15, 10],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-neon-blue/40 to-neon-purple/20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}