import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import bcrypt from 'bcryptjs';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(req: NextRequest) {
  // await authenticate(req); // descomente se for necessário autenticar

  const { nome, email, senha, perfil } = await req.json();
  console.log({ nome, email, perfil });
  if (!nome || !email || !senha || !perfil) {
    return NextResponse.json({ message: 'Dados obrigatórios' }, { status: 400 });
  }

  // Verifica se o perfil é válido
  const perfisPermitidos = ['aluno', 'professor', 'admin'];
  if (!perfisPermitidos.includes(perfil)) {
    return NextResponse.json({ message: 'Perfil inválido' }, { status: 400 });
  }

  // Verifica se já existe usuário
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) {
    return NextResponse.json({ message: 'E-mail já cadastrado' }, { status: 409 });
  }

  // Validar senha
  if (!senha || senha.length < 8) {
    return NextResponse.json(
      { erro: 'A senha deve conter pelo menos 8 caracteres.' },
      { status: 400 }
    );
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