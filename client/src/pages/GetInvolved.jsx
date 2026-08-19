import React from 'react';
import { ArrowRight } from 'lucide-react';

import { useBlock, useList } from '../context/CmsContext';
import SmartLink from '../components/SmartLink';
import { Icon, Img, PageHead, RichText, SectionHead } from '../components/ui';

const GetInvolved = () => {
  const head = useBlock('getInvolved.head');
  const panel = useBlock('getInvolved.panel');
  const cards = useList('getInvolved.cards');
  const why = useBlock('getInvolved.why');
  const features = useList('getInvolved.features');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="involve-panel">
            <div className="involve-copy">
              <h2>
                {panel.title} <span>{panel.titleAccent}</span>
              </h2>
              <p>{panel.text}</p>
              <div className="involve-actions">
                {panel.primaryLabel ? (
                  <SmartLink to={panel.primaryLink} className="btn btn--light">
                    {panel.primaryLabel}
                    <Icon name="HandCoins" />
                  </SmartLink>
                ) : null}
                {panel.secondaryLabel ? (
                  <SmartLink to={panel.secondaryLink} className="btn btn--ghost">
                    {panel.secondaryLabel}
                    <ArrowRight aria-hidden="true" />
                  </SmartLink>
                ) : null}
              </div>
            </div>
          </div>

          <div className="involve-cards">
            {cards.map((card) => (
              <article className="card card--raised" key={card.title}>
                <span className="card-icon" aria-hidden="true">
                  <Icon name={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <SmartLink className="link-arrow" to={card.link}>
                  Read More
                  <ArrowRight aria-hidden="true" />
                </SmartLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="shell">
          <div className="cta-grid">
            <div className="cta-copy">
              <SectionHead eyebrow={why.eyebrow} title={why.title} />
              <RichText className="body-text" html={why.body} />
              {why.ctaLabel ? (
                <SmartLink to={why.ctaLink} className="btn btn--primary">
                  {why.ctaLabel}
                  <ArrowRight aria-hidden="true" />
                </SmartLink>
              ) : null}
            </div>
            <figure className="cta-media">
              <Img src={why.image} alt={why.imageAlt} loading="lazy" />
            </figure>
          </div>

          {features.length ? (
            <ul className="feature-row">
              {features.map((feature) => (
                <li className="feature" key={feature.title}>
                  <span className="feature-icon" aria-hidden="true">
                    <Icon name={feature.icon} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default GetInvolved;
