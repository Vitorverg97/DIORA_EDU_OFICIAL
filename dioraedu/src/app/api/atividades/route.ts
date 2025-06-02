import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const data = await prisma.atividade.findMany()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro no GET:", error)
    return new NextResponse("Erro interno no servidor", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.atividade.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar atividade', details: e }, { status: 400 });
  }
}