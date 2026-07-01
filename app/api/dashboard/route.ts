import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const [patients, doctors, appointments, bills, pendingAppointments, completedAppointments, unpaidBills, staff] = await Promise.all([
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.appointment.count(),
    prisma.bill.count(),
    prisma.appointment.count({ where: { status: 'SCHEDULED' } }),
    prisma.appointment.count({ where: { status: 'COMPLETED' } }),
    prisma.bill.count({ where: { status: 'UNPAID' } }),
    prisma.staff.count(),
  ]);

  const byDepartment = await prisma.appointment.groupBy({
    by: ['department'],
    _count: { department: true },
  });

  return NextResponse.json({
    totals: { patients, doctors, appointments, bills, pendingAppointments, completedAppointments, unpaidBills, staff },
    byDepartment,
  });
}
