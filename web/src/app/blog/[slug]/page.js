import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';

import { formatDate, getPost, getPosts } from '@/lib/cms';
import { articleJsonLd, articleMetadata } from '@/lib/metadata';
import { Img, RichText } from '@/components/ui';

export const revalidate = 60;

// A post published after the last build must still resolve, so an unknown slug
// renders on demand instead of 404ing until the next deploy.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((post) => post.slug && post.published !== false)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  // params is a Promise in Next 15.
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return articleMetadata(post);
}

const BlogPost = async ({ params }) => {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />

      <article className="article">
        <header className="article-head">
          <div className="shell shell--narrow">
            <Link href="/blog" className="article-back">
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
              <Link className="btn btn--outline head-row-action" href="/blog">
                All posts
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="post-grid">
              {related.map((p) => (
                <article className="post-card" key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="post-card-media">
                    <Img src={p.cover} alt="" loading="lazy" />
                  </Link>
                  <div className="post-card-body">
                    <p className="post-meta">
                      <span className="post-tag">{p.category}</span>
                      <span>{formatDate(p.date)}</span>
                    </p>
                    <h3>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
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
