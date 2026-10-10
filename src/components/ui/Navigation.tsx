import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, Orbit, X } from 'lucide-react';
import { scrollToSection } from '@/utils';

const links = [{ id: 'careers', label: '岗位' }, { id: 'rankings', label: '排行' }, { id: 'skills', label: '技能' }, { id: 'trends', label: '趋势' }];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('careers');
  const pending = useRef('');
  const location = useLocation();
  const navigate = useNavigate();
  const go = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') { pending.current = id; navigate('/'); }
    else scrollToSection(id);
  };
  useEffect(() => {
    setOpen(false);
    if (location.pathname !== '/' || !pending.current) return;
    const timer = window.setInterval(() => {
      if (document.getElementById(pending.current)) { scrollToSection(pending.current); pending.current = ''; clearInterval(timer); }
    }, 100);
    return () => clearInterval(timer);
  }, [location.pathname]);
  useEffect(() => {
    const check = () => {
      for (const { id } of links) {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        if (bounds && bounds.top <= 130 && bounds.bottom > 130) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="site-nav">
    <Link to="/" className="site-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}><Orbit size={27} /><span>AI JOBS <b>UNIVERSE</b><small>职业观测台</small></span></Link>
    <nav className="desktop-nav" aria-label="主导航"><Link to="/">首页</Link>{links.map(({id,label}) => <a href={`#/${id}`} key={id} onClick={(event) => { event.preventDefault(); go(id); }} aria-current={location.pathname === '/' && active === id ? 'location' : undefined}>{label}</a>)}</nav>
    <button className="nav-primary" onClick={() => go('careers')}>探索岗位 <ArrowUpRight size={16} /></button>
    <button className="mobile-menu-button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
  </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航"><Link to="/" onClick={() => { setOpen(false); window.scrollTo(0,0); }}>首页</Link>{links.map(({id,label}) => <a key={id} href={`#/${id}`} onClick={(event) => { event.preventDefault(); go(id); }}>{label}</a>)}</nav>}</header>;
}
