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
    default: 'JZ Smart Media | Contractor SEO Agency & Home Service Marketing — Miami, FL',
    template: '%s | JZ Smart Media',
  },
  description:
    "JZ Smart Media is a top-rated contractor SEO agency and home service marketing agency based in Miami, FL. We deliver local SEO for contractors, Google Ads, Google Business Profile management, review management, and CRM automation — proven results for roofers, HVAC, plumbers, electricians & more nationwide.",
  keywords: [
    'contractor SEO agency',
    'home service marketing agency',
    'local SEO for contractors',
    'digital marketing for home services',
    'electrician marketing agency',
    'marketing agency for roofers',
    'pressure washing marketing',
    'digital marketing for contractors',
    'local SEO agency Miami',
    'contractor marketing agency',
    'local SEO for home services',
    'Google Ads for contractors',
    'home service marketing',
    'Google Ads for home services',
    'HVAC marketing agency',
    'plumber marketing',
    'roofing marketing agency',
    'Google Business Profile management',
    'Yelp ads management',
    'review management for contractors',
    'CRM automation for home services',
    'Miami digital marketing agency',
    'home service lead generation',
    'local service ads management',
    'contractor marketing Miami',
    'home service contractor marketing Florida',
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
    title: "JZ Smart Media | Contractor SEO Agency & Home Service Marketing — Miami, FL",
    description:
      "Miami's leading contractor SEO agency and home service marketing agency. Local SEO, Google Ads, Google Business Profile, Review Management & CRM automation — built for roofers, plumbers, HVAC pros, electricians & more.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JZ Smart Media — Contractor SEO Agency & Home Service Marketing in Miami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "JZ Smart Media | Contractor SEO Agency & Home Service Marketing — Miami, FL",
    description:
      "Top contractor SEO agency: Local SEO, Google Ads, Review Management & CRM automation for home service contractors. Miami-based, nationwide results. Get more leads today.",
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
    "JZ Smart Media is a top-rated contractor SEO agency and home service marketing agency in Miami, FL. We specialize in local SEO for contractors, Google Ads, Google Business Profile management, review management, and CRM automation.",
  telephone: '+13545556501',
  email: 'info@jzsmartmedia.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Miami',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33101',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.7617',
    longitude: '-80.1918',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Miami',
      sameAs: 'https://en.wikipedia.org/wiki/Miami',
    },
    {
      '@type': 'State',
      name: 'Florida',
      sameAs: 'https://en.wikipedia.org/wiki/Florida',
    },
    {
      '@type': 'Country',
      name: 'United States',
      sameAs: 'https://en.wikipedia.org/wiki/United_States',
    },
  ],
  serviceType: [
    'Contractor SEO Agency',
    'Local SEO for Contractors',
    'Home Service Marketing',
    'Digital Marketing for Home Services',
    'Google Ads for Contractors',
    'Google Business Profile Management',
    'Review Management',
    'CRM Automation',
    'Electrician Marketing',
    'Roofing Marketing',
    'HVAC Marketing',
    'Plumber Marketing',
    'Pressure Washing Marketing',
    'Home Service Lead Generation',
  ],
  knowsAbout: [
    'Local SEO',
    'Google Ads',
    'Google Business Profile Optimization',
    'Home Service Marketing',
    'Contractor SEO',
    'Review Management',
    'CRM Automation',
    'Local Service Ads',
    'Yelp Advertising',
    'Digital Marketing for Contractors',
    'Electrician Marketing',
    'Roofing Marketing',
    'HVAC Marketing',
    'Plumber Marketing',
    'Pressure Washing Marketing',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61579089646043',
    'http://instagram.com/jz.smartmedia',
    'https://www.youtube.com/@JZ.SmartMedia',
    'https://www.linkedin.com/company/jz-smart-media/about/',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Contractor SEO & Home Service Digital Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO & Google Business Profile Management for Contractors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads for Home Service Contractors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management for Home Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Marketing Automation for Home Service Businesses' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development for Contractors & Home Service Companies' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions & Business Intelligence for Home Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Service Lead Generation & Electrician Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Washing & Landscaping Marketing Agency Services' } },
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
