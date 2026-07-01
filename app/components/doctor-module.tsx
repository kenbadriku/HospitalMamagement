import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

const quickActions = [
  { title: 'View schedule', description: 'Open today\'s clinic plan', href: '/appointments' },
  { title: 'Search patient', description: 'Find records by name or MRN', href: '/patients' },
  { title: 'New consultation', description: 'Start a fresh clinical note', href: '/patients' },
  { title: 'Lab review', description: 'Check pending results', href: '/lab' },
];

const modules = [
  { title: 'Appointments', description: 'Daily, weekly, and monthly scheduling with reminders and queue control.' },
  { title: 'Patient Records', description: 'EMR access with demographics, history, allergies, and visit tracking.' },
  { title: 'Consultations', description: 'SOAP notes, assessments, diagnosis support, and digital signatures.' },
  { title: 'Prescriptions', description: 'Medication search, dosage guidance, refill tracking, and alerts.' },
  { title: 'Laboratory', description: 'Send investigations and review critical values and trends.' },
  { title: 'Radiology', description: 'Request imaging studies and review reports with comparison tools.' },
  { title: 'Admissions', description: 'Ward allocation, daily rounds, transfers, and discharge planning.' },
  { title: 'Telemedicine', description: 'Video and secure messaging tools for virtual care.' },
];

export default async function DoctorModule({ search }: { search?: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [doctor, todayAppointments, waitingPatients, admittedPatients, emergencyAlerts, pendingLabOrders, pendingRadiology, patients, recentAppointments] = await Promise.all([
    prisma.doctor.findFirst({ where: { status: 'Active' }, orderBy: { createdAt: 'asc' } }),
    prisma.appointment.findMany({
      where: { date: { gte: today, lt: tomorrow } },
      include: { patient: true },
      orderBy: { time: 'asc' },
      take: 6,
    }),
    prisma.appointment.count({ where: { date: { gte: today, lt: tomorrow }, status: { in: ['SCHEDULED', 'CHECKED_IN'] } } }),
    prisma.inpatientAdmission.count({ where: { status: 'ADMITTED' } }),
    prisma.appointment.count({ where: { OR: [{ reason: { contains: 'emergency', mode: 'insensitive' } }, { reason: { contains: 'urgent', mode: 'insensitive' } }, { notes: { contains: 'emergency', mode: 'insensitive' } }, { notes: { contains: 'urgent', mode: 'insensitive' } }] } }),
    prisma.labOrder.count({ where: { status: { in: ['ORDERED', 'COLLECTED', 'PROCESSING'] } } }),
    prisma.appointment.count({ where: { OR: [{ department: { contains: 'radiology', mode: 'insensitive' } }, { department: { contains: 'imaging', mode: 'insensitive' } }, { department: { contains: 'scan', mode: 'insensitive' } }], status: { in: ['SCHEDULED', 'CHECKED_IN'] } } }),
    prisma.patient.findMany({
      where: search
        ? {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { patientNumber: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.appointment.findMany({ include: { patient: true, doctor: true }, orderBy: { date: 'desc' }, take: 5 }),
  ]);

  const overviewStats = [
    { label: 'Today\'s appointments', value: todayAppointments.length, accent: 'bg-blue-500/10 text-blue-700' },
    { label: 'Waiting patients', value: waitingPatients, accent: 'bg-amber-500/10 text-amber-700' },
    { label: 'Admitted patients', value: admittedPatients, accent: 'bg-emerald-500/10 text-emerald-700' },
    { label: 'Emergency alerts', value: emergencyAlerts, accent: 'bg-rose-500/10 text-rose-700' },
  ];

  const activityFeed = [
    { title: 'Pending lab results', detail: `${pendingLabOrders} orders need review` },
    { title: 'Radiology follow-up', detail: `${pendingRadiology} imaging cases pending` },
    { title: 'Care reminders', detail: `${todayAppointments.length} consultations scheduled today` },
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

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Quick actions</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Daily care shortcuts</h2>
            </div>
            <Link href="/appointments" className="text-sm font-medium text-blue-600">Open schedule</Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">
                <p className="font-semibold text-slate-900">{action.title}</p>
                <p className="mt-1 text-sm text-slate-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Doctor profile</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Doctor profile'}</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">Specialty: {doctor?.specialty ?? 'General medicine'}</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">Department: {doctor?.department ?? 'General'}</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">Availability: {doctor?.availableFrom ?? '09:00'} – {doctor?.availableTo ?? '17:00'}</div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Patient search</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Find patients by name, ID, phone, or email</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {patients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 md:col-span-2 xl:col-span-3">No patient records matched this search yet.</div>
          ) : (
            patients.map((patient) => (
              <div key={patient.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{patient.firstName} {patient.lastName}</p>
                <p className="mt-1 text-sm text-slate-600">MRN: {patient.patientNumber}</p>
                <p className="mt-1 text-sm text-slate-600">Phone: {patient.phone}</p>
                <p className="mt-1 text-sm text-slate-600">Allergies: {patient.allergies ?? 'None recorded'}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Core modules</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Clinical workflow modules</h2>
          </div>
          <Link href="/patients" className="text-sm font-medium text-blue-600">Browse patients</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <div key={module.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{module.title}</p>
              <p className="mt-2 text-sm text-slate-600">{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Today</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Today&apos;s appointments</h2>
          <div className="mt-5 space-y-3">
            {todayAppointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">No appointments scheduled for today yet.</div>
            ) : (
              todayAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{appointment.time} • {appointment.department}</p>
                  <p className="mt-1 text-sm text-slate-600">Patient: {appointment.patient.firstName} {appointment.patient.lastName}</p>
                  <p className="mt-1 text-sm text-slate-600">Reason: {appointment.reason ?? 'Routine visit'}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Notifications</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Care reminders</h2>
          <div className="mt-5 space-y-3">
            {activityFeed.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Recent activity</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Upcoming and recent care events</h2>
          </div>
          <Link href="/appointments" className="text-sm font-medium text-blue-600">View all</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{appointment.patient.firstName} {appointment.patient.lastName}</p>
              <p className="mt-1 text-sm text-slate-600">{appointment.doctor?.firstName ?? 'Doctor'} {appointment.doctor?.lastName ?? ''}</p>
              <p className="mt-1 text-sm text-slate-600">{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(appointment.date)} • {appointment.time}</p>
              <p className="mt-1 text-sm text-slate-500">{appointment.status}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
