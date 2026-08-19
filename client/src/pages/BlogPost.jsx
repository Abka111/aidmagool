import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';

import { fetchPost } from '../api/cms';
import { usePosts } from '../context/CmsContext';
import { Img, RichText, formatDate } from '../components/ui';

const BlogPost = () => {
  const { slug } = useParams();
  const posts = usePosts();

  // Use the list we already have for an instant render, then confirm against
  // the API so a direct visit to a post URL works on its own.
  const [post, setPost] = useState(() => posts.find((p) => p.slug === slug) || null);
  const [state, setState] = useState(post ? 'ready' : 'loading');

  // Slug currently on screen, so a response that outlives its navigation can be
  // dropped instead of landing on a different article.
  const activeSlug = useRef(slug);
  // Slug we already have an answer for. The list resolves after the single
  // fetch on a direct visit, and it must not overwrite that answer.
  const settledSlug = useRef(post ? slug : null);
  // Slug a single fetch is already in flight for, so the list arriving mid
  // request does not start a second one.
  const requestedSlug = useRef(null);

  useEffect(() => {
    activeSlug.current = slug;
    if (settledSlug.current === slug) return;

    const known = posts.find((p) => p.slug === slug);
    if (known) {
      settledSlug.current = slug;
      setPost(known);
      setState('ready');
      return;
    }

    if (requestedSlug.current === slug) return;
    requestedSlug.current = slug;

    (async () => {
      const fetched = await fetchPost(slug);
      if (activeSlug.current !== slug) return;
      // An empty answer only means "missing" while nothing else has resolved
      // this slug; a post the list supplied in the meantime stays on screen.
      if (!fetched && settledSlug.current === slug) return;
      settledSlug.current = slug;
      setPost(fetched);
      setState(fetched ? 'ready' : 'missing');
    })();
  }, [slug, posts]);

  if (state === 'loading') {
    return (
      <section className="section section--paper">
        <div className="shell shell--narrow">
          <p className="empty-state">Loading article…</p>
        </div>
      </section>
    );
  }

  if (state === 'missing' || !post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="article">
        <header className="article-head">
          <div className="shell shell--narrow">
            <Link to="/blog" className="article-back">
              <ArrowLeft aria-hidden="true" />
              All posts
            </Link>

            <p className="post-meta">
              <span className="post-tag">{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span className="post-reading">
                <Clock aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </p>

            <h1 className="article-title">{post.title}</h1>
            <p className="article-standfirst">{post.excerpt}</p>

            <p className="article-byline">
              <User aria-hidden="true" />
              {post.author}
            </p>
          </div>
        </header>

        {post.cover ? (
          <figure className="article-cover">
            <Img src={post.cover} alt="" />
          </figure>
        ) : null}

        <RichText className="shell shell--narrow article-body" html={post.bodyHtml} />
      </article>

      {related.length ? (
        <section className="section section--sand">
          <div className="shell">
            <div className="head-row">
              <h2 className="section-title">Keep reading</h2>
              <Link className="btn btn--outline head-row-action" to="/blog">
                All posts
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="post-grid">
              {related.map((p) => (
                <article className="post-card" key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="post-card-media">
                    <Img src={p.cover} alt="" loading="lazy" />
                  </Link>
                  <div className="post-card-body">
                    <p className="post-meta">
                      <span className="post-tag">{p.category}</span>
                      <span>{formatDate(p.date)}</span>
                    </p>
                    <h3>
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="post-excerpt">{p.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogPost;
