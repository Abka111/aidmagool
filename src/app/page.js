import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

import { asset, formatDate, getBlock, getContent, getPosts, listOf } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
import SmartLink from '@/components/SmartLink';
import ImpactBanner from '@/components/ImpactBanner';
import { Counter, Icon, Img, RichText, SectionHead } from '@/components/ui';

export const revalidate = 60;

export async function generateMetadata() {
  const hero = await getBlock('home.hero');

  return pageMetadata({
    title: 'AID, Aid for Integrated Development',
    description: hero.lead,
    path: '/',
    image: hero.image,
    imageAlt: hero.imageAlt,
  });
}

const Hero = ({ hero, figures }) => (
  <section className="hero">
    <div className="hero-main">
      <div className="hero-copy">
        <h1 className="hero-title">
          {hero.titleLine}
          {hero.titleAccent ? (
            <>
              <br />
              <em>{hero.titleAccent}</em>
            </>
          ) : null}
        </h1>

        <p className="hero-lead">{hero.lead}</p>

        <div className="hero-actions">
          {hero.primaryLabel ? (
            <SmartLink to={hero.primaryLink} className="btn btn--primary">
              {hero.primaryLabel}
              <Icon name="HandCoins" />
            </SmartLink>
          ) : null}
          {hero.secondaryLabel ? (
            <SmartLink to={hero.secondaryLink} className="btn btn--underline">
              {hero.secondaryLabel}
              <ArrowRight aria-hidden="true" />
            </SmartLink>
          ) : null}
        </div>
      </div>

      <div className="hero-media">
        <figure className="hero-figure-main">
          <Img src={hero.image} alt={hero.imageAlt} />
        </figure>
        {hero.badgeValue ? (
          <div className="hero-badge">
            <p className="hero-badge-value">
              <Counter end={hero.badgeValue} duration={2.6} />
            </p>
            <p className="hero-badge-label">{hero.badgeLabel}</p>
          </div>
        ) : null}
      </div>
    </div>

    {figures.length ? (
      <dl className="hero-figures">
        {figures.map((figure) => (
          <div className="hero-figure" key={figure.label}>
            <dt>{figure.label}</dt>
            <dd>{figure.animate ? <Counter end={figure.value} duration={2.2} /> : figure.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}
  </section>
);

const AboutTeaser = ({ about, pillars }) => (
  <section className="section section--paper">
    <div className="shell">
      <SectionHead eyebrow={about.eyebrow} title={about.title} />

      <div className="about-grid">
        <RichText className="lead-text" html={about.leadText} />

        <div>
          <RichText className="body-text" html={about.body} />
          {about.ctaLabel ? (
            <SmartLink className="link-arrow" to={about.ctaLink}>
              {about.ctaLabel}
              <ArrowRight aria-hidden="true" />
            </SmartLink>
          ) : null}
        </div>
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
);

const Sectors = ({ sectors, items }) => {
  if (!items.length) return null;

  return (
    <section className="section section--sand">
      <div className="shell">
        <SectionHead eyebrow={sectors.eyebrow} title={sectors.title} lead={sectors.lead} />

        <div className="sector-cards">
          {items.map((item) => (
            <SmartLink className="sector-card" to={item.link} key={item.title}>
              <span className="card-icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="link-arrow">
                See the impact
                <ArrowRight aria-hidden="true" />
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
};

const Commitment = ({ commitment }) => (
  <section className="section section--ink commitment">
    <div className="shell shell--narrow">
      <Quote className="commitment-quote" aria-hidden="true" strokeWidth={1.2} />
      <p className="eyebrow eyebrow--light">
        <span className="eyebrow-rule" aria-hidden="true" />
        {commitment.eyebrow}
      </p>
      <h2 className="commitment-title">{commitment.title}</h2>
      <p className="commitment-text">{commitment.text}</p>
    </div>
  </section>
);

const InvolveTeaser = ({ involve, items }) => {
  if (!items.length) return null;

  return (
    <section className="section section--paper">
      <div className="shell">
        <SectionHead align="center" eyebrow={involve.eyebrow} title={involve.title} lead={involve.lead} />

        <div className="involve-cards involve-cards--flat">
          {items.map((item) => (
            <article className="card card--hover" key={item.title}>
              <span className="card-icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <SmartLink className="link-arrow" to={item.link}>
                Read More
                <ArrowRight aria-hidden="true" />
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersStrip = ({ strip, logos }) => {
  if (!logos.length) return null;

  // Doubled so the CSS marquee can loop without a visible seam.
  const marquee = [...logos, ...logos];

  return (
    <section className="section section--sand partners">
      <div className="shell">
        <SectionHead align="center" eyebrow={strip.eyebrow} title={strip.title} />
      </div>

      <div className="marquee">
        <ul className="marquee-track">
          {marquee.map((logo, i) => (
            <li key={`${logo.src}-${i}`}>
              <img
                src={asset(logo.src)}
                alt={i < logos.length ? logo.name || `Partner organization ${i + 1}` : ''}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="shell partners-action">
        <Link href="/partners" className="btn btn--outline">
          {strip.ctaLabel || 'See all partners'}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

const LatestPosts = ({ teaser, posts }) => {
  if (!posts.length) return null;

  return (
    <section className="section section--paper">
      <div className="shell">
        <div className="head-row">
          <SectionHead eyebrow={teaser.eyebrow} title={teaser.title} />
          <Link className="btn btn--outline head-row-action" href="/blog">
            {teaser.ctaLabel || 'All posts'}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="post-grid">
          {posts.slice(0, 3).map((post) => (
            <article className="post-card" key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="post-card-media">
                <Img src={post.cover} alt="" loading="lazy" />
              </Link>
              <div className="post-card-body">
                <p className="post-meta">
                  <span className="post-tag">{post.category}</span>
                  <span>{formatDate(post.date)}</span>
                </p>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link className="link-arrow" href={`/blog/${post.slug}`}>
                  Read article
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClosingCta = ({ cta }) => (
  <section className="section section--ink closing-cta">
    <div className="shell closing-inner">
      <div>
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
      </div>
      <div className="closing-actions">
        {cta.primaryLabel ? (
          <SmartLink to={cta.primaryLink} className="btn btn--light">
            {cta.primaryLabel}
            <Icon name="HandCoins" />
          </SmartLink>
        ) : null}
        {cta.secondaryLabel ? (
          <SmartLink to={cta.secondaryLink} className="btn btn--ghost">
            {cta.secondaryLabel}
            <ArrowRight aria-hidden="true" />
          </SmartLink>
        ) : null}
      </div>
    </div>
  </section>
);

const Home = async () => {
  // One content read for the whole page, then blocks are handed to the
  // sections, so nine sections do not each re-enter the fetch cache.
  const [content, posts] = await Promise.all([getContent(), getPosts()]);
  const block = (key) => content[key] || {};

  const banner = block('home.banner');

  return (
    <>
      <Hero hero={block('home.hero')} figures={listOf(block('home.heroFigures'))} />
      <AboutTeaser about={block('home.about')} pillars={listOf(block('home.pillars'))} />
      <Sectors sectors={block('home.sectors')} items={listOf(block('home.sectors'))} />
      <Commitment commitment={block('home.commitment')} />
      <ImpactBanner
        title={banner.title}
        slides={listOf(banner, 'slides')}
        ctaLabel={banner.ctaLabel}
        ctaLink={banner.ctaLink}
      />
      <InvolveTeaser involve={block('home.involve')} items={listOf(block('home.involve'))} />
      <PartnersStrip strip={block('home.partners')} logos={listOf(block('partners.logos'))} />
      <LatestPosts teaser={block('home.blogTeaser')} posts={posts} />
      <ClosingCta cta={block('home.closingCta')} />
    </>
  );
};

export default Home;
