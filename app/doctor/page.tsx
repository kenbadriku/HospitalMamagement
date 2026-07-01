import AdminPageShell from '../components/admin-page-shell';
import DoctorModule from '../components/doctor-module';

export const dynamic = 'force-dynamic';

export default async function DoctorPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const search = typeof params?.search === 'string' ? params.search : Array.isArray(params?.search) ? params.search[0] : '';

  return (
    <AdminPageShell
      title="Doctor Portal"
      description="A doctor-first workspace with live access to appointments, patients, admissions, laboratory workflow, and care coordination."
    >
      <DoctorModule search={search} />
    </AdminPageShell>
  );
}
