'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import SmartLink from './SmartLink';

/**
 * The only interactive part of the home page's banner, so the slides are
 * fetched on the server and handed down as props to keep this island small.
 */
const ImpactBanner = ({ title, slides = [], ctaLabel, ctaLink }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 9000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="section section--brand banner">
      <div className="shell shell--narrow">
        <h2 className="banner-title">{title}</h2>

        <div className="banner-slides">
          {slides.map((item, i) => (
            <p key={item.text?.slice(0, 24) || i} className={`banner-slide ${i === slide ? 'is-active' : ''}`}>
              {item.text}
            </p>
          ))}
        </div>

        <div className="banner-dots" role="tablist" aria-label="Impact statements">
          {slides.map((item, i) => (
            <button
              key={item.text?.slice(0, 16) || i}
              type="button"
              role="tab"
              aria-selected={i === slide}
              aria-label={`Statement ${i + 1}`}
              className={`banner-dot ${i === slide ? 'is-active' : ''}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        {ctaLabel ? (
          <SmartLink to={ctaLink} className="btn btn--light banner-cta">
            {ctaLabel}
            <ArrowRight aria-hidden="true" />
          </SmartLink>
        ) : null}
      </div>
    </section>
  );
};

export default ImpactBanner;
