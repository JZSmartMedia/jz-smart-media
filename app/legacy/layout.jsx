/**
 * The previous homepage, kept for reference only.
 *
 * Static (no database access, no API calls on render), and excluded from search
 * and the sitemap so it neither competes with the live homepage nor costs
 * anything beyond one prerendered file.
 */
export const metadata = {
  title: 'Previous site version',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
};

export default function LegacyLayout({ children }) {
  return children;
}
