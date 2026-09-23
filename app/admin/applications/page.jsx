import { redirect } from 'next/navigation';

// Applications now live in the unified dashboard. Kept so old bookmarks still
// land in the right place.
export default function ApplicationsRedirect() {
  redirect('/admin?tab=applications');
}
