import { ArrowUpRight, Orbit } from 'lucide-react';
import { scrollToSection } from '@/utils';

export function Footer() {
  return <footer className="site-footer"><div><Orbit size={22} /><strong>AI JOBS UNIVERSE</strong><span>职业观测台</span></div><nav aria-label="页脚导航">{[{id:'careers',label:'岗位'},{id:'rankings',label:'排行'},{id:'skills',label:'技能'},{id:'trends',label:'趋势'}].map(item => <button key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}</button>)}<a href="https://github.com/AiW520/AI-JOBS-UNIVERSE" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a></nav><p>岗位、薪资与趋势为平台静态数据，供职业探索参考。</p></footer>;
}
