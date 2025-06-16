import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

/**
 *Atualiza todos os feedbacks registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de cursos com status 200 em caso de sucesso.
 * @returns Retorna status 404 se o feedback não for encontrado.
 * @example
 * GET/api/feedbacks
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 404
 * Body: { "message": "feedback não encontrado" } 
 */

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.feedback.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'feedback não encontrado' }, { status: 404 });
  }
}

/**
 *  Exclui um feedback do banco de dados com base no ID fornecido.
 * 
 * @param req - Objeto da requisição (não utilizado neste endpoint).
 * @param context - Objeto contendo os parâmetros da rota, incluindo o ID do feedback a ser deletada.
 * @returns status 204 em caso de sucesso
 * @returns status 400 para "ID inválido"
 * @returns status 404 para "feedback não encontrado"
 * @returns status 500 para "erro interno ao deletar"
 * 
 * @example
 * DELETE/api/feedbacks
 */

export async function DELETE(req: NextRequest, context: { params: { id: string } }  
) {
  const id = Number(context.params.id);
  
  if (isNaN(id)){
    return new Response("ID inválido", { status: 400 });
  }
//  await authenticate(req);
  try {
    await prisma.feedback.delete({ where: { id } 
    });
    return new NextResponse(null, { status: 204 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any){
    if (error.code === "P2025") {
      return NextResponse.json({ error: 'feedback não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ error: "Erro interno ao deletar"}, {status: 500});
  }
}