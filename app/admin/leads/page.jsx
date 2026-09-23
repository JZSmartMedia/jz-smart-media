import { redirect } from 'next/navigation';

// Leads now live in the unified dashboard. Kept so old bookmarks still land
// in the right place.
export default function LeadsRedirect() {
  redirect('/admin?tab=leads');
}
