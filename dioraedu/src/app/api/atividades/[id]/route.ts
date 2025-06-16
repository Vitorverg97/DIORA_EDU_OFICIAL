import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

/**
 * Atualiza uma atividade no banco de dados com dados fornecidos
 * 
 * @param req - Objeto da requisição contendo o corpo com os dados atualizados.
 * @param param.ID - Objeto contendo o parâmetro da rota com o ID (String) da atividade.
 * @returns Retorna a atividade atualizada em formato JSON
 * @returns erro 404 se não encontrada.
 * 
 * @example
 * PUT /api/atividade/1
 * Body: { nome: "Nova atividade" }
 */


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.atividade.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'instituição não encontrada' }, { status: 404 });
  }
}

/**
 * Exclui uma atividade do banco de dados com base no ID fornecido.
 * 
 * @param req - Objeto da requisição (não utilizado neste endpoint).
 * @param context - Objeto contendo os parâmetros da rota, incluindo o ID da atividade a ser deletada.
 * @returns - Retorna status 204 em caso de sucesso
 * @returns 400 se o ID for inválido
 * @returns 404 se a atividade não for encontrada
 * @returns 500 em caso de erro interno.
 * 
 * @example
 * DELETE /api/atividade/1
 */

export async function DELETE(req: NextRequest, context: { params: { id: string } }  
) {
  const id = Number(context.params.id);
  
  if (isNaN(id)){
    return new Response("ID inválido", { status: 400 });
  }
//  await authenticate(req);
  try {
    await prisma.atividade.delete({ where: { id } 
    });
    return new NextResponse(null, { status: 204 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any){
    if (error.code === "P2025") {
      return NextResponse.json({ error: 'atividade não encontrada' }, { status: 404 });
    }
    
    return NextResponse.json({ error: "Erro interno ao deletar"}, {status: 500});
  }
}