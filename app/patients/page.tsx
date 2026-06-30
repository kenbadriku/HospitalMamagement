import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function PatientsPage() {
  let patients: Array<{ id: string; patientNumber: string; firstName: string; lastName: string; phone: string; gender: string }> = [];

  try {
    patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  } catch {
    patients = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Patient records</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Outpatient management</h1>
        </div>
        <Link href="/patients/new" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          Register patient
        </Link>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Patient No.</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{patient.patientNumber}</td>
                <td className="px-4 py-3">{patient.firstName} {patient.lastName}</td>
                <td className="px-4 py-3">{patient.phone}</td>
                <td className="px-4 py-3">{patient.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
