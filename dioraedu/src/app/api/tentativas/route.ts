import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tentativas = await prisma.tentativa.findMany();
    return NextResponse.json(tentativas);
  } catch (error) {
    console.error('Erro ao buscar tentativas:', error);
    return NextResponse.json({ error: 'Erro ao buscar tentativas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novaTentativa = await prisma.tentativa.create({ data });
    return NextResponse.json(novaTentativa, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tentativa:', error);
    return NextResponse.json({ error: 'Erro ao criar tentativa' }, { status: 500 });
  }
}
