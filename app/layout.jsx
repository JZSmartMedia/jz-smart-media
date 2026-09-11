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
    default: 'JZ Smart Media | Contractor SEO Agency & Home Services Marketing — Miami, FL',
    template: '%s | JZ Smart Media',
  },
  description:
    "JZ Smart Media is a top-rated contractor SEO agency and home services marketing agency based in Miami, FL. We specialize in SEO for contractors, home services SEO, plumber SEO, HVAC marketing, electrician digital marketing, and web design for contractors — delivering local SEO, Google Ads, Google Business Profile management, review management, and CRM automation for roofers, HVAC, plumbers, electricians & more nationwide.",
  keywords: [
    'contractor SEO agency',
    'home service marketing agency',
    'home services marketing agency',
    'local SEO for contractors',
    'seo for contractors',
    'contractor seo services',
    'seo company for contractors',
    'home services seo',
    'seo for home services',
    'seo for construction companies',
    'digital marketing for home services',
    'electrician marketing agency',
    'electrician digital marketing',
    'electrician digital marketing agency',
    'marketing agency for roofers',
    'how to market a roofing company',
    'pressure washing marketing',
    'digital marketing for contractors',
    'local SEO agency Miami',
    'seo agency miami',
    'seo services miami',
    'seo in miami',
    'contractor marketing agency',
    'local SEO for home services',
    'Google Ads for contractors',
    'home service marketing',
    'Google Ads for home services',
    'HVAC marketing agency',
    'hvac advertising agency',
    'plumber seo',
    'plumber seo agency',
    'plumbing seo agency',
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
    'web design for contractors',
    'website design for contractors',
    'contractor website design',
    'local seo for electricians',
    'local seo for hvac contractors',
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
    title: "JZ Smart Media | Contractor SEO Agency & Home Services Marketing — Miami, FL",
    description:
      "Miami's leading contractor SEO agency and home services marketing agency. Expert SEO for contractors, plumber SEO, HVAC marketing, electrician digital marketing, web design for contractors, Google Ads, Google Business Profile & CRM automation — built for roofers, plumbers, HVAC pros, electricians & more.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JZ Smart Media — Contractor SEO Agency & Home Services Marketing in Miami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "JZ Smart Media | Contractor SEO Agency & Home Services Marketing — Miami, FL",
    description:
      "Top contractor SEO agency in Miami: SEO for contractors, plumber SEO, HVAC marketing agency, electrician digital marketing, web design for contractors, Google Ads & CRM automation. Get more leads today.",
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
    "JZ Smart Media is a top-rated contractor SEO agency and home services marketing agency in Miami, FL. We specialize in SEO for contractors, home services SEO, plumber SEO, HVAC marketing agency services, electrician digital marketing, web design for contractors, Google Ads, Google Business Profile management, review management, and CRM automation.",
  telephone: '+135****6501',
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
    'SEO for Contractors',
    'Contractor SEO Services',
    'Home Services SEO',
    'SEO for Home Services',
    'SEO for Construction Companies',
    'Local SEO for Contractors',
    'Home Services Marketing Agency',
    'Digital Marketing for Home Services',
    'Google Ads for Contractors',
    'Google Business Profile Management',
    'Review Management',
    'CRM Automation',
    'Electrician Marketing Agency',
    'Electrician Digital Marketing',
    'Roofing Marketing Agency',
    'HVAC Marketing Agency',
    'HVAC Advertising Agency',
    'Plumber SEO',
    'Plumber SEO Agency',
    'Plumbing SEO Agency',
    'Plumber Marketing',
    'Pressure Washing Marketing',
    'Home Service Lead Generation',
    'Web Design for Contractors',
    'Website Design for Contractors',
    'Local SEO for HVAC Contractors',
    'Local SEO for Electricians',
    'SEO Agency Miami',
    'SEO Services Miami',
  ],
  knowsAbout: [
    'Local SEO',
    'Google Ads',
    'Google Business Profile Optimization',
    'Home Services SEO',
    'SEO for Contractors',
    'Contractor SEO Services',
    'SEO for Construction Companies',
    'Contractor Marketing',
    'Review Management',
    'CRM Automation',
    'Local Service Ads',
    'Yelp Advertising',
    'Digital Marketing for Contractors',
    'Electrician Digital Marketing',
    'Electrician Marketing Agency',
    'Roofing Marketing',
    'HVAC Marketing Agency',
    'Plumber SEO',
    'Plumbing SEO Agency',
    'Pressure Washing Marketing',
    'Web Design for Contractors',
    'Website Design for Contractors',
    'Local SEO for HVAC Contractors',
    'Local SEO for Electricians',
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
    name: 'Contractor SEO & Home Services Digital Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO for Contractors & Home Services SEO — Local SEO & Google Business Profile Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumber SEO Agency & Plumbing SEO Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC Marketing Agency & HVAC Advertising Agency Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrician Digital Marketing Agency & Electrician Marketing Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design for Contractors & Contractor Website Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads for Home Service Contractors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management for Home Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Marketing Automation for Home Service Businesses' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roofing Marketing Agency — How to Market a Roofing Company' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions & Business Intelligence for Home Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Service Lead Generation & Pressure Washing Marketing' } },
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
