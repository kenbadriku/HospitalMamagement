import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const appointments = await prisma.appointment.findMany({
    where: search
      ? {
          OR: [
            { department: { contains: search, mode: 'insensitive' } },
            { notes: { contains: search, mode: 'insensitive' } },
            { patient: { firstName: { contains: search, mode: 'insensitive' } } },
            { patient: { lastName: { contains: search, mode: 'insensitive' } } },
            { doctor: { firstName: { contains: search, mode: 'insensitive' } } },
            { doctor: { lastName: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : undefined,
    include: { patient: true, doctor: true },
    orderBy: { date: 'asc' },
  });

  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const appointment = await prisma.appointment.create({
    data: {
      patientId: body.patientId,
      doctorId: body.doctorId,
      department: body.department,
      date: new Date(body.date),
      time: body.time,
      status: body.status,
      notes: body.notes,
    },
  });

  return NextResponse.json(appointment);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const appointment = await prisma.appointment.update({
    where: { id: body.id },
    data: {
      patientId: body.patientId,
      doctorId: body.doctorId,
      department: body.department,
      date: new Date(body.date),
      time: body.time,
      status: body.status,
      notes: body.notes,
    },
  });

  return NextResponse.json(appointment);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.appointment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
