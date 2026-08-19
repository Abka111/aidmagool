import Link from 'next/link';
import { AtSign, MapPin, Phone } from 'lucide-react';

import { BRAND_PATHS, ORG, SOCIAL_LINKS } from '@/data/site';
import { BrandIcon } from './ui';
import BackToTop from './BackToTop';

const Footer = () => (
  <footer className="footer">
    <div className="shell footer-grid">
      <div className="footer-brand">
        <img src="/logo.jpg" alt="" className="footer-logo" loading="lazy" />
        <p className="footer-name">{ORG.short}</p>
        <p>
          Our mission is to support communities in need, ensuring health, education, and empowerment
          for everyone.
        </p>
      </div>

      <nav className="footer-col" aria-label="Footer">
        <h3>Explore</h3>
        <ul>
          <li><Link href="/about">About AID</Link></li>
          <li><Link href="/impact">Our Impact</Link></li>
          <li><Link href="/get-involved">Get Involved</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/donate">Donate</Link></li>
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
      <BackToTop />
    </div>
  </footer>
);

export default Footer;
