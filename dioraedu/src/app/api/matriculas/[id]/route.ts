import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.matricula.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'matricula não encontrada' }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
 // await authenticate(req);
  try {
    await prisma.matricula.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'matricula não encontrada' }, { status: 404 });
  }
}