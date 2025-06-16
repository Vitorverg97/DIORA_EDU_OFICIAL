import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

/**
 * Atualiza todos as mensagens registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de mensagens com status 200 em caso de sucesso.
 * @returns Retorna status 404 se a mensagem não for encontrada.
 * @example
 * GET/api/mensagens
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 404
 * Body: { "message": "matricula não encontrada" } 
 */

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.mensagem.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'instituição não encontrada' }, { status: 404 });
  }
}

/**
 * Exclui uma mensagem do banco de dados com base no ID fornecido.
 * 
 * @param req - Objeto da requisição (não utilizado neste endpoint).
 * @param context - Objeto contendo os parâmetros da rota, incluindo o ID da mensagem a ser deletada.
 * @returns status 204 em caso de sucesso
 * @returns status 400 para "ID inválido"
 * @returns status 404 para "mensagem não encontrada"
 * @returns status 500 para "erro interno ao deletar"
 * 
 * @example
 * DELETE/api/mensagens
 */

export async function DELETE(req: NextRequest, context: { params: { id: string } }  
) {
  const id = Number(context.params.id);
  
  if (isNaN(id)){
    return new Response("ID inválido", { status: 400 });
  }
//  await authenticate(req);
  try {
    await prisma.mensagem.delete({ where: { id } 
    });
    return new NextResponse(null, { status: 204 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any){
    if (error.code === "P2025") {
      return NextResponse.json({ error: 'mensagem não encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ error: "Erro interno ao deletar"}, {status: 500});
  }
}