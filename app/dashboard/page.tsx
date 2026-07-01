import AdminPageShell from '../components/admin-page-shell';
import DashboardModule from '../components/dashboard-module';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <AdminPageShell title="Dashboard" description="A high-level view of patient flow, clinician capacity, and operational activity.">
      <DashboardModule />
    </AdminPageShell>
  );
}
