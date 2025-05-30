import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const tentativa = await prisma.tentativa.findUnique({ where: { id: parseInt(params.id) } });
    if (!tentativa) return NextResponse.json({ error: 'Tentativa não encontrada' }, { status: 404 });
    return NextResponse.json(tentativa);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar tentativa' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const tentativa = await prisma.tentativa.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(tentativa);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar tentativa' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.tentativa.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Tentativa removida com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover tentativa' }, { status: 500 });
  }
}
