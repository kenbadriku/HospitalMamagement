import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const doctors = await prisma.doctor.findMany({
    where: search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } },
            { specialty: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(doctors);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const doctor = await prisma.doctor.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      department: body.department,
      specialty: body.specialty,
      qualification: body.qualification,
      experienceYears: Number(body.experienceYears ?? 0),
      email: body.email,
      phone: body.phone,
      registrationNumber: body.registrationNumber,
      consultationFee: new Prisma.Decimal(String(body.consultationFee ?? 0)),
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(doctor);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const doctor = await prisma.doctor.update({
    where: { id: body.id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      department: body.department,
      specialty: body.specialty,
      qualification: body.qualification,
      experienceYears: Number(body.experienceYears ?? 0),
      email: body.email,
      phone: body.phone,
      registrationNumber: body.registrationNumber,
      consultationFee: new Prisma.Decimal(String(body.consultationFee ?? 0)),
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(doctor);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.doctor.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
