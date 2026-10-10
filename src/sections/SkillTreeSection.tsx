import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import skillTree from '@/data/skillTree.json';
import { SkillNode } from '@/types';
import { cn } from '@/utils';

const categoryColors: Record<string, string> = {
  foundation: 'border-neon-cyan/30 text-neon-cyan',
  'ai-core': 'border-neon-blue/30 text-neon-blue',
  'ai-advanced': 'border-neon-purple/30 text-neon-purple',
  'ai-infra': 'border-neon-pink/30 text-neon-pink',
  engineering: 'border-neon-green/30 text-neon-green',
  'frontend-core': 'border-neon-cyan/30 text-neon-cyan',
  web3: 'border-neon-purple/30 text-neon-purple',
  infra: 'border-neon-blue/30 text-neon-blue',
  specialized: 'border-neon-pink/30 text-neon-pink',
  data: 'border-neon-green/30 text-neon-green',
};

export function SkillTreeSection() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const nodesByLevel: Record<number, SkillNode[]> = {};
  (skillTree as SkillNode[]).forEach((node) => {
    if (!nodesByLevel[node.level]) nodesByLevel[node.level] = [];
    nodesByLevel[node.level].push(node);
  });

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/[0.02] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="AI 技能树"
          subtitle="从基础能力到前沿工程，按层级规划成长路径"
        />

        <div className="space-y-12">
          {Object.entries(nodesByLevel)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, nodes]) => (
              <div key={level}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="hud-text text-xs">第 {level} 层</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-neon-blue/20 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {nodes.map((node, i) => (
                    <motion.button
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                      aria-pressed={selectedNode?.id === node.id}
                      className={cn(
                        'px-4 py-2 rounded-full text-xs font-mono border cursor-pointer transition-all duration-300',
                        categoryColors[node.category] || 'border-white/20 text-white/50',
                        selectedNode?.id === node.id && 'bg-white/[0.06] shadow-neon-blue'
                      )}
                    >
                      {node.name}
                    </motion.button>
                  ))}
                </div>
                {selectedNode?.level === Number(level) && <div className="skill-detail" aria-live="polite"><div><h3>{selectedNode.name}</h3><p>{selectedNode.description}</p></div><div><span>关联技能</span><p>{selectedNode.connections.map((id) => (skillTree as SkillNode[]).find(item => item.id === id)?.name || id).join(' · ')}</p></div></div>}
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}
