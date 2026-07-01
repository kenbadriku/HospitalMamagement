import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

function formatDate(value: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(value);
}

export default async function DashboardModule() {
  const [patients, doctors, appointments, bills, pendingAppointments, completedAppointments, unpaidBills, staff, recentAppointments, byDepartment] = await Promise.all([
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.appointment.count(),
    prisma.bill.count(),
    prisma.appointment.count({ where: { status: 'SCHEDULED' } }),
    prisma.appointment.count({ where: { status: 'COMPLETED' } }),
    prisma.bill.count({ where: { status: 'UNPAID' } }),
    prisma.staff.count(),
    prisma.appointment.findMany({
      include: { patient: true, doctor: true },
      orderBy: { date: 'asc' },
      take: 6,
    }),
    prisma.appointment.groupBy({ by: ['department'], _count: { department: true } }),
  ]);

  const summaryCards = [
    { label: 'Total patients', value: patients, accent: 'bg-teal-500/10 text-teal-700' },
    { label: 'Total doctors', value: doctors, accent: 'bg-emerald-500/10 text-emerald-700' },
    { label: 'Appointments', value: appointments, accent: 'bg-sky-500/10 text-sky-700' },
    { label: 'Revenue entries', value: bills, accent: 'bg-amber-500/10 text-amber-700' },
  ];

  const secondaryCards = [
    { label: 'Pending', value: pendingAppointments, accent: 'bg-amber-500/10 text-amber-700' },
    { label: 'Completed', value: completedAppointments, accent: 'bg-emerald-500/10 text-emerald-700' },
    { label: 'Unpaid bills', value: unpaidBills, accent: 'bg-rose-500/10 text-rose-700' },
    { label: 'Total staff', value: staff, accent: 'bg-violet-500/10 text-violet-700' },
  ];

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${card.accent}`}>{card.label}</div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {secondaryCards.map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${card.accent}`}>{card.label}</div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Appointments by department</h2>
            <Link href="/appointments" className="text-sm font-medium text-teal-600">View schedule</Link>
          </div>
          <div className="mt-5 space-y-3">
            {byDepartment.length === 0 ? (
              <p className="text-sm text-slate-500">No appointment data yet.</p>
            ) : (
              byDepartment.map((group) => (
                <div key={group.department} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-700">{group.department}</span>
                  <span className="text-sm text-slate-500">{group._count.department} visits</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent appointments</h2>
          <div className="mt-5 space-y-3">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">{appointment.patient.firstName} {appointment.patient.lastName}</p>
                <p className="text-sm text-slate-500">{appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                <p className="mt-2 text-sm text-slate-600">{formatDate(appointment.date)} • {appointment.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
