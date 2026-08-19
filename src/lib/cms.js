import fallback from '@/data/fallback.json';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091').replace(/\/$/, '');

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/**
 * Uploaded media is stored as a site relative path so it works whichever host
 * serves it. Open Graph images MUST be absolute, so everything goes through
 * here rather than being interpolated inline.
 */
export const asset = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * How long a rendered page may serve stale data before Next revalidates it.
 * Editors expect their change to appear without a redeploy, and a minute is
 * short enough to feel immediate while still absorbing crawler traffic.
 */
export const REVALIDATE = 60;

const request = async (path) => {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
};

const isBlockMap = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Every content block, keyed. Falls back to the defaults the backend seeds so
 * the site renders even when the API is unreachable at build or request time.
 */
export const getContent = async () => {
  try {
    const data = await request('/api/content');
    if (!isBlockMap(data)) return fallback;
    return { ...fallback, ...data };
  } catch {
    return fallback;
  }
};

/** One content block, guaranteed to be an object. */
export const getBlock = async (key) => {
  const content = await getContent();
  return content[key] || {};
};

/** A block's list field, guaranteed to be an array. */
export const listOf = (block, field = 'items') =>
  Array.isArray(block?.[field]) ? block[field] : [];

export const getPosts = async () => {
  try {
    const data = await request('/api/posts');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const getPost = async (slug) => {
  try {
    return await request(`/api/posts/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
};

export const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/** Strips tags so rich text can be used as a meta description. */
export const toPlainText = (html, limit = 200) => {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
};
