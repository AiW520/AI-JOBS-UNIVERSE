import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JobCard } from '@/components/ui/JobCard';
import jobsData from '@/data/jobs.json';
import { JobCategory } from '@/types';

const categories: { key: JobCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'ai', label: 'AI' },
  { key: 'web3', label: 'WEB3' },
  { key: 'frontend', label: 'FRONTEND' },
  { key: 'backend', label: 'BACKEND' },
];

export function JobsUniverseSection() {
  const [filter, setFilter] = useState<JobCategory | 'all'>('all');
  const ref = useRef<HTMLDivElement>(null);

  const filteredJobs = filter === 'all'
    ? jobsData
    : jobsData.filter((job) => job.category === filter);

  return (
    <section id="careers" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="AI JOBS UNIVERSE"
          subtitle="Discover the most demanded careers shaping the future of technology"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 text-xs font-mono tracking-wider rounded-full transition-all duration-300 ${
                filter === cat.key
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70 hover:border-white/[0.12]'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job as any} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}