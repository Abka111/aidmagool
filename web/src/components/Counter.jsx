'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import { Icon } from './Icon';

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
