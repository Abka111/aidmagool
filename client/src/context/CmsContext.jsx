import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchContent, fetchPosts } from '../api/cms';
import fallback from '../data/fallback.json';

const CmsContext = createContext({
  content: fallback,
  posts: [],
  ready: false,
  live: false,
});

export const CmsProvider = ({ children }) => {
  const [state, setState] = useState({
    content: fallback,
    posts: [],
    ready: false,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ content, live }, posts] = await Promise.all([fetchContent(), fetchPosts()]);
      if (cancelled) return;
      setState({ content, posts, ready: true, live });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};

export const useCms = () => useContext(CmsContext);

/**
 * Returns one content block. Blocks always exist thanks to the bundled
 * fallback, so pages never need to guard against undefined.
 */
export const useBlock = (key) => {
  const { content } = useCms();
  return content[key] || {};
};

/** Returns a block's list field, guaranteed to be an array. */
export const useList = (key, field = 'items') => {
  const block = useBlock(key);
  const value = block[field];
  return Array.isArray(value) ? value : [];
};

export const usePosts = () => {
  const { posts } = useCms();
  return posts;
};
