import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, ChevronUp, MapPin, Phone } from 'lucide-react';

import { logo } from '../data/images';
import { BRAND_PATHS, ORG, SOCIAL_LINKS } from '../data/site';
import { BrandIcon } from './ui';

const Footer = () => (
  <footer className="footer">
    <div className="shell footer-grid">
      <div className="footer-brand">
        <img src={logo} alt="" className="footer-logo" loading="lazy" />
        <p className="footer-name">{ORG.short}</p>
        <p>
          Our mission is to support communities in need, ensuring health, education, and empowerment
          for everyone.
        </p>
      </div>

      <nav className="footer-col" aria-label="Footer">
        <h3>Explore</h3>
        <ul>
          <li><Link to="/about">About AID</Link></li>
          <li><Link to="/impact">Our Impact</Link></li>
          <li><Link to="/get-involved">Get Involved</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/donate">Donate</Link></li>
        </ul>
      </nav>

      <div className="footer-col">
        <h3>Contact Us</h3>
        <ul>
          <li>
            <MapPin aria-hidden="true" />
            Addis Ababa, Ethiopia
          </li>
          <li>
            <a href={`mailto:${ORG.email}`}>
              <AtSign aria-hidden="true" />
              {ORG.email}
            </a>
          </li>
          <li>
            <a href={ORG.phoneHref}>
              <Phone aria-hidden="true" />
              {ORG.phone}
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-col">
        <h3>Follow Us</h3>
        <div className="footer-social">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn--dark"
              aria-label={s.name}
            >
              <BrandIcon path={s.path} label={s.name} />
            </a>
          ))}
          <a
            href={ORG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn social-btn--dark"
            aria-label="WhatsApp"
          >
            <BrandIcon path={BRAND_PATHS.whatsapp} label="WhatsApp" />
          </a>
        </div>
      </div>
    </div>

    <div className="shell footer-bottom">
      <p>
        © {new Date().getFullYear()} {ORG.short}, {ORG.full}. All rights reserved.
      </p>
      <button
        type="button"
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
        <ChevronUp aria-hidden="true" />
      </button>
    </div>
  </footer>
);

export default Footer;
