import { SITE_URL, asset, toPlainText } from './cms';

export const ORG_NAME = 'AID';
export const ORG_FULL = 'Aid for Integrated Development';

/**
 * The image a crawler shows when a link is shared. Facebook, LinkedIn, X and
 * WhatsApp all want an absolute URL and will silently show nothing for a
 * relative one, which is the whole reason this site moved off a static shell.
 */
const ogImage = (src, alt) => {
  const url = asset(src);
  if (!url) return [];
  return [{ url, width: 1200, height: 630, alt: alt || ORG_FULL }];
};

/**
 * Builds the metadata object for a page.
 *
 * `path` must be the route, so the canonical URL and og:url point at this page
 * rather than the homepage, which is what stops every share from previewing
 * identically.
 */
export const pageMetadata = ({ title, description, path = '/', image, imageAlt, type = 'website' }) => {
  const url = `${SITE_URL}${path}`;
  const desc = toPlainText(description);
  const images = ogImage(image, imageAlt);

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: ORG_FULL,
      type,
      locale: 'en_GB',
      ...(images.length ? { images } : {}),
    },
    twitter: {
      card: images.length ? 'summary_large_image' : 'summary',
      title,
      description: desc,
      ...(images.length ? { images: images.map((i) => i.url) } : {}),
    },
  };
};

/** Adds the article specific Open Graph fields a blog post needs. */
export const articleMetadata = (post) => {
  const base = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    imageAlt: post.title,
    type: 'article',
  });

  return {
    ...base,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      ...base.openGraph,
      publishedTime: post.date ? new Date(`${post.date}T00:00:00Z`).toISOString() : undefined,
      authors: post.author ? [post.author] : undefined,
      section: post.category || undefined,
    },
  };
};

/**
 * JSON-LD for a post. Google reads this for article rich results, which the
 * Open Graph tags alone do not provide.
 */
export const articleJsonLd = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: toPlainText(post.excerpt),
  image: post.cover ? [asset(post.cover)] : undefined,
  datePublished: post.date ? new Date(`${post.date}T00:00:00Z`).toISOString() : undefined,
  author: post.author ? { '@type': 'Person', name: post.author } : undefined,
  publisher: {
    '@type': 'Organization',
    name: ORG_FULL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.jpg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
});
