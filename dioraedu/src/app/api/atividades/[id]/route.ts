import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const atividade = await prisma.atividade.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!atividade) {
      return NextResponse.json({ error: 'Atividade não encontrada' }, { status: 404 });
    }
    return NextResponse.json(atividade);
  } catch (error) {
    console.error('Erro ao buscar atividade:', error);
    return NextResponse.json({ error: 'Erro ao buscar atividade' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const atividadeAtualizada = await prisma.atividade.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(atividadeAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    return NextResponse.json({ error: 'Erro ao atualizar atividade' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.atividade.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Atividade removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover atividade:', error);
    return NextResponse.json({ error: 'Erro ao remover atividade' }, { status: 500 });
  }
}
