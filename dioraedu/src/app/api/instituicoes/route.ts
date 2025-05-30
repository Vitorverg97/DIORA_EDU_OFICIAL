import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const instituicoes = await prisma.instituicao.findMany();
    return NextResponse.json(instituicoes);
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    return NextResponse.json({ error: 'Erro ao buscar instituições' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novaInstituicao = await prisma.instituicao.create({ data });
    return NextResponse.json(novaInstituicao, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar instituição:', error);
    return NextResponse.json({ error: 'Erro ao criar instituição' }, { status: 500 });
  }
}
