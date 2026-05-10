import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn, scrollToSection } from '@/utils';

const navLinks = [
  { label: 'Home', href: '/', sectionId: null as string | null },
  { label: 'Careers', href: null as string | null, sectionId: 'careers' },
  { label: 'Rankings', href: null as string | null, sectionId: 'rankings' },
  { label: 'Skills', href: null as string | null, sectionId: 'skills' },
  { label: 'Trends', href: null as string | null, sectionId: 'trends' },
];

type NavLink = typeof navLinks[number];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progress = useScrollProgress();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId).filter((id): id is string => id !== null);
    const handleScrollSpy = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: NavLink) => {
      e.preventDefault();

      if (link.sectionId) {
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => scrollToSection(link.sectionId!), 150);
        } else {
          scrollToSection(link.sectionId);
        }
      } else if (link.href) {
        navigate(link.href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setMobileOpen(false);
    },
    [location.pathname, navigate]
  );

  const handleLaunchApp = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection('careers'), 150);
    } else {
      scrollToSection('careers');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wider hidden sm:block">
                UNIVERSE
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.sectionId ? `/#${link.sectionId}` : (link.href || undefined)}
                  onClick={(e) => handleNavClick(e, link)}
                  className={cn(
                    'text-sm transition-colors duration-300 tracking-wide',
                    activeSection === link.sectionId
                      ? 'text-neon-cyan'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLaunchApp}
                className="hidden md:block px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/30 hover:border-neon-blue/50 rounded-full transition-all duration-300 hover:shadow-neon-blue"
              >
                Explore Universe
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-5 h-px bg-white block"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 h-px bg-white block"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-5 h-px bg-white block"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }} />
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-xl pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.sectionId ? `/#${link.sectionId}` : (link.href || undefined)}
                  onClick={(e) => handleNavClick(e, link)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl text-white/70 hover:text-white font-light tracking-wider"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleLaunchApp}
                className="mt-4 px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-neon-blue"
              >
                Explore Universe
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}