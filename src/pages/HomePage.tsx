import { JobsUniverseSection } from '@/sections/JobsUniverseSection';
import { TechRankingsSection } from '@/sections/TechRankingsSection';
import { SkillTreeSection } from '@/sections/SkillTreeSection';
import { TrendAnalysisSection } from '@/sections/TrendAnalysisSection';
import { Footer } from '@/sections/Footer';

export function HomePage() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <JobsUniverseSection />
        <TechRankingsSection />
        <SkillTreeSection />
        <TrendAnalysisSection />
        <Footer />
      </div>
    </div>
  );
}
