import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos os cursos registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de curso com status 200 em caso de sucesso.
 * @returns Retorna status 401 se o usuário não estiver autenticado/autorizado ("Não autorizado").
 * @example
 * GET/api/cursos
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const cursos = await prisma.curso.findMany();
  return NextResponse.json(cursos);
}

/**
 * Cria o curso no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo curso
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar curso"
 * @example 
 * POST/api/cursos
 * Body: { nome: "Novo curso", descricao: "Descrição do curso" }
 */

export async function POST(req: NextRequest) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.curso.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar curso', details: e }, { status: 400 });
  }
}