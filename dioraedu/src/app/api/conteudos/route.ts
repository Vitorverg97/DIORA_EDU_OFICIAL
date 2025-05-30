import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const conteudos = await prisma.conteudo.findMany();
    return NextResponse.json(conteudos);
  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    return NextResponse.json({ error: 'Erro ao buscar conteúdos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novoConteudo = await prisma.conteudo.create({ data });
    return NextResponse.json(novoConteudo, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar conteúdo:', error);
    return NextResponse.json({ error: 'Erro ao criar conteúdo' }, { status: 500 });
  }
}
