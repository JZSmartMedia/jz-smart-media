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
    default: 'JZ Smart Media | Contractor SEO & Home Services Marketing Agency — Miami, FL',
    template: '%s | JZ Smart Media',
  },
  description:
    'JZ Smart Media — Miami\'s #1 contractor SEO & home services marketing agency. Expert roofing SEO, roofer SEO, HVAC SEO agency, plumber SEO, electrician marketing, garage door & locksmith SEO, web design for contractors, Google Ads & AI automation. Get more leads today.',
  keywords: [
    // Core contractor SEO
    'contractor SEO agency',
    'contractor SEO services',
    'seo company for contractors',
    'local SEO for contractors',
    'seo for contractors',
    'general contractor marketing agency',
    'contractor marketing agency',
    'contractor lead generation agency',
    'marketing agency for contractors',
    'digital marketing for contractors',
    'contractor reputation management',
    // Home services marketing
    'home services marketing agency',
    'home service marketing agency',
    'home services seo',
    'seo for home services',
    'home service company marketing',
    'local SEO for home services',
    'digital marketing for home services',
    'home service lead generation',
    'home service business growth',
    // Trade-specific verticals
    'roofing SEO agency',
    'roofer SEO',
    'roofing marketing agency',
    'marketing agency for roofers',
    'how to market a roofing company',
    'plumber seo',
    'plumber seo agency',
    'plumbing seo agency',
    'plumber marketing',
    'HVAC SEO agency',
    'HVAC marketing agency',
    'hvac advertising agency',
    'local seo for hvac contractors',
    'electrician marketing agency',
    'electrician digital marketing',
    'electrician digital marketing agency',
    'local seo for electricians',
    'garage door marketing agency',
    'locksmith SEO agency',
    'chimney sweep marketing',
    'water damage restoration marketing',
    'home remodeling marketing agency',
    'painting contractor marketing',
    'painter marketing agency',
    'landscaping marketing agency',
    'landscaping SEO',
    'pool service marketing agency',
    'pest control marketing agency',
    'pressure washing marketing',
    'concrete contractor marketing',
    // Construction & specialty
    'seo for construction companies',
    'construction SEO',
    'foundation repair marketing',
    // Services
    'Google Ads for contractors',
    'Google Ads for home services',
    'Google Business Profile management',
    'local service ads management',
    'Yelp ads management',
    'review management for contractors',
    'CRM automation for home services',
    'marketing automation for home services',
    'AI marketing for contractors',
    'web design for contractors',
    'website design for contractors',
    'contractor website design',
    // Miami / local
    'local SEO agency Miami',
    'seo agency miami',
    'seo services miami',
    'seo in miami',
    'Miami digital marketing agency',
    'contractor marketing Miami',
    'home service contractor marketing Florida',
    // Broader
    'home service marketing',
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
    title: 'JZ Smart Media | Contractor SEO & Home Services Marketing Agency — Miami, FL',
    description:
      "Miami's leading contractor SEO & home services marketing agency. Roofer SEO, HVAC SEO agency, plumber SEO, electrician marketing, garage door & locksmith SEO, web design for contractors, Google Ads, GBP management & AI automation — built for contractors nationwide.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JZ Smart Media — Contractor SEO & Home Services Marketing Agency in Miami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JZ Smart Media | Contractor SEO & Home Services Marketing Agency — Miami, FL',
    description:
      'Top contractor SEO agency in Miami: roofer SEO, HVAC SEO agency, plumber SEO, electrician marketing, garage door & locksmith SEO, Google Ads, AI automation. Get more leads — call now.',
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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': ['MarketingAgency', 'ProfessionalService', 'LocalBusiness'],
    name: 'JZ Smart Media',
    url: 'https://jzsmartmedia.com',
    logo: 'https://jzsmartmedia.com/favicon.ico',
    image: 'https://jzsmartmedia.com/og-image.jpg',
    foundingDate: '2023',
    description:
      'JZ Smart Media is a top-rated contractor SEO agency and home services marketing agency in Miami, FL. We specialize in roofing SEO, roofer SEO, HVAC SEO agency services, plumber SEO, electrician digital marketing, garage door marketing, locksmith SEO, chimney sweep marketing, water damage restoration marketing, home remodeling marketing, painting contractor marketing, landscaping SEO, pool service marketing, pest control marketing, Google Ads, Google Business Profile management, review management, AI marketing automation, and web design for contractors.',
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
      'General Contractor Marketing Agency',
      'Contractor Lead Generation Agency',
      'Home Services SEO',
      'SEO for Home Services',
      'Home Services Marketing Agency',
      'Home Service Company Marketing',
      'Digital Marketing for Home Services',
      'SEO for Construction Companies',
      'Local SEO for Contractors',
      'Roofing SEO Agency',
      'Roofer SEO',
      'Roofing Marketing Agency',
      'Plumber SEO',
      'Plumber SEO Agency',
      'Plumbing SEO Agency',
      'Plumber Marketing',
      'HVAC SEO Agency',
      'HVAC Marketing Agency',
      'HVAC Advertising Agency',
      'Local SEO for HVAC Contractors',
      'Electrician Marketing Agency',
      'Electrician Digital Marketing',
      'Garage Door Marketing Agency',
      'Locksmith SEO Agency',
      'Chimney Sweep Marketing',
      'Water Damage Restoration Marketing',
      'Home Remodeling Marketing Agency',
      'Painting Contractor Marketing',
      'Landscaping Marketing Agency',
      'Landscaping SEO',
      'Pool Service Marketing Agency',
      'Pest Control Marketing Agency',
      'Pressure Washing Marketing',
      'Concrete Contractor Marketing',
      'Google Ads for Contractors',
      'Google Business Profile Management',
      'Local Service Ads Management',
      'Review Management',
      'CRM Automation',
      'Marketing Automation for Home Services',
      'AI Marketing for Contractors',
      'Contractor Reputation Management',
      'Web Design for Contractors',
      'Website Design for Contractors',
      'SEO Agency Miami',
      'SEO Services Miami',
      'Home Service Lead Generation',
    ],
    knowsAbout: [
      'Local SEO',
      'Google Ads',
      'Google Business Profile Optimization',
      'Home Services SEO',
      'SEO for Contractors',
      'Contractor SEO Services',
      'General Contractor Marketing',
      'Contractor Lead Generation',
      'SEO for Construction Companies',
      'Contractor Marketing',
      'Contractor Reputation Management',
      'Review Management',
      'CRM Automation',
      'Marketing Automation for Home Services',
      'AI Marketing for Contractors',
      'Local Service Ads',
      'Yelp Advertising',
      'Digital Marketing for Contractors',
      'Roofing SEO Agency',
      'Roofer SEO',
      'Roofing Marketing',
      'HVAC SEO Agency',
      'HVAC Marketing Agency',
      'Electrician Digital Marketing',
      'Electrician Marketing Agency',
      'Plumber SEO',
      'Plumbing SEO Agency',
      'Garage Door Marketing Agency',
      'Locksmith SEO Agency',
      'Chimney Sweep Marketing',
      'Water Damage Restoration Marketing',
      'Home Remodeling Marketing',
      'Painting Contractor Marketing',
      'Landscaping Marketing Agency',
      'Landscaping SEO',
      'Pool Service Marketing',
      'Pest Control Marketing',
      'Pressure Washing Marketing',
      'Concrete Contractor Marketing',
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
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contractor SEO Agency & Home Services SEO — Local SEO & Google Business Profile Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roofing SEO Agency & Roofer SEO — Roofing Marketing Agency Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumber SEO Agency & Plumbing SEO Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC SEO Agency & HVAC Marketing Agency Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrician Digital Marketing Agency & Electrician Marketing Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Garage Door Marketing Agency & Locksmith SEO Agency Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chimney Sweep Marketing & Water Damage Restoration Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Remodeling Marketing Agency & General Contractor Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Painting Contractor Marketing, Landscaping Marketing Agency & Pool Service Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design for Contractors & Contractor Website Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads for Home Service Contractors' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management for Home Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM, AI Marketing Automation & Contractor Lead Generation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contractor Reputation Management & Contractor Lead Generation Agency' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Service Lead Generation, Pressure Washing Marketing & Pest Control Marketing' } },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a contractor SEO agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A contractor SEO agency specializes in search engine optimization for home service and trade contractors — including roofers, plumbers, HVAC companies, electricians, and general contractors. JZ Smart Media is a top-rated contractor SEO agency in Miami, FL, helping contractors rank higher on Google and generate more leads through local SEO, Google Ads, and Google Business Profile management.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer roofer SEO and roofing marketing agency services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media is a specialized roofing SEO agency and roofing marketing agency. We help roofing companies dominate local search results, manage their Google Business Profile, run Google Ads, and generate consistent roofing leads through proven roofer SEO strategies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What home service verticals does JZ Smart Media serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JZ Smart Media provides SEO and digital marketing for a wide range of home service verticals including: roofing, plumbing, HVAC, electrical, garage door, locksmith, chimney sweep, water damage restoration, home remodeling, painting contractors, landscaping, pool service, pest control, pressure washing, and concrete contractors — as well as general contractors and construction companies nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer HVAC SEO agency and HVAC marketing services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. As a dedicated HVAC SEO agency, JZ Smart Media offers comprehensive HVAC marketing agency services including local SEO for HVAC contractors, Google Ads for HVAC companies, Google Business Profile optimization, HVAC advertising agency campaigns, and review management to help HVAC businesses get more service calls and installations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can JZ Smart Media help with AI marketing and automation for home services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media offers AI marketing for contractors including CRM automation, marketing automation for home services, automated follow-up sequences, reputation management, and AI-powered business intelligence — helping home service companies grow faster with less manual effort.',
        },
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
