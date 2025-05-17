import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT /api/atividades/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()

  try {
    const atividadeAtualizada = await prisma.aTIVIDADE.update({
      where: { ID_atividade: id },
      data: body,
    })
    return NextResponse.json(atividadeAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
    return NextResponse.json({ error: 'Erro ao atualizar atividade.' }, { status: 500 })
  }
}

// DELETE /api/atividades/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.aTIVIDADE.delete({
      where: { ID_atividade: id },
    })
    return NextResponse.json({ message: 'Atividade excluída com sucesso.' })
  } catch (error) {
    console.error('Erro ao excluir atividade:', error)
    return NextResponse.json({ error: 'Erro ao excluir atividade.' }, { status: 500 })
  }
}
