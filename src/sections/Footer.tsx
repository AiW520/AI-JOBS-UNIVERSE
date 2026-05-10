import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection, scrollToTop } from '@/utils';

const footerLinks: Record<string, { label: string; action: string }[]> = {
  Platform: [
    { label: 'Explore Careers', action: 'careers' },
    { label: 'Tech Rankings', action: 'rankings' },
    { label: 'Skill Tree', action: 'skills' },
    { label: 'Trend Analysis', action: 'trends' },
  ],
  Categories: [
    { label: 'AI Jobs', action: 'ai' },
    { label: 'Web3 Jobs', action: 'web3' },
    { label: 'Frontend Jobs', action: 'frontend' },
    { label: 'Backend Jobs', action: 'backend' },
  ],
  Resources: [
    { label: 'Learning Paths', action: 'skills' },
    { label: 'Salary Data', action: 'careers' },
    { label: 'Market Trends', action: 'trends' },
    { label: 'Tech Reports', action: 'rankings' },
  ],
  Company: [
    { label: 'About', action: 'about' },
    { label: 'Contact', action: 'contact' },
    { label: 'GitHub', action: 'github' },
    { label: 'Twitter', action: 'twitter' },
  ],
};

const socialLinks = [
  { label: 'GITHUB', url: 'https://github.com' },
  { label: 'TWITTER', url: 'https://twitter.com' },
  { label: 'DISCORD', url: 'https://discord.com' },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, action: string) => {
      e.preventDefault();

      const isSpecialAction = ['about', 'contact', 'github', 'twitter'].includes(action);

      if (isSpecialAction) {
        if (action === 'github') {
          window.open('https://github.com', '_blank', 'noopener,noreferrer');
        } else if (action === 'twitter') {
          window.open('https://twitter.com', '_blank', 'noopener,noreferrer');
        } else if (action === 'about' || action === 'contact') {
          scrollToTop();
        }
        return;
      }

      if (action === 'ai' || action === 'web3' || action === 'frontend' || action === 'backend') {
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => scrollToSection('careers'), 150);
        } else {
          scrollToSection('careers');
        }
        return;
      }

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(action), 150);
      } else {
        scrollToSection(action);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <footer className="relative py-16 md:py-24 border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/[0.02] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                }
                scrollToTop();
              }}
              className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wider">UNIVERSE</span>
            </button>
            <p className="text-white/30 text-xs leading-relaxed">
              Explore the future of AI careers. Real data, real trends, real opportunities.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/50 text-xs font-mono tracking-wider mb-4">{category.toUpperCase()}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, link.action)}
                      className="text-white/30 text-xs hover:text-neon-cyan transition-colors duration-300 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/20 font-mono">
            AI JOBS UNIVERSE v2.0.1 | Data sourced from LinkedIn, Boss直聘, Indeed, CryptoJobs
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-xs text-white/20 font-mono hover:text-neon-cyan transition-colors duration-300"
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-white/10 font-mono tracking-[0.3em]">
            DESIGNED FOR THE FUTURE // BUILT FOR TOMORROW
          </p>
        </div>
      </div>
    </footer>
  );
}