import React from 'react';
import { ArrowRight } from 'lucide-react';

import { useBlock, useList } from '../context/CmsContext';
import SmartLink from '../components/SmartLink';
import { Icon, Img, PageHead, RichText, SectionHead } from '../components/ui';

const About = () => {
  const head = useBlock('about.head');
  const intro = useBlock('about.intro');
  const pillars = useList('about.pillars');
  const approach = useBlock('about.approach');
  const approachItems = useList('about.approach');
  const howWeWork = useBlock('about.howWeWork');
  const story = useBlock('about.story');
  const storyRows = useList('about.story', 'rows');
  const mission = useBlock('about.mission');
  const missionCards = useList('about.mission', 'cards');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="about-grid">
            <RichText className="lead-text" html={intro.leadText} />
            <RichText className="body-text" html={intro.body} />
          </div>

          {pillars.length ? (
            <ul className="pillars">
              {pillars.map((pillar) => (
                <li className="pillar" key={pillar.num || pillar.text}>
                  <span className="pillar-icon" aria-hidden="true">
                    <Icon name={pillar.icon} strokeWidth={1.6} />
                  </span>
                  <span className="pillar-num">{pillar.num}</span>
                  <span className="pillar-text">{pillar.text}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="section section--sand" id="approach">
        <div className="shell">
          <SectionHead eyebrow={approach.eyebrow} title={approach.title} />

          <div className="approach-list">
            {approachItems.map((item, i) => (
              <article className="approach-item" key={item.title}>
                <div className="approach-aside">
                  <span className="approach-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="approach-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="approach-title">{item.title}</h3>
                </div>
                <RichText className="approach-body" html={item.body} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split" id="how-we-work">
        <div className="split-copy">
          <div className="split-copy-inner">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-rule" aria-hidden="true" />
              {howWeWork.eyebrow}
            </p>
            <h2>{howWeWork.title}</h2>
            <RichText html={howWeWork.body} />
          </div>
        </div>
        <div className="split-media">
          <Img src={howWeWork.image} alt={howWeWork.imageAlt} loading="lazy" />
        </div>
      </section>

      <section className="section section--paper" id="our-story">
        <div className="shell">
          <SectionHead eyebrow={story.eyebrow} title={story.title} />

          <div className="story-intro">
            <RichText className="body-text" html={story.intro} />
            <figure className="story-figure">
              <Img src={story.introImage} alt={story.introImageAlt} loading="lazy" />
            </figure>
          </div>

          {storyRows.map((row, i) => (
            <div
              className={`story-row ${row.reverse ? 'story-row--reverse' : ''}`}
              id={row.anchor || undefined}
              key={row.title || i}
            >
              <figure className="story-figure">
                <Img src={row.image} alt={row.imageAlt} loading="lazy" />
              </figure>
              <div className="story-copy">
                <h3>{row.title}</h3>
                <RichText html={row.body} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--sand" id="mission">
        <div className="shell">
          <div className="mv-grid">
            <div className="mv-intro">
              <SectionHead eyebrow={mission.eyebrow} title={mission.title} />
              <RichText className="body-text" html={mission.body} />
              {mission.ctaLabel ? (
                <SmartLink className="link-arrow" to={mission.ctaLink}>
                  {mission.ctaLabel}
                  <ArrowRight aria-hidden="true" />
                </SmartLink>
              ) : null}
            </div>

            <div className="mv-cards">
              {missionCards.map((card) => (
                <article className="card" key={card.title}>
                  <span className="card-icon" aria-hidden="true">
                    <Icon name={card.icon} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {mission.bannerImage ? (
          <figure className="mv-banner">
            <Img src={mission.bannerImage} alt={mission.bannerImageAlt} loading="lazy" />
          </figure>
        ) : null}
      </section>
    </>
  );
};

export default About;
