export interface Job {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  heat: number;
  future: number;
  difficulty: number;
  demand: number;
  skills: string[];
  tools: string[];
  trend: string;
  trendDirection: 'up' | 'stable' | 'explosive';
  learningPath: LearningStage[];
  projects: string[];
  relatedJobs: string[];
  marketData: MarketData;
}

export type JobCategory = 'ai' | 'web3' | 'frontend' | 'backend' | 'security' | 'cloud';

export interface LearningStage {
  stage: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface MarketData {
  growthRate: number;
  jobCount: number;
  avgSalaryGrowth: number;
  remotePercentage: number;
  topRegions: string[];
}

export interface TechRanking {
  id: string;
  name: string;
  category: string;
  rank: number;
  heat: number;
  growth: number;
  description: string;
  icon: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: number;
  connections: string[];
  description: string;
}

export interface TrendData {
  month: string;
  value: number;
  category: string;
}