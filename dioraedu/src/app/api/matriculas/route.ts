import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const matriculas = await prisma.matricula.findMany();
    return NextResponse.json(matriculas);
  } catch (error) {
    console.error('Erro ao buscar matrículas:', error);
    return NextResponse.json({ error: 'Erro ao buscar matrículas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novaMatricula = await prisma.matricula.create({ data });
    return NextResponse.json(novaMatricula, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar matrícula:', error);
    return NextResponse.json({ error: 'Erro ao criar matrícula' }, { status: 500 });
  }
}
