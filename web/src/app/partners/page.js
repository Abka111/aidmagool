import { ArrowRight } from 'lucide-react';

import { getBlock, listOf } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
import SmartLink from '@/components/SmartLink';
import { Img, PageHead } from '@/components/ui';

export const revalidate = 60;

export async function generateMetadata() {
  const head = await getBlock('partners.head');

  return pageMetadata({
    title: head.title || 'Partners',
    description: head.lead,
    path: '/partners',
  });
}

const PartnersPage = async () => {
  // Both blocks come from the same cached content fetch, so awaiting them in
  // sequence costs no extra request.
  const head = await getBlock('partners.head');
  const block = await getBlock('partners.logos');
  const logos = listOf(block);

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

export default PartnersPage;
