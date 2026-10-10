import { ArrowUpRight, Focus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '@/types';

export function JobCard({ job, onFocus }: { job: Job; index: number; onFocus?: () => void }) {
  const navigate = useNavigate();
  const category = job.category === 'frontend' ? '前端' : job.category === 'backend' ? '后端' : job.category.toUpperCase();
  return <article className="job-card" role="link" tabIndex={0} aria-label={`查看 ${job.title}`} onClick={() => navigate(`/job/${job.id}`)} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); navigate(`/job/${job.id}`); } }}>
    <div className="job-card-top"><span className={`job-category category-${job.category}`}>{category}</span><span><TrendingUp size={13} /> +{job.marketData.growthRate}%</span>{onFocus && <button title="在空间站聚焦" aria-label={`Focus ${job.title} in universe`} onClick={(event) => { event.stopPropagation(); onFocus(); }}><Focus size={17} /></button>}</div>
    <h3>{job.title}</h3><p>{job.description}</p><strong>{job.salary}<small> / 年</small></strong>
    <dl>{[{label:'热度',value:job.heat},{label:'潜力',value:job.future},{label:'需求',value:job.demand}].map(({label,value}) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="job-skills">{job.skills.slice(0,3).map(skill=><span key={skill}>{skill}</span>)}</div>
    <div className="job-card-bottom"><span>{job.marketData.jobCount.toLocaleString()} 个岗位 · 远程 {job.marketData.remotePercentage}%</span><ArrowUpRight size={17} /></div>
  </article>;
}
