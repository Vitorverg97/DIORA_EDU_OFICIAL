import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

/**
 * Atualiza um conteúdo no banco de dados utilizando o ID
 * 
 * @param req - Objeto da requisição contendo o corpo com os dados atualizados.
 * @param param.ID - Objeto contendo o parâmetro da rota com o ID (String) do conteúdo
 * @returns O objeto de conteúdo atualizado em caso de sucesso (status 200/201)
 * @returns status 404 para "Conteúdo não encontrado"
 * 
 * @example
 * PUT/api/conteudos/875 (Onde '875' é o ID do conteúdo)
 * //Exemplo (conteúdo não encontrado)
 */

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.conteudo.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'conteudo não encontrado' }, { status: 404 });
  }
}

/**
 * Exclui um conteúdo do banco de dados com base no ID fornecido.
 * 
 * @param req - Objeto da requisição (não utilizado neste endpoint).
 * @param context - Objeto contendo os parâmetros da rota, incluindo o ID do conteúdo a ser deletada.
 * @returns status 204 em caso de sucesso
 * @returns status 400 para "ID inválido"
 * @returns status 404 para "conteúdo não encontrado"
 * @returns status 500 para "erro interno ao deletar"
 * 
 * @example
 * DELETE/api/conteudos
 */

export async function DELETE(req: NextRequest, context: { params: { id: string } }  
) {
  const id = Number(context.params.id);
  
  if (isNaN(id)){
    return new Response("ID inválido", { status: 400 });
  }
//  await authenticate(req);
  try {
    await prisma.conteudo.delete({ where: { id } 
    });
    return new NextResponse(null, { status: 204 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any){
    if (error.code === "P2025") {
      return NextResponse.json({ error: 'conteudo não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ error: "Erro interno ao deletar"}, {status: 500});
  }
}