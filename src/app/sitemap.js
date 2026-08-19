import { SITE_URL, getPosts } from '@/lib/cms';

const STATIC_ROUTES = [
  '', '/about', '/impact', '/get-involved', '/team',
  '/partners', '/resources', '/blog', '/donate', '/contact',
];

export const revalidate = 3600;

export default async function sitemap() {
  const posts = await getPosts();

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date || undefined,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
