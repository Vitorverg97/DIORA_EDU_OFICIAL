import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient

/**
 * Recupera todas as atividades cadastradas no banco de dados.
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de atividades com status 200 em caso de sucesso.
 * @returns Retorna status 401 se o usuário não estiver autenticado/autorizado ("Não autorizado").
 * @returns Retorna status 500 para erro interno no servidor.dor
 * @exemple
 * GET/api/atividade
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autorizado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const data = await prisma.atividade.findMany();
    return NextResponse.json(data);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'UnauthorizedError') {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    console.error('Erro interno no GET:', error);
    return new NextResponse('Erro interno no servidor', { status: 500 });
  }
}

/**
 * Cria uma nova atividade no banco de dados
 * 
 * @param req objeto de requisição contendo os dados da nova atividade 
 * @returns Retorna status 201 com a atividade criada em caso de sucesso
 * @returns status 400 se ocorrer algum erro na criação da atividade
 * @example 
 * POST/api/atividades
 * Body: { nome: "Nova atividade", descricao: "Descrição da atividade" }
 */

export async function POST(req: NextRequest) {
  
  const data = await req.json();
  try {
    const nova = await prisma.atividade.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar atividade', details: e }, { status: 400 });
  }
}