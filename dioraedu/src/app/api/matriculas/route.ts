import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos os matrículas registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de matriculas com status 200 em caso de sucesso.
 * @returns Retorna status 401 se a matricula não estiver autenticada/autorizada ("Não autorizada").
 * @example
 * GET/api/matriculas
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const matriculas = await prisma.matricula.findMany();
  return NextResponse.json(matriculas);
}

/**
 * Cria matrícula no banco de dados
 * 
 * @param req objeto de requisição contendo os dados da nova matrícula 
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar matrícula"
 * @example 
 * POST/api/matrícula
 * Body: { número da matrícula: nome do usuário}
 */

export async function POST(req: NextRequest) {
//  await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.matricula.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar matricula', details: e }, { status: 400 });
  }
}