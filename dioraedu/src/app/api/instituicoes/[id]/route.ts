import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const instituicao = await prisma.instituicao.findUnique({ where: { id: parseInt(params.id) } });
    if (!instituicao) return NextResponse.json({ error: 'Instituição não encontrada' }, { status: 404 });
    return NextResponse.json(instituicao);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar instituição' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const instituicao = await prisma.instituicao.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(instituicao);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar instituição' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.instituicao.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Instituição removida com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover instituição' }, { status: 500 });
  }
}
