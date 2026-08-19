import { ArrowRight } from 'lucide-react';

import { getBlock, listOf } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
import SmartLink from '@/components/SmartLink';
import { Icon, PageHead } from '@/components/ui';

export const revalidate = 60;

export async function generateMetadata() {
  const head = await getBlock('resources.head');
  return pageMetadata({
    title: head.title,
    description: head.lead,
    path: '/resources',
  });
}

const Resources = async () => {
  const head = await getBlock('resources.head');
  const items = listOf(await getBlock('resources.items'));

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="resource-grid">
            {items.map((item) => (
              <article className="card card--hover" key={item.title}>
                <span className="card-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <SmartLink className="link-arrow" to={item.link}>
                  {item.ctaLabel || 'Read more'}
                  <ArrowRight aria-hidden="true" />
                </SmartLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
