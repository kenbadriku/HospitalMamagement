import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const items = await prisma.pharmacyItem.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
            { supplier: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = await prisma.pharmacyItem.create({
    data: {
      name: body.name,
      category: body.category,
      quantity: Number(body.quantity ?? 0),
      price: new Prisma.Decimal(String(body.price ?? 0)),
      supplier: body.supplier,
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      description: body.description,
      status: body.status ?? 'In Stock',
    },
  });

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const item = await prisma.pharmacyItem.update({
    where: { id: body.id },
    data: {
      name: body.name,
      category: body.category,
      quantity: Number(body.quantity ?? 0),
      price: new Prisma.Decimal(String(body.price ?? 0)),
      supplier: body.supplier,
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      description: body.description,
      status: body.status ?? 'In Stock',
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.pharmacyItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
