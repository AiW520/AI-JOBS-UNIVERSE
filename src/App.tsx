import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from '@/components/ui/Navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const JobDetailPage = lazy(() => import('@/pages/JobDetailPage').then((m) => ({ default: m.JobDetailPage })));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-lg">AI</span>
        </div>
        <p className="text-white/30 text-xs font-mono tracking-[0.3em]">LOADING</p>
      </div>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/job/:jobId"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <JobDetailPage />
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/ai-jobs-universe">
      <LoadingScreen />
      <Navigation />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}