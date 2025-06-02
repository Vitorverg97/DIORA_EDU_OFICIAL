import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  await authenticate(req); // lança erro 401 se não autenticado
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(req: NextRequest) {
  // await authenticate(req); // descomente se for necessário autenticar

  const { nome, email, senha, perfil } = await req.json();
  if (!nome || !email || !senha || !perfil) {
    return NextResponse.json({ message: 'Dados obrigatórios' }, { status: 400 });
  }

  // Verifica se já existe usuário
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) {
    return NextResponse.json({ message: 'E-mail já cadastrado' }, { status: 409 });
  }

  // Gera hash seguro da senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // Cria o usuário no banco
  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senhaHash, perfil }
  });

  // Não retorne o hash na resposta!
  return NextResponse.json({
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    perfil: novoUsuario.perfil
  }, { status: 201 });
}