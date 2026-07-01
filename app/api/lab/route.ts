import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const tests = await prisma.labOrder.findMany({
    where: search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: 'insensitive' } },
            { patient: { firstName: { contains: search, mode: 'insensitive' } } },
            { patient: { lastName: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : undefined,
    include: { patient: true, items: { include: { labTest: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(tests);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const order = await prisma.labOrder.create({
    data: {
      orderNumber: body.orderNumber,
      patientId: body.patientId,
      doctorId: body.doctorId || null,
      status: body.status,
      priority: body.priority ?? 'ROUTINE',
    },
  });

  return NextResponse.json(order);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const order = await prisma.labOrder.update({
    where: { id: body.id },
    data: {
      orderNumber: body.orderNumber,
      patientId: body.patientId,
      doctorId: body.doctorId || null,
      status: body.status,
      priority: body.priority ?? 'ROUTINE',
    },
  });

  return NextResponse.json(order);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.labOrder.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
