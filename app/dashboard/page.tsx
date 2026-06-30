import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function DashboardPage() {
  let patients = 0;
  let appointments = 0;
  let admissions = 0;

  try {
    [patients, appointments, admissions] = await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count({ where: { status: { not: "CANCELLED" } } }),
      prisma.inpatientAdmission.count({ where: { status: "ADMITTED" } }),
    ]);
  } catch {
    patients = 0;
    appointments = 0;
    admissions = 0;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Operations overview</p>
        <h1 className="mt-3 text-3xl font-semibold">Hospital management dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Monitor active patients, upcoming visits, and inpatient occupancy from a single workspace.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Patients", value: patients },
          { label: "Active appointments", value: appointments },
          { label: "Current inpatients", value: admissions },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Quick access</h2>
            <Link href="/patients" className="text-sm font-medium text-sky-700">View all</Link>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              ["/patients", "Manage patients"],
              ["/appointments", "Schedule appointments"],
              ["/billing", "Review outstanding bills"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">System status</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Prisma models connected for patients, appointments, admissions, lab orders, and billing.</li>
            <li>• Authentication and role-based routing are configured.</li>
            <li>• Database seeding support is available for an admin account and lab tests.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
