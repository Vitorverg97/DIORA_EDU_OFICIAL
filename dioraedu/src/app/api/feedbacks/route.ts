import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos os feedbacks registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de feedback com status 200 em caso de sucesso.
 * @returns Retorna status 401 se o usuário não estiver autenticado/autorizado ("Não autorizado").
 * @example
 * GET/api/feedbacks
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const feedbacks = await prisma.feedback.findMany();
  return NextResponse.json(feedbacks);
}

/**
 * Cria feedbacks no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo feedback
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar feedback"
 * @example 
 * POST/api/feedbacks
 * Body: { nome do usuário: "Antonio Starki", feedback: "gostei muito da aula de português"}
 */

export async function POST(req: NextRequest) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.feedback.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar feedback', details: e }, { status: 400 });
  }
}