import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const cursoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
})

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()
  const result = cursoSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: result.error.errors }, { status: 400 })
  }

  try {
    const cursoAtualizado = await prisma.curso.update({
      where: { ID_curso: id },
      data: result.data,
    })
    return NextResponse.json(cursoAtualizado, { status: 200 })
  } catch (error) {
    console.error ('Erro ao atualizar curso: ', error)
    return NextResponse.json({ error: 'Erro ao atualizar curso' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.curso.delete({
      where: { ID_curso: id },
    })
    return NextResponse.json({ message: 'Curso deletado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error ('Erro ao deletar curso: ', error)
    return NextResponse.json({ error: 'Erro ao deletar curso' }, { status: 500 })
  }
}
