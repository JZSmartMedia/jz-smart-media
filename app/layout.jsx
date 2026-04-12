import { ThemeProvider } from 'next-themes';
import { Fraunces, DM_Sans } from 'next/font/google';
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
    default: 'JZ Smart Media | Digital Marketing for Home Service Businesses',
    template: '%s | JZ Smart Media',
  },
  description:
    'JZ Smart Media helps home service businesses grow with Local SEO, Google Ads, Review Management, CRM automation, and AI-powered marketing. Miami-based, nationwide results.',
  keywords: [
    'home service marketing',
    'local SEO for contractors',
    'Google Ads for home services',
    'HVAC marketing agency',
    'plumber marketing',
    'roofing marketing',
    'Google Business Profile management',
    'Yelp ads management',
    'review management',
    'CRM automation',
    'Miami digital marketing agency',
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
    title: 'JZ Smart Media | Digital Marketing for Home Service Businesses',
    description:
      'From Local SEO and Google Ads to CRM automation and web development — JZ Smart Media helps home service businesses dominate their local market.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JZ Smart Media — Digital Marketing for Home Service Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JZ Smart Media | Digital Marketing for Home Service Businesses',
    description:
      'Local SEO, Google Ads, Review Management & CRM automation for home service businesses. Miami-based, nationwide results.',
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
  '@type': 'MarketingAgency',
  name: 'JZ Smart Media',
  url: 'https://jzsmartmedia.com',
  logo: 'https://jzsmartmedia.com/favicon.ico',
  description:
    'JZ Smart Media helps home service businesses grow with Local SEO, Google Ads, Review Management, CRM automation, and AI-powered marketing.',
  telephone: '+13527556501',
  email: 'info@jzsmartmedia.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61579089646043',
    'http://instagram.com/jz.smartmedia',
    'https://www.youtube.com/@JZ.SmartMedia',
    'https://www.linkedin.com/company/jz-smart-media/about/',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO & Google Business Profile' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Marketing Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions & Business Intelligence' } },
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
      </body>
    </html>
  );
}