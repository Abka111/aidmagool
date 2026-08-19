import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import * as Lucide from 'lucide-react';

import { asset } from '../api/cms';

/**
 * Counts up once the number scrolls into view. Gating on IntersectionObserver
 * rather than CountUp's own scroll spy keeps figures that are already on screen
 * at first paint from staying stuck at zero.
 */
export const Counter = ({ end, duration = 2 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <span ref={ref}>
      {inView ? <CountUp end={Number(end) || 0} separator="," duration={duration} /> : '0'}
    </span>
  );
};

/**
 * Renders a Lucide icon by name. The admin stores icon choices as strings, so
 * an unknown or removed name degrades to nothing rather than crashing a page.
 */
export const Icon = ({ name, strokeWidth = 1.5, ...rest }) => {
  const Component = name && Lucide[name];
  if (!Component) return null;
  return <Component aria-hidden="true" strokeWidth={strokeWidth} {...rest} />;
};

/** Renders HTML authored in the admin's rich-text editor. */
export const RichText = ({ html, className, as: Tag = 'div' }) => {
  if (!html) return null;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

/** An image whose src may be a backend upload path. */
export const Img = ({ src, alt = '', ...rest }) =>
  src ? <img src={asset(src)} alt={alt} {...rest} /> : null;

export const BrandIcon = ({ path, label }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={label} focusable="false">
    <path d={path} />
  </svg>
);

export const SectionHead = ({ eyebrow, title, lead, align = 'start', light = false, id }) => (
  <header className={`section-head section-head--${align}`} id={id}>
    {eyebrow ? (
      <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>
        <span className="eyebrow-rule" aria-hidden="true" />
        {eyebrow}
      </p>
    ) : null}
    {title ? <h2 className="section-title">{title}</h2> : null}
    {lead ? <p className="section-lead">{lead}</p> : null}
  </header>
);

export const Stat = ({ value, suffix = '', label, icon }) => (
  <div className="stat">
    {icon ? (
      <span className="stat-icon" aria-hidden="true">
        <Icon name={icon} strokeWidth={1.6} />
      </span>
    ) : null}
    <p className="stat-value">
      <Counter end={value} />
      {suffix}
    </p>
    <p className="stat-label">{label}</p>
  </div>
);

export const PageHead = ({ eyebrow, title, lead }) => (
  <section className="page-head">
    <div className="shell page-head-inner">
      {eyebrow ? (
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="page-title">{title}</h1>
      {lead ? <p className="page-lead">{lead}</p> : null}
    </div>
  </section>
);

export const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
