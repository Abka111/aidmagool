import Link from 'next/link';

/**
 * Links authored in the admin can be internal routes ("/donate"), in-page
 * anchors ("/impact#wash") or external URLs. Internal ones must go through the
 * router so navigation stays client-side.
 */
const isExternal = (to) => /^(https?:)?\/\//.test(to) || /^(mailto|tel):/.test(to);

const SmartLink = ({ to, children, ...rest }) => {
  if (!to) return <span {...rest}>{children}</span>;

  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={to} {...rest}>
      {children}
    </Link>
  );
};

export default SmartLink;
