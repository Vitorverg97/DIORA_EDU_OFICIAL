// src/app/api/usuarios/[id]/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const usuarioSchema = z.object({
  nome: z.string().min(1).optional(),
  email: z.string().email().optional(),
  senha: z.string().min(6).optional(),
  tipo: z.enum(['Aluno', 'Professor']).optional(),
})

// PUT (ou PATCH)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const result = usuarioSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: result.error.errors }, { status: 400 })
  }

  const { id } = params

  try {
    if (body.senha) {
      body.senha = await bcrypt.hash(body.senha, 10)
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { ID_usuario: Number(id) },
      data: body,
      select: {
        ID_usuario: true,
        nome: true,
        email: true,
        tipo: true,
      },
    })

    return NextResponse.json(usuarioAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.usuario.delete({
      where: { ID_usuario: Number(params.id) },
    })
    return NextResponse.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 })
  }
}
