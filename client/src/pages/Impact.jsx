import React from 'react';

import { useBlock, useList } from '../context/CmsContext';
import { Counter, Icon, Img, PageHead, RichText, SectionHead, Stat } from '../components/ui';

const Achievement = () => {
  const block = useBlock('impact.achievement');
  const reach = useList('impact.achievement', 'reach');

  return (
    <section className="section section--paper">
      <div className="shell">
        <div className="impact-grid">
          <div className="impact-copy">
            <SectionHead eyebrow={block.eyebrow} title={block.title} />
            <RichText className="body-text" html={block.body} />
            {block.callout ? (
              <div className="callout">
                <Icon name="Award" />
                <RichText html={block.callout} />
              </div>
            ) : null}
          </div>

          <div className="impact-visual">
            <figure className="map-figure">
              <Img src={block.mapImage} alt={block.mapImageAlt} loading="lazy" />
            </figure>
            {reach.length ? (
              <div className="reach-split">
                {reach.map((item) => (
                  <div className="reach" key={item.label}>
                    <Icon name="Users" />
                    <p className="reach-value">
                      <Counter end={item.value} duration={2.4} />
                    </p>
                    <p className="reach-label">{item.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Education and Food share the same layout: intro, then stats beside a photo. */
const StatSector = ({ blockKey, tone, reverseIntro = false, useLead = false }) => {
  const block = useBlock(blockKey);
  const stats = useList(blockKey, 'stats');

  return (
    <section className={`section section--${tone}`} id={block.anchor || undefined}>
      <div className="shell">
        {useLead ? <SectionHead eyebrow={block.eyebrow} title={block.title} /> : null}

        <div className={`sector-intro ${reverseIntro ? 'sector-intro--reverse' : ''}`}>
          {reverseIntro ? (
            <figure className="sector-figure">
              <Img src={block.image} alt={block.imageAlt} loading="lazy" />
            </figure>
          ) : null}

          <div>
            {useLead ? (
              <RichText className="lead-text" html={block.lead} />
            ) : (
              <>
                <SectionHead eyebrow={block.eyebrow} title={block.title} />
                <RichText className="body-text" html={block.body} />
              </>
            )}
          </div>

          {!reverseIntro ? (
            <figure className="sector-figure">
              <Img src={block.image} alt={block.imageAlt} loading="lazy" />
            </figure>
          ) : null}
        </div>

        <div className="sector-body">
          <div className="stat-grid">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
          <figure className="sector-figure sector-figure--tall">
            <Img src={block.imageTall} alt={block.imageTallAlt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
};

const Health = () => {
  const block = useBlock('impact.health');
  const stats = useList('impact.health', 'stats');
  const images = useList('impact.health', 'images');

  return (
    <section className="section section--paper" id={block.anchor || undefined}>
      <div className="shell">
        <div className="sector-split">
          <div>
            <SectionHead eyebrow={block.eyebrow} title={block.title} />
            <RichText className="body-text" html={block.body} />

            <div className="stat-grid stat-grid--compact">
              {stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="sector-media-stack">
            {images.map((img) => (
              <figure className="sector-figure" key={img.src}>
                <Img src={img.src} alt={img.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Wash = () => {
  const block = useBlock('impact.wash');
  const stats = useList('impact.wash', 'stats');

  return (
    <section className="section section--ink" id={block.anchor || undefined}>
      <div className="shell">
        <div className="sector-intro">
          <figure className="sector-figure">
            <Img src={block.image} alt={block.imageAlt} loading="lazy" />
          </figure>
          <div>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-rule" aria-hidden="true" />
              {block.eyebrow}
            </p>
            <h2 className="section-title">{block.title}</h2>
            <RichText className="body-text" html={block.body} />
          </div>
        </div>

        <div className="wash-grid">
          {stats.map((stat, i) => (
            <div className="wash-stat" key={`${stat.label}-${i}`}>
              <Icon name={stat.icon || 'Droplets'} />
              <p className="wash-value">
                <Counter end={stat.value} />
              </p>
              <p className="wash-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const head = useBlock('impact.head');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
      <Achievement />
      <StatSector blockKey="impact.education" tone="sand" useLead />
      <Health />
      <StatSector blockKey="impact.food" tone="sand" reverseIntro />
      <Wash />
    </>
  );
};

export default Impact;
