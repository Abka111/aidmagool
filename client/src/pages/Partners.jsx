import React from 'react';
import { ArrowRight } from 'lucide-react';

import { useBlock, useList } from '../context/CmsContext';
import SmartLink from '../components/SmartLink';
import { Img, PageHead } from '../components/ui';

const Partners = () => {
  const head = useBlock('partners.head');
  const block = useBlock('partners.logos');
  const logos = useList('partners.logos');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <ul className="partner-grid">
            {logos.map((logo, i) => (
              <li className="partner-tile" key={logo.src || i}>
                <Img src={logo.src} alt={logo.name || `Partner organization ${i + 1}`} loading="lazy" />
              </li>
            ))}
          </ul>

          {block.ctaLabel ? (
            <div className="partners-action">
              <SmartLink to={block.ctaLink} className="btn btn--outline">
                {block.ctaLabel}
                <ArrowRight aria-hidden="true" />
              </SmartLink>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Partners;
