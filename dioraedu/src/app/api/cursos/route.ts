import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cursos = await prisma.curso.findMany();
    return NextResponse.json(cursos);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar cursos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const curso = await prisma.curso.create({ data });
    return NextResponse.json(curso);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar curso' }, { status: 500 });
  }
}