import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Agency - Transform Your Digital Presence',
  description: 'Award-winning digital agency specializing in web development, UI/UX design, and digital marketing. We create extraordinary digital experiences that drive results.',
  keywords: 'digital agency, web development, UI/UX design, digital marketing, brand strategy, Next.js, React',
  authors: [{ name: 'Agency' }],
  creator: 'Agency',
  publisher: 'Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agency.com',
    title: 'Agency - Transform Your Digital Presence',
    description: 'Award-winning digital agency specializing in web development, UI/UX design, and digital marketing.',
    siteName: 'Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency - Transform Your Digital Presence',
    description: 'Award-winning digital agency specializing in web development, UI/UX design, and digital marketing.',
    images: ['/og-image.jpg'],
    creator: '@agency',
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
  manifest: '/manifest.json',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
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