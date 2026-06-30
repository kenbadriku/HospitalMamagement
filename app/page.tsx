import Link from "next/link";

const modules = [
  { href: "/dashboard", title: "Dashboard", description: "KPI overview and operational health." },
  { href: "/patients", title: "Patients", description: "Register and manage outpatient records." },
  { href: "/doctors", title: "Doctors", description: "Track staff, specialization, and consultation fees." },
  { href: "/appointments", title: "Appointments", description: "Book and manage clinic schedules." },
  { href: "/inpatients", title: "Inpatients", description: "Coordinate admissions, wards, and discharge." },
  { href: "/lab", title: "Laboratory", description: "Process lab orders and enter results." },
  { href: "/billing", title: "Billing", description: "Review invoices, payments, and receipts." },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-10 text-white shadow-xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Zionova HealthSphere</p>
        <h1 className="max-w-3xl text-4xl font-semibold sm:text-5xl">
          A hospital management workspace for patient records, appointments, lab flow, and billing.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          The starter app now includes a role-aware structure for administrators, clinicians, receptionists, and lab staff, with Prisma-backed models ready for your database.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/auth/login" className="rounded-full bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400">
            Sign in
          </Link>
          <Link href="/dashboard" className="rounded-full border border-white/20 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/10">
            Open dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.href} href={module.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-900">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
