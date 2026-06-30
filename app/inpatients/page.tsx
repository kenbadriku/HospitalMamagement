import { prisma } from "../../lib/prisma";

export default async function InpatientsPage() {
  let admissions: Array<{ id: string; ward: string; bedNumber: string; status: string; diagnosis: string | null }> = [];

  try {
    admissions = await prisma.inpatientAdmission.findMany({
      orderBy: { admissionDate: "desc" },
      take: 20,
    });
  } catch {
    admissions = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Inpatient flow</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Admissions</h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {admissions.map((admission) => (
            <li key={admission.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-900">Ward {admission.ward} • Bed {admission.bedNumber}</p>
                <p className="text-sm text-slate-600">{admission.diagnosis ?? "No diagnosis recorded"}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{admission.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
