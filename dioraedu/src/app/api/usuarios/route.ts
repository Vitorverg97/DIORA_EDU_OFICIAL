import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
import bcrypt from 'bcryptjs';

/**
 * Recupera todos as usuários registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de usuários com status 200 em caso de sucesso.
 * @returns Retorna status 401 se a usuários não estiver autenticada/autorizada ("Não autorizada").
 * @example
 * GET/api/users
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

/**
 * Cria usuário no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo usuário
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Dados obrigatórios"
 * @returns Em caso de erro, status 409 "E-mail já cadastrado"
 * @example 
 * POST/api/user
 */

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