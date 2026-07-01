import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const bills = await prisma.bill.findMany({
    where: search
      ? {
          OR: [
            { paymentMethod: { contains: search, mode: 'insensitive' } },
            { patient: { firstName: { contains: search, mode: 'insensitive' } } },
            { patient: { lastName: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : undefined,
    include: { patient: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(bills);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const bill = await prisma.bill.create({
    data: {
      billNumber: body.billNumber,
      patientId: body.patientId,
      appointmentId: body.appointmentId || null,
      totalAmount: new Prisma.Decimal(String(body.totalAmount ?? 0)),
      paidAmount: new Prisma.Decimal(String(body.paidAmount ?? 0)),
      status: body.status,
      paymentMethod: body.paymentMethod,
    },
  });

  return NextResponse.json(bill);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const bill = await prisma.bill.update({
    where: { id: body.id },
    data: {
      billNumber: body.billNumber,
      patientId: body.patientId,
      appointmentId: body.appointmentId || null,
      totalAmount: new Prisma.Decimal(String(body.totalAmount ?? 0)),
      paidAmount: new Prisma.Decimal(String(body.paidAmount ?? 0)),
      status: body.status,
      paymentMethod: body.paymentMethod,
    },
  });

  return NextResponse.json(bill);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.bill.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
