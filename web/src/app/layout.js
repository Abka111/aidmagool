import './globals.css';

import { SITE_URL } from '@/lib/cms';
import { ORG_FULL } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DESCRIPTION =
  'AID (Aid for Integrated Development) is a national, woman-led humanitarian and development organization in Ethiopia working across WASH, health and nutrition, education and protection, food security and livelihoods.';

const OG_DESCRIPTION =
  'A national, woman-led humanitarian and development organization improving the lives, dignity, and resilience of vulnerable communities in Ethiopia.';

export const metadata = {
  // Lets every page give Open Graph a relative image path and still emit the
  // absolute URL that crawlers require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AID, Aid for Integrated Development',
    template: '%s | AID',
  },
  description: DESCRIPTION,
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    type: 'website',
    siteName: ORG_FULL,
    locale: 'en_GB',
    url: SITE_URL,
    title: 'AID, Aid for Integrated Development',
    description: OG_DESCRIPTION,
    images: [{ url: '/logo.jpg', alt: ORG_FULL }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AID, Aid for Integrated Development',
    description: OG_DESCRIPTION,
    images: ['/logo.jpg'],
  },
};

export const viewport = {
  themeColor: '#12100f',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Header />

      <main id="main">{children}</main>

      <Footer />
    </body>
  </html>
);

export default RootLayout;
