import { NextRequest, NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // ajuste para a localização real do seu prismaClient
//import { authenticate } from '@/lib/authMiddleware'; // middleware de autenticação JWT

/**
 * Recupera todos as mensagens registrados no banco de dados
 * 
 * @param req - objeto de requisição recebida pelo endpoint
 * @returns Retorna um array de objetos de mensagens com status 200 em caso de sucesso.
 * @returns Retorna status 401 se a mensagem não estiver autenticada/autorizada ("Não autorizada").
 * @example
 * GET/api/mensagens
 * 
 * // Exemplo de resposta em caso de erro
 * Status: 401
 * Body: { "message": "Não autenticado" }
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  // await authenticate(req); // lança erro 401 se não autenticado
  const mensagens = await prisma.mensagem.findMany();
  return NextResponse.json(mensagens);
}

/**
 * Cria mensagem no banco de dados
 * 
 * @param req objeto de requisição contendo os dados do novo conteúdo
 * @returns status 201 em caso de sucesso
 * @returns Em caso de erro, status 400 "Erro ao criar mensagem"
 * @example 
 * POST/api/mensagens
 * {
 * "remetenteId": "id-do-usuario-logado", // Se for uma chave estrangeira
 * "conteudo": "Olá, esta é uma nova mensagem para o curso!"
 * }
 * Exemplo de resposta caso de sucesso: 
 * {
 * "id": "nova-mensagem-id-gerado",
 * "remetenteId": "id-do-usuario-logado",
 * "conteudo": "Olá, esta é uma nova mensagem para o curso!",
 * "createdAt": "2023-06-15T10:30:00Z"
 * }
 */

export async function POST(req: NextRequest) {
  //await authenticate(req);
  const data = await req.json();
  try {
    const nova = await prisma.mensagem.create({ data });
    return NextResponse.json(nova, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao criar mensagem', details: e }, { status: 400 });
  }
}