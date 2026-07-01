import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const patients = await prisma.patient.findMany({
    where: search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(patients);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const patient = await prisma.patient.create({
    data: {
      patientNumber: body.patientNumber,
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      dateOfBirth: new Date(body.dateOfBirth),
      phone: body.phone,
      email: body.email,
      address: body.address,
      bloodGroup: body.bloodGroup,
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(patient);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const patient = await prisma.patient.update({
    where: { id: body.id },
    data: {
      patientNumber: body.patientNumber,
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      dateOfBirth: new Date(body.dateOfBirth),
      phone: body.phone,
      email: body.email,
      address: body.address,
      bloodGroup: body.bloodGroup,
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(patient);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
