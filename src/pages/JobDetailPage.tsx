import { ArrowLeft, ArrowUpRight, BookOpen, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import jobsData from '@/data/jobs.json';
import type { Job } from '@/types';

export function JobDetailPage() {
  const { jobId } = useParams();
  const job = (jobsData as Job[]).find(item => item.id === jobId);
  if (!job) return <main className="role-page role-not-found"><h1>暂未找到这个岗位</h1><Link to="/">返回岗位宇宙 <ArrowUpRight size={17} /></Link></main>;
  const category = job.category === 'frontend' ? '前端' : job.category === 'backend' ? '后端' : job.category.toUpperCase();
  return <main className="role-page">
    <Link className="role-back" to="/"><ArrowLeft size={16} /> 返回岗位与筛选结果</Link>
    <div className="role-heading"><div><span className="job-category">{category}</span><h1>{job.title}</h1><p>{job.description}</p></div><div className="role-salary"><strong>{job.salary}</strong><span>年薪区间 / 美元</span><small>{job.marketData.jobCount.toLocaleString()} 个岗位 · 远程 {job.marketData.remotePercentage}%</small></div></div>
    <dl className="role-signals">{[{label:'技术热度',value:job.heat},{label:'未来潜力',value:job.future},{label:'市场需求',value:job.demand},{label:'学习难度',value:job.difficulty}].map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}<span> /100</span></dd><i style={{width:`${stat.value}%`}} /></div>)}</dl>
    <div className="role-layout"><div>
      <section className="role-section"><h2>核心技能</h2><div className="role-tags">{job.skills.map(skill => <span key={skill}>{skill}</span>)}</div><h3>常用工具</h3><div className="role-tags tools">{job.tools.map(tool => <span key={tool}>{tool}</span>)}</div></section>
      <section className="role-section"><h2><BookOpen size={19} /> 学习路线</h2><ol className="role-path">{job.learningPath.map(stage => <li key={stage.stage}><span className="role-stage">{stage.stage}</span><div><h3>{stage.title}<small>{stage.duration}</small></h3><div className="role-tags tools">{stage.topics.map(topic => <span key={topic}>{topic}</span>)}</div></div></li>)}</ol></section>
      <section className="role-section"><h2>项目练习</h2><ol className="role-projects">{job.projects.map((project,index) => <li key={project}><span>{String(index + 1).padStart(2,'0')}</span>{project}</li>)}</ol></section>
    </div><aside>
      <section className="role-section"><h2>市场信号</h2><dl className="role-market">{[{label:'岗位增长',value:`+${job.marketData.growthRate}%`},{label:'薪资增长',value:`+${job.marketData.avgSalaryGrowth}%`},{label:'远程比例',value:`${job.marketData.remotePercentage}%`},{label:'岗位规模',value:job.marketData.jobCount.toLocaleString()}].map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl><p className="role-data-note">来自平台原有岗位数据，供职业方向比较。</p></section>
      <section className="role-section"><h2><MapPin size={17} /> 主要地区</h2><ul className="role-regions">{job.marketData.topRegions.map(region => <li key={region}>{region}</li>)}</ul></section>
      <section className="role-section"><h2>关联岗位</h2><div className="role-related">{job.relatedJobs.map(id => { const related=jobsData.find(item => item.id === id);return related ? <Link key={id} to={`/job/${id}`}>{related.title}<ArrowUpRight size={15} /></Link> : null; })}</div></section>
    </aside></div>
  </main>;
}
