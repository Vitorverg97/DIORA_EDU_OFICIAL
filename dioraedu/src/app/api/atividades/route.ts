import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const atividades = await prisma.atividade.findMany();
    return NextResponse.json(atividades);
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    return NextResponse.json({ error: 'Erro ao buscar atividades' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novaAtividade = await prisma.atividade.create({ data });
    return NextResponse.json(novaAtividade, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    return NextResponse.json({ error: 'Erro ao criar atividade' }, { status: 500 });
  }
}
