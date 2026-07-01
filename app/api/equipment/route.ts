import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const equipment = await prisma.equipment.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(equipment);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = await prisma.equipment.create({
    data: {
      name: body.name,
      department: body.department,
      status: body.status ?? 'Operational',
      lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : null,
      nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : null,
      description: body.description,
    },
  });

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const item = await prisma.equipment.update({
    where: { id: body.id },
    data: {
      name: body.name,
      department: body.department,
      status: body.status ?? 'Operational',
      lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : null,
      nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : null,
      description: body.description,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.equipment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
