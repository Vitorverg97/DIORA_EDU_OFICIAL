import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const matricula = await prisma.matricula.findUnique({ where: { id: parseInt(params.id) } });
    if (!matricula) return NextResponse.json({ error: 'Matrícula não encontrada' }, { status: 404 });
    return NextResponse.json(matricula);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar matrícula' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const matricula = await prisma.matricula.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(matricula);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar matrícula' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.matricula.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Matrícula removida com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover matrícula' }, { status: 500 });
  }
}
