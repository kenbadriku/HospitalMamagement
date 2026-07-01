import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function StaffModule() {
  const [staff, activeStaff, departments, pendingAppointments] = await Promise.all([
    prisma.staff.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    prisma.staff.count({ where: { status: 'Active' } }),
    prisma.staff.groupBy({ by: ['department'], _count: { department: true } }),
    prisma.appointment.count({ where: { status: 'SCHEDULED' } }),
  ]);

  const overviewStats = [
    { label: 'Active staff', value: activeStaff, accent: 'bg-blue-500/10 text-blue-700' },
    { label: 'Departments', value: departments.length, accent: 'bg-amber-500/10 text-amber-700' },
    { label: 'Pending appointments', value: pendingAppointments, accent: 'bg-emerald-500/10 text-emerald-700' },
    { label: 'Staff records', value: staff.length, accent: 'bg-violet-500/10 text-violet-700' },
  ];

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${stat.accent}`}>{stat.label}</div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Operations</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Staff coordination</h2>
            </div>
            <Link href="/staff" className="text-sm font-medium text-blue-600">Manage staff</Link>
          </div>
          <div className="mt-5 space-y-3">
            {departments.map((department) => (
              <div key={department.department} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="font-medium text-slate-700">{department.department}</span>
                <span className="text-sm text-slate-500">{department._count.department} staff</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Team overview</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Recent staff records</h2>
          <div className="mt-5 space-y-3">
            {staff.map((member) => (
              <div key={member.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{member.firstName} {member.lastName}</p>
                <p className="mt-1 text-sm text-slate-600">{member.department} • {member.role}</p>
                <p className="mt-1 text-sm text-slate-500">Status: {member.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
