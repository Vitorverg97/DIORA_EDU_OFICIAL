import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const feedback = await prisma.feedback.findUnique({ where: { id: parseInt(params.id) } });
    if (!feedback) return NextResponse.json({ error: 'Feedback não encontrado' }, { status: 404 });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar feedback' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const feedback = await prisma.feedback.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar feedback' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.feedback.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Feedback removido com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover feedback' }, { status: 500 });
  }
}
