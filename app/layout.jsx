import { ThemeProvider } from 'next-themes';
import { Fraunces, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const siteUrl = 'https://jzsmartmedia.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JZ Smart Media | #1 Home Service Marketing Agency in Miami',
    template: '%s | JZ Smart Media',
  },
  description:
    "JZ Smart Media is Miami's top digital marketing agency for home service contractors. We specialize in Local SEO, Google Ads, Google Business Profile management, Review Management, and CRM automation — proven to grow roofing, HVAC, plumbing & contractor businesses nationwide.",
  keywords: [
    'home service marketing agency',
    'digital marketing for contractors',
    'local SEO agency Miami',
    'contractor marketing agency',
    'local SEO for home services',
    'Google Ads for contractors',
    'home service marketing',
    'local SEO for contractors',
    'Google Ads for home services',
    'HVAC marketing agency',
    'plumber marketing',
    'roofing marketing agency',
    'Google Business Profile management',
    'Yelp ads management',
    'review management for contractors',
    'CRM automation for home services',
    'Miami digital marketing agency',
    'contractor SEO agency',
    'home service lead generation',
    'local service ads management',
  ],
  authors: [{ name: 'JZ Smart Media', url: siteUrl }],
  creator: 'JZ Smart Media',
  publisher: 'JZ Smart Media',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'JZ Smart Media',
    title: "JZ Smart Media | #1 Home Service Marketing Agency in Miami",
    description:
      "Miami's leading digital marketing agency for home service contractors. Local SEO, Google Ads, Google Business Profile, Review Management & CRM automation — built for roofers, plumbers, HVAC pros & more.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JZ Smart Media — #1 Home Service Marketing Agency in Miami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "JZ Smart Media | #1 Home Service Marketing Agency in Miami",
    description:
      "Local SEO, Google Ads, Review Management & CRM automation for home service contractors. Miami-based, nationwide results. Get more leads today.",
    images: ['/og-image.jpg'],
    creator: '@jzsmartmedia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'ProfessionalService', 'LocalBusiness'],
  name: 'JZ Smart Media',
  url: 'https://jzsmartmedia.com',
  logo: 'https://jzsmartmedia.com/favicon.ico',
  image: 'https://jzsmartmedia.com/og-image.jpg',
  description:
    "JZ Smart Media is Miami's top digital marketing agency for home service contractors. We specialize in Local SEO, Google Ads, Google Business Profile management, Review Management, and CRM automation.",
  telephone: '+135****6501',
  email: 'info@jzsmartmedia.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.7617',
    longitude: '-80.1918',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61579089646043',
    'http://instagram.com/jz.smartmedia',
    'https://www.youtube.com/@JZ.SmartMedia',
    'https://www.linkedin.com/company/jz-smart-media/about/',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services for Home Service Contractors',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO & Google Business Profile Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads for Contractors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Marketing Automation for Home Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development for Contractors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions & Business Intelligence' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Service Lead Generation' } },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69de52ae2676ea4c54b6a95a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
