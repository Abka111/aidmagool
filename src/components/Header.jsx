'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, AtSign, ChevronDown, MapPin, Menu, X } from 'lucide-react';

import { NAV_ITEMS, ORG, SOCIAL_LINKS } from '@/data/site';
import { BrandIcon } from './ui';

/**
 * Reproduces react-router's NavLink matching: the home route only matches
 * exactly, every other route also matches its nested paths.
 */
const isActivePath = (pathname, to) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // close the drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const close = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <p className="utility-note">
            <MapPin aria-hidden="true" />
            {ORG.locations}, {ORG.registration}
          </p>
          <div className="utility-links">
            <a href={`mailto:${ORG.email}`}>
              <AtSign aria-hidden="true" />
              {ORG.email}
            </a>
            <span className="utility-sep" aria-hidden="true" />
            {SOCIAL_LINKS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                <BrandIcon path={s.path} label={s.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="nav" aria-label="Primary">
        <Link href="/" className="nav-brand" onClick={close}>
          <img src="/logo.jpg" alt="" className="nav-logo" width="120" height="40" />
          <span className="nav-brand-text">
            <span className="nav-brand-name">{ORG.short}</span>
            <span className="nav-brand-sub">{ORG.full}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu aria-hidden="true" />
        </button>

        <div
          className={`nav-scrim ${mobileOpen ? 'is-visible' : ''}`}
          onClick={close}
          aria-hidden="true"
        />

        <div id="primary-navigation" className={`nav-panel ${mobileOpen ? 'is-open' : ''}`}>
          <button type="button" className="nav-close" onClick={close} aria-label="Close menu">
            <X aria-hidden="true" />
          </button>

          <ul className="nav-list">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className={`nav-item has-children ${openMenu === item.label ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className="nav-link nav-link--button"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu((cur) => (cur === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown className="nav-caret" aria-hidden="true" />
                  </button>

                  <ul className="nav-submenu">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link href={child.to} onClick={close}>
                          {child.label}
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="nav-item">
                  <Link
                    className={`nav-link ${isActivePath(pathname, item.to) ? 'is-active' : ''}`}
                    href={item.to}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <Link href="/donate" className="btn btn--primary nav-cta" onClick={close}>
            Donate
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
