import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroSection } from '@/sections/HeroSection';
import { JobsUniverseSection } from '@/sections/JobsUniverseSection';
import { TechRankingsSection } from '@/sections/TechRankingsSection';
import { SkillTreeSection } from '@/sections/SkillTreeSection';
import { TrendAnalysisSection } from '@/sections/TrendAnalysisSection';
import { Footer } from '@/sections/Footer';
import { BackgroundScene } from '@/components/three/BackgroundScene';

export function HomePage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <BackgroundScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <JobsUniverseSection />
        <TechRankingsSection />
        <SkillTreeSection />
        <TrendAnalysisSection />
        <Footer />
      </div>
    </div>
  );
}