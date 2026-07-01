import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const staff = await prisma.staff.findMany({
    where: search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } },
            { role: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(staff);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const person = await prisma.staff.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      department: body.department,
      role: body.role,
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(person);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const person = await prisma.staff.update({
    where: { id: body.id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      department: body.department,
      role: body.role,
      status: body.status ?? 'Active',
    },
  });

  return NextResponse.json(person);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.staff.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
