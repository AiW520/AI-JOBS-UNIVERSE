import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import jobsData from '@/data/jobs.json';
import { Job } from '@/types';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils';

function StatCard({ label, value, suffix = '', color = 'text-neon-cyan' }: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass p-5 text-center"
    >
      <div className={cn('text-3xl md:text-4xl font-bold font-mono', color)}>
        {count}{suffix}
      </div>
      <div className="text-[10px] text-white/30 font-mono mt-1 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-white/50 font-mono">{label}</span>
        <span className="text-xs text-white/30 font-mono">{value}/100</span>
      </div>
      <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  );
}

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = (jobsData as Job[]).find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-white/40 mb-6">Job not found in this universe</p>
          <Link to="/" className="text-neon-cyan hover:text-neon-blue transition-colors">
            Return to Universe
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'from-neon-blue to-neon-cyan';
      case 'web3': return 'from-neon-purple to-neon-pink';
      case 'frontend': return 'from-neon-cyan to-neon-green';
      case 'backend': return 'from-neon-blue to-neon-purple';
      default: return 'from-neon-blue to-neon-cyan';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-neon-cyan text-sm font-mono mb-8 transition-colors"
          >
            <span>{'<'}</span> RETURN TO UNIVERSE
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r text-white',
              getCategoryColor(job.category)
            )}>
              {job.category.toUpperCase()}
            </div>
            <span className="text-xs font-mono text-neon-purple">{job.trend}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] text-white/30 font-mono">{job.marketData.jobCount.toLocaleString()} open positions</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter gradient-text mb-4">
            {job.title}
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mb-8 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-neon-cyan">{job.salary}</span>
            <span className="text-xs text-white/30 font-mono">ANNUAL AVERAGE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          <StatCard label="Heat Index" value={job.heat} color="text-neon-pink" />
          <StatCard label="Future Potential" value={job.future} color="text-neon-purple" />
          <StatCard label="Market Demand" value={job.demand} color="text-neon-cyan" />
          <StatCard label="Difficulty" value={job.difficulty} color="text-neon-blue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass p-6 md:p-8 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-blue" />
              Performance Metrics
            </h3>
            <ProgressBar label="Market Demand" value={job.demand} color="bg-neon-cyan" />
            <ProgressBar label="Future Growth" value={job.future} color="bg-neon-purple" />
            <ProgressBar label="Technology Heat" value={job.heat} color="bg-neon-pink" />
            <ProgressBar label="Learning Difficulty" value={job.difficulty} color="bg-neon-blue" />

            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <h4 className="text-sm text-white/60 font-mono mb-3">MARKET DATA</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Growth Rate', value: `+${job.marketData.growthRate}%`, color: 'text-neon-purple' },
                  { label: 'Open Positions', value: job.marketData.jobCount.toLocaleString(), color: 'text-neon-cyan' },
                  { label: 'Salary Growth', value: `+${job.marketData.avgSalaryGrowth}%`, color: 'text-neon-green' },
                  { label: 'Remote %', value: `${job.marketData.remotePercentage}%`, color: 'text-neon-blue' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className={cn('text-lg font-bold font-mono', item.color)}>{item.value}</div>
                    <div className="text-[10px] text-white/30 font-mono">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-purple" />
              Top Regions
            </h3>
            <div className="space-y-3">
              {job.marketData.topRegions.map((region, i) => (
                <motion.div
                  key={region}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="text-xs font-mono text-neon-cyan">#{i + 1}</span>
                  <span className="text-sm text-white/70">{region}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.05]">
              <h4 className="text-sm text-white/60 font-mono mb-3">RELATED ROLES</h4>
              <div className="space-y-2">
                {job.relatedJobs.map((relatedId) => {
                  const relatedJob = (jobsData as Job[]).find((j) => j.id === relatedId);
                  if (!relatedJob) return null;
                  return (
                    <Link
                      key={relatedId}
                      to={`/job/${relatedId}`}
                      className="block p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-sm text-white/50 hover:text-neon-cyan hover:border-neon-cyan/20 transition-all duration-300"
                    >
                      {relatedJob.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 text-sm font-mono text-neon-cyan bg-neon-cyan/[0.05] border border-neon-cyan/20 rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.05]">
              <h4 className="text-sm text-white/60 font-mono mb-3">ESSENTIAL TOOLS</h4>
              <div className="flex flex-wrap gap-2">
                {job.tools.map((tool, i) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-xs font-mono text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green" />
              Recommended Projects
            </h3>
            <div className="space-y-3">
              {job.projects.map((project, i) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <span className="text-neon-cyan font-mono text-xs mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-white/70">{project}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass p-6 md:p-8 mb-16">
          <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Learning Path
          </h3>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

            <div className="space-y-6">
              {job.learningPath.map((stage, i) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{stage.stage}</span>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h4 className="text-white font-medium">{stage.title}</h4>
                    <p className="text-xs text-neon-cyan/60 font-mono mt-0.5">{stage.duration}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {stage.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-[10px] font-mono text-white/40 bg-white/[0.03] border border-white/[0.04] rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}