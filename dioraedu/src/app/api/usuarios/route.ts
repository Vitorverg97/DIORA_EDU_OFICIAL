import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const usuario = await prisma.usuario.create({ data });
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
  }
}