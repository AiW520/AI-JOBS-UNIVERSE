import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import trendData from '@/data/trendData.json';
import { TrendData } from '@/types';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';

function TrendLine({ data, color, label }: { data: TrendData[]; color: string; label: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const maxVal = 100;
  const minVal = 0;
  const range = maxVal - minVal;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - minVal) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="mb-8">
      <div className="trend-line-label flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs font-mono text-white/60">{label}</span>
        <strong>{data[data.length - 1]?.value}<small> /100</small></strong>
      </div>
      <svg ref={svgRef} role="img" aria-label={`${label} 需求指数趋势`} viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[10, 50, 90].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#527367" strokeWidth="0.25" strokeDasharray="1 2" />)}
        <path
          d={`M ${points} L 100,100 L 0,100 Z`}
          fill={`url(#grad-${label})`}
        />
        <path
          d={`M ${points}`}
          fill="none"
          stroke={color}
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="trend-axis"><span>{data[0]?.month}</span><span>需求指数 0—100</span><span>{data[data.length - 1]?.month}</span></div>
    </div>
  );
}

export function TrendAnalysisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const aiAgentData = (trendData as TrendData[]).filter((d) => d.category === 'AI Agent');
  const llmData = (trendData as TrendData[]).filter((d) => d.category === 'LLM');
  const ragData = (trendData as TrendData[]).filter((d) => d.category === 'RAG');
  const web3Data = (trendData as TrendData[]).filter((d) => d.category === 'Web3');
  const frontendData = (trendData as TrendData[]).filter((d) => d.category === 'Frontend');

  const stats = [
    { label: 'AI 岗位总量', value: 156000, suffix: '+' },
    { label: '平均薪资增长', value: 28, suffix: '%' },
    { label: '远程岗位占比', value: 76, suffix: '%' },
    { label: '2024 新增岗位', value: 340, suffix: '+' },
  ];

  return (
    <section id="trends" ref={ref} className="relative py-24 md:py-32 bg-[#060918]">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="技术趋势"
          subtitle="观察近 24 个月的需求变化与岗位预测"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {useCountUp(stat.value)}
                {stat.suffix}
              </div>
              <div className="text-xs text-white/40 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              AI 技术增长
            </h3>
            <TrendLine data={aiAgentData} color="#80d6b5" label="AI Agent" />
            <TrendLine data={llmData} color="#e6bb74" label="LLM Engineering" />
            <TrendLine data={ragData} color="#8fbee2" label="RAG Systems" />
          </div>

          <div className="glass p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              Web3 与前端演进
            </h3>
            <TrendLine data={web3Data} color="#e6bb74" label="Web3 / Blockchain" />
            <TrendLine data={frontendData} color="#80d6b5" label="Frontend Development" />
            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <span className="hud-text text-xs">预测区间：2025—2026</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'AI Agent', growth: '+245%' },
                  { label: 'Multi-Agent', growth: '+260%' },
                  { label: 'ZK Proofs', growth: '+210%' },
                  { label: 'RAG Systems', growth: '+230%' },
                ].map((pred) => (
                  <div key={pred.label} className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <div className="text-neon-cyan font-mono text-lg font-bold">{pred.growth}</div>
                    <div className="text-[10px] text-white/30 mt-1">{pred.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
