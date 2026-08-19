import fallback from '../data/fallback.json';

/**
 * Base URL of the Go content API. Set REACT_APP_API_URL at build time to point
 * the site at a deployed backend.
 */
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

/**
 * Uploaded images are stored as site-relative paths ("/uploads/hero.jpg") so
 * the same value works whether the API is on this origin or another one.
 */
export const asset = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const request = async (path, { timeout = 8000 } = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${API_URL}${path}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
};

const isBlockMap = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Loads every content block. If the API cannot be reached the site still
 * renders, using the same defaults the backend was seeded with.
 */
export const fetchContent = async () => {
  try {
    const data = await request('/api/content');
    // An error envelope or any other non-map body would spread into junk
    // blocks, so treat it exactly like an unreachable API.
    if (!isBlockMap(data)) return { content: fallback, live: false };
    // Merge over the fallback so a block added after this build still renders.
    return { content: { ...fallback, ...data }, live: true };
  } catch {
    return { content: fallback, live: false };
  }
};

export const fetchPosts = async () => {
  try {
    const data = await request('/api/posts');
    // Every consumer maps and filters this, so a non-array body must not escape.
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const fetchPost = async (slug) => {
  try {
    return await request(`/api/posts/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
};

/**
 * Records a donation pledge. Resolves to { ok: true } only on a 201 so the page
 * never reports success for a pledge the backend did not store.
 */
export const postPledge = async (pledge, { timeout = 8000 } = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${API_URL}/api/pledges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pledge),
      signal: controller.signal,
    });

    if (res.status === 201) return { ok: true };

    // Validation failures answer with { error }; other statuses may carry no
    // body at all, so fall back to the status code.
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: data.error || `Request failed with status ${res.status}` };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  } finally {
    clearTimeout(timer);
  }
};
