import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos os conteúdos registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de conteúdos com status 200 em caso de sucesso.
 * @returns Retorna status 401 se o usuário não estiver autenticado/autorizado ("Não autorizado").
 * @example
 * GET/api/conteudos
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autorizado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const conteudos = await prisma.conteudo.findMany();
  return NextResponse.json(conteudos);
}

/**
 * Cria conteúdo no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo conteúdo
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar conteúdo"
 * @example 
 * POST/api/conteudos
 * Body: { nome: "Novo conteúdo", descricao: "Descrição do conteúdo" }
 */

export async function POST(req: NextRequest) {
 // await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.conteudo.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar conteudo', details: e }, { status: 400 });
  }
}