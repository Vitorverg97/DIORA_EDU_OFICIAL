import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany();
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    return NextResponse.json({ error: 'Erro ao buscar feedbacks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novoFeedback = await prisma.feedback.create({ data });
    return NextResponse.json(novoFeedback, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar feedback:', error);
    return NextResponse.json({ error: 'Erro ao criar feedback' }, { status: 500 });
  }
}
