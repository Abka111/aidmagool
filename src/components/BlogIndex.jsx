'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

import { asset, formatDate } from '@/lib/cms';

/**
 * The category filter is the only interactive part of the blog index, so it is
 * the only part that ships to the browser. The server renders this component
 * with the unfiltered list already in place, which is what lets a crawler read
 * every post out of the HTML without running any JavaScript.
 */
const BlogIndex = ({ posts = [] }) => {
  const [active, setActive] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
    [posts]
  );

  const sorted = useMemo(() => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)), [posts]);
  const visible = active === 'All' ? sorted : sorted.filter((p) => p.category === active);
  const [lead, ...rest] = visible;

  return (
    <section className="section section--paper">
      <div className="shell">
        {categories.length > 1 ? (
          <div className="filter-row" role="group" aria-label="Filter posts by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip ${active === c ? 'is-active' : ''}`}
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        ) : null}

        {!visible.length ? <p className="empty-state">No posts published yet.</p> : null}

        {lead ? (
          <article className="post-feature">
            <Link href={`/blog/${lead.slug}`} className="post-feature-media">
              {lead.cover ? <img src={asset(lead.cover)} alt="" /> : null}
            </Link>
            <div className="post-feature-body">
              <p className="post-meta">
                <span className="post-tag">{lead.category}</span>
                <span>{formatDate(lead.date)}</span>
                <span className="post-reading">
                  <Clock aria-hidden="true" />
                  {lead.readingMinutes} min read
                </span>
              </p>
              <h2>
                <Link href={`/blog/${lead.slug}`}>{lead.title}</Link>
              </h2>
              <p className="post-excerpt">{lead.excerpt}</p>
              <Link className="btn btn--primary" href={`/blog/${lead.slug}`}>
                Read article
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ) : null}

        {rest.length ? (
          <div className="post-grid post-grid--wide">
            {rest.map((post) => (
              <article className="post-card" key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="post-card-media">
                  {post.cover ? <img src={asset(post.cover)} alt="" loading="lazy" /> : null}
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
        ) : null}
      </div>
    </section>
  );
};

export default BlogIndex;
