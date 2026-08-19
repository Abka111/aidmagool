import { asset } from '@/lib/cms';

// Counter and Stat depend on browser only libraries, so they live in a client
// island and are re-exported here to keep one import site for shared UI.
export { Counter, Stat } from './Counter';
export { Icon } from './Icon';

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
