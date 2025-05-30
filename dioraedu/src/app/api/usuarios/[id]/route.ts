import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(params.id) } });
    if (!usuario) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const usuario = await prisma.usuario.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.usuario.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover usuário' }, { status: 500 });
  }
}
