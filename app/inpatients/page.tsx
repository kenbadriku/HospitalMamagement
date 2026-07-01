import AdminPageShell from '../components/admin-page-shell';

export default function InpatientsPage() {
  return (
    <AdminPageShell title="Inpatients" description="Monitor admitted patients, wards, and discharge flow.">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Admission tracking and room occupancy are ready for the next phase of enhancements.</p>
      </div>
    </AdminPageShell>
  );
}
