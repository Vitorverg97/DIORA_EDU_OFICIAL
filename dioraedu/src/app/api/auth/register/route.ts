import { NextRequest, NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { nome, email, senha, tipo } = await req.json();

  if (!nome || !email || !senha) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  if (usuarioExistente) {
    return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
  }

  const senha_hash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senha_hash, tipo: tipo || "aluno" },
  });

  return NextResponse.json({ ok: true, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome, tipo: usuario.tipo }}, { status: 201 });
}