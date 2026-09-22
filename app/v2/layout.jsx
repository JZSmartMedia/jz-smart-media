import { DM_Serif_Display, Manrope } from 'next/font/google';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'V2 Preview — Growth Systems for Home Service Companies',
  description:
    'Google Ads, Local Services Ads, local SEO, CRM and conversion tracking for home service companies. Get a free growth audit from JZ Smart Media.',
  // Staging route. Kept out of the index so it cannot compete with the live
  // homepage for duplicate content while it is being reviewed.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: null,
};

export default function V2Layout({ children }) {
  return <div className={`${dmSerif.variable} ${manrope.variable}`}>{children}</div>;
}
