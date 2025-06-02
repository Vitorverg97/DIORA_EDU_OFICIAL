import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

export async function GET(req: NextRequest) {
  await authenticate(req); // lança erro 401 se não autenticado
  const tentativas = await prisma.tentativa.findMany();
  return NextResponse.json(tentativas);
}

export async function POST(req: NextRequest) {
  await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.tentativa.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar tentativa', details: e }, { status: 400 });
  }
}