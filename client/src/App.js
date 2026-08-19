import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';

import { useCms } from './context/CmsContext';

import Home from './pages/Home';
import About from './pages/About';
import Impact from './pages/Impact';
import GetInvolved from './pages/GetInvolved';
import Team from './pages/Team';
import Partners from './pages/Partners';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Turns a location hash into an element id. getElementById needs no escaping,
 * so a fragment like "#2024-review" that is not a valid CSS selector still
 * resolves, and a malformed escape sequence is kept verbatim rather than
 * throwing out of the effect.
 */
const hashToId = (hash) => {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

/** Frames an anchor is chased for before we settle for its current position. */
const SCROLL_ATTEMPTS = 20;

/**
 * Restores the reading position on navigation: top of page for a new route,
 * the target section when the link carries a hash.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const { ready } = useCms();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    // CMS copy and images decide the final page height, so an anchor measured
    // before they land points somewhere else once they do.
    if (!ready) return undefined;

    const id = hashToId(hash);
    let frame = 0;
    let attempts = 0;
    let lastTop = null;

    const chase = () => {
      const target = document.getElementById(id);
      attempts += 1;

      if (target) {
        // Measured against the document rather than the viewport so the value
        // only moves when layout does, not while the smooth scroll runs.
        const top = Math.round(target.getBoundingClientRect().top + window.scrollY);
        if (top === lastTop || attempts >= SCROLL_ATTEMPTS) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        lastTop = top;
      } else if (attempts >= SCROLL_ATTEMPTS) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      frame = requestAnimationFrame(chase);
    };

    frame = requestAnimationFrame(chase);

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, ready]);

  return null;
};

/**
 * Says so, quietly, when the content API could not be reached and the page is
 * therefore showing the copy bundled at build time.
 */
const OfflineNotice = () => {
  const { ready, live } = useCms();

  if (!ready || live) return null;

  return (
    <div className="offline-note" role="status" aria-live="polite">
      <p className="shell">Showing saved content. Live updates are unavailable right now.</p>
    </div>
  );
};

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to main content
    </a>

    <ScrollManager />
    <Header />
    <OfflineNotice />

    <main id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/team" element={<Team />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

    <Footer />
  </>
);

export default App;
