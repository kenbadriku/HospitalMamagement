import { prisma } from "../../lib/prisma";

export default async function AppointmentsPage() {
  let appointments: Array<{ id: string; date: Date; time: string; status: string; reason: string | null }> = [];

  try {
    appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
      take: 20,
    });
  } catch {
    appointments = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Clinic schedule</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Appointments</h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-900">{new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-sm text-slate-600">{appointment.time} • {appointment.reason ?? "No reason provided"}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{appointment.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
