import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const curso = await prisma.curso.findUnique({ where: { id: parseInt(params.id) } });
    if (!curso) return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    return NextResponse.json(curso);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar curso' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const curso = await prisma.curso.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(curso);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar curso' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.curso.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Curso removido com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover curso' }, { status: 500 });
  }
}