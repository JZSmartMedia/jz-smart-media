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
    default: 'Contractor SEO Agency & Home Services Marketing | JZ Smart Media — Miami, FL',
    template: '%s | JZ Smart Media — Contractor SEO & Home Services Marketing',
  },
  description:
    'JZ Smart Media — #1 contractor SEO agency & home services marketing agency in Miami, FL. Expert roofing SEO, HVAC SEO agency, plumber SEO, electrician marketing, solar panel marketing, kitchen & bathroom remodeling SEO, Google Business Profile management, Google Ads & AI automation. Get more contractor leads today — free strategy call.',
  keywords: [
    'contractor SEO agency',
    'contractor SEO services',
    'contractor SEO expert',
    'best SEO company for contractors',
    'seo company for contractors',
    'local SEO for contractors',
    'seo for contractors',
    'general contractor marketing agency',
    'contractor marketing agency',
    'contractor digital marketing agency',
    'contractor lead generation agency',
    'marketing agency for contractors',
    'digital marketing for contractors',
    'contractor reputation management',
    'home services marketing agency',
    'home service marketing agency',
    'home services seo',
    'seo for home services',
    'home service company marketing',
    'home improvement marketing agency',
    'local SEO for home services',
    'digital marketing for home services',
    'home service lead generation',
    'home service business growth',
    'roofing SEO agency',
    'roofer SEO',
    'roofing marketing agency',
    'roofing lead generation',
    'marketing agency for roofers',
    'how to market a roofing company',
    'plumber seo',
    'plumber seo agency',
    'plumbing seo agency',
    'plumber marketing',
    'plumber lead generation',
    'seo for plumbers',
    'HVAC SEO agency',
    'HVAC marketing agency',
    'hvac advertising agency',
    'hvac lead generation',
    'local seo for hvac contractors',
    'electrician marketing agency',
    'electrician digital marketing',
    'electrician digital marketing agency',
    'local seo for electricians',
    'garage door marketing agency',
    'locksmith SEO agency',
    'chimney sweep marketing',
    'water damage restoration marketing',
    'mold remediation marketing agency',
    'home remodeling marketing agency',
    'painting contractor marketing',
    'painter marketing agency',
    'landscaping marketing agency',
    'landscaping SEO',
    'tree service marketing agency',
    'pool service marketing agency',
    'pest control marketing agency',
    'cleaning company marketing agency',
    'pressure washing marketing',
    'concrete contractor marketing',
    'solar panel marketing agency',
    'solar SEO agency',
    'solar company marketing',
    'fence contractor marketing',
    'fencing company SEO',
    'flooring contractor marketing',
    'flooring SEO agency',
    'kitchen remodeling marketing agency',
    'kitchen remodeling SEO',
    'bathroom remodeling marketing agency',
    'bathroom remodeling SEO',
    'siding contractor marketing',
    'siding company SEO',
    'insulation contractor marketing',
    'drywall contractor marketing',
    'window and door company marketing',
    'handyman marketing agency',
    'junk removal marketing agency',
    'moving company marketing agency',
    'moving company SEO agency',
    'seo for construction companies',
    'construction SEO',
    'foundation repair marketing',
    'Google Ads for contractors',
    'Google Ads for home services',
    'Google Business Profile management',
    'google business profile for contractors',
    'GBP management for contractors',
    'local service ads management',
    'Yelp ads management',
    'review management for contractors',
    'CRM automation for home services',
    'marketing automation for home services',
    'AI marketing for contractors',
    'web design for contractors',
    'website design for contractors',
    'contractor website design',
    'local SEO agency Miami',
    'seo agency miami',
    'seo services miami',
    'miami seo company',
    'seo in miami',
    'Miami digital marketing agency',
    'contractor marketing Miami',
    'home service contractor marketing Florida',
    'SEO agency Fort Lauderdale',
    'marketing agency South Florida',
    'contractor SEO agency Florida',
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
    title: 'Contractor SEO Agency & Home Services Marketing | JZ Smart Media — Miami, FL',
    description:
      "Miami's #1 contractor SEO & home services marketing agency. Roofing SEO, HVAC SEO agency, plumber SEO, electrician marketing, solar panel marketing, kitchen & bathroom remodeling SEO, Google Business Profile management, Google Ads & AI automation — built for contractors nationwide. Free strategy call.",
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
    title: 'Contractor SEO Agency & Home Services Marketing | JZ Smart Media — Miami, FL',
    description:
      '#1 contractor SEO agency in Miami: roofing SEO, HVAC SEO agency, plumber SEO, electrician marketing, solar panel marketing, kitchen & bathroom remodeling SEO, Google Ads, GBP management & AI automation. Get more leads — free call.',
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
  verification: {
    google: 'NdjD6hL8uql33znuC3Z8qZZfgXMKqECTpH7qe4kluaw',
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
    '@type': 'WebSite',
    name: 'JZ Smart Media',
    url: 'https://jzsmartmedia.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://jzsmartmedia.com/?s={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    additionalType: 'https://schema.org/MarketingAgency',
    name: 'JZ Smart Media',
    url: 'https://jzsmartmedia.com',
    logo: 'https://jzsmartmedia.com/favicon.ico',
    image: 'https://jzsmartmedia.com/og-image.jpg',
    foundingDate: '2023',
    description:
      'JZ Smart Media is a top-rated contractor SEO agency and home services marketing agency in Miami, FL. We specialize in roofing SEO, HVAC SEO agency services, plumber SEO, plumber lead generation, electrician digital marketing, solar panel marketing, kitchen remodeling SEO, bathroom remodeling SEO, fence contractor marketing, flooring SEO, siding contractor marketing, garage door marketing, locksmith SEO, chimney sweep marketing, water damage restoration marketing, mold remediation marketing, home remodeling marketing, painting contractor marketing, landscaping SEO, tree service marketing, pool service marketing, pest control marketing, cleaning company marketing, pressure washing marketing, moving company SEO, Google Ads, Google Business Profile management, GBP management for contractors, review management, AI marketing automation, and web design for contractors.',
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
      { '@type': 'City', name: 'Miami', sameAs: 'https://en.wikipedia.org/wiki/Miami' },
      { '@type': 'City', name: 'Fort Lauderdale', sameAs: 'https://en.wikipedia.org/wiki/Fort_Lauderdale,_Florida' },
      { '@type': 'City', name: 'Boca Raton', sameAs: 'https://en.wikipedia.org/wiki/Boca_Raton,_Florida' },
      { '@type': 'City', name: 'Hialeah', sameAs: 'https://en.wikipedia.org/wiki/Hialeah,_Florida' },
      { '@type': 'City', name: 'Coral Gables', sameAs: 'https://en.wikipedia.org/wiki/Coral_Gables,_Florida' },
      { '@type': 'City', name: 'Hollywood', sameAs: 'https://en.wikipedia.org/wiki/Hollywood,_Florida' },
      { '@type': 'City', name: 'West Palm Beach', sameAs: 'https://en.wikipedia.org/wiki/West_Palm_Beach,_Florida' },
      { '@type': 'City', name: 'Pompano Beach', sameAs: 'https://en.wikipedia.org/wiki/Pompano_Beach,_Florida' },
      { '@type': 'City', name: 'Aventura', sameAs: 'https://en.wikipedia.org/wiki/Aventura,_Florida' },
      { '@type': 'City', name: 'Doral', sameAs: 'https://en.wikipedia.org/wiki/Doral,_Florida' },
      { '@type': 'State', name: 'Florida', sameAs: 'https://en.wikipedia.org/wiki/Florida' },
      { '@type': 'Country', name: 'United States', sameAs: 'https://en.wikipedia.org/wiki/United_States' },
    ],
    serviceType: [
      'Contractor SEO Agency', 'Contractor SEO Expert', 'Best SEO Company for Contractors',
      'SEO for Contractors', 'Contractor SEO Services', 'General Contractor Marketing Agency',
      'Contractor Digital Marketing Agency', 'Contractor Lead Generation Agency',
      'Home Services SEO', 'SEO for Home Services', 'Home Services Marketing Agency',
      'Home Service Company Marketing', 'Home Improvement Marketing Agency',
      'Digital Marketing for Home Services', 'SEO for Construction Companies',
      'Local SEO for Contractors', 'Roofing SEO Agency', 'Roofer SEO',
      'Roofing Marketing Agency', 'Roofing Lead Generation',
      'Plumber SEO', 'Plumber SEO Agency', 'Plumbing SEO Agency', 'Plumber Marketing',
      'Plumber Lead Generation', 'SEO for Plumbers',
      'HVAC SEO Agency', 'HVAC Marketing Agency', 'HVAC Advertising Agency', 'HVAC Lead Generation',
      'Local SEO for HVAC Contractors', 'Electrician Marketing Agency', 'Electrician Digital Marketing',
      'Garage Door Marketing Agency', 'Locksmith SEO Agency', 'Chimney Sweep Marketing',
      'Water Damage Restoration Marketing', 'Mold Remediation Marketing Agency',
      'Home Remodeling Marketing Agency', 'Painting Contractor Marketing',
      'Landscaping Marketing Agency', 'Landscaping SEO', 'Tree Service Marketing Agency',
      'Pool Service Marketing Agency', 'Pest Control Marketing Agency',
      'Cleaning Company Marketing Agency', 'Pressure Washing Marketing',
      'Concrete Contractor Marketing', 'Solar Panel Marketing Agency', 'Solar SEO Agency',
      'Fence Contractor Marketing', 'Flooring Contractor Marketing',
      'Kitchen Remodeling Marketing Agency', 'Bathroom Remodeling Marketing Agency',
      'Siding Contractor Marketing', 'Insulation Contractor Marketing',
      'Drywall Contractor Marketing', 'Window and Door Company Marketing',
      'Handyman Marketing Agency', 'Moving Company Marketing Agency', 'Moving Company SEO Agency',
      'Google Ads for Contractors', 'Google Business Profile Management',
      'GBP Management for Contractors', 'Google Business Profile for Contractors',
      'Local Service Ads Management', 'Review Management', 'CRM Automation',
      'Marketing Automation for Home Services', 'AI Marketing for Contractors',
      'Contractor Reputation Management', 'Web Design for Contractors',
      'Website Design for Contractors', 'SEO Agency Miami', 'Miami SEO Company',
      'SEO Services Miami', 'SEO Agency Fort Lauderdale', 'Marketing Agency South Florida',
      'Home Service Lead Generation',
    ],
    knowsAbout: [
      'Local SEO', 'Google Ads', 'Google Business Profile Optimization',
      'GBP Management for Contractors', 'Home Services SEO', 'SEO for Contractors',
      'Contractor SEO Services', 'General Contractor Marketing', 'Contractor Lead Generation',
      'SEO for Construction Companies', 'Contractor Marketing', 'Contractor Reputation Management',
      'Review Management', 'CRM Automation', 'Marketing Automation for Home Services',
      'AI Marketing for Contractors', 'Local Service Ads', 'Yelp Advertising',
      'Digital Marketing for Contractors', 'Roofing SEO Agency', 'Roofer SEO',
      'Roofing Marketing', 'Roofing Lead Generation', 'HVAC SEO Agency', 'HVAC Marketing Agency',
      'HVAC Lead Generation', 'Electrician Digital Marketing', 'Electrician Marketing Agency',
      'Plumber SEO', 'Plumbing SEO Agency', 'Plumber Lead Generation', 'SEO for Plumbers',
      'Garage Door Marketing Agency', 'Locksmith SEO Agency', 'Chimney Sweep Marketing',
      'Water Damage Restoration Marketing', 'Mold Remediation Marketing',
      'Home Remodeling Marketing', 'Painting Contractor Marketing', 'Landscaping Marketing Agency',
      'Landscaping SEO', 'Tree Service Marketing', 'Pool Service Marketing',
      'Pest Control Marketing', 'Cleaning Company Marketing', 'Pressure Washing Marketing',
      'Concrete Contractor Marketing', 'Solar Panel Marketing', 'Solar SEO',
      'Fence Contractor Marketing', 'Flooring Contractor Marketing',
      'Kitchen Remodeling SEO', 'Bathroom Remodeling SEO', 'Siding Contractor Marketing',
      'Insulation Contractor Marketing', 'Web Design for Contractors',
      'Website Design for Contractors', 'Moving Company Marketing',
      'Local SEO for HVAC Contractors', 'Local SEO for Electricians', 'Home Improvement Marketing',
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
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roofing SEO Agency & Roofer SEO — Roofing Marketing Agency & Roofing Lead Generation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumber SEO Agency & Plumbing SEO Services — Plumber Lead Generation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC SEO Agency & HVAC Marketing Agency — HVAC Lead Generation Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrician Digital Marketing Agency & Electrician Marketing Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Garage Door Marketing Agency & Locksmith SEO Agency Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chimney Sweep Marketing, Water Damage Restoration Marketing & Mold Remediation Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Remodeling Marketing Agency & General Contractor Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Remodeling Marketing Agency & Bathroom Remodeling Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solar Panel Marketing Agency & Solar SEO Agency Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fence Contractor Marketing & Flooring Contractor Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Siding Contractor Marketing & Insulation Contractor Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Painting Contractor Marketing, Landscaping Marketing, Tree Service Marketing & Pool Service Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cleaning Company Marketing, Pest Control Marketing & Pressure Washing Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Moving Company Marketing Agency & Moving Company SEO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design for Contractors & Contractor Website Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads & Local Service Ads for Home Service Contractors' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Business Profile Management & GBP Optimization for Contractors' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yelp Ads & Review Management for Home Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM, AI Marketing Automation & Contractor Lead Generation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contractor Reputation Management & Contractor Lead Generation Agency' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Service Lead Generation, Foundation Repair Marketing & Concrete Contractor Marketing' } },
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
          text: 'Yes. JZ Smart Media is a specialized roofing SEO agency and roofing marketing agency based in Miami, FL. We help roofing companies dominate local search results, manage their Google Business Profile, run Google Ads, and generate consistent roofing leads through proven roofer SEO strategies nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'What home service verticals does JZ Smart Media serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JZ Smart Media provides SEO and digital marketing for a wide range of home service verticals including: roofing, plumbing, HVAC, electrical, garage door, locksmith, chimney sweep, water damage restoration, mold remediation, home remodeling, painting contractors, landscaping, tree service, pool service, pest control, cleaning companies, pressure washing, concrete contractors, solar panel installation, fence contractors, flooring contractors, kitchen remodeling, bathroom remodeling, siding, insulation, drywall, moving companies, and general contractors and construction companies nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer HVAC SEO agency and HVAC marketing services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. As a dedicated HVAC SEO agency, JZ Smart Media offers comprehensive HVAC marketing agency services including local SEO for HVAC contractors, Google Ads for HVAC companies, Google Business Profile optimization, HVAC advertising agency campaigns, HVAC lead generation, and review management to help HVAC businesses get more service calls and installations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer solar panel marketing and solar SEO services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media offers solar panel marketing agency services including solar SEO, Google Ads for solar companies, Google Business Profile management, and lead generation for solar installers. Our solar marketing strategies help solar companies rank higher locally and generate more residential and commercial installation leads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media serve contractors in Miami and South Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media is headquartered in Miami, FL and serves contractors throughout South Florida including Miami, Fort Lauderdale, Boca Raton, Hialeah, Coral Gables, Hollywood, West Palm Beach, Pompano Beach, Aventura, and Doral. We also serve contractors nationwide across all 50 states. Our local SEO expertise in the Miami and South Florida market gives local contractors a distinct competitive advantage.',
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
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer kitchen remodeling and bathroom remodeling marketing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media provides specialized kitchen remodeling marketing agency services and bathroom remodeling marketing to help remodeling contractors rank on Google, generate qualified leads, and grow their pipeline. We use local SEO, Google Ads, and Google Business Profile optimization tailored for remodeling companies in Miami, Florida, and nationwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer Google Business Profile management for contractors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media provides full Google Business Profile (GBP) management for contractors including profile optimization, photo management, review response, Q&A management, Google Posts, and ongoing GBP audits. Our GBP management for contractors helps home service businesses rank higher in Google Maps and the local 3-pack to get more calls and leads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer plumber SEO and plumber lead generation services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media is a specialized plumber SEO agency offering comprehensive SEO for plumbers, Google Ads for plumbing companies, Google Business Profile management, and plumber lead generation strategies. We help plumbing companies rank on page 1 for high-intent local searches and generate more service calls and emergency plumbing leads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does JZ Smart Media offer tree service marketing and cleaning company marketing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. JZ Smart Media provides tree service marketing agency services and cleaning company marketing to help tree removal, arborist, and cleaning businesses generate more local leads. Our services include local SEO, Google Ads, Google Business Profile optimization, and review management tailored for these competitive home service markets.',
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
