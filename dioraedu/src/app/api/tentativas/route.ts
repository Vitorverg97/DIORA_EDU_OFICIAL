import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos as tentativas registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de tentativas com status 200 em caso de sucesso.
 * @returns Retorna status 401 se a tentativas não estiver autenticada/autorizada ("Não autorizada").
 * @example
 * GET/api/tentativas
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const tentativas = await prisma.tentativa.findMany();
  return NextResponse.json(tentativas);
}

/**
 * Cria tentativa no banco de dados
 * 
 * @param req objeto de requisição contendo os dados da nova tentativa
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao desenvolver tentativa"
 * @example 
 * POST/api/tentativas
 * Body: { número de tentativas: 4}
 */

export async function POST(req: NextRequest) {
 // await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.tentativa.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar tentativa', details: e }, { status: 400 });
  }
}