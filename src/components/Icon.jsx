import * as Lucide from 'lucide-react';

/**
 * Renders a Lucide icon by name. The admin stores icon choices as strings, so
 * an unknown or removed name degrades to nothing rather than crashing a page.
 *
 * It lives in its own module because both ui.jsx (server) and Counter.jsx
 * (client) need it, and importing it from ui.jsx would make the two files
 * circular across the client boundary.
 */
export const Icon = ({ name, strokeWidth = 1.5, ...rest }) => {
  const Component = name && Lucide[name];
  if (!Component) return null;
  return <Component aria-hidden="true" strokeWidth={strokeWidth} {...rest} />;
};

export default Icon;
