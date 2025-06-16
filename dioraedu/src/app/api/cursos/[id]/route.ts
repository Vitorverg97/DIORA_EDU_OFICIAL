import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';
//import { authenticate } from '@/lib/authMiddleware';

/**
 *Recupera todos os conteúdos registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de cursos com status 200 em caso de sucesso.
 * @returns Retorna status 404 se o curso não for encontrado.
 * @example
 * GET/api/cursos/875 (Onde '875' é o ID do conteúdo)
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 404
 * Body: { "message": "curso não encontrado" } 
 **/

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const atualizado = await prisma.curso.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(atualizado);
  } catch {
    return NextResponse.json({ error: 'curso não encontrado' }, { status: 404 });
  }
}

/**
 *  Exclui um curso do banco de dados com base no ID fornecido.
 * 
 * @param req - Objeto da requisição (não utilizado neste endpoint).
 * @param context - Objeto contendo os parâmetros da rota, incluindo o ID do curso a ser deletada.
 * @returns status 204 em caso de sucesso
 * @returns status 400 para "ID inválido"
 * @returns status 404 para "curso não encontrado"
 * @returns status 500 para "erro interno ao deletar"
 * 
 * @example
 * DELETE/api/cursos
 */

export async function DELETE(req: NextRequest, context: { params: { id: string } }  
) {
  const id = Number(context.params.id);
  
  if (isNaN(id)){
    return new Response("ID inválido", { status: 400 });
  }
//  await authenticate(req);
  try {
    await prisma.curso.delete({ where: { id } 
    });
    return new NextResponse(null, { status: 204 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any){
    if (error.code === "P2025") {
      return NextResponse.json({ error: 'curso não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ error: "Erro interno ao deletar"}, {status: 500});
  }
}