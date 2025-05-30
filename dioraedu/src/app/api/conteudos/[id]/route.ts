import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const conteudo = await prisma.conteudo.findUnique({ where: { id: parseInt(params.id) } });
    if (!conteudo) return NextResponse.json({ error: 'Conteúdo não encontrado' }, { status: 404 });
    return NextResponse.json(conteudo);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar conteúdo' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const conteudo = await prisma.conteudo.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(conteudo);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar conteúdo' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.conteudo.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Conteúdo removido com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover conteúdo' }, { status: 500 });
  }
}
