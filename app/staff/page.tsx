import AdminPageShell from '../components/admin-page-shell';
import StaffModule from '../components/staff-module';

export const dynamic = 'force-dynamic';

export default function StaffPage() {
  return (
    <AdminPageShell title="Staff" description="Manage care team members, departments, and staffing status.">
      <StaffModule />
    </AdminPageShell>
  );
}
