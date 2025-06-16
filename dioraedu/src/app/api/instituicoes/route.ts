import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos as instituições registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de instituições com status 200 em caso de sucesso.
 * @returns Retorna status 401 se a instituição não estiver autenticada/autorizada ("Não autorizada").
 * @example
 * GET/api/instituicoes
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const instituicoes = await prisma.instituicao.findMany();
  return NextResponse.json(instituicoes);
}

/**
 * Cria instituição no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo instituição
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar instituição"
 * @example 
 * POST/api/instituicoes
 * Body: { nome da instituição: "Colégio estadual Santos Dumont"}
 */

export async function POST(req: NextRequest) {
  // authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.instituicao.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar instituicao', details: e }, { status: 400 });
  }
}