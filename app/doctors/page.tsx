import { prisma } from "../../lib/prisma";

export default async function DoctorsPage() {
  let doctors: Array<{ id: string; firstName: string; lastName: string; specialization: string; consultationFee: number; registrationNumber: string }> = [];

  try {
    const rows = await prisma.doctor.findMany({
      orderBy: { specialization: "asc" },
      take: 20,
    });
    doctors = rows.map((doctor) => ({
      id: doctor.id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialization: doctor.specialization,
      consultationFee: Number(doctor.consultationFee),
      registrationNumber: doctor.registrationNumber,
    }));
  } catch {
    doctors = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Staff directory</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Doctors and specialists</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {doctors.map((doctor) => (
          <article key={doctor.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{doctor.firstName} {doctor.lastName}</h2>
            <p className="mt-2 text-sm text-slate-600">{doctor.specialization}</p>
            <p className="mt-3 text-sm text-slate-500">Registration: {doctor.registrationNumber}</p>
            <p className="mt-1 text-sm text-slate-500">Consultation fee: UGX {doctor.consultationFee}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
