import { NextRequest, NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Registra um novo usuário no sistema após validar os campos obrigatórios e verificar duplicidade de e-mail.
 * 
 * @param req - objeto de requisição contendo nome, email, senha e tipo do usuário
 * @returns Retorna status 201 com os dados do usuário criados com sucesso
 * @returns Retorna status 400 para preencher campos obrigatórios
 * @returns status 404 se o email já estiver cadastrado
 * 
 * @example
 * POST/api/register
 * 
 * //Exemplo (e-mail duplicado)
 * Status 400
 * Body: { "message": "E-mail já cadastrado" }
 */

export async function POST(req: NextRequest) {
  const { nome, email, senha, tipo } = await req.json();

  if (!nome || !email || !senha) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  if (usuarioExistente) {
    return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senhaHash, perfil: tipo || "aluno" },
  });

  return NextResponse.json({ ok: true, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome, tipo: usuario.perfil }}, { status: 201 });
}